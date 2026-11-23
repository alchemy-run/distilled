import type { ErrorOf } from "@distilled.cloud/core/protocol";
import { restProtocol, type RestErrorEnvelope } from "@distilled.cloud/core/protocol-rest";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import {
  UnknownNamespaceLabsError,
  NamespaceLabsParseError,
  type NamespaceLabsServiceError,
} from "./errors.ts";

/**
 * What every generated Namespace operation fails with besides its own
 * errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, NamespaceLabsOpError, NamespaceLabsOpContext>`
 * explicitly.
 */
export type NamespaceLabsOpError =
  | NamespaceLabsServiceError
  | ErrorOf<typeof NamespaceLabsProtocol>;

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

export const NamespaceLabsProtocol = /*@__PURE__*/ restProtocol({
  credentials: /*@__PURE__*/ Effect.flatten(Credentials),
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
