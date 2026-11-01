import * as API from "@distilled.cloud/core/api";
import { debugHttp } from "@distilled.cloud/core/debug";
import {
  HTTP_STATUS_MAP,
  InternalServerError,
  type ConfigError,
  type InvalidInput,
} from "@distilled.cloud/core/errors";
import {
  buildRequest,
  getAnn,
  mapKeys,
  matchTypedError,
} from "@distilled.cloud/core/protocol-http";
import {
  makeRestProtocol,
  type RestErrorEnvelope,
  type RestErrorInfo,
  type RestParseErrorInfo,
  unwrapRedactedDeep,
  validateSuccess,
} from "@distilled.cloud/core/protocol-rest";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import { httpSymbol } from "@distilled.cloud/core/trait";
/**
 * StackitProtocol -- the shared bearer-REST protocol instantiated for STACKIT.
 *
 * STACKIT speaks plain JSON with no success envelope. FAILURES are
 * `{ "message": "...", "error": "..." }` (the `ErrorMessage` schema most
 * product specs share). Each product has its own host, baked into the
 * generated operation's `T.Http({ baseUrl })` from the OpenAPI `servers`
 * entry; this protocol reads that URL and rewrites it for the configured
 * region (`eu01` by default).
 *
 * Auth is `Authorization: Bearer <token>`. The API version is a PATH
 * segment (`/v1`, `/v2`, ...), so the generated operations carry versioned
 * routes against a version-less host.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import {
  Credentials,
  type Config,
  HarborCredentials,
  type HarborConfig,
  VaultCredentials,
  type VaultConfig,
  VaultEndpoint,
} from "./credentials.ts";
import { StackitParseError, UnknownStackitError } from "./errors.ts";
import type { DefaultErrors } from "./errors.ts";
import type { StackitHttpTrait } from "./traits.ts";

/**
 * Error channel shared by every generated STACKIT operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * StackitOpError, StackitOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type StackitOpError =
  | DefaultErrors
  | UnknownStackitError
  | StackitParseError
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput;

/** Context (requirements) shared by every generated STACKIT operation. */
export type StackitOpContext = Credentials | HttpClient.HttpClient;

/**
 * Rewrite a spec `servers` URL for the configured region, as the official Go
 * SDK's `ConfigureRegion` does.
 *
 *   * `{region}` still in the template
 *     (`https://secrets-manager.api.{region}stackit.cloud`, default `eu01.`)
 *     is substituted. A glued `{region}stackit` means the spec's default
 *     includes the trailing dot. `region === "global"` drops the placeholder.
 *   * A URL with no `{region}` is a global host and is left alone. Regional
 *     operations on those hosts carry the region in their path instead
 *     (`/v2/projects/{projectId}/regions/{region}/...`).
 */
export const applyRegion = (specUrl: string, region: string): string => {
  if (!specUrl.includes("{region}")) return specUrl;
  if (region === "global") return specUrl.replaceAll("{region}", "");
  const glued = specUrl.includes("{region}stackit");
  const value = glued && !region.endsWith(".") ? `${region}.` : region;
  return specUrl.replaceAll("{region}", value);
};

const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const message = typeof b.message === "string" ? b.message : undefined;
  const code =
    typeof b.error === "string"
      ? b.error
      : typeof b.code === "string" || typeof b.code === "number"
        ? b.code
        : undefined;
  if (message === undefined && code === undefined) return undefined;
  return { code, message };
};

const fail = (e: unknown): Effect.Effect<never> => Effect.fail(e) as Effect.Effect<never>;

const baseUrlFor = (creds: Config, inputAst: AST.AST): string => {
  if (creds.apiBaseUrl !== undefined && creds.apiBaseUrl !== "") {
    return creds.apiBaseUrl;
  }
  const http = getAnn(inputAst, httpSymbol) as StackitHttpTrait | undefined;
  const specUrl = http?.baseUrl;
  if (typeof specUrl !== "string" || specUrl === "") {
    throw new Error(
      "STACKIT operation is missing T.Http({ baseUrl }) \u2014 regenerate from convert",
    );
  }
  return applyRegion(specUrl, creds.region);
};

export const StackitProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ Layer.succeed(
  API.Protocol,
  /*@__PURE__*/ API.Protocol.of({
    encode: ({ input, inputAst }: { readonly input: unknown; readonly inputAst: AST.AST }) =>
      Effect.gen(function* () {
        const resolve = yield* Credentials;
        const creds = yield* resolve;
        return yield* buildRequest({
          input: unwrapRedactedDeep(input),
          inputAst,
          baseUrl: baseUrlFor(creds, inputAst),
          headers: {
            Authorization: `Bearer ${Redacted.value(creds.token)}`,
          },
        });
      }) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode: ({
      response,
      outputAst,
      errors: errorClasses,
    }: {
      readonly response: HttpClientResponse.HttpClientResponse;
      readonly outputAst: AST.AST;
      readonly errors: ReadonlyArray<unknown>;
    }) =>
      Effect.gen(function* () {
        const text = (yield* response.text.pipe(Effect.catch(fail))) ?? "";
        if (debugHttp()) {
          console.error(`[distilled] <- ${response.status} ${text.slice(0, 400)}`);
        }
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
          const env = (nonJson ? undefined : errorEnvelope(json)) ?? {};
          const message = env.message ?? (nonJson && text.trim() ? text.trim() : `HTTP ${status}`);

          const typed = matchTypedError(
            errorClasses,
            status,
            [
              {
                code: typeof env.code === "number" ? env.code : undefined,
                message,
              },
            ],
            { body: nonJson ? text : json, headers },
          );
          if (typed !== undefined) return yield* fail(typed);

          const StatusErrorClass = (
            HTTP_STATUS_MAP as Record<
              number,
              (new (args: { message: string; retryAfter?: unknown }) => unknown) | undefined
            >
          )[status];
          if (StatusErrorClass) {
            return yield* fail(
              new StatusErrorClass({
                message,
                retryAfter: parseRetryAfterForStatus(status, headers),
              }),
            );
          }

          if (status >= 500) {
            return yield* fail(
              new InternalServerError({
                message,
                retryAfter: parseRetryAfterForStatus(status, headers),
              }),
            );
          }

          return yield* fail(
            new UnknownStackitError({
              code:
                typeof env.code === "string"
                  ? env.code
                  : env.code !== undefined
                    ? String(env.code)
                    : undefined,
              message,
              body: nonJson ? text : json,
            }),
          );
        }

        // Strict mode checks the mapped body against the output schema, and
        // parse errors withhold a body that can hold a secret (core
        // `validateSuccess`).
        const body: unknown = nonJson ? text : (json ?? {});
        return yield* validateSuccess(
          outputAst,
          { value: mapKeys(outputAst, body, "decode"), body: nonJson ? text : json, nonJson },
          (info) => new StackitParseError(info),
        ).pipe(Effect.catch(fail));
      }),
  }),
);

/** Error channel shared by every generated `registry_harbor` operation. */
export type HarborOpError = StackitOpError;

/** Context (requirements) shared by every generated `registry_harbor` operation. */
export type HarborOpContext = HarborCredentials | HttpClient.HttpClient;

/**
 * Harbor failures are `{ "errors": [{ "code": "NOT_FOUND", "message": "..." }] }`
 * (the `Errors` definition in Harbor's swagger). Only the first is surfaced.
 */
const harborErrorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const errors = (body as Record<string, unknown>).errors;
  if (!Array.isArray(errors) || errors.length === 0) return undefined;
  const first = errors[0] as Record<string, unknown> | null;
  return {
    code: typeof first?.code === "string" ? first.code : undefined,
    message: typeof first?.message === "string" ? first.message : undefined,
  };
};

/**
 * HarborProtocol -- the shared REST protocol instantiated for Harbor's API
 * (`registry_harbor`), which STACKIT Container Registry serves. HTTP Basic
 * with a robot account's secret or a user's CLI secret, against the registry
 * the credentials name: Harbor has no per-product host to bake into `T.Http`.
 */
export const HarborProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeRestProtocol<HarborConfig>({
    credentials: /*@__PURE__*/ Effect.flatMap(HarborCredentials, (resolve) => resolve),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Basic ${btoa(`${creds.username}:${Redacted.value(creds.secret)}`)}`,
      Accept: "application/json",
    }),
    errorEnvelope: harborErrorEnvelope,
    unknownError: ({ code, message, body }) =>
      new UnknownStackitError({
        code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
        message,
        body,
      }),
    parseError: ({ body, cause }) => new StackitParseError({ body, cause }),
  });

/** Error channel shared by every generated `secrets_manager_kv` operation. */
export type VaultOpError = StackitOpError;

/** Context (requirements) of the `secrets_manager_kv` data operations. */
export type VaultOpContext = VaultCredentials | HttpClient.HttpClient;

/** Context (requirements) of the `secrets_manager_kv` logins. */
export type VaultLoginContext = VaultEndpoint | HttpClient.HttpClient;

/** Vault failures are `{ "errors": ["..."] }`, and the list can be empty (a plain 404). */
const vaultErrorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const errors = (body as Record<string, unknown>).errors;
  if (!Array.isArray(errors) || errors.length === 0) return undefined;
  return { message: errors.filter((error) => typeof error === "string").join("; ") };
};

const vaultUnknownError = ({ code, message, body }: RestErrorInfo) =>
  new UnknownStackitError({
    code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
    message,
    body,
  });

const vaultParseError = ({ body, cause }: RestParseErrorInfo) =>
  new StackitParseError({ body, cause });

const trimSlash = (url: string) => url.replace(/\/+$/, "");

/**
 * VaultProtocol -- the shared REST protocol instantiated for HashiCorp Vault's
 * HTTP API (`secrets_manager_kv`), which STACKIT Secrets Manager serves on an
 * instance's `apiUrl`. Auth is `X-Vault-Token` from {@link VaultCredentials}.
 */
export const VaultProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<VaultConfig>(
  {
    credentials: /*@__PURE__*/ Effect.flatMap(VaultCredentials, (resolve) => resolve),
    baseUrl: (creds) => trimSlash(creds.apiUrl),
    headers: (creds) => ({ "X-Vault-Token": Redacted.value(creds.token) }),
    errorEnvelope: vaultErrorEnvelope,
    unknownError: vaultUnknownError,
    parseError: vaultParseError,
  },
);

/** {@link VaultProtocol} for the logins, which send no token. */
export const VaultLoginProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<string>(
  {
    credentials: /*@__PURE__*/ Effect.map(VaultEndpoint, (apiUrl) => apiUrl),
    baseUrl: trimSlash,
    headers: () => ({}),
    errorEnvelope: vaultErrorEnvelope,
    unknownError: vaultUnknownError,
    parseError: vaultParseError,
  },
);
