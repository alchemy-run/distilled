import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "Appflow",
  target: "SandstoneConfigurationServiceLambda",
  version: "2020-08-23",
  sigv4: "appflow",
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
                `https://appflow-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://appflow-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://appflow.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://appflow.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class ConnectorAuthenticationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConnectorAuthenticationException",
    ["AuthError"],
    { status: 401 },
  )<{ readonly message?: string }> {}
export class ConnectorServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConnectorServerException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedOperationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type FlowName = string;
export type ExecutionId = string;
export type ExecutionIds = string[];
export interface CancelFlowExecutionsRequest {
  flowName: string;
  executionIds?: string[];
}
export interface CancelFlowExecutionsResponse {
  invalidExecutions?: string[];
}
export type ConnectorProfileName = string;
export type KMSArn = string;
export type ConnectorType =
  | "Salesforce"
  | "Singular"
  | "Slack"
  | "Redshift"
  | "S3"
  | "Marketo"
  | "Googleanalytics"
  | "Zendesk"
  | "Servicenow"
  | "Datadog"
  | "Trendmicro"
  | "Snowflake"
  | "Dynatrace"
  | "Infornexus"
  | "Amplitude"
  | "Veeva"
  | "EventBridge"
  | "LookoutMetrics"
  | "Upsolver"
  | "Honeycode"
  | "CustomerProfiles"
  | "SAPOData"
  | "CustomConnector"
  | "Pardot"
  | (string & {});
export type ConnectorLabel = string;
export type ConnectionMode = "Public" | "Private" | (string & {});
export interface AmplitudeConnectorProfileProperties {}
export type InstanceUrl = string;
export interface DatadogConnectorProfileProperties {
  instanceUrl: string;
}
export interface DynatraceConnectorProfileProperties {
  instanceUrl: string;
}
export interface GoogleAnalyticsConnectorProfileProperties {}
export interface HoneycodeConnectorProfileProperties {}
export interface InforNexusConnectorProfileProperties {
  instanceUrl: string;
}
export interface MarketoConnectorProfileProperties {
  instanceUrl: string;
}
export type DatabaseUrl = string;
export type BucketName = string;
export type BucketPrefix = string;
export type RoleArn = string;
export type DataApiRoleArn = string;
export type ClusterIdentifier = string;
export type WorkgroupName = string;
export type DatabaseName = string;
export interface RedshiftConnectorProfileProperties {
  databaseUrl?: string;
  bucketName: string;
  bucketPrefix?: string;
  roleArn: string;
  dataApiRoleArn?: string;
  isRedshiftServerless?: boolean;
  clusterIdentifier?: string;
  workgroupName?: string;
  databaseName?: string;
}
export interface SalesforceConnectorProfileProperties {
  instanceUrl?: string;
  isSandboxEnvironment?: boolean;
  usePrivateLinkForMetadataAndAuthorization?: boolean;
}
export interface ServiceNowConnectorProfileProperties {
  instanceUrl: string;
}
export interface SingularConnectorProfileProperties {}
export interface SlackConnectorProfileProperties {
  instanceUrl: string;
}
export type Warehouse = string;
export type Stage = string;
export type PrivateLinkServiceName = string;
export type AccountName = string;
export type Region = string;
export interface SnowflakeConnectorProfileProperties {
  warehouse: string;
  stage: string;
  bucketName: string;
  bucketPrefix?: string;
  privateLinkServiceName?: string;
  accountName?: string;
  region?: string;
}
export interface TrendmicroConnectorProfileProperties {}
export interface VeevaConnectorProfileProperties {
  instanceUrl: string;
}
export interface ZendeskConnectorProfileProperties {
  instanceUrl: string;
}
export type ApplicationHostUrl = string;
export type ApplicationServicePath = string;
export type PortNumber = number;
export type ClientNumber = string;
export type LogonLanguage = string;
export type TokenUrl = string;
export type AuthCodeUrl = string;
export type OAuthScope = string;
export type OAuthScopeList = string[];
export interface OAuthProperties {
  tokenUrl: string;
  authCodeUrl: string;
  oAuthScopes: string[];
}
export interface SAPODataConnectorProfileProperties {
  applicationHostUrl: string;
  applicationServicePath: string;
  portNumber: number;
  clientNumber: string;
  logonLanguage?: string;
  privateLinkServiceName?: string;
  oAuthProperties?: OAuthProperties;
  disableSSO?: boolean;
}
export type ProfilePropertyKey = string;
export type ProfilePropertyValue = string;
export type ProfilePropertiesMap = { [key: string]: string | undefined };
export type OAuth2GrantType =
  | "CLIENT_CREDENTIALS"
  | "AUTHORIZATION_CODE"
  | "JWT_BEARER"
  | (string & {});
export type CustomPropertyKey = string;
export type CustomPropertyValue = string;
export type TokenUrlCustomProperties = { [key: string]: string | undefined };
export interface OAuth2Properties {
  tokenUrl: string;
  oAuth2GrantType: OAuth2GrantType;
  tokenUrlCustomProperties?: { [key: string]: string | undefined };
}
export interface CustomConnectorProfileProperties {
  profileProperties?: { [key: string]: string | undefined };
  oAuth2Properties?: OAuth2Properties;
}
export type BusinessUnitId = string;
export interface PardotConnectorProfileProperties {
  instanceUrl?: string;
  isSandboxEnvironment?: boolean;
  businessUnitId?: string;
}
export interface ConnectorProfileProperties {
  Amplitude?: AmplitudeConnectorProfileProperties;
  Datadog?: DatadogConnectorProfileProperties;
  Dynatrace?: DynatraceConnectorProfileProperties;
  GoogleAnalytics?: GoogleAnalyticsConnectorProfileProperties;
  Honeycode?: HoneycodeConnectorProfileProperties;
  InforNexus?: InforNexusConnectorProfileProperties;
  Marketo?: MarketoConnectorProfileProperties;
  Redshift?: RedshiftConnectorProfileProperties;
  Salesforce?: SalesforceConnectorProfileProperties;
  ServiceNow?: ServiceNowConnectorProfileProperties;
  Singular?: SingularConnectorProfileProperties;
  Slack?: SlackConnectorProfileProperties;
  Snowflake?: SnowflakeConnectorProfileProperties;
  Trendmicro?: TrendmicroConnectorProfileProperties;
  Veeva?: VeevaConnectorProfileProperties;
  Zendesk?: ZendeskConnectorProfileProperties;
  SAPOData?: SAPODataConnectorProfileProperties;
  CustomConnector?: CustomConnectorProfileProperties;
  Pardot?: PardotConnectorProfileProperties;
}
export type ApiKey = string | redacted.Redacted<string>;
export type SecretKey = string | redacted.Redacted<string>;
export interface AmplitudeConnectorProfileCredentials {
  apiKey: string | redacted.Redacted<string>;
  secretKey: string | redacted.Redacted<string>;
}
export type ApplicationKey = string;
export interface DatadogConnectorProfileCredentials {
  apiKey: string | redacted.Redacted<string>;
  applicationKey: string | redacted.Redacted<string>;
}
export type ApiToken = string;
export interface DynatraceConnectorProfileCredentials {
  apiToken: string | redacted.Redacted<string>;
}
export type ClientId = string;
export type ClientSecret = string | redacted.Redacted<string>;
export type AccessToken = string | redacted.Redacted<string>;
export type RefreshToken = string;
export type AuthCode = string;
export type RedirectUri = string;
export interface ConnectorOAuthRequest {
  authCode?: string;
  redirectUri?: string;
}
export interface GoogleAnalyticsConnectorProfileCredentials {
  clientId: string;
  clientSecret: string | redacted.Redacted<string>;
  accessToken?: string | redacted.Redacted<string>;
  refreshToken?: string | redacted.Redacted<string>;
  oAuthRequest?: ConnectorOAuthRequest;
}
export interface HoneycodeConnectorProfileCredentials {
  accessToken?: string | redacted.Redacted<string>;
  refreshToken?: string | redacted.Redacted<string>;
  oAuthRequest?: ConnectorOAuthRequest;
}
export type AccessKeyId = string | redacted.Redacted<string>;
export type Username = string;
export type Key = string;
export interface InforNexusConnectorProfileCredentials {
  accessKeyId: string | redacted.Redacted<string>;
  userId: string;
  secretAccessKey: string | redacted.Redacted<string>;
  datakey: string | redacted.Redacted<string>;
}
export interface MarketoConnectorProfileCredentials {
  clientId: string;
  clientSecret: string | redacted.Redacted<string>;
  accessToken?: string | redacted.Redacted<string>;
  oAuthRequest?: ConnectorOAuthRequest;
}
export type Password = string | redacted.Redacted<string>;
export interface RedshiftConnectorProfileCredentials {
  username?: string;
  password?: string | redacted.Redacted<string>;
}
export type ClientCredentialsArn = string | redacted.Redacted<string>;
export type JwtToken = string | redacted.Redacted<string>;
export interface SalesforceConnectorProfileCredentials {
  accessToken?: string | redacted.Redacted<string>;
  refreshToken?: string | redacted.Redacted<string>;
  oAuthRequest?: ConnectorOAuthRequest;
  clientCredentialsArn?: string | redacted.Redacted<string>;
  oAuth2GrantType?: OAuth2GrantType;
  jwtToken?: string | redacted.Redacted<string>;
}
export interface OAuth2Credentials {
  clientId?: string;
  clientSecret?: string | redacted.Redacted<string>;
  accessToken?: string | redacted.Redacted<string>;
  refreshToken?: string | redacted.Redacted<string>;
  oAuthRequest?: ConnectorOAuthRequest;
}
export interface ServiceNowConnectorProfileCredentials {
  username?: string;
  password?: string | redacted.Redacted<string>;
  oAuth2Credentials?: OAuth2Credentials;
}
export interface SingularConnectorProfileCredentials {
  apiKey: string | redacted.Redacted<string>;
}
export interface SlackConnectorProfileCredentials {
  clientId: string;
  clientSecret: string | redacted.Redacted<string>;
  accessToken?: string | redacted.Redacted<string>;
  oAuthRequest?: ConnectorOAuthRequest;
}
export interface SnowflakeConnectorProfileCredentials {
  username: string;
  password: string | redacted.Redacted<string>;
}
export type ApiSecretKey = string | redacted.Redacted<string>;
export interface TrendmicroConnectorProfileCredentials {
  apiSecretKey: string | redacted.Redacted<string>;
}
export interface VeevaConnectorProfileCredentials {
  username: string;
  password: string | redacted.Redacted<string>;
}
export interface ZendeskConnectorProfileCredentials {
  clientId: string;
  clientSecret: string | redacted.Redacted<string>;
  accessToken?: string | redacted.Redacted<string>;
  oAuthRequest?: ConnectorOAuthRequest;
}
export interface BasicAuthCredentials {
  username: string;
  password: string | redacted.Redacted<string>;
}
export interface OAuthCredentials {
  clientId: string;
  clientSecret: string | redacted.Redacted<string>;
  accessToken?: string | redacted.Redacted<string>;
  refreshToken?: string | redacted.Redacted<string>;
  oAuthRequest?: ConnectorOAuthRequest;
}
export interface SAPODataConnectorProfileCredentials {
  basicAuthCredentials?: BasicAuthCredentials;
  oAuthCredentials?: OAuthCredentials;
}
export type AuthenticationType =
  | "OAUTH2"
  | "APIKEY"
  | "BASIC"
  | "CUSTOM"
  | (string & {});
export interface ApiKeyCredentials {
  apiKey: string | redacted.Redacted<string>;
  apiSecretKey?: string | redacted.Redacted<string>;
}
export type CustomAuthenticationType = string;
export type CredentialsMapKey = string | redacted.Redacted<string>;
export type CredentialsMapValue = string | redacted.Redacted<string>;
export type CredentialsMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export interface CustomAuthCredentials {
  customAuthenticationType: string;
  credentialsMap?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export interface CustomConnectorProfileCredentials {
  authenticationType: AuthenticationType;
  basic?: BasicAuthCredentials;
  oauth2?: OAuth2Credentials;
  apiKey?: ApiKeyCredentials;
  custom?: CustomAuthCredentials;
}
export interface PardotConnectorProfileCredentials {
  accessToken?: string | redacted.Redacted<string>;
  refreshToken?: string | redacted.Redacted<string>;
  oAuthRequest?: ConnectorOAuthRequest;
  clientCredentialsArn?: string | redacted.Redacted<string>;
}
export interface ConnectorProfileCredentials {
  Amplitude?: AmplitudeConnectorProfileCredentials;
  Datadog?: DatadogConnectorProfileCredentials;
  Dynatrace?: DynatraceConnectorProfileCredentials;
  GoogleAnalytics?: GoogleAnalyticsConnectorProfileCredentials;
  Honeycode?: HoneycodeConnectorProfileCredentials;
  InforNexus?: InforNexusConnectorProfileCredentials;
  Marketo?: MarketoConnectorProfileCredentials;
  Redshift?: RedshiftConnectorProfileCredentials;
  Salesforce?: SalesforceConnectorProfileCredentials;
  ServiceNow?: ServiceNowConnectorProfileCredentials;
  Singular?: SingularConnectorProfileCredentials;
  Slack?: SlackConnectorProfileCredentials;
  Snowflake?: SnowflakeConnectorProfileCredentials;
  Trendmicro?: TrendmicroConnectorProfileCredentials;
  Veeva?: VeevaConnectorProfileCredentials;
  Zendesk?: ZendeskConnectorProfileCredentials;
  SAPOData?: SAPODataConnectorProfileCredentials;
  CustomConnector?: CustomConnectorProfileCredentials;
  Pardot?: PardotConnectorProfileCredentials;
}
export interface ConnectorProfileConfig {
  connectorProfileProperties: ConnectorProfileProperties;
  connectorProfileCredentials?: ConnectorProfileCredentials;
}
export type ClientToken = string;
export interface CreateConnectorProfileRequest {
  connectorProfileName: string;
  kmsArn?: string;
  connectorType: ConnectorType;
  connectorLabel?: string;
  connectionMode: ConnectionMode;
  connectorProfileConfig: ConnectorProfileConfig;
  clientToken?: string;
}
export type ConnectorProfileArn = string;
export interface CreateConnectorProfileResponse {
  connectorProfileArn?: string;
}
export type FlowDescription = string;
export type TriggerType = "Scheduled" | "Event" | "OnDemand" | (string & {});
export type ScheduleExpression = string;
export type DataPullMode = "Incremental" | "Complete" | (string & {});
export type Timezone = string;
export type ScheduleOffset = number;
export type FlowErrorDeactivationThreshold = number;
export interface ScheduledTriggerProperties {
  scheduleExpression: string;
  dataPullMode?: DataPullMode;
  scheduleStartTime?: Date;
  scheduleEndTime?: Date;
  timezone?: string;
  scheduleOffset?: number;
  firstExecutionFrom?: Date;
  flowErrorDeactivationThreshold?: number;
}
export interface TriggerProperties {
  Scheduled?: ScheduledTriggerProperties;
}
export interface TriggerConfig {
  triggerType: TriggerType;
  triggerProperties?: TriggerProperties;
}
export type ApiVersion = string;
export interface AmplitudeSourceProperties {
  object: string;
}
export interface DatadogSourceProperties {
  object: string;
}
export interface DynatraceSourceProperties {
  object: string;
}
export interface GoogleAnalyticsSourceProperties {
  object: string;
}
export interface InforNexusSourceProperties {
  object: string;
}
export interface MarketoSourceProperties {
  object: string;
}
export type S3InputFileType = "CSV" | "JSON" | (string & {});
export interface S3InputFormatConfig {
  s3InputFileType?: S3InputFileType;
}
export interface S3SourceProperties {
  bucketName: string;
  bucketPrefix?: string;
  s3InputFormatConfig?: S3InputFormatConfig;
}
export type SalesforceDataTransferApi =
  | "AUTOMATIC"
  | "BULKV2"
  | "REST_SYNC"
  | (string & {});
export interface SalesforceSourceProperties {
  object: string;
  enableDynamicFieldUpdate?: boolean;
  includeDeletedRecords?: boolean;
  dataTransferApi?: SalesforceDataTransferApi;
}
export interface ServiceNowSourceProperties {
  object: string;
}
export interface SingularSourceProperties {
  object: string;
}
export interface SlackSourceProperties {
  object: string;
}
export interface TrendmicroSourceProperties {
  object: string;
}
export type DocumentType = string;
export interface VeevaSourceProperties {
  object: string;
  documentType?: string;
  includeSourceFiles?: boolean;
  includeRenditions?: boolean;
  includeAllVersions?: boolean;
}
export interface ZendeskSourceProperties {
  object: string;
}
export type SAPODataMaxParallelism = number;
export interface SAPODataParallelismConfig {
  maxParallelism: number;
}
export type SAPODataMaxPageSize = number;
export interface SAPODataPaginationConfig {
  maxPageSize: number;
}
export interface SAPODataSourceProperties {
  objectPath?: string;
  parallelismConfig?: SAPODataParallelismConfig;
  paginationConfig?: SAPODataPaginationConfig;
}
export type EntityName = string;
export type CustomProperties = { [key: string]: string | undefined };
export type DataTransferApiTypeName = string;
export type DataTransferApiType =
  | "SYNC"
  | "ASYNC"
  | "AUTOMATIC"
  | (string & {});
export interface DataTransferApi {
  Name?: string;
  Type?: DataTransferApiType;
}
export interface CustomConnectorSourceProperties {
  entityName: string;
  customProperties?: { [key: string]: string | undefined };
  dataTransferApi?: DataTransferApi;
}
export interface PardotSourceProperties {
  object: string;
}
export interface SourceConnectorProperties {
  Amplitude?: AmplitudeSourceProperties;
  Datadog?: DatadogSourceProperties;
  Dynatrace?: DynatraceSourceProperties;
  GoogleAnalytics?: GoogleAnalyticsSourceProperties;
  InforNexus?: InforNexusSourceProperties;
  Marketo?: MarketoSourceProperties;
  S3?: S3SourceProperties;
  Salesforce?: SalesforceSourceProperties;
  ServiceNow?: ServiceNowSourceProperties;
  Singular?: SingularSourceProperties;
  Slack?: SlackSourceProperties;
  Trendmicro?: TrendmicroSourceProperties;
  Veeva?: VeevaSourceProperties;
  Zendesk?: ZendeskSourceProperties;
  SAPOData?: SAPODataSourceProperties;
  CustomConnector?: CustomConnectorSourceProperties;
  Pardot?: PardotSourceProperties;
}
export type DatetimeTypeFieldName = string;
export interface IncrementalPullConfig {
  datetimeTypeFieldName?: string;
}
export interface SourceFlowConfig {
  connectorType: ConnectorType;
  apiVersion?: string;
  connectorProfileName?: string;
  sourceConnectorProperties: SourceConnectorProperties;
  incrementalPullConfig?: IncrementalPullConfig;
}
export interface ErrorHandlingConfig {
  failOnFirstDestinationError?: boolean;
  bucketPrefix?: string;
  bucketName?: string;
}
export interface RedshiftDestinationProperties {
  object: string;
  intermediateBucketName: string;
  bucketPrefix?: string;
  errorHandlingConfig?: ErrorHandlingConfig;
}
export type FileType = "CSV" | "JSON" | "PARQUET" | (string & {});
export type PrefixType =
  | "FILENAME"
  | "PATH"
  | "PATH_AND_FILENAME"
  | (string & {});
export type PrefixFormat =
  | "YEAR"
  | "MONTH"
  | "DAY"
  | "HOUR"
  | "MINUTE"
  | (string & {});
export type PathPrefix = "EXECUTION_ID" | "SCHEMA_VERSION" | (string & {});
export type PathPrefixHierarchy = PathPrefix[];
export interface PrefixConfig {
  prefixType?: PrefixType;
  prefixFormat?: PrefixFormat;
  pathPrefixHierarchy?: PathPrefix[];
}
export type AggregationType = "None" | "SingleFile" | (string & {});
export interface AggregationConfig {
  aggregationType?: AggregationType;
  targetFileSize?: number;
}
export type JavaBoolean = boolean;
export interface S3OutputFormatConfig {
  fileType?: FileType;
  prefixConfig?: PrefixConfig;
  aggregationConfig?: AggregationConfig;
  preserveSourceDataTyping?: boolean;
}
export interface S3DestinationProperties {
  bucketName: string;
  bucketPrefix?: string;
  s3OutputFormatConfig?: S3OutputFormatConfig;
}
export type Name = string;
export type IdFieldNameList = string[];
export type WriteOperationType =
  | "INSERT"
  | "UPSERT"
  | "UPDATE"
  | "DELETE"
  | (string & {});
export interface SalesforceDestinationProperties {
  object: string;
  idFieldNames?: string[];
  errorHandlingConfig?: ErrorHandlingConfig;
  writeOperationType?: WriteOperationType;
  dataTransferApi?: SalesforceDataTransferApi;
}
export interface SnowflakeDestinationProperties {
  object: string;
  intermediateBucketName: string;
  bucketPrefix?: string;
  errorHandlingConfig?: ErrorHandlingConfig;
}
export interface EventBridgeDestinationProperties {
  object: string;
  errorHandlingConfig?: ErrorHandlingConfig;
}
export interface LookoutMetricsDestinationProperties {}
export type UpsolverBucketName = string;
export interface UpsolverS3OutputFormatConfig {
  fileType?: FileType;
  prefixConfig: PrefixConfig;
  aggregationConfig?: AggregationConfig;
}
export interface UpsolverDestinationProperties {
  bucketName: string;
  bucketPrefix?: string;
  s3OutputFormatConfig: UpsolverS3OutputFormatConfig;
}
export interface HoneycodeDestinationProperties {
  object: string;
  errorHandlingConfig?: ErrorHandlingConfig;
}
export type DomainName = string;
export type ObjectTypeName = string;
export interface CustomerProfilesDestinationProperties {
  domainName: string;
  objectTypeName?: string;
}
export interface ZendeskDestinationProperties {
  object: string;
  idFieldNames?: string[];
  errorHandlingConfig?: ErrorHandlingConfig;
  writeOperationType?: WriteOperationType;
}
export interface MarketoDestinationProperties {
  object: string;
  errorHandlingConfig?: ErrorHandlingConfig;
}
export interface CustomConnectorDestinationProperties {
  entityName: string;
  errorHandlingConfig?: ErrorHandlingConfig;
  writeOperationType?: WriteOperationType;
  idFieldNames?: string[];
  customProperties?: { [key: string]: string | undefined };
}
export interface SuccessResponseHandlingConfig {
  bucketPrefix?: string;
  bucketName?: string;
}
export interface SAPODataDestinationProperties {
  objectPath: string;
  successResponseHandlingConfig?: SuccessResponseHandlingConfig;
  idFieldNames?: string[];
  errorHandlingConfig?: ErrorHandlingConfig;
  writeOperationType?: WriteOperationType;
}
export interface DestinationConnectorProperties {
  Redshift?: RedshiftDestinationProperties;
  S3?: S3DestinationProperties;
  Salesforce?: SalesforceDestinationProperties;
  Snowflake?: SnowflakeDestinationProperties;
  EventBridge?: EventBridgeDestinationProperties;
  LookoutMetrics?: LookoutMetricsDestinationProperties;
  Upsolver?: UpsolverDestinationProperties;
  Honeycode?: HoneycodeDestinationProperties;
  CustomerProfiles?: CustomerProfilesDestinationProperties;
  Zendesk?: ZendeskDestinationProperties;
  Marketo?: MarketoDestinationProperties;
  CustomConnector?: CustomConnectorDestinationProperties;
  SAPOData?: SAPODataDestinationProperties;
}
export interface DestinationFlowConfig {
  connectorType: ConnectorType;
  apiVersion?: string;
  connectorProfileName?: string;
  destinationConnectorProperties: DestinationConnectorProperties;
}
export type DestinationFlowConfigList = DestinationFlowConfig[];
export type SourceFields = string[];
export type AmplitudeConnectorOperator = "BETWEEN" | (string & {});
export type DatadogConnectorOperator =
  | "PROJECTION"
  | "BETWEEN"
  | "EQUAL_TO"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | "NO_OP"
  | (string & {});
export type DynatraceConnectorOperator =
  | "PROJECTION"
  | "BETWEEN"
  | "EQUAL_TO"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | "NO_OP"
  | (string & {});
export type GoogleAnalyticsConnectorOperator =
  | "PROJECTION"
  | "BETWEEN"
  | (string & {});
export type InforNexusConnectorOperator =
  | "PROJECTION"
  | "BETWEEN"
  | "EQUAL_TO"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | "NO_OP"
  | (string & {});
export type MarketoConnectorOperator =
  | "PROJECTION"
  | "LESS_THAN"
  | "GREATER_THAN"
  | "BETWEEN"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | "NO_OP"
  | (string & {});
export type S3ConnectorOperator =
  | "PROJECTION"
  | "LESS_THAN"
  | "GREATER_THAN"
  | "BETWEEN"
  | "LESS_THAN_OR_EQUAL_TO"
  | "GREATER_THAN_OR_EQUAL_TO"
  | "EQUAL_TO"
  | "NOT_EQUAL_TO"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | "NO_OP"
  | (string & {});
export type SalesforceConnectorOperator =
  | "PROJECTION"
  | "LESS_THAN"
  | "CONTAINS"
  | "GREATER_THAN"
  | "BETWEEN"
  | "LESS_THAN_OR_EQUAL_TO"
  | "GREATER_THAN_OR_EQUAL_TO"
  | "EQUAL_TO"
  | "NOT_EQUAL_TO"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | "NO_OP"
  | (string & {});
export type ServiceNowConnectorOperator =
  | "PROJECTION"
  | "CONTAINS"
  | "LESS_THAN"
  | "GREATER_THAN"
  | "BETWEEN"
  | "LESS_THAN_OR_EQUAL_TO"
  | "GREATER_THAN_OR_EQUAL_TO"
  | "EQUAL_TO"
  | "NOT_EQUAL_TO"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | "NO_OP"
  | (string & {});
export type SingularConnectorOperator =
  | "PROJECTION"
  | "EQUAL_TO"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | "NO_OP"
  | (string & {});
export type SlackConnectorOperator =
  | "PROJECTION"
  | "LESS_THAN"
  | "GREATER_THAN"
  | "BETWEEN"
  | "LESS_THAN_OR_EQUAL_TO"
  | "GREATER_THAN_OR_EQUAL_TO"
  | "EQUAL_TO"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | "NO_OP"
  | (string & {});
export type TrendmicroConnectorOperator =
  | "PROJECTION"
  | "EQUAL_TO"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | "NO_OP"
  | (string & {});
export type VeevaConnectorOperator =
  | "PROJECTION"
  | "LESS_THAN"
  | "GREATER_THAN"
  | "CONTAINS"
  | "BETWEEN"
  | "LESS_THAN_OR_EQUAL_TO"
  | "GREATER_THAN_OR_EQUAL_TO"
  | "EQUAL_TO"
  | "NOT_EQUAL_TO"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | "NO_OP"
  | (string & {});
export type ZendeskConnectorOperator =
  | "PROJECTION"
  | "GREATER_THAN"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | "NO_OP"
  | (string & {});
export type SAPODataConnectorOperator =
  | "PROJECTION"
  | "LESS_THAN"
  | "CONTAINS"
  | "GREATER_THAN"
  | "BETWEEN"
  | "LESS_THAN_OR_EQUAL_TO"
  | "GREATER_THAN_OR_EQUAL_TO"
  | "EQUAL_TO"
  | "NOT_EQUAL_TO"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | "NO_OP"
  | (string & {});
export type Operator =
  | "PROJECTION"
  | "LESS_THAN"
  | "GREATER_THAN"
  | "CONTAINS"
  | "BETWEEN"
  | "LESS_THAN_OR_EQUAL_TO"
  | "GREATER_THAN_OR_EQUAL_TO"
  | "EQUAL_TO"
  | "NOT_EQUAL_TO"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | "NO_OP"
  | (string & {});
export type PardotConnectorOperator =
  | "PROJECTION"
  | "EQUAL_TO"
  | "NO_OP"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | (string & {});
export interface ConnectorOperator {
  Amplitude?: AmplitudeConnectorOperator;
  Datadog?: DatadogConnectorOperator;
  Dynatrace?: DynatraceConnectorOperator;
  GoogleAnalytics?: GoogleAnalyticsConnectorOperator;
  InforNexus?: InforNexusConnectorOperator;
  Marketo?: MarketoConnectorOperator;
  S3?: S3ConnectorOperator;
  Salesforce?: SalesforceConnectorOperator;
  ServiceNow?: ServiceNowConnectorOperator;
  Singular?: SingularConnectorOperator;
  Slack?: SlackConnectorOperator;
  Trendmicro?: TrendmicroConnectorOperator;
  Veeva?: VeevaConnectorOperator;
  Zendesk?: ZendeskConnectorOperator;
  SAPOData?: SAPODataConnectorOperator;
  CustomConnector?: Operator;
  Pardot?: PardotConnectorOperator;
}
export type DestinationField = string;
export type TaskType =
  | "Arithmetic"
  | "Filter"
  | "Map"
  | "Map_all"
  | "Mask"
  | "Merge"
  | "Passthrough"
  | "Truncate"
  | "Validate"
  | "Partition"
  | (string & {});
export type OperatorPropertiesKeys =
  | "VALUE"
  | "VALUES"
  | "DATA_TYPE"
  | "UPPER_BOUND"
  | "LOWER_BOUND"
  | "SOURCE_DATA_TYPE"
  | "DESTINATION_DATA_TYPE"
  | "VALIDATION_ACTION"
  | "MASK_VALUE"
  | "MASK_LENGTH"
  | "TRUNCATE_LENGTH"
  | "MATH_OPERATION_FIELDS_ORDER"
  | "CONCAT_FORMAT"
  | "SUBFIELD_CATEGORY_MAP"
  | "EXCLUDE_SOURCE_FIELDS_LIST"
  | "INCLUDE_NEW_FIELDS"
  | "ORDERED_PARTITION_KEYS_LIST"
  | (string & {});
export type Property = string;
export type TaskPropertiesMap = { [key in OperatorPropertiesKeys]?: string };
export interface Task {
  sourceFields: string[];
  connectorOperator?: ConnectorOperator;
  destinationField?: string;
  taskType: TaskType;
  taskProperties?: { [key: string]: string | undefined };
}
export type Tasks = Task[];
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type GlueDataCatalogIAMRole = string;
export type GlueDataCatalogDatabaseName = string;
export type GlueDataCatalogTablePrefix = string;
export interface GlueDataCatalogConfig {
  roleArn: string;
  databaseName: string;
  tablePrefix: string;
}
export interface MetadataCatalogConfig {
  glueDataCatalog?: GlueDataCatalogConfig;
}
export interface CreateFlowRequest {
  flowName: string;
  description?: string;
  kmsArn?: string;
  triggerConfig: TriggerConfig;
  sourceFlowConfig: SourceFlowConfig;
  destinationFlowConfigList: DestinationFlowConfig[];
  tasks: Task[];
  tags?: { [key: string]: string | undefined };
  metadataCatalogConfig?: MetadataCatalogConfig;
  clientToken?: string;
}
export type FlowArn = string;
export type FlowStatus =
  | "Active"
  | "Deprecated"
  | "Deleted"
  | "Draft"
  | "Errored"
  | "Suspended"
  | (string & {});
export interface CreateFlowResponse {
  flowArn?: string;
  flowStatus?: FlowStatus;
}
export interface DeleteConnectorProfileRequest {
  connectorProfileName: string;
  forceDelete?: boolean;
}
export interface DeleteConnectorProfileResponse {}
export interface DeleteFlowRequest {
  flowName: string;
  forceDelete?: boolean;
}
export interface DeleteFlowResponse {}
export interface DescribeConnectorRequest {
  connectorType: ConnectorType;
  connectorLabel?: string;
}
export type ConnectorTypeList = ConnectorType[];
export type ScheduleFrequencyType =
  | "BYMINUTE"
  | "HOURLY"
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "ONCE"
  | (string & {});
export type SchedulingFrequencyTypeList = ScheduleFrequencyType[];
export type TriggerTypeList = TriggerType[];
export interface AmplitudeMetadata {}
export interface DatadogMetadata {}
export interface DynatraceMetadata {}
export interface GoogleAnalyticsMetadata {
  oAuthScopes?: string[];
}
export interface InforNexusMetadata {}
export interface MarketoMetadata {}
export interface RedshiftMetadata {}
export interface S3Metadata {}
export type SalesforceDataTransferApiList = SalesforceDataTransferApi[];
export type OAuth2GrantTypeSupportedList = OAuth2GrantType[];
export interface SalesforceMetadata {
  oAuthScopes?: string[];
  dataTransferApis?: SalesforceDataTransferApi[];
  oauth2GrantTypesSupported?: OAuth2GrantType[];
}
export interface ServiceNowMetadata {}
export interface SingularMetadata {}
export interface SlackMetadata {
  oAuthScopes?: string[];
}
export type RegionList = string[];
export interface SnowflakeMetadata {
  supportedRegions?: string[];
}
export interface TrendmicroMetadata {}
export interface VeevaMetadata {}
export interface ZendeskMetadata {
  oAuthScopes?: string[];
}
export interface EventBridgeMetadata {}
export interface UpsolverMetadata {}
export interface CustomerProfilesMetadata {}
export interface HoneycodeMetadata {
  oAuthScopes?: string[];
}
export interface SAPODataMetadata {}
export interface PardotMetadata {}
export interface ConnectorMetadata {
  Amplitude?: AmplitudeMetadata;
  Datadog?: DatadogMetadata;
  Dynatrace?: DynatraceMetadata;
  GoogleAnalytics?: GoogleAnalyticsMetadata;
  InforNexus?: InforNexusMetadata;
  Marketo?: MarketoMetadata;
  Redshift?: RedshiftMetadata;
  S3?: S3Metadata;
  Salesforce?: SalesforceMetadata;
  ServiceNow?: ServiceNowMetadata;
  Singular?: SingularMetadata;
  Slack?: SlackMetadata;
  Snowflake?: SnowflakeMetadata;
  Trendmicro?: TrendmicroMetadata;
  Veeva?: VeevaMetadata;
  Zendesk?: ZendeskMetadata;
  EventBridge?: EventBridgeMetadata;
  Upsolver?: UpsolverMetadata;
  CustomerProfiles?: CustomerProfilesMetadata;
  Honeycode?: HoneycodeMetadata;
  SAPOData?: SAPODataMetadata;
  Pardot?: PardotMetadata;
}
export type ConnectorDescription = string;
export type ConnectorOwner = string;
export type ConnectorName = string;
export type ConnectorVersion = string;
export type ARN = string;
export type ConnectorMode = string;
export type ConnectorModeList = string[];
export type TokenUrlList = string[];
export type AuthCodeUrlList = string[];
export type Label = string;
export type Description = string;
export type ConnectorSuppliedValue = string;
export type ConnectorSuppliedValueList = string[];
export type OAuth2CustomPropType = "TOKEN_URL" | "AUTH_URL" | (string & {});
export interface OAuth2CustomParameter {
  key?: string;
  isRequired?: boolean;
  label?: string;
  description?: string;
  isSensitiveField?: boolean;
  connectorSuppliedValues?: string[];
  type?: OAuth2CustomPropType;
}
export type OAuth2CustomPropertiesList = OAuth2CustomParameter[];
export interface OAuth2Defaults {
  oauthScopes?: string[];
  tokenUrls?: string[];
  authCodeUrls?: string[];
  oauth2GrantTypesSupported?: OAuth2GrantType[];
  oauth2CustomProperties?: OAuth2CustomParameter[];
}
export interface AuthParameter {
  key?: string;
  isRequired?: boolean;
  label?: string;
  description?: string;
  isSensitiveField?: boolean;
  connectorSuppliedValues?: string[];
}
export type AuthParameterList = AuthParameter[];
export interface CustomAuthConfig {
  customAuthenticationType?: string;
  authParameters?: AuthParameter[];
}
export type CustomAuthConfigList = CustomAuthConfig[];
export interface AuthenticationConfig {
  isBasicAuthSupported?: boolean;
  isApiKeyAuthSupported?: boolean;
  isOAuth2Supported?: boolean;
  isCustomAuthSupported?: boolean;
  oAuth2Defaults?: OAuth2Defaults;
  customAuthConfigs?: CustomAuthConfig[];
}
export type ConnectorRuntimeSettingDataType = string;
export type ConnectorRuntimeSettingScope = string;
export type ConnectorSuppliedValueOptionList = string[];
export interface ConnectorRuntimeSetting {
  key?: string;
  dataType?: string;
  isRequired?: boolean;
  label?: string;
  description?: string;
  scope?: string;
  connectorSuppliedValueOptions?: string[];
}
export type ConnectorRuntimeSettingList = ConnectorRuntimeSetting[];
export type SupportedApiVersion = string;
export type SupportedApiVersionList = string[];
export type Operators =
  | "PROJECTION"
  | "LESS_THAN"
  | "GREATER_THAN"
  | "CONTAINS"
  | "BETWEEN"
  | "LESS_THAN_OR_EQUAL_TO"
  | "GREATER_THAN_OR_EQUAL_TO"
  | "EQUAL_TO"
  | "NOT_EQUAL_TO"
  | "ADDITION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SUBTRACTION"
  | "MASK_ALL"
  | "MASK_FIRST_N"
  | "MASK_LAST_N"
  | "VALIDATE_NON_NULL"
  | "VALIDATE_NON_ZERO"
  | "VALIDATE_NON_NEGATIVE"
  | "VALIDATE_NUMERIC"
  | "NO_OP"
  | (string & {});
export type SupportedOperatorList = Operators[];
export type SupportedWriteOperationList = WriteOperationType[];
export type ConnectorProvisioningType = "LAMBDA" | (string & {});
export interface LambdaConnectorProvisioningConfig {
  lambdaArn: string;
}
export interface ConnectorProvisioningConfig {
  lambda?: LambdaConnectorProvisioningConfig;
}
export type LogoURL = string;
export type RegisteredBy = string;
export type SupportedDataTransferType = "RECORD" | "FILE" | (string & {});
export type SupportedDataTransferTypeList = SupportedDataTransferType[];
export type SupportedDataTransferApis = DataTransferApi[];
export interface ConnectorConfiguration {
  canUseAsSource?: boolean;
  canUseAsDestination?: boolean;
  supportedDestinationConnectors?: ConnectorType[];
  supportedSchedulingFrequencies?: ScheduleFrequencyType[];
  isPrivateLinkEnabled?: boolean;
  isPrivateLinkEndpointUrlRequired?: boolean;
  supportedTriggerTypes?: TriggerType[];
  connectorMetadata?: ConnectorMetadata;
  connectorType?: ConnectorType;
  connectorLabel?: string;
  connectorDescription?: string;
  connectorOwner?: string;
  connectorName?: string;
  connectorVersion?: string;
  connectorArn?: string;
  connectorModes?: string[];
  authenticationConfig?: AuthenticationConfig;
  connectorRuntimeSettings?: ConnectorRuntimeSetting[];
  supportedApiVersions?: string[];
  supportedOperators?: Operators[];
  supportedWriteOperations?: WriteOperationType[];
  connectorProvisioningType?: ConnectorProvisioningType;
  connectorProvisioningConfig?: ConnectorProvisioningConfig;
  logoURL?: string;
  registeredAt?: Date;
  registeredBy?: string;
  supportedDataTransferTypes?: SupportedDataTransferType[];
  supportedDataTransferApis?: DataTransferApi[];
}
export interface DescribeConnectorResponse {
  connectorConfiguration?: ConnectorConfiguration;
}
export interface DescribeConnectorEntityRequest {
  connectorEntityName: string;
  connectorType?: ConnectorType;
  connectorProfileName?: string;
  apiVersion?: string;
}
export type Identifier = string;
export type FieldType = string;
export type FilterOperatorList = Operator[];
export type Value = string;
export type SupportedValueList = string[];
export interface Range {
  maximum?: number;
  minimum?: number;
}
export interface FieldTypeDetails {
  fieldType: string;
  filterOperators: Operator[];
  supportedValues?: string[];
  valueRegexPattern?: string;
  supportedDateFormat?: string;
  fieldValueRange?: Range;
  fieldLengthRange?: Range;
}
export interface SupportedFieldTypeDetails {
  v1: FieldTypeDetails;
}
export interface SourceFieldProperties {
  isRetrievable?: boolean;
  isQueryable?: boolean;
  isTimestampFieldForIncrementalQueries?: boolean;
}
export interface DestinationFieldProperties {
  isCreatable?: boolean;
  isNullable?: boolean;
  isUpsertable?: boolean;
  isUpdatable?: boolean;
  isDefaultedOnCreate?: boolean;
  supportedWriteOperations?: WriteOperationType[];
}
export interface ConnectorEntityField {
  identifier: string;
  parentIdentifier?: string;
  label?: string;
  isPrimaryKey?: boolean;
  defaultValue?: string;
  isDeprecated?: boolean;
  supportedFieldTypeDetails?: SupportedFieldTypeDetails;
  description?: string;
  sourceProperties?: SourceFieldProperties;
  destinationProperties?: DestinationFieldProperties;
  customProperties?: { [key: string]: string | undefined };
}
export type ConnectorEntityFieldList = ConnectorEntityField[];
export interface DescribeConnectorEntityResponse {
  connectorEntityFields: ConnectorEntityField[];
}
export type ConnectorProfileNameList = string[];
export type MaxResults = number;
export type NextToken = string;
export interface DescribeConnectorProfilesRequest {
  connectorProfileNames?: string[];
  connectorType?: ConnectorType;
  connectorLabel?: string;
  maxResults?: number;
  nextToken?: string;
}
export type PrivateConnectionProvisioningStatus =
  | "FAILED"
  | "PENDING"
  | "CREATED"
  | (string & {});
export type PrivateConnectionProvisioningFailureMessage = string;
export type PrivateConnectionProvisioningFailureCause =
  | "CONNECTOR_AUTHENTICATION"
  | "CONNECTOR_SERVER"
  | "INTERNAL_SERVER"
  | "ACCESS_DENIED"
  | "VALIDATION"
  | (string & {});
export interface PrivateConnectionProvisioningState {
  status?: PrivateConnectionProvisioningStatus;
  failureMessage?: string;
  failureCause?: PrivateConnectionProvisioningFailureCause;
}
export interface ConnectorProfile {
  connectorProfileArn?: string;
  connectorProfileName?: string;
  connectorType?: ConnectorType;
  connectorLabel?: string;
  connectionMode?: ConnectionMode;
  credentialsArn?: string;
  connectorProfileProperties?: ConnectorProfileProperties;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  privateConnectionProvisioningState?: PrivateConnectionProvisioningState;
}
export type ConnectorProfileDetailList = ConnectorProfile[];
export interface DescribeConnectorProfilesResponse {
  connectorProfileDetails?: ConnectorProfile[];
  nextToken?: string;
}
export interface DescribeConnectorsRequest {
  connectorTypes?: ConnectorType[];
  maxResults?: number;
  nextToken?: string;
}
export type ConnectorConfigurationsMap = {
  [key in ConnectorType]?: ConnectorConfiguration;
};
export type ApplicationType = string;
export interface ConnectorDetail {
  connectorDescription?: string;
  connectorName?: string;
  connectorOwner?: string;
  connectorVersion?: string;
  applicationType?: string;
  connectorType?: ConnectorType;
  connectorLabel?: string;
  registeredAt?: Date;
  registeredBy?: string;
  connectorProvisioningType?: ConnectorProvisioningType;
  connectorModes?: string[];
  supportedDataTransferTypes?: SupportedDataTransferType[];
}
export type ConnectorList = ConnectorDetail[];
export interface DescribeConnectorsResponse {
  connectorConfigurations?: {
    [key: string]: ConnectorConfiguration | undefined;
  };
  connectors?: ConnectorDetail[];
  nextToken?: string;
}
export interface DescribeFlowRequest {
  flowName: string;
}
export type FlowStatusMessage = string;
export type MostRecentExecutionMessage = string;
export type ExecutionStatus =
  | "InProgress"
  | "Successful"
  | "Error"
  | "CancelStarted"
  | "Canceled"
  | (string & {});
export interface ExecutionDetails {
  mostRecentExecutionMessage?: string;
  mostRecentExecutionTime?: Date;
  mostRecentExecutionStatus?: ExecutionStatus;
}
export type CreatedBy = string;
export type UpdatedBy = string;
export type CatalogType = "GLUE" | (string & {});
export interface RegistrationOutput {
  message?: string;
  result?: string;
  status?: ExecutionStatus;
}
export interface MetadataCatalogDetail {
  catalogType?: CatalogType;
  tableName?: string;
  tableRegistrationOutput?: RegistrationOutput;
  partitionRegistrationOutput?: RegistrationOutput;
}
export type MetadataCatalogDetails = MetadataCatalogDetail[];
export interface DescribeFlowResponse {
  flowArn?: string;
  description?: string;
  flowName?: string;
  kmsArn?: string;
  flowStatus?: FlowStatus;
  flowStatusMessage?: string;
  sourceFlowConfig?: SourceFlowConfig;
  destinationFlowConfigList?: DestinationFlowConfig[];
  lastRunExecutionDetails?: ExecutionDetails;
  triggerConfig?: TriggerConfig;
  tasks?: Task[];
  createdAt?: Date;
  lastUpdatedAt?: Date;
  createdBy?: string;
  lastUpdatedBy?: string;
  tags?: { [key: string]: string | undefined };
  metadataCatalogConfig?: MetadataCatalogConfig;
  lastRunMetadataCatalogDetails?: MetadataCatalogDetail[];
  schemaVersion?: number;
}
export interface DescribeFlowExecutionRecordsRequest {
  flowName: string;
  maxResults?: number;
  nextToken?: string;
}
export type ExecutionMessage = string;
export interface ErrorInfo {
  putFailuresCount?: number;
  executionMessage?: string;
}
export interface ExecutionResult {
  errorInfo?: ErrorInfo;
  bytesProcessed?: number;
  bytesWritten?: number;
  recordsProcessed?: number;
  numParallelProcesses?: number;
  maxPageSize?: number;
}
export interface ExecutionRecord {
  executionId?: string;
  executionStatus?: ExecutionStatus;
  executionResult?: ExecutionResult;
  startedAt?: Date;
  lastUpdatedAt?: Date;
  dataPullStartTime?: Date;
  dataPullEndTime?: Date;
  metadataCatalogDetails?: MetadataCatalogDetail[];
}
export type FlowExecutionList = ExecutionRecord[];
export interface DescribeFlowExecutionRecordsResponse {
  flowExecutions?: ExecutionRecord[];
  nextToken?: string;
}
export type EntitiesPath = string;
export type ListEntitiesMaxResults = number;
export interface ListConnectorEntitiesRequest {
  connectorProfileName?: string;
  connectorType?: ConnectorType;
  entitiesPath?: string;
  apiVersion?: string;
  maxResults?: number;
  nextToken?: string;
}
export type Group = string;
export interface ConnectorEntity {
  name: string;
  label?: string;
  hasNestedEntities?: boolean;
}
export type ConnectorEntityList = ConnectorEntity[];
export type ConnectorEntityMap = {
  [key: string]: ConnectorEntity[] | undefined;
};
export interface ListConnectorEntitiesResponse {
  connectorEntityMap: { [key: string]: ConnectorEntity[] | undefined };
  nextToken?: string;
}
export interface ListConnectorsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface ListConnectorsResponse {
  connectors?: ConnectorDetail[];
  nextToken?: string;
}
export interface ListFlowsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface FlowDefinition {
  flowArn?: string;
  description?: string;
  flowName?: string;
  flowStatus?: FlowStatus;
  sourceConnectorType?: ConnectorType;
  sourceConnectorLabel?: string;
  destinationConnectorType?: ConnectorType;
  destinationConnectorLabel?: string;
  triggerType?: TriggerType;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  createdBy?: string;
  lastUpdatedBy?: string;
  tags?: { [key: string]: string | undefined };
  lastRunExecutionDetails?: ExecutionDetails;
}
export type FlowList = FlowDefinition[];
export interface ListFlowsResponse {
  flows?: FlowDefinition[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface RegisterConnectorRequest {
  connectorLabel?: string;
  description?: string;
  connectorProvisioningType?: ConnectorProvisioningType;
  connectorProvisioningConfig?: ConnectorProvisioningConfig;
  clientToken?: string;
}
export interface RegisterConnectorResponse {
  connectorArn?: string;
}
export interface ResetConnectorMetadataCacheRequest {
  connectorProfileName?: string;
  connectorType?: ConnectorType;
  connectorEntityName?: string;
  entitiesPath?: string;
  apiVersion?: string;
}
export interface ResetConnectorMetadataCacheResponse {}
export interface StartFlowRequest {
  flowName: string;
  clientToken?: string;
}
export interface StartFlowResponse {
  flowArn?: string;
  flowStatus?: FlowStatus;
  executionId?: string;
}
export interface StopFlowRequest {
  flowName: string;
}
export interface StopFlowResponse {
  flowArn?: string;
  flowStatus?: FlowStatus;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface UnregisterConnectorRequest {
  connectorLabel: string;
  forceDelete?: boolean;
}
export interface UnregisterConnectorResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateConnectorProfileRequest {
  connectorProfileName: string;
  connectionMode: ConnectionMode;
  connectorProfileConfig: ConnectorProfileConfig;
  clientToken?: string;
}
export interface UpdateConnectorProfileResponse {
  connectorProfileArn?: string;
}
export interface UpdateConnectorRegistrationRequest {
  connectorLabel: string;
  description?: string;
  connectorProvisioningConfig?: ConnectorProvisioningConfig;
  clientToken?: string;
}
export interface UpdateConnectorRegistrationResponse {
  connectorArn?: string;
}
export interface UpdateFlowRequest {
  flowName: string;
  description?: string;
  triggerConfig: TriggerConfig;
  sourceFlowConfig: SourceFlowConfig;
  destinationFlowConfigList: DestinationFlowConfig[];
  tasks: Task[];
  metadataCatalogConfig?: MetadataCatalogConfig;
  clientToken?: string;
}
export interface UpdateFlowResponse {
  flowStatus?: FlowStatus;
}
export type ErrorMessage = string;
export type CancelFlowExecutionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels active runs for a flow.
 *
 * You can cancel all of the active runs for a flow, or you can cancel specific runs by
 * providing their IDs.
 *
 * You can cancel a flow run only when the run is in progress. You can't cancel a run that
 * has already completed or failed. You also can't cancel a run that's scheduled to occur but
 * hasn't started yet. To prevent a scheduled run, you can deactivate the flow with the
 * `StopFlow` action.
 *
 * You cannot resume a run after you cancel it.
 *
 * When you send your request, the status for each run becomes `CancelStarted`.
 * When the cancellation completes, the status becomes `Canceled`.
 *
 * When you cancel a run, you still incur charges for any data that the run already
 * processed before the cancellation. If the run had already written some data to the flow
 * destination, then that data remains in the destination. If you configured the flow to use a
 * batch API (such as the Salesforce Bulk API 2.0), then the run will finish reading or writing
 * its entire batch of data after the cancellation. For these operations, the data processing
 * charges for Amazon AppFlow apply. For the pricing information, see Amazon AppFlow pricing.
 */
export const cancelFlowExecutions: API.OperationMethod<
  CancelFlowExecutionsRequest,
  CancelFlowExecutionsResponse,
  CancelFlowExecutionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /cancel-flow-executions",
    input: { flowName: 0, executionIds: 0 },
    body: true,
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
  operationName: "CancelFlowExecutions",
})) as any;

export type CreateConnectorProfileError =
  | ConflictException
  | ConnectorAuthenticationException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | ConnectorServerException
  | CommonErrors;
/**
 * Creates a new connector profile associated with your Amazon Web Services account. There is
 * a soft quota of 100 connector profiles per Amazon Web Services account. If you need more
 * connector profiles than this quota allows, you can submit a request to the Amazon AppFlow
 * team through the Amazon AppFlow support channel. In each connector profile that you
 * create, you can provide the credentials and properties for only one connector.
 */
export const createConnectorProfile: API.OperationMethod<
  CreateConnectorProfileRequest,
  CreateConnectorProfileResponse,
  CreateConnectorProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /create-connector-profile",
    input: {
      connectorProfileName: 0,
      kmsArn: 0,
      connectorType: 0,
      connectorLabel: 0,
      connectionMode: 0,
      connectorProfileConfig: i_ConnectorProfileConfig,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    ConflictException,
    ConnectorAuthenticationException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
    ConnectorServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnectorProfile",
})) as any;

export type CreateFlowError =
  | AccessDeniedException
  | ConflictException
  | ConnectorAuthenticationException
  | ConnectorServerException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Enables your application to create a new flow using Amazon AppFlow. You must create
 * a connector profile before calling this API. Please note that the Request Syntax below shows
 * syntax for multiple destinations, however, you can only transfer data to one item in this list
 * at a time. Amazon AppFlow does not currently support flows to multiple destinations at
 * once.
 */
export const createFlow: API.OperationMethod<
  CreateFlowRequest,
  CreateFlowResponse,
  CreateFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /create-flow",
    input: {
      flowName: 0,
      description: 0,
      kmsArn: 0,
      triggerConfig: i_TriggerConfig,
      sourceFlowConfig: i_SourceFlowConfig,
      destinationFlowConfigList: D.list(i_DestinationFlowConfig),
      tasks: D.list(i_Task),
      tags: 0,
      metadataCatalogConfig: i_MetadataCatalogConfig,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ConnectorAuthenticationException,
    ConnectorServerException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFlow",
})) as any;

export type DeleteConnectorProfileError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Enables you to delete an existing connector profile.
 */
export const deleteConnectorProfile: API.OperationMethod<
  DeleteConnectorProfileRequest,
  DeleteConnectorProfileResponse,
  DeleteConnectorProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /delete-connector-profile",
    input: { connectorProfileName: 0, forceDelete: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectorProfile",
})) as any;

export type DeleteFlowError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Enables your application to delete an existing flow. Before deleting the flow, Amazon AppFlow validates the request by checking the flow configuration and status. You can
 * delete flows one at a time.
 */
export const deleteFlow: API.OperationMethod<
  DeleteFlowRequest,
  DeleteFlowResponse,
  DeleteFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /delete-flow",
    input: { flowName: 0, forceDelete: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFlow",
})) as any;

export type DescribeConnectorError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the given custom connector registered in your Amazon Web Services account. This
 * API can be used for custom connectors that are registered in your account and also for Amazon
 * authored connectors.
 */
export const describeConnector: API.OperationMethod<
  DescribeConnectorRequest,
  DescribeConnectorResponse,
  DescribeConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /describe-connector",
    input: { connectorType: 0, connectorLabel: 0 },
    output: { connectorConfiguration: o_ConnectorConfiguration },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnector",
})) as any;

export type DescribeConnectorEntityError =
  | ConnectorAuthenticationException
  | ConnectorServerException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Provides details regarding the entity used with the connector, with a description of the
 * data model for each field in that entity.
 */
export const describeConnectorEntity: API.OperationMethod<
  DescribeConnectorEntityRequest,
  DescribeConnectorEntityResponse,
  DescribeConnectorEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /describe-connector-entity",
    input: {
      connectorEntityName: 0,
      connectorType: 0,
      connectorProfileName: 0,
      apiVersion: 0,
    },
    body: true,
  },
  errors: [
    ConnectorAuthenticationException,
    ConnectorServerException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectorEntity",
})) as any;

export type DescribeConnectorProfilesError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of `connector-profile` details matching the provided
 * `connector-profile` names and `connector-types`. Both input lists are
 * optional, and you can use them to filter the result.
 *
 * If no names or `connector-types` are provided, returns all connector profiles
 * in a paginated form. If there is no match, this operation returns an empty list.
 */
export const describeConnectorProfiles: API.PaginatedOperationMethod<
  DescribeConnectorProfilesRequest,
  DescribeConnectorProfilesResponse,
  DescribeConnectorProfilesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /describe-connector-profiles",
    input: {
      connectorProfileNames: 0,
      connectorType: 0,
      connectorLabel: 0,
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      connectorProfileDetails: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }),
    },
    body: true,
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectorProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeConnectorsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Describes the connectors vended by Amazon AppFlow for specified connector types. If
 * you don't specify a connector type, this operation describes all connectors vended by Amazon AppFlow. If there are more connectors than can be returned in one page, the response
 * contains a `nextToken` object, which can be be passed in to the next call to the
 * `DescribeConnectors` API operation to retrieve the next page.
 */
export const describeConnectors: API.PaginatedOperationMethod<
  DescribeConnectorsRequest,
  DescribeConnectorsResponse,
  DescribeConnectorsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /describe-connectors",
    input: { connectorTypes: 0, maxResults: 0, nextToken: 0 },
    output: {
      connectorConfigurations: D.map(o_ConnectorConfiguration),
      connectors: D.list(o_ConnectorDetail),
    },
    body: true,
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeFlowError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Provides a description of the specified flow.
 */
export const describeFlow: API.OperationMethod<
  DescribeFlowRequest,
  DescribeFlowResponse,
  DescribeFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /describe-flow",
    input: { flowName: 0 },
    output: {
      lastRunExecutionDetails: o_ExecutionDetails,
      triggerConfig: {
        triggerProperties: {
          Scheduled: {
            scheduleStartTime: D.ts,
            scheduleEndTime: D.ts,
            firstExecutionFrom: D.ts,
          },
        },
      },
      createdAt: D.ts,
      lastUpdatedAt: D.ts,
    },
    body: true,
  },
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFlow",
})) as any;

export type DescribeFlowExecutionRecordsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Fetches the execution history of the flow.
 */
export const describeFlowExecutionRecords: API.PaginatedOperationMethod<
  DescribeFlowExecutionRecordsRequest,
  DescribeFlowExecutionRecordsResponse,
  DescribeFlowExecutionRecordsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /describe-flow-execution-records",
    input: { flowName: 0, maxResults: 0, nextToken: 0 },
    output: {
      flowExecutions: D.list({
        startedAt: D.ts,
        lastUpdatedAt: D.ts,
        dataPullStartTime: D.ts,
        dataPullEndTime: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFlowExecutionRecords",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConnectorEntitiesError =
  | ConnectorAuthenticationException
  | ConnectorServerException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the list of available connector entities supported by Amazon AppFlow. For
 * example, you can query Salesforce for *Account* and
 * *Opportunity* entities, or query ServiceNow for the
 * *Incident* entity.
 */
export const listConnectorEntities: API.OperationMethod<
  ListConnectorEntitiesRequest,
  ListConnectorEntitiesResponse,
  ListConnectorEntitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-connector-entities",
    input: {
      connectorProfileName: 0,
      connectorType: 0,
      entitiesPath: 0,
      apiVersion: 0,
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    ConnectorAuthenticationException,
    ConnectorServerException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectorEntities",
})) as any;

export type ListConnectorsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns the list of all registered custom connectors in your Amazon Web Services account.
 * This API lists only custom connectors registered in this account, not the Amazon Web Services
 * authored connectors.
 */
export const listConnectors: API.PaginatedOperationMethod<
  ListConnectorsRequest,
  ListConnectorsResponse,
  ListConnectorsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-connectors",
    input: { maxResults: 0, nextToken: 0 },
    output: { connectors: D.list(o_ConnectorDetail) },
    body: true,
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFlowsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists all of the flows associated with your account.
 */
export const listFlows: API.PaginatedOperationMethod<
  ListFlowsRequest,
  ListFlowsResponse,
  ListFlowsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-flows",
    input: { maxResults: 0, nextToken: 0 },
    output: {
      flows: D.list({
        createdAt: D.ts,
        lastUpdatedAt: D.ts,
        lastRunExecutionDetails: o_ExecutionDetails,
      }),
    },
    body: true,
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFlows",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the tags that are associated with a specified flow.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type RegisterConnectorError =
  | AccessDeniedException
  | ConflictException
  | ConnectorAuthenticationException
  | ConnectorServerException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Registers a new custom connector with your Amazon Web Services account. Before you can
 * register the connector, you must deploy the associated AWS lambda function in your
 * account.
 */
export const registerConnector: API.OperationMethod<
  RegisterConnectorRequest,
  RegisterConnectorResponse,
  RegisterConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /register-connector",
    input: {
      connectorLabel: 0,
      description: 0,
      connectorProvisioningType: 0,
      connectorProvisioningConfig: i_ConnectorProvisioningConfig,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ConnectorAuthenticationException,
    ConnectorServerException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterConnector",
})) as any;

export type ResetConnectorMetadataCacheError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Resets metadata about your connector entities that Amazon AppFlow stored in its
 * cache. Use this action when you want Amazon AppFlow to return the latest information
 * about the data that you have in a source application.
 *
 * Amazon AppFlow returns metadata about your entities when you use the
 * ListConnectorEntities or DescribeConnectorEntities actions. Following these actions, Amazon AppFlow caches the metadata to reduce the number of API requests that it must send to
 * the source application. Amazon AppFlow automatically resets the cache once every hour,
 * but you can use this action when you want to get the latest metadata right away.
 */
export const resetConnectorMetadataCache: API.OperationMethod<
  ResetConnectorMetadataCacheRequest,
  ResetConnectorMetadataCacheResponse,
  ResetConnectorMetadataCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /reset-connector-metadata-cache",
    input: {
      connectorProfileName: 0,
      connectorType: 0,
      connectorEntityName: 0,
      entitiesPath: 0,
      apiVersion: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetConnectorMetadataCache",
})) as any;

export type StartFlowError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Activates an existing flow. For on-demand flows, this operation runs the flow
 * immediately. For schedule and event-triggered flows, this operation activates the flow.
 */
export const startFlow: API.OperationMethod<
  StartFlowRequest,
  StartFlowResponse,
  StartFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /start-flow",
    input: { flowName: 0, clientToken: D.m({ idempotency: true }) },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFlow",
})) as any;

export type StopFlowError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deactivates the existing flow. For on-demand flows, this operation returns an
 * `unsupportedOperationException` error message. For schedule and event-triggered
 * flows, this operation deactivates the flow.
 */
export const stopFlow: API.OperationMethod<
  StopFlowRequest,
  StopFlowResponse,
  StopFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /stop-flow",
    input: { flowName: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopFlow",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Applies a tag to the specified flow.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UnregisterConnectorError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Unregisters the custom connector registered in your account that matches the connector
 * label provided in the request.
 */
export const unregisterConnector: API.OperationMethod<
  UnregisterConnectorRequest,
  UnregisterConnectorResponse,
  UnregisterConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /unregister-connector",
    input: { connectorLabel: 0, forceDelete: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnregisterConnector",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag from the specified flow.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateConnectorProfileError =
  | ConflictException
  | ConnectorAuthenticationException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ConnectorServerException
  | CommonErrors;
/**
 * Updates a given connector profile associated with your account.
 */
export const updateConnectorProfile: API.OperationMethod<
  UpdateConnectorProfileRequest,
  UpdateConnectorProfileResponse,
  UpdateConnectorProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /update-connector-profile",
    input: {
      connectorProfileName: 0,
      connectionMode: 0,
      connectorProfileConfig: i_ConnectorProfileConfig,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    ConflictException,
    ConnectorAuthenticationException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ConnectorServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectorProfile",
})) as any;

export type UpdateConnectorRegistrationError =
  | AccessDeniedException
  | ConflictException
  | ConnectorAuthenticationException
  | ConnectorServerException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a custom connector that you've previously registered. This operation updates the
 * connector with one of the following:
 *
 * - The latest version of the AWS Lambda function that's assigned to the connector
 *
 * - A new AWS Lambda function that you specify
 */
export const updateConnectorRegistration: API.OperationMethod<
  UpdateConnectorRegistrationRequest,
  UpdateConnectorRegistrationResponse,
  UpdateConnectorRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /update-connector-registration",
    input: {
      connectorLabel: 0,
      description: 0,
      connectorProvisioningConfig: i_ConnectorProvisioningConfig,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ConnectorAuthenticationException,
    ConnectorServerException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectorRegistration",
})) as any;

export type UpdateFlowError =
  | AccessDeniedException
  | ConflictException
  | ConnectorAuthenticationException
  | ConnectorServerException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing flow.
 */
export const updateFlow: API.OperationMethod<
  UpdateFlowRequest,
  UpdateFlowResponse,
  UpdateFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /update-flow",
    input: {
      flowName: 0,
      description: 0,
      triggerConfig: i_TriggerConfig,
      sourceFlowConfig: i_SourceFlowConfig,
      destinationFlowConfigList: D.list(i_DestinationFlowConfig),
      tasks: D.list(i_Task),
      metadataCatalogConfig: i_MetadataCatalogConfig,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ConnectorAuthenticationException,
    ConnectorServerException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFlow",
})) as any;

const i_ConnectorProfileConfig: D.LazyStruct = () => ({
  connectorProfileProperties: {
    Amplitude: {},
    Datadog: { instanceUrl: 0 },
    Dynatrace: { instanceUrl: 0 },
    GoogleAnalytics: {},
    Honeycode: {},
    InforNexus: { instanceUrl: 0 },
    Marketo: { instanceUrl: 0 },
    Redshift: {
      databaseUrl: 0,
      bucketName: 0,
      bucketPrefix: 0,
      roleArn: 0,
      dataApiRoleArn: 0,
      isRedshiftServerless: 0,
      clusterIdentifier: 0,
      workgroupName: 0,
      databaseName: 0,
    },
    Salesforce: {
      instanceUrl: 0,
      isSandboxEnvironment: 0,
      usePrivateLinkForMetadataAndAuthorization: 0,
    },
    ServiceNow: { instanceUrl: 0 },
    Singular: {},
    Slack: { instanceUrl: 0 },
    Snowflake: {
      warehouse: 0,
      stage: 0,
      bucketName: 0,
      bucketPrefix: 0,
      privateLinkServiceName: 0,
      accountName: 0,
      region: 0,
    },
    Trendmicro: {},
    Veeva: { instanceUrl: 0 },
    Zendesk: { instanceUrl: 0 },
    SAPOData: {
      applicationHostUrl: 0,
      applicationServicePath: 0,
      portNumber: 0,
      clientNumber: 0,
      logonLanguage: 0,
      privateLinkServiceName: 0,
      oAuthProperties: { tokenUrl: 0, authCodeUrl: 0, oAuthScopes: 0 },
      disableSSO: 0,
    },
    CustomConnector: {
      profileProperties: 0,
      oAuth2Properties: {
        tokenUrl: 0,
        oAuth2GrantType: 0,
        tokenUrlCustomProperties: 0,
      },
    },
    Pardot: { instanceUrl: 0, isSandboxEnvironment: 0, businessUnitId: 0 },
  },
  connectorProfileCredentials: {
    Amplitude: { apiKey: 0, secretKey: 0 },
    Datadog: { apiKey: 0, applicationKey: 0 },
    Dynatrace: { apiToken: 0 },
    GoogleAnalytics: {
      clientId: 0,
      clientSecret: 0,
      accessToken: 0,
      refreshToken: 0,
      oAuthRequest: i_ConnectorOAuthRequest,
    },
    Honeycode: {
      accessToken: 0,
      refreshToken: 0,
      oAuthRequest: i_ConnectorOAuthRequest,
    },
    InforNexus: { accessKeyId: 0, userId: 0, secretAccessKey: 0, datakey: 0 },
    Marketo: {
      clientId: 0,
      clientSecret: 0,
      accessToken: 0,
      oAuthRequest: i_ConnectorOAuthRequest,
    },
    Redshift: { username: 0, password: 0 },
    Salesforce: {
      accessToken: 0,
      refreshToken: 0,
      oAuthRequest: i_ConnectorOAuthRequest,
      clientCredentialsArn: 0,
      oAuth2GrantType: 0,
      jwtToken: 0,
    },
    ServiceNow: {
      username: 0,
      password: 0,
      oAuth2Credentials: i_OAuth2Credentials,
    },
    Singular: { apiKey: 0 },
    Slack: {
      clientId: 0,
      clientSecret: 0,
      accessToken: 0,
      oAuthRequest: i_ConnectorOAuthRequest,
    },
    Snowflake: { username: 0, password: 0 },
    Trendmicro: { apiSecretKey: 0 },
    Veeva: { username: 0, password: 0 },
    Zendesk: {
      clientId: 0,
      clientSecret: 0,
      accessToken: 0,
      oAuthRequest: i_ConnectorOAuthRequest,
    },
    SAPOData: {
      basicAuthCredentials: i_BasicAuthCredentials,
      oAuthCredentials: {
        clientId: 0,
        clientSecret: 0,
        accessToken: 0,
        refreshToken: 0,
        oAuthRequest: i_ConnectorOAuthRequest,
      },
    },
    CustomConnector: {
      authenticationType: 0,
      basic: i_BasicAuthCredentials,
      oauth2: i_OAuth2Credentials,
      apiKey: { apiKey: 0, apiSecretKey: 0 },
      custom: { customAuthenticationType: 0, credentialsMap: 0 },
    },
    Pardot: {
      accessToken: 0,
      refreshToken: 0,
      oAuthRequest: i_ConnectorOAuthRequest,
      clientCredentialsArn: 0,
    },
  },
});
const i_ConnectorProvisioningConfig: D.LazyStruct = () => ({
  lambda: { lambdaArn: 0 },
});
const i_DestinationFlowConfig: D.LazyStruct = () => ({
  connectorType: 0,
  apiVersion: 0,
  connectorProfileName: 0,
  destinationConnectorProperties: {
    Redshift: {
      object: 0,
      intermediateBucketName: 0,
      bucketPrefix: 0,
      errorHandlingConfig: i_ErrorHandlingConfig,
    },
    S3: {
      bucketName: 0,
      bucketPrefix: 0,
      s3OutputFormatConfig: {
        fileType: 0,
        prefixConfig: i_PrefixConfig,
        aggregationConfig: i_AggregationConfig,
        preserveSourceDataTyping: 0,
      },
    },
    Salesforce: {
      object: 0,
      idFieldNames: 0,
      errorHandlingConfig: i_ErrorHandlingConfig,
      writeOperationType: 0,
      dataTransferApi: 0,
    },
    Snowflake: {
      object: 0,
      intermediateBucketName: 0,
      bucketPrefix: 0,
      errorHandlingConfig: i_ErrorHandlingConfig,
    },
    EventBridge: { object: 0, errorHandlingConfig: i_ErrorHandlingConfig },
    LookoutMetrics: {},
    Upsolver: {
      bucketName: 0,
      bucketPrefix: 0,
      s3OutputFormatConfig: {
        fileType: 0,
        prefixConfig: i_PrefixConfig,
        aggregationConfig: i_AggregationConfig,
      },
    },
    Honeycode: { object: 0, errorHandlingConfig: i_ErrorHandlingConfig },
    CustomerProfiles: { domainName: 0, objectTypeName: 0 },
    Zendesk: {
      object: 0,
      idFieldNames: 0,
      errorHandlingConfig: i_ErrorHandlingConfig,
      writeOperationType: 0,
    },
    Marketo: { object: 0, errorHandlingConfig: i_ErrorHandlingConfig },
    CustomConnector: {
      entityName: 0,
      errorHandlingConfig: i_ErrorHandlingConfig,
      writeOperationType: 0,
      idFieldNames: 0,
      customProperties: 0,
    },
    SAPOData: {
      objectPath: 0,
      successResponseHandlingConfig: { bucketPrefix: 0, bucketName: 0 },
      idFieldNames: 0,
      errorHandlingConfig: i_ErrorHandlingConfig,
      writeOperationType: 0,
    },
  },
});
const i_MetadataCatalogConfig: D.LazyStruct = () => ({
  glueDataCatalog: { roleArn: 0, databaseName: 0, tablePrefix: 0 },
});
const i_SourceFlowConfig: D.LazyStruct = () => ({
  connectorType: 0,
  apiVersion: 0,
  connectorProfileName: 0,
  sourceConnectorProperties: {
    Amplitude: { object: 0 },
    Datadog: { object: 0 },
    Dynatrace: { object: 0 },
    GoogleAnalytics: { object: 0 },
    InforNexus: { object: 0 },
    Marketo: { object: 0 },
    S3: {
      bucketName: 0,
      bucketPrefix: 0,
      s3InputFormatConfig: { s3InputFileType: 0 },
    },
    Salesforce: {
      object: 0,
      enableDynamicFieldUpdate: 0,
      includeDeletedRecords: 0,
      dataTransferApi: 0,
    },
    ServiceNow: { object: 0 },
    Singular: { object: 0 },
    Slack: { object: 0 },
    Trendmicro: { object: 0 },
    Veeva: {
      object: 0,
      documentType: 0,
      includeSourceFiles: 0,
      includeRenditions: 0,
      includeAllVersions: 0,
    },
    Zendesk: { object: 0 },
    SAPOData: {
      objectPath: 0,
      parallelismConfig: { maxParallelism: 0 },
      paginationConfig: { maxPageSize: 0 },
    },
    CustomConnector: {
      entityName: 0,
      customProperties: 0,
      dataTransferApi: { Name: 0, Type: 0 },
    },
    Pardot: { object: 0 },
  },
  incrementalPullConfig: { datetimeTypeFieldName: 0 },
});
const i_Task: D.LazyStruct = () => ({
  sourceFields: 0,
  connectorOperator: {
    Amplitude: 0,
    Datadog: 0,
    Dynatrace: 0,
    GoogleAnalytics: 0,
    InforNexus: 0,
    Marketo: 0,
    S3: 0,
    Salesforce: 0,
    ServiceNow: 0,
    Singular: 0,
    Slack: 0,
    Trendmicro: 0,
    Veeva: 0,
    Zendesk: 0,
    SAPOData: 0,
    CustomConnector: 0,
    Pardot: 0,
  },
  destinationField: 0,
  taskType: 0,
  taskProperties: 0,
});
const i_TriggerConfig: D.LazyStruct = () => ({
  triggerType: 0,
  triggerProperties: {
    Scheduled: {
      scheduleExpression: 0,
      dataPullMode: 0,
      scheduleStartTime: 0,
      scheduleEndTime: 0,
      timezone: 0,
      scheduleOffset: 0,
      firstExecutionFrom: 0,
      flowErrorDeactivationThreshold: 0,
    },
  },
});
const o_ConnectorConfiguration: D.LazyStruct = () => ({ registeredAt: D.ts });
const o_ConnectorDetail: D.LazyStruct = () => ({ registeredAt: D.ts });
const o_ExecutionDetails: D.LazyStruct = () => ({
  mostRecentExecutionTime: D.ts,
});
const i_AggregationConfig: D.LazyStruct = () => ({
  aggregationType: 0,
  targetFileSize: 0,
});
const i_BasicAuthCredentials: D.LazyStruct = () => ({
  username: 0,
  password: 0,
});
const i_ConnectorOAuthRequest: D.LazyStruct = () => ({
  authCode: 0,
  redirectUri: 0,
});
const i_ErrorHandlingConfig: D.LazyStruct = () => ({
  failOnFirstDestinationError: 0,
  bucketPrefix: 0,
  bucketName: 0,
});
const i_OAuth2Credentials: D.LazyStruct = () => ({
  clientId: 0,
  clientSecret: 0,
  accessToken: 0,
  refreshToken: 0,
  oAuthRequest: i_ConnectorOAuthRequest,
});
const i_PrefixConfig: D.LazyStruct = () => ({
  prefixType: 0,
  prefixFormat: 0,
  pathPrefixHierarchy: 0,
});
