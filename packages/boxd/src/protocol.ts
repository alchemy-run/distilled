import type * as API from "@distilled.cloud/core/api";
import type { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { makeGrpcProtocol } from "@distilled.cloud/core/protocol-grpc";
import type { RestErrorEnvelope } from "@distilled.cloud/core/protocol-rest";
import { unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
import type { SdkError } from "@distilled.cloud/core/sdk-error";
/**
 * BoxdProtocol -- gRPC-Web at boxd's method paths.
 *
 * Each generated operation is `POST /boxd.api.v1.BoxdApi/<Method>`. boxd's
 * API (tonic with tonic-web) answers binary gRPC over HTTP/2 and gRPC-Web
 * over HTTP/1.1; it answers JSON and plain `application/grpc` over HTTP/1.1
 * with 400. So the proto3 JSON body the services build is transcoded to
 * protobuf with the generated descriptors and sent as one
 * `application/grpc-web+proto` frame, which plain `fetch` can send from Node,
 * Bun, a Worker or a browser, as the official SDK's web entry does.
 *
 * Auth is `authorization: Bearer <API key or token>`.
 */
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, type Config } from "./credentials.ts";
import { descriptors } from "./descriptors.ts";
import { BoxdParseError, type DefaultErrors, UnknownBoxdError } from "./errors.ts";

/**
 * Error channel shared by every generated boxd operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, BoxdOpError,
 * BoxdOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type BoxdOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError
  | InvalidInput
  | SdkError;

/** Context (requirements) shared by every generated boxd operation. */
export type BoxdOpContext = Credentials | HttpClient.HttpClient;

const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const message = typeof b.message === "string" ? b.message : undefined;
  const code = typeof b.code === "string" || typeof b.code === "number" ? b.code : undefined;
  return { code, message };
};

export const BoxdProtocol: Layer.Layer<API.Protocol> = /*@__PURE__*/ makeGrpcProtocol<Config>({
  descriptors,
  web: true,
  credentials: /*@__PURE__*/ Effect.flatMap(Credentials, (resolve) => resolve),
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({ authorization: `Bearer ${Redacted.value(creds.token)}` }),
  errorEnvelope,
  unknownError: (info) => new UnknownBoxdError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new BoxdParseError({ body, cause }),
});
