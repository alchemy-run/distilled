import type { ErrorOf } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
/**
 * WhopProtocol -- the shared bearer-REST protocol instantiated for Whop.
 *
 * Whop speaks plain JSON with no success envelope: a single resource returns
 * the object itself, a list returns `{ data: [...], page_info: { ... } }`
 * (which the generated schemas model directly, and `.pages()`/`.items()`
 * traverse -- see `pagination.ts`).
 *
 * Failures carry one `error` object:
 *
 * ```json
 * { "error": { "type": "invalid_parameters", "message": "initial_price must be greater than 0" } }
 * ```
 *
 * The legacy surface spells the machine-readable half `code` and adds
 * `param`; both spellings are unwrapped below, `code` first since it is the
 * narrower of the two (`parameter_missing` vs `invalid_request_error`).
 *
 * Every request is pinned with `Api-Version-Date`. Whop versions request and
 * response SHAPES by date and defaults an unpinned caller to the original
 * `2025-01-01` ones -- which are NOT the shapes the generated schemas
 * describe -- so the pin is sent unconditionally, exactly as Whop's own
 * generated SDKs do.
 *
 * @see https://docs.whop.com/api-reference/beta/overview
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import { UnknownWhopError, WhopParseError, type WhopServiceError } from "./errors.ts";

/**
 * What every generated Whop operation fails with besides its own errors: the
 * service's errors, the protocol's, and what resolving the credentials fails
 * with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, WhopOpError, WhopOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type WhopOpError = WhopServiceError | ErrorOf<typeof WhopProtocol>;

/** Context (requirements) shared by every generated Whop operation. */
export type WhopOpContext = Credentials | HttpClient.HttpClient;

/**
 * Whop's error bodies: `{ error: { type, message } }` on the versioned
 * surface, `{ error: { code, message, param, type } }` on the legacy one.
 * Responses without either (an edge/proxy HTML page) fall through to the
 * protocol's `HTTP <status>` default.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const err = (body as Record<string, unknown>).error;
  if (typeof err === "string") return { message: err };
  if (err === null || typeof err !== "object") return undefined;
  const e = err as Record<string, unknown>;
  const code = typeof e.code === "string" ? e.code : e.type;
  return {
    code: typeof code === "string" ? code : undefined,
    message: typeof e.message === "string" ? e.message : undefined,
  };
};

// A failed status becomes the class the service declares for it
// (`WhopServiceErrors`: core's status classes plus `402`. Whop bills ad
// campaigns and generated media against an account balance, and answers a
// call the balance can't cover with a 402 -- a real outcome to branch on
// rather than an unknown status).
export const WhopProtocol = /*@__PURE__*/ restProtocol({
  // Resolved on the CALLING fiber per request; the Credentials service holds
  // an effect, so a key rotated between calls is picked up.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    "Api-Version-Date": creds.apiVersionDate,
  }),
  errorEnvelope,
  unknownError: (info) => new UnknownWhopError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new WhopParseError({ body, cause }),
});
