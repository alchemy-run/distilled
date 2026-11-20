import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * OpencodeProtocol -- hand-written.
 *
 * OpenCode speaks plain JSON REST (no response envelope), so the whole
 * protocol is one `restProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials -> optional `Authorization: Basic <user:pass>` +
 *             base URL (default http://127.0.0.1:4096), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ code?, message }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownOpencodeError}.
 */
import * as Effect from "effect/Effect";
import * as Base64 from "effect/encoding/Base64";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownOpencodeError, OpencodeParseError, type OpencodeServiceError } from "./errors.ts";

/**
 * The errors declared on OpenCode's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link OpencodeParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownOpencodeError}), and
 * core's REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type OpencodeProtocolError = RestProtocolError | OpencodeParseError | UnknownOpencodeError;

/**
 * What every generated OpenCode operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, OpencodeOpError, OpencodeOpContext>` explicitly
 * so the compiler never infers these back out of the schema generics.
 */
export type OpencodeOpError = OpencodeServiceError | OpencodeProtocolError | CredentialsError;

/** Context (requirements) shared by every generated OpenCode operation. */
export type OpencodeOpContext = Credentials | HttpClient.HttpClient;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const OpencodeProtocol: Protocol<OpencodeProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds): Record<string, string> => {
      const headers: Record<string, string> = {};
      if (creds.password !== undefined) {
        headers.Authorization = `Basic ${Base64.encode(`${creds.username}:${Redacted.value(creds.password)}`)}`;
      }
      return headers;
    },
    // OpenCode's error body is `{ name?, message }` -- the factory's default
    // lenient envelope covers it.
    unknownError: (info) => new UnknownOpencodeError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new OpencodeParseError({ body, cause }),
  });
