import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "evs",
  target: "AmazonElasticVMwareService",
  version: "2023-07-27",
  sigv4: "evs",
  protocol: awsJson1_0Protocol,
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
  },
};

export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class TagPolicyException
  extends /*@__PURE__*/ TE.TaggedError(
    "TagPolicyException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: ValidationExceptionReason;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
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
export type VcfVersion =
  | "VCF-5.2.1"
  | "VCF-5.2.2"
  | "SELF_DEPLOYED"
  | (string & {});
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
export type InstanceType =
  | "i4i.metal"
  | "i7i.metal-24xl"
  | "i7i.metal-48xl"
  | (string & {});
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
export type ConnectorType =
  | "OPERATIONS_MANAGER"
  | "SDDC_MANAGER"
  | "VCENTER"
  | (string & {});
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
  descriptor: {
    service: svc,
    input: {
      clientToken: D.m({ idempotency: true }),
      environmentId: 0,
      vlanName: 0,
      allocationId: 0,
    },
    output: { vlan: o_Vlan },
  },
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateEipToVlan",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      clientToken: D.m({ idempotency: true }),
      environmentId: 0,
      connectorId: 0,
      entitlementType: 0,
      vmIds: 0,
    },
    output: { entitlements: D.list(o_VmEntitlement) },
  },
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEntitlement",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      clientToken: D.m({ idempotency: true }),
      environmentName: 0,
      kmsKeyId: 0,
      tags: 0,
      serviceAccessSecurityGroups: { securityGroups: 0 },
      vpcId: 0,
      serviceAccessSubnetId: 0,
      vcfVersion: 0,
      termsAccepted: 0,
      initialVlans: {
        vmkManagement: i_InitialVlanInfo,
        vmManagement: i_InitialVlanInfo,
        vMotion: i_InitialVlanInfo,
        vSan: i_InitialVlanInfo,
        vTep: i_InitialVlanInfo,
        edgeVTep: i_InitialVlanInfo,
        nsxUplink: i_InitialVlanInfo,
        hcx: i_InitialVlanInfo,
        expansionVlan1: i_InitialVlanInfo,
        expansionVlan2: i_InitialVlanInfo,
        isHcxPublic: 0,
        hcxNetworkAclId: 0,
      },
      connectivityInfo: { privateRouteServerPeerings: 0 },
      licenseInfo: D.list({ solutionKey: 0, vsanKey: 0 }),
      hosts: D.list(i_HostInfoForCreate),
      vcfHostnames: {
        vCenter: 0,
        nsx: 0,
        nsxManager1: 0,
        nsxManager2: 0,
        nsxManager3: 0,
        nsxEdge1: 0,
        nsxEdge2: 0,
        sddcManager: 0,
        cloudBuilder: 0,
      },
      siteId: 0,
    },
    output: { environment: o_Environment },
  },
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironment",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      clientToken: D.m({ idempotency: true }),
      environmentId: 0,
      type: 0,
      applianceFqdn: 0,
      secretIdentifier: 0,
    },
    output: { connector: o_Connector },
  },
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironmentConnector",
})) as any;

export type CreateEnvironmentHostError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      clientToken: D.m({ idempotency: true }),
      environmentId: 0,
      host: i_HostInfoForCreate,
      esxVersion: 0,
    },
    output: { environmentSummary: o_EnvironmentSummary, host: o_Host },
  },
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironmentHost",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      clientToken: D.m({ idempotency: true }),
      environmentId: 0,
      connectorId: 0,
      entitlementType: 0,
      vmIds: 0,
    },
    output: { entitlements: D.list(o_VmEntitlement) },
  },
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEntitlement",
})) as any;

export type DeleteEnvironmentError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: { clientToken: D.m({ idempotency: true }), environmentId: 0 },
    output: { environment: o_Environment },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironment",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      clientToken: D.m({ idempotency: true }),
      environmentId: 0,
      connectorId: 0,
    },
    output: {
      connector: o_Connector,
      environmentSummary: o_EnvironmentSummary,
    },
  },
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironmentConnector",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      clientToken: D.m({ idempotency: true }),
      environmentId: 0,
      hostName: 0,
    },
    output: { environmentSummary: o_EnvironmentSummary, host: o_Host },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironmentHost",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      clientToken: D.m({ idempotency: true }),
      environmentId: 0,
      vlanName: 0,
      associationId: 0,
    },
    output: { vlan: o_Vlan },
  },
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateEipFromVlan",
})) as any;

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
  descriptor: { service: svc, input: { environmentId: 0, rotate: 0 } },
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDepotUrl",
})) as any;

export type GetEnvironmentError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a description of the specified environment.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentRequest,
  GetEnvironmentResponse,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { environmentId: 0 },
    output: { environment: o_Environment },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
})) as any;

export type GetVersionsError =
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns information about VCF versions, ESX versions and EC2 instance types provided by Amazon EVS. For each VCF version, the response also includes the default ESX version and provided EC2 instance types.
 */
export const getVersions: API.OperationMethod<
  GetVersionsRequest,
  GetVersionsResponse,
  GetVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVersions",
})) as any;

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
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0, environmentId: 0 },
    output: { connectors: D.list(o_Connector) },
  },
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
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0, environmentId: 0 },
    output: { environmentHosts: D.list(o_Host) },
  },
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
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0, state: 0 },
    output: { environmentSummaries: D.list(o_EnvironmentSummary) },
  },
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
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0, environmentId: 0 },
    output: { environmentVlans: D.list(o_Vlan) },
  },
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
  descriptor: { service: svc, input: { resourceArn: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      nextToken: 0,
      maxResults: 0,
      environmentId: 0,
      connectorId: 0,
      entitlementType: 0,
    },
    output: { entitlements: D.list(o_VmEntitlement) },
  },
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
  descriptor: { service: svc, input: { resourceArn: 0, tags: 0 } },
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TagPolicyException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | ResourceNotFoundException
  | TagPolicyException
  | CommonErrors;
/**
 * Deletes specified tags from an Amazon EVS resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tagKeys: 0 } },
  errors: [ResourceNotFoundException, TagPolicyException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      clientToken: D.m({ idempotency: true }),
      environmentId: 0,
      connectorId: 0,
      applianceFqdn: 0,
      secretIdentifier: 0,
    },
    output: { connector: o_Connector },
  },
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironmentConnector",
})) as any;

const i_HostInfoForCreate: D.LazyStruct = () => ({
  hostName: 0,
  keyName: 0,
  instanceType: 0,
  placementGroupId: 0,
  dedicatedHostId: 0,
});
const i_InitialVlanInfo: D.LazyStruct = () => ({ cidr: 0 });
const o_Connector: D.LazyStruct = () => ({
  checks: D.list({ lastCheckAttempt: D.ts, impairedSince: D.ts }),
  createdAt: D.ts,
  modifiedAt: D.ts,
});
const o_Environment: D.LazyStruct = () => ({
  createdAt: D.ts,
  modifiedAt: D.ts,
  licenseInfo: D.list({ solutionKey: D.secret, vsanKey: D.secret }),
  checks: D.list({ impairedSince: D.ts }),
});
const o_EnvironmentSummary: D.LazyStruct = () => ({
  createdAt: D.ts,
  modifiedAt: D.ts,
});
const o_Host: D.LazyStruct = () => ({ createdAt: D.ts, modifiedAt: D.ts });
const o_Vlan: D.LazyStruct = () => ({ createdAt: D.ts, modifiedAt: D.ts });
const o_VmEntitlement: D.LazyStruct = () => ({
  lastSyncedAt: D.ts,
  startedAt: D.ts,
  stoppedAt: D.ts,
});
