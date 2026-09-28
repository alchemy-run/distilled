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
  sdkId: "App Mesh",
  target: "AppMesh",
  version: "2019-01-25",
  sigv4: "appmesh",
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
                `https://appmesh-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://appmesh-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://appmesh.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://appmesh.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class InternalServerErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerErrorException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUseException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError", "RetryableError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type ResourceName = string;
export type GatewayRoutePriority = number;
export type HttpPathExact = string;
export type HttpPathRegex = string;
export interface HttpPathMatch {
  exact?: string;
  regex?: string;
}
export type QueryParameterName = string;
export interface QueryParameterMatch {
  exact?: string;
}
export interface HttpQueryParameter {
  name: string;
  match?: QueryParameterMatch;
}
export type HttpQueryParameters = HttpQueryParameter[];
export type HttpMethod = string;
export type ExactHostName = string;
export type SuffixHostname = string;
export interface GatewayRouteHostnameMatch {
  exact?: string;
  suffix?: string;
}
export type HeaderName = string;
export type HeaderMatch = string;
export interface MatchRange {
  start: number;
  end: number;
}
export type HeaderMatchMethod =
  | {
      exact: string;
      regex?: never;
      range?: never;
      prefix?: never;
      suffix?: never;
    }
  | {
      exact?: never;
      regex: string;
      range?: never;
      prefix?: never;
      suffix?: never;
    }
  | {
      exact?: never;
      regex?: never;
      range: MatchRange;
      prefix?: never;
      suffix?: never;
    }
  | {
      exact?: never;
      regex?: never;
      range?: never;
      prefix: string;
      suffix?: never;
    }
  | {
      exact?: never;
      regex?: never;
      range?: never;
      prefix?: never;
      suffix: string;
    };
export interface HttpGatewayRouteHeader {
  name: string;
  invert?: boolean;
  match?: HeaderMatchMethod;
}
export type HttpGatewayRouteHeaders = HttpGatewayRouteHeader[];
export type ListenerPort = number;
export interface HttpGatewayRouteMatch {
  prefix?: string;
  path?: HttpPathMatch;
  queryParameters?: HttpQueryParameter[];
  method?: string;
  hostname?: GatewayRouteHostnameMatch;
  headers?: HttpGatewayRouteHeader[];
  port?: number;
}
export interface GatewayRouteVirtualService {
  virtualServiceName: string;
}
export interface GatewayRouteTarget {
  virtualService: GatewayRouteVirtualService;
  port?: number;
}
export type DefaultGatewayRouteRewrite = string;
export type HttpGatewayRoutePrefix = string;
export interface HttpGatewayRoutePrefixRewrite {
  defaultPrefix?: string;
  value?: string;
}
export interface HttpGatewayRoutePathRewrite {
  exact?: string;
}
export interface GatewayRouteHostnameRewrite {
  defaultTargetHostname?: string;
}
export interface HttpGatewayRouteRewrite {
  prefix?: HttpGatewayRoutePrefixRewrite;
  path?: HttpGatewayRoutePathRewrite;
  hostname?: GatewayRouteHostnameRewrite;
}
export interface HttpGatewayRouteAction {
  target: GatewayRouteTarget;
  rewrite?: HttpGatewayRouteRewrite;
}
export interface HttpGatewayRoute {
  match: HttpGatewayRouteMatch;
  action: HttpGatewayRouteAction;
}
export type ServiceName = string;
export type GrpcMetadataMatchMethod =
  | {
      exact: string;
      regex?: never;
      range?: never;
      prefix?: never;
      suffix?: never;
    }
  | {
      exact?: never;
      regex: string;
      range?: never;
      prefix?: never;
      suffix?: never;
    }
  | {
      exact?: never;
      regex?: never;
      range: MatchRange;
      prefix?: never;
      suffix?: never;
    }
  | {
      exact?: never;
      regex?: never;
      range?: never;
      prefix: string;
      suffix?: never;
    }
  | {
      exact?: never;
      regex?: never;
      range?: never;
      prefix?: never;
      suffix: string;
    };
export interface GrpcGatewayRouteMetadata {
  name: string;
  invert?: boolean;
  match?: GrpcMetadataMatchMethod;
}
export type GrpcGatewayRouteMetadataList = GrpcGatewayRouteMetadata[];
export interface GrpcGatewayRouteMatch {
  serviceName?: string;
  hostname?: GatewayRouteHostnameMatch;
  metadata?: GrpcGatewayRouteMetadata[];
  port?: number;
}
export interface GrpcGatewayRouteRewrite {
  hostname?: GatewayRouteHostnameRewrite;
}
export interface GrpcGatewayRouteAction {
  target: GatewayRouteTarget;
  rewrite?: GrpcGatewayRouteRewrite;
}
export interface GrpcGatewayRoute {
  match: GrpcGatewayRouteMatch;
  action: GrpcGatewayRouteAction;
}
export interface GatewayRouteSpec {
  priority?: number;
  httpRoute?: HttpGatewayRoute;
  http2Route?: HttpGatewayRoute;
  grpcRoute?: GrpcGatewayRoute;
}
export type TagKey = string;
export type TagValue = string;
export interface TagRef {
  key: string;
  value: string;
}
export type TagList = TagRef[];
export type AccountId = string;
export interface CreateGatewayRouteInput {
  gatewayRouteName: string;
  meshName: string;
  virtualGatewayName: string;
  spec: GatewayRouteSpec;
  tags?: TagRef[];
  clientToken?: string;
  meshOwner?: string;
}
export type Arn = string;
export interface ResourceMetadata {
  arn: string;
  version: number;
  uid: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  meshOwner: string;
  resourceOwner: string;
}
export type GatewayRouteStatusCode = string;
export interface GatewayRouteStatus {
  status: string;
}
export interface GatewayRouteData {
  meshName: string;
  gatewayRouteName: string;
  virtualGatewayName: string;
  spec: GatewayRouteSpec;
  metadata: ResourceMetadata;
  status: GatewayRouteStatus;
}
export interface CreateGatewayRouteOutput {
  gatewayRoute: GatewayRouteData;
}
export type EgressFilterType = string;
export interface EgressFilter {
  type: string;
}
export type IpPreference = string;
export interface MeshServiceDiscovery {
  ipPreference?: string;
}
export interface MeshSpec {
  egressFilter?: EgressFilter;
  serviceDiscovery?: MeshServiceDiscovery;
}
export interface CreateMeshInput {
  meshName: string;
  spec?: MeshSpec;
  tags?: TagRef[];
  clientToken?: string;
}
export type MeshStatusCode = string;
export interface MeshStatus {
  status?: string;
}
export interface MeshData {
  meshName: string;
  spec: MeshSpec;
  metadata: ResourceMetadata;
  status: MeshStatus;
}
export interface CreateMeshOutput {
  mesh: MeshData;
}
export type RoutePriority = number;
export type HttpScheme = string;
export interface HttpRouteHeader {
  name: string;
  invert?: boolean;
  match?: HeaderMatchMethod;
}
export type HttpRouteHeaders = HttpRouteHeader[];
export interface HttpRouteMatch {
  prefix?: string;
  path?: HttpPathMatch;
  queryParameters?: HttpQueryParameter[];
  method?: string;
  scheme?: string;
  headers?: HttpRouteHeader[];
  port?: number;
}
export type PercentInt = number;
export interface WeightedTarget {
  virtualNode: string;
  weight: number;
  port?: number;
}
export type WeightedTargets = WeightedTarget[];
export interface HttpRouteAction {
  weightedTargets: WeightedTarget[];
}
export type DurationValue = number;
export type DurationUnit = string;
export interface Duration {
  value?: number;
  unit?: string;
}
export type MaxRetries = number;
export type HttpRetryPolicyEvent = string;
export type HttpRetryPolicyEvents = string[];
export type TcpRetryPolicyEvent = string;
export type TcpRetryPolicyEvents = string[];
export interface HttpRetryPolicy {
  perRetryTimeout: Duration;
  maxRetries: number;
  httpRetryEvents?: string[];
  tcpRetryEvents?: string[];
}
export interface HttpTimeout {
  perRequest?: Duration;
  idle?: Duration;
}
export interface HttpRoute {
  match: HttpRouteMatch;
  action: HttpRouteAction;
  retryPolicy?: HttpRetryPolicy;
  timeout?: HttpTimeout;
}
export interface TcpRouteAction {
  weightedTargets: WeightedTarget[];
}
export interface TcpTimeout {
  idle?: Duration;
}
export interface TcpRouteMatch {
  port?: number;
}
export interface TcpRoute {
  action: TcpRouteAction;
  timeout?: TcpTimeout;
  match?: TcpRouteMatch;
}
export interface GrpcRouteAction {
  weightedTargets: WeightedTarget[];
}
export type MethodName = string;
export type GrpcRouteMetadataMatchMethod =
  | {
      exact: string;
      regex?: never;
      range?: never;
      prefix?: never;
      suffix?: never;
    }
  | {
      exact?: never;
      regex: string;
      range?: never;
      prefix?: never;
      suffix?: never;
    }
  | {
      exact?: never;
      regex?: never;
      range: MatchRange;
      prefix?: never;
      suffix?: never;
    }
  | {
      exact?: never;
      regex?: never;
      range?: never;
      prefix: string;
      suffix?: never;
    }
  | {
      exact?: never;
      regex?: never;
      range?: never;
      prefix?: never;
      suffix: string;
    };
export interface GrpcRouteMetadata {
  name: string;
  invert?: boolean;
  match?: GrpcRouteMetadataMatchMethod;
}
export type GrpcRouteMetadataList = GrpcRouteMetadata[];
export interface GrpcRouteMatch {
  serviceName?: string;
  methodName?: string;
  metadata?: GrpcRouteMetadata[];
  port?: number;
}
export type GrpcRetryPolicyEvent = string;
export type GrpcRetryPolicyEvents = string[];
export interface GrpcRetryPolicy {
  perRetryTimeout: Duration;
  maxRetries: number;
  httpRetryEvents?: string[];
  tcpRetryEvents?: string[];
  grpcRetryEvents?: string[];
}
export interface GrpcTimeout {
  perRequest?: Duration;
  idle?: Duration;
}
export interface GrpcRoute {
  action: GrpcRouteAction;
  match: GrpcRouteMatch;
  retryPolicy?: GrpcRetryPolicy;
  timeout?: GrpcTimeout;
}
export interface RouteSpec {
  priority?: number;
  httpRoute?: HttpRoute;
  tcpRoute?: TcpRoute;
  http2Route?: HttpRoute;
  grpcRoute?: GrpcRoute;
}
export interface CreateRouteInput {
  routeName: string;
  meshName: string;
  virtualRouterName: string;
  spec: RouteSpec;
  tags?: TagRef[];
  clientToken?: string;
  meshOwner?: string;
}
export type RouteStatusCode = string;
export interface RouteStatus {
  status: string;
}
export interface RouteData {
  meshName: string;
  virtualRouterName: string;
  routeName: string;
  spec: RouteSpec;
  metadata: ResourceMetadata;
  status: RouteStatus;
}
export interface CreateRouteOutput {
  route: RouteData;
}
export type PortNumber = number;
export type PortSet = number[];
export type FilePath = string;
export interface VirtualGatewayListenerTlsFileCertificate {
  certificateChain: string;
  privateKey: string;
}
export type VirtualGatewaySdsSecretName = string;
export interface VirtualGatewayListenerTlsSdsCertificate {
  secretName: string;
}
export type VirtualGatewayClientTlsCertificate =
  | { file: VirtualGatewayListenerTlsFileCertificate; sds?: never }
  | { file?: never; sds: VirtualGatewayListenerTlsSdsCertificate };
export type VirtualGatewayCertificateAuthorityArns = string[];
export interface VirtualGatewayTlsValidationContextAcmTrust {
  certificateAuthorityArns: string[];
}
export interface VirtualGatewayTlsValidationContextFileTrust {
  certificateChain: string;
}
export interface VirtualGatewayTlsValidationContextSdsTrust {
  secretName: string;
}
export type VirtualGatewayTlsValidationContextTrust =
  | {
      acm: VirtualGatewayTlsValidationContextAcmTrust;
      file?: never;
      sds?: never;
    }
  | {
      acm?: never;
      file: VirtualGatewayTlsValidationContextFileTrust;
      sds?: never;
    }
  | {
      acm?: never;
      file?: never;
      sds: VirtualGatewayTlsValidationContextSdsTrust;
    };
export type SubjectAlternativeName = string;
export type SubjectAlternativeNameList = string[];
export interface SubjectAlternativeNameMatchers {
  exact: string[];
}
export interface SubjectAlternativeNames {
  match: SubjectAlternativeNameMatchers;
}
export interface VirtualGatewayTlsValidationContext {
  trust: VirtualGatewayTlsValidationContextTrust;
  subjectAlternativeNames?: SubjectAlternativeNames;
}
export interface VirtualGatewayClientPolicyTls {
  enforce?: boolean;
  ports?: number[];
  certificate?: VirtualGatewayClientTlsCertificate;
  validation: VirtualGatewayTlsValidationContext;
}
export interface VirtualGatewayClientPolicy {
  tls?: VirtualGatewayClientPolicyTls;
}
export interface VirtualGatewayBackendDefaults {
  clientPolicy?: VirtualGatewayClientPolicy;
}
export type VirtualGatewayHealthCheckTimeoutMillis = number;
export type VirtualGatewayHealthCheckIntervalMillis = number;
export type VirtualGatewayPortProtocol = string;
export type VirtualGatewayHealthCheckThreshold = number;
export interface VirtualGatewayHealthCheckPolicy {
  timeoutMillis: number;
  intervalMillis: number;
  protocol: string;
  port?: number;
  path?: string;
  healthyThreshold: number;
  unhealthyThreshold: number;
}
export interface VirtualGatewayPortMapping {
  port: number;
  protocol: string;
}
export type VirtualGatewayListenerTlsMode = string;
export type VirtualGatewayListenerTlsValidationContextTrust =
  | { file: VirtualGatewayTlsValidationContextFileTrust; sds?: never }
  | { file?: never; sds: VirtualGatewayTlsValidationContextSdsTrust };
export interface VirtualGatewayListenerTlsValidationContext {
  trust: VirtualGatewayListenerTlsValidationContextTrust;
  subjectAlternativeNames?: SubjectAlternativeNames;
}
export interface VirtualGatewayListenerTlsAcmCertificate {
  certificateArn: string;
}
export type VirtualGatewayListenerTlsCertificate =
  | { acm: VirtualGatewayListenerTlsAcmCertificate; file?: never; sds?: never }
  | { acm?: never; file: VirtualGatewayListenerTlsFileCertificate; sds?: never }
  | { acm?: never; file?: never; sds: VirtualGatewayListenerTlsSdsCertificate };
export interface VirtualGatewayListenerTls {
  mode: string;
  validation?: VirtualGatewayListenerTlsValidationContext;
  certificate: VirtualGatewayListenerTlsCertificate;
}
export type MaxConnections = number;
export type MaxPendingRequests = number;
export interface VirtualGatewayHttpConnectionPool {
  maxConnections: number;
  maxPendingRequests?: number;
}
export type MaxRequests = number;
export interface VirtualGatewayHttp2ConnectionPool {
  maxRequests: number;
}
export interface VirtualGatewayGrpcConnectionPool {
  maxRequests: number;
}
export type VirtualGatewayConnectionPool =
  | { http: VirtualGatewayHttpConnectionPool; http2?: never; grpc?: never }
  | { http?: never; http2: VirtualGatewayHttp2ConnectionPool; grpc?: never }
  | { http?: never; http2?: never; grpc: VirtualGatewayGrpcConnectionPool };
export interface VirtualGatewayListener {
  healthCheck?: VirtualGatewayHealthCheckPolicy;
  portMapping: VirtualGatewayPortMapping;
  tls?: VirtualGatewayListenerTls;
  connectionPool?: VirtualGatewayConnectionPool;
}
export type VirtualGatewayListeners = VirtualGatewayListener[];
export type TextFormat = string;
export type JsonKey = string;
export type JsonValue = string;
export interface JsonFormatRef {
  key: string;
  value: string;
}
export type JsonFormat = JsonFormatRef[];
export type LoggingFormat =
  | { text: string; json?: never }
  | { text?: never; json: JsonFormatRef[] };
export interface VirtualGatewayFileAccessLog {
  path: string;
  format?: LoggingFormat;
}
export type VirtualGatewayAccessLog = { file: VirtualGatewayFileAccessLog };
export interface VirtualGatewayLogging {
  accessLog?: VirtualGatewayAccessLog;
}
export interface VirtualGatewaySpec {
  backendDefaults?: VirtualGatewayBackendDefaults;
  listeners: VirtualGatewayListener[];
  logging?: VirtualGatewayLogging;
}
export interface CreateVirtualGatewayInput {
  virtualGatewayName: string;
  meshName: string;
  spec: VirtualGatewaySpec;
  tags?: TagRef[];
  clientToken?: string;
  meshOwner?: string;
}
export type VirtualGatewayStatusCode = string;
export interface VirtualGatewayStatus {
  status: string;
}
export interface VirtualGatewayData {
  meshName: string;
  virtualGatewayName: string;
  spec: VirtualGatewaySpec;
  metadata: ResourceMetadata;
  status: VirtualGatewayStatus;
}
export interface CreateVirtualGatewayOutput {
  virtualGateway: VirtualGatewayData;
}
export type Hostname = string;
export type DnsResponseType = string;
export interface DnsServiceDiscovery {
  hostname: string;
  responseType?: string;
  ipPreference?: string;
}
export type AwsCloudMapName = string;
export type AwsCloudMapInstanceAttributeKey = string;
export type AwsCloudMapInstanceAttributeValue = string;
export interface AwsCloudMapInstanceAttribute {
  key: string;
  value: string;
}
export type AwsCloudMapInstanceAttributes = AwsCloudMapInstanceAttribute[];
export interface AwsCloudMapServiceDiscovery {
  namespaceName: string;
  serviceName: string;
  attributes?: AwsCloudMapInstanceAttribute[];
  ipPreference?: string;
}
export type ServiceDiscovery =
  | { dns: DnsServiceDiscovery; awsCloudMap?: never }
  | { dns?: never; awsCloudMap: AwsCloudMapServiceDiscovery };
export type PortProtocol = string;
export interface PortMapping {
  port: number;
  protocol: string;
}
export type ListenerTlsMode = string;
export interface ListenerTlsAcmCertificate {
  certificateArn: string;
}
export interface ListenerTlsFileCertificate {
  certificateChain: string;
  privateKey: string;
}
export type SdsSecretName = string;
export interface ListenerTlsSdsCertificate {
  secretName: string;
}
export type ListenerTlsCertificate =
  | { acm: ListenerTlsAcmCertificate; file?: never; sds?: never }
  | { acm?: never; file: ListenerTlsFileCertificate; sds?: never }
  | { acm?: never; file?: never; sds: ListenerTlsSdsCertificate };
export interface TlsValidationContextFileTrust {
  certificateChain: string;
}
export interface TlsValidationContextSdsTrust {
  secretName: string;
}
export type ListenerTlsValidationContextTrust =
  | { file: TlsValidationContextFileTrust; sds?: never }
  | { file?: never; sds: TlsValidationContextSdsTrust };
export interface ListenerTlsValidationContext {
  trust: ListenerTlsValidationContextTrust;
  subjectAlternativeNames?: SubjectAlternativeNames;
}
export interface ListenerTls {
  mode: string;
  certificate: ListenerTlsCertificate;
  validation?: ListenerTlsValidationContext;
}
export type HealthCheckTimeoutMillis = number;
export type HealthCheckIntervalMillis = number;
export type HealthCheckThreshold = number;
export interface HealthCheckPolicy {
  timeoutMillis: number;
  intervalMillis: number;
  protocol: string;
  port?: number;
  path?: string;
  healthyThreshold: number;
  unhealthyThreshold: number;
}
export type ListenerTimeout =
  | { tcp: TcpTimeout; http?: never; http2?: never; grpc?: never }
  | { tcp?: never; http: HttpTimeout; http2?: never; grpc?: never }
  | { tcp?: never; http?: never; http2: HttpTimeout; grpc?: never }
  | { tcp?: never; http?: never; http2?: never; grpc: GrpcTimeout };
export type OutlierDetectionMaxServerErrors = number;
export type OutlierDetectionMaxEjectionPercent = number;
export interface OutlierDetection {
  maxServerErrors: number;
  interval: Duration;
  baseEjectionDuration: Duration;
  maxEjectionPercent: number;
}
export interface VirtualNodeTcpConnectionPool {
  maxConnections: number;
}
export interface VirtualNodeHttpConnectionPool {
  maxConnections: number;
  maxPendingRequests?: number;
}
export interface VirtualNodeHttp2ConnectionPool {
  maxRequests: number;
}
export interface VirtualNodeGrpcConnectionPool {
  maxRequests: number;
}
export type VirtualNodeConnectionPool =
  | {
      tcp: VirtualNodeTcpConnectionPool;
      http?: never;
      http2?: never;
      grpc?: never;
    }
  | {
      tcp?: never;
      http: VirtualNodeHttpConnectionPool;
      http2?: never;
      grpc?: never;
    }
  | {
      tcp?: never;
      http?: never;
      http2: VirtualNodeHttp2ConnectionPool;
      grpc?: never;
    }
  | {
      tcp?: never;
      http?: never;
      http2?: never;
      grpc: VirtualNodeGrpcConnectionPool;
    };
export interface Listener {
  portMapping: PortMapping;
  tls?: ListenerTls;
  healthCheck?: HealthCheckPolicy;
  timeout?: ListenerTimeout;
  outlierDetection?: OutlierDetection;
  connectionPool?: VirtualNodeConnectionPool;
}
export type Listeners = Listener[];
export type ClientTlsCertificate =
  | { file: ListenerTlsFileCertificate; sds?: never }
  | { file?: never; sds: ListenerTlsSdsCertificate };
export type CertificateAuthorityArns = string[];
export interface TlsValidationContextAcmTrust {
  certificateAuthorityArns: string[];
}
export type TlsValidationContextTrust =
  | { acm: TlsValidationContextAcmTrust; file?: never; sds?: never }
  | { acm?: never; file: TlsValidationContextFileTrust; sds?: never }
  | { acm?: never; file?: never; sds: TlsValidationContextSdsTrust };
export interface TlsValidationContext {
  trust: TlsValidationContextTrust;
  subjectAlternativeNames?: SubjectAlternativeNames;
}
export interface ClientPolicyTls {
  enforce?: boolean;
  ports?: number[];
  certificate?: ClientTlsCertificate;
  validation: TlsValidationContext;
}
export interface ClientPolicy {
  tls?: ClientPolicyTls;
}
export interface VirtualServiceBackend {
  virtualServiceName: string;
  clientPolicy?: ClientPolicy;
}
export type Backend = { virtualService: VirtualServiceBackend };
export type Backends = Backend[];
export interface BackendDefaults {
  clientPolicy?: ClientPolicy;
}
export interface FileAccessLog {
  path: string;
  format?: LoggingFormat;
}
export type AccessLog = { file: FileAccessLog };
export interface Logging {
  accessLog?: AccessLog;
}
export interface VirtualNodeSpec {
  serviceDiscovery?: ServiceDiscovery;
  listeners?: Listener[];
  backends?: Backend[];
  backendDefaults?: BackendDefaults;
  logging?: Logging;
}
export interface CreateVirtualNodeInput {
  virtualNodeName: string;
  meshName: string;
  spec: VirtualNodeSpec;
  tags?: TagRef[];
  clientToken?: string;
  meshOwner?: string;
}
export type VirtualNodeStatusCode = string;
export interface VirtualNodeStatus {
  status: string;
}
export interface VirtualNodeData {
  meshName: string;
  virtualNodeName: string;
  spec: VirtualNodeSpec;
  metadata: ResourceMetadata;
  status: VirtualNodeStatus;
}
export interface CreateVirtualNodeOutput {
  virtualNode: VirtualNodeData;
}
export interface VirtualRouterListener {
  portMapping: PortMapping;
}
export type VirtualRouterListeners = VirtualRouterListener[];
export interface VirtualRouterSpec {
  listeners?: VirtualRouterListener[];
}
export interface CreateVirtualRouterInput {
  virtualRouterName: string;
  meshName: string;
  spec: VirtualRouterSpec;
  tags?: TagRef[];
  clientToken?: string;
  meshOwner?: string;
}
export type VirtualRouterStatusCode = string;
export interface VirtualRouterStatus {
  status: string;
}
export interface VirtualRouterData {
  meshName: string;
  virtualRouterName: string;
  spec: VirtualRouterSpec;
  metadata: ResourceMetadata;
  status: VirtualRouterStatus;
}
export interface CreateVirtualRouterOutput {
  virtualRouter: VirtualRouterData;
}
export interface VirtualNodeServiceProvider {
  virtualNodeName: string;
}
export interface VirtualRouterServiceProvider {
  virtualRouterName: string;
}
export type VirtualServiceProvider =
  | { virtualNode: VirtualNodeServiceProvider; virtualRouter?: never }
  | { virtualNode?: never; virtualRouter: VirtualRouterServiceProvider };
export interface VirtualServiceSpec {
  provider?: VirtualServiceProvider;
}
export interface CreateVirtualServiceInput {
  virtualServiceName: string;
  meshName: string;
  spec: VirtualServiceSpec;
  tags?: TagRef[];
  clientToken?: string;
  meshOwner?: string;
}
export type VirtualServiceStatusCode = string;
export interface VirtualServiceStatus {
  status: string;
}
export interface VirtualServiceData {
  meshName: string;
  virtualServiceName: string;
  spec: VirtualServiceSpec;
  metadata: ResourceMetadata;
  status: VirtualServiceStatus;
}
export interface CreateVirtualServiceOutput {
  virtualService: VirtualServiceData;
}
export interface DeleteGatewayRouteInput {
  gatewayRouteName: string;
  meshName: string;
  virtualGatewayName: string;
  meshOwner?: string;
}
export interface DeleteGatewayRouteOutput {
  gatewayRoute: GatewayRouteData;
}
export interface DeleteMeshInput {
  meshName: string;
}
export interface DeleteMeshOutput {
  mesh: MeshData;
}
export interface DeleteRouteInput {
  routeName: string;
  meshName: string;
  virtualRouterName: string;
  meshOwner?: string;
}
export interface DeleteRouteOutput {
  route: RouteData;
}
export interface DeleteVirtualGatewayInput {
  virtualGatewayName: string;
  meshName: string;
  meshOwner?: string;
}
export interface DeleteVirtualGatewayOutput {
  virtualGateway: VirtualGatewayData;
}
export interface DeleteVirtualNodeInput {
  virtualNodeName: string;
  meshName: string;
  meshOwner?: string;
}
export interface DeleteVirtualNodeOutput {
  virtualNode: VirtualNodeData;
}
export interface DeleteVirtualRouterInput {
  virtualRouterName: string;
  meshName: string;
  meshOwner?: string;
}
export interface DeleteVirtualRouterOutput {
  virtualRouter: VirtualRouterData;
}
export interface DeleteVirtualServiceInput {
  virtualServiceName: string;
  meshName: string;
  meshOwner?: string;
}
export interface DeleteVirtualServiceOutput {
  virtualService: VirtualServiceData;
}
export interface DescribeGatewayRouteInput {
  gatewayRouteName: string;
  meshName: string;
  virtualGatewayName: string;
  meshOwner?: string;
}
export interface DescribeGatewayRouteOutput {
  gatewayRoute: GatewayRouteData;
}
export interface DescribeMeshInput {
  meshName: string;
  meshOwner?: string;
}
export interface DescribeMeshOutput {
  mesh: MeshData;
}
export interface DescribeRouteInput {
  routeName: string;
  meshName: string;
  meshOwner?: string;
  virtualRouterName: string;
}
export interface DescribeRouteOutput {
  route: RouteData;
}
export interface DescribeVirtualGatewayInput {
  virtualGatewayName: string;
  meshName: string;
  meshOwner?: string;
}
export interface DescribeVirtualGatewayOutput {
  virtualGateway: VirtualGatewayData;
}
export interface DescribeVirtualNodeInput {
  virtualNodeName: string;
  meshName: string;
  meshOwner?: string;
}
export interface DescribeVirtualNodeOutput {
  virtualNode: VirtualNodeData;
}
export interface DescribeVirtualRouterInput {
  virtualRouterName: string;
  meshName: string;
  meshOwner?: string;
}
export interface DescribeVirtualRouterOutput {
  virtualRouter: VirtualRouterData;
}
export interface DescribeVirtualServiceInput {
  virtualServiceName: string;
  meshName: string;
  meshOwner?: string;
}
export interface DescribeVirtualServiceOutput {
  virtualService: VirtualServiceData;
}
export type ListGatewayRoutesLimit = number;
export interface ListGatewayRoutesInput {
  meshName: string;
  virtualGatewayName: string;
  nextToken?: string;
  limit?: number;
  meshOwner?: string;
}
export interface GatewayRouteRef {
  meshName: string;
  gatewayRouteName: string;
  virtualGatewayName: string;
  meshOwner: string;
  resourceOwner: string;
  arn: string;
  version: number;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export type GatewayRouteList = GatewayRouteRef[];
export interface ListGatewayRoutesOutput {
  gatewayRoutes: GatewayRouteRef[];
  nextToken?: string;
}
export type ListMeshesLimit = number;
export interface ListMeshesInput {
  nextToken?: string;
  limit?: number;
}
export interface MeshRef {
  meshName: string;
  meshOwner: string;
  resourceOwner: string;
  arn: string;
  version: number;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export type MeshList = MeshRef[];
export interface ListMeshesOutput {
  meshes: MeshRef[];
  nextToken?: string;
}
export type ListRoutesLimit = number;
export interface ListRoutesInput {
  meshName: string;
  virtualRouterName: string;
  nextToken?: string;
  limit?: number;
  meshOwner?: string;
}
export interface RouteRef {
  meshName: string;
  virtualRouterName: string;
  routeName: string;
  meshOwner: string;
  resourceOwner: string;
  arn: string;
  version: number;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export type RouteList = RouteRef[];
export interface ListRoutesOutput {
  routes: RouteRef[];
  nextToken?: string;
}
export type TagsLimit = number;
export interface ListTagsForResourceInput {
  resourceArn: string;
  nextToken?: string;
  limit?: number;
}
export interface ListTagsForResourceOutput {
  tags: TagRef[];
  nextToken?: string;
}
export type ListVirtualGatewaysLimit = number;
export interface ListVirtualGatewaysInput {
  meshName: string;
  nextToken?: string;
  limit?: number;
  meshOwner?: string;
}
export interface VirtualGatewayRef {
  meshName: string;
  virtualGatewayName: string;
  meshOwner: string;
  resourceOwner: string;
  arn: string;
  version: number;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export type VirtualGatewayList = VirtualGatewayRef[];
export interface ListVirtualGatewaysOutput {
  virtualGateways: VirtualGatewayRef[];
  nextToken?: string;
}
export type ListVirtualNodesLimit = number;
export interface ListVirtualNodesInput {
  meshName: string;
  nextToken?: string;
  limit?: number;
  meshOwner?: string;
}
export interface VirtualNodeRef {
  meshName: string;
  virtualNodeName: string;
  meshOwner: string;
  resourceOwner: string;
  arn: string;
  version: number;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export type VirtualNodeList = VirtualNodeRef[];
export interface ListVirtualNodesOutput {
  virtualNodes: VirtualNodeRef[];
  nextToken?: string;
}
export type ListVirtualRoutersLimit = number;
export interface ListVirtualRoutersInput {
  meshName: string;
  nextToken?: string;
  limit?: number;
  meshOwner?: string;
}
export interface VirtualRouterRef {
  meshName: string;
  virtualRouterName: string;
  meshOwner: string;
  resourceOwner: string;
  arn: string;
  version: number;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export type VirtualRouterList = VirtualRouterRef[];
export interface ListVirtualRoutersOutput {
  virtualRouters: VirtualRouterRef[];
  nextToken?: string;
}
export type ListVirtualServicesLimit = number;
export interface ListVirtualServicesInput {
  meshName: string;
  nextToken?: string;
  limit?: number;
  meshOwner?: string;
}
export interface VirtualServiceRef {
  meshName: string;
  virtualServiceName: string;
  meshOwner: string;
  resourceOwner: string;
  arn: string;
  version: number;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export type VirtualServiceList = VirtualServiceRef[];
export interface ListVirtualServicesOutput {
  virtualServices: VirtualServiceRef[];
  nextToken?: string;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: TagRef[];
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateGatewayRouteInput {
  gatewayRouteName: string;
  meshName: string;
  virtualGatewayName: string;
  spec: GatewayRouteSpec;
  clientToken?: string;
  meshOwner?: string;
}
export interface UpdateGatewayRouteOutput {
  gatewayRoute: GatewayRouteData;
}
export interface UpdateMeshInput {
  meshName: string;
  spec?: MeshSpec;
  clientToken?: string;
}
export interface UpdateMeshOutput {
  mesh: MeshData;
}
export interface UpdateRouteInput {
  routeName: string;
  meshName: string;
  virtualRouterName: string;
  spec: RouteSpec;
  clientToken?: string;
  meshOwner?: string;
}
export interface UpdateRouteOutput {
  route: RouteData;
}
export interface UpdateVirtualGatewayInput {
  virtualGatewayName: string;
  meshName: string;
  spec: VirtualGatewaySpec;
  clientToken?: string;
  meshOwner?: string;
}
export interface UpdateVirtualGatewayOutput {
  virtualGateway: VirtualGatewayData;
}
export interface UpdateVirtualNodeInput {
  virtualNodeName: string;
  meshName: string;
  spec: VirtualNodeSpec;
  clientToken?: string;
  meshOwner?: string;
}
export interface UpdateVirtualNodeOutput {
  virtualNode: VirtualNodeData;
}
export interface UpdateVirtualRouterInput {
  virtualRouterName: string;
  meshName: string;
  spec: VirtualRouterSpec;
  clientToken?: string;
  meshOwner?: string;
}
export interface UpdateVirtualRouterOutput {
  virtualRouter: VirtualRouterData;
}
export interface UpdateVirtualServiceInput {
  virtualServiceName: string;
  meshName: string;
  spec: VirtualServiceSpec;
  clientToken?: string;
  meshOwner?: string;
}
export interface UpdateVirtualServiceOutput {
  virtualService: VirtualServiceData;
}
export type CreateGatewayRouteError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a gateway route.
 *
 * A gateway route is attached to a virtual gateway and routes traffic to an existing
 * virtual service. If a route matches a request, it can distribute traffic to a target
 * virtual service.
 *
 * For more information about gateway routes, see Gateway routes.
 */
export const createGatewayRoute: API.OperationMethod<
  CreateGatewayRouteInput,
  CreateGatewayRouteOutput,
  CreateGatewayRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v20190125/meshes/{meshName}/virtualGateway/{virtualGatewayName}/gatewayRoutes",
    input: {
      gatewayRouteName: 0,
      meshName: 0,
      virtualGatewayName: 0,
      spec: i_GatewayRouteSpec,
      tags: D.list(i_TagRef),
      clientToken: D.m({ idempotency: true }),
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: { gatewayRoute: D.m({ payload: true, shape: o_GatewayRouteData }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGatewayRoute",
})) as any;

export type CreateMeshError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a service mesh.
 *
 * A service mesh is a logical boundary for network traffic between services that are
 * represented by resources within the mesh. After you create your service mesh, you can
 * create virtual services, virtual nodes, virtual routers, and routes to distribute traffic
 * between the applications in your mesh.
 *
 * For more information about service meshes, see Service meshes.
 */
export const createMesh: API.OperationMethod<
  CreateMeshInput,
  CreateMeshOutput,
  CreateMeshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v20190125/meshes",
    input: {
      meshName: 0,
      spec: i_MeshSpec,
      tags: D.list(i_TagRef),
      clientToken: D.m({ idempotency: true }),
    },
    output: { mesh: D.m({ payload: true, shape: o_MeshData }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMesh",
})) as any;

export type CreateRouteError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a route that is associated with a virtual router.
 *
 * You can route several different protocols and define a retry policy for a route.
 * Traffic can be routed to one or more virtual nodes.
 *
 * For more information about routes, see Routes.
 */
export const createRoute: API.OperationMethod<
  CreateRouteInput,
  CreateRouteOutput,
  CreateRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v20190125/meshes/{meshName}/virtualRouter/{virtualRouterName}/routes",
    input: {
      routeName: 0,
      meshName: 0,
      virtualRouterName: 0,
      spec: i_RouteSpec,
      tags: D.list(i_TagRef),
      clientToken: D.m({ idempotency: true }),
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: { route: D.m({ payload: true, shape: o_RouteData }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRoute",
})) as any;

export type CreateVirtualGatewayError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a virtual gateway.
 *
 * A virtual gateway allows resources outside your mesh to communicate to resources that
 * are inside your mesh. The virtual gateway represents an Envoy proxy running in an Amazon ECS task, in a Kubernetes service, or on an Amazon EC2 instance. Unlike a
 * virtual node, which represents an Envoy running with an application, a virtual gateway
 * represents Envoy deployed by itself.
 *
 * For more information about virtual gateways, see Virtual gateways.
 */
export const createVirtualGateway: API.OperationMethod<
  CreateVirtualGatewayInput,
  CreateVirtualGatewayOutput,
  CreateVirtualGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v20190125/meshes/{meshName}/virtualGateways",
    input: {
      virtualGatewayName: 0,
      meshName: 0,
      spec: i_VirtualGatewaySpec,
      tags: D.list(i_TagRef),
      clientToken: D.m({ idempotency: true }),
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: {
      virtualGateway: D.m({ payload: true, shape: o_VirtualGatewayData }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVirtualGateway",
})) as any;

export type CreateVirtualNodeError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a virtual node within a service mesh.
 *
 * A virtual node acts as a logical pointer to a particular task group, such as an Amazon ECS service or a Kubernetes deployment. When you create a virtual node, you can
 * specify the service discovery information for your task group, and whether the proxy
 * running in a task group will communicate with other proxies using Transport Layer Security
 * (TLS).
 *
 * You define a `listener` for any inbound traffic that your virtual node
 * expects. Any virtual service that your virtual node expects to communicate to is specified
 * as a `backend`.
 *
 * The response metadata for your new virtual node contains the `arn` that is
 * associated with the virtual node. Set this value to the full ARN; for example,
 * `arn:aws:appmesh:us-west-2:123456789012:myMesh/default/virtualNode/myApp`)
 * as the `APPMESH_RESOURCE_ARN` environment variable for your task group's Envoy
 * proxy container in your task definition or pod spec. This is then mapped to the
 * `node.id` and `node.cluster` Envoy parameters.
 *
 * By default, App Mesh uses the name of the resource you specified in
 * `APPMESH_RESOURCE_ARN` when Envoy is referring to itself in metrics and
 * traces. You can override this behavior by setting the
 * `APPMESH_RESOURCE_CLUSTER` environment variable with your own name.
 *
 * For more information about virtual nodes, see Virtual nodes. You must be using `1.15.0` or later of the Envoy image when
 * setting these variables. For more information aboutApp Mesh Envoy variables, see
 * Envoy
 * image in the App Mesh User Guide.
 */
export const createVirtualNode: API.OperationMethod<
  CreateVirtualNodeInput,
  CreateVirtualNodeOutput,
  CreateVirtualNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v20190125/meshes/{meshName}/virtualNodes",
    input: {
      virtualNodeName: 0,
      meshName: 0,
      spec: i_VirtualNodeSpec,
      tags: D.list(i_TagRef),
      clientToken: D.m({ idempotency: true }),
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: { virtualNode: D.m({ payload: true, shape: o_VirtualNodeData }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVirtualNode",
})) as any;

export type CreateVirtualRouterError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a virtual router within a service mesh.
 *
 * Specify a `listener` for any inbound traffic that your virtual router
 * receives. Create a virtual router for each protocol and port that you need to route.
 * Virtual routers handle traffic for one or more virtual services within your mesh. After you
 * create your virtual router, create and associate routes for your virtual router that direct
 * incoming requests to different virtual nodes.
 *
 * For more information about virtual routers, see Virtual routers.
 */
export const createVirtualRouter: API.OperationMethod<
  CreateVirtualRouterInput,
  CreateVirtualRouterOutput,
  CreateVirtualRouterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v20190125/meshes/{meshName}/virtualRouters",
    input: {
      virtualRouterName: 0,
      meshName: 0,
      spec: i_VirtualRouterSpec,
      tags: D.list(i_TagRef),
      clientToken: D.m({ idempotency: true }),
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: {
      virtualRouter: D.m({ payload: true, shape: o_VirtualRouterData }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVirtualRouter",
})) as any;

export type CreateVirtualServiceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a virtual service within a service mesh.
 *
 * A virtual service is an abstraction of a real service that is provided by a virtual node
 * directly or indirectly by means of a virtual router. Dependent services call your virtual
 * service by its `virtualServiceName`, and those requests are routed to the
 * virtual node or virtual router that is specified as the provider for the virtual
 * service.
 *
 * For more information about virtual services, see Virtual services.
 */
export const createVirtualService: API.OperationMethod<
  CreateVirtualServiceInput,
  CreateVirtualServiceOutput,
  CreateVirtualServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v20190125/meshes/{meshName}/virtualServices",
    input: {
      virtualServiceName: 0,
      meshName: 0,
      spec: i_VirtualServiceSpec,
      tags: D.list(i_TagRef),
      clientToken: D.m({ idempotency: true }),
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: {
      virtualService: D.m({ payload: true, shape: o_VirtualServiceData }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVirtualService",
})) as any;

export type DeleteGatewayRouteError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ResourceInUseException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing gateway route.
 */
export const deleteGatewayRoute: API.OperationMethod<
  DeleteGatewayRouteInput,
  DeleteGatewayRouteOutput,
  DeleteGatewayRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v20190125/meshes/{meshName}/virtualGateway/{virtualGatewayName}/gatewayRoutes/{gatewayRouteName}",
    input: {
      gatewayRouteName: 0,
      meshName: 0,
      virtualGatewayName: 0,
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: { gatewayRoute: D.m({ payload: true, shape: o_GatewayRouteData }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGatewayRoute",
})) as any;

export type DeleteMeshError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ResourceInUseException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing service mesh.
 *
 * You must delete all resources (virtual services, routes, virtual routers, and virtual
 * nodes) in the service mesh before you can delete the mesh itself.
 */
export const deleteMesh: API.OperationMethod<
  DeleteMeshInput,
  DeleteMeshOutput,
  DeleteMeshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v20190125/meshes/{meshName}",
    input: { meshName: 0 },
    output: { mesh: D.m({ payload: true, shape: o_MeshData }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMesh",
})) as any;

export type DeleteRouteError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ResourceInUseException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing route.
 */
export const deleteRoute: API.OperationMethod<
  DeleteRouteInput,
  DeleteRouteOutput,
  DeleteRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v20190125/meshes/{meshName}/virtualRouter/{virtualRouterName}/routes/{routeName}",
    input: {
      routeName: 0,
      meshName: 0,
      virtualRouterName: 0,
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: { route: D.m({ payload: true, shape: o_RouteData }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRoute",
})) as any;

export type DeleteVirtualGatewayError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ResourceInUseException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing virtual gateway. You cannot delete a virtual gateway if any gateway
 * routes are associated to it.
 */
export const deleteVirtualGateway: API.OperationMethod<
  DeleteVirtualGatewayInput,
  DeleteVirtualGatewayOutput,
  DeleteVirtualGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v20190125/meshes/{meshName}/virtualGateways/{virtualGatewayName}",
    input: {
      virtualGatewayName: 0,
      meshName: 0,
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: {
      virtualGateway: D.m({ payload: true, shape: o_VirtualGatewayData }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVirtualGateway",
})) as any;

export type DeleteVirtualNodeError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ResourceInUseException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing virtual node.
 *
 * You must delete any virtual services that list a virtual node as a service provider
 * before you can delete the virtual node itself.
 */
export const deleteVirtualNode: API.OperationMethod<
  DeleteVirtualNodeInput,
  DeleteVirtualNodeOutput,
  DeleteVirtualNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v20190125/meshes/{meshName}/virtualNodes/{virtualNodeName}",
    input: {
      virtualNodeName: 0,
      meshName: 0,
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: { virtualNode: D.m({ payload: true, shape: o_VirtualNodeData }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVirtualNode",
})) as any;

export type DeleteVirtualRouterError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ResourceInUseException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing virtual router.
 *
 * You must delete any routes associated with the virtual router before you can delete the
 * router itself.
 */
export const deleteVirtualRouter: API.OperationMethod<
  DeleteVirtualRouterInput,
  DeleteVirtualRouterOutput,
  DeleteVirtualRouterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v20190125/meshes/{meshName}/virtualRouters/{virtualRouterName}",
    input: {
      virtualRouterName: 0,
      meshName: 0,
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: {
      virtualRouter: D.m({ payload: true, shape: o_VirtualRouterData }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVirtualRouter",
})) as any;

export type DeleteVirtualServiceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ResourceInUseException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing virtual service.
 */
export const deleteVirtualService: API.OperationMethod<
  DeleteVirtualServiceInput,
  DeleteVirtualServiceOutput,
  DeleteVirtualServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v20190125/meshes/{meshName}/virtualServices/{virtualServiceName}",
    input: {
      virtualServiceName: 0,
      meshName: 0,
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: {
      virtualService: D.m({ payload: true, shape: o_VirtualServiceData }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVirtualService",
})) as any;

export type DescribeGatewayRouteError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describes an existing gateway route.
 */
export const describeGatewayRoute: API.OperationMethod<
  DescribeGatewayRouteInput,
  DescribeGatewayRouteOutput,
  DescribeGatewayRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v20190125/meshes/{meshName}/virtualGateway/{virtualGatewayName}/gatewayRoutes/{gatewayRouteName}",
    input: {
      gatewayRouteName: 0,
      meshName: 0,
      virtualGatewayName: 0,
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: { gatewayRoute: D.m({ payload: true, shape: o_GatewayRouteData }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGatewayRoute",
})) as any;

export type DescribeMeshError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describes an existing service mesh.
 */
export const describeMesh: API.OperationMethod<
  DescribeMeshInput,
  DescribeMeshOutput,
  DescribeMeshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v20190125/meshes/{meshName}",
    input: { meshName: 0, meshOwner: D.m({ query: "meshOwner" }) },
    output: { mesh: D.m({ payload: true, shape: o_MeshData }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMesh",
})) as any;

export type DescribeRouteError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describes an existing route.
 */
export const describeRoute: API.OperationMethod<
  DescribeRouteInput,
  DescribeRouteOutput,
  DescribeRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v20190125/meshes/{meshName}/virtualRouter/{virtualRouterName}/routes/{routeName}",
    input: {
      routeName: 0,
      meshName: 0,
      meshOwner: D.m({ query: "meshOwner" }),
      virtualRouterName: 0,
    },
    output: { route: D.m({ payload: true, shape: o_RouteData }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRoute",
})) as any;

export type DescribeVirtualGatewayError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describes an existing virtual gateway.
 */
export const describeVirtualGateway: API.OperationMethod<
  DescribeVirtualGatewayInput,
  DescribeVirtualGatewayOutput,
  DescribeVirtualGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v20190125/meshes/{meshName}/virtualGateways/{virtualGatewayName}",
    input: {
      virtualGatewayName: 0,
      meshName: 0,
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: {
      virtualGateway: D.m({ payload: true, shape: o_VirtualGatewayData }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVirtualGateway",
})) as any;

export type DescribeVirtualNodeError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describes an existing virtual node.
 */
export const describeVirtualNode: API.OperationMethod<
  DescribeVirtualNodeInput,
  DescribeVirtualNodeOutput,
  DescribeVirtualNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v20190125/meshes/{meshName}/virtualNodes/{virtualNodeName}",
    input: {
      virtualNodeName: 0,
      meshName: 0,
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: { virtualNode: D.m({ payload: true, shape: o_VirtualNodeData }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVirtualNode",
})) as any;

export type DescribeVirtualRouterError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describes an existing virtual router.
 */
export const describeVirtualRouter: API.OperationMethod<
  DescribeVirtualRouterInput,
  DescribeVirtualRouterOutput,
  DescribeVirtualRouterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v20190125/meshes/{meshName}/virtualRouters/{virtualRouterName}",
    input: {
      virtualRouterName: 0,
      meshName: 0,
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: {
      virtualRouter: D.m({ payload: true, shape: o_VirtualRouterData }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVirtualRouter",
})) as any;

export type DescribeVirtualServiceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describes an existing virtual service.
 */
export const describeVirtualService: API.OperationMethod<
  DescribeVirtualServiceInput,
  DescribeVirtualServiceOutput,
  DescribeVirtualServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v20190125/meshes/{meshName}/virtualServices/{virtualServiceName}",
    input: {
      virtualServiceName: 0,
      meshName: 0,
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: {
      virtualService: D.m({ payload: true, shape: o_VirtualServiceData }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVirtualService",
})) as any;

export type ListGatewayRoutesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of existing gateway routes that are associated to a virtual
 * gateway.
 */
export const listGatewayRoutes: API.PaginatedOperationMethod<
  ListGatewayRoutesInput,
  ListGatewayRoutesOutput,
  ListGatewayRoutesError,
  Credentials | HttpClient.HttpClient,
  GatewayRouteRef
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v20190125/meshes/{meshName}/virtualGateway/{virtualGatewayName}/gatewayRoutes",
    input: {
      meshName: 0,
      virtualGatewayName: 0,
      nextToken: D.m({ query: "nextToken" }),
      limit: D.m({ query: "limit" }),
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: { gatewayRoutes: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGatewayRoutes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "gatewayRoutes",
    pageSize: "limit",
  } as const,
})) as any;

export type ListMeshesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of existing service meshes.
 */
export const listMeshes: API.PaginatedOperationMethod<
  ListMeshesInput,
  ListMeshesOutput,
  ListMeshesError,
  Credentials | HttpClient.HttpClient,
  MeshRef
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v20190125/meshes",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      limit: D.m({ query: "limit" }),
    },
    output: { meshes: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMeshes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "meshes",
    pageSize: "limit",
  } as const,
})) as any;

export type ListRoutesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of existing routes in a service mesh.
 */
export const listRoutes: API.PaginatedOperationMethod<
  ListRoutesInput,
  ListRoutesOutput,
  ListRoutesError,
  Credentials | HttpClient.HttpClient,
  RouteRef
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v20190125/meshes/{meshName}/virtualRouter/{virtualRouterName}/routes",
    input: {
      meshName: 0,
      virtualRouterName: 0,
      nextToken: D.m({ query: "nextToken" }),
      limit: D.m({ query: "limit" }),
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: { routes: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoutes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "routes",
    pageSize: "limit",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List the tags for an App Mesh resource.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  TagRef
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v20190125/tags",
    input: {
      resourceArn: D.m({ query: "resourceArn" }),
      nextToken: D.m({ query: "nextToken" }),
      limit: D.m({ query: "limit" }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tags",
    pageSize: "limit",
  } as const,
})) as any;

export type ListVirtualGatewaysError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of existing virtual gateways in a service mesh.
 */
export const listVirtualGateways: API.PaginatedOperationMethod<
  ListVirtualGatewaysInput,
  ListVirtualGatewaysOutput,
  ListVirtualGatewaysError,
  Credentials | HttpClient.HttpClient,
  VirtualGatewayRef
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v20190125/meshes/{meshName}/virtualGateways",
    input: {
      meshName: 0,
      nextToken: D.m({ query: "nextToken" }),
      limit: D.m({ query: "limit" }),
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: {
      virtualGateways: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVirtualGateways",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "virtualGateways",
    pageSize: "limit",
  } as const,
})) as any;

export type ListVirtualNodesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of existing virtual nodes.
 */
export const listVirtualNodes: API.PaginatedOperationMethod<
  ListVirtualNodesInput,
  ListVirtualNodesOutput,
  ListVirtualNodesError,
  Credentials | HttpClient.HttpClient,
  VirtualNodeRef
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v20190125/meshes/{meshName}/virtualNodes",
    input: {
      meshName: 0,
      nextToken: D.m({ query: "nextToken" }),
      limit: D.m({ query: "limit" }),
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: { virtualNodes: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVirtualNodes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "virtualNodes",
    pageSize: "limit",
  } as const,
})) as any;

export type ListVirtualRoutersError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of existing virtual routers in a service mesh.
 */
export const listVirtualRouters: API.PaginatedOperationMethod<
  ListVirtualRoutersInput,
  ListVirtualRoutersOutput,
  ListVirtualRoutersError,
  Credentials | HttpClient.HttpClient,
  VirtualRouterRef
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v20190125/meshes/{meshName}/virtualRouters",
    input: {
      meshName: 0,
      nextToken: D.m({ query: "nextToken" }),
      limit: D.m({ query: "limit" }),
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: {
      virtualRouters: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVirtualRouters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "virtualRouters",
    pageSize: "limit",
  } as const,
})) as any;

export type ListVirtualServicesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of existing virtual services in a service mesh.
 */
export const listVirtualServices: API.PaginatedOperationMethod<
  ListVirtualServicesInput,
  ListVirtualServicesOutput,
  ListVirtualServicesError,
  Credentials | HttpClient.HttpClient,
  VirtualServiceRef
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v20190125/meshes/{meshName}/virtualServices",
    input: {
      meshName: 0,
      nextToken: D.m({ query: "nextToken" }),
      limit: D.m({ query: "limit" }),
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: {
      virtualServices: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVirtualServices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "virtualServices",
    pageSize: "limit",
  } as const,
})) as any;

export type TagResourceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Associates the specified tags to a resource with the specified `resourceArn`.
 * If existing tags on a resource aren't specified in the request parameters, they aren't
 * changed. When a resource is deleted, the tags associated with that resource are also
 * deleted.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v20190125/tag",
    input: {
      resourceArn: D.m({ query: "resourceArn" }),
      tags: D.list(i_TagRef),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes specified tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v20190125/untag",
    input: { resourceArn: D.m({ query: "resourceArn" }), tagKeys: 0 },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateGatewayRouteError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing gateway route that is associated to a specified virtual gateway in a
 * service mesh.
 */
export const updateGatewayRoute: API.OperationMethod<
  UpdateGatewayRouteInput,
  UpdateGatewayRouteOutput,
  UpdateGatewayRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v20190125/meshes/{meshName}/virtualGateway/{virtualGatewayName}/gatewayRoutes/{gatewayRouteName}",
    input: {
      gatewayRouteName: 0,
      meshName: 0,
      virtualGatewayName: 0,
      spec: i_GatewayRouteSpec,
      clientToken: D.m({ idempotency: true }),
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: { gatewayRoute: D.m({ payload: true, shape: o_GatewayRouteData }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGatewayRoute",
})) as any;

export type UpdateMeshError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing service mesh.
 */
export const updateMesh: API.OperationMethod<
  UpdateMeshInput,
  UpdateMeshOutput,
  UpdateMeshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v20190125/meshes/{meshName}",
    input: {
      meshName: 0,
      spec: i_MeshSpec,
      clientToken: D.m({ idempotency: true }),
    },
    output: { mesh: D.m({ payload: true, shape: o_MeshData }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMesh",
})) as any;

export type UpdateRouteError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing route for a specified service mesh and virtual router.
 */
export const updateRoute: API.OperationMethod<
  UpdateRouteInput,
  UpdateRouteOutput,
  UpdateRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v20190125/meshes/{meshName}/virtualRouter/{virtualRouterName}/routes/{routeName}",
    input: {
      routeName: 0,
      meshName: 0,
      virtualRouterName: 0,
      spec: i_RouteSpec,
      clientToken: D.m({ idempotency: true }),
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: { route: D.m({ payload: true, shape: o_RouteData }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoute",
})) as any;

export type UpdateVirtualGatewayError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing virtual gateway in a specified service mesh.
 */
export const updateVirtualGateway: API.OperationMethod<
  UpdateVirtualGatewayInput,
  UpdateVirtualGatewayOutput,
  UpdateVirtualGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v20190125/meshes/{meshName}/virtualGateways/{virtualGatewayName}",
    input: {
      virtualGatewayName: 0,
      meshName: 0,
      spec: i_VirtualGatewaySpec,
      clientToken: D.m({ idempotency: true }),
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: {
      virtualGateway: D.m({ payload: true, shape: o_VirtualGatewayData }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVirtualGateway",
})) as any;

export type UpdateVirtualNodeError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing virtual node in a specified service mesh.
 */
export const updateVirtualNode: API.OperationMethod<
  UpdateVirtualNodeInput,
  UpdateVirtualNodeOutput,
  UpdateVirtualNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v20190125/meshes/{meshName}/virtualNodes/{virtualNodeName}",
    input: {
      virtualNodeName: 0,
      meshName: 0,
      spec: i_VirtualNodeSpec,
      clientToken: D.m({ idempotency: true }),
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: { virtualNode: D.m({ payload: true, shape: o_VirtualNodeData }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVirtualNode",
})) as any;

export type UpdateVirtualRouterError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing virtual router in a specified service mesh.
 */
export const updateVirtualRouter: API.OperationMethod<
  UpdateVirtualRouterInput,
  UpdateVirtualRouterOutput,
  UpdateVirtualRouterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v20190125/meshes/{meshName}/virtualRouters/{virtualRouterName}",
    input: {
      virtualRouterName: 0,
      meshName: 0,
      spec: i_VirtualRouterSpec,
      clientToken: D.m({ idempotency: true }),
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: {
      virtualRouter: D.m({ payload: true, shape: o_VirtualRouterData }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVirtualRouter",
})) as any;

export type UpdateVirtualServiceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | LimitExceededException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing virtual service in a specified service mesh.
 */
export const updateVirtualService: API.OperationMethod<
  UpdateVirtualServiceInput,
  UpdateVirtualServiceOutput,
  UpdateVirtualServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v20190125/meshes/{meshName}/virtualServices/{virtualServiceName}",
    input: {
      virtualServiceName: 0,
      meshName: 0,
      spec: i_VirtualServiceSpec,
      clientToken: D.m({ idempotency: true }),
      meshOwner: D.m({ query: "meshOwner" }),
    },
    output: {
      virtualService: D.m({ payload: true, shape: o_VirtualServiceData }),
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    LimitExceededException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVirtualService",
})) as any;

const i_GatewayRouteSpec: D.LazyStruct = () => ({
  priority: 0,
  httpRoute: i_HttpGatewayRoute,
  http2Route: i_HttpGatewayRoute,
  grpcRoute: {
    match: {
      serviceName: 0,
      hostname: i_GatewayRouteHostnameMatch,
      metadata: D.list({
        name: 0,
        invert: 0,
        match: {
          exact: 0,
          regex: 0,
          range: i_MatchRange,
          prefix: 0,
          suffix: 0,
        },
      }),
      port: 0,
    },
    action: {
      target: i_GatewayRouteTarget,
      rewrite: { hostname: i_GatewayRouteHostnameRewrite },
    },
  },
});
const i_MeshSpec: D.LazyStruct = () => ({
  egressFilter: { type: 0 },
  serviceDiscovery: { ipPreference: 0 },
});
const i_RouteSpec: D.LazyStruct = () => ({
  priority: 0,
  httpRoute: i_HttpRoute,
  tcpRoute: {
    action: { weightedTargets: D.list(i_WeightedTarget) },
    timeout: i_TcpTimeout,
    match: { port: 0 },
  },
  http2Route: i_HttpRoute,
  grpcRoute: {
    action: { weightedTargets: D.list(i_WeightedTarget) },
    match: {
      serviceName: 0,
      methodName: 0,
      metadata: D.list({
        name: 0,
        invert: 0,
        match: {
          exact: 0,
          regex: 0,
          range: i_MatchRange,
          prefix: 0,
          suffix: 0,
        },
      }),
      port: 0,
    },
    retryPolicy: {
      perRetryTimeout: i_Duration,
      maxRetries: 0,
      httpRetryEvents: 0,
      tcpRetryEvents: 0,
      grpcRetryEvents: 0,
    },
    timeout: i_GrpcTimeout,
  },
});
const i_TagRef: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_VirtualGatewaySpec: D.LazyStruct = () => ({
  backendDefaults: {
    clientPolicy: {
      tls: {
        enforce: 0,
        ports: 0,
        certificate: {
          file: i_VirtualGatewayListenerTlsFileCertificate,
          sds: i_VirtualGatewayListenerTlsSdsCertificate,
        },
        validation: {
          trust: {
            acm: { certificateAuthorityArns: 0 },
            file: i_VirtualGatewayTlsValidationContextFileTrust,
            sds: i_VirtualGatewayTlsValidationContextSdsTrust,
          },
          subjectAlternativeNames: i_SubjectAlternativeNames,
        },
      },
    },
  },
  listeners: D.list({
    healthCheck: {
      timeoutMillis: 0,
      intervalMillis: 0,
      protocol: 0,
      port: 0,
      path: 0,
      healthyThreshold: 0,
      unhealthyThreshold: 0,
    },
    portMapping: { port: 0, protocol: 0 },
    tls: {
      mode: 0,
      validation: {
        trust: {
          file: i_VirtualGatewayTlsValidationContextFileTrust,
          sds: i_VirtualGatewayTlsValidationContextSdsTrust,
        },
        subjectAlternativeNames: i_SubjectAlternativeNames,
      },
      certificate: {
        acm: { certificateArn: 0 },
        file: i_VirtualGatewayListenerTlsFileCertificate,
        sds: i_VirtualGatewayListenerTlsSdsCertificate,
      },
    },
    connectionPool: {
      http: { maxConnections: 0, maxPendingRequests: 0 },
      http2: { maxRequests: 0 },
      grpc: { maxRequests: 0 },
    },
  }),
  logging: { accessLog: { file: { path: 0, format: i_LoggingFormat } } },
});
const i_VirtualNodeSpec: D.LazyStruct = () => ({
  serviceDiscovery: {
    dns: { hostname: 0, responseType: 0, ipPreference: 0 },
    awsCloudMap: {
      namespaceName: 0,
      serviceName: 0,
      attributes: D.list({ key: 0, value: 0 }),
      ipPreference: 0,
    },
  },
  listeners: D.list({
    portMapping: i_PortMapping,
    tls: {
      mode: 0,
      certificate: {
        acm: { certificateArn: 0 },
        file: i_ListenerTlsFileCertificate,
        sds: i_ListenerTlsSdsCertificate,
      },
      validation: {
        trust: {
          file: i_TlsValidationContextFileTrust,
          sds: i_TlsValidationContextSdsTrust,
        },
        subjectAlternativeNames: i_SubjectAlternativeNames,
      },
    },
    healthCheck: {
      timeoutMillis: 0,
      intervalMillis: 0,
      protocol: 0,
      port: 0,
      path: 0,
      healthyThreshold: 0,
      unhealthyThreshold: 0,
    },
    timeout: {
      tcp: i_TcpTimeout,
      http: i_HttpTimeout,
      http2: i_HttpTimeout,
      grpc: i_GrpcTimeout,
    },
    outlierDetection: {
      maxServerErrors: 0,
      interval: i_Duration,
      baseEjectionDuration: i_Duration,
      maxEjectionPercent: 0,
    },
    connectionPool: {
      tcp: { maxConnections: 0 },
      http: { maxConnections: 0, maxPendingRequests: 0 },
      http2: { maxRequests: 0 },
      grpc: { maxRequests: 0 },
    },
  }),
  backends: D.list({
    virtualService: { virtualServiceName: 0, clientPolicy: i_ClientPolicy },
  }),
  backendDefaults: { clientPolicy: i_ClientPolicy },
  logging: { accessLog: { file: { path: 0, format: i_LoggingFormat } } },
});
const i_VirtualRouterSpec: D.LazyStruct = () => ({
  listeners: D.list({ portMapping: i_PortMapping }),
});
const i_VirtualServiceSpec: D.LazyStruct = () => ({
  provider: {
    virtualNode: { virtualNodeName: 0 },
    virtualRouter: { virtualRouterName: 0 },
  },
});
const o_GatewayRouteData: D.LazyStruct = () => ({
  metadata: o_ResourceMetadata,
});
const o_MeshData: D.LazyStruct = () => ({ metadata: o_ResourceMetadata });
const o_RouteData: D.LazyStruct = () => ({ metadata: o_ResourceMetadata });
const o_VirtualGatewayData: D.LazyStruct = () => ({
  metadata: o_ResourceMetadata,
});
const o_VirtualNodeData: D.LazyStruct = () => ({
  metadata: o_ResourceMetadata,
});
const o_VirtualRouterData: D.LazyStruct = () => ({
  metadata: o_ResourceMetadata,
});
const o_VirtualServiceData: D.LazyStruct = () => ({
  metadata: o_ResourceMetadata,
});
const i_ClientPolicy: D.LazyStruct = () => ({
  tls: {
    enforce: 0,
    ports: 0,
    certificate: {
      file: i_ListenerTlsFileCertificate,
      sds: i_ListenerTlsSdsCertificate,
    },
    validation: {
      trust: {
        acm: { certificateAuthorityArns: 0 },
        file: i_TlsValidationContextFileTrust,
        sds: i_TlsValidationContextSdsTrust,
      },
      subjectAlternativeNames: i_SubjectAlternativeNames,
    },
  },
});
const i_Duration: D.LazyStruct = () => ({ value: 0, unit: 0 });
const i_GatewayRouteHostnameMatch: D.LazyStruct = () => ({
  exact: 0,
  suffix: 0,
});
const i_GatewayRouteHostnameRewrite: D.LazyStruct = () => ({
  defaultTargetHostname: 0,
});
const i_GatewayRouteTarget: D.LazyStruct = () => ({
  virtualService: { virtualServiceName: 0 },
  port: 0,
});
const i_GrpcTimeout: D.LazyStruct = () => ({
  perRequest: i_Duration,
  idle: i_Duration,
});
const i_HttpGatewayRoute: D.LazyStruct = () => ({
  match: {
    prefix: 0,
    path: i_HttpPathMatch,
    queryParameters: D.list(i_HttpQueryParameter),
    method: 0,
    hostname: i_GatewayRouteHostnameMatch,
    headers: D.list({ name: 0, invert: 0, match: i_HeaderMatchMethod }),
    port: 0,
  },
  action: {
    target: i_GatewayRouteTarget,
    rewrite: {
      prefix: { defaultPrefix: 0, value: 0 },
      path: { exact: 0 },
      hostname: i_GatewayRouteHostnameRewrite,
    },
  },
});
const i_HttpRoute: D.LazyStruct = () => ({
  match: {
    prefix: 0,
    path: i_HttpPathMatch,
    queryParameters: D.list(i_HttpQueryParameter),
    method: 0,
    scheme: 0,
    headers: D.list({ name: 0, invert: 0, match: i_HeaderMatchMethod }),
    port: 0,
  },
  action: { weightedTargets: D.list(i_WeightedTarget) },
  retryPolicy: {
    perRetryTimeout: i_Duration,
    maxRetries: 0,
    httpRetryEvents: 0,
    tcpRetryEvents: 0,
  },
  timeout: i_HttpTimeout,
});
const i_HttpTimeout: D.LazyStruct = () => ({
  perRequest: i_Duration,
  idle: i_Duration,
});
const i_ListenerTlsFileCertificate: D.LazyStruct = () => ({
  certificateChain: 0,
  privateKey: 0,
});
const i_ListenerTlsSdsCertificate: D.LazyStruct = () => ({ secretName: 0 });
const i_LoggingFormat: D.LazyStruct = () => ({
  text: 0,
  json: D.list({ key: 0, value: 0 }),
});
const i_MatchRange: D.LazyStruct = () => ({ start: 0, end: 0 });
const i_PortMapping: D.LazyStruct = () => ({ port: 0, protocol: 0 });
const i_SubjectAlternativeNames: D.LazyStruct = () => ({ match: { exact: 0 } });
const i_TcpTimeout: D.LazyStruct = () => ({ idle: i_Duration });
const i_TlsValidationContextFileTrust: D.LazyStruct = () => ({
  certificateChain: 0,
});
const i_TlsValidationContextSdsTrust: D.LazyStruct = () => ({ secretName: 0 });
const i_VirtualGatewayListenerTlsFileCertificate: D.LazyStruct = () => ({
  certificateChain: 0,
  privateKey: 0,
});
const i_VirtualGatewayListenerTlsSdsCertificate: D.LazyStruct = () => ({
  secretName: 0,
});
const i_VirtualGatewayTlsValidationContextFileTrust: D.LazyStruct = () => ({
  certificateChain: 0,
});
const i_VirtualGatewayTlsValidationContextSdsTrust: D.LazyStruct = () => ({
  secretName: 0,
});
const i_WeightedTarget: D.LazyStruct = () => ({
  virtualNode: 0,
  weight: 0,
  port: 0,
});
const o_ResourceMetadata: D.LazyStruct = () => ({
  createdAt: D.ts,
  lastUpdatedAt: D.ts,
});
const i_HeaderMatchMethod: D.LazyStruct = () => ({
  exact: 0,
  regex: 0,
  range: i_MatchRange,
  prefix: 0,
  suffix: 0,
});
const i_HttpPathMatch: D.LazyStruct = () => ({ exact: 0, regex: 0 });
const i_HttpQueryParameter: D.LazyStruct = () => ({
  name: 0,
  match: { exact: 0 },
});
