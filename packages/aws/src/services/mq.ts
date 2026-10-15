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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "mq", serviceShapeName: "mq" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "mq" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-11-27");
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
              `https://mq-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://mq-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://mq.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://mq.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://mq.{R}.{D}","properties":{},"headers":{}}');

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      ErrorAttribute: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceShareErrors: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __listOfResourceShareError).annotate({
          identifier: "__listOfResourceShareError",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      ErrorAttribute: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceShareErrors: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __listOfResourceShareError).annotate({
          identifier: "__listOfResourceShareError",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    {
      ErrorAttribute: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceShareErrors: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __listOfResourceShareError).annotate({
          identifier: "__listOfResourceShareError",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    {
      ErrorAttribute: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceShareErrors: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __listOfResourceShareError).annotate({
          identifier: "__listOfResourceShareError",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      ErrorAttribute: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceShareErrors: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __listOfResourceShareError).annotate({
          identifier: "__listOfResourceShareError",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    {
      ErrorAttribute: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceShareErrors: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __listOfResourceShareError).annotate({
          identifier: "__listOfResourceShareError",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export type AuthenticationStrategy = "SIMPLE" | "LDAP" | "CONFIG_MANAGED" | (string & {});
export interface ConfigurationId {
  Id?: string;
  Revision?: number;
}
export type DeploymentMode =
  | "SINGLE_INSTANCE"
  | "ACTIVE_STANDBY_MULTI_AZ"
  | "CLUSTER_MULTI_AZ"
  | (string & {});
export interface EncryptionOptions {
  KmsKeyId?: string;
  UseAwsOwnedKey?: boolean;
}
export type EngineType = "ACTIVEMQ" | "RABBITMQ" | (string & {});
export type __listOf__string = string[];
const __listOf__string = /*@__PURE__*/ __L.at(__c32, 0);
export interface LdapServerMetadataInput {
  Hosts?: string[];
  RoleBase?: string;
  RoleName?: string;
  RoleSearchMatching?: string;
  RoleSearchSubtree?: boolean;
  ServiceAccountPassword?: string | redacted.Redacted<string>;
  ServiceAccountUsername?: string;
  UserBase?: string;
  UserRoleName?: string;
  UserSearchMatching?: string;
  UserSearchSubtree?: boolean;
}
export interface Logs {
  Audit?: boolean;
  General?: boolean;
}
export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"
  | (string & {});
export interface WeeklyStartTime {
  DayOfWeek?: DayOfWeek;
  TimeOfDay?: string;
  TimeZone?: string;
}
export type BrokerStorageType = "EBS" | "EFS" | (string & {});
export type __mapOf__string = { [key: string]: string | undefined };
const __mapOf__string = /*@__PURE__*/ __L.at(__c31, 0);
export interface User {
  ConsoleAccess?: boolean;
  Groups?: string[];
  Password?: string | redacted.Redacted<string>;
  Username?: string;
  ReplicationUser?: boolean;
}
export type __listOfUser = User[];
const __listOfUser = /*@__PURE__*/ __L.at(__c27, 1);
export type DataReplicationMode = "NONE" | "CRDR" | (string & {});
export interface CreateBrokerRequest {
  AuthenticationStrategy?: AuthenticationStrategy;
  AutoMinorVersionUpgrade?: boolean;
  BrokerName?: string;
  Configuration?: ConfigurationId;
  CreatorRequestId?: string;
  DeploymentMode?: DeploymentMode;
  EncryptionOptions?: EncryptionOptions;
  EngineType?: EngineType;
  EngineVersion?: string;
  HostInstanceType?: string;
  LdapServerMetadata?: LdapServerMetadataInput;
  Logs?: Logs;
  MaintenanceWindowStartTime?: WeeklyStartTime;
  PubliclyAccessible?: boolean;
  SecurityGroups?: string[];
  StorageSize?: number;
  StorageType?: BrokerStorageType;
  SubnetIds?: string[];
  Tags?: { [key: string]: string | undefined };
  Users?: User[];
  DataReplicationMode?: DataReplicationMode;
  DataReplicationPrimaryBrokerArn?: string;
}
export interface CreateBrokerResponse {
  BrokerArn?: string;
  BrokerId?: string;
}
export interface CreateConfigurationRequest {
  AuthenticationStrategy?: AuthenticationStrategy;
  EngineType?: EngineType;
  EngineVersion?: string;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export type __timestampIso8601 = Date;
export interface ConfigurationRevision {
  Created?: Date;
  Description?: string;
  Revision?: number;
}
export interface CreateConfigurationResponse {
  Arn?: string;
  AuthenticationStrategy?: AuthenticationStrategy;
  Created?: Date;
  Id?: string;
  LatestRevision?: ConfigurationRevision & { Created: __timestampIso8601; Revision: number };
  Name?: string;
}
export interface CreateTagsRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateTagsResponse {}
export interface CreateUserRequest {
  BrokerId: string;
  ConsoleAccess?: boolean;
  Groups?: string[];
  Password?: string | redacted.Redacted<string>;
  Username: string;
  ReplicationUser?: boolean;
}
export interface CreateUserResponse {}
export interface DeleteBrokerRequest {
  BrokerId: string;
}
export interface DeleteBrokerResponse {
  BrokerId?: string;
}
export interface DeleteConfigurationRequest {
  ConfigurationId: string;
}
export interface DeleteConfigurationResponse {
  ConfigurationId?: string;
}
export interface DeleteTagsRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export interface DeleteTagsResponse {}
export interface DeleteUserRequest {
  BrokerId: string;
  Username: string;
}
export interface DeleteUserResponse {}
export interface DescribeBrokerRequest {
  BrokerId: string;
}
export interface ActionRequired {
  ActionRequiredCode?: string;
  ActionRequiredInfo?: string;
}
export type __listOfActionRequired = ActionRequired[];
const __listOfActionRequired = /*@__PURE__*/ __L.at(__c6, 2);
export interface BrokerInstance {
  ConsoleURL?: string;
  Endpoints?: string[];
  IpAddress?: string;
}
export type __listOfBrokerInstance = BrokerInstance[];
const __listOfBrokerInstance = /*@__PURE__*/ __L.at(__c6, 4);
export type BrokerState =
  | "CREATION_IN_PROGRESS"
  | "CREATION_FAILED"
  | "DELETION_IN_PROGRESS"
  | "RUNNING"
  | "REBOOT_IN_PROGRESS"
  | "CRITICAL_ACTION_REQUIRED"
  | "REPLICA"
  | (string & {});
export type __listOfConfigurationId = ConfigurationId[];
const __listOfConfigurationId = /*@__PURE__*/ __L.at(__c6, 5);
export interface Configurations {
  Current?: ConfigurationId;
  History?: ConfigurationId[];
  Pending?: ConfigurationId;
}
export interface LdapServerMetadataOutput {
  Hosts?: string[];
  RoleBase?: string;
  RoleName?: string;
  RoleSearchMatching?: string;
  RoleSearchSubtree?: boolean;
  ServiceAccountUsername?: string;
  UserBase?: string;
  UserRoleName?: string;
  UserSearchMatching?: string;
  UserSearchSubtree?: boolean;
}
export interface PendingLogs {
  Audit?: boolean;
  General?: boolean;
}
export interface LogsSummary {
  Audit?: boolean;
  AuditLogGroup?: string;
  General?: boolean;
  GeneralLogGroup?: string;
  Pending?: PendingLogs;
}
export type ChangeType = "CREATE" | "UPDATE" | "DELETE" | (string & {});
export interface UserSummary {
  PendingChange?: ChangeType;
  Username?: string;
}
export type __listOfUserSummary = UserSummary[];
const __listOfUserSummary = /*@__PURE__*/ __L.at(__c7, 1);
export interface DataReplicationCounterpart {
  BrokerId?: string;
  Region?: string;
}
export interface DataReplicationMetadataOutput {
  DataReplicationCounterpart?: DataReplicationCounterpart;
  DataReplicationRole?: string;
}
export interface DescribeBrokerResponse {
  ActionsRequired?: ActionRequired[];
  AuthenticationStrategy?: AuthenticationStrategy;
  AutoMinorVersionUpgrade?: boolean;
  BrokerArn?: string;
  BrokerId?: string;
  BrokerInstances?: BrokerInstance[];
  BrokerName?: string;
  BrokerState?: BrokerState;
  Configurations?: Configurations & {
    Current: ConfigurationId & { Id: string };
    History: (ConfigurationId & { Id: string })[];
    Pending: ConfigurationId & { Id: string };
  };
  Created?: Date;
  DeploymentMode?: DeploymentMode;
  EncryptionOptions?: EncryptionOptions & { UseAwsOwnedKey: boolean };
  EngineType?: EngineType;
  EngineVersion?: string;
  HostInstanceType?: string;
  LdapServerMetadata?: LdapServerMetadataOutput & {
    Hosts: __listOf__string;
    RoleBase: string;
    RoleSearchMatching: string;
    ServiceAccountUsername: string;
    UserBase: string;
    UserSearchMatching: string;
  };
  Logs?: LogsSummary & { General: boolean; GeneralLogGroup: string };
  MaintenanceWindowStartTime?: WeeklyStartTime & { DayOfWeek: DayOfWeek; TimeOfDay: string };
  PendingAuthenticationStrategy?: AuthenticationStrategy;
  PendingEngineVersion?: string;
  PendingHostInstanceType?: string;
  PendingLdapServerMetadata?: LdapServerMetadataOutput & {
    Hosts: __listOf__string;
    RoleBase: string;
    RoleSearchMatching: string;
    ServiceAccountUsername: string;
    UserBase: string;
    UserSearchMatching: string;
  };
  PendingSecurityGroups?: string[];
  PendingStorageSize?: number;
  PubliclyAccessible?: boolean;
  SecurityGroups?: string[];
  StorageSize?: number;
  StorageType?: BrokerStorageType;
  SubnetIds?: string[];
  Tags?: { [key: string]: string | undefined };
  Users?: (UserSummary & { Username: string })[];
  DataReplicationMetadata?: DataReplicationMetadataOutput & {
    DataReplicationRole: string;
    DataReplicationCounterpart: DataReplicationCounterpart & { BrokerId: string; Region: string };
  };
  DataReplicationMode?: DataReplicationMode;
  PendingDataReplicationMetadata?: DataReplicationMetadataOutput & {
    DataReplicationRole: string;
    DataReplicationCounterpart: DataReplicationCounterpart & { BrokerId: string; Region: string };
  };
  PendingDataReplicationMode?: DataReplicationMode;
}
export type MaxResults = number;
export interface DescribeBrokerEngineTypesRequest {
  EngineType?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface EngineVersion {
  Name?: string;
}
export type __listOfEngineVersion = EngineVersion[];
const __listOfEngineVersion = /*@__PURE__*/ __L.at(__c10, 1);
export interface BrokerEngineType {
  EngineType?: EngineType;
  EngineVersions?: EngineVersion[];
}
export type __listOfBrokerEngineType = BrokerEngineType[];
const __listOfBrokerEngineType = /*@__PURE__*/ __L.at(__c9, 2);
export type __integerMin5Max100 = number;
export interface DescribeBrokerEngineTypesResponse {
  BrokerEngineTypes?: BrokerEngineType[];
  MaxResults?: number;
  NextToken?: string;
}
export interface DescribeBrokerInstanceOptionsRequest {
  EngineType?: string;
  HostInstanceType?: string;
  MaxResults?: number;
  NextToken?: string;
  StorageType?: string;
}
export interface AvailabilityZone {
  Name?: string;
}
export type __listOfAvailabilityZone = AvailabilityZone[];
const __listOfAvailabilityZone = __listOfEngineVersion as any as S.Schema<__listOfAvailabilityZone>;
export type __listOfDeploymentMode = DeploymentMode[];
const __listOfDeploymentMode = /*@__PURE__*/ __L.at(__c11, 1);
export interface BrokerInstanceOption {
  AvailabilityZones?: AvailabilityZone[];
  EngineType?: EngineType;
  HostInstanceType?: string;
  StorageType?: BrokerStorageType;
  SupportedDeploymentModes?: DeploymentMode[];
  SupportedEngineVersions?: string[];
}
export type __listOfBrokerInstanceOption = BrokerInstanceOption[];
const __listOfBrokerInstanceOption = /*@__PURE__*/ __L.at(__c11, 3);
export interface DescribeBrokerInstanceOptionsResponse {
  BrokerInstanceOptions?: BrokerInstanceOption[];
  MaxResults?: number;
  NextToken?: string;
}
export interface DescribeConfigurationRequest {
  ConfigurationId: string;
}
export interface DescribeConfigurationResponse {
  Arn?: string;
  AuthenticationStrategy?: AuthenticationStrategy;
  Created?: Date;
  Description?: string;
  EngineType?: EngineType;
  EngineVersion?: string;
  Id?: string;
  LatestRevision?: ConfigurationRevision & { Created: __timestampIso8601; Revision: number };
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeConfigurationRevisionRequest {
  ConfigurationId: string;
  ConfigurationRevision: string;
}
export interface DescribeConfigurationRevisionResponse {
  ConfigurationId?: string;
  Created?: Date;
  Data?: string;
  Description?: string;
}
export interface DescribeSharedResourcesRequest {
  BrokerId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type SharedResourceErrorCode =
  | "QUOTA_EXCEEDED"
  | "SHARE_NOT_FOUND"
  | "INVITE_FAILED"
  | "SETUP_INCOMPLETE"
  | "INTERNAL_ERROR"
  | "AZ_MISMATCH"
  | "RESOURCE_CONFIGURATION_NOT_FOUND"
  | (string & {});
export interface SharedResourceError {
  Code?: SharedResourceErrorCode;
  Message?: string;
}
export type SharedResourceStatus =
  | "AVAILABLE"
  | "SETUP_IN_PROGRESS"
  | "DELETION_IN_PROGRESS"
  | "PENDING_CREATE"
  | "PENDING_DELETE"
  | "ERROR"
  | (string & {});
export type SharedResourceType = "RESOURCE_SHARE" | "RESOURCE" | (string & {});
export interface SharedResource {
  DnsNames?: string[];
  Error?: SharedResourceError;
  ResourceArn?: string;
  ResourceShareArns?: string[];
  Status?: SharedResourceStatus;
  Type?: SharedResourceType;
}
export type __listOfSharedResource = SharedResource[];
const __listOfSharedResource = /*@__PURE__*/ __L.at(__c15, 3);
export interface DescribeSharedResourcesResponse {
  NextToken?: string;
  SharedResources?: (SharedResource & {
    ResourceArn: string;
    Status: SharedResourceStatus;
    Type: SharedResourceType;
    Error: SharedResourceError & { Code: SharedResourceErrorCode; Message: string };
  })[];
}
export interface DescribeUserRequest {
  BrokerId: string;
  Username: string;
}
export interface UserPendingChanges {
  ConsoleAccess?: boolean;
  Groups?: string[];
  PendingChange?: ChangeType;
}
export interface DescribeUserResponse {
  BrokerId?: string;
  ConsoleAccess?: boolean;
  Groups?: string[];
  Pending?: UserPendingChanges & { PendingChange: ChangeType };
  Username?: string;
  ReplicationUser?: boolean;
}
export interface ListBrokersRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface BrokerSummary {
  BrokerArn?: string;
  BrokerId?: string;
  BrokerName?: string;
  BrokerState?: BrokerState;
  Created?: Date;
  DeploymentMode?: DeploymentMode;
  EngineType?: EngineType;
  HostInstanceType?: string;
}
export type __listOfBrokerSummary = BrokerSummary[];
const __listOfBrokerSummary = /*@__PURE__*/ __L.at(__c17, 2);
export interface ListBrokersResponse {
  BrokerSummaries?: (BrokerSummary & { DeploymentMode: DeploymentMode; EngineType: EngineType })[];
  NextToken?: string;
}
export interface ListConfigurationRevisionsRequest {
  ConfigurationId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type __listOfConfigurationRevision = ConfigurationRevision[];
const __listOfConfigurationRevision = /*@__PURE__*/ __L.at(__c18, 1);
export interface ListConfigurationRevisionsResponse {
  ConfigurationId?: string;
  MaxResults?: number;
  NextToken?: string;
  Revisions?: (ConfigurationRevision & { Created: __timestampIso8601; Revision: number })[];
}
export interface ListConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface Configuration {
  Arn?: string;
  AuthenticationStrategy?: AuthenticationStrategy;
  Created?: Date;
  Description?: string;
  EngineType?: EngineType;
  EngineVersion?: string;
  Id?: string;
  LatestRevision?: ConfigurationRevision;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export type __listOfConfiguration = Configuration[];
const __listOfConfiguration = /*@__PURE__*/ __L.at(__c19, 1);
export interface ListConfigurationsResponse {
  Configurations?: (Configuration & {
    Arn: string;
    AuthenticationStrategy: AuthenticationStrategy;
    Created: __timestampIso8601;
    Description: string;
    EngineType: EngineType;
    EngineVersion: string;
    Id: string;
    LatestRevision: ConfigurationRevision & { Created: __timestampIso8601; Revision: number };
    Name: string;
  })[];
  MaxResults?: number;
  NextToken?: string;
}
export interface ListTagsRequest {
  ResourceArn: string;
}
export interface ListTagsResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface ListUsersRequest {
  BrokerId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListUsersResponse {
  BrokerId?: string;
  MaxResults?: number;
  NextToken?: string;
  Users?: (UserSummary & { Username: string })[];
}
export type PromoteMode = "SWITCHOVER" | "FAILOVER" | (string & {});
export interface PromoteRequest {
  BrokerId: string;
  Mode?: PromoteMode;
}
export interface PromoteResponse {
  BrokerId?: string;
}
export interface RebootBrokerRequest {
  BrokerId: string;
}
export interface RebootBrokerResponse {}
export interface UpdateBrokerRequest {
  AuthenticationStrategy?: AuthenticationStrategy;
  AutoMinorVersionUpgrade?: boolean;
  BrokerId: string;
  Configuration?: ConfigurationId;
  EngineVersion?: string;
  HostInstanceType?: string;
  LdapServerMetadata?: LdapServerMetadataInput;
  Logs?: Logs;
  MaintenanceWindowStartTime?: WeeklyStartTime;
  ResourceShareArns?: string[];
  SecurityGroups?: string[];
  StorageSize?: number;
  DataReplicationMode?: DataReplicationMode;
}
export interface UpdateBrokerResponse {
  AuthenticationStrategy?: AuthenticationStrategy;
  AutoMinorVersionUpgrade?: boolean;
  BrokerId?: string;
  Configuration?: ConfigurationId & { Id: string };
  EngineVersion?: string;
  HostInstanceType?: string;
  LdapServerMetadata?: LdapServerMetadataOutput & {
    Hosts: __listOf__string;
    RoleBase: string;
    RoleSearchMatching: string;
    ServiceAccountUsername: string;
    UserBase: string;
    UserSearchMatching: string;
  };
  Logs?: Logs;
  MaintenanceWindowStartTime?: WeeklyStartTime & { DayOfWeek: DayOfWeek; TimeOfDay: string };
  ResourceShareArns?: string[];
  SecurityGroups?: string[];
  DataReplicationMetadata?: DataReplicationMetadataOutput & {
    DataReplicationRole: string;
    DataReplicationCounterpart: DataReplicationCounterpart & { BrokerId: string; Region: string };
  };
  DataReplicationMode?: DataReplicationMode;
  PendingDataReplicationMetadata?: DataReplicationMetadataOutput & {
    DataReplicationRole: string;
    DataReplicationCounterpart: DataReplicationCounterpart & { BrokerId: string; Region: string };
  };
  PendingDataReplicationMode?: DataReplicationMode;
  StorageSize?: number;
}
export interface UpdateConfigurationRequest {
  ConfigurationId: string;
  Data?: string;
  Description?: string;
}
export type SanitizationWarningReason =
  | "DISALLOWED_ELEMENT_REMOVED"
  | "DISALLOWED_ATTRIBUTE_REMOVED"
  | "INVALID_ATTRIBUTE_VALUE_REMOVED"
  | (string & {});
export interface SanitizationWarning {
  AttributeName?: string;
  ElementName?: string;
  Reason?: SanitizationWarningReason;
}
export type __listOfSanitizationWarning = SanitizationWarning[];
const __listOfSanitizationWarning = /*@__PURE__*/ __L.at(__c25, 2);
export interface UpdateConfigurationResponse {
  Arn?: string;
  Created?: Date;
  Id?: string;
  LatestRevision?: ConfigurationRevision & { Created: __timestampIso8601; Revision: number };
  Name?: string;
  Warnings?: (SanitizationWarning & { Reason: SanitizationWarningReason })[];
}
export interface UpdateUserRequest {
  BrokerId: string;
  ConsoleAccess?: boolean;
  Groups?: string[];
  Password?: string | redacted.Redacted<string>;
  Username: string;
  ReplicationUser?: boolean;
}
export interface UpdateUserResponse {}
export interface ResourceShareError {
  ErrorCode?: string;
  ResourceShareArn?: string;
  Status?: string;
}
export type __listOfResourceShareError = ResourceShareError[];
const __listOfResourceShareError = /*@__PURE__*/ __L.at(__c0, 1);
export type CreateBrokerError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a broker. Note: This API is asynchronous.
 *
 * To create a broker, you must either use the AmazonMQFullAccess IAM policy or include the following EC2 permissions in your IAM policy.
 *
 * - ec2:CreateNetworkInterface
 *
 * This permission is required to allow Amazon MQ to create an elastic network interface (ENI) on behalf of your account.
 *
 * - ec2:CreateNetworkInterfacePermission
 *
 * This permission is required to attach the ENI to the broker instance.
 *
 * - ec2:DeleteNetworkInterface
 *
 * - ec2:DeleteNetworkInterfacePermission
 *
 * - ec2:DetachNetworkInterface
 *
 * - ec2:DescribeInternetGateways
 *
 * - ec2:DescribeNetworkInterfaces
 *
 * - ec2:DescribeNetworkInterfacePermissions
 *
 * - ec2:DescribeRouteTables
 *
 * - ec2:DescribeSecurityGroups
 *
 * - ec2:DescribeSubnets
 *
 * - ec2:DescribeVpcs
 *
 * For more information, see Create an IAM User and Get Your Amazon Web Services Credentials and Never Modify or Delete the Amazon MQ Elastic Network Interface in the *Amazon MQ Developer Guide*.
 */
export const createBroker: API.OperationMethod<
  CreateBrokerRequest,
  CreateBrokerResponse,
  CreateBrokerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(434, __c27, 2) as any as S.Schema<CreateBrokerRequest>,
  output: __S(435, __c27, 3) as any as S.Schema<CreateBrokerResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBroker",
}));

export type CreateConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a new configuration for the specified configuration name. Amazon MQ uses the default configuration (the engine type and version).
 */
export const createConfiguration: API.OperationMethod<
  CreateConfigurationRequest,
  CreateConfigurationResponse,
  CreateConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<CreateConfigurationRequest>,
  output: __S(529, __c33, 1) as any as S.Schema<CreateConfigurationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfiguration",
}));

export type CreateTagsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Add a tag to a resource.
 */
export const createTags: API.OperationMethod<
  CreateTagsRequest,
  CreateTagsResponse,
  CreateTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<CreateTagsRequest>,
  output: __S(576, __c36, 0) as any as S.Schema<CreateTagsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTags",
}));

export type CreateUserError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Creates an ActiveMQ user.
 *
 * Do not add personally identifiable information (PII) or other confidential or sensitive information in broker usernames. Broker usernames are accessible to other Amazon Web Services services, including CloudWatch Logs. Broker usernames are not intended to be used for private or sensitive data.
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResponse,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<CreateUserRequest>,
  output: __S(576, __c36, 0) as any as S.Schema<CreateUserResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
}));

export type DeleteBrokerError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes a broker. Note: This API is asynchronous.
 */
export const deleteBroker: API.OperationMethod<
  DeleteBrokerRequest,
  DeleteBrokerResponse,
  DeleteBrokerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<DeleteBrokerRequest>,
  output: __S(32, __c2, 0) as any as S.Schema<DeleteBrokerResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBroker",
}));

export type DeleteConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes the specified configuration.
 */
export const deleteConfiguration: API.OperationMethod<
  DeleteConfigurationRequest,
  DeleteConfigurationResponse,
  DeleteConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<DeleteConfigurationRequest>,
  output: __S(49, __c3, 1) as any as S.Schema<DeleteConfigurationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfiguration",
}));

export type DeleteTagsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Removes a tag from a resource.
 */
export const deleteTags: API.OperationMethod<
  DeleteTagsRequest,
  DeleteTagsResponse,
  DeleteTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<DeleteTagsRequest>,
  output: __S(576, __c36, 0) as any as S.Schema<DeleteTagsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
}));

export type DeleteUserError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes an ActiveMQ user.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResponse,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<DeleteUserRequest>,
  output: __S(576, __c36, 0) as any as S.Schema<DeleteUserResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
}));

export type DescribeBrokerError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Returns information about the specified broker.
 */
export const describeBroker: API.OperationMethod<
  DescribeBrokerRequest,
  DescribeBrokerResponse,
  DescribeBrokerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<DescribeBrokerRequest>,
  output: __S(104, __c6, 8) as any as S.Schema<DescribeBrokerResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBroker",
}));

export type DescribeBrokerEngineTypesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Describe available engine types and versions.
 */
export const describeBrokerEngineTypes: API.OperationMethod<
  DescribeBrokerEngineTypesRequest,
  DescribeBrokerEngineTypesResponse,
  DescribeBrokerEngineTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<DescribeBrokerEngineTypesRequest>,
  output: __S(147, __c9, 3) as any as S.Schema<DescribeBrokerEngineTypesResponse>,
  errors: [BadRequestException, ForbiddenException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBrokerEngineTypes",
}));

export type DescribeBrokerInstanceOptionsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Describe available broker instance options.
 */
export const describeBrokerInstanceOptions: API.OperationMethod<
  DescribeBrokerInstanceOptionsRequest,
  DescribeBrokerInstanceOptionsResponse,
  DescribeBrokerInstanceOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<DescribeBrokerInstanceOptionsRequest>,
  output: __S(180, __c11, 4) as any as S.Schema<DescribeBrokerInstanceOptionsResponse>,
  errors: [BadRequestException, ForbiddenException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBrokerInstanceOptions",
}));

export type DescribeConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Returns information about the specified configuration.
 */
export const describeConfiguration: API.OperationMethod<
  DescribeConfigurationRequest,
  DescribeConfigurationResponse,
  DescribeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<DescribeConfigurationRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<DescribeConfigurationResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfiguration",
}));

export type DescribeConfigurationRevisionError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Returns the specified configuration revision for the specified configuration.
 */
export const describeConfigurationRevision: API.OperationMethod<
  DescribeConfigurationRevisionRequest,
  DescribeConfigurationRevisionResponse,
  DescribeConfigurationRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<DescribeConfigurationRevisionRequest>,
  output: __S(225, __c14, 1) as any as S.Schema<DescribeConfigurationRevisionResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigurationRevision",
}));

export type DescribeSharedResourcesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Returns the resources shared to a broker.
 */
export const describeSharedResources: API.PaginatedOperationMethod<
  DescribeSharedResourcesRequest,
  DescribeSharedResourcesResponse,
  DescribeSharedResourcesError,
  Credentials | HttpClient.HttpClient,
  SharedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<DescribeSharedResourcesRequest>,
  output: __S(244, __c15, 4) as any as S.Schema<DescribeSharedResourcesResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSharedResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SharedResources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeUserError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Returns information about an ActiveMQ user.
 */
export const describeUser: API.OperationMethod<
  DescribeUserRequest,
  DescribeUserResponse,
  DescribeUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<DescribeUserRequest>,
  output: __S(258, __c16, 2) as any as S.Schema<DescribeUserResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUser",
}));

export type ListBrokersError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns a list of all brokers.
 */
export const listBrokers: API.PaginatedOperationMethod<
  ListBrokersRequest,
  ListBrokersResponse,
  ListBrokersError,
  Credentials | HttpClient.HttpClient,
  BrokerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<ListBrokersRequest>,
  output: __S(275, __c17, 3) as any as S.Schema<ListBrokersResponse>,
  errors: [BadRequestException, ForbiddenException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBrokers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BrokerSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConfigurationRevisionsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Returns a list of all revisions for the specified configuration.
 */
export const listConfigurationRevisions: API.OperationMethod<
  ListConfigurationRevisionsRequest,
  ListConfigurationRevisionsResponse,
  ListConfigurationRevisionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<ListConfigurationRevisionsRequest>,
  output: __S(290, __c18, 2) as any as S.Schema<ListConfigurationRevisionsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationRevisions",
}));

export type ListConfigurationsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns a list of all configurations.
 */
export const listConfigurations: API.OperationMethod<
  ListConfigurationsRequest,
  ListConfigurationsResponse,
  ListConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<ListConfigurationsRequest>,
  output: __S(306, __c19, 2) as any as S.Schema<ListConfigurationsResponse>,
  errors: [BadRequestException, ForbiddenException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurations",
}));

export type ListTagsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Lists tags for a resource.
 */
export const listTags: API.OperationMethod<
  ListTagsRequest,
  ListTagsResponse,
  ListTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<ListTagsRequest>,
  output: __S(321, __c20, 1) as any as S.Schema<ListTagsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
}));

export type ListUsersError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Returns a list of all ActiveMQ users.
 */
export const listUsers: API.OperationMethod<
  ListUsersRequest,
  ListUsersResponse,
  ListUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<ListUsersRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<ListUsersResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsers",
}));

export type PromoteError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Promotes a data replication replica broker to the primary broker role.
 */
export const promote: API.OperationMethod<
  PromoteRequest,
  PromoteResponse,
  PromoteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<PromoteRequest>,
  output: __S(32, __c2, 0) as any as S.Schema<PromoteResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Promote",
}));

export type RebootBrokerError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Reboots a broker. Note: This API is asynchronous.
 */
export const rebootBroker: API.OperationMethod<
  RebootBrokerRequest,
  RebootBrokerResponse,
  RebootBrokerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<RebootBrokerRequest>,
  output: __S(576, __c36, 0) as any as S.Schema<RebootBrokerResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootBroker",
}));

export type UpdateBrokerError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Adds a pending configuration change to a broker.
 */
export const updateBroker: API.OperationMethod<
  UpdateBrokerRequest,
  UpdateBrokerResponse,
  UpdateBrokerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<UpdateBrokerRequest>,
  output: __S(385, __c24, 1) as any as S.Schema<UpdateBrokerResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBroker",
}));

export type UpdateConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Updates the specified configuration.
 */
export const updateConfiguration: API.OperationMethod<
  UpdateConfigurationRequest,
  UpdateConfigurationResponse,
  UpdateConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<UpdateConfigurationRequest>,
  output: __S(403, __c25, 3) as any as S.Schema<UpdateConfigurationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfiguration",
}));

export type UpdateUserError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Updates the information for an ActiveMQ user.
 */
export const updateUser: API.OperationMethod<
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<UpdateUserRequest>,
  output: __S(576, __c36, 0) as any as S.Schema<UpdateUserResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUser",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ErrorCode: S.optional(S.String),
          ResourceShareArn: S.optional(S.String),
          Status: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ErrorCode: "errorCode",
            ResourceShareArn: "resourceShareArn",
            Status: "status",
          }),
        ),
      ).annotate({ identifier: "ResourceShareError" });
    case 1:
      return S.Array(__S(0, __c0, 0));
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BrokerId: S.String.pipe(T.HttpLabel("BrokerId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/brokers/{BrokerId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBrokerRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BrokerId: S.optional(S.String) }).pipe(S.encodeKeys({ BrokerId: "brokerId" })),
      ).annotate({ identifier: "DeleteBrokerResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationId: S.String.pipe(T.HttpLabel("ConfigurationId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/configurations/{ConfigurationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ConfigurationId: S.optional(S.String) }).pipe(
          S.encodeKeys({ ConfigurationId: "configurationId" }),
        ),
      ).annotate({ identifier: "DeleteConfigurationResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: S.optional(__listOf__string).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTagsRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BrokerId: S.String.pipe(T.HttpLabel("BrokerId")),
          Username: S.String.pipe(T.HttpLabel("Username")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/brokers/{BrokerId}/users/{Username}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteUserRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BrokerId: S.String.pipe(T.HttpLabel("BrokerId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/brokers/{BrokerId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeBrokerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ActionRequiredCode: S.optional(S.String),
          ActionRequiredInfo: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ActionRequiredCode: "actionRequiredCode",
            ActionRequiredInfo: "actionRequiredInfo",
          }),
        ),
      ).annotate({ identifier: "ActionRequired" });
    case 2:
      return S.Array(__S(97, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConsoleURL: S.optional(S.String),
          Endpoints: S.optional(__listOf__string),
          IpAddress: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ConsoleURL: "consoleURL",
            Endpoints: "endpoints",
            IpAddress: "ipAddress",
          }),
        ),
      ).annotate({ identifier: "BrokerInstance" });
    case 4:
      return S.Array(__S(99, __c6, 3));
    case 5:
      return S.Array(__S(464, __c29, 0));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Current: S.optional(__S(464, __c29, 0)),
          History: S.optional(__listOfConfigurationId),
          Pending: S.optional(__S(464, __c29, 0)),
        }).pipe(S.encodeKeys({ Current: "current", History: "history", Pending: "pending" })),
      ).annotate({ identifier: "Configurations" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Audit: S.optional(S.Boolean),
          AuditLogGroup: S.optional(S.String),
          General: S.optional(S.Boolean),
          GeneralLogGroup: S.optional(S.String),
          Pending: S.optional(__S(465, __c29, 1)),
        }).pipe(
          S.encodeKeys({
            Audit: "audit",
            AuditLogGroup: "auditLogGroup",
            General: "general",
            GeneralLogGroup: "generalLogGroup",
            Pending: "pending",
          }),
        ),
      ).annotate({ identifier: "LogsSummary" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          ActionsRequired: S.optional(__listOfActionRequired),
          AuthenticationStrategy: S.optional(S.String),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          BrokerArn: S.optional(S.String),
          BrokerId: S.optional(S.String),
          BrokerInstances: S.optional(__listOfBrokerInstance),
          BrokerName: S.optional(S.String),
          BrokerState: S.optional(S.String),
          Configurations: S.optional(__S(102, __c6, 6)),
          Created: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DeploymentMode: S.optional(S.String),
          EncryptionOptions: S.optional(__S(448, __c28, 0)),
          EngineType: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          HostInstanceType: S.optional(S.String),
          LdapServerMetadata: S.optional(__S(128, __c8, 0)),
          Logs: S.optional(__S(103, __c6, 7)),
          MaintenanceWindowStartTime: S.optional(__S(466, __c29, 2)),
          PendingAuthenticationStrategy: S.optional(S.String),
          PendingEngineVersion: S.optional(S.String),
          PendingHostInstanceType: S.optional(S.String),
          PendingLdapServerMetadata: S.optional(__S(128, __c8, 0)),
          PendingSecurityGroups: S.optional(__listOf__string),
          PendingStorageSize: S.optional(S.Number),
          PubliclyAccessible: S.optional(S.Boolean),
          SecurityGroups: S.optional(__listOf__string),
          StorageSize: S.optional(S.Number),
          StorageType: S.optional(S.String),
          SubnetIds: S.optional(__listOf__string),
          Tags: S.optional(__mapOf__string),
          Users: S.optional(__listOfUserSummary),
          DataReplicationMetadata: S.optional(__S(130, __c8, 2)),
          DataReplicationMode: S.optional(S.String),
          PendingDataReplicationMetadata: S.optional(__S(130, __c8, 2)),
          PendingDataReplicationMode: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ActionsRequired: "actionsRequired",
            AuthenticationStrategy: "authenticationStrategy",
            AutoMinorVersionUpgrade: "autoMinorVersionUpgrade",
            BrokerArn: "brokerArn",
            BrokerId: "brokerId",
            BrokerInstances: "brokerInstances",
            BrokerName: "brokerName",
            BrokerState: "brokerState",
            Configurations: "configurations",
            Created: "created",
            DeploymentMode: "deploymentMode",
            EncryptionOptions: "encryptionOptions",
            EngineType: "engineType",
            EngineVersion: "engineVersion",
            HostInstanceType: "hostInstanceType",
            LdapServerMetadata: "ldapServerMetadata",
            Logs: "logs",
            MaintenanceWindowStartTime: "maintenanceWindowStartTime",
            PendingAuthenticationStrategy: "pendingAuthenticationStrategy",
            PendingEngineVersion: "pendingEngineVersion",
            PendingHostInstanceType: "pendingHostInstanceType",
            PendingLdapServerMetadata: "pendingLdapServerMetadata",
            PendingSecurityGroups: "pendingSecurityGroups",
            PendingStorageSize: "pendingStorageSize",
            PubliclyAccessible: "publiclyAccessible",
            SecurityGroups: "securityGroups",
            StorageSize: "storageSize",
            StorageType: "storageType",
            SubnetIds: "subnetIds",
            Tags: "tags",
            Users: "users",
            DataReplicationMetadata: "dataReplicationMetadata",
            DataReplicationMode: "dataReplicationMode",
            PendingDataReplicationMetadata: "pendingDataReplicationMetadata",
            PendingDataReplicationMode: "pendingDataReplicationMode",
          }),
        ),
      ).annotate({ identifier: "DescribeBrokerResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PendingChange: S.optional(S.String), Username: S.optional(S.String) }).pipe(
          S.encodeKeys({ PendingChange: "pendingChange", Username: "username" }),
        ),
      ).annotate({ identifier: "UserSummary" });
    case 1:
      return S.Array(__S(112, __c7, 0));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Hosts: S.optional(__listOf__string),
          RoleBase: S.optional(S.String),
          RoleName: S.optional(S.String),
          RoleSearchMatching: S.optional(S.String),
          RoleSearchSubtree: S.optional(S.Boolean),
          ServiceAccountUsername: S.optional(S.String),
          UserBase: S.optional(S.String),
          UserRoleName: S.optional(S.String),
          UserSearchMatching: S.optional(S.String),
          UserSearchSubtree: S.optional(S.Boolean),
        }).pipe(
          S.encodeKeys({
            Hosts: "hosts",
            RoleBase: "roleBase",
            RoleName: "roleName",
            RoleSearchMatching: "roleSearchMatching",
            RoleSearchSubtree: "roleSearchSubtree",
            ServiceAccountUsername: "serviceAccountUsername",
            UserBase: "userBase",
            UserRoleName: "userRoleName",
            UserSearchMatching: "userSearchMatching",
            UserSearchSubtree: "userSearchSubtree",
          }),
        ),
      ).annotate({ identifier: "LdapServerMetadataOutput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ BrokerId: S.optional(S.String), Region: S.optional(S.String) }).pipe(
          S.encodeKeys({ BrokerId: "brokerId", Region: "region" }),
        ),
      ).annotate({ identifier: "DataReplicationCounterpart" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DataReplicationCounterpart: S.optional(__S(129, __c8, 1)),
          DataReplicationRole: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DataReplicationCounterpart: "dataReplicationCounterpart",
            DataReplicationRole: "dataReplicationRole",
          }),
        ),
      ).annotate({ identifier: "DataReplicationMetadataOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EngineType: S.optional(S.String).pipe(T.HttpQuery("engineType")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/broker-engine-types" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeBrokerEngineTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EngineType: S.optional(S.String),
          EngineVersions: S.optional(__listOfEngineVersion),
        }).pipe(S.encodeKeys({ EngineType: "engineType", EngineVersions: "engineVersions" })),
      ).annotate({ identifier: "BrokerEngineType" });
    case 2:
      return S.Array(__S(145, __c9, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          BrokerEngineTypes: S.optional(__listOfBrokerEngineType),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            BrokerEngineTypes: "brokerEngineTypes",
            MaxResults: "maxResults",
            NextToken: "nextToken",
          }),
        ),
      ).annotate({ identifier: "DescribeBrokerEngineTypesResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(S.encodeKeys({ Name: "name" })),
      ).annotate({ identifier: "EngineVersion" });
    case 1:
      return S.Array(__S(160, __c10, 0));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EngineType: S.optional(S.String).pipe(T.HttpQuery("engineType")),
          HostInstanceType: S.optional(S.String).pipe(T.HttpQuery("hostInstanceType")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          StorageType: S.optional(S.String).pipe(T.HttpQuery("storageType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/broker-instance-options" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeBrokerInstanceOptionsRequest" });
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZones: S.optional(__listOfAvailabilityZone),
          EngineType: S.optional(S.String),
          HostInstanceType: S.optional(S.String),
          StorageType: S.optional(S.String),
          SupportedDeploymentModes: S.optional(__listOfDeploymentMode),
          SupportedEngineVersions: S.optional(__listOf__string),
        }).pipe(
          S.encodeKeys({
            AvailabilityZones: "availabilityZones",
            EngineType: "engineType",
            HostInstanceType: "hostInstanceType",
            StorageType: "storageType",
            SupportedDeploymentModes: "supportedDeploymentModes",
            SupportedEngineVersions: "supportedEngineVersions",
          }),
        ),
      ).annotate({ identifier: "BrokerInstanceOption" });
    case 3:
      return S.Array(__S(178, __c11, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          BrokerInstanceOptions: S.optional(__listOfBrokerInstanceOption),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            BrokerInstanceOptions: "brokerInstanceOptions",
            MaxResults: "maxResults",
            NextToken: "nextToken",
          }),
        ),
      ).annotate({ identifier: "DescribeBrokerInstanceOptionsResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationId: S.String.pipe(T.HttpLabel("ConfigurationId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/configurations/{ConfigurationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeConfigurationRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          AuthenticationStrategy: S.optional(S.String),
          Created: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Description: S.optional(S.String),
          EngineType: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          Id: S.optional(S.String),
          LatestRevision: S.optional(__S(544, __c34, 0)),
          Name: S.optional(S.String),
          Tags: S.optional(__mapOf__string),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            AuthenticationStrategy: "authenticationStrategy",
            Created: "created",
            Description: "description",
            EngineType: "engineType",
            EngineVersion: "engineVersion",
            Id: "id",
            LatestRevision: "latestRevision",
            Name: "name",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "DescribeConfigurationResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationId: S.String.pipe(T.HttpLabel("ConfigurationId")),
          ConfigurationRevision: S.String.pipe(T.HttpLabel("ConfigurationRevision")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/configurations/{ConfigurationId}/revisions/{ConfigurationRevision}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeConfigurationRevisionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConfigurationId: S.optional(S.String),
          Created: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Data: S.optional(S.String),
          Description: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ConfigurationId: "configurationId",
            Created: "created",
            Data: "data",
            Description: "description",
          }),
        ),
      ).annotate({ identifier: "DescribeConfigurationRevisionResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BrokerId: S.String.pipe(T.HttpLabel("BrokerId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/brokers/{BrokerId}/shared-resources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeSharedResourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(S.String), Message: S.optional(S.String) }).pipe(
          S.encodeKeys({ Code: "code", Message: "message" }),
        ),
      ).annotate({ identifier: "SharedResourceError" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DnsNames: S.optional(__listOf__string),
          Error: S.optional(__S(241, __c15, 1)),
          ResourceArn: S.optional(S.String),
          ResourceShareArns: S.optional(__listOf__string),
          Status: S.optional(S.String),
          Type: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DnsNames: "dnsNames",
            Error: "error",
            ResourceArn: "resourceArn",
            ResourceShareArns: "resourceShareArns",
            Status: "status",
            Type: "type",
          }),
        ),
      ).annotate({ identifier: "SharedResource" });
    case 3:
      return S.Array(__S(242, __c15, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          SharedResources: S.optional(__listOfSharedResource),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", SharedResources: "sharedResources" })),
      ).annotate({ identifier: "DescribeSharedResourcesResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BrokerId: S.String.pipe(T.HttpLabel("BrokerId")),
          Username: S.String.pipe(T.HttpLabel("Username")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/brokers/{BrokerId}/users/{Username}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeUserRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConsoleAccess: S.optional(S.Boolean),
          Groups: S.optional(__listOf__string),
          PendingChange: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ConsoleAccess: "consoleAccess",
            Groups: "groups",
            PendingChange: "pendingChange",
          }),
        ),
      ).annotate({ identifier: "UserPendingChanges" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          BrokerId: S.optional(S.String),
          ConsoleAccess: S.optional(S.Boolean),
          Groups: S.optional(__listOf__string),
          Pending: S.optional(__S(257, __c16, 1)),
          Username: S.optional(S.String),
          ReplicationUser: S.optional(S.Boolean),
        }).pipe(
          S.encodeKeys({
            BrokerId: "brokerId",
            ConsoleAccess: "consoleAccess",
            Groups: "groups",
            Pending: "pending",
            Username: "username",
            ReplicationUser: "replicationUser",
          }),
        ),
      ).annotate({ identifier: "DescribeUserResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/v1/brokers" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListBrokersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BrokerArn: S.optional(S.String),
          BrokerId: S.optional(S.String),
          BrokerName: S.optional(S.String),
          BrokerState: S.optional(S.String),
          Created: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DeploymentMode: S.optional(S.String),
          EngineType: S.optional(S.String),
          HostInstanceType: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            BrokerArn: "brokerArn",
            BrokerId: "brokerId",
            BrokerName: "brokerName",
            BrokerState: "brokerState",
            Created: "created",
            DeploymentMode: "deploymentMode",
            EngineType: "engineType",
            HostInstanceType: "hostInstanceType",
          }),
        ),
      ).annotate({ identifier: "BrokerSummary" });
    case 2:
      return S.Array(__S(273, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          BrokerSummaries: S.optional(__listOfBrokerSummary),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ BrokerSummaries: "brokerSummaries", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListBrokersResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationId: S.String.pipe(T.HttpLabel("ConfigurationId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/configurations/{ConfigurationId}/revisions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConfigurationRevisionsRequest" });
    case 1:
      return S.Array(__S(544, __c34, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConfigurationId: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Revisions: S.optional(__listOfConfigurationRevision),
        }).pipe(
          S.encodeKeys({
            ConfigurationId: "configurationId",
            MaxResults: "maxResults",
            NextToken: "nextToken",
            Revisions: "revisions",
          }),
        ),
      ).annotate({ identifier: "ListConfigurationRevisionsResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/configurations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListConfigurationsRequest" });
    case 1:
      return S.Array(__S(208, __c13, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Configurations: S.optional(__listOfConfiguration),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Configurations: "configurations",
            MaxResults: "maxResults",
            NextToken: "nextToken",
          }),
        ),
      ).annotate({ identifier: "ListConfigurationsResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__mapOf__string) }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "ListTagsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BrokerId: S.String.pipe(T.HttpLabel("BrokerId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/brokers/{BrokerId}/users" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListUsersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BrokerId: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Users: S.optional(__listOfUserSummary),
        }).pipe(
          S.encodeKeys({
            BrokerId: "brokerId",
            MaxResults: "maxResults",
            NextToken: "nextToken",
            Users: "users",
          }),
        ),
      ).annotate({ identifier: "ListUsersResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BrokerId: S.String.pipe(T.HttpLabel("BrokerId")), Mode: S.optional(S.String) })
          .pipe(S.encodeKeys({ Mode: "mode" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/brokers/{BrokerId}/promote" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "PromoteRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BrokerId: S.String.pipe(T.HttpLabel("BrokerId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/brokers/{BrokerId}/reboot" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RebootBrokerRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationStrategy: S.optional(S.String),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          BrokerId: S.String.pipe(T.HttpLabel("BrokerId")),
          Configuration: S.optional(__S(464, __c29, 0)),
          EngineVersion: S.optional(S.String),
          HostInstanceType: S.optional(S.String),
          LdapServerMetadata: S.optional(__S(480, __c30, 0)),
          Logs: S.optional(__S(465, __c29, 1)),
          MaintenanceWindowStartTime: S.optional(__S(466, __c29, 2)),
          ResourceShareArns: S.optional(__listOf__string),
          SecurityGroups: S.optional(__listOf__string),
          StorageSize: S.optional(S.Number),
          DataReplicationMode: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              AuthenticationStrategy: "authenticationStrategy",
              AutoMinorVersionUpgrade: "autoMinorVersionUpgrade",
              Configuration: "configuration",
              EngineVersion: "engineVersion",
              HostInstanceType: "hostInstanceType",
              LdapServerMetadata: "ldapServerMetadata",
              Logs: "logs",
              MaintenanceWindowStartTime: "maintenanceWindowStartTime",
              ResourceShareArns: "resourceShareArns",
              SecurityGroups: "securityGroups",
              StorageSize: "storageSize",
              DataReplicationMode: "dataReplicationMode",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/brokers/{BrokerId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateBrokerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AuthenticationStrategy: S.optional(S.String),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          BrokerId: S.optional(S.String),
          Configuration: S.optional(__S(464, __c29, 0)),
          EngineVersion: S.optional(S.String),
          HostInstanceType: S.optional(S.String),
          LdapServerMetadata: S.optional(__S(128, __c8, 0)),
          Logs: S.optional(__S(465, __c29, 1)),
          MaintenanceWindowStartTime: S.optional(__S(466, __c29, 2)),
          ResourceShareArns: S.optional(__listOf__string),
          SecurityGroups: S.optional(__listOf__string),
          DataReplicationMetadata: S.optional(__S(130, __c8, 2)),
          DataReplicationMode: S.optional(S.String),
          PendingDataReplicationMetadata: S.optional(__S(130, __c8, 2)),
          PendingDataReplicationMode: S.optional(S.String),
          StorageSize: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            AuthenticationStrategy: "authenticationStrategy",
            AutoMinorVersionUpgrade: "autoMinorVersionUpgrade",
            BrokerId: "brokerId",
            Configuration: "configuration",
            EngineVersion: "engineVersion",
            HostInstanceType: "hostInstanceType",
            LdapServerMetadata: "ldapServerMetadata",
            Logs: "logs",
            MaintenanceWindowStartTime: "maintenanceWindowStartTime",
            ResourceShareArns: "resourceShareArns",
            SecurityGroups: "securityGroups",
            DataReplicationMetadata: "dataReplicationMetadata",
            DataReplicationMode: "dataReplicationMode",
            PendingDataReplicationMetadata: "pendingDataReplicationMetadata",
            PendingDataReplicationMode: "pendingDataReplicationMode",
            StorageSize: "storageSize",
          }),
        ),
      ).annotate({ identifier: "UpdateBrokerResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationId: S.String.pipe(T.HttpLabel("ConfigurationId")),
          Data: S.optional(S.String),
          Description: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ Data: "data", Description: "description" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/configurations/{ConfigurationId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AttributeName: S.optional(S.String),
          ElementName: S.optional(S.String),
          Reason: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AttributeName: "attributeName",
            ElementName: "elementName",
            Reason: "reason",
          }),
        ),
      ).annotate({ identifier: "SanitizationWarning" });
    case 2:
      return S.Array(__S(401, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Created: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Id: S.optional(S.String),
          LatestRevision: S.optional(__S(544, __c34, 0)),
          Name: S.optional(S.String),
          Warnings: S.optional(__listOfSanitizationWarning),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            Created: "created",
            Id: "id",
            LatestRevision: "latestRevision",
            Name: "name",
            Warnings: "warnings",
          }),
        ),
      ).annotate({ identifier: "UpdateConfigurationResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BrokerId: S.String.pipe(T.HttpLabel("BrokerId")),
          ConsoleAccess: S.optional(S.Boolean),
          Groups: S.optional(__listOf__string),
          Password: S.optional(SensitiveString),
          Username: S.String.pipe(T.HttpLabel("Username")),
          ReplicationUser: S.optional(S.Boolean),
        })
          .pipe(
            S.encodeKeys({
              ConsoleAccess: "consoleAccess",
              Groups: "groups",
              Password: "password",
              ReplicationUser: "replicationUser",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v1/brokers/{BrokerId}/users/{Username}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateUserRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConsoleAccess: S.optional(S.Boolean),
          Groups: S.optional(__listOf__string),
          Password: S.optional(SensitiveString),
          Username: S.optional(S.String),
          ReplicationUser: S.optional(S.Boolean),
        }).pipe(
          S.encodeKeys({
            ConsoleAccess: "consoleAccess",
            Groups: "groups",
            Password: "password",
            Username: "username",
            ReplicationUser: "replicationUser",
          }),
        ),
      ).annotate({ identifier: "User" });
    case 1:
      return S.Array(__S(432, __c27, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AuthenticationStrategy: S.optional(S.String),
          AutoMinorVersionUpgrade: S.optional(S.Boolean),
          BrokerName: S.optional(S.String),
          Configuration: S.optional(__S(464, __c29, 0)),
          CreatorRequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
          DeploymentMode: S.optional(S.String),
          EncryptionOptions: S.optional(__S(448, __c28, 0)),
          EngineType: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          HostInstanceType: S.optional(S.String),
          LdapServerMetadata: S.optional(__S(480, __c30, 0)),
          Logs: S.optional(__S(465, __c29, 1)),
          MaintenanceWindowStartTime: S.optional(__S(466, __c29, 2)),
          PubliclyAccessible: S.optional(S.Boolean),
          SecurityGroups: S.optional(__listOf__string),
          StorageSize: S.optional(S.Number),
          StorageType: S.optional(S.String),
          SubnetIds: S.optional(__listOf__string),
          Tags: S.optional(__mapOf__string),
          Users: S.optional(__listOfUser),
          DataReplicationMode: S.optional(S.String),
          DataReplicationPrimaryBrokerArn: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              AuthenticationStrategy: "authenticationStrategy",
              AutoMinorVersionUpgrade: "autoMinorVersionUpgrade",
              BrokerName: "brokerName",
              Configuration: "configuration",
              CreatorRequestId: "creatorRequestId",
              DeploymentMode: "deploymentMode",
              EncryptionOptions: "encryptionOptions",
              EngineType: "engineType",
              EngineVersion: "engineVersion",
              HostInstanceType: "hostInstanceType",
              LdapServerMetadata: "ldapServerMetadata",
              Logs: "logs",
              MaintenanceWindowStartTime: "maintenanceWindowStartTime",
              PubliclyAccessible: "publiclyAccessible",
              SecurityGroups: "securityGroups",
              StorageSize: "storageSize",
              StorageType: "storageType",
              SubnetIds: "subnetIds",
              Tags: "tags",
              Users: "users",
              DataReplicationMode: "dataReplicationMode",
              DataReplicationPrimaryBrokerArn: "dataReplicationPrimaryBrokerArn",
            }),
          )
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/v1/brokers" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "CreateBrokerRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ BrokerArn: S.optional(S.String), BrokerId: S.optional(S.String) }).pipe(
          S.encodeKeys({ BrokerArn: "brokerArn", BrokerId: "brokerId" }),
        ),
      ).annotate({ identifier: "CreateBrokerResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ KmsKeyId: S.optional(S.String), UseAwsOwnedKey: S.optional(S.Boolean) }).pipe(
          S.encodeKeys({ KmsKeyId: "kmsKeyId", UseAwsOwnedKey: "useAwsOwnedKey" }),
        ),
      ).annotate({ identifier: "EncryptionOptions" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String), Revision: S.optional(S.Number) }).pipe(
          S.encodeKeys({ Id: "id", Revision: "revision" }),
        ),
      ).annotate({ identifier: "ConfigurationId" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Audit: S.optional(S.Boolean), General: S.optional(S.Boolean) }).pipe(
          S.encodeKeys({ Audit: "audit", General: "general" }),
        ),
      ).annotate({ identifier: "Logs" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DayOfWeek: S.optional(S.String),
          TimeOfDay: S.optional(S.String),
          TimeZone: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ DayOfWeek: "dayOfWeek", TimeOfDay: "timeOfDay", TimeZone: "timeZone" }),
        ),
      ).annotate({ identifier: "WeeklyStartTime" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Hosts: S.optional(__listOf__string),
          RoleBase: S.optional(S.String),
          RoleName: S.optional(S.String),
          RoleSearchMatching: S.optional(S.String),
          RoleSearchSubtree: S.optional(S.Boolean),
          ServiceAccountPassword: S.optional(SensitiveString),
          ServiceAccountUsername: S.optional(S.String),
          UserBase: S.optional(S.String),
          UserRoleName: S.optional(S.String),
          UserSearchMatching: S.optional(S.String),
          UserSearchSubtree: S.optional(S.Boolean),
        }).pipe(
          S.encodeKeys({
            Hosts: "hosts",
            RoleBase: "roleBase",
            RoleName: "roleName",
            RoleSearchMatching: "roleSearchMatching",
            RoleSearchSubtree: "roleSearchSubtree",
            ServiceAccountPassword: "serviceAccountPassword",
            ServiceAccountUsername: "serviceAccountUsername",
            UserBase: "userBase",
            UserRoleName: "userRoleName",
            UserSearchMatching: "userSearchMatching",
            UserSearchSubtree: "userSearchSubtree",
          }),
        ),
      ).annotate({ identifier: "LdapServerMetadataInput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationStrategy: S.optional(S.String),
          EngineType: S.optional(S.String),
          EngineVersion: S.optional(S.String),
          Name: S.optional(S.String),
          Tags: S.optional(__mapOf__string),
        })
          .pipe(
            S.encodeKeys({
              AuthenticationStrategy: "authenticationStrategy",
              EngineType: "engineType",
              EngineVersion: "engineVersion",
              Name: "name",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/configurations" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          AuthenticationStrategy: S.optional(S.String),
          Created: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Id: S.optional(S.String),
          LatestRevision: S.optional(__S(544, __c34, 0)),
          Name: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            AuthenticationStrategy: "authenticationStrategy",
            Created: "created",
            Id: "id",
            LatestRevision: "latestRevision",
            Name: "name",
          }),
        ),
      ).annotate({ identifier: "CreateConfigurationResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Created: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Description: S.optional(S.String),
          Revision: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({ Created: "created", Description: "description", Revision: "revision" }),
        ),
      ).annotate({ identifier: "ConfigurationRevision" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: S.optional(__mapOf__string),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/tags/{ResourceArn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateTagsRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "CreateTagsResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BrokerId: S.String.pipe(T.HttpLabel("BrokerId")),
          ConsoleAccess: S.optional(S.Boolean),
          Groups: S.optional(__listOf__string),
          Password: S.optional(SensitiveString),
          Username: S.String.pipe(T.HttpLabel("Username")),
          ReplicationUser: S.optional(S.Boolean),
        })
          .pipe(
            S.encodeKeys({
              ConsoleAccess: "consoleAccess",
              Groups: "groups",
              Password: "password",
              ReplicationUser: "replicationUser",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/brokers/{BrokerId}/users/{Username}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateUserRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
