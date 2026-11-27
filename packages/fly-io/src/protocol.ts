import {
  HTTP_STATUS_MAP,
  InternalServerError,
  InvalidInput,
  type UnknownErrorProps,
} from "@distilled.cloud/core/errors";
import type {
  DecodeArgs,
  EncodeArgs,
  ErrorOf,
  Protocol,
  ProtocolOf,
} from "@distilled.cloud/core/protocol";
import {
  buildRequest,
  encodeLabel,
  getAnn,
  mapKeys,
  matchTypedError,
} from "@distilled.cloud/core/protocol-http";
import {
  declaredStatusClass,
  restProtocol,
  unwrapRedactedDeep,
  validateSuccess,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import { refreshing } from "@distilled.cloud/core/token-cache";
/**
 * Fly.io protocols -- Machines REST, UI-EX REST (MPG), and Sprites REST. The
 * GraphQL API is a Query SDK (`./GraphQL`, src/graphql-transport.ts).
 *
 * Machines (`FlyIoProtocol`) is a plain bearer-token JSON API at
 * `api.machines.dev` (routes carry the `/v1` prefix). MPG (`FlyApiProtocol`) is the same token against
 * `https://api.fly.io`.
 *
 * Sprites (`SpritesProtocol`) also resolve `FLY_API_TOKEN` (same
 * {@link Credentials} as Machines). Sprite CRUD rejects a Fly macaroon as
 * Bearer, so the protocol mints a Sprites bearer once:
 *
 *   POST https://api.sprites.dev/v1/organizations/{org}/tokens
 *   Authorization: FlyV1 {FLY_API_TOKEN}
 *
 * Org slug comes from Machines `GET /tokens/current` (GraphQL fallback).
 * The minted token is cached per `Credentials` layer value, then sent as
 * `Authorization: Bearer` on sprite ops. There is no `SPRITES_TOKEN`.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as MutableHashMap from "effect/MutableHashMap";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import {
  Credentials,
  DEFAULT_FLY_API_BASE_URL,
  DEFAULT_SPRITES_API_BASE_URL,
  type Config,
} from "./credentials.ts";
import {
  FlyIoParseError,
  SpritesNotEnabled,
  TokenRequestFailed,
  UnknownFlyIoError,
  type FlyIoServiceError,
} from "./errors.ts";
import { httpSymbol, type HttpTrait } from "./traits.ts";

/**
 * What every generated Machines and MPG operation fails with besides its
 * own errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, FlyIoOpError, FlyIoOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type FlyIoOpError =
  | FlyIoServiceError
  | ErrorOf<typeof FlyIoProtocol | typeof FlyApiProtocol>;

/** Context (requirements) shared by Machines / MPG operations. */
export type FlyIoOpContext = Credentials | HttpClient.HttpClient;

/** An instance of one of core's status classes (`HTTP_STATUS_MAP`). */
type CoreStatusError = InstanceType<(typeof HTTP_STATUS_MAP)[keyof typeof HTTP_STATUS_MAP]>;

/**
 * What every generated Sprites operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with.
 */
export type SpritesOpError = FlyIoServiceError | ErrorOf<typeof SpritesProtocol>;
export type SpritesOpContext = FlyIoOpContext;

const flyErrorEnvelope = (body: unknown) => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const errors = b.errors as Record<string, unknown> | undefined;
  const detail = errors && typeof errors.detail === "string" ? errors.detail : undefined;
  return {
    message:
      typeof b.error === "string" ? b.error : typeof b.message === "string" ? b.message : detail,
  };
};

/** Sprites prefers `message` when the body carries both `error` (code) and `message`. */
const spritesErrorEnvelope = (body: unknown) => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const message =
    typeof b.message === "string" ? b.message : typeof b.error === "string" ? b.error : undefined;
  const code = typeof b.error === "string" && typeof b.message === "string" ? b.error : undefined;
  return { message, code };
};

const resolveFlyCreds = /*@__PURE__*/ Effect.gen(function* () {
  const resolve = yield* Credentials;
  return yield* resolve;
});

/**
 * Per-call signal that this Machines request is the Fly Machine itself
 * (unix socket `/.fly/api`). Org tokens stay on {@link Credentials} for
 * GetSecret in the same process; this service only changes headers:
 * omit `Authorization`, send `Connection: close`.
 */
export class MachineIdentity
  extends /*@__PURE__*/ Context.Service<MachineIdentity, true>()("FlyIoMachineIdentity") {}

const FlyIoProtocolRest = /*@__PURE__*/ restProtocol({
  credentials: resolveFlyCreds,
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
  }),
  errorEnvelope: flyErrorEnvelope,
  unknownError: (info) => new UnknownFlyIoError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new FlyIoParseError({ body, cause }),
});

const flyIoProtocolMethods = {
  encode: (args) =>
    Effect.gen(function* () {
      const request = yield* FlyIoProtocolRest.encode(args);
      const machine = yield* Effect.serviceOption(MachineIdentity);
      if (Option.isNone(machine)) return request;
      return request.pipe(
        HttpClientRequest.removeHeader("authorization"),
        HttpClientRequest.setHeader("connection", "close"),
      );
    }),
  // Read on each call, so a bundle without Machines operations drops both.
  decode: (args) => FlyIoProtocolRest.decode(args),
} satisfies Protocol<unknown, unknown>;

export const FlyIoProtocol: ProtocolOf<typeof flyIoProtocolMethods> = flyIoProtocolMethods;

/** MPG UI-EX REST at `https://api.fly.io` with the Machines bearer token. */
export const FlyApiProtocol = /*@__PURE__*/ restProtocol({
  credentials: resolveFlyCreds,
  baseUrl: () => DEFAULT_FLY_API_BASE_URL,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
  }),
  errorEnvelope: flyErrorEnvelope,
  unknownError: (info) => new UnknownFlyIoError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new FlyIoParseError({ body, cause }),
});

const parseMaybeNdjson = (body: unknown): unknown => {
  if (typeof body !== "string") return body;
  const lines = body
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  if (lines.length === 0) return body;
  try {
    return lines.map((l) => JSON.parse(l) as unknown);
  } catch {
    return body;
  }
};

/**
 * HTTP exec (`POST /sprites/{name}/exec`) returns `application/octet-stream`
 * frames: 1-byte stream id + payload. Ids: 1 stdout, 2 stderr, 3 exit
 * (payload is a single exit-code byte). HTTP may coalesce chunks; for a
 * complete body the exit frame is the last two bytes when present.
 */
const parseSpritesExecFrames = (
  bytes: Uint8Array,
): { stdout: string; stderr: string; exit_code: number } | undefined => {
  if (bytes.length === 0) return undefined;
  const first = bytes[0]!;
  if (first > 3) return undefined;
  let end = bytes.length;
  let exit_code = 0;
  if (end >= 2 && bytes[end - 2] === 3) {
    exit_code = bytes[end - 1]!;
    end -= 2;
  }
  let stdout = "";
  let stderr = "";
  if (end > 0) {
    const decoder = new TextDecoder();
    const id = bytes[0]!;
    const payload = decoder.decode(bytes.subarray(1, end));
    if (id === 2) stderr = payload;
    else stdout = payload;
  }
  return { stdout, stderr, exit_code };
};

/** Strip a leading `FlyV1` / `Bearer` scheme so we can re-prefix `FlyV1`. */
const stripFlyAuthScheme = (token: string): string => {
  const trimmed = token.trim();
  const space = trimmed.indexOf(" ");
  if (space === -1) return trimmed;
  const scheme = trimmed.slice(0, space).toLowerCase();
  if (scheme === "flyv1" || scheme === "bearer") {
    return trimmed.slice(space + 1).trim();
  }
  return trimmed;
};

const isMintOp = (http: HttpTrait | undefined): boolean =>
  http !== undefined &&
  http.method === "POST" &&
  /\/organizations\/\{[^}]+}\/tokens$/.test(http.uri);

const SPRITES_NOT_ENABLED = /sprites not enabled/i;

const readResponseText = (
  response: HttpClientResponse.HttpClientResponse,
): Effect.Effect<string, HttpClientError.HttpClientError> =>
  response.text.pipe(Effect.map((text) => text ?? ""));

const parseJson = (text: string): unknown => {
  if (text.trim().length === 0) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
};

const haystackOf = (body: unknown, text: string): string => {
  const parts: string[] = [text];
  if (body !== null && typeof body === "object") {
    const b = body as Record<string, unknown>;
    if (typeof b.message === "string") parts.push(b.message);
    if (typeof b.error === "string") parts.push(b.error);
  }
  return parts.join(" ");
};

/**
 * The fallback for a failure nothing matched: an unmapped 5xx is a server
 * fault worth a retry (as in core's REST protocol), anything else is
 * {@link UnknownFlyIoError}.
 */
const unknownError = (
  props: UnknownErrorProps,
  headers: Record<string, string | undefined> | undefined,
) =>
  props.status >= 500
    ? new InternalServerError({
        message: props.message ?? `HTTP ${props.status}`,
        retryAfter: parseRetryAfterForStatus(props.status, headers),
      })
    : new UnknownFlyIoError(props);

const errorEnv = (body: unknown): { message?: string; code?: string } =>
  spritesErrorEnvelope(body) ?? flyErrorEnvelope(body) ?? {};

// A numeric view of core's status map; every class takes `{ message, retryAfter? }`.
const statusMap: Readonly<
  Record<
    number,
    | (new (args: {
        message: string;
        retryAfter?: ReturnType<typeof parseRetryAfterForStatus>;
      }) => CoreStatusError)
    | undefined
  >
> = HTTP_STATUS_MAP;

/**
 * What a failed mint request fails with. It is not an operation's response,
 * so there are no declared classes to match: the status class is core's.
 */
const failHttp = (
  status: number,
  body: unknown,
  text: string,
  headers: Record<string, string | undefined>,
) => {
  const env = errorEnv(body);
  const message = env.message ?? (text.trim().length > 0 ? text.trim() : `HTTP ${status}`);
  if (status === 401 && SPRITES_NOT_ENABLED.test(haystackOf(body, message))) {
    return Effect.fail(new SpritesNotEnabled({ message }));
  }
  const StatusClass = statusMap[status];
  if (StatusClass && status >= 400) {
    return Effect.fail(
      new StatusClass({
        message,
        retryAfter: parseRetryAfterForStatus(status, headers),
      }),
    );
  }
  return Effect.fail(
    unknownError({ status, code: env.code, message, body: body ?? text }, headers),
  );
};

const orgFromTokensCurrent = (body: unknown): string | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const tokens = (body as { tokens?: unknown }).tokens;
  if (!Array.isArray(tokens) || tokens.length === 0) return undefined;
  const first = tokens[0] as { org_slug?: unknown; organization?: unknown };
  if (typeof first.org_slug === "string" && first.org_slug.length > 0) {
    return first.org_slug;
  }
  if (typeof first.organization === "string" && first.organization.length > 0) {
    return first.organization;
  }
  return undefined;
};

const orgFromGraphql = (body: unknown): string | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const data = (body as { data?: unknown }).data;
  if (data === null || typeof data !== "object") return undefined;
  const viewer = (data as { viewer?: unknown }).viewer;
  const root = viewer !== null && typeof viewer === "object" ? viewer : data;
  const personal = (root as { personalOrganization?: { slug?: unknown } }).personalOrganization;
  if (typeof personal?.slug === "string" && personal.slug.length > 0) {
    return personal.slug;
  }
  const nodes = (root as { organizations?: { nodes?: unknown } }).organizations?.nodes;
  if (Array.isArray(nodes)) {
    for (const node of nodes) {
      if (
        node !== null &&
        typeof node === "object" &&
        typeof (node as { slug?: unknown }).slug === "string" &&
        (node as { slug: string }).slug.length > 0
      ) {
        return (node as { slug: string }).slug;
      }
    }
  }
  return undefined;
};

const discoverOrgSlug = (fly: Config) =>
  Effect.gen(function* () {
    const http = yield* HttpClient.HttpClient;
    const machinesRoot = fly.apiBaseUrl.replace(/\/+$/, "");
    const currentReq = HttpClientRequest.make("GET")(`${machinesRoot}/v1/tokens/current`).pipe(
      HttpClientRequest.setHeaders({
        Authorization: `Bearer ${Redacted.value(fly.apiKey)}`,
        Accept: "application/json",
      }),
    );
    const currentRes = yield* http.execute(currentReq);
    const currentText = yield* readResponseText(currentRes);
    const currentJson = parseJson(currentText);
    if (currentRes.status < 400) {
      const slug = orgFromTokensCurrent(currentJson);
      if (slug !== undefined) return slug;
    }

    const gqlReq = HttpClientRequest.make("POST")(`${DEFAULT_FLY_API_BASE_URL}/graphql`).pipe(
      HttpClientRequest.setHeaders({
        Authorization: `Bearer ${Redacted.value(fly.apiKey)}`,
        Accept: "application/json",
      }),
      HttpClientRequest.bodyJsonUnsafe({
        query: "{ viewer { personalOrganization { slug } organizations { nodes { slug } } } }",
      }),
    );
    const gqlRes = yield* http.execute(gqlReq);
    const gqlText = yield* readResponseText(gqlRes);
    const gqlJson = parseJson(gqlText);
    if (gqlRes.status < 400) {
      const slug = orgFromGraphql(gqlJson);
      if (slug !== undefined) return slug;
    }

    return yield* new TokenRequestFailed({
      message: "Could not discover a Fly organization slug from /tokens/current or GraphQL",
    });
  });

const mintOnce = (fly: Config) =>
  Effect.gen(function* () {
    const http = yield* HttpClient.HttpClient;
    const orgSlug = yield* discoverOrgSlug(fly);
    const orgLabel = encodeLabel("orgSlug", orgSlug);
    if (orgLabel instanceof InvalidInput) {
      return yield* new TokenRequestFailed({
        message: `The discovered Fly organization slug ${JSON.stringify(orgSlug)} cannot be a URL path segment`,
      });
    }
    const macaroon = stripFlyAuthScheme(Redacted.value(fly.apiKey));
    const request = HttpClientRequest.make("POST")(
      `${DEFAULT_SPRITES_API_BASE_URL}/organizations/${orgLabel}/tokens`,
    ).pipe(
      HttpClientRequest.setHeaders({
        Authorization: `FlyV1 ${macaroon}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      HttpClientRequest.bodyJsonUnsafe({
        description: "Alchemy Sprites token",
      }),
    );
    const response = yield* http.execute(request);
    const text = yield* readResponseText(response);
    const json = parseJson(text);
    const headers = response.headers as Record<string, string | undefined>;
    if (response.status >= 400) {
      return yield* failHttp(response.status, json, text, headers);
    }
    const token =
      json !== null && typeof json === "object" ? (json as { token?: unknown }).token : undefined;
    if (typeof token !== "string" || token.length === 0) {
      return yield* Effect.fail(
        new FlyIoParseError({
          body: "[REDACTED]",
          cause: "mint response missing token",
        }),
      );
    }
    return Redacted.make(token);
  });

/** One Sprites bearer cache per Fly token, with the latest config that used it. */
interface SpritesTokenCache {
  fly: Config;
  readonly token: Effect.Effect<
    Redacted.Redacted<string>,
    Effect.Error<ReturnType<typeof mintOnce>>,
    HttpClient.HttpClient
  >;
}

/**
 * The Sprites bearer caches of each `Credentials` layer value, keyed by the
 * Fly token (`Redacted` hashes and compares by value), so a layer that
 * resolves another token (a new `FLY_API_TOKEN`) mints for it. Two layers
 * never share a bearer.
 */
const spritesTokens = /*@__PURE__*/ new WeakMap<
  Credentials["Service"],
  MutableHashMap.MutableHashMap<Redacted.Redacted<string>, SpritesTokenCache>
>();

/**
 * The Sprites bearer for `fly`, minted from `FLY_API_TOKEN` and cached per
 * `Credentials` layer value. The bearer does not expire; concurrent calls
 * share one mint (core `refreshing`, AGENTS.md rule 16), and a failed mint
 * is tried again.
 */
const mintSpritesToken = (credentials: Credentials["Service"], fly: Config) =>
  Effect.suspend(() => {
    let byToken = spritesTokens.get(credentials);
    if (byToken === undefined) {
      byToken = MutableHashMap.empty();
      spritesTokens.set(credentials, byToken);
    }
    const hit = MutableHashMap.get(byToken, fly.apiKey);
    if (Option.isSome(hit)) {
      hit.value.fly = fly;
      return hit.value.token;
    }
    const cache: SpritesTokenCache = {
      fly,
      token: refreshing(
        Effect.suspend(() => mintOnce(cache.fly)),
        () => Number.POSITIVE_INFINITY,
        {
          onTimeout: (timeoutMs) =>
            new TokenRequestFailed({
              message: `Sprites token mint timed out after ${timeoutMs / 1000} s`,
            }),
        },
      ),
    };
    MutableHashMap.set(byToken, fly.apiKey, cache);
    return cache.token;
  });

const encodeSpritesRequest = ({ input, inputAst }: EncodeArgs) =>
  Effect.gen(function* () {
    const credentials = yield* Credentials;
    const fly = yield* credentials;
    const http = getAnn(inputAst, httpSymbol) as HttpTrait | undefined;
    const mint = isMintOp(http);
    let authorization: string;
    if (mint) {
      authorization = `FlyV1 ${stripFlyAuthScheme(Redacted.value(fly.apiKey))}`;
    } else {
      const token = yield* mintSpritesToken(credentials, fly);
      authorization = `Bearer ${Redacted.value(token)}`;
    }
    return yield* buildRequest({
      input: unwrapRedactedDeep(input),
      inputAst,
      baseUrl: DEFAULT_SPRITES_API_BASE_URL,
      headers: {
        Authorization: authorization,
        Accept: "application/json",
      },
    });
  });

const decodeSpritesResponse = ({ response, outputAst, errors: errorClasses }: DecodeArgs) =>
  Effect.gen(function* () {
    const buffer = yield* response.arrayBuffer.pipe(Effect.map((bytes) => new Uint8Array(bytes)));
    const text = new TextDecoder().decode(buffer);
    const execFrames = parseSpritesExecFrames(buffer);
    let json: unknown;
    let nonJson = false;
    if (execFrames === undefined && text.trim().length > 0) {
      try {
        json = JSON.parse(text);
      } catch {
        nonJson = true;
      }
    }
    const status = response.status;
    const headers = response.headers as Record<string, string | undefined>;

    if (status >= 400) {
      const env = nonJson ? {} : errorEnv(json);
      const message = env.message ?? (nonJson && text.trim() ? text.trim() : `HTTP ${status}`);
      if (SPRITES_NOT_ENABLED.test(haystackOf(nonJson ? text : json, message))) {
        return yield* Effect.fail(new SpritesNotEnabled({ message }));
      }
      const typed = matchTypedError(
        errorClasses,
        status,
        [
          {
            code: typeof env.code === "number" ? env.code : undefined,
            message,
          },
        ],
        { body: nonJson ? text : json, headers },
      );
      if (typed !== undefined) return yield* Effect.fail(typed);

      // Core's class for the status, which the service declares
      // (`FlyIoServiceErrors`).
      const StatusErrorClass = declaredStatusClass(status, errorClasses);
      if (StatusErrorClass) {
        return yield* Effect.fail(
          new StatusErrorClass({
            message,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }
      if (status >= 500) {
        return yield* Effect.fail(
          new InternalServerError({
            message,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }
      return yield* Effect.fail(
        new UnknownFlyIoError({ status, message, body: nonJson ? text : json }),
      );
    }

    // Strict mode checks the mapped body (or parsed exec frames) against the
    // output schema, and parse errors withhold a body that can hold a secret
    // (core `validateSuccess`).
    const body: unknown =
      execFrames ?? parseMaybeNdjson(nonJson ? text : json === undefined ? {} : json);
    return yield* validateSuccess(
      outputAst,
      {
        value: mapKeys(outputAst, body, "decode"),
        body: execFrames ?? (nonJson ? text : json),
        nonJson,
      },
      (info) => new FlyIoParseError(info),
    );
  });

const spritesProtocolMethods = {
  encode: encodeSpritesRequest,
  decode: decodeSpritesResponse,
} satisfies Protocol<unknown, unknown>;

/** Sprites REST at `https://api.sprites.dev/v1`, minted from `FLY_API_TOKEN`. */
export const SpritesProtocol: ProtocolOf<typeof spritesProtocolMethods> = spritesProtocolMethods;
