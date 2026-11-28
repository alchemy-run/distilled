import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import type * as stream from "effect/Stream";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsServiceErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "SageMaker Gateway Runtime",
  serviceShapeName: "GlobalInferenceGatewayRuntime",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "sagemaker" });
const ver = /*@__PURE__*/ T.ServiceVersion("2026-10-01");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
  const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
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
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://gateway-runtime.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://gateway-runtime.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://gateway-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://gateway-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://gateway-runtime.sagemaker.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "SageMakerGatewayRuntime",
  service: "SageMakerGatewayRuntime",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadGatewayException
  extends /*@__PURE__*/ S.TaggedError<BadGatewayException>()(
    "BadGatewayException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(502),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class GatewayTimeoutException
  extends /*@__PURE__*/ S.TaggedError<GatewayTimeoutException>()(
    "GatewayTimeoutException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(504),
  ).pipe(C.withTimeoutError, C.withRetryableError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InternalStreamFailure
  extends /*@__PURE__*/ S.TaggedError<InternalStreamFailure>()("InternalStreamFailure", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ModelStreamError
  extends /*@__PURE__*/ S.TaggedError<ModelStreamError>()("ModelStreamError", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    ErrorCode: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "StreamErrorCode" }),
    ),
  }) {}
export class PayloadTooLargeException
  extends /*@__PURE__*/ S.TaggedError<PayloadTooLargeException>()(
    "PayloadTooLargeException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(503), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export type GatewayId = string;
export type RequestContentType = string;
export type CustomerIdentityToken = string | redacted.Redacted<string>;
export interface InvokeGlobalInferenceGatewayInput {
  GatewayId: string;
  Accept?: string | undefined;
  ContentType: string;
  CustomerIdentityToken?: string | redacted.Redacted<string> | undefined;
  Body: T.StreamingInputBody;
}
export interface InvokeGlobalInferenceGatewayOutput {
  Body?: T.StreamingOutputBody | undefined;
}
export interface InvokeGlobalInferenceGatewayWithResponseStreamInput {
  GatewayId: string;
  Accept?: string | undefined;
  ContentType: string;
  CustomerIdentityToken?: string | redacted.Redacted<string> | undefined;
  Body: T.StreamingInputBody;
}
export type StreamChunkBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export interface PayloadPart {
  Bytes?: Uint8Array | redacted.Redacted<Uint8Array> | undefined;
}
export type StreamErrorCode = "StreamBroken" | "ModelInvocationTimeExceeded" | (string & {});
export type ResponseStream =
  | { PayloadPart: PayloadPart; ModelStreamError?: undefined; InternalStreamFailure?: undefined }
  | {
      PayloadPart?: undefined;
      ModelStreamError: ModelStreamError;
      InternalStreamFailure?: undefined;
    }
  | {
      PayloadPart?: undefined;
      ModelStreamError?: undefined;
      InternalStreamFailure: InternalStreamFailure;
    };
export interface InvokeGlobalInferenceGatewayWithResponseStreamOutput {
  Body?: stream.Stream<ResponseStream, Error, never> | undefined;
}
export type InvokeGlobalInferenceGatewayError =
  | AccessDeniedException
  | BadGatewayException
  | GatewayTimeoutException
  | InternalServerException
  | PayloadTooLargeException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Buffered (non-streaming) inference. Returns the full OpenAI completion body.
 *
 * Errors carry their origin in the `Message` prefix. Every typed error's text
 * is in the `Message` member (JSON key `Message`), and starts with one of these
 * prefixes:
 *
 * * `Global Inference Gateway: ` -- the gateway rejected or failed the request
 * itself: validation, authorization, throttling, routing (the gateway or
 * model was not found, or no capacity is available), a gateway limit or time
 * limit, or failing to reach the inference gateway
 * (`Global Inference Gateway: could not reach the inference gateway: `,
 * or `Global Inference Gateway: timed out waiting for the inference gateway`).
 * This includes the 400 for an invalid request and the 413 for a request
 * body that is too large.
 * * `inference gateway: ` -- the inference gateway serving the model returned
 * an error status. The message gives that status code and up to 256 bytes of
 * its error message, for example `inference gateway: 503 `. A
 * BadGatewayException can instead read
 * `inference gateway: response ended unexpectedly`, with no status, when the
 * inference gateway's connection failed while it was sending the response.
 * * `inference gateway (): ` -- the same, when the inference
 * gateway reports which of its components produced the error, for example
 * `inference gateway (model server): 502 `. The component is one of:
 * * `config` -- the inference gateway's configuration and proxy layer.
 * * `scheduler` -- the inference gateway's request scheduler.
 * * `model selector` -- the inference gateway's model selector.
 * * `model server` -- the model server.
 *
 * Every error status the inference gateway returns is a typed error, chosen
 * by that status:
 *
 * * 400 and any other 4xx not listed here -- a 400 validation error.
 * * 401 and 403 -- AccessDeniedException (403).
 * * 404 -- ResourceNotFoundException.
 * * 408 -- GatewayTimeoutException (504).
 * * 429 -- ThrottlingException, with the `Retry-After` header.
 * * 502, and 500, 503 or any other 5xx not listed here -- BadGatewayException
 * (502). A 500 or 503 from the inference gateway comes after the request was
 * dispatched, so it is not modeled as retryable, and the gateway may already
 * have tried another inference gateway. Standard SDK retry modes may still
 * retry a 5xx status; set max attempts to 1 if a repeated inference is
 * unacceptable.
 * * 504 -- GatewayTimeoutException.
 */
export const invokeGlobalInferenceGateway: API.OperationMethod<
  InvokeGlobalInferenceGatewayInput & RegionInput,
  InvokeGlobalInferenceGatewayOutput,
  InvokeGlobalInferenceGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<InvokeGlobalInferenceGatewayInput>,
  output: __S(1, __c0, 1) as any as S.Schema<InvokeGlobalInferenceGatewayOutput>,
  errors: [
    AccessDeniedException,
    BadGatewayException,
    GatewayTimeoutException,
    InternalServerException,
    PayloadTooLargeException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeGlobalInferenceGateway",
  telemetry: TELEMETRY,
  span: "InvokeGlobalInferenceGateway",
}));

export type InvokeGlobalInferenceGatewayWithResponseStreamError =
  | AccessDeniedException
  | BadGatewayException
  | GatewayTimeoutException
  | InternalServerException
  | InternalStreamFailure
  | ModelStreamError
  | PayloadTooLargeException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Streaming inference. Returns an AWS event stream of PayloadPart events that
 * carry the model server's server-sent event (SSE) bytes, so SDKs decode the
 * stream into events for you.
 *
 * The errors listed for this operation, other than ModelStreamError and
 * InternalStreamFailure, are returned before the response starts (before the
 * 200 status), so they end the request, not the stream. None of them can
 * occur after the 200. ModelStreamError and InternalStreamFailure appear only
 * as events in the stream, after the 200. Once the 200 is sent, the stream
 * carries the response as PayloadPart events. If reading the inference
 * gateway's response fails, the stream carries one InternalStreamFailure
 * event and then ends. ModelStreamError is reserved and is not currently sent.
 *
 * Errors carry their origin in the `Message` prefix. Every typed error's text
 * is in the `Message` member (JSON key `Message`), and starts with one of these
 * prefixes:
 *
 * * `Global Inference Gateway: ` -- the gateway rejected or failed the request
 * itself: validation, authorization, throttling, routing (the gateway or
 * model was not found, or no capacity is available), a gateway limit or time
 * limit, or failing to reach the inference gateway
 * (`Global Inference Gateway: could not reach the inference gateway: `,
 * or `Global Inference Gateway: timed out waiting for the inference gateway`).
 * This includes the 400 for an invalid request and the 413 for a request
 * body that is too large.
 * * `inference gateway: ` -- the inference gateway serving the model returned
 * an error status. The message gives that status code and up to 256 bytes of
 * its error message, for example `inference gateway: 503 `.
 * * `inference gateway (): ` -- the same, when the inference
 * gateway reports which of its components produced the error, for example
 * `inference gateway (model server): 502 `. The component is one of:
 * * `config` -- the inference gateway's configuration and proxy layer.
 * * `scheduler` -- the inference gateway's request scheduler.
 * * `model selector` -- the inference gateway's model selector.
 * * `model server` -- the model server.
 *
 * An InternalStreamFailure event's `Message` uses the same prefixes, with the
 * same text the buffered operation uses for the same failure. Its
 * `inference gateway: ` message carries no status:
 * `inference gateway: response ended unexpectedly` when the inference
 * gateway's connection failed while it was sending the response.
 *
 * Every error status the inference gateway returns before the 200 is a typed
 * error, chosen by that status as for InvokeGlobalInferenceGateway:
 *
 * * 400 and any other 4xx not listed here -- a 400 validation error.
 * * 401 and 403 -- AccessDeniedException (403).
 * * 404 -- ResourceNotFoundException.
 * * 408 -- GatewayTimeoutException (504).
 * * 429 -- ThrottlingException, with the `Retry-After` header.
 * * 502, and 500, 503 or any other 5xx not listed here -- BadGatewayException
 * (502). A 500 or 503 from the inference gateway comes after the request was
 * dispatched, so it is not modeled as retryable, and the gateway may already
 * have tried another inference gateway. Standard SDK retry modes may still
 * retry a 5xx status; set max attempts to 1 if a repeated inference is
 * unacceptable.
 * * 504 -- GatewayTimeoutException.
 */
export const invokeGlobalInferenceGatewayWithResponseStream: API.OperationMethod<
  InvokeGlobalInferenceGatewayWithResponseStreamInput & RegionInput,
  InvokeGlobalInferenceGatewayWithResponseStreamOutput,
  InvokeGlobalInferenceGatewayWithResponseStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4, __c1, 0) as any as S.Schema<InvokeGlobalInferenceGatewayWithResponseStreamInput>,
  output: __S(7, __c1, 3) as any as S.Schema<InvokeGlobalInferenceGatewayWithResponseStreamOutput>,
  errors: [
    AccessDeniedException,
    BadGatewayException,
    GatewayTimeoutException,
    InternalServerException,
    InternalStreamFailure,
    ModelStreamError,
    PayloadTooLargeException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeGlobalInferenceGatewayWithResponseStream",
  telemetry: TELEMETRY,
  span: "InvokeGlobalInferenceGatewayWithResponseStream",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayId: S.String.pipe(T.HttpLabel("GatewayId")),
          Accept: S.optional(S.String).pipe(T.HttpHeader("Accept")),
          ContentType: S.String.pipe(T.HttpHeader("Content-Type")),
          CustomerIdentityToken: S.optional(SensitiveString).pipe(
            T.HttpHeader("X-Amzn-SageMaker-Customer-Identity-Token"),
          ),
          Body: T.StreamingInput.pipe(T.HttpPayload(), T.MediaType("application/json")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/global-inference-gateway/{GatewayId}/invocations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InvokeGlobalInferenceGatewayInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Body: S.optional(T.StreamingOutput).pipe(
            T.HttpPayload(),
            T.MediaType("application/json"),
          ),
        }),
      ).annotate({ identifier: "InvokeGlobalInferenceGatewayOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayId: S.String.pipe(T.HttpLabel("GatewayId")),
          Accept: S.optional(S.String).pipe(T.HttpHeader("Accept")),
          ContentType: S.String.pipe(T.HttpHeader("Content-Type")),
          CustomerIdentityToken: S.optional(SensitiveString).pipe(
            T.HttpHeader("X-Amzn-SageMaker-Customer-Identity-Token"),
          ),
          Body: T.StreamingInput.pipe(T.HttpPayload(), T.MediaType("application/json")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/global-inference-gateway/{GatewayId}/invocations-response-stream",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InvokeGlobalInferenceGatewayWithResponseStreamInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Bytes: S.optional(SensitiveBlob).pipe(T.EventPayload()) }),
      ).annotate({ identifier: "PayloadPart" });
    case 2:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ PayloadPart: __S(5, __c1, 1) }),
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
    case 3:
      return S.suspend(() =>
        S.Struct({ Body: S.optional(__S(6, __c1, 2)).pipe(T.HttpPayload()) }),
      ).annotate({ identifier: "InvokeGlobalInferenceGatewayWithResponseStreamOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
