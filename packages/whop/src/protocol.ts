/**
 * WhopProtocol — the shared bearer-REST protocol instantiated for Whop.
 *
 * Whop speaks plain JSON with no success envelope: a single resource returns
 * the object itself, a list returns `{ data: [...], page_info: { … } }`
 * (which the generated schemas model directly, and `.pages()`/`.items()`
 * traverse — see `pagination.ts`).
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
 * `2025-01-01` ones — which are NOT the shapes the generated schemas
 * describe — so the pin is sent unconditionally, exactly as Whop's own
 * generated SDKs do.
 *
 * @see https://docs.whop.com/api-reference/beta/overview
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as API from "@distilled.cloud/core/api";
import type { ConfigError } from "@distilled.cloud/core/errors";
import { HTTP_STATUS_MAP } from "@distilled.cloud/core/errors";
import {
  makeRestProtocol,
  type RestErrorEnvelope,
} from "@distilled.cloud/core/protocol-rest";
import { Credentials, type Config } from "./credentials.ts";
import {
  PaymentRequired,
  UnknownWhopError,
  type DefaultErrors,
} from "./errors.ts";

/**
 * Error channel shared by every generated Whop operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, WhopOpError,
 * WhopOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type WhopOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError;

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

/**
 * Core's map plus `402`. Whop bills ad campaigns and generated media against
 * an account balance, and answers a call the balance can't cover with a 402
 * — a real outcome to branch on rather than an unknown status.
 */
const statusMap = { ...HTTP_STATUS_MAP, 402: PaymentRequired };

export const WhopProtocol: Layer.Layer<API.Protocol> = makeRestProtocol<Config>(
  {
    // Resolved on the CALLING fiber per request (the layer is memoized per
    // process); the Credentials service holds an effect, so a key rotated
    // between calls is picked up without rebuilding the layer.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
      "Api-Version-Date": creds.apiVersionDate,
    }),
    errorEnvelope,
    statusMap,
    unknownError: ({ code, message, body }) =>
      new UnknownWhopError({
        code:
          typeof code === "string"
            ? code
            : code !== undefined
              ? String(code)
              : undefined,
        message,
        body,
      }),
  },
);
