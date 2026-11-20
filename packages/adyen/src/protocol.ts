import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * AdyenProtocol -- hand-written.
 *
 * Adyen Checkout speaks JSON REST authenticated with `X-API-Key` (no
 * response envelope), so the whole protocol is one `restProtocol` call
 * from `core/protocol-rest`:
 *
 *   request:  credentials -> `X-API-Key: <apiKey>` + base URL
 *             (default https://checkout-test.adyen.com/v72), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ errorCode?, message }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownAdyenError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownAdyenError, AdyenParseError, type AdyenServiceError } from "./errors.ts";

/**
 * The errors declared on Adyen's protocol: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link AdyenParseError}), a failed response that neither the operation nor
 * the service declares ({@link UnknownAdyenError}), and core's REST errors (a
 * bad path label, a request that can't be built, the transport).
 */
export type AdyenProtocolError = RestProtocolError | AdyenParseError | UnknownAdyenError;

/**
 * What every generated Adyen operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, AdyenOpError, AdyenOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type AdyenOpError = AdyenServiceError | AdyenProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Adyen operation. */
export type AdyenOpContext = Credentials | HttpClient.HttpClient;

/**
 * Adyen Checkout errors are a flat `ServiceError`:
 * `{ status?, errorCode?, message?, errorType?, pspReference? }`.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const obj = body as Record<string, unknown>;
  const code = obj.errorCode;
  const message = obj.message;
  if (typeof code !== "string" && typeof message !== "string") return undefined;
  return {
    code: typeof code === "string" ? code : undefined,
    message: typeof message === "string" ? message : undefined,
  };
};

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const AdyenProtocol: Protocol<AdyenProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      "X-API-Key": Redacted.value(creds.apiKey),
    }),
    errorEnvelope,
    unknownError: (info) => new UnknownAdyenError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new AdyenParseError({ body, cause }),
  });
