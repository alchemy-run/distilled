import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "ApiGatewayV2",
  serviceShapeName: "ApiGatewayV2",
});
const auth = T.AwsAuthSigv4({ name: "apigateway" });
const ver = T.ServiceVersion("2018-11-29");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
});

//# Newtypes
export type SelectionExpression = string;
export type StringWithLengthBetween1And64 = string;
export type IntegerWithLengthBetweenMinus1And86400 = number;
export type Arn = string;
export type StringWithLengthBetween0And1024 = string;
export type StringWithLengthBetween1And128 = string;
export type SelectionKey = string;
export type StringWithLengthBetween1And1600 = string;
export type UriWithLengthBetween1And2048 = string;
export type Id = string;
export type __timestampIso8601 = Date;
export type IntegerWithLengthBetween0And3600 = number;
export type StringWithLengthBetween1And512 = string;
export type StringWithLengthBetween1And1024 = string;
export type StringWithLengthBetween0And32K = string;
export type IntegerWithLengthBetween50And30000 = number;
export type StringWithLengthBetween1And256 = string;
export type __stringMin1Max256 = string;
export type __stringMin20Max2048 = string;
export type __stringMin10Max2048 = string;
export type __stringMin3Max256 = string;
export type __stringMin0Max1092 = string;
export type __stringMin0Max1024 = string;
export type __stringMin3Max255 = string;
export type __stringMin1Max16 = string;
export type __stringMin0Max255 = string;
export type __stringMin1Max64 = string;
export type __stringMin10Max30PatternAZ09 = string;
export type __stringMin1Max2048 = string;
export type __stringMin1Max255 = string;
export type __stringMin1Max32768 = string;
export type __stringMin1Max1024 = string;
export type __stringMin1Max20 = string;
export type __stringMin1Max4096 = string;
export type __stringMin1Max50 = string;
export type __stringMin1Max128 = string;
export type RoutingRulePriority = number;
export type StringWithLengthBetween0And2048 = string;
export type NextToken = string;
export type __stringMin1Max307200 = string;
export type MaxResults = number;

//# Schemas
export type CorsHeaderList = string[];
export const CorsHeaderList = S.Array(S.String);
export type CorsMethodList = string[];
export const CorsMethodList = S.Array(S.String);
export type CorsOriginList = string[];
export const CorsOriginList = S.Array(S.String);
export interface Cors {
  AllowCredentials?: boolean;
  AllowHeaders?: string[];
  AllowMethods?: string[];
  AllowOrigins?: string[];
  ExposeHeaders?: string[];
  MaxAge?: number;
}
export const Cors = S.suspend(() =>
  S.Struct({
    AllowCredentials: S.optional(S.Boolean),
    AllowHeaders: S.optional(CorsHeaderList),
    AllowMethods: S.optional(CorsMethodList),
    AllowOrigins: S.optional(CorsOriginList),
    ExposeHeaders: S.optional(CorsHeaderList),
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
).annotate({ identifier: "Cors" }) as any as S.Schema<Cors>;
export type IpAddressType = "ipv4" | "dualstack" | (string & {});
export const IpAddressType = S.String;
export type ProtocolType = "WEBSOCKET" | "HTTP" | (string & {});
export const ProtocolType = S.String;
export type Tags = { [key: string]: string | undefined };
export const Tags = S.Record(S.String, S.String.pipe(S.optional));
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
export const CreateApiRequest = S.suspend(() =>
  S.Struct({
    ApiKeySelectionExpression: S.optional(S.String),
    CorsConfiguration: S.optional(Cors),
    CredentialsArn: S.optional(S.String),
    Description: S.optional(S.String),
    DisableSchemaValidation: S.optional(S.Boolean),
    DisableExecuteApiEndpoint: S.optional(S.Boolean),
    IpAddressType: S.optional(IpAddressType),
    Name: S.optional(S.String),
    ProtocolType: S.optional(ProtocolType),
    RouteKey: S.optional(S.String),
    RouteSelectionExpression: S.optional(S.String),
    Tags: S.optional(Tags),
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
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v2/apis" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateApiRequest",
}) as any as S.Schema<CreateApiRequest>;
export type __listOf__string = string[];
export const __listOf__string = S.Array(S.String);
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
export const CreateApiResponse = S.suspend(() =>
  S.Struct({
    ApiEndpoint: S.optional(S.String),
    ApiGatewayManaged: S.optional(S.Boolean),
    ApiId: S.optional(S.String),
    ApiKeySelectionExpression: S.optional(S.String),
    CorsConfiguration: S.optional(Cors),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    DisableSchemaValidation: S.optional(S.Boolean),
    DisableExecuteApiEndpoint: S.optional(S.Boolean),
    ImportInfo: S.optional(__listOf__string),
    IpAddressType: S.optional(IpAddressType),
    Name: S.optional(S.String),
    ProtocolType: S.optional(ProtocolType),
    RouteSelectionExpression: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "CreateApiResponse",
}) as any as S.Schema<CreateApiResponse>;
export interface CreateApiMappingRequest {
  ApiId?: string;
  ApiMappingKey?: string;
  DomainName: string;
  Stage?: string;
}
export const CreateApiMappingRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.optional(S.String),
    ApiMappingKey: S.optional(S.String),
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    Stage: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ApiId: "apiId",
        ApiMappingKey: "apiMappingKey",
        Stage: "stage",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v2/domainnames/{DomainName}/apimappings",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateApiMappingRequest",
}) as any as S.Schema<CreateApiMappingRequest>;
export interface CreateApiMappingResponse {
  ApiId?: string;
  ApiMappingId?: string;
  ApiMappingKey?: string;
  Stage?: string;
}
export const CreateApiMappingResponse = S.suspend(() =>
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
).annotate({
  identifier: "CreateApiMappingResponse",
}) as any as S.Schema<CreateApiMappingResponse>;
export type AuthorizerType = "REQUEST" | "JWT" | (string & {});
export const AuthorizerType = S.String;
export type IdentitySourceList = string[];
export const IdentitySourceList = S.Array(S.String);
export interface JWTConfiguration {
  Audience?: string[];
  Issuer?: string;
}
export const JWTConfiguration = S.suspend(() =>
  S.Struct({
    Audience: S.optional(__listOf__string),
    Issuer: S.optional(S.String),
  }).pipe(S.encodeKeys({ Audience: "audience", Issuer: "issuer" })),
).annotate({
  identifier: "JWTConfiguration",
}) as any as S.Schema<JWTConfiguration>;
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
export const CreateAuthorizerRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    AuthorizerCredentialsArn: S.optional(S.String),
    AuthorizerPayloadFormatVersion: S.optional(S.String),
    AuthorizerResultTtlInSeconds: S.optional(S.Number),
    AuthorizerType: S.optional(AuthorizerType),
    AuthorizerUri: S.optional(S.String),
    EnableSimpleResponses: S.optional(S.Boolean),
    IdentitySource: S.optional(IdentitySourceList),
    IdentityValidationExpression: S.optional(S.String),
    JwtConfiguration: S.optional(JWTConfiguration),
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
).annotate({
  identifier: "CreateAuthorizerRequest",
}) as any as S.Schema<CreateAuthorizerRequest>;
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
export const CreateAuthorizerResponse = S.suspend(() =>
  S.Struct({
    AuthorizerCredentialsArn: S.optional(S.String),
    AuthorizerId: S.optional(S.String),
    AuthorizerPayloadFormatVersion: S.optional(S.String),
    AuthorizerResultTtlInSeconds: S.optional(S.Number),
    AuthorizerType: S.optional(AuthorizerType),
    AuthorizerUri: S.optional(S.String),
    EnableSimpleResponses: S.optional(S.Boolean),
    IdentitySource: S.optional(IdentitySourceList),
    IdentityValidationExpression: S.optional(S.String),
    JwtConfiguration: S.optional(JWTConfiguration),
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
).annotate({
  identifier: "CreateAuthorizerResponse",
}) as any as S.Schema<CreateAuthorizerResponse>;
export interface CreateDeploymentRequest {
  ApiId: string;
  Description?: string;
  StageName?: string;
}
export const CreateDeploymentRequest = S.suspend(() =>
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
).annotate({
  identifier: "CreateDeploymentRequest",
}) as any as S.Schema<CreateDeploymentRequest>;
export type DeploymentStatus =
  | "PENDING"
  | "FAILED"
  | "DEPLOYED"
  | (string & {});
export const DeploymentStatus = S.String;
export interface CreateDeploymentResponse {
  AutoDeployed?: boolean;
  CreatedDate?: Date;
  DeploymentId?: string;
  DeploymentStatus?: DeploymentStatus;
  DeploymentStatusMessage?: string;
  Description?: string;
}
export const CreateDeploymentResponse = S.suspend(() =>
  S.Struct({
    AutoDeployed: S.optional(S.Boolean),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DeploymentId: S.optional(S.String),
    DeploymentStatus: S.optional(DeploymentStatus),
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
).annotate({
  identifier: "CreateDeploymentResponse",
}) as any as S.Schema<CreateDeploymentResponse>;
export type DomainNameStatus =
  | "AVAILABLE"
  | "UPDATING"
  | "PENDING_CERTIFICATE_REIMPORT"
  | "PENDING_OWNERSHIP_VERIFICATION"
  | (string & {});
export const DomainNameStatus = S.String;
export type EndpointType = "REGIONAL" | "EDGE" | (string & {});
export const EndpointType = S.String;
export type SecurityPolicy = "TLS_1_0" | "TLS_1_2" | (string & {});
export const SecurityPolicy = S.String;
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
export const DomainNameConfiguration = S.suspend(() =>
  S.Struct({
    ApiGatewayDomainName: S.optional(S.String),
    CertificateArn: S.optional(S.String),
    CertificateName: S.optional(S.String),
    CertificateUploadDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DomainNameStatus: S.optional(DomainNameStatus),
    DomainNameStatusMessage: S.optional(S.String),
    EndpointType: S.optional(EndpointType),
    HostedZoneId: S.optional(S.String),
    IpAddressType: S.optional(IpAddressType),
    SecurityPolicy: S.optional(SecurityPolicy),
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
      OwnershipVerificationCertificateArn:
        "ownershipVerificationCertificateArn",
    }),
  ),
).annotate({
  identifier: "DomainNameConfiguration",
}) as any as S.Schema<DomainNameConfiguration>;
export type DomainNameConfigurations = DomainNameConfiguration[];
export const DomainNameConfigurations = S.Array(DomainNameConfiguration);
export interface MutualTlsAuthenticationInput {
  TruststoreUri?: string;
  TruststoreVersion?: string;
}
export const MutualTlsAuthenticationInput = S.suspend(() =>
  S.Struct({
    TruststoreUri: S.optional(S.String),
    TruststoreVersion: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      TruststoreUri: "truststoreUri",
      TruststoreVersion: "truststoreVersion",
    }),
  ),
).annotate({
  identifier: "MutualTlsAuthenticationInput",
}) as any as S.Schema<MutualTlsAuthenticationInput>;
export type RoutingMode =
  | "API_MAPPING_ONLY"
  | "ROUTING_RULE_ONLY"
  | "ROUTING_RULE_THEN_API_MAPPING"
  | (string & {});
export const RoutingMode = S.String;
export interface CreateDomainNameRequest {
  DomainName?: string;
  DomainNameConfigurations?: DomainNameConfiguration[];
  MutualTlsAuthentication?: MutualTlsAuthenticationInput;
  RoutingMode?: RoutingMode;
  Tags?: { [key: string]: string | undefined };
}
export const CreateDomainNameRequest = S.suspend(() =>
  S.Struct({
    DomainName: S.optional(S.String),
    DomainNameConfigurations: S.optional(DomainNameConfigurations),
    MutualTlsAuthentication: S.optional(MutualTlsAuthenticationInput),
    RoutingMode: S.optional(RoutingMode),
    Tags: S.optional(Tags),
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
      T.all(
        T.Http({ method: "POST", uri: "/v2/domainnames" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateDomainNameRequest",
}) as any as S.Schema<CreateDomainNameRequest>;
export interface MutualTlsAuthentication {
  TruststoreUri?: string;
  TruststoreVersion?: string;
  TruststoreWarnings?: string[];
}
export const MutualTlsAuthentication = S.suspend(() =>
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
).annotate({
  identifier: "MutualTlsAuthentication",
}) as any as S.Schema<MutualTlsAuthentication>;
export interface CreateDomainNameResponse {
  ApiMappingSelectionExpression?: string;
  DomainName?: string;
  DomainNameArn?: string;
  DomainNameConfigurations?: DomainNameConfiguration[];
  MutualTlsAuthentication?: MutualTlsAuthentication;
  RoutingMode?: RoutingMode;
  Tags?: { [key: string]: string | undefined };
}
export const CreateDomainNameResponse = S.suspend(() =>
  S.Struct({
    ApiMappingSelectionExpression: S.optional(S.String),
    DomainName: S.optional(S.String),
    DomainNameArn: S.optional(S.String),
    DomainNameConfigurations: S.optional(DomainNameConfigurations),
    MutualTlsAuthentication: S.optional(MutualTlsAuthentication),
    RoutingMode: S.optional(RoutingMode),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "CreateDomainNameResponse",
}) as any as S.Schema<CreateDomainNameResponse>;
export type ConnectionType = "INTERNET" | "VPC_LINK" | (string & {});
export const ConnectionType = S.String;
export type ContentHandlingStrategy =
  | "CONVERT_TO_BINARY"
  | "CONVERT_TO_TEXT"
  | (string & {});
export const ContentHandlingStrategy = S.String;
export type IntegrationType =
  | "AWS"
  | "HTTP"
  | "MOCK"
  | "HTTP_PROXY"
  | "AWS_PROXY"
  | (string & {});
export const IntegrationType = S.String;
export type PassthroughBehavior =
  | "WHEN_NO_MATCH"
  | "NEVER"
  | "WHEN_NO_TEMPLATES"
  | (string & {});
export const PassthroughBehavior = S.String;
export type IntegrationParameters = { [key: string]: string | undefined };
export const IntegrationParameters = S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type TemplateMap = { [key: string]: string | undefined };
export const TemplateMap = S.Record(S.String, S.String.pipe(S.optional));
export type ResponseParameters = {
  [key: string]: { [key: string]: string | undefined } | undefined;
};
export const ResponseParameters = S.Record(
  S.String,
  IntegrationParameters.pipe(S.optional),
);
export interface TlsConfigInput {
  ServerNameToVerify?: string;
}
export const TlsConfigInput = S.suspend(() =>
  S.Struct({ ServerNameToVerify: S.optional(S.String) }).pipe(
    S.encodeKeys({ ServerNameToVerify: "serverNameToVerify" }),
  ),
).annotate({ identifier: "TlsConfigInput" }) as any as S.Schema<TlsConfigInput>;
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
export const CreateIntegrationRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ConnectionId: S.optional(S.String),
    ConnectionType: S.optional(ConnectionType),
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    CredentialsArn: S.optional(S.String),
    Description: S.optional(S.String),
    IntegrationMethod: S.optional(S.String),
    IntegrationSubtype: S.optional(S.String),
    IntegrationType: S.optional(IntegrationType),
    IntegrationUri: S.optional(S.String),
    PassthroughBehavior: S.optional(PassthroughBehavior),
    PayloadFormatVersion: S.optional(S.String),
    RequestParameters: S.optional(IntegrationParameters),
    RequestTemplates: S.optional(TemplateMap),
    ResponseParameters: S.optional(ResponseParameters),
    TemplateSelectionExpression: S.optional(S.String),
    TimeoutInMillis: S.optional(S.Number),
    TlsConfig: S.optional(TlsConfigInput),
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
).annotate({
  identifier: "CreateIntegrationRequest",
}) as any as S.Schema<CreateIntegrationRequest>;
export interface TlsConfig {
  ServerNameToVerify?: string;
}
export const TlsConfig = S.suspend(() =>
  S.Struct({ ServerNameToVerify: S.optional(S.String) }).pipe(
    S.encodeKeys({ ServerNameToVerify: "serverNameToVerify" }),
  ),
).annotate({ identifier: "TlsConfig" }) as any as S.Schema<TlsConfig>;
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
export const CreateIntegrationResult = S.suspend(() =>
  S.Struct({
    ApiGatewayManaged: S.optional(S.Boolean),
    ConnectionId: S.optional(S.String),
    ConnectionType: S.optional(ConnectionType),
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    CredentialsArn: S.optional(S.String),
    Description: S.optional(S.String),
    IntegrationId: S.optional(S.String),
    IntegrationMethod: S.optional(S.String),
    IntegrationResponseSelectionExpression: S.optional(S.String),
    IntegrationSubtype: S.optional(S.String),
    IntegrationType: S.optional(IntegrationType),
    IntegrationUri: S.optional(S.String),
    PassthroughBehavior: S.optional(PassthroughBehavior),
    PayloadFormatVersion: S.optional(S.String),
    RequestParameters: S.optional(IntegrationParameters),
    RequestTemplates: S.optional(TemplateMap),
    ResponseParameters: S.optional(ResponseParameters),
    TemplateSelectionExpression: S.optional(S.String),
    TimeoutInMillis: S.optional(S.Number),
    TlsConfig: S.optional(TlsConfig),
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
      IntegrationResponseSelectionExpression:
        "integrationResponseSelectionExpression",
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
).annotate({
  identifier: "CreateIntegrationResult",
}) as any as S.Schema<CreateIntegrationResult>;
export interface CreateIntegrationResponseRequest {
  ApiId: string;
  ContentHandlingStrategy?: ContentHandlingStrategy;
  IntegrationId: string;
  IntegrationResponseKey?: string;
  ResponseParameters?: { [key: string]: string | undefined };
  ResponseTemplates?: { [key: string]: string | undefined };
  TemplateSelectionExpression?: string;
}
export const CreateIntegrationResponseRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
    IntegrationResponseKey: S.optional(S.String),
    ResponseParameters: S.optional(IntegrationParameters),
    ResponseTemplates: S.optional(TemplateMap),
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
).annotate({
  identifier: "CreateIntegrationResponseRequest",
}) as any as S.Schema<CreateIntegrationResponseRequest>;
export interface CreateIntegrationResponseResponse {
  ContentHandlingStrategy?: ContentHandlingStrategy;
  IntegrationResponseId?: string;
  IntegrationResponseKey?: string;
  ResponseParameters?: { [key: string]: string | undefined };
  ResponseTemplates?: { [key: string]: string | undefined };
  TemplateSelectionExpression?: string;
}
export const CreateIntegrationResponseResponse = S.suspend(() =>
  S.Struct({
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    IntegrationResponseId: S.optional(S.String),
    IntegrationResponseKey: S.optional(S.String),
    ResponseParameters: S.optional(IntegrationParameters),
    ResponseTemplates: S.optional(TemplateMap),
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
).annotate({
  identifier: "CreateIntegrationResponseResponse",
}) as any as S.Schema<CreateIntegrationResponseResponse>;
export interface CreateModelRequest {
  ApiId: string;
  ContentType?: string;
  Description?: string;
  Name?: string;
  Schema?: string;
}
export const CreateModelRequest = S.suspend(() =>
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
).annotate({
  identifier: "CreateModelRequest",
}) as any as S.Schema<CreateModelRequest>;
export interface CreateModelResponse {
  ContentType?: string;
  Description?: string;
  ModelId?: string;
  Name?: string;
  Schema?: string;
}
export const CreateModelResponse = S.suspend(() =>
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
).annotate({
  identifier: "CreateModelResponse",
}) as any as S.Schema<CreateModelResponse>;
export interface CognitoConfig {
  AppClientId?: string;
  UserPoolArn?: string;
  UserPoolDomain?: string;
}
export const CognitoConfig = S.suspend(() =>
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
).annotate({ identifier: "CognitoConfig" }) as any as S.Schema<CognitoConfig>;
export interface None {}
export const None = S.suspend(() => S.Struct({})).annotate({
  identifier: "None",
}) as any as S.Schema<None>;
export interface Authorization {
  CognitoConfig?: CognitoConfig;
  None?: None;
}
export const Authorization = S.suspend(() =>
  S.Struct({
    CognitoConfig: S.optional(CognitoConfig),
    None: S.optional(None),
  }).pipe(S.encodeKeys({ CognitoConfig: "cognitoConfig", None: "none" })),
).annotate({ identifier: "Authorization" }) as any as S.Schema<Authorization>;
export interface ACMManaged {
  CertificateArn?: string;
  DomainName?: string;
}
export const ACMManaged = S.suspend(() =>
  S.Struct({
    CertificateArn: S.optional(S.String),
    DomainName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      CertificateArn: "certificateArn",
      DomainName: "domainName",
    }),
  ),
).annotate({ identifier: "ACMManaged" }) as any as S.Schema<ACMManaged>;
export interface EndpointConfigurationRequest {
  AcmManaged?: ACMManaged;
  None?: None;
}
export const EndpointConfigurationRequest = S.suspend(() =>
  S.Struct({ AcmManaged: S.optional(ACMManaged), None: S.optional(None) }).pipe(
    S.encodeKeys({ AcmManaged: "acmManaged", None: "none" }),
  ),
).annotate({
  identifier: "EndpointConfigurationRequest",
}) as any as S.Schema<EndpointConfigurationRequest>;
export type __listOf__stringMin20Max2048 = string[];
export const __listOf__stringMin20Max2048 = S.Array(S.String);
export interface CustomColors {
  AccentColor?: string;
  BackgroundColor?: string;
  ErrorValidationColor?: string;
  HeaderColor?: string;
  NavigationColor?: string;
  TextColor?: string;
}
export const CustomColors = S.suspend(() =>
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
).annotate({ identifier: "CustomColors" }) as any as S.Schema<CustomColors>;
export interface PortalTheme {
  CustomColors?: CustomColors;
  LogoLastUploaded?: Date;
}
export const PortalTheme = S.suspend(() =>
  S.Struct({
    CustomColors: S.optional(CustomColors),
    LogoLastUploaded: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }).pipe(
    S.encodeKeys({
      CustomColors: "customColors",
      LogoLastUploaded: "logoLastUploaded",
    }),
  ),
).annotate({ identifier: "PortalTheme" }) as any as S.Schema<PortalTheme>;
export interface PortalContent {
  Description?: string;
  DisplayName?: string;
  Theme?: PortalTheme;
}
export const PortalContent = S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    Theme: S.optional(PortalTheme),
  }).pipe(
    S.encodeKeys({
      Description: "description",
      DisplayName: "displayName",
      Theme: "theme",
    }),
  ),
).annotate({ identifier: "PortalContent" }) as any as S.Schema<PortalContent>;
export interface CreatePortalRequest {
  Authorization?: Authorization;
  EndpointConfiguration?: EndpointConfigurationRequest;
  IncludedPortalProductArns?: string[];
  LogoUri?: string;
  PortalContent?: PortalContent;
  RumAppMonitorName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreatePortalRequest = S.suspend(() =>
  S.Struct({
    Authorization: S.optional(Authorization),
    EndpointConfiguration: S.optional(EndpointConfigurationRequest),
    IncludedPortalProductArns: S.optional(__listOf__stringMin20Max2048),
    LogoUri: S.optional(S.String),
    PortalContent: S.optional(PortalContent),
    RumAppMonitorName: S.optional(S.String),
    Tags: S.optional(Tags),
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
      T.all(
        T.Http({ method: "POST", uri: "/v2/portals" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreatePortalRequest",
}) as any as S.Schema<CreatePortalRequest>;
export interface EndpointConfigurationResponse {
  CertificateArn?: string;
  DomainName?: string;
  PortalDefaultDomainName?: string;
  PortalDomainHostedZoneId?: string;
}
export const EndpointConfigurationResponse = S.suspend(() =>
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
).annotate({
  identifier: "EndpointConfigurationResponse",
}) as any as S.Schema<EndpointConfigurationResponse>;
export type PublishStatus =
  | "PUBLISHED"
  | "PUBLISH_IN_PROGRESS"
  | "PUBLISH_FAILED"
  | "DISABLED"
  | (string & {});
export const PublishStatus = S.String;
export interface StatusException {
  Exception?: string;
  Message?: string;
}
export const StatusException = S.suspend(() =>
  S.Struct({
    Exception: S.optional(S.String),
    Message: S.optional(S.String),
  }).pipe(S.encodeKeys({ Exception: "exception", Message: "message" })),
).annotate({
  identifier: "StatusException",
}) as any as S.Schema<StatusException>;
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
export const CreatePortalResponse = S.suspend(() =>
  S.Struct({
    Authorization: S.optional(Authorization),
    EndpointConfiguration: S.optional(EndpointConfigurationResponse),
    IncludedPortalProductArns: S.optional(__listOf__stringMin20Max2048),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastPublished: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastPublishedDescription: S.optional(S.String),
    PortalArn: S.optional(S.String),
    PortalContent: S.optional(PortalContent),
    PortalId: S.optional(S.String),
    PublishStatus: S.optional(PublishStatus),
    RumAppMonitorName: S.optional(S.String),
    StatusException: S.optional(StatusException),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "CreatePortalResponse",
}) as any as S.Schema<CreatePortalResponse>;
export interface CreatePortalProductRequest {
  Description?: string;
  DisplayName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreatePortalProductRequest = S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        Description: "description",
        DisplayName: "displayName",
        Tags: "tags",
      }),
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
).annotate({
  identifier: "CreatePortalProductRequest",
}) as any as S.Schema<CreatePortalProductRequest>;
export interface Section {
  ProductRestEndpointPageArns?: string[];
  SectionName?: string;
}
export const Section = S.suspend(() =>
  S.Struct({
    ProductRestEndpointPageArns: S.optional(__listOf__stringMin20Max2048),
    SectionName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ProductRestEndpointPageArns: "productRestEndpointPageArns",
      SectionName: "sectionName",
    }),
  ),
).annotate({ identifier: "Section" }) as any as S.Schema<Section>;
export type __listOfSection = Section[];
export const __listOfSection = S.Array(Section);
export interface DisplayOrder {
  Contents?: Section[];
  OverviewPageArn?: string;
  ProductPageArns?: string[];
}
export const DisplayOrder = S.suspend(() =>
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
).annotate({ identifier: "DisplayOrder" }) as any as S.Schema<DisplayOrder>;
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
export const CreatePortalProductResponse = S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    DisplayOrder: S.optional(DisplayOrder),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    PortalProductArn: S.optional(S.String),
    PortalProductId: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "CreatePortalProductResponse",
}) as any as S.Schema<CreatePortalProductResponse>;
export interface DisplayContent {
  Body?: string;
  Title?: string;
}
export const DisplayContent = S.suspend(() =>
  S.Struct({ Body: S.optional(S.String), Title: S.optional(S.String) }).pipe(
    S.encodeKeys({ Body: "body", Title: "title" }),
  ),
).annotate({ identifier: "DisplayContent" }) as any as S.Schema<DisplayContent>;
export interface CreateProductPageRequest {
  DisplayContent?: DisplayContent;
  PortalProductId: string;
}
export const CreateProductPageRequest = S.suspend(() =>
  S.Struct({
    DisplayContent: S.optional(DisplayContent),
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
  })
    .pipe(S.encodeKeys({ DisplayContent: "displayContent" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v2/portalproducts/{PortalProductId}/productpages",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateProductPageRequest",
}) as any as S.Schema<CreateProductPageRequest>;
export interface CreateProductPageResponse {
  DisplayContent?: DisplayContent & {
    Body: __stringMin1Max32768;
    Title: __stringMin1Max255;
  };
  LastModified?: Date;
  ProductPageArn?: string;
  ProductPageId?: string;
}
export const CreateProductPageResponse = S.suspend(() =>
  S.Struct({
    DisplayContent: S.optional(DisplayContent),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
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
).annotate({
  identifier: "CreateProductPageResponse",
}) as any as S.Schema<CreateProductPageResponse>;
export interface DisplayContentOverrides {
  Body?: string;
  Endpoint?: string;
  OperationName?: string;
}
export const DisplayContentOverrides = S.suspend(() =>
  S.Struct({
    Body: S.optional(S.String),
    Endpoint: S.optional(S.String),
    OperationName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Body: "body",
      Endpoint: "endpoint",
      OperationName: "operationName",
    }),
  ),
).annotate({
  identifier: "DisplayContentOverrides",
}) as any as S.Schema<DisplayContentOverrides>;
export interface EndpointDisplayContent {
  None?: None;
  Overrides?: DisplayContentOverrides;
}
export const EndpointDisplayContent = S.suspend(() =>
  S.Struct({
    None: S.optional(None),
    Overrides: S.optional(DisplayContentOverrides),
  }).pipe(S.encodeKeys({ None: "none", Overrides: "overrides" })),
).annotate({
  identifier: "EndpointDisplayContent",
}) as any as S.Schema<EndpointDisplayContent>;
export interface IdentifierParts {
  Method?: string;
  Path?: string;
  RestApiId?: string;
  Stage?: string;
}
export const IdentifierParts = S.suspend(() =>
  S.Struct({
    Method: S.optional(S.String),
    Path: S.optional(S.String),
    RestApiId: S.optional(S.String),
    Stage: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Method: "method",
      Path: "path",
      RestApiId: "restApiId",
      Stage: "stage",
    }),
  ),
).annotate({
  identifier: "IdentifierParts",
}) as any as S.Schema<IdentifierParts>;
export interface RestEndpointIdentifier {
  IdentifierParts?: IdentifierParts;
}
export const RestEndpointIdentifier = S.suspend(() =>
  S.Struct({ IdentifierParts: S.optional(IdentifierParts) }).pipe(
    S.encodeKeys({ IdentifierParts: "identifierParts" }),
  ),
).annotate({
  identifier: "RestEndpointIdentifier",
}) as any as S.Schema<RestEndpointIdentifier>;
export type TryItState = "ENABLED" | "DISABLED" | (string & {});
export const TryItState = S.String;
export interface CreateProductRestEndpointPageRequest {
  DisplayContent?: EndpointDisplayContent;
  PortalProductId: string;
  RestEndpointIdentifier?: RestEndpointIdentifier;
  TryItState?: TryItState;
}
export const CreateProductRestEndpointPageRequest = S.suspend(() =>
  S.Struct({
    DisplayContent: S.optional(EndpointDisplayContent),
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
    RestEndpointIdentifier: S.optional(RestEndpointIdentifier),
    TryItState: S.optional(TryItState),
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
).annotate({
  identifier: "CreateProductRestEndpointPageRequest",
}) as any as S.Schema<CreateProductRestEndpointPageRequest>;
export interface EndpointDisplayContentResponse {
  Body?: string;
  Endpoint?: string;
  OperationName?: string;
}
export const EndpointDisplayContentResponse = S.suspend(() =>
  S.Struct({
    Body: S.optional(S.String),
    Endpoint: S.optional(S.String),
    OperationName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Body: "body",
      Endpoint: "endpoint",
      OperationName: "operationName",
    }),
  ),
).annotate({
  identifier: "EndpointDisplayContentResponse",
}) as any as S.Schema<EndpointDisplayContentResponse>;
export type Status = "AVAILABLE" | "IN_PROGRESS" | "FAILED" | (string & {});
export const Status = S.String;
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
export const CreateProductRestEndpointPageResponse = S.suspend(() =>
  S.Struct({
    DisplayContent: S.optional(EndpointDisplayContentResponse),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ProductRestEndpointPageArn: S.optional(S.String),
    ProductRestEndpointPageId: S.optional(S.String),
    RestEndpointIdentifier: S.optional(RestEndpointIdentifier),
    Status: S.optional(Status),
    StatusException: S.optional(StatusException),
    TryItState: S.optional(TryItState),
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
).annotate({
  identifier: "CreateProductRestEndpointPageResponse",
}) as any as S.Schema<CreateProductRestEndpointPageResponse>;
export type AuthorizationScopes = string[];
export const AuthorizationScopes = S.Array(S.String);
export type AuthorizationType =
  | "NONE"
  | "AWS_IAM"
  | "CUSTOM"
  | "JWT"
  | (string & {});
export const AuthorizationType = S.String;
export type RouteModels = { [key: string]: string | undefined };
export const RouteModels = S.Record(S.String, S.String.pipe(S.optional));
export interface ParameterConstraints {
  Required?: boolean;
}
export const ParameterConstraints = S.suspend(() =>
  S.Struct({ Required: S.optional(S.Boolean) }).pipe(
    S.encodeKeys({ Required: "required" }),
  ),
).annotate({
  identifier: "ParameterConstraints",
}) as any as S.Schema<ParameterConstraints>;
export type RouteParameters = {
  [key: string]: ParameterConstraints | undefined;
};
export const RouteParameters = S.Record(
  S.String,
  ParameterConstraints.pipe(S.optional),
);
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
export const CreateRouteRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ApiKeyRequired: S.optional(S.Boolean),
    AuthorizationScopes: S.optional(AuthorizationScopes),
    AuthorizationType: S.optional(AuthorizationType),
    AuthorizerId: S.optional(S.String),
    ModelSelectionExpression: S.optional(S.String),
    OperationName: S.optional(S.String),
    RequestModels: S.optional(RouteModels),
    RequestParameters: S.optional(RouteParameters),
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
).annotate({
  identifier: "CreateRouteRequest",
}) as any as S.Schema<CreateRouteRequest>;
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
export const CreateRouteResult = S.suspend(() =>
  S.Struct({
    ApiGatewayManaged: S.optional(S.Boolean),
    ApiKeyRequired: S.optional(S.Boolean),
    AuthorizationScopes: S.optional(AuthorizationScopes),
    AuthorizationType: S.optional(AuthorizationType),
    AuthorizerId: S.optional(S.String),
    ModelSelectionExpression: S.optional(S.String),
    OperationName: S.optional(S.String),
    RequestModels: S.optional(RouteModels),
    RequestParameters: S.optional(RouteParameters),
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
).annotate({
  identifier: "CreateRouteResult",
}) as any as S.Schema<CreateRouteResult>;
export interface CreateRouteResponseRequest {
  ApiId: string;
  ModelSelectionExpression?: string;
  ResponseModels?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteId: string;
  RouteResponseKey?: string;
}
export const CreateRouteResponseRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ModelSelectionExpression: S.optional(S.String),
    ResponseModels: S.optional(RouteModels),
    ResponseParameters: S.optional(RouteParameters),
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
        T.Http({
          method: "POST",
          uri: "/v2/apis/{ApiId}/routes/{RouteId}/routeresponses",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateRouteResponseRequest",
}) as any as S.Schema<CreateRouteResponseRequest>;
export interface CreateRouteResponseResponse {
  ModelSelectionExpression?: string;
  ResponseModels?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteResponseId?: string;
  RouteResponseKey?: string;
}
export const CreateRouteResponseResponse = S.suspend(() =>
  S.Struct({
    ModelSelectionExpression: S.optional(S.String),
    ResponseModels: S.optional(RouteModels),
    ResponseParameters: S.optional(RouteParameters),
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
).annotate({
  identifier: "CreateRouteResponseResponse",
}) as any as S.Schema<CreateRouteResponseResponse>;
export interface RoutingRuleActionInvokeApi {
  ApiId?: string;
  Stage?: string;
  StripBasePath?: boolean;
}
export const RoutingRuleActionInvokeApi = S.suspend(() =>
  S.Struct({
    ApiId: S.optional(S.String),
    Stage: S.optional(S.String),
    StripBasePath: S.optional(S.Boolean),
  }).pipe(
    S.encodeKeys({
      ApiId: "apiId",
      Stage: "stage",
      StripBasePath: "stripBasePath",
    }),
  ),
).annotate({
  identifier: "RoutingRuleActionInvokeApi",
}) as any as S.Schema<RoutingRuleActionInvokeApi>;
export interface RoutingRuleAction {
  InvokeApi?: RoutingRuleActionInvokeApi;
}
export const RoutingRuleAction = S.suspend(() =>
  S.Struct({ InvokeApi: S.optional(RoutingRuleActionInvokeApi) }).pipe(
    S.encodeKeys({ InvokeApi: "invokeApi" }),
  ),
).annotate({
  identifier: "RoutingRuleAction",
}) as any as S.Schema<RoutingRuleAction>;
export type __listOfRoutingRuleAction = RoutingRuleAction[];
export const __listOfRoutingRuleAction = S.Array(RoutingRuleAction);
export type __listOfSelectionKey = string[];
export const __listOfSelectionKey = S.Array(S.String);
export interface RoutingRuleMatchBasePaths {
  AnyOf?: string[];
}
export const RoutingRuleMatchBasePaths = S.suspend(() =>
  S.Struct({ AnyOf: S.optional(__listOfSelectionKey) }).pipe(
    S.encodeKeys({ AnyOf: "anyOf" }),
  ),
).annotate({
  identifier: "RoutingRuleMatchBasePaths",
}) as any as S.Schema<RoutingRuleMatchBasePaths>;
export interface RoutingRuleMatchHeaderValue {
  Header?: string;
  ValueGlob?: string;
}
export const RoutingRuleMatchHeaderValue = S.suspend(() =>
  S.Struct({
    Header: S.optional(S.String),
    ValueGlob: S.optional(S.String),
  }).pipe(S.encodeKeys({ Header: "header", ValueGlob: "valueGlob" })),
).annotate({
  identifier: "RoutingRuleMatchHeaderValue",
}) as any as S.Schema<RoutingRuleMatchHeaderValue>;
export type __listOfRoutingRuleMatchHeaderValue = RoutingRuleMatchHeaderValue[];
export const __listOfRoutingRuleMatchHeaderValue = S.Array(
  RoutingRuleMatchHeaderValue,
);
export interface RoutingRuleMatchHeaders {
  AnyOf?: RoutingRuleMatchHeaderValue[];
}
export const RoutingRuleMatchHeaders = S.suspend(() =>
  S.Struct({ AnyOf: S.optional(__listOfRoutingRuleMatchHeaderValue) }).pipe(
    S.encodeKeys({ AnyOf: "anyOf" }),
  ),
).annotate({
  identifier: "RoutingRuleMatchHeaders",
}) as any as S.Schema<RoutingRuleMatchHeaders>;
export interface RoutingRuleCondition {
  MatchBasePaths?: RoutingRuleMatchBasePaths;
  MatchHeaders?: RoutingRuleMatchHeaders;
}
export const RoutingRuleCondition = S.suspend(() =>
  S.Struct({
    MatchBasePaths: S.optional(RoutingRuleMatchBasePaths),
    MatchHeaders: S.optional(RoutingRuleMatchHeaders),
  }).pipe(
    S.encodeKeys({
      MatchBasePaths: "matchBasePaths",
      MatchHeaders: "matchHeaders",
    }),
  ),
).annotate({
  identifier: "RoutingRuleCondition",
}) as any as S.Schema<RoutingRuleCondition>;
export type __listOfRoutingRuleCondition = RoutingRuleCondition[];
export const __listOfRoutingRuleCondition = S.Array(RoutingRuleCondition);
export interface CreateRoutingRuleRequest {
  Actions?: RoutingRuleAction[];
  Conditions?: RoutingRuleCondition[];
  DomainName: string;
  DomainNameId?: string;
  Priority?: number;
}
export const CreateRoutingRuleRequest = S.suspend(() =>
  S.Struct({
    Actions: S.optional(__listOfRoutingRuleAction),
    Conditions: S.optional(__listOfRoutingRuleCondition),
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    DomainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
    Priority: S.optional(S.Number),
  })
    .pipe(
      S.encodeKeys({
        Actions: "actions",
        Conditions: "conditions",
        Priority: "priority",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v2/domainnames/{DomainName}/routingrules",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateRoutingRuleRequest",
}) as any as S.Schema<CreateRoutingRuleRequest>;
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
export const CreateRoutingRuleResponse = S.suspend(() =>
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
).annotate({
  identifier: "CreateRoutingRuleResponse",
}) as any as S.Schema<CreateRoutingRuleResponse>;
export interface AccessLogSettings {
  DestinationArn?: string;
  Format?: string;
}
export const AccessLogSettings = S.suspend(() =>
  S.Struct({
    DestinationArn: S.optional(S.String),
    Format: S.optional(S.String),
  }).pipe(S.encodeKeys({ DestinationArn: "destinationArn", Format: "format" })),
).annotate({
  identifier: "AccessLogSettings",
}) as any as S.Schema<AccessLogSettings>;
export type LoggingLevel = "ERROR" | "INFO" | "OFF" | (string & {});
export const LoggingLevel = S.String;
export interface RouteSettings {
  DataTraceEnabled?: boolean;
  DetailedMetricsEnabled?: boolean;
  LoggingLevel?: LoggingLevel;
  ThrottlingBurstLimit?: number;
  ThrottlingRateLimit?: number;
}
export const RouteSettings = S.suspend(() =>
  S.Struct({
    DataTraceEnabled: S.optional(S.Boolean),
    DetailedMetricsEnabled: S.optional(S.Boolean),
    LoggingLevel: S.optional(LoggingLevel),
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
).annotate({ identifier: "RouteSettings" }) as any as S.Schema<RouteSettings>;
export type RouteSettingsMap = { [key: string]: RouteSettings | undefined };
export const RouteSettingsMap = S.Record(
  S.String,
  RouteSettings.pipe(S.optional),
);
export type StageVariablesMap = { [key: string]: string | undefined };
export const StageVariablesMap = S.Record(S.String, S.String.pipe(S.optional));
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
export const CreateStageRequest = S.suspend(() =>
  S.Struct({
    AccessLogSettings: S.optional(AccessLogSettings),
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    AutoDeploy: S.optional(S.Boolean),
    ClientCertificateId: S.optional(S.String),
    DefaultRouteSettings: S.optional(RouteSettings),
    DeploymentId: S.optional(S.String),
    Description: S.optional(S.String),
    RouteSettings: S.optional(RouteSettingsMap),
    StageName: S.optional(S.String),
    StageVariables: S.optional(StageVariablesMap),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "CreateStageRequest",
}) as any as S.Schema<CreateStageRequest>;
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
export const CreateStageResponse = S.suspend(() =>
  S.Struct({
    AccessLogSettings: S.optional(AccessLogSettings),
    ApiGatewayManaged: S.optional(S.Boolean),
    AutoDeploy: S.optional(S.Boolean),
    ClientCertificateId: S.optional(S.String),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DefaultRouteSettings: S.optional(RouteSettings),
    DeploymentId: S.optional(S.String),
    Description: S.optional(S.String),
    LastDeploymentStatusMessage: S.optional(S.String),
    LastUpdatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    RouteSettings: S.optional(RouteSettingsMap),
    StageName: S.optional(S.String),
    StageVariables: S.optional(StageVariablesMap),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "CreateStageResponse",
}) as any as S.Schema<CreateStageResponse>;
export type SecurityGroupIdList = string[];
export const SecurityGroupIdList = S.Array(S.String);
export type SubnetIdList = string[];
export const SubnetIdList = S.Array(S.String);
export interface CreateVpcLinkRequest {
  Name?: string;
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
  Tags?: { [key: string]: string | undefined };
}
export const CreateVpcLinkRequest = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    SecurityGroupIds: S.optional(SecurityGroupIdList),
    SubnetIds: S.optional(SubnetIdList),
    Tags: S.optional(Tags),
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
      T.all(
        T.Http({ method: "POST", uri: "/v2/vpclinks" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateVpcLinkRequest",
}) as any as S.Schema<CreateVpcLinkRequest>;
export type VpcLinkStatus =
  | "PENDING"
  | "AVAILABLE"
  | "DELETING"
  | "FAILED"
  | "INACTIVE"
  | (string & {});
export const VpcLinkStatus = S.String;
export type VpcLinkVersion = "V2" | (string & {});
export const VpcLinkVersion = S.String;
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
export const CreateVpcLinkResponse = S.suspend(() =>
  S.Struct({
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Name: S.optional(S.String),
    SecurityGroupIds: S.optional(SecurityGroupIdList),
    SubnetIds: S.optional(SubnetIdList),
    Tags: S.optional(Tags),
    VpcLinkId: S.optional(S.String),
    VpcLinkStatus: S.optional(VpcLinkStatus),
    VpcLinkStatusMessage: S.optional(S.String),
    VpcLinkVersion: S.optional(VpcLinkVersion),
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
).annotate({
  identifier: "CreateVpcLinkResponse",
}) as any as S.Schema<CreateVpcLinkResponse>;
export interface DeleteAccessLogSettingsRequest {
  ApiId: string;
  StageName: string;
}
export const DeleteAccessLogSettingsRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteAccessLogSettingsRequest",
}) as any as S.Schema<DeleteAccessLogSettingsRequest>;
export interface DeleteAccessLogSettingsResponse {}
export const DeleteAccessLogSettingsResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAccessLogSettingsResponse",
}) as any as S.Schema<DeleteAccessLogSettingsResponse>;
export interface DeleteApiRequest {
  ApiId: string;
}
export const DeleteApiRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteApiRequest",
}) as any as S.Schema<DeleteApiRequest>;
export interface DeleteApiResponse {}
export const DeleteApiResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteApiResponse",
}) as any as S.Schema<DeleteApiResponse>;
export interface DeleteApiMappingRequest {
  ApiMappingId: string;
  DomainName: string;
}
export const DeleteApiMappingRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteApiMappingRequest",
}) as any as S.Schema<DeleteApiMappingRequest>;
export interface DeleteApiMappingResponse {}
export const DeleteApiMappingResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteApiMappingResponse",
}) as any as S.Schema<DeleteApiMappingResponse>;
export interface DeleteAuthorizerRequest {
  ApiId: string;
  AuthorizerId: string;
}
export const DeleteAuthorizerRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    AuthorizerId: S.String.pipe(T.HttpLabel("AuthorizerId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/apis/{ApiId}/authorizers/{AuthorizerId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAuthorizerRequest",
}) as any as S.Schema<DeleteAuthorizerRequest>;
export interface DeleteAuthorizerResponse {}
export const DeleteAuthorizerResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteAuthorizerResponse",
}) as any as S.Schema<DeleteAuthorizerResponse>;
export interface DeleteCorsConfigurationRequest {
  ApiId: string;
}
export const DeleteCorsConfigurationRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteCorsConfigurationRequest",
}) as any as S.Schema<DeleteCorsConfigurationRequest>;
export interface DeleteCorsConfigurationResponse {}
export const DeleteCorsConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCorsConfigurationResponse",
}) as any as S.Schema<DeleteCorsConfigurationResponse>;
export interface DeleteDeploymentRequest {
  ApiId: string;
  DeploymentId: string;
}
export const DeleteDeploymentRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    DeploymentId: S.String.pipe(T.HttpLabel("DeploymentId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/apis/{ApiId}/deployments/{DeploymentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDeploymentRequest",
}) as any as S.Schema<DeleteDeploymentRequest>;
export interface DeleteDeploymentResponse {}
export const DeleteDeploymentResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteDeploymentResponse",
}) as any as S.Schema<DeleteDeploymentResponse>;
export interface DeleteDomainNameRequest {
  DomainName: string;
}
export const DeleteDomainNameRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteDomainNameRequest",
}) as any as S.Schema<DeleteDomainNameRequest>;
export interface DeleteDomainNameResponse {}
export const DeleteDomainNameResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteDomainNameResponse",
}) as any as S.Schema<DeleteDomainNameResponse>;
export interface DeleteIntegrationRequest {
  ApiId: string;
  IntegrationId: string;
}
export const DeleteIntegrationRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/apis/{ApiId}/integrations/{IntegrationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIntegrationRequest",
}) as any as S.Schema<DeleteIntegrationRequest>;
export interface DeleteIntegrationResponse {}
export const DeleteIntegrationResponse = S.suspend(() => S.Struct({})).annotate(
  { identifier: "DeleteIntegrationResponse" },
) as any as S.Schema<DeleteIntegrationResponse>;
export interface DeleteIntegrationResponseRequest {
  ApiId: string;
  IntegrationId: string;
  IntegrationResponseId: string;
}
export const DeleteIntegrationResponseRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteIntegrationResponseRequest",
}) as any as S.Schema<DeleteIntegrationResponseRequest>;
export interface DeleteIntegrationResponseResponse {}
export const DeleteIntegrationResponseResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIntegrationResponseResponse",
}) as any as S.Schema<DeleteIntegrationResponseResponse>;
export interface DeleteModelRequest {
  ApiId: string;
  ModelId: string;
}
export const DeleteModelRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteModelRequest",
}) as any as S.Schema<DeleteModelRequest>;
export interface DeleteModelResponse {}
export const DeleteModelResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteModelResponse",
}) as any as S.Schema<DeleteModelResponse>;
export interface DeletePortalRequest {
  PortalId: string;
}
export const DeletePortalRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeletePortalRequest",
}) as any as S.Schema<DeletePortalRequest>;
export interface DeletePortalResponse {}
export const DeletePortalResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeletePortalResponse",
}) as any as S.Schema<DeletePortalResponse>;
export interface DeletePortalProductRequest {
  PortalProductId: string;
}
export const DeletePortalProductRequest = S.suspend(() =>
  S.Struct({
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v2/portalproducts/{PortalProductId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePortalProductRequest",
}) as any as S.Schema<DeletePortalProductRequest>;
export interface DeletePortalProductResponse {}
export const DeletePortalProductResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePortalProductResponse",
}) as any as S.Schema<DeletePortalProductResponse>;
export interface DeletePortalProductSharingPolicyRequest {
  PortalProductId: string;
}
export const DeletePortalProductSharingPolicyRequest = S.suspend(() =>
  S.Struct({
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/portalproducts/{PortalProductId}/sharingpolicy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePortalProductSharingPolicyRequest",
}) as any as S.Schema<DeletePortalProductSharingPolicyRequest>;
export interface DeletePortalProductSharingPolicyResponse {}
export const DeletePortalProductSharingPolicyResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePortalProductSharingPolicyResponse",
}) as any as S.Schema<DeletePortalProductSharingPolicyResponse>;
export interface DeleteProductPageRequest {
  PortalProductId: string;
  ProductPageId: string;
}
export const DeleteProductPageRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteProductPageRequest",
}) as any as S.Schema<DeleteProductPageRequest>;
export interface DeleteProductPageResponse {}
export const DeleteProductPageResponse = S.suspend(() => S.Struct({})).annotate(
  { identifier: "DeleteProductPageResponse" },
) as any as S.Schema<DeleteProductPageResponse>;
export interface DeleteProductRestEndpointPageRequest {
  PortalProductId: string;
  ProductRestEndpointPageId: string;
}
export const DeleteProductRestEndpointPageRequest = S.suspend(() =>
  S.Struct({
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
    ProductRestEndpointPageId: S.String.pipe(
      T.HttpLabel("ProductRestEndpointPageId"),
    ),
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
).annotate({
  identifier: "DeleteProductRestEndpointPageRequest",
}) as any as S.Schema<DeleteProductRestEndpointPageRequest>;
export interface DeleteProductRestEndpointPageResponse {}
export const DeleteProductRestEndpointPageResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteProductRestEndpointPageResponse",
}) as any as S.Schema<DeleteProductRestEndpointPageResponse>;
export interface DeleteRouteRequest {
  ApiId: string;
  RouteId: string;
}
export const DeleteRouteRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteRouteRequest",
}) as any as S.Schema<DeleteRouteRequest>;
export interface DeleteRouteResponse {}
export const DeleteRouteResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteRouteResponse",
}) as any as S.Schema<DeleteRouteResponse>;
export interface DeleteRouteRequestParameterRequest {
  ApiId: string;
  RequestParameterKey: string;
  RouteId: string;
}
export const DeleteRouteRequestParameterRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteRouteRequestParameterRequest",
}) as any as S.Schema<DeleteRouteRequestParameterRequest>;
export interface DeleteRouteRequestParameterResponse {}
export const DeleteRouteRequestParameterResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRouteRequestParameterResponse",
}) as any as S.Schema<DeleteRouteRequestParameterResponse>;
export interface DeleteRouteResponseRequest {
  ApiId: string;
  RouteId: string;
  RouteResponseId: string;
}
export const DeleteRouteResponseRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteRouteResponseRequest",
}) as any as S.Schema<DeleteRouteResponseRequest>;
export interface DeleteRouteResponseResponse {}
export const DeleteRouteResponseResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRouteResponseResponse",
}) as any as S.Schema<DeleteRouteResponseResponse>;
export interface DeleteRouteSettingsRequest {
  ApiId: string;
  RouteKey: string;
  StageName: string;
}
export const DeleteRouteSettingsRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteRouteSettingsRequest",
}) as any as S.Schema<DeleteRouteSettingsRequest>;
export interface DeleteRouteSettingsResponse {}
export const DeleteRouteSettingsResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRouteSettingsResponse",
}) as any as S.Schema<DeleteRouteSettingsResponse>;
export interface DeleteRoutingRuleRequest {
  DomainName: string;
  DomainNameId?: string;
  RoutingRuleId: string;
}
export const DeleteRoutingRuleRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteRoutingRuleRequest",
}) as any as S.Schema<DeleteRoutingRuleRequest>;
export interface DeleteRoutingRuleResponse {}
export const DeleteRoutingRuleResponse = S.suspend(() => S.Struct({})).annotate(
  { identifier: "DeleteRoutingRuleResponse" },
) as any as S.Schema<DeleteRoutingRuleResponse>;
export interface DeleteStageRequest {
  ApiId: string;
  StageName: string;
}
export const DeleteStageRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteStageRequest",
}) as any as S.Schema<DeleteStageRequest>;
export interface DeleteStageResponse {}
export const DeleteStageResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteStageResponse",
}) as any as S.Schema<DeleteStageResponse>;
export interface DeleteVpcLinkRequest {
  VpcLinkId: string;
}
export const DeleteVpcLinkRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteVpcLinkRequest",
}) as any as S.Schema<DeleteVpcLinkRequest>;
export interface DeleteVpcLinkResponse {}
export const DeleteVpcLinkResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteVpcLinkResponse",
}) as any as S.Schema<DeleteVpcLinkResponse>;
export interface DisablePortalRequest {
  PortalId: string;
}
export const DisablePortalRequest = S.suspend(() =>
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
).annotate({
  identifier: "DisablePortalRequest",
}) as any as S.Schema<DisablePortalRequest>;
export interface DisablePortalResponse {}
export const DisablePortalResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DisablePortalResponse",
}) as any as S.Schema<DisablePortalResponse>;
export interface ExportApiRequest {
  ApiId: string;
  ExportVersion?: string;
  IncludeExtensions?: boolean;
  OutputType?: string;
  Specification: string;
  StageName?: string;
}
export const ExportApiRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ExportVersion: S.optional(S.String).pipe(T.HttpQuery("exportVersion")),
    IncludeExtensions: S.optional(S.Boolean).pipe(
      T.HttpQuery("includeExtensions"),
    ),
    OutputType: S.optional(S.String).pipe(T.HttpQuery("outputType")),
    Specification: S.String.pipe(T.HttpLabel("Specification")),
    StageName: S.optional(S.String).pipe(T.HttpQuery("stageName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/apis/{ApiId}/exports/{Specification}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExportApiRequest",
}) as any as S.Schema<ExportApiRequest>;
export interface ExportApiResponse {
  body?: T.StreamingOutputBody;
}
export const ExportApiResponse = S.suspend(() =>
  S.Struct({ body: S.optional(T.StreamingOutput).pipe(T.HttpPayload()) }),
).annotate({
  identifier: "ExportApiResponse",
}) as any as S.Schema<ExportApiResponse>;
export interface GetApiRequest {
  ApiId: string;
}
export const GetApiRequest = S.suspend(() =>
  S.Struct({ ApiId: S.String.pipe(T.HttpLabel("ApiId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/apis/{ApiId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetApiRequest" }) as any as S.Schema<GetApiRequest>;
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
export const GetApiResponse = S.suspend(() =>
  S.Struct({
    ApiEndpoint: S.optional(S.String),
    ApiGatewayManaged: S.optional(S.Boolean),
    ApiId: S.optional(S.String),
    ApiKeySelectionExpression: S.optional(S.String),
    CorsConfiguration: S.optional(Cors),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    DisableSchemaValidation: S.optional(S.Boolean),
    DisableExecuteApiEndpoint: S.optional(S.Boolean),
    ImportInfo: S.optional(__listOf__string),
    IpAddressType: S.optional(IpAddressType),
    Name: S.optional(S.String),
    ProtocolType: S.optional(ProtocolType),
    RouteSelectionExpression: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({ identifier: "GetApiResponse" }) as any as S.Schema<GetApiResponse>;
export interface GetApiMappingRequest {
  ApiMappingId: string;
  DomainName: string;
}
export const GetApiMappingRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetApiMappingRequest",
}) as any as S.Schema<GetApiMappingRequest>;
export interface GetApiMappingResponse {
  ApiId?: string;
  ApiMappingId?: string;
  ApiMappingKey?: string;
  Stage?: string;
}
export const GetApiMappingResponse = S.suspend(() =>
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
).annotate({
  identifier: "GetApiMappingResponse",
}) as any as S.Schema<GetApiMappingResponse>;
export interface GetApiMappingsRequest {
  DomainName: string;
  MaxResults?: string;
  NextToken?: string;
}
export const GetApiMappingsRequest = S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domainnames/{DomainName}/apimappings",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApiMappingsRequest",
}) as any as S.Schema<GetApiMappingsRequest>;
export interface ApiMapping {
  ApiId?: string;
  ApiMappingId?: string;
  ApiMappingKey?: string;
  Stage?: string;
}
export const ApiMapping = S.suspend(() =>
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
).annotate({ identifier: "ApiMapping" }) as any as S.Schema<ApiMapping>;
export type __listOfApiMapping = ApiMapping[];
export const __listOfApiMapping = S.Array(ApiMapping);
export interface GetApiMappingsResponse {
  Items?: (ApiMapping & { ApiId: Id; Stage: StringWithLengthBetween1And128 })[];
  NextToken?: string;
}
export const GetApiMappingsResponse = S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfApiMapping),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetApiMappingsResponse",
}) as any as S.Schema<GetApiMappingsResponse>;
export interface GetApisRequest {
  MaxResults?: string;
  NextToken?: string;
}
export const GetApisRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/apis" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetApisRequest" }) as any as S.Schema<GetApisRequest>;
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
export const Api = S.suspend(() =>
  S.Struct({
    ApiEndpoint: S.optional(S.String),
    ApiGatewayManaged: S.optional(S.Boolean),
    ApiId: S.optional(S.String),
    ApiKeySelectionExpression: S.optional(S.String),
    CorsConfiguration: S.optional(Cors),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    DisableSchemaValidation: S.optional(S.Boolean),
    DisableExecuteApiEndpoint: S.optional(S.Boolean),
    ImportInfo: S.optional(__listOf__string),
    IpAddressType: S.optional(IpAddressType),
    Name: S.optional(S.String),
    ProtocolType: S.optional(ProtocolType),
    RouteSelectionExpression: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({ identifier: "Api" }) as any as S.Schema<Api>;
export type __listOfApi = Api[];
export const __listOfApi = S.Array(Api);
export interface GetApisResponse {
  Items?: (Api & {
    Name: StringWithLengthBetween1And128;
    ProtocolType: ProtocolType;
    RouteSelectionExpression: SelectionExpression;
  })[];
  NextToken?: string;
}
export const GetApisResponse = S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfApi),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetApisResponse",
}) as any as S.Schema<GetApisResponse>;
export interface GetAuthorizerRequest {
  ApiId: string;
  AuthorizerId: string;
}
export const GetAuthorizerRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    AuthorizerId: S.String.pipe(T.HttpLabel("AuthorizerId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/apis/{ApiId}/authorizers/{AuthorizerId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAuthorizerRequest",
}) as any as S.Schema<GetAuthorizerRequest>;
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
export const GetAuthorizerResponse = S.suspend(() =>
  S.Struct({
    AuthorizerCredentialsArn: S.optional(S.String),
    AuthorizerId: S.optional(S.String),
    AuthorizerPayloadFormatVersion: S.optional(S.String),
    AuthorizerResultTtlInSeconds: S.optional(S.Number),
    AuthorizerType: S.optional(AuthorizerType),
    AuthorizerUri: S.optional(S.String),
    EnableSimpleResponses: S.optional(S.Boolean),
    IdentitySource: S.optional(IdentitySourceList),
    IdentityValidationExpression: S.optional(S.String),
    JwtConfiguration: S.optional(JWTConfiguration),
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
).annotate({
  identifier: "GetAuthorizerResponse",
}) as any as S.Schema<GetAuthorizerResponse>;
export interface GetAuthorizersRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const GetAuthorizersRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetAuthorizersRequest",
}) as any as S.Schema<GetAuthorizersRequest>;
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
export const Authorizer = S.suspend(() =>
  S.Struct({
    AuthorizerCredentialsArn: S.optional(S.String),
    AuthorizerId: S.optional(S.String),
    AuthorizerPayloadFormatVersion: S.optional(S.String),
    AuthorizerResultTtlInSeconds: S.optional(S.Number),
    AuthorizerType: S.optional(AuthorizerType),
    AuthorizerUri: S.optional(S.String),
    EnableSimpleResponses: S.optional(S.Boolean),
    IdentitySource: S.optional(IdentitySourceList),
    IdentityValidationExpression: S.optional(S.String),
    JwtConfiguration: S.optional(JWTConfiguration),
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
).annotate({ identifier: "Authorizer" }) as any as S.Schema<Authorizer>;
export type __listOfAuthorizer = Authorizer[];
export const __listOfAuthorizer = S.Array(Authorizer);
export interface GetAuthorizersResponse {
  Items?: (Authorizer & { Name: StringWithLengthBetween1And128 })[];
  NextToken?: string;
}
export const GetAuthorizersResponse = S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfAuthorizer),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetAuthorizersResponse",
}) as any as S.Schema<GetAuthorizersResponse>;
export interface GetDeploymentRequest {
  ApiId: string;
  DeploymentId: string;
}
export const GetDeploymentRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    DeploymentId: S.String.pipe(T.HttpLabel("DeploymentId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/apis/{ApiId}/deployments/{DeploymentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeploymentRequest",
}) as any as S.Schema<GetDeploymentRequest>;
export interface GetDeploymentResponse {
  AutoDeployed?: boolean;
  CreatedDate?: Date;
  DeploymentId?: string;
  DeploymentStatus?: DeploymentStatus;
  DeploymentStatusMessage?: string;
  Description?: string;
}
export const GetDeploymentResponse = S.suspend(() =>
  S.Struct({
    AutoDeployed: S.optional(S.Boolean),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DeploymentId: S.optional(S.String),
    DeploymentStatus: S.optional(DeploymentStatus),
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
).annotate({
  identifier: "GetDeploymentResponse",
}) as any as S.Schema<GetDeploymentResponse>;
export interface GetDeploymentsRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const GetDeploymentsRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetDeploymentsRequest",
}) as any as S.Schema<GetDeploymentsRequest>;
export interface Deployment {
  AutoDeployed?: boolean;
  CreatedDate?: Date;
  DeploymentId?: string;
  DeploymentStatus?: DeploymentStatus;
  DeploymentStatusMessage?: string;
  Description?: string;
}
export const Deployment = S.suspend(() =>
  S.Struct({
    AutoDeployed: S.optional(S.Boolean),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DeploymentId: S.optional(S.String),
    DeploymentStatus: S.optional(DeploymentStatus),
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
).annotate({ identifier: "Deployment" }) as any as S.Schema<Deployment>;
export type __listOfDeployment = Deployment[];
export const __listOfDeployment = S.Array(Deployment);
export interface GetDeploymentsResponse {
  Items?: Deployment[];
  NextToken?: string;
}
export const GetDeploymentsResponse = S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfDeployment),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetDeploymentsResponse",
}) as any as S.Schema<GetDeploymentsResponse>;
export interface GetDomainNameRequest {
  DomainName: string;
}
export const GetDomainNameRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetDomainNameRequest",
}) as any as S.Schema<GetDomainNameRequest>;
export interface GetDomainNameResponse {
  ApiMappingSelectionExpression?: string;
  DomainName?: string;
  DomainNameArn?: string;
  DomainNameConfigurations?: DomainNameConfiguration[];
  MutualTlsAuthentication?: MutualTlsAuthentication;
  RoutingMode?: RoutingMode;
  Tags?: { [key: string]: string | undefined };
}
export const GetDomainNameResponse = S.suspend(() =>
  S.Struct({
    ApiMappingSelectionExpression: S.optional(S.String),
    DomainName: S.optional(S.String),
    DomainNameArn: S.optional(S.String),
    DomainNameConfigurations: S.optional(DomainNameConfigurations),
    MutualTlsAuthentication: S.optional(MutualTlsAuthentication),
    RoutingMode: S.optional(RoutingMode),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "GetDomainNameResponse",
}) as any as S.Schema<GetDomainNameResponse>;
export interface GetDomainNamesRequest {
  MaxResults?: string;
  NextToken?: string;
}
export const GetDomainNamesRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/domainnames" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDomainNamesRequest",
}) as any as S.Schema<GetDomainNamesRequest>;
export interface DomainName {
  ApiMappingSelectionExpression?: string;
  DomainName?: string;
  DomainNameArn?: string;
  DomainNameConfigurations?: DomainNameConfiguration[];
  MutualTlsAuthentication?: MutualTlsAuthentication;
  RoutingMode?: RoutingMode;
  Tags?: { [key: string]: string | undefined };
}
export const DomainName = S.suspend(() =>
  S.Struct({
    ApiMappingSelectionExpression: S.optional(S.String),
    DomainName: S.optional(S.String),
    DomainNameArn: S.optional(S.String),
    DomainNameConfigurations: S.optional(DomainNameConfigurations),
    MutualTlsAuthentication: S.optional(MutualTlsAuthentication),
    RoutingMode: S.optional(RoutingMode),
    Tags: S.optional(Tags),
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
).annotate({ identifier: "DomainName" }) as any as S.Schema<DomainName>;
export type __listOfDomainName = DomainName[];
export const __listOfDomainName = S.Array(DomainName);
export interface GetDomainNamesResponse {
  Items?: (DomainName & { DomainName: StringWithLengthBetween1And512 })[];
  NextToken?: string;
}
export const GetDomainNamesResponse = S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfDomainName),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetDomainNamesResponse",
}) as any as S.Schema<GetDomainNamesResponse>;
export interface GetIntegrationRequest {
  ApiId: string;
  IntegrationId: string;
}
export const GetIntegrationRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/apis/{ApiId}/integrations/{IntegrationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIntegrationRequest",
}) as any as S.Schema<GetIntegrationRequest>;
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
export const GetIntegrationResult = S.suspend(() =>
  S.Struct({
    ApiGatewayManaged: S.optional(S.Boolean),
    ConnectionId: S.optional(S.String),
    ConnectionType: S.optional(ConnectionType),
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    CredentialsArn: S.optional(S.String),
    Description: S.optional(S.String),
    IntegrationId: S.optional(S.String),
    IntegrationMethod: S.optional(S.String),
    IntegrationResponseSelectionExpression: S.optional(S.String),
    IntegrationSubtype: S.optional(S.String),
    IntegrationType: S.optional(IntegrationType),
    IntegrationUri: S.optional(S.String),
    PassthroughBehavior: S.optional(PassthroughBehavior),
    PayloadFormatVersion: S.optional(S.String),
    RequestParameters: S.optional(IntegrationParameters),
    RequestTemplates: S.optional(TemplateMap),
    ResponseParameters: S.optional(ResponseParameters),
    TemplateSelectionExpression: S.optional(S.String),
    TimeoutInMillis: S.optional(S.Number),
    TlsConfig: S.optional(TlsConfig),
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
      IntegrationResponseSelectionExpression:
        "integrationResponseSelectionExpression",
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
).annotate({
  identifier: "GetIntegrationResult",
}) as any as S.Schema<GetIntegrationResult>;
export interface GetIntegrationResponseRequest {
  ApiId: string;
  IntegrationId: string;
  IntegrationResponseId: string;
}
export const GetIntegrationResponseRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetIntegrationResponseRequest",
}) as any as S.Schema<GetIntegrationResponseRequest>;
export interface GetIntegrationResponseResponse {
  ContentHandlingStrategy?: ContentHandlingStrategy;
  IntegrationResponseId?: string;
  IntegrationResponseKey?: string;
  ResponseParameters?: { [key: string]: string | undefined };
  ResponseTemplates?: { [key: string]: string | undefined };
  TemplateSelectionExpression?: string;
}
export const GetIntegrationResponseResponse = S.suspend(() =>
  S.Struct({
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    IntegrationResponseId: S.optional(S.String),
    IntegrationResponseKey: S.optional(S.String),
    ResponseParameters: S.optional(IntegrationParameters),
    ResponseTemplates: S.optional(TemplateMap),
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
).annotate({
  identifier: "GetIntegrationResponseResponse",
}) as any as S.Schema<GetIntegrationResponseResponse>;
export interface GetIntegrationResponsesRequest {
  ApiId: string;
  IntegrationId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const GetIntegrationResponsesRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetIntegrationResponsesRequest",
}) as any as S.Schema<GetIntegrationResponsesRequest>;
export interface IntegrationResponse {
  ContentHandlingStrategy?: ContentHandlingStrategy;
  IntegrationResponseId?: string;
  IntegrationResponseKey?: string;
  ResponseParameters?: { [key: string]: string | undefined };
  ResponseTemplates?: { [key: string]: string | undefined };
  TemplateSelectionExpression?: string;
}
export const IntegrationResponse = S.suspend(() =>
  S.Struct({
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    IntegrationResponseId: S.optional(S.String),
    IntegrationResponseKey: S.optional(S.String),
    ResponseParameters: S.optional(IntegrationParameters),
    ResponseTemplates: S.optional(TemplateMap),
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
).annotate({
  identifier: "IntegrationResponse",
}) as any as S.Schema<IntegrationResponse>;
export type __listOfIntegrationResponse = IntegrationResponse[];
export const __listOfIntegrationResponse = S.Array(IntegrationResponse);
export interface GetIntegrationResponsesResponse {
  Items?: (IntegrationResponse & { IntegrationResponseKey: SelectionKey })[];
  NextToken?: string;
}
export const GetIntegrationResponsesResponse = S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfIntegrationResponse),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetIntegrationResponsesResponse",
}) as any as S.Schema<GetIntegrationResponsesResponse>;
export interface GetIntegrationsRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const GetIntegrationsRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetIntegrationsRequest",
}) as any as S.Schema<GetIntegrationsRequest>;
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
export const Integration = S.suspend(() =>
  S.Struct({
    ApiGatewayManaged: S.optional(S.Boolean),
    ConnectionId: S.optional(S.String),
    ConnectionType: S.optional(ConnectionType),
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    CredentialsArn: S.optional(S.String),
    Description: S.optional(S.String),
    IntegrationId: S.optional(S.String),
    IntegrationMethod: S.optional(S.String),
    IntegrationResponseSelectionExpression: S.optional(S.String),
    IntegrationSubtype: S.optional(S.String),
    IntegrationType: S.optional(IntegrationType),
    IntegrationUri: S.optional(S.String),
    PassthroughBehavior: S.optional(PassthroughBehavior),
    PayloadFormatVersion: S.optional(S.String),
    RequestParameters: S.optional(IntegrationParameters),
    RequestTemplates: S.optional(TemplateMap),
    ResponseParameters: S.optional(ResponseParameters),
    TemplateSelectionExpression: S.optional(S.String),
    TimeoutInMillis: S.optional(S.Number),
    TlsConfig: S.optional(TlsConfig),
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
      IntegrationResponseSelectionExpression:
        "integrationResponseSelectionExpression",
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
).annotate({ identifier: "Integration" }) as any as S.Schema<Integration>;
export type __listOfIntegration = Integration[];
export const __listOfIntegration = S.Array(Integration);
export interface GetIntegrationsResponse {
  Items?: Integration[];
  NextToken?: string;
}
export const GetIntegrationsResponse = S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfIntegration),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetIntegrationsResponse",
}) as any as S.Schema<GetIntegrationsResponse>;
export interface GetModelRequest {
  ApiId: string;
  ModelId: string;
}
export const GetModelRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetModelRequest",
}) as any as S.Schema<GetModelRequest>;
export interface GetModelResponse {
  ContentType?: string;
  Description?: string;
  ModelId?: string;
  Name?: string;
  Schema?: string;
}
export const GetModelResponse = S.suspend(() =>
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
).annotate({
  identifier: "GetModelResponse",
}) as any as S.Schema<GetModelResponse>;
export interface GetModelsRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const GetModelsRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetModelsRequest",
}) as any as S.Schema<GetModelsRequest>;
export interface Model {
  ContentType?: string;
  Description?: string;
  ModelId?: string;
  Name?: string;
  Schema?: string;
}
export const Model = S.suspend(() =>
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
).annotate({ identifier: "Model" }) as any as S.Schema<Model>;
export type __listOfModel = Model[];
export const __listOfModel = S.Array(Model);
export interface GetModelsResponse {
  Items?: (Model & { Name: StringWithLengthBetween1And128 })[];
  NextToken?: string;
}
export const GetModelsResponse = S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfModel),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetModelsResponse",
}) as any as S.Schema<GetModelsResponse>;
export interface GetModelTemplateRequest {
  ApiId: string;
  ModelId: string;
}
export const GetModelTemplateRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ModelId: S.String.pipe(T.HttpLabel("ModelId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/apis/{ApiId}/models/{ModelId}/template",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetModelTemplateRequest",
}) as any as S.Schema<GetModelTemplateRequest>;
export interface GetModelTemplateResponse {
  Value?: string;
}
export const GetModelTemplateResponse = S.suspend(() =>
  S.Struct({ Value: S.optional(S.String) }).pipe(
    S.encodeKeys({ Value: "value" }),
  ),
).annotate({
  identifier: "GetModelTemplateResponse",
}) as any as S.Schema<GetModelTemplateResponse>;
export interface GetPortalRequest {
  PortalId: string;
}
export const GetPortalRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetPortalRequest",
}) as any as S.Schema<GetPortalRequest>;
export type PreviewStatus =
  | "PREVIEW_IN_PROGRESS"
  | "PREVIEW_FAILED"
  | "PREVIEW_READY"
  | (string & {});
export const PreviewStatus = S.String;
export interface Preview {
  PreviewStatus?: PreviewStatus;
  PreviewUrl?: string;
  StatusException?: StatusException;
}
export const Preview = S.suspend(() =>
  S.Struct({
    PreviewStatus: S.optional(PreviewStatus),
    PreviewUrl: S.optional(S.String),
    StatusException: S.optional(StatusException),
  }).pipe(
    S.encodeKeys({
      PreviewStatus: "previewStatus",
      PreviewUrl: "previewUrl",
      StatusException: "statusException",
    }),
  ),
).annotate({ identifier: "Preview" }) as any as S.Schema<Preview>;
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
export const GetPortalResponse = S.suspend(() =>
  S.Struct({
    Authorization: S.optional(Authorization),
    EndpointConfiguration: S.optional(EndpointConfigurationResponse),
    IncludedPortalProductArns: S.optional(__listOf__stringMin20Max2048),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastPublished: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastPublishedDescription: S.optional(S.String),
    PortalArn: S.optional(S.String),
    PortalContent: S.optional(PortalContent),
    PortalId: S.optional(S.String),
    Preview: S.optional(Preview),
    PublishStatus: S.optional(PublishStatus),
    RumAppMonitorName: S.optional(S.String),
    StatusException: S.optional(StatusException),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "GetPortalResponse",
}) as any as S.Schema<GetPortalResponse>;
export interface GetPortalProductRequest {
  PortalProductId: string;
  ResourceOwnerAccountId?: string;
}
export const GetPortalProductRequest = S.suspend(() =>
  S.Struct({
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
    ResourceOwnerAccountId: S.optional(S.String).pipe(
      T.HttpQuery("resourceOwnerAccountId"),
    ),
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
).annotate({
  identifier: "GetPortalProductRequest",
}) as any as S.Schema<GetPortalProductRequest>;
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
export const GetPortalProductResponse = S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    DisplayOrder: S.optional(DisplayOrder),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    PortalProductArn: S.optional(S.String),
    PortalProductId: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "GetPortalProductResponse",
}) as any as S.Schema<GetPortalProductResponse>;
export interface GetPortalProductSharingPolicyRequest {
  PortalProductId: string;
}
export const GetPortalProductSharingPolicyRequest = S.suspend(() =>
  S.Struct({
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/portalproducts/{PortalProductId}/sharingpolicy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPortalProductSharingPolicyRequest",
}) as any as S.Schema<GetPortalProductSharingPolicyRequest>;
export interface GetPortalProductSharingPolicyResponse {
  PolicyDocument?: string;
  PortalProductId?: string;
}
export const GetPortalProductSharingPolicyResponse = S.suspend(() =>
  S.Struct({
    PolicyDocument: S.optional(S.String),
    PortalProductId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      PolicyDocument: "policyDocument",
      PortalProductId: "portalProductId",
    }),
  ),
).annotate({
  identifier: "GetPortalProductSharingPolicyResponse",
}) as any as S.Schema<GetPortalProductSharingPolicyResponse>;
export interface GetProductPageRequest {
  PortalProductId: string;
  ProductPageId: string;
  ResourceOwnerAccountId?: string;
}
export const GetProductPageRequest = S.suspend(() =>
  S.Struct({
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
    ProductPageId: S.String.pipe(T.HttpLabel("ProductPageId")),
    ResourceOwnerAccountId: S.optional(S.String).pipe(
      T.HttpQuery("resourceOwnerAccountId"),
    ),
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
).annotate({
  identifier: "GetProductPageRequest",
}) as any as S.Schema<GetProductPageRequest>;
export interface GetProductPageResponse {
  DisplayContent?: DisplayContent & {
    Body: __stringMin1Max32768;
    Title: __stringMin1Max255;
  };
  LastModified?: Date;
  ProductPageArn?: string;
  ProductPageId?: string;
}
export const GetProductPageResponse = S.suspend(() =>
  S.Struct({
    DisplayContent: S.optional(DisplayContent),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
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
).annotate({
  identifier: "GetProductPageResponse",
}) as any as S.Schema<GetProductPageResponse>;
export interface GetProductRestEndpointPageRequest {
  IncludeRawDisplayContent?: string;
  PortalProductId: string;
  ProductRestEndpointPageId: string;
  ResourceOwnerAccountId?: string;
}
export const GetProductRestEndpointPageRequest = S.suspend(() =>
  S.Struct({
    IncludeRawDisplayContent: S.optional(S.String).pipe(
      T.HttpQuery("includeRawDisplayContent"),
    ),
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
    ProductRestEndpointPageId: S.String.pipe(
      T.HttpLabel("ProductRestEndpointPageId"),
    ),
    ResourceOwnerAccountId: S.optional(S.String).pipe(
      T.HttpQuery("resourceOwnerAccountId"),
    ),
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
).annotate({
  identifier: "GetProductRestEndpointPageRequest",
}) as any as S.Schema<GetProductRestEndpointPageRequest>;
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
export const GetProductRestEndpointPageResponse = S.suspend(() =>
  S.Struct({
    DisplayContent: S.optional(EndpointDisplayContentResponse),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ProductRestEndpointPageArn: S.optional(S.String),
    ProductRestEndpointPageId: S.optional(S.String),
    RawDisplayContent: S.optional(S.String),
    RestEndpointIdentifier: S.optional(RestEndpointIdentifier),
    Status: S.optional(Status),
    StatusException: S.optional(StatusException),
    TryItState: S.optional(TryItState),
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
).annotate({
  identifier: "GetProductRestEndpointPageResponse",
}) as any as S.Schema<GetProductRestEndpointPageResponse>;
export interface GetRouteRequest {
  ApiId: string;
  RouteId: string;
}
export const GetRouteRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetRouteRequest",
}) as any as S.Schema<GetRouteRequest>;
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
export const GetRouteResult = S.suspend(() =>
  S.Struct({
    ApiGatewayManaged: S.optional(S.Boolean),
    ApiKeyRequired: S.optional(S.Boolean),
    AuthorizationScopes: S.optional(AuthorizationScopes),
    AuthorizationType: S.optional(AuthorizationType),
    AuthorizerId: S.optional(S.String),
    ModelSelectionExpression: S.optional(S.String),
    OperationName: S.optional(S.String),
    RequestModels: S.optional(RouteModels),
    RequestParameters: S.optional(RouteParameters),
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
).annotate({ identifier: "GetRouteResult" }) as any as S.Schema<GetRouteResult>;
export interface GetRouteResponseRequest {
  ApiId: string;
  RouteId: string;
  RouteResponseId: string;
}
export const GetRouteResponseRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetRouteResponseRequest",
}) as any as S.Schema<GetRouteResponseRequest>;
export interface GetRouteResponseResponse {
  ModelSelectionExpression?: string;
  ResponseModels?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteResponseId?: string;
  RouteResponseKey?: string;
}
export const GetRouteResponseResponse = S.suspend(() =>
  S.Struct({
    ModelSelectionExpression: S.optional(S.String),
    ResponseModels: S.optional(RouteModels),
    ResponseParameters: S.optional(RouteParameters),
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
).annotate({
  identifier: "GetRouteResponseResponse",
}) as any as S.Schema<GetRouteResponseResponse>;
export interface GetRouteResponsesRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
  RouteId: string;
}
export const GetRouteResponsesRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    RouteId: S.String.pipe(T.HttpLabel("RouteId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/apis/{ApiId}/routes/{RouteId}/routeresponses",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRouteResponsesRequest",
}) as any as S.Schema<GetRouteResponsesRequest>;
export interface RouteResponse {
  ModelSelectionExpression?: string;
  ResponseModels?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteResponseId?: string;
  RouteResponseKey?: string;
}
export const RouteResponse = S.suspend(() =>
  S.Struct({
    ModelSelectionExpression: S.optional(S.String),
    ResponseModels: S.optional(RouteModels),
    ResponseParameters: S.optional(RouteParameters),
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
).annotate({ identifier: "RouteResponse" }) as any as S.Schema<RouteResponse>;
export type __listOfRouteResponse = RouteResponse[];
export const __listOfRouteResponse = S.Array(RouteResponse);
export interface GetRouteResponsesResponse {
  Items?: (RouteResponse & { RouteResponseKey: SelectionKey })[];
  NextToken?: string;
}
export const GetRouteResponsesResponse = S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfRouteResponse),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetRouteResponsesResponse",
}) as any as S.Schema<GetRouteResponsesResponse>;
export interface GetRoutesRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const GetRoutesRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetRoutesRequest",
}) as any as S.Schema<GetRoutesRequest>;
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
export const Route = S.suspend(() =>
  S.Struct({
    ApiGatewayManaged: S.optional(S.Boolean),
    ApiKeyRequired: S.optional(S.Boolean),
    AuthorizationScopes: S.optional(AuthorizationScopes),
    AuthorizationType: S.optional(AuthorizationType),
    AuthorizerId: S.optional(S.String),
    ModelSelectionExpression: S.optional(S.String),
    OperationName: S.optional(S.String),
    RequestModels: S.optional(RouteModels),
    RequestParameters: S.optional(RouteParameters),
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
).annotate({ identifier: "Route" }) as any as S.Schema<Route>;
export type __listOfRoute = Route[];
export const __listOfRoute = S.Array(Route);
export interface GetRoutesResponse {
  Items?: (Route & { RouteKey: SelectionKey })[];
  NextToken?: string;
}
export const GetRoutesResponse = S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfRoute),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetRoutesResponse",
}) as any as S.Schema<GetRoutesResponse>;
export interface GetRoutingRuleRequest {
  DomainName: string;
  DomainNameId?: string;
  RoutingRuleId: string;
}
export const GetRoutingRuleRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetRoutingRuleRequest",
}) as any as S.Schema<GetRoutingRuleRequest>;
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
export const GetRoutingRuleResponse = S.suspend(() =>
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
).annotate({
  identifier: "GetRoutingRuleResponse",
}) as any as S.Schema<GetRoutingRuleResponse>;
export interface GetStageRequest {
  ApiId: string;
  StageName: string;
}
export const GetStageRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetStageRequest",
}) as any as S.Schema<GetStageRequest>;
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
export const GetStageResponse = S.suspend(() =>
  S.Struct({
    AccessLogSettings: S.optional(AccessLogSettings),
    ApiGatewayManaged: S.optional(S.Boolean),
    AutoDeploy: S.optional(S.Boolean),
    ClientCertificateId: S.optional(S.String),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DefaultRouteSettings: S.optional(RouteSettings),
    DeploymentId: S.optional(S.String),
    Description: S.optional(S.String),
    LastDeploymentStatusMessage: S.optional(S.String),
    LastUpdatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    RouteSettings: S.optional(RouteSettingsMap),
    StageName: S.optional(S.String),
    StageVariables: S.optional(StageVariablesMap),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "GetStageResponse",
}) as any as S.Schema<GetStageResponse>;
export interface GetStagesRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const GetStagesRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetStagesRequest",
}) as any as S.Schema<GetStagesRequest>;
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
export const Stage = S.suspend(() =>
  S.Struct({
    AccessLogSettings: S.optional(AccessLogSettings),
    ApiGatewayManaged: S.optional(S.Boolean),
    AutoDeploy: S.optional(S.Boolean),
    ClientCertificateId: S.optional(S.String),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DefaultRouteSettings: S.optional(RouteSettings),
    DeploymentId: S.optional(S.String),
    Description: S.optional(S.String),
    LastDeploymentStatusMessage: S.optional(S.String),
    LastUpdatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    RouteSettings: S.optional(RouteSettingsMap),
    StageName: S.optional(S.String),
    StageVariables: S.optional(StageVariablesMap),
    Tags: S.optional(Tags),
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
).annotate({ identifier: "Stage" }) as any as S.Schema<Stage>;
export type __listOfStage = Stage[];
export const __listOfStage = S.Array(Stage);
export interface GetStagesResponse {
  Items?: (Stage & { StageName: StringWithLengthBetween1And128 })[];
  NextToken?: string;
}
export const GetStagesResponse = S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfStage),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetStagesResponse",
}) as any as S.Schema<GetStagesResponse>;
export interface GetTagsRequest {
  ResourceArn: string;
}
export const GetTagsRequest = S.suspend(() =>
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
).annotate({ identifier: "GetTagsRequest" }) as any as S.Schema<GetTagsRequest>;
export interface GetTagsResponse {
  Tags?: { [key: string]: string | undefined };
}
export const GetTagsResponse = S.suspend(() =>
  S.Struct({ Tags: S.optional(Tags) }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "GetTagsResponse",
}) as any as S.Schema<GetTagsResponse>;
export interface GetVpcLinkRequest {
  VpcLinkId: string;
}
export const GetVpcLinkRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetVpcLinkRequest",
}) as any as S.Schema<GetVpcLinkRequest>;
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
export const GetVpcLinkResponse = S.suspend(() =>
  S.Struct({
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Name: S.optional(S.String),
    SecurityGroupIds: S.optional(SecurityGroupIdList),
    SubnetIds: S.optional(SubnetIdList),
    Tags: S.optional(Tags),
    VpcLinkId: S.optional(S.String),
    VpcLinkStatus: S.optional(VpcLinkStatus),
    VpcLinkStatusMessage: S.optional(S.String),
    VpcLinkVersion: S.optional(VpcLinkVersion),
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
).annotate({
  identifier: "GetVpcLinkResponse",
}) as any as S.Schema<GetVpcLinkResponse>;
export interface GetVpcLinksRequest {
  MaxResults?: string;
  NextToken?: string;
}
export const GetVpcLinksRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/vpclinks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVpcLinksRequest",
}) as any as S.Schema<GetVpcLinksRequest>;
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
export const VpcLink = S.suspend(() =>
  S.Struct({
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Name: S.optional(S.String),
    SecurityGroupIds: S.optional(SecurityGroupIdList),
    SubnetIds: S.optional(SubnetIdList),
    Tags: S.optional(Tags),
    VpcLinkId: S.optional(S.String),
    VpcLinkStatus: S.optional(VpcLinkStatus),
    VpcLinkStatusMessage: S.optional(S.String),
    VpcLinkVersion: S.optional(VpcLinkVersion),
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
).annotate({ identifier: "VpcLink" }) as any as S.Schema<VpcLink>;
export type __listOfVpcLink = VpcLink[];
export const __listOfVpcLink = S.Array(VpcLink);
export interface GetVpcLinksResponse {
  Items?: (VpcLink & {
    Name: StringWithLengthBetween1And128;
    SecurityGroupIds: SecurityGroupIdList;
    SubnetIds: SubnetIdList;
    VpcLinkId: Id;
  })[];
  NextToken?: string;
}
export const GetVpcLinksResponse = S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfVpcLink),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetVpcLinksResponse",
}) as any as S.Schema<GetVpcLinksResponse>;
export interface ImportApiRequest {
  Basepath?: string;
  Body?: string;
  FailOnWarnings?: boolean;
}
export const ImportApiRequest = S.suspend(() =>
  S.Struct({
    Basepath: S.optional(S.String).pipe(T.HttpQuery("basepath")),
    Body: S.optional(S.String),
    FailOnWarnings: S.optional(S.Boolean).pipe(T.HttpQuery("failOnWarnings")),
  })
    .pipe(S.encodeKeys({ Body: "body" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v2/apis" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ImportApiRequest",
}) as any as S.Schema<ImportApiRequest>;
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
export const ImportApiResponse = S.suspend(() =>
  S.Struct({
    ApiEndpoint: S.optional(S.String),
    ApiGatewayManaged: S.optional(S.Boolean),
    ApiId: S.optional(S.String),
    ApiKeySelectionExpression: S.optional(S.String),
    CorsConfiguration: S.optional(Cors),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    DisableSchemaValidation: S.optional(S.Boolean),
    DisableExecuteApiEndpoint: S.optional(S.Boolean),
    ImportInfo: S.optional(__listOf__string),
    IpAddressType: S.optional(IpAddressType),
    Name: S.optional(S.String),
    ProtocolType: S.optional(ProtocolType),
    RouteSelectionExpression: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "ImportApiResponse",
}) as any as S.Schema<ImportApiResponse>;
export interface ListPortalProductsRequest {
  MaxResults?: string;
  NextToken?: string;
  ResourceOwner?: string;
}
export const ListPortalProductsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    ResourceOwner: S.optional(S.String).pipe(T.HttpQuery("resourceOwner")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/portalproducts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPortalProductsRequest",
}) as any as S.Schema<ListPortalProductsRequest>;
export interface PortalProductSummary {
  Description?: string;
  DisplayName?: string;
  LastModified?: Date;
  PortalProductArn?: string;
  PortalProductId?: string;
  Tags?: { [key: string]: string | undefined };
}
export const PortalProductSummary = S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    PortalProductArn: S.optional(S.String),
    PortalProductId: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "PortalProductSummary",
}) as any as S.Schema<PortalProductSummary>;
export type __listOfPortalProductSummary = PortalProductSummary[];
export const __listOfPortalProductSummary = S.Array(PortalProductSummary);
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
export const ListPortalProductsResponse = S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfPortalProductSummary),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "ListPortalProductsResponse",
}) as any as S.Schema<ListPortalProductsResponse>;
export interface ListPortalsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export const ListPortalsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/portals" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPortalsRequest",
}) as any as S.Schema<ListPortalsRequest>;
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
export const PortalSummary = S.suspend(() =>
  S.Struct({
    Authorization: S.optional(Authorization),
    EndpointConfiguration: S.optional(EndpointConfigurationResponse),
    IncludedPortalProductArns: S.optional(__listOf__stringMin20Max2048),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastPublished: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastPublishedDescription: S.optional(S.String),
    PortalArn: S.optional(S.String),
    PortalContent: S.optional(PortalContent),
    PortalId: S.optional(S.String),
    Preview: S.optional(Preview),
    PublishStatus: S.optional(PublishStatus),
    RumAppMonitorName: S.optional(S.String),
    StatusException: S.optional(StatusException),
    Tags: S.optional(Tags),
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
).annotate({ identifier: "PortalSummary" }) as any as S.Schema<PortalSummary>;
export type __listOfPortalSummary = PortalSummary[];
export const __listOfPortalSummary = S.Array(PortalSummary);
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
export const ListPortalsResponse = S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfPortalSummary),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "ListPortalsResponse",
}) as any as S.Schema<ListPortalsResponse>;
export interface ListProductPagesRequest {
  MaxResults?: string;
  NextToken?: string;
  PortalProductId: string;
  ResourceOwnerAccountId?: string;
}
export const ListProductPagesRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
    ResourceOwnerAccountId: S.optional(S.String).pipe(
      T.HttpQuery("resourceOwnerAccountId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/portalproducts/{PortalProductId}/productpages",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProductPagesRequest",
}) as any as S.Schema<ListProductPagesRequest>;
export interface ProductPageSummaryNoBody {
  LastModified?: Date;
  PageTitle?: string;
  ProductPageArn?: string;
  ProductPageId?: string;
}
export const ProductPageSummaryNoBody = S.suspend(() =>
  S.Struct({
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
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
).annotate({
  identifier: "ProductPageSummaryNoBody",
}) as any as S.Schema<ProductPageSummaryNoBody>;
export type __listOfProductPageSummaryNoBody = ProductPageSummaryNoBody[];
export const __listOfProductPageSummaryNoBody = S.Array(
  ProductPageSummaryNoBody,
);
export interface ListProductPagesResponse {
  Items?: (ProductPageSummaryNoBody & {
    LastModified: __timestampIso8601;
    PageTitle: __stringMin1Max255;
    ProductPageArn: __stringMin20Max2048;
    ProductPageId: __stringMin10Max30PatternAZ09;
  })[];
  NextToken?: string;
}
export const ListProductPagesResponse = S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfProductPageSummaryNoBody),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "ListProductPagesResponse",
}) as any as S.Schema<ListProductPagesResponse>;
export interface ListProductRestEndpointPagesRequest {
  MaxResults?: string;
  NextToken?: string;
  PortalProductId: string;
  ResourceOwnerAccountId?: string;
}
export const ListProductRestEndpointPagesRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
    ResourceOwnerAccountId: S.optional(S.String).pipe(
      T.HttpQuery("resourceOwnerAccountId"),
    ),
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
).annotate({
  identifier: "ListProductRestEndpointPagesRequest",
}) as any as S.Schema<ListProductRestEndpointPagesRequest>;
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
export const ProductRestEndpointPageSummaryNoBody = S.suspend(() =>
  S.Struct({
    Endpoint: S.optional(S.String),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    OperationName: S.optional(S.String),
    ProductRestEndpointPageArn: S.optional(S.String),
    ProductRestEndpointPageId: S.optional(S.String),
    RestEndpointIdentifier: S.optional(RestEndpointIdentifier),
    Status: S.optional(Status),
    StatusException: S.optional(StatusException),
    TryItState: S.optional(TryItState),
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
).annotate({
  identifier: "ProductRestEndpointPageSummaryNoBody",
}) as any as S.Schema<ProductRestEndpointPageSummaryNoBody>;
export type __listOfProductRestEndpointPageSummaryNoBody =
  ProductRestEndpointPageSummaryNoBody[];
export const __listOfProductRestEndpointPageSummaryNoBody = S.Array(
  ProductRestEndpointPageSummaryNoBody,
);
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
export const ListProductRestEndpointPagesResponse = S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfProductRestEndpointPageSummaryNoBody),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "ListProductRestEndpointPagesResponse",
}) as any as S.Schema<ListProductRestEndpointPagesResponse>;
export interface ListRoutingRulesRequest {
  DomainName: string;
  DomainNameId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListRoutingRulesRequest = S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    DomainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domainnames/{DomainName}/routingrules",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRoutingRulesRequest",
}) as any as S.Schema<ListRoutingRulesRequest>;
export interface RoutingRule {
  Actions?: RoutingRuleAction[];
  Conditions?: RoutingRuleCondition[];
  Priority?: number;
  RoutingRuleArn?: string;
  RoutingRuleId?: string;
}
export const RoutingRule = S.suspend(() =>
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
).annotate({ identifier: "RoutingRule" }) as any as S.Schema<RoutingRule>;
export type __listOfRoutingRule = RoutingRule[];
export const __listOfRoutingRule = S.Array(RoutingRule);
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
export const ListRoutingRulesResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    RoutingRules: S.optional(__listOfRoutingRule),
  }).pipe(
    S.encodeKeys({ NextToken: "nextToken", RoutingRules: "routingRules" }),
  ),
).annotate({
  identifier: "ListRoutingRulesResponse",
}) as any as S.Schema<ListRoutingRulesResponse>;
export interface PreviewPortalRequest {
  PortalId: string;
}
export const PreviewPortalRequest = S.suspend(() =>
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
).annotate({
  identifier: "PreviewPortalRequest",
}) as any as S.Schema<PreviewPortalRequest>;
export interface PreviewPortalResponse {}
export const PreviewPortalResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "PreviewPortalResponse",
}) as any as S.Schema<PreviewPortalResponse>;
export interface PublishPortalRequest {
  Description?: string;
  PortalId: string;
}
export const PublishPortalRequest = S.suspend(() =>
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
).annotate({
  identifier: "PublishPortalRequest",
}) as any as S.Schema<PublishPortalRequest>;
export interface PublishPortalResponse {}
export const PublishPortalResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "PublishPortalResponse",
}) as any as S.Schema<PublishPortalResponse>;
export interface PutPortalProductSharingPolicyRequest {
  PolicyDocument?: string;
  PortalProductId: string;
}
export const PutPortalProductSharingPolicyRequest = S.suspend(() =>
  S.Struct({
    PolicyDocument: S.optional(S.String),
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
  })
    .pipe(S.encodeKeys({ PolicyDocument: "policyDocument" }))
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/portalproducts/{PortalProductId}/sharingpolicy",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutPortalProductSharingPolicyRequest",
}) as any as S.Schema<PutPortalProductSharingPolicyRequest>;
export interface PutPortalProductSharingPolicyResponse {}
export const PutPortalProductSharingPolicyResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutPortalProductSharingPolicyResponse",
}) as any as S.Schema<PutPortalProductSharingPolicyResponse>;
export interface PutRoutingRuleRequest {
  Actions?: RoutingRuleAction[];
  Conditions?: RoutingRuleCondition[];
  DomainName: string;
  DomainNameId?: string;
  Priority?: number;
  RoutingRuleId: string;
}
export const PutRoutingRuleRequest = S.suspend(() =>
  S.Struct({
    Actions: S.optional(__listOfRoutingRuleAction),
    Conditions: S.optional(__listOfRoutingRuleCondition),
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    DomainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
    Priority: S.optional(S.Number),
    RoutingRuleId: S.String.pipe(T.HttpLabel("RoutingRuleId")),
  })
    .pipe(
      S.encodeKeys({
        Actions: "actions",
        Conditions: "conditions",
        Priority: "priority",
      }),
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
).annotate({
  identifier: "PutRoutingRuleRequest",
}) as any as S.Schema<PutRoutingRuleRequest>;
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
export const PutRoutingRuleResponse = S.suspend(() =>
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
).annotate({
  identifier: "PutRoutingRuleResponse",
}) as any as S.Schema<PutRoutingRuleResponse>;
export interface ReimportApiRequest {
  ApiId: string;
  Basepath?: string;
  Body?: string;
  FailOnWarnings?: boolean;
}
export const ReimportApiRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    Basepath: S.optional(S.String).pipe(T.HttpQuery("basepath")),
    Body: S.optional(S.String),
    FailOnWarnings: S.optional(S.Boolean).pipe(T.HttpQuery("failOnWarnings")),
  })
    .pipe(S.encodeKeys({ Body: "body" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v2/apis/{ApiId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ReimportApiRequest",
}) as any as S.Schema<ReimportApiRequest>;
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
export const ReimportApiResponse = S.suspend(() =>
  S.Struct({
    ApiEndpoint: S.optional(S.String),
    ApiGatewayManaged: S.optional(S.Boolean),
    ApiId: S.optional(S.String),
    ApiKeySelectionExpression: S.optional(S.String),
    CorsConfiguration: S.optional(Cors),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    DisableSchemaValidation: S.optional(S.Boolean),
    DisableExecuteApiEndpoint: S.optional(S.Boolean),
    ImportInfo: S.optional(__listOf__string),
    IpAddressType: S.optional(IpAddressType),
    Name: S.optional(S.String),
    ProtocolType: S.optional(ProtocolType),
    RouteSelectionExpression: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "ReimportApiResponse",
}) as any as S.Schema<ReimportApiResponse>;
export interface ResetAuthorizersCacheRequest {
  ApiId: string;
  StageName: string;
}
export const ResetAuthorizersCacheRequest = S.suspend(() =>
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
).annotate({
  identifier: "ResetAuthorizersCacheRequest",
}) as any as S.Schema<ResetAuthorizersCacheRequest>;
export interface ResetAuthorizersCacheResponse {}
export const ResetAuthorizersCacheResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ResetAuthorizersCacheResponse",
}) as any as S.Schema<ResetAuthorizersCacheResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export const UntagResourceRequest = S.suspend(() =>
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
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
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
export const UpdateApiRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ApiKeySelectionExpression: S.optional(S.String),
    CorsConfiguration: S.optional(Cors),
    CredentialsArn: S.optional(S.String),
    Description: S.optional(S.String),
    DisableSchemaValidation: S.optional(S.Boolean),
    DisableExecuteApiEndpoint: S.optional(S.Boolean),
    IpAddressType: S.optional(IpAddressType),
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
).annotate({
  identifier: "UpdateApiRequest",
}) as any as S.Schema<UpdateApiRequest>;
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
export const UpdateApiResponse = S.suspend(() =>
  S.Struct({
    ApiEndpoint: S.optional(S.String),
    ApiGatewayManaged: S.optional(S.Boolean),
    ApiId: S.optional(S.String),
    ApiKeySelectionExpression: S.optional(S.String),
    CorsConfiguration: S.optional(Cors),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    DisableSchemaValidation: S.optional(S.Boolean),
    DisableExecuteApiEndpoint: S.optional(S.Boolean),
    ImportInfo: S.optional(__listOf__string),
    IpAddressType: S.optional(IpAddressType),
    Name: S.optional(S.String),
    ProtocolType: S.optional(ProtocolType),
    RouteSelectionExpression: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "UpdateApiResponse",
}) as any as S.Schema<UpdateApiResponse>;
export interface UpdateApiMappingRequest {
  ApiId?: string;
  ApiMappingId: string;
  ApiMappingKey?: string;
  DomainName: string;
  Stage?: string;
}
export const UpdateApiMappingRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.optional(S.String),
    ApiMappingId: S.String.pipe(T.HttpLabel("ApiMappingId")),
    ApiMappingKey: S.optional(S.String),
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    Stage: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ApiId: "apiId",
        ApiMappingKey: "apiMappingKey",
        Stage: "stage",
      }),
    )
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
).annotate({
  identifier: "UpdateApiMappingRequest",
}) as any as S.Schema<UpdateApiMappingRequest>;
export interface UpdateApiMappingResponse {
  ApiId?: string;
  ApiMappingId?: string;
  ApiMappingKey?: string;
  Stage?: string;
}
export const UpdateApiMappingResponse = S.suspend(() =>
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
).annotate({
  identifier: "UpdateApiMappingResponse",
}) as any as S.Schema<UpdateApiMappingResponse>;
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
export const UpdateAuthorizerRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    AuthorizerCredentialsArn: S.optional(S.String),
    AuthorizerId: S.String.pipe(T.HttpLabel("AuthorizerId")),
    AuthorizerPayloadFormatVersion: S.optional(S.String),
    AuthorizerResultTtlInSeconds: S.optional(S.Number),
    AuthorizerType: S.optional(AuthorizerType),
    AuthorizerUri: S.optional(S.String),
    EnableSimpleResponses: S.optional(S.Boolean),
    IdentitySource: S.optional(IdentitySourceList),
    IdentityValidationExpression: S.optional(S.String),
    JwtConfiguration: S.optional(JWTConfiguration),
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
        T.Http({
          method: "PATCH",
          uri: "/v2/apis/{ApiId}/authorizers/{AuthorizerId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateAuthorizerRequest",
}) as any as S.Schema<UpdateAuthorizerRequest>;
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
export const UpdateAuthorizerResponse = S.suspend(() =>
  S.Struct({
    AuthorizerCredentialsArn: S.optional(S.String),
    AuthorizerId: S.optional(S.String),
    AuthorizerPayloadFormatVersion: S.optional(S.String),
    AuthorizerResultTtlInSeconds: S.optional(S.Number),
    AuthorizerType: S.optional(AuthorizerType),
    AuthorizerUri: S.optional(S.String),
    EnableSimpleResponses: S.optional(S.Boolean),
    IdentitySource: S.optional(IdentitySourceList),
    IdentityValidationExpression: S.optional(S.String),
    JwtConfiguration: S.optional(JWTConfiguration),
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
).annotate({
  identifier: "UpdateAuthorizerResponse",
}) as any as S.Schema<UpdateAuthorizerResponse>;
export interface UpdateDeploymentRequest {
  ApiId: string;
  DeploymentId: string;
  Description?: string;
}
export const UpdateDeploymentRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    DeploymentId: S.String.pipe(T.HttpLabel("DeploymentId")),
    Description: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ Description: "description" }))
    .pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/v2/apis/{ApiId}/deployments/{DeploymentId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateDeploymentRequest",
}) as any as S.Schema<UpdateDeploymentRequest>;
export interface UpdateDeploymentResponse {
  AutoDeployed?: boolean;
  CreatedDate?: Date;
  DeploymentId?: string;
  DeploymentStatus?: DeploymentStatus;
  DeploymentStatusMessage?: string;
  Description?: string;
}
export const UpdateDeploymentResponse = S.suspend(() =>
  S.Struct({
    AutoDeployed: S.optional(S.Boolean),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DeploymentId: S.optional(S.String),
    DeploymentStatus: S.optional(DeploymentStatus),
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
).annotate({
  identifier: "UpdateDeploymentResponse",
}) as any as S.Schema<UpdateDeploymentResponse>;
export interface UpdateDomainNameRequest {
  DomainName: string;
  DomainNameConfigurations?: DomainNameConfiguration[];
  MutualTlsAuthentication?: MutualTlsAuthenticationInput;
  RoutingMode?: RoutingMode;
}
export const UpdateDomainNameRequest = S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    DomainNameConfigurations: S.optional(DomainNameConfigurations),
    MutualTlsAuthentication: S.optional(MutualTlsAuthenticationInput),
    RoutingMode: S.optional(RoutingMode),
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
).annotate({
  identifier: "UpdateDomainNameRequest",
}) as any as S.Schema<UpdateDomainNameRequest>;
export interface UpdateDomainNameResponse {
  ApiMappingSelectionExpression?: string;
  DomainName?: string;
  DomainNameArn?: string;
  DomainNameConfigurations?: DomainNameConfiguration[];
  MutualTlsAuthentication?: MutualTlsAuthentication;
  RoutingMode?: RoutingMode;
  Tags?: { [key: string]: string | undefined };
}
export const UpdateDomainNameResponse = S.suspend(() =>
  S.Struct({
    ApiMappingSelectionExpression: S.optional(S.String),
    DomainName: S.optional(S.String),
    DomainNameArn: S.optional(S.String),
    DomainNameConfigurations: S.optional(DomainNameConfigurations),
    MutualTlsAuthentication: S.optional(MutualTlsAuthentication),
    RoutingMode: S.optional(RoutingMode),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "UpdateDomainNameResponse",
}) as any as S.Schema<UpdateDomainNameResponse>;
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
export const UpdateIntegrationRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ConnectionId: S.optional(S.String),
    ConnectionType: S.optional(ConnectionType),
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    CredentialsArn: S.optional(S.String),
    Description: S.optional(S.String),
    IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
    IntegrationMethod: S.optional(S.String),
    IntegrationSubtype: S.optional(S.String),
    IntegrationType: S.optional(IntegrationType),
    IntegrationUri: S.optional(S.String),
    PassthroughBehavior: S.optional(PassthroughBehavior),
    PayloadFormatVersion: S.optional(S.String),
    RequestParameters: S.optional(IntegrationParameters),
    RequestTemplates: S.optional(TemplateMap),
    ResponseParameters: S.optional(ResponseParameters),
    TemplateSelectionExpression: S.optional(S.String),
    TimeoutInMillis: S.optional(S.Number),
    TlsConfig: S.optional(TlsConfigInput),
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
        T.Http({
          method: "PATCH",
          uri: "/v2/apis/{ApiId}/integrations/{IntegrationId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateIntegrationRequest",
}) as any as S.Schema<UpdateIntegrationRequest>;
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
export const UpdateIntegrationResult = S.suspend(() =>
  S.Struct({
    ApiGatewayManaged: S.optional(S.Boolean),
    ConnectionId: S.optional(S.String),
    ConnectionType: S.optional(ConnectionType),
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    CredentialsArn: S.optional(S.String),
    Description: S.optional(S.String),
    IntegrationId: S.optional(S.String),
    IntegrationMethod: S.optional(S.String),
    IntegrationResponseSelectionExpression: S.optional(S.String),
    IntegrationSubtype: S.optional(S.String),
    IntegrationType: S.optional(IntegrationType),
    IntegrationUri: S.optional(S.String),
    PassthroughBehavior: S.optional(PassthroughBehavior),
    PayloadFormatVersion: S.optional(S.String),
    RequestParameters: S.optional(IntegrationParameters),
    RequestTemplates: S.optional(TemplateMap),
    ResponseParameters: S.optional(ResponseParameters),
    TemplateSelectionExpression: S.optional(S.String),
    TimeoutInMillis: S.optional(S.Number),
    TlsConfig: S.optional(TlsConfig),
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
      IntegrationResponseSelectionExpression:
        "integrationResponseSelectionExpression",
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
).annotate({
  identifier: "UpdateIntegrationResult",
}) as any as S.Schema<UpdateIntegrationResult>;
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
export const UpdateIntegrationResponseRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
    IntegrationResponseId: S.String.pipe(T.HttpLabel("IntegrationResponseId")),
    IntegrationResponseKey: S.optional(S.String),
    ResponseParameters: S.optional(IntegrationParameters),
    ResponseTemplates: S.optional(TemplateMap),
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
).annotate({
  identifier: "UpdateIntegrationResponseRequest",
}) as any as S.Schema<UpdateIntegrationResponseRequest>;
export interface UpdateIntegrationResponseResponse {
  ContentHandlingStrategy?: ContentHandlingStrategy;
  IntegrationResponseId?: string;
  IntegrationResponseKey?: string;
  ResponseParameters?: { [key: string]: string | undefined };
  ResponseTemplates?: { [key: string]: string | undefined };
  TemplateSelectionExpression?: string;
}
export const UpdateIntegrationResponseResponse = S.suspend(() =>
  S.Struct({
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    IntegrationResponseId: S.optional(S.String),
    IntegrationResponseKey: S.optional(S.String),
    ResponseParameters: S.optional(IntegrationParameters),
    ResponseTemplates: S.optional(TemplateMap),
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
).annotate({
  identifier: "UpdateIntegrationResponseResponse",
}) as any as S.Schema<UpdateIntegrationResponseResponse>;
export interface UpdateModelRequest {
  ApiId: string;
  ContentType?: string;
  Description?: string;
  ModelId: string;
  Name?: string;
  Schema?: string;
}
export const UpdateModelRequest = S.suspend(() =>
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
).annotate({
  identifier: "UpdateModelRequest",
}) as any as S.Schema<UpdateModelRequest>;
export interface UpdateModelResponse {
  ContentType?: string;
  Description?: string;
  ModelId?: string;
  Name?: string;
  Schema?: string;
}
export const UpdateModelResponse = S.suspend(() =>
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
).annotate({
  identifier: "UpdateModelResponse",
}) as any as S.Schema<UpdateModelResponse>;
export interface UpdatePortalRequest {
  Authorization?: Authorization;
  EndpointConfiguration?: EndpointConfigurationRequest;
  IncludedPortalProductArns?: string[];
  LogoUri?: string;
  PortalContent?: PortalContent;
  PortalId: string;
  RumAppMonitorName?: string;
}
export const UpdatePortalRequest = S.suspend(() =>
  S.Struct({
    Authorization: S.optional(Authorization),
    EndpointConfiguration: S.optional(EndpointConfigurationRequest),
    IncludedPortalProductArns: S.optional(__listOf__stringMin20Max2048),
    LogoUri: S.optional(S.String),
    PortalContent: S.optional(PortalContent),
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
).annotate({
  identifier: "UpdatePortalRequest",
}) as any as S.Schema<UpdatePortalRequest>;
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
export const UpdatePortalResponse = S.suspend(() =>
  S.Struct({
    Authorization: S.optional(Authorization),
    EndpointConfiguration: S.optional(EndpointConfigurationResponse),
    IncludedPortalProductArns: S.optional(__listOf__stringMin20Max2048),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastPublished: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastPublishedDescription: S.optional(S.String),
    PortalArn: S.optional(S.String),
    PortalContent: S.optional(PortalContent),
    PortalId: S.optional(S.String),
    Preview: S.optional(Preview),
    PublishStatus: S.optional(PublishStatus),
    RumAppMonitorName: S.optional(S.String),
    StatusException: S.optional(StatusException),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "UpdatePortalResponse",
}) as any as S.Schema<UpdatePortalResponse>;
export interface UpdatePortalProductRequest {
  Description?: string;
  DisplayName?: string;
  DisplayOrder?: DisplayOrder;
  PortalProductId: string;
}
export const UpdatePortalProductRequest = S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    DisplayOrder: S.optional(DisplayOrder),
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
        T.Http({
          method: "PATCH",
          uri: "/v2/portalproducts/{PortalProductId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdatePortalProductRequest",
}) as any as S.Schema<UpdatePortalProductRequest>;
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
export const UpdatePortalProductResponse = S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    DisplayOrder: S.optional(DisplayOrder),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    PortalProductArn: S.optional(S.String),
    PortalProductId: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "UpdatePortalProductResponse",
}) as any as S.Schema<UpdatePortalProductResponse>;
export interface UpdateProductPageRequest {
  DisplayContent?: DisplayContent;
  PortalProductId: string;
  ProductPageId: string;
}
export const UpdateProductPageRequest = S.suspend(() =>
  S.Struct({
    DisplayContent: S.optional(DisplayContent),
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
).annotate({
  identifier: "UpdateProductPageRequest",
}) as any as S.Schema<UpdateProductPageRequest>;
export interface UpdateProductPageResponse {
  DisplayContent?: DisplayContent & {
    Body: __stringMin1Max32768;
    Title: __stringMin1Max255;
  };
  LastModified?: Date;
  ProductPageArn?: string;
  ProductPageId?: string;
}
export const UpdateProductPageResponse = S.suspend(() =>
  S.Struct({
    DisplayContent: S.optional(DisplayContent),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
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
).annotate({
  identifier: "UpdateProductPageResponse",
}) as any as S.Schema<UpdateProductPageResponse>;
export interface UpdateProductRestEndpointPageRequest {
  DisplayContent?: EndpointDisplayContent;
  PortalProductId: string;
  ProductRestEndpointPageId: string;
  TryItState?: TryItState;
}
export const UpdateProductRestEndpointPageRequest = S.suspend(() =>
  S.Struct({
    DisplayContent: S.optional(EndpointDisplayContent),
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
    ProductRestEndpointPageId: S.String.pipe(
      T.HttpLabel("ProductRestEndpointPageId"),
    ),
    TryItState: S.optional(TryItState),
  })
    .pipe(
      S.encodeKeys({
        DisplayContent: "displayContent",
        TryItState: "tryItState",
      }),
    )
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
).annotate({
  identifier: "UpdateProductRestEndpointPageRequest",
}) as any as S.Schema<UpdateProductRestEndpointPageRequest>;
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
export const UpdateProductRestEndpointPageResponse = S.suspend(() =>
  S.Struct({
    DisplayContent: S.optional(EndpointDisplayContentResponse),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ProductRestEndpointPageArn: S.optional(S.String),
    ProductRestEndpointPageId: S.optional(S.String),
    RestEndpointIdentifier: S.optional(RestEndpointIdentifier),
    Status: S.optional(Status),
    StatusException: S.optional(StatusException),
    TryItState: S.optional(TryItState),
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
).annotate({
  identifier: "UpdateProductRestEndpointPageResponse",
}) as any as S.Schema<UpdateProductRestEndpointPageResponse>;
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
export const UpdateRouteRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ApiKeyRequired: S.optional(S.Boolean),
    AuthorizationScopes: S.optional(AuthorizationScopes),
    AuthorizationType: S.optional(AuthorizationType),
    AuthorizerId: S.optional(S.String),
    ModelSelectionExpression: S.optional(S.String),
    OperationName: S.optional(S.String),
    RequestModels: S.optional(RouteModels),
    RequestParameters: S.optional(RouteParameters),
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
).annotate({
  identifier: "UpdateRouteRequest",
}) as any as S.Schema<UpdateRouteRequest>;
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
export const UpdateRouteResult = S.suspend(() =>
  S.Struct({
    ApiGatewayManaged: S.optional(S.Boolean),
    ApiKeyRequired: S.optional(S.Boolean),
    AuthorizationScopes: S.optional(AuthorizationScopes),
    AuthorizationType: S.optional(AuthorizationType),
    AuthorizerId: S.optional(S.String),
    ModelSelectionExpression: S.optional(S.String),
    OperationName: S.optional(S.String),
    RequestModels: S.optional(RouteModels),
    RequestParameters: S.optional(RouteParameters),
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
).annotate({
  identifier: "UpdateRouteResult",
}) as any as S.Schema<UpdateRouteResult>;
export interface UpdateRouteResponseRequest {
  ApiId: string;
  ModelSelectionExpression?: string;
  ResponseModels?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteId: string;
  RouteResponseId: string;
  RouteResponseKey?: string;
}
export const UpdateRouteResponseRequest = S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ModelSelectionExpression: S.optional(S.String),
    ResponseModels: S.optional(RouteModels),
    ResponseParameters: S.optional(RouteParameters),
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
).annotate({
  identifier: "UpdateRouteResponseRequest",
}) as any as S.Schema<UpdateRouteResponseRequest>;
export interface UpdateRouteResponseResponse {
  ModelSelectionExpression?: string;
  ResponseModels?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteResponseId?: string;
  RouteResponseKey?: string;
}
export const UpdateRouteResponseResponse = S.suspend(() =>
  S.Struct({
    ModelSelectionExpression: S.optional(S.String),
    ResponseModels: S.optional(RouteModels),
    ResponseParameters: S.optional(RouteParameters),
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
).annotate({
  identifier: "UpdateRouteResponseResponse",
}) as any as S.Schema<UpdateRouteResponseResponse>;
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
export const UpdateStageRequest = S.suspend(() =>
  S.Struct({
    AccessLogSettings: S.optional(AccessLogSettings),
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    AutoDeploy: S.optional(S.Boolean),
    ClientCertificateId: S.optional(S.String),
    DefaultRouteSettings: S.optional(RouteSettings),
    DeploymentId: S.optional(S.String),
    Description: S.optional(S.String),
    RouteSettings: S.optional(RouteSettingsMap),
    StageName: S.String.pipe(T.HttpLabel("StageName")),
    StageVariables: S.optional(StageVariablesMap),
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
).annotate({
  identifier: "UpdateStageRequest",
}) as any as S.Schema<UpdateStageRequest>;
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
export const UpdateStageResponse = S.suspend(() =>
  S.Struct({
    AccessLogSettings: S.optional(AccessLogSettings),
    ApiGatewayManaged: S.optional(S.Boolean),
    AutoDeploy: S.optional(S.Boolean),
    ClientCertificateId: S.optional(S.String),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DefaultRouteSettings: S.optional(RouteSettings),
    DeploymentId: S.optional(S.String),
    Description: S.optional(S.String),
    LastDeploymentStatusMessage: S.optional(S.String),
    LastUpdatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    RouteSettings: S.optional(RouteSettingsMap),
    StageName: S.optional(S.String),
    StageVariables: S.optional(StageVariablesMap),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "UpdateStageResponse",
}) as any as S.Schema<UpdateStageResponse>;
export interface UpdateVpcLinkRequest {
  Name?: string;
  VpcLinkId: string;
}
export const UpdateVpcLinkRequest = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    VpcLinkId: S.String.pipe(T.HttpLabel("VpcLinkId")),
  })
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
).annotate({
  identifier: "UpdateVpcLinkRequest",
}) as any as S.Schema<UpdateVpcLinkRequest>;
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
export const UpdateVpcLinkResponse = S.suspend(() =>
  S.Struct({
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Name: S.optional(S.String),
    SecurityGroupIds: S.optional(SecurityGroupIdList),
    SubnetIds: S.optional(SubnetIdList),
    Tags: S.optional(Tags),
    VpcLinkId: S.optional(S.String),
    VpcLinkStatus: S.optional(VpcLinkStatus),
    VpcLinkStatusMessage: S.optional(S.String),
    VpcLinkVersion: S.optional(VpcLinkVersion),
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
).annotate({
  identifier: "UpdateVpcLinkResponse",
}) as any as S.Schema<UpdateVpcLinkResponse>;

//# Errors
export class BadRequestException extends S.TaggedErrorClass<BadRequestException>()(
  "BadRequestException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { Message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class NotFoundException extends S.TaggedErrorClass<NotFoundException>()(
  "NotFoundException",
  { Message: S.optional(S.String), ResourceType: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class TooManyRequestsException extends S.TaggedErrorClass<TooManyRequestsException>()(
  "TooManyRequestsException",
  { LimitType: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withThrottlingError) {}
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { Message: S.optional(S.String) },
).pipe(C.withAuthError) {}

//# Operations
/**
 * Creates an Api resource.
 */
export const createApi: API.OperationMethod<
  CreateApiRequest,
  CreateApiResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateApiRequest,
  output: CreateApiResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Creates an API mapping.
 */
export const createApiMapping: API.OperationMethod<
  CreateApiMappingRequest,
  CreateApiMappingResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateApiMappingRequest,
  output: CreateApiMappingResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Creates an Authorizer for an API.
 */
export const createAuthorizer: API.OperationMethod<
  CreateAuthorizerRequest,
  CreateAuthorizerResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAuthorizerRequest,
  output: CreateAuthorizerResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Creates a Deployment for an API.
 */
export const createDeployment: API.OperationMethod<
  CreateDeploymentRequest,
  CreateDeploymentResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateDeploymentRequest,
  output: CreateDeploymentResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Creates a domain name.
 */
export const createDomainName: API.OperationMethod<
  CreateDomainNameRequest,
  CreateDomainNameResponse,
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateDomainNameRequest,
  output: CreateDomainNameResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Creates an Integration.
 */
export const createIntegration: API.OperationMethod<
  CreateIntegrationRequest,
  CreateIntegrationResult,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateIntegrationRequest,
  output: CreateIntegrationResult,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Creates an IntegrationResponses.
 */
export const createIntegrationResponse: API.OperationMethod<
  CreateIntegrationResponseRequest,
  CreateIntegrationResponseResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateIntegrationResponseRequest,
  output: CreateIntegrationResponseResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Creates a Model for an API.
 */
export const createModel: API.OperationMethod<
  CreateModelRequest,
  CreateModelResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateModelRequest,
  output: CreateModelResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Creates a portal.
 */
export const createPortal: API.OperationMethod<
  CreatePortalRequest,
  CreatePortalResponse,
  | AccessDeniedException
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePortalRequest,
  output: CreatePortalResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    TooManyRequestsException,
  ],
}));
/**
 * Creates a new portal product.
 */
export const createPortalProduct: API.OperationMethod<
  CreatePortalProductRequest,
  CreatePortalProductResponse,
  | AccessDeniedException
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePortalProductRequest,
  output: CreatePortalProductResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    TooManyRequestsException,
  ],
}));
/**
 * Creates a new product page for a portal product.
 */
export const createProductPage: API.OperationMethod<
  CreateProductPageRequest,
  CreateProductPageResponse,
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProductPageRequest,
  output: CreateProductPageResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Creates a product REST endpoint page for a portal product.
 */
export const createProductRestEndpointPage: API.OperationMethod<
  CreateProductRestEndpointPageRequest,
  CreateProductRestEndpointPageResponse,
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProductRestEndpointPageRequest,
  output: CreateProductRestEndpointPageResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Creates a Route for an API.
 */
export const createRoute: API.OperationMethod<
  CreateRouteRequest,
  CreateRouteResult,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRouteRequest,
  output: CreateRouteResult,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Creates a RouteResponse for a Route.
 */
export const createRouteResponse: API.OperationMethod<
  CreateRouteResponseRequest,
  CreateRouteResponseResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRouteResponseRequest,
  output: CreateRouteResponseResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Creates a RoutingRule.
 */
export const createRoutingRule: API.OperationMethod<
  CreateRoutingRuleRequest,
  CreateRoutingRuleResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRoutingRuleRequest,
  output: CreateRoutingRuleResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Creates a Stage for an API.
 */
export const createStage: API.OperationMethod<
  CreateStageRequest,
  CreateStageResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateStageRequest,
  output: CreateStageResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Creates a VPC link.
 */
export const createVpcLink: API.OperationMethod<
  CreateVpcLinkRequest,
  CreateVpcLinkResponse,
  BadRequestException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateVpcLinkRequest,
  output: CreateVpcLinkResponse,
  errors: [BadRequestException, TooManyRequestsException],
}));
/**
 * Deletes the AccessLogSettings for a Stage. To disable access logging for a Stage, delete its AccessLogSettings.
 */
export const deleteAccessLogSettings: API.OperationMethod<
  DeleteAccessLogSettingsRequest,
  DeleteAccessLogSettingsResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAccessLogSettingsRequest,
  output: DeleteAccessLogSettingsResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Deletes an Api resource.
 */
export const deleteApi: API.OperationMethod<
  DeleteApiRequest,
  DeleteApiResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteApiRequest,
  output: DeleteApiResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Deletes an API mapping.
 */
export const deleteApiMapping: API.OperationMethod<
  DeleteApiMappingRequest,
  DeleteApiMappingResponse,
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteApiMappingRequest,
  output: DeleteApiMappingResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
}));
/**
 * Deletes an Authorizer.
 */
export const deleteAuthorizer: API.OperationMethod<
  DeleteAuthorizerRequest,
  DeleteAuthorizerResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAuthorizerRequest,
  output: DeleteAuthorizerResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Deletes a CORS configuration.
 */
export const deleteCorsConfiguration: API.OperationMethod<
  DeleteCorsConfigurationRequest,
  DeleteCorsConfigurationResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCorsConfigurationRequest,
  output: DeleteCorsConfigurationResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Deletes a Deployment.
 */
export const deleteDeployment: API.OperationMethod<
  DeleteDeploymentRequest,
  DeleteDeploymentResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteDeploymentRequest,
  output: DeleteDeploymentResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Deletes a domain name.
 */
export const deleteDomainName: API.OperationMethod<
  DeleteDomainNameRequest,
  DeleteDomainNameResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteDomainNameRequest,
  output: DeleteDomainNameResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Deletes an Integration.
 */
export const deleteIntegration: API.OperationMethod<
  DeleteIntegrationRequest,
  DeleteIntegrationResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteIntegrationRequest,
  output: DeleteIntegrationResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Deletes an IntegrationResponses.
 */
export const deleteIntegrationResponse: API.OperationMethod<
  DeleteIntegrationResponseRequest,
  DeleteIntegrationResponseResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteIntegrationResponseRequest,
  output: DeleteIntegrationResponseResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Deletes a Model.
 */
export const deleteModel: API.OperationMethod<
  DeleteModelRequest,
  DeleteModelResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteModelRequest,
  output: DeleteModelResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Deletes a portal.
 */
export const deletePortal: API.OperationMethod<
  DeletePortalRequest,
  DeletePortalResponse,
  | AccessDeniedException
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePortalRequest,
  output: DeletePortalResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    TooManyRequestsException,
  ],
}));
/**
 * Deletes a portal product.
 */
export const deletePortalProduct: API.OperationMethod<
  DeletePortalProductRequest,
  DeletePortalProductResponse,
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePortalProductRequest,
  output: DeletePortalProductResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Deletes the sharing policy for a portal product.
 */
export const deletePortalProductSharingPolicy: API.OperationMethod<
  DeletePortalProductSharingPolicyRequest,
  DeletePortalProductSharingPolicyResponse,
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePortalProductSharingPolicyRequest,
  output: DeletePortalProductSharingPolicyResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Deletes a product page of a portal product.
 */
export const deleteProductPage: API.OperationMethod<
  DeleteProductPageRequest,
  DeleteProductPageResponse,
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProductPageRequest,
  output: DeleteProductPageResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Deletes a product REST endpoint page.
 */
export const deleteProductRestEndpointPage: API.OperationMethod<
  DeleteProductRestEndpointPageRequest,
  DeleteProductRestEndpointPageResponse,
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProductRestEndpointPageRequest,
  output: DeleteProductRestEndpointPageResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Deletes a Route.
 */
export const deleteRoute: API.OperationMethod<
  DeleteRouteRequest,
  DeleteRouteResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRouteRequest,
  output: DeleteRouteResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Deletes a route request parameter. Supported only for WebSocket APIs.
 */
export const deleteRouteRequestParameter: API.OperationMethod<
  DeleteRouteRequestParameterRequest,
  DeleteRouteRequestParameterResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRouteRequestParameterRequest,
  output: DeleteRouteRequestParameterResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Deletes a RouteResponse.
 */
export const deleteRouteResponse: API.OperationMethod<
  DeleteRouteResponseRequest,
  DeleteRouteResponseResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRouteResponseRequest,
  output: DeleteRouteResponseResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Deletes the RouteSettings for a stage.
 */
export const deleteRouteSettings: API.OperationMethod<
  DeleteRouteSettingsRequest,
  DeleteRouteSettingsResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRouteSettingsRequest,
  output: DeleteRouteSettingsResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Deletes a routing rule.
 */
export const deleteRoutingRule: API.OperationMethod<
  DeleteRoutingRuleRequest,
  DeleteRoutingRuleResponse,
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRoutingRuleRequest,
  output: DeleteRoutingRuleResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
}));
/**
 * Deletes a Stage.
 */
export const deleteStage: API.OperationMethod<
  DeleteStageRequest,
  DeleteStageResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteStageRequest,
  output: DeleteStageResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Deletes a VPC link.
 */
export const deleteVpcLink: API.OperationMethod<
  DeleteVpcLinkRequest,
  DeleteVpcLinkResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVpcLinkRequest,
  output: DeleteVpcLinkResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Deletes the publication of a portal portal.
 */
export const disablePortal: API.OperationMethod<
  DisablePortalRequest,
  DisablePortalResponse,
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisablePortalRequest,
  output: DisablePortalResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 *
 */
export const exportApi: API.OperationMethod<
  ExportApiRequest,
  ExportApiResponse,
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExportApiRequest,
  output: ExportApiResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
}));
/**
 * Gets an Api resource.
 */
export const getApi: API.OperationMethod<
  GetApiRequest,
  GetApiResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetApiRequest,
  output: GetApiResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Gets an API mapping.
 */
export const getApiMapping: API.OperationMethod<
  GetApiMappingRequest,
  GetApiMappingResponse,
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetApiMappingRequest,
  output: GetApiMappingResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
}));
/**
 * Gets API mappings.
 */
export const getApiMappings: API.OperationMethod<
  GetApiMappingsRequest,
  GetApiMappingsResponse,
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetApiMappingsRequest,
  output: GetApiMappingsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
}));
/**
 * Gets a collection of Api resources.
 */
export const getApis: API.OperationMethod<
  GetApisRequest,
  GetApisResponse,
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetApisRequest,
  output: GetApisResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
}));
/**
 * Gets an Authorizer.
 */
export const getAuthorizer: API.OperationMethod<
  GetAuthorizerRequest,
  GetAuthorizerResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAuthorizerRequest,
  output: GetAuthorizerResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Gets the Authorizers for an API.
 */
export const getAuthorizers: API.OperationMethod<
  GetAuthorizersRequest,
  GetAuthorizersResponse,
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAuthorizersRequest,
  output: GetAuthorizersResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
}));
/**
 * Gets a Deployment.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentRequest,
  GetDeploymentResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDeploymentRequest,
  output: GetDeploymentResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Gets the Deployments for an API.
 */
export const getDeployments: API.OperationMethod<
  GetDeploymentsRequest,
  GetDeploymentsResponse,
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDeploymentsRequest,
  output: GetDeploymentsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
}));
/**
 * Gets a domain name.
 */
export const getDomainName: API.OperationMethod<
  GetDomainNameRequest,
  GetDomainNameResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDomainNameRequest,
  output: GetDomainNameResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Gets the domain names for an AWS account.
 */
export const getDomainNames: API.OperationMethod<
  GetDomainNamesRequest,
  GetDomainNamesResponse,
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDomainNamesRequest,
  output: GetDomainNamesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
}));
/**
 * Gets an Integration.
 */
export const getIntegration: API.OperationMethod<
  GetIntegrationRequest,
  GetIntegrationResult,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIntegrationRequest,
  output: GetIntegrationResult,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Gets an IntegrationResponses.
 */
export const getIntegrationResponse: API.OperationMethod<
  GetIntegrationResponseRequest,
  GetIntegrationResponseResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIntegrationResponseRequest,
  output: GetIntegrationResponseResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Gets the IntegrationResponses for an Integration.
 */
export const getIntegrationResponses: API.OperationMethod<
  GetIntegrationResponsesRequest,
  GetIntegrationResponsesResponse,
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIntegrationResponsesRequest,
  output: GetIntegrationResponsesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
}));
/**
 * Gets the Integrations for an API.
 */
export const getIntegrations: API.OperationMethod<
  GetIntegrationsRequest,
  GetIntegrationsResponse,
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIntegrationsRequest,
  output: GetIntegrationsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
}));
/**
 * Gets a Model.
 */
export const getModel: API.OperationMethod<
  GetModelRequest,
  GetModelResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetModelRequest,
  output: GetModelResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Gets the Models for an API.
 */
export const getModels: API.OperationMethod<
  GetModelsRequest,
  GetModelsResponse,
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetModelsRequest,
  output: GetModelsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
}));
/**
 * Gets a model template.
 */
export const getModelTemplate: API.OperationMethod<
  GetModelTemplateRequest,
  GetModelTemplateResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetModelTemplateRequest,
  output: GetModelTemplateResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Gets a portal.
 */
export const getPortal: API.OperationMethod<
  GetPortalRequest,
  GetPortalResponse,
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPortalRequest,
  output: GetPortalResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Gets a portal product.
 */
export const getPortalProduct: API.OperationMethod<
  GetPortalProductRequest,
  GetPortalProductResponse,
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPortalProductRequest,
  output: GetPortalProductResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Gets the sharing policy for a portal product.
 */
export const getPortalProductSharingPolicy: API.OperationMethod<
  GetPortalProductSharingPolicyRequest,
  GetPortalProductSharingPolicyResponse,
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPortalProductSharingPolicyRequest,
  output: GetPortalProductSharingPolicyResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Gets a product page of a portal product.
 */
export const getProductPage: API.OperationMethod<
  GetProductPageRequest,
  GetProductPageResponse,
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProductPageRequest,
  output: GetProductPageResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Gets a product REST endpoint page.
 */
export const getProductRestEndpointPage: API.OperationMethod<
  GetProductRestEndpointPageRequest,
  GetProductRestEndpointPageResponse,
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProductRestEndpointPageRequest,
  output: GetProductRestEndpointPageResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Gets a Route.
 */
export const getRoute: API.OperationMethod<
  GetRouteRequest,
  GetRouteResult,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRouteRequest,
  output: GetRouteResult,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Gets a RouteResponse.
 */
export const getRouteResponse: API.OperationMethod<
  GetRouteResponseRequest,
  GetRouteResponseResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRouteResponseRequest,
  output: GetRouteResponseResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Gets the RouteResponses for a Route.
 */
export const getRouteResponses: API.OperationMethod<
  GetRouteResponsesRequest,
  GetRouteResponsesResponse,
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRouteResponsesRequest,
  output: GetRouteResponsesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
}));
/**
 * Gets the Routes for an API.
 */
export const getRoutes: API.OperationMethod<
  GetRoutesRequest,
  GetRoutesResponse,
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRoutesRequest,
  output: GetRoutesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
}));
/**
 * Gets a routing rule.
 */
export const getRoutingRule: API.OperationMethod<
  GetRoutingRuleRequest,
  GetRoutingRuleResponse,
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRoutingRuleRequest,
  output: GetRoutingRuleResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
}));
/**
 * Gets a Stage.
 */
export const getStage: API.OperationMethod<
  GetStageRequest,
  GetStageResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetStageRequest,
  output: GetStageResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Gets the Stages for an API.
 */
export const getStages: API.OperationMethod<
  GetStagesRequest,
  GetStagesResponse,
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetStagesRequest,
  output: GetStagesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
}));
/**
 * Gets a collection of Tag resources.
 */
export const getTags: API.OperationMethod<
  GetTagsRequest,
  GetTagsResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetTagsRequest,
  output: GetTagsResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Gets a VPC link.
 */
export const getVpcLink: API.OperationMethod<
  GetVpcLinkRequest,
  GetVpcLinkResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVpcLinkRequest,
  output: GetVpcLinkResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Gets a collection of VPC links.
 */
export const getVpcLinks: API.OperationMethod<
  GetVpcLinksRequest,
  GetVpcLinksResponse,
  BadRequestException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVpcLinksRequest,
  output: GetVpcLinksResponse,
  errors: [BadRequestException, TooManyRequestsException],
}));
/**
 * Imports an API.
 */
export const importApi: API.OperationMethod<
  ImportApiRequest,
  ImportApiResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportApiRequest,
  output: ImportApiResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Lists portal products.
 */
export const listPortalProducts: API.OperationMethod<
  ListPortalProductsRequest,
  ListPortalProductsResponse,
  | AccessDeniedException
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListPortalProductsRequest,
  output: ListPortalProductsResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    TooManyRequestsException,
  ],
}));
/**
 * Lists portals.
 */
export const listPortals: API.OperationMethod<
  ListPortalsRequest,
  ListPortalsResponse,
  | AccessDeniedException
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListPortalsRequest,
  output: ListPortalsResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    TooManyRequestsException,
  ],
}));
/**
 * Lists the product pages for a portal product.
 */
export const listProductPages: API.OperationMethod<
  ListProductPagesRequest,
  ListProductPagesResponse,
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListProductPagesRequest,
  output: ListProductPagesResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Lists the product REST endpoint pages of a portal product.
 */
export const listProductRestEndpointPages: API.OperationMethod<
  ListProductRestEndpointPagesRequest,
  ListProductRestEndpointPagesResponse,
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListProductRestEndpointPagesRequest,
  output: ListProductRestEndpointPagesResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Lists routing rules.
 */
export const listRoutingRules: API.OperationMethod<
  ListRoutingRulesRequest,
  ListRoutingRulesResponse,
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListRoutingRulesRequest,
  ) => stream.Stream<
    ListRoutingRulesResponse,
    | BadRequestException
    | NotFoundException
    | TooManyRequestsException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListRoutingRulesRequest,
  ) => stream.Stream<
    RoutingRule,
    | BadRequestException
    | NotFoundException
    | TooManyRequestsException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRoutingRulesRequest,
  output: ListRoutingRulesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RoutingRules",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Creates a portal preview.
 */
export const previewPortal: API.OperationMethod<
  PreviewPortalRequest,
  PreviewPortalResponse,
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PreviewPortalRequest,
  output: PreviewPortalResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Publishes a portal.
 */
export const publishPortal: API.OperationMethod<
  PublishPortalRequest,
  PublishPortalResponse,
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PublishPortalRequest,
  output: PublishPortalResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Updates the sharing policy for a portal product.
 */
export const putPortalProductSharingPolicy: API.OperationMethod<
  PutPortalProductSharingPolicyRequest,
  PutPortalProductSharingPolicyResponse,
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutPortalProductSharingPolicyRequest,
  output: PutPortalProductSharingPolicyResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Updates a routing rule.
 */
export const putRoutingRule: API.OperationMethod<
  PutRoutingRuleRequest,
  PutRoutingRuleResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutRoutingRuleRequest,
  output: PutRoutingRuleResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Puts an Api resource.
 */
export const reimportApi: API.OperationMethod<
  ReimportApiRequest,
  ReimportApiResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ReimportApiRequest,
  output: ReimportApiResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Resets all authorizer cache entries on a stage. Supported only for HTTP APIs.
 */
export const resetAuthorizersCache: API.OperationMethod<
  ResetAuthorizersCacheRequest,
  ResetAuthorizersCacheResponse,
  NotFoundException | TooManyRequestsException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ResetAuthorizersCacheRequest,
  output: ResetAuthorizersCacheResponse,
  errors: [NotFoundException, TooManyRequestsException],
}));
/**
 * Creates a new Tag resource to represent a tag.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Deletes a Tag.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Updates an Api resource.
 */
export const updateApi: API.OperationMethod<
  UpdateApiRequest,
  UpdateApiResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateApiRequest,
  output: UpdateApiResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * The API mapping.
 */
export const updateApiMapping: API.OperationMethod<
  UpdateApiMappingRequest,
  UpdateApiMappingResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateApiMappingRequest,
  output: UpdateApiMappingResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Updates an Authorizer.
 */
export const updateAuthorizer: API.OperationMethod<
  UpdateAuthorizerRequest,
  UpdateAuthorizerResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateAuthorizerRequest,
  output: UpdateAuthorizerResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Updates a Deployment.
 */
export const updateDeployment: API.OperationMethod<
  UpdateDeploymentRequest,
  UpdateDeploymentResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateDeploymentRequest,
  output: UpdateDeploymentResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Updates a domain name.
 */
export const updateDomainName: API.OperationMethod<
  UpdateDomainNameRequest,
  UpdateDomainNameResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateDomainNameRequest,
  output: UpdateDomainNameResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Updates an Integration.
 */
export const updateIntegration: API.OperationMethod<
  UpdateIntegrationRequest,
  UpdateIntegrationResult,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateIntegrationRequest,
  output: UpdateIntegrationResult,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Updates an IntegrationResponses.
 */
export const updateIntegrationResponse: API.OperationMethod<
  UpdateIntegrationResponseRequest,
  UpdateIntegrationResponseResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateIntegrationResponseRequest,
  output: UpdateIntegrationResponseResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Updates a Model.
 */
export const updateModel: API.OperationMethod<
  UpdateModelRequest,
  UpdateModelResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateModelRequest,
  output: UpdateModelResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Updates a portal.
 */
export const updatePortal: API.OperationMethod<
  UpdatePortalRequest,
  UpdatePortalResponse,
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePortalRequest,
  output: UpdatePortalResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Updates the portal product.
 */
export const updatePortalProduct: API.OperationMethod<
  UpdatePortalProductRequest,
  UpdatePortalProductResponse,
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePortalProductRequest,
  output: UpdatePortalProductResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Updates a product page of a portal product.
 */
export const updateProductPage: API.OperationMethod<
  UpdateProductPageRequest,
  UpdateProductPageResponse,
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateProductPageRequest,
  output: UpdateProductPageResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Updates a product REST endpoint page.
 */
export const updateProductRestEndpointPage: API.OperationMethod<
  UpdateProductRestEndpointPageRequest,
  UpdateProductRestEndpointPageResponse,
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateProductRestEndpointPageRequest,
  output: UpdateProductRestEndpointPageResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Updates a Route.
 */
export const updateRoute: API.OperationMethod<
  UpdateRouteRequest,
  UpdateRouteResult,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRouteRequest,
  output: UpdateRouteResult,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Updates a RouteResponse.
 */
export const updateRouteResponse: API.OperationMethod<
  UpdateRouteResponseRequest,
  UpdateRouteResponseResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRouteResponseRequest,
  output: UpdateRouteResponseResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Updates a Stage.
 */
export const updateStage: API.OperationMethod<
  UpdateStageRequest,
  UpdateStageResponse,
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateStageRequest,
  output: UpdateStageResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Updates a VPC link.
 */
export const updateVpcLink: API.OperationMethod<
  UpdateVpcLinkRequest,
  UpdateVpcLinkResponse,
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateVpcLinkRequest,
  output: UpdateVpcLinkResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
}));
