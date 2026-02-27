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
const svc = T.AwsApiService({ sdkId: "App Mesh", serviceShapeName: "AppMesh" });
const auth = T.AwsAuthSigv4({ name: "appmesh" });
const ver = T.ServiceVersion("2019-01-25");
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
});

//# Newtypes
export type Arn = string;
export type TagsLimit = number;
export type TagKey = string;
export type TagValue = string;
export type ResourceName = string;
export type EgressFilterType = string;
export type IpPreference = string;
export type AccountId = string;
export type MeshStatusCode = string;
export type ListMeshesLimit = number;
export type PortNumber = number;
export type FilePath = string;
export type VirtualGatewaySdsSecretName = string;
export type SubjectAlternativeName = string;
export type VirtualGatewayHealthCheckTimeoutMillis = number;
export type VirtualGatewayHealthCheckIntervalMillis = number;
export type VirtualGatewayPortProtocol = string;
export type VirtualGatewayHealthCheckThreshold = number;
export type VirtualGatewayListenerTlsMode = string;
export type MaxConnections = number;
export type MaxPendingRequests = number;
export type MaxRequests = number;
export type TextFormat = string;
export type JsonKey = string;
export type JsonValue = string;
export type VirtualGatewayStatusCode = string;
export type ListVirtualGatewaysLimit = number;
export type GatewayRoutePriority = number;
export type HttpPathExact = string;
export type HttpPathRegex = string;
export type QueryParameterName = string;
export type HttpMethod = string;
export type ExactHostName = string;
export type SuffixHostname = string;
export type HeaderName = string;
export type HeaderMatch = string;
export type ListenerPort = number;
export type DefaultGatewayRouteRewrite = string;
export type HttpGatewayRoutePrefix = string;
export type ServiceName = string;
export type GatewayRouteStatusCode = string;
export type ListGatewayRoutesLimit = number;
export type Hostname = string;
export type DnsResponseType = string;
export type AwsCloudMapName = string;
export type AwsCloudMapInstanceAttributeKey = string;
export type AwsCloudMapInstanceAttributeValue = string;
export type PortProtocol = string;
export type ListenerTlsMode = string;
export type SdsSecretName = string;
export type HealthCheckTimeoutMillis = number;
export type HealthCheckIntervalMillis = number;
export type HealthCheckThreshold = number;
export type DurationValue = number;
export type DurationUnit = string;
export type OutlierDetectionMaxServerErrors = number;
export type OutlierDetectionMaxEjectionPercent = number;
export type VirtualNodeStatusCode = string;
export type ListVirtualNodesLimit = number;
export type VirtualRouterStatusCode = string;
export type ListVirtualRoutersLimit = number;
export type RoutePriority = number;
export type HttpScheme = string;
export type PercentInt = number;
export type MaxRetries = number;
export type HttpRetryPolicyEvent = string;
export type TcpRetryPolicyEvent = string;
export type MethodName = string;
export type GrpcRetryPolicyEvent = string;
export type RouteStatusCode = string;
export type ListRoutesLimit = number;
export type VirtualServiceStatusCode = string;
export type ListVirtualServicesLimit = number;

//# Schemas
export interface ListTagsForResourceInput {
  resourceArn: string;
  nextToken?: string;
  limit?: number;
}
export const ListTagsForResourceInput = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v20190125/tags" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface TagRef {
  key: string;
  value: string;
}
export const TagRef = S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "TagRef" }) as any as S.Schema<TagRef>;
export type TagList = TagRef[];
export const TagList = S.Array(TagRef);
export interface ListTagsForResourceOutput {
  tags: TagRef[];
  nextToken?: string;
}
export const ListTagsForResourceOutput = S.suspend(() =>
  S.Struct({ tags: TagList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface TagResourceInput {
  resourceArn: string;
  tags: TagRef[];
}
export const TagResourceInput = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
    tags: TagList,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v20190125/tag" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
    tagKeys: TagKeyList,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v20190125/untag" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface EgressFilter {
  type: string;
}
export const EgressFilter = S.suspend(() =>
  S.Struct({ type: S.String }),
).annotate({ identifier: "EgressFilter" }) as any as S.Schema<EgressFilter>;
export interface MeshServiceDiscovery {
  ipPreference?: string;
}
export const MeshServiceDiscovery = S.suspend(() =>
  S.Struct({ ipPreference: S.optional(S.String) }),
).annotate({
  identifier: "MeshServiceDiscovery",
}) as any as S.Schema<MeshServiceDiscovery>;
export interface MeshSpec {
  egressFilter?: EgressFilter;
  serviceDiscovery?: MeshServiceDiscovery;
}
export const MeshSpec = S.suspend(() =>
  S.Struct({
    egressFilter: S.optional(EgressFilter),
    serviceDiscovery: S.optional(MeshServiceDiscovery),
  }),
).annotate({ identifier: "MeshSpec" }) as any as S.Schema<MeshSpec>;
export interface CreateMeshInput {
  meshName: string;
  spec?: MeshSpec;
  tags?: TagRef[];
  clientToken?: string;
}
export const CreateMeshInput = S.suspend(() =>
  S.Struct({
    meshName: S.String,
    spec: S.optional(MeshSpec),
    tags: S.optional(TagList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v20190125/meshes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMeshInput",
}) as any as S.Schema<CreateMeshInput>;
export interface ResourceMetadata {
  arn: string;
  version: number;
  uid: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  meshOwner: string;
  resourceOwner: string;
}
export const ResourceMetadata = S.suspend(() =>
  S.Struct({
    arn: S.String,
    version: S.Number,
    uid: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    meshOwner: S.String,
    resourceOwner: S.String,
  }),
).annotate({
  identifier: "ResourceMetadata",
}) as any as S.Schema<ResourceMetadata>;
export interface MeshStatus {
  status?: string;
}
export const MeshStatus = S.suspend(() =>
  S.Struct({ status: S.optional(S.String) }),
).annotate({ identifier: "MeshStatus" }) as any as S.Schema<MeshStatus>;
export interface MeshData {
  meshName: string;
  spec: MeshSpec;
  metadata: ResourceMetadata;
  status: MeshStatus;
}
export const MeshData = S.suspend(() =>
  S.Struct({
    meshName: S.String,
    spec: MeshSpec,
    metadata: ResourceMetadata,
    status: MeshStatus,
  }),
).annotate({ identifier: "MeshData" }) as any as S.Schema<MeshData>;
export interface CreateMeshOutput {
  mesh: MeshData;
}
export const CreateMeshOutput = S.suspend(() =>
  S.Struct({
    mesh: MeshData.pipe(T.HttpPayload()).annotate({ identifier: "MeshData" }),
  }),
).annotate({
  identifier: "CreateMeshOutput",
}) as any as S.Schema<CreateMeshOutput>;
export interface DescribeMeshInput {
  meshName: string;
  meshOwner?: string;
}
export const DescribeMeshInput = S.suspend(() =>
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
).annotate({
  identifier: "DescribeMeshInput",
}) as any as S.Schema<DescribeMeshInput>;
export interface DescribeMeshOutput {
  mesh: MeshData;
}
export const DescribeMeshOutput = S.suspend(() =>
  S.Struct({
    mesh: MeshData.pipe(T.HttpPayload()).annotate({ identifier: "MeshData" }),
  }),
).annotate({
  identifier: "DescribeMeshOutput",
}) as any as S.Schema<DescribeMeshOutput>;
export interface UpdateMeshInput {
  meshName: string;
  spec?: MeshSpec;
  clientToken?: string;
}
export const UpdateMeshInput = S.suspend(() =>
  S.Struct({
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    spec: S.optional(MeshSpec),
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
).annotate({
  identifier: "UpdateMeshInput",
}) as any as S.Schema<UpdateMeshInput>;
export interface UpdateMeshOutput {
  mesh: MeshData;
}
export const UpdateMeshOutput = S.suspend(() =>
  S.Struct({
    mesh: MeshData.pipe(T.HttpPayload()).annotate({ identifier: "MeshData" }),
  }),
).annotate({
  identifier: "UpdateMeshOutput",
}) as any as S.Schema<UpdateMeshOutput>;
export interface DeleteMeshInput {
  meshName: string;
}
export const DeleteMeshInput = S.suspend(() =>
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
).annotate({
  identifier: "DeleteMeshInput",
}) as any as S.Schema<DeleteMeshInput>;
export interface DeleteMeshOutput {
  mesh: MeshData;
}
export const DeleteMeshOutput = S.suspend(() =>
  S.Struct({
    mesh: MeshData.pipe(T.HttpPayload()).annotate({ identifier: "MeshData" }),
  }),
).annotate({
  identifier: "DeleteMeshOutput",
}) as any as S.Schema<DeleteMeshOutput>;
export interface ListMeshesInput {
  nextToken?: string;
  limit?: number;
}
export const ListMeshesInput = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v20190125/meshes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMeshesInput",
}) as any as S.Schema<ListMeshesInput>;
export interface MeshRef {
  meshName: string;
  meshOwner: string;
  resourceOwner: string;
  arn: string;
  version: number;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export const MeshRef = S.suspend(() =>
  S.Struct({
    meshName: S.String,
    meshOwner: S.String,
    resourceOwner: S.String,
    arn: S.String,
    version: S.Number,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "MeshRef" }) as any as S.Schema<MeshRef>;
export type MeshList = MeshRef[];
export const MeshList = S.Array(MeshRef);
export interface ListMeshesOutput {
  meshes: MeshRef[];
  nextToken?: string;
}
export const ListMeshesOutput = S.suspend(() =>
  S.Struct({ meshes: MeshList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListMeshesOutput",
}) as any as S.Schema<ListMeshesOutput>;
export type PortSet = number[];
export const PortSet = S.Array(S.Number);
export interface VirtualGatewayListenerTlsFileCertificate {
  certificateChain: string;
  privateKey: string;
}
export const VirtualGatewayListenerTlsFileCertificate = S.suspend(() =>
  S.Struct({ certificateChain: S.String, privateKey: S.String }),
).annotate({
  identifier: "VirtualGatewayListenerTlsFileCertificate",
}) as any as S.Schema<VirtualGatewayListenerTlsFileCertificate>;
export interface VirtualGatewayListenerTlsSdsCertificate {
  secretName: string;
}
export const VirtualGatewayListenerTlsSdsCertificate = S.suspend(() =>
  S.Struct({ secretName: S.String }),
).annotate({
  identifier: "VirtualGatewayListenerTlsSdsCertificate",
}) as any as S.Schema<VirtualGatewayListenerTlsSdsCertificate>;
export type VirtualGatewayClientTlsCertificate =
  | { file: VirtualGatewayListenerTlsFileCertificate; sds?: never }
  | { file?: never; sds: VirtualGatewayListenerTlsSdsCertificate };
export const VirtualGatewayClientTlsCertificate = S.Union([
  S.Struct({ file: VirtualGatewayListenerTlsFileCertificate }),
  S.Struct({ sds: VirtualGatewayListenerTlsSdsCertificate }),
]);
export type VirtualGatewayCertificateAuthorityArns = string[];
export const VirtualGatewayCertificateAuthorityArns = S.Array(S.String);
export interface VirtualGatewayTlsValidationContextAcmTrust {
  certificateAuthorityArns: string[];
}
export const VirtualGatewayTlsValidationContextAcmTrust = S.suspend(() =>
  S.Struct({
    certificateAuthorityArns: VirtualGatewayCertificateAuthorityArns,
  }),
).annotate({
  identifier: "VirtualGatewayTlsValidationContextAcmTrust",
}) as any as S.Schema<VirtualGatewayTlsValidationContextAcmTrust>;
export interface VirtualGatewayTlsValidationContextFileTrust {
  certificateChain: string;
}
export const VirtualGatewayTlsValidationContextFileTrust = S.suspend(() =>
  S.Struct({ certificateChain: S.String }),
).annotate({
  identifier: "VirtualGatewayTlsValidationContextFileTrust",
}) as any as S.Schema<VirtualGatewayTlsValidationContextFileTrust>;
export interface VirtualGatewayTlsValidationContextSdsTrust {
  secretName: string;
}
export const VirtualGatewayTlsValidationContextSdsTrust = S.suspend(() =>
  S.Struct({ secretName: S.String }),
).annotate({
  identifier: "VirtualGatewayTlsValidationContextSdsTrust",
}) as any as S.Schema<VirtualGatewayTlsValidationContextSdsTrust>;
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
export const VirtualGatewayTlsValidationContextTrust = S.Union([
  S.Struct({ acm: VirtualGatewayTlsValidationContextAcmTrust }),
  S.Struct({ file: VirtualGatewayTlsValidationContextFileTrust }),
  S.Struct({ sds: VirtualGatewayTlsValidationContextSdsTrust }),
]);
export type SubjectAlternativeNameList = string[];
export const SubjectAlternativeNameList = S.Array(S.String);
export interface SubjectAlternativeNameMatchers {
  exact: string[];
}
export const SubjectAlternativeNameMatchers = S.suspend(() =>
  S.Struct({ exact: SubjectAlternativeNameList }),
).annotate({
  identifier: "SubjectAlternativeNameMatchers",
}) as any as S.Schema<SubjectAlternativeNameMatchers>;
export interface SubjectAlternativeNames {
  match: SubjectAlternativeNameMatchers;
}
export const SubjectAlternativeNames = S.suspend(() =>
  S.Struct({ match: SubjectAlternativeNameMatchers }),
).annotate({
  identifier: "SubjectAlternativeNames",
}) as any as S.Schema<SubjectAlternativeNames>;
export interface VirtualGatewayTlsValidationContext {
  trust: VirtualGatewayTlsValidationContextTrust;
  subjectAlternativeNames?: SubjectAlternativeNames;
}
export const VirtualGatewayTlsValidationContext = S.suspend(() =>
  S.Struct({
    trust: VirtualGatewayTlsValidationContextTrust,
    subjectAlternativeNames: S.optional(SubjectAlternativeNames),
  }),
).annotate({
  identifier: "VirtualGatewayTlsValidationContext",
}) as any as S.Schema<VirtualGatewayTlsValidationContext>;
export interface VirtualGatewayClientPolicyTls {
  enforce?: boolean;
  ports?: number[];
  certificate?: VirtualGatewayClientTlsCertificate;
  validation: VirtualGatewayTlsValidationContext;
}
export const VirtualGatewayClientPolicyTls = S.suspend(() =>
  S.Struct({
    enforce: S.optional(S.Boolean),
    ports: S.optional(PortSet),
    certificate: S.optional(VirtualGatewayClientTlsCertificate),
    validation: VirtualGatewayTlsValidationContext,
  }),
).annotate({
  identifier: "VirtualGatewayClientPolicyTls",
}) as any as S.Schema<VirtualGatewayClientPolicyTls>;
export interface VirtualGatewayClientPolicy {
  tls?: VirtualGatewayClientPolicyTls;
}
export const VirtualGatewayClientPolicy = S.suspend(() =>
  S.Struct({ tls: S.optional(VirtualGatewayClientPolicyTls) }),
).annotate({
  identifier: "VirtualGatewayClientPolicy",
}) as any as S.Schema<VirtualGatewayClientPolicy>;
export interface VirtualGatewayBackendDefaults {
  clientPolicy?: VirtualGatewayClientPolicy;
}
export const VirtualGatewayBackendDefaults = S.suspend(() =>
  S.Struct({ clientPolicy: S.optional(VirtualGatewayClientPolicy) }),
).annotate({
  identifier: "VirtualGatewayBackendDefaults",
}) as any as S.Schema<VirtualGatewayBackendDefaults>;
export interface VirtualGatewayHealthCheckPolicy {
  timeoutMillis: number;
  intervalMillis: number;
  protocol: string;
  port?: number;
  path?: string;
  healthyThreshold: number;
  unhealthyThreshold: number;
}
export const VirtualGatewayHealthCheckPolicy = S.suspend(() =>
  S.Struct({
    timeoutMillis: S.Number,
    intervalMillis: S.Number,
    protocol: S.String,
    port: S.optional(S.Number),
    path: S.optional(S.String),
    healthyThreshold: S.Number,
    unhealthyThreshold: S.Number,
  }),
).annotate({
  identifier: "VirtualGatewayHealthCheckPolicy",
}) as any as S.Schema<VirtualGatewayHealthCheckPolicy>;
export interface VirtualGatewayPortMapping {
  port: number;
  protocol: string;
}
export const VirtualGatewayPortMapping = S.suspend(() =>
  S.Struct({ port: S.Number, protocol: S.String }),
).annotate({
  identifier: "VirtualGatewayPortMapping",
}) as any as S.Schema<VirtualGatewayPortMapping>;
export type VirtualGatewayListenerTlsValidationContextTrust =
  | { file: VirtualGatewayTlsValidationContextFileTrust; sds?: never }
  | { file?: never; sds: VirtualGatewayTlsValidationContextSdsTrust };
export const VirtualGatewayListenerTlsValidationContextTrust = S.Union([
  S.Struct({ file: VirtualGatewayTlsValidationContextFileTrust }),
  S.Struct({ sds: VirtualGatewayTlsValidationContextSdsTrust }),
]);
export interface VirtualGatewayListenerTlsValidationContext {
  trust: VirtualGatewayListenerTlsValidationContextTrust;
  subjectAlternativeNames?: SubjectAlternativeNames;
}
export const VirtualGatewayListenerTlsValidationContext = S.suspend(() =>
  S.Struct({
    trust: VirtualGatewayListenerTlsValidationContextTrust,
    subjectAlternativeNames: S.optional(SubjectAlternativeNames),
  }),
).annotate({
  identifier: "VirtualGatewayListenerTlsValidationContext",
}) as any as S.Schema<VirtualGatewayListenerTlsValidationContext>;
export interface VirtualGatewayListenerTlsAcmCertificate {
  certificateArn: string;
}
export const VirtualGatewayListenerTlsAcmCertificate = S.suspend(() =>
  S.Struct({ certificateArn: S.String }),
).annotate({
  identifier: "VirtualGatewayListenerTlsAcmCertificate",
}) as any as S.Schema<VirtualGatewayListenerTlsAcmCertificate>;
export type VirtualGatewayListenerTlsCertificate =
  | { acm: VirtualGatewayListenerTlsAcmCertificate; file?: never; sds?: never }
  | { acm?: never; file: VirtualGatewayListenerTlsFileCertificate; sds?: never }
  | { acm?: never; file?: never; sds: VirtualGatewayListenerTlsSdsCertificate };
export const VirtualGatewayListenerTlsCertificate = S.Union([
  S.Struct({ acm: VirtualGatewayListenerTlsAcmCertificate }),
  S.Struct({ file: VirtualGatewayListenerTlsFileCertificate }),
  S.Struct({ sds: VirtualGatewayListenerTlsSdsCertificate }),
]);
export interface VirtualGatewayListenerTls {
  mode: string;
  validation?: VirtualGatewayListenerTlsValidationContext;
  certificate: VirtualGatewayListenerTlsCertificate;
}
export const VirtualGatewayListenerTls = S.suspend(() =>
  S.Struct({
    mode: S.String,
    validation: S.optional(VirtualGatewayListenerTlsValidationContext),
    certificate: VirtualGatewayListenerTlsCertificate,
  }),
).annotate({
  identifier: "VirtualGatewayListenerTls",
}) as any as S.Schema<VirtualGatewayListenerTls>;
export interface VirtualGatewayHttpConnectionPool {
  maxConnections: number;
  maxPendingRequests?: number;
}
export const VirtualGatewayHttpConnectionPool = S.suspend(() =>
  S.Struct({
    maxConnections: S.Number,
    maxPendingRequests: S.optional(S.Number),
  }),
).annotate({
  identifier: "VirtualGatewayHttpConnectionPool",
}) as any as S.Schema<VirtualGatewayHttpConnectionPool>;
export interface VirtualGatewayHttp2ConnectionPool {
  maxRequests: number;
}
export const VirtualGatewayHttp2ConnectionPool = S.suspend(() =>
  S.Struct({ maxRequests: S.Number }),
).annotate({
  identifier: "VirtualGatewayHttp2ConnectionPool",
}) as any as S.Schema<VirtualGatewayHttp2ConnectionPool>;
export interface VirtualGatewayGrpcConnectionPool {
  maxRequests: number;
}
export const VirtualGatewayGrpcConnectionPool = S.suspend(() =>
  S.Struct({ maxRequests: S.Number }),
).annotate({
  identifier: "VirtualGatewayGrpcConnectionPool",
}) as any as S.Schema<VirtualGatewayGrpcConnectionPool>;
export type VirtualGatewayConnectionPool =
  | { http: VirtualGatewayHttpConnectionPool; http2?: never; grpc?: never }
  | { http?: never; http2: VirtualGatewayHttp2ConnectionPool; grpc?: never }
  | { http?: never; http2?: never; grpc: VirtualGatewayGrpcConnectionPool };
export const VirtualGatewayConnectionPool = S.Union([
  S.Struct({ http: VirtualGatewayHttpConnectionPool }),
  S.Struct({ http2: VirtualGatewayHttp2ConnectionPool }),
  S.Struct({ grpc: VirtualGatewayGrpcConnectionPool }),
]);
export interface VirtualGatewayListener {
  healthCheck?: VirtualGatewayHealthCheckPolicy;
  portMapping: VirtualGatewayPortMapping;
  tls?: VirtualGatewayListenerTls;
  connectionPool?: VirtualGatewayConnectionPool;
}
export const VirtualGatewayListener = S.suspend(() =>
  S.Struct({
    healthCheck: S.optional(VirtualGatewayHealthCheckPolicy),
    portMapping: VirtualGatewayPortMapping,
    tls: S.optional(VirtualGatewayListenerTls),
    connectionPool: S.optional(VirtualGatewayConnectionPool),
  }),
).annotate({
  identifier: "VirtualGatewayListener",
}) as any as S.Schema<VirtualGatewayListener>;
export type VirtualGatewayListeners = VirtualGatewayListener[];
export const VirtualGatewayListeners = S.Array(VirtualGatewayListener);
export interface JsonFormatRef {
  key: string;
  value: string;
}
export const JsonFormatRef = S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "JsonFormatRef" }) as any as S.Schema<JsonFormatRef>;
export type JsonFormat = JsonFormatRef[];
export const JsonFormat = S.Array(JsonFormatRef);
export type LoggingFormat =
  | { text: string; json?: never }
  | { text?: never; json: JsonFormatRef[] };
export const LoggingFormat = S.Union([
  S.Struct({ text: S.String }),
  S.Struct({ json: JsonFormat }),
]);
export interface VirtualGatewayFileAccessLog {
  path: string;
  format?: LoggingFormat;
}
export const VirtualGatewayFileAccessLog = S.suspend(() =>
  S.Struct({ path: S.String, format: S.optional(LoggingFormat) }),
).annotate({
  identifier: "VirtualGatewayFileAccessLog",
}) as any as S.Schema<VirtualGatewayFileAccessLog>;
export type VirtualGatewayAccessLog = { file: VirtualGatewayFileAccessLog };
export const VirtualGatewayAccessLog = S.Union([
  S.Struct({ file: VirtualGatewayFileAccessLog }),
]);
export interface VirtualGatewayLogging {
  accessLog?: VirtualGatewayAccessLog;
}
export const VirtualGatewayLogging = S.suspend(() =>
  S.Struct({ accessLog: S.optional(VirtualGatewayAccessLog) }),
).annotate({
  identifier: "VirtualGatewayLogging",
}) as any as S.Schema<VirtualGatewayLogging>;
export interface VirtualGatewaySpec {
  backendDefaults?: VirtualGatewayBackendDefaults;
  listeners: VirtualGatewayListener[];
  logging?: VirtualGatewayLogging;
}
export const VirtualGatewaySpec = S.suspend(() =>
  S.Struct({
    backendDefaults: S.optional(VirtualGatewayBackendDefaults),
    listeners: VirtualGatewayListeners,
    logging: S.optional(VirtualGatewayLogging),
  }),
).annotate({
  identifier: "VirtualGatewaySpec",
}) as any as S.Schema<VirtualGatewaySpec>;
export interface CreateVirtualGatewayInput {
  virtualGatewayName: string;
  meshName: string;
  spec: VirtualGatewaySpec;
  tags?: TagRef[];
  clientToken?: string;
  meshOwner?: string;
}
export const CreateVirtualGatewayInput = S.suspend(() =>
  S.Struct({
    virtualGatewayName: S.String,
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    spec: VirtualGatewaySpec,
    tags: S.optional(TagList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v20190125/meshes/{meshName}/virtualGateways",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVirtualGatewayInput",
}) as any as S.Schema<CreateVirtualGatewayInput>;
export interface VirtualGatewayStatus {
  status: string;
}
export const VirtualGatewayStatus = S.suspend(() =>
  S.Struct({ status: S.String }),
).annotate({
  identifier: "VirtualGatewayStatus",
}) as any as S.Schema<VirtualGatewayStatus>;
export interface VirtualGatewayData {
  meshName: string;
  virtualGatewayName: string;
  spec: VirtualGatewaySpec;
  metadata: ResourceMetadata;
  status: VirtualGatewayStatus;
}
export const VirtualGatewayData = S.suspend(() =>
  S.Struct({
    meshName: S.String,
    virtualGatewayName: S.String,
    spec: VirtualGatewaySpec,
    metadata: ResourceMetadata,
    status: VirtualGatewayStatus,
  }),
).annotate({
  identifier: "VirtualGatewayData",
}) as any as S.Schema<VirtualGatewayData>;
export interface CreateVirtualGatewayOutput {
  virtualGateway: VirtualGatewayData;
}
export const CreateVirtualGatewayOutput = S.suspend(() =>
  S.Struct({
    virtualGateway: VirtualGatewayData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualGatewayData",
    }),
  }),
).annotate({
  identifier: "CreateVirtualGatewayOutput",
}) as any as S.Schema<CreateVirtualGatewayOutput>;
export interface DescribeVirtualGatewayInput {
  virtualGatewayName: string;
  meshName: string;
  meshOwner?: string;
}
export const DescribeVirtualGatewayInput = S.suspend(() =>
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
).annotate({
  identifier: "DescribeVirtualGatewayInput",
}) as any as S.Schema<DescribeVirtualGatewayInput>;
export interface DescribeVirtualGatewayOutput {
  virtualGateway: VirtualGatewayData;
}
export const DescribeVirtualGatewayOutput = S.suspend(() =>
  S.Struct({
    virtualGateway: VirtualGatewayData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualGatewayData",
    }),
  }),
).annotate({
  identifier: "DescribeVirtualGatewayOutput",
}) as any as S.Schema<DescribeVirtualGatewayOutput>;
export interface UpdateVirtualGatewayInput {
  virtualGatewayName: string;
  meshName: string;
  spec: VirtualGatewaySpec;
  clientToken?: string;
  meshOwner?: string;
}
export const UpdateVirtualGatewayInput = S.suspend(() =>
  S.Struct({
    virtualGatewayName: S.String.pipe(T.HttpLabel("virtualGatewayName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    spec: VirtualGatewaySpec,
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
).annotate({
  identifier: "UpdateVirtualGatewayInput",
}) as any as S.Schema<UpdateVirtualGatewayInput>;
export interface UpdateVirtualGatewayOutput {
  virtualGateway: VirtualGatewayData;
}
export const UpdateVirtualGatewayOutput = S.suspend(() =>
  S.Struct({
    virtualGateway: VirtualGatewayData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualGatewayData",
    }),
  }),
).annotate({
  identifier: "UpdateVirtualGatewayOutput",
}) as any as S.Schema<UpdateVirtualGatewayOutput>;
export interface DeleteVirtualGatewayInput {
  virtualGatewayName: string;
  meshName: string;
  meshOwner?: string;
}
export const DeleteVirtualGatewayInput = S.suspend(() =>
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
).annotate({
  identifier: "DeleteVirtualGatewayInput",
}) as any as S.Schema<DeleteVirtualGatewayInput>;
export interface DeleteVirtualGatewayOutput {
  virtualGateway: VirtualGatewayData;
}
export const DeleteVirtualGatewayOutput = S.suspend(() =>
  S.Struct({
    virtualGateway: VirtualGatewayData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualGatewayData",
    }),
  }),
).annotate({
  identifier: "DeleteVirtualGatewayOutput",
}) as any as S.Schema<DeleteVirtualGatewayOutput>;
export interface ListVirtualGatewaysInput {
  meshName: string;
  nextToken?: string;
  limit?: number;
  meshOwner?: string;
}
export const ListVirtualGatewaysInput = S.suspend(() =>
  S.Struct({
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v20190125/meshes/{meshName}/virtualGateways",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVirtualGatewaysInput",
}) as any as S.Schema<ListVirtualGatewaysInput>;
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
export const VirtualGatewayRef = S.suspend(() =>
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
).annotate({
  identifier: "VirtualGatewayRef",
}) as any as S.Schema<VirtualGatewayRef>;
export type VirtualGatewayList = VirtualGatewayRef[];
export const VirtualGatewayList = S.Array(VirtualGatewayRef);
export interface ListVirtualGatewaysOutput {
  virtualGateways: VirtualGatewayRef[];
  nextToken?: string;
}
export const ListVirtualGatewaysOutput = S.suspend(() =>
  S.Struct({
    virtualGateways: VirtualGatewayList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListVirtualGatewaysOutput",
}) as any as S.Schema<ListVirtualGatewaysOutput>;
export interface HttpPathMatch {
  exact?: string;
  regex?: string;
}
export const HttpPathMatch = S.suspend(() =>
  S.Struct({ exact: S.optional(S.String), regex: S.optional(S.String) }),
).annotate({ identifier: "HttpPathMatch" }) as any as S.Schema<HttpPathMatch>;
export interface QueryParameterMatch {
  exact?: string;
}
export const QueryParameterMatch = S.suspend(() =>
  S.Struct({ exact: S.optional(S.String) }),
).annotate({
  identifier: "QueryParameterMatch",
}) as any as S.Schema<QueryParameterMatch>;
export interface HttpQueryParameter {
  name: string;
  match?: QueryParameterMatch;
}
export const HttpQueryParameter = S.suspend(() =>
  S.Struct({ name: S.String, match: S.optional(QueryParameterMatch) }),
).annotate({
  identifier: "HttpQueryParameter",
}) as any as S.Schema<HttpQueryParameter>;
export type HttpQueryParameters = HttpQueryParameter[];
export const HttpQueryParameters = S.Array(HttpQueryParameter);
export interface GatewayRouteHostnameMatch {
  exact?: string;
  suffix?: string;
}
export const GatewayRouteHostnameMatch = S.suspend(() =>
  S.Struct({ exact: S.optional(S.String), suffix: S.optional(S.String) }),
).annotate({
  identifier: "GatewayRouteHostnameMatch",
}) as any as S.Schema<GatewayRouteHostnameMatch>;
export interface MatchRange {
  start: number;
  end: number;
}
export const MatchRange = S.suspend(() =>
  S.Struct({ start: S.Number, end: S.Number }),
).annotate({ identifier: "MatchRange" }) as any as S.Schema<MatchRange>;
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
export const HeaderMatchMethod = S.Union([
  S.Struct({ exact: S.String }),
  S.Struct({ regex: S.String }),
  S.Struct({ range: MatchRange }),
  S.Struct({ prefix: S.String }),
  S.Struct({ suffix: S.String }),
]);
export interface HttpGatewayRouteHeader {
  name: string;
  invert?: boolean;
  match?: HeaderMatchMethod;
}
export const HttpGatewayRouteHeader = S.suspend(() =>
  S.Struct({
    name: S.String,
    invert: S.optional(S.Boolean),
    match: S.optional(HeaderMatchMethod),
  }),
).annotate({
  identifier: "HttpGatewayRouteHeader",
}) as any as S.Schema<HttpGatewayRouteHeader>;
export type HttpGatewayRouteHeaders = HttpGatewayRouteHeader[];
export const HttpGatewayRouteHeaders = S.Array(HttpGatewayRouteHeader);
export interface HttpGatewayRouteMatch {
  prefix?: string;
  path?: HttpPathMatch;
  queryParameters?: HttpQueryParameter[];
  method?: string;
  hostname?: GatewayRouteHostnameMatch;
  headers?: HttpGatewayRouteHeader[];
  port?: number;
}
export const HttpGatewayRouteMatch = S.suspend(() =>
  S.Struct({
    prefix: S.optional(S.String),
    path: S.optional(HttpPathMatch),
    queryParameters: S.optional(HttpQueryParameters),
    method: S.optional(S.String),
    hostname: S.optional(GatewayRouteHostnameMatch),
    headers: S.optional(HttpGatewayRouteHeaders),
    port: S.optional(S.Number),
  }),
).annotate({
  identifier: "HttpGatewayRouteMatch",
}) as any as S.Schema<HttpGatewayRouteMatch>;
export interface GatewayRouteVirtualService {
  virtualServiceName: string;
}
export const GatewayRouteVirtualService = S.suspend(() =>
  S.Struct({ virtualServiceName: S.String }),
).annotate({
  identifier: "GatewayRouteVirtualService",
}) as any as S.Schema<GatewayRouteVirtualService>;
export interface GatewayRouteTarget {
  virtualService: GatewayRouteVirtualService;
  port?: number;
}
export const GatewayRouteTarget = S.suspend(() =>
  S.Struct({
    virtualService: GatewayRouteVirtualService,
    port: S.optional(S.Number),
  }),
).annotate({
  identifier: "GatewayRouteTarget",
}) as any as S.Schema<GatewayRouteTarget>;
export interface HttpGatewayRoutePrefixRewrite {
  defaultPrefix?: string;
  value?: string;
}
export const HttpGatewayRoutePrefixRewrite = S.suspend(() =>
  S.Struct({
    defaultPrefix: S.optional(S.String),
    value: S.optional(S.String),
  }),
).annotate({
  identifier: "HttpGatewayRoutePrefixRewrite",
}) as any as S.Schema<HttpGatewayRoutePrefixRewrite>;
export interface HttpGatewayRoutePathRewrite {
  exact?: string;
}
export const HttpGatewayRoutePathRewrite = S.suspend(() =>
  S.Struct({ exact: S.optional(S.String) }),
).annotate({
  identifier: "HttpGatewayRoutePathRewrite",
}) as any as S.Schema<HttpGatewayRoutePathRewrite>;
export interface GatewayRouteHostnameRewrite {
  defaultTargetHostname?: string;
}
export const GatewayRouteHostnameRewrite = S.suspend(() =>
  S.Struct({ defaultTargetHostname: S.optional(S.String) }),
).annotate({
  identifier: "GatewayRouteHostnameRewrite",
}) as any as S.Schema<GatewayRouteHostnameRewrite>;
export interface HttpGatewayRouteRewrite {
  prefix?: HttpGatewayRoutePrefixRewrite;
  path?: HttpGatewayRoutePathRewrite;
  hostname?: GatewayRouteHostnameRewrite;
}
export const HttpGatewayRouteRewrite = S.suspend(() =>
  S.Struct({
    prefix: S.optional(HttpGatewayRoutePrefixRewrite),
    path: S.optional(HttpGatewayRoutePathRewrite),
    hostname: S.optional(GatewayRouteHostnameRewrite),
  }),
).annotate({
  identifier: "HttpGatewayRouteRewrite",
}) as any as S.Schema<HttpGatewayRouteRewrite>;
export interface HttpGatewayRouteAction {
  target: GatewayRouteTarget;
  rewrite?: HttpGatewayRouteRewrite;
}
export const HttpGatewayRouteAction = S.suspend(() =>
  S.Struct({
    target: GatewayRouteTarget,
    rewrite: S.optional(HttpGatewayRouteRewrite),
  }),
).annotate({
  identifier: "HttpGatewayRouteAction",
}) as any as S.Schema<HttpGatewayRouteAction>;
export interface HttpGatewayRoute {
  match: HttpGatewayRouteMatch;
  action: HttpGatewayRouteAction;
}
export const HttpGatewayRoute = S.suspend(() =>
  S.Struct({ match: HttpGatewayRouteMatch, action: HttpGatewayRouteAction }),
).annotate({
  identifier: "HttpGatewayRoute",
}) as any as S.Schema<HttpGatewayRoute>;
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
export const GrpcMetadataMatchMethod = S.Union([
  S.Struct({ exact: S.String }),
  S.Struct({ regex: S.String }),
  S.Struct({ range: MatchRange }),
  S.Struct({ prefix: S.String }),
  S.Struct({ suffix: S.String }),
]);
export interface GrpcGatewayRouteMetadata {
  name: string;
  invert?: boolean;
  match?: GrpcMetadataMatchMethod;
}
export const GrpcGatewayRouteMetadata = S.suspend(() =>
  S.Struct({
    name: S.String,
    invert: S.optional(S.Boolean),
    match: S.optional(GrpcMetadataMatchMethod),
  }),
).annotate({
  identifier: "GrpcGatewayRouteMetadata",
}) as any as S.Schema<GrpcGatewayRouteMetadata>;
export type GrpcGatewayRouteMetadataList = GrpcGatewayRouteMetadata[];
export const GrpcGatewayRouteMetadataList = S.Array(GrpcGatewayRouteMetadata);
export interface GrpcGatewayRouteMatch {
  serviceName?: string;
  hostname?: GatewayRouteHostnameMatch;
  metadata?: GrpcGatewayRouteMetadata[];
  port?: number;
}
export const GrpcGatewayRouteMatch = S.suspend(() =>
  S.Struct({
    serviceName: S.optional(S.String),
    hostname: S.optional(GatewayRouteHostnameMatch),
    metadata: S.optional(GrpcGatewayRouteMetadataList),
    port: S.optional(S.Number),
  }),
).annotate({
  identifier: "GrpcGatewayRouteMatch",
}) as any as S.Schema<GrpcGatewayRouteMatch>;
export interface GrpcGatewayRouteRewrite {
  hostname?: GatewayRouteHostnameRewrite;
}
export const GrpcGatewayRouteRewrite = S.suspend(() =>
  S.Struct({ hostname: S.optional(GatewayRouteHostnameRewrite) }),
).annotate({
  identifier: "GrpcGatewayRouteRewrite",
}) as any as S.Schema<GrpcGatewayRouteRewrite>;
export interface GrpcGatewayRouteAction {
  target: GatewayRouteTarget;
  rewrite?: GrpcGatewayRouteRewrite;
}
export const GrpcGatewayRouteAction = S.suspend(() =>
  S.Struct({
    target: GatewayRouteTarget,
    rewrite: S.optional(GrpcGatewayRouteRewrite),
  }),
).annotate({
  identifier: "GrpcGatewayRouteAction",
}) as any as S.Schema<GrpcGatewayRouteAction>;
export interface GrpcGatewayRoute {
  match: GrpcGatewayRouteMatch;
  action: GrpcGatewayRouteAction;
}
export const GrpcGatewayRoute = S.suspend(() =>
  S.Struct({ match: GrpcGatewayRouteMatch, action: GrpcGatewayRouteAction }),
).annotate({
  identifier: "GrpcGatewayRoute",
}) as any as S.Schema<GrpcGatewayRoute>;
export interface GatewayRouteSpec {
  priority?: number;
  httpRoute?: HttpGatewayRoute;
  http2Route?: HttpGatewayRoute;
  grpcRoute?: GrpcGatewayRoute;
}
export const GatewayRouteSpec = S.suspend(() =>
  S.Struct({
    priority: S.optional(S.Number),
    httpRoute: S.optional(HttpGatewayRoute),
    http2Route: S.optional(HttpGatewayRoute),
    grpcRoute: S.optional(GrpcGatewayRoute),
  }),
).annotate({
  identifier: "GatewayRouteSpec",
}) as any as S.Schema<GatewayRouteSpec>;
export interface CreateGatewayRouteInput {
  gatewayRouteName: string;
  meshName: string;
  virtualGatewayName: string;
  spec: GatewayRouteSpec;
  tags?: TagRef[];
  clientToken?: string;
  meshOwner?: string;
}
export const CreateGatewayRouteInput = S.suspend(() =>
  S.Struct({
    gatewayRouteName: S.String,
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    virtualGatewayName: S.String.pipe(T.HttpLabel("virtualGatewayName")),
    spec: GatewayRouteSpec,
    tags: S.optional(TagList),
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
).annotate({
  identifier: "CreateGatewayRouteInput",
}) as any as S.Schema<CreateGatewayRouteInput>;
export interface GatewayRouteStatus {
  status: string;
}
export const GatewayRouteStatus = S.suspend(() =>
  S.Struct({ status: S.String }),
).annotate({
  identifier: "GatewayRouteStatus",
}) as any as S.Schema<GatewayRouteStatus>;
export interface GatewayRouteData {
  meshName: string;
  gatewayRouteName: string;
  virtualGatewayName: string;
  spec: GatewayRouteSpec;
  metadata: ResourceMetadata;
  status: GatewayRouteStatus;
}
export const GatewayRouteData = S.suspend(() =>
  S.Struct({
    meshName: S.String,
    gatewayRouteName: S.String,
    virtualGatewayName: S.String,
    spec: GatewayRouteSpec,
    metadata: ResourceMetadata,
    status: GatewayRouteStatus,
  }),
).annotate({
  identifier: "GatewayRouteData",
}) as any as S.Schema<GatewayRouteData>;
export interface CreateGatewayRouteOutput {
  gatewayRoute: GatewayRouteData;
}
export const CreateGatewayRouteOutput = S.suspend(() =>
  S.Struct({
    gatewayRoute: GatewayRouteData.pipe(T.HttpPayload()).annotate({
      identifier: "GatewayRouteData",
    }),
  }),
).annotate({
  identifier: "CreateGatewayRouteOutput",
}) as any as S.Schema<CreateGatewayRouteOutput>;
export interface DescribeGatewayRouteInput {
  gatewayRouteName: string;
  meshName: string;
  virtualGatewayName: string;
  meshOwner?: string;
}
export const DescribeGatewayRouteInput = S.suspend(() =>
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
).annotate({
  identifier: "DescribeGatewayRouteInput",
}) as any as S.Schema<DescribeGatewayRouteInput>;
export interface DescribeGatewayRouteOutput {
  gatewayRoute: GatewayRouteData;
}
export const DescribeGatewayRouteOutput = S.suspend(() =>
  S.Struct({
    gatewayRoute: GatewayRouteData.pipe(T.HttpPayload()).annotate({
      identifier: "GatewayRouteData",
    }),
  }),
).annotate({
  identifier: "DescribeGatewayRouteOutput",
}) as any as S.Schema<DescribeGatewayRouteOutput>;
export interface UpdateGatewayRouteInput {
  gatewayRouteName: string;
  meshName: string;
  virtualGatewayName: string;
  spec: GatewayRouteSpec;
  clientToken?: string;
  meshOwner?: string;
}
export const UpdateGatewayRouteInput = S.suspend(() =>
  S.Struct({
    gatewayRouteName: S.String.pipe(T.HttpLabel("gatewayRouteName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    virtualGatewayName: S.String.pipe(T.HttpLabel("virtualGatewayName")),
    spec: GatewayRouteSpec,
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
).annotate({
  identifier: "UpdateGatewayRouteInput",
}) as any as S.Schema<UpdateGatewayRouteInput>;
export interface UpdateGatewayRouteOutput {
  gatewayRoute: GatewayRouteData;
}
export const UpdateGatewayRouteOutput = S.suspend(() =>
  S.Struct({
    gatewayRoute: GatewayRouteData.pipe(T.HttpPayload()).annotate({
      identifier: "GatewayRouteData",
    }),
  }),
).annotate({
  identifier: "UpdateGatewayRouteOutput",
}) as any as S.Schema<UpdateGatewayRouteOutput>;
export interface DeleteGatewayRouteInput {
  gatewayRouteName: string;
  meshName: string;
  virtualGatewayName: string;
  meshOwner?: string;
}
export const DeleteGatewayRouteInput = S.suspend(() =>
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
).annotate({
  identifier: "DeleteGatewayRouteInput",
}) as any as S.Schema<DeleteGatewayRouteInput>;
export interface DeleteGatewayRouteOutput {
  gatewayRoute: GatewayRouteData;
}
export const DeleteGatewayRouteOutput = S.suspend(() =>
  S.Struct({
    gatewayRoute: GatewayRouteData.pipe(T.HttpPayload()).annotate({
      identifier: "GatewayRouteData",
    }),
  }),
).annotate({
  identifier: "DeleteGatewayRouteOutput",
}) as any as S.Schema<DeleteGatewayRouteOutput>;
export interface ListGatewayRoutesInput {
  meshName: string;
  virtualGatewayName: string;
  nextToken?: string;
  limit?: number;
  meshOwner?: string;
}
export const ListGatewayRoutesInput = S.suspend(() =>
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
).annotate({
  identifier: "ListGatewayRoutesInput",
}) as any as S.Schema<ListGatewayRoutesInput>;
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
export const GatewayRouteRef = S.suspend(() =>
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
).annotate({
  identifier: "GatewayRouteRef",
}) as any as S.Schema<GatewayRouteRef>;
export type GatewayRouteList = GatewayRouteRef[];
export const GatewayRouteList = S.Array(GatewayRouteRef);
export interface ListGatewayRoutesOutput {
  gatewayRoutes: GatewayRouteRef[];
  nextToken?: string;
}
export const ListGatewayRoutesOutput = S.suspend(() =>
  S.Struct({
    gatewayRoutes: GatewayRouteList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListGatewayRoutesOutput",
}) as any as S.Schema<ListGatewayRoutesOutput>;
export interface DnsServiceDiscovery {
  hostname: string;
  responseType?: string;
  ipPreference?: string;
}
export const DnsServiceDiscovery = S.suspend(() =>
  S.Struct({
    hostname: S.String,
    responseType: S.optional(S.String),
    ipPreference: S.optional(S.String),
  }),
).annotate({
  identifier: "DnsServiceDiscovery",
}) as any as S.Schema<DnsServiceDiscovery>;
export interface AwsCloudMapInstanceAttribute {
  key: string;
  value: string;
}
export const AwsCloudMapInstanceAttribute = S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({
  identifier: "AwsCloudMapInstanceAttribute",
}) as any as S.Schema<AwsCloudMapInstanceAttribute>;
export type AwsCloudMapInstanceAttributes = AwsCloudMapInstanceAttribute[];
export const AwsCloudMapInstanceAttributes = S.Array(
  AwsCloudMapInstanceAttribute,
);
export interface AwsCloudMapServiceDiscovery {
  namespaceName: string;
  serviceName: string;
  attributes?: AwsCloudMapInstanceAttribute[];
  ipPreference?: string;
}
export const AwsCloudMapServiceDiscovery = S.suspend(() =>
  S.Struct({
    namespaceName: S.String,
    serviceName: S.String,
    attributes: S.optional(AwsCloudMapInstanceAttributes),
    ipPreference: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsCloudMapServiceDiscovery",
}) as any as S.Schema<AwsCloudMapServiceDiscovery>;
export type ServiceDiscovery =
  | { dns: DnsServiceDiscovery; awsCloudMap?: never }
  | { dns?: never; awsCloudMap: AwsCloudMapServiceDiscovery };
export const ServiceDiscovery = S.Union([
  S.Struct({ dns: DnsServiceDiscovery }),
  S.Struct({ awsCloudMap: AwsCloudMapServiceDiscovery }),
]);
export interface PortMapping {
  port: number;
  protocol: string;
}
export const PortMapping = S.suspend(() =>
  S.Struct({ port: S.Number, protocol: S.String }),
).annotate({ identifier: "PortMapping" }) as any as S.Schema<PortMapping>;
export interface ListenerTlsAcmCertificate {
  certificateArn: string;
}
export const ListenerTlsAcmCertificate = S.suspend(() =>
  S.Struct({ certificateArn: S.String }),
).annotate({
  identifier: "ListenerTlsAcmCertificate",
}) as any as S.Schema<ListenerTlsAcmCertificate>;
export interface ListenerTlsFileCertificate {
  certificateChain: string;
  privateKey: string;
}
export const ListenerTlsFileCertificate = S.suspend(() =>
  S.Struct({ certificateChain: S.String, privateKey: S.String }),
).annotate({
  identifier: "ListenerTlsFileCertificate",
}) as any as S.Schema<ListenerTlsFileCertificate>;
export interface ListenerTlsSdsCertificate {
  secretName: string;
}
export const ListenerTlsSdsCertificate = S.suspend(() =>
  S.Struct({ secretName: S.String }),
).annotate({
  identifier: "ListenerTlsSdsCertificate",
}) as any as S.Schema<ListenerTlsSdsCertificate>;
export type ListenerTlsCertificate =
  | { acm: ListenerTlsAcmCertificate; file?: never; sds?: never }
  | { acm?: never; file: ListenerTlsFileCertificate; sds?: never }
  | { acm?: never; file?: never; sds: ListenerTlsSdsCertificate };
export const ListenerTlsCertificate = S.Union([
  S.Struct({ acm: ListenerTlsAcmCertificate }),
  S.Struct({ file: ListenerTlsFileCertificate }),
  S.Struct({ sds: ListenerTlsSdsCertificate }),
]);
export interface TlsValidationContextFileTrust {
  certificateChain: string;
}
export const TlsValidationContextFileTrust = S.suspend(() =>
  S.Struct({ certificateChain: S.String }),
).annotate({
  identifier: "TlsValidationContextFileTrust",
}) as any as S.Schema<TlsValidationContextFileTrust>;
export interface TlsValidationContextSdsTrust {
  secretName: string;
}
export const TlsValidationContextSdsTrust = S.suspend(() =>
  S.Struct({ secretName: S.String }),
).annotate({
  identifier: "TlsValidationContextSdsTrust",
}) as any as S.Schema<TlsValidationContextSdsTrust>;
export type ListenerTlsValidationContextTrust =
  | { file: TlsValidationContextFileTrust; sds?: never }
  | { file?: never; sds: TlsValidationContextSdsTrust };
export const ListenerTlsValidationContextTrust = S.Union([
  S.Struct({ file: TlsValidationContextFileTrust }),
  S.Struct({ sds: TlsValidationContextSdsTrust }),
]);
export interface ListenerTlsValidationContext {
  trust: ListenerTlsValidationContextTrust;
  subjectAlternativeNames?: SubjectAlternativeNames;
}
export const ListenerTlsValidationContext = S.suspend(() =>
  S.Struct({
    trust: ListenerTlsValidationContextTrust,
    subjectAlternativeNames: S.optional(SubjectAlternativeNames),
  }),
).annotate({
  identifier: "ListenerTlsValidationContext",
}) as any as S.Schema<ListenerTlsValidationContext>;
export interface ListenerTls {
  mode: string;
  certificate: ListenerTlsCertificate;
  validation?: ListenerTlsValidationContext;
}
export const ListenerTls = S.suspend(() =>
  S.Struct({
    mode: S.String,
    certificate: ListenerTlsCertificate,
    validation: S.optional(ListenerTlsValidationContext),
  }),
).annotate({ identifier: "ListenerTls" }) as any as S.Schema<ListenerTls>;
export interface HealthCheckPolicy {
  timeoutMillis: number;
  intervalMillis: number;
  protocol: string;
  port?: number;
  path?: string;
  healthyThreshold: number;
  unhealthyThreshold: number;
}
export const HealthCheckPolicy = S.suspend(() =>
  S.Struct({
    timeoutMillis: S.Number,
    intervalMillis: S.Number,
    protocol: S.String,
    port: S.optional(S.Number),
    path: S.optional(S.String),
    healthyThreshold: S.Number,
    unhealthyThreshold: S.Number,
  }),
).annotate({
  identifier: "HealthCheckPolicy",
}) as any as S.Schema<HealthCheckPolicy>;
export interface Duration {
  value?: number;
  unit?: string;
}
export const Duration = S.suspend(() =>
  S.Struct({ value: S.optional(S.Number), unit: S.optional(S.String) }),
).annotate({ identifier: "Duration" }) as any as S.Schema<Duration>;
export interface TcpTimeout {
  idle?: Duration;
}
export const TcpTimeout = S.suspend(() =>
  S.Struct({ idle: S.optional(Duration) }),
).annotate({ identifier: "TcpTimeout" }) as any as S.Schema<TcpTimeout>;
export interface HttpTimeout {
  perRequest?: Duration;
  idle?: Duration;
}
export const HttpTimeout = S.suspend(() =>
  S.Struct({ perRequest: S.optional(Duration), idle: S.optional(Duration) }),
).annotate({ identifier: "HttpTimeout" }) as any as S.Schema<HttpTimeout>;
export interface GrpcTimeout {
  perRequest?: Duration;
  idle?: Duration;
}
export const GrpcTimeout = S.suspend(() =>
  S.Struct({ perRequest: S.optional(Duration), idle: S.optional(Duration) }),
).annotate({ identifier: "GrpcTimeout" }) as any as S.Schema<GrpcTimeout>;
export type ListenerTimeout =
  | { tcp: TcpTimeout; http?: never; http2?: never; grpc?: never }
  | { tcp?: never; http: HttpTimeout; http2?: never; grpc?: never }
  | { tcp?: never; http?: never; http2: HttpTimeout; grpc?: never }
  | { tcp?: never; http?: never; http2?: never; grpc: GrpcTimeout };
export const ListenerTimeout = S.Union([
  S.Struct({ tcp: TcpTimeout }),
  S.Struct({ http: HttpTimeout }),
  S.Struct({ http2: HttpTimeout }),
  S.Struct({ grpc: GrpcTimeout }),
]);
export interface OutlierDetection {
  maxServerErrors: number;
  interval: Duration;
  baseEjectionDuration: Duration;
  maxEjectionPercent: number;
}
export const OutlierDetection = S.suspend(() =>
  S.Struct({
    maxServerErrors: S.Number,
    interval: Duration,
    baseEjectionDuration: Duration,
    maxEjectionPercent: S.Number,
  }),
).annotate({
  identifier: "OutlierDetection",
}) as any as S.Schema<OutlierDetection>;
export interface VirtualNodeTcpConnectionPool {
  maxConnections: number;
}
export const VirtualNodeTcpConnectionPool = S.suspend(() =>
  S.Struct({ maxConnections: S.Number }),
).annotate({
  identifier: "VirtualNodeTcpConnectionPool",
}) as any as S.Schema<VirtualNodeTcpConnectionPool>;
export interface VirtualNodeHttpConnectionPool {
  maxConnections: number;
  maxPendingRequests?: number;
}
export const VirtualNodeHttpConnectionPool = S.suspend(() =>
  S.Struct({
    maxConnections: S.Number,
    maxPendingRequests: S.optional(S.Number),
  }),
).annotate({
  identifier: "VirtualNodeHttpConnectionPool",
}) as any as S.Schema<VirtualNodeHttpConnectionPool>;
export interface VirtualNodeHttp2ConnectionPool {
  maxRequests: number;
}
export const VirtualNodeHttp2ConnectionPool = S.suspend(() =>
  S.Struct({ maxRequests: S.Number }),
).annotate({
  identifier: "VirtualNodeHttp2ConnectionPool",
}) as any as S.Schema<VirtualNodeHttp2ConnectionPool>;
export interface VirtualNodeGrpcConnectionPool {
  maxRequests: number;
}
export const VirtualNodeGrpcConnectionPool = S.suspend(() =>
  S.Struct({ maxRequests: S.Number }),
).annotate({
  identifier: "VirtualNodeGrpcConnectionPool",
}) as any as S.Schema<VirtualNodeGrpcConnectionPool>;
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
export const VirtualNodeConnectionPool = S.Union([
  S.Struct({ tcp: VirtualNodeTcpConnectionPool }),
  S.Struct({ http: VirtualNodeHttpConnectionPool }),
  S.Struct({ http2: VirtualNodeHttp2ConnectionPool }),
  S.Struct({ grpc: VirtualNodeGrpcConnectionPool }),
]);
export interface Listener {
  portMapping: PortMapping;
  tls?: ListenerTls;
  healthCheck?: HealthCheckPolicy;
  timeout?: ListenerTimeout;
  outlierDetection?: OutlierDetection;
  connectionPool?: VirtualNodeConnectionPool;
}
export const Listener = S.suspend(() =>
  S.Struct({
    portMapping: PortMapping,
    tls: S.optional(ListenerTls),
    healthCheck: S.optional(HealthCheckPolicy),
    timeout: S.optional(ListenerTimeout),
    outlierDetection: S.optional(OutlierDetection),
    connectionPool: S.optional(VirtualNodeConnectionPool),
  }),
).annotate({ identifier: "Listener" }) as any as S.Schema<Listener>;
export type Listeners = Listener[];
export const Listeners = S.Array(Listener);
export type ClientTlsCertificate =
  | { file: ListenerTlsFileCertificate; sds?: never }
  | { file?: never; sds: ListenerTlsSdsCertificate };
export const ClientTlsCertificate = S.Union([
  S.Struct({ file: ListenerTlsFileCertificate }),
  S.Struct({ sds: ListenerTlsSdsCertificate }),
]);
export type CertificateAuthorityArns = string[];
export const CertificateAuthorityArns = S.Array(S.String);
export interface TlsValidationContextAcmTrust {
  certificateAuthorityArns: string[];
}
export const TlsValidationContextAcmTrust = S.suspend(() =>
  S.Struct({ certificateAuthorityArns: CertificateAuthorityArns }),
).annotate({
  identifier: "TlsValidationContextAcmTrust",
}) as any as S.Schema<TlsValidationContextAcmTrust>;
export type TlsValidationContextTrust =
  | { acm: TlsValidationContextAcmTrust; file?: never; sds?: never }
  | { acm?: never; file: TlsValidationContextFileTrust; sds?: never }
  | { acm?: never; file?: never; sds: TlsValidationContextSdsTrust };
export const TlsValidationContextTrust = S.Union([
  S.Struct({ acm: TlsValidationContextAcmTrust }),
  S.Struct({ file: TlsValidationContextFileTrust }),
  S.Struct({ sds: TlsValidationContextSdsTrust }),
]);
export interface TlsValidationContext {
  trust: TlsValidationContextTrust;
  subjectAlternativeNames?: SubjectAlternativeNames;
}
export const TlsValidationContext = S.suspend(() =>
  S.Struct({
    trust: TlsValidationContextTrust,
    subjectAlternativeNames: S.optional(SubjectAlternativeNames),
  }),
).annotate({
  identifier: "TlsValidationContext",
}) as any as S.Schema<TlsValidationContext>;
export interface ClientPolicyTls {
  enforce?: boolean;
  ports?: number[];
  certificate?: ClientTlsCertificate;
  validation: TlsValidationContext;
}
export const ClientPolicyTls = S.suspend(() =>
  S.Struct({
    enforce: S.optional(S.Boolean),
    ports: S.optional(PortSet),
    certificate: S.optional(ClientTlsCertificate),
    validation: TlsValidationContext,
  }),
).annotate({
  identifier: "ClientPolicyTls",
}) as any as S.Schema<ClientPolicyTls>;
export interface ClientPolicy {
  tls?: ClientPolicyTls;
}
export const ClientPolicy = S.suspend(() =>
  S.Struct({ tls: S.optional(ClientPolicyTls) }),
).annotate({ identifier: "ClientPolicy" }) as any as S.Schema<ClientPolicy>;
export interface VirtualServiceBackend {
  virtualServiceName: string;
  clientPolicy?: ClientPolicy;
}
export const VirtualServiceBackend = S.suspend(() =>
  S.Struct({
    virtualServiceName: S.String,
    clientPolicy: S.optional(ClientPolicy),
  }),
).annotate({
  identifier: "VirtualServiceBackend",
}) as any as S.Schema<VirtualServiceBackend>;
export type Backend = { virtualService: VirtualServiceBackend };
export const Backend = S.Union([
  S.Struct({ virtualService: VirtualServiceBackend }),
]);
export type Backends = Backend[];
export const Backends = S.Array(Backend);
export interface BackendDefaults {
  clientPolicy?: ClientPolicy;
}
export const BackendDefaults = S.suspend(() =>
  S.Struct({ clientPolicy: S.optional(ClientPolicy) }),
).annotate({
  identifier: "BackendDefaults",
}) as any as S.Schema<BackendDefaults>;
export interface FileAccessLog {
  path: string;
  format?: LoggingFormat;
}
export const FileAccessLog = S.suspend(() =>
  S.Struct({ path: S.String, format: S.optional(LoggingFormat) }),
).annotate({ identifier: "FileAccessLog" }) as any as S.Schema<FileAccessLog>;
export type AccessLog = { file: FileAccessLog };
export const AccessLog = S.Union([S.Struct({ file: FileAccessLog })]);
export interface Logging {
  accessLog?: AccessLog;
}
export const Logging = S.suspend(() =>
  S.Struct({ accessLog: S.optional(AccessLog) }),
).annotate({ identifier: "Logging" }) as any as S.Schema<Logging>;
export interface VirtualNodeSpec {
  serviceDiscovery?: ServiceDiscovery;
  listeners?: Listener[];
  backends?: Backend[];
  backendDefaults?: BackendDefaults;
  logging?: Logging;
}
export const VirtualNodeSpec = S.suspend(() =>
  S.Struct({
    serviceDiscovery: S.optional(ServiceDiscovery),
    listeners: S.optional(Listeners),
    backends: S.optional(Backends),
    backendDefaults: S.optional(BackendDefaults),
    logging: S.optional(Logging),
  }),
).annotate({
  identifier: "VirtualNodeSpec",
}) as any as S.Schema<VirtualNodeSpec>;
export interface CreateVirtualNodeInput {
  virtualNodeName: string;
  meshName: string;
  spec: VirtualNodeSpec;
  tags?: TagRef[];
  clientToken?: string;
  meshOwner?: string;
}
export const CreateVirtualNodeInput = S.suspend(() =>
  S.Struct({
    virtualNodeName: S.String,
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    spec: VirtualNodeSpec,
    tags: S.optional(TagList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v20190125/meshes/{meshName}/virtualNodes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVirtualNodeInput",
}) as any as S.Schema<CreateVirtualNodeInput>;
export interface VirtualNodeStatus {
  status: string;
}
export const VirtualNodeStatus = S.suspend(() =>
  S.Struct({ status: S.String }),
).annotate({
  identifier: "VirtualNodeStatus",
}) as any as S.Schema<VirtualNodeStatus>;
export interface VirtualNodeData {
  meshName: string;
  virtualNodeName: string;
  spec: VirtualNodeSpec;
  metadata: ResourceMetadata;
  status: VirtualNodeStatus;
}
export const VirtualNodeData = S.suspend(() =>
  S.Struct({
    meshName: S.String,
    virtualNodeName: S.String,
    spec: VirtualNodeSpec,
    metadata: ResourceMetadata,
    status: VirtualNodeStatus,
  }),
).annotate({
  identifier: "VirtualNodeData",
}) as any as S.Schema<VirtualNodeData>;
export interface CreateVirtualNodeOutput {
  virtualNode: VirtualNodeData;
}
export const CreateVirtualNodeOutput = S.suspend(() =>
  S.Struct({
    virtualNode: VirtualNodeData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualNodeData",
    }),
  }),
).annotate({
  identifier: "CreateVirtualNodeOutput",
}) as any as S.Schema<CreateVirtualNodeOutput>;
export interface DescribeVirtualNodeInput {
  virtualNodeName: string;
  meshName: string;
  meshOwner?: string;
}
export const DescribeVirtualNodeInput = S.suspend(() =>
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
).annotate({
  identifier: "DescribeVirtualNodeInput",
}) as any as S.Schema<DescribeVirtualNodeInput>;
export interface DescribeVirtualNodeOutput {
  virtualNode: VirtualNodeData;
}
export const DescribeVirtualNodeOutput = S.suspend(() =>
  S.Struct({
    virtualNode: VirtualNodeData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualNodeData",
    }),
  }),
).annotate({
  identifier: "DescribeVirtualNodeOutput",
}) as any as S.Schema<DescribeVirtualNodeOutput>;
export interface UpdateVirtualNodeInput {
  virtualNodeName: string;
  meshName: string;
  spec: VirtualNodeSpec;
  clientToken?: string;
  meshOwner?: string;
}
export const UpdateVirtualNodeInput = S.suspend(() =>
  S.Struct({
    virtualNodeName: S.String.pipe(T.HttpLabel("virtualNodeName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    spec: VirtualNodeSpec,
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
).annotate({
  identifier: "UpdateVirtualNodeInput",
}) as any as S.Schema<UpdateVirtualNodeInput>;
export interface UpdateVirtualNodeOutput {
  virtualNode: VirtualNodeData;
}
export const UpdateVirtualNodeOutput = S.suspend(() =>
  S.Struct({
    virtualNode: VirtualNodeData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualNodeData",
    }),
  }),
).annotate({
  identifier: "UpdateVirtualNodeOutput",
}) as any as S.Schema<UpdateVirtualNodeOutput>;
export interface DeleteVirtualNodeInput {
  virtualNodeName: string;
  meshName: string;
  meshOwner?: string;
}
export const DeleteVirtualNodeInput = S.suspend(() =>
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
).annotate({
  identifier: "DeleteVirtualNodeInput",
}) as any as S.Schema<DeleteVirtualNodeInput>;
export interface DeleteVirtualNodeOutput {
  virtualNode: VirtualNodeData;
}
export const DeleteVirtualNodeOutput = S.suspend(() =>
  S.Struct({
    virtualNode: VirtualNodeData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualNodeData",
    }),
  }),
).annotate({
  identifier: "DeleteVirtualNodeOutput",
}) as any as S.Schema<DeleteVirtualNodeOutput>;
export interface ListVirtualNodesInput {
  meshName: string;
  nextToken?: string;
  limit?: number;
  meshOwner?: string;
}
export const ListVirtualNodesInput = S.suspend(() =>
  S.Struct({
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v20190125/meshes/{meshName}/virtualNodes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVirtualNodesInput",
}) as any as S.Schema<ListVirtualNodesInput>;
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
export const VirtualNodeRef = S.suspend(() =>
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
).annotate({ identifier: "VirtualNodeRef" }) as any as S.Schema<VirtualNodeRef>;
export type VirtualNodeList = VirtualNodeRef[];
export const VirtualNodeList = S.Array(VirtualNodeRef);
export interface ListVirtualNodesOutput {
  virtualNodes: VirtualNodeRef[];
  nextToken?: string;
}
export const ListVirtualNodesOutput = S.suspend(() =>
  S.Struct({ virtualNodes: VirtualNodeList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListVirtualNodesOutput",
}) as any as S.Schema<ListVirtualNodesOutput>;
export interface VirtualRouterListener {
  portMapping: PortMapping;
}
export const VirtualRouterListener = S.suspend(() =>
  S.Struct({ portMapping: PortMapping }),
).annotate({
  identifier: "VirtualRouterListener",
}) as any as S.Schema<VirtualRouterListener>;
export type VirtualRouterListeners = VirtualRouterListener[];
export const VirtualRouterListeners = S.Array(VirtualRouterListener);
export interface VirtualRouterSpec {
  listeners?: VirtualRouterListener[];
}
export const VirtualRouterSpec = S.suspend(() =>
  S.Struct({ listeners: S.optional(VirtualRouterListeners) }),
).annotate({
  identifier: "VirtualRouterSpec",
}) as any as S.Schema<VirtualRouterSpec>;
export interface CreateVirtualRouterInput {
  virtualRouterName: string;
  meshName: string;
  spec: VirtualRouterSpec;
  tags?: TagRef[];
  clientToken?: string;
  meshOwner?: string;
}
export const CreateVirtualRouterInput = S.suspend(() =>
  S.Struct({
    virtualRouterName: S.String,
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    spec: VirtualRouterSpec,
    tags: S.optional(TagList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v20190125/meshes/{meshName}/virtualRouters",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVirtualRouterInput",
}) as any as S.Schema<CreateVirtualRouterInput>;
export interface VirtualRouterStatus {
  status: string;
}
export const VirtualRouterStatus = S.suspend(() =>
  S.Struct({ status: S.String }),
).annotate({
  identifier: "VirtualRouterStatus",
}) as any as S.Schema<VirtualRouterStatus>;
export interface VirtualRouterData {
  meshName: string;
  virtualRouterName: string;
  spec: VirtualRouterSpec;
  metadata: ResourceMetadata;
  status: VirtualRouterStatus;
}
export const VirtualRouterData = S.suspend(() =>
  S.Struct({
    meshName: S.String,
    virtualRouterName: S.String,
    spec: VirtualRouterSpec,
    metadata: ResourceMetadata,
    status: VirtualRouterStatus,
  }),
).annotate({
  identifier: "VirtualRouterData",
}) as any as S.Schema<VirtualRouterData>;
export interface CreateVirtualRouterOutput {
  virtualRouter: VirtualRouterData;
}
export const CreateVirtualRouterOutput = S.suspend(() =>
  S.Struct({
    virtualRouter: VirtualRouterData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualRouterData",
    }),
  }),
).annotate({
  identifier: "CreateVirtualRouterOutput",
}) as any as S.Schema<CreateVirtualRouterOutput>;
export interface DescribeVirtualRouterInput {
  virtualRouterName: string;
  meshName: string;
  meshOwner?: string;
}
export const DescribeVirtualRouterInput = S.suspend(() =>
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
).annotate({
  identifier: "DescribeVirtualRouterInput",
}) as any as S.Schema<DescribeVirtualRouterInput>;
export interface DescribeVirtualRouterOutput {
  virtualRouter: VirtualRouterData;
}
export const DescribeVirtualRouterOutput = S.suspend(() =>
  S.Struct({
    virtualRouter: VirtualRouterData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualRouterData",
    }),
  }),
).annotate({
  identifier: "DescribeVirtualRouterOutput",
}) as any as S.Schema<DescribeVirtualRouterOutput>;
export interface UpdateVirtualRouterInput {
  virtualRouterName: string;
  meshName: string;
  spec: VirtualRouterSpec;
  clientToken?: string;
  meshOwner?: string;
}
export const UpdateVirtualRouterInput = S.suspend(() =>
  S.Struct({
    virtualRouterName: S.String.pipe(T.HttpLabel("virtualRouterName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    spec: VirtualRouterSpec,
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
).annotate({
  identifier: "UpdateVirtualRouterInput",
}) as any as S.Schema<UpdateVirtualRouterInput>;
export interface UpdateVirtualRouterOutput {
  virtualRouter: VirtualRouterData;
}
export const UpdateVirtualRouterOutput = S.suspend(() =>
  S.Struct({
    virtualRouter: VirtualRouterData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualRouterData",
    }),
  }),
).annotate({
  identifier: "UpdateVirtualRouterOutput",
}) as any as S.Schema<UpdateVirtualRouterOutput>;
export interface DeleteVirtualRouterInput {
  virtualRouterName: string;
  meshName: string;
  meshOwner?: string;
}
export const DeleteVirtualRouterInput = S.suspend(() =>
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
).annotate({
  identifier: "DeleteVirtualRouterInput",
}) as any as S.Schema<DeleteVirtualRouterInput>;
export interface DeleteVirtualRouterOutput {
  virtualRouter: VirtualRouterData;
}
export const DeleteVirtualRouterOutput = S.suspend(() =>
  S.Struct({
    virtualRouter: VirtualRouterData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualRouterData",
    }),
  }),
).annotate({
  identifier: "DeleteVirtualRouterOutput",
}) as any as S.Schema<DeleteVirtualRouterOutput>;
export interface ListVirtualRoutersInput {
  meshName: string;
  nextToken?: string;
  limit?: number;
  meshOwner?: string;
}
export const ListVirtualRoutersInput = S.suspend(() =>
  S.Struct({
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v20190125/meshes/{meshName}/virtualRouters",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVirtualRoutersInput",
}) as any as S.Schema<ListVirtualRoutersInput>;
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
export const VirtualRouterRef = S.suspend(() =>
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
).annotate({
  identifier: "VirtualRouterRef",
}) as any as S.Schema<VirtualRouterRef>;
export type VirtualRouterList = VirtualRouterRef[];
export const VirtualRouterList = S.Array(VirtualRouterRef);
export interface ListVirtualRoutersOutput {
  virtualRouters: VirtualRouterRef[];
  nextToken?: string;
}
export const ListVirtualRoutersOutput = S.suspend(() =>
  S.Struct({
    virtualRouters: VirtualRouterList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListVirtualRoutersOutput",
}) as any as S.Schema<ListVirtualRoutersOutput>;
export interface HttpRouteHeader {
  name: string;
  invert?: boolean;
  match?: HeaderMatchMethod;
}
export const HttpRouteHeader = S.suspend(() =>
  S.Struct({
    name: S.String,
    invert: S.optional(S.Boolean),
    match: S.optional(HeaderMatchMethod),
  }),
).annotate({
  identifier: "HttpRouteHeader",
}) as any as S.Schema<HttpRouteHeader>;
export type HttpRouteHeaders = HttpRouteHeader[];
export const HttpRouteHeaders = S.Array(HttpRouteHeader);
export interface HttpRouteMatch {
  prefix?: string;
  path?: HttpPathMatch;
  queryParameters?: HttpQueryParameter[];
  method?: string;
  scheme?: string;
  headers?: HttpRouteHeader[];
  port?: number;
}
export const HttpRouteMatch = S.suspend(() =>
  S.Struct({
    prefix: S.optional(S.String),
    path: S.optional(HttpPathMatch),
    queryParameters: S.optional(HttpQueryParameters),
    method: S.optional(S.String),
    scheme: S.optional(S.String),
    headers: S.optional(HttpRouteHeaders),
    port: S.optional(S.Number),
  }),
).annotate({ identifier: "HttpRouteMatch" }) as any as S.Schema<HttpRouteMatch>;
export interface WeightedTarget {
  virtualNode: string;
  weight: number;
  port?: number;
}
export const WeightedTarget = S.suspend(() =>
  S.Struct({
    virtualNode: S.String,
    weight: S.Number,
    port: S.optional(S.Number),
  }),
).annotate({ identifier: "WeightedTarget" }) as any as S.Schema<WeightedTarget>;
export type WeightedTargets = WeightedTarget[];
export const WeightedTargets = S.Array(WeightedTarget);
export interface HttpRouteAction {
  weightedTargets: WeightedTarget[];
}
export const HttpRouteAction = S.suspend(() =>
  S.Struct({ weightedTargets: WeightedTargets }),
).annotate({
  identifier: "HttpRouteAction",
}) as any as S.Schema<HttpRouteAction>;
export type HttpRetryPolicyEvents = string[];
export const HttpRetryPolicyEvents = S.Array(S.String);
export type TcpRetryPolicyEvents = string[];
export const TcpRetryPolicyEvents = S.Array(S.String);
export interface HttpRetryPolicy {
  perRetryTimeout: Duration;
  maxRetries: number;
  httpRetryEvents?: string[];
  tcpRetryEvents?: string[];
}
export const HttpRetryPolicy = S.suspend(() =>
  S.Struct({
    perRetryTimeout: Duration,
    maxRetries: S.Number,
    httpRetryEvents: S.optional(HttpRetryPolicyEvents),
    tcpRetryEvents: S.optional(TcpRetryPolicyEvents),
  }),
).annotate({
  identifier: "HttpRetryPolicy",
}) as any as S.Schema<HttpRetryPolicy>;
export interface HttpRoute {
  match: HttpRouteMatch;
  action: HttpRouteAction;
  retryPolicy?: HttpRetryPolicy;
  timeout?: HttpTimeout;
}
export const HttpRoute = S.suspend(() =>
  S.Struct({
    match: HttpRouteMatch,
    action: HttpRouteAction,
    retryPolicy: S.optional(HttpRetryPolicy),
    timeout: S.optional(HttpTimeout),
  }),
).annotate({ identifier: "HttpRoute" }) as any as S.Schema<HttpRoute>;
export interface TcpRouteAction {
  weightedTargets: WeightedTarget[];
}
export const TcpRouteAction = S.suspend(() =>
  S.Struct({ weightedTargets: WeightedTargets }),
).annotate({ identifier: "TcpRouteAction" }) as any as S.Schema<TcpRouteAction>;
export interface TcpRouteMatch {
  port?: number;
}
export const TcpRouteMatch = S.suspend(() =>
  S.Struct({ port: S.optional(S.Number) }),
).annotate({ identifier: "TcpRouteMatch" }) as any as S.Schema<TcpRouteMatch>;
export interface TcpRoute {
  action: TcpRouteAction;
  timeout?: TcpTimeout;
  match?: TcpRouteMatch;
}
export const TcpRoute = S.suspend(() =>
  S.Struct({
    action: TcpRouteAction,
    timeout: S.optional(TcpTimeout),
    match: S.optional(TcpRouteMatch),
  }),
).annotate({ identifier: "TcpRoute" }) as any as S.Schema<TcpRoute>;
export interface GrpcRouteAction {
  weightedTargets: WeightedTarget[];
}
export const GrpcRouteAction = S.suspend(() =>
  S.Struct({ weightedTargets: WeightedTargets }),
).annotate({
  identifier: "GrpcRouteAction",
}) as any as S.Schema<GrpcRouteAction>;
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
export const GrpcRouteMetadataMatchMethod = S.Union([
  S.Struct({ exact: S.String }),
  S.Struct({ regex: S.String }),
  S.Struct({ range: MatchRange }),
  S.Struct({ prefix: S.String }),
  S.Struct({ suffix: S.String }),
]);
export interface GrpcRouteMetadata {
  name: string;
  invert?: boolean;
  match?: GrpcRouteMetadataMatchMethod;
}
export const GrpcRouteMetadata = S.suspend(() =>
  S.Struct({
    name: S.String,
    invert: S.optional(S.Boolean),
    match: S.optional(GrpcRouteMetadataMatchMethod),
  }),
).annotate({
  identifier: "GrpcRouteMetadata",
}) as any as S.Schema<GrpcRouteMetadata>;
export type GrpcRouteMetadataList = GrpcRouteMetadata[];
export const GrpcRouteMetadataList = S.Array(GrpcRouteMetadata);
export interface GrpcRouteMatch {
  serviceName?: string;
  methodName?: string;
  metadata?: GrpcRouteMetadata[];
  port?: number;
}
export const GrpcRouteMatch = S.suspend(() =>
  S.Struct({
    serviceName: S.optional(S.String),
    methodName: S.optional(S.String),
    metadata: S.optional(GrpcRouteMetadataList),
    port: S.optional(S.Number),
  }),
).annotate({ identifier: "GrpcRouteMatch" }) as any as S.Schema<GrpcRouteMatch>;
export type GrpcRetryPolicyEvents = string[];
export const GrpcRetryPolicyEvents = S.Array(S.String);
export interface GrpcRetryPolicy {
  perRetryTimeout: Duration;
  maxRetries: number;
  httpRetryEvents?: string[];
  tcpRetryEvents?: string[];
  grpcRetryEvents?: string[];
}
export const GrpcRetryPolicy = S.suspend(() =>
  S.Struct({
    perRetryTimeout: Duration,
    maxRetries: S.Number,
    httpRetryEvents: S.optional(HttpRetryPolicyEvents),
    tcpRetryEvents: S.optional(TcpRetryPolicyEvents),
    grpcRetryEvents: S.optional(GrpcRetryPolicyEvents),
  }),
).annotate({
  identifier: "GrpcRetryPolicy",
}) as any as S.Schema<GrpcRetryPolicy>;
export interface GrpcRoute {
  action: GrpcRouteAction;
  match: GrpcRouteMatch;
  retryPolicy?: GrpcRetryPolicy;
  timeout?: GrpcTimeout;
}
export const GrpcRoute = S.suspend(() =>
  S.Struct({
    action: GrpcRouteAction,
    match: GrpcRouteMatch,
    retryPolicy: S.optional(GrpcRetryPolicy),
    timeout: S.optional(GrpcTimeout),
  }),
).annotate({ identifier: "GrpcRoute" }) as any as S.Schema<GrpcRoute>;
export interface RouteSpec {
  priority?: number;
  httpRoute?: HttpRoute;
  tcpRoute?: TcpRoute;
  http2Route?: HttpRoute;
  grpcRoute?: GrpcRoute;
}
export const RouteSpec = S.suspend(() =>
  S.Struct({
    priority: S.optional(S.Number),
    httpRoute: S.optional(HttpRoute),
    tcpRoute: S.optional(TcpRoute),
    http2Route: S.optional(HttpRoute),
    grpcRoute: S.optional(GrpcRoute),
  }),
).annotate({ identifier: "RouteSpec" }) as any as S.Schema<RouteSpec>;
export interface CreateRouteInput {
  routeName: string;
  meshName: string;
  virtualRouterName: string;
  spec: RouteSpec;
  tags?: TagRef[];
  clientToken?: string;
  meshOwner?: string;
}
export const CreateRouteInput = S.suspend(() =>
  S.Struct({
    routeName: S.String,
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    virtualRouterName: S.String.pipe(T.HttpLabel("virtualRouterName")),
    spec: RouteSpec,
    tags: S.optional(TagList),
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
).annotate({
  identifier: "CreateRouteInput",
}) as any as S.Schema<CreateRouteInput>;
export interface RouteStatus {
  status: string;
}
export const RouteStatus = S.suspend(() =>
  S.Struct({ status: S.String }),
).annotate({ identifier: "RouteStatus" }) as any as S.Schema<RouteStatus>;
export interface RouteData {
  meshName: string;
  virtualRouterName: string;
  routeName: string;
  spec: RouteSpec;
  metadata: ResourceMetadata;
  status: RouteStatus;
}
export const RouteData = S.suspend(() =>
  S.Struct({
    meshName: S.String,
    virtualRouterName: S.String,
    routeName: S.String,
    spec: RouteSpec,
    metadata: ResourceMetadata,
    status: RouteStatus,
  }),
).annotate({ identifier: "RouteData" }) as any as S.Schema<RouteData>;
export interface CreateRouteOutput {
  route: RouteData;
}
export const CreateRouteOutput = S.suspend(() =>
  S.Struct({
    route: RouteData.pipe(T.HttpPayload()).annotate({
      identifier: "RouteData",
    }),
  }),
).annotate({
  identifier: "CreateRouteOutput",
}) as any as S.Schema<CreateRouteOutput>;
export interface DescribeRouteInput {
  routeName: string;
  meshName: string;
  meshOwner?: string;
  virtualRouterName: string;
}
export const DescribeRouteInput = S.suspend(() =>
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
).annotate({
  identifier: "DescribeRouteInput",
}) as any as S.Schema<DescribeRouteInput>;
export interface DescribeRouteOutput {
  route: RouteData;
}
export const DescribeRouteOutput = S.suspend(() =>
  S.Struct({
    route: RouteData.pipe(T.HttpPayload()).annotate({
      identifier: "RouteData",
    }),
  }),
).annotate({
  identifier: "DescribeRouteOutput",
}) as any as S.Schema<DescribeRouteOutput>;
export interface UpdateRouteInput {
  routeName: string;
  meshName: string;
  virtualRouterName: string;
  spec: RouteSpec;
  clientToken?: string;
  meshOwner?: string;
}
export const UpdateRouteInput = S.suspend(() =>
  S.Struct({
    routeName: S.String.pipe(T.HttpLabel("routeName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    virtualRouterName: S.String.pipe(T.HttpLabel("virtualRouterName")),
    spec: RouteSpec,
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
).annotate({
  identifier: "UpdateRouteInput",
}) as any as S.Schema<UpdateRouteInput>;
export interface UpdateRouteOutput {
  route: RouteData;
}
export const UpdateRouteOutput = S.suspend(() =>
  S.Struct({
    route: RouteData.pipe(T.HttpPayload()).annotate({
      identifier: "RouteData",
    }),
  }),
).annotate({
  identifier: "UpdateRouteOutput",
}) as any as S.Schema<UpdateRouteOutput>;
export interface DeleteRouteInput {
  routeName: string;
  meshName: string;
  virtualRouterName: string;
  meshOwner?: string;
}
export const DeleteRouteInput = S.suspend(() =>
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
).annotate({
  identifier: "DeleteRouteInput",
}) as any as S.Schema<DeleteRouteInput>;
export interface DeleteRouteOutput {
  route: RouteData;
}
export const DeleteRouteOutput = S.suspend(() =>
  S.Struct({
    route: RouteData.pipe(T.HttpPayload()).annotate({
      identifier: "RouteData",
    }),
  }),
).annotate({
  identifier: "DeleteRouteOutput",
}) as any as S.Schema<DeleteRouteOutput>;
export interface ListRoutesInput {
  meshName: string;
  virtualRouterName: string;
  nextToken?: string;
  limit?: number;
  meshOwner?: string;
}
export const ListRoutesInput = S.suspend(() =>
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
).annotate({
  identifier: "ListRoutesInput",
}) as any as S.Schema<ListRoutesInput>;
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
export const RouteRef = S.suspend(() =>
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
).annotate({ identifier: "RouteRef" }) as any as S.Schema<RouteRef>;
export type RouteList = RouteRef[];
export const RouteList = S.Array(RouteRef);
export interface ListRoutesOutput {
  routes: RouteRef[];
  nextToken?: string;
}
export const ListRoutesOutput = S.suspend(() =>
  S.Struct({ routes: RouteList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListRoutesOutput",
}) as any as S.Schema<ListRoutesOutput>;
export interface VirtualNodeServiceProvider {
  virtualNodeName: string;
}
export const VirtualNodeServiceProvider = S.suspend(() =>
  S.Struct({ virtualNodeName: S.String }),
).annotate({
  identifier: "VirtualNodeServiceProvider",
}) as any as S.Schema<VirtualNodeServiceProvider>;
export interface VirtualRouterServiceProvider {
  virtualRouterName: string;
}
export const VirtualRouterServiceProvider = S.suspend(() =>
  S.Struct({ virtualRouterName: S.String }),
).annotate({
  identifier: "VirtualRouterServiceProvider",
}) as any as S.Schema<VirtualRouterServiceProvider>;
export type VirtualServiceProvider =
  | { virtualNode: VirtualNodeServiceProvider; virtualRouter?: never }
  | { virtualNode?: never; virtualRouter: VirtualRouterServiceProvider };
export const VirtualServiceProvider = S.Union([
  S.Struct({ virtualNode: VirtualNodeServiceProvider }),
  S.Struct({ virtualRouter: VirtualRouterServiceProvider }),
]);
export interface VirtualServiceSpec {
  provider?: VirtualServiceProvider;
}
export const VirtualServiceSpec = S.suspend(() =>
  S.Struct({ provider: S.optional(VirtualServiceProvider) }),
).annotate({
  identifier: "VirtualServiceSpec",
}) as any as S.Schema<VirtualServiceSpec>;
export interface CreateVirtualServiceInput {
  virtualServiceName: string;
  meshName: string;
  spec: VirtualServiceSpec;
  tags?: TagRef[];
  clientToken?: string;
  meshOwner?: string;
}
export const CreateVirtualServiceInput = S.suspend(() =>
  S.Struct({
    virtualServiceName: S.String,
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    spec: VirtualServiceSpec,
    tags: S.optional(TagList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v20190125/meshes/{meshName}/virtualServices",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVirtualServiceInput",
}) as any as S.Schema<CreateVirtualServiceInput>;
export interface VirtualServiceStatus {
  status: string;
}
export const VirtualServiceStatus = S.suspend(() =>
  S.Struct({ status: S.String }),
).annotate({
  identifier: "VirtualServiceStatus",
}) as any as S.Schema<VirtualServiceStatus>;
export interface VirtualServiceData {
  meshName: string;
  virtualServiceName: string;
  spec: VirtualServiceSpec;
  metadata: ResourceMetadata;
  status: VirtualServiceStatus;
}
export const VirtualServiceData = S.suspend(() =>
  S.Struct({
    meshName: S.String,
    virtualServiceName: S.String,
    spec: VirtualServiceSpec,
    metadata: ResourceMetadata,
    status: VirtualServiceStatus,
  }),
).annotate({
  identifier: "VirtualServiceData",
}) as any as S.Schema<VirtualServiceData>;
export interface CreateVirtualServiceOutput {
  virtualService: VirtualServiceData;
}
export const CreateVirtualServiceOutput = S.suspend(() =>
  S.Struct({
    virtualService: VirtualServiceData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualServiceData",
    }),
  }),
).annotate({
  identifier: "CreateVirtualServiceOutput",
}) as any as S.Schema<CreateVirtualServiceOutput>;
export interface DescribeVirtualServiceInput {
  virtualServiceName: string;
  meshName: string;
  meshOwner?: string;
}
export const DescribeVirtualServiceInput = S.suspend(() =>
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
).annotate({
  identifier: "DescribeVirtualServiceInput",
}) as any as S.Schema<DescribeVirtualServiceInput>;
export interface DescribeVirtualServiceOutput {
  virtualService: VirtualServiceData;
}
export const DescribeVirtualServiceOutput = S.suspend(() =>
  S.Struct({
    virtualService: VirtualServiceData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualServiceData",
    }),
  }),
).annotate({
  identifier: "DescribeVirtualServiceOutput",
}) as any as S.Schema<DescribeVirtualServiceOutput>;
export interface UpdateVirtualServiceInput {
  virtualServiceName: string;
  meshName: string;
  spec: VirtualServiceSpec;
  clientToken?: string;
  meshOwner?: string;
}
export const UpdateVirtualServiceInput = S.suspend(() =>
  S.Struct({
    virtualServiceName: S.String.pipe(T.HttpLabel("virtualServiceName")),
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    spec: VirtualServiceSpec,
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
).annotate({
  identifier: "UpdateVirtualServiceInput",
}) as any as S.Schema<UpdateVirtualServiceInput>;
export interface UpdateVirtualServiceOutput {
  virtualService: VirtualServiceData;
}
export const UpdateVirtualServiceOutput = S.suspend(() =>
  S.Struct({
    virtualService: VirtualServiceData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualServiceData",
    }),
  }),
).annotate({
  identifier: "UpdateVirtualServiceOutput",
}) as any as S.Schema<UpdateVirtualServiceOutput>;
export interface DeleteVirtualServiceInput {
  virtualServiceName: string;
  meshName: string;
  meshOwner?: string;
}
export const DeleteVirtualServiceInput = S.suspend(() =>
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
).annotate({
  identifier: "DeleteVirtualServiceInput",
}) as any as S.Schema<DeleteVirtualServiceInput>;
export interface DeleteVirtualServiceOutput {
  virtualService: VirtualServiceData;
}
export const DeleteVirtualServiceOutput = S.suspend(() =>
  S.Struct({
    virtualService: VirtualServiceData.pipe(T.HttpPayload()).annotate({
      identifier: "VirtualServiceData",
    }),
  }),
).annotate({
  identifier: "DeleteVirtualServiceOutput",
}) as any as S.Schema<DeleteVirtualServiceOutput>;
export interface ListVirtualServicesInput {
  meshName: string;
  nextToken?: string;
  limit?: number;
  meshOwner?: string;
}
export const ListVirtualServicesInput = S.suspend(() =>
  S.Struct({
    meshName: S.String.pipe(T.HttpLabel("meshName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    meshOwner: S.optional(S.String).pipe(T.HttpQuery("meshOwner")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v20190125/meshes/{meshName}/virtualServices",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVirtualServicesInput",
}) as any as S.Schema<ListVirtualServicesInput>;
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
export const VirtualServiceRef = S.suspend(() =>
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
).annotate({
  identifier: "VirtualServiceRef",
}) as any as S.Schema<VirtualServiceRef>;
export type VirtualServiceList = VirtualServiceRef[];
export const VirtualServiceList = S.Array(VirtualServiceRef);
export interface ListVirtualServicesOutput {
  virtualServices: VirtualServiceRef[];
  nextToken?: string;
}
export const ListVirtualServicesOutput = S.suspend(() =>
  S.Struct({
    virtualServices: VirtualServiceList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListVirtualServicesOutput",
}) as any as S.Schema<ListVirtualServicesOutput>;

//# Errors
export class BadRequestException extends S.TaggedErrorClass<BadRequestException>()(
  "BadRequestException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ForbiddenException extends S.TaggedErrorClass<ForbiddenException>()(
  "ForbiddenException",
  { message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class InternalServerErrorException extends S.TaggedErrorClass<InternalServerErrorException>()(
  "InternalServerErrorException",
  { message: S.optional(S.String) },
  T.Retryable(),
).pipe(C.withServerError, C.withRetryableError) {}
export class NotFoundException extends S.TaggedErrorClass<NotFoundException>()(
  "NotFoundException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException extends S.TaggedErrorClass<ServiceUnavailableException>()(
  "ServiceUnavailableException",
  { message: S.optional(S.String) },
  T.Retryable(),
).pipe(C.withServerError, C.withRetryableError) {}
export class TooManyRequestsException extends S.TaggedErrorClass<TooManyRequestsException>()(
  "TooManyRequestsException",
  { message: S.optional(S.String) },
  T.Retryable({ throttling: true }),
).pipe(C.withThrottlingError, C.withRetryableError) {}
export class TooManyTagsException extends S.TaggedErrorClass<TooManyTagsException>()(
  "TooManyTagsException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class LimitExceededException extends S.TaggedErrorClass<LimitExceededException>()(
  "LimitExceededException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ResourceInUseException extends S.TaggedErrorClass<ResourceInUseException>()(
  "ResourceInUseException",
  { message: S.optional(S.String) },
).pipe(C.withConflictError) {}

//# Operations
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
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListTagsForResourceInput,
  ) => stream.Stream<
    ListTagsForResourceOutput,
    ListTagsForResourceError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListTagsForResourceInput,
  ) => stream.Stream<
    TagRef,
    ListTagsForResourceError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tags",
    pageSize: "limit",
  } as const,
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMeshInput,
  output: CreateMeshOutput,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeMeshInput,
  output: DescribeMeshOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateMeshInput,
  output: UpdateMeshOutput,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteMeshInput,
  output: DeleteMeshOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
}));
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
export const listMeshes: API.OperationMethod<
  ListMeshesInput,
  ListMeshesOutput,
  ListMeshesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListMeshesInput,
  ) => stream.Stream<
    ListMeshesOutput,
    ListMeshesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListMeshesInput,
  ) => stream.Stream<
    MeshRef,
    ListMeshesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListMeshesInput,
  output: ListMeshesOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "meshes",
    pageSize: "limit",
  } as const,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateVirtualGatewayInput,
  output: CreateVirtualGatewayOutput,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeVirtualGatewayInput,
  output: DescribeVirtualGatewayOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateVirtualGatewayInput,
  output: UpdateVirtualGatewayOutput,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVirtualGatewayInput,
  output: DeleteVirtualGatewayOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
}));
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
export const listVirtualGateways: API.OperationMethod<
  ListVirtualGatewaysInput,
  ListVirtualGatewaysOutput,
  ListVirtualGatewaysError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListVirtualGatewaysInput,
  ) => stream.Stream<
    ListVirtualGatewaysOutput,
    ListVirtualGatewaysError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListVirtualGatewaysInput,
  ) => stream.Stream<
    VirtualGatewayRef,
    ListVirtualGatewaysError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListVirtualGatewaysInput,
  output: ListVirtualGatewaysOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "virtualGateways",
    pageSize: "limit",
  } as const,
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateGatewayRouteInput,
  output: CreateGatewayRouteOutput,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeGatewayRouteInput,
  output: DescribeGatewayRouteOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateGatewayRouteInput,
  output: UpdateGatewayRouteOutput,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteGatewayRouteInput,
  output: DeleteGatewayRouteOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
export const listGatewayRoutes: API.OperationMethod<
  ListGatewayRoutesInput,
  ListGatewayRoutesOutput,
  ListGatewayRoutesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListGatewayRoutesInput,
  ) => stream.Stream<
    ListGatewayRoutesOutput,
    ListGatewayRoutesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListGatewayRoutesInput,
  ) => stream.Stream<
    GatewayRouteRef,
    ListGatewayRoutesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListGatewayRoutesInput,
  output: ListGatewayRoutesOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "gatewayRoutes",
    pageSize: "limit",
  } as const,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateVirtualNodeInput,
  output: CreateVirtualNodeOutput,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeVirtualNodeInput,
  output: DescribeVirtualNodeOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateVirtualNodeInput,
  output: UpdateVirtualNodeOutput,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVirtualNodeInput,
  output: DeleteVirtualNodeOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
}));
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
export const listVirtualNodes: API.OperationMethod<
  ListVirtualNodesInput,
  ListVirtualNodesOutput,
  ListVirtualNodesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListVirtualNodesInput,
  ) => stream.Stream<
    ListVirtualNodesOutput,
    ListVirtualNodesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListVirtualNodesInput,
  ) => stream.Stream<
    VirtualNodeRef,
    ListVirtualNodesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListVirtualNodesInput,
  output: ListVirtualNodesOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "virtualNodes",
    pageSize: "limit",
  } as const,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateVirtualRouterInput,
  output: CreateVirtualRouterOutput,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeVirtualRouterInput,
  output: DescribeVirtualRouterOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateVirtualRouterInput,
  output: UpdateVirtualRouterOutput,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVirtualRouterInput,
  output: DeleteVirtualRouterOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
}));
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
export const listVirtualRouters: API.OperationMethod<
  ListVirtualRoutersInput,
  ListVirtualRoutersOutput,
  ListVirtualRoutersError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListVirtualRoutersInput,
  ) => stream.Stream<
    ListVirtualRoutersOutput,
    ListVirtualRoutersError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListVirtualRoutersInput,
  ) => stream.Stream<
    VirtualRouterRef,
    ListVirtualRoutersError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListVirtualRoutersInput,
  output: ListVirtualRoutersOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "virtualRouters",
    pageSize: "limit",
  } as const,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRouteInput,
  output: CreateRouteOutput,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeRouteInput,
  output: DescribeRouteOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRouteInput,
  output: UpdateRouteOutput,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRouteInput,
  output: DeleteRouteOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
}));
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
export const listRoutes: API.OperationMethod<
  ListRoutesInput,
  ListRoutesOutput,
  ListRoutesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListRoutesInput,
  ) => stream.Stream<
    ListRoutesOutput,
    ListRoutesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListRoutesInput,
  ) => stream.Stream<
    RouteRef,
    ListRoutesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRoutesInput,
  output: ListRoutesOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "routes",
    pageSize: "limit",
  } as const,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateVirtualServiceInput,
  output: CreateVirtualServiceOutput,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeVirtualServiceInput,
  output: DescribeVirtualServiceOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateVirtualServiceInput,
  output: UpdateVirtualServiceOutput,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVirtualServiceInput,
  output: DeleteVirtualServiceOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ResourceInUseException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
}));
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
export const listVirtualServices: API.OperationMethod<
  ListVirtualServicesInput,
  ListVirtualServicesOutput,
  ListVirtualServicesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListVirtualServicesInput,
  ) => stream.Stream<
    ListVirtualServicesOutput,
    ListVirtualServicesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListVirtualServicesInput,
  ) => stream.Stream<
    VirtualServiceRef,
    ListVirtualServicesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListVirtualServicesInput,
  output: ListVirtualServicesOutput,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "virtualServices",
    pageSize: "limit",
  } as const,
}));
