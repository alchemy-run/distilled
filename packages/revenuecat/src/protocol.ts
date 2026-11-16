import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import {
  RevenueCatParseError,
  UnknownRevenueCatError,
  type RevenueCatServiceError,
} from "./errors.ts";

/**
 * The errors declared on RevenueCat's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link RevenueCatParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownRevenueCatError}), and
 * core's REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type RevenueCatProtocolError =
  | RestProtocolError
  | RevenueCatParseError
  | UnknownRevenueCatError;

/**
 * What every generated RevenueCat operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, RevenueCatOpError, RevenueCatOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type RevenueCatOpError = RevenueCatServiceError | RevenueCatProtocolError | CredentialsError;

export type RevenueCatOpContext = Credentials | HttpClient.HttpClient;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const RevenueCatProtocol: Protocol<RevenueCatProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    }),
    errorEnvelope: (body) => {
      if (body === null || typeof body !== "object") return undefined;
      const { type, message } = body as Record<string, unknown>;
      return {
        code: typeof type === "string" ? type : undefined,
        message: typeof message === "string" ? message : undefined,
      };
    },
    unknownError: (info) => new UnknownRevenueCatError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new RevenueCatParseError({ body, cause }),
  });
