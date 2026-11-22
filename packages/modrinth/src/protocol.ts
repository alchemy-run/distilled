import type { ErrorOf } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
/**
 * ModrinthProtocol -- hand-written.
 *
 * Modrinth (Labrinth) speaks plain JSON REST (no response envelope):
 *
 *   request:  credentials -> optional `Authorization: <apiKey>` (no Bearer)
 *             + `User-Agent` + base URL (default
 *             https://api.modrinth.com/v2), resolved from the calling fiber
 *             on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ error?, description? }` bodies map to
 *             the operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownModrinthError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { UnknownModrinthError, ModrinthParseError, type ModrinthServiceError } from "./errors.ts";

/**
 * What every generated Modrinth operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, ModrinthOpError, ModrinthOpContext>` explicitly
 * so the compiler never infers these back out of the schema generics.
 */
export type ModrinthOpError = ModrinthServiceError | ErrorOf<typeof ModrinthProtocol>;

/** Context (requirements) shared by every generated Modrinth operation. */
export type ModrinthOpContext = Credentials | HttpClient.HttpClient;

/**
 * Labrinth error bodies are typically `{ error, description }`. Fall back
 * to `message` when present.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const message =
    typeof b.description === "string"
      ? b.description
      : typeof b.message === "string"
        ? b.message
        : undefined;
  const code =
    typeof b.error === "string"
      ? b.error
      : typeof b.code === "string" || typeof b.code === "number"
        ? b.code
        : undefined;
  if (code === undefined && message === undefined) return undefined;
  return { code, message };
};

export const ModrinthProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    "User-Agent": creds.userAgent,
    ...(creds.apiKey ? { Authorization: Redacted.value(creds.apiKey) } : {}),
  }),
  errorEnvelope,
  unknownError: (info) => new UnknownModrinthError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new ModrinthParseError({ body, cause }),
});
