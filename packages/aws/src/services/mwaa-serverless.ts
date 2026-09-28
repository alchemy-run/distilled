import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "MWAA Serverless",
  target: "AmazonMWAAServerless",
  version: "2024-07-26",
  sigv4: "airflow-serverless",
  protocol: awsJson1_0Protocol,
  rules: (p, _) => {
    const { UseFIPS = false, Endpoint, Region } = p;
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
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true) {
            return e(
              `https://airflow-serverless-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://airflow-serverless.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500, headers: { RetryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly RetryAfterSeconds?: number }> {}
export class OperationTimeoutException
  extends /*@__PURE__*/ TE.TaggedError(
    "OperationTimeoutException",
    ["TimeoutError"],
    { status: 504 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
    readonly ServiceCode: string;
    readonly QuotaCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { RetryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message: string;
    readonly ServiceCode: string;
    readonly QuotaCode: string;
    readonly RetryAfterSeconds?: number;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly Reason: ValidationExceptionReason;
    readonly FieldList?: ValidationExceptionField[];
  }> {}
export type NameString = string;
export type IdempotencyTokenString = string;
export interface DefinitionS3Location {
  Bucket: string;
  ObjectKey: string;
  VersionId?: string;
}
export interface S3Location {
  Bucket: string;
  ObjectKey: string;
  VersionId?: string;
}
export type Code = { S3Location: S3Location };
export type RoleARN = string;
export type DescriptionString = string;
export type EncryptionType =
  | "AWS_MANAGED_KEY"
  | "CUSTOMER_MANAGED_KEY"
  | (string & {});
export interface EncryptionConfiguration {
  Type: EncryptionType;
  KmsKeyId?: string;
}
export interface LoggingConfiguration {
  LogGroupName: string;
}
export type EngineVersion = 1 | (number & {});
export type SecurityGroupString = string;
export type SecurityGroupIds = string[];
export type SubnetString = string;
export type SubnetIds = string[];
export interface NetworkConfiguration {
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
}
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export interface CreateWorkflowRequest {
  Name: string;
  ClientToken?: string;
  DefinitionS3Location: DefinitionS3Location;
  Code?: Code;
  RoleArn: string;
  Description?: string;
  EncryptionConfiguration?: EncryptionConfiguration;
  LoggingConfiguration?: LoggingConfiguration;
  EngineVersion?: EngineVersion;
  NetworkConfiguration?: NetworkConfiguration;
  Tags?: { [key: string]: string | undefined };
  TriggerMode?: string;
}
export type WorkflowArn = string;
export type TimestampValue = Date;
export type WorkflowStatus = "READY" | "DELETING" | (string & {});
export type WorkflowVersion = string;
export type IsLatestVersion = boolean;
export type WarningMessages = string[];
export interface CreateWorkflowResponse {
  WorkflowArn: string;
  CreatedAt?: Date;
  RevisionId?: string;
  WorkflowStatus?: WorkflowStatus;
  WorkflowVersion?: string;
  IsLatestVersion?: boolean;
  Warnings?: string[];
}
export interface DeleteWorkflowRequest {
  WorkflowArn: string;
  WorkflowVersion?: string;
}
export interface DeleteWorkflowResponse {
  WorkflowArn: string;
  WorkflowVersion?: string;
}
export type IdString = string;
export interface GetTaskInstanceRequest {
  WorkflowArn: string;
  TaskInstanceId: string;
  RunId: string;
}
export type VersionId = string;
export type TaskInstanceStatus =
  | "QUEUED"
  | "FAILED"
  | "SCHEDULED"
  | "RUNNING"
  | "SUCCESS"
  | "UP_FOR_RESCHEDULE"
  | "UP_FOR_RETRY"
  | "UPSTREAM_FAILED"
  | "REMOVED"
  | "RESTARTING"
  | "DEFERRED"
  | "NONE"
  | "CANCELLED"
  | "TIMEOUT"
  | (string & {});
export type GenericMap = { [key: string]: string | undefined };
export interface GetTaskInstanceResponse {
  WorkflowArn: string;
  RunId: string;
  TaskInstanceId: string;
  WorkflowVersion?: string;
  Status?: TaskInstanceStatus;
  DurationInSeconds?: number;
  OperatorName?: string;
  ModifiedAt?: Date;
  EndedAt?: Date;
  StartedAt?: Date;
  AttemptNumber?: number;
  ErrorMessage?: string;
  TaskId?: string;
  LogStream?: string;
  Xcom?: { [key: string]: string | undefined };
}
export interface GetWorkflowRequest {
  WorkflowArn: string;
  WorkflowVersion?: string;
}
export interface ScheduleConfiguration {
  CronExpression?: string;
}
export interface GetWorkflowResponse {
  WorkflowArn: string;
  WorkflowVersion?: string;
  Name?: string;
  Description?: string;
  CreatedAt?: Date;
  ModifiedAt?: Date;
  EncryptionConfiguration?: EncryptionConfiguration;
  LoggingConfiguration?: LoggingConfiguration;
  EngineVersion?: EngineVersion;
  WorkflowStatus?: WorkflowStatus;
  DefinitionS3Location?: DefinitionS3Location;
  Code?: Code;
  CodeSnapshottedAt?: Date;
  ScheduleConfiguration?: ScheduleConfiguration;
  RoleArn?: string;
  NetworkConfiguration?: NetworkConfiguration;
  TriggerMode?: string;
  WorkflowDefinition?: string;
}
export interface GetWorkflowRunRequest {
  WorkflowArn: string;
  RunId: string;
}
export type RunType = "ON_DEMAND" | "SCHEDULED" | (string & {});
export type ObjectMap = { [key: string]: any | undefined };
export type TaskInstanceIds = string[];
export type WorkflowRunStatus =
  | "STARTING"
  | "QUEUED"
  | "RUNNING"
  | "SUCCESS"
  | "FAILED"
  | "TIMEOUT"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export interface WorkflowRunDetail {
  WorkflowArn?: string;
  WorkflowVersion?: string;
  RunId?: string;
  RunType?: RunType;
  StartedOn?: Date;
  CreatedAt?: Date;
  CompletedOn?: Date;
  ModifiedAt?: Date;
  Duration?: number;
  ErrorMessage?: string;
  TaskInstances?: string[];
  RunState?: WorkflowRunStatus;
}
export interface GetWorkflowRunResponse {
  WorkflowArn?: string;
  WorkflowVersion?: string;
  RunId?: string;
  RunType?: RunType;
  OverrideParameters?: { [key: string]: any | undefined };
  RunDetail?: WorkflowRunDetail;
}
export type TaggableResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface ListTaskInstancesRequest {
  WorkflowArn: string;
  RunId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface TaskInstanceSummary {
  WorkflowArn?: string;
  WorkflowVersion?: string;
  RunId?: string;
  TaskInstanceId?: string;
  Status?: TaskInstanceStatus;
  DurationInSeconds?: number;
  OperatorName?: string;
}
export type TaskInstanceSummaries = TaskInstanceSummary[];
export interface ListTaskInstancesResponse {
  TaskInstances?: TaskInstanceSummary[];
  NextToken?: string;
}
export interface ListWorkflowRunsRequest {
  MaxResults?: number;
  NextToken?: string;
  WorkflowArn: string;
  WorkflowVersion?: string;
}
export interface RunDetailSummary {
  Status?: WorkflowRunStatus;
  CreatedOn?: Date;
  StartedAt?: Date;
  EndedAt?: Date;
}
export interface WorkflowRunSummary {
  RunId?: string;
  WorkflowArn?: string;
  WorkflowVersion?: string;
  RunType?: RunType;
  RunDetailSummary?: RunDetailSummary;
}
export type WorkflowRunSummaries = WorkflowRunSummary[];
export interface ListWorkflowRunsResponse {
  WorkflowRuns?: WorkflowRunSummary[];
  NextToken?: string;
}
export interface ListWorkflowsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface WorkflowSummary {
  WorkflowArn: string;
  WorkflowVersion?: string;
  Name?: string;
  Description?: string;
  CreatedAt?: Date;
  ModifiedAt?: Date;
  WorkflowStatus?: WorkflowStatus;
  TriggerMode?: string;
}
export type WorkflowSummaries = WorkflowSummary[];
export interface ListWorkflowsResponse {
  Workflows: WorkflowSummary[];
  NextToken?: string;
}
export interface ListWorkflowVersionsRequest {
  MaxResults?: number;
  NextToken?: string;
  WorkflowArn: string;
}
export interface WorkflowVersionSummary {
  WorkflowVersion: string;
  WorkflowArn: string;
  IsLatestVersion?: boolean;
  CreatedAt?: Date;
  ModifiedAt?: Date;
  DefinitionS3Location?: DefinitionS3Location;
  ScheduleConfiguration?: ScheduleConfiguration;
  TriggerMode?: string;
}
export type WorkflowVersionSummaries = WorkflowVersionSummary[];
export interface ListWorkflowVersionsResponse {
  WorkflowVersions?: WorkflowVersionSummary[];
  NextToken?: string;
}
export interface StartWorkflowRunRequest {
  WorkflowArn: string;
  ClientToken?: string;
  OverrideParameters?: { [key: string]: any | undefined };
  WorkflowVersion?: string;
}
export interface StartWorkflowRunResponse {
  RunId?: string;
  Status?: WorkflowRunStatus;
  StartedAt?: Date;
}
export interface StopWorkflowRunRequest {
  WorkflowArn: string;
  RunId: string;
}
export interface StopWorkflowRunResponse {
  WorkflowArn?: string;
  WorkflowVersion?: string;
  RunId?: string;
  Status?: WorkflowRunStatus;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateWorkflowRequest {
  WorkflowArn: string;
  DefinitionS3Location: DefinitionS3Location;
  Code?: Code;
  RoleArn: string;
  Description?: string;
  LoggingConfiguration?: LoggingConfiguration;
  EngineVersion?: EngineVersion;
  NetworkConfiguration?: NetworkConfiguration;
  TriggerMode?: string;
}
export interface UpdateWorkflowResponse {
  WorkflowArn: string;
  ModifiedAt?: Date;
  WorkflowVersion?: string;
  Warnings?: string[];
}
export type ErrorMessage = string;
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export type ValidationExceptionFields = ValidationExceptionField[];
export type CreateWorkflowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OperationTimeoutException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new workflow in Amazon Managed Workflows for Apache Airflow Serverless. This operation initializes a workflow with the specified configuration including the workflow definition, execution role, and optional settings for encryption, logging, and networking. You must provide the workflow definition as a YAML file stored in Amazon S3 that defines the DAG structure using supported Amazon Web Services operators. Amazon Managed Workflows for Apache Airflow Serverless automatically creates the first version of the workflow and sets up the necessary execution environment with multi-tenant isolation and security controls.
 */
export const createWorkflow: API.OperationMethod<
  CreateWorkflowRequest,
  CreateWorkflowResponse,
  CreateWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      ClientToken: D.m({ idempotency: true }),
      DefinitionS3Location: i_DefinitionS3Location,
      Code: i_Code,
      RoleArn: 0,
      Description: 0,
      EncryptionConfiguration: { Type: 0, KmsKeyId: 0 },
      LoggingConfiguration: i_LoggingConfiguration,
      EngineVersion: 0,
      NetworkConfiguration: i_NetworkConfiguration,
      Tags: 0,
      TriggerMode: 0,
    },
    output: { CreatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OperationTimeoutException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkflow",
})) as any;

export type DeleteWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a workflow and all its versions. This operation permanently removes the workflow and cannot be undone. Amazon Managed Workflows for Apache Airflow Serverless ensures that all associated resources are properly cleaned up, including stopping any running executions, removing scheduled triggers, and cleaning up execution history. The deletion process respects the multi-tenant isolation boundaries and ensures that no residual data or configurations remain that could affect other customers or workflows.
 */
export const deleteWorkflow: API.OperationMethod<
  DeleteWorkflowRequest,
  DeleteWorkflowResponse,
  DeleteWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WorkflowArn: 0, WorkflowVersion: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkflow",
})) as any;

export type GetTaskInstanceError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific task instance within a workflow run. Task instances represent individual tasks that are executed as part of a workflow in the Amazon Managed Workflows for Apache Airflow Serverless environment. Each task instance runs in an isolated ECS container with dedicated resources and security boundaries. The service tracks task execution state, retry attempts, and provides detailed timing and error information for troubleshooting and monitoring purposes.
 */
export const getTaskInstance: API.OperationMethod<
  GetTaskInstanceRequest,
  GetTaskInstanceResponse,
  GetTaskInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WorkflowArn: 0, TaskInstanceId: 0, RunId: 0 },
    output: { ModifiedAt: D.ts, EndedAt: D.ts, StartedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTaskInstance",
})) as any;

export type GetWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a workflow, including its configuration, status, and metadata.
 */
export const getWorkflow: API.OperationMethod<
  GetWorkflowRequest,
  GetWorkflowResponse,
  GetWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WorkflowArn: 0, WorkflowVersion: 0 },
    output: { CreatedAt: D.ts, ModifiedAt: D.ts, CodeSnapshottedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflow",
})) as any;

export type GetWorkflowRunError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific workflow run, including its status, execution details, and task instances.
 */
export const getWorkflowRun: API.OperationMethod<
  GetWorkflowRunRequest,
  GetWorkflowRunResponse,
  GetWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WorkflowArn: 0, RunId: 0 },
    output: {
      RunDetail: {
        StartedOn: D.ts,
        CreatedAt: D.ts,
        CompletedOn: D.ts,
        ModifiedAt: D.ts,
      },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowRun",
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags that are associated with a specified Amazon Managed Workflows for Apache Airflow Serverless resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTaskInstancesError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all task instances for a specific workflow run, with optional pagination support.
 */
export const listTaskInstances: API.PaginatedOperationMethod<
  ListTaskInstancesRequest,
  ListTaskInstancesResponse,
  ListTaskInstancesError,
  Credentials | HttpClient.HttpClient,
  TaskInstanceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { WorkflowArn: 0, RunId: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTaskInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TaskInstances",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkflowRunsError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all runs for a specified workflow, with optional pagination and filtering support.
 */
export const listWorkflowRuns: API.PaginatedOperationMethod<
  ListWorkflowRunsRequest,
  ListWorkflowRunsResponse,
  ListWorkflowRunsError,
  Credentials | HttpClient.HttpClient,
  WorkflowRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0, WorkflowArn: 0, WorkflowVersion: 0 },
    output: {
      WorkflowRuns: D.list({
        RunDetailSummary: { CreatedOn: D.ts, StartedAt: D.ts, EndedAt: D.ts },
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflowRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WorkflowRuns",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkflowsError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all workflows in your account, with optional pagination support. This operation returns summary information for workflows, showing only the most recently created version of each workflow. Amazon Managed Workflows for Apache Airflow Serverless maintains workflow metadata in a highly available, distributed storage system that enables efficient querying and filtering. The service implements proper access controls to ensure you can only view workflows that you have permissions to access, supporting both individual and team-based workflow management scenarios.
 */
export const listWorkflows: API.PaginatedOperationMethod<
  ListWorkflowsRequest,
  ListWorkflowsResponse,
  ListWorkflowsError,
  Credentials | HttpClient.HttpClient,
  WorkflowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: { Workflows: D.list({ CreatedAt: D.ts, ModifiedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflows",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Workflows",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkflowVersionsError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all versions of a specified workflow, with optional pagination support.
 */
export const listWorkflowVersions: API.PaginatedOperationMethod<
  ListWorkflowVersionsRequest,
  ListWorkflowVersionsResponse,
  ListWorkflowVersionsError,
  Credentials | HttpClient.HttpClient,
  WorkflowVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0, WorkflowArn: 0 },
    output: { WorkflowVersions: D.list({ CreatedAt: D.ts, ModifiedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflowVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WorkflowVersions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartWorkflowRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OperationTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a new execution of a workflow. This operation creates a workflow run that executes the tasks that are defined in the workflow. Amazon Managed Workflows for Apache Airflow Serverless schedules the workflow execution across its managed Airflow environment, automatically scaling ECS worker tasks based on the workload. The service handles task isolation, dependency resolution, and provides comprehensive monitoring and logging throughout the execution lifecycle.
 */
export const startWorkflowRun: API.OperationMethod<
  StartWorkflowRunRequest,
  StartWorkflowRunResponse,
  StartWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WorkflowArn: 0,
      ClientToken: D.m({ idempotency: true }),
      OverrideParameters: 0,
      WorkflowVersion: 0,
    },
    output: { StartedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OperationTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartWorkflowRun",
})) as any;

export type StopWorkflowRunError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a running workflow execution. This operation terminates all running tasks and prevents new tasks from starting. Amazon Managed Workflows for Apache Airflow Serverless gracefully shuts down the workflow execution by stopping task scheduling and terminating active ECS worker containers. The operation transitions the workflow run to a `STOPPING` state and then to `STOPPED` once all cleanup is complete. In-flight tasks may complete or be terminated depending on their current execution state.
 */
export const stopWorkflowRun: API.OperationMethod<
  StopWorkflowRunRequest,
  StopWorkflowRunResponse,
  StopWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WorkflowArn: 0, RunId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopWorkflowRun",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | OperationTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags to an Amazon Managed Workflows for Apache Airflow Serverless resource. Tags are key-value pairs that help you organize and categorize your resources.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
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
  | OperationTimeoutException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from an Amazon Managed Workflows for Apache Airflow Serverless resource. This operation removes the specified tags from the resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    OperationTimeoutException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateWorkflowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OperationTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing workflow with new configuration settings. This operation allows you to modify the workflow definition, role, and other settings. When you update a workflow, Amazon Managed Workflows for Apache Airflow Serverless automatically creates a new version with the updated configuration and disables scheduling on all previous versions to ensure only one version is actively scheduled at a time. The update operation maintains workflow history while providing a clean transition to the new configuration.
 */
export const updateWorkflow: API.OperationMethod<
  UpdateWorkflowRequest,
  UpdateWorkflowResponse,
  UpdateWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WorkflowArn: 0,
      DefinitionS3Location: i_DefinitionS3Location,
      Code: i_Code,
      RoleArn: 0,
      Description: 0,
      LoggingConfiguration: i_LoggingConfiguration,
      EngineVersion: 0,
      NetworkConfiguration: i_NetworkConfiguration,
      TriggerMode: 0,
    },
    output: { ModifiedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OperationTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkflow",
})) as any;

const i_Code: D.LazyStruct = () => ({
  S3Location: { Bucket: 0, ObjectKey: 0, VersionId: 0 },
});
const i_DefinitionS3Location: D.LazyStruct = () => ({
  Bucket: 0,
  ObjectKey: 0,
  VersionId: 0,
});
const i_LoggingConfiguration: D.LazyStruct = () => ({ LogGroupName: 0 });
const i_NetworkConfiguration: D.LazyStruct = () => ({
  SecurityGroupIds: 0,
  SubnetIds: 0,
});
