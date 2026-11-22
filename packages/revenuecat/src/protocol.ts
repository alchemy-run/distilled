import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import {
  RevenueCatParseError,
  UnknownRevenueCatError,
  type RevenueCatServiceError,
} from "./errors.ts";

/**
 * What every generated RevenueCat operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, RevenueCatOpError, RevenueCatOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type RevenueCatOpError = RevenueCatServiceError | ErrorOf<typeof RevenueCatProtocol>;

export type RevenueCatOpContext = Credentials | HttpClient.HttpClient;

export const RevenueCatProtocol = /*@__PURE__*/ restProtocol({
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
