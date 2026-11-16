import { InternalServerError, type InvalidInput } from "@distilled.cloud/core/errors";
import type {
  DeclaredError,
  DeclaredErrorClass,
  DecodeArgs,
  EncodeArgs,
  Protocol,
} from "@distilled.cloud/core/protocol";
import {
  buildRequest,
  getAnn,
  mapKeys,
  responseHeaderMembers,
  withResponseHeaders,
} from "@distilled.cloud/core/protocol-http";
import {
  declaredStatusClass,
  unwrapRedactedDeep,
  validateSuccess,
} from "@distilled.cloud/core/protocol-rest";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
import { httpSymbol } from "@distilled.cloud/core/trait";
/**
 * AzureProtocol -- hand-written.
 *
 * Speaks Azure Resource Manager's bearer-authenticated JSON REST protocol.
 * The generic request/response machinery lives in
 * `@distilled.cloud/core/protocol-http`; this module supplies what is
 * Azure's own (which is why this is a bespoke protocol rather than a
 * `makeRestProtocol` instantiation):
 *
 *   request:  credentials -> `Authorization: Bearer <token>` + base URL
 *             (default https://management.azure.com), resolved from the
 *             calling fiber on every request; a `{subscriptionId}` path
 *             placeholder the caller didn't fill is injected from
 *             credentials; the operation's baked `apiVersion` (see
 *             `traits.ts`) is appended as `?api-version=` -- ARM requires it
 *             on every call
 *
 *   response: 2xx JSON is the payload (no envelope; sensitive members
 *             delivered as `Redacted`); errors are matched like distilled
 *             v0's Azure client:
 *               1. ARM envelope `{ error: { code, message, target } }` (flat
 *                  `{ code, message }` fallback) -> `AZURE_ERROR_CODE_MAP`
 *                  dispatch on `error.code` (~35 codes -> ~20 typed classes)
 *               2. core's class for the status (Retry-After honored via
 *                  `parseRetryAfterForStatus`)
 *               3. any other 5xx -> retryable `InternalServerError`
 *               4. `UnknownAzureError` catch-all
 *             The classes of steps 1 and 2 are the service's errors
 *             (`AzureServiceErrors`): the protocol builds one only from the
 *             classes the operation lists.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import {
  AZURE_ERROR_CODE_MAP,
  matchAzureErrorMessage,
  AzureParseError,
  type AzureServiceError,
  UnknownAzureError,
} from "./errors.ts";
import type { HttpTrait } from "./traits.ts";

/**
 * The errors declared on Azure's protocol: what the code that builds
 * requests and reads responses fails with. A response that does not match
 * its schema ({@link AzureParseError}), a failed response that the service
 * does not declare ({@link UnknownAzureError}, and `InternalServerError`
 * for a 5xx), a bad path label (`InvalidInput`), a request that can't be
 * built (`SdkError`), and a body read (`HttpClientError`).
 */
export type AzureProtocolError =
  | AzureParseError
  | UnknownAzureError
  | InternalServerError
  | InvalidInput
  | SdkError
  | HttpClientError.HttpClientError;

/**
 * What every generated Azure operation fails with: the service's errors,
 * the protocol's, and what resolving the credentials fails with. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * AzureOpError, AzureOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics. Operations declare no errors of
 * their own (v0 parity: `includeOperationErrors=false`).
 */
export type AzureOpError = AzureServiceError | AzureProtocolError | CredentialsError;

/** Context (requirements) shared by every generated Azure operation. */
export type AzureOpContext = Credentials | HttpClient.HttpClient;

/**
 * An instance of `cls`, a class of the service's errors, built from the
 * operation's own list: `undefined` when the operation does not list the
 * class (every generated operation lists `AzureServiceErrors`).
 */
const declaredError = <Props>(
  errors: ReadonlyArray<DeclaredErrorClass>,
  cls: new (props: Props) => unknown,
  props: Props,
): DeclaredError | undefined => {
  const known: unknown = cls;
  const Declared = errors.find((declared) => declared === known);
  return Declared === undefined ? undefined : new Declared(props);
};

// ---------------------------------------------------------------------------
// Error-body parsing
// ---------------------------------------------------------------------------

interface ArmError {
  code?: string;
  message?: string;
  target?: string;
  /** Codes/messages of `error.details[]` (e.g. a generic `ValidationError`
   * whose real cause is a nested detail code). */
  details?: ReadonlyArray<{ code?: string; message?: string }>;
}

/**
 * Extract `{ code, message, target }` from an ARM error body: the
 * `{ error: { code, message, target } }` envelope first, the flat
 * `{ code, message }` shape as a fallback (v0 parity).
 */
const parseArmError = (body: unknown): ArmError | undefined => {
  // Some RPs (e.g. Microsoft.GuestConfiguration) return a bare JSON string.
  if (typeof body === "string") return body ? { message: body } : undefined;
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const inner =
    b.error !== null && typeof b.error === "object" ? (b.error as Record<string, unknown>) : b;
  // Microsoft.Web (and other legacy RPs) return PascalCase `Code`/`Message`.
  const field = (name: string) => {
    const value = inner[name] ?? inner[name[0]!.toUpperCase() + name.slice(1)];
    return typeof value === "string" ? value : undefined;
  };
  const code = field("code");
  const message = field("message");
  const target = field("target");
  if (code === undefined && message === undefined) return undefined;
  const details = Array.isArray(inner.details)
    ? inner.details.flatMap((d: unknown) =>
        d !== null && typeof d === "object"
          ? [
              {
                code:
                  typeof (d as { code?: unknown }).code === "string"
                    ? ((d as { code: string }).code as string)
                    : undefined,
                message:
                  typeof (d as { message?: unknown }).message === "string"
                    ? ((d as { message: string }).message as string)
                    : undefined,
              },
            ]
          : [],
      )
    : undefined;
  return { code, message, target, details };
};

// ---------------------------------------------------------------------------
// Encode
// ---------------------------------------------------------------------------

// The protocol is one module-level value shared by every operation, so it
// must not capture credentials -- `encode` resolves Credentials from the
// calling fiber's context on every request.
const encode = ({ input, inputAst }: EncodeArgs) =>
  Effect.gen(function* () {
    const resolveCredentials = yield* Credentials;
    const creds = yield* resolveCredentials;
    let request = yield* buildRequest({
      input: unwrapRedactedDeep(input),
      inputAst,
      baseUrl: creds.apiBaseUrl,
      headers: {
        Authorization: `Bearer ${Redacted.value(creds.bearerToken)}`,
        // ARM speaks JSON; without this, some resource providers negotiate
        // another media type (API Management returns policies as raw XML).
        Accept: "application/json",
      },
    });

    // Azure-specific URL rewrites, applied to the built request:
    //  1. `{subscriptionId}` left unfilled by the caller is injected from
    //     credentials (v0 parity: users set AZURE_SUBSCRIPTION_ID once and
    //     individual operations pick it up automatically).
    //  2. ARM requires `api-version` on every call -- the version baked into
    //     the operation's Http trait at generation time is appended unless
    //     the URL already carries one.
    const http = getAnn(inputAst, httpSymbol) as HttpTrait | undefined;
    let url = request.url;
    if (url.includes("{subscriptionId}")) {
      url = url.split("{subscriptionId}").join(encodeURIComponent(creds.subscriptionId));
    }
    if (http?.apiVersion && !/[?&]api-version=/.test(url)) {
      url += `${url.includes("?") ? "&" : "?"}api-version=${encodeURIComponent(http.apiVersion)}`;
    }
    if (url !== request.url) {
      request = HttpClientRequest.setUrl(request, url);
    }
    return request;
  });

// ---------------------------------------------------------------------------
// Decode
// ---------------------------------------------------------------------------

const decode = ({ response, outputAst, errors: errorClasses }: DecodeArgs) =>
  Effect.gen(function* () {
    // Read as text and parse tolerantly -- error pages are often non-JSON.
    // A body read that fails (reset or abort mid-body) fails the call with
    // its `HttpClientError`.
    const text = (yield* response.text) ?? "";
    let json: unknown;
    let nonJson = false;
    if (text.trim().length > 0) {
      try {
        json = JSON.parse(text);
      } catch {
        nonJson = true;
      }
    }
    const status = response.status;
    const headers = response.headers as Record<string, string | undefined>;

    if (status >= 400) {
      const body = nonJson ? text : json;
      const arm = nonJson ? undefined : parseArmError(json);

      // 1. Match by Azure error code first for richer typed errors.
      const AzureErrorClass =
        (arm !== undefined ? matchAzureErrorMessage(arm) : undefined) ??
        (arm?.code !== undefined ? AZURE_ERROR_CODE_MAP[arm.code] : undefined);
      if (AzureErrorClass) {
        const error = declaredError(errorClasses, AzureErrorClass, {
          message: arm!.message,
          code: arm!.code,
          target: arm!.target,
        });
        if (error !== undefined) return yield* Effect.fail(error);
      }

      // 1b. A generic top-level code (e.g. `ValidationError`) whose nested
      //     `details[].code` is mapped.
      const detail = arm?.details?.find(
        (d) => d.code !== undefined && AZURE_ERROR_CODE_MAP[d.code],
      );
      if (detail !== undefined) {
        const DetailErrorClass = AZURE_ERROR_CODE_MAP[detail.code!]!;
        const error = declaredError(errorClasses, DetailErrorClass, {
          message: detail.message ?? arm!.message,
          code: detail.code,
          target: arm!.target,
        });
        if (error !== undefined) return yield* Effect.fail(error);
      }

      // 2. Fall back to core's class for the status, which the service
      //    declares (Retry-After honored on retryable statuses).
      const StatusErrorClass = declaredStatusClass(status, errorClasses);
      if (StatusErrorClass) {
        return yield* Effect.fail(
          new StatusErrorClass({
            message: arm?.message ?? (nonJson && text.trim() ? text.trim() : ""),
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }

      // 3. Any other 5xx -> retryable server error.
      if (status >= 500) {
        return yield* Effect.fail(
          new InternalServerError({
            message: arm?.message ?? `HTTP ${status}`,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }

      // 4. Unknown Azure error.
      return yield* Effect.fail(
        new UnknownAzureError({
          status,
          code: arm?.code,
          message: arm?.message,
          target: arm?.target,
          body,
        }),
      );
    }

    // 2xx: the response body IS the payload (ARM has no success envelope),
    // plus the response headers the output declares -- the
    // `Azure-AsyncOperation` / `Location` status monitor of a long-running
    // operation's 202, for example.
    // Wire->TS key mapping is schema-driven; `RawResponseRoot` responses are
    // the body verbatim (mapKeys handles arrays/scalars structurally either
    // way). Strict mode (core/response-validation) checks the mapped body
    // against the output schema. Sensitive members are delivered as
    // `Redacted`, and parse errors withhold a body that can hold a secret
    // (core `validateSuccess`).
    const body: unknown = nonJson ? text : json === undefined ? {} : json;
    return yield* validateSuccess(
      outputAst,
      {
        value: withResponseHeaders(
          responseHeaderMembers(outputAst),
          mapKeys(outputAst, body, "decode"),
          headers,
        ),
        body: nonJson ? text : json,
        nonJson,
      },
      (info) => new AzureParseError(info),
    );
  });

// The annotation is the check: everything the protocol fails with, besides
// the errors the service declares, must be listed here.
export const AzureProtocol: Protocol<AzureProtocolError | CredentialsError, Credentials> = {
  encode,
  decode,
};
