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
  sdkId: "ApiGatewayV2",
  serviceShapeName: "ApiGatewayV2",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "apigateway" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-11-29");
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

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
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
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      LimitType: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export type SelectionExpression = string;
export type CorsHeaderList = string[];
export type StringWithLengthBetween1And64 = string;
export type CorsMethodList = string[];
export type CorsOriginList = string[];
export type IntegerWithLengthBetweenMinus1And86400 = number;
export interface Cors {
  AllowCredentials?: boolean;
  AllowHeaders?: string[];
  AllowMethods?: string[];
  AllowOrigins?: string[];
  ExposeHeaders?: string[];
  MaxAge?: number;
}
export type Arn = string;
export type StringWithLengthBetween0And1024 = string;
export type IpAddressType = "ipv4" | "dualstack" | (string & {});
export type StringWithLengthBetween1And128 = string;
export type ProtocolType = "WEBSOCKET" | "HTTP" | (string & {});
export type SelectionKey = string;
export type StringWithLengthBetween1And1600 = string;
export type Tags = { [key: string]: string | undefined };
export type UriWithLengthBetween1And2048 = string;
export interface CreateApiRequest {
  ApiKeySelectionExpression?: string;
  CorsConfiguration?: Cors;
  CredentialsArn?: string;
  Description?: string;
  DisableSchemaValidation?: boolean;
  DisableExecuteApiEndpoint?: boolean;
  IpAddressType?: IpAddressType;
  Name?: string;
  ProtocolType?: ProtocolType;
  RouteKey?: string;
  RouteSelectionExpression?: string;
  Tags?: { [key: string]: string | undefined };
  Target?: string;
  Version?: string;
}
export type Id = string;
export type __timestampIso8601 = Date;
export type __listOf__string = string[];
const __listOf__string = __S(1088, __c68, 0) as any as S.Schema<__listOf__string>;
export interface CreateApiResponse {
  ApiEndpoint?: string;
  ApiGatewayManaged?: boolean;
  ApiId?: string;
  ApiKeySelectionExpression?: string;
  CorsConfiguration?: Cors;
  CreatedDate?: Date;
  Description?: string;
  DisableSchemaValidation?: boolean;
  DisableExecuteApiEndpoint?: boolean;
  ImportInfo?: string[];
  IpAddressType?: IpAddressType;
  Name?: string;
  ProtocolType?: ProtocolType;
  RouteSelectionExpression?: string;
  Tags?: { [key: string]: string | undefined };
  Version?: string;
  Warnings?: string[];
}
export interface CreateApiMappingRequest {
  ApiId?: string;
  ApiMappingKey?: string;
  DomainName: string;
  Stage?: string;
}
export interface CreateApiMappingResponse {
  ApiId?: string;
  ApiMappingId?: string;
  ApiMappingKey?: string;
  Stage?: string;
}
export type IntegerWithLengthBetween0And3600 = number;
export type AuthorizerType = "REQUEST" | "JWT" | (string & {});
export type IdentitySourceList = string[];
export interface JWTConfiguration {
  Audience?: string[];
  Issuer?: string;
}
export interface CreateAuthorizerRequest {
  ApiId: string;
  AuthorizerCredentialsArn?: string;
  AuthorizerPayloadFormatVersion?: string;
  AuthorizerResultTtlInSeconds?: number;
  AuthorizerType?: AuthorizerType;
  AuthorizerUri?: string;
  EnableSimpleResponses?: boolean;
  IdentitySource?: string[];
  IdentityValidationExpression?: string;
  JwtConfiguration?: JWTConfiguration;
  Name?: string;
}
export interface CreateAuthorizerResponse {
  AuthorizerCredentialsArn?: string;
  AuthorizerId?: string;
  AuthorizerPayloadFormatVersion?: string;
  AuthorizerResultTtlInSeconds?: number;
  AuthorizerType?: AuthorizerType;
  AuthorizerUri?: string;
  EnableSimpleResponses?: boolean;
  IdentitySource?: string[];
  IdentityValidationExpression?: string;
  JwtConfiguration?: JWTConfiguration;
  Name?: string;
}
export interface CreateDeploymentRequest {
  ApiId: string;
  Description?: string;
  StageName?: string;
}
export type DeploymentStatus = "PENDING" | "FAILED" | "DEPLOYED" | (string & {});
export interface CreateDeploymentResponse {
  AutoDeployed?: boolean;
  CreatedDate?: Date;
  DeploymentId?: string;
  DeploymentStatus?: DeploymentStatus;
  DeploymentStatusMessage?: string;
  Description?: string;
}
export type StringWithLengthBetween1And512 = string;
export type DomainNameStatus =
  | "AVAILABLE"
  | "UPDATING"
  | "PENDING_CERTIFICATE_REIMPORT"
  | "PENDING_OWNERSHIP_VERIFICATION"
  | (string & {});
export type EndpointType = "REGIONAL" | "EDGE" | (string & {});
export type SecurityPolicy = "TLS_1_0" | "TLS_1_2" | (string & {});
export interface DomainNameConfiguration {
  ApiGatewayDomainName?: string;
  CertificateArn?: string;
  CertificateName?: string;
  CertificateUploadDate?: Date;
  DomainNameStatus?: DomainNameStatus;
  DomainNameStatusMessage?: string;
  EndpointType?: EndpointType;
  HostedZoneId?: string;
  IpAddressType?: IpAddressType;
  SecurityPolicy?: SecurityPolicy;
  OwnershipVerificationCertificateArn?: string;
}
export type DomainNameConfigurations = DomainNameConfiguration[];
export interface MutualTlsAuthenticationInput {
  TruststoreUri?: string;
  TruststoreVersion?: string;
}
export type RoutingMode =
  | "API_MAPPING_ONLY"
  | "ROUTING_RULE_ONLY"
  | "ROUTING_RULE_THEN_API_MAPPING"
  | (string & {});
export interface CreateDomainNameRequest {
  DomainName?: string;
  DomainNameConfigurations?: DomainNameConfiguration[];
  MutualTlsAuthentication?: MutualTlsAuthenticationInput;
  RoutingMode?: RoutingMode;
  Tags?: { [key: string]: string | undefined };
}
export interface MutualTlsAuthentication {
  TruststoreUri?: string;
  TruststoreVersion?: string;
  TruststoreWarnings?: string[];
}
export interface CreateDomainNameResponse {
  ApiMappingSelectionExpression?: string;
  DomainName?: string;
  DomainNameArn?: string;
  DomainNameConfigurations?: DomainNameConfiguration[];
  MutualTlsAuthentication?: MutualTlsAuthentication;
  RoutingMode?: RoutingMode;
  Tags?: { [key: string]: string | undefined };
}
export type StringWithLengthBetween1And1024 = string;
export type ConnectionType = "INTERNET" | "VPC_LINK" | (string & {});
export type ContentHandlingStrategy = "CONVERT_TO_BINARY" | "CONVERT_TO_TEXT" | (string & {});
export type IntegrationType = "AWS" | "HTTP" | "MOCK" | "HTTP_PROXY" | "AWS_PROXY" | (string & {});
export type PassthroughBehavior = "WHEN_NO_MATCH" | "NEVER" | "WHEN_NO_TEMPLATES" | (string & {});
export type IntegrationParameters = { [key: string]: string | undefined };
export type StringWithLengthBetween0And32K = string;
export type TemplateMap = { [key: string]: string | undefined };
export type ResponseParameters = {
  [key: string]: { [key: string]: string | undefined } | undefined;
};
export type IntegerWithLengthBetween50And30000 = number;
export interface TlsConfigInput {
  ServerNameToVerify?: string;
}
export interface CreateIntegrationRequest {
  ApiId: string;
  ConnectionId?: string;
  ConnectionType?: ConnectionType;
  ContentHandlingStrategy?: ContentHandlingStrategy;
  CredentialsArn?: string;
  Description?: string;
  IntegrationMethod?: string;
  IntegrationSubtype?: string;
  IntegrationType?: IntegrationType;
  IntegrationUri?: string;
  PassthroughBehavior?: PassthroughBehavior;
  PayloadFormatVersion?: string;
  RequestParameters?: { [key: string]: string | undefined };
  RequestTemplates?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: { [key: string]: string | undefined } | undefined };
  TemplateSelectionExpression?: string;
  TimeoutInMillis?: number;
  TlsConfig?: TlsConfigInput;
}
export interface TlsConfig {
  ServerNameToVerify?: string;
}
export interface CreateIntegrationResult {
  ApiGatewayManaged?: boolean;
  ConnectionId?: string;
  ConnectionType?: ConnectionType;
  ContentHandlingStrategy?: ContentHandlingStrategy;
  CredentialsArn?: string;
  Description?: string;
  IntegrationId?: string;
  IntegrationMethod?: string;
  IntegrationResponseSelectionExpression?: string;
  IntegrationSubtype?: string;
  IntegrationType?: IntegrationType;
  IntegrationUri?: string;
  PassthroughBehavior?: PassthroughBehavior;
  PayloadFormatVersion?: string;
  RequestParameters?: { [key: string]: string | undefined };
  RequestTemplates?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: { [key: string]: string | undefined } | undefined };
  TemplateSelectionExpression?: string;
  TimeoutInMillis?: number;
  TlsConfig?: TlsConfig;
}
export interface CreateIntegrationResponseRequest {
  ApiId: string;
  ContentHandlingStrategy?: ContentHandlingStrategy;
  IntegrationId: string;
  IntegrationResponseKey?: string;
  ResponseParameters?: { [key: string]: string | undefined };
  ResponseTemplates?: { [key: string]: string | undefined };
  TemplateSelectionExpression?: string;
}
export interface CreateIntegrationResponseResponse {
  ContentHandlingStrategy?: ContentHandlingStrategy;
  IntegrationResponseId?: string;
  IntegrationResponseKey?: string;
  ResponseParameters?: { [key: string]: string | undefined };
  ResponseTemplates?: { [key: string]: string | undefined };
  TemplateSelectionExpression?: string;
}
export type StringWithLengthBetween1And256 = string;
export interface CreateModelRequest {
  ApiId: string;
  ContentType?: string;
  Description?: string;
  Name?: string;
  Schema?: string;
}
export interface CreateModelResponse {
  ContentType?: string;
  Description?: string;
  ModelId?: string;
  Name?: string;
  Schema?: string;
}
export type __stringMin1Max256 = string;
export type __stringMin20Max2048 = string;
export interface CognitoConfig {
  AppClientId?: string;
  UserPoolArn?: string;
  UserPoolDomain?: string;
}
export interface None {}
export interface Authorization {
  CognitoConfig?: CognitoConfig;
  None?: None;
}
export type __stringMin10Max2048 = string;
export type __stringMin3Max256 = string;
export interface ACMManaged {
  CertificateArn?: string;
  DomainName?: string;
}
export interface EndpointConfigurationRequest {
  AcmManaged?: ACMManaged;
  None?: None;
}
export type __listOf__stringMin20Max2048 = string[];
const __listOf__stringMin20Max2048 = __S(
  1088,
  __c68,
  0,
) as any as S.Schema<__listOf__stringMin20Max2048>;
export type __stringMin0Max1092 = string;
export type __stringMin0Max1024 = string;
export type __stringMin3Max255 = string;
export type __stringMin1Max16 = string;
export interface CustomColors {
  AccentColor?: string;
  BackgroundColor?: string;
  ErrorValidationColor?: string;
  HeaderColor?: string;
  NavigationColor?: string;
  TextColor?: string;
}
export interface PortalTheme {
  CustomColors?: CustomColors;
  LogoLastUploaded?: Date;
}
export interface PortalContent {
  Description?: string;
  DisplayName?: string;
  Theme?: PortalTheme;
}
export type __stringMin0Max255 = string;
export interface CreatePortalRequest {
  Authorization?: Authorization;
  EndpointConfiguration?: EndpointConfigurationRequest;
  IncludedPortalProductArns?: string[];
  LogoUri?: string;
  PortalContent?: PortalContent;
  RumAppMonitorName?: string;
  Tags?: { [key: string]: string | undefined };
}
export type __stringMin1Max64 = string;
export interface EndpointConfigurationResponse {
  CertificateArn?: string;
  DomainName?: string;
  PortalDefaultDomainName?: string;
  PortalDomainHostedZoneId?: string;
}
export type __stringMin10Max30PatternAZ09 = string;
export type PublishStatus =
  | "PUBLISHED"
  | "PUBLISH_IN_PROGRESS"
  | "PUBLISH_FAILED"
  | "DISABLE_IN_PROGRESS"
  | "DISABLE_FAILED"
  | "DISABLED"
  | (string & {});
export type __stringMin1Max2048 = string;
export interface StatusException {
  Exception?: string;
  Message?: string;
}
export interface CreatePortalResponse {
  Authorization?: Authorization & {
    CognitoConfig: CognitoConfig & {
      AppClientId: __stringMin1Max256;
      UserPoolArn: __stringMin20Max2048;
      UserPoolDomain: __stringMin20Max2048;
    };
  };
  EndpointConfiguration?: EndpointConfigurationResponse & {
    PortalDefaultDomainName: __stringMin3Max256;
    PortalDomainHostedZoneId: __stringMin1Max64;
  };
  IncludedPortalProductArns?: string[];
  LastModified?: Date;
  LastPublished?: Date;
  LastPublishedDescription?: string;
  PortalArn?: string;
  PortalContent?: PortalContent & {
    DisplayName: __stringMin3Max255;
    Theme: PortalTheme & {
      CustomColors: CustomColors & {
        AccentColor: __stringMin1Max16;
        BackgroundColor: __stringMin1Max16;
        ErrorValidationColor: __stringMin1Max16;
        HeaderColor: __stringMin1Max16;
        NavigationColor: __stringMin1Max16;
        TextColor: __stringMin1Max16;
      };
    };
  };
  PortalId?: string;
  PublishStatus?: PublishStatus;
  RumAppMonitorName?: string;
  StatusException?: StatusException;
  Tags?: { [key: string]: string | undefined };
}
export type __stringMin1Max255 = string;
export interface CreatePortalProductRequest {
  Description?: string;
  DisplayName?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface Section {
  ProductRestEndpointPageArns?: string[];
  SectionName?: string;
}
export type __listOfSection = Section[];
const __listOfSection = /*@__PURE__*/ __L.at(__c20, 1);
export interface DisplayOrder {
  Contents?: Section[];
  OverviewPageArn?: string;
  ProductPageArns?: string[];
}
export interface CreatePortalProductResponse {
  Description?: string;
  DisplayName?: string;
  DisplayOrder?: DisplayOrder & {
    Contents: (Section & {
      ProductRestEndpointPageArns: __listOf__stringMin20Max2048;
      SectionName: string;
    })[];
  };
  LastModified?: Date;
  PortalProductArn?: string;
  PortalProductId?: string;
  Tags?: { [key: string]: string | undefined };
}
export type __stringMin1Max32768 = string;
export interface DisplayContent {
  Body?: string;
  Title?: string;
}
export interface CreateProductPageRequest {
  DisplayContent?: DisplayContent;
  PortalProductId: string;
}
export interface CreateProductPageResponse {
  DisplayContent?: DisplayContent & { Body: __stringMin1Max32768; Title: __stringMin1Max255 };
  LastModified?: Date;
  ProductPageArn?: string;
  ProductPageId?: string;
}
export type __stringMin1Max1024 = string;
export interface DisplayContentOverrides {
  Body?: string;
  Endpoint?: string;
  OperationName?: string;
}
export interface EndpointDisplayContent {
  None?: None;
  Overrides?: DisplayContentOverrides;
}
export type __stringMin1Max20 = string;
export type __stringMin1Max4096 = string;
export type __stringMin1Max50 = string;
export type __stringMin1Max128 = string;
export interface IdentifierParts {
  Method?: string;
  Path?: string;
  RestApiId?: string;
  Stage?: string;
}
export interface RestEndpointIdentifier {
  IdentifierParts?: IdentifierParts;
}
export type TryItState = "ENABLED" | "DISABLED" | (string & {});
export interface CreateProductRestEndpointPageRequest {
  DisplayContent?: EndpointDisplayContent;
  PortalProductId: string;
  RestEndpointIdentifier?: RestEndpointIdentifier;
  TryItState?: TryItState;
}
export interface EndpointDisplayContentResponse {
  Body?: string;
  Endpoint?: string;
  OperationName?: string;
}
export type Status = "AVAILABLE" | "IN_PROGRESS" | "FAILED" | (string & {});
export interface CreateProductRestEndpointPageResponse {
  DisplayContent?: EndpointDisplayContentResponse & { Endpoint: __stringMin1Max1024 };
  LastModified?: Date;
  ProductRestEndpointPageArn?: string;
  ProductRestEndpointPageId?: string;
  RestEndpointIdentifier?: RestEndpointIdentifier & {
    IdentifierParts: IdentifierParts & {
      Method: __stringMin1Max20;
      Path: __stringMin1Max4096;
      RestApiId: __stringMin1Max50;
      Stage: __stringMin1Max128;
    };
  };
  Status?: Status;
  StatusException?: StatusException;
  TryItState?: TryItState;
}
export type AuthorizationScopes = string[];
export type AuthorizationType = "NONE" | "AWS_IAM" | "CUSTOM" | "JWT" | (string & {});
export type RouteModels = { [key: string]: string | undefined };
export interface ParameterConstraints {
  Required?: boolean;
}
export type RouteParameters = { [key: string]: ParameterConstraints | undefined };
export interface CreateRouteRequest {
  ApiId: string;
  ApiKeyRequired?: boolean;
  AuthorizationScopes?: string[];
  AuthorizationType?: AuthorizationType;
  AuthorizerId?: string;
  ModelSelectionExpression?: string;
  OperationName?: string;
  RequestModels?: { [key: string]: string | undefined };
  RequestParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteKey?: string;
  RouteResponseSelectionExpression?: string;
  Target?: string;
}
export interface CreateRouteResult {
  ApiGatewayManaged?: boolean;
  ApiKeyRequired?: boolean;
  AuthorizationScopes?: string[];
  AuthorizationType?: AuthorizationType;
  AuthorizerId?: string;
  ModelSelectionExpression?: string;
  OperationName?: string;
  RequestModels?: { [key: string]: string | undefined };
  RequestParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteId?: string;
  RouteKey?: string;
  RouteResponseSelectionExpression?: string;
  Target?: string;
}
export interface CreateRouteResponseRequest {
  ApiId: string;
  ModelSelectionExpression?: string;
  ResponseModels?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteId: string;
  RouteResponseKey?: string;
}
export interface CreateRouteResponseResponse {
  ModelSelectionExpression?: string;
  ResponseModels?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteResponseId?: string;
  RouteResponseKey?: string;
}
export interface RoutingRuleActionInvokeApi {
  ApiId?: string;
  Stage?: string;
  StripBasePath?: boolean;
}
export interface RoutingRuleAction {
  InvokeApi?: RoutingRuleActionInvokeApi;
}
export type __listOfRoutingRuleAction = RoutingRuleAction[];
const __listOfRoutingRuleAction = /*@__PURE__*/ __L.at(__c33, 2);
export type __listOfSelectionKey = string[];
const __listOfSelectionKey = __S(1088, __c68, 0) as any as S.Schema<__listOfSelectionKey>;
export interface RoutingRuleMatchBasePaths {
  AnyOf?: string[];
}
export interface RoutingRuleMatchHeaderValue {
  Header?: string;
  ValueGlob?: string;
}
export type __listOfRoutingRuleMatchHeaderValue = RoutingRuleMatchHeaderValue[];
const __listOfRoutingRuleMatchHeaderValue = /*@__PURE__*/ __L.at(__c33, 5);
export interface RoutingRuleMatchHeaders {
  AnyOf?: RoutingRuleMatchHeaderValue[];
}
export interface RoutingRuleCondition {
  MatchBasePaths?: RoutingRuleMatchBasePaths;
  MatchHeaders?: RoutingRuleMatchHeaders;
}
export type __listOfRoutingRuleCondition = RoutingRuleCondition[];
const __listOfRoutingRuleCondition = /*@__PURE__*/ __L.at(__c33, 8);
export type RoutingRulePriority = number;
export interface CreateRoutingRuleRequest {
  Actions?: RoutingRuleAction[];
  Conditions?: RoutingRuleCondition[];
  DomainName: string;
  DomainNameId?: string;
  Priority?: number;
}
export interface CreateRoutingRuleResponse {
  Actions?: (RoutingRuleAction & {
    InvokeApi: RoutingRuleActionInvokeApi & { ApiId: Id; Stage: StringWithLengthBetween1And128 };
  })[];
  Conditions?: (RoutingRuleCondition & {
    MatchBasePaths: RoutingRuleMatchBasePaths & { AnyOf: __listOfSelectionKey };
    MatchHeaders: RoutingRuleMatchHeaders & {
      AnyOf: (RoutingRuleMatchHeaderValue & {
        Header: SelectionKey;
        ValueGlob: SelectionExpression;
      })[];
    };
  })[];
  Priority?: number;
  RoutingRuleArn?: string;
  RoutingRuleId?: string;
}
export interface AccessLogSettings {
  DestinationArn?: string;
  Format?: string;
}
export type LoggingLevel = "ERROR" | "INFO" | "OFF" | (string & {});
export interface RouteSettings {
  DataTraceEnabled?: boolean;
  DetailedMetricsEnabled?: boolean;
  LoggingLevel?: LoggingLevel;
  ThrottlingBurstLimit?: number;
  ThrottlingRateLimit?: number;
}
export type RouteSettingsMap = { [key: string]: RouteSettings | undefined };
export type StringWithLengthBetween0And2048 = string;
export type StageVariablesMap = { [key: string]: string | undefined };
export interface CreateStageRequest {
  AccessLogSettings?: AccessLogSettings;
  ApiId: string;
  AutoDeploy?: boolean;
  ClientCertificateId?: string;
  DefaultRouteSettings?: RouteSettings;
  DeploymentId?: string;
  Description?: string;
  RouteSettings?: { [key: string]: RouteSettings | undefined };
  StageName?: string;
  StageVariables?: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
}
export interface CreateStageResponse {
  AccessLogSettings?: AccessLogSettings;
  ApiGatewayManaged?: boolean;
  AutoDeploy?: boolean;
  ClientCertificateId?: string;
  CreatedDate?: Date;
  DefaultRouteSettings?: RouteSettings;
  DeploymentId?: string;
  Description?: string;
  LastDeploymentStatusMessage?: string;
  LastUpdatedDate?: Date;
  RouteSettings?: { [key: string]: RouteSettings | undefined };
  StageName?: string;
  StageVariables?: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
}
export type SecurityGroupIdList = string[];
export type SubnetIdList = string[];
export interface CreateVpcLinkRequest {
  Name?: string;
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
  Tags?: { [key: string]: string | undefined };
}
export type VpcLinkStatus =
  | "PENDING"
  | "AVAILABLE"
  | "DELETING"
  | "FAILED"
  | "INACTIVE"
  | (string & {});
export type VpcLinkVersion = "V2" | (string & {});
export interface CreateVpcLinkResponse {
  CreatedDate?: Date;
  Name?: string;
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
  Tags?: { [key: string]: string | undefined };
  VpcLinkId?: string;
  VpcLinkStatus?: VpcLinkStatus;
  VpcLinkStatusMessage?: string;
  VpcLinkVersion?: VpcLinkVersion;
}
export interface DeleteAccessLogSettingsRequest {
  ApiId: string;
  StageName: string;
}
export interface DeleteAccessLogSettingsResponse {}
export interface DeleteApiRequest {
  ApiId: string;
}
export interface DeleteApiResponse {}
export interface DeleteApiMappingRequest {
  ApiMappingId: string;
  DomainName: string;
}
export interface DeleteApiMappingResponse {}
export interface DeleteAuthorizerRequest {
  ApiId: string;
  AuthorizerId: string;
}
export interface DeleteAuthorizerResponse {}
export interface DeleteCorsConfigurationRequest {
  ApiId: string;
}
export interface DeleteCorsConfigurationResponse {}
export interface DeleteDeploymentRequest {
  ApiId: string;
  DeploymentId: string;
}
export interface DeleteDeploymentResponse {}
export interface DeleteDomainNameRequest {
  DomainName: string;
}
export interface DeleteDomainNameResponse {}
export interface DeleteIntegrationRequest {
  ApiId: string;
  IntegrationId: string;
}
export interface DeleteIntegrationResponse {}
export interface DeleteIntegrationResponseRequest {
  ApiId: string;
  IntegrationId: string;
  IntegrationResponseId: string;
}
export interface DeleteIntegrationResponseResponse {}
export interface DeleteModelRequest {
  ApiId: string;
  ModelId: string;
}
export interface DeleteModelResponse {}
export interface DeletePortalRequest {
  PortalId: string;
}
export interface DeletePortalResponse {}
export interface DeletePortalProductRequest {
  PortalProductId: string;
}
export interface DeletePortalProductResponse {}
export interface DeletePortalProductSharingPolicyRequest {
  PortalProductId: string;
}
export interface DeletePortalProductSharingPolicyResponse {}
export interface DeleteProductPageRequest {
  PortalProductId: string;
  ProductPageId: string;
}
export interface DeleteProductPageResponse {}
export interface DeleteProductRestEndpointPageRequest {
  PortalProductId: string;
  ProductRestEndpointPageId: string;
}
export interface DeleteProductRestEndpointPageResponse {}
export interface DeleteRouteRequest {
  ApiId: string;
  RouteId: string;
}
export interface DeleteRouteResponse {}
export interface DeleteRouteRequestParameterRequest {
  ApiId: string;
  RequestParameterKey: string;
  RouteId: string;
}
export interface DeleteRouteRequestParameterResponse {}
export interface DeleteRouteResponseRequest {
  ApiId: string;
  RouteId: string;
  RouteResponseId: string;
}
export interface DeleteRouteResponseResponse {}
export interface DeleteRouteSettingsRequest {
  ApiId: string;
  RouteKey: string;
  StageName: string;
}
export interface DeleteRouteSettingsResponse {}
export interface DeleteRoutingRuleRequest {
  DomainName: string;
  DomainNameId?: string;
  RoutingRuleId: string;
}
export interface DeleteRoutingRuleResponse {}
export interface DeleteStageRequest {
  ApiId: string;
  StageName: string;
}
export interface DeleteStageResponse {}
export interface DeleteVpcLinkRequest {
  VpcLinkId: string;
}
export interface DeleteVpcLinkResponse {}
export interface DisablePortalRequest {
  PortalId: string;
}
export interface DisablePortalResponse {}
export interface ExportApiRequest {
  ApiId: string;
  ExportVersion?: string;
  IncludeExtensions?: boolean;
  OutputType?: string;
  Specification: string;
  StageName?: string;
}
export interface ExportApiResponse {
  body?: T.StreamingOutputBody;
}
export interface GetApiRequest {
  ApiId: string;
}
export interface GetApiResponse {
  ApiEndpoint?: string;
  ApiGatewayManaged?: boolean;
  ApiId?: string;
  ApiKeySelectionExpression?: string;
  CorsConfiguration?: Cors;
  CreatedDate?: Date;
  Description?: string;
  DisableSchemaValidation?: boolean;
  DisableExecuteApiEndpoint?: boolean;
  ImportInfo?: string[];
  IpAddressType?: IpAddressType;
  Name?: string;
  ProtocolType?: ProtocolType;
  RouteSelectionExpression?: string;
  Tags?: { [key: string]: string | undefined };
  Version?: string;
  Warnings?: string[];
}
export interface GetApiMappingRequest {
  ApiMappingId: string;
  DomainName: string;
}
export interface GetApiMappingResponse {
  ApiId?: string;
  ApiMappingId?: string;
  ApiMappingKey?: string;
  Stage?: string;
}
export interface GetApiMappingsRequest {
  DomainName: string;
  MaxResults?: string;
  NextToken?: string;
}
export interface ApiMapping {
  ApiId?: string;
  ApiMappingId?: string;
  ApiMappingKey?: string;
  Stage?: string;
}
export type __listOfApiMapping = ApiMapping[];
const __listOfApiMapping = /*@__PURE__*/ __L.at(__c64, 1);
export type NextToken = string;
export interface GetApiMappingsResponse {
  Items?: (ApiMapping & { ApiId: Id; Stage: StringWithLengthBetween1And128 })[];
  NextToken?: string;
}
export interface GetApisRequest {
  MaxResults?: string;
  NextToken?: string;
}
export interface Api {
  ApiEndpoint?: string;
  ApiGatewayManaged?: boolean;
  ApiId?: string;
  ApiKeySelectionExpression?: string;
  CorsConfiguration?: Cors;
  CreatedDate?: Date;
  Description?: string;
  DisableSchemaValidation?: boolean;
  DisableExecuteApiEndpoint?: boolean;
  ImportInfo?: string[];
  IpAddressType?: IpAddressType;
  Name?: string;
  ProtocolType?: ProtocolType;
  RouteSelectionExpression?: string;
  Tags?: { [key: string]: string | undefined };
  Version?: string;
  Warnings?: string[];
}
export type __listOfApi = Api[];
const __listOfApi = /*@__PURE__*/ __L.at(__c65, 1);
export interface GetApisResponse {
  Items?: (Api & {
    Name: StringWithLengthBetween1And128;
    ProtocolType: ProtocolType;
    RouteSelectionExpression: SelectionExpression;
  })[];
  NextToken?: string;
}
export interface GetAuthorizerRequest {
  ApiId: string;
  AuthorizerId: string;
}
export interface GetAuthorizerResponse {
  AuthorizerCredentialsArn?: string;
  AuthorizerId?: string;
  AuthorizerPayloadFormatVersion?: string;
  AuthorizerResultTtlInSeconds?: number;
  AuthorizerType?: AuthorizerType;
  AuthorizerUri?: string;
  EnableSimpleResponses?: boolean;
  IdentitySource?: string[];
  IdentityValidationExpression?: string;
  JwtConfiguration?: JWTConfiguration;
  Name?: string;
}
export interface GetAuthorizersRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
}
export interface Authorizer {
  AuthorizerCredentialsArn?: string;
  AuthorizerId?: string;
  AuthorizerPayloadFormatVersion?: string;
  AuthorizerResultTtlInSeconds?: number;
  AuthorizerType?: AuthorizerType;
  AuthorizerUri?: string;
  EnableSimpleResponses?: boolean;
  IdentitySource?: string[];
  IdentityValidationExpression?: string;
  JwtConfiguration?: JWTConfiguration;
  Name?: string;
}
export type __listOfAuthorizer = Authorizer[];
const __listOfAuthorizer = /*@__PURE__*/ __L.at(__c71, 1);
export interface GetAuthorizersResponse {
  Items?: (Authorizer & { Name: StringWithLengthBetween1And128 })[];
  NextToken?: string;
}
export interface GetDeploymentRequest {
  ApiId: string;
  DeploymentId: string;
}
export interface GetDeploymentResponse {
  AutoDeployed?: boolean;
  CreatedDate?: Date;
  DeploymentId?: string;
  DeploymentStatus?: DeploymentStatus;
  DeploymentStatusMessage?: string;
  Description?: string;
}
export interface GetDeploymentsRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
}
export interface Deployment {
  AutoDeployed?: boolean;
  CreatedDate?: Date;
  DeploymentId?: string;
  DeploymentStatus?: DeploymentStatus;
  DeploymentStatusMessage?: string;
  Description?: string;
}
export type __listOfDeployment = Deployment[];
const __listOfDeployment = /*@__PURE__*/ __L.at(__c73, 1);
export interface GetDeploymentsResponse {
  Items?: Deployment[];
  NextToken?: string;
}
export interface GetDomainNameRequest {
  DomainName: string;
}
export interface GetDomainNameResponse {
  ApiMappingSelectionExpression?: string;
  DomainName?: string;
  DomainNameArn?: string;
  DomainNameConfigurations?: DomainNameConfiguration[];
  MutualTlsAuthentication?: MutualTlsAuthentication;
  RoutingMode?: RoutingMode;
  Tags?: { [key: string]: string | undefined };
}
export interface GetDomainNamesRequest {
  MaxResults?: string;
  NextToken?: string;
}
export interface DomainName {
  ApiMappingSelectionExpression?: string;
  DomainName?: string;
  DomainNameArn?: string;
  DomainNameConfigurations?: DomainNameConfiguration[];
  MutualTlsAuthentication?: MutualTlsAuthentication;
  RoutingMode?: RoutingMode;
  Tags?: { [key: string]: string | undefined };
}
export type __listOfDomainName = DomainName[];
const __listOfDomainName = /*@__PURE__*/ __L.at(__c75, 1);
export interface GetDomainNamesResponse {
  Items?: (DomainName & { DomainName: StringWithLengthBetween1And512 })[];
  NextToken?: string;
}
export interface GetIntegrationRequest {
  ApiId: string;
  IntegrationId: string;
}
export interface GetIntegrationResult {
  ApiGatewayManaged?: boolean;
  ConnectionId?: string;
  ConnectionType?: ConnectionType;
  ContentHandlingStrategy?: ContentHandlingStrategy;
  CredentialsArn?: string;
  Description?: string;
  IntegrationId?: string;
  IntegrationMethod?: string;
  IntegrationResponseSelectionExpression?: string;
  IntegrationSubtype?: string;
  IntegrationType?: IntegrationType;
  IntegrationUri?: string;
  PassthroughBehavior?: PassthroughBehavior;
  PayloadFormatVersion?: string;
  RequestParameters?: { [key: string]: string | undefined };
  RequestTemplates?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: { [key: string]: string | undefined } | undefined };
  TemplateSelectionExpression?: string;
  TimeoutInMillis?: number;
  TlsConfig?: TlsConfig;
}
export interface GetIntegrationResponseRequest {
  ApiId: string;
  IntegrationId: string;
  IntegrationResponseId: string;
}
export interface GetIntegrationResponseResponse {
  ContentHandlingStrategy?: ContentHandlingStrategy;
  IntegrationResponseId?: string;
  IntegrationResponseKey?: string;
  ResponseParameters?: { [key: string]: string | undefined };
  ResponseTemplates?: { [key: string]: string | undefined };
  TemplateSelectionExpression?: string;
}
export interface GetIntegrationResponsesRequest {
  ApiId: string;
  IntegrationId: string;
  MaxResults?: string;
  NextToken?: string;
}
export interface IntegrationResponse {
  ContentHandlingStrategy?: ContentHandlingStrategy;
  IntegrationResponseId?: string;
  IntegrationResponseKey?: string;
  ResponseParameters?: { [key: string]: string | undefined };
  ResponseTemplates?: { [key: string]: string | undefined };
  TemplateSelectionExpression?: string;
}
export type __listOfIntegrationResponse = IntegrationResponse[];
const __listOfIntegrationResponse = /*@__PURE__*/ __L.at(__c78, 1);
export interface GetIntegrationResponsesResponse {
  Items?: (IntegrationResponse & { IntegrationResponseKey: SelectionKey })[];
  NextToken?: string;
}
export interface GetIntegrationsRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
}
export interface Integration {
  ApiGatewayManaged?: boolean;
  ConnectionId?: string;
  ConnectionType?: ConnectionType;
  ContentHandlingStrategy?: ContentHandlingStrategy;
  CredentialsArn?: string;
  Description?: string;
  IntegrationId?: string;
  IntegrationMethod?: string;
  IntegrationResponseSelectionExpression?: string;
  IntegrationSubtype?: string;
  IntegrationType?: IntegrationType;
  IntegrationUri?: string;
  PassthroughBehavior?: PassthroughBehavior;
  PayloadFormatVersion?: string;
  RequestParameters?: { [key: string]: string | undefined };
  RequestTemplates?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: { [key: string]: string | undefined } | undefined };
  TemplateSelectionExpression?: string;
  TimeoutInMillis?: number;
  TlsConfig?: TlsConfig;
}
export type __listOfIntegration = Integration[];
const __listOfIntegration = /*@__PURE__*/ __L.at(__c79, 1);
export interface GetIntegrationsResponse {
  Items?: Integration[];
  NextToken?: string;
}
export interface GetModelRequest {
  ApiId: string;
  ModelId: string;
}
export interface GetModelResponse {
  ContentType?: string;
  Description?: string;
  ModelId?: string;
  Name?: string;
  Schema?: string;
}
export interface GetModelsRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
}
export interface Model {
  ContentType?: string;
  Description?: string;
  ModelId?: string;
  Name?: string;
  Schema?: string;
}
export type __listOfModel = Model[];
const __listOfModel = /*@__PURE__*/ __L.at(__c83, 1);
export interface GetModelsResponse {
  Items?: (Model & { Name: StringWithLengthBetween1And128 })[];
  NextToken?: string;
}
export interface GetModelTemplateRequest {
  ApiId: string;
  ModelId: string;
}
export interface GetModelTemplateResponse {
  Value?: string;
}
export interface GetPortalRequest {
  PortalId: string;
}
export type PreviewStatus =
  | "PREVIEW_IN_PROGRESS"
  | "PREVIEW_FAILED"
  | "PREVIEW_READY"
  | (string & {});
export interface Preview {
  PreviewStatus?: PreviewStatus;
  PreviewUrl?: string;
  StatusException?: StatusException;
}
export interface GetPortalResponse {
  Authorization?: Authorization & {
    CognitoConfig: CognitoConfig & {
      AppClientId: __stringMin1Max256;
      UserPoolArn: __stringMin20Max2048;
      UserPoolDomain: __stringMin20Max2048;
    };
  };
  EndpointConfiguration?: EndpointConfigurationResponse & {
    PortalDefaultDomainName: __stringMin3Max256;
    PortalDomainHostedZoneId: __stringMin1Max64;
  };
  IncludedPortalProductArns?: string[];
  LastModified?: Date;
  LastPublished?: Date;
  LastPublishedDescription?: string;
  PortalArn?: string;
  PortalContent?: PortalContent & {
    DisplayName: __stringMin3Max255;
    Theme: PortalTheme & {
      CustomColors: CustomColors & {
        AccentColor: __stringMin1Max16;
        BackgroundColor: __stringMin1Max16;
        ErrorValidationColor: __stringMin1Max16;
        HeaderColor: __stringMin1Max16;
        NavigationColor: __stringMin1Max16;
        TextColor: __stringMin1Max16;
      };
    };
  };
  PortalId?: string;
  Preview?: Preview & { PreviewStatus: PreviewStatus };
  PublishStatus?: PublishStatus;
  RumAppMonitorName?: string;
  StatusException?: StatusException;
  Tags?: { [key: string]: string | undefined };
}
export interface GetPortalProductRequest {
  PortalProductId: string;
  ResourceOwnerAccountId?: string;
}
export interface GetPortalProductResponse {
  Description?: string;
  DisplayName?: string;
  DisplayOrder?: DisplayOrder & {
    Contents: (Section & {
      ProductRestEndpointPageArns: __listOf__stringMin20Max2048;
      SectionName: string;
    })[];
  };
  LastModified?: Date;
  PortalProductArn?: string;
  PortalProductId?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface GetPortalProductSharingPolicyRequest {
  PortalProductId: string;
}
export type __stringMin1Max307200 = string;
export interface GetPortalProductSharingPolicyResponse {
  PolicyDocument?: string;
  PortalProductId?: string;
}
export interface GetProductPageRequest {
  PortalProductId: string;
  ProductPageId: string;
  ResourceOwnerAccountId?: string;
}
export interface GetProductPageResponse {
  DisplayContent?: DisplayContent & { Body: __stringMin1Max32768; Title: __stringMin1Max255 };
  LastModified?: Date;
  ProductPageArn?: string;
  ProductPageId?: string;
}
export interface GetProductRestEndpointPageRequest {
  IncludeRawDisplayContent?: string;
  PortalProductId: string;
  ProductRestEndpointPageId: string;
  ResourceOwnerAccountId?: string;
}
export interface GetProductRestEndpointPageResponse {
  DisplayContent?: EndpointDisplayContentResponse & { Endpoint: __stringMin1Max1024 };
  LastModified?: Date;
  ProductRestEndpointPageArn?: string;
  ProductRestEndpointPageId?: string;
  RawDisplayContent?: string;
  RestEndpointIdentifier?: RestEndpointIdentifier & {
    IdentifierParts: IdentifierParts & {
      Method: __stringMin1Max20;
      Path: __stringMin1Max4096;
      RestApiId: __stringMin1Max50;
      Stage: __stringMin1Max128;
    };
  };
  Status?: Status;
  StatusException?: StatusException;
  TryItState?: TryItState;
}
export interface GetRouteRequest {
  ApiId: string;
  RouteId: string;
}
export interface GetRouteResult {
  ApiGatewayManaged?: boolean;
  ApiKeyRequired?: boolean;
  AuthorizationScopes?: string[];
  AuthorizationType?: AuthorizationType;
  AuthorizerId?: string;
  ModelSelectionExpression?: string;
  OperationName?: string;
  RequestModels?: { [key: string]: string | undefined };
  RequestParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteId?: string;
  RouteKey?: string;
  RouteResponseSelectionExpression?: string;
  Target?: string;
}
export interface GetRouteResponseRequest {
  ApiId: string;
  RouteId: string;
  RouteResponseId: string;
}
export interface GetRouteResponseResponse {
  ModelSelectionExpression?: string;
  ResponseModels?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteResponseId?: string;
  RouteResponseKey?: string;
}
export interface GetRouteResponsesRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
  RouteId: string;
}
export interface RouteResponse {
  ModelSelectionExpression?: string;
  ResponseModels?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteResponseId?: string;
  RouteResponseKey?: string;
}
export type __listOfRouteResponse = RouteResponse[];
const __listOfRouteResponse = /*@__PURE__*/ __L.at(__c95, 1);
export interface GetRouteResponsesResponse {
  Items?: (RouteResponse & { RouteResponseKey: SelectionKey })[];
  NextToken?: string;
}
export interface GetRoutesRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
}
export interface Route {
  ApiGatewayManaged?: boolean;
  ApiKeyRequired?: boolean;
  AuthorizationScopes?: string[];
  AuthorizationType?: AuthorizationType;
  AuthorizerId?: string;
  ModelSelectionExpression?: string;
  OperationName?: string;
  RequestModels?: { [key: string]: string | undefined };
  RequestParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteId?: string;
  RouteKey?: string;
  RouteResponseSelectionExpression?: string;
  Target?: string;
}
export type __listOfRoute = Route[];
const __listOfRoute = /*@__PURE__*/ __L.at(__c96, 1);
export interface GetRoutesResponse {
  Items?: (Route & { RouteKey: SelectionKey })[];
  NextToken?: string;
}
export interface GetRoutingRuleRequest {
  DomainName: string;
  DomainNameId?: string;
  RoutingRuleId: string;
}
export interface GetRoutingRuleResponse {
  Actions?: (RoutingRuleAction & {
    InvokeApi: RoutingRuleActionInvokeApi & { ApiId: Id; Stage: StringWithLengthBetween1And128 };
  })[];
  Conditions?: (RoutingRuleCondition & {
    MatchBasePaths: RoutingRuleMatchBasePaths & { AnyOf: __listOfSelectionKey };
    MatchHeaders: RoutingRuleMatchHeaders & {
      AnyOf: (RoutingRuleMatchHeaderValue & {
        Header: SelectionKey;
        ValueGlob: SelectionExpression;
      })[];
    };
  })[];
  Priority?: number;
  RoutingRuleArn?: string;
  RoutingRuleId?: string;
}
export interface GetStageRequest {
  ApiId: string;
  StageName: string;
}
export interface GetStageResponse {
  AccessLogSettings?: AccessLogSettings;
  ApiGatewayManaged?: boolean;
  AutoDeploy?: boolean;
  ClientCertificateId?: string;
  CreatedDate?: Date;
  DefaultRouteSettings?: RouteSettings;
  DeploymentId?: string;
  Description?: string;
  LastDeploymentStatusMessage?: string;
  LastUpdatedDate?: Date;
  RouteSettings?: { [key: string]: RouteSettings | undefined };
  StageName?: string;
  StageVariables?: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
}
export interface GetStagesRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
}
export interface Stage {
  AccessLogSettings?: AccessLogSettings;
  ApiGatewayManaged?: boolean;
  AutoDeploy?: boolean;
  ClientCertificateId?: string;
  CreatedDate?: Date;
  DefaultRouteSettings?: RouteSettings;
  DeploymentId?: string;
  Description?: string;
  LastDeploymentStatusMessage?: string;
  LastUpdatedDate?: Date;
  RouteSettings?: { [key: string]: RouteSettings | undefined };
  StageName?: string;
  StageVariables?: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
}
export type __listOfStage = Stage[];
const __listOfStage = /*@__PURE__*/ __L.at(__c99, 1);
export interface GetStagesResponse {
  Items?: (Stage & { StageName: StringWithLengthBetween1And128 })[];
  NextToken?: string;
}
export interface GetTagsRequest {
  ResourceArn: string;
}
export interface GetTagsResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface GetVpcLinkRequest {
  VpcLinkId: string;
}
export interface GetVpcLinkResponse {
  CreatedDate?: Date;
  Name?: string;
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
  Tags?: { [key: string]: string | undefined };
  VpcLinkId?: string;
  VpcLinkStatus?: VpcLinkStatus;
  VpcLinkStatusMessage?: string;
  VpcLinkVersion?: VpcLinkVersion;
}
export interface GetVpcLinksRequest {
  MaxResults?: string;
  NextToken?: string;
}
export interface VpcLink {
  CreatedDate?: Date;
  Name?: string;
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
  Tags?: { [key: string]: string | undefined };
  VpcLinkId?: string;
  VpcLinkStatus?: VpcLinkStatus;
  VpcLinkStatusMessage?: string;
  VpcLinkVersion?: VpcLinkVersion;
}
export type __listOfVpcLink = VpcLink[];
const __listOfVpcLink = /*@__PURE__*/ __L.at(__c102, 1);
export interface GetVpcLinksResponse {
  Items?: (VpcLink & {
    Name: StringWithLengthBetween1And128;
    SecurityGroupIds: SecurityGroupIdList;
    SubnetIds: SubnetIdList;
    VpcLinkId: Id;
  })[];
  NextToken?: string;
}
export interface ImportApiRequest {
  Basepath?: string;
  Body?: string;
  FailOnWarnings?: boolean;
}
export interface ImportApiResponse {
  ApiEndpoint?: string;
  ApiGatewayManaged?: boolean;
  ApiId?: string;
  ApiKeySelectionExpression?: string;
  CorsConfiguration?: Cors;
  CreatedDate?: Date;
  Description?: string;
  DisableSchemaValidation?: boolean;
  DisableExecuteApiEndpoint?: boolean;
  ImportInfo?: string[];
  IpAddressType?: IpAddressType;
  Name?: string;
  ProtocolType?: ProtocolType;
  RouteSelectionExpression?: string;
  Tags?: { [key: string]: string | undefined };
  Version?: string;
  Warnings?: string[];
}
export interface ListPortalProductsRequest {
  MaxResults?: string;
  NextToken?: string;
  ResourceOwner?: string;
}
export interface PortalProductSummary {
  Description?: string;
  DisplayName?: string;
  LastModified?: Date;
  PortalProductArn?: string;
  PortalProductId?: string;
  Tags?: { [key: string]: string | undefined };
}
export type __listOfPortalProductSummary = PortalProductSummary[];
const __listOfPortalProductSummary = /*@__PURE__*/ __L.at(__c104, 2);
export interface ListPortalProductsResponse {
  Items?: (PortalProductSummary & {
    Description: __stringMin0Max1024;
    DisplayName: __stringMin1Max255;
    LastModified: __timestampIso8601;
    PortalProductArn: __stringMin20Max2048;
    PortalProductId: __stringMin10Max30PatternAZ09;
  })[];
  NextToken?: string;
}
export interface ListPortalsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export interface PortalSummary {
  Authorization?: Authorization;
  EndpointConfiguration?: EndpointConfigurationResponse;
  IncludedPortalProductArns?: string[];
  LastModified?: Date;
  LastPublished?: Date;
  LastPublishedDescription?: string;
  PortalArn?: string;
  PortalContent?: PortalContent;
  PortalId?: string;
  Preview?: Preview;
  PublishStatus?: PublishStatus;
  RumAppMonitorName?: string;
  StatusException?: StatusException;
  Tags?: { [key: string]: string | undefined };
}
export type __listOfPortalSummary = PortalSummary[];
const __listOfPortalSummary = /*@__PURE__*/ __L.at(__c107, 1);
export interface ListPortalsResponse {
  Items?: (PortalSummary & {
    Authorization: Authorization & {
      CognitoConfig: CognitoConfig & {
        AppClientId: __stringMin1Max256;
        UserPoolArn: __stringMin20Max2048;
        UserPoolDomain: __stringMin20Max2048;
      };
    };
    EndpointConfiguration: EndpointConfigurationResponse & {
      PortalDefaultDomainName: __stringMin3Max256;
      PortalDomainHostedZoneId: __stringMin1Max64;
    };
    IncludedPortalProductArns: __listOf__stringMin20Max2048;
    LastModified: __timestampIso8601;
    PortalArn: __stringMin20Max2048;
    PortalContent: PortalContent & {
      DisplayName: __stringMin3Max255;
      Theme: PortalTheme & {
        CustomColors: CustomColors & {
          AccentColor: __stringMin1Max16;
          BackgroundColor: __stringMin1Max16;
          ErrorValidationColor: __stringMin1Max16;
          HeaderColor: __stringMin1Max16;
          NavigationColor: __stringMin1Max16;
          TextColor: __stringMin1Max16;
        };
      };
    };
    PortalId: __stringMin10Max30PatternAZ09;
    Preview: Preview & { PreviewStatus: PreviewStatus };
  })[];
  NextToken?: string;
}
export interface ListProductPagesRequest {
  MaxResults?: string;
  NextToken?: string;
  PortalProductId: string;
  ResourceOwnerAccountId?: string;
}
export interface ProductPageSummaryNoBody {
  LastModified?: Date;
  PageTitle?: string;
  ProductPageArn?: string;
  ProductPageId?: string;
}
export type __listOfProductPageSummaryNoBody = ProductPageSummaryNoBody[];
const __listOfProductPageSummaryNoBody = /*@__PURE__*/ __L.at(__c108, 2);
export interface ListProductPagesResponse {
  Items?: (ProductPageSummaryNoBody & {
    LastModified: __timestampIso8601;
    PageTitle: __stringMin1Max255;
    ProductPageArn: __stringMin20Max2048;
    ProductPageId: __stringMin10Max30PatternAZ09;
  })[];
  NextToken?: string;
}
export interface ListProductRestEndpointPagesRequest {
  MaxResults?: string;
  NextToken?: string;
  PortalProductId: string;
  ResourceOwnerAccountId?: string;
}
export interface ProductRestEndpointPageSummaryNoBody {
  Endpoint?: string;
  LastModified?: Date;
  OperationName?: string;
  ProductRestEndpointPageArn?: string;
  ProductRestEndpointPageId?: string;
  RestEndpointIdentifier?: RestEndpointIdentifier;
  Status?: Status;
  StatusException?: StatusException;
  TryItState?: TryItState;
}
export type __listOfProductRestEndpointPageSummaryNoBody = ProductRestEndpointPageSummaryNoBody[];
const __listOfProductRestEndpointPageSummaryNoBody = /*@__PURE__*/ __L.at(__c109, 2);
export interface ListProductRestEndpointPagesResponse {
  Items?: (ProductRestEndpointPageSummaryNoBody & {
    Endpoint: __stringMin1Max1024;
    LastModified: __timestampIso8601;
    ProductRestEndpointPageArn: __stringMin20Max2048;
    ProductRestEndpointPageId: __stringMin10Max30PatternAZ09;
    RestEndpointIdentifier: RestEndpointIdentifier & {
      IdentifierParts: IdentifierParts & {
        Method: __stringMin1Max20;
        Path: __stringMin1Max4096;
        RestApiId: __stringMin1Max50;
        Stage: __stringMin1Max128;
      };
    };
    Status: Status;
    TryItState: TryItState;
  })[];
  NextToken?: string;
}
export type MaxResults = number;
export interface ListRoutingRulesRequest {
  DomainName: string;
  DomainNameId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface RoutingRule {
  Actions?: RoutingRuleAction[];
  Conditions?: RoutingRuleCondition[];
  Priority?: number;
  RoutingRuleArn?: string;
  RoutingRuleId?: string;
}
export type __listOfRoutingRule = RoutingRule[];
const __listOfRoutingRule = /*@__PURE__*/ __L.at(__c110, 1);
export interface ListRoutingRulesResponse {
  NextToken?: string;
  RoutingRules?: (RoutingRule & {
    Actions: (RoutingRuleAction & {
      InvokeApi: RoutingRuleActionInvokeApi & { ApiId: Id; Stage: StringWithLengthBetween1And128 };
    })[];
    Conditions: (RoutingRuleCondition & {
      MatchBasePaths: RoutingRuleMatchBasePaths & { AnyOf: __listOfSelectionKey };
      MatchHeaders: RoutingRuleMatchHeaders & {
        AnyOf: (RoutingRuleMatchHeaderValue & {
          Header: SelectionKey;
          ValueGlob: SelectionExpression;
        })[];
      };
    })[];
  })[];
}
export interface PreviewPortalRequest {
  PortalId: string;
}
export interface PreviewPortalResponse {}
export interface PublishPortalRequest {
  Description?: string;
  PortalId: string;
}
export interface PublishPortalResponse {}
export interface PutPortalProductSharingPolicyRequest {
  PolicyDocument?: string;
  PortalProductId: string;
}
export interface PutPortalProductSharingPolicyResponse {}
export interface PutRoutingRuleRequest {
  Actions?: RoutingRuleAction[];
  Conditions?: RoutingRuleCondition[];
  DomainName: string;
  DomainNameId?: string;
  Priority?: number;
  RoutingRuleId: string;
}
export interface PutRoutingRuleResponse {
  Actions?: (RoutingRuleAction & {
    InvokeApi: RoutingRuleActionInvokeApi & { ApiId: Id; Stage: StringWithLengthBetween1And128 };
  })[];
  Conditions?: (RoutingRuleCondition & {
    MatchBasePaths: RoutingRuleMatchBasePaths & { AnyOf: __listOfSelectionKey };
    MatchHeaders: RoutingRuleMatchHeaders & {
      AnyOf: (RoutingRuleMatchHeaderValue & {
        Header: SelectionKey;
        ValueGlob: SelectionExpression;
      })[];
    };
  })[];
  Priority?: number;
  RoutingRuleArn?: string;
  RoutingRuleId?: string;
}
export interface ReimportApiRequest {
  ApiId: string;
  Basepath?: string;
  Body?: string;
  FailOnWarnings?: boolean;
}
export interface ReimportApiResponse {
  ApiEndpoint?: string;
  ApiGatewayManaged?: boolean;
  ApiId?: string;
  ApiKeySelectionExpression?: string;
  CorsConfiguration?: Cors;
  CreatedDate?: Date;
  Description?: string;
  DisableSchemaValidation?: boolean;
  DisableExecuteApiEndpoint?: boolean;
  ImportInfo?: string[];
  IpAddressType?: IpAddressType;
  Name?: string;
  ProtocolType?: ProtocolType;
  RouteSelectionExpression?: string;
  Tags?: { [key: string]: string | undefined };
  Version?: string;
  Warnings?: string[];
}
export interface ResetAuthorizersCacheRequest {
  ApiId: string;
  StageName: string;
}
export interface ResetAuthorizersCacheResponse {}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export interface UntagResourceResponse {}
export interface UpdateApiRequest {
  ApiId: string;
  ApiKeySelectionExpression?: string;
  CorsConfiguration?: Cors;
  CredentialsArn?: string;
  Description?: string;
  DisableSchemaValidation?: boolean;
  DisableExecuteApiEndpoint?: boolean;
  IpAddressType?: IpAddressType;
  Name?: string;
  RouteKey?: string;
  RouteSelectionExpression?: string;
  Target?: string;
  Version?: string;
}
export interface UpdateApiResponse {
  ApiEndpoint?: string;
  ApiGatewayManaged?: boolean;
  ApiId?: string;
  ApiKeySelectionExpression?: string;
  CorsConfiguration?: Cors;
  CreatedDate?: Date;
  Description?: string;
  DisableSchemaValidation?: boolean;
  DisableExecuteApiEndpoint?: boolean;
  ImportInfo?: string[];
  IpAddressType?: IpAddressType;
  Name?: string;
  ProtocolType?: ProtocolType;
  RouteSelectionExpression?: string;
  Tags?: { [key: string]: string | undefined };
  Version?: string;
  Warnings?: string[];
}
export interface UpdateApiMappingRequest {
  ApiId?: string;
  ApiMappingId: string;
  ApiMappingKey?: string;
  DomainName: string;
  Stage?: string;
}
export interface UpdateApiMappingResponse {
  ApiId?: string;
  ApiMappingId?: string;
  ApiMappingKey?: string;
  Stage?: string;
}
export interface UpdateAuthorizerRequest {
  ApiId: string;
  AuthorizerCredentialsArn?: string;
  AuthorizerId: string;
  AuthorizerPayloadFormatVersion?: string;
  AuthorizerResultTtlInSeconds?: number;
  AuthorizerType?: AuthorizerType;
  AuthorizerUri?: string;
  EnableSimpleResponses?: boolean;
  IdentitySource?: string[];
  IdentityValidationExpression?: string;
  JwtConfiguration?: JWTConfiguration;
  Name?: string;
}
export interface UpdateAuthorizerResponse {
  AuthorizerCredentialsArn?: string;
  AuthorizerId?: string;
  AuthorizerPayloadFormatVersion?: string;
  AuthorizerResultTtlInSeconds?: number;
  AuthorizerType?: AuthorizerType;
  AuthorizerUri?: string;
  EnableSimpleResponses?: boolean;
  IdentitySource?: string[];
  IdentityValidationExpression?: string;
  JwtConfiguration?: JWTConfiguration;
  Name?: string;
}
export interface UpdateDeploymentRequest {
  ApiId: string;
  DeploymentId: string;
  Description?: string;
}
export interface UpdateDeploymentResponse {
  AutoDeployed?: boolean;
  CreatedDate?: Date;
  DeploymentId?: string;
  DeploymentStatus?: DeploymentStatus;
  DeploymentStatusMessage?: string;
  Description?: string;
}
export interface UpdateDomainNameRequest {
  DomainName: string;
  DomainNameConfigurations?: DomainNameConfiguration[];
  MutualTlsAuthentication?: MutualTlsAuthenticationInput;
  RoutingMode?: RoutingMode;
}
export interface UpdateDomainNameResponse {
  ApiMappingSelectionExpression?: string;
  DomainName?: string;
  DomainNameArn?: string;
  DomainNameConfigurations?: DomainNameConfiguration[];
  MutualTlsAuthentication?: MutualTlsAuthentication;
  RoutingMode?: RoutingMode;
  Tags?: { [key: string]: string | undefined };
}
export interface UpdateIntegrationRequest {
  ApiId: string;
  ConnectionId?: string;
  ConnectionType?: ConnectionType;
  ContentHandlingStrategy?: ContentHandlingStrategy;
  CredentialsArn?: string;
  Description?: string;
  IntegrationId: string;
  IntegrationMethod?: string;
  IntegrationSubtype?: string;
  IntegrationType?: IntegrationType;
  IntegrationUri?: string;
  PassthroughBehavior?: PassthroughBehavior;
  PayloadFormatVersion?: string;
  RequestParameters?: { [key: string]: string | undefined };
  RequestTemplates?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: { [key: string]: string | undefined } | undefined };
  TemplateSelectionExpression?: string;
  TimeoutInMillis?: number;
  TlsConfig?: TlsConfigInput;
}
export interface UpdateIntegrationResult {
  ApiGatewayManaged?: boolean;
  ConnectionId?: string;
  ConnectionType?: ConnectionType;
  ContentHandlingStrategy?: ContentHandlingStrategy;
  CredentialsArn?: string;
  Description?: string;
  IntegrationId?: string;
  IntegrationMethod?: string;
  IntegrationResponseSelectionExpression?: string;
  IntegrationSubtype?: string;
  IntegrationType?: IntegrationType;
  IntegrationUri?: string;
  PassthroughBehavior?: PassthroughBehavior;
  PayloadFormatVersion?: string;
  RequestParameters?: { [key: string]: string | undefined };
  RequestTemplates?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: { [key: string]: string | undefined } | undefined };
  TemplateSelectionExpression?: string;
  TimeoutInMillis?: number;
  TlsConfig?: TlsConfig;
}
export interface UpdateIntegrationResponseRequest {
  ApiId: string;
  ContentHandlingStrategy?: ContentHandlingStrategy;
  IntegrationId: string;
  IntegrationResponseId: string;
  IntegrationResponseKey?: string;
  ResponseParameters?: { [key: string]: string | undefined };
  ResponseTemplates?: { [key: string]: string | undefined };
  TemplateSelectionExpression?: string;
}
export interface UpdateIntegrationResponseResponse {
  ContentHandlingStrategy?: ContentHandlingStrategy;
  IntegrationResponseId?: string;
  IntegrationResponseKey?: string;
  ResponseParameters?: { [key: string]: string | undefined };
  ResponseTemplates?: { [key: string]: string | undefined };
  TemplateSelectionExpression?: string;
}
export interface UpdateModelRequest {
  ApiId: string;
  ContentType?: string;
  Description?: string;
  ModelId: string;
  Name?: string;
  Schema?: string;
}
export interface UpdateModelResponse {
  ContentType?: string;
  Description?: string;
  ModelId?: string;
  Name?: string;
  Schema?: string;
}
export interface UpdatePortalRequest {
  Authorization?: Authorization;
  EndpointConfiguration?: EndpointConfigurationRequest;
  IncludedPortalProductArns?: string[];
  LogoUri?: string;
  PortalContent?: PortalContent;
  PortalId: string;
  RumAppMonitorName?: string;
}
export interface UpdatePortalResponse {
  Authorization?: Authorization & {
    CognitoConfig: CognitoConfig & {
      AppClientId: __stringMin1Max256;
      UserPoolArn: __stringMin20Max2048;
      UserPoolDomain: __stringMin20Max2048;
    };
  };
  EndpointConfiguration?: EndpointConfigurationResponse & {
    PortalDefaultDomainName: __stringMin3Max256;
    PortalDomainHostedZoneId: __stringMin1Max64;
  };
  IncludedPortalProductArns?: string[];
  LastModified?: Date;
  LastPublished?: Date;
  LastPublishedDescription?: string;
  PortalArn?: string;
  PortalContent?: PortalContent & {
    DisplayName: __stringMin3Max255;
    Theme: PortalTheme & {
      CustomColors: CustomColors & {
        AccentColor: __stringMin1Max16;
        BackgroundColor: __stringMin1Max16;
        ErrorValidationColor: __stringMin1Max16;
        HeaderColor: __stringMin1Max16;
        NavigationColor: __stringMin1Max16;
        TextColor: __stringMin1Max16;
      };
    };
  };
  PortalId?: string;
  Preview?: Preview & { PreviewStatus: PreviewStatus };
  PublishStatus?: PublishStatus;
  RumAppMonitorName?: string;
  StatusException?: StatusException;
  Tags?: { [key: string]: string | undefined };
}
export interface UpdatePortalProductRequest {
  Description?: string;
  DisplayName?: string;
  DisplayOrder?: DisplayOrder;
  PortalProductId: string;
}
export interface UpdatePortalProductResponse {
  Description?: string;
  DisplayName?: string;
  DisplayOrder?: DisplayOrder & {
    Contents: (Section & {
      ProductRestEndpointPageArns: __listOf__stringMin20Max2048;
      SectionName: string;
    })[];
  };
  LastModified?: Date;
  PortalProductArn?: string;
  PortalProductId?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface UpdateProductPageRequest {
  DisplayContent?: DisplayContent;
  PortalProductId: string;
  ProductPageId: string;
}
export interface UpdateProductPageResponse {
  DisplayContent?: DisplayContent & { Body: __stringMin1Max32768; Title: __stringMin1Max255 };
  LastModified?: Date;
  ProductPageArn?: string;
  ProductPageId?: string;
}
export interface UpdateProductRestEndpointPageRequest {
  DisplayContent?: EndpointDisplayContent;
  PortalProductId: string;
  ProductRestEndpointPageId: string;
  TryItState?: TryItState;
}
export interface UpdateProductRestEndpointPageResponse {
  DisplayContent?: EndpointDisplayContentResponse & { Endpoint: __stringMin1Max1024 };
  LastModified?: Date;
  ProductRestEndpointPageArn?: string;
  ProductRestEndpointPageId?: string;
  RestEndpointIdentifier?: RestEndpointIdentifier & {
    IdentifierParts: IdentifierParts & {
      Method: __stringMin1Max20;
      Path: __stringMin1Max4096;
      RestApiId: __stringMin1Max50;
      Stage: __stringMin1Max128;
    };
  };
  Status?: Status;
  StatusException?: StatusException;
  TryItState?: TryItState;
}
export interface UpdateRouteRequest {
  ApiId: string;
  ApiKeyRequired?: boolean;
  AuthorizationScopes?: string[];
  AuthorizationType?: AuthorizationType;
  AuthorizerId?: string;
  ModelSelectionExpression?: string;
  OperationName?: string;
  RequestModels?: { [key: string]: string | undefined };
  RequestParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteId: string;
  RouteKey?: string;
  RouteResponseSelectionExpression?: string;
  Target?: string;
}
export interface UpdateRouteResult {
  ApiGatewayManaged?: boolean;
  ApiKeyRequired?: boolean;
  AuthorizationScopes?: string[];
  AuthorizationType?: AuthorizationType;
  AuthorizerId?: string;
  ModelSelectionExpression?: string;
  OperationName?: string;
  RequestModels?: { [key: string]: string | undefined };
  RequestParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteId?: string;
  RouteKey?: string;
  RouteResponseSelectionExpression?: string;
  Target?: string;
}
export interface UpdateRouteResponseRequest {
  ApiId: string;
  ModelSelectionExpression?: string;
  ResponseModels?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteId: string;
  RouteResponseId: string;
  RouteResponseKey?: string;
}
export interface UpdateRouteResponseResponse {
  ModelSelectionExpression?: string;
  ResponseModels?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteResponseId?: string;
  RouteResponseKey?: string;
}
export interface UpdateStageRequest {
  AccessLogSettings?: AccessLogSettings;
  ApiId: string;
  AutoDeploy?: boolean;
  ClientCertificateId?: string;
  DefaultRouteSettings?: RouteSettings;
  DeploymentId?: string;
  Description?: string;
  RouteSettings?: { [key: string]: RouteSettings | undefined };
  StageName: string;
  StageVariables?: { [key: string]: string | undefined };
}
export interface UpdateStageResponse {
  AccessLogSettings?: AccessLogSettings;
  ApiGatewayManaged?: boolean;
  AutoDeploy?: boolean;
  ClientCertificateId?: string;
  CreatedDate?: Date;
  DefaultRouteSettings?: RouteSettings;
  DeploymentId?: string;
  Description?: string;
  LastDeploymentStatusMessage?: string;
  LastUpdatedDate?: Date;
  RouteSettings?: { [key: string]: RouteSettings | undefined };
  StageName?: string;
  StageVariables?: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
}
export interface UpdateVpcLinkRequest {
  Name?: string;
  VpcLinkId: string;
}
export interface UpdateVpcLinkResponse {
  CreatedDate?: Date;
  Name?: string;
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
  Tags?: { [key: string]: string | undefined };
  VpcLinkId?: string;
  VpcLinkStatus?: VpcLinkStatus;
  VpcLinkStatusMessage?: string;
  VpcLinkVersion?: VpcLinkVersion;
}
export type CreateApiError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an Api resource.
 */
export const createApi: API.OperationMethod<
  CreateApiRequest,
  CreateApiResponse,
  CreateApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c66, 0) as any as S.Schema<CreateApiRequest>,
  output: __S(1073, __c67, 1) as any as S.Schema<CreateApiResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApi",
}));

export type CreateApiMappingError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an API mapping.
 */
export const createApiMapping: API.OperationMethod<
  CreateApiMappingRequest,
  CreateApiMappingResponse,
  CreateApiMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c80, 0) as any as S.Schema<CreateApiMappingRequest>,
  output: __S(1296, __c81, 0) as any as S.Schema<CreateApiMappingResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApiMapping",
}));

export type CreateAuthorizerError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an Authorizer for an API.
 */
export const createAuthorizer: API.OperationMethod<
  CreateAuthorizerRequest,
  CreateAuthorizerResponse,
  CreateAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1488, __c93, 0) as any as S.Schema<CreateAuthorizerRequest>,
  output: __S(1505, __c94, 1) as any as S.Schema<CreateAuthorizerResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAuthorizer",
}));

export type CreateDeploymentError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a Deployment for an API.
 */
export const createDeployment: API.OperationMethod<
  CreateDeploymentRequest,
  CreateDeploymentResponse,
  CreateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1680, __c105, 0) as any as S.Schema<CreateDeploymentRequest>,
  output: __S(1696, __c106, 0) as any as S.Schema<CreateDeploymentResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeployment",
}));

export type CreateDomainNameError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a domain name.
 */
export const createDomainName: API.OperationMethod<
  CreateDomainNameRequest,
  CreateDomainNameResponse,
  CreateDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1872, __c117, 0) as any as S.Schema<CreateDomainNameRequest>,
  output: __S(1891, __c118, 3) as any as S.Schema<CreateDomainNameResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomainName",
}));

export type CreateIntegrationError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an Integration.
 */
export const createIntegration: API.OperationMethod<
  CreateIntegrationRequest,
  CreateIntegrationResult,
  CreateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateIntegrationRequest>,
  output: __S(18, __c1, 2) as any as S.Schema<CreateIntegrationResult>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntegration",
}));

export type CreateIntegrationResponseError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an IntegrationResponses.
 */
export const createIntegrationResponse: API.OperationMethod<
  CreateIntegrationResponseRequest,
  CreateIntegrationResponseResponse,
  CreateIntegrationResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<CreateIntegrationResponseRequest>,
  output: __S(176, __c11, 0) as any as S.Schema<CreateIntegrationResponseResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntegrationResponse",
}));

export type CreateModelError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a Model for an API.
 */
export const createModel: API.OperationMethod<
  CreateModelRequest,
  CreateModelResponse,
  CreateModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<CreateModelRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<CreateModelResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModel",
}));

export type CreatePortalError =
  | AccessDeniedException
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a portal.
 */
export const createPortal: API.OperationMethod<
  CreatePortalRequest,
  CreatePortalResponse,
  CreatePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<CreatePortalRequest>,
  output: __S(225, __c14, 1) as any as S.Schema<CreatePortalResponse>,
  errors: [AccessDeniedException, BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePortal",
}));

export type CreatePortalProductError =
  | AccessDeniedException
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new portal product.
 */
export const createPortalProduct: API.OperationMethod<
  CreatePortalProductRequest,
  CreatePortalProductResponse,
  CreatePortalProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<CreatePortalProductRequest>,
  output: __S(323, __c20, 3) as any as S.Schema<CreatePortalProductResponse>,
  errors: [AccessDeniedException, BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePortalProduct",
}));

export type CreateProductPageError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new product page for a portal product.
 */
export const createProductPage: API.OperationMethod<
  CreateProductPageRequest,
  CreateProductPageResponse,
  CreateProductPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<CreateProductPageRequest>,
  output: __S(353, __c22, 1) as any as S.Schema<CreateProductPageResponse>,
  errors: [AccessDeniedException, BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProductPage",
}));

export type CreateProductRestEndpointPageError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a product REST endpoint page for a portal product.
 */
export const createProductRestEndpointPage: API.OperationMethod<
  CreateProductRestEndpointPageRequest,
  CreateProductRestEndpointPageResponse,
  CreateProductRestEndpointPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<CreateProductRestEndpointPageRequest>,
  output: __S(385, __c24, 1) as any as S.Schema<CreateProductRestEndpointPageResponse>,
  errors: [AccessDeniedException, BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProductRestEndpointPage",
}));

export type CreateRouteError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a Route for an API.
 */
export const createRoute: API.OperationMethod<
  CreateRouteRequest,
  CreateRouteResult,
  CreateRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<CreateRouteRequest>,
  output: __S(464, __c29, 0) as any as S.Schema<CreateRouteResult>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRoute",
}));

export type CreateRouteResponseError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a RouteResponse for a Route.
 */
export const createRouteResponse: API.OperationMethod<
  CreateRouteResponseRequest,
  CreateRouteResponseResponse,
  CreateRouteResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<CreateRouteResponseRequest>,
  output: __S(496, __c31, 0) as any as S.Schema<CreateRouteResponseResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRouteResponse",
}));

export type CreateRoutingRuleError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a RoutingRule.
 */
export const createRoutingRule: API.OperationMethod<
  CreateRoutingRuleRequest,
  CreateRoutingRuleResponse,
  CreateRoutingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<CreateRoutingRuleRequest>,
  output: __S(537, __c33, 9) as any as S.Schema<CreateRoutingRuleResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRoutingRule",
}));

export type CreateStageError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a Stage for an API.
 */
export const createStage: API.OperationMethod<
  CreateStageRequest,
  CreateStageResponse,
  CreateStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<CreateStageRequest>,
  output: __S(563, __c35, 3) as any as S.Schema<CreateStageResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStage",
}));

export type CreateVpcLinkError = BadRequestException | TooManyRequestsException | CommonErrors;
/**
 * Creates a VPC link.
 */
export const createVpcLink: API.OperationMethod<
  CreateVpcLinkRequest,
  CreateVpcLinkResponse,
  CreateVpcLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<CreateVpcLinkRequest>,
  output: __S(592, __c37, 0) as any as S.Schema<CreateVpcLinkResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcLink",
}));

export type DeleteAccessLogSettingsError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the AccessLogSettings for a Stage. To disable access logging for a Stage, delete its AccessLogSettings.
 */
export const deleteAccessLogSettings: API.OperationMethod<
  DeleteAccessLogSettingsRequest,
  DeleteAccessLogSettingsResponse,
  DeleteAccessLogSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<DeleteAccessLogSettingsRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteAccessLogSettingsResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessLogSettings",
}));

export type DeleteApiError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Deletes an Api resource.
 */
export const deleteApi: API.OperationMethod<
  DeleteApiRequest,
  DeleteApiResponse,
  DeleteApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<DeleteApiRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteApiResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApi",
}));

export type DeleteApiMappingError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an API mapping.
 */
export const deleteApiMapping: API.OperationMethod<
  DeleteApiMappingRequest,
  DeleteApiMappingResponse,
  DeleteApiMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<DeleteApiMappingRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteApiMappingResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApiMapping",
}));

export type DeleteAuthorizerError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Deletes an Authorizer.
 */
export const deleteAuthorizer: API.OperationMethod<
  DeleteAuthorizerRequest,
  DeleteAuthorizerResponse,
  DeleteAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<DeleteAuthorizerRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteAuthorizerResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAuthorizer",
}));

export type DeleteCorsConfigurationError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a CORS configuration.
 */
export const deleteCorsConfiguration: API.OperationMethod<
  DeleteCorsConfigurationRequest,
  DeleteCorsConfigurationResponse,
  DeleteCorsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<DeleteCorsConfigurationRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteCorsConfigurationResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCorsConfiguration",
}));

export type DeleteDeploymentError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Deletes a Deployment.
 */
export const deleteDeployment: API.OperationMethod<
  DeleteDeploymentRequest,
  DeleteDeploymentResponse,
  DeleteDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<DeleteDeploymentRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteDeploymentResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeployment",
}));

export type DeleteDomainNameError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Deletes a domain name.
 */
export const deleteDomainName: API.OperationMethod<
  DeleteDomainNameRequest,
  DeleteDomainNameResponse,
  DeleteDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<DeleteDomainNameRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteDomainNameResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainName",
}));

export type DeleteIntegrationError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Deletes an Integration.
 */
export const deleteIntegration: API.OperationMethod<
  DeleteIntegrationRequest,
  DeleteIntegrationResponse,
  DeleteIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<DeleteIntegrationRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteIntegrationResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegration",
}));

export type DeleteIntegrationResponseError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an IntegrationResponses.
 */
export const deleteIntegrationResponse: API.OperationMethod<
  DeleteIntegrationResponseRequest,
  DeleteIntegrationResponseResponse,
  DeleteIntegrationResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<DeleteIntegrationResponseRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteIntegrationResponseResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegrationResponse",
}));

export type DeleteModelError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Deletes a Model.
 */
export const deleteModel: API.OperationMethod<
  DeleteModelRequest,
  DeleteModelResponse,
  DeleteModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<DeleteModelRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteModelResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModel",
}));

export type DeletePortalError =
  | AccessDeniedException
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a portal.
 */
export const deletePortal: API.OperationMethod<
  DeletePortalRequest,
  DeletePortalResponse,
  DeletePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<DeletePortalRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeletePortalResponse>,
  errors: [AccessDeniedException, BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePortal",
}));

export type DeletePortalProductError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a portal product.
 */
export const deletePortalProduct: API.OperationMethod<
  DeletePortalProductRequest,
  DeletePortalProductResponse,
  DeletePortalProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<DeletePortalProductRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeletePortalProductResponse>,
  errors: [AccessDeniedException, BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePortalProduct",
}));

export type DeletePortalProductSharingPolicyError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the sharing policy for a portal product.
 */
export const deletePortalProductSharingPolicy: API.OperationMethod<
  DeletePortalProductSharingPolicyRequest,
  DeletePortalProductSharingPolicyResponse,
  DeletePortalProductSharingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c50, 0) as any as S.Schema<DeletePortalProductSharingPolicyRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeletePortalProductSharingPolicyResponse>,
  errors: [AccessDeniedException, BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePortalProductSharingPolicy",
}));

export type DeleteProductPageError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a product page of a portal product.
 */
export const deleteProductPage: API.OperationMethod<
  DeleteProductPageRequest,
  DeleteProductPageResponse,
  DeleteProductPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(816, __c51, 0) as any as S.Schema<DeleteProductPageRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteProductPageResponse>,
  errors: [AccessDeniedException, BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProductPage",
}));

export type DeleteProductRestEndpointPageError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a product REST endpoint page.
 */
export const deleteProductRestEndpointPage: API.OperationMethod<
  DeleteProductRestEndpointPageRequest,
  DeleteProductRestEndpointPageResponse,
  DeleteProductRestEndpointPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<DeleteProductRestEndpointPageRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteProductRestEndpointPageResponse>,
  errors: [AccessDeniedException, BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProductRestEndpointPage",
}));

export type DeleteRouteError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Deletes a Route.
 */
export const deleteRoute: API.OperationMethod<
  DeleteRouteRequest,
  DeleteRouteResponse,
  DeleteRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<DeleteRouteRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteRouteResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRoute",
}));

export type DeleteRouteRequestParameterError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a route request parameter. Supported only for WebSocket APIs.
 */
export const deleteRouteRequestParameter: API.OperationMethod<
  DeleteRouteRequestParameterRequest,
  DeleteRouteRequestParameterResponse,
  DeleteRouteRequestParameterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<DeleteRouteRequestParameterRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteRouteRequestParameterResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRouteRequestParameter",
}));

export type DeleteRouteResponseError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Deletes a RouteResponse.
 */
export const deleteRouteResponse: API.OperationMethod<
  DeleteRouteResponseRequest,
  DeleteRouteResponseResponse,
  DeleteRouteResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(880, __c55, 0) as any as S.Schema<DeleteRouteResponseRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteRouteResponseResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRouteResponse",
}));

export type DeleteRouteSettingsError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Deletes the RouteSettings for a stage.
 */
export const deleteRouteSettings: API.OperationMethod<
  DeleteRouteSettingsRequest,
  DeleteRouteSettingsResponse,
  DeleteRouteSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c56, 0) as any as S.Schema<DeleteRouteSettingsRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteRouteSettingsResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRouteSettings",
}));

export type DeleteRoutingRuleError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a routing rule.
 */
export const deleteRoutingRule: API.OperationMethod<
  DeleteRoutingRuleRequest,
  DeleteRoutingRuleResponse,
  DeleteRoutingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(912, __c57, 0) as any as S.Schema<DeleteRoutingRuleRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteRoutingRuleResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRoutingRule",
}));

export type DeleteStageError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Deletes a Stage.
 */
export const deleteStage: API.OperationMethod<
  DeleteStageRequest,
  DeleteStageResponse,
  DeleteStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c58, 0) as any as S.Schema<DeleteStageRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteStageResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStage",
}));

export type DeleteVpcLinkError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Deletes a VPC link.
 */
export const deleteVpcLink: API.OperationMethod<
  DeleteVpcLinkRequest,
  DeleteVpcLinkResponse,
  DeleteVpcLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(944, __c59, 0) as any as S.Schema<DeleteVpcLinkRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteVpcLinkResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcLink",
}));

export type DisablePortalError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the publication of a portal portal.
 */
export const disablePortal: API.OperationMethod<
  DisablePortalRequest,
  DisablePortalResponse,
  DisablePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c60, 0) as any as S.Schema<DisablePortalRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DisablePortalResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisablePortal",
}));

export type ExportApiError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 *
 */
export const exportApi: API.OperationMethod<
  ExportApiRequest,
  ExportApiResponse,
  ExportApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(976, __c61, 0) as any as S.Schema<ExportApiRequest>,
  output: __S(977, __c61, 1) as any as S.Schema<ExportApiResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportApi",
}));

export type GetApiError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Gets an Api resource.
 */
export const getApi: API.OperationMethod<
  GetApiRequest,
  GetApiResponse,
  GetApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c62, 0) as any as S.Schema<GetApiRequest>,
  output: __S(1073, __c67, 1) as any as S.Schema<GetApiResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApi",
}));

export type GetApiMappingError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets an API mapping.
 */
export const getApiMapping: API.OperationMethod<
  GetApiMappingRequest,
  GetApiMappingResponse,
  GetApiMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1008, __c63, 0) as any as S.Schema<GetApiMappingRequest>,
  output: __S(1296, __c81, 0) as any as S.Schema<GetApiMappingResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApiMapping",
}));

export type GetApiMappingsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets API mappings.
 */
export const getApiMappings: API.OperationMethod<
  GetApiMappingsRequest,
  GetApiMappingsResponse,
  GetApiMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c64, 0) as any as S.Schema<GetApiMappingsRequest>,
  output: __S(1026, __c64, 2) as any as S.Schema<GetApiMappingsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApiMappings",
}));

export type GetApisError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a collection of Api resources.
 */
export const getApis: API.OperationMethod<
  GetApisRequest,
  GetApisResponse,
  GetApisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1040, __c65, 0) as any as S.Schema<GetApisRequest>,
  output: __S(1042, __c65, 2) as any as S.Schema<GetApisResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApis",
}));

export type GetAuthorizerError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Gets an Authorizer.
 */
export const getAuthorizer: API.OperationMethod<
  GetAuthorizerRequest,
  GetAuthorizerResponse,
  GetAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c70, 0) as any as S.Schema<GetAuthorizerRequest>,
  output: __S(1505, __c94, 1) as any as S.Schema<GetAuthorizerResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAuthorizer",
}));

export type GetAuthorizersError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the Authorizers for an API.
 */
export const getAuthorizers: API.OperationMethod<
  GetAuthorizersRequest,
  GetAuthorizersResponse,
  GetAuthorizersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1136, __c71, 0) as any as S.Schema<GetAuthorizersRequest>,
  output: __S(1138, __c71, 2) as any as S.Schema<GetAuthorizersResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAuthorizers",
}));

export type GetDeploymentError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Gets a Deployment.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentRequest,
  GetDeploymentResponse,
  GetDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c72, 0) as any as S.Schema<GetDeploymentRequest>,
  output: __S(1696, __c106, 0) as any as S.Schema<GetDeploymentResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployment",
}));

export type GetDeploymentsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the Deployments for an API.
 */
export const getDeployments: API.OperationMethod<
  GetDeploymentsRequest,
  GetDeploymentsResponse,
  GetDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1168, __c73, 0) as any as S.Schema<GetDeploymentsRequest>,
  output: __S(1170, __c73, 2) as any as S.Schema<GetDeploymentsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployments",
}));

export type GetDomainNameError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Gets a domain name.
 */
export const getDomainName: API.OperationMethod<
  GetDomainNameRequest,
  GetDomainNameResponse,
  GetDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c74, 0) as any as S.Schema<GetDomainNameRequest>,
  output: __S(1891, __c118, 3) as any as S.Schema<GetDomainNameResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainName",
}));

export type GetDomainNamesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the domain names for an AWS account.
 */
export const getDomainNames: API.OperationMethod<
  GetDomainNamesRequest,
  GetDomainNamesResponse,
  GetDomainNamesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1200, __c75, 0) as any as S.Schema<GetDomainNamesRequest>,
  output: __S(1202, __c75, 2) as any as S.Schema<GetDomainNamesResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainNames",
}));

export type GetIntegrationError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Gets an Integration.
 */
export const getIntegration: API.OperationMethod<
  GetIntegrationRequest,
  GetIntegrationResult,
  GetIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c76, 0) as any as S.Schema<GetIntegrationRequest>,
  output: __S(18, __c1, 2) as any as S.Schema<GetIntegrationResult>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegration",
}));

export type GetIntegrationResponseError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets an IntegrationResponses.
 */
export const getIntegrationResponse: API.OperationMethod<
  GetIntegrationResponseRequest,
  GetIntegrationResponseResponse,
  GetIntegrationResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1232, __c77, 0) as any as S.Schema<GetIntegrationResponseRequest>,
  output: __S(176, __c11, 0) as any as S.Schema<GetIntegrationResponseResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegrationResponse",
}));

export type GetIntegrationResponsesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the IntegrationResponses for an Integration.
 */
export const getIntegrationResponses: API.OperationMethod<
  GetIntegrationResponsesRequest,
  GetIntegrationResponsesResponse,
  GetIntegrationResponsesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c78, 0) as any as S.Schema<GetIntegrationResponsesRequest>,
  output: __S(1250, __c78, 2) as any as S.Schema<GetIntegrationResponsesResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegrationResponses",
}));

export type GetIntegrationsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the Integrations for an API.
 */
export const getIntegrations: API.OperationMethod<
  GetIntegrationsRequest,
  GetIntegrationsResponse,
  GetIntegrationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1264, __c79, 0) as any as S.Schema<GetIntegrationsRequest>,
  output: __S(1266, __c79, 2) as any as S.Schema<GetIntegrationsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegrations",
}));

export type GetModelError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Gets a Model.
 */
export const getModel: API.OperationMethod<
  GetModelRequest,
  GetModelResponse,
  GetModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c82, 0) as any as S.Schema<GetModelRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<GetModelResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModel",
}));

export type GetModelsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the Models for an API.
 */
export const getModels: API.OperationMethod<
  GetModelsRequest,
  GetModelsResponse,
  GetModelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1328, __c83, 0) as any as S.Schema<GetModelsRequest>,
  output: __S(1330, __c83, 2) as any as S.Schema<GetModelsResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModels",
}));

export type GetModelTemplateError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Gets a model template.
 */
export const getModelTemplate: API.OperationMethod<
  GetModelTemplateRequest,
  GetModelTemplateResponse,
  GetModelTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c84, 0) as any as S.Schema<GetModelTemplateRequest>,
  output: __S(1345, __c84, 1) as any as S.Schema<GetModelTemplateResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelTemplate",
}));

export type GetPortalError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a portal.
 */
export const getPortal: API.OperationMethod<
  GetPortalRequest,
  GetPortalResponse,
  GetPortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1360, __c85, 0) as any as S.Schema<GetPortalRequest>,
  output: __S(1377, __c86, 1) as any as S.Schema<GetPortalResponse>,
  errors: [AccessDeniedException, BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPortal",
}));

export type GetPortalProductError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a portal product.
 */
export const getPortalProduct: API.OperationMethod<
  GetPortalProductRequest,
  GetPortalProductResponse,
  GetPortalProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1392, __c87, 0) as any as S.Schema<GetPortalProductRequest>,
  output: __S(323, __c20, 3) as any as S.Schema<GetPortalProductResponse>,
  errors: [AccessDeniedException, BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPortalProduct",
}));

export type GetPortalProductSharingPolicyError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the sharing policy for a portal product.
 */
export const getPortalProductSharingPolicy: API.OperationMethod<
  GetPortalProductSharingPolicyRequest,
  GetPortalProductSharingPolicyResponse,
  GetPortalProductSharingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c88, 0) as any as S.Schema<GetPortalProductSharingPolicyRequest>,
  output: __S(1409, __c88, 1) as any as S.Schema<GetPortalProductSharingPolicyResponse>,
  errors: [AccessDeniedException, BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPortalProductSharingPolicy",
}));

export type GetProductPageError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a product page of a portal product.
 */
export const getProductPage: API.OperationMethod<
  GetProductPageRequest,
  GetProductPageResponse,
  GetProductPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1424, __c89, 0) as any as S.Schema<GetProductPageRequest>,
  output: __S(353, __c22, 1) as any as S.Schema<GetProductPageResponse>,
  errors: [AccessDeniedException, BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProductPage",
}));

export type GetProductRestEndpointPageError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a product REST endpoint page.
 */
export const getProductRestEndpointPage: API.OperationMethod<
  GetProductRestEndpointPageRequest,
  GetProductRestEndpointPageResponse,
  GetProductRestEndpointPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c90, 0) as any as S.Schema<GetProductRestEndpointPageRequest>,
  output: __S(1441, __c90, 1) as any as S.Schema<GetProductRestEndpointPageResponse>,
  errors: [AccessDeniedException, BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProductRestEndpointPage",
}));

export type GetRouteError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Gets a Route.
 */
export const getRoute: API.OperationMethod<
  GetRouteRequest,
  GetRouteResult,
  GetRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1456, __c91, 0) as any as S.Schema<GetRouteRequest>,
  output: __S(464, __c29, 0) as any as S.Schema<GetRouteResult>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRoute",
}));

export type GetRouteResponseError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Gets a RouteResponse.
 */
export const getRouteResponse: API.OperationMethod<
  GetRouteResponseRequest,
  GetRouteResponseResponse,
  GetRouteResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c92, 0) as any as S.Schema<GetRouteResponseRequest>,
  output: __S(496, __c31, 0) as any as S.Schema<GetRouteResponseResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRouteResponse",
}));

export type GetRouteResponsesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the RouteResponses for a Route.
 */
export const getRouteResponses: API.OperationMethod<
  GetRouteResponsesRequest,
  GetRouteResponsesResponse,
  GetRouteResponsesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1520, __c95, 0) as any as S.Schema<GetRouteResponsesRequest>,
  output: __S(1522, __c95, 2) as any as S.Schema<GetRouteResponsesResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRouteResponses",
}));

export type GetRoutesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the Routes for an API.
 */
export const getRoutes: API.OperationMethod<
  GetRoutesRequest,
  GetRoutesResponse,
  GetRoutesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1536, __c96, 0) as any as S.Schema<GetRoutesRequest>,
  output: __S(1538, __c96, 2) as any as S.Schema<GetRoutesResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRoutes",
}));

export type GetRoutingRuleError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a routing rule.
 */
export const getRoutingRule: API.OperationMethod<
  GetRoutingRuleRequest,
  GetRoutingRuleResponse,
  GetRoutingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1552, __c97, 0) as any as S.Schema<GetRoutingRuleRequest>,
  output: __S(537, __c33, 9) as any as S.Schema<GetRoutingRuleResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRoutingRule",
}));

export type GetStageError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Gets a Stage.
 */
export const getStage: API.OperationMethod<
  GetStageRequest,
  GetStageResponse,
  GetStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1568, __c98, 0) as any as S.Schema<GetStageRequest>,
  output: __S(563, __c35, 3) as any as S.Schema<GetStageResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStage",
}));

export type GetStagesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the Stages for an API.
 */
export const getStages: API.OperationMethod<
  GetStagesRequest,
  GetStagesResponse,
  GetStagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1584, __c99, 0) as any as S.Schema<GetStagesRequest>,
  output: __S(1586, __c99, 2) as any as S.Schema<GetStagesResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStages",
}));

export type GetTagsError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a collection of Tag resources.
 */
export const getTags: API.OperationMethod<
  GetTagsRequest,
  GetTagsResponse,
  GetTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c100, 0) as any as S.Schema<GetTagsRequest>,
  output: __S(1601, __c100, 1) as any as S.Schema<GetTagsResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTags",
}));

export type GetVpcLinkError = NotFoundException | TooManyRequestsException | CommonErrors;
/**
 * Gets a VPC link.
 */
export const getVpcLink: API.OperationMethod<
  GetVpcLinkRequest,
  GetVpcLinkResponse,
  GetVpcLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1616, __c101, 0) as any as S.Schema<GetVpcLinkRequest>,
  output: __S(592, __c37, 0) as any as S.Schema<GetVpcLinkResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVpcLink",
}));

export type GetVpcLinksError = BadRequestException | TooManyRequestsException | CommonErrors;
/**
 * Gets a collection of VPC links.
 */
export const getVpcLinks: API.OperationMethod<
  GetVpcLinksRequest,
  GetVpcLinksResponse,
  GetVpcLinksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c102, 0) as any as S.Schema<GetVpcLinksRequest>,
  output: __S(1634, __c102, 2) as any as S.Schema<GetVpcLinksResponse>,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVpcLinks",
}));

export type ImportApiError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Imports an API.
 */
export const importApi: API.OperationMethod<
  ImportApiRequest,
  ImportApiResponse,
  ImportApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1648, __c103, 0) as any as S.Schema<ImportApiRequest>,
  output: __S(1073, __c67, 1) as any as S.Schema<ImportApiResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportApi",
}));

export type ListPortalProductsError =
  | AccessDeniedException
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists portal products.
 */
export const listPortalProducts: API.OperationMethod<
  ListPortalProductsRequest,
  ListPortalProductsResponse,
  ListPortalProductsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1664, __c104, 0) as any as S.Schema<ListPortalProductsRequest>,
  output: __S(1667, __c104, 3) as any as S.Schema<ListPortalProductsResponse>,
  errors: [AccessDeniedException, BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPortalProducts",
}));

export type ListPortalsError =
  | AccessDeniedException
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists portals.
 */
export const listPortals: API.OperationMethod<
  ListPortalsRequest,
  ListPortalsResponse,
  ListPortalsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1712, __c107, 0) as any as S.Schema<ListPortalsRequest>,
  output: __S(1714, __c107, 2) as any as S.Schema<ListPortalsResponse>,
  errors: [AccessDeniedException, BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPortals",
}));

export type ListProductPagesError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the product pages for a portal product.
 */
export const listProductPages: API.OperationMethod<
  ListProductPagesRequest,
  ListProductPagesResponse,
  ListProductPagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c108, 0) as any as S.Schema<ListProductPagesRequest>,
  output: __S(1731, __c108, 3) as any as S.Schema<ListProductPagesResponse>,
  errors: [AccessDeniedException, BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProductPages",
}));

export type ListProductRestEndpointPagesError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the product REST endpoint pages of a portal product.
 */
export const listProductRestEndpointPages: API.OperationMethod<
  ListProductRestEndpointPagesRequest,
  ListProductRestEndpointPagesResponse,
  ListProductRestEndpointPagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1744, __c109, 0) as any as S.Schema<ListProductRestEndpointPagesRequest>,
  output: __S(1747, __c109, 3) as any as S.Schema<ListProductRestEndpointPagesResponse>,
  errors: [AccessDeniedException, BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProductRestEndpointPages",
}));

export type ListRoutingRulesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists routing rules.
 */
export const listRoutingRules: API.PaginatedOperationMethod<
  ListRoutingRulesRequest,
  ListRoutingRulesResponse,
  ListRoutingRulesError,
  Credentials | HttpClient.HttpClient,
  RoutingRule
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1760, __c110, 0) as any as S.Schema<ListRoutingRulesRequest>,
  output: __S(1762, __c110, 2) as any as S.Schema<ListRoutingRulesResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoutingRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RoutingRules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PreviewPortalError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a portal preview.
 */
export const previewPortal: API.OperationMethod<
  PreviewPortalRequest,
  PreviewPortalResponse,
  PreviewPortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1776, __c111, 0) as any as S.Schema<PreviewPortalRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<PreviewPortalResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PreviewPortal",
}));

export type PublishPortalError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Publishes a portal.
 */
export const publishPortal: API.OperationMethod<
  PublishPortalRequest,
  PublishPortalResponse,
  PublishPortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c112, 0) as any as S.Schema<PublishPortalRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<PublishPortalResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishPortal",
}));

export type PutPortalProductSharingPolicyError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the sharing policy for a portal product.
 */
export const putPortalProductSharingPolicy: API.OperationMethod<
  PutPortalProductSharingPolicyRequest,
  PutPortalProductSharingPolicyResponse,
  PutPortalProductSharingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1808, __c113, 0) as any as S.Schema<PutPortalProductSharingPolicyRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<PutPortalProductSharingPolicyResponse>,
  errors: [AccessDeniedException, BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPortalProductSharingPolicy",
}));

export type PutRoutingRuleError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a routing rule.
 */
export const putRoutingRule: API.OperationMethod<
  PutRoutingRuleRequest,
  PutRoutingRuleResponse,
  PutRoutingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1824, __c114, 0) as any as S.Schema<PutRoutingRuleRequest>,
  output: __S(537, __c33, 9) as any as S.Schema<PutRoutingRuleResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRoutingRule",
}));

export type ReimportApiError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Puts an Api resource.
 */
export const reimportApi: API.OperationMethod<
  ReimportApiRequest,
  ReimportApiResponse,
  ReimportApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1840, __c115, 0) as any as S.Schema<ReimportApiRequest>,
  output: __S(1073, __c67, 1) as any as S.Schema<ReimportApiResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReimportApi",
}));

export type ResetAuthorizersCacheError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Resets all authorizer cache entries on a stage. Supported only for HTTP APIs.
 */
export const resetAuthorizersCache: API.OperationMethod<
  ResetAuthorizersCacheRequest,
  ResetAuthorizersCacheResponse,
  ResetAuthorizersCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1856, __c116, 0) as any as S.Schema<ResetAuthorizersCacheRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<ResetAuthorizersCacheResponse>,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetAuthorizersCache",
}));

export type TagResourceError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new Tag resource to represent a tag.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1920, __c120, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<TagResourceResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a Tag.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1936, __c121, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateApiError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an Api resource.
 */
export const updateApi: API.OperationMethod<
  UpdateApiRequest,
  UpdateApiResponse,
  UpdateApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1952, __c122, 0) as any as S.Schema<UpdateApiRequest>,
  output: __S(1073, __c67, 1) as any as S.Schema<UpdateApiResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApi",
}));

export type UpdateApiMappingError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * The API mapping.
 */
export const updateApiMapping: API.OperationMethod<
  UpdateApiMappingRequest,
  UpdateApiMappingResponse,
  UpdateApiMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1968, __c123, 0) as any as S.Schema<UpdateApiMappingRequest>,
  output: __S(1296, __c81, 0) as any as S.Schema<UpdateApiMappingResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApiMapping",
}));

export type UpdateAuthorizerError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an Authorizer.
 */
export const updateAuthorizer: API.OperationMethod<
  UpdateAuthorizerRequest,
  UpdateAuthorizerResponse,
  UpdateAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1984, __c124, 0) as any as S.Schema<UpdateAuthorizerRequest>,
  output: __S(1505, __c94, 1) as any as S.Schema<UpdateAuthorizerResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAuthorizer",
}));

export type UpdateDeploymentError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a Deployment.
 */
export const updateDeployment: API.OperationMethod<
  UpdateDeploymentRequest,
  UpdateDeploymentResponse,
  UpdateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2000, __c125, 0) as any as S.Schema<UpdateDeploymentRequest>,
  output: __S(1696, __c106, 0) as any as S.Schema<UpdateDeploymentResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeployment",
}));

export type UpdateDomainNameError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a domain name.
 */
export const updateDomainName: API.OperationMethod<
  UpdateDomainNameRequest,
  UpdateDomainNameResponse,
  UpdateDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c126, 0) as any as S.Schema<UpdateDomainNameRequest>,
  output: __S(1891, __c118, 3) as any as S.Schema<UpdateDomainNameResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainName",
}));

export type UpdateIntegrationError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an Integration.
 */
export const updateIntegration: API.OperationMethod<
  UpdateIntegrationRequest,
  UpdateIntegrationResult,
  UpdateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2032, __c127, 0) as any as S.Schema<UpdateIntegrationRequest>,
  output: __S(18, __c1, 2) as any as S.Schema<UpdateIntegrationResult>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIntegration",
}));

export type UpdateIntegrationResponseError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an IntegrationResponses.
 */
export const updateIntegrationResponse: API.OperationMethod<
  UpdateIntegrationResponseRequest,
  UpdateIntegrationResponseResponse,
  UpdateIntegrationResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2048, __c128, 0) as any as S.Schema<UpdateIntegrationResponseRequest>,
  output: __S(176, __c11, 0) as any as S.Schema<UpdateIntegrationResponseResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIntegrationResponse",
}));

export type UpdateModelError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a Model.
 */
export const updateModel: API.OperationMethod<
  UpdateModelRequest,
  UpdateModelResponse,
  UpdateModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2064, __c129, 0) as any as S.Schema<UpdateModelRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<UpdateModelResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateModel",
}));

export type UpdatePortalError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a portal.
 */
export const updatePortal: API.OperationMethod<
  UpdatePortalRequest,
  UpdatePortalResponse,
  UpdatePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<UpdatePortalRequest>,
  output: __S(1377, __c86, 1) as any as S.Schema<UpdatePortalResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePortal",
}));

export type UpdatePortalProductError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the portal product.
 */
export const updatePortalProduct: API.OperationMethod<
  UpdatePortalProductRequest,
  UpdatePortalProductResponse,
  UpdatePortalProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<UpdatePortalProductRequest>,
  output: __S(323, __c20, 3) as any as S.Schema<UpdatePortalProductResponse>,
  errors: [AccessDeniedException, BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePortalProduct",
}));

export type UpdateProductPageError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a product page of a portal product.
 */
export const updateProductPage: API.OperationMethod<
  UpdateProductPageRequest,
  UpdateProductPageResponse,
  UpdateProductPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<UpdateProductPageRequest>,
  output: __S(353, __c22, 1) as any as S.Schema<UpdateProductPageResponse>,
  errors: [AccessDeniedException, BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProductPage",
}));

export type UpdateProductRestEndpointPageError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a product REST endpoint page.
 */
export const updateProductRestEndpointPage: API.OperationMethod<
  UpdateProductRestEndpointPageRequest,
  UpdateProductRestEndpointPageResponse,
  UpdateProductRestEndpointPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<UpdateProductRestEndpointPageRequest>,
  output: __S(385, __c24, 1) as any as S.Schema<UpdateProductRestEndpointPageResponse>,
  errors: [AccessDeniedException, BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProductRestEndpointPage",
}));

export type UpdateRouteError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a Route.
 */
export const updateRoute: API.OperationMethod<
  UpdateRouteRequest,
  UpdateRouteResult,
  UpdateRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<UpdateRouteRequest>,
  output: __S(464, __c29, 0) as any as S.Schema<UpdateRouteResult>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoute",
}));

export type UpdateRouteResponseError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a RouteResponse.
 */
export const updateRouteResponse: API.OperationMethod<
  UpdateRouteResponseRequest,
  UpdateRouteResponseResponse,
  UpdateRouteResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<UpdateRouteResponseRequest>,
  output: __S(496, __c31, 0) as any as S.Schema<UpdateRouteResponseResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRouteResponse",
}));

export type UpdateStageError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a Stage.
 */
export const updateStage: API.OperationMethod<
  UpdateStageRequest,
  UpdateStageResponse,
  UpdateStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<UpdateStageRequest>,
  output: __S(563, __c35, 3) as any as S.Schema<UpdateStageResponse>,
  errors: [BadRequestException, ConflictException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStage",
}));

export type UpdateVpcLinkError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a VPC link.
 */
export const updateVpcLink: API.OperationMethod<
  UpdateVpcLinkRequest,
  UpdateVpcLinkResponse,
  UpdateVpcLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<UpdateVpcLinkRequest>,
  output: __S(592, __c37, 0) as any as S.Schema<UpdateVpcLinkResponse>,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
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
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          ConnectionId: S.optional(S.String),
          ConnectionType: S.optional(S.String),
          ContentHandlingStrategy: S.optional(S.String),
          CredentialsArn: S.optional(S.String),
          Description: S.optional(S.String),
          IntegrationMethod: S.optional(S.String),
          IntegrationSubtype: S.optional(S.String),
          IntegrationType: S.optional(S.String),
          IntegrationUri: S.optional(S.String),
          PassthroughBehavior: S.optional(S.String),
          PayloadFormatVersion: S.optional(S.String),
          RequestParameters: S.optional(__S(1104, __c69, 0)),
          RequestTemplates: S.optional(__S(1104, __c69, 0)),
          ResponseParameters: S.optional(__S(16, __c1, 0)),
          TemplateSelectionExpression: S.optional(S.String),
          TimeoutInMillis: S.optional(S.Number),
          TlsConfig: S.optional(__S(17, __c1, 1)),
        })
          .pipe(
            S.encodeKeys({
              ConnectionId: "connectionId",
              ConnectionType: "connectionType",
              ContentHandlingStrategy: "contentHandlingStrategy",
              CredentialsArn: "credentialsArn",
              Description: "description",
              IntegrationMethod: "integrationMethod",
              IntegrationSubtype: "integrationSubtype",
              IntegrationType: "integrationType",
              IntegrationUri: "integrationUri",
              PassthroughBehavior: "passthroughBehavior",
              PayloadFormatVersion: "payloadFormatVersion",
              RequestParameters: "requestParameters",
              RequestTemplates: "requestTemplates",
              ResponseParameters: "responseParameters",
              TemplateSelectionExpression: "templateSelectionExpression",
              TimeoutInMillis: "timeoutInMillis",
              TlsConfig: "tlsConfig",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v2/apis/{ApiId}/integrations" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateIntegrationRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(1104, __c69, 0).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({ ServerNameToVerify: S.optional(S.String) }).pipe(
          S.encodeKeys({ ServerNameToVerify: "serverNameToVerify" }),
        ),
      ).annotate({ identifier: "TlsConfigInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ApiGatewayManaged: S.optional(S.Boolean),
          ConnectionId: S.optional(S.String),
          ConnectionType: S.optional(S.String),
          ContentHandlingStrategy: S.optional(S.String),
          CredentialsArn: S.optional(S.String),
          Description: S.optional(S.String),
          IntegrationId: S.optional(S.String),
          IntegrationMethod: S.optional(S.String),
          IntegrationResponseSelectionExpression: S.optional(S.String),
          IntegrationSubtype: S.optional(S.String),
          IntegrationType: S.optional(S.String),
          IntegrationUri: S.optional(S.String),
          PassthroughBehavior: S.optional(S.String),
          PayloadFormatVersion: S.optional(S.String),
          RequestParameters: S.optional(__S(1104, __c69, 0)),
          RequestTemplates: S.optional(__S(1104, __c69, 0)),
          ResponseParameters: S.optional(__S(16, __c1, 0)),
          TemplateSelectionExpression: S.optional(S.String),
          TimeoutInMillis: S.optional(S.Number),
          TlsConfig: S.optional(__S(17, __c1, 1)),
        }).pipe(
          S.encodeKeys({
            ApiGatewayManaged: "apiGatewayManaged",
            ConnectionId: "connectionId",
            ConnectionType: "connectionType",
            ContentHandlingStrategy: "contentHandlingStrategy",
            CredentialsArn: "credentialsArn",
            Description: "description",
            IntegrationId: "integrationId",
            IntegrationMethod: "integrationMethod",
            IntegrationResponseSelectionExpression: "integrationResponseSelectionExpression",
            IntegrationSubtype: "integrationSubtype",
            IntegrationType: "integrationType",
            IntegrationUri: "integrationUri",
            PassthroughBehavior: "passthroughBehavior",
            PayloadFormatVersion: "payloadFormatVersion",
            RequestParameters: "requestParameters",
            RequestTemplates: "requestTemplates",
            ResponseParameters: "responseParameters",
            TemplateSelectionExpression: "templateSelectionExpression",
            TimeoutInMillis: "timeoutInMillis",
            TlsConfig: "tlsConfig",
          }),
        ),
      ).annotate({ identifier: "CreateIntegrationResult" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Authorization: S.optional(__S(289, __c18, 1)),
          EndpointConfiguration: S.optional(__S(241, __c15, 1)),
          IncludedPortalProductArns: S.optional(__listOf__stringMin20Max2048),
          LogoUri: S.optional(S.String),
          PortalContent: S.optional(__S(292, __c18, 4)),
          PortalId: S.String.pipe(T.HttpLabel("PortalId")),
          RumAppMonitorName: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              Authorization: "authorization",
              EndpointConfiguration: "endpointConfiguration",
              IncludedPortalProductArns: "includedPortalProductArns",
              LogoUri: "logoUri",
              PortalContent: "portalContent",
              RumAppMonitorName: "rumAppMonitorName",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PATCH", uri: "/v2/portals/{PortalId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdatePortalRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          DisplayName: S.optional(S.String),
          DisplayOrder: S.optional(__S(322, __c20, 2)),
          PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
        })
          .pipe(
            S.encodeKeys({
              Description: "description",
              DisplayName: "displayName",
              DisplayOrder: "displayOrder",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PATCH", uri: "/v2/portalproducts/{PortalProductId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdatePortalProductRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DisplayContent: S.optional(__S(352, __c22, 0)),
          PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
          ProductPageId: S.String.pipe(T.HttpLabel("ProductPageId")),
        })
          .pipe(S.encodeKeys({ DisplayContent: "displayContent" }))
          .pipe(
            T.all(
              T.Http({
                method: "PATCH",
                uri: "/v2/portalproducts/{PortalProductId}/productpages/{ProductPageId}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateProductPageRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DisplayContent: S.optional(__S(384, __c24, 0)),
          PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
          ProductRestEndpointPageId: S.String.pipe(T.HttpLabel("ProductRestEndpointPageId")),
          TryItState: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ DisplayContent: "displayContent", TryItState: "tryItState" }))
          .pipe(
            T.all(
              T.Http({
                method: "PATCH",
                uri: "/v2/portalproducts/{PortalProductId}/productrestendpointpages/{ProductRestEndpointPageId}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateProductRestEndpointPageRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          ApiKeyRequired: S.optional(S.Boolean),
          AuthorizationScopes: S.optional(__S(1088, __c68, 0)),
          AuthorizationType: S.optional(S.String),
          AuthorizerId: S.optional(S.String),
          ModelSelectionExpression: S.optional(S.String),
          OperationName: S.optional(S.String),
          RequestModels: S.optional(__S(1104, __c69, 0)),
          RequestParameters: S.optional(__S(449, __c28, 1)),
          RouteId: S.String.pipe(T.HttpLabel("RouteId")),
          RouteKey: S.optional(S.String),
          RouteResponseSelectionExpression: S.optional(S.String),
          Target: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              ApiKeyRequired: "apiKeyRequired",
              AuthorizationScopes: "authorizationScopes",
              AuthorizationType: "authorizationType",
              AuthorizerId: "authorizerId",
              ModelSelectionExpression: "modelSelectionExpression",
              OperationName: "operationName",
              RequestModels: "requestModels",
              RequestParameters: "requestParameters",
              RouteKey: "routeKey",
              RouteResponseSelectionExpression: "routeResponseSelectionExpression",
              Target: "target",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PATCH", uri: "/v2/apis/{ApiId}/routes/{RouteId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateRouteRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          ModelSelectionExpression: S.optional(S.String),
          ResponseModels: S.optional(__S(1104, __c69, 0)),
          ResponseParameters: S.optional(__S(449, __c28, 1)),
          RouteId: S.String.pipe(T.HttpLabel("RouteId")),
          RouteResponseId: S.String.pipe(T.HttpLabel("RouteResponseId")),
          RouteResponseKey: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              ModelSelectionExpression: "modelSelectionExpression",
              ResponseModels: "responseModels",
              ResponseParameters: "responseParameters",
              RouteResponseKey: "routeResponseKey",
            }),
          )
          .pipe(
            T.all(
              T.Http({
                method: "PATCH",
                uri: "/v2/apis/{ApiId}/routes/{RouteId}/routeresponses/{RouteResponseId}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateRouteResponseRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccessLogSettings: S.optional(__S(560, __c35, 0)),
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          AutoDeploy: S.optional(S.Boolean),
          ClientCertificateId: S.optional(S.String),
          DefaultRouteSettings: S.optional(__S(561, __c35, 1)),
          DeploymentId: S.optional(S.String),
          Description: S.optional(S.String),
          RouteSettings: S.optional(__S(562, __c35, 2)),
          StageName: S.String.pipe(T.HttpLabel("StageName")),
          StageVariables: S.optional(__S(1104, __c69, 0)),
        })
          .pipe(
            S.encodeKeys({
              AccessLogSettings: "accessLogSettings",
              AutoDeploy: "autoDeploy",
              ClientCertificateId: "clientCertificateId",
              DefaultRouteSettings: "defaultRouteSettings",
              DeploymentId: "deploymentId",
              Description: "description",
              RouteSettings: "routeSettings",
              StageVariables: "stageVariables",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PATCH", uri: "/v2/apis/{ApiId}/stages/{StageName}" }),
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
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), VpcLinkId: S.String.pipe(T.HttpLabel("VpcLinkId")) })
          .pipe(S.encodeKeys({ Name: "name" }))
          .pipe(
            T.all(
              T.Http({ method: "PATCH", uri: "/v2/vpclinks/{VpcLinkId}" }),
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
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          ContentHandlingStrategy: S.optional(S.String),
          IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
          IntegrationResponseKey: S.optional(S.String),
          ResponseParameters: S.optional(__S(1104, __c69, 0)),
          ResponseTemplates: S.optional(__S(1104, __c69, 0)),
          TemplateSelectionExpression: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              ContentHandlingStrategy: "contentHandlingStrategy",
              IntegrationResponseKey: "integrationResponseKey",
              ResponseParameters: "responseParameters",
              ResponseTemplates: "responseTemplates",
              TemplateSelectionExpression: "templateSelectionExpression",
            }),
          )
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/v2/apis/{ApiId}/integrations/{IntegrationId}/integrationresponses",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateIntegrationResponseRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContentHandlingStrategy: S.optional(S.String),
          IntegrationResponseId: S.optional(S.String),
          IntegrationResponseKey: S.optional(S.String),
          ResponseParameters: S.optional(__S(1104, __c69, 0)),
          ResponseTemplates: S.optional(__S(1104, __c69, 0)),
          TemplateSelectionExpression: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ContentHandlingStrategy: "contentHandlingStrategy",
            IntegrationResponseId: "integrationResponseId",
            IntegrationResponseKey: "integrationResponseKey",
            ResponseParameters: "responseParameters",
            ResponseTemplates: "responseTemplates",
            TemplateSelectionExpression: "templateSelectionExpression",
          }),
        ),
      ).annotate({ identifier: "CreateIntegrationResponseResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          ContentType: S.optional(S.String),
          Description: S.optional(S.String),
          Name: S.optional(S.String),
          Schema: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              ContentType: "contentType",
              Description: "description",
              Name: "name",
              Schema: "schema",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v2/apis/{ApiId}/models" }),
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
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContentType: S.optional(S.String),
          Description: S.optional(S.String),
          ModelId: S.optional(S.String),
          Name: S.optional(S.String),
          Schema: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ContentType: "contentType",
            Description: "description",
            ModelId: "modelId",
            Name: "name",
            Schema: "schema",
          }),
        ),
      ).annotate({ identifier: "CreateModelResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Authorization: S.optional(__S(289, __c18, 1)),
          EndpointConfiguration: S.optional(__S(241, __c15, 1)),
          IncludedPortalProductArns: S.optional(__listOf__stringMin20Max2048),
          LogoUri: S.optional(S.String),
          PortalContent: S.optional(__S(292, __c18, 4)),
          RumAppMonitorName: S.optional(S.String),
          Tags: S.optional(__S(1104, __c69, 0)),
        })
          .pipe(
            S.encodeKeys({
              Authorization: "authorization",
              EndpointConfiguration: "endpointConfiguration",
              IncludedPortalProductArns: "includedPortalProductArns",
              LogoUri: "logoUri",
              PortalContent: "portalContent",
              RumAppMonitorName: "rumAppMonitorName",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/v2/portals" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "CreatePortalRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Authorization: S.optional(__S(289, __c18, 1)),
          EndpointConfiguration: S.optional(__S(293, __c18, 5)),
          IncludedPortalProductArns: S.optional(__listOf__stringMin20Max2048),
          LastModified: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          LastPublished: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          LastPublishedDescription: S.optional(S.String),
          PortalArn: S.optional(S.String),
          PortalContent: S.optional(__S(292, __c18, 4)),
          PortalId: S.optional(S.String),
          PublishStatus: S.optional(S.String),
          RumAppMonitorName: S.optional(S.String),
          StatusException: S.optional(__S(272, __c17, 0)),
          Tags: S.optional(__S(1104, __c69, 0)),
        }).pipe(
          S.encodeKeys({
            Authorization: "authorization",
            EndpointConfiguration: "endpointConfiguration",
            IncludedPortalProductArns: "includedPortalProductArns",
            LastModified: "lastModified",
            LastPublished: "lastPublished",
            LastPublishedDescription: "lastPublishedDescription",
            PortalArn: "portalArn",
            PortalContent: "portalContent",
            PortalId: "portalId",
            PublishStatus: "publishStatus",
            RumAppMonitorName: "rumAppMonitorName",
            StatusException: "statusException",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "CreatePortalResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CertificateArn: S.optional(S.String), DomainName: S.optional(S.String) }).pipe(
          S.encodeKeys({ CertificateArn: "certificateArn", DomainName: "domainName" }),
        ),
      ).annotate({ identifier: "ACMManaged" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AcmManaged: S.optional(__S(240, __c15, 0)),
          None: S.optional(__S(256, __c16, 0)),
        }).pipe(S.encodeKeys({ AcmManaged: "acmManaged", None: "none" })),
      ).annotate({ identifier: "EndpointConfigurationRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "None" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Exception: S.optional(S.String), Message: S.optional(S.String) }).pipe(
          S.encodeKeys({ Exception: "exception", Message: "message" }),
        ),
      ).annotate({ identifier: "StatusException" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppClientId: S.optional(S.String),
          UserPoolArn: S.optional(S.String),
          UserPoolDomain: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AppClientId: "appClientId",
            UserPoolArn: "userPoolArn",
            UserPoolDomain: "userPoolDomain",
          }),
        ),
      ).annotate({ identifier: "CognitoConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CognitoConfig: S.optional(__S(288, __c18, 0)),
          None: S.optional(__S(256, __c16, 0)),
        }).pipe(S.encodeKeys({ CognitoConfig: "cognitoConfig", None: "none" })),
      ).annotate({ identifier: "Authorization" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AccentColor: S.optional(S.String),
          BackgroundColor: S.optional(S.String),
          ErrorValidationColor: S.optional(S.String),
          HeaderColor: S.optional(S.String),
          NavigationColor: S.optional(S.String),
          TextColor: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AccentColor: "accentColor",
            BackgroundColor: "backgroundColor",
            ErrorValidationColor: "errorValidationColor",
            HeaderColor: "headerColor",
            NavigationColor: "navigationColor",
            TextColor: "textColor",
          }),
        ),
      ).annotate({ identifier: "CustomColors" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          CustomColors: S.optional(__S(290, __c18, 2)),
          LogoLastUploaded: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }).pipe(
          S.encodeKeys({ CustomColors: "customColors", LogoLastUploaded: "logoLastUploaded" }),
        ),
      ).annotate({ identifier: "PortalTheme" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Theme: S.optional(__S(291, __c18, 3)),
        }).pipe(
          S.encodeKeys({ Description: "description", DisplayName: "displayName", Theme: "theme" }),
        ),
      ).annotate({ identifier: "PortalContent" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          CertificateArn: S.optional(S.String),
          DomainName: S.optional(S.String),
          PortalDefaultDomainName: S.optional(S.String),
          PortalDomainHostedZoneId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CertificateArn: "certificateArn",
            DomainName: "domainName",
            PortalDefaultDomainName: "portalDefaultDomainName",
            PortalDomainHostedZoneId: "portalDomainHostedZoneId",
          }),
        ),
      ).annotate({ identifier: "EndpointConfigurationResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Tags: S.optional(__S(1104, __c69, 0)),
        })
          .pipe(
            S.encodeKeys({ Description: "description", DisplayName: "displayName", Tags: "tags" }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v2/portalproducts" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreatePortalProductRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProductRestEndpointPageArns: S.optional(__listOf__stringMin20Max2048),
          SectionName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ProductRestEndpointPageArns: "productRestEndpointPageArns",
            SectionName: "sectionName",
          }),
        ),
      ).annotate({ identifier: "Section" });
    case 1:
      return S.Array(__S(320, __c20, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Contents: S.optional(__listOfSection),
          OverviewPageArn: S.optional(S.String),
          ProductPageArns: S.optional(__listOf__stringMin20Max2048),
        }).pipe(
          S.encodeKeys({
            Contents: "contents",
            OverviewPageArn: "overviewPageArn",
            ProductPageArns: "productPageArns",
          }),
        ),
      ).annotate({ identifier: "DisplayOrder" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          DisplayName: S.optional(S.String),
          DisplayOrder: S.optional(__S(322, __c20, 2)),
          LastModified: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          PortalProductArn: S.optional(S.String),
          PortalProductId: S.optional(S.String),
          Tags: S.optional(__S(1104, __c69, 0)),
        }).pipe(
          S.encodeKeys({
            Description: "description",
            DisplayName: "displayName",
            DisplayOrder: "displayOrder",
            LastModified: "lastModified",
            PortalProductArn: "portalProductArn",
            PortalProductId: "portalProductId",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "CreatePortalProductResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DisplayContent: S.optional(__S(352, __c22, 0)),
          PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
        })
          .pipe(S.encodeKeys({ DisplayContent: "displayContent" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v2/portalproducts/{PortalProductId}/productpages" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateProductPageRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Body: S.optional(S.String), Title: S.optional(S.String) }).pipe(
          S.encodeKeys({ Body: "body", Title: "title" }),
        ),
      ).annotate({ identifier: "DisplayContent" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DisplayContent: S.optional(__S(352, __c22, 0)),
          LastModified: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ProductPageArn: S.optional(S.String),
          ProductPageId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DisplayContent: "displayContent",
            LastModified: "lastModified",
            ProductPageArn: "productPageArn",
            ProductPageId: "productPageId",
          }),
        ),
      ).annotate({ identifier: "CreateProductPageResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DisplayContent: S.optional(__S(384, __c24, 0)),
          PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
          RestEndpointIdentifier: S.optional(__S(417, __c26, 1)),
          TryItState: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              DisplayContent: "displayContent",
              RestEndpointIdentifier: "restEndpointIdentifier",
              TryItState: "tryItState",
            }),
          )
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/v2/portalproducts/{PortalProductId}/productrestendpointpages",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateProductRestEndpointPageRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          None: S.optional(__S(256, __c16, 0)),
          Overrides: S.optional(__S(400, __c25, 0)),
        }).pipe(S.encodeKeys({ None: "none", Overrides: "overrides" })),
      ).annotate({ identifier: "EndpointDisplayContent" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DisplayContent: S.optional(__S(400, __c25, 0)),
          LastModified: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ProductRestEndpointPageArn: S.optional(S.String),
          ProductRestEndpointPageId: S.optional(S.String),
          RestEndpointIdentifier: S.optional(__S(417, __c26, 1)),
          Status: S.optional(S.String),
          StatusException: S.optional(__S(272, __c17, 0)),
          TryItState: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DisplayContent: "displayContent",
            LastModified: "lastModified",
            ProductRestEndpointPageArn: "productRestEndpointPageArn",
            ProductRestEndpointPageId: "productRestEndpointPageId",
            RestEndpointIdentifier: "restEndpointIdentifier",
            Status: "status",
            StatusException: "statusException",
            TryItState: "tryItState",
          }),
        ),
      ).annotate({ identifier: "CreateProductRestEndpointPageResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Body: S.optional(S.String),
          Endpoint: S.optional(S.String),
          OperationName: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ Body: "body", Endpoint: "endpoint", OperationName: "operationName" }),
        ),
      ).annotate({ identifier: "DisplayContentOverrides" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Method: S.optional(S.String),
          Path: S.optional(S.String),
          RestApiId: S.optional(S.String),
          Stage: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ Method: "method", Path: "path", RestApiId: "restApiId", Stage: "stage" }),
        ),
      ).annotate({ identifier: "IdentifierParts" });
    case 1:
      return S.suspend(() =>
        S.Struct({ IdentifierParts: S.optional(__S(416, __c26, 0)) }).pipe(
          S.encodeKeys({ IdentifierParts: "identifierParts" }),
        ),
      ).annotate({ identifier: "RestEndpointIdentifier" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          ApiKeyRequired: S.optional(S.Boolean),
          AuthorizationScopes: S.optional(__S(1088, __c68, 0)),
          AuthorizationType: S.optional(S.String),
          AuthorizerId: S.optional(S.String),
          ModelSelectionExpression: S.optional(S.String),
          OperationName: S.optional(S.String),
          RequestModels: S.optional(__S(1104, __c69, 0)),
          RequestParameters: S.optional(__S(449, __c28, 1)),
          RouteKey: S.optional(S.String),
          RouteResponseSelectionExpression: S.optional(S.String),
          Target: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              ApiKeyRequired: "apiKeyRequired",
              AuthorizationScopes: "authorizationScopes",
              AuthorizationType: "authorizationType",
              AuthorizerId: "authorizerId",
              ModelSelectionExpression: "modelSelectionExpression",
              OperationName: "operationName",
              RequestModels: "requestModels",
              RequestParameters: "requestParameters",
              RouteKey: "routeKey",
              RouteResponseSelectionExpression: "routeResponseSelectionExpression",
              Target: "target",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v2/apis/{ApiId}/routes" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateRouteRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Required: S.optional(S.Boolean) }).pipe(S.encodeKeys({ Required: "required" })),
      ).annotate({ identifier: "ParameterConstraints" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(448, __c28, 0).pipe(S.optional));
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiGatewayManaged: S.optional(S.Boolean),
          ApiKeyRequired: S.optional(S.Boolean),
          AuthorizationScopes: S.optional(__S(1088, __c68, 0)),
          AuthorizationType: S.optional(S.String),
          AuthorizerId: S.optional(S.String),
          ModelSelectionExpression: S.optional(S.String),
          OperationName: S.optional(S.String),
          RequestModels: S.optional(__S(1104, __c69, 0)),
          RequestParameters: S.optional(__S(449, __c28, 1)),
          RouteId: S.optional(S.String),
          RouteKey: S.optional(S.String),
          RouteResponseSelectionExpression: S.optional(S.String),
          Target: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ApiGatewayManaged: "apiGatewayManaged",
            ApiKeyRequired: "apiKeyRequired",
            AuthorizationScopes: "authorizationScopes",
            AuthorizationType: "authorizationType",
            AuthorizerId: "authorizerId",
            ModelSelectionExpression: "modelSelectionExpression",
            OperationName: "operationName",
            RequestModels: "requestModels",
            RequestParameters: "requestParameters",
            RouteId: "routeId",
            RouteKey: "routeKey",
            RouteResponseSelectionExpression: "routeResponseSelectionExpression",
            Target: "target",
          }),
        ),
      ).annotate({ identifier: "CreateRouteResult" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          ModelSelectionExpression: S.optional(S.String),
          ResponseModels: S.optional(__S(1104, __c69, 0)),
          ResponseParameters: S.optional(__S(449, __c28, 1)),
          RouteId: S.String.pipe(T.HttpLabel("RouteId")),
          RouteResponseKey: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              ModelSelectionExpression: "modelSelectionExpression",
              ResponseModels: "responseModels",
              ResponseParameters: "responseParameters",
              RouteResponseKey: "routeResponseKey",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v2/apis/{ApiId}/routes/{RouteId}/routeresponses" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateRouteResponseRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ModelSelectionExpression: S.optional(S.String),
          ResponseModels: S.optional(__S(1104, __c69, 0)),
          ResponseParameters: S.optional(__S(449, __c28, 1)),
          RouteResponseId: S.optional(S.String),
          RouteResponseKey: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ModelSelectionExpression: "modelSelectionExpression",
            ResponseModels: "responseModels",
            ResponseParameters: "responseParameters",
            RouteResponseId: "routeResponseId",
            RouteResponseKey: "routeResponseKey",
          }),
        ),
      ).annotate({ identifier: "CreateRouteResponseResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Actions: S.optional(__listOfRoutingRuleAction),
          Conditions: S.optional(__listOfRoutingRuleCondition),
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          DomainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
          Priority: S.optional(S.Number),
        })
          .pipe(
            S.encodeKeys({ Actions: "actions", Conditions: "conditions", Priority: "priority" }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v2/domainnames/{DomainName}/routingrules" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateRoutingRuleRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.optional(S.String),
          Stage: S.optional(S.String),
          StripBasePath: S.optional(S.Boolean),
        }).pipe(S.encodeKeys({ ApiId: "apiId", Stage: "stage", StripBasePath: "stripBasePath" })),
      ).annotate({ identifier: "RoutingRuleActionInvokeApi" });
    case 1:
      return S.suspend(() =>
        S.Struct({ InvokeApi: S.optional(__S(528, __c33, 0)) }).pipe(
          S.encodeKeys({ InvokeApi: "invokeApi" }),
        ),
      ).annotate({ identifier: "RoutingRuleAction" });
    case 2:
      return S.Array(__S(529, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ AnyOf: S.optional(__listOfSelectionKey) }).pipe(
          S.encodeKeys({ AnyOf: "anyOf" }),
        ),
      ).annotate({ identifier: "RoutingRuleMatchBasePaths" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Header: S.optional(S.String), ValueGlob: S.optional(S.String) }).pipe(
          S.encodeKeys({ Header: "header", ValueGlob: "valueGlob" }),
        ),
      ).annotate({ identifier: "RoutingRuleMatchHeaderValue" });
    case 5:
      return S.Array(__S(532, __c33, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ AnyOf: S.optional(__listOfRoutingRuleMatchHeaderValue) }).pipe(
          S.encodeKeys({ AnyOf: "anyOf" }),
        ),
      ).annotate({ identifier: "RoutingRuleMatchHeaders" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          MatchBasePaths: S.optional(__S(531, __c33, 3)),
          MatchHeaders: S.optional(__S(534, __c33, 6)),
        }).pipe(S.encodeKeys({ MatchBasePaths: "matchBasePaths", MatchHeaders: "matchHeaders" })),
      ).annotate({ identifier: "RoutingRuleCondition" });
    case 8:
      return S.Array(__S(535, __c33, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          Actions: S.optional(__listOfRoutingRuleAction),
          Conditions: S.optional(__listOfRoutingRuleCondition),
          Priority: S.optional(S.Number),
          RoutingRuleArn: S.optional(S.String),
          RoutingRuleId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Actions: "actions",
            Conditions: "conditions",
            Priority: "priority",
            RoutingRuleArn: "routingRuleArn",
            RoutingRuleId: "routingRuleId",
          }),
        ),
      ).annotate({ identifier: "CreateRoutingRuleResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccessLogSettings: S.optional(__S(560, __c35, 0)),
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          AutoDeploy: S.optional(S.Boolean),
          ClientCertificateId: S.optional(S.String),
          DefaultRouteSettings: S.optional(__S(561, __c35, 1)),
          DeploymentId: S.optional(S.String),
          Description: S.optional(S.String),
          RouteSettings: S.optional(__S(562, __c35, 2)),
          StageName: S.optional(S.String),
          StageVariables: S.optional(__S(1104, __c69, 0)),
          Tags: S.optional(__S(1104, __c69, 0)),
        })
          .pipe(
            S.encodeKeys({
              AccessLogSettings: "accessLogSettings",
              AutoDeploy: "autoDeploy",
              ClientCertificateId: "clientCertificateId",
              DefaultRouteSettings: "defaultRouteSettings",
              DeploymentId: "deploymentId",
              Description: "description",
              RouteSettings: "routeSettings",
              StageName: "stageName",
              StageVariables: "stageVariables",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v2/apis/{ApiId}/stages" }),
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
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DestinationArn: S.optional(S.String), Format: S.optional(S.String) }).pipe(
          S.encodeKeys({ DestinationArn: "destinationArn", Format: "format" }),
        ),
      ).annotate({ identifier: "AccessLogSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DataTraceEnabled: S.optional(S.Boolean),
          DetailedMetricsEnabled: S.optional(S.Boolean),
          LoggingLevel: S.optional(S.String),
          ThrottlingBurstLimit: S.optional(S.Number),
          ThrottlingRateLimit: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            DataTraceEnabled: "dataTraceEnabled",
            DetailedMetricsEnabled: "detailedMetricsEnabled",
            LoggingLevel: "loggingLevel",
            ThrottlingBurstLimit: "throttlingBurstLimit",
            ThrottlingRateLimit: "throttlingRateLimit",
          }),
        ),
      ).annotate({ identifier: "RouteSettings" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(561, __c35, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AccessLogSettings: S.optional(__S(560, __c35, 0)),
          ApiGatewayManaged: S.optional(S.Boolean),
          AutoDeploy: S.optional(S.Boolean),
          ClientCertificateId: S.optional(S.String),
          CreatedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DefaultRouteSettings: S.optional(__S(561, __c35, 1)),
          DeploymentId: S.optional(S.String),
          Description: S.optional(S.String),
          LastDeploymentStatusMessage: S.optional(S.String),
          LastUpdatedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          RouteSettings: S.optional(__S(562, __c35, 2)),
          StageName: S.optional(S.String),
          StageVariables: S.optional(__S(1104, __c69, 0)),
          Tags: S.optional(__S(1104, __c69, 0)),
        }).pipe(
          S.encodeKeys({
            AccessLogSettings: "accessLogSettings",
            ApiGatewayManaged: "apiGatewayManaged",
            AutoDeploy: "autoDeploy",
            ClientCertificateId: "clientCertificateId",
            CreatedDate: "createdDate",
            DefaultRouteSettings: "defaultRouteSettings",
            DeploymentId: "deploymentId",
            Description: "description",
            LastDeploymentStatusMessage: "lastDeploymentStatusMessage",
            LastUpdatedDate: "lastUpdatedDate",
            RouteSettings: "routeSettings",
            StageName: "stageName",
            StageVariables: "stageVariables",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "CreateStageResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          SecurityGroupIds: S.optional(__S(1088, __c68, 0)),
          SubnetIds: S.optional(__S(1088, __c68, 0)),
          Tags: S.optional(__S(1104, __c69, 0)),
        })
          .pipe(
            S.encodeKeys({
              Name: "name",
              SecurityGroupIds: "securityGroupIds",
              SubnetIds: "subnetIds",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/v2/vpclinks" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "CreateVpcLinkRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CreatedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Name: S.optional(S.String),
          SecurityGroupIds: S.optional(__S(1088, __c68, 0)),
          SubnetIds: S.optional(__S(1088, __c68, 0)),
          Tags: S.optional(__S(1104, __c69, 0)),
          VpcLinkId: S.optional(S.String),
          VpcLinkStatus: S.optional(S.String),
          VpcLinkStatusMessage: S.optional(S.String),
          VpcLinkVersion: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CreatedDate: "createdDate",
            Name: "name",
            SecurityGroupIds: "securityGroupIds",
            SubnetIds: "subnetIds",
            Tags: "tags",
            VpcLinkId: "vpcLinkId",
            VpcLinkStatus: "vpcLinkStatus",
            VpcLinkStatusMessage: "vpcLinkStatusMessage",
            VpcLinkVersion: "vpcLinkVersion",
          }),
        ),
      ).annotate({ identifier: "CreateVpcLinkResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          StageName: S.String.pipe(T.HttpLabel("StageName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/apis/{ApiId}/stages/{StageName}/accesslogsettings",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAccessLogSettingsRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApiId: S.String.pipe(T.HttpLabel("ApiId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/apis/{ApiId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteApiRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiMappingId: S.String.pipe(T.HttpLabel("ApiMappingId")),
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domainnames/{DomainName}/apimappings/{ApiMappingId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteApiMappingRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          AuthorizerId: S.String.pipe(T.HttpLabel("AuthorizerId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/apis/{ApiId}/authorizers/{AuthorizerId}" }),
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
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApiId: S.String.pipe(T.HttpLabel("ApiId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/apis/{ApiId}/cors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCorsConfigurationRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          DeploymentId: S.String.pipe(T.HttpLabel("DeploymentId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/apis/{ApiId}/deployments/{DeploymentId}" }),
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
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/domainnames/{DomainName}" }),
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
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/apis/{ApiId}/integrations/{IntegrationId}" }),
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
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
          IntegrationResponseId: S.String.pipe(T.HttpLabel("IntegrationResponseId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/apis/{ApiId}/integrations/{IntegrationId}/integrationresponses/{IntegrationResponseId}",
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
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          ModelId: S.String.pipe(T.HttpLabel("ModelId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/apis/{ApiId}/models/{ModelId}" }),
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
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PortalId: S.String.pipe(T.HttpLabel("PortalId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/portals/{PortalId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePortalRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/portalproducts/{PortalProductId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePortalProductRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/portalproducts/{PortalProductId}/sharingpolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePortalProductSharingPolicyRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
          ProductPageId: S.String.pipe(T.HttpLabel("ProductPageId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/portalproducts/{PortalProductId}/productpages/{ProductPageId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProductPageRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
          ProductRestEndpointPageId: S.String.pipe(T.HttpLabel("ProductRestEndpointPageId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/portalproducts/{PortalProductId}/productrestendpointpages/{ProductRestEndpointPageId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProductRestEndpointPageRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          RouteId: S.String.pipe(T.HttpLabel("RouteId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/apis/{ApiId}/routes/{RouteId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRouteRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          RequestParameterKey: S.String.pipe(T.HttpLabel("RequestParameterKey")),
          RouteId: S.String.pipe(T.HttpLabel("RouteId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/apis/{ApiId}/routes/{RouteId}/requestparameters/{RequestParameterKey}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRouteRequestParameterRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          RouteId: S.String.pipe(T.HttpLabel("RouteId")),
          RouteResponseId: S.String.pipe(T.HttpLabel("RouteResponseId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/apis/{ApiId}/routes/{RouteId}/routeresponses/{RouteResponseId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRouteResponseRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          RouteKey: S.String.pipe(T.HttpLabel("RouteKey")),
          StageName: S.String.pipe(T.HttpLabel("StageName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/apis/{ApiId}/stages/{StageName}/routesettings/{RouteKey}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRouteSettingsRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          DomainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
          RoutingRuleId: S.String.pipe(T.HttpLabel("RoutingRuleId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/domainnames/{DomainName}/routingrules/{RoutingRuleId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRoutingRuleRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          StageName: S.String.pipe(T.HttpLabel("StageName")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/apis/{ApiId}/stages/{StageName}" }),
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
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VpcLinkId: S.String.pipe(T.HttpLabel("VpcLinkId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/vpclinks/{VpcLinkId}" }),
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
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PortalId: S.String.pipe(T.HttpLabel("PortalId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/portals/{PortalId}/publish" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisablePortalRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          ExportVersion: S.optional(S.String).pipe(T.HttpQuery("exportVersion")),
          IncludeExtensions: S.optional(S.Boolean).pipe(T.HttpQuery("includeExtensions")),
          OutputType: S.optional(S.String).pipe(T.HttpQuery("outputType")),
          Specification: S.String.pipe(T.HttpLabel("Specification")),
          StageName: S.optional(S.String).pipe(T.HttpQuery("stageName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/exports/{Specification}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ExportApiRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ body: S.optional(T.StreamingOutput).pipe(T.HttpPayload()) }),
      ).annotate({ identifier: "ExportApiResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ApiId: S.String.pipe(T.HttpLabel("ApiId")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/apis/{ApiId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetApiRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiMappingId: S.String.pipe(T.HttpLabel("ApiMappingId")),
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domainnames/{DomainName}/apimappings/{ApiMappingId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetApiMappingRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domainnames/{DomainName}/apimappings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetApiMappingsRequest" });
    case 1:
      return S.Array(__S(1296, __c81, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__listOfApiMapping), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Items: "items", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "GetApiMappingsResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/v2/apis" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetApisRequest" });
    case 1:
      return S.Array(__S(1073, __c67, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__listOfApi), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Items: "items", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "GetApisResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiKeySelectionExpression: S.optional(S.String),
          CorsConfiguration: S.optional(__S(1072, __c67, 0)),
          CredentialsArn: S.optional(S.String),
          Description: S.optional(S.String),
          DisableSchemaValidation: S.optional(S.Boolean),
          DisableExecuteApiEndpoint: S.optional(S.Boolean),
          IpAddressType: S.optional(S.String),
          Name: S.optional(S.String),
          ProtocolType: S.optional(S.String),
          RouteKey: S.optional(S.String),
          RouteSelectionExpression: S.optional(S.String),
          Tags: S.optional(__S(1104, __c69, 0)),
          Target: S.optional(S.String),
          Version: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              ApiKeySelectionExpression: "apiKeySelectionExpression",
              CorsConfiguration: "corsConfiguration",
              CredentialsArn: "credentialsArn",
              Description: "description",
              DisableSchemaValidation: "disableSchemaValidation",
              DisableExecuteApiEndpoint: "disableExecuteApiEndpoint",
              IpAddressType: "ipAddressType",
              Name: "name",
              ProtocolType: "protocolType",
              RouteKey: "routeKey",
              RouteSelectionExpression: "routeSelectionExpression",
              Tags: "tags",
              Target: "target",
              Version: "version",
            }),
          )
          .pipe(T.all(T.Http({ method: "POST", uri: "/v2/apis" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateApiRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AllowCredentials: S.optional(S.Boolean),
          AllowHeaders: S.optional(__S(1088, __c68, 0)),
          AllowMethods: S.optional(__S(1088, __c68, 0)),
          AllowOrigins: S.optional(__S(1088, __c68, 0)),
          ExposeHeaders: S.optional(__S(1088, __c68, 0)),
          MaxAge: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            AllowCredentials: "allowCredentials",
            AllowHeaders: "allowHeaders",
            AllowMethods: "allowMethods",
            AllowOrigins: "allowOrigins",
            ExposeHeaders: "exposeHeaders",
            MaxAge: "maxAge",
          }),
        ),
      ).annotate({ identifier: "Cors" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ApiEndpoint: S.optional(S.String),
          ApiGatewayManaged: S.optional(S.Boolean),
          ApiId: S.optional(S.String),
          ApiKeySelectionExpression: S.optional(S.String),
          CorsConfiguration: S.optional(__S(1072, __c67, 0)),
          CreatedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Description: S.optional(S.String),
          DisableSchemaValidation: S.optional(S.Boolean),
          DisableExecuteApiEndpoint: S.optional(S.Boolean),
          ImportInfo: S.optional(__listOf__string),
          IpAddressType: S.optional(S.String),
          Name: S.optional(S.String),
          ProtocolType: S.optional(S.String),
          RouteSelectionExpression: S.optional(S.String),
          Tags: S.optional(__S(1104, __c69, 0)),
          Version: S.optional(S.String),
          Warnings: S.optional(__listOf__string),
        }).pipe(
          S.encodeKeys({
            ApiEndpoint: "apiEndpoint",
            ApiGatewayManaged: "apiGatewayManaged",
            ApiId: "apiId",
            ApiKeySelectionExpression: "apiKeySelectionExpression",
            CorsConfiguration: "corsConfiguration",
            CreatedDate: "createdDate",
            Description: "description",
            DisableSchemaValidation: "disableSchemaValidation",
            DisableExecuteApiEndpoint: "disableExecuteApiEndpoint",
            ImportInfo: "importInfo",
            IpAddressType: "ipAddressType",
            Name: "name",
            ProtocolType: "protocolType",
            RouteSelectionExpression: "routeSelectionExpression",
            Tags: "tags",
            Version: "version",
            Warnings: "warnings",
          }),
        ),
      ).annotate({ identifier: "CreateApiResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          AuthorizerId: S.String.pipe(T.HttpLabel("AuthorizerId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/authorizers/{AuthorizerId}" }),
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
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/authorizers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAuthorizersRequest" });
    case 1:
      return S.Array(__S(1505, __c94, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__listOfAuthorizer), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Items: "items", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "GetAuthorizersResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          DeploymentId: S.String.pipe(T.HttpLabel("DeploymentId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/deployments/{DeploymentId}" }),
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
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/deployments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDeploymentsRequest" });
    case 1:
      return S.Array(__S(1696, __c106, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__listOfDeployment), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Items: "items", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "GetDeploymentsResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domainnames/{DomainName}" }),
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
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/domainnames" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDomainNamesRequest" });
    case 1:
      return S.Array(__S(1891, __c118, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__listOfDomainName), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Items: "items", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "GetDomainNamesResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/integrations/{IntegrationId}" }),
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
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
          IntegrationResponseId: S.String.pipe(T.HttpLabel("IntegrationResponseId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/apis/{ApiId}/integrations/{IntegrationId}/integrationresponses/{IntegrationResponseId}",
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
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/apis/{ApiId}/integrations/{IntegrationId}/integrationresponses",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIntegrationResponsesRequest" });
    case 1:
      return S.Array(__S(176, __c11, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Items: S.optional(__listOfIntegrationResponse),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
      ).annotate({ identifier: "GetIntegrationResponsesResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/integrations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIntegrationsRequest" });
    case 1:
      return S.Array(__S(18, __c1, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__listOfIntegration), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Items: "items", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "GetIntegrationsResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.optional(S.String),
          ApiMappingKey: S.optional(S.String),
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          Stage: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ ApiId: "apiId", ApiMappingKey: "apiMappingKey", Stage: "stage" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v2/domainnames/{DomainName}/apimappings" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateApiMappingRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.optional(S.String),
          ApiMappingId: S.optional(S.String),
          ApiMappingKey: S.optional(S.String),
          Stage: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ApiId: "apiId",
            ApiMappingId: "apiMappingId",
            ApiMappingKey: "apiMappingKey",
            Stage: "stage",
          }),
        ),
      ).annotate({ identifier: "CreateApiMappingResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          ModelId: S.String.pipe(T.HttpLabel("ModelId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/models/{ModelId}" }),
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
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/models" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetModelsRequest" });
    case 1:
      return S.Array(__S(208, __c13, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__listOfModel), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Items: "items", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "GetModelsResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          ModelId: S.String.pipe(T.HttpLabel("ModelId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/models/{ModelId}/template" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetModelTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Value: S.optional(S.String) }).pipe(S.encodeKeys({ Value: "value" })),
      ).annotate({ identifier: "GetModelTemplateResponse" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PortalId: S.String.pipe(T.HttpLabel("PortalId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/portals/{PortalId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPortalRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PreviewStatus: S.optional(S.String),
          PreviewUrl: S.optional(S.String),
          StatusException: S.optional(__S(272, __c17, 0)),
        }).pipe(
          S.encodeKeys({
            PreviewStatus: "previewStatus",
            PreviewUrl: "previewUrl",
            StatusException: "statusException",
          }),
        ),
      ).annotate({ identifier: "Preview" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Authorization: S.optional(__S(289, __c18, 1)),
          EndpointConfiguration: S.optional(__S(293, __c18, 5)),
          IncludedPortalProductArns: S.optional(__listOf__stringMin20Max2048),
          LastModified: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          LastPublished: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          LastPublishedDescription: S.optional(S.String),
          PortalArn: S.optional(S.String),
          PortalContent: S.optional(__S(292, __c18, 4)),
          PortalId: S.optional(S.String),
          Preview: S.optional(__S(1376, __c86, 0)),
          PublishStatus: S.optional(S.String),
          RumAppMonitorName: S.optional(S.String),
          StatusException: S.optional(__S(272, __c17, 0)),
          Tags: S.optional(__S(1104, __c69, 0)),
        }).pipe(
          S.encodeKeys({
            Authorization: "authorization",
            EndpointConfiguration: "endpointConfiguration",
            IncludedPortalProductArns: "includedPortalProductArns",
            LastModified: "lastModified",
            LastPublished: "lastPublished",
            LastPublishedDescription: "lastPublishedDescription",
            PortalArn: "portalArn",
            PortalContent: "portalContent",
            PortalId: "portalId",
            Preview: "preview",
            PublishStatus: "publishStatus",
            RumAppMonitorName: "rumAppMonitorName",
            StatusException: "statusException",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "GetPortalResponse" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
          ResourceOwnerAccountId: S.optional(S.String).pipe(T.HttpQuery("resourceOwnerAccountId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/portalproducts/{PortalProductId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPortalProductRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/portalproducts/{PortalProductId}/sharingpolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPortalProductSharingPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PolicyDocument: S.optional(S.String),
          PortalProductId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ PolicyDocument: "policyDocument", PortalProductId: "portalProductId" }),
        ),
      ).annotate({ identifier: "GetPortalProductSharingPolicyResponse" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
          ProductPageId: S.String.pipe(T.HttpLabel("ProductPageId")),
          ResourceOwnerAccountId: S.optional(S.String).pipe(T.HttpQuery("resourceOwnerAccountId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/portalproducts/{PortalProductId}/productpages/{ProductPageId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProductPageRequest" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IncludeRawDisplayContent: S.optional(S.String).pipe(
            T.HttpQuery("includeRawDisplayContent"),
          ),
          PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
          ProductRestEndpointPageId: S.String.pipe(T.HttpLabel("ProductRestEndpointPageId")),
          ResourceOwnerAccountId: S.optional(S.String).pipe(T.HttpQuery("resourceOwnerAccountId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/portalproducts/{PortalProductId}/productrestendpointpages/{ProductRestEndpointPageId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProductRestEndpointPageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DisplayContent: S.optional(__S(400, __c25, 0)),
          LastModified: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ProductRestEndpointPageArn: S.optional(S.String),
          ProductRestEndpointPageId: S.optional(S.String),
          RawDisplayContent: S.optional(S.String),
          RestEndpointIdentifier: S.optional(__S(417, __c26, 1)),
          Status: S.optional(S.String),
          StatusException: S.optional(__S(272, __c17, 0)),
          TryItState: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DisplayContent: "displayContent",
            LastModified: "lastModified",
            ProductRestEndpointPageArn: "productRestEndpointPageArn",
            ProductRestEndpointPageId: "productRestEndpointPageId",
            RawDisplayContent: "rawDisplayContent",
            RestEndpointIdentifier: "restEndpointIdentifier",
            Status: "status",
            StatusException: "statusException",
            TryItState: "tryItState",
          }),
        ),
      ).annotate({ identifier: "GetProductRestEndpointPageResponse" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          RouteId: S.String.pipe(T.HttpLabel("RouteId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/routes/{RouteId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRouteRequest" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          RouteId: S.String.pipe(T.HttpLabel("RouteId")),
          RouteResponseId: S.String.pipe(T.HttpLabel("RouteResponseId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/apis/{ApiId}/routes/{RouteId}/routeresponses/{RouteResponseId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRouteResponseRequest" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          AuthorizerCredentialsArn: S.optional(S.String),
          AuthorizerPayloadFormatVersion: S.optional(S.String),
          AuthorizerResultTtlInSeconds: S.optional(S.Number),
          AuthorizerType: S.optional(S.String),
          AuthorizerUri: S.optional(S.String),
          EnableSimpleResponses: S.optional(S.Boolean),
          IdentitySource: S.optional(__S(1088, __c68, 0)),
          IdentityValidationExpression: S.optional(S.String),
          JwtConfiguration: S.optional(__S(1504, __c94, 0)),
          Name: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              AuthorizerCredentialsArn: "authorizerCredentialsArn",
              AuthorizerPayloadFormatVersion: "authorizerPayloadFormatVersion",
              AuthorizerResultTtlInSeconds: "authorizerResultTtlInSeconds",
              AuthorizerType: "authorizerType",
              AuthorizerUri: "authorizerUri",
              EnableSimpleResponses: "enableSimpleResponses",
              IdentitySource: "identitySource",
              IdentityValidationExpression: "identityValidationExpression",
              JwtConfiguration: "jwtConfiguration",
              Name: "name",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v2/apis/{ApiId}/authorizers" }),
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
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Audience: S.optional(__listOf__string), Issuer: S.optional(S.String) }).pipe(
          S.encodeKeys({ Audience: "audience", Issuer: "issuer" }),
        ),
      ).annotate({ identifier: "JWTConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AuthorizerCredentialsArn: S.optional(S.String),
          AuthorizerId: S.optional(S.String),
          AuthorizerPayloadFormatVersion: S.optional(S.String),
          AuthorizerResultTtlInSeconds: S.optional(S.Number),
          AuthorizerType: S.optional(S.String),
          AuthorizerUri: S.optional(S.String),
          EnableSimpleResponses: S.optional(S.Boolean),
          IdentitySource: S.optional(__S(1088, __c68, 0)),
          IdentityValidationExpression: S.optional(S.String),
          JwtConfiguration: S.optional(__S(1504, __c94, 0)),
          Name: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AuthorizerCredentialsArn: "authorizerCredentialsArn",
            AuthorizerId: "authorizerId",
            AuthorizerPayloadFormatVersion: "authorizerPayloadFormatVersion",
            AuthorizerResultTtlInSeconds: "authorizerResultTtlInSeconds",
            AuthorizerType: "authorizerType",
            AuthorizerUri: "authorizerUri",
            EnableSimpleResponses: "enableSimpleResponses",
            IdentitySource: "identitySource",
            IdentityValidationExpression: "identityValidationExpression",
            JwtConfiguration: "jwtConfiguration",
            Name: "name",
          }),
        ),
      ).annotate({ identifier: "CreateAuthorizerResponse" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          RouteId: S.String.pipe(T.HttpLabel("RouteId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/routes/{RouteId}/routeresponses" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRouteResponsesRequest" });
    case 1:
      return S.Array(__S(496, __c31, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Items: S.optional(__listOfRouteResponse),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
      ).annotate({ identifier: "GetRouteResponsesResponse" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/routes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRoutesRequest" });
    case 1:
      return S.Array(__S(464, __c29, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__listOfRoute), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Items: "items", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "GetRoutesResponse" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          DomainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
          RoutingRuleId: S.String.pipe(T.HttpLabel("RoutingRuleId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/domainnames/{DomainName}/routingrules/{RoutingRuleId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRoutingRuleRequest" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          StageName: S.String.pipe(T.HttpLabel("StageName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/stages/{StageName}" }),
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
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/stages" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetStagesRequest" });
    case 1:
      return S.Array(__S(563, __c35, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__listOfStage), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Items: "items", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "GetStagesResponse" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTagsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(1104, __c69, 0)) }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "GetTagsResponse" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VpcLinkId: S.String.pipe(T.HttpLabel("VpcLinkId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/vpclinks/{VpcLinkId}" }),
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
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/vpclinks" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetVpcLinksRequest" });
    case 1:
      return S.Array(__S(592, __c37, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__listOfVpcLink), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Items: "items", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "GetVpcLinksResponse" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Basepath: S.optional(S.String).pipe(T.HttpQuery("basepath")),
          Body: S.optional(S.String),
          FailOnWarnings: S.optional(S.Boolean).pipe(T.HttpQuery("failOnWarnings")),
        })
          .pipe(S.encodeKeys({ Body: "body" }))
          .pipe(T.all(T.Http({ method: "PUT", uri: "/v2/apis" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ImportApiRequest" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          ResourceOwner: S.optional(S.String).pipe(T.HttpQuery("resourceOwner")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/portalproducts" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPortalProductsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          DisplayName: S.optional(S.String),
          LastModified: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          PortalProductArn: S.optional(S.String),
          PortalProductId: S.optional(S.String),
          Tags: S.optional(__S(1104, __c69, 0)),
        }).pipe(
          S.encodeKeys({
            Description: "description",
            DisplayName: "displayName",
            LastModified: "lastModified",
            PortalProductArn: "portalProductArn",
            PortalProductId: "portalProductId",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "PortalProductSummary" });
    case 2:
      return S.Array(__S(1665, __c104, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Items: S.optional(__listOfPortalProductSummary),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListPortalProductsResponse" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          Description: S.optional(S.String),
          StageName: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ Description: "description", StageName: "stageName" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v2/apis/{ApiId}/deployments" }),
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
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoDeployed: S.optional(S.Boolean),
          CreatedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DeploymentId: S.optional(S.String),
          DeploymentStatus: S.optional(S.String),
          DeploymentStatusMessage: S.optional(S.String),
          Description: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AutoDeployed: "autoDeployed",
            CreatedDate: "createdDate",
            DeploymentId: "deploymentId",
            DeploymentStatus: "deploymentStatus",
            DeploymentStatusMessage: "deploymentStatusMessage",
            Description: "description",
          }),
        ),
      ).annotate({ identifier: "CreateDeploymentResponse" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/v2/portals" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPortalsRequest" });
    case 1:
      return S.Array(__S(1377, __c86, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Items: S.optional(__listOfPortalSummary),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListPortalsResponse" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
          ResourceOwnerAccountId: S.optional(S.String).pipe(T.HttpQuery("resourceOwnerAccountId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/portalproducts/{PortalProductId}/productpages" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProductPagesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LastModified: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          PageTitle: S.optional(S.String),
          ProductPageArn: S.optional(S.String),
          ProductPageId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            LastModified: "lastModified",
            PageTitle: "pageTitle",
            ProductPageArn: "productPageArn",
            ProductPageId: "productPageId",
          }),
        ),
      ).annotate({ identifier: "ProductPageSummaryNoBody" });
    case 2:
      return S.Array(__S(1729, __c108, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Items: S.optional(__listOfProductPageSummaryNoBody),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListProductPagesResponse" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
          ResourceOwnerAccountId: S.optional(S.String).pipe(T.HttpQuery("resourceOwnerAccountId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v2/portalproducts/{PortalProductId}/productrestendpointpages",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProductRestEndpointPagesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Endpoint: S.optional(S.String),
          LastModified: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          OperationName: S.optional(S.String),
          ProductRestEndpointPageArn: S.optional(S.String),
          ProductRestEndpointPageId: S.optional(S.String),
          RestEndpointIdentifier: S.optional(__S(417, __c26, 1)),
          Status: S.optional(S.String),
          StatusException: S.optional(__S(272, __c17, 0)),
          TryItState: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Endpoint: "endpoint",
            LastModified: "lastModified",
            OperationName: "operationName",
            ProductRestEndpointPageArn: "productRestEndpointPageArn",
            ProductRestEndpointPageId: "productRestEndpointPageId",
            RestEndpointIdentifier: "restEndpointIdentifier",
            Status: "status",
            StatusException: "statusException",
            TryItState: "tryItState",
          }),
        ),
      ).annotate({ identifier: "ProductRestEndpointPageSummaryNoBody" });
    case 2:
      return S.Array(__S(1745, __c109, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Items: S.optional(__listOfProductRestEndpointPageSummaryNoBody),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListProductRestEndpointPagesResponse" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          DomainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/domainnames/{DomainName}/routingrules" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRoutingRulesRequest" });
    case 1:
      return S.Array(__S(537, __c33, 9));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          RoutingRules: S.optional(__listOfRoutingRule),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", RoutingRules: "routingRules" })),
      ).annotate({ identifier: "ListRoutingRulesResponse" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PortalId: S.String.pipe(T.HttpLabel("PortalId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/portals/{PortalId}/preview" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PreviewPortalRequest" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          PortalId: S.String.pipe(T.HttpLabel("PortalId")),
        })
          .pipe(S.encodeKeys({ Description: "description" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v2/portals/{PortalId}/publish" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "PublishPortalRequest" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PolicyDocument: S.optional(S.String),
          PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
        })
          .pipe(S.encodeKeys({ PolicyDocument: "policyDocument" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/v2/portalproducts/{PortalProductId}/sharingpolicy" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "PutPortalProductSharingPolicyRequest" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Actions: S.optional(__listOfRoutingRuleAction),
          Conditions: S.optional(__listOfRoutingRuleCondition),
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          DomainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
          Priority: S.optional(S.Number),
          RoutingRuleId: S.String.pipe(T.HttpLabel("RoutingRuleId")),
        })
          .pipe(
            S.encodeKeys({ Actions: "actions", Conditions: "conditions", Priority: "priority" }),
          )
          .pipe(
            T.all(
              T.Http({
                method: "PUT",
                uri: "/v2/domainnames/{DomainName}/routingrules/{RoutingRuleId}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "PutRoutingRuleRequest" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          Basepath: S.optional(S.String).pipe(T.HttpQuery("basepath")),
          Body: S.optional(S.String),
          FailOnWarnings: S.optional(S.Boolean).pipe(T.HttpQuery("failOnWarnings")),
        })
          .pipe(S.encodeKeys({ Body: "body" }))
          .pipe(
            T.all(T.Http({ method: "PUT", uri: "/v2/apis/{ApiId}" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "ReimportApiRequest" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          StageName: S.String.pipe(T.HttpLabel("StageName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v2/apis/{ApiId}/stages/{StageName}/cache/authorizers",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResetAuthorizersCacheRequest" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String),
          DomainNameConfigurations: S.optional(__S(1889, __c118, 1)),
          MutualTlsAuthentication: S.optional(__S(1904, __c119, 0)),
          RoutingMode: S.optional(S.String),
          Tags: S.optional(__S(1104, __c69, 0)),
        })
          .pipe(
            S.encodeKeys({
              DomainName: "domainName",
              DomainNameConfigurations: "domainNameConfigurations",
              MutualTlsAuthentication: "mutualTlsAuthentication",
              RoutingMode: "routingMode",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/v2/domainnames" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "CreateDomainNameRequest" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiGatewayDomainName: S.optional(S.String),
          CertificateArn: S.optional(S.String),
          CertificateName: S.optional(S.String),
          CertificateUploadDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          DomainNameStatus: S.optional(S.String),
          DomainNameStatusMessage: S.optional(S.String),
          EndpointType: S.optional(S.String),
          HostedZoneId: S.optional(S.String),
          IpAddressType: S.optional(S.String),
          SecurityPolicy: S.optional(S.String),
          OwnershipVerificationCertificateArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ApiGatewayDomainName: "apiGatewayDomainName",
            CertificateArn: "certificateArn",
            CertificateName: "certificateName",
            CertificateUploadDate: "certificateUploadDate",
            DomainNameStatus: "domainNameStatus",
            DomainNameStatusMessage: "domainNameStatusMessage",
            EndpointType: "endpointType",
            HostedZoneId: "hostedZoneId",
            IpAddressType: "ipAddressType",
            SecurityPolicy: "securityPolicy",
            OwnershipVerificationCertificateArn: "ownershipVerificationCertificateArn",
          }),
        ),
      ).annotate({ identifier: "DomainNameConfiguration" });
    case 1:
      return S.Array(__S(1888, __c118, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          TruststoreUri: S.optional(S.String),
          TruststoreVersion: S.optional(S.String),
          TruststoreWarnings: S.optional(__listOf__string),
        }).pipe(
          S.encodeKeys({
            TruststoreUri: "truststoreUri",
            TruststoreVersion: "truststoreVersion",
            TruststoreWarnings: "truststoreWarnings",
          }),
        ),
      ).annotate({ identifier: "MutualTlsAuthentication" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ApiMappingSelectionExpression: S.optional(S.String),
          DomainName: S.optional(S.String),
          DomainNameArn: S.optional(S.String),
          DomainNameConfigurations: S.optional(__S(1889, __c118, 1)),
          MutualTlsAuthentication: S.optional(__S(1890, __c118, 2)),
          RoutingMode: S.optional(S.String),
          Tags: S.optional(__S(1104, __c69, 0)),
        }).pipe(
          S.encodeKeys({
            ApiMappingSelectionExpression: "apiMappingSelectionExpression",
            DomainName: "domainName",
            DomainNameArn: "domainNameArn",
            DomainNameConfigurations: "domainNameConfigurations",
            MutualTlsAuthentication: "mutualTlsAuthentication",
            RoutingMode: "routingMode",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "CreateDomainNameResponse" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TruststoreUri: S.optional(S.String),
          TruststoreVersion: S.optional(S.String),
        }).pipe(
          S.encodeKeys({ TruststoreUri: "truststoreUri", TruststoreVersion: "truststoreVersion" }),
        ),
      ).annotate({ identifier: "MutualTlsAuthenticationInput" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: S.optional(__S(1104, __c69, 0)),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v2/tags/{ResourceArn}" }),
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
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: S.optional(__listOf__string).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/tags/{ResourceArn}" }),
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
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          ApiKeySelectionExpression: S.optional(S.String),
          CorsConfiguration: S.optional(__S(1072, __c67, 0)),
          CredentialsArn: S.optional(S.String),
          Description: S.optional(S.String),
          DisableSchemaValidation: S.optional(S.Boolean),
          DisableExecuteApiEndpoint: S.optional(S.Boolean),
          IpAddressType: S.optional(S.String),
          Name: S.optional(S.String),
          RouteKey: S.optional(S.String),
          RouteSelectionExpression: S.optional(S.String),
          Target: S.optional(S.String),
          Version: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              ApiKeySelectionExpression: "apiKeySelectionExpression",
              CorsConfiguration: "corsConfiguration",
              CredentialsArn: "credentialsArn",
              Description: "description",
              DisableSchemaValidation: "disableSchemaValidation",
              DisableExecuteApiEndpoint: "disableExecuteApiEndpoint",
              IpAddressType: "ipAddressType",
              Name: "name",
              RouteKey: "routeKey",
              RouteSelectionExpression: "routeSelectionExpression",
              Target: "target",
              Version: "version",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PATCH", uri: "/v2/apis/{ApiId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateApiRequest" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.optional(S.String),
          ApiMappingId: S.String.pipe(T.HttpLabel("ApiMappingId")),
          ApiMappingKey: S.optional(S.String),
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          Stage: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ ApiId: "apiId", ApiMappingKey: "apiMappingKey", Stage: "stage" }))
          .pipe(
            T.all(
              T.Http({
                method: "PATCH",
                uri: "/v2/domainnames/{DomainName}/apimappings/{ApiMappingId}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateApiMappingRequest" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          AuthorizerCredentialsArn: S.optional(S.String),
          AuthorizerId: S.String.pipe(T.HttpLabel("AuthorizerId")),
          AuthorizerPayloadFormatVersion: S.optional(S.String),
          AuthorizerResultTtlInSeconds: S.optional(S.Number),
          AuthorizerType: S.optional(S.String),
          AuthorizerUri: S.optional(S.String),
          EnableSimpleResponses: S.optional(S.Boolean),
          IdentitySource: S.optional(__S(1088, __c68, 0)),
          IdentityValidationExpression: S.optional(S.String),
          JwtConfiguration: S.optional(__S(1504, __c94, 0)),
          Name: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              AuthorizerCredentialsArn: "authorizerCredentialsArn",
              AuthorizerPayloadFormatVersion: "authorizerPayloadFormatVersion",
              AuthorizerResultTtlInSeconds: "authorizerResultTtlInSeconds",
              AuthorizerType: "authorizerType",
              AuthorizerUri: "authorizerUri",
              EnableSimpleResponses: "enableSimpleResponses",
              IdentitySource: "identitySource",
              IdentityValidationExpression: "identityValidationExpression",
              JwtConfiguration: "jwtConfiguration",
              Name: "name",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PATCH", uri: "/v2/apis/{ApiId}/authorizers/{AuthorizerId}" }),
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
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          DeploymentId: S.String.pipe(T.HttpLabel("DeploymentId")),
          Description: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ Description: "description" }))
          .pipe(
            T.all(
              T.Http({ method: "PATCH", uri: "/v2/apis/{ApiId}/deployments/{DeploymentId}" }),
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
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          DomainNameConfigurations: S.optional(__S(1889, __c118, 1)),
          MutualTlsAuthentication: S.optional(__S(1904, __c119, 0)),
          RoutingMode: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              DomainNameConfigurations: "domainNameConfigurations",
              MutualTlsAuthentication: "mutualTlsAuthentication",
              RoutingMode: "routingMode",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PATCH", uri: "/v2/domainnames/{DomainName}" }),
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
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          ConnectionId: S.optional(S.String),
          ConnectionType: S.optional(S.String),
          ContentHandlingStrategy: S.optional(S.String),
          CredentialsArn: S.optional(S.String),
          Description: S.optional(S.String),
          IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
          IntegrationMethod: S.optional(S.String),
          IntegrationSubtype: S.optional(S.String),
          IntegrationType: S.optional(S.String),
          IntegrationUri: S.optional(S.String),
          PassthroughBehavior: S.optional(S.String),
          PayloadFormatVersion: S.optional(S.String),
          RequestParameters: S.optional(__S(1104, __c69, 0)),
          RequestTemplates: S.optional(__S(1104, __c69, 0)),
          ResponseParameters: S.optional(__S(16, __c1, 0)),
          TemplateSelectionExpression: S.optional(S.String),
          TimeoutInMillis: S.optional(S.Number),
          TlsConfig: S.optional(__S(17, __c1, 1)),
        })
          .pipe(
            S.encodeKeys({
              ConnectionId: "connectionId",
              ConnectionType: "connectionType",
              ContentHandlingStrategy: "contentHandlingStrategy",
              CredentialsArn: "credentialsArn",
              Description: "description",
              IntegrationMethod: "integrationMethod",
              IntegrationSubtype: "integrationSubtype",
              IntegrationType: "integrationType",
              IntegrationUri: "integrationUri",
              PassthroughBehavior: "passthroughBehavior",
              PayloadFormatVersion: "payloadFormatVersion",
              RequestParameters: "requestParameters",
              RequestTemplates: "requestTemplates",
              ResponseParameters: "responseParameters",
              TemplateSelectionExpression: "templateSelectionExpression",
              TimeoutInMillis: "timeoutInMillis",
              TlsConfig: "tlsConfig",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PATCH", uri: "/v2/apis/{ApiId}/integrations/{IntegrationId}" }),
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
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          ContentHandlingStrategy: S.optional(S.String),
          IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
          IntegrationResponseId: S.String.pipe(T.HttpLabel("IntegrationResponseId")),
          IntegrationResponseKey: S.optional(S.String),
          ResponseParameters: S.optional(__S(1104, __c69, 0)),
          ResponseTemplates: S.optional(__S(1104, __c69, 0)),
          TemplateSelectionExpression: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              ContentHandlingStrategy: "contentHandlingStrategy",
              IntegrationResponseKey: "integrationResponseKey",
              ResponseParameters: "responseParameters",
              ResponseTemplates: "responseTemplates",
              TemplateSelectionExpression: "templateSelectionExpression",
            }),
          )
          .pipe(
            T.all(
              T.Http({
                method: "PATCH",
                uri: "/v2/apis/{ApiId}/integrations/{IntegrationId}/integrationresponses/{IntegrationResponseId}",
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
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApiId: S.String.pipe(T.HttpLabel("ApiId")),
          ContentType: S.optional(S.String),
          Description: S.optional(S.String),
          ModelId: S.String.pipe(T.HttpLabel("ModelId")),
          Name: S.optional(S.String),
          Schema: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              ContentType: "contentType",
              Description: "description",
              Name: "name",
              Schema: "schema",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PATCH", uri: "/v2/apis/{ApiId}/models/{ModelId}" }),
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
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
