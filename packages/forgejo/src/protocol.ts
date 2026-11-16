import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * ForgejoProtocol -- the shared bearer-REST protocol instantiated for Forgejo.
 *
 * Forgejo speaks plain JSON with no response envelope: list endpoints return
 * a bare array, single resources return the object itself, and many
 * mutations answer `204 No Content`. Failures carry `{ message, url }`; the
 * message is the only signal, so typed errors beyond the status-derived ones
 * (see `patches/`) match on it.
 *
 * Authentication is the `token` scheme (`Authorization: token <token>`),
 * which Forgejo accepts for access tokens; `Bearer` is only honoured for
 * OAuth2 tokens.
 *
 * Pagination is by page number (`page`/`limit`) with the total reported in
 * an `X-Total-Count` response header and no in-body token, so no pagination
 * trait is stamped on list operations -- callers advance `page` until an
 * empty page comes back. See `scripts/generate.ts`.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownForgejoError, ForgejoParseError, type ForgejoServiceError } from "./errors.ts";

/**
 * The errors declared on Forgejo's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link ForgejoParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownForgejoError}), and core's
 * REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type ForgejoProtocolError = RestProtocolError | ForgejoParseError | UnknownForgejoError;

/**
 * What every generated Forgejo operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, ForgejoOpError, ForgejoOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type ForgejoOpError = ForgejoServiceError | ForgejoProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Forgejo operation. */
export type ForgejoOpContext = Credentials | HttpClient.HttpClient;

/**
 * Forgejo error bodies are `{ message, url }`. A response that arrives
 * without that envelope (a proxy 502, an HTML error page) falls through to
 * the protocol's raw-text / `HTTP <status>` default.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  return {
    message: typeof b.message === "string" ? b.message : undefined,
  };
};

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const ForgejoProtocol: Protocol<ForgejoProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // Resolved on the CALLING fiber per request; the Credentials service holds
    // an effect, so a token rotated between calls is picked up.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `token ${Redacted.value(creds.token)}`,
      Accept: "application/json",
    }),
    errorEnvelope,
    unknownError: (info) => new UnknownForgejoError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new ForgejoParseError({ body, cause }),
  });
