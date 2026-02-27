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
  sdkId: "evs",
  serviceShapeName: "AmazonElasticVMwareService",
});
const auth = T.AwsAuthSigv4({ name: "evs" });
const ver = T.ServiceVersion("2023-07-27");
const proto = T.AwsProtocolsAwsJson1_0();
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
              `https://evs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://evs-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://evs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://evs.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type Arn = string;
export type TagKey = string;
export type TagValue = string;
export type ClientToken = string;
export type EnvironmentName = string;
export type SecurityGroupId = string;
export type VpcId = string;
export type SubnetId = string;
export type SolutionKey = string;
export type VSanLicenseKey = string;
export type Cidr = string;
export type NetworkAclId = string;
export type HostName = string;
export type KeyName = string;
export type PlacementGroupId = string;
export type DedicatedHostId = string;
export type RouteServerPeering = string;
export type EnvironmentId = string;
export type StateDetails = string;
export type PaginationToken = string;
export type MaxResults = number;
export type AllocationId = string;
export type VlanId = number;
export type AssociationId = string;
export type IpAddress = string;
export type EsxVersion = string;
export type NetworkInterfaceId = string;

//# Schemas
export interface GetVersionsRequest {}
export const GetVersionsRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetVersionsRequest",
}) as any as S.Schema<GetVersionsRequest>;
export type VcfVersion = "VCF-5.2.1" | "VCF-5.2.2" | (string & {});
export const VcfVersion = S.String;
export type InstanceType = "i4i.metal" | (string & {});
export const InstanceType = S.String;
export type InstanceTypeList = InstanceType[];
export const InstanceTypeList = S.Array(InstanceType);
export interface VcfVersionInfo {
  vcfVersion: VcfVersion;
  status: string;
  defaultEsxVersion: string;
  instanceTypes: InstanceType[];
}
export const VcfVersionInfo = S.suspend(() =>
  S.Struct({
    vcfVersion: VcfVersion,
    status: S.String,
    defaultEsxVersion: S.String,
    instanceTypes: InstanceTypeList,
  }),
).annotate({ identifier: "VcfVersionInfo" }) as any as S.Schema<VcfVersionInfo>;
export type VcfVersionList = VcfVersionInfo[];
export const VcfVersionList = S.Array(VcfVersionInfo);
export type EsxVersionList = string[];
export const EsxVersionList = S.Array(S.String);
export interface InstanceTypeEsxVersionsInfo {
  instanceType: InstanceType;
  esxVersions: string[];
}
export const InstanceTypeEsxVersionsInfo = S.suspend(() =>
  S.Struct({ instanceType: InstanceType, esxVersions: EsxVersionList }),
).annotate({
  identifier: "InstanceTypeEsxVersionsInfo",
}) as any as S.Schema<InstanceTypeEsxVersionsInfo>;
export type InstanceTypeEsxVersionsList = InstanceTypeEsxVersionsInfo[];
export const InstanceTypeEsxVersionsList = S.Array(InstanceTypeEsxVersionsInfo);
export interface GetVersionsResponse {
  vcfVersions: VcfVersionInfo[];
  instanceTypeEsxVersions: InstanceTypeEsxVersionsInfo[];
}
export const GetVersionsResponse = S.suspend(() =>
  S.Struct({
    vcfVersions: VcfVersionList,
    instanceTypeEsxVersions: InstanceTypeEsxVersionsList,
  }),
).annotate({
  identifier: "GetVersionsResponse",
}) as any as S.Schema<GetVersionsResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export type ResponseTagMap = { [key: string]: string | undefined };
export const ResponseTagMap = S.Record(S.String, S.String.pipe(S.optional));
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: S.optional(ResponseTagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type RequestTagMap = { [key: string]: string | undefined };
export const RequestTagMap = S.Record(S.String, S.String.pipe(S.optional));
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: RequestTagMap }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeys = string[];
export const TagKeys = S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({ resourceArn: S.String, tagKeys: TagKeys }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export type SecurityGroups = string[];
export const SecurityGroups = S.Array(S.String);
export interface ServiceAccessSecurityGroups {
  securityGroups?: string[];
}
export const ServiceAccessSecurityGroups = S.suspend(() =>
  S.Struct({ securityGroups: S.optional(SecurityGroups) }),
).annotate({
  identifier: "ServiceAccessSecurityGroups",
}) as any as S.Schema<ServiceAccessSecurityGroups>;
export interface LicenseInfo {
  solutionKey: string;
  vsanKey: string;
}
export const LicenseInfo = S.suspend(() =>
  S.Struct({ solutionKey: S.String, vsanKey: S.String }),
).annotate({ identifier: "LicenseInfo" }) as any as S.Schema<LicenseInfo>;
export type LicenseInfoList = LicenseInfo[];
export const LicenseInfoList = S.Array(LicenseInfo);
export interface InitialVlanInfo {
  cidr: string;
}
export const InitialVlanInfo = S.suspend(() =>
  S.Struct({ cidr: S.String }),
).annotate({
  identifier: "InitialVlanInfo",
}) as any as S.Schema<InitialVlanInfo>;
export interface InitialVlans {
  vmkManagement: InitialVlanInfo;
  vmManagement: InitialVlanInfo;
  vMotion: InitialVlanInfo;
  vSan: InitialVlanInfo;
  vTep: InitialVlanInfo;
  edgeVTep: InitialVlanInfo;
  nsxUplink: InitialVlanInfo;
  hcx: InitialVlanInfo;
  expansionVlan1: InitialVlanInfo;
  expansionVlan2: InitialVlanInfo;
  isHcxPublic?: boolean;
  hcxNetworkAclId?: string;
}
export const InitialVlans = S.suspend(() =>
  S.Struct({
    vmkManagement: InitialVlanInfo,
    vmManagement: InitialVlanInfo,
    vMotion: InitialVlanInfo,
    vSan: InitialVlanInfo,
    vTep: InitialVlanInfo,
    edgeVTep: InitialVlanInfo,
    nsxUplink: InitialVlanInfo,
    hcx: InitialVlanInfo,
    expansionVlan1: InitialVlanInfo,
    expansionVlan2: InitialVlanInfo,
    isHcxPublic: S.optional(S.Boolean),
    hcxNetworkAclId: S.optional(S.String),
  }),
).annotate({ identifier: "InitialVlans" }) as any as S.Schema<InitialVlans>;
export interface HostInfoForCreate {
  hostName: string;
  keyName: string;
  instanceType: InstanceType;
  placementGroupId?: string;
  dedicatedHostId?: string;
}
export const HostInfoForCreate = S.suspend(() =>
  S.Struct({
    hostName: S.String,
    keyName: S.String,
    instanceType: InstanceType,
    placementGroupId: S.optional(S.String),
    dedicatedHostId: S.optional(S.String),
  }),
).annotate({
  identifier: "HostInfoForCreate",
}) as any as S.Schema<HostInfoForCreate>;
export type HostInfoForCreateList = HostInfoForCreate[];
export const HostInfoForCreateList = S.Array(HostInfoForCreate);
export type RouteServerPeeringList = string[];
export const RouteServerPeeringList = S.Array(S.String);
export interface ConnectivityInfo {
  privateRouteServerPeerings: string[];
}
export const ConnectivityInfo = S.suspend(() =>
  S.Struct({ privateRouteServerPeerings: RouteServerPeeringList }),
).annotate({
  identifier: "ConnectivityInfo",
}) as any as S.Schema<ConnectivityInfo>;
export interface VcfHostnames {
  vCenter: string;
  nsx: string;
  nsxManager1: string;
  nsxManager2: string;
  nsxManager3: string;
  nsxEdge1: string;
  nsxEdge2: string;
  sddcManager: string;
  cloudBuilder: string;
}
export const VcfHostnames = S.suspend(() =>
  S.Struct({
    vCenter: S.String,
    nsx: S.String,
    nsxManager1: S.String,
    nsxManager2: S.String,
    nsxManager3: S.String,
    nsxEdge1: S.String,
    nsxEdge2: S.String,
    sddcManager: S.String,
    cloudBuilder: S.String,
  }),
).annotate({ identifier: "VcfHostnames" }) as any as S.Schema<VcfHostnames>;
export interface CreateEnvironmentRequest {
  clientToken?: string;
  environmentName?: string;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  serviceAccessSecurityGroups?: ServiceAccessSecurityGroups;
  vpcId: string;
  serviceAccessSubnetId: string;
  vcfVersion: VcfVersion;
  termsAccepted: boolean;
  licenseInfo: LicenseInfo[];
  initialVlans: InitialVlans;
  hosts: HostInfoForCreate[];
  connectivityInfo: ConnectivityInfo;
  vcfHostnames: VcfHostnames;
  siteId: string;
}
export const CreateEnvironmentRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    environmentName: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    tags: S.optional(RequestTagMap),
    serviceAccessSecurityGroups: S.optional(ServiceAccessSecurityGroups),
    vpcId: S.String,
    serviceAccessSubnetId: S.String,
    vcfVersion: VcfVersion,
    termsAccepted: S.Boolean,
    licenseInfo: LicenseInfoList,
    initialVlans: InitialVlans,
    hosts: HostInfoForCreateList,
    connectivityInfo: ConnectivityInfo,
    vcfHostnames: VcfHostnames,
    siteId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateEnvironmentRequest",
}) as any as S.Schema<CreateEnvironmentRequest>;
export type EnvironmentState =
  | "CREATING"
  | "CREATED"
  | "DELETING"
  | "DELETED"
  | "CREATE_FAILED"
  | (string & {});
export const EnvironmentState = S.String;
export type CheckResult = "PASSED" | "FAILED" | "UNKNOWN" | (string & {});
export const CheckResult = S.String;
export type CheckType =
  | "KEY_REUSE"
  | "KEY_COVERAGE"
  | "REACHABILITY"
  | "HOST_COUNT"
  | (string & {});
export const CheckType = S.String;
export interface Check {
  type?: CheckType;
  result?: CheckResult;
  impairedSince?: Date;
}
export const Check = S.suspend(() =>
  S.Struct({
    type: S.optional(CheckType),
    result: S.optional(CheckResult),
    impairedSince: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Check" }) as any as S.Schema<Check>;
export type ChecksList = Check[];
export const ChecksList = S.Array(Check);
export interface Secret {
  secretArn?: string;
}
export const Secret = S.suspend(() =>
  S.Struct({ secretArn: S.optional(S.String) }),
).annotate({ identifier: "Secret" }) as any as S.Schema<Secret>;
export type SecretList = Secret[];
export const SecretList = S.Array(Secret);
export interface Environment {
  environmentId?: string;
  environmentState?: EnvironmentState;
  stateDetails?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  environmentArn?: string;
  environmentName?: string;
  vpcId?: string;
  serviceAccessSubnetId?: string;
  vcfVersion?: VcfVersion;
  termsAccepted?: boolean;
  licenseInfo?: LicenseInfo[];
  siteId?: string;
  environmentStatus?: CheckResult;
  checks?: Check[];
  connectivityInfo?: ConnectivityInfo;
  vcfHostnames?: VcfHostnames;
  kmsKeyId?: string;
  serviceAccessSecurityGroups?: ServiceAccessSecurityGroups;
  credentials?: Secret[];
}
export const Environment = S.suspend(() =>
  S.Struct({
    environmentId: S.optional(S.String),
    environmentState: S.optional(EnvironmentState),
    stateDetails: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    environmentArn: S.optional(S.String),
    environmentName: S.optional(S.String),
    vpcId: S.optional(S.String),
    serviceAccessSubnetId: S.optional(S.String),
    vcfVersion: S.optional(VcfVersion),
    termsAccepted: S.optional(S.Boolean),
    licenseInfo: S.optional(LicenseInfoList),
    siteId: S.optional(S.String),
    environmentStatus: S.optional(CheckResult),
    checks: S.optional(ChecksList),
    connectivityInfo: S.optional(ConnectivityInfo),
    vcfHostnames: S.optional(VcfHostnames),
    kmsKeyId: S.optional(S.String),
    serviceAccessSecurityGroups: S.optional(ServiceAccessSecurityGroups),
    credentials: S.optional(SecretList),
  }),
).annotate({ identifier: "Environment" }) as any as S.Schema<Environment>;
export interface CreateEnvironmentResponse {
  environment?: Environment;
}
export const CreateEnvironmentResponse = S.suspend(() =>
  S.Struct({ environment: S.optional(Environment) }),
).annotate({
  identifier: "CreateEnvironmentResponse",
}) as any as S.Schema<CreateEnvironmentResponse>;
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export const ValidationExceptionReason = S.String;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export const ValidationExceptionField = S.suspend(() =>
  S.Struct({ name: S.String, message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = S.Array(ValidationExceptionField);
export interface GetEnvironmentRequest {
  environmentId: string;
}
export const GetEnvironmentRequest = S.suspend(() =>
  S.Struct({ environmentId: S.String.pipe(T.HttpLabel("environmentId")) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetEnvironmentRequest",
}) as any as S.Schema<GetEnvironmentRequest>;
export interface GetEnvironmentResponse {
  environment?: Environment;
}
export const GetEnvironmentResponse = S.suspend(() =>
  S.Struct({ environment: S.optional(Environment) }),
).annotate({
  identifier: "GetEnvironmentResponse",
}) as any as S.Schema<GetEnvironmentResponse>;
export interface DeleteEnvironmentRequest {
  clientToken?: string;
  environmentId: string;
}
export const DeleteEnvironmentRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteEnvironmentRequest",
}) as any as S.Schema<DeleteEnvironmentRequest>;
export interface DeleteEnvironmentResponse {
  environment?: Environment;
}
export const DeleteEnvironmentResponse = S.suspend(() =>
  S.Struct({ environment: S.optional(Environment) }),
).annotate({
  identifier: "DeleteEnvironmentResponse",
}) as any as S.Schema<DeleteEnvironmentResponse>;
export type EnvironmentStateList = EnvironmentState[];
export const EnvironmentStateList = S.Array(EnvironmentState);
export interface ListEnvironmentsRequest {
  nextToken?: string;
  maxResults?: number;
  state?: EnvironmentState[];
}
export const ListEnvironmentsRequest = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    state: S.optional(EnvironmentStateList).pipe(T.HttpQuery("state")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEnvironmentsRequest",
}) as any as S.Schema<ListEnvironmentsRequest>;
export interface EnvironmentSummary {
  environmentId?: string;
  environmentName?: string;
  vcfVersion?: VcfVersion;
  environmentStatus?: CheckResult;
  environmentState?: EnvironmentState;
  createdAt?: Date;
  modifiedAt?: Date;
  environmentArn?: string;
}
export const EnvironmentSummary = S.suspend(() =>
  S.Struct({
    environmentId: S.optional(S.String),
    environmentName: S.optional(S.String),
    vcfVersion: S.optional(VcfVersion),
    environmentStatus: S.optional(CheckResult),
    environmentState: S.optional(EnvironmentState),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    environmentArn: S.optional(S.String),
  }),
).annotate({
  identifier: "EnvironmentSummary",
}) as any as S.Schema<EnvironmentSummary>;
export type EnvironmentSummaryList = EnvironmentSummary[];
export const EnvironmentSummaryList = S.Array(EnvironmentSummary);
export interface ListEnvironmentsResponse {
  nextToken?: string;
  environmentSummaries?: EnvironmentSummary[];
}
export const ListEnvironmentsResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    environmentSummaries: S.optional(EnvironmentSummaryList),
  }),
).annotate({
  identifier: "ListEnvironmentsResponse",
}) as any as S.Schema<ListEnvironmentsResponse>;
export interface AssociateEipToVlanRequest {
  clientToken?: string;
  environmentId: string;
  vlanName: string;
  allocationId: string;
}
export const AssociateEipToVlanRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    environmentId: S.String,
    vlanName: S.String,
    allocationId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateEipToVlanRequest",
}) as any as S.Schema<AssociateEipToVlanRequest>;
export type VlanState =
  | "CREATING"
  | "CREATED"
  | "DELETING"
  | "DELETED"
  | "CREATE_FAILED"
  | (string & {});
export const VlanState = S.String;
export interface EipAssociation {
  associationId?: string;
  allocationId?: string;
  ipAddress?: string;
}
export const EipAssociation = S.suspend(() =>
  S.Struct({
    associationId: S.optional(S.String),
    allocationId: S.optional(S.String),
    ipAddress: S.optional(S.String),
  }),
).annotate({ identifier: "EipAssociation" }) as any as S.Schema<EipAssociation>;
export type EipAssociationList = EipAssociation[];
export const EipAssociationList = S.Array(EipAssociation);
export interface Vlan {
  vlanId?: number;
  cidr?: string;
  availabilityZone?: string;
  functionName?: string;
  subnetId?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  vlanState?: VlanState;
  stateDetails?: string;
  eipAssociations?: EipAssociation[];
  isPublic?: boolean;
  networkAclId?: string;
}
export const Vlan = S.suspend(() =>
  S.Struct({
    vlanId: S.optional(S.Number),
    cidr: S.optional(S.String),
    availabilityZone: S.optional(S.String),
    functionName: S.optional(S.String),
    subnetId: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    vlanState: S.optional(VlanState),
    stateDetails: S.optional(S.String),
    eipAssociations: S.optional(EipAssociationList),
    isPublic: S.optional(S.Boolean),
    networkAclId: S.optional(S.String),
  }),
).annotate({ identifier: "Vlan" }) as any as S.Schema<Vlan>;
export interface AssociateEipToVlanResponse {
  vlan?: Vlan;
}
export const AssociateEipToVlanResponse = S.suspend(() =>
  S.Struct({ vlan: S.optional(Vlan) }),
).annotate({
  identifier: "AssociateEipToVlanResponse",
}) as any as S.Schema<AssociateEipToVlanResponse>;
export interface CreateEnvironmentHostRequest {
  clientToken?: string;
  environmentId: string;
  host: HostInfoForCreate;
  esxVersion?: string;
}
export const CreateEnvironmentHostRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    environmentId: S.String,
    host: HostInfoForCreate,
    esxVersion: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateEnvironmentHostRequest",
}) as any as S.Schema<CreateEnvironmentHostRequest>;
export type HostState =
  | "CREATING"
  | "CREATED"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | (string & {});
export const HostState = S.String;
export interface NetworkInterface {
  networkInterfaceId?: string;
}
export const NetworkInterface = S.suspend(() =>
  S.Struct({ networkInterfaceId: S.optional(S.String) }),
).annotate({
  identifier: "NetworkInterface",
}) as any as S.Schema<NetworkInterface>;
export type NetworkInterfaceList = NetworkInterface[];
export const NetworkInterfaceList = S.Array(NetworkInterface);
export interface Host {
  hostName?: string;
  ipAddress?: string;
  keyName?: string;
  instanceType?: InstanceType;
  placementGroupId?: string;
  dedicatedHostId?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  hostState?: HostState;
  stateDetails?: string;
  ec2InstanceId?: string;
  networkInterfaces?: NetworkInterface[];
}
export const Host = S.suspend(() =>
  S.Struct({
    hostName: S.optional(S.String),
    ipAddress: S.optional(S.String),
    keyName: S.optional(S.String),
    instanceType: S.optional(InstanceType),
    placementGroupId: S.optional(S.String),
    dedicatedHostId: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    hostState: S.optional(HostState),
    stateDetails: S.optional(S.String),
    ec2InstanceId: S.optional(S.String),
    networkInterfaces: S.optional(NetworkInterfaceList),
  }),
).annotate({ identifier: "Host" }) as any as S.Schema<Host>;
export interface CreateEnvironmentHostResponse {
  environmentSummary?: EnvironmentSummary;
  host?: Host;
}
export const CreateEnvironmentHostResponse = S.suspend(() =>
  S.Struct({
    environmentSummary: S.optional(EnvironmentSummary),
    host: S.optional(Host),
  }),
).annotate({
  identifier: "CreateEnvironmentHostResponse",
}) as any as S.Schema<CreateEnvironmentHostResponse>;
export interface DeleteEnvironmentHostRequest {
  clientToken?: string;
  environmentId: string;
  hostName: string;
}
export const DeleteEnvironmentHostRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    environmentId: S.String,
    hostName: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteEnvironmentHostRequest",
}) as any as S.Schema<DeleteEnvironmentHostRequest>;
export interface DeleteEnvironmentHostResponse {
  environmentSummary?: EnvironmentSummary;
  host?: Host;
}
export const DeleteEnvironmentHostResponse = S.suspend(() =>
  S.Struct({
    environmentSummary: S.optional(EnvironmentSummary),
    host: S.optional(Host),
  }),
).annotate({
  identifier: "DeleteEnvironmentHostResponse",
}) as any as S.Schema<DeleteEnvironmentHostResponse>;
export interface DisassociateEipFromVlanRequest {
  clientToken?: string;
  environmentId: string;
  vlanName: string;
  associationId: string;
}
export const DisassociateEipFromVlanRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    environmentId: S.String,
    vlanName: S.String,
    associationId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisassociateEipFromVlanRequest",
}) as any as S.Schema<DisassociateEipFromVlanRequest>;
export interface DisassociateEipFromVlanResponse {
  vlan?: Vlan;
}
export const DisassociateEipFromVlanResponse = S.suspend(() =>
  S.Struct({ vlan: S.optional(Vlan) }),
).annotate({
  identifier: "DisassociateEipFromVlanResponse",
}) as any as S.Schema<DisassociateEipFromVlanResponse>;
export interface ListEnvironmentHostsRequest {
  nextToken?: string;
  maxResults?: number;
  environmentId: string;
}
export const ListEnvironmentHostsRequest = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEnvironmentHostsRequest",
}) as any as S.Schema<ListEnvironmentHostsRequest>;
export type HostList = Host[];
export const HostList = S.Array(Host);
export interface ListEnvironmentHostsResponse {
  nextToken?: string;
  environmentHosts?: Host[];
}
export const ListEnvironmentHostsResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    environmentHosts: S.optional(HostList),
  }),
).annotate({
  identifier: "ListEnvironmentHostsResponse",
}) as any as S.Schema<ListEnvironmentHostsResponse>;
export interface ListEnvironmentVlansRequest {
  nextToken?: string;
  maxResults?: number;
  environmentId: string;
}
export const ListEnvironmentVlansRequest = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEnvironmentVlansRequest",
}) as any as S.Schema<ListEnvironmentVlansRequest>;
export type VlanList = Vlan[];
export const VlanList = S.Array(Vlan);
export interface ListEnvironmentVlansResponse {
  nextToken?: string;
  environmentVlans?: Vlan[];
}
export const ListEnvironmentVlansResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    environmentVlans: S.optional(VlanList),
  }),
).annotate({
  identifier: "ListEnvironmentVlansResponse",
}) as any as S.Schema<ListEnvironmentVlansResponse>;

//# Errors
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { message: S.String },
  T.Retryable(),
).pipe(C.withServerError, C.withRetryableError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  {
    message: S.String,
    retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
  },
  T.Retryable(),
).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.String, resourceId: S.String, resourceType: S.String },
).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { message: S.String },
).pipe(C.withQuotaError) {}
export class TagPolicyException extends S.TaggedErrorClass<TagPolicyException>()(
  "TagPolicyException",
  { message: S.String },
).pipe(C.withBadRequestError) {}
export class TooManyTagsException extends S.TaggedErrorClass<TooManyTagsException>()(
  "TooManyTagsException",
  { message: S.String },
).pipe(C.withBadRequestError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  {
    message: S.String,
    reason: ValidationExceptionReason,
    fieldList: S.optional(ValidationExceptionFieldList),
  },
).pipe(C.withBadRequestError) {}

//# Operations
/**
 * Returns information about VCF versions, ESX versions and EC2 instance types provided by Amazon EVS. For each VCF version, the response also includes the default ESX version and provided EC2 instance types.
 */
export const getVersions: API.OperationMethod<
  GetVersionsRequest,
  GetVersionsResponse,
  InternalServerException | ThrottlingException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVersionsRequest,
  output: GetVersionsResponse,
  errors: [InternalServerException, ThrottlingException],
}));
/**
 * Lists the tags for an Amazon EVS resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ResourceNotFoundException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [ResourceNotFoundException],
}));
/**
 * Associates the specified tags to an Amazon EVS resource with the specified `resourceArn`. If existing tags on a resource are not specified in the request parameters, they aren't changed. When a resource is deleted, the tags associated with that resource are also deleted. Tags that you create for Amazon EVS resources don't propagate to any other resources associated with the environment. For example, if you tag an environment with this operation, that tag doesn't automatically propagate to the VLAN subnets and hosts associated with the environment.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TagPolicyException
  | TooManyTagsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TagPolicyException,
    TooManyTagsException,
  ],
}));
/**
 * Deletes specified tags from an Amazon EVS resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  ResourceNotFoundException | TagPolicyException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [ResourceNotFoundException, TagPolicyException],
}));
/**
 * Creates an Amazon EVS environment that runs VCF software, such as SDDC Manager, NSX Manager, and vCenter Server.
 *
 * During environment creation, Amazon EVS performs validations on DNS settings, provisions VLAN subnets and hosts, and deploys the supplied version of VCF.
 *
 * It can take several hours to create an environment. After the deployment completes, you can configure VCF in the vSphere user interface according to your needs.
 *
 * When creating a new environment, the default ESX version for the selected VCF version will be used, you cannot choose a specific ESX version in `CreateEnvironment` action. When a host has been added with a specific ESX version, it can only be upgraded using vCenter Lifecycle Manager.
 *
 * You cannot use the `dedicatedHostId` and `placementGroupId` parameters together in the same `CreateEnvironment` action. This results in a `ValidationException` response.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentRequest,
  CreateEnvironmentResponse,
  ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateEnvironmentRequest,
  output: CreateEnvironmentResponse,
  errors: [ValidationException],
}));
/**
 * Returns a description of the specified environment.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentRequest,
  GetEnvironmentResponse,
  ResourceNotFoundException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetEnvironmentRequest,
  output: GetEnvironmentResponse,
  errors: [ResourceNotFoundException, ValidationException],
}));
/**
 * Deletes an Amazon EVS environment.
 *
 * Amazon EVS environments will only be enabled for deletion once the hosts are deleted. You can delete hosts using the `DeleteEnvironmentHost` action.
 *
 * Environment deletion also deletes the associated Amazon EVS VLAN subnets and Amazon Web Services Secrets Manager secrets that Amazon EVS created. Amazon Web Services resources that you create are not deleted. These resources may continue to incur costs.
 */
export const deleteEnvironment: API.OperationMethod<
  DeleteEnvironmentRequest,
  DeleteEnvironmentResponse,
  ResourceNotFoundException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentRequest,
  output: DeleteEnvironmentResponse,
  errors: [ResourceNotFoundException, ValidationException],
}));
/**
 * Lists the Amazon EVS environments in your Amazon Web Services account in the specified Amazon Web Services Region.
 */
export const listEnvironments: API.OperationMethod<
  ListEnvironmentsRequest,
  ListEnvironmentsResponse,
  ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListEnvironmentsRequest,
  ) => stream.Stream<
    ListEnvironmentsResponse,
    ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListEnvironmentsRequest,
  ) => stream.Stream<
    EnvironmentSummary,
    ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentsRequest,
  output: ListEnvironmentsResponse,
  errors: [ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environmentSummaries",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Associates an Elastic IP address with a public HCX VLAN. This operation is only allowed for public HCX VLANs at this time.
 */
export const associateEipToVlan: API.OperationMethod<
  AssociateEipToVlanRequest,
  AssociateEipToVlanResponse,
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateEipToVlanRequest,
  output: AssociateEipToVlanResponse,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
}));
/**
 * Creates an ESX host and adds it to an Amazon EVS environment. Amazon EVS supports 4-16 hosts per environment.
 *
 * This action can only be used after the Amazon EVS environment is deployed.
 *
 * You can use the `dedicatedHostId` parameter to specify an Amazon EC2 Dedicated Host for ESX host creation.
 *
 * You can use the `placementGroupId` parameter to specify a cluster or partition placement group to launch EC2 instances into.
 *
 * If you don't specify an ESX version when adding hosts using `CreateEnvironmentHost` action, Amazon EVS automatically uses the default ESX version associated with your environment's VCF version. To find the default ESX version for a particular VCF version, use the `GetVersions` action.
 *
 * You cannot use the `dedicatedHostId` and `placementGroupId` parameters together in the same `CreateEnvironmentHost` action. This results in a `ValidationException` response.
 */
export const createEnvironmentHost: API.OperationMethod<
  CreateEnvironmentHostRequest,
  CreateEnvironmentHostResponse,
  ThrottlingException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateEnvironmentHostRequest,
  output: CreateEnvironmentHostResponse,
  errors: [ThrottlingException, ValidationException],
}));
/**
 * Deletes a host from an Amazon EVS environment.
 *
 * Before deleting a host, you must unassign and decommission the host from within the SDDC Manager user interface. Not doing so could impact the availability of your virtual machines or result in data loss.
 */
export const deleteEnvironmentHost: API.OperationMethod<
  DeleteEnvironmentHostRequest,
  DeleteEnvironmentHostResponse,
  ResourceNotFoundException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentHostRequest,
  output: DeleteEnvironmentHostResponse,
  errors: [ResourceNotFoundException, ValidationException],
}));
/**
 * Disassociates an Elastic IP address from a public HCX VLAN. This operation is only allowed for public HCX VLANs at this time.
 */
export const disassociateEipFromVlan: API.OperationMethod<
  DisassociateEipFromVlanRequest,
  DisassociateEipFromVlanResponse,
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateEipFromVlanRequest,
  output: DisassociateEipFromVlanResponse,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
}));
/**
 * List the hosts within an environment.
 */
export const listEnvironmentHosts: API.OperationMethod<
  ListEnvironmentHostsRequest,
  ListEnvironmentHostsResponse,
  ResourceNotFoundException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListEnvironmentHostsRequest,
  ) => stream.Stream<
    ListEnvironmentHostsResponse,
    ResourceNotFoundException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListEnvironmentHostsRequest,
  ) => stream.Stream<
    Host,
    ResourceNotFoundException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentHostsRequest,
  output: ListEnvironmentHostsResponse,
  errors: [ResourceNotFoundException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environmentHosts",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists environment VLANs that are associated with the specified environment.
 */
export const listEnvironmentVlans: API.OperationMethod<
  ListEnvironmentVlansRequest,
  ListEnvironmentVlansResponse,
  ResourceNotFoundException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListEnvironmentVlansRequest,
  ) => stream.Stream<
    ListEnvironmentVlansResponse,
    ResourceNotFoundException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListEnvironmentVlansRequest,
  ) => stream.Stream<
    Vlan,
    ResourceNotFoundException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentVlansRequest,
  output: ListEnvironmentVlansResponse,
  errors: [ResourceNotFoundException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environmentVlans",
    pageSize: "maxResults",
  } as const,
}));
