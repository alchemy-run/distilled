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
  sdkId: "ObservabilityAdmin",
  serviceShapeName: "ObservabilityAdmin",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "observabilityadmin" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://observabilityadmin.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://observabilityadmin.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://observabilityadmin.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      amznErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      amznErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateException>()(
    "InvalidStateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
      ServiceCode: /*@__PURE__*/ S.optional(S.String),
      QuotaCode: /*@__PURE__*/ S.optional(S.String),
      amznErrorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Errors: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1730, __c54, 2)).annotate({
          identifier: "ValidationErrors",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export interface SourceContextGraphConfiguration {}
export interface CentralizationRuleSource {
  Regions: string[];
  Scope?: string;
  SourceLogsConfiguration?: SourceLogsConfiguration;
  SourceMetricsConfiguration?: SourceMetricsConfiguration;
  SourceContextGraphConfiguration?: SourceContextGraphConfiguration;
}
export type AccountIdentifier = string;
export type EncryptionStrategy = "CUSTOMER_MANAGED" | "AWS_OWNED" | (string & {});
export type ResourceArn = string;
export type EncryptionConflictResolutionStrategy = "ALLOW" | "SKIP" | (string & {});
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
export type TagConflictResolutionStrategy = "IN_SYNC" | "ADD_ONLY" | "UPDATE_SYNC" | (string & {});
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
export interface CreateDatasetIntegrationInput {
  RoleArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateDatasetIntegrationOutput {
  Arn: string;
  RoleArn: string;
  CreatedAt: Date;
  UpdatedAt: Date;
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
  | "AWS::BedrockAgentCore::PaymentManager"
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
export interface DeleteDatasetIntegrationInput {
  Arn: string;
}
export interface DeleteDatasetIntegrationResponse {}
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
export type RuleHealth = "Healthy" | "Unhealthy" | "Provisioning" | (string & {});
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
export type ContextGraphStatus = "Healthy" | "Unhealthy" | "Provisioning" | (string & {});
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
  ContextGraphStatus?: ContextGraphStatus;
  CentralizationRule?: CentralizationRule;
}
export interface GetDatasetIntegrationInput {
  Arn: string;
}
export interface GetDatasetIntegrationOutput {
  Arn?: string;
  RoleArn?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
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
export type TelemetryEnrichmentStatus = "Running" | "Stopped" | "Impaired" | (string & {});
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
  ContextGraphStatus?: ContextGraphStatus;
  DestinationAccountId?: string;
  DestinationRegion?: string;
}
export type CentralizationRuleSummaries = CentralizationRuleSummary[];
export interface ListCentralizationRulesForOrganizationOutput {
  CentralizationRuleSummaries?: CentralizationRuleSummary[];
  NextToken?: string;
}
export type ListDatasetIntegrationsMaxResults = number;
export interface ListDatasetIntegrationsInput {
  MaxResults?: number;
  NextToken?: string;
}
export interface DatasetIntegrationSummary {
  Arn: string;
  RoleArn?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type DatasetIntegrationSummaries = DatasetIntegrationSummary[];
export interface ListDatasetIntegrationsOutput {
  DatasetIntegrationSummaries: DatasetIntegrationSummary[];
  NextToken?: string;
}
export type ResourceIdentifierPrefix = string;
export type ResourceTypes = ResourceType[];
export type TelemetryState = "Enabled" | "Disabled" | "NotApplicable" | (string & {});
export type TelemetryConfigurationState = { [key in TelemetryType]?: TelemetryState };
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
export interface UpdateDatasetIntegrationInput {
  Arn: string;
  RoleArn: string;
}
export interface UpdateDatasetIntegrationOutput {
  Arn: string;
  RoleArn: string;
  CreatedAt: Date;
  UpdatedAt: Date;
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
  input: __S(1760, __c55, 0) as any as S.Schema<CreateCentralizationRuleForOrganizationInput>,
  output: __S(1824, __c57, 0) as any as S.Schema<CreateCentralizationRuleForOrganizationOutput>,
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
}));

export type CreateDatasetIntegrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a dataset integration for the caller's account in the current region and returns its ARN.
 *
 * To use this operation, you must have permission to access the dataset integration resources through the IAM role specified in the `RoleArn` parameter.
 *
 * If a dataset integration already exists for the account, this operation fails with a `ConflictException`.
 */
export const createDatasetIntegration: API.OperationMethod<
  CreateDatasetIntegrationInput,
  CreateDatasetIntegrationOutput,
  CreateDatasetIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1920, __c60, 0) as any as S.Schema<CreateDatasetIntegrationInput>,
  output: __S(1952, __c61, 0) as any as S.Schema<CreateDatasetIntegrationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDatasetIntegration",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreateS3TableIntegrationInput>,
  output: __S(32, __c1, 0) as any as S.Schema<CreateS3TableIntegrationOutput>,
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
}));

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
  input: __S(96, __c3, 0) as any as S.Schema<CreateTelemetryPipelineInput>,
  output: __S(32, __c1, 0) as any as S.Schema<CreateTelemetryPipelineOutput>,
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
}));

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
  input: __S(160, __c5, 0) as any as S.Schema<CreateTelemetryRuleInput>,
  output: __S(1824, __c57, 0) as any as S.Schema<CreateTelemetryRuleOutput>,
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
}));

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
  input: __S(256, __c8, 0) as any as S.Schema<CreateTelemetryRuleForOrganizationInput>,
  output: __S(1824, __c57, 0) as any as S.Schema<CreateTelemetryRuleForOrganizationOutput>,
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
}));

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
  input: __S(288, __c9, 0) as any as S.Schema<DeleteCentralizationRuleForOrganizationInput>,
  output: __S(1856, __c58, 0) as any as S.Schema<DeleteCentralizationRuleForOrganizationResponse>,
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
}));

export type DeleteDatasetIntegrationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a dataset integration for the caller's account in the current region. This operation is idempotent; if you submit the same delete more than once, each call succeeds.
 */
export const deleteDatasetIntegration: API.OperationMethod<
  DeleteDatasetIntegrationInput,
  DeleteDatasetIntegrationResponse,
  DeleteDatasetIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<DeleteDatasetIntegrationInput>,
  output: __S(1856, __c58, 0) as any as S.Schema<DeleteDatasetIntegrationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDatasetIntegration",
}));

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
  input: __S(352, __c11, 0) as any as S.Schema<DeleteS3TableIntegrationInput>,
  output: __S(1856, __c58, 0) as any as S.Schema<DeleteS3TableIntegrationResponse>,
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
}));

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
  input: __S(384, __c12, 0) as any as S.Schema<DeleteTelemetryPipelineInput>,
  output: __S(1856, __c58, 0) as any as S.Schema<DeleteTelemetryPipelineOutput>,
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
}));

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
  input: __S(416, __c13, 0) as any as S.Schema<DeleteTelemetryRuleInput>,
  output: __S(1856, __c58, 0) as any as S.Schema<DeleteTelemetryRuleResponse>,
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
}));

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
  input: __S(448, __c14, 0) as any as S.Schema<DeleteTelemetryRuleForOrganizationInput>,
  output: __S(1856, __c58, 0) as any as S.Schema<DeleteTelemetryRuleForOrganizationResponse>,
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
}));

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
  input: __S(480, __c15, 0) as any as S.Schema<GetCentralizationRuleForOrganizationInput>,
  output: __S(481, __c15, 1) as any as S.Schema<GetCentralizationRuleForOrganizationOutput>,
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
}));

export type GetDatasetIntegrationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Returns the dataset integration for the caller's account in the current region.
 */
export const getDatasetIntegration: API.OperationMethod<
  GetDatasetIntegrationInput,
  GetDatasetIntegrationOutput,
  GetDatasetIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<GetDatasetIntegrationInput>,
  output: __S(513, __c16, 1) as any as S.Schema<GetDatasetIntegrationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDatasetIntegration",
}));

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
  input: __S(544, __c17, 0) as any as S.Schema<GetS3TableIntegrationInput>,
  output: __S(545, __c17, 1) as any as S.Schema<GetS3TableIntegrationOutput>,
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
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<GetTelemetryEnrichmentStatusRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<GetTelemetryEnrichmentStatusOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryEnrichmentStatus",
}));

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
  input: __S(640, __c20, 0) as any as S.Schema<GetTelemetryEvaluationStatusRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<GetTelemetryEvaluationStatusOutput>,
  errors: [AccessDeniedException, InternalServerException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryEvaluationStatus",
}));

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
  input: __S(736, __c23, 0) as any as S.Schema<GetTelemetryEvaluationStatusForOrganizationRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<GetTelemetryEvaluationStatusForOrganizationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryEvaluationStatusForOrganization",
}));

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
  input: __S(768, __c24, 0) as any as S.Schema<GetTelemetryPipelineInput>,
  output: __S(771, __c24, 3) as any as S.Schema<GetTelemetryPipelineOutput>,
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
}));

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
  input: __S(800, __c25, 0) as any as S.Schema<GetTelemetryRuleInput>,
  output: __S(832, __c26, 0) as any as S.Schema<GetTelemetryRuleOutput>,
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
}));

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
  input: __S(864, __c27, 0) as any as S.Schema<GetTelemetryRuleForOrganizationInput>,
  output: __S(832, __c26, 0) as any as S.Schema<GetTelemetryRuleForOrganizationOutput>,
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
}));

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
  input: __S(896, __c28, 0) as any as S.Schema<ListCentralizationRulesForOrganizationInput>,
  output: __S(899, __c28, 3) as any as S.Schema<ListCentralizationRulesForOrganizationOutput>,
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

export type ListDatasetIntegrationsError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Returns the dataset integrations in your account.
 */
export const listDatasetIntegrations: API.PaginatedOperationMethod<
  ListDatasetIntegrationsInput,
  ListDatasetIntegrationsOutput,
  ListDatasetIntegrationsError,
  Credentials | HttpClient.HttpClient,
  DatasetIntegrationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<ListDatasetIntegrationsInput>,
  output: __S(931, __c29, 3) as any as S.Schema<ListDatasetIntegrationsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasetIntegrations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DatasetIntegrationSummaries",
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
  input: __S(960, __c30, 0) as any as S.Schema<ListResourceTelemetryInput>,
  output: __S(995, __c31, 3) as any as S.Schema<ListResourceTelemetryOutput>,
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
  input: __S(1024, __c32, 0) as any as S.Schema<ListResourceTelemetryForOrganizationInput>,
  output: __S(995, __c31, 3) as any as S.Schema<ListResourceTelemetryForOrganizationOutput>,
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
  input: __S(1056, __c33, 0) as any as S.Schema<ListS3TableIntegrationsInput>,
  output: __S(1059, __c33, 3) as any as S.Schema<ListS3TableIntegrationsOutput>,
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
  input: __S(1088, __c34, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(1089, __c34, 1) as any as S.Schema<ListTagsForResourceOutput>,
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
}));

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
  input: __S(1120, __c35, 0) as any as S.Schema<ListTelemetryPipelinesInput>,
  output: __S(1128, __c35, 8) as any as S.Schema<ListTelemetryPipelinesOutput>,
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
  input: __S(1152, __c36, 0) as any as S.Schema<ListTelemetryRulesInput>,
  output: __S(1186, __c37, 2) as any as S.Schema<ListTelemetryRulesOutput>,
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
  input: __S(1216, __c38, 0) as any as S.Schema<ListTelemetryRulesForOrganizationInput>,
  output: __S(1186, __c37, 2) as any as S.Schema<ListTelemetryRulesForOrganizationOutput>,
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
  input: __S(1248, __c39, 0) as any as S.Schema<StartTelemetryEnrichmentRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<StartTelemetryEnrichmentOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTelemetryEnrichment",
}));

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
  input: __S(1280, __c40, 0) as any as S.Schema<StartTelemetryEvaluationInput>,
  output: __S(1856, __c58, 0) as any as S.Schema<StartTelemetryEvaluationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTelemetryEvaluation",
}));

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
  input: __S(1312, __c41, 0) as any as S.Schema<StartTelemetryEvaluationForOrganizationInput>,
  output: __S(1856, __c58, 0) as any as S.Schema<StartTelemetryEvaluationForOrganizationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTelemetryEvaluationForOrganization",
}));

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
  input: __S(1344, __c42, 0) as any as S.Schema<StopTelemetryEnrichmentRequest>,
  output: __S(1345, __c42, 1) as any as S.Schema<StopTelemetryEnrichmentOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTelemetryEnrichment",
}));

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
  input: __S(1376, __c43, 0) as any as S.Schema<StopTelemetryEvaluationRequest>,
  output: __S(1856, __c58, 0) as any as S.Schema<StopTelemetryEvaluationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTelemetryEvaluation",
}));

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
  input: __S(1408, __c44, 0) as any as S.Schema<StopTelemetryEvaluationForOrganizationRequest>,
  output: __S(1856, __c58, 0) as any as S.Schema<StopTelemetryEvaluationForOrganizationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTelemetryEvaluationForOrganization",
}));

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
  input: __S(1440, __c45, 0) as any as S.Schema<TagResourceInput>,
  output: __S(1856, __c58, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(1474, __c46, 2) as any as S.Schema<TestTelemetryPipelineInput>,
  output: __S(1478, __c46, 6) as any as S.Schema<TestTelemetryPipelineOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestTelemetryPipeline",
}));

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
  input: __S(1504, __c47, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(1856, __c58, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(1536, __c48, 0) as any as S.Schema<UpdateCentralizationRuleForOrganizationInput>,
  output: __S(1824, __c57, 0) as any as S.Schema<UpdateCentralizationRuleForOrganizationOutput>,
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
}));

export type UpdateDatasetIntegrationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Updates a dataset integration for the caller's account in the current region. This operation is idempotent; if you submit the same update more than once, each call succeeds.
 */
export const updateDatasetIntegration: API.OperationMethod<
  UpdateDatasetIntegrationInput,
  UpdateDatasetIntegrationOutput,
  UpdateDatasetIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1568, __c49, 0) as any as S.Schema<UpdateDatasetIntegrationInput>,
  output: __S(1952, __c61, 0) as any as S.Schema<UpdateDatasetIntegrationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDatasetIntegration",
}));

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
  input: __S(1600, __c50, 0) as any as S.Schema<UpdateTelemetryPipelineInput>,
  output: __S(1856, __c58, 0) as any as S.Schema<UpdateTelemetryPipelineOutput>,
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
}));

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
  input: __S(1632, __c51, 0) as any as S.Schema<UpdateTelemetryRuleInput>,
  output: __S(1824, __c57, 0) as any as S.Schema<UpdateTelemetryRuleOutput>,
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
}));

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
  input: __S(1664, __c52, 0) as any as S.Schema<UpdateTelemetryRuleForOrganizationInput>,
  output: __S(1824, __c57, 0) as any as S.Schema<UpdateTelemetryRuleForOrganizationOutput>,
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
}));

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
  input: __S(1696, __c53, 0) as any as S.Schema<ValidateTelemetryPipelineConfigurationInput>,
  output: __S(1697, __c53, 1) as any as S.Schema<ValidateTelemetryPipelineConfigurationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateTelemetryPipelineConfiguration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Encryption: __S(64, __c2, 0),
          RoleArn: S.String,
          Tags: S.optional(__S(1728, __c54, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateS3TableIntegration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateS3TableIntegrationInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Arn: S.optional(S.String) })).annotate({
        identifier: "CreateS3TableIntegrationOutput",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SseAlgorithm: S.String, KmsKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "Encryption" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Configuration: __S(128, __c4, 0),
          Tags: S.optional(__S(1728, __c54, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateTelemetryPipeline" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTelemetryPipelineInput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Body: S.String })).annotate({
        identifier: "TelemetryPipelineConfiguration",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.String,
          Rule: __S(245, __c7, 21),
          Tags: S.optional(__S(1728, __c54, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateTelemetryRule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTelemetryRuleInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LogFormat: S.optional(S.String),
          TrafficType: S.optional(S.String),
          MaxAggregationInterval: S.optional(S.Number),
        }),
      ).annotate({ identifier: "VPCFlowLogParameters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Field: S.String,
          Equals: S.optional(__S(1792, __c56, 0)),
          StartsWith: S.optional(__S(1792, __c56, 0)),
          EndsWith: S.optional(__S(1792, __c56, 0)),
          NotEquals: S.optional(__S(1792, __c56, 0)),
          NotStartsWith: S.optional(__S(1792, __c56, 0)),
          NotEndsWith: S.optional(__S(1792, __c56, 0)),
        }),
      ).annotate({ identifier: "AdvancedFieldSelector" });
    case 2:
      return S.Array(__S(225, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), FieldSelectors: __S(226, __c7, 2) }),
      ).annotate({ identifier: "AdvancedEventSelector" });
    case 4:
      return S.Array(__S(227, __c7, 3));
    case 5:
      return S.suspend(() => S.Struct({ AdvancedEventSelectors: __S(228, __c7, 4) })).annotate({
        identifier: "CloudtrailParameters",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({ OutputFormat: S.optional(S.String), FieldDelimiter: S.optional(S.String) }),
      ).annotate({ identifier: "ELBLoadBalancerLoggingParameters" });
    case 7:
      return S.suspend(() => S.Struct({ Name: S.optional(S.String) })).annotate({
        identifier: "SingleHeader",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          SingleHeader: S.optional(__S(231, __c7, 7)),
          UriPath: S.optional(S.String),
          QueryString: S.optional(S.String),
          Method: S.optional(S.String),
        }),
      ).annotate({ identifier: "FieldToMatch" });
    case 9:
      return S.Array(__S(232, __c7, 8));
    case 10:
      return S.suspend(() => S.Struct({ Action: S.optional(S.String) })).annotate({
        identifier: "ActionCondition",
      });
    case 11:
      return S.suspend(() => S.Struct({ LabelName: S.optional(S.String) })).annotate({
        identifier: "LabelNameCondition",
      });
    case 12:
      return S.suspend(() =>
        S.Struct({
          ActionCondition: S.optional(__S(234, __c7, 10)),
          LabelNameCondition: S.optional(__S(235, __c7, 11)),
        }),
      ).annotate({ identifier: "Condition" });
    case 13:
      return S.Array(__S(236, __c7, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          Behavior: S.optional(S.String),
          Requirement: S.optional(S.String),
          Conditions: S.optional(__S(237, __c7, 13)),
        }),
      ).annotate({ identifier: "Filter" });
    case 15:
      return S.Array(__S(238, __c7, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(239, __c7, 15)),
          DefaultBehavior: S.optional(S.String),
        }),
      ).annotate({ identifier: "LoggingFilter" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          RedactedFields: S.optional(__S(233, __c7, 9)),
          LoggingFilter: S.optional(__S(240, __c7, 16)),
          LogType: S.optional(S.String),
        }),
      ).annotate({ identifier: "WAFLoggingParameters" });
    case 18:
      return S.suspend(() => S.Struct({ LogTypes: S.optional(__S(192, __c6, 0)) })).annotate({
        identifier: "LogDeliveryParameters",
      });
    case 19:
      return S.suspend(() => S.Struct({ EnhancedMonitoring: S.optional(S.String) })).annotate({
        identifier: "MskMonitoringParameters",
      });
    case 20:
      return S.suspend(() =>
        S.Struct({
          DestinationType: S.optional(S.String),
          DestinationPattern: S.optional(S.String),
          RetentionInDays: S.optional(S.Number),
          VPCFlowLogParameters: S.optional(__S(224, __c7, 0)),
          CloudtrailParameters: S.optional(__S(229, __c7, 5)),
          ELBLoadBalancerLoggingParameters: S.optional(__S(230, __c7, 6)),
          WAFLoggingParameters: S.optional(__S(241, __c7, 17)),
          LogDeliveryParameters: S.optional(__S(242, __c7, 18)),
          MskMonitoringParameters: S.optional(__S(243, __c7, 19)),
          KmsKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "TelemetryDestinationConfiguration" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.optional(S.String),
          TelemetryType: S.String,
          TelemetrySourceTypes: S.optional(__S(192, __c6, 0)),
          DestinationConfiguration: S.optional(__S(244, __c7, 20)),
          Scope: S.optional(S.String),
          SelectionCriteria: S.optional(S.String),
          AllowFieldUpdates: S.optional(S.Boolean),
          Regions: S.optional(__S(1792, __c56, 0)),
          AllRegions: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "TelemetryRule" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.String,
          Rule: __S(245, __c7, 21),
          Tags: S.optional(__S(1728, __c54, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateTelemetryRuleForOrganization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTelemetryRuleForOrganizationInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteCentralizationRuleForOrganization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCentralizationRuleForOrganizationInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteDatasetIntegration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDatasetIntegrationInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteS3TableIntegration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteS3TableIntegrationInput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PipelineIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteTelemetryPipeline" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTelemetryPipelineInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteTelemetryRule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTelemetryRuleInput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteTelemetryRuleForOrganization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTelemetryRuleForOrganizationInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetCentralizationRuleForOrganization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCentralizationRuleForOrganizationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.optional(S.String),
          RuleArn: S.optional(S.String),
          CreatorAccountId: S.optional(S.String),
          CreatedTimeStamp: S.optional(S.Number),
          CreatedRegion: S.optional(S.String),
          LastUpdateTimeStamp: S.optional(S.Number),
          RuleHealth: S.optional(S.String),
          FailureReason: S.optional(S.String),
          TagPropagationStatus: S.optional(S.String),
          TagPropagationFailureReason: S.optional(S.String),
          ContextGraphStatus: S.optional(S.String),
          CentralizationRule: S.optional(__S(1899, __c59, 11)),
        }),
      ).annotate({ identifier: "GetCentralizationRuleForOrganizationOutput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetDatasetIntegration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDatasetIntegrationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          RoleArn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetDatasetIntegrationOutput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetS3TableIntegration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetS3TableIntegrationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          RoleArn: S.optional(S.String),
          Status: S.optional(S.String),
          Encryption: S.optional(__S(64, __c2, 0)),
          DestinationTableBucketArn: S.optional(S.String),
          CreatedTimeStamp: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetS3TableIntegrationOutput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetTelemetryEnrichmentStatus" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTelemetryEnrichmentStatusRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          AwsResourceExplorerManagedViewArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetTelemetryEnrichmentStatusOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetTelemetryEvaluationStatus" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTelemetryEvaluationStatusRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          FailureReason: S.optional(S.String),
          HomeRegion: S.optional(S.String),
          RegionStatuses: S.optional(__S(705, __c22, 1)),
        }),
      ).annotate({ identifier: "GetTelemetryEvaluationStatusOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Region: S.optional(S.String),
          Status: S.optional(S.String),
          FailureReason: S.optional(S.String),
          RuleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegionStatus" });
    case 1:
      return S.Array(__S(704, __c22, 0));
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetTelemetryEvaluationStatusForOrganization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTelemetryEvaluationStatusForOrganizationRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PipelineIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetTelemetryPipeline" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTelemetryPipelineInput" });
    case 1:
      return S.suspend(() => S.Struct({ Description: S.optional(S.String) })).annotate({
        identifier: "TelemetryPipelineStatusReason",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CreatedTimeStamp: S.optional(S.Number),
          LastUpdateTimeStamp: S.optional(S.Number),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Configuration: S.optional(__S(128, __c4, 0)),
          Status: S.optional(S.String),
          StatusReason: S.optional(__S(769, __c24, 1)),
          Tags: S.optional(__S(1728, __c54, 0)),
        }),
      ).annotate({ identifier: "TelemetryPipeline" });
    case 3:
      return S.suspend(() => S.Struct({ Pipeline: S.optional(__S(770, __c24, 2)) })).annotate({
        identifier: "GetTelemetryPipelineOutput",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleIdentifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/GetTelemetryRule" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTelemetryRuleInput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.optional(S.String),
          RuleArn: S.optional(S.String),
          CreatedTimeStamp: S.optional(S.Number),
          LastUpdateTimeStamp: S.optional(S.Number),
          TelemetryRule: S.optional(__S(245, __c7, 21)),
          HomeRegion: S.optional(S.String),
          IsReplicated: S.optional(S.Boolean),
          RegionStatuses: S.optional(__S(705, __c22, 1)),
        }),
      ).annotate({ identifier: "GetTelemetryRuleOutput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetTelemetryRuleForOrganization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTelemetryRuleForOrganizationInput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleNamePrefix: S.optional(S.String),
          AllRegions: S.optional(S.Boolean),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListCentralizationRulesForOrganization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCentralizationRulesForOrganizationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.optional(S.String),
          RuleArn: S.optional(S.String),
          CreatorAccountId: S.optional(S.String),
          CreatedTimeStamp: S.optional(S.Number),
          CreatedRegion: S.optional(S.String),
          LastUpdateTimeStamp: S.optional(S.Number),
          RuleHealth: S.optional(S.String),
          FailureReason: S.optional(S.String),
          TagPropagationStatus: S.optional(S.String),
          TagPropagationFailureReason: S.optional(S.String),
          ContextGraphStatus: S.optional(S.String),
          DestinationAccountId: S.optional(S.String),
          DestinationRegion: S.optional(S.String),
        }),
      ).annotate({ identifier: "CentralizationRuleSummary" });
    case 2:
      return S.Array(__S(897, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CentralizationRuleSummaries: S.optional(__S(898, __c28, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCentralizationRulesForOrganizationOutput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListDatasetIntegrations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDatasetIntegrationsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          RoleArn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DatasetIntegrationSummary" });
    case 2:
      return S.Array(__S(929, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DatasetIntegrationSummaries: __S(930, __c29, 2),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDatasetIntegrationsOutput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifierPrefix: S.optional(S.String),
          ResourceTypes: S.optional(__S(192, __c6, 0)),
          TelemetryConfigurationState: S.optional(__S(992, __c31, 0)),
          ResourceTags: S.optional(__S(1728, __c54, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListResourceTelemetry" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResourceTelemetryInput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountIdentifier: S.optional(S.String),
          TelemetryConfigurationState: S.optional(__S(992, __c31, 0)),
          ResourceType: S.optional(S.String),
          ResourceIdentifier: S.optional(S.String),
          ResourceTags: S.optional(__S(1728, __c54, 0)),
          LastUpdateTimeStamp: S.optional(S.Number),
          TelemetrySourceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "TelemetryConfiguration" });
    case 2:
      return S.Array(__S(993, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          TelemetryConfigurations: S.optional(__S(994, __c31, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListResourceTelemetryOutput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountIdentifiers: S.optional(__S(1792, __c56, 0)),
          ResourceIdentifierPrefix: S.optional(S.String),
          ResourceTypes: S.optional(__S(192, __c6, 0)),
          TelemetryConfigurationState: S.optional(__S(992, __c31, 0)),
          ResourceTags: S.optional(__S(1728, __c54, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListResourceTelemetryForOrganization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResourceTelemetryForOrganizationInput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListS3TableIntegrations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListS3TableIntegrationsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "IntegrationSummary" });
    case 2:
      return S.Array(__S(1057, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          IntegrationSummaries: S.optional(__S(1058, __c33, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListS3TableIntegrationsOutput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListTagsForResource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: __S(1728, __c54, 0) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListTelemetryPipelines" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTelemetryPipelinesInput" });
    case 1:
      return S.suspend(() => S.Struct({ Type: S.optional(S.String) })).annotate({
        identifier: "Source",
      });
    case 2:
      return S.Array(__S(1121, __c35, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Type: S.optional(S.String) }),
      ).annotate({ identifier: "DataSource" });
    case 4:
      return S.Array(__S(1123, __c35, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Sources: S.optional(__S(1122, __c35, 2)),
          DataSources: S.optional(__S(1124, __c35, 4)),
          Processors: S.optional(__S(1792, __c56, 0)),
          ProcessorCount: S.optional(S.Number),
          Sinks: S.optional(__S(1792, __c56, 0)),
        }),
      ).annotate({ identifier: "ConfigurationSummary" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          CreatedTimeStamp: S.optional(S.Number),
          LastUpdateTimeStamp: S.optional(S.Number),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          Tags: S.optional(__S(1728, __c54, 0)),
          ConfigurationSummary: S.optional(__S(1125, __c35, 5)),
        }),
      ).annotate({ identifier: "TelemetryPipelineSummary" });
    case 7:
      return S.Array(__S(1126, __c35, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          PipelineSummaries: S.optional(__S(1127, __c35, 7)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListTelemetryPipelinesOutput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleNamePrefix: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListTelemetryRules" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTelemetryRulesInput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.optional(S.String),
          RuleArn: S.optional(S.String),
          CreatedTimeStamp: S.optional(S.Number),
          LastUpdateTimeStamp: S.optional(S.Number),
          ResourceType: S.optional(S.String),
          TelemetryType: S.optional(S.String),
          TelemetrySourceTypes: S.optional(__S(192, __c6, 0)),
        }),
      ).annotate({ identifier: "TelemetryRuleSummary" });
    case 1:
      return S.Array(__S(1184, __c37, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          TelemetryRuleSummaries: S.optional(__S(1185, __c37, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListTelemetryRulesOutput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleNamePrefix: S.optional(S.String),
          SourceAccountIds: S.optional(__S(1792, __c56, 0)),
          SourceOrganizationUnitIds: S.optional(__S(1792, __c56, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListTelemetryRulesForOrganization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTelemetryRulesForOrganizationInput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StartTelemetryEnrichment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartTelemetryEnrichmentRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Regions: S.optional(__S(1792, __c56, 0)),
          AllRegions: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StartTelemetryEvaluation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartTelemetryEvaluationInput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Regions: S.optional(__S(1792, __c56, 0)),
          AllRegions: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StartTelemetryEvaluationForOrganization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartTelemetryEvaluationForOrganizationInput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StopTelemetryEnrichment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopTelemetryEnrichmentRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Status: S.optional(S.String) })).annotate({
        identifier: "StopTelemetryEnrichmentOutput",
      });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StopTelemetryEvaluation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopTelemetryEvaluationRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StopTelemetryEvaluationForOrganization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopTelemetryEvaluationForOrganizationRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(1728, __c54, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/TagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Data: S.optional(S.String), Type: S.optional(S.String) }),
      ).annotate({ identifier: "Record" });
    case 1:
      return S.Array(__S(1472, __c46, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Records: __S(1473, __c46, 1),
          Configuration: __S(128, __c4, 0),
          SignalType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/TestTelemetryPipeline" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TestTelemetryPipelineInput" });
    case 3:
      return S.suspend(() => S.Struct({ Message: S.optional(S.String) })).annotate({
        identifier: "PipelineOutputError",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Record: S.optional(__S(1472, __c46, 0)),
          Error: S.optional(__S(1475, __c46, 3)),
        }),
      ).annotate({ identifier: "PipelineOutput" });
    case 5:
      return S.Array(__S(1476, __c46, 4));
    case 6:
      return S.suspend(() => S.Struct({ Results: S.optional(__S(1477, __c46, 5)) })).annotate({
        identifier: "TestTelemetryPipelineOutput",
      });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(1792, __c56, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/UntagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleIdentifier: S.String, Rule: __S(1899, __c59, 11) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateCentralizationRuleForOrganization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCentralizationRuleForOrganizationInput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, RoleArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateDatasetIntegration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDatasetIntegrationInput" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PipelineIdentifier: S.String, Configuration: __S(128, __c4, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateTelemetryPipeline" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTelemetryPipelineInput" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleIdentifier: S.String, Rule: __S(245, __c7, 21) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateTelemetryRule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTelemetryRuleInput" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleIdentifier: S.String, Rule: __S(245, __c7, 21) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateTelemetryRuleForOrganization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTelemetryRuleForOrganizationInput" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Configuration: __S(128, __c4, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ValidateTelemetryPipelineConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ValidateTelemetryPipelineConfigurationInput" });
    case 1:
      return S.suspend(() => S.Struct({ Errors: S.optional(__S(1730, __c54, 2)) })).annotate({
        identifier: "ValidateTelemetryPipelineConfigurationOutput",
      });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Message: S.optional(S.String),
          Reason: S.optional(S.String),
          FieldMap: S.optional(__S(1728, __c54, 0)),
        }),
      ).annotate({ identifier: "ValidationError" });
    case 2:
      return S.Array(__S(1729, __c54, 1));
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.String,
          Rule: __S(1899, __c59, 11),
          Tags: S.optional(__S(1728, __c54, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateCentralizationRuleForOrganization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCentralizationRuleForOrganizationInput" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RuleArn: S.optional(S.String) })).annotate({
        identifier: "CreateCentralizationRuleForOrganizationOutput",
      });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "SourceContextGraphConfiguration",
      });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LogGroupSelectionCriteria: S.optional(S.String),
          DataSourceSelectionCriteria: S.optional(S.String),
          EncryptedLogGroupStrategy: S.String,
        }),
      ).annotate({ identifier: "SourceLogsConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ MetricsSelectionCriteria: S.optional(S.String) })).annotate(
        { identifier: "SourceMetricsConfiguration" },
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Regions: __S(1792, __c56, 0),
          Scope: S.optional(S.String),
          SourceLogsConfiguration: S.optional(__S(1888, __c59, 0)),
          SourceMetricsConfiguration: S.optional(__S(1889, __c59, 1)),
          SourceContextGraphConfiguration: S.optional(__S(1856, __c58, 0)),
        }),
      ).annotate({ identifier: "CentralizationRuleSource" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          EncryptionStrategy: S.String,
          KmsKeyArn: S.optional(S.String),
          EncryptionConflictResolutionStrategy: S.optional(S.String),
          EncryptionScope: S.optional(S.String),
        }),
      ).annotate({ identifier: "LogsEncryptionConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Region: S.String, KmsKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "LogsBackupConfiguration" });
    case 5:
      return S.suspend(() => S.Struct({ LogGroupNamePattern: S.String })).annotate({
        identifier: "LogGroupNameConfiguration",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          DestinationRoleArn: S.String,
          TagConflictResolutionStrategy: S.optional(S.String),
        }),
      ).annotate({ identifier: "TagPropagationConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          LogsEncryptionConfiguration: S.optional(__S(1891, __c59, 3)),
          BackupConfiguration: S.optional(__S(1892, __c59, 4)),
          LogGroupNameConfiguration: S.optional(__S(1893, __c59, 5)),
          TagPropagationConfiguration: S.optional(__S(1894, __c59, 6)),
        }),
      ).annotate({ identifier: "DestinationLogsConfiguration" });
    case 8:
      return S.suspend(() => S.Struct({ Region: S.String })).annotate({
        identifier: "MetricsBackupConfiguration",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({ BackupConfiguration: S.optional(__S(1896, __c59, 8)) }),
      ).annotate({ identifier: "DestinationMetricsConfiguration" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          Region: S.String,
          Account: S.optional(S.String),
          DestinationLogsConfiguration: S.optional(__S(1895, __c59, 7)),
          DestinationMetricsConfiguration: S.optional(__S(1897, __c59, 9)),
        }),
      ).annotate({ identifier: "CentralizationRuleDestination" });
    case 11:
      return S.suspend(() =>
        S.Struct({ Source: __S(1890, __c59, 2), Destination: __S(1898, __c59, 10) }),
      ).annotate({ identifier: "CentralizationRule" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RoleArn: S.String, Tags: S.optional(__S(1728, __c54, 0)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateDatasetIntegration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDatasetIntegrationInput" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          RoleArn: S.String,
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          UpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "CreateDatasetIntegrationOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
