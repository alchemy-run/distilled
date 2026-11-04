import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
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
  sdkId: "Compute Optimizer",
  serviceShapeName: "ComputeOptimizerService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "compute-optimizer" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-11-01");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://compute-optimizer.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://compute-optimizer.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://compute-optimizer.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "ComputeOptimizer",
  service: "ComputeOptimizer",
  templates: false,
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MissingAuthenticationToken
  extends /*@__PURE__*/ S.TaggedError<MissingAuthenticationToken>()(
    "MissingAuthenticationToken",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class OptInRequiredException
  extends /*@__PURE__*/ S.TaggedError<OptInRequiredException>()(
    "OptInRequiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
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
export type ScopeName = "Organization" | "AccountId" | "ResourceArn" | (string & {});
export type ScopeValue = string;
export interface Scope {
  name?: ScopeName | undefined;
  value?: string | undefined;
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
  scope?: Scope | undefined;
  recommendationPreferenceNames: RecommendationPreferenceName[];
}
export interface DeleteRecommendationPreferencesResponse {}
export type JobId = string;
export type JobIds = string[];
export type JobFilterName = "ResourceType" | "JobStatus" | (string & {});
export type FilterValue = string;
export type FilterValues = string[];
export interface JobFilter {
  name?: JobFilterName | undefined;
  values?: string[] | undefined;
}
export type JobFilters = JobFilter[];
export type NextToken = string;
export type MaxResults = number;
export interface DescribeRecommendationExportJobsRequest {
  jobIds?: string[] | undefined;
  filters?: JobFilter[] | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export type DestinationBucket = string;
export type DestinationKey = string;
export type MetadataKey = string;
export interface S3Destination {
  bucket?: string | undefined;
  key?: string | undefined;
  metadataKey?: string | undefined;
}
export interface ExportDestination {
  s3?: S3Destination | undefined;
}
export type JobStatus = "Queued" | "InProgress" | "Complete" | "Failed" | (string & {});
export type CreationTimestamp = Date;
export type LastUpdatedTimestamp = Date;
export type FailureReason = string;
export interface RecommendationExportJob {
  jobId?: string | undefined;
  destination?: ExportDestination | undefined;
  resourceType?: ResourceType | undefined;
  status?: JobStatus | undefined;
  creationTimestamp?: Date | undefined;
  lastUpdatedTimestamp?: Date | undefined;
  failureReason?: string | undefined;
}
export type RecommendationExportJobs = RecommendationExportJob[];
export interface DescribeRecommendationExportJobsResponse {
  recommendationExportJobs?: RecommendationExportJob[] | undefined;
  nextToken?: string | undefined;
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
  name?: FilterName | undefined;
  values?: string[] | undefined;
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
export type ExportableAutoScalingGroupFields = ExportableAutoScalingGroupField[];
export type DestinationKeyPrefix = string;
export interface S3DestinationConfig {
  bucket?: string | undefined;
  keyPrefix?: string | undefined;
}
export type FileFormat = "Csv" | (string & {});
export type IncludeMemberAccounts = boolean;
export type CpuVendorArchitecture = "AWS_ARM64" | "CURRENT" | (string & {});
export type CpuVendorArchitectures = CpuVendorArchitecture[];
export interface RecommendationPreferences {
  cpuVendorArchitectures?: CpuVendorArchitecture[] | undefined;
}
export interface ExportAutoScalingGroupRecommendationsRequest {
  accountIds?: string[] | undefined;
  filters?: Filter[] | undefined;
  fieldsToExport?: ExportableAutoScalingGroupField[] | undefined;
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat | undefined;
  includeMemberAccounts?: boolean | undefined;
  recommendationPreferences?: RecommendationPreferences | undefined;
}
export interface ExportAutoScalingGroupRecommendationsResponse {
  jobId?: string | undefined;
  s3Destination?: S3Destination | undefined;
}
export type EBSFilterName = "Finding" | (string & {});
export interface EBSFilter {
  name?: EBSFilterName | undefined;
  values?: string[] | undefined;
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
  accountIds?: string[] | undefined;
  filters?: EBSFilter[] | undefined;
  fieldsToExport?: ExportableVolumeField[] | undefined;
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat | undefined;
  includeMemberAccounts?: boolean | undefined;
}
export interface ExportEBSVolumeRecommendationsResponse {
  jobId?: string | undefined;
  s3Destination?: S3Destination | undefined;
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
  accountIds?: string[] | undefined;
  filters?: Filter[] | undefined;
  fieldsToExport?: ExportableInstanceField[] | undefined;
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat | undefined;
  includeMemberAccounts?: boolean | undefined;
  recommendationPreferences?: RecommendationPreferences | undefined;
}
export interface ExportEC2InstanceRecommendationsResponse {
  jobId?: string | undefined;
  s3Destination?: S3Destination | undefined;
}
export type ECSServiceRecommendationFilterName = "Finding" | "FindingReasonCode" | (string & {});
export interface ECSServiceRecommendationFilter {
  name?: ECSServiceRecommendationFilterName | undefined;
  values?: string[] | undefined;
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
  accountIds?: string[] | undefined;
  filters?: ECSServiceRecommendationFilter[] | undefined;
  fieldsToExport?: ExportableECSServiceField[] | undefined;
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat | undefined;
  includeMemberAccounts?: boolean | undefined;
}
export interface ExportECSServiceRecommendationsResponse {
  jobId?: string | undefined;
  s3Destination?: S3Destination | undefined;
}
export type IdleRecommendationFilterName = "Finding" | "ResourceType" | (string & {});
export interface IdleRecommendationFilter {
  name?: IdleRecommendationFilterName | undefined;
  values?: string[] | undefined;
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
  accountIds?: string[] | undefined;
  filters?: IdleRecommendationFilter[] | undefined;
  fieldsToExport?: ExportableIdleField[] | undefined;
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat | undefined;
  includeMemberAccounts?: boolean | undefined;
}
export interface ExportIdleRecommendationsResponse {
  jobId?: string | undefined;
  s3Destination?: S3Destination | undefined;
}
export type LambdaFunctionRecommendationFilterName =
  | "Finding"
  | "FindingReasonCode"
  | (string & {});
export interface LambdaFunctionRecommendationFilter {
  name?: LambdaFunctionRecommendationFilterName | undefined;
  values?: string[] | undefined;
}
export type LambdaFunctionRecommendationFilters = LambdaFunctionRecommendationFilter[];
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
  accountIds?: string[] | undefined;
  filters?: LambdaFunctionRecommendationFilter[] | undefined;
  fieldsToExport?: ExportableLambdaFunctionField[] | undefined;
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat | undefined;
  includeMemberAccounts?: boolean | undefined;
}
export interface ExportLambdaFunctionRecommendationsResponse {
  jobId?: string | undefined;
  s3Destination?: S3Destination | undefined;
}
export type LicenseRecommendationFilterName =
  | "Finding"
  | "FindingReasonCode"
  | "LicenseName"
  | (string & {});
export interface LicenseRecommendationFilter {
  name?: LicenseRecommendationFilterName | undefined;
  values?: string[] | undefined;
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
  accountIds?: string[] | undefined;
  filters?: LicenseRecommendationFilter[] | undefined;
  fieldsToExport?: ExportableLicenseField[] | undefined;
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat | undefined;
  includeMemberAccounts?: boolean | undefined;
}
export interface ExportLicenseRecommendationsResponse {
  jobId?: string | undefined;
  s3Destination?: S3Destination | undefined;
}
export type RDSDBRecommendationFilterName =
  | "InstanceFinding"
  | "InstanceFindingReasonCode"
  | "StorageFinding"
  | "StorageFindingReasonCode"
  | "Idle"
  | (string & {});
export interface RDSDBRecommendationFilter {
  name?: RDSDBRecommendationFilterName | undefined;
  values?: string[] | undefined;
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
  accountIds?: string[] | undefined;
  filters?: RDSDBRecommendationFilter[] | undefined;
  fieldsToExport?: ExportableRDSDBField[] | undefined;
  s3DestinationConfig: S3DestinationConfig;
  fileFormat?: FileFormat | undefined;
  includeMemberAccounts?: boolean | undefined;
  recommendationPreferences?: RecommendationPreferences | undefined;
}
export interface ExportRDSDatabaseRecommendationsResponse {
  jobId?: string | undefined;
  s3Destination?: S3Destination | undefined;
}
export type AutoScalingGroupArn = string;
export type AutoScalingGroupArns = string[];
export interface GetAutoScalingGroupRecommendationsRequest {
  accountIds?: string[] | undefined;
  autoScalingGroupArns?: string[] | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
  filters?: Filter[] | undefined;
  recommendationPreferences?: RecommendationPreferences | undefined;
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
  name?: MetricName | undefined;
  statistic?: MetricStatistic | undefined;
  value?: number | undefined;
}
export type UtilizationMetrics = UtilizationMetric[];
export type LookBackPeriodInDays = number;
export type DesiredCapacity = number;
export type MinSize = number;
export type MaxSize = number;
export type NullableInstanceType = string;
export type AllocationStrategy = "Prioritized" | "LowestPrice" | (string & {});
export type NullableEstimatedInstanceHourReductionPercentage = number;
export type AsgType = "SingleInstanceType" | "MixedInstanceTypes" | (string & {});
export type MixedInstanceType = string;
export type MixedInstanceTypes = string[];
export interface AutoScalingGroupConfiguration {
  desiredCapacity?: number | undefined;
  minSize?: number | undefined;
  maxSize?: number | undefined;
  instanceType?: string | undefined;
  allocationStrategy?: AllocationStrategy | undefined;
  estimatedInstanceHourReductionPercentage?: number | undefined;
  type?: AsgType | undefined;
  mixedInstanceTypes?: string[] | undefined;
}
export type GpuCount = number;
export type GpuMemorySizeInMiB = number;
export interface Gpu {
  gpuCount?: number | undefined;
  gpuMemorySizeInMiB?: number | undefined;
}
export type Gpus = Gpu[];
export interface GpuInfo {
  gpus?: Gpu[] | undefined;
}
export type ProjectedUtilizationMetrics = UtilizationMetric[];
export type PerformanceRisk = number;
export type Rank = number;
export type SavingsOpportunityPercentage = number;
export type Currency = "USD" | "CNY" | (string & {});
export type Value = number;
export interface EstimatedMonthlySavings {
  currency?: Currency | undefined;
  value?: number | undefined;
}
export interface SavingsOpportunity {
  savingsOpportunityPercentage?: number | undefined;
  estimatedMonthlySavings?: EstimatedMonthlySavings | undefined;
}
export interface AutoScalingGroupEstimatedMonthlySavings {
  currency?: Currency | undefined;
  value?: number | undefined;
}
export interface AutoScalingGroupSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number | undefined;
  estimatedMonthlySavings?: AutoScalingGroupEstimatedMonthlySavings | undefined;
}
export type MigrationEffort = "VeryLow" | "Low" | "Medium" | "High" | (string & {});
export interface AutoScalingGroupRecommendationOption {
  configuration?: AutoScalingGroupConfiguration | undefined;
  instanceGpuInfo?: GpuInfo | undefined;
  projectedUtilizationMetrics?: UtilizationMetric[] | undefined;
  performanceRisk?: number | undefined;
  rank?: number | undefined;
  savingsOpportunity?: SavingsOpportunity | undefined;
  savingsOpportunityAfterDiscounts?: AutoScalingGroupSavingsOpportunityAfterDiscounts | undefined;
  migrationEffort?: MigrationEffort | undefined;
}
export type AutoScalingGroupRecommendationOptions = AutoScalingGroupRecommendationOption[];
export type LastRefreshTimestamp = Date;
export type CurrentPerformanceRisk = "VeryLow" | "Low" | "Medium" | "High" | (string & {});
export type EnhancedInfrastructureMetrics = "Active" | "Inactive" | (string & {});
export type InferredWorkloadTypesPreference = "Active" | "Inactive" | (string & {});
export type ExternalMetricsSource =
  | "Datadog"
  | "Dynatrace"
  | "NewRelic"
  | "Instana"
  | (string & {});
export interface ExternalMetricsPreference {
  source?: ExternalMetricsSource | undefined;
}
export type LookBackPeriodPreference = "DAYS_14" | "DAYS_32" | "DAYS_93" | (string & {});
export type CustomizableMetricName = "CpuUtilization" | "MemoryUtilization" | (string & {});
export type CustomizableMetricThreshold = "P90" | "P95" | "P99_5" | (string & {});
export type CustomizableMetricHeadroom =
  | "PERCENT_30"
  | "PERCENT_20"
  | "PERCENT_10"
  | "PERCENT_0"
  | (string & {});
export interface CustomizableMetricParameters {
  threshold?: CustomizableMetricThreshold | undefined;
  headroom?: CustomizableMetricHeadroom | undefined;
}
export interface UtilizationPreference {
  metricName?: CustomizableMetricName | undefined;
  metricParameters?: CustomizableMetricParameters | undefined;
}
export type UtilizationPreferences = UtilizationPreference[];
export type PreferredResourceName = "Ec2InstanceTypes" | (string & {});
export type PreferredResourceValue = string;
export type PreferredResourceValues = string[];
export interface EffectivePreferredResource {
  name?: PreferredResourceName | undefined;
  includeList?: string[] | undefined;
  effectiveIncludeList?: string[] | undefined;
  excludeList?: string[] | undefined;
}
export type EffectivePreferredResources = EffectivePreferredResource[];
export type InstanceSavingsEstimationModeSource =
  | "PublicPricing"
  | "CostExplorerRightsizing"
  | "CostOptimizationHub"
  | (string & {});
export interface InstanceSavingsEstimationMode {
  source?: InstanceSavingsEstimationModeSource | undefined;
}
export interface EffectiveRecommendationPreferences {
  cpuVendorArchitectures?: CpuVendorArchitecture[] | undefined;
  enhancedInfrastructureMetrics?: EnhancedInfrastructureMetrics | undefined;
  inferredWorkloadTypes?: InferredWorkloadTypesPreference | undefined;
  externalMetricsPreference?: ExternalMetricsPreference | undefined;
  lookBackPeriod?: LookBackPeriodPreference | undefined;
  utilizationPreferences?: UtilizationPreference[] | undefined;
  preferredResources?: EffectivePreferredResource[] | undefined;
  savingsEstimationMode?: InstanceSavingsEstimationMode | undefined;
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
  accountId?: string | undefined;
  autoScalingGroupArn?: string | undefined;
  autoScalingGroupName?: string | undefined;
  finding?: Finding | undefined;
  utilizationMetrics?: UtilizationMetric[] | undefined;
  lookBackPeriodInDays?: number | undefined;
  currentConfiguration?: AutoScalingGroupConfiguration | undefined;
  currentInstanceGpuInfo?: GpuInfo | undefined;
  recommendationOptions?: AutoScalingGroupRecommendationOption[] | undefined;
  lastRefreshTimestamp?: Date | undefined;
  currentPerformanceRisk?: CurrentPerformanceRisk | undefined;
  effectiveRecommendationPreferences?: EffectiveRecommendationPreferences | undefined;
  inferredWorkloadTypes?: InferredWorkloadType[] | undefined;
}
export type AutoScalingGroupRecommendations = AutoScalingGroupRecommendation[];
export type Identifier = string;
export type Code = string;
export type Message = string;
export interface GetRecommendationError {
  identifier?: string | undefined;
  code?: string | undefined;
  message?: string | undefined;
}
export type GetRecommendationErrors = GetRecommendationError[];
export interface GetAutoScalingGroupRecommendationsResponse {
  nextToken?: string | undefined;
  autoScalingGroupRecommendations?: AutoScalingGroupRecommendation[] | undefined;
  errors?: GetRecommendationError[] | undefined;
}
export type VolumeArn = string;
export type VolumeArns = string[];
export interface GetEBSVolumeRecommendationsRequest {
  volumeArns?: string[] | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
  filters?: EBSFilter[] | undefined;
  accountIds?: string[] | undefined;
}
export type VolumeType = string;
export type VolumeSize = number;
export type VolumeBaselineIOPS = number;
export type VolumeBurstIOPS = number;
export type VolumeBaselineThroughput = number;
export type VolumeBurstThroughput = number;
export type RootVolume = boolean;
export interface VolumeConfiguration {
  volumeType?: string | undefined;
  volumeSize?: number | undefined;
  volumeBaselineIOPS?: number | undefined;
  volumeBurstIOPS?: number | undefined;
  volumeBaselineThroughput?: number | undefined;
  volumeBurstThroughput?: number | undefined;
  rootVolume?: boolean | undefined;
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
  name?: EBSMetricName | undefined;
  statistic?: MetricStatistic | undefined;
  value?: number | undefined;
}
export type EBSUtilizationMetrics = EBSUtilizationMetric[];
export interface EBSEstimatedMonthlySavings {
  currency?: Currency | undefined;
  value?: number | undefined;
}
export interface EBSSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number | undefined;
  estimatedMonthlySavings?: EBSEstimatedMonthlySavings | undefined;
}
export interface VolumeRecommendationOption {
  configuration?: VolumeConfiguration | undefined;
  performanceRisk?: number | undefined;
  rank?: number | undefined;
  savingsOpportunity?: SavingsOpportunity | undefined;
  savingsOpportunityAfterDiscounts?: EBSSavingsOpportunityAfterDiscounts | undefined;
}
export type VolumeRecommendationOptions = VolumeRecommendationOption[];
export type EBSSavingsEstimationModeSource =
  | "PublicPricing"
  | "CostExplorerRightsizing"
  | "CostOptimizationHub"
  | (string & {});
export interface EBSSavingsEstimationMode {
  source?: EBSSavingsEstimationModeSource | undefined;
}
export interface EBSEffectiveRecommendationPreferences {
  savingsEstimationMode?: EBSSavingsEstimationMode | undefined;
  lookBackPeriod?: LookBackPeriodPreference | undefined;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key?: string | undefined;
  value?: string | undefined;
}
export type Tags = Tag[];
export interface VolumeRecommendation {
  volumeArn?: string | undefined;
  accountId?: string | undefined;
  currentConfiguration?: VolumeConfiguration | undefined;
  finding?: EBSFinding | undefined;
  utilizationMetrics?: EBSUtilizationMetric[] | undefined;
  lookBackPeriodInDays?: number | undefined;
  volumeRecommendationOptions?: VolumeRecommendationOption[] | undefined;
  lastRefreshTimestamp?: Date | undefined;
  currentPerformanceRisk?: CurrentPerformanceRisk | undefined;
  effectiveRecommendationPreferences?: EBSEffectiveRecommendationPreferences | undefined;
  tags?: Tag[] | undefined;
}
export type VolumeRecommendations = VolumeRecommendation[];
export interface GetEBSVolumeRecommendationsResponse {
  nextToken?: string | undefined;
  volumeRecommendations?: VolumeRecommendation[] | undefined;
  errors?: GetRecommendationError[] | undefined;
}
export type InstanceArn = string;
export type InstanceArns = string[];
export interface GetEC2InstanceRecommendationsRequest {
  instanceArns?: string[] | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
  filters?: Filter[] | undefined;
  accountIds?: string[] | undefined;
  recommendationPreferences?: RecommendationPreferences | undefined;
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
export type InstanceRecommendationFindingReasonCodes = InstanceRecommendationFindingReasonCode[];
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
  currency?: Currency | undefined;
  value?: number | undefined;
}
export interface InstanceSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number | undefined;
  estimatedMonthlySavings?: InstanceEstimatedMonthlySavings | undefined;
}
export interface InstanceRecommendationOption {
  instanceType?: string | undefined;
  instanceGpuInfo?: GpuInfo | undefined;
  projectedUtilizationMetrics?: UtilizationMetric[] | undefined;
  platformDifferences?: PlatformDifference[] | undefined;
  performanceRisk?: number | undefined;
  rank?: number | undefined;
  savingsOpportunity?: SavingsOpportunity | undefined;
  savingsOpportunityAfterDiscounts?: InstanceSavingsOpportunityAfterDiscounts | undefined;
  migrationEffort?: MigrationEffort | undefined;
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
  recommendationSourceArn?: string | undefined;
  recommendationSourceType?: RecommendationSourceType | undefined;
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
  statusCode?: ExternalMetricStatusCode | undefined;
  statusReason?: string | undefined;
}
export type InstanceIdle = "True" | "False" | (string & {});
export interface InstanceRecommendation {
  instanceArn?: string | undefined;
  accountId?: string | undefined;
  instanceName?: string | undefined;
  currentInstanceType?: string | undefined;
  finding?: Finding | undefined;
  findingReasonCodes?: InstanceRecommendationFindingReasonCode[] | undefined;
  utilizationMetrics?: UtilizationMetric[] | undefined;
  lookBackPeriodInDays?: number | undefined;
  recommendationOptions?: InstanceRecommendationOption[] | undefined;
  recommendationSources?: RecommendationSource[] | undefined;
  lastRefreshTimestamp?: Date | undefined;
  currentPerformanceRisk?: CurrentPerformanceRisk | undefined;
  effectiveRecommendationPreferences?: EffectiveRecommendationPreferences | undefined;
  inferredWorkloadTypes?: InferredWorkloadType[] | undefined;
  instanceState?: InstanceState | undefined;
  tags?: Tag[] | undefined;
  externalMetricStatus?: ExternalMetricStatus | undefined;
  currentInstanceGpuInfo?: GpuInfo | undefined;
  idle?: InstanceIdle | undefined;
}
export type InstanceRecommendations = InstanceRecommendation[];
export interface GetEC2InstanceRecommendationsResponse {
  nextToken?: string | undefined;
  instanceRecommendations?: InstanceRecommendation[] | undefined;
  errors?: GetRecommendationError[] | undefined;
}
export type Period = number;
export interface GetEC2RecommendationProjectedMetricsRequest {
  instanceArn: string;
  stat: MetricStatistic;
  period: number;
  startTime: Date;
  endTime: Date;
  recommendationPreferences?: RecommendationPreferences | undefined;
}
export type RecommendedInstanceType = string;
export type Timestamps = Date[];
export type MetricValues = number[];
export interface ProjectedMetric {
  name?: MetricName | undefined;
  timestamps?: Date[] | undefined;
  values?: number[] | undefined;
}
export type ProjectedMetrics = ProjectedMetric[];
export interface RecommendedOptionProjectedMetric {
  recommendedInstanceType?: string | undefined;
  rank?: number | undefined;
  projectedMetrics?: ProjectedMetric[] | undefined;
}
export type RecommendedOptionProjectedMetrics = RecommendedOptionProjectedMetric[];
export interface GetEC2RecommendationProjectedMetricsResponse {
  recommendedOptionProjectedMetrics?: RecommendedOptionProjectedMetric[] | undefined;
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
  name?: ECSServiceMetricName | undefined;
  timestamps?: Date[] | undefined;
  upperBoundValues?: number[] | undefined;
  lowerBoundValues?: number[] | undefined;
}
export type ECSServiceProjectedMetrics = ECSServiceProjectedMetric[];
export interface ECSServiceRecommendedOptionProjectedMetric {
  recommendedCpuUnits?: number | undefined;
  recommendedMemorySize?: number | undefined;
  projectedMetrics?: ECSServiceProjectedMetric[] | undefined;
}
export type ECSServiceRecommendedOptionProjectedMetrics =
  ECSServiceRecommendedOptionProjectedMetric[];
export interface GetECSServiceRecommendationProjectedMetricsResponse {
  recommendedOptionProjectedMetrics?: ECSServiceRecommendedOptionProjectedMetric[] | undefined;
}
export type ServiceArns = string[];
export interface GetECSServiceRecommendationsRequest {
  serviceArns?: string[] | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
  filters?: ECSServiceRecommendationFilter[] | undefined;
  accountIds?: string[] | undefined;
}
export type NullableMemory = number;
export type NullableCpu = number;
export type ContainerName = string;
export type NullableMemoryReservation = number;
export interface MemorySizeConfiguration {
  memory?: number | undefined;
  memoryReservation?: number | undefined;
}
export interface ContainerConfiguration {
  containerName?: string | undefined;
  memorySizeConfiguration?: MemorySizeConfiguration | undefined;
  cpu?: number | undefined;
}
export type ContainerConfigurations = ContainerConfiguration[];
export type AutoScalingConfiguration =
  | "TargetTrackingScalingCpu"
  | "TargetTrackingScalingMemory"
  | (string & {});
export type TaskDefinitionArn = string;
export interface ServiceConfiguration {
  memory?: number | undefined;
  cpu?: number | undefined;
  containerConfigurations?: ContainerConfiguration[] | undefined;
  autoScalingConfiguration?: AutoScalingConfiguration | undefined;
  taskDefinitionArn?: string | undefined;
}
export type ECSServiceMetricStatistic = "Maximum" | "Average" | (string & {});
export interface ECSServiceUtilizationMetric {
  name?: ECSServiceMetricName | undefined;
  statistic?: ECSServiceMetricStatistic | undefined;
  value?: number | undefined;
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
  currency?: Currency | undefined;
  value?: number | undefined;
}
export interface ECSSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number | undefined;
  estimatedMonthlySavings?: ECSEstimatedMonthlySavings | undefined;
}
export type LowerBoundValue = number;
export type UpperBoundValue = number;
export interface ECSServiceProjectedUtilizationMetric {
  name?: ECSServiceMetricName | undefined;
  statistic?: ECSServiceMetricStatistic | undefined;
  lowerBoundValue?: number | undefined;
  upperBoundValue?: number | undefined;
}
export type ECSServiceProjectedUtilizationMetrics = ECSServiceProjectedUtilizationMetric[];
export interface ContainerRecommendation {
  containerName?: string | undefined;
  memorySizeConfiguration?: MemorySizeConfiguration | undefined;
  cpu?: number | undefined;
}
export type ContainerRecommendations = ContainerRecommendation[];
export interface ECSServiceRecommendationOption {
  memory?: number | undefined;
  cpu?: number | undefined;
  savingsOpportunity?: SavingsOpportunity | undefined;
  savingsOpportunityAfterDiscounts?: ECSSavingsOpportunityAfterDiscounts | undefined;
  projectedUtilizationMetrics?: ECSServiceProjectedUtilizationMetric[] | undefined;
  containerRecommendations?: ContainerRecommendation[] | undefined;
}
export type ECSServiceRecommendationOptions = ECSServiceRecommendationOption[];
export type ECSSavingsEstimationModeSource =
  | "PublicPricing"
  | "CostExplorerRightsizing"
  | "CostOptimizationHub"
  | (string & {});
export interface ECSSavingsEstimationMode {
  source?: ECSSavingsEstimationModeSource | undefined;
}
export interface ECSEffectiveRecommendationPreferences {
  savingsEstimationMode?: ECSSavingsEstimationMode | undefined;
  lookBackPeriod?: LookBackPeriodPreference | undefined;
}
export interface ECSServiceRecommendation {
  serviceArn?: string | undefined;
  accountId?: string | undefined;
  currentServiceConfiguration?: ServiceConfiguration | undefined;
  utilizationMetrics?: ECSServiceUtilizationMetric[] | undefined;
  lookbackPeriodInDays?: number | undefined;
  launchType?: ECSServiceLaunchType | undefined;
  lastRefreshTimestamp?: Date | undefined;
  finding?: ECSServiceRecommendationFinding | undefined;
  findingReasonCodes?: ECSServiceRecommendationFindingReasonCode[] | undefined;
  serviceRecommendationOptions?: ECSServiceRecommendationOption[] | undefined;
  currentPerformanceRisk?: CurrentPerformanceRisk | undefined;
  effectiveRecommendationPreferences?: ECSEffectiveRecommendationPreferences | undefined;
  tags?: Tag[] | undefined;
}
export type ECSServiceRecommendations = ECSServiceRecommendation[];
export interface GetECSServiceRecommendationsResponse {
  nextToken?: string | undefined;
  ecsServiceRecommendations?: ECSServiceRecommendation[] | undefined;
  errors?: GetRecommendationError[] | undefined;
}
export type ResourceArn = string;
export interface GetEffectiveRecommendationPreferencesRequest {
  resourceArn: string;
}
export interface GetEffectiveRecommendationPreferencesResponse {
  enhancedInfrastructureMetrics?: EnhancedInfrastructureMetrics | undefined;
  externalMetricsPreference?: ExternalMetricsPreference | undefined;
  lookBackPeriod?: LookBackPeriodPreference | undefined;
  utilizationPreferences?: UtilizationPreference[] | undefined;
  preferredResources?: EffectivePreferredResource[] | undefined;
}
export interface GetEnrollmentStatusRequest {}
export type Status = "Active" | "Inactive" | "Pending" | "Failed" | (string & {});
export type StatusReason = string;
export type MemberAccountsEnrolled = boolean;
export type NumberOfMemberAccountsOptedIn = number;
export interface GetEnrollmentStatusResponse {
  status?: Status | undefined;
  statusReason?: string | undefined;
  memberAccountsEnrolled?: boolean | undefined;
  lastUpdatedTimestamp?: Date | undefined;
  numberOfMemberAccountsOptedIn?: number | undefined;
}
export type EnrollmentFilterName = "Status" | (string & {});
export interface EnrollmentFilter {
  name?: EnrollmentFilterName | undefined;
  values?: string[] | undefined;
}
export type EnrollmentFilters = EnrollmentFilter[];
export interface GetEnrollmentStatusesForOrganizationRequest {
  filters?: EnrollmentFilter[] | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface AccountEnrollmentStatus {
  accountId?: string | undefined;
  status?: Status | undefined;
  statusReason?: string | undefined;
  lastUpdatedTimestamp?: Date | undefined;
}
export type AccountEnrollmentStatuses = AccountEnrollmentStatus[];
export interface GetEnrollmentStatusesForOrganizationResponse {
  accountEnrollmentStatuses?: AccountEnrollmentStatus[] | undefined;
  nextToken?: string | undefined;
}
export type ResourceArns = string[];
export type IdleMaxResults = number;
export type Dimension = "SavingsValue" | "SavingsValueAfterDiscount" | (string & {});
export type Order = "Asc" | "Desc" | (string & {});
export interface OrderBy {
  dimension?: Dimension | undefined;
  order?: Order | undefined;
}
export interface GetIdleRecommendationsRequest {
  resourceArns?: string[] | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
  filters?: IdleRecommendationFilter[] | undefined;
  accountIds?: string[] | undefined;
  orderBy?: OrderBy | undefined;
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
  currency?: Currency | undefined;
  value?: number | undefined;
}
export interface IdleSavingsOpportunity {
  savingsOpportunityPercentage?: number | undefined;
  estimatedMonthlySavings?: IdleEstimatedMonthlySavings | undefined;
}
export interface IdleSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number | undefined;
  estimatedMonthlySavings?: IdleEstimatedMonthlySavings | undefined;
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
  key?: string | undefined;
  values?: string[] | undefined;
}
export type IdleDimensions = IdleDimension[];
export interface IdleUtilizationMetric {
  name?: IdleMetricName | undefined;
  statistic?: MetricStatistic | undefined;
  value?: number | undefined;
  dimensions?: IdleDimension[] | undefined;
}
export type IdleUtilizationMetrics = IdleUtilizationMetric[];
export interface IdleRecommendation {
  resourceArn?: string | undefined;
  resourceId?: string | undefined;
  resourceType?: IdleRecommendationResourceType | undefined;
  accountId?: string | undefined;
  finding?: IdleFinding | undefined;
  findingDescription?: string | undefined;
  savingsOpportunity?: IdleSavingsOpportunity | undefined;
  savingsOpportunityAfterDiscounts?: IdleSavingsOpportunityAfterDiscounts | undefined;
  utilizationMetrics?: IdleUtilizationMetric[] | undefined;
  lookBackPeriodInDays?: number | undefined;
  lastRefreshTimestamp?: Date | undefined;
  tags?: Tag[] | undefined;
}
export type IdleRecommendations = IdleRecommendation[];
export interface IdleRecommendationError {
  identifier?: string | undefined;
  code?: string | undefined;
  message?: string | undefined;
  resourceType?: IdleRecommendationResourceType | undefined;
}
export type IdleRecommendationErrors = IdleRecommendationError[];
export interface GetIdleRecommendationsResponse {
  nextToken?: string | undefined;
  idleRecommendations?: IdleRecommendation[] | undefined;
  errors?: IdleRecommendationError[] | undefined;
}
export type FunctionArn = string;
export type FunctionArns = string[];
export interface GetLambdaFunctionRecommendationsRequest {
  functionArns?: string[] | undefined;
  accountIds?: string[] | undefined;
  filters?: LambdaFunctionRecommendationFilter[] | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export type FunctionVersion = string;
export type NumberOfInvocations = number;
export type LambdaFunctionMetricName = "Duration" | "Memory" | (string & {});
export type LambdaFunctionMetricStatistic = "Maximum" | "Average" | (string & {});
export interface LambdaFunctionUtilizationMetric {
  name?: LambdaFunctionMetricName | undefined;
  statistic?: LambdaFunctionMetricStatistic | undefined;
  value?: number | undefined;
}
export type LambdaFunctionUtilizationMetrics = LambdaFunctionUtilizationMetric[];
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
  name?: LambdaFunctionMemoryMetricName | undefined;
  statistic?: LambdaFunctionMemoryMetricStatistic | undefined;
  value?: number | undefined;
}
export type LambdaFunctionMemoryProjectedMetrics = LambdaFunctionMemoryProjectedMetric[];
export interface LambdaEstimatedMonthlySavings {
  currency?: Currency | undefined;
  value?: number | undefined;
}
export interface LambdaSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number | undefined;
  estimatedMonthlySavings?: LambdaEstimatedMonthlySavings | undefined;
}
export interface LambdaFunctionMemoryRecommendationOption {
  rank?: number | undefined;
  memorySize?: number | undefined;
  projectedUtilizationMetrics?: LambdaFunctionMemoryProjectedMetric[] | undefined;
  savingsOpportunity?: SavingsOpportunity | undefined;
  savingsOpportunityAfterDiscounts?: LambdaSavingsOpportunityAfterDiscounts | undefined;
}
export type LambdaFunctionMemoryRecommendationOptions = LambdaFunctionMemoryRecommendationOption[];
export type LambdaSavingsEstimationModeSource =
  | "PublicPricing"
  | "CostExplorerRightsizing"
  | "CostOptimizationHub"
  | (string & {});
export interface LambdaSavingsEstimationMode {
  source?: LambdaSavingsEstimationModeSource | undefined;
}
export interface LambdaEffectiveRecommendationPreferences {
  savingsEstimationMode?: LambdaSavingsEstimationMode | undefined;
}
export interface LambdaFunctionRecommendation {
  functionArn?: string | undefined;
  functionVersion?: string | undefined;
  accountId?: string | undefined;
  currentMemorySize?: number | undefined;
  numberOfInvocations?: number | undefined;
  utilizationMetrics?: LambdaFunctionUtilizationMetric[] | undefined;
  lookbackPeriodInDays?: number | undefined;
  lastRefreshTimestamp?: Date | undefined;
  finding?: LambdaFunctionRecommendationFinding | undefined;
  findingReasonCodes?: LambdaFunctionRecommendationFindingReasonCode[] | undefined;
  memorySizeRecommendationOptions?: LambdaFunctionMemoryRecommendationOption[] | undefined;
  currentPerformanceRisk?: CurrentPerformanceRisk | undefined;
  effectiveRecommendationPreferences?: LambdaEffectiveRecommendationPreferences | undefined;
  tags?: Tag[] | undefined;
}
export type LambdaFunctionRecommendations = LambdaFunctionRecommendation[];
export interface GetLambdaFunctionRecommendationsResponse {
  nextToken?: string | undefined;
  lambdaFunctionRecommendations?: LambdaFunctionRecommendation[] | undefined;
}
export interface GetLicenseRecommendationsRequest {
  resourceArns?: string[] | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
  filters?: LicenseRecommendationFilter[] | undefined;
  accountIds?: string[] | undefined;
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
export type LicenseModel = "LicenseIncluded" | "BringYourOwnLicense" | (string & {});
export type LicenseVersion = string;
export type MetricSourceProvider = "CloudWatchApplicationInsights" | (string & {});
export type MetricProviderArn = string;
export interface MetricSource {
  provider?: MetricSourceProvider | undefined;
  providerArn?: string | undefined;
}
export type MetricsSource = MetricSource[];
export interface LicenseConfiguration {
  numberOfCores?: number | undefined;
  instanceType?: string | undefined;
  operatingSystem?: string | undefined;
  licenseEdition?: LicenseEdition | undefined;
  licenseName?: LicenseName | undefined;
  licenseModel?: LicenseModel | undefined;
  licenseVersion?: string | undefined;
  metricsSource?: MetricSource[] | undefined;
}
export type LicenseFinding = "InsufficientMetrics" | "Optimized" | "NotOptimized" | (string & {});
export type LicenseFindingReasonCode =
  | "InvalidCloudWatchApplicationInsightsSetup"
  | "CloudWatchApplicationInsightsError"
  | "LicenseOverprovisioned"
  | "Optimized"
  | (string & {});
export type LicenseFindingReasonCodes = LicenseFindingReasonCode[];
export interface LicenseRecommendationOption {
  rank?: number | undefined;
  operatingSystem?: string | undefined;
  licenseEdition?: LicenseEdition | undefined;
  licenseModel?: LicenseModel | undefined;
  savingsOpportunity?: SavingsOpportunity | undefined;
}
export type LicenseRecommendationOptions = LicenseRecommendationOption[];
export interface LicenseRecommendation {
  resourceArn?: string | undefined;
  accountId?: string | undefined;
  currentLicenseConfiguration?: LicenseConfiguration | undefined;
  lookbackPeriodInDays?: number | undefined;
  lastRefreshTimestamp?: Date | undefined;
  finding?: LicenseFinding | undefined;
  findingReasonCodes?: LicenseFindingReasonCode[] | undefined;
  licenseRecommendationOptions?: LicenseRecommendationOption[] | undefined;
  tags?: Tag[] | undefined;
}
export type LicenseRecommendations = LicenseRecommendation[];
export interface GetLicenseRecommendationsResponse {
  nextToken?: string | undefined;
  licenseRecommendations?: LicenseRecommendation[] | undefined;
  errors?: GetRecommendationError[] | undefined;
}
export interface GetRDSDatabaseRecommendationProjectedMetricsRequest {
  resourceArn: string;
  stat: MetricStatistic;
  period: number;
  startTime: Date;
  endTime: Date;
  recommendationPreferences?: RecommendationPreferences | undefined;
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
  name?: RDSDBMetricName | undefined;
  timestamps?: Date[] | undefined;
  values?: number[] | undefined;
}
export type RDSDatabaseProjectedMetrics = RDSDatabaseProjectedMetric[];
export interface RDSDatabaseRecommendedOptionProjectedMetric {
  recommendedDBInstanceClass?: string | undefined;
  rank?: number | undefined;
  projectedMetrics?: RDSDatabaseProjectedMetric[] | undefined;
}
export type RDSDatabaseRecommendedOptionProjectedMetrics =
  RDSDatabaseRecommendedOptionProjectedMetric[];
export interface GetRDSDatabaseRecommendationProjectedMetricsResponse {
  recommendedOptionProjectedMetrics?: RDSDatabaseRecommendedOptionProjectedMetric[] | undefined;
}
export interface GetRDSDatabaseRecommendationsRequest {
  resourceArns?: string[] | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
  filters?: RDSDBRecommendationFilter[] | undefined;
  accountIds?: string[] | undefined;
  recommendationPreferences?: RecommendationPreferences | undefined;
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
  storageType?: string | undefined;
  allocatedStorage?: number | undefined;
  iops?: number | undefined;
  maxAllocatedStorage?: number | undefined;
  storageThroughput?: number | undefined;
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
export type RDSDBMetricStatistic = "Maximum" | "Minimum" | "Average" | (string & {});
export interface RDSDBUtilizationMetric {
  name?: RDSDBMetricName | undefined;
  statistic?: RDSDBMetricStatistic | undefined;
  value?: number | undefined;
}
export type RDSDBProjectedUtilizationMetrics = RDSDBUtilizationMetric[];
export interface RDSInstanceEstimatedMonthlySavings {
  currency?: Currency | undefined;
  value?: number | undefined;
}
export interface RDSInstanceSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number | undefined;
  estimatedMonthlySavings?: RDSInstanceEstimatedMonthlySavings | undefined;
}
export interface RDSDBInstanceRecommendationOption {
  dbInstanceClass?: string | undefined;
  projectedUtilizationMetrics?: RDSDBUtilizationMetric[] | undefined;
  performanceRisk?: number | undefined;
  rank?: number | undefined;
  savingsOpportunity?: SavingsOpportunity | undefined;
  savingsOpportunityAfterDiscounts?: RDSInstanceSavingsOpportunityAfterDiscounts | undefined;
}
export type RDSDBInstanceRecommendationOptions = RDSDBInstanceRecommendationOption[];
export interface RDSStorageEstimatedMonthlySavings {
  currency?: Currency | undefined;
  value?: number | undefined;
}
export interface RDSStorageSavingsOpportunityAfterDiscounts {
  savingsOpportunityPercentage?: number | undefined;
  estimatedMonthlySavings?: RDSStorageEstimatedMonthlySavings | undefined;
}
export interface RDSDBStorageRecommendationOption {
  storageConfiguration?: DBStorageConfiguration | undefined;
  rank?: number | undefined;
  savingsOpportunity?: SavingsOpportunity | undefined;
  savingsOpportunityAfterDiscounts?: RDSStorageSavingsOpportunityAfterDiscounts | undefined;
  estimatedMonthlyVolumeIOPsCostVariation?: RDSEstimatedMonthlyVolumeIOPsCostVariation | undefined;
}
export type RDSDBStorageRecommendationOptions = RDSDBStorageRecommendationOption[];
export type RDSDBUtilizationMetrics = RDSDBUtilizationMetric[];
export type RDSSavingsEstimationModeSource =
  | "PublicPricing"
  | "CostExplorerRightsizing"
  | "CostOptimizationHub"
  | (string & {});
export interface RDSSavingsEstimationMode {
  source?: RDSSavingsEstimationModeSource | undefined;
}
export interface RDSEffectiveRecommendationPreferences {
  cpuVendorArchitectures?: CpuVendorArchitecture[] | undefined;
  enhancedInfrastructureMetrics?: EnhancedInfrastructureMetrics | undefined;
  lookBackPeriod?: LookBackPeriodPreference | undefined;
  savingsEstimationMode?: RDSSavingsEstimationMode | undefined;
}
export interface RDSDBRecommendation {
  resourceArn?: string | undefined;
  accountId?: string | undefined;
  engine?: string | undefined;
  engineVersion?: string | undefined;
  promotionTier?: number | undefined;
  currentDBInstanceClass?: string | undefined;
  currentStorageConfiguration?: DBStorageConfiguration | undefined;
  dbClusterIdentifier?: string | undefined;
  idle?: Idle | undefined;
  instanceFinding?: RDSInstanceFinding | undefined;
  storageFinding?: RDSStorageFinding | undefined;
  instanceFindingReasonCodes?: RDSInstanceFindingReasonCode[] | undefined;
  currentInstancePerformanceRisk?: RDSCurrentInstancePerformanceRisk | undefined;
  currentStorageEstimatedMonthlyVolumeIOPsCostVariation?:
    | RDSEstimatedMonthlyVolumeIOPsCostVariation
    | undefined;
  storageFindingReasonCodes?: RDSStorageFindingReasonCode[] | undefined;
  instanceRecommendationOptions?: RDSDBInstanceRecommendationOption[] | undefined;
  storageRecommendationOptions?: RDSDBStorageRecommendationOption[] | undefined;
  utilizationMetrics?: RDSDBUtilizationMetric[] | undefined;
  effectiveRecommendationPreferences?: RDSEffectiveRecommendationPreferences | undefined;
  lookbackPeriodInDays?: number | undefined;
  lastRefreshTimestamp?: Date | undefined;
  tags?: Tag[] | undefined;
}
export type RDSDBRecommendations = RDSDBRecommendation[];
export interface GetRDSDatabaseRecommendationsResponse {
  nextToken?: string | undefined;
  rdsDBRecommendations?: RDSDBRecommendation[] | undefined;
  errors?: GetRecommendationError[] | undefined;
}
export interface GetRecommendationPreferencesRequest {
  resourceType: ResourceType;
  scope?: Scope | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export type SavingsEstimationMode = "AfterDiscounts" | "BeforeDiscounts" | (string & {});
export interface RecommendationPreferencesDetail {
  scope?: Scope | undefined;
  resourceType?: ResourceType | undefined;
  enhancedInfrastructureMetrics?: EnhancedInfrastructureMetrics | undefined;
  inferredWorkloadTypes?: InferredWorkloadTypesPreference | undefined;
  externalMetricsPreference?: ExternalMetricsPreference | undefined;
  lookBackPeriod?: LookBackPeriodPreference | undefined;
  utilizationPreferences?: UtilizationPreference[] | undefined;
  preferredResources?: EffectivePreferredResource[] | undefined;
  savingsEstimationMode?: SavingsEstimationMode | undefined;
}
export type RecommendationPreferencesDetails = RecommendationPreferencesDetail[];
export interface GetRecommendationPreferencesResponse {
  nextToken?: string | undefined;
  recommendationPreferencesDetails?: RecommendationPreferencesDetail[] | undefined;
}
export interface GetRecommendationSummariesRequest {
  accountIds?: string[] | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export type SummaryValue = number;
export type FindingReasonCode = "MemoryOverprovisioned" | "MemoryUnderprovisioned" | (string & {});
export interface ReasonCodeSummary {
  name?: FindingReasonCode | undefined;
  value?: number | undefined;
}
export type ReasonCodeSummaries = ReasonCodeSummary[];
export interface Summary {
  name?: Finding | undefined;
  value?: number | undefined;
  reasonCodeSummaries?: ReasonCodeSummary[] | undefined;
}
export type Summaries = Summary[];
export interface IdleSummary {
  name?: IdleFinding | undefined;
  value?: number | undefined;
}
export type IdleSummaries = IdleSummary[];
export type High = number;
export type Medium = number;
export type Low = number;
export type VeryLow = number;
export interface CurrentPerformanceRiskRatings {
  high?: number | undefined;
  medium?: number | undefined;
  low?: number | undefined;
  veryLow?: number | undefined;
}
export interface InferredWorkloadSaving {
  inferredWorkloadTypes?: InferredWorkloadType[] | undefined;
  estimatedMonthlySavings?: EstimatedMonthlySavings | undefined;
}
export type InferredWorkloadSavings = InferredWorkloadSaving[];
export interface RecommendationSummary {
  summaries?: Summary[] | undefined;
  idleSummaries?: IdleSummary[] | undefined;
  recommendationResourceType?: RecommendationSourceType | undefined;
  accountId?: string | undefined;
  savingsOpportunity?: SavingsOpportunity | undefined;
  idleSavingsOpportunity?: SavingsOpportunity | undefined;
  aggregatedSavingsOpportunity?: SavingsOpportunity | undefined;
  currentPerformanceRiskRatings?: CurrentPerformanceRiskRatings | undefined;
  inferredWorkloadSavings?: InferredWorkloadSaving[] | undefined;
}
export type RecommendationSummaries = RecommendationSummary[];
export interface GetRecommendationSummariesResponse {
  nextToken?: string | undefined;
  recommendationSummaries?: RecommendationSummary[] | undefined;
}
export interface PreferredResource {
  name?: PreferredResourceName | undefined;
  includeList?: string[] | undefined;
  excludeList?: string[] | undefined;
}
export type PreferredResources = PreferredResource[];
export interface PutRecommendationPreferencesRequest {
  resourceType: ResourceType;
  scope?: Scope | undefined;
  enhancedInfrastructureMetrics?: EnhancedInfrastructureMetrics | undefined;
  inferredWorkloadTypes?: InferredWorkloadTypesPreference | undefined;
  externalMetricsPreference?: ExternalMetricsPreference | undefined;
  lookBackPeriod?: LookBackPeriodPreference | undefined;
  utilizationPreferences?: UtilizationPreference[] | undefined;
  preferredResources?: PreferredResource[] | undefined;
  savingsEstimationMode?: SavingsEstimationMode | undefined;
}
export interface PutRecommendationPreferencesResponse {}
export interface UpdateEnrollmentStatusRequest {
  status: Status;
  includeMemberAccounts?: boolean | undefined;
}
export interface UpdateEnrollmentStatusResponse {
  status?: Status | undefined;
  statusReason?: string | undefined;
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
  input: __S(688, __c43, 0) as any as S.Schema<DeleteRecommendationPreferencesRequest>,
  output: __S(736, __c46, 0) as any as S.Schema<DeleteRecommendationPreferencesResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteRecommendationPreferences",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DescribeRecommendationExportJobsRequest>,
  output: __S(4, __c0, 4) as any as S.Schema<DescribeRecommendationExportJobsResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeRecommendationExportJobs",
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
  input: __S(64, __c4, 0) as any as S.Schema<ExportAutoScalingGroupRecommendationsRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<ExportAutoScalingGroupRecommendationsResponse>,
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
  telemetry: TELEMETRY,
  span: "ExportAutoScalingGroupRecommendations",
}));

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
  input: __S(112, __c7, 0) as any as S.Schema<ExportEBSVolumeRecommendationsRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<ExportEBSVolumeRecommendationsResponse>,
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
  telemetry: TELEMETRY,
  span: "ExportEBSVolumeRecommendations",
}));

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
  input: __S(128, __c8, 0) as any as S.Schema<ExportEC2InstanceRecommendationsRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<ExportEC2InstanceRecommendationsResponse>,
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
  telemetry: TELEMETRY,
  span: "ExportEC2InstanceRecommendations",
}));

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
  input: __S(144, __c9, 0) as any as S.Schema<ExportECSServiceRecommendationsRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<ExportECSServiceRecommendationsResponse>,
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
  telemetry: TELEMETRY,
  span: "ExportECSServiceRecommendations",
}));

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
  input: __S(160, __c10, 0) as any as S.Schema<ExportIdleRecommendationsRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<ExportIdleRecommendationsResponse>,
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
  telemetry: TELEMETRY,
  span: "ExportIdleRecommendations",
}));

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
  input: __S(176, __c11, 0) as any as S.Schema<ExportLambdaFunctionRecommendationsRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<ExportLambdaFunctionRecommendationsResponse>,
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
  telemetry: TELEMETRY,
  span: "ExportLambdaFunctionRecommendations",
}));

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
  input: __S(192, __c12, 0) as any as S.Schema<ExportLicenseRecommendationsRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<ExportLicenseRecommendationsResponse>,
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
  telemetry: TELEMETRY,
  span: "ExportLicenseRecommendations",
}));

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
  input: __S(208, __c13, 0) as any as S.Schema<ExportRDSDatabaseRecommendationsRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<ExportRDSDatabaseRecommendationsResponse>,
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
  telemetry: TELEMETRY,
  span: "ExportRDSDatabaseRecommendations",
}));

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
  input: __S(224, __c14, 0) as any as S.Schema<GetAutoScalingGroupRecommendationsRequest>,
  output: __S(230, __c14, 6) as any as S.Schema<GetAutoScalingGroupRecommendationsResponse>,
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
  telemetry: TELEMETRY,
  span: "GetAutoScalingGroupRecommendations",
}));

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
  input: __S(352, __c22, 0) as any as S.Schema<GetEBSVolumeRecommendationsRequest>,
  output: __S(358, __c22, 6) as any as S.Schema<GetEBSVolumeRecommendationsResponse>,
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
  telemetry: TELEMETRY,
  span: "GetEBSVolumeRecommendations",
}));

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
  input: __S(400, __c25, 0) as any as S.Schema<GetEC2InstanceRecommendationsRequest>,
  output: __S(408, __c25, 8) as any as S.Schema<GetEC2InstanceRecommendationsResponse>,
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
  telemetry: TELEMETRY,
  span: "GetEC2InstanceRecommendations",
}));

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
  input: __S(416, __c26, 0) as any as S.Schema<GetEC2RecommendationProjectedMetricsRequest>,
  output: __S(419, __c26, 3) as any as S.Schema<GetEC2RecommendationProjectedMetricsResponse>,
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
  telemetry: TELEMETRY,
  span: "GetEC2RecommendationProjectedMetrics",
}));

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
  input: __S(464, __c29, 0) as any as S.Schema<GetECSServiceRecommendationProjectedMetricsRequest>,
  output: __S(
    469,
    __c29,
    5,
  ) as any as S.Schema<GetECSServiceRecommendationProjectedMetricsResponse>,
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
  telemetry: TELEMETRY,
  span: "GetECSServiceRecommendationProjectedMetrics",
}));

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
  input: __S(480, __c30, 0) as any as S.Schema<GetECSServiceRecommendationsRequest>,
  output: __S(491, __c30, 11) as any as S.Schema<GetECSServiceRecommendationsResponse>,
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
  telemetry: TELEMETRY,
  span: "GetECSServiceRecommendations",
}));

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
  input: __S(496, __c31, 0) as any as S.Schema<GetEffectiveRecommendationPreferencesRequest>,
  output: __S(497, __c31, 1) as any as S.Schema<GetEffectiveRecommendationPreferencesResponse>,
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
  telemetry: TELEMETRY,
  span: "GetEffectiveRecommendationPreferences",
}));

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
  input: __S(512, __c32, 0) as any as S.Schema<GetEnrollmentStatusRequest>,
  output: __S(513, __c32, 1) as any as S.Schema<GetEnrollmentStatusResponse>,
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
  telemetry: TELEMETRY,
  span: "GetEnrollmentStatus",
}));

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
  input: __S(528, __c33, 0) as any as S.Schema<GetEnrollmentStatusesForOrganizationRequest>,
  output: __S(531, __c33, 3) as any as S.Schema<GetEnrollmentStatusesForOrganizationResponse>,
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
  telemetry: TELEMETRY,
  span: "GetEnrollmentStatusesForOrganization",
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
  input: __S(545, __c34, 1) as any as S.Schema<GetIdleRecommendationsRequest>,
  output: __S(554, __c34, 10) as any as S.Schema<GetIdleRecommendationsResponse>,
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
  telemetry: TELEMETRY,
  span: "GetIdleRecommendations",
}));

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
  input: __S(560, __c35, 0) as any as S.Schema<GetLambdaFunctionRecommendationsRequest>,
  output: __S(566, __c35, 6) as any as S.Schema<GetLambdaFunctionRecommendationsResponse>,
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
  telemetry: TELEMETRY,
  span: "GetLambdaFunctionRecommendations",
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
  input: __S(576, __c36, 0) as any as S.Schema<GetLicenseRecommendationsRequest>,
  output: __S(584, __c36, 8) as any as S.Schema<GetLicenseRecommendationsResponse>,
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
  telemetry: TELEMETRY,
  span: "GetLicenseRecommendations",
}));

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
  input: __S(592, __c37, 0) as any as S.Schema<GetRDSDatabaseRecommendationProjectedMetricsRequest>,
  output: __S(
    595,
    __c37,
    3,
  ) as any as S.Schema<GetRDSDatabaseRecommendationProjectedMetricsResponse>,
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
  telemetry: TELEMETRY,
  span: "GetRDSDatabaseRecommendationProjectedMetrics",
}));

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
  input: __S(608, __c38, 0) as any as S.Schema<GetRDSDatabaseRecommendationsRequest>,
  output: __S(617, __c38, 9) as any as S.Schema<GetRDSDatabaseRecommendationsResponse>,
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
  telemetry: TELEMETRY,
  span: "GetRDSDatabaseRecommendations",
}));

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
  input: __S(624, __c39, 0) as any as S.Schema<GetRecommendationPreferencesRequest>,
  output: __S(627, __c39, 3) as any as S.Schema<GetRecommendationPreferencesResponse>,
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
  telemetry: TELEMETRY,
  span: "GetRecommendationPreferences",
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
  input: __S(640, __c40, 0) as any as S.Schema<GetRecommendationSummariesRequest>,
  output: __S(650, __c40, 10) as any as S.Schema<GetRecommendationSummariesResponse>,
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
  telemetry: TELEMETRY,
  span: "GetRecommendationSummaries",
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
  input: __S(658, __c41, 2) as any as S.Schema<PutRecommendationPreferencesRequest>,
  output: __S(736, __c46, 0) as any as S.Schema<PutRecommendationPreferencesResponse>,
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
  telemetry: TELEMETRY,
  span: "PutRecommendationPreferences",
}));

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
  input: __S(672, __c42, 0) as any as S.Schema<UpdateEnrollmentStatusRequest>,
  output: __S(673, __c42, 1) as any as S.Schema<UpdateEnrollmentStatusResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateEnrollmentStatus",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobIds: S.optional(__S(32, __c2, 0)),
          filters: S.optional(__S(49, __c3, 1)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRecommendationExportJobsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ s3: S.optional(__S(16, __c1, 0)) })).annotate({
        identifier: "ExportDestination",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          jobId: S.optional(S.String),
          destination: S.optional(__S(1, __c0, 1)),
          resourceType: S.optional(S.String),
          status: S.optional(S.String),
          creationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecommendationExportJob" });
    case 3:
      return S.Array(__S(2, __c0, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          recommendationExportJobs: S.optional(__S(3, __c0, 3)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeRecommendationExportJobsResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          bucket: S.optional(S.String),
          key: S.optional(S.String),
          metadataKey: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3Destination" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), values: S.optional(__S(32, __c2, 0)) }),
      ).annotate({ identifier: "JobFilter" });
    case 1:
      return S.Array(__S(48, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountIds: S.optional(__S(32, __c2, 0)),
          filters: S.optional(__S(49, __c3, 1)),
          fieldsToExport: S.optional(__S(704, __c44, 0)),
          s3DestinationConfig: __S(80, __c5, 0),
          fileFormat: S.optional(S.String),
          includeMemberAccounts: S.optional(S.Boolean),
          recommendationPreferences: S.optional(__S(96, __c6, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ExportAutoScalingGroupRecommendationsRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bucket: S.optional(S.String), keyPrefix: S.optional(S.String) }),
      ).annotate({ identifier: "S3DestinationConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({ jobId: S.optional(S.String), s3Destination: S.optional(__S(16, __c1, 0)) }),
      ).annotate({ identifier: "ExportAutoScalingGroupRecommendationsResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ cpuVendorArchitectures: S.optional(__S(704, __c44, 0)) }),
      ).annotate({ identifier: "RecommendationPreferences" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountIds: S.optional(__S(32, __c2, 0)),
          filters: S.optional(__S(49, __c3, 1)),
          fieldsToExport: S.optional(__S(704, __c44, 0)),
          s3DestinationConfig: __S(80, __c5, 0),
          fileFormat: S.optional(S.String),
          includeMemberAccounts: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ExportEBSVolumeRecommendationsRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountIds: S.optional(__S(32, __c2, 0)),
          filters: S.optional(__S(49, __c3, 1)),
          fieldsToExport: S.optional(__S(704, __c44, 0)),
          s3DestinationConfig: __S(80, __c5, 0),
          fileFormat: S.optional(S.String),
          includeMemberAccounts: S.optional(S.Boolean),
          recommendationPreferences: S.optional(__S(96, __c6, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ExportEC2InstanceRecommendationsRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountIds: S.optional(__S(32, __c2, 0)),
          filters: S.optional(__S(49, __c3, 1)),
          fieldsToExport: S.optional(__S(704, __c44, 0)),
          s3DestinationConfig: __S(80, __c5, 0),
          fileFormat: S.optional(S.String),
          includeMemberAccounts: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ExportECSServiceRecommendationsRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountIds: S.optional(__S(32, __c2, 0)),
          filters: S.optional(__S(49, __c3, 1)),
          fieldsToExport: S.optional(__S(704, __c44, 0)),
          s3DestinationConfig: __S(80, __c5, 0),
          fileFormat: S.optional(S.String),
          includeMemberAccounts: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ExportIdleRecommendationsRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountIds: S.optional(__S(32, __c2, 0)),
          filters: S.optional(__S(49, __c3, 1)),
          fieldsToExport: S.optional(__S(704, __c44, 0)),
          s3DestinationConfig: __S(80, __c5, 0),
          fileFormat: S.optional(S.String),
          includeMemberAccounts: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ExportLambdaFunctionRecommendationsRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountIds: S.optional(__S(32, __c2, 0)),
          filters: S.optional(__S(49, __c3, 1)),
          fieldsToExport: S.optional(__S(704, __c44, 0)),
          s3DestinationConfig: __S(80, __c5, 0),
          fileFormat: S.optional(S.String),
          includeMemberAccounts: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ExportLicenseRecommendationsRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountIds: S.optional(__S(32, __c2, 0)),
          filters: S.optional(__S(49, __c3, 1)),
          fieldsToExport: S.optional(__S(704, __c44, 0)),
          s3DestinationConfig: __S(80, __c5, 0),
          fileFormat: S.optional(S.String),
          includeMemberAccounts: S.optional(S.Boolean),
          recommendationPreferences: S.optional(__S(96, __c6, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ExportRDSDatabaseRecommendationsRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountIds: S.optional(__S(32, __c2, 0)),
          autoScalingGroupArns: S.optional(__S(32, __c2, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          filters: S.optional(__S(49, __c3, 1)),
          recommendationPreferences: S.optional(__S(96, __c6, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAutoScalingGroupRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          desiredCapacity: S.optional(S.Number),
          minSize: S.optional(S.Number),
          maxSize: S.optional(S.Number),
          instanceType: S.optional(S.String),
          allocationStrategy: S.optional(S.String),
          estimatedInstanceHourReductionPercentage: S.optional(S.Number),
          type: S.optional(S.String),
          mixedInstanceTypes: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "AutoScalingGroupConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          configuration: S.optional(__S(225, __c14, 1)),
          instanceGpuInfo: S.optional(__S(306, __c19, 2)),
          projectedUtilizationMetrics: S.optional(__S(273, __c17, 1)),
          performanceRisk: S.optional(S.Number),
          rank: S.optional(S.Number),
          savingsOpportunity: S.optional(__S(257, __c16, 1)),
          savingsOpportunityAfterDiscounts: S.optional(__S(257, __c16, 1)),
          migrationEffort: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutoScalingGroupRecommendationOption" });
    case 3:
      return S.Array(__S(226, __c14, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String),
          autoScalingGroupArn: S.optional(S.String),
          autoScalingGroupName: S.optional(S.String),
          finding: S.optional(S.String),
          utilizationMetrics: S.optional(__S(273, __c17, 1)),
          lookBackPeriodInDays: S.optional(S.Number),
          currentConfiguration: S.optional(__S(225, __c14, 1)),
          currentInstanceGpuInfo: S.optional(__S(306, __c19, 2)),
          recommendationOptions: S.optional(__S(227, __c14, 3)),
          lastRefreshTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          currentPerformanceRisk: S.optional(S.String),
          effectiveRecommendationPreferences: S.optional(__S(307, __c19, 3)),
          inferredWorkloadTypes: S.optional(__S(704, __c44, 0)),
        }),
      ).annotate({ identifier: "AutoScalingGroupRecommendation" });
    case 5:
      return S.Array(__S(228, __c14, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          autoScalingGroupRecommendations: S.optional(__S(229, __c14, 5)),
          errors: S.optional(__S(289, __c18, 1)),
        }),
      ).annotate({ identifier: "GetAutoScalingGroupRecommendationsResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ source: S.optional(S.String) })).annotate({
        identifier: "ExternalMetricsPreference",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ currency: S.optional(S.String), value: S.optional(S.Number) }),
      ).annotate({ identifier: "EstimatedMonthlySavings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          savingsOpportunityPercentage: S.optional(S.Number),
          estimatedMonthlySavings: S.optional(__S(256, __c16, 0)),
        }),
      ).annotate({ identifier: "SavingsOpportunity" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          statistic: S.optional(S.String),
          value: S.optional(S.Number),
        }),
      ).annotate({ identifier: "UtilizationMetric" });
    case 1:
      return S.Array(__S(272, __c17, 0));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identifier: S.optional(S.String),
          code: S.optional(S.String),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetRecommendationError" });
    case 1:
      return S.Array(__S(288, __c18, 0));
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ gpuCount: S.optional(S.Number), gpuMemorySizeInMiB: S.optional(S.Number) }),
      ).annotate({ identifier: "Gpu" });
    case 1:
      return S.Array(__S(304, __c19, 0));
    case 2:
      return S.suspend(() => S.Struct({ gpus: S.optional(__S(305, __c19, 1)) })).annotate({
        identifier: "GpuInfo",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          cpuVendorArchitectures: S.optional(__S(704, __c44, 0)),
          enhancedInfrastructureMetrics: S.optional(S.String),
          inferredWorkloadTypes: S.optional(S.String),
          externalMetricsPreference: S.optional(__S(240, __c15, 0)),
          lookBackPeriod: S.optional(S.String),
          utilizationPreferences: S.optional(__S(338, __c21, 2)),
          preferredResources: S.optional(__S(321, __c20, 1)),
          savingsEstimationMode: S.optional(__S(240, __c15, 0)),
        }),
      ).annotate({ identifier: "EffectiveRecommendationPreferences" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          includeList: S.optional(__S(32, __c2, 0)),
          effectiveIncludeList: S.optional(__S(32, __c2, 0)),
          excludeList: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "EffectivePreferredResource" });
    case 1:
      return S.Array(__S(320, __c20, 0));
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ threshold: S.optional(S.String), headroom: S.optional(S.String) }),
      ).annotate({ identifier: "CustomizableMetricParameters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          metricName: S.optional(S.String),
          metricParameters: S.optional(__S(336, __c21, 0)),
        }),
      ).annotate({ identifier: "UtilizationPreference" });
    case 2:
      return S.Array(__S(337, __c21, 1));
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          volumeArns: S.optional(__S(32, __c2, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          filters: S.optional(__S(49, __c3, 1)),
          accountIds: S.optional(__S(32, __c2, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetEBSVolumeRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          volumeType: S.optional(S.String),
          volumeSize: S.optional(S.Number),
          volumeBaselineIOPS: S.optional(S.Number),
          volumeBurstIOPS: S.optional(S.Number),
          volumeBaselineThroughput: S.optional(S.Number),
          volumeBurstThroughput: S.optional(S.Number),
          rootVolume: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "VolumeConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          configuration: S.optional(__S(353, __c22, 1)),
          performanceRisk: S.optional(S.Number),
          rank: S.optional(S.Number),
          savingsOpportunity: S.optional(__S(257, __c16, 1)),
          savingsOpportunityAfterDiscounts: S.optional(__S(257, __c16, 1)),
        }),
      ).annotate({ identifier: "VolumeRecommendationOption" });
    case 3:
      return S.Array(__S(354, __c22, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          volumeArn: S.optional(S.String),
          accountId: S.optional(S.String),
          currentConfiguration: S.optional(__S(353, __c22, 1)),
          finding: S.optional(S.String),
          utilizationMetrics: S.optional(__S(273, __c17, 1)),
          lookBackPeriodInDays: S.optional(S.Number),
          volumeRecommendationOptions: S.optional(__S(355, __c22, 3)),
          lastRefreshTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          currentPerformanceRisk: S.optional(S.String),
          effectiveRecommendationPreferences: S.optional(__S(384, __c24, 0)),
          tags: S.optional(__S(369, __c23, 1)),
        }),
      ).annotate({ identifier: "VolumeRecommendation" });
    case 5:
      return S.Array(__S(356, __c22, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          volumeRecommendations: S.optional(__S(357, __c22, 5)),
          errors: S.optional(__S(289, __c18, 1)),
        }),
      ).annotate({ identifier: "GetEBSVolumeRecommendationsResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(368, __c23, 0));
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          savingsEstimationMode: S.optional(__S(240, __c15, 0)),
          lookBackPeriod: S.optional(S.String),
        }),
      ).annotate({ identifier: "EBSEffectiveRecommendationPreferences" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceArns: S.optional(__S(32, __c2, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          filters: S.optional(__S(49, __c3, 1)),
          accountIds: S.optional(__S(32, __c2, 0)),
          recommendationPreferences: S.optional(__S(96, __c6, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetEC2InstanceRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          instanceType: S.optional(S.String),
          instanceGpuInfo: S.optional(__S(306, __c19, 2)),
          projectedUtilizationMetrics: S.optional(__S(273, __c17, 1)),
          platformDifferences: S.optional(__S(704, __c44, 0)),
          performanceRisk: S.optional(S.Number),
          rank: S.optional(S.Number),
          savingsOpportunity: S.optional(__S(257, __c16, 1)),
          savingsOpportunityAfterDiscounts: S.optional(__S(257, __c16, 1)),
          migrationEffort: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceRecommendationOption" });
    case 2:
      return S.Array(__S(401, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          recommendationSourceArn: S.optional(S.String),
          recommendationSourceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecommendationSource" });
    case 4:
      return S.Array(__S(403, __c25, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ statusCode: S.optional(S.String), statusReason: S.optional(S.String) }),
      ).annotate({ identifier: "ExternalMetricStatus" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          instanceArn: S.optional(S.String),
          accountId: S.optional(S.String),
          instanceName: S.optional(S.String),
          currentInstanceType: S.optional(S.String),
          finding: S.optional(S.String),
          findingReasonCodes: S.optional(__S(704, __c44, 0)),
          utilizationMetrics: S.optional(__S(273, __c17, 1)),
          lookBackPeriodInDays: S.optional(S.Number),
          recommendationOptions: S.optional(__S(402, __c25, 2)),
          recommendationSources: S.optional(__S(404, __c25, 4)),
          lastRefreshTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          currentPerformanceRisk: S.optional(S.String),
          effectiveRecommendationPreferences: S.optional(__S(307, __c19, 3)),
          inferredWorkloadTypes: S.optional(__S(704, __c44, 0)),
          instanceState: S.optional(S.String),
          tags: S.optional(__S(369, __c23, 1)),
          externalMetricStatus: S.optional(__S(405, __c25, 5)),
          currentInstanceGpuInfo: S.optional(__S(306, __c19, 2)),
          idle: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceRecommendation" });
    case 7:
      return S.Array(__S(406, __c25, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          instanceRecommendations: S.optional(__S(407, __c25, 7)),
          errors: S.optional(__S(289, __c18, 1)),
        }),
      ).annotate({ identifier: "GetEC2InstanceRecommendationsResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          instanceArn: S.String,
          stat: S.String,
          period: S.Number,
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          recommendationPreferences: S.optional(__S(96, __c6, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetEC2RecommendationProjectedMetricsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          recommendedInstanceType: S.optional(S.String),
          rank: S.optional(S.Number),
          projectedMetrics: S.optional(__S(449, __c28, 1)),
        }),
      ).annotate({ identifier: "RecommendedOptionProjectedMetric" });
    case 2:
      return S.Array(__S(417, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ recommendedOptionProjectedMetrics: S.optional(__S(418, __c26, 2)) }),
      ).annotate({ identifier: "GetEC2RecommendationProjectedMetricsResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.Date.pipe(/*@__PURE__*/ T.TimestampFormat("epoch-seconds")));
    case 1:
      return S.Array(S.Number);
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          timestamps: S.optional(__S(432, __c27, 0)),
          values: S.optional(__S(433, __c27, 1)),
        }),
      ).annotate({ identifier: "ProjectedMetric" });
    case 1:
      return S.Array(__S(448, __c28, 0));
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String,
          stat: S.String,
          period: S.Number,
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetECSServiceRecommendationProjectedMetricsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          timestamps: S.optional(__S(432, __c27, 0)),
          upperBoundValues: S.optional(__S(433, __c27, 1)),
          lowerBoundValues: S.optional(__S(433, __c27, 1)),
        }),
      ).annotate({ identifier: "ECSServiceProjectedMetric" });
    case 2:
      return S.Array(__S(465, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          recommendedCpuUnits: S.optional(S.Number),
          recommendedMemorySize: S.optional(S.Number),
          projectedMetrics: S.optional(__S(466, __c29, 2)),
        }),
      ).annotate({ identifier: "ECSServiceRecommendedOptionProjectedMetric" });
    case 4:
      return S.Array(__S(467, __c29, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ recommendedOptionProjectedMetrics: S.optional(__S(468, __c29, 4)) }),
      ).annotate({ identifier: "GetECSServiceRecommendationProjectedMetricsResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArns: S.optional(__S(32, __c2, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          filters: S.optional(__S(49, __c3, 1)),
          accountIds: S.optional(__S(32, __c2, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetECSServiceRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ memory: S.optional(S.Number), memoryReservation: S.optional(S.Number) }),
      ).annotate({ identifier: "MemorySizeConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          containerName: S.optional(S.String),
          memorySizeConfiguration: S.optional(__S(481, __c30, 1)),
          cpu: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ContainerConfiguration" });
    case 3:
      return S.Array(__S(482, __c30, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          memory: S.optional(S.Number),
          cpu: S.optional(S.Number),
          containerConfigurations: S.optional(__S(483, __c30, 3)),
          autoScalingConfiguration: S.optional(S.String),
          taskDefinitionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          statistic: S.optional(S.String),
          lowerBoundValue: S.optional(S.Number),
          upperBoundValue: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ECSServiceProjectedUtilizationMetric" });
    case 6:
      return S.Array(__S(485, __c30, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          memory: S.optional(S.Number),
          cpu: S.optional(S.Number),
          savingsOpportunity: S.optional(__S(257, __c16, 1)),
          savingsOpportunityAfterDiscounts: S.optional(__S(257, __c16, 1)),
          projectedUtilizationMetrics: S.optional(__S(486, __c30, 6)),
          containerRecommendations: S.optional(__S(483, __c30, 3)),
        }),
      ).annotate({ identifier: "ECSServiceRecommendationOption" });
    case 8:
      return S.Array(__S(487, __c30, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.optional(S.String),
          accountId: S.optional(S.String),
          currentServiceConfiguration: S.optional(__S(484, __c30, 4)),
          utilizationMetrics: S.optional(__S(273, __c17, 1)),
          lookbackPeriodInDays: S.optional(S.Number),
          launchType: S.optional(S.String),
          lastRefreshTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          finding: S.optional(S.String),
          findingReasonCodes: S.optional(__S(704, __c44, 0)),
          serviceRecommendationOptions: S.optional(__S(488, __c30, 8)),
          currentPerformanceRisk: S.optional(S.String),
          effectiveRecommendationPreferences: S.optional(__S(384, __c24, 0)),
          tags: S.optional(__S(369, __c23, 1)),
        }),
      ).annotate({ identifier: "ECSServiceRecommendation" });
    case 10:
      return S.Array(__S(489, __c30, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          ecsServiceRecommendations: S.optional(__S(490, __c30, 10)),
          errors: S.optional(__S(289, __c18, 1)),
        }),
      ).annotate({ identifier: "GetECSServiceRecommendationsResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEffectiveRecommendationPreferencesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          enhancedInfrastructureMetrics: S.optional(S.String),
          externalMetricsPreference: S.optional(__S(240, __c15, 0)),
          lookBackPeriod: S.optional(S.String),
          utilizationPreferences: S.optional(__S(338, __c21, 2)),
          preferredResources: S.optional(__S(321, __c20, 1)),
        }),
      ).annotate({ identifier: "GetEffectiveRecommendationPreferencesResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEnrollmentStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          memberAccountsEnrolled: S.optional(S.Boolean),
          lastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          numberOfMemberAccountsOptedIn: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetEnrollmentStatusResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(49, __c3, 1)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetEnrollmentStatusesForOrganizationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          lastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AccountEnrollmentStatus" });
    case 2:
      return S.Array(__S(529, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          accountEnrollmentStatuses: S.optional(__S(530, __c33, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetEnrollmentStatusesForOrganizationResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ dimension: S.optional(S.String), order: S.optional(S.String) }),
      ).annotate({ identifier: "OrderBy" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourceArns: S.optional(__S(32, __c2, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          filters: S.optional(__S(49, __c3, 1)),
          accountIds: S.optional(__S(32, __c2, 0)),
          orderBy: S.optional(__S(544, __c34, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetIdleRecommendationsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ key: S.optional(S.String), values: S.optional(__S(32, __c2, 0)) }),
      ).annotate({ identifier: "IdleDimension" });
    case 3:
      return S.Array(__S(546, __c34, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          statistic: S.optional(S.String),
          value: S.optional(S.Number),
          dimensions: S.optional(__S(547, __c34, 3)),
        }),
      ).annotate({ identifier: "IdleUtilizationMetric" });
    case 5:
      return S.Array(__S(548, __c34, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.optional(S.String),
          resourceId: S.optional(S.String),
          resourceType: S.optional(S.String),
          accountId: S.optional(S.String),
          finding: S.optional(S.String),
          findingDescription: S.optional(S.String),
          savingsOpportunity: S.optional(__S(257, __c16, 1)),
          savingsOpportunityAfterDiscounts: S.optional(__S(257, __c16, 1)),
          utilizationMetrics: S.optional(__S(549, __c34, 5)),
          lookBackPeriodInDays: S.optional(S.Number),
          lastRefreshTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(369, __c23, 1)),
        }),
      ).annotate({ identifier: "IdleRecommendation" });
    case 7:
      return S.Array(__S(550, __c34, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          identifier: S.optional(S.String),
          code: S.optional(S.String),
          message: S.optional(S.String),
          resourceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "IdleRecommendationError" });
    case 9:
      return S.Array(__S(552, __c34, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          idleRecommendations: S.optional(__S(551, __c34, 7)),
          errors: S.optional(__S(553, __c34, 9)),
        }),
      ).annotate({ identifier: "GetIdleRecommendationsResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          functionArns: S.optional(__S(32, __c2, 0)),
          accountIds: S.optional(__S(32, __c2, 0)),
          filters: S.optional(__S(49, __c3, 1)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetLambdaFunctionRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          rank: S.optional(S.Number),
          memorySize: S.optional(S.Number),
          projectedUtilizationMetrics: S.optional(__S(273, __c17, 1)),
          savingsOpportunity: S.optional(__S(257, __c16, 1)),
          savingsOpportunityAfterDiscounts: S.optional(__S(257, __c16, 1)),
        }),
      ).annotate({ identifier: "LambdaFunctionMemoryRecommendationOption" });
    case 2:
      return S.Array(__S(561, __c35, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ savingsEstimationMode: S.optional(__S(240, __c15, 0)) }),
      ).annotate({ identifier: "LambdaEffectiveRecommendationPreferences" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          functionArn: S.optional(S.String),
          functionVersion: S.optional(S.String),
          accountId: S.optional(S.String),
          currentMemorySize: S.optional(S.Number),
          numberOfInvocations: S.optional(S.Number),
          utilizationMetrics: S.optional(__S(273, __c17, 1)),
          lookbackPeriodInDays: S.optional(S.Number),
          lastRefreshTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          finding: S.optional(S.String),
          findingReasonCodes: S.optional(__S(704, __c44, 0)),
          memorySizeRecommendationOptions: S.optional(__S(562, __c35, 2)),
          currentPerformanceRisk: S.optional(S.String),
          effectiveRecommendationPreferences: S.optional(__S(563, __c35, 3)),
          tags: S.optional(__S(369, __c23, 1)),
        }),
      ).annotate({ identifier: "LambdaFunctionRecommendation" });
    case 5:
      return S.Array(__S(564, __c35, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          lambdaFunctionRecommendations: S.optional(__S(565, __c35, 5)),
        }),
      ).annotate({ identifier: "GetLambdaFunctionRecommendationsResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArns: S.optional(__S(32, __c2, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          filters: S.optional(__S(49, __c3, 1)),
          accountIds: S.optional(__S(32, __c2, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetLicenseRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ provider: S.optional(S.String), providerArn: S.optional(S.String) }),
      ).annotate({ identifier: "MetricSource" });
    case 2:
      return S.Array(__S(577, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          numberOfCores: S.optional(S.Number),
          instanceType: S.optional(S.String),
          operatingSystem: S.optional(S.String),
          licenseEdition: S.optional(S.String),
          licenseName: S.optional(S.String),
          licenseModel: S.optional(S.String),
          licenseVersion: S.optional(S.String),
          metricsSource: S.optional(__S(578, __c36, 2)),
        }),
      ).annotate({ identifier: "LicenseConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          rank: S.optional(S.Number),
          operatingSystem: S.optional(S.String),
          licenseEdition: S.optional(S.String),
          licenseModel: S.optional(S.String),
          savingsOpportunity: S.optional(__S(257, __c16, 1)),
        }),
      ).annotate({ identifier: "LicenseRecommendationOption" });
    case 5:
      return S.Array(__S(580, __c36, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.optional(S.String),
          accountId: S.optional(S.String),
          currentLicenseConfiguration: S.optional(__S(579, __c36, 3)),
          lookbackPeriodInDays: S.optional(S.Number),
          lastRefreshTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          finding: S.optional(S.String),
          findingReasonCodes: S.optional(__S(704, __c44, 0)),
          licenseRecommendationOptions: S.optional(__S(581, __c36, 5)),
          tags: S.optional(__S(369, __c23, 1)),
        }),
      ).annotate({ identifier: "LicenseRecommendation" });
    case 7:
      return S.Array(__S(582, __c36, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          licenseRecommendations: S.optional(__S(583, __c36, 7)),
          errors: S.optional(__S(289, __c18, 1)),
        }),
      ).annotate({ identifier: "GetLicenseRecommendationsResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String,
          stat: S.String,
          period: S.Number,
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          recommendationPreferences: S.optional(__S(96, __c6, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetRDSDatabaseRecommendationProjectedMetricsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          recommendedDBInstanceClass: S.optional(S.String),
          rank: S.optional(S.Number),
          projectedMetrics: S.optional(__S(449, __c28, 1)),
        }),
      ).annotate({ identifier: "RDSDatabaseRecommendedOptionProjectedMetric" });
    case 2:
      return S.Array(__S(593, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ recommendedOptionProjectedMetrics: S.optional(__S(594, __c37, 2)) }),
      ).annotate({ identifier: "GetRDSDatabaseRecommendationProjectedMetricsResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArns: S.optional(__S(32, __c2, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          filters: S.optional(__S(49, __c3, 1)),
          accountIds: S.optional(__S(32, __c2, 0)),
          recommendationPreferences: S.optional(__S(96, __c6, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetRDSDatabaseRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          storageType: S.optional(S.String),
          allocatedStorage: S.optional(S.Number),
          iops: S.optional(S.Number),
          maxAllocatedStorage: S.optional(S.Number),
          storageThroughput: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DBStorageConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          dbInstanceClass: S.optional(S.String),
          projectedUtilizationMetrics: S.optional(__S(273, __c17, 1)),
          performanceRisk: S.optional(S.Number),
          rank: S.optional(S.Number),
          savingsOpportunity: S.optional(__S(257, __c16, 1)),
          savingsOpportunityAfterDiscounts: S.optional(__S(257, __c16, 1)),
        }),
      ).annotate({ identifier: "RDSDBInstanceRecommendationOption" });
    case 3:
      return S.Array(__S(610, __c38, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          storageConfiguration: S.optional(__S(609, __c38, 1)),
          rank: S.optional(S.Number),
          savingsOpportunity: S.optional(__S(257, __c16, 1)),
          savingsOpportunityAfterDiscounts: S.optional(__S(257, __c16, 1)),
          estimatedMonthlyVolumeIOPsCostVariation: S.optional(S.String),
        }),
      ).annotate({ identifier: "RDSDBStorageRecommendationOption" });
    case 5:
      return S.Array(__S(612, __c38, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          cpuVendorArchitectures: S.optional(__S(704, __c44, 0)),
          enhancedInfrastructureMetrics: S.optional(S.String),
          lookBackPeriod: S.optional(S.String),
          savingsEstimationMode: S.optional(__S(240, __c15, 0)),
        }),
      ).annotate({ identifier: "RDSEffectiveRecommendationPreferences" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.optional(S.String),
          accountId: S.optional(S.String),
          engine: S.optional(S.String),
          engineVersion: S.optional(S.String),
          promotionTier: S.optional(S.Number),
          currentDBInstanceClass: S.optional(S.String),
          currentStorageConfiguration: S.optional(__S(609, __c38, 1)),
          dbClusterIdentifier: S.optional(S.String),
          idle: S.optional(S.String),
          instanceFinding: S.optional(S.String),
          storageFinding: S.optional(S.String),
          instanceFindingReasonCodes: S.optional(__S(704, __c44, 0)),
          currentInstancePerformanceRisk: S.optional(S.String),
          currentStorageEstimatedMonthlyVolumeIOPsCostVariation: S.optional(S.String),
          storageFindingReasonCodes: S.optional(__S(704, __c44, 0)),
          instanceRecommendationOptions: S.optional(__S(611, __c38, 3)),
          storageRecommendationOptions: S.optional(__S(613, __c38, 5)),
          utilizationMetrics: S.optional(__S(273, __c17, 1)),
          effectiveRecommendationPreferences: S.optional(__S(614, __c38, 6)),
          lookbackPeriodInDays: S.optional(S.Number),
          lastRefreshTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(369, __c23, 1)),
        }),
      ).annotate({ identifier: "RDSDBRecommendation" });
    case 8:
      return S.Array(__S(615, __c38, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          rdsDBRecommendations: S.optional(__S(616, __c38, 8)),
          errors: S.optional(__S(289, __c18, 1)),
        }),
      ).annotate({ identifier: "GetRDSDatabaseRecommendationsResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.String,
          scope: S.optional(__S(720, __c45, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetRecommendationPreferencesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          scope: S.optional(__S(720, __c45, 0)),
          resourceType: S.optional(S.String),
          enhancedInfrastructureMetrics: S.optional(S.String),
          inferredWorkloadTypes: S.optional(S.String),
          externalMetricsPreference: S.optional(__S(240, __c15, 0)),
          lookBackPeriod: S.optional(S.String),
          utilizationPreferences: S.optional(__S(338, __c21, 2)),
          preferredResources: S.optional(__S(321, __c20, 1)),
          savingsEstimationMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecommendationPreferencesDetail" });
    case 2:
      return S.Array(__S(625, __c39, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          recommendationPreferencesDetails: S.optional(__S(626, __c39, 2)),
        }),
      ).annotate({ identifier: "GetRecommendationPreferencesResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountIds: S.optional(__S(32, __c2, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetRecommendationSummariesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), value: S.optional(S.Number) }),
      ).annotate({ identifier: "ReasonCodeSummary" });
    case 2:
      return S.Array(__S(641, __c40, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          value: S.optional(S.Number),
          reasonCodeSummaries: S.optional(__S(642, __c40, 2)),
        }),
      ).annotate({ identifier: "Summary" });
    case 4:
      return S.Array(__S(643, __c40, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          high: S.optional(S.Number),
          medium: S.optional(S.Number),
          low: S.optional(S.Number),
          veryLow: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CurrentPerformanceRiskRatings" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          inferredWorkloadTypes: S.optional(__S(704, __c44, 0)),
          estimatedMonthlySavings: S.optional(__S(256, __c16, 0)),
        }),
      ).annotate({ identifier: "InferredWorkloadSaving" });
    case 7:
      return S.Array(__S(646, __c40, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          summaries: S.optional(__S(644, __c40, 4)),
          idleSummaries: S.optional(__S(642, __c40, 2)),
          recommendationResourceType: S.optional(S.String),
          accountId: S.optional(S.String),
          savingsOpportunity: S.optional(__S(257, __c16, 1)),
          idleSavingsOpportunity: S.optional(__S(257, __c16, 1)),
          aggregatedSavingsOpportunity: S.optional(__S(257, __c16, 1)),
          currentPerformanceRiskRatings: S.optional(__S(645, __c40, 5)),
          inferredWorkloadSavings: S.optional(__S(647, __c40, 7)),
        }),
      ).annotate({ identifier: "RecommendationSummary" });
    case 9:
      return S.Array(__S(648, __c40, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          recommendationSummaries: S.optional(__S(649, __c40, 9)),
        }),
      ).annotate({ identifier: "GetRecommendationSummariesResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          includeList: S.optional(__S(32, __c2, 0)),
          excludeList: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "PreferredResource" });
    case 1:
      return S.Array(__S(656, __c41, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.String,
          scope: S.optional(__S(720, __c45, 0)),
          enhancedInfrastructureMetrics: S.optional(S.String),
          inferredWorkloadTypes: S.optional(S.String),
          externalMetricsPreference: S.optional(__S(240, __c15, 0)),
          lookBackPeriod: S.optional(S.String),
          utilizationPreferences: S.optional(__S(338, __c21, 2)),
          preferredResources: S.optional(__S(657, __c41, 1)),
          savingsEstimationMode: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutRecommendationPreferencesRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ status: S.String, includeMemberAccounts: S.optional(S.Boolean) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateEnrollmentStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), statusReason: S.optional(S.String) }),
      ).annotate({ identifier: "UpdateEnrollmentStatusResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.String,
          scope: S.optional(__S(720, __c45, 0)),
          recommendationPreferenceNames: __S(704, __c44, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteRecommendationPreferencesRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "Scope" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeleteRecommendationPreferencesResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
