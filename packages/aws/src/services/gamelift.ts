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
const ns = /*@__PURE__*/ T.XmlNamespace("http://gamelift.amazonaws.com/doc/");
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "GameLift", serviceShapeName: "GameLift" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "gamelift" });
const ver = /*@__PURE__*/ T.ServiceVersion("2015-10-01");
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
              `https://gamelift-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://gamelift-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://gamelift.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://gamelift.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://gamelift.{R}.{D}","properties":{},"headers":{}}');

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()("ConflictException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class FleetCapacityExceededException
  extends /*@__PURE__*/ S.TaggedError<FleetCapacityExceededException>()(
    "FleetCapacityExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class GameSessionFullException
  extends /*@__PURE__*/ S.TaggedError<GameSessionFullException>()("GameSessionFullException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ S.TaggedError<IdempotentParameterMismatchException>()(
    "IdempotentParameterMismatchException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()("InternalServiceException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidFleetStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidFleetStatusException>()(
    "InvalidFleetStatusException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidGameSessionStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidGameSessionStatusException>()(
    "InvalidGameSessionStatusException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()("InvalidRequestException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()("NotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class NotReadyException
  extends /*@__PURE__*/ S.TaggedError<NotReadyException>()("NotReadyException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class OutOfCapacityException
  extends /*@__PURE__*/ S.TaggedError<OutOfCapacityException>()("OutOfCapacityException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TaggingFailedException
  extends /*@__PURE__*/ S.TaggedError<TaggingFailedException>()("TaggingFailedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TerminalRoutingStrategyException
  extends /*@__PURE__*/ S.TaggedError<TerminalRoutingStrategyException>()(
    "TerminalRoutingStrategyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()("UnauthorizedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAuthError) {}
export class UnsupportedRegionException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedRegionException>()("UnsupportedRegionException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export type MatchmakingIdStringModel = string;
export type PlayerId = string | redacted.Redacted<string>;
export type PlayerIdsForAcceptMatch = (string | redacted.Redacted<string>)[];
export type AcceptanceType = "ACCEPT" | "REJECT" | (string & {});
export interface AcceptMatchInput {
  TicketId?: string;
  PlayerIds?: (string | redacted.Redacted<string>)[];
  AcceptanceType?: AcceptanceType;
}
export interface AcceptMatchOutput {}
export type GameServerGroupNameOrArn = string;
export type GameServerId = string;
export type GameServerData = string | redacted.Redacted<string>;
export type FilterInstanceStatus = "ACTIVE" | "DRAINING" | (string & {});
export type FilterInstanceStatuses = FilterInstanceStatus[];
export interface ClaimFilterOption {
  InstanceStatuses?: FilterInstanceStatus[];
}
export interface ClaimGameServerInput {
  GameServerGroupName?: string;
  GameServerId?: string;
  GameServerData?: string | redacted.Redacted<string>;
  FilterOption?: ClaimFilterOption;
}
export type GameServerGroupName = string;
export type GameServerGroupArn = string;
export type GameServerInstanceId = string;
export type GameServerConnectionInfo = string;
export type GameServerClaimStatus = "CLAIMED" | (string & {});
export type GameServerUtilizationStatus = "AVAILABLE" | "UTILIZED" | (string & {});
export interface GameServer {
  GameServerGroupName?: string;
  GameServerGroupArn?: string;
  GameServerId?: string;
  InstanceId?: string;
  ConnectionInfo?: string;
  GameServerData?: string | redacted.Redacted<string>;
  ClaimStatus?: GameServerClaimStatus;
  UtilizationStatus?: GameServerUtilizationStatus;
  RegistrationTime?: Date;
  LastClaimTime?: Date;
  LastHealthCheckTime?: Date;
}
export interface ClaimGameServerOutput {
  GameServer?: GameServer;
}
export type NonBlankAndLengthConstraintString = string;
export type NonZeroAndMaxString = string;
export type RoutingStrategyType = "SIMPLE" | "TERMINAL" | (string & {});
export type FleetId = string;
export type FreeText = string;
export interface RoutingStrategy {
  Type?: RoutingStrategyType;
  FleetId?: string;
  Message?: string;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export interface CreateAliasInput {
  Name?: string;
  Description?: string;
  RoutingStrategy?: RoutingStrategy;
  Tags?: Tag[];
}
export type AliasId = string;
export type AliasArn = string;
export interface Alias {
  AliasId?: string;
  Name?: string;
  AliasArn?: string;
  Description?: string;
  RoutingStrategy?: RoutingStrategy;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
}
export interface CreateAliasOutput {
  Alias?: Alias;
}
export type NonEmptyString = string;
export interface S3Location {
  Bucket?: string;
  Key?: string;
  RoleArn?: string;
  ObjectVersion?: string;
}
export type OperatingSystem =
  | "WINDOWS_2012"
  | "AMAZON_LINUX"
  | "AMAZON_LINUX_2"
  | "WINDOWS_2016"
  | "AMAZON_LINUX_2023"
  | "WINDOWS_2022"
  | (string & {});
export type ServerSdkVersion = string;
export interface CreateBuildInput {
  Name?: string;
  Version?: string;
  StorageLocation?: S3Location;
  OperatingSystem?: OperatingSystem;
  Tags?: Tag[];
  ServerSdkVersion?: string;
}
export type BuildId = string;
export type BuildArn = string;
export type BuildStatus = "INITIALIZED" | "READY" | "FAILED" | (string & {});
export type WholeNumberLong = number;
export interface Build {
  BuildId?: string;
  BuildArn?: string;
  Name?: string;
  Version?: string;
  Status?: BuildStatus;
  SizeOnDisk?: number;
  OperatingSystem?: OperatingSystem;
  CreationTime?: Date;
  ServerSdkVersion?: string;
}
export interface AwsCredentials {
  AccessKeyId?: string;
  SecretAccessKey?: string;
  SessionToken?: string;
}
export interface CreateBuildOutput {
  Build?: Build;
  UploadCredentials?: AwsCredentials;
  StorageLocation?: S3Location;
}
export type IamRoleArn = string;
export type ContainerGroupDefinitionNameOrArn = string;
export type PortNumber = number;
export interface ConnectionPortRange {
  FromPort?: number;
  ToPort?: number;
}
export type IpRange = string | redacted.Redacted<string>;
export type IpProtocol = "TCP" | "UDP" | (string & {});
export interface IpPermission {
  FromPort?: number;
  ToPort?: number;
  IpRange?: string | redacted.Redacted<string>;
  Protocol?: IpProtocol;
}
export type IpPermissionsList = IpPermission[];
export type GameServerContainerGroupsPerInstance = number;
export type ContainerFleetBillingType = "ON_DEMAND" | "SPOT" | (string & {});
export type LocationStringModel = string;
export interface LocationConfiguration {
  Location?: string;
}
export type LocationConfigurationList = LocationConfiguration[];
export type MetricGroup = string;
export type MetricGroupList = string[];
export type ProtectionPolicy = "NoProtection" | "FullProtection" | (string & {});
export type WholeNumber = number;
export interface GameSessionCreationLimitPolicy {
  NewGameSessionsPerCreator?: number;
  PolicyPeriodInMinutes?: number;
}
export type LogDestination = "NONE" | "CLOUDWATCH" | "S3" | (string & {});
export type LogGroupArnStringModel = string;
export interface LogConfiguration {
  LogDestination?: LogDestination;
  S3BucketName?: string;
  LogGroupArn?: string;
}
export type PlayerGatewayMode = "DISABLED" | "ENABLED" | "REQUIRED" | (string & {});
export interface CreateContainerFleetInput {
  FleetRoleArn?: string;
  Description?: string;
  GameServerContainerGroupDefinitionName?: string;
  PerInstanceContainerGroupDefinitionName?: string;
  InstanceConnectionPortRange?: ConnectionPortRange;
  InstanceInboundPermissions?: IpPermission[];
  GameServerContainerGroupsPerInstance?: number;
  InstanceType?: string;
  BillingType?: ContainerFleetBillingType;
  Locations?: LocationConfiguration[];
  MetricGroups?: string[];
  NewGameSessionProtectionPolicy?: ProtectionPolicy;
  GameSessionCreationLimitPolicy?: GameSessionCreationLimitPolicy;
  LogConfiguration?: LogConfiguration;
  Tags?: Tag[];
  PlayerGatewayMode?: PlayerGatewayMode;
}
export type FleetArn = string;
export type ContainerGroupDefinitionName = string;
export type ContainerGroupDefinitionArn = string;
export type MaximumGameServerContainerGroupsPerInstance = number;
export type ContainerFleetStatus =
  | "PENDING"
  | "CREATING"
  | "CREATED"
  | "ACTIVATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "EXPIRED"
  | (string & {});
export type DeploymentId = string;
export interface DeploymentDetails {
  LatestDeploymentId?: string;
}
export type ContainerFleetLocationStatus =
  | "PENDING"
  | "CREATING"
  | "CREATED"
  | "ACTIVATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "EXPIRED"
  | (string & {});
export type PlayerGatewayStatus = "DISABLED" | "ENABLED" | (string & {});
export interface ContainerFleetLocationAttributes {
  Location?: string;
  Status?: ContainerFleetLocationStatus;
  PlayerGatewayStatus?: PlayerGatewayStatus;
}
export type ContainerFleetLocationAttributesList = ContainerFleetLocationAttributes[];
export interface ContainerFleet {
  FleetId?: string;
  FleetArn?: string;
  FleetRoleArn?: string;
  GameServerContainerGroupDefinitionName?: string;
  GameServerContainerGroupDefinitionArn?: string;
  PerInstanceContainerGroupDefinitionName?: string;
  PerInstanceContainerGroupDefinitionArn?: string;
  InstanceConnectionPortRange?: ConnectionPortRange;
  InstanceInboundPermissions?: IpPermission[];
  GameServerContainerGroupsPerInstance?: number;
  MaximumGameServerContainerGroupsPerInstance?: number;
  InstanceType?: string;
  BillingType?: ContainerFleetBillingType;
  Description?: string;
  CreationTime?: Date;
  MetricGroups?: string[];
  NewGameSessionProtectionPolicy?: ProtectionPolicy;
  GameSessionCreationLimitPolicy?: GameSessionCreationLimitPolicy;
  Status?: ContainerFleetStatus;
  DeploymentDetails?: DeploymentDetails;
  LogConfiguration?: LogConfiguration;
  LocationAttributes?: ContainerFleetLocationAttributes[];
  PlayerGatewayMode?: PlayerGatewayMode;
}
export interface CreateContainerFleetOutput {
  ContainerFleet?: ContainerFleet & {
    InstanceConnectionPortRange: ConnectionPortRange & { FromPort: PortNumber; ToPort: PortNumber };
    InstanceInboundPermissions: (IpPermission & {
      FromPort: PortNumber;
      ToPort: PortNumber;
      IpRange: IpRange;
      Protocol: IpProtocol;
    })[];
  };
}
export type ContainerGroupType = "GAME_SERVER" | "PER_INSTANCE" | (string & {});
export type ContainerTotalMemoryLimit = number;
export type ContainerTotalVcpuLimit = number;
export type NonZeroAnd128MaxAsciiString = string;
export type ContainerDependencyCondition =
  | "START"
  | "COMPLETE"
  | "SUCCESS"
  | "HEALTHY"
  | (string & {});
export interface ContainerDependency {
  ContainerName?: string;
  Condition?: ContainerDependencyCondition;
}
export type ContainerDependencyList = ContainerDependency[];
export type InstancePathString = string;
export type ContainerPathString = string;
export type ContainerMountPointAccessLevel = "READ_ONLY" | "READ_AND_WRITE" | (string & {});
export interface ContainerMountPoint {
  InstancePath?: string;
  ContainerPath?: string;
  AccessLevel?: ContainerMountPointAccessLevel;
}
export type ContainerMountPointList = ContainerMountPoint[];
export type NonZeroAnd255MaxString = string;
export interface ContainerEnvironment {
  Name?: string;
  Value?: string;
}
export type ContainerEnvironmentList = ContainerEnvironment[];
export type ImageUriString = string;
export interface ContainerPortRange {
  FromPort?: number;
  ToPort?: number;
  Protocol?: IpProtocol;
}
export type ContainerPortRangeList = ContainerPortRange[];
export interface ContainerPortConfiguration {
  ContainerPortRanges?: ContainerPortRange[];
}
export type LinuxCapability =
  | "AUDIT_CONTROL"
  | "AUDIT_WRITE"
  | "BLOCK_SUSPEND"
  | "CHOWN"
  | "DAC_OVERRIDE"
  | "DAC_READ_SEARCH"
  | "FOWNER"
  | "FSETID"
  | "IPC_LOCK"
  | "IPC_OWNER"
  | "KILL"
  | "LEASE"
  | "LINUX_IMMUTABLE"
  | "MAC_ADMIN"
  | "MAC_OVERRIDE"
  | "MKNOD"
  | "NET_ADMIN"
  | "NET_BIND_SERVICE"
  | "NET_BROADCAST"
  | "NET_RAW"
  | "SETFCAP"
  | "SETGID"
  | "SETPCAP"
  | "SETUID"
  | "SYS_ADMIN"
  | "SYS_BOOT"
  | "SYS_CHROOT"
  | "SYS_MODULE"
  | "SYS_NICE"
  | "SYS_PACCT"
  | "SYS_PTRACE"
  | "SYS_RAWIO"
  | "SYS_RESOURCE"
  | "SYS_TIME"
  | "SYS_TTY_CONFIG"
  | "SYSLOG"
  | "WAKE_ALARM"
  | (string & {});
export type LinuxCapabilityList = LinuxCapability[];
export interface LinuxCapabilities {
  Include?: LinuxCapability[];
}
export interface GameServerContainerDefinitionInput {
  ContainerName?: string;
  DependsOn?: ContainerDependency[];
  MountPoints?: ContainerMountPoint[];
  EnvironmentOverride?: ContainerEnvironment[];
  ImageUri?: string;
  PortConfiguration?: ContainerPortConfiguration;
  ServerSdkVersion?: string;
  LinuxCapabilities?: LinuxCapabilities;
}
export type BooleanModel = boolean;
export type ContainerCommandStringList = string[];
export type ContainerHealthCheckInterval = number;
export type ContainerHealthCheckRetries = number;
export type ContainerHealthCheckStartPeriod = number;
export type ContainerHealthCheckTimeout = number;
export interface ContainerHealthCheck {
  Command?: string[];
  Interval?: number;
  Retries?: number;
  StartPeriod?: number;
  Timeout?: number;
}
export type ContainerMemoryLimit = number;
export type ContainerVcpu = number;
export interface SupportContainerDefinitionInput {
  ContainerName?: string;
  DependsOn?: ContainerDependency[];
  MountPoints?: ContainerMountPoint[];
  EnvironmentOverride?: ContainerEnvironment[];
  Essential?: boolean;
  HealthCheck?: ContainerHealthCheck;
  ImageUri?: string;
  MemoryHardLimitMebibytes?: number;
  PortConfiguration?: ContainerPortConfiguration;
  Vcpu?: number;
  LinuxCapabilities?: LinuxCapabilities;
}
export type SupportContainerDefinitionInputList = SupportContainerDefinitionInput[];
export type ContainerOperatingSystem = "AMAZON_LINUX_2023" | (string & {});
export interface CreateContainerGroupDefinitionInput {
  Name?: string;
  ContainerGroupType?: ContainerGroupType;
  TotalMemoryLimitMebibytes?: number;
  TotalVcpuLimit?: number;
  GameServerContainerDefinition?: GameServerContainerDefinitionInput;
  SupportContainerDefinitions?: SupportContainerDefinitionInput[];
  OperatingSystem?: ContainerOperatingSystem;
  VersionDescription?: string;
  Tags?: Tag[];
}
export type Sha256 = string;
export interface GameServerContainerDefinition {
  ContainerName?: string;
  DependsOn?: ContainerDependency[];
  MountPoints?: ContainerMountPoint[];
  EnvironmentOverride?: ContainerEnvironment[];
  ImageUri?: string;
  PortConfiguration?: ContainerPortConfiguration;
  ResolvedImageDigest?: string;
  ServerSdkVersion?: string;
  LinuxCapabilities?: LinuxCapabilities;
}
export interface SupportContainerDefinition {
  ContainerName?: string;
  DependsOn?: ContainerDependency[];
  MountPoints?: ContainerMountPoint[];
  EnvironmentOverride?: ContainerEnvironment[];
  Essential?: boolean;
  HealthCheck?: ContainerHealthCheck;
  ImageUri?: string;
  MemoryHardLimitMebibytes?: number;
  PortConfiguration?: ContainerPortConfiguration;
  ResolvedImageDigest?: string;
  Vcpu?: number;
  LinuxCapabilities?: LinuxCapabilities;
}
export type SupportContainerDefinitionList = SupportContainerDefinition[];
export type PositiveInteger = number;
export type ContainerGroupDefinitionStatus = "READY" | "COPYING" | "FAILED" | (string & {});
export interface ContainerGroupDefinition {
  ContainerGroupDefinitionArn?: string;
  CreationTime?: Date;
  OperatingSystem?: ContainerOperatingSystem;
  Name?: string;
  ContainerGroupType?: ContainerGroupType;
  TotalMemoryLimitMebibytes?: number;
  TotalVcpuLimit?: number;
  GameServerContainerDefinition?: GameServerContainerDefinition;
  SupportContainerDefinitions?: SupportContainerDefinition[];
  VersionNumber?: number;
  VersionDescription?: string;
  Status?: ContainerGroupDefinitionStatus;
  StatusReason?: string;
}
export interface CreateContainerGroupDefinitionOutput {
  ContainerGroupDefinition?: ContainerGroupDefinition & {
    Name: ContainerGroupDefinitionName;
    GameServerContainerDefinition: GameServerContainerDefinition & {
      DependsOn: (ContainerDependency & {
        ContainerName: NonZeroAnd128MaxAsciiString;
        Condition: ContainerDependencyCondition;
      })[];
      MountPoints: (ContainerMountPoint & { InstancePath: InstancePathString })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      PortConfiguration: ContainerPortConfiguration & {
        ContainerPortRanges: (ContainerPortRange & {
          FromPort: PortNumber;
          ToPort: PortNumber;
          Protocol: IpProtocol;
        })[];
      };
    };
    SupportContainerDefinitions: (SupportContainerDefinition & {
      DependsOn: (ContainerDependency & {
        ContainerName: NonZeroAnd128MaxAsciiString;
        Condition: ContainerDependencyCondition;
      })[];
      MountPoints: (ContainerMountPoint & { InstancePath: InstancePathString })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      HealthCheck: ContainerHealthCheck & { Command: ContainerCommandStringList };
      PortConfiguration: ContainerPortConfiguration & {
        ContainerPortRanges: (ContainerPortRange & {
          FromPort: PortNumber;
          ToPort: PortNumber;
          Protocol: IpProtocol;
        })[];
      };
    })[];
  };
}
export type BuildIdOrArn = string;
export type ScriptIdOrArn = string;
export type LaunchPathStringModel = string;
export type LaunchParametersStringModel = string;
export type StringList = string[];
export type EC2InstanceType =
  | "t2.micro"
  | "t2.small"
  | "t2.medium"
  | "t2.large"
  | "c3.large"
  | "c3.xlarge"
  | "c3.2xlarge"
  | "c3.4xlarge"
  | "c3.8xlarge"
  | "c4.large"
  | "c4.xlarge"
  | "c4.2xlarge"
  | "c4.4xlarge"
  | "c4.8xlarge"
  | "c5.large"
  | "c5.xlarge"
  | "c5.2xlarge"
  | "c5.4xlarge"
  | "c5.9xlarge"
  | "c5.12xlarge"
  | "c5.18xlarge"
  | "c5.24xlarge"
  | "c5a.large"
  | "c5a.xlarge"
  | "c5a.2xlarge"
  | "c5a.4xlarge"
  | "c5a.8xlarge"
  | "c5a.12xlarge"
  | "c5a.16xlarge"
  | "c5a.24xlarge"
  | "r3.large"
  | "r3.xlarge"
  | "r3.2xlarge"
  | "r3.4xlarge"
  | "r3.8xlarge"
  | "r4.large"
  | "r4.xlarge"
  | "r4.2xlarge"
  | "r4.4xlarge"
  | "r4.8xlarge"
  | "r4.16xlarge"
  | "r5.large"
  | "r5.xlarge"
  | "r5.2xlarge"
  | "r5.4xlarge"
  | "r5.8xlarge"
  | "r5.12xlarge"
  | "r5.16xlarge"
  | "r5.24xlarge"
  | "r5a.large"
  | "r5a.xlarge"
  | "r5a.2xlarge"
  | "r5a.4xlarge"
  | "r5a.8xlarge"
  | "r5a.12xlarge"
  | "r5a.16xlarge"
  | "r5a.24xlarge"
  | "m3.medium"
  | "m3.large"
  | "m3.xlarge"
  | "m3.2xlarge"
  | "m4.large"
  | "m4.xlarge"
  | "m4.2xlarge"
  | "m4.4xlarge"
  | "m4.10xlarge"
  | "m5.large"
  | "m5.xlarge"
  | "m5.2xlarge"
  | "m5.4xlarge"
  | "m5.8xlarge"
  | "m5.12xlarge"
  | "m5.16xlarge"
  | "m5.24xlarge"
  | "m5a.large"
  | "m5a.xlarge"
  | "m5a.2xlarge"
  | "m5a.4xlarge"
  | "m5a.8xlarge"
  | "m5a.12xlarge"
  | "m5a.16xlarge"
  | "m5a.24xlarge"
  | "c5d.large"
  | "c5d.xlarge"
  | "c5d.2xlarge"
  | "c5d.4xlarge"
  | "c5d.9xlarge"
  | "c5d.12xlarge"
  | "c5d.18xlarge"
  | "c5d.24xlarge"
  | "c6a.large"
  | "c6a.xlarge"
  | "c6a.2xlarge"
  | "c6a.4xlarge"
  | "c6a.8xlarge"
  | "c6a.12xlarge"
  | "c6a.16xlarge"
  | "c6a.24xlarge"
  | "c6i.large"
  | "c6i.xlarge"
  | "c6i.2xlarge"
  | "c6i.4xlarge"
  | "c6i.8xlarge"
  | "c6i.12xlarge"
  | "c6i.16xlarge"
  | "c6i.24xlarge"
  | "r5d.large"
  | "r5d.xlarge"
  | "r5d.2xlarge"
  | "r5d.4xlarge"
  | "r5d.8xlarge"
  | "r5d.12xlarge"
  | "r5d.16xlarge"
  | "r5d.24xlarge"
  | "m6g.medium"
  | "m6g.large"
  | "m6g.xlarge"
  | "m6g.2xlarge"
  | "m6g.4xlarge"
  | "m6g.8xlarge"
  | "m6g.12xlarge"
  | "m6g.16xlarge"
  | "c6g.medium"
  | "c6g.large"
  | "c6g.xlarge"
  | "c6g.2xlarge"
  | "c6g.4xlarge"
  | "c6g.8xlarge"
  | "c6g.12xlarge"
  | "c6g.16xlarge"
  | "r6g.medium"
  | "r6g.large"
  | "r6g.xlarge"
  | "r6g.2xlarge"
  | "r6g.4xlarge"
  | "r6g.8xlarge"
  | "r6g.12xlarge"
  | "r6g.16xlarge"
  | "c6gn.medium"
  | "c6gn.large"
  | "c6gn.xlarge"
  | "c6gn.2xlarge"
  | "c6gn.4xlarge"
  | "c6gn.8xlarge"
  | "c6gn.12xlarge"
  | "c6gn.16xlarge"
  | "c7g.medium"
  | "c7g.large"
  | "c7g.xlarge"
  | "c7g.2xlarge"
  | "c7g.4xlarge"
  | "c7g.8xlarge"
  | "c7g.12xlarge"
  | "c7g.16xlarge"
  | "r7g.medium"
  | "r7g.large"
  | "r7g.xlarge"
  | "r7g.2xlarge"
  | "r7g.4xlarge"
  | "r7g.8xlarge"
  | "r7g.12xlarge"
  | "r7g.16xlarge"
  | "m7g.medium"
  | "m7g.large"
  | "m7g.xlarge"
  | "m7g.2xlarge"
  | "m7g.4xlarge"
  | "m7g.8xlarge"
  | "m7g.12xlarge"
  | "m7g.16xlarge"
  | "g5g.xlarge"
  | "g5g.2xlarge"
  | "g5g.4xlarge"
  | "g5g.8xlarge"
  | "g5g.16xlarge"
  | "r6i.large"
  | "r6i.xlarge"
  | "r6i.2xlarge"
  | "r6i.4xlarge"
  | "r6i.8xlarge"
  | "r6i.12xlarge"
  | "r6i.16xlarge"
  | "c6gd.medium"
  | "c6gd.large"
  | "c6gd.xlarge"
  | "c6gd.2xlarge"
  | "c6gd.4xlarge"
  | "c6gd.8xlarge"
  | "c6gd.12xlarge"
  | "c6gd.16xlarge"
  | "c6in.large"
  | "c6in.xlarge"
  | "c6in.2xlarge"
  | "c6in.4xlarge"
  | "c6in.8xlarge"
  | "c6in.12xlarge"
  | "c6in.16xlarge"
  | "c7a.medium"
  | "c7a.large"
  | "c7a.xlarge"
  | "c7a.2xlarge"
  | "c7a.4xlarge"
  | "c7a.8xlarge"
  | "c7a.12xlarge"
  | "c7a.16xlarge"
  | "c7gd.medium"
  | "c7gd.large"
  | "c7gd.xlarge"
  | "c7gd.2xlarge"
  | "c7gd.4xlarge"
  | "c7gd.8xlarge"
  | "c7gd.12xlarge"
  | "c7gd.16xlarge"
  | "c7gn.medium"
  | "c7gn.large"
  | "c7gn.xlarge"
  | "c7gn.2xlarge"
  | "c7gn.4xlarge"
  | "c7gn.8xlarge"
  | "c7gn.12xlarge"
  | "c7gn.16xlarge"
  | "c7i.large"
  | "c7i.xlarge"
  | "c7i.2xlarge"
  | "c7i.4xlarge"
  | "c7i.8xlarge"
  | "c7i.12xlarge"
  | "c7i.16xlarge"
  | "m6a.large"
  | "m6a.xlarge"
  | "m6a.2xlarge"
  | "m6a.4xlarge"
  | "m6a.8xlarge"
  | "m6a.12xlarge"
  | "m6a.16xlarge"
  | "m6gd.medium"
  | "m6gd.large"
  | "m6gd.xlarge"
  | "m6gd.2xlarge"
  | "m6gd.4xlarge"
  | "m6gd.8xlarge"
  | "m6gd.12xlarge"
  | "m6gd.16xlarge"
  | "m6i.large"
  | "m6i.xlarge"
  | "m6i.2xlarge"
  | "m6i.4xlarge"
  | "m6i.8xlarge"
  | "m6i.12xlarge"
  | "m6i.16xlarge"
  | "m7a.medium"
  | "m7a.large"
  | "m7a.xlarge"
  | "m7a.2xlarge"
  | "m7a.4xlarge"
  | "m7a.8xlarge"
  | "m7a.12xlarge"
  | "m7a.16xlarge"
  | "m7gd.medium"
  | "m7gd.large"
  | "m7gd.xlarge"
  | "m7gd.2xlarge"
  | "m7gd.4xlarge"
  | "m7gd.8xlarge"
  | "m7gd.12xlarge"
  | "m7gd.16xlarge"
  | "m7i.large"
  | "m7i.xlarge"
  | "m7i.2xlarge"
  | "m7i.4xlarge"
  | "m7i.8xlarge"
  | "m7i.12xlarge"
  | "m7i.16xlarge"
  | "r6gd.medium"
  | "r6gd.large"
  | "r6gd.xlarge"
  | "r6gd.2xlarge"
  | "r6gd.4xlarge"
  | "r6gd.8xlarge"
  | "r6gd.12xlarge"
  | "r6gd.16xlarge"
  | "r7a.medium"
  | "r7a.large"
  | "r7a.xlarge"
  | "r7a.2xlarge"
  | "r7a.4xlarge"
  | "r7a.8xlarge"
  | "r7a.12xlarge"
  | "r7a.16xlarge"
  | "r7gd.medium"
  | "r7gd.large"
  | "r7gd.xlarge"
  | "r7gd.2xlarge"
  | "r7gd.4xlarge"
  | "r7gd.8xlarge"
  | "r7gd.12xlarge"
  | "r7gd.16xlarge"
  | "r7i.large"
  | "r7i.xlarge"
  | "r7i.2xlarge"
  | "r7i.4xlarge"
  | "r7i.8xlarge"
  | "r7i.12xlarge"
  | "r7i.16xlarge"
  | "r7i.24xlarge"
  | "r7i.48xlarge"
  | "c5ad.large"
  | "c5ad.xlarge"
  | "c5ad.2xlarge"
  | "c5ad.4xlarge"
  | "c5ad.8xlarge"
  | "c5ad.12xlarge"
  | "c5ad.16xlarge"
  | "c5ad.24xlarge"
  | "c5n.large"
  | "c5n.xlarge"
  | "c5n.2xlarge"
  | "c5n.4xlarge"
  | "c5n.9xlarge"
  | "c5n.18xlarge"
  | "r5ad.large"
  | "r5ad.xlarge"
  | "r5ad.2xlarge"
  | "r5ad.4xlarge"
  | "r5ad.8xlarge"
  | "r5ad.12xlarge"
  | "r5ad.16xlarge"
  | "r5ad.24xlarge"
  | "c6id.large"
  | "c6id.xlarge"
  | "c6id.2xlarge"
  | "c6id.4xlarge"
  | "c6id.8xlarge"
  | "c6id.12xlarge"
  | "c6id.16xlarge"
  | "c6id.24xlarge"
  | "c6id.32xlarge"
  | "c8g.medium"
  | "c8g.large"
  | "c8g.xlarge"
  | "c8g.2xlarge"
  | "c8g.4xlarge"
  | "c8g.8xlarge"
  | "c8g.12xlarge"
  | "c8g.16xlarge"
  | "c8g.24xlarge"
  | "c8g.48xlarge"
  | "m5ad.large"
  | "m5ad.xlarge"
  | "m5ad.2xlarge"
  | "m5ad.4xlarge"
  | "m5ad.8xlarge"
  | "m5ad.12xlarge"
  | "m5ad.16xlarge"
  | "m5ad.24xlarge"
  | "m5d.large"
  | "m5d.xlarge"
  | "m5d.2xlarge"
  | "m5d.4xlarge"
  | "m5d.8xlarge"
  | "m5d.12xlarge"
  | "m5d.16xlarge"
  | "m5d.24xlarge"
  | "m5dn.large"
  | "m5dn.xlarge"
  | "m5dn.2xlarge"
  | "m5dn.4xlarge"
  | "m5dn.8xlarge"
  | "m5dn.12xlarge"
  | "m5dn.16xlarge"
  | "m5dn.24xlarge"
  | "m5n.large"
  | "m5n.xlarge"
  | "m5n.2xlarge"
  | "m5n.4xlarge"
  | "m5n.8xlarge"
  | "m5n.12xlarge"
  | "m5n.16xlarge"
  | "m5n.24xlarge"
  | "m6id.large"
  | "m6id.xlarge"
  | "m6id.2xlarge"
  | "m6id.4xlarge"
  | "m6id.8xlarge"
  | "m6id.12xlarge"
  | "m6id.16xlarge"
  | "m6id.24xlarge"
  | "m6id.32xlarge"
  | "m6idn.large"
  | "m6idn.xlarge"
  | "m6idn.2xlarge"
  | "m6idn.4xlarge"
  | "m6idn.8xlarge"
  | "m6idn.12xlarge"
  | "m6idn.16xlarge"
  | "m6idn.24xlarge"
  | "m6idn.32xlarge"
  | "m6in.large"
  | "m6in.xlarge"
  | "m6in.2xlarge"
  | "m6in.4xlarge"
  | "m6in.8xlarge"
  | "m6in.12xlarge"
  | "m6in.16xlarge"
  | "m6in.24xlarge"
  | "m6in.32xlarge"
  | "m8g.medium"
  | "m8g.large"
  | "m8g.xlarge"
  | "m8g.2xlarge"
  | "m8g.4xlarge"
  | "m8g.8xlarge"
  | "m8g.12xlarge"
  | "m8g.16xlarge"
  | "m8g.24xlarge"
  | "m8g.48xlarge"
  | "r5dn.large"
  | "r5dn.xlarge"
  | "r5dn.2xlarge"
  | "r5dn.4xlarge"
  | "r5dn.8xlarge"
  | "r5dn.12xlarge"
  | "r5dn.16xlarge"
  | "r5dn.24xlarge"
  | "r5n.large"
  | "r5n.xlarge"
  | "r5n.2xlarge"
  | "r5n.4xlarge"
  | "r5n.8xlarge"
  | "r5n.12xlarge"
  | "r5n.16xlarge"
  | "r5n.24xlarge"
  | "r6a.large"
  | "r6a.xlarge"
  | "r6a.2xlarge"
  | "r6a.4xlarge"
  | "r6a.8xlarge"
  | "r6a.12xlarge"
  | "r6a.16xlarge"
  | "r6a.24xlarge"
  | "r6a.32xlarge"
  | "r6a.48xlarge"
  | "r6id.large"
  | "r6id.xlarge"
  | "r6id.2xlarge"
  | "r6id.4xlarge"
  | "r6id.8xlarge"
  | "r6id.12xlarge"
  | "r6id.16xlarge"
  | "r6id.24xlarge"
  | "r6id.32xlarge"
  | "r6idn.large"
  | "r6idn.xlarge"
  | "r6idn.2xlarge"
  | "r6idn.4xlarge"
  | "r6idn.8xlarge"
  | "r6idn.12xlarge"
  | "r6idn.16xlarge"
  | "r6idn.24xlarge"
  | "r6idn.32xlarge"
  | "r6in.large"
  | "r6in.xlarge"
  | "r6in.2xlarge"
  | "r6in.4xlarge"
  | "r6in.8xlarge"
  | "r6in.12xlarge"
  | "r6in.16xlarge"
  | "r6in.24xlarge"
  | "r6in.32xlarge"
  | "r8g.medium"
  | "r8g.large"
  | "r8g.xlarge"
  | "r8g.2xlarge"
  | "r8g.4xlarge"
  | "r8g.8xlarge"
  | "r8g.12xlarge"
  | "r8g.16xlarge"
  | "r8g.24xlarge"
  | "r8g.48xlarge"
  | "m4.16xlarge"
  | "c6a.32xlarge"
  | "c6a.48xlarge"
  | "c6i.32xlarge"
  | "r6i.24xlarge"
  | "r6i.32xlarge"
  | "c6in.24xlarge"
  | "c6in.32xlarge"
  | "c7a.24xlarge"
  | "c7a.32xlarge"
  | "c7a.48xlarge"
  | "c7i.24xlarge"
  | "c7i.48xlarge"
  | "m6a.24xlarge"
  | "m6a.32xlarge"
  | "m6a.48xlarge"
  | "m6i.24xlarge"
  | "m6i.32xlarge"
  | "m7a.24xlarge"
  | "m7a.32xlarge"
  | "m7a.48xlarge"
  | "m7i.24xlarge"
  | "m7i.48xlarge"
  | "r7a.24xlarge"
  | "r7a.32xlarge"
  | "r7a.48xlarge"
  | "c8a.medium"
  | "c8a.large"
  | "c8a.xlarge"
  | "c8a.2xlarge"
  | "c8i.large"
  | "c8i.xlarge"
  | "c8i.2xlarge"
  | "c9g.medium"
  | "c9g.large"
  | "c9g.xlarge"
  | "c9g.2xlarge"
  | "m8a.medium"
  | "m8a.large"
  | "m8a.xlarge"
  | "m8a.2xlarge"
  | "m8i.large"
  | "m8i.xlarge"
  | "m8i.2xlarge"
  | "m9g.large"
  | "m9g.xlarge"
  | "m9g.2xlarge"
  | (string & {});
export interface ServerProcess {
  LaunchPath?: string;
  Parameters?: string;
  ConcurrentExecutions?: number;
}
export type ServerProcessList = ServerProcess[];
export type MaxConcurrentGameSessionActivations = number;
export type GameSessionActivationTimeoutSeconds = number;
export interface RuntimeConfiguration {
  ServerProcesses?: ServerProcess[];
  MaxConcurrentGameSessionActivations?: number;
  GameSessionActivationTimeoutSeconds?: number;
}
export interface ResourceCreationLimitPolicy {
  NewGameSessionsPerCreator?: number;
  PolicyPeriodInMinutes?: number;
}
export type FleetType = "ON_DEMAND" | "SPOT" | (string & {});
export type CertificateType = "DISABLED" | "GENERATED" | (string & {});
export interface CertificateConfiguration {
  CertificateType?: CertificateType;
}
export type ComputeType = "EC2" | "ANYWHERE" | (string & {});
export type NonNegativeLimitedLengthDouble = string;
export interface AnywhereConfiguration {
  Cost?: string;
}
export type InstanceRoleCredentialsProvider = "SHARED_CREDENTIAL_FILE" | (string & {});
export type GameServerIpProtocolSupported = "IPv4" | "DUAL_STACK" | (string & {});
export interface PlayerGatewayConfiguration {
  GameServerIpProtocolSupported?: GameServerIpProtocolSupported;
}
export interface CreateFleetInput {
  Name?: string;
  Description?: string;
  BuildId?: string;
  ScriptId?: string;
  ServerLaunchPath?: string;
  ServerLaunchParameters?: string;
  LogPaths?: string[];
  EC2InstanceType?: EC2InstanceType;
  EC2InboundPermissions?: IpPermission[];
  NewGameSessionProtectionPolicy?: ProtectionPolicy;
  RuntimeConfiguration?: RuntimeConfiguration;
  ResourceCreationLimitPolicy?: ResourceCreationLimitPolicy;
  MetricGroups?: string[];
  PeerVpcAwsAccountId?: string;
  PeerVpcId?: string;
  FleetType?: FleetType;
  InstanceRoleArn?: string;
  CertificateConfiguration?: CertificateConfiguration;
  Locations?: LocationConfiguration[];
  Tags?: Tag[];
  ComputeType?: ComputeType;
  AnywhereConfiguration?: AnywhereConfiguration;
  InstanceRoleCredentialsProvider?: InstanceRoleCredentialsProvider;
  PlayerGatewayMode?: PlayerGatewayMode;
  PlayerGatewayConfiguration?: PlayerGatewayConfiguration;
}
export type FleetStatus =
  | "NEW"
  | "DOWNLOADING"
  | "VALIDATING"
  | "BUILDING"
  | "ACTIVATING"
  | "ACTIVE"
  | "DELETING"
  | "ERROR"
  | "TERMINATED"
  | "NOT_FOUND"
  | "EXPIRED"
  | (string & {});
export type ScriptId = string;
export type ScriptArn = string;
export type FleetAction = "AUTO_SCALING" | (string & {});
export type FleetActionList = FleetAction[];
export interface FleetAttributes {
  FleetId?: string;
  FleetArn?: string;
  FleetType?: FleetType;
  InstanceType?: EC2InstanceType;
  Description?: string;
  Name?: string;
  CreationTime?: Date;
  TerminationTime?: Date;
  Status?: FleetStatus;
  BuildId?: string;
  BuildArn?: string;
  ScriptId?: string;
  ScriptArn?: string;
  ServerLaunchPath?: string;
  ServerLaunchParameters?: string;
  LogPaths?: string[];
  NewGameSessionProtectionPolicy?: ProtectionPolicy;
  OperatingSystem?: OperatingSystem;
  ResourceCreationLimitPolicy?: ResourceCreationLimitPolicy;
  MetricGroups?: string[];
  StoppedActions?: FleetAction[];
  InstanceRoleArn?: string;
  CertificateConfiguration?: CertificateConfiguration;
  ComputeType?: ComputeType;
  AnywhereConfiguration?: AnywhereConfiguration;
  InstanceRoleCredentialsProvider?: InstanceRoleCredentialsProvider;
  PlayerGatewayMode?: PlayerGatewayMode;
  PlayerGatewayConfiguration?: PlayerGatewayConfiguration;
}
export interface LocationState {
  Location?: string;
  Status?: FleetStatus;
  PlayerGatewayStatus?: PlayerGatewayStatus;
}
export type LocationStateList = LocationState[];
export interface CreateFleetOutput {
  FleetAttributes?: FleetAttributes & {
    CertificateConfiguration: CertificateConfiguration & { CertificateType: CertificateType };
    AnywhereConfiguration: AnywhereConfiguration & { Cost: NonNegativeLimitedLengthDouble };
  };
  LocationStates?: LocationState[];
}
export type FleetIdOrArn = string;
export interface CreateFleetLocationsInput {
  FleetId?: string;
  Locations?: LocationConfiguration[];
}
export interface CreateFleetLocationsOutput {
  FleetId?: string;
  FleetArn?: string;
  LocationStates?: LocationState[];
}
export type LaunchTemplateId = string;
export type LaunchTemplateName = string;
export type LaunchTemplateVersion = string;
export interface LaunchTemplateSpecification {
  LaunchTemplateId?: string;
  LaunchTemplateName?: string;
  Version?: string;
}
export type GameServerGroupInstanceType =
  | "c4.large"
  | "c4.xlarge"
  | "c4.2xlarge"
  | "c4.4xlarge"
  | "c4.8xlarge"
  | "c5.large"
  | "c5.xlarge"
  | "c5.2xlarge"
  | "c5.4xlarge"
  | "c5.9xlarge"
  | "c5.12xlarge"
  | "c5.18xlarge"
  | "c5.24xlarge"
  | "c5a.large"
  | "c5a.xlarge"
  | "c5a.2xlarge"
  | "c5a.4xlarge"
  | "c5a.8xlarge"
  | "c5a.12xlarge"
  | "c5a.16xlarge"
  | "c5a.24xlarge"
  | "c6g.medium"
  | "c6g.large"
  | "c6g.xlarge"
  | "c6g.2xlarge"
  | "c6g.4xlarge"
  | "c6g.8xlarge"
  | "c6g.12xlarge"
  | "c6g.16xlarge"
  | "r4.large"
  | "r4.xlarge"
  | "r4.2xlarge"
  | "r4.4xlarge"
  | "r4.8xlarge"
  | "r4.16xlarge"
  | "r5.large"
  | "r5.xlarge"
  | "r5.2xlarge"
  | "r5.4xlarge"
  | "r5.8xlarge"
  | "r5.12xlarge"
  | "r5.16xlarge"
  | "r5.24xlarge"
  | "r5a.large"
  | "r5a.xlarge"
  | "r5a.2xlarge"
  | "r5a.4xlarge"
  | "r5a.8xlarge"
  | "r5a.12xlarge"
  | "r5a.16xlarge"
  | "r5a.24xlarge"
  | "r6g.medium"
  | "r6g.large"
  | "r6g.xlarge"
  | "r6g.2xlarge"
  | "r6g.4xlarge"
  | "r6g.8xlarge"
  | "r6g.12xlarge"
  | "r6g.16xlarge"
  | "m4.large"
  | "m4.xlarge"
  | "m4.2xlarge"
  | "m4.4xlarge"
  | "m4.10xlarge"
  | "m5.large"
  | "m5.xlarge"
  | "m5.2xlarge"
  | "m5.4xlarge"
  | "m5.8xlarge"
  | "m5.12xlarge"
  | "m5.16xlarge"
  | "m5.24xlarge"
  | "m5a.large"
  | "m5a.xlarge"
  | "m5a.2xlarge"
  | "m5a.4xlarge"
  | "m5a.8xlarge"
  | "m5a.12xlarge"
  | "m5a.16xlarge"
  | "m5a.24xlarge"
  | "m6g.medium"
  | "m6g.large"
  | "m6g.xlarge"
  | "m6g.2xlarge"
  | "m6g.4xlarge"
  | "m6g.8xlarge"
  | "m6g.12xlarge"
  | "m6g.16xlarge"
  | (string & {});
export type WeightedCapacity = string;
export interface InstanceDefinition {
  InstanceType?: GameServerGroupInstanceType;
  WeightedCapacity?: string;
}
export type InstanceDefinitions = InstanceDefinition[];
export type NonNegativeDouble = number;
export interface TargetTrackingConfiguration {
  TargetValue?: number;
}
export interface GameServerGroupAutoScalingPolicy {
  EstimatedInstanceWarmup?: number;
  TargetTrackingConfiguration?: TargetTrackingConfiguration;
}
export type BalancingStrategy = "SPOT_ONLY" | "SPOT_PREFERRED" | "ON_DEMAND_ONLY" | (string & {});
export type GameServerProtectionPolicy = "NO_PROTECTION" | "FULL_PROTECTION" | (string & {});
export type VpcSubnet = string;
export type VpcSubnets = string[];
export interface CreateGameServerGroupInput {
  GameServerGroupName?: string;
  RoleArn?: string;
  MinSize?: number;
  MaxSize?: number;
  LaunchTemplate?: LaunchTemplateSpecification;
  InstanceDefinitions?: InstanceDefinition[];
  AutoScalingPolicy?: GameServerGroupAutoScalingPolicy;
  BalancingStrategy?: BalancingStrategy;
  GameServerProtectionPolicy?: GameServerProtectionPolicy;
  VpcSubnets?: string[];
  Tags?: Tag[];
}
export type AutoScalingGroupArn = string;
export type GameServerGroupStatus =
  | "NEW"
  | "ACTIVATING"
  | "ACTIVE"
  | "DELETE_SCHEDULED"
  | "DELETING"
  | "DELETED"
  | "ERROR"
  | (string & {});
export type GameServerGroupAction = "REPLACE_INSTANCE_TYPES" | (string & {});
export type GameServerGroupActions = GameServerGroupAction[];
export interface GameServerGroup {
  GameServerGroupName?: string;
  GameServerGroupArn?: string;
  RoleArn?: string;
  InstanceDefinitions?: InstanceDefinition[];
  BalancingStrategy?: BalancingStrategy;
  GameServerProtectionPolicy?: GameServerProtectionPolicy;
  AutoScalingGroupArn?: string;
  Status?: GameServerGroupStatus;
  StatusReason?: string;
  SuspendedActions?: GameServerGroupAction[];
  CreationTime?: Date;
  LastUpdatedTime?: Date;
}
export interface CreateGameServerGroupOutput {
  GameServerGroup?: GameServerGroup & {
    InstanceDefinitions: (InstanceDefinition & { InstanceType: GameServerGroupInstanceType })[];
  };
}
export type AliasIdOrArn = string;
export type GamePropertyKey = string;
export type GamePropertyValue = string | redacted.Redacted<string>;
export interface GameProperty {
  Key?: string;
  Value?: string | redacted.Redacted<string>;
}
export type GamePropertyList = GameProperty[];
export type IdStringModel = string;
export type LargeGameSessionData = string | redacted.Redacted<string>;
export interface CreateGameSessionInput {
  FleetId?: string;
  AliasId?: string;
  MaximumPlayerSessionCount?: number;
  Name?: string;
  GameProperties?: GameProperty[];
  CreatorId?: string;
  GameSessionId?: string;
  IdempotencyToken?: string;
  GameSessionData?: string | redacted.Redacted<string>;
  Location?: string;
}
export type GameSessionStatus =
  | "ACTIVE"
  | "ACTIVATING"
  | "TERMINATED"
  | "TERMINATING"
  | "ERROR"
  | (string & {});
export type GameSessionStatusReason =
  | "INTERRUPTED"
  | "TRIGGERED_ON_PROCESS_TERMINATE"
  | "FORCE_TERMINATED"
  | (string & {});
export type IpAddress = string | redacted.Redacted<string>;
export type DnsName = string;
export type PlayerSessionCreationPolicy = "ACCEPT_ALL" | "DENY_ALL" | (string & {});
export type MatchmakerData = string | redacted.Redacted<string>;
export type ComputeName = string;
export interface GameSession {
  GameSessionId?: string;
  Name?: string;
  FleetId?: string;
  FleetArn?: string;
  CreationTime?: Date;
  TerminationTime?: Date;
  CurrentPlayerSessionCount?: number;
  MaximumPlayerSessionCount?: number;
  Status?: GameSessionStatus;
  StatusReason?: GameSessionStatusReason;
  GameProperties?: GameProperty[];
  IpAddress?: string | redacted.Redacted<string>;
  DnsName?: string;
  Port?: number;
  PlayerSessionCreationPolicy?: PlayerSessionCreationPolicy;
  CreatorId?: string;
  GameSessionData?: string | redacted.Redacted<string>;
  MatchmakerData?: string | redacted.Redacted<string>;
  Location?: string;
  ComputeName?: string;
  PlayerGatewayStatus?: PlayerGatewayStatus;
}
export interface CreateGameSessionOutput {
  GameSession?: GameSession & {
    GameProperties: (GameProperty & { Key: GamePropertyKey; Value: GamePropertyValue })[];
  };
}
export type GameSessionQueueName = string;
export interface PlayerLatencyPolicy {
  MaximumIndividualPlayerLatencyMilliseconds?: number;
  PolicyDurationSeconds?: number;
}
export type PlayerLatencyPolicyList = PlayerLatencyPolicy[];
export type ArnStringModel = string;
export interface GameSessionQueueDestination {
  DestinationArn?: string;
}
export type GameSessionQueueDestinationList = GameSessionQueueDestination[];
export type LocationList = string[];
export interface FilterConfiguration {
  AllowedLocations?: string[];
}
export type PriorityType = "LATENCY" | "COST" | "DESTINATION" | "LOCATION" | (string & {});
export type PriorityTypeList = PriorityType[];
export interface PriorityConfiguration {
  PriorityOrder?: PriorityType[];
  LocationOrder?: string[];
}
export type QueueCustomEventData = string | redacted.Redacted<string>;
export type QueueSnsArnStringModel = string;
export interface CreateGameSessionQueueInput {
  Name?: string;
  TimeoutInSeconds?: number;
  PlayerLatencyPolicies?: PlayerLatencyPolicy[];
  Destinations?: GameSessionQueueDestination[];
  FilterConfiguration?: FilterConfiguration;
  PriorityConfiguration?: PriorityConfiguration;
  CustomEventData?: string | redacted.Redacted<string>;
  NotificationTarget?: string;
  Tags?: Tag[];
}
export type GameSessionQueueArn = string;
export interface GameSessionQueue {
  Name?: string;
  GameSessionQueueArn?: string;
  TimeoutInSeconds?: number;
  PlayerLatencyPolicies?: PlayerLatencyPolicy[];
  Destinations?: GameSessionQueueDestination[];
  FilterConfiguration?: FilterConfiguration;
  PriorityConfiguration?: PriorityConfiguration;
  CustomEventData?: string | redacted.Redacted<string>;
  NotificationTarget?: string;
}
export interface CreateGameSessionQueueOutput {
  GameSessionQueue?: GameSessionQueue;
}
export type CustomInputLocationStringModel = string;
export interface CreateLocationInput {
  LocationName?: string;
  Tags?: Tag[];
}
export type LocationArnModel = string;
export interface UDPEndpoint {
  Domain?: string;
  Port?: number;
}
export interface PingBeacon {
  UDPEndpoint?: UDPEndpoint;
}
export interface LocationModel {
  LocationName?: string;
  LocationArn?: string;
  PingBeacon?: PingBeacon;
}
export interface CreateLocationOutput {
  Location?: LocationModel;
}
export type QueueArnsList = string[];
export type MatchmakingRequestTimeoutInteger = number;
export type MatchmakingAcceptanceTimeoutInteger = number;
export type MatchmakingRuleSetName = string;
export type SnsArnStringModel = string;
export type CustomEventData = string | redacted.Redacted<string>;
export type GameSessionData = string | redacted.Redacted<string>;
export type BackfillMode = "AUTOMATIC" | "MANUAL" | (string & {});
export type FlexMatchMode = "STANDALONE" | "WITH_QUEUE" | (string & {});
export interface CreateMatchmakingConfigurationInput {
  Name?: string;
  Description?: string;
  GameSessionQueueArns?: string[];
  RequestTimeoutSeconds?: number;
  AcceptanceTimeoutSeconds?: number;
  AcceptanceRequired?: boolean;
  RuleSetName?: string;
  NotificationTarget?: string;
  AdditionalPlayerCount?: number;
  CustomEventData?: string | redacted.Redacted<string>;
  GameProperties?: GameProperty[];
  GameSessionData?: string | redacted.Redacted<string>;
  BackfillMode?: BackfillMode;
  FlexMatchMode?: FlexMatchMode;
  Tags?: Tag[];
}
export type MatchmakingConfigurationArn = string;
export type MatchmakingRuleSetArn = string;
export interface MatchmakingConfiguration {
  Name?: string;
  ConfigurationArn?: string;
  Description?: string;
  GameSessionQueueArns?: string[];
  RequestTimeoutSeconds?: number;
  AcceptanceTimeoutSeconds?: number;
  AcceptanceRequired?: boolean;
  RuleSetName?: string;
  RuleSetArn?: string;
  NotificationTarget?: string;
  AdditionalPlayerCount?: number;
  CustomEventData?: string | redacted.Redacted<string>;
  CreationTime?: Date;
  GameProperties?: GameProperty[];
  GameSessionData?: string | redacted.Redacted<string>;
  BackfillMode?: BackfillMode;
  FlexMatchMode?: FlexMatchMode;
}
export interface CreateMatchmakingConfigurationOutput {
  Configuration?: MatchmakingConfiguration & {
    GameProperties: (GameProperty & { Key: GamePropertyKey; Value: GamePropertyValue })[];
  };
}
export type RuleSetBody = string;
export interface CreateMatchmakingRuleSetInput {
  Name?: string;
  RuleSetBody?: string;
  Tags?: Tag[];
}
export interface MatchmakingRuleSet {
  RuleSetName?: string;
  RuleSetArn?: string;
  RuleSetBody?: string;
  CreationTime?: Date;
}
export interface CreateMatchmakingRuleSetOutput {
  RuleSet: MatchmakingRuleSet & { RuleSetBody: RuleSetBody };
}
export type PlayerData = string | redacted.Redacted<string>;
export interface CreatePlayerSessionInput {
  GameSessionId?: string;
  PlayerId?: string | redacted.Redacted<string>;
  PlayerData?: string | redacted.Redacted<string>;
}
export type PlayerSessionId = string;
export type PlayerSessionStatus = "RESERVED" | "ACTIVE" | "COMPLETED" | "TIMEDOUT" | (string & {});
export interface PlayerSession {
  PlayerSessionId?: string;
  PlayerId?: string | redacted.Redacted<string>;
  GameSessionId?: string;
  FleetId?: string;
  FleetArn?: string;
  CreationTime?: Date;
  TerminationTime?: Date;
  Status?: PlayerSessionStatus;
  IpAddress?: string | redacted.Redacted<string>;
  DnsName?: string;
  Port?: number;
  PlayerData?: string | redacted.Redacted<string>;
}
export interface CreatePlayerSessionOutput {
  PlayerSession?: PlayerSession;
}
export type PlayerIdList = (string | redacted.Redacted<string>)[];
export type PlayerDataMap = { [key: string]: string | redacted.Redacted<string> | undefined };
export interface CreatePlayerSessionsInput {
  GameSessionId?: string;
  PlayerIds?: (string | redacted.Redacted<string>)[];
  PlayerDataMap?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export type PlayerSessionList = PlayerSession[];
export interface CreatePlayerSessionsOutput {
  PlayerSessions?: PlayerSession[];
}
export type ZipBlob = Uint8Array;
export type NodeJsVersion = string;
export interface CreateScriptInput {
  Name?: string;
  Version?: string;
  StorageLocation?: S3Location;
  ZipFile?: Uint8Array;
  Tags?: Tag[];
  NodeJsVersion?: string;
}
export interface Script {
  ScriptId?: string;
  ScriptArn?: string;
  Name?: string;
  Version?: string;
  SizeOnDisk?: number;
  CreationTime?: Date;
  StorageLocation?: S3Location;
  NodeJsVersion?: string;
}
export interface CreateScriptOutput {
  Script?: Script;
}
export interface CreateVpcPeeringAuthorizationInput {
  GameLiftAwsAccountId?: string;
  PeerVpcId?: string;
}
export interface VpcPeeringAuthorization {
  GameLiftAwsAccountId?: string;
  PeerVpcAwsAccountId?: string;
  PeerVpcId?: string;
  CreationTime?: Date;
  ExpirationTime?: Date;
}
export interface CreateVpcPeeringAuthorizationOutput {
  VpcPeeringAuthorization?: VpcPeeringAuthorization;
}
export interface CreateVpcPeeringConnectionInput {
  FleetId?: string;
  PeerVpcAwsAccountId?: string;
  PeerVpcId?: string;
}
export interface CreateVpcPeeringConnectionOutput {}
export interface DeleteAliasInput {
  AliasId?: string;
}
export interface DeleteAliasResponse {}
export interface DeleteBuildInput {
  BuildId?: string;
}
export interface DeleteBuildResponse {}
export interface DeleteContainerFleetInput {
  FleetId?: string;
}
export interface DeleteContainerFleetOutput {}
export interface DeleteContainerGroupDefinitionInput {
  Name?: string;
  VersionNumber?: number;
  VersionCountToRetain?: number;
}
export interface DeleteContainerGroupDefinitionOutput {}
export interface DeleteFleetInput {
  FleetId?: string;
}
export interface DeleteFleetResponse {}
export interface DeleteFleetLocationsInput {
  FleetId?: string;
  Locations?: string[];
}
export interface DeleteFleetLocationsOutput {
  FleetId?: string;
  FleetArn?: string;
  LocationStates?: LocationState[];
}
export type GameServerGroupDeleteOption = "SAFE_DELETE" | "FORCE_DELETE" | "RETAIN" | (string & {});
export interface DeleteGameServerGroupInput {
  GameServerGroupName?: string;
  DeleteOption?: GameServerGroupDeleteOption;
}
export interface DeleteGameServerGroupOutput {
  GameServerGroup?: GameServerGroup & {
    InstanceDefinitions: (InstanceDefinition & { InstanceType: GameServerGroupInstanceType })[];
  };
}
export type GameSessionQueueNameOrArn = string;
export interface DeleteGameSessionQueueInput {
  Name?: string;
}
export interface DeleteGameSessionQueueOutput {}
export type CustomLocationNameOrArnModel = string;
export interface DeleteLocationInput {
  LocationName?: string;
}
export interface DeleteLocationOutput {}
export type MatchmakingConfigurationName = string;
export interface DeleteMatchmakingConfigurationInput {
  Name?: string;
}
export interface DeleteMatchmakingConfigurationOutput {}
export interface DeleteMatchmakingRuleSetInput {
  Name?: string;
}
export interface DeleteMatchmakingRuleSetOutput {}
export interface DeleteScalingPolicyInput {
  Name?: string;
  FleetId?: string;
}
export interface DeleteScalingPolicyResponse {}
export interface DeleteScriptInput {
  ScriptId?: string;
}
export interface DeleteScriptResponse {}
export interface DeleteVpcPeeringAuthorizationInput {
  GameLiftAwsAccountId?: string;
  PeerVpcId?: string;
}
export interface DeleteVpcPeeringAuthorizationOutput {}
export interface DeleteVpcPeeringConnectionInput {
  FleetId?: string;
  VpcPeeringConnectionId?: string;
}
export interface DeleteVpcPeeringConnectionOutput {}
export type ComputeNameOrArn = string;
export interface DeregisterComputeInput {
  FleetId?: string;
  ComputeName?: string;
}
export interface DeregisterComputeOutput {}
export interface DeregisterGameServerInput {
  GameServerGroupName?: string;
  GameServerId?: string;
}
export interface DeregisterGameServerResponse {}
export interface DescribeAliasInput {
  AliasId?: string;
}
export interface DescribeAliasOutput {
  Alias?: Alias;
}
export interface DescribeBuildInput {
  BuildId?: string;
}
export interface DescribeBuildOutput {
  Build?: Build;
}
export interface DescribeComputeInput {
  FleetId?: string;
  ComputeName?: string;
}
export type ComputeArn = string;
export type ComputeStatus = "PENDING" | "ACTIVE" | "TERMINATING" | "IMPAIRED" | (string & {});
export type GameLiftServiceSdkEndpointOutput = string;
export type GameLiftAgentEndpointOutput = string;
export type InstanceId = string;
export interface ContainerAttribute {
  ContainerName?: string;
  ContainerRuntimeId?: string;
}
export type ContainerAttributes = ContainerAttribute[];
export interface Compute {
  FleetId?: string;
  FleetArn?: string;
  ComputeName?: string;
  ComputeArn?: string;
  IpAddress?: string | redacted.Redacted<string>;
  DnsName?: string;
  ComputeStatus?: ComputeStatus;
  Location?: string;
  CreationTime?: Date;
  OperatingSystem?: OperatingSystem;
  Type?: EC2InstanceType;
  GameLiftServiceSdkEndpoint?: string;
  GameLiftAgentEndpoint?: string;
  InstanceId?: string;
  ContainerAttributes?: ContainerAttribute[];
  GameServerContainerGroupDefinitionArn?: string;
}
export interface DescribeComputeOutput {
  Compute?: Compute;
}
export interface DescribeContainerFleetInput {
  FleetId?: string;
}
export interface DescribeContainerFleetOutput {
  ContainerFleet?: ContainerFleet & {
    InstanceConnectionPortRange: ConnectionPortRange & { FromPort: PortNumber; ToPort: PortNumber };
    InstanceInboundPermissions: (IpPermission & {
      FromPort: PortNumber;
      ToPort: PortNumber;
      IpRange: IpRange;
      Protocol: IpProtocol;
    })[];
  };
}
export interface DescribeContainerGroupDefinitionInput {
  Name?: string;
  VersionNumber?: number;
}
export interface DescribeContainerGroupDefinitionOutput {
  ContainerGroupDefinition?: ContainerGroupDefinition & {
    Name: ContainerGroupDefinitionName;
    GameServerContainerDefinition: GameServerContainerDefinition & {
      DependsOn: (ContainerDependency & {
        ContainerName: NonZeroAnd128MaxAsciiString;
        Condition: ContainerDependencyCondition;
      })[];
      MountPoints: (ContainerMountPoint & { InstancePath: InstancePathString })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      PortConfiguration: ContainerPortConfiguration & {
        ContainerPortRanges: (ContainerPortRange & {
          FromPort: PortNumber;
          ToPort: PortNumber;
          Protocol: IpProtocol;
        })[];
      };
    };
    SupportContainerDefinitions: (SupportContainerDefinition & {
      DependsOn: (ContainerDependency & {
        ContainerName: NonZeroAnd128MaxAsciiString;
        Condition: ContainerDependencyCondition;
      })[];
      MountPoints: (ContainerMountPoint & { InstancePath: InstancePathString })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      HealthCheck: ContainerHealthCheck & { Command: ContainerCommandStringList };
      PortConfiguration: ContainerPortConfiguration & {
        ContainerPortRanges: (ContainerPortRange & {
          FromPort: PortNumber;
          ToPort: PortNumber;
          Protocol: IpProtocol;
        })[];
      };
    })[];
  };
}
export type ContainerNameQueryFilter = string;
export interface DescribeContainerGroupPortMappingsInput {
  FleetId?: string;
  ContainerGroupType?: ContainerGroupType;
  ComputeName?: string;
  InstanceId?: string;
  ContainerName?: string;
}
export interface ContainerPortMapping {
  ContainerPort?: number;
  ConnectionPort?: number;
  Protocol?: IpProtocol;
}
export type ContainerPortMappingList = ContainerPortMapping[];
export interface ContainerGroupPortMapping {
  ContainerName?: string;
  ContainerRuntimeId?: string;
  ContainerPortMappings?: ContainerPortMapping[];
}
export type ContainerGroupPortMappingList = ContainerGroupPortMapping[];
export interface DescribeContainerGroupPortMappingsOutput {
  FleetId?: string;
  FleetArn?: string;
  Location?: string;
  ContainerGroupDefinitionArn?: string;
  ContainerGroupType?: ContainerGroupType;
  ComputeName?: string;
  InstanceId?: string;
  ContainerGroupPortMappings?: ContainerGroupPortMapping[];
}
export interface DescribeEC2InstanceLimitsInput {
  EC2InstanceType?: EC2InstanceType;
  Location?: string;
}
export interface EC2InstanceLimit {
  EC2InstanceType?: EC2InstanceType;
  CurrentInstances?: number;
  InstanceLimit?: number;
  Location?: string;
}
export type EC2InstanceLimitList = EC2InstanceLimit[];
export interface DescribeEC2InstanceLimitsOutput {
  EC2InstanceLimits?: EC2InstanceLimit[];
}
export type FleetIdOrArnList = string[];
export interface DescribeFleetAttributesInput {
  FleetIds?: string[];
  Limit?: number;
  NextToken?: string;
}
export type FleetAttributesList = FleetAttributes[];
export interface DescribeFleetAttributesOutput {
  FleetAttributes?: (FleetAttributes & {
    CertificateConfiguration: CertificateConfiguration & { CertificateType: CertificateType };
    AnywhereConfiguration: AnywhereConfiguration & { Cost: NonNegativeLimitedLengthDouble };
  })[];
  NextToken?: string;
}
export interface DescribeFleetCapacityInput {
  FleetIds?: string[];
  Limit?: number;
  NextToken?: string;
}
export interface EC2InstanceCounts {
  DESIRED?: number;
  MINIMUM?: number;
  MAXIMUM?: number;
  PENDING?: number;
  ACTIVE?: number;
  IDLE?: number;
  TERMINATING?: number;
}
export interface GameServerContainerGroupCounts {
  PENDING?: number;
  ACTIVE?: number;
  IDLE?: number;
  TERMINATING?: number;
}
export type ZeroCapacityStrategy = "MANUAL" | "SCALE_TO_AND_FROM_ZERO" | (string & {});
export type ScaleInAfterInactivityMinutes = number;
export interface ManagedCapacityConfiguration {
  ZeroCapacityStrategy?: ZeroCapacityStrategy;
  ScaleInAfterInactivityMinutes?: number;
}
export interface FleetCapacity {
  FleetId?: string;
  FleetArn?: string;
  InstanceType?: EC2InstanceType;
  InstanceCounts?: EC2InstanceCounts;
  Location?: string;
  GameServerContainerGroupCounts?: GameServerContainerGroupCounts;
  ManagedCapacityConfiguration?: ManagedCapacityConfiguration;
}
export type FleetCapacityList = FleetCapacity[];
export interface DescribeFleetCapacityOutput {
  FleetCapacity?: FleetCapacity[];
  NextToken?: string;
}
export interface DescribeFleetDeploymentInput {
  FleetId?: string;
  DeploymentId?: string;
}
export type FleetBinaryArn = string;
export type DeploymentStatus =
  | "IN_PROGRESS"
  | "IMPAIRED"
  | "COMPLETE"
  | "ROLLBACK_IN_PROGRESS"
  | "ROLLBACK_COMPLETE"
  | "CANCELLED"
  | "PENDING"
  | (string & {});
export type DeploymentProtectionStrategy = "WITH_PROTECTION" | "IGNORE_PROTECTION" | (string & {});
export type MinimumHealthyPercentage = number;
export type DeploymentImpairmentStrategy = "MAINTAIN" | "ROLLBACK" | (string & {});
export interface DeploymentConfiguration {
  ProtectionStrategy?: DeploymentProtectionStrategy;
  MinimumHealthyPercentage?: number;
  ImpairmentStrategy?: DeploymentImpairmentStrategy;
}
export interface FleetDeployment {
  DeploymentId?: string;
  FleetId?: string;
  GameServerBinaryArn?: string;
  RollbackGameServerBinaryArn?: string;
  PerInstanceBinaryArn?: string;
  RollbackPerInstanceBinaryArn?: string;
  DeploymentStatus?: DeploymentStatus;
  DeploymentConfiguration?: DeploymentConfiguration;
  CreationTime?: Date;
}
export interface LocationalDeployment {
  DeploymentStatus?: DeploymentStatus;
}
export type LocationalDeployments = { [key: string]: LocationalDeployment | undefined };
export interface DescribeFleetDeploymentOutput {
  FleetDeployment?: FleetDeployment;
  LocationalDeployments?: { [key: string]: LocationalDeployment | undefined };
}
export interface DescribeFleetEventsInput {
  FleetId?: string;
  StartTime?: Date;
  EndTime?: Date;
  Limit?: number;
  NextToken?: string;
}
export type EventCode =
  | "GENERIC_EVENT"
  | "FLEET_CREATED"
  | "FLEET_DELETED"
  | "FLEET_EXPIRED"
  | "FLEET_SCALING_EVENT"
  | "FLEET_STATE_DOWNLOADING"
  | "FLEET_STATE_VALIDATING"
  | "FLEET_STATE_BUILDING"
  | "FLEET_STATE_ACTIVATING"
  | "FLEET_STATE_ACTIVE"
  | "FLEET_STATE_ERROR"
  | "FLEET_STATE_PENDING"
  | "FLEET_STATE_CREATING"
  | "FLEET_STATE_CREATED"
  | "FLEET_STATE_UPDATING"
  | "FLEET_INITIALIZATION_FAILED"
  | "FLEET_BINARY_DOWNLOAD_FAILED"
  | "FLEET_VALIDATION_LAUNCH_PATH_NOT_FOUND"
  | "FLEET_VALIDATION_EXECUTABLE_RUNTIME_FAILURE"
  | "FLEET_VALIDATION_TIMED_OUT"
  | "FLEET_ACTIVATION_FAILED"
  | "FLEET_ACTIVATION_FAILED_NO_INSTANCES"
  | "FLEET_NEW_GAME_SESSION_PROTECTION_POLICY_UPDATED"
  | "SERVER_PROCESS_INVALID_PATH"
  | "SERVER_PROCESS_SDK_INITIALIZATION_TIMEOUT"
  | "SERVER_PROCESS_PROCESS_READY_TIMEOUT"
  | "SERVER_PROCESS_CRASHED"
  | "SERVER_PROCESS_TERMINATED_UNHEALTHY"
  | "SERVER_PROCESS_FORCE_TERMINATED"
  | "SERVER_PROCESS_PROCESS_EXIT_TIMEOUT"
  | "SERVER_PROCESS_SDK_INITIALIZATION_FAILED"
  | "SERVER_PROCESS_MISCONFIGURED_CONTAINER_PORT"
  | "GAME_SESSION_ACTIVATION_TIMEOUT"
  | "FLEET_CREATION_EXTRACTING_BUILD"
  | "FLEET_CREATION_RUNNING_INSTALLER"
  | "FLEET_CREATION_VALIDATING_RUNTIME_CONFIG"
  | "FLEET_VPC_PEERING_SUCCEEDED"
  | "FLEET_VPC_PEERING_FAILED"
  | "FLEET_VPC_PEERING_DELETED"
  | "INSTANCE_INTERRUPTED"
  | "INSTANCE_RECYCLED"
  | "INSTANCE_REPLACED_UNHEALTHY"
  | "FLEET_CREATION_COMPLETED_INSTALLER"
  | "FLEET_CREATION_FAILED_INSTALLER"
  | "COMPUTE_LOG_UPLOAD_FAILED"
  | "GAME_SERVER_CONTAINER_GROUP_CRASHED"
  | "PER_INSTANCE_CONTAINER_GROUP_CRASHED"
  | "GAME_SERVER_CONTAINER_GROUP_REPLACED_UNHEALTHY"
  | "LOCATION_STATE_PENDING"
  | "LOCATION_STATE_CREATING"
  | "LOCATION_STATE_CREATED"
  | "LOCATION_STATE_ACTIVATING"
  | "LOCATION_STATE_ACTIVE"
  | "LOCATION_STATE_UPDATING"
  | "LOCATION_STATE_ERROR"
  | "LOCATION_STATE_DELETING"
  | "LOCATION_STATE_DELETED"
  | (string & {});
export type EventCount = number;
export interface Event {
  EventId?: string;
  ResourceId?: string;
  EventCode?: EventCode;
  Message?: string;
  EventTime?: Date;
  PreSignedLogUrl?: string;
  Count?: number;
}
export type EventList = Event[];
export interface DescribeFleetEventsOutput {
  Events?: Event[];
  NextToken?: string;
}
export interface DescribeFleetLocationAttributesInput {
  FleetId?: string;
  Locations?: string[];
  Limit?: number;
  NextToken?: string;
}
export type LocationUpdateStatus = "PENDING_UPDATE" | (string & {});
export interface LocationAttributes {
  LocationState?: LocationState;
  StoppedActions?: FleetAction[];
  UpdateStatus?: LocationUpdateStatus;
}
export type LocationAttributesList = LocationAttributes[];
export interface DescribeFleetLocationAttributesOutput {
  FleetId?: string;
  FleetArn?: string;
  LocationAttributes?: LocationAttributes[];
  NextToken?: string;
}
export interface DescribeFleetLocationCapacityInput {
  FleetId?: string;
  Location?: string;
}
export interface DescribeFleetLocationCapacityOutput {
  FleetCapacity?: FleetCapacity;
}
export interface DescribeFleetLocationUtilizationInput {
  FleetId?: string;
  Location?: string;
}
export interface FleetUtilization {
  FleetId?: string;
  FleetArn?: string;
  ActiveServerProcessCount?: number;
  ActiveGameSessionCount?: number;
  CurrentPlayerSessionCount?: number;
  MaximumPlayerSessionCount?: number;
  Location?: string;
}
export interface DescribeFleetLocationUtilizationOutput {
  FleetUtilization?: FleetUtilization;
}
export interface DescribeFleetPortSettingsInput {
  FleetId?: string;
  Location?: string;
}
export interface DescribeFleetPortSettingsOutput {
  FleetId?: string;
  FleetArn?: string;
  InboundPermissions?: (IpPermission & {
    FromPort: PortNumber;
    ToPort: PortNumber;
    IpRange: IpRange;
    Protocol: IpProtocol;
  })[];
  UpdateStatus?: LocationUpdateStatus;
  Location?: string;
}
export interface DescribeFleetUtilizationInput {
  FleetIds?: string[];
  Limit?: number;
  NextToken?: string;
}
export type FleetUtilizationList = FleetUtilization[];
export interface DescribeFleetUtilizationOutput {
  FleetUtilization?: FleetUtilization[];
  NextToken?: string;
}
export interface DescribeGameServerInput {
  GameServerGroupName?: string;
  GameServerId?: string;
}
export interface DescribeGameServerOutput {
  GameServer?: GameServer;
}
export interface DescribeGameServerGroupInput {
  GameServerGroupName?: string;
}
export interface DescribeGameServerGroupOutput {
  GameServerGroup?: GameServerGroup & {
    InstanceDefinitions: (InstanceDefinition & { InstanceType: GameServerGroupInstanceType })[];
  };
}
export type GameServerInstanceIds = string[];
export interface DescribeGameServerInstancesInput {
  GameServerGroupName?: string;
  InstanceIds?: string[];
  Limit?: number;
  NextToken?: string;
}
export type GameServerInstanceStatus = "ACTIVE" | "DRAINING" | "SPOT_TERMINATING" | (string & {});
export interface GameServerInstance {
  GameServerGroupName?: string;
  GameServerGroupArn?: string;
  InstanceId?: string;
  InstanceStatus?: GameServerInstanceStatus;
}
export type GameServerInstances = GameServerInstance[];
export interface DescribeGameServerInstancesOutput {
  GameServerInstances?: GameServerInstance[];
  NextToken?: string;
}
export interface DescribeGameSessionDetailsInput {
  FleetId?: string;
  GameSessionId?: string;
  AliasId?: string;
  Location?: string;
  StatusFilter?: string;
  Limit?: number;
  NextToken?: string;
}
export interface GameSessionDetail {
  GameSession?: GameSession;
  ProtectionPolicy?: ProtectionPolicy;
}
export type GameSessionDetailList = GameSessionDetail[];
export interface DescribeGameSessionDetailsOutput {
  GameSessionDetails?: (GameSessionDetail & {
    GameSession: GameSession & {
      GameProperties: (GameProperty & { Key: GamePropertyKey; Value: GamePropertyValue })[];
    };
  })[];
  NextToken?: string;
}
export interface DescribeGameSessionPlacementInput {
  PlacementId?: string;
}
export type GameSessionPlacementState =
  | "PENDING"
  | "FULFILLED"
  | "CANCELLED"
  | "TIMED_OUT"
  | "FAILED"
  | (string & {});
export interface PlayerLatency {
  PlayerId?: string | redacted.Redacted<string>;
  RegionIdentifier?: string;
  LatencyInMilliseconds?: number;
}
export type PlayerLatencyList = PlayerLatency[];
export interface PlacedPlayerSession {
  PlayerId?: string | redacted.Redacted<string>;
  PlayerSessionId?: string;
}
export type PlacedPlayerSessionList = PlacedPlayerSession[];
export type PlacementFallbackStrategy = "DEFAULT_AFTER_SINGLE_PASS" | "NONE" | (string & {});
export type LocationOrderOverrideList = string[];
export interface PriorityConfigurationOverride {
  PlacementFallbackStrategy?: PlacementFallbackStrategy;
  LocationOrder?: string[];
}
export interface GameSessionPlacement {
  PlacementId?: string;
  GameSessionQueueName?: string;
  Status?: GameSessionPlacementState;
  GameProperties?: GameProperty[];
  MaximumPlayerSessionCount?: number;
  GameSessionName?: string;
  GameSessionId?: string;
  GameSessionArn?: string;
  GameSessionRegion?: string;
  PlayerLatencies?: PlayerLatency[];
  StartTime?: Date;
  EndTime?: Date;
  IpAddress?: string | redacted.Redacted<string>;
  DnsName?: string;
  Port?: number;
  PlacedPlayerSessions?: PlacedPlayerSession[];
  GameSessionData?: string | redacted.Redacted<string>;
  MatchmakerData?: string | redacted.Redacted<string>;
  PriorityConfigurationOverride?: PriorityConfigurationOverride;
  PlayerGatewayStatus?: PlayerGatewayStatus;
}
export interface DescribeGameSessionPlacementOutput {
  GameSessionPlacement?: GameSessionPlacement & {
    GameProperties: (GameProperty & { Key: GamePropertyKey; Value: GamePropertyValue })[];
    PriorityConfigurationOverride: PriorityConfigurationOverride & {
      LocationOrder: LocationOrderOverrideList;
    };
  };
}
export type GameSessionQueueNameOrArnList = string[];
export interface DescribeGameSessionQueuesInput {
  Names?: string[];
  Limit?: number;
  NextToken?: string;
}
export type GameSessionQueueList = GameSessionQueue[];
export interface DescribeGameSessionQueuesOutput {
  GameSessionQueues?: GameSessionQueue[];
  NextToken?: string;
}
export interface DescribeGameSessionsInput {
  FleetId?: string;
  GameSessionId?: string;
  AliasId?: string;
  Location?: string;
  StatusFilter?: string;
  Limit?: number;
  NextToken?: string;
}
export type GameSessionList = GameSession[];
export interface DescribeGameSessionsOutput {
  GameSessions?: (GameSession & {
    GameProperties: (GameProperty & { Key: GamePropertyKey; Value: GamePropertyValue })[];
  })[];
  NextToken?: string;
}
export interface DescribeInstancesInput {
  FleetId?: string;
  InstanceId?: string;
  Limit?: number;
  NextToken?: string;
  Location?: string;
}
export type InstanceStatus = "PENDING" | "ACTIVE" | "TERMINATING" | (string & {});
export interface Instance {
  FleetId?: string;
  FleetArn?: string;
  InstanceId?: string;
  IpAddress?: string | redacted.Redacted<string>;
  DnsName?: string;
  OperatingSystem?: OperatingSystem;
  Type?: EC2InstanceType;
  Status?: InstanceStatus;
  CreationTime?: Date;
  Location?: string;
}
export type InstanceList = Instance[];
export interface DescribeInstancesOutput {
  Instances?: Instance[];
  NextToken?: string;
}
export type MatchmakingIdList = string[];
export interface DescribeMatchmakingInput {
  TicketIds?: string[];
}
export type MatchmakingConfigurationStatus =
  | "CANCELLED"
  | "COMPLETED"
  | "FAILED"
  | "PLACING"
  | "QUEUED"
  | "REQUIRES_ACCEPTANCE"
  | "SEARCHING"
  | "TIMED_OUT"
  | (string & {});
export type StringModel = string;
export type PlayerAttributeString = string;
export type DoubleObject = number;
export type PlayerAttributeStringList = string[];
export type PlayerAttributeStringDoubleMap = { [key: string]: number | undefined };
export interface AttributeValue {
  S?: string;
  N?: number;
  SL?: string[];
  SDM?: { [key: string]: number | undefined };
}
export type PlayerAttributeMap = { [key: string]: AttributeValue | undefined };
export type LatencyMap = { [key: string]: number | undefined };
export interface Player {
  PlayerId?: string | redacted.Redacted<string>;
  PlayerAttributes?: { [key: string]: AttributeValue | undefined };
  Team?: string;
  LatencyInMs?: { [key: string]: number | undefined };
}
export type PlayerList = Player[];
export interface MatchedPlayerSession {
  PlayerId?: string | redacted.Redacted<string>;
  PlayerSessionId?: string;
}
export type MatchedPlayerSessionList = MatchedPlayerSession[];
export interface GameSessionConnectionInfo {
  GameSessionArn?: string;
  IpAddress?: string | redacted.Redacted<string>;
  DnsName?: string;
  Port?: number;
  MatchedPlayerSessions?: MatchedPlayerSession[];
  PlayerGatewayStatus?: PlayerGatewayStatus;
}
export interface MatchmakingTicket {
  TicketId?: string;
  ConfigurationName?: string;
  ConfigurationArn?: string;
  Status?: MatchmakingConfigurationStatus;
  StatusReason?: string;
  StatusMessage?: string;
  StartTime?: Date;
  EndTime?: Date;
  Players?: Player[];
  GameSessionConnectionInfo?: GameSessionConnectionInfo;
  EstimatedWaitTime?: number;
}
export type MatchmakingTicketList = MatchmakingTicket[];
export interface DescribeMatchmakingOutput {
  TicketList?: MatchmakingTicket[];
}
export type MatchmakingConfigurationNameList = string[];
export interface DescribeMatchmakingConfigurationsInput {
  Names?: string[];
  RuleSetName?: string;
  Limit?: number;
  NextToken?: string;
}
export type MatchmakingConfigurationList = MatchmakingConfiguration[];
export interface DescribeMatchmakingConfigurationsOutput {
  Configurations?: (MatchmakingConfiguration & {
    GameProperties: (GameProperty & { Key: GamePropertyKey; Value: GamePropertyValue })[];
  })[];
  NextToken?: string;
}
export type MatchmakingRuleSetNameList = string[];
export type RuleSetLimit = number;
export interface DescribeMatchmakingRuleSetsInput {
  Names?: string[];
  Limit?: number;
  NextToken?: string;
}
export type MatchmakingRuleSetList = MatchmakingRuleSet[];
export interface DescribeMatchmakingRuleSetsOutput {
  RuleSets: (MatchmakingRuleSet & { RuleSetBody: RuleSetBody })[];
  NextToken?: string;
}
export interface DescribePlayerSessionsInput {
  GameSessionId?: string;
  PlayerId?: string | redacted.Redacted<string>;
  PlayerSessionId?: string;
  PlayerSessionStatusFilter?: string;
  Limit?: number;
  NextToken?: string;
}
export interface DescribePlayerSessionsOutput {
  PlayerSessions?: PlayerSession[];
  NextToken?: string;
}
export interface DescribeRuntimeConfigurationInput {
  FleetId?: string;
}
export interface DescribeRuntimeConfigurationOutput {
  RuntimeConfiguration?: RuntimeConfiguration & {
    ServerProcesses: (ServerProcess & {
      LaunchPath: LaunchPathStringModel;
      ConcurrentExecutions: PositiveInteger;
    })[];
  };
}
export type ScalingStatusType =
  | "ACTIVE"
  | "UPDATE_REQUESTED"
  | "UPDATING"
  | "DELETE_REQUESTED"
  | "DELETING"
  | "DELETED"
  | "ERROR"
  | (string & {});
export interface DescribeScalingPoliciesInput {
  FleetId?: string;
  StatusFilter?: ScalingStatusType;
  Limit?: number;
  NextToken?: string;
  Location?: string;
}
export type ScalingAdjustmentType =
  | "ChangeInCapacity"
  | "ExactCapacity"
  | "PercentChangeInCapacity"
  | (string & {});
export type ComparisonOperatorType =
  | "GreaterThanOrEqualToThreshold"
  | "GreaterThanThreshold"
  | "LessThanThreshold"
  | "LessThanOrEqualToThreshold"
  | (string & {});
export type MetricName =
  | "ActivatingGameSessions"
  | "ActiveGameSessions"
  | "ActiveInstances"
  | "AvailableGameSessions"
  | "AvailablePlayerSessions"
  | "CurrentPlayerSessions"
  | "IdleInstances"
  | "PercentAvailableGameSessions"
  | "PercentIdleInstances"
  | "QueueDepth"
  | "WaitTime"
  | "ConcurrentActivatableGameSessions"
  | (string & {});
export type PolicyType = "RuleBased" | "TargetBased" | (string & {});
export interface TargetConfiguration {
  TargetValue?: number;
}
export interface ScalingPolicy {
  FleetId?: string;
  FleetArn?: string;
  Name?: string;
  Status?: ScalingStatusType;
  ScalingAdjustment?: number;
  ScalingAdjustmentType?: ScalingAdjustmentType;
  ComparisonOperator?: ComparisonOperatorType;
  Threshold?: number;
  EvaluationPeriods?: number;
  MetricName?: MetricName;
  PolicyType?: PolicyType;
  TargetConfiguration?: TargetConfiguration;
  UpdateStatus?: LocationUpdateStatus;
  Location?: string;
}
export type ScalingPolicyList = ScalingPolicy[];
export interface DescribeScalingPoliciesOutput {
  ScalingPolicies?: (ScalingPolicy & {
    TargetConfiguration: TargetConfiguration & { TargetValue: number };
  })[];
  NextToken?: string;
}
export interface DescribeScriptInput {
  ScriptId?: string;
}
export interface DescribeScriptOutput {
  Script?: Script;
}
export interface DescribeVpcPeeringAuthorizationsInput {}
export type VpcPeeringAuthorizationList = VpcPeeringAuthorization[];
export interface DescribeVpcPeeringAuthorizationsOutput {
  VpcPeeringAuthorizations?: VpcPeeringAuthorization[];
}
export interface DescribeVpcPeeringConnectionsInput {
  FleetId?: string;
}
export interface VpcPeeringConnectionStatus {
  Code?: string;
  Message?: string;
}
export interface VpcPeeringConnection {
  FleetId?: string;
  FleetArn?: string;
  IpV4CidrBlock?: string;
  VpcPeeringConnectionId?: string;
  Status?: VpcPeeringConnectionStatus;
  PeerVpcId?: string;
  GameLiftVpcId?: string;
}
export type VpcPeeringConnectionList = VpcPeeringConnection[];
export interface DescribeVpcPeeringConnectionsOutput {
  VpcPeeringConnections?: VpcPeeringConnection[];
}
export interface GetComputeAccessInput {
  FleetId?: string;
  ComputeName?: string;
}
export type SessionTarget = string;
export interface ContainerIdentifier {
  ContainerName?: string;
  ContainerRuntimeId?: string;
}
export type ContainerIdentifierList = ContainerIdentifier[];
export interface GetComputeAccessOutput {
  FleetId?: string;
  FleetArn?: string;
  ComputeName?: string;
  ComputeArn?: string;
  Credentials?: AwsCredentials;
  Target?: string;
  ContainerIdentifiers?: ContainerIdentifier[];
}
export interface GetComputeAuthTokenInput {
  FleetId?: string;
  ComputeName?: string;
}
export type ComputeAuthToken = string;
export interface GetComputeAuthTokenOutput {
  FleetId?: string;
  FleetArn?: string;
  ComputeName?: string;
  ComputeArn?: string;
  AuthToken?: string;
  ExpirationTimestamp?: Date;
}
export interface GetGameSessionLogUrlInput {
  GameSessionId?: string;
}
export interface GetGameSessionLogUrlOutput {
  PreSignedUrl?: string;
}
export interface GetInstanceAccessInput {
  FleetId?: string;
  InstanceId?: string;
}
export interface InstanceCredentials {
  UserName?: string;
  Secret?: string;
}
export interface InstanceAccess {
  FleetId?: string;
  InstanceId?: string;
  IpAddress?: string | redacted.Redacted<string>;
  OperatingSystem?: OperatingSystem;
  Credentials?: InstanceCredentials;
}
export interface GetInstanceAccessOutput {
  InstanceAccess?: InstanceAccess;
}
export interface GetPlayerConnectionDetailsInput {
  GameSessionId?: string;
  PlayerIds?: (string | redacted.Redacted<string>)[];
}
export interface PlayerConnectionEndpoint {
  IpAddress?: string | redacted.Redacted<string>;
  Port?: number;
}
export type PlayerConnectionEndpointList = PlayerConnectionEndpoint[];
export type MaxString = string;
export interface PlayerConnectionDetail {
  PlayerId?: string | redacted.Redacted<string>;
  Endpoints?: PlayerConnectionEndpoint[];
  PlayerGatewayToken?: string;
  Expiration?: Date;
}
export type PlayerConnectionDetailList = PlayerConnectionDetail[];
export interface GetPlayerConnectionDetailsOutput {
  GameSessionId?: string;
  PlayerConnectionDetails?: PlayerConnectionDetail[];
}
export interface ListAliasesInput {
  RoutingStrategyType?: RoutingStrategyType;
  Name?: string;
  Limit?: number;
  NextToken?: string;
}
export type AliasList = Alias[];
export interface ListAliasesOutput {
  Aliases?: Alias[];
  NextToken?: string;
}
export interface ListBuildsInput {
  Status?: BuildStatus;
  Limit?: number;
  NextToken?: string;
}
export type BuildList = Build[];
export interface ListBuildsOutput {
  Builds?: Build[];
  NextToken?: string;
}
export type ListComputeInputStatus = "ACTIVE" | "IMPAIRED" | (string & {});
export interface ListComputeInput {
  FleetId?: string;
  Location?: string;
  ContainerGroupDefinitionName?: string;
  ComputeStatus?: ListComputeInputStatus;
  Limit?: number;
  NextToken?: string;
}
export type ComputeList = Compute[];
export interface ListComputeOutput {
  ComputeList?: Compute[];
  NextToken?: string;
}
export interface ListContainerFleetsInput {
  ContainerGroupDefinitionName?: string;
  Limit?: number;
  NextToken?: string;
}
export type ContainerFleetList = ContainerFleet[];
export interface ListContainerFleetsOutput {
  ContainerFleets?: (ContainerFleet & {
    InstanceConnectionPortRange: ConnectionPortRange & { FromPort: PortNumber; ToPort: PortNumber };
    InstanceInboundPermissions: (IpPermission & {
      FromPort: PortNumber;
      ToPort: PortNumber;
      IpRange: IpRange;
      Protocol: IpProtocol;
    })[];
  })[];
  NextToken?: string;
}
export type ListContainerGroupDefinitionsLimit = number;
export interface ListContainerGroupDefinitionsInput {
  ContainerGroupType?: ContainerGroupType;
  Limit?: number;
  NextToken?: string;
}
export type ContainerGroupDefinitionList = ContainerGroupDefinition[];
export interface ListContainerGroupDefinitionsOutput {
  ContainerGroupDefinitions?: (ContainerGroupDefinition & {
    Name: ContainerGroupDefinitionName;
    GameServerContainerDefinition: GameServerContainerDefinition & {
      DependsOn: (ContainerDependency & {
        ContainerName: NonZeroAnd128MaxAsciiString;
        Condition: ContainerDependencyCondition;
      })[];
      MountPoints: (ContainerMountPoint & { InstancePath: InstancePathString })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      PortConfiguration: ContainerPortConfiguration & {
        ContainerPortRanges: (ContainerPortRange & {
          FromPort: PortNumber;
          ToPort: PortNumber;
          Protocol: IpProtocol;
        })[];
      };
    };
    SupportContainerDefinitions: (SupportContainerDefinition & {
      DependsOn: (ContainerDependency & {
        ContainerName: NonZeroAnd128MaxAsciiString;
        Condition: ContainerDependencyCondition;
      })[];
      MountPoints: (ContainerMountPoint & { InstancePath: InstancePathString })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      HealthCheck: ContainerHealthCheck & { Command: ContainerCommandStringList };
      PortConfiguration: ContainerPortConfiguration & {
        ContainerPortRanges: (ContainerPortRange & {
          FromPort: PortNumber;
          ToPort: PortNumber;
          Protocol: IpProtocol;
        })[];
      };
    })[];
  })[];
  NextToken?: string;
}
export type ListContainerGroupDefinitionVersionsLimit = number;
export interface ListContainerGroupDefinitionVersionsInput {
  Name?: string;
  Limit?: number;
  NextToken?: string;
}
export interface ListContainerGroupDefinitionVersionsOutput {
  ContainerGroupDefinitions?: (ContainerGroupDefinition & {
    Name: ContainerGroupDefinitionName;
    GameServerContainerDefinition: GameServerContainerDefinition & {
      DependsOn: (ContainerDependency & {
        ContainerName: NonZeroAnd128MaxAsciiString;
        Condition: ContainerDependencyCondition;
      })[];
      MountPoints: (ContainerMountPoint & { InstancePath: InstancePathString })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      PortConfiguration: ContainerPortConfiguration & {
        ContainerPortRanges: (ContainerPortRange & {
          FromPort: PortNumber;
          ToPort: PortNumber;
          Protocol: IpProtocol;
        })[];
      };
    };
    SupportContainerDefinitions: (SupportContainerDefinition & {
      DependsOn: (ContainerDependency & {
        ContainerName: NonZeroAnd128MaxAsciiString;
        Condition: ContainerDependencyCondition;
      })[];
      MountPoints: (ContainerMountPoint & { InstancePath: InstancePathString })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      HealthCheck: ContainerHealthCheck & { Command: ContainerCommandStringList };
      PortConfiguration: ContainerPortConfiguration & {
        ContainerPortRanges: (ContainerPortRange & {
          FromPort: PortNumber;
          ToPort: PortNumber;
          Protocol: IpProtocol;
        })[];
      };
    })[];
  })[];
  NextToken?: string;
}
export interface ListFleetDeploymentsInput {
  FleetId?: string;
  Limit?: number;
  NextToken?: string;
}
export type FleetDeployments = FleetDeployment[];
export interface ListFleetDeploymentsOutput {
  FleetDeployments?: FleetDeployment[];
  NextToken?: string;
}
export interface ListFleetsInput {
  BuildId?: string;
  ScriptId?: string;
  Limit?: number;
  NextToken?: string;
}
export type FleetIdList = string[];
export interface ListFleetsOutput {
  FleetIds?: string[];
  NextToken?: string;
}
export interface ListGameServerGroupsInput {
  Limit?: number;
  NextToken?: string;
}
export type GameServerGroups = GameServerGroup[];
export interface ListGameServerGroupsOutput {
  GameServerGroups?: (GameServerGroup & {
    InstanceDefinitions: (InstanceDefinition & { InstanceType: GameServerGroupInstanceType })[];
  })[];
  NextToken?: string;
}
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export interface ListGameServersInput {
  GameServerGroupName?: string;
  SortOrder?: SortOrder;
  Limit?: number;
  NextToken?: string;
}
export type GameServers = GameServer[];
export interface ListGameServersOutput {
  GameServers?: GameServer[];
  NextToken?: string;
}
export type LocationFilter = "AWS" | "CUSTOM" | (string & {});
export type LocationFilterList = LocationFilter[];
export type ListLocationsLimit = number;
export interface ListLocationsInput {
  Filters?: LocationFilter[];
  Limit?: number;
  NextToken?: string;
}
export type LocationModelList = LocationModel[];
export interface ListLocationsOutput {
  Locations?: LocationModel[];
  NextToken?: string;
}
export interface ListScriptsInput {
  Limit?: number;
  NextToken?: string;
}
export type ScriptList = Script[];
export interface ListScriptsOutput {
  Scripts?: Script[];
  NextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN?: string;
}
export interface ListTagsForResourceResponse {
  Tags?: (Tag & { Key: TagKey; Value: TagValue })[];
}
export interface PutScalingPolicyInput {
  Name?: string;
  FleetId?: string;
  ScalingAdjustment?: number;
  ScalingAdjustmentType?: ScalingAdjustmentType;
  Threshold?: number;
  ComparisonOperator?: ComparisonOperatorType;
  EvaluationPeriods?: number;
  MetricName?: MetricName;
  PolicyType?: PolicyType;
  TargetConfiguration?: TargetConfiguration;
}
export interface PutScalingPolicyOutput {
  Name?: string;
}
export type DnsNameInput = string;
export interface RegisterComputeInput {
  FleetId?: string;
  ComputeName?: string;
  CertificatePath?: string;
  DnsName?: string;
  IpAddress?: string | redacted.Redacted<string>;
  Location?: string;
}
export interface RegisterComputeOutput {
  Compute?: Compute;
}
export interface RegisterGameServerInput {
  GameServerGroupName?: string;
  GameServerId?: string;
  InstanceId?: string;
  ConnectionInfo?: string;
  GameServerData?: string | redacted.Redacted<string>;
}
export interface RegisterGameServerOutput {
  GameServer?: GameServer;
}
export interface RequestUploadCredentialsInput {
  BuildId?: string;
}
export interface RequestUploadCredentialsOutput {
  UploadCredentials?: AwsCredentials;
  StorageLocation?: S3Location;
}
export interface ResolveAliasInput {
  AliasId?: string;
}
export interface ResolveAliasOutput {
  FleetId?: string;
  FleetArn?: string;
}
export interface ResumeGameServerGroupInput {
  GameServerGroupName?: string;
  ResumeActions?: GameServerGroupAction[];
}
export interface ResumeGameServerGroupOutput {
  GameServerGroup?: GameServerGroup & {
    InstanceDefinitions: (InstanceDefinition & { InstanceType: GameServerGroupInstanceType })[];
  };
}
export interface SearchGameSessionsInput {
  FleetId?: string;
  AliasId?: string;
  Location?: string;
  FilterExpression?: string;
  SortExpression?: string;
  Limit?: number;
  NextToken?: string;
}
export interface SearchGameSessionsOutput {
  GameSessions?: (GameSession & {
    GameProperties: (GameProperty & { Key: GamePropertyKey; Value: GamePropertyValue })[];
  })[];
  NextToken?: string;
}
export interface StartFleetActionsInput {
  FleetId?: string;
  Actions?: FleetAction[];
  Location?: string;
}
export interface StartFleetActionsOutput {
  FleetId?: string;
  FleetArn?: string;
}
export interface DesiredPlayerSession {
  PlayerId?: string | redacted.Redacted<string>;
  PlayerData?: string | redacted.Redacted<string>;
}
export type DesiredPlayerSessionList = DesiredPlayerSession[];
export interface StartGameSessionPlacementInput {
  PlacementId?: string;
  GameSessionQueueName?: string;
  GameProperties?: GameProperty[];
  MaximumPlayerSessionCount?: number;
  GameSessionName?: string;
  PlayerLatencies?: PlayerLatency[];
  DesiredPlayerSessions?: DesiredPlayerSession[];
  GameSessionData?: string | redacted.Redacted<string>;
  PriorityConfigurationOverride?: PriorityConfigurationOverride;
}
export interface StartGameSessionPlacementOutput {
  GameSessionPlacement?: GameSessionPlacement & {
    GameProperties: (GameProperty & { Key: GamePropertyKey; Value: GamePropertyValue })[];
    PriorityConfigurationOverride: PriorityConfigurationOverride & {
      LocationOrder: LocationOrderOverrideList;
    };
  };
}
export interface StartMatchBackfillInput {
  TicketId?: string;
  ConfigurationName?: string;
  GameSessionArn?: string;
  Players?: Player[];
}
export interface StartMatchBackfillOutput {
  MatchmakingTicket?: MatchmakingTicket;
}
export interface StartMatchmakingInput {
  TicketId?: string;
  ConfigurationName?: string;
  Players?: Player[];
}
export interface StartMatchmakingOutput {
  MatchmakingTicket?: MatchmakingTicket;
}
export interface StopFleetActionsInput {
  FleetId?: string;
  Actions?: FleetAction[];
  Location?: string;
}
export interface StopFleetActionsOutput {
  FleetId?: string;
  FleetArn?: string;
}
export interface StopGameSessionPlacementInput {
  PlacementId?: string;
}
export interface StopGameSessionPlacementOutput {
  GameSessionPlacement?: GameSessionPlacement & {
    GameProperties: (GameProperty & { Key: GamePropertyKey; Value: GamePropertyValue })[];
    PriorityConfigurationOverride: PriorityConfigurationOverride & {
      LocationOrder: LocationOrderOverrideList;
    };
  };
}
export interface StopMatchmakingInput {
  TicketId?: string;
}
export interface StopMatchmakingOutput {}
export interface SuspendGameServerGroupInput {
  GameServerGroupName?: string;
  SuspendActions?: GameServerGroupAction[];
}
export interface SuspendGameServerGroupOutput {
  GameServerGroup?: GameServerGroup & {
    InstanceDefinitions: (InstanceDefinition & { InstanceType: GameServerGroupInstanceType })[];
  };
}
export interface TagResourceRequest {
  ResourceARN?: string;
  Tags?: Tag[];
}
export interface TagResourceResponse {}
export type TerminationMode = "TRIGGER_ON_PROCESS_TERMINATE" | "FORCE_TERMINATE" | (string & {});
export interface TerminateGameSessionInput {
  GameSessionId?: string;
  TerminationMode?: TerminationMode;
}
export interface TerminateGameSessionOutput {
  GameSession?: GameSession & {
    GameProperties: (GameProperty & { Key: GamePropertyKey; Value: GamePropertyValue })[];
  };
}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceARN?: string;
  TagKeys?: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAliasInput {
  AliasId?: string;
  Name?: string;
  Description?: string;
  RoutingStrategy?: RoutingStrategy;
}
export interface UpdateAliasOutput {
  Alias?: Alias;
}
export interface UpdateBuildInput {
  BuildId?: string;
  Name?: string;
  Version?: string;
}
export interface UpdateBuildOutput {
  Build?: Build;
}
export type ContainerFleetRemoveAttribute =
  | "PER_INSTANCE_CONTAINER_GROUP_DEFINITION"
  | (string & {});
export type ContainerFleetRemoveAttributeList = ContainerFleetRemoveAttribute[];
export interface UpdateContainerFleetInput {
  FleetId?: string;
  GameServerContainerGroupDefinitionName?: string;
  PerInstanceContainerGroupDefinitionName?: string;
  GameServerContainerGroupsPerInstance?: number;
  InstanceConnectionPortRange?: ConnectionPortRange;
  InstanceInboundPermissionAuthorizations?: IpPermission[];
  InstanceInboundPermissionRevocations?: IpPermission[];
  DeploymentConfiguration?: DeploymentConfiguration;
  Description?: string;
  MetricGroups?: string[];
  NewGameSessionProtectionPolicy?: ProtectionPolicy;
  GameSessionCreationLimitPolicy?: GameSessionCreationLimitPolicy;
  LogConfiguration?: LogConfiguration;
  RemoveAttributes?: ContainerFleetRemoveAttribute[];
}
export interface UpdateContainerFleetOutput {
  ContainerFleet?: ContainerFleet & {
    InstanceConnectionPortRange: ConnectionPortRange & { FromPort: PortNumber; ToPort: PortNumber };
    InstanceInboundPermissions: (IpPermission & {
      FromPort: PortNumber;
      ToPort: PortNumber;
      IpRange: IpRange;
      Protocol: IpProtocol;
    })[];
  };
}
export interface UpdateContainerGroupDefinitionInput {
  Name?: string;
  GameServerContainerDefinition?: GameServerContainerDefinitionInput;
  SupportContainerDefinitions?: SupportContainerDefinitionInput[];
  TotalMemoryLimitMebibytes?: number;
  TotalVcpuLimit?: number;
  VersionDescription?: string;
  SourceVersionNumber?: number;
  OperatingSystem?: ContainerOperatingSystem;
}
export interface UpdateContainerGroupDefinitionOutput {
  ContainerGroupDefinition?: ContainerGroupDefinition & {
    Name: ContainerGroupDefinitionName;
    GameServerContainerDefinition: GameServerContainerDefinition & {
      DependsOn: (ContainerDependency & {
        ContainerName: NonZeroAnd128MaxAsciiString;
        Condition: ContainerDependencyCondition;
      })[];
      MountPoints: (ContainerMountPoint & { InstancePath: InstancePathString })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      PortConfiguration: ContainerPortConfiguration & {
        ContainerPortRanges: (ContainerPortRange & {
          FromPort: PortNumber;
          ToPort: PortNumber;
          Protocol: IpProtocol;
        })[];
      };
    };
    SupportContainerDefinitions: (SupportContainerDefinition & {
      DependsOn: (ContainerDependency & {
        ContainerName: NonZeroAnd128MaxAsciiString;
        Condition: ContainerDependencyCondition;
      })[];
      MountPoints: (ContainerMountPoint & { InstancePath: InstancePathString })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      HealthCheck: ContainerHealthCheck & { Command: ContainerCommandStringList };
      PortConfiguration: ContainerPortConfiguration & {
        ContainerPortRanges: (ContainerPortRange & {
          FromPort: PortNumber;
          ToPort: PortNumber;
          Protocol: IpProtocol;
        })[];
      };
    })[];
  };
}
export interface UpdateFleetAttributesInput {
  FleetId?: string;
  Name?: string;
  Description?: string;
  NewGameSessionProtectionPolicy?: ProtectionPolicy;
  ResourceCreationLimitPolicy?: ResourceCreationLimitPolicy;
  MetricGroups?: string[];
  AnywhereConfiguration?: AnywhereConfiguration;
}
export interface UpdateFleetAttributesOutput {
  FleetId?: string;
  FleetArn?: string;
}
export interface UpdateFleetCapacityInput {
  FleetId?: string;
  DesiredInstances?: number;
  MinSize?: number;
  MaxSize?: number;
  Location?: string;
  ManagedCapacityConfiguration?: ManagedCapacityConfiguration;
}
export interface UpdateFleetCapacityOutput {
  FleetId?: string;
  FleetArn?: string;
  Location?: string;
  ManagedCapacityConfiguration?: ManagedCapacityConfiguration;
}
export interface UpdateFleetPortSettingsInput {
  FleetId?: string;
  InboundPermissionAuthorizations?: IpPermission[];
  InboundPermissionRevocations?: IpPermission[];
}
export interface UpdateFleetPortSettingsOutput {
  FleetId?: string;
  FleetArn?: string;
}
export type GameServerHealthCheck = "HEALTHY" | (string & {});
export interface UpdateGameServerInput {
  GameServerGroupName?: string;
  GameServerId?: string;
  GameServerData?: string | redacted.Redacted<string>;
  UtilizationStatus?: GameServerUtilizationStatus;
  HealthCheck?: GameServerHealthCheck;
}
export interface UpdateGameServerOutput {
  GameServer?: GameServer;
}
export interface UpdateGameServerGroupInput {
  GameServerGroupName?: string;
  RoleArn?: string;
  InstanceDefinitions?: InstanceDefinition[];
  GameServerProtectionPolicy?: GameServerProtectionPolicy;
  BalancingStrategy?: BalancingStrategy;
}
export interface UpdateGameServerGroupOutput {
  GameServerGroup?: GameServerGroup & {
    InstanceDefinitions: (InstanceDefinition & { InstanceType: GameServerGroupInstanceType })[];
  };
}
export interface UpdateGameSessionInput {
  GameSessionId?: string;
  MaximumPlayerSessionCount?: number;
  Name?: string;
  PlayerSessionCreationPolicy?: PlayerSessionCreationPolicy;
  ProtectionPolicy?: ProtectionPolicy;
  GameProperties?: GameProperty[];
}
export interface UpdateGameSessionOutput {
  GameSession?: GameSession & {
    GameProperties: (GameProperty & { Key: GamePropertyKey; Value: GamePropertyValue })[];
  };
}
export interface UpdateGameSessionQueueInput {
  Name?: string;
  TimeoutInSeconds?: number;
  PlayerLatencyPolicies?: PlayerLatencyPolicy[];
  Destinations?: GameSessionQueueDestination[];
  FilterConfiguration?: FilterConfiguration;
  PriorityConfiguration?: PriorityConfiguration;
  CustomEventData?: string | redacted.Redacted<string>;
  NotificationTarget?: string;
}
export interface UpdateGameSessionQueueOutput {
  GameSessionQueue?: GameSessionQueue;
}
export interface UpdateMatchmakingConfigurationInput {
  Name?: string;
  Description?: string;
  GameSessionQueueArns?: string[];
  RequestTimeoutSeconds?: number;
  AcceptanceTimeoutSeconds?: number;
  AcceptanceRequired?: boolean;
  RuleSetName?: string;
  NotificationTarget?: string;
  AdditionalPlayerCount?: number;
  CustomEventData?: string | redacted.Redacted<string>;
  GameProperties?: GameProperty[];
  GameSessionData?: string | redacted.Redacted<string>;
  BackfillMode?: BackfillMode;
  FlexMatchMode?: FlexMatchMode;
}
export interface UpdateMatchmakingConfigurationOutput {
  Configuration?: MatchmakingConfiguration & {
    GameProperties: (GameProperty & { Key: GamePropertyKey; Value: GamePropertyValue })[];
  };
}
export interface UpdateRuntimeConfigurationInput {
  FleetId?: string;
  RuntimeConfiguration?: RuntimeConfiguration;
}
export interface UpdateRuntimeConfigurationOutput {
  RuntimeConfiguration?: RuntimeConfiguration & {
    ServerProcesses: (ServerProcess & {
      LaunchPath: LaunchPathStringModel;
      ConcurrentExecutions: PositiveInteger;
    })[];
  };
}
export interface UpdateScriptInput {
  ScriptId?: string;
  Name?: string;
  Version?: string;
  StorageLocation?: S3Location;
  ZipFile?: Uint8Array;
}
export interface UpdateScriptOutput {
  Script?: Script;
}
export interface ValidateMatchmakingRuleSetInput {
  RuleSetBody?: string;
}
export interface ValidateMatchmakingRuleSetOutput {
  Valid?: boolean;
}
export type AcceptMatchError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Registers a player's acceptance or rejection of a proposed FlexMatch match. A
 * matchmaking configuration may require player acceptance; if so, then matches built with
 * that configuration cannot be completed unless all players accept the proposed match
 * within a specified time limit.
 *
 * When FlexMatch builds a match, all the matchmaking tickets involved in the proposed
 * match are placed into status `REQUIRES_ACCEPTANCE`. This is a trigger for
 * your game to get acceptance from all players in each ticket. Calls to this action are only valid
 * for tickets that are in this status; calls for tickets not in this status result in an
 * error.
 *
 * To register acceptance, specify the ticket ID, one or more players, and an acceptance response.
 * When all players have accepted, Amazon GameLift Servers advances the matchmaking tickets to status
 * `PLACING`, and attempts to create a new game session for the match.
 *
 * If any player rejects the match, or if acceptances are not received before a specified
 * timeout, the proposed match is dropped. Each matchmaking ticket in the failed match is handled as follows:
 *
 * - If the ticket has one or more players who rejected the match or failed to
 * respond, the ticket status is set `CANCELLED` and processing is
 * terminated.
 *
 * - If all players in the ticket accepted the match, the ticket
 * status is returned to `SEARCHING` to find a new match.
 *
 * **Learn more**
 *
 * Add FlexMatch to a game client
 *
 * FlexMatch events (reference)
 */
export const acceptMatch: API.OperationMethod<
  AcceptMatchInput,
  AcceptMatchOutput,
  AcceptMatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<AcceptMatchInput>,
  output: __S(640, __c40, 0) as any as S.Schema<AcceptMatchOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptMatch",
}));

export type ClaimGameServerError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | OutOfCapacityException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Locates an available game server and
 * temporarily reserves it to host gameplay and players. This operation is called from a
 * game client or client service (such as a matchmaker) to request hosting resources for a
 * new game session. In response, Amazon GameLift Servers FleetIQ locates an available game server, places it in
 * `CLAIMED` status for 60 seconds, and returns connection information that
 * players can use to connect to the game server.
 *
 * To claim a game server, identify a game server group. You can also specify a game
 * server ID, although this approach bypasses Amazon GameLift Servers FleetIQ placement optimization. Optionally,
 * include game data to pass to the game server at the start of a game session, such as a
 * game map or player information. Add filter options to further restrict how a
 * game server is chosen, such as only allowing game servers on `ACTIVE` instances
 * to be claimed.
 *
 * When a game server is successfully claimed, connection information is returned. A
 * claimed game server's utilization status remains `AVAILABLE` while the claim
 * status is set to `CLAIMED` for up to 60 seconds. This time period gives the
 * game server time to update its status to `UTILIZED` after players join. If
 * the game server's status is not updated within 60 seconds, the game server reverts to
 * unclaimed status and is available to be claimed by another request. The claim time
 * period is a fixed value and is not configurable.
 *
 * If you try to claim a specific game server, this request will fail in the following
 * cases:
 *
 * - If the game server utilization status is `UTILIZED`.
 *
 * - If the game server claim status is `CLAIMED`.
 *
 * - If the game server is running on an instance in `DRAINING` status and
 * the provided filter option does not allow placing on `DRAINING` instances.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const claimGameServer: API.OperationMethod<
  ClaimGameServerInput,
  ClaimGameServerOutput,
  ClaimGameServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(657, __c41, 1) as any as S.Schema<ClaimGameServerInput>,
  output: __S(688, __c43, 0) as any as S.Schema<ClaimGameServerOutput>,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    OutOfCapacityException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ClaimGameServer",
}));

export type CreateAliasError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | TaggingFailedException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Creates an alias for a fleet. In most situations, you can use an alias ID in place of
 * a fleet ID. An alias provides a level of abstraction for a fleet that is useful when
 * redirecting player traffic from one fleet to another, such as when updating your game
 * build.
 *
 * Amazon GameLift Servers supports two types of routing strategies for aliases: simple and terminal. A
 * simple alias points to an active fleet. A terminal alias is used to display messaging or
 * link to a URL instead of routing players to an active fleet. For example, you might use
 * a terminal alias when a game version is no longer supported and you want to direct
 * players to an upgrade site.
 *
 * To create a fleet alias, specify an alias name, routing strategy, and optional
 * description. Each simple alias can point to only one fleet, but a fleet can have
 * multiple aliases. If successful, a new alias record is returned, including an alias ID
 * and an ARN. You can reassign an alias to another fleet by calling
 * `UpdateAlias`.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const createAlias: API.OperationMethod<
  CreateAliasInput,
  CreateAliasOutput,
  CreateAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<CreateAliasInput>,
  output: __S(752, __c47, 0) as any as S.Schema<CreateAliasOutput>,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    TaggingFailedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAlias",
}));

export type CreateBuildError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | TaggingFailedException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere
 *
 * Creates a new Amazon GameLift Servers build resource for your game server binary files. Combine game
 * server binaries into a zip file for use with Amazon GameLift Servers.
 *
 * When setting up a new game build for Amazon GameLift Servers, we recommend using the CLI command
 * upload-build
 * . This helper command combines two tasks: (1) it
 * uploads your build files from a file directory to an Amazon GameLift Servers Amazon S3 location, and (2)
 * it creates a new build resource.
 *
 * You can use the `CreateBuild` operation in the following scenarios:
 *
 * - Create a new game build with build files that are in an Amazon S3 location under an
 * Amazon Web Services account that you control. To use this option, you give Amazon GameLift Servers access to
 * the Amazon S3 bucket. With permissions in place, specify a build name, operating
 * system, and the Amazon S3 storage location of your game build.
 *
 * - Upload your build files to a Amazon GameLift Servers Amazon S3 location. To use this option,
 * specify a build name and operating system. This operation creates a new build
 * resource and also returns an Amazon S3 location with temporary access credentials.
 * Use the credentials to manually upload your build files to the specified Amazon S3
 * location. For more information, see Uploading Objects in
 * the *Amazon S3 Developer Guide*. After you upload build files to
 * the Amazon GameLift Servers Amazon S3 location, you can't update them.
 *
 * If successful, this operation creates a new build resource with a unique build ID and
 * places it in `INITIALIZED` status. A build must be in `READY`
 * status before you can create fleets with it.
 *
 * **Learn more**
 *
 * Uploading Your
 * Game
 *
 * Create a Build with Files in Amazon S3
 *
 * All APIs by task
 */
export const createBuild: API.OperationMethod<
  CreateBuildInput,
  CreateBuildOutput,
  CreateBuildError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<CreateBuildInput>,
  output: __S(785, __c49, 1) as any as S.Schema<CreateBuildOutput>,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    TaggingFailedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBuild",
}));

export type CreateContainerFleetError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | TaggingFailedException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Creates a managed fleet of Amazon Elastic Compute Cloud (Amazon EC2) instances to host your containerized game
 * servers. Use this operation to define how to deploy a container architecture onto each
 * fleet instance and configure fleet settings. You can create a container fleet in any
 * Amazon Web Services Regions that Amazon GameLift Servers supports for multi-location fleets. A container fleet can be
 * deployed to a single location or multiple locations. Container fleets are deployed with
 * Amazon Linux 2023 as the instance operating system.
 *
 * Define the fleet's container architecture using container group definitions. Each
 * fleet can have one of the following container group types:
 *
 * - The game server container group runs your game server build and dependent software. Amazon GameLift Servers
 * deploys one or more replicas of this container group to each fleet instance. The
 * number of replicas depends on the computing capabilities of the fleet instance
 * in use.
 *
 * - An optional per-instance container group might be used to run other software that only needs
 * to run once per instance, such as background services, logging, or test
 * processes. One per-instance container group is deployed to each fleet instance.
 *
 * Each container group can include the definition for one or more containers. A
 * container definition specifies a container image that is stored in an Amazon Elastic Container Registry (Amazon ECR)
 * public or private repository.
 *
 * **Request options**
 *
 * Use this operation to make the following types of requests. Most fleet settings have
 * default values, so you can create a working fleet with a minimal configuration and
 * default values, which you can customize later.
 *
 * - Create a fleet with no container groups. You can configure a container fleet and then add
 * container group definitions later. In this scenario, no fleet instances are
 * deployed, and the fleet can't host game sessions until you add a game server
 * container group definition. Provide the following required parameter
 * values:
 *
 * - `FleetRoleArn`
 *
 * - Create a fleet with a game server container group. Provide the following required parameter
 * values:
 *
 * - `FleetRoleArn`
 *
 * - `GameServerContainerGroupDefinitionName`
 *
 * - Create a fleet with a game server container group and a per-instance container group. Provide
 * the following required parameter values:
 *
 * - `FleetRoleArn`
 *
 * - `GameServerContainerGroupDefinitionName`
 *
 * - `PerInstanceContainerGroupDefinitionName`
 *
 * **Results**
 *
 * If successful, this operation creates a new container fleet resource, places it in
 * `PENDING` status, and initiates the fleet creation workflow. For fleets with container groups, this workflow
 * starts a fleet deployment and transitions the status to `ACTIVE`. Fleets
 * without a container group are placed in `CREATED` status.
 *
 * You can update most of the properties of a fleet, including container group
 * definitions, and deploy the update across all fleet instances. Use
 * UpdateContainerFleet
 * to deploy a new game server version update across the container fleet.
 *
 * A managed fleet's runtime environment depends on the Amazon Machine Image (AMI)
 * version it uses. When a new fleet is created, Amazon GameLift Servers assigns the
 * latest available AMI version to the fleet, and all compute instances in that fleet
 * are deployed with that version. To update the AMI version, you must create a new
 * fleet. As a best practice, we recommend replacing your managed fleets every 30
 * days to maintain a secure and up-to-date runtime environment for your hosted game
 * servers. For guidance, see
 * Security best practices for Amazon GameLift Servers.
 */
export const createContainerFleet: API.OperationMethod<
  CreateContainerFleetInput,
  CreateContainerFleetOutput,
  CreateContainerFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<CreateContainerFleetInput>,
  output: __S(960, __c60, 0) as any as S.Schema<CreateContainerFleetOutput>,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    TaggingFailedException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContainerFleet",
}));

export type CreateContainerGroupDefinitionError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | TaggingFailedException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Creates a `ContainerGroupDefinition` that describes a set of containers for
 * hosting your game server with Amazon GameLift Servers managed containers hosting. An Amazon GameLift Servers container group
 * is similar to a container task or pod. Use container group definitions when you create a
 * container fleet with CreateContainerFleet.
 *
 * A container group definition determines how Amazon GameLift Servers deploys your containers to each
 * instance in a container fleet. You can maintain multiple versions of a container group
 * definition.
 *
 * There are two types of container groups:
 *
 * - A **game server container group** has the containers that run
 * your game server application and supporting software. A game server container group can
 * have these container types:
 *
 * - Game server container. This container runs your game server. You can define one
 * game server container in a game server container group.
 *
 * - Support container. This container runs software in parallel with your game server.
 * You can define up to 8 support containers in a game server group.
 *
 * When building a game server container group definition, you can choose to bundle your
 * game server executable and all dependent software into a single game server container.
 * Alternatively, you can separate the software into one game server container and one or
 * more support containers.
 *
 * On a container fleet instance, a game server container group can be deployed multiple
 * times (depending on the compute resources of the instance). This means that all containers
 * in the container group are replicated together.
 *
 * - A **per-instance container group** has containers for processes
 * that aren't replicated on a container fleet instance. This might include background
 * services, logging, test processes, or processes that need to persist independently of the
 * game server container group. When building a per-instance container group, you can define
 * up to 10 support containers.
 *
 * This operation requires Identity and Access Management (IAM) permissions to access container images in
 * Amazon ECR repositories. See IAM permissions
 * for Amazon GameLift Servers for help setting the appropriate permissions.
 *
 * **Request options**
 *
 * Use this operation to make the following types of requests. You can specify values for the
 * minimum required parameters and customize optional values later.
 *
 * - Create a game server container group definition. Provide the following required parameter values:
 *
 * - `Name`
 *
 * - `ContainerGroupType` (`GAME_SERVER`)
 *
 * - `OperatingSystem`
 *
 * - `TotalMemoryLimitMebibytes`
 *
 * - `TotalVcpuLimit`
 *
 * - At least one `GameServerContainerDefinition`
 *
 * - `ContainerName`
 *
 * - `ImageUrl`
 *
 * - `PortConfiguration`
 *
 * - `ServerSdkVersion`
 *
 * - Create a per-instance container group definition. Provide the following required parameter
 * values:
 *
 * - `Name`
 *
 * - `ContainerGroupType` (`PER_INSTANCE`)
 *
 * - `OperatingSystem`
 *
 * - `TotalMemoryLimitMebibytes`
 *
 * - `TotalVcpuLimit`
 *
 * - At least one `SupportContainerDefinition`
 *
 * - `ContainerName`
 *
 * - `ImageUrl`
 *
 * **Results**
 *
 * If successful, this request creates a `ContainerGroupDefinition` resource and
 * assigns a unique ARN value. You can update most properties of a container group definition by
 * calling UpdateContainerGroupDefinition, and optionally save the update as a new version.
 */
export const createContainerGroupDefinition: API.OperationMethod<
  CreateContainerGroupDefinitionInput,
  CreateContainerGroupDefinitionOutput,
  CreateContainerGroupDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c62, 0) as any as S.Schema<CreateContainerGroupDefinitionInput>,
  output: __S(1024, __c64, 0) as any as S.Schema<CreateContainerGroupDefinitionOutput>,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    TaggingFailedException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContainerGroupDefinition",
}));

export type CreateFleetError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | NotReadyException
  | TaggingFailedException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Creates a fleet of compute resources to host your game servers. Use this operation to
 * set up a fleet for the following compute types:
 *
 * **Managed EC2 fleet**
 *
 * An EC2 fleet is a set of Amazon Elastic Compute Cloud (Amazon EC2) instances. Your game server build is
 * deployed to each fleet instance. Amazon GameLift Servers manages the fleet's instances and controls the
 * lifecycle of game server processes, which host game sessions for players. EC2 fleets can
 * have instances in multiple locations. Each instance in the fleet is designated a
 * `Compute`.
 *
 * To create an EC2 fleet, provide these required parameters:
 *
 * - Either `BuildId` or `ScriptId`
 *
 * - `ComputeType` set to `EC2` (the default value)
 *
 * - `EC2InboundPermissions`
 *
 * - `EC2InstanceType`
 *
 * - `FleetType`
 *
 * - `Name`
 *
 * - `RuntimeConfiguration` with at least one `ServerProcesses`
 * configuration
 *
 * If successful, this operation creates a new fleet resource and places it in
 * `NEW` status while Amazon GameLift Servers initiates the fleet creation workflow. To debug your fleet, fetch logs, view performance
 * metrics or other actions on the fleet, create a development fleet with port 22/3389
 * open. As a best practice, we recommend opening ports for remote access only when you
 * need them and closing them when you're finished.
 *
 * When the fleet status is ACTIVE, you can adjust capacity settings and turn autoscaling
 * on/off for each location.
 *
 * A managed fleet's runtime environment depends on the Amazon Machine Image (AMI)
 * version it uses. When a new fleet is created, Amazon GameLift Servers assigns the
 * latest available AMI version to the fleet, and all compute instances in that fleet
 * are deployed with that version. To update the AMI version, you must create a new
 * fleet. As a best practice, we recommend replacing your managed fleets every 30
 * days to maintain a secure and up-to-date runtime environment for your hosted game
 * servers. For guidance, see
 * Security best practices for Amazon GameLift Servers.
 *
 * **Anywhere fleet**
 *
 * An Anywhere fleet represents compute resources that are not owned or managed by
 * Amazon GameLift Servers. You might create an Anywhere fleet with your local machine for testing, or use
 * one to host game servers with on-premises hardware or other game hosting solutions.
 *
 * To create an Anywhere fleet, provide these required parameters:
 *
 * - `ComputeType` set to `ANYWHERE`
 *
 * - `Locations` specifying a custom location
 *
 * - `Name`
 *
 * If successful, this operation creates a new fleet resource and places it in
 * `ACTIVE` status. You can register computes with a fleet in
 * `ACTIVE` status.
 *
 * **Learn more**
 *
 * Setting up
 * fleets
 *
 * Debug fleet creation issues
 *
 * Multi-location fleets
 */
export const createFleet: API.OperationMethod<
  CreateFleetInput,
  CreateFleetOutput,
  CreateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c66, 0) as any as S.Schema<CreateFleetInput>,
  output: __S(1057, __c66, 1) as any as S.Schema<CreateFleetOutput>,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    NotReadyException,
    TaggingFailedException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFleet",
}));

export type CreateFleetLocationsError =
  | ConflictException
  | InternalServiceException
  | InvalidFleetStatusException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | NotReadyException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Adds remote locations to an EC2 and begins populating the new locations with
 * instances. The new instances conform to the fleet's instance type, auto-scaling, and
 * other configuration settings.
 *
 * You can't add remote locations to a fleet that resides in an Amazon Web Services Region that
 * doesn't support multiple locations. Fleets created prior to March 2021 can't support
 * multiple locations.
 *
 * To add fleet locations, specify the fleet to be updated and provide a list of one or
 * more locations.
 *
 * If successful, this operation returns the list of added locations with their status
 * set to `NEW`. Amazon GameLift Servers initiates the process of starting an instance in each
 * added location. You can track the status of each new location by monitoring location
 * creation events using DescribeFleetEvents.
 *
 * **Learn more**
 *
 * Setting up
 * fleets
 *
 * Update fleet locations
 *
 * Amazon GameLift Servers service locations for managed hosting.
 */
export const createFleetLocations: API.OperationMethod<
  CreateFleetLocationsInput,
  CreateFleetLocationsOutput,
  CreateFleetLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c70, 0) as any as S.Schema<CreateFleetLocationsInput>,
  output: __S(1136, __c71, 0) as any as S.Schema<CreateFleetLocationsOutput>,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidFleetStatusException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    NotReadyException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFleetLocations",
}));

export type CreateGameServerGroupError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Creates a Amazon GameLift Servers FleetIQ game server
 * group for managing game hosting on a collection of Amazon Elastic Compute Cloud instances for game hosting.
 * This operation creates the game server group, creates an Auto Scaling group in your
 * Amazon Web Services account, and establishes a link between the two groups. You can view the status of
 * your game server groups in the Amazon GameLift Servers console. Game server group metrics and events are
 * emitted to Amazon CloudWatch.
 *
 * Before creating a new game server group, you must have the following:
 *
 * - An Amazon Elastic Compute Cloud launch template that specifies how to launch Amazon Elastic Compute Cloud instances
 * with your game server build. For more information, see Launching an Instance from a Launch Template in the
 * *Amazon Elastic Compute Cloud User Guide*.
 *
 * - An IAM role that extends limited access to your Amazon Web Services account to allow Amazon GameLift Servers FleetIQ
 * to create and interact with the Auto Scaling group. For more information, see
 * Create IAM
 * roles for cross-service interaction in the Amazon GameLift Servers FleetIQ Developer
 * Guide.
 *
 * To create a new game server group, specify a unique group name, IAM role and Amazon Elastic Compute Cloud
 * launch template, and provide a list of instance types that can be used in the group. You
 * must also set initial maximum and minimum limits on the group's instance count. You can
 * optionally set an Auto Scaling policy with target tracking based on a Amazon GameLift Servers FleetIQ
 * metric.
 *
 * Once the game server group and corresponding Auto Scaling group are created, you have
 * full access to change the Auto Scaling group's configuration as needed. Several
 * properties that are set when creating a game server group, including maximum/minimum
 * size and auto-scaling policy settings, must be updated directly in the Auto Scaling
 * group. Keep in mind that some Auto Scaling group properties are periodically updated by
 * Amazon GameLift Servers FleetIQ as part of its balancing activities to optimize for availability and cost.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const createGameServerGroup: API.OperationMethod<
  CreateGameServerGroupInput,
  CreateGameServerGroupOutput,
  CreateGameServerGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1154, __c72, 2) as any as S.Schema<CreateGameServerGroupInput>,
  output: __S(1168, __c73, 0) as any as S.Schema<CreateGameServerGroupOutput>,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGameServerGroup",
}));

export type CreateGameSessionError =
  | ConflictException
  | FleetCapacityExceededException
  | IdempotentParameterMismatchException
  | InternalServiceException
  | InvalidFleetStatusException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | TerminalRoutingStrategyException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Creates a multiplayer game session for players in a specific fleet location. This
 * operation prompts an available server process to start a game session and retrieves
 * connection information for the new game session. As an alternative, consider using the
 * Amazon GameLift Servers game session placement feature with StartGameSessionPlacement, which uses the FleetIQ algorithm and queues to
 * optimize the placement process.
 *
 * When creating a game session, you specify exactly where you want to place it and
 * provide a set of game session configuration settings. The target fleet must be in
 * `ACTIVE` status.
 *
 * You can use this operation in the following ways:
 *
 * - To create a game session on an instance in a fleet's home Region, provide a
 * fleet or alias ID along with your game session configuration.
 *
 * - To create a game session on an instance in a fleet's remote location, provide
 * a fleet or alias ID and a location name, along with your game session
 * configuration.
 *
 * - To create a game session on an instance in an Anywhere fleet, specify the
 * fleet's custom location.
 *
 * If successful, Amazon GameLift Servers initiates a workflow to start a new game session and returns a
 * `GameSession` object containing the game session configuration and
 * status. When the game session status is `ACTIVE`, it is updated with
 * connection information and you can create player sessions for the game session. By
 * default, newly created game sessions are open to new players. You can restrict new
 * player access by using UpdateGameSession to change the game session's player session creation
 * policy.
 *
 * Amazon GameLift Servers retains logs for active for 14 days. To access the logs, call GetGameSessionLogUrl to download the log files.
 *
 * *Available in Amazon GameLift Servers Local.*
 *
 * **Learn more**
 *
 * Start a game session
 *
 * All APIs by task
 */
export const createGameSession: API.OperationMethod<
  CreateGameSessionInput,
  CreateGameSessionOutput,
  CreateGameSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c76, 0) as any as S.Schema<CreateGameSessionInput>,
  output: __S(1232, __c77, 0) as any as S.Schema<CreateGameSessionOutput>,
  errors: [
    ConflictException,
    FleetCapacityExceededException,
    IdempotentParameterMismatchException,
    InternalServiceException,
    InvalidFleetStatusException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    TerminalRoutingStrategyException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGameSession",
}));

export type CreateGameSessionQueueError =
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | TaggingFailedException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Creates a placement queue that processes requests for new game sessions. A queue uses
 * FleetIQ algorithms to locate the best available placement locations for a new game
 * session, and then prompts the game server process to start a new game session.
 *
 * A game session queue is configured with a set of destinations (Amazon GameLift Servers fleets or
 * aliases) that determine where the queue can place new game sessions. These destinations
 * can span multiple Amazon Web Services Regions, can use different instance types, and can include both
 * Spot and On-Demand fleets. If the queue includes multi-location fleets, the queue can
 * place game sessions in any of a fleet's remote locations.
 *
 * You can configure a queue to determine how it selects the best available placement for
 * a new game session. Queues can prioritize placement decisions based on a combination of
 * location, hosting cost, and player latency. You can set up the queue to use the default
 * prioritization or provide alternate instructions using
 * `PriorityConfiguration`.
 *
 * **Request options**
 *
 * Use this operation to make these common types of requests.
 *
 * - Create a queue with the minimum required parameters.
 *
 * - `Name`
 *
 * - `Destinations` (This parameter isn't required, but a queue
 * can't make placements without at least one destination.)
 *
 * - Create a queue with placement notification. Queues that have high placement
 * activity must use a notification system, such as with Amazon Simple Notification Service (Amazon SNS) or Amazon CloudWatch.
 *
 * - Required parameters `Name` and
 * `Destinations`
 *
 * - `NotificationTarget`
 *
 * - Create a queue with custom prioritization settings. These custom settings
 * replace the default prioritization configuration for a queue.
 *
 * - Required parameters `Name` and
 * `Destinations`
 *
 * - `PriorityConfiguration`
 *
 * - Create a queue with special rules for processing player latency data.
 *
 * - Required parameters `Name` and
 * `Destinations`
 *
 * - `PlayerLatencyPolicies`
 *
 * **Results**
 *
 * If successful, this operation returns a new `GameSessionQueue` object with
 * an assigned queue ARN. Use the queue's name or ARN when submitting new game session
 * requests with StartGameSessionPlacement or StartMatchmaking.
 *
 * **Learn more**
 *
 * Design a game session queue
 *
 * Create a game session queue
 *
 * **Related actions**
 *
 * CreateGameSessionQueue
 * |
 * DescribeGameSessionQueues
 * |
 * UpdateGameSessionQueue
 * |
 * DeleteGameSessionQueue
 * |
 * All APIs by task
 */
export const createGameSessionQueue: API.OperationMethod<
  CreateGameSessionQueueInput,
  CreateGameSessionQueueOutput,
  CreateGameSessionQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c80, 0) as any as S.Schema<CreateGameSessionQueueInput>,
  output: __S(1296, __c81, 0) as any as S.Schema<CreateGameSessionQueueOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    TaggingFailedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGameSessionQueue",
}));

export type CreateLocationError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | TaggingFailedException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Anywhere
 *
 * Creates a custom location for use in an Anywhere fleet.
 */
export const createLocation: API.OperationMethod<
  CreateLocationInput,
  CreateLocationOutput,
  CreateLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1328, __c83, 0) as any as S.Schema<CreateLocationInput>,
  output: __S(1329, __c83, 1) as any as S.Schema<CreateLocationOutput>,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    TaggingFailedException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocation",
}));

export type CreateMatchmakingConfigurationError =
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | TaggingFailedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Defines a new matchmaking configuration for use with FlexMatch. Whether your are using
 * FlexMatch with Amazon GameLift Servers hosting or as a standalone matchmaking service, the matchmaking
 * configuration sets out rules for matching players and forming teams. If you're also
 * using Amazon GameLift Servers hosting, it defines how to start game sessions for each match. Your
 * matchmaking system can use multiple configurations to handle different game scenarios.
 * All matchmaking requests identify the matchmaking configuration to use and provide
 * player attributes consistent with that configuration.
 *
 * To create a matchmaking configuration, you must provide the following: configuration
 * name and FlexMatch mode (with or without Amazon GameLift Servers hosting); a rule set that specifies how
 * to evaluate players and find acceptable matches; whether player acceptance is required;
 * and the maximum time allowed for a matchmaking attempt. When using FlexMatch with Amazon GameLift Servers
 * hosting, you also need to identify the game session queue to use when starting a game
 * session for the match.
 *
 * In addition, you must set up an Amazon Simple Notification Service topic to receive matchmaking notifications.
 * Provide the topic ARN in the matchmaking configuration.
 *
 * **Learn more**
 *
 * Design a FlexMatch
 * matchmaker
 *
 * Set up FlexMatch event
 * notification
 */
export const createMatchmakingConfiguration: API.OperationMethod<
  CreateMatchmakingConfigurationInput,
  CreateMatchmakingConfigurationOutput,
  CreateMatchmakingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1360, __c85, 0) as any as S.Schema<CreateMatchmakingConfigurationInput>,
  output: __S(1376, __c86, 0) as any as S.Schema<CreateMatchmakingConfigurationOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    TaggingFailedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMatchmakingConfiguration",
}));

export type CreateMatchmakingRuleSetError =
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | TaggingFailedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Creates a new rule set for FlexMatch matchmaking. A rule set describes the type of match
 * to create, such as the number and size of teams. It also sets the parameters for
 * acceptable player matches, such as minimum skill level or character type.
 *
 * To create a matchmaking rule set, provide unique rule set name and the rule set body
 * in JSON format. Rule sets must be defined in the same Region as the matchmaking
 * configuration they are used with.
 *
 * Since matchmaking rule sets cannot be edited, it is a good idea to check the rule set
 * syntax using ValidateMatchmakingRuleSet before creating a new rule set.
 *
 * **Learn more**
 *
 * - Build a rule
 * set
 *
 * - Design a
 * matchmaker
 *
 * - Matchmaking with
 * FlexMatch
 */
export const createMatchmakingRuleSet: API.OperationMethod<
  CreateMatchmakingRuleSetInput,
  CreateMatchmakingRuleSetOutput,
  CreateMatchmakingRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c88, 0) as any as S.Schema<CreateMatchmakingRuleSetInput>,
  output: __S(1409, __c88, 1) as any as S.Schema<CreateMatchmakingRuleSetOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    TaggingFailedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMatchmakingRuleSet",
}));

export type CreatePlayerSessionError =
  | GameSessionFullException
  | InternalServiceException
  | InvalidGameSessionStatusException
  | InvalidRequestException
  | NotFoundException
  | TerminalRoutingStrategyException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Reserves an open player slot in a game session for a player. New player sessions can
 * be created in any game session with an open slot that is in `ACTIVE` status
 * and has a player creation policy of `ACCEPT_ALL`. You can add a group of
 * players to a game session with CreatePlayerSessions .
 *
 * To create a player session, specify a game session ID, player ID, and optionally a set
 * of player data.
 *
 * If successful, a slot is reserved in the game session for the player and a new
 * `PlayerSessions` object is returned with a player session ID. The player
 * references the player session ID when sending a connection request to the game session,
 * and the game server can use it to validate the player reservation with the Amazon GameLift Servers
 * service. Player sessions cannot be updated.
 *
 * The maximum number of players per game session is 200. It is not adjustable.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const createPlayerSession: API.OperationMethod<
  CreatePlayerSessionInput,
  CreatePlayerSessionOutput,
  CreatePlayerSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c90, 0) as any as S.Schema<CreatePlayerSessionInput>,
  output: __S(1441, __c90, 1) as any as S.Schema<CreatePlayerSessionOutput>,
  errors: [
    GameSessionFullException,
    InternalServiceException,
    InvalidGameSessionStatusException,
    InvalidRequestException,
    NotFoundException,
    TerminalRoutingStrategyException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePlayerSession",
}));

export type CreatePlayerSessionsError =
  | GameSessionFullException
  | InternalServiceException
  | InvalidGameSessionStatusException
  | InvalidRequestException
  | NotFoundException
  | TerminalRoutingStrategyException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Reserves open slots in a game session for a group of players. New player sessions can
 * be created in any game session with an open slot that is in `ACTIVE` status
 * and has a player creation policy of `ACCEPT_ALL`. To add a single player to a
 * game session, use CreatePlayerSession
 *
 * To create player sessions, specify a game session ID and a list of player IDs.
 * Optionally, provide a set of player data for each player ID.
 *
 * If successful, a slot is reserved in the game session for each player, and new
 * `PlayerSession` objects are returned with player session IDs. Each player
 * references their player session ID when sending a connection request to the game
 * session, and the game server can use it to validate the player reservation with the
 * Amazon GameLift Servers service. Player sessions cannot be updated.
 *
 * The maximum number of players per game session is 200. It is not adjustable.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const createPlayerSessions: API.OperationMethod<
  CreatePlayerSessionsInput,
  CreatePlayerSessionsOutput,
  CreatePlayerSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1473, __c92, 1) as any as S.Schema<CreatePlayerSessionsInput>,
  output: __S(1474, __c92, 2) as any as S.Schema<CreatePlayerSessionsOutput>,
  errors: [
    GameSessionFullException,
    InternalServiceException,
    InvalidGameSessionStatusException,
    InvalidRequestException,
    NotFoundException,
    TerminalRoutingStrategyException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePlayerSessions",
}));

export type CreateScriptError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | TaggingFailedException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere
 *
 * Creates a new script record for your Amazon GameLift Servers Realtime script. Realtime scripts are JavaScript that
 * provide configuration settings and optional custom game logic for your game. The script
 * is deployed when you create a Amazon GameLift Servers Realtime fleet to host your game sessions. Script logic is
 * executed during an active game session.
 *
 * To create a new script record, specify a script name and provide the script file(s).
 * The script files and all dependencies must be zipped into a single file. You can pull
 * the zip file from either of these locations:
 *
 * - A locally available directory. Use the *ZipFile* parameter
 * for this option.
 *
 * - An Amazon Simple Storage Service (Amazon S3) bucket under your Amazon Web Services account. Use the
 * *StorageLocation* parameter for this option. You'll need
 * to have an Identity Access Management (IAM) role that allows the Amazon GameLift Servers service
 * to access your S3 bucket.
 *
 * If the call is successful, a new script record is created with a unique script ID. If
 * the script file is provided as a local file, the file is uploaded to an Amazon GameLift Servers-owned S3
 * bucket and the script record's storage location reflects this location. If the script
 * file is provided as an S3 bucket, Amazon GameLift Servers accesses the file at this storage location as
 * needed for deployment.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers Amazon GameLift Servers Realtime
 *
 * Set Up a Role for Amazon GameLift Servers Access
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const createScript: API.OperationMethod<
  CreateScriptInput,
  CreateScriptOutput,
  CreateScriptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1504, __c94, 0) as any as S.Schema<CreateScriptInput>,
  output: __S(1536, __c96, 0) as any as S.Schema<CreateScriptOutput>,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    TaggingFailedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScript",
}));

export type CreateVpcPeeringAuthorizationError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Requests authorization to create or delete a peer connection between the VPC for your
 * Amazon GameLift Servers fleet and a virtual private cloud (VPC) in your Amazon Web Services account. VPC peering enables the game servers on
 * your fleet to communicate directly with other Amazon Web Services resources. After you've received
 * authorization, use CreateVpcPeeringConnection to establish the peering connection. For more
 * information, see VPC Peering with Amazon GameLift Servers
 * Fleets.
 *
 * You can peer with VPCs that are owned by any Amazon Web Services account you have access to,
 * including the account that you use to manage your Amazon GameLift Servers fleets. You cannot peer with
 * VPCs that are in different Regions.
 *
 * To request authorization to create a connection, call this operation from the Amazon Web Services
 * account with the VPC that you want to peer to your Amazon GameLift Servers fleet. For example, to enable
 * your game servers to retrieve data from a DynamoDB table, use the account that manages
 * that DynamoDB resource. Identify the following values: (1) The ID of the VPC that you
 * want to peer with, and (2) the ID of the Amazon Web Services account that you use to manage Amazon GameLift Servers. If
 * successful, VPC peering is authorized for the specified VPC.
 *
 * To request authorization to delete a connection, call this operation from the Amazon Web Services
 * account with the VPC that is peered with your Amazon GameLift Servers fleet. Identify the following
 * values: (1) VPC ID that you want to delete the peering connection for, and (2) ID of the
 * Amazon Web Services account that you use to manage Amazon GameLift Servers.
 *
 * The authorization remains valid for 24 hours unless it is canceled. You must create or
 * delete the peering connection while the authorization is valid.
 *
 * Amazon GameLift Servers uses the caller's credentials to update peer-VPC resources. The IAM user
 * that calls this operation must have the following Amazon EC2 permissions enabled:
 *
 * - `ec2:AcceptVpcPeeringConnection`
 *
 * - `ec2:AuthorizeSecurityGroupEgress`
 *
 * - `ec2:AuthorizeSecurityGroupIngress`
 *
 * - `ec2:CreateRoute`
 *
 * - `ec2:DescribeRouteTables`
 *
 * - `ec2:DescribeSecurityGroups`
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const createVpcPeeringAuthorization: API.OperationMethod<
  CreateVpcPeeringAuthorizationInput,
  CreateVpcPeeringAuthorizationOutput,
  CreateVpcPeeringAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1552, __c97, 0) as any as S.Schema<CreateVpcPeeringAuthorizationInput>,
  output: __S(1553, __c97, 1) as any as S.Schema<CreateVpcPeeringAuthorizationOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcPeeringAuthorization",
}));

export type CreateVpcPeeringConnectionError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Establishes a VPC peering connection between a virtual private cloud (VPC) in an Amazon Web Services account with the VPC
 * for your Amazon GameLift Servers fleet. VPC peering enables the game servers on your fleet to communicate
 * directly with other Amazon Web Services resources. You can peer with VPCs in any Amazon Web Services account that
 * you have access to, including the account that you use to manage your Amazon GameLift Servers fleets. You
 * cannot peer with VPCs that are in different Regions. For more information, see VPC
 * Peering with Amazon GameLift Servers Fleets.
 *
 * Before calling this operation to establish the peering connection, you first need to
 * use CreateVpcPeeringAuthorization and identify the VPC you want to peer with.
 * Once the authorization for the specified VPC is issued, you have 24 hours to establish
 * the connection. These two operations handle all tasks necessary to peer the two VPCs,
 * including acceptance, updating routing tables, etc.
 *
 * To establish the connection, call this operation from the Amazon Web Services account that is used
 * to manage the Amazon GameLift Servers fleets. Identify the following values: (1) The ID of the fleet you
 * want to be enable a VPC peering connection for; (2) The Amazon Web Services account with the VPC that
 * you want to peer with; and (3) The ID of the VPC you want to peer with. This operation
 * is asynchronous. If successful, a connection request is created. You can use continuous
 * polling to track the request's status using DescribeVpcPeeringConnections , or by monitoring fleet events for success
 * or failure using DescribeFleetEvents .
 *
 * Amazon GameLift Servers uses the caller's credentials to update peer-VPC resources. The IAM user
 * that calls this operation must have the following Amazon EC2 permissions enabled:
 *
 * - `ec2:AcceptVpcPeeringConnection`
 *
 * - `ec2:AuthorizeSecurityGroupEgress`
 *
 * - `ec2:AuthorizeSecurityGroupIngress`
 *
 * - `ec2:CreateRoute`
 *
 * - `ec2:DescribeRouteTables`
 *
 * - `ec2:DescribeSecurityGroups`
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const createVpcPeeringConnection: API.OperationMethod<
  CreateVpcPeeringConnectionInput,
  CreateVpcPeeringConnectionOutput,
  CreateVpcPeeringConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1584, __c99, 0) as any as S.Schema<CreateVpcPeeringConnectionInput>,
  output: __S(640, __c40, 0) as any as S.Schema<CreateVpcPeeringConnectionOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcPeeringConnection",
}));

export type DeleteAliasError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Deletes an alias. This operation removes all record of the alias. Game clients
 * attempting to access a server process using the deleted alias receive an error. To
 * delete an alias, specify the alias ID to be deleted.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const deleteAlias: API.OperationMethod<
  DeleteAliasInput,
  DeleteAliasResponse,
  DeleteAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c100, 0) as any as S.Schema<DeleteAliasInput>,
  output: __S(640, __c40, 0) as any as S.Schema<DeleteAliasResponse>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAlias",
}));

export type DeleteBuildError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Deletes a build. This operation permanently deletes the build resource and any
 * uploaded build files. Deleting a build does not affect the status of any active fleets
 * using the build, but you can no longer create new fleets with the deleted build.
 *
 * To delete a build, specify the build ID.
 *
 * **Learn more**
 *
 * Upload a Custom
 * Server Build
 *
 * All APIs by task
 */
export const deleteBuild: API.OperationMethod<
  DeleteBuildInput,
  DeleteBuildResponse,
  DeleteBuildError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1616, __c101, 0) as any as S.Schema<DeleteBuildInput>,
  output: __S(640, __c40, 0) as any as S.Schema<DeleteBuildResponse>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBuild",
}));

export type DeleteContainerFleetError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Deletes all resources and information related to a container fleet and shuts down
 * currently running fleet instances, including those in remote locations. The container
 * fleet must be in `ACTIVE` status to be deleted.
 *
 * To delete a fleet, specify the fleet ID to be terminated. During the deletion process,
 * the fleet status is changed to `DELETING`.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * Fleets
 */
export const deleteContainerFleet: API.OperationMethod<
  DeleteContainerFleetInput,
  DeleteContainerFleetOutput,
  DeleteContainerFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c102, 0) as any as S.Schema<DeleteContainerFleetInput>,
  output: __S(640, __c40, 0) as any as S.Schema<DeleteContainerFleetOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContainerFleet",
}));

export type DeleteContainerGroupDefinitionError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * **Request options:**
 *
 * Deletes a container group definition.
 *
 * - Delete an entire container group definition, including all versions. Specify the
 * container group definition name, or use an ARN value without the version number.
 *
 * - Delete a particular version. Specify the container group definition name and a version
 * number, or use an ARN value that includes the version number.
 *
 * - Keep the newest versions and delete all older versions. Specify the container group
 * definition name and the number of versions to retain. For example, set
 * `VersionCountToRetain` to 5 to delete all but the five most recent
 * versions.
 *
 * **Result**
 *
 * If successful, Amazon GameLift Servers removes the container group definition versions that you request deletion for.
 * This request will fail for any requested versions if the following is true:
 *
 * - If the version is being used in an active fleet
 *
 * - If the version is being deployed to a fleet in a deployment that's currently in progress.
 *
 * - If the version is designated as a rollback definition in a fleet deployment that's currently in progress.
 *
 * **Learn more**
 *
 * - Manage a container group definition
 */
export const deleteContainerGroupDefinition: API.OperationMethod<
  DeleteContainerGroupDefinitionInput,
  DeleteContainerGroupDefinitionOutput,
  DeleteContainerGroupDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1648, __c103, 0) as any as S.Schema<DeleteContainerGroupDefinitionInput>,
  output: __S(640, __c40, 0) as any as S.Schema<DeleteContainerGroupDefinitionOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContainerGroupDefinition",
}));

export type DeleteFleetError =
  | InternalServiceException
  | InvalidFleetStatusException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere
 *
 * Deletes all resources and information related to a fleet and shuts down any currently
 * running fleet instances, including those in remote locations.
 *
 * If the fleet being deleted has a VPC peering connection, you first need to get a
 * valid authorization (good for 24 hours) by calling CreateVpcPeeringAuthorization. You don't need to explicitly delete the
 * VPC peering connection.
 *
 * To delete a fleet, specify the fleet ID to be terminated. During the deletion process,
 * the fleet status is changed to `DELETING`. When completed, the status
 * switches to `TERMINATED` and the fleet event `FLEET_DELETED` is
 * emitted.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * Fleets
 */
export const deleteFleet: API.OperationMethod<
  DeleteFleetInput,
  DeleteFleetResponse,
  DeleteFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1664, __c104, 0) as any as S.Schema<DeleteFleetInput>,
  output: __S(640, __c40, 0) as any as S.Schema<DeleteFleetResponse>,
  errors: [
    InternalServiceException,
    InvalidFleetStatusException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFleet",
}));

export type DeleteFleetLocationsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Removes locations from a multi-location fleet. When deleting a location, all game
 * server process and all instances that are still active in the location are shut down.
 *
 * To delete fleet locations, identify the fleet ID and provide a list of the locations
 * to be deleted.
 *
 * If successful, GameLift sets the location status to `DELETING`, and begins
 * to shut down existing server processes and terminate instances in each location being
 * deleted. When completed, the location status changes to `TERMINATED`.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 */
export const deleteFleetLocations: API.OperationMethod<
  DeleteFleetLocationsInput,
  DeleteFleetLocationsOutput,
  DeleteFleetLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1680, __c105, 0) as any as S.Schema<DeleteFleetLocationsInput>,
  output: __S(1136, __c71, 0) as any as S.Schema<DeleteFleetLocationsOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFleetLocations",
}));

export type DeleteGameServerGroupError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Terminates a game server group
 * and permanently deletes the game server group record. You have several options for how
 * these resources are impacted when deleting the game server group. Depending on the type
 * of delete operation selected, this operation might affect these resources:
 *
 * - The game server group
 *
 * - The corresponding Auto Scaling group
 *
 * - All game servers that are currently running in the group
 *
 * To delete a game server group, identify the game server group to delete and specify
 * the type of delete operation to initiate. Game server groups can only be deleted if they
 * are in `ACTIVE` or `ERROR` status.
 *
 * If the delete request is successful, a series of operations are kicked off. The game
 * server group status is changed to `DELETE_SCHEDULED`, which prevents new game
 * servers from being registered and stops automatic scaling activity. Once all game
 * servers in the game server group are deregistered, Amazon GameLift Servers FleetIQ can begin deleting resources.
 * If any of the delete operations fail, the game server group is placed in
 * `ERROR` status.
 *
 * Amazon GameLift Servers FleetIQ emits delete events to Amazon CloudWatch.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const deleteGameServerGroup: API.OperationMethod<
  DeleteGameServerGroupInput,
  DeleteGameServerGroupOutput,
  DeleteGameServerGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1696, __c106, 0) as any as S.Schema<DeleteGameServerGroupInput>,
  output: __S(1168, __c73, 0) as any as S.Schema<DeleteGameServerGroupOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGameServerGroup",
}));

export type DeleteGameSessionQueueError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Deletes a game session queue. Once a queue is successfully deleted, unfulfilled StartGameSessionPlacement requests that reference the queue will fail. To
 * delete a queue, specify the queue name.
 */
export const deleteGameSessionQueue: API.OperationMethod<
  DeleteGameSessionQueueInput,
  DeleteGameSessionQueueOutput,
  DeleteGameSessionQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1712, __c107, 0) as any as S.Schema<DeleteGameSessionQueueInput>,
  output: __S(640, __c40, 0) as any as S.Schema<DeleteGameSessionQueueOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGameSessionQueue",
}));

export type DeleteLocationError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Anywhere
 *
 * Deletes a custom location.
 *
 * Before deleting a custom location, review any fleets currently using the custom
 * location and deregister the location if it is in use. For more information, see DeregisterCompute.
 */
export const deleteLocation: API.OperationMethod<
  DeleteLocationInput,
  DeleteLocationOutput,
  DeleteLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c108, 0) as any as S.Schema<DeleteLocationInput>,
  output: __S(640, __c40, 0) as any as S.Schema<DeleteLocationOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLocation",
}));

export type DeleteMatchmakingConfigurationError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Permanently removes a FlexMatch matchmaking configuration. To delete, specify the
 * configuration name. A matchmaking configuration cannot be deleted if it is being used in
 * any active matchmaking tickets.
 */
export const deleteMatchmakingConfiguration: API.OperationMethod<
  DeleteMatchmakingConfigurationInput,
  DeleteMatchmakingConfigurationOutput,
  DeleteMatchmakingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1744, __c109, 0) as any as S.Schema<DeleteMatchmakingConfigurationInput>,
  output: __S(640, __c40, 0) as any as S.Schema<DeleteMatchmakingConfigurationOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMatchmakingConfiguration",
}));

export type DeleteMatchmakingRuleSetError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Deletes an existing matchmaking rule set. To delete the rule set, provide the rule set
 * name. Rule sets cannot be deleted if they are currently being used by a matchmaking
 * configuration.
 *
 * **Learn more**
 *
 * - Build a rule
 * set
 */
export const deleteMatchmakingRuleSet: API.OperationMethod<
  DeleteMatchmakingRuleSetInput,
  DeleteMatchmakingRuleSetOutput,
  DeleteMatchmakingRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c110, 0) as any as S.Schema<DeleteMatchmakingRuleSetInput>,
  output: __S(640, __c40, 0) as any as S.Schema<DeleteMatchmakingRuleSetOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMatchmakingRuleSet",
}));

export type DeleteScalingPolicyError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Container
 *
 * Deletes a fleet scaling policy. Once deleted, the policy is no longer in force and
 * Amazon GameLift Servers removes all record of it. To delete a scaling policy, specify both the scaling
 * policy name and the fleet ID it is associated with.
 *
 * To temporarily suspend scaling policies, use StopFleetActions. This operation suspends all policies for the
 * fleet.
 */
export const deleteScalingPolicy: API.OperationMethod<
  DeleteScalingPolicyInput,
  DeleteScalingPolicyResponse,
  DeleteScalingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1776, __c111, 0) as any as S.Schema<DeleteScalingPolicyInput>,
  output: __S(640, __c40, 0) as any as S.Schema<DeleteScalingPolicyResponse>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScalingPolicy",
}));

export type DeleteScriptError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Deletes a Realtime script. This operation permanently deletes the script record. If
 * script files were uploaded, they are also deleted (files stored in an S3 bucket are not
 * deleted).
 *
 * To delete a script, specify the script ID. Before deleting a script, be sure to
 * terminate all fleets that are deployed with the script being deleted. Fleet instances
 * periodically check for script updates, and if the script record no longer exists, the
 * instance will go into an error state and be unable to host game sessions.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers Amazon GameLift Servers Realtime
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const deleteScript: API.OperationMethod<
  DeleteScriptInput,
  DeleteScriptResponse,
  DeleteScriptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c112, 0) as any as S.Schema<DeleteScriptInput>,
  output: __S(640, __c40, 0) as any as S.Schema<DeleteScriptResponse>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScript",
}));

export type DeleteVpcPeeringAuthorizationError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Cancels a pending VPC peering authorization for the specified VPC. If you need to
 * delete an existing VPC peering connection, use DeleteVpcPeeringConnection.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const deleteVpcPeeringAuthorization: API.OperationMethod<
  DeleteVpcPeeringAuthorizationInput,
  DeleteVpcPeeringAuthorizationOutput,
  DeleteVpcPeeringAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1808, __c113, 0) as any as S.Schema<DeleteVpcPeeringAuthorizationInput>,
  output: __S(640, __c40, 0) as any as S.Schema<DeleteVpcPeeringAuthorizationOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcPeeringAuthorization",
}));

export type DeleteVpcPeeringConnectionError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Removes a VPC peering connection. To delete the connection, you must have a valid
 * authorization for the VPC peering connection that you want to delete..
 *
 * Once a valid authorization exists, call this operation from the Amazon Web Services account that is
 * used to manage the Amazon GameLift Servers fleets. Identify the connection to delete by the connection ID
 * and fleet ID. If successful, the connection is removed.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const deleteVpcPeeringConnection: API.OperationMethod<
  DeleteVpcPeeringConnectionInput,
  DeleteVpcPeeringConnectionOutput,
  DeleteVpcPeeringConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1824, __c114, 0) as any as S.Schema<DeleteVpcPeeringConnectionInput>,
  output: __S(640, __c40, 0) as any as S.Schema<DeleteVpcPeeringConnectionOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcPeeringConnection",
}));

export type DeregisterComputeError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Anywhere
 *
 * Removes a compute resource from an Anywhere fleet. Deregistered computes can no longer
 * host game sessions through Amazon GameLift Servers. Use this operation with an Anywhere fleet that
 * doesn't use the Amazon GameLift Servers Agent For Anywhere fleets with the Agent, the Agent handles all
 * compute registry tasks for you.
 *
 * To deregister a compute, call this operation from the compute that's being
 * deregistered and specify the compute name and the fleet ID.
 */
export const deregisterCompute: API.OperationMethod<
  DeregisterComputeInput,
  DeregisterComputeOutput,
  DeregisterComputeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1840, __c115, 0) as any as S.Schema<DeregisterComputeInput>,
  output: __S(640, __c40, 0) as any as S.Schema<DeregisterComputeOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterCompute",
}));

export type DeregisterGameServerError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Removes the game server from a
 * game server group. As a result of this operation, the deregistered game server can no
 * longer be claimed and will not be returned in a list of active game servers.
 *
 * To deregister a game server, specify the game server group and game server ID. If
 * successful, this operation emits a CloudWatch event with termination timestamp and
 * reason.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const deregisterGameServer: API.OperationMethod<
  DeregisterGameServerInput,
  DeregisterGameServerResponse,
  DeregisterGameServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1856, __c116, 0) as any as S.Schema<DeregisterGameServerInput>,
  output: __S(640, __c40, 0) as any as S.Schema<DeregisterGameServerResponse>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterGameServer",
}));

export type DescribeAliasError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves properties for an alias. This operation returns all alias metadata and
 * settings. To get an alias's target fleet ID only, use `ResolveAlias`.
 *
 * To get alias properties, specify the alias ID. If successful, the requested alias
 * record is returned.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const describeAlias: API.OperationMethod<
  DescribeAliasInput,
  DescribeAliasOutput,
  DescribeAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1872, __c117, 0) as any as S.Schema<DescribeAliasInput>,
  output: __S(752, __c47, 0) as any as S.Schema<DescribeAliasOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAlias",
}));

export type DescribeBuildError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves properties for a custom game build. To request a build resource, specify a
 * build ID. If successful, an object containing the build properties is returned.
 *
 * **Learn more**
 *
 * Upload a Custom
 * Server Build
 *
 * All APIs by task
 */
export const describeBuild: API.OperationMethod<
  DescribeBuildInput,
  DescribeBuildOutput,
  DescribeBuildError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1888, __c118, 0) as any as S.Schema<DescribeBuildInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<DescribeBuildOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBuild",
}));

export type DescribeComputeError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves properties for a specific compute resource in an Amazon GameLift Servers fleet. You can list
 * all computes in a fleet by calling ListCompute.
 *
 * **Request options**
 *
 * Provide the fleet ID and compute name. The compute name varies depending on the type
 * of fleet.
 *
 * - For a compute in a managed EC2 fleet, provide an instance ID. Each instance in
 * the fleet is a compute.
 *
 * - For a compute in a managed container fleet, provide a compute name. In a
 * container fleet, each game server container group on a fleet instance is
 * assigned a compute name.
 *
 * - For a compute in an Anywhere fleet, provide a registered compute name.
 * Anywhere fleet computes are created when you register a hosting resource with
 * the fleet.
 *
 * **Results**
 *
 * If successful, this operation returns details for the requested compute resource.
 * Depending on the fleet's compute type, the result includes the following information:
 *
 * - For a managed EC2 fleet, this operation returns information about the EC2
 * instance.
 *
 * - For an Anywhere fleet, this operation returns information about the registered
 * compute.
 */
export const describeCompute: API.OperationMethod<
  DescribeComputeInput,
  DescribeComputeOutput,
  DescribeComputeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1920, __c120, 0) as any as S.Schema<DescribeComputeInput>,
  output: __S(1936, __c121, 0) as any as S.Schema<DescribeComputeOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCompute",
}));

export type DescribeContainerFleetError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Retrieves the properties for a container fleet. When requesting attributes for
 * multiple fleets, use the pagination parameters to retrieve results as a set of
 * sequential pages.
 *
 * **Request options**
 *
 * - Get container fleet properties for a single fleet. Provide either the fleet ID or ARN value.
 *
 * **Results**
 *
 * If successful, a `ContainerFleet` object is returned. This object includes
 * the fleet properties, including information about the most recent deployment.
 *
 * Some API operations limit the number of fleet IDs that allowed in one request. If
 * a request exceeds this limit, the request fails and the error message contains the
 * maximum allowed number.
 */
export const describeContainerFleet: API.OperationMethod<
  DescribeContainerFleetInput,
  DescribeContainerFleetOutput,
  DescribeContainerFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1984, __c124, 0) as any as S.Schema<DescribeContainerFleetInput>,
  output: __S(960, __c60, 0) as any as S.Schema<DescribeContainerFleetOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContainerFleet",
}));

export type DescribeContainerGroupDefinitionError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Retrieves the properties of a container group definition, including all container
 * definitions in the group.
 *
 * **Request options:**
 *
 * - Retrieve the latest version of a container group definition. Specify the container
 * group definition name only, or use an ARN value without a version number.
 *
 * - Retrieve a particular version. Specify the container group definition name and a
 * version number, or use an ARN value that includes the version number.
 *
 * **Results:**
 *
 * If successful, this operation returns the complete properties of a container group
 * definition version.
 *
 * **Learn more**
 *
 * - Manage a container group definition
 */
export const describeContainerGroupDefinition: API.OperationMethod<
  DescribeContainerGroupDefinitionInput,
  DescribeContainerGroupDefinitionOutput,
  DescribeContainerGroupDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2000, __c125, 0) as any as S.Schema<DescribeContainerGroupDefinitionInput>,
  output: __S(1024, __c64, 0) as any as S.Schema<DescribeContainerGroupDefinitionOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContainerGroupDefinition",
}));

export type DescribeContainerGroupPortMappingsError =
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Retrieves the port mappings for a container group running on a container fleet. Port
 * mappings show how container ports are mapped to connection ports on the fleet instance.
 * Use this operation to find the connection port for a specific container on a fleet
 * instance.
 *
 * **Request options**
 *
 * - Get port mappings for a game server container group. Provide the fleet ID,
 * set `ContainerGroupType` to `GAME_SERVER`, and specify the
 * `ComputeName` for the game server container group.
 *
 * - Get port mappings for a per-instance container group. Provide the fleet ID,
 * set `ContainerGroupType` to `PER_INSTANCE`, and specify the
 * `InstanceId` for the instance.
 *
 * - Optionally filter results to a single container by providing a
 * `ContainerName`.
 *
 * **Results**
 *
 * This operation returns the fleet ID, fleet ARN, location, container group definition
 * ARN, container group type, compute name (for game server container groups), instance ID,
 * and a list of `ContainerGroupPortMapping` objects. Each object contains the
 * container name, runtime ID, and a list of port mappings that show how container ports map
 * to connection ports on the instance.
 *
 * **Learn more**
 *
 * Connect to
 * containers
 *
 * Create a
 * container group definition
 */
export const describeContainerGroupPortMappings: API.OperationMethod<
  DescribeContainerGroupPortMappingsInput,
  DescribeContainerGroupPortMappingsOutput,
  DescribeContainerGroupPortMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c126, 0) as any as S.Schema<DescribeContainerGroupPortMappingsInput>,
  output: __S(2021, __c126, 5) as any as S.Schema<DescribeContainerGroupPortMappingsOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContainerGroupPortMappings",
}));

export type DescribeEC2InstanceLimitsError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves the instance limits and current utilization for an Amazon Web Services Region or location.
 * Instance limits control the number of instances, per instance type, per location, that
 * your Amazon Web Services account can use. Learn more at Amazon EC2 Instance Types. The information
 * returned includes the maximum number of instances allowed and your account's current
 * usage across all fleets. This information can affect your ability to scale your Amazon GameLift Servers
 * fleets. You can request a limit increase for your account by using the **Service limits** page in the Amazon GameLift Servers console.
 *
 * Instance limits differ based on whether the instances are deployed in a fleet's home
 * Region or in a remote location. For remote locations, limits also differ based on the
 * combination of home Region and remote location. All requests must specify an Amazon Web Services
 * Region (either explicitly or as your default settings). To get the limit for a remote
 * location, you must also specify the location. To learn more about how Amazon GameLift Servers handles
 * locations, see Amazon GameLift Servers service
 * locations. For example, the following requests all
 * return different results:
 *
 * - Request specifies the Region `ap-northeast-1` with no location. The
 * result is limits and usage data on all of the fleets that reside in
 * `ap-northeast-1`, for all instance types that are deployed in
 * `ap-northeast-1`.
 *
 * - Request specifies the Region `ap-northeast-1` with location
 * `us-west-2`. The result is limits and usage data on all of the
 * fleets that reside in `ap-northeast-1`, for all instance types
 * that are deployed in `us-west-2`.
 *
 * - Request specifies the Region `us-east-1` with location
 * `ap-northeast-1`. The result is limits and usage data on all of
 * the fleets that reside in `us-east-1`, for all instance types
 * that are deployed in `ap-northeast-1`. These limits do not affect
 * fleets in any other Regions that deploy instances to
 * `ap-northeast-1`.
 *
 * This operation can be used in the following ways:
 *
 * - To get limit and usage data for all instance types that are deployed in an
 * Amazon Web Services Region by fleets that reside in the same Region: Specify the Region only.
 * Optionally, specify a single instance type to retrieve information for.
 *
 * - To get limit and usage data for all instance types that are deployed to a
 * remote location by fleets that reside in different Amazon Web Services Region: Provide both
 * the Amazon Web Services Region and the remote location. Optionally, specify a single instance
 * type to retrieve information for.
 *
 * If successful, an `EC2InstanceLimits` object is returned with limits and
 * usage data for each requested instance type.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers fleets
 */
export const describeEC2InstanceLimits: API.OperationMethod<
  DescribeEC2InstanceLimitsInput,
  DescribeEC2InstanceLimitsOutput,
  DescribeEC2InstanceLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2032, __c127, 0) as any as S.Schema<DescribeEC2InstanceLimitsInput>,
  output: __S(2035, __c127, 3) as any as S.Schema<DescribeEC2InstanceLimitsOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEC2InstanceLimits",
}));

export type DescribeFleetAttributesError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere
 *
 * Retrieves core fleet-wide properties for fleets in an Amazon Web Services Region. Properties include the computing
 * hardware and deployment configuration for instances in the fleet.
 *
 * You can use this operation in the following ways:
 *
 * - To get attributes for specific fleets, provide a list of fleet IDs or fleet ARNs.
 *
 * - To get attributes for all fleets, do not provide a fleet identifier.
 *
 * When requesting attributes for multiple fleets, use the pagination parameters to
 * retrieve results as a set of sequential pages.
 *
 * If successful, a `FleetAttributes` object is returned for each fleet
 * requested, unless the fleet identifier is not found.
 *
 * Some API operations limit the number of fleet IDs that allowed in one request. If
 * a request exceeds this limit, the request fails and the error message contains the
 * maximum allowed number.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 */
export const describeFleetAttributes: API.PaginatedOperationMethod<
  DescribeFleetAttributesInput,
  DescribeFleetAttributesOutput,
  DescribeFleetAttributesError,
  Credentials | HttpClient.HttpClient,
  FleetAttributes
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2048, __c128, 0) as any as S.Schema<DescribeFleetAttributesInput>,
  output: __S(2050, __c128, 2) as any as S.Schema<DescribeFleetAttributesOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetAttributes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FleetAttributes",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeFleetCapacityError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Container
 *
 * Retrieves the resource capacity settings for one or more fleets. For a container
 * fleet, this operation also returns counts for game server container groups.
 *
 * With multi-location fleets, this operation retrieves data for the fleet's home Region
 * only. To retrieve capacity for remote locations, see
 * https://docs.aws.amazon.com/gamelift/latest/apireference/API_DescribeFleetLocationCapacity.html.
 *
 * This operation can be used in the following ways:
 *
 * - To get capacity data for one or more specific fleets, provide a list of fleet
 * IDs or fleet ARNs.
 *
 * - To get capacity data for all fleets, do not provide a fleet identifier.
 *
 * When requesting multiple fleets, use the pagination parameters to retrieve results as
 * a set of sequential pages.
 *
 * If successful, a `FleetCapacity` object is returned for each requested
 * fleet ID. Each `FleetCapacity` object includes a `Location`
 * property, which is set to the fleet's home Region. Capacity values are returned only for
 * fleets that currently exist.
 *
 * Some API operations may limit the number of fleet IDs that are allowed in one
 * request. If a request exceeds this limit, the request fails and the error message
 * includes the maximum allowed.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 *
 * GameLift metrics for fleets
 */
export const describeFleetCapacity: API.PaginatedOperationMethod<
  DescribeFleetCapacityInput,
  DescribeFleetCapacityOutput,
  DescribeFleetCapacityError,
  Credentials | HttpClient.HttpClient,
  FleetCapacity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2064, __c129, 0) as any as S.Schema<DescribeFleetCapacityInput>,
  output: __S(2066, __c129, 2) as any as S.Schema<DescribeFleetCapacityOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetCapacity",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FleetCapacity",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeFleetDeploymentError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Retrieves information about a managed container fleet deployment.
 *
 * **Request options**
 *
 * - Get information about the latest deployment for a specific fleet. Provide the
 * fleet ID or ARN.
 *
 * - Get information about a specific deployment. Provide the fleet ID or ARN and
 * the deployment ID.
 *
 * **Results**
 *
 * If successful, a `FleetDeployment` object is returned.
 */
export const describeFleetDeployment: API.OperationMethod<
  DescribeFleetDeploymentInput,
  DescribeFleetDeploymentOutput,
  DescribeFleetDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2112, __c132, 0) as any as S.Schema<DescribeFleetDeploymentInput>,
  output: __S(2115, __c132, 3) as any as S.Schema<DescribeFleetDeploymentOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetDeployment",
}));

export type DescribeFleetEventsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves entries from a fleet's event log. Fleet events are initiated by changes in
 * status, such as during fleet creation and termination, changes in capacity, etc. If a
 * fleet has multiple locations, events are also initiated by changes to status and capacity in remote locations.
 *
 * You can specify a time range to limit the result set. Use the pagination parameters to
 * retrieve results as a set of sequential pages.
 *
 * If successful, a collection of event log entries matching the request are
 * returned.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 */
export const describeFleetEvents: API.PaginatedOperationMethod<
  DescribeFleetEventsInput,
  DescribeFleetEventsOutput,
  DescribeFleetEventsError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2160, __c135, 0) as any as S.Schema<DescribeFleetEventsInput>,
  output: __S(2163, __c135, 3) as any as S.Schema<DescribeFleetEventsOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Events",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeFleetLocationAttributesError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves information on a fleet's remote locations, including life-cycle status and
 * any suspended fleet activity.
 *
 * This operation can be used in the following ways:
 *
 * - To get data for specific locations, provide a fleet identifier and a list of
 * locations. Location data is returned in the order that it is requested.
 *
 * - To get data for all locations, provide a fleet identifier only. Location data
 * is returned in no particular order.
 *
 * When requesting attributes for multiple locations, use the pagination parameters to
 * retrieve results as a set of sequential pages.
 *
 * If successful, a `LocationAttributes` object is returned for each requested
 * location. If the fleet does not have a requested location, no information is returned.
 *
 * **Learn more**
 *
 * Setting
 * up Amazon GameLift Servers fleets
 *
 * Amazon GameLift Servers service locations for managed hosting
 */
export const describeFleetLocationAttributes: API.PaginatedOperationMethod<
  DescribeFleetLocationAttributesInput,
  DescribeFleetLocationAttributesOutput,
  DescribeFleetLocationAttributesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2176, __c136, 0) as any as S.Schema<DescribeFleetLocationAttributesInput>,
  output: __S(2179, __c136, 3) as any as S.Schema<DescribeFleetLocationAttributesOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetLocationAttributes",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "Limit" } as const,
})) as any;

export type DescribeFleetLocationCapacityError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves the resource capacity settings for a fleet location. The data returned
 * includes the current capacity (number of EC2 instances) and some scaling settings for
 * the requested fleet location. For a managed container fleet, this operation also returns counts
 * for game server container groups.
 *
 * Use this operation to retrieve capacity information for a fleet's remote location or
 * home Region (you can also retrieve home Region capacity by calling
 * `DescribeFleetCapacity`).
 *
 * To retrieve capacity data, identify a fleet and location.
 *
 * If successful, a `FleetCapacity` object is returned for the requested fleet
 * location.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 *
 * Amazon GameLift Servers service locations for managed hosting
 *
 * GameLift metrics for fleets
 */
export const describeFleetLocationCapacity: API.OperationMethod<
  DescribeFleetLocationCapacityInput,
  DescribeFleetLocationCapacityOutput,
  DescribeFleetLocationCapacityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2192, __c137, 0) as any as S.Schema<DescribeFleetLocationCapacityInput>,
  output: __S(2193, __c137, 1) as any as S.Schema<DescribeFleetLocationCapacityOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetLocationCapacity",
}));

export type DescribeFleetLocationUtilizationError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere
 *
 * Retrieves current usage data for a fleet location. Utilization data provides a
 * snapshot of current game hosting activity at the requested location. Use this operation
 * to retrieve utilization information for a fleet's remote location or home Region (you
 * can also retrieve home Region utilization by calling
 * `DescribeFleetUtilization`).
 *
 * To retrieve utilization data, identify a fleet and location.
 *
 * If successful, a `FleetUtilization` object is returned for the requested
 * fleet location.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 *
 * Amazon GameLift Servers service locations for managed hosting
 *
 * GameLift metrics for fleets
 */
export const describeFleetLocationUtilization: API.OperationMethod<
  DescribeFleetLocationUtilizationInput,
  DescribeFleetLocationUtilizationOutput,
  DescribeFleetLocationUtilizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2208, __c138, 0) as any as S.Schema<DescribeFleetLocationUtilizationInput>,
  output: __S(2209, __c138, 1) as any as S.Schema<DescribeFleetLocationUtilizationOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetLocationUtilization",
}));

export type DescribeFleetPortSettingsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves a fleet's inbound connection permissions. Connection permissions specify IP
 * addresses and port settings that incoming traffic can use to access server processes in
 * the fleet. Game server processes that are running in the fleet must use a port that
 * falls within this range.
 *
 * Use this operation in the following ways:
 *
 * - To retrieve the port settings for a fleet, identify the fleet's unique
 * identifier.
 *
 * - To check the status of recent updates to a fleet remote location, specify the
 * fleet ID and a location. Port setting updates can take time to propagate across
 * all locations.
 *
 * If successful, a set of `IpPermission` objects is returned for the
 * requested fleet ID. When specifying a location, this operation returns a pending status.
 * If the requested fleet has been deleted, the result set is empty.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 */
export const describeFleetPortSettings: API.OperationMethod<
  DescribeFleetPortSettingsInput,
  DescribeFleetPortSettingsOutput,
  DescribeFleetPortSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2240, __c140, 0) as any as S.Schema<DescribeFleetPortSettingsInput>,
  output: __S(2241, __c140, 1) as any as S.Schema<DescribeFleetPortSettingsOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetPortSettings",
}));

export type DescribeFleetUtilizationError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves utilization statistics for one or more fleets. Utilization data provides a
 * snapshot of how the fleet's hosting resources are currently being used. For fleets with
 * remote locations, this operation retrieves data for the fleet's home Region only. See
 * DescribeFleetLocationUtilization to get utilization statistics for a
 * fleet's remote locations.
 *
 * This operation can be used in the following ways:
 *
 * - To get utilization data for one or more specific fleets, provide a list of
 * fleet IDs or fleet ARNs.
 *
 * - To get utilization data for all fleets, do not provide a fleet identifier.
 *
 * When requesting multiple fleets, use the pagination parameters to retrieve results as
 * a set of sequential pages.
 *
 * If successful, a FleetUtilization object is returned for each requested fleet ID, unless the
 * fleet identifier is not found. Each fleet utilization object includes a
 * `Location` property, which is set to the fleet's home Region.
 *
 * Some API operations may limit the number of fleet IDs allowed in one request. If a
 * request exceeds this limit, the request fails and the error message includes the
 * maximum allowed.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * Fleets
 *
 * GameLift Metrics for Fleets
 */
export const describeFleetUtilization: API.PaginatedOperationMethod<
  DescribeFleetUtilizationInput,
  DescribeFleetUtilizationOutput,
  DescribeFleetUtilizationError,
  Credentials | HttpClient.HttpClient,
  FleetUtilization
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2256, __c141, 0) as any as S.Schema<DescribeFleetUtilizationInput>,
  output: __S(2258, __c141, 2) as any as S.Schema<DescribeFleetUtilizationOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetUtilization",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FleetUtilization",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeGameServerError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Retrieves information for a
 * registered game server. Information includes game server status, health check info, and
 * the instance that the game server is running on.
 *
 * To retrieve game server information, specify the game server ID. If successful, the
 * requested game server object is returned.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const describeGameServer: API.OperationMethod<
  DescribeGameServerInput,
  DescribeGameServerOutput,
  DescribeGameServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2272, __c142, 0) as any as S.Schema<DescribeGameServerInput>,
  output: __S(688, __c43, 0) as any as S.Schema<DescribeGameServerOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGameServer",
}));

export type DescribeGameServerGroupError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Retrieves information on a
 * game server group. This operation returns only properties related to Amazon GameLift Servers FleetIQ. To view or
 * update properties for the corresponding Auto Scaling group, such as launch template,
 * auto scaling policies, and maximum/minimum group size, access the Auto Scaling group
 * directly.
 *
 * To get attributes for a game server group, provide a group name or ARN value. If
 * successful, a `GameServerGroup` object is returned.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const describeGameServerGroup: API.OperationMethod<
  DescribeGameServerGroupInput,
  DescribeGameServerGroupOutput,
  DescribeGameServerGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2288, __c143, 0) as any as S.Schema<DescribeGameServerGroupInput>,
  output: __S(1168, __c73, 0) as any as S.Schema<DescribeGameServerGroupOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGameServerGroup",
}));

export type DescribeGameServerInstancesError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Retrieves status
 * information about the Amazon EC2 instances associated with a Amazon GameLift Servers FleetIQ game server group.
 * Use this operation to detect when instances are active or not available to host new game
 * servers.
 *
 * To request status for all instances in the game server group, provide a game server
 * group ID only. To request status for specific instances, provide the game server group
 * ID and one or more instance IDs. Use the pagination parameters to retrieve results in
 * sequential segments. If successful, a collection of `GameServerInstance`
 * objects is returned.
 *
 * This operation is not designed to be called with every game server claim request; this
 * practice can cause you to exceed your API limit, which results in errors. Instead, as a
 * best practice, cache the results and refresh your cache no more than once every 10
 * seconds.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const describeGameServerInstances: API.PaginatedOperationMethod<
  DescribeGameServerInstancesInput,
  DescribeGameServerInstancesOutput,
  DescribeGameServerInstancesError,
  Credentials | HttpClient.HttpClient,
  GameServerInstance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2304, __c144, 0) as any as S.Schema<DescribeGameServerInstancesInput>,
  output: __S(2307, __c144, 3) as any as S.Schema<DescribeGameServerInstancesOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGameServerInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GameServerInstances",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeGameSessionDetailsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TerminalRoutingStrategyException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves additional game session properties, including the game session protection
 * policy in force, a set of one or more game sessions in a specific fleet location. You
 * can optionally filter the results by current game session status.
 *
 * This operation can be used in the following ways:
 *
 * - To retrieve details for all game sessions that are currently running on all
 * locations in a fleet, provide a fleet or alias ID, with an optional status
 * filter. This approach returns details from the fleet's home Region and all
 * remote locations.
 *
 * - To retrieve details for all game sessions that are currently running on a
 * specific fleet location, provide a fleet or alias ID and a location name, with
 * optional status filter. The location can be the fleet's home Region or any
 * remote location.
 *
 * - To retrieve details for a specific game session, provide the game session ID.
 * This approach looks for the game session ID in all fleets that reside in the
 * Amazon Web Services Region defined in the request.
 *
 * Use the pagination parameters to retrieve results as a set of sequential pages.
 *
 * If successful, a `GameSessionDetail` object is returned for each game
 * session that matches the request.
 *
 * **Learn more**
 *
 * Find a game session
 *
 * All APIs by task
 */
export const describeGameSessionDetails: API.PaginatedOperationMethod<
  DescribeGameSessionDetailsInput,
  DescribeGameSessionDetailsOutput,
  DescribeGameSessionDetailsError,
  Credentials | HttpClient.HttpClient,
  GameSessionDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2320, __c145, 0) as any as S.Schema<DescribeGameSessionDetailsInput>,
  output: __S(2323, __c145, 3) as any as S.Schema<DescribeGameSessionDetailsOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TerminalRoutingStrategyException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGameSessionDetails",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GameSessionDetails",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeGameSessionPlacementError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves information, including current status, about a game session placement
 * request.
 *
 * To get game session placement details, specify the placement ID.
 *
 * This operation is not designed to be continually called to track game session status.
 * This practice can cause you to exceed your API limit, which results in errors. Instead,
 * you must configure an Amazon Simple Notification Service (SNS) topic to receive notifications from FlexMatch or
 * queues. Continuously polling with `DescribeGameSessionPlacement` should only
 * be used for games in development with low game session usage. For a reference
 * implementation of event-based game session placement tracking, see
 * Event-based game session placement guidance in the Amazon GameLift Toolkit.
 */
export const describeGameSessionPlacement: API.OperationMethod<
  DescribeGameSessionPlacementInput,
  DescribeGameSessionPlacementOutput,
  DescribeGameSessionPlacementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2336, __c146, 0) as any as S.Schema<DescribeGameSessionPlacementInput>,
  output: __S(2356, __c147, 4) as any as S.Schema<DescribeGameSessionPlacementOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGameSessionPlacement",
}));

export type DescribeGameSessionQueuesError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves the properties for one or more game session queues. When requesting multiple
 * queues, use the pagination parameters to retrieve results as a set of sequential pages.
 * When specifying a list of queues, objects are returned only for queues that currently
 * exist in the Region.
 *
 * **Learn more**
 *
 * View Your Queues
 */
export const describeGameSessionQueues: API.PaginatedOperationMethod<
  DescribeGameSessionQueuesInput,
  DescribeGameSessionQueuesOutput,
  DescribeGameSessionQueuesError,
  Credentials | HttpClient.HttpClient,
  GameSessionQueue
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2384, __c149, 0) as any as S.Schema<DescribeGameSessionQueuesInput>,
  output: __S(2386, __c149, 2) as any as S.Schema<DescribeGameSessionQueuesOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGameSessionQueues",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GameSessionQueues",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeGameSessionsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TerminalRoutingStrategyException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves a set of one or more game sessions in a specific fleet location. You can
 * optionally filter the results by current game session status.
 *
 * This operation can be used in the following ways:
 *
 * - To retrieve all game sessions that are currently running on all locations in a
 * fleet, provide a fleet or alias ID, with an optional status filter. This
 * approach returns all game sessions in the fleet's home Region and all remote
 * locations.
 *
 * - To retrieve all game sessions that are currently running on a specific fleet
 * location, provide a fleet or alias ID and a location name, with optional status
 * filter. The location can be the fleet's home Region or any remote
 * location.
 *
 * - To retrieve a specific game session, provide the game session ID. This
 * approach looks for the game session ID in all fleets that reside in the Amazon Web Services
 * Region defined in the request.
 *
 * Use the pagination parameters to retrieve results as a set of sequential pages.
 *
 * If successful, a `GameSession` object is returned for each game session
 * that matches the request.
 *
 * This operation is not designed to be continually called to track game session status.
 * This practice can cause you to exceed your API limit, which results in errors. Instead,
 * you must configure an Amazon Simple Notification Service (SNS) topic to receive notifications from FlexMatch or
 * queues. Continuously polling with `DescribeGameSessions` should only be used
 * for games in development with low game session usage.
 *
 * *Available in Amazon GameLift Servers Local.*
 *
 * **Learn more**
 *
 * Find a game session
 *
 * All APIs by task
 */
export const describeGameSessions: API.PaginatedOperationMethod<
  DescribeGameSessionsInput,
  DescribeGameSessionsOutput,
  DescribeGameSessionsError,
  Credentials | HttpClient.HttpClient,
  GameSession
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2400, __c150, 0) as any as S.Schema<DescribeGameSessionsInput>,
  output: __S(2417, __c151, 1) as any as S.Schema<DescribeGameSessionsOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TerminalRoutingStrategyException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGameSessions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GameSessions",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeInstancesError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:**EC2, Container
 *
 * Retrieves information about the EC2 instances in an Amazon GameLift Servers managed fleet, including
 * instance ID, connection data, and status. You can use this operation with a
 * multi-location fleet to get location-specific instance information. As an alternative,
 * use the operations https://docs.aws.amazon.com/gamelift/latest/apireference/API_ListCompute and https://docs.aws.amazon.com/gamelift/latest/apireference/API_DescribeCompute
 * to retrieve information for compute resources, including EC2 and Anywhere fleets.
 *
 * You can call this operation in the following ways:
 *
 * - To get information on all instances in a fleet's home Region, specify the
 * fleet ID.
 *
 * - To get information on all instances in a fleet's remote location, specify the
 * fleet ID and location name.
 *
 * - To get information on a specific instance in a fleet, specify the fleet ID and
 * instance ID.
 *
 * Use the pagination parameters to retrieve results as a set of sequential pages.
 *
 * If successful, this operation returns `Instance` objects for each requested
 * instance, listed in no particular order. If you call this operation for an Anywhere
 * fleet, you receive an InvalidRequestException.
 *
 * **Learn more**
 *
 * Remotely connect to
 * fleet instances
 *
 * Debug fleet
 * issues
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const describeInstances: API.PaginatedOperationMethod<
  DescribeInstancesInput,
  DescribeInstancesOutput,
  DescribeInstancesError,
  Credentials | HttpClient.HttpClient,
  Instance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2432, __c152, 0) as any as S.Schema<DescribeInstancesInput>,
  output: __S(2435, __c152, 3) as any as S.Schema<DescribeInstancesOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Instances",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeMatchmakingError =
  | InternalServiceException
  | InvalidRequestException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves one or more matchmaking tickets. Use this operation to retrieve ticket
 * information, including--after a successful match is made--connection information for the
 * resulting new game session.
 *
 * To request matchmaking tickets, provide a list of up to 10 ticket IDs. If the request
 * is successful, a ticket object is returned for each requested ID that currently
 * exists.
 *
 * This operation is not designed to be continually called to track matchmaking ticket
 * status. This practice can cause you to exceed your API limit, which results in errors.
 * Instead, as a best practice, set up an Amazon Simple Notification Service to receive notifications, and provide
 * the topic ARN in the matchmaking configuration.
 *
 * **Learn more**
 *
 * Add FlexMatch to a game client
 *
 * Set Up FlexMatch event
 * notification
 */
export const describeMatchmaking: API.OperationMethod<
  DescribeMatchmakingInput,
  DescribeMatchmakingOutput,
  DescribeMatchmakingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2448, __c153, 0) as any as S.Schema<DescribeMatchmakingInput>,
  output: __S(2450, __c153, 2) as any as S.Schema<DescribeMatchmakingOutput>,
  errors: [InternalServiceException, InvalidRequestException, UnsupportedRegionException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMatchmaking",
}));

export type DescribeMatchmakingConfigurationsError =
  | InternalServiceException
  | InvalidRequestException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves the details of FlexMatch matchmaking configurations.
 *
 * This operation offers the following options: (1) retrieve all matchmaking
 * configurations, (2) retrieve configurations for a specified list, or (3) retrieve all
 * configurations that use a specified rule set name. When requesting multiple items, use
 * the pagination parameters to retrieve results as a set of sequential pages.
 *
 * If successful, a configuration is returned for each requested name. When specifying a
 * list of names, only configurations that currently exist are returned.
 *
 * **Learn more**
 *
 * Setting up FlexMatch matchmakers
 */
export const describeMatchmakingConfigurations: API.PaginatedOperationMethod<
  DescribeMatchmakingConfigurationsInput,
  DescribeMatchmakingConfigurationsOutput,
  DescribeMatchmakingConfigurationsError,
  Credentials | HttpClient.HttpClient,
  MatchmakingConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2480, __c155, 0) as any as S.Schema<DescribeMatchmakingConfigurationsInput>,
  output: __S(2482, __c155, 2) as any as S.Schema<DescribeMatchmakingConfigurationsOutput>,
  errors: [InternalServiceException, InvalidRequestException, UnsupportedRegionException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMatchmakingConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Configurations",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeMatchmakingRuleSetsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves the details for FlexMatch matchmaking rule sets. You can request all existing
 * rule sets for the Region, or provide a list of one or more rule set names. When
 * requesting multiple items, use the pagination parameters to retrieve results as a set of
 * sequential pages. If successful, a rule set is returned for each requested name.
 *
 * **Learn more**
 *
 * - Build a rule
 * set
 */
export const describeMatchmakingRuleSets: API.PaginatedOperationMethod<
  DescribeMatchmakingRuleSetsInput,
  DescribeMatchmakingRuleSetsOutput,
  DescribeMatchmakingRuleSetsError,
  Credentials | HttpClient.HttpClient,
  MatchmakingRuleSet
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2496, __c156, 0) as any as S.Schema<DescribeMatchmakingRuleSetsInput>,
  output: __S(2498, __c156, 2) as any as S.Schema<DescribeMatchmakingRuleSetsOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMatchmakingRuleSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RuleSets",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribePlayerSessionsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves properties for one or more player sessions.
 *
 * This action can be used in the following ways:
 *
 * - To retrieve a specific player session, provide the player session ID
 * only.
 *
 * - To retrieve all player sessions in a game session, provide the game session ID
 * only.
 *
 * - To retrieve all player sessions for a specific player, provide a player ID
 * only.
 *
 * To request player sessions, specify either a player session ID, game session ID, or
 * player ID. You can filter this request by player session status. If you provide
 * a specific `PlayerSessionId` or `PlayerId`, Amazon GameLift Servers ignores the filter criteria.
 * Use the pagination parameters to retrieve results as a set of sequential pages.
 *
 * If successful, a `PlayerSession` object is returned for each session that
 * matches the request.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const describePlayerSessions: API.PaginatedOperationMethod<
  DescribePlayerSessionsInput,
  DescribePlayerSessionsOutput,
  DescribePlayerSessionsError,
  Credentials | HttpClient.HttpClient,
  PlayerSession
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2512, __c157, 0) as any as S.Schema<DescribePlayerSessionsInput>,
  output: __S(2513, __c157, 1) as any as S.Schema<DescribePlayerSessionsOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePlayerSessions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PlayerSessions",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeRuntimeConfigurationError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves a fleet's runtime configuration settings. The runtime configuration
 * determines which server processes run, and how, on computes in the fleet. For managed
 * EC2 fleets, the runtime configuration describes server processes that run on each fleet
 * instance. You can update a fleet's runtime configuration at any time using
 * UpdateRuntimeConfiguration.
 *
 * To get the current runtime configuration for a fleet, provide the fleet ID.
 *
 * If successful, a `RuntimeConfiguration` object is returned for the
 * requested fleet. If the requested fleet has been deleted, the result set is
 * empty.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 *
 * Running multiple
 * processes on a fleet
 */
export const describeRuntimeConfiguration: API.OperationMethod<
  DescribeRuntimeConfigurationInput,
  DescribeRuntimeConfigurationOutput,
  DescribeRuntimeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2528, __c158, 0) as any as S.Schema<DescribeRuntimeConfigurationInput>,
  output: __S(2544, __c159, 0) as any as S.Schema<DescribeRuntimeConfigurationOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRuntimeConfiguration",
}));

export type DescribeScalingPoliciesError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Container
 *
 * Retrieves all scaling policies applied to a fleet.
 *
 * To get a fleet's scaling policies, specify the fleet ID. You can filter this request
 * by policy status, such as to retrieve only active scaling policies. Use the pagination
 * parameters to retrieve results as a set of sequential pages. If successful, set of
 * `ScalingPolicy` objects is returned for the fleet.
 *
 * A fleet may have all of its scaling policies suspended. This operation does not affect
 * the status of the scaling policies, which remains ACTIVE.
 */
export const describeScalingPolicies: API.PaginatedOperationMethod<
  DescribeScalingPoliciesInput,
  DescribeScalingPoliciesOutput,
  DescribeScalingPoliciesError,
  Credentials | HttpClient.HttpClient,
  ScalingPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2560, __c160, 0) as any as S.Schema<DescribeScalingPoliciesInput>,
  output: __S(2563, __c160, 3) as any as S.Schema<DescribeScalingPoliciesOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScalingPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScalingPolicies",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeScriptError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves properties for a Realtime script.
 *
 * To request a script record, specify the script ID. If successful, an object containing
 * the script properties is returned.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers Amazon GameLift Servers Realtime
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const describeScript: API.OperationMethod<
  DescribeScriptInput,
  DescribeScriptOutput,
  DescribeScriptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2576, __c161, 0) as any as S.Schema<DescribeScriptInput>,
  output: __S(1536, __c96, 0) as any as S.Schema<DescribeScriptOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScript",
}));

export type DescribeVpcPeeringAuthorizationsError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves valid VPC peering authorizations that are pending for the Amazon Web Services account.
 * This operation returns all VPC peering authorizations and requests for peering. This
 * includes those initiated and received by this account.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const describeVpcPeeringAuthorizations: API.OperationMethod<
  DescribeVpcPeeringAuthorizationsInput,
  DescribeVpcPeeringAuthorizationsOutput,
  DescribeVpcPeeringAuthorizationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2592, __c162, 0) as any as S.Schema<DescribeVpcPeeringAuthorizationsInput>,
  output: __S(2594, __c162, 2) as any as S.Schema<DescribeVpcPeeringAuthorizationsOutput>,
  errors: [InternalServiceException, InvalidRequestException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVpcPeeringAuthorizations",
}));

export type DescribeVpcPeeringConnectionsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves information on VPC peering connections. Use this operation to get peering
 * information for all fleets or for one specific fleet ID.
 *
 * To retrieve connection information, call this operation from the Amazon Web Services account that is
 * used to manage the Amazon GameLift Servers fleets. Specify a fleet ID or leave the parameter empty to
 * retrieve all connection records. If successful, the retrieved information includes both
 * active and pending connections. Active connections identify the IpV4 CIDR block that the
 * VPC uses to connect.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const describeVpcPeeringConnections: API.OperationMethod<
  DescribeVpcPeeringConnectionsInput,
  DescribeVpcPeeringConnectionsOutput,
  DescribeVpcPeeringConnectionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2608, __c163, 0) as any as S.Schema<DescribeVpcPeeringConnectionsInput>,
  output: __S(2612, __c163, 4) as any as S.Schema<DescribeVpcPeeringConnectionsOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVpcPeeringConnections",
}));

export type GetComputeAccessError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Container
 *
 * Requests authorization to remotely connect to a hosting resource in a Amazon GameLift Servers managed
 * fleet. This operation is not used with Amazon GameLift Servers Anywhere fleets.
 *
 * **Request options**
 *
 * Provide the fleet ID and compute name. The compute name varies depending on the type
 * of fleet.
 *
 * - For a compute in a managed EC2 fleet, provide an instance ID. Each instance in
 * the fleet is a compute.
 *
 * - For a compute in a managed container fleet, provide a compute name. In a
 * container fleet, each game server container group on a fleet instance is
 * assigned a compute name.
 *
 * **Results**
 *
 * If successful, this operation returns a set of temporary Amazon Web Services credentials, including
 * a two-part access key and a session token.
 *
 * - With a managed EC2 fleet (where compute type is `EC2`), use these
 * credentials with Amazon EC2 Systems Manager (SSM) to start a session with the compute. For more
 * details, see Starting a session (CLI) in the Amazon EC2 Systems Manager User
 * Guide.
 */
export const getComputeAccess: API.OperationMethod<
  GetComputeAccessInput,
  GetComputeAccessOutput,
  GetComputeAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2624, __c164, 0) as any as S.Schema<GetComputeAccessInput>,
  output: __S(2625, __c164, 1) as any as S.Schema<GetComputeAccessOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComputeAccess",
}));

export type GetComputeAuthTokenError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Requests an authentication token from Amazon GameLift Servers for a compute resource in an Amazon GameLift Servers
 * fleet. Game servers that are running on the compute use this token to communicate
 * with the Amazon GameLift Servers service, such as when calling the Amazon GameLift Servers server SDK action
 * `InitSDK()`. Authentication tokens are valid for a limited time span, so
 * you need to request a fresh token before the current token expires.
 *
 * **Request options**
 *
 * - For managed EC2 fleets (compute type `EC2`), auth token retrieval
 * and refresh is handled automatically. All game servers that are running on all
 * fleet instances have access to a valid auth token.
 *
 * - For Anywhere fleets (compute type `ANYWHERE`), if you're using the
 * Amazon GameLift Servers Agent, auth token retrieval and refresh is handled automatically for any
 * compute where the Agent is running. If you're not using
 * the Agent, create a mechanism to retrieve and refresh auth tokens for computes
 * that are running game server processes.
 *
 * **Learn more**
 *
 * - Create an
 * Anywhere fleet
 *
 * - Test your
 * integration
 *
 * - Server SDK
 * reference guides (for version 5.x)
 */
export const getComputeAuthToken: API.OperationMethod<
  GetComputeAuthTokenInput,
  GetComputeAuthTokenOutput,
  GetComputeAuthTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2640, __c165, 0) as any as S.Schema<GetComputeAuthTokenInput>,
  output: __S(2641, __c165, 1) as any as S.Schema<GetComputeAuthTokenOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComputeAuthToken",
}));

export type GetGameSessionLogUrlError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves the location of stored game session logs for a specified game session on
 * Amazon GameLift Servers managed fleets. When a game session is terminated, Amazon GameLift Servers automatically stores
 * the logs in Amazon S3 and retains them for 14 days. Use this URL to download the logs.
 *
 * See the Amazon Web Services Service
 * Limits page for maximum log file sizes. Log files that exceed this limit
 * are not saved.
 *
 * All APIs by task
 */
export const getGameSessionLogUrl: API.OperationMethod<
  GetGameSessionLogUrlInput,
  GetGameSessionLogUrlOutput,
  GetGameSessionLogUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2656, __c166, 0) as any as S.Schema<GetGameSessionLogUrlInput>,
  output: __S(2657, __c166, 1) as any as S.Schema<GetGameSessionLogUrlOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGameSessionLogUrl",
}));

export type GetInstanceAccessError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Requests authorization to remotely connect to an instance in an Amazon GameLift Servers managed fleet.
 * Use this operation to connect to instances with game servers that use Amazon GameLift Servers server SDK
 * 4.x or earlier. To connect to instances with game servers that use server SDK 5.x or
 * later, call https://docs.aws.amazon.com/gamelift/latest/apireference/API_GetComputeAccess.
 *
 * To request access to an instance, specify IDs for the instance and the fleet it
 * belongs to. You can retrieve instance IDs for a fleet by calling DescribeInstances with the fleet ID.
 *
 * If successful, this operation returns an IP address and credentials. The returned
 * credentials match the operating system of the instance, as follows:
 *
 * - For a Windows instance: returns a user name and secret (password) for use with
 * a Windows Remote Desktop client.
 *
 * - For a Linux instance: returns a user name and secret (RSA private key) for use
 * with an SSH client. You must save the secret to a `.pem` file. If
 * you're using the CLI, see the example Get credentials for a Linux instance for tips on automatically
 * saving the secret to a `.pem` file.
 *
 * **Learn more**
 *
 * Remotely connect to
 * fleet instances
 *
 * Debug fleet
 * issues
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const getInstanceAccess: API.OperationMethod<
  GetInstanceAccessInput,
  GetInstanceAccessOutput,
  GetInstanceAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2672, __c167, 0) as any as S.Schema<GetInstanceAccessInput>,
  output: __S(2675, __c167, 3) as any as S.Schema<GetInstanceAccessOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceAccess",
}));

export type GetPlayerConnectionDetailsError =
  | InternalServiceException
  | InvalidGameSessionStatusException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (server SDK 5.x or later), Container
 *
 * Retrieves connection details for game clients to connect to game sessions.
 *
 * **Player gateway benefits:** DDoS protection with negligible impact to latency.
 *
 * To enable player gateway on your fleet, set `PlayerGatewayMode` to `ENABLED` or `REQUIRED` when calling
 * CreateFleet or
 * CreateContainerFleet.
 *
 * **How to use:** After creating a game session and adding players, call this operation with the game session ID and player IDs. When player gateway is enabled, the response includes connection endpoints and player gateway tokens that your game clients can use to connect to the game session through player gateway. To learn more about player gateway integration, see DDoS protection with Amazon GameLift Servers player gateway.
 *
 * When player gateway is disabled or in locations where player gateway is not supported, this operation returns game server connection information without player gateway tokens, so that your game clients directly connect to the game server endpoint.
 */
export const getPlayerConnectionDetails: API.OperationMethod<
  GetPlayerConnectionDetailsInput,
  GetPlayerConnectionDetailsOutput,
  GetPlayerConnectionDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2688, __c168, 0) as any as S.Schema<GetPlayerConnectionDetailsInput>,
  output: __S(2693, __c168, 5) as any as S.Schema<GetPlayerConnectionDetailsOutput>,
  errors: [
    InternalServiceException,
    InvalidGameSessionStatusException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlayerConnectionDetails",
}));

export type ListAliasesError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves all aliases for this Amazon Web Services account. You can filter the result set by alias
 * name and/or routing strategy type. Use the pagination parameters to retrieve results in
 * sequential pages.
 *
 * Returned aliases are not listed in any particular order.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const listAliases: API.PaginatedOperationMethod<
  ListAliasesInput,
  ListAliasesOutput,
  ListAliasesError,
  Credentials | HttpClient.HttpClient,
  Alias
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2704, __c169, 0) as any as S.Schema<ListAliasesInput>,
  output: __S(2706, __c169, 2) as any as S.Schema<ListAliasesOutput>,
  errors: [InternalServiceException, InvalidRequestException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAliases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Aliases",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListBuildsError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves build resources for all builds associated with the Amazon Web Services account in use. You
 * can limit results to builds that are in a specific status by using the
 * `Status` parameter. Use the pagination parameters to retrieve results in
 *
 * Build resources are not listed in any particular order.
 *
 * **Learn more**
 *
 * Upload a Custom
 * Server Build
 *
 * All APIs by task
 */
export const listBuilds: API.PaginatedOperationMethod<
  ListBuildsInput,
  ListBuildsOutput,
  ListBuildsError,
  Credentials | HttpClient.HttpClient,
  Build
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2720, __c170, 0) as any as S.Schema<ListBuildsInput>,
  output: __S(2722, __c170, 2) as any as S.Schema<ListBuildsOutput>,
  errors: [InternalServiceException, InvalidRequestException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBuilds",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Builds",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListComputeError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves information on the compute resources in an Amazon GameLift Servers fleet. Use the pagination
 * parameters to retrieve results in a set of sequential pages.
 *
 * **Request options**
 *
 * - Retrieve a list of all computes in a fleet. Specify a fleet ID.
 *
 * - Retrieve a list of all computes in a specific fleet location. Specify a fleet
 * ID and location.
 *
 * **Results**
 *
 * If successful, this operation returns information on a set of computes. Depending on
 * the type of fleet, the result includes the following information:
 *
 * - For a managed EC2 fleet (compute type `EC2`), this operation
 * returns information about the EC2 instance. Compute names are EC2 instance
 * IDs.
 *
 * - For an Anywhere fleet (compute type `ANYWHERE`), this operation
 * returns compute names and details from when the compute was registered with
 * `RegisterCompute`. This includes
 * `GameLiftServiceSdkEndpoint` or
 * `GameLiftAgentEndpoint`.
 */
export const listCompute: API.PaginatedOperationMethod<
  ListComputeInput,
  ListComputeOutput,
  ListComputeError,
  Credentials | HttpClient.HttpClient,
  Compute
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2736, __c171, 0) as any as S.Schema<ListComputeInput>,
  output: __S(2738, __c171, 2) as any as S.Schema<ListComputeOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCompute",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ComputeList",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListContainerFleetsError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Retrieves a collection of container fleet resources in an Amazon Web Services Region. For fleets
 * that have multiple locations, this operation retrieves fleets based on their home Region
 * only.
 *
 * **Request options**
 *
 * - Get a list of all fleets. Call this operation without specifying a container
 * group definition.
 *
 * - Get a list of fleets filtered by container group definition. Provide the
 * container group definition name or ARN value.
 *
 * - To get a list of all Amazon GameLift Servers Realtime fleets with a specific configuration script,
 * provide the script ID.
 *
 * Use the pagination parameters to retrieve results as a set of sequential pages.
 *
 * If successful, this operation returns a collection of container fleets that match the request
 * parameters. A NextToken value is also returned if there are more result pages to
 * retrieve.
 *
 * Fleet IDs are returned in no particular order.
 */
export const listContainerFleets: API.PaginatedOperationMethod<
  ListContainerFleetsInput,
  ListContainerFleetsOutput,
  ListContainerFleetsError,
  Credentials | HttpClient.HttpClient,
  ContainerFleet
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2752, __c172, 0) as any as S.Schema<ListContainerFleetsInput>,
  output: __S(2754, __c172, 2) as any as S.Schema<ListContainerFleetsOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContainerFleets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ContainerFleets",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListContainerGroupDefinitionsError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Retrieves container group definitions for the Amazon Web Services account and Amazon Web Services Region. Use the pagination parameters to retrieve results in a set of sequential
 * pages.
 *
 * This operation returns only the latest version of each definition. To retrieve all
 * versions of a container group definition, use ListContainerGroupDefinitionVersions.
 *
 * **Request options:**
 *
 * - Retrieve the most recent versions of all container group definitions.
 *
 * - Retrieve the most recent versions of all container group definitions, filtered by
 * type. Specify the container group type to filter on.
 *
 * **Results:**
 *
 * If successful, this operation returns the complete properties of a set of container group
 * definition versions that match the request.
 *
 * This operation returns the list of container group definitions in no particular order.
 */
export const listContainerGroupDefinitions: API.PaginatedOperationMethod<
  ListContainerGroupDefinitionsInput,
  ListContainerGroupDefinitionsOutput,
  ListContainerGroupDefinitionsError,
  Credentials | HttpClient.HttpClient,
  ContainerGroupDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2768, __c173, 0) as any as S.Schema<ListContainerGroupDefinitionsInput>,
  output: __S(2785, __c174, 1) as any as S.Schema<ListContainerGroupDefinitionsOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContainerGroupDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ContainerGroupDefinitions",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListContainerGroupDefinitionVersionsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Retrieves all versions of a container group definition. Use the pagination parameters to
 * retrieve results in a set of sequential pages.
 *
 * **Request options:**
 *
 * - Get all versions of a specified container group definition. Specify the container
 * group definition name or ARN value. (If the ARN value has a version number, it's
 * ignored.)
 *
 * **Results:**
 *
 * If successful, this operation returns the complete properties of a set of container group
 * definition versions that match the request.
 *
 * This operation returns the list of container group definitions in descending version
 * order (latest first).
 *
 * **Learn more**
 *
 * - Manage a container group definition
 */
export const listContainerGroupDefinitionVersions: API.PaginatedOperationMethod<
  ListContainerGroupDefinitionVersionsInput,
  ListContainerGroupDefinitionVersionsOutput,
  ListContainerGroupDefinitionVersionsError,
  Credentials | HttpClient.HttpClient,
  ContainerGroupDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2800, __c175, 0) as any as S.Schema<ListContainerGroupDefinitionVersionsInput>,
  output: __S(2785, __c174, 1) as any as S.Schema<ListContainerGroupDefinitionVersionsOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContainerGroupDefinitionVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ContainerGroupDefinitions",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListFleetDeploymentsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Retrieves a collection of container fleet deployments in an Amazon Web Services Region. Use the
 * pagination parameters to retrieve results as a set of sequential pages.
 *
 * **Request options**
 *
 * - Get a list of all deployments. Call this operation without specifying a fleet ID.
 *
 * - Get a list of all deployments for a fleet. Specify the container fleet ID or ARN value.
 *
 * **Results**
 *
 * If successful, this operation returns a list of deployments that match the request
 * parameters. A NextToken value is also returned if there are more result pages to
 * retrieve.
 *
 * Deployments are returned starting with the latest.
 */
export const listFleetDeployments: API.PaginatedOperationMethod<
  ListFleetDeploymentsInput,
  ListFleetDeploymentsOutput,
  ListFleetDeploymentsError,
  Credentials | HttpClient.HttpClient,
  FleetDeployment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2816, __c176, 0) as any as S.Schema<ListFleetDeploymentsInput>,
  output: __S(2818, __c176, 2) as any as S.Schema<ListFleetDeploymentsOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFleetDeployments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FleetDeployments",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListFleetsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves a collection of fleet resources in an Amazon Web Services Region. You can filter the
 * result set to find only those fleets that are deployed with a specific build or script.
 * For fleets that have multiple locations, this operation retrieves fleets based on their
 * home Region only.
 *
 * You can use operation in the following ways:
 *
 * - To get a list of all fleets in a Region, don't provide a build or script
 * identifier.
 *
 * - To get a list of all fleets where a specific game build is deployed, provide
 * the build ID.
 *
 * - To get a list of all Amazon GameLift Servers Realtime fleets with a specific configuration script,
 * provide the script ID.
 *
 * Use the pagination parameters to retrieve results as a set of sequential pages.
 *
 * If successful, this operation returns a list of fleet IDs that match the request
 * parameters. A NextToken value is also returned if there are more result pages to
 * retrieve.
 *
 * Fleet IDs are returned in no particular order.
 */
export const listFleets: API.PaginatedOperationMethod<
  ListFleetsInput,
  ListFleetsOutput,
  ListFleetsError,
  Credentials | HttpClient.HttpClient,
  FleetId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2832, __c177, 0) as any as S.Schema<ListFleetsInput>,
  output: __S(2833, __c177, 1) as any as S.Schema<ListFleetsOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFleets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FleetIds",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListGameServerGroupsError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Lists a game server groups.
 */
export const listGameServerGroups: API.PaginatedOperationMethod<
  ListGameServerGroupsInput,
  ListGameServerGroupsOutput,
  ListGameServerGroupsError,
  Credentials | HttpClient.HttpClient,
  GameServerGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2848, __c178, 0) as any as S.Schema<ListGameServerGroupsInput>,
  output: __S(2850, __c178, 2) as any as S.Schema<ListGameServerGroupsOutput>,
  errors: [InternalServiceException, InvalidRequestException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGameServerGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GameServerGroups",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListGameServersError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Retrieves information on all game
 * servers that are currently active in a specified game server group. You can opt to sort
 * the list by game server age. Use the pagination parameters to retrieve results in a set
 * of sequential segments.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const listGameServers: API.PaginatedOperationMethod<
  ListGameServersInput,
  ListGameServersOutput,
  ListGameServersError,
  Credentials | HttpClient.HttpClient,
  GameServer
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2864, __c179, 0) as any as S.Schema<ListGameServersInput>,
  output: __S(2866, __c179, 2) as any as S.Schema<ListGameServersOutput>,
  errors: [InternalServiceException, InvalidRequestException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGameServers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GameServers",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListLocationsError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Lists all custom and Amazon Web Services locations where Amazon GameLift Servers can host game servers.
 * This operation also returns UDP ping beacon information for
 * locations, which you can use to measure network latency between player devices
 * and potential hosting locations.
 *
 * **Learn more**
 *
 * Service locations
 */
export const listLocations: API.PaginatedOperationMethod<
  ListLocationsInput,
  ListLocationsOutput,
  ListLocationsError,
  Credentials | HttpClient.HttpClient,
  LocationModel
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<ListLocationsInput>,
  output: __S(2, __c0, 2) as any as S.Schema<ListLocationsOutput>,
  errors: [InternalServiceException, InvalidRequestException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLocations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Locations",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListScriptsError =
  | InternalServiceException
  | InvalidRequestException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves script records for all Realtime scripts that are associated with the Amazon Web Services
 * account in use.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers Amazon GameLift Servers Realtime
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const listScripts: API.PaginatedOperationMethod<
  ListScriptsInput,
  ListScriptsOutput,
  ListScriptsError,
  Credentials | HttpClient.HttpClient,
  Script
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<ListScriptsInput>,
  output: __S(18, __c1, 2) as any as S.Schema<ListScriptsOutput>,
  errors: [InternalServiceException, InvalidRequestException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScripts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Scripts",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves all tags assigned to a Amazon GameLift Servers resource. Use resource tags to organize Amazon Web Services
 * resources for a range of purposes. This operation handles the permissions necessary to
 * manage tags for Amazon GameLift Servers resources that support tagging.
 *
 * To list tags for a resource, specify the unique ARN value for the resource.
 *
 * **Learn more**
 *
 * Tagging Amazon Web Services
 * Resources in the *Amazon Web Services General Reference*
 *
 * Amazon Web Services Tagging Strategies
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(33, __c2, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutScalingPolicyError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Container
 *
 * Creates or updates a scaling policy for a fleet. Scaling policies are used to
 * automatically scale a fleet's hosting capacity to meet player demand. An active scaling
 * policy instructs Amazon GameLift Servers to track a fleet metric and automatically change the fleet's
 * capacity when a certain threshold is reached. There are two types of scaling policies:
 * target-based and rule-based. Use a target-based policy to quickly and efficiently manage
 * fleet scaling; this option is the most commonly used. Use rule-based policies when you
 * need to exert fine-grained control over auto-scaling.
 *
 * Fleets can have multiple scaling policies of each type in force at the same time; you
 * can have one target-based policy, one or multiple rule-based scaling policies, or both.
 * We recommend caution, however, because multiple auto-scaling policies can have
 * unintended consequences.
 *
 * Learn more about how to work with auto-scaling in Set Up Fleet Automatic
 * Scaling.
 *
 * **Target-based policy**
 *
 * A target-based policy tracks a single metric: PercentAvailableGameSessions. This
 * metric tells us how much of a fleet's hosting capacity is ready to host game sessions
 * but is not currently in use. This is the fleet's buffer; it measures the additional
 * player demand that the fleet could handle at current capacity. With a target-based
 * policy, you set your ideal buffer size and leave it to Amazon GameLift Servers to take whatever action is
 * needed to maintain that target.
 *
 * For example, you might choose to maintain a 10% buffer for a fleet that has the
 * capacity to host 100 simultaneous game sessions. This policy tells Amazon GameLift Servers to take action
 * whenever the fleet's available capacity falls below or rises above 10 game sessions.
 * Amazon GameLift Servers will start new instances or stop unused instances in order to return to the 10%
 * buffer.
 *
 * To create or update a target-based policy, specify a fleet ID and name, and set the
 * policy type to "TargetBased". Specify the metric to track (PercentAvailableGameSessions)
 * and reference a `TargetConfiguration` object with your desired buffer value.
 * Exclude all other parameters. On a successful request, the policy name is returned. The
 * scaling policy is automatically in force as soon as it's successfully created. If the
 * fleet's auto-scaling actions are temporarily suspended, the new policy will be in force
 * once the fleet actions are restarted.
 *
 * **Rule-based policy**
 *
 * A rule-based policy tracks specified fleet metric, sets a threshold value, and
 * specifies the type of action to initiate when triggered. With a rule-based policy, you
 * can select from several available fleet metrics. Each policy specifies whether to scale
 * up or scale down (and by how much), so you need one policy for each type of action.
 *
 * For example, a policy may make the following statement: "If the percentage of idle
 * instances is greater than 20% for more than 15 minutes, then reduce the fleet capacity
 * by 10%."
 *
 * A policy's rule statement has the following structure:
 *
 * If `[MetricName]` is `[ComparisonOperator]`
 * `[Threshold]` for `[EvaluationPeriods]` minutes, then
 * `[ScalingAdjustmentType]` to/by `[ScalingAdjustment]`.
 *
 * To implement the example, the rule statement would look like this:
 *
 * If `[PercentIdleInstances]` is `[GreaterThanThreshold]`
 * `[20]` for `[15]` minutes, then
 * `[PercentChangeInCapacity]` to/by `[10]`.
 *
 * To create or update a scaling policy, specify a unique combination of name and fleet
 * ID, and set the policy type to "RuleBased". Specify the parameter values for a policy
 * rule statement. On a successful request, the policy name is returned. Scaling policies
 * are automatically in force as soon as they're successfully created. If the fleet's
 * auto-scaling actions are temporarily suspended, the new policy will be in force once the
 * fleet actions are restarted.
 */
export const putScalingPolicy: API.OperationMethod<
  PutScalingPolicyInput,
  PutScalingPolicyOutput,
  PutScalingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<PutScalingPolicyInput>,
  output: __S(49, __c3, 1) as any as S.Schema<PutScalingPolicyOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutScalingPolicy",
}));

export type RegisterComputeError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | NotReadyException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Anywhere
 *
 * Registers a compute resource in an Amazon GameLift Servers Anywhere fleet.
 *
 * For an Anywhere fleet that's running the Amazon GameLift Servers Agent, the Agent
 * handles all compute registry tasks for you. For an Anywhere fleet that doesn't use the
 * Agent, call this operation to register fleet computes.
 *
 * To register a compute, give the compute a name (must be unique within the
 * fleet) and specify the compute resource's DNS name or IP address. Provide a
 * fleet ID and a fleet location to associate with the compute being registered. You can
 * optionally include the path to a TLS certificate on the compute resource.
 *
 * If successful, this operation returns compute details, including an Amazon GameLift Servers SDK
 * endpoint or Agent endpoint. Game server processes running on the compute can use this
 * endpoint to communicate with the Amazon GameLift Servers service. Each server process includes the SDK
 * endpoint in its call to the Amazon GameLift Servers server SDK action `InitSDK()`.
 *
 * To view compute details, call DescribeCompute with the compute name.
 *
 * **Learn more**
 *
 * - Create an
 * Anywhere fleet
 *
 * - Test your
 * integration
 *
 * - Server SDK
 * reference guides (for version 5.x)
 */
export const registerCompute: API.OperationMethod<
  RegisterComputeInput,
  RegisterComputeOutput,
  RegisterComputeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<RegisterComputeInput>,
  output: __S(1936, __c121, 0) as any as S.Schema<RegisterComputeOutput>,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    NotReadyException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterCompute",
}));

export type RegisterGameServerError =
  | ConflictException
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Creates a new game server
 * resource and notifies Amazon GameLift Servers FleetIQ that the game server is ready to host gameplay and players.
 * This operation is called by a game server process that is running on an instance in a
 * game server group. Registering game servers enables Amazon GameLift Servers FleetIQ to track available game
 * servers and enables game clients and services to claim a game server for a new game
 * session.
 *
 * To register a game server, identify the game server group and instance where the game
 * server is running, and provide a unique identifier for the game server. You can also
 * include connection and game server data.
 *
 * Once a game server is successfully registered, it is put in status
 * `AVAILABLE`. A request to register a game server may fail if the instance
 * it is running on is in the process of shutting down as part of instance balancing or
 * scale-down activity.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const registerGameServer: API.OperationMethod<
  RegisterGameServerInput,
  RegisterGameServerOutput,
  RegisterGameServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<RegisterGameServerInput>,
  output: __S(688, __c43, 0) as any as S.Schema<RegisterGameServerOutput>,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterGameServer",
}));

export type RequestUploadCredentialsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Retrieves a fresh set of credentials for use when uploading a new set of game build
 * files to Amazon GameLift Servers's Amazon S3. This is done as part of the build creation process; see
 * CreateBuild.
 *
 * To request new credentials, specify the build ID as returned with an initial
 * `CreateBuild` request. If successful, a new set of credentials are
 * returned, along with the S3 storage location associated with the build ID.
 *
 * **Learn more**
 *
 * Create a Build with Files in S3
 *
 * All APIs by task
 */
export const requestUploadCredentials: API.OperationMethod<
  RequestUploadCredentialsInput,
  RequestUploadCredentialsOutput,
  RequestUploadCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<RequestUploadCredentialsInput>,
  output: __S(97, __c6, 1) as any as S.Schema<RequestUploadCredentialsOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RequestUploadCredentials",
}));

export type ResolveAliasError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TerminalRoutingStrategyException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Attempts to retrieve a fleet ID that is associated with an alias. Specify a unique
 * alias identifier.
 *
 * If the alias has a `SIMPLE` routing strategy, Amazon GameLift Servers returns a fleet ID.
 * If the alias has a `TERMINAL` routing strategy, the result is a
 * `TerminalRoutingStrategyException`.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const resolveAlias: API.OperationMethod<
  ResolveAliasInput,
  ResolveAliasOutput,
  ResolveAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<ResolveAliasInput>,
  output: __S(128, __c8, 0) as any as S.Schema<ResolveAliasOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TerminalRoutingStrategyException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResolveAlias",
}));

export type ResumeGameServerGroupError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Reinstates activity on a game
 * server group after it has been suspended. A game server group might be suspended by the
 * SuspendGameServerGroup operation, or it might be suspended involuntarily
 * due to a configuration problem. In the second case, you can manually resume activity on
 * the group once the configuration problem has been resolved. Refer to the game server
 * group status and status reason for more information on why group activity is
 * suspended.
 *
 * To resume activity, specify a game server group ARN and the type of activity to be
 * resumed. If successful, a `GameServerGroup` object is returned showing that
 * the resumed activity is no longer listed in `SuspendedActions`.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const resumeGameServerGroup: API.OperationMethod<
  ResumeGameServerGroupInput,
  ResumeGameServerGroupOutput,
  ResumeGameServerGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<ResumeGameServerGroupInput>,
  output: __S(1168, __c73, 0) as any as S.Schema<ResumeGameServerGroupOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeGameServerGroup",
}));

export type SearchGameSessionsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TerminalRoutingStrategyException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Retrieves all active game sessions that match a set of search criteria and sorts them
 * into a specified order.
 *
 * This operation is not designed to continually track game session status because that practice can cause you to exceed your API limit and generate errors. Instead, configure an Amazon Simple Notification Service (Amazon SNS) topic to receive notifications from a matchmaker or a game session placement queue.
 *
 * When searching for game sessions, you specify exactly where you want to search and
 * provide a search filter expression, a sort expression, or both. A search request can
 * search only one fleet, but it can search all of a fleet's locations.
 *
 * This operation can be used in the following ways:
 *
 * - To search all game sessions that are currently running on all locations in a
 * fleet, provide a fleet or alias ID. This approach returns game sessions in the
 * fleet's home Region and all remote locations that fit the search
 * criteria.
 *
 * - To search all game sessions that are currently running on a specific fleet
 * location, provide a fleet or alias ID and a location name. For location, you can
 * specify a fleet's home Region or any remote location.
 *
 * Use the pagination parameters to retrieve results as a set of sequential pages.
 *
 * If successful, a `GameSession` object is returned for each game session
 * that matches the request. Search finds game sessions that are in `ACTIVE`
 * status only. To retrieve information on game sessions in other statuses, use DescribeGameSessions.
 *
 * To set search and sort criteria, create a filter expression using the following game session attributes. For game session search examples, see the Examples section of this topic.
 *
 * - **gameSessionId** -- An identifier for the game session that is unique across all regions. You must use the
 * full ARN value.
 *
 * - **gameSessionName** -- Name assigned to a game
 * session. Game session names do not need to be unique to a game session.
 *
 * - **gameSessionProperties** -- A set of key-value pairs that can store custom data in a game session.
 * For example: `{"Key": "difficulty", "Value": "novice"}`.
 * The filter expression must specify the https://docs.aws.amazon.com/gamelift/latest/apireference/API_GameProperty -- a `Key` and a string `Value` to search for the game sessions.
 *
 * For example, to search for the above key-value pair, specify the following search filter: `gameSessionProperties.difficulty = "novice"`.
 * All game property values are searched as strings.
 *
 * For examples of searching game sessions, see the ones below, and also see Search game sessions by game property.
 *
 * - Avoid using periods (".") in property keys if you plan to search for game sessions by properties. Property keys containing periods cannot be searched and will be filtered out from search results due to search index limitations.
 *
 * - If you use SearchGameSessions API, there is a limit of 500 game property keys across all game sessions and all fleets per region. If the limit is exceeded, there will potentially be game session entries missing from SearchGameSessions API results.
 *
 * - **maximumSessions** -- Maximum number of player
 * sessions allowed for a game session.
 *
 * - **creationTimeMillis** -- Value indicating when a
 * game session was created. It is expressed in Unix time as milliseconds.
 *
 * - **playerSessionCount** -- Number of players
 * currently connected to a game session. This value changes rapidly as players
 * join the session or drop out.
 *
 * - **hasAvailablePlayerSessions** -- Boolean value
 * indicating whether a game session has reached its maximum number of players. It
 * is highly recommended that all search requests include this filter attribute to
 * optimize search performance and return only sessions that players can join.
 *
 * Returned values for `playerSessionCount` and
 * `hasAvailablePlayerSessions` change quickly as players join sessions
 * and others drop out. Results should be considered a snapshot in time. Be sure to
 * refresh search results often, and handle sessions that fill up before a player can
 * join.
 *
 * All APIs by task
 */
export const searchGameSessions: API.PaginatedOperationMethod<
  SearchGameSessionsInput,
  SearchGameSessionsOutput,
  SearchGameSessionsError,
  Credentials | HttpClient.HttpClient,
  GameSession
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<SearchGameSessionsInput>,
  output: __S(2417, __c151, 1) as any as S.Schema<SearchGameSessionsOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TerminalRoutingStrategyException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchGameSessions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GameSessions",
    pageSize: "Limit",
  } as const,
})) as any;

export type StartFleetActionsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Container
 *
 * Resumes certain types of activity on fleet instances that were suspended with StopFleetActions. For multi-location fleets, fleet actions are managed
 * separately for each location. Currently, this operation is used to restart a fleet's
 * auto-scaling activity.
 *
 * This operation can be used in the following ways:
 *
 * - To restart actions on instances in the fleet's home Region, provide a fleet ID
 * and the type of actions to resume.
 *
 * - To restart actions on instances in one of the fleet's remote locations,
 * provide a fleet ID, a location name, and the type of actions to resume.
 *
 * If successful, Amazon GameLift Servers once again initiates scaling events as triggered by the fleet's
 * scaling policies. If actions on the fleet location were never stopped, this operation
 * will have no effect.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 */
export const startFleetActions: API.OperationMethod<
  StartFleetActionsInput,
  StartFleetActionsOutput,
  StartFleetActionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<StartFleetActionsInput>,
  output: __S(128, __c8, 0) as any as S.Schema<StartFleetActionsOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFleetActions",
}));

export type StartGameSessionPlacementError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Makes a request to start a new game session using a game session queue. When
 * processing a placement request, Amazon GameLift Servers looks for the best possible available resource to
 * host the game session, based on how the queue is configured to prioritize factors such
 * as resource cost, latency, and location. After selecting an available resource, Amazon GameLift Servers
 * prompts the resource to start a game session. A placement request can include a list of
 * players to create a set of player sessions. The request can also include information to
 * pass to the new game session, such as to specify a game map or other options.
 *
 * **Request options**
 *
 * Use this operation to make the following types of requests.
 *
 * - Request a placement using the queue's default prioritization process (see the
 * default prioritization described in PriorityConfiguration). Include these required parameters:
 *
 * - `GameSessionQueueName`
 *
 * - `MaximumPlayerSessionCount`
 *
 * - `PlacementID`
 *
 * - Request a placement and prioritize based on latency. Include these
 * parameters:
 *
 * - Required parameters `GameSessionQueueName`,
 * `MaximumPlayerSessionCount`,
 * `PlacementID`.
 *
 * - `PlayerLatencies`. Include a set of latency values for
 * destinations in the queue. When a request includes latency data, Amazon GameLift Servers
 * automatically reorder the queue's locations priority list based on
 * lowest available latency values. If a request includes latency data for
 * multiple players, Amazon GameLift Servers calculates each location's average latency for
 * all players and reorders to find the lowest latency across all players.
 *
 * - Don't include `PriorityConfigurationOverride`.
 *
 * - Prioritize based on a custom list of locations. If you're using a
 * queue that's configured to prioritize location first (see PriorityConfiguration for game session queues), you can
 * optionally use the *PriorityConfigurationOverride*
 * parameter to substitute a different location priority list for this
 * placement request. Amazon GameLift Servers searches each location on the priority
 * override list to find an available hosting resource for the new game
 * session. Specify a fallback strategy to use in the event that Amazon GameLift Servers
 * fails to place the game session in any of the locations on the override
 * list.
 *
 * - Request a placement and prioritized based on a custom list of locations.
 *
 * - You can request new player sessions for a group of players. Include the
 * *DesiredPlayerSessions* parameter and include at minimum
 * a unique player ID for each. You can also include player-specific data to pass
 * to the new game session.
 *
 * **Result**
 *
 * If successful, this operation generates a new game session placement request and adds
 * it to the game session queue for processing. You can track the status of individual
 * placement requests by calling DescribeGameSessionPlacement or by monitoring queue notifications. When the
 * request status is `FULFILLED`, a new game session has started and the
 * placement request is updated with connection information for the game session (IP
 * address and port). If the request included player session data, Amazon GameLift Servers creates a player
 * session for each player ID in the request.
 *
 * The request results in a `InvalidRequestException` in the following
 * situations:
 *
 * - If the request includes both *PlayerLatencies* and
 * *PriorityConfigurationOverride* parameters.
 *
 * - If the request includes the *PriorityConfigurationOverride*
 * parameter and specifies a queue that doesn't prioritize locations.
 *
 * Amazon GameLift Servers continues to retry each placement request until it reaches the queue's timeout
 * setting. If a request times out, you can resubmit the request to the same queue or try a
 * different queue.
 */
export const startGameSessionPlacement: API.OperationMethod<
  StartGameSessionPlacementInput,
  StartGameSessionPlacementOutput,
  StartGameSessionPlacementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(194, __c12, 2) as any as S.Schema<StartGameSessionPlacementInput>,
  output: __S(2356, __c147, 4) as any as S.Schema<StartGameSessionPlacementOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartGameSessionPlacement",
}));

export type StartMatchBackfillError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Finds new players to fill open slots in currently running game sessions. The backfill
 * match process is essentially identical to the process of forming new matches. Backfill
 * requests use the same matchmaker that was used to make the original match, and they
 * provide matchmaking data for all players currently in the game session. FlexMatch uses
 * this information to select new players so that backfilled match continues to meet the
 * original match requirements.
 *
 * When using FlexMatch with Amazon GameLift Servers managed hosting, you can request a backfill match from
 * a client service by calling this operation with a `GameSessions` ID. You also
 * have the option of making backfill requests directly from your game server. In response
 * to a request, FlexMatch creates player sessions for the new players, updates the
 * `GameSession` resource, and sends updated matchmaking data to the game
 * server. You can request a backfill match at any point after a game session is started.
 * Each game session can have only one active backfill request at a time; a subsequent
 * request automatically replaces the earlier request.
 *
 * When using FlexMatch as a standalone component, request a backfill match by calling this
 * operation without a game session identifier. As with newly formed matches, matchmaking
 * results are returned in a matchmaking event so that your game can update the game
 * session that is being backfilled.
 *
 * To request a backfill match, specify a unique ticket ID, the original matchmaking
 * configuration, and matchmaking data for all current players in the game session being
 * backfilled. Optionally, specify the `GameSession` ARN. If successful, a match
 * backfill ticket is created and returned with status set to QUEUED. Track the status of
 * backfill tickets using the same method for tracking tickets for new matches.
 *
 * Only game sessions created by FlexMatch are supported for match backfill.
 *
 * **Learn more**
 *
 * Backfill existing games with FlexMatch
 *
 * Matchmaking events (reference)
 *
 * How Amazon GameLift Servers FlexMatch works
 */
export const startMatchBackfill: API.OperationMethod<
  StartMatchBackfillInput,
  StartMatchBackfillOutput,
  StartMatchBackfillError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<StartMatchBackfillInput>,
  output: __S(224, __c14, 0) as any as S.Schema<StartMatchBackfillOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMatchBackfill",
}));

export type StartMatchmakingError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Uses FlexMatch to create a game match for a group of players based on custom matchmaking
 * rules. With games that use Amazon GameLift Servers managed hosting, this operation also triggers Amazon GameLift Servers
 * to find hosting resources and start a new game session for the new match. Each
 * matchmaking request includes information on one or more players and specifies the
 * FlexMatch matchmaker to use. When a request is for multiple players, FlexMatch attempts to
 * build a match that includes all players in the request, placing them in the same team
 * and finding additional players as needed to fill the match.
 *
 * To start matchmaking, provide a unique ticket ID, specify a matchmaking configuration,
 * and include the players to be matched. You must also include any player attributes that
 * are required by the matchmaking configuration's rule set. If successful, a matchmaking
 * ticket is returned with status set to `QUEUED`.
 *
 * Track matchmaking events to respond as needed and acquire game session connection
 * information for successfully completed matches. Ticket status updates are tracked using
 * event notification through Amazon Simple Notification Service, which is defined in the matchmaking
 * configuration.
 *
 * **Learn more**
 *
 * Add FlexMatch to a game client
 *
 * Set Up FlexMatch event
 * notification
 *
 * How Amazon GameLift Servers FlexMatch works
 */
export const startMatchmaking: API.OperationMethod<
  StartMatchmakingInput,
  StartMatchmakingOutput,
  StartMatchmakingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<StartMatchmakingInput>,
  output: __S(224, __c14, 0) as any as S.Schema<StartMatchmakingOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMatchmaking",
}));

export type StopFleetActionsError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Container
 *
 * Suspends certain types of activity in a fleet location. Currently, this operation is
 * used to stop auto-scaling activity. For multi-location fleets, fleet actions are managed
 * separately for each location.
 *
 * Stopping fleet actions has several potential purposes. It allows you to temporarily
 * stop auto-scaling activity but retain your scaling policies for use in the future. For
 * multi-location fleets, you can set up fleet-wide auto-scaling, and then opt out of it
 * for certain locations.
 *
 * This operation can be used in the following ways:
 *
 * - To stop actions on instances in the fleet's home Region, provide a fleet ID
 * and the type of actions to suspend.
 *
 * - To stop actions on instances in one of the fleet's remote locations, provide a
 * fleet ID, a location name, and the type of actions to suspend.
 *
 * If successful, Amazon GameLift Servers no longer initiates scaling events except in response to manual
 * changes using UpdateFleetCapacity. To restart fleet actions again, call
 * StartFleetActions.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * Fleets
 */
export const stopFleetActions: API.OperationMethod<
  StopFleetActionsInput,
  StopFleetActionsOutput,
  StopFleetActionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<StopFleetActionsInput>,
  output: __S(128, __c8, 0) as any as S.Schema<StopFleetActionsOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopFleetActions",
}));

export type StopGameSessionPlacementError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Cancels a game session placement that's in `PENDING` status. To stop a
 * placement, provide the placement ID value.
 *
 * Results
 *
 * If successful, this operation removes the placement request from the queue and moves
 * the `GameSessionPlacement` to `CANCELLED` status.
 *
 * This operation results in an `InvalidRequestExecption` (400) error if a
 * game session has already been created for this placement. You can clean up an unneeded
 * game session by calling TerminateGameSession.
 */
export const stopGameSessionPlacement: API.OperationMethod<
  StopGameSessionPlacementInput,
  StopGameSessionPlacementOutput,
  StopGameSessionPlacementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<StopGameSessionPlacementInput>,
  output: __S(2356, __c147, 4) as any as S.Schema<StopGameSessionPlacementOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopGameSessionPlacement",
}));

export type StopMatchmakingError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Cancels a matchmaking ticket or match backfill ticket that is currently being
 * processed. To stop the matchmaking operation, specify the ticket ID. If successful, work
 * on the ticket is stopped, and the ticket status is changed to
 * `CANCELLED`.
 *
 * This call is also used to turn off automatic backfill for an individual game session.
 * This is for game sessions that are created with a matchmaking configuration that has
 * automatic backfill enabled. The ticket ID is included in the `MatchmakerData`
 * of an updated game session object, which is provided to the game server.
 *
 * If the operation is successful, the service sends back an empty JSON struct with
 * the HTTP 200 response (not an empty HTTP body).
 *
 * **Learn more**
 *
 * Add FlexMatch to a game client
 */
export const stopMatchmaking: API.OperationMethod<
  StopMatchmakingInput,
  StopMatchmakingOutput,
  StopMatchmakingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<StopMatchmakingInput>,
  output: __S(640, __c40, 0) as any as S.Schema<StopMatchmakingOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopMatchmaking",
}));

export type SuspendGameServerGroupError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Temporarily stops activity on
 * a game server group without terminating instances or the game server group. You can
 * restart activity by calling ResumeGameServerGroup. You can suspend the following activity:
 *
 * - **Instance type replacement** - This activity
 * evaluates the current game hosting viability of all Spot instance types that are
 * defined for the game server group. It updates the Auto Scaling group to remove
 * nonviable Spot Instance types, which have a higher chance of game server
 * interruptions. It then balances capacity across the remaining viable Spot
 * Instance types. When this activity is suspended, the Auto Scaling group
 * continues with its current balance, regardless of viability. Instance
 * protection, utilization metrics, and capacity scaling activities continue to be
 * active.
 *
 * To suspend activity, specify a game server group ARN and the type of activity to be
 * suspended. If successful, a `GameServerGroup` object is returned showing that
 * the activity is listed in `SuspendedActions`.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const suspendGameServerGroup: API.OperationMethod<
  SuspendGameServerGroupInput,
  SuspendGameServerGroupOutput,
  SuspendGameServerGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<SuspendGameServerGroupInput>,
  output: __S(1168, __c73, 0) as any as S.Schema<SuspendGameServerGroupOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SuspendGameServerGroup",
}));

export type TagResourceError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Assigns a tag to an Amazon GameLift Servers resource. You can use tags to organize resources, create
 * IAM permissions policies to manage access to groups of resources, customize Amazon Web Services cost
 * breakdowns, and more. This operation handles the permissions necessary to manage tags
 * for Amazon GameLift Servers resources that support tagging.
 *
 * To add a tag to a resource, specify the unique ARN value for the resource and provide
 * a tag list containing one or more tags. The operation succeeds even if the list includes
 * tags that are already assigned to the resource.
 *
 * **Learn more**
 *
 * Tagging Amazon Web Services
 * Resources in the *Amazon Web Services General Reference*
 *
 * Amazon Web Services Tagging Strategies
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(640, __c40, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TerminateGameSessionError =
  | InternalServiceException
  | InvalidGameSessionStatusException
  | InvalidRequestException
  | NotFoundException
  | NotReadyException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Ends a game session that's currently in progress. Use this action to terminate any
 * game session that isn't in `ERROR` status. Terminating a game session is the
 * most efficient way to free up a server process when it's hosting a game session that's
 * in a bad state or not ending properly. You can use this action to terminate a game
 * session that's being hosted on any type of Amazon GameLift Servers fleet compute, including computes for
 * managed EC2, managed container, and Anywhere fleets. The game server must be integrated
 * with Amazon GameLift Servers server SDK 5.x or greater.
 *
 * **Request options**
 *
 * Request termination for a single game session. Provide the game session ID and the
 * termination mode. There are two potential methods for terminating a game session:
 *
 * - Initiate a graceful termination using the normal game session shutdown
 * sequence. With this mode, the Amazon GameLift Servers service prompts the server process that's
 * hosting the game session by calling the server SDK callback method
 * `OnProcessTerminate()`. The callback implementation is part of
 * the custom game server code. It might involve a variety of actions to gracefully
 * end a game session, such as notifying players, before stopping the server
 * process.
 *
 * - Force an immediate game session termination. With this mode, the Amazon GameLift Servers
 * service takes action to stop the server process, which ends the game session
 * without the normal game session shutdown sequence.
 *
 * **Results**
 *
 * If successful, game session termination is initiated. During this activity, the game
 * session status is changed to `TERMINATING`. When completed, the server
 * process that was hosting the game session has been stopped and replaced with a new
 * server process that's ready to host a new game session. The old game session's status is
 * changed to `TERMINATED` with a status reason that indicates the termination
 * method used.
 *
 * **Learn more**
 *
 * Add Amazon GameLift Servers to your game server
 *
 * Amazon GameLift Servers server SDK 5 reference guide for `OnProcessTerminate()`
 * (C++)
 * (C#)
 * (Unreal)
 * (Go)
 */
export const terminateGameSession: API.OperationMethod<
  TerminateGameSessionInput,
  TerminateGameSessionOutput,
  TerminateGameSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<TerminateGameSessionInput>,
  output: __S(1232, __c77, 0) as any as S.Schema<TerminateGameSessionOutput>,
  errors: [
    InternalServiceException,
    InvalidGameSessionStatusException,
    InvalidRequestException,
    NotFoundException,
    NotReadyException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateGameSession",
}));

export type UntagResourceError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | TaggingFailedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Removes a tag assigned to a Amazon GameLift Servers resource. You can use resource tags to organize
 * Amazon Web Services resources for a range of purposes. This operation handles the permissions
 * necessary to manage tags for Amazon GameLift Servers resources that support tagging.
 *
 * To remove a tag from a resource, specify the unique ARN value for the resource and
 * provide a string list containing one or more tags to remove. This operation succeeds
 * even if the list includes tags that aren't assigned to the resource.
 *
 * **Learn more**
 *
 * Tagging Amazon Web Services
 * Resources in the *Amazon Web Services General Reference*
 *
 * Amazon Web Services Tagging Strategies
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(640, __c40, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    TaggingFailedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAliasError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Updates properties for an alias. Specify the unique identifier of the alias to be
 * updated and the new property values.
 *
 * When reassigning an alias to a new fleet, provide
 * an updated routing strategy. If successful, the updated alias record is returned.
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const updateAlias: API.OperationMethod<
  UpdateAliasInput,
  UpdateAliasOutput,
  UpdateAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<UpdateAliasInput>,
  output: __S(752, __c47, 0) as any as S.Schema<UpdateAliasOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAlias",
}));

export type UpdateBuildError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Updates metadata in a build resource, including the build name and version. To update
 * the metadata, specify the build ID to update and provide the new values. If successful,
 * a build object containing the updated metadata is returned.
 *
 * **Learn more**
 *
 * Upload a Custom
 * Server Build
 *
 * All APIs by task
 */
export const updateBuild: API.OperationMethod<
  UpdateBuildInput,
  UpdateBuildOutput,
  UpdateBuildError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<UpdateBuildInput>,
  output: __S(1904, __c119, 0) as any as S.Schema<UpdateBuildOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBuild",
}));

export type UpdateContainerFleetError =
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | NotReadyException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Updates the properties of a managed container fleet. Depending on the properties being
 * updated, this operation might initiate a fleet deployment. You can track deployments for
 * a fleet using https://docs.aws.amazon.com/gamelift/latest/apireference/API_DescribeFleetDeployment.html.
 *
 * A managed fleet's runtime environment, which depends on the fleet's
 * Amazon Machine Image {AMI} version, can't be updated. You must create a new
 * fleet. As a best practice, we recommend replacing your managed fleets every 30
 * days to maintain a secure and up-to-date runtime environment for your hosted game
 * servers. For guidance, see
 * Security best practices for Amazon GameLift Servers.
 *
 * **Request options**
 *
 * As with CreateContainerFleet, many fleet properties use common defaults or are
 * calculated based on the fleet's container group definitions.
 *
 * - Update fleet properties that result in a fleet deployment. Include only those
 * properties that you want to change. Specify deployment configuration
 * settings.
 *
 * - Update fleet properties that don't result in a fleet deployment. Include only
 * those properties that you want to change.
 *
 * Changes to the following properties initiate a fleet deployment:
 *
 * - `GameServerContainerGroupDefinition`
 *
 * - `PerInstanceContainerGroupDefinition`
 *
 * - `GameServerContainerGroupsPerInstance`
 *
 * - `InstanceInboundPermissions`
 *
 * - `InstanceConnectionPortRange`
 *
 * - `LogConfiguration`
 *
 * **Results**
 *
 * If successful, this operation updates the container fleet resource, and might initiate
 * a new deployment of fleet resources using the deployment configuration provided. A
 * deployment replaces existing fleet instances with new instances that are deployed with
 * the updated fleet properties. The fleet is placed in `UPDATING` status until
 * the deployment is complete, then return to `ACTIVE`.
 *
 * You can have only one update deployment active at a time for a fleet. If a second
 * update request initiates a deployment while another deployment is in progress, the first
 * deployment is cancelled.
 */
export const updateContainerFleet: API.OperationMethod<
  UpdateContainerFleetInput,
  UpdateContainerFleetOutput,
  UpdateContainerFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<UpdateContainerFleetInput>,
  output: __S(960, __c60, 0) as any as S.Schema<UpdateContainerFleetOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    NotReadyException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContainerFleet",
}));

export type UpdateContainerGroupDefinitionError =
  | InternalServiceException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** Container
 *
 * Updates properties in an existing container group definition. This operation doesn't
 * replace the definition. Instead, it creates a new version of the definition and saves it
 * separately. You can access all versions that you choose to retain.
 *
 * The only property you can't update is the container group type.
 *
 * **Request options:**
 *
 * - Update based on the latest version of the container group definition. Specify the
 * container group definition name only, or use an ARN value without a version number.
 * Provide updated values for the properties that you want to change only. All other values
 * remain the same as the latest version.
 *
 * - Update based on a specific version of the container group definition. Specify the
 * container group definition name and a source version number, or use an ARN value with a
 * version number. Provide updated values for the properties that you want to change only.
 * All other values remain the same as the source version.
 *
 * - Change a game server container definition. Provide a complete set of container
 * definitions, including the updated definition.
 *
 * - Add or change a support container definition. Provide a complete set of container
 * definitions, including the updated definition.
 *
 * - Remove a support container definition. Provide a complete set of container
 * definitions, excluding the definition to remove. If the container group has only one
 * support container definition, provide an empty set.
 *
 * **Results:**
 *
 * If successful, this operation returns the complete properties of the new container group
 * definition version.
 *
 * If the container group definition version is used in an active fleets, the update
 * automatically initiates a new fleet deployment of the new version. You can track a fleet's
 * deployments using ListFleetDeployments.
 */
export const updateContainerGroupDefinition: API.OperationMethod<
  UpdateContainerGroupDefinitionInput,
  UpdateContainerGroupDefinitionOutput,
  UpdateContainerGroupDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<UpdateContainerGroupDefinitionInput>,
  output: __S(1024, __c64, 0) as any as S.Schema<UpdateContainerGroupDefinitionOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContainerGroupDefinition",
}));

export type UpdateFleetAttributesError =
  | ConflictException
  | InternalServiceException
  | InvalidFleetStatusException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere
 *
 * Updates a fleet's mutable attributes, such as game session protection and resource
 * creation limits.
 *
 * To update fleet attributes, specify the fleet ID and the property values that you want
 * to change. If successful, Amazon GameLift Servers returns the identifiers for the updated fleet.
 *
 * A managed fleet's runtime environment, which depends on the fleet's
 * Amazon Machine Image {AMI} version, can't be updated. You must create a new
 * fleet. As a best practice, we recommend replacing your managed fleets every 30
 * days to maintain a secure and up-to-date runtime environment for your hosted game
 * servers. For guidance, see
 * Security best practices for Amazon GameLift Servers.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 */
export const updateFleetAttributes: API.OperationMethod<
  UpdateFleetAttributesInput,
  UpdateFleetAttributesOutput,
  UpdateFleetAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<UpdateFleetAttributesInput>,
  output: __S(128, __c8, 0) as any as S.Schema<UpdateFleetAttributesOutput>,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidFleetStatusException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFleetAttributes",
}));

export type UpdateFleetCapacityError =
  | ConflictException
  | InternalServiceException
  | InvalidFleetStatusException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Container
 *
 * Updates capacity settings for a managed EC2 fleet or managed container fleet. For these
 * fleets, you adjust capacity by changing the number of instances in the fleet. Fleet
 * capacity determines the number of game sessions and players that the fleet can host
 * based on its configuration. For fleets with multiple locations, use this operation to
 * manage capacity settings in each location individually.
 *
 * - Minimum/maximum size: Set hard limits on the number of Amazon EC2 instances allowed. If Amazon GameLift Servers receives a
 * request--either through manual update or automatic scaling--it won't change the capacity
 * to a value outside of this range.
 *
 * - Desired capacity: As an alternative to automatic scaling, manually set the number of Amazon EC2
 * instances to be maintained.
 * Before changing a fleet's desired capacity, check the maximum capacity of the
 * fleet's Amazon EC2 instance type by calling DescribeEC2InstanceLimits.
 *
 * To update capacity for a fleet's home Region, or if the fleet has no remote
 * locations, omit the `Location` parameter. The fleet must be in
 * `ACTIVE` status.
 *
 * To update capacity for a fleet's remote location, set the
 * `Location` parameter to the location to update. The location must be in
 * `ACTIVE` status.
 *
 * If successful, Amazon GameLift Servers updates the capacity settings and returns the identifiers for
 * the updated fleet and/or location. If a requested change to desired capacity exceeds the
 * instance type's limit, the `LimitExceeded` exception occurs.
 *
 * Updates often prompt an immediate change in fleet capacity, such as when current
 * capacity is different than the new desired capacity or outside the new limits. In this
 * scenario, Amazon GameLift Servers automatically initiates steps to add or remove instances in the fleet
 * location. You can track a fleet's current capacity by calling DescribeFleetCapacity or DescribeFleetLocationCapacity.
 *
 * Use ManagedCapacityConfiguration with the "SCALE_TO_AND_FROM_ZERO" ZeroCapacityStrategy to enable Amazon
 * GameLift Servers to fully manage the MinSize value, switching between 0 and 1 based on game session
 * activity. This is ideal for eliminating compute costs during periods of no game activity.
 * It is particularly beneficial during development when you're away from your desk, iterating on builds
 * for extended periods, in production environments serving low-traffic locations, or for games with long,
 * predictable downtime windows. By automatically managing capacity between 0 and 1 instances, you avoid paying
 * for idle instances while maintaining the ability to serve game sessions when demand arrives. Note that while
 * scale-out is triggered immediately upon receiving a game session request, actual game session availability
 * depends on your server process startup time, so this approach works best with multi-location Fleets where
 * cold-start latency is tolerable. With a "MANUAL" ZeroCapacityStrategy Amazon GameLift Servers will not
 * modify Fleet MinSize values automatically and will not scale out from zero instances in response to game
 * sessions. This is configurable per-location.
 *
 * **Learn more**
 *
 * Scaling fleet
 * capacity
 */
export const updateFleetCapacity: API.OperationMethod<
  UpdateFleetCapacityInput,
  UpdateFleetCapacityOutput,
  UpdateFleetCapacityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<UpdateFleetCapacityInput>,
  output: __S(449, __c28, 1) as any as S.Schema<UpdateFleetCapacityOutput>,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidFleetStatusException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFleetCapacity",
}));

export type UpdateFleetPortSettingsError =
  | ConflictException
  | InternalServiceException
  | InvalidFleetStatusException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Updates permissions that allow inbound traffic to connect to game sessions in the
 * fleet.
 *
 * To update settings, specify the fleet ID to be updated and specify the changes to be
 * made. List the permissions you want to add in
 * `InboundPermissionAuthorizations`, and permissions you want to remove in
 * `InboundPermissionRevocations`. Permissions to be removed must match
 * existing fleet permissions.
 *
 * If successful, the fleet identifiers for the updated fleet are returned. For fleets with remote
 * locations, port setting updates can take time to propagate across all locations. You can
 * check the status of updates in each location by calling
 * `DescribeFleetPortSettings` with a location name.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 */
export const updateFleetPortSettings: API.OperationMethod<
  UpdateFleetPortSettingsInput,
  UpdateFleetPortSettingsOutput,
  UpdateFleetPortSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<UpdateFleetPortSettingsInput>,
  output: __S(128, __c8, 0) as any as S.Schema<UpdateFleetPortSettingsOutput>,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidFleetStatusException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFleetPortSettings",
}));

export type UpdateGameServerError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Updates information about a registered game server to help Amazon GameLift Servers FleetIQ track game server
 * availability. This operation is called by a game server process that is running on an
 * instance in a game server group.
 *
 * Use this operation to update the following types of game server information. You can
 * make all three types of updates in the same request:
 *
 * - To update the game server's utilization status from `AVAILABLE`
 * (when the game server is available to be claimed) to `UTILIZED` (when
 * the game server is currently hosting games). Identify the game server and game
 * server group and specify the new utilization status. You can't change the status
 * from to `UTILIZED` to `AVAILABLE` .
 *
 * - To report health status, identify the game server and game server group and
 * set health check to `HEALTHY`. If a game server does not report
 * health status for a certain length of time, the game server is no longer
 * considered healthy. As a result, it will be eventually deregistered from the
 * game server group to avoid affecting utilization metrics. The best practice is
 * to report health every 60 seconds.
 *
 * - To change game server metadata, provide updated game server data.
 *
 * Once a game server is successfully updated, the relevant statuses and timestamps are
 * updated.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const updateGameServer: API.OperationMethod<
  UpdateGameServerInput,
  UpdateGameServerOutput,
  UpdateGameServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<UpdateGameServerInput>,
  output: __S(688, __c43, 0) as any as S.Schema<UpdateGameServerOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGameServer",
}));

export type UpdateGameServerGroupError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2 (FleetIQ)
 *
 * Updates Amazon GameLift Servers FleetIQ-specific
 * properties for a game server group. Many Auto Scaling group properties are updated on
 * the Auto Scaling group directly, including the launch template, Auto Scaling policies,
 * and maximum/minimum/desired instance counts.
 *
 * To update the game server group, specify the game server group ID and provide the
 * updated values. Before applying the updates, the new values are validated to ensure that
 * Amazon GameLift Servers FleetIQ can continue to perform instance balancing activity. If successful, a
 * `GameServerGroup` object is returned.
 *
 * Target tracking Auto Scaling policies on the Auto Scaling group cannot be
 * updated through the Amazon Web Services Management Console. Instead, use the Amazon Elastic Compute Cloud Auto Scaling
 *
 * `PutScalingPolicy`
 * API action to update these policies.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers FleetIQ
 * Guide
 */
export const updateGameServerGroup: API.OperationMethod<
  UpdateGameServerGroupInput,
  UpdateGameServerGroupOutput,
  UpdateGameServerGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<UpdateGameServerGroupInput>,
  output: __S(1168, __c73, 0) as any as S.Schema<UpdateGameServerGroupOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGameServerGroup",
}));

export type UpdateGameSessionError =
  | ConflictException
  | InternalServiceException
  | InvalidGameSessionStatusException
  | InvalidRequestException
  | NotFoundException
  | NotReadyException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Updates the mutable properties of a game session.
 *
 * To update a game session, specify the game session ID and the values you want to
 * change.
 *
 * If successful, the updated `GameSession` object is returned.
 *
 * All APIs by task
 */
export const updateGameSession: API.OperationMethod<
  UpdateGameSessionInput,
  UpdateGameSessionOutput,
  UpdateGameSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<UpdateGameSessionInput>,
  output: __S(1232, __c77, 0) as any as S.Schema<UpdateGameSessionOutput>,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidGameSessionStatusException,
    InvalidRequestException,
    NotFoundException,
    NotReadyException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGameSession",
}));

export type UpdateGameSessionQueueError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Updates the configuration of a game session queue, which determines how the queue
 * processes new game session requests. To update settings, specify the queue name to be
 * updated and provide the new settings. When updating destinations, provide a complete
 * list of destinations.
 *
 * **Learn more**
 *
 * Using Multi-Region Queues
 */
export const updateGameSessionQueue: API.OperationMethod<
  UpdateGameSessionQueueInput,
  UpdateGameSessionQueueOutput,
  UpdateGameSessionQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<UpdateGameSessionQueueInput>,
  output: __S(1296, __c81, 0) as any as S.Schema<UpdateGameSessionQueueOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGameSessionQueue",
}));

export type UpdateMatchmakingConfigurationError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Updates settings for a FlexMatch matchmaking configuration. These changes affect all
 * matches and game sessions that are created after the update. To update settings, specify
 * the configuration name to be updated and provide the new settings.
 *
 * **Learn more**
 *
 * Design a FlexMatch
 * matchmaker
 */
export const updateMatchmakingConfiguration: API.OperationMethod<
  UpdateMatchmakingConfigurationInput,
  UpdateMatchmakingConfigurationOutput,
  UpdateMatchmakingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<UpdateMatchmakingConfigurationInput>,
  output: __S(1376, __c86, 0) as any as S.Schema<UpdateMatchmakingConfigurationOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMatchmakingConfiguration",
}));

export type UpdateRuntimeConfigurationError =
  | InternalServiceException
  | InvalidFleetStatusException
  | InvalidRequestException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Updates the runtime configuration for the specified fleet. The runtime configuration
 * tells Amazon GameLift Servers how to launch server processes on computes in managed EC2 and Anywhere fleets. You
 * can update a fleet's runtime configuration at any time after the fleet is created; it
 * does not need to be in `ACTIVE` status.
 *
 * To update runtime configuration, specify the fleet ID and provide a
 * `RuntimeConfiguration` with an updated set of server process
 * configurations.
 *
 * If successful, the fleet's runtime configuration settings are updated. Fleet computes
 * that run game server processes regularly check for and receive updated runtime
 * configurations. The computes immediately take action to comply with the new
 * configuration by launching new server processes or by not replacing existing processes
 * when they shut down. Updating a fleet's runtime configuration never affects existing
 * server processes.
 *
 * **Learn more**
 *
 * Setting up Amazon GameLift Servers
 * fleets
 */
export const updateRuntimeConfiguration: API.OperationMethod<
  UpdateRuntimeConfigurationInput,
  UpdateRuntimeConfigurationOutput,
  UpdateRuntimeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<UpdateRuntimeConfigurationInput>,
  output: __S(2544, __c159, 0) as any as S.Schema<UpdateRuntimeConfigurationOutput>,
  errors: [
    InternalServiceException,
    InvalidFleetStatusException,
    InvalidRequestException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRuntimeConfiguration",
}));

export type UpdateScriptError =
  | InternalServiceException
  | InvalidRequestException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2
 *
 * Updates Realtime script metadata and content.
 *
 * To update script metadata, specify the script ID and provide updated name and/or
 * version values.
 *
 * To update script content, provide an updated zip file by pointing to either a local
 * file or an Amazon S3 bucket location. You can use either method regardless of how the
 * original script was uploaded. Use the *Version* parameter to track
 * updates to the script.
 *
 * If the call is successful, the updated metadata is stored in the script record and a
 * revised script is uploaded to the Amazon GameLift Servers service. Once the script is updated and
 * acquired by a fleet instance, the new version is used for all new game sessions.
 *
 * **Learn more**
 *
 * Amazon GameLift Servers Amazon GameLift Servers Realtime
 *
 * **Related actions**
 *
 * All APIs by task
 */
export const updateScript: API.OperationMethod<
  UpdateScriptInput,
  UpdateScriptOutput,
  UpdateScriptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<UpdateScriptInput>,
  output: __S(1536, __c96, 0) as any as S.Schema<UpdateScriptOutput>,
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScript",
}));

export type ValidateMatchmakingRuleSetError =
  | InternalServiceException
  | InvalidRequestException
  | UnsupportedRegionException
  | CommonErrors;
/**
 * **This API works with the following fleet types:** EC2, Anywhere, Container
 *
 * Validates the syntax of a matchmaking rule or rule set. This operation checks that the
 * rule set is using syntactically correct JSON and that it conforms to allowed property
 * expressions. To validate syntax, provide a rule set JSON string.
 *
 * **Learn more**
 *
 * - Build a rule
 * set
 */
export const validateMatchmakingRuleSet: API.OperationMethod<
  ValidateMatchmakingRuleSetInput,
  ValidateMatchmakingRuleSetOutput,
  ValidateMatchmakingRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<ValidateMatchmakingRuleSetInput>,
  output: __S(593, __c37, 1) as any as S.Schema<ValidateMatchmakingRuleSetOutput>,
  errors: [InternalServiceException, InvalidRequestException, UnsupportedRegionException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateMatchmakingRuleSet",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(672, __c42, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListLocationsInput" });
    case 1:
      return S.Array(__S(1346, __c84, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ Locations: S.optional(__S(1, __c0, 1)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListLocationsOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Limit: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListScriptsInput" });
    case 1:
      return S.Array(__S(1520, __c95, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Scripts: S.optional(__S(17, __c1, 1)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListScriptsOutput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(737, __c46, 1)) }).pipe(ns)).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          FleetId: S.optional(S.String),
          ScalingAdjustment: S.optional(S.Number),
          ScalingAdjustmentType: S.optional(S.String),
          Threshold: S.optional(S.Number),
          ComparisonOperator: S.optional(S.String),
          EvaluationPeriods: S.optional(S.Number),
          MetricName: S.optional(S.String),
          PolicyType: S.optional(S.String),
          TargetConfiguration: S.optional(__S(1200, __c75, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutScalingPolicyInput" });
    case 1:
      return S.suspend(() => S.Struct({ Name: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "PutScalingPolicyOutput",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          ComputeName: S.optional(S.String),
          CertificatePath: S.optional(S.String),
          DnsName: S.optional(S.String),
          IpAddress: S.optional(SensitiveString),
          Location: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RegisterComputeInput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GameServerGroupName: S.optional(S.String),
          GameServerId: S.optional(S.String),
          InstanceId: S.optional(S.String),
          ConnectionInfo: S.optional(S.String),
          GameServerData: S.optional(SensitiveString),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RegisterGameServerInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BuildId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RequestUploadCredentialsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UploadCredentials: S.optional(__S(832, __c52, 0)),
          StorageLocation: S.optional(__S(800, __c50, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "RequestUploadCredentialsOutput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AliasId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ResolveAliasInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetId: S.optional(S.String), FleetArn: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ResolveAliasOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GameServerGroupName: S.optional(S.String),
          ResumeActions: S.optional(__S(672, __c42, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ResumeGameServerGroupInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          AliasId: S.optional(S.String),
          Location: S.optional(S.String),
          FilterExpression: S.optional(S.String),
          SortExpression: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SearchGameSessionsInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          Actions: S.optional(__S(672, __c42, 0)),
          Location: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartFleetActionsInput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PlayerId: S.optional(SensitiveString),
          PlayerData: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "DesiredPlayerSession" });
    case 1:
      return S.Array(__S(192, __c12, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          PlacementId: S.optional(S.String),
          GameSessionQueueName: S.optional(S.String),
          GameProperties: S.optional(__S(1249, __c78, 1)),
          MaximumPlayerSessionCount: S.optional(S.Number),
          GameSessionName: S.optional(S.String),
          PlayerLatencies: S.optional(__S(2353, __c147, 1)),
          DesiredPlayerSessions: S.optional(__S(193, __c12, 1)),
          GameSessionData: S.optional(SensitiveString),
          PriorityConfigurationOverride: S.optional(__S(2354, __c147, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartGameSessionPlacementInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TicketId: S.optional(S.String),
          ConfigurationName: S.optional(S.String),
          GameSessionArn: S.optional(S.String),
          Players: S.optional(__S(2468, __c154, 4)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartMatchBackfillInput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MatchmakingTicket: S.optional(__S(2470, __c154, 6)) }).pipe(ns),
      ).annotate({ identifier: "StartMatchBackfillOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TicketId: S.optional(S.String),
          ConfigurationName: S.optional(S.String),
          Players: S.optional(__S(2468, __c154, 4)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartMatchmakingInput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          Actions: S.optional(__S(672, __c42, 0)),
          Location: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StopFleetActionsInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PlacementId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopGameSessionPlacementInput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TicketId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopMatchmakingInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GameServerGroupName: S.optional(S.String),
          SuspendActions: S.optional(__S(672, __c42, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SuspendGameServerGroupInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.optional(S.String), Tags: S.optional(__S(737, __c46, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GameSessionId: S.optional(S.String),
          TerminationMode: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "TerminateGameSessionInput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.optional(S.String),
          TagKeys: S.optional(__S(864, __c54, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AliasId: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          RoutingStrategy: S.optional(__S(768, __c48, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAliasInput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BuildId: S.optional(S.String),
          Name: S.optional(S.String),
          Version: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateBuildInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          GameServerContainerGroupDefinitionName: S.optional(S.String),
          PerInstanceContainerGroupDefinitionName: S.optional(S.String),
          GameServerContainerGroupsPerInstance: S.optional(S.Number),
          InstanceConnectionPortRange: S.optional(__S(976, __c61, 0)),
          InstanceInboundPermissionAuthorizations: S.optional(__S(945, __c59, 1)),
          InstanceInboundPermissionRevocations: S.optional(__S(945, __c59, 1)),
          DeploymentConfiguration: S.optional(__S(2144, __c134, 0)),
          Description: S.optional(S.String),
          MetricGroups: S.optional(__S(864, __c54, 0)),
          NewGameSessionProtectionPolicy: S.optional(S.String),
          GameSessionCreationLimitPolicy: S.optional(__S(928, __c58, 0)),
          LogConfiguration: S.optional(__S(977, __c61, 1)),
          RemoveAttributes: S.optional(__S(672, __c42, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateContainerFleetInput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          GameServerContainerDefinition: S.optional(__S(1008, __c63, 0)),
          SupportContainerDefinitions: S.optional(__S(1010, __c63, 2)),
          TotalMemoryLimitMebibytes: S.optional(S.Number),
          TotalVcpuLimit: S.optional(S.Number),
          VersionDescription: S.optional(S.String),
          SourceVersionNumber: S.optional(S.Number),
          OperatingSystem: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateContainerGroupDefinitionInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          NewGameSessionProtectionPolicy: S.optional(S.String),
          ResourceCreationLimitPolicy: S.optional(__S(928, __c58, 0)),
          MetricGroups: S.optional(__S(864, __c54, 0)),
          AnywhereConfiguration: S.optional(__S(1088, __c68, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFleetAttributesInput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          DesiredInstances: S.optional(S.Number),
          MinSize: S.optional(S.Number),
          MaxSize: S.optional(S.Number),
          Location: S.optional(S.String),
          ManagedCapacityConfiguration: S.optional(__S(2096, __c131, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFleetCapacityInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          FleetArn: S.optional(S.String),
          Location: S.optional(S.String),
          ManagedCapacityConfiguration: S.optional(__S(2096, __c131, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateFleetCapacityOutput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          InboundPermissionAuthorizations: S.optional(__S(945, __c59, 1)),
          InboundPermissionRevocations: S.optional(__S(945, __c59, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFleetPortSettingsInput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GameServerGroupName: S.optional(S.String),
          GameServerId: S.optional(S.String),
          GameServerData: S.optional(SensitiveString),
          UtilizationStatus: S.optional(S.String),
          HealthCheck: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateGameServerInput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GameServerGroupName: S.optional(S.String),
          RoleArn: S.optional(S.String),
          InstanceDefinitions: S.optional(__S(1185, __c74, 1)),
          GameServerProtectionPolicy: S.optional(S.String),
          BalancingStrategy: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateGameServerGroupInput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GameSessionId: S.optional(S.String),
          MaximumPlayerSessionCount: S.optional(S.Number),
          Name: S.optional(S.String),
          PlayerSessionCreationPolicy: S.optional(S.String),
          ProtectionPolicy: S.optional(S.String),
          GameProperties: S.optional(__S(1249, __c78, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateGameSessionInput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          TimeoutInSeconds: S.optional(S.Number),
          PlayerLatencyPolicies: S.optional(__S(1313, __c82, 1)),
          Destinations: S.optional(__S(1315, __c82, 3)),
          FilterConfiguration: S.optional(__S(1316, __c82, 4)),
          PriorityConfiguration: S.optional(__S(1317, __c82, 5)),
          CustomEventData: S.optional(SensitiveString),
          NotificationTarget: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateGameSessionQueueInput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          GameSessionQueueArns: S.optional(__S(864, __c54, 0)),
          RequestTimeoutSeconds: S.optional(S.Number),
          AcceptanceTimeoutSeconds: S.optional(S.Number),
          AcceptanceRequired: S.optional(S.Boolean),
          RuleSetName: S.optional(S.String),
          NotificationTarget: S.optional(S.String),
          AdditionalPlayerCount: S.optional(S.Number),
          CustomEventData: S.optional(SensitiveString),
          GameProperties: S.optional(__S(1249, __c78, 1)),
          GameSessionData: S.optional(SensitiveString),
          BackfillMode: S.optional(S.String),
          FlexMatchMode: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateMatchmakingConfigurationInput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          RuntimeConfiguration: S.optional(__S(1106, __c69, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateRuntimeConfigurationInput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScriptId: S.optional(S.String),
          Name: S.optional(S.String),
          Version: S.optional(S.String),
          StorageLocation: S.optional(__S(800, __c50, 0)),
          ZipFile: S.optional(T.Blob),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateScriptInput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleSetBody: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ValidateMatchmakingRuleSetInput" });
    case 1:
      return S.suspend(() => S.Struct({ Valid: S.optional(S.Boolean) }).pipe(ns)).annotate({
        identifier: "ValidateMatchmakingRuleSetOutput",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TicketId: S.optional(S.String),
          PlayerIds: S.optional(__S(624, __c39, 0)),
          AcceptanceType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AcceptMatchInput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "AcceptMatchOutput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceStatuses: S.optional(__S(672, __c42, 0)) }),
      ).annotate({ identifier: "ClaimFilterOption" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GameServerGroupName: S.optional(S.String),
          GameServerId: S.optional(S.String),
          GameServerData: S.optional(SensitiveString),
          FilterOption: S.optional(__S(656, __c41, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ClaimGameServerInput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GameServer: S.optional(__S(704, __c44, 0)) }).pipe(ns),
      ).annotate({ identifier: "ClaimGameServerOutput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GameServerGroupName: S.optional(S.String),
          GameServerGroupArn: S.optional(S.String),
          GameServerId: S.optional(S.String),
          InstanceId: S.optional(S.String),
          ConnectionInfo: S.optional(S.String),
          GameServerData: S.optional(SensitiveString),
          ClaimStatus: S.optional(S.String),
          UtilizationStatus: S.optional(S.String),
          RegistrationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastClaimTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastHealthCheckTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GameServer" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          RoutingStrategy: S.optional(__S(768, __c48, 0)),
          Tags: S.optional(__S(737, __c46, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAliasInput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(736, __c46, 0));
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Alias: S.optional(__S(769, __c48, 1)) }).pipe(ns)).annotate(
        { identifier: "CreateAliasOutput" },
      );
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          FleetId: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "RoutingStrategy" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AliasId: S.optional(S.String),
          Name: S.optional(S.String),
          AliasArn: S.optional(S.String),
          Description: S.optional(S.String),
          RoutingStrategy: S.optional(__S(768, __c48, 0)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Alias" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Version: S.optional(S.String),
          StorageLocation: S.optional(__S(800, __c50, 0)),
          OperatingSystem: S.optional(S.String),
          Tags: S.optional(__S(737, __c46, 1)),
          ServerSdkVersion: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateBuildInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Build: S.optional(__S(816, __c51, 0)),
          UploadCredentials: S.optional(__S(832, __c52, 0)),
          StorageLocation: S.optional(__S(800, __c50, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "CreateBuildOutput" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.optional(S.String),
          Key: S.optional(S.String),
          RoleArn: S.optional(S.String),
          ObjectVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3Location" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BuildId: S.optional(S.String),
          BuildArn: S.optional(S.String),
          Name: S.optional(S.String),
          Version: S.optional(S.String),
          Status: S.optional(S.String),
          SizeOnDisk: S.optional(S.Number),
          OperatingSystem: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ServerSdkVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "Build" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccessKeyId: S.optional(S.String),
          SecretAccessKey: S.optional(S.String),
          SessionToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsCredentials" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetRoleArn: S.optional(S.String),
          Description: S.optional(S.String),
          GameServerContainerGroupDefinitionName: S.optional(S.String),
          PerInstanceContainerGroupDefinitionName: S.optional(S.String),
          InstanceConnectionPortRange: S.optional(__S(976, __c61, 0)),
          InstanceInboundPermissions: S.optional(__S(945, __c59, 1)),
          GameServerContainerGroupsPerInstance: S.optional(S.Number),
          InstanceType: S.optional(S.String),
          BillingType: S.optional(S.String),
          Locations: S.optional(__S(881, __c55, 1)),
          MetricGroups: S.optional(__S(864, __c54, 0)),
          NewGameSessionProtectionPolicy: S.optional(S.String),
          GameSessionCreationLimitPolicy: S.optional(__S(928, __c58, 0)),
          LogConfiguration: S.optional(__S(977, __c61, 1)),
          Tags: S.optional(__S(737, __c46, 1)),
          PlayerGatewayMode: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateContainerFleetInput" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Location: S.optional(S.String) })).annotate({
        identifier: "LocationConfiguration",
      });
    case 1:
      return S.Array(__S(880, __c55, 0));
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Location: S.optional(S.String),
          Status: S.optional(S.String),
          PlayerGatewayStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "ContainerFleetLocationAttributes" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(896, __c56, 0));
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NewGameSessionsPerCreator: S.optional(S.Number),
          PolicyPeriodInMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GameSessionCreationLimitPolicy" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FromPort: S.optional(S.Number),
          ToPort: S.optional(S.Number),
          IpRange: S.optional(SensitiveString),
          Protocol: S.optional(S.String),
        }),
      ).annotate({ identifier: "IpPermission" });
    case 1:
      return S.Array(__S(944, __c59, 0));
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerFleet: S.optional(__S(979, __c61, 3)) }).pipe(ns),
      ).annotate({ identifier: "CreateContainerFleetOutput" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FromPort: S.optional(S.Number), ToPort: S.optional(S.Number) }),
      ).annotate({ identifier: "ConnectionPortRange" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LogDestination: S.optional(S.String),
          S3BucketName: S.optional(S.String),
          LogGroupArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "LogConfiguration" });
    case 2:
      return S.suspend(() => S.Struct({ LatestDeploymentId: S.optional(S.String) })).annotate({
        identifier: "DeploymentDetails",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          FleetArn: S.optional(S.String),
          FleetRoleArn: S.optional(S.String),
          GameServerContainerGroupDefinitionName: S.optional(S.String),
          GameServerContainerGroupDefinitionArn: S.optional(S.String),
          PerInstanceContainerGroupDefinitionName: S.optional(S.String),
          PerInstanceContainerGroupDefinitionArn: S.optional(S.String),
          InstanceConnectionPortRange: S.optional(__S(976, __c61, 0)),
          InstanceInboundPermissions: S.optional(__S(945, __c59, 1)),
          GameServerContainerGroupsPerInstance: S.optional(S.Number),
          MaximumGameServerContainerGroupsPerInstance: S.optional(S.Number),
          InstanceType: S.optional(S.String),
          BillingType: S.optional(S.String),
          Description: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MetricGroups: S.optional(__S(864, __c54, 0)),
          NewGameSessionProtectionPolicy: S.optional(S.String),
          GameSessionCreationLimitPolicy: S.optional(__S(928, __c58, 0)),
          Status: S.optional(S.String),
          DeploymentDetails: S.optional(__S(978, __c61, 2)),
          LogConfiguration: S.optional(__S(977, __c61, 1)),
          LocationAttributes: S.optional(__S(912, __c57, 0)),
          PlayerGatewayMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "ContainerFleet" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          ContainerGroupType: S.optional(S.String),
          TotalMemoryLimitMebibytes: S.optional(S.Number),
          TotalVcpuLimit: S.optional(S.Number),
          GameServerContainerDefinition: S.optional(__S(1008, __c63, 0)),
          SupportContainerDefinitions: S.optional(__S(1010, __c63, 2)),
          OperatingSystem: S.optional(S.String),
          VersionDescription: S.optional(S.String),
          Tags: S.optional(__S(737, __c46, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateContainerGroupDefinitionInput" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContainerName: S.optional(S.String),
          DependsOn: S.optional(__S(1041, __c65, 1)),
          MountPoints: S.optional(__S(1043, __c65, 3)),
          EnvironmentOverride: S.optional(__S(1045, __c65, 5)),
          ImageUri: S.optional(S.String),
          PortConfiguration: S.optional(__S(1048, __c65, 8)),
          ServerSdkVersion: S.optional(S.String),
          LinuxCapabilities: S.optional(__S(1049, __c65, 9)),
        }),
      ).annotate({ identifier: "GameServerContainerDefinitionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ContainerName: S.optional(S.String),
          DependsOn: S.optional(__S(1041, __c65, 1)),
          MountPoints: S.optional(__S(1043, __c65, 3)),
          EnvironmentOverride: S.optional(__S(1045, __c65, 5)),
          Essential: S.optional(S.Boolean),
          HealthCheck: S.optional(__S(1050, __c65, 10)),
          ImageUri: S.optional(S.String),
          MemoryHardLimitMebibytes: S.optional(S.Number),
          PortConfiguration: S.optional(__S(1048, __c65, 8)),
          Vcpu: S.optional(S.Number),
          LinuxCapabilities: S.optional(__S(1049, __c65, 9)),
        }),
      ).annotate({ identifier: "SupportContainerDefinitionInput" });
    case 2:
      return S.Array(__S(1009, __c63, 1));
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerGroupDefinition: S.optional(__S(1054, __c65, 14)) }).pipe(ns),
      ).annotate({ identifier: "CreateContainerGroupDefinitionOutput" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerName: S.optional(S.String), Condition: S.optional(S.String) }),
      ).annotate({ identifier: "ContainerDependency" });
    case 1:
      return S.Array(__S(1040, __c65, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          InstancePath: S.optional(S.String),
          ContainerPath: S.optional(S.String),
          AccessLevel: S.optional(S.String),
        }),
      ).annotate({ identifier: "ContainerMountPoint" });
    case 3:
      return S.Array(__S(1042, __c65, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "ContainerEnvironment" });
    case 5:
      return S.Array(__S(1044, __c65, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          FromPort: S.optional(S.Number),
          ToPort: S.optional(S.Number),
          Protocol: S.optional(S.String),
        }),
      ).annotate({ identifier: "ContainerPortRange" });
    case 7:
      return S.Array(__S(1046, __c65, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ ContainerPortRanges: S.optional(__S(1047, __c65, 7)) }),
      ).annotate({ identifier: "ContainerPortConfiguration" });
    case 9:
      return S.suspend(() => S.Struct({ Include: S.optional(__S(672, __c42, 0)) })).annotate({
        identifier: "LinuxCapabilities",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({
          Command: S.optional(__S(864, __c54, 0)),
          Interval: S.optional(S.Number),
          Retries: S.optional(S.Number),
          StartPeriod: S.optional(S.Number),
          Timeout: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ContainerHealthCheck" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          ContainerName: S.optional(S.String),
          DependsOn: S.optional(__S(1041, __c65, 1)),
          MountPoints: S.optional(__S(1043, __c65, 3)),
          EnvironmentOverride: S.optional(__S(1045, __c65, 5)),
          ImageUri: S.optional(S.String),
          PortConfiguration: S.optional(__S(1048, __c65, 8)),
          ResolvedImageDigest: S.optional(S.String),
          ServerSdkVersion: S.optional(S.String),
          LinuxCapabilities: S.optional(__S(1049, __c65, 9)),
        }),
      ).annotate({ identifier: "GameServerContainerDefinition" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          ContainerName: S.optional(S.String),
          DependsOn: S.optional(__S(1041, __c65, 1)),
          MountPoints: S.optional(__S(1043, __c65, 3)),
          EnvironmentOverride: S.optional(__S(1045, __c65, 5)),
          Essential: S.optional(S.Boolean),
          HealthCheck: S.optional(__S(1050, __c65, 10)),
          ImageUri: S.optional(S.String),
          MemoryHardLimitMebibytes: S.optional(S.Number),
          PortConfiguration: S.optional(__S(1048, __c65, 8)),
          ResolvedImageDigest: S.optional(S.String),
          Vcpu: S.optional(S.Number),
          LinuxCapabilities: S.optional(__S(1049, __c65, 9)),
        }),
      ).annotate({ identifier: "SupportContainerDefinition" });
    case 13:
      return S.Array(__S(1052, __c65, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          ContainerGroupDefinitionArn: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          OperatingSystem: S.optional(S.String),
          Name: S.optional(S.String),
          ContainerGroupType: S.optional(S.String),
          TotalMemoryLimitMebibytes: S.optional(S.Number),
          TotalVcpuLimit: S.optional(S.Number),
          GameServerContainerDefinition: S.optional(__S(1051, __c65, 11)),
          SupportContainerDefinitions: S.optional(__S(1053, __c65, 13)),
          VersionNumber: S.optional(S.Number),
          VersionDescription: S.optional(S.String),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "ContainerGroupDefinition" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          BuildId: S.optional(S.String),
          ScriptId: S.optional(S.String),
          ServerLaunchPath: S.optional(S.String),
          ServerLaunchParameters: S.optional(S.String),
          LogPaths: S.optional(__S(864, __c54, 0)),
          EC2InstanceType: S.optional(S.String),
          EC2InboundPermissions: S.optional(__S(945, __c59, 1)),
          NewGameSessionProtectionPolicy: S.optional(S.String),
          RuntimeConfiguration: S.optional(__S(1106, __c69, 2)),
          ResourceCreationLimitPolicy: S.optional(__S(928, __c58, 0)),
          MetricGroups: S.optional(__S(864, __c54, 0)),
          PeerVpcAwsAccountId: S.optional(S.String),
          PeerVpcId: S.optional(S.String),
          FleetType: S.optional(S.String),
          InstanceRoleArn: S.optional(S.String),
          CertificateConfiguration: S.optional(__S(1072, __c67, 0)),
          Locations: S.optional(__S(881, __c55, 1)),
          Tags: S.optional(__S(737, __c46, 1)),
          ComputeType: S.optional(S.String),
          AnywhereConfiguration: S.optional(__S(1088, __c68, 0)),
          InstanceRoleCredentialsProvider: S.optional(S.String),
          PlayerGatewayMode: S.optional(S.String),
          PlayerGatewayConfiguration: S.optional(__S(1073, __c67, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFleetInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FleetAttributes: S.optional(__S(1074, __c67, 2)),
          LocationStates: S.optional(__S(912, __c57, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "CreateFleetOutput" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ CertificateType: S.optional(S.String) })).annotate({
        identifier: "CertificateConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ GameServerIpProtocolSupported: S.optional(S.String) }),
      ).annotate({ identifier: "PlayerGatewayConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          FleetArn: S.optional(S.String),
          FleetType: S.optional(S.String),
          InstanceType: S.optional(S.String),
          Description: S.optional(S.String),
          Name: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TerminationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          BuildId: S.optional(S.String),
          BuildArn: S.optional(S.String),
          ScriptId: S.optional(S.String),
          ScriptArn: S.optional(S.String),
          ServerLaunchPath: S.optional(S.String),
          ServerLaunchParameters: S.optional(S.String),
          LogPaths: S.optional(__S(864, __c54, 0)),
          NewGameSessionProtectionPolicy: S.optional(S.String),
          OperatingSystem: S.optional(S.String),
          ResourceCreationLimitPolicy: S.optional(__S(928, __c58, 0)),
          MetricGroups: S.optional(__S(864, __c54, 0)),
          StoppedActions: S.optional(__S(672, __c42, 0)),
          InstanceRoleArn: S.optional(S.String),
          CertificateConfiguration: S.optional(__S(1072, __c67, 0)),
          ComputeType: S.optional(S.String),
          AnywhereConfiguration: S.optional(__S(1088, __c68, 0)),
          InstanceRoleCredentialsProvider: S.optional(S.String),
          PlayerGatewayMode: S.optional(S.String),
          PlayerGatewayConfiguration: S.optional(__S(1073, __c67, 1)),
        }),
      ).annotate({ identifier: "FleetAttributes" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Cost: S.optional(S.String) })).annotate({
        identifier: "AnywhereConfiguration",
      });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LaunchPath: S.optional(S.String),
          Parameters: S.optional(S.String),
          ConcurrentExecutions: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ServerProcess" });
    case 1:
      return S.Array(__S(1104, __c69, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ServerProcesses: S.optional(__S(1105, __c69, 1)),
          MaxConcurrentGameSessionActivations: S.optional(S.Number),
          GameSessionActivationTimeoutSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RuntimeConfiguration" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetId: S.optional(S.String), Locations: S.optional(__S(881, __c55, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateFleetLocationsInput" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          FleetArn: S.optional(S.String),
          LocationStates: S.optional(__S(912, __c57, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "CreateFleetLocationsOutput" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LaunchTemplateId: S.optional(S.String),
          LaunchTemplateName: S.optional(S.String),
          Version: S.optional(S.String),
        }),
      ).annotate({ identifier: "LaunchTemplateSpecification" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EstimatedInstanceWarmup: S.optional(S.Number),
          TargetTrackingConfiguration: S.optional(__S(1200, __c75, 0)),
        }),
      ).annotate({ identifier: "GameServerGroupAutoScalingPolicy" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          GameServerGroupName: S.optional(S.String),
          RoleArn: S.optional(S.String),
          MinSize: S.optional(S.Number),
          MaxSize: S.optional(S.Number),
          LaunchTemplate: S.optional(__S(1152, __c72, 0)),
          InstanceDefinitions: S.optional(__S(1185, __c74, 1)),
          AutoScalingPolicy: S.optional(__S(1153, __c72, 1)),
          BalancingStrategy: S.optional(S.String),
          GameServerProtectionPolicy: S.optional(S.String),
          VpcSubnets: S.optional(__S(864, __c54, 0)),
          Tags: S.optional(__S(737, __c46, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateGameServerGroupInput" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GameServerGroup: S.optional(__S(1186, __c74, 2)) }).pipe(ns),
      ).annotate({ identifier: "CreateGameServerGroupOutput" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceType: S.optional(S.String), WeightedCapacity: S.optional(S.String) }),
      ).annotate({ identifier: "InstanceDefinition" });
    case 1:
      return S.Array(__S(1184, __c74, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          GameServerGroupName: S.optional(S.String),
          GameServerGroupArn: S.optional(S.String),
          RoleArn: S.optional(S.String),
          InstanceDefinitions: S.optional(__S(1185, __c74, 1)),
          BalancingStrategy: S.optional(S.String),
          GameServerProtectionPolicy: S.optional(S.String),
          AutoScalingGroupArn: S.optional(S.String),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          SuspendedActions: S.optional(__S(672, __c42, 0)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GameServerGroup" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ TargetValue: S.optional(S.Number) })).annotate({
        identifier: "TargetTrackingConfiguration",
      });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          AliasId: S.optional(S.String),
          MaximumPlayerSessionCount: S.optional(S.Number),
          Name: S.optional(S.String),
          GameProperties: S.optional(__S(1249, __c78, 1)),
          CreatorId: S.optional(S.String),
          GameSessionId: S.optional(S.String),
          IdempotencyToken: S.optional(S.String),
          GameSessionData: S.optional(SensitiveString),
          Location: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateGameSessionInput" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GameSession: S.optional(__S(1264, __c79, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateGameSessionOutput" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(SensitiveString) }),
      ).annotate({ identifier: "GameProperty" });
    case 1:
      return S.Array(__S(1248, __c78, 0));
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GameSessionId: S.optional(S.String),
          Name: S.optional(S.String),
          FleetId: S.optional(S.String),
          FleetArn: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TerminationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CurrentPlayerSessionCount: S.optional(S.Number),
          MaximumPlayerSessionCount: S.optional(S.Number),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          GameProperties: S.optional(__S(1249, __c78, 1)),
          IpAddress: S.optional(SensitiveString),
          DnsName: S.optional(S.String),
          Port: S.optional(S.Number),
          PlayerSessionCreationPolicy: S.optional(S.String),
          CreatorId: S.optional(S.String),
          GameSessionData: S.optional(SensitiveString),
          MatchmakerData: S.optional(SensitiveString),
          Location: S.optional(S.String),
          ComputeName: S.optional(S.String),
          PlayerGatewayStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "GameSession" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          TimeoutInSeconds: S.optional(S.Number),
          PlayerLatencyPolicies: S.optional(__S(1313, __c82, 1)),
          Destinations: S.optional(__S(1315, __c82, 3)),
          FilterConfiguration: S.optional(__S(1316, __c82, 4)),
          PriorityConfiguration: S.optional(__S(1317, __c82, 5)),
          CustomEventData: S.optional(SensitiveString),
          NotificationTarget: S.optional(S.String),
          Tags: S.optional(__S(737, __c46, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateGameSessionQueueInput" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GameSessionQueue: S.optional(__S(1318, __c82, 6)) }).pipe(ns),
      ).annotate({ identifier: "CreateGameSessionQueueOutput" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaximumIndividualPlayerLatencyMilliseconds: S.optional(S.Number),
          PolicyDurationSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "PlayerLatencyPolicy" });
    case 1:
      return S.Array(__S(1312, __c82, 0));
    case 2:
      return S.suspend(() => S.Struct({ DestinationArn: S.optional(S.String) })).annotate({
        identifier: "GameSessionQueueDestination",
      });
    case 3:
      return S.Array(__S(1314, __c82, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ AllowedLocations: S.optional(__S(864, __c54, 0)) }),
      ).annotate({ identifier: "FilterConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          PriorityOrder: S.optional(__S(672, __c42, 0)),
          LocationOrder: S.optional(__S(864, __c54, 0)),
        }),
      ).annotate({ identifier: "PriorityConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          GameSessionQueueArn: S.optional(S.String),
          TimeoutInSeconds: S.optional(S.Number),
          PlayerLatencyPolicies: S.optional(__S(1313, __c82, 1)),
          Destinations: S.optional(__S(1315, __c82, 3)),
          FilterConfiguration: S.optional(__S(1316, __c82, 4)),
          PriorityConfiguration: S.optional(__S(1317, __c82, 5)),
          CustomEventData: S.optional(SensitiveString),
          NotificationTarget: S.optional(S.String),
        }),
      ).annotate({ identifier: "GameSessionQueue" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LocationName: S.optional(S.String), Tags: S.optional(__S(737, __c46, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateLocationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Location: S.optional(__S(1346, __c84, 2)) }).pipe(ns),
      ).annotate({ identifier: "CreateLocationOutput" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Domain: S.optional(S.String), Port: S.optional(S.Number) }),
      ).annotate({ identifier: "UDPEndpoint" });
    case 1:
      return S.suspend(() => S.Struct({ UDPEndpoint: S.optional(__S(1344, __c84, 0)) })).annotate({
        identifier: "PingBeacon",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          LocationName: S.optional(S.String),
          LocationArn: S.optional(S.String),
          PingBeacon: S.optional(__S(1345, __c84, 1)),
        }),
      ).annotate({ identifier: "LocationModel" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          GameSessionQueueArns: S.optional(__S(864, __c54, 0)),
          RequestTimeoutSeconds: S.optional(S.Number),
          AcceptanceTimeoutSeconds: S.optional(S.Number),
          AcceptanceRequired: S.optional(S.Boolean),
          RuleSetName: S.optional(S.String),
          NotificationTarget: S.optional(S.String),
          AdditionalPlayerCount: S.optional(S.Number),
          CustomEventData: S.optional(SensitiveString),
          GameProperties: S.optional(__S(1249, __c78, 1)),
          GameSessionData: S.optional(SensitiveString),
          BackfillMode: S.optional(S.String),
          FlexMatchMode: S.optional(S.String),
          Tags: S.optional(__S(737, __c46, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateMatchmakingConfigurationInput" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Configuration: S.optional(__S(1392, __c87, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateMatchmakingConfigurationOutput" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          ConfigurationArn: S.optional(S.String),
          Description: S.optional(S.String),
          GameSessionQueueArns: S.optional(__S(864, __c54, 0)),
          RequestTimeoutSeconds: S.optional(S.Number),
          AcceptanceTimeoutSeconds: S.optional(S.Number),
          AcceptanceRequired: S.optional(S.Boolean),
          RuleSetName: S.optional(S.String),
          RuleSetArn: S.optional(S.String),
          NotificationTarget: S.optional(S.String),
          AdditionalPlayerCount: S.optional(S.Number),
          CustomEventData: S.optional(SensitiveString),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          GameProperties: S.optional(__S(1249, __c78, 1)),
          GameSessionData: S.optional(SensitiveString),
          BackfillMode: S.optional(S.String),
          FlexMatchMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "MatchmakingConfiguration" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          RuleSetBody: S.optional(S.String),
          Tags: S.optional(__S(737, __c46, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateMatchmakingRuleSetInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RuleSet: S.optional(__S(1424, __c89, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateMatchmakingRuleSetOutput" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleSetName: S.optional(S.String),
          RuleSetArn: S.optional(S.String),
          RuleSetBody: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "MatchmakingRuleSet" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GameSessionId: S.optional(S.String),
          PlayerId: S.optional(SensitiveString),
          PlayerData: S.optional(SensitiveString),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePlayerSessionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ PlayerSession: S.optional(__S(1456, __c91, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreatePlayerSessionOutput" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PlayerSessionId: S.optional(S.String),
          PlayerId: S.optional(SensitiveString),
          GameSessionId: S.optional(S.String),
          FleetId: S.optional(S.String),
          FleetArn: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TerminationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          IpAddress: S.optional(SensitiveString),
          DnsName: S.optional(S.String),
          Port: S.optional(S.Number),
          PlayerData: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "PlayerSession" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          GameSessionId: S.optional(S.String),
          PlayerIds: S.optional(__S(624, __c39, 0)),
          PlayerDataMap: S.optional(__S(1472, __c92, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePlayerSessionsInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({ PlayerSessions: S.optional(__S(1488, __c93, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreatePlayerSessionsOutput" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1456, __c91, 0));
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Version: S.optional(S.String),
          StorageLocation: S.optional(__S(800, __c50, 0)),
          ZipFile: S.optional(T.Blob),
          Tags: S.optional(__S(737, __c46, 1)),
          NodeJsVersion: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateScriptInput" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScriptId: S.optional(S.String),
          ScriptArn: S.optional(S.String),
          Name: S.optional(S.String),
          Version: S.optional(S.String),
          SizeOnDisk: S.optional(S.Number),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StorageLocation: S.optional(__S(800, __c50, 0)),
          NodeJsVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "Script" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Script: S.optional(__S(1520, __c95, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateScriptOutput" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GameLiftAwsAccountId: S.optional(S.String),
          PeerVpcId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateVpcPeeringAuthorizationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ VpcPeeringAuthorization: S.optional(__S(1568, __c98, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateVpcPeeringAuthorizationOutput" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GameLiftAwsAccountId: S.optional(S.String),
          PeerVpcAwsAccountId: S.optional(S.String),
          PeerVpcId: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExpirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "VpcPeeringAuthorization" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          PeerVpcAwsAccountId: S.optional(S.String),
          PeerVpcId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateVpcPeeringConnectionInput" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AliasId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAliasInput" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BuildId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteBuildInput" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteContainerFleetInput" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          VersionNumber: S.optional(S.Number),
          VersionCountToRetain: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteContainerGroupDefinitionInput" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteFleetInput" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetId: S.optional(S.String), Locations: S.optional(__S(864, __c54, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteFleetLocationsInput" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GameServerGroupName: S.optional(S.String),
          DeleteOption: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteGameServerGroupInput" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteGameSessionQueueInput" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LocationName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLocationInput" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteMatchmakingConfigurationInput" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteMatchmakingRuleSetInput" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), FleetId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteScalingPolicyInput" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ScriptId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteScriptInput" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GameLiftAwsAccountId: S.optional(S.String),
          PeerVpcId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteVpcPeeringAuthorizationInput" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          VpcPeeringConnectionId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteVpcPeeringConnectionInput" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetId: S.optional(S.String), ComputeName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeregisterComputeInput" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GameServerGroupName: S.optional(S.String),
          GameServerId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeregisterGameServerInput" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AliasId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAliasInput" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BuildId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeBuildInput" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Build: S.optional(__S(816, __c51, 0)) }).pipe(ns)).annotate(
        { identifier: "DescribeBuildOutput" },
      );
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetId: S.optional(S.String), ComputeName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeComputeInput" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Compute: S.optional(__S(1968, __c123, 0)) }).pipe(ns),
      ).annotate({ identifier: "DescribeComputeOutput" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContainerName: S.optional(S.String), ContainerRuntimeId: S.optional(S.String) }),
      ).annotate({ identifier: "ContainerAttribute" });
    case 1:
      return S.Array(__S(1952, __c122, 0));
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          FleetArn: S.optional(S.String),
          ComputeName: S.optional(S.String),
          ComputeArn: S.optional(S.String),
          IpAddress: S.optional(SensitiveString),
          DnsName: S.optional(S.String),
          ComputeStatus: S.optional(S.String),
          Location: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          OperatingSystem: S.optional(S.String),
          Type: S.optional(S.String),
          GameLiftServiceSdkEndpoint: S.optional(S.String),
          GameLiftAgentEndpoint: S.optional(S.String),
          InstanceId: S.optional(S.String),
          ContainerAttributes: S.optional(__S(1953, __c122, 1)),
          GameServerContainerGroupDefinitionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Compute" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeContainerFleetInput" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), VersionNumber: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeContainerGroupDefinitionInput" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          ContainerGroupType: S.optional(S.String),
          ComputeName: S.optional(S.String),
          InstanceId: S.optional(S.String),
          ContainerName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeContainerGroupPortMappingsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ContainerPort: S.optional(S.Number),
          ConnectionPort: S.optional(S.Number),
          Protocol: S.optional(S.String),
        }),
      ).annotate({ identifier: "ContainerPortMapping" });
    case 2:
      return S.Array(__S(2017, __c126, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ContainerName: S.optional(S.String),
          ContainerRuntimeId: S.optional(S.String),
          ContainerPortMappings: S.optional(__S(2018, __c126, 2)),
        }),
      ).annotate({ identifier: "ContainerGroupPortMapping" });
    case 4:
      return S.Array(__S(2019, __c126, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          FleetArn: S.optional(S.String),
          Location: S.optional(S.String),
          ContainerGroupDefinitionArn: S.optional(S.String),
          ContainerGroupType: S.optional(S.String),
          ComputeName: S.optional(S.String),
          InstanceId: S.optional(S.String),
          ContainerGroupPortMappings: S.optional(__S(2020, __c126, 4)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeContainerGroupPortMappingsOutput" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EC2InstanceType: S.optional(S.String), Location: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeEC2InstanceLimitsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EC2InstanceType: S.optional(S.String),
          CurrentInstances: S.optional(S.Number),
          InstanceLimit: S.optional(S.Number),
          Location: S.optional(S.String),
        }),
      ).annotate({ identifier: "EC2InstanceLimit" });
    case 2:
      return S.Array(__S(2033, __c127, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ EC2InstanceLimits: S.optional(__S(2034, __c127, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeEC2InstanceLimitsOutput" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetIds: S.optional(__S(864, __c54, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeFleetAttributesInput" });
    case 1:
      return S.Array(__S(1074, __c67, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          FleetAttributes: S.optional(__S(2049, __c128, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeFleetAttributesOutput" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetIds: S.optional(__S(864, __c54, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeFleetCapacityInput" });
    case 1:
      return S.Array(__S(2082, __c130, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          FleetCapacity: S.optional(__S(2065, __c129, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeFleetCapacityOutput" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DESIRED: S.optional(S.Number),
          MINIMUM: S.optional(S.Number),
          MAXIMUM: S.optional(S.Number),
          PENDING: S.optional(S.Number),
          ACTIVE: S.optional(S.Number),
          IDLE: S.optional(S.Number),
          TERMINATING: S.optional(S.Number),
        }),
      ).annotate({ identifier: "EC2InstanceCounts" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PENDING: S.optional(S.Number),
          ACTIVE: S.optional(S.Number),
          IDLE: S.optional(S.Number),
          TERMINATING: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GameServerContainerGroupCounts" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          FleetArn: S.optional(S.String),
          InstanceType: S.optional(S.String),
          InstanceCounts: S.optional(__S(2080, __c130, 0)),
          Location: S.optional(S.String),
          GameServerContainerGroupCounts: S.optional(__S(2081, __c130, 1)),
          ManagedCapacityConfiguration: S.optional(__S(2096, __c131, 0)),
        }),
      ).annotate({ identifier: "FleetCapacity" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ZeroCapacityStrategy: S.optional(S.String),
          ScaleInAfterInactivityMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ManagedCapacityConfiguration" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetId: S.optional(S.String), DeploymentId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeFleetDeploymentInput" });
    case 1:
      return S.suspend(() => S.Struct({ DeploymentStatus: S.optional(S.String) })).annotate({
        identifier: "LocationalDeployment",
      });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(2113, __c132, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          FleetDeployment: S.optional(__S(2128, __c133, 0)),
          LocationalDeployments: S.optional(__S(2114, __c132, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeFleetDeploymentOutput" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeploymentId: S.optional(S.String),
          FleetId: S.optional(S.String),
          GameServerBinaryArn: S.optional(S.String),
          RollbackGameServerBinaryArn: S.optional(S.String),
          PerInstanceBinaryArn: S.optional(S.String),
          RollbackPerInstanceBinaryArn: S.optional(S.String),
          DeploymentStatus: S.optional(S.String),
          DeploymentConfiguration: S.optional(__S(2144, __c134, 0)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "FleetDeployment" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProtectionStrategy: S.optional(S.String),
          MinimumHealthyPercentage: S.optional(S.Number),
          ImpairmentStrategy: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeploymentConfiguration" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeFleetEventsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EventId: S.optional(S.String),
          ResourceId: S.optional(S.String),
          EventCode: S.optional(S.String),
          Message: S.optional(S.String),
          EventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PreSignedLogUrl: S.optional(S.String),
          Count: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Event" });
    case 2:
      return S.Array(__S(2161, __c135, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Events: S.optional(__S(2162, __c135, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeFleetEventsOutput" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          Locations: S.optional(__S(864, __c54, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeFleetLocationAttributesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LocationState: S.optional(__S(896, __c56, 0)),
          StoppedActions: S.optional(__S(672, __c42, 0)),
          UpdateStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "LocationAttributes" });
    case 2:
      return S.Array(__S(2177, __c136, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          FleetArn: S.optional(S.String),
          LocationAttributes: S.optional(__S(2178, __c136, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeFleetLocationAttributesOutput" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetId: S.optional(S.String), Location: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeFleetLocationCapacityInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ FleetCapacity: S.optional(__S(2082, __c130, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeFleetLocationCapacityOutput" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetId: S.optional(S.String), Location: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeFleetLocationUtilizationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ FleetUtilization: S.optional(__S(2224, __c139, 0)) }).pipe(ns),
      ).annotate({ identifier: "DescribeFleetLocationUtilizationOutput" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          FleetArn: S.optional(S.String),
          ActiveServerProcessCount: S.optional(S.Number),
          ActiveGameSessionCount: S.optional(S.Number),
          CurrentPlayerSessionCount: S.optional(S.Number),
          MaximumPlayerSessionCount: S.optional(S.Number),
          Location: S.optional(S.String),
        }),
      ).annotate({ identifier: "FleetUtilization" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetId: S.optional(S.String), Location: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeFleetPortSettingsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          FleetArn: S.optional(S.String),
          InboundPermissions: S.optional(__S(945, __c59, 1)),
          UpdateStatus: S.optional(S.String),
          Location: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeFleetPortSettingsOutput" });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetIds: S.optional(__S(864, __c54, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeFleetUtilizationInput" });
    case 1:
      return S.Array(__S(2224, __c139, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          FleetUtilization: S.optional(__S(2257, __c141, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeFleetUtilizationOutput" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GameServerGroupName: S.optional(S.String),
          GameServerId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeGameServerInput" });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GameServerGroupName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeGameServerGroupInput" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GameServerGroupName: S.optional(S.String),
          InstanceIds: S.optional(__S(864, __c54, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeGameServerInstancesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GameServerGroupName: S.optional(S.String),
          GameServerGroupArn: S.optional(S.String),
          InstanceId: S.optional(S.String),
          InstanceStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "GameServerInstance" });
    case 2:
      return S.Array(__S(2305, __c144, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          GameServerInstances: S.optional(__S(2306, __c144, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeGameServerInstancesOutput" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          GameSessionId: S.optional(S.String),
          AliasId: S.optional(S.String),
          Location: S.optional(S.String),
          StatusFilter: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeGameSessionDetailsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GameSession: S.optional(__S(1264, __c79, 0)),
          ProtectionPolicy: S.optional(S.String),
        }),
      ).annotate({ identifier: "GameSessionDetail" });
    case 2:
      return S.Array(__S(2321, __c145, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          GameSessionDetails: S.optional(__S(2322, __c145, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeGameSessionDetailsOutput" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PlacementId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeGameSessionPlacementInput" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PlayerId: S.optional(SensitiveString),
          RegionIdentifier: S.optional(S.String),
          LatencyInMilliseconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "PlayerLatency" });
    case 1:
      return S.Array(__S(2352, __c147, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          PlacementFallbackStrategy: S.optional(S.String),
          LocationOrder: S.optional(__S(864, __c54, 0)),
        }),
      ).annotate({ identifier: "PriorityConfigurationOverride" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          PlacementId: S.optional(S.String),
          GameSessionQueueName: S.optional(S.String),
          Status: S.optional(S.String),
          GameProperties: S.optional(__S(1249, __c78, 1)),
          MaximumPlayerSessionCount: S.optional(S.Number),
          GameSessionName: S.optional(S.String),
          GameSessionId: S.optional(S.String),
          GameSessionArn: S.optional(S.String),
          GameSessionRegion: S.optional(S.String),
          PlayerLatencies: S.optional(__S(2353, __c147, 1)),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IpAddress: S.optional(SensitiveString),
          DnsName: S.optional(S.String),
          Port: S.optional(S.Number),
          PlacedPlayerSessions: S.optional(__S(2369, __c148, 1)),
          GameSessionData: S.optional(SensitiveString),
          MatchmakerData: S.optional(SensitiveString),
          PriorityConfigurationOverride: S.optional(__S(2354, __c147, 2)),
          PlayerGatewayStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "GameSessionPlacement" });
    case 4:
      return S.suspend(() =>
        S.Struct({ GameSessionPlacement: S.optional(__S(2355, __c147, 3)) }).pipe(ns),
      ).annotate({ identifier: "DescribeGameSessionPlacementOutput" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PlayerId: S.optional(SensitiveString), PlayerSessionId: S.optional(S.String) }),
      ).annotate({ identifier: "PlacedPlayerSession" });
    case 1:
      return S.Array(__S(2368, __c148, 0));
  }
}
function __c149(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Names: S.optional(__S(864, __c54, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeGameSessionQueuesInput" });
    case 1:
      return S.Array(__S(1318, __c82, 6));
    case 2:
      return S.suspend(() =>
        S.Struct({
          GameSessionQueues: S.optional(__S(2385, __c149, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeGameSessionQueuesOutput" });
  }
}
function __c150(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          GameSessionId: S.optional(S.String),
          AliasId: S.optional(S.String),
          Location: S.optional(S.String),
          StatusFilter: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeGameSessionsInput" });
  }
}
function __c151(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1264, __c79, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          GameSessions: S.optional(__S(2416, __c151, 0)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeGameSessionsOutput" });
  }
}
function __c152(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          InstanceId: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Location: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeInstancesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          FleetArn: S.optional(S.String),
          InstanceId: S.optional(S.String),
          IpAddress: S.optional(SensitiveString),
          DnsName: S.optional(S.String),
          OperatingSystem: S.optional(S.String),
          Type: S.optional(S.String),
          Status: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Location: S.optional(S.String),
        }),
      ).annotate({ identifier: "Instance" });
    case 2:
      return S.Array(__S(2433, __c152, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Instances: S.optional(__S(2434, __c152, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeInstancesOutput" });
  }
}
function __c153(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TicketIds: S.optional(__S(864, __c54, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeMatchmakingInput" });
    case 1:
      return S.Array(__S(2470, __c154, 6));
    case 2:
      return S.suspend(() =>
        S.Struct({ TicketList: S.optional(__S(2449, __c153, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeMatchmakingOutput" });
  }
}
function __c154(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          S: S.optional(S.String),
          N: S.optional(S.Number),
          SL: S.optional(__S(864, __c54, 0)),
          SDM: S.optional(__S(2464, __c154, 0)),
        }),
      ).annotate({ identifier: "AttributeValue" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(2465, __c154, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          PlayerId: S.optional(SensitiveString),
          PlayerAttributes: S.optional(__S(2466, __c154, 2)),
          Team: S.optional(S.String),
          LatencyInMs: S.optional(__S(2464, __c154, 0)),
        }),
      ).annotate({ identifier: "Player" });
    case 4:
      return S.Array(__S(2467, __c154, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          GameSessionArn: S.optional(S.String),
          IpAddress: S.optional(SensitiveString),
          DnsName: S.optional(S.String),
          Port: S.optional(S.Number),
          MatchedPlayerSessions: S.optional(__S(2369, __c148, 1)),
          PlayerGatewayStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "GameSessionConnectionInfo" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          TicketId: S.optional(S.String),
          ConfigurationName: S.optional(S.String),
          ConfigurationArn: S.optional(S.String),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Players: S.optional(__S(2468, __c154, 4)),
          GameSessionConnectionInfo: S.optional(__S(2469, __c154, 5)),
          EstimatedWaitTime: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MatchmakingTicket" });
  }
}
function __c155(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Names: S.optional(__S(864, __c54, 0)),
          RuleSetName: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeMatchmakingConfigurationsInput" });
    case 1:
      return S.Array(__S(1392, __c87, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Configurations: S.optional(__S(2481, __c155, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeMatchmakingConfigurationsOutput" });
  }
}
function __c156(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Names: S.optional(__S(864, __c54, 0)),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeMatchmakingRuleSetsInput" });
    case 1:
      return S.Array(__S(1424, __c89, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          RuleSets: S.optional(__S(2497, __c156, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeMatchmakingRuleSetsOutput" });
  }
}
function __c157(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GameSessionId: S.optional(S.String),
          PlayerId: S.optional(SensitiveString),
          PlayerSessionId: S.optional(S.String),
          PlayerSessionStatusFilter: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribePlayerSessionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PlayerSessions: S.optional(__S(1488, __c93, 0)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribePlayerSessionsOutput" });
  }
}
function __c158(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeRuntimeConfigurationInput" });
  }
}
function __c159(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuntimeConfiguration: S.optional(__S(1106, __c69, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeRuntimeConfigurationOutput" });
  }
}
function __c160(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          StatusFilter: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Location: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeScalingPoliciesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          FleetArn: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          ScalingAdjustment: S.optional(S.Number),
          ScalingAdjustmentType: S.optional(S.String),
          ComparisonOperator: S.optional(S.String),
          Threshold: S.optional(S.Number),
          EvaluationPeriods: S.optional(S.Number),
          MetricName: S.optional(S.String),
          PolicyType: S.optional(S.String),
          TargetConfiguration: S.optional(__S(1200, __c75, 0)),
          UpdateStatus: S.optional(S.String),
          Location: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScalingPolicy" });
    case 2:
      return S.Array(__S(2561, __c160, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ScalingPolicies: S.optional(__S(2562, __c160, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeScalingPoliciesOutput" });
  }
}
function __c161(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ScriptId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeScriptInput" });
  }
}
function __c162(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeVpcPeeringAuthorizationsInput" });
    case 1:
      return S.Array(__S(1568, __c98, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ VpcPeeringAuthorizations: S.optional(__S(2593, __c162, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeVpcPeeringAuthorizationsOutput" });
  }
}
function __c163(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeVpcPeeringConnectionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(S.String), Message: S.optional(S.String) }),
      ).annotate({ identifier: "VpcPeeringConnectionStatus" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          FleetArn: S.optional(S.String),
          IpV4CidrBlock: S.optional(S.String),
          VpcPeeringConnectionId: S.optional(S.String),
          Status: S.optional(__S(2609, __c163, 1)),
          PeerVpcId: S.optional(S.String),
          GameLiftVpcId: S.optional(S.String),
        }),
      ).annotate({ identifier: "VpcPeeringConnection" });
    case 3:
      return S.Array(__S(2610, __c163, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ VpcPeeringConnections: S.optional(__S(2611, __c163, 3)) }).pipe(ns),
      ).annotate({ identifier: "DescribeVpcPeeringConnectionsOutput" });
  }
}
function __c164(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetId: S.optional(S.String), ComputeName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetComputeAccessInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          FleetArn: S.optional(S.String),
          ComputeName: S.optional(S.String),
          ComputeArn: S.optional(S.String),
          Credentials: S.optional(__S(832, __c52, 0)),
          Target: S.optional(S.String),
          ContainerIdentifiers: S.optional(__S(1953, __c122, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "GetComputeAccessOutput" });
  }
}
function __c165(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetId: S.optional(S.String), ComputeName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetComputeAuthTokenInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          FleetArn: S.optional(S.String),
          ComputeName: S.optional(S.String),
          ComputeArn: S.optional(S.String),
          AuthToken: S.optional(S.String),
          ExpirationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "GetComputeAuthTokenOutput" });
  }
}
function __c166(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GameSessionId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetGameSessionLogUrlInput" });
    case 1:
      return S.suspend(() => S.Struct({ PreSignedUrl: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "GetGameSessionLogUrlOutput",
      });
  }
}
function __c167(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetId: S.optional(S.String), InstanceId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetInstanceAccessInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ UserName: S.optional(S.String), Secret: S.optional(S.String) }),
      ).annotate({ identifier: "InstanceCredentials" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          InstanceId: S.optional(S.String),
          IpAddress: S.optional(SensitiveString),
          OperatingSystem: S.optional(S.String),
          Credentials: S.optional(__S(2673, __c167, 1)),
        }),
      ).annotate({ identifier: "InstanceAccess" });
    case 3:
      return S.suspend(() =>
        S.Struct({ InstanceAccess: S.optional(__S(2674, __c167, 2)) }).pipe(ns),
      ).annotate({ identifier: "GetInstanceAccessOutput" });
  }
}
function __c168(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GameSessionId: S.optional(S.String),
          PlayerIds: S.optional(__S(624, __c39, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetPlayerConnectionDetailsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ IpAddress: S.optional(SensitiveString), Port: S.optional(S.Number) }),
      ).annotate({ identifier: "PlayerConnectionEndpoint" });
    case 2:
      return S.Array(__S(2689, __c168, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          PlayerId: S.optional(SensitiveString),
          Endpoints: S.optional(__S(2690, __c168, 2)),
          PlayerGatewayToken: S.optional(S.String),
          Expiration: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PlayerConnectionDetail" });
    case 4:
      return S.Array(__S(2691, __c168, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          GameSessionId: S.optional(S.String),
          PlayerConnectionDetails: S.optional(__S(2692, __c168, 4)),
        }).pipe(ns),
      ).annotate({ identifier: "GetPlayerConnectionDetailsOutput" });
  }
}
function __c169(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RoutingStrategyType: S.optional(S.String),
          Name: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAliasesInput" });
    case 1:
      return S.Array(__S(769, __c48, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Aliases: S.optional(__S(2705, __c169, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListAliasesOutput" });
  }
}
function __c170(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListBuildsInput" });
    case 1:
      return S.Array(__S(816, __c51, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Builds: S.optional(__S(2721, __c170, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListBuildsOutput" });
  }
}
function __c171(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          Location: S.optional(S.String),
          ContainerGroupDefinitionName: S.optional(S.String),
          ComputeStatus: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListComputeInput" });
    case 1:
      return S.Array(__S(1968, __c123, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ComputeList: S.optional(__S(2737, __c171, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListComputeOutput" });
  }
}
function __c172(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContainerGroupDefinitionName: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListContainerFleetsInput" });
    case 1:
      return S.Array(__S(979, __c61, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ContainerFleets: S.optional(__S(2753, __c172, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListContainerFleetsOutput" });
  }
}
function __c173(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContainerGroupType: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListContainerGroupDefinitionsInput" });
  }
}
function __c174(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1054, __c65, 14));
    case 1:
      return S.suspend(() =>
        S.Struct({
          ContainerGroupDefinitions: S.optional(__S(2784, __c174, 0)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListContainerGroupDefinitionsOutput" });
  }
}
function __c175(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListContainerGroupDefinitionVersionsInput" });
  }
}
function __c176(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetId: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFleetDeploymentsInput" });
    case 1:
      return S.Array(__S(2128, __c133, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          FleetDeployments: S.optional(__S(2817, __c176, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListFleetDeploymentsOutput" });
  }
}
function __c177(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BuildId: S.optional(S.String),
          ScriptId: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFleetsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FleetIds: S.optional(__S(864, __c54, 0)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListFleetsOutput" });
  }
}
function __c178(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Limit: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListGameServerGroupsInput" });
    case 1:
      return S.Array(__S(1186, __c74, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          GameServerGroups: S.optional(__S(2849, __c178, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListGameServerGroupsOutput" });
  }
}
function __c179(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GameServerGroupName: S.optional(S.String),
          SortOrder: S.optional(S.String),
          Limit: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListGameServersInput" });
    case 1:
      return S.Array(__S(704, __c44, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          GameServers: S.optional(__S(2865, __c179, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListGameServersOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
