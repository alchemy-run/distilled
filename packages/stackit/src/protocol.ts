/**
 * StackitProtocol — the shared bearer-REST protocol instantiated for STACKIT.
 *
 * STACKIT speaks plain JSON with no success envelope. FAILURES are
 * `{ "message": "...", "error": "..." }` (the `ErrorMessage` schema most
 * product specs share). Each product has its own host, baked into the
 * generated operation's `T.Http({ baseUrl })` from the OpenAPI `servers`
 * entry; this protocol reads that URL and rewrites it for the configured
 * region (`eu01` by default).
 *
 * Auth is `Authorization: Bearer <token>`. The API version is a PATH
 * segment (`/v1`, `/v2`, …), so the generated operations carry versioned
 * routes against a version-less host.
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import * as API from "@distilled.cloud/core/api";
import {
  HTTP_STATUS_MAP,
  InternalServerError,
  type ConfigError,
} from "@distilled.cloud/core/errors";
import {
  buildRequest,
  getAnn,
  mapKeys,
  matchTypedError,
} from "@distilled.cloud/core/protocol-http";
import {
  unwrapRedactedDeep,
  wrapSensitive,
  type RestErrorEnvelope,
} from "@distilled.cloud/core/protocol-rest";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import { httpSymbol } from "@distilled.cloud/core/trait";
import { Credentials, type Config } from "./credentials.ts";
import { UnknownStackitError } from "./errors.ts";
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
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated STACKIT operation. */
export type StackitOpContext = Credentials | HttpClient.HttpClient;

/**
 * Rewrite a spec `servers` URL for the configured region.
 *
 *   • `{region}` still in the template (IaaS v1:
 *     `https://iaas.api.{region}stackit.cloud`, default `eu01.`) is
 *     substituted. A glued `{region}stackit` means the spec's default
 *     includes the trailing dot.
 *   • `https://<svc>.api.stackit.cloud` becomes
 *     `https://<svc>.api.<region>.stackit.cloud`.
 *   • `region === "global"` leaves the URL alone (after dropping any
 *     leftover `{region}`).
 */
export const applyRegion = (specUrl: string, region: string): string => {
  if (specUrl.includes("{region}")) {
    if (region === "global") return specUrl.replaceAll("{region}", "");
    const glued = specUrl.includes("{region}stackit");
    const value = glued && !region.endsWith(".") ? `${region}.` : region;
    return specUrl.replaceAll("{region}", value);
  }
  if (region === "global") return specUrl;
  return specUrl.replace(
    /^(https:\/\/[a-z0-9-]+)\.api\.stackit\.cloud(?=[:/?]|$)/i,
    `$1.api.${region}.stackit.cloud`,
  );
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

const fail = (e: unknown): Effect.Effect<never> =>
  Effect.fail(e) as Effect.Effect<never>;

const baseUrlFor = (creds: Config, inputAst: AST.AST): string => {
  if (creds.apiBaseUrl !== undefined && creds.apiBaseUrl !== "") {
    return creds.apiBaseUrl;
  }
  const http = getAnn(inputAst, httpSymbol) as StackitHttpTrait | undefined;
  const specUrl = http?.baseUrl;
  if (typeof specUrl !== "string" || specUrl === "") {
    throw new Error(
      "STACKIT operation is missing T.Http({ baseUrl }) — regenerate from convert",
    );
  }
  return applyRegion(specUrl, creds.region);
};

export const StackitProtocol: Layer.Layer<API.Protocol> = Layer.succeed(
  API.Protocol,
  API.Protocol.of({
    encode: ({
      input,
      inputAst,
    }: {
      readonly input: unknown;
      readonly inputAst: AST.AST;
    }) =>
      Effect.gen(function* () {
        const resolve = yield* Credentials;
        const creds = yield* resolve;
        return buildRequest({
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
        const text = (yield* response.text.pipe(Effect.orDie)) ?? "";
        if (process.env.DISTILLED_DEBUG_HTTP) {
          console.error(
            `[distilled] <- ${response.status} ${text.slice(0, 400)}`,
          );
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
          const message =
            env.message ??
            (nonJson && text.trim() ? text.trim() : `HTTP ${status}`);

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
              | (new (args: {
                  message: string;
                  retryAfter?: unknown;
                }) => unknown)
              | undefined
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

        const body: unknown = nonJson ? text : (json ?? {});
        return wrapSensitive(outputAst, mapKeys(outputAst, body, "decode"));
      }),
  }),
);
