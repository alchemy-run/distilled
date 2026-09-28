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
  sdkId: "AppSync",
  target: "AWSDeepdishControlPlaneService",
  version: "2017-07-25",
  sigv4: "appsync",
  protocol: restJson1Protocol,
  xmlns: "http://appsync.amazonaws.com",
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
                `https://appsync-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://appsync-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://appsync.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://appsync.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ApiKeyLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ApiKeyLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ApiKeyValidityOutOfBoundsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ApiKeyValidityOutOfBoundsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ApiLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ApiLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly reason?: BadRequestReason;
    readonly detail?: BadRequestDetail;
  }> {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentModificationException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class GraphQLSchemaException
  extends /*@__PURE__*/ TE.TaggedError(
    "GraphQLSchemaException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InternalFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalFailureException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
  })<{ readonly message?: string }> {}
export type DomainName = string;
export interface AssociateApiRequest {
  domainName: string;
  apiId: string;
}
export type AssociationStatus =
  | "PROCESSING"
  | "FAILED"
  | "SUCCESS"
  | (string & {});
export interface ApiAssociation {
  domainName?: string;
  apiId?: string;
  associationStatus?: AssociationStatus;
  deploymentDetail?: string;
}
export interface AssociateApiResponse {
  apiAssociation?: ApiAssociation;
}
export type MergeType = "MANUAL_MERGE" | "AUTO_MERGE" | (string & {});
export interface SourceApiAssociationConfig {
  mergeType?: MergeType;
}
export interface AssociateMergedGraphqlApiRequest {
  sourceApiIdentifier: string;
  mergedApiIdentifier: string;
  description?: string;
  sourceApiAssociationConfig?: SourceApiAssociationConfig;
}
export type SourceApiAssociationStatus =
  | "MERGE_SCHEDULED"
  | "MERGE_FAILED"
  | "MERGE_SUCCESS"
  | "MERGE_IN_PROGRESS"
  | "AUTO_MERGE_SCHEDULE_FAILED"
  | "DELETION_SCHEDULED"
  | "DELETION_IN_PROGRESS"
  | "DELETION_FAILED"
  | (string & {});
export interface SourceApiAssociation {
  associationId?: string;
  associationArn?: string;
  sourceApiId?: string;
  sourceApiArn?: string;
  mergedApiArn?: string;
  mergedApiId?: string;
  description?: string;
  sourceApiAssociationConfig?: SourceApiAssociationConfig;
  sourceApiAssociationStatus?: SourceApiAssociationStatus;
  sourceApiAssociationStatusDetail?: string;
  lastSuccessfulMergeDate?: Date;
}
export interface AssociateMergedGraphqlApiResponse {
  sourceApiAssociation?: SourceApiAssociation;
}
export interface AssociateSourceGraphqlApiRequest {
  mergedApiIdentifier: string;
  sourceApiIdentifier: string;
  description?: string;
  sourceApiAssociationConfig?: SourceApiAssociationConfig;
}
export interface AssociateSourceGraphqlApiResponse {
  sourceApiAssociation?: SourceApiAssociation;
}
export type ApiName = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type AuthenticationType =
  | "API_KEY"
  | "AWS_IAM"
  | "AMAZON_COGNITO_USER_POOLS"
  | "OPENID_CONNECT"
  | "AWS_LAMBDA"
  | (string & {});
export interface CognitoConfig {
  userPoolId: string;
  awsRegion: string;
  appIdClientRegex?: string;
}
export interface OpenIDConnectConfig {
  issuer: string;
  clientId?: string;
  iatTTL?: number;
  authTTL?: number;
}
export type TTL = number;
export interface LambdaAuthorizerConfig {
  authorizerResultTtlInSeconds?: number;
  authorizerUri: string;
  identityValidationExpression?: string;
}
export interface AuthProvider {
  authType: AuthenticationType;
  cognitoConfig?: CognitoConfig;
  openIDConnectConfig?: OpenIDConnectConfig;
  lambdaAuthorizerConfig?: LambdaAuthorizerConfig;
}
export type AuthProviders = AuthProvider[];
export interface AuthMode {
  authType: AuthenticationType;
}
export type AuthModes = AuthMode[];
export type EventLogLevel =
  | "NONE"
  | "ERROR"
  | "ALL"
  | "INFO"
  | "DEBUG"
  | (string & {});
export interface EventLogConfig {
  logLevel: EventLogLevel;
  cloudWatchLogsRoleArn: string;
}
export interface EventConfig {
  authProviders: AuthProvider[];
  connectionAuthModes: AuthMode[];
  defaultPublishAuthModes: AuthMode[];
  defaultSubscribeAuthModes: AuthMode[];
  logConfig?: EventLogConfig;
}
export interface CreateApiRequest {
  name: string;
  ownerContact?: string;
  tags?: { [key: string]: string | undefined };
  eventConfig: EventConfig;
}
export type OwnerContact = string;
export type MapOfStringToString = { [key: string]: string | undefined };
export interface Api {
  apiId?: string;
  name?: string;
  ownerContact?: string;
  tags?: { [key: string]: string | undefined };
  dns?: { [key: string]: string | undefined };
  apiArn?: string;
  created?: Date;
  xrayEnabled?: boolean;
  wafWebAclArn?: string;
  eventConfig?: EventConfig;
}
export interface CreateApiResponse {
  api?: Api;
}
export type ApiCachingBehavior =
  | "FULL_REQUEST_CACHING"
  | "PER_RESOLVER_CACHING"
  | "OPERATION_LEVEL_CACHING"
  | (string & {});
export type ApiCacheType =
  | "T2_SMALL"
  | "T2_MEDIUM"
  | "R4_LARGE"
  | "R4_XLARGE"
  | "R4_2XLARGE"
  | "R4_4XLARGE"
  | "R4_8XLARGE"
  | "SMALL"
  | "MEDIUM"
  | "LARGE"
  | "XLARGE"
  | "LARGE_2X"
  | "LARGE_4X"
  | "LARGE_8X"
  | "LARGE_12X"
  | (string & {});
export type CacheHealthMetricsConfig = "ENABLED" | "DISABLED" | (string & {});
export interface CreateApiCacheRequest {
  apiId: string;
  ttl: number;
  transitEncryptionEnabled?: boolean;
  atRestEncryptionEnabled?: boolean;
  apiCachingBehavior: ApiCachingBehavior;
  type: ApiCacheType;
  healthMetricsConfig?: CacheHealthMetricsConfig;
}
export type ApiCacheStatus =
  | "AVAILABLE"
  | "CREATING"
  | "DELETING"
  | "MODIFYING"
  | "FAILED"
  | (string & {});
export interface ApiCache {
  ttl?: number;
  apiCachingBehavior?: ApiCachingBehavior;
  transitEncryptionEnabled?: boolean;
  atRestEncryptionEnabled?: boolean;
  type?: ApiCacheType;
  status?: ApiCacheStatus;
  healthMetricsConfig?: CacheHealthMetricsConfig;
}
export interface CreateApiCacheResponse {
  apiCache?: ApiCache;
}
export interface CreateApiKeyRequest {
  apiId: string;
  description?: string;
  expires?: number;
}
export interface ApiKey {
  id?: string;
  description?: string;
  expires?: number;
  deletes?: number;
}
export interface CreateApiKeyResponse {
  apiKey?: ApiKey;
}
export type Namespace = string;
export type Code = string;
export type HandlerBehavior = "CODE" | "DIRECT" | (string & {});
export type InvokeType = "REQUEST_RESPONSE" | "EVENT" | (string & {});
export interface LambdaConfig {
  invokeType?: InvokeType;
}
export interface Integration {
  dataSourceName: string;
  lambdaConfig?: LambdaConfig;
}
export interface HandlerConfig {
  behavior: HandlerBehavior;
  integration: Integration;
}
export interface HandlerConfigs {
  onPublish?: HandlerConfig;
  onSubscribe?: HandlerConfig;
}
export interface CreateChannelNamespaceRequest {
  apiId: string;
  name: string;
  subscribeAuthModes?: AuthMode[];
  publishAuthModes?: AuthMode[];
  codeHandlers?: string;
  tags?: { [key: string]: string | undefined };
  handlerConfigs?: HandlerConfigs;
}
export interface ChannelNamespace {
  apiId?: string;
  name?: string;
  subscribeAuthModes?: AuthMode[];
  publishAuthModes?: AuthMode[];
  codeHandlers?: string;
  tags?: { [key: string]: string | undefined };
  channelNamespaceArn?: string;
  created?: Date;
  lastModified?: Date;
  handlerConfigs?: HandlerConfigs;
}
export interface CreateChannelNamespaceResponse {
  channelNamespace?: ChannelNamespace;
}
export type ResourceName = string;
export type DataSourceType =
  | "AWS_LAMBDA"
  | "AMAZON_DYNAMODB"
  | "AMAZON_ELASTICSEARCH"
  | "NONE"
  | "HTTP"
  | "RELATIONAL_DATABASE"
  | "AMAZON_OPENSEARCH_SERVICE"
  | "AMAZON_EVENTBRIDGE"
  | "AMAZON_BEDROCK_RUNTIME"
  | (string & {});
export interface DeltaSyncConfig {
  baseTableTTL?: number;
  deltaSyncTableName?: string;
  deltaSyncTableTTL?: number;
}
export interface DynamodbDataSourceConfig {
  tableName: string;
  awsRegion: string;
  useCallerCredentials?: boolean;
  deltaSyncConfig?: DeltaSyncConfig;
  versioned?: boolean;
}
export interface LambdaDataSourceConfig {
  lambdaFunctionArn: string;
}
export interface ElasticsearchDataSourceConfig {
  endpoint: string;
  awsRegion: string;
}
export interface OpenSearchServiceDataSourceConfig {
  endpoint: string;
  awsRegion: string;
}
export type AuthorizationType = "AWS_IAM" | (string & {});
export interface AwsIamConfig {
  signingRegion?: string;
  signingServiceName?: string;
}
export interface AuthorizationConfig {
  authorizationType: AuthorizationType;
  awsIamConfig?: AwsIamConfig;
}
export interface HttpDataSourceConfig {
  endpoint?: string;
  authorizationConfig?: AuthorizationConfig;
}
export type RelationalDatabaseSourceType = "RDS_HTTP_ENDPOINT" | (string & {});
export interface RdsHttpEndpointConfig {
  awsRegion?: string;
  dbClusterIdentifier?: string;
  databaseName?: string;
  schema?: string;
  awsSecretStoreArn?: string;
}
export interface RelationalDatabaseDataSourceConfig {
  relationalDatabaseSourceType?: RelationalDatabaseSourceType;
  rdsHttpEndpointConfig?: RdsHttpEndpointConfig;
}
export interface EventBridgeDataSourceConfig {
  eventBusArn: string;
}
export type DataSourceLevelMetricsConfig =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export interface CreateDataSourceRequest {
  apiId: string;
  name: string;
  description?: string;
  type: DataSourceType;
  serviceRoleArn?: string;
  dynamodbConfig?: DynamodbDataSourceConfig;
  lambdaConfig?: LambdaDataSourceConfig;
  elasticsearchConfig?: ElasticsearchDataSourceConfig;
  openSearchServiceConfig?: OpenSearchServiceDataSourceConfig;
  httpConfig?: HttpDataSourceConfig;
  relationalDatabaseConfig?: RelationalDatabaseDataSourceConfig;
  eventBridgeConfig?: EventBridgeDataSourceConfig;
  metricsConfig?: DataSourceLevelMetricsConfig;
}
export interface DataSource {
  dataSourceArn?: string;
  name?: string;
  description?: string;
  type?: DataSourceType;
  serviceRoleArn?: string;
  dynamodbConfig?: DynamodbDataSourceConfig;
  lambdaConfig?: LambdaDataSourceConfig;
  elasticsearchConfig?: ElasticsearchDataSourceConfig;
  openSearchServiceConfig?: OpenSearchServiceDataSourceConfig;
  httpConfig?: HttpDataSourceConfig;
  relationalDatabaseConfig?: RelationalDatabaseDataSourceConfig;
  eventBridgeConfig?: EventBridgeDataSourceConfig;
  metricsConfig?: DataSourceLevelMetricsConfig;
}
export interface CreateDataSourceResponse {
  dataSource?: DataSource;
}
export type CertificateArn = string;
export type Description = string;
export interface CreateDomainNameRequest {
  domainName: string;
  certificateArn: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export interface DomainNameConfig {
  domainName?: string;
  description?: string;
  certificateArn?: string;
  appsyncDomainName?: string;
  hostedZoneId?: string;
  tags?: { [key: string]: string | undefined };
  domainNameArn?: string;
}
export interface CreateDomainNameResponse {
  domainNameConfig?: DomainNameConfig;
}
export type MappingTemplate = string;
export type ConflictHandlerType =
  | "OPTIMISTIC_CONCURRENCY"
  | "LAMBDA"
  | "AUTOMERGE"
  | "NONE"
  | (string & {});
export type ConflictDetectionType = "VERSION" | "NONE" | (string & {});
export interface LambdaConflictHandlerConfig {
  lambdaConflictHandlerArn?: string;
}
export interface SyncConfig {
  conflictHandler?: ConflictHandlerType;
  conflictDetection?: ConflictDetectionType;
  lambdaConflictHandlerConfig?: LambdaConflictHandlerConfig;
}
export type MaxBatchSize = number;
export type RuntimeName = "APPSYNC_JS" | (string & {});
export interface AppSyncRuntime {
  name: RuntimeName;
  runtimeVersion: string;
}
export interface CreateFunctionRequest {
  apiId: string;
  name: string;
  description?: string;
  dataSourceName: string;
  requestMappingTemplate?: string;
  responseMappingTemplate?: string;
  functionVersion?: string;
  syncConfig?: SyncConfig;
  maxBatchSize?: number;
  runtime?: AppSyncRuntime;
  code?: string;
}
export interface FunctionConfiguration {
  functionId?: string;
  functionArn?: string;
  name?: string;
  description?: string;
  dataSourceName?: string;
  requestMappingTemplate?: string;
  responseMappingTemplate?: string;
  functionVersion?: string;
  syncConfig?: SyncConfig;
  maxBatchSize?: number;
  runtime?: AppSyncRuntime;
  code?: string;
}
export interface CreateFunctionResponse {
  functionConfiguration?: FunctionConfiguration;
}
export type FieldLogLevel =
  | "NONE"
  | "ERROR"
  | "ALL"
  | "INFO"
  | "DEBUG"
  | (string & {});
export interface LogConfig {
  fieldLogLevel: FieldLogLevel;
  cloudWatchLogsRoleArn: string;
  excludeVerboseContent?: boolean;
}
export type DefaultAction = "ALLOW" | "DENY" | (string & {});
export interface UserPoolConfig {
  userPoolId: string;
  awsRegion: string;
  defaultAction: DefaultAction;
  appIdClientRegex?: string;
}
export interface CognitoUserPoolConfig {
  userPoolId: string;
  awsRegion: string;
  appIdClientRegex?: string;
}
export interface AdditionalAuthenticationProvider {
  authenticationType?: AuthenticationType;
  openIDConnectConfig?: OpenIDConnectConfig;
  userPoolConfig?: CognitoUserPoolConfig;
  lambdaAuthorizerConfig?: LambdaAuthorizerConfig;
}
export type AdditionalAuthenticationProviders =
  AdditionalAuthenticationProvider[];
export type GraphQLApiType = "GRAPHQL" | "MERGED" | (string & {});
export type GraphQLApiVisibility = "GLOBAL" | "PRIVATE" | (string & {});
export type GraphQLApiIntrospectionConfig =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type QueryDepthLimit = number;
export type ResolverCountLimit = number;
export type ResolverLevelMetricsBehavior =
  | "FULL_REQUEST_RESOLVER_METRICS"
  | "PER_RESOLVER_METRICS"
  | (string & {});
export type DataSourceLevelMetricsBehavior =
  | "FULL_REQUEST_DATA_SOURCE_METRICS"
  | "PER_DATA_SOURCE_METRICS"
  | (string & {});
export type OperationLevelMetricsConfig =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export interface EnhancedMetricsConfig {
  resolverLevelMetricsBehavior: ResolverLevelMetricsBehavior;
  dataSourceLevelMetricsBehavior: DataSourceLevelMetricsBehavior;
  operationLevelMetricsConfig: OperationLevelMetricsConfig;
}
export interface CreateGraphqlApiRequest {
  name: string;
  logConfig?: LogConfig;
  authenticationType: AuthenticationType;
  userPoolConfig?: UserPoolConfig;
  openIDConnectConfig?: OpenIDConnectConfig;
  tags?: { [key: string]: string | undefined };
  additionalAuthenticationProviders?: AdditionalAuthenticationProvider[];
  xrayEnabled?: boolean;
  lambdaAuthorizerConfig?: LambdaAuthorizerConfig;
  apiType?: GraphQLApiType;
  mergedApiExecutionRoleArn?: string;
  visibility?: GraphQLApiVisibility;
  ownerContact?: string;
  introspectionConfig?: GraphQLApiIntrospectionConfig;
  queryDepthLimit?: number;
  resolverCountLimit?: number;
  enhancedMetricsConfig?: EnhancedMetricsConfig;
}
export interface GraphqlApi {
  name?: string;
  apiId?: string;
  authenticationType?: AuthenticationType;
  logConfig?: LogConfig;
  userPoolConfig?: UserPoolConfig;
  openIDConnectConfig?: OpenIDConnectConfig;
  arn?: string;
  uris?: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
  additionalAuthenticationProviders?: AdditionalAuthenticationProvider[];
  xrayEnabled?: boolean;
  wafWebAclArn?: string;
  lambdaAuthorizerConfig?: LambdaAuthorizerConfig;
  dns?: { [key: string]: string | undefined };
  visibility?: GraphQLApiVisibility;
  apiType?: GraphQLApiType;
  mergedApiExecutionRoleArn?: string;
  owner?: string;
  ownerContact?: string;
  introspectionConfig?: GraphQLApiIntrospectionConfig;
  queryDepthLimit?: number;
  resolverCountLimit?: number;
  enhancedMetricsConfig?: EnhancedMetricsConfig;
}
export interface CreateGraphqlApiResponse {
  graphqlApi?: GraphqlApi;
}
export type ResolverKind = "UNIT" | "PIPELINE" | (string & {});
export type FunctionsIds = string[];
export interface PipelineConfig {
  functions?: string[];
}
export type CachingKeys = string[];
export interface CachingConfig {
  ttl: number;
  cachingKeys?: string[];
}
export type ResolverLevelMetricsConfig = "ENABLED" | "DISABLED" | (string & {});
export interface CreateResolverRequest {
  apiId: string;
  typeName: string;
  fieldName: string;
  dataSourceName?: string;
  requestMappingTemplate?: string;
  responseMappingTemplate?: string;
  kind?: ResolverKind;
  pipelineConfig?: PipelineConfig;
  syncConfig?: SyncConfig;
  cachingConfig?: CachingConfig;
  maxBatchSize?: number;
  runtime?: AppSyncRuntime;
  code?: string;
  metricsConfig?: ResolverLevelMetricsConfig;
}
export interface Resolver {
  typeName?: string;
  fieldName?: string;
  dataSourceName?: string;
  resolverArn?: string;
  requestMappingTemplate?: string;
  responseMappingTemplate?: string;
  kind?: ResolverKind;
  pipelineConfig?: PipelineConfig;
  syncConfig?: SyncConfig;
  cachingConfig?: CachingConfig;
  maxBatchSize?: number;
  runtime?: AppSyncRuntime;
  code?: string;
  metricsConfig?: ResolverLevelMetricsConfig;
}
export interface CreateResolverResponse {
  resolver?: Resolver;
}
export type TypeDefinitionFormat = "SDL" | "JSON" | (string & {});
export interface CreateTypeRequest {
  apiId: string;
  definition: string;
  format: TypeDefinitionFormat;
}
export interface Type {
  name?: string;
  description?: string;
  arn?: string;
  definition?: string;
  format?: TypeDefinitionFormat;
}
export interface CreateTypeResponse {
  type?: Type;
}
export interface DeleteApiRequest {
  apiId: string;
}
export interface DeleteApiResponse {}
export interface DeleteApiCacheRequest {
  apiId: string;
}
export interface DeleteApiCacheResponse {}
export interface DeleteApiKeyRequest {
  apiId: string;
  id: string;
}
export interface DeleteApiKeyResponse {}
export interface DeleteChannelNamespaceRequest {
  apiId: string;
  name: string;
}
export interface DeleteChannelNamespaceResponse {}
export interface DeleteDataSourceRequest {
  apiId: string;
  name: string;
}
export interface DeleteDataSourceResponse {}
export interface DeleteDomainNameRequest {
  domainName: string;
}
export interface DeleteDomainNameResponse {}
export interface DeleteFunctionRequest {
  apiId: string;
  functionId: string;
}
export interface DeleteFunctionResponse {}
export interface DeleteGraphqlApiRequest {
  apiId: string;
}
export interface DeleteGraphqlApiResponse {}
export interface DeleteResolverRequest {
  apiId: string;
  typeName: string;
  fieldName: string;
}
export interface DeleteResolverResponse {}
export interface DeleteTypeRequest {
  apiId: string;
  typeName: string;
}
export interface DeleteTypeResponse {}
export interface DisassociateApiRequest {
  domainName: string;
}
export interface DisassociateApiResponse {}
export interface DisassociateMergedGraphqlApiRequest {
  sourceApiIdentifier: string;
  associationId: string;
}
export interface DisassociateMergedGraphqlApiResponse {
  sourceApiAssociationStatus?: SourceApiAssociationStatus;
}
export interface DisassociateSourceGraphqlApiRequest {
  mergedApiIdentifier: string;
  associationId: string;
}
export interface DisassociateSourceGraphqlApiResponse {
  sourceApiAssociationStatus?: SourceApiAssociationStatus;
}
export type Context = string;
export interface EvaluateCodeRequest {
  runtime: AppSyncRuntime;
  code: string;
  context: string;
  function?: string;
}
export type EvaluationResult = string;
export type ErrorMessage = string;
export type CodeErrorLine = number;
export type CodeErrorColumn = number;
export type CodeErrorSpan = number;
export interface CodeErrorLocation {
  line?: number;
  column?: number;
  span?: number;
}
export interface CodeError {
  errorType?: string;
  value?: string;
  location?: CodeErrorLocation;
}
export type CodeErrors = CodeError[];
export interface EvaluateCodeErrorDetail {
  message?: string;
  codeErrors?: CodeError[];
}
export type Logs = string[];
export type Stash = string;
export type OutErrors = string;
export interface EvaluateCodeResponse {
  evaluationResult?: string;
  error?: EvaluateCodeErrorDetail;
  logs?: string[];
  stash?: string;
  outErrors?: string;
}
export type Template = string;
export interface EvaluateMappingTemplateRequest {
  template: string;
  context: string;
}
export interface ErrorDetail {
  message?: string;
}
export interface EvaluateMappingTemplateResponse {
  evaluationResult?: string;
  error?: ErrorDetail;
  logs?: string[];
  stash?: string;
  outErrors?: string;
}
export interface FlushApiCacheRequest {
  apiId: string;
}
export interface FlushApiCacheResponse {}
export interface GetApiRequest {
  apiId: string;
}
export interface GetApiResponse {
  api?: Api;
}
export interface GetApiAssociationRequest {
  domainName: string;
}
export interface GetApiAssociationResponse {
  apiAssociation?: ApiAssociation;
}
export interface GetApiCacheRequest {
  apiId: string;
}
export interface GetApiCacheResponse {
  apiCache?: ApiCache;
}
export interface GetChannelNamespaceRequest {
  apiId: string;
  name: string;
}
export interface GetChannelNamespaceResponse {
  channelNamespace?: ChannelNamespace;
}
export interface GetDataSourceRequest {
  apiId: string;
  name: string;
}
export interface GetDataSourceResponse {
  dataSource?: DataSource;
}
export type PaginationToken = string;
export type MaxResults = number;
export interface GetDataSourceIntrospectionRequest {
  introspectionId: string;
  includeModelsSDL?: boolean;
  nextToken?: string;
  maxResults?: number;
}
export type DataSourceIntrospectionStatus =
  | "PROCESSING"
  | "FAILED"
  | "SUCCESS"
  | (string & {});
export type DataSourceIntrospectionModelFieldTypeValues = string[];
export interface DataSourceIntrospectionModelFieldType {
  kind?: string;
  name?: string;
  type?: DataSourceIntrospectionModelFieldType;
  values?: string[];
}
export interface DataSourceIntrospectionModelField {
  name?: string;
  type?: DataSourceIntrospectionModelFieldType;
  length?: number;
}
export type DataSourceIntrospectionModelFields =
  DataSourceIntrospectionModelField[];
export type DataSourceIntrospectionModelIndexFields = string[];
export interface DataSourceIntrospectionModelIndex {
  name?: string;
  fields?: string[];
}
export type DataSourceIntrospectionModelIndexes =
  DataSourceIntrospectionModelIndex[];
export interface DataSourceIntrospectionModel {
  name?: string;
  fields?: DataSourceIntrospectionModelField[];
  primaryKey?: DataSourceIntrospectionModelIndex;
  indexes?: DataSourceIntrospectionModelIndex[];
  sdl?: string;
}
export type DataSourceIntrospectionModels = DataSourceIntrospectionModel[];
export interface DataSourceIntrospectionResult {
  models?: DataSourceIntrospectionModel[];
  nextToken?: string;
}
export interface GetDataSourceIntrospectionResponse {
  introspectionId?: string;
  introspectionStatus?: DataSourceIntrospectionStatus;
  introspectionStatusDetail?: string;
  introspectionResult?: DataSourceIntrospectionResult;
}
export interface GetDomainNameRequest {
  domainName: string;
}
export interface GetDomainNameResponse {
  domainNameConfig?: DomainNameConfig;
}
export interface GetFunctionRequest {
  apiId: string;
  functionId: string;
}
export interface GetFunctionResponse {
  functionConfiguration?: FunctionConfiguration;
}
export interface GetGraphqlApiRequest {
  apiId: string;
}
export interface GetGraphqlApiResponse {
  graphqlApi?: GraphqlApi;
}
export interface GetGraphqlApiEnvironmentVariablesRequest {
  apiId: string;
}
export type EnvironmentVariableKey = string;
export type EnvironmentVariableValue = string;
export type EnvironmentVariableMap = { [key: string]: string | undefined };
export interface GetGraphqlApiEnvironmentVariablesResponse {
  environmentVariables?: { [key: string]: string | undefined };
}
export type OutputType = "SDL" | "JSON" | (string & {});
export interface GetIntrospectionSchemaRequest {
  apiId: string;
  format: OutputType;
  includeDirectives?: boolean;
}
export interface GetIntrospectionSchemaResponse {
  schema?: T.StreamingOutputBody;
}
export interface GetResolverRequest {
  apiId: string;
  typeName: string;
  fieldName: string;
}
export interface GetResolverResponse {
  resolver?: Resolver;
}
export interface GetSchemaCreationStatusRequest {
  apiId: string;
}
export type SchemaStatus =
  | "PROCESSING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | "SUCCESS"
  | "NOT_APPLICABLE"
  | (string & {});
export interface GetSchemaCreationStatusResponse {
  status?: SchemaStatus;
  details?: string;
}
export interface GetSourceApiAssociationRequest {
  mergedApiIdentifier: string;
  associationId: string;
}
export interface GetSourceApiAssociationResponse {
  sourceApiAssociation?: SourceApiAssociation;
}
export interface GetTypeRequest {
  apiId: string;
  typeName: string;
  format: TypeDefinitionFormat;
}
export interface GetTypeResponse {
  type?: Type;
}
export interface ListApiKeysRequest {
  apiId: string;
  nextToken?: string;
  maxResults?: number;
}
export type ApiKeys = ApiKey[];
export interface ListApiKeysResponse {
  apiKeys?: ApiKey[];
  nextToken?: string;
}
export interface ListApisRequest {
  nextToken?: string;
  maxResults?: number;
}
export type Apis = Api[];
export interface ListApisResponse {
  apis?: Api[];
  nextToken?: string;
}
export interface ListChannelNamespacesRequest {
  apiId: string;
  nextToken?: string;
  maxResults?: number;
}
export type ChannelNamespaces = ChannelNamespace[];
export interface ListChannelNamespacesResponse {
  channelNamespaces?: ChannelNamespace[];
  nextToken?: string;
}
export interface ListDataSourcesRequest {
  apiId: string;
  nextToken?: string;
  maxResults?: number;
}
export type DataSources = DataSource[];
export interface ListDataSourcesResponse {
  dataSources?: DataSource[];
  nextToken?: string;
}
export interface ListDomainNamesRequest {
  nextToken?: string;
  maxResults?: number;
}
export type DomainNameConfigs = DomainNameConfig[];
export interface ListDomainNamesResponse {
  domainNameConfigs?: DomainNameConfig[];
  nextToken?: string;
}
export interface ListFunctionsRequest {
  apiId: string;
  nextToken?: string;
  maxResults?: number;
}
export type Functions = FunctionConfiguration[];
export interface ListFunctionsResponse {
  functions?: FunctionConfiguration[];
  nextToken?: string;
}
export type Ownership = "CURRENT_ACCOUNT" | "OTHER_ACCOUNTS" | (string & {});
export interface ListGraphqlApisRequest {
  nextToken?: string;
  maxResults?: number;
  apiType?: GraphQLApiType;
  owner?: Ownership;
}
export type GraphqlApis = GraphqlApi[];
export interface ListGraphqlApisResponse {
  graphqlApis?: GraphqlApi[];
  nextToken?: string;
}
export interface ListResolversRequest {
  apiId: string;
  typeName: string;
  nextToken?: string;
  maxResults?: number;
}
export type Resolvers = Resolver[];
export interface ListResolversResponse {
  resolvers?: Resolver[];
  nextToken?: string;
}
export interface ListResolversByFunctionRequest {
  apiId: string;
  functionId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListResolversByFunctionResponse {
  resolvers?: Resolver[];
  nextToken?: string;
}
export interface ListSourceApiAssociationsRequest {
  apiId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface SourceApiAssociationSummary {
  associationId?: string;
  associationArn?: string;
  sourceApiId?: string;
  sourceApiArn?: string;
  mergedApiId?: string;
  mergedApiArn?: string;
  description?: string;
}
export type SourceApiAssociationSummaryList = SourceApiAssociationSummary[];
export interface ListSourceApiAssociationsResponse {
  sourceApiAssociationSummaries?: SourceApiAssociationSummary[];
  nextToken?: string;
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface ListTypesRequest {
  apiId: string;
  format: TypeDefinitionFormat;
  nextToken?: string;
  maxResults?: number;
}
export type TypeList = Type[];
export interface ListTypesResponse {
  types?: Type[];
  nextToken?: string;
}
export interface ListTypesByAssociationRequest {
  mergedApiIdentifier: string;
  associationId: string;
  format: TypeDefinitionFormat;
  nextToken?: string;
  maxResults?: number;
}
export interface ListTypesByAssociationResponse {
  types?: Type[];
  nextToken?: string;
}
export interface PutGraphqlApiEnvironmentVariablesRequest {
  apiId: string;
  environmentVariables: { [key: string]: string | undefined };
}
export interface PutGraphqlApiEnvironmentVariablesResponse {
  environmentVariables?: { [key: string]: string | undefined };
}
export type RdsDataApiConfigResourceArn = string;
export type RdsDataApiConfigSecretArn = string;
export type RdsDataApiConfigDatabaseName = string;
export interface RdsDataApiConfig {
  resourceArn: string;
  secretArn: string;
  databaseName: string;
}
export interface StartDataSourceIntrospectionRequest {
  rdsDataApiConfig?: RdsDataApiConfig;
}
export interface StartDataSourceIntrospectionResponse {
  introspectionId?: string;
  introspectionStatus?: DataSourceIntrospectionStatus;
  introspectionStatusDetail?: string;
}
export interface StartSchemaCreationRequest {
  apiId: string;
  definition: Uint8Array;
}
export interface StartSchemaCreationResponse {
  status?: SchemaStatus;
}
export interface StartSchemaMergeRequest {
  associationId: string;
  mergedApiIdentifier: string;
}
export interface StartSchemaMergeResponse {
  sourceApiAssociationStatus?: SourceApiAssociationStatus;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateApiRequest {
  apiId: string;
  name: string;
  ownerContact?: string;
  eventConfig: EventConfig;
}
export interface UpdateApiResponse {
  api?: Api;
}
export interface UpdateApiCacheRequest {
  apiId: string;
  ttl: number;
  apiCachingBehavior: ApiCachingBehavior;
  type: ApiCacheType;
  healthMetricsConfig?: CacheHealthMetricsConfig;
}
export interface UpdateApiCacheResponse {
  apiCache?: ApiCache;
}
export interface UpdateApiKeyRequest {
  apiId: string;
  id: string;
  description?: string;
  expires?: number;
}
export interface UpdateApiKeyResponse {
  apiKey?: ApiKey;
}
export interface UpdateChannelNamespaceRequest {
  apiId: string;
  name: string;
  subscribeAuthModes?: AuthMode[];
  publishAuthModes?: AuthMode[];
  codeHandlers?: string;
  handlerConfigs?: HandlerConfigs;
}
export interface UpdateChannelNamespaceResponse {
  channelNamespace?: ChannelNamespace;
}
export interface UpdateDataSourceRequest {
  apiId: string;
  name: string;
  description?: string;
  type: DataSourceType;
  serviceRoleArn?: string;
  dynamodbConfig?: DynamodbDataSourceConfig;
  lambdaConfig?: LambdaDataSourceConfig;
  elasticsearchConfig?: ElasticsearchDataSourceConfig;
  openSearchServiceConfig?: OpenSearchServiceDataSourceConfig;
  httpConfig?: HttpDataSourceConfig;
  relationalDatabaseConfig?: RelationalDatabaseDataSourceConfig;
  eventBridgeConfig?: EventBridgeDataSourceConfig;
  metricsConfig?: DataSourceLevelMetricsConfig;
}
export interface UpdateDataSourceResponse {
  dataSource?: DataSource;
}
export interface UpdateDomainNameRequest {
  domainName: string;
  description?: string;
}
export interface UpdateDomainNameResponse {
  domainNameConfig?: DomainNameConfig;
}
export interface UpdateFunctionRequest {
  apiId: string;
  name: string;
  description?: string;
  functionId: string;
  dataSourceName: string;
  requestMappingTemplate?: string;
  responseMappingTemplate?: string;
  functionVersion?: string;
  syncConfig?: SyncConfig;
  maxBatchSize?: number;
  runtime?: AppSyncRuntime;
  code?: string;
}
export interface UpdateFunctionResponse {
  functionConfiguration?: FunctionConfiguration;
}
export interface UpdateGraphqlApiRequest {
  apiId: string;
  name: string;
  logConfig?: LogConfig;
  authenticationType: AuthenticationType;
  userPoolConfig?: UserPoolConfig;
  openIDConnectConfig?: OpenIDConnectConfig;
  additionalAuthenticationProviders?: AdditionalAuthenticationProvider[];
  xrayEnabled?: boolean;
  lambdaAuthorizerConfig?: LambdaAuthorizerConfig;
  mergedApiExecutionRoleArn?: string;
  ownerContact?: string;
  introspectionConfig?: GraphQLApiIntrospectionConfig;
  queryDepthLimit?: number;
  resolverCountLimit?: number;
  enhancedMetricsConfig?: EnhancedMetricsConfig;
}
export interface UpdateGraphqlApiResponse {
  graphqlApi?: GraphqlApi;
}
export interface UpdateResolverRequest {
  apiId: string;
  typeName: string;
  fieldName: string;
  dataSourceName?: string;
  requestMappingTemplate?: string;
  responseMappingTemplate?: string;
  kind?: ResolverKind;
  pipelineConfig?: PipelineConfig;
  syncConfig?: SyncConfig;
  cachingConfig?: CachingConfig;
  maxBatchSize?: number;
  runtime?: AppSyncRuntime;
  code?: string;
  metricsConfig?: ResolverLevelMetricsConfig;
}
export interface UpdateResolverResponse {
  resolver?: Resolver;
}
export interface UpdateSourceApiAssociationRequest {
  associationId: string;
  mergedApiIdentifier: string;
  description?: string;
  sourceApiAssociationConfig?: SourceApiAssociationConfig;
}
export interface UpdateSourceApiAssociationResponse {
  sourceApiAssociation?: SourceApiAssociation;
}
export interface UpdateTypeRequest {
  apiId: string;
  typeName: string;
  definition?: string;
  format: TypeDefinitionFormat;
}
export interface UpdateTypeResponse {
  type?: Type;
}
export type BadRequestReason = "CODE_ERROR" | (string & {});
export interface BadRequestDetail {
  codeErrors?: CodeError[];
}
export type AssociateApiError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | CommonErrors;
/**
 * Maps an endpoint to your custom domain.
 */
export const associateApi: API.OperationMethod<
  AssociateApiRequest,
  AssociateApiResponse,
  AssociateApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/domainnames/{domainName}/apiassociation",
    input: { domainName: 0, apiId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateApi",
})) as any;

export type AssociateMergedGraphqlApiError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an association between a Merged API and source API using the source API's
 * identifier.
 */
export const associateMergedGraphqlApi: API.OperationMethod<
  AssociateMergedGraphqlApiRequest,
  AssociateMergedGraphqlApiResponse,
  AssociateMergedGraphqlApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/sourceApis/{sourceApiIdentifier}/mergedApiAssociations",
    input: {
      sourceApiIdentifier: 0,
      mergedApiIdentifier: 0,
      description: 0,
      sourceApiAssociationConfig: i_SourceApiAssociationConfig,
    },
    output: { sourceApiAssociation: o_SourceApiAssociation },
    body: true,
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateMergedGraphqlApi",
})) as any;

export type AssociateSourceGraphqlApiError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an association between a Merged API and source API using the Merged API's
 * identifier.
 */
export const associateSourceGraphqlApi: API.OperationMethod<
  AssociateSourceGraphqlApiRequest,
  AssociateSourceGraphqlApiResponse,
  AssociateSourceGraphqlApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/mergedApis/{mergedApiIdentifier}/sourceApiAssociations",
    input: {
      mergedApiIdentifier: 0,
      sourceApiIdentifier: 0,
      description: 0,
      sourceApiAssociationConfig: i_SourceApiAssociationConfig,
    },
    output: { sourceApiAssociation: o_SourceApiAssociation },
    body: true,
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSourceGraphqlApi",
})) as any;

export type CreateApiError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | ServiceQuotaExceededException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an `Api` object. Use this operation to create an AppSync
 * API with your preferred configuration, such as an Event API that provides real-time message
 * publishing and message subscriptions over WebSockets.
 */
export const createApi: API.OperationMethod<
  CreateApiRequest,
  CreateApiResponse,
  CreateApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/apis",
    input: { name: 0, ownerContact: 0, tags: 0, eventConfig: i_EventConfig },
    output: { api: o_Api },
    body: true,
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    ServiceQuotaExceededException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApi",
})) as any;

export type CreateApiCacheError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a cache for the GraphQL API.
 */
export const createApiCache: API.OperationMethod<
  CreateApiCacheRequest,
  CreateApiCacheResponse,
  CreateApiCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apis/{apiId}/ApiCaches",
    input: {
      apiId: 0,
      ttl: 0,
      transitEncryptionEnabled: 0,
      atRestEncryptionEnabled: 0,
      apiCachingBehavior: 0,
      type: 0,
      healthMetricsConfig: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApiCache",
})) as any;

export type CreateApiKeyError =
  | ApiKeyLimitExceededException
  | ApiKeyValidityOutOfBoundsException
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a unique key that you can distribute to clients who invoke your API.
 */
export const createApiKey: API.OperationMethod<
  CreateApiKeyRequest,
  CreateApiKeyResponse,
  CreateApiKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apis/{apiId}/apikeys",
    input: { apiId: 0, description: 0, expires: 0 },
    body: true,
  },
  errors: [
    ApiKeyLimitExceededException,
    ApiKeyValidityOutOfBoundsException,
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApiKey",
})) as any;

export type CreateChannelNamespaceError =
  | BadRequestException
  | ConcurrentModificationException
  | ConflictException
  | InternalFailureException
  | NotFoundException
  | ServiceQuotaExceededException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a `ChannelNamespace` for an `Api`.
 */
export const createChannelNamespace: API.OperationMethod<
  CreateChannelNamespaceRequest,
  CreateChannelNamespaceResponse,
  CreateChannelNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/apis/{apiId}/channelNamespaces",
    input: {
      apiId: 0,
      name: 0,
      subscribeAuthModes: D.list(i_AuthMode),
      publishAuthModes: D.list(i_AuthMode),
      codeHandlers: 0,
      tags: 0,
      handlerConfigs: i_HandlerConfigs,
    },
    output: { channelNamespace: o_ChannelNamespace },
    body: true,
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    ConflictException,
    InternalFailureException,
    NotFoundException,
    ServiceQuotaExceededException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannelNamespace",
})) as any;

export type CreateDataSourceError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a `DataSource` object.
 */
export const createDataSource: API.OperationMethod<
  CreateDataSourceRequest,
  CreateDataSourceResponse,
  CreateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apis/{apiId}/datasources",
    input: {
      apiId: 0,
      name: 0,
      description: 0,
      type: 0,
      serviceRoleArn: 0,
      dynamodbConfig: i_DynamodbDataSourceConfig,
      lambdaConfig: i_LambdaDataSourceConfig,
      elasticsearchConfig: i_ElasticsearchDataSourceConfig,
      openSearchServiceConfig: i_OpenSearchServiceDataSourceConfig,
      httpConfig: i_HttpDataSourceConfig,
      relationalDatabaseConfig: i_RelationalDatabaseDataSourceConfig,
      eventBridgeConfig: i_EventBridgeDataSourceConfig,
      metricsConfig: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataSource",
})) as any;

export type CreateDomainNameError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | CommonErrors;
/**
 * Creates a custom `DomainName` object.
 */
export const createDomainName: API.OperationMethod<
  CreateDomainNameRequest,
  CreateDomainNameResponse,
  CreateDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/domainnames",
    input: { domainName: 0, certificateArn: 0, description: 0, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomainName",
})) as any;

export type CreateFunctionError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a `Function` object.
 *
 * A function is a reusable entity. You can use multiple functions to compose the resolver
 * logic.
 */
export const createFunction: API.OperationMethod<
  CreateFunctionRequest,
  CreateFunctionResponse,
  CreateFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apis/{apiId}/functions",
    input: {
      apiId: 0,
      name: 0,
      description: 0,
      dataSourceName: 0,
      requestMappingTemplate: 0,
      responseMappingTemplate: 0,
      functionVersion: 0,
      syncConfig: i_SyncConfig,
      maxBatchSize: 0,
      runtime: i_AppSyncRuntime,
      code: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFunction",
})) as any;

export type CreateGraphqlApiError =
  | ApiLimitExceededException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | LimitExceededException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a `GraphqlApi` object.
 */
export const createGraphqlApi: API.OperationMethod<
  CreateGraphqlApiRequest,
  CreateGraphqlApiResponse,
  CreateGraphqlApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apis",
    input: {
      name: 0,
      logConfig: i_LogConfig,
      authenticationType: 0,
      userPoolConfig: i_UserPoolConfig,
      openIDConnectConfig: i_OpenIDConnectConfig,
      tags: 0,
      additionalAuthenticationProviders: D.list(
        i_AdditionalAuthenticationProvider,
      ),
      xrayEnabled: 0,
      lambdaAuthorizerConfig: i_LambdaAuthorizerConfig,
      apiType: 0,
      mergedApiExecutionRoleArn: 0,
      visibility: 0,
      ownerContact: 0,
      introspectionConfig: 0,
      queryDepthLimit: 0,
      resolverCountLimit: 0,
      enhancedMetricsConfig: i_EnhancedMetricsConfig,
    },
    body: true,
  },
  errors: [
    ApiLimitExceededException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    LimitExceededException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGraphqlApi",
})) as any;

export type CreateResolverError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a `Resolver` object.
 *
 * A resolver converts incoming requests into a format that a data source can understand,
 * and converts the data source's responses into GraphQL.
 */
export const createResolver: API.OperationMethod<
  CreateResolverRequest,
  CreateResolverResponse,
  CreateResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apis/{apiId}/types/{typeName}/resolvers",
    input: {
      apiId: 0,
      typeName: 0,
      fieldName: 0,
      dataSourceName: 0,
      requestMappingTemplate: 0,
      responseMappingTemplate: 0,
      kind: 0,
      pipelineConfig: i_PipelineConfig,
      syncConfig: i_SyncConfig,
      cachingConfig: i_CachingConfig,
      maxBatchSize: 0,
      runtime: i_AppSyncRuntime,
      code: 0,
      metricsConfig: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResolver",
})) as any;

export type CreateTypeError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a `Type` object.
 */
export const createType: API.OperationMethod<
  CreateTypeRequest,
  CreateTypeResponse,
  CreateTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apis/{apiId}/types",
    input: { apiId: 0, definition: 0, format: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateType",
})) as any;

export type DeleteApiError =
  | AccessDeniedException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an `Api` object
 */
export const deleteApi: API.OperationMethod<
  DeleteApiRequest,
  DeleteApiResponse,
  DeleteApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/apis/{apiId}",
    input: { apiId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApi",
})) as any;

export type DeleteApiCacheError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an `ApiCache` object.
 */
export const deleteApiCache: API.OperationMethod<
  DeleteApiCacheRequest,
  DeleteApiCacheResponse,
  DeleteApiCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apis/{apiId}/ApiCaches",
    input: { apiId: 0 },
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApiCache",
})) as any;

export type DeleteApiKeyError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an API key.
 */
export const deleteApiKey: API.OperationMethod<
  DeleteApiKeyRequest,
  DeleteApiKeyResponse,
  DeleteApiKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apis/{apiId}/apikeys/{id}",
    input: { apiId: 0, id: 0 },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApiKey",
})) as any;

export type DeleteChannelNamespaceError =
  | AccessDeniedException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a `ChannelNamespace`.
 */
export const deleteChannelNamespace: API.OperationMethod<
  DeleteChannelNamespaceRequest,
  DeleteChannelNamespaceResponse,
  DeleteChannelNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/apis/{apiId}/channelNamespaces/{name}",
    input: { apiId: 0, name: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannelNamespace",
})) as any;

export type DeleteDataSourceError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a `DataSource` object.
 */
export const deleteDataSource: API.OperationMethod<
  DeleteDataSourceRequest,
  DeleteDataSourceResponse,
  DeleteDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apis/{apiId}/datasources/{name}",
    input: { apiId: 0, name: 0 },
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataSource",
})) as any;

export type DeleteDomainNameError =
  | AccessDeniedException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes a custom `DomainName` object.
 */
export const deleteDomainName: API.OperationMethod<
  DeleteDomainNameRequest,
  DeleteDomainNameResponse,
  DeleteDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/domainnames/{domainName}",
    input: { domainName: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainName",
})) as any;

export type DeleteFunctionError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a `Function`.
 */
export const deleteFunction: API.OperationMethod<
  DeleteFunctionRequest,
  DeleteFunctionResponse,
  DeleteFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apis/{apiId}/functions/{functionId}",
    input: { apiId: 0, functionId: 0 },
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunction",
})) as any;

export type DeleteGraphqlApiError =
  | AccessDeniedException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a `GraphqlApi` object.
 */
export const deleteGraphqlApi: API.OperationMethod<
  DeleteGraphqlApiRequest,
  DeleteGraphqlApiResponse,
  DeleteGraphqlApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apis/{apiId}",
    input: { apiId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGraphqlApi",
})) as any;

export type DeleteResolverError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a `Resolver` object.
 */
export const deleteResolver: API.OperationMethod<
  DeleteResolverRequest,
  DeleteResolverResponse,
  DeleteResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apis/{apiId}/types/{typeName}/resolvers/{fieldName}",
    input: { apiId: 0, typeName: 0, fieldName: 0 },
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResolver",
})) as any;

export type DeleteTypeError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a `Type` object.
 */
export const deleteType: API.OperationMethod<
  DeleteTypeRequest,
  DeleteTypeResponse,
  DeleteTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apis/{apiId}/types/{typeName}",
    input: { apiId: 0, typeName: 0 },
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteType",
})) as any;

export type DisassociateApiError =
  | AccessDeniedException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | CommonErrors;
/**
 * Removes an `ApiAssociation` object from a custom domain.
 */
export const disassociateApi: API.OperationMethod<
  DisassociateApiRequest,
  DisassociateApiResponse,
  DisassociateApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/domainnames/{domainName}/apiassociation",
    input: { domainName: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateApi",
})) as any;

export type DisassociateMergedGraphqlApiError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an association between a Merged API and source API using the source API's
 * identifier and the association ID.
 */
export const disassociateMergedGraphqlApi: API.OperationMethod<
  DisassociateMergedGraphqlApiRequest,
  DisassociateMergedGraphqlApiResponse,
  DisassociateMergedGraphqlApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/sourceApis/{sourceApiIdentifier}/mergedApiAssociations/{associationId}",
    input: { sourceApiIdentifier: 0, associationId: 0 },
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMergedGraphqlApi",
})) as any;

export type DisassociateSourceGraphqlApiError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an association between a Merged API and source API using the Merged API's
 * identifier and the association ID.
 */
export const disassociateSourceGraphqlApi: API.OperationMethod<
  DisassociateSourceGraphqlApiRequest,
  DisassociateSourceGraphqlApiResponse,
  DisassociateSourceGraphqlApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/mergedApis/{mergedApiIdentifier}/sourceApiAssociations/{associationId}",
    input: { mergedApiIdentifier: 0, associationId: 0 },
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSourceGraphqlApi",
})) as any;

export type EvaluateCodeError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | CommonErrors;
/**
 * Evaluates the given code and returns the response. The code definition requirements
 * depend on the specified runtime. For `APPSYNC_JS` runtimes, the code defines the
 * request and response functions. The request function takes the incoming request after a
 * GraphQL operation is parsed and converts it into a request configuration for the selected
 * data source operation. The response function interprets responses from the data source and
 * maps it to the shape of the GraphQL field output type.
 */
export const evaluateCode: API.OperationMethod<
  EvaluateCodeRequest,
  EvaluateCodeResponse,
  EvaluateCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/dataplane-evaluatecode",
    input: { runtime: i_AppSyncRuntime, code: 0, context: 0, function: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EvaluateCode",
})) as any;

export type EvaluateMappingTemplateError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | CommonErrors;
/**
 * Evaluates a given template and returns the response. The mapping template can be a
 * request or response template.
 *
 * Request templates take the incoming request after a GraphQL operation is parsed and
 * convert it into a request configuration for the selected data source operation. Response
 * templates interpret responses from the data source and map it to the shape of the GraphQL
 * field output type.
 *
 * Mapping templates are written in the Apache Velocity Template Language (VTL).
 */
export const evaluateMappingTemplate: API.OperationMethod<
  EvaluateMappingTemplateRequest,
  EvaluateMappingTemplateResponse,
  EvaluateMappingTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/dataplane-evaluatetemplate",
    input: { template: 0, context: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EvaluateMappingTemplate",
})) as any;

export type FlushApiCacheError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Flushes an `ApiCache` object.
 */
export const flushApiCache: API.OperationMethod<
  FlushApiCacheRequest,
  FlushApiCacheResponse,
  FlushApiCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apis/{apiId}/FlushCache",
    input: { apiId: 0 },
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FlushApiCache",
})) as any;

export type GetApiError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves an `Api` object.
 */
export const getApi: API.OperationMethod<
  GetApiRequest,
  GetApiResponse,
  GetApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{apiId}",
    input: { apiId: 0 },
    output: { api: o_Api },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApi",
})) as any;

export type GetApiAssociationError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | CommonErrors;
/**
 * Retrieves an `ApiAssociation` object.
 */
export const getApiAssociation: API.OperationMethod<
  GetApiAssociationRequest,
  GetApiAssociationResponse,
  GetApiAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/domainnames/{domainName}/apiassociation",
    input: { domainName: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApiAssociation",
})) as any;

export type GetApiCacheError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves an `ApiCache` object.
 */
export const getApiCache: API.OperationMethod<
  GetApiCacheRequest,
  GetApiCacheResponse,
  GetApiCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apis/{apiId}/ApiCaches",
    input: { apiId: 0 },
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApiCache",
})) as any;

export type GetChannelNamespaceError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the channel namespace for a specified `Api`.
 */
export const getChannelNamespace: API.OperationMethod<
  GetChannelNamespaceRequest,
  GetChannelNamespaceResponse,
  GetChannelNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{apiId}/channelNamespaces/{name}",
    input: { apiId: 0, name: 0 },
    output: { channelNamespace: o_ChannelNamespace },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChannelNamespace",
})) as any;

export type GetDataSourceError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves a `DataSource` object.
 */
export const getDataSource: API.OperationMethod<
  GetDataSourceRequest,
  GetDataSourceResponse,
  GetDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apis/{apiId}/datasources/{name}",
    input: { apiId: 0, name: 0 },
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSource",
})) as any;

export type GetDataSourceIntrospectionError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | CommonErrors;
/**
 * Retrieves the record of an existing introspection. If the retrieval is successful, the
 * result of the instrospection will also be returned. If the retrieval fails the operation,
 * an error message will be returned instead.
 */
export const getDataSourceIntrospection: API.OperationMethod<
  GetDataSourceIntrospectionRequest,
  GetDataSourceIntrospectionResponse,
  GetDataSourceIntrospectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/datasources/introspections/{introspectionId}",
    input: {
      introspectionId: 0,
      includeModelsSDL: D.m({ query: "includeModelsSDL" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [BadRequestException, InternalFailureException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSourceIntrospection",
})) as any;

export type GetDomainNameError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | CommonErrors;
/**
 * Retrieves a custom `DomainName` object.
 */
export const getDomainName: API.OperationMethod<
  GetDomainNameRequest,
  GetDomainNameResponse,
  GetDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/domainnames/{domainName}",
    input: { domainName: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainName",
})) as any;

export type GetFunctionError =
  | ConcurrentModificationException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Get a `Function`.
 */
export const getFunction: API.OperationMethod<
  GetFunctionRequest,
  GetFunctionResponse,
  GetFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apis/{apiId}/functions/{functionId}",
    input: { apiId: 0, functionId: 0 },
  },
  errors: [
    ConcurrentModificationException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunction",
})) as any;

export type GetGraphqlApiError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves a `GraphqlApi` object.
 */
export const getGraphqlApi: API.OperationMethod<
  GetGraphqlApiRequest,
  GetGraphqlApiResponse,
  GetGraphqlApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apis/{apiId}",
    input: { apiId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGraphqlApi",
})) as any;

export type GetGraphqlApiEnvironmentVariablesError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the list of environmental variable key-value pairs associated with an API by
 * its ID value.
 */
export const getGraphqlApiEnvironmentVariables: API.OperationMethod<
  GetGraphqlApiEnvironmentVariablesRequest,
  GetGraphqlApiEnvironmentVariablesResponse,
  GetGraphqlApiEnvironmentVariablesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apis/{apiId}/environmentVariables",
    input: { apiId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGraphqlApiEnvironmentVariables",
})) as any;

export type GetIntrospectionSchemaError =
  | GraphQLSchemaException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the introspection schema for a GraphQL API.
 */
export const getIntrospectionSchema: API.OperationMethod<
  GetIntrospectionSchemaRequest,
  GetIntrospectionSchemaResponse,
  GetIntrospectionSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apis/{apiId}/schema",
    input: {
      apiId: 0,
      format: D.m({ query: "format" }),
      includeDirectives: D.m({ query: "includeDirectives" }),
    },
    output: { schema: D.m({ payload: true, shape: D.stream }) },
  },
  errors: [
    GraphQLSchemaException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntrospectionSchema",
})) as any;

export type GetResolverError =
  | ConcurrentModificationException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves a `Resolver` object.
 */
export const getResolver: API.OperationMethod<
  GetResolverRequest,
  GetResolverResponse,
  GetResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apis/{apiId}/types/{typeName}/resolvers/{fieldName}",
    input: { apiId: 0, typeName: 0, fieldName: 0 },
  },
  errors: [
    ConcurrentModificationException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResolver",
})) as any;

export type GetSchemaCreationStatusError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the current status of a schema creation operation.
 */
export const getSchemaCreationStatus: API.OperationMethod<
  GetSchemaCreationStatusRequest,
  GetSchemaCreationStatusResponse,
  GetSchemaCreationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apis/{apiId}/schemacreation",
    input: { apiId: 0 },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchemaCreationStatus",
})) as any;

export type GetSourceApiAssociationError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves a `SourceApiAssociation` object.
 */
export const getSourceApiAssociation: API.OperationMethod<
  GetSourceApiAssociationRequest,
  GetSourceApiAssociationResponse,
  GetSourceApiAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/mergedApis/{mergedApiIdentifier}/sourceApiAssociations/{associationId}",
    input: { mergedApiIdentifier: 0, associationId: 0 },
    output: { sourceApiAssociation: o_SourceApiAssociation },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSourceApiAssociation",
})) as any;

export type GetTypeError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves a `Type` object.
 */
export const getType: API.OperationMethod<
  GetTypeRequest,
  GetTypeResponse,
  GetTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apis/{apiId}/types/{typeName}",
    input: { apiId: 0, typeName: 0, format: D.m({ query: "format" }) },
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetType",
})) as any;

export type ListApiKeysError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the API keys for a given API.
 *
 * API keys are deleted automatically 60 days after they expire. However, they may still
 * be included in the response until they have actually been deleted. You can safely call
 * `DeleteApiKey` to manually delete a key before it's automatically
 * deleted.
 */
export const listApiKeys: API.PaginatedOperationMethod<
  ListApiKeysRequest,
  ListApiKeysResponse,
  ListApiKeysError,
  Credentials | HttpClient.HttpClient,
  ApiKey
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apis/{apiId}/apikeys",
    input: {
      apiId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApiKeys",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "apiKeys",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListApisError =
  | BadRequestException
  | InternalFailureException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the APIs in your AppSync account.
 *
 * `ListApis` returns only the high level API details. For more detailed
 * information about an API, use `GetApi`.
 */
export const listApis: API.PaginatedOperationMethod<
  ListApisRequest,
  ListApisResponse,
  ListApisError,
  Credentials | HttpClient.HttpClient,
  Api
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/apis",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { apis: D.list(o_Api) },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApis",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "apis",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListChannelNamespacesError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the channel namespaces for a specified `Api`.
 *
 * `ListChannelNamespaces` returns only high level details for the channel
 * namespace. To retrieve code handlers, use `GetChannelNamespace`.
 */
export const listChannelNamespaces: API.PaginatedOperationMethod<
  ListChannelNamespacesRequest,
  ListChannelNamespacesResponse,
  ListChannelNamespacesError,
  Credentials | HttpClient.HttpClient,
  ChannelNamespace
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{apiId}/channelNamespaces",
    input: {
      apiId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { channelNamespaces: D.list(o_ChannelNamespace) },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChannelNamespaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "channelNamespaces",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataSourcesError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the data sources for a given API.
 */
export const listDataSources: API.PaginatedOperationMethod<
  ListDataSourcesRequest,
  ListDataSourcesResponse,
  ListDataSourcesError,
  Credentials | HttpClient.HttpClient,
  DataSource
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apis/{apiId}/datasources",
    input: {
      apiId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataSources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDomainNamesError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | CommonErrors;
/**
 * Lists multiple custom domain names.
 */
export const listDomainNames: API.PaginatedOperationMethod<
  ListDomainNamesRequest,
  ListDomainNamesResponse,
  ListDomainNamesError,
  Credentials | HttpClient.HttpClient,
  DomainNameConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/domainnames",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainNames",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "domainNameConfigs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFunctionsError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * List multiple functions.
 */
export const listFunctions: API.PaginatedOperationMethod<
  ListFunctionsRequest,
  ListFunctionsResponse,
  ListFunctionsError,
  Credentials | HttpClient.HttpClient,
  FunctionConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apis/{apiId}/functions",
    input: {
      apiId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "functions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGraphqlApisError =
  | BadRequestException
  | InternalFailureException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists your GraphQL APIs.
 */
export const listGraphqlApis: API.PaginatedOperationMethod<
  ListGraphqlApisRequest,
  ListGraphqlApisResponse,
  ListGraphqlApisError,
  Credentials | HttpClient.HttpClient,
  GraphqlApi
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apis",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      apiType: D.m({ query: "apiType" }),
      owner: D.m({ query: "owner" }),
    },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGraphqlApis",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "graphqlApis",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResolversError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the resolvers for a given API and type.
 */
export const listResolvers: API.PaginatedOperationMethod<
  ListResolversRequest,
  ListResolversResponse,
  ListResolversError,
  Credentials | HttpClient.HttpClient,
  Resolver
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apis/{apiId}/types/{typeName}/resolvers",
    input: {
      apiId: 0,
      typeName: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResolvers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resolvers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResolversByFunctionError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * List the resolvers that are associated with a specific function.
 */
export const listResolversByFunction: API.PaginatedOperationMethod<
  ListResolversByFunctionRequest,
  ListResolversByFunctionResponse,
  ListResolversByFunctionError,
  Credentials | HttpClient.HttpClient,
  Resolver
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apis/{apiId}/functions/{functionId}/resolvers",
    input: {
      apiId: 0,
      functionId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResolversByFunction",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resolvers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSourceApiAssociationsError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the `SourceApiAssociationSummary` data.
 */
export const listSourceApiAssociations: API.PaginatedOperationMethod<
  ListSourceApiAssociationsRequest,
  ListSourceApiAssociationsResponse,
  ListSourceApiAssociationsError,
  Credentials | HttpClient.HttpClient,
  SourceApiAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apis/{apiId}/sourceApiAssociations",
    input: {
      apiId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceApiAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sourceApiAssociationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the tags for a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTypesError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the types for a given API.
 */
export const listTypes: API.PaginatedOperationMethod<
  ListTypesRequest,
  ListTypesResponse,
  ListTypesError,
  Credentials | HttpClient.HttpClient,
  Type
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apis/{apiId}/types",
    input: {
      apiId: 0,
      format: D.m({ query: "format" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "types",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTypesByAssociationError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists `Type` objects by the source API association ID.
 */
export const listTypesByAssociation: API.PaginatedOperationMethod<
  ListTypesByAssociationRequest,
  ListTypesByAssociationResponse,
  ListTypesByAssociationError,
  Credentials | HttpClient.HttpClient,
  Type
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/mergedApis/{mergedApiIdentifier}/sourceApiAssociations/{associationId}/types",
    input: {
      mergedApiIdentifier: 0,
      associationId: 0,
      format: D.m({ query: "format" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTypesByAssociation",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "types",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutGraphqlApiEnvironmentVariablesError =
  | AccessDeniedException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a list of environmental variables in an API by its ID value.
 *
 * When creating an environmental variable, it must follow the constraints below:
 *
 * - Both JavaScript and VTL templates support environmental variables.
 *
 * - Environmental variables are not evaluated before function invocation.
 *
 * - Environmental variables only support string values.
 *
 * - Any defined value in an environmental variable is considered a string literal
 * and not expanded.
 *
 * - Variable evaluations should ideally be performed in the function
 * code.
 *
 * When creating an environmental variable key-value pair, it must follow the additional
 * constraints below:
 *
 * - Keys must begin with a letter.
 *
 * - Keys must be at least two characters long.
 *
 * - Keys can only contain letters, numbers, and the underscore character
 * (_).
 *
 * - Values can be up to 512 characters long.
 *
 * - You can configure up to 50 key-value pairs in a GraphQL API.
 *
 * You can create a list of environmental variables by adding it to the
 * `environmentVariables` payload as a list in the format
 * `{"key1":"value1","key2":"value2", …}`. Note that each call of the
 * `PutGraphqlApiEnvironmentVariables` action will result in the overwriting of
 * the existing environmental variable list of that API. This means the existing environmental
 * variables will be lost. To avoid this, you must include all existing and new environmental
 * variables in the list each time you call this action.
 */
export const putGraphqlApiEnvironmentVariables: API.OperationMethod<
  PutGraphqlApiEnvironmentVariablesRequest,
  PutGraphqlApiEnvironmentVariablesResponse,
  PutGraphqlApiEnvironmentVariablesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/apis/{apiId}/environmentVariables",
    input: { apiId: 0, environmentVariables: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutGraphqlApiEnvironmentVariables",
})) as any;

export type StartDataSourceIntrospectionError =
  | BadRequestException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new introspection. Returns the `introspectionId` of the new
 * introspection after its creation.
 */
export const startDataSourceIntrospection: API.OperationMethod<
  StartDataSourceIntrospectionRequest,
  StartDataSourceIntrospectionResponse,
  StartDataSourceIntrospectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/datasources/introspections",
    input: {
      rdsDataApiConfig: { resourceArn: 0, secretArn: 0, databaseName: 0 },
    },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDataSourceIntrospection",
})) as any;

export type StartSchemaCreationError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds a new schema to your GraphQL API.
 *
 * This operation is asynchronous. Use to
 * determine when it has completed.
 */
export const startSchemaCreation: API.OperationMethod<
  StartSchemaCreationRequest,
  StartSchemaCreationResponse,
  StartSchemaCreationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apis/{apiId}/schemacreation",
    input: { apiId: 0, definition: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSchemaCreation",
})) as any;

export type StartSchemaMergeError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Initiates a merge operation. Returns a status that shows the result of the merge
 * operation.
 */
export const startSchemaMerge: API.OperationMethod<
  StartSchemaMergeRequest,
  StartSchemaMergeResponse,
  StartSchemaMergeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/mergedApis/{mergedApiIdentifier}/sourceApiAssociations/{associationId}/merge",
    input: { associationId: 0, mergedApiIdentifier: 0 },
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSchemaMerge",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Tags a resource with user-supplied tags.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Untags a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateApiError =
  | AccessDeniedException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an `Api`.
 */
export const updateApi: API.OperationMethod<
  UpdateApiRequest,
  UpdateApiResponse,
  UpdateApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/apis/{apiId}",
    input: { apiId: 0, name: 0, ownerContact: 0, eventConfig: i_EventConfig },
    output: { api: o_Api },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApi",
})) as any;

export type UpdateApiCacheError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the cache for the GraphQL API.
 */
export const updateApiCache: API.OperationMethod<
  UpdateApiCacheRequest,
  UpdateApiCacheResponse,
  UpdateApiCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apis/{apiId}/ApiCaches/update",
    input: {
      apiId: 0,
      ttl: 0,
      apiCachingBehavior: 0,
      type: 0,
      healthMetricsConfig: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApiCache",
})) as any;

export type UpdateApiKeyError =
  | ApiKeyValidityOutOfBoundsException
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an API key. You can update the key as long as it's not deleted.
 */
export const updateApiKey: API.OperationMethod<
  UpdateApiKeyRequest,
  UpdateApiKeyResponse,
  UpdateApiKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apis/{apiId}/apikeys/{id}",
    input: { apiId: 0, id: 0, description: 0, expires: 0 },
    body: true,
  },
  errors: [
    ApiKeyValidityOutOfBoundsException,
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApiKey",
})) as any;

export type UpdateChannelNamespaceError =
  | AccessDeniedException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a `ChannelNamespace` associated with an `Api`.
 */
export const updateChannelNamespace: API.OperationMethod<
  UpdateChannelNamespaceRequest,
  UpdateChannelNamespaceResponse,
  UpdateChannelNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/apis/{apiId}/channelNamespaces/{name}",
    input: {
      apiId: 0,
      name: 0,
      subscribeAuthModes: D.list(i_AuthMode),
      publishAuthModes: D.list(i_AuthMode),
      codeHandlers: 0,
      handlerConfigs: i_HandlerConfigs,
    },
    output: { channelNamespace: o_ChannelNamespace },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannelNamespace",
})) as any;

export type UpdateDataSourceError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a `DataSource` object.
 */
export const updateDataSource: API.OperationMethod<
  UpdateDataSourceRequest,
  UpdateDataSourceResponse,
  UpdateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apis/{apiId}/datasources/{name}",
    input: {
      apiId: 0,
      name: 0,
      description: 0,
      type: 0,
      serviceRoleArn: 0,
      dynamodbConfig: i_DynamodbDataSourceConfig,
      lambdaConfig: i_LambdaDataSourceConfig,
      elasticsearchConfig: i_ElasticsearchDataSourceConfig,
      openSearchServiceConfig: i_OpenSearchServiceDataSourceConfig,
      httpConfig: i_HttpDataSourceConfig,
      relationalDatabaseConfig: i_RelationalDatabaseDataSourceConfig,
      eventBridgeConfig: i_EventBridgeDataSourceConfig,
      metricsConfig: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataSource",
})) as any;

export type UpdateDomainNameError =
  | AccessDeniedException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | CommonErrors;
/**
 * Updates a custom `DomainName` object.
 */
export const updateDomainName: API.OperationMethod<
  UpdateDomainNameRequest,
  UpdateDomainNameResponse,
  UpdateDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/domainnames/{domainName}",
    input: { domainName: 0, description: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainName",
})) as any;

export type UpdateFunctionError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a `Function` object.
 */
export const updateFunction: API.OperationMethod<
  UpdateFunctionRequest,
  UpdateFunctionResponse,
  UpdateFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apis/{apiId}/functions/{functionId}",
    input: {
      apiId: 0,
      name: 0,
      description: 0,
      functionId: 0,
      dataSourceName: 0,
      requestMappingTemplate: 0,
      responseMappingTemplate: 0,
      functionVersion: 0,
      syncConfig: i_SyncConfig,
      maxBatchSize: 0,
      runtime: i_AppSyncRuntime,
      code: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFunction",
})) as any;

export type UpdateGraphqlApiError =
  | AccessDeniedException
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a `GraphqlApi` object.
 */
export const updateGraphqlApi: API.OperationMethod<
  UpdateGraphqlApiRequest,
  UpdateGraphqlApiResponse,
  UpdateGraphqlApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apis/{apiId}",
    input: {
      apiId: 0,
      name: 0,
      logConfig: i_LogConfig,
      authenticationType: 0,
      userPoolConfig: i_UserPoolConfig,
      openIDConnectConfig: i_OpenIDConnectConfig,
      additionalAuthenticationProviders: D.list(
        i_AdditionalAuthenticationProvider,
      ),
      xrayEnabled: 0,
      lambdaAuthorizerConfig: i_LambdaAuthorizerConfig,
      mergedApiExecutionRoleArn: 0,
      ownerContact: 0,
      introspectionConfig: 0,
      queryDepthLimit: 0,
      resolverCountLimit: 0,
      enhancedMetricsConfig: i_EnhancedMetricsConfig,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGraphqlApi",
})) as any;

export type UpdateResolverError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a `Resolver` object.
 */
export const updateResolver: API.OperationMethod<
  UpdateResolverRequest,
  UpdateResolverResponse,
  UpdateResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apis/{apiId}/types/{typeName}/resolvers/{fieldName}",
    input: {
      apiId: 0,
      typeName: 0,
      fieldName: 0,
      dataSourceName: 0,
      requestMappingTemplate: 0,
      responseMappingTemplate: 0,
      kind: 0,
      pipelineConfig: i_PipelineConfig,
      syncConfig: i_SyncConfig,
      cachingConfig: i_CachingConfig,
      maxBatchSize: 0,
      runtime: i_AppSyncRuntime,
      code: 0,
      metricsConfig: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResolver",
})) as any;

export type UpdateSourceApiAssociationError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates some of the configuration choices of a particular source API association.
 */
export const updateSourceApiAssociation: API.OperationMethod<
  UpdateSourceApiAssociationRequest,
  UpdateSourceApiAssociationResponse,
  UpdateSourceApiAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/mergedApis/{mergedApiIdentifier}/sourceApiAssociations/{associationId}",
    input: {
      associationId: 0,
      mergedApiIdentifier: 0,
      description: 0,
      sourceApiAssociationConfig: i_SourceApiAssociationConfig,
    },
    output: { sourceApiAssociation: o_SourceApiAssociation },
    body: true,
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSourceApiAssociation",
})) as any;

export type UpdateTypeError =
  | BadRequestException
  | ConcurrentModificationException
  | InternalFailureException
  | NotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a `Type` object.
 */
export const updateType: API.OperationMethod<
  UpdateTypeRequest,
  UpdateTypeResponse,
  UpdateTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apis/{apiId}/types/{typeName}",
    input: { apiId: 0, typeName: 0, definition: 0, format: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    InternalFailureException,
    NotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateType",
})) as any;

const i_AdditionalAuthenticationProvider: D.LazyStruct = () => ({
  authenticationType: 0,
  openIDConnectConfig: i_OpenIDConnectConfig,
  userPoolConfig: { userPoolId: 0, awsRegion: 0, appIdClientRegex: 0 },
  lambdaAuthorizerConfig: i_LambdaAuthorizerConfig,
});
const i_AppSyncRuntime: D.LazyStruct = () => ({ name: 0, runtimeVersion: 0 });
const i_AuthMode: D.LazyStruct = () => ({ authType: 0 });
const i_CachingConfig: D.LazyStruct = () => ({ ttl: 0, cachingKeys: 0 });
const i_DynamodbDataSourceConfig: D.LazyStruct = () => ({
  tableName: 0,
  awsRegion: 0,
  useCallerCredentials: 0,
  deltaSyncConfig: {
    baseTableTTL: 0,
    deltaSyncTableName: 0,
    deltaSyncTableTTL: 0,
  },
  versioned: 0,
});
const i_ElasticsearchDataSourceConfig: D.LazyStruct = () => ({
  endpoint: 0,
  awsRegion: 0,
});
const i_EnhancedMetricsConfig: D.LazyStruct = () => ({
  resolverLevelMetricsBehavior: 0,
  dataSourceLevelMetricsBehavior: 0,
  operationLevelMetricsConfig: 0,
});
const i_EventBridgeDataSourceConfig: D.LazyStruct = () => ({ eventBusArn: 0 });
const i_EventConfig: D.LazyStruct = () => ({
  authProviders: D.list({
    authType: 0,
    cognitoConfig: { userPoolId: 0, awsRegion: 0, appIdClientRegex: 0 },
    openIDConnectConfig: i_OpenIDConnectConfig,
    lambdaAuthorizerConfig: i_LambdaAuthorizerConfig,
  }),
  connectionAuthModes: D.list(i_AuthMode),
  defaultPublishAuthModes: D.list(i_AuthMode),
  defaultSubscribeAuthModes: D.list(i_AuthMode),
  logConfig: { logLevel: 0, cloudWatchLogsRoleArn: 0 },
});
const i_HandlerConfigs: D.LazyStruct = () => ({
  onPublish: i_HandlerConfig,
  onSubscribe: i_HandlerConfig,
});
const i_HttpDataSourceConfig: D.LazyStruct = () => ({
  endpoint: 0,
  authorizationConfig: {
    authorizationType: 0,
    awsIamConfig: { signingRegion: 0, signingServiceName: 0 },
  },
});
const i_LambdaAuthorizerConfig: D.LazyStruct = () => ({
  authorizerResultTtlInSeconds: 0,
  authorizerUri: 0,
  identityValidationExpression: 0,
});
const i_LambdaDataSourceConfig: D.LazyStruct = () => ({ lambdaFunctionArn: 0 });
const i_LogConfig: D.LazyStruct = () => ({
  fieldLogLevel: 0,
  cloudWatchLogsRoleArn: 0,
  excludeVerboseContent: 0,
});
const i_OpenIDConnectConfig: D.LazyStruct = () => ({
  issuer: 0,
  clientId: 0,
  iatTTL: 0,
  authTTL: 0,
});
const i_OpenSearchServiceDataSourceConfig: D.LazyStruct = () => ({
  endpoint: 0,
  awsRegion: 0,
});
const i_PipelineConfig: D.LazyStruct = () => ({ functions: 0 });
const i_RelationalDatabaseDataSourceConfig: D.LazyStruct = () => ({
  relationalDatabaseSourceType: 0,
  rdsHttpEndpointConfig: {
    awsRegion: 0,
    dbClusterIdentifier: 0,
    databaseName: 0,
    schema: 0,
    awsSecretStoreArn: 0,
  },
});
const i_SourceApiAssociationConfig: D.LazyStruct = () => ({ mergeType: 0 });
const i_SyncConfig: D.LazyStruct = () => ({
  conflictHandler: 0,
  conflictDetection: 0,
  lambdaConflictHandlerConfig: { lambdaConflictHandlerArn: 0 },
});
const i_UserPoolConfig: D.LazyStruct = () => ({
  userPoolId: 0,
  awsRegion: 0,
  defaultAction: 0,
  appIdClientRegex: 0,
});
const o_Api: D.LazyStruct = () => ({ created: D.ts });
const o_ChannelNamespace: D.LazyStruct = () => ({
  created: D.ts,
  lastModified: D.ts,
});
const o_SourceApiAssociation: D.LazyStruct = () => ({
  lastSuccessfulMergeDate: D.ts,
});
const i_HandlerConfig: D.LazyStruct = () => ({
  behavior: 0,
  integration: { dataSourceName: 0, lambdaConfig: { invokeType: 0 } },
});
