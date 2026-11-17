import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "MWAA Serverless",
  serviceShapeName: "AmazonMWAAServerless",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "airflow-serverless" });
const ver = /*@__PURE__*/ T.ServiceVersion("2024-07-26");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
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
  '{"url":"https://airflow-serverless.{R}.api.aws","properties":{},"headers":{}}',
  [
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "MWAAServerless",
  service: "MWAAServerless",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      RetryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class OperationTimeoutException
  extends /*@__PURE__*/ S.TaggedError<OperationTimeoutException>()(
    "OperationTimeoutException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(504),
  ).pipe(C.withTimeoutError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
      ServiceCode: S.String,
      QuotaCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ServiceCode: S.String,
      QuotaCode: S.String,
      RetryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      FieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(137, __c17, 1)).annotate({
          identifier: "ValidationExceptionFields",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ExpiresInSecondsInteger = number;
export type SessionDurationInSecondsInteger = number;
export interface CreateAirflowUiUrlRequest {
  ExpiresInSeconds?: number | undefined;
  SessionDurationInSeconds?: number | undefined;
}
export type AuthorizedUrlString = string | redacted.Redacted<string>;
export type SessionIdString = string | redacted.Redacted<string>;
export type TimestampValue = Date;
export interface CreateAirflowUiUrlResponse {
  AuthorizedUrl: string | redacted.Redacted<string>;
  SessionId: string | redacted.Redacted<string>;
  UrlExpiresAt: Date;
  SessionExpiresAt: Date;
}
export type NameString = string;
export type IdempotencyTokenString = string;
export interface DefinitionS3Location {
  Bucket: string;
  ObjectKey: string;
  VersionId?: string | undefined;
}
export interface S3Location {
  Bucket: string;
  ObjectKey: string;
  VersionId?: string | undefined;
}
export type Code = { S3Location: S3Location };
export type RoleARN = string;
export type DescriptionString = string;
export type EncryptionType = "AWS_MANAGED_KEY" | "CUSTOMER_MANAGED_KEY" | (string & {});
export interface EncryptionConfiguration {
  Type: EncryptionType;
  KmsKeyId?: string | undefined;
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
  SecurityGroupIds?: string[] | undefined;
  SubnetIds?: string[] | undefined;
}
export type EnvironmentVariableKey = string;
export type EnvironmentVariableValue = string | redacted.Redacted<string>;
export type EnvironmentVariablesMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export interface Environment {
  Variables?: { [key: string]: string | redacted.Redacted<string> | undefined } | undefined;
}
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export interface CreateWorkflowRequest {
  Name: string;
  ClientToken?: string | undefined;
  DefinitionS3Location: DefinitionS3Location;
  Code?: Code | undefined;
  RoleArn: string;
  Description?: string | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  LoggingConfiguration?: LoggingConfiguration | undefined;
  EngineVersion?: EngineVersion | undefined;
  NetworkConfiguration?: NetworkConfiguration | undefined;
  Environment?: Environment | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  TriggerMode?: string | undefined;
}
export type WorkflowArn = string;
export type WorkflowStatus = "READY" | "DELETING" | (string & {});
export type WorkflowVersion = string;
export type IsLatestVersion = boolean;
export type WarningMessages = string[];
export interface CreateWorkflowResponse {
  WorkflowArn: string;
  CreatedAt?: Date | undefined;
  RevisionId?: string | undefined;
  WorkflowStatus?: WorkflowStatus | undefined;
  WorkflowVersion?: string | undefined;
  IsLatestVersion?: boolean | undefined;
  Warnings?: string[] | undefined;
}
export interface DeleteWorkflowRequest {
  WorkflowArn: string;
  WorkflowVersion?: string | undefined;
}
export interface DeleteWorkflowResponse {
  WorkflowArn: string;
  WorkflowVersion?: string | undefined;
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
  WorkflowVersion?: string | undefined;
  Status?: TaskInstanceStatus | undefined;
  DurationInSeconds?: number | undefined;
  OperatorName?: string | undefined;
  ModifiedAt?: Date | undefined;
  EndedAt?: Date | undefined;
  StartedAt?: Date | undefined;
  AttemptNumber?: number | undefined;
  ErrorMessage?: string | undefined;
  TaskId?: string | undefined;
  LogStream?: string | undefined;
  Xcom?: { [key: string]: string | undefined } | undefined;
}
export interface GetWorkflowRequest {
  WorkflowArn: string;
  WorkflowVersion?: string | undefined;
}
export interface ScheduleConfiguration {
  CronExpression?: string | undefined;
}
export interface GetWorkflowResponse {
  WorkflowArn: string;
  WorkflowVersion?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  CreatedAt?: Date | undefined;
  ModifiedAt?: Date | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  LoggingConfiguration?: LoggingConfiguration | undefined;
  EngineVersion?: EngineVersion | undefined;
  WorkflowStatus?: WorkflowStatus | undefined;
  DefinitionS3Location?: DefinitionS3Location | undefined;
  Code?: Code | undefined;
  CodeSnapshottedAt?: Date | undefined;
  ScheduleConfiguration?: ScheduleConfiguration | undefined;
  RoleArn?: string | undefined;
  NetworkConfiguration?: NetworkConfiguration | undefined;
  Environment?: Environment | undefined;
  TriggerMode?: string | undefined;
  WorkflowDefinition?: string | undefined;
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
  WorkflowArn?: string | undefined;
  WorkflowVersion?: string | undefined;
  RunId?: string | undefined;
  RunType?: RunType | undefined;
  StartedOn?: Date | undefined;
  CreatedAt?: Date | undefined;
  CompletedOn?: Date | undefined;
  ModifiedAt?: Date | undefined;
  Duration?: number | undefined;
  ErrorMessage?: string | undefined;
  TaskInstances?: string[] | undefined;
  RunState?: WorkflowRunStatus | undefined;
}
export interface GetWorkflowRunResponse {
  WorkflowArn?: string | undefined;
  WorkflowVersion?: string | undefined;
  RunId?: string | undefined;
  RunType?: RunType | undefined;
  OverrideParameters?: { [key: string]: any | undefined } | undefined;
  RunDetail?: WorkflowRunDetail | undefined;
}
export type TaggableResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface ListTaskInstancesRequest {
  WorkflowArn: string;
  RunId: string;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface TaskInstanceSummary {
  WorkflowArn?: string | undefined;
  WorkflowVersion?: string | undefined;
  RunId?: string | undefined;
  TaskInstanceId?: string | undefined;
  Status?: TaskInstanceStatus | undefined;
  DurationInSeconds?: number | undefined;
  OperatorName?: string | undefined;
}
export type TaskInstanceSummaries = TaskInstanceSummary[];
export interface ListTaskInstancesResponse {
  TaskInstances?: TaskInstanceSummary[] | undefined;
  NextToken?: string | undefined;
}
export interface ListWorkflowRunsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  WorkflowArn: string;
  WorkflowVersion?: string | undefined;
}
export interface RunDetailSummary {
  Status?: WorkflowRunStatus | undefined;
  CreatedOn?: Date | undefined;
  StartedAt?: Date | undefined;
  EndedAt?: Date | undefined;
}
export interface WorkflowRunSummary {
  RunId?: string | undefined;
  WorkflowArn?: string | undefined;
  WorkflowVersion?: string | undefined;
  RunType?: RunType | undefined;
  RunDetailSummary?: RunDetailSummary | undefined;
}
export type WorkflowRunSummaries = WorkflowRunSummary[];
export interface ListWorkflowRunsResponse {
  WorkflowRuns?: WorkflowRunSummary[] | undefined;
  NextToken?: string | undefined;
}
export interface ListWorkflowsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface WorkflowSummary {
  WorkflowArn: string;
  WorkflowVersion?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  CreatedAt?: Date | undefined;
  ModifiedAt?: Date | undefined;
  WorkflowStatus?: WorkflowStatus | undefined;
  TriggerMode?: string | undefined;
}
export type WorkflowSummaries = WorkflowSummary[];
export interface ListWorkflowsResponse {
  Workflows: WorkflowSummary[];
  NextToken?: string | undefined;
}
export interface ListWorkflowVersionsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  WorkflowArn: string;
}
export interface WorkflowVersionSummary {
  WorkflowVersion: string;
  WorkflowArn: string;
  IsLatestVersion?: boolean | undefined;
  CreatedAt?: Date | undefined;
  ModifiedAt?: Date | undefined;
  DefinitionS3Location?: DefinitionS3Location | undefined;
  ScheduleConfiguration?: ScheduleConfiguration | undefined;
  TriggerMode?: string | undefined;
}
export type WorkflowVersionSummaries = WorkflowVersionSummary[];
export interface ListWorkflowVersionsResponse {
  WorkflowVersions?: WorkflowVersionSummary[] | undefined;
  NextToken?: string | undefined;
}
export interface StartWorkflowRunRequest {
  WorkflowArn: string;
  ClientToken?: string | undefined;
  OverrideParameters?: { [key: string]: any | undefined } | undefined;
  WorkflowVersion?: string | undefined;
}
export interface StartWorkflowRunResponse {
  RunId?: string | undefined;
  Status?: WorkflowRunStatus | undefined;
  StartedAt?: Date | undefined;
}
export interface StopWorkflowRunRequest {
  WorkflowArn: string;
  RunId: string;
}
export interface StopWorkflowRunResponse {
  WorkflowArn?: string | undefined;
  WorkflowVersion?: string | undefined;
  RunId?: string | undefined;
  Status?: WorkflowRunStatus | undefined;
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
  Code?: Code | undefined;
  RoleArn: string;
  Description?: string | undefined;
  LoggingConfiguration?: LoggingConfiguration | undefined;
  EngineVersion?: EngineVersion | undefined;
  NetworkConfiguration?: NetworkConfiguration | undefined;
  Environment?: Environment | undefined;
  TriggerMode?: string | undefined;
}
export interface UpdateWorkflowResponse {
  WorkflowArn: string;
  ModifiedAt?: Date | undefined;
  WorkflowVersion?: string | undefined;
  Warnings?: string[] | undefined;
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
export type CreateAirflowUiUrlError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | OperationTimeoutException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a launch URL that opens the Apache Airflow UI for your workflows in Amazon Managed Workflows for Apache Airflow Serverless. The UI shows the workflows in your account in the current AWS Region. To start a UI session, open the URL in a browser before it expires.
 *
 * The UI runs with the permissions of the IAM identity that you use to call this operation. You see only the workflows, workflow runs, and logs that the identity can read, and you can start a workflow run only if the identity has permission to start one.
 *
 * The UI session uses the caller's permissions. The session works only from the network address that opened the URL. It ends at `SessionExpiresAt` or when you sign out from the UI.
 */
export const createAirflowUiUrl: API.OperationMethod<
  CreateAirflowUiUrlRequest & RegionInput,
  CreateAirflowUiUrlResponse,
  CreateAirflowUiUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<CreateAirflowUiUrlRequest>,
  output: __S(145, __c18, 1) as any as S.Schema<CreateAirflowUiUrlResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    OperationTimeoutException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAirflowUiUrl",
  telemetry: TELEMETRY,
  span: "CreateAirflowUiUrl",
}));

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
  CreateWorkflowRequest & RegionInput,
  CreateWorkflowResponse,
  CreateWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<CreateWorkflowRequest>,
  output: __S(153, __c19, 1) as any as S.Schema<CreateWorkflowResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateWorkflow",
}));

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
  DeleteWorkflowRequest & RegionInput,
  DeleteWorkflowResponse,
  DeleteWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DeleteWorkflowRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<DeleteWorkflowResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteWorkflow",
}));

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
  GetTaskInstanceRequest & RegionInput,
  GetTaskInstanceResponse,
  GetTaskInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c1, 0) as any as S.Schema<GetTaskInstanceRequest>,
  output: __S(9, __c1, 1) as any as S.Schema<GetTaskInstanceResponse>,
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
  telemetry: TELEMETRY,
  span: "GetTaskInstance",
}));

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
  GetWorkflowRequest & RegionInput,
  GetWorkflowResponse,
  GetWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<GetWorkflowRequest>,
  output: __S(17, __c2, 1) as any as S.Schema<GetWorkflowResponse>,
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
  telemetry: TELEMETRY,
  span: "GetWorkflow",
}));

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
  GetWorkflowRunRequest & RegionInput,
  GetWorkflowRunResponse,
  GetWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<GetWorkflowRunRequest>,
  output: __S(34, __c4, 2) as any as S.Schema<GetWorkflowRunResponse>,
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
  telemetry: TELEMETRY,
  span: "GetWorkflowRun",
}));

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
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(49, __c6, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

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
  ListTaskInstancesRequest & RegionInput,
  ListTaskInstancesResponse,
  ListTaskInstancesError,
  Credentials | HttpClient.HttpClient,
  TaskInstanceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<ListTaskInstancesRequest>,
  output: __S(59, __c7, 3) as any as S.Schema<ListTaskInstancesResponse>,
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
  telemetry: TELEMETRY,
  span: "ListTaskInstances",
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
  ListWorkflowRunsRequest & RegionInput,
  ListWorkflowRunsResponse,
  ListWorkflowRunsError,
  Credentials | HttpClient.HttpClient,
  WorkflowRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<ListWorkflowRunsRequest>,
  output: __S(68, __c8, 4) as any as S.Schema<ListWorkflowRunsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListWorkflowRuns",
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
  ListWorkflowsRequest & RegionInput,
  ListWorkflowsResponse,
  ListWorkflowsError,
  Credentials | HttpClient.HttpClient,
  WorkflowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<ListWorkflowsRequest>,
  output: __S(75, __c9, 3) as any as S.Schema<ListWorkflowsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListWorkflows",
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
  ListWorkflowVersionsRequest & RegionInput,
  ListWorkflowVersionsResponse,
  ListWorkflowVersionsError,
  Credentials | HttpClient.HttpClient,
  WorkflowVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<ListWorkflowVersionsRequest>,
  output: __S(83, __c10, 3) as any as S.Schema<ListWorkflowVersionsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListWorkflowVersions",
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
  StartWorkflowRunRequest & RegionInput,
  StartWorkflowRunResponse,
  StartWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<StartWorkflowRunRequest>,
  output: __S(89, __c11, 1) as any as S.Schema<StartWorkflowRunResponse>,
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
  telemetry: TELEMETRY,
  span: "StartWorkflowRun",
}));

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
  StopWorkflowRunRequest & RegionInput,
  StopWorkflowRunResponse,
  StopWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<StopWorkflowRunRequest>,
  output: __S(97, __c12, 1) as any as S.Schema<StopWorkflowRunResponse>,
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
  telemetry: TELEMETRY,
  span: "StopWorkflowRun",
}));

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
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<TagResourceResponse>,
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
  telemetry: TELEMETRY,
  span: "TagResource",
}));

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
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<UntagResourceResponse>,
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
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

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
  UpdateWorkflowRequest & RegionInput,
  UpdateWorkflowResponse,
  UpdateWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<UpdateWorkflowRequest>,
  output: __S(129, __c16, 1) as any as S.Schema<UpdateWorkflowResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateWorkflow",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WorkflowArn: S.String.pipe(T.HttpLabel("WorkflowArn")),
          WorkflowVersion: S.optional(S.String).pipe(T.HttpQuery("workflowVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/workflows/{WorkflowArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWorkflowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ WorkflowArn: S.String, WorkflowVersion: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteWorkflowResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WorkflowArn: S.String.pipe(T.HttpLabel("WorkflowArn")),
          TaskInstanceId: S.String.pipe(T.HttpLabel("TaskInstanceId")),
          RunId: S.String.pipe(T.HttpLabel("RunId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/workflows/{WorkflowArn}/runs/{RunId}/tasks/{TaskInstanceId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTaskInstanceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WorkflowArn: S.String,
          RunId: S.String,
          TaskInstanceId: S.String,
          WorkflowVersion: S.optional(S.String),
          Status: S.optional(S.String),
          DurationInSeconds: S.optional(S.Number),
          OperatorName: S.optional(S.String),
          ModifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          StartedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          AttemptNumber: S.optional(S.Number),
          ErrorMessage: S.optional(S.String),
          TaskId: S.optional(S.String),
          LogStream: S.optional(S.String),
          Xcom: S.optional(__S(160, __c20, 0)),
        }),
      ).annotate({ identifier: "GetTaskInstanceResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WorkflowArn: S.String.pipe(T.HttpLabel("WorkflowArn")),
          WorkflowVersion: S.optional(S.String).pipe(T.HttpQuery("workflowVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workflows/{WorkflowArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWorkflowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WorkflowArn: S.String,
          WorkflowVersion: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ModifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EncryptionConfiguration: S.optional(__S(168, __c21, 0)),
          LoggingConfiguration: S.optional(__S(193, __c24, 1)),
          EngineVersion: S.optional(S.Number),
          WorkflowStatus: S.optional(S.String),
          DefinitionS3Location: S.optional(__S(184, __c23, 0)),
          Code: S.optional(__S(192, __c24, 0)),
          CodeSnapshottedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ScheduleConfiguration: S.optional(__S(24, __c3, 0)),
          RoleArn: S.optional(S.String),
          NetworkConfiguration: S.optional(__S(194, __c24, 2)),
          Environment: S.optional(__S(196, __c24, 4)),
          TriggerMode: S.optional(S.String),
          WorkflowDefinition: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetWorkflowResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ CronExpression: S.optional(S.String) })).annotate({
        identifier: "ScheduleConfiguration",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WorkflowArn: S.String.pipe(T.HttpLabel("WorkflowArn")),
          RunId: S.String.pipe(T.HttpLabel("RunId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workflows/{WorkflowArn}/runs/{RunId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWorkflowRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WorkflowArn: S.optional(S.String),
          WorkflowVersion: S.optional(S.String),
          RunId: S.optional(S.String),
          RunType: S.optional(S.String),
          StartedOn: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          CompletedOn: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ModifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Duration: S.optional(S.Number),
          ErrorMessage: S.optional(S.String),
          TaskInstances: S.optional(__S(176, __c22, 0)),
          RunState: S.optional(S.String),
        }),
      ).annotate({ identifier: "WorkflowRunDetail" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          WorkflowArn: S.optional(S.String),
          WorkflowVersion: S.optional(S.String),
          RunId: S.optional(S.String),
          RunType: S.optional(S.String),
          OverrideParameters: S.optional(__S(40, __c5, 0)),
          RunDetail: S.optional(__S(33, __c4, 1)),
        }),
      ).annotate({ identifier: "GetWorkflowRunResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Any.pipe(S.optional));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(160, __c20, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WorkflowArn: S.String.pipe(T.HttpLabel("WorkflowArn")),
          RunId: S.String.pipe(T.HttpLabel("RunId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workflows/{WorkflowArn}/runs/{RunId}/tasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTaskInstancesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WorkflowArn: S.optional(S.String),
          WorkflowVersion: S.optional(S.String),
          RunId: S.optional(S.String),
          TaskInstanceId: S.optional(S.String),
          Status: S.optional(S.String),
          DurationInSeconds: S.optional(S.Number),
          OperatorName: S.optional(S.String),
        }),
      ).annotate({ identifier: "TaskInstanceSummary" });
    case 2:
      return S.Array(__S(57, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ TaskInstances: S.optional(__S(58, __c7, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTaskInstancesResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          WorkflowArn: S.String.pipe(T.HttpLabel("WorkflowArn")),
          WorkflowVersion: S.optional(S.String).pipe(T.HttpQuery("workflowVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workflows/{WorkflowArn}/runs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWorkflowRunsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          CreatedOn: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          StartedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "RunDetailSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          RunId: S.optional(S.String),
          WorkflowArn: S.optional(S.String),
          WorkflowVersion: S.optional(S.String),
          RunType: S.optional(S.String),
          RunDetailSummary: S.optional(__S(65, __c8, 1)),
        }),
      ).annotate({ identifier: "WorkflowRunSummary" });
    case 3:
      return S.Array(__S(66, __c8, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ WorkflowRuns: S.optional(__S(67, __c8, 3)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWorkflowRunsResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/workflows" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListWorkflowsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WorkflowArn: S.String,
          WorkflowVersion: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ModifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          WorkflowStatus: S.optional(S.String),
          TriggerMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "WorkflowSummary" });
    case 2:
      return S.Array(__S(73, __c9, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Workflows: __S(74, __c9, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWorkflowsResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          WorkflowArn: S.String.pipe(T.HttpLabel("WorkflowArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workflows/{WorkflowArn}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListWorkflowVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WorkflowVersion: S.String,
          WorkflowArn: S.String,
          IsLatestVersion: S.optional(S.Boolean),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ModifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DefinitionS3Location: S.optional(__S(184, __c23, 0)),
          ScheduleConfiguration: S.optional(__S(24, __c3, 0)),
          TriggerMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "WorkflowVersionSummary" });
    case 2:
      return S.Array(__S(81, __c10, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          WorkflowVersions: S.optional(__S(82, __c10, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListWorkflowVersionsResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WorkflowArn: S.String.pipe(T.HttpLabel("WorkflowArn")),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          OverrideParameters: S.optional(__S(40, __c5, 0)),
          WorkflowVersion: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workflows/{WorkflowArn}/runs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartWorkflowRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RunId: S.optional(S.String),
          Status: S.optional(S.String),
          StartedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "StartWorkflowRunResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WorkflowArn: S.String.pipe(T.HttpLabel("WorkflowArn")),
          RunId: S.String.pipe(T.HttpLabel("RunId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/workflows/{WorkflowArn}/runs/{RunId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopWorkflowRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WorkflowArn: S.optional(S.String),
          WorkflowVersion: S.optional(S.String),
          RunId: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "StopWorkflowRunResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(160, __c20, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(176, __c22, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WorkflowArn: S.String.pipe(T.HttpLabel("WorkflowArn")),
          DefinitionS3Location: __S(184, __c23, 0),
          Code: S.optional(__S(192, __c24, 0)),
          RoleArn: S.String,
          Description: S.optional(S.String),
          LoggingConfiguration: S.optional(__S(193, __c24, 1)),
          EngineVersion: S.optional(S.Number),
          NetworkConfiguration: S.optional(__S(194, __c24, 2)),
          Environment: S.optional(__S(196, __c24, 4)),
          TriggerMode: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/workflows/{WorkflowArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWorkflowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WorkflowArn: S.String,
          ModifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          WorkflowVersion: S.optional(S.String),
          Warnings: S.optional(__S(176, __c22, 0)),
        }),
      ).annotate({ identifier: "UpdateWorkflowResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(136, __c17, 0));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ExpiresInSeconds: S.optional(S.Number),
          SessionDurationInSeconds: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/airflow-ui-url" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAirflowUiUrlRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AuthorizedUrl: SensitiveString,
          SessionId: SensitiveString,
          UrlExpiresAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          SessionExpiresAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateAirflowUiUrlResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          DefinitionS3Location: __S(184, __c23, 0),
          Code: S.optional(__S(192, __c24, 0)),
          RoleArn: S.String,
          Description: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(168, __c21, 0)),
          LoggingConfiguration: S.optional(__S(193, __c24, 1)),
          EngineVersion: S.optional(S.Number),
          NetworkConfiguration: S.optional(__S(194, __c24, 2)),
          Environment: S.optional(__S(196, __c24, 4)),
          Tags: S.optional(__S(160, __c20, 0)),
          TriggerMode: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/workflows" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateWorkflowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WorkflowArn: S.String,
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          RevisionId: S.optional(S.String),
          WorkflowStatus: S.optional(S.String),
          WorkflowVersion: S.optional(S.String),
          IsLatestVersion: S.optional(S.Boolean),
          Warnings: S.optional(__S(176, __c22, 0)),
        }),
      ).annotate({ identifier: "CreateWorkflowResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Type: S.String, KmsKeyId: S.optional(S.String) })).annotate(
        { identifier: "EncryptionConfiguration" },
      );
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Bucket: S.String, ObjectKey: S.String, VersionId: S.optional(S.String) }),
      ).annotate({ identifier: "DefinitionS3Location" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ S3Location: __S(184, __c23, 0) })]);
    case 1:
      return S.suspend(() => S.Struct({ LogGroupName: S.String })).annotate({
        identifier: "LoggingConfiguration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          SecurityGroupIds: S.optional(__S(176, __c22, 0)),
          SubnetIds: S.optional(__S(176, __c22, 0)),
        }),
      ).annotate({ identifier: "NetworkConfiguration" });
    case 3:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
    case 4:
      return S.suspend(() => S.Struct({ Variables: S.optional(__S(195, __c24, 3)) })).annotate({
        identifier: "Environment",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
