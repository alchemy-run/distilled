import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * SteelProtocol -- the shared REST protocol instantiated for the Steel API.
 *
 *   request:  credentials -> `steel-api-key: <key>` + base URL (default
 *             https://api.steel.dev), resolved from the calling fiber on
 *             every request
 *
 *   response: 2xx JSON is the payload, downloads are bytes; non-2xx
 *             `{ error, message, code }` (or the commands endpoints'
 *             `{ error: { code, message } }`) bodies map to the operation's
 *             typed error classes, then the shared HTTP-status classes, then
 *             {@link UnknownSteelError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { SteelParseError, UnknownSteelError, type SteelServiceError } from "./errors.ts";

/**
 * The errors declared on Steel's protocol: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link SteelParseError}), a failed response that neither the operation nor
 * the service declares ({@link UnknownSteelError}), and core's REST errors (a
 * bad path label, a request that can't be built, the transport).
 */
export type SteelProtocolError = RestProtocolError | SteelParseError | UnknownSteelError;

/**
 * What every generated Steel operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, SteelOpError, SteelOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type SteelOpError = SteelServiceError | SteelProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Steel operation. */
export type SteelOpContext = Credentials | HttpClient.HttpClient;

const str = (value: unknown): string | undefined => (typeof value === "string" ? value : undefined);

const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const rec = body as Record<string, unknown>;
  // `{ error: { code, message } }` (session commands) or the flat
  // `{ error: "<title>", message, code }` every other endpoint returns.
  const nested =
    rec.error !== null && typeof rec.error === "object"
      ? (rec.error as Record<string, unknown>)
      : rec;
  const code = str(nested.code);
  const message = str(nested.message) ?? str(rec.error);
  if (code === undefined && message === undefined) return undefined;
  return { code, message };
};

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const SteelProtocol: Protocol<SteelProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // Resolved on the calling fiber per request, so a rotated key is picked up.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.baseUrl,
    headers: (creds) => ({
      "steel-api-key": Redacted.value(creds.apiKey),
    }),
    errorEnvelope,
    unknownError: (info) => new UnknownSteelError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new SteelParseError({ body, cause }),
  });
