import type * as API from "@distilled.cloud/core/api";
import type { API_ERRORS, ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { makeRestProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * SpacetimeDBProtocol -- hand-written.
 *
 * SpacetimeDB speaks bearer-authenticated JSON REST (no response envelope),
 * with optional anonymous access when no token is configured:
 *
 *   request:  credentials -> `Authorization: Bearer <token>` when the token
 *             is non-empty + base URL (default
 *             https://maincloud.spacetimedb.com), resolved from the calling
 *             fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-JSON 2xx (logs, PEM, identity hex) is the
 *             raw text; non-2xx bodies map to the operation's typed error
 *             classes by status, then the shared HTTP-status classes, then
 *             {@link UnknownSpacetimeDBError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { UnknownSpacetimeDBError, SpacetimeDBParseError } from "./errors.ts";

/**
 * Error channel shared by every generated SpacetimeDB operation. Generated
 * service files annotate operations with
 * `API.OperationMethod<I, O, SpacetimeDBOpError, SpacetimeDBOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type SpacetimeDBOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownSpacetimeDBError
  | ConfigError
  | HttpClientError.HttpClientError
  | SpacetimeDBParseError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated SpacetimeDB operation. */
export type SpacetimeDBOpContext = Credentials | HttpClient.HttpClient;

const resolveCredentials = /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve);

export const SpacetimeDBProtocol: API.ProtocolLayer<SpacetimeDBOpError, SpacetimeDBOpContext> =
  /*@__PURE__*/ makeRestProtocol({
    credentials: resolveCredentials,
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds): Record<string, string> => {
      const headers: Record<string, string> = {};
      const token = Redacted.value(creds.apiKey);
      if (token !== "") {
        headers.Authorization = `Bearer ${token}`;
      }
      return headers;
    },
    unknownError: (info) => new UnknownSpacetimeDBError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new SpacetimeDBParseError({ body, cause }),
  });
