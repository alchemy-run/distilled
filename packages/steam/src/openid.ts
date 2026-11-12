import { ByteSize, Clock, Context, Effect, Layer, Redacted, Schema } from "effect";
import { FetchHttpClient, HttpClient, HttpClientRequest, HttpIncomingMessage } from "effect/http";
import { XMLParser, XMLValidator } from "fast-xml-parser";

const namespace = "http://specs.openid.net/auth/2.0";
const endpoint = "https://steamcommunity.com/openid/login";
const identifierSelect = `${namespace}/identifier_select`;

/** A SteamID64 kept as a decimal string to preserve precision. */
export const SteamId = Schema.String.check(
  Schema.makeFilter((s) => /^[1-9][0-9]{16,19}$/.test(s) && BigInt(s) <= 18446744073709551615n),
).pipe(Schema.brand("SteamId"));
/** Validated SteamID64. */
export type SteamId = typeof SteamId.Type;

/** Safe diagnostic codes; errors deliberately exclude assertions and secrets. */
export class AuthenticationError extends Schema.TaggedError<AuthenticationError>()(
  "SteamAuthenticationError",
  {
    reason: Schema.Literals([
      "configuration",
      "cancelled",
      "provider",
      "malformed",
      "returnTo",
      "identity",
      "discovery",
      "rejected",
      "expired",
      "transaction",
      "replay",
      "transport",
      "timeout",
      "entropy",
    ]),
  },
) {}

/** A persistence failure must remain distinguishable from rejected authentication. */
export class StoreError extends Schema.TaggedError<StoreError>()("SteamStoreError", {}) {}

/** Atomic, shared persistence required by the authentication flow. */
export class AuthenticationStore extends Context.Service<
  AuthenticationStore,
  {
    /** Insert an unpredictable transaction key, rejecting collisions. */
    readonly register: (
      state: Redacted.Redacted<string>,
      expiresAt: number,
    ) => Effect.Effect<void, StoreError>;
    /** Atomically check and delete a live transaction and insert an unused nonce.
     * Return a rejection without mutations; enforce expiry against `now` inside the transaction.
     * Retain nonce until `nonceExpiresAt`, including across processes and restarts.
     */
    readonly consume: (input: {
      readonly state: Redacted.Redacted<string>;
      readonly nonce: Redacted.Redacted<string>;
      readonly now: number;
      readonly nonceExpiresAt: number;
    }) => Effect.Effect<"accepted" | "transaction" | "replay", StoreError>;
  }
>()("@distilled.cloud/steam/AuthenticationStore") {}

/** Trusted deployment configuration, never derived from request headers. */
export interface Configuration {
  readonly returnTo: string;
  readonly realm: string;
  readonly timeoutMs?: number;
  readonly maxAgeMs?: number;
  readonly clockSkewMs?: number;
  readonly transactionTtlMs?: number;
  /** Permit HTTP only on localhost / 127.0.0.1 / [::1]. */
  readonly allowLocalHttp?: boolean;
}

/** Verified identity only; no profile, email, ownership, or access token. */
export interface VerifiedIdentity {
  readonly steamId: SteamId;
  readonly claimedId: string;
}

const fail = (reason: AuthenticationError["reason"]) =>
  Effect.fail(new AuthenticationError({ reason }));
const parseUrl = (s: string, reason: AuthenticationError["reason"]) =>
  Effect.try({ try: () => new URL(s), catch: () => new AuthenticationError({ reason }) });
const unique = Effect.fn("Steam.parseParameters")(function* (params: URLSearchParams) {
  const result = new Map<string, string>();
  for (const [key, value] of params) {
    if (result.has(key) || /[\r\n\0]/.test(key + value)) return yield* fail("malformed");
    result.set(key, value);
  }
  return result;
});

/** Steam OpenID service. Browser state and callback URLs are redacted at the boundary. */
export class SteamOpenId extends Context.Service<
  SteamOpenId,
  {
    /** Register a login transaction; place browserState in an HttpOnly SameSite=Lax cookie. */
    readonly begin: () => Effect.Effect<
      {
        readonly authenticationUrl: Redacted.Redacted<string>;
        readonly browserState: Redacted.Redacted<string>;
      },
      AuthenticationError | StoreError
    >;
    /** Verify a GET callback and consume transaction + assertion nonce before returning identity. */
    readonly verify: (input: {
      readonly callbackUrl: Redacted.Redacted<string>;
      readonly browserState: Redacted.Redacted<string>;
    }) => Effect.Effect<VerifiedIdentity, AuthenticationError | StoreError>;
  }
>()("@distilled.cloud/steam/SteamOpenId") {}

/** Build the service with a redirect-disabled Effect Fetch client. Requires AuthenticationStore.
 * FetchHttpClient.Fetch can be supplied for an alternate fetch implementation.
 */
export const layer = (config: Configuration) =>
  Layer.effect(
    SteamOpenId,
    Effect.gen(function* () {
      const store = yield* AuthenticationStore;
      const http = yield* HttpClient.HttpClient;
      const returnTo = yield* parseUrl(config.returnTo, "configuration");
      const realm = yield* parseUrl(config.realm, "configuration");
      const maxAge = config.maxAgeMs ?? 300_000;
      const skew = config.clockSkewMs ?? 30_000;
      const ttl = config.transactionTtlMs ?? 600_000;
      const timeout = config.timeoutMs ?? 10_000;
      for (const value of [maxAge, ttl, timeout]) {
        if (!Number.isSafeInteger(value) || value <= 0 || value > 3_600_000)
          return yield* fail("configuration");
      }
      if (!Number.isSafeInteger(skew) || skew < 0 || skew > 60_000)
        return yield* fail("configuration");
      for (const url of [returnTo, realm]) {
        const local =
          config.allowLocalHttp && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
        if (
          (url.protocol !== "https:" && !(local && url.protocol === "http:")) ||
          url.username ||
          url.password ||
          url.hash
        )
          return yield* fail("configuration");
      }
      if (
        realm.search ||
        returnTo.origin !== realm.origin ||
        !returnTo.pathname.startsWith(realm.pathname)
      )
        return yield* fail("configuration");
      const baseParams = yield* unique(returnTo.searchParams);
      if ([...baseParams.keys()].some((k) => k === "steam_state" || k.startsWith("openid.")))
        return yield* fail("configuration");

      const requestText = Effect.fn("Steam.request")(
        function* (request: HttpClientRequest.HttpClientRequest) {
          const response = yield* http
            .execute(request)
            .pipe(Effect.mapError(() => new AuthenticationError({ reason: "transport" })));
          if (response.status !== 200) return yield* fail("transport");
          // Disable request/response telemetry at the application boundary too: assertions are secrets.
          return yield* response.text.pipe(
            Effect.mapError(() => new AuthenticationError({ reason: "transport" })),
          );
        },
        (effect) =>
          effect.pipe(
            Effect.provideService(HttpClient.TracerDisabledWhen, () => true),
            Effect.provideService(HttpIncomingMessage.MaxBodySize, ByteSize.kibibytes(64)),
            Effect.timeoutOrElse({ duration: timeout, orElse: () => fail("timeout") }),
          ),
      );

      return SteamOpenId.of({
        begin: Effect.fn("Steam.begin")(function* () {
          const state = yield* Effect.try({
            try: () =>
              Array.from(globalThis.crypto.getRandomValues(new Uint8Array(32)), (b) =>
                b.toString(16).padStart(2, "0"),
              ).join(""),
            catch: () => new AuthenticationError({ reason: "entropy" }),
          });
          const browserState = Redacted.make(state);
          yield* store.register(browserState, (yield* Clock.currentTimeMillis) + ttl);
          const callback = new URL(returnTo);
          callback.searchParams.set("steam_state", state);
          const url = new URL(endpoint);
          for (const [key, value] of Object.entries({
            ns: namespace,
            mode: "checkid_setup",
            claimed_id: identifierSelect,
            identity: identifierSelect,
            return_to: callback.href,
            realm: realm.href,
          }))
            url.searchParams.set(`openid.${key}`, value);
          return { authenticationUrl: Redacted.make(url.href), browserState };
        }),
        verify: Effect.fn("Steam.verify")(function* (input) {
          const raw = Redacted.value(input.callbackUrl);
          if (raw.length > 32_768 || /%(?![0-9a-f]{2})/i.test(raw)) return yield* fail("malformed");
          const callback = yield* parseUrl(raw, "malformed");
          const params = yield* unique(callback.searchParams);
          const state = Redacted.value(input.browserState);
          if (!/^[a-f0-9]{64}$/.test(state) || params.get("steam_state") !== state)
            return yield* fail("transaction");
          const expected = new URL(returnTo);
          expected.searchParams.set("steam_state", state);
          if (
            callback.origin !== expected.origin ||
            callback.pathname !== expected.pathname ||
            callback.hash ||
            callback.username ||
            callback.password
          )
            return yield* fail("returnTo");
          for (const [key, value] of expected.searchParams)
            if (params.get(key) !== value) return yield* fail("returnTo");
          for (const key of params.keys())
            if (!key.startsWith("openid.") && !expected.searchParams.has(key))
              return yield* fail("returnTo");
          if (params.get("openid.ns") !== namespace) return yield* fail("malformed");
          if (params.get("openid.mode") === "cancel") return yield* fail("cancelled");
          if (params.get("openid.mode") === "error") return yield* fail("provider");
          if (params.get("openid.mode") !== "id_res") return yield* fail("malformed");
          if (params.get("openid.return_to") !== expected.href) return yield* fail("returnTo");
          if (params.get("openid.op_endpoint") !== endpoint) return yield* fail("identity");
          const claimedId = params.get("openid.claimed_id") ?? "";
          const match = /^https:\/\/steamcommunity\.com\/openid\/id\/([1-9][0-9]{16,19})$/.exec(
            claimedId,
          );
          if (!match || params.get("openid.identity") !== claimedId) return yield* fail("identity");
          const steamId = yield* Schema.decodeUnknownEffect(SteamId)(match[1]).pipe(
            Effect.mapError(() => new AuthenticationError({ reason: "identity" })),
          );
          const signed = (params.get("openid.signed") ?? "").split(",");
          if (
            new Set(signed).size !== signed.length ||
            signed.some((k) => !/^[a-zA-Z0-9_.-]+$/.test(k) || !params.has(`openid.${k}`))
          )
            return yield* fail("malformed");
          for (const key of [
            "op_endpoint",
            "claimed_id",
            "identity",
            "return_to",
            "response_nonce",
            "assoc_handle",
          ])
            if (!signed.includes(key) || !params.get(`openid.${key}`))
              return yield* fail("malformed");
          if (!params.get("openid.sig")) return yield* fail("malformed");
          const nonce = params.get("openid.response_nonce") ?? "";
          const timestamp = nonce.slice(0, 20);
          const issued = Date.parse(timestamp);
          const now = yield* Clock.currentTimeMillis;
          if (
            !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z.+$/.test(nonce) ||
            !Number.isFinite(issued) ||
            new Date(issued).toISOString() !== timestamp.replace("Z", ".000Z")
          )
            return yield* fail("malformed");
          if (issued < now - maxAge || issued > now + skew) return yield* fail("expired");

          // Discover only canonical Steam HTTPS identities. Never follow callback-controlled redirects.
          const xml = yield* requestText(
            HttpClientRequest.get(claimedId).pipe(
              HttpClientRequest.setHeader("accept", "application/xrds+xml"),
            ),
          );
          if (
            xml.length > 65_536 ||
            /<!DOCTYPE|<!ENTITY/i.test(xml) ||
            XMLValidator.validate(xml) !== true
          )
            return yield* fail("discovery");
          const discovery: unknown = yield* Effect.try({
            try: () =>
              new XMLParser({
                ignoreAttributes: false,
                parseTagValue: false,
                processEntities: false,
              }).parse(xml),
            catch: () => new AuthenticationError({ reason: "discovery" }),
          });
          yield* Schema.decodeUnknownEffect(
            Schema.Struct({
              "xrds:XRDS": Schema.Struct({
                "@_xmlns:xrds": Schema.Literal("xri://$xrds"),
                "@_xmlns": Schema.Literal("xri://$xrd*($v*2.0)"),
                XRD: Schema.Struct({
                  Service: Schema.Struct({
                    Type: Schema.Literal(`${namespace}/signon`),
                    URI: Schema.Literal(endpoint),
                  }),
                }),
              }),
            }),
          )(discovery).pipe(
            Effect.mapError(() => new AuthenticationError({ reason: "discovery" })),
          );
          const body = new URLSearchParams();
          for (const [key, value] of params) if (key.startsWith("openid.")) body.set(key, value);
          body.set("openid.mode", "check_authentication");
          const text = yield* requestText(
            HttpClientRequest.post(endpoint).pipe(HttpClientRequest.bodyUrlParams(body)),
          );
          if (text.length > 8192 || !text.endsWith("\n")) return yield* fail("malformed");
          const result = new Map<string, string>();
          for (const line of text.slice(0, -1).split("\n")) {
            const colon = line.indexOf(":");
            const key = line.slice(0, colon);
            const value = line.slice(colon + 1);
            if (colon < 1 || result.has(key) || /[\r\0]/.test(line))
              return yield* fail("malformed");
            result.set(key, value);
          }
          if (
            result.get("ns") !== namespace ||
            !["true", "false"].includes(result.get("is_valid") ?? "")
          )
            return yield* fail("malformed");
          if (result.get("is_valid") !== "true") return yield* fail("rejected");
          const completed = yield* Clock.currentTimeMillis;
          if (issued < completed - maxAge) return yield* fail("expired");
          const consumed = yield* store.consume({
            state: input.browserState,
            nonce: Redacted.make(nonce),
            now: completed,
            nonceExpiresAt: issued + maxAge + skew + 1,
          });
          if (consumed !== "accepted") return yield* fail(consumed);
          return { steamId, claimedId };
        }),
      });
    }),
  ).pipe(
    Layer.provide(FetchHttpClient.layer),
    Layer.provide(Layer.succeed(FetchHttpClient.RequestInit, { redirect: "error" })),
  );
