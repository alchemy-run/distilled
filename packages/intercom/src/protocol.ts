import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * IntercomProtocol -- hand-written.
 *
 * Intercom speaks bearer-authenticated JSON REST (no response envelope), so
 * the protocol is one `restProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <access token>` +
 *             `Intercom-Version` + base URL (default
 *             https://api.intercom.io), resolved from the calling fiber on
 *             every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ type: "error.list", errors: [{ code,
 *             message }] }` bodies map to the operation's typed error classes
 *             by status, then the shared HTTP-status classes, then
 *             {@link UnknownIntercomError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownIntercomError, IntercomParseError, type IntercomServiceError } from "./errors.ts";

/**
 * The errors declared on Intercom's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link IntercomParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownIntercomError}), and
 * core's REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type IntercomProtocolError = RestProtocolError | IntercomParseError | UnknownIntercomError;

/**
 * What every generated Intercom operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, IntercomOpError, IntercomOpContext>` explicitly
 * so the compiler never infers these back out of the schema generics.
 */
export type IntercomOpError = IntercomServiceError | IntercomProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Intercom operation. */
export type IntercomOpContext = Credentials | HttpClient.HttpClient;

/**
 * Intercom's error body is `{ type: "error.list", request_id?, errors:
 * [{ code, message }] }`. Take the first error's message/code when present.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const errors = Array.isArray(b.errors) ? b.errors : undefined;
  const first =
    errors !== undefined && errors.length > 0 && typeof errors[0] === "object"
      ? (errors[0] as Record<string, unknown>)
      : undefined;
  const message =
    typeof first?.message === "string"
      ? first.message
      : typeof b.message === "string"
        ? b.message
        : undefined;
  const code =
    typeof first?.code === "string" || typeof first?.code === "number"
      ? first.code
      : typeof b.code === "string" || typeof b.code === "number"
        ? b.code
        : undefined;
  return { code, message };
};

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const IntercomProtocol: Protocol<IntercomProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
      Accept: "application/json",
      "Intercom-Version": creds.apiVersion,
    }),
    errorEnvelope,
    unknownError: (info) => new UnknownIntercomError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new IntercomParseError({ body, cause }),
  });
