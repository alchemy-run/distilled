import * as API from "@distilled.cloud/core/api";
import { debugHttp } from "@distilled.cloud/core/debug";
import {
  HTTP_STATUS_MAP,
  InternalServerError,
  InvalidInput,
  type ConfigError,
} from "@distilled.cloud/core/errors";
import {
  buildRequest,
  getAnn,
  mapKeys,
  matchTypedError,
} from "@distilled.cloud/core/protocol-http";
import {
  binaryResponseSymbol,
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
  DremioCredentials,
  type DremioConfig,
  DremioEndpoint,
  HarborCredentials,
  LokiCredentials,
  type LokiConfig,
  ObservabilityDataCredentials,
  type ObservabilityDataConfig,
  OpenSearchCredentials,
  type OpenSearchConfig,
  type HarborConfig,
  RabbitMQManagementCredentials,
  type RabbitMQManagementConfig,
  VaultCredentials,
  type VaultConfig,
  VaultEndpoint,
  WorkflowsAirflowCredentials,
  type WorkflowsAirflowConfig,
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

/** One DNS label, which is all a request's field may contribute to a host. */
const DNS_LABEL = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;

/**
 * Fill the labels left in a host from the request's fields of the same name:
 * Pub/Sub's data plane serves each topic on `{topicId}.pubsub.{regionId}.onstackit.cloud`.
 * Those fields are path labels the route doesn't mention, so they stay out of the path
 * and the body. A value that isn't one DNS label can't reach the host, where it could
 * point the request and its bearer token at another server.
 */
const fillHostLabels = (url: string, input: unknown): Effect.Effect<string, InvalidInput> => {
  if (!url.includes("{")) return Effect.succeed(url);
  const fields = (input ?? {}) as Record<string, unknown>;
  let invalid: InvalidInput | undefined;
  const filled = url.replace(/\{(\w+)\}/g, (_, member: string) => {
    const value = fields[member];
    if (typeof value === "string" && DNS_LABEL.test(value)) return value;
    invalid ??= new InvalidInput({
      member,
      message: `Input member ${member} has to be a single DNS label, because it is part of the host`,
    });
    return "";
  });
  return invalid === undefined ? Effect.succeed(filled) : Effect.fail(invalid);
};

export const StackitProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ Layer.succeed(
  API.Protocol,
  /*@__PURE__*/ API.Protocol.of({
    encode: ({ input, inputAst }: { readonly input: unknown; readonly inputAst: AST.AST }) =>
      Effect.gen(function* () {
        const resolve = yield* Credentials;
        const creds = yield* resolve;
        const unwrapped = unwrapRedactedDeep(input);
        const baseUrl = yield* fillHostLabels(baseUrlFor(creds, inputAst), unwrapped);
        return yield* buildRequest({
          input: unwrapped,
          inputAst,
          baseUrl,
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
        // A binary download: the bytes, without decoding them as text.
        if (response.status < 300 && getAnn(outputAst, binaryResponseSymbol) !== undefined) {
          const bytes = yield* response.arrayBuffer.pipe(Effect.catch(fail));
          return new Uint8Array(bytes);
        }
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

/** Error channel shared by every generated `rabbitmq_management` operation. */
export type RabbitMQManagementOpError = StackitOpError;

/** Context (requirements) shared by every generated `rabbitmq_management` operation. */
export type RabbitMQManagementOpContext = RabbitMQManagementCredentials | HttpClient.HttpClient;

/** The broker's failures are `{ "error": "not_found", "reason": "..." }`. */
const rabbitmqManagementErrorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const { error, reason } = body as Record<string, unknown>;
  if (typeof error !== "string" && typeof reason !== "string") return undefined;
  return {
    code: typeof error === "string" ? error : undefined,
    message: typeof reason === "string" ? reason : undefined,
  };
};

/**
 * RabbitMQManagementProtocol -- the shared REST protocol instantiated for RabbitMQ's
 * management API (`rabbitmq_management`), which a STACKIT RabbitMQ instance serves
 * on a credential's `http_api_uri`. HTTP Basic with the credential's user.
 */
export const RabbitMQManagementProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeRestProtocol<RabbitMQManagementConfig>({
    credentials: /*@__PURE__*/ Effect.flatMap(RabbitMQManagementCredentials, (resolve) => resolve),
    baseUrl: (creds) => creds.apiUrl,
    // No `Accept`: the broker answers 406 to `application/json` on routes that only
    // provide another type, such as a queue's `/contents`.
    headers: (creds) => ({
      Authorization: `Basic ${btoa(`${creds.username}:${Redacted.value(creds.password)}`)}`,
    }),
    errorEnvelope: rabbitmqManagementErrorEnvelope,
    unknownError: ({ code, message, body }) =>
      new UnknownStackitError({
        code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
        message,
        body,
      }),
    parseError: ({ body, cause }) => new StackitParseError({ body, cause }),
  });

/** Error channel shared by every generated `observability_alertmanager` and `observability_prometheus` operation. */
export type ObservabilityDataOpError = StackitOpError;

/** Context (requirements) of the `observability_alertmanager` and `observability_prometheus` operations. */
export type ObservabilityDataOpContext = ObservabilityDataCredentials | HttpClient.HttpClient;

/**
 * Prometheus's failures are `{ "status": "error", "errorType": "...", "error": "..." }`.
 * Alertmanager's are a bare JSON string, and its gateway's are unknown.
 */
const observabilityDataErrorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (typeof body === "string") return { message: body };
  if (body === null || typeof body !== "object") return undefined;
  const { error, errorType, message } = body as Record<string, unknown>;
  if (typeof error === "string") {
    return { code: typeof errorType === "string" ? errorType : undefined, message: error };
  }
  return typeof message === "string" ? { message } : undefined;
};

/**
 * ObservabilityDataProtocol -- the shared REST protocol instantiated for the Alertmanager
 * and Prometheus APIs a STACKIT Observability instance serves on its own URLs. HTTP Basic
 * with one of the instance's credentials: never a STACKIT token.
 */
export const ObservabilityDataProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeRestProtocol<ObservabilityDataConfig>({
    credentials: /*@__PURE__*/ Effect.flatMap(ObservabilityDataCredentials, (resolve) => resolve),
    baseUrl: (creds) => creds.apiUrl,
    headers: (creds) => ({
      Authorization: `Basic ${btoa(`${creds.username}:${Redacted.value(creds.password)}`)}`,
    }),
    errorEnvelope: observabilityDataErrorEnvelope,
    unknownError: ({ code, message, body }) =>
      new UnknownStackitError({
        code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
        message,
        body,
      }),
    parseError: ({ body, cause }) => new StackitParseError({ body, cause }),
  });

/** Error channel shared by every generated `dremio_rest` operation. */
export type DremioOpError = StackitOpError;

/** Context (requirements) of the `dremio_rest` data operations. */
export type DremioOpContext = DremioCredentials | HttpClient.HttpClient;

/** Context (requirements) of the `dremio_rest` login. */
export type DremioLoginContext = DremioEndpoint | HttpClient.HttpClient;

/** Dremio's failures are `{ "errorMessage": "...", "moreInfo": "..." }`. */
const dremioErrorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const { errorMessage, moreInfo } = body as Record<string, unknown>;
  const parts = [errorMessage, moreInfo].filter(
    (part): part is string => typeof part === "string" && part !== "",
  );
  return parts.length === 0 ? undefined : { message: parts.join(": ") };
};

const dremioUnknownError = ({ code, message, body }: RestErrorInfo) =>
  new UnknownStackitError({
    code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
    message,
    body,
  });

const dremioParseError = ({ body, cause }: RestParseErrorInfo) =>
  new StackitParseError({ body, cause });

/**
 * DremioProtocol -- the shared REST protocol instantiated for Dremio's REST API
 * (`dremio_rest`), which a STACKIT Dremio instance serves. Auth is a Bearer token from
 * {@link DremioCredentials}: a Dremio token, never a STACKIT one.
 */
export const DremioProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeRestProtocol<DremioConfig>({
    credentials: /*@__PURE__*/ Effect.flatMap(DremioCredentials, (resolve) => resolve),
    baseUrl: (creds) => creds.apiUrl,
    headers: (creds) => ({ Authorization: `Bearer ${Redacted.value(creds.token)}` }),
    errorEnvelope: dremioErrorEnvelope,
    unknownError: dremioUnknownError,
    parseError: dremioParseError,
  });

/** {@link DremioProtocol} for the login, which sends no token. */
export const DremioLoginProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeRestProtocol<string>({
    credentials: /*@__PURE__*/ Effect.map(DremioEndpoint, (apiUrl) => apiUrl),
    baseUrl: (apiUrl) => apiUrl,
    headers: () => ({}),
    errorEnvelope: dremioErrorEnvelope,
    unknownError: dremioUnknownError,
    parseError: dremioParseError,
  });

/** Error channel shared by every generated `workflows_airflow` operation. */
export type WorkflowsAirflowOpError = StackitOpError;

/** Context (requirements) of the `workflows_airflow` operations. */
export type WorkflowsAirflowOpContext = WorkflowsAirflowCredentials | HttpClient.HttpClient;

/**
 * FastAPI's failures are `{ "detail": ... }`: text on an HTTP exception, an object on a
 * database conflict (`{ reason, message, ... }`), a list of `{ msg, loc }` on a body that
 * doesn't validate.
 */
const workflowsAirflowErrorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const { detail } = body as { readonly detail?: unknown };
  if (typeof detail === "string") return { message: detail };
  if (Array.isArray(detail)) {
    const parts = detail.flatMap((item: { readonly msg?: unknown; readonly loc?: unknown }) =>
      typeof item?.msg === "string"
        ? [Array.isArray(item.loc) ? `${item.loc.join(".")}: ${item.msg}` : item.msg]
        : [],
    );
    return parts.length === 0 ? undefined : { message: parts.join("; ") };
  }
  if (detail !== null && typeof detail === "object") {
    const { reason } = detail as { readonly reason?: unknown };
    return typeof reason === "string" ? { message: reason } : undefined;
  }
  return undefined;
};

/**
 * WorkflowsAirflowProtocol -- the shared REST protocol instantiated for Apache Airflow's
 * REST API (`workflows_airflow`), which a STACKIT Workflows instance serves on its
 * `endpoints.url`. Auth is the session cookie from {@link WorkflowsAirflowCredentials}.
 */
export const WorkflowsAirflowProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeRestProtocol<WorkflowsAirflowConfig>({
    credentials: /*@__PURE__*/ Effect.flatMap(WorkflowsAirflowCredentials, (resolve) => resolve),
    baseUrl: (creds) => creds.apiUrl,
    headers: (creds) => ({ Cookie: Redacted.value(creds.cookie) }),
    errorEnvelope: workflowsAirflowErrorEnvelope,
    unknownError: ({ code, message, body }) =>
      new UnknownStackitError({
        code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
        message,
        body,
      }),
    parseError: ({ body, cause }) => new StackitParseError({ body, cause }),
  });

/** Error channel shared by every generated `opensearch_data` operation. */
export type OpenSearchOpError = StackitOpError;

/** Context (requirements) shared by every generated `opensearch_data` operation. */
export type OpenSearchOpContext = OpenSearchCredentials | HttpClient.HttpClient;

/**
 * OpenSearch's failures are `{ "error": { "type": "...", "reason": "..." }, "status": 404 }`.
 * The security plugin can answer with `error` as a plain string or with `message` alone.
 */
const opensearchErrorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const { error, message } = body as Record<string, unknown>;
  if (typeof error === "string") return { message: error };
  if (error !== null && typeof error === "object") {
    const { type, reason } = error as Record<string, unknown>;
    return {
      code: typeof type === "string" ? type : undefined,
      message: typeof reason === "string" ? reason : undefined,
    };
  }
  return typeof message === "string" ? { message } : undefined;
};

/**
 * OpenSearchProtocol -- the shared REST protocol instantiated for OpenSearch's REST
 * API (`opensearch_data`), which STACKIT OpenSearch and LogMe instances serve on a
 * credential's URI. HTTP Basic with the credential's user.
 */
export const OpenSearchProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeRestProtocol<OpenSearchConfig>({
    credentials: /*@__PURE__*/ Effect.flatMap(OpenSearchCredentials, (resolve) => resolve),
    baseUrl: (creds) => creds.apiUrl,
    headers: (creds) => ({
      Authorization: `Basic ${btoa(`${creds.username}:${Redacted.value(creds.password)}`)}`,
    }),
    errorEnvelope: opensearchErrorEnvelope,
    unknownError: ({ code, message, body }) =>
      new UnknownStackitError({
        code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
        message,
        body,
      }),
    parseError: ({ body, cause }) => new StackitParseError({ body, cause }),
  });

/** Error channel shared by every generated `logs_loki` operation. */
export type LokiOpError = StackitOpError;

/** Context (requirements) shared by every generated `logs_loki` operation. */
export type LokiOpContext = LokiCredentials | HttpClient.HttpClient;

/**
 * LokiProtocol -- the shared REST protocol instantiated for Grafana Loki's push and query
 * API (`logs_loki`), which a STACKIT Logs instance serves on its `datasourceUrl`. Bearer auth
 * with one of the instance's access tokens, or HTTP Basic with a credential on an
 * Observability instance's Loki. Loki's errors are `text/plain`, which become the
 * error's message; the gateway in front of it can answer STACKIT's `{ message }` envelope.
 */
export const LokiProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeRestProtocol<
  LokiConfig | ObservabilityDataConfig
>({
  credentials: /*@__PURE__*/ Effect.flatMap(LokiCredentials, (resolve) => resolve),
  baseUrl: (creds) => creds.apiUrl,
  headers: (creds) => ({
    Authorization:
      "token" in creds
        ? `Bearer ${Redacted.value(creds.token)}`
        : `Basic ${btoa(`${creds.username}:${Redacted.value(creds.password)}`)}`,
  }),
  errorEnvelope: (body) => errorEnvelope(body),
  unknownError: ({ code, message, body }) =>
    new UnknownStackitError({
      code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
      message,
      body,
    }),
  parseError: ({ body, cause }) => new StackitParseError({ body, cause }),
});
