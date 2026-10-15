import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "WorkMailMessageFlow",
  serviceShapeName: "GiraffeMessageInTransitService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "workmailmessageflow" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-05-01");
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
              `https://workmailmessageflow-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://workmailmessageflow-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://workmailmessageflow.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://workmailmessageflow.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://workmailmessageflow.{R}.{D}","properties":{},"headers":{}}');

export class InvalidContentLocation
  extends /*@__PURE__*/ S.TaggedError<InvalidContentLocation>()("InvalidContentLocation", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class MessageFrozen
  extends /*@__PURE__*/ S.TaggedError<MessageFrozen>()("MessageFrozen", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class MessageRejected
  extends /*@__PURE__*/ S.TaggedError<MessageRejected>()("MessageRejected", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export type MessageIdType = string;
export interface GetRawMessageContentRequest {
  messageId: string;
}
export interface GetRawMessageContentResponse {
  messageContent: T.StreamingOutputBody;
}
export type S3BucketIdType = string;
export type S3KeyIdType = string;
export type S3VersionType = string;
export interface S3Reference {
  bucket: string;
  key: string;
  objectVersion?: string;
}
export interface RawMessageContent {
  s3Reference: S3Reference;
}
export interface PutRawMessageContentRequest {
  messageId: string;
  content: RawMessageContent;
}
export interface PutRawMessageContentResponse {}
export type ErrorMessage = string;
export type GetRawMessageContentError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves the raw content of an in-transit email message, in MIME format.
 */
export const getRawMessageContent: API.OperationMethod<
  GetRawMessageContentRequest,
  GetRawMessageContentResponse,
  GetRawMessageContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<GetRawMessageContentRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<GetRawMessageContentResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRawMessageContent",
}));

export type PutRawMessageContentError =
  | InvalidContentLocation
  | MessageFrozen
  | MessageRejected
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the raw content of an in-transit email message, in MIME format.
 *
 * This example describes how to update in-transit email message. For more information and examples for using this API, see
 *
 * Updating message content with AWS Lambda.
 *
 * Updates to an in-transit message only appear when you call `PutRawMessageContent` from an AWS Lambda function
 * configured with a synchronous
 * Run Lambda rule. If you call `PutRawMessageContent` on a delivered or sent message, the message remains unchanged,
 * even though GetRawMessageContent returns an updated
 * message.
 */
export const putRawMessageContent: API.OperationMethod<
  PutRawMessageContentRequest,
  PutRawMessageContentResponse,
  PutRawMessageContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(6, __c1, 2) as any as S.Schema<PutRawMessageContentRequest>,
  output: __S(7, __c1, 3) as any as S.Schema<PutRawMessageContentResponse>,
  errors: [InvalidContentLocation, MessageFrozen, MessageRejected, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRawMessageContent",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ messageId: S.String.pipe(T.HttpLabel("messageId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/messages/{messageId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRawMessageContentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ messageContent: T.StreamingOutput.pipe(T.HttpPayload()) }),
      ).annotate({ identifier: "GetRawMessageContentResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bucket: S.String, key: S.String, objectVersion: S.optional(S.String) }),
      ).annotate({ identifier: "S3Reference" });
    case 1:
      return S.suspend(() => S.Struct({ s3Reference: __S(4, __c1, 0) })).annotate({
        identifier: "RawMessageContent",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          messageId: S.String.pipe(T.HttpLabel("messageId")),
          content: __S(5, __c1, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/messages/{messageId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutRawMessageContentRequest" });
    case 3:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "PutRawMessageContentResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
