import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * UnkeyProtocol -- hand-written.
 *
 * Unkey speaks bearer-authenticated JSON REST. Success bodies keep the
 * `{ meta, data, pagination? }` envelope the OpenAPI document describes.
 * Failures nest under `{ error: { detail, status, title, type } }`.
 *
 *   request:  credentials -> `Authorization: Bearer <rootKey>` + base URL
 *             (default https://api.unkey.com), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ error: { detail, title, type } }`
 *             bodies map to the operation's typed error classes by status,
 *             then the shared HTTP-status classes, then
 *             {@link UnknownUnkeyError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { UnknownUnkeyError, UnkeyParseError, type UnkeyServiceError } from "./errors.ts";

/**
 * The errors declared on Unkey's protocol: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link UnkeyParseError}), a failed response that neither the operation nor
 * the service declares ({@link UnknownUnkeyError}), and core's REST errors (a
 * bad path label, a request that can't be built, the transport).
 */
export type UnkeyProtocolError = RestProtocolError | UnkeyParseError | UnknownUnkeyError;

/**
 * What every generated Unkey operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, UnkeyOpError, UnkeyOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type UnkeyOpError = UnkeyServiceError | UnkeyProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Unkey operation. */
export type UnkeyOpContext = Credentials | HttpClient.HttpClient;

/**
 * Unkey wraps failures as `{ error: { detail, status, title, type } }`.
 * `detail` is the human-readable message; `type` is the machine-readable
 * error URL (e.g. `https://unkey.com/docs/errors/unkey/authorization/forbidden`).
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const rec = body as Record<string, unknown>;
  const nested =
    rec.error !== null && typeof rec.error === "object"
      ? (rec.error as Record<string, unknown>)
      : rec;
  const message =
    typeof nested.detail === "string"
      ? nested.detail
      : typeof nested.title === "string"
        ? nested.title
        : typeof nested.message === "string"
          ? nested.message
          : undefined;
  const code =
    typeof nested.type === "string"
      ? nested.type
      : typeof nested.code === "string" || typeof nested.code === "number"
        ? nested.code
        : undefined;
  if (code === undefined && message === undefined) return undefined;
  return { code, message };
};

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const UnkeyProtocol: Protocol<UnkeyProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    }),
    errorEnvelope,
    unknownError: (info) => new UnknownUnkeyError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new UnkeyParseError({ body, cause }),
  });
