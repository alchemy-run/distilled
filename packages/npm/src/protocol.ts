import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
/**
 * NpmProtocol -- the shared bearer-REST protocol instantiated for the npm
 * registry API.
 *
 * Requests go to the configured registry (https://registry.npmjs.org by
 * default) and carry `Authorization: Bearer <token>` when the credentials
 * hold a token; without one only public operations (search, bulk audit)
 * succeed. Responses are plain JSON with no success envelope; the staged
 * tarball is read as bytes.
 *
 * Failures are `{ error }` or `{ message }` bodies, which core's default
 * envelope reader handles. They map to the operation's typed errors by
 * status, then core's shared HTTP status classes, then
 * {@link UnknownNpmError}.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { NpmParseError, UnknownNpmError, type NpmServiceError } from "./errors.ts";

/**
 * What every generated npm registry operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, NpmOpError, NpmOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type NpmOpError = NpmServiceError | ErrorOf<typeof NpmProtocol>;

/** Context (requirements) shared by every generated npm registry operation. */
export type NpmOpContext = Credentials | HttpClient.HttpClient;

export const NpmProtocol = /*@__PURE__*/ restProtocol({
  // Resolved on the calling fiber per request, so a rotated token is picked
  // up.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.registryUrl,
  headers: (creds): Record<string, string> =>
    creds.token === undefined ? {} : { Authorization: `Bearer ${Redacted.value(creds.token)}` },
  unknownError: (info) => new UnknownNpmError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new NpmParseError({ body, cause }),
});
