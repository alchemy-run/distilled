import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * CoinflowProtocol -- the shared REST protocol instantiated for the Coinflow
 * API.
 *
 * Requests carry the merchant API key as the raw `Authorization` header
 * value and go to the configured environment (sandbox by default). End-user
 * headers (`x-coinflow-auth-*`) are operation input members. Responses are
 * plain JSON with no success envelope.
 *
 * Failures are `{ msg }`, `{ message }`, or a richer body (a 451's
 * `verificationLink`). Each status an operation declares maps to its typed
 * error class, which keeps the parsed body; status classes from core's
 * shared map cover the rest.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { CoinflowParseError, UnknownCoinflowError, type CoinflowServiceError } from "./errors.ts";

/**
 * The errors declared on Coinflow's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match
 * its schema ({@link CoinflowParseError}), a failed response that neither
 * the operation nor the service declares ({@link UnknownCoinflowError}), and
 * core's REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type CoinflowProtocolError = RestProtocolError | CoinflowParseError | UnknownCoinflowError;

/**
 * What every generated Coinflow operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, CoinflowOpError, CoinflowOpContext>` explicitly
 * so the compiler never infers these back out of the schema generics.
 */
export type CoinflowOpError = CoinflowServiceError | CoinflowProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Coinflow operation. */
export type CoinflowOpContext = Credentials | HttpClient.HttpClient;

const errorEnvelope = (body: unknown) => {
  if (typeof body !== "object" || body === null) return undefined;
  const { msg, message, error } = body as Record<string, unknown>;
  return {
    message:
      typeof msg === "string"
        ? msg
        : typeof message === "string"
          ? message
          : typeof error === "string"
            ? error
            : undefined,
  };
};

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const CoinflowProtocol: Protocol<CoinflowProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // Resolved on the calling fiber per request, so a rotated key is picked
    // up without rebuilding the protocol.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: Redacted.value(creds.apiKey),
    }),
    errorEnvelope,
    unknownError: (info) => new UnknownCoinflowError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new CoinflowParseError({ body, cause }),
  });
