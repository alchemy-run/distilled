import type { ErrorOf } from "@distilled.cloud/core/protocol";
import {
  restProtocol,
  type RestErrorEnvelope,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
/**
 * HuggingFaceProtocol -- the shared bearer-REST protocol instantiated for the
 * Hugging Face Hub.
 *
 * The Hub speaks plain JSON with no success envelope: a list endpoint returns
 * its array, a single resource returns the object itself. Failures usually
 * carry `{ "error": "<message>" }` -- a bare string -- though a few surfaces
 * (Spaces control plane, SCIM) answer with `{ "error": { "code", "message" } }`
 * objects instead; both forms are unwrapped below.
 *
 * There is no API version anywhere on the wire -- no versioned path segment,
 * no version header. The document at
 * https://huggingface.co/.well-known/openapi.json is the moving target the
 * SDK regenerates against.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials } from "./credentials.ts";
import {
  UnknownHuggingFaceError,
  HuggingFaceParseError,
  type HuggingFaceServiceError,
} from "./errors.ts";

/**
 * What every generated Hugging Face operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, HuggingFaceOpError, HuggingFaceOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type HuggingFaceOpError = HuggingFaceServiceError | ErrorOf<typeof HuggingFaceProtocol>;

/** Context (requirements) shared by every generated Hugging Face operation. */
export type HuggingFaceOpContext = Credentials | HttpClient.HttpClient;

/**
 * Hub error bodies: `{ error: "<message>" }` in the common case,
 * `{ error: { code, message } }` on a few surfaces. Responses without either
 * (HTML error pages from the CDN edge) fall through to the protocol's
 * `HTTP <status>` default.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const err = (body as Record<string, unknown>).error;
  if (typeof err === "string") return { message: err };
  if (err === null || typeof err !== "object") return undefined;
  const e = err as Record<string, unknown>;
  return {
    code: typeof e.code === "string" ? e.code : undefined,
    message: typeof e.message === "string" ? e.message : undefined,
  };
};

export const HuggingFaceProtocol = /*@__PURE__*/ restProtocol({
  // Resolved on the CALLING fiber per request; the Credentials service holds
  // an effect, so a token rotated between calls is picked up.
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.token)}`,
  }),
  errorEnvelope,
  unknownError: (info) => new UnknownHuggingFaceError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new HuggingFaceParseError({ body, cause }),
});
