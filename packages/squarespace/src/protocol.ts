import type { ErrorOf } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
/**
 * SquarespaceProtocol -- hand-written.
 *
 * Squarespace Commerce APIs speak bearer-authenticated JSON REST (no
 * response envelope), so the whole protocol is one `restProtocol` call
 * from `core/protocol-rest`:
 *
 *   request:  credentials -> `Authorization: Bearer <apiKey>` + `User-Agent`
 *             + base URL (default https://api.squarespace.com), resolved
 *             from the calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ type?, subtype?, message }` bodies map
 *             to the operation's typed error classes by status, then the
 *             shared HTTP-status classes, then {@link UnknownSquarespaceError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import {
  UnknownSquarespaceError,
  SquarespaceParseError,
  type SquarespaceServiceError,
} from "./errors.ts";

/**
 * What every generated Squarespace operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, SquarespaceOpError, SquarespaceOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type SquarespaceOpError = SquarespaceServiceError | ErrorOf<typeof SquarespaceProtocol>;

/** Context (requirements) shared by every generated Squarespace operation. */
export type SquarespaceOpContext = Credentials | HttpClient.HttpClient;

/**
 * Squarespace error bodies are `{ type, subtype?, message, contextId?,
 * details? }`. `subtype` is the machine-readable code when present.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const message = typeof b.message === "string" ? b.message : undefined;
  const code =
    typeof b.subtype === "string"
      ? b.subtype
      : typeof b.type === "string"
        ? b.type
        : typeof b.code === "string" || typeof b.code === "number"
          ? b.code
          : undefined;
  return { code, message };
};

export const SquarespaceProtocol = /*@__PURE__*/ restProtocol({
  // The Credentials service holds an effect -- resolving it here (per
  // request, on the calling fiber) picks up context-provided credentials.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    "User-Agent": creds.userAgent,
  }),
  errorEnvelope,
  unknownError: (info) => new UnknownSquarespaceError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new SquarespaceParseError({ body, cause }),
});
