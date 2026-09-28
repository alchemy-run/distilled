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
  sdkId: "ARC Region switch",
  target: "ArcRegionSwitch",
  version: "2022-07-26",
  sigv4: "arc-region-switch",
  protocol: awsJson1_0Protocol,
  rules: (p, _) => {
    const { UseFIPS = false, Endpoint, Region, UseControlPlaneEndpoint } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = (_0: unknown) => ({
      authSchemes: [
        {
          name: "sigv4",
          signingName: "arc-region-switch",
          signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}`,
        },
      ],
    });
    {
      const PartitionResult = _.partition(Region);
      if (
        UseControlPlaneEndpoint != null &&
        UseControlPlaneEndpoint === true &&
        Region != null &&
        !(UseFIPS === true) &&
        !(Endpoint != null) &&
        PartitionResult != null &&
        PartitionResult !== false &&
        _.getAttr(PartitionResult, "name") === "aws-cn"
      ) {
        return e(
          `https://arc-region-switch-control-plane.cn-north-1.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          {
            authSchemes: [
              {
                name: "sigv4",
                signingName: "arc-region-switch",
                signingRegion: "cn-north-1",
              },
            ],
          },
          {},
        );
      }
    }
    {
      const PartitionResult = _.partition(Region);
      if (
        !(Endpoint != null) &&
        UseControlPlaneEndpoint != null &&
        UseControlPlaneEndpoint === true &&
        Region != null &&
        UseFIPS === true &&
        PartitionResult != null &&
        PartitionResult !== false
      ) {
        if (_.getAttr(PartitionResult, "name") === "aws-cn") {
          return err(
            "Invalid Configuration: FIPS is not supported in this partition",
          );
        }
        return e(
          `https://arc-region-switch-control-plane-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          _p0(PartitionResult),
          {},
        );
      }
    }
    {
      const PartitionResult = _.partition(Region);
      if (
        UseControlPlaneEndpoint != null &&
        UseControlPlaneEndpoint === true &&
        Region != null &&
        !(UseFIPS === true) &&
        !(Endpoint != null) &&
        PartitionResult != null &&
        PartitionResult !== false
      ) {
        return e(
          `https://arc-region-switch-control-plane.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          _p0(PartitionResult),
          {},
        );
      }
    }
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
              `https://arc-region-switch-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://arc-region-switch.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
    readonly resourceId?: string;
    readonly resourceType?: string;
  }> {}
export class IllegalArgumentException
  extends /*@__PURE__*/ TE.TaggedError(
    "IllegalArgumentException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class IllegalStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "IllegalStateException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export type PlanArn = string;
export type ExecutionId = string;
export type StepName = string;
export type Approval = "approve" | "decline" | (string & {});
export type ExecutionComment = string;
export interface ApprovePlanExecutionStepRequest {
  planArn: string;
  executionId: string;
  stepName: string;
  approval: Approval;
  comment?: string;
}
export interface ApprovePlanExecutionStepResponse {}
export interface CancelPlanExecutionRequest {
  planArn: string;
  executionId: string;
  comment?: string;
}
export interface CancelPlanExecutionResponse {}
export type IamRoleArn = string;
export type LambdaArn = string;
export interface Lambdas {
  crossAccountRole?: string;
  externalId?: string;
  arn?: string;
}
export type LambdaList = Lambdas[];
export type RegionToRunIn =
  | "activatingRegion"
  | "deactivatingRegion"
  | "activeRegion"
  | "inactiveRegion"
  | (string & {});
export type LambdaUngracefulBehavior = "skip" | (string & {});
export interface LambdaUngraceful {
  behavior?: LambdaUngracefulBehavior;
}
export interface CustomActionLambdaConfiguration {
  timeoutMinutes?: number;
  lambdas: Lambdas[];
  retryIntervalMinutes: number;
  regionToRun: RegionToRunIn;
  ungraceful?: LambdaUngraceful;
}
export type AsgArn = string;
export interface Asg {
  crossAccountRole?: string;
  externalId?: string;
  arn?: string;
}
export type AsgList = Asg[];
export interface Ec2Ungraceful {
  minimumSuccessPercentage: number;
}
export type Ec2AsgCapacityMonitoringApproach =
  | "sampledMaxInLast24Hours"
  | "autoscalingMaxInLast24Hours"
  | (string & {});
export interface Ec2AsgCapacityIncreaseConfiguration {
  timeoutMinutes?: number;
  asgs: Asg[];
  ungraceful?: Ec2Ungraceful;
  targetPercent?: number;
  capacityMonitoringApproach?: Ec2AsgCapacityMonitoringApproach;
}
export type RoleArn = string;
export interface ExecutionApprovalConfiguration {
  timeoutMinutes?: number;
  approvalRole: string;
}
export type RoutingControlArn = string;
export type RoutingControlStateChange = "On" | "Off" | (string & {});
export interface ArcRoutingControlState {
  routingControlArn: string;
  state: RoutingControlStateChange;
}
export type ArcRoutingControlStates = ArcRoutingControlState[];
export type RegionAndRoutingControls = {
  [key: string]: ArcRoutingControlState[] | undefined;
};
export interface ArcRoutingControlConfiguration {
  timeoutMinutes?: number;
  crossAccountRole?: string;
  externalId?: string;
  regionAndRoutingControls: {
    [key: string]: ArcRoutingControlState[] | undefined;
  };
}
export type GlobalAuroraDefaultBehavior =
  | "switchoverOnly"
  | "failover"
  | (string & {});
export type GlobalAuroraUngracefulBehavior = "failover" | (string & {});
export interface GlobalAuroraUngraceful {
  ungraceful?: GlobalAuroraUngracefulBehavior;
}
export type GlobalClusterIdentifier = string;
export type AuroraClusterArn = string;
export type AuroraClusterArns = string[];
export interface GlobalAuroraConfiguration {
  timeoutMinutes?: number;
  crossAccountRole?: string;
  externalId?: string;
  behavior: GlobalAuroraDefaultBehavior;
  ungraceful?: GlobalAuroraUngraceful;
  globalClusterIdentifier: string;
  databaseClusterArns: string[];
}
export interface ParallelExecutionBlockConfiguration {
  steps: Step[];
}
export interface RegionSwitchPlanConfiguration {
  crossAccountRole?: string;
  externalId?: string;
  arn: string;
}
export type EcsClusterArn = string;
export type EcsServiceArn = string;
export interface Service {
  crossAccountRole?: string;
  externalId?: string;
  clusterArn?: string;
  serviceArn?: string;
}
export type ServiceList = Service[];
export interface EcsUngraceful {
  minimumSuccessPercentage: number;
}
export type EcsCapacityMonitoringApproach =
  | "sampledMaxInLast24Hours"
  | "containerInsightsMaxInLast24Hours"
  | (string & {});
export interface EcsCapacityIncreaseConfiguration {
  timeoutMinutes?: number;
  services: Service[];
  ungraceful?: EcsUngraceful;
  targetPercent?: number;
  capacityMonitoringApproach?: EcsCapacityMonitoringApproach;
}
export interface KubernetesResourceType {
  apiVersion: string;
  kind: string;
}
export type Region = string;
export type KubernetesNamespace = string;
export interface KubernetesScalingResource {
  namespace: string;
  name: string;
  hpaName?: string;
}
export type RegionalScalingResource = {
  [key: string]: KubernetesScalingResource | undefined;
};
export type KubernetesScalingApplication = {
  [key: string]:
    | { [key: string]: KubernetesScalingResource | undefined }
    | undefined;
};
export type KubernetesScalingApps = {
  [key: string]:
    | { [key: string]: KubernetesScalingResource | undefined }
    | undefined;
}[];
export type EksClusterArn = string;
export interface EksCluster {
  crossAccountRole?: string;
  externalId?: string;
  clusterArn: string;
}
export type EksClusters = EksCluster[];
export interface EksResourceScalingUngraceful {
  minimumSuccessPercentage: number;
}
export type EksCapacityMonitoringApproach =
  | "sampledMaxInLast24Hours"
  | (string & {});
export interface EksResourceScalingConfiguration {
  timeoutMinutes?: number;
  kubernetesResourceType: KubernetesResourceType;
  scalingResources?: {
    [key: string]:
      | { [key: string]: KubernetesScalingResource | undefined }
      | undefined;
  }[];
  eksClusters?: EksCluster[];
  ungraceful?: EksResourceScalingUngraceful;
  targetPercent?: number;
  capacityMonitoringApproach?: EksCapacityMonitoringApproach;
}
export type Route53HostedZoneId = string;
export type Route53RecordName = string;
export type Route53ResourceRecordSetIdentifier = string;
export interface Route53ResourceRecordSet {
  recordSetIdentifier?: string;
  region?: string;
}
export type Route53ResourceRecordSetList = Route53ResourceRecordSet[];
export interface Route53HealthCheckConfiguration {
  timeoutMinutes?: number;
  crossAccountRole?: string;
  externalId?: string;
  hostedZoneId: string;
  recordName: string;
  recordSets?: Route53ResourceRecordSet[];
}
export type DocumentDbDefaultBehavior =
  | "switchoverOnly"
  | "failover"
  | (string & {});
export type DocumentDbUngracefulBehavior = "failover" | (string & {});
export interface DocumentDbUngraceful {
  ungraceful?: DocumentDbUngracefulBehavior;
}
export type DocumentDbGlobalClusterIdentifier = string;
export type DocumentDbClusterArn = string;
export type DocumentDbClusterArns = string[];
export interface DocumentDbConfiguration {
  timeoutMinutes?: number;
  crossAccountRole?: string;
  externalId?: string;
  behavior: DocumentDbDefaultBehavior;
  ungraceful?: DocumentDbUngraceful;
  globalClusterIdentifier: string;
  databaseClusterArns: string[];
}
export type RdsDbInstanceArn = string;
export type RdsDbInstanceArnMap = { [key: string]: string | undefined };
export interface RdsPromoteReadReplicaConfiguration {
  timeoutMinutes?: number;
  crossAccountRole?: string;
  externalId?: string;
  dbInstanceArnMap: { [key: string]: string | undefined };
}
export interface RdsCreateCrossRegionReplicaConfiguration {
  timeoutMinutes?: number;
  crossAccountRole?: string;
  externalId?: string;
  dbInstanceArnMap: { [key: string]: string | undefined };
}
export type EventSourceMappingAction = "enable" | "disable" | (string & {});
export type EventSourceMappingArn = string;
export interface EventSourceMapping {
  crossAccountRole?: string;
  externalId?: string;
  arn: string;
}
export type RegionEventSourceMappingMap = {
  [key: string]: EventSourceMapping | undefined;
};
export type LambdaEventSourceMappingUngracefulBehavior = "skip" | (string & {});
export interface LambdaEventSourceMappingUngraceful {
  behavior?: LambdaEventSourceMappingUngracefulBehavior;
}
export interface LambdaEventSourceMappingConfiguration {
  timeoutMinutes?: number;
  action: EventSourceMappingAction;
  regionEventSourceMappings: { [key: string]: EventSourceMapping | undefined };
  ungraceful?: LambdaEventSourceMappingUngraceful;
}
export type RegionAuroraClusterMap = { [key: string]: string | undefined };
export interface AuroraServerlessScalingConfiguration {
  timeoutMinutes?: number;
  crossAccountRole?: string;
  externalId?: string;
  globalClusterIdentifier: string;
  regionDatabaseClusterArns: { [key: string]: string | undefined };
  targetPercent?: number;
}
export type AuroraInstanceArn = string;
export type RegionAuroraInstanceArnMap = { [key: string]: string | undefined };
export interface AuroraProvisionedScalingConfiguration {
  timeoutMinutes?: number;
  crossAccountRole?: string;
  externalId?: string;
  globalClusterIdentifier: string;
  regionDatabaseClusterArns: { [key: string]: string | undefined };
  instanceArns: { [key: string]: string | undefined };
}
export type NeptuneDefaultBehavior =
  | "switchoverOnly"
  | "failover"
  | (string & {});
export type NeptuneUngracefulBehavior = "failover" | (string & {});
export interface NeptuneUngraceful {
  ungraceful?: NeptuneUngracefulBehavior;
}
export type NeptuneGlobalClusterIdentifier = string;
export type NeptuneClusterArn = string;
export type RegionNeptuneClusterArnMap = { [key: string]: string | undefined };
export interface NeptuneGlobalDatabaseConfiguration {
  timeoutMinutes?: number;
  crossAccountRole?: string;
  externalId?: string;
  behavior: NeptuneDefaultBehavior;
  ungraceful?: NeptuneUngraceful;
  globalClusterIdentifier: string;
  regionDatabaseClusterArns: { [key: string]: string | undefined };
}
export type RdsUngracefulBehavior = "promoteReadReplica" | (string & {});
export interface RdsUngraceful {
  ungraceful?: RdsUngracefulBehavior;
}
export interface RdsSwitchoverReadReplicaConfiguration {
  timeoutMinutes?: number;
  crossAccountRole?: string;
  externalId?: string;
  dbInstanceArnMap: { [key: string]: string | undefined };
  ungraceful?: RdsUngraceful;
}
export type ExecutionBlockConfiguration =
  | {
      customActionLambdaConfig: CustomActionLambdaConfiguration;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
      rdsSwitchoverReadReplicaConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig: Ec2AsgCapacityIncreaseConfiguration;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
      rdsSwitchoverReadReplicaConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig: ExecutionApprovalConfiguration;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
      rdsSwitchoverReadReplicaConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig: ArcRoutingControlConfiguration;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
      rdsSwitchoverReadReplicaConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig: GlobalAuroraConfiguration;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
      rdsSwitchoverReadReplicaConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig: ParallelExecutionBlockConfiguration;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
      rdsSwitchoverReadReplicaConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig: RegionSwitchPlanConfiguration;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
      rdsSwitchoverReadReplicaConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig: EcsCapacityIncreaseConfiguration;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
      rdsSwitchoverReadReplicaConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig: EksResourceScalingConfiguration;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
      rdsSwitchoverReadReplicaConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig: Route53HealthCheckConfiguration;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
      rdsSwitchoverReadReplicaConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig: DocumentDbConfiguration;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
      rdsSwitchoverReadReplicaConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig: RdsPromoteReadReplicaConfiguration;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
      rdsSwitchoverReadReplicaConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig: RdsCreateCrossRegionReplicaConfiguration;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
      rdsSwitchoverReadReplicaConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig: LambdaEventSourceMappingConfiguration;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
      rdsSwitchoverReadReplicaConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig: AuroraServerlessScalingConfiguration;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
      rdsSwitchoverReadReplicaConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig: AuroraProvisionedScalingConfiguration;
      neptuneGlobalDatabaseConfig?: never;
      rdsSwitchoverReadReplicaConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig: NeptuneGlobalDatabaseConfiguration;
      rdsSwitchoverReadReplicaConfig?: never;
    }
  | {
      customActionLambdaConfig?: never;
      ec2AsgCapacityIncreaseConfig?: never;
      executionApprovalConfig?: never;
      arcRoutingControlConfig?: never;
      globalAuroraConfig?: never;
      parallelConfig?: never;
      regionSwitchPlanConfig?: never;
      ecsCapacityIncreaseConfig?: never;
      eksResourceScalingConfig?: never;
      route53HealthCheckConfig?: never;
      documentDbConfig?: never;
      rdsPromoteReadReplicaConfig?: never;
      rdsCreateCrossRegionReadReplicaConfig?: never;
      lambdaEventSourceMappingConfig?: never;
      auroraServerlessScalingConfig?: never;
      auroraProvisionedScalingConfig?: never;
      neptuneGlobalDatabaseConfig?: never;
      rdsSwitchoverReadReplicaConfig: RdsSwitchoverReadReplicaConfiguration;
    };
export type ExecutionBlockType =
  | "CustomActionLambda"
  | "ManualApproval"
  | "AuroraGlobalDatabase"
  | "EC2AutoScaling"
  | "ARCRoutingControl"
  | "ARCRegionSwitchPlan"
  | "Parallel"
  | "ECSServiceScaling"
  | "EKSResourceScaling"
  | "Route53HealthCheck"
  | "DocumentDb"
  | "RdsPromoteReadReplica"
  | "RdsCreateCrossRegionReplica"
  | "LambdaEventSourceMapping"
  | "AuroraServerlessScaling"
  | "AuroraProvisionedScaling"
  | "NeptuneGlobalDatabase"
  | "RdsSwitchoverReadReplica"
  | (string & {});
export interface Step {
  name: string;
  description?: string;
  executionBlockConfiguration: ExecutionBlockConfiguration;
  executionBlockType: ExecutionBlockType;
}
export type Steps = Step[];
export type WorkflowTargetAction =
  | "activate"
  | "deactivate"
  | "postRecovery"
  | (string & {});
export interface Workflow {
  steps?: Step[];
  workflowTargetAction: WorkflowTargetAction;
  workflowTargetRegion?: string;
  workflowDescription?: string;
}
export type WorkflowList = Workflow[];
export type AlarmType = "applicationHealth" | "trigger" | (string & {});
export interface AssociatedAlarm {
  crossAccountRole?: string;
  externalId?: string;
  resourceIdentifier: string;
  alarmType: AlarmType;
}
export type AssociatedAlarmMap = { [key: string]: AssociatedAlarm | undefined };
export type AlarmCondition = "red" | "green" | (string & {});
export interface TriggerCondition {
  associatedAlarmName: string;
  condition: AlarmCondition;
}
export type TriggerConditionList = TriggerCondition[];
export interface Trigger {
  description?: string;
  targetRegion: string;
  action: WorkflowTargetAction;
  conditions: TriggerCondition[];
  minDelayMinutesBetweenExecutions: number;
}
export type TriggerList = Trigger[];
export type AccountId = string;
export interface S3ReportOutputConfiguration {
  bucketPath?: string;
  bucketOwner?: string;
}
export type ReportOutputConfiguration = {
  s3Configuration: S3ReportOutputConfiguration;
};
export type ReportOutputList = ReportOutputConfiguration[];
export interface ReportConfiguration {
  reportOutput?: ReportOutputConfiguration[];
}
export type PlanName = string;
export type RegionList = string[];
export type RecoveryApproach = "activeActive" | "activePassive" | (string & {});
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export interface CreatePlanRequest {
  description?: string;
  workflows: Workflow[];
  executionRole: string;
  recoveryTimeObjectiveMinutes?: number;
  associatedAlarms?: { [key: string]: AssociatedAlarm | undefined };
  triggers?: Trigger[];
  reportConfiguration?: ReportConfiguration;
  name: string;
  regions: string[];
  recoveryApproach: RecoveryApproach;
  primaryRegion?: string;
  tags?: { [key: string]: string | undefined };
}
export interface Plan {
  arn: string;
  description?: string;
  workflows: Workflow[];
  executionRole: string;
  recoveryTimeObjectiveMinutes?: number;
  associatedAlarms?: { [key: string]: AssociatedAlarm | undefined };
  triggers?: Trigger[];
  reportConfiguration?: ReportConfiguration;
  name: string;
  regions: string[];
  recoveryApproach: RecoveryApproach;
  primaryRegion?: string;
  owner: string;
  version?: string;
  updatedAt?: Date;
}
export interface CreatePlanResponse {
  plan?: Plan;
}
export interface DeletePlanRequest {
  arn: string;
}
export interface DeletePlanResponse {}
export interface GetPlanRequest {
  arn: string;
}
export interface GetPlanResponse {
  plan?: Plan;
}
export type MaxResults = number;
export type NextToken = string;
export interface GetPlanEvaluationStatusRequest {
  planArn: string;
  maxResults?: number;
  nextToken?: string;
}
export type EvaluationStatus =
  | "passed"
  | "actionRequired"
  | "pendingEvaluation"
  | "unknown"
  | (string & {});
export type ExecutionAction =
  | "activate"
  | "deactivate"
  | "postRecovery"
  | (string & {});
export interface MinimalWorkflow {
  action?: ExecutionAction;
  name?: string;
}
export type ResourceArn = string;
export type ResourceWarningStatus = "active" | "resolved" | (string & {});
export interface ResourceWarning {
  workflow?: MinimalWorkflow;
  version: string;
  stepName?: string;
  resourceArn?: string;
  warningStatus: ResourceWarningStatus;
  warningUpdatedTime: Date;
  warningMessage: string;
}
export type PlanWarnings = ResourceWarning[];
export interface GetPlanEvaluationStatusResponse {
  planArn: string;
  lastEvaluationTime?: Date;
  lastEvaluatedVersion?: string;
  region?: string;
  evaluationState?: EvaluationStatus;
  warnings?: ResourceWarning[];
  nextToken?: string;
}
export type GetPlanExecutionStepStatesMaxResults = number;
export interface GetPlanExecutionRequest {
  planArn: string;
  executionId: string;
  maxResults?: number;
  nextToken?: string;
}
export type ExecutionMode = "graceful" | "ungraceful" | (string & {});
export type ExecutionState =
  | "inProgress"
  | "pausedByFailedStep"
  | "pausedByOperator"
  | "completed"
  | "completedWithExceptions"
  | "canceled"
  | "planExecutionTimedOut"
  | "pendingManualApproval"
  | "failed"
  | "pending"
  | "completedMonitoringApplicationHealth"
  | (string & {});
export type StepStatus =
  | "notStarted"
  | "running"
  | "failed"
  | "completed"
  | "canceled"
  | "skipped"
  | "pendingApproval"
  | (string & {});
export interface StepState {
  name?: string;
  status?: StepStatus;
  startTime?: Date;
  endTime?: Date;
  stepMode?: ExecutionMode;
}
export type StepStates = StepState[];
export type Duration = string;
export interface S3ReportOutput {
  s3ObjectKey?: string;
}
export type FailedReportErrorCode =
  | "insufficientPermissions"
  | "invalidResource"
  | "configurationError"
  | (string & {});
export interface FailedReportOutput {
  errorCode?: FailedReportErrorCode;
  errorMessage?: string;
}
export type ReportOutput =
  | { s3ReportOutput: S3ReportOutput; failedReportOutput?: never }
  | { s3ReportOutput?: never; failedReportOutput: FailedReportOutput };
export interface GeneratedReport {
  reportGenerationTime?: Date;
  reportOutput?: ReportOutput;
}
export type GeneratedReportDetails = GeneratedReport[];
export interface GetPlanExecutionResponse {
  planArn: string;
  executionId: string;
  version?: string;
  updatedAt?: Date;
  comment?: string;
  startTime: Date;
  endTime?: Date;
  mode: ExecutionMode;
  executionState: ExecutionState;
  executionAction: ExecutionAction;
  executionRegion: string;
  recoveryExecutionId?: string;
  stepStates?: StepState[];
  plan?: Plan;
  actualRecoveryTime?: string;
  generatedReportDetails?: GeneratedReport[];
  nextToken?: string;
}
export interface GetPlanInRegionRequest {
  arn: string;
}
export interface GetPlanInRegionResponse {
  plan?: Plan;
}
export type ListExecutionEventsMaxResults = number;
export interface ListPlanExecutionEventsRequest {
  planArn: string;
  executionId: string;
  maxResults?: number;
  nextToken?: string;
  name?: string;
}
export type ExecutionEventType =
  | "unknown"
  | "executionPending"
  | "executionStarted"
  | "executionSucceeded"
  | "executionFailed"
  | "executionPausing"
  | "executionPaused"
  | "executionCanceling"
  | "executionCanceled"
  | "executionPendingApproval"
  | "executionBehaviorChangedToUngraceful"
  | "executionBehaviorChangedToGraceful"
  | "executionPendingChildPlanManualApproval"
  | "executionSuccessMonitoringApplicationHealth"
  | "stepStarted"
  | "stepUpdate"
  | "stepSucceeded"
  | "stepFailed"
  | "stepSkipped"
  | "stepPausedByError"
  | "stepPausedByOperator"
  | "stepCanceled"
  | "stepPendingApproval"
  | "stepExecutionBehaviorChangedToUngraceful"
  | "stepPendingApplicationHealthMonitor"
  | "planEvaluationWarning"
  | (string & {});
export type Resources = string[];
export interface ExecutionEvent {
  timestamp?: Date;
  type?: ExecutionEventType;
  stepName?: string;
  executionBlockType?: ExecutionBlockType;
  resources?: string[];
  error?: string;
  description?: string;
  eventId: string;
  previousEventId?: string;
}
export type ExecutionEventList = ExecutionEvent[];
export interface ListPlanExecutionEventsResponse {
  items?: ExecutionEvent[];
  nextToken?: string;
}
export type ListExecutionsMaxResults = number;
export interface ListPlanExecutionsRequest {
  planArn: string;
  maxResults?: number;
  nextToken?: string;
  state?: ExecutionState;
}
export interface AbbreviatedExecution {
  planArn: string;
  executionId: string;
  version?: string;
  updatedAt?: Date;
  comment?: string;
  startTime: Date;
  endTime?: Date;
  mode: ExecutionMode;
  executionState: ExecutionState;
  executionAction: ExecutionAction;
  executionRegion: string;
  recoveryExecutionId?: string;
  actualRecoveryTime?: string;
}
export type AbbreviatedExecutionsList = AbbreviatedExecution[];
export interface ListPlanExecutionsResponse {
  items?: AbbreviatedExecution[];
  nextToken?: string;
}
export interface ListPlansRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface AbbreviatedPlan {
  arn: string;
  owner: string;
  name: string;
  regions: string[];
  recoveryApproach: RecoveryApproach;
  primaryRegion?: string;
  version?: string;
  updatedAt?: Date;
  description?: string;
  executionRole?: string;
  activePlanExecution?: string;
  recoveryTimeObjectiveMinutes?: number;
}
export type PlanList = AbbreviatedPlan[];
export interface ListPlansResponse {
  plans?: AbbreviatedPlan[];
  nextToken?: string;
}
export interface ListPlansInRegionRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface ListPlansInRegionResponse {
  plans?: AbbreviatedPlan[];
  nextToken?: string;
}
export interface ListRoute53HealthChecksRequest {
  arn: string;
  hostedZoneId?: string;
  recordName?: string;
  maxResults?: number;
  nextToken?: string;
}
export type Route53HealthCheckId = string;
export type Route53HealthCheckStatus =
  | "healthy"
  | "unhealthy"
  | "unknown"
  | (string & {});
export interface Route53HealthCheck {
  hostedZoneId: string;
  recordName: string;
  healthCheckId?: string;
  status?: Route53HealthCheckStatus;
  region: string;
}
export type Route53HealthCheckList = Route53HealthCheck[];
export interface ListRoute53HealthChecksResponse {
  healthChecks?: Route53HealthCheck[];
  nextToken?: string;
}
export interface ListRoute53HealthChecksInRegionRequest {
  arn: string;
  hostedZoneId?: string;
  recordName?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListRoute53HealthChecksInRegionResponse {
  healthChecks?: Route53HealthCheck[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  arn: string;
}
export interface ListTagsForResourceResponse {
  resourceTags?: { [key: string]: string | undefined };
}
export type RecoveryExecutionId = string;
export interface StartPlanExecutionRequest {
  planArn: string;
  targetRegion: string;
  action: ExecutionAction;
  mode?: ExecutionMode;
  comment?: string;
  latestVersion?: string;
  recoveryExecutionId?: string;
  clientToken?: string;
}
export interface StartPlanExecutionResponse {
  executionId?: string;
  plan?: string;
  planVersion?: string;
  activateRegion?: string;
  deactivateRegion?: string;
}
export interface TagResourceRequest {
  arn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  arn: string;
  resourceTagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdatePlanRequest {
  arn: string;
  description?: string;
  workflows: Workflow[];
  executionRole: string;
  recoveryTimeObjectiveMinutes?: number;
  associatedAlarms?: { [key: string]: AssociatedAlarm | undefined };
  triggers?: Trigger[];
  reportConfiguration?: ReportConfiguration;
}
export interface UpdatePlanResponse {
  plan?: Plan;
}
export type UpdatePlanExecutionAction =
  | "switchToGraceful"
  | "switchToUngraceful"
  | "pause"
  | "resume"
  | (string & {});
export interface UpdatePlanExecutionRequest {
  planArn: string;
  executionId: string;
  action: UpdatePlanExecutionAction;
  comment?: string;
}
export interface UpdatePlanExecutionResponse {}
export type UpdatePlanExecutionStepAction =
  | "switchToUngraceful"
  | "skip"
  | (string & {});
export interface UpdatePlanExecutionStepRequest {
  planArn: string;
  executionId: string;
  comment: string;
  stepName: string;
  actionToTake: UpdatePlanExecutionStepAction;
}
export interface UpdatePlanExecutionStepResponse {}
export type ApprovePlanExecutionStepError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Approves a step in a plan execution that requires manual approval. When you create a plan, you can include approval steps that require manual intervention before the execution can proceed. This operation allows you to provide that approval.
 *
 * You must specify the plan ARN, execution ID, step name, and approval status. You can also provide an optional comment explaining the approval decision.
 */
export const approvePlanExecutionStep: API.OperationMethod<
  ApprovePlanExecutionStepRequest,
  ApprovePlanExecutionStepResponse,
  ApprovePlanExecutionStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { planArn: 0, executionId: 0, stepName: 0, approval: 0, comment: 0 },
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApprovePlanExecutionStep",
})) as any;

export type CancelPlanExecutionError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Cancels an in-progress plan execution. This operation stops the execution of the plan and prevents any further steps from being processed.
 *
 * You must specify the plan ARN and execution ID. You can also provide an optional comment explaining why the execution was canceled.
 */
export const cancelPlanExecution: API.OperationMethod<
  CancelPlanExecutionRequest,
  CancelPlanExecutionResponse,
  CancelPlanExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { planArn: 0, executionId: 0, comment: 0 },
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelPlanExecution",
})) as any;

export type CreatePlanError = CommonErrors;
/**
 * Creates a new Region switch plan. A plan defines the steps required to shift traffic from one Amazon Web Services Region to another.
 *
 * You must specify a name for the plan, the primary Region, and at least one additional Region. You can also provide a description, execution role, recovery time objective, associated alarms, triggers, and workflows that define the steps to execute during a Region switch.
 */
export const createPlan: API.OperationMethod<
  CreatePlanRequest,
  CreatePlanResponse,
  CreatePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      description: 0,
      workflows: D.list(i_Workflow),
      executionRole: 0,
      recoveryTimeObjectiveMinutes: 0,
      associatedAlarms: D.map(i_AssociatedAlarm),
      triggers: D.list(i_Trigger),
      reportConfiguration: i_ReportConfiguration,
      name: 0,
      regions: 0,
      recoveryApproach: 0,
      primaryRegion: 0,
      tags: 0,
    },
    output: { plan: o_Plan },
    staticContext: { UseControlPlaneEndpoint: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePlan",
})) as any;

export type DeletePlanError =
  | IllegalStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a Region switch plan. You must specify the ARN of the plan to delete.
 *
 * You cannot delete a plan that has an active execution in progress.
 */
export const deletePlan: API.OperationMethod<
  DeletePlanRequest,
  DeletePlanResponse,
  DeletePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0 },
    staticContext: { UseControlPlaneEndpoint: { value: true } },
  },
  errors: [IllegalStateException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePlan",
})) as any;

export type GetPlanError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves detailed information about a Region switch plan. You must specify the ARN of the plan.
 */
export const getPlan: API.OperationMethod<
  GetPlanRequest,
  GetPlanResponse,
  GetPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0 },
    output: { plan: o_Plan },
    staticContext: { UseControlPlaneEndpoint: { value: true } },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlan",
})) as any;

export type GetPlanEvaluationStatusError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the evaluation status of a Region switch plan. The evaluation status provides information about the last time the plan was evaluated and any warnings or issues detected.
 */
export const getPlanEvaluationStatus: API.PaginatedOperationMethod<
  GetPlanEvaluationStatusRequest,
  GetPlanEvaluationStatusResponse,
  GetPlanEvaluationStatusError,
  Credentials | HttpClient.HttpClient,
  ResourceWarning
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { planArn: 0, maxResults: 0, nextToken: 0 },
    output: {
      lastEvaluationTime: D.ts,
      warnings: D.list({ warningUpdatedTime: D.ts }),
    },
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlanEvaluationStatus",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "warnings",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetPlanExecutionError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific plan execution. You must specify the plan ARN and execution ID.
 */
export const getPlanExecution: API.PaginatedOperationMethod<
  GetPlanExecutionRequest,
  GetPlanExecutionResponse,
  GetPlanExecutionError,
  Credentials | HttpClient.HttpClient,
  StepState
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { planArn: 0, executionId: 0, maxResults: 0, nextToken: 0 },
    output: {
      updatedAt: D.ts,
      startTime: D.ts,
      endTime: D.ts,
      stepStates: D.list({ startTime: D.ts, endTime: D.ts }),
      plan: o_Plan,
      generatedReportDetails: D.list({ reportGenerationTime: D.ts }),
    },
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlanExecution",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "stepStates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetPlanInRegionError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about a Region switch plan in a specific Amazon Web Services Region. This operation is useful for getting Region-specific information about a plan.
 */
export const getPlanInRegion: API.OperationMethod<
  GetPlanInRegionRequest,
  GetPlanInRegionResponse,
  GetPlanInRegionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 }, output: { plan: o_Plan } },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlanInRegion",
})) as any;

export type ListPlanExecutionEventsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the events that occurred during a plan execution. These events provide a detailed timeline of the execution process.
 */
export const listPlanExecutionEvents: API.PaginatedOperationMethod<
  ListPlanExecutionEventsRequest,
  ListPlanExecutionEventsResponse,
  ListPlanExecutionEventsError,
  Credentials | HttpClient.HttpClient,
  ExecutionEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { planArn: 0, executionId: 0, maxResults: 0, nextToken: 0, name: 0 },
    output: { items: D.list({ timestamp: D.ts }) },
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlanExecutionEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPlanExecutionsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the executions of a Region switch plan. This operation returns information about both current and historical executions.
 */
export const listPlanExecutions: API.PaginatedOperationMethod<
  ListPlanExecutionsRequest,
  ListPlanExecutionsResponse,
  ListPlanExecutionsError,
  Credentials | HttpClient.HttpClient,
  AbbreviatedExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { planArn: 0, maxResults: 0, nextToken: 0, state: 0 },
    output: {
      items: D.list({ updatedAt: D.ts, startTime: D.ts, endTime: D.ts }),
    },
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlanExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPlansError = CommonErrors;
/**
 * Lists all Region switch plans in your Amazon Web Services account.
 */
export const listPlans: API.PaginatedOperationMethod<
  ListPlansRequest,
  ListPlansResponse,
  ListPlansError,
  Credentials | HttpClient.HttpClient,
  AbbreviatedPlan
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { maxResults: 0, nextToken: 0 },
    output: { plans: D.list(o_AbbreviatedPlan) },
    staticContext: { UseControlPlaneEndpoint: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlans",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "plans",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPlansInRegionError = AccessDeniedException | CommonErrors;
/**
 * Lists all Region switch plans in your Amazon Web Services account that are available in the current Amazon Web Services Region.
 */
export const listPlansInRegion: API.PaginatedOperationMethod<
  ListPlansInRegionRequest,
  ListPlansInRegionResponse,
  ListPlansInRegionError,
  Credentials | HttpClient.HttpClient,
  AbbreviatedPlan
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { maxResults: 0, nextToken: 0 },
    output: { plans: D.list(o_AbbreviatedPlan) },
  },
  errors: [AccessDeniedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlansInRegion",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "plans",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRoute53HealthChecksError =
  | AccessDeniedException
  | IllegalArgumentException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * List the Amazon Route 53 health checks.
 */
export const listRoute53HealthChecks: API.PaginatedOperationMethod<
  ListRoute53HealthChecksRequest,
  ListRoute53HealthChecksResponse,
  ListRoute53HealthChecksError,
  Credentials | HttpClient.HttpClient,
  Route53HealthCheck
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      arn: 0,
      hostedZoneId: 0,
      recordName: 0,
      maxResults: 0,
      nextToken: 0,
    },
    staticContext: { UseControlPlaneEndpoint: { value: true } },
  },
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoute53HealthChecks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "healthChecks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRoute53HealthChecksInRegionError =
  | AccessDeniedException
  | IllegalArgumentException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * List the Amazon Route 53 health checks in a specific Amazon Web Services Region.
 */
export const listRoute53HealthChecksInRegion: API.PaginatedOperationMethod<
  ListRoute53HealthChecksInRegionRequest,
  ListRoute53HealthChecksInRegionResponse,
  ListRoute53HealthChecksInRegionError,
  Credentials | HttpClient.HttpClient,
  Route53HealthCheck
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      arn: 0,
      hostedZoneId: 0,
      recordName: 0,
      maxResults: 0,
      nextToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoute53HealthChecksInRegion",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "healthChecks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the tags attached to a Region switch resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0 },
    staticContext: { UseControlPlaneEndpoint: { value: true } },
  },
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type StartPlanExecutionError =
  | AccessDeniedException
  | ConflictException
  | IllegalArgumentException
  | IllegalStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts the execution of a Region switch plan. You can execute a plan in either `graceful` or `ungraceful` mode.
 *
 * Specifing `ungraceful` mode either changes the behavior of the execution blocks in a workflow or skips specific execution blocks.
 */
export const startPlanExecution: API.OperationMethod<
  StartPlanExecutionRequest,
  StartPlanExecutionResponse,
  StartPlanExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      planArn: 0,
      targetRegion: 0,
      action: 0,
      mode: 0,
      comment: 0,
      latestVersion: 0,
      recoveryExecutionId: 0,
      clientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    IllegalArgumentException,
    IllegalStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPlanExecution",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds or updates tags for a Region switch resource. You can assign metadata to your resources in the form of tags, which are key-value pairs.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0, tags: 0 },
    staticContext: { UseControlPlaneEndpoint: { value: true } },
  },
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes tags from a Region switch resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0, resourceTagKeys: 0 },
    staticContext: { UseControlPlaneEndpoint: { value: true } },
  },
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdatePlanError = ResourceNotFoundException | CommonErrors;
/**
 * Updates an existing Region switch plan. You can modify the plan's description, workflows, execution role, recovery time objective, associated alarms, and triggers.
 */
export const updatePlan: API.OperationMethod<
  UpdatePlanRequest,
  UpdatePlanResponse,
  UpdatePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      arn: 0,
      description: 0,
      workflows: D.list(i_Workflow),
      executionRole: 0,
      recoveryTimeObjectiveMinutes: 0,
      associatedAlarms: D.map(i_AssociatedAlarm),
      triggers: D.list(i_Trigger),
      reportConfiguration: i_ReportConfiguration,
    },
    output: { plan: o_Plan },
    staticContext: { UseControlPlaneEndpoint: { value: true } },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePlan",
})) as any;

export type UpdatePlanExecutionError =
  | AccessDeniedException
  | IllegalStateException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an in-progress plan execution. This operation allows you to modify certain aspects of the execution, such as adding a comment or changing the action.
 */
export const updatePlanExecution: API.OperationMethod<
  UpdatePlanExecutionRequest,
  UpdatePlanExecutionResponse,
  UpdatePlanExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { planArn: 0, executionId: 0, action: 0, comment: 0 },
  },
  errors: [
    AccessDeniedException,
    IllegalStateException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePlanExecution",
})) as any;

export type UpdatePlanExecutionStepError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a specific step in an in-progress plan execution. This operation allows you to modify the step's comment or action.
 */
export const updatePlanExecutionStep: API.OperationMethod<
  UpdatePlanExecutionStepRequest,
  UpdatePlanExecutionStepResponse,
  UpdatePlanExecutionStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      planArn: 0,
      executionId: 0,
      comment: 0,
      stepName: 0,
      actionToTake: 0,
    },
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePlanExecutionStep",
})) as any;

const i_AssociatedAlarm: D.LazyStruct = () => ({
  crossAccountRole: 0,
  externalId: 0,
  resourceIdentifier: 0,
  alarmType: 0,
});
const i_ReportConfiguration: D.LazyStruct = () => ({
  reportOutput: D.list({ s3Configuration: { bucketPath: 0, bucketOwner: 0 } }),
});
const i_Trigger: D.LazyStruct = () => ({
  description: 0,
  targetRegion: 0,
  action: 0,
  conditions: D.list({ associatedAlarmName: 0, condition: 0 }),
  minDelayMinutesBetweenExecutions: 0,
});
const i_Workflow: D.LazyStruct = () => ({
  steps: D.list(i_Step),
  workflowTargetAction: 0,
  workflowTargetRegion: 0,
  workflowDescription: 0,
});
const o_AbbreviatedPlan: D.LazyStruct = () => ({ updatedAt: D.ts });
const o_Plan: D.LazyStruct = () => ({ updatedAt: D.ts });
const i_Step: D.LazyStruct = () => ({
  name: 0,
  description: 0,
  executionBlockConfiguration: {
    customActionLambdaConfig: {
      timeoutMinutes: 0,
      lambdas: D.list({ crossAccountRole: 0, externalId: 0, arn: 0 }),
      retryIntervalMinutes: 0,
      regionToRun: 0,
      ungraceful: { behavior: 0 },
    },
    ec2AsgCapacityIncreaseConfig: {
      timeoutMinutes: 0,
      asgs: D.list({ crossAccountRole: 0, externalId: 0, arn: 0 }),
      ungraceful: { minimumSuccessPercentage: 0 },
      targetPercent: 0,
      capacityMonitoringApproach: 0,
    },
    executionApprovalConfig: { timeoutMinutes: 0, approvalRole: 0 },
    arcRoutingControlConfig: {
      timeoutMinutes: 0,
      crossAccountRole: 0,
      externalId: 0,
      regionAndRoutingControls: D.map(
        D.list({ routingControlArn: 0, state: 0 }),
      ),
    },
    globalAuroraConfig: {
      timeoutMinutes: 0,
      crossAccountRole: 0,
      externalId: 0,
      behavior: 0,
      ungraceful: { ungraceful: 0 },
      globalClusterIdentifier: 0,
      databaseClusterArns: 0,
    },
    parallelConfig: { steps: D.list(i_Step) },
    regionSwitchPlanConfig: { crossAccountRole: 0, externalId: 0, arn: 0 },
    ecsCapacityIncreaseConfig: {
      timeoutMinutes: 0,
      services: D.list({
        crossAccountRole: 0,
        externalId: 0,
        clusterArn: 0,
        serviceArn: 0,
      }),
      ungraceful: { minimumSuccessPercentage: 0 },
      targetPercent: 0,
      capacityMonitoringApproach: 0,
    },
    eksResourceScalingConfig: {
      timeoutMinutes: 0,
      kubernetesResourceType: { apiVersion: 0, kind: 0 },
      scalingResources: D.list(
        D.map(D.map({ namespace: 0, name: 0, hpaName: 0 })),
      ),
      eksClusters: D.list({
        crossAccountRole: 0,
        externalId: 0,
        clusterArn: 0,
      }),
      ungraceful: { minimumSuccessPercentage: 0 },
      targetPercent: 0,
      capacityMonitoringApproach: 0,
    },
    route53HealthCheckConfig: {
      timeoutMinutes: 0,
      crossAccountRole: 0,
      externalId: 0,
      hostedZoneId: 0,
      recordName: 0,
      recordSets: D.list({ recordSetIdentifier: 0, region: 0 }),
    },
    documentDbConfig: {
      timeoutMinutes: 0,
      crossAccountRole: 0,
      externalId: 0,
      behavior: 0,
      ungraceful: { ungraceful: 0 },
      globalClusterIdentifier: 0,
      databaseClusterArns: 0,
    },
    rdsPromoteReadReplicaConfig: {
      timeoutMinutes: 0,
      crossAccountRole: 0,
      externalId: 0,
      dbInstanceArnMap: 0,
    },
    rdsCreateCrossRegionReadReplicaConfig: {
      timeoutMinutes: 0,
      crossAccountRole: 0,
      externalId: 0,
      dbInstanceArnMap: 0,
    },
    lambdaEventSourceMappingConfig: {
      timeoutMinutes: 0,
      action: 0,
      regionEventSourceMappings: D.map({
        crossAccountRole: 0,
        externalId: 0,
        arn: 0,
      }),
      ungraceful: { behavior: 0 },
    },
    auroraServerlessScalingConfig: {
      timeoutMinutes: 0,
      crossAccountRole: 0,
      externalId: 0,
      globalClusterIdentifier: 0,
      regionDatabaseClusterArns: 0,
      targetPercent: 0,
    },
    auroraProvisionedScalingConfig: {
      timeoutMinutes: 0,
      crossAccountRole: 0,
      externalId: 0,
      globalClusterIdentifier: 0,
      regionDatabaseClusterArns: 0,
      instanceArns: 0,
    },
    neptuneGlobalDatabaseConfig: {
      timeoutMinutes: 0,
      crossAccountRole: 0,
      externalId: 0,
      behavior: 0,
      ungraceful: { ungraceful: 0 },
      globalClusterIdentifier: 0,
      regionDatabaseClusterArns: 0,
    },
    rdsSwitchoverReadReplicaConfig: {
      timeoutMinutes: 0,
      crossAccountRole: 0,
      externalId: 0,
      dbInstanceArnMap: 0,
      ungraceful: { ungraceful: 0 },
    },
  },
  executionBlockType: 0,
});
