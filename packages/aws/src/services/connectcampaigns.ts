import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "ConnectCampaigns",
  serviceShapeName: "AmazonConnectCampaignService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "connect-campaigns" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-01-30");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://connect-campaigns.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://connect-campaigns.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://connect-campaigns.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      xAmzErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      xAmzErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      xAmzErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidCampaignStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidCampaignStateException>()(
    "InvalidCampaignStateException",
    {
      state: S.String,
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      xAmzErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InvalidStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateException>()(
    "InvalidStateException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      xAmzErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      xAmzErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      xAmzErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      xAmzErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      xAmzErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type SuccessfulCampaignStateResponseList = SuccessfulCampaignStateResponse[];
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
  input: __S(200, __c25, 0) as any as S.Schema<CreateCampaignRequest>,
  output: __S(201, __c25, 1) as any as S.Schema<CreateCampaignResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DeleteCampaignRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteCampaignResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaign",
}));

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
  input: __S(16, __c2, 0) as any as S.Schema<DeleteConnectInstanceConfigRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteConnectInstanceConfigResponse>,
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
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<DeleteInstanceOnboardingJobRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteInstanceOnboardingJobResponse>,
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
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<DescribeCampaignRequest>,
  output: __S(34, __c4, 2) as any as S.Schema<DescribeCampaignResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCampaign",
}));

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
  input: __S(40, __c5, 0) as any as S.Schema<GetCampaignStateRequest>,
  output: __S(41, __c5, 1) as any as S.Schema<GetCampaignStateResponse>,
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
}));

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
  input: __S(48, __c6, 0) as any as S.Schema<GetCampaignStateBatchRequest>,
  output: __S(53, __c6, 5) as any as S.Schema<GetCampaignStateBatchResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaignStateBatch",
}));

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
  input: __S(64, __c8, 0) as any as S.Schema<GetConnectInstanceConfigRequest>,
  output: __S(66, __c8, 2) as any as S.Schema<GetConnectInstanceConfigResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectInstanceConfig",
}));

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
  input: __S(80, __c10, 0) as any as S.Schema<GetInstanceOnboardingJobStatusRequest>,
  output: __S(89, __c11, 1) as any as S.Schema<GetInstanceOnboardingJobStatusResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceOnboardingJobStatus",
}));

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
  input: __S(98, __c12, 2) as any as S.Schema<ListCampaignsRequest>,
  output: __S(101, __c12, 5) as any as S.Schema<ListCampaignsResponse>,
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
  input: __S(104, __c13, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(105, __c13, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(112, __c14, 0) as any as S.Schema<PauseCampaignRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<PauseCampaignResponse>,
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
}));

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
  input: __S(122, __c15, 2) as any as S.Schema<PutDialRequestBatchRequest>,
  output: __S(127, __c15, 7) as any as S.Schema<PutDialRequestBatchResponse>,
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
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<ResumeCampaignRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<ResumeCampaignResponse>,
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
}));

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
  input: __S(136, __c17, 0) as any as S.Schema<StartCampaignRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<StartCampaignResponse>,
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
}));

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
  input: __S(144, __c18, 0) as any as S.Schema<StartInstanceOnboardingJobRequest>,
  output: __S(89, __c11, 1) as any as S.Schema<StartInstanceOnboardingJobResponse>,
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
}));

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
  input: __S(152, __c19, 0) as any as S.Schema<StopCampaignRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<StopCampaignResponse>,
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
}));

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
  input: __S(160, __c20, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(168, __c21, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(176, __c22, 0) as any as S.Schema<UpdateCampaignDialerConfigRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<UpdateCampaignDialerConfigResponse>,
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
}));

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
  input: __S(184, __c23, 0) as any as S.Schema<UpdateCampaignNameRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<UpdateCampaignNameResponse>,
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
}));

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
  input: __S(192, __c24, 0) as any as S.Schema<UpdateCampaignOutboundCallConfigRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<UpdateCampaignOutboundCallConfigResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/campaigns/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCampaignRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteCampaignResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/connect-instance/{connectInstanceId}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConnectInstanceConfigRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/connect-instance/{connectInstanceId}/onboarding" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteInstanceOnboardingJobRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/campaigns/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeCampaignRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          name: S.String,
          connectInstanceId: S.String,
          dialerConfig: __S(226, __c28, 2),
          outboundCallConfig: __S(208, __c26, 0),
          tags: S.optional(__S(216, __c27, 0)),
        }),
      ).annotate({ identifier: "Campaign" });
    case 2:
      return S.suspend(() => S.Struct({ campaign: S.optional(__S(33, __c4, 1)) })).annotate({
        identifier: "DescribeCampaignResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/campaigns/{id}/state" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCampaignStateRequest" });
    case 1:
      return S.suspend(() => S.Struct({ state: S.optional(S.String) })).annotate({
        identifier: "GetCampaignStateResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ campaignIds: __S(56, __c7, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/campaigns-state" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCampaignStateBatchRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ campaignId: S.optional(S.String), state: S.optional(S.String) }),
      ).annotate({ identifier: "SuccessfulCampaignStateResponse" });
    case 2:
      return S.Array(__S(49, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ campaignId: S.optional(S.String), failureCode: S.optional(S.String) }),
      ).annotate({ identifier: "FailedCampaignStateResponse" });
    case 4:
      return S.Array(__S(51, __c6, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          successfulRequests: S.optional(__S(50, __c6, 2)),
          failedRequests: S.optional(__S(52, __c6, 4)),
        }),
      ).annotate({ identifier: "GetCampaignStateBatchResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/connect-instance/{connectInstanceId}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectInstanceConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          connectInstanceId: S.String,
          serviceLinkedRoleArn: S.String,
          encryptionConfig: __S(72, __c9, 0),
        }),
      ).annotate({ identifier: "InstanceConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({ connectInstanceConfig: S.optional(__S(65, __c8, 1)) }),
      ).annotate({ identifier: "GetConnectInstanceConfigResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          enabled: S.Boolean,
          encryptionType: S.optional(S.String),
          keyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "EncryptionConfig" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/connect-instance/{connectInstanceId}/onboarding" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInstanceOnboardingJobStatusRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectInstanceId: S.String,
          status: S.String,
          failureCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceOnboardingJobStatus" });
    case 1:
      return S.suspend(() =>
        S.Struct({ connectInstanceOnboardingJobStatus: S.optional(__S(88, __c11, 0)) }),
      ).annotate({ identifier: "GetInstanceOnboardingJobStatusResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ value: S.String, operator: S.String })).annotate({
        identifier: "InstanceIdFilter",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ instanceIdFilter: S.optional(__S(96, __c12, 0)) }),
      ).annotate({ identifier: "CampaignFilters" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          filters: S.optional(__S(97, __c12, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/campaigns-summary" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCampaignsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ id: S.String, arn: S.String, name: S.String, connectInstanceId: S.String }),
      ).annotate({ identifier: "CampaignSummary" });
    case 4:
      return S.Array(__S(99, __c12, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          campaignSummaryList: S.optional(__S(100, __c12, 4)),
        }),
      ).annotate({ identifier: "ListCampaignsResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/tags/{arn}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(216, __c27, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/campaigns/{id}/pause" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PauseCampaignRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.String,
          phoneNumber: SensitiveString,
          expirationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          attributes: __S(216, __c27, 0),
        }),
      ).annotate({ identifier: "DialRequest" });
    case 1:
      return S.Array(__S(120, __c15, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")), dialRequests: __S(121, __c15, 1) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/campaigns/{id}/dial-requests" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutDialRequestBatchRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ clientToken: S.optional(S.String), id: S.optional(S.String) }),
      ).annotate({ identifier: "SuccessfulRequest" });
    case 4:
      return S.Array(__S(123, __c15, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String),
          id: S.optional(S.String),
          failureCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "FailedRequest" });
    case 6:
      return S.Array(__S(125, __c15, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          successfulRequests: S.optional(__S(124, __c15, 4)),
          failedRequests: S.optional(__S(126, __c15, 6)),
        }),
      ).annotate({ identifier: "PutDialRequestBatchResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/campaigns/{id}/resume" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResumeCampaignRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/campaigns/{id}/start" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartCampaignRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")),
          encryptionConfig: __S(72, __c9, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/connect-instance/{connectInstanceId}/onboarding" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartInstanceOnboardingJobRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/campaigns/{id}/stop" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopCampaignRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")), tags: __S(216, __c27, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/tags/{arn}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String.pipe(T.HttpLabel("arn")),
          tagKeys: __S(56, __c7, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/tags/{arn}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")), dialerConfig: __S(226, __c28, 2) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/campaigns/{id}/dialer-config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCampaignDialerConfigRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")), name: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/campaigns/{id}/name" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCampaignNameRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          connectContactFlowId: S.optional(S.String),
          connectSourcePhoneNumber: S.optional(S.String),
          answerMachineDetectionConfig: S.optional(__S(232, __c29, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/campaigns/{id}/outbound-call-config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCampaignOutboundCallConfigRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          connectInstanceId: S.String,
          dialerConfig: __S(226, __c28, 2),
          outboundCallConfig: __S(208, __c26, 0),
          tags: S.optional(__S(216, __c27, 0)),
        }).pipe(T.all(T.Http({ method: "PUT", uri: "/campaigns" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCampaignRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          tags: S.optional(__S(216, __c27, 0)),
        }),
      ).annotate({ identifier: "CreateCampaignResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectContactFlowId: S.String,
          connectSourcePhoneNumber: S.optional(S.String),
          connectQueueId: S.optional(S.String),
          answerMachineDetectionConfig: S.optional(__S(232, __c29, 0)),
        }),
      ).annotate({ identifier: "OutboundCallConfig" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bandwidthAllocation: S.Number, dialingCapacity: S.optional(S.Number) }),
      ).annotate({ identifier: "ProgressiveDialerConfig" });
    case 1:
      return S.suspend(() => S.Struct({ dialingCapacity: S.optional(S.Number) })).annotate({
        identifier: "AgentlessDialerConfig",
      });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ progressiveDialerConfig: __S(224, __c28, 0) }),
        /*@__PURE__*/ S.Struct({ predictiveDialerConfig: __S(224, __c28, 0) }),
        /*@__PURE__*/ S.Struct({ agentlessDialerConfig: __S(225, __c28, 1) }),
      ]);
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          enableAnswerMachineDetection: S.Boolean,
          awaitAnswerMachinePrompt: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AnswerMachineDetectionConfig" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
