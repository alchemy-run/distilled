import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Bedrock Data Automation Runtime",
  target: "AmazonBedrockKeystoneRuntimeService",
  version: "2024-06-13",
  sigv4: "bedrock",
  protocol: awsJson1_1Protocol,
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
                `https://bedrock-data-automation-runtime-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://bedrock-data-automation-runtime-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://bedrock-data-automation-runtime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://bedrock-data-automation-runtime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type InvocationArn = string;
export interface GetDataAutomationStatusRequest {
  invocationArn: string;
}
export type AutomationJobStatus =
  | "Created"
  | "InProgress"
  | "Success"
  | "ServiceError"
  | "ClientError"
  | (string & {});
export type S3Uri = string;
export interface OutputConfiguration {
  s3Uri: string;
}
export interface GetDataAutomationStatusResponse {
  status?: AutomationJobStatus;
  errorType?: string;
  errorMessage?: string;
  outputConfiguration?: OutputConfiguration;
  jobSubmissionTime?: Date;
  jobCompletionTime?: Date;
  jobDurationInSeconds?: number;
}
export interface SyncInputConfiguration {
  bytes?: Uint8Array;
  s3Uri?: string;
}
export type DataAutomationArn = string;
export type DataAutomationStage = "LIVE" | "DEVELOPMENT" | (string & {});
export interface DataAutomationConfiguration {
  dataAutomationProjectArn: string;
  stage?: DataAutomationStage;
}
export type BlueprintArn = string;
export type BlueprintVersion = string;
export type BlueprintStage = "DEVELOPMENT" | "LIVE" | (string & {});
export interface Blueprint {
  blueprintArn: string;
  version?: string;
  stage?: BlueprintStage;
}
export type BlueprintList = Blueprint[];
export type DataAutomationProfileArn = string;
export type KMSKeyId = string;
export type EncryptionContextKey = string;
export type EncryptionContextValue = string;
export type EncryptionContextMap = { [key: string]: string | undefined };
export interface EncryptionConfiguration {
  kmsKeyId: string;
  kmsEncryptionContext?: { [key: string]: string | undefined };
}
export interface InvokeDataAutomationRequest {
  inputConfiguration: SyncInputConfiguration;
  dataAutomationConfiguration?: DataAutomationConfiguration;
  blueprints?: Blueprint[];
  dataAutomationProfileArn: string;
  encryptionConfiguration?: EncryptionConfiguration;
  outputConfiguration?: OutputConfiguration;
}
export type SemanticModality =
  | "DOCUMENT"
  | "IMAGE"
  | "AUDIO"
  | "VIDEO"
  | (string & {});
export type CustomOutputStatus = "MATCH" | "NO_MATCH" | (string & {});
export interface OutputSegment {
  customOutputStatus?: CustomOutputStatus;
  customOutput?: string;
  standardOutput?: string;
}
export type OutputSegmentList = OutputSegment[];
export interface InvokeDataAutomationResponse {
  outputConfiguration?: OutputConfiguration;
  semanticModality: SemanticModality;
  outputSegments?: OutputSegment[];
}
export type IdempotencyToken = string;
export interface TimestampSegment {
  startTimeMillis: number;
  endTimeMillis: number;
}
export type VideoSegmentConfiguration = { timestampSegment: TimestampSegment };
export interface VideoAssetProcessingConfiguration {
  segmentConfiguration?: VideoSegmentConfiguration;
}
export interface AssetProcessingConfiguration {
  video?: VideoAssetProcessingConfiguration;
}
export interface InputConfiguration {
  s3Uri: string;
  assetProcessingConfiguration?: AssetProcessingConfiguration;
}
export interface EventBridgeConfiguration {
  eventBridgeEnabled: boolean;
}
export interface NotificationConfiguration {
  eventBridgeConfiguration: EventBridgeConfiguration;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagList = Tag[];
export interface InvokeDataAutomationAsyncRequest {
  clientToken?: string;
  inputConfiguration: InputConfiguration;
  outputConfiguration: OutputConfiguration;
  dataAutomationConfiguration?: DataAutomationConfiguration;
  encryptionConfiguration?: EncryptionConfiguration;
  notificationConfiguration?: NotificationConfiguration;
  blueprints?: Blueprint[];
  dataAutomationProfileArn: string;
  tags?: Tag[];
}
export interface InvokeDataAutomationAsyncResponse {
  invocationArn: string;
}
export type TaggableResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceARN: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export interface TagResourceRequest {
  resourceARN: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceARN: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export type NonBlankString = string;
export type GetDataAutomationStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * API used to get data automation status.
 */
export const getDataAutomationStatus: API.OperationMethod<
  GetDataAutomationStatusRequest,
  GetDataAutomationStatusResponse,
  GetDataAutomationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { invocationArn: 0 },
    output: { jobSubmissionTime: D.ts, jobCompletionTime: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataAutomationStatus",
})) as any;

export type InvokeDataAutomationError =
  | AccessDeniedException
  | InternalServerException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sync API: Invoke data automation.
 */
export const invokeDataAutomation: API.OperationMethod<
  InvokeDataAutomationRequest,
  InvokeDataAutomationResponse,
  InvokeDataAutomationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      inputConfiguration: { bytes: 0, s3Uri: 0 },
      dataAutomationConfiguration: i_DataAutomationConfiguration,
      blueprints: D.list(i_Blueprint),
      dataAutomationProfileArn: 0,
      encryptionConfiguration: i_EncryptionConfiguration,
      outputConfiguration: i_OutputConfiguration,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeDataAutomation",
})) as any;

export type InvokeDataAutomationAsyncError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Async API: Invoke data automation.
 */
export const invokeDataAutomationAsync: API.OperationMethod<
  InvokeDataAutomationAsyncRequest,
  InvokeDataAutomationAsyncResponse,
  InvokeDataAutomationAsyncError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      clientToken: D.m({ idempotency: true }),
      inputConfiguration: {
        s3Uri: 0,
        assetProcessingConfiguration: {
          video: {
            segmentConfiguration: {
              timestampSegment: { startTimeMillis: 0, endTimeMillis: 0 },
            },
          },
        },
      },
      outputConfiguration: i_OutputConfiguration,
      dataAutomationConfiguration: i_DataAutomationConfiguration,
      encryptionConfiguration: i_EncryptionConfiguration,
      notificationConfiguration: {
        eventBridgeConfiguration: { eventBridgeEnabled: 0 },
      },
      blueprints: D.list(i_Blueprint),
      dataAutomationProfileArn: 0,
      tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeDataAutomationAsync",
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List tags for an Amazon Bedrock Data Automation resource
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceARN: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tag an Amazon Bedrock Data Automation resource
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceARN: 0, tags: D.list(i_Tag) } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Untag an Amazon Bedrock Data Automation resource
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceARN: 0, tagKeys: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

const i_Blueprint: D.LazyStruct = () => ({
  blueprintArn: 0,
  version: 0,
  stage: 0,
});
const i_DataAutomationConfiguration: D.LazyStruct = () => ({
  dataAutomationProjectArn: 0,
  stage: 0,
});
const i_EncryptionConfiguration: D.LazyStruct = () => ({
  kmsKeyId: 0,
  kmsEncryptionContext: 0,
});
const i_OutputConfiguration: D.LazyStruct = () => ({ s3Uri: 0 });
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
