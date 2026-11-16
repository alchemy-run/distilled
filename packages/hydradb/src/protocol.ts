import type { Protocol } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
  type RestProtocolError,
} from "@distilled.cloud/core/protocol-rest";
/**
 * HydraDBProtocol -- the shared REST protocol instantiated for the HydraDB
 * v2 API.
 *
 * request:  `Authorization: Bearer <key>` and `API-Version: 2` against the
 *           API origin (`https://api.hydradb.com`), resolved from the calling
 *           fiber on every request. `POST /context/ingest` is sent as
 *           multipart/form-data (the generated input carries the trait).
 *
 * response: most JSON success bodies are the `{ success, data, error, meta }`
 *           envelope; {@link HydraDBProtocol} returns its `data`, the payload
 *           the generated output shapes model. The connector endpoints and
 *           `PATCH /databases/{database}/metadata-schema` answer with the
 *           payload itself, which has no `success`, so it comes back as read.
 *
 *           Failures are `{ success: false, data, error: { code, message },
 *           detail: { error_code, message }, meta: { request_id } }`; the
 *           envelope's `error.code` and `error.message` become the error's
 *           code and message, the status picks the class (per-operation
 *           matchers from `patches/`, then core's `HTTP_STATUS_MAP`, then
 *           {@link UnknownHydraDBError}), and the whole body, with its
 *           `meta.request_id`, stays on the unknown error.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { HydraDBParseError, UnknownHydraDBError, type HydraDBServiceError } from "./errors.ts";

/** The API version this SDK is generated against (the spec's `API-Version` global header). */
export const API_VERSION = "2";

/**
 * The errors declared on HydraDB's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match its
 * schema ({@link HydraDBParseError}), a failed response that neither the
 * operation nor the service declares ({@link UnknownHydraDBError}), and core's
 * REST errors (a bad path label, a request that can't be built, the
 * transport).
 */
export type HydraDBProtocolError = RestProtocolError | HydraDBParseError | UnknownHydraDBError;

/**
 * What every generated HydraDB operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, HydraDBOpError, HydraDBOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type HydraDBOpError = HydraDBServiceError | HydraDBProtocolError | CredentialsError;

/** Context (requirements) shared by every generated HydraDB operation. */
export type HydraDBOpContext = Credentials | HttpClient.HttpClient;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * The success envelope's `data`: a body with `success`, `data`, and nothing
 * but `error` and `meta` beside them -- the exact member set
 * scripts/convert.ts unwraps in the spec. A bare connector body never
 * carries `success`, so it comes back as read.
 */
const unwrapData = (body: unknown): unknown =>
  isObject(body) &&
  typeof body.success === "boolean" &&
  "data" in body &&
  Object.keys(body).every(
    (key) => key === "success" || key === "data" || key === "error" || key === "meta",
  )
    ? body.data
    : body;

const stringOrUndefined = (value: unknown): string | undefined =>
  typeof value === "string" && value.length > 0 ? value : undefined;

/**
 * `{ error: { code, message }, detail: { error_code, message } }`: `error`
 * first, `detail` when `error` is missing, then the generic `{ message }` /
 * `{ error: "<text>" }` shapes a proxy in front of the API answers with.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (!isObject(body)) return undefined;
  const error = isObject(body.error) ? body.error : undefined;
  const detail = isObject(body.detail) ? body.detail : undefined;
  return {
    code: stringOrUndefined(error?.code) ?? stringOrUndefined(detail?.error_code),
    message:
      stringOrUndefined(error?.message) ??
      stringOrUndefined(detail?.message) ??
      stringOrUndefined(body.message) ??
      stringOrUndefined(body.error),
  };
};

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const HydraDBProtocol: Protocol<HydraDBProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ restProtocol({
    // Resolved on the CALLING fiber per request, so a key rotated between calls
    // is picked up.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
      "API-Version": API_VERSION,
    }),
    errorEnvelope,
    transformResponse: unwrapData,
    unknownError: (info) => new UnknownHydraDBError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new HydraDBParseError({ body, cause }),
  });
