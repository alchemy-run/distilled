import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * PlaidProtocol -- hand-written.
 *
 * Plaid speaks header-authenticated JSON REST (no response envelope), so
 * the whole protocol is one `restProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `PLAID-CLIENT-ID` / `PLAID-SECRET` /
 *             `Plaid-Version` + base URL (default
 *             https://sandbox.plaid.com), resolved from the calling fiber
 *             on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ error_code?, error_message }` bodies
 *             map to the operation's typed error classes by status, then
 *             the shared HTTP-status classes, then {@link UnknownPlaidError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import { Credentials, formatHeaders, type CredentialsError } from "./credentials.ts";
import { UnknownPlaidError, PlaidParseError, type PlaidServiceError } from "./errors.ts";

/**
 * The errors declared on Plaid's protocol: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link PlaidParseError}), a failed response that neither the operation nor
 * the service declares ({@link UnknownPlaidError}), and core's REST errors (a
 * bad path label, a request that can't be built, the transport).
 */
export type PlaidProtocolError = RestProtocolError | PlaidParseError | UnknownPlaidError;

/**
 * What every generated Plaid operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, PlaidOpError, PlaidOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type PlaidOpError = PlaidServiceError | PlaidProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Plaid operation. */
export type PlaidOpContext = Credentials | HttpClient.HttpClient;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const PlaidProtocol: Protocol<PlaidProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => formatHeaders(creds),
    // Plaid's error body is `{ error_type, error_code, error_message }`.
    errorEnvelope: (body) => {
      if (body === null || typeof body !== "object") return undefined;
      const b = body as Record<string, unknown>;
      const code =
        typeof b.error_code === "string" || typeof b.error_code === "number"
          ? b.error_code
          : typeof b.code === "string" || typeof b.code === "number"
            ? b.code
            : undefined;
      const message =
        typeof b.error_message === "string"
          ? b.error_message
          : typeof b.message === "string"
            ? b.message
            : undefined;
      return { code, message };
    },
    unknownError: (info) => new UnknownPlaidError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new PlaidParseError({ body, cause }),
  });
