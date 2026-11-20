import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
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
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownGrafanaError, GrafanaParseError, type GrafanaServiceError } from "./errors.ts";

/**
 * The errors declared on Grafana's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link GrafanaParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownGrafanaError}), and core's
 * REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type GrafanaProtocolError = RestProtocolError | GrafanaParseError | UnknownGrafanaError;

/**
 * What every generated Grafana operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, GrafanaOpError, GrafanaOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type GrafanaOpError = GrafanaServiceError | GrafanaProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Grafana operation. */
export type GrafanaOpContext = Credentials | HttpClient.HttpClient;

/** Join the instance origin with `/api` unless the caller already included it. */
const apiBaseUrl = (origin: string): string => {
  const trimmed = origin.replace(/\/+$/, "");
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
};

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const GrafanaProtocol: Protocol<GrafanaProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
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
