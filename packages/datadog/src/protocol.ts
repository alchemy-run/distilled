import type { ErrorOf } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
/**
 * DatadogProtocol -- hand-written.
 *
 * Datadog speaks plain JSON REST (no response envelope), so the whole
 * protocol is one `restProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials -> `DD-API-KEY` + optional `DD-APPLICATION-KEY` +
 *             base URL (default https://api.datadoghq.com), resolved from
 *             the calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ errors: string[] | object[] }` bodies
 *             map to the operation's typed error classes by status, then the
 *             shared HTTP-status classes, then {@link UnknownDatadogError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { UnknownDatadogError, DatadogParseError, type DatadogServiceError } from "./errors.ts";

/**
 * What every generated Datadog operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, DatadogOpError, DatadogOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type DatadogOpError = DatadogServiceError | ErrorOf<typeof DatadogProtocol>;

/** Context (requirements) shared by every generated Datadog operation. */
export type DatadogOpContext = Credentials | HttpClient.HttpClient;

/**
 * Datadog error bodies are typically `{ errors: string[] }` or JSON:API
 * `{ errors: [{ title?, detail?, status? }] }`. Surface the first entry as
 * `message` so status matchers and logs have something to key on.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const first = Array.isArray(b.errors) ? b.errors[0] : undefined;
  if (typeof first === "string") {
    return { message: first };
  }
  if (first !== null && typeof first === "object") {
    const e = first as Record<string, unknown>;
    const message =
      typeof e.detail === "string"
        ? e.detail
        : typeof e.title === "string"
          ? e.title
          : typeof b.message === "string"
            ? b.message
            : undefined;
    const code =
      typeof e.code === "string" ? e.code : typeof e.status === "string" ? e.status : undefined;
    return { code, message };
  }
  const message = typeof b.message === "string" ? b.message : undefined;
  const code = typeof b.code === "string" || typeof b.code === "number" ? b.code : undefined;
  return message !== undefined || code !== undefined ? { code, message } : undefined;
};

export const DatadogProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => {
    const headers: Record<string, string> = {
      "DD-API-KEY": Redacted.value(creds.apiKey),
      Accept: "application/json",
    };
    if (creds.applicationKey !== undefined) {
      headers["DD-APPLICATION-KEY"] = Redacted.value(creds.applicationKey);
    }
    return headers;
  },
  errorEnvelope,
  unknownError: (info) => new UnknownDatadogError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new DatadogParseError({ body, cause }),
});
