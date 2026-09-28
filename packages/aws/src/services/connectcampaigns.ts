import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "ConnectCampaigns",
  target: "AmazonConnectCampaignService",
  version: "2021-01-30",
  sigv4: "connect-campaigns",
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
                `https://connect-campaigns-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://connect-campaigns-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://connect-campaigns.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://connect-campaigns.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    headers: { xAmzErrorType: "x-amzn-ErrorType" },
  })<{ readonly message: string; readonly xAmzErrorType?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
    headers: { xAmzErrorType: "x-amzn-ErrorType" },
  })<{ readonly message: string; readonly xAmzErrorType?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500, headers: { xAmzErrorType: "x-amzn-ErrorType" } },
  )<{ readonly message: string; readonly xAmzErrorType?: string }> {}
export class InvalidCampaignStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidCampaignStateException",
    ["ConflictError"],
    { status: 409, headers: { xAmzErrorType: "x-amzn-ErrorType" } },
  )<{
    readonly state: string;
    readonly message: string;
    readonly xAmzErrorType?: string;
  }> {}
export class InvalidStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidStateException",
    ["ConflictError"],
    { status: 409, headers: { xAmzErrorType: "x-amzn-ErrorType" } },
  )<{ readonly message: string; readonly xAmzErrorType?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404, headers: { xAmzErrorType: "x-amzn-ErrorType" } },
  )<{ readonly message: string; readonly xAmzErrorType?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402, headers: { xAmzErrorType: "x-amzn-ErrorType" } },
  )<{ readonly message: string; readonly xAmzErrorType?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { xAmzErrorType: "x-amzn-ErrorType" } },
  )<{ readonly message: string; readonly xAmzErrorType?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400, headers: { xAmzErrorType: "x-amzn-ErrorType" } },
  )<{ readonly message: string; readonly xAmzErrorType?: string }> {}
export type CampaignName = string;
export type InstanceId = string;
export type BandwidthAllocation = number;
export type DialingCapacity = number;
export interface ProgressiveDialerConfig {
  bandwidthAllocation: number;
  dialingCapacity?: number;
}
export interface PredictiveDialerConfig {
  bandwidthAllocation: number;
  dialingCapacity?: number;
}
export interface AgentlessDialerConfig {
  dialingCapacity?: number;
}
export type DialerConfig =
  | {
      progressiveDialerConfig: ProgressiveDialerConfig;
      predictiveDialerConfig?: never;
      agentlessDialerConfig?: never;
    }
  | {
      progressiveDialerConfig?: never;
      predictiveDialerConfig: PredictiveDialerConfig;
      agentlessDialerConfig?: never;
    }
  | {
      progressiveDialerConfig?: never;
      predictiveDialerConfig?: never;
      agentlessDialerConfig: AgentlessDialerConfig;
    };
export type ContactFlowId = string;
export type SourcePhoneNumber = string;
export type QueueId = string;
export interface AnswerMachineDetectionConfig {
  enableAnswerMachineDetection: boolean;
  awaitAnswerMachinePrompt?: boolean;
}
export interface OutboundCallConfig {
  connectContactFlowId: string;
  connectSourcePhoneNumber?: string;
  connectQueueId?: string;
  answerMachineDetectionConfig?: AnswerMachineDetectionConfig;
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateCampaignRequest {
  name: string;
  connectInstanceId: string;
  dialerConfig: DialerConfig;
  outboundCallConfig: OutboundCallConfig;
  tags?: { [key: string]: string | undefined };
}
export type CampaignId = string;
export type CampaignArn = string;
export interface CreateCampaignResponse {
  id?: string;
  arn?: string;
  tags?: { [key: string]: string | undefined };
}
export interface DeleteCampaignRequest {
  id: string;
}
export interface DeleteCampaignResponse {}
export interface DeleteConnectInstanceConfigRequest {
  connectInstanceId: string;
}
export interface DeleteConnectInstanceConfigResponse {}
export interface DeleteInstanceOnboardingJobRequest {
  connectInstanceId: string;
}
export interface DeleteInstanceOnboardingJobResponse {}
export interface DescribeCampaignRequest {
  id: string;
}
export interface Campaign {
  id: string;
  arn: string;
  name: string;
  connectInstanceId: string;
  dialerConfig: DialerConfig;
  outboundCallConfig: OutboundCallConfig;
  tags?: { [key: string]: string | undefined };
}
export interface DescribeCampaignResponse {
  campaign?: Campaign;
}
export interface GetCampaignStateRequest {
  id: string;
}
export type CampaignState = string;
export interface GetCampaignStateResponse {
  state?: string;
}
export type CampaignIdList = string[];
export interface GetCampaignStateBatchRequest {
  campaignIds: string[];
}
export interface SuccessfulCampaignStateResponse {
  campaignId?: string;
  state?: string;
}
export type SuccessfulCampaignStateResponseList =
  SuccessfulCampaignStateResponse[];
export type GetCampaignStateBatchFailureCode = string;
export interface FailedCampaignStateResponse {
  campaignId?: string;
  failureCode?: string;
}
export type FailedCampaignStateResponseList = FailedCampaignStateResponse[];
export interface GetCampaignStateBatchResponse {
  successfulRequests?: SuccessfulCampaignStateResponse[];
  failedRequests?: FailedCampaignStateResponse[];
}
export interface GetConnectInstanceConfigRequest {
  connectInstanceId: string;
}
export type ServiceLinkedRoleArn = string;
export type Enabled = boolean;
export type EncryptionType = string;
export type EncryptionKey = string;
export interface EncryptionConfig {
  enabled: boolean;
  encryptionType?: string;
  keyArn?: string;
}
export interface InstanceConfig {
  connectInstanceId: string;
  serviceLinkedRoleArn: string;
  encryptionConfig: EncryptionConfig;
}
export interface GetConnectInstanceConfigResponse {
  connectInstanceConfig?: InstanceConfig;
}
export interface GetInstanceOnboardingJobStatusRequest {
  connectInstanceId: string;
}
export type InstanceOnboardingJobStatusCode = string;
export type InstanceOnboardingJobFailureCode = string;
export interface InstanceOnboardingJobStatus {
  connectInstanceId: string;
  status: string;
  failureCode?: string;
}
export interface GetInstanceOnboardingJobStatusResponse {
  connectInstanceOnboardingJobStatus?: InstanceOnboardingJobStatus;
}
export type MaxResults = number;
export type NextToken = string;
export type InstanceIdFilterOperator = string;
export interface InstanceIdFilter {
  value: string;
  operator: string;
}
export interface CampaignFilters {
  instanceIdFilter?: InstanceIdFilter;
}
export interface ListCampaignsRequest {
  maxResults?: number;
  nextToken?: string;
  filters?: CampaignFilters;
}
export interface CampaignSummary {
  id: string;
  arn: string;
  name: string;
  connectInstanceId: string;
}
export type CampaignSummaryList = CampaignSummary[];
export interface ListCampaignsResponse {
  nextToken?: string;
  campaignSummaryList?: CampaignSummary[];
}
export type Arn = string;
export interface ListTagsForResourceRequest {
  arn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface PauseCampaignRequest {
  id: string;
}
export interface PauseCampaignResponse {}
export type ClientToken = string;
export type DestinationPhoneNumber = string | redacted.Redacted<string>;
export type AttributeName = string;
export type AttributeValue = string;
export type Attributes = { [key: string]: string | undefined };
export interface DialRequest {
  clientToken: string;
  phoneNumber: string | redacted.Redacted<string>;
  expirationTime: Date;
  attributes: { [key: string]: string | undefined };
}
export type DialRequestList = DialRequest[];
export interface PutDialRequestBatchRequest {
  id: string;
  dialRequests: DialRequest[];
}
export type DialRequestId = string;
export interface SuccessfulRequest {
  clientToken?: string;
  id?: string;
}
export type SuccessfulRequestList = SuccessfulRequest[];
export type FailureCode = string;
export interface FailedRequest {
  clientToken?: string;
  id?: string;
  failureCode?: string;
}
export type FailedRequestList = FailedRequest[];
export interface PutDialRequestBatchResponse {
  successfulRequests?: SuccessfulRequest[];
  failedRequests?: FailedRequest[];
}
export interface ResumeCampaignRequest {
  id: string;
}
export interface ResumeCampaignResponse {}
export interface StartCampaignRequest {
  id: string;
}
export interface StartCampaignResponse {}
export interface StartInstanceOnboardingJobRequest {
  connectInstanceId: string;
  encryptionConfig: EncryptionConfig;
}
export interface StartInstanceOnboardingJobResponse {
  connectInstanceOnboardingJobStatus?: InstanceOnboardingJobStatus;
}
export interface StopCampaignRequest {
  id: string;
}
export interface StopCampaignResponse {}
export interface TagResourceRequest {
  arn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  arn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateCampaignDialerConfigRequest {
  id: string;
  dialerConfig: DialerConfig;
}
export interface UpdateCampaignDialerConfigResponse {}
export interface UpdateCampaignNameRequest {
  id: string;
  name: string;
}
export interface UpdateCampaignNameResponse {}
export interface UpdateCampaignOutboundCallConfigRequest {
  id: string;
  connectContactFlowId?: string;
  connectSourcePhoneNumber?: string;
  answerMachineDetectionConfig?: AnswerMachineDetectionConfig;
}
export interface UpdateCampaignOutboundCallConfigResponse {}
export type XAmazonErrorType = string;
export type CreateCampaignError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a campaign for the specified Amazon Connect account. This API is idempotent.
 */
export const createCampaign: API.OperationMethod<
  CreateCampaignRequest,
  CreateCampaignResponse,
  CreateCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /campaigns",
    input: {
      name: 0,
      connectInstanceId: 0,
      dialerConfig: i_DialerConfig,
      outboundCallConfig: {
        connectContactFlowId: 0,
        connectSourcePhoneNumber: 0,
        connectQueueId: 0,
        answerMachineDetectionConfig: i_AnswerMachineDetectionConfig,
      },
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCampaign",
})) as any;

export type DeleteCampaignError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a campaign from the specified Amazon Connect account.
 */
export const deleteCampaign: API.OperationMethod<
  DeleteCampaignRequest,
  DeleteCampaignResponse,
  DeleteCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /campaigns/{id}",
    input: { id: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaign",
})) as any;

export type DeleteConnectInstanceConfigError =
  | AccessDeniedException
  | InternalServerException
  | InvalidStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a connect instance config from the specified AWS account.
 */
export const deleteConnectInstanceConfig: API.OperationMethod<
  DeleteConnectInstanceConfigRequest,
  DeleteConnectInstanceConfigResponse,
  DeleteConnectInstanceConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /connect-instance/{connectInstanceId}/config",
    input: { connectInstanceId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidStateException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectInstanceConfig",
})) as any;

export type DeleteInstanceOnboardingJobError =
  | AccessDeniedException
  | InternalServerException
  | InvalidStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Delete the Connect Campaigns onboarding job for the specified Amazon Connect instance.
 */
export const deleteInstanceOnboardingJob: API.OperationMethod<
  DeleteInstanceOnboardingJobRequest,
  DeleteInstanceOnboardingJobResponse,
  DeleteInstanceOnboardingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /connect-instance/{connectInstanceId}/onboarding",
    input: { connectInstanceId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInstanceOnboardingJob",
})) as any;

export type DescribeCampaignError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specific campaign.
 */
export const describeCampaign: API.OperationMethod<
  DescribeCampaignRequest,
  DescribeCampaignResponse,
  DescribeCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /campaigns/{id}", input: { id: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCampaign",
})) as any;

export type GetCampaignStateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get state of a campaign for the specified Amazon Connect account.
 */
export const getCampaignState: API.OperationMethod<
  GetCampaignStateRequest,
  GetCampaignStateResponse,
  GetCampaignStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /campaigns/{id}/state",
    input: { id: 0 },
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
  operationName: "GetCampaignState",
})) as any;

export type GetCampaignStateBatchError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get state of campaigns for the specified Amazon Connect account.
 */
export const getCampaignStateBatch: API.OperationMethod<
  GetCampaignStateBatchRequest,
  GetCampaignStateBatchResponse,
  GetCampaignStateBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /campaigns-state",
    input: { campaignIds: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaignStateBatch",
})) as any;

export type GetConnectInstanceConfigError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Get the specific Connect instance config.
 */
export const getConnectInstanceConfig: API.OperationMethod<
  GetConnectInstanceConfigRequest,
  GetConnectInstanceConfigResponse,
  GetConnectInstanceConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /connect-instance/{connectInstanceId}/config",
    input: { connectInstanceId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectInstanceConfig",
})) as any;

export type GetInstanceOnboardingJobStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Get the specific instance onboarding job status.
 */
export const getInstanceOnboardingJobStatus: API.OperationMethod<
  GetInstanceOnboardingJobStatusRequest,
  GetInstanceOnboardingJobStatusResponse,
  GetInstanceOnboardingJobStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /connect-instance/{connectInstanceId}/onboarding",
    input: { connectInstanceId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceOnboardingJobStatus",
})) as any;

export type ListCampaignsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Provides summary information about the campaigns under the specified Amazon Connect account.
 */
export const listCampaigns: API.PaginatedOperationMethod<
  ListCampaignsRequest,
  ListCampaignsResponse,
  ListCampaignsError,
  Credentials | HttpClient.HttpClient,
  CampaignSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /campaigns-summary",
    input: {
      maxResults: 0,
      nextToken: 0,
      filters: { instanceIdFilter: { value: 0, operator: 0 } },
    },
    body: true,
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCampaigns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "campaignSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List tags for a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /tags/{arn}", input: { arn: 0 } },
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

export type PauseCampaignError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Pauses a campaign for the specified Amazon Connect account.
 */
export const pauseCampaign: API.OperationMethod<
  PauseCampaignRequest,
  PauseCampaignResponse,
  PauseCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /campaigns/{id}/pause",
    input: { id: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PauseCampaign",
})) as any;

export type PutDialRequestBatchError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates dials requests for the specified campaign Amazon Connect account. This API is idempotent.
 */
export const putDialRequestBatch: API.OperationMethod<
  PutDialRequestBatchRequest,
  PutDialRequestBatchResponse,
  PutDialRequestBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /campaigns/{id}/dial-requests",
    input: {
      id: 0,
      dialRequests: D.list({
        clientToken: 0,
        phoneNumber: 0,
        expirationTime: D.tsAs("date-time"),
        attributes: 0,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDialRequestBatch",
})) as any;

export type ResumeCampaignError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a campaign for the specified Amazon Connect account.
 */
export const resumeCampaign: API.OperationMethod<
  ResumeCampaignRequest,
  ResumeCampaignResponse,
  ResumeCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /campaigns/{id}/resume",
    input: { id: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeCampaign",
})) as any;

export type StartCampaignError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a campaign for the specified Amazon Connect account.
 */
export const startCampaign: API.OperationMethod<
  StartCampaignRequest,
  StartCampaignResponse,
  StartCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /campaigns/{id}/start",
    input: { id: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCampaign",
})) as any;

export type StartInstanceOnboardingJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Onboard the specific Amazon Connect instance to Connect Campaigns.
 */
export const startInstanceOnboardingJob: API.OperationMethod<
  StartInstanceOnboardingJobRequest,
  StartInstanceOnboardingJobResponse,
  StartInstanceOnboardingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /connect-instance/{connectInstanceId}/onboarding",
    input: {
      connectInstanceId: 0,
      encryptionConfig: { enabled: 0, encryptionType: 0, keyArn: 0 },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartInstanceOnboardingJob",
})) as any;

export type StopCampaignError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a campaign for the specified Amazon Connect account.
 */
export const stopCampaign: API.OperationMethod<
  StopCampaignRequest,
  StopCampaignResponse,
  StopCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /campaigns/{id}/stop",
    input: { id: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopCampaign",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tag a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{arn}",
    input: { arn: 0, tags: 0 },
    body: true,
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
 * Untag a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{arn}",
    input: { arn: 0, tagKeys: D.m({ query: "tagKeys" }) },
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
  operationName: "UntagResource",
})) as any;

export type UpdateCampaignDialerConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the dialer config of a campaign. This API is idempotent.
 */
export const updateCampaignDialerConfig: API.OperationMethod<
  UpdateCampaignDialerConfigRequest,
  UpdateCampaignDialerConfigResponse,
  UpdateCampaignDialerConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /campaigns/{id}/dialer-config",
    input: { id: 0, dialerConfig: i_DialerConfig },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignDialerConfig",
})) as any;

export type UpdateCampaignNameError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the name of a campaign. This API is idempotent.
 */
export const updateCampaignName: API.OperationMethod<
  UpdateCampaignNameRequest,
  UpdateCampaignNameResponse,
  UpdateCampaignNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /campaigns/{id}/name",
    input: { id: 0, name: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignName",
})) as any;

export type UpdateCampaignOutboundCallConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the outbound call config of a campaign. This API is idempotent.
 */
export const updateCampaignOutboundCallConfig: API.OperationMethod<
  UpdateCampaignOutboundCallConfigRequest,
  UpdateCampaignOutboundCallConfigResponse,
  UpdateCampaignOutboundCallConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /campaigns/{id}/outbound-call-config",
    input: {
      id: 0,
      connectContactFlowId: 0,
      connectSourcePhoneNumber: 0,
      answerMachineDetectionConfig: i_AnswerMachineDetectionConfig,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignOutboundCallConfig",
})) as any;

const i_AnswerMachineDetectionConfig: D.LazyStruct = () => ({
  enableAnswerMachineDetection: 0,
  awaitAnswerMachinePrompt: 0,
});
const i_DialerConfig: D.LazyStruct = () => ({
  progressiveDialerConfig: { bandwidthAllocation: 0, dialingCapacity: 0 },
  predictiveDialerConfig: { bandwidthAllocation: 0, dialingCapacity: 0 },
  agentlessDialerConfig: { dialingCapacity: 0 },
});
