import type { ErrorOf } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
/**
 * PorkbunProtocol -- hand-written.
 *
 * Porkbun speaks JSON REST authenticated with `X-API-Key` /
 * `X-Secret-API-Key` (no success envelope), so the whole protocol is one
 * `restProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials -> `X-API-Key` + `X-Secret-API-Key` + base URL
 *             (default https://api.porkbun.com/api/json/v3), resolved from
 *             the calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ status: "ERROR", code?, message }`
 *             bodies map to the operation's typed error classes by status,
 *             then the shared HTTP-status classes, then
 *             {@link UnknownPorkbunError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import { Credentials, formatHeaders } from "./credentials.ts";
import { UnknownPorkbunError, PorkbunParseError, type PorkbunServiceError } from "./errors.ts";

/**
 * What every generated Porkbun operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, PorkbunOpError, PorkbunOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type PorkbunOpError = PorkbunServiceError | ErrorOf<typeof PorkbunProtocol>;

/** Context (requirements) shared by every generated Porkbun operation. */
export type PorkbunOpContext = Credentials | HttpClient.HttpClient;

/**
 * Porkbun error bodies are `{ status: "ERROR", message, code?, next_action? }`.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const obj = body as Record<string, unknown>;
  const code = obj.code;
  const message = obj.message;
  if (typeof code !== "string" && typeof message !== "string") return undefined;
  return {
    code: typeof code === "string" ? code : undefined,
    message: typeof message === "string" ? message : undefined,
  };
};

export const PorkbunProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => formatHeaders(creds),
  errorEnvelope,
  unknownError: (info) => new UnknownPorkbunError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new PorkbunParseError({ body, cause }),
});
