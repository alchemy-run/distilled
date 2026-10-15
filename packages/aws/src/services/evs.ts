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
  sdkId: "evs",
  serviceShapeName: "AmazonElasticVMwareService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "evs" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-07-27");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
              `https://evs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://evs-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://evs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://evs.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://evs.{R}.{D}","properties":{},"headers":{}}');

export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class TagPolicyException
  extends /*@__PURE__*/ S.TaggedError<TagPolicyException>()(
    "TagPolicyException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(465, __c29, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ClientToken = string;
export type EnvironmentId = string;
export type AllocationId = string;
export interface AssociateEipToVlanRequest {
  clientToken?: string;
  environmentId: string;
  vlanName: string;
  allocationId: string;
}
export type VlanId = number;
export type Cidr = string;
export type SubnetId = string;
export type VlanState =
  | "CREATING"
  | "CREATED"
  | "DELETING"
  | "DELETED"
  | "CREATE_FAILED"
  | (string & {});
export type StateDetails = string;
export type AssociationId = string;
export type IpAddress = string;
export interface EipAssociation {
  associationId?: string;
  allocationId?: string;
  ipAddress?: string;
}
export type EipAssociationList = EipAssociation[];
export type NetworkAclId = string;
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
export interface AssociateEipToVlanResponse {
  vlan?: Vlan;
}
export type ConnectorId = string;
export type EntitlementType = "WINDOWS_SERVER" | (string & {});
export type VmId = string;
export type VmIdList = string[];
export interface CreateEntitlementRequest {
  clientToken?: string;
  environmentId: string;
  connectorId: string;
  entitlementType: EntitlementType;
  vmIds: string[];
}
export type VmName = string;
export type EntitlementStatus =
  | "CREATING"
  | "CREATED"
  | "DELETED"
  | "AT_RISK"
  | "ENTITLEMENT_REMOVED"
  | "CREATE_FAILED"
  | (string & {});
export interface ErrorDetail {
  errorCode: string;
  errorMessage: string;
}
export interface VmEntitlement {
  vmId?: string;
  environmentId?: string;
  connectorId?: string;
  vmName?: string;
  type?: EntitlementType;
  status?: EntitlementStatus;
  lastSyncedAt?: Date;
  startedAt?: Date;
  stoppedAt?: Date;
  errorDetail?: ErrorDetail;
}
export type VmEntitlementList = VmEntitlement[];
export interface CreateEntitlementResponse {
  entitlements?: VmEntitlement[];
}
export type EnvironmentName = string;
export type TagKey = string;
export type TagValue = string;
export type RequestTagMap = { [key: string]: string | undefined };
export type SecurityGroupId = string;
export type SecurityGroups = string[];
export interface ServiceAccessSecurityGroups {
  securityGroups?: string[];
}
export type VpcId = string;
export type VcfVersion = "VCF-5.2.1" | "VCF-5.2.2" | "SELF_DEPLOYED" | (string & {});
export interface InitialVlanInfo {
  cidr: string;
}
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
export type RouteServerPeering = string;
export type RouteServerPeeringList = string[];
export interface ConnectivityInfo {
  privateRouteServerPeerings: string[];
}
export type SolutionKey = string | redacted.Redacted<string>;
export type VSanLicenseKey = string | redacted.Redacted<string>;
export interface LicenseInfo {
  solutionKey: string | redacted.Redacted<string>;
  vsanKey: string | redacted.Redacted<string>;
}
export type LicenseInfoList = LicenseInfo[];
export type HostName = string;
export type KeyName = string;
export type InstanceType = "i4i.metal" | "i7i.metal-24xl" | "i7i.metal-48xl" | (string & {});
export type PlacementGroupId = string;
export type DedicatedHostId = string;
export interface HostInfoForCreate {
  hostName: string;
  keyName: string;
  instanceType: InstanceType;
  placementGroupId?: string;
  dedicatedHostId?: string;
}
export type HostInfoForCreateList = HostInfoForCreate[];
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
  initialVlans: InitialVlans;
  connectivityInfo?: ConnectivityInfo;
  licenseInfo?: LicenseInfo[];
  hosts?: HostInfoForCreate[];
  vcfHostnames?: VcfHostnames;
  siteId?: string;
}
export type EnvironmentState =
  | "CREATING"
  | "CREATED"
  | "DELETING"
  | "DELETED"
  | "CREATE_FAILED"
  | (string & {});
export type Arn = string;
export type CheckResult = "PASSED" | "FAILED" | "UNKNOWN" | (string & {});
export type CheckType =
  | "KEY_REUSE"
  | "KEY_COVERAGE"
  | "REACHABILITY"
  | "HOST_COUNT"
  | "VCENTER_REACHABILITY"
  | "VCENTER_VM_SYNC"
  | "VCENTER_VM_EVENT"
  | "OPERATIONS_MANAGER_REACHABILITY"
  | "SDDC_MANAGER_REACHABILITY"
  | "SDDC_MANAGER_HOST_COUNT"
  | "SDDC_MANAGER_KEY_COVERAGE"
  | "SDDC_MANAGER_KEY_REUSE"
  | "CONNECTOR_HEALTH"
  | (string & {});
export interface Check {
  type?: CheckType;
  id?: string;
  result?: CheckResult;
  impairedSince?: Date;
}
export type ChecksList = Check[];
export interface Secret {
  secretArn?: string;
}
export type SecretList = Secret[];
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
export interface CreateEnvironmentResponse {
  environment?: Environment;
}
export type ConnectorType = "OPERATIONS_MANAGER" | "SDDC_MANAGER" | "VCENTER" | (string & {});
export type ApplianceFqdn = string;
export type SecretIdentifier = string;
export interface CreateEnvironmentConnectorRequest {
  clientToken?: string;
  environmentId: string;
  type: ConnectorType;
  applianceFqdn: string;
  secretIdentifier: string;
}
export type ConnectorState =
  | "CREATING"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export interface ConnectorCheck {
  type?: CheckType;
  result?: CheckResult;
  lastCheckAttempt?: Date;
  impairedSince?: Date;
}
export type ConnectorsChecksList = ConnectorCheck[];
export interface Connector {
  environmentId?: string;
  connectorId?: string;
  type?: ConnectorType;
  applianceFqdn?: string;
  secretArn?: string;
  state?: ConnectorState;
  stateDetails?: string;
  status?: CheckResult;
  checks?: ConnectorCheck[];
  createdAt?: Date;
  modifiedAt?: Date;
}
export interface CreateEnvironmentConnectorResponse {
  connector?: Connector;
}
export type EsxVersion = string;
export interface CreateEnvironmentHostRequest {
  clientToken?: string;
  environmentId: string;
  host: HostInfoForCreate;
  esxVersion?: string;
}
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
export type HostState =
  | "CREATING"
  | "CREATED"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | (string & {});
export type NetworkInterfaceId = string;
export interface NetworkInterface {
  networkInterfaceId?: string;
}
export type NetworkInterfaceList = NetworkInterface[];
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
export interface CreateEnvironmentHostResponse {
  environmentSummary?: EnvironmentSummary;
  host?: Host;
}
export interface DeleteEntitlementRequest {
  clientToken?: string;
  environmentId: string;
  connectorId: string;
  entitlementType: EntitlementType;
  vmIds: string[];
}
export interface DeleteEntitlementResponse {
  entitlements?: VmEntitlement[];
}
export interface DeleteEnvironmentRequest {
  clientToken?: string;
  environmentId: string;
}
export interface DeleteEnvironmentResponse {
  environment?: Environment;
}
export interface DeleteEnvironmentConnectorRequest {
  clientToken?: string;
  environmentId: string;
  connectorId: string;
}
export interface DeleteEnvironmentConnectorResponse {
  connector?: Connector;
  environmentSummary?: EnvironmentSummary;
}
export interface DeleteEnvironmentHostRequest {
  clientToken?: string;
  environmentId: string;
  hostName: string;
}
export interface DeleteEnvironmentHostResponse {
  environmentSummary?: EnvironmentSummary;
  host?: Host;
}
export interface DisassociateEipFromVlanRequest {
  clientToken?: string;
  environmentId: string;
  vlanName: string;
  associationId: string;
}
export interface DisassociateEipFromVlanResponse {
  vlan?: Vlan;
}
export interface GetAccountSettingsRequest {}
export type SettingName = string;
export type SettingValue = string;
export interface AccountSetting {
  name: string;
  value: string;
}
export type AccountSettingList = AccountSetting[];
export interface GetAccountSettingsResponse {
  settings?: AccountSetting[];
}
export interface GetDepotUrlRequest {
  environmentId: string;
  rotate?: boolean;
}
export interface GetDepotUrlResponse {
  depotUrl: string;
  token: string;
}
export interface GetEnvironmentRequest {
  environmentId: string;
}
export interface GetEnvironmentResponse {
  environment?: Environment;
}
export interface GetVersionsRequest {}
export type InstanceTypeList = InstanceType[];
export interface VcfVersionInfo {
  vcfVersion: VcfVersion;
  status: string;
  defaultEsxVersion: string;
  instanceTypes: InstanceType[];
}
export type VcfVersionList = VcfVersionInfo[];
export type EsxVersionList = string[];
export interface InstanceTypeEsxVersionsInfo {
  instanceType: InstanceType;
  esxVersions: string[];
}
export type InstanceTypeEsxVersionsList = InstanceTypeEsxVersionsInfo[];
export interface GetVersionsResponse {
  vcfVersions: VcfVersionInfo[];
  instanceTypeEsxVersions: InstanceTypeEsxVersionsInfo[];
}
export type PaginationToken = string;
export type MaxResults = number;
export interface ListEnvironmentConnectorsRequest {
  nextToken?: string;
  maxResults?: number;
  environmentId: string;
}
export type ConnectorList = Connector[];
export interface ListEnvironmentConnectorsResponse {
  nextToken?: string;
  connectors?: Connector[];
}
export interface ListEnvironmentHostsRequest {
  nextToken?: string;
  maxResults?: number;
  environmentId: string;
}
export type HostList = Host[];
export interface ListEnvironmentHostsResponse {
  nextToken?: string;
  environmentHosts?: Host[];
}
export type EnvironmentStateList = EnvironmentState[];
export interface ListEnvironmentsRequest {
  nextToken?: string;
  maxResults?: number;
  state?: EnvironmentState[];
}
export type EnvironmentSummaryList = EnvironmentSummary[];
export interface ListEnvironmentsResponse {
  nextToken?: string;
  environmentSummaries?: EnvironmentSummary[];
}
export interface ListEnvironmentVlansRequest {
  nextToken?: string;
  maxResults?: number;
  environmentId: string;
}
export type VlanList = Vlan[];
export interface ListEnvironmentVlansResponse {
  nextToken?: string;
  environmentVlans?: Vlan[];
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export type ResponseTagMap = { [key: string]: string | undefined };
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface ListVmEntitlementsRequest {
  nextToken?: string;
  maxResults?: number;
  environmentId: string;
  connectorId: string;
  entitlementType: EntitlementType;
}
export interface ListVmEntitlementsResponse {
  nextToken?: string;
  entitlements?: VmEntitlement[];
}
export interface PutAccountSettingsRequest {
  settings: AccountSetting[];
}
export interface PutAccountSettingsResponse {
  settings?: AccountSetting[];
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateEnvironmentConnectorRequest {
  clientToken?: string;
  environmentId: string;
  connectorId: string;
  applianceFqdn?: string;
  secretIdentifier?: string;
}
export interface UpdateEnvironmentConnectorResponse {
  connector?: Connector;
}
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AssociateEipToVlanError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates an Elastic IP address with a public HCX VLAN. This operation is only allowed for public HCX VLANs at this time.
 */
export const associateEipToVlan: API.OperationMethod<
  AssociateEipToVlanRequest,
  AssociateEipToVlanResponse,
  AssociateEipToVlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<AssociateEipToVlanRequest>,
  output: __S(496, __c31, 0) as any as S.Schema<AssociateEipToVlanResponse>,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateEipToVlan",
}));

export type CreateEntitlementError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Windows Server License entitlement for virtual machines in an Amazon EVS environment using the provided vCenter Server connector. This is an asynchronous operation. Amazon EVS validates the specified virtual machines before starting usage tracking.
 */
export const createEntitlement: API.OperationMethod<
  CreateEntitlementRequest,
  CreateEntitlementResponse,
  CreateEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<CreateEntitlementRequest>,
  output: __S(544, __c34, 0) as any as S.Schema<CreateEntitlementResponse>,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEntitlement",
}));

export type CreateEnvironmentError = ValidationException | CommonErrors;
/**
 * Creates an Amazon EVS environment that runs VCF software, such as SDDC Manager, NSX Manager, and vCenter Server.
 *
 * When you specify `SELF_DEPLOYED` for `vcfVersion`, Amazon EVS provisions only the VLAN subnets; no hosts are added and no VCF installation is performed. After the environment is created, you can add hosts with `CreateEnvironmentHost` and install VCF yourself. The `licenseInfo`, `hosts`, `vcfHostnames`, `siteId`, and `connectivityInfo` parameters are not supported in this mode.
 *
 * When you specify any other VCF version, Amazon EVS installs and configures VCF for you. For more information, see Self-deployed mode in the *Amazon EVS User Guide*.
 *
 * When Amazon EVS installs VCF, the default ESX version for the selected VCF version will be used. After a host is added with a specific ESX version, it can only be upgraded using vCenter Lifecycle Manager.
 *
 * You cannot use the `dedicatedHostId` and `placementGroupId` parameters together in the same `CreateEnvironment` action. This results in a `ValidationException` response.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentRequest,
  CreateEnvironmentResponse,
  CreateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(595, __c37, 3) as any as S.Schema<CreateEnvironmentRequest>,
  output: __S(634, __c39, 10) as any as S.Schema<CreateEnvironmentResponse>,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironment",
}));

export type CreateEnvironmentConnectorError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a connector for an Amazon EVS environment. A connector allows the Amazon EVS control plane to interface with VCF appliances using a fully qualified domain name.
 *
 * You can create only one connector of each type per environment. For environments where Amazon EVS installs VCF, the `SDDC_MANAGER` connector is created automatically.
 *
 * Amazon EVS requires an active connector to SDDC Manager or VCF Operations Manager to monitor environment health and license compliance.
 */
export const createEnvironmentConnector: API.OperationMethod<
  CreateEnvironmentConnectorRequest,
  CreateEnvironmentConnectorResponse,
  CreateEnvironmentConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateEnvironmentConnectorRequest>,
  output: __S(32, __c2, 0) as any as S.Schema<CreateEnvironmentConnectorResponse>,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironmentConnector",
}));

export type CreateEnvironmentHostError = ThrottlingException | ValidationException | CommonErrors;
/**
 * Creates an ESX host and adds it to an Amazon EVS environment.
 *
 * This action can only be used after the Amazon EVS environment is deployed.
 *
 * You can use the `dedicatedHostId` parameter to specify an Amazon EC2 Dedicated Host for ESX host creation.
 *
 * You can use the `placementGroupId` parameter to specify a cluster or partition placement group to launch EC2 instances into.
 *
 * If you don't specify an ESX version when adding hosts using `CreateEnvironmentHost` action, Amazon EVS automatically uses the default ESX version for your environment's VCF version. To find the available ESX versions for a particular VCF version, use the `GetVersions` action.
 *
 * You cannot use the `dedicatedHostId` and `placementGroupId` parameters together in the same `CreateEnvironmentHost` action. This results in a `ValidationException` response.
 */
export const createEnvironmentHost: API.OperationMethod<
  CreateEnvironmentHostRequest,
  CreateEnvironmentHostResponse,
  CreateEnvironmentHostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<CreateEnvironmentHostRequest>,
  output: __S(80, __c5, 0) as any as S.Schema<CreateEnvironmentHostResponse>,
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironmentHost",
}));

export type DeleteEntitlementError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Windows Server License entitlement for virtual machines in an Amazon EVS environment. Deleting an entitlement stops usage tracking for the specified virtual machines.
 */
export const deleteEntitlement: API.OperationMethod<
  DeleteEntitlementRequest,
  DeleteEntitlementResponse,
  DeleteEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<DeleteEntitlementRequest>,
  output: __S(544, __c34, 0) as any as S.Schema<DeleteEntitlementResponse>,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEntitlement",
}));

export type DeleteEnvironmentError = ResourceNotFoundException | ValidationException | CommonErrors;
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
  DeleteEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<DeleteEnvironmentRequest>,
  output: __S(634, __c39, 10) as any as S.Schema<DeleteEnvironmentResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironment",
}));

export type DeleteEnvironmentConnectorError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a connector from an Amazon EVS environment.
 *
 * Before deleting a connector, you must remove all entitlements that are associated with the same vCenter.
 */
export const deleteEnvironmentConnector: API.OperationMethod<
  DeleteEnvironmentConnectorRequest,
  DeleteEnvironmentConnectorResponse,
  DeleteEnvironmentConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<DeleteEnvironmentConnectorRequest>,
  output: __S(145, __c9, 1) as any as S.Schema<DeleteEnvironmentConnectorResponse>,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironmentConnector",
}));

export type DeleteEnvironmentHostError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a host from an Amazon EVS environment.
 *
 * Before deleting a host, you must unassign and decommission the host from within the SDDC Manager user interface. Not doing so could impact the availability of your virtual machines or result in data loss.
 */
export const deleteEnvironmentHost: API.OperationMethod<
  DeleteEnvironmentHostRequest,
  DeleteEnvironmentHostResponse,
  DeleteEnvironmentHostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<DeleteEnvironmentHostRequest>,
  output: __S(80, __c5, 0) as any as S.Schema<DeleteEnvironmentHostResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironmentHost",
}));

export type DisassociateEipFromVlanError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates an Elastic IP address from a public HCX VLAN. This operation is only allowed for public HCX VLANs at this time.
 */
export const disassociateEipFromVlan: API.OperationMethod<
  DisassociateEipFromVlanRequest,
  DisassociateEipFromVlanResponse,
  DisassociateEipFromVlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<DisassociateEipFromVlanRequest>,
  output: __S(496, __c31, 0) as any as S.Schema<DisassociateEipFromVlanResponse>,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateEipFromVlan",
}));

export type GetAccountSettingsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the configured EVS settings for your Amazon Web Services account in the specified Amazon Web Services Region. If no settings have been set, an empty list is returned.
 */
export const getAccountSettings: API.OperationMethod<
  GetAccountSettingsRequest,
  GetAccountSettingsResponse,
  GetAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<GetAccountSettingsRequest>,
  output: __S(210, __c13, 2) as any as S.Schema<GetAccountSettingsResponse>,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSettings",
}));

export type GetDepotUrlError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a URL and authentication token for accessing the Amazon EVS Custom Addon depot. Configure the depot URL as a download source in vSphere Lifecycle Manager (vLCM) to sync and install the Amazon EVS Custom Addon.
 *
 * The depot URL remains active until you rotate the authentication token by calling this action with `rotate` set to `true`.
 */
export const getDepotUrl: API.OperationMethod<
  GetDepotUrlRequest,
  GetDepotUrlResponse,
  GetDepotUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<GetDepotUrlRequest>,
  output: __S(225, __c14, 1) as any as S.Schema<GetDepotUrlResponse>,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDepotUrl",
}));

export type GetEnvironmentError = ResourceNotFoundException | ValidationException | CommonErrors;
/**
 * Returns a description of the specified environment.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentRequest,
  GetEnvironmentResponse,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<GetEnvironmentRequest>,
  output: __S(634, __c39, 10) as any as S.Schema<GetEnvironmentResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
}));

export type GetVersionsError = InternalServerException | ThrottlingException | CommonErrors;
/**
 * Returns information about VCF versions, ESX versions and EC2 instance types provided by Amazon EVS. For each VCF version, the response also includes the default ESX version and provided EC2 instance types.
 */
export const getVersions: API.OperationMethod<
  GetVersionsRequest,
  GetVersionsResponse,
  GetVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<GetVersionsRequest>,
  output: __S(261, __c16, 5) as any as S.Schema<GetVersionsResponse>,
  errors: [InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVersions",
}));

export type ListEnvironmentConnectorsError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the connectors within an environment. Returns the status of each connector and its applicable checks, among other connector details.
 */
export const listEnvironmentConnectors: API.PaginatedOperationMethod<
  ListEnvironmentConnectorsRequest,
  ListEnvironmentConnectorsResponse,
  ListEnvironmentConnectorsError,
  Credentials | HttpClient.HttpClient,
  Connector
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<ListEnvironmentConnectorsRequest>,
  output: __S(290, __c18, 2) as any as S.Schema<ListEnvironmentConnectorsResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentConnectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "connectors",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentHostsError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List the hosts within an environment.
 */
export const listEnvironmentHosts: API.PaginatedOperationMethod<
  ListEnvironmentHostsRequest,
  ListEnvironmentHostsResponse,
  ListEnvironmentHostsError,
  Credentials | HttpClient.HttpClient,
  Host
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<ListEnvironmentHostsRequest>,
  output: __S(306, __c19, 2) as any as S.Schema<ListEnvironmentHostsResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentHosts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environmentHosts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentsError = ValidationException | CommonErrors;
/**
 * Lists the Amazon EVS environments in your Amazon Web Services account in the specified Amazon Web Services Region.
 */
export const listEnvironments: API.PaginatedOperationMethod<
  ListEnvironmentsRequest,
  ListEnvironmentsResponse,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<ListEnvironmentsRequest>,
  output: __S(322, __c20, 2) as any as S.Schema<ListEnvironmentsResponse>,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environmentSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentVlansError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists environment VLANs that are associated with the specified environment.
 */
export const listEnvironmentVlans: API.PaginatedOperationMethod<
  ListEnvironmentVlansRequest,
  ListEnvironmentVlansResponse,
  ListEnvironmentVlansError,
  Credentials | HttpClient.HttpClient,
  Vlan
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<ListEnvironmentVlansRequest>,
  output: __S(338, __c21, 2) as any as S.Schema<ListEnvironmentVlansResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironmentVlans",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environmentVlans",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Lists the tags for an Amazon EVS resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(353, __c22, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListVmEntitlementsError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Windows Server License entitlements for virtual machines in an Amazon EVS environment. Returns existing entitlements for virtual machines associated with the specified environment and connector.
 */
export const listVmEntitlements: API.PaginatedOperationMethod<
  ListVmEntitlementsRequest,
  ListVmEntitlementsResponse,
  ListVmEntitlementsError,
  Credentials | HttpClient.HttpClient,
  VmEntitlement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<ListVmEntitlementsRequest>,
  output: __S(369, __c23, 1) as any as S.Schema<ListVmEntitlementsResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVmEntitlements",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "entitlements",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutAccountSettingsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates account-level EVS settings for your Amazon Web Services account in the specified Amazon Web Services Region.
 *
 * EVS settings included in the request are created or overwritten. Settings omitted from the request retain their current values.
 */
export const putAccountSettings: API.OperationMethod<
  PutAccountSettingsRequest,
  PutAccountSettingsResponse,
  PutAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<PutAccountSettingsRequest>,
  output: __S(210, __c13, 2) as any as S.Schema<PutAccountSettingsResponse>,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountSettings",
}));

export type TagResourceError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TagPolicyException
  | TooManyTagsException
  | CommonErrors;
/**
 * Associates the specified tags to an Amazon EVS resource with the specified `resourceArn`. If existing tags on a resource are not specified in the request parameters, they aren't changed. When a resource is deleted, the tags associated with that resource are also deleted. Tags that you create for Amazon EVS resources don't propagate to any other resources associated with the environment. For example, if you tag an environment with this operation, that tag doesn't automatically propagate to the VLAN subnets and hosts associated with the environment.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TagPolicyException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ResourceNotFoundException | TagPolicyException | CommonErrors;
/**
 * Deletes specified tags from an Amazon EVS resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(416, __c26, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ResourceNotFoundException, TagPolicyException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateEnvironmentConnectorError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a connector for an Amazon EVS environment. You can update the Amazon Web Services Secrets Manager secret ARN or the appliance FQDN to reconfigure the connector metadata.
 *
 * You cannot update both the secret and the FQDN in the same request.
 */
export const updateEnvironmentConnector: API.OperationMethod<
  UpdateEnvironmentConnectorRequest,
  UpdateEnvironmentConnectorResponse,
  UpdateEnvironmentConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<UpdateEnvironmentConnectorRequest>,
  output: __S(32, __c2, 0) as any as S.Schema<UpdateEnvironmentConnectorResponse>,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironmentConnector",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          type: S.String,
          applianceFqdn: S.String,
          secretIdentifier: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEnvironmentConnectorRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          result: S.optional(S.String),
          lastCheckAttempt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          impairedSince: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ConnectorCheck" });
    case 1:
      return S.Array(__S(16, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.optional(S.String),
          connectorId: S.optional(S.String),
          type: S.optional(S.String),
          applianceFqdn: S.optional(S.String),
          secretArn: S.optional(S.String),
          state: S.optional(S.String),
          stateDetails: S.optional(S.String),
          status: S.optional(S.String),
          checks: S.optional(__S(17, __c1, 1)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Connector" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ connector: S.optional(__S(18, __c1, 2)) })).annotate({
        identifier: "CreateEnvironmentConnectorResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          environmentId: S.String,
          host: __S(608, __c38, 0),
          esxVersion: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEnvironmentHostRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.optional(S.String),
          environmentName: S.optional(S.String),
          vcfVersion: S.optional(S.String),
          environmentStatus: S.optional(S.String),
          environmentState: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          environmentArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "EnvironmentSummary" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentSummary: S.optional(__S(64, __c4, 0)),
          host: S.optional(__S(98, __c6, 2)),
        }),
      ).annotate({ identifier: "CreateEnvironmentHostResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ networkInterfaceId: S.optional(S.String) })).annotate({
        identifier: "NetworkInterface",
      });
    case 1:
      return S.Array(__S(96, __c6, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          hostName: S.optional(S.String),
          ipAddress: S.optional(S.String),
          keyName: S.optional(S.String),
          instanceType: S.optional(S.String),
          placementGroupId: S.optional(S.String),
          dedicatedHostId: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          hostState: S.optional(S.String),
          stateDetails: S.optional(S.String),
          ec2InstanceId: S.optional(S.String),
          networkInterfaces: S.optional(__S(97, __c6, 1)),
        }),
      ).annotate({ identifier: "Host" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          environmentId: S.String,
          connectorId: S.String,
          entitlementType: S.String,
          vmIds: __S(576, __c36, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteEntitlementRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteEnvironmentRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          connectorId: S.String.pipe(T.HttpLabel("connectorId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteEnvironmentConnectorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          connector: S.optional(__S(18, __c1, 2)),
          environmentSummary: S.optional(__S(64, __c4, 0)),
        }),
      ).annotate({ identifier: "DeleteEnvironmentConnectorResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          environmentId: S.String,
          hostName: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteEnvironmentHostRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          environmentId: S.String,
          vlanName: S.String,
          associationId: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateEipFromVlanRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAccountSettingsRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, value: S.String })).annotate({
        identifier: "AccountSetting",
      });
    case 1:
      return S.Array(__S(208, __c13, 0));
    case 2:
      return S.suspend(() => S.Struct({ settings: S.optional(__S(209, __c13, 1)) })).annotate({
        identifier: "GetAccountSettingsResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          rotate: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetDepotUrlRequest" });
    case 1:
      return S.suspend(() => S.Struct({ depotUrl: S.String, token: S.String })).annotate({
        identifier: "GetDepotUrlResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ environmentId: S.String.pipe(T.HttpLabel("environmentId")) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEnvironmentRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vcfVersion: S.String,
          status: S.String,
          defaultEsxVersion: S.String,
          instanceTypes: __S(272, __c17, 0),
        }),
      ).annotate({ identifier: "VcfVersionInfo" });
    case 2:
      return S.Array(__S(257, __c16, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ instanceType: S.String, esxVersions: __S(576, __c36, 0) }),
      ).annotate({ identifier: "InstanceTypeEsxVersionsInfo" });
    case 4:
      return S.Array(__S(259, __c16, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ vcfVersions: __S(258, __c16, 2), instanceTypeEsxVersions: __S(260, __c16, 4) }),
      ).annotate({ identifier: "GetVersionsResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEnvironmentConnectorsRequest" });
    case 1:
      return S.Array(__S(18, __c1, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), connectors: S.optional(__S(289, __c18, 1)) }),
      ).annotate({ identifier: "ListEnvironmentConnectorsResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEnvironmentHostsRequest" });
    case 1:
      return S.Array(__S(98, __c6, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          environmentHosts: S.optional(__S(305, __c19, 1)),
        }),
      ).annotate({ identifier: "ListEnvironmentHostsResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          state: S.optional(__S(272, __c17, 0)).pipe(T.HttpQuery("state")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEnvironmentsRequest" });
    case 1:
      return S.Array(__S(64, __c4, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          environmentSummaries: S.optional(__S(321, __c20, 1)),
        }),
      ).annotate({ identifier: "ListEnvironmentsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEnvironmentVlansRequest" });
    case 1:
      return S.Array(__S(514, __c32, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          environmentVlans: S.optional(__S(337, __c21, 1)),
        }),
      ).annotate({ identifier: "ListEnvironmentVlansResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(640, __c40, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          environmentId: S.String,
          connectorId: S.String,
          entitlementType: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListVmEntitlementsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), entitlements: S.optional(__S(562, __c35, 2)) }),
      ).annotate({ identifier: "ListVmEntitlementsResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ settings: __S(209, __c13, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutAccountSettingsRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(640, __c40, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(576, __c36, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          connectorId: S.String.pipe(T.HttpLabel("connectorId")),
          applianceFqdn: S.optional(S.String),
          secretIdentifier: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateEnvironmentConnectorRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(464, __c29, 0));
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          environmentId: S.String,
          vlanName: S.String,
          allocationId: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateEipToVlanRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ vlan: S.optional(__S(514, __c32, 2)) })).annotate({
        identifier: "AssociateEipToVlanResponse",
      });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          associationId: S.optional(S.String),
          allocationId: S.optional(S.String),
          ipAddress: S.optional(S.String),
        }),
      ).annotate({ identifier: "EipAssociation" });
    case 1:
      return S.Array(__S(512, __c32, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          vlanId: S.optional(S.Number),
          cidr: S.optional(S.String),
          availabilityZone: S.optional(S.String),
          functionName: S.optional(S.String),
          subnetId: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          vlanState: S.optional(S.String),
          stateDetails: S.optional(S.String),
          eipAssociations: S.optional(__S(513, __c32, 1)),
          isPublic: S.optional(S.Boolean),
          networkAclId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Vlan" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          environmentId: S.String,
          connectorId: S.String,
          entitlementType: S.String,
          vmIds: __S(576, __c36, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEntitlementRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ entitlements: S.optional(__S(562, __c35, 2)) })).annotate({
        identifier: "CreateEntitlementResponse",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ errorCode: S.String, errorMessage: S.String })).annotate({
        identifier: "ErrorDetail",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vmId: S.optional(S.String),
          environmentId: S.optional(S.String),
          connectorId: S.optional(S.String),
          vmName: S.optional(S.String),
          type: S.optional(S.String),
          status: S.optional(S.String),
          lastSyncedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          stoppedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          errorDetail: S.optional(__S(560, __c35, 0)),
        }),
      ).annotate({ identifier: "VmEntitlement" });
    case 2:
      return S.Array(__S(561, __c35, 1));
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ cidr: S.String })).annotate({
        identifier: "InitialVlanInfo",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vmkManagement: __S(592, __c37, 0),
          vmManagement: __S(592, __c37, 0),
          vMotion: __S(592, __c37, 0),
          vSan: __S(592, __c37, 0),
          vTep: __S(592, __c37, 0),
          edgeVTep: __S(592, __c37, 0),
          nsxUplink: __S(592, __c37, 0),
          hcx: __S(592, __c37, 0),
          expansionVlan1: __S(592, __c37, 0),
          expansionVlan2: __S(592, __c37, 0),
          isHcxPublic: S.optional(S.Boolean),
          hcxNetworkAclId: S.optional(S.String),
        }),
      ).annotate({ identifier: "InitialVlans" });
    case 2:
      return S.Array(__S(608, __c38, 0));
    case 3:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          environmentName: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          tags: S.optional(__S(640, __c40, 0)),
          serviceAccessSecurityGroups: S.optional(__S(624, __c39, 0)),
          vpcId: S.String,
          serviceAccessSubnetId: S.String,
          vcfVersion: S.String,
          termsAccepted: S.Boolean,
          initialVlans: __S(593, __c37, 1),
          connectivityInfo: S.optional(__S(625, __c39, 1)),
          licenseInfo: S.optional(__S(627, __c39, 3)),
          hosts: S.optional(__S(594, __c37, 2)),
          vcfHostnames: S.optional(__S(628, __c39, 4)),
          siteId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEnvironmentRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          hostName: S.String,
          keyName: S.String,
          instanceType: S.String,
          placementGroupId: S.optional(S.String),
          dedicatedHostId: S.optional(S.String),
        }),
      ).annotate({ identifier: "HostInfoForCreate" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ securityGroups: S.optional(__S(576, __c36, 0)) })).annotate(
        { identifier: "ServiceAccessSecurityGroups" },
      );
    case 1:
      return S.suspend(() => S.Struct({ privateRouteServerPeerings: __S(576, __c36, 0) })).annotate(
        { identifier: "ConnectivityInfo" },
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ solutionKey: SensitiveString, vsanKey: SensitiveString }),
      ).annotate({ identifier: "LicenseInfo" });
    case 3:
      return S.Array(__S(626, __c39, 2));
    case 4:
      return S.suspend(() =>
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
      ).annotate({ identifier: "VcfHostnames" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          result: S.optional(S.String),
          impairedSince: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Check" });
    case 6:
      return S.Array(__S(629, __c39, 5));
    case 7:
      return S.suspend(() => S.Struct({ secretArn: S.optional(S.String) })).annotate({
        identifier: "Secret",
      });
    case 8:
      return S.Array(__S(631, __c39, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.optional(S.String),
          environmentState: S.optional(S.String),
          stateDetails: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          environmentArn: S.optional(S.String),
          environmentName: S.optional(S.String),
          vpcId: S.optional(S.String),
          serviceAccessSubnetId: S.optional(S.String),
          vcfVersion: S.optional(S.String),
          termsAccepted: S.optional(S.Boolean),
          licenseInfo: S.optional(__S(627, __c39, 3)),
          siteId: S.optional(S.String),
          environmentStatus: S.optional(S.String),
          checks: S.optional(__S(630, __c39, 6)),
          connectivityInfo: S.optional(__S(625, __c39, 1)),
          vcfHostnames: S.optional(__S(628, __c39, 4)),
          kmsKeyId: S.optional(S.String),
          serviceAccessSecurityGroups: S.optional(__S(624, __c39, 0)),
          credentials: S.optional(__S(632, __c39, 8)),
        }),
      ).annotate({ identifier: "Environment" });
    case 10:
      return S.suspend(() => S.Struct({ environment: S.optional(__S(633, __c39, 9)) })).annotate({
        identifier: "CreateEnvironmentResponse",
      });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
