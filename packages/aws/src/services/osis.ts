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
  sdkId: "OSIS",
  target: "AmazonOpenSearchIngestionService",
  version: "2022-01-01",
  sigv4: "osis",
  protocol: restJson1Protocol,
  xmlns: "http://osis.amazonaws.com/doc/2022-01-01",
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
                `https://osis-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://osis-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://osis.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://osis.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class DisabledOperationException
  extends /*@__PURE__*/ TE.TaggedError(
    "DisabledOperationException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class InternalException
  extends /*@__PURE__*/ TE.TaggedError("InternalException", ["ServerError"], {
    status: 500,
  })<{ readonly message?: string }> {}
export class InvalidPaginationTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidPaginationTokenException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceAlreadyExistsException",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type PipelineName = string;
export type PipelineUnits = number;
export type PipelineConfigurationBody = string;
export type LogGroup = string;
export interface CloudWatchLogDestination {
  LogGroup: string;
}
export interface LogPublishingOptions {
  IsLoggingEnabled?: boolean;
  CloudWatchLogDestination?: CloudWatchLogDestination;
}
export type SubnetId = string;
export type SubnetIds = string[];
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export type CidrBlock = string;
export interface VpcAttachmentOptions {
  AttachToVpc: boolean;
  CidrBlock?: string;
}
export type VpcEndpointManagement = "CUSTOMER" | "SERVICE" | (string & {});
export interface VpcOptions {
  SubnetIds: string[];
  SecurityGroupIds?: string[];
  VpcAttachmentOptions?: VpcAttachmentOptions;
  VpcEndpointManagement?: VpcEndpointManagement;
}
export interface BufferOptions {
  PersistentBufferEnabled: boolean;
}
export type KmsKeyArn = string;
export interface EncryptionAtRestOptions {
  KmsKeyArn: string;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export type PipelineRoleArn = string;
export interface CreatePipelineRequest {
  PipelineName: string;
  MinUnits: number;
  MaxUnits: number;
  PipelineConfigurationBody: string;
  LogPublishingOptions?: LogPublishingOptions;
  VpcOptions?: VpcOptions;
  BufferOptions?: BufferOptions;
  EncryptionAtRestOptions?: EncryptionAtRestOptions;
  Tags?: Tag[];
  PipelineRoleArn?: string;
}
export type PipelineStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "STARTING"
  | "START_FAILED"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export interface PipelineStatusReason {
  Description?: string;
}
export type IngestEndpointUrlsList = string[];
export interface VpcEndpoint {
  VpcEndpointId?: string;
  VpcId?: string;
  VpcOptions?: VpcOptions;
}
export type VpcEndpointsList = VpcEndpoint[];
export type VpcEndpointServiceName = "OPENSEARCH_SERVERLESS" | (string & {});
export interface ServiceVpcEndpoint {
  ServiceName?: VpcEndpointServiceName;
  VpcEndpointId?: string;
}
export type ServiceVpcEndpointsList = ServiceVpcEndpoint[];
export interface PipelineDestination {
  ServiceName?: string;
  Endpoint?: string;
}
export type PipelineDestinationList = PipelineDestination[];
export interface Pipeline {
  PipelineName?: string;
  PipelineArn?: string;
  MinUnits?: number;
  MaxUnits?: number;
  Status?: PipelineStatus;
  StatusReason?: PipelineStatusReason;
  PipelineConfigurationBody?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  IngestEndpointUrls?: string[];
  LogPublishingOptions?: LogPublishingOptions;
  VpcEndpoints?: VpcEndpoint[];
  BufferOptions?: BufferOptions;
  EncryptionAtRestOptions?: EncryptionAtRestOptions;
  VpcEndpointService?: string;
  ServiceVpcEndpoints?: ServiceVpcEndpoint[];
  Destinations?: PipelineDestination[];
  Tags?: Tag[];
  PipelineRoleArn?: string;
}
export interface CreatePipelineResponse {
  Pipeline?: Pipeline;
}
export type PipelineArn = string;
export interface PipelineEndpointVpcOptions {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
}
export interface CreatePipelineEndpointRequest {
  PipelineArn: string;
  VpcOptions: PipelineEndpointVpcOptions;
}
export type PipelineEndpointId = string;
export type PipelineEndpointStatus =
  | "CREATING"
  | "ACTIVE"
  | "CREATE_FAILED"
  | "DELETING"
  | "REVOKING"
  | "REVOKED"
  | (string & {});
export interface CreatePipelineEndpointResponse {
  PipelineArn?: string;
  EndpointId?: string;
  Status?: PipelineEndpointStatus;
  VpcId?: string;
}
export interface DeletePipelineRequest {
  PipelineName: string;
}
export interface DeletePipelineResponse {}
export interface DeletePipelineEndpointRequest {
  EndpointId: string;
}
export interface DeletePipelineEndpointResponse {}
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
}
export interface DeleteResourcePolicyResponse {}
export interface GetPipelineRequest {
  PipelineName: string;
}
export interface GetPipelineResponse {
  Pipeline?: Pipeline;
}
export type BlueprintFormat = string;
export interface GetPipelineBlueprintRequest {
  BlueprintName: string;
  Format?: string;
}
export interface PipelineBlueprint {
  BlueprintName?: string;
  PipelineConfigurationBody?: string;
  DisplayName?: string;
  DisplayDescription?: string;
  Service?: string;
  UseCase?: string;
}
export interface GetPipelineBlueprintResponse {
  Blueprint?: PipelineBlueprint;
  Format?: string;
}
export interface GetPipelineChangeProgressRequest {
  PipelineName: string;
}
export type ChangeProgressStatuses =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export type ChangeProgressStageStatuses =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export interface ChangeProgressStage {
  Name?: string;
  Status?: ChangeProgressStageStatuses;
  Description?: string;
  LastUpdatedAt?: Date;
}
export type ChangeProgressStageList = ChangeProgressStage[];
export interface ChangeProgressStatus {
  StartTime?: Date;
  Status?: ChangeProgressStatuses;
  TotalNumberOfStages?: number;
  ChangeProgressStages?: ChangeProgressStage[];
}
export type ChangeProgressStatusList = ChangeProgressStatus[];
export interface GetPipelineChangeProgressResponse {
  ChangeProgressStatuses?: ChangeProgressStatus[];
}
export interface GetResourcePolicyRequest {
  ResourceArn: string;
}
export type ResourcePolicy = string;
export interface GetResourcePolicyResponse {
  ResourceArn?: string;
  Policy?: string;
}
export interface ListPipelineBlueprintsRequest {}
export interface PipelineBlueprintSummary {
  BlueprintName?: string;
  DisplayName?: string;
  DisplayDescription?: string;
  Service?: string;
  UseCase?: string;
}
export type PipelineBlueprintsSummaryList = PipelineBlueprintSummary[];
export interface ListPipelineBlueprintsResponse {
  Blueprints?: PipelineBlueprintSummary[];
}
export type MaxResults = number;
export type NextToken = string;
export interface ListPipelineEndpointConnectionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type AwsAccountId = string;
export interface PipelineEndpointConnection {
  PipelineArn?: string;
  EndpointId?: string;
  Status?: PipelineEndpointStatus;
  VpcEndpointOwner?: string;
}
export type PipelineEndpointConnectionsSummaryList =
  PipelineEndpointConnection[];
export interface ListPipelineEndpointConnectionsResponse {
  NextToken?: string;
  PipelineEndpointConnections?: PipelineEndpointConnection[];
}
export interface ListPipelineEndpointsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface PipelineEndpoint {
  PipelineArn?: string;
  EndpointId?: string;
  Status?: PipelineEndpointStatus;
  VpcId?: string;
  VpcOptions?: PipelineEndpointVpcOptions;
  IngestEndpointUrl?: string;
}
export type PipelineEndpointsSummaryList = PipelineEndpoint[];
export interface ListPipelineEndpointsResponse {
  NextToken?: string;
  PipelineEndpoints?: PipelineEndpoint[];
}
export interface ListPipelinesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface PipelineSummary {
  Status?: PipelineStatus;
  StatusReason?: PipelineStatusReason;
  PipelineName?: string;
  PipelineArn?: string;
  MinUnits?: number;
  MaxUnits?: number;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Destinations?: PipelineDestination[];
  Tags?: Tag[];
}
export type PipelineSummaryList = PipelineSummary[];
export interface ListPipelinesResponse {
  NextToken?: string;
  Pipelines?: PipelineSummary[];
}
export interface ListTagsForResourceRequest {
  Arn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  Policy: string;
}
export interface PutResourcePolicyResponse {
  ResourceArn?: string;
  Policy?: string;
}
export type PipelineEndpointIdsList = string[];
export interface RevokePipelineEndpointConnectionsRequest {
  PipelineArn: string;
  EndpointIds: string[];
}
export interface RevokePipelineEndpointConnectionsResponse {
  PipelineArn?: string;
}
export interface StartPipelineRequest {
  PipelineName: string;
}
export interface StartPipelineResponse {
  Pipeline?: Pipeline;
}
export interface StopPipelineRequest {
  PipelineName: string;
}
export interface StopPipelineResponse {
  Pipeline?: Pipeline;
}
export interface TagResourceRequest {
  Arn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type StringList = string[];
export interface UntagResourceRequest {
  Arn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdatePipelineRequest {
  PipelineName: string;
  MinUnits?: number;
  MaxUnits?: number;
  PipelineConfigurationBody?: string;
  LogPublishingOptions?: LogPublishingOptions;
  BufferOptions?: BufferOptions;
  EncryptionAtRestOptions?: EncryptionAtRestOptions;
  PipelineRoleArn?: string;
}
export interface UpdatePipelineResponse {
  Pipeline?: Pipeline;
}
export interface ValidatePipelineRequest {
  PipelineConfigurationBody: string;
}
export interface ValidationMessage {
  Message?: string;
}
export type ValidationMessageList = ValidationMessage[];
export interface ValidatePipelineResponse {
  isValid?: boolean;
  Errors?: ValidationMessage[];
}
export type ErrorMessage = string;
export type CreatePipelineError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates an OpenSearch Ingestion pipeline. For more information, see Creating Amazon OpenSearch
 * Ingestion pipelines.
 */
export const createPipeline: API.OperationMethod<
  CreatePipelineRequest,
  CreatePipelineResponse,
  CreatePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2022-01-01/osis/createPipeline",
    input: {
      PipelineName: 0,
      MinUnits: 0,
      MaxUnits: 0,
      PipelineConfigurationBody: 0,
      LogPublishingOptions: i_LogPublishingOptions,
      VpcOptions: {
        SubnetIds: 0,
        SecurityGroupIds: 0,
        VpcAttachmentOptions: { AttachToVpc: 0, CidrBlock: 0 },
        VpcEndpointManagement: 0,
      },
      BufferOptions: i_BufferOptions,
      EncryptionAtRestOptions: i_EncryptionAtRestOptions,
      Tags: D.list(i_Tag),
      PipelineRoleArn: 0,
    },
    output: { Pipeline: o_Pipeline },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePipeline",
})) as any;

export type CreatePipelineEndpointError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a VPC endpoint for an OpenSearch Ingestion pipeline. Pipeline endpoints allow you to
 * ingest data from your VPC into pipelines that you have access to.
 */
export const createPipelineEndpoint: API.OperationMethod<
  CreatePipelineEndpointRequest,
  CreatePipelineEndpointResponse,
  CreatePipelineEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2022-01-01/osis/createPipelineEndpoint",
    input: {
      PipelineArn: 0,
      VpcOptions: { SubnetIds: 0, SecurityGroupIds: 0 },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePipelineEndpoint",
})) as any;

export type DeletePipelineError =
  | AccessDeniedException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an OpenSearch Ingestion pipeline. For more information, see Deleting Amazon OpenSearch
 * Ingestion pipelines.
 */
export const deletePipeline: API.OperationMethod<
  DeletePipelineRequest,
  DeletePipelineResponse,
  DeletePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2022-01-01/osis/deletePipeline/{PipelineName}",
    input: { PipelineName: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePipeline",
})) as any;

export type DeletePipelineEndpointError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a VPC endpoint for an OpenSearch Ingestion pipeline.
 */
export const deletePipelineEndpoint: API.OperationMethod<
  DeletePipelineEndpointRequest,
  DeletePipelineEndpointResponse,
  DeletePipelineEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2022-01-01/osis/deletePipelineEndpoint/{EndpointId}",
    input: { EndpointId: 0 },
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePipelineEndpoint",
})) as any;

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a resource-based policy from an OpenSearch Ingestion resource.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2022-01-01/osis/resourcePolicy/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
})) as any;

export type GetPipelineError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an OpenSearch Ingestion pipeline.
 */
export const getPipeline: API.OperationMethod<
  GetPipelineRequest,
  GetPipelineResponse,
  GetPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2022-01-01/osis/getPipeline/{PipelineName}",
    input: { PipelineName: 0 },
    output: { Pipeline: o_Pipeline },
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPipeline",
})) as any;

export type GetPipelineBlueprintError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific blueprint for OpenSearch Ingestion. Blueprints are
 * templates for the configuration needed for a `CreatePipeline` request. For more
 * information, see Using
 * blueprints to create a pipeline.
 */
export const getPipelineBlueprint: API.OperationMethod<
  GetPipelineBlueprintRequest,
  GetPipelineBlueprintResponse,
  GetPipelineBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2022-01-01/osis/getPipelineBlueprint/{BlueprintName}",
    input: { BlueprintName: 0, Format: D.m({ query: "format" }) },
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPipelineBlueprint",
})) as any;

export type GetPipelineChangeProgressError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns progress information for the current change happening on an OpenSearch Ingestion
 * pipeline. Currently, this operation only returns information when a pipeline is being
 * created.
 *
 * For more information, see Tracking the status of pipeline creation.
 */
export const getPipelineChangeProgress: API.OperationMethod<
  GetPipelineChangeProgressRequest,
  GetPipelineChangeProgressResponse,
  GetPipelineChangeProgressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2022-01-01/osis/getPipelineChangeProgress/{PipelineName}",
    input: { PipelineName: 0 },
    output: {
      ChangeProgressStatuses: D.list({
        StartTime: D.ts,
        ChangeProgressStages: D.list({ LastUpdatedAt: D.ts }),
      }),
    },
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPipelineChangeProgress",
})) as any;

export type GetResourcePolicyError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the resource-based policy attached to an OpenSearch Ingestion resource.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2022-01-01/osis/resourcePolicy/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
})) as any;

export type ListPipelineBlueprintsError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | InvalidPaginationTokenException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all available blueprints for Data Prepper. For more information, see
 * Using
 * blueprints to create a pipeline.
 */
export const listPipelineBlueprints: API.OperationMethod<
  ListPipelineBlueprintsRequest,
  ListPipelineBlueprintsResponse,
  ListPipelineBlueprintsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2022-01-01/osis/listPipelineBlueprints",
    input: {},
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    InvalidPaginationTokenException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipelineBlueprints",
})) as any;

export type ListPipelineEndpointConnectionsError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Lists the pipeline endpoints connected to pipelines in your account.
 */
export const listPipelineEndpointConnections: API.PaginatedOperationMethod<
  ListPipelineEndpointConnectionsRequest,
  ListPipelineEndpointConnectionsResponse,
  ListPipelineEndpointConnectionsError,
  Credentials | HttpClient.HttpClient,
  PipelineEndpointConnection
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2022-01-01/osis/listPipelineEndpointConnections",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipelineEndpointConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PipelineEndpointConnections",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPipelineEndpointsError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Lists all pipeline endpoints in your account.
 */
export const listPipelineEndpoints: API.PaginatedOperationMethod<
  ListPipelineEndpointsRequest,
  ListPipelineEndpointsResponse,
  ListPipelineEndpointsError,
  Credentials | HttpClient.HttpClient,
  PipelineEndpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2022-01-01/osis/listPipelineEndpoints",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipelineEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PipelineEndpoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPipelinesError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | InvalidPaginationTokenException
  | ValidationException
  | CommonErrors;
/**
 * Lists all OpenSearch Ingestion pipelines in the current Amazon Web Services account and Region.
 * For more information, see Viewing Amazon OpenSearch
 * Ingestion pipelines.
 */
export const listPipelines: API.PaginatedOperationMethod<
  ListPipelinesRequest,
  ListPipelinesResponse,
  ListPipelinesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2022-01-01/osis/listPipelines",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { Pipelines: D.list({ CreatedAt: D.ts, LastUpdatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    InvalidPaginationTokenException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipelines",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all resource tags associated with an OpenSearch Ingestion pipeline. For more information,
 * see Tagging Amazon OpenSearch Ingestion pipelines.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2022-01-01/osis/listTagsForResource",
    input: { Arn: D.m({ query: "arn" }) },
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PutResourcePolicyError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Attaches a resource-based policy to an OpenSearch Ingestion resource. Resource-based
 * policies grant permissions to principals to perform actions on the resource.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2022-01-01/osis/resourcePolicy/{ResourceArn}",
    input: { ResourceArn: 0, Policy: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
})) as any;

export type RevokePipelineEndpointConnectionsError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Revokes pipeline endpoints from specified endpoint IDs.
 */
export const revokePipelineEndpointConnections: API.OperationMethod<
  RevokePipelineEndpointConnectionsRequest,
  RevokePipelineEndpointConnectionsResponse,
  RevokePipelineEndpointConnectionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2022-01-01/osis/revokePipelineEndpointConnections",
    input: { PipelineArn: 0, EndpointIds: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokePipelineEndpointConnections",
})) as any;

export type StartPipelineError =
  | AccessDeniedException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Starts an OpenSearch Ingestion pipeline. For more information, see Starting an OpenSearch Ingestion pipeline.
 */
export const startPipeline: API.OperationMethod<
  StartPipelineRequest,
  StartPipelineResponse,
  StartPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2022-01-01/osis/startPipeline/{PipelineName}",
    input: { PipelineName: 0 },
    output: { Pipeline: o_Pipeline },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPipeline",
})) as any;

export type StopPipelineError =
  | AccessDeniedException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Stops an OpenSearch Ingestion pipeline. For more information, see Stopping
 * an OpenSearch Ingestion pipeline.
 */
export const stopPipeline: API.OperationMethod<
  StopPipelineRequest,
  StopPipelineResponse,
  StopPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2022-01-01/osis/stopPipeline/{PipelineName}",
    input: { PipelineName: 0 },
    output: { Pipeline: o_Pipeline },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopPipeline",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Tags an OpenSearch Ingestion pipeline. For more information, see Tagging Amazon OpenSearch
 * Ingestion pipelines.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2022-01-01/osis/tagResource",
    input: { Arn: D.m({ query: "arn" }), Tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from an OpenSearch Ingestion pipeline. For more information, see Tagging
 * Amazon OpenSearch Ingestion pipelines.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2022-01-01/osis/untagResource",
    input: { Arn: D.m({ query: "arn" }), TagKeys: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdatePipelineError =
  | AccessDeniedException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an OpenSearch Ingestion pipeline. For more information, see Updating Amazon OpenSearch
 * Ingestion pipelines.
 */
export const updatePipeline: API.OperationMethod<
  UpdatePipelineRequest,
  UpdatePipelineResponse,
  UpdatePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2022-01-01/osis/updatePipeline/{PipelineName}",
    input: {
      PipelineName: 0,
      MinUnits: 0,
      MaxUnits: 0,
      PipelineConfigurationBody: 0,
      LogPublishingOptions: i_LogPublishingOptions,
      BufferOptions: i_BufferOptions,
      EncryptionAtRestOptions: i_EncryptionAtRestOptions,
      PipelineRoleArn: 0,
    },
    output: { Pipeline: o_Pipeline },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePipeline",
})) as any;

export type ValidatePipelineError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ValidationException
  | CommonErrors;
/**
 * Checks whether an OpenSearch Ingestion pipeline configuration is valid prior to creation. For
 * more information, see Creating Amazon OpenSearch
 * Ingestion pipelines.
 */
export const validatePipeline: API.OperationMethod<
  ValidatePipelineRequest,
  ValidatePipelineResponse,
  ValidatePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2022-01-01/osis/validatePipeline",
    input: { PipelineConfigurationBody: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidatePipeline",
})) as any;

const i_BufferOptions: D.LazyStruct = () => ({ PersistentBufferEnabled: 0 });
const i_EncryptionAtRestOptions: D.LazyStruct = () => ({ KmsKeyArn: 0 });
const i_LogPublishingOptions: D.LazyStruct = () => ({
  IsLoggingEnabled: 0,
  CloudWatchLogDestination: { LogGroup: 0 },
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_Pipeline: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  LastUpdatedAt: D.ts,
});
