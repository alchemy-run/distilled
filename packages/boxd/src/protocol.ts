import type { Protocol } from "@distilled.cloud/core/protocol";
import { grpcProtocol, type GrpcProtocolError } from "@distilled.cloud/core/protocol-grpc";
import type { RestErrorEnvelope } from "@distilled.cloud/core/protocol-rest";
import { unknownErrorProps } from "@distilled.cloud/core/protocol-rest";
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
import * as Redacted from "effect/Redacted";
import { Credentials, type CredentialsError } from "./credentials.ts";
import { descriptors } from "./descriptors.ts";
import { BoxdParseError, type BoxdServiceError, UnknownBoxdError } from "./errors.ts";

/**
 * The errors declared on boxd's protocol: what the code that builds
 * requests and reads replies fails with. A reply that does not match its
 * schema or its protobuf message ({@link BoxdParseError}), a failed reply
 * that neither the operation nor the service declares
 * ({@link UnknownBoxdError}), and core's gRPC errors (an input the
 * descriptors can't encode, a request that can't be built, the transport).
 */
export type BoxdProtocolError = GrpcProtocolError | BoxdParseError | UnknownBoxdError;

/**
 * What every generated boxd operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, BoxdOpError, BoxdOpContext>` explicitly so the
 * compiler never infers these back out of the schema generics.
 */
export type BoxdOpError = BoxdServiceError | BoxdProtocolError | CredentialsError;

/** Context (requirements) shared by every generated boxd operation. */
export type BoxdOpContext = Credentials | HttpClient.HttpClient;

const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const message = typeof b.message === "string" ? b.message : undefined;
  const code = typeof b.code === "string" || typeof b.code === "number" ? b.code : undefined;
  return { code, message };
};

// The annotation is the check: everything the protocol fails with, besides
// the errors an operation and the service declare, must be listed here.
export const BoxdProtocol: Protocol<BoxdProtocolError | CredentialsError, Credentials> =
  /*@__PURE__*/ grpcProtocol({
    descriptors,
    web: true,
    // The Credentials service holds an effect -- resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: /*@__PURE__*/ Effect.flatten(Credentials),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({ authorization: `Bearer ${Redacted.value(creds.token)}` }),
    errorEnvelope,
    unknownError: (info) => new UnknownBoxdError(unknownErrorProps(info)),
    parseError: ({ body, cause }) => new BoxdParseError({ body, cause }),
  });
