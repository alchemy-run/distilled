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
  sdkId: "ApiGatewayV2",
  target: "ApiGatewayV2",
  version: "2018-11-29",
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

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
    renames: { Message: "message" },
  })<{ readonly message?: string }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
    renames: { Message: "message" },
  })<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    {
      status: 404,
      renames: { Message: "message", ResourceType: "resourceType" },
    },
  )<{ readonly message?: string; readonly ResourceType?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429, renames: { LimitType: "limitType", Message: "message" } },
  )<{ readonly LimitType?: string; readonly message?: string }> {}
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
export type DeploymentStatus =
  | "PENDING"
  | "FAILED"
  | "DEPLOYED"
  | (string & {});
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
export type ContentHandlingStrategy =
  | "CONVERT_TO_BINARY"
  | "CONVERT_TO_TEXT"
  | (string & {});
export type IntegrationType =
  | "AWS"
  | "HTTP"
  | "MOCK"
  | "HTTP_PROXY"
  | "AWS_PROXY"
  | (string & {});
export type PassthroughBehavior =
  | "WHEN_NO_MATCH"
  | "NEVER"
  | "WHEN_NO_TEMPLATES"
  | (string & {});
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
  ResponseParameters?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
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
  ResponseParameters?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
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
  DisplayContent?: DisplayContent & {
    Body: __stringMin1Max32768;
    Title: __stringMin1Max255;
  };
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
  DisplayContent?: EndpointDisplayContentResponse & {
    Endpoint: __stringMin1Max1024;
  };
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
export type AuthorizationType =
  | "NONE"
  | "AWS_IAM"
  | "CUSTOM"
  | "JWT"
  | (string & {});
export type RouteModels = { [key: string]: string | undefined };
export interface ParameterConstraints {
  Required?: boolean;
}
export type RouteParameters = {
  [key: string]: ParameterConstraints | undefined;
};
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
export type __listOfSelectionKey = string[];
export interface RoutingRuleMatchBasePaths {
  AnyOf?: string[];
}
export interface RoutingRuleMatchHeaderValue {
  Header?: string;
  ValueGlob?: string;
}
export type __listOfRoutingRuleMatchHeaderValue = RoutingRuleMatchHeaderValue[];
export interface RoutingRuleMatchHeaders {
  AnyOf?: RoutingRuleMatchHeaderValue[];
}
export interface RoutingRuleCondition {
  MatchBasePaths?: RoutingRuleMatchBasePaths;
  MatchHeaders?: RoutingRuleMatchHeaders;
}
export type __listOfRoutingRuleCondition = RoutingRuleCondition[];
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
    InvokeApi: RoutingRuleActionInvokeApi & {
      ApiId: Id;
      Stage: StringWithLengthBetween1And128;
    };
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
  ResponseParameters?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
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
  ResponseParameters?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  TemplateSelectionExpression?: string;
  TimeoutInMillis?: number;
  TlsConfig?: TlsConfig;
}
export type __listOfIntegration = Integration[];
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
  DisplayContent?: DisplayContent & {
    Body: __stringMin1Max32768;
    Title: __stringMin1Max255;
  };
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
  DisplayContent?: EndpointDisplayContentResponse & {
    Endpoint: __stringMin1Max1024;
  };
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
    InvokeApi: RoutingRuleActionInvokeApi & {
      ApiId: Id;
      Stage: StringWithLengthBetween1And128;
    };
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
export type __listOfProductRestEndpointPageSummaryNoBody =
  ProductRestEndpointPageSummaryNoBody[];
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
export interface ListRoutingRulesResponse {
  NextToken?: string;
  RoutingRules?: (RoutingRule & {
    Actions: (RoutingRuleAction & {
      InvokeApi: RoutingRuleActionInvokeApi & {
        ApiId: Id;
        Stage: StringWithLengthBetween1And128;
      };
    })[];
    Conditions: (RoutingRuleCondition & {
      MatchBasePaths: RoutingRuleMatchBasePaths & {
        AnyOf: __listOfSelectionKey;
      };
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
    InvokeApi: RoutingRuleActionInvokeApi & {
      ApiId: Id;
      Stage: StringWithLengthBetween1And128;
    };
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
  ResponseParameters?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
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
  ResponseParameters?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
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
  DisplayContent?: DisplayContent & {
    Body: __stringMin1Max32768;
    Title: __stringMin1Max255;
  };
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
  DisplayContent?: EndpointDisplayContentResponse & {
    Endpoint: __stringMin1Max1024;
  };
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
  descriptor: {
    service: svc,
    http: "POST /v2/apis",
    input: {
      ApiKeySelectionExpression: D.m({ wire: "apiKeySelectionExpression" }),
      CorsConfiguration: D.m({ wire: "corsConfiguration", shape: i_Cors }),
      CredentialsArn: D.m({ wire: "credentialsArn" }),
      Description: D.m({ wire: "description" }),
      DisableSchemaValidation: D.m({ wire: "disableSchemaValidation" }),
      DisableExecuteApiEndpoint: D.m({ wire: "disableExecuteApiEndpoint" }),
      IpAddressType: D.m({ wire: "ipAddressType" }),
      Name: D.m({ wire: "name" }),
      ProtocolType: D.m({ wire: "protocolType" }),
      RouteKey: D.m({ wire: "routeKey" }),
      RouteSelectionExpression: D.m({ wire: "routeSelectionExpression" }),
      Tags: D.m({ wire: "tags" }),
      Target: D.m({ wire: "target" }),
      Version: D.m({ wire: "version" }),
    },
    output: {
      ApiEndpoint: D.m({ wire: "apiEndpoint" }),
      ApiGatewayManaged: D.m({ wire: "apiGatewayManaged" }),
      ApiId: D.m({ wire: "apiId" }),
      ApiKeySelectionExpression: D.m({ wire: "apiKeySelectionExpression" }),
      CorsConfiguration: D.m({ wire: "corsConfiguration", shape: o_Cors }),
      CreatedDate: D.m({ wire: "createdDate", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      DisableSchemaValidation: D.m({ wire: "disableSchemaValidation" }),
      DisableExecuteApiEndpoint: D.m({ wire: "disableExecuteApiEndpoint" }),
      ImportInfo: D.m({ wire: "importInfo" }),
      IpAddressType: D.m({ wire: "ipAddressType" }),
      Name: D.m({ wire: "name" }),
      ProtocolType: D.m({ wire: "protocolType" }),
      RouteSelectionExpression: D.m({ wire: "routeSelectionExpression" }),
      Tags: D.m({ wire: "tags" }),
      Version: D.m({ wire: "version" }),
      Warnings: D.m({ wire: "warnings" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApi",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/domainnames/{DomainName}/apimappings",
    input: {
      ApiId: D.m({ wire: "apiId" }),
      ApiMappingKey: D.m({ wire: "apiMappingKey" }),
      DomainName: 0,
      Stage: D.m({ wire: "stage" }),
    },
    output: {
      ApiId: D.m({ wire: "apiId" }),
      ApiMappingId: D.m({ wire: "apiMappingId" }),
      ApiMappingKey: D.m({ wire: "apiMappingKey" }),
      Stage: D.m({ wire: "stage" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApiMapping",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/apis/{ApiId}/authorizers",
    input: {
      ApiId: 0,
      AuthorizerCredentialsArn: D.m({ wire: "authorizerCredentialsArn" }),
      AuthorizerPayloadFormatVersion: D.m({
        wire: "authorizerPayloadFormatVersion",
      }),
      AuthorizerResultTtlInSeconds: D.m({
        wire: "authorizerResultTtlInSeconds",
      }),
      AuthorizerType: D.m({ wire: "authorizerType" }),
      AuthorizerUri: D.m({ wire: "authorizerUri" }),
      EnableSimpleResponses: D.m({ wire: "enableSimpleResponses" }),
      IdentitySource: D.m({ wire: "identitySource" }),
      IdentityValidationExpression: D.m({
        wire: "identityValidationExpression",
      }),
      JwtConfiguration: D.m({
        wire: "jwtConfiguration",
        shape: i_JWTConfiguration,
      }),
      Name: D.m({ wire: "name" }),
    },
    output: {
      AuthorizerCredentialsArn: D.m({ wire: "authorizerCredentialsArn" }),
      AuthorizerId: D.m({ wire: "authorizerId" }),
      AuthorizerPayloadFormatVersion: D.m({
        wire: "authorizerPayloadFormatVersion",
      }),
      AuthorizerResultTtlInSeconds: D.m({
        wire: "authorizerResultTtlInSeconds",
      }),
      AuthorizerType: D.m({ wire: "authorizerType" }),
      AuthorizerUri: D.m({ wire: "authorizerUri" }),
      EnableSimpleResponses: D.m({ wire: "enableSimpleResponses" }),
      IdentitySource: D.m({ wire: "identitySource" }),
      IdentityValidationExpression: D.m({
        wire: "identityValidationExpression",
      }),
      JwtConfiguration: D.m({
        wire: "jwtConfiguration",
        shape: o_JWTConfiguration,
      }),
      Name: D.m({ wire: "name" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAuthorizer",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/apis/{ApiId}/deployments",
    input: {
      ApiId: 0,
      Description: D.m({ wire: "description" }),
      StageName: D.m({ wire: "stageName" }),
    },
    output: {
      AutoDeployed: D.m({ wire: "autoDeployed" }),
      CreatedDate: D.m({ wire: "createdDate", shape: D.ts }),
      DeploymentId: D.m({ wire: "deploymentId" }),
      DeploymentStatus: D.m({ wire: "deploymentStatus" }),
      DeploymentStatusMessage: D.m({ wire: "deploymentStatusMessage" }),
      Description: D.m({ wire: "description" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeployment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/domainnames",
    input: {
      DomainName: D.m({ wire: "domainName" }),
      DomainNameConfigurations: D.m({
        wire: "domainNameConfigurations",
        shape: D.list(i_DomainNameConfiguration),
      }),
      MutualTlsAuthentication: D.m({
        wire: "mutualTlsAuthentication",
        shape: i_MutualTlsAuthenticationInput,
      }),
      RoutingMode: D.m({ wire: "routingMode" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      ApiMappingSelectionExpression: D.m({
        wire: "apiMappingSelectionExpression",
      }),
      DomainName: D.m({ wire: "domainName" }),
      DomainNameArn: D.m({ wire: "domainNameArn" }),
      DomainNameConfigurations: D.m({
        wire: "domainNameConfigurations",
        shape: D.list(o_DomainNameConfiguration),
      }),
      MutualTlsAuthentication: D.m({
        wire: "mutualTlsAuthentication",
        shape: o_MutualTlsAuthentication,
      }),
      RoutingMode: D.m({ wire: "routingMode" }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/apis/{ApiId}/integrations",
    input: {
      ApiId: 0,
      ConnectionId: D.m({ wire: "connectionId" }),
      ConnectionType: D.m({ wire: "connectionType" }),
      ContentHandlingStrategy: D.m({ wire: "contentHandlingStrategy" }),
      CredentialsArn: D.m({ wire: "credentialsArn" }),
      Description: D.m({ wire: "description" }),
      IntegrationMethod: D.m({ wire: "integrationMethod" }),
      IntegrationSubtype: D.m({ wire: "integrationSubtype" }),
      IntegrationType: D.m({ wire: "integrationType" }),
      IntegrationUri: D.m({ wire: "integrationUri" }),
      PassthroughBehavior: D.m({ wire: "passthroughBehavior" }),
      PayloadFormatVersion: D.m({ wire: "payloadFormatVersion" }),
      RequestParameters: D.m({ wire: "requestParameters" }),
      RequestTemplates: D.m({ wire: "requestTemplates" }),
      ResponseParameters: D.m({ wire: "responseParameters" }),
      TemplateSelectionExpression: D.m({ wire: "templateSelectionExpression" }),
      TimeoutInMillis: D.m({ wire: "timeoutInMillis" }),
      TlsConfig: D.m({ wire: "tlsConfig", shape: i_TlsConfigInput }),
    },
    output: {
      ApiGatewayManaged: D.m({ wire: "apiGatewayManaged" }),
      ConnectionId: D.m({ wire: "connectionId" }),
      ConnectionType: D.m({ wire: "connectionType" }),
      ContentHandlingStrategy: D.m({ wire: "contentHandlingStrategy" }),
      CredentialsArn: D.m({ wire: "credentialsArn" }),
      Description: D.m({ wire: "description" }),
      IntegrationId: D.m({ wire: "integrationId" }),
      IntegrationMethod: D.m({ wire: "integrationMethod" }),
      IntegrationResponseSelectionExpression: D.m({
        wire: "integrationResponseSelectionExpression",
      }),
      IntegrationSubtype: D.m({ wire: "integrationSubtype" }),
      IntegrationType: D.m({ wire: "integrationType" }),
      IntegrationUri: D.m({ wire: "integrationUri" }),
      PassthroughBehavior: D.m({ wire: "passthroughBehavior" }),
      PayloadFormatVersion: D.m({ wire: "payloadFormatVersion" }),
      RequestParameters: D.m({ wire: "requestParameters" }),
      RequestTemplates: D.m({ wire: "requestTemplates" }),
      ResponseParameters: D.m({ wire: "responseParameters" }),
      TemplateSelectionExpression: D.m({ wire: "templateSelectionExpression" }),
      TimeoutInMillis: D.m({ wire: "timeoutInMillis" }),
      TlsConfig: D.m({ wire: "tlsConfig", shape: o_TlsConfig }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntegration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/apis/{ApiId}/integrations/{IntegrationId}/integrationresponses",
    input: {
      ApiId: 0,
      ContentHandlingStrategy: D.m({ wire: "contentHandlingStrategy" }),
      IntegrationId: 0,
      IntegrationResponseKey: D.m({ wire: "integrationResponseKey" }),
      ResponseParameters: D.m({ wire: "responseParameters" }),
      ResponseTemplates: D.m({ wire: "responseTemplates" }),
      TemplateSelectionExpression: D.m({ wire: "templateSelectionExpression" }),
    },
    output: {
      ContentHandlingStrategy: D.m({ wire: "contentHandlingStrategy" }),
      IntegrationResponseId: D.m({ wire: "integrationResponseId" }),
      IntegrationResponseKey: D.m({ wire: "integrationResponseKey" }),
      ResponseParameters: D.m({ wire: "responseParameters" }),
      ResponseTemplates: D.m({ wire: "responseTemplates" }),
      TemplateSelectionExpression: D.m({ wire: "templateSelectionExpression" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntegrationResponse",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/apis/{ApiId}/models",
    input: {
      ApiId: 0,
      ContentType: D.m({ wire: "contentType" }),
      Description: D.m({ wire: "description" }),
      Name: D.m({ wire: "name" }),
      Schema: D.m({ wire: "schema" }),
    },
    output: {
      ContentType: D.m({ wire: "contentType" }),
      Description: D.m({ wire: "description" }),
      ModelId: D.m({ wire: "modelId" }),
      Name: D.m({ wire: "name" }),
      Schema: D.m({ wire: "schema" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/portals",
    input: {
      Authorization: D.m({ wire: "authorization", shape: i_Authorization }),
      EndpointConfiguration: D.m({
        wire: "endpointConfiguration",
        shape: i_EndpointConfigurationRequest,
      }),
      IncludedPortalProductArns: D.m({ wire: "includedPortalProductArns" }),
      LogoUri: D.m({ wire: "logoUri" }),
      PortalContent: D.m({ wire: "portalContent", shape: i_PortalContent }),
      RumAppMonitorName: D.m({ wire: "rumAppMonitorName" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      Authorization: D.m({ wire: "authorization", shape: o_Authorization }),
      EndpointConfiguration: D.m({
        wire: "endpointConfiguration",
        shape: o_EndpointConfigurationResponse,
      }),
      IncludedPortalProductArns: D.m({ wire: "includedPortalProductArns" }),
      LastModified: D.m({ wire: "lastModified", shape: D.ts }),
      LastPublished: D.m({ wire: "lastPublished", shape: D.ts }),
      LastPublishedDescription: D.m({ wire: "lastPublishedDescription" }),
      PortalArn: D.m({ wire: "portalArn" }),
      PortalContent: D.m({ wire: "portalContent", shape: o_PortalContent }),
      PortalId: D.m({ wire: "portalId" }),
      PublishStatus: D.m({ wire: "publishStatus" }),
      RumAppMonitorName: D.m({ wire: "rumAppMonitorName" }),
      StatusException: D.m({
        wire: "statusException",
        shape: o_StatusException,
      }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePortal",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/portalproducts",
    input: {
      Description: D.m({ wire: "description" }),
      DisplayName: D.m({ wire: "displayName" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      Description: D.m({ wire: "description" }),
      DisplayName: D.m({ wire: "displayName" }),
      DisplayOrder: D.m({ wire: "displayOrder", shape: o_DisplayOrder }),
      LastModified: D.m({ wire: "lastModified", shape: D.ts }),
      PortalProductArn: D.m({ wire: "portalProductArn" }),
      PortalProductId: D.m({ wire: "portalProductId" }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePortalProduct",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/portalproducts/{PortalProductId}/productpages",
    input: {
      DisplayContent: D.m({ wire: "displayContent", shape: i_DisplayContent }),
      PortalProductId: 0,
    },
    output: {
      DisplayContent: D.m({ wire: "displayContent", shape: o_DisplayContent }),
      LastModified: D.m({ wire: "lastModified", shape: D.ts }),
      ProductPageArn: D.m({ wire: "productPageArn" }),
      ProductPageId: D.m({ wire: "productPageId" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProductPage",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/portalproducts/{PortalProductId}/productrestendpointpages",
    input: {
      DisplayContent: D.m({
        wire: "displayContent",
        shape: i_EndpointDisplayContent,
      }),
      PortalProductId: 0,
      RestEndpointIdentifier: D.m({
        wire: "restEndpointIdentifier",
        shape: {
          IdentifierParts: D.m({
            wire: "identifierParts",
            shape: {
              Method: D.m({ wire: "method" }),
              Path: D.m({ wire: "path" }),
              RestApiId: D.m({ wire: "restApiId" }),
              Stage: D.m({ wire: "stage" }),
            },
          }),
        },
      }),
      TryItState: D.m({ wire: "tryItState" }),
    },
    output: {
      DisplayContent: D.m({
        wire: "displayContent",
        shape: o_EndpointDisplayContentResponse,
      }),
      LastModified: D.m({ wire: "lastModified", shape: D.ts }),
      ProductRestEndpointPageArn: D.m({ wire: "productRestEndpointPageArn" }),
      ProductRestEndpointPageId: D.m({ wire: "productRestEndpointPageId" }),
      RestEndpointIdentifier: D.m({
        wire: "restEndpointIdentifier",
        shape: o_RestEndpointIdentifier,
      }),
      Status: D.m({ wire: "status" }),
      StatusException: D.m({
        wire: "statusException",
        shape: o_StatusException,
      }),
      TryItState: D.m({ wire: "tryItState" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProductRestEndpointPage",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/apis/{ApiId}/routes",
    input: {
      ApiId: 0,
      ApiKeyRequired: D.m({ wire: "apiKeyRequired" }),
      AuthorizationScopes: D.m({ wire: "authorizationScopes" }),
      AuthorizationType: D.m({ wire: "authorizationType" }),
      AuthorizerId: D.m({ wire: "authorizerId" }),
      ModelSelectionExpression: D.m({ wire: "modelSelectionExpression" }),
      OperationName: D.m({ wire: "operationName" }),
      RequestModels: D.m({ wire: "requestModels" }),
      RequestParameters: D.m({
        wire: "requestParameters",
        shape: D.map(i_ParameterConstraints),
      }),
      RouteKey: D.m({ wire: "routeKey" }),
      RouteResponseSelectionExpression: D.m({
        wire: "routeResponseSelectionExpression",
      }),
      Target: D.m({ wire: "target" }),
    },
    output: {
      ApiGatewayManaged: D.m({ wire: "apiGatewayManaged" }),
      ApiKeyRequired: D.m({ wire: "apiKeyRequired" }),
      AuthorizationScopes: D.m({ wire: "authorizationScopes" }),
      AuthorizationType: D.m({ wire: "authorizationType" }),
      AuthorizerId: D.m({ wire: "authorizerId" }),
      ModelSelectionExpression: D.m({ wire: "modelSelectionExpression" }),
      OperationName: D.m({ wire: "operationName" }),
      RequestModels: D.m({ wire: "requestModels" }),
      RequestParameters: D.m({
        wire: "requestParameters",
        shape: D.map(o_ParameterConstraints),
      }),
      RouteId: D.m({ wire: "routeId" }),
      RouteKey: D.m({ wire: "routeKey" }),
      RouteResponseSelectionExpression: D.m({
        wire: "routeResponseSelectionExpression",
      }),
      Target: D.m({ wire: "target" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRoute",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/apis/{ApiId}/routes/{RouteId}/routeresponses",
    input: {
      ApiId: 0,
      ModelSelectionExpression: D.m({ wire: "modelSelectionExpression" }),
      ResponseModels: D.m({ wire: "responseModels" }),
      ResponseParameters: D.m({
        wire: "responseParameters",
        shape: D.map(i_ParameterConstraints),
      }),
      RouteId: 0,
      RouteResponseKey: D.m({ wire: "routeResponseKey" }),
    },
    output: {
      ModelSelectionExpression: D.m({ wire: "modelSelectionExpression" }),
      ResponseModels: D.m({ wire: "responseModels" }),
      ResponseParameters: D.m({
        wire: "responseParameters",
        shape: D.map(o_ParameterConstraints),
      }),
      RouteResponseId: D.m({ wire: "routeResponseId" }),
      RouteResponseKey: D.m({ wire: "routeResponseKey" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRouteResponse",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/domainnames/{DomainName}/routingrules",
    input: {
      Actions: D.m({ wire: "actions", shape: D.list(i_RoutingRuleAction) }),
      Conditions: D.m({
        wire: "conditions",
        shape: D.list(i_RoutingRuleCondition),
      }),
      DomainName: 0,
      DomainNameId: D.m({ query: "domainNameId" }),
      Priority: D.m({ wire: "priority" }),
    },
    output: {
      Actions: D.m({ wire: "actions", shape: D.list(o_RoutingRuleAction) }),
      Conditions: D.m({
        wire: "conditions",
        shape: D.list(o_RoutingRuleCondition),
      }),
      Priority: D.m({ wire: "priority" }),
      RoutingRuleArn: D.m({ wire: "routingRuleArn" }),
      RoutingRuleId: D.m({ wire: "routingRuleId" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRoutingRule",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/apis/{ApiId}/stages",
    input: {
      AccessLogSettings: D.m({
        wire: "accessLogSettings",
        shape: i_AccessLogSettings,
      }),
      ApiId: 0,
      AutoDeploy: D.m({ wire: "autoDeploy" }),
      ClientCertificateId: D.m({ wire: "clientCertificateId" }),
      DefaultRouteSettings: D.m({
        wire: "defaultRouteSettings",
        shape: i_RouteSettings,
      }),
      DeploymentId: D.m({ wire: "deploymentId" }),
      Description: D.m({ wire: "description" }),
      RouteSettings: D.m({
        wire: "routeSettings",
        shape: D.map(i_RouteSettings),
      }),
      StageName: D.m({ wire: "stageName" }),
      StageVariables: D.m({ wire: "stageVariables" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      AccessLogSettings: D.m({
        wire: "accessLogSettings",
        shape: o_AccessLogSettings,
      }),
      ApiGatewayManaged: D.m({ wire: "apiGatewayManaged" }),
      AutoDeploy: D.m({ wire: "autoDeploy" }),
      ClientCertificateId: D.m({ wire: "clientCertificateId" }),
      CreatedDate: D.m({ wire: "createdDate", shape: D.ts }),
      DefaultRouteSettings: D.m({
        wire: "defaultRouteSettings",
        shape: o_RouteSettings,
      }),
      DeploymentId: D.m({ wire: "deploymentId" }),
      Description: D.m({ wire: "description" }),
      LastDeploymentStatusMessage: D.m({ wire: "lastDeploymentStatusMessage" }),
      LastUpdatedDate: D.m({ wire: "lastUpdatedDate", shape: D.ts }),
      RouteSettings: D.m({
        wire: "routeSettings",
        shape: D.map(o_RouteSettings),
      }),
      StageName: D.m({ wire: "stageName" }),
      StageVariables: D.m({ wire: "stageVariables" }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStage",
})) as any;

export type CreateVpcLinkError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a VPC link.
 */
export const createVpcLink: API.OperationMethod<
  CreateVpcLinkRequest,
  CreateVpcLinkResponse,
  CreateVpcLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/vpclinks",
    input: {
      Name: D.m({ wire: "name" }),
      SecurityGroupIds: D.m({ wire: "securityGroupIds" }),
      SubnetIds: D.m({ wire: "subnetIds" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      CreatedDate: D.m({ wire: "createdDate", shape: D.ts }),
      Name: D.m({ wire: "name" }),
      SecurityGroupIds: D.m({ wire: "securityGroupIds" }),
      SubnetIds: D.m({ wire: "subnetIds" }),
      Tags: D.m({ wire: "tags" }),
      VpcLinkId: D.m({ wire: "vpcLinkId" }),
      VpcLinkStatus: D.m({ wire: "vpcLinkStatus" }),
      VpcLinkStatusMessage: D.m({ wire: "vpcLinkStatusMessage" }),
      VpcLinkVersion: D.m({ wire: "vpcLinkVersion" }),
    },
    body: true,
  },
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcLink",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v2/apis/{ApiId}/stages/{StageName}/accesslogsettings",
    input: { ApiId: 0, StageName: 0 },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessLogSettings",
})) as any;

export type DeleteApiError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an Api resource.
 */
export const deleteApi: API.OperationMethod<
  DeleteApiRequest,
  DeleteApiResponse,
  DeleteApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/apis/{ApiId}",
    input: { ApiId: 0 },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApi",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v2/domainnames/{DomainName}/apimappings/{ApiMappingId}",
    input: { ApiMappingId: 0, DomainName: 0 },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApiMapping",
})) as any;

export type DeleteAuthorizerError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an Authorizer.
 */
export const deleteAuthorizer: API.OperationMethod<
  DeleteAuthorizerRequest,
  DeleteAuthorizerResponse,
  DeleteAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/apis/{ApiId}/authorizers/{AuthorizerId}",
    input: { ApiId: 0, AuthorizerId: 0 },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAuthorizer",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v2/apis/{ApiId}/cors",
    input: { ApiId: 0 },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCorsConfiguration",
})) as any;

export type DeleteDeploymentError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a Deployment.
 */
export const deleteDeployment: API.OperationMethod<
  DeleteDeploymentRequest,
  DeleteDeploymentResponse,
  DeleteDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/apis/{ApiId}/deployments/{DeploymentId}",
    input: { ApiId: 0, DeploymentId: 0 },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeployment",
})) as any;

export type DeleteDomainNameError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a domain name.
 */
export const deleteDomainName: API.OperationMethod<
  DeleteDomainNameRequest,
  DeleteDomainNameResponse,
  DeleteDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/domainnames/{DomainName}",
    input: { DomainName: 0 },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainName",
})) as any;

export type DeleteIntegrationError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an Integration.
 */
export const deleteIntegration: API.OperationMethod<
  DeleteIntegrationRequest,
  DeleteIntegrationResponse,
  DeleteIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/apis/{ApiId}/integrations/{IntegrationId}",
    input: { ApiId: 0, IntegrationId: 0 },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v2/apis/{ApiId}/integrations/{IntegrationId}/integrationresponses/{IntegrationResponseId}",
    input: { ApiId: 0, IntegrationId: 0, IntegrationResponseId: 0 },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegrationResponse",
})) as any;

export type DeleteModelError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a Model.
 */
export const deleteModel: API.OperationMethod<
  DeleteModelRequest,
  DeleteModelResponse,
  DeleteModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/apis/{ApiId}/models/{ModelId}",
    input: { ApiId: 0, ModelId: 0 },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v2/portals/{PortalId}",
    input: { PortalId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePortal",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v2/portalproducts/{PortalProductId}",
    input: { PortalProductId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePortalProduct",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v2/portalproducts/{PortalProductId}/sharingpolicy",
    input: { PortalProductId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePortalProductSharingPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v2/portalproducts/{PortalProductId}/productpages/{ProductPageId}",
    input: { PortalProductId: 0, ProductPageId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProductPage",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v2/portalproducts/{PortalProductId}/productrestendpointpages/{ProductRestEndpointPageId}",
    input: { PortalProductId: 0, ProductRestEndpointPageId: 0 },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProductRestEndpointPage",
})) as any;

export type DeleteRouteError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a Route.
 */
export const deleteRoute: API.OperationMethod<
  DeleteRouteRequest,
  DeleteRouteResponse,
  DeleteRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/apis/{ApiId}/routes/{RouteId}",
    input: { ApiId: 0, RouteId: 0 },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRoute",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v2/apis/{ApiId}/routes/{RouteId}/requestparameters/{RequestParameterKey}",
    input: { ApiId: 0, RequestParameterKey: 0, RouteId: 0 },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRouteRequestParameter",
})) as any;

export type DeleteRouteResponseError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a RouteResponse.
 */
export const deleteRouteResponse: API.OperationMethod<
  DeleteRouteResponseRequest,
  DeleteRouteResponseResponse,
  DeleteRouteResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/apis/{ApiId}/routes/{RouteId}/routeresponses/{RouteResponseId}",
    input: { ApiId: 0, RouteId: 0, RouteResponseId: 0 },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRouteResponse",
})) as any;

export type DeleteRouteSettingsError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the RouteSettings for a stage.
 */
export const deleteRouteSettings: API.OperationMethod<
  DeleteRouteSettingsRequest,
  DeleteRouteSettingsResponse,
  DeleteRouteSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/apis/{ApiId}/stages/{StageName}/routesettings/{RouteKey}",
    input: { ApiId: 0, RouteKey: 0, StageName: 0 },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRouteSettings",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v2/domainnames/{DomainName}/routingrules/{RoutingRuleId}",
    input: {
      DomainName: 0,
      DomainNameId: D.m({ query: "domainNameId" }),
      RoutingRuleId: 0,
    },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRoutingRule",
})) as any;

export type DeleteStageError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a Stage.
 */
export const deleteStage: API.OperationMethod<
  DeleteStageRequest,
  DeleteStageResponse,
  DeleteStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/apis/{ApiId}/stages/{StageName}",
    input: { ApiId: 0, StageName: 0 },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStage",
})) as any;

export type DeleteVpcLinkError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a VPC link.
 */
export const deleteVpcLink: API.OperationMethod<
  DeleteVpcLinkRequest,
  DeleteVpcLinkResponse,
  DeleteVpcLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/vpclinks/{VpcLinkId}",
    input: { VpcLinkId: 0 },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcLink",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v2/portals/{PortalId}/publish",
    input: { PortalId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{ApiId}/exports/{Specification}",
    input: {
      ApiId: 0,
      ExportVersion: D.m({ query: "exportVersion" }),
      IncludeExtensions: D.m({ query: "includeExtensions" }),
      OutputType: D.m({ query: "outputType" }),
      Specification: 0,
      StageName: D.m({ query: "stageName" }),
    },
    output: { body: D.m({ payload: true, shape: D.stream }) },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportApi",
})) as any;

export type GetApiError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets an Api resource.
 */
export const getApi: API.OperationMethod<
  GetApiRequest,
  GetApiResponse,
  GetApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{ApiId}",
    input: { ApiId: 0 },
    output: {
      ApiEndpoint: D.m({ wire: "apiEndpoint" }),
      ApiGatewayManaged: D.m({ wire: "apiGatewayManaged" }),
      ApiId: D.m({ wire: "apiId" }),
      ApiKeySelectionExpression: D.m({ wire: "apiKeySelectionExpression" }),
      CorsConfiguration: D.m({ wire: "corsConfiguration", shape: o_Cors }),
      CreatedDate: D.m({ wire: "createdDate", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      DisableSchemaValidation: D.m({ wire: "disableSchemaValidation" }),
      DisableExecuteApiEndpoint: D.m({ wire: "disableExecuteApiEndpoint" }),
      ImportInfo: D.m({ wire: "importInfo" }),
      IpAddressType: D.m({ wire: "ipAddressType" }),
      Name: D.m({ wire: "name" }),
      ProtocolType: D.m({ wire: "protocolType" }),
      RouteSelectionExpression: D.m({ wire: "routeSelectionExpression" }),
      Tags: D.m({ wire: "tags" }),
      Version: D.m({ wire: "version" }),
      Warnings: D.m({ wire: "warnings" }),
    },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApi",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/domainnames/{DomainName}/apimappings/{ApiMappingId}",
    input: { ApiMappingId: 0, DomainName: 0 },
    output: {
      ApiId: D.m({ wire: "apiId" }),
      ApiMappingId: D.m({ wire: "apiMappingId" }),
      ApiMappingKey: D.m({ wire: "apiMappingKey" }),
      Stage: D.m({ wire: "stage" }),
    },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApiMapping",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/domainnames/{DomainName}/apimappings",
    input: {
      DomainName: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Items: D.m({
        wire: "items",
        shape: D.list({
          ApiId: D.m({ wire: "apiId" }),
          ApiMappingId: D.m({ wire: "apiMappingId" }),
          ApiMappingKey: D.m({ wire: "apiMappingKey" }),
          Stage: D.m({ wire: "stage" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApiMappings",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/apis",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Items: D.m({
        wire: "items",
        shape: D.list({
          ApiEndpoint: D.m({ wire: "apiEndpoint" }),
          ApiGatewayManaged: D.m({ wire: "apiGatewayManaged" }),
          ApiId: D.m({ wire: "apiId" }),
          ApiKeySelectionExpression: D.m({ wire: "apiKeySelectionExpression" }),
          CorsConfiguration: D.m({ wire: "corsConfiguration", shape: o_Cors }),
          CreatedDate: D.m({ wire: "createdDate", shape: D.ts }),
          Description: D.m({ wire: "description" }),
          DisableSchemaValidation: D.m({ wire: "disableSchemaValidation" }),
          DisableExecuteApiEndpoint: D.m({ wire: "disableExecuteApiEndpoint" }),
          ImportInfo: D.m({ wire: "importInfo" }),
          IpAddressType: D.m({ wire: "ipAddressType" }),
          Name: D.m({ wire: "name" }),
          ProtocolType: D.m({ wire: "protocolType" }),
          RouteSelectionExpression: D.m({ wire: "routeSelectionExpression" }),
          Tags: D.m({ wire: "tags" }),
          Version: D.m({ wire: "version" }),
          Warnings: D.m({ wire: "warnings" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApis",
})) as any;

export type GetAuthorizerError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets an Authorizer.
 */
export const getAuthorizer: API.OperationMethod<
  GetAuthorizerRequest,
  GetAuthorizerResponse,
  GetAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{ApiId}/authorizers/{AuthorizerId}",
    input: { ApiId: 0, AuthorizerId: 0 },
    output: {
      AuthorizerCredentialsArn: D.m({ wire: "authorizerCredentialsArn" }),
      AuthorizerId: D.m({ wire: "authorizerId" }),
      AuthorizerPayloadFormatVersion: D.m({
        wire: "authorizerPayloadFormatVersion",
      }),
      AuthorizerResultTtlInSeconds: D.m({
        wire: "authorizerResultTtlInSeconds",
      }),
      AuthorizerType: D.m({ wire: "authorizerType" }),
      AuthorizerUri: D.m({ wire: "authorizerUri" }),
      EnableSimpleResponses: D.m({ wire: "enableSimpleResponses" }),
      IdentitySource: D.m({ wire: "identitySource" }),
      IdentityValidationExpression: D.m({
        wire: "identityValidationExpression",
      }),
      JwtConfiguration: D.m({
        wire: "jwtConfiguration",
        shape: o_JWTConfiguration,
      }),
      Name: D.m({ wire: "name" }),
    },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAuthorizer",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{ApiId}/authorizers",
    input: {
      ApiId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Items: D.m({
        wire: "items",
        shape: D.list({
          AuthorizerCredentialsArn: D.m({ wire: "authorizerCredentialsArn" }),
          AuthorizerId: D.m({ wire: "authorizerId" }),
          AuthorizerPayloadFormatVersion: D.m({
            wire: "authorizerPayloadFormatVersion",
          }),
          AuthorizerResultTtlInSeconds: D.m({
            wire: "authorizerResultTtlInSeconds",
          }),
          AuthorizerType: D.m({ wire: "authorizerType" }),
          AuthorizerUri: D.m({ wire: "authorizerUri" }),
          EnableSimpleResponses: D.m({ wire: "enableSimpleResponses" }),
          IdentitySource: D.m({ wire: "identitySource" }),
          IdentityValidationExpression: D.m({
            wire: "identityValidationExpression",
          }),
          JwtConfiguration: D.m({
            wire: "jwtConfiguration",
            shape: o_JWTConfiguration,
          }),
          Name: D.m({ wire: "name" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAuthorizers",
})) as any;

export type GetDeploymentError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a Deployment.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentRequest,
  GetDeploymentResponse,
  GetDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{ApiId}/deployments/{DeploymentId}",
    input: { ApiId: 0, DeploymentId: 0 },
    output: {
      AutoDeployed: D.m({ wire: "autoDeployed" }),
      CreatedDate: D.m({ wire: "createdDate", shape: D.ts }),
      DeploymentId: D.m({ wire: "deploymentId" }),
      DeploymentStatus: D.m({ wire: "deploymentStatus" }),
      DeploymentStatusMessage: D.m({ wire: "deploymentStatusMessage" }),
      Description: D.m({ wire: "description" }),
    },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{ApiId}/deployments",
    input: {
      ApiId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Items: D.m({
        wire: "items",
        shape: D.list({
          AutoDeployed: D.m({ wire: "autoDeployed" }),
          CreatedDate: D.m({ wire: "createdDate", shape: D.ts }),
          DeploymentId: D.m({ wire: "deploymentId" }),
          DeploymentStatus: D.m({ wire: "deploymentStatus" }),
          DeploymentStatusMessage: D.m({ wire: "deploymentStatusMessage" }),
          Description: D.m({ wire: "description" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployments",
})) as any;

export type GetDomainNameError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a domain name.
 */
export const getDomainName: API.OperationMethod<
  GetDomainNameRequest,
  GetDomainNameResponse,
  GetDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/domainnames/{DomainName}",
    input: { DomainName: 0 },
    output: {
      ApiMappingSelectionExpression: D.m({
        wire: "apiMappingSelectionExpression",
      }),
      DomainName: D.m({ wire: "domainName" }),
      DomainNameArn: D.m({ wire: "domainNameArn" }),
      DomainNameConfigurations: D.m({
        wire: "domainNameConfigurations",
        shape: D.list(o_DomainNameConfiguration),
      }),
      MutualTlsAuthentication: D.m({
        wire: "mutualTlsAuthentication",
        shape: o_MutualTlsAuthentication,
      }),
      RoutingMode: D.m({ wire: "routingMode" }),
      Tags: D.m({ wire: "tags" }),
    },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainName",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/domainnames",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Items: D.m({
        wire: "items",
        shape: D.list({
          ApiMappingSelectionExpression: D.m({
            wire: "apiMappingSelectionExpression",
          }),
          DomainName: D.m({ wire: "domainName" }),
          DomainNameArn: D.m({ wire: "domainNameArn" }),
          DomainNameConfigurations: D.m({
            wire: "domainNameConfigurations",
            shape: D.list(o_DomainNameConfiguration),
          }),
          MutualTlsAuthentication: D.m({
            wire: "mutualTlsAuthentication",
            shape: o_MutualTlsAuthentication,
          }),
          RoutingMode: D.m({ wire: "routingMode" }),
          Tags: D.m({ wire: "tags" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainNames",
})) as any;

export type GetIntegrationError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets an Integration.
 */
export const getIntegration: API.OperationMethod<
  GetIntegrationRequest,
  GetIntegrationResult,
  GetIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{ApiId}/integrations/{IntegrationId}",
    input: { ApiId: 0, IntegrationId: 0 },
    output: {
      ApiGatewayManaged: D.m({ wire: "apiGatewayManaged" }),
      ConnectionId: D.m({ wire: "connectionId" }),
      ConnectionType: D.m({ wire: "connectionType" }),
      ContentHandlingStrategy: D.m({ wire: "contentHandlingStrategy" }),
      CredentialsArn: D.m({ wire: "credentialsArn" }),
      Description: D.m({ wire: "description" }),
      IntegrationId: D.m({ wire: "integrationId" }),
      IntegrationMethod: D.m({ wire: "integrationMethod" }),
      IntegrationResponseSelectionExpression: D.m({
        wire: "integrationResponseSelectionExpression",
      }),
      IntegrationSubtype: D.m({ wire: "integrationSubtype" }),
      IntegrationType: D.m({ wire: "integrationType" }),
      IntegrationUri: D.m({ wire: "integrationUri" }),
      PassthroughBehavior: D.m({ wire: "passthroughBehavior" }),
      PayloadFormatVersion: D.m({ wire: "payloadFormatVersion" }),
      RequestParameters: D.m({ wire: "requestParameters" }),
      RequestTemplates: D.m({ wire: "requestTemplates" }),
      ResponseParameters: D.m({ wire: "responseParameters" }),
      TemplateSelectionExpression: D.m({ wire: "templateSelectionExpression" }),
      TimeoutInMillis: D.m({ wire: "timeoutInMillis" }),
      TlsConfig: D.m({ wire: "tlsConfig", shape: o_TlsConfig }),
    },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{ApiId}/integrations/{IntegrationId}/integrationresponses/{IntegrationResponseId}",
    input: { ApiId: 0, IntegrationId: 0, IntegrationResponseId: 0 },
    output: {
      ContentHandlingStrategy: D.m({ wire: "contentHandlingStrategy" }),
      IntegrationResponseId: D.m({ wire: "integrationResponseId" }),
      IntegrationResponseKey: D.m({ wire: "integrationResponseKey" }),
      ResponseParameters: D.m({ wire: "responseParameters" }),
      ResponseTemplates: D.m({ wire: "responseTemplates" }),
      TemplateSelectionExpression: D.m({ wire: "templateSelectionExpression" }),
    },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegrationResponse",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{ApiId}/integrations/{IntegrationId}/integrationresponses",
    input: {
      ApiId: 0,
      IntegrationId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Items: D.m({
        wire: "items",
        shape: D.list({
          ContentHandlingStrategy: D.m({ wire: "contentHandlingStrategy" }),
          IntegrationResponseId: D.m({ wire: "integrationResponseId" }),
          IntegrationResponseKey: D.m({ wire: "integrationResponseKey" }),
          ResponseParameters: D.m({ wire: "responseParameters" }),
          ResponseTemplates: D.m({ wire: "responseTemplates" }),
          TemplateSelectionExpression: D.m({
            wire: "templateSelectionExpression",
          }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegrationResponses",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{ApiId}/integrations",
    input: {
      ApiId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Items: D.m({
        wire: "items",
        shape: D.list({
          ApiGatewayManaged: D.m({ wire: "apiGatewayManaged" }),
          ConnectionId: D.m({ wire: "connectionId" }),
          ConnectionType: D.m({ wire: "connectionType" }),
          ContentHandlingStrategy: D.m({ wire: "contentHandlingStrategy" }),
          CredentialsArn: D.m({ wire: "credentialsArn" }),
          Description: D.m({ wire: "description" }),
          IntegrationId: D.m({ wire: "integrationId" }),
          IntegrationMethod: D.m({ wire: "integrationMethod" }),
          IntegrationResponseSelectionExpression: D.m({
            wire: "integrationResponseSelectionExpression",
          }),
          IntegrationSubtype: D.m({ wire: "integrationSubtype" }),
          IntegrationType: D.m({ wire: "integrationType" }),
          IntegrationUri: D.m({ wire: "integrationUri" }),
          PassthroughBehavior: D.m({ wire: "passthroughBehavior" }),
          PayloadFormatVersion: D.m({ wire: "payloadFormatVersion" }),
          RequestParameters: D.m({ wire: "requestParameters" }),
          RequestTemplates: D.m({ wire: "requestTemplates" }),
          ResponseParameters: D.m({ wire: "responseParameters" }),
          TemplateSelectionExpression: D.m({
            wire: "templateSelectionExpression",
          }),
          TimeoutInMillis: D.m({ wire: "timeoutInMillis" }),
          TlsConfig: D.m({ wire: "tlsConfig", shape: o_TlsConfig }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegrations",
})) as any;

export type GetModelError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a Model.
 */
export const getModel: API.OperationMethod<
  GetModelRequest,
  GetModelResponse,
  GetModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{ApiId}/models/{ModelId}",
    input: { ApiId: 0, ModelId: 0 },
    output: {
      ContentType: D.m({ wire: "contentType" }),
      Description: D.m({ wire: "description" }),
      ModelId: D.m({ wire: "modelId" }),
      Name: D.m({ wire: "name" }),
      Schema: D.m({ wire: "schema" }),
    },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{ApiId}/models",
    input: {
      ApiId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Items: D.m({
        wire: "items",
        shape: D.list({
          ContentType: D.m({ wire: "contentType" }),
          Description: D.m({ wire: "description" }),
          ModelId: D.m({ wire: "modelId" }),
          Name: D.m({ wire: "name" }),
          Schema: D.m({ wire: "schema" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModels",
})) as any;

export type GetModelTemplateError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a model template.
 */
export const getModelTemplate: API.OperationMethod<
  GetModelTemplateRequest,
  GetModelTemplateResponse,
  GetModelTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{ApiId}/models/{ModelId}/template",
    input: { ApiId: 0, ModelId: 0 },
    output: { Value: D.m({ wire: "value" }) },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelTemplate",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/portals/{PortalId}",
    input: { PortalId: 0 },
    output: {
      Authorization: D.m({ wire: "authorization", shape: o_Authorization }),
      EndpointConfiguration: D.m({
        wire: "endpointConfiguration",
        shape: o_EndpointConfigurationResponse,
      }),
      IncludedPortalProductArns: D.m({ wire: "includedPortalProductArns" }),
      LastModified: D.m({ wire: "lastModified", shape: D.ts }),
      LastPublished: D.m({ wire: "lastPublished", shape: D.ts }),
      LastPublishedDescription: D.m({ wire: "lastPublishedDescription" }),
      PortalArn: D.m({ wire: "portalArn" }),
      PortalContent: D.m({ wire: "portalContent", shape: o_PortalContent }),
      PortalId: D.m({ wire: "portalId" }),
      Preview: D.m({ wire: "preview", shape: o_Preview }),
      PublishStatus: D.m({ wire: "publishStatus" }),
      RumAppMonitorName: D.m({ wire: "rumAppMonitorName" }),
      StatusException: D.m({
        wire: "statusException",
        shape: o_StatusException,
      }),
      Tags: D.m({ wire: "tags" }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPortal",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/portalproducts/{PortalProductId}",
    input: {
      PortalProductId: 0,
      ResourceOwnerAccountId: D.m({ query: "resourceOwnerAccountId" }),
    },
    output: {
      Description: D.m({ wire: "description" }),
      DisplayName: D.m({ wire: "displayName" }),
      DisplayOrder: D.m({ wire: "displayOrder", shape: o_DisplayOrder }),
      LastModified: D.m({ wire: "lastModified", shape: D.ts }),
      PortalProductArn: D.m({ wire: "portalProductArn" }),
      PortalProductId: D.m({ wire: "portalProductId" }),
      Tags: D.m({ wire: "tags" }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPortalProduct",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/portalproducts/{PortalProductId}/sharingpolicy",
    input: { PortalProductId: 0 },
    output: {
      PolicyDocument: D.m({ wire: "policyDocument" }),
      PortalProductId: D.m({ wire: "portalProductId" }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPortalProductSharingPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/portalproducts/{PortalProductId}/productpages/{ProductPageId}",
    input: {
      PortalProductId: 0,
      ProductPageId: 0,
      ResourceOwnerAccountId: D.m({ query: "resourceOwnerAccountId" }),
    },
    output: {
      DisplayContent: D.m({ wire: "displayContent", shape: o_DisplayContent }),
      LastModified: D.m({ wire: "lastModified", shape: D.ts }),
      ProductPageArn: D.m({ wire: "productPageArn" }),
      ProductPageId: D.m({ wire: "productPageId" }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProductPage",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/portalproducts/{PortalProductId}/productrestendpointpages/{ProductRestEndpointPageId}",
    input: {
      IncludeRawDisplayContent: D.m({ query: "includeRawDisplayContent" }),
      PortalProductId: 0,
      ProductRestEndpointPageId: 0,
      ResourceOwnerAccountId: D.m({ query: "resourceOwnerAccountId" }),
    },
    output: {
      DisplayContent: D.m({
        wire: "displayContent",
        shape: o_EndpointDisplayContentResponse,
      }),
      LastModified: D.m({ wire: "lastModified", shape: D.ts }),
      ProductRestEndpointPageArn: D.m({ wire: "productRestEndpointPageArn" }),
      ProductRestEndpointPageId: D.m({ wire: "productRestEndpointPageId" }),
      RawDisplayContent: D.m({ wire: "rawDisplayContent" }),
      RestEndpointIdentifier: D.m({
        wire: "restEndpointIdentifier",
        shape: o_RestEndpointIdentifier,
      }),
      Status: D.m({ wire: "status" }),
      StatusException: D.m({
        wire: "statusException",
        shape: o_StatusException,
      }),
      TryItState: D.m({ wire: "tryItState" }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProductRestEndpointPage",
})) as any;

export type GetRouteError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a Route.
 */
export const getRoute: API.OperationMethod<
  GetRouteRequest,
  GetRouteResult,
  GetRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{ApiId}/routes/{RouteId}",
    input: { ApiId: 0, RouteId: 0 },
    output: {
      ApiGatewayManaged: D.m({ wire: "apiGatewayManaged" }),
      ApiKeyRequired: D.m({ wire: "apiKeyRequired" }),
      AuthorizationScopes: D.m({ wire: "authorizationScopes" }),
      AuthorizationType: D.m({ wire: "authorizationType" }),
      AuthorizerId: D.m({ wire: "authorizerId" }),
      ModelSelectionExpression: D.m({ wire: "modelSelectionExpression" }),
      OperationName: D.m({ wire: "operationName" }),
      RequestModels: D.m({ wire: "requestModels" }),
      RequestParameters: D.m({
        wire: "requestParameters",
        shape: D.map(o_ParameterConstraints),
      }),
      RouteId: D.m({ wire: "routeId" }),
      RouteKey: D.m({ wire: "routeKey" }),
      RouteResponseSelectionExpression: D.m({
        wire: "routeResponseSelectionExpression",
      }),
      Target: D.m({ wire: "target" }),
    },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRoute",
})) as any;

export type GetRouteResponseError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a RouteResponse.
 */
export const getRouteResponse: API.OperationMethod<
  GetRouteResponseRequest,
  GetRouteResponseResponse,
  GetRouteResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{ApiId}/routes/{RouteId}/routeresponses/{RouteResponseId}",
    input: { ApiId: 0, RouteId: 0, RouteResponseId: 0 },
    output: {
      ModelSelectionExpression: D.m({ wire: "modelSelectionExpression" }),
      ResponseModels: D.m({ wire: "responseModels" }),
      ResponseParameters: D.m({
        wire: "responseParameters",
        shape: D.map(o_ParameterConstraints),
      }),
      RouteResponseId: D.m({ wire: "routeResponseId" }),
      RouteResponseKey: D.m({ wire: "routeResponseKey" }),
    },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRouteResponse",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{ApiId}/routes/{RouteId}/routeresponses",
    input: {
      ApiId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      RouteId: 0,
    },
    output: {
      Items: D.m({
        wire: "items",
        shape: D.list({
          ModelSelectionExpression: D.m({ wire: "modelSelectionExpression" }),
          ResponseModels: D.m({ wire: "responseModels" }),
          ResponseParameters: D.m({
            wire: "responseParameters",
            shape: D.map(o_ParameterConstraints),
          }),
          RouteResponseId: D.m({ wire: "routeResponseId" }),
          RouteResponseKey: D.m({ wire: "routeResponseKey" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRouteResponses",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{ApiId}/routes",
    input: {
      ApiId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Items: D.m({
        wire: "items",
        shape: D.list({
          ApiGatewayManaged: D.m({ wire: "apiGatewayManaged" }),
          ApiKeyRequired: D.m({ wire: "apiKeyRequired" }),
          AuthorizationScopes: D.m({ wire: "authorizationScopes" }),
          AuthorizationType: D.m({ wire: "authorizationType" }),
          AuthorizerId: D.m({ wire: "authorizerId" }),
          ModelSelectionExpression: D.m({ wire: "modelSelectionExpression" }),
          OperationName: D.m({ wire: "operationName" }),
          RequestModels: D.m({ wire: "requestModels" }),
          RequestParameters: D.m({
            wire: "requestParameters",
            shape: D.map(o_ParameterConstraints),
          }),
          RouteId: D.m({ wire: "routeId" }),
          RouteKey: D.m({ wire: "routeKey" }),
          RouteResponseSelectionExpression: D.m({
            wire: "routeResponseSelectionExpression",
          }),
          Target: D.m({ wire: "target" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRoutes",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/domainnames/{DomainName}/routingrules/{RoutingRuleId}",
    input: {
      DomainName: 0,
      DomainNameId: D.m({ query: "domainNameId" }),
      RoutingRuleId: 0,
    },
    output: {
      Actions: D.m({ wire: "actions", shape: D.list(o_RoutingRuleAction) }),
      Conditions: D.m({
        wire: "conditions",
        shape: D.list(o_RoutingRuleCondition),
      }),
      Priority: D.m({ wire: "priority" }),
      RoutingRuleArn: D.m({ wire: "routingRuleArn" }),
      RoutingRuleId: D.m({ wire: "routingRuleId" }),
    },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRoutingRule",
})) as any;

export type GetStageError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a Stage.
 */
export const getStage: API.OperationMethod<
  GetStageRequest,
  GetStageResponse,
  GetStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{ApiId}/stages/{StageName}",
    input: { ApiId: 0, StageName: 0 },
    output: {
      AccessLogSettings: D.m({
        wire: "accessLogSettings",
        shape: o_AccessLogSettings,
      }),
      ApiGatewayManaged: D.m({ wire: "apiGatewayManaged" }),
      AutoDeploy: D.m({ wire: "autoDeploy" }),
      ClientCertificateId: D.m({ wire: "clientCertificateId" }),
      CreatedDate: D.m({ wire: "createdDate", shape: D.ts }),
      DefaultRouteSettings: D.m({
        wire: "defaultRouteSettings",
        shape: o_RouteSettings,
      }),
      DeploymentId: D.m({ wire: "deploymentId" }),
      Description: D.m({ wire: "description" }),
      LastDeploymentStatusMessage: D.m({ wire: "lastDeploymentStatusMessage" }),
      LastUpdatedDate: D.m({ wire: "lastUpdatedDate", shape: D.ts }),
      RouteSettings: D.m({
        wire: "routeSettings",
        shape: D.map(o_RouteSettings),
      }),
      StageName: D.m({ wire: "stageName" }),
      StageVariables: D.m({ wire: "stageVariables" }),
      Tags: D.m({ wire: "tags" }),
    },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStage",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/apis/{ApiId}/stages",
    input: {
      ApiId: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Items: D.m({
        wire: "items",
        shape: D.list({
          AccessLogSettings: D.m({
            wire: "accessLogSettings",
            shape: o_AccessLogSettings,
          }),
          ApiGatewayManaged: D.m({ wire: "apiGatewayManaged" }),
          AutoDeploy: D.m({ wire: "autoDeploy" }),
          ClientCertificateId: D.m({ wire: "clientCertificateId" }),
          CreatedDate: D.m({ wire: "createdDate", shape: D.ts }),
          DefaultRouteSettings: D.m({
            wire: "defaultRouteSettings",
            shape: o_RouteSettings,
          }),
          DeploymentId: D.m({ wire: "deploymentId" }),
          Description: D.m({ wire: "description" }),
          LastDeploymentStatusMessage: D.m({
            wire: "lastDeploymentStatusMessage",
          }),
          LastUpdatedDate: D.m({ wire: "lastUpdatedDate", shape: D.ts }),
          RouteSettings: D.m({
            wire: "routeSettings",
            shape: D.map(o_RouteSettings),
          }),
          StageName: D.m({ wire: "stageName" }),
          StageVariables: D.m({ wire: "stageVariables" }),
          Tags: D.m({ wire: "tags" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStages",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/tags/{ResourceArn}",
    input: { ResourceArn: 0 },
    output: { Tags: D.m({ wire: "tags" }) },
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTags",
})) as any;

export type GetVpcLinkError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a VPC link.
 */
export const getVpcLink: API.OperationMethod<
  GetVpcLinkRequest,
  GetVpcLinkResponse,
  GetVpcLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/vpclinks/{VpcLinkId}",
    input: { VpcLinkId: 0 },
    output: {
      CreatedDate: D.m({ wire: "createdDate", shape: D.ts }),
      Name: D.m({ wire: "name" }),
      SecurityGroupIds: D.m({ wire: "securityGroupIds" }),
      SubnetIds: D.m({ wire: "subnetIds" }),
      Tags: D.m({ wire: "tags" }),
      VpcLinkId: D.m({ wire: "vpcLinkId" }),
      VpcLinkStatus: D.m({ wire: "vpcLinkStatus" }),
      VpcLinkStatusMessage: D.m({ wire: "vpcLinkStatusMessage" }),
      VpcLinkVersion: D.m({ wire: "vpcLinkVersion" }),
    },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVpcLink",
})) as any;

export type GetVpcLinksError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a collection of VPC links.
 */
export const getVpcLinks: API.OperationMethod<
  GetVpcLinksRequest,
  GetVpcLinksResponse,
  GetVpcLinksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v2/vpclinks",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Items: D.m({
        wire: "items",
        shape: D.list({
          CreatedDate: D.m({ wire: "createdDate", shape: D.ts }),
          Name: D.m({ wire: "name" }),
          SecurityGroupIds: D.m({ wire: "securityGroupIds" }),
          SubnetIds: D.m({ wire: "subnetIds" }),
          Tags: D.m({ wire: "tags" }),
          VpcLinkId: D.m({ wire: "vpcLinkId" }),
          VpcLinkStatus: D.m({ wire: "vpcLinkStatus" }),
          VpcLinkStatusMessage: D.m({ wire: "vpcLinkStatusMessage" }),
          VpcLinkVersion: D.m({ wire: "vpcLinkVersion" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVpcLinks",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v2/apis",
    input: {
      Basepath: D.m({ query: "basepath" }),
      Body: D.m({ wire: "body" }),
      FailOnWarnings: D.m({ query: "failOnWarnings" }),
    },
    output: {
      ApiEndpoint: D.m({ wire: "apiEndpoint" }),
      ApiGatewayManaged: D.m({ wire: "apiGatewayManaged" }),
      ApiId: D.m({ wire: "apiId" }),
      ApiKeySelectionExpression: D.m({ wire: "apiKeySelectionExpression" }),
      CorsConfiguration: D.m({ wire: "corsConfiguration", shape: o_Cors }),
      CreatedDate: D.m({ wire: "createdDate", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      DisableSchemaValidation: D.m({ wire: "disableSchemaValidation" }),
      DisableExecuteApiEndpoint: D.m({ wire: "disableExecuteApiEndpoint" }),
      ImportInfo: D.m({ wire: "importInfo" }),
      IpAddressType: D.m({ wire: "ipAddressType" }),
      Name: D.m({ wire: "name" }),
      ProtocolType: D.m({ wire: "protocolType" }),
      RouteSelectionExpression: D.m({ wire: "routeSelectionExpression" }),
      Tags: D.m({ wire: "tags" }),
      Version: D.m({ wire: "version" }),
      Warnings: D.m({ wire: "warnings" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportApi",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/portalproducts",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      ResourceOwner: D.m({ query: "resourceOwner" }),
    },
    output: {
      Items: D.m({
        wire: "items",
        shape: D.list({
          Description: D.m({ wire: "description" }),
          DisplayName: D.m({ wire: "displayName" }),
          LastModified: D.m({ wire: "lastModified", shape: D.ts }),
          PortalProductArn: D.m({ wire: "portalProductArn" }),
          PortalProductId: D.m({ wire: "portalProductId" }),
          Tags: D.m({ wire: "tags" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPortalProducts",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/portals",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Items: D.m({
        wire: "items",
        shape: D.list({
          Authorization: D.m({ wire: "authorization", shape: o_Authorization }),
          EndpointConfiguration: D.m({
            wire: "endpointConfiguration",
            shape: o_EndpointConfigurationResponse,
          }),
          IncludedPortalProductArns: D.m({ wire: "includedPortalProductArns" }),
          LastModified: D.m({ wire: "lastModified", shape: D.ts }),
          LastPublished: D.m({ wire: "lastPublished", shape: D.ts }),
          LastPublishedDescription: D.m({ wire: "lastPublishedDescription" }),
          PortalArn: D.m({ wire: "portalArn" }),
          PortalContent: D.m({ wire: "portalContent", shape: o_PortalContent }),
          PortalId: D.m({ wire: "portalId" }),
          Preview: D.m({ wire: "preview", shape: o_Preview }),
          PublishStatus: D.m({ wire: "publishStatus" }),
          RumAppMonitorName: D.m({ wire: "rumAppMonitorName" }),
          StatusException: D.m({
            wire: "statusException",
            shape: o_StatusException,
          }),
          Tags: D.m({ wire: "tags" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPortals",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/portalproducts/{PortalProductId}/productpages",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      PortalProductId: 0,
      ResourceOwnerAccountId: D.m({ query: "resourceOwnerAccountId" }),
    },
    output: {
      Items: D.m({
        wire: "items",
        shape: D.list({
          LastModified: D.m({ wire: "lastModified", shape: D.ts }),
          PageTitle: D.m({ wire: "pageTitle" }),
          ProductPageArn: D.m({ wire: "productPageArn" }),
          ProductPageId: D.m({ wire: "productPageId" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProductPages",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/portalproducts/{PortalProductId}/productrestendpointpages",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      PortalProductId: 0,
      ResourceOwnerAccountId: D.m({ query: "resourceOwnerAccountId" }),
    },
    output: {
      Items: D.m({
        wire: "items",
        shape: D.list({
          Endpoint: D.m({ wire: "endpoint" }),
          LastModified: D.m({ wire: "lastModified", shape: D.ts }),
          OperationName: D.m({ wire: "operationName" }),
          ProductRestEndpointPageArn: D.m({
            wire: "productRestEndpointPageArn",
          }),
          ProductRestEndpointPageId: D.m({ wire: "productRestEndpointPageId" }),
          RestEndpointIdentifier: D.m({
            wire: "restEndpointIdentifier",
            shape: o_RestEndpointIdentifier,
          }),
          Status: D.m({ wire: "status" }),
          StatusException: D.m({
            wire: "statusException",
            shape: o_StatusException,
          }),
          TryItState: D.m({ wire: "tryItState" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProductRestEndpointPages",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/domainnames/{DomainName}/routingrules",
    input: {
      DomainName: 0,
      DomainNameId: D.m({ query: "domainNameId" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      RoutingRules: D.m({
        wire: "routingRules",
        shape: D.list({
          Actions: D.m({ wire: "actions", shape: D.list(o_RoutingRuleAction) }),
          Conditions: D.m({
            wire: "conditions",
            shape: D.list(o_RoutingRuleCondition),
          }),
          Priority: D.m({ wire: "priority" }),
          RoutingRuleArn: D.m({ wire: "routingRuleArn" }),
          RoutingRuleId: D.m({ wire: "routingRuleId" }),
        }),
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "POST /v2/portals/{PortalId}/preview",
    input: { PortalId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/portals/{PortalId}/publish",
    input: { Description: D.m({ wire: "description" }), PortalId: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v2/portalproducts/{PortalProductId}/sharingpolicy",
    input: {
      PolicyDocument: D.m({ wire: "policyDocument" }),
      PortalProductId: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPortalProductSharingPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v2/domainnames/{DomainName}/routingrules/{RoutingRuleId}",
    input: {
      Actions: D.m({ wire: "actions", shape: D.list(i_RoutingRuleAction) }),
      Conditions: D.m({
        wire: "conditions",
        shape: D.list(i_RoutingRuleCondition),
      }),
      DomainName: 0,
      DomainNameId: D.m({ query: "domainNameId" }),
      Priority: D.m({ wire: "priority" }),
      RoutingRuleId: 0,
    },
    output: {
      Actions: D.m({ wire: "actions", shape: D.list(o_RoutingRuleAction) }),
      Conditions: D.m({
        wire: "conditions",
        shape: D.list(o_RoutingRuleCondition),
      }),
      Priority: D.m({ wire: "priority" }),
      RoutingRuleArn: D.m({ wire: "routingRuleArn" }),
      RoutingRuleId: D.m({ wire: "routingRuleId" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRoutingRule",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v2/apis/{ApiId}",
    input: {
      ApiId: 0,
      Basepath: D.m({ query: "basepath" }),
      Body: D.m({ wire: "body" }),
      FailOnWarnings: D.m({ query: "failOnWarnings" }),
    },
    output: {
      ApiEndpoint: D.m({ wire: "apiEndpoint" }),
      ApiGatewayManaged: D.m({ wire: "apiGatewayManaged" }),
      ApiId: D.m({ wire: "apiId" }),
      ApiKeySelectionExpression: D.m({ wire: "apiKeySelectionExpression" }),
      CorsConfiguration: D.m({ wire: "corsConfiguration", shape: o_Cors }),
      CreatedDate: D.m({ wire: "createdDate", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      DisableSchemaValidation: D.m({ wire: "disableSchemaValidation" }),
      DisableExecuteApiEndpoint: D.m({ wire: "disableExecuteApiEndpoint" }),
      ImportInfo: D.m({ wire: "importInfo" }),
      IpAddressType: D.m({ wire: "ipAddressType" }),
      Name: D.m({ wire: "name" }),
      ProtocolType: D.m({ wire: "protocolType" }),
      RouteSelectionExpression: D.m({ wire: "routeSelectionExpression" }),
      Tags: D.m({ wire: "tags" }),
      Version: D.m({ wire: "version" }),
      Warnings: D.m({ wire: "warnings" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReimportApi",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v2/apis/{ApiId}/stages/{StageName}/cache/authorizers",
    input: { ApiId: 0, StageName: 0 },
  },
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetAuthorizersCache",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: D.m({ wire: "tags" }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v2/tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v2/apis/{ApiId}",
    input: {
      ApiId: 0,
      ApiKeySelectionExpression: D.m({ wire: "apiKeySelectionExpression" }),
      CorsConfiguration: D.m({ wire: "corsConfiguration", shape: i_Cors }),
      CredentialsArn: D.m({ wire: "credentialsArn" }),
      Description: D.m({ wire: "description" }),
      DisableSchemaValidation: D.m({ wire: "disableSchemaValidation" }),
      DisableExecuteApiEndpoint: D.m({ wire: "disableExecuteApiEndpoint" }),
      IpAddressType: D.m({ wire: "ipAddressType" }),
      Name: D.m({ wire: "name" }),
      RouteKey: D.m({ wire: "routeKey" }),
      RouteSelectionExpression: D.m({ wire: "routeSelectionExpression" }),
      Target: D.m({ wire: "target" }),
      Version: D.m({ wire: "version" }),
    },
    output: {
      ApiEndpoint: D.m({ wire: "apiEndpoint" }),
      ApiGatewayManaged: D.m({ wire: "apiGatewayManaged" }),
      ApiId: D.m({ wire: "apiId" }),
      ApiKeySelectionExpression: D.m({ wire: "apiKeySelectionExpression" }),
      CorsConfiguration: D.m({ wire: "corsConfiguration", shape: o_Cors }),
      CreatedDate: D.m({ wire: "createdDate", shape: D.ts }),
      Description: D.m({ wire: "description" }),
      DisableSchemaValidation: D.m({ wire: "disableSchemaValidation" }),
      DisableExecuteApiEndpoint: D.m({ wire: "disableExecuteApiEndpoint" }),
      ImportInfo: D.m({ wire: "importInfo" }),
      IpAddressType: D.m({ wire: "ipAddressType" }),
      Name: D.m({ wire: "name" }),
      ProtocolType: D.m({ wire: "protocolType" }),
      RouteSelectionExpression: D.m({ wire: "routeSelectionExpression" }),
      Tags: D.m({ wire: "tags" }),
      Version: D.m({ wire: "version" }),
      Warnings: D.m({ wire: "warnings" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApi",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v2/domainnames/{DomainName}/apimappings/{ApiMappingId}",
    input: {
      ApiId: D.m({ wire: "apiId" }),
      ApiMappingId: 0,
      ApiMappingKey: D.m({ wire: "apiMappingKey" }),
      DomainName: 0,
      Stage: D.m({ wire: "stage" }),
    },
    output: {
      ApiId: D.m({ wire: "apiId" }),
      ApiMappingId: D.m({ wire: "apiMappingId" }),
      ApiMappingKey: D.m({ wire: "apiMappingKey" }),
      Stage: D.m({ wire: "stage" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApiMapping",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v2/apis/{ApiId}/authorizers/{AuthorizerId}",
    input: {
      ApiId: 0,
      AuthorizerCredentialsArn: D.m({ wire: "authorizerCredentialsArn" }),
      AuthorizerId: 0,
      AuthorizerPayloadFormatVersion: D.m({
        wire: "authorizerPayloadFormatVersion",
      }),
      AuthorizerResultTtlInSeconds: D.m({
        wire: "authorizerResultTtlInSeconds",
      }),
      AuthorizerType: D.m({ wire: "authorizerType" }),
      AuthorizerUri: D.m({ wire: "authorizerUri" }),
      EnableSimpleResponses: D.m({ wire: "enableSimpleResponses" }),
      IdentitySource: D.m({ wire: "identitySource" }),
      IdentityValidationExpression: D.m({
        wire: "identityValidationExpression",
      }),
      JwtConfiguration: D.m({
        wire: "jwtConfiguration",
        shape: i_JWTConfiguration,
      }),
      Name: D.m({ wire: "name" }),
    },
    output: {
      AuthorizerCredentialsArn: D.m({ wire: "authorizerCredentialsArn" }),
      AuthorizerId: D.m({ wire: "authorizerId" }),
      AuthorizerPayloadFormatVersion: D.m({
        wire: "authorizerPayloadFormatVersion",
      }),
      AuthorizerResultTtlInSeconds: D.m({
        wire: "authorizerResultTtlInSeconds",
      }),
      AuthorizerType: D.m({ wire: "authorizerType" }),
      AuthorizerUri: D.m({ wire: "authorizerUri" }),
      EnableSimpleResponses: D.m({ wire: "enableSimpleResponses" }),
      IdentitySource: D.m({ wire: "identitySource" }),
      IdentityValidationExpression: D.m({
        wire: "identityValidationExpression",
      }),
      JwtConfiguration: D.m({
        wire: "jwtConfiguration",
        shape: o_JWTConfiguration,
      }),
      Name: D.m({ wire: "name" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAuthorizer",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v2/apis/{ApiId}/deployments/{DeploymentId}",
    input: {
      ApiId: 0,
      DeploymentId: 0,
      Description: D.m({ wire: "description" }),
    },
    output: {
      AutoDeployed: D.m({ wire: "autoDeployed" }),
      CreatedDate: D.m({ wire: "createdDate", shape: D.ts }),
      DeploymentId: D.m({ wire: "deploymentId" }),
      DeploymentStatus: D.m({ wire: "deploymentStatus" }),
      DeploymentStatusMessage: D.m({ wire: "deploymentStatusMessage" }),
      Description: D.m({ wire: "description" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeployment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v2/domainnames/{DomainName}",
    input: {
      DomainName: 0,
      DomainNameConfigurations: D.m({
        wire: "domainNameConfigurations",
        shape: D.list(i_DomainNameConfiguration),
      }),
      MutualTlsAuthentication: D.m({
        wire: "mutualTlsAuthentication",
        shape: i_MutualTlsAuthenticationInput,
      }),
      RoutingMode: D.m({ wire: "routingMode" }),
    },
    output: {
      ApiMappingSelectionExpression: D.m({
        wire: "apiMappingSelectionExpression",
      }),
      DomainName: D.m({ wire: "domainName" }),
      DomainNameArn: D.m({ wire: "domainNameArn" }),
      DomainNameConfigurations: D.m({
        wire: "domainNameConfigurations",
        shape: D.list(o_DomainNameConfiguration),
      }),
      MutualTlsAuthentication: D.m({
        wire: "mutualTlsAuthentication",
        shape: o_MutualTlsAuthentication,
      }),
      RoutingMode: D.m({ wire: "routingMode" }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainName",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v2/apis/{ApiId}/integrations/{IntegrationId}",
    input: {
      ApiId: 0,
      ConnectionId: D.m({ wire: "connectionId" }),
      ConnectionType: D.m({ wire: "connectionType" }),
      ContentHandlingStrategy: D.m({ wire: "contentHandlingStrategy" }),
      CredentialsArn: D.m({ wire: "credentialsArn" }),
      Description: D.m({ wire: "description" }),
      IntegrationId: 0,
      IntegrationMethod: D.m({ wire: "integrationMethod" }),
      IntegrationSubtype: D.m({ wire: "integrationSubtype" }),
      IntegrationType: D.m({ wire: "integrationType" }),
      IntegrationUri: D.m({ wire: "integrationUri" }),
      PassthroughBehavior: D.m({ wire: "passthroughBehavior" }),
      PayloadFormatVersion: D.m({ wire: "payloadFormatVersion" }),
      RequestParameters: D.m({ wire: "requestParameters" }),
      RequestTemplates: D.m({ wire: "requestTemplates" }),
      ResponseParameters: D.m({ wire: "responseParameters" }),
      TemplateSelectionExpression: D.m({ wire: "templateSelectionExpression" }),
      TimeoutInMillis: D.m({ wire: "timeoutInMillis" }),
      TlsConfig: D.m({ wire: "tlsConfig", shape: i_TlsConfigInput }),
    },
    output: {
      ApiGatewayManaged: D.m({ wire: "apiGatewayManaged" }),
      ConnectionId: D.m({ wire: "connectionId" }),
      ConnectionType: D.m({ wire: "connectionType" }),
      ContentHandlingStrategy: D.m({ wire: "contentHandlingStrategy" }),
      CredentialsArn: D.m({ wire: "credentialsArn" }),
      Description: D.m({ wire: "description" }),
      IntegrationId: D.m({ wire: "integrationId" }),
      IntegrationMethod: D.m({ wire: "integrationMethod" }),
      IntegrationResponseSelectionExpression: D.m({
        wire: "integrationResponseSelectionExpression",
      }),
      IntegrationSubtype: D.m({ wire: "integrationSubtype" }),
      IntegrationType: D.m({ wire: "integrationType" }),
      IntegrationUri: D.m({ wire: "integrationUri" }),
      PassthroughBehavior: D.m({ wire: "passthroughBehavior" }),
      PayloadFormatVersion: D.m({ wire: "payloadFormatVersion" }),
      RequestParameters: D.m({ wire: "requestParameters" }),
      RequestTemplates: D.m({ wire: "requestTemplates" }),
      ResponseParameters: D.m({ wire: "responseParameters" }),
      TemplateSelectionExpression: D.m({ wire: "templateSelectionExpression" }),
      TimeoutInMillis: D.m({ wire: "timeoutInMillis" }),
      TlsConfig: D.m({ wire: "tlsConfig", shape: o_TlsConfig }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIntegration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v2/apis/{ApiId}/integrations/{IntegrationId}/integrationresponses/{IntegrationResponseId}",
    input: {
      ApiId: 0,
      ContentHandlingStrategy: D.m({ wire: "contentHandlingStrategy" }),
      IntegrationId: 0,
      IntegrationResponseId: 0,
      IntegrationResponseKey: D.m({ wire: "integrationResponseKey" }),
      ResponseParameters: D.m({ wire: "responseParameters" }),
      ResponseTemplates: D.m({ wire: "responseTemplates" }),
      TemplateSelectionExpression: D.m({ wire: "templateSelectionExpression" }),
    },
    output: {
      ContentHandlingStrategy: D.m({ wire: "contentHandlingStrategy" }),
      IntegrationResponseId: D.m({ wire: "integrationResponseId" }),
      IntegrationResponseKey: D.m({ wire: "integrationResponseKey" }),
      ResponseParameters: D.m({ wire: "responseParameters" }),
      ResponseTemplates: D.m({ wire: "responseTemplates" }),
      TemplateSelectionExpression: D.m({ wire: "templateSelectionExpression" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIntegrationResponse",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v2/apis/{ApiId}/models/{ModelId}",
    input: {
      ApiId: 0,
      ContentType: D.m({ wire: "contentType" }),
      Description: D.m({ wire: "description" }),
      ModelId: 0,
      Name: D.m({ wire: "name" }),
      Schema: D.m({ wire: "schema" }),
    },
    output: {
      ContentType: D.m({ wire: "contentType" }),
      Description: D.m({ wire: "description" }),
      ModelId: D.m({ wire: "modelId" }),
      Name: D.m({ wire: "name" }),
      Schema: D.m({ wire: "schema" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateModel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v2/portals/{PortalId}",
    input: {
      Authorization: D.m({ wire: "authorization", shape: i_Authorization }),
      EndpointConfiguration: D.m({
        wire: "endpointConfiguration",
        shape: i_EndpointConfigurationRequest,
      }),
      IncludedPortalProductArns: D.m({ wire: "includedPortalProductArns" }),
      LogoUri: D.m({ wire: "logoUri" }),
      PortalContent: D.m({ wire: "portalContent", shape: i_PortalContent }),
      PortalId: 0,
      RumAppMonitorName: D.m({ wire: "rumAppMonitorName" }),
    },
    output: {
      Authorization: D.m({ wire: "authorization", shape: o_Authorization }),
      EndpointConfiguration: D.m({
        wire: "endpointConfiguration",
        shape: o_EndpointConfigurationResponse,
      }),
      IncludedPortalProductArns: D.m({ wire: "includedPortalProductArns" }),
      LastModified: D.m({ wire: "lastModified", shape: D.ts }),
      LastPublished: D.m({ wire: "lastPublished", shape: D.ts }),
      LastPublishedDescription: D.m({ wire: "lastPublishedDescription" }),
      PortalArn: D.m({ wire: "portalArn" }),
      PortalContent: D.m({ wire: "portalContent", shape: o_PortalContent }),
      PortalId: D.m({ wire: "portalId" }),
      Preview: D.m({ wire: "preview", shape: o_Preview }),
      PublishStatus: D.m({ wire: "publishStatus" }),
      RumAppMonitorName: D.m({ wire: "rumAppMonitorName" }),
      StatusException: D.m({
        wire: "statusException",
        shape: o_StatusException,
      }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v2/portalproducts/{PortalProductId}",
    input: {
      Description: D.m({ wire: "description" }),
      DisplayName: D.m({ wire: "displayName" }),
      DisplayOrder: D.m({
        wire: "displayOrder",
        shape: {
          Contents: D.m({
            wire: "contents",
            shape: D.list({
              ProductRestEndpointPageArns: D.m({
                wire: "productRestEndpointPageArns",
              }),
              SectionName: D.m({ wire: "sectionName" }),
            }),
          }),
          OverviewPageArn: D.m({ wire: "overviewPageArn" }),
          ProductPageArns: D.m({ wire: "productPageArns" }),
        },
      }),
      PortalProductId: 0,
    },
    output: {
      Description: D.m({ wire: "description" }),
      DisplayName: D.m({ wire: "displayName" }),
      DisplayOrder: D.m({ wire: "displayOrder", shape: o_DisplayOrder }),
      LastModified: D.m({ wire: "lastModified", shape: D.ts }),
      PortalProductArn: D.m({ wire: "portalProductArn" }),
      PortalProductId: D.m({ wire: "portalProductId" }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePortalProduct",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v2/portalproducts/{PortalProductId}/productpages/{ProductPageId}",
    input: {
      DisplayContent: D.m({ wire: "displayContent", shape: i_DisplayContent }),
      PortalProductId: 0,
      ProductPageId: 0,
    },
    output: {
      DisplayContent: D.m({ wire: "displayContent", shape: o_DisplayContent }),
      LastModified: D.m({ wire: "lastModified", shape: D.ts }),
      ProductPageArn: D.m({ wire: "productPageArn" }),
      ProductPageId: D.m({ wire: "productPageId" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProductPage",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v2/portalproducts/{PortalProductId}/productrestendpointpages/{ProductRestEndpointPageId}",
    input: {
      DisplayContent: D.m({
        wire: "displayContent",
        shape: i_EndpointDisplayContent,
      }),
      PortalProductId: 0,
      ProductRestEndpointPageId: 0,
      TryItState: D.m({ wire: "tryItState" }),
    },
    output: {
      DisplayContent: D.m({
        wire: "displayContent",
        shape: o_EndpointDisplayContentResponse,
      }),
      LastModified: D.m({ wire: "lastModified", shape: D.ts }),
      ProductRestEndpointPageArn: D.m({ wire: "productRestEndpointPageArn" }),
      ProductRestEndpointPageId: D.m({ wire: "productRestEndpointPageId" }),
      RestEndpointIdentifier: D.m({
        wire: "restEndpointIdentifier",
        shape: o_RestEndpointIdentifier,
      }),
      Status: D.m({ wire: "status" }),
      StatusException: D.m({
        wire: "statusException",
        shape: o_StatusException,
      }),
      TryItState: D.m({ wire: "tryItState" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProductRestEndpointPage",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v2/apis/{ApiId}/routes/{RouteId}",
    input: {
      ApiId: 0,
      ApiKeyRequired: D.m({ wire: "apiKeyRequired" }),
      AuthorizationScopes: D.m({ wire: "authorizationScopes" }),
      AuthorizationType: D.m({ wire: "authorizationType" }),
      AuthorizerId: D.m({ wire: "authorizerId" }),
      ModelSelectionExpression: D.m({ wire: "modelSelectionExpression" }),
      OperationName: D.m({ wire: "operationName" }),
      RequestModels: D.m({ wire: "requestModels" }),
      RequestParameters: D.m({
        wire: "requestParameters",
        shape: D.map(i_ParameterConstraints),
      }),
      RouteId: 0,
      RouteKey: D.m({ wire: "routeKey" }),
      RouteResponseSelectionExpression: D.m({
        wire: "routeResponseSelectionExpression",
      }),
      Target: D.m({ wire: "target" }),
    },
    output: {
      ApiGatewayManaged: D.m({ wire: "apiGatewayManaged" }),
      ApiKeyRequired: D.m({ wire: "apiKeyRequired" }),
      AuthorizationScopes: D.m({ wire: "authorizationScopes" }),
      AuthorizationType: D.m({ wire: "authorizationType" }),
      AuthorizerId: D.m({ wire: "authorizerId" }),
      ModelSelectionExpression: D.m({ wire: "modelSelectionExpression" }),
      OperationName: D.m({ wire: "operationName" }),
      RequestModels: D.m({ wire: "requestModels" }),
      RequestParameters: D.m({
        wire: "requestParameters",
        shape: D.map(o_ParameterConstraints),
      }),
      RouteId: D.m({ wire: "routeId" }),
      RouteKey: D.m({ wire: "routeKey" }),
      RouteResponseSelectionExpression: D.m({
        wire: "routeResponseSelectionExpression",
      }),
      Target: D.m({ wire: "target" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoute",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v2/apis/{ApiId}/routes/{RouteId}/routeresponses/{RouteResponseId}",
    input: {
      ApiId: 0,
      ModelSelectionExpression: D.m({ wire: "modelSelectionExpression" }),
      ResponseModels: D.m({ wire: "responseModels" }),
      ResponseParameters: D.m({
        wire: "responseParameters",
        shape: D.map(i_ParameterConstraints),
      }),
      RouteId: 0,
      RouteResponseId: 0,
      RouteResponseKey: D.m({ wire: "routeResponseKey" }),
    },
    output: {
      ModelSelectionExpression: D.m({ wire: "modelSelectionExpression" }),
      ResponseModels: D.m({ wire: "responseModels" }),
      ResponseParameters: D.m({
        wire: "responseParameters",
        shape: D.map(o_ParameterConstraints),
      }),
      RouteResponseId: D.m({ wire: "routeResponseId" }),
      RouteResponseKey: D.m({ wire: "routeResponseKey" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRouteResponse",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v2/apis/{ApiId}/stages/{StageName}",
    input: {
      AccessLogSettings: D.m({
        wire: "accessLogSettings",
        shape: i_AccessLogSettings,
      }),
      ApiId: 0,
      AutoDeploy: D.m({ wire: "autoDeploy" }),
      ClientCertificateId: D.m({ wire: "clientCertificateId" }),
      DefaultRouteSettings: D.m({
        wire: "defaultRouteSettings",
        shape: i_RouteSettings,
      }),
      DeploymentId: D.m({ wire: "deploymentId" }),
      Description: D.m({ wire: "description" }),
      RouteSettings: D.m({
        wire: "routeSettings",
        shape: D.map(i_RouteSettings),
      }),
      StageName: 0,
      StageVariables: D.m({ wire: "stageVariables" }),
    },
    output: {
      AccessLogSettings: D.m({
        wire: "accessLogSettings",
        shape: o_AccessLogSettings,
      }),
      ApiGatewayManaged: D.m({ wire: "apiGatewayManaged" }),
      AutoDeploy: D.m({ wire: "autoDeploy" }),
      ClientCertificateId: D.m({ wire: "clientCertificateId" }),
      CreatedDate: D.m({ wire: "createdDate", shape: D.ts }),
      DefaultRouteSettings: D.m({
        wire: "defaultRouteSettings",
        shape: o_RouteSettings,
      }),
      DeploymentId: D.m({ wire: "deploymentId" }),
      Description: D.m({ wire: "description" }),
      LastDeploymentStatusMessage: D.m({ wire: "lastDeploymentStatusMessage" }),
      LastUpdatedDate: D.m({ wire: "lastUpdatedDate", shape: D.ts }),
      RouteSettings: D.m({
        wire: "routeSettings",
        shape: D.map(o_RouteSettings),
      }),
      StageName: D.m({ wire: "stageName" }),
      StageVariables: D.m({ wire: "stageVariables" }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStage",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /v2/vpclinks/{VpcLinkId}",
    input: { Name: D.m({ wire: "name" }), VpcLinkId: 0 },
    output: {
      CreatedDate: D.m({ wire: "createdDate", shape: D.ts }),
      Name: D.m({ wire: "name" }),
      SecurityGroupIds: D.m({ wire: "securityGroupIds" }),
      SubnetIds: D.m({ wire: "subnetIds" }),
      Tags: D.m({ wire: "tags" }),
      VpcLinkId: D.m({ wire: "vpcLinkId" }),
      VpcLinkStatus: D.m({ wire: "vpcLinkStatus" }),
      VpcLinkStatusMessage: D.m({ wire: "vpcLinkStatusMessage" }),
      VpcLinkVersion: D.m({ wire: "vpcLinkVersion" }),
    },
    body: true,
  },
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVpcLink",
})) as any;

const i_AccessLogSettings: D.LazyStruct = () => ({
  DestinationArn: D.m({ wire: "destinationArn" }),
  Format: D.m({ wire: "format" }),
});
const i_Authorization: D.LazyStruct = () => ({
  CognitoConfig: D.m({
    wire: "cognitoConfig",
    shape: {
      AppClientId: D.m({ wire: "appClientId" }),
      UserPoolArn: D.m({ wire: "userPoolArn" }),
      UserPoolDomain: D.m({ wire: "userPoolDomain" }),
    },
  }),
  None: D.m({ wire: "none", shape: i_None }),
});
const i_Cors: D.LazyStruct = () => ({
  AllowCredentials: D.m({ wire: "allowCredentials" }),
  AllowHeaders: D.m({ wire: "allowHeaders" }),
  AllowMethods: D.m({ wire: "allowMethods" }),
  AllowOrigins: D.m({ wire: "allowOrigins" }),
  ExposeHeaders: D.m({ wire: "exposeHeaders" }),
  MaxAge: D.m({ wire: "maxAge" }),
});
const i_DisplayContent: D.LazyStruct = () => ({
  Body: D.m({ wire: "body" }),
  Title: D.m({ wire: "title" }),
});
const i_DomainNameConfiguration: D.LazyStruct = () => ({
  ApiGatewayDomainName: D.m({ wire: "apiGatewayDomainName" }),
  CertificateArn: D.m({ wire: "certificateArn" }),
  CertificateName: D.m({ wire: "certificateName" }),
  CertificateUploadDate: D.m({
    wire: "certificateUploadDate",
    shape: D.tsAs("date-time"),
  }),
  DomainNameStatus: D.m({ wire: "domainNameStatus" }),
  DomainNameStatusMessage: D.m({ wire: "domainNameStatusMessage" }),
  EndpointType: D.m({ wire: "endpointType" }),
  HostedZoneId: D.m({ wire: "hostedZoneId" }),
  IpAddressType: D.m({ wire: "ipAddressType" }),
  SecurityPolicy: D.m({ wire: "securityPolicy" }),
  OwnershipVerificationCertificateArn: D.m({
    wire: "ownershipVerificationCertificateArn",
  }),
});
const i_EndpointConfigurationRequest: D.LazyStruct = () => ({
  AcmManaged: D.m({
    wire: "acmManaged",
    shape: {
      CertificateArn: D.m({ wire: "certificateArn" }),
      DomainName: D.m({ wire: "domainName" }),
    },
  }),
  None: D.m({ wire: "none", shape: i_None }),
});
const i_EndpointDisplayContent: D.LazyStruct = () => ({
  None: D.m({ wire: "none", shape: i_None }),
  Overrides: D.m({
    wire: "overrides",
    shape: {
      Body: D.m({ wire: "body" }),
      Endpoint: D.m({ wire: "endpoint" }),
      OperationName: D.m({ wire: "operationName" }),
    },
  }),
});
const i_JWTConfiguration: D.LazyStruct = () => ({
  Audience: D.m({ wire: "audience" }),
  Issuer: D.m({ wire: "issuer" }),
});
const i_MutualTlsAuthenticationInput: D.LazyStruct = () => ({
  TruststoreUri: D.m({ wire: "truststoreUri" }),
  TruststoreVersion: D.m({ wire: "truststoreVersion" }),
});
const i_ParameterConstraints: D.LazyStruct = () => ({
  Required: D.m({ wire: "required" }),
});
const i_PortalContent: D.LazyStruct = () => ({
  Description: D.m({ wire: "description" }),
  DisplayName: D.m({ wire: "displayName" }),
  Theme: D.m({
    wire: "theme",
    shape: {
      CustomColors: D.m({
        wire: "customColors",
        shape: {
          AccentColor: D.m({ wire: "accentColor" }),
          BackgroundColor: D.m({ wire: "backgroundColor" }),
          ErrorValidationColor: D.m({ wire: "errorValidationColor" }),
          HeaderColor: D.m({ wire: "headerColor" }),
          NavigationColor: D.m({ wire: "navigationColor" }),
          TextColor: D.m({ wire: "textColor" }),
        },
      }),
      LogoLastUploaded: D.m({
        wire: "logoLastUploaded",
        shape: D.tsAs("date-time"),
      }),
    },
  }),
});
const i_RouteSettings: D.LazyStruct = () => ({
  DataTraceEnabled: D.m({ wire: "dataTraceEnabled" }),
  DetailedMetricsEnabled: D.m({ wire: "detailedMetricsEnabled" }),
  LoggingLevel: D.m({ wire: "loggingLevel" }),
  ThrottlingBurstLimit: D.m({ wire: "throttlingBurstLimit" }),
  ThrottlingRateLimit: D.m({ wire: "throttlingRateLimit" }),
});
const i_RoutingRuleAction: D.LazyStruct = () => ({
  InvokeApi: D.m({
    wire: "invokeApi",
    shape: {
      ApiId: D.m({ wire: "apiId" }),
      Stage: D.m({ wire: "stage" }),
      StripBasePath: D.m({ wire: "stripBasePath" }),
    },
  }),
});
const i_RoutingRuleCondition: D.LazyStruct = () => ({
  MatchBasePaths: D.m({
    wire: "matchBasePaths",
    shape: { AnyOf: D.m({ wire: "anyOf" }) },
  }),
  MatchHeaders: D.m({
    wire: "matchHeaders",
    shape: {
      AnyOf: D.m({
        wire: "anyOf",
        shape: D.list({
          Header: D.m({ wire: "header" }),
          ValueGlob: D.m({ wire: "valueGlob" }),
        }),
      }),
    },
  }),
});
const i_TlsConfigInput: D.LazyStruct = () => ({
  ServerNameToVerify: D.m({ wire: "serverNameToVerify" }),
});
const o_AccessLogSettings: D.LazyStruct = () => ({
  DestinationArn: D.m({ wire: "destinationArn" }),
  Format: D.m({ wire: "format" }),
});
const o_Authorization: D.LazyStruct = () => ({
  CognitoConfig: D.m({
    wire: "cognitoConfig",
    shape: {
      AppClientId: D.m({ wire: "appClientId" }),
      UserPoolArn: D.m({ wire: "userPoolArn" }),
      UserPoolDomain: D.m({ wire: "userPoolDomain" }),
    },
  }),
  None: D.m({ wire: "none" }),
});
const o_Cors: D.LazyStruct = () => ({
  AllowCredentials: D.m({ wire: "allowCredentials" }),
  AllowHeaders: D.m({ wire: "allowHeaders" }),
  AllowMethods: D.m({ wire: "allowMethods" }),
  AllowOrigins: D.m({ wire: "allowOrigins" }),
  ExposeHeaders: D.m({ wire: "exposeHeaders" }),
  MaxAge: D.m({ wire: "maxAge" }),
});
const o_DisplayContent: D.LazyStruct = () => ({
  Body: D.m({ wire: "body" }),
  Title: D.m({ wire: "title" }),
});
const o_DisplayOrder: D.LazyStruct = () => ({
  Contents: D.m({
    wire: "contents",
    shape: D.list({
      ProductRestEndpointPageArns: D.m({ wire: "productRestEndpointPageArns" }),
      SectionName: D.m({ wire: "sectionName" }),
    }),
  }),
  OverviewPageArn: D.m({ wire: "overviewPageArn" }),
  ProductPageArns: D.m({ wire: "productPageArns" }),
});
const o_DomainNameConfiguration: D.LazyStruct = () => ({
  ApiGatewayDomainName: D.m({ wire: "apiGatewayDomainName" }),
  CertificateArn: D.m({ wire: "certificateArn" }),
  CertificateName: D.m({ wire: "certificateName" }),
  CertificateUploadDate: D.m({ wire: "certificateUploadDate", shape: D.ts }),
  DomainNameStatus: D.m({ wire: "domainNameStatus" }),
  DomainNameStatusMessage: D.m({ wire: "domainNameStatusMessage" }),
  EndpointType: D.m({ wire: "endpointType" }),
  HostedZoneId: D.m({ wire: "hostedZoneId" }),
  IpAddressType: D.m({ wire: "ipAddressType" }),
  SecurityPolicy: D.m({ wire: "securityPolicy" }),
  OwnershipVerificationCertificateArn: D.m({
    wire: "ownershipVerificationCertificateArn",
  }),
});
const o_EndpointConfigurationResponse: D.LazyStruct = () => ({
  CertificateArn: D.m({ wire: "certificateArn" }),
  DomainName: D.m({ wire: "domainName" }),
  PortalDefaultDomainName: D.m({ wire: "portalDefaultDomainName" }),
  PortalDomainHostedZoneId: D.m({ wire: "portalDomainHostedZoneId" }),
});
const o_EndpointDisplayContentResponse: D.LazyStruct = () => ({
  Body: D.m({ wire: "body" }),
  Endpoint: D.m({ wire: "endpoint" }),
  OperationName: D.m({ wire: "operationName" }),
});
const o_JWTConfiguration: D.LazyStruct = () => ({
  Audience: D.m({ wire: "audience" }),
  Issuer: D.m({ wire: "issuer" }),
});
const o_MutualTlsAuthentication: D.LazyStruct = () => ({
  TruststoreUri: D.m({ wire: "truststoreUri" }),
  TruststoreVersion: D.m({ wire: "truststoreVersion" }),
  TruststoreWarnings: D.m({ wire: "truststoreWarnings" }),
});
const o_ParameterConstraints: D.LazyStruct = () => ({
  Required: D.m({ wire: "required" }),
});
const o_PortalContent: D.LazyStruct = () => ({
  Description: D.m({ wire: "description" }),
  DisplayName: D.m({ wire: "displayName" }),
  Theme: D.m({
    wire: "theme",
    shape: {
      CustomColors: D.m({
        wire: "customColors",
        shape: {
          AccentColor: D.m({ wire: "accentColor" }),
          BackgroundColor: D.m({ wire: "backgroundColor" }),
          ErrorValidationColor: D.m({ wire: "errorValidationColor" }),
          HeaderColor: D.m({ wire: "headerColor" }),
          NavigationColor: D.m({ wire: "navigationColor" }),
          TextColor: D.m({ wire: "textColor" }),
        },
      }),
      LogoLastUploaded: D.m({ wire: "logoLastUploaded", shape: D.ts }),
    },
  }),
});
const o_Preview: D.LazyStruct = () => ({
  PreviewStatus: D.m({ wire: "previewStatus" }),
  PreviewUrl: D.m({ wire: "previewUrl" }),
  StatusException: D.m({ wire: "statusException", shape: o_StatusException }),
});
const o_RestEndpointIdentifier: D.LazyStruct = () => ({
  IdentifierParts: D.m({
    wire: "identifierParts",
    shape: {
      Method: D.m({ wire: "method" }),
      Path: D.m({ wire: "path" }),
      RestApiId: D.m({ wire: "restApiId" }),
      Stage: D.m({ wire: "stage" }),
    },
  }),
});
const o_RouteSettings: D.LazyStruct = () => ({
  DataTraceEnabled: D.m({ wire: "dataTraceEnabled" }),
  DetailedMetricsEnabled: D.m({ wire: "detailedMetricsEnabled" }),
  LoggingLevel: D.m({ wire: "loggingLevel" }),
  ThrottlingBurstLimit: D.m({ wire: "throttlingBurstLimit" }),
  ThrottlingRateLimit: D.m({ wire: "throttlingRateLimit" }),
});
const o_RoutingRuleAction: D.LazyStruct = () => ({
  InvokeApi: D.m({
    wire: "invokeApi",
    shape: {
      ApiId: D.m({ wire: "apiId" }),
      Stage: D.m({ wire: "stage" }),
      StripBasePath: D.m({ wire: "stripBasePath" }),
    },
  }),
});
const o_RoutingRuleCondition: D.LazyStruct = () => ({
  MatchBasePaths: D.m({
    wire: "matchBasePaths",
    shape: { AnyOf: D.m({ wire: "anyOf" }) },
  }),
  MatchHeaders: D.m({
    wire: "matchHeaders",
    shape: {
      AnyOf: D.m({
        wire: "anyOf",
        shape: D.list({
          Header: D.m({ wire: "header" }),
          ValueGlob: D.m({ wire: "valueGlob" }),
        }),
      }),
    },
  }),
});
const o_StatusException: D.LazyStruct = () => ({
  Exception: D.m({ wire: "exception" }),
  Message: D.m({ wire: "message" }),
});
const o_TlsConfig: D.LazyStruct = () => ({
  ServerNameToVerify: D.m({ wire: "serverNameToVerify" }),
});
const i_None: D.LazyStruct = () => ({});
