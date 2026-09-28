import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "GameLift",
  target: "GameLift",
  version: "2015-10-01",
  sigv4: "gamelift",
  protocol: awsJson1_1Protocol,
  xmlns: "http://gamelift.amazonaws.com/doc/",
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
                `https://gamelift-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://gamelift-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://gamelift.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://gamelift.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException")<{
    readonly message?: string;
  }> {}
export class FleetCapacityExceededException
  extends /*@__PURE__*/ TE.TaggedError("FleetCapacityExceededException")<{
    readonly message?: string;
  }> {}
export class GameSessionFullException
  extends /*@__PURE__*/ TE.TaggedError("GameSessionFullException")<{
    readonly message?: string;
  }> {}
export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ TE.TaggedError("IdempotentParameterMismatchException")<{
    readonly message?: string;
  }> {}
export class InternalServiceException
  extends /*@__PURE__*/ TE.TaggedError("InternalServiceException")<{
    readonly message?: string;
  }> {}
export class InvalidFleetStatusException
  extends /*@__PURE__*/ TE.TaggedError("InvalidFleetStatusException")<{
    readonly message?: string;
  }> {}
export class InvalidGameSessionStatusException
  extends /*@__PURE__*/ TE.TaggedError("InvalidGameSessionStatusException")<{
    readonly message?: string;
  }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError("InvalidRequestException")<{
    readonly message?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message?: string;
  }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError("NotFoundException")<{
    readonly message?: string;
  }> {}
export class NotReadyException
  extends /*@__PURE__*/ TE.TaggedError("NotReadyException")<{
    readonly message?: string;
  }> {}
export class OutOfCapacityException
  extends /*@__PURE__*/ TE.TaggedError("OutOfCapacityException")<{
    readonly message?: string;
  }> {}
export class TaggingFailedException
  extends /*@__PURE__*/ TE.TaggedError("TaggingFailedException")<{
    readonly message?: string;
  }> {}
export class TerminalRoutingStrategyException
  extends /*@__PURE__*/ TE.TaggedError("TerminalRoutingStrategyException")<{
    readonly message?: string;
  }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"])<{
    readonly message?: string;
  }> {}
export class UnsupportedRegionException
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedRegionException")<{
    readonly message?: string;
  }> {}
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
export type GameServerUtilizationStatus =
  | "AVAILABLE"
  | "UTILIZED"
  | (string & {});
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
export type ProtectionPolicy =
  | "NoProtection"
  | "FullProtection"
  | (string & {});
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
export type PlayerGatewayMode =
  | "DISABLED"
  | "ENABLED"
  | "REQUIRED"
  | (string & {});
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
export type ContainerFleetLocationAttributesList =
  ContainerFleetLocationAttributes[];
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
    InstanceConnectionPortRange: ConnectionPortRange & {
      FromPort: PortNumber;
      ToPort: PortNumber;
    };
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
export type ContainerMountPointAccessLevel =
  | "READ_ONLY"
  | "READ_AND_WRITE"
  | (string & {});
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
export type SupportContainerDefinitionInputList =
  SupportContainerDefinitionInput[];
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
export type ContainerGroupDefinitionStatus =
  | "READY"
  | "COPYING"
  | "FAILED"
  | (string & {});
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
      MountPoints: (ContainerMountPoint & {
        InstancePath: InstancePathString;
      })[];
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
      MountPoints: (ContainerMountPoint & {
        InstancePath: InstancePathString;
      })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      HealthCheck: ContainerHealthCheck & {
        Command: ContainerCommandStringList;
      };
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
export type InstanceRoleCredentialsProvider =
  | "SHARED_CREDENTIAL_FILE"
  | (string & {});
export type GameServerIpProtocolSupported =
  | "IPv4"
  | "DUAL_STACK"
  | (string & {});
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
    CertificateConfiguration: CertificateConfiguration & {
      CertificateType: CertificateType;
    };
    AnywhereConfiguration: AnywhereConfiguration & {
      Cost: NonNegativeLimitedLengthDouble;
    };
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
export type BalancingStrategy =
  | "SPOT_ONLY"
  | "SPOT_PREFERRED"
  | "ON_DEMAND_ONLY"
  | (string & {});
export type GameServerProtectionPolicy =
  | "NO_PROTECTION"
  | "FULL_PROTECTION"
  | (string & {});
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
    InstanceDefinitions: (InstanceDefinition & {
      InstanceType: GameServerGroupInstanceType;
    })[];
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
export type PlayerSessionCreationPolicy =
  | "ACCEPT_ALL"
  | "DENY_ALL"
  | (string & {});
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
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
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
export type PriorityType =
  | "LATENCY"
  | "COST"
  | "DESTINATION"
  | "LOCATION"
  | (string & {});
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
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
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
export type PlayerSessionStatus =
  | "RESERVED"
  | "ACTIVE"
  | "COMPLETED"
  | "TIMEDOUT"
  | (string & {});
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
export type PlayerDataMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export interface CreatePlayerSessionsInput {
  GameSessionId?: string;
  PlayerIds?: (string | redacted.Redacted<string>)[];
  PlayerDataMap?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
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
export type GameServerGroupDeleteOption =
  | "SAFE_DELETE"
  | "FORCE_DELETE"
  | "RETAIN"
  | (string & {});
export interface DeleteGameServerGroupInput {
  GameServerGroupName?: string;
  DeleteOption?: GameServerGroupDeleteOption;
}
export interface DeleteGameServerGroupOutput {
  GameServerGroup?: GameServerGroup & {
    InstanceDefinitions: (InstanceDefinition & {
      InstanceType: GameServerGroupInstanceType;
    })[];
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
export type ComputeStatus =
  | "PENDING"
  | "ACTIVE"
  | "TERMINATING"
  | "IMPAIRED"
  | (string & {});
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
    InstanceConnectionPortRange: ConnectionPortRange & {
      FromPort: PortNumber;
      ToPort: PortNumber;
    };
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
      MountPoints: (ContainerMountPoint & {
        InstancePath: InstancePathString;
      })[];
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
      MountPoints: (ContainerMountPoint & {
        InstancePath: InstancePathString;
      })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      HealthCheck: ContainerHealthCheck & {
        Command: ContainerCommandStringList;
      };
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
    CertificateConfiguration: CertificateConfiguration & {
      CertificateType: CertificateType;
    };
    AnywhereConfiguration: AnywhereConfiguration & {
      Cost: NonNegativeLimitedLengthDouble;
    };
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
export type ZeroCapacityStrategy =
  | "MANUAL"
  | "SCALE_TO_AND_FROM_ZERO"
  | (string & {});
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
export type DeploymentProtectionStrategy =
  | "WITH_PROTECTION"
  | "IGNORE_PROTECTION"
  | (string & {});
export type MinimumHealthyPercentage = number;
export type DeploymentImpairmentStrategy =
  | "MAINTAIN"
  | "ROLLBACK"
  | (string & {});
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
export type LocationalDeployments = {
  [key: string]: LocationalDeployment | undefined;
};
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
    InstanceDefinitions: (InstanceDefinition & {
      InstanceType: GameServerGroupInstanceType;
    })[];
  };
}
export type GameServerInstanceIds = string[];
export interface DescribeGameServerInstancesInput {
  GameServerGroupName?: string;
  InstanceIds?: string[];
  Limit?: number;
  NextToken?: string;
}
export type GameServerInstanceStatus =
  | "ACTIVE"
  | "DRAINING"
  | "SPOT_TERMINATING"
  | (string & {});
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
      GameProperties: (GameProperty & {
        Key: GamePropertyKey;
        Value: GamePropertyValue;
      })[];
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
export type PlacementFallbackStrategy =
  | "DEFAULT_AFTER_SINGLE_PASS"
  | "NONE"
  | (string & {});
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
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
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
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
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
export type InstanceStatus =
  | "PENDING"
  | "ACTIVE"
  | "TERMINATING"
  | (string & {});
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
export type PlayerAttributeStringDoubleMap = {
  [key: string]: number | undefined;
};
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
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
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
    InstanceConnectionPortRange: ConnectionPortRange & {
      FromPort: PortNumber;
      ToPort: PortNumber;
    };
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
      MountPoints: (ContainerMountPoint & {
        InstancePath: InstancePathString;
      })[];
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
      MountPoints: (ContainerMountPoint & {
        InstancePath: InstancePathString;
      })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      HealthCheck: ContainerHealthCheck & {
        Command: ContainerCommandStringList;
      };
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
      MountPoints: (ContainerMountPoint & {
        InstancePath: InstancePathString;
      })[];
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
      MountPoints: (ContainerMountPoint & {
        InstancePath: InstancePathString;
      })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      HealthCheck: ContainerHealthCheck & {
        Command: ContainerCommandStringList;
      };
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
    InstanceDefinitions: (InstanceDefinition & {
      InstanceType: GameServerGroupInstanceType;
    })[];
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
    InstanceDefinitions: (InstanceDefinition & {
      InstanceType: GameServerGroupInstanceType;
    })[];
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
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
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
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
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
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
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
    InstanceDefinitions: (InstanceDefinition & {
      InstanceType: GameServerGroupInstanceType;
    })[];
  };
}
export interface TagResourceRequest {
  ResourceARN?: string;
  Tags?: Tag[];
}
export interface TagResourceResponse {}
export type TerminationMode =
  | "TRIGGER_ON_PROCESS_TERMINATE"
  | "FORCE_TERMINATE"
  | (string & {});
export interface TerminateGameSessionInput {
  GameSessionId?: string;
  TerminationMode?: TerminationMode;
}
export interface TerminateGameSessionOutput {
  GameSession?: GameSession & {
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
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
    InstanceConnectionPortRange: ConnectionPortRange & {
      FromPort: PortNumber;
      ToPort: PortNumber;
    };
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
      MountPoints: (ContainerMountPoint & {
        InstancePath: InstancePathString;
      })[];
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
      MountPoints: (ContainerMountPoint & {
        InstancePath: InstancePathString;
      })[];
      EnvironmentOverride: (ContainerEnvironment & {
        Name: NonZeroAnd255MaxString;
        Value: NonZeroAnd255MaxString;
      })[];
      HealthCheck: ContainerHealthCheck & {
        Command: ContainerCommandStringList;
      };
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
    InstanceDefinitions: (InstanceDefinition & {
      InstanceType: GameServerGroupInstanceType;
    })[];
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
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
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
    GameProperties: (GameProperty & {
      Key: GamePropertyKey;
      Value: GamePropertyValue;
    })[];
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
  descriptor: {
    service: svc,
    input: { TicketId: 0, PlayerIds: 0, AcceptanceType: 0 },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptMatch",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      GameServerGroupName: 0,
      GameServerId: 0,
      GameServerData: 0,
      FilterOption: { InstanceStatuses: 0 },
    },
    output: { GameServer: o_GameServer },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      RoutingStrategy: i_RoutingStrategy,
      Tags: D.list(i_Tag),
    },
    output: { Alias: o_Alias },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Version: 0,
      StorageLocation: i_S3Location,
      OperatingSystem: 0,
      Tags: D.list(i_Tag),
      ServerSdkVersion: 0,
    },
    output: { Build: o_Build },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      FleetRoleArn: 0,
      Description: 0,
      GameServerContainerGroupDefinitionName: 0,
      PerInstanceContainerGroupDefinitionName: 0,
      InstanceConnectionPortRange: i_ConnectionPortRange,
      InstanceInboundPermissions: D.list(i_IpPermission),
      GameServerContainerGroupsPerInstance: 0,
      InstanceType: 0,
      BillingType: 0,
      Locations: D.list(i_LocationConfiguration),
      MetricGroups: 0,
      NewGameSessionProtectionPolicy: 0,
      GameSessionCreationLimitPolicy: i_GameSessionCreationLimitPolicy,
      LogConfiguration: i_LogConfiguration,
      Tags: D.list(i_Tag),
      PlayerGatewayMode: 0,
    },
    output: { ContainerFleet: o_ContainerFleet },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      ContainerGroupType: 0,
      TotalMemoryLimitMebibytes: 0,
      TotalVcpuLimit: 0,
      GameServerContainerDefinition: i_GameServerContainerDefinitionInput,
      SupportContainerDefinitions: D.list(i_SupportContainerDefinitionInput),
      OperatingSystem: 0,
      VersionDescription: 0,
      Tags: D.list(i_Tag),
    },
    output: { ContainerGroupDefinition: o_ContainerGroupDefinition },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      BuildId: 0,
      ScriptId: 0,
      ServerLaunchPath: 0,
      ServerLaunchParameters: 0,
      LogPaths: 0,
      EC2InstanceType: 0,
      EC2InboundPermissions: D.list(i_IpPermission),
      NewGameSessionProtectionPolicy: 0,
      RuntimeConfiguration: i_RuntimeConfiguration,
      ResourceCreationLimitPolicy: i_ResourceCreationLimitPolicy,
      MetricGroups: 0,
      PeerVpcAwsAccountId: 0,
      PeerVpcId: 0,
      FleetType: 0,
      InstanceRoleArn: 0,
      CertificateConfiguration: { CertificateType: 0 },
      Locations: D.list(i_LocationConfiguration),
      Tags: D.list(i_Tag),
      ComputeType: 0,
      AnywhereConfiguration: i_AnywhereConfiguration,
      InstanceRoleCredentialsProvider: 0,
      PlayerGatewayMode: 0,
      PlayerGatewayConfiguration: { GameServerIpProtocolSupported: 0 },
    },
    output: { FleetAttributes: o_FleetAttributes },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { FleetId: 0, Locations: D.list(i_LocationConfiguration) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      GameServerGroupName: 0,
      RoleArn: 0,
      MinSize: 0,
      MaxSize: 0,
      LaunchTemplate: {
        LaunchTemplateId: 0,
        LaunchTemplateName: 0,
        Version: 0,
      },
      InstanceDefinitions: D.list(i_InstanceDefinition),
      AutoScalingPolicy: {
        EstimatedInstanceWarmup: 0,
        TargetTrackingConfiguration: { TargetValue: 0 },
      },
      BalancingStrategy: 0,
      GameServerProtectionPolicy: 0,
      VpcSubnets: 0,
      Tags: D.list(i_Tag),
    },
    output: { GameServerGroup: o_GameServerGroup },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      FleetId: 0,
      AliasId: 0,
      MaximumPlayerSessionCount: 0,
      Name: 0,
      GameProperties: D.list(i_GameProperty),
      CreatorId: 0,
      GameSessionId: 0,
      IdempotencyToken: 0,
      GameSessionData: 0,
      Location: 0,
    },
    output: { GameSession: o_GameSession },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      TimeoutInSeconds: 0,
      PlayerLatencyPolicies: D.list(i_PlayerLatencyPolicy),
      Destinations: D.list(i_GameSessionQueueDestination),
      FilterConfiguration: i_FilterConfiguration,
      PriorityConfiguration: i_PriorityConfiguration,
      CustomEventData: 0,
      NotificationTarget: 0,
      Tags: D.list(i_Tag),
    },
    output: { GameSessionQueue: o_GameSessionQueue },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { LocationName: 0, Tags: D.list(i_Tag) } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      GameSessionQueueArns: 0,
      RequestTimeoutSeconds: 0,
      AcceptanceTimeoutSeconds: 0,
      AcceptanceRequired: 0,
      RuleSetName: 0,
      NotificationTarget: 0,
      AdditionalPlayerCount: 0,
      CustomEventData: 0,
      GameProperties: D.list(i_GameProperty),
      GameSessionData: 0,
      BackfillMode: 0,
      FlexMatchMode: 0,
      Tags: D.list(i_Tag),
    },
    output: { Configuration: o_MatchmakingConfiguration },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { Name: 0, RuleSetBody: 0, Tags: D.list(i_Tag) },
    output: { RuleSet: o_MatchmakingRuleSet },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { GameSessionId: 0, PlayerId: 0, PlayerData: 0 },
    output: { PlayerSession: o_PlayerSession },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { GameSessionId: 0, PlayerIds: 0, PlayerDataMap: 0 },
    output: { PlayerSessions: D.list(o_PlayerSession) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Version: 0,
      StorageLocation: i_S3Location,
      ZipFile: 0,
      Tags: D.list(i_Tag),
      NodeJsVersion: 0,
    },
    output: { Script: o_Script },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { GameLiftAwsAccountId: 0, PeerVpcId: 0 },
    output: { VpcPeeringAuthorization: o_VpcPeeringAuthorization },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcPeeringAuthorization",
})) as any;

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
  descriptor: {
    service: svc,
    input: { FleetId: 0, PeerVpcAwsAccountId: 0, PeerVpcId: 0 },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcPeeringConnection",
})) as any;

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
  descriptor: { service: svc, input: { AliasId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { BuildId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { FleetId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { Name: 0, VersionNumber: 0, VersionCountToRetain: 0 },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { FleetId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { FleetId: 0, Locations: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { GameServerGroupName: 0, DeleteOption: 0 },
    output: { GameServerGroup: o_GameServerGroup },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGameServerGroup",
})) as any;

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
  descriptor: { service: svc, input: { Name: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { LocationName: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { Name: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { Name: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { Name: 0, FleetId: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { ScriptId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { GameLiftAwsAccountId: 0, PeerVpcId: 0 },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcPeeringAuthorization",
})) as any;

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
  descriptor: {
    service: svc,
    input: { FleetId: 0, VpcPeeringConnectionId: 0 },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcPeeringConnection",
})) as any;

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
  descriptor: { service: svc, input: { FleetId: 0, ComputeName: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { GameServerGroupName: 0, GameServerId: 0 },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterGameServer",
})) as any;

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
  descriptor: {
    service: svc,
    input: { AliasId: 0 },
    output: { Alias: o_Alias },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAlias",
})) as any;

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
  descriptor: {
    service: svc,
    input: { BuildId: 0 },
    output: { Build: o_Build },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBuild",
})) as any;

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
  descriptor: {
    service: svc,
    input: { FleetId: 0, ComputeName: 0 },
    output: { Compute: o_Compute },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { FleetId: 0 },
    output: { ContainerFleet: o_ContainerFleet },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { Name: 0, VersionNumber: 0 },
    output: { ContainerGroupDefinition: o_ContainerGroupDefinition },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      FleetId: 0,
      ContainerGroupType: 0,
      ComputeName: 0,
      InstanceId: 0,
      ContainerName: 0,
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { EC2InstanceType: 0, Location: 0 } },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEC2InstanceLimits",
})) as any;

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
  descriptor: {
    service: svc,
    input: { FleetIds: 0, Limit: 0, NextToken: 0 },
    output: { FleetAttributes: D.list(o_FleetAttributes) },
  },
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
  descriptor: { service: svc, input: { FleetIds: 0, Limit: 0, NextToken: 0 } },
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
  descriptor: {
    service: svc,
    input: { FleetId: 0, DeploymentId: 0 },
    output: { FleetDeployment: o_FleetDeployment },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { FleetId: 0, StartTime: 0, EndTime: 0, Limit: 0, NextToken: 0 },
    output: { Events: D.list({ EventTime: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    input: { FleetId: 0, Locations: 0, Limit: 0, NextToken: 0 },
  },
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
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "Limit",
  } as const,
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
  descriptor: { service: svc, input: { FleetId: 0, Location: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { FleetId: 0, Location: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { FleetId: 0, Location: 0 },
    output: { InboundPermissions: D.list(o_IpPermission) },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { FleetIds: 0, Limit: 0, NextToken: 0 } },
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
  descriptor: {
    service: svc,
    input: { GameServerGroupName: 0, GameServerId: 0 },
    output: { GameServer: o_GameServer },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGameServer",
})) as any;

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
  descriptor: {
    service: svc,
    input: { GameServerGroupName: 0 },
    output: { GameServerGroup: o_GameServerGroup },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGameServerGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: { GameServerGroupName: 0, InstanceIds: 0, Limit: 0, NextToken: 0 },
  },
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
  descriptor: {
    service: svc,
    input: {
      FleetId: 0,
      GameSessionId: 0,
      AliasId: 0,
      Location: 0,
      StatusFilter: 0,
      Limit: 0,
      NextToken: 0,
    },
    output: { GameSessionDetails: D.list({ GameSession: o_GameSession }) },
  },
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
  descriptor: {
    service: svc,
    input: { PlacementId: 0 },
    output: { GameSessionPlacement: o_GameSessionPlacement },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGameSessionPlacement",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Names: 0, Limit: 0, NextToken: 0 },
    output: { GameSessionQueues: D.list(o_GameSessionQueue) },
  },
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
  descriptor: {
    service: svc,
    input: {
      FleetId: 0,
      GameSessionId: 0,
      AliasId: 0,
      Location: 0,
      StatusFilter: 0,
      Limit: 0,
      NextToken: 0,
    },
    output: { GameSessions: D.list(o_GameSession) },
  },
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
  descriptor: {
    service: svc,
    input: { FleetId: 0, InstanceId: 0, Limit: 0, NextToken: 0, Location: 0 },
    output: { Instances: D.list({ IpAddress: D.secret, CreationTime: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    input: { TicketIds: 0 },
    output: { TicketList: D.list(o_MatchmakingTicket) },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMatchmaking",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Names: 0, RuleSetName: 0, Limit: 0, NextToken: 0 },
    output: { Configurations: D.list(o_MatchmakingConfiguration) },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnsupportedRegionException,
  ],
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
  descriptor: {
    service: svc,
    input: { Names: 0, Limit: 0, NextToken: 0 },
    output: { RuleSets: D.list(o_MatchmakingRuleSet) },
  },
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
  descriptor: {
    service: svc,
    input: {
      GameSessionId: 0,
      PlayerId: 0,
      PlayerSessionId: 0,
      PlayerSessionStatusFilter: 0,
      Limit: 0,
      NextToken: 0,
    },
    output: { PlayerSessions: D.list(o_PlayerSession) },
  },
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
  descriptor: { service: svc, input: { FleetId: 0 } },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRuntimeConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    input: { FleetId: 0, StatusFilter: 0, Limit: 0, NextToken: 0, Location: 0 },
  },
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
  descriptor: {
    service: svc,
    input: { ScriptId: 0 },
    output: { Script: o_Script },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScript",
})) as any;

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
  descriptor: {
    service: svc,
    input: {},
    output: { VpcPeeringAuthorizations: D.list(o_VpcPeeringAuthorization) },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVpcPeeringAuthorizations",
})) as any;

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
  descriptor: { service: svc, input: { FleetId: 0 } },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVpcPeeringConnections",
})) as any;

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
  descriptor: { service: svc, input: { FleetId: 0, ComputeName: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { FleetId: 0, ComputeName: 0 },
    output: { ExpirationTimestamp: D.ts },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { GameSessionId: 0 } },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGameSessionLogUrl",
})) as any;

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
  descriptor: {
    service: svc,
    input: { FleetId: 0, InstanceId: 0 },
    output: { InstanceAccess: { IpAddress: D.secret } },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceAccess",
})) as any;

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
  descriptor: {
    service: svc,
    input: { GameSessionId: 0, PlayerIds: 0 },
    output: {
      PlayerConnectionDetails: D.list({
        PlayerId: D.secret,
        Endpoints: D.list({ IpAddress: D.secret }),
        Expiration: D.ts,
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { RoutingStrategyType: 0, Name: 0, Limit: 0, NextToken: 0 },
    output: { Aliases: D.list(o_Alias) },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
  ],
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
  descriptor: {
    service: svc,
    input: { Status: 0, Limit: 0, NextToken: 0 },
    output: { Builds: D.list(o_Build) },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
  ],
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
  descriptor: {
    service: svc,
    input: {
      FleetId: 0,
      Location: 0,
      ContainerGroupDefinitionName: 0,
      ComputeStatus: 0,
      Limit: 0,
      NextToken: 0,
    },
    output: { ComputeList: D.list(o_Compute) },
  },
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
  descriptor: {
    service: svc,
    input: { ContainerGroupDefinitionName: 0, Limit: 0, NextToken: 0 },
    output: { ContainerFleets: D.list(o_ContainerFleet) },
  },
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
  descriptor: {
    service: svc,
    input: { ContainerGroupType: 0, Limit: 0, NextToken: 0 },
    output: { ContainerGroupDefinitions: D.list(o_ContainerGroupDefinition) },
  },
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
  descriptor: {
    service: svc,
    input: { Name: 0, Limit: 0, NextToken: 0 },
    output: { ContainerGroupDefinitions: D.list(o_ContainerGroupDefinition) },
  },
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
  descriptor: {
    service: svc,
    input: { FleetId: 0, Limit: 0, NextToken: 0 },
    output: { FleetDeployments: D.list(o_FleetDeployment) },
  },
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
  descriptor: {
    service: svc,
    input: { BuildId: 0, ScriptId: 0, Limit: 0, NextToken: 0 },
  },
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
  descriptor: {
    service: svc,
    input: { Limit: 0, NextToken: 0 },
    output: { GameServerGroups: D.list(o_GameServerGroup) },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
  ],
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
  descriptor: {
    service: svc,
    input: { GameServerGroupName: 0, SortOrder: 0, Limit: 0, NextToken: 0 },
    output: { GameServers: D.list(o_GameServer) },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
  ],
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
  descriptor: { service: svc, input: { Filters: 0, Limit: 0, NextToken: 0 } },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
  ],
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
  descriptor: {
    service: svc,
    input: { Limit: 0, NextToken: 0 },
    output: { Scripts: D.list(o_Script) },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnauthorizedException,
  ],
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
  descriptor: { service: svc, input: { ResourceARN: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      FleetId: 0,
      ScalingAdjustment: 0,
      ScalingAdjustmentType: 0,
      Threshold: 0,
      ComparisonOperator: 0,
      EvaluationPeriods: 0,
      MetricName: 0,
      PolicyType: 0,
      TargetConfiguration: { TargetValue: 0 },
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      FleetId: 0,
      ComputeName: 0,
      CertificatePath: 0,
      DnsName: 0,
      IpAddress: 0,
      Location: 0,
    },
    output: { Compute: o_Compute },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      GameServerGroupName: 0,
      GameServerId: 0,
      InstanceId: 0,
      ConnectionInfo: 0,
      GameServerData: 0,
    },
    output: { GameServer: o_GameServer },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { BuildId: 0 } },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RequestUploadCredentials",
})) as any;

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
  descriptor: { service: svc, input: { AliasId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { GameServerGroupName: 0, ResumeActions: 0 },
    output: { GameServerGroup: o_GameServerGroup },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeGameServerGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      FleetId: 0,
      AliasId: 0,
      Location: 0,
      FilterExpression: 0,
      SortExpression: 0,
      Limit: 0,
      NextToken: 0,
    },
    output: { GameSessions: D.list(o_GameSession) },
  },
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
  descriptor: { service: svc, input: { FleetId: 0, Actions: 0, Location: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      PlacementId: 0,
      GameSessionQueueName: 0,
      GameProperties: D.list(i_GameProperty),
      MaximumPlayerSessionCount: 0,
      GameSessionName: 0,
      PlayerLatencies: D.list({
        PlayerId: 0,
        RegionIdentifier: 0,
        LatencyInMilliseconds: 0,
      }),
      DesiredPlayerSessions: D.list({ PlayerId: 0, PlayerData: 0 }),
      GameSessionData: 0,
      PriorityConfigurationOverride: {
        PlacementFallbackStrategy: 0,
        LocationOrder: 0,
      },
    },
    output: { GameSessionPlacement: o_GameSessionPlacement },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      TicketId: 0,
      ConfigurationName: 0,
      GameSessionArn: 0,
      Players: D.list(i_Player),
    },
    output: { MatchmakingTicket: o_MatchmakingTicket },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMatchBackfill",
})) as any;

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
  descriptor: {
    service: svc,
    input: { TicketId: 0, ConfigurationName: 0, Players: D.list(i_Player) },
    output: { MatchmakingTicket: o_MatchmakingTicket },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMatchmaking",
})) as any;

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
  descriptor: { service: svc, input: { FleetId: 0, Actions: 0, Location: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { PlacementId: 0 },
    output: { GameSessionPlacement: o_GameSessionPlacement },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopGameSessionPlacement",
})) as any;

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
  descriptor: { service: svc, input: { TicketId: 0 } },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopMatchmaking",
})) as any;

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
  descriptor: {
    service: svc,
    input: { GameServerGroupName: 0, SuspendActions: 0 },
    output: { GameServerGroup: o_GameServerGroup },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SuspendGameServerGroup",
})) as any;

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
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: D.list(i_Tag) } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { GameSessionId: 0, TerminationMode: 0 },
    output: { GameSession: o_GameSession },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AliasId: 0,
      Name: 0,
      Description: 0,
      RoutingStrategy: i_RoutingStrategy,
    },
    output: { Alias: o_Alias },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAlias",
})) as any;

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
  descriptor: {
    service: svc,
    input: { BuildId: 0, Name: 0, Version: 0 },
    output: { Build: o_Build },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBuild",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      FleetId: 0,
      GameServerContainerGroupDefinitionName: 0,
      PerInstanceContainerGroupDefinitionName: 0,
      GameServerContainerGroupsPerInstance: 0,
      InstanceConnectionPortRange: i_ConnectionPortRange,
      InstanceInboundPermissionAuthorizations: D.list(i_IpPermission),
      InstanceInboundPermissionRevocations: D.list(i_IpPermission),
      DeploymentConfiguration: {
        ProtectionStrategy: 0,
        MinimumHealthyPercentage: 0,
        ImpairmentStrategy: 0,
      },
      Description: 0,
      MetricGroups: 0,
      NewGameSessionProtectionPolicy: 0,
      GameSessionCreationLimitPolicy: i_GameSessionCreationLimitPolicy,
      LogConfiguration: i_LogConfiguration,
      RemoveAttributes: 0,
    },
    output: { ContainerFleet: o_ContainerFleet },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      GameServerContainerDefinition: i_GameServerContainerDefinitionInput,
      SupportContainerDefinitions: D.list(i_SupportContainerDefinitionInput),
      TotalMemoryLimitMebibytes: 0,
      TotalVcpuLimit: 0,
      VersionDescription: 0,
      SourceVersionNumber: 0,
      OperatingSystem: 0,
    },
    output: { ContainerGroupDefinition: o_ContainerGroupDefinition },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      FleetId: 0,
      Name: 0,
      Description: 0,
      NewGameSessionProtectionPolicy: 0,
      ResourceCreationLimitPolicy: i_ResourceCreationLimitPolicy,
      MetricGroups: 0,
      AnywhereConfiguration: i_AnywhereConfiguration,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      FleetId: 0,
      DesiredInstances: 0,
      MinSize: 0,
      MaxSize: 0,
      Location: 0,
      ManagedCapacityConfiguration: {
        ZeroCapacityStrategy: 0,
        ScaleInAfterInactivityMinutes: 0,
      },
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      FleetId: 0,
      InboundPermissionAuthorizations: D.list(i_IpPermission),
      InboundPermissionRevocations: D.list(i_IpPermission),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      GameServerGroupName: 0,
      GameServerId: 0,
      GameServerData: 0,
      UtilizationStatus: 0,
      HealthCheck: 0,
    },
    output: { GameServer: o_GameServer },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGameServer",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      GameServerGroupName: 0,
      RoleArn: 0,
      InstanceDefinitions: D.list(i_InstanceDefinition),
      GameServerProtectionPolicy: 0,
      BalancingStrategy: 0,
    },
    output: { GameServerGroup: o_GameServerGroup },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGameServerGroup",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      GameSessionId: 0,
      MaximumPlayerSessionCount: 0,
      Name: 0,
      PlayerSessionCreationPolicy: 0,
      ProtectionPolicy: 0,
      GameProperties: D.list(i_GameProperty),
    },
    output: { GameSession: o_GameSession },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      TimeoutInSeconds: 0,
      PlayerLatencyPolicies: D.list(i_PlayerLatencyPolicy),
      Destinations: D.list(i_GameSessionQueueDestination),
      FilterConfiguration: i_FilterConfiguration,
      PriorityConfiguration: i_PriorityConfiguration,
      CustomEventData: 0,
      NotificationTarget: 0,
    },
    output: { GameSessionQueue: o_GameSessionQueue },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGameSessionQueue",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      GameSessionQueueArns: 0,
      RequestTimeoutSeconds: 0,
      AcceptanceTimeoutSeconds: 0,
      AcceptanceRequired: 0,
      RuleSetName: 0,
      NotificationTarget: 0,
      AdditionalPlayerCount: 0,
      CustomEventData: 0,
      GameProperties: D.list(i_GameProperty),
      GameSessionData: 0,
      BackfillMode: 0,
      FlexMatchMode: 0,
    },
    output: { Configuration: o_MatchmakingConfiguration },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMatchmakingConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    input: { FleetId: 0, RuntimeConfiguration: i_RuntimeConfiguration },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ScriptId: 0,
      Name: 0,
      Version: 0,
      StorageLocation: i_S3Location,
      ZipFile: 0,
    },
    output: { Script: o_Script },
  },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScript",
})) as any;

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
  descriptor: { service: svc, input: { RuleSetBody: 0 } },
  errors: [
    InternalServiceException,
    InvalidRequestException,
    UnsupportedRegionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateMatchmakingRuleSet",
})) as any;

const i_AnywhereConfiguration: D.LazyStruct = () => ({ Cost: 0 });
const i_ConnectionPortRange: D.LazyStruct = () => ({ FromPort: 0, ToPort: 0 });
const i_FilterConfiguration: D.LazyStruct = () => ({ AllowedLocations: 0 });
const i_GameProperty: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_GameServerContainerDefinitionInput: D.LazyStruct = () => ({
  ContainerName: 0,
  DependsOn: D.list(i_ContainerDependency),
  MountPoints: D.list(i_ContainerMountPoint),
  EnvironmentOverride: D.list(i_ContainerEnvironment),
  ImageUri: 0,
  PortConfiguration: i_ContainerPortConfiguration,
  ServerSdkVersion: 0,
  LinuxCapabilities: i_LinuxCapabilities,
});
const i_GameSessionCreationLimitPolicy: D.LazyStruct = () => ({
  NewGameSessionsPerCreator: 0,
  PolicyPeriodInMinutes: 0,
});
const i_GameSessionQueueDestination: D.LazyStruct = () => ({
  DestinationArn: 0,
});
const i_InstanceDefinition: D.LazyStruct = () => ({
  InstanceType: 0,
  WeightedCapacity: 0,
});
const i_IpPermission: D.LazyStruct = () => ({
  FromPort: 0,
  ToPort: 0,
  IpRange: 0,
  Protocol: 0,
});
const i_LocationConfiguration: D.LazyStruct = () => ({ Location: 0 });
const i_LogConfiguration: D.LazyStruct = () => ({
  LogDestination: 0,
  S3BucketName: 0,
  LogGroupArn: 0,
});
const i_Player: D.LazyStruct = () => ({
  PlayerId: 0,
  PlayerAttributes: D.map({ S: 0, N: 0, SL: 0, SDM: 0 }),
  Team: 0,
  LatencyInMs: 0,
});
const i_PlayerLatencyPolicy: D.LazyStruct = () => ({
  MaximumIndividualPlayerLatencyMilliseconds: 0,
  PolicyDurationSeconds: 0,
});
const i_PriorityConfiguration: D.LazyStruct = () => ({
  PriorityOrder: 0,
  LocationOrder: 0,
});
const i_ResourceCreationLimitPolicy: D.LazyStruct = () => ({
  NewGameSessionsPerCreator: 0,
  PolicyPeriodInMinutes: 0,
});
const i_RoutingStrategy: D.LazyStruct = () => ({
  Type: 0,
  FleetId: 0,
  Message: 0,
});
const i_RuntimeConfiguration: D.LazyStruct = () => ({
  ServerProcesses: D.list({
    LaunchPath: 0,
    Parameters: 0,
    ConcurrentExecutions: 0,
  }),
  MaxConcurrentGameSessionActivations: 0,
  GameSessionActivationTimeoutSeconds: 0,
});
const i_S3Location: D.LazyStruct = () => ({
  Bucket: 0,
  Key: 0,
  RoleArn: 0,
  ObjectVersion: 0,
});
const i_SupportContainerDefinitionInput: D.LazyStruct = () => ({
  ContainerName: 0,
  DependsOn: D.list(i_ContainerDependency),
  MountPoints: D.list(i_ContainerMountPoint),
  EnvironmentOverride: D.list(i_ContainerEnvironment),
  Essential: 0,
  HealthCheck: {
    Command: 0,
    Interval: 0,
    Retries: 0,
    StartPeriod: 0,
    Timeout: 0,
  },
  ImageUri: 0,
  MemoryHardLimitMebibytes: 0,
  PortConfiguration: i_ContainerPortConfiguration,
  Vcpu: 0,
  LinuxCapabilities: i_LinuxCapabilities,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_Alias: D.LazyStruct = () => ({
  CreationTime: D.ts,
  LastUpdatedTime: D.ts,
});
const o_Build: D.LazyStruct = () => ({ CreationTime: D.ts });
const o_Compute: D.LazyStruct = () => ({
  IpAddress: D.secret,
  CreationTime: D.ts,
});
const o_ContainerFleet: D.LazyStruct = () => ({
  InstanceInboundPermissions: D.list(o_IpPermission),
  CreationTime: D.ts,
});
const o_ContainerGroupDefinition: D.LazyStruct = () => ({ CreationTime: D.ts });
const o_FleetAttributes: D.LazyStruct = () => ({
  CreationTime: D.ts,
  TerminationTime: D.ts,
});
const o_FleetDeployment: D.LazyStruct = () => ({ CreationTime: D.ts });
const o_GameServer: D.LazyStruct = () => ({
  GameServerData: D.secret,
  RegistrationTime: D.ts,
  LastClaimTime: D.ts,
  LastHealthCheckTime: D.ts,
});
const o_GameServerGroup: D.LazyStruct = () => ({
  CreationTime: D.ts,
  LastUpdatedTime: D.ts,
});
const o_GameSession: D.LazyStruct = () => ({
  CreationTime: D.ts,
  TerminationTime: D.ts,
  GameProperties: D.list(o_GameProperty),
  IpAddress: D.secret,
  GameSessionData: D.secret,
  MatchmakerData: D.secret,
});
const o_GameSessionPlacement: D.LazyStruct = () => ({
  GameProperties: D.list(o_GameProperty),
  PlayerLatencies: D.list({ PlayerId: D.secret }),
  StartTime: D.ts,
  EndTime: D.ts,
  IpAddress: D.secret,
  PlacedPlayerSessions: D.list({ PlayerId: D.secret }),
  GameSessionData: D.secret,
  MatchmakerData: D.secret,
});
const o_GameSessionQueue: D.LazyStruct = () => ({ CustomEventData: D.secret });
const o_IpPermission: D.LazyStruct = () => ({ IpRange: D.secret });
const o_MatchmakingConfiguration: D.LazyStruct = () => ({
  CustomEventData: D.secret,
  CreationTime: D.ts,
  GameProperties: D.list(o_GameProperty),
  GameSessionData: D.secret,
});
const o_MatchmakingRuleSet: D.LazyStruct = () => ({ CreationTime: D.ts });
const o_MatchmakingTicket: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
  Players: D.list({ PlayerId: D.secret }),
  GameSessionConnectionInfo: {
    IpAddress: D.secret,
    MatchedPlayerSessions: D.list({ PlayerId: D.secret }),
  },
});
const o_PlayerSession: D.LazyStruct = () => ({
  PlayerId: D.secret,
  CreationTime: D.ts,
  TerminationTime: D.ts,
  IpAddress: D.secret,
  PlayerData: D.secret,
});
const o_Script: D.LazyStruct = () => ({ CreationTime: D.ts });
const o_VpcPeeringAuthorization: D.LazyStruct = () => ({
  CreationTime: D.ts,
  ExpirationTime: D.ts,
});
const i_ContainerDependency: D.LazyStruct = () => ({
  ContainerName: 0,
  Condition: 0,
});
const i_ContainerEnvironment: D.LazyStruct = () => ({ Name: 0, Value: 0 });
const i_ContainerMountPoint: D.LazyStruct = () => ({
  InstancePath: 0,
  ContainerPath: 0,
  AccessLevel: 0,
});
const i_ContainerPortConfiguration: D.LazyStruct = () => ({
  ContainerPortRanges: D.list({ FromPort: 0, ToPort: 0, Protocol: 0 }),
});
const i_LinuxCapabilities: D.LazyStruct = () => ({ Include: 0 });
const o_GameProperty: D.LazyStruct = () => ({ Value: D.secret });
