import type * as API from "@distilled.cloud/core/api";
import type { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { makeRestProtocol, type RestErrorEnvelope } from "@distilled.cloud/core/protocol-rest";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import {
  UnknownNamespaceLabsError,
  type DefaultErrors,
  NamespaceLabsParseError,
} from "./errors.ts";

export type NamespaceLabsOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput;

export type NamespaceLabsOpContext = Credentials | HttpClient.HttpClient;

export type Host = "compute" | "storage" | "global" | "privateApi";

const HOST_BY_PACKAGE_PREFIX: ReadonlyArray<readonly [prefix: string, host: Host]> = [
  ["namespace.cloud.compute.", "compute"],
  ["namespace.cloud.builder.", "compute"],
  ["namespace.experimental.compute.", "compute"],
  ["namespace.cloud.storage.", "storage"],
  ["namespace.cloud.github.", "privateApi"],
  ["namespace.private.", "privateApi"],
];

/** The host serving `uri` (`/<package>.<Service>/<Method>`), by proto package. */
export const hostFor = (uri: string): Host => {
  const service = uri.replace(/^\//, "").split("/")[0] ?? "";
  return HOST_BY_PACKAGE_PREFIX.find(([prefix]) => service.startsWith(prefix))?.[1] ?? "global";
};

export const baseUrlFor = (creds: Config, uri: string): string => {
  switch (hostFor(uri)) {
    case "compute":
      return creds.computeBaseUrl;
    case "storage":
      return creds.storageBaseUrl;
    case "privateApi":
      return creds.privateApiBaseUrl;
    case "global":
      return creds.globalBaseUrl;
  }
};

/** Connect error bodies are `{ code, message, details? }`. */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  return {
    code: typeof b.code === "string" ? b.code : undefined,
    message: typeof b.message === "string" ? b.message : undefined,
  };
};

const errorDetails = (body: unknown): unknown =>
  body !== null && typeof body === "object" ? (body as Record<string, unknown>).details : undefined;

export const NamespaceLabsProtocol: Layer.Layer<API.Protocol> =
  /*@__PURE__*/ makeRestProtocol<Config>({
    credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
    baseUrl: (creds, target) => baseUrlFor(creds, target.uri),
    headers: (creds) => ({ Authorization: `Bearer ${Redacted.value(creds.token)}` }),
    emptyJsonBody: true,
    errorEnvelope,
    unknownError: ({ code, message, body }) =>
      new UnknownNamespaceLabsError({
        code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
        message,
        details: errorDetails(body),
        body,
      }),
    parseError: ({ body, cause }) => new NamespaceLabsParseError({ body, cause }),
  });
