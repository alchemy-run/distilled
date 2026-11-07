/**
 * Boat's agent sign-in (https://boat.dev/auth.md, the WorkOS agent
 * registration protocol) -- hand-written: the public OpenAPI document covers
 * `/api/v1` only, and these endpoints live under `/api/boat` and take no
 * credentials.
 *
 *   1. {@link registerAgent} with the user's email starts a claim: a page
 *      for the user's browser and a 6-digit code.
 *   2. The user opens the page, signs in to Boat (GitHub, Google or an email
 *      code) and types the code.
 *   3. {@link pollClaim} answers `authorization_pending` until then, then
 *      the account's API key (`boat_...`) and an identity assertion.
 *   4. {@link exchangeAssertion} mints a fresh key from the assertion when
 *      the key expires, revoking the previous one.
 */
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";

/** The origin Boat's sign-in endpoints live on. */
export const DEFAULT_ORIGIN = "https://boat.dev";

/** A sign-in request Boat refused, or answered with an unexpected body. */
export class BoatLoginError extends Data.TaggedError("BoatLoginError")<{
  readonly message: string;
  /** Boat's OAuth error code (`invalid_grant`, `expired_token`, …). */
  readonly code?: string;
  readonly status?: number;
  readonly cause?: unknown;
}> {}

/** A started claim. */
export interface Claim {
  /** Poll {@link pollClaim} with this. */
  readonly claimToken: Redacted.Redacted<string>;
  /** Open this page in the user's browser. */
  readonly verificationUri: string;
  /** The code the user types on that page after signing in. */
  readonly userCode: string;
  /** Seconds between polls. */
  readonly interval: number;
  /** Seconds the code stays valid. */
  readonly expiresIn: number | undefined;
}

/** An issued Boat API key. */
export interface IssuedKey {
  readonly apiKey: Redacted.Redacted<string>;
  /** Mints the next key with {@link exchangeAssertion}. */
  readonly identityAssertion: Redacted.Redacted<string> | undefined;
  /** Seconds the key stays valid, when Boat says. */
  readonly expiresIn: number | undefined;
  readonly scope: string | undefined;
}

/** One poll of a claim: still waiting (with the interval to wait), or a key. */
export type ClaimPoll =
  | { readonly _tag: "Pending"; readonly interval: number }
  | { readonly _tag: "Issued"; readonly key: IssuedKey };

const RegisterResponse = Schema.Struct({
  claim_token: Schema.String,
  claim: Schema.Struct({
    user_code: Schema.String,
    verification_uri: Schema.String,
    expires_in: Schema.optional(Schema.Number),
    interval: Schema.optional(Schema.Number),
  }),
});

const TokenResponse = Schema.Struct({
  access_token: Schema.String,
  identity_assertion: Schema.optional(Schema.String),
  expires_in: Schema.optional(Schema.Number),
  scope: Schema.optional(Schema.String),
});

const ErrorResponse = Schema.Struct({
  error: Schema.String,
  error_description: Schema.optional(Schema.String),
});

const decodeError = Schema.decodeUnknownOption(ErrorResponse);

/** A non-2xx response as a {@link BoatLoginError} carrying Boat's error code. */
const failure = (what: string) => (response: HttpClientResponse.HttpClientResponse) =>
  response.json.pipe(
    Effect.orElseSucceed(() => undefined),
    Effect.flatMap((body) => {
      const error = decodeError(body);
      return Effect.fail(
        new BoatLoginError({
          message:
            error._tag === "Some"
              ? `Boat ${what}: ${error.value.error_description ?? error.value.error}`
              : `Boat ${what} failed (${response.status})`,
          code: error._tag === "Some" ? error.value.error : undefined,
          status: response.status,
        }),
      );
    }),
  );

const send = <S extends Schema.Top>(
  what: string,
  request: HttpClientRequest.HttpClientRequest,
  schema: S,
) =>
  Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    const response = yield* client
      .execute(request)
      .pipe(
        Effect.mapError(
          (cause) => new BoatLoginError({ message: `Boat ${what}: ${cause.message}`, cause }),
        ),
      );
    if (response.status < 200 || response.status >= 300) return yield* failure(what)(response);
    return yield* HttpClientResponse.schemaBodyJson(schema)(response).pipe(
      Effect.mapError(
        (cause) => new BoatLoginError({ message: `Boat ${what}: unexpected response`, cause }),
      ),
    );
  });

const issued = (body: typeof TokenResponse.Type): IssuedKey => ({
  apiKey: Redacted.make(body.access_token),
  identityAssertion:
    body.identity_assertion === undefined ? undefined : Redacted.make(body.identity_assertion),
  expiresIn: body.expires_in,
  scope: body.scope,
});

const tokenRequest = (origin: string, form: Record<string, string>) =>
  HttpClientRequest.post(`${origin}/api/boat/oauth2/token`).pipe(
    HttpClientRequest.bodyUrlParams(form),
  );

/**
 * Register this client for the account with `email` and start the claim.
 * The user then signs in on `verificationUri` and types `userCode`.
 */
export const registerAgent = Effect.fn("Boat.registerAgent")(function* (input: {
  readonly email: string;
  readonly origin?: string;
}) {
  const origin = input.origin ?? DEFAULT_ORIGIN;
  const body = yield* send(
    "sign-in",
    HttpClientRequest.post(`${origin}/api/boat/agent/identity`).pipe(
      HttpClientRequest.bodyJsonUnsafe({ type: "service_auth", login_hint: input.email }),
    ),
    RegisterResponse,
  );
  return {
    claimToken: Redacted.make(body.claim_token),
    verificationUri: body.claim.verification_uri,
    userCode: body.claim.user_code,
    interval: body.claim.interval ?? 5,
    expiresIn: body.claim.expires_in,
  } satisfies Claim;
});

const ClaimResponse = Schema.Struct({
  claim_attempt: RegisterResponse.fields.claim,
});

/**
 * Get a fresh code for a claim whose code lapsed (`expired_token`). The
 * claim token stays the same.
 */
export const refreshClaim = Effect.fn("Boat.refreshClaim")(function* (input: {
  readonly claimToken: Redacted.Redacted<string>;
  readonly email: string;
  readonly origin?: string;
}) {
  const origin = input.origin ?? DEFAULT_ORIGIN;
  const body = yield* send(
    "sign-in",
    HttpClientRequest.post(`${origin}/api/boat/agent/identity/claim`).pipe(
      HttpClientRequest.bodyJsonUnsafe({
        claim_token: Redacted.value(input.claimToken),
        email: input.email,
      }),
    ),
    ClaimResponse,
  );
  const claim = body.claim_attempt;
  return {
    claimToken: input.claimToken,
    verificationUri: claim.verification_uri,
    userCode: claim.user_code,
    interval: claim.interval ?? 5,
    expiresIn: claim.expires_in,
  } satisfies Claim;
});

/** Poll a claim once. `slow_down` comes back as `Pending` with a longer interval. */
export const pollClaim = Effect.fn("Boat.pollClaim")(function* (input: {
  readonly claimToken: Redacted.Redacted<string>;
  readonly interval: number;
  readonly origin?: string;
}) {
  const request = tokenRequest(input.origin ?? DEFAULT_ORIGIN, {
    grant_type: "urn:workos:agent-auth:grant-type:claim",
    claim_token: Redacted.value(input.claimToken),
  });
  return yield* send("sign-in", request, TokenResponse).pipe(
    Effect.map((body): ClaimPoll => ({ _tag: "Issued", key: issued(body) })),
    Effect.catchIf(
      (error) => error.code === "authorization_pending" || error.code === "slow_down",
      (error) =>
        Effect.succeed<ClaimPoll>({
          _tag: "Pending",
          interval: error.code === "slow_down" ? input.interval + 5 : input.interval,
        }),
    ),
  );
});

/** Mint a new API key from an identity assertion; the previous key is revoked. */
export const exchangeAssertion = Effect.fn("Boat.exchangeAssertion")(function* (input: {
  readonly identityAssertion: Redacted.Redacted<string>;
  readonly origin?: string;
}) {
  const origin = input.origin ?? DEFAULT_ORIGIN;
  const body = yield* send(
    "key refresh",
    tokenRequest(origin, {
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: Redacted.value(input.identityAssertion),
      resource: `${origin}/api/v1/`,
    }),
    TokenResponse,
  );
  return issued(body);
});
