import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * OvhProtocol -- hand-written.
 *
 * OVH speaks bearer-authenticated JSON REST (no response envelope), so the
 * whole protocol is one `restProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <access_token>` + base URL
 *             (default https://eu.api.ovh.com/1.0), resolved from the calling
 *             fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ message, errorCode? | class? }` bodies
 *             map to the operation's typed error classes by status, then the
 *             shared HTTP-status classes, then {@link UnknownOvhError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownOvhError, OvhParseError, type OvhServiceError } from "./errors.ts";

/**
 * The errors declared on OVH's protocol: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link OvhParseError}), a failed response that neither the operation nor
 * the service declares ({@link UnknownOvhError}), and core's REST errors (a
 * bad path label, a request that can't be built, the transport).
 */
export type OvhProtocolError = RestProtocolError | OvhParseError | UnknownOvhError;

/**
 * What every generated OVH operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, OvhOpError, OvhOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type OvhOpError = OvhServiceError | OvhProtocolError | CredentialsError;

/** Context (requirements) shared by every generated OVH operation. */
export type OvhOpContext = Credentials | HttpClient.HttpClient;

/**
 * OVH error bodies are `{ message, errorCode? }` or `{ class, message }`.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const message = typeof b.message === "string" ? b.message : undefined;
  const code =
    typeof b.errorCode === "string" || typeof b.errorCode === "number"
      ? b.errorCode
      : typeof b.class === "string"
        ? b.class
        : typeof b.code === "string" || typeof b.code === "number"
          ? b.code
          : undefined;
  return { code, message };
};

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const OvhProtocol: Protocol<OvhProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    }),
    errorEnvelope,
    unknownError: (info) => new UnknownOvhError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new OvhParseError({ body, cause }),
  });
