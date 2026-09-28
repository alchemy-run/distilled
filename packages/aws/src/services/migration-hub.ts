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
  sdkId: "Migration Hub",
  target: "AWSMigrationHub",
  version: "2017-05-31",
  sigv4: "mgh",
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
                `https://mgh-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://mgh-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://mgh.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://mgh.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"])<{
    readonly message?: string;
  }> {}
export class DryRunOperation
  extends /*@__PURE__*/ TE.TaggedError("DryRunOperation")<{
    readonly message?: string;
  }> {}
export class HomeRegionNotSetException
  extends /*@__PURE__*/ TE.TaggedError("HomeRegionNotSetException")<{
    readonly message?: string;
  }> {}
export class InternalServerError
  extends /*@__PURE__*/ TE.TaggedError("InternalServerError")<{
    readonly message?: string;
  }> {}
export class InvalidInputException
  extends /*@__PURE__*/ TE.TaggedError("InvalidInputException")<{
    readonly message?: string;
  }> {}
export class PolicyErrorException
  extends /*@__PURE__*/ TE.TaggedError("PolicyErrorException")<{
    readonly message?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
  }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError("ServiceUnavailableException", [
    "ServerError",
  ])<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429, headers: { RetryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly RetryAfterSeconds?: number }> {}
export class UnauthorizedOperation
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedOperation", ["AuthError"])<{
    readonly message?: string;
  }> {}
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
export type ApplicationStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | (string & {});
export type UpdateDateTime = Date;
export interface DescribeApplicationStateResult {
  ApplicationStatus?: ApplicationStatus;
  LastUpdatedTime?: Date;
}
export interface DescribeMigrationTaskRequest {
  ProgressUpdateStream: string;
  MigrationTaskName: string;
}
export type Status =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
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
  descriptor: {
    service: svc,
    input: {
      ProgressUpdateStream: 0,
      MigrationTaskName: 0,
      CreatedArtifact: { Name: 0, Description: 0 },
      DryRun: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ProgressUpdateStream: 0,
      MigrationTaskName: 0,
      DiscoveredResource: { ConfigurationId: 0, Description: 0 },
      DryRun: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ProgressUpdateStream: 0,
      MigrationTaskName: 0,
      SourceResource: { Name: 0, Description: 0, StatusDetail: 0 },
      DryRun: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ProgressUpdateStreamName: 0, DryRun: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ProgressUpdateStreamName: 0, DryRun: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ApplicationId: 0 },
    output: { LastUpdatedTime: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ProgressUpdateStream: 0, MigrationTaskName: 0 },
    output: { MigrationTask: { UpdateDateTime: D.ts } },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ProgressUpdateStream: 0,
      MigrationTaskName: 0,
      CreatedArtifactName: 0,
      DryRun: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ProgressUpdateStream: 0,
      MigrationTaskName: 0,
      ConfigurationId: 0,
      DryRun: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ProgressUpdateStream: 0,
      MigrationTaskName: 0,
      SourceResourceName: 0,
      DryRun: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ProgressUpdateStream: 0, MigrationTaskName: 0, DryRun: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { ApplicationIds: 0, NextToken: 0, MaxResults: 0 },
    output: { ApplicationStateList: D.list({ LastUpdatedTime: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    input: {
      ProgressUpdateStream: 0,
      MigrationTaskName: 0,
      NextToken: 0,
      MaxResults: 0,
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      ProgressUpdateStream: 0,
      MigrationTaskName: 0,
      NextToken: 0,
      MaxResults: 0,
    },
  },
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
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, ResourceName: 0 },
    output: { MigrationTaskSummaryList: D.list({ UpdateDateTime: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    input: {
      ProgressUpdateStream: 0,
      MigrationTaskName: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { MigrationTaskUpdateList: D.list({ UpdateDateTime: D.ts }) },
  },
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
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
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
  descriptor: {
    service: svc,
    input: {
      ProgressUpdateStream: 0,
      MigrationTaskName: 0,
      NextToken: 0,
      MaxResults: 0,
    },
  },
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
  descriptor: {
    service: svc,
    input: { ApplicationId: 0, Status: 0, UpdateDateTime: 0, DryRun: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ProgressUpdateStream: 0,
      MigrationTaskName: 0,
      Task: { Status: 0, StatusDetail: 0, ProgressPercent: 0 },
      UpdateDateTime: 0,
      NextUpdateSeconds: 0,
      DryRun: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ProgressUpdateStream: 0,
      MigrationTaskName: 0,
      ResourceAttributeList: D.list({ Type: 0, Value: 0 }),
      DryRun: 0,
    },
  },
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
})) as any;
