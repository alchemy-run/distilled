import { ConfigError } from "@distilled.cloud/core/errors";
import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  type RestProtocolError,
  restProtocol,
  type RestProtocolOptions,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
/**
 * The three Convex protocols -- hand-written.
 *
 * Convex is plain JSON REST with no response envelope, and failures are
 * `{ code, message }`, which the factory's default extractor reads. Each API
 * differs in where it lives and how it authenticates, so each generated
 * service uses its own protocol:
 *
 * | Service      | Base URL                 | Authorization     |
 * | ------------ | ------------------------ | ----------------- |
 * | `management` | `apiBaseUrl`             | `Bearer <token>`  |
 * | `deployment` | `{deploymentUrl}/api/v1` | `Convex <token>`  |
 * | `functions`  | `{deploymentUrl}/api`    | none              |
 *
 * Each API refuses the other's scheme: the Management API answers 401
 * `MissingAccessToken` to `Convex`, the Deployment API answers 401
 * `InvalidAuthHeader` to `Bearer`, and `functions` treats `Bearer` as a user
 * JWT.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config, type CredentialsError } from "./credentials.ts";
import { ConvexParseError, UnknownConvexError, type ConvexServiceError } from "./errors.ts";

/**
 * The errors declared on Convex's protocol: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link ConvexParseError}), a failed response that neither the operation nor
 * the service declares ({@link UnknownConvexError}), credentials that lack what
 * the API needs (`ConfigError`: a token, or a deployment URL), and core's REST
 * errors (a bad path label, a request that can't be built, the transport).
 */
export type ConvexProtocolError =
  | RestProtocolError
  | ConvexParseError
  | UnknownConvexError
  | ConfigError;

/**
 * What every generated Convex operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, ConvexOpError, ConvexOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type ConvexOpError = ConvexServiceError | ConvexProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Convex operation. */
export type ConvexOpContext = Credentials | HttpClient.HttpClient;

const resolveCredentials = /*@__PURE__*/ Effect.flatten(Credentials);

/** Credentials for an API that needs a token. */
const withToken = /*@__PURE__*/ Effect.flatMap(resolveCredentials, (creds) =>
  creds.token === undefined
    ? Effect.fail(new ConfigError({ message: "This Convex API needs a token in Credentials" }))
    : Effect.succeed({ ...creds, token: creds.token }),
);

/** A deployment's base URL; credentials without one refuse the route. */
const deploymentBaseUrl = (
  creds: Config,
  path: string,
): string | Effect.Effect<never, ConfigError> => {
  if (creds.deploymentUrl === undefined || creds.deploymentUrl === "") {
    return Effect.fail(
      new ConfigError({
        message: "This Convex API lives on a deployment: set deploymentUrl with fromDeployment",
      }),
    );
  }
  return `${creds.deploymentUrl.replace(/\/+$/, "")}${path}`;
};

const shared = {
  unknownError: (info) => new UnknownConvexError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new ConvexParseError({ body, cause }),
} satisfies Pick<RestProtocolOptions<Config>, "unknownError" | "parseError">;

// The annotations are the check: everything a protocol fails with, besides
// the errors an operation and the service declare, must be listed there.

/** The Management API, for the `convex` service. */
export const ConvexProtocol: Protocol<ConvexProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    credentials: withToken,
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({ Authorization: `Bearer ${Redacted.value(creds.token)}` }),
    ...shared,
  });

/** The Deployment API, for the `deployment` service. */
export const ConvexDeploymentProtocol: Protocol<
  ConvexProtocolError | CredentialsError,
  Credentials
> = /*@__PURE__*/ restProtocol({
  credentials: withToken,
  baseUrl: (creds) => deploymentBaseUrl(creds, "/api/v1"),
  headers: (creds) => ({ Authorization: `Convex ${Redacted.value(creds.token)}` }),
  ...shared,
});

/** The public HTTP API, for the `functions` service. */
export const ConvexFunctionsProtocol: Protocol<
  ConvexProtocolError | CredentialsError,
  Credentials
> = /*@__PURE__*/ restProtocol({
  credentials: resolveCredentials,
  baseUrl: (creds) => deploymentBaseUrl(creds, "/api"),
  headers: () => ({}),
  ...shared,
});
