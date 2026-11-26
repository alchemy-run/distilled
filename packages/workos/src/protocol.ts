import type { ErrorOf } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
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
import { Credentials } from "./credentials.ts";
import { UnknownWorkosError, WorkosParseError, type WorkosServiceError } from "./errors.ts";

/**
 * What every generated WorkOS operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, WorkosOpError, WorkosOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type WorkosOpError = WorkosServiceError | ErrorOf<typeof WorkosProtocol>;

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

export const WorkosProtocol = /*@__PURE__*/ restProtocol({
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
