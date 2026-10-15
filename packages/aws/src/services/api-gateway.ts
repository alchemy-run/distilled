import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "API Gateway",
  serviceShapeName: "BackplaneControlService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "apigateway" });
const ver = /*@__PURE__*/ T.ServiceVersion("2015-07-09");
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
              `https://apigateway-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://apigateway-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://apigateway.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://apigateway.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://apigateway.{R}.{D}","properties":{},"headers":{}}');

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    {
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    {
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export interface StageKey {
  restApiId?: string;
  stageName?: string;
}
export type ListOfStageKeys = StageKey[];
export type MapOfStringToString = { [key: string]: string | undefined };
export interface CreateApiKeyRequest {
  name?: string;
  description?: string;
  enabled?: boolean;
  generateDistinctId?: boolean;
  value?: string | redacted.Redacted<string>;
  stageKeys?: StageKey[];
  customerId?: string;
  tags?: { [key: string]: string | undefined };
}
export type ListOfString = string[];
export interface ApiKey {
  id?: string;
  value?: string | redacted.Redacted<string>;
  name?: string;
  customerId?: string;
  description?: string;
  enabled?: boolean;
  createdDate?: Date;
  lastUpdatedDate?: Date;
  stageKeys?: string[];
  tags?: { [key: string]: string | undefined };
}
export type AuthorizerType = "TOKEN" | "REQUEST" | "COGNITO_USER_POOLS" | (string & {});
export type ProviderARN = string;
export type ListOfARNs = string[];
export interface CreateAuthorizerRequest {
  restApiId: string;
  name: string;
  type: AuthorizerType;
  providerARNs?: string[];
  authType?: string;
  authorizerUri?: string;
  authorizerCredentials?: string;
  identitySource?: string;
  identityValidationExpression?: string;
  authorizerResultTtlInSeconds?: number;
}
export interface Authorizer {
  id?: string;
  name?: string;
  type?: AuthorizerType;
  providerARNs?: string[];
  authType?: string;
  authorizerUri?: string;
  authorizerCredentials?: string;
  identitySource?: string;
  identityValidationExpression?: string;
  authorizerResultTtlInSeconds?: number;
}
export interface CreateBasePathMappingRequest {
  domainName: string;
  domainNameId?: string;
  basePath?: string;
  restApiId: string;
  stage?: string;
}
export interface BasePathMapping {
  basePath?: string;
  restApiId?: string;
  stage?: string;
}
export type CacheClusterSize =
  | "0.5"
  | "1.6"
  | "6.1"
  | "13.5"
  | "28.4"
  | "58.2"
  | "118"
  | "237"
  | (string & {});
export interface DeploymentCanarySettings {
  percentTraffic?: number;
  stageVariableOverrides?: { [key: string]: string | undefined };
  useStageCache?: boolean;
}
export interface CreateDeploymentRequest {
  restApiId: string;
  stageName?: string;
  stageDescription?: string;
  description?: string;
  cacheClusterEnabled?: boolean;
  cacheClusterSize?: CacheClusterSize;
  variables?: { [key: string]: string | undefined };
  canarySettings?: DeploymentCanarySettings;
  tracingEnabled?: boolean;
}
export interface MethodSnapshot {
  authorizationType?: string;
  apiKeyRequired?: boolean;
}
export type MapOfMethodSnapshot = { [key: string]: MethodSnapshot | undefined };
export type PathToMapOfMethodSnapshot = {
  [key: string]: { [key: string]: MethodSnapshot | undefined } | undefined;
};
export interface Deployment {
  id?: string;
  description?: string;
  createdDate?: Date;
  apiSummary?: { [key: string]: { [key: string]: MethodSnapshot | undefined } | undefined };
}
export type DocumentationPartType =
  | "API"
  | "AUTHORIZER"
  | "MODEL"
  | "RESOURCE"
  | "METHOD"
  | "PATH_PARAMETER"
  | "QUERY_PARAMETER"
  | "REQUEST_HEADER"
  | "REQUEST_BODY"
  | "RESPONSE"
  | "RESPONSE_HEADER"
  | "RESPONSE_BODY"
  | (string & {});
export type DocumentationPartLocationStatusCode = string;
export interface DocumentationPartLocation {
  type: DocumentationPartType;
  path?: string;
  method?: string;
  statusCode?: string;
  name?: string;
}
export interface CreateDocumentationPartRequest {
  restApiId: string;
  location: DocumentationPartLocation;
  properties: string;
}
export interface DocumentationPart {
  id?: string;
  location?: DocumentationPartLocation;
  properties?: string;
}
export interface CreateDocumentationVersionRequest {
  restApiId: string;
  documentationVersion: string;
  stageName?: string;
  description?: string;
}
export interface DocumentationVersion {
  version?: string;
  createdDate?: Date;
  description?: string;
}
export type EndpointType = "REGIONAL" | "EDGE" | "PRIVATE" | (string & {});
export type ListOfEndpointType = EndpointType[];
export type IpAddressType = "ipv4" | "dualstack" | (string & {});
export interface EndpointConfiguration {
  types?: EndpointType[];
  ipAddressType?: IpAddressType;
  vpcEndpointIds?: string[];
}
export type SecurityPolicy =
  | "TLS_1_0"
  | "TLS_1_2"
  | "SecurityPolicy_TLS13_1_3_2025_09"
  | "SecurityPolicy_TLS13_1_3_FIPS_2025_09"
  | "SecurityPolicy_TLS13_1_2_PFS_PQ_2025_09"
  | "SecurityPolicy_TLS13_1_2_FIPS_PQ_2025_09"
  | "SecurityPolicy_TLS13_1_2_FIPS_PFS_PQ_2025_09"
  | "SecurityPolicy_TLS13_1_2_Ext2_PQ_2025_09"
  | "SecurityPolicy_TLS13_1_2_Ext2_FIPS_PQ_2025_09"
  | "SecurityPolicy_TLS13_1_2_PQ_2025_09"
  | "SecurityPolicy_TLS13_1_2_2021_06"
  | "SecurityPolicy_TLS13_2025_EDGE"
  | "SecurityPolicy_TLS12_PFS_2025_EDGE"
  | "SecurityPolicy_TLS12_2018_EDGE"
  | (string & {});
export type EndpointAccessMode = "BASIC" | "STRICT" | (string & {});
export interface MutualTlsAuthenticationInput {
  truststoreUri?: string;
  truststoreVersion?: string;
}
export type RoutingMode =
  | "BASE_PATH_MAPPING_ONLY"
  | "ROUTING_RULE_ONLY"
  | "ROUTING_RULE_THEN_BASE_PATH_MAPPING"
  | (string & {});
export interface CreateDomainNameRequest {
  domainName: string;
  certificateName?: string;
  certificateBody?: string;
  certificatePrivateKey?: string;
  certificateChain?: string;
  certificateArn?: string;
  regionalCertificateName?: string;
  regionalCertificateArn?: string;
  endpointConfiguration?: EndpointConfiguration;
  tags?: { [key: string]: string | undefined };
  securityPolicy?: SecurityPolicy;
  endpointAccessMode?: EndpointAccessMode;
  mutualTlsAuthentication?: MutualTlsAuthenticationInput;
  ownershipVerificationCertificateArn?: string;
  policy?: string;
  routingMode?: RoutingMode;
}
export type DomainNameStatus =
  | "AVAILABLE"
  | "UPDATING"
  | "PENDING"
  | "PENDING_CERTIFICATE_REIMPORT"
  | "PENDING_OWNERSHIP_VERIFICATION"
  | "FAILED"
  | (string & {});
export interface MutualTlsAuthentication {
  truststoreUri?: string;
  truststoreVersion?: string;
  truststoreWarnings?: string[];
}
export interface DomainName {
  domainName?: string;
  domainNameId?: string;
  domainNameArn?: string;
  certificateName?: string;
  certificateArn?: string;
  certificateUploadDate?: Date;
  regionalDomainName?: string;
  regionalHostedZoneId?: string;
  regionalCertificateName?: string;
  regionalCertificateArn?: string;
  distributionDomainName?: string;
  distributionHostedZoneId?: string;
  endpointConfiguration?: EndpointConfiguration;
  domainNameStatus?: DomainNameStatus;
  domainNameStatusMessage?: string;
  securityPolicy?: SecurityPolicy;
  endpointAccessMode?: EndpointAccessMode;
  tags?: { [key: string]: string | undefined };
  mutualTlsAuthentication?: MutualTlsAuthentication;
  ownershipVerificationCertificateArn?: string;
  managementPolicy?: string;
  policy?: string;
  routingMode?: RoutingMode;
}
export type AccessAssociationSourceType = "VPCE" | (string & {});
export interface CreateDomainNameAccessAssociationRequest {
  domainNameArn: string;
  accessAssociationSourceType: AccessAssociationSourceType;
  accessAssociationSource: string;
  tags?: { [key: string]: string | undefined };
}
export interface DomainNameAccessAssociation {
  domainNameAccessAssociationArn?: string;
  domainNameArn?: string;
  accessAssociationSourceType?: AccessAssociationSourceType;
  accessAssociationSource?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateModelRequest {
  restApiId: string;
  name: string;
  description?: string;
  schema?: string;
  contentType: string;
}
export interface Model {
  id?: string;
  name?: string;
  description?: string;
  schema?: string;
  contentType?: string;
}
export interface CreateRequestValidatorRequest {
  restApiId: string;
  name?: string;
  validateRequestBody?: boolean;
  validateRequestParameters?: boolean;
}
export interface RequestValidator {
  id?: string;
  name?: string;
  validateRequestBody?: boolean;
  validateRequestParameters?: boolean;
}
export interface CreateResourceRequest {
  restApiId: string;
  parentId: string;
  pathPart: string;
}
export type MapOfStringToBoolean = { [key: string]: boolean | undefined };
export type StatusCode = string;
export interface MethodResponse {
  statusCode?: string;
  responseParameters?: { [key: string]: boolean | undefined };
  responseModels?: { [key: string]: string | undefined };
}
export type MapOfMethodResponse = { [key: string]: MethodResponse | undefined };
export type IntegrationType = "HTTP" | "AWS" | "MOCK" | "HTTP_PROXY" | "AWS_PROXY" | (string & {});
export type ConnectionType = "INTERNET" | "VPC_LINK" | (string & {});
export type ContentHandlingStrategy = "CONVERT_TO_BINARY" | "CONVERT_TO_TEXT" | (string & {});
export interface IntegrationResponse {
  statusCode?: string;
  selectionPattern?: string;
  responseParameters?: { [key: string]: string | undefined };
  responseTemplates?: { [key: string]: string | undefined };
  contentHandling?: ContentHandlingStrategy;
}
export type MapOfIntegrationResponse = { [key: string]: IntegrationResponse | undefined };
export interface TlsConfig {
  insecureSkipVerification?: boolean;
}
export type ResponseTransferMode = "BUFFERED" | "STREAM" | (string & {});
export interface Integration {
  type?: IntegrationType;
  httpMethod?: string;
  uri?: string;
  connectionType?: ConnectionType;
  connectionId?: string;
  credentials?: string;
  requestParameters?: { [key: string]: string | undefined };
  requestTemplates?: { [key: string]: string | undefined };
  passthroughBehavior?: string;
  contentHandling?: ContentHandlingStrategy;
  timeoutInMillis?: number;
  cacheNamespace?: string;
  cacheKeyParameters?: string[];
  integrationResponses?: { [key: string]: IntegrationResponse | undefined };
  tlsConfig?: TlsConfig;
  responseTransferMode?: ResponseTransferMode;
  integrationTarget?: string;
}
export interface Method {
  httpMethod?: string;
  authorizationType?: string;
  authorizerId?: string;
  apiKeyRequired?: boolean;
  requestValidatorId?: string;
  operationName?: string;
  requestParameters?: { [key: string]: boolean | undefined };
  requestModels?: { [key: string]: string | undefined };
  methodResponses?: { [key: string]: MethodResponse | undefined };
  methodIntegration?: Integration;
  authorizationScopes?: string[];
}
export type MapOfMethod = { [key: string]: Method | undefined };
export interface Resource {
  id?: string;
  parentId?: string;
  pathPart?: string;
  path?: string;
  resourceMethods?: { [key: string]: Method | undefined };
}
export type ApiKeySourceType = "HEADER" | "AUTHORIZER" | (string & {});
export interface CreateRestApiRequest {
  name: string;
  description?: string;
  version?: string;
  cloneFrom?: string;
  binaryMediaTypes?: string[];
  minimumCompressionSize?: number;
  apiKeySource?: ApiKeySourceType;
  endpointConfiguration?: EndpointConfiguration;
  policy?: string;
  tags?: { [key: string]: string | undefined };
  disableExecuteApiEndpoint?: boolean;
  securityPolicy?: SecurityPolicy;
  endpointAccessMode?: EndpointAccessMode;
}
export type ApiStatus = "UPDATING" | "AVAILABLE" | "PENDING" | "FAILED" | (string & {});
export interface RestApi {
  id?: string;
  name?: string;
  description?: string;
  createdDate?: Date;
  version?: string;
  warnings?: string[];
  binaryMediaTypes?: string[];
  minimumCompressionSize?: number;
  apiKeySource?: ApiKeySourceType;
  endpointConfiguration?: EndpointConfiguration;
  policy?: string;
  tags?: { [key: string]: string | undefined };
  disableExecuteApiEndpoint?: boolean;
  rootResourceId?: string;
  securityPolicy?: SecurityPolicy;
  endpointAccessMode?: EndpointAccessMode;
  apiStatus?: ApiStatus;
  apiStatusMessage?: string;
}
export interface CanarySettings {
  percentTraffic?: number;
  deploymentId?: string;
  stageVariableOverrides?: { [key: string]: string | undefined };
  useStageCache?: boolean;
}
export interface CreateStageRequest {
  restApiId: string;
  stageName: string;
  deploymentId: string;
  description?: string;
  cacheClusterEnabled?: boolean;
  cacheClusterSize?: CacheClusterSize;
  variables?: { [key: string]: string | undefined };
  documentationVersion?: string;
  canarySettings?: CanarySettings;
  tracingEnabled?: boolean;
  tags?: { [key: string]: string | undefined };
}
export type CacheClusterStatus =
  | "CREATE_IN_PROGRESS"
  | "AVAILABLE"
  | "DELETE_IN_PROGRESS"
  | "NOT_AVAILABLE"
  | "FLUSH_IN_PROGRESS"
  | (string & {});
export type UnauthorizedCacheControlHeaderStrategy =
  | "FAIL_WITH_403"
  | "SUCCEED_WITH_RESPONSE_HEADER"
  | "SUCCEED_WITHOUT_RESPONSE_HEADER"
  | (string & {});
export interface MethodSetting {
  metricsEnabled?: boolean;
  loggingLevel?: string;
  dataTraceEnabled?: boolean;
  throttlingBurstLimit?: number;
  throttlingRateLimit?: number;
  cachingEnabled?: boolean;
  cacheTtlInSeconds?: number;
  cacheDataEncrypted?: boolean;
  requireAuthorizationForCacheControl?: boolean;
  unauthorizedCacheControlHeaderStrategy?: UnauthorizedCacheControlHeaderStrategy;
}
export type MapOfMethodSettings = { [key: string]: MethodSetting | undefined };
export interface AccessLogSettings {
  format?: string;
  destinationArn?: string;
}
export interface Stage {
  deploymentId?: string;
  clientCertificateId?: string;
  stageName?: string;
  description?: string;
  cacheClusterEnabled?: boolean;
  cacheClusterSize?: CacheClusterSize;
  cacheClusterStatus?: CacheClusterStatus;
  methodSettings?: { [key: string]: MethodSetting | undefined };
  variables?: { [key: string]: string | undefined };
  documentationVersion?: string;
  accessLogSettings?: AccessLogSettings;
  canarySettings?: CanarySettings;
  tracingEnabled?: boolean;
  webAclArn?: string;
  tags?: { [key: string]: string | undefined };
  createdDate?: Date;
  lastUpdatedDate?: Date;
}
export interface ThrottleSettings {
  burstLimit?: number;
  rateLimit?: number;
}
export type MapOfApiStageThrottleSettings = { [key: string]: ThrottleSettings | undefined };
export interface ApiStage {
  apiId?: string;
  stage?: string;
  throttle?: { [key: string]: ThrottleSettings | undefined };
}
export type ListOfApiStage = ApiStage[];
export type QuotaPeriodType = "DAY" | "WEEK" | "MONTH" | (string & {});
export interface QuotaSettings {
  limit?: number;
  offset?: number;
  period?: QuotaPeriodType;
}
export interface CreateUsagePlanRequest {
  name: string;
  description?: string;
  apiStages?: ApiStage[];
  throttle?: ThrottleSettings;
  quota?: QuotaSettings;
  tags?: { [key: string]: string | undefined };
}
export interface UsagePlan {
  id?: string;
  name?: string;
  description?: string;
  apiStages?: ApiStage[];
  throttle?: ThrottleSettings;
  quota?: QuotaSettings;
  productCode?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateUsagePlanKeyRequest {
  usagePlanId: string;
  keyId: string;
  keyType: string;
}
export interface UsagePlanKey {
  id?: string;
  type?: string;
  value?: string;
  name?: string;
}
export interface CreateVpcLinkRequest {
  name: string;
  description?: string;
  targetArns: string[];
  tags?: { [key: string]: string | undefined };
}
export type VpcLinkStatus = "AVAILABLE" | "PENDING" | "DELETING" | "FAILED" | (string & {});
export interface VpcLink {
  id?: string;
  name?: string;
  description?: string;
  targetArns?: string[];
  status?: VpcLinkStatus;
  statusMessage?: string;
  tags?: { [key: string]: string | undefined };
}
export interface DeleteApiKeyRequest {
  apiKey: string;
}
export interface DeleteApiKeyResponse {}
export interface DeleteAuthorizerRequest {
  restApiId: string;
  authorizerId: string;
}
export interface DeleteAuthorizerResponse {}
export interface DeleteBasePathMappingRequest {
  domainName: string;
  domainNameId?: string;
  basePath: string;
}
export interface DeleteBasePathMappingResponse {}
export interface DeleteClientCertificateRequest {
  clientCertificateId: string;
}
export interface DeleteClientCertificateResponse {}
export interface DeleteDeploymentRequest {
  restApiId: string;
  deploymentId: string;
}
export interface DeleteDeploymentResponse {}
export interface DeleteDocumentationPartRequest {
  restApiId: string;
  documentationPartId: string;
}
export interface DeleteDocumentationPartResponse {}
export interface DeleteDocumentationVersionRequest {
  restApiId: string;
  documentationVersion: string;
}
export interface DeleteDocumentationVersionResponse {}
export interface DeleteDomainNameRequest {
  domainName: string;
  domainNameId?: string;
}
export interface DeleteDomainNameResponse {}
export interface DeleteDomainNameAccessAssociationRequest {
  domainNameAccessAssociationArn: string;
}
export interface DeleteDomainNameAccessAssociationResponse {}
export type GatewayResponseType =
  | "DEFAULT_4XX"
  | "DEFAULT_5XX"
  | "RESOURCE_NOT_FOUND"
  | "UNAUTHORIZED"
  | "INVALID_API_KEY"
  | "ACCESS_DENIED"
  | "AUTHORIZER_FAILURE"
  | "AUTHORIZER_CONFIGURATION_ERROR"
  | "INVALID_SIGNATURE"
  | "EXPIRED_TOKEN"
  | "MISSING_AUTHENTICATION_TOKEN"
  | "INTEGRATION_FAILURE"
  | "INTEGRATION_TIMEOUT"
  | "API_CONFIGURATION_ERROR"
  | "UNSUPPORTED_MEDIA_TYPE"
  | "BAD_REQUEST_PARAMETERS"
  | "BAD_REQUEST_BODY"
  | "REQUEST_TOO_LARGE"
  | "THROTTLED"
  | "QUOTA_EXCEEDED"
  | "WAF_FILTERED"
  | (string & {});
export interface DeleteGatewayResponseRequest {
  restApiId: string;
  responseType: GatewayResponseType;
}
export interface DeleteGatewayResponseResponse {}
export interface DeleteIntegrationRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
}
export interface DeleteIntegrationResponse {}
export interface DeleteIntegrationResponseRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  statusCode: string;
}
export interface DeleteIntegrationResponseResponse {}
export interface DeleteMethodRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
}
export interface DeleteMethodResponse {}
export interface DeleteMethodResponseRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  statusCode: string;
}
export interface DeleteMethodResponseResponse {}
export interface DeleteModelRequest {
  restApiId: string;
  modelName: string;
}
export interface DeleteModelResponse {}
export interface DeleteRequestValidatorRequest {
  restApiId: string;
  requestValidatorId: string;
}
export interface DeleteRequestValidatorResponse {}
export interface DeleteResourceRequest {
  restApiId: string;
  resourceId: string;
}
export interface DeleteResourceResponse {}
export interface DeleteRestApiRequest {
  restApiId: string;
}
export interface DeleteRestApiResponse {}
export interface DeleteStageRequest {
  restApiId: string;
  stageName: string;
}
export interface DeleteStageResponse {}
export interface DeleteUsagePlanRequest {
  usagePlanId: string;
}
export interface DeleteUsagePlanResponse {}
export interface DeleteUsagePlanKeyRequest {
  usagePlanId: string;
  keyId: string;
}
export interface DeleteUsagePlanKeyResponse {}
export interface DeleteVpcLinkRequest {
  vpcLinkId: string;
}
export interface DeleteVpcLinkResponse {}
export interface FlushStageAuthorizersCacheRequest {
  restApiId: string;
  stageName: string;
}
export interface FlushStageAuthorizersCacheResponse {}
export interface FlushStageCacheRequest {
  restApiId: string;
  stageName: string;
}
export interface FlushStageCacheResponse {}
export interface GenerateClientCertificateRequest {
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export interface ClientCertificate {
  clientCertificateId?: string;
  description?: string;
  pemEncodedCertificate?: string;
  createdDate?: Date;
  expirationDate?: Date;
  tags?: { [key: string]: string | undefined };
}
export interface GetAccountRequest {}
export interface Account {
  cloudwatchRoleArn?: string;
  throttleSettings?: ThrottleSettings;
  features?: string[];
  apiKeyVersion?: string;
}
export interface GetApiKeyRequest {
  apiKey: string;
  includeValue?: boolean;
}
export interface GetApiKeysRequest {
  position?: string;
  limit?: number;
  nameQuery?: string;
  customerId?: string;
  includeValues?: boolean;
}
export type ListOfApiKey = ApiKey[];
export interface ApiKeys {
  warnings?: string[];
  items?: ApiKey[];
  position?: string;
}
export interface GetAuthorizerRequest {
  restApiId: string;
  authorizerId: string;
}
export interface GetAuthorizersRequest {
  restApiId: string;
  position?: string;
  limit?: number;
}
export type ListOfAuthorizer = Authorizer[];
export interface Authorizers {
  items?: Authorizer[];
  position?: string;
}
export interface GetBasePathMappingRequest {
  domainName: string;
  domainNameId?: string;
  basePath: string;
}
export interface GetBasePathMappingsRequest {
  domainName: string;
  domainNameId?: string;
  position?: string;
  limit?: number;
}
export type ListOfBasePathMapping = BasePathMapping[];
export interface BasePathMappings {
  items?: BasePathMapping[];
  position?: string;
}
export interface GetClientCertificateRequest {
  clientCertificateId: string;
}
export interface GetClientCertificatesRequest {
  position?: string;
  limit?: number;
}
export type ListOfClientCertificate = ClientCertificate[];
export interface ClientCertificates {
  items?: ClientCertificate[];
  position?: string;
}
export interface GetDeploymentRequest {
  restApiId: string;
  deploymentId: string;
  embed?: string[];
}
export interface GetDeploymentsRequest {
  restApiId: string;
  position?: string;
  limit?: number;
}
export type ListOfDeployment = Deployment[];
export interface Deployments {
  items?: Deployment[];
  position?: string;
}
export interface GetDocumentationPartRequest {
  restApiId: string;
  documentationPartId: string;
}
export type LocationStatusType = "DOCUMENTED" | "UNDOCUMENTED" | (string & {});
export interface GetDocumentationPartsRequest {
  restApiId: string;
  type?: DocumentationPartType;
  nameQuery?: string;
  path?: string;
  position?: string;
  limit?: number;
  locationStatus?: LocationStatusType;
}
export type ListOfDocumentationPart = DocumentationPart[];
export interface DocumentationParts {
  items?: DocumentationPart[];
  position?: string;
}
export interface GetDocumentationVersionRequest {
  restApiId: string;
  documentationVersion: string;
}
export interface GetDocumentationVersionsRequest {
  restApiId: string;
  position?: string;
  limit?: number;
}
export type ListOfDocumentationVersion = DocumentationVersion[];
export interface DocumentationVersions {
  items?: DocumentationVersion[];
  position?: string;
}
export interface GetDomainNameRequest {
  domainName: string;
  domainNameId?: string;
}
export type ResourceOwner = "SELF" | "OTHER_ACCOUNTS" | (string & {});
export interface GetDomainNameAccessAssociationsRequest {
  position?: string;
  limit?: number;
  resourceOwner?: ResourceOwner;
}
export type ListOfDomainNameAccessAssociation = DomainNameAccessAssociation[];
export interface DomainNameAccessAssociations {
  items?: DomainNameAccessAssociation[];
  position?: string;
}
export interface GetDomainNamesRequest {
  position?: string;
  limit?: number;
  resourceOwner?: ResourceOwner;
}
export type ListOfDomainName = DomainName[];
export interface DomainNames {
  items?: DomainName[];
  position?: string;
}
export interface GetExportRequest {
  restApiId: string;
  stageName: string;
  exportType: string;
  parameters?: { [key: string]: string | undefined };
  accepts?: string;
}
export interface ExportResponse {
  contentType?: string;
  contentDisposition?: string;
  body?: T.StreamingOutputBody;
}
export interface GetGatewayResponseRequest {
  restApiId: string;
  responseType: GatewayResponseType;
}
export interface GatewayResponse {
  responseType?: GatewayResponseType;
  statusCode?: string;
  responseParameters?: { [key: string]: string | undefined };
  responseTemplates?: { [key: string]: string | undefined };
  defaultResponse?: boolean;
}
export interface GetGatewayResponsesRequest {
  restApiId: string;
  position?: string;
  limit?: number;
}
export type ListOfGatewayResponse = GatewayResponse[];
export interface GatewayResponses {
  items?: GatewayResponse[];
  position?: string;
}
export interface GetIntegrationRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
}
export interface GetIntegrationResponseRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  statusCode: string;
}
export interface GetMethodRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
}
export interface GetMethodResponseRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  statusCode: string;
}
export interface GetModelRequest {
  restApiId: string;
  modelName: string;
  flatten?: boolean;
}
export interface GetModelsRequest {
  restApiId: string;
  position?: string;
  limit?: number;
}
export type ListOfModel = Model[];
export interface Models {
  items?: Model[];
  position?: string;
}
export interface GetModelTemplateRequest {
  restApiId: string;
  modelName: string;
}
export interface Template {
  value?: string;
}
export interface GetRequestValidatorRequest {
  restApiId: string;
  requestValidatorId: string;
}
export interface GetRequestValidatorsRequest {
  restApiId: string;
  position?: string;
  limit?: number;
}
export type ListOfRequestValidator = RequestValidator[];
export interface RequestValidators {
  items?: RequestValidator[];
  position?: string;
}
export interface GetResourceRequest {
  restApiId: string;
  resourceId: string;
  embed?: string[];
}
export interface GetResourcesRequest {
  restApiId: string;
  position?: string;
  limit?: number;
  embed?: string[];
}
export type ListOfResource = Resource[];
export interface Resources {
  items?: Resource[];
  position?: string;
}
export interface GetRestApiRequest {
  restApiId: string;
}
export interface GetRestApisRequest {
  position?: string;
  limit?: number;
}
export type ListOfRestApi = RestApi[];
export interface RestApis {
  items?: RestApi[];
  position?: string;
}
export interface GetSdkRequest {
  restApiId: string;
  stageName: string;
  sdkType: string;
  parameters?: { [key: string]: string | undefined };
}
export interface SdkResponse {
  contentType?: string;
  contentDisposition?: string;
  body?: T.StreamingOutputBody;
}
export interface GetSdkTypeRequest {
  id: string;
}
export interface SdkConfigurationProperty {
  name?: string;
  friendlyName?: string;
  description?: string;
  required?: boolean;
  defaultValue?: string;
}
export type ListOfSdkConfigurationProperty = SdkConfigurationProperty[];
export interface SdkType {
  id?: string;
  friendlyName?: string;
  description?: string;
  configurationProperties?: SdkConfigurationProperty[];
}
export interface GetSdkTypesRequest {
  position?: string;
  limit?: number;
}
export type ListOfSdkType = SdkType[];
export interface SdkTypes {
  items?: SdkType[];
}
export interface GetStageRequest {
  restApiId: string;
  stageName: string;
}
export interface GetStagesRequest {
  restApiId: string;
  deploymentId?: string;
}
export type ListOfStage = Stage[];
export interface Stages {
  item?: Stage[];
}
export interface GetTagsRequest {
  resourceArn: string;
  position?: string;
  limit?: number;
}
export interface Tags {
  tags?: { [key: string]: string | undefined };
}
export interface GetUsageRequest {
  usagePlanId: string;
  keyId?: string;
  startDate: string;
  endDate: string;
  position?: string;
  limit?: number;
}
export type ListOfLong = number[];
export type ListOfUsage = number[][];
export type MapOfKeyUsages = { [key: string]: number[][] | undefined };
export interface Usage {
  usagePlanId?: string;
  startDate?: string;
  endDate?: string;
  items?: { [key: string]: number[][] | undefined };
  position?: string;
}
export interface GetUsagePlanRequest {
  usagePlanId: string;
}
export interface GetUsagePlanKeyRequest {
  usagePlanId: string;
  keyId: string;
}
export interface GetUsagePlanKeysRequest {
  usagePlanId: string;
  position?: string;
  limit?: number;
  nameQuery?: string;
}
export type ListOfUsagePlanKey = UsagePlanKey[];
export interface UsagePlanKeys {
  items?: UsagePlanKey[];
  position?: string;
}
export interface GetUsagePlansRequest {
  position?: string;
  keyId?: string;
  limit?: number;
}
export type ListOfUsagePlan = UsagePlan[];
export interface UsagePlans {
  items?: UsagePlan[];
  position?: string;
}
export interface GetVpcLinkRequest {
  vpcLinkId: string;
}
export interface GetVpcLinksRequest {
  position?: string;
  limit?: number;
}
export type ListOfVpcLink = VpcLink[];
export interface VpcLinks {
  items?: VpcLink[];
  position?: string;
}
export type ApiKeysFormat = "csv" | (string & {});
export interface ImportApiKeysRequest {
  body: T.StreamingInputBody;
  format: ApiKeysFormat;
  failOnWarnings?: boolean;
}
export interface ApiKeyIds {
  ids?: string[];
  warnings?: string[];
}
export type PutMode = "merge" | "overwrite" | (string & {});
export interface ImportDocumentationPartsRequest {
  restApiId: string;
  mode?: PutMode;
  failOnWarnings?: boolean;
  body: T.StreamingInputBody;
}
export interface DocumentationPartIds {
  ids?: string[];
  warnings?: string[];
}
export interface ImportRestApiRequest {
  failOnWarnings?: boolean;
  parameters?: { [key: string]: string | undefined };
  body: T.StreamingInputBody;
}
export interface PutGatewayResponseRequest {
  restApiId: string;
  responseType: GatewayResponseType;
  statusCode?: string;
  responseParameters?: { [key: string]: string | undefined };
  responseTemplates?: { [key: string]: string | undefined };
}
export interface PutIntegrationRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  type: IntegrationType;
  integrationHttpMethod?: string;
  uri?: string;
  connectionType?: ConnectionType;
  connectionId?: string;
  credentials?: string;
  requestParameters?: { [key: string]: string | undefined };
  requestTemplates?: { [key: string]: string | undefined };
  passthroughBehavior?: string;
  cacheNamespace?: string;
  cacheKeyParameters?: string[];
  contentHandling?: ContentHandlingStrategy;
  timeoutInMillis?: number;
  tlsConfig?: TlsConfig;
  responseTransferMode?: ResponseTransferMode;
  integrationTarget?: string;
}
export interface PutIntegrationResponseRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  statusCode: string;
  selectionPattern?: string;
  responseParameters?: { [key: string]: string | undefined };
  responseTemplates?: { [key: string]: string | undefined };
  contentHandling?: ContentHandlingStrategy;
}
export interface PutMethodRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  authorizationType: string;
  authorizerId?: string;
  apiKeyRequired?: boolean;
  operationName?: string;
  requestParameters?: { [key: string]: boolean | undefined };
  requestModels?: { [key: string]: string | undefined };
  requestValidatorId?: string;
  authorizationScopes?: string[];
}
export interface PutMethodResponseRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  statusCode: string;
  responseParameters?: { [key: string]: boolean | undefined };
  responseModels?: { [key: string]: string | undefined };
}
export interface PutRestApiRequest {
  restApiId: string;
  mode?: PutMode;
  failOnWarnings?: boolean;
  parameters?: { [key: string]: string | undefined };
  body: T.StreamingInputBody;
}
export interface RejectDomainNameAccessAssociationRequest {
  domainNameAccessAssociationArn: string;
  domainNameArn: string;
}
export interface RejectDomainNameAccessAssociationResponse {}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type MapOfStringToList = { [key: string]: string[] | undefined };
export interface TestInvokeAuthorizerRequest {
  restApiId: string;
  authorizerId: string;
  headers?: { [key: string]: string | undefined };
  multiValueHeaders?: { [key: string]: string[] | undefined };
  pathWithQueryString?: string;
  body?: string;
  stageVariables?: { [key: string]: string | undefined };
  additionalContext?: { [key: string]: string | undefined };
}
export interface TestInvokeAuthorizerResponse {
  clientStatus?: number;
  log?: string;
  latency?: number;
  principalId?: string;
  policy?: string;
  authorization?: { [key: string]: string[] | undefined };
  claims?: { [key: string]: string | undefined };
}
export interface TestInvokeMethodRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  pathWithQueryString?: string;
  body?: string;
  headers?: { [key: string]: string | undefined };
  multiValueHeaders?: { [key: string]: string[] | undefined };
  clientCertificateId?: string;
  stageVariables?: { [key: string]: string | undefined };
}
export interface TestInvokeMethodResponse {
  status?: number;
  body?: string;
  headers?: { [key: string]: string | undefined };
  multiValueHeaders?: { [key: string]: string[] | undefined };
  log?: string;
  latency?: number;
}
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export type Op = "add" | "remove" | "replace" | "move" | "copy" | "test" | (string & {});
export interface PatchOperation {
  op?: Op;
  path?: string;
  value?: string;
  from?: string;
}
export type ListOfPatchOperation = PatchOperation[];
export interface UpdateAccountRequest {
  patchOperations?: PatchOperation[];
}
export interface UpdateApiKeyRequest {
  apiKey: string;
  patchOperations?: PatchOperation[];
}
export interface UpdateAuthorizerRequest {
  restApiId: string;
  authorizerId: string;
  patchOperations?: PatchOperation[];
}
export interface UpdateBasePathMappingRequest {
  domainName: string;
  domainNameId?: string;
  basePath: string;
  patchOperations?: PatchOperation[];
}
export interface UpdateClientCertificateRequest {
  clientCertificateId: string;
  patchOperations?: PatchOperation[];
}
export interface UpdateDeploymentRequest {
  restApiId: string;
  deploymentId: string;
  patchOperations?: PatchOperation[];
}
export interface UpdateDocumentationPartRequest {
  restApiId: string;
  documentationPartId: string;
  patchOperations?: PatchOperation[];
}
export interface UpdateDocumentationVersionRequest {
  restApiId: string;
  documentationVersion: string;
  patchOperations?: PatchOperation[];
}
export interface UpdateDomainNameRequest {
  domainName: string;
  domainNameId?: string;
  patchOperations?: PatchOperation[];
}
export interface UpdateGatewayResponseRequest {
  restApiId: string;
  responseType: GatewayResponseType;
  patchOperations?: PatchOperation[];
}
export interface UpdateIntegrationRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  patchOperations?: PatchOperation[];
}
export interface UpdateIntegrationResponseRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  statusCode: string;
  patchOperations?: PatchOperation[];
}
export interface UpdateMethodRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  patchOperations?: PatchOperation[];
}
export interface UpdateMethodResponseRequest {
  restApiId: string;
  resourceId: string;
  httpMethod: string;
  statusCode: string;
  patchOperations?: PatchOperation[];
}
export interface UpdateModelRequest {
  restApiId: string;
  modelName: string;
  patchOperations?: PatchOperation[];
}
export interface UpdateRequestValidatorRequest {
  restApiId: string;
  requestValidatorId: string;
  patchOperations?: PatchOperation[];
}
export interface UpdateResourceRequest {
  restApiId: string;
  resourceId: string;
  patchOperations?: PatchOperation[];
}
export interface UpdateRestApiRequest {
  restApiId: string;
  patchOperations?: PatchOperation[];
}
export interface UpdateStageRequest {
  restApiId: string;
  stageName: string;
  patchOperations?: PatchOperation[];
}
export interface UpdateUsageRequest {
  usagePlanId: string;
  keyId: string;
  patchOperations?: PatchOperation[];
}
export interface UpdateUsagePlanRequest {
  usagePlanId: string;
  patchOperations?: PatchOperation[];
}
export interface UpdateVpcLinkRequest {
  vpcLinkId: string;
  patchOperations?: PatchOperation[];
}
export type CreateApiKeyError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Create an ApiKey resource.
 */
export const createApiKey: API.OperationMethod<
  CreateApiKeyRequest,
  ApiKey,
  CreateApiKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(938, __c117, 2) as any as S.Schema<CreateApiKeyRequest>,
  output: __S(952, __c119, 0) as any as S.Schema<ApiKey>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApiKey",
}));

export type CreateAuthorizerError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds a new Authorizer resource to an existing RestApi resource.
 */
export const createAuthorizer: API.OperationMethod<
  CreateAuthorizerRequest,
  Authorizer,
  CreateAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1048, __c131, 0) as any as S.Schema<CreateAuthorizerRequest>,
  output: __S(1056, __c132, 0) as any as S.Schema<Authorizer>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAuthorizer",
}));

export type CreateBasePathMappingError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new BasePathMapping resource.
 */
export const createBasePathMapping: API.OperationMethod<
  CreateBasePathMappingRequest,
  BasePathMapping,
  CreateBasePathMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1160, __c145, 0) as any as S.Schema<CreateBasePathMappingRequest>,
  output: __S(1168, __c146, 0) as any as S.Schema<BasePathMapping>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBasePathMapping",
}));

export type CreateDeploymentError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a Deployment resource, which makes a specified RestApi callable over the internet.
 */
export const createDeployment: API.OperationMethod<
  CreateDeploymentRequest,
  Deployment,
  CreateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1, __c0, 1) as any as S.Schema<CreateDeploymentRequest>,
  output: __S(11, __c1, 3) as any as S.Schema<Deployment>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeployment",
}));

export type CreateDocumentationPartError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a documentation part.
 */
export const createDocumentationPart: API.OperationMethod<
  CreateDocumentationPartRequest,
  DocumentationPart,
  CreateDocumentationPartError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<CreateDocumentationPartRequest>,
  output: __S(121, __c15, 1) as any as S.Schema<DocumentationPart>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDocumentationPart",
}));

export type CreateDocumentationVersionError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a documentation version
 */
export const createDocumentationVersion: API.OperationMethod<
  CreateDocumentationVersionRequest,
  DocumentationVersion,
  CreateDocumentationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<CreateDocumentationVersionRequest>,
  output: __S(216, __c27, 0) as any as S.Schema<DocumentationVersion>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDocumentationVersion",
}));

export type CreateDomainNameError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new domain name.
 */
export const createDomainName: API.OperationMethod<
  CreateDomainNameRequest,
  DomainName,
  CreateDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(305, __c38, 1) as any as S.Schema<CreateDomainNameRequest>,
  output: __S(321, __c40, 1) as any as S.Schema<DomainName>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomainName",
}));

export type CreateDomainNameAccessAssociationError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a domain name access association resource between an access association source and a private custom
 * domain name.
 */
export const createDomainNameAccessAssociation: API.OperationMethod<
  CreateDomainNameAccessAssociationRequest,
  DomainNameAccessAssociation,
  CreateDomainNameAccessAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c42, 0) as any as S.Schema<CreateDomainNameAccessAssociationRequest>,
  output: __S(344, __c43, 0) as any as S.Schema<DomainNameAccessAssociation>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomainNameAccessAssociation",
}));

export type CreateModelError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds a new Model resource to an existing RestApi resource.
 */
export const createModel: API.OperationMethod<
  CreateModelRequest,
  Model,
  CreateModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c44, 0) as any as S.Schema<CreateModelRequest>,
  output: __S(360, __c45, 0) as any as S.Schema<Model>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModel",
}));

export type CreateRequestValidatorError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a RequestValidator of a given RestApi.
 */
export const createRequestValidator: API.OperationMethod<
  CreateRequestValidatorRequest,
  RequestValidator,
  CreateRequestValidatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c46, 0) as any as S.Schema<CreateRequestValidatorRequest>,
  output: __S(376, __c47, 0) as any as S.Schema<RequestValidator>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRequestValidator",
}));

export type CreateResourceError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a Resource resource.
 */
export const createResource: API.OperationMethod<
  CreateResourceRequest,
  Resource,
  CreateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c48, 0) as any as S.Schema<CreateResourceRequest>,
  output: __S(425, __c53, 1) as any as S.Schema<Resource>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResource",
}));

export type CreateRestApiError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new RestApi resource.
 */
export const createRestApi: API.OperationMethod<
  CreateRestApiRequest,
  RestApi,
  CreateRestApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c54, 0) as any as S.Schema<CreateRestApiRequest>,
  output: __S(440, __c55, 0) as any as S.Schema<RestApi>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRestApi",
}));

export type CreateStageError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new Stage resource that references a pre-existing Deployment for the API.
 */
export const createStage: API.OperationMethod<
  CreateStageRequest,
  Stage,
  CreateStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c56, 0) as any as S.Schema<CreateStageRequest>,
  output: __S(460, __c57, 4) as any as S.Schema<Stage>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStage",
}));

export type CreateUsagePlanError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a usage plan with the throttle and quota limits, as well as the associated API stages, specified in the payload.
 */
export const createUsagePlan: API.OperationMethod<
  CreateUsagePlanRequest,
  UsagePlan,
  CreateUsagePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c58, 0) as any as S.Schema<CreateUsagePlanRequest>,
  output: __S(484, __c60, 4) as any as S.Schema<UsagePlan>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUsagePlan",
}));

export type CreateUsagePlanKeyError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a usage plan key for adding an existing API key to a usage plan.
 */
export const createUsagePlanKey: API.OperationMethod<
  CreateUsagePlanKeyRequest,
  UsagePlanKey,
  CreateUsagePlanKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(488, __c61, 0) as any as S.Schema<CreateUsagePlanKeyRequest>,
  output: __S(496, __c62, 0) as any as S.Schema<UsagePlanKey>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUsagePlanKey",
}));

export type CreateVpcLinkError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a VPC link, under the caller's account in a selected region, in an asynchronous operation that typically takes 2-4 minutes to complete and become operational. The caller must have permissions to create and update VPC Endpoint services.
 */
export const createVpcLink: API.OperationMethod<
  CreateVpcLinkRequest,
  VpcLink,
  CreateVpcLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(504, __c63, 0) as any as S.Schema<CreateVpcLinkRequest>,
  output: __S(512, __c64, 0) as any as S.Schema<VpcLink>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcLink",
}));

export type DeleteApiKeyError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the ApiKey resource.
 */
export const deleteApiKey: API.OperationMethod<
  DeleteApiKeyRequest,
  DeleteApiKeyResponse,
  DeleteApiKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(520, __c65, 0) as any as S.Schema<DeleteApiKeyRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteApiKeyResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApiKey",
}));

export type DeleteAuthorizerError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an existing Authorizer resource.
 */
export const deleteAuthorizer: API.OperationMethod<
  DeleteAuthorizerRequest,
  DeleteAuthorizerResponse,
  DeleteAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(536, __c67, 0) as any as S.Schema<DeleteAuthorizerRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteAuthorizerResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAuthorizer",
}));

export type DeleteBasePathMappingError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the BasePathMapping resource.
 */
export const deleteBasePathMapping: API.OperationMethod<
  DeleteBasePathMappingRequest,
  DeleteBasePathMappingResponse,
  DeleteBasePathMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c68, 0) as any as S.Schema<DeleteBasePathMappingRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteBasePathMappingResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBasePathMapping",
}));

export type DeleteClientCertificateError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the ClientCertificate resource.
 */
export const deleteClientCertificate: API.OperationMethod<
  DeleteClientCertificateRequest,
  DeleteClientCertificateResponse,
  DeleteClientCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(552, __c69, 0) as any as S.Schema<DeleteClientCertificateRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteClientCertificateResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClientCertificate",
}));

export type DeleteDeploymentError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a Deployment resource. Deleting a deployment will only succeed if there are no Stage resources associated with it.
 */
export const deleteDeployment: API.OperationMethod<
  DeleteDeploymentRequest,
  DeleteDeploymentResponse,
  DeleteDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c70, 0) as any as S.Schema<DeleteDeploymentRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteDeploymentResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeployment",
}));

export type DeleteDocumentationPartError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a documentation part
 */
export const deleteDocumentationPart: API.OperationMethod<
  DeleteDocumentationPartRequest,
  DeleteDocumentationPartResponse,
  DeleteDocumentationPartError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(568, __c71, 0) as any as S.Schema<DeleteDocumentationPartRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteDocumentationPartResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDocumentationPart",
}));

export type DeleteDocumentationVersionError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a documentation version.
 */
export const deleteDocumentationVersion: API.OperationMethod<
  DeleteDocumentationVersionRequest,
  DeleteDocumentationVersionResponse,
  DeleteDocumentationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c72, 0) as any as S.Schema<DeleteDocumentationVersionRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteDocumentationVersionResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDocumentationVersion",
}));

export type DeleteDomainNameError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the DomainName resource.
 */
export const deleteDomainName: API.OperationMethod<
  DeleteDomainNameRequest,
  DeleteDomainNameResponse,
  DeleteDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(584, __c73, 0) as any as S.Schema<DeleteDomainNameRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteDomainNameResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainName",
}));

export type DeleteDomainNameAccessAssociationError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the DomainNameAccessAssociation resource.
 *
 * Only the AWS account that created the DomainNameAccessAssociation resource can delete it. To stop an access association source in another AWS account from accessing your private custom domain name, use the RejectDomainNameAccessAssociation operation.
 */
export const deleteDomainNameAccessAssociation: API.OperationMethod<
  DeleteDomainNameAccessAssociationRequest,
  DeleteDomainNameAccessAssociationResponse,
  DeleteDomainNameAccessAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c74, 0) as any as S.Schema<DeleteDomainNameAccessAssociationRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteDomainNameAccessAssociationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainNameAccessAssociation",
}));

export type DeleteGatewayResponseError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Clears any customization of a GatewayResponse of a specified response type on the given RestApi and resets it with the default settings.
 */
export const deleteGatewayResponse: API.OperationMethod<
  DeleteGatewayResponseRequest,
  DeleteGatewayResponseResponse,
  DeleteGatewayResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(600, __c75, 0) as any as S.Schema<DeleteGatewayResponseRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteGatewayResponseResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGatewayResponse",
}));

export type DeleteIntegrationError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Represents a delete integration.
 */
export const deleteIntegration: API.OperationMethod<
  DeleteIntegrationRequest,
  DeleteIntegrationResponse,
  DeleteIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c76, 0) as any as S.Schema<DeleteIntegrationRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteIntegrationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegration",
}));

export type DeleteIntegrationResponseError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Represents a delete integration response.
 */
export const deleteIntegrationResponse: API.OperationMethod<
  DeleteIntegrationResponseRequest,
  DeleteIntegrationResponseResponse,
  DeleteIntegrationResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(616, __c77, 0) as any as S.Schema<DeleteIntegrationResponseRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteIntegrationResponseResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegrationResponse",
}));

export type DeleteMethodError =
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an existing Method resource.
 */
export const deleteMethod: API.OperationMethod<
  DeleteMethodRequest,
  DeleteMethodResponse,
  DeleteMethodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c78, 0) as any as S.Schema<DeleteMethodRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteMethodResponse>,
  errors: [ConflictException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMethod",
}));

export type DeleteMethodResponseError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an existing MethodResponse resource.
 */
export const deleteMethodResponse: API.OperationMethod<
  DeleteMethodResponseRequest,
  DeleteMethodResponseResponse,
  DeleteMethodResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(632, __c79, 0) as any as S.Schema<DeleteMethodResponseRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteMethodResponseResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMethodResponse",
}));

export type DeleteModelError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a model.
 */
export const deleteModel: API.OperationMethod<
  DeleteModelRequest,
  DeleteModelResponse,
  DeleteModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c80, 0) as any as S.Schema<DeleteModelRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteModelResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModel",
}));

export type DeleteRequestValidatorError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a RequestValidator of a given RestApi.
 */
export const deleteRequestValidator: API.OperationMethod<
  DeleteRequestValidatorRequest,
  DeleteRequestValidatorResponse,
  DeleteRequestValidatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(648, __c81, 0) as any as S.Schema<DeleteRequestValidatorRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteRequestValidatorResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRequestValidator",
}));

export type DeleteResourceError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a Resource resource.
 */
export const deleteResource: API.OperationMethod<
  DeleteResourceRequest,
  DeleteResourceResponse,
  DeleteResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c82, 0) as any as S.Schema<DeleteResourceRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteResourceResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResource",
}));

export type DeleteRestApiError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified API.
 */
export const deleteRestApi: API.OperationMethod<
  DeleteRestApiRequest,
  DeleteRestApiResponse,
  DeleteRestApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(664, __c83, 0) as any as S.Schema<DeleteRestApiRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteRestApiResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRestApi",
}));

export type DeleteStageError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a Stage resource.
 */
export const deleteStage: API.OperationMethod<
  DeleteStageRequest,
  DeleteStageResponse,
  DeleteStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c84, 0) as any as S.Schema<DeleteStageRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteStageResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStage",
}));

export type DeleteUsagePlanError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a usage plan of a given plan Id.
 */
export const deleteUsagePlan: API.OperationMethod<
  DeleteUsagePlanRequest,
  DeleteUsagePlanResponse,
  DeleteUsagePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(680, __c85, 0) as any as S.Schema<DeleteUsagePlanRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteUsagePlanResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUsagePlan",
}));

export type DeleteUsagePlanKeyError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a usage plan key and remove the underlying API key from the associated usage plan.
 */
export const deleteUsagePlanKey: API.OperationMethod<
  DeleteUsagePlanKeyRequest,
  DeleteUsagePlanKeyResponse,
  DeleteUsagePlanKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c86, 0) as any as S.Schema<DeleteUsagePlanKeyRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteUsagePlanKeyResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUsagePlanKey",
}));

export type DeleteVpcLinkError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an existing VpcLink of a specified identifier.
 */
export const deleteVpcLink: API.OperationMethod<
  DeleteVpcLinkRequest,
  DeleteVpcLinkResponse,
  DeleteVpcLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(696, __c87, 0) as any as S.Schema<DeleteVpcLinkRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<DeleteVpcLinkResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcLink",
}));

export type FlushStageAuthorizersCacheError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Flushes all authorizer cache entries on a stage.
 */
export const flushStageAuthorizersCache: API.OperationMethod<
  FlushStageAuthorizersCacheRequest,
  FlushStageAuthorizersCacheResponse,
  FlushStageAuthorizersCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c88, 0) as any as S.Schema<FlushStageAuthorizersCacheRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<FlushStageAuthorizersCacheResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FlushStageAuthorizersCache",
}));

export type FlushStageCacheError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Flushes a stage's cache.
 */
export const flushStageCache: API.OperationMethod<
  FlushStageCacheRequest,
  FlushStageCacheResponse,
  FlushStageCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(712, __c89, 0) as any as S.Schema<FlushStageCacheRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<FlushStageCacheResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FlushStageCache",
}));

export type GenerateClientCertificateError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Generates a ClientCertificate resource.
 */
export const generateClientCertificate: API.OperationMethod<
  GenerateClientCertificateRequest,
  ClientCertificate,
  GenerateClientCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c90, 0) as any as S.Schema<GenerateClientCertificateRequest>,
  output: __S(728, __c91, 0) as any as S.Schema<ClientCertificate>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateClientCertificate",
}));

export type GetAccountError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about the current Account resource.
 */
export const getAccount: API.OperationMethod<
  GetAccountRequest,
  Account,
  GetAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c92, 0) as any as S.Schema<GetAccountRequest>,
  output: __S(744, __c93, 0) as any as S.Schema<Account>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccount",
}));

export type GetApiKeyError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about the current ApiKey resource.
 */
export const getApiKey: API.OperationMethod<
  GetApiKeyRequest,
  ApiKey,
  GetApiKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c94, 0) as any as S.Schema<GetApiKeyRequest>,
  output: __S(952, __c119, 0) as any as S.Schema<ApiKey>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApiKey",
}));

export type GetApiKeysError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about the current ApiKeys resource.
 */
export const getApiKeys: API.PaginatedOperationMethod<
  GetApiKeysRequest,
  ApiKeys,
  GetApiKeysError,
  Credentials | HttpClient.HttpClient,
  ApiKey
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(760, __c95, 0) as any as S.Schema<GetApiKeysRequest>,
  output: __S(762, __c95, 2) as any as S.Schema<ApiKeys>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApiKeys",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetAuthorizerError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describe an existing Authorizer resource.
 */
export const getAuthorizer: API.OperationMethod<
  GetAuthorizerRequest,
  Authorizer,
  GetAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c96, 0) as any as S.Schema<GetAuthorizerRequest>,
  output: __S(1056, __c132, 0) as any as S.Schema<Authorizer>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAuthorizer",
}));

export type GetAuthorizersError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describe an existing Authorizers resource.
 */
export const getAuthorizers: API.OperationMethod<
  GetAuthorizersRequest,
  Authorizers,
  GetAuthorizersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(776, __c97, 0) as any as S.Schema<GetAuthorizersRequest>,
  output: __S(778, __c97, 2) as any as S.Schema<Authorizers>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAuthorizers",
}));

export type GetBasePathMappingError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describe a BasePathMapping resource.
 */
export const getBasePathMapping: API.OperationMethod<
  GetBasePathMappingRequest,
  BasePathMapping,
  GetBasePathMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c98, 0) as any as S.Schema<GetBasePathMappingRequest>,
  output: __S(1168, __c146, 0) as any as S.Schema<BasePathMapping>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBasePathMapping",
}));

export type GetBasePathMappingsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Represents a collection of BasePathMapping resources.
 */
export const getBasePathMappings: API.PaginatedOperationMethod<
  GetBasePathMappingsRequest,
  BasePathMappings,
  GetBasePathMappingsError,
  Credentials | HttpClient.HttpClient,
  BasePathMapping
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(792, __c99, 0) as any as S.Schema<GetBasePathMappingsRequest>,
  output: __S(794, __c99, 2) as any as S.Schema<BasePathMappings>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBasePathMappings",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetClientCertificateError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about the current ClientCertificate resource.
 */
export const getClientCertificate: API.OperationMethod<
  GetClientCertificateRequest,
  ClientCertificate,
  GetClientCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c100, 0) as any as S.Schema<GetClientCertificateRequest>,
  output: __S(728, __c91, 0) as any as S.Schema<ClientCertificate>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClientCertificate",
}));

export type GetClientCertificatesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a collection of ClientCertificate resources.
 */
export const getClientCertificates: API.PaginatedOperationMethod<
  GetClientCertificatesRequest,
  ClientCertificates,
  GetClientCertificatesError,
  Credentials | HttpClient.HttpClient,
  ClientCertificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(808, __c101, 0) as any as S.Schema<GetClientCertificatesRequest>,
  output: __S(810, __c101, 2) as any as S.Schema<ClientCertificates>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClientCertificates",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetDeploymentError =
  | BadRequestException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about a Deployment resource.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentRequest,
  Deployment,
  GetDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(816, __c102, 0) as any as S.Schema<GetDeploymentRequest>,
  output: __S(11, __c1, 3) as any as S.Schema<Deployment>,
  errors: [
    BadRequestException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployment",
}));

export type GetDeploymentsError =
  | BadRequestException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about a Deployments collection.
 */
export const getDeployments: API.PaginatedOperationMethod<
  GetDeploymentsRequest,
  Deployments,
  GetDeploymentsError,
  Credentials | HttpClient.HttpClient,
  Deployment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(824, __c103, 0) as any as S.Schema<GetDeploymentsRequest>,
  output: __S(826, __c103, 2) as any as S.Schema<Deployments>,
  errors: [
    BadRequestException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployments",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetDocumentationPartError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a documentation part.
 */
export const getDocumentationPart: API.OperationMethod<
  GetDocumentationPartRequest,
  DocumentationPart,
  GetDocumentationPartError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c104, 0) as any as S.Schema<GetDocumentationPartRequest>,
  output: __S(121, __c15, 1) as any as S.Schema<DocumentationPart>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentationPart",
}));

export type GetDocumentationPartsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets documentation parts.
 */
export const getDocumentationParts: API.OperationMethod<
  GetDocumentationPartsRequest,
  DocumentationParts,
  GetDocumentationPartsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(840, __c105, 0) as any as S.Schema<GetDocumentationPartsRequest>,
  output: __S(842, __c105, 2) as any as S.Schema<DocumentationParts>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentationParts",
}));

export type GetDocumentationVersionError =
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a documentation version.
 */
export const getDocumentationVersion: API.OperationMethod<
  GetDocumentationVersionRequest,
  DocumentationVersion,
  GetDocumentationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c106, 0) as any as S.Schema<GetDocumentationVersionRequest>,
  output: __S(216, __c27, 0) as any as S.Schema<DocumentationVersion>,
  errors: [NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentationVersion",
}));

export type GetDocumentationVersionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets documentation versions.
 */
export const getDocumentationVersions: API.OperationMethod<
  GetDocumentationVersionsRequest,
  DocumentationVersions,
  GetDocumentationVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(856, __c107, 0) as any as S.Schema<GetDocumentationVersionsRequest>,
  output: __S(858, __c107, 2) as any as S.Schema<DocumentationVersions>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentationVersions",
}));

export type GetDomainNameError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Represents a domain name that is contained in a simpler, more intuitive URL that can be called.
 */
export const getDomainName: API.OperationMethod<
  GetDomainNameRequest,
  DomainName,
  GetDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c108, 0) as any as S.Schema<GetDomainNameRequest>,
  output: __S(321, __c40, 1) as any as S.Schema<DomainName>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainName",
}));

export type GetDomainNameAccessAssociationsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Represents a collection on DomainNameAccessAssociations resources.
 */
export const getDomainNameAccessAssociations: API.OperationMethod<
  GetDomainNameAccessAssociationsRequest,
  DomainNameAccessAssociations,
  GetDomainNameAccessAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(872, __c109, 0) as any as S.Schema<GetDomainNameAccessAssociationsRequest>,
  output: __S(874, __c109, 2) as any as S.Schema<DomainNameAccessAssociations>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainNameAccessAssociations",
}));

export type GetDomainNamesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Represents a collection of DomainName resources.
 */
export const getDomainNames: API.PaginatedOperationMethod<
  GetDomainNamesRequest,
  DomainNames,
  GetDomainNamesError,
  Credentials | HttpClient.HttpClient,
  DomainName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(880, __c110, 0) as any as S.Schema<GetDomainNamesRequest>,
  output: __S(882, __c110, 2) as any as S.Schema<DomainNames>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainNames",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetExportError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Exports a deployed version of a RestApi in a specified format.
 */
export const getExport: API.OperationMethod<
  GetExportRequest,
  ExportResponse,
  GetExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(888, __c111, 0) as any as S.Schema<GetExportRequest>,
  output: __S(896, __c112, 0) as any as S.Schema<ExportResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExport",
}));

export type GetGatewayResponseError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a GatewayResponse of a specified response type on the given RestApi.
 */
export const getGatewayResponse: API.OperationMethod<
  GetGatewayResponseRequest,
  GatewayResponse,
  GetGatewayResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(904, __c113, 0) as any as S.Schema<GetGatewayResponseRequest>,
  output: __S(912, __c114, 0) as any as S.Schema<GatewayResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGatewayResponse",
}));

export type GetGatewayResponsesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the GatewayResponses collection on the given RestApi. If an API developer has not added any definitions for gateway responses, the result will be the API Gateway-generated default GatewayResponses collection for the supported response types.
 */
export const getGatewayResponses: API.OperationMethod<
  GetGatewayResponsesRequest,
  GatewayResponses,
  GetGatewayResponsesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(920, __c115, 0) as any as S.Schema<GetGatewayResponsesRequest>,
  output: __S(922, __c115, 2) as any as S.Schema<GatewayResponses>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGatewayResponses",
}));

export type GetIntegrationError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Get the integration settings.
 */
export const getIntegration: API.OperationMethod<
  GetIntegrationRequest,
  Integration,
  GetIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c116, 0) as any as S.Schema<GetIntegrationRequest>,
  output: __S(402, __c50, 2) as any as S.Schema<Integration>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegration",
}));

export type GetIntegrationResponseError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Represents a get integration response.
 */
export const getIntegrationResponse: API.OperationMethod<
  GetIntegrationResponseRequest,
  IntegrationResponse,
  GetIntegrationResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(968, __c121, 0) as any as S.Schema<GetIntegrationResponseRequest>,
  output: __S(392, __c49, 0) as any as S.Schema<IntegrationResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegrationResponse",
}));

export type GetMethodError =
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describe an existing Method resource.
 */
export const getMethod: API.OperationMethod<
  GetMethodRequest,
  Method,
  GetMethodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(976, __c122, 0) as any as S.Schema<GetMethodRequest>,
  output: __S(417, __c52, 1) as any as S.Schema<Method>,
  errors: [NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMethod",
}));

export type GetMethodResponseError =
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes a MethodResponse resource.
 */
export const getMethodResponse: API.OperationMethod<
  GetMethodResponseRequest,
  MethodResponse,
  GetMethodResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(984, __c123, 0) as any as S.Schema<GetMethodResponseRequest>,
  output: __S(409, __c51, 1) as any as S.Schema<MethodResponse>,
  errors: [NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMethodResponse",
}));

export type GetModelError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes an existing model defined for a RestApi resource.
 */
export const getModel: API.OperationMethod<
  GetModelRequest,
  Model,
  GetModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c124, 0) as any as S.Schema<GetModelRequest>,
  output: __S(360, __c45, 0) as any as S.Schema<Model>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModel",
}));

export type GetModelsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes existing Models defined for a RestApi resource.
 */
export const getModels: API.PaginatedOperationMethod<
  GetModelsRequest,
  Models,
  GetModelsError,
  Credentials | HttpClient.HttpClient,
  Model
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1000, __c125, 0) as any as S.Schema<GetModelsRequest>,
  output: __S(1002, __c125, 2) as any as S.Schema<Models>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModels",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetModelTemplateError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Generates a sample mapping template that can be used to transform a payload into the structure of a model.
 */
export const getModelTemplate: API.OperationMethod<
  GetModelTemplateRequest,
  Template,
  GetModelTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1008, __c126, 0) as any as S.Schema<GetModelTemplateRequest>,
  output: __S(1009, __c126, 1) as any as S.Schema<Template>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelTemplate",
}));

export type GetRequestValidatorError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a RequestValidator of a given RestApi.
 */
export const getRequestValidator: API.OperationMethod<
  GetRequestValidatorRequest,
  RequestValidator,
  GetRequestValidatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1016, __c127, 0) as any as S.Schema<GetRequestValidatorRequest>,
  output: __S(376, __c47, 0) as any as S.Schema<RequestValidator>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRequestValidator",
}));

export type GetRequestValidatorsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the RequestValidators collection of a given RestApi.
 */
export const getRequestValidators: API.OperationMethod<
  GetRequestValidatorsRequest,
  RequestValidators,
  GetRequestValidatorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c128, 0) as any as S.Schema<GetRequestValidatorsRequest>,
  output: __S(1026, __c128, 2) as any as S.Schema<RequestValidators>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRequestValidators",
}));

export type GetResourceError =
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists information about a resource.
 */
export const getResource: API.OperationMethod<
  GetResourceRequest,
  Resource,
  GetResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1032, __c129, 0) as any as S.Schema<GetResourceRequest>,
  output: __S(425, __c53, 1) as any as S.Schema<Resource>,
  errors: [NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResource",
}));

export type GetResourcesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists information about a collection of Resource resources.
 */
export const getResources: API.PaginatedOperationMethod<
  GetResourcesRequest,
  Resources,
  GetResourcesError,
  Credentials | HttpClient.HttpClient,
  Resource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1040, __c130, 0) as any as S.Schema<GetResourcesRequest>,
  output: __S(1042, __c130, 2) as any as S.Schema<Resources>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResources",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetRestApiError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the RestApi resource in the collection.
 */
export const getRestApi: API.OperationMethod<
  GetRestApiRequest,
  RestApi,
  GetRestApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1064, __c133, 0) as any as S.Schema<GetRestApiRequest>,
  output: __S(440, __c55, 0) as any as S.Schema<RestApi>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRestApi",
}));

export type GetRestApisError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the RestApis resources for your collection.
 */
export const getRestApis: API.PaginatedOperationMethod<
  GetRestApisRequest,
  RestApis,
  GetRestApisError,
  Credentials | HttpClient.HttpClient,
  RestApi
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1072, __c134, 0) as any as S.Schema<GetRestApisRequest>,
  output: __S(1074, __c134, 2) as any as S.Schema<RestApis>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRestApis",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetSdkError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Generates a client SDK for a RestApi and Stage.
 */
export const getSdk: API.OperationMethod<
  GetSdkRequest,
  SdkResponse,
  GetSdkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1080, __c135, 0) as any as S.Schema<GetSdkRequest>,
  output: __S(896, __c112, 0) as any as S.Schema<SdkResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSdk",
}));

export type GetSdkTypeError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets an SDK type.
 */
export const getSdkType: API.OperationMethod<
  GetSdkTypeRequest,
  SdkType,
  GetSdkTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c136, 0) as any as S.Schema<GetSdkTypeRequest>,
  output: __S(1098, __c137, 2) as any as S.Schema<SdkType>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSdkType",
}));

export type GetSdkTypesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets SDK types
 */
export const getSdkTypes: API.OperationMethod<
  GetSdkTypesRequest,
  SdkTypes,
  GetSdkTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1104, __c138, 0) as any as S.Schema<GetSdkTypesRequest>,
  output: __S(1106, __c138, 2) as any as S.Schema<SdkTypes>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSdkTypes",
}));

export type GetStageError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about a Stage resource.
 */
export const getStage: API.OperationMethod<
  GetStageRequest,
  Stage,
  GetStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1112, __c139, 0) as any as S.Schema<GetStageRequest>,
  output: __S(460, __c57, 4) as any as S.Schema<Stage>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStage",
}));

export type GetStagesError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about one or more Stage resources.
 */
export const getStages: API.OperationMethod<
  GetStagesRequest,
  Stages,
  GetStagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c140, 0) as any as S.Schema<GetStagesRequest>,
  output: __S(1122, __c140, 2) as any as S.Schema<Stages>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStages",
}));

export type GetTagsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the Tags collection for a given resource.
 */
export const getTags: API.OperationMethod<
  GetTagsRequest,
  Tags,
  GetTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1128, __c141, 0) as any as S.Schema<GetTagsRequest>,
  output: __S(1129, __c141, 1) as any as S.Schema<Tags>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTags",
}));

export type GetUsageError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the usage data of a usage plan in a specified time interval.
 */
export const getUsage: API.PaginatedOperationMethod<
  GetUsageRequest,
  Usage,
  GetUsageError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1136, __c142, 0) as any as S.Schema<GetUsageRequest>,
  output: __S(1147, __c143, 3) as any as S.Schema<Usage>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsage",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetUsagePlanError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a usage plan of a given plan identifier.
 */
export const getUsagePlan: API.OperationMethod<
  GetUsagePlanRequest,
  UsagePlan,
  GetUsagePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c144, 0) as any as S.Schema<GetUsagePlanRequest>,
  output: __S(484, __c60, 4) as any as S.Schema<UsagePlan>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsagePlan",
}));

export type GetUsagePlanKeyError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a usage plan key of a given key identifier.
 */
export const getUsagePlanKey: API.OperationMethod<
  GetUsagePlanKeyRequest,
  UsagePlanKey,
  GetUsagePlanKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1176, __c147, 0) as any as S.Schema<GetUsagePlanKeyRequest>,
  output: __S(496, __c62, 0) as any as S.Schema<UsagePlanKey>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsagePlanKey",
}));

export type GetUsagePlanKeysError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets all the usage plan keys representing the API keys added to a specified usage plan.
 */
export const getUsagePlanKeys: API.PaginatedOperationMethod<
  GetUsagePlanKeysRequest,
  UsagePlanKeys,
  GetUsagePlanKeysError,
  Credentials | HttpClient.HttpClient,
  UsagePlanKey
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1184, __c148, 0) as any as S.Schema<GetUsagePlanKeysRequest>,
  output: __S(1186, __c148, 2) as any as S.Schema<UsagePlanKeys>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsagePlanKeys",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetUsagePlansError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets all the usage plans of the caller's account.
 */
export const getUsagePlans: API.PaginatedOperationMethod<
  GetUsagePlansRequest,
  UsagePlans,
  GetUsagePlansError,
  Credentials | HttpClient.HttpClient,
  UsagePlan
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1192, __c149, 0) as any as S.Schema<GetUsagePlansRequest>,
  output: __S(1194, __c149, 2) as any as S.Schema<UsagePlans>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsagePlans",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type GetVpcLinkError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a specified VPC link under the caller's account in a region.
 */
export const getVpcLink: API.OperationMethod<
  GetVpcLinkRequest,
  VpcLink,
  GetVpcLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1200, __c150, 0) as any as S.Schema<GetVpcLinkRequest>,
  output: __S(512, __c64, 0) as any as S.Schema<VpcLink>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVpcLink",
}));

export type GetVpcLinksError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the VpcLinks collection under the caller's account in a selected region.
 */
export const getVpcLinks: API.PaginatedOperationMethod<
  GetVpcLinksRequest,
  VpcLinks,
  GetVpcLinksError,
  Credentials | HttpClient.HttpClient,
  VpcLink
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1208, __c151, 0) as any as S.Schema<GetVpcLinksRequest>,
  output: __S(1210, __c151, 2) as any as S.Schema<VpcLinks>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVpcLinks",
  pagination: {
    inputToken: "position",
    outputToken: "position",
    items: "items",
    pageSize: "limit",
  } as const,
})) as any;

export type ImportApiKeysError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Import API keys from an external source, such as a CSV-formatted file.
 */
export const importApiKeys: API.OperationMethod<
  ImportApiKeysRequest,
  ApiKeyIds,
  ImportApiKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c152, 0) as any as S.Schema<ImportApiKeysRequest>,
  output: __S(1224, __c153, 0) as any as S.Schema<ApiKeyIds>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportApiKeys",
}));

export type ImportDocumentationPartsError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Imports documentation parts
 */
export const importDocumentationParts: API.OperationMethod<
  ImportDocumentationPartsRequest,
  DocumentationPartIds,
  ImportDocumentationPartsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1232, __c154, 0) as any as S.Schema<ImportDocumentationPartsRequest>,
  output: __S(1224, __c153, 0) as any as S.Schema<DocumentationPartIds>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportDocumentationParts",
}));

export type ImportRestApiError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * A feature of the API Gateway control service for creating a new API from an external API definition file.
 */
export const importRestApi: API.OperationMethod<
  ImportRestApiRequest,
  RestApi,
  ImportRestApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1240, __c155, 0) as any as S.Schema<ImportRestApiRequest>,
  output: __S(440, __c55, 0) as any as S.Schema<RestApi>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportRestApi",
}));

export type PutGatewayResponseError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a customization of a GatewayResponse of a specified response type and status code on the given RestApi.
 */
export const putGatewayResponse: API.OperationMethod<
  PutGatewayResponseRequest,
  GatewayResponse,
  PutGatewayResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c156, 0) as any as S.Schema<PutGatewayResponseRequest>,
  output: __S(912, __c114, 0) as any as S.Schema<GatewayResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutGatewayResponse",
}));

export type PutIntegrationError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Sets up a method's integration.
 */
export const putIntegration: API.OperationMethod<
  PutIntegrationRequest,
  Integration,
  PutIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1256, __c157, 0) as any as S.Schema<PutIntegrationRequest>,
  output: __S(402, __c50, 2) as any as S.Schema<Integration>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutIntegration",
}));

export type PutIntegrationResponseError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Represents a put integration.
 */
export const putIntegrationResponse: API.OperationMethod<
  PutIntegrationResponseRequest,
  IntegrationResponse,
  PutIntegrationResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<PutIntegrationResponseRequest>,
  output: __S(392, __c49, 0) as any as S.Schema<IntegrationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutIntegrationResponse",
}));

export type PutMethodError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Add a method to an existing Resource resource.
 */
export const putMethod: API.OperationMethod<
  PutMethodRequest,
  Method,
  PutMethodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<PutMethodRequest>,
  output: __S(417, __c52, 1) as any as S.Schema<Method>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMethod",
}));

export type PutMethodResponseError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds a MethodResponse to an existing Method resource.
 */
export const putMethodResponse: API.OperationMethod<
  PutMethodResponseRequest,
  MethodResponse,
  PutMethodResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<PutMethodResponseRequest>,
  output: __S(409, __c51, 1) as any as S.Schema<MethodResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMethodResponse",
}));

export type PutRestApiError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * A feature of the API Gateway control service for updating an existing API with an input of external API definitions.
 * The update can take the form of merging the supplied definition into the existing API or overwriting the existing API.
 */
export const putRestApi: API.OperationMethod<
  PutRestApiRequest,
  RestApi,
  PutRestApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<PutRestApiRequest>,
  output: __S(440, __c55, 0) as any as S.Schema<RestApi>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRestApi",
}));

export type RejectDomainNameAccessAssociationError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Rejects a domain name access association with a private custom domain name.
 *
 * To reject a domain name access association with an access association source in another AWS account, use this operation. To remove a domain name access association with an access association source in your own account, use the DeleteDomainNameAccessAssociation operation.
 */
export const rejectDomainNameAccessAssociation: API.OperationMethod<
  RejectDomainNameAccessAssociationRequest,
  RejectDomainNameAccessAssociationResponse,
  RejectDomainNameAccessAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<RejectDomainNameAccessAssociationRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<RejectDomainNameAccessAssociationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectDomainNameAccessAssociation",
}));

export type TagResourceError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds or updates a tag on a given resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TestInvokeAuthorizerError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Simulate the execution of an Authorizer in your RestApi with headers, parameters, and an incoming request body.
 */
export const testInvokeAuthorizer: API.OperationMethod<
  TestInvokeAuthorizerRequest,
  TestInvokeAuthorizerResponse,
  TestInvokeAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<TestInvokeAuthorizerRequest>,
  output: __S(65, __c8, 1) as any as S.Schema<TestInvokeAuthorizerResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestInvokeAuthorizer",
}));

export type TestInvokeMethodError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Simulate the invocation of a Method in your RestApi with headers, parameters, and an incoming request body.
 */
export const testInvokeMethod: API.OperationMethod<
  TestInvokeMethodRequest,
  TestInvokeMethodResponse,
  TestInvokeMethodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<TestInvokeMethodRequest>,
  output: __S(81, __c10, 1) as any as S.Schema<TestInvokeMethodResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestInvokeMethod",
}));

export type UntagResourceError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes a tag from a given resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAccountError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Changes information about the current Account resource.
 */
export const updateAccount: API.OperationMethod<
  UpdateAccountRequest,
  Account,
  UpdateAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<UpdateAccountRequest>,
  output: __S(744, __c93, 0) as any as S.Schema<Account>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccount",
}));

export type UpdateApiKeyError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Changes information about an ApiKey resource.
 */
export const updateApiKey: API.OperationMethod<
  UpdateApiKeyRequest,
  ApiKey,
  UpdateApiKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<UpdateApiKeyRequest>,
  output: __S(952, __c119, 0) as any as S.Schema<ApiKey>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApiKey",
}));

export type UpdateAuthorizerError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an existing Authorizer resource.
 */
export const updateAuthorizer: API.OperationMethod<
  UpdateAuthorizerRequest,
  Authorizer,
  UpdateAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<UpdateAuthorizerRequest>,
  output: __S(1056, __c132, 0) as any as S.Schema<Authorizer>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAuthorizer",
}));

export type UpdateBasePathMappingError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Changes information about the BasePathMapping resource.
 */
export const updateBasePathMapping: API.OperationMethod<
  UpdateBasePathMappingRequest,
  BasePathMapping,
  UpdateBasePathMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<UpdateBasePathMappingRequest>,
  output: __S(1168, __c146, 0) as any as S.Schema<BasePathMapping>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBasePathMapping",
}));

export type UpdateClientCertificateError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Changes information about an ClientCertificate resource.
 */
export const updateClientCertificate: API.OperationMethod<
  UpdateClientCertificateRequest,
  ClientCertificate,
  UpdateClientCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<UpdateClientCertificateRequest>,
  output: __S(728, __c91, 0) as any as S.Schema<ClientCertificate>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateClientCertificate",
}));

export type UpdateDeploymentError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Changes information about a Deployment resource.
 */
export const updateDeployment: API.OperationMethod<
  UpdateDeploymentRequest,
  Deployment,
  UpdateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<UpdateDeploymentRequest>,
  output: __S(11, __c1, 3) as any as S.Schema<Deployment>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeployment",
}));

export type UpdateDocumentationPartError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a documentation part.
 */
export const updateDocumentationPart: API.OperationMethod<
  UpdateDocumentationPartRequest,
  DocumentationPart,
  UpdateDocumentationPartError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<UpdateDocumentationPartRequest>,
  output: __S(121, __c15, 1) as any as S.Schema<DocumentationPart>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDocumentationPart",
}));

export type UpdateDocumentationVersionError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a documentation version.
 */
export const updateDocumentationVersion: API.OperationMethod<
  UpdateDocumentationVersionRequest,
  DocumentationVersion,
  UpdateDocumentationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<UpdateDocumentationVersionRequest>,
  output: __S(216, __c27, 0) as any as S.Schema<DocumentationVersion>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDocumentationVersion",
}));

export type UpdateDomainNameError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Changes information about the DomainName resource.
 */
export const updateDomainName: API.OperationMethod<
  UpdateDomainNameRequest,
  DomainName,
  UpdateDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<UpdateDomainNameRequest>,
  output: __S(321, __c40, 1) as any as S.Schema<DomainName>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainName",
}));

export type UpdateGatewayResponseError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a GatewayResponse of a specified response type on the given RestApi.
 */
export const updateGatewayResponse: API.OperationMethod<
  UpdateGatewayResponseRequest,
  GatewayResponse,
  UpdateGatewayResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<UpdateGatewayResponseRequest>,
  output: __S(912, __c114, 0) as any as S.Schema<GatewayResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGatewayResponse",
}));

export type UpdateIntegrationError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Represents an update integration.
 */
export const updateIntegration: API.OperationMethod<
  UpdateIntegrationRequest,
  Integration,
  UpdateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<UpdateIntegrationRequest>,
  output: __S(402, __c50, 2) as any as S.Schema<Integration>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIntegration",
}));

export type UpdateIntegrationResponseError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Represents an update integration response.
 */
export const updateIntegrationResponse: API.OperationMethod<
  UpdateIntegrationResponseRequest,
  IntegrationResponse,
  UpdateIntegrationResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<UpdateIntegrationResponseRequest>,
  output: __S(392, __c49, 0) as any as S.Schema<IntegrationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIntegrationResponse",
}));

export type UpdateMethodError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an existing Method resource.
 */
export const updateMethod: API.OperationMethod<
  UpdateMethodRequest,
  Method,
  UpdateMethodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<UpdateMethodRequest>,
  output: __S(417, __c52, 1) as any as S.Schema<Method>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMethod",
}));

export type UpdateMethodResponseError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an existing MethodResponse resource.
 */
export const updateMethodResponse: API.OperationMethod<
  UpdateMethodResponseRequest,
  MethodResponse,
  UpdateMethodResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<UpdateMethodResponseRequest>,
  output: __S(409, __c51, 1) as any as S.Schema<MethodResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMethodResponse",
}));

export type UpdateModelError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Changes information about a model. The maximum size of the model is 400 KB.
 */
export const updateModel: API.OperationMethod<
  UpdateModelRequest,
  Model,
  UpdateModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<UpdateModelRequest>,
  output: __S(360, __c45, 0) as any as S.Schema<Model>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateModel",
}));

export type UpdateRequestValidatorError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a RequestValidator of a given RestApi.
 */
export const updateRequestValidator: API.OperationMethod<
  UpdateRequestValidatorRequest,
  RequestValidator,
  UpdateRequestValidatorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<UpdateRequestValidatorRequest>,
  output: __S(376, __c47, 0) as any as S.Schema<RequestValidator>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRequestValidator",
}));

export type UpdateResourceError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Changes information about a Resource resource.
 */
export const updateResource: API.OperationMethod<
  UpdateResourceRequest,
  Resource,
  UpdateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<UpdateResourceRequest>,
  output: __S(425, __c53, 1) as any as S.Schema<Resource>,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResource",
}));

export type UpdateRestApiError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Changes information about the specified API.
 */
export const updateRestApi: API.OperationMethod<
  UpdateRestApiRequest,
  RestApi,
  UpdateRestApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<UpdateRestApiRequest>,
  output: __S(440, __c55, 0) as any as S.Schema<RestApi>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRestApi",
}));

export type UpdateStageError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Changes information about a Stage resource.
 */
export const updateStage: API.OperationMethod<
  UpdateStageRequest,
  Stage,
  UpdateStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<UpdateStageRequest>,
  output: __S(460, __c57, 4) as any as S.Schema<Stage>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStage",
}));

export type UpdateUsageError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Grants a temporary extension to the remaining quota of a usage plan associated with a specified API key.
 */
export const updateUsage: API.OperationMethod<
  UpdateUsageRequest,
  Usage,
  UpdateUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<UpdateUsageRequest>,
  output: __S(1147, __c143, 3) as any as S.Schema<Usage>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUsage",
}));

export type UpdateUsagePlanError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a usage plan of a given plan Id.
 */
export const updateUsagePlan: API.OperationMethod<
  UpdateUsagePlanRequest,
  UsagePlan,
  UpdateUsagePlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<UpdateUsagePlanRequest>,
  output: __S(484, __c60, 4) as any as S.Schema<UsagePlan>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUsagePlan",
}));

export type UpdateVpcLinkError =
  | BadRequestException
  | ConflictException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an existing VpcLink of a specified identifier.
 */
export const updateVpcLink: API.OperationMethod<
  UpdateVpcLinkRequest,
  VpcLink,
  UpdateVpcLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(328, __c41, 0) as any as S.Schema<UpdateVpcLinkRequest>,
  output: __S(512, __c64, 0) as any as S.Schema<VpcLink>,
  errors: [
    BadRequestException,
    ConflictException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVpcLink",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          percentTraffic: S.optional(S.Number),
          stageVariableOverrides: S.optional(__S(944, __c118, 0)),
          useStageCache: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DeploymentCanarySettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          stageName: S.optional(S.String),
          stageDescription: S.optional(S.String),
          description: S.optional(S.String),
          cacheClusterEnabled: S.optional(S.Boolean),
          cacheClusterSize: S.optional(S.String),
          variables: S.optional(__S(944, __c118, 0)),
          canarySettings: S.optional(__S(0, __c0, 0)),
          tracingEnabled: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/restapis/{restApiId}/deployments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDeploymentRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          authorizationType: S.optional(S.String),
          apiKeyRequired: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "MethodSnapshot" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(8, __c1, 0).pipe(S.optional));
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(9, __c1, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          description: S.optional(S.String),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          apiSummary: S.optional(__S(10, __c1, 2)),
        }),
      ).annotate({ identifier: "Deployment" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
          statusCode: S.String.pipe(T.HttpLabel("statusCode")),
          selectionPattern: S.optional(S.String),
          responseParameters: S.optional(__S(944, __c118, 0)),
          responseTemplates: S.optional(__S(944, __c118, 0)),
          contentHandling: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration/responses/{statusCode}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutIntegrationResponseRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
          authorizationType: S.String,
          authorizerId: S.optional(S.String),
          apiKeyRequired: S.optional(S.Boolean),
          operationName: S.optional(S.String),
          requestParameters: S.optional(__S(408, __c51, 0)),
          requestModels: S.optional(__S(944, __c118, 0)),
          requestValidatorId: S.optional(S.String),
          authorizationScopes: S.optional(__S(960, __c120, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutMethodRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
          statusCode: S.String.pipe(T.HttpLabel("statusCode")),
          responseParameters: S.optional(__S(408, __c51, 0)),
          responseModels: S.optional(__S(944, __c118, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/responses/{statusCode}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutMethodResponseRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          mode: S.optional(S.String).pipe(T.HttpQuery("mode")),
          failOnWarnings: S.optional(S.Boolean).pipe(T.HttpQuery("failonwarnings")),
          parameters: S.optional(__S(944, __c118, 0)).pipe(T.HttpQueryParams()),
          body: T.StreamingInput.pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/restapis/{restApiId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutRestApiRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainNameAccessAssociationArn: S.String.pipe(
            T.HttpQuery("domainNameAccessAssociationArn"),
          ),
          domainNameArn: S.String.pipe(T.HttpQuery("domainNameArn")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/rejectdomainnameaccessassociations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RejectDomainNameAccessAssociationRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(944, __c118, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          authorizerId: S.String.pipe(T.HttpLabel("authorizerId")),
          headers: S.optional(__S(944, __c118, 0)),
          multiValueHeaders: S.optional(__S(72, __c9, 0)),
          pathWithQueryString: S.optional(S.String),
          body: S.optional(S.String),
          stageVariables: S.optional(__S(944, __c118, 0)),
          additionalContext: S.optional(__S(944, __c118, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/restapis/{restApiId}/authorizers/{authorizerId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TestInvokeAuthorizerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          clientStatus: S.optional(S.Number),
          log: S.optional(S.String),
          latency: S.optional(S.Number),
          principalId: S.optional(S.String),
          policy: S.optional(S.String),
          authorization: S.optional(__S(72, __c9, 0)),
          claims: S.optional(__S(944, __c118, 0)),
        }),
      ).annotate({ identifier: "TestInvokeAuthorizerResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(960, __c120, 0).pipe(S.optional));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
          pathWithQueryString: S.optional(S.String),
          body: S.optional(S.String),
          headers: S.optional(__S(944, __c118, 0)),
          multiValueHeaders: S.optional(__S(72, __c9, 0)),
          clientCertificateId: S.optional(S.String),
          stageVariables: S.optional(__S(944, __c118, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TestInvokeMethodRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.Number),
          body: S.optional(S.String),
          headers: S.optional(__S(944, __c118, 0)),
          multiValueHeaders: S.optional(__S(72, __c9, 0)),
          log: S.optional(S.String),
          latency: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TestInvokeMethodResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(960, __c120, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ patchOperations: S.optional(__S(105, __c13, 1)) }).pipe(
          T.all(T.Http({ method: "PATCH", uri: "/account" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateAccountRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          op: S.optional(S.String),
          path: S.optional(S.String),
          value: S.optional(S.String),
          from: S.optional(S.String),
        }),
      ).annotate({ identifier: "PatchOperation" });
    case 1:
      return S.Array(__S(104, __c13, 0));
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          location: __S(120, __c15, 0),
          properties: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/restapis/{restApiId}/documentation/parts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDocumentationPartRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          path: S.optional(S.String),
          method: S.optional(S.String),
          statusCode: S.optional(S.String),
          name: S.optional(S.String),
        }),
      ).annotate({ identifier: "DocumentationPartLocation" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          location: S.optional(__S(120, __c15, 0)),
          properties: S.optional(S.String),
        }),
      ).annotate({ identifier: "DocumentationPart" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          apiKey: S.String.pipe(T.HttpLabel("apiKey")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/apikeys/{apiKey}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateApiKeyRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          authorizerId: S.String.pipe(T.HttpLabel("authorizerId")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/restapis/{restApiId}/authorizers/{authorizerId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAuthorizerRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainName: S.String.pipe(T.HttpLabel("domainName")),
          domainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
          basePath: S.String.pipe(T.HttpLabel("basePath")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/domainnames/{domainName}/basepathmappings/{basePath}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateBasePathMappingRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientCertificateId: S.String.pipe(T.HttpLabel("clientCertificateId")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/clientcertificates/{clientCertificateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateClientCertificateRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          deploymentId: S.String.pipe(T.HttpLabel("deploymentId")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/restapis/{restApiId}/deployments/{deploymentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDeploymentRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          documentationPartId: S.String.pipe(T.HttpLabel("documentationPartId")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/restapis/{restApiId}/documentation/parts/{documentationPartId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDocumentationPartRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          documentationVersion: S.String.pipe(T.HttpLabel("documentationVersion")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/restapis/{restApiId}/documentation/versions/{documentationVersion}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDocumentationVersionRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainName: S.String.pipe(T.HttpLabel("domainName")),
          domainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/domainnames/{domainName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDomainNameRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          responseType: S.String.pipe(T.HttpLabel("responseType")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/restapis/{restApiId}/gatewayresponses/{responseType}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateGatewayResponseRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateIntegrationRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          documentationVersion: S.String,
          stageName: S.optional(S.String),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/restapis/{restApiId}/documentation/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDocumentationVersionRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          version: S.optional(S.String),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "DocumentationVersion" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
          statusCode: S.String.pipe(T.HttpLabel("statusCode")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration/responses/{statusCode}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateIntegrationResponseRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMethodRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
          statusCode: S.String.pipe(T.HttpLabel("statusCode")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/responses/{statusCode}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMethodResponseRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          modelName: S.String.pipe(T.HttpLabel("modelName")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/restapis/{restApiId}/models/{modelName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateModelRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          requestValidatorId: S.String.pipe(T.HttpLabel("requestValidatorId")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/restapis/{restApiId}/requestvalidators/{requestValidatorId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRequestValidatorRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/restapis/{restApiId}/resources/{resourceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateResourceRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/restapis/{restApiId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRestApiRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          stageName: S.String.pipe(T.HttpLabel("stageName")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/restapis/{restApiId}/stages/{stageName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateStageRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          usagePlanId: S.String.pipe(T.HttpLabel("usagePlanId")),
          keyId: S.String.pipe(T.HttpLabel("keyId")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/usageplans/{usagePlanId}/keys/{keyId}/usage" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateUsageRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          usagePlanId: S.String.pipe(T.HttpLabel("usagePlanId")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/usageplans/{usagePlanId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateUsagePlanRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ truststoreUri: S.optional(S.String), truststoreVersion: S.optional(S.String) }),
      ).annotate({ identifier: "MutualTlsAuthenticationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainName: S.String,
          certificateName: S.optional(S.String),
          certificateBody: S.optional(S.String),
          certificatePrivateKey: S.optional(S.String),
          certificateChain: S.optional(S.String),
          certificateArn: S.optional(S.String),
          regionalCertificateName: S.optional(S.String),
          regionalCertificateArn: S.optional(S.String),
          endpointConfiguration: S.optional(__S(313, __c39, 1)),
          tags: S.optional(__S(944, __c118, 0)),
          securityPolicy: S.optional(S.String),
          endpointAccessMode: S.optional(S.String),
          mutualTlsAuthentication: S.optional(__S(304, __c38, 0)),
          ownershipVerificationCertificateArn: S.optional(S.String),
          policy: S.optional(S.String),
          routingMode: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/domainnames" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateDomainNameRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          types: S.optional(__S(312, __c39, 0)),
          ipAddressType: S.optional(S.String),
          vpcEndpointIds: S.optional(__S(960, __c120, 0)),
        }),
      ).annotate({ identifier: "EndpointConfiguration" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          truststoreUri: S.optional(S.String),
          truststoreVersion: S.optional(S.String),
          truststoreWarnings: S.optional(__S(960, __c120, 0)),
        }),
      ).annotate({ identifier: "MutualTlsAuthentication" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainName: S.optional(S.String),
          domainNameId: S.optional(S.String),
          domainNameArn: S.optional(S.String),
          certificateName: S.optional(S.String),
          certificateArn: S.optional(S.String),
          certificateUploadDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          regionalDomainName: S.optional(S.String),
          regionalHostedZoneId: S.optional(S.String),
          regionalCertificateName: S.optional(S.String),
          regionalCertificateArn: S.optional(S.String),
          distributionDomainName: S.optional(S.String),
          distributionHostedZoneId: S.optional(S.String),
          endpointConfiguration: S.optional(__S(313, __c39, 1)),
          domainNameStatus: S.optional(S.String),
          domainNameStatusMessage: S.optional(S.String),
          securityPolicy: S.optional(S.String),
          endpointAccessMode: S.optional(S.String),
          tags: S.optional(__S(944, __c118, 0)),
          mutualTlsAuthentication: S.optional(__S(320, __c40, 0)),
          ownershipVerificationCertificateArn: S.optional(S.String),
          managementPolicy: S.optional(S.String),
          policy: S.optional(S.String),
          routingMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "DomainName" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vpcLinkId: S.String.pipe(T.HttpLabel("vpcLinkId")),
          patchOperations: S.optional(__S(105, __c13, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/vpclinks/{vpcLinkId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateVpcLinkRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainNameArn: S.String,
          accessAssociationSourceType: S.String,
          accessAssociationSource: S.String,
          tags: S.optional(__S(944, __c118, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domainnameaccessassociations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDomainNameAccessAssociationRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainNameAccessAssociationArn: S.optional(S.String),
          domainNameArn: S.optional(S.String),
          accessAssociationSourceType: S.optional(S.String),
          accessAssociationSource: S.optional(S.String),
          tags: S.optional(__S(944, __c118, 0)),
        }),
      ).annotate({ identifier: "DomainNameAccessAssociation" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          name: S.String,
          description: S.optional(S.String),
          schema: S.optional(S.String),
          contentType: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/restapis/{restApiId}/models" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateModelRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          schema: S.optional(S.String),
          contentType: S.optional(S.String),
        }),
      ).annotate({ identifier: "Model" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          name: S.optional(S.String),
          validateRequestBody: S.optional(S.Boolean),
          validateRequestParameters: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/restapis/{restApiId}/requestvalidators" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRequestValidatorRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          validateRequestBody: S.optional(S.Boolean),
          validateRequestParameters: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "RequestValidator" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          parentId: S.String.pipe(T.HttpLabel("parentId")),
          pathPart: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/restapis/{restApiId}/resources/{parentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateResourceRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          statusCode: S.optional(S.String),
          selectionPattern: S.optional(S.String),
          responseParameters: S.optional(__S(944, __c118, 0)),
          responseTemplates: S.optional(__S(944, __c118, 0)),
          contentHandling: S.optional(S.String),
        }),
      ).annotate({ identifier: "IntegrationResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(392, __c49, 0).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({ insecureSkipVerification: S.optional(S.Boolean) }),
      ).annotate({ identifier: "TlsConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          httpMethod: S.optional(S.String),
          uri: S.optional(S.String),
          connectionType: S.optional(S.String),
          connectionId: S.optional(S.String),
          credentials: S.optional(S.String),
          requestParameters: S.optional(__S(944, __c118, 0)),
          requestTemplates: S.optional(__S(944, __c118, 0)),
          passthroughBehavior: S.optional(S.String),
          contentHandling: S.optional(S.String),
          timeoutInMillis: S.optional(S.Number),
          cacheNamespace: S.optional(S.String),
          cacheKeyParameters: S.optional(__S(960, __c120, 0)),
          integrationResponses: S.optional(__S(400, __c50, 0)),
          tlsConfig: S.optional(__S(401, __c50, 1)),
          responseTransferMode: S.optional(S.String),
          integrationTarget: S.optional(S.String),
        }),
      ).annotate({ identifier: "Integration" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Boolean.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          statusCode: S.optional(S.String),
          responseParameters: S.optional(__S(408, __c51, 0)),
          responseModels: S.optional(__S(944, __c118, 0)),
        }),
      ).annotate({ identifier: "MethodResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(409, __c51, 1).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          httpMethod: S.optional(S.String),
          authorizationType: S.optional(S.String),
          authorizerId: S.optional(S.String),
          apiKeyRequired: S.optional(S.Boolean),
          requestValidatorId: S.optional(S.String),
          operationName: S.optional(S.String),
          requestParameters: S.optional(__S(408, __c51, 0)),
          requestModels: S.optional(__S(944, __c118, 0)),
          methodResponses: S.optional(__S(416, __c52, 0)),
          methodIntegration: S.optional(__S(402, __c50, 2)),
          authorizationScopes: S.optional(__S(960, __c120, 0)),
        }),
      ).annotate({ identifier: "Method" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(417, __c52, 1).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          parentId: S.optional(S.String),
          pathPart: S.optional(S.String),
          path: S.optional(S.String),
          resourceMethods: S.optional(__S(424, __c53, 0)),
        }),
      ).annotate({ identifier: "Resource" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          version: S.optional(S.String),
          cloneFrom: S.optional(S.String),
          binaryMediaTypes: S.optional(__S(960, __c120, 0)),
          minimumCompressionSize: S.optional(S.Number),
          apiKeySource: S.optional(S.String),
          endpointConfiguration: S.optional(__S(313, __c39, 1)),
          policy: S.optional(S.String),
          tags: S.optional(__S(944, __c118, 0)),
          disableExecuteApiEndpoint: S.optional(S.Boolean),
          securityPolicy: S.optional(S.String),
          endpointAccessMode: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/restapis" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRestApiRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          version: S.optional(S.String),
          warnings: S.optional(__S(960, __c120, 0)),
          binaryMediaTypes: S.optional(__S(960, __c120, 0)),
          minimumCompressionSize: S.optional(S.Number),
          apiKeySource: S.optional(S.String),
          endpointConfiguration: S.optional(__S(313, __c39, 1)),
          policy: S.optional(S.String),
          tags: S.optional(__S(944, __c118, 0)),
          disableExecuteApiEndpoint: S.optional(S.Boolean),
          rootResourceId: S.optional(S.String),
          securityPolicy: S.optional(S.String),
          endpointAccessMode: S.optional(S.String),
          apiStatus: S.optional(S.String),
          apiStatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "RestApi" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          stageName: S.String,
          deploymentId: S.String,
          description: S.optional(S.String),
          cacheClusterEnabled: S.optional(S.Boolean),
          cacheClusterSize: S.optional(S.String),
          variables: S.optional(__S(944, __c118, 0)),
          documentationVersion: S.optional(S.String),
          canarySettings: S.optional(__S(456, __c57, 0)),
          tracingEnabled: S.optional(S.Boolean),
          tags: S.optional(__S(944, __c118, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/restapis/{restApiId}/stages" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateStageRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          percentTraffic: S.optional(S.Number),
          deploymentId: S.optional(S.String),
          stageVariableOverrides: S.optional(__S(944, __c118, 0)),
          useStageCache: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CanarySettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          metricsEnabled: S.optional(S.Boolean),
          loggingLevel: S.optional(S.String),
          dataTraceEnabled: S.optional(S.Boolean),
          throttlingBurstLimit: S.optional(S.Number),
          throttlingRateLimit: S.optional(S.Number),
          cachingEnabled: S.optional(S.Boolean),
          cacheTtlInSeconds: S.optional(S.Number),
          cacheDataEncrypted: S.optional(S.Boolean),
          requireAuthorizationForCacheControl: S.optional(S.Boolean),
          unauthorizedCacheControlHeaderStrategy: S.optional(S.String),
        }),
      ).annotate({ identifier: "MethodSetting" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(457, __c57, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({ format: S.optional(S.String), destinationArn: S.optional(S.String) }),
      ).annotate({ identifier: "AccessLogSettings" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.optional(S.String),
          clientCertificateId: S.optional(S.String),
          stageName: S.optional(S.String),
          description: S.optional(S.String),
          cacheClusterEnabled: S.optional(S.Boolean),
          cacheClusterSize: S.optional(S.String),
          cacheClusterStatus: S.optional(S.String),
          methodSettings: S.optional(__S(458, __c57, 2)),
          variables: S.optional(__S(944, __c118, 0)),
          documentationVersion: S.optional(S.String),
          accessLogSettings: S.optional(__S(459, __c57, 3)),
          canarySettings: S.optional(__S(456, __c57, 0)),
          tracingEnabled: S.optional(S.Boolean),
          webAclArn: S.optional(S.String),
          tags: S.optional(__S(944, __c118, 0)),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Stage" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          apiStages: S.optional(__S(482, __c60, 2)),
          throttle: S.optional(__S(472, __c59, 0)),
          quota: S.optional(__S(483, __c60, 3)),
          tags: S.optional(__S(944, __c118, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/usageplans" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateUsagePlanRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ burstLimit: S.optional(S.Number), rateLimit: S.optional(S.Number) }),
      ).annotate({ identifier: "ThrottleSettings" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(472, __c59, 0).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          apiId: S.optional(S.String),
          stage: S.optional(S.String),
          throttle: S.optional(__S(480, __c60, 0)),
        }),
      ).annotate({ identifier: "ApiStage" });
    case 2:
      return S.Array(__S(481, __c60, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          limit: S.optional(S.Number),
          offset: S.optional(S.Number),
          period: S.optional(S.String),
        }),
      ).annotate({ identifier: "QuotaSettings" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          apiStages: S.optional(__S(482, __c60, 2)),
          throttle: S.optional(__S(472, __c59, 0)),
          quota: S.optional(__S(483, __c60, 3)),
          productCode: S.optional(S.String),
          tags: S.optional(__S(944, __c118, 0)),
        }),
      ).annotate({ identifier: "UsagePlan" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          usagePlanId: S.String.pipe(T.HttpLabel("usagePlanId")),
          keyId: S.String,
          keyType: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/usageplans/{usagePlanId}/keys" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateUsagePlanKeyRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          type: S.optional(S.String),
          value: S.optional(S.String),
          name: S.optional(S.String),
        }),
      ).annotate({ identifier: "UsagePlanKey" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          targetArns: __S(960, __c120, 0),
          tags: S.optional(__S(944, __c118, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/vpclinks" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateVpcLinkRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          targetArns: S.optional(__S(960, __c120, 0)),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          tags: S.optional(__S(944, __c118, 0)),
        }),
      ).annotate({ identifier: "VpcLink" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ apiKey: S.String.pipe(T.HttpLabel("apiKey")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/apikeys/{apiKey}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteApiKeyRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteApiKeyResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          authorizerId: S.String.pipe(T.HttpLabel("authorizerId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/restapis/{restApiId}/authorizers/{authorizerId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAuthorizerRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainName: S.String.pipe(T.HttpLabel("domainName")),
          domainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
          basePath: S.String.pipe(T.HttpLabel("basePath")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/domainnames/{domainName}/basepathmappings/{basePath}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBasePathMappingRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ clientCertificateId: S.String.pipe(T.HttpLabel("clientCertificateId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/clientcertificates/{clientCertificateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteClientCertificateRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          deploymentId: S.String.pipe(T.HttpLabel("deploymentId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/restapis/{restApiId}/deployments/{deploymentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDeploymentRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          documentationPartId: S.String.pipe(T.HttpLabel("documentationPartId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/restapis/{restApiId}/documentation/parts/{documentationPartId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDocumentationPartRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          documentationVersion: S.String.pipe(T.HttpLabel("documentationVersion")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/restapis/{restApiId}/documentation/versions/{documentationVersion}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDocumentationVersionRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainName: S.String.pipe(T.HttpLabel("domainName")),
          domainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/domainnames/{domainName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDomainNameRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainNameAccessAssociationArn: S.String.pipe(
            T.HttpLabel("domainNameAccessAssociationArn"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/domainnameaccessassociations/{domainNameAccessAssociationArn}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDomainNameAccessAssociationRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          responseType: S.String.pipe(T.HttpLabel("responseType")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/restapis/{restApiId}/gatewayresponses/{responseType}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteGatewayResponseRequest" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteIntegrationRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
          statusCode: S.String.pipe(T.HttpLabel("statusCode")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration/responses/{statusCode}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteIntegrationResponseRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMethodRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
          statusCode: S.String.pipe(T.HttpLabel("statusCode")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/responses/{statusCode}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMethodResponseRequest" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          modelName: S.String.pipe(T.HttpLabel("modelName")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/restapis/{restApiId}/models/{modelName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteModelRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          requestValidatorId: S.String.pipe(T.HttpLabel("requestValidatorId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/restapis/{restApiId}/requestvalidators/{requestValidatorId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRequestValidatorRequest" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/restapis/{restApiId}/resources/{resourceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteResourceRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ restApiId: S.String.pipe(T.HttpLabel("restApiId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/restapis/{restApiId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRestApiRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          stageName: S.String.pipe(T.HttpLabel("stageName")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/restapis/{restApiId}/stages/{stageName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteStageRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ usagePlanId: S.String.pipe(T.HttpLabel("usagePlanId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/usageplans/{usagePlanId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteUsagePlanRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          usagePlanId: S.String.pipe(T.HttpLabel("usagePlanId")),
          keyId: S.String.pipe(T.HttpLabel("keyId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/usageplans/{usagePlanId}/keys/{keyId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteUsagePlanKeyRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ vpcLinkId: S.String.pipe(T.HttpLabel("vpcLinkId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/vpclinks/{vpcLinkId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVpcLinkRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          stageName: S.String.pipe(T.HttpLabel("stageName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/restapis/{restApiId}/stages/{stageName}/cache/authorizers",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "FlushStageAuthorizersCacheRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          stageName: S.String.pipe(T.HttpLabel("stageName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/restapis/{restApiId}/stages/{stageName}/cache/data",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "FlushStageCacheRequest" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ description: S.optional(S.String), tags: S.optional(__S(944, __c118, 0)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/clientcertificates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GenerateClientCertificateRequest" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientCertificateId: S.optional(S.String),
          description: S.optional(S.String),
          pemEncodedCertificate: S.optional(S.String),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          expirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(944, __c118, 0)),
        }),
      ).annotate({ identifier: "ClientCertificate" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/account" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAccountRequest" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cloudwatchRoleArn: S.optional(S.String),
          throttleSettings: S.optional(__S(472, __c59, 0)),
          features: S.optional(__S(960, __c120, 0)),
          apiKeyVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "Account" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          apiKey: S.String.pipe(T.HttpLabel("apiKey")),
          includeValue: S.optional(S.Boolean).pipe(T.HttpQuery("includeValue")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/apikeys/{apiKey}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetApiKeyRequest" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          nameQuery: S.optional(S.String).pipe(T.HttpQuery("name")),
          customerId: S.optional(S.String).pipe(T.HttpQuery("customerId")),
          includeValues: S.optional(S.Boolean).pipe(T.HttpQuery("includeValues")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/apikeys" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetApiKeysRequest" });
    case 1:
      return S.Array(__S(952, __c119, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          warnings: S.optional(__S(960, __c120, 0)),
          items: S.optional(__S(761, __c95, 1)),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
        }).pipe(S.encodeKeys({ items: "item" })),
      ).annotate({ identifier: "ApiKeys" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          authorizerId: S.String.pipe(T.HttpLabel("authorizerId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restapis/{restApiId}/authorizers/{authorizerId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAuthorizerRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restapis/{restApiId}/authorizers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAuthorizersRequest" });
    case 1:
      return S.Array(__S(1056, __c132, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(777, __c97, 1)),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
        }).pipe(S.encodeKeys({ items: "item" })),
      ).annotate({ identifier: "Authorizers" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainName: S.String.pipe(T.HttpLabel("domainName")),
          domainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
          basePath: S.String.pipe(T.HttpLabel("basePath")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domainnames/{domainName}/basepathmappings/{basePath}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBasePathMappingRequest" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainName: S.String.pipe(T.HttpLabel("domainName")),
          domainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domainnames/{domainName}/basepathmappings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBasePathMappingsRequest" });
    case 1:
      return S.Array(__S(1168, __c146, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(793, __c99, 1)),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
        }).pipe(S.encodeKeys({ items: "item" })),
      ).annotate({ identifier: "BasePathMappings" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ clientCertificateId: S.String.pipe(T.HttpLabel("clientCertificateId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/clientcertificates/{clientCertificateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetClientCertificateRequest" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/clientcertificates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetClientCertificatesRequest" });
    case 1:
      return S.Array(__S(728, __c91, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(809, __c101, 1)),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
        }).pipe(S.encodeKeys({ items: "item" })),
      ).annotate({ identifier: "ClientCertificates" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          deploymentId: S.String.pipe(T.HttpLabel("deploymentId")),
          embed: S.optional(__S(960, __c120, 0)).pipe(T.HttpQuery("embed")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restapis/{restApiId}/deployments/{deploymentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDeploymentRequest" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restapis/{restApiId}/deployments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDeploymentsRequest" });
    case 1:
      return S.Array(__S(11, __c1, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(825, __c103, 1)),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
        }).pipe(S.encodeKeys({ items: "item" })),
      ).annotate({ identifier: "Deployments" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          documentationPartId: S.String.pipe(T.HttpLabel("documentationPartId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/restapis/{restApiId}/documentation/parts/{documentationPartId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDocumentationPartRequest" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          type: S.optional(S.String).pipe(T.HttpQuery("type")),
          nameQuery: S.optional(S.String).pipe(T.HttpQuery("name")),
          path: S.optional(S.String).pipe(T.HttpQuery("path")),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          locationStatus: S.optional(S.String).pipe(T.HttpQuery("locationStatus")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restapis/{restApiId}/documentation/parts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDocumentationPartsRequest" });
    case 1:
      return S.Array(__S(121, __c15, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(841, __c105, 1)),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
        }).pipe(S.encodeKeys({ items: "item" })),
      ).annotate({ identifier: "DocumentationParts" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          documentationVersion: S.String.pipe(T.HttpLabel("documentationVersion")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/restapis/{restApiId}/documentation/versions/{documentationVersion}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDocumentationVersionRequest" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restapis/{restApiId}/documentation/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDocumentationVersionsRequest" });
    case 1:
      return S.Array(__S(216, __c27, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(857, __c107, 1)),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
        }).pipe(S.encodeKeys({ items: "item" })),
      ).annotate({ identifier: "DocumentationVersions" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainName: S.String.pipe(T.HttpLabel("domainName")),
          domainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domainnames/{domainName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDomainNameRequest" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          resourceOwner: S.optional(S.String).pipe(T.HttpQuery("resourceOwner")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domainnameaccessassociations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDomainNameAccessAssociationsRequest" });
    case 1:
      return S.Array(__S(344, __c43, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(873, __c109, 1)),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
        }).pipe(S.encodeKeys({ items: "item" })),
      ).annotate({ identifier: "DomainNameAccessAssociations" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          resourceOwner: S.optional(S.String).pipe(T.HttpQuery("resourceOwner")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/domainnames" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDomainNamesRequest" });
    case 1:
      return S.Array(__S(321, __c40, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(881, __c110, 1)),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
        }).pipe(S.encodeKeys({ items: "item" })),
      ).annotate({ identifier: "DomainNames" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          stageName: S.String.pipe(T.HttpLabel("stageName")),
          exportType: S.String.pipe(T.HttpLabel("exportType")),
          parameters: S.optional(__S(944, __c118, 0)).pipe(T.HttpQueryParams()),
          accepts: S.optional(S.String).pipe(T.HttpHeader("Accept")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/restapis/{restApiId}/stages/{stageName}/exports/{exportType}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetExportRequest" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          contentDisposition: S.optional(S.String).pipe(T.HttpHeader("Content-Disposition")),
          body: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
        }),
      ).annotate({ identifier: "ExportResponse" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          responseType: S.String.pipe(T.HttpLabel("responseType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restapis/{restApiId}/gatewayresponses/{responseType}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGatewayResponseRequest" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          responseType: S.optional(S.String),
          statusCode: S.optional(S.String),
          responseParameters: S.optional(__S(944, __c118, 0)),
          responseTemplates: S.optional(__S(944, __c118, 0)),
          defaultResponse: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GatewayResponse" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restapis/{restApiId}/gatewayresponses" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGatewayResponsesRequest" });
    case 1:
      return S.Array(__S(912, __c114, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(921, __c115, 1)),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
        }).pipe(S.encodeKeys({ items: "item" })),
      ).annotate({ identifier: "GatewayResponses" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIntegrationRequest" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ restApiId: S.optional(S.String), stageName: S.optional(S.String) }),
      ).annotate({ identifier: "StageKey" });
    case 1:
      return S.Array(__S(936, __c117, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          enabled: S.optional(S.Boolean),
          generateDistinctId: S.optional(S.Boolean),
          value: S.optional(SensitiveString),
          stageKeys: S.optional(__S(937, __c117, 1)),
          customerId: S.optional(S.String),
          tags: S.optional(__S(944, __c118, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/apikeys" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateApiKeyRequest" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          value: S.optional(SensitiveString),
          name: S.optional(S.String),
          customerId: S.optional(S.String),
          description: S.optional(S.String),
          enabled: S.optional(S.Boolean),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          stageKeys: S.optional(__S(960, __c120, 0)),
          tags: S.optional(__S(944, __c118, 0)),
        }),
      ).annotate({ identifier: "ApiKey" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
          statusCode: S.String.pipe(T.HttpLabel("statusCode")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration/responses/{statusCode}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIntegrationResponseRequest" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMethodRequest" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
          statusCode: S.String.pipe(T.HttpLabel("statusCode")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/responses/{statusCode}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMethodResponseRequest" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          modelName: S.String.pipe(T.HttpLabel("modelName")),
          flatten: S.optional(S.Boolean).pipe(T.HttpQuery("flatten")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restapis/{restApiId}/models/{modelName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetModelRequest" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restapis/{restApiId}/models" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetModelsRequest" });
    case 1:
      return S.Array(__S(360, __c45, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(1001, __c125, 1)),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
        }).pipe(S.encodeKeys({ items: "item" })),
      ).annotate({ identifier: "Models" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          modelName: S.String.pipe(T.HttpLabel("modelName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/restapis/{restApiId}/models/{modelName}/default_template",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetModelTemplateRequest" });
    case 1:
      return S.suspend(() => S.Struct({ value: S.optional(S.String) })).annotate({
        identifier: "Template",
      });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          requestValidatorId: S.String.pipe(T.HttpLabel("requestValidatorId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/restapis/{restApiId}/requestvalidators/{requestValidatorId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRequestValidatorRequest" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restapis/{restApiId}/requestvalidators" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRequestValidatorsRequest" });
    case 1:
      return S.Array(__S(376, __c47, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(1025, __c128, 1)),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
        }).pipe(S.encodeKeys({ items: "item" })),
      ).annotate({ identifier: "RequestValidators" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          embed: S.optional(__S(960, __c120, 0)).pipe(T.HttpQuery("embed")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restapis/{restApiId}/resources/{resourceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourceRequest" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          embed: S.optional(__S(960, __c120, 0)).pipe(T.HttpQuery("embed")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restapis/{restApiId}/resources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourcesRequest" });
    case 1:
      return S.Array(__S(425, __c53, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(1041, __c130, 1)),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
        }).pipe(S.encodeKeys({ items: "item" })),
      ).annotate({ identifier: "Resources" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          name: S.String,
          type: S.String,
          providerARNs: S.optional(__S(960, __c120, 0)),
          authType: S.optional(S.String),
          authorizerUri: S.optional(S.String),
          authorizerCredentials: S.optional(S.String),
          identitySource: S.optional(S.String),
          identityValidationExpression: S.optional(S.String),
          authorizerResultTtlInSeconds: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/restapis/{restApiId}/authorizers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAuthorizerRequest" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          type: S.optional(S.String),
          providerARNs: S.optional(__S(960, __c120, 0)),
          authType: S.optional(S.String),
          authorizerUri: S.optional(S.String),
          authorizerCredentials: S.optional(S.String),
          identitySource: S.optional(S.String),
          identityValidationExpression: S.optional(S.String),
          authorizerResultTtlInSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Authorizer" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ restApiId: S.String.pipe(T.HttpLabel("restApiId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restapis/{restApiId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRestApiRequest" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/restapis" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetRestApisRequest" });
    case 1:
      return S.Array(__S(440, __c55, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(1073, __c134, 1)),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
        }).pipe(S.encodeKeys({ items: "item" })),
      ).annotate({ identifier: "RestApis" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          stageName: S.String.pipe(T.HttpLabel("stageName")),
          sdkType: S.String.pipe(T.HttpLabel("sdkType")),
          parameters: S.optional(__S(944, __c118, 0)).pipe(T.HttpQueryParams()),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/restapis/{restApiId}/stages/{stageName}/sdks/{sdkType}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSdkRequest" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/sdktypes/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSdkTypeRequest" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          friendlyName: S.optional(S.String),
          description: S.optional(S.String),
          required: S.optional(S.Boolean),
          defaultValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "SdkConfigurationProperty" });
    case 1:
      return S.Array(__S(1096, __c137, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          friendlyName: S.optional(S.String),
          description: S.optional(S.String),
          configurationProperties: S.optional(__S(1097, __c137, 1)),
        }),
      ).annotate({ identifier: "SdkType" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/sdktypes" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetSdkTypesRequest" });
    case 1:
      return S.Array(__S(1098, __c137, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1105, __c138, 1)) }).pipe(S.encodeKeys({ items: "item" })),
      ).annotate({ identifier: "SdkTypes" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          stageName: S.String.pipe(T.HttpLabel("stageName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restapis/{restApiId}/stages/{stageName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetStageRequest" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          deploymentId: S.optional(S.String).pipe(T.HttpQuery("deploymentId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/restapis/{restApiId}/stages" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetStagesRequest" });
    case 1:
      return S.Array(__S(460, __c57, 4));
    case 2:
      return S.suspend(() => S.Struct({ item: S.optional(__S(1121, __c140, 1)) })).annotate({
        identifier: "Stages",
      });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTagsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(944, __c118, 0)) })).annotate({
        identifier: "Tags",
      });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          usagePlanId: S.String.pipe(T.HttpLabel("usagePlanId")),
          keyId: S.optional(S.String).pipe(T.HttpQuery("keyId")),
          startDate: S.String.pipe(T.HttpQuery("startDate")),
          endDate: S.String.pipe(T.HttpQuery("endDate")),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/usageplans/{usagePlanId}/usage" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetUsageRequest" });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.Array(__S(1144, __c143, 0));
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(1145, __c143, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          usagePlanId: S.optional(S.String),
          startDate: S.optional(S.String),
          endDate: S.optional(S.String),
          items: S.optional(__S(1146, __c143, 2)),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
        }).pipe(S.encodeKeys({ items: "values" })),
      ).annotate({ identifier: "Usage" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ usagePlanId: S.String.pipe(T.HttpLabel("usagePlanId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/usageplans/{usagePlanId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetUsagePlanRequest" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainName: S.String.pipe(T.HttpLabel("domainName")),
          domainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
          basePath: S.optional(S.String),
          restApiId: S.String,
          stage: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/domainnames/{domainName}/basepathmappings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBasePathMappingRequest" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          basePath: S.optional(S.String),
          restApiId: S.optional(S.String),
          stage: S.optional(S.String),
        }),
      ).annotate({ identifier: "BasePathMapping" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          usagePlanId: S.String.pipe(T.HttpLabel("usagePlanId")),
          keyId: S.String.pipe(T.HttpLabel("keyId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/usageplans/{usagePlanId}/keys/{keyId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetUsagePlanKeyRequest" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          usagePlanId: S.String.pipe(T.HttpLabel("usagePlanId")),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          nameQuery: S.optional(S.String).pipe(T.HttpQuery("name")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/usageplans/{usagePlanId}/keys" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetUsagePlanKeysRequest" });
    case 1:
      return S.Array(__S(496, __c62, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(1185, __c148, 1)),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
        }).pipe(S.encodeKeys({ items: "item" })),
      ).annotate({ identifier: "UsagePlanKeys" });
  }
}
function __c149(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
          keyId: S.optional(S.String).pipe(T.HttpQuery("keyId")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/usageplans" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetUsagePlansRequest" });
    case 1:
      return S.Array(__S(484, __c60, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(1193, __c149, 1)),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
        }).pipe(S.encodeKeys({ items: "item" })),
      ).annotate({ identifier: "UsagePlans" });
  }
}
function __c150(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ vpcLinkId: S.String.pipe(T.HttpLabel("vpcLinkId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/vpclinks/{vpcLinkId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVpcLinkRequest" });
  }
}
function __c151(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/vpclinks" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetVpcLinksRequest" });
    case 1:
      return S.Array(__S(512, __c64, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          items: S.optional(__S(1209, __c151, 1)),
          position: S.optional(S.String).pipe(T.HttpQuery("position")),
        }).pipe(S.encodeKeys({ items: "item" })),
      ).annotate({ identifier: "VpcLinks" });
  }
}
function __c152(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          body: T.StreamingInput.pipe(T.HttpPayload()),
          format: S.String.pipe(T.HttpQuery("format")),
          failOnWarnings: S.optional(S.Boolean).pipe(T.HttpQuery("failonwarnings")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/apikeys?mode=import" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ImportApiKeysRequest" });
  }
}
function __c153(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ids: S.optional(__S(960, __c120, 0)),
          warnings: S.optional(__S(960, __c120, 0)),
        }),
      ).annotate({ identifier: "ApiKeyIds" });
  }
}
function __c154(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          mode: S.optional(S.String).pipe(T.HttpQuery("mode")),
          failOnWarnings: S.optional(S.Boolean).pipe(T.HttpQuery("failonwarnings")),
          body: T.StreamingInput.pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/restapis/{restApiId}/documentation/parts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ImportDocumentationPartsRequest" });
  }
}
function __c155(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          failOnWarnings: S.optional(S.Boolean).pipe(T.HttpQuery("failonwarnings")),
          parameters: S.optional(__S(944, __c118, 0)).pipe(T.HttpQueryParams()),
          body: T.StreamingInput.pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/restapis?mode=import" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ImportRestApiRequest" });
  }
}
function __c156(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          responseType: S.String.pipe(T.HttpLabel("responseType")),
          statusCode: S.optional(S.String),
          responseParameters: S.optional(__S(944, __c118, 0)),
          responseTemplates: S.optional(__S(944, __c118, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/restapis/{restApiId}/gatewayresponses/{responseType}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutGatewayResponseRequest" });
  }
}
function __c157(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          restApiId: S.String.pipe(T.HttpLabel("restApiId")),
          resourceId: S.String.pipe(T.HttpLabel("resourceId")),
          httpMethod: S.String.pipe(T.HttpLabel("httpMethod")),
          type: S.String,
          integrationHttpMethod: S.optional(S.String),
          uri: S.optional(S.String),
          connectionType: S.optional(S.String),
          connectionId: S.optional(S.String),
          credentials: S.optional(S.String),
          requestParameters: S.optional(__S(944, __c118, 0)),
          requestTemplates: S.optional(__S(944, __c118, 0)),
          passthroughBehavior: S.optional(S.String),
          cacheNamespace: S.optional(S.String),
          cacheKeyParameters: S.optional(__S(960, __c120, 0)),
          contentHandling: S.optional(S.String),
          timeoutInMillis: S.optional(S.Number),
          tlsConfig: S.optional(__S(401, __c50, 1)),
          responseTransferMode: S.optional(S.String),
          integrationTarget: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({ httpMethod: "requestHttpMethod", integrationHttpMethod: "httpMethod" }),
          )
          .pipe(
            T.all(
              T.Http({
                method: "PUT",
                uri: "/restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "PutIntegrationRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
