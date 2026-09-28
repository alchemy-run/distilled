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
  sdkId: "API Gateway",
  target: "BackplaneControlService",
  version: "2015-07-09",
  sigv4: "apigateway",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://apigateway.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://apigateway.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["ThrottlingError"],
    { status: 429, headers: { retryAfterSeconds: "Retry-After" } },
  )<{ readonly retryAfterSeconds?: string; readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503, headers: { retryAfterSeconds: "Retry-After" } },
  )<{ readonly retryAfterSeconds?: string; readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429, headers: { retryAfterSeconds: "Retry-After" } },
  )<{ readonly retryAfterSeconds?: string; readonly message?: string }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
  })<{ readonly message?: string }> {}
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
export type AuthorizerType =
  | "TOKEN"
  | "REQUEST"
  | "COGNITO_USER_POOLS"
  | (string & {});
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
  apiSummary?: {
    [key: string]: { [key: string]: MethodSnapshot | undefined } | undefined;
  };
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
export type IntegrationType =
  | "HTTP"
  | "AWS"
  | "MOCK"
  | "HTTP_PROXY"
  | "AWS_PROXY"
  | (string & {});
export type ConnectionType = "INTERNET" | "VPC_LINK" | (string & {});
export type ContentHandlingStrategy =
  | "CONVERT_TO_BINARY"
  | "CONVERT_TO_TEXT"
  | (string & {});
export interface IntegrationResponse {
  statusCode?: string;
  selectionPattern?: string;
  responseParameters?: { [key: string]: string | undefined };
  responseTemplates?: { [key: string]: string | undefined };
  contentHandling?: ContentHandlingStrategy;
}
export type MapOfIntegrationResponse = {
  [key: string]: IntegrationResponse | undefined;
};
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
export type ApiStatus =
  | "UPDATING"
  | "AVAILABLE"
  | "PENDING"
  | "FAILED"
  | (string & {});
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
export type MapOfApiStageThrottleSettings = {
  [key: string]: ThrottleSettings | undefined;
};
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
export type VpcLinkStatus =
  | "AVAILABLE"
  | "PENDING"
  | "DELETING"
  | "FAILED"
  | (string & {});
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
export type Op =
  | "add"
  | "remove"
  | "replace"
  | "move"
  | "copy"
  | "test"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "POST /apikeys",
    input: {
      name: 0,
      description: 0,
      enabled: 0,
      generateDistinctId: 0,
      value: 0,
      stageKeys: D.list({ restApiId: 0, stageName: 0 }),
      customerId: 0,
      tags: 0,
    },
    output: { value: D.secret, createdDate: D.ts, lastUpdatedDate: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /restapis/{restApiId}/authorizers",
    input: {
      restApiId: 0,
      name: 0,
      type: 0,
      providerARNs: 0,
      authType: 0,
      authorizerUri: 0,
      authorizerCredentials: 0,
      identitySource: 0,
      identityValidationExpression: 0,
      authorizerResultTtlInSeconds: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /domainnames/{domainName}/basepathmappings",
    input: {
      domainName: 0,
      domainNameId: D.m({ query: "domainNameId" }),
      basePath: 0,
      restApiId: 0,
      stage: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /restapis/{restApiId}/deployments",
    input: {
      restApiId: 0,
      stageName: 0,
      stageDescription: 0,
      description: 0,
      cacheClusterEnabled: 0,
      cacheClusterSize: 0,
      variables: 0,
      canarySettings: {
        percentTraffic: 0,
        stageVariableOverrides: 0,
        useStageCache: 0,
      },
      tracingEnabled: 0,
    },
    output: { createdDate: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /restapis/{restApiId}/documentation/parts",
    input: {
      restApiId: 0,
      location: { type: 0, path: 0, method: 0, statusCode: 0, name: 0 },
      properties: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /restapis/{restApiId}/documentation/versions",
    input: {
      restApiId: 0,
      documentationVersion: 0,
      stageName: 0,
      description: 0,
    },
    output: { createdDate: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /domainnames",
    input: {
      domainName: 0,
      certificateName: 0,
      certificateBody: 0,
      certificatePrivateKey: 0,
      certificateChain: 0,
      certificateArn: 0,
      regionalCertificateName: 0,
      regionalCertificateArn: 0,
      endpointConfiguration: i_EndpointConfiguration,
      tags: 0,
      securityPolicy: 0,
      endpointAccessMode: 0,
      mutualTlsAuthentication: { truststoreUri: 0, truststoreVersion: 0 },
      ownershipVerificationCertificateArn: 0,
      policy: 0,
      routingMode: 0,
    },
    output: { certificateUploadDate: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /domainnameaccessassociations",
    input: {
      domainNameArn: 0,
      accessAssociationSourceType: 0,
      accessAssociationSource: 0,
      tags: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /restapis/{restApiId}/models",
    input: { restApiId: 0, name: 0, description: 0, schema: 0, contentType: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /restapis/{restApiId}/requestvalidators",
    input: {
      restApiId: 0,
      name: 0,
      validateRequestBody: 0,
      validateRequestParameters: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /restapis/{restApiId}/resources/{parentId}",
    input: { restApiId: 0, parentId: 0, pathPart: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /restapis",
    input: {
      name: 0,
      description: 0,
      version: 0,
      cloneFrom: 0,
      binaryMediaTypes: 0,
      minimumCompressionSize: 0,
      apiKeySource: 0,
      endpointConfiguration: i_EndpointConfiguration,
      policy: 0,
      tags: 0,
      disableExecuteApiEndpoint: 0,
      securityPolicy: 0,
      endpointAccessMode: 0,
    },
    output: { createdDate: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /restapis/{restApiId}/stages",
    input: {
      restApiId: 0,
      stageName: 0,
      deploymentId: 0,
      description: 0,
      cacheClusterEnabled: 0,
      cacheClusterSize: 0,
      variables: 0,
      documentationVersion: 0,
      canarySettings: {
        percentTraffic: 0,
        deploymentId: 0,
        stageVariableOverrides: 0,
        useStageCache: 0,
      },
      tracingEnabled: 0,
      tags: 0,
    },
    output: { createdDate: D.ts, lastUpdatedDate: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /usageplans",
    input: {
      name: 0,
      description: 0,
      apiStages: D.list({
        apiId: 0,
        stage: 0,
        throttle: D.map(i_ThrottleSettings),
      }),
      throttle: i_ThrottleSettings,
      quota: { limit: 0, offset: 0, period: 0 },
      tags: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /usageplans/{usagePlanId}/keys",
    input: { usagePlanId: 0, keyId: 0, keyType: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /vpclinks",
    input: { name: 0, description: 0, targetArns: 0, tags: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /apikeys/{apiKey}",
    input: { apiKey: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /restapis/{restApiId}/authorizers/{authorizerId}",
    input: { restApiId: 0, authorizerId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /domainnames/{domainName}/basepathmappings/{basePath}",
    input: {
      domainName: 0,
      domainNameId: D.m({ query: "domainNameId" }),
      basePath: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /clientcertificates/{clientCertificateId}",
    input: { clientCertificateId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /restapis/{restApiId}/deployments/{deploymentId}",
    input: { restApiId: 0, deploymentId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /restapis/{restApiId}/documentation/parts/{documentationPartId}",
    input: { restApiId: 0, documentationPartId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /restapis/{restApiId}/documentation/versions/{documentationVersion}",
    input: { restApiId: 0, documentationVersion: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /domainnames/{domainName}",
    input: { domainName: 0, domainNameId: D.m({ query: "domainNameId" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /domainnameaccessassociations/{domainNameAccessAssociationArn}",
    input: { domainNameAccessAssociationArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /restapis/{restApiId}/gatewayresponses/{responseType}",
    input: { restApiId: 0, responseType: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration",
    input: { restApiId: 0, resourceId: 0, httpMethod: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration/responses/{statusCode}",
    input: { restApiId: 0, resourceId: 0, httpMethod: 0, statusCode: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}",
    input: { restApiId: 0, resourceId: 0, httpMethod: 0 },
  },
  errors: [
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMethod",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/responses/{statusCode}",
    input: { restApiId: 0, resourceId: 0, httpMethod: 0, statusCode: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /restapis/{restApiId}/models/{modelName}",
    input: { restApiId: 0, modelName: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /restapis/{restApiId}/requestvalidators/{requestValidatorId}",
    input: { restApiId: 0, requestValidatorId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /restapis/{restApiId}/resources/{resourceId}",
    input: { restApiId: 0, resourceId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /restapis/{restApiId}",
    input: { restApiId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /restapis/{restApiId}/stages/{stageName}",
    input: { restApiId: 0, stageName: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /usageplans/{usagePlanId}",
    input: { usagePlanId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /usageplans/{usagePlanId}/keys/{keyId}",
    input: { usagePlanId: 0, keyId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /vpclinks/{vpcLinkId}",
    input: { vpcLinkId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /restapis/{restApiId}/stages/{stageName}/cache/authorizers",
    input: { restApiId: 0, stageName: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /restapis/{restApiId}/stages/{stageName}/cache/data",
    input: { restApiId: 0, stageName: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /clientcertificates",
    input: { description: 0, tags: 0 },
    output: { createdDate: D.ts, expirationDate: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: { service: svc, http: "GET /account", input: {} },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccount",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /apikeys/{apiKey}",
    input: { apiKey: 0, includeValue: D.m({ query: "includeValue" }) },
    output: { value: D.secret, createdDate: D.ts, lastUpdatedDate: D.ts },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApiKey",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /apikeys",
    input: {
      position: D.m({ query: "position" }),
      limit: D.m({ query: "limit" }),
      nameQuery: D.m({ query: "name" }),
      customerId: D.m({ query: "customerId" }),
      includeValues: D.m({ query: "includeValues" }),
    },
    output: {
      items: D.m({
        wire: "item",
        shape: D.list({
          value: D.secret,
          createdDate: D.ts,
          lastUpdatedDate: D.ts,
        }),
      }),
      position: D.m({ query: "position" }),
    },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/authorizers/{authorizerId}",
    input: { restApiId: 0, authorizerId: 0 },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAuthorizer",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/authorizers",
    input: {
      restApiId: 0,
      position: D.m({ query: "position" }),
      limit: D.m({ query: "limit" }),
    },
    output: {
      items: D.m({ wire: "item" }),
      position: D.m({ query: "position" }),
    },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAuthorizers",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /domainnames/{domainName}/basepathmappings/{basePath}",
    input: {
      domainName: 0,
      domainNameId: D.m({ query: "domainNameId" }),
      basePath: 0,
    },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBasePathMapping",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /domainnames/{domainName}/basepathmappings",
    input: {
      domainName: 0,
      domainNameId: D.m({ query: "domainNameId" }),
      position: D.m({ query: "position" }),
      limit: D.m({ query: "limit" }),
    },
    output: {
      items: D.m({ wire: "item" }),
      position: D.m({ query: "position" }),
    },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /clientcertificates/{clientCertificateId}",
    input: { clientCertificateId: 0 },
    output: { createdDate: D.ts, expirationDate: D.ts },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClientCertificate",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /clientcertificates",
    input: {
      position: D.m({ query: "position" }),
      limit: D.m({ query: "limit" }),
    },
    output: {
      items: D.m({
        wire: "item",
        shape: D.list({ createdDate: D.ts, expirationDate: D.ts }),
      }),
      position: D.m({ query: "position" }),
    },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/deployments/{deploymentId}",
    input: { restApiId: 0, deploymentId: 0, embed: D.m({ query: "embed" }) },
    output: { createdDate: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/deployments",
    input: {
      restApiId: 0,
      position: D.m({ query: "position" }),
      limit: D.m({ query: "limit" }),
    },
    output: {
      items: D.m({ wire: "item", shape: D.list({ createdDate: D.ts }) }),
      position: D.m({ query: "position" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/documentation/parts/{documentationPartId}",
    input: { restApiId: 0, documentationPartId: 0 },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentationPart",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/documentation/parts",
    input: {
      restApiId: 0,
      type: D.m({ query: "type" }),
      nameQuery: D.m({ query: "name" }),
      path: D.m({ query: "path" }),
      position: D.m({ query: "position" }),
      limit: D.m({ query: "limit" }),
      locationStatus: D.m({ query: "locationStatus" }),
    },
    output: {
      items: D.m({ wire: "item" }),
      position: D.m({ query: "position" }),
    },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentationParts",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/documentation/versions/{documentationVersion}",
    input: { restApiId: 0, documentationVersion: 0 },
    output: { createdDate: D.ts },
  },
  errors: [NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentationVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/documentation/versions",
    input: {
      restApiId: 0,
      position: D.m({ query: "position" }),
      limit: D.m({ query: "limit" }),
    },
    output: {
      items: D.m({ wire: "item", shape: D.list({ createdDate: D.ts }) }),
      position: D.m({ query: "position" }),
    },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentationVersions",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /domainnames/{domainName}",
    input: { domainName: 0, domainNameId: D.m({ query: "domainNameId" }) },
    output: { certificateUploadDate: D.ts },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainName",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /domainnameaccessassociations",
    input: {
      position: D.m({ query: "position" }),
      limit: D.m({ query: "limit" }),
      resourceOwner: D.m({ query: "resourceOwner" }),
    },
    output: {
      items: D.m({ wire: "item" }),
      position: D.m({ query: "position" }),
    },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainNameAccessAssociations",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /domainnames",
    input: {
      position: D.m({ query: "position" }),
      limit: D.m({ query: "limit" }),
      resourceOwner: D.m({ query: "resourceOwner" }),
    },
    output: {
      items: D.m({
        wire: "item",
        shape: D.list({ certificateUploadDate: D.ts }),
      }),
      position: D.m({ query: "position" }),
    },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/stages/{stageName}/exports/{exportType}",
    input: {
      restApiId: 0,
      stageName: 0,
      exportType: 0,
      parameters: D.m({ queryParams: true }),
      accepts: D.m({ header: "Accept" }),
    },
    output: {
      contentType: D.m({ header: "Content-Type" }),
      contentDisposition: D.m({ header: "Content-Disposition" }),
      body: D.m({ payload: true, shape: D.stream }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/gatewayresponses/{responseType}",
    input: { restApiId: 0, responseType: 0 },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGatewayResponse",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/gatewayresponses",
    input: {
      restApiId: 0,
      position: D.m({ query: "position" }),
      limit: D.m({ query: "limit" }),
    },
    output: {
      items: D.m({ wire: "item" }),
      position: D.m({ query: "position" }),
    },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGatewayResponses",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration",
    input: { restApiId: 0, resourceId: 0, httpMethod: 0 },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration/responses/{statusCode}",
    input: { restApiId: 0, resourceId: 0, httpMethod: 0, statusCode: 0 },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegrationResponse",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}",
    input: { restApiId: 0, resourceId: 0, httpMethod: 0 },
  },
  errors: [NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMethod",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/responses/{statusCode}",
    input: { restApiId: 0, resourceId: 0, httpMethod: 0, statusCode: 0 },
  },
  errors: [NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMethodResponse",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/models/{modelName}",
    input: { restApiId: 0, modelName: 0, flatten: D.m({ query: "flatten" }) },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/models",
    input: {
      restApiId: 0,
      position: D.m({ query: "position" }),
      limit: D.m({ query: "limit" }),
    },
    output: {
      items: D.m({ wire: "item" }),
      position: D.m({ query: "position" }),
    },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/models/{modelName}/default_template",
    input: { restApiId: 0, modelName: 0 },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelTemplate",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/requestvalidators/{requestValidatorId}",
    input: { restApiId: 0, requestValidatorId: 0 },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRequestValidator",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/requestvalidators",
    input: {
      restApiId: 0,
      position: D.m({ query: "position" }),
      limit: D.m({ query: "limit" }),
    },
    output: {
      items: D.m({ wire: "item" }),
      position: D.m({ query: "position" }),
    },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRequestValidators",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/resources/{resourceId}",
    input: { restApiId: 0, resourceId: 0, embed: D.m({ query: "embed" }) },
  },
  errors: [NotFoundException, TooManyRequestsException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/resources",
    input: {
      restApiId: 0,
      position: D.m({ query: "position" }),
      limit: D.m({ query: "limit" }),
      embed: D.m({ query: "embed" }),
    },
    output: {
      items: D.m({ wire: "item" }),
      position: D.m({ query: "position" }),
    },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}",
    input: { restApiId: 0 },
    output: { createdDate: D.ts },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRestApi",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /restapis",
    input: {
      position: D.m({ query: "position" }),
      limit: D.m({ query: "limit" }),
    },
    output: {
      items: D.m({ wire: "item", shape: D.list({ createdDate: D.ts }) }),
      position: D.m({ query: "position" }),
    },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/stages/{stageName}/sdks/{sdkType}",
    input: {
      restApiId: 0,
      stageName: 0,
      sdkType: 0,
      parameters: D.m({ queryParams: true }),
    },
    output: {
      contentType: D.m({ header: "Content-Type" }),
      contentDisposition: D.m({ header: "Content-Disposition" }),
      body: D.m({ payload: true, shape: D.stream }),
    },
  },
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
})) as any;

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
  descriptor: { service: svc, http: "GET /sdktypes/{id}", input: { id: 0 } },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSdkType",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /sdktypes",
    input: {
      position: D.m({ query: "position" }),
      limit: D.m({ query: "limit" }),
    },
    output: { items: D.m({ wire: "item" }) },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSdkTypes",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/stages/{stageName}",
    input: { restApiId: 0, stageName: 0 },
    output: { createdDate: D.ts, lastUpdatedDate: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /restapis/{restApiId}/stages",
    input: { restApiId: 0, deploymentId: D.m({ query: "deploymentId" }) },
    output: { item: D.list({ createdDate: D.ts, lastUpdatedDate: D.ts }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: {
      resourceArn: 0,
      position: D.m({ query: "position" }),
      limit: D.m({ query: "limit" }),
    },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTags",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /usageplans/{usagePlanId}/usage",
    input: {
      usagePlanId: 0,
      keyId: D.m({ query: "keyId" }),
      startDate: D.m({ query: "startDate" }),
      endDate: D.m({ query: "endDate" }),
      position: D.m({ query: "position" }),
      limit: D.m({ query: "limit" }),
    },
    output: {
      items: D.m({ wire: "values" }),
      position: D.m({ query: "position" }),
    },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /usageplans/{usagePlanId}",
    input: { usagePlanId: 0 },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsagePlan",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /usageplans/{usagePlanId}/keys/{keyId}",
    input: { usagePlanId: 0, keyId: 0 },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsagePlanKey",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /usageplans/{usagePlanId}/keys",
    input: {
      usagePlanId: 0,
      position: D.m({ query: "position" }),
      limit: D.m({ query: "limit" }),
      nameQuery: D.m({ query: "name" }),
    },
    output: {
      items: D.m({ wire: "item" }),
      position: D.m({ query: "position" }),
    },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /usageplans",
    input: {
      position: D.m({ query: "position" }),
      keyId: D.m({ query: "keyId" }),
      limit: D.m({ query: "limit" }),
    },
    output: {
      items: D.m({ wire: "item" }),
      position: D.m({ query: "position" }),
    },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /vpclinks/{vpcLinkId}",
    input: { vpcLinkId: 0 },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVpcLink",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /vpclinks",
    input: {
      position: D.m({ query: "position" }),
      limit: D.m({ query: "limit" }),
    },
    output: {
      items: D.m({ wire: "item" }),
      position: D.m({ query: "position" }),
    },
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
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
  descriptor: {
    service: svc,
    http: "POST /apikeys?mode=import",
    input: {
      body: D.m({ payload: true, shape: D.stream }),
      format: D.m({ query: "format" }),
      failOnWarnings: D.m({ query: "failonwarnings" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /restapis/{restApiId}/documentation/parts",
    input: {
      restApiId: 0,
      mode: D.m({ query: "mode" }),
      failOnWarnings: D.m({ query: "failonwarnings" }),
      body: D.m({ payload: true, shape: D.stream }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /restapis?mode=import",
    input: {
      failOnWarnings: D.m({ query: "failonwarnings" }),
      parameters: D.m({ queryParams: true }),
      body: D.m({ payload: true, shape: D.stream }),
    },
    output: { createdDate: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /restapis/{restApiId}/gatewayresponses/{responseType}",
    input: {
      restApiId: 0,
      responseType: 0,
      statusCode: 0,
      responseParameters: 0,
      responseTemplates: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration",
    input: {
      restApiId: 0,
      resourceId: 0,
      httpMethod: 0,
      type: 0,
      integrationHttpMethod: D.m({ wire: "httpMethod" }),
      uri: 0,
      connectionType: 0,
      connectionId: 0,
      credentials: 0,
      requestParameters: 0,
      requestTemplates: 0,
      passthroughBehavior: 0,
      cacheNamespace: 0,
      cacheKeyParameters: 0,
      contentHandling: 0,
      timeoutInMillis: 0,
      tlsConfig: { insecureSkipVerification: 0 },
      responseTransferMode: 0,
      integrationTarget: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration/responses/{statusCode}",
    input: {
      restApiId: 0,
      resourceId: 0,
      httpMethod: 0,
      statusCode: 0,
      selectionPattern: 0,
      responseParameters: 0,
      responseTemplates: 0,
      contentHandling: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}",
    input: {
      restApiId: 0,
      resourceId: 0,
      httpMethod: 0,
      authorizationType: 0,
      authorizerId: 0,
      apiKeyRequired: 0,
      operationName: 0,
      requestParameters: 0,
      requestModels: 0,
      requestValidatorId: 0,
      authorizationScopes: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/responses/{statusCode}",
    input: {
      restApiId: 0,
      resourceId: 0,
      httpMethod: 0,
      statusCode: 0,
      responseParameters: 0,
      responseModels: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /restapis/{restApiId}",
    input: {
      restApiId: 0,
      mode: D.m({ query: "mode" }),
      failOnWarnings: D.m({ query: "failonwarnings" }),
      parameters: D.m({ queryParams: true }),
      body: D.m({ payload: true, shape: D.stream }),
    },
    output: { createdDate: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /rejectdomainnameaccessassociations",
    input: {
      domainNameAccessAssociationArn: D.m({
        query: "domainNameAccessAssociationArn",
      }),
      domainNameArn: D.m({ query: "domainNameArn" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /restapis/{restApiId}/authorizers/{authorizerId}",
    input: {
      restApiId: 0,
      authorizerId: 0,
      headers: 0,
      multiValueHeaders: 0,
      pathWithQueryString: 0,
      body: 0,
      stageVariables: 0,
      additionalContext: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestInvokeAuthorizer",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}",
    input: {
      restApiId: 0,
      resourceId: 0,
      httpMethod: 0,
      pathWithQueryString: 0,
      body: 0,
      headers: 0,
      multiValueHeaders: 0,
      clientCertificateId: 0,
      stageVariables: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestInvokeMethod",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /account",
    input: { patchOperations: D.list(i_PatchOperation) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /apikeys/{apiKey}",
    input: { apiKey: 0, patchOperations: D.list(i_PatchOperation) },
    output: { value: D.secret, createdDate: D.ts, lastUpdatedDate: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /restapis/{restApiId}/authorizers/{authorizerId}",
    input: {
      restApiId: 0,
      authorizerId: 0,
      patchOperations: D.list(i_PatchOperation),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /domainnames/{domainName}/basepathmappings/{basePath}",
    input: {
      domainName: 0,
      domainNameId: D.m({ query: "domainNameId" }),
      basePath: 0,
      patchOperations: D.list(i_PatchOperation),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /clientcertificates/{clientCertificateId}",
    input: {
      clientCertificateId: 0,
      patchOperations: D.list(i_PatchOperation),
    },
    output: { createdDate: D.ts, expirationDate: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /restapis/{restApiId}/deployments/{deploymentId}",
    input: {
      restApiId: 0,
      deploymentId: 0,
      patchOperations: D.list(i_PatchOperation),
    },
    output: { createdDate: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /restapis/{restApiId}/documentation/parts/{documentationPartId}",
    input: {
      restApiId: 0,
      documentationPartId: 0,
      patchOperations: D.list(i_PatchOperation),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /restapis/{restApiId}/documentation/versions/{documentationVersion}",
    input: {
      restApiId: 0,
      documentationVersion: 0,
      patchOperations: D.list(i_PatchOperation),
    },
    output: { createdDate: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /domainnames/{domainName}",
    input: {
      domainName: 0,
      domainNameId: D.m({ query: "domainNameId" }),
      patchOperations: D.list(i_PatchOperation),
    },
    output: { certificateUploadDate: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /restapis/{restApiId}/gatewayresponses/{responseType}",
    input: {
      restApiId: 0,
      responseType: 0,
      patchOperations: D.list(i_PatchOperation),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration",
    input: {
      restApiId: 0,
      resourceId: 0,
      httpMethod: 0,
      patchOperations: D.list(i_PatchOperation),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/integration/responses/{statusCode}",
    input: {
      restApiId: 0,
      resourceId: 0,
      httpMethod: 0,
      statusCode: 0,
      patchOperations: D.list(i_PatchOperation),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}",
    input: {
      restApiId: 0,
      resourceId: 0,
      httpMethod: 0,
      patchOperations: D.list(i_PatchOperation),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /restapis/{restApiId}/resources/{resourceId}/methods/{httpMethod}/responses/{statusCode}",
    input: {
      restApiId: 0,
      resourceId: 0,
      httpMethod: 0,
      statusCode: 0,
      patchOperations: D.list(i_PatchOperation),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /restapis/{restApiId}/models/{modelName}",
    input: {
      restApiId: 0,
      modelName: 0,
      patchOperations: D.list(i_PatchOperation),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /restapis/{restApiId}/requestvalidators/{requestValidatorId}",
    input: {
      restApiId: 0,
      requestValidatorId: 0,
      patchOperations: D.list(i_PatchOperation),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /restapis/{restApiId}/resources/{resourceId}",
    input: {
      restApiId: 0,
      resourceId: 0,
      patchOperations: D.list(i_PatchOperation),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /restapis/{restApiId}",
    input: { restApiId: 0, patchOperations: D.list(i_PatchOperation) },
    output: { createdDate: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /restapis/{restApiId}/stages/{stageName}",
    input: {
      restApiId: 0,
      stageName: 0,
      patchOperations: D.list(i_PatchOperation),
    },
    output: { createdDate: D.ts, lastUpdatedDate: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /usageplans/{usagePlanId}/keys/{keyId}/usage",
    input: {
      usagePlanId: 0,
      keyId: 0,
      patchOperations: D.list(i_PatchOperation),
    },
    output: {
      items: D.m({ wire: "values" }),
      position: D.m({ query: "position" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /usageplans/{usagePlanId}",
    input: { usagePlanId: 0, patchOperations: D.list(i_PatchOperation) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /vpclinks/{vpcLinkId}",
    input: { vpcLinkId: 0, patchOperations: D.list(i_PatchOperation) },
    body: true,
  },
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
})) as any;

const i_EndpointConfiguration: D.LazyStruct = () => ({
  types: 0,
  ipAddressType: 0,
  vpcEndpointIds: 0,
});
const i_PatchOperation: D.LazyStruct = () => ({
  op: 0,
  path: 0,
  value: 0,
  from: 0,
});
const i_ThrottleSettings: D.LazyStruct = () => ({
  burstLimit: 0,
  rateLimit: 0,
});
