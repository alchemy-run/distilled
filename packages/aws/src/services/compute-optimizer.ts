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
  sdkId: "Compute Optimizer",
  target: "ComputeOptimizerService",
  version: "2019-11-01",
  sigv4: "compute-optimizer",
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
                `https://compute-optimizer-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://compute-optimizer-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://compute-optimizer.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://compute-optimizer.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterValueException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class MissingAuthenticationToken
  extends /*@__PURE__*/ TE.TaggedError(
    "MissingAuthenticationToken",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class OptInRequiredException
  extends /*@__PURE__*/ TE.TaggedError(
    "OptInRequiredException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export type ResourceType =
  | "Ec2Instance"
  | "AutoScalingGroup"
  | "EbsVolume"
  | "LambdaFunction"
  | "NotApplicable"
  | "EcsService"
  | "License"
  | "RdsDBInstance"
  | "AuroraDBClusterStorage"
  | "Idle"
  | (string & {});
export type ScopeName =
  | "Organization"
  | "AccountId"
  | "ResourceArn"
  | (string & {});
export type ScopeValue = string;
export interface Scope {
  name?: ScopeName;
  value?: string;
}
export type RecommendationPreferenceName =
  | "EnhancedInfrastructureMetrics"
  | "InferredWorkloadTypes"
  | "ExternalMetricsPreference"
  | "LookBackPeriodPreference"
  | "PreferredResources"
  | "UtilizationPreferences"
  | (string & {});
export type RecommendationPreferenceNames = RecommendationPreferenceName[];
export interface DeleteRecommendationPreferencesRequest {
  resourceType: ResourceType;
  scope?: Scope;
  recommendationPreferenceNames: RecommendationPreferenceName[];
}
export interface DeleteRecommendationPreferencesResponse {}
export type JobId = string;
export type JobIds = string[];
export type JobFilterName = "ResourceType" | "JobStatus" | (string & {});
export type FilterValue = string;
export type FilterValues = string[];
export interface JobFilter {
  name?: JobFilterName;
  values?: string[];
}
export type JobFilters = JobFilter[];
export type NextToken = string;
export type MaxResults = number;
export interface DescribeRecommendationExportJobsRequest {
  jobIds?: string[];
  filters?: JobFilter[];
  nextToken?: string;
  maxResults?: number;
}
export type DestinationBucket = string;
export type DestinationKey = string;
export type MetadataKey = string;
export interface S3Destination {
  bucket?: string;
  key?: string;
  metadataKey?: string;
}
export interface ExportDestination {
  s3?: S3Destination;
}
export type JobStatus =
  | "Queued"
  | "InProgress"
  | "Complete"
  | "Failed"
  | (string & {});
export type CreationTimestamp = Date;
export type LastUpdatedTimestamp = Date;
export type FailureReason = string;
export interface RecommendationExportJob {
  jobId?: string;
  destination?: ExportDestination;
  resourceType?: ResourceType;
  status?: JobStatus;
  creationTimestamp?: Date;
  lastUpdatedTimestamp?: Date;
  failureReason?: string;
}
export type RecommendationExportJobs = RecommendationExportJob[];
export interface DescribeRecommendationExportJobsResponse {
  recommendationExportJobs?: RecommendationExportJob[];
  nextToken?: string;
}
export type AccountId = string;
export type AccountIds = string[];
export type FilterName =
  | "Finding"
  | "FindingReasonCodes"
  | "RecommendationSourceType"
  | "InferredWorkloadTypes"
  | (string & {});
export interface Filter {
  name?: FilterName;
  values?: string[];
}
export type Filters = Filter[];
export type ExportableAutoScalingGroupField =
  | "AccountId"
  | "AutoScalingGroupArn"
  | "AutoScalingGroupName"
  | "Finding"
  | "UtilizationMetricsCpuMaximum"
  | "UtilizationMetricsMemoryMaximum"
  | "UtilizationMetricsEbsReadOpsPerSecondMaximum"
  | "UtilizationMetricsEbsWriteOpsPerSecondMaximum"
  | "UtilizationMetricsEbsReadBytesPerSecondMaximum"
  | "UtilizationMetricsEbsWriteBytesPerSecondMaximum"
  | "UtilizationMetricsDiskReadOpsPerSecondMaximum"
  | "UtilizationMetricsDiskWriteOpsPerSecondMaximum"
  | "UtilizationMetricsDiskReadBytesPerSecondMaximum"
  | "UtilizationMetricsDiskWriteBytesPerSecondMaximum"
  | "UtilizationMetricsNetworkInBytesPerSecondMaximum"
  | "UtilizationMetricsNetworkOutBytesPerSecondMaximum"
  | "UtilizationMetricsNetworkPacketsInPerSecondMaximum"
  | "UtilizationMetricsNetworkPacketsOutPerSecondMaximum"
  | "LookbackPeriodInDays"
  | "CurrentConfigurationInstanceType"
  | "CurrentConfigurationDesiredCapacity"
  | "CurrentConfigurationMinSize"
  | "CurrentConfigurationMaxSize"
  | "CurrentConfigurationAllocationStrategy"
  | "CurrentConfigurationMixedInstanceTypes"
  | "CurrentConfigurationType"
  | "CurrentOnDemandPrice"
  | "CurrentStandardOneYearNoUpfrontReservedPrice"
  | "CurrentStandardThreeYearNoUpfrontReservedPrice"
  | "CurrentVCpus"
  | "CurrentMemory"
  | "CurrentStorage"
  | "CurrentNetwork"
  | "RecommendationOptionsConfigurationInstanceType"
  | "RecommendationOptionsConfigurationDesiredCapacity"
  | "RecommendationOptionsConfigurationMinSize"
  | "RecommendationOptionsConfigurationMaxSize"
  | "RecommendationOptionsConfigurationEstimatedInstanceHourReductionPercentage"
  | "RecommendationOptionsConfigurationAllocationStrategy"
  | "RecommendationOptionsConfigurationMixedInstanceTypes"
  | "RecommendationOptionsConfigurationType"
  | "RecommendationOptionsProjectedUtilizationMetricsCpuMaximum"
  | "RecommendationOptionsProjectedUtilizationMetricsMemoryMaximum"
  | "RecommendationOptionsPerformanceRisk"
  | "RecommendationOptionsOnDemandPrice"
  | "RecommendationOptionsStandardOneYearNoUpfrontReservedPrice"
  | "RecommendationOptionsStandardThreeYearNoUpfrontReservedPrice"
  | "RecommendationOptionsVcpus"
  | "RecommendationOptionsMemory"
  | "RecommendationOptionsStorage"
  | "RecommendationOptionsNetwork"
  | "LastRefreshTimestamp"
  | "CurrentPerformanceRisk"
  | "RecommendationOptionsSavingsOpportunityPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrency"
  | "RecommendationOptionsEstimatedMonthlySavingsValue"
  | "EffectiveRecommendationPreferencesCpuVendorArchitectures"
  | "EffectiveRecommendationPreferencesEnhancedInfrastructureMetrics"
  | "EffectiveRecommendationPreferencesInferredWorkloadTypes"
  | "EffectiveRecommendationPreferencesPreferredResources"
  | "EffectiveRecommendationPreferencesLookBackPeriod"
  | "InferredWorkloadTypes"
  | "RecommendationOptionsMigrationEffort"
  | "CurrentInstanceGpuInfo"
  | "RecommendationOptionsInstanceGpuInfo"
  | "UtilizationMetricsGpuPercentageMaximum"
  | "UtilizationMetricsGpuMemoryPercentageMaximum"
  | "RecommendationOptionsProjectedUtilizationMetricsGpuPercentageMaximum"
  | "RecommendationOptionsProjectedUtilizationMetricsGpuMemoryPercentageMaximum"
  | "EffectiveRecommendationPreferencesSavingsEstimationMode"
  | "RecommendationOptionsSavingsOpportunityAfterDiscountsPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrencyAfterDiscounts"
  | "RecommendationOptionsEstimatedMonthlySavingsValueAfterDiscounts"
  | (string & {});
export type ExportableAutoScalingGroupFields =
  ExportableAutoScalingGroupField[];
export type DestinationKeyPrefix = string;
export interface S3DestinationConfig {
  bucket?: string;
  keyPrefix?: string;
}
export type FileFormat = "Csv" | (string & {});
export type IncludeMemberAccounts = boolean;
export type CpuVendorArchitecture = "AWS_ARM64" | "CURRENT" | (string & {});
export type CpuVendorArchitectures = CpuVendorArchitecture[];
export interface RecommendationPreferences {
  cpuVendorArchitectures?: CpuVendorArchitecture[];
}
export interface ExportAutoScalingGroupRecommendationsRequest {
  accountIds?: string[];
  filters?: Filter[];
  fieldsToExport?: ExportableAutoScalingGroupField[];
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat;
  includeMemberAccounts?: boolean;
  recommendationPreferences?: RecommendationPreferences;
}
export interface ExportAutoScalingGroupRecommendationsResponse {
  jobId?: string;
  s3Destination?: S3Destination;
}
export type EBSFilterName = "Finding" | (string & {});
export interface EBSFilter {
  name?: EBSFilterName;
  values?: string[];
}
export type EBSFilters = EBSFilter[];
export type ExportableVolumeField =
  | "AccountId"
  | "VolumeArn"
  | "Finding"
  | "UtilizationMetricsVolumeReadOpsPerSecondMaximum"
  | "UtilizationMetricsVolumeWriteOpsPerSecondMaximum"
  | "UtilizationMetricsVolumeReadBytesPerSecondMaximum"
  | "UtilizationMetricsVolumeWriteBytesPerSecondMaximum"
  | "UtilizationMetricsVolumeIOPSExceededMaximum"
  | "UtilizationMetricsVolumeThroughputExceededMaximum"
  | "LookbackPeriodInDays"
  | "CurrentConfigurationVolumeType"
  | "CurrentConfigurationVolumeBaselineIOPS"
  | "CurrentConfigurationVolumeBaselineThroughput"
  | "CurrentConfigurationVolumeBurstIOPS"
  | "CurrentConfigurationVolumeBurstThroughput"
  | "CurrentConfigurationVolumeSize"
  | "CurrentMonthlyPrice"
  | "RecommendationOptionsConfigurationVolumeType"
  | "RecommendationOptionsConfigurationVolumeBaselineIOPS"
  | "RecommendationOptionsConfigurationVolumeBaselineThroughput"
  | "RecommendationOptionsConfigurationVolumeBurstIOPS"
  | "RecommendationOptionsConfigurationVolumeBurstThroughput"
  | "RecommendationOptionsConfigurationVolumeSize"
  | "RecommendationOptionsMonthlyPrice"
  | "RecommendationOptionsPerformanceRisk"
  | "LastRefreshTimestamp"
  | "CurrentPerformanceRisk"
  | "RecommendationOptionsSavingsOpportunityPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrency"
  | "RecommendationOptionsEstimatedMonthlySavingsValue"
  | "Tags"
  | "RootVolume"
  | "CurrentConfigurationRootVolume"
  | "EffectiveRecommendationPreferencesSavingsEstimationMode"
  | "RecommendationOptionsSavingsOpportunityAfterDiscountsPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrencyAfterDiscounts"
  | "RecommendationOptionsEstimatedMonthlySavingsValueAfterDiscounts"
  | "EffectiveRecommendationPreferencesLookBackPeriod"
  | (string & {});
export type ExportableVolumeFields = ExportableVolumeField[];
export interface ExportEBSVolumeRecommendationsRequest {
  accountIds?: string[];
  filters?: EBSFilter[];
  fieldsToExport?: ExportableVolumeField[];
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat;
  includeMemberAccounts?: boolean;
}
export interface ExportEBSVolumeRecommendationsResponse {
  jobId?: string;
  s3Destination?: S3Destination;
}
export type ExportableInstanceField =
  | "AccountId"
  | "InstanceArn"
  | "InstanceName"
  | "Finding"
  | "FindingReasonCodes"
  | "LookbackPeriodInDays"
  | "CurrentInstanceType"
  | "UtilizationMetricsCpuMaximum"
  | "UtilizationMetricsMemoryMaximum"
  | "UtilizationMetricsEbsReadOpsPerSecondMaximum"
  | "UtilizationMetricsEbsWriteOpsPerSecondMaximum"
  | "UtilizationMetricsEbsReadBytesPerSecondMaximum"
  | "UtilizationMetricsEbsWriteBytesPerSecondMaximum"
  | "UtilizationMetricsDiskReadOpsPerSecondMaximum"
  | "UtilizationMetricsDiskWriteOpsPerSecondMaximum"
  | "UtilizationMetricsDiskReadBytesPerSecondMaximum"
  | "UtilizationMetricsDiskWriteBytesPerSecondMaximum"
  | "UtilizationMetricsNetworkInBytesPerSecondMaximum"
  | "UtilizationMetricsNetworkOutBytesPerSecondMaximum"
  | "UtilizationMetricsNetworkPacketsInPerSecondMaximum"
  | "UtilizationMetricsNetworkPacketsOutPerSecondMaximum"
  | "CurrentOnDemandPrice"
  | "CurrentStandardOneYearNoUpfrontReservedPrice"
  | "CurrentStandardThreeYearNoUpfrontReservedPrice"
  | "CurrentVCpus"
  | "CurrentMemory"
  | "CurrentStorage"
  | "CurrentNetwork"
  | "RecommendationOptionsInstanceType"
  | "RecommendationOptionsProjectedUtilizationMetricsCpuMaximum"
  | "RecommendationOptionsProjectedUtilizationMetricsMemoryMaximum"
  | "RecommendationOptionsPlatformDifferences"
  | "RecommendationOptionsPerformanceRisk"
  | "RecommendationOptionsVcpus"
  | "RecommendationOptionsMemory"
  | "RecommendationOptionsStorage"
  | "RecommendationOptionsNetwork"
  | "RecommendationOptionsOnDemandPrice"
  | "RecommendationOptionsStandardOneYearNoUpfrontReservedPrice"
  | "RecommendationOptionsStandardThreeYearNoUpfrontReservedPrice"
  | "RecommendationsSourcesRecommendationSourceArn"
  | "RecommendationsSourcesRecommendationSourceType"
  | "LastRefreshTimestamp"
  | "CurrentPerformanceRisk"
  | "RecommendationOptionsSavingsOpportunityPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrency"
  | "RecommendationOptionsEstimatedMonthlySavingsValue"
  | "EffectiveRecommendationPreferencesCpuVendorArchitectures"
  | "EffectiveRecommendationPreferencesEnhancedInfrastructureMetrics"
  | "EffectiveRecommendationPreferencesInferredWorkloadTypes"
  | "InferredWorkloadTypes"
  | "RecommendationOptionsMigrationEffort"
  | "EffectiveRecommendationPreferencesExternalMetricsSource"
  | "Tags"
  | "InstanceState"
  | "ExternalMetricStatusCode"
  | "ExternalMetricStatusReason"
  | "CurrentInstanceGpuInfo"
  | "RecommendationOptionsInstanceGpuInfo"
  | "UtilizationMetricsGpuPercentageMaximum"
  | "UtilizationMetricsGpuMemoryPercentageMaximum"
  | "RecommendationOptionsProjectedUtilizationMetricsGpuPercentageMaximum"
  | "RecommendationOptionsProjectedUtilizationMetricsGpuMemoryPercentageMaximum"
  | "Idle"
  | "EffectiveRecommendationPreferencesPreferredResources"
  | "EffectiveRecommendationPreferencesLookBackPeriod"
  | "EffectiveRecommendationPreferencesUtilizationPreferences"
  | "EffectiveRecommendationPreferencesSavingsEstimationMode"
  | "RecommendationOptionsSavingsOpportunityAfterDiscountsPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrencyAfterDiscounts"
  | "RecommendationOptionsEstimatedMonthlySavingsValueAfterDiscounts"
  | (string & {});
export type ExportableInstanceFields = ExportableInstanceField[];
export interface ExportEC2InstanceRecommendationsRequest {
  accountIds?: string[];
  filters?: Filter[];
  fieldsToExport?: ExportableInstanceField[];
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat;
  includeMemberAccounts?: boolean;
  recommendationPreferences?: RecommendationPreferences;
}
export interface ExportEC2InstanceRecommendationsResponse {
  jobId?: string;
  s3Destination?: S3Destination;
}
export type ECSServiceRecommendationFilterName =
  | "Finding"
  | "FindingReasonCode"
  | (string & {});
export interface ECSServiceRecommendationFilter {
  name?: ECSServiceRecommendationFilterName;
  values?: string[];
}
export type ECSServiceRecommendationFilters = ECSServiceRecommendationFilter[];
export type ExportableECSServiceField =
  | "AccountId"
  | "ServiceArn"
  | "LookbackPeriodInDays"
  | "LastRefreshTimestamp"
  | "LaunchType"
  | "CurrentPerformanceRisk"
  | "CurrentServiceConfigurationMemory"
  | "CurrentServiceConfigurationCpu"
  | "CurrentServiceConfigurationTaskDefinitionArn"
  | "CurrentServiceConfigurationAutoScalingConfiguration"
  | "CurrentServiceContainerConfigurations"
  | "UtilizationMetricsCpuMaximum"
  | "UtilizationMetricsMemoryMaximum"
  | "Finding"
  | "FindingReasonCodes"
  | "RecommendationOptionsMemory"
  | "RecommendationOptionsCpu"
  | "RecommendationOptionsSavingsOpportunityPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrency"
  | "RecommendationOptionsEstimatedMonthlySavingsValue"
  | "RecommendationOptionsContainerRecommendations"
  | "RecommendationOptionsProjectedUtilizationMetricsCpuMaximum"
  | "RecommendationOptionsProjectedUtilizationMetricsMemoryMaximum"
  | "Tags"
  | "EffectiveRecommendationPreferencesSavingsEstimationMode"
  | "RecommendationOptionsSavingsOpportunityAfterDiscountsPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrencyAfterDiscounts"
  | "RecommendationOptionsEstimatedMonthlySavingsValueAfterDiscounts"
  | "EffectiveRecommendationPreferencesLookBackPeriod"
  | (string & {});
export type ExportableECSServiceFields = ExportableECSServiceField[];
export interface ExportECSServiceRecommendationsRequest {
  accountIds?: string[];
  filters?: ECSServiceRecommendationFilter[];
  fieldsToExport?: ExportableECSServiceField[];
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat;
  includeMemberAccounts?: boolean;
}
export interface ExportECSServiceRecommendationsResponse {
  jobId?: string;
  s3Destination?: S3Destination;
}
export type IdleRecommendationFilterName =
  | "Finding"
  | "ResourceType"
  | (string & {});
export interface IdleRecommendationFilter {
  name?: IdleRecommendationFilterName;
  values?: string[];
}
export type IdleRecommendationFilters = IdleRecommendationFilter[];
export type ExportableIdleField =
  | "AccountId"
  | "ResourceArn"
  | "ResourceId"
  | "ResourceType"
  | "LastRefreshTimestamp"
  | "LookbackPeriodInDays"
  | "SavingsOpportunity"
  | "SavingsOpportunityAfterDiscount"
  | "UtilizationMetricsCpuMaximum"
  | "UtilizationMetricsMemoryMaximum"
  | "UtilizationMetricsNetworkOutBytesPerSecondMaximum"
  | "UtilizationMetricsNetworkInBytesPerSecondMaximum"
  | "UtilizationMetricsDatabaseConnectionsMaximum"
  | "UtilizationMetricsEBSVolumeReadIOPSMaximum"
  | "UtilizationMetricsEBSVolumeWriteIOPSMaximum"
  | "UtilizationMetricsVolumeReadOpsPerSecondMaximum"
  | "UtilizationMetricsVolumeWriteOpsPerSecondMaximum"
  | "UtilizationMetricsActiveConnectionCountMaximum"
  | "UtilizationMetricsPacketsInFromSourceMaximum"
  | "UtilizationMetricsPacketsInFromDestinationMaximum"
  | "UtilizationMetricsConsumedReadCapacityUnitsSum"
  | "UtilizationMetricsConsumedWriteCapacityUnitsSum"
  | "UtilizationMetricsNewConnectionsSum"
  | "UtilizationMetricsEngineCPUUtilizationMaximum"
  | "UtilizationMetricsCacheHitsSum"
  | "UtilizationMetricsCacheMissesSum"
  | "UtilizationMetricsKeyspaceHitsSum"
  | "UtilizationMetricsKeyspaceMissesSum"
  | "UtilizationMetricsIsIdleMinimum"
  | "UtilizationMetricsUserConnectedSum"
  | "UtilizationMetricsInvocationsSum"
  | "UtilizationMetricsGetTypeCmdsSum"
  | "UtilizationMetricsSetTypeCmdsSum"
  | "UtilizationMetricsElastiCacheProcessingUnitsSum"
  | "UtilizationMetricsCurrConnectionsSum"
  | "UtilizationMetricsDatabaseConnectionsSum"
  | "Finding"
  | "FindingDescription"
  | "Tags"
  | (string & {});
export type ExportableIdleFields = ExportableIdleField[];
export interface ExportIdleRecommendationsRequest {
  accountIds?: string[];
  filters?: IdleRecommendationFilter[];
  fieldsToExport?: ExportableIdleField[];
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat;
  includeMemberAccounts?: boolean;
}
export interface ExportIdleRecommendationsResponse {
  jobId?: string;
  s3Destination?: S3Destination;
}
export type LambdaFunctionRecommendationFilterName =
  | "Finding"
  | "FindingReasonCode"
  | (string & {});
export interface LambdaFunctionRecommendationFilter {
  name?: LambdaFunctionRecommendationFilterName;
  values?: string[];
}
export type LambdaFunctionRecommendationFilters =
  LambdaFunctionRecommendationFilter[];
export type ExportableLambdaFunctionField =
  | "AccountId"
  | "FunctionArn"
  | "FunctionVersion"
  | "Finding"
  | "FindingReasonCodes"
  | "NumberOfInvocations"
  | "UtilizationMetricsDurationMaximum"
  | "UtilizationMetricsDurationAverage"
  | "UtilizationMetricsMemoryMaximum"
  | "UtilizationMetricsMemoryAverage"
  | "LookbackPeriodInDays"
  | "CurrentConfigurationMemorySize"
  | "CurrentConfigurationTimeout"
  | "CurrentCostTotal"
  | "CurrentCostAverage"
  | "RecommendationOptionsConfigurationMemorySize"
  | "RecommendationOptionsCostLow"
  | "RecommendationOptionsCostHigh"
  | "RecommendationOptionsProjectedUtilizationMetricsDurationLowerBound"
  | "RecommendationOptionsProjectedUtilizationMetricsDurationUpperBound"
  | "RecommendationOptionsProjectedUtilizationMetricsDurationExpected"
  | "LastRefreshTimestamp"
  | "CurrentPerformanceRisk"
  | "RecommendationOptionsSavingsOpportunityPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrency"
  | "RecommendationOptionsEstimatedMonthlySavingsValue"
  | "Tags"
  | "EffectiveRecommendationPreferencesSavingsEstimationMode"
  | "RecommendationOptionsSavingsOpportunityAfterDiscountsPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrencyAfterDiscounts"
  | "RecommendationOptionsEstimatedMonthlySavingsValueAfterDiscounts"
  | (string & {});
export type ExportableLambdaFunctionFields = ExportableLambdaFunctionField[];
export interface ExportLambdaFunctionRecommendationsRequest {
  accountIds?: string[];
  filters?: LambdaFunctionRecommendationFilter[];
  fieldsToExport?: ExportableLambdaFunctionField[];
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat;
  includeMemberAccounts?: boolean;
}
export interface ExportLambdaFunctionRecommendationsResponse {
  jobId?: string;
  s3Destination?: S3Destination;
}
export type LicenseRecommendationFilterName =
  | "Finding"
  | "FindingReasonCode"
  | "LicenseName"
  | (string & {});
export interface LicenseRecommendationFilter {
  name?: LicenseRecommendationFilterName;
  values?: string[];
}
export type LicenseRecommendationFilters = LicenseRecommendationFilter[];
export type ExportableLicenseField =
  | "AccountId"
  | "ResourceArn"
  | "LookbackPeriodInDays"
  | "LastRefreshTimestamp"
  | "Finding"
  | "FindingReasonCodes"
  | "CurrentLicenseConfigurationNumberOfCores"
  | "CurrentLicenseConfigurationInstanceType"
  | "CurrentLicenseConfigurationOperatingSystem"
  | "CurrentLicenseConfigurationLicenseName"
  | "CurrentLicenseConfigurationLicenseEdition"
  | "CurrentLicenseConfigurationLicenseModel"
  | "CurrentLicenseConfigurationLicenseVersion"
  | "CurrentLicenseConfigurationMetricsSource"
  | "RecommendationOptionsOperatingSystem"
  | "RecommendationOptionsLicenseEdition"
  | "RecommendationOptionsLicenseModel"
  | "RecommendationOptionsSavingsOpportunityPercentage"
  | "RecommendationOptionsEstimatedMonthlySavingsCurrency"
  | "RecommendationOptionsEstimatedMonthlySavingsValue"
  | "Tags"
  | (string & {});
export type ExportableLicenseFields = ExportableLicenseField[];
export interface ExportLicenseRecommendationsRequest {
  accountIds?: string[];
  filters?: LicenseRecommendationFilter[];
  fieldsToExport?: ExportableLicenseField[];
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat;
  includeMemberAccounts?: boolean;
}
export interface ExportLicenseRecommendationsResponse {
  jobId?: string;
  s3Destination?: S3Destination;
}
export type RDSDBRecommendationFilterName =
  | "InstanceFinding"
  | "InstanceFindingReasonCode"
  | "StorageFinding"
  | "StorageFindingReasonCode"
  | "Idle"
  | (string & {});
export interface RDSDBRecommendationFilter {
  name?: RDSDBRecommendationFilterName;
  values?: string[];
}
export type RDSDBRecommendationFilters = RDSDBRecommendationFilter[];
export type ExportableRDSDBField =
  | "ResourceArn"
  | "AccountId"
  | "Engine"
  | "EngineVersion"
  | "Idle"
  | "MultiAZDBInstance"
  | "ClusterWriter"
  | "CurrentDBInstanceClass"
  | "CurrentStorageConfigurationStorageType"
  | "CurrentStorageConfigurationAllocatedStorage"
  | "CurrentStorageConfigurationMaxAllocatedStorage"
  | "CurrentStorageConfigurationIOPS"
  | "CurrentStorageConfigurationStorageThroughput"
  | "CurrentStorageEstimatedMonthlyVolumeIOPsCostVariation"
  | "CurrentInstanceOnDemandHourlyPrice"
  | "CurrentStorageOnDemandMonthlyPrice"
  | "LookbackPeriodInDays"
  | "CurrentStorageEstimatedClusterInstanceOnDemandMonthlyCost"
  | "CurrentStorageEstimatedClusterStorageOnDemandMonthlyCost"
  | "CurrentStorageEstimatedClusterStorageIOOnDemandMonthlyCost"
  | "CurrentInstancePerformanceRisk"
  | "UtilizationMetricsCpuMaximum"
  | "UtilizationMetricsMemoryMaximum"
  | "UtilizationMetricsEBSVolumeStorageSpaceUtilizationMaximum"
  | "UtilizationMetricsNetworkReceiveThroughputMaximum"
  | "UtilizationMetricsNetworkTransmitThroughputMaximum"
  | "UtilizationMetricsEBSVolumeReadIOPSMaximum"
  | "UtilizationMetricsEBSVolumeWriteIOPSMaximum"
  | "UtilizationMetricsEBSVolumeReadThroughputMaximum"
  | "UtilizationMetricsEBSVolumeWriteThroughputMaximum"
  | "UtilizationMetricsDatabaseConnectionsMaximum"
  | "UtilizationMetricsStorageNetworkReceiveThroughputMaximum"
  | "UtilizationMetricsStorageNetworkTransmitThroughputMaximum"
  | "UtilizationMetricsAuroraMemoryHealthStateMaximum"
  | "UtilizationMetricsAuroraMemoryNumDeclinedSqlTotalMaximum"
  | "UtilizationMetricsAuroraMemoryNumKillConnTotalMaximum"
  | "UtilizationMetricsAuroraMemoryNumKillQueryTotalMaximum"
  | "UtilizationMetricsReadIOPSEphemeralStorageMaximum"
  | "UtilizationMetricsWriteIOPSEphemeralStorageMaximum"
  | "UtilizationMetricsVolumeBytesUsedAverage"
  | "UtilizationMetricsVolumeReadIOPsAverage"
  | "UtilizationMetricsVolumeWriteIOPsAverage"
  | "InstanceFinding"
  | "InstanceFindingReasonCodes"
  | "StorageFinding"
  | "StorageFindingReasonCodes"
  | "InstanceRecommendationOptionsDBInstanceClass"
  | "InstanceRecommendationOptionsRank"
  | "InstanceRecommendationOptionsPerformanceRisk"
  | "InstanceRecommendationOptionsProjectedUtilizationMetricsCpuMaximum"
  | "StorageRecommendationOptionsStorageType"
  | "StorageRecommendationOptionsAllocatedStorage"
  | "StorageRecommendationOptionsMaxAllocatedStorage"
  | "StorageRecommendationOptionsIOPS"
  | "StorageRecommendationOptionsStorageThroughput"
  | "StorageRecommendationOptionsRank"
  | "StorageRecommendationOptionsEstimatedMonthlyVolumeIOPsCostVariation"
  | "InstanceRecommendationOptionsInstanceOnDemandHourlyPrice"
  | "InstanceRecommendationOptionsSavingsOpportunityPercentage"
  | "InstanceRecommendationOptionsEstimatedMonthlySavingsCurrency"
  | "InstanceRecommendationOptionsEstimatedMonthlySavingsValue"
  | "InstanceRecommendationOptionsSavingsOpportunityAfterDiscountsPercentage"
  | "InstanceRecommendationOptionsEstimatedMonthlySavingsCurrencyAfterDiscounts"
  | "InstanceRecommendationOptionsEstimatedMonthlySavingsValueAfterDiscounts"
  | "StorageRecommendationOptionsOnDemandMonthlyPrice"
  | "StorageRecommendationOptionsEstimatedClusterInstanceOnDemandMonthlyCost"
  | "StorageRecommendationOptionsEstimatedClusterStorageOnDemandMonthlyCost"
  | "StorageRecommendationOptionsEstimatedClusterStorageIOOnDemandMonthlyCost"
  | "StorageRecommendationOptionsSavingsOpportunityPercentage"
  | "StorageRecommendationOptionsEstimatedMonthlySavingsCurrency"
  | "StorageRecommendationOptionsEstimatedMonthlySavingsValue"
  | "StorageRecommendationOptionsSavingsOpportunityAfterDiscountsPercentage"
  | "StorageRecommendationOptionsEstimatedMonthlySavingsCurrencyAfterDiscounts"
  | "StorageRecommendationOptionsEstimatedMonthlySavingsValueAfterDiscounts"
  | "EffectiveRecommendationPreferencesCpuVendorArchitectures"
  | "EffectiveRecommendationPreferencesEnhancedInfrastructureMetrics"
  | "EffectiveRecommendationPreferencesLookBackPeriod"
  | "EffectiveRecommendationPreferencesSavingsEstimationMode"
  | "LastRefreshTimestamp"
  | "Tags"
  | "DBClusterIdentifier"
  | "PromotionTier"
  | (string & {});
export type ExportableRDSDBFields = ExportableRDSDBField[];
export interface ExportRDSDatabaseRecommendationsRequest {
  accountIds?: string[];
  filters?: RDSDBRecommendationFilter[];
  fieldsToExport?: ExportableRDSDBField[];
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat;
  includeMemberAccounts?: boolean;
  recommendationPreferences?: RecommendationPreferences;
}
export interface ExportRDSDatabaseRecommendationsResponse {
  jobId?: string;
  s3Destination?: S3Destination;
}
export type AutoScalingGroupArn = string;
export type AutoScalingGroupArns = string[];
export interface GetAutoScalingGroupRecommendationsRequest {
  accountIds?: string[];
  autoScalingGroupArns?: string[];
  nextToken?: string;
  maxResults?: number;
  filters?: Filter[];
  recommendationPreferences?: RecommendationPreferences;
}
export type AutoScalingGroupName = string;
export type Finding =
  | "Underprovisioned"
  | "Overprovisioned"
  | "Optimized"
  | "NotOptimized"
  | (string & {});
export type MetricName =
  | "Cpu"
  | "Memory"
  | "EBS_READ_OPS_PER_SECOND"
  | "EBS_WRITE_OPS_PER_SECOND"
  | "EBS_READ_BYTES_PER_SECOND"
  | "EBS_WRITE_BYTES_PER_SECOND"
  | "DISK_READ_OPS_PER_SECOND"
  | "DISK_WRITE_OPS_PER_SECOND"
  | "DISK_READ_BYTES_PER_SECOND"
  | "DISK_WRITE_BYTES_PER_SECOND"
  | "NETWORK_IN_BYTES_PER_SECOND"
  | "NETWORK_OUT_BYTES_PER_SECOND"
  | "NETWORK_PACKETS_IN_PER_SECOND"
  | "NETWORK_PACKETS_OUT_PER_SECOND"
  | "GPU_PERCENTAGE"
  | "GPU_MEMORY_PERCENTAGE"
  | (string & {});
export type MetricStatistic = "Maximum" | "Average" | (string & {});
export type MetricValue = number;
export interface UtilizationMetric {
  name?: MetricName;
  statistic?: MetricStatistic;
  value?: number;
}
export type UtilizationMetrics = UtilizationMetric[];
export type LookBackPeriodInDays = number;
export type DesiredCapacity = number;
export type MinSize = number;
export type MaxSize = number;
export type NullableInstanceType = string;
export type AllocationStrategy = "Prioritized" | "LowestPrice" | (string & {});
export type NullableEstimatedInstanceHourReductionPercentage = number;
export type AsgType =
  | "SingleInstanceType"
  | "MixedInstanceTypes"
  | (string & {});
export type MixedInstanceType = string;
export type MixedInstanceTypes = string[];
export interface AutoScalingGroupConfiguration {
  desiredCapacity?: number;
  minSize?: number;
  maxSize?: number;
  instanceType?: string;
  allocationStrategy?: AllocationStrategy;
  estimatedInstanceHourReductionPercentage?: number;
  type?: AsgType;
  mixedInstanceTypes?: string[];
}
export type GpuCount = number;
export type GpuMemorySizeInMiB = number;
export interface Gpu {
  gpuCount?: number;
  gpuMemorySizeInMiB?: number;
}
export type Gpus = Gpu[];
export interface GpuInfo {
  gpus?: Gpu[];
}
export type ProjectedUtilizationMetrics = UtilizationMetric[];
export type PerformanceRisk = number;
export type Rank = number;
export type SavingsOpportunityPercentage = number;
export type Currency = "USD" | "CNY" | (string & {});
export type Value = number;
export interface EstimatedMonthlySavings {
  currency?: Currency;
  value?: number;
}
export interface SavingsOpportunity {
  savingsOpportunityPercentage?: number;
  estimatedMonthlySavings?: EstimatedMonthlySavings;
}
export interface AutoScalingGroupEstimatedMonthlySavings {
  currency?: Currency;
  value?: number;
}
export interface AutoScalingGroupSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number;
  estimatedMonthlySavings?: AutoScalingGroupEstimatedMonthlySavings;
}
export type MigrationEffort =
  | "VeryLow"
  | "Low"
  | "Medium"
  | "High"
  | (string & {});
export interface AutoScalingGroupRecommendationOption {
  configuration?: AutoScalingGroupConfiguration;
  instanceGpuInfo?: GpuInfo;
  projectedUtilizationMetrics?: UtilizationMetric[];
  performanceRisk?: number;
  rank?: number;
  savingsOpportunity?: SavingsOpportunity;
  savingsOpportunityAfterDiscounts?: AutoScalingGroupSavingsOpportunityAfterDiscounts;
  migrationEffort?: MigrationEffort;
}
export type AutoScalingGroupRecommendationOptions =
  AutoScalingGroupRecommendationOption[];
export type LastRefreshTimestamp = Date;
export type CurrentPerformanceRisk =
  | "VeryLow"
  | "Low"
  | "Medium"
  | "High"
  | (string & {});
export type EnhancedInfrastructureMetrics =
  | "Active"
  | "Inactive"
  | (string & {});
export type InferredWorkloadTypesPreference =
  | "Active"
  | "Inactive"
  | (string & {});
export type ExternalMetricsSource =
  | "Datadog"
  | "Dynatrace"
  | "NewRelic"
  | "Instana"
  | (string & {});
export interface ExternalMetricsPreference {
  source?: ExternalMetricsSource;
}
export type LookBackPeriodPreference =
  | "DAYS_14"
  | "DAYS_32"
  | "DAYS_93"
  | (string & {});
export type CustomizableMetricName =
  | "CpuUtilization"
  | "MemoryUtilization"
  | (string & {});
export type CustomizableMetricThreshold =
  | "P90"
  | "P95"
  | "P99_5"
  | (string & {});
export type CustomizableMetricHeadroom =
  | "PERCENT_30"
  | "PERCENT_20"
  | "PERCENT_10"
  | "PERCENT_0"
  | (string & {});
export interface CustomizableMetricParameters {
  threshold?: CustomizableMetricThreshold;
  headroom?: CustomizableMetricHeadroom;
}
export interface UtilizationPreference {
  metricName?: CustomizableMetricName;
  metricParameters?: CustomizableMetricParameters;
}
export type UtilizationPreferences = UtilizationPreference[];
export type PreferredResourceName = "Ec2InstanceTypes" | (string & {});
export type PreferredResourceValue = string;
export type PreferredResourceValues = string[];
export interface EffectivePreferredResource {
  name?: PreferredResourceName;
  includeList?: string[];
  effectiveIncludeList?: string[];
  excludeList?: string[];
}
export type EffectivePreferredResources = EffectivePreferredResource[];
export type InstanceSavingsEstimationModeSource =
  | "PublicPricing"
  | "CostExplorerRightsizing"
  | "CostOptimizationHub"
  | (string & {});
export interface InstanceSavingsEstimationMode {
  source?: InstanceSavingsEstimationModeSource;
}
export interface EffectiveRecommendationPreferences {
  cpuVendorArchitectures?: CpuVendorArchitecture[];
  enhancedInfrastructureMetrics?: EnhancedInfrastructureMetrics;
  inferredWorkloadTypes?: InferredWorkloadTypesPreference;
  externalMetricsPreference?: ExternalMetricsPreference;
  lookBackPeriod?: LookBackPeriodPreference;
  utilizationPreferences?: UtilizationPreference[];
  preferredResources?: EffectivePreferredResource[];
  savingsEstimationMode?: InstanceSavingsEstimationMode;
}
export type InferredWorkloadType =
  | "AmazonEmr"
  | "ApacheCassandra"
  | "ApacheHadoop"
  | "Memcached"
  | "Nginx"
  | "PostgreSql"
  | "Redis"
  | "Kafka"
  | "SQLServer"
  | (string & {});
export type InferredWorkloadTypes = InferredWorkloadType[];
export interface AutoScalingGroupRecommendation {
  accountId?: string;
  autoScalingGroupArn?: string;
  autoScalingGroupName?: string;
  finding?: Finding;
  utilizationMetrics?: UtilizationMetric[];
  lookBackPeriodInDays?: number;
  currentConfiguration?: AutoScalingGroupConfiguration;
  currentInstanceGpuInfo?: GpuInfo;
  recommendationOptions?: AutoScalingGroupRecommendationOption[];
  lastRefreshTimestamp?: Date;
  currentPerformanceRisk?: CurrentPerformanceRisk;
  effectiveRecommendationPreferences?: EffectiveRecommendationPreferences;
  inferredWorkloadTypes?: InferredWorkloadType[];
}
export type AutoScalingGroupRecommendations = AutoScalingGroupRecommendation[];
export type Identifier = string;
export type Code = string;
export type Message = string;
export interface GetRecommendationError {
  identifier?: string;
  code?: string;
  message?: string;
}
export type GetRecommendationErrors = GetRecommendationError[];
export interface GetAutoScalingGroupRecommendationsResponse {
  nextToken?: string;
  autoScalingGroupRecommendations?: AutoScalingGroupRecommendation[];
  errors?: GetRecommendationError[];
}
export type VolumeArn = string;
export type VolumeArns = string[];
export interface GetEBSVolumeRecommendationsRequest {
  volumeArns?: string[];
  nextToken?: string;
  maxResults?: number;
  filters?: EBSFilter[];
  accountIds?: string[];
}
export type VolumeType = string;
export type VolumeSize = number;
export type VolumeBaselineIOPS = number;
export type VolumeBurstIOPS = number;
export type VolumeBaselineThroughput = number;
export type VolumeBurstThroughput = number;
export type RootVolume = boolean;
export interface VolumeConfiguration {
  volumeType?: string;
  volumeSize?: number;
  volumeBaselineIOPS?: number;
  volumeBurstIOPS?: number;
  volumeBaselineThroughput?: number;
  volumeBurstThroughput?: number;
  rootVolume?: boolean;
}
export type EBSFinding = "Optimized" | "NotOptimized" | (string & {});
export type EBSMetricName =
  | "VolumeReadOpsPerSecond"
  | "VolumeWriteOpsPerSecond"
  | "VolumeReadBytesPerSecond"
  | "VolumeWriteBytesPerSecond"
  | "VolumeIOPSExceeded"
  | "VolumeThroughputExceeded"
  | (string & {});
export interface EBSUtilizationMetric {
  name?: EBSMetricName;
  statistic?: MetricStatistic;
  value?: number;
}
export type EBSUtilizationMetrics = EBSUtilizationMetric[];
export interface EBSEstimatedMonthlySavings {
  currency?: Currency;
  value?: number;
}
export interface EBSSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number;
  estimatedMonthlySavings?: EBSEstimatedMonthlySavings;
}
export interface VolumeRecommendationOption {
  configuration?: VolumeConfiguration;
  performanceRisk?: number;
  rank?: number;
  savingsOpportunity?: SavingsOpportunity;
  savingsOpportunityAfterDiscounts?: EBSSavingsOpportunityAfterDiscounts;
}
export type VolumeRecommendationOptions = VolumeRecommendationOption[];
export type EBSSavingsEstimationModeSource =
  | "PublicPricing"
  | "CostExplorerRightsizing"
  | "CostOptimizationHub"
  | (string & {});
export interface EBSSavingsEstimationMode {
  source?: EBSSavingsEstimationModeSource;
}
export interface EBSEffectiveRecommendationPreferences {
  savingsEstimationMode?: EBSSavingsEstimationMode;
  lookBackPeriod?: LookBackPeriodPreference;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key?: string;
  value?: string;
}
export type Tags = Tag[];
export interface VolumeRecommendation {
  volumeArn?: string;
  accountId?: string;
  currentConfiguration?: VolumeConfiguration;
  finding?: EBSFinding;
  utilizationMetrics?: EBSUtilizationMetric[];
  lookBackPeriodInDays?: number;
  volumeRecommendationOptions?: VolumeRecommendationOption[];
  lastRefreshTimestamp?: Date;
  currentPerformanceRisk?: CurrentPerformanceRisk;
  effectiveRecommendationPreferences?: EBSEffectiveRecommendationPreferences;
  tags?: Tag[];
}
export type VolumeRecommendations = VolumeRecommendation[];
export interface GetEBSVolumeRecommendationsResponse {
  nextToken?: string;
  volumeRecommendations?: VolumeRecommendation[];
  errors?: GetRecommendationError[];
}
export type InstanceArn = string;
export type InstanceArns = string[];
export interface GetEC2InstanceRecommendationsRequest {
  instanceArns?: string[];
  nextToken?: string;
  maxResults?: number;
  filters?: Filter[];
  accountIds?: string[];
  recommendationPreferences?: RecommendationPreferences;
}
export type InstanceName = string;
export type CurrentInstanceType = string;
export type InstanceRecommendationFindingReasonCode =
  | "CPUOverprovisioned"
  | "CPUUnderprovisioned"
  | "MemoryOverprovisioned"
  | "MemoryUnderprovisioned"
  | "EBSThroughputOverprovisioned"
  | "EBSThroughputUnderprovisioned"
  | "EBSIOPSOverprovisioned"
  | "EBSIOPSUnderprovisioned"
  | "NetworkBandwidthOverprovisioned"
  | "NetworkBandwidthUnderprovisioned"
  | "NetworkPPSOverprovisioned"
  | "NetworkPPSUnderprovisioned"
  | "DiskIOPSOverprovisioned"
  | "DiskIOPSUnderprovisioned"
  | "DiskThroughputOverprovisioned"
  | "DiskThroughputUnderprovisioned"
  | "GPUUnderprovisioned"
  | "GPUOverprovisioned"
  | "GPUMemoryUnderprovisioned"
  | "GPUMemoryOverprovisioned"
  | (string & {});
export type InstanceRecommendationFindingReasonCodes =
  InstanceRecommendationFindingReasonCode[];
export type InstanceType = string;
export type PlatformDifference =
  | "Hypervisor"
  | "NetworkInterface"
  | "StorageInterface"
  | "InstanceStoreAvailability"
  | "VirtualizationType"
  | "Architecture"
  | (string & {});
export type PlatformDifferences = PlatformDifference[];
export interface InstanceEstimatedMonthlySavings {
  currency?: Currency;
  value?: number;
}
export interface InstanceSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number;
  estimatedMonthlySavings?: InstanceEstimatedMonthlySavings;
}
export interface InstanceRecommendationOption {
  instanceType?: string;
  instanceGpuInfo?: GpuInfo;
  projectedUtilizationMetrics?: UtilizationMetric[];
  platformDifferences?: PlatformDifference[];
  performanceRisk?: number;
  rank?: number;
  savingsOpportunity?: SavingsOpportunity;
  savingsOpportunityAfterDiscounts?: InstanceSavingsOpportunityAfterDiscounts;
  migrationEffort?: MigrationEffort;
}
export type RecommendationOptions = InstanceRecommendationOption[];
export type RecommendationSourceArn = string;
export type RecommendationSourceType =
  | "Ec2Instance"
  | "AutoScalingGroup"
  | "EbsVolume"
  | "LambdaFunction"
  | "EcsService"
  | "License"
  | "RdsDBInstance"
  | "RdsDBInstanceStorage"
  | "AuroraDBClusterStorage"
  | "NatGateway"
  | "DynamoDBTable"
  | "ElastiCacheCluster"
  | "MemoryDBCluster"
  | "DocumentDBCluster"
  | "WorkSpaces"
  | "SageMakerEndpoint"
  | (string & {});
export interface RecommendationSource {
  recommendationSourceArn?: string;
  recommendationSourceType?: RecommendationSourceType;
}
export type RecommendationSources = RecommendationSource[];
export type InstanceState =
  | "pending"
  | "running"
  | "shutting-down"
  | "terminated"
  | "stopping"
  | "stopped"
  | (string & {});
export type ExternalMetricStatusCode =
  | "NO_EXTERNAL_METRIC_SET"
  | "INTEGRATION_SUCCESS"
  | "DATADOG_INTEGRATION_ERROR"
  | "DYNATRACE_INTEGRATION_ERROR"
  | "NEWRELIC_INTEGRATION_ERROR"
  | "INSTANA_INTEGRATION_ERROR"
  | "INSUFFICIENT_DATADOG_METRICS"
  | "INSUFFICIENT_DYNATRACE_METRICS"
  | "INSUFFICIENT_NEWRELIC_METRICS"
  | "INSUFFICIENT_INSTANA_METRICS"
  | (string & {});
export type ExternalMetricStatusReason = string;
export interface ExternalMetricStatus {
  statusCode?: ExternalMetricStatusCode;
  statusReason?: string;
}
export type InstanceIdle = "True" | "False" | (string & {});
export interface InstanceRecommendation {
  instanceArn?: string;
  accountId?: string;
  instanceName?: string;
  currentInstanceType?: string;
  finding?: Finding;
  findingReasonCodes?: InstanceRecommendationFindingReasonCode[];
  utilizationMetrics?: UtilizationMetric[];
  lookBackPeriodInDays?: number;
  recommendationOptions?: InstanceRecommendationOption[];
  recommendationSources?: RecommendationSource[];
  lastRefreshTimestamp?: Date;
  currentPerformanceRisk?: CurrentPerformanceRisk;
  effectiveRecommendationPreferences?: EffectiveRecommendationPreferences;
  inferredWorkloadTypes?: InferredWorkloadType[];
  instanceState?: InstanceState;
  tags?: Tag[];
  externalMetricStatus?: ExternalMetricStatus;
  currentInstanceGpuInfo?: GpuInfo;
  idle?: InstanceIdle;
}
export type InstanceRecommendations = InstanceRecommendation[];
export interface GetEC2InstanceRecommendationsResponse {
  nextToken?: string;
  instanceRecommendations?: InstanceRecommendation[];
  errors?: GetRecommendationError[];
}
export type Period = number;
export interface GetEC2RecommendationProjectedMetricsRequest {
  instanceArn: string;
  stat: MetricStatistic;
  period: number;
  startTime: Date;
  endTime: Date;
  recommendationPreferences?: RecommendationPreferences;
}
export type RecommendedInstanceType = string;
export type Timestamps = Date[];
export type MetricValues = number[];
export interface ProjectedMetric {
  name?: MetricName;
  timestamps?: Date[];
  values?: number[];
}
export type ProjectedMetrics = ProjectedMetric[];
export interface RecommendedOptionProjectedMetric {
  recommendedInstanceType?: string;
  rank?: number;
  projectedMetrics?: ProjectedMetric[];
}
export type RecommendedOptionProjectedMetrics =
  RecommendedOptionProjectedMetric[];
export interface GetEC2RecommendationProjectedMetricsResponse {
  recommendedOptionProjectedMetrics?: RecommendedOptionProjectedMetric[];
}
export type ServiceArn = string;
export interface GetECSServiceRecommendationProjectedMetricsRequest {
  serviceArn: string;
  stat: MetricStatistic;
  period: number;
  startTime: Date;
  endTime: Date;
}
export type CpuSize = number;
export type MemorySize = number;
export type ECSServiceMetricName = "Cpu" | "Memory" | (string & {});
export interface ECSServiceProjectedMetric {
  name?: ECSServiceMetricName;
  timestamps?: Date[];
  upperBoundValues?: number[];
  lowerBoundValues?: number[];
}
export type ECSServiceProjectedMetrics = ECSServiceProjectedMetric[];
export interface ECSServiceRecommendedOptionProjectedMetric {
  recommendedCpuUnits?: number;
  recommendedMemorySize?: number;
  projectedMetrics?: ECSServiceProjectedMetric[];
}
export type ECSServiceRecommendedOptionProjectedMetrics =
  ECSServiceRecommendedOptionProjectedMetric[];
export interface GetECSServiceRecommendationProjectedMetricsResponse {
  recommendedOptionProjectedMetrics?: ECSServiceRecommendedOptionProjectedMetric[];
}
export type ServiceArns = string[];
export interface GetECSServiceRecommendationsRequest {
  serviceArns?: string[];
  nextToken?: string;
  maxResults?: number;
  filters?: ECSServiceRecommendationFilter[];
  accountIds?: string[];
}
export type NullableMemory = number;
export type NullableCpu = number;
export type ContainerName = string;
export type NullableMemoryReservation = number;
export interface MemorySizeConfiguration {
  memory?: number;
  memoryReservation?: number;
}
export interface ContainerConfiguration {
  containerName?: string;
  memorySizeConfiguration?: MemorySizeConfiguration;
  cpu?: number;
}
export type ContainerConfigurations = ContainerConfiguration[];
export type AutoScalingConfiguration =
  | "TargetTrackingScalingCpu"
  | "TargetTrackingScalingMemory"
  | (string & {});
export type TaskDefinitionArn = string;
export interface ServiceConfiguration {
  memory?: number;
  cpu?: number;
  containerConfigurations?: ContainerConfiguration[];
  autoScalingConfiguration?: AutoScalingConfiguration;
  taskDefinitionArn?: string;
}
export type ECSServiceMetricStatistic = "Maximum" | "Average" | (string & {});
export interface ECSServiceUtilizationMetric {
  name?: ECSServiceMetricName;
  statistic?: ECSServiceMetricStatistic;
  value?: number;
}
export type ECSServiceUtilizationMetrics = ECSServiceUtilizationMetric[];
export type ECSServiceLaunchType = "EC2" | "Fargate" | (string & {});
export type ECSServiceRecommendationFinding =
  | "Optimized"
  | "Underprovisioned"
  | "Overprovisioned"
  | (string & {});
export type ECSServiceRecommendationFindingReasonCode =
  | "MemoryOverprovisioned"
  | "MemoryUnderprovisioned"
  | "CPUOverprovisioned"
  | "CPUUnderprovisioned"
  | (string & {});
export type ECSServiceRecommendationFindingReasonCodes =
  ECSServiceRecommendationFindingReasonCode[];
export interface ECSEstimatedMonthlySavings {
  currency?: Currency;
  value?: number;
}
export interface ECSSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number;
  estimatedMonthlySavings?: ECSEstimatedMonthlySavings;
}
export type LowerBoundValue = number;
export type UpperBoundValue = number;
export interface ECSServiceProjectedUtilizationMetric {
  name?: ECSServiceMetricName;
  statistic?: ECSServiceMetricStatistic;
  lowerBoundValue?: number;
  upperBoundValue?: number;
}
export type ECSServiceProjectedUtilizationMetrics =
  ECSServiceProjectedUtilizationMetric[];
export interface ContainerRecommendation {
  containerName?: string;
  memorySizeConfiguration?: MemorySizeConfiguration;
  cpu?: number;
}
export type ContainerRecommendations = ContainerRecommendation[];
export interface ECSServiceRecommendationOption {
  memory?: number;
  cpu?: number;
  savingsOpportunity?: SavingsOpportunity;
  savingsOpportunityAfterDiscounts?: ECSSavingsOpportunityAfterDiscounts;
  projectedUtilizationMetrics?: ECSServiceProjectedUtilizationMetric[];
  containerRecommendations?: ContainerRecommendation[];
}
export type ECSServiceRecommendationOptions = ECSServiceRecommendationOption[];
export type ECSSavingsEstimationModeSource =
  | "PublicPricing"
  | "CostExplorerRightsizing"
  | "CostOptimizationHub"
  | (string & {});
export interface ECSSavingsEstimationMode {
  source?: ECSSavingsEstimationModeSource;
}
export interface ECSEffectiveRecommendationPreferences {
  savingsEstimationMode?: ECSSavingsEstimationMode;
  lookBackPeriod?: LookBackPeriodPreference;
}
export interface ECSServiceRecommendation {
  serviceArn?: string;
  accountId?: string;
  currentServiceConfiguration?: ServiceConfiguration;
  utilizationMetrics?: ECSServiceUtilizationMetric[];
  lookbackPeriodInDays?: number;
  launchType?: ECSServiceLaunchType;
  lastRefreshTimestamp?: Date;
  finding?: ECSServiceRecommendationFinding;
  findingReasonCodes?: ECSServiceRecommendationFindingReasonCode[];
  serviceRecommendationOptions?: ECSServiceRecommendationOption[];
  currentPerformanceRisk?: CurrentPerformanceRisk;
  effectiveRecommendationPreferences?: ECSEffectiveRecommendationPreferences;
  tags?: Tag[];
}
export type ECSServiceRecommendations = ECSServiceRecommendation[];
export interface GetECSServiceRecommendationsResponse {
  nextToken?: string;
  ecsServiceRecommendations?: ECSServiceRecommendation[];
  errors?: GetRecommendationError[];
}
export type ResourceArn = string;
export interface GetEffectiveRecommendationPreferencesRequest {
  resourceArn: string;
}
export interface GetEffectiveRecommendationPreferencesResponse {
  enhancedInfrastructureMetrics?: EnhancedInfrastructureMetrics;
  externalMetricsPreference?: ExternalMetricsPreference;
  lookBackPeriod?: LookBackPeriodPreference;
  utilizationPreferences?: UtilizationPreference[];
  preferredResources?: EffectivePreferredResource[];
}
export interface GetEnrollmentStatusRequest {}
export type Status =
  | "Active"
  | "Inactive"
  | "Pending"
  | "Failed"
  | (string & {});
export type StatusReason = string;
export type MemberAccountsEnrolled = boolean;
export type NumberOfMemberAccountsOptedIn = number;
export interface GetEnrollmentStatusResponse {
  status?: Status;
  statusReason?: string;
  memberAccountsEnrolled?: boolean;
  lastUpdatedTimestamp?: Date;
  numberOfMemberAccountsOptedIn?: number;
}
export type EnrollmentFilterName = "Status" | (string & {});
export interface EnrollmentFilter {
  name?: EnrollmentFilterName;
  values?: string[];
}
export type EnrollmentFilters = EnrollmentFilter[];
export interface GetEnrollmentStatusesForOrganizationRequest {
  filters?: EnrollmentFilter[];
  nextToken?: string;
  maxResults?: number;
}
export interface AccountEnrollmentStatus {
  accountId?: string;
  status?: Status;
  statusReason?: string;
  lastUpdatedTimestamp?: Date;
}
export type AccountEnrollmentStatuses = AccountEnrollmentStatus[];
export interface GetEnrollmentStatusesForOrganizationResponse {
  accountEnrollmentStatuses?: AccountEnrollmentStatus[];
  nextToken?: string;
}
export type ResourceArns = string[];
export type IdleMaxResults = number;
export type Dimension =
  | "SavingsValue"
  | "SavingsValueAfterDiscount"
  | (string & {});
export type Order = "Asc" | "Desc" | (string & {});
export interface OrderBy {
  dimension?: Dimension;
  order?: Order;
}
export interface GetIdleRecommendationsRequest {
  resourceArns?: string[];
  nextToken?: string;
  maxResults?: number;
  filters?: IdleRecommendationFilter[];
  accountIds?: string[];
  orderBy?: OrderBy;
}
export type ResourceId = string;
export type IdleRecommendationResourceType =
  | "EC2Instance"
  | "AutoScalingGroup"
  | "EBSVolume"
  | "ECSService"
  | "RDSDBInstance"
  | "NatGateway"
  | "DynamoDBTable"
  | "ElastiCacheCluster"
  | "MemoryDBCluster"
  | "DocumentDBCluster"
  | "WorkSpaces"
  | "SageMakerEndpoint"
  | (string & {});
export type IdleFinding = "Idle" | "Unattached" | "Unused" | (string & {});
export type IdleFindingDescription = string;
export interface IdleEstimatedMonthlySavings {
  currency?: Currency;
  value?: number;
}
export interface IdleSavingsOpportunity {
  savingsOpportunityPercentage?: number;
  estimatedMonthlySavings?: IdleEstimatedMonthlySavings;
}
export interface IdleSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number;
  estimatedMonthlySavings?: IdleEstimatedMonthlySavings;
}
export type IdleMetricName =
  | "CPU"
  | "Memory"
  | "NetworkOutBytesPerSecond"
  | "NetworkInBytesPerSecond"
  | "DatabaseConnections"
  | "EBSVolumeReadIOPS"
  | "EBSVolumeWriteIOPS"
  | "VolumeReadOpsPerSecond"
  | "VolumeWriteOpsPerSecond"
  | "ActiveConnectionCount"
  | "PacketsInFromSource"
  | "PacketsInFromDestination"
  | "ConsumedReadCapacityUnits"
  | "ConsumedWriteCapacityUnits"
  | "ConsumedChangeDataCaptureUnits"
  | "NewConnections"
  | "EngineCPUUtilization"
  | "CacheHits"
  | "CacheMisses"
  | "KeyspaceHits"
  | "KeyspaceMisses"
  | "IsIdle"
  | "UserConnected"
  | "Invocations"
  | "GetTypeCmds"
  | "SetTypeCmds"
  | "ElastiCacheProcessingUnits"
  | "CurrConnections"
  | (string & {});
export type IdleDimensionKey = string;
export type IdleDimensionValue = string;
export type IdleDimensionValues = string[];
export interface IdleDimension {
  key?: string;
  values?: string[];
}
export type IdleDimensions = IdleDimension[];
export interface IdleUtilizationMetric {
  name?: IdleMetricName;
  statistic?: MetricStatistic;
  value?: number;
  dimensions?: IdleDimension[];
}
export type IdleUtilizationMetrics = IdleUtilizationMetric[];
export interface IdleRecommendation {
  resourceArn?: string;
  resourceId?: string;
  resourceType?: IdleRecommendationResourceType;
  accountId?: string;
  finding?: IdleFinding;
  findingDescription?: string;
  savingsOpportunity?: IdleSavingsOpportunity;
  savingsOpportunityAfterDiscounts?: IdleSavingsOpportunityAfterDiscounts;
  utilizationMetrics?: IdleUtilizationMetric[];
  lookBackPeriodInDays?: number;
  lastRefreshTimestamp?: Date;
  tags?: Tag[];
}
export type IdleRecommendations = IdleRecommendation[];
export interface IdleRecommendationError {
  identifier?: string;
  code?: string;
  message?: string;
  resourceType?: IdleRecommendationResourceType;
}
export type IdleRecommendationErrors = IdleRecommendationError[];
export interface GetIdleRecommendationsResponse {
  nextToken?: string;
  idleRecommendations?: IdleRecommendation[];
  errors?: IdleRecommendationError[];
}
export type FunctionArn = string;
export type FunctionArns = string[];
export interface GetLambdaFunctionRecommendationsRequest {
  functionArns?: string[];
  accountIds?: string[];
  filters?: LambdaFunctionRecommendationFilter[];
  nextToken?: string;
  maxResults?: number;
}
export type FunctionVersion = string;
export type NumberOfInvocations = number;
export type LambdaFunctionMetricName = "Duration" | "Memory" | (string & {});
export type LambdaFunctionMetricStatistic =
  | "Maximum"
  | "Average"
  | (string & {});
export interface LambdaFunctionUtilizationMetric {
  name?: LambdaFunctionMetricName;
  statistic?: LambdaFunctionMetricStatistic;
  value?: number;
}
export type LambdaFunctionUtilizationMetrics =
  LambdaFunctionUtilizationMetric[];
export type LambdaFunctionRecommendationFinding =
  | "Optimized"
  | "NotOptimized"
  | "Unavailable"
  | (string & {});
export type LambdaFunctionRecommendationFindingReasonCode =
  | "MemoryOverprovisioned"
  | "MemoryUnderprovisioned"
  | "InsufficientData"
  | "Inconclusive"
  | (string & {});
export type LambdaFunctionRecommendationFindingReasonCodes =
  LambdaFunctionRecommendationFindingReasonCode[];
export type LambdaFunctionMemoryMetricName = "Duration" | (string & {});
export type LambdaFunctionMemoryMetricStatistic =
  | "LowerBound"
  | "UpperBound"
  | "Expected"
  | (string & {});
export interface LambdaFunctionMemoryProjectedMetric {
  name?: LambdaFunctionMemoryMetricName;
  statistic?: LambdaFunctionMemoryMetricStatistic;
  value?: number;
}
export type LambdaFunctionMemoryProjectedMetrics =
  LambdaFunctionMemoryProjectedMetric[];
export interface LambdaEstimatedMonthlySavings {
  currency?: Currency;
  value?: number;
}
export interface LambdaSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number;
  estimatedMonthlySavings?: LambdaEstimatedMonthlySavings;
}
export interface LambdaFunctionMemoryRecommendationOption {
  rank?: number;
  memorySize?: number;
  projectedUtilizationMetrics?: LambdaFunctionMemoryProjectedMetric[];
  savingsOpportunity?: SavingsOpportunity;
  savingsOpportunityAfterDiscounts?: LambdaSavingsOpportunityAfterDiscounts;
}
export type LambdaFunctionMemoryRecommendationOptions =
  LambdaFunctionMemoryRecommendationOption[];
export type LambdaSavingsEstimationModeSource =
  | "PublicPricing"
  | "CostExplorerRightsizing"
  | "CostOptimizationHub"
  | (string & {});
export interface LambdaSavingsEstimationMode {
  source?: LambdaSavingsEstimationModeSource;
}
export interface LambdaEffectiveRecommendationPreferences {
  savingsEstimationMode?: LambdaSavingsEstimationMode;
}
export interface LambdaFunctionRecommendation {
  functionArn?: string;
  functionVersion?: string;
  accountId?: string;
  currentMemorySize?: number;
  numberOfInvocations?: number;
  utilizationMetrics?: LambdaFunctionUtilizationMetric[];
  lookbackPeriodInDays?: number;
  lastRefreshTimestamp?: Date;
  finding?: LambdaFunctionRecommendationFinding;
  findingReasonCodes?: LambdaFunctionRecommendationFindingReasonCode[];
  memorySizeRecommendationOptions?: LambdaFunctionMemoryRecommendationOption[];
  currentPerformanceRisk?: CurrentPerformanceRisk;
  effectiveRecommendationPreferences?: LambdaEffectiveRecommendationPreferences;
  tags?: Tag[];
}
export type LambdaFunctionRecommendations = LambdaFunctionRecommendation[];
export interface GetLambdaFunctionRecommendationsResponse {
  nextToken?: string;
  lambdaFunctionRecommendations?: LambdaFunctionRecommendation[];
}
export interface GetLicenseRecommendationsRequest {
  resourceArns?: string[];
  nextToken?: string;
  maxResults?: number;
  filters?: LicenseRecommendationFilter[];
  accountIds?: string[];
}
export type NumberOfCores = number;
export type OperatingSystem = string;
export type LicenseEdition =
  | "Enterprise"
  | "Standard"
  | "Free"
  | "NoLicenseEditionFound"
  | (string & {});
export type LicenseName = "SQLServer" | (string & {});
export type LicenseModel =
  | "LicenseIncluded"
  | "BringYourOwnLicense"
  | (string & {});
export type LicenseVersion = string;
export type MetricSourceProvider =
  | "CloudWatchApplicationInsights"
  | (string & {});
export type MetricProviderArn = string;
export interface MetricSource {
  provider?: MetricSourceProvider;
  providerArn?: string;
}
export type MetricsSource = MetricSource[];
export interface LicenseConfiguration {
  numberOfCores?: number;
  instanceType?: string;
  operatingSystem?: string;
  licenseEdition?: LicenseEdition;
  licenseName?: LicenseName;
  licenseModel?: LicenseModel;
  licenseVersion?: string;
  metricsSource?: MetricSource[];
}
export type LicenseFinding =
  | "InsufficientMetrics"
  | "Optimized"
  | "NotOptimized"
  | (string & {});
export type LicenseFindingReasonCode =
  | "InvalidCloudWatchApplicationInsightsSetup"
  | "CloudWatchApplicationInsightsError"
  | "LicenseOverprovisioned"
  | "Optimized"
  | (string & {});
export type LicenseFindingReasonCodes = LicenseFindingReasonCode[];
export interface LicenseRecommendationOption {
  rank?: number;
  operatingSystem?: string;
  licenseEdition?: LicenseEdition;
  licenseModel?: LicenseModel;
  savingsOpportunity?: SavingsOpportunity;
}
export type LicenseRecommendationOptions = LicenseRecommendationOption[];
export interface LicenseRecommendation {
  resourceArn?: string;
  accountId?: string;
  currentLicenseConfiguration?: LicenseConfiguration;
  lookbackPeriodInDays?: number;
  lastRefreshTimestamp?: Date;
  finding?: LicenseFinding;
  findingReasonCodes?: LicenseFindingReasonCode[];
  licenseRecommendationOptions?: LicenseRecommendationOption[];
  tags?: Tag[];
}
export type LicenseRecommendations = LicenseRecommendation[];
export interface GetLicenseRecommendationsResponse {
  nextToken?: string;
  licenseRecommendations?: LicenseRecommendation[];
  errors?: GetRecommendationError[];
}
export interface GetRDSDatabaseRecommendationProjectedMetricsRequest {
  resourceArn: string;
  stat: MetricStatistic;
  period: number;
  startTime: Date;
  endTime: Date;
  recommendationPreferences?: RecommendationPreferences;
}
export type RecommendedDBInstanceClass = string;
export type RDSDBMetricName =
  | "CPU"
  | "Memory"
  | "EBSVolumeStorageSpaceUtilization"
  | "NetworkReceiveThroughput"
  | "NetworkTransmitThroughput"
  | "EBSVolumeReadIOPS"
  | "EBSVolumeWriteIOPS"
  | "EBSVolumeReadThroughput"
  | "EBSVolumeWriteThroughput"
  | "DatabaseConnections"
  | "StorageNetworkReceiveThroughput"
  | "StorageNetworkTransmitThroughput"
  | "AuroraMemoryHealthState"
  | "AuroraMemoryNumDeclinedSql"
  | "AuroraMemoryNumKillConnTotal"
  | "AuroraMemoryNumKillQueryTotal"
  | "ReadIOPSEphemeralStorage"
  | "WriteIOPSEphemeralStorage"
  | "VolumeReadIOPs"
  | "VolumeBytesUsed"
  | "VolumeWriteIOPs"
  | (string & {});
export interface RDSDatabaseProjectedMetric {
  name?: RDSDBMetricName;
  timestamps?: Date[];
  values?: number[];
}
export type RDSDatabaseProjectedMetrics = RDSDatabaseProjectedMetric[];
export interface RDSDatabaseRecommendedOptionProjectedMetric {
  recommendedDBInstanceClass?: string;
  rank?: number;
  projectedMetrics?: RDSDatabaseProjectedMetric[];
}
export type RDSDatabaseRecommendedOptionProjectedMetrics =
  RDSDatabaseRecommendedOptionProjectedMetric[];
export interface GetRDSDatabaseRecommendationProjectedMetricsResponse {
  recommendedOptionProjectedMetrics?: RDSDatabaseRecommendedOptionProjectedMetric[];
}
export interface GetRDSDatabaseRecommendationsRequest {
  resourceArns?: string[];
  nextToken?: string;
  maxResults?: number;
  filters?: RDSDBRecommendationFilter[];
  accountIds?: string[];
  recommendationPreferences?: RecommendationPreferences;
}
export type Engine = string;
export type EngineVersion = string;
export type PromotionTier = number;
export type CurrentDBInstanceClass = string;
export type StorageType = string;
export type AllocatedStorage = number;
export type NullableIOPS = number;
export type NullableMaxAllocatedStorage = number;
export type NullableStorageThroughput = number;
export interface DBStorageConfiguration {
  storageType?: string;
  allocatedStorage?: number;
  iops?: number;
  maxAllocatedStorage?: number;
  storageThroughput?: number;
}
export type DBClusterIdentifier = string;
export type Idle = "True" | "False" | (string & {});
export type RDSInstanceFinding =
  | "Optimized"
  | "Underprovisioned"
  | "Overprovisioned"
  | (string & {});
export type RDSStorageFinding =
  | "Optimized"
  | "Underprovisioned"
  | "Overprovisioned"
  | "NotOptimized"
  | (string & {});
export type RDSInstanceFindingReasonCode =
  | "CPUOverprovisioned"
  | "NetworkBandwidthOverprovisioned"
  | "EBSIOPSOverprovisioned"
  | "EBSIOPSUnderprovisioned"
  | "EBSThroughputOverprovisioned"
  | "CPUUnderprovisioned"
  | "NetworkBandwidthUnderprovisioned"
  | "EBSThroughputUnderprovisioned"
  | "NewGenerationDBInstanceClassAvailable"
  | "NewEngineVersionAvailable"
  | "DBClusterWriterUnderprovisioned"
  | "MemoryUnderprovisioned"
  | "InstanceStorageReadIOPSUnderprovisioned"
  | "InstanceStorageWriteIOPSUnderprovisioned"
  | (string & {});
export type RDSInstanceFindingReasonCodes = RDSInstanceFindingReasonCode[];
export type RDSCurrentInstancePerformanceRisk =
  | "VeryLow"
  | "Low"
  | "Medium"
  | "High"
  | (string & {});
export type RDSEstimatedMonthlyVolumeIOPsCostVariation =
  | "None"
  | "Low"
  | "Medium"
  | "High"
  | (string & {});
export type RDSStorageFindingReasonCode =
  | "EBSVolumeAllocatedStorageUnderprovisioned"
  | "EBSVolumeThroughputUnderprovisioned"
  | "EBSVolumeIOPSOverprovisioned"
  | "EBSVolumeThroughputOverprovisioned"
  | "NewGenerationStorageTypeAvailable"
  | "DBClusterStorageOptionAvailable"
  | "DBClusterStorageSavingsAvailable"
  | (string & {});
export type RDSStorageFindingReasonCodes = RDSStorageFindingReasonCode[];
export type DBInstanceClass = string;
export type RDSDBMetricStatistic =
  | "Maximum"
  | "Minimum"
  | "Average"
  | (string & {});
export interface RDSDBUtilizationMetric {
  name?: RDSDBMetricName;
  statistic?: RDSDBMetricStatistic;
  value?: number;
}
export type RDSDBProjectedUtilizationMetrics = RDSDBUtilizationMetric[];
export interface RDSInstanceEstimatedMonthlySavings {
  currency?: Currency;
  value?: number;
}
export interface RDSInstanceSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number;
  estimatedMonthlySavings?: RDSInstanceEstimatedMonthlySavings;
}
export interface RDSDBInstanceRecommendationOption {
  dbInstanceClass?: string;
  projectedUtilizationMetrics?: RDSDBUtilizationMetric[];
  performanceRisk?: number;
  rank?: number;
  savingsOpportunity?: SavingsOpportunity;
  savingsOpportunityAfterDiscounts?: RDSInstanceSavingsOpportunityAfterDiscounts;
}
export type RDSDBInstanceRecommendationOptions =
  RDSDBInstanceRecommendationOption[];
export interface RDSStorageEstimatedMonthlySavings {
  currency?: Currency;
  value?: number;
}
export interface RDSStorageSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number;
  estimatedMonthlySavings?: RDSStorageEstimatedMonthlySavings;
}
export interface RDSDBStorageRecommendationOption {
  storageConfiguration?: DBStorageConfiguration;
  rank?: number;
  savingsOpportunity?: SavingsOpportunity;
  savingsOpportunityAfterDiscounts?: RDSStorageSavingsOpportunityAfterDiscounts;
  estimatedMonthlyVolumeIOPsCostVariation?: RDSEstimatedMonthlyVolumeIOPsCostVariation;
}
export type RDSDBStorageRecommendationOptions =
  RDSDBStorageRecommendationOption[];
export type RDSDBUtilizationMetrics = RDSDBUtilizationMetric[];
export type RDSSavingsEstimationModeSource =
  | "PublicPricing"
  | "CostExplorerRightsizing"
  | "CostOptimizationHub"
  | (string & {});
export interface RDSSavingsEstimationMode {
  source?: RDSSavingsEstimationModeSource;
}
export interface RDSEffectiveRecommendationPreferences {
  cpuVendorArchitectures?: CpuVendorArchitecture[];
  enhancedInfrastructureMetrics?: EnhancedInfrastructureMetrics;
  lookBackPeriod?: LookBackPeriodPreference;
  savingsEstimationMode?: RDSSavingsEstimationMode;
}
export interface RDSDBRecommendation {
  resourceArn?: string;
  accountId?: string;
  engine?: string;
  engineVersion?: string;
  promotionTier?: number;
  currentDBInstanceClass?: string;
  currentStorageConfiguration?: DBStorageConfiguration;
  dbClusterIdentifier?: string;
  idle?: Idle;
  instanceFinding?: RDSInstanceFinding;
  storageFinding?: RDSStorageFinding;
  instanceFindingReasonCodes?: RDSInstanceFindingReasonCode[];
  currentInstancePerformanceRisk?: RDSCurrentInstancePerformanceRisk;
  currentStorageEstimatedMonthlyVolumeIOPsCostVariation?: RDSEstimatedMonthlyVolumeIOPsCostVariation;
  storageFindingReasonCodes?: RDSStorageFindingReasonCode[];
  instanceRecommendationOptions?: RDSDBInstanceRecommendationOption[];
  storageRecommendationOptions?: RDSDBStorageRecommendationOption[];
  utilizationMetrics?: RDSDBUtilizationMetric[];
  effectiveRecommendationPreferences?: RDSEffectiveRecommendationPreferences;
  lookbackPeriodInDays?: number;
  lastRefreshTimestamp?: Date;
  tags?: Tag[];
}
export type RDSDBRecommendations = RDSDBRecommendation[];
export interface GetRDSDatabaseRecommendationsResponse {
  nextToken?: string;
  rdsDBRecommendations?: RDSDBRecommendation[];
  errors?: GetRecommendationError[];
}
export interface GetRecommendationPreferencesRequest {
  resourceType: ResourceType;
  scope?: Scope;
  nextToken?: string;
  maxResults?: number;
}
export type SavingsEstimationMode =
  | "AfterDiscounts"
  | "BeforeDiscounts"
  | (string & {});
export interface RecommendationPreferencesDetail {
  scope?: Scope;
  resourceType?: ResourceType;
  enhancedInfrastructureMetrics?: EnhancedInfrastructureMetrics;
  inferredWorkloadTypes?: InferredWorkloadTypesPreference;
  externalMetricsPreference?: ExternalMetricsPreference;
  lookBackPeriod?: LookBackPeriodPreference;
  utilizationPreferences?: UtilizationPreference[];
  preferredResources?: EffectivePreferredResource[];
  savingsEstimationMode?: SavingsEstimationMode;
}
export type RecommendationPreferencesDetails =
  RecommendationPreferencesDetail[];
export interface GetRecommendationPreferencesResponse {
  nextToken?: string;
  recommendationPreferencesDetails?: RecommendationPreferencesDetail[];
}
export interface GetRecommendationSummariesRequest {
  accountIds?: string[];
  nextToken?: string;
  maxResults?: number;
}
export type SummaryValue = number;
export type FindingReasonCode =
  | "MemoryOverprovisioned"
  | "MemoryUnderprovisioned"
  | (string & {});
export interface ReasonCodeSummary {
  name?: FindingReasonCode;
  value?: number;
}
export type ReasonCodeSummaries = ReasonCodeSummary[];
export interface Summary {
  name?: Finding;
  value?: number;
  reasonCodeSummaries?: ReasonCodeSummary[];
}
export type Summaries = Summary[];
export interface IdleSummary {
  name?: IdleFinding;
  value?: number;
}
export type IdleSummaries = IdleSummary[];
export type High = number;
export type Medium = number;
export type Low = number;
export type VeryLow = number;
export interface CurrentPerformanceRiskRatings {
  high?: number;
  medium?: number;
  low?: number;
  veryLow?: number;
}
export interface InferredWorkloadSaving {
  inferredWorkloadTypes?: InferredWorkloadType[];
  estimatedMonthlySavings?: EstimatedMonthlySavings;
}
export type InferredWorkloadSavings = InferredWorkloadSaving[];
export interface RecommendationSummary {
  summaries?: Summary[];
  idleSummaries?: IdleSummary[];
  recommendationResourceType?: RecommendationSourceType;
  accountId?: string;
  savingsOpportunity?: SavingsOpportunity;
  idleSavingsOpportunity?: SavingsOpportunity;
  aggregatedSavingsOpportunity?: SavingsOpportunity;
  currentPerformanceRiskRatings?: CurrentPerformanceRiskRatings;
  inferredWorkloadSavings?: InferredWorkloadSaving[];
}
export type RecommendationSummaries = RecommendationSummary[];
export interface GetRecommendationSummariesResponse {
  nextToken?: string;
  recommendationSummaries?: RecommendationSummary[];
}
export interface PreferredResource {
  name?: PreferredResourceName;
  includeList?: string[];
  excludeList?: string[];
}
export type PreferredResources = PreferredResource[];
export interface PutRecommendationPreferencesRequest {
  resourceType: ResourceType;
  scope?: Scope;
  enhancedInfrastructureMetrics?: EnhancedInfrastructureMetrics;
  inferredWorkloadTypes?: InferredWorkloadTypesPreference;
  externalMetricsPreference?: ExternalMetricsPreference;
  lookBackPeriod?: LookBackPeriodPreference;
  utilizationPreferences?: UtilizationPreference[];
  preferredResources?: PreferredResource[];
  savingsEstimationMode?: SavingsEstimationMode;
}
export interface PutRecommendationPreferencesResponse {}
export interface UpdateEnrollmentStatusRequest {
  status: Status;
  includeMemberAccounts?: boolean;
}
export interface UpdateEnrollmentStatusResponse {
  status?: Status;
  statusReason?: string;
}
export type ErrorMessage = string;
export type DeleteRecommendationPreferencesError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a recommendation preference, such as enhanced infrastructure metrics.
 *
 * For more information, see Activating
 * enhanced infrastructure metrics in the Compute Optimizer User
 * Guide.
 */
export const deleteRecommendationPreferences: API.OperationMethod<
  DeleteRecommendationPreferencesRequest,
  DeleteRecommendationPreferencesResponse,
  DeleteRecommendationPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      resourceType: 0,
      scope: i_Scope,
      recommendationPreferenceNames: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecommendationPreferences",
})) as any;

export type DescribeRecommendationExportJobsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes recommendation export jobs created in the last seven days.
 *
 * Use the ExportAutoScalingGroupRecommendations or ExportEC2InstanceRecommendations actions to request an export of your
 * recommendations. Then use the DescribeRecommendationExportJobs action
 * to view your export jobs.
 */
export const describeRecommendationExportJobs: API.PaginatedOperationMethod<
  DescribeRecommendationExportJobsRequest,
  DescribeRecommendationExportJobsResponse,
  DescribeRecommendationExportJobsError,
  Credentials | HttpClient.HttpClient,
  RecommendationExportJob
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      jobIds: 0,
      filters: D.list({ name: 0, values: 0 }),
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      recommendationExportJobs: D.list({
        creationTimestamp: D.ts,
        lastUpdatedTimestamp: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecommendationExportJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommendationExportJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ExportAutoScalingGroupRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Exports optimization recommendations for Auto Scaling groups.
 *
 * Recommendations are exported in a comma-separated values (.csv) file, and its metadata
 * in a JavaScript Object Notation (JSON) (.json) file, to an existing Amazon Simple Storage Service (Amazon S3) bucket that you specify. For more information, see Exporting
 * Recommendations in the Compute Optimizer User
 * Guide.
 *
 * You can have only one Auto Scaling group export job in progress per Amazon Web Services Region.
 */
export const exportAutoScalingGroupRecommendations: API.OperationMethod<
  ExportAutoScalingGroupRecommendationsRequest,
  ExportAutoScalingGroupRecommendationsResponse,
  ExportAutoScalingGroupRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      accountIds: 0,
      filters: D.list(i_Filter),
      fieldsToExport: 0,
      s3DestinationConfig: i_S3DestinationConfig,
      fileFormat: 0,
      includeMemberAccounts: 0,
      recommendationPreferences: i_RecommendationPreferences,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportAutoScalingGroupRecommendations",
})) as any;

export type ExportEBSVolumeRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Exports optimization recommendations for Amazon EBS volumes.
 *
 * Recommendations are exported in a comma-separated values (.csv) file, and its metadata
 * in a JavaScript Object Notation (JSON) (.json) file, to an existing Amazon Simple Storage Service (Amazon S3) bucket that you specify. For more information, see Exporting
 * Recommendations in the Compute Optimizer User
 * Guide.
 *
 * You can have only one Amazon EBS volume export job in progress per Amazon Web Services Region.
 */
export const exportEBSVolumeRecommendations: API.OperationMethod<
  ExportEBSVolumeRecommendationsRequest,
  ExportEBSVolumeRecommendationsResponse,
  ExportEBSVolumeRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      accountIds: 0,
      filters: D.list(i_EBSFilter),
      fieldsToExport: 0,
      s3DestinationConfig: i_S3DestinationConfig,
      fileFormat: 0,
      includeMemberAccounts: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportEBSVolumeRecommendations",
})) as any;

export type ExportEC2InstanceRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Exports optimization recommendations for Amazon EC2 instances.
 *
 * Recommendations are exported in a comma-separated values (.csv) file, and its metadata
 * in a JavaScript Object Notation (JSON) (.json) file, to an existing Amazon Simple Storage Service (Amazon S3) bucket that you specify. For more information, see Exporting
 * Recommendations in the Compute Optimizer User
 * Guide.
 *
 * You can have only one Amazon EC2 instance export job in progress per Amazon Web Services Region.
 */
export const exportEC2InstanceRecommendations: API.OperationMethod<
  ExportEC2InstanceRecommendationsRequest,
  ExportEC2InstanceRecommendationsResponse,
  ExportEC2InstanceRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      accountIds: 0,
      filters: D.list(i_Filter),
      fieldsToExport: 0,
      s3DestinationConfig: i_S3DestinationConfig,
      fileFormat: 0,
      includeMemberAccounts: 0,
      recommendationPreferences: i_RecommendationPreferences,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportEC2InstanceRecommendations",
})) as any;

export type ExportECSServiceRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Exports optimization recommendations for Amazon ECS services on Fargate.
 *
 * Recommendations are exported in a CSV file, and its metadata
 * in a JSON file, to an existing Amazon Simple Storage Service (Amazon S3) bucket that you specify. For more information, see Exporting
 * Recommendations in the Compute Optimizer User
 * Guide.
 *
 * You can only have one Amazon ECS service export job in progress per Amazon Web Services Region.
 */
export const exportECSServiceRecommendations: API.OperationMethod<
  ExportECSServiceRecommendationsRequest,
  ExportECSServiceRecommendationsResponse,
  ExportECSServiceRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      accountIds: 0,
      filters: D.list(i_ECSServiceRecommendationFilter),
      fieldsToExport: 0,
      s3DestinationConfig: i_S3DestinationConfig,
      fileFormat: 0,
      includeMemberAccounts: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportECSServiceRecommendations",
})) as any;

export type ExportIdleRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Export optimization recommendations for your idle resources.
 *
 * Recommendations are exported in a comma-separated values (CSV) file, and its metadata
 * in a JavaScript Object Notation (JSON) file, to an existing Amazon Simple Storage Service (Amazon S3) bucket that you specify. For more information, see Exporting
 * Recommendations in the Compute Optimizer User
 * Guide.
 *
 * You can have only one idle resource export job in progress per Amazon Web Services Region.
 */
export const exportIdleRecommendations: API.OperationMethod<
  ExportIdleRecommendationsRequest,
  ExportIdleRecommendationsResponse,
  ExportIdleRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      accountIds: 0,
      filters: D.list(i_IdleRecommendationFilter),
      fieldsToExport: 0,
      s3DestinationConfig: i_S3DestinationConfig,
      fileFormat: 0,
      includeMemberAccounts: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportIdleRecommendations",
})) as any;

export type ExportLambdaFunctionRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Exports optimization recommendations for Lambda functions.
 *
 * Recommendations are exported in a comma-separated values (.csv) file, and its metadata
 * in a JavaScript Object Notation (JSON) (.json) file, to an existing Amazon Simple Storage Service (Amazon S3) bucket that you specify. For more information, see Exporting
 * Recommendations in the Compute Optimizer User
 * Guide.
 *
 * You can have only one Lambda function export job in progress per Amazon Web Services Region.
 */
export const exportLambdaFunctionRecommendations: API.OperationMethod<
  ExportLambdaFunctionRecommendationsRequest,
  ExportLambdaFunctionRecommendationsResponse,
  ExportLambdaFunctionRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      accountIds: 0,
      filters: D.list(i_LambdaFunctionRecommendationFilter),
      fieldsToExport: 0,
      s3DestinationConfig: i_S3DestinationConfig,
      fileFormat: 0,
      includeMemberAccounts: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportLambdaFunctionRecommendations",
})) as any;

export type ExportLicenseRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Export optimization recommendations for your licenses.
 *
 * Recommendations are exported in a comma-separated values (CSV) file, and its metadata
 * in a JavaScript Object Notation (JSON) file, to an existing Amazon Simple Storage Service (Amazon S3) bucket that you specify. For more information, see Exporting
 * Recommendations in the Compute Optimizer User
 * Guide.
 *
 * You can have only one license export job in progress per Amazon Web Services Region.
 */
export const exportLicenseRecommendations: API.OperationMethod<
  ExportLicenseRecommendationsRequest,
  ExportLicenseRecommendationsResponse,
  ExportLicenseRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      accountIds: 0,
      filters: D.list(i_LicenseRecommendationFilter),
      fieldsToExport: 0,
      s3DestinationConfig: i_S3DestinationConfig,
      fileFormat: 0,
      includeMemberAccounts: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportLicenseRecommendations",
})) as any;

export type ExportRDSDatabaseRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Export optimization recommendations for your Amazon Aurora and Amazon Relational Database Service (Amazon RDS) databases.
 *
 * Recommendations are exported in a comma-separated values (CSV) file, and its metadata
 * in a JavaScript Object Notation (JSON) file, to an existing Amazon Simple Storage Service (Amazon S3) bucket that you specify. For more information, see Exporting
 * Recommendations in the Compute Optimizer User
 * Guide.
 *
 * You can have only one Amazon Aurora or RDS export job in progress per Amazon Web Services Region.
 */
export const exportRDSDatabaseRecommendations: API.OperationMethod<
  ExportRDSDatabaseRecommendationsRequest,
  ExportRDSDatabaseRecommendationsResponse,
  ExportRDSDatabaseRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      accountIds: 0,
      filters: D.list(i_RDSDBRecommendationFilter),
      fieldsToExport: 0,
      s3DestinationConfig: i_S3DestinationConfig,
      fileFormat: 0,
      includeMemberAccounts: 0,
      recommendationPreferences: i_RecommendationPreferences,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportRDSDatabaseRecommendations",
})) as any;

export type GetAutoScalingGroupRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns Auto Scaling group recommendations.
 *
 * Compute Optimizer generates recommendations for Amazon EC2 Auto Scaling groups that
 * meet a specific set of requirements. For more information, see the Supported
 * resources and requirements in the Compute Optimizer User
 * Guide.
 */
export const getAutoScalingGroupRecommendations: API.OperationMethod<
  GetAutoScalingGroupRecommendationsRequest,
  GetAutoScalingGroupRecommendationsResponse,
  GetAutoScalingGroupRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      accountIds: 0,
      autoScalingGroupArns: 0,
      nextToken: 0,
      maxResults: 0,
      filters: D.list(i_Filter),
      recommendationPreferences: i_RecommendationPreferences,
    },
    output: {
      autoScalingGroupRecommendations: D.list({ lastRefreshTimestamp: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutoScalingGroupRecommendations",
})) as any;

export type GetEBSVolumeRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns Amazon Elastic Block Store (Amazon EBS) volume recommendations.
 *
 * Compute Optimizer generates recommendations for Amazon EBS volumes that
 * meet a specific set of requirements. For more information, see the Supported
 * resources and requirements in the Compute Optimizer User
 * Guide.
 */
export const getEBSVolumeRecommendations: API.OperationMethod<
  GetEBSVolumeRecommendationsRequest,
  GetEBSVolumeRecommendationsResponse,
  GetEBSVolumeRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      volumeArns: 0,
      nextToken: 0,
      maxResults: 0,
      filters: D.list(i_EBSFilter),
      accountIds: 0,
    },
    output: { volumeRecommendations: D.list({ lastRefreshTimestamp: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEBSVolumeRecommendations",
})) as any;

export type GetEC2InstanceRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns Amazon EC2 instance recommendations.
 *
 * Compute Optimizer generates recommendations for Amazon Elastic Compute Cloud (Amazon EC2) instances that meet a specific set of requirements. For more
 * information, see the Supported resources and
 * requirements in the Compute Optimizer User
 * Guide.
 */
export const getEC2InstanceRecommendations: API.OperationMethod<
  GetEC2InstanceRecommendationsRequest,
  GetEC2InstanceRecommendationsResponse,
  GetEC2InstanceRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      instanceArns: 0,
      nextToken: 0,
      maxResults: 0,
      filters: D.list(i_Filter),
      accountIds: 0,
      recommendationPreferences: i_RecommendationPreferences,
    },
    output: { instanceRecommendations: D.list({ lastRefreshTimestamp: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEC2InstanceRecommendations",
})) as any;

export type GetEC2RecommendationProjectedMetricsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the projected utilization metrics of Amazon EC2 instance
 * recommendations.
 *
 * The `Cpu` and `Memory` metrics are the only projected
 * utilization metrics returned when you run this action. Additionally, the
 * `Memory` metric is returned only for resources that have the unified
 * CloudWatch agent installed on them. For more information, see Enabling Memory Utilization with the CloudWatch Agent.
 */
export const getEC2RecommendationProjectedMetrics: API.OperationMethod<
  GetEC2RecommendationProjectedMetricsRequest,
  GetEC2RecommendationProjectedMetricsResponse,
  GetEC2RecommendationProjectedMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      instanceArn: 0,
      stat: 0,
      period: 0,
      startTime: 0,
      endTime: 0,
      recommendationPreferences: i_RecommendationPreferences,
    },
    output: {
      recommendedOptionProjectedMetrics: D.list({
        projectedMetrics: D.list({ timestamps: D.list(D.ts) }),
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEC2RecommendationProjectedMetrics",
})) as any;

export type GetECSServiceRecommendationProjectedMetricsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the projected metrics of Amazon ECS service recommendations.
 */
export const getECSServiceRecommendationProjectedMetrics: API.OperationMethod<
  GetECSServiceRecommendationProjectedMetricsRequest,
  GetECSServiceRecommendationProjectedMetricsResponse,
  GetECSServiceRecommendationProjectedMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { serviceArn: 0, stat: 0, period: 0, startTime: 0, endTime: 0 },
    output: {
      recommendedOptionProjectedMetrics: D.list({
        projectedMetrics: D.list({ timestamps: D.list(D.ts) }),
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetECSServiceRecommendationProjectedMetrics",
})) as any;

export type GetECSServiceRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns Amazon ECS service recommendations.
 *
 * Compute Optimizer generates recommendations for Amazon ECS services on
 * Fargate that meet a specific set of requirements. For more
 * information, see the Supported resources and
 * requirements in the Compute Optimizer User
 * Guide.
 */
export const getECSServiceRecommendations: API.OperationMethod<
  GetECSServiceRecommendationsRequest,
  GetECSServiceRecommendationsResponse,
  GetECSServiceRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      serviceArns: 0,
      nextToken: 0,
      maxResults: 0,
      filters: D.list(i_ECSServiceRecommendationFilter),
      accountIds: 0,
    },
    output: {
      ecsServiceRecommendations: D.list({ lastRefreshTimestamp: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetECSServiceRecommendations",
})) as any;

export type GetEffectiveRecommendationPreferencesError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the recommendation preferences that are in effect for a given resource, such
 * as enhanced infrastructure metrics. Considers all applicable preferences that you might
 * have set at the resource, account, and organization level.
 *
 * When you create a recommendation preference, you can set its status to
 * `Active` or `Inactive`. Use this action to view the
 * recommendation preferences that are in effect, or `Active`.
 */
export const getEffectiveRecommendationPreferences: API.OperationMethod<
  GetEffectiveRecommendationPreferencesRequest,
  GetEffectiveRecommendationPreferencesResponse,
  GetEffectiveRecommendationPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEffectiveRecommendationPreferences",
})) as any;

export type GetEnrollmentStatusError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the enrollment (opt in) status of an account to the Compute Optimizer
 * service.
 *
 * If the account is the management account of an organization, this action also confirms
 * the enrollment status of member accounts of the organization. Use the GetEnrollmentStatusesForOrganization action to get detailed information
 * about the enrollment status of member accounts of an organization.
 */
export const getEnrollmentStatus: API.OperationMethod<
  GetEnrollmentStatusRequest,
  GetEnrollmentStatusResponse,
  GetEnrollmentStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {},
    output: { lastUpdatedTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnrollmentStatus",
})) as any;

export type GetEnrollmentStatusesForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the Compute Optimizer enrollment (opt-in) status of organization member
 * accounts, if your account is an organization management account.
 *
 * To get the enrollment status of standalone accounts, use the GetEnrollmentStatus action.
 */
export const getEnrollmentStatusesForOrganization: API.PaginatedOperationMethod<
  GetEnrollmentStatusesForOrganizationRequest,
  GetEnrollmentStatusesForOrganizationResponse,
  GetEnrollmentStatusesForOrganizationError,
  Credentials | HttpClient.HttpClient,
  AccountEnrollmentStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      filters: D.list({ name: 0, values: 0 }),
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      accountEnrollmentStatuses: D.list({ lastUpdatedTimestamp: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnrollmentStatusesForOrganization",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accountEnrollmentStatuses",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetIdleRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns idle resource recommendations. Compute Optimizer generates recommendations for
 * idle resources that meet a specific set of requirements. For more information, see
 * Resource requirements in the
 * *Compute Optimizer User Guide*
 */
export const getIdleRecommendations: API.OperationMethod<
  GetIdleRecommendationsRequest,
  GetIdleRecommendationsResponse,
  GetIdleRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      resourceArns: 0,
      nextToken: 0,
      maxResults: 0,
      filters: D.list(i_IdleRecommendationFilter),
      accountIds: 0,
      orderBy: { dimension: 0, order: 0 },
    },
    output: { idleRecommendations: D.list({ lastRefreshTimestamp: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdleRecommendations",
})) as any;

export type GetLambdaFunctionRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns Lambda function recommendations.
 *
 * Compute Optimizer generates recommendations for functions that meet a specific set
 * of requirements. For more information, see the Supported resources and
 * requirements in the Compute Optimizer User
 * Guide.
 */
export const getLambdaFunctionRecommendations: API.PaginatedOperationMethod<
  GetLambdaFunctionRecommendationsRequest,
  GetLambdaFunctionRecommendationsResponse,
  GetLambdaFunctionRecommendationsError,
  Credentials | HttpClient.HttpClient,
  LambdaFunctionRecommendation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      functionArns: 0,
      accountIds: 0,
      filters: D.list(i_LambdaFunctionRecommendationFilter),
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      lambdaFunctionRecommendations: D.list({ lastRefreshTimestamp: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLambdaFunctionRecommendations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "lambdaFunctionRecommendations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetLicenseRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns license recommendations for Amazon EC2 instances that run on a specific license.
 *
 * Compute Optimizer generates recommendations for licenses that meet a specific set of requirements. For more
 * information, see the Supported resources and
 * requirements in the Compute Optimizer User
 * Guide.
 */
export const getLicenseRecommendations: API.OperationMethod<
  GetLicenseRecommendationsRequest,
  GetLicenseRecommendationsResponse,
  GetLicenseRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      resourceArns: 0,
      nextToken: 0,
      maxResults: 0,
      filters: D.list(i_LicenseRecommendationFilter),
      accountIds: 0,
    },
    output: { licenseRecommendations: D.list({ lastRefreshTimestamp: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLicenseRecommendations",
})) as any;

export type GetRDSDatabaseRecommendationProjectedMetricsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the projected metrics of Aurora and RDS database recommendations.
 */
export const getRDSDatabaseRecommendationProjectedMetrics: API.OperationMethod<
  GetRDSDatabaseRecommendationProjectedMetricsRequest,
  GetRDSDatabaseRecommendationProjectedMetricsResponse,
  GetRDSDatabaseRecommendationProjectedMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      resourceArn: 0,
      stat: 0,
      period: 0,
      startTime: 0,
      endTime: 0,
      recommendationPreferences: i_RecommendationPreferences,
    },
    output: {
      recommendedOptionProjectedMetrics: D.list({
        projectedMetrics: D.list({ timestamps: D.list(D.ts) }),
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRDSDatabaseRecommendationProjectedMetrics",
})) as any;

export type GetRDSDatabaseRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns Amazon Aurora and RDS database recommendations.
 *
 * Compute Optimizer generates recommendations for Amazon Aurora and RDS databases that
 * meet a specific set of requirements. For more
 * information, see the Supported resources and
 * requirements in the Compute Optimizer User
 * Guide.
 */
export const getRDSDatabaseRecommendations: API.OperationMethod<
  GetRDSDatabaseRecommendationsRequest,
  GetRDSDatabaseRecommendationsResponse,
  GetRDSDatabaseRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      resourceArns: 0,
      nextToken: 0,
      maxResults: 0,
      filters: D.list(i_RDSDBRecommendationFilter),
      accountIds: 0,
      recommendationPreferences: i_RecommendationPreferences,
    },
    output: { rdsDBRecommendations: D.list({ lastRefreshTimestamp: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRDSDatabaseRecommendations",
})) as any;

export type GetRecommendationPreferencesError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns existing recommendation preferences, such as enhanced infrastructure
 * metrics.
 *
 * Use the `scope` parameter to specify which preferences to return. You can
 * specify to return preferences for an organization, a specific account ID, or a specific
 * EC2 instance or Auto Scaling group Amazon Resource Name (ARN).
 *
 * For more information, see Activating
 * enhanced infrastructure metrics in the Compute Optimizer User
 * Guide.
 */
export const getRecommendationPreferences: API.PaginatedOperationMethod<
  GetRecommendationPreferencesRequest,
  GetRecommendationPreferencesResponse,
  GetRecommendationPreferencesError,
  Credentials | HttpClient.HttpClient,
  RecommendationPreferencesDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { resourceType: 0, scope: i_Scope, nextToken: 0, maxResults: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendationPreferences",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommendationPreferencesDetails",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetRecommendationSummariesError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the optimization findings for an account.
 *
 * It returns the number of:
 *
 * - Amazon EC2 instances in an account that are
 * `Underprovisioned`, `Overprovisioned`, or
 * `Optimized`.
 *
 * - EC2Auto Scaling groups in an account that are `NotOptimized`, or
 * `Optimized`.
 *
 * - Amazon EBS volumes in an account that are `NotOptimized`,
 * or `Optimized`.
 *
 * - Lambda functions in an account that are `NotOptimized`,
 * or `Optimized`.
 *
 * - Amazon ECS services in an account that are `Underprovisioned`,
 * `Overprovisioned`, or `Optimized`.
 *
 * - Commercial software licenses in an account that are `InsufficientMetrics`,
 * `NotOptimized` or `Optimized`.
 *
 * - Amazon Aurora and Amazon RDS databases in an account that are `Underprovisioned`,
 * `Overprovisioned`, `Optimized`, or `NotOptimized`.
 */
export const getRecommendationSummaries: API.PaginatedOperationMethod<
  GetRecommendationSummariesRequest,
  GetRecommendationSummariesResponse,
  GetRecommendationSummariesError,
  Credentials | HttpClient.HttpClient,
  RecommendationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { accountIds: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendationSummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommendationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutRecommendationPreferencesError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new recommendation preference or updates an existing recommendation
 * preference, such as enhanced infrastructure metrics.
 *
 * For more information, see Activating
 * enhanced infrastructure metrics in the Compute Optimizer User
 * Guide.
 */
export const putRecommendationPreferences: API.OperationMethod<
  PutRecommendationPreferencesRequest,
  PutRecommendationPreferencesResponse,
  PutRecommendationPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      resourceType: 0,
      scope: i_Scope,
      enhancedInfrastructureMetrics: 0,
      inferredWorkloadTypes: 0,
      externalMetricsPreference: { source: 0 },
      lookBackPeriod: 0,
      utilizationPreferences: D.list({
        metricName: 0,
        metricParameters: { threshold: 0, headroom: 0 },
      }),
      preferredResources: D.list({ name: 0, includeList: 0, excludeList: 0 }),
      savingsEstimationMode: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterValueException,
    MissingAuthenticationToken,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRecommendationPreferences",
})) as any;

export type UpdateEnrollmentStatusError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterValueException
  | MissingAuthenticationToken
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the enrollment (opt in and opt out) status of an account to the Compute Optimizer service.
 *
 * If the account is a management account of an organization, this action can also be
 * used to enroll member accounts of the organization.
 *
 * You must have the appropriate permissions to opt in to Compute Optimizer, to view its
 * recommendations, and to opt out. For more information, see Controlling access with Amazon Web Services Identity and Access Management in the *Compute Optimizer User Guide*.
 *
 * When you opt in, Compute Optimizer automatically creates a service-linked role in your
 * account to access its data. For more information, see Using
 * Service-Linked Roles for Compute Optimizer in the *Compute Optimizer User Guide*.
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
    InvalidParameterValueException,
    MissingAuthenticationToken,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnrollmentStatus",
})) as any;

const i_EBSFilter: D.LazyStruct = () => ({ name: 0, values: 0 });
const i_ECSServiceRecommendationFilter: D.LazyStruct = () => ({
  name: 0,
  values: 0,
});
const i_Filter: D.LazyStruct = () => ({ name: 0, values: 0 });
const i_IdleRecommendationFilter: D.LazyStruct = () => ({ name: 0, values: 0 });
const i_LambdaFunctionRecommendationFilter: D.LazyStruct = () => ({
  name: 0,
  values: 0,
});
const i_LicenseRecommendationFilter: D.LazyStruct = () => ({
  name: 0,
  values: 0,
});
const i_RDSDBRecommendationFilter: D.LazyStruct = () => ({
  name: 0,
  values: 0,
});
const i_RecommendationPreferences: D.LazyStruct = () => ({
  cpuVendorArchitectures: 0,
});
const i_S3DestinationConfig: D.LazyStruct = () => ({ bucket: 0, keyPrefix: 0 });
const i_Scope: D.LazyStruct = () => ({ name: 0, value: 0 });
