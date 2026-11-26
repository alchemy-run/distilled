import { ServiceUnavailable } from "@distilled.cloud/core/errors";
import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { responseErrorFields } from "@distilled.cloud/core/protocol-http";
import {
  type RestErrorInfo,
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
import { Credentials } from "./credentials.ts";
import { NotionParseError, UnknownNotionError, type NotionServiceError } from "./errors.ts";

/**
 * What every generated Notion operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, NotionOpError, NotionOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type NotionOpError = NotionServiceError | ErrorOf<typeof NotionProtocol>;

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

export const NotionProtocol = /*@__PURE__*/ restProtocol({
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
