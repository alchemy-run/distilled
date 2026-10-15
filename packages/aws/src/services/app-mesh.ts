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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "App Mesh", serviceShapeName: "AppMesh" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "appmesh" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-01-25");
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
              `https://appmesh-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://appmesh-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://appmesh.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://appmesh.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://appmesh.{R}.{D}","properties":{},"headers":{}}');

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
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(503), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
  | { exact: string; regex?: never; range?: never; prefix?: never; suffix?: never }
  | { exact?: never; regex: string; range?: never; prefix?: never; suffix?: never }
  | { exact?: never; regex?: never; range: MatchRange; prefix?: never; suffix?: never }
  | { exact?: never; regex?: never; range?: never; prefix: string; suffix?: never }
  | { exact?: never; regex?: never; range?: never; prefix?: never; suffix: string };
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
  | { exact: string; regex?: never; range?: never; prefix?: never; suffix?: never }
  | { exact?: never; regex: string; range?: never; prefix?: never; suffix?: never }
  | { exact?: never; regex?: never; range: MatchRange; prefix?: never; suffix?: never }
  | { exact?: never; regex?: never; range?: never; prefix: string; suffix?: never }
  | { exact?: never; regex?: never; range?: never; prefix?: never; suffix: string };
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
  | { exact: string; regex?: never; range?: never; prefix?: never; suffix?: never }
  | { exact?: never; regex: string; range?: never; prefix?: never; suffix?: never }
  | { exact?: never; regex?: never; range: MatchRange; prefix?: never; suffix?: never }
  | { exact?: never; regex?: never; range?: never; prefix: string; suffix?: never }
  | { exact?: never; regex?: never; range?: never; prefix?: never; suffix: string };
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
  | { acm: VirtualGatewayTlsValidationContextAcmTrust; file?: never; sds?: never }
  | { acm?: never; file: VirtualGatewayTlsValidationContextFileTrust; sds?: never }
  | { acm?: never; file?: never; sds: VirtualGatewayTlsValidationContextSdsTrust };
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
  | { tcp: VirtualNodeTcpConnectionPool; http?: never; http2?: never; grpc?: never }
  | { tcp?: never; http: VirtualNodeHttpConnectionPool; http2?: never; grpc?: never }
  | { tcp?: never; http?: never; http2: VirtualNodeHttp2ConnectionPool; grpc?: never }
  | { tcp?: never; http?: never; http2?: never; grpc: VirtualNodeGrpcConnectionPool };
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
  input: __S(0, __c0, 0) as any as S.Schema<CreateGatewayRouteInput>,
  output: __S(175, __c5, 15) as any as S.Schema<CreateGatewayRouteOutput>,
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
}));

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
  input: __S(192, __c6, 0) as any as S.Schema<CreateMeshInput>,
  output: __S(229, __c7, 5) as any as S.Schema<CreateMeshOutput>,
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
}));

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
  input: __S(256, __c8, 0) as any as S.Schema<CreateRouteInput>,
  output: __S(365, __c11, 13) as any as S.Schema<CreateRouteOutput>,
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
}));

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
  input: __S(384, __c12, 0) as any as S.Schema<CreateVirtualGatewayInput>,
  output: __S(486, __c15, 6) as any as S.Schema<CreateVirtualGatewayOutput>,
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
}));

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
  input: __S(512, __c16, 0) as any as S.Schema<CreateVirtualNodeInput>,
  output: __S(559, __c17, 15) as any as S.Schema<CreateVirtualNodeOutput>,
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
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<CreateVirtualRouterInput>,
  output: __S(612, __c19, 4) as any as S.Schema<CreateVirtualRouterOutput>,
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
}));

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
  input: __S(640, __c20, 0) as any as S.Schema<CreateVirtualServiceInput>,
  output: __S(677, __c21, 5) as any as S.Schema<CreateVirtualServiceOutput>,
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
}));

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
  input: __S(704, __c22, 0) as any as S.Schema<DeleteGatewayRouteInput>,
  output: __S(175, __c5, 15) as any as S.Schema<DeleteGatewayRouteOutput>,
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
}));

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
  input: __S(736, __c23, 0) as any as S.Schema<DeleteMeshInput>,
  output: __S(229, __c7, 5) as any as S.Schema<DeleteMeshOutput>,
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
}));

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
  input: __S(768, __c24, 0) as any as S.Schema<DeleteRouteInput>,
  output: __S(365, __c11, 13) as any as S.Schema<DeleteRouteOutput>,
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
}));

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
  input: __S(800, __c25, 0) as any as S.Schema<DeleteVirtualGatewayInput>,
  output: __S(486, __c15, 6) as any as S.Schema<DeleteVirtualGatewayOutput>,
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
}));

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
  input: __S(832, __c26, 0) as any as S.Schema<DeleteVirtualNodeInput>,
  output: __S(559, __c17, 15) as any as S.Schema<DeleteVirtualNodeOutput>,
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
}));

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
  input: __S(864, __c27, 0) as any as S.Schema<DeleteVirtualRouterInput>,
  output: __S(612, __c19, 4) as any as S.Schema<DeleteVirtualRouterOutput>,
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
}));

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
  input: __S(896, __c28, 0) as any as S.Schema<DeleteVirtualServiceInput>,
  output: __S(677, __c21, 5) as any as S.Schema<DeleteVirtualServiceOutput>,
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
}));

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
  input: __S(928, __c29, 0) as any as S.Schema<DescribeGatewayRouteInput>,
  output: __S(175, __c5, 15) as any as S.Schema<DescribeGatewayRouteOutput>,
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
}));

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
  input: __S(960, __c30, 0) as any as S.Schema<DescribeMeshInput>,
  output: __S(229, __c7, 5) as any as S.Schema<DescribeMeshOutput>,
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
}));

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
  input: __S(992, __c31, 0) as any as S.Schema<DescribeRouteInput>,
  output: __S(365, __c11, 13) as any as S.Schema<DescribeRouteOutput>,
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
}));

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
  input: __S(1024, __c32, 0) as any as S.Schema<DescribeVirtualGatewayInput>,
  output: __S(486, __c15, 6) as any as S.Schema<DescribeVirtualGatewayOutput>,
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
}));

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
  input: __S(1056, __c33, 0) as any as S.Schema<DescribeVirtualNodeInput>,
  output: __S(559, __c17, 15) as any as S.Schema<DescribeVirtualNodeOutput>,
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
}));

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
  input: __S(1088, __c34, 0) as any as S.Schema<DescribeVirtualRouterInput>,
  output: __S(612, __c19, 4) as any as S.Schema<DescribeVirtualRouterOutput>,
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
}));

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
  input: __S(1120, __c35, 0) as any as S.Schema<DescribeVirtualServiceInput>,
  output: __S(677, __c21, 5) as any as S.Schema<DescribeVirtualServiceOutput>,
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
}));

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
  input: __S(1152, __c36, 0) as any as S.Schema<ListGatewayRoutesInput>,
  output: __S(1155, __c36, 3) as any as S.Schema<ListGatewayRoutesOutput>,
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
  input: __S(1184, __c37, 0) as any as S.Schema<ListMeshesInput>,
  output: __S(1187, __c37, 3) as any as S.Schema<ListMeshesOutput>,
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
  input: __S(1216, __c38, 0) as any as S.Schema<ListRoutesInput>,
  output: __S(1219, __c38, 3) as any as S.Schema<ListRoutesOutput>,
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
  input: __S(1248, __c39, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(1249, __c39, 1) as any as S.Schema<ListTagsForResourceOutput>,
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
  input: __S(1280, __c40, 0) as any as S.Schema<ListVirtualGatewaysInput>,
  output: __S(1283, __c40, 3) as any as S.Schema<ListVirtualGatewaysOutput>,
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
  input: __S(1312, __c41, 0) as any as S.Schema<ListVirtualNodesInput>,
  output: __S(1315, __c41, 3) as any as S.Schema<ListVirtualNodesOutput>,
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
  input: __S(1344, __c42, 0) as any as S.Schema<ListVirtualRoutersInput>,
  output: __S(1347, __c42, 3) as any as S.Schema<ListVirtualRoutersOutput>,
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
  input: __S(1376, __c43, 0) as any as S.Schema<ListVirtualServicesInput>,
  output: __S(1379, __c43, 3) as any as S.Schema<ListVirtualServicesOutput>,
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
  input: __S(1408, __c44, 0) as any as S.Schema<TagResourceInput>,
  output: __S(1440, __c45, 0) as any as S.Schema<TagResourceOutput>,
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
}));

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
  input: __S(1472, __c46, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(1440, __c45, 0) as any as S.Schema<UntagResourceOutput>,
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
}));

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
  input: __S(1504, __c47, 0) as any as S.Schema<UpdateGatewayRouteInput>,
  output: __S(175, __c5, 15) as any as S.Schema<UpdateGatewayRouteOutput>,
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
}));

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
  input: __S(1536, __c48, 0) as any as S.Schema<UpdateMeshInput>,
  output: __S(229, __c7, 5) as any as S.Schema<UpdateMeshOutput>,
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
}));

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
  input: __S(1568, __c49, 0) as any as S.Schema<UpdateRouteInput>,
  output: __S(365, __c11, 13) as any as S.Schema<UpdateRouteOutput>,
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
}));

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
  input: __S(1600, __c50, 0) as any as S.Schema<UpdateVirtualGatewayInput>,
  output: __S(486, __c15, 6) as any as S.Schema<UpdateVirtualGatewayOutput>,
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
}));

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
  input: __S(1632, __c51, 0) as any as S.Schema<UpdateVirtualNodeInput>,
  output: __S(559, __c17, 15) as any as S.Schema<UpdateVirtualNodeOutput>,
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
}));

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
  input: __S(1664, __c52, 0) as any as S.Schema<UpdateVirtualRouterInput>,
  output: __S(612, __c19, 4) as any as S.Schema<UpdateVirtualRouterOutput>,
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
}));

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
  input: __S(1696, __c53, 0) as any as S.Schema<UpdateVirtualServiceInput>,
  output: __S(677, __c21, 5) as any as S.Schema<UpdateVirtualServiceOutput>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayRouteName: S.String,
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          virtualGatewayName: S.String.pipe(T.HttpLabel("virtualGatewayName")),
          spec: __S(173, __c5, 13),
          tags: S.optional(__S(65, __c2, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v20190125/meshes/{meshName}/virtualGateway/{virtualGatewayName}/gatewayRoutes",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateGatewayRouteInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          version: S.Number,
          uid: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          meshOwner: S.String,
          resourceOwner: S.String,
        }),
      ).annotate({ identifier: "ResourceMetadata" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "TagRef",
      });
    case 1:
      return S.Array(__S(64, __c2, 0));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ status: S.String })).annotate({
        identifier: "GatewayRouteStatus",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ exact: S.optional(S.String), regex: S.optional(S.String) }),
      ).annotate({ identifier: "HttpPathMatch" });
    case 1:
      return S.suspend(() => S.Struct({ exact: S.optional(S.String) })).annotate({
        identifier: "QueryParameterMatch",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ name: S.String, match: S.optional(__S(129, __c4, 1)) }),
      ).annotate({ identifier: "HttpQueryParameter" });
    case 3:
      return S.Array(__S(130, __c4, 2));
    case 4:
      return S.suspend(() => S.Struct({ start: S.Number, end: S.Number })).annotate({
        identifier: "MatchRange",
      });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ exact: S.String }),
        /*@__PURE__*/ S.Struct({ regex: S.String }),
        /*@__PURE__*/ S.Struct({ range: __S(132, __c4, 4) }),
        /*@__PURE__*/ S.Struct({ prefix: S.String }),
        /*@__PURE__*/ S.Struct({ suffix: S.String }),
      ]);
    case 6:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          invert: S.optional(S.Boolean),
          match: S.optional(__S(133, __c4, 5)),
        }),
      ).annotate({ identifier: "HttpGatewayRouteHeader" });
    case 7:
      return S.Array(__S(134, __c4, 6));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ exact: S.optional(S.String), suffix: S.optional(S.String) }),
      ).annotate({ identifier: "GatewayRouteHostnameMatch" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          prefix: S.optional(S.String),
          path: S.optional(__S(128, __c4, 0)),
          queryParameters: S.optional(__S(131, __c4, 3)),
          method: S.optional(S.String),
          hostname: S.optional(__S(160, __c5, 0)),
          headers: S.optional(__S(135, __c4, 7)),
          port: S.optional(S.Number),
        }),
      ).annotate({ identifier: "HttpGatewayRouteMatch" });
    case 2:
      return S.suspend(() => S.Struct({ virtualServiceName: S.String })).annotate({
        identifier: "GatewayRouteVirtualService",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ virtualService: __S(162, __c5, 2), port: S.optional(S.Number) }),
      ).annotate({ identifier: "GatewayRouteTarget" });
    case 4:
      return S.suspend(() =>
        S.Struct({ defaultPrefix: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "HttpGatewayRoutePrefixRewrite" });
    case 5:
      return S.suspend(() => S.Struct({ defaultTargetHostname: S.optional(S.String) })).annotate({
        identifier: "GatewayRouteHostnameRewrite",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          prefix: S.optional(__S(164, __c5, 4)),
          path: S.optional(__S(129, __c4, 1)),
          hostname: S.optional(__S(165, __c5, 5)),
        }),
      ).annotate({ identifier: "HttpGatewayRouteRewrite" });
    case 7:
      return S.suspend(() =>
        S.Struct({ target: __S(163, __c5, 3), rewrite: S.optional(__S(166, __c5, 6)) }),
      ).annotate({ identifier: "HttpGatewayRouteAction" });
    case 8:
      return S.suspend(() =>
        S.Struct({ match: __S(161, __c5, 1), action: __S(167, __c5, 7) }),
      ).annotate({ identifier: "HttpGatewayRoute" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.optional(S.String),
          hostname: S.optional(__S(160, __c5, 0)),
          metadata: S.optional(__S(135, __c4, 7)),
          port: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GrpcGatewayRouteMatch" });
    case 10:
      return S.suspend(() => S.Struct({ hostname: S.optional(__S(165, __c5, 5)) })).annotate({
        identifier: "GrpcGatewayRouteRewrite",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({ target: __S(163, __c5, 3), rewrite: S.optional(__S(170, __c5, 10)) }),
      ).annotate({ identifier: "GrpcGatewayRouteAction" });
    case 12:
      return S.suspend(() =>
        S.Struct({ match: __S(169, __c5, 9), action: __S(171, __c5, 11) }),
      ).annotate({ identifier: "GrpcGatewayRoute" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          priority: S.optional(S.Number),
          httpRoute: S.optional(__S(168, __c5, 8)),
          http2Route: S.optional(__S(168, __c5, 8)),
          grpcRoute: S.optional(__S(172, __c5, 12)),
        }),
      ).annotate({ identifier: "GatewayRouteSpec" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String,
          gatewayRouteName: S.String,
          virtualGatewayName: S.String,
          spec: __S(173, __c5, 13),
          metadata: __S(32, __c1, 0),
          status: __S(96, __c3, 0),
        }),
      ).annotate({ identifier: "GatewayRouteData" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          gatewayRoute: __S(174, __c5, 14)
            .pipe(T.HttpPayload())
            .annotate({ identifier: "GatewayRouteData" }),
        }),
      ).annotate({ identifier: "CreateGatewayRouteOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String,
          spec: S.optional(__S(226, __c7, 2)),
          tags: S.optional(__S(65, __c2, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/v20190125/meshes" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateMeshInput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ type: S.String })).annotate({ identifier: "EgressFilter" });
    case 1:
      return S.suspend(() => S.Struct({ ipPreference: S.optional(S.String) })).annotate({
        identifier: "MeshServiceDiscovery",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          egressFilter: S.optional(__S(224, __c7, 0)),
          serviceDiscovery: S.optional(__S(225, __c7, 1)),
        }),
      ).annotate({ identifier: "MeshSpec" });
    case 3:
      return S.suspend(() => S.Struct({ status: S.optional(S.String) })).annotate({
        identifier: "MeshStatus",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String,
          spec: __S(226, __c7, 2),
          metadata: __S(32, __c1, 0),
          status: __S(227, __c7, 3),
        }),
      ).annotate({ identifier: "MeshData" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          mesh: __S(228, __c7, 4).pipe(T.HttpPayload()).annotate({ identifier: "MeshData" }),
        }),
      ).annotate({ identifier: "CreateMeshOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          routeName: S.String,
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          virtualRouterName: S.String.pipe(T.HttpLabel("virtualRouterName")),
          spec: __S(363, __c11, 11),
          tags: S.optional(__S(65, __c2, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v20190125/meshes/{meshName}/virtualRouter/{virtualRouterName}/routes",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRouteInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ value: S.optional(S.Number), unit: S.optional(S.String) }),
      ).annotate({ identifier: "Duration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          perRequest: S.optional(__S(320, __c10, 0)),
          idle: S.optional(__S(320, __c10, 0)),
        }),
      ).annotate({ identifier: "HttpTimeout" });
    case 2:
      return S.suspend(() => S.Struct({ idle: S.optional(__S(320, __c10, 0)) })).annotate({
        identifier: "TcpTimeout",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          prefix: S.optional(S.String),
          path: S.optional(__S(128, __c4, 0)),
          queryParameters: S.optional(__S(131, __c4, 3)),
          method: S.optional(S.String),
          scheme: S.optional(S.String),
          headers: S.optional(__S(135, __c4, 7)),
          port: S.optional(S.Number),
        }),
      ).annotate({ identifier: "HttpRouteMatch" });
    case 1:
      return S.suspend(() =>
        S.Struct({ virtualNode: S.String, weight: S.Number, port: S.optional(S.Number) }),
      ).annotate({ identifier: "WeightedTarget" });
    case 2:
      return S.Array(__S(353, __c11, 1));
    case 3:
      return S.suspend(() => S.Struct({ weightedTargets: __S(354, __c11, 2) })).annotate({
        identifier: "HttpRouteAction",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          perRetryTimeout: __S(320, __c10, 0),
          maxRetries: S.Number,
          httpRetryEvents: S.optional(__S(288, __c9, 0)),
          tcpRetryEvents: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "HttpRetryPolicy" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          match: __S(352, __c11, 0),
          action: __S(355, __c11, 3),
          retryPolicy: S.optional(__S(356, __c11, 4)),
          timeout: S.optional(__S(321, __c10, 1)),
        }),
      ).annotate({ identifier: "HttpRoute" });
    case 6:
      return S.suspend(() => S.Struct({ port: S.optional(S.Number) })).annotate({
        identifier: "TcpRouteMatch",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          action: __S(355, __c11, 3),
          timeout: S.optional(__S(322, __c10, 2)),
          match: S.optional(__S(358, __c11, 6)),
        }),
      ).annotate({ identifier: "TcpRoute" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.optional(S.String),
          methodName: S.optional(S.String),
          metadata: S.optional(__S(135, __c4, 7)),
          port: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GrpcRouteMatch" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          perRetryTimeout: __S(320, __c10, 0),
          maxRetries: S.Number,
          httpRetryEvents: S.optional(__S(288, __c9, 0)),
          tcpRetryEvents: S.optional(__S(288, __c9, 0)),
          grpcRetryEvents: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "GrpcRetryPolicy" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          action: __S(355, __c11, 3),
          match: __S(360, __c11, 8),
          retryPolicy: S.optional(__S(361, __c11, 9)),
          timeout: S.optional(__S(321, __c10, 1)),
        }),
      ).annotate({ identifier: "GrpcRoute" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          priority: S.optional(S.Number),
          httpRoute: S.optional(__S(357, __c11, 5)),
          tcpRoute: S.optional(__S(359, __c11, 7)),
          http2Route: S.optional(__S(357, __c11, 5)),
          grpcRoute: S.optional(__S(362, __c11, 10)),
        }),
      ).annotate({ identifier: "RouteSpec" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String,
          virtualRouterName: S.String,
          routeName: S.String,
          spec: __S(363, __c11, 11),
          metadata: __S(32, __c1, 0),
          status: __S(96, __c3, 0),
        }),
      ).annotate({ identifier: "RouteData" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          route: __S(364, __c11, 12).pipe(T.HttpPayload()).annotate({ identifier: "RouteData" }),
        }),
      ).annotate({ identifier: "CreateRouteOutput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualGatewayName: S.String,
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          spec: __S(484, __c15, 4),
          tags: S.optional(__S(65, __c2, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v20190125/meshes/{meshName}/virtualGateways" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateVirtualGatewayInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ port: S.Number, protocol: S.String })).annotate({
        identifier: "VirtualGatewayPortMapping",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.suspend(() =>
        S.Struct({ certificateChain: S.String, privateKey: S.String }),
      ).annotate({ identifier: "VirtualGatewayListenerTlsFileCertificate" });
    case 2:
      return S.suspend(() => S.Struct({ secretName: S.String })).annotate({
        identifier: "VirtualGatewayListenerTlsSdsCertificate",
      });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ file: __S(449, __c14, 1) }),
        /*@__PURE__*/ S.Struct({ sds: __S(450, __c14, 2) }),
      ]);
    case 4:
      return S.suspend(() => S.Struct({ certificateAuthorityArns: __S(288, __c9, 0) })).annotate({
        identifier: "VirtualGatewayTlsValidationContextAcmTrust",
      });
    case 5:
      return S.suspend(() => S.Struct({ certificateChain: S.String })).annotate({
        identifier: "VirtualGatewayTlsValidationContextFileTrust",
      });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ acm: __S(452, __c14, 4) }),
        /*@__PURE__*/ S.Struct({ file: __S(453, __c14, 5) }),
        /*@__PURE__*/ S.Struct({ sds: __S(450, __c14, 2) }),
      ]);
    case 7:
      return S.suspend(() => S.Struct({ exact: __S(288, __c9, 0) })).annotate({
        identifier: "SubjectAlternativeNameMatchers",
      });
    case 8:
      return S.suspend(() => S.Struct({ match: __S(455, __c14, 7) })).annotate({
        identifier: "SubjectAlternativeNames",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({
          trust: __S(454, __c14, 6),
          subjectAlternativeNames: S.optional(__S(456, __c14, 8)),
        }),
      ).annotate({ identifier: "VirtualGatewayTlsValidationContext" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          enforce: S.optional(S.Boolean),
          ports: S.optional(__S(448, __c14, 0)),
          certificate: S.optional(__S(451, __c14, 3)),
          validation: __S(457, __c14, 9),
        }),
      ).annotate({ identifier: "VirtualGatewayClientPolicyTls" });
    case 11:
      return S.suspend(() => S.Struct({ tls: S.optional(__S(458, __c14, 10)) })).annotate({
        identifier: "VirtualGatewayClientPolicy",
      });
    case 12:
      return S.suspend(() => S.Struct({ clientPolicy: S.optional(__S(459, __c14, 11)) })).annotate({
        identifier: "VirtualGatewayBackendDefaults",
      });
    case 13:
      return S.suspend(() =>
        S.Struct({
          timeoutMillis: S.Number,
          intervalMillis: S.Number,
          protocol: S.String,
          port: S.optional(S.Number),
          path: S.optional(S.String),
          healthyThreshold: S.Number,
          unhealthyThreshold: S.Number,
        }),
      ).annotate({ identifier: "VirtualGatewayHealthCheckPolicy" });
    case 14:
      return S.Union([
        /*@__PURE__*/ S.Struct({ file: __S(453, __c14, 5) }),
        /*@__PURE__*/ S.Struct({ sds: __S(450, __c14, 2) }),
      ]);
    case 15:
      return S.suspend(() =>
        S.Struct({
          trust: __S(462, __c14, 14),
          subjectAlternativeNames: S.optional(__S(456, __c14, 8)),
        }),
      ).annotate({ identifier: "VirtualGatewayListenerTlsValidationContext" });
    case 16:
      return S.suspend(() => S.Struct({ certificateArn: S.String })).annotate({
        identifier: "VirtualGatewayListenerTlsAcmCertificate",
      });
    case 17:
      return S.Union([
        /*@__PURE__*/ S.Struct({ acm: __S(464, __c14, 16) }),
        /*@__PURE__*/ S.Struct({ file: __S(449, __c14, 1) }),
        /*@__PURE__*/ S.Struct({ sds: __S(450, __c14, 2) }),
      ]);
    case 18:
      return S.suspend(() =>
        S.Struct({ maxConnections: S.Number, maxPendingRequests: S.optional(S.Number) }),
      ).annotate({ identifier: "VirtualGatewayHttpConnectionPool" });
    case 19:
      return S.suspend(() => S.Struct({ maxRequests: S.Number })).annotate({
        identifier: "VirtualGatewayHttp2ConnectionPool",
      });
    case 20:
      return S.Union([
        /*@__PURE__*/ S.Struct({ text: S.String }),
        /*@__PURE__*/ S.Struct({ json: __S(65, __c2, 1) }),
      ]);
    case 21:
      return S.suspend(() =>
        S.Struct({ path: S.String, format: S.optional(__S(468, __c14, 20)) }),
      ).annotate({ identifier: "VirtualGatewayFileAccessLog" });
    case 22:
      return S.Union([/*@__PURE__*/ S.Struct({ file: __S(469, __c14, 21) })]);
    case 23:
      return S.suspend(() => S.Struct({ accessLog: S.optional(__S(470, __c14, 22)) })).annotate({
        identifier: "VirtualGatewayLogging",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          mode: S.String,
          validation: S.optional(__S(463, __c14, 15)),
          certificate: __S(465, __c14, 17),
        }),
      ).annotate({ identifier: "VirtualGatewayListenerTls" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ http: __S(466, __c14, 18) }),
        /*@__PURE__*/ S.Struct({ http2: __S(467, __c14, 19) }),
        /*@__PURE__*/ S.Struct({ grpc: __S(467, __c14, 19) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          healthCheck: S.optional(__S(461, __c14, 13)),
          portMapping: __S(416, __c13, 0),
          tls: S.optional(__S(480, __c15, 0)),
          connectionPool: S.optional(__S(481, __c15, 1)),
        }),
      ).annotate({ identifier: "VirtualGatewayListener" });
    case 3:
      return S.Array(__S(482, __c15, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          backendDefaults: S.optional(__S(460, __c14, 12)),
          listeners: __S(483, __c15, 3),
          logging: S.optional(__S(471, __c14, 23)),
        }),
      ).annotate({ identifier: "VirtualGatewaySpec" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String,
          virtualGatewayName: S.String,
          spec: __S(484, __c15, 4),
          metadata: __S(32, __c1, 0),
          status: __S(96, __c3, 0),
        }),
      ).annotate({ identifier: "VirtualGatewayData" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          virtualGateway: __S(485, __c15, 5)
            .pipe(T.HttpPayload())
            .annotate({ identifier: "VirtualGatewayData" }),
        }),
      ).annotate({ identifier: "CreateVirtualGatewayOutput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualNodeName: S.String,
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          spec: __S(557, __c17, 13),
          tags: S.optional(__S(65, __c2, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v20190125/meshes/{meshName}/virtualNodes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateVirtualNodeInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          hostname: S.String,
          responseType: S.optional(S.String),
          ipPreference: S.optional(S.String),
        }),
      ).annotate({ identifier: "DnsServiceDiscovery" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          namespaceName: S.String,
          serviceName: S.String,
          attributes: S.optional(__S(65, __c2, 1)),
          ipPreference: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsCloudMapServiceDiscovery" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ dns: __S(544, __c17, 0) }),
        /*@__PURE__*/ S.Struct({ awsCloudMap: __S(545, __c17, 1) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          mode: S.String,
          certificate: __S(465, __c14, 17),
          validation: S.optional(__S(463, __c14, 15)),
        }),
      ).annotate({ identifier: "ListenerTls" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ tcp: __S(322, __c10, 2) }),
        /*@__PURE__*/ S.Struct({ http: __S(321, __c10, 1) }),
        /*@__PURE__*/ S.Struct({ http2: __S(321, __c10, 1) }),
        /*@__PURE__*/ S.Struct({ grpc: __S(321, __c10, 1) }),
      ]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          maxServerErrors: S.Number,
          interval: __S(320, __c10, 0),
          baseEjectionDuration: __S(320, __c10, 0),
          maxEjectionPercent: S.Number,
        }),
      ).annotate({ identifier: "OutlierDetection" });
    case 6:
      return S.suspend(() => S.Struct({ maxConnections: S.Number })).annotate({
        identifier: "VirtualNodeTcpConnectionPool",
      });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ tcp: __S(550, __c17, 6) }),
        /*@__PURE__*/ S.Struct({ http: __S(466, __c14, 18) }),
        /*@__PURE__*/ S.Struct({ http2: __S(467, __c14, 19) }),
        /*@__PURE__*/ S.Struct({ grpc: __S(467, __c14, 19) }),
      ]);
    case 8:
      return S.suspend(() =>
        S.Struct({
          portMapping: __S(416, __c13, 0),
          tls: S.optional(__S(547, __c17, 3)),
          healthCheck: S.optional(__S(461, __c14, 13)),
          timeout: S.optional(__S(548, __c17, 4)),
          outlierDetection: S.optional(__S(549, __c17, 5)),
          connectionPool: S.optional(__S(551, __c17, 7)),
        }),
      ).annotate({ identifier: "Listener" });
    case 9:
      return S.Array(__S(552, __c17, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ virtualServiceName: S.String, clientPolicy: S.optional(__S(459, __c14, 11)) }),
      ).annotate({ identifier: "VirtualServiceBackend" });
    case 11:
      return S.Union([/*@__PURE__*/ S.Struct({ virtualService: __S(554, __c17, 10) })]);
    case 12:
      return S.Array(__S(555, __c17, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          serviceDiscovery: S.optional(__S(546, __c17, 2)),
          listeners: S.optional(__S(553, __c17, 9)),
          backends: S.optional(__S(556, __c17, 12)),
          backendDefaults: S.optional(__S(460, __c14, 12)),
          logging: S.optional(__S(471, __c14, 23)),
        }),
      ).annotate({ identifier: "VirtualNodeSpec" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String,
          virtualNodeName: S.String,
          spec: __S(557, __c17, 13),
          metadata: __S(32, __c1, 0),
          status: __S(96, __c3, 0),
        }),
      ).annotate({ identifier: "VirtualNodeData" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          virtualNode: __S(558, __c17, 14)
            .pipe(T.HttpPayload())
            .annotate({ identifier: "VirtualNodeData" }),
        }),
      ).annotate({ identifier: "CreateVirtualNodeOutput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualRouterName: S.String,
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          spec: __S(610, __c19, 2),
          tags: S.optional(__S(65, __c2, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v20190125/meshes/{meshName}/virtualRouters" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateVirtualRouterInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ portMapping: __S(416, __c13, 0) })).annotate({
        identifier: "VirtualRouterListener",
      });
    case 1:
      return S.Array(__S(608, __c19, 0));
    case 2:
      return S.suspend(() => S.Struct({ listeners: S.optional(__S(609, __c19, 1)) })).annotate({
        identifier: "VirtualRouterSpec",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String,
          virtualRouterName: S.String,
          spec: __S(610, __c19, 2),
          metadata: __S(32, __c1, 0),
          status: __S(96, __c3, 0),
        }),
      ).annotate({ identifier: "VirtualRouterData" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          virtualRouter: __S(611, __c19, 3)
            .pipe(T.HttpPayload())
            .annotate({ identifier: "VirtualRouterData" }),
        }),
      ).annotate({ identifier: "CreateVirtualRouterOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualServiceName: S.String,
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          spec: __S(675, __c21, 3),
          tags: S.optional(__S(65, __c2, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v20190125/meshes/{meshName}/virtualServices" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateVirtualServiceInput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ virtualNodeName: S.String })).annotate({
        identifier: "VirtualNodeServiceProvider",
      });
    case 1:
      return S.suspend(() => S.Struct({ virtualRouterName: S.String })).annotate({
        identifier: "VirtualRouterServiceProvider",
      });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ virtualNode: __S(672, __c21, 0) }),
        /*@__PURE__*/ S.Struct({ virtualRouter: __S(673, __c21, 1) }),
      ]);
    case 3:
      return S.suspend(() => S.Struct({ provider: S.optional(__S(674, __c21, 2)) })).annotate({
        identifier: "VirtualServiceSpec",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String,
          virtualServiceName: S.String,
          spec: __S(675, __c21, 3),
          metadata: __S(32, __c1, 0),
          status: __S(96, __c3, 0),
        }),
      ).annotate({ identifier: "VirtualServiceData" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          virtualService: __S(676, __c21, 4)
            .pipe(T.HttpPayload())
            .annotate({ identifier: "VirtualServiceData" }),
        }),
      ).annotate({ identifier: "CreateVirtualServiceOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayRouteName: S.String.pipe(T.HttpLabel("gatewayRouteName")),
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          virtualGatewayName: S.String.pipe(T.HttpLabel("virtualGatewayName")),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v20190125/meshes/{meshName}/virtualGateway/{virtualGatewayName}/gatewayRoutes/{gatewayRouteName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteGatewayRouteInput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ meshName: S.String.pipe(T.HttpLabel("meshName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v20190125/meshes/{meshName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMeshInput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          routeName: S.String.pipe(T.HttpLabel("routeName")),
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          virtualRouterName: S.String.pipe(T.HttpLabel("virtualRouterName")),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v20190125/meshes/{meshName}/virtualRouter/{virtualRouterName}/routes/{routeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRouteInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualGatewayName: S.String.pipe(T.HttpLabel("virtualGatewayName")),
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v20190125/meshes/{meshName}/virtualGateways/{virtualGatewayName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVirtualGatewayInput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualNodeName: S.String.pipe(T.HttpLabel("virtualNodeName")),
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v20190125/meshes/{meshName}/virtualNodes/{virtualNodeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVirtualNodeInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualRouterName: S.String.pipe(T.HttpLabel("virtualRouterName")),
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v20190125/meshes/{meshName}/virtualRouters/{virtualRouterName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVirtualRouterInput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualServiceName: S.String.pipe(T.HttpLabel("virtualServiceName")),
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v20190125/meshes/{meshName}/virtualServices/{virtualServiceName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVirtualServiceInput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayRouteName: S.String.pipe(T.HttpLabel("gatewayRouteName")),
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          virtualGatewayName: S.String.pipe(T.HttpLabel("virtualGatewayName")),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v20190125/meshes/{meshName}/virtualGateway/{virtualGatewayName}/gatewayRoutes/{gatewayRouteName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeGatewayRouteInput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v20190125/meshes/{meshName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeMeshInput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          routeName: S.String.pipe(T.HttpLabel("routeName")),
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
          virtualRouterName: S.String.pipe(T.HttpLabel("virtualRouterName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v20190125/meshes/{meshName}/virtualRouter/{virtualRouterName}/routes/{routeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeRouteInput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualGatewayName: S.String.pipe(T.HttpLabel("virtualGatewayName")),
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v20190125/meshes/{meshName}/virtualGateways/{virtualGatewayName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeVirtualGatewayInput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualNodeName: S.String.pipe(T.HttpLabel("virtualNodeName")),
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v20190125/meshes/{meshName}/virtualNodes/{virtualNodeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeVirtualNodeInput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualRouterName: S.String.pipe(T.HttpLabel("virtualRouterName")),
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v20190125/meshes/{meshName}/virtualRouters/{virtualRouterName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeVirtualRouterInput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualServiceName: S.String.pipe(T.HttpLabel("virtualServiceName")),
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v20190125/meshes/{meshName}/virtualServices/{virtualServiceName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeVirtualServiceInput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          virtualGatewayName: S.String.pipe(T.HttpLabel("virtualGatewayName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v20190125/meshes/{meshName}/virtualGateway/{virtualGatewayName}/gatewayRoutes",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListGatewayRoutesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String,
          gatewayRouteName: S.String,
          virtualGatewayName: S.String,
          meshOwner: S.String,
          resourceOwner: S.String,
          arn: S.String,
          version: S.Number,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GatewayRouteRef" });
    case 2:
      return S.Array(__S(1153, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ gatewayRoutes: __S(1154, __c36, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListGatewayRoutesOutput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v20190125/meshes" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListMeshesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String,
          meshOwner: S.String,
          resourceOwner: S.String,
          arn: S.String,
          version: S.Number,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "MeshRef" });
    case 2:
      return S.Array(__S(1185, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ meshes: __S(1186, __c37, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMeshesOutput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          virtualRouterName: S.String.pipe(T.HttpLabel("virtualRouterName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v20190125/meshes/{meshName}/virtualRouter/{virtualRouterName}/routes",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRoutesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String,
          virtualRouterName: S.String,
          routeName: S.String,
          meshOwner: S.String,
          resourceOwner: S.String,
          arn: S.String,
          version: S.Number,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "RouteRef" });
    case 2:
      return S.Array(__S(1217, __c38, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ routes: __S(1218, __c38, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRoutesOutput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v20190125/tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ tags: __S(65, __c2, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTagsForResourceOutput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v20190125/meshes/{meshName}/virtualGateways" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListVirtualGatewaysInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String,
          virtualGatewayName: S.String,
          meshOwner: S.String,
          resourceOwner: S.String,
          arn: S.String,
          version: S.Number,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "VirtualGatewayRef" });
    case 2:
      return S.Array(__S(1281, __c40, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ virtualGateways: __S(1282, __c40, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListVirtualGatewaysOutput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v20190125/meshes/{meshName}/virtualNodes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListVirtualNodesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String,
          virtualNodeName: S.String,
          meshOwner: S.String,
          resourceOwner: S.String,
          arn: S.String,
          version: S.Number,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "VirtualNodeRef" });
    case 2:
      return S.Array(__S(1313, __c41, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ virtualNodes: __S(1314, __c41, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListVirtualNodesOutput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v20190125/meshes/{meshName}/virtualRouters" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListVirtualRoutersInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String,
          virtualRouterName: S.String,
          meshOwner: S.String,
          resourceOwner: S.String,
          arn: S.String,
          version: S.Number,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "VirtualRouterRef" });
    case 2:
      return S.Array(__S(1345, __c42, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ virtualRouters: __S(1346, __c42, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListVirtualRoutersOutput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v20190125/meshes/{meshName}/virtualServices" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListVirtualServicesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String,
          virtualServiceName: S.String,
          meshOwner: S.String,
          resourceOwner: S.String,
          arn: S.String,
          version: S.Number,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "VirtualServiceRef" });
    case 2:
      return S.Array(__S(1377, __c43, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ virtualServices: __S(1378, __c43, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListVirtualServicesOutput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
          tags: __S(65, __c2, 1),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/v20190125/tag" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceOutput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
          tagKeys: __S(288, __c9, 0),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/v20190125/untag" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayRouteName: S.String.pipe(T.HttpLabel("gatewayRouteName")),
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          virtualGatewayName: S.String.pipe(T.HttpLabel("virtualGatewayName")),
          spec: __S(173, __c5, 13),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v20190125/meshes/{meshName}/virtualGateway/{virtualGatewayName}/gatewayRoutes/{gatewayRouteName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateGatewayRouteInput" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          spec: S.optional(__S(226, __c7, 2)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v20190125/meshes/{meshName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMeshInput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          routeName: S.String.pipe(T.HttpLabel("routeName")),
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          virtualRouterName: S.String.pipe(T.HttpLabel("virtualRouterName")),
          spec: __S(363, __c11, 11),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v20190125/meshes/{meshName}/virtualRouter/{virtualRouterName}/routes/{routeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRouteInput" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualGatewayName: S.String.pipe(T.HttpLabel("virtualGatewayName")),
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          spec: __S(484, __c15, 4),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v20190125/meshes/{meshName}/virtualGateways/{virtualGatewayName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateVirtualGatewayInput" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualNodeName: S.String.pipe(T.HttpLabel("virtualNodeName")),
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          spec: __S(557, __c17, 13),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v20190125/meshes/{meshName}/virtualNodes/{virtualNodeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateVirtualNodeInput" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualRouterName: S.String.pipe(T.HttpLabel("virtualRouterName")),
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          spec: __S(610, __c19, 2),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v20190125/meshes/{meshName}/virtualRouters/{virtualRouterName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateVirtualRouterInput" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          virtualServiceName: S.String.pipe(T.HttpLabel("virtualServiceName")),
          meshName: S.String.pipe(T.HttpLabel("meshName")),
          spec: __S(675, __c21, 3),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v20190125/meshes/{meshName}/virtualServices/{virtualServiceName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateVirtualServiceInput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
