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
  sdkId: "mq",
  target: "mq",
  version: "2017-11-27",
  sigv4: "mq",
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
                `https://mq-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://mq-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://mq.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://mq.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    {
      status: 400,
      renames: {
        ErrorAttribute: "errorAttribute",
        Message: "message",
        ResourceShareErrors: "resourceShareErrors",
      },
    },
  )<{
    readonly ErrorAttribute?: string;
    readonly message?: string;
    readonly ResourceShareErrors?: ResourceShareError[];
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
    renames: {
      ErrorAttribute: "errorAttribute",
      Message: "message",
      ResourceShareErrors: "resourceShareErrors",
    },
  })<{
    readonly ErrorAttribute?: string;
    readonly message?: string;
    readonly ResourceShareErrors?: ResourceShareError[];
  }> {}
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
    renames: {
      ErrorAttribute: "errorAttribute",
      Message: "message",
      ResourceShareErrors: "resourceShareErrors",
    },
  })<{
    readonly ErrorAttribute?: string;
    readonly message?: string;
    readonly ResourceShareErrors?: ResourceShareError[];
  }> {}
export class InternalServerErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerErrorException",
    ["ServerError"],
    {
      status: 500,
      renames: {
        ErrorAttribute: "errorAttribute",
        Message: "message",
        ResourceShareErrors: "resourceShareErrors",
      },
    },
  )<{
    readonly ErrorAttribute?: string;
    readonly message?: string;
    readonly ResourceShareErrors?: ResourceShareError[];
  }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    {
      status: 404,
      renames: {
        ErrorAttribute: "errorAttribute",
        Message: "message",
        ResourceShareErrors: "resourceShareErrors",
      },
    },
  )<{
    readonly ErrorAttribute?: string;
    readonly message?: string;
    readonly ResourceShareErrors?: ResourceShareError[];
  }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
    renames: {
      ErrorAttribute: "errorAttribute",
      Message: "message",
      ResourceShareErrors: "resourceShareErrors",
    },
  })<{
    readonly ErrorAttribute?: string;
    readonly message?: string;
    readonly ResourceShareErrors?: ResourceShareError[];
  }> {}
export type AuthenticationStrategy =
  | "SIMPLE"
  | "LDAP"
  | "CONFIG_MANAGED"
  | (string & {});
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
export interface User {
  ConsoleAccess?: boolean;
  Groups?: string[];
  Password?: string | redacted.Redacted<string>;
  Username?: string;
  ReplicationUser?: boolean;
}
export type __listOfUser = User[];
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
  LatestRevision?: ConfigurationRevision & {
    Created: __timestampIso8601;
    Revision: number;
  };
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
export interface BrokerInstance {
  ConsoleURL?: string;
  Endpoints?: string[];
  IpAddress?: string;
}
export type __listOfBrokerInstance = BrokerInstance[];
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
  MaintenanceWindowStartTime?: WeeklyStartTime & {
    DayOfWeek: DayOfWeek;
    TimeOfDay: string;
  };
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
    DataReplicationCounterpart: DataReplicationCounterpart & {
      BrokerId: string;
      Region: string;
    };
  };
  DataReplicationMode?: DataReplicationMode;
  PendingDataReplicationMetadata?: DataReplicationMetadataOutput & {
    DataReplicationRole: string;
    DataReplicationCounterpart: DataReplicationCounterpart & {
      BrokerId: string;
      Region: string;
    };
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
export interface BrokerEngineType {
  EngineType?: EngineType;
  EngineVersions?: EngineVersion[];
}
export type __listOfBrokerEngineType = BrokerEngineType[];
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
export type __listOfDeploymentMode = DeploymentMode[];
export interface BrokerInstanceOption {
  AvailabilityZones?: AvailabilityZone[];
  EngineType?: EngineType;
  HostInstanceType?: string;
  StorageType?: BrokerStorageType;
  SupportedDeploymentModes?: DeploymentMode[];
  SupportedEngineVersions?: string[];
}
export type __listOfBrokerInstanceOption = BrokerInstanceOption[];
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
  LatestRevision?: ConfigurationRevision & {
    Created: __timestampIso8601;
    Revision: number;
  };
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
export interface DescribeSharedResourcesResponse {
  NextToken?: string;
  SharedResources?: (SharedResource & {
    ResourceArn: string;
    Status: SharedResourceStatus;
    Type: SharedResourceType;
    Error: SharedResourceError & {
      Code: SharedResourceErrorCode;
      Message: string;
    };
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
export interface ListBrokersResponse {
  BrokerSummaries?: (BrokerSummary & {
    DeploymentMode: DeploymentMode;
    EngineType: EngineType;
  })[];
  NextToken?: string;
}
export interface ListConfigurationRevisionsRequest {
  ConfigurationId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type __listOfConfigurationRevision = ConfigurationRevision[];
export interface ListConfigurationRevisionsResponse {
  ConfigurationId?: string;
  MaxResults?: number;
  NextToken?: string;
  Revisions?: (ConfigurationRevision & {
    Created: __timestampIso8601;
    Revision: number;
  })[];
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
export interface ListConfigurationsResponse {
  Configurations?: (Configuration & {
    Arn: string;
    AuthenticationStrategy: AuthenticationStrategy;
    Created: __timestampIso8601;
    Description: string;
    EngineType: EngineType;
    EngineVersion: string;
    Id: string;
    LatestRevision: ConfigurationRevision & {
      Created: __timestampIso8601;
      Revision: number;
    };
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
  MaintenanceWindowStartTime?: WeeklyStartTime & {
    DayOfWeek: DayOfWeek;
    TimeOfDay: string;
  };
  ResourceShareArns?: string[];
  SecurityGroups?: string[];
  DataReplicationMetadata?: DataReplicationMetadataOutput & {
    DataReplicationRole: string;
    DataReplicationCounterpart: DataReplicationCounterpart & {
      BrokerId: string;
      Region: string;
    };
  };
  DataReplicationMode?: DataReplicationMode;
  PendingDataReplicationMetadata?: DataReplicationMetadataOutput & {
    DataReplicationRole: string;
    DataReplicationCounterpart: DataReplicationCounterpart & {
      BrokerId: string;
      Region: string;
    };
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
export interface UpdateConfigurationResponse {
  Arn?: string;
  Created?: Date;
  Id?: string;
  LatestRevision?: ConfigurationRevision & {
    Created: __timestampIso8601;
    Revision: number;
  };
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
  descriptor: {
    service: svc,
    http: "POST /v1/brokers",
    input: {
      AuthenticationStrategy: D.m({ wire: "authenticationStrategy" }),
      AutoMinorVersionUpgrade: D.m({ wire: "autoMinorVersionUpgrade" }),
      BrokerName: D.m({ wire: "brokerName" }),
      Configuration: D.m({ wire: "configuration", shape: i_ConfigurationId }),
      CreatorRequestId: D.m({ idempotency: true, wire: "creatorRequestId" }),
      DeploymentMode: D.m({ wire: "deploymentMode" }),
      EncryptionOptions: D.m({
        wire: "encryptionOptions",
        shape: {
          KmsKeyId: D.m({ wire: "kmsKeyId" }),
          UseAwsOwnedKey: D.m({ wire: "useAwsOwnedKey" }),
        },
      }),
      EngineType: D.m({ wire: "engineType" }),
      EngineVersion: D.m({ wire: "engineVersion" }),
      HostInstanceType: D.m({ wire: "hostInstanceType" }),
      LdapServerMetadata: D.m({
        wire: "ldapServerMetadata",
        shape: i_LdapServerMetadataInput,
      }),
      Logs: D.m({ wire: "logs", shape: i_Logs }),
      MaintenanceWindowStartTime: D.m({
        wire: "maintenanceWindowStartTime",
        shape: i_WeeklyStartTime,
      }),
      PubliclyAccessible: D.m({ wire: "publiclyAccessible" }),
      SecurityGroups: D.m({ wire: "securityGroups" }),
      StorageSize: D.m({ wire: "storageSize" }),
      StorageType: D.m({ wire: "storageType" }),
      SubnetIds: D.m({ wire: "subnetIds" }),
      Tags: D.m({ wire: "tags" }),
      Users: D.m({
        wire: "users",
        shape: D.list({
          ConsoleAccess: D.m({ wire: "consoleAccess" }),
          Groups: D.m({ wire: "groups" }),
          Password: D.m({ wire: "password" }),
          Username: D.m({ wire: "username" }),
          ReplicationUser: D.m({ wire: "replicationUser" }),
        }),
      }),
      DataReplicationMode: D.m({ wire: "dataReplicationMode" }),
      DataReplicationPrimaryBrokerArn: D.m({
        wire: "dataReplicationPrimaryBrokerArn",
      }),
    },
    output: {
      BrokerArn: D.m({ wire: "brokerArn" }),
      BrokerId: D.m({ wire: "brokerId" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/configurations",
    input: {
      AuthenticationStrategy: D.m({ wire: "authenticationStrategy" }),
      EngineType: D.m({ wire: "engineType" }),
      EngineVersion: D.m({ wire: "engineVersion" }),
      Name: D.m({ wire: "name" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      AuthenticationStrategy: D.m({ wire: "authenticationStrategy" }),
      Created: D.m({ wire: "created", shape: D.ts }),
      Id: D.m({ wire: "id" }),
      LatestRevision: D.m({
        wire: "latestRevision",
        shape: o_ConfigurationRevision,
      }),
      Name: D.m({ wire: "name" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: D.m({ wire: "tags" }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTags",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/brokers/{BrokerId}/users/{Username}",
    input: {
      BrokerId: 0,
      ConsoleAccess: D.m({ wire: "consoleAccess" }),
      Groups: D.m({ wire: "groups" }),
      Password: D.m({ wire: "password" }),
      Username: 0,
      ReplicationUser: D.m({ wire: "replicationUser" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/brokers/{BrokerId}",
    input: { BrokerId: 0 },
    output: { BrokerId: D.m({ wire: "brokerId" }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBroker",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/configurations/{ConfigurationId}",
    input: { ConfigurationId: 0 },
    output: { ConfigurationId: D.m({ wire: "configurationId" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/brokers/{BrokerId}/users/{Username}",
    input: { BrokerId: 0, Username: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/brokers/{BrokerId}",
    input: { BrokerId: 0 },
    output: {
      ActionsRequired: D.m({
        wire: "actionsRequired",
        shape: D.list({
          ActionRequiredCode: D.m({ wire: "actionRequiredCode" }),
          ActionRequiredInfo: D.m({ wire: "actionRequiredInfo" }),
        }),
      }),
      AuthenticationStrategy: D.m({ wire: "authenticationStrategy" }),
      AutoMinorVersionUpgrade: D.m({ wire: "autoMinorVersionUpgrade" }),
      BrokerArn: D.m({ wire: "brokerArn" }),
      BrokerId: D.m({ wire: "brokerId" }),
      BrokerInstances: D.m({
        wire: "brokerInstances",
        shape: D.list({
          ConsoleURL: D.m({ wire: "consoleURL" }),
          Endpoints: D.m({ wire: "endpoints" }),
          IpAddress: D.m({ wire: "ipAddress" }),
        }),
      }),
      BrokerName: D.m({ wire: "brokerName" }),
      BrokerState: D.m({ wire: "brokerState" }),
      Configurations: D.m({
        wire: "configurations",
        shape: {
          Current: D.m({ wire: "current", shape: o_ConfigurationId }),
          History: D.m({ wire: "history", shape: D.list(o_ConfigurationId) }),
          Pending: D.m({ wire: "pending", shape: o_ConfigurationId }),
        },
      }),
      Created: D.m({ wire: "created", shape: D.ts }),
      DeploymentMode: D.m({ wire: "deploymentMode" }),
      EncryptionOptions: D.m({
        wire: "encryptionOptions",
        shape: {
          KmsKeyId: D.m({ wire: "kmsKeyId" }),
          UseAwsOwnedKey: D.m({ wire: "useAwsOwnedKey" }),
        },
      }),
      EngineType: D.m({ wire: "engineType" }),
      EngineVersion: D.m({ wire: "engineVersion" }),
      HostInstanceType: D.m({ wire: "hostInstanceType" }),
      LdapServerMetadata: D.m({
        wire: "ldapServerMetadata",
        shape: o_LdapServerMetadataOutput,
      }),
      Logs: D.m({
        wire: "logs",
        shape: {
          Audit: D.m({ wire: "audit" }),
          AuditLogGroup: D.m({ wire: "auditLogGroup" }),
          General: D.m({ wire: "general" }),
          GeneralLogGroup: D.m({ wire: "generalLogGroup" }),
          Pending: D.m({
            wire: "pending",
            shape: {
              Audit: D.m({ wire: "audit" }),
              General: D.m({ wire: "general" }),
            },
          }),
        },
      }),
      MaintenanceWindowStartTime: D.m({
        wire: "maintenanceWindowStartTime",
        shape: o_WeeklyStartTime,
      }),
      PendingAuthenticationStrategy: D.m({
        wire: "pendingAuthenticationStrategy",
      }),
      PendingEngineVersion: D.m({ wire: "pendingEngineVersion" }),
      PendingHostInstanceType: D.m({ wire: "pendingHostInstanceType" }),
      PendingLdapServerMetadata: D.m({
        wire: "pendingLdapServerMetadata",
        shape: o_LdapServerMetadataOutput,
      }),
      PendingSecurityGroups: D.m({ wire: "pendingSecurityGroups" }),
      PendingStorageSize: D.m({ wire: "pendingStorageSize" }),
      PubliclyAccessible: D.m({ wire: "publiclyAccessible" }),
      SecurityGroups: D.m({ wire: "securityGroups" }),
      StorageSize: D.m({ wire: "storageSize" }),
      StorageType: D.m({ wire: "storageType" }),
      SubnetIds: D.m({ wire: "subnetIds" }),
      Tags: D.m({ wire: "tags" }),
      Users: D.m({ wire: "users", shape: D.list(o_UserSummary) }),
      DataReplicationMetadata: D.m({
        wire: "dataReplicationMetadata",
        shape: o_DataReplicationMetadataOutput,
      }),
      DataReplicationMode: D.m({ wire: "dataReplicationMode" }),
      PendingDataReplicationMetadata: D.m({
        wire: "pendingDataReplicationMetadata",
        shape: o_DataReplicationMetadataOutput,
      }),
      PendingDataReplicationMode: D.m({ wire: "pendingDataReplicationMode" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBroker",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/broker-engine-types",
    input: {
      EngineType: D.m({ query: "engineType" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      BrokerEngineTypes: D.m({
        wire: "brokerEngineTypes",
        shape: D.list({
          EngineType: D.m({ wire: "engineType" }),
          EngineVersions: D.m({
            wire: "engineVersions",
            shape: D.list({ Name: D.m({ wire: "name" }) }),
          }),
        }),
      }),
      MaxResults: D.m({ wire: "maxResults" }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBrokerEngineTypes",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/broker-instance-options",
    input: {
      EngineType: D.m({ query: "engineType" }),
      HostInstanceType: D.m({ query: "hostInstanceType" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      StorageType: D.m({ query: "storageType" }),
    },
    output: {
      BrokerInstanceOptions: D.m({
        wire: "brokerInstanceOptions",
        shape: D.list({
          AvailabilityZones: D.m({
            wire: "availabilityZones",
            shape: D.list({ Name: D.m({ wire: "name" }) }),
          }),
          EngineType: D.m({ wire: "engineType" }),
          HostInstanceType: D.m({ wire: "hostInstanceType" }),
          StorageType: D.m({ wire: "storageType" }),
          SupportedDeploymentModes: D.m({ wire: "supportedDeploymentModes" }),
          SupportedEngineVersions: D.m({ wire: "supportedEngineVersions" }),
        }),
      }),
      MaxResults: D.m({ wire: "maxResults" }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBrokerInstanceOptions",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/configurations/{ConfigurationId}",
    input: { ConfigurationId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      AuthenticationStrategy: D.m({ wire: "authenticationStrategy" }),
      Created: D.m({ wire: "created", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      EngineType: D.m({ wire: "engineType" }),
      EngineVersion: D.m({ wire: "engineVersion" }),
      Id: D.m({ wire: "id" }),
      LatestRevision: D.m({
        wire: "latestRevision",
        shape: o_ConfigurationRevision,
      }),
      Name: D.m({ wire: "name" }),
      Tags: D.m({ wire: "tags" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/configurations/{ConfigurationId}/revisions/{ConfigurationRevision}",
    input: { ConfigurationId: 0, ConfigurationRevision: 0 },
    output: {
      ConfigurationId: D.m({ wire: "configurationId" }),
      Created: D.m({ wire: "created", shape: D.ts }),
      Data: D.m({ wire: "data" }),
      Description: D.m({ wire: "description" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigurationRevision",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/brokers/{BrokerId}/shared-resources",
    input: {
      BrokerId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      SharedResources: D.m({
        wire: "sharedResources",
        shape: D.list({
          DnsNames: D.m({ wire: "dnsNames" }),
          Error: D.m({
            wire: "error",
            shape: {
              Code: D.m({ wire: "code" }),
              Message: D.m({ wire: "message" }),
            },
          }),
          ResourceArn: D.m({ wire: "resourceArn" }),
          ResourceShareArns: D.m({ wire: "resourceShareArns" }),
          Status: D.m({ wire: "status" }),
          Type: D.m({ wire: "type" }),
        }),
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v1/brokers/{BrokerId}/users/{Username}",
    input: { BrokerId: 0, Username: 0 },
    output: {
      BrokerId: D.m({ wire: "brokerId" }),
      ConsoleAccess: D.m({ wire: "consoleAccess" }),
      Groups: D.m({ wire: "groups" }),
      Pending: D.m({
        wire: "pending",
        shape: {
          ConsoleAccess: D.m({ wire: "consoleAccess" }),
          Groups: D.m({ wire: "groups" }),
          PendingChange: D.m({ wire: "pendingChange" }),
        },
      }),
      Username: D.m({ wire: "username" }),
      ReplicationUser: D.m({ wire: "replicationUser" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUser",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/brokers",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      BrokerSummaries: D.m({
        wire: "brokerSummaries",
        shape: D.list({
          BrokerArn: D.m({ wire: "brokerArn" }),
          BrokerId: D.m({ wire: "brokerId" }),
          BrokerName: D.m({ wire: "brokerName" }),
          BrokerState: D.m({ wire: "brokerState" }),
          Created: D.m({ wire: "created", shape: D.ts }),
          DeploymentMode: D.m({ wire: "deploymentMode" }),
          EngineType: D.m({ wire: "engineType" }),
          HostInstanceType: D.m({ wire: "hostInstanceType" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /v1/configurations/{ConfigurationId}/revisions",
    input: {
      ConfigurationId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      ConfigurationId: D.m({ wire: "configurationId" }),
      MaxResults: D.m({ wire: "maxResults" }),
      NextToken: D.m({ wire: "nextToken" }),
      Revisions: D.m({
        wire: "revisions",
        shape: D.list(o_ConfigurationRevision),
      }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationRevisions",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/configurations",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Configurations: D.m({
        wire: "configurations",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          AuthenticationStrategy: D.m({ wire: "authenticationStrategy" }),
          Created: D.m({ wire: "created", shape: D.ts }),
          Description: D.m({ wire: "description" }),
          EngineType: D.m({ wire: "engineType" }),
          EngineVersion: D.m({ wire: "engineVersion" }),
          Id: D.m({ wire: "id" }),
          LatestRevision: D.m({
            wire: "latestRevision",
            shape: o_ConfigurationRevision,
          }),
          Name: D.m({ wire: "name" }),
          Tags: D.m({ wire: "tags" }),
        }),
      }),
      MaxResults: D.m({ wire: "maxResults" }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurations",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/tags/{ResourceArn}",
    input: { ResourceArn: 0 },
    output: { Tags: D.m({ wire: "tags" }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/brokers/{BrokerId}/users",
    input: {
      BrokerId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      BrokerId: D.m({ wire: "brokerId" }),
      MaxResults: D.m({ wire: "maxResults" }),
      NextToken: D.m({ wire: "nextToken" }),
      Users: D.m({ wire: "users", shape: D.list(o_UserSummary) }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsers",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/brokers/{BrokerId}/promote",
    input: { BrokerId: 0, Mode: D.m({ wire: "mode" }) },
    output: { BrokerId: D.m({ wire: "brokerId" }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Promote",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/brokers/{BrokerId}/reboot",
    input: { BrokerId: 0 },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootBroker",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v1/brokers/{BrokerId}",
    input: {
      AuthenticationStrategy: D.m({ wire: "authenticationStrategy" }),
      AutoMinorVersionUpgrade: D.m({ wire: "autoMinorVersionUpgrade" }),
      BrokerId: 0,
      Configuration: D.m({ wire: "configuration", shape: i_ConfigurationId }),
      EngineVersion: D.m({ wire: "engineVersion" }),
      HostInstanceType: D.m({ wire: "hostInstanceType" }),
      LdapServerMetadata: D.m({
        wire: "ldapServerMetadata",
        shape: i_LdapServerMetadataInput,
      }),
      Logs: D.m({ wire: "logs", shape: i_Logs }),
      MaintenanceWindowStartTime: D.m({
        wire: "maintenanceWindowStartTime",
        shape: i_WeeklyStartTime,
      }),
      ResourceShareArns: D.m({ wire: "resourceShareArns" }),
      SecurityGroups: D.m({ wire: "securityGroups" }),
      StorageSize: D.m({ wire: "storageSize" }),
      DataReplicationMode: D.m({ wire: "dataReplicationMode" }),
    },
    output: {
      AuthenticationStrategy: D.m({ wire: "authenticationStrategy" }),
      AutoMinorVersionUpgrade: D.m({ wire: "autoMinorVersionUpgrade" }),
      BrokerId: D.m({ wire: "brokerId" }),
      Configuration: D.m({ wire: "configuration", shape: o_ConfigurationId }),
      EngineVersion: D.m({ wire: "engineVersion" }),
      HostInstanceType: D.m({ wire: "hostInstanceType" }),
      LdapServerMetadata: D.m({
        wire: "ldapServerMetadata",
        shape: o_LdapServerMetadataOutput,
      }),
      Logs: D.m({
        wire: "logs",
        shape: {
          Audit: D.m({ wire: "audit" }),
          General: D.m({ wire: "general" }),
        },
      }),
      MaintenanceWindowStartTime: D.m({
        wire: "maintenanceWindowStartTime",
        shape: o_WeeklyStartTime,
      }),
      ResourceShareArns: D.m({ wire: "resourceShareArns" }),
      SecurityGroups: D.m({ wire: "securityGroups" }),
      DataReplicationMetadata: D.m({
        wire: "dataReplicationMetadata",
        shape: o_DataReplicationMetadataOutput,
      }),
      DataReplicationMode: D.m({ wire: "dataReplicationMode" }),
      PendingDataReplicationMetadata: D.m({
        wire: "pendingDataReplicationMetadata",
        shape: o_DataReplicationMetadataOutput,
      }),
      PendingDataReplicationMode: D.m({ wire: "pendingDataReplicationMode" }),
      StorageSize: D.m({ wire: "storageSize" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v1/configurations/{ConfigurationId}",
    input: {
      ConfigurationId: 0,
      Data: D.m({ wire: "data" }),
      Description: D.m({ wire: "description" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      Created: D.m({ wire: "created", shape: D.ts }),
      Id: D.m({ wire: "id" }),
      LatestRevision: D.m({
        wire: "latestRevision",
        shape: o_ConfigurationRevision,
      }),
      Name: D.m({ wire: "name" }),
      Warnings: D.m({
        wire: "warnings",
        shape: D.list({
          AttributeName: D.m({ wire: "attributeName" }),
          ElementName: D.m({ wire: "elementName" }),
          Reason: D.m({ wire: "reason" }),
        }),
      }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v1/brokers/{BrokerId}/users/{Username}",
    input: {
      BrokerId: 0,
      ConsoleAccess: D.m({ wire: "consoleAccess" }),
      Groups: D.m({ wire: "groups" }),
      Password: D.m({ wire: "password" }),
      Username: 0,
      ReplicationUser: D.m({ wire: "replicationUser" }),
    },
    body: true,
  },
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
})) as any;

const i_ConfigurationId: D.LazyStruct = () => ({
  Id: D.m({ wire: "id" }),
  Revision: D.m({ wire: "revision" }),
});
const i_LdapServerMetadataInput: D.LazyStruct = () => ({
  Hosts: D.m({ wire: "hosts" }),
  RoleBase: D.m({ wire: "roleBase" }),
  RoleName: D.m({ wire: "roleName" }),
  RoleSearchMatching: D.m({ wire: "roleSearchMatching" }),
  RoleSearchSubtree: D.m({ wire: "roleSearchSubtree" }),
  ServiceAccountPassword: D.m({ wire: "serviceAccountPassword" }),
  ServiceAccountUsername: D.m({ wire: "serviceAccountUsername" }),
  UserBase: D.m({ wire: "userBase" }),
  UserRoleName: D.m({ wire: "userRoleName" }),
  UserSearchMatching: D.m({ wire: "userSearchMatching" }),
  UserSearchSubtree: D.m({ wire: "userSearchSubtree" }),
});
const i_Logs: D.LazyStruct = () => ({
  Audit: D.m({ wire: "audit" }),
  General: D.m({ wire: "general" }),
});
const i_WeeklyStartTime: D.LazyStruct = () => ({
  DayOfWeek: D.m({ wire: "dayOfWeek" }),
  TimeOfDay: D.m({ wire: "timeOfDay" }),
  TimeZone: D.m({ wire: "timeZone" }),
});
const o_ConfigurationId: D.LazyStruct = () => ({
  Id: D.m({ wire: "id" }),
  Revision: D.m({ wire: "revision" }),
});
const o_ConfigurationRevision: D.LazyStruct = () => ({
  Created: D.m({ wire: "created", shape: D.ts }),
  Description: D.m({ wire: "description" }),
  Revision: D.m({ wire: "revision" }),
});
const o_DataReplicationMetadataOutput: D.LazyStruct = () => ({
  DataReplicationCounterpart: D.m({
    wire: "dataReplicationCounterpart",
    shape: {
      BrokerId: D.m({ wire: "brokerId" }),
      Region: D.m({ wire: "region" }),
    },
  }),
  DataReplicationRole: D.m({ wire: "dataReplicationRole" }),
});
const o_LdapServerMetadataOutput: D.LazyStruct = () => ({
  Hosts: D.m({ wire: "hosts" }),
  RoleBase: D.m({ wire: "roleBase" }),
  RoleName: D.m({ wire: "roleName" }),
  RoleSearchMatching: D.m({ wire: "roleSearchMatching" }),
  RoleSearchSubtree: D.m({ wire: "roleSearchSubtree" }),
  ServiceAccountUsername: D.m({ wire: "serviceAccountUsername" }),
  UserBase: D.m({ wire: "userBase" }),
  UserRoleName: D.m({ wire: "userRoleName" }),
  UserSearchMatching: D.m({ wire: "userSearchMatching" }),
  UserSearchSubtree: D.m({ wire: "userSearchSubtree" }),
});
const o_UserSummary: D.LazyStruct = () => ({
  PendingChange: D.m({ wire: "pendingChange" }),
  Username: D.m({ wire: "username" }),
});
const o_WeeklyStartTime: D.LazyStruct = () => ({
  DayOfWeek: D.m({ wire: "dayOfWeek" }),
  TimeOfDay: D.m({ wire: "timeOfDay" }),
  TimeZone: D.m({ wire: "timeZone" }),
});
