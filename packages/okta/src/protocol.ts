import type { ErrorOf } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
/**
 * OktaProtocol -- hand-written.
 *
 * Okta speaks JSON REST (no response envelope), so the whole protocol is one
 * `restProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: SSWS <apiToken>` (API token) or
 *             `Authorization: Bearer <apiToken>` (OAuth) + org base URL
 *             (`https://{yourOktaDomain}`), resolved from the calling fiber
 *             on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ errorCode, errorSummary }` bodies map
 *             to the operation's typed error classes by status, then the
 *             shared HTTP-status classes, then {@link UnknownOktaError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import { Credentials, formatHeaders } from "./credentials.ts";
import { UnknownOktaError, OktaParseError, type OktaServiceError } from "./errors.ts";

/**
 * What every generated Okta operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, OktaOpError, OktaOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type OktaOpError = OktaServiceError | ErrorOf<typeof OktaProtocol>;

/** Context (requirements) shared by every generated Okta operation. */
export type OktaOpContext = Credentials | HttpClient.HttpClient;

/**
 * Okta error bodies are `{ errorCode, errorSummary, errorLink?, errorId?,
 * errorCauses? }`. A response that arrives without that envelope falls
 * through to the protocol's `HTTP <status>` default.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const code =
    typeof b.errorCode === "string" ? b.errorCode : typeof b.code === "string" ? b.code : undefined;
  const message =
    typeof b.errorSummary === "string"
      ? b.errorSummary
      : typeof b.message === "string"
        ? b.message
        : undefined;
  if (code === undefined && message === undefined) return undefined;
  return { code, message };
};

export const OktaProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => formatHeaders(creds),
  errorEnvelope,
  unknownError: (info) => new UnknownOktaError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new OktaParseError({ body, cause }),
});
