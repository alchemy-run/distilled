import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "ObservabilityAdmin",
  target: "ObservabilityAdmin",
  version: "2018-05-10",
  sigv4: "observabilityadmin",
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
                `https://observabilityadmin-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://observabilityadmin-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://observabilityadmin.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://observabilityadmin.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError(
    "AccessDeniedException",
    ["BadRequestError", "AuthError"],
    { status: 400, headers: { amznErrorType: "x-amzn-ErrorType" } },
  )<{ readonly message?: string; readonly amznErrorType?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message?: string;
    readonly ResourceId?: string;
    readonly ResourceType?: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    {
      status: 500,
      headers: {
        amznErrorType: "x-amzn-ErrorType",
        retryAfterSeconds: ["Retry-After", "num"],
      },
    },
  )<{
    readonly message?: string;
    readonly amznErrorType?: string;
    readonly retryAfterSeconds?: number;
  }> {}
export class InvalidStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidStateException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message?: string;
    readonly ResourceId?: string;
    readonly ResourceType?: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402, headers: { amznErrorType: "x-amzn-ErrorType" } },
  )<{
    readonly message?: string;
    readonly ResourceId?: string;
    readonly ResourceType?: string;
    readonly ServiceCode?: string;
    readonly QuotaCode?: string;
    readonly amznErrorType?: string;
  }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly Errors?: ValidationError[] }> {}
export type RuleName = string;
export type Region = string;
export type Regions = string[];
export type SourceFilterString = string;
export type LogsFilterString = string;
export type DataSourceFilterString = string;
export type EncryptedLogGroupStrategy = "ALLOW" | "SKIP" | (string & {});
export interface SourceLogsConfiguration {
  LogGroupSelectionCriteria?: string;
  DataSourceSelectionCriteria?: string;
  EncryptedLogGroupStrategy: EncryptedLogGroupStrategy;
}
export type MetricsFilterString = string;
export interface SourceMetricsConfiguration {
  MetricsSelectionCriteria?: string;
}
export interface CentralizationRuleSource {
  Regions: string[];
  Scope?: string;
  SourceLogsConfiguration?: SourceLogsConfiguration;
  SourceMetricsConfiguration?: SourceMetricsConfiguration;
}
export type AccountIdentifier = string;
export type EncryptionStrategy =
  | "CUSTOMER_MANAGED"
  | "AWS_OWNED"
  | (string & {});
export type ResourceArn = string;
export type EncryptionConflictResolutionStrategy =
  | "ALLOW"
  | "SKIP"
  | (string & {});
export type EncryptionScope =
  | "ENCRYPTED_SOURCE_ONLY"
  | "NEW_DESTINATION_LOG_GROUPS"
  | (string & {});
export interface LogsEncryptionConfiguration {
  EncryptionStrategy: EncryptionStrategy;
  KmsKeyArn?: string;
  EncryptionConflictResolutionStrategy?: EncryptionConflictResolutionStrategy;
  EncryptionScope?: EncryptionScope;
}
export interface LogsBackupConfiguration {
  Region: string;
  KmsKeyArn?: string;
}
export type LogGroupNamePattern = string;
export interface LogGroupNameConfiguration {
  LogGroupNamePattern: string;
}
export type IamRoleArn = string;
export type TagConflictResolutionStrategy =
  | "IN_SYNC"
  | "ADD_ONLY"
  | "UPDATE_SYNC"
  | (string & {});
export interface TagPropagationConfiguration {
  DestinationRoleArn: string;
  TagConflictResolutionStrategy?: TagConflictResolutionStrategy;
}
export interface DestinationLogsConfiguration {
  LogsEncryptionConfiguration?: LogsEncryptionConfiguration;
  BackupConfiguration?: LogsBackupConfiguration;
  LogGroupNameConfiguration?: LogGroupNameConfiguration;
  TagPropagationConfiguration?: TagPropagationConfiguration;
}
export interface MetricsBackupConfiguration {
  Region: string;
}
export interface DestinationMetricsConfiguration {
  BackupConfiguration?: MetricsBackupConfiguration;
}
export interface CentralizationRuleDestination {
  Region: string;
  Account?: string;
  DestinationLogsConfiguration?: DestinationLogsConfiguration;
  DestinationMetricsConfiguration?: DestinationMetricsConfiguration;
}
export interface CentralizationRule {
  Source: CentralizationRuleSource;
  Destination: CentralizationRuleDestination;
}
export type TagKey = string;
export type TagValue = string;
export type TagMapInput = { [key: string]: string | undefined };
export interface CreateCentralizationRuleForOrganizationInput {
  RuleName: string;
  Rule: CentralizationRule;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateCentralizationRuleForOrganizationOutput {
  RuleArn?: string;
}
export type SSEAlgorithm = "aws:kms" | "AES256" | (string & {});
export interface Encryption {
  SseAlgorithm: SSEAlgorithm;
  KmsKeyArn?: string;
}
export interface CreateS3TableIntegrationInput {
  Encryption: Encryption;
  RoleArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateS3TableIntegrationOutput {
  Arn?: string;
}
export type TelemetryPipelineName = string;
export type TelemetryPipelineConfigurationBody = string;
export interface TelemetryPipelineConfiguration {
  Body: string;
}
export interface CreateTelemetryPipelineInput {
  Name: string;
  Configuration: TelemetryPipelineConfiguration;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateTelemetryPipelineOutput {
  Arn?: string;
}
export type ResourceType =
  | "AWS::EC2::Instance"
  | "AWS::EC2::VPC"
  | "AWS::Lambda::Function"
  | "AWS::CloudTrail"
  | "AWS::EKS::Cluster"
  | "AWS::WAFv2::WebACL"
  | "AWS::ElasticLoadBalancingV2::LoadBalancer"
  | "AWS::Route53Resolver::ResolverEndpoint"
  | "AWS::BedrockAgentCore::Runtime"
  | "AWS::BedrockAgentCore::Browser"
  | "AWS::BedrockAgentCore::CodeInterpreter"
  | "AWS::BedrockAgentCore::Gateway"
  | "AWS::BedrockAgentCore::Memory"
  | "AWS::BedrockAgentCore::WorkloadIdentity"
  | "AWS::SecurityHub::Hub"
  | "AWS::CloudFront::Distribution"
  | "AWS::SecurityHub::HubV2"
  | "AWS::CloudWatch::OTelEnrichment"
  | "AWS::MSK::Cluster"
  | "AWS::S3::Bucket"
  | "AWS::Bedrock::KnowledgeBase"
  | (string & {});
export type TelemetryType = "Logs" | "Metrics" | "Traces" | (string & {});
export type TelemetrySourceType =
  | "VPC_FLOW_LOGS"
  | "ROUTE53_RESOLVER_QUERY_LOGS"
  | "EKS_AUDIT_LOGS"
  | "EKS_AUTHENTICATOR_LOGS"
  | "EKS_CONTROLLER_MANAGER_LOGS"
  | "EKS_SCHEDULER_LOGS"
  | "EKS_API_LOGS"
  | (string & {});
export type TelemetrySourceTypes = TelemetrySourceType[];
export type DestinationType = "cloud-watch-logs" | (string & {});
export type RetentionPeriodInDays = number;
export interface VPCFlowLogParameters {
  LogFormat?: string;
  TrafficType?: string;
  MaxAggregationInterval?: number;
}
export type StringList = string[];
export interface AdvancedFieldSelector {
  Field: string;
  Equals?: string[];
  StartsWith?: string[];
  EndsWith?: string[];
  NotEquals?: string[];
  NotStartsWith?: string[];
  NotEndsWith?: string[];
}
export type FieldSelectors = AdvancedFieldSelector[];
export interface AdvancedEventSelector {
  Name?: string;
  FieldSelectors: AdvancedFieldSelector[];
}
export type AdvancedEventSelectors = AdvancedEventSelector[];
export interface CloudtrailParameters {
  AdvancedEventSelectors: AdvancedEventSelector[];
}
export type OutputFormat = "plain" | "json" | (string & {});
export interface ELBLoadBalancerLoggingParameters {
  OutputFormat?: OutputFormat;
  FieldDelimiter?: string;
}
export interface SingleHeader {
  Name?: string;
}
export interface FieldToMatch {
  SingleHeader?: SingleHeader;
  UriPath?: string;
  QueryString?: string;
  Method?: string;
}
export type RedactedFields = FieldToMatch[];
export type FilterBehavior = "KEEP" | "DROP" | (string & {});
export type FilterRequirement = "MEETS_ALL" | "MEETS_ANY" | (string & {});
export type Action =
  | "ALLOW"
  | "BLOCK"
  | "COUNT"
  | "CAPTCHA"
  | "CHALLENGE"
  | "EXCLUDED_AS_COUNT"
  | (string & {});
export interface ActionCondition {
  Action?: Action;
}
export interface LabelNameCondition {
  LabelName?: string;
}
export interface Condition {
  ActionCondition?: ActionCondition;
  LabelNameCondition?: LabelNameCondition;
}
export type Conditions = Condition[];
export interface Filter {
  Behavior?: FilterBehavior;
  Requirement?: FilterRequirement;
  Conditions?: Condition[];
}
export type Filters = Filter[];
export interface LoggingFilter {
  Filters?: Filter[];
  DefaultBehavior?: FilterBehavior;
}
export type WAFLogType = "WAF_LOGS" | (string & {});
export interface WAFLoggingParameters {
  RedactedFields?: FieldToMatch[];
  LoggingFilter?: LoggingFilter;
  LogType?: WAFLogType;
}
export type LogType =
  | "APPLICATION_LOGS"
  | "USAGE_LOGS"
  | "SECURITY_FINDING_LOGS"
  | "ACCESS_LOGS"
  | "CONNECTION_LOGS"
  | "S3_SERVER_ACCESS_LOGS"
  | "ALB_ACCESS_LOGS"
  | "ALB_CONNECTION_LOGS"
  | "ALB_HEALTH_CHECK_LOGS"
  | (string & {});
export type LogTypes = LogType[];
export interface LogDeliveryParameters {
  LogTypes?: LogType[];
}
export type MskEnhancedMonitoringLevel =
  | "DEFAULT"
  | "PER_BROKER"
  | "PER_TOPIC_PER_BROKER"
  | "PER_TOPIC_PER_PARTITION"
  | (string & {});
export interface MskMonitoringParameters {
  EnhancedMonitoring?: MskEnhancedMonitoringLevel;
}
export type KmsKeyArn = string;
export interface TelemetryDestinationConfiguration {
  DestinationType?: DestinationType;
  DestinationPattern?: string;
  RetentionInDays?: number;
  VPCFlowLogParameters?: VPCFlowLogParameters;
  CloudtrailParameters?: CloudtrailParameters;
  ELBLoadBalancerLoggingParameters?: ELBLoadBalancerLoggingParameters;
  WAFLoggingParameters?: WAFLoggingParameters;
  LogDeliveryParameters?: LogDeliveryParameters;
  MskMonitoringParameters?: MskMonitoringParameters;
  KmsKeyArn?: string;
}
export type AllRegions = boolean;
export interface TelemetryRule {
  ResourceType?: ResourceType;
  TelemetryType: TelemetryType;
  TelemetrySourceTypes?: TelemetrySourceType[];
  DestinationConfiguration?: TelemetryDestinationConfiguration;
  Scope?: string;
  SelectionCriteria?: string;
  AllowFieldUpdates?: boolean;
  Regions?: string[];
  AllRegions?: boolean;
}
export interface CreateTelemetryRuleInput {
  RuleName: string;
  Rule: TelemetryRule;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateTelemetryRuleOutput {
  RuleArn?: string;
}
export interface CreateTelemetryRuleForOrganizationInput {
  RuleName: string;
  Rule: TelemetryRule;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateTelemetryRuleForOrganizationOutput {
  RuleArn?: string;
}
export type RuleIdentifier = string;
export interface DeleteCentralizationRuleForOrganizationInput {
  RuleIdentifier: string;
}
export interface DeleteCentralizationRuleForOrganizationResponse {}
export interface DeleteS3TableIntegrationInput {
  Arn: string;
}
export interface DeleteS3TableIntegrationResponse {}
export type TelemetryPipelineIdentifier = string;
export interface DeleteTelemetryPipelineInput {
  PipelineIdentifier: string;
}
export interface DeleteTelemetryPipelineOutput {}
export interface DeleteTelemetryRuleInput {
  RuleIdentifier: string;
}
export interface DeleteTelemetryRuleResponse {}
export interface DeleteTelemetryRuleForOrganizationInput {
  RuleIdentifier: string;
}
export interface DeleteTelemetryRuleForOrganizationResponse {}
export interface GetCentralizationRuleForOrganizationInput {
  RuleIdentifier: string;
}
export type RuleHealth =
  | "Healthy"
  | "Unhealthy"
  | "Provisioning"
  | (string & {});
export type CentralizationFailureReason =
  | "TRUSTED_ACCESS_NOT_ENABLED"
  | "DESTINATION_ACCOUNT_NOT_IN_ORGANIZATION"
  | "INTERNAL_SERVER_ERROR"
  | (string & {});
export type TagPropagationStatus = "Healthy" | "Unhealthy" | (string & {});
export type TagPropagationFailureReason =
  | "RoleNotAssumable"
  | "RoleLacksPermissions"
  | (string & {});
export interface GetCentralizationRuleForOrganizationOutput {
  RuleName?: string;
  RuleArn?: string;
  CreatorAccountId?: string;
  CreatedTimeStamp?: number;
  CreatedRegion?: string;
  LastUpdateTimeStamp?: number;
  RuleHealth?: RuleHealth;
  FailureReason?: CentralizationFailureReason;
  TagPropagationStatus?: TagPropagationStatus;
  TagPropagationFailureReason?: TagPropagationFailureReason;
  CentralizationRule?: CentralizationRule;
}
export interface GetS3TableIntegrationInput {
  Arn: string;
}
export type IntegrationStatus = "ACTIVE" | "DELETING" | (string & {});
export interface GetS3TableIntegrationOutput {
  Arn?: string;
  RoleArn?: string;
  Status?: IntegrationStatus;
  Encryption?: Encryption;
  DestinationTableBucketArn?: string;
  CreatedTimeStamp?: number;
}
export interface GetTelemetryEnrichmentStatusRequest {}
export type TelemetryEnrichmentStatus =
  | "Running"
  | "Stopped"
  | "Impaired"
  | (string & {});
export type AwsResourceExplorerManagedViewArn = string;
export interface GetTelemetryEnrichmentStatusOutput {
  Status?: TelemetryEnrichmentStatus;
  AwsResourceExplorerManagedViewArn?: string;
}
export interface GetTelemetryEvaluationStatusRequest {}
export type Status =
  | "NOT_STARTED"
  | "STARTING"
  | "FAILED_START"
  | "RUNNING"
  | "STOPPING"
  | "FAILED_STOP"
  | "STOPPED"
  | (string & {});
export type FailureReason = string;
export interface RegionStatus {
  Region?: string;
  Status?: string;
  FailureReason?: string;
  RuleArn?: string;
}
export type RegionStatuses = RegionStatus[];
export interface GetTelemetryEvaluationStatusOutput {
  Status?: Status;
  FailureReason?: string;
  HomeRegion?: string;
  RegionStatuses?: RegionStatus[];
}
export interface GetTelemetryEvaluationStatusForOrganizationRequest {}
export interface GetTelemetryEvaluationStatusForOrganizationOutput {
  Status?: Status;
  FailureReason?: string;
  HomeRegion?: string;
  RegionStatuses?: RegionStatus[];
}
export interface GetTelemetryPipelineInput {
  PipelineIdentifier: string;
}
export type TelemetryPipelineStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | (string & {});
export interface TelemetryPipelineStatusReason {
  Description?: string;
}
export type TagMapOutput = { [key: string]: string | undefined };
export interface TelemetryPipeline {
  CreatedTimeStamp?: number;
  LastUpdateTimeStamp?: number;
  Arn?: string;
  Name?: string;
  Configuration?: TelemetryPipelineConfiguration;
  Status?: TelemetryPipelineStatus;
  StatusReason?: TelemetryPipelineStatusReason;
  Tags?: { [key: string]: string | undefined };
}
export interface GetTelemetryPipelineOutput {
  Pipeline?: TelemetryPipeline;
}
export interface GetTelemetryRuleInput {
  RuleIdentifier: string;
}
export type IsReplicated = boolean;
export interface GetTelemetryRuleOutput {
  RuleName?: string;
  RuleArn?: string;
  CreatedTimeStamp?: number;
  LastUpdateTimeStamp?: number;
  TelemetryRule?: TelemetryRule;
  HomeRegion?: string;
  IsReplicated?: boolean;
  RegionStatuses?: RegionStatus[];
}
export interface GetTelemetryRuleForOrganizationInput {
  RuleIdentifier: string;
}
export interface GetTelemetryRuleForOrganizationOutput {
  RuleName?: string;
  RuleArn?: string;
  CreatedTimeStamp?: number;
  LastUpdateTimeStamp?: number;
  TelemetryRule?: TelemetryRule;
  HomeRegion?: string;
  IsReplicated?: boolean;
  RegionStatuses?: RegionStatus[];
}
export type ListCentralizationRulesForOrganizationMaxResults = number;
export type NextToken = string;
export interface ListCentralizationRulesForOrganizationInput {
  RuleNamePrefix?: string;
  AllRegions?: boolean;
  MaxResults?: number;
  NextToken?: string;
}
export interface CentralizationRuleSummary {
  RuleName?: string;
  RuleArn?: string;
  CreatorAccountId?: string;
  CreatedTimeStamp?: number;
  CreatedRegion?: string;
  LastUpdateTimeStamp?: number;
  RuleHealth?: RuleHealth;
  FailureReason?: CentralizationFailureReason;
  TagPropagationStatus?: TagPropagationStatus;
  TagPropagationFailureReason?: TagPropagationFailureReason;
  DestinationAccountId?: string;
  DestinationRegion?: string;
}
export type CentralizationRuleSummaries = CentralizationRuleSummary[];
export interface ListCentralizationRulesForOrganizationOutput {
  CentralizationRuleSummaries?: CentralizationRuleSummary[];
  NextToken?: string;
}
export type ResourceIdentifierPrefix = string;
export type ResourceTypes = ResourceType[];
export type TelemetryState =
  | "Enabled"
  | "Disabled"
  | "NotApplicable"
  | (string & {});
export type TelemetryConfigurationState = {
  [key in TelemetryType]?: TelemetryState;
};
export type ListResourceTelemetryMaxResults = number;
export interface ListResourceTelemetryInput {
  ResourceIdentifierPrefix?: string;
  ResourceTypes?: ResourceType[];
  TelemetryConfigurationState?: { [key: string]: TelemetryState | undefined };
  ResourceTags?: { [key: string]: string | undefined };
  MaxResults?: number;
  NextToken?: string;
}
export type ResourceIdentifier = string;
export interface TelemetryConfiguration {
  AccountIdentifier?: string;
  TelemetryConfigurationState?: { [key: string]: TelemetryState | undefined };
  ResourceType?: ResourceType;
  ResourceIdentifier?: string;
  ResourceTags?: { [key: string]: string | undefined };
  LastUpdateTimeStamp?: number;
  TelemetrySourceType?: TelemetrySourceType;
}
export type TelemetryConfigurations = TelemetryConfiguration[];
export interface ListResourceTelemetryOutput {
  TelemetryConfigurations?: TelemetryConfiguration[];
  NextToken?: string;
}
export type AccountIdentifiers = string[];
export type ListResourceTelemetryForOrganizationMaxResults = number;
export interface ListResourceTelemetryForOrganizationInput {
  AccountIdentifiers?: string[];
  ResourceIdentifierPrefix?: string;
  ResourceTypes?: ResourceType[];
  TelemetryConfigurationState?: { [key: string]: TelemetryState | undefined };
  ResourceTags?: { [key: string]: string | undefined };
  MaxResults?: number;
  NextToken?: string;
}
export interface ListResourceTelemetryForOrganizationOutput {
  TelemetryConfigurations?: TelemetryConfiguration[];
  NextToken?: string;
}
export type ListS3TableIntegrationsMaxResults = number;
export interface ListS3TableIntegrationsInput {
  MaxResults?: number;
  NextToken?: string;
}
export interface IntegrationSummary {
  Arn?: string;
  Status?: IntegrationStatus;
}
export type IntegrationSummaries = IntegrationSummary[];
export interface ListS3TableIntegrationsOutput {
  IntegrationSummaries?: IntegrationSummary[];
  NextToken?: string;
}
export interface ListTagsForResourceInput {
  ResourceARN: string;
}
export interface ListTagsForResourceOutput {
  Tags: { [key: string]: string | undefined };
}
export type ListTelemetryPipelinesMaxResults = number;
export interface ListTelemetryPipelinesInput {
  MaxResults?: number;
  NextToken?: string;
}
export interface Source {
  Type?: string;
}
export type Sources = Source[];
export interface DataSource {
  Name?: string;
  Type?: string;
}
export type DataSources = DataSource[];
export type Processors = string[];
export type Sinks = string[];
export interface ConfigurationSummary {
  Sources?: Source[];
  DataSources?: DataSource[];
  Processors?: string[];
  ProcessorCount?: number;
  Sinks?: string[];
}
export interface TelemetryPipelineSummary {
  CreatedTimeStamp?: number;
  LastUpdateTimeStamp?: number;
  Arn?: string;
  Name?: string;
  Status?: TelemetryPipelineStatus;
  Tags?: { [key: string]: string | undefined };
  ConfigurationSummary?: ConfigurationSummary;
}
export type TelemetryPipelineSummaries = TelemetryPipelineSummary[];
export interface ListTelemetryPipelinesOutput {
  PipelineSummaries?: TelemetryPipelineSummary[];
  NextToken?: string;
}
export type ListTelemetryRulesMaxResults = number;
export interface ListTelemetryRulesInput {
  RuleNamePrefix?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface TelemetryRuleSummary {
  RuleName?: string;
  RuleArn?: string;
  CreatedTimeStamp?: number;
  LastUpdateTimeStamp?: number;
  ResourceType?: ResourceType;
  TelemetryType?: TelemetryType;
  TelemetrySourceTypes?: TelemetrySourceType[];
}
export type TelemetryRuleSummaries = TelemetryRuleSummary[];
export interface ListTelemetryRulesOutput {
  TelemetryRuleSummaries?: TelemetryRuleSummary[];
  NextToken?: string;
}
export type OrganizationUnitIdentifier = string;
export type OrganizationUnitIdentifiers = string[];
export type ListTelemetryRulesForOrganizationMaxResults = number;
export interface ListTelemetryRulesForOrganizationInput {
  RuleNamePrefix?: string;
  SourceAccountIds?: string[];
  SourceOrganizationUnitIds?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export interface ListTelemetryRulesForOrganizationOutput {
  TelemetryRuleSummaries?: TelemetryRuleSummary[];
  NextToken?: string;
}
export interface StartTelemetryEnrichmentRequest {}
export interface StartTelemetryEnrichmentOutput {
  Status?: TelemetryEnrichmentStatus;
  AwsResourceExplorerManagedViewArn?: string;
}
export interface StartTelemetryEvaluationInput {
  Regions?: string[];
  AllRegions?: boolean;
}
export interface StartTelemetryEvaluationResponse {}
export interface StartTelemetryEvaluationForOrganizationInput {
  Regions?: string[];
  AllRegions?: boolean;
}
export interface StartTelemetryEvaluationForOrganizationResponse {}
export interface StopTelemetryEnrichmentRequest {}
export interface StopTelemetryEnrichmentOutput {
  Status?: TelemetryEnrichmentStatus;
}
export interface StopTelemetryEvaluationRequest {}
export interface StopTelemetryEvaluationResponse {}
export interface StopTelemetryEvaluationForOrganizationRequest {}
export interface StopTelemetryEvaluationForOrganizationResponse {}
export interface TagResourceInput {
  ResourceARN: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type RecordFormat = "STRING" | "JSON" | (string & {});
export interface Record {
  Data?: string;
  Type?: RecordFormat;
}
export type Records = Record[];
export type SignalType = "LOG" | "METRIC" | (string & {});
export interface TestTelemetryPipelineInput {
  Records: Record[];
  Configuration: TelemetryPipelineConfiguration;
  SignalType?: SignalType;
}
export interface PipelineOutputError {
  Message?: string;
}
export interface PipelineOutput {
  Record?: Record;
  Error?: PipelineOutputError;
}
export type PipelineOutputs = PipelineOutput[];
export interface TestTelemetryPipelineOutput {
  Results?: PipelineOutput[];
}
export type TagKeyList = string[];
export interface UntagResourceInput {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateCentralizationRuleForOrganizationInput {
  RuleIdentifier: string;
  Rule: CentralizationRule;
}
export interface UpdateCentralizationRuleForOrganizationOutput {
  RuleArn?: string;
}
export interface UpdateTelemetryPipelineInput {
  PipelineIdentifier: string;
  Configuration: TelemetryPipelineConfiguration;
}
export interface UpdateTelemetryPipelineOutput {}
export interface UpdateTelemetryRuleInput {
  RuleIdentifier: string;
  Rule: TelemetryRule;
}
export interface UpdateTelemetryRuleOutput {
  RuleArn?: string;
}
export interface UpdateTelemetryRuleForOrganizationInput {
  RuleIdentifier: string;
  Rule: TelemetryRule;
}
export interface UpdateTelemetryRuleForOrganizationOutput {
  RuleArn?: string;
}
export interface ValidateTelemetryPipelineConfigurationInput {
  Configuration: TelemetryPipelineConfiguration;
}
export type FieldMap = { [key: string]: string | undefined };
export interface ValidationError {
  Message?: string;
  Reason?: string;
  FieldMap?: { [key: string]: string | undefined };
}
export type ValidationErrors = ValidationError[];
export interface ValidateTelemetryPipelineConfigurationOutput {
  Errors?: ValidationError[];
}
export type CreateCentralizationRuleForOrganizationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a centralization rule that applies across an Amazon Web Services Organization. This operation can only be called by the organization's management account or a delegated administrator account.
 */
export const createCentralizationRuleForOrganization: API.OperationMethod<
  CreateCentralizationRuleForOrganizationInput,
  CreateCentralizationRuleForOrganizationOutput,
  CreateCentralizationRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateCentralizationRuleForOrganization",
    input: { RuleName: 0, Rule: i_CentralizationRule, Tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCentralizationRuleForOrganization",
})) as any;

export type CreateS3TableIntegrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Creates an integration between CloudWatch and S3 Tables for analytics. This integration enables querying CloudWatch telemetry data using analytics engines like Amazon Athena, Amazon Redshift, and Apache Spark.
 */
export const createS3TableIntegration: API.OperationMethod<
  CreateS3TableIntegrationInput,
  CreateS3TableIntegrationOutput,
  CreateS3TableIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateS3TableIntegration",
    input: {
      Encryption: { SseAlgorithm: 0, KmsKeyArn: 0 },
      RoleArn: 0,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateS3TableIntegration",
})) as any;

export type CreateTelemetryPipelineError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a telemetry pipeline for processing and transforming telemetry data. The pipeline defines how data flows from sources through processors to destinations, enabling data transformation and delivering capabilities.
 */
export const createTelemetryPipeline: API.OperationMethod<
  CreateTelemetryPipelineInput,
  CreateTelemetryPipelineOutput,
  CreateTelemetryPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateTelemetryPipeline",
    input: {
      Name: 0,
      Configuration: i_TelemetryPipelineConfiguration,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTelemetryPipeline",
})) as any;

export type CreateTelemetryRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a telemetry rule that defines how telemetry should be configured for Amazon Web Services resources in your account. The rule specifies which resources should have telemetry enabled and how that telemetry data should be collected based on resource type, telemetry type, and selection criteria.
 */
export const createTelemetryRule: API.OperationMethod<
  CreateTelemetryRuleInput,
  CreateTelemetryRuleOutput,
  CreateTelemetryRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateTelemetryRule",
    input: { RuleName: 0, Rule: i_TelemetryRule, Tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTelemetryRule",
})) as any;

export type CreateTelemetryRuleForOrganizationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a telemetry rule that applies across an Amazon Web Services Organization. This operation can only be called by the organization's management account or a delegated administrator account.
 */
export const createTelemetryRuleForOrganization: API.OperationMethod<
  CreateTelemetryRuleForOrganizationInput,
  CreateTelemetryRuleForOrganizationOutput,
  CreateTelemetryRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateTelemetryRuleForOrganization",
    input: { RuleName: 0, Rule: i_TelemetryRule, Tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTelemetryRuleForOrganization",
})) as any;

export type DeleteCentralizationRuleForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an organization-wide centralization rule. This operation can only be called by the organization's management account or a delegated administrator account.
 */
export const deleteCentralizationRuleForOrganization: API.OperationMethod<
  DeleteCentralizationRuleForOrganizationInput,
  DeleteCentralizationRuleForOrganizationResponse,
  DeleteCentralizationRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteCentralizationRuleForOrganization",
    input: { RuleIdentifier: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCentralizationRuleForOrganization",
})) as any;

export type DeleteS3TableIntegrationError =
  | AccessDeniedException
  | InternalServerException
  | InvalidStateException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an S3 Table integration and its associated data. This operation removes the connection between CloudWatch Observability Admin and S3 Tables.
 */
export const deleteS3TableIntegration: API.OperationMethod<
  DeleteS3TableIntegrationInput,
  DeleteS3TableIntegrationResponse,
  DeleteS3TableIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteS3TableIntegration",
    input: { Arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidStateException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteS3TableIntegration",
})) as any;

export type DeleteTelemetryPipelineError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a telemetry pipeline and its associated resources. This operation stops data processing and removes the pipeline configuration.
 */
export const deleteTelemetryPipeline: API.OperationMethod<
  DeleteTelemetryPipelineInput,
  DeleteTelemetryPipelineOutput,
  DeleteTelemetryPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteTelemetryPipeline",
    input: { PipelineIdentifier: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTelemetryPipeline",
})) as any;

export type DeleteTelemetryRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a telemetry rule from your account. Any telemetry configurations previously created by the rule will remain but no new resources will be configured by this rule.
 */
export const deleteTelemetryRule: API.OperationMethod<
  DeleteTelemetryRuleInput,
  DeleteTelemetryRuleResponse,
  DeleteTelemetryRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteTelemetryRule",
    input: { RuleIdentifier: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTelemetryRule",
})) as any;

export type DeleteTelemetryRuleForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an organization-wide telemetry rule. This operation can only be called by the organization's management account or a delegated administrator account.
 */
export const deleteTelemetryRuleForOrganization: API.OperationMethod<
  DeleteTelemetryRuleForOrganizationInput,
  DeleteTelemetryRuleForOrganizationResponse,
  DeleteTelemetryRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteTelemetryRuleForOrganization",
    input: { RuleIdentifier: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTelemetryRuleForOrganization",
})) as any;

export type GetCentralizationRuleForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific organization centralization rule. This operation can only be called by the organization's management account or a delegated administrator account.
 */
export const getCentralizationRuleForOrganization: API.OperationMethod<
  GetCentralizationRuleForOrganizationInput,
  GetCentralizationRuleForOrganizationOutput,
  GetCentralizationRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetCentralizationRuleForOrganization",
    input: { RuleIdentifier: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCentralizationRuleForOrganization",
})) as any;

export type GetS3TableIntegrationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific S3 Table integration, including its configuration, status, and metadata.
 */
export const getS3TableIntegration: API.OperationMethod<
  GetS3TableIntegrationInput,
  GetS3TableIntegrationOutput,
  GetS3TableIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetS3TableIntegration",
    input: { Arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetS3TableIntegration",
})) as any;

export type GetTelemetryEnrichmentStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the current status of the resource tags for telemetry feature, which enhances telemetry data with additional resource metadata from Resource Explorer.
 */
export const getTelemetryEnrichmentStatus: API.OperationMethod<
  GetTelemetryEnrichmentStatusRequest,
  GetTelemetryEnrichmentStatusOutput,
  GetTelemetryEnrichmentStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /GetTelemetryEnrichmentStatus" },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryEnrichmentStatus",
})) as any;

export type GetTelemetryEvaluationStatusError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the current onboarding status of the telemetry config feature, including the status of the feature and reason the feature failed to start or stop.
 */
export const getTelemetryEvaluationStatus: API.OperationMethod<
  GetTelemetryEvaluationStatusRequest,
  GetTelemetryEvaluationStatusOutput,
  GetTelemetryEvaluationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /GetTelemetryEvaluationStatus" },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryEvaluationStatus",
})) as any;

export type GetTelemetryEvaluationStatusForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * This returns the onboarding status of the telemetry configuration feature for the organization. It can only be called by a Management Account of an Amazon Web Services Organization or an assigned Delegated Admin Account of Amazon CloudWatch telemetry config.
 */
export const getTelemetryEvaluationStatusForOrganization: API.OperationMethod<
  GetTelemetryEvaluationStatusForOrganizationRequest,
  GetTelemetryEvaluationStatusForOrganizationOutput,
  GetTelemetryEvaluationStatusForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetTelemetryEvaluationStatusForOrganization",
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryEvaluationStatusForOrganization",
})) as any;

export type GetTelemetryPipelineError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific telemetry pipeline, including its configuration, status, and metadata.
 */
export const getTelemetryPipeline: API.OperationMethod<
  GetTelemetryPipelineInput,
  GetTelemetryPipelineOutput,
  GetTelemetryPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetTelemetryPipeline",
    input: { PipelineIdentifier: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryPipeline",
})) as any;

export type GetTelemetryRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific telemetry rule in your account.
 */
export const getTelemetryRule: API.OperationMethod<
  GetTelemetryRuleInput,
  GetTelemetryRuleOutput,
  GetTelemetryRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetTelemetryRule",
    input: { RuleIdentifier: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryRule",
})) as any;

export type GetTelemetryRuleForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific organization telemetry rule. This operation can only be called by the organization's management account or a delegated administrator account.
 */
export const getTelemetryRuleForOrganization: API.OperationMethod<
  GetTelemetryRuleForOrganizationInput,
  GetTelemetryRuleForOrganizationOutput,
  GetTelemetryRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetTelemetryRuleForOrganization",
    input: { RuleIdentifier: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryRuleForOrganization",
})) as any;

export type ListCentralizationRulesForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists all centralization rules in your organization. This operation can only be called by the organization's management account or a delegated administrator account.
 */
export const listCentralizationRulesForOrganization: API.PaginatedOperationMethod<
  ListCentralizationRulesForOrganizationInput,
  ListCentralizationRulesForOrganizationOutput,
  ListCentralizationRulesForOrganizationError,
  Credentials | HttpClient.HttpClient,
  CentralizationRuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListCentralizationRulesForOrganization",
    input: { RuleNamePrefix: 0, AllRegions: 0, MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCentralizationRulesForOrganization",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CentralizationRuleSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceTelemetryError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of telemetry configurations for Amazon Web Services resources supported by telemetry config. For more information, see Auditing CloudWatch telemetry configurations.
 */
export const listResourceTelemetry: API.PaginatedOperationMethod<
  ListResourceTelemetryInput,
  ListResourceTelemetryOutput,
  ListResourceTelemetryError,
  Credentials | HttpClient.HttpClient,
  TelemetryConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListResourceTelemetry",
    input: {
      ResourceIdentifierPrefix: 0,
      ResourceTypes: 0,
      TelemetryConfigurationState: 0,
      ResourceTags: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceTelemetry",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TelemetryConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceTelemetryForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of telemetry configurations for Amazon Web Services resources supported by telemetry config in the organization.
 */
export const listResourceTelemetryForOrganization: API.PaginatedOperationMethod<
  ListResourceTelemetryForOrganizationInput,
  ListResourceTelemetryForOrganizationOutput,
  ListResourceTelemetryForOrganizationError,
  Credentials | HttpClient.HttpClient,
  TelemetryConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListResourceTelemetryForOrganization",
    input: {
      AccountIdentifiers: 0,
      ResourceIdentifierPrefix: 0,
      ResourceTypes: 0,
      TelemetryConfigurationState: 0,
      ResourceTags: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceTelemetryForOrganization",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TelemetryConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListS3TableIntegrationsError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists all S3 Table integrations in your account. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const listS3TableIntegrations: API.PaginatedOperationMethod<
  ListS3TableIntegrationsInput,
  ListS3TableIntegrationsOutput,
  ListS3TableIntegrationsError,
  Credentials | HttpClient.HttpClient,
  IntegrationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListS3TableIntegrations",
    input: { MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListS3TableIntegrations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "IntegrationSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags attached to the specified resource. Supports telemetry rule resources and telemetry pipeline resources.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListTagsForResource",
    input: { ResourceARN: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTelemetryPipelinesError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of telemetry pipelines in your account. Returns up to 100 results. If more than 100 telemetry pipelines exist, include the `NextToken` value from the response to retrieve the next set of results.
 */
export const listTelemetryPipelines: API.PaginatedOperationMethod<
  ListTelemetryPipelinesInput,
  ListTelemetryPipelinesOutput,
  ListTelemetryPipelinesError,
  Credentials | HttpClient.HttpClient,
  TelemetryPipelineSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListTelemetryPipelines",
    input: { MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTelemetryPipelines",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PipelineSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTelemetryRulesError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists all telemetry rules in your account. You can filter the results by specifying a rule name prefix.
 */
export const listTelemetryRules: API.PaginatedOperationMethod<
  ListTelemetryRulesInput,
  ListTelemetryRulesOutput,
  ListTelemetryRulesError,
  Credentials | HttpClient.HttpClient,
  TelemetryRuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListTelemetryRules",
    input: { RuleNamePrefix: 0, MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTelemetryRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TelemetryRuleSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTelemetryRulesForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists all telemetry rules in your organization. This operation can only be called by the organization's management account or a delegated administrator account.
 */
export const listTelemetryRulesForOrganization: API.PaginatedOperationMethod<
  ListTelemetryRulesForOrganizationInput,
  ListTelemetryRulesForOrganizationOutput,
  ListTelemetryRulesForOrganizationError,
  Credentials | HttpClient.HttpClient,
  TelemetryRuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListTelemetryRulesForOrganization",
    input: {
      RuleNamePrefix: 0,
      SourceAccountIds: 0,
      SourceOrganizationUnitIds: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTelemetryRulesForOrganization",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TelemetryRuleSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartTelemetryEnrichmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the resource tags for telemetry feature for your account, which enhances telemetry data with additional resource metadata from Resource Explorer to provide richer context for monitoring and observability.
 */
export const startTelemetryEnrichment: API.OperationMethod<
  StartTelemetryEnrichmentRequest,
  StartTelemetryEnrichmentOutput,
  StartTelemetryEnrichmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /StartTelemetryEnrichment" },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTelemetryEnrichment",
})) as any;

export type StartTelemetryEvaluationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * This action begins onboarding the caller Amazon Web Services account to the telemetry config feature.
 */
export const startTelemetryEvaluation: API.OperationMethod<
  StartTelemetryEvaluationInput,
  StartTelemetryEvaluationResponse,
  StartTelemetryEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StartTelemetryEvaluation",
    input: { Regions: 0, AllRegions: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTelemetryEvaluation",
})) as any;

export type StartTelemetryEvaluationForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * This actions begins onboarding the organization and all member accounts to the telemetry config feature.
 */
export const startTelemetryEvaluationForOrganization: API.OperationMethod<
  StartTelemetryEvaluationForOrganizationInput,
  StartTelemetryEvaluationForOrganizationResponse,
  StartTelemetryEvaluationForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StartTelemetryEvaluationForOrganization",
    input: { Regions: 0, AllRegions: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTelemetryEvaluationForOrganization",
})) as any;

export type StopTelemetryEnrichmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the resource tags for telemetry feature for your account, stopping the enhancement of telemetry data with additional resource metadata.
 */
export const stopTelemetryEnrichment: API.OperationMethod<
  StopTelemetryEnrichmentRequest,
  StopTelemetryEnrichmentOutput,
  StopTelemetryEnrichmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /StopTelemetryEnrichment" },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTelemetryEnrichment",
})) as any;

export type StopTelemetryEvaluationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * This action begins offboarding the caller Amazon Web Services account from the telemetry config feature.
 */
export const stopTelemetryEvaluation: API.OperationMethod<
  StopTelemetryEvaluationRequest,
  StopTelemetryEvaluationResponse,
  StopTelemetryEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /StopTelemetryEvaluation" },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTelemetryEvaluation",
})) as any;

export type StopTelemetryEvaluationForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * This action offboards the Organization of the caller Amazon Web Services account from the telemetry config feature.
 */
export const stopTelemetryEvaluationForOrganization: API.OperationMethod<
  StopTelemetryEvaluationForOrganizationRequest,
  StopTelemetryEvaluationForOrganizationResponse,
  StopTelemetryEvaluationForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StopTelemetryEvaluationForOrganization",
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTelemetryEvaluationForOrganization",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates tags for a resource. Supports telemetry rule resources and telemetry pipeline resources.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /TagResource",
    input: { ResourceARN: 0, Tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TestTelemetryPipelineError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Tests a pipeline configuration with sample records to validate data processing before deployment. This operation helps ensure your pipeline configuration works as expected.
 */
export const testTelemetryPipeline: API.OperationMethod<
  TestTelemetryPipelineInput,
  TestTelemetryPipelineOutput,
  TestTelemetryPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /TestTelemetryPipeline",
    input: {
      Records: D.list({ Data: 0, Type: 0 }),
      Configuration: i_TelemetryPipelineConfiguration,
      SignalType: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestTelemetryPipeline",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a resource. Supports telemetry rule resources and telemetry pipeline resources.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UntagResource",
    input: { ResourceARN: 0, TagKeys: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateCentralizationRuleForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing centralization rule that applies across an Amazon Web Services Organization. This operation can only be called by the organization's management account or a delegated administrator account.
 */
export const updateCentralizationRuleForOrganization: API.OperationMethod<
  UpdateCentralizationRuleForOrganizationInput,
  UpdateCentralizationRuleForOrganizationOutput,
  UpdateCentralizationRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateCentralizationRuleForOrganization",
    input: { RuleIdentifier: 0, Rule: i_CentralizationRule },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCentralizationRuleForOrganization",
})) as any;

export type UpdateTelemetryPipelineError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing telemetry pipeline.
 *
 * The following attributes cannot be updated after pipeline creation:
 *
 * - **Pipeline name** - The pipeline name is immutable
 *
 * - **Pipeline ARN** - The ARN is automatically generated and cannot be changed
 *
 * - **Source type** - Once a pipeline is created with a specific source type (such as S3, CloudWatch Logs, GitHub, or third-party sources), it cannot be changed to a different source type
 *
 * Processors can be added, removed, or modified. However, some processors are not supported for third-party pipelines and cannot be added through updates.
 *
 * **Source-Specific Update Rules**
 *
 * ### CloudWatch Logs Sources (Vended and Custom)
 *
 * **Updatable:** `sts_role_arn`
 *
 * **Fixed:** `data_source_name`, `data_source_type`, sink (must remain `@original`)
 *
 * ### S3 Sources (Crowdstrike, Zscaler, SentinelOne, Custom)
 *
 * **Updatable:** All SQS configuration parameters, `sts_role_arn`, codec settings, compression type, bucket ownership settings, sink log group
 *
 * **Fixed:** `notification_type`, `aws.region`
 *
 * ### GitHub Audit Logs
 *
 * **Updatable:** All Amazon Web Services Secrets Manager attributes, `scope` (can switch between ORGANIZATION/ENTERPRISE), `organization` or `enterprise` name, `range`, authentication credentials (PAT or GitHub App)
 *
 * ### Microsoft Sources (Entra ID, Office365, Windows)
 *
 * **Updatable:** All Amazon Web Services Secrets Manager attributes, `tenant_id`, `workspace_id` (Windows only), OAuth2 credentials (`client_id`, `client_secret`)
 *
 * ### Okta Sources (SSO, Auth0)
 *
 * **Updatable:** All Amazon Web Services Secrets Manager attributes, `domain`, `range`, OAuth2 credentials (`client_id`, `client_secret`)
 *
 * ### Palo Alto Networks
 *
 * **Updatable:** All Amazon Web Services Secrets Manager attributes, `hostname`, basic authentication credentials (`username`, `password`)
 *
 * ### ServiceNow CMDB
 *
 * **Updatable:** All Amazon Web Services Secrets Manager attributes, `instance_url`, `range`, OAuth2 credentials (`client_id`, `client_secret`)
 *
 * ### Wiz CNAPP
 *
 * **Updatable:** All Amazon Web Services Secrets Manager attributes, `region`, `range`, OAuth2 credentials (`client_id`, `client_secret`)
 */
export const updateTelemetryPipeline: API.OperationMethod<
  UpdateTelemetryPipelineInput,
  UpdateTelemetryPipelineOutput,
  UpdateTelemetryPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateTelemetryPipeline",
    input: {
      PipelineIdentifier: 0,
      Configuration: i_TelemetryPipelineConfiguration,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTelemetryPipeline",
})) as any;

export type UpdateTelemetryRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing telemetry rule in your account. If multiple users attempt to modify the same telemetry rule simultaneously, a ConflictException is returned to provide specific error information for concurrent modification scenarios.
 */
export const updateTelemetryRule: API.OperationMethod<
  UpdateTelemetryRuleInput,
  UpdateTelemetryRuleOutput,
  UpdateTelemetryRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateTelemetryRule",
    input: { RuleIdentifier: 0, Rule: i_TelemetryRule },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTelemetryRule",
})) as any;

export type UpdateTelemetryRuleForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing telemetry rule that applies across an Amazon Web Services Organization. This operation can only be called by the organization's management account or a delegated administrator account.
 */
export const updateTelemetryRuleForOrganization: API.OperationMethod<
  UpdateTelemetryRuleForOrganizationInput,
  UpdateTelemetryRuleForOrganizationOutput,
  UpdateTelemetryRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateTelemetryRuleForOrganization",
    input: { RuleIdentifier: 0, Rule: i_TelemetryRule },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTelemetryRuleForOrganization",
})) as any;

export type ValidateTelemetryPipelineConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Validates a pipeline configuration without creating the pipeline. This operation checks the configuration for syntax errors and compatibility issues.
 */
export const validateTelemetryPipelineConfiguration: API.OperationMethod<
  ValidateTelemetryPipelineConfigurationInput,
  ValidateTelemetryPipelineConfigurationOutput,
  ValidateTelemetryPipelineConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ValidateTelemetryPipelineConfiguration",
    input: { Configuration: i_TelemetryPipelineConfiguration },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateTelemetryPipelineConfiguration",
})) as any;

const i_CentralizationRule: D.LazyStruct = () => ({
  Source: {
    Regions: 0,
    Scope: 0,
    SourceLogsConfiguration: {
      LogGroupSelectionCriteria: 0,
      DataSourceSelectionCriteria: 0,
      EncryptedLogGroupStrategy: 0,
    },
    SourceMetricsConfiguration: { MetricsSelectionCriteria: 0 },
  },
  Destination: {
    Region: 0,
    Account: 0,
    DestinationLogsConfiguration: {
      LogsEncryptionConfiguration: {
        EncryptionStrategy: 0,
        KmsKeyArn: 0,
        EncryptionConflictResolutionStrategy: 0,
        EncryptionScope: 0,
      },
      BackupConfiguration: { Region: 0, KmsKeyArn: 0 },
      LogGroupNameConfiguration: { LogGroupNamePattern: 0 },
      TagPropagationConfiguration: {
        DestinationRoleArn: 0,
        TagConflictResolutionStrategy: 0,
      },
    },
    DestinationMetricsConfiguration: { BackupConfiguration: { Region: 0 } },
  },
});
const i_TelemetryPipelineConfiguration: D.LazyStruct = () => ({ Body: 0 });
const i_TelemetryRule: D.LazyStruct = () => ({
  ResourceType: 0,
  TelemetryType: 0,
  TelemetrySourceTypes: 0,
  DestinationConfiguration: {
    DestinationType: 0,
    DestinationPattern: 0,
    RetentionInDays: 0,
    VPCFlowLogParameters: {
      LogFormat: 0,
      TrafficType: 0,
      MaxAggregationInterval: 0,
    },
    CloudtrailParameters: {
      AdvancedEventSelectors: D.list({
        Name: 0,
        FieldSelectors: D.list({
          Field: 0,
          Equals: 0,
          StartsWith: 0,
          EndsWith: 0,
          NotEquals: 0,
          NotStartsWith: 0,
          NotEndsWith: 0,
        }),
      }),
    },
    ELBLoadBalancerLoggingParameters: { OutputFormat: 0, FieldDelimiter: 0 },
    WAFLoggingParameters: {
      RedactedFields: D.list({
        SingleHeader: { Name: 0 },
        UriPath: 0,
        QueryString: 0,
        Method: 0,
      }),
      LoggingFilter: {
        Filters: D.list({
          Behavior: 0,
          Requirement: 0,
          Conditions: D.list({
            ActionCondition: { Action: 0 },
            LabelNameCondition: { LabelName: 0 },
          }),
        }),
        DefaultBehavior: 0,
      },
      LogType: 0,
    },
    LogDeliveryParameters: { LogTypes: 0 },
    MskMonitoringParameters: { EnhancedMonitoring: 0 },
    KmsKeyArn: 0,
  },
  Scope: 0,
  SelectionCriteria: 0,
  AllowFieldUpdates: 0,
  Regions: 0,
  AllRegions: 0,
});
