import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * ZendeskProtocol -- hand-written.
 *
 * Zendesk Support speaks JSON REST (no response envelope), so the whole
 * protocol is one `restProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Basic {email}/token:{apiToken}`
 *             or `Bearer <oauth>` + account origin
 *             (`https://{subdomain}.zendesk.com`), resolved from the calling
 *             fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ error, description }` bodies map to
 *             the operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownZendeskError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownZendeskError, ZendeskParseError, type ZendeskServiceError } from "./errors.ts";

/**
 * The errors declared on Zendesk's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link ZendeskParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownZendeskError}), and core's
 * REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type ZendeskProtocolError = RestProtocolError | ZendeskParseError | UnknownZendeskError;

/**
 * What every generated Zendesk operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, ZendeskOpError, ZendeskOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type ZendeskOpError = ZendeskServiceError | ZendeskProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Zendesk operation. */
export type ZendeskOpContext = Credentials | HttpClient.HttpClient;

/**
 * Zendesk error bodies are `{ error, description }` (sometimes `message`,
 * sometimes `details`). A response that arrives without that envelope falls
 * through to the protocol's `HTTP <status>` default.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const code =
    typeof b.error === "string"
      ? b.error
      : typeof b.code === "string" || typeof b.code === "number"
        ? b.code
        : undefined;
  const message =
    typeof b.description === "string"
      ? b.description
      : typeof b.message === "string"
        ? b.message
        : typeof b.error === "string"
          ? b.error
          : undefined;
  if (code === undefined && message === undefined) return undefined;
  return { code, message };
};

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const ZendeskProtocol: Protocol<ZendeskProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: Redacted.value(creds.authorization),
      Accept: "application/json",
    }),
    errorEnvelope,
    unknownError: (info) => new UnknownZendeskError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new ZendeskParseError({ body, cause }),
  });
