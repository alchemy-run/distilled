import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * CustomerioProtocol -- hand-written.
 *
 * Customer.io's Journeys App API speaks bearer-authenticated JSON REST (no
 * response envelope), so the protocol is one `restProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <apiKey>` + base URL
 *             (default https://api.customer.io; EU is
 *             https://api-eu.customer.io), resolved from the calling fiber
 *             on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ errors: [{ detail }] }` /
 *             `{ meta: { errors } }` bodies map to the operation's typed
 *             error classes by status, then the shared HTTP-status classes,
 *             then {@link UnknownCustomerioError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import {
  UnknownCustomerioError,
  CustomerioParseError,
  type CustomerioServiceError,
} from "./errors.ts";

/**
 * The errors declared on Customer.io's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link CustomerioParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownCustomerioError}), and
 * core's REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type CustomerioProtocolError =
  | RestProtocolError
  | CustomerioParseError
  | UnknownCustomerioError;

/**
 * What every generated Customer.io operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, CustomerioOpError, CustomerioOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type CustomerioOpError = CustomerioServiceError | CustomerioProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Customer.io operation. */
export type CustomerioOpContext = Credentials | HttpClient.HttpClient;

/**
 * Customer.io error bodies are one of:
 *   `{ errors: [{ detail, status, meta? }] }`
 *   `{ meta: { errors: string[] } }`
 *   `{ message }` / `{ error }`
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const errors = Array.isArray(b.errors) ? b.errors : undefined;
  const first =
    errors !== undefined && errors.length > 0 && typeof errors[0] === "object"
      ? (errors[0] as Record<string, unknown>)
      : undefined;
  const meta =
    b.meta !== null && typeof b.meta === "object" ? (b.meta as Record<string, unknown>) : undefined;
  const metaErrors = Array.isArray(meta?.errors) ? meta.errors : undefined;
  const message =
    typeof first?.detail === "string"
      ? first.detail
      : typeof first?.message === "string"
        ? first.message
        : typeof metaErrors?.[0] === "string"
          ? metaErrors[0]
          : typeof b.message === "string"
            ? b.message
            : typeof b.error === "string"
              ? b.error
              : undefined;
  const code =
    typeof first?.status === "number" || typeof first?.status === "string"
      ? first.status
      : typeof first?.code === "string" || typeof first?.code === "number"
        ? first.code
        : typeof b.code === "string" || typeof b.code === "number"
          ? b.code
          : undefined;
  return { code, message };
};

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const CustomerioProtocol: Protocol<CustomerioProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    }),
    errorEnvelope,
    unknownError: (info) => new UnknownCustomerioError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new CustomerioParseError({ body, cause }),
  });
