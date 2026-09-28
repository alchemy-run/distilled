import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "WorkMailMessageFlow",
  target: "GiraffeMessageInTransitService",
  version: "2019-05-01",
  sigv4: "workmailmessageflow",
  protocol: restJson1Protocol,
  rules: (p, _) => {
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
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
      }
      if (UseDualStack === true) {
        return err(
          "Invalid Configuration: Dualstack and custom endpoint are not supported",
        );
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://workmailmessageflow.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://workmailmessageflow.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class InvalidContentLocation
  extends /*@__PURE__*/ TE.TaggedError("InvalidContentLocation")<{
    readonly message?: string;
  }> {}
export class MessageFrozen
  extends /*@__PURE__*/ TE.TaggedError("MessageFrozen")<{
    readonly message?: string;
  }> {}
export class MessageRejected
  extends /*@__PURE__*/ TE.TaggedError("MessageRejected")<{
    readonly message?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
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
export type GetRawMessageContentError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the raw content of an in-transit email message, in MIME format.
 */
export const getRawMessageContent: API.OperationMethod<
  GetRawMessageContentRequest,
  GetRawMessageContentResponse,
  GetRawMessageContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /messages/{messageId}",
    input: { messageId: 0 },
    output: { messageContent: D.m({ payload: true, shape: D.stream }) },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRawMessageContent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /messages/{messageId}",
    input: {
      messageId: 0,
      content: { s3Reference: { bucket: 0, key: 0, objectVersion: 0 } },
    },
    body: true,
  },
  errors: [
    InvalidContentLocation,
    MessageFrozen,
    MessageRejected,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRawMessageContent",
})) as any;
