import type { ErrorOf } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
/**
 * MollieProtocol -- the shared REST protocol instantiated for the Mollie API.
 *
 *   request:  credentials -> `Authorization: Bearer <key>` + base URL
 *             (default https://api.mollie.com), resolved from the calling
 *             fiber on every request
 *
 *   response: 2xx HAL JSON is the payload; non-2xx `{ status, title, detail,
 *             field? }` bodies map to the operation's typed error classes,
 *             then the shared HTTP-status classes, then
 *             {@link UnknownMollieError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { MollieParseError, UnknownMollieError, type MollieServiceError } from "./errors.ts";

/**
 * What every generated Mollie operation fails with besides its own errors: the
 * errors declared on the service, and the errors declared on the protocol.
 * Nobody lists the protocol's: its type carries what its code fails with (a
 * response that does not match its schema, a failed response nothing declares,
 * core's REST errors, and what resolving the credentials fails with).
 * Generated service files annotate operations with `API.OperationMethod<I, O,
 * MollieOpError, MollieOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type MollieOpError = MollieServiceError | ErrorOf<typeof MollieProtocol>;

/** Context (requirements) shared by every generated Mollie operation. */
export type MollieOpContext = Credentials | HttpClient.HttpClient;

const str = (value: unknown): string | undefined => (typeof value === "string" ? value : undefined);

/**
 * `{ status, title: "<reason phrase>", detail, field? }`. The reason phrase
 * stands in for a missing detail. Mollie sends no machine-readable code.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const rec = body as Record<string, unknown>;
  const message = str(rec.detail) ?? str(rec.title);
  return message === undefined ? undefined : { message };
};

export const MollieProtocol = /*@__PURE__*/ restProtocol({
  // Resolved on the calling fiber per request, so a rotated key is picked
  // up without rebuilding the layer.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.baseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
  }),
  errorEnvelope,
  unknownError: (info) => new UnknownMollieError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new MollieParseError({ body, cause }),
});
