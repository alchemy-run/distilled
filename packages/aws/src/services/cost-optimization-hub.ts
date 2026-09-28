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
  sdkId: "Cost Optimization Hub",
  target: "CostOptimizationHubService",
  version: "2022-07-26",
  sigv4: "cost-optimization-hub",
  protocol: awsJson1_0Protocol,
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
                `https://cost-optimization-hub-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://cost-optimization-hub-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://cost-optimization-hub.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://cost-optimization-hub.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  )<{ readonly message: string; readonly resourceId: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason?: ValidationExceptionReason;
    readonly fields?: ValidationExceptionDetail[];
  }> {}
export interface GetPreferencesRequest {}
export type SavingsEstimationMode =
  | "BeforeDiscounts"
  | "AfterDiscounts"
  | (string & {});
export type MemberAccountDiscountVisibility = "All" | "None" | (string & {});
export type Term = "OneYear" | "ThreeYears" | (string & {});
export type PaymentOption =
  | "AllUpfront"
  | "PartialUpfront"
  | "NoUpfront"
  | (string & {});
export interface PreferredCommitment {
  term?: Term;
  paymentOption?: PaymentOption;
}
export interface GetPreferencesResponse {
  savingsEstimationMode?: SavingsEstimationMode;
  memberAccountDiscountVisibility?: MemberAccountDiscountVisibility;
  preferredCommitment?: PreferredCommitment;
}
export interface GetRecommendationRequest {
  recommendationId: string;
}
export type ResourceType =
  | "Ec2Instance"
  | "LambdaFunction"
  | "EbsVolume"
  | "EcsService"
  | "Ec2AutoScalingGroup"
  | "Ec2InstanceSavingsPlans"
  | "ComputeSavingsPlans"
  | "SageMakerSavingsPlans"
  | "Ec2ReservedInstances"
  | "RdsReservedInstances"
  | "OpenSearchReservedInstances"
  | "RedshiftReservedInstances"
  | "ElastiCacheReservedInstances"
  | "RdsDbInstanceStorage"
  | "RdsDbInstance"
  | "AuroraDbClusterStorage"
  | "DynamoDbReservedCapacity"
  | "MemoryDbReservedInstances"
  | "NatGateway"
  | "DynamoDBTable"
  | "ElastiCacheCluster"
  | "MemoryDBCluster"
  | "DocumentDBCluster"
  | "WorkSpaces"
  | "SageMakerEndpoint"
  | (string & {});
export type Source = "ComputeOptimizer" | "CostExplorer" | (string & {});
export type Datetime = Date;
export type ImplementationEffort =
  | "VeryLow"
  | "Low"
  | "Medium"
  | "High"
  | "VeryHigh"
  | (string & {});
export type ActionType =
  | "Rightsize"
  | "Stop"
  | "Upgrade"
  | "PurchaseSavingsPlans"
  | "PurchaseReservedInstances"
  | "MigrateToGraviton"
  | "Delete"
  | "ScaleIn"
  | (string & {});
export interface ComputeConfiguration {
  vCpu?: number;
  memorySizeInMB?: number;
  architecture?: string;
  platform?: string;
}
export interface LambdaFunctionConfiguration {
  compute?: ComputeConfiguration;
}
export interface Usage {
  usageType?: string;
  usageAmount?: number;
  operation?: string;
  productCode?: string;
  unit?: string;
}
export type UsageList = Usage[];
export interface EstimatedDiscounts {
  savingsPlansDiscount?: number;
  reservedInstancesDiscount?: number;
  otherDiscount?: number;
}
export interface ResourcePricing {
  estimatedCostBeforeDiscounts?: number;
  estimatedNetUnusedAmortizedCommitments?: number;
  estimatedDiscounts?: EstimatedDiscounts;
  estimatedCostAfterDiscounts?: number;
}
export interface ResourceCostCalculation {
  usages?: Usage[];
  pricing?: ResourcePricing;
}
export interface LambdaFunction {
  configuration?: LambdaFunctionConfiguration;
  costCalculation?: ResourceCostCalculation;
}
export interface EcsServiceConfiguration {
  compute?: ComputeConfiguration;
}
export interface EcsService {
  configuration?: EcsServiceConfiguration;
  costCalculation?: ResourceCostCalculation;
}
export interface InstanceConfiguration {
  type?: string;
}
export interface Ec2InstanceConfiguration {
  instance?: InstanceConfiguration;
}
export interface Ec2Instance {
  configuration?: Ec2InstanceConfiguration;
  costCalculation?: ResourceCostCalculation;
}
export interface StorageConfiguration {
  type?: string;
  sizeInGb?: number;
}
export interface BlockStoragePerformanceConfiguration {
  iops?: number;
  throughput?: number;
}
export interface EbsVolumeConfiguration {
  storage?: StorageConfiguration;
  performance?: BlockStoragePerformanceConfiguration;
  attachmentState?: string;
}
export interface EbsVolume {
  configuration?: EbsVolumeConfiguration;
  costCalculation?: ResourceCostCalculation;
}
export interface MixedInstanceConfiguration {
  type?: string;
}
export type MixedInstanceConfigurationList = MixedInstanceConfiguration[];
export type Ec2AutoScalingGroupType =
  | "SingleInstanceType"
  | "MixedInstanceTypes"
  | (string & {});
export type AllocationStrategy = "Prioritized" | "LowestPrice" | (string & {});
export interface Ec2AutoScalingGroupConfiguration {
  instance?: InstanceConfiguration;
  mixedInstances?: MixedInstanceConfiguration[];
  type?: Ec2AutoScalingGroupType;
  allocationStrategy?: AllocationStrategy;
}
export interface Ec2AutoScalingGroup {
  configuration?: Ec2AutoScalingGroupConfiguration;
  costCalculation?: ResourceCostCalculation;
}
export interface Ec2ReservedInstancesConfiguration {
  accountScope?: string;
  service?: string;
  term?: string;
  paymentOption?: string;
  reservedInstancesRegion?: string;
  upfrontCost?: string;
  monthlyRecurringCost?: string;
  normalizedUnitsToPurchase?: string;
  numberOfInstancesToPurchase?: string;
  offeringClass?: string;
  instanceFamily?: string;
  instanceType?: string;
  currentGeneration?: string;
  platform?: string;
  tenancy?: string;
  sizeFlexEligible?: boolean;
}
export interface ReservedInstancesPricing {
  estimatedOnDemandCost?: number;
  monthlyReservationEligibleCost?: number;
  savingsPercentage?: number;
  estimatedMonthlyAmortizedReservationCost?: number;
}
export interface ReservedInstancesCostCalculation {
  pricing?: ReservedInstancesPricing;
}
export interface Ec2ReservedInstances {
  configuration?: Ec2ReservedInstancesConfiguration;
  costCalculation?: ReservedInstancesCostCalculation;
}
export interface RdsReservedInstancesConfiguration {
  accountScope?: string;
  service?: string;
  term?: string;
  paymentOption?: string;
  reservedInstancesRegion?: string;
  upfrontCost?: string;
  monthlyRecurringCost?: string;
  normalizedUnitsToPurchase?: string;
  numberOfInstancesToPurchase?: string;
  instanceFamily?: string;
  instanceType?: string;
  sizeFlexEligible?: boolean;
  currentGeneration?: string;
  licenseModel?: string;
  databaseEdition?: string;
  databaseEngine?: string;
  deploymentOption?: string;
}
export interface RdsReservedInstances {
  configuration?: RdsReservedInstancesConfiguration;
  costCalculation?: ReservedInstancesCostCalculation;
}
export interface ElastiCacheReservedInstancesConfiguration {
  accountScope?: string;
  service?: string;
  term?: string;
  paymentOption?: string;
  reservedInstancesRegion?: string;
  upfrontCost?: string;
  monthlyRecurringCost?: string;
  normalizedUnitsToPurchase?: string;
  numberOfInstancesToPurchase?: string;
  instanceFamily?: string;
  instanceType?: string;
  currentGeneration?: string;
  sizeFlexEligible?: boolean;
}
export interface ElastiCacheReservedInstances {
  configuration?: ElastiCacheReservedInstancesConfiguration;
  costCalculation?: ReservedInstancesCostCalculation;
}
export interface OpenSearchReservedInstancesConfiguration {
  accountScope?: string;
  service?: string;
  term?: string;
  paymentOption?: string;
  reservedInstancesRegion?: string;
  upfrontCost?: string;
  monthlyRecurringCost?: string;
  normalizedUnitsToPurchase?: string;
  numberOfInstancesToPurchase?: string;
  instanceType?: string;
  currentGeneration?: string;
  sizeFlexEligible?: boolean;
}
export interface OpenSearchReservedInstances {
  configuration?: OpenSearchReservedInstancesConfiguration;
  costCalculation?: ReservedInstancesCostCalculation;
}
export interface RedshiftReservedInstancesConfiguration {
  accountScope?: string;
  service?: string;
  term?: string;
  paymentOption?: string;
  reservedInstancesRegion?: string;
  upfrontCost?: string;
  monthlyRecurringCost?: string;
  normalizedUnitsToPurchase?: string;
  numberOfInstancesToPurchase?: string;
  instanceFamily?: string;
  instanceType?: string;
  sizeFlexEligible?: boolean;
  currentGeneration?: string;
}
export interface RedshiftReservedInstances {
  configuration?: RedshiftReservedInstancesConfiguration;
  costCalculation?: ReservedInstancesCostCalculation;
}
export interface Ec2InstanceSavingsPlansConfiguration {
  accountScope?: string;
  term?: string;
  paymentOption?: string;
  hourlyCommitment?: string;
  instanceFamily?: string;
  savingsPlansRegion?: string;
}
export interface SavingsPlansPricing {
  monthlySavingsPlansEligibleCost?: number;
  estimatedMonthlyCommitment?: number;
  savingsPercentage?: number;
  estimatedOnDemandCost?: number;
}
export interface SavingsPlansCostCalculation {
  pricing?: SavingsPlansPricing;
}
export interface Ec2InstanceSavingsPlans {
  configuration?: Ec2InstanceSavingsPlansConfiguration;
  costCalculation?: SavingsPlansCostCalculation;
}
export interface ComputeSavingsPlansConfiguration {
  accountScope?: string;
  term?: string;
  paymentOption?: string;
  hourlyCommitment?: string;
}
export interface ComputeSavingsPlans {
  configuration?: ComputeSavingsPlansConfiguration;
  costCalculation?: SavingsPlansCostCalculation;
}
export interface SageMakerSavingsPlansConfiguration {
  accountScope?: string;
  term?: string;
  paymentOption?: string;
  hourlyCommitment?: string;
}
export interface SageMakerSavingsPlans {
  configuration?: SageMakerSavingsPlansConfiguration;
  costCalculation?: SavingsPlansCostCalculation;
}
export interface DbInstanceConfiguration {
  dbInstanceClass?: string;
}
export interface RdsDbInstanceConfiguration {
  instance?: DbInstanceConfiguration;
}
export interface RdsDbInstance {
  configuration?: RdsDbInstanceConfiguration;
  costCalculation?: ResourceCostCalculation;
}
export interface RdsDbInstanceStorageConfiguration {
  storageType?: string;
  allocatedStorageInGb?: number;
  iops?: number;
  storageThroughput?: number;
}
export interface RdsDbInstanceStorage {
  configuration?: RdsDbInstanceStorageConfiguration;
  costCalculation?: ResourceCostCalculation;
}
export interface AuroraDbClusterStorageConfiguration {
  storageType?: string;
}
export interface AuroraDbClusterStorage {
  configuration?: AuroraDbClusterStorageConfiguration;
  costCalculation?: ResourceCostCalculation;
}
export interface DynamoDbReservedCapacityConfiguration {
  accountScope?: string;
  service?: string;
  term?: string;
  paymentOption?: string;
  reservedInstancesRegion?: string;
  upfrontCost?: string;
  monthlyRecurringCost?: string;
  numberOfCapacityUnitsToPurchase?: string;
  capacityUnits?: string;
}
export interface DynamoDbReservedCapacity {
  configuration?: DynamoDbReservedCapacityConfiguration;
  costCalculation?: ReservedInstancesCostCalculation;
}
export interface MemoryDbReservedInstancesConfiguration {
  accountScope?: string;
  service?: string;
  term?: string;
  paymentOption?: string;
  reservedInstancesRegion?: string;
  upfrontCost?: string;
  monthlyRecurringCost?: string;
  normalizedUnitsToPurchase?: string;
  numberOfInstancesToPurchase?: string;
  instanceType?: string;
  instanceFamily?: string;
  sizeFlexEligible?: boolean;
  currentGeneration?: string;
}
export interface MemoryDbReservedInstances {
  configuration?: MemoryDbReservedInstancesConfiguration;
  costCalculation?: ReservedInstancesCostCalculation;
}
export interface NatGatewayConfiguration {
  activeConnectionCount?: number;
  packetsInFromSource?: number;
  packetsInFromDestination?: number;
}
export interface NatGateway {
  configuration?: NatGatewayConfiguration;
  costCalculation?: ResourceCostCalculation;
}
export interface DynamoDbTable {
  costCalculation?: ResourceCostCalculation;
}
export interface ElastiCacheCluster {
  costCalculation?: ResourceCostCalculation;
}
export interface MemoryDbCluster {
  costCalculation?: ResourceCostCalculation;
}
export interface DocumentDbCluster {
  costCalculation?: ResourceCostCalculation;
}
export interface WorkSpaces {
  costCalculation?: ResourceCostCalculation;
}
export interface SageMakerEndpoint {
  costCalculation?: ResourceCostCalculation;
}
export type ResourceDetails =
  | {
      lambdaFunction: LambdaFunction;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService: EcsService;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance: Ec2Instance;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume: EbsVolume;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup: Ec2AutoScalingGroup;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances: Ec2ReservedInstances;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances: RdsReservedInstances;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances: ElastiCacheReservedInstances;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances: OpenSearchReservedInstances;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances: RedshiftReservedInstances;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans: Ec2InstanceSavingsPlans;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans: ComputeSavingsPlans;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans: SageMakerSavingsPlans;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance: RdsDbInstance;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage: RdsDbInstanceStorage;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage: AuroraDbClusterStorage;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity: DynamoDbReservedCapacity;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances: MemoryDbReservedInstances;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway: NatGateway;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable: DynamoDbTable;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster: ElastiCacheCluster;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster: MemoryDbCluster;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster: DocumentDbCluster;
      workSpaces?: never;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces: WorkSpaces;
      sageMakerEndpoint?: never;
    }
  | {
      lambdaFunction?: never;
      ecsService?: never;
      ec2Instance?: never;
      ebsVolume?: never;
      ec2AutoScalingGroup?: never;
      ec2ReservedInstances?: never;
      rdsReservedInstances?: never;
      elastiCacheReservedInstances?: never;
      openSearchReservedInstances?: never;
      redshiftReservedInstances?: never;
      ec2InstanceSavingsPlans?: never;
      computeSavingsPlans?: never;
      sageMakerSavingsPlans?: never;
      rdsDbInstance?: never;
      rdsDbInstanceStorage?: never;
      auroraDbClusterStorage?: never;
      dynamoDbReservedCapacity?: never;
      memoryDbReservedInstances?: never;
      natGateway?: never;
      dynamoDbTable?: never;
      elastiCacheCluster?: never;
      memoryDbCluster?: never;
      documentDbCluster?: never;
      workSpaces?: never;
      sageMakerEndpoint: SageMakerEndpoint;
    };
export interface Tag {
  key?: string;
  value?: string;
}
export type TagList = Tag[];
export interface GetRecommendationResponse {
  recommendationId?: string;
  resourceId?: string;
  resourceArn?: string;
  accountId?: string;
  currencyCode?: string;
  recommendationLookbackPeriodInDays?: number;
  costCalculationLookbackPeriodInDays?: number;
  estimatedSavingsPercentage?: number;
  estimatedSavingsOverCostCalculationLookbackPeriod?: number;
  currentResourceType?: ResourceType;
  recommendedResourceType?: ResourceType;
  region?: string;
  source?: Source;
  lastRefreshTimestamp?: Date;
  estimatedMonthlySavings?: number;
  estimatedMonthlyCost?: number;
  implementationEffort?: ImplementationEffort;
  restartNeeded?: boolean;
  actionType?: ActionType;
  rollbackPossible?: boolean;
  currentResourceDetails?: ResourceDetails;
  recommendedResourceDetails?: ResourceDetails;
  tags?: Tag[];
}
export type GranularityType = "Daily" | "Monthly" | (string & {});
export interface TimePeriod {
  start: string;
  end: string;
}
export type MaxResults = number;
export type Order = "Asc" | "Desc" | (string & {});
export interface OrderBy {
  dimension?: string;
  order?: Order;
}
export interface ListEfficiencyMetricsRequest {
  groupBy?: string;
  granularity: GranularityType;
  timePeriod: TimePeriod;
  maxResults?: number;
  orderBy?: OrderBy;
  nextToken?: string;
}
export interface MetricsByTime {
  score?: number;
  savings?: number;
  spend?: number;
  timestamp?: string;
}
export type MetricsByTimeList = MetricsByTime[];
export interface EfficiencyMetricsByGroup {
  metricsByTime?: MetricsByTime[];
  group?: string;
  message?: string;
}
export type EfficiencyMetricsByGroupList = EfficiencyMetricsByGroup[];
export interface ListEfficiencyMetricsResponse {
  efficiencyMetricsByGroup?: EfficiencyMetricsByGroup[];
  nextToken?: string;
}
export type AccountId = string;
export interface ListEnrollmentStatusesRequest {
  includeOrganizationInfo?: boolean;
  accountId?: string;
  nextToken?: string;
  maxResults?: number;
}
export type EnrollmentStatus = "Active" | "Inactive" | (string & {});
export interface AccountEnrollmentStatus {
  accountId?: string;
  status?: EnrollmentStatus;
  lastUpdatedTimestamp?: Date;
  createdTimestamp?: Date;
}
export type AccountEnrollmentStatuses = AccountEnrollmentStatus[];
export interface ListEnrollmentStatusesResponse {
  items?: AccountEnrollmentStatus[];
  includeMemberAccounts?: boolean;
  nextToken?: string;
}
export type ImplementationEffortList = ImplementationEffort[];
export type AccountIdList = string[];
export type RegionList = string[];
export type ResourceTypeList = ResourceType[];
export type ActionTypeList = ActionType[];
export type ResourceIdList = string[];
export type ResourceArnList = string[];
export type RecommendationIdList = string[];
export interface Filter {
  restartNeeded?: boolean;
  rollbackPossible?: boolean;
  implementationEfforts?: ImplementationEffort[];
  accountIds?: string[];
  regions?: string[];
  resourceTypes?: ResourceType[];
  actionTypes?: ActionType[];
  tags?: Tag[];
  resourceIds?: string[];
  resourceArns?: string[];
  recommendationIds?: string[];
}
export interface ListRecommendationsRequest {
  filter?: Filter;
  orderBy?: OrderBy;
  includeAllRecommendations?: boolean;
  maxResults?: number;
  nextToken?: string;
}
export interface Recommendation {
  recommendationId?: string;
  accountId?: string;
  region?: string;
  resourceId?: string;
  resourceArn?: string;
  currentResourceType?: string;
  recommendedResourceType?: string;
  estimatedMonthlySavings?: number;
  estimatedSavingsPercentage?: number;
  estimatedMonthlyCost?: number;
  currencyCode?: string;
  implementationEffort?: string;
  restartNeeded?: boolean;
  actionType?: string;
  rollbackPossible?: boolean;
  currentResourceSummary?: string;
  recommendedResourceSummary?: string;
  lastRefreshTimestamp?: Date;
  recommendationLookbackPeriodInDays?: number;
  source?: Source;
  tags?: Tag[];
}
export type RecommendationList = Recommendation[];
export interface ListRecommendationsResponse {
  items?: Recommendation[];
  nextToken?: string;
}
export type SummaryMetrics = "SavingsPercentage" | (string & {});
export type SummaryMetricsList = SummaryMetrics[];
export interface ListRecommendationSummariesRequest {
  filter?: Filter;
  groupBy: string;
  maxResults?: number;
  metrics?: SummaryMetrics[];
  nextToken?: string;
}
export interface RecommendationSummary {
  group?: string;
  estimatedMonthlySavings?: number;
  recommendationCount?: number;
}
export type RecommendationSummariesList = RecommendationSummary[];
export interface SummaryMetricsResult {
  savingsPercentage?: string;
}
export interface ListRecommendationSummariesResponse {
  estimatedTotalDedupedSavings?: number;
  items?: RecommendationSummary[];
  groupBy?: string;
  currencyCode?: string;
  metrics?: SummaryMetricsResult;
  nextToken?: string;
}
export interface UpdateEnrollmentStatusRequest {
  status: EnrollmentStatus;
  includeMemberAccounts?: boolean;
}
export interface UpdateEnrollmentStatusResponse {
  status?: string;
}
export interface UpdatePreferencesRequest {
  savingsEstimationMode?: SavingsEstimationMode;
  memberAccountDiscountVisibility?: MemberAccountDiscountVisibility;
  preferredCommitment?: PreferredCommitment;
}
export interface UpdatePreferencesResponse {
  savingsEstimationMode?: SavingsEstimationMode;
  memberAccountDiscountVisibility?: MemberAccountDiscountVisibility;
  preferredCommitment?: PreferredCommitment;
}
export type ValidationExceptionReason =
  | "FieldValidationFailed"
  | "Other"
  | (string & {});
export interface ValidationExceptionDetail {
  fieldName: string;
  message: string;
}
export type ValidationExceptionDetails = ValidationExceptionDetail[];
export type GetPreferencesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a set of preferences for an account in order to add account-specific preferences into the service. These preferences impact how the savings associated with recommendations are presented—estimated savings after discounts or estimated savings before discounts, for example.
 */
export const getPreferences: API.OperationMethod<
  GetPreferencesRequest,
  GetPreferencesResponse,
  GetPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPreferences",
})) as any;

export type GetRecommendationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns both the current and recommended resource configuration and the estimated cost impact for a recommendation.
 *
 * The `recommendationId` is only valid for up to a maximum of 24 hours as recommendations are refreshed daily. To retrieve the `recommendationId`, use the `ListRecommendations` API.
 */
export const getRecommendation: API.OperationMethod<
  GetRecommendationRequest,
  GetRecommendationResponse,
  GetRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { recommendationId: 0 },
    output: { lastRefreshTimestamp: D.ts },
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
  operationName: "GetRecommendation",
})) as any;

export type ListEfficiencyMetricsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns cost efficiency metrics aggregated over time and optionally grouped by a specified dimension. The metrics provide insights into your cost optimization progress by tracking estimated savings, spending, and measures how effectively you're optimizing your Cloud resources.
 *
 * The operation supports both daily and monthly time granularities and allows grouping results by account ID, Amazon Web Services Region. Results are returned as time-series data, enabling you to analyze trends in your cost optimization performance over the specified time period.
 */
export const listEfficiencyMetrics: API.PaginatedOperationMethod<
  ListEfficiencyMetricsRequest,
  ListEfficiencyMetricsResponse,
  ListEfficiencyMetricsError,
  Credentials | HttpClient.HttpClient,
  EfficiencyMetricsByGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      groupBy: 0,
      granularity: 0,
      timePeriod: { start: 0, end: 0 },
      maxResults: 0,
      orderBy: i_OrderBy,
      nextToken: 0,
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
  operationName: "ListEfficiencyMetrics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "efficiencyMetricsByGroup",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnrollmentStatusesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the enrollment status for an account. It can also return the list of accounts that are enrolled under the organization.
 */
export const listEnrollmentStatuses: API.PaginatedOperationMethod<
  ListEnrollmentStatusesRequest,
  ListEnrollmentStatusesResponse,
  ListEnrollmentStatusesError,
  Credentials | HttpClient.HttpClient,
  AccountEnrollmentStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      includeOrganizationInfo: 0,
      accountId: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      items: D.list({ lastUpdatedTimestamp: D.ts, createdTimestamp: D.ts }),
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
  operationName: "ListEnrollmentStatuses",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of recommendations.
 */
export const listRecommendations: API.PaginatedOperationMethod<
  ListRecommendationsRequest,
  ListRecommendationsResponse,
  ListRecommendationsError,
  Credentials | HttpClient.HttpClient,
  Recommendation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      filter: i_Filter,
      orderBy: i_OrderBy,
      includeAllRecommendations: 0,
      maxResults: 0,
      nextToken: 0,
    },
    output: { items: D.list({ lastRefreshTimestamp: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecommendationSummariesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a concise representation of savings estimates for resources. Also returns de-duped savings across different types of recommendations.
 *
 * The following filters are not supported for this API: `recommendationIds`, `resourceArns`, and `resourceIds`.
 */
export const listRecommendationSummaries: API.PaginatedOperationMethod<
  ListRecommendationSummariesRequest,
  ListRecommendationSummariesResponse,
  ListRecommendationSummariesError,
  Credentials | HttpClient.HttpClient,
  RecommendationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      filter: i_Filter,
      groupBy: 0,
      maxResults: 0,
      metrics: 0,
      nextToken: 0,
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
  operationName: "ListRecommendationSummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type UpdateEnrollmentStatusError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the enrollment (opt in and opt out) status of an account to the Cost Optimization Hub service.
 *
 * If the account is a management account of an organization, this action can also be used to enroll member accounts of the organization.
 *
 * You must have the appropriate permissions to opt in to Cost Optimization Hub and to view its recommendations. When you opt in, Cost Optimization Hub automatically creates a service-linked role in your account to access its data.
 */
export const updateEnrollmentStatus: API.OperationMethod<
  UpdateEnrollmentStatusRequest,
  UpdateEnrollmentStatusResponse,
  UpdateEnrollmentStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { status: 0, includeMemberAccounts: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnrollmentStatus",
})) as any;

export type UpdatePreferencesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a set of preferences for an account in order to add account-specific preferences into the service. These preferences impact how the savings associated with recommendations are presented.
 */
export const updatePreferences: API.OperationMethod<
  UpdatePreferencesRequest,
  UpdatePreferencesResponse,
  UpdatePreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      savingsEstimationMode: 0,
      memberAccountDiscountVisibility: 0,
      preferredCommitment: { term: 0, paymentOption: 0 },
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
  operationName: "UpdatePreferences",
})) as any;

const i_Filter: D.LazyStruct = () => ({
  restartNeeded: 0,
  rollbackPossible: 0,
  implementationEfforts: 0,
  accountIds: 0,
  regions: 0,
  resourceTypes: 0,
  actionTypes: 0,
  tags: D.list({ key: 0, value: 0 }),
  resourceIds: 0,
  resourceArns: 0,
  recommendationIds: 0,
});
const i_OrderBy: D.LazyStruct = () => ({ dimension: 0, order: 0 });
