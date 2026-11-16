import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * ArchilProtocol -- hand-written.
 *
 * Archil speaks API-key authenticated JSON REST. Success and error bodies
 * use a consistent envelope (`{ success, data }` / `{ success, error }`):
 *
 *   request:  credentials -> `Authorization: <apiKey>` + base URL
 *             (default https://control.green.us-east-1.aws.prod.archil.com),
 *             resolved from the calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ error?: string }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownArchilError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownArchilError, ArchilParseError, type ArchilServiceError } from "./errors.ts";

/**
 * The errors declared on Archil's protocol: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link ArchilParseError}), a failed response that neither the operation nor
 * the service declares ({@link UnknownArchilError}), and core's REST errors (a
 * bad path label, a request that can't be built, the transport).
 */
export type ArchilProtocolError = RestProtocolError | ArchilParseError | UnknownArchilError;

/**
 * What every generated Archil operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, ArchilOpError, ArchilOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type ArchilOpError = ArchilServiceError | ArchilProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Archil operation. */
export type ArchilOpContext = Credentials | HttpClient.HttpClient;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const ArchilProtocol: Protocol<ArchilProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    // Archil's control plane authenticates with the raw API key, not Bearer.
    headers: (creds) => ({
      Authorization: Redacted.value(creds.apiKey),
    }),
    // Archil's error body is `{ success: false, error: string }` -- map
    // `error` onto the unknown-error message when `message` is absent.
    unknownError: (info) =>
      new UnknownArchilError({
        ...unknownErrorProps(info),
        message:
          info.message ??
          (info.body !== null &&
          typeof info.body === "object" &&
          "error" in info.body &&
          typeof (info.body as { error: unknown }).error === "string"
            ? (info.body as { error: string }).error
            : undefined),
      }),
    parseError: ({ body, cause }) => new ArchilParseError({ body, cause }),
  });
