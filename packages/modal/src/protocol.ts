import type * as API from "@distilled.cloud/core/api";
import type { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { makeGrpcProtocol } from "@distilled.cloud/core/protocol-grpc";
import type { RestErrorEnvelope } from "@distilled.cloud/core/protocol-rest";
/**
 * ModalProtocol -- binary gRPC at Modal's method paths.
 *
 * Each generated operation is `POST /<package>.<Service>/<Method>`. Modal's
 * API answers JSON with 415, so the proto3 JSON body the services build is
 * transcoded to protobuf with the generated descriptors and sent as one
 * `application/grpc` frame (`@distilled.cloud/core/protocol-grpc`). Plain
 * HTTP/1.1 `fetch` works: Modal's envoy bridges it to gRPC.
 *
 * Auth is the official client headers, `x-modal-token-id` and
 * `x-modal-token-secret`, or `authorization: Bearer <jwt>` when the
 * credentials carry a bearer token (a sandbox's task command router; see
 * {@link withTaskCommandRouter}).
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { descriptors } from "./descriptors.ts";
import { UnknownModalError, type DefaultErrors, ModalParseError } from "./errors.ts";

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
  | HttpClientError.HttpClientError
  | InvalidInput;

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
  const code = typeof b.code === "string" || typeof b.code === "number" ? b.code : undefined;
  return { code, message };
};

export const ModalProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeGrpcProtocol<Config>({
  descriptors,
  credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    ...(creds.bearerToken !== undefined
      ? { authorization: `Bearer ${Redacted.value(creds.bearerToken)}` }
      : {
          "x-modal-token-id": Redacted.value(creds.tokenId),
          "x-modal-token-secret": Redacted.value(creds.tokenSecret),
        }),
    "x-modal-client-type": CLIENT_TYPE_LIBMODAL_JS,
    "x-modal-client-version": CLIENT_VERSION,
    "x-modal-libmodal-version": "distilled-modal/1.0.0-rc.8",
  }),
  errorEnvelope,
  unknownError: ({ status: _status, code, message, body }) =>
    new UnknownModalError({
      code: typeof code === "string" ? code : code !== undefined ? String(code) : undefined,
      message,
      body,
    }),
  parseError: ({ body, cause }) => new ModalParseError({ body, cause }),
});
