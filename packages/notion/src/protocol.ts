import { ServiceUnavailable } from "@distilled.cloud/core/errors";
import type { Protocol } from "@distilled.cloud/core/protocol";
import { responseErrorFields } from "@distilled.cloud/core/protocol-http";
import {
  type RestErrorInfo,
  type RestProtocolError,
  restProtocol,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
/**
 * NotionProtocol -- the shared bearer-REST protocol instantiated for Notion.
 *
 * Notion speaks plain JSON with no success envelope. Every request carries
 * `Authorization: Bearer <token>` and the required `Notion-Version` header.
 * Failures carry `{ object: "error", status, code, message }`, which the
 * factory's default envelope extractor already reads. 529
 * (`service_overload`) maps to the shared, retryable `ServiceUnavailable`.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { NotionParseError, UnknownNotionError, type NotionServiceError } from "./errors.ts";

/**
 * The errors declared on Notion's protocol: what the code that builds requests
 * and reads responses fails with. A response that does not match its schema
 * ({@link NotionParseError}), a failed response that neither the operation nor
 * the service declares ({@link UnknownNotionError}), an overloaded 529
 * (`ServiceUnavailable`, see {@link overloaded}), and core's REST errors (a
 * bad path label, a request that can't be built, the transport).
 */
export type NotionProtocolError =
  | RestProtocolError
  | NotionParseError
  | UnknownNotionError
  | ServiceUnavailable;

/**
 * What every generated Notion operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, NotionOpError, NotionOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type NotionOpError = NotionServiceError | NotionProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Notion operation. */
export type NotionOpContext = Credentials | HttpClient.HttpClient;

/**
 * 529 (`service_overload`) is core's retryable `ServiceUnavailable`. The
 * service's list gives a status the class core has for it, and core has none
 * for 529, so the protocol builds this one. It carries no `retryAfter`: core
 * reads that hint only for the statuses it has a class for.
 */
const overloaded = (info: RestErrorInfo): ServiceUnavailable | undefined =>
  info.status === 529
    ? new ServiceUnavailable({
        message: info.message,
        ...responseErrorFields(undefined, { body: info.body, headers: info.headers }),
      })
    : undefined;

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const NotionProtocol: Protocol<NotionProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // Resolved on the CALLING fiber per request; the Credentials service holds
    // an effect, so a token rotated between calls is picked up.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.token)}`,
      "Notion-Version": creds.notionVersion,
    }),
    classifyError: overloaded,
    unknownError: (info) => new UnknownNotionError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new NotionParseError({ body, cause }),
  });
