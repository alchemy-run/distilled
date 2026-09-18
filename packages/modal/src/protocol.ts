/**
 * ModalProtocol — proto3 JSON at gRPC method paths.
 *
 * Each generated operation is `POST /<package>.<Service>/<Method>` with a
 * proto3 JSON body (camelCase fields, 64-bit ints as strings, bytes as
 * base64). Auth is the official client headers: `x-modal-token-id` and
 * `x-modal-token-secret`.
 *
 * Modal's production control plane speaks binary gRPC; this protocol is the
 * JSON encoding of that surface. Direct use of the gRPC API is unsupported
 * by Modal and may change without notice.
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as API from "@distilled.cloud/core/api";
import type { ConfigError } from "@distilled.cloud/core/errors";
import {
  makeRestProtocol,
  type RestErrorEnvelope,
} from "@distilled.cloud/core/protocol-rest";
import { Credentials, type Config } from "./credentials.ts";
import { UnknownModalError, type DefaultErrors } from "./errors.ts";

/**
 * Behaves like this Python SDK version, matching the official JS client's
 * `x-modal-client-version` pin.
 */
export const CLIENT_VERSION = "1.0.0";

/** `CLIENT_TYPE_LIBMODAL_JS` in modal_proto. */
export const CLIENT_TYPE_LIBMODAL_JS = "8";

/**
 * Error channel shared by every generated Modal operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, ModalOpError,
 * ModalOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type ModalOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Modal operation. */
export type ModalOpContext = Credentials | HttpClient.HttpClient;

const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const message =
    typeof b.message === "string"
      ? b.message
      : typeof b.details === "string"
        ? b.details
        : undefined;
  const code =
    typeof b.code === "string" || typeof b.code === "number"
      ? b.code
      : undefined;
  return { code, message };
};

export const ModalProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      "x-modal-token-id": Redacted.value(creds.tokenId),
      "x-modal-token-secret": Redacted.value(creds.tokenSecret),
      "x-modal-client-type": CLIENT_TYPE_LIBMODAL_JS,
      "x-modal-client-version": CLIENT_VERSION,
      "x-modal-libmodal-version": "distilled-modal/1.0.0-rc.8",
    }),
    errorEnvelope,
    unknownError: ({ status: _status, code, message, body }) =>
      new UnknownModalError({
        code:
          typeof code === "string"
            ? code
            : code !== undefined
              ? String(code)
              : undefined,
        message,
        body,
      }),
  });
