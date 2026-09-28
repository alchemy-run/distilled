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
  sdkId: "GameLiftStreams",
  target: "GameLiftStreams",
  version: "2018-05-10",
  sigv4: "gameliftstreams",
  protocol: restJson1Protocol,
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
              `https://gameliftstreams-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://gameliftstreams.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class StreamSessionAccessNotReadyException
  extends /*@__PURE__*/ TE.TaggedError(
    "StreamSessionAccessNotReadyException",
    ["ConflictError", "RetryableError"],
    { status: 409 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type Identifier = string;
export type LocationName = string;
export type AlwaysOnCapacity = number;
export type OnDemandCapacity = number;
export type TargetIdleCapacity = number;
export type MaximumCapacity = number;
export type VpcId = string;
export type Ipv4CidrBlock = string;
export type Ipv4CidrBlockList = string[];
export interface VpcTransitConfiguration {
  VpcId: string;
  Ipv4CidrBlocks: string[];
}
export interface LocationConfiguration {
  LocationName: string;
  AlwaysOnCapacity?: number;
  OnDemandCapacity?: number;
  TargetIdleCapacity?: number;
  MaximumCapacity?: number;
  VpcTransitConfiguration?: VpcTransitConfiguration;
}
export type LocationConfigurations = LocationConfiguration[];
export interface AddStreamGroupLocationsInput {
  Identifier: string;
  LocationConfigurations: LocationConfiguration[];
}
export type StreamGroupLocationStatus =
  | "ACTIVATING"
  | "ACTIVE"
  | "ERROR"
  | "REMOVING"
  | (string & {});
export type CapacityValue = number;
export interface VpcTransitConfigurationResponse {
  VpcId?: string;
  Ipv4CidrBlocks?: string[];
  TransitGatewayId?: string;
  TransitGatewayResourceShareArn?: string;
}
export interface LocationState {
  LocationName?: string;
  Status?: StreamGroupLocationStatus;
  AlwaysOnCapacity?: number;
  OnDemandCapacity?: number;
  TargetIdleCapacity?: number;
  MaximumCapacity?: number;
  RequestedCapacity?: number;
  AllocatedCapacity?: number;
  IdleCapacity?: number;
  InternalVpcIpv4CidrBlock?: string;
  VpcTransitConfiguration?: VpcTransitConfigurationResponse;
}
export type LocationStates = LocationState[];
export interface AddStreamGroupLocationsOutput {
  Identifier: string;
  Locations: LocationState[];
}
export type Identifiers = string[];
export interface AssociateApplicationsInput {
  Identifier: string;
  ApplicationIdentifiers: string[];
}
export type Arn = string;
export type ArnList = string[];
export interface AssociateApplicationsOutput {
  Arn?: string;
  ApplicationArns?: string[];
}
export type Description = string;
export type RuntimeEnvironmentType =
  | "PROTON"
  | "WINDOWS"
  | "UBUNTU"
  | (string & {});
export type RuntimeEnvironmentVersion = string;
export interface RuntimeEnvironment {
  Type: RuntimeEnvironmentType;
  Version: string;
}
export type ExecutablePath = string;
export type ApplicationSourceUri = string;
export type FilePath = string;
export type FilePaths = string[];
export type ApplicationLogOutputUri = string;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export type ClientToken = string;
export interface CreateApplicationInput {
  Description: string;
  RuntimeEnvironment: RuntimeEnvironment;
  ExecutablePath: string;
  ApplicationSourceUri: string;
  ApplicationLogPaths?: string[];
  ApplicationLogOutputUri?: string;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
}
export type Id = string;
export type ApplicationStatus =
  | "INITIALIZED"
  | "PROCESSING"
  | "READY"
  | "DELETING"
  | "ERROR"
  | (string & {});
export type ApplicationStatusReason =
  | "internalError"
  | "accessDenied"
  | "sourceModified"
  | (string & {});
export type ReplicationStatusType = "REPLICATING" | "COMPLETED" | (string & {});
export interface ReplicationStatus {
  Location?: string;
  Status?: ReplicationStatusType;
}
export type ReplicationStatuses = ReplicationStatus[];
export interface CreateApplicationOutput {
  Arn: string;
  Description?: string;
  RuntimeEnvironment?: RuntimeEnvironment;
  ExecutablePath?: string;
  ApplicationLogPaths?: string[];
  ApplicationLogOutputUri?: string;
  ApplicationSourceUri?: string;
  Id?: string;
  Status?: ApplicationStatus;
  StatusReason?: ApplicationStatusReason;
  ReplicationStatuses?: ReplicationStatus[];
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  AssociatedStreamGroups?: string[];
}
export type StreamClass =
  | "gen4n_high"
  | "gen4n_ultra"
  | "gen4n_win2022"
  | "gen5n_high"
  | "gen5n_ultra"
  | "gen5n_win2022"
  | "gen6n_small"
  | "gen6n_medium"
  | "gen6n_high"
  | "gen6n_ultra"
  | "gen6n_ultra_win2022"
  | "gen6n_pro"
  | "gen6n_pro_win2022"
  | "gen6n_small_win2022"
  | "gen6n_medium_win2022"
  | "gen6e_pro"
  | "gen6e_pro_win2022"
  | (string & {});
export interface CreateStreamGroupInput {
  Description: string;
  StreamClass: StreamClass;
  DefaultApplicationIdentifier?: string;
  LocationConfigurations?: LocationConfiguration[];
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
}
export interface DefaultApplication {
  Id?: string;
  Arn?: string;
}
export type StreamGroupStatus =
  | "ACTIVATING"
  | "UPDATING_LOCATIONS"
  | "ACTIVE"
  | "ACTIVE_WITH_ERRORS"
  | "ERROR"
  | "DELETING"
  | "EXPIRED"
  | (string & {});
export type StreamGroupStatusReason =
  | "internalError"
  | "noAvailableInstances"
  | (string & {});
export interface CreateStreamGroupOutput {
  Arn: string;
  Description?: string;
  DefaultApplication?: DefaultApplication;
  LocationStates?: LocationState[];
  StreamClass?: StreamClass;
  Id?: string;
  Status?: StreamGroupStatus;
  StatusReason?: StreamGroupStatusReason;
  LastUpdatedAt?: Date;
  CreatedAt?: Date;
  ExpiresAt?: Date;
  AssociatedApplications?: string[];
}
export interface CreateStreamSessionAdminShellInput {
  Identifier: string;
  StreamSessionIdentifier: string;
}
export type SessionId = string;
export type StreamUrl = string;
export type TokenValue = string | redacted.Redacted<string>;
export interface CreateStreamSessionAdminShellOutput {
  SessionId?: string;
  StreamUrl?: string;
  TokenValue?: string | redacted.Redacted<string>;
}
export type SignalRequest = string | redacted.Redacted<string>;
export interface CreateStreamSessionConnectionInput {
  ClientToken?: string;
  Identifier: string;
  StreamSessionIdentifier: string;
  SignalRequest: string | redacted.Redacted<string>;
}
export type SignalResponse = string | redacted.Redacted<string>;
export interface CreateStreamSessionConnectionOutput {
  SignalResponse?: string | redacted.Redacted<string>;
}
export type Protocol = "WebRTC" | (string & {});
export type UrlExpiresAfterMinutes = number;
export type UsageLimit = number;
export type LocationList = string[];
export type SessionLengthSeconds = number;
export type GameLaunchArgList = string[];
export type EnvironmentVariables = { [key: string]: string | undefined };
export type IamRoleArn = string | redacted.Redacted<string>;
export type ResolutionWidth = number;
export type ResolutionHeight = number;
export interface Resolution {
  Width: number;
  Height: number;
}
export interface DisplayConfiguration {
  Resolution?: Resolution;
}
export interface CreateStreamUrlInput {
  Identifier: string;
  ApplicationIdentifier: string;
  Protocol: Protocol;
  UrlExpiresAfterMinutes: number;
  UsageLimit?: number;
  Description?: string;
  Locations: string[];
  SessionLengthSeconds?: number;
  AdditionalLaunchArgs?: string[];
  AdditionalEnvironmentVariables?: { [key: string]: string | undefined };
  RoleArn?: string | redacted.Redacted<string>;
  DisplayConfiguration?: DisplayConfiguration;
  ClientToken?: string;
}
export type StreamSessionStreamUrl = string | redacted.Redacted<string>;
export type StreamUrlStatus =
  | "ACTIVE"
  | "EXPIRED"
  | "REVOKED"
  | "LIMIT_REACHED"
  | (string & {});
export type StreamUrlStatusReason =
  | "userRevoked"
  | "revokedAndTerminatingSessions"
  | "revokedAndSessionsTerminated"
  | "streamGroupDeleted"
  | "applicationDeleted"
  | (string & {});
export type RemainingUses = number;
export interface CreateStreamUrlOutput {
  Arn: string;
  StreamUrlId?: string;
  StreamUrl?: string | redacted.Redacted<string>;
  Status?: StreamUrlStatus;
  StatusReason?: StreamUrlStatusReason;
  ExpiresAt?: Date;
  CreatedAt?: Date;
  UsageLimit?: number;
  RemainingUses?: number;
  StreamGroupArn?: string;
  ApplicationArn?: string;
  Protocol?: Protocol;
  Locations?: string[];
  SessionLengthSeconds?: number;
  Description?: string;
  AdditionalLaunchArgs?: string[];
  AdditionalEnvironmentVariables?: { [key: string]: string | undefined };
  RoleArn?: string | redacted.Redacted<string>;
  DisplayConfiguration?: DisplayConfiguration;
}
export interface DeleteApplicationInput {
  Identifier: string;
}
export interface DeleteApplicationResponse {}
export interface DeleteStreamGroupInput {
  Identifier: string;
}
export interface DeleteStreamGroupResponse {}
export interface DisassociateApplicationsInput {
  Identifier: string;
  ApplicationIdentifiers: string[];
}
export interface DisassociateApplicationsOutput {
  Arn?: string;
  ApplicationArns?: string[];
}
export type OutputUri = string;
export interface ExportStreamSessionFilesInput {
  Identifier: string;
  StreamSessionIdentifier: string;
  OutputUri: string;
}
export interface ExportStreamSessionFilesOutput {}
export interface GetApplicationInput {
  Identifier: string;
}
export interface GetApplicationOutput {
  Arn: string;
  Description?: string;
  RuntimeEnvironment?: RuntimeEnvironment;
  ExecutablePath?: string;
  ApplicationLogPaths?: string[];
  ApplicationLogOutputUri?: string;
  ApplicationSourceUri?: string;
  Id?: string;
  Status?: ApplicationStatus;
  StatusReason?: ApplicationStatusReason;
  ReplicationStatuses?: ReplicationStatus[];
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  AssociatedStreamGroups?: string[];
}
export interface GetStreamGroupInput {
  Identifier: string;
}
export interface GetStreamGroupOutput {
  Arn: string;
  Description?: string;
  DefaultApplication?: DefaultApplication;
  LocationStates?: LocationState[];
  StreamClass?: StreamClass;
  Id?: string;
  Status?: StreamGroupStatus;
  StatusReason?: StreamGroupStatusReason;
  LastUpdatedAt?: Date;
  CreatedAt?: Date;
  ExpiresAt?: Date;
  AssociatedApplications?: string[];
}
export interface GetStreamSessionInput {
  Identifier: string;
  StreamSessionIdentifier: string;
}
export type UserId = string;
export type StreamSessionStatus =
  | "ACTIVATING"
  | "ACTIVE"
  | "CONNECTED"
  | "PENDING_CLIENT_RECONNECTION"
  | "RECONNECTING"
  | "TERMINATING"
  | "TERMINATED"
  | "ERROR"
  | (string & {});
export type StreamSessionStatusReason =
  | "internalError"
  | "invalidSignalRequest"
  | "placementTimeout"
  | "applicationLogS3DestinationError"
  | "assumeRoleFailed"
  | "applicationExit"
  | "connectionTimeout"
  | "reconnectionTimeout"
  | "maxSessionLengthTimeout"
  | "idleTimeout"
  | "apiTerminated"
  | (string & {});
export type ConnectionTimeoutSeconds = number;
export interface PerformanceStatsConfiguration {
  SharedWithClient?: boolean;
}
export type FileLocationUri = string;
export type WebSdkProtocolUrl = string;
export type ExportFilesStatus =
  | "SUCCEEDED"
  | "FAILED"
  | "PENDING"
  | (string & {});
export type ExportFilesReason = string;
export interface ExportFilesMetadata {
  Status?: ExportFilesStatus;
  StatusReason?: string;
  OutputUri?: string;
}
export interface GetStreamSessionOutput {
  Arn?: string;
  Description?: string;
  StreamGroupId?: string;
  UserId?: string;
  Status?: StreamSessionStatus;
  StatusReason?: StreamSessionStatusReason;
  Protocol?: Protocol;
  Location?: string;
  SignalRequest?: string | redacted.Redacted<string>;
  SignalResponse?: string | redacted.Redacted<string>;
  ConnectionTimeoutSeconds?: number;
  SessionLengthSeconds?: number;
  AdditionalLaunchArgs?: string[];
  AdditionalEnvironmentVariables?: { [key: string]: string | undefined };
  PerformanceStatsConfiguration?: PerformanceStatsConfiguration;
  LogFileLocationUri?: string;
  WebSdkProtocolUrl?: string;
  LastUpdatedAt?: Date;
  CreatedAt?: Date;
  ApplicationArn?: string;
  ExportFilesMetadata?: ExportFilesMetadata;
  RoleArn?: string | redacted.Redacted<string>;
  DisplayConfiguration?: DisplayConfiguration;
}
export interface GetStreamUrlInput {
  Identifier: string;
  StreamUrlIdentifier: string;
}
export interface StreamSessionSummary {
  Arn?: string;
  UserId?: string;
  Status?: StreamSessionStatus;
  StatusReason?: StreamSessionStatusReason;
  Protocol?: Protocol;
  LastUpdatedAt?: Date;
  CreatedAt?: Date;
  ApplicationArn?: string;
  ExportFilesMetadata?: ExportFilesMetadata;
  Location?: string;
  RoleArn?: string | redacted.Redacted<string>;
}
export type StreamSessionSummaryList = StreamSessionSummary[];
export interface GetStreamUrlOutput {
  Arn: string;
  StreamUrlId?: string;
  StreamUrl?: string | redacted.Redacted<string>;
  Status?: StreamUrlStatus;
  StatusReason?: StreamUrlStatusReason;
  ExpiresAt?: Date;
  CreatedAt?: Date;
  UsageLimit?: number;
  RemainingUses?: number;
  StreamGroupArn?: string;
  ApplicationArn?: string;
  Protocol?: Protocol;
  Locations?: string[];
  SessionLengthSeconds?: number;
  Description?: string;
  AdditionalLaunchArgs?: string[];
  AdditionalEnvironmentVariables?: { [key: string]: string | undefined };
  RoleArn?: string | redacted.Redacted<string>;
  DisplayConfiguration?: DisplayConfiguration;
  StreamSessions?: StreamSessionSummary[];
}
export type NextToken = string;
export type MaxResults = number;
export interface ListApplicationsInput {
  NextToken?: string;
  MaxResults?: number;
}
export interface ApplicationSummary {
  Arn: string;
  Id?: string;
  Description?: string;
  Status?: ApplicationStatus;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  RuntimeEnvironment?: RuntimeEnvironment;
}
export type ApplicationSummaryList = ApplicationSummary[];
export interface ListApplicationsOutput {
  Items?: ApplicationSummary[];
  NextToken?: string;
}
export interface ListApplicationShaderCachesInput {
  Identifier: string;
}
export type ShaderCacheStatus =
  | "INITIALIZED"
  | "PROCESSING"
  | "READY"
  | "DELETING"
  | "ERROR"
  | (string & {});
export interface ShaderCacheSummary {
  Identifier: string;
  ApplicationArn: string;
  Status?: ShaderCacheStatus;
  LastUpdatedAt?: Date;
  StorageBytes?: number;
  AssociatedStreamGroups?: string[];
}
export type ShaderCacheSummaryList = ShaderCacheSummary[];
export interface ListApplicationShaderCachesOutput {
  Items?: ShaderCacheSummary[];
}
export interface ListStreamGroupsInput {
  NextToken?: string;
  MaxResults?: number;
}
export interface StreamGroupSummary {
  Arn: string;
  Id?: string;
  Description?: string;
  DefaultApplication?: DefaultApplication;
  StreamClass?: StreamClass;
  Status?: StreamGroupStatus;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  ExpiresAt?: Date;
}
export type StreamGroupSummaryList = StreamGroupSummary[];
export interface ListStreamGroupsOutput {
  Items?: StreamGroupSummary[];
  NextToken?: string;
}
export interface ListStreamSessionsInput {
  Status?: StreamSessionStatus;
  ExportFilesStatus?: ExportFilesStatus;
  NextToken?: string;
  MaxResults?: number;
  Identifier: string;
}
export interface ListStreamSessionsOutput {
  Items?: StreamSessionSummary[];
  NextToken?: string;
}
export interface ListStreamSessionsByAccountInput {
  Status?: StreamSessionStatus;
  ExportFilesStatus?: ExportFilesStatus;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListStreamSessionsByAccountOutput {
  Items?: StreamSessionSummary[];
  NextToken?: string;
}
export interface ListStreamUrlsInput {
  Status?: StreamUrlStatus;
  StreamGroupIdentifier?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface StreamUrlSummary {
  Arn: string;
  StreamUrlId?: string;
  StreamUrl?: string | redacted.Redacted<string>;
  Status?: StreamUrlStatus;
  StatusReason?: StreamUrlStatusReason;
  ExpiresAt?: Date;
  CreatedAt?: Date;
  UsageLimit?: number;
  RemainingUses?: number;
  StreamGroupArn?: string;
  ApplicationArn?: string;
  SessionLengthSeconds?: number;
  Description?: string;
}
export type StreamUrlSummaryList = StreamUrlSummary[];
export interface ListStreamUrlsOutput {
  Items?: StreamUrlSummary[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export type LocationsList = string[];
export interface RemoveStreamGroupLocationsInput {
  Identifier: string;
  Locations: string[];
}
export interface RemoveStreamGroupLocationsResponse {}
export type RevocationMode =
  | "REVOKE_URL"
  | "REVOKE_AND_TERMINATE_SESSIONS"
  | (string & {});
export interface RevokeStreamUrlInput {
  Identifier: string;
  StreamUrlIdentifier: string;
  RevocationMode?: RevocationMode;
}
export interface RevokeStreamUrlResponse {}
export interface StartStreamSessionInput {
  ClientToken?: string;
  Description?: string;
  Identifier: string;
  Protocol: Protocol;
  SignalRequest: string | redacted.Redacted<string>;
  ApplicationIdentifier: string;
  UserId?: string;
  Locations?: string[];
  ConnectionTimeoutSeconds?: number;
  SessionLengthSeconds?: number;
  AdditionalLaunchArgs?: string[];
  AdditionalEnvironmentVariables?: { [key: string]: string | undefined };
  PerformanceStatsConfiguration?: PerformanceStatsConfiguration;
  RoleArn?: string | redacted.Redacted<string>;
  DisplayConfiguration?: DisplayConfiguration;
}
export interface StartStreamSessionOutput {
  Arn?: string;
  Description?: string;
  StreamGroupId?: string;
  UserId?: string;
  Status?: StreamSessionStatus;
  StatusReason?: StreamSessionStatusReason;
  Protocol?: Protocol;
  Location?: string;
  SignalRequest?: string | redacted.Redacted<string>;
  SignalResponse?: string | redacted.Redacted<string>;
  ConnectionTimeoutSeconds?: number;
  SessionLengthSeconds?: number;
  AdditionalLaunchArgs?: string[];
  AdditionalEnvironmentVariables?: { [key: string]: string | undefined };
  PerformanceStatsConfiguration?: PerformanceStatsConfiguration;
  LogFileLocationUri?: string;
  WebSdkProtocolUrl?: string;
  LastUpdatedAt?: Date;
  CreatedAt?: Date;
  ApplicationArn?: string;
  ExportFilesMetadata?: ExportFilesMetadata;
  RoleArn?: string | redacted.Redacted<string>;
  DisplayConfiguration?: DisplayConfiguration;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface TerminateStreamSessionInput {
  Identifier: string;
  StreamSessionIdentifier: string;
}
export interface TerminateStreamSessionResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateApplicationInput {
  Identifier: string;
  Description?: string;
  ApplicationLogPaths?: string[];
  ApplicationLogOutputUri?: string;
}
export interface UpdateApplicationOutput {
  Arn: string;
  Description?: string;
  RuntimeEnvironment?: RuntimeEnvironment;
  ExecutablePath?: string;
  ApplicationLogPaths?: string[];
  ApplicationLogOutputUri?: string;
  ApplicationSourceUri?: string;
  Id?: string;
  Status?: ApplicationStatus;
  StatusReason?: ApplicationStatusReason;
  ReplicationStatuses?: ReplicationStatus[];
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  AssociatedStreamGroups?: string[];
}
export interface UpdateStreamGroupInput {
  Identifier: string;
  LocationConfigurations?: LocationConfiguration[];
  Description?: string;
  DefaultApplicationIdentifier?: string;
}
export interface UpdateStreamGroupOutput {
  Arn: string;
  Description?: string;
  DefaultApplication?: DefaultApplication;
  LocationStates?: LocationState[];
  StreamClass?: StreamClass;
  Id?: string;
  Status?: StreamGroupStatus;
  StatusReason?: StreamGroupStatusReason;
  LastUpdatedAt?: Date;
  CreatedAt?: Date;
  ExpiresAt?: Date;
  AssociatedApplications?: string[];
}
export type AddStreamGroupLocationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Add locations that can host stream sessions. To add a location, the stream group must be in `ACTIVE` status. You configure locations and their corresponding capacity for each stream group. Creating a stream group in a location that's nearest to your end users can help minimize latency and improve quality.
 *
 * This operation provisions stream capacity at the specified locations. By default, all locations have 1 or 2 capacity, depending on the stream class option: 2 for 'High' and 1 for 'Ultra' and 'Win2022'. This operation also copies the content files of all associated applications to an internal S3 bucket at each location. This allows Amazon GameLift Streams to host performant stream sessions.
 */
export const addStreamGroupLocations: API.OperationMethod<
  AddStreamGroupLocationsInput,
  AddStreamGroupLocationsOutput,
  AddStreamGroupLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /streamgroups/{Identifier}/locations",
    input: {
      Identifier: 0,
      LocationConfigurations: D.list(i_LocationConfiguration),
    },
    body: true,
  },
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
  operationName: "AddStreamGroupLocations",
})) as any;

export type AssociateApplicationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * When you associate, or link, an application with a stream group, then Amazon GameLift Streams can launch the application using the stream group's allocated compute resources. The stream group must be in `ACTIVE` status. You can reverse this action by using DisassociateApplications.
 *
 * If a stream group does not already have a linked application, Amazon GameLift Streams will automatically assign the first application provided in `ApplicationIdentifiers` as the default.
 */
export const associateApplications: API.OperationMethod<
  AssociateApplicationsInput,
  AssociateApplicationsOutput,
  AssociateApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /streamgroups/{Identifier}/associations",
    input: { Identifier: 0, ApplicationIdentifiers: 0 },
    body: true,
  },
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
  operationName: "AssociateApplications",
})) as any;

export type CreateApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an application resource in Amazon GameLift Streams, which specifies the application content you want to stream, such as a game build or other software, and configures the settings to run it.
 *
 * Before you create an application, upload your application content files to an Amazon Simple Storage Service (Amazon S3) bucket. For more information, see **Getting Started** in the Amazon GameLift Streams Developer Guide.
 *
 * Make sure that your files in the Amazon S3 bucket are the correct version you want to use. If you change the files at a later time, you will need to create a new Amazon GameLift Streams application.
 *
 * Creating an application is the only time Amazon GameLift Streams accesses your Amazon S3 bucket. After the application reaches `READY` status, you can delete the original files from your Amazon S3 bucket without affecting the application.
 *
 * If the request is successful, Amazon GameLift Streams begins to create an application and sets the status to `INITIALIZED`. When an application reaches `READY` status, you can use the application to set up stream groups and start streams. To track application status, call GetApplication.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationInput,
  CreateApplicationOutput,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /applications",
    input: {
      Description: 0,
      RuntimeEnvironment: { Type: 0, Version: 0 },
      ExecutablePath: 0,
      ApplicationSourceUri: 0,
      ApplicationLogPaths: 0,
      ApplicationLogOutputUri: 0,
      Tags: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    output: { CreatedAt: D.ts, LastUpdatedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
})) as any;

export type CreateStreamGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stream groups manage how Amazon GameLift Streams allocates resources and handles concurrent streams, allowing you to effectively manage capacity and costs. Within a stream group, you specify an application to stream, streaming locations and their capacity, and the stream class you want to use when streaming applications to your end-users. A stream class defines the hardware configuration of the compute resources that Amazon GameLift Streams will use when streaming, such as the CPU, GPU, and memory.
 *
 * Stream capacity represents the number of concurrent streams that can be active at a time. You set stream capacity per location, per stream group. The following capacity settings are available:
 *
 * - **Always-on capacity**: This setting, if non-zero, indicates minimum streaming capacity which is allocated to you and is never released back to the service. You pay for this base level of capacity at all times, whether used or idle.
 *
 * - **Maximum capacity**: This indicates the maximum capacity that the service can allocate for you. Newly created streams may take a few minutes to start. Capacity is released back to the service when idle. You pay for capacity that is allocated to you until it is released.
 *
 * - **Target-idle capacity**: This indicates idle capacity which the service pre-allocates and holds for you in anticipation of future activity. This helps to insulate your users from capacity-allocation delays. You pay for capacity which is held in this intentional idle state.
 *
 * Values for capacity must be whole number multiples of the tenancy value of the stream group's stream class.
 *
 * To adjust the capacity of any `ACTIVE` stream group, call UpdateStreamGroup.
 *
 * If the `CreateStreamGroup` request is successful, Amazon GameLift Streams assigns a unique ID to the stream group resource and sets the status to `ACTIVATING`. It can take a few minutes for Amazon GameLift Streams to finish creating the stream group while it searches for unallocated compute resources and provisions them. When complete, the stream group status will be `ACTIVE` and you can start stream sessions by using StartStreamSession. To check the stream group's status, call GetStreamGroup.
 *
 * Stream groups should be recreated every 3-4 weeks to pick up important service updates and fixes. Stream groups that are older than 180 days can no longer be updated with new application associations. Stream groups expire when they are 365 days old, at which point they can no longer stream sessions. The exact expiration date is indicated by the date value in the `ExpiresAt` field.
 */
export const createStreamGroup: API.OperationMethod<
  CreateStreamGroupInput,
  CreateStreamGroupOutput,
  CreateStreamGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /streamgroups",
    input: {
      Description: 0,
      StreamClass: 0,
      DefaultApplicationIdentifier: 0,
      LocationConfigurations: D.list(i_LocationConfiguration),
      Tags: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    output: { LastUpdatedAt: D.ts, CreatedAt: D.ts, ExpiresAt: D.ts },
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
  operationName: "CreateStreamGroup",
})) as any;

export type CreateStreamSessionAdminShellError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | StreamSessionAccessNotReadyException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an administrative terminal session with full access to the live runtime environment of the Amazon GameLift Streams stream session. Use the returned credentials (`SessionId`, `StreamUrl` and `TokenValue`) with the Amazon Web Services Systems Manager Session Manager plugin for the CLI to access the terminal session.
 *
 * The stream session must be in one of the following statuses: `ACTIVE`, `CONNECTED`, `PENDING_CLIENT_RECONNECTION`, or `RECONNECTING`.
 *
 * The `StreamUrl` is valid for 60 seconds. After it expires, call this operation again to get a new URL.
 *
 * The returned credentials grant full access to the live runtime environment of the Amazon GameLift Streams stream session. The operator who connects to the terminal session has the same level of access that your Amazon GameLift Streams applications have, including potentially user input, screen images, and application data files. Grant permissions to call this operation only to trusted IAM identities that require live runtime environment access.
 */
export const createStreamSessionAdminShell: API.OperationMethod<
  CreateStreamSessionAdminShellInput,
  CreateStreamSessionAdminShellOutput,
  CreateStreamSessionAdminShellError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /streamgroups/{Identifier}/streamsessions/{StreamSessionIdentifier}/access",
    input: { Identifier: 0, StreamSessionIdentifier: 0 },
    output: { TokenValue: D.secret },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    StreamSessionAccessNotReadyException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStreamSessionAdminShell",
})) as any;

export type CreateStreamSessionConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables clients to reconnect to a stream session while preserving all session state and data in the disconnected session. This reconnection process can be initiated when a stream session is in either `PENDING_CLIENT_RECONNECTION` or `ACTIVE` status. The process works as follows:
 *
 * - Initial disconnect:
 *
 * - When a client disconnects or loses connection, the stream session transitions from `CONNECTED` to `PENDING_CLIENT_RECONNECTION`
 *
 * - Reconnection time window:
 *
 * - Clients have `ConnectionTimeoutSeconds` (defined in StartStreamSession) to reconnect before session termination
 *
 * - Your backend server must call **CreateStreamSessionConnection** to initiate reconnection
 *
 * - Session transitions to `RECONNECTING` status
 *
 * - Reconnection completion:
 *
 * - On successful **CreateStreamSessionConnection**, session status changes to `ACTIVE`
 *
 * - Provide the new connection information to the requesting client
 *
 * - Client must establish connection within `ConnectionTimeoutSeconds`
 *
 * - Session terminates automatically if client fails to connect in time
 *
 * For more information about the stream session lifecycle, see Stream sessions in the *Amazon GameLift Streams Developer Guide*.
 *
 * To begin re-connecting to an existing stream session, specify the stream group ID and stream session ID that you want to reconnect to, and the signal request to use with the stream.
 */
export const createStreamSessionConnection: API.OperationMethod<
  CreateStreamSessionConnectionInput,
  CreateStreamSessionConnectionOutput,
  CreateStreamSessionConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /streamgroups/{Identifier}/streamsessions/{StreamSessionIdentifier}/connections",
    input: {
      ClientToken: D.m({ idempotency: true }),
      Identifier: 0,
      StreamSessionIdentifier: 0,
      SignalRequest: 0,
    },
    output: { SignalResponse: D.secret },
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
  operationName: "CreateStreamSessionConnection",
})) as any;

export type CreateStreamUrlError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a stream URL that grants temporary access to a stream session in a web browser without requiring an Amazon Web Services account or client integration.
 *
 * You can use the stream URL to start a stream session up to the number of times set by `UsageLimit`, until it expires after `UrlExpiresAfterMinutes`. Each successful use starts a new stream session.
 *
 * To make the request idempotent, provide a `ClientToken`.
 */
export const createStreamUrl: API.OperationMethod<
  CreateStreamUrlInput,
  CreateStreamUrlOutput,
  CreateStreamUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /streamgroups/{Identifier}/streamurls",
    input: {
      Identifier: 0,
      ApplicationIdentifier: 0,
      Protocol: 0,
      UrlExpiresAfterMinutes: 0,
      UsageLimit: 0,
      Description: 0,
      Locations: 0,
      SessionLengthSeconds: 0,
      AdditionalLaunchArgs: 0,
      AdditionalEnvironmentVariables: 0,
      RoleArn: 0,
      DisplayConfiguration: i_DisplayConfiguration,
      ClientToken: D.m({ idempotency: true }),
    },
    output: {
      StreamUrl: D.secret,
      ExpiresAt: D.ts,
      CreatedAt: D.ts,
      RoleArn: D.secret,
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
  operationName: "CreateStreamUrl",
})) as any;

export type DeleteApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Permanently deletes an Amazon GameLift Streams application resource. This also deletes the application content files stored with Amazon GameLift Streams. However, this does not delete the original files that you uploaded to your Amazon S3 bucket; you can delete these any time after Amazon GameLift Streams creates an application, which is the only time Amazon GameLift Streams accesses your Amazon S3 bucket.
 *
 * You can only delete an application that meets the following conditions:
 *
 * - The application is in `READY` or `ERROR` status. You cannot delete an application that's in `PROCESSING` or `INITIALIZED` status.
 *
 * - The application is not the default application of any stream groups. You must first delete the stream group by using DeleteStreamGroup.
 *
 * - The application is not linked to any stream groups. You must first unlink the stream group by using DisassociateApplications.
 *
 * - An application is not streaming in any ongoing stream session. You must wait until the client ends the stream session or call TerminateStreamSession to end the stream.
 *
 * If any active stream groups exist for this application, this request returns a `ValidationException`.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationInput,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /applications/{Identifier}",
    input: { Identifier: 0 },
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
  operationName: "DeleteApplication",
})) as any;

export type DeleteStreamGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Permanently deletes all compute resources and information related to a stream group. To delete a stream group, specify the unique stream group identifier. During the deletion process, the stream group's status is `DELETING`. This operation stops streams in progress and prevents new streams from starting. As a best practice, before deleting the stream group, call ListStreamSessions to check for streams in progress and take action to stop them. When you delete a stream group, any application associations referring to that stream group are automatically removed.
 */
export const deleteStreamGroup: API.OperationMethod<
  DeleteStreamGroupInput,
  DeleteStreamGroupResponse,
  DeleteStreamGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /streamgroups/{Identifier}",
    input: { Identifier: 0 },
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
  operationName: "DeleteStreamGroup",
})) as any;

export type DisassociateApplicationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * When you disassociate, or unlink, an application from a stream group, you can no longer stream this application by using that stream group's allocated compute resources. Any streams in process will continue until they terminate, which helps avoid interrupting an end-user's stream. Amazon GameLift Streams will not initiate new streams in the stream group using the disassociated application. The disassociate action does not affect the stream capacity of a stream group. To disassociate an application, the stream group must be in `ACTIVE` status.
 *
 * If you disassociate the default application, Amazon GameLift Streams will automatically choose a new default application from the remaining associated applications. To change which application is the default application, call UpdateStreamGroup and specify a new `DefaultApplicationIdentifier`.
 */
export const disassociateApplications: API.OperationMethod<
  DisassociateApplicationsInput,
  DisassociateApplicationsOutput,
  DisassociateApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /streamgroups/{Identifier}/disassociations",
    input: { Identifier: 0, ApplicationIdentifiers: 0 },
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
  operationName: "DisassociateApplications",
})) as any;

export type ExportStreamSessionFilesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Export the files that your application modifies or generates in a stream session, which can help you debug or verify your application. When your application runs, it generates output files such as logs, diagnostic information, crash dumps, save files, user data, screenshots, and so on. The files can be defined by the engine or frameworks that your application uses, or information that you've programmed your application to output.
 *
 * You can only call this action on a stream session that is in progress, specifically in one of the following statuses `ACTIVE`, `CONNECTED`, `PENDING_CLIENT_RECONNECTION`, and `RECONNECTING`. You must provide an Amazon Simple Storage Service (Amazon S3) bucket to store the files in. When the session ends, Amazon GameLift Streams produces a compressed folder that contains all of the files and directories that were modified or created by the application during the stream session. AWS uses your security credentials to authenticate and authorize access to your Amazon S3 bucket.
 *
 * Amazon GameLift Streams collects the following generated and modified files. Find them in the corresponding folders in the `.zip` archive.
 *
 * - `application/`: The folder where your application or game is stored.
 *
 * - `profile/`: The user profile folder.
 *
 * - `temp/`: The system temp folder.
 *
 * To verify the status of the exported files, use GetStreamSession.
 *
 * To delete the files, delete the object in the S3 bucket.
 */
export const exportStreamSessionFiles: API.OperationMethod<
  ExportStreamSessionFilesInput,
  ExportStreamSessionFilesOutput,
  ExportStreamSessionFilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /streamgroups/{Identifier}/streamsessions/{StreamSessionIdentifier}/exportfiles",
    input: { Identifier: 0, StreamSessionIdentifier: 0, OutputUri: 0 },
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
  operationName: "ExportStreamSessionFiles",
})) as any;

export type GetApplicationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves properties for an Amazon GameLift Streams application resource. Specify the ID of the application that you want to retrieve. If the operation is successful, it returns properties for the requested application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationInput,
  GetApplicationOutput,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{Identifier}",
    input: { Identifier: 0 },
    output: { CreatedAt: D.ts, LastUpdatedAt: D.ts },
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
  operationName: "GetApplication",
})) as any;

export type GetStreamGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves properties for a Amazon GameLift Streams stream group resource. Specify the ID of the stream group that you want to retrieve. If the operation is successful, it returns properties for the requested stream group.
 */
export const getStreamGroup: API.OperationMethod<
  GetStreamGroupInput,
  GetStreamGroupOutput,
  GetStreamGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /streamgroups/{Identifier}",
    input: { Identifier: 0 },
    output: { LastUpdatedAt: D.ts, CreatedAt: D.ts, ExpiresAt: D.ts },
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
  operationName: "GetStreamGroup",
})) as any;

export type GetStreamSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves properties for a Amazon GameLift Streams stream session resource. Specify the Amazon Resource Name (ARN) of the stream session that you want to retrieve and its stream group ARN. If the operation is successful, it returns properties for the requested resource.
 */
export const getStreamSession: API.OperationMethod<
  GetStreamSessionInput,
  GetStreamSessionOutput,
  GetStreamSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /streamgroups/{Identifier}/streamsessions/{StreamSessionIdentifier}",
    input: { Identifier: 0, StreamSessionIdentifier: 0 },
    output: {
      SignalRequest: D.secret,
      SignalResponse: D.secret,
      LastUpdatedAt: D.ts,
      CreatedAt: D.ts,
      RoleArn: D.secret,
    },
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
  operationName: "GetStreamSession",
})) as any;

export type GetStreamUrlError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves properties for a stream URL, including its current status, usage, and the stream sessions started through it.
 *
 * If you delete the stream group or application that backs the stream URL, this operation updates the status of the stream URL to `REVOKED`.
 */
export const getStreamUrl: API.OperationMethod<
  GetStreamUrlInput,
  GetStreamUrlOutput,
  GetStreamUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /streamgroups/{Identifier}/streamurls/{StreamUrlIdentifier}",
    input: { Identifier: 0, StreamUrlIdentifier: 0 },
    output: {
      StreamUrl: D.secret,
      ExpiresAt: D.ts,
      CreatedAt: D.ts,
      RoleArn: D.secret,
      StreamSessions: D.list(o_StreamSessionSummary),
    },
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
  operationName: "GetStreamUrl",
})) as any;

export type ListApplicationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all Amazon GameLift Streams applications that are associated with the Amazon Web Services account in use. This operation returns applications in all statuses, in no particular order. You can paginate the results as needed.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsInput,
  ListApplicationsOutput,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: { Items: D.list({ CreatedAt: D.ts, LastUpdatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListApplicationShaderCachesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the shader caches associated with an Amazon GameLift Streams application. Each shader cache entry includes its status, associated stream groups, and size in bytes.
 *
 * Returns shader caches associated with the specified Amazon GameLift Streams application in all statuses.
 */
export const listApplicationShaderCaches: API.OperationMethod<
  ListApplicationShaderCachesInput,
  ListApplicationShaderCachesOutput,
  ListApplicationShaderCachesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /applications/{Identifier}/shadercaches",
    input: { Identifier: 0 },
    output: { Items: D.list({ LastUpdatedAt: D.ts }) },
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
  operationName: "ListApplicationShaderCaches",
})) as any;

export type ListStreamGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all Amazon GameLift Streams stream groups that are associated with the Amazon Web Services account in use. This operation returns stream groups in all statuses, in no particular order. You can paginate the results as needed.
 */
export const listStreamGroups: API.PaginatedOperationMethod<
  ListStreamGroupsInput,
  ListStreamGroupsOutput,
  ListStreamGroupsError,
  Credentials | HttpClient.HttpClient,
  StreamGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /streamgroups",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: {
      Items: D.list({ CreatedAt: D.ts, LastUpdatedAt: D.ts, ExpiresAt: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreamGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStreamSessionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of Amazon GameLift Streams stream sessions that a stream group is hosting.
 *
 * To retrieve stream sessions, specify the stream group, and optionally filter by stream session status. You can paginate the results as needed.
 *
 * This operation returns the requested stream sessions in no particular order.
 */
export const listStreamSessions: API.PaginatedOperationMethod<
  ListStreamSessionsInput,
  ListStreamSessionsOutput,
  ListStreamSessionsError,
  Credentials | HttpClient.HttpClient,
  StreamSessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /streamgroups/{Identifier}/streamsessions",
    input: {
      Status: D.m({ query: "Status" }),
      ExportFilesStatus: D.m({ query: "ExportFilesStatus" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      Identifier: 0,
    },
    output: { Items: D.list(o_StreamSessionSummary) },
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
  operationName: "ListStreamSessions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStreamSessionsByAccountError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of Amazon GameLift Streams stream sessions that this user account has access to.
 *
 * In the returned list of stream sessions, the `ExportFilesMetadata` property only shows the `Status` value. To get the `OutpurUri` and `StatusReason` values, use GetStreamSession.
 *
 * We don't recommend using this operation to regularly check stream session statuses because it's costly. Instead, to check status updates for a specific stream session, use GetStreamSession.
 */
export const listStreamSessionsByAccount: API.PaginatedOperationMethod<
  ListStreamSessionsByAccountInput,
  ListStreamSessionsByAccountOutput,
  ListStreamSessionsByAccountError,
  Credentials | HttpClient.HttpClient,
  StreamSessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /streamsessions",
    input: {
      Status: D.m({ query: "Status" }),
      ExportFilesStatus: D.m({ query: "ExportFilesStatus" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: { Items: D.list(o_StreamSessionSummary) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreamSessionsByAccount",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStreamUrlsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of the stream URLs in the current Amazon Web Services Region for your Amazon Web Services account. You can filter the results by status or by stream group. Use the pagination parameters to retrieve results as a set of sequential pages. If you delete the stream group or application that backs a stream URL, this operation updates that stream URL's status to `REVOKED`.
 */
export const listStreamUrls: API.PaginatedOperationMethod<
  ListStreamUrlsInput,
  ListStreamUrlsOutput,
  ListStreamUrlsError,
  Credentials | HttpClient.HttpClient,
  StreamUrlSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /streamurls",
    input: {
      Status: D.m({ query: "Status" }),
      StreamGroupIdentifier: D.m({ query: "StreamGroupIdentifier" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: {
      Items: D.list({ StreamUrl: D.secret, ExpiresAt: D.ts, CreatedAt: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreamUrls",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves all tags assigned to a Amazon GameLift Streams resource. To list tags for a resource, specify the ARN value for the resource.
 *
 * **Learn more**
 *
 * Tagging Amazon Web Services Resources in the *Amazon Web Services General Reference*
 *
 * Amazon Web Services Tagging Strategies
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type RemoveStreamGroupLocationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a set of remote locations from this stream group. To remove a location, the stream group must be in `ACTIVE` status. When you remove a location, Amazon GameLift Streams releases allocated compute resources in that location. Stream sessions can no longer start from removed locations in a stream group. Amazon GameLift Streams also deletes the content files of all associated applications that were in Amazon GameLift Streams's internal Amazon S3 bucket at this location.
 *
 * You cannot remove the Amazon Web Services Region location where you initially created this stream group, known as the primary location. However, you can set the stream capacity to zero to avoid incurring costs for allocated compute resources in that location.
 */
export const removeStreamGroupLocations: API.OperationMethod<
  RemoveStreamGroupLocationsInput,
  RemoveStreamGroupLocationsResponse,
  RemoveStreamGroupLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /streamgroups/{Identifier}/locations",
    input: { Identifier: 0, Locations: D.m({ query: "locations" }) },
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
  operationName: "RemoveStreamGroupLocations",
})) as any;

export type RevokeStreamUrlError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Revokes a stream URL so that it can no longer start new stream sessions. By default, stream sessions that are already running continue until they end on their own. To also end running sessions, set `RevocationMode` to `REVOKE_AND_TERMINATE_SESSIONS`.
 *
 * Revoking a stream URL is permanent. The status of the stream URL changes to `REVOKED`.
 */
export const revokeStreamUrl: API.OperationMethod<
  RevokeStreamUrlInput,
  RevokeStreamUrlResponse,
  RevokeStreamUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /streamgroups/{Identifier}/streamurls/{StreamUrlIdentifier}/revoke",
    input: { Identifier: 0, StreamUrlIdentifier: 0, RevocationMode: 0 },
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
  operationName: "RevokeStreamUrl",
})) as any;

export type StartStreamSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action initiates a new stream session and outputs connection information that clients can use to access the stream. A stream session refers to an instance of a stream that Amazon GameLift Streams transmits from the server to the end-user. A stream session runs on a compute resource that a stream group has allocated. The start stream session process works as follows:
 *
 * - Prerequisites:
 *
 * - You must have a stream group in `ACTIVE` status
 *
 * - You must have idle or on-demand capacity in a stream group in the location you want to stream from
 *
 * - You must have at least one application associated to the stream group (use AssociateApplications if needed)
 *
 * - Start stream request:
 *
 * - Your backend server calls **StartStreamSession** to initiate connection
 *
 * - Amazon GameLift Streams creates the stream session resource, assigns an Amazon Resource Name (ARN) value, and begins searching for available stream capacity to run the stream
 *
 * - Session transitions to `ACTIVATING` status
 *
 * - Placement completion:
 *
 * - If Amazon GameLift Streams is successful in finding capacity for the stream, the stream session status changes to `ACTIVE` status and **StartStreamSession** returns stream connection information
 *
 * - If Amazon GameLift Streams was not successful in finding capacity within the placement timeout period (defined according to the capacity type and platform type), the stream session status changes to `ERROR` status and **StartStreamSession** returns a `StatusReason` of `placementTimeout`
 *
 * - Connection completion:
 *
 * - Provide the new connection information to the requesting client
 *
 * - Client must establish connection within `ConnectionTimeoutSeconds` (specified in **StartStreamSession** parameters)
 *
 * - Session terminates automatically if client fails to connect in time
 *
 * For more information about the stream session lifecycle, see Stream sessions in the *Amazon GameLift Streams Developer Guide*.
 *
 * Timeouts to be aware of that affect a stream session:
 *
 * - **Placement timeout**: The amount of time that Amazon GameLift Streams has to find capacity for a stream request. Placement timeout varies based on the capacity type used to fulfill your stream request:
 *
 * - **Always-on capacity**: 75 seconds
 *
 * - **On-demand capacity**:
 *
 * - Linux/Proton runtimes: 90 seconds
 *
 * - Windows runtime: 10 minutes
 *
 * - **Connection timeout**: The amount of time that Amazon GameLift Streams waits for a client to connect to a stream session in `ACTIVE` status, or reconnect to a stream session in `PENDING_CLIENT_RECONNECTION` status, the latter of which occurs when a client disconnects or loses connection from a stream session. If no client connects before the timeout, Amazon GameLift Streams terminates the stream session. This value is specified by `ConnectionTimeoutSeconds` in the `StartStreamSession` parameters.
 *
 * - **Maximum session length**: A stream session will be terminated after this amount of time has elapsed since it started, regardless of any existing client connections. This value is specified by `SessionLengthSeconds` in the `StartStreamSession` parameters.
 *
 * To start a new stream session, specify a stream group ID and application ID, along with the transport protocol and signal request to use with the stream session.
 *
 * For stream groups that have multiple locations, provide a set of locations ordered by priority using a `Locations` parameter. Amazon GameLift Streams will start a single stream session in the next available location. An application must be finished replicating to a remote location before the remote location can host a stream.
 *
 * To reconnect to a stream session after a client disconnects or loses connection, use CreateStreamSessionConnection.
 */
export const startStreamSession: API.OperationMethod<
  StartStreamSessionInput,
  StartStreamSessionOutput,
  StartStreamSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /streamgroups/{Identifier}/streamsessions",
    input: {
      ClientToken: D.m({ idempotency: true }),
      Description: 0,
      Identifier: 0,
      Protocol: 0,
      SignalRequest: 0,
      ApplicationIdentifier: 0,
      UserId: 0,
      Locations: 0,
      ConnectionTimeoutSeconds: 0,
      SessionLengthSeconds: 0,
      AdditionalLaunchArgs: 0,
      AdditionalEnvironmentVariables: 0,
      PerformanceStatsConfiguration: { SharedWithClient: 0 },
      RoleArn: 0,
      DisplayConfiguration: i_DisplayConfiguration,
    },
    output: {
      SignalRequest: D.secret,
      SignalResponse: D.secret,
      LastUpdatedAt: D.ts,
      CreatedAt: D.ts,
      RoleArn: D.secret,
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
  operationName: "StartStreamSession",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags to a Amazon GameLift Streams resource. Use tags to organize Amazon Web Services resources for a range of purposes. You can assign tags to the following Amazon GameLift Streams resource types:
 *
 * - Application
 *
 * - StreamGroup
 *
 * **Learn more**
 *
 * Tagging Amazon Web Services Resources in the *Amazon Web Services General Reference*
 *
 * Amazon Web Services Tagging Strategies
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: 0 },
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
  operationName: "TagResource",
})) as any;

export type TerminateStreamSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Permanently terminates an active stream session. When called, the stream session status changes to `TERMINATING`. You can terminate a stream session in any status except `ACTIVATING`. If the stream session is in `ACTIVATING` status, an exception is thrown.
 */
export const terminateStreamSession: API.OperationMethod<
  TerminateStreamSessionInput,
  TerminateStreamSessionResponse,
  TerminateStreamSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /streamgroups/{Identifier}/streamsessions/{StreamSessionIdentifier}",
    input: { Identifier: 0, StreamSessionIdentifier: 0 },
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
  operationName: "TerminateStreamSession",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from a Amazon GameLift Streams resource. To remove tags, specify the Amazon GameLift Streams resource and a list of one or more tags to remove.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateApplicationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the mutable configuration settings for a Amazon GameLift Streams application resource. You can change the `Description`, `ApplicationLogOutputUri`, and `ApplicationLogPaths`.
 *
 * To update application settings, specify the application ID and provide the new values. If the operation is successful, it returns the complete updated set of settings for the application.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationInput,
  UpdateApplicationOutput,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /applications/{Identifier}",
    input: {
      Identifier: 0,
      Description: 0,
      ApplicationLogPaths: 0,
      ApplicationLogOutputUri: 0,
    },
    output: { CreatedAt: D.ts, LastUpdatedAt: D.ts },
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
  operationName: "UpdateApplication",
})) as any;

export type UpdateStreamGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration settings for an Amazon GameLift Streams stream group resource. To update a stream group, it must be in `ACTIVE` status. You can change the description, the set of locations, and the requested capacity of a stream group per location. If you want to change the stream class, create a new stream group.
 *
 * Stream capacity represents the number of concurrent streams that can be active at a time. You set stream capacity per location, per stream group. The following capacity settings are available:
 *
 * - **Always-on capacity**: This setting, if non-zero, indicates minimum streaming capacity which is allocated to you and is never released back to the service. You pay for this base level of capacity at all times, whether used or idle.
 *
 * - **Maximum capacity**: This indicates the maximum capacity that the service can allocate for you. Newly created streams may take a few minutes to start. Capacity is released back to the service when idle. You pay for capacity that is allocated to you until it is released.
 *
 * - **Target-idle capacity**: This indicates idle capacity which the service pre-allocates and holds for you in anticipation of future activity. This helps to insulate your users from capacity-allocation delays. You pay for capacity which is held in this intentional idle state.
 *
 * Values for capacity must be whole number multiples of the tenancy value of the stream group's stream class.
 *
 * To update a stream group, specify the stream group's Amazon Resource Name (ARN) and provide the new values. If the request is successful, Amazon GameLift Streams returns the complete updated metadata for the stream group. Expired stream groups cannot be updated.
 */
export const updateStreamGroup: API.OperationMethod<
  UpdateStreamGroupInput,
  UpdateStreamGroupOutput,
  UpdateStreamGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /streamgroups/{Identifier}",
    input: {
      Identifier: 0,
      LocationConfigurations: D.list(i_LocationConfiguration),
      Description: 0,
      DefaultApplicationIdentifier: 0,
    },
    output: { LastUpdatedAt: D.ts, CreatedAt: D.ts, ExpiresAt: D.ts },
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
  operationName: "UpdateStreamGroup",
})) as any;

const i_DisplayConfiguration: D.LazyStruct = () => ({
  Resolution: { Width: 0, Height: 0 },
});
const i_LocationConfiguration: D.LazyStruct = () => ({
  LocationName: 0,
  AlwaysOnCapacity: 0,
  OnDemandCapacity: 0,
  TargetIdleCapacity: 0,
  MaximumCapacity: 0,
  VpcTransitConfiguration: { VpcId: 0, Ipv4CidrBlocks: 0 },
});
const o_StreamSessionSummary: D.LazyStruct = () => ({
  LastUpdatedAt: D.ts,
  CreatedAt: D.ts,
  RoleArn: D.secret,
});
