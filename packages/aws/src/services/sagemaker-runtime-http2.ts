import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import type * as stream from "effect/Stream";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveBlob } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "SageMaker Runtime HTTP2",
  serviceShapeName: "AmazonSageMakerRuntimeHttp2",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "sagemaker" });
const ver = /*@__PURE__*/ T.ServiceVersion("2025-10-01");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
  const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  if (Endpoint != null) {
    if (UseFIPS === true) {
      return err("Invalid Configuration: FIPS and custom endpoint are not supported");
    }
    if (UseDualStack === true) {
      return err("Invalid Configuration: Dualstack and custom endpoint are not supported");
    }
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            `https://runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(
            `https://runtime-fips.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === true &&
          UseDualStack === true
        ) {
          return e(
            `https://runtime-fips.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-cn" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            `https://runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-cn" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-cn" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(
            `https://runtime-fips.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-cn" &&
          UseFIPS === true &&
          UseDualStack === true
        ) {
          return e(
            `https://runtime-fips.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            `https://runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(
            `https://runtime-fips.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true &&
          UseDualStack === true
        ) {
          return e(
            `https://runtime-fips.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            `https://runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(
            `https://runtime-fips.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso" &&
          UseFIPS === true &&
          UseDualStack === true
        ) {
          return e(
            `https://runtime-fips.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            `https://runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(
            `https://runtime-fips.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
          UseFIPS === true &&
          UseDualStack === true
        ) {
          return e(
            `https://runtime-fips.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso-f" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            `https://runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso-f" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso-f" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(
            `https://runtime-fips.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso-f" &&
          UseFIPS === true &&
          UseDualStack === true
        ) {
          return e(
            `https://runtime-fips.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-eusc" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            `https://runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-eusc" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-eusc" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(
            `https://runtime-fips.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}:8443`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-eusc" &&
          UseFIPS === true &&
          UseDualStack === true
        ) {
          return e(
            `https://runtime-fips.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}:8443`,
          );
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://runtime.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://runtime.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://runtime.sagemaker.{R}.{D}:8443","properties":{},"headers":{}}');

export class InputValidationError
  extends /*@__PURE__*/ S.TaggedError<InputValidationError>()(
    "InputValidationError",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()(
    "InternalServerError",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InternalStreamFailure
  extends /*@__PURE__*/ S.TaggedError<InternalStreamFailure>()("InternalStreamFailure", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ModelError
  extends /*@__PURE__*/ S.TaggedError<ModelError>()(
    "ModelError",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      OriginalStatusCode: /*@__PURE__*/ S.optional(S.Number),
      OriginalMessage: /*@__PURE__*/ S.optional(S.String),
      LogStreamArn: /*@__PURE__*/ S.optional(S.String),
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(424),
  ) {}
export class ModelStreamError
  extends /*@__PURE__*/ S.TaggedError<ModelStreamError>()("ModelStreamError", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    ErrorCode: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class ServiceUnavailableError
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableError>()(
    "ServiceUnavailableError",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export type SensitiveBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export interface RequestPayloadPart {
  Bytes?: Uint8Array | redacted.Redacted<Uint8Array>;
  DataType?: string;
  CompletionState?: string;
  P?: string;
}
export type RequestStreamEvent = { PayloadPart: RequestPayloadPart };
export interface InvokeEndpointWithBidirectionalStreamInput {
  EndpointName: string;
  Body: stream.Stream<RequestStreamEvent, Error, never>;
  TargetVariant?: string;
  ModelInvocationPath?: string;
  ModelQueryString?: string;
}
export interface ResponsePayloadPart {
  Bytes?: Uint8Array | redacted.Redacted<Uint8Array>;
  DataType?: string;
  CompletionState?: string;
  P?: string;
}
export type ResponseStreamEvent =
  | { PayloadPart: ResponsePayloadPart; ModelStreamError?: never; InternalStreamFailure?: never }
  | { PayloadPart?: never; ModelStreamError: ModelStreamError; InternalStreamFailure?: never }
  | { PayloadPart?: never; ModelStreamError?: never; InternalStreamFailure: InternalStreamFailure };
export interface InvokeEndpointWithBidirectionalStreamOutput {
  Body: stream.Stream<ResponseStreamEvent, Error, never>;
  InvokedProductionVariant?: string;
}
export type InvokeEndpointWithBidirectionalStreamError =
  | InputValidationError
  | InternalServerError
  | InternalStreamFailure
  | ModelError
  | ModelStreamError
  | ServiceUnavailableError
  | CommonErrors;
/**
 * Invokes a model endpoint with bidirectional streaming capabilities. This operation establishes a persistent connection that allows you to send multiple requests and receive streaming responses from the model in real-time.
 *
 * Bidirectional streaming is useful for interactive applications such as chatbots, real-time translation, or any scenario where you need to maintain a conversation-like interaction with the model. The connection remains open, allowing you to send additional input and receive responses without establishing a new connection for each request.
 *
 * For an overview of Amazon SageMaker AI, see How It Works.
 *
 * Amazon SageMaker AI strips all POST headers except those supported by the API. Amazon SageMaker AI might add additional headers. You should not rely on the behavior of headers outside those enumerated in the request syntax.
 *
 * Calls to `InvokeEndpointWithBidirectionalStream` are authenticated by using Amazon Web Services Signature Version 4. For information, see Authenticating Requests (Amazon Web Services Signature Version 4) in the *Amazon S3 API Reference*.
 *
 * The bidirectional stream maintains the connection until either the client closes it or the model indicates completion. Each request and response in the stream is sent as an event with optional headers for data type and completion state.
 *
 * Endpoints are scoped to an individual account, and are not public. The URL does not contain the account ID, but Amazon SageMaker AI determines the account ID from the authentication token that is supplied by the caller.
 */
export const invokeEndpointWithBidirectionalStream: API.OperationMethod<
  InvokeEndpointWithBidirectionalStreamInput,
  InvokeEndpointWithBidirectionalStreamOutput,
  InvokeEndpointWithBidirectionalStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2, __c0, 2) as any as S.Schema<InvokeEndpointWithBidirectionalStreamInput>,
  output: __S(4, __c0, 4) as any as S.Schema<InvokeEndpointWithBidirectionalStreamOutput>,
  errors: [
    InputValidationError,
    InternalServerError,
    InternalStreamFailure,
    ModelError,
    ModelStreamError,
    ServiceUnavailableError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeEndpointWithBidirectionalStream",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bytes: S.optional(SensitiveBlob).pipe(T.EventPayload()),
          DataType: S.optional(S.String).pipe(T.EventHeader()),
          CompletionState: S.optional(S.String).pipe(T.EventHeader()),
          P: S.optional(S.String).pipe(T.EventHeader()),
        }),
      ).annotate({ identifier: "RequestPayloadPart" });
    case 1:
      return T.InputEventStream(
        /*@__PURE__*/ S.Union([/*@__PURE__*/ S.Struct({ PayloadPart: __S(0, __c0, 0) })]),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          EndpointName: S.String.pipe(T.HttpLabel("EndpointName")),
          Body: __S(1, __c0, 1).pipe(T.HttpPayload()),
          TargetVariant: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-SageMaker-Target-Variant")),
          ModelInvocationPath: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-SageMaker-Model-Invocation-Path"),
          ),
          ModelQueryString: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-SageMaker-Model-Query-String"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/endpoints/{EndpointName}/invocations-bidirectional-stream",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InvokeEndpointWithBidirectionalStreamInput" });
    case 3:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ PayloadPart: __S(0, __c0, 0) }),
          /*@__PURE__*/ S.Struct({
            ModelStreamError: /*@__PURE__*/ S.suspend(() => ModelStreamError).annotate({
              identifier: "ModelStreamError",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            InternalStreamFailure: /*@__PURE__*/ S.suspend(() => InternalStreamFailure).annotate({
              identifier: "InternalStreamFailure",
            }),
          }),
        ]),
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          Body: __S(3, __c0, 3).pipe(T.HttpPayload()),
          InvokedProductionVariant: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Invoked-Production-Variant"),
          ),
        }),
      ).annotate({ identifier: "InvokeEndpointWithBidirectionalStreamOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
