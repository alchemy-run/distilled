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
  sdkId: "ARC Region switch",
  serviceShapeName: "ArcRegionSwitch",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "arc-region-switch" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-07-26");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
              { name: "sigv4", signingName: "arc-region-switch", signingRegion: "cn-north-1" },
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
          return err("Invalid Configuration: FIPS is not supported in this partition");
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
  '{"url":"https://arc-region-switch.{R}.api.aws","properties":{},"headers":{}}',
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
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class IllegalArgumentException
  extends /*@__PURE__*/ S.TaggedError<IllegalArgumentException>()(
    "IllegalArgumentException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class IllegalStateException
  extends /*@__PURE__*/ S.TaggedError<IllegalStateException>()(
    "IllegalStateException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
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
export type WaitELBTargetGroupHealthy = "enabled" | "disabled" | (string & {});
export interface Ec2AsgCapacityIncreaseConfiguration {
  timeoutMinutes?: number;
  asgs: Asg[];
  ungraceful?: Ec2Ungraceful;
  targetPercent?: number;
  capacityMonitoringApproach?: Ec2AsgCapacityMonitoringApproach;
  waitELBTargetGroupHealthy?: WaitELBTargetGroupHealthy;
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
export type RegionAndRoutingControls = { [key: string]: ArcRoutingControlState[] | undefined };
export interface ArcRoutingControlConfiguration {
  timeoutMinutes?: number;
  crossAccountRole?: string;
  externalId?: string;
  regionAndRoutingControls: { [key: string]: ArcRoutingControlState[] | undefined };
}
export type GlobalAuroraDefaultBehavior = "switchoverOnly" | "failover" | (string & {});
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
  waitELBTargetGroupHealthy?: WaitELBTargetGroupHealthy;
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
export type RegionalScalingResource = { [key: string]: KubernetesScalingResource | undefined };
export type KubernetesScalingApplication = {
  [key: string]: { [key: string]: KubernetesScalingResource | undefined } | undefined;
};
export type KubernetesScalingApps = {
  [key: string]: { [key: string]: KubernetesScalingResource | undefined } | undefined;
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
export type EksCapacityMonitoringApproach = "sampledMaxInLast24Hours" | (string & {});
export interface EksResourceScalingConfiguration {
  timeoutMinutes?: number;
  kubernetesResourceType: KubernetesResourceType;
  scalingResources?: {
    [key: string]: { [key: string]: KubernetesScalingResource | undefined } | undefined;
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
export type DocumentDbDefaultBehavior = "switchoverOnly" | "failover" | (string & {});
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
export type RegionEventSourceMappingMap = { [key: string]: EventSourceMapping | undefined };
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
export type NeptuneDefaultBehavior = "switchoverOnly" | "failover" | (string & {});
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
export type WorkflowTargetAction = "activate" | "deactivate" | "postRecovery" | (string & {});
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
export type ReportOutputConfiguration = { s3Configuration: S3ReportOutputConfiguration };
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
  serviceQuotaChecksEnabled?: boolean;
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
  serviceQuotaChecksEnabled?: boolean;
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
export type ExecutionAction = "activate" | "deactivate" | "postRecovery" | (string & {});
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
export type Route53HealthCheckStatus = "healthy" | "unhealthy" | "unknown" | (string & {});
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
export type PlanArnList = string[];
export interface ListServiceQuotaWarningsRequest {
  planArns?: string[];
  maxResults?: number;
  nextToken?: string;
}
export type ServiceQuotaWarningStatus =
  | "pending"
  | "denied"
  | "insufficientPermissions"
  | "maxRegionSwitchRequestsExceeded"
  | "maxAccountRequestsExceeded"
  | (string & {});
export interface ServiceQuotaWarningSummary {
  accountId: string;
  quotaRegion: string;
  serviceCode?: string;
  quotaCode?: string;
  quotaName?: string;
  status: ServiceQuotaWarningStatus;
  planArn: string;
  requestId?: string;
  caseId?: string;
  warningMessage?: string;
  lastCheckedAt?: Date;
  warningCreatedAt?: Date;
}
export type ServiceQuotaWarningSummaryList = ServiceQuotaWarningSummary[];
export interface ListServiceQuotaWarningsResponse {
  serviceQuotaWarningSummaries: ServiceQuotaWarningSummary[];
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
  serviceQuotaChecksEnabled?: boolean;
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
export type UpdatePlanExecutionStepAction = "switchToUngraceful" | "skip" | (string & {});
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
  input: __S(640, __c20, 0) as any as S.Schema<ApprovePlanExecutionStepRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<ApprovePlanExecutionStepResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApprovePlanExecutionStep",
}));

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
  input: __S(704, __c22, 0) as any as S.Schema<CancelPlanExecutionRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<CancelPlanExecutionResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelPlanExecution",
}));

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
  input: __S(736, __c23, 0) as any as S.Schema<CreatePlanRequest>,
  output: __S(896, __c28, 0) as any as S.Schema<CreatePlanResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePlan",
}));

export type DeletePlanError = IllegalStateException | ResourceNotFoundException | CommonErrors;
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
  input: __S(928, __c29, 0) as any as S.Schema<DeletePlanRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<DeletePlanResponse>,
  errors: [IllegalStateException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePlan",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<GetPlanRequest>,
  output: __S(896, __c28, 0) as any as S.Schema<GetPlanResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlan",
}));

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
  input: __S(32, __c1, 0) as any as S.Schema<GetPlanEvaluationStatusRequest>,
  output: __S(36, __c1, 4) as any as S.Schema<GetPlanEvaluationStatusResponse>,
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
  input: __S(64, __c2, 0) as any as S.Schema<GetPlanExecutionRequest>,
  output: __S(72, __c2, 8) as any as S.Schema<GetPlanExecutionResponse>,
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

export type GetPlanInRegionError = AccessDeniedException | ResourceNotFoundException | CommonErrors;
/**
 * Retrieves information about a Region switch plan in a specific Amazon Web Services Region. This operation is useful for getting Region-specific information about a plan.
 */
export const getPlanInRegion: API.OperationMethod<
  GetPlanInRegionRequest,
  GetPlanInRegionResponse,
  GetPlanInRegionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c3, 0) as any as S.Schema<GetPlanInRegionRequest>,
  output: __S(896, __c28, 0) as any as S.Schema<GetPlanInRegionResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlanInRegion",
}));

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
  input: __S(128, __c4, 0) as any as S.Schema<ListPlanExecutionEventsRequest>,
  output: __S(131, __c4, 3) as any as S.Schema<ListPlanExecutionEventsResponse>,
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
  input: __S(160, __c5, 0) as any as S.Schema<ListPlanExecutionsRequest>,
  output: __S(163, __c5, 3) as any as S.Schema<ListPlanExecutionsResponse>,
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
  input: __S(192, __c6, 0) as any as S.Schema<ListPlansRequest>,
  output: __S(226, __c7, 2) as any as S.Schema<ListPlansResponse>,
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
  input: __S(256, __c8, 0) as any as S.Schema<ListPlansInRegionRequest>,
  output: __S(226, __c7, 2) as any as S.Schema<ListPlansInRegionResponse>,
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
  input: __S(288, __c9, 0) as any as S.Schema<ListRoute53HealthChecksRequest>,
  output: __S(322, __c10, 2) as any as S.Schema<ListRoute53HealthChecksResponse>,
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
  input: __S(352, __c11, 0) as any as S.Schema<ListRoute53HealthChecksInRegionRequest>,
  output: __S(322, __c10, 2) as any as S.Schema<ListRoute53HealthChecksInRegionResponse>,
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

export type ListServiceQuotaWarningsError =
  | AccessDeniedException
  | InternalServerException
  | CommonErrors;
/**
 * Lists the service quota warnings for the plans that you can access. Region switch creates a warning when the applied quota value in one Region of a plan is lower than the value required for the matching resource in another Region or account in the plan.
 *
 * Returns the warnings for the plans that you own and for plans that are shared with your account through AWS Resource Access Manager (AWS RAM). To return warnings for specific plans, provide a list of plan Amazon Resource Names (ARNs). Region switch ignores any plan ARN that you can't access. If you don't provide any plan ARNs, Region switch returns the warnings for all of your accessible plans.
 */
export const listServiceQuotaWarnings: API.PaginatedOperationMethod<
  ListServiceQuotaWarningsRequest,
  ListServiceQuotaWarningsResponse,
  ListServiceQuotaWarningsError,
  Credentials | HttpClient.HttpClient,
  ServiceQuotaWarningSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<ListServiceQuotaWarningsRequest>,
  output: __S(387, __c12, 3) as any as S.Schema<ListServiceQuotaWarningsResponse>,
  errors: [AccessDeniedException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceQuotaWarnings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceQuotaWarningSummaries",
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
  input: __S(416, __c13, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(417, __c13, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(448, __c14, 0) as any as S.Schema<StartPlanExecutionRequest>,
  output: __S(449, __c14, 1) as any as S.Schema<StartPlanExecutionResponse>,
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
}));

export type TagResourceError = InternalServerException | ResourceNotFoundException | CommonErrors;
/**
 * Adds or updates tags for a Region switch resource. You can assign metadata to your resources in the form of tags, which are key-value pairs.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<TagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = InternalServerException | ResourceNotFoundException | CommonErrors;
/**
 * Removes tags from a Region switch resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(544, __c17, 0) as any as S.Schema<UpdatePlanRequest>,
  output: __S(896, __c28, 0) as any as S.Schema<UpdatePlanResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePlan",
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<UpdatePlanExecutionRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<UpdatePlanExecutionResponse>,
  errors: [AccessDeniedException, IllegalStateException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePlanExecution",
}));

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
  input: __S(608, __c19, 0) as any as S.Schema<UpdatePlanExecutionStepRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<UpdatePlanExecutionStepResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePlanExecutionStep",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseControlPlaneEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetPlanRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          planArn: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetPlanEvaluationStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ action: S.optional(S.String), name: S.optional(S.String) }),
      ).annotate({ identifier: "MinimalWorkflow" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          workflow: S.optional(__S(33, __c1, 1)),
          version: S.String,
          stepName: S.optional(S.String),
          resourceArn: S.optional(S.String),
          warningStatus: S.String,
          warningUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          warningMessage: S.String,
        }),
      ).annotate({ identifier: "ResourceWarning" });
    case 3:
      return S.Array(__S(34, __c1, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          planArn: S.String,
          lastEvaluationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastEvaluatedVersion: S.optional(S.String),
          region: S.optional(S.String),
          evaluationState: S.optional(S.String),
          warnings: S.optional(__S(35, __c1, 3)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetPlanEvaluationStatusResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          planArn: S.String,
          executionId: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetPlanExecutionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          status: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          stepMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "StepState" });
    case 2:
      return S.Array(__S(65, __c2, 1));
    case 3:
      return S.suspend(() => S.Struct({ s3ObjectKey: S.optional(S.String) })).annotate({
        identifier: "S3ReportOutput",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({ errorCode: S.optional(S.String), errorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "FailedReportOutput" });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ s3ReportOutput: __S(67, __c2, 3) }),
        /*@__PURE__*/ S.Struct({ failedReportOutput: __S(68, __c2, 4) }),
      ]);
    case 6:
      return S.suspend(() =>
        S.Struct({
          reportGenerationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          reportOutput: S.optional(__S(69, __c2, 5)),
        }),
      ).annotate({ identifier: "GeneratedReport" });
    case 7:
      return S.Array(__S(70, __c2, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          planArn: S.String,
          executionId: S.String,
          version: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          comment: S.optional(S.String),
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          mode: S.String,
          executionState: S.String,
          executionAction: S.String,
          executionRegion: S.String,
          recoveryExecutionId: S.optional(S.String),
          stepStates: S.optional(__S(66, __c2, 2)),
          plan: S.optional(__S(883, __c27, 19)),
          actualRecoveryTime: S.optional(S.String),
          generatedReportDetails: S.optional(__S(71, __c2, 7)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetPlanExecutionResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPlanInRegionRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          planArn: S.String,
          executionId: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          name: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPlanExecutionEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          type: S.optional(S.String),
          stepName: S.optional(S.String),
          executionBlockType: S.optional(S.String),
          resources: S.optional(__S(768, __c24, 0)),
          error: S.optional(S.String),
          description: S.optional(S.String),
          eventId: S.String,
          previousEventId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExecutionEvent" });
    case 2:
      return S.Array(__S(129, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(130, __c4, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPlanExecutionEventsResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          planArn: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          state: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPlanExecutionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          planArn: S.String,
          executionId: S.String,
          version: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          comment: S.optional(S.String),
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          mode: S.String,
          executionState: S.String,
          executionAction: S.String,
          executionRegion: S.String,
          recoveryExecutionId: S.optional(S.String),
          actualRecoveryTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "AbbreviatedExecution" });
    case 2:
      return S.Array(__S(161, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(162, __c5, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPlanExecutionsResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseControlPlaneEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListPlansRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          owner: S.String,
          name: S.String,
          regions: __S(768, __c24, 0),
          recoveryApproach: S.String,
          primaryRegion: S.optional(S.String),
          version: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          description: S.optional(S.String),
          executionRole: S.optional(S.String),
          activePlanExecution: S.optional(S.String),
          recoveryTimeObjectiveMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AbbreviatedPlan" });
    case 1:
      return S.Array(__S(224, __c7, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ plans: S.optional(__S(225, __c7, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPlansResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPlansInRegionRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          hostedZoneId: S.optional(S.String),
          recordName: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseControlPlaneEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListRoute53HealthChecksRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          hostedZoneId: S.String,
          recordName: S.String,
          healthCheckId: S.optional(S.String),
          status: S.optional(S.String),
          region: S.String,
        }),
      ).annotate({ identifier: "Route53HealthCheck" });
    case 1:
      return S.Array(__S(320, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ healthChecks: S.optional(__S(321, __c10, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRoute53HealthChecksResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          hostedZoneId: S.optional(S.String),
          recordName: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRoute53HealthChecksInRegionRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          planArns: S.optional(__S(768, __c24, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListServiceQuotaWarningsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accountId: S.String,
          quotaRegion: S.String,
          serviceCode: S.optional(S.String),
          quotaCode: S.optional(S.String),
          quotaName: S.optional(S.String),
          status: S.String,
          planArn: S.String,
          requestId: S.optional(S.String),
          caseId: S.optional(S.String),
          warningMessage: S.optional(S.String),
          lastCheckedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          warningCreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ServiceQuotaWarningSummary" });
    case 2:
      return S.Array(__S(385, __c12, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          serviceQuotaWarningSummaries: __S(386, __c12, 2),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListServiceQuotaWarningsResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseControlPlaneEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ resourceTags: S.optional(__S(800, __c25, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          planArn: S.String,
          targetRegion: S.String,
          action: S.String,
          mode: S.optional(S.String),
          comment: S.optional(S.String),
          latestVersion: S.optional(S.String),
          recoveryExecutionId: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartPlanExecutionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          executionId: S.optional(S.String),
          plan: S.optional(S.String),
          planVersion: S.optional(S.String),
          activateRegion: S.optional(S.String),
          deactivateRegion: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartPlanExecutionResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, tags: __S(800, __c25, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseControlPlaneEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, resourceTagKeys: __S(768, __c24, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseControlPlaneEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          description: S.optional(S.String),
          workflows: __S(872, __c27, 8),
          executionRole: S.String,
          recoveryTimeObjectiveMinutes: S.optional(S.Number),
          associatedAlarms: S.optional(__S(874, __c27, 10)),
          triggers: S.optional(__S(878, __c27, 14)),
          reportConfiguration: S.optional(__S(882, __c27, 18)),
          serviceQuotaChecksEnabled: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseControlPlaneEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "UpdatePlanRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          planArn: S.String,
          executionId: S.String,
          action: S.String,
          comment: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdatePlanExecutionRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          planArn: S.String,
          executionId: S.String,
          comment: S.String,
          stepName: S.String,
          actionToTake: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdatePlanExecutionStepRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          planArn: S.String,
          executionId: S.String,
          stepName: S.String,
          approval: S.String,
          comment: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ApprovePlanExecutionStepRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "ApprovePlanExecutionStepResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ planArn: S.String, executionId: S.String, comment: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelPlanExecutionRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          workflows: __S(872, __c27, 8),
          executionRole: S.String,
          recoveryTimeObjectiveMinutes: S.optional(S.Number),
          associatedAlarms: S.optional(__S(874, __c27, 10)),
          triggers: S.optional(__S(878, __c27, 14)),
          reportConfiguration: S.optional(__S(882, __c27, 18)),
          serviceQuotaChecksEnabled: S.optional(S.Boolean),
          name: S.String,
          regions: __S(768, __c24, 0),
          recoveryApproach: S.String,
          primaryRegion: S.optional(S.String),
          tags: S.optional(__S(800, __c25, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseControlPlaneEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "CreatePlanRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          crossAccountRole: S.optional(S.String),
          externalId: S.optional(S.String),
          arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Lambdas" });
    case 1:
      return S.Array(__S(832, __c26, 0));
    case 2:
      return S.suspend(() => S.Struct({ behavior: S.optional(S.String) })).annotate({
        identifier: "LambdaUngraceful",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          timeoutMinutes: S.optional(S.Number),
          lambdas: __S(833, __c26, 1),
          retryIntervalMinutes: S.Number,
          regionToRun: S.String,
          ungraceful: S.optional(__S(834, __c26, 2)),
        }),
      ).annotate({ identifier: "CustomActionLambdaConfiguration" });
    case 4:
      return S.suspend(() => S.Struct({ minimumSuccessPercentage: S.Number })).annotate({
        identifier: "Ec2Ungraceful",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          timeoutMinutes: S.optional(S.Number),
          asgs: __S(833, __c26, 1),
          ungraceful: S.optional(__S(836, __c26, 4)),
          targetPercent: S.optional(S.Number),
          capacityMonitoringApproach: S.optional(S.String),
          waitELBTargetGroupHealthy: S.optional(S.String),
        }),
      ).annotate({ identifier: "Ec2AsgCapacityIncreaseConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({ timeoutMinutes: S.optional(S.Number), approvalRole: S.String }),
      ).annotate({ identifier: "ExecutionApprovalConfiguration" });
    case 7:
      return S.suspend(() => S.Struct({ routingControlArn: S.String, state: S.String })).annotate({
        identifier: "ArcRoutingControlState",
      });
    case 8:
      return S.Array(__S(839, __c26, 7));
    case 9:
      return S.Record(S.String, /*@__PURE__*/ __S(840, __c26, 8).pipe(S.optional));
    case 10:
      return S.suspend(() =>
        S.Struct({
          timeoutMinutes: S.optional(S.Number),
          crossAccountRole: S.optional(S.String),
          externalId: S.optional(S.String),
          regionAndRoutingControls: __S(841, __c26, 9),
        }),
      ).annotate({ identifier: "ArcRoutingControlConfiguration" });
    case 11:
      return S.suspend(() => S.Struct({ ungraceful: S.optional(S.String) })).annotate({
        identifier: "GlobalAuroraUngraceful",
      });
    case 12:
      return S.suspend(() =>
        S.Struct({
          timeoutMinutes: S.optional(S.Number),
          crossAccountRole: S.optional(S.String),
          externalId: S.optional(S.String),
          behavior: S.String,
          ungraceful: S.optional(__S(843, __c26, 11)),
          globalClusterIdentifier: S.String,
          databaseClusterArns: __S(768, __c24, 0),
        }),
      ).annotate({ identifier: "GlobalAuroraConfiguration" });
    case 13:
      return S.suspend(() =>
        S.Struct({ steps: S.suspend(() => __S(870, __c27, 6)).annotate({ identifier: "Steps" }) }),
      ).annotate({ identifier: "ParallelExecutionBlockConfiguration" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          crossAccountRole: S.optional(S.String),
          externalId: S.optional(S.String),
          arn: S.String,
        }),
      ).annotate({ identifier: "RegionSwitchPlanConfiguration" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          crossAccountRole: S.optional(S.String),
          externalId: S.optional(S.String),
          clusterArn: S.optional(S.String),
          serviceArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Service" });
    case 16:
      return S.Array(__S(847, __c26, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({
          timeoutMinutes: S.optional(S.Number),
          services: __S(848, __c26, 16),
          ungraceful: S.optional(__S(836, __c26, 4)),
          targetPercent: S.optional(S.Number),
          capacityMonitoringApproach: S.optional(S.String),
          waitELBTargetGroupHealthy: S.optional(S.String),
        }),
      ).annotate({ identifier: "EcsCapacityIncreaseConfiguration" });
    case 18:
      return S.suspend(() => S.Struct({ apiVersion: S.String, kind: S.String })).annotate({
        identifier: "KubernetesResourceType",
      });
    case 19:
      return S.suspend(() =>
        S.Struct({ namespace: S.String, name: S.String, hpaName: S.optional(S.String) }),
      ).annotate({ identifier: "KubernetesScalingResource" });
    case 20:
      return S.Record(S.String, /*@__PURE__*/ __S(851, __c26, 19).pipe(S.optional));
    case 21:
      return S.Record(S.String, /*@__PURE__*/ __S(852, __c26, 20).pipe(S.optional));
    case 22:
      return S.Array(__S(853, __c26, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({
          crossAccountRole: S.optional(S.String),
          externalId: S.optional(S.String),
          clusterArn: S.String,
        }),
      ).annotate({ identifier: "EksCluster" });
    case 24:
      return S.Array(__S(855, __c26, 23));
    case 25:
      return S.suspend(() =>
        S.Struct({
          timeoutMinutes: S.optional(S.Number),
          kubernetesResourceType: __S(850, __c26, 18),
          scalingResources: S.optional(__S(854, __c26, 22)),
          eksClusters: S.optional(__S(856, __c26, 24)),
          ungraceful: S.optional(__S(836, __c26, 4)),
          targetPercent: S.optional(S.Number),
          capacityMonitoringApproach: S.optional(S.String),
        }),
      ).annotate({ identifier: "EksResourceScalingConfiguration" });
    case 26:
      return S.suspend(() =>
        S.Struct({ recordSetIdentifier: S.optional(S.String), region: S.optional(S.String) }),
      ).annotate({ identifier: "Route53ResourceRecordSet" });
    case 27:
      return S.Array(__S(858, __c26, 26));
    case 28:
      return S.suspend(() =>
        S.Struct({
          timeoutMinutes: S.optional(S.Number),
          crossAccountRole: S.optional(S.String),
          externalId: S.optional(S.String),
          hostedZoneId: S.String,
          recordName: S.String,
          recordSets: S.optional(__S(859, __c26, 27)),
        }),
      ).annotate({ identifier: "Route53HealthCheckConfiguration" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          timeoutMinutes: S.optional(S.Number),
          crossAccountRole: S.optional(S.String),
          externalId: S.optional(S.String),
          dbInstanceArnMap: __S(800, __c25, 0),
        }),
      ).annotate({ identifier: "RdsPromoteReadReplicaConfiguration" });
    case 30:
      return S.Record(S.String, /*@__PURE__*/ __S(846, __c26, 14).pipe(S.optional));
    case 31:
      return S.suspend(() =>
        S.Struct({
          timeoutMinutes: S.optional(S.Number),
          action: S.String,
          regionEventSourceMappings: __S(862, __c26, 30),
          ungraceful: S.optional(__S(834, __c26, 2)),
        }),
      ).annotate({ identifier: "LambdaEventSourceMappingConfiguration" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          timeoutMinutes: S.optional(S.Number),
          crossAccountRole: S.optional(S.String),
          externalId: S.optional(S.String),
          globalClusterIdentifier: S.String,
          regionDatabaseClusterArns: __S(800, __c25, 0),
          targetPercent: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AuroraServerlessScalingConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          timeoutMinutes: S.optional(S.Number),
          crossAccountRole: S.optional(S.String),
          externalId: S.optional(S.String),
          globalClusterIdentifier: S.String,
          regionDatabaseClusterArns: __S(800, __c25, 0),
          instanceArns: __S(800, __c25, 0),
        }),
      ).annotate({ identifier: "AuroraProvisionedScalingConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          timeoutMinutes: S.optional(S.Number),
          crossAccountRole: S.optional(S.String),
          externalId: S.optional(S.String),
          behavior: S.String,
          ungraceful: S.optional(__S(843, __c26, 11)),
          globalClusterIdentifier: S.String,
          regionDatabaseClusterArns: __S(800, __c25, 0),
        }),
      ).annotate({ identifier: "NeptuneGlobalDatabaseConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          timeoutMinutes: S.optional(S.Number),
          crossAccountRole: S.optional(S.String),
          externalId: S.optional(S.String),
          dbInstanceArnMap: __S(800, __c25, 0),
          ungraceful: S.optional(__S(843, __c26, 11)),
        }),
      ).annotate({ identifier: "RdsSwitchoverReadReplicaConfiguration" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ customActionLambdaConfig: __S(835, __c26, 3) }),
        /*@__PURE__*/ S.Struct({ ec2AsgCapacityIncreaseConfig: __S(837, __c26, 5) }),
        /*@__PURE__*/ S.Struct({ executionApprovalConfig: __S(838, __c26, 6) }),
        /*@__PURE__*/ S.Struct({ arcRoutingControlConfig: __S(842, __c26, 10) }),
        /*@__PURE__*/ S.Struct({ globalAuroraConfig: __S(844, __c26, 12) }),
        /*@__PURE__*/ S.Struct({
          parallelConfig: /*@__PURE__*/ S.suspend(
            (): S.Schema<ParallelExecutionBlockConfiguration> => __S(845, __c26, 13),
          ).annotate({ identifier: "ParallelExecutionBlockConfiguration" }),
        }),
        /*@__PURE__*/ S.Struct({ regionSwitchPlanConfig: __S(846, __c26, 14) }),
        /*@__PURE__*/ S.Struct({ ecsCapacityIncreaseConfig: __S(849, __c26, 17) }),
        /*@__PURE__*/ S.Struct({ eksResourceScalingConfig: __S(857, __c26, 25) }),
        /*@__PURE__*/ S.Struct({ route53HealthCheckConfig: __S(860, __c26, 28) }),
        /*@__PURE__*/ S.Struct({ documentDbConfig: __S(844, __c26, 12) }),
        /*@__PURE__*/ S.Struct({ rdsPromoteReadReplicaConfig: __S(861, __c26, 29) }),
        /*@__PURE__*/ S.Struct({ rdsCreateCrossRegionReadReplicaConfig: __S(861, __c26, 29) }),
        /*@__PURE__*/ S.Struct({ lambdaEventSourceMappingConfig: __S(863, __c26, 31) }),
        /*@__PURE__*/ S.Struct({ auroraServerlessScalingConfig: __S(864, __c27, 0) }),
        /*@__PURE__*/ S.Struct({ auroraProvisionedScalingConfig: __S(865, __c27, 1) }),
        /*@__PURE__*/ S.Struct({ neptuneGlobalDatabaseConfig: __S(866, __c27, 2) }),
        /*@__PURE__*/ S.Struct({ rdsSwitchoverReadReplicaConfig: __S(867, __c27, 3) }),
      ]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          executionBlockConfiguration: S.suspend(() => __S(868, __c27, 4)).annotate({
            identifier: "ExecutionBlockConfiguration",
          }),
          executionBlockType: S.String,
        }),
      ).annotate({ identifier: "Step" });
    case 6:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<Step> => __S(869, __c27, 5)).annotate({
          identifier: "Step",
        }),
      );
    case 7:
      return S.suspend(() =>
        S.Struct({
          steps: S.optional(__S(870, __c27, 6)),
          workflowTargetAction: S.String,
          workflowTargetRegion: S.optional(S.String),
          workflowDescription: S.optional(S.String),
        }),
      ).annotate({ identifier: "Workflow" });
    case 8:
      return S.Array(__S(871, __c27, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          crossAccountRole: S.optional(S.String),
          externalId: S.optional(S.String),
          resourceIdentifier: S.String,
          alarmType: S.String,
        }),
      ).annotate({ identifier: "AssociatedAlarm" });
    case 10:
      return S.Record(S.String, /*@__PURE__*/ __S(873, __c27, 9).pipe(S.optional));
    case 11:
      return S.suspend(() =>
        S.Struct({ associatedAlarmName: S.String, condition: S.String }),
      ).annotate({ identifier: "TriggerCondition" });
    case 12:
      return S.Array(__S(875, __c27, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          targetRegion: S.String,
          action: S.String,
          conditions: __S(876, __c27, 12),
          minDelayMinutesBetweenExecutions: S.Number,
        }),
      ).annotate({ identifier: "Trigger" });
    case 14:
      return S.Array(__S(877, __c27, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({ bucketPath: S.optional(S.String), bucketOwner: S.optional(S.String) }),
      ).annotate({ identifier: "S3ReportOutputConfiguration" });
    case 16:
      return S.Union([/*@__PURE__*/ S.Struct({ s3Configuration: __S(879, __c27, 15) })]);
    case 17:
      return S.Array(__S(880, __c27, 16));
    case 18:
      return S.suspend(() => S.Struct({ reportOutput: S.optional(__S(881, __c27, 17)) })).annotate({
        identifier: "ReportConfiguration",
      });
    case 19:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          description: S.optional(S.String),
          workflows: __S(872, __c27, 8),
          executionRole: S.String,
          recoveryTimeObjectiveMinutes: S.optional(S.Number),
          associatedAlarms: S.optional(__S(874, __c27, 10)),
          triggers: S.optional(__S(878, __c27, 14)),
          reportConfiguration: S.optional(__S(882, __c27, 18)),
          serviceQuotaChecksEnabled: S.optional(S.Boolean),
          name: S.String,
          regions: __S(768, __c24, 0),
          recoveryApproach: S.String,
          primaryRegion: S.optional(S.String),
          owner: S.String,
          version: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Plan" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ plan: S.optional(__S(883, __c27, 19)) })).annotate({
        identifier: "CreatePlanResponse",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseControlPlaneEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeletePlanRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
