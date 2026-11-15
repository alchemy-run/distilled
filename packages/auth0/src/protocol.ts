import type * as API from "@distilled.cloud/core/api";
import type { API_ERRORS, ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { makeRestProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * Auth0Protocol -- hand-written.
 *
 * Auth0's Management API speaks plain bearer-authenticated JSON REST (no
 * response envelope), so the whole protocol is one `makeRestProtocol` call
 * from `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <token>` + base URL
 *             (`https://{domain}/api/v2`), resolved from the calling fiber
 *             on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ statusCode?, error?, errorCode?,
 *             message }` bodies map to the operation's typed error classes
 *             by status, then the shared HTTP-status classes, then
 *             {@link UnknownAuth0Error}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { UnknownAuth0Error, Auth0ParseError } from "./errors.ts";

/**
 * Error channel shared by every generated Auth0 operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, Auth0OpError,
 * Auth0OpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type Auth0OpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownAuth0Error
  | ConfigError
  | HttpClientError.HttpClientError
  | Auth0ParseError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated Auth0 operation. */
export type Auth0OpContext = Credentials | HttpClient.HttpClient;

const resolveCredentials = /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve);

export const Auth0Protocol: API.ProtocolLayer<Auth0OpError, Auth0OpContext> =
  /*@__PURE__*/ makeRestProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: resolveCredentials,
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.token)}`,
    }),
    // Auth0's error body is `{ statusCode?, error?, errorCode?, message }` --
    // the factory's default lenient envelope covers it.
    unknownError: (info) => new UnknownAuth0Error(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new Auth0ParseError({ body, cause }),
  });
