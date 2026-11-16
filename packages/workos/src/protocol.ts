import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * WorkosProtocol -- the shared bearer-REST protocol instantiated for WorkOS.
 *
 * WorkOS speaks plain JSON with no response envelope; list endpoints return
 * `{ object, data[], list_metadata }` verbatim (no unwrapping -- v0 parity).
 * Failures map like distilled v0's `matchError`: the body's
 * `message`/`error_description`/`error` string (in that order) plus optional
 * string `code`, then the shared HTTP status map (with `retryAfter` stamped
 * on retryable statuses), then {@link UnknownWorkosError} for anything with
 * no mapped status.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownWorkosError, WorkosParseError, type WorkosServiceError } from "./errors.ts";

/**
 * The errors declared on WorkOS's protocol: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link WorkosParseError}), a failed response that neither the operation nor
 * the service declares ({@link UnknownWorkosError}), and core's REST errors (a
 * bad path label, a request that can't be built, the transport).
 */
export type WorkosProtocolError = RestProtocolError | WorkosParseError | UnknownWorkosError;

/**
 * What every generated WorkOS operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, WorkosOpError, WorkosOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type WorkosOpError = WorkosServiceError | WorkosProtocolError | CredentialsError;

/** Context (requirements) shared by every generated WorkOS operation. */
export type WorkosOpContext = Credentials | HttpClient.HttpClient;

/**
 * The WorkOS API returns errors with a human-readable `message` field; some
 * endpoints instead carry `error` / `error_description` (OAuth-style), and
 * some add a string `code`.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const message =
    typeof b.message === "string"
      ? b.message
      : typeof b.error_description === "string"
        ? b.error_description
        : typeof b.error === "string"
          ? b.error
          : undefined;
  const code = typeof b.code === "string" || typeof b.code === "number" ? b.code : undefined;
  return { code, message };
};

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const WorkosProtocol: Protocol<WorkosProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // Resolved on the CALLING fiber per request; the Credentials service holds
    // an effect so rotating keys Just Work.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    }),
    errorEnvelope,
    unknownError: (info) => new UnknownWorkosError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new WorkosParseError({ body, cause }),
  });
