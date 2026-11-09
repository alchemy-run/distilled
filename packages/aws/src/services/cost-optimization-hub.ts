import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Cost Optimization Hub",
  serviceShapeName: "CostOptimizationHubService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "cost-optimization-hub" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-07-26");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cost-optimization-hub.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://cost-optimization-hub.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://cost-optimization-hub.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "CostOptimizationHub",
  service: "CostOptimizationHub",
  templates: false,
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()), resourceId: S.String },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      fields: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(97, __c3, 1)).annotate({
          identifier: "ValidationExceptionDetails",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export interface GetPreferencesRequest {}
export type SavingsEstimationMode = "BeforeDiscounts" | "AfterDiscounts" | (string & {});
export type MemberAccountDiscountVisibility = "All" | "None" | (string & {});
export type Term = "OneYear" | "ThreeYears" | (string & {});
export type PaymentOption = "AllUpfront" | "PartialUpfront" | "NoUpfront" | (string & {});
export interface PreferredCommitment {
  term?: Term | undefined;
  paymentOption?: PaymentOption | undefined;
}
export interface GetPreferencesResponse {
  savingsEstimationMode?: SavingsEstimationMode | undefined;
  memberAccountDiscountVisibility?: MemberAccountDiscountVisibility | undefined;
  preferredCommitment?: PreferredCommitment | undefined;
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
  vCpu?: number | undefined;
  memorySizeInMB?: number | undefined;
  architecture?: string | undefined;
  platform?: string | undefined;
}
export interface LambdaFunctionConfiguration {
  compute?: ComputeConfiguration | undefined;
}
export interface Usage {
  usageType?: string | undefined;
  usageAmount?: number | undefined;
  operation?: string | undefined;
  productCode?: string | undefined;
  unit?: string | undefined;
}
export type UsageList = Usage[];
export interface EstimatedDiscounts {
  savingsPlansDiscount?: number | undefined;
  reservedInstancesDiscount?: number | undefined;
  otherDiscount?: number | undefined;
}
export interface ResourcePricing {
  estimatedCostBeforeDiscounts?: number | undefined;
  estimatedNetUnusedAmortizedCommitments?: number | undefined;
  estimatedDiscounts?: EstimatedDiscounts | undefined;
  estimatedCostAfterDiscounts?: number | undefined;
}
export interface ResourceCostCalculation {
  usages?: Usage[] | undefined;
  pricing?: ResourcePricing | undefined;
}
export interface LambdaFunction {
  configuration?: LambdaFunctionConfiguration | undefined;
  costCalculation?: ResourceCostCalculation | undefined;
}
export interface EcsServiceConfiguration {
  compute?: ComputeConfiguration | undefined;
}
export interface EcsService {
  configuration?: EcsServiceConfiguration | undefined;
  costCalculation?: ResourceCostCalculation | undefined;
}
export interface InstanceConfiguration {
  type?: string | undefined;
}
export interface Ec2InstanceConfiguration {
  instance?: InstanceConfiguration | undefined;
}
export interface Ec2Instance {
  configuration?: Ec2InstanceConfiguration | undefined;
  costCalculation?: ResourceCostCalculation | undefined;
}
export interface StorageConfiguration {
  type?: string | undefined;
  sizeInGb?: number | undefined;
}
export interface BlockStoragePerformanceConfiguration {
  iops?: number | undefined;
  throughput?: number | undefined;
}
export interface EbsVolumeConfiguration {
  storage?: StorageConfiguration | undefined;
  performance?: BlockStoragePerformanceConfiguration | undefined;
  attachmentState?: string | undefined;
}
export interface EbsVolume {
  configuration?: EbsVolumeConfiguration | undefined;
  costCalculation?: ResourceCostCalculation | undefined;
}
export interface MixedInstanceConfiguration {
  type?: string | undefined;
}
export type MixedInstanceConfigurationList = MixedInstanceConfiguration[];
export type Ec2AutoScalingGroupType = "SingleInstanceType" | "MixedInstanceTypes" | (string & {});
export type AllocationStrategy = "Prioritized" | "LowestPrice" | (string & {});
export interface Ec2AutoScalingGroupConfiguration {
  instance?: InstanceConfiguration | undefined;
  mixedInstances?: MixedInstanceConfiguration[] | undefined;
  type?: Ec2AutoScalingGroupType | undefined;
  allocationStrategy?: AllocationStrategy | undefined;
}
export interface Ec2AutoScalingGroup {
  configuration?: Ec2AutoScalingGroupConfiguration | undefined;
  costCalculation?: ResourceCostCalculation | undefined;
}
export interface Ec2ReservedInstancesConfiguration {
  accountScope?: string | undefined;
  service?: string | undefined;
  term?: string | undefined;
  paymentOption?: string | undefined;
  reservedInstancesRegion?: string | undefined;
  upfrontCost?: string | undefined;
  monthlyRecurringCost?: string | undefined;
  normalizedUnitsToPurchase?: string | undefined;
  numberOfInstancesToPurchase?: string | undefined;
  offeringClass?: string | undefined;
  instanceFamily?: string | undefined;
  instanceType?: string | undefined;
  currentGeneration?: string | undefined;
  platform?: string | undefined;
  tenancy?: string | undefined;
  sizeFlexEligible?: boolean | undefined;
}
export interface ReservedInstancesPricing {
  estimatedOnDemandCost?: number | undefined;
  monthlyReservationEligibleCost?: number | undefined;
  savingsPercentage?: number | undefined;
  estimatedMonthlyAmortizedReservationCost?: number | undefined;
}
export interface ReservedInstancesCostCalculation {
  pricing?: ReservedInstancesPricing | undefined;
}
export interface Ec2ReservedInstances {
  configuration?: Ec2ReservedInstancesConfiguration | undefined;
  costCalculation?: ReservedInstancesCostCalculation | undefined;
}
export interface RdsReservedInstancesConfiguration {
  accountScope?: string | undefined;
  service?: string | undefined;
  term?: string | undefined;
  paymentOption?: string | undefined;
  reservedInstancesRegion?: string | undefined;
  upfrontCost?: string | undefined;
  monthlyRecurringCost?: string | undefined;
  normalizedUnitsToPurchase?: string | undefined;
  numberOfInstancesToPurchase?: string | undefined;
  instanceFamily?: string | undefined;
  instanceType?: string | undefined;
  sizeFlexEligible?: boolean | undefined;
  currentGeneration?: string | undefined;
  licenseModel?: string | undefined;
  databaseEdition?: string | undefined;
  databaseEngine?: string | undefined;
  deploymentOption?: string | undefined;
}
export interface RdsReservedInstances {
  configuration?: RdsReservedInstancesConfiguration | undefined;
  costCalculation?: ReservedInstancesCostCalculation | undefined;
}
export interface ElastiCacheReservedInstancesConfiguration {
  accountScope?: string | undefined;
  service?: string | undefined;
  term?: string | undefined;
  paymentOption?: string | undefined;
  reservedInstancesRegion?: string | undefined;
  upfrontCost?: string | undefined;
  monthlyRecurringCost?: string | undefined;
  normalizedUnitsToPurchase?: string | undefined;
  numberOfInstancesToPurchase?: string | undefined;
  instanceFamily?: string | undefined;
  instanceType?: string | undefined;
  currentGeneration?: string | undefined;
  sizeFlexEligible?: boolean | undefined;
}
export interface ElastiCacheReservedInstances {
  configuration?: ElastiCacheReservedInstancesConfiguration | undefined;
  costCalculation?: ReservedInstancesCostCalculation | undefined;
}
export interface OpenSearchReservedInstancesConfiguration {
  accountScope?: string | undefined;
  service?: string | undefined;
  term?: string | undefined;
  paymentOption?: string | undefined;
  reservedInstancesRegion?: string | undefined;
  upfrontCost?: string | undefined;
  monthlyRecurringCost?: string | undefined;
  normalizedUnitsToPurchase?: string | undefined;
  numberOfInstancesToPurchase?: string | undefined;
  instanceType?: string | undefined;
  currentGeneration?: string | undefined;
  sizeFlexEligible?: boolean | undefined;
}
export interface OpenSearchReservedInstances {
  configuration?: OpenSearchReservedInstancesConfiguration | undefined;
  costCalculation?: ReservedInstancesCostCalculation | undefined;
}
export interface RedshiftReservedInstancesConfiguration {
  accountScope?: string | undefined;
  service?: string | undefined;
  term?: string | undefined;
  paymentOption?: string | undefined;
  reservedInstancesRegion?: string | undefined;
  upfrontCost?: string | undefined;
  monthlyRecurringCost?: string | undefined;
  normalizedUnitsToPurchase?: string | undefined;
  numberOfInstancesToPurchase?: string | undefined;
  instanceFamily?: string | undefined;
  instanceType?: string | undefined;
  sizeFlexEligible?: boolean | undefined;
  currentGeneration?: string | undefined;
}
export interface RedshiftReservedInstances {
  configuration?: RedshiftReservedInstancesConfiguration | undefined;
  costCalculation?: ReservedInstancesCostCalculation | undefined;
}
export interface Ec2InstanceSavingsPlansConfiguration {
  accountScope?: string | undefined;
  term?: string | undefined;
  paymentOption?: string | undefined;
  hourlyCommitment?: string | undefined;
  instanceFamily?: string | undefined;
  savingsPlansRegion?: string | undefined;
}
export interface SavingsPlansPricing {
  monthlySavingsPlansEligibleCost?: number | undefined;
  estimatedMonthlyCommitment?: number | undefined;
  savingsPercentage?: number | undefined;
  estimatedOnDemandCost?: number | undefined;
}
export interface SavingsPlansCostCalculation {
  pricing?: SavingsPlansPricing | undefined;
}
export interface Ec2InstanceSavingsPlans {
  configuration?: Ec2InstanceSavingsPlansConfiguration | undefined;
  costCalculation?: SavingsPlansCostCalculation | undefined;
}
export interface ComputeSavingsPlansConfiguration {
  accountScope?: string | undefined;
  term?: string | undefined;
  paymentOption?: string | undefined;
  hourlyCommitment?: string | undefined;
}
export interface ComputeSavingsPlans {
  configuration?: ComputeSavingsPlansConfiguration | undefined;
  costCalculation?: SavingsPlansCostCalculation | undefined;
}
export interface SageMakerSavingsPlansConfiguration {
  accountScope?: string | undefined;
  term?: string | undefined;
  paymentOption?: string | undefined;
  hourlyCommitment?: string | undefined;
}
export interface SageMakerSavingsPlans {
  configuration?: SageMakerSavingsPlansConfiguration | undefined;
  costCalculation?: SavingsPlansCostCalculation | undefined;
}
export interface DbInstanceConfiguration {
  dbInstanceClass?: string | undefined;
}
export interface RdsDbInstanceConfiguration {
  instance?: DbInstanceConfiguration | undefined;
}
export interface RdsDbInstance {
  configuration?: RdsDbInstanceConfiguration | undefined;
  costCalculation?: ResourceCostCalculation | undefined;
}
export interface RdsDbInstanceStorageConfiguration {
  storageType?: string | undefined;
  allocatedStorageInGb?: number | undefined;
  iops?: number | undefined;
  storageThroughput?: number | undefined;
}
export interface RdsDbInstanceStorage {
  configuration?: RdsDbInstanceStorageConfiguration | undefined;
  costCalculation?: ResourceCostCalculation | undefined;
}
export interface AuroraDbClusterStorageConfiguration {
  storageType?: string | undefined;
}
export interface AuroraDbClusterStorage {
  configuration?: AuroraDbClusterStorageConfiguration | undefined;
  costCalculation?: ResourceCostCalculation | undefined;
}
export interface DynamoDbReservedCapacityConfiguration {
  accountScope?: string | undefined;
  service?: string | undefined;
  term?: string | undefined;
  paymentOption?: string | undefined;
  reservedInstancesRegion?: string | undefined;
  upfrontCost?: string | undefined;
  monthlyRecurringCost?: string | undefined;
  numberOfCapacityUnitsToPurchase?: string | undefined;
  capacityUnits?: string | undefined;
}
export interface DynamoDbReservedCapacity {
  configuration?: DynamoDbReservedCapacityConfiguration | undefined;
  costCalculation?: ReservedInstancesCostCalculation | undefined;
}
export interface MemoryDbReservedInstancesConfiguration {
  accountScope?: string | undefined;
  service?: string | undefined;
  term?: string | undefined;
  paymentOption?: string | undefined;
  reservedInstancesRegion?: string | undefined;
  upfrontCost?: string | undefined;
  monthlyRecurringCost?: string | undefined;
  normalizedUnitsToPurchase?: string | undefined;
  numberOfInstancesToPurchase?: string | undefined;
  instanceType?: string | undefined;
  instanceFamily?: string | undefined;
  sizeFlexEligible?: boolean | undefined;
  currentGeneration?: string | undefined;
}
export interface MemoryDbReservedInstances {
  configuration?: MemoryDbReservedInstancesConfiguration | undefined;
  costCalculation?: ReservedInstancesCostCalculation | undefined;
}
export interface NatGatewayConfiguration {
  activeConnectionCount?: number | undefined;
  packetsInFromSource?: number | undefined;
  packetsInFromDestination?: number | undefined;
}
export interface NatGateway {
  configuration?: NatGatewayConfiguration | undefined;
  costCalculation?: ResourceCostCalculation | undefined;
}
export interface DynamoDbTable {
  costCalculation?: ResourceCostCalculation | undefined;
}
export interface ElastiCacheCluster {
  costCalculation?: ResourceCostCalculation | undefined;
}
export interface MemoryDbCluster {
  costCalculation?: ResourceCostCalculation | undefined;
}
export interface DocumentDbCluster {
  costCalculation?: ResourceCostCalculation | undefined;
}
export interface WorkSpaces {
  costCalculation?: ResourceCostCalculation | undefined;
}
export interface SageMakerEndpoint {
  costCalculation?: ResourceCostCalculation | undefined;
}
export type ResourceDetails =
  | {
      lambdaFunction: LambdaFunction;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService: EcsService;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance: Ec2Instance;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume: EbsVolume;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup: Ec2AutoScalingGroup;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances: Ec2ReservedInstances;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances: RdsReservedInstances;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances: ElastiCacheReservedInstances;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances: OpenSearchReservedInstances;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances: RedshiftReservedInstances;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans: Ec2InstanceSavingsPlans;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans: ComputeSavingsPlans;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans: SageMakerSavingsPlans;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance: RdsDbInstance;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage: RdsDbInstanceStorage;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage: AuroraDbClusterStorage;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity: DynamoDbReservedCapacity;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances: MemoryDbReservedInstances;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway: NatGateway;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable: DynamoDbTable;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster: ElastiCacheCluster;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster: MemoryDbCluster;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster: DocumentDbCluster;
      workSpaces?: undefined;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces: WorkSpaces;
      sageMakerEndpoint?: undefined;
    }
  | {
      lambdaFunction?: undefined;
      ecsService?: undefined;
      ec2Instance?: undefined;
      ebsVolume?: undefined;
      ec2AutoScalingGroup?: undefined;
      ec2ReservedInstances?: undefined;
      rdsReservedInstances?: undefined;
      elastiCacheReservedInstances?: undefined;
      openSearchReservedInstances?: undefined;
      redshiftReservedInstances?: undefined;
      ec2InstanceSavingsPlans?: undefined;
      computeSavingsPlans?: undefined;
      sageMakerSavingsPlans?: undefined;
      rdsDbInstance?: undefined;
      rdsDbInstanceStorage?: undefined;
      auroraDbClusterStorage?: undefined;
      dynamoDbReservedCapacity?: undefined;
      memoryDbReservedInstances?: undefined;
      natGateway?: undefined;
      dynamoDbTable?: undefined;
      elastiCacheCluster?: undefined;
      memoryDbCluster?: undefined;
      documentDbCluster?: undefined;
      workSpaces?: undefined;
      sageMakerEndpoint: SageMakerEndpoint;
    };
export interface Tag {
  key?: string | undefined;
  value?: string | undefined;
}
export type TagList = Tag[];
export interface GetRecommendationResponse {
  recommendationId?: string | undefined;
  resourceId?: string | undefined;
  resourceArn?: string | undefined;
  accountId?: string | undefined;
  currencyCode?: string | undefined;
  recommendationLookbackPeriodInDays?: number | undefined;
  costCalculationLookbackPeriodInDays?: number | undefined;
  estimatedSavingsPercentage?: number | undefined;
  estimatedSavingsOverCostCalculationLookbackPeriod?: number | undefined;
  currentResourceType?: ResourceType | undefined;
  recommendedResourceType?: ResourceType | undefined;
  region?: string | undefined;
  source?: Source | undefined;
  lastRefreshTimestamp?: Date | undefined;
  estimatedMonthlySavings?: number | undefined;
  estimatedMonthlyCost?: number | undefined;
  implementationEffort?: ImplementationEffort | undefined;
  restartNeeded?: boolean | undefined;
  actionType?: ActionType | undefined;
  rollbackPossible?: boolean | undefined;
  currentResourceDetails?: ResourceDetails | undefined;
  recommendedResourceDetails?: ResourceDetails | undefined;
  tags?: Tag[] | undefined;
}
export type GranularityType = "Daily" | "Monthly" | (string & {});
export interface TimePeriod {
  start: string;
  end: string;
}
export type MaxResults = number;
export type Order = "Asc" | "Desc" | (string & {});
export interface OrderBy {
  dimension?: string | undefined;
  order?: Order | undefined;
}
export interface ListEfficiencyMetricsRequest {
  groupBy?: string | undefined;
  granularity: GranularityType;
  timePeriod: TimePeriod;
  maxResults?: number | undefined;
  orderBy?: OrderBy | undefined;
  nextToken?: string | undefined;
}
export interface MetricsByTime {
  score?: number | undefined;
  savings?: number | undefined;
  spend?: number | undefined;
  timestamp?: string | undefined;
}
export type MetricsByTimeList = MetricsByTime[];
export interface EfficiencyMetricsByGroup {
  metricsByTime?: MetricsByTime[] | undefined;
  group?: string | undefined;
  message?: string | undefined;
}
export type EfficiencyMetricsByGroupList = EfficiencyMetricsByGroup[];
export interface ListEfficiencyMetricsResponse {
  efficiencyMetricsByGroup?: EfficiencyMetricsByGroup[] | undefined;
  nextToken?: string | undefined;
}
export type AccountId = string;
export interface ListEnrollmentStatusesRequest {
  includeOrganizationInfo?: boolean | undefined;
  accountId?: string | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export type EnrollmentStatus = "Active" | "Inactive" | (string & {});
export interface AccountEnrollmentStatus {
  accountId?: string | undefined;
  status?: EnrollmentStatus | undefined;
  lastUpdatedTimestamp?: Date | undefined;
  createdTimestamp?: Date | undefined;
}
export type AccountEnrollmentStatuses = AccountEnrollmentStatus[];
export interface ListEnrollmentStatusesResponse {
  items?: AccountEnrollmentStatus[] | undefined;
  includeMemberAccounts?: boolean | undefined;
  nextToken?: string | undefined;
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
  restartNeeded?: boolean | undefined;
  rollbackPossible?: boolean | undefined;
  implementationEfforts?: ImplementationEffort[] | undefined;
  accountIds?: string[] | undefined;
  regions?: string[] | undefined;
  resourceTypes?: ResourceType[] | undefined;
  actionTypes?: ActionType[] | undefined;
  tags?: Tag[] | undefined;
  resourceIds?: string[] | undefined;
  resourceArns?: string[] | undefined;
  recommendationIds?: string[] | undefined;
}
export interface ListRecommendationsRequest {
  filter?: Filter | undefined;
  orderBy?: OrderBy | undefined;
  includeAllRecommendations?: boolean | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface Recommendation {
  recommendationId?: string | undefined;
  accountId?: string | undefined;
  region?: string | undefined;
  resourceId?: string | undefined;
  resourceArn?: string | undefined;
  currentResourceType?: string | undefined;
  recommendedResourceType?: string | undefined;
  estimatedMonthlySavings?: number | undefined;
  estimatedSavingsPercentage?: number | undefined;
  estimatedMonthlyCost?: number | undefined;
  currencyCode?: string | undefined;
  implementationEffort?: string | undefined;
  restartNeeded?: boolean | undefined;
  actionType?: string | undefined;
  rollbackPossible?: boolean | undefined;
  currentResourceSummary?: string | undefined;
  recommendedResourceSummary?: string | undefined;
  lastRefreshTimestamp?: Date | undefined;
  recommendationLookbackPeriodInDays?: number | undefined;
  source?: Source | undefined;
  tags?: Tag[] | undefined;
}
export type RecommendationList = Recommendation[];
export interface ListRecommendationsResponse {
  items?: Recommendation[] | undefined;
  nextToken?: string | undefined;
}
export type SummaryMetrics = "SavingsPercentage" | (string & {});
export type SummaryMetricsList = SummaryMetrics[];
export interface ListRecommendationSummariesRequest {
  filter?: Filter | undefined;
  groupBy: string;
  maxResults?: number | undefined;
  metrics?: SummaryMetrics[] | undefined;
  nextToken?: string | undefined;
}
export interface RecommendationSummary {
  group?: string | undefined;
  estimatedMonthlySavings?: number | undefined;
  recommendationCount?: number | undefined;
}
export type RecommendationSummariesList = RecommendationSummary[];
export interface SummaryMetricsResult {
  savingsPercentage?: string | undefined;
}
export interface ListRecommendationSummariesResponse {
  estimatedTotalDedupedSavings?: number | undefined;
  items?: RecommendationSummary[] | undefined;
  groupBy?: string | undefined;
  currencyCode?: string | undefined;
  metrics?: SummaryMetricsResult | undefined;
  nextToken?: string | undefined;
}
export interface UpdateEnrollmentStatusRequest {
  status: EnrollmentStatus;
  includeMemberAccounts?: boolean | undefined;
}
export interface UpdateEnrollmentStatusResponse {
  status?: string | undefined;
}
export interface UpdatePreferencesRequest {
  savingsEstimationMode?: SavingsEstimationMode | undefined;
  memberAccountDiscountVisibility?: MemberAccountDiscountVisibility | undefined;
  preferredCommitment?: PreferredCommitment | undefined;
}
export interface UpdatePreferencesResponse {
  savingsEstimationMode?: SavingsEstimationMode | undefined;
  memberAccountDiscountVisibility?: MemberAccountDiscountVisibility | undefined;
  preferredCommitment?: PreferredCommitment | undefined;
}
export type ValidationExceptionReason = "FieldValidationFailed" | "Other" | (string & {});
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
 * Returns a set of preferences for an account in order to add account-specific preferences into the service. These preferences impact how the savings associated with recommendations are presented--estimated savings after discounts or estimated savings before discounts, for example.
 */
export const getPreferences: API.OperationMethod<
  GetPreferencesRequest & RegionInput,
  GetPreferencesResponse,
  GetPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<GetPreferencesRequest>,
  output: __S(161, __c5, 1) as any as S.Schema<GetPreferencesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPreferences",
  telemetry: TELEMETRY,
  span: "GetPreferences",
}));

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
  GetRecommendationRequest & RegionInput,
  GetRecommendationResponse,
  GetRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c6, 0) as any as S.Schema<GetRecommendationRequest>,
  output: __S(244, __c7, 20) as any as S.Schema<GetRecommendationResponse>,
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
  telemetry: TELEMETRY,
  span: "GetRecommendation",
}));

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
  ListEfficiencyMetricsRequest & RegionInput,
  ListEfficiencyMetricsResponse,
  ListEfficiencyMetricsError,
  Credentials | HttpClient.HttpClient,
  EfficiencyMetricsByGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(289, __c9, 1) as any as S.Schema<ListEfficiencyMetricsRequest>,
  output: __S(294, __c9, 6) as any as S.Schema<ListEfficiencyMetricsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListEfficiencyMetrics",
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
  ListEnrollmentStatusesRequest & RegionInput,
  ListEnrollmentStatusesResponse,
  ListEnrollmentStatusesError,
  Credentials | HttpClient.HttpClient,
  AccountEnrollmentStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<ListEnrollmentStatusesRequest>,
  output: __S(355, __c11, 3) as any as S.Schema<ListEnrollmentStatusesResponse>,
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
  telemetry: TELEMETRY,
  span: "ListEnrollmentStatuses",
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
  ListRecommendationsRequest & RegionInput,
  ListRecommendationsResponse,
  ListRecommendationsError,
  Credentials | HttpClient.HttpClient,
  Recommendation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<ListRecommendationsRequest>,
  output: __S(387, __c12, 3) as any as S.Schema<ListRecommendationsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListRecommendations",
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
  ListRecommendationSummariesRequest & RegionInput,
  ListRecommendationSummariesResponse,
  ListRecommendationSummariesError,
  Credentials | HttpClient.HttpClient,
  RecommendationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<ListRecommendationSummariesRequest>,
  output: __S(4, __c0, 4) as any as S.Schema<ListRecommendationSummariesResponse>,
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
  telemetry: TELEMETRY,
  span: "ListRecommendationSummaries",
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
  UpdateEnrollmentStatusRequest & RegionInput,
  UpdateEnrollmentStatusResponse,
  UpdateEnrollmentStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c1, 0) as any as S.Schema<UpdateEnrollmentStatusRequest>,
  output: __S(33, __c1, 1) as any as S.Schema<UpdateEnrollmentStatusResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnrollmentStatus",
  telemetry: TELEMETRY,
  span: "UpdateEnrollmentStatus",
}));

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
  UpdatePreferencesRequest & RegionInput,
  UpdatePreferencesResponse,
  UpdatePreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c2, 0) as any as S.Schema<UpdatePreferencesRequest>,
  output: __S(161, __c5, 1) as any as S.Schema<UpdatePreferencesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePreferences",
  telemetry: TELEMETRY,
  span: "UpdatePreferences",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filter: S.optional(__S(418, __c13, 2)),
          groupBy: S.String,
          maxResults: S.optional(S.Number),
          metrics: S.optional(__S(416, __c13, 0)),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRecommendationSummariesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          group: S.optional(S.String),
          estimatedMonthlySavings: S.optional(S.Number),
          recommendationCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RecommendationSummary" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() => S.Struct({ savingsPercentage: S.optional(S.String) })).annotate({
        identifier: "SummaryMetricsResult",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          estimatedTotalDedupedSavings: S.optional(S.Number),
          items: S.optional(__S(2, __c0, 2)),
          groupBy: S.optional(S.String),
          currencyCode: S.optional(S.String),
          metrics: S.optional(__S(3, __c0, 3)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRecommendationSummariesResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ status: S.String, includeMemberAccounts: S.optional(S.Boolean) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateEnrollmentStatusRequest" });
    case 1:
      return S.suspend(() => S.Struct({ status: S.optional(S.String) })).annotate({
        identifier: "UpdateEnrollmentStatusResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          savingsEstimationMode: S.optional(S.String),
          memberAccountDiscountVisibility: S.optional(S.String),
          preferredCommitment: S.optional(__S(160, __c5, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdatePreferencesRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ fieldName: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionDetail",
      });
    case 1:
      return S.Array(__S(96, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPreferencesRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ term: S.optional(S.String), paymentOption: S.optional(S.String) }),
      ).annotate({ identifier: "PreferredCommitment" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          savingsEstimationMode: S.optional(S.String),
          memberAccountDiscountVisibility: S.optional(S.String),
          preferredCommitment: S.optional(__S(160, __c5, 0)),
        }),
      ).annotate({ identifier: "GetPreferencesResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ recommendationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetRecommendationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vCpu: S.optional(S.Number),
          memorySizeInMB: S.optional(S.Number),
          architecture: S.optional(S.String),
          platform: S.optional(S.String),
        }),
      ).annotate({ identifier: "ComputeConfiguration" });
    case 2:
      return S.suspend(() => S.Struct({ compute: S.optional(__S(193, __c6, 1)) })).annotate({
        identifier: "LambdaFunctionConfiguration",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          usageType: S.optional(S.String),
          usageAmount: S.optional(S.Number),
          operation: S.optional(S.String),
          productCode: S.optional(S.String),
          unit: S.optional(S.String),
        }),
      ).annotate({ identifier: "Usage" });
    case 4:
      return S.Array(__S(195, __c6, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          savingsPlansDiscount: S.optional(S.Number),
          reservedInstancesDiscount: S.optional(S.Number),
          otherDiscount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "EstimatedDiscounts" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          estimatedCostBeforeDiscounts: S.optional(S.Number),
          estimatedNetUnusedAmortizedCommitments: S.optional(S.Number),
          estimatedDiscounts: S.optional(__S(197, __c6, 5)),
          estimatedCostAfterDiscounts: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ResourcePricing" });
    case 7:
      return S.suspend(() =>
        S.Struct({ usages: S.optional(__S(196, __c6, 4)), pricing: S.optional(__S(198, __c6, 6)) }),
      ).annotate({ identifier: "ResourceCostCalculation" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          configuration: S.optional(__S(194, __c6, 2)),
          costCalculation: S.optional(__S(199, __c6, 7)),
        }),
      ).annotate({ identifier: "LambdaFunction" });
    case 9:
      return S.suspend(() => S.Struct({ type: S.optional(S.String) })).annotate({
        identifier: "InstanceConfiguration",
      });
    case 10:
      return S.suspend(() => S.Struct({ instance: S.optional(__S(201, __c6, 9)) })).annotate({
        identifier: "Ec2InstanceConfiguration",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({
          configuration: S.optional(__S(202, __c6, 10)),
          costCalculation: S.optional(__S(199, __c6, 7)),
        }),
      ).annotate({ identifier: "Ec2Instance" });
    case 12:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), sizeInGb: S.optional(S.Number) }),
      ).annotate({ identifier: "StorageConfiguration" });
    case 13:
      return S.suspend(() =>
        S.Struct({ iops: S.optional(S.Number), throughput: S.optional(S.Number) }),
      ).annotate({ identifier: "BlockStoragePerformanceConfiguration" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          storage: S.optional(__S(204, __c6, 12)),
          performance: S.optional(__S(205, __c6, 13)),
          attachmentState: S.optional(S.String),
        }),
      ).annotate({ identifier: "EbsVolumeConfiguration" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          configuration: S.optional(__S(206, __c6, 14)),
          costCalculation: S.optional(__S(199, __c6, 7)),
        }),
      ).annotate({ identifier: "EbsVolume" });
    case 16:
      return S.Array(__S(201, __c6, 9));
    case 17:
      return S.suspend(() =>
        S.Struct({
          instance: S.optional(__S(201, __c6, 9)),
          mixedInstances: S.optional(__S(208, __c6, 16)),
          type: S.optional(S.String),
          allocationStrategy: S.optional(S.String),
        }),
      ).annotate({ identifier: "Ec2AutoScalingGroupConfiguration" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          configuration: S.optional(__S(209, __c6, 17)),
          costCalculation: S.optional(__S(199, __c6, 7)),
        }),
      ).annotate({ identifier: "Ec2AutoScalingGroup" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          accountScope: S.optional(S.String),
          service: S.optional(S.String),
          term: S.optional(S.String),
          paymentOption: S.optional(S.String),
          reservedInstancesRegion: S.optional(S.String),
          upfrontCost: S.optional(S.String),
          monthlyRecurringCost: S.optional(S.String),
          normalizedUnitsToPurchase: S.optional(S.String),
          numberOfInstancesToPurchase: S.optional(S.String),
          offeringClass: S.optional(S.String),
          instanceFamily: S.optional(S.String),
          instanceType: S.optional(S.String),
          currentGeneration: S.optional(S.String),
          platform: S.optional(S.String),
          tenancy: S.optional(S.String),
          sizeFlexEligible: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Ec2ReservedInstancesConfiguration" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          estimatedOnDemandCost: S.optional(S.Number),
          monthlyReservationEligibleCost: S.optional(S.Number),
          savingsPercentage: S.optional(S.Number),
          estimatedMonthlyAmortizedReservationCost: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ReservedInstancesPricing" });
    case 21:
      return S.suspend(() => S.Struct({ pricing: S.optional(__S(212, __c6, 20)) })).annotate({
        identifier: "ReservedInstancesCostCalculation",
      });
    case 22:
      return S.suspend(() =>
        S.Struct({
          configuration: S.optional(__S(211, __c6, 19)),
          costCalculation: S.optional(__S(213, __c6, 21)),
        }),
      ).annotate({ identifier: "Ec2ReservedInstances" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          accountScope: S.optional(S.String),
          service: S.optional(S.String),
          term: S.optional(S.String),
          paymentOption: S.optional(S.String),
          reservedInstancesRegion: S.optional(S.String),
          upfrontCost: S.optional(S.String),
          monthlyRecurringCost: S.optional(S.String),
          normalizedUnitsToPurchase: S.optional(S.String),
          numberOfInstancesToPurchase: S.optional(S.String),
          instanceFamily: S.optional(S.String),
          instanceType: S.optional(S.String),
          sizeFlexEligible: S.optional(S.Boolean),
          currentGeneration: S.optional(S.String),
          licenseModel: S.optional(S.String),
          databaseEdition: S.optional(S.String),
          databaseEngine: S.optional(S.String),
          deploymentOption: S.optional(S.String),
        }),
      ).annotate({ identifier: "RdsReservedInstancesConfiguration" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          configuration: S.optional(__S(215, __c6, 23)),
          costCalculation: S.optional(__S(213, __c6, 21)),
        }),
      ).annotate({ identifier: "RdsReservedInstances" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          accountScope: S.optional(S.String),
          service: S.optional(S.String),
          term: S.optional(S.String),
          paymentOption: S.optional(S.String),
          reservedInstancesRegion: S.optional(S.String),
          upfrontCost: S.optional(S.String),
          monthlyRecurringCost: S.optional(S.String),
          normalizedUnitsToPurchase: S.optional(S.String),
          numberOfInstancesToPurchase: S.optional(S.String),
          instanceFamily: S.optional(S.String),
          instanceType: S.optional(S.String),
          currentGeneration: S.optional(S.String),
          sizeFlexEligible: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ElastiCacheReservedInstancesConfiguration" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          configuration: S.optional(__S(217, __c6, 25)),
          costCalculation: S.optional(__S(213, __c6, 21)),
        }),
      ).annotate({ identifier: "ElastiCacheReservedInstances" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          accountScope: S.optional(S.String),
          service: S.optional(S.String),
          term: S.optional(S.String),
          paymentOption: S.optional(S.String),
          reservedInstancesRegion: S.optional(S.String),
          upfrontCost: S.optional(S.String),
          monthlyRecurringCost: S.optional(S.String),
          normalizedUnitsToPurchase: S.optional(S.String),
          numberOfInstancesToPurchase: S.optional(S.String),
          instanceType: S.optional(S.String),
          currentGeneration: S.optional(S.String),
          sizeFlexEligible: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "OpenSearchReservedInstancesConfiguration" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          configuration: S.optional(__S(219, __c6, 27)),
          costCalculation: S.optional(__S(213, __c6, 21)),
        }),
      ).annotate({ identifier: "OpenSearchReservedInstances" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          accountScope: S.optional(S.String),
          service: S.optional(S.String),
          term: S.optional(S.String),
          paymentOption: S.optional(S.String),
          reservedInstancesRegion: S.optional(S.String),
          upfrontCost: S.optional(S.String),
          monthlyRecurringCost: S.optional(S.String),
          normalizedUnitsToPurchase: S.optional(S.String),
          numberOfInstancesToPurchase: S.optional(S.String),
          instanceFamily: S.optional(S.String),
          instanceType: S.optional(S.String),
          sizeFlexEligible: S.optional(S.Boolean),
          currentGeneration: S.optional(S.String),
        }),
      ).annotate({ identifier: "RedshiftReservedInstancesConfiguration" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          configuration: S.optional(__S(221, __c6, 29)),
          costCalculation: S.optional(__S(213, __c6, 21)),
        }),
      ).annotate({ identifier: "RedshiftReservedInstances" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          accountScope: S.optional(S.String),
          term: S.optional(S.String),
          paymentOption: S.optional(S.String),
          hourlyCommitment: S.optional(S.String),
          instanceFamily: S.optional(S.String),
          savingsPlansRegion: S.optional(S.String),
        }),
      ).annotate({ identifier: "Ec2InstanceSavingsPlansConfiguration" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          monthlySavingsPlansEligibleCost: S.optional(S.Number),
          estimatedMonthlyCommitment: S.optional(S.Number),
          savingsPercentage: S.optional(S.Number),
          estimatedOnDemandCost: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SavingsPlansPricing" });
    case 1:
      return S.suspend(() => S.Struct({ pricing: S.optional(__S(224, __c7, 0)) })).annotate({
        identifier: "SavingsPlansCostCalculation",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          configuration: S.optional(__S(223, __c6, 31)),
          costCalculation: S.optional(__S(225, __c7, 1)),
        }),
      ).annotate({ identifier: "Ec2InstanceSavingsPlans" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          accountScope: S.optional(S.String),
          term: S.optional(S.String),
          paymentOption: S.optional(S.String),
          hourlyCommitment: S.optional(S.String),
        }),
      ).annotate({ identifier: "ComputeSavingsPlansConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          configuration: S.optional(__S(227, __c7, 3)),
          costCalculation: S.optional(__S(225, __c7, 1)),
        }),
      ).annotate({ identifier: "ComputeSavingsPlans" });
    case 5:
      return S.suspend(() => S.Struct({ dbInstanceClass: S.optional(S.String) })).annotate({
        identifier: "DbInstanceConfiguration",
      });
    case 6:
      return S.suspend(() => S.Struct({ instance: S.optional(__S(229, __c7, 5)) })).annotate({
        identifier: "RdsDbInstanceConfiguration",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          configuration: S.optional(__S(230, __c7, 6)),
          costCalculation: S.optional(__S(199, __c6, 7)),
        }),
      ).annotate({ identifier: "RdsDbInstance" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          storageType: S.optional(S.String),
          allocatedStorageInGb: S.optional(S.Number),
          iops: S.optional(S.Number),
          storageThroughput: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RdsDbInstanceStorageConfiguration" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          configuration: S.optional(__S(232, __c7, 8)),
          costCalculation: S.optional(__S(199, __c6, 7)),
        }),
      ).annotate({ identifier: "RdsDbInstanceStorage" });
    case 10:
      return S.suspend(() => S.Struct({ storageType: S.optional(S.String) })).annotate({
        identifier: "AuroraDbClusterStorageConfiguration",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({
          configuration: S.optional(__S(234, __c7, 10)),
          costCalculation: S.optional(__S(199, __c6, 7)),
        }),
      ).annotate({ identifier: "AuroraDbClusterStorage" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          accountScope: S.optional(S.String),
          service: S.optional(S.String),
          term: S.optional(S.String),
          paymentOption: S.optional(S.String),
          reservedInstancesRegion: S.optional(S.String),
          upfrontCost: S.optional(S.String),
          monthlyRecurringCost: S.optional(S.String),
          numberOfCapacityUnitsToPurchase: S.optional(S.String),
          capacityUnits: S.optional(S.String),
        }),
      ).annotate({ identifier: "DynamoDbReservedCapacityConfiguration" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          configuration: S.optional(__S(236, __c7, 12)),
          costCalculation: S.optional(__S(213, __c6, 21)),
        }),
      ).annotate({ identifier: "DynamoDbReservedCapacity" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          accountScope: S.optional(S.String),
          service: S.optional(S.String),
          term: S.optional(S.String),
          paymentOption: S.optional(S.String),
          reservedInstancesRegion: S.optional(S.String),
          upfrontCost: S.optional(S.String),
          monthlyRecurringCost: S.optional(S.String),
          normalizedUnitsToPurchase: S.optional(S.String),
          numberOfInstancesToPurchase: S.optional(S.String),
          instanceType: S.optional(S.String),
          instanceFamily: S.optional(S.String),
          sizeFlexEligible: S.optional(S.Boolean),
          currentGeneration: S.optional(S.String),
        }),
      ).annotate({ identifier: "MemoryDbReservedInstancesConfiguration" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          configuration: S.optional(__S(238, __c7, 14)),
          costCalculation: S.optional(__S(213, __c6, 21)),
        }),
      ).annotate({ identifier: "MemoryDbReservedInstances" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          activeConnectionCount: S.optional(S.Number),
          packetsInFromSource: S.optional(S.Number),
          packetsInFromDestination: S.optional(S.Number),
        }),
      ).annotate({ identifier: "NatGatewayConfiguration" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          configuration: S.optional(__S(240, __c7, 16)),
          costCalculation: S.optional(__S(199, __c6, 7)),
        }),
      ).annotate({ identifier: "NatGateway" });
    case 18:
      return S.suspend(() => S.Struct({ costCalculation: S.optional(__S(199, __c6, 7)) })).annotate(
        { identifier: "DynamoDbTable" },
      );
    case 19:
      return S.Union([
        /*@__PURE__*/ S.Struct({ lambdaFunction: __S(200, __c6, 8) }),
        /*@__PURE__*/ S.Struct({ ecsService: __S(200, __c6, 8) }),
        /*@__PURE__*/ S.Struct({ ec2Instance: __S(203, __c6, 11) }),
        /*@__PURE__*/ S.Struct({ ebsVolume: __S(207, __c6, 15) }),
        /*@__PURE__*/ S.Struct({ ec2AutoScalingGroup: __S(210, __c6, 18) }),
        /*@__PURE__*/ S.Struct({ ec2ReservedInstances: __S(214, __c6, 22) }),
        /*@__PURE__*/ S.Struct({ rdsReservedInstances: __S(216, __c6, 24) }),
        /*@__PURE__*/ S.Struct({ elastiCacheReservedInstances: __S(218, __c6, 26) }),
        /*@__PURE__*/ S.Struct({ openSearchReservedInstances: __S(220, __c6, 28) }),
        /*@__PURE__*/ S.Struct({ redshiftReservedInstances: __S(222, __c6, 30) }),
        /*@__PURE__*/ S.Struct({ ec2InstanceSavingsPlans: __S(226, __c7, 2) }),
        /*@__PURE__*/ S.Struct({ computeSavingsPlans: __S(228, __c7, 4) }),
        /*@__PURE__*/ S.Struct({ sageMakerSavingsPlans: __S(228, __c7, 4) }),
        /*@__PURE__*/ S.Struct({ rdsDbInstance: __S(231, __c7, 7) }),
        /*@__PURE__*/ S.Struct({ rdsDbInstanceStorage: __S(233, __c7, 9) }),
        /*@__PURE__*/ S.Struct({ auroraDbClusterStorage: __S(235, __c7, 11) }),
        /*@__PURE__*/ S.Struct({ dynamoDbReservedCapacity: __S(237, __c7, 13) }),
        /*@__PURE__*/ S.Struct({ memoryDbReservedInstances: __S(239, __c7, 15) }),
        /*@__PURE__*/ S.Struct({ natGateway: __S(241, __c7, 17) }),
        /*@__PURE__*/ S.Struct({ dynamoDbTable: __S(242, __c7, 18) }),
        /*@__PURE__*/ S.Struct({ elastiCacheCluster: __S(242, __c7, 18) }),
        /*@__PURE__*/ S.Struct({ memoryDbCluster: __S(242, __c7, 18) }),
        /*@__PURE__*/ S.Struct({ documentDbCluster: __S(242, __c7, 18) }),
        /*@__PURE__*/ S.Struct({ workSpaces: __S(242, __c7, 18) }),
        /*@__PURE__*/ S.Struct({ sageMakerEndpoint: __S(242, __c7, 18) }),
      ]);
    case 20:
      return S.suspend(() =>
        S.Struct({
          recommendationId: S.optional(S.String),
          resourceId: S.optional(S.String),
          resourceArn: S.optional(S.String),
          accountId: S.optional(S.String),
          currencyCode: S.optional(S.String),
          recommendationLookbackPeriodInDays: S.optional(S.Number),
          costCalculationLookbackPeriodInDays: S.optional(S.Number),
          estimatedSavingsPercentage: S.optional(S.Number),
          estimatedSavingsOverCostCalculationLookbackPeriod: S.optional(S.Number),
          currentResourceType: S.optional(S.String),
          recommendedResourceType: S.optional(S.String),
          region: S.optional(S.String),
          source: S.optional(S.String),
          lastRefreshTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          estimatedMonthlySavings: S.optional(S.Number),
          estimatedMonthlyCost: S.optional(S.Number),
          implementationEffort: S.optional(S.String),
          restartNeeded: S.optional(S.Boolean),
          actionType: S.optional(S.String),
          rollbackPossible: S.optional(S.Boolean),
          currentResourceDetails: S.optional(__S(243, __c7, 19)),
          recommendedResourceDetails: S.optional(__S(243, __c7, 19)),
          tags: S.optional(__S(257, __c8, 1)),
        }),
      ).annotate({ identifier: "GetRecommendationResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(256, __c8, 0));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ start: S.String, end: S.String })).annotate({
        identifier: "TimePeriod",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          groupBy: S.optional(S.String),
          granularity: S.String,
          timePeriod: __S(288, __c9, 0),
          maxResults: S.optional(S.Number),
          orderBy: S.optional(__S(320, __c10, 0)),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEfficiencyMetricsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          score: S.optional(S.Number),
          savings: S.optional(S.Number),
          spend: S.optional(S.Number),
          timestamp: S.optional(S.String),
        }),
      ).annotate({ identifier: "MetricsByTime" });
    case 3:
      return S.Array(__S(290, __c9, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          metricsByTime: S.optional(__S(291, __c9, 3)),
          group: S.optional(S.String),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "EfficiencyMetricsByGroup" });
    case 5:
      return S.Array(__S(292, __c9, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          efficiencyMetricsByGroup: S.optional(__S(293, __c9, 5)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEfficiencyMetricsResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ dimension: S.optional(S.String), order: S.optional(S.String) }),
      ).annotate({ identifier: "OrderBy" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          includeOrganizationInfo: S.optional(S.Boolean),
          accountId: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEnrollmentStatusesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String),
          status: S.optional(S.String),
          lastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AccountEnrollmentStatus" });
    case 2:
      return S.Array(__S(353, __c11, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(354, __c11, 2)),
          includeMemberAccounts: S.optional(S.Boolean),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEnrollmentStatusesResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filter: S.optional(__S(418, __c13, 2)),
          orderBy: S.optional(__S(320, __c10, 0)),
          includeAllRecommendations: S.optional(S.Boolean),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          recommendationId: S.optional(S.String),
          accountId: S.optional(S.String),
          region: S.optional(S.String),
          resourceId: S.optional(S.String),
          resourceArn: S.optional(S.String),
          currentResourceType: S.optional(S.String),
          recommendedResourceType: S.optional(S.String),
          estimatedMonthlySavings: S.optional(S.Number),
          estimatedSavingsPercentage: S.optional(S.Number),
          estimatedMonthlyCost: S.optional(S.Number),
          currencyCode: S.optional(S.String),
          implementationEffort: S.optional(S.String),
          restartNeeded: S.optional(S.Boolean),
          actionType: S.optional(S.String),
          rollbackPossible: S.optional(S.Boolean),
          currentResourceSummary: S.optional(S.String),
          recommendedResourceSummary: S.optional(S.String),
          lastRefreshTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          recommendationLookbackPeriodInDays: S.optional(S.Number),
          source: S.optional(S.String),
          tags: S.optional(__S(257, __c8, 1)),
        }),
      ).annotate({ identifier: "Recommendation" });
    case 2:
      return S.Array(__S(385, __c12, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(386, __c12, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRecommendationsResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({
          restartNeeded: S.optional(S.Boolean),
          rollbackPossible: S.optional(S.Boolean),
          implementationEfforts: S.optional(__S(416, __c13, 0)),
          accountIds: S.optional(__S(417, __c13, 1)),
          regions: S.optional(__S(417, __c13, 1)),
          resourceTypes: S.optional(__S(416, __c13, 0)),
          actionTypes: S.optional(__S(416, __c13, 0)),
          tags: S.optional(__S(257, __c8, 1)),
          resourceIds: S.optional(__S(417, __c13, 1)),
          resourceArns: S.optional(__S(417, __c13, 1)),
          recommendationIds: S.optional(__S(417, __c13, 1)),
        }),
      ).annotate({ identifier: "Filter" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
