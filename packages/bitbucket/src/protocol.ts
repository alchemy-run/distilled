import type { ErrorOf } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
/**
 * BitbucketProtocol -- the shared REST protocol instantiated for the
 * Bitbucket Cloud REST API.
 *
 *   request:  credentials -> `Authorization: Basic ...` (API token) or
 *             `Bearer ...` (access token) + base URL (default
 *             https://api.bitbucket.org/2.0), resolved from the calling
 *             fiber on every request
 *
 *   response: 2xx JSON is the payload; non-2xx `{ type: "error", error: {
 *             message, detail? } }` bodies map to the operation's typed
 *             error classes, then the shared HTTP-status classes, then
 *             {@link UnknownBitbucketError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import {
  BitbucketParseError,
  UnknownBitbucketError,
  type BitbucketServiceError,
} from "./errors.ts";

/**
 * What every generated Bitbucket operation fails with besides its own errors:
 * the errors declared on the service, and the errors declared on the protocol.
 * Nobody lists the protocol's: its type carries what its code fails with (a
 * response that does not match its schema, a failed response nothing declares,
 * core's REST errors, and what resolving the credentials fails with).
 * Generated service files annotate operations with `API.OperationMethod<I, O,
 * BitbucketOpError, BitbucketOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type BitbucketOpError = BitbucketServiceError | ErrorOf<typeof BitbucketProtocol>;

/** Context (requirements) shared by every generated Bitbucket operation. */
export type BitbucketOpContext = Credentials | HttpClient.HttpClient;

const str = (value: unknown): string | undefined =>
  typeof value === "string" && value !== "" ? value : undefined;

/**
 * `{ type: "error", error: { message, detail?, fields?, id? } }`. The message
 * is short ("Bad request"); the detail, when present, says what was wrong
 * ("You must specify a valid source branch when creating a pull request."),
 * so the message is both, joined. Bitbucket sends no machine-readable code.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const error = (body as Record<string, unknown>).error;
  if (error === null || typeof error !== "object") return undefined;
  const rec = error as Record<string, unknown>;
  const message = str(rec.message);
  const detail = str(rec.detail);
  if (message === undefined) return detail === undefined ? undefined : { message: detail };
  return { message: detail === undefined ? message : `${message}: ${detail}` };
};

export const BitbucketProtocol = /*@__PURE__*/ restProtocol({
  // Resolved on the calling fiber per request, so a Credentials layer that
  // rotates tokens is picked up without rebuilding anything.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.baseUrl,
  headers: (creds) => ({
    Authorization: Redacted.value(creds.authorization),
  }),
  errorEnvelope,
  unknownError: (info) => new UnknownBitbucketError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new BitbucketParseError({ body, cause }),
});
