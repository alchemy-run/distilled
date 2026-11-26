import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
/**
 * GrafanaProtocol -- hand-written.
 *
 * Grafana speaks bearer-authenticated JSON REST (no response envelope),
 * so the whole protocol is one `restProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <token>` + optional
 *             `X-Grafana-Org-Id`, resolved from the calling fiber on every
 *             request. Paths in the spec are relative to `/api`, so the
 *             instance origin is joined with that prefix.
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ message?, status? }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownGrafanaError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { UnknownGrafanaError, GrafanaParseError, type GrafanaServiceError } from "./errors.ts";

/**
 * What every generated Grafana operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, GrafanaOpError, GrafanaOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type GrafanaOpError = GrafanaServiceError | ErrorOf<typeof GrafanaProtocol>;

/** Context (requirements) shared by every generated Grafana operation. */
export type GrafanaOpContext = Credentials | HttpClient.HttpClient;

/** Join the instance origin with `/api` unless the caller already included it. */
const apiBaseUrl = (origin: string): string => {
  const trimmed = origin.replace(/\/+$/, "");
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
};

export const GrafanaProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => apiBaseUrl(creds.apiBaseUrl),
  headers: (creds) => {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${Redacted.value(creds.token)}`,
      Accept: "application/json",
    };
    if (creds.orgId !== undefined) {
      headers["X-Grafana-Org-Id"] = String(creds.orgId);
    }
    return headers;
  },
  // Grafana's error body is `{ message?: string, status?: string }` -- the
  // factory's default lenient envelope covers it.
  unknownError: (info) => new UnknownGrafanaError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new GrafanaParseError({ body, cause }),
});
