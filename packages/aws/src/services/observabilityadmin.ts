import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsServiceErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "ObservabilityAdmin",
  service: "ObservabilityAdmin",
  propagate: TxXray.propagate,
} as const;

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
  ).pipe(C.withServerError, C.withRetryableError) {}
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
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Errors: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(2306, __c72, 2)).annotate({
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
export type CentralizeWithDataProtection = "ENABLED" | "DISABLED" | (string & {});
export interface SourceLogsConfiguration {
  LogGroupSelectionCriteria?: string | undefined;
  DataSourceSelectionCriteria?: string | undefined;
  EncryptedLogGroupStrategy: EncryptedLogGroupStrategy;
  CentralizeWithDataProtection?: CentralizeWithDataProtection | undefined;
}
export type MetricsFilterString = string;
export interface SourceMetricsConfiguration {
  MetricsSelectionCriteria?: string | undefined;
}
export type ProfilesFilterString = string;
export interface SourceProfilesConfiguration {
  ProfilesSelectionCriteria?: string | undefined;
}
export interface SourceContextGraphConfiguration {}
export interface CentralizationRuleSource {
  Regions: string[];
  Scope?: string | undefined;
  SourceLogsConfiguration?: SourceLogsConfiguration | undefined;
  SourceMetricsConfiguration?: SourceMetricsConfiguration | undefined;
  SourceProfilesConfiguration?: SourceProfilesConfiguration | undefined;
  SourceContextGraphConfiguration?: SourceContextGraphConfiguration | undefined;
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
  KmsKeyArn?: string | undefined;
  EncryptionConflictResolutionStrategy?: EncryptionConflictResolutionStrategy | undefined;
  EncryptionScope?: EncryptionScope | undefined;
}
export interface LogsBackupConfiguration {
  Region: string;
  KmsKeyArn?: string | undefined;
}
export type LogGroupNamePattern = string;
export interface LogGroupNameConfiguration {
  LogGroupNamePattern: string;
}
export type IamRoleArn = string;
export type TagConflictResolutionStrategy = "IN_SYNC" | "ADD_ONLY" | "UPDATE_SYNC" | (string & {});
export interface TagPropagationConfiguration {
  DestinationRoleArn: string;
  TagConflictResolutionStrategy?: TagConflictResolutionStrategy | undefined;
}
export type DeletionProtection = "ENABLED" | (string & {});
export interface DestinationLogsConfiguration {
  LogsEncryptionConfiguration?: LogsEncryptionConfiguration | undefined;
  BackupConfiguration?: LogsBackupConfiguration | undefined;
  LogGroupNameConfiguration?: LogGroupNameConfiguration | undefined;
  TagPropagationConfiguration?: TagPropagationConfiguration | undefined;
  LogGroupDeletionProtection?: DeletionProtection | undefined;
}
export interface MetricsBackupConfiguration {
  Region: string;
}
export interface DestinationMetricsConfiguration {
  BackupConfiguration?: MetricsBackupConfiguration | undefined;
}
export interface ProfilesBackupConfiguration {
  Region: string;
}
export interface DestinationProfilesConfiguration {
  BackupConfiguration?: ProfilesBackupConfiguration | undefined;
}
export interface CentralizationRuleDestination {
  Region: string;
  Account?: string | undefined;
  DestinationLogsConfiguration?: DestinationLogsConfiguration | undefined;
  DestinationMetricsConfiguration?: DestinationMetricsConfiguration | undefined;
  DestinationProfilesConfiguration?: DestinationProfilesConfiguration | undefined;
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
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreateCentralizationRuleForOrganizationOutput {
  RuleArn?: string | undefined;
}
export type AzureTenantIdentifier = string;
export type AzureClientIdentifier = string;
export interface AzureConnectorConfiguration {
  TenantIdentifier: string;
  ClientIdentifier: string;
}
export type ConnectorConfiguration = { Azure: AzureConnectorConfiguration };
export type RoleArn = string;
export type ConnectorName = string;
export type ClientToken = string | redacted.Redacted<string>;
export interface CreateConnectorInput {
  ConnectorConfiguration: ConnectorConfiguration;
  RoleArn: string;
  Name: string;
  Tags?: { [key: string]: string | undefined } | undefined;
  ClientToken?: string | redacted.Redacted<string> | undefined;
}
export type ConnectorProvider = "AZURE" | (string & {});
export interface Connector {
  Arn: string;
  Provider: ConnectorProvider;
  ConnectorConfiguration: ConnectorConfiguration;
  RoleArn: string;
  Name?: string | undefined;
  CreatedTimeStamp?: number | undefined;
}
export interface CreateConnectorOutput {
  Connector: Connector;
}
export interface CreateDatasetIntegrationInput {
  RoleArn: string;
  Tags?: { [key: string]: string | undefined } | undefined;
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
  KmsKeyArn?: string | undefined;
}
export interface CreateS3TableIntegrationInput {
  Encryption: Encryption;
  RoleArn: string;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreateS3TableIntegrationOutput {
  Arn?: string | undefined;
}
export type TelemetryPipelineName = string;
export type TelemetryPipelineConfigurationBody = string;
export interface TelemetryPipelineConfiguration {
  Body: string;
}
export interface CreateTelemetryPipelineInput {
  Name: string;
  Configuration: TelemetryPipelineConfiguration;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreateTelemetryPipelineOutput {
  Arn?: string | undefined;
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
  | "AWS::XRay::TransactionSearchConfig"
  | "AWS::CloudWatchOmni"
  | "AWS::NetworkFirewall::Firewall"
  | (string & {});
export type TelemetryType = "Logs" | "Metrics" | "Traces" | "Insights" | (string & {});
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
  LogFormat?: string | undefined;
  TrafficType?: string | undefined;
  MaxAggregationInterval?: number | undefined;
}
export type StringList = string[];
export interface AdvancedFieldSelector {
  Field: string;
  Equals?: string[] | undefined;
  StartsWith?: string[] | undefined;
  EndsWith?: string[] | undefined;
  NotEquals?: string[] | undefined;
  NotStartsWith?: string[] | undefined;
  NotEndsWith?: string[] | undefined;
}
export type FieldSelectors = AdvancedFieldSelector[];
export interface AdvancedEventSelector {
  Name?: string | undefined;
  FieldSelectors: AdvancedFieldSelector[];
}
export type AdvancedEventSelectors = AdvancedEventSelector[];
export interface CloudtrailParameters {
  AdvancedEventSelectors: AdvancedEventSelector[];
}
export type OutputFormat = "plain" | "json" | (string & {});
export interface ELBLoadBalancerLoggingParameters {
  OutputFormat?: OutputFormat | undefined;
  FieldDelimiter?: string | undefined;
}
export interface SingleHeader {
  Name?: string | undefined;
}
export interface FieldToMatch {
  SingleHeader?: SingleHeader | undefined;
  UriPath?: string | undefined;
  QueryString?: string | undefined;
  Method?: string | undefined;
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
  Action?: Action | undefined;
}
export interface LabelNameCondition {
  LabelName?: string | undefined;
}
export interface Condition {
  ActionCondition?: ActionCondition | undefined;
  LabelNameCondition?: LabelNameCondition | undefined;
}
export type Conditions = Condition[];
export interface Filter {
  Behavior?: FilterBehavior | undefined;
  Requirement?: FilterRequirement | undefined;
  Conditions?: Condition[] | undefined;
}
export type Filters = Filter[];
export interface LoggingFilter {
  Filters?: Filter[] | undefined;
  DefaultBehavior?: FilterBehavior | undefined;
}
export type WAFLogType = "WAF_LOGS" | (string & {});
export interface WAFLoggingParameters {
  RedactedFields?: FieldToMatch[] | undefined;
  LoggingFilter?: LoggingFilter | undefined;
  LogType?: WAFLogType | undefined;
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
  | "FLOW_LOGS"
  | "ALERT_LOGS"
  | "TLS_LOGS"
  | (string & {});
export type LogTypes = LogType[];
export interface LogDeliveryParameters {
  LogTypes?: LogType[] | undefined;
}
export type MskEnhancedMonitoringLevel =
  | "DEFAULT"
  | "PER_BROKER"
  | "PER_TOPIC_PER_BROKER"
  | "PER_TOPIC_PER_PARTITION"
  | (string & {});
export interface MskMonitoringParameters {
  EnhancedMonitoring?: MskEnhancedMonitoringLevel | undefined;
}
export type KmsKeyArn = string;
export interface TelemetryDestinationConfiguration {
  DestinationType?: DestinationType | undefined;
  DestinationPattern?: string | undefined;
  RetentionInDays?: number | undefined;
  VPCFlowLogParameters?: VPCFlowLogParameters | undefined;
  CloudtrailParameters?: CloudtrailParameters | undefined;
  ELBLoadBalancerLoggingParameters?: ELBLoadBalancerLoggingParameters | undefined;
  WAFLoggingParameters?: WAFLoggingParameters | undefined;
  LogDeliveryParameters?: LogDeliveryParameters | undefined;
  MskMonitoringParameters?: MskMonitoringParameters | undefined;
  KmsKeyArn?: string | undefined;
}
export type AllRegions = boolean;
export interface TelemetryRule {
  ResourceType?: ResourceType | undefined;
  TelemetryType: TelemetryType;
  TelemetrySourceTypes?: TelemetrySourceType[] | undefined;
  DestinationConfiguration?: TelemetryDestinationConfiguration | undefined;
  Scope?: string | undefined;
  SelectionCriteria?: string | undefined;
  AllowFieldUpdates?: boolean | undefined;
  Regions?: string[] | undefined;
  AllRegions?: boolean | undefined;
}
export interface CreateTelemetryRuleInput {
  RuleName: string;
  Rule: TelemetryRule;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreateTelemetryRuleOutput {
  RuleArn?: string | undefined;
}
export interface CreateTelemetryRuleForOrganizationInput {
  RuleName: string;
  Rule: TelemetryRule;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreateTelemetryRuleForOrganizationOutput {
  RuleArn?: string | undefined;
}
export type RuleIdentifier = string;
export interface DeleteCentralizationRuleForOrganizationInput {
  RuleIdentifier: string;
}
export interface DeleteCentralizationRuleForOrganizationResponse {}
export type ConnectorIdentifier = string;
export interface DeleteConnectorInput {
  ConnectorIdentifier: string;
}
export interface DeleteConnectorOutput {}
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
  RuleName?: string | undefined;
  RuleArn?: string | undefined;
  CreatorAccountId?: string | undefined;
  CreatedTimeStamp?: number | undefined;
  CreatedRegion?: string | undefined;
  LastUpdateTimeStamp?: number | undefined;
  RuleHealth?: RuleHealth | undefined;
  FailureReason?: CentralizationFailureReason | undefined;
  TagPropagationStatus?: TagPropagationStatus | undefined;
  TagPropagationFailureReason?: TagPropagationFailureReason | undefined;
  ContextGraphStatus?: ContextGraphStatus | undefined;
  CentralizationRule?: CentralizationRule | undefined;
}
export interface GetConnectorInput {
  ConnectorIdentifier: string;
}
export interface GetConnectorOutput {
  Connector: Connector;
}
export interface GetConnectorTelemetryManifestInput {
  ConnectorIdentifier: string;
}
export type AzureTelemetryType = "ResourceLogs" | "Metrics" | "FlowLogs" | (string & {});
export type AzureTelemetryTypeList = AzureTelemetryType[];
export interface AllSubscriptions {}
export type AzureSubscriptionId = string;
export type AzureSubscriptionIdList = string[];
export type AzureSubscriptionScope =
  | { All: AllSubscriptions; Ids?: undefined }
  | { All?: undefined; Ids: string[] };
export type AzureRegion = string;
export type AzureRegionList = string[];
export type AzureResourceType = string;
export type AzureResourceTypeList = string[];
export type TagFilterKey = string;
export type TagFilterValue = string;
export type TagFilterValues = string[];
export interface TagFilter {
  Key: string;
  Values: string[];
}
export type TagFilterList = TagFilter[];
export type ManifestAzureResourceId = string;
export type AzureResourceIdList = string[];
export interface AzureResourceIdScope {
  Region: string;
  ResourceIds: string[];
}
export type AzureResourceIdScopeList = AzureResourceIdScope[];
export interface AzureScope {
  Subscriptions?: AzureSubscriptionScope | undefined;
  Regions?: string[] | undefined;
  ResourceTypes?: string[] | undefined;
  TagFilters?: TagFilter[] | undefined;
  Resources?: AzureResourceIdScope[] | undefined;
}
export interface AzureScopeItem {
  TelemetryTypes: AzureTelemetryType[];
  Scope: AzureScope;
}
export type AzureSources = AzureScopeItem[];
export type TelemetryManifestSource = { Azure: AzureScopeItem[] };
export type AzureEventHubTier = "Standard" | "Premium" | (string & {});
export type AzureEventHubPartitionCount = number;
export interface AzureEventHubConfiguration {
  Tier: AzureEventHubTier;
  PartitionCount: number;
}
export type AzureEventHubConfigurationList = AzureEventHubConfiguration[];
export type AzureStorageAccountId = string;
export type AzureStorageAccountIdList = string[];
export interface AzureFlowLogStorageAccountScope {
  Region: string;
  StorageAccountIds: string[];
}
export type AzureFlowLogStorageAccountScopeList = AzureFlowLogStorageAccountScope[];
export interface AzureCustomerManagedFlowLogs {
  StorageAccounts: AzureFlowLogStorageAccountScope[];
}
export type AzureFlowLogRetentionDays = number;
export interface AzureAwsManagedFlowLogs {
  RetentionDays: number;
}
export type AzureFlowLogsInfrastructure =
  | { CustomerManaged: AzureCustomerManagedFlowLogs; AwsManaged?: undefined }
  | { CustomerManaged?: undefined; AwsManaged: AzureAwsManagedFlowLogs };
export interface AzureInfrastructure {
  SubscriptionId?: string | undefined;
  EventHubs?: AzureEventHubConfiguration[] | undefined;
  FlowLogs?: AzureFlowLogsInfrastructure | undefined;
}
export type TelemetryManifestInfrastructure = { Azure: AzureInfrastructure };
export interface TelemetryManifest {
  Source: TelemetryManifestSource;
  Infrastructure?: TelemetryManifestInfrastructure | undefined;
}
export interface GetConnectorTelemetryManifestOutput {
  Manifest: TelemetryManifest;
  Version: number;
  LastUpdateTimeStamp?: number | undefined;
}
export type SetupFormat = "BICEP" | (string & {});
export interface GetConnectorTelemetrySetupInput {
  ConnectorIdentifier: string;
  Format?: SetupFormat | undefined;
}
export type SetupArtifactFileName = string;
export type SetupArtifactContent = string;
export type SetupArtifactContentType = string;
export interface SetupArtifact {
  FileName: string;
  Content: string;
  Format: SetupFormat;
  ContentType?: string | undefined;
}
export type SetupArtifactList = SetupArtifact[];
export type Permission = string;
export type PermissionList = string[];
export interface GetConnectorTelemetrySetupOutput {
  Artifacts: SetupArtifact[];
  RequiredPermissionsToApply?: string[] | undefined;
  Format: SetupFormat;
  Provider?: ConnectorProvider | undefined;
  ManifestVersion?: number | undefined;
}
export interface GetDatasetIntegrationInput {
  Arn: string;
}
export interface GetDatasetIntegrationOutput {
  Arn?: string | undefined;
  RoleArn?: string | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
}
export interface GetS3TableIntegrationInput {
  Arn: string;
}
export type IntegrationStatus = "ACTIVE" | "DELETING" | (string & {});
export interface GetS3TableIntegrationOutput {
  Arn?: string | undefined;
  RoleArn?: string | undefined;
  Status?: IntegrationStatus | undefined;
  Encryption?: Encryption | undefined;
  DestinationTableBucketArn?: string | undefined;
  CreatedTimeStamp?: number | undefined;
}
export interface GetTelemetryEnrichmentStatusRequest {}
export type TelemetryEnrichmentStatus = "Running" | "Stopped" | "Impaired" | (string & {});
export type AwsResourceExplorerManagedViewArn = string;
export interface GetTelemetryEnrichmentStatusOutput {
  Status?: TelemetryEnrichmentStatus | undefined;
  AwsResourceExplorerManagedViewArn?: string | undefined;
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
  Region?: string | undefined;
  Status?: string | undefined;
  FailureReason?: string | undefined;
  RuleArn?: string | undefined;
}
export type RegionStatuses = RegionStatus[];
export interface GetTelemetryEvaluationStatusOutput {
  Status?: Status | undefined;
  FailureReason?: string | undefined;
  HomeRegion?: string | undefined;
  RegionStatuses?: RegionStatus[] | undefined;
}
export interface GetTelemetryEvaluationStatusForOrganizationRequest {}
export interface GetTelemetryEvaluationStatusForOrganizationOutput {
  Status?: Status | undefined;
  FailureReason?: string | undefined;
  HomeRegion?: string | undefined;
  RegionStatuses?: RegionStatus[] | undefined;
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
  Description?: string | undefined;
}
export type TagMapOutput = { [key: string]: string | undefined };
export interface SourceProgress {
  Active?: number | undefined;
  Total?: number | undefined;
}
export interface Source {
  Type?: string | undefined;
}
export type Sources = Source[];
export interface DataSource {
  Name?: string | undefined;
  Type?: string | undefined;
}
export type DataSources = DataSource[];
export type Processors = string[];
export type Sinks = string[];
export interface ConfigurationSummary {
  Sources?: Source[] | undefined;
  DataSources?: DataSource[] | undefined;
  Processors?: string[] | undefined;
  ProcessorCount?: number | undefined;
  Sinks?: string[] | undefined;
}
export interface TelemetryPipeline {
  CreatedTimeStamp?: number | undefined;
  LastUpdateTimeStamp?: number | undefined;
  Arn?: string | undefined;
  Name?: string | undefined;
  Configuration?: TelemetryPipelineConfiguration | undefined;
  Status?: TelemetryPipelineStatus | undefined;
  StatusReason?: TelemetryPipelineStatusReason | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  LastRefreshTimeStamp?: number | undefined;
  SourceProgress?: SourceProgress | undefined;
  ConfigurationSummary?: ConfigurationSummary | undefined;
}
export interface GetTelemetryPipelineOutput {
  Pipeline?: TelemetryPipeline | undefined;
}
export interface GetTelemetryRuleInput {
  RuleIdentifier: string;
}
export type IsReplicated = boolean;
export interface GetTelemetryRuleOutput {
  RuleName?: string | undefined;
  RuleArn?: string | undefined;
  CreatedTimeStamp?: number | undefined;
  LastUpdateTimeStamp?: number | undefined;
  TelemetryRule?: TelemetryRule | undefined;
  HomeRegion?: string | undefined;
  IsReplicated?: boolean | undefined;
  RegionStatuses?: RegionStatus[] | undefined;
}
export interface GetTelemetryRuleForOrganizationInput {
  RuleIdentifier: string;
}
export interface GetTelemetryRuleForOrganizationOutput {
  RuleName?: string | undefined;
  RuleArn?: string | undefined;
  CreatedTimeStamp?: number | undefined;
  LastUpdateTimeStamp?: number | undefined;
  TelemetryRule?: TelemetryRule | undefined;
  HomeRegion?: string | undefined;
  IsReplicated?: boolean | undefined;
  RegionStatuses?: RegionStatus[] | undefined;
}
export type ThirdPartyTelemetryEnrichmentIdentifier = string;
export interface GetThirdPartyTelemetryEnrichmentInput {
  TelemetryEnrichmentIdentifier: string;
}
export type ThirdPartyTelemetryEnrichmentArn = string;
export type ThirdPartyTelemetryEnrichmentName = string;
export type ThirdPartyTelemetryEnrichmentStatus =
  | "Initializing"
  | "Running"
  | "Stopped"
  | "Impaired"
  | (string & {});
export type StatusReason = string;
export type AwsConfigConnectorArn = string;
export type ServiceLinkedRecorderArn = string;
export interface AzureTelemetrySourceConfigurationOutput {
  AwsConfigConnectorArn?: string | undefined;
  ServiceLinkedRecorderArn?: string | undefined;
}
export type TelemetrySourceConfigurationOutput = { Azure: AzureTelemetrySourceConfigurationOutput };
export interface GetThirdPartyTelemetryEnrichmentOutput {
  Arn?: string | undefined;
  Name: string;
  Status: ThirdPartyTelemetryEnrichmentStatus;
  StatusReason?: string | undefined;
  TelemetrySourceConfiguration: TelemetrySourceConfigurationOutput;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export type ListCentralizationRulesForOrganizationMaxResults = number;
export type NextToken = string;
export interface ListCentralizationRulesForOrganizationInput {
  RuleNamePrefix?: string | undefined;
  AllRegions?: boolean | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface CentralizationRuleSummary {
  RuleName?: string | undefined;
  RuleArn?: string | undefined;
  CreatorAccountId?: string | undefined;
  CreatedTimeStamp?: number | undefined;
  CreatedRegion?: string | undefined;
  LastUpdateTimeStamp?: number | undefined;
  RuleHealth?: RuleHealth | undefined;
  FailureReason?: CentralizationFailureReason | undefined;
  TagPropagationStatus?: TagPropagationStatus | undefined;
  TagPropagationFailureReason?: TagPropagationFailureReason | undefined;
  ContextGraphStatus?: ContextGraphStatus | undefined;
  DestinationAccountId?: string | undefined;
  DestinationRegion?: string | undefined;
}
export type CentralizationRuleSummaries = CentralizationRuleSummary[];
export interface ListCentralizationRulesForOrganizationOutput {
  CentralizationRuleSummaries?: CentralizationRuleSummary[] | undefined;
  NextToken?: string | undefined;
}
export type ListConnectorsMaxResults = number;
export type ConnectorNextToken = string | redacted.Redacted<string>;
export interface ListConnectorsInput {
  MaxResults?: number | undefined;
  NextToken?: string | redacted.Redacted<string> | undefined;
}
export interface ConnectorSummary {
  Arn: string;
  Provider: ConnectorProvider;
  Name?: string | undefined;
  CreatedTimeStamp?: number | undefined;
}
export type ConnectorSummaries = ConnectorSummary[];
export interface ListConnectorsOutput {
  ConnectorSummaries: ConnectorSummary[];
  NextToken?: string | redacted.Redacted<string> | undefined;
}
export type ListDatasetIntegrationsMaxResults = number;
export interface ListDatasetIntegrationsInput {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DatasetIntegrationSummary {
  Arn: string;
  RoleArn?: string | undefined;
  CreatedAt?: Date | undefined;
  UpdatedAt?: Date | undefined;
}
export type DatasetIntegrationSummaries = DatasetIntegrationSummary[];
export interface ListDatasetIntegrationsOutput {
  DatasetIntegrationSummaries: DatasetIntegrationSummary[];
  NextToken?: string | undefined;
}
export type AzureManagementGroupId = string;
export interface AzureManagementGroupsQuery {
  ParentManagementGroupId?: string | undefined;
}
export interface AzureSubscriptionsQuery {
  ManagementGroupId?: string | undefined;
}
export interface AzureQueryScope {
  ManagementGroupId?: string | undefined;
  SubscriptionIds?: string[] | undefined;
}
export interface AzureResourceTypesQuery {
  Scope?: AzureQueryScope | undefined;
}
export interface AzureRegionsQuery {
  Scope?: AzureQueryScope | undefined;
}
export interface AzureResourceIdsQuery {
  Scope?: AzureQueryScope | undefined;
  ResourceType?: string | undefined;
  Region?: string | undefined;
  TagFilters?: TagFilter[] | undefined;
}
export type AzureEventHubNamespaceName = string;
export interface AzureEventHubsQuery {
  Scope?: AzureQueryScope | undefined;
  NamespaceName?: string | undefined;
  Region?: string | undefined;
}
export type AzureConnectorQuery =
  | {
      ManagementGroups: AzureManagementGroupsQuery;
      Subscriptions?: undefined;
      ResourceTypes?: undefined;
      Regions?: undefined;
      ResourceIds?: undefined;
      EventHubs?: undefined;
    }
  | {
      ManagementGroups?: undefined;
      Subscriptions: AzureSubscriptionsQuery;
      ResourceTypes?: undefined;
      Regions?: undefined;
      ResourceIds?: undefined;
      EventHubs?: undefined;
    }
  | {
      ManagementGroups?: undefined;
      Subscriptions?: undefined;
      ResourceTypes: AzureResourceTypesQuery;
      Regions?: undefined;
      ResourceIds?: undefined;
      EventHubs?: undefined;
    }
  | {
      ManagementGroups?: undefined;
      Subscriptions?: undefined;
      ResourceTypes?: undefined;
      Regions: AzureRegionsQuery;
      ResourceIds?: undefined;
      EventHubs?: undefined;
    }
  | {
      ManagementGroups?: undefined;
      Subscriptions?: undefined;
      ResourceTypes?: undefined;
      Regions?: undefined;
      ResourceIds: AzureResourceIdsQuery;
      EventHubs?: undefined;
    }
  | {
      ManagementGroups?: undefined;
      Subscriptions?: undefined;
      ResourceTypes?: undefined;
      Regions?: undefined;
      ResourceIds?: undefined;
      EventHubs: AzureEventHubsQuery;
    };
export type ConnectorQuery = { Azure: AzureConnectorQuery };
export type ListResourcesByConnectorMaxResults = number;
export interface ListResourcesByConnectorInput {
  ConnectorIdentifier: string;
  Selector: ConnectorQuery;
  MaxResults?: number | undefined;
  NextToken?: string | redacted.Redacted<string> | undefined;
}
export interface AzureManagementGroupSummary {
  Id: string;
  Name?: string | undefined;
  DisplayName?: string | undefined;
}
export type AzureManagementGroupSummaries = AzureManagementGroupSummary[];
export interface AzureSubscriptionSummary {
  SubscriptionId: string;
  DisplayName?: string | undefined;
  State?: string | undefined;
  ManagementGroupId?: string | undefined;
}
export type AzureSubscriptionSummaries = AzureSubscriptionSummary[];
export type AzureResourceId = string;
export type AzureResourceTagKey = string;
export type AzureResourceTagValue = string;
export type AzureResourceTags = { [key: string]: string | undefined };
export interface AzureResourceIdentifierSummary {
  ResourceId: string;
  ResourceType?: string | undefined;
  Region?: string | undefined;
  SubscriptionId?: string | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export type AzureResourceIdentifierSummaries = AzureResourceIdentifierSummary[];
export interface AzureEventHubSummary {
  ResourceId: string;
  EventHubName: string;
  NamespaceName: string;
  FullyQualifiedNamespace: string;
  Region?: string | undefined;
  SubscriptionId?: string | undefined;
}
export type AzureEventHubSummaries = AzureEventHubSummary[];
export type AzureConnectorQueryResults =
  | {
      ManagementGroups: AzureManagementGroupSummary[];
      Subscriptions?: undefined;
      ResourceTypes?: undefined;
      Regions?: undefined;
      ResourceIds?: undefined;
      EventHubs?: undefined;
    }
  | {
      ManagementGroups?: undefined;
      Subscriptions: AzureSubscriptionSummary[];
      ResourceTypes?: undefined;
      Regions?: undefined;
      ResourceIds?: undefined;
      EventHubs?: undefined;
    }
  | {
      ManagementGroups?: undefined;
      Subscriptions?: undefined;
      ResourceTypes: string[];
      Regions?: undefined;
      ResourceIds?: undefined;
      EventHubs?: undefined;
    }
  | {
      ManagementGroups?: undefined;
      Subscriptions?: undefined;
      ResourceTypes?: undefined;
      Regions: string[];
      ResourceIds?: undefined;
      EventHubs?: undefined;
    }
  | {
      ManagementGroups?: undefined;
      Subscriptions?: undefined;
      ResourceTypes?: undefined;
      Regions?: undefined;
      ResourceIds: AzureResourceIdentifierSummary[];
      EventHubs?: undefined;
    }
  | {
      ManagementGroups?: undefined;
      Subscriptions?: undefined;
      ResourceTypes?: undefined;
      Regions?: undefined;
      ResourceIds?: undefined;
      EventHubs: AzureEventHubSummary[];
    };
export type ConnectorQueryResults = { Azure: AzureConnectorQueryResults };
export interface ListResourcesByConnectorOutput {
  Results: ConnectorQueryResults;
  NextToken?: string | redacted.Redacted<string> | undefined;
}
export type ResourceIdentifierPrefix = string;
export type ResourceTypes = ResourceType[];
export type TelemetryState = "Enabled" | "Disabled" | "NotApplicable" | (string & {});
export type TelemetryConfigurationState = { [key in TelemetryType]?: TelemetryState | undefined };
export type ListResourceTelemetryMaxResults = number;
export interface ListResourceTelemetryInput {
  ResourceIdentifierPrefix?: string | undefined;
  ResourceTypes?: ResourceType[] | undefined;
  TelemetryConfigurationState?: { [key: string]: TelemetryState | undefined } | undefined;
  ResourceTags?: { [key: string]: string | undefined } | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type ResourceIdentifier = string;
export interface TelemetryConfiguration {
  AccountIdentifier?: string | undefined;
  TelemetryConfigurationState?: { [key: string]: TelemetryState | undefined } | undefined;
  ResourceType?: ResourceType | undefined;
  ResourceIdentifier?: string | undefined;
  ResourceTags?: { [key: string]: string | undefined } | undefined;
  LastUpdateTimeStamp?: number | undefined;
  TelemetrySourceType?: TelemetrySourceType | undefined;
}
export type TelemetryConfigurations = TelemetryConfiguration[];
export interface ListResourceTelemetryOutput {
  TelemetryConfigurations?: TelemetryConfiguration[] | undefined;
  NextToken?: string | undefined;
}
export type AccountIdentifiers = string[];
export type ListResourceTelemetryForOrganizationMaxResults = number;
export interface ListResourceTelemetryForOrganizationInput {
  AccountIdentifiers?: string[] | undefined;
  ResourceIdentifierPrefix?: string | undefined;
  ResourceTypes?: ResourceType[] | undefined;
  TelemetryConfigurationState?: { [key: string]: TelemetryState | undefined } | undefined;
  ResourceTags?: { [key: string]: string | undefined } | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface ListResourceTelemetryForOrganizationOutput {
  TelemetryConfigurations?: TelemetryConfiguration[] | undefined;
  NextToken?: string | undefined;
}
export type ListS3TableIntegrationsMaxResults = number;
export interface ListS3TableIntegrationsInput {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface IntegrationSummary {
  Arn?: string | undefined;
  Status?: IntegrationStatus | undefined;
}
export type IntegrationSummaries = IntegrationSummary[];
export interface ListS3TableIntegrationsOutput {
  IntegrationSummaries?: IntegrationSummary[] | undefined;
  NextToken?: string | undefined;
}
export interface ListTagsForResourceInput {
  ResourceARN: string;
}
export interface ListTagsForResourceOutput {
  Tags: { [key: string]: string | undefined };
}
export type ListTelemetryPipelinesMaxResults = number;
export interface ListTelemetryPipelinesInput {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface TelemetryPipelineSummary {
  CreatedTimeStamp?: number | undefined;
  LastUpdateTimeStamp?: number | undefined;
  Arn?: string | undefined;
  Name?: string | undefined;
  Status?: TelemetryPipelineStatus | undefined;
  Tags?: { [key: string]: string | undefined } | undefined;
  ConfigurationSummary?: ConfigurationSummary | undefined;
}
export type TelemetryPipelineSummaries = TelemetryPipelineSummary[];
export interface ListTelemetryPipelinesOutput {
  PipelineSummaries?: TelemetryPipelineSummary[] | undefined;
  NextToken?: string | undefined;
}
export type ListTelemetryRulesMaxResults = number;
export interface ListTelemetryRulesInput {
  RuleNamePrefix?: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface TelemetryRuleSummary {
  RuleName?: string | undefined;
  RuleArn?: string | undefined;
  CreatedTimeStamp?: number | undefined;
  LastUpdateTimeStamp?: number | undefined;
  ResourceType?: ResourceType | undefined;
  TelemetryType?: TelemetryType | undefined;
  TelemetrySourceTypes?: TelemetrySourceType[] | undefined;
}
export type TelemetryRuleSummaries = TelemetryRuleSummary[];
export interface ListTelemetryRulesOutput {
  TelemetryRuleSummaries?: TelemetryRuleSummary[] | undefined;
  NextToken?: string | undefined;
}
export type OrganizationUnitIdentifier = string;
export type OrganizationUnitIdentifiers = string[];
export type ListTelemetryRulesForOrganizationMaxResults = number;
export interface ListTelemetryRulesForOrganizationInput {
  RuleNamePrefix?: string | undefined;
  SourceAccountIds?: string[] | undefined;
  SourceOrganizationUnitIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface ListTelemetryRulesForOrganizationOutput {
  TelemetryRuleSummaries?: TelemetryRuleSummary[] | undefined;
  NextToken?: string | undefined;
}
export type ThirdPartyTelemetrySource = "Azure" | (string & {});
export type ListThirdPartyTelemetryEnrichmentsMaxResults = number;
export interface ListThirdPartyTelemetryEnrichmentsInput {
  Status?: ThirdPartyTelemetryEnrichmentStatus | undefined;
  TelemetrySource?: ThirdPartyTelemetrySource | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface ThirdPartyTelemetryEnrichmentSummary {
  Name?: string | undefined;
  TelemetrySource?: ThirdPartyTelemetrySource | undefined;
  Status?: ThirdPartyTelemetryEnrichmentStatus | undefined;
}
export type ThirdPartyTelemetryEnrichmentSummaries = ThirdPartyTelemetryEnrichmentSummary[];
export interface ListThirdPartyTelemetryEnrichmentsOutput {
  TelemetryEnrichments?: ThirdPartyTelemetryEnrichmentSummary[] | undefined;
  NextToken?: string | undefined;
}
export interface PutConnectorTelemetryManifestInput {
  ConnectorIdentifier: string;
  Manifest: TelemetryManifest;
  ExpectedVersion?: number | undefined;
  ClientToken?: string | redacted.Redacted<string> | undefined;
}
export interface PutConnectorTelemetryManifestOutput {
  Version: number;
}
export interface StartTelemetryEnrichmentRequest {}
export interface StartTelemetryEnrichmentOutput {
  Status?: TelemetryEnrichmentStatus | undefined;
  AwsResourceExplorerManagedViewArn?: string | undefined;
}
export interface StartTelemetryEvaluationInput {
  Regions?: string[] | undefined;
  AllRegions?: boolean | undefined;
}
export interface StartTelemetryEvaluationResponse {}
export interface StartTelemetryEvaluationForOrganizationInput {
  Regions?: string[] | undefined;
  AllRegions?: boolean | undefined;
}
export interface StartTelemetryEvaluationForOrganizationResponse {}
export interface StartTelemetryPipelineRefreshInput {
  PipelineIdentifier: string;
}
export interface StartTelemetryPipelineRefreshOutput {}
export interface AzureTelemetrySourceConfigurationInput {
  AwsConfigConnectorArn: string;
}
export type TelemetrySourceConfigurationInput = { Azure: AzureTelemetrySourceConfigurationInput };
export interface StartThirdPartyTelemetryEnrichmentInput {
  Name: string;
  TelemetrySourceConfiguration: TelemetrySourceConfigurationInput;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface StartThirdPartyTelemetryEnrichmentOutput {
  Arn: string;
  Name: string;
  Status: ThirdPartyTelemetryEnrichmentStatus;
  StatusReason?: string | undefined;
  TelemetrySourceConfiguration: TelemetrySourceConfigurationOutput;
  Tags?: { [key: string]: string | undefined } | undefined;
}
export interface StopTelemetryEnrichmentRequest {}
export interface StopTelemetryEnrichmentOutput {
  Status?: TelemetryEnrichmentStatus | undefined;
}
export interface StopTelemetryEvaluationRequest {}
export interface StopTelemetryEvaluationResponse {}
export interface StopTelemetryEvaluationForOrganizationRequest {}
export interface StopTelemetryEvaluationForOrganizationResponse {}
export interface StopThirdPartyTelemetryEnrichmentInput {
  TelemetryEnrichmentIdentifier: string;
}
export interface StopThirdPartyTelemetryEnrichmentOutput {
  Name: string;
  TelemetrySource: ThirdPartyTelemetrySource;
  Status: ThirdPartyTelemetryEnrichmentStatus;
  StatusReason?: string | undefined;
}
export interface TagResourceInput {
  ResourceARN: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type RecordFormat = "STRING" | "JSON" | (string & {});
export interface Record {
  Data?: string | undefined;
  Type?: RecordFormat | undefined;
}
export type Records = Record[];
export type SignalType = "LOG" | "METRIC" | (string & {});
export interface TestTelemetryPipelineInput {
  Records: Record[];
  Configuration: TelemetryPipelineConfiguration;
  SignalType?: SignalType | undefined;
}
export interface PipelineOutputError {
  Message?: string | undefined;
}
export interface PipelineOutput {
  Record?: Record | undefined;
  Error?: PipelineOutputError | undefined;
}
export type PipelineOutputs = PipelineOutput[];
export interface TestTelemetryPipelineOutput {
  Results?: PipelineOutput[] | undefined;
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
  RuleArn?: string | undefined;
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
  RuleArn?: string | undefined;
}
export interface UpdateTelemetryRuleForOrganizationInput {
  RuleIdentifier: string;
  Rule: TelemetryRule;
}
export interface UpdateTelemetryRuleForOrganizationOutput {
  RuleArn?: string | undefined;
}
export interface ValidateTelemetryPipelineConfigurationInput {
  Configuration: TelemetryPipelineConfiguration;
}
export type FieldMap = { [key: string]: string | undefined };
export interface ValidationError {
  Message?: string | undefined;
  Reason?: string | undefined;
  FieldMap?: { [key: string]: string | undefined } | undefined;
}
export type ValidationErrors = ValidationError[];
export interface ValidateTelemetryPipelineConfigurationOutput {
  Errors?: ValidationError[] | undefined;
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
  CreateCentralizationRuleForOrganizationInput & RegionInput,
  CreateCentralizationRuleForOrganizationOutput,
  CreateCentralizationRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2336, __c73, 0) as any as S.Schema<CreateCentralizationRuleForOrganizationInput>,
  output: __S(2400, __c75, 0) as any as S.Schema<CreateCentralizationRuleForOrganizationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCentralizationRuleForOrganization",
  telemetry: TELEMETRY,
  span: "CreateCentralizationRuleForOrganization",
}));

export type CreateConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a connector to a third-party cloud provider. With a connector, you can discover resources in the provider and collect their telemetry. Currently, Microsoft Azure is the only supported provider.
 */
export const createConnector: API.OperationMethod<
  CreateConnectorInput & RegionInput,
  CreateConnectorOutput,
  CreateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2496, __c78, 0) as any as S.Schema<CreateConnectorInput>,
  output: __S(2531, __c79, 3) as any as S.Schema<CreateConnectorOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnector",
  telemetry: TELEMETRY,
  span: "CreateConnector",
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
  CreateDatasetIntegrationInput & RegionInput,
  CreateDatasetIntegrationOutput,
  CreateDatasetIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateDatasetIntegrationInput>,
  output: __S(32, __c1, 0) as any as S.Schema<CreateDatasetIntegrationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDatasetIntegration",
  telemetry: TELEMETRY,
  span: "CreateDatasetIntegration",
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
  CreateS3TableIntegrationInput & RegionInput,
  CreateS3TableIntegrationOutput,
  CreateS3TableIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c2, 0) as any as S.Schema<CreateS3TableIntegrationInput>,
  output: __S(96, __c3, 0) as any as S.Schema<CreateS3TableIntegrationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateS3TableIntegration",
  telemetry: TELEMETRY,
  span: "CreateS3TableIntegration",
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
  CreateTelemetryPipelineInput & RegionInput,
  CreateTelemetryPipelineOutput,
  CreateTelemetryPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c5, 0) as any as S.Schema<CreateTelemetryPipelineInput>,
  output: __S(96, __c3, 0) as any as S.Schema<CreateTelemetryPipelineOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTelemetryPipeline",
  telemetry: TELEMETRY,
  span: "CreateTelemetryPipeline",
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
  CreateTelemetryRuleInput & RegionInput,
  CreateTelemetryRuleOutput,
  CreateTelemetryRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<CreateTelemetryRuleInput>,
  output: __S(2400, __c75, 0) as any as S.Schema<CreateTelemetryRuleOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTelemetryRule",
  telemetry: TELEMETRY,
  span: "CreateTelemetryRule",
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
  CreateTelemetryRuleForOrganizationInput & RegionInput,
  CreateTelemetryRuleForOrganizationOutput,
  CreateTelemetryRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<CreateTelemetryRuleForOrganizationInput>,
  output: __S(2400, __c75, 0) as any as S.Schema<CreateTelemetryRuleForOrganizationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTelemetryRuleForOrganization",
  telemetry: TELEMETRY,
  span: "CreateTelemetryRuleForOrganization",
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
  DeleteCentralizationRuleForOrganizationInput & RegionInput,
  DeleteCentralizationRuleForOrganizationResponse,
  DeleteCentralizationRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<DeleteCentralizationRuleForOrganizationInput>,
  output: __S(2432, __c76, 0) as any as S.Schema<DeleteCentralizationRuleForOrganizationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCentralizationRuleForOrganization",
  telemetry: TELEMETRY,
  span: "DeleteCentralizationRuleForOrganization",
}));

export type DeleteConnectorError =
  | AccessDeniedException
  | InternalServerException
  | InvalidStateException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a connector and its telemetry manifest.
 */
export const deleteConnector: API.OperationMethod<
  DeleteConnectorInput & RegionInput,
  DeleteConnectorOutput,
  DeleteConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<DeleteConnectorInput>,
  output: __S(2432, __c76, 0) as any as S.Schema<DeleteConnectorOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidStateException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnector",
  telemetry: TELEMETRY,
  span: "DeleteConnector",
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
  DeleteDatasetIntegrationInput & RegionInput,
  DeleteDatasetIntegrationResponse,
  DeleteDatasetIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<DeleteDatasetIntegrationInput>,
  output: __S(2432, __c76, 0) as any as S.Schema<DeleteDatasetIntegrationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDatasetIntegration",
  telemetry: TELEMETRY,
  span: "DeleteDatasetIntegration",
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
  DeleteS3TableIntegrationInput & RegionInput,
  DeleteS3TableIntegrationResponse,
  DeleteS3TableIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c14, 0) as any as S.Schema<DeleteS3TableIntegrationInput>,
  output: __S(2432, __c76, 0) as any as S.Schema<DeleteS3TableIntegrationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidStateException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteS3TableIntegration",
  telemetry: TELEMETRY,
  span: "DeleteS3TableIntegration",
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
  DeleteTelemetryPipelineInput & RegionInput,
  DeleteTelemetryPipelineOutput,
  DeleteTelemetryPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<DeleteTelemetryPipelineInput>,
  output: __S(2432, __c76, 0) as any as S.Schema<DeleteTelemetryPipelineOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTelemetryPipeline",
  telemetry: TELEMETRY,
  span: "DeleteTelemetryPipeline",
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
  DeleteTelemetryRuleInput & RegionInput,
  DeleteTelemetryRuleResponse,
  DeleteTelemetryRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<DeleteTelemetryRuleInput>,
  output: __S(2432, __c76, 0) as any as S.Schema<DeleteTelemetryRuleResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTelemetryRule",
  telemetry: TELEMETRY,
  span: "DeleteTelemetryRule",
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
  DeleteTelemetryRuleForOrganizationInput & RegionInput,
  DeleteTelemetryRuleForOrganizationResponse,
  DeleteTelemetryRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<DeleteTelemetryRuleForOrganizationInput>,
  output: __S(2432, __c76, 0) as any as S.Schema<DeleteTelemetryRuleForOrganizationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTelemetryRuleForOrganization",
  telemetry: TELEMETRY,
  span: "DeleteTelemetryRuleForOrganization",
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
  GetCentralizationRuleForOrganizationInput & RegionInput,
  GetCentralizationRuleForOrganizationOutput,
  GetCentralizationRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<GetCentralizationRuleForOrganizationInput>,
  output: __S(577, __c18, 1) as any as S.Schema<GetCentralizationRuleForOrganizationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCentralizationRuleForOrganization",
  telemetry: TELEMETRY,
  span: "GetCentralizationRuleForOrganization",
}));

export type GetConnectorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a connector.
 */
export const getConnector: API.OperationMethod<
  GetConnectorInput & RegionInput,
  GetConnectorOutput,
  GetConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<GetConnectorInput>,
  output: __S(2531, __c79, 3) as any as S.Schema<GetConnectorOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnector",
  telemetry: TELEMETRY,
  span: "GetConnector",
}));

export type GetConnectorTelemetryManifestError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the telemetry manifest of a connector and its current version. If the connector has no telemetry manifest, this operation returns a `ResourceNotFoundException`.
 */
export const getConnectorTelemetryManifest: API.OperationMethod<
  GetConnectorTelemetryManifestInput & RegionInput,
  GetConnectorTelemetryManifestOutput,
  GetConnectorTelemetryManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<GetConnectorTelemetryManifestInput>,
  output: __S(641, __c20, 1) as any as S.Schema<GetConnectorTelemetryManifestOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectorTelemetryManifest",
  telemetry: TELEMETRY,
  span: "GetConnectorTelemetryManifest",
}));

export type GetConnectorTelemetrySetupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Generates the artifacts that you use to create the infrastructure in your cloud provider that delivers the telemetry declared in the connector's telemetry manifest. This operation doesn't change any resources in your cloud provider or in Amazon Web Services.
 */
export const getConnectorTelemetrySetup: API.OperationMethod<
  GetConnectorTelemetrySetupInput & RegionInput,
  GetConnectorTelemetrySetupOutput,
  GetConnectorTelemetrySetupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<GetConnectorTelemetrySetupInput>,
  output: __S(739, __c23, 3) as any as S.Schema<GetConnectorTelemetrySetupOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectorTelemetrySetup",
  telemetry: TELEMETRY,
  span: "GetConnectorTelemetrySetup",
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
  GetDatasetIntegrationInput & RegionInput,
  GetDatasetIntegrationOutput,
  GetDatasetIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<GetDatasetIntegrationInput>,
  output: __S(769, __c24, 1) as any as S.Schema<GetDatasetIntegrationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDatasetIntegration",
  telemetry: TELEMETRY,
  span: "GetDatasetIntegration",
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
  GetS3TableIntegrationInput & RegionInput,
  GetS3TableIntegrationOutput,
  GetS3TableIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<GetS3TableIntegrationInput>,
  output: __S(801, __c25, 1) as any as S.Schema<GetS3TableIntegrationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetS3TableIntegration",
  telemetry: TELEMETRY,
  span: "GetS3TableIntegration",
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
  GetTelemetryEnrichmentStatusRequest & RegionInput,
  GetTelemetryEnrichmentStatusOutput,
  GetTelemetryEnrichmentStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<GetTelemetryEnrichmentStatusRequest>,
  output: __S(864, __c27, 0) as any as S.Schema<GetTelemetryEnrichmentStatusOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryEnrichmentStatus",
  telemetry: TELEMETRY,
  span: "GetTelemetryEnrichmentStatus",
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
  GetTelemetryEvaluationStatusRequest & RegionInput,
  GetTelemetryEvaluationStatusOutput,
  GetTelemetryEvaluationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<GetTelemetryEvaluationStatusRequest>,
  output: __S(928, __c29, 0) as any as S.Schema<GetTelemetryEvaluationStatusOutput>,
  errors: [AccessDeniedException, InternalServerException, TooManyRequestsException],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryEvaluationStatus",
  telemetry: TELEMETRY,
  span: "GetTelemetryEvaluationStatus",
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
  GetTelemetryEvaluationStatusForOrganizationRequest & RegionInput,
  GetTelemetryEvaluationStatusForOrganizationOutput,
  GetTelemetryEvaluationStatusForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<GetTelemetryEvaluationStatusForOrganizationRequest>,
  output: __S(928, __c29, 0) as any as S.Schema<GetTelemetryEvaluationStatusForOrganizationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryEvaluationStatusForOrganization",
  telemetry: TELEMETRY,
  span: "GetTelemetryEvaluationStatusForOrganization",
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
  GetTelemetryPipelineInput & RegionInput,
  GetTelemetryPipelineOutput,
  GetTelemetryPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<GetTelemetryPipelineInput>,
  output: __S(1028, __c32, 4) as any as S.Schema<GetTelemetryPipelineOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryPipeline",
  telemetry: TELEMETRY,
  span: "GetTelemetryPipeline",
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
  GetTelemetryRuleInput & RegionInput,
  GetTelemetryRuleOutput,
  GetTelemetryRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<GetTelemetryRuleInput>,
  output: __S(1120, __c35, 0) as any as S.Schema<GetTelemetryRuleOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryRule",
  telemetry: TELEMETRY,
  span: "GetTelemetryRule",
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
  GetTelemetryRuleForOrganizationInput & RegionInput,
  GetTelemetryRuleForOrganizationOutput,
  GetTelemetryRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<GetTelemetryRuleForOrganizationInput>,
  output: __S(1120, __c35, 0) as any as S.Schema<GetTelemetryRuleForOrganizationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryRuleForOrganization",
  telemetry: TELEMETRY,
  span: "GetTelemetryRuleForOrganization",
}));

export type GetThirdPartyTelemetryEnrichmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Returns the details of a third-party telemetry enrichment, including its status and source configuration.
 */
export const getThirdPartyTelemetryEnrichment: API.OperationMethod<
  GetThirdPartyTelemetryEnrichmentInput & RegionInput,
  GetThirdPartyTelemetryEnrichmentOutput,
  GetThirdPartyTelemetryEnrichmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<GetThirdPartyTelemetryEnrichmentInput>,
  output: __S(1185, __c37, 1) as any as S.Schema<GetThirdPartyTelemetryEnrichmentOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThirdPartyTelemetryEnrichment",
  telemetry: TELEMETRY,
  span: "GetThirdPartyTelemetryEnrichment",
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
  ListCentralizationRulesForOrganizationInput & RegionInput,
  ListCentralizationRulesForOrganizationOutput,
  ListCentralizationRulesForOrganizationError,
  Credentials | HttpClient.HttpClient,
  CentralizationRuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<ListCentralizationRulesForOrganizationInput>,
  output: __S(1251, __c39, 3) as any as S.Schema<ListCentralizationRulesForOrganizationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCentralizationRulesForOrganization",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CentralizationRuleSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCentralizationRulesForOrganization",
})) as any;

export type ListConnectorsError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists the connectors in the account and Region. This operation returns results in pages. To get the next page, pass the returned `NextToken` in the next call. We recommend that you use pagination to ensure that the operation returns quickly and successfully.
 */
export const listConnectors: API.PaginatedOperationMethod<
  ListConnectorsInput & RegionInput,
  ListConnectorsOutput,
  ListConnectorsError,
  Credentials | HttpClient.HttpClient,
  ConnectorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1280, __c40, 0) as any as S.Schema<ListConnectorsInput>,
  output: __S(1283, __c40, 3) as any as S.Schema<ListConnectorsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConnectorSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListConnectors",
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
  ListDatasetIntegrationsInput & RegionInput,
  ListDatasetIntegrationsOutput,
  ListDatasetIntegrationsError,
  Credentials | HttpClient.HttpClient,
  DatasetIntegrationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1312, __c41, 0) as any as S.Schema<ListDatasetIntegrationsInput>,
  output: __S(1315, __c41, 3) as any as S.Schema<ListDatasetIntegrationsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasetIntegrations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DatasetIntegrationSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListDatasetIntegrations",
})) as any;

export type ListResourcesByConnectorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists resources in your cloud provider that the connector can access, such as management groups, subscriptions, resource types, Regions, resources, and Event Hubs. Use the results to build a telemetry manifest. This operation returns results in pages. To get the next page, pass the returned `NextToken` in the next call. We recommend that you use pagination to ensure that the operation returns quickly and successfully.
 */
export const listResourcesByConnector: API.OperationMethod<
  ListResourcesByConnectorInput & RegionInput,
  ListResourcesByConnectorOutput,
  ListResourcesByConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1352, __c42, 8) as any as S.Schema<ListResourcesByConnectorInput>,
  output: __S(1363, __c42, 19) as any as S.Schema<ListResourcesByConnectorOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourcesByConnector",
  telemetry: TELEMETRY,
  span: "ListResourcesByConnector",
}));

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
  ListResourceTelemetryInput & RegionInput,
  ListResourceTelemetryOutput,
  ListResourceTelemetryError,
  Credentials | HttpClient.HttpClient,
  TelemetryConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<ListResourceTelemetryInput>,
  output: __S(1411, __c44, 3) as any as S.Schema<ListResourceTelemetryOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceTelemetry",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TelemetryConfigurations",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListResourceTelemetry",
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
  ListResourceTelemetryForOrganizationInput & RegionInput,
  ListResourceTelemetryForOrganizationOutput,
  ListResourceTelemetryForOrganizationError,
  Credentials | HttpClient.HttpClient,
  TelemetryConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1440, __c45, 0) as any as S.Schema<ListResourceTelemetryForOrganizationInput>,
  output: __S(1411, __c44, 3) as any as S.Schema<ListResourceTelemetryForOrganizationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceTelemetryForOrganization",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TelemetryConfigurations",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListResourceTelemetryForOrganization",
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
  ListS3TableIntegrationsInput & RegionInput,
  ListS3TableIntegrationsOutput,
  ListS3TableIntegrationsError,
  Credentials | HttpClient.HttpClient,
  IntegrationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<ListS3TableIntegrationsInput>,
  output: __S(1475, __c46, 3) as any as S.Schema<ListS3TableIntegrationsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListS3TableIntegrations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "IntegrationSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListS3TableIntegrations",
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags attached to the specified resource. Supports telemetry rule resources, telemetry pipeline resources, and third-party telemetry enrichment resources.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput & RegionInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1504, __c47, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(1505, __c47, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
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
  ListTelemetryPipelinesInput & RegionInput,
  ListTelemetryPipelinesOutput,
  ListTelemetryPipelinesError,
  Credentials | HttpClient.HttpClient,
  TelemetryPipelineSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1536, __c48, 0) as any as S.Schema<ListTelemetryPipelinesInput>,
  output: __S(1539, __c48, 3) as any as S.Schema<ListTelemetryPipelinesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTelemetryPipelines",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PipelineSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListTelemetryPipelines",
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
  ListTelemetryRulesInput & RegionInput,
  ListTelemetryRulesOutput,
  ListTelemetryRulesError,
  Credentials | HttpClient.HttpClient,
  TelemetryRuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1568, __c49, 0) as any as S.Schema<ListTelemetryRulesInput>,
  output: __S(1602, __c50, 2) as any as S.Schema<ListTelemetryRulesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTelemetryRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TelemetryRuleSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListTelemetryRules",
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
  ListTelemetryRulesForOrganizationInput & RegionInput,
  ListTelemetryRulesForOrganizationOutput,
  ListTelemetryRulesForOrganizationError,
  Credentials | HttpClient.HttpClient,
  TelemetryRuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<ListTelemetryRulesForOrganizationInput>,
  output: __S(1602, __c50, 2) as any as S.Schema<ListTelemetryRulesForOrganizationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTelemetryRulesForOrganization",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TelemetryRuleSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListTelemetryRulesForOrganization",
})) as any;

export type ListThirdPartyTelemetryEnrichmentsError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Returns a summary of each third-party telemetry enrichment in your account and Region. To get the full configuration of an enrichment, use `GetThirdPartyTelemetryEnrichment`. The results are paginated. To get the next page of results, use `NextToken`.
 */
export const listThirdPartyTelemetryEnrichments: API.PaginatedOperationMethod<
  ListThirdPartyTelemetryEnrichmentsInput & RegionInput,
  ListThirdPartyTelemetryEnrichmentsOutput,
  ListThirdPartyTelemetryEnrichmentsError,
  Credentials | HttpClient.HttpClient,
  ThirdPartyTelemetryEnrichmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1664, __c52, 0) as any as S.Schema<ListThirdPartyTelemetryEnrichmentsInput>,
  output: __S(1667, __c52, 3) as any as S.Schema<ListThirdPartyTelemetryEnrichmentsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThirdPartyTelemetryEnrichments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TelemetryEnrichments",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListThirdPartyTelemetryEnrichments",
})) as any;

export type PutConnectorTelemetryManifestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Creates or replaces the telemetry manifest of a connector. The telemetry manifest declares which resources in your cloud provider to collect telemetry from and which telemetry types to collect. To avoid overwriting changes made by another caller, specify `ExpectedVersion`.
 */
export const putConnectorTelemetryManifest: API.OperationMethod<
  PutConnectorTelemetryManifestInput & RegionInput,
  PutConnectorTelemetryManifestOutput,
  PutConnectorTelemetryManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1696, __c53, 0) as any as S.Schema<PutConnectorTelemetryManifestInput>,
  output: __S(1697, __c53, 1) as any as S.Schema<PutConnectorTelemetryManifestOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConnectorTelemetryManifest",
  telemetry: TELEMETRY,
  span: "PutConnectorTelemetryManifest",
}));

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
  StartTelemetryEnrichmentRequest & RegionInput,
  StartTelemetryEnrichmentOutput,
  StartTelemetryEnrichmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c54, 0) as any as S.Schema<StartTelemetryEnrichmentRequest>,
  output: __S(864, __c27, 0) as any as S.Schema<StartTelemetryEnrichmentOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    TooManyRequestsException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTelemetryEnrichment",
  telemetry: TELEMETRY,
  span: "StartTelemetryEnrichment",
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
  StartTelemetryEvaluationInput & RegionInput,
  StartTelemetryEvaluationResponse,
  StartTelemetryEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c55, 0) as any as S.Schema<StartTelemetryEvaluationInput>,
  output: __S(2432, __c76, 0) as any as S.Schema<StartTelemetryEvaluationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTelemetryEvaluation",
  telemetry: TELEMETRY,
  span: "StartTelemetryEvaluation",
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
  StartTelemetryEvaluationForOrganizationInput & RegionInput,
  StartTelemetryEvaluationForOrganizationResponse,
  StartTelemetryEvaluationForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c56, 0) as any as S.Schema<StartTelemetryEvaluationForOrganizationInput>,
  output: __S(2432, __c76, 0) as any as S.Schema<StartTelemetryEvaluationForOrganizationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTelemetryEvaluationForOrganization",
  telemetry: TELEMETRY,
  span: "StartTelemetryEvaluationForOrganization",
}));

export type StartTelemetryPipelineRefreshError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Starts a refresh of an external-cloud telemetry pipeline. The refresh re-reads the connector's telemetry manifest and re-discovers the sources in scope.
 *
 * The pipeline must be in the `ACTIVE` or `UPDATE_FAILED` state, with no refresh already running. You can use `GetTelemetryPipeline` to track the refresh.
 */
export const startTelemetryPipelineRefresh: API.OperationMethod<
  StartTelemetryPipelineRefreshInput & RegionInput,
  StartTelemetryPipelineRefreshOutput,
  StartTelemetryPipelineRefreshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1824, __c57, 0) as any as S.Schema<StartTelemetryPipelineRefreshInput>,
  output: __S(2432, __c76, 0) as any as S.Schema<StartTelemetryPipelineRefreshOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTelemetryPipelineRefresh",
  telemetry: TELEMETRY,
  span: "StartTelemetryPipelineRefresh",
}));

export type StartThirdPartyTelemetryEnrichmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Starts a third-party telemetry enrichment. An enrichment adds resource metadata, such as tags, from a third-party telemetry source to the telemetry that CloudWatch receives from the resources of that source.
 *
 * You specify an Amazon Web Services Config connector for your third-party environment, such as a Microsoft Azure tenant. You can use each connector for only one enrichment.
 *
 * To use this operation, you must have the `config:PutThirdPartyServiceLinkedConfigurationRecorder` permission. If the Amazon Web Services Config service-linked role does not exist in your account, you must also have the `iam:CreateServiceLinkedRole` permission.
 */
export const startThirdPartyTelemetryEnrichment: API.OperationMethod<
  StartThirdPartyTelemetryEnrichmentInput & RegionInput,
  StartThirdPartyTelemetryEnrichmentOutput,
  StartThirdPartyTelemetryEnrichmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1858, __c58, 2) as any as S.Schema<StartThirdPartyTelemetryEnrichmentInput>,
  output: __S(1859, __c58, 3) as any as S.Schema<StartThirdPartyTelemetryEnrichmentOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartThirdPartyTelemetryEnrichment",
  telemetry: TELEMETRY,
  span: "StartThirdPartyTelemetryEnrichment",
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
  StopTelemetryEnrichmentRequest & RegionInput,
  StopTelemetryEnrichmentOutput,
  StopTelemetryEnrichmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1888, __c59, 0) as any as S.Schema<StopTelemetryEnrichmentRequest>,
  output: __S(1889, __c59, 1) as any as S.Schema<StopTelemetryEnrichmentOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    TooManyRequestsException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTelemetryEnrichment",
  telemetry: TELEMETRY,
  span: "StopTelemetryEnrichment",
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
  StopTelemetryEvaluationRequest & RegionInput,
  StopTelemetryEvaluationResponse,
  StopTelemetryEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1920, __c60, 0) as any as S.Schema<StopTelemetryEvaluationRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<StopTelemetryEvaluationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTelemetryEvaluation",
  telemetry: TELEMETRY,
  span: "StopTelemetryEvaluation",
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
  StopTelemetryEvaluationForOrganizationRequest & RegionInput,
  StopTelemetryEvaluationForOrganizationResponse,
  StopTelemetryEvaluationForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1952, __c61, 0) as any as S.Schema<StopTelemetryEvaluationForOrganizationRequest>,
  output: __S(2432, __c76, 0) as any as S.Schema<StopTelemetryEvaluationForOrganizationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTelemetryEvaluationForOrganization",
  telemetry: TELEMETRY,
  span: "StopTelemetryEvaluationForOrganization",
}));

export type StopThirdPartyTelemetryEnrichmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Stops a third-party telemetry enrichment. CloudWatch stops adding resource metadata from the third-party telemetry source to your telemetry.
 *
 * To use this operation, you must have the `config:DeleteServiceLinkedConfigurationRecorder` permission.
 */
export const stopThirdPartyTelemetryEnrichment: API.OperationMethod<
  StopThirdPartyTelemetryEnrichmentInput & RegionInput,
  StopThirdPartyTelemetryEnrichmentOutput,
  StopThirdPartyTelemetryEnrichmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1984, __c62, 0) as any as S.Schema<StopThirdPartyTelemetryEnrichmentInput>,
  output: __S(1985, __c62, 1) as any as S.Schema<StopThirdPartyTelemetryEnrichmentOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopThirdPartyTelemetryEnrichment",
  telemetry: TELEMETRY,
  span: "StopThirdPartyTelemetryEnrichment",
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
 * Adds or updates tags for a resource. Supports telemetry rule resources, telemetry pipeline resources, and third-party telemetry enrichment resources.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c63, 0) as any as S.Schema<TagResourceInput>,
  output: __S(2432, __c76, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
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
  TestTelemetryPipelineInput & RegionInput,
  TestTelemetryPipelineOutput,
  TestTelemetryPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2050, __c64, 2) as any as S.Schema<TestTelemetryPipelineInput>,
  output: __S(2054, __c64, 6) as any as S.Schema<TestTelemetryPipelineOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestTelemetryPipeline",
  telemetry: TELEMETRY,
  span: "TestTelemetryPipeline",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a resource. Supports telemetry rule resources, telemetry pipeline resources, and third-party telemetry enrichment resources.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2080, __c65, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(2432, __c76, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
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
  UpdateCentralizationRuleForOrganizationInput & RegionInput,
  UpdateCentralizationRuleForOrganizationOutput,
  UpdateCentralizationRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2112, __c66, 0) as any as S.Schema<UpdateCentralizationRuleForOrganizationInput>,
  output: __S(2400, __c75, 0) as any as S.Schema<UpdateCentralizationRuleForOrganizationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCentralizationRuleForOrganization",
  telemetry: TELEMETRY,
  span: "UpdateCentralizationRuleForOrganization",
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
  UpdateDatasetIntegrationInput & RegionInput,
  UpdateDatasetIntegrationOutput,
  UpdateDatasetIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2144, __c67, 0) as any as S.Schema<UpdateDatasetIntegrationInput>,
  output: __S(32, __c1, 0) as any as S.Schema<UpdateDatasetIntegrationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDatasetIntegration",
  telemetry: TELEMETRY,
  span: "UpdateDatasetIntegration",
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
  UpdateTelemetryPipelineInput & RegionInput,
  UpdateTelemetryPipelineOutput,
  UpdateTelemetryPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2176, __c68, 0) as any as S.Schema<UpdateTelemetryPipelineInput>,
  output: __S(2432, __c76, 0) as any as S.Schema<UpdateTelemetryPipelineOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTelemetryPipeline",
  telemetry: TELEMETRY,
  span: "UpdateTelemetryPipeline",
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
  UpdateTelemetryRuleInput & RegionInput,
  UpdateTelemetryRuleOutput,
  UpdateTelemetryRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2208, __c69, 0) as any as S.Schema<UpdateTelemetryRuleInput>,
  output: __S(2400, __c75, 0) as any as S.Schema<UpdateTelemetryRuleOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTelemetryRule",
  telemetry: TELEMETRY,
  span: "UpdateTelemetryRule",
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
  UpdateTelemetryRuleForOrganizationInput & RegionInput,
  UpdateTelemetryRuleForOrganizationOutput,
  UpdateTelemetryRuleForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2240, __c70, 0) as any as S.Schema<UpdateTelemetryRuleForOrganizationInput>,
  output: __S(2400, __c75, 0) as any as S.Schema<UpdateTelemetryRuleForOrganizationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTelemetryRuleForOrganization",
  telemetry: TELEMETRY,
  span: "UpdateTelemetryRuleForOrganization",
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
  ValidateTelemetryPipelineConfigurationInput & RegionInput,
  ValidateTelemetryPipelineConfigurationOutput,
  ValidateTelemetryPipelineConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2272, __c71, 0) as any as S.Schema<ValidateTelemetryPipelineConfigurationInput>,
  output: __S(2273, __c71, 1) as any as S.Schema<ValidateTelemetryPipelineConfigurationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateTelemetryPipelineConfiguration",
  telemetry: TELEMETRY,
  span: "ValidateTelemetryPipelineConfiguration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RoleArn: S.String, Tags: S.optional(__S(2304, __c72, 0)) }).pipe(
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
function __c1(j: number): any {
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
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Encryption: __S(128, __c4, 0),
          RoleArn: S.String,
          Tags: S.optional(__S(2304, __c72, 0)),
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
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Arn: S.optional(S.String) })).annotate({
        identifier: "CreateS3TableIntegrationOutput",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SseAlgorithm: S.String, KmsKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "Encryption" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Configuration: __S(192, __c6, 0),
          Tags: S.optional(__S(2304, __c72, 0)),
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
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Body: S.String })).annotate({
        identifier: "TelemetryPipelineConfiguration",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.String,
          Rule: __S(309, __c9, 21),
          Tags: S.optional(__S(2304, __c72, 0)),
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
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c9(j: number): any {
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
          Equals: S.optional(__S(2368, __c74, 0)),
          StartsWith: S.optional(__S(2368, __c74, 0)),
          EndsWith: S.optional(__S(2368, __c74, 0)),
          NotEquals: S.optional(__S(2368, __c74, 0)),
          NotStartsWith: S.optional(__S(2368, __c74, 0)),
          NotEndsWith: S.optional(__S(2368, __c74, 0)),
        }),
      ).annotate({ identifier: "AdvancedFieldSelector" });
    case 2:
      return S.Array(__S(289, __c9, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), FieldSelectors: __S(290, __c9, 2) }),
      ).annotate({ identifier: "AdvancedEventSelector" });
    case 4:
      return S.Array(__S(291, __c9, 3));
    case 5:
      return S.suspend(() => S.Struct({ AdvancedEventSelectors: __S(292, __c9, 4) })).annotate({
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
          SingleHeader: S.optional(__S(295, __c9, 7)),
          UriPath: S.optional(S.String),
          QueryString: S.optional(S.String),
          Method: S.optional(S.String),
        }),
      ).annotate({ identifier: "FieldToMatch" });
    case 9:
      return S.Array(__S(296, __c9, 8));
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
          ActionCondition: S.optional(__S(298, __c9, 10)),
          LabelNameCondition: S.optional(__S(299, __c9, 11)),
        }),
      ).annotate({ identifier: "Condition" });
    case 13:
      return S.Array(__S(300, __c9, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          Behavior: S.optional(S.String),
          Requirement: S.optional(S.String),
          Conditions: S.optional(__S(301, __c9, 13)),
        }),
      ).annotate({ identifier: "Filter" });
    case 15:
      return S.Array(__S(302, __c9, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(303, __c9, 15)),
          DefaultBehavior: S.optional(S.String),
        }),
      ).annotate({ identifier: "LoggingFilter" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          RedactedFields: S.optional(__S(297, __c9, 9)),
          LoggingFilter: S.optional(__S(304, __c9, 16)),
          LogType: S.optional(S.String),
        }),
      ).annotate({ identifier: "WAFLoggingParameters" });
    case 18:
      return S.suspend(() => S.Struct({ LogTypes: S.optional(__S(256, __c8, 0)) })).annotate({
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
          VPCFlowLogParameters: S.optional(__S(288, __c9, 0)),
          CloudtrailParameters: S.optional(__S(293, __c9, 5)),
          ELBLoadBalancerLoggingParameters: S.optional(__S(294, __c9, 6)),
          WAFLoggingParameters: S.optional(__S(305, __c9, 17)),
          LogDeliveryParameters: S.optional(__S(306, __c9, 18)),
          MskMonitoringParameters: S.optional(__S(307, __c9, 19)),
          KmsKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "TelemetryDestinationConfiguration" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.optional(S.String),
          TelemetryType: S.String,
          TelemetrySourceTypes: S.optional(__S(256, __c8, 0)),
          DestinationConfiguration: S.optional(__S(308, __c9, 20)),
          Scope: S.optional(S.String),
          SelectionCriteria: S.optional(S.String),
          AllowFieldUpdates: S.optional(S.Boolean),
          Regions: S.optional(__S(2368, __c74, 0)),
          AllRegions: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "TelemetryRule" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.String,
          Rule: __S(309, __c9, 21),
          Tags: S.optional(__S(2304, __c72, 0)),
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
function __c11(j: number): any {
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
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectorIdentifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/DeleteConnector" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConnectorInput" });
  }
}
function __c13(j: number): any {
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
function __c14(j: number): any {
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
function __c15(j: number): any {
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
function __c16(j: number): any {
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
function __c17(j: number): any {
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
function __c18(j: number): any {
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
          CentralizationRule: S.optional(__S(2476, __c77, 12)),
        }),
      ).annotate({ identifier: "GetCentralizationRuleForOrganizationOutput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectorIdentifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/GetConnector" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetConnectorInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectorIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetConnectorTelemetryManifest" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectorTelemetryManifestInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Manifest: __S(720, __c22, 16),
          Version: S.Number,
          LastUpdateTimeStamp: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetConnectorTelemetryManifestOutput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Values: __S(2368, __c74, 0) })).annotate({
        identifier: "TagFilter",
      });
    case 1:
      return S.Array(__S(672, __c21, 0));
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ All: __S(2432, __c76, 0) }),
        /*@__PURE__*/ S.Struct({ Ids: __S(2368, __c74, 0) }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({ Region: S.String, ResourceIds: __S(2368, __c74, 0) }),
      ).annotate({ identifier: "AzureResourceIdScope" });
    case 2:
      return S.Array(__S(705, __c22, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Subscriptions: S.optional(__S(704, __c22, 0)),
          Regions: S.optional(__S(2368, __c74, 0)),
          ResourceTypes: S.optional(__S(2368, __c74, 0)),
          TagFilters: S.optional(__S(673, __c21, 1)),
          Resources: S.optional(__S(706, __c22, 2)),
        }),
      ).annotate({ identifier: "AzureScope" });
    case 4:
      return S.suspend(() =>
        S.Struct({ TelemetryTypes: __S(256, __c8, 0), Scope: __S(707, __c22, 3) }),
      ).annotate({ identifier: "AzureScopeItem" });
    case 5:
      return S.Array(__S(708, __c22, 4));
    case 6:
      return S.Union([/*@__PURE__*/ S.Struct({ Azure: __S(709, __c22, 5) })]);
    case 7:
      return S.suspend(() => S.Struct({ Tier: S.String, PartitionCount: S.Number })).annotate({
        identifier: "AzureEventHubConfiguration",
      });
    case 8:
      return S.Array(__S(711, __c22, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ Region: S.String, StorageAccountIds: __S(2368, __c74, 0) }),
      ).annotate({ identifier: "AzureFlowLogStorageAccountScope" });
    case 10:
      return S.Array(__S(713, __c22, 9));
    case 11:
      return S.suspend(() => S.Struct({ StorageAccounts: __S(714, __c22, 10) })).annotate({
        identifier: "AzureCustomerManagedFlowLogs",
      });
    case 12:
      return S.suspend(() => S.Struct({ RetentionDays: S.Number })).annotate({
        identifier: "AzureAwsManagedFlowLogs",
      });
    case 13:
      return S.Union([
        /*@__PURE__*/ S.Struct({ CustomerManaged: __S(715, __c22, 11) }),
        /*@__PURE__*/ S.Struct({ AwsManaged: __S(716, __c22, 12) }),
      ]);
    case 14:
      return S.suspend(() =>
        S.Struct({
          SubscriptionId: S.optional(S.String),
          EventHubs: S.optional(__S(712, __c22, 8)),
          FlowLogs: S.optional(__S(717, __c22, 13)),
        }),
      ).annotate({ identifier: "AzureInfrastructure" });
    case 15:
      return S.Union([/*@__PURE__*/ S.Struct({ Azure: __S(718, __c22, 14) })]);
    case 16:
      return S.suspend(() =>
        S.Struct({ Source: __S(710, __c22, 6), Infrastructure: S.optional(__S(719, __c22, 15)) }),
      ).annotate({ identifier: "TelemetryManifest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectorIdentifier: S.String, Format: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetConnectorTelemetrySetup" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectorTelemetrySetupInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FileName: S.String,
          Content: S.String,
          Format: S.String,
          ContentType: S.optional(S.String),
        }),
      ).annotate({ identifier: "SetupArtifact" });
    case 2:
      return S.Array(__S(737, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Artifacts: __S(738, __c23, 2),
          RequiredPermissionsToApply: S.optional(__S(2368, __c74, 0)),
          Format: S.String,
          Provider: S.optional(S.String),
          ManifestVersion: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetConnectorTelemetrySetupOutput" });
  }
}
function __c24(j: number): any {
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
function __c25(j: number): any {
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
          Encryption: S.optional(__S(128, __c4, 0)),
          DestinationTableBucketArn: S.optional(S.String),
          CreatedTimeStamp: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetS3TableIntegrationOutput" });
  }
}
function __c26(j: number): any {
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
function __c27(j: number): any {
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
function __c28(j: number): any {
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
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          FailureReason: S.optional(S.String),
          HomeRegion: S.optional(S.String),
          RegionStatuses: S.optional(__S(961, __c30, 1)),
        }),
      ).annotate({ identifier: "GetTelemetryEvaluationStatusOutput" });
  }
}
function __c30(j: number): any {
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
      return S.Array(__S(960, __c30, 0));
  }
}
function __c31(j: number): any {
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
function __c32(j: number): any {
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
        S.Struct({ Active: S.optional(S.Number), Total: S.optional(S.Number) }),
      ).annotate({ identifier: "SourceProgress" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          CreatedTimeStamp: S.optional(S.Number),
          LastUpdateTimeStamp: S.optional(S.Number),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Configuration: S.optional(__S(192, __c6, 0)),
          Status: S.optional(S.String),
          StatusReason: S.optional(__S(1025, __c32, 1)),
          Tags: S.optional(__S(2304, __c72, 0)),
          LastRefreshTimeStamp: S.optional(S.Number),
          SourceProgress: S.optional(__S(1026, __c32, 2)),
          ConfigurationSummary: S.optional(__S(1060, __c33, 4)),
        }),
      ).annotate({ identifier: "TelemetryPipeline" });
    case 4:
      return S.suspend(() => S.Struct({ Pipeline: S.optional(__S(1027, __c32, 3)) })).annotate({
        identifier: "GetTelemetryPipelineOutput",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Type: S.optional(S.String) })).annotate({
        identifier: "Source",
      });
    case 1:
      return S.Array(__S(1056, __c33, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Type: S.optional(S.String) }),
      ).annotate({ identifier: "DataSource" });
    case 3:
      return S.Array(__S(1058, __c33, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Sources: S.optional(__S(1057, __c33, 1)),
          DataSources: S.optional(__S(1059, __c33, 3)),
          Processors: S.optional(__S(2368, __c74, 0)),
          ProcessorCount: S.optional(S.Number),
          Sinks: S.optional(__S(2368, __c74, 0)),
        }),
      ).annotate({ identifier: "ConfigurationSummary" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleIdentifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/GetTelemetryRule" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTelemetryRuleInput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.optional(S.String),
          RuleArn: S.optional(S.String),
          CreatedTimeStamp: S.optional(S.Number),
          LastUpdateTimeStamp: S.optional(S.Number),
          TelemetryRule: S.optional(__S(309, __c9, 21)),
          HomeRegion: S.optional(S.String),
          IsReplicated: S.optional(S.Boolean),
          RegionStatuses: S.optional(__S(961, __c30, 1)),
        }),
      ).annotate({ identifier: "GetTelemetryRuleOutput" });
  }
}
function __c36(j: number): any {
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
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TelemetryEnrichmentIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetThirdPartyTelemetryEnrichment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetThirdPartyTelemetryEnrichmentInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.String,
          Status: S.String,
          StatusReason: S.optional(S.String),
          TelemetrySourceConfiguration: __S(1217, __c38, 1),
          Tags: S.optional(__S(2304, __c72, 0)),
        }),
      ).annotate({ identifier: "GetThirdPartyTelemetryEnrichmentOutput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AwsConfigConnectorArn: S.optional(S.String),
          ServiceLinkedRecorderArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AzureTelemetrySourceConfigurationOutput" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ Azure: __S(1216, __c38, 0) })]);
  }
}
function __c39(j: number): any {
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
      return S.Array(__S(1249, __c39, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CentralizationRuleSummaries: S.optional(__S(1250, __c39, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCentralizationRulesForOrganizationOutput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(SensitiveString) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListConnectors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListConnectorsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Provider: S.String,
          Name: S.optional(S.String),
          CreatedTimeStamp: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ConnectorSummary" });
    case 2:
      return S.Array(__S(1281, __c40, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConnectorSummaries: __S(1282, __c40, 2),
          NextToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ListConnectorsOutput" });
  }
}
function __c41(j: number): any {
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
      return S.Array(__S(1313, __c41, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DatasetIntegrationSummaries: __S(1314, __c41, 2),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDatasetIntegrationsOutput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ParentManagementGroupId: S.optional(S.String) })).annotate({
        identifier: "AzureManagementGroupsQuery",
      });
    case 1:
      return S.suspend(() => S.Struct({ ManagementGroupId: S.optional(S.String) })).annotate({
        identifier: "AzureSubscriptionsQuery",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ManagementGroupId: S.optional(S.String),
          SubscriptionIds: S.optional(__S(2368, __c74, 0)),
        }),
      ).annotate({ identifier: "AzureQueryScope" });
    case 3:
      return S.suspend(() => S.Struct({ Scope: S.optional(__S(1346, __c42, 2)) })).annotate({
        identifier: "AzureResourceTypesQuery",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Scope: S.optional(__S(1346, __c42, 2)),
          ResourceType: S.optional(S.String),
          Region: S.optional(S.String),
          TagFilters: S.optional(__S(673, __c21, 1)),
        }),
      ).annotate({ identifier: "AzureResourceIdsQuery" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Scope: S.optional(__S(1346, __c42, 2)),
          NamespaceName: S.optional(S.String),
          Region: S.optional(S.String),
        }),
      ).annotate({ identifier: "AzureEventHubsQuery" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ ManagementGroups: __S(1344, __c42, 0) }),
        /*@__PURE__*/ S.Struct({ Subscriptions: __S(1345, __c42, 1) }),
        /*@__PURE__*/ S.Struct({ ResourceTypes: __S(1347, __c42, 3) }),
        /*@__PURE__*/ S.Struct({ Regions: __S(1347, __c42, 3) }),
        /*@__PURE__*/ S.Struct({ ResourceIds: __S(1348, __c42, 4) }),
        /*@__PURE__*/ S.Struct({ EventHubs: __S(1349, __c42, 5) }),
      ]);
    case 7:
      return S.Union([/*@__PURE__*/ S.Struct({ Azure: __S(1350, __c42, 6) })]);
    case 8:
      return S.suspend(() =>
        S.Struct({
          ConnectorIdentifier: S.String,
          Selector: __S(1351, __c42, 7),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListResourcesByConnector" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResourcesByConnectorInput" });
    case 9:
      return S.suspend(() =>
        S.Struct({ Id: S.String, Name: S.optional(S.String), DisplayName: S.optional(S.String) }),
      ).annotate({ identifier: "AzureManagementGroupSummary" });
    case 10:
      return S.Array(__S(1353, __c42, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          SubscriptionId: S.String,
          DisplayName: S.optional(S.String),
          State: S.optional(S.String),
          ManagementGroupId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AzureSubscriptionSummary" });
    case 12:
      return S.Array(__S(1355, __c42, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.String,
          ResourceType: S.optional(S.String),
          Region: S.optional(S.String),
          SubscriptionId: S.optional(S.String),
          Tags: S.optional(__S(2304, __c72, 0)),
        }),
      ).annotate({ identifier: "AzureResourceIdentifierSummary" });
    case 14:
      return S.Array(__S(1357, __c42, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.String,
          EventHubName: S.String,
          NamespaceName: S.String,
          FullyQualifiedNamespace: S.String,
          Region: S.optional(S.String),
          SubscriptionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AzureEventHubSummary" });
    case 16:
      return S.Array(__S(1359, __c42, 15));
    case 17:
      return S.Union([
        /*@__PURE__*/ S.Struct({ ManagementGroups: __S(1354, __c42, 10) }),
        /*@__PURE__*/ S.Struct({ Subscriptions: __S(1356, __c42, 12) }),
        /*@__PURE__*/ S.Struct({ ResourceTypes: __S(2368, __c74, 0) }),
        /*@__PURE__*/ S.Struct({ Regions: __S(2368, __c74, 0) }),
        /*@__PURE__*/ S.Struct({ ResourceIds: __S(1358, __c42, 14) }),
        /*@__PURE__*/ S.Struct({ EventHubs: __S(1360, __c42, 16) }),
      ]);
    case 18:
      return S.Union([/*@__PURE__*/ S.Struct({ Azure: __S(1361, __c42, 17) })]);
    case 19:
      return S.suspend(() =>
        S.Struct({ Results: __S(1362, __c42, 18), NextToken: S.optional(SensitiveString) }),
      ).annotate({ identifier: "ListResourcesByConnectorOutput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifierPrefix: S.optional(S.String),
          ResourceTypes: S.optional(__S(256, __c8, 0)),
          TelemetryConfigurationState: S.optional(__S(1408, __c44, 0)),
          ResourceTags: S.optional(__S(2304, __c72, 0)),
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
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountIdentifier: S.optional(S.String),
          TelemetryConfigurationState: S.optional(__S(1408, __c44, 0)),
          ResourceType: S.optional(S.String),
          ResourceIdentifier: S.optional(S.String),
          ResourceTags: S.optional(__S(2304, __c72, 0)),
          LastUpdateTimeStamp: S.optional(S.Number),
          TelemetrySourceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "TelemetryConfiguration" });
    case 2:
      return S.Array(__S(1409, __c44, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          TelemetryConfigurations: S.optional(__S(1410, __c44, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListResourceTelemetryOutput" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountIdentifiers: S.optional(__S(2368, __c74, 0)),
          ResourceIdentifierPrefix: S.optional(S.String),
          ResourceTypes: S.optional(__S(256, __c8, 0)),
          TelemetryConfigurationState: S.optional(__S(1408, __c44, 0)),
          ResourceTags: S.optional(__S(2304, __c72, 0)),
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
function __c46(j: number): any {
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
      return S.Array(__S(1473, __c46, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          IntegrationSummaries: S.optional(__S(1474, __c46, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListS3TableIntegrationsOutput" });
  }
}
function __c47(j: number): any {
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
      return S.suspend(() => S.Struct({ Tags: __S(2304, __c72, 0) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c48(j: number): any {
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
      return S.suspend(() =>
        S.Struct({
          CreatedTimeStamp: S.optional(S.Number),
          LastUpdateTimeStamp: S.optional(S.Number),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          Tags: S.optional(__S(2304, __c72, 0)),
          ConfigurationSummary: S.optional(__S(1060, __c33, 4)),
        }),
      ).annotate({ identifier: "TelemetryPipelineSummary" });
    case 2:
      return S.Array(__S(1537, __c48, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          PipelineSummaries: S.optional(__S(1538, __c48, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListTelemetryPipelinesOutput" });
  }
}
function __c49(j: number): any {
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
function __c50(j: number): any {
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
          TelemetrySourceTypes: S.optional(__S(256, __c8, 0)),
        }),
      ).annotate({ identifier: "TelemetryRuleSummary" });
    case 1:
      return S.Array(__S(1600, __c50, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          TelemetryRuleSummaries: S.optional(__S(1601, __c50, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListTelemetryRulesOutput" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleNamePrefix: S.optional(S.String),
          SourceAccountIds: S.optional(__S(2368, __c74, 0)),
          SourceOrganizationUnitIds: S.optional(__S(2368, __c74, 0)),
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
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          TelemetrySource: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListThirdPartyTelemetryEnrichments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListThirdPartyTelemetryEnrichmentsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          TelemetrySource: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "ThirdPartyTelemetryEnrichmentSummary" });
    case 2:
      return S.Array(__S(1665, __c52, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          TelemetryEnrichments: S.optional(__S(1666, __c52, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListThirdPartyTelemetryEnrichmentsOutput" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectorIdentifier: S.String,
          Manifest: __S(720, __c22, 16),
          ExpectedVersion: S.optional(S.Number),
          ClientToken: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/PutConnectorTelemetryManifest" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutConnectorTelemetryManifestInput" });
    case 1:
      return S.suspend(() => S.Struct({ Version: S.Number })).annotate({
        identifier: "PutConnectorTelemetryManifestOutput",
      });
  }
}
function __c54(j: number): any {
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
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Regions: S.optional(__S(2368, __c74, 0)),
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
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Regions: S.optional(__S(2368, __c74, 0)),
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
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PipelineIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StartTelemetryPipelineRefresh" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartTelemetryPipelineRefreshInput" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AwsConfigConnectorArn: S.String })).annotate({
        identifier: "AzureTelemetrySourceConfigurationInput",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ Azure: __S(1856, __c58, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          TelemetrySourceConfiguration: __S(1857, __c58, 1),
          Tags: S.optional(__S(2304, __c72, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StartThirdPartyTelemetryEnrichment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartThirdPartyTelemetryEnrichmentInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.String,
          Status: S.String,
          StatusReason: S.optional(S.String),
          TelemetrySourceConfiguration: __S(1217, __c38, 1),
          Tags: S.optional(__S(2304, __c72, 0)),
        }),
      ).annotate({ identifier: "StartThirdPartyTelemetryEnrichmentOutput" });
  }
}
function __c59(j: number): any {
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
function __c60(j: number): any {
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
function __c61(j: number): any {
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
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TelemetryEnrichmentIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StopThirdPartyTelemetryEnrichment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopThirdPartyTelemetryEnrichmentInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          TelemetrySource: S.String,
          Status: S.String,
          StatusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "StopThirdPartyTelemetryEnrichmentOutput" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(2304, __c72, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/TagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Data: S.optional(S.String), Type: S.optional(S.String) }),
      ).annotate({ identifier: "Record" });
    case 1:
      return S.Array(__S(2048, __c64, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Records: __S(2049, __c64, 1),
          Configuration: __S(192, __c6, 0),
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
          Record: S.optional(__S(2048, __c64, 0)),
          Error: S.optional(__S(2051, __c64, 3)),
        }),
      ).annotate({ identifier: "PipelineOutput" });
    case 5:
      return S.Array(__S(2052, __c64, 4));
    case 6:
      return S.suspend(() => S.Struct({ Results: S.optional(__S(2053, __c64, 5)) })).annotate({
        identifier: "TestTelemetryPipelineOutput",
      });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(2368, __c74, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/UntagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleIdentifier: S.String, Rule: __S(2476, __c77, 12) }).pipe(
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
function __c67(j: number): any {
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
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PipelineIdentifier: S.String, Configuration: __S(192, __c6, 0) }).pipe(
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
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleIdentifier: S.String, Rule: __S(309, __c9, 21) }).pipe(
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
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleIdentifier: S.String, Rule: __S(309, __c9, 21) }).pipe(
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
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Configuration: __S(192, __c6, 0) }).pipe(
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
      return S.suspend(() => S.Struct({ Errors: S.optional(__S(2306, __c72, 2)) })).annotate({
        identifier: "ValidateTelemetryPipelineConfigurationOutput",
      });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          Message: S.optional(S.String),
          Reason: S.optional(S.String),
          FieldMap: S.optional(__S(2304, __c72, 0)),
        }),
      ).annotate({ identifier: "ValidationError" });
    case 2:
      return S.Array(__S(2305, __c72, 1));
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.String,
          Rule: __S(2476, __c77, 12),
          Tags: S.optional(__S(2304, __c72, 0)),
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
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RuleArn: S.optional(S.String) })).annotate({
        identifier: "CreateCentralizationRuleForOrganizationOutput",
      });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "SourceContextGraphConfiguration",
      });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LogGroupSelectionCriteria: S.optional(S.String),
          DataSourceSelectionCriteria: S.optional(S.String),
          EncryptedLogGroupStrategy: S.String,
          CentralizeWithDataProtection: S.optional(S.String),
        }),
      ).annotate({ identifier: "SourceLogsConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ MetricsSelectionCriteria: S.optional(S.String) })).annotate(
        { identifier: "SourceMetricsConfiguration" },
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ ProfilesSelectionCriteria: S.optional(S.String) }),
      ).annotate({ identifier: "SourceProfilesConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Regions: __S(2368, __c74, 0),
          Scope: S.optional(S.String),
          SourceLogsConfiguration: S.optional(__S(2464, __c77, 0)),
          SourceMetricsConfiguration: S.optional(__S(2465, __c77, 1)),
          SourceProfilesConfiguration: S.optional(__S(2466, __c77, 2)),
          SourceContextGraphConfiguration: S.optional(__S(2432, __c76, 0)),
        }),
      ).annotate({ identifier: "CentralizationRuleSource" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          EncryptionStrategy: S.String,
          KmsKeyArn: S.optional(S.String),
          EncryptionConflictResolutionStrategy: S.optional(S.String),
          EncryptionScope: S.optional(S.String),
        }),
      ).annotate({ identifier: "LogsEncryptionConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({ Region: S.String, KmsKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "LogsBackupConfiguration" });
    case 6:
      return S.suspend(() => S.Struct({ LogGroupNamePattern: S.String })).annotate({
        identifier: "LogGroupNameConfiguration",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          DestinationRoleArn: S.String,
          TagConflictResolutionStrategy: S.optional(S.String),
        }),
      ).annotate({ identifier: "TagPropagationConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          LogsEncryptionConfiguration: S.optional(__S(2468, __c77, 4)),
          BackupConfiguration: S.optional(__S(2469, __c77, 5)),
          LogGroupNameConfiguration: S.optional(__S(2470, __c77, 6)),
          TagPropagationConfiguration: S.optional(__S(2471, __c77, 7)),
          LogGroupDeletionProtection: S.optional(S.String),
        }),
      ).annotate({ identifier: "DestinationLogsConfiguration" });
    case 9:
      return S.suspend(() => S.Struct({ Region: S.String })).annotate({
        identifier: "MetricsBackupConfiguration",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({ BackupConfiguration: S.optional(__S(2473, __c77, 9)) }),
      ).annotate({ identifier: "DestinationMetricsConfiguration" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Region: S.String,
          Account: S.optional(S.String),
          DestinationLogsConfiguration: S.optional(__S(2472, __c77, 8)),
          DestinationMetricsConfiguration: S.optional(__S(2474, __c77, 10)),
          DestinationProfilesConfiguration: S.optional(__S(2474, __c77, 10)),
        }),
      ).annotate({ identifier: "CentralizationRuleDestination" });
    case 12:
      return S.suspend(() =>
        S.Struct({ Source: __S(2467, __c77, 3), Destination: __S(2475, __c77, 11) }),
      ).annotate({ identifier: "CentralizationRule" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectorConfiguration: __S(2529, __c79, 1),
          RoleArn: S.String,
          Name: S.String,
          Tags: S.optional(__S(2304, __c72, 0)),
          ClientToken: S.optional(SensitiveString),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/CreateConnector" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateConnectorInput" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TenantIdentifier: S.String, ClientIdentifier: S.String }),
      ).annotate({ identifier: "AzureConnectorConfiguration" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ Azure: __S(2528, __c79, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Provider: S.String,
          ConnectorConfiguration: __S(2529, __c79, 1),
          RoleArn: S.String,
          Name: S.optional(S.String),
          CreatedTimeStamp: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Connector" });
    case 3:
      return S.suspend(() => S.Struct({ Connector: __S(2530, __c79, 2) })).annotate({
        identifier: "CreateConnectorOutput",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
