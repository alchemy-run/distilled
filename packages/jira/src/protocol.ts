import type { ErrorOf } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
/**
 * JiraProtocol -- the shared REST protocol instantiated for the Jira Cloud
 * platform REST API v3.
 *
 *   request:  credentials -> `Authorization: Basic ...` (API token) or
 *             `Bearer ...` (OAuth token) + base URL (the site URL, or the
 *             API gateway for a cloud ID), resolved from the calling fiber
 *             on every request
 *
 *   response: 2xx JSON is the payload; non-2xx `{ errorMessages, errors }`
 *             bodies map to the operation's typed error classes, then the
 *             shared HTTP-status classes, then {@link UnknownJiraError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { JiraParseError, UnknownJiraError, type JiraServiceError } from "./errors.ts";

/**
 * What every generated Jira operation fails with besides its own errors: the
 * errors declared on the service, and the errors declared on the protocol.
 * Nobody lists the protocol's: its type carries what its code fails with (a
 * response that does not match its schema, a failed response nothing
 * declares, core's REST errors, and what resolving the credentials fails
 * with). Generated service files annotate operations with
 * `API.OperationMethod<I, O, JiraOpError, JiraOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type JiraOpError = JiraServiceError | ErrorOf<typeof JiraProtocol>;

/** Context (requirements) shared by every generated Jira operation. */
export type JiraOpContext = Credentials | HttpClient.HttpClient;

const str = (value: unknown): string | undefined =>
  typeof value === "string" && value !== "" ? value : undefined;

/**
 * Jira answers `{ errorMessages: string[], errors: { [field]: string } }`
 * (https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#status-codes):
 * general messages, then one message per field. The message is all of them,
 * joined with `; `, each field message after its field name:
 * `summary: You must specify a summary of the issue.`.
 * The API gateway (`api.atlassian.com`) answers `{ code, message }` instead.
 * Jira sends no machine-readable code.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const rec = body as Record<string, unknown>;
  const parts: string[] = [];
  if (Array.isArray(rec.errorMessages)) {
    for (const m of rec.errorMessages) if (str(m)) parts.push(m as string);
  }
  if (rec.errors !== null && typeof rec.errors === "object") {
    for (const [field, m] of Object.entries(rec.errors as Record<string, unknown>)) {
      if (str(m)) parts.push(`${field}: ${m as string}`);
    }
  }
  const message = str(rec.message);
  if (message !== undefined) parts.push(message);
  return parts.length === 0 ? undefined : { message: parts.join("; ") };
};

export const JiraProtocol = /*@__PURE__*/ restProtocol({
  // Resolved on the calling fiber per request, so a Credentials layer that
  // rotates tokens is picked up without rebuilding anything.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.baseUrl,
  headers: (creds) => ({
    Authorization: Redacted.value(creds.authorization),
  }),
  errorEnvelope,
  unknownError: (info) => new UnknownJiraError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new JiraParseError({ body, cause }),
});
