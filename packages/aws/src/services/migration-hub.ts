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
  sdkId: "Migration Hub",
  serviceShapeName: "AWSMigrationHub",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "mgh" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-05-31");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
              `https://mgh-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://mgh-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://mgh.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://mgh.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://mgh.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()("AccessDeniedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAuthError) {}
export class DryRunOperation
  extends /*@__PURE__*/ S.TaggedError<DryRunOperation>()("DryRunOperation", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class HomeRegionNotSetException
  extends /*@__PURE__*/ S.TaggedError<HomeRegionNotSetException>()("HomeRegionNotSetException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()("InternalServerError", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()("InvalidInputException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class PolicyErrorException
  extends /*@__PURE__*/ S.TaggedError<PolicyErrorException>()("PolicyErrorException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      RetryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedOperation
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedOperation>()("UnauthorizedOperation", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAuthError) {}
export type ProgressUpdateStream = string;
export type MigrationTaskName = string;
export type CreatedArtifactName = string;
export type CreatedArtifactDescription = string;
export interface CreatedArtifact {
  Name: string;
  Description?: string;
}
export type DryRun = boolean;
export interface AssociateCreatedArtifactRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  CreatedArtifact: CreatedArtifact;
  DryRun?: boolean;
}
export interface AssociateCreatedArtifactResult {}
export type ConfigurationId = string;
export type DiscoveredResourceDescription = string;
export interface DiscoveredResource {
  ConfigurationId: string;
  Description?: string;
}
export interface AssociateDiscoveredResourceRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  DiscoveredResource: DiscoveredResource;
  DryRun?: boolean;
}
export interface AssociateDiscoveredResourceResult {}
export type SourceResourceName = string;
export type SourceResourceDescription = string;
export type StatusDetail = string;
export interface SourceResource {
  Name: string;
  Description?: string;
  StatusDetail?: string;
}
export interface AssociateSourceResourceRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  SourceResource: SourceResource;
  DryRun?: boolean;
}
export interface AssociateSourceResourceResult {}
export interface CreateProgressUpdateStreamRequest {
  ProgressUpdateStreamName: string;
  DryRun?: boolean;
}
export interface CreateProgressUpdateStreamResult {}
export interface DeleteProgressUpdateStreamRequest {
  ProgressUpdateStreamName: string;
  DryRun?: boolean;
}
export interface DeleteProgressUpdateStreamResult {}
export type ApplicationId = string;
export interface DescribeApplicationStateRequest {
  ApplicationId: string;
}
export type ApplicationStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | (string & {});
export type UpdateDateTime = Date;
export interface DescribeApplicationStateResult {
  ApplicationStatus?: ApplicationStatus;
  LastUpdatedTime?: Date;
}
export interface DescribeMigrationTaskRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
}
export type Status = "NOT_STARTED" | "IN_PROGRESS" | "FAILED" | "COMPLETED" | (string & {});
export type ProgressPercent = number;
export interface Task {
  Status: Status;
  StatusDetail?: string;
  ProgressPercent?: number;
}
export type ResourceAttributeType =
  | "IPV4_ADDRESS"
  | "IPV6_ADDRESS"
  | "MAC_ADDRESS"
  | "FQDN"
  | "VM_MANAGER_ID"
  | "VM_MANAGED_OBJECT_REFERENCE"
  | "VM_NAME"
  | "VM_PATH"
  | "BIOS_ID"
  | "MOTHERBOARD_SERIAL_NUMBER"
  | (string & {});
export type ResourceAttributeValue = string;
export interface ResourceAttribute {
  Type: ResourceAttributeType;
  Value: string;
}
export type LatestResourceAttributeList = ResourceAttribute[];
export interface MigrationTask {
  ProgressUpdateStream?: string;
  MigrationTaskName?: string;
  Task?: Task;
  UpdateDateTime?: Date;
  ResourceAttributeList?: ResourceAttribute[];
}
export interface DescribeMigrationTaskResult {
  MigrationTask?: MigrationTask;
}
export interface DisassociateCreatedArtifactRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  CreatedArtifactName: string;
  DryRun?: boolean;
}
export interface DisassociateCreatedArtifactResult {}
export interface DisassociateDiscoveredResourceRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  ConfigurationId: string;
  DryRun?: boolean;
}
export interface DisassociateDiscoveredResourceResult {}
export interface DisassociateSourceResourceRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  SourceResourceName: string;
  DryRun?: boolean;
}
export interface DisassociateSourceResourceResult {}
export interface ImportMigrationTaskRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  DryRun?: boolean;
}
export interface ImportMigrationTaskResult {}
export type ApplicationIds = string[];
export type Token = string;
export type MaxResults = number;
export interface ListApplicationStatesRequest {
  ApplicationIds?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export interface ApplicationState {
  ApplicationId?: string;
  ApplicationStatus?: ApplicationStatus;
  LastUpdatedTime?: Date;
}
export type ApplicationStateList = ApplicationState[];
export interface ListApplicationStatesResult {
  ApplicationStateList?: ApplicationState[];
  NextToken?: string;
}
export type MaxResultsCreatedArtifacts = number;
export interface ListCreatedArtifactsRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  NextToken?: string;
  MaxResults?: number;
}
export type CreatedArtifactList = CreatedArtifact[];
export interface ListCreatedArtifactsResult {
  NextToken?: string;
  CreatedArtifactList?: CreatedArtifact[];
}
export type MaxResultsResources = number;
export interface ListDiscoveredResourcesRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  NextToken?: string;
  MaxResults?: number;
}
export type DiscoveredResourceList = DiscoveredResource[];
export interface ListDiscoveredResourcesResult {
  NextToken?: string;
  DiscoveredResourceList?: DiscoveredResource[];
}
export type ResourceName = string;
export interface ListMigrationTasksRequest {
  NextToken?: string;
  MaxResults?: number;
  ResourceName?: string;
}
export interface MigrationTaskSummary {
  ProgressUpdateStream?: string;
  MigrationTaskName?: string;
  Status?: Status;
  ProgressPercent?: number;
  StatusDetail?: string;
  UpdateDateTime?: Date;
}
export type MigrationTaskSummaryList = MigrationTaskSummary[];
export interface ListMigrationTasksResult {
  NextToken?: string;
  MigrationTaskSummaryList?: MigrationTaskSummary[];
}
export interface ListMigrationTaskUpdatesRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  NextToken?: string;
  MaxResults?: number;
}
export type UpdateType = "MIGRATION_TASK_STATE_UPDATED" | (string & {});
export interface MigrationTaskUpdate {
  UpdateDateTime?: Date;
  UpdateType?: UpdateType;
  MigrationTaskState?: Task;
}
export type MigrationTaskUpdateList = MigrationTaskUpdate[];
export interface ListMigrationTaskUpdatesResult {
  NextToken?: string;
  MigrationTaskUpdateList?: MigrationTaskUpdate[];
}
export interface ListProgressUpdateStreamsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface ProgressUpdateStreamSummary {
  ProgressUpdateStreamName?: string;
}
export type ProgressUpdateStreamSummaryList = ProgressUpdateStreamSummary[];
export interface ListProgressUpdateStreamsResult {
  ProgressUpdateStreamSummaryList?: ProgressUpdateStreamSummary[];
  NextToken?: string;
}
export type MaxResultsSourceResources = number;
export interface ListSourceResourcesRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  NextToken?: string;
  MaxResults?: number;
}
export type SourceResourceList = SourceResource[];
export interface ListSourceResourcesResult {
  NextToken?: string;
  SourceResourceList?: SourceResource[];
}
export interface NotifyApplicationStateRequest {
  ApplicationId: string;
  Status: ApplicationStatus;
  UpdateDateTime?: Date;
  DryRun?: boolean;
}
export interface NotifyApplicationStateResult {}
export type NextUpdateSeconds = number;
export interface NotifyMigrationTaskStateRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  Task: Task;
  UpdateDateTime: Date;
  NextUpdateSeconds: number;
  DryRun?: boolean;
}
export interface NotifyMigrationTaskStateResult {}
export type ResourceAttributeList = ResourceAttribute[];
export interface PutResourceAttributesRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
  ResourceAttributeList: ResourceAttribute[];
  DryRun?: boolean;
}
export interface PutResourceAttributesResult {}
export type ErrorMessage = string;
export type RetryAfterSeconds = number;
export type AssociateCreatedArtifactError =
  | AccessDeniedException
  | DryRunOperation
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Associates a created artifact of an AWS cloud resource, the target receiving the
 * migration, with the migration task performed by a migration tool. This API has the
 * following traits:
 *
 * - Migration tools can call the `AssociateCreatedArtifact` operation to
 * indicate which AWS artifact is associated with a migration task.
 *
 * - The created artifact name must be provided in ARN (Amazon Resource Name) format
 * which will contain information about type and region; for example:
 * `arn:aws:ec2:us-east-1:488216288981:image/ami-6d0ba87b`.
 *
 * - Examples of the AWS resource behind the created artifact are, AMI's, EC2 instance,
 * or DMS endpoint, etc.
 */
export const associateCreatedArtifact: API.OperationMethod<
  AssociateCreatedArtifactRequest,
  AssociateCreatedArtifactResult,
  AssociateCreatedArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<AssociateCreatedArtifactRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<AssociateCreatedArtifactResult>,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateCreatedArtifact",
}));

export type AssociateDiscoveredResourceError =
  | AccessDeniedException
  | DryRunOperation
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | PolicyErrorException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Associates a discovered resource ID from Application Discovery Service with a migration
 * task.
 */
export const associateDiscoveredResource: API.OperationMethod<
  AssociateDiscoveredResourceRequest,
  AssociateDiscoveredResourceResult,
  AssociateDiscoveredResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<AssociateDiscoveredResourceRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<AssociateDiscoveredResourceResult>,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    PolicyErrorException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateDiscoveredResource",
}));

export type AssociateSourceResourceError =
  | AccessDeniedException
  | DryRunOperation
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Associates a source resource with a migration task. For example, the source resource can
 * be a source server, an application, or a migration wave.
 */
export const associateSourceResource: API.OperationMethod<
  AssociateSourceResourceRequest,
  AssociateSourceResourceResult,
  AssociateSourceResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<AssociateSourceResourceRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<AssociateSourceResourceResult>,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSourceResource",
}));

export type CreateProgressUpdateStreamError =
  | AccessDeniedException
  | DryRunOperation
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Creates a progress update stream which is an AWS resource used for access control as
 * well as a namespace for migration task names that is implicitly linked to your AWS account.
 * It must uniquely identify the migration tool as it is used for all updates made by the
 * tool; however, it does not need to be unique for each AWS account because it is scoped to
 * the AWS account.
 */
export const createProgressUpdateStream: API.OperationMethod<
  CreateProgressUpdateStreamRequest,
  CreateProgressUpdateStreamResult,
  CreateProgressUpdateStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<CreateProgressUpdateStreamRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<CreateProgressUpdateStreamResult>,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProgressUpdateStream",
}));

export type DeleteProgressUpdateStreamError =
  | AccessDeniedException
  | DryRunOperation
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Deletes a progress update stream, including all of its tasks, which was previously
 * created as an AWS resource used for access control. This API has the following
 * traits:
 *
 * - The only parameter needed for `DeleteProgressUpdateStream` is the
 * stream name (same as a `CreateProgressUpdateStream` call).
 *
 * - The call will return, and a background process will asynchronously delete the
 * stream and all of its resources (tasks, associated resources, resource attributes,
 * created artifacts).
 *
 * - If the stream takes time to be deleted, it might still show up on a
 * `ListProgressUpdateStreams` call.
 *
 * - `CreateProgressUpdateStream`, `ImportMigrationTask`,
 * `NotifyMigrationTaskState`, and all Associate[*] APIs related to the
 * tasks belonging to the stream will throw "InvalidInputException" if the stream of the
 * same name is in the process of being deleted.
 *
 * - Once the stream and all of its resources are deleted,
 * `CreateProgressUpdateStream` for a stream of the same name will
 * succeed, and that stream will be an entirely new logical resource (without any
 * resources associated with the old stream).
 */
export const deleteProgressUpdateStream: API.OperationMethod<
  DeleteProgressUpdateStreamRequest,
  DeleteProgressUpdateStreamResult,
  DeleteProgressUpdateStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<DeleteProgressUpdateStreamRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteProgressUpdateStreamResult>,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProgressUpdateStream",
}));

export type DescribeApplicationStateError =
  | AccessDeniedException
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | PolicyErrorException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the migration status of an application.
 */
export const describeApplicationState: API.OperationMethod<
  DescribeApplicationStateRequest,
  DescribeApplicationStateResult,
  DescribeApplicationStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<DescribeApplicationStateRequest>,
  output: __S(73, __c9, 1) as any as S.Schema<DescribeApplicationStateResult>,
  errors: [
    AccessDeniedException,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    PolicyErrorException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationState",
}));

export type DescribeMigrationTaskError =
  | AccessDeniedException
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a list of all attributes associated with a specific migration task.
 */
export const describeMigrationTask: API.OperationMethod<
  DescribeMigrationTaskRequest,
  DescribeMigrationTaskResult,
  DescribeMigrationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<DescribeMigrationTaskRequest>,
  output: __S(82, __c10, 2) as any as S.Schema<DescribeMigrationTaskResult>,
  errors: [
    AccessDeniedException,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMigrationTask",
}));

export type DisassociateCreatedArtifactError =
  | AccessDeniedException
  | DryRunOperation
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Disassociates a created artifact of an AWS resource with a migration task performed by a
 * migration tool that was previously associated. This API has the following traits:
 *
 * - A migration user can call the `DisassociateCreatedArtifacts` operation
 * to disassociate a created AWS Artifact from a migration task.
 *
 * - The created artifact name must be provided in ARN (Amazon Resource Name) format
 * which will contain information about type and region; for example:
 * `arn:aws:ec2:us-east-1:488216288981:image/ami-6d0ba87b`.
 *
 * - Examples of the AWS resource behind the created artifact are, AMI's, EC2 instance,
 * or RDS instance, etc.
 */
export const disassociateCreatedArtifact: API.OperationMethod<
  DisassociateCreatedArtifactRequest,
  DisassociateCreatedArtifactResult,
  DisassociateCreatedArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<DisassociateCreatedArtifactRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DisassociateCreatedArtifactResult>,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateCreatedArtifact",
}));

export type DisassociateDiscoveredResourceError =
  | AccessDeniedException
  | DryRunOperation
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Disassociate an Application Discovery Service discovered resource from a migration
 * task.
 */
export const disassociateDiscoveredResource: API.OperationMethod<
  DisassociateDiscoveredResourceRequest,
  DisassociateDiscoveredResourceResult,
  DisassociateDiscoveredResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<DisassociateDiscoveredResourceRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DisassociateDiscoveredResourceResult>,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateDiscoveredResource",
}));

export type DisassociateSourceResourceError =
  | AccessDeniedException
  | DryRunOperation
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Removes the association between a source resource and a migration task.
 */
export const disassociateSourceResource: API.OperationMethod<
  DisassociateSourceResourceRequest,
  DisassociateSourceResourceResult,
  DisassociateSourceResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<DisassociateSourceResourceRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DisassociateSourceResourceResult>,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSourceResource",
}));

export type ImportMigrationTaskError =
  | AccessDeniedException
  | DryRunOperation
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Registers a new migration task which represents a server, database, etc., being migrated
 * to AWS by a migration tool.
 *
 * This API is a prerequisite to calling the `NotifyMigrationTaskState` API as
 * the migration tool must first register the migration task with Migration Hub.
 */
export const importMigrationTask: API.OperationMethod<
  ImportMigrationTaskRequest,
  ImportMigrationTaskResult,
  ImportMigrationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<ImportMigrationTaskRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<ImportMigrationTaskResult>,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportMigrationTask",
}));

export type ListApplicationStatesError =
  | AccessDeniedException
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all the migration statuses for your applications. If you use the optional
 * `ApplicationIds` parameter, only the migration statuses for those
 * applications will be returned.
 */
export const listApplicationStates: API.PaginatedOperationMethod<
  ListApplicationStatesRequest,
  ListApplicationStatesResult,
  ListApplicationStatesError,
  Credentials | HttpClient.HttpClient,
  ApplicationState
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(137, __c17, 1) as any as S.Schema<ListApplicationStatesRequest>,
  output: __S(140, __c17, 4) as any as S.Schema<ListApplicationStatesResult>,
  errors: [
    AccessDeniedException,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationStates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApplicationStateList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCreatedArtifactsError =
  | AccessDeniedException
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the created artifacts attached to a given migration task in an update stream. This
 * API has the following traits:
 *
 * - Gets the list of the created artifacts while
 * migration is taking place.
 *
 * - Shows the artifacts created by the migration tool that was associated by the
 * `AssociateCreatedArtifact` API.
 *
 * - Lists created artifacts in a paginated interface.
 */
export const listCreatedArtifacts: API.PaginatedOperationMethod<
  ListCreatedArtifactsRequest,
  ListCreatedArtifactsResult,
  ListCreatedArtifactsError,
  Credentials | HttpClient.HttpClient,
  CreatedArtifact
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<ListCreatedArtifactsRequest>,
  output: __S(146, __c18, 2) as any as S.Schema<ListCreatedArtifactsResult>,
  errors: [
    AccessDeniedException,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCreatedArtifacts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CreatedArtifactList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDiscoveredResourcesError =
  | AccessDeniedException
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists discovered resources associated with the given `MigrationTask`.
 */
export const listDiscoveredResources: API.PaginatedOperationMethod<
  ListDiscoveredResourcesRequest,
  ListDiscoveredResourcesResult,
  ListDiscoveredResourcesError,
  Credentials | HttpClient.HttpClient,
  DiscoveredResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<ListDiscoveredResourcesRequest>,
  output: __S(154, __c19, 2) as any as S.Schema<ListDiscoveredResourcesResult>,
  errors: [
    AccessDeniedException,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDiscoveredResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DiscoveredResourceList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMigrationTasksError =
  | AccessDeniedException
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | PolicyErrorException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all, or filtered by resource name, migration tasks associated with the user
 * account making this call. This API has the following traits:
 *
 * - Can show a summary list of the most recent migration tasks.
 *
 * - Can show a summary list of migration tasks associated with a given discovered
 * resource.
 *
 * - Lists migration tasks in a paginated interface.
 */
export const listMigrationTasks: API.PaginatedOperationMethod<
  ListMigrationTasksRequest,
  ListMigrationTasksResult,
  ListMigrationTasksError,
  Credentials | HttpClient.HttpClient,
  MigrationTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<ListMigrationTasksRequest>,
  output: __S(163, __c20, 3) as any as S.Schema<ListMigrationTasksResult>,
  errors: [
    AccessDeniedException,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    PolicyErrorException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMigrationTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MigrationTaskSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMigrationTaskUpdatesError =
  | AccessDeniedException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * This is a paginated API that returns all the migration-task states for the specified
 * `MigrationTaskName` and `ProgressUpdateStream`.
 */
export const listMigrationTaskUpdates: API.PaginatedOperationMethod<
  ListMigrationTaskUpdatesRequest,
  ListMigrationTaskUpdatesResult,
  ListMigrationTaskUpdatesError,
  Credentials | HttpClient.HttpClient,
  MigrationTaskUpdate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<ListMigrationTaskUpdatesRequest>,
  output: __S(171, __c21, 3) as any as S.Schema<ListMigrationTaskUpdatesResult>,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMigrationTaskUpdates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MigrationTaskUpdateList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProgressUpdateStreamsError =
  | AccessDeniedException
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists progress update streams associated with the user account making this call.
 */
export const listProgressUpdateStreams: API.PaginatedOperationMethod<
  ListProgressUpdateStreamsRequest,
  ListProgressUpdateStreamsResult,
  ListProgressUpdateStreamsError,
  Credentials | HttpClient.HttpClient,
  ProgressUpdateStreamSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<ListProgressUpdateStreamsRequest>,
  output: __S(179, __c22, 3) as any as S.Schema<ListProgressUpdateStreamsResult>,
  errors: [
    AccessDeniedException,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProgressUpdateStreams",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProgressUpdateStreamSummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSourceResourcesError =
  | AccessDeniedException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all the source resource that are associated with the specified
 * `MigrationTaskName` and `ProgressUpdateStream`.
 */
export const listSourceResources: API.PaginatedOperationMethod<
  ListSourceResourcesRequest,
  ListSourceResourcesResult,
  ListSourceResourcesError,
  Credentials | HttpClient.HttpClient,
  SourceResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<ListSourceResourcesRequest>,
  output: __S(186, __c23, 2) as any as S.Schema<ListSourceResourcesResult>,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SourceResourceList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type NotifyApplicationStateError =
  | AccessDeniedException
  | DryRunOperation
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | PolicyErrorException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Sets the migration state of an application. For a given application identified by the
 * value passed to `ApplicationId`, its status is set or updated by passing one of
 * three values to `Status`: NOT_STARTED | IN_PROGRESS |
 * COMPLETED.
 */
export const notifyApplicationState: API.OperationMethod<
  NotifyApplicationStateRequest,
  NotifyApplicationStateResult,
  NotifyApplicationStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<NotifyApplicationStateRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<NotifyApplicationStateResult>,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    PolicyErrorException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyApplicationState",
}));

export type NotifyMigrationTaskStateError =
  | AccessDeniedException
  | DryRunOperation
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Notifies Migration Hub of the current status, progress, or other detail regarding a
 * migration task. This API has the following traits:
 *
 * - Migration tools will call the `NotifyMigrationTaskState` API to share
 * the latest progress and status.
 *
 * - `MigrationTaskName` is used for addressing updates to the correct
 * target.
 *
 * - `ProgressUpdateStream` is used for access control and to provide a
 * namespace for each migration tool.
 */
export const notifyMigrationTaskState: API.OperationMethod<
  NotifyMigrationTaskStateRequest,
  NotifyMigrationTaskStateResult,
  NotifyMigrationTaskStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<NotifyMigrationTaskStateRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<NotifyMigrationTaskStateResult>,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyMigrationTaskState",
}));

export type PutResourceAttributesError =
  | AccessDeniedException
  | DryRunOperation
  | HomeRegionNotSetException
  | InternalServerError
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Provides identifying details of the resource being migrated so that it can be associated
 * in the Application Discovery Service repository. This association occurs asynchronously
 * after `PutResourceAttributes` returns.
 *
 * - Keep in mind that subsequent calls to PutResourceAttributes will override
 * previously stored attributes. For example, if it is first called with a MAC
 * address, but later, it is desired to *add* an IP address, it
 * will then be required to call it with *both* the IP and MAC
 * addresses to prevent overriding the MAC address.
 *
 * - Note the instructions regarding the special use case of the
 * `ResourceAttributeList`
 * parameter when specifying any
 * "VM" related value.
 *
 * Because this is an asynchronous call, it will always return 200, whether an
 * association occurs or not. To confirm if an association was found based on the provided
 * details, call `ListDiscoveredResources`.
 */
export const putResourceAttributes: API.OperationMethod<
  PutResourceAttributesRequest,
  PutResourceAttributesResult,
  PutResourceAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<PutResourceAttributesRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<PutResourceAttributesResult>,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    HomeRegionNotSetException,
    InternalServerError,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourceAttributes",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProgressUpdateStream: S.String,
          MigrationTaskName: S.String,
          CreatedArtifact: __S(16, __c2, 0),
          DryRun: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateCreatedArtifactRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AssociateCreatedArtifactResult",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Description: S.optional(S.String) }),
      ).annotate({ identifier: "CreatedArtifact" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProgressUpdateStream: S.String,
          MigrationTaskName: S.String,
          DiscoveredResource: __S(32, __c4, 0),
          DryRun: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateDiscoveredResourceRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationId: S.String, Description: S.optional(S.String) }),
      ).annotate({ identifier: "DiscoveredResource" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProgressUpdateStream: S.String,
          MigrationTaskName: S.String,
          SourceResource: __S(48, __c6, 0),
          DryRun: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateSourceResourceRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          StatusDetail: S.optional(S.String),
        }),
      ).annotate({ identifier: "SourceResource" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProgressUpdateStreamName: S.String, DryRun: S.optional(S.Boolean) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateProgressUpdateStreamRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProgressUpdateStreamName: S.String, DryRun: S.optional(S.Boolean) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteProgressUpdateStreamRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApplicationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeApplicationStateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationStatus: S.optional(S.String),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DescribeApplicationStateResult" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProgressUpdateStream: S.String, MigrationTaskName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeMigrationTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProgressUpdateStream: S.optional(S.String),
          MigrationTaskName: S.optional(S.String),
          Task: S.optional(__S(88, __c11, 0)),
          UpdateDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ResourceAttributeList: S.optional(__S(97, __c12, 1)),
        }),
      ).annotate({ identifier: "MigrationTask" });
    case 2:
      return S.suspend(() => S.Struct({ MigrationTask: S.optional(__S(81, __c10, 1)) })).annotate({
        identifier: "DescribeMigrationTaskResult",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.String,
          StatusDetail: S.optional(S.String),
          ProgressPercent: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Task" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Type: S.String, Value: S.String })).annotate({
        identifier: "ResourceAttribute",
      });
    case 1:
      return S.Array(__S(96, __c12, 0));
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProgressUpdateStream: S.String,
          MigrationTaskName: S.String,
          CreatedArtifactName: S.String,
          DryRun: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateCreatedArtifactRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProgressUpdateStream: S.String,
          MigrationTaskName: S.String,
          ConfigurationId: S.String,
          DryRun: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateDiscoveredResourceRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProgressUpdateStream: S.String,
          MigrationTaskName: S.String,
          SourceResourceName: S.String,
          DryRun: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateSourceResourceRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProgressUpdateStream: S.String,
          MigrationTaskName: S.String,
          DryRun: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ImportMigrationTaskRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApplicationIds: S.optional(__S(136, __c17, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListApplicationStatesRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.optional(S.String),
          ApplicationStatus: S.optional(S.String),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ApplicationState" });
    case 3:
      return S.Array(__S(138, __c17, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ApplicationStateList: S.optional(__S(139, __c17, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListApplicationStatesResult" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProgressUpdateStream: S.String,
          MigrationTaskName: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCreatedArtifactsRequest" });
    case 1:
      return S.Array(__S(16, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          CreatedArtifactList: S.optional(__S(145, __c18, 1)),
        }),
      ).annotate({ identifier: "ListCreatedArtifactsResult" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProgressUpdateStream: S.String,
          MigrationTaskName: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDiscoveredResourcesRequest" });
    case 1:
      return S.Array(__S(32, __c4, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          DiscoveredResourceList: S.optional(__S(153, __c19, 1)),
        }),
      ).annotate({ identifier: "ListDiscoveredResourcesResult" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          ResourceName: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListMigrationTasksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProgressUpdateStream: S.optional(S.String),
          MigrationTaskName: S.optional(S.String),
          Status: S.optional(S.String),
          ProgressPercent: S.optional(S.Number),
          StatusDetail: S.optional(S.String),
          UpdateDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "MigrationTaskSummary" });
    case 2:
      return S.Array(__S(161, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MigrationTaskSummaryList: S.optional(__S(162, __c20, 2)),
        }),
      ).annotate({ identifier: "ListMigrationTasksResult" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProgressUpdateStream: S.String,
          MigrationTaskName: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListMigrationTaskUpdatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UpdateDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdateType: S.optional(S.String),
          MigrationTaskState: S.optional(__S(88, __c11, 0)),
        }),
      ).annotate({ identifier: "MigrationTaskUpdate" });
    case 2:
      return S.Array(__S(169, __c21, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MigrationTaskUpdateList: S.optional(__S(170, __c21, 2)),
        }),
      ).annotate({ identifier: "ListMigrationTaskUpdatesResult" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListProgressUpdateStreamsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ProgressUpdateStreamName: S.optional(S.String) })).annotate(
        { identifier: "ProgressUpdateStreamSummary" },
      );
    case 2:
      return S.Array(__S(177, __c22, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProgressUpdateStreamSummaryList: S.optional(__S(178, __c22, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListProgressUpdateStreamsResult" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProgressUpdateStream: S.String,
          MigrationTaskName: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSourceResourcesRequest" });
    case 1:
      return S.Array(__S(48, __c6, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          SourceResourceList: S.optional(__S(185, __c23, 1)),
        }),
      ).annotate({ identifier: "ListSourceResourcesResult" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationId: S.String,
          Status: S.String,
          UpdateDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DryRun: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "NotifyApplicationStateRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProgressUpdateStream: S.String,
          MigrationTaskName: S.String,
          Task: __S(88, __c11, 0),
          UpdateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          NextUpdateSeconds: S.Number,
          DryRun: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "NotifyMigrationTaskStateRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProgressUpdateStream: S.String,
          MigrationTaskName: S.String,
          ResourceAttributeList: __S(97, __c12, 1),
          DryRun: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutResourceAttributesRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
