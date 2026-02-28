// ==========================================================================
// Bare Metal Solution API (baremetalsolution v2)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "baremetalsolution",
  version: "v2",
  rootUrl: "https://baremetalsolution.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface InstanceQuota {
  /** Instance type. Deprecated: use gcp_service. */
  instanceType?: string;
  /** The gcp service of the provisioning quota. */
  gcpService?: string;
  /** Location where the quota applies. */
  location?: string;
  /** Output only. The name of the instance quota. */
  name?: string;
  /** Number of machines than can be created for the given location and instance_type. */
  availableMachineCount?: number;
}

export const InstanceQuota: Schema.Schema<InstanceQuota> = Schema.suspend(() => Schema.Struct({
  instanceType: Schema.optional(Schema.String),
  gcpService: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  availableMachineCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "InstanceQuota" }) as any as Schema.Schema<InstanceQuota>;

export interface ProvisioningQuota {
  /** Server count. */
  serverCount?: string;
  /** The gcp service of the provisioning quota. */
  gcpService?: string;
  /** Storage size (GB). */
  storageGib?: string;
  /** Output only. The name of the provisioning quota. */
  name?: string;
  /** Instance quota. */
  instanceQuota?: InstanceQuota;
  /** The specific location of the provisioining quota. */
  location?: string;
  /** The available count of the provisioning quota. */
  availableCount?: number;
  /** Network bandwidth, Gbps */
  networkBandwidth?: string;
  /** The asset type of this provisioning quota. */
  assetType?: "ASSET_TYPE_UNSPECIFIED" | "ASSET_TYPE_SERVER" | "ASSET_TYPE_STORAGE" | "ASSET_TYPE_NETWORK" | (string & {});
}

export const ProvisioningQuota: Schema.Schema<ProvisioningQuota> = Schema.suspend(() => Schema.Struct({
  serverCount: Schema.optional(Schema.String),
  gcpService: Schema.optional(Schema.String),
  storageGib: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  instanceQuota: Schema.optional(InstanceQuota),
  location: Schema.optional(Schema.String),
  availableCount: Schema.optional(Schema.Number),
  networkBandwidth: Schema.optional(Schema.String),
  assetType: Schema.optional(Schema.String),
})).annotate({ identifier: "ProvisioningQuota" }) as any as Schema.Schema<ProvisioningQuota>;

export interface ListProvisioningQuotasResponse {
  /** The provisioning quotas registered in this project. */
  provisioningQuotas?: Array<ProvisioningQuota>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListProvisioningQuotasResponse: Schema.Schema<ListProvisioningQuotasResponse> = Schema.suspend(() => Schema.Struct({
  provisioningQuotas: Schema.optional(Schema.Array(ProvisioningQuota)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListProvisioningQuotasResponse" }) as any as Schema.Schema<ListProvisioningQuotasResponse>;

export interface DisableInteractiveSerialConsoleResponse {
}

export const DisableInteractiveSerialConsoleResponse: Schema.Schema<DisableInteractiveSerialConsoleResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DisableInteractiveSerialConsoleResponse" }) as any as Schema.Schema<DisableInteractiveSerialConsoleResponse>;

export interface NetworkMountPoint {
  /** Logical interface to detach from. */
  logicalInterface?: string;
  /** Network should be a default gateway. */
  defaultGateway?: boolean;
  /** Ip address of the server. */
  ipAddress?: string;
  /** Instance to attach network to. */
  instance?: string;
}

export const NetworkMountPoint: Schema.Schema<NetworkMountPoint> = Schema.suspend(() => Schema.Struct({
  logicalInterface: Schema.optional(Schema.String),
  defaultGateway: Schema.optional(Schema.Boolean),
  ipAddress: Schema.optional(Schema.String),
  instance: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkMountPoint" }) as any as Schema.Schema<NetworkMountPoint>;

export interface SSHKey {
  /** The public SSH key. This must be in OpenSSH .authorized_keys format. */
  publicKey?: string;
  /** Output only. The name of this SSH key. Currently, the only valid value for the location is "global". */
  name?: string;
}

export const SSHKey: Schema.Schema<SSHKey> = Schema.suspend(() => Schema.Struct({
  publicKey: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "SSHKey" }) as any as Schema.Schema<SSHKey>;

export interface ReimageInstanceRequest {
  /** Required. The OS image code of the image which will be used in the reimage operation. */
  osImage?: string;
  /** Optional. List of SSH Keys used during reimaging an instance. */
  sshKeys?: Array<string>;
  /** Optional. Name of the KMS crypto key version used to encrypt the initial passwords. The key has to have ASYMMETRIC_DECRYPT purpose. Format is `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{key}/cryptoKeyVersions/{version}`. */
  kmsKeyVersion?: string;
}

export const ReimageInstanceRequest: Schema.Schema<ReimageInstanceRequest> = Schema.suspend(() => Schema.Struct({
  osImage: Schema.optional(Schema.String),
  sshKeys: Schema.optional(Schema.Array(Schema.String)),
  kmsKeyVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "ReimageInstanceRequest" }) as any as Schema.Schema<ReimageInstanceRequest>;

export interface RenameInstanceRequest {
  /** Required. The new `id` of the instance. */
  newInstanceId?: string;
}

export const RenameInstanceRequest: Schema.Schema<RenameInstanceRequest> = Schema.suspend(() => Schema.Struct({
  newInstanceId: Schema.optional(Schema.String),
})).annotate({ identifier: "RenameInstanceRequest" }) as any as Schema.Schema<RenameInstanceRequest>;

export interface ResetInstanceResponse {
}

export const ResetInstanceResponse: Schema.Schema<ResetInstanceResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResetInstanceResponse" }) as any as Schema.Schema<ResetInstanceResponse>;

export interface OSImage {
  /** Instance types this image is applicable to. [Available types](https://cloud.google.com/bare-metal/docs/bms-planning#server_configurations) */
  applicableInstanceTypes?: Array<string>;
  /** OS Image code. */
  code?: string;
  /** OS Image description. */
  description?: string;
  /** Output only. OS Image's unique name. */
  name?: string;
  /** Network templates that can be used with this OS Image. */
  supportedNetworkTemplates?: Array<string>;
}

export const OSImage: Schema.Schema<OSImage> = Schema.suspend(() => Schema.Struct({
  applicableInstanceTypes: Schema.optional(Schema.Array(Schema.String)),
  code: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  supportedNetworkTemplates: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "OSImage" }) as any as Schema.Schema<OSImage>;

export interface ListOSImagesResponse {
  /** The OS images available. */
  osImages?: Array<OSImage>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListOSImagesResponse: Schema.Schema<ListOSImagesResponse> = Schema.suspend(() => Schema.Struct({
  osImages: Schema.optional(Schema.Array(OSImage)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListOSImagesResponse" }) as any as Schema.Schema<ListOSImagesResponse>;

export interface StopInstanceRequest {
}

export const StopInstanceRequest: Schema.Schema<StopInstanceRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "StopInstanceRequest" }) as any as Schema.Schema<StopInstanceRequest>;

export interface SnapshotReservationDetail {
  /** The percent of snapshot space on this storage volume actually being used by the snapshot copies. This value might be higher than 100% if the snapshot copies have overflowed into the data portion of the storage volume. */
  reservedSpaceUsedPercent?: number;
  /** The space on this storage volume reserved for snapshots, shown in GiB. */
  reservedSpaceGib?: string;
  /** Percent of the total Volume size reserved for snapshot copies. Enabling snapshots requires reserving 20% or more of the storage volume space for snapshots. Maximum reserved space for snapshots is 40%. Setting this field will effectively set snapshot_enabled to true. */
  reservedSpacePercent?: number;
  /** The amount, in GiB, of available space in this storage volume's reserved snapshot space. */
  reservedSpaceRemainingGib?: string;
}

export const SnapshotReservationDetail: Schema.Schema<SnapshotReservationDetail> = Schema.suspend(() => Schema.Struct({
  reservedSpaceUsedPercent: Schema.optional(Schema.Number),
  reservedSpaceGib: Schema.optional(Schema.String),
  reservedSpacePercent: Schema.optional(Schema.Number),
  reservedSpaceRemainingGib: Schema.optional(Schema.String),
})).annotate({ identifier: "SnapshotReservationDetail" }) as any as Schema.Schema<SnapshotReservationDetail>;

export interface Volume {
  /** Immutable. Performance tier of the Volume. Default is SHARED. */
  performanceTier?: "VOLUME_PERFORMANCE_TIER_UNSPECIFIED" | "VOLUME_PERFORMANCE_TIER_SHARED" | "VOLUME_PERFORMANCE_TIER_ASSIGNED" | "VOLUME_PERFORMANCE_TIER_HT" | "VOLUME_PERFORMANCE_TIER_QOS2_PERFORMANCE" | (string & {});
  /** Immutable. Pod name. Pod is an independent part of infrastructure. Volume can only be connected to the instances allocated in the same pod. */
  pod?: string;
  /** Additional emergency size that was requested for this Volume, in GiB. current_size_gib includes this value. */
  emergencySizeGib?: string;
  /** The behavior to use when snapshot reserved space is full. */
  snapshotAutoDeleteBehavior?: "SNAPSHOT_AUTO_DELETE_BEHAVIOR_UNSPECIFIED" | "DISABLED" | "OLDEST_FIRST" | "NEWEST_FIRST" | (string & {});
  /** Output only. The resource name of this `Volume`. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. Format: `projects/{project}/locations/{location}/volumes/{volume}` */
  name?: string;
  /** Output only. Instances this Volume is attached to. This field is set only in Get requests. */
  instances?: Array<string>;
  /** The size, in GiB, that this storage volume has expanded as a result of an auto grow policy. In the absence of auto-grow, the value is 0. */
  autoGrownSizeGib?: string;
  /** Output only. Time after which volume will be fully deleted. It is filled only for volumes in COOLOFF state. */
  expireTime?: string;
  /** Whether snapshots are enabled. */
  snapshotEnabled?: boolean;
  /** Originally requested size, in GiB. */
  originallyRequestedSizeGib?: string;
  /** The current size of this storage volume, in GiB, including space reserved for snapshots. This size might be different than the requested size if the storage volume has been configured with auto grow or auto shrink. */
  currentSizeGib?: string;
  /** The workload profile for the volume. */
  workloadProfile?: "WORKLOAD_PROFILE_UNSPECIFIED" | "GENERIC" | "HANA" | (string & {});
  /** Details about snapshot space reservation and usage on the storage volume. */
  snapshotReservationDetail?: SnapshotReservationDetail;
  /** The state of this storage volume. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | "DELETING" | "UPDATING" | "COOL_OFF" | (string & {});
  /** Output only. Whether this volume is a boot volume. A boot volume is one which contains a boot LUN. */
  bootVolume?: boolean;
  /** The requested size of this storage volume, in GiB. */
  requestedSizeGib?: string;
  /** Output only. Storage protocol for the Volume. */
  protocol?: "PROTOCOL_UNSPECIFIED" | "FIBRE_CHANNEL" | "NFS" | (string & {});
  /** The space remaining in the storage volume for new LUNs, in GiB, excluding space reserved for snapshots. */
  remainingSpaceGib?: string;
  /** Input only. User-specified notes for new Volume. Used to provision Volumes that require manual intervention. */
  notes?: string;
  /** An identifier for the `Volume`, generated by the backend. */
  id?: string;
  /** The storage type for this volume. */
  storageType?: "STORAGE_TYPE_UNSPECIFIED" | "SSD" | "HDD" | (string & {});
  /** Output only. Is the Volume attached at at least one instance. This field is a lightweight counterpart of `instances` field. It is filled in List responses as well. */
  attached?: boolean;
  /** Maximum size volume can be expanded to in case of evergency, in GiB. */
  maxSizeGib?: string;
  /** Labels as key value pairs. */
  labels?: Record<string, string>;
}

export const Volume: Schema.Schema<Volume> = Schema.suspend(() => Schema.Struct({
  performanceTier: Schema.optional(Schema.String),
  pod: Schema.optional(Schema.String),
  emergencySizeGib: Schema.optional(Schema.String),
  snapshotAutoDeleteBehavior: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  instances: Schema.optional(Schema.Array(Schema.String)),
  autoGrownSizeGib: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  snapshotEnabled: Schema.optional(Schema.Boolean),
  originallyRequestedSizeGib: Schema.optional(Schema.String),
  currentSizeGib: Schema.optional(Schema.String),
  workloadProfile: Schema.optional(Schema.String),
  snapshotReservationDetail: Schema.optional(SnapshotReservationDetail),
  state: Schema.optional(Schema.String),
  bootVolume: Schema.optional(Schema.Boolean),
  requestedSizeGib: Schema.optional(Schema.String),
  protocol: Schema.optional(Schema.String),
  remainingSpaceGib: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  storageType: Schema.optional(Schema.String),
  attached: Schema.optional(Schema.Boolean),
  maxSizeGib: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Volume" }) as any as Schema.Schema<Volume>;

export interface ListVolumesResponse {
  /** A token identifying a page of results from the server. */
  nextPageToken?: string;
  /** The list of storage volumes. */
  volumes?: Array<Volume>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListVolumesResponse: Schema.Schema<ListVolumesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  volumes: Schema.optional(Schema.Array(Volume)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListVolumesResponse" }) as any as Schema.Schema<ListVolumesResponse>;

export interface StopInstanceResponse {
}

export const StopInstanceResponse: Schema.Schema<StopInstanceResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "StopInstanceResponse" }) as any as Schema.Schema<StopInstanceResponse>;

export interface DetachLunRequest {
  /** If true, performs lun unmapping without instance reboot. */
  skipReboot?: boolean;
  /** Required. Name of the Lun to detach. */
  lun?: string;
}

export const DetachLunRequest: Schema.Schema<DetachLunRequest> = Schema.suspend(() => Schema.Struct({
  skipReboot: Schema.optional(Schema.Boolean),
  lun: Schema.optional(Schema.String),
})).annotate({ identifier: "DetachLunRequest" }) as any as Schema.Schema<DetachLunRequest>;

export interface NetworkAddress {
  /** Id of the network to use, within the same ProvisioningConfig request. */
  networkId?: string;
  /** Name of the existing network to use. */
  existingNetworkId?: string;
  /** IPv4 address to be assigned to the server. */
  address?: string;
}

export const NetworkAddress: Schema.Schema<NetworkAddress> = Schema.suspend(() => Schema.Struct({
  networkId: Schema.optional(Schema.String),
  existingNetworkId: Schema.optional(Schema.String),
  address: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkAddress" }) as any as Schema.Schema<NetworkAddress>;

export interface EvictVolumeRequest {
}

export const EvictVolumeRequest: Schema.Schema<EvictVolumeRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "EvictVolumeRequest" }) as any as Schema.Schema<EvictVolumeRequest>;

export interface LogicalNetworkInterface {
  /** IP address in the network */
  ipAddress?: string;
  /** An identifier for the `Network`, generated by the backend. */
  id?: string;
  /** Name of the network */
  network?: string;
  /** Whether this interface is the default gateway for the instance. Only one interface can be the default gateway for the instance. */
  defaultGateway?: boolean;
  /** Type of network. */
  networkType?: "TYPE_UNSPECIFIED" | "CLIENT" | "PRIVATE" | (string & {});
}

export const LogicalNetworkInterface: Schema.Schema<LogicalNetworkInterface> = Schema.suspend(() => Schema.Struct({
  ipAddress: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  defaultGateway: Schema.optional(Schema.Boolean),
  networkType: Schema.optional(Schema.String),
})).annotate({ identifier: "LogicalNetworkInterface" }) as any as Schema.Schema<LogicalNetworkInterface>;

export interface GoogleCloudBaremetalsolutionV2LogicalInterface {
  /** List of logical network interfaces within a logical interface. */
  logicalNetworkInterfaces?: Array<LogicalNetworkInterface>;
  /** Interface name. This is of syntax or and forms part of the network template name. */
  name?: string;
  /** The index of the logical interface mapping to the index of the hardware bond or nic on the chosen network template. This field is deprecated. */
  interfaceIndex?: number;
}

export const GoogleCloudBaremetalsolutionV2LogicalInterface: Schema.Schema<GoogleCloudBaremetalsolutionV2LogicalInterface> = Schema.suspend(() => Schema.Struct({
  logicalNetworkInterfaces: Schema.optional(Schema.Array(LogicalNetworkInterface)),
  name: Schema.optional(Schema.String),
  interfaceIndex: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudBaremetalsolutionV2LogicalInterface" }) as any as Schema.Schema<GoogleCloudBaremetalsolutionV2LogicalInterface>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface Lun {
  /** The WWID for this LUN. */
  wwid?: string;
  /** The LUN multiprotocol type ensures the characteristics of the LUN are optimized for each operating system. */
  multiprotocolType?: "MULTIPROTOCOL_TYPE_UNSPECIFIED" | "LINUX" | (string & {});
  /** An identifier for the LUN, generated by the backend. */
  id?: string;
  /** Output only. The name of the LUN. */
  name?: string;
  /** The state of this storage volume. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "UPDATING" | "READY" | "DELETING" | "COOL_OFF" | (string & {});
  /** The storage type for this LUN. */
  storageType?: "STORAGE_TYPE_UNSPECIFIED" | "SSD" | "HDD" | (string & {});
  /** The size of this LUN, in GiB. */
  sizeGb?: string;
  /** Display if this LUN is a boot LUN. */
  bootLun?: boolean;
  /** Display if this LUN can be shared between multiple physical servers. */
  shareable?: boolean;
  /** Output only. Time after which LUN will be fully deleted. It is filled only for LUNs in COOL_OFF state. */
  expireTime?: string;
  /** Output only. Instances this Lun is attached to. */
  instances?: Array<string>;
  /** Display the storage volume for this LUN. */
  storageVolume?: string;
}

export const Lun: Schema.Schema<Lun> = Schema.suspend(() => Schema.Struct({
  wwid: Schema.optional(Schema.String),
  multiprotocolType: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  storageType: Schema.optional(Schema.String),
  sizeGb: Schema.optional(Schema.String),
  bootLun: Schema.optional(Schema.Boolean),
  shareable: Schema.optional(Schema.Boolean),
  expireTime: Schema.optional(Schema.String),
  instances: Schema.optional(Schema.Array(Schema.String)),
  storageVolume: Schema.optional(Schema.String),
})).annotate({ identifier: "Lun" }) as any as Schema.Schema<Lun>;

export interface ListLunsResponse {
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** A token identifying a page of results from the server. */
  nextPageToken?: string;
  /** The list of luns. */
  luns?: Array<Lun>;
}

export const ListLunsResponse: Schema.Schema<ListLunsResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
  luns: Schema.optional(Schema.Array(Lun)),
})).annotate({ identifier: "ListLunsResponse" }) as any as Schema.Schema<ListLunsResponse>;

export interface EnableInteractiveSerialConsoleResponse {
}

export const EnableInteractiveSerialConsoleResponse: Schema.Schema<EnableInteractiveSerialConsoleResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "EnableInteractiveSerialConsoleResponse" }) as any as Schema.Schema<EnableInteractiveSerialConsoleResponse>;

export interface QosPolicy {
  /** The bandwidth permitted by the QOS policy, in gbps. */
  bandwidthGbps?: number;
}

export const QosPolicy: Schema.Schema<QosPolicy> = Schema.suspend(() => Schema.Struct({
  bandwidthGbps: Schema.optional(Schema.Number),
})).annotate({ identifier: "QosPolicy" }) as any as Schema.Schema<QosPolicy>;

export interface VlanAttachment {
  /** Input only. Pairing key. */
  pairingKey?: string;
  /** The QOS policy applied to this VLAN attachment. This value should be preferred to using qos at vrf level. */
  qosPolicy?: QosPolicy;
  /** The peer vlan ID of the attachment. */
  peerVlanId?: string;
  /** Immutable. The identifier of the attachment within vrf. */
  id?: string;
  /** Optional. The name of the vlan attachment within vrf. This is of the form projects/{project_number}/regions/{region}/interconnectAttachments/{interconnect_attachment} */
  interconnectAttachment?: string;
  /** The peer IP of the attachment. */
  peerIp?: string;
  /** The router IP of the attachment. */
  routerIp?: string;
}

export const VlanAttachment: Schema.Schema<VlanAttachment> = Schema.suspend(() => Schema.Struct({
  pairingKey: Schema.optional(Schema.String),
  qosPolicy: Schema.optional(QosPolicy),
  peerVlanId: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  interconnectAttachment: Schema.optional(Schema.String),
  peerIp: Schema.optional(Schema.String),
  routerIp: Schema.optional(Schema.String),
})).annotate({ identifier: "VlanAttachment" }) as any as Schema.Schema<VlanAttachment>;

export interface IntakeVlanAttachment {
  /** Identifier of the VLAN attachment. */
  id?: string;
  /** Attachment pairing key. */
  pairingKey?: string;
}

export const IntakeVlanAttachment: Schema.Schema<IntakeVlanAttachment> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  pairingKey: Schema.optional(Schema.String),
})).annotate({ identifier: "IntakeVlanAttachment" }) as any as Schema.Schema<IntakeVlanAttachment>;

export interface UserAccount {
  /** KMS CryptoKey Version used to encrypt the password. */
  kmsKeyVersion?: string;
  /** Encrypted initial password value. */
  encryptedPassword?: string;
}

export const UserAccount: Schema.Schema<UserAccount> = Schema.suspend(() => Schema.Struct({
  kmsKeyVersion: Schema.optional(Schema.String),
  encryptedPassword: Schema.optional(Schema.String),
})).annotate({ identifier: "UserAccount" }) as any as Schema.Schema<UserAccount>;

export interface LoadInstanceAuthInfoResponse {
  /** List of ssh keys. */
  sshKeys?: Array<SSHKey>;
  /** Map of username to the user account info. */
  userAccounts?: Record<string, UserAccount>;
}

export const LoadInstanceAuthInfoResponse: Schema.Schema<LoadInstanceAuthInfoResponse> = Schema.suspend(() => Schema.Struct({
  sshKeys: Schema.optional(Schema.Array(SSHKey)),
  userAccounts: Schema.optional(Schema.Record(Schema.String, UserAccount)),
})).annotate({ identifier: "LoadInstanceAuthInfoResponse" }) as any as Schema.Schema<LoadInstanceAuthInfoResponse>;

export interface RestoreVolumeSnapshotRequest {
}

export const RestoreVolumeSnapshotRequest: Schema.Schema<RestoreVolumeSnapshotRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RestoreVolumeSnapshotRequest" }) as any as Schema.Schema<RestoreVolumeSnapshotRequest>;

export interface EnableInteractiveSerialConsoleRequest {
}

export const EnableInteractiveSerialConsoleRequest: Schema.Schema<EnableInteractiveSerialConsoleRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "EnableInteractiveSerialConsoleRequest" }) as any as Schema.Schema<EnableInteractiveSerialConsoleRequest>;

export interface DisableHyperthreadingRequest {
}

export const DisableHyperthreadingRequest: Schema.Schema<DisableHyperthreadingRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DisableHyperthreadingRequest" }) as any as Schema.Schema<DisableHyperthreadingRequest>;

export interface LunRange {
  /** Number of LUNs to create. */
  quantity?: number;
  /** The requested size of each LUN, in GB. */
  sizeGb?: number;
}

export const LunRange: Schema.Schema<LunRange> = Schema.suspend(() => Schema.Struct({
  quantity: Schema.optional(Schema.Number),
  sizeGb: Schema.optional(Schema.Number),
})).annotate({ identifier: "LunRange" }) as any as Schema.Schema<LunRange>;

export interface ListSSHKeysResponse {
  /** The SSH keys registered in the project. */
  sshKeys?: Array<SSHKey>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListSSHKeysResponse: Schema.Schema<ListSSHKeysResponse> = Schema.suspend(() => Schema.Struct({
  sshKeys: Schema.optional(Schema.Array(SSHKey)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListSSHKeysResponse" }) as any as Schema.Schema<ListSSHKeysResponse>;

export interface InstanceConfig {
  /** The name of the instance config. */
  name?: string;
  /** Whether the instance should be provisioned with Hyperthreading enabled. */
  hyperthreading?: boolean;
  /** Name of the KMS crypto key version used to encrypt the initial passwords. The key has to have ASYMMETRIC_DECRYPT purpose. */
  kmsKeyVersion?: string;
  /** If true networks can be from different projects of the same vendor account. */
  accountNetworksEnabled?: boolean;
  /** A transient unique identifier to identify an instance within an ProvisioningConfig request. */
  id?: string;
  /** List of logical interfaces for the instance. The number of logical interfaces will be the same as number of hardware bond/nic on the chosen network template. Filled if InstanceConfig.multivlan_config is true. */
  logicalInterfaces?: Array<GoogleCloudBaremetalsolutionV2LogicalInterface>;
  /** Private network address, if any. Filled if InstanceConfig.multivlan_config is false. */
  privateNetwork?: NetworkAddress;
  /** The type of network configuration on the instance. */
  networkConfig?: "NETWORKCONFIG_UNSPECIFIED" | "SINGLE_VLAN" | "MULTI_VLAN" | (string & {});
  /** User note field, it can be used by customers to add additional information for the BMS Ops team . */
  userNote?: string;
  /** Client network address. Filled if InstanceConfig.multivlan_config is false. */
  clientNetwork?: NetworkAddress;
  /** Instance type. [Available types](https://cloud.google.com/bare-metal/docs/bms-planning#server_configurations) */
  instanceType?: string;
  /** OS image to initialize the instance. [Available images](https://cloud.google.com/bare-metal/docs/bms-planning#server_configurations) */
  osImage?: string;
  /** Server network template name. Filled if InstanceConfig.multivlan_config is true. */
  networkTemplate?: string;
  /** Optional. List of names of ssh keys used to provision the instance. */
  sshKeyNames?: Array<string>;
}

export const InstanceConfig: Schema.Schema<InstanceConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  hyperthreading: Schema.optional(Schema.Boolean),
  kmsKeyVersion: Schema.optional(Schema.String),
  accountNetworksEnabled: Schema.optional(Schema.Boolean),
  id: Schema.optional(Schema.String),
  logicalInterfaces: Schema.optional(Schema.Array(GoogleCloudBaremetalsolutionV2LogicalInterface)),
  privateNetwork: Schema.optional(NetworkAddress),
  networkConfig: Schema.optional(Schema.String),
  userNote: Schema.optional(Schema.String),
  clientNetwork: Schema.optional(NetworkAddress),
  instanceType: Schema.optional(Schema.String),
  osImage: Schema.optional(Schema.String),
  networkTemplate: Schema.optional(Schema.String),
  sshKeyNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "InstanceConfig" }) as any as Schema.Schema<InstanceConfig>;

export interface VRF {
  /** The QOS policy applied to this VRF. The value is only meaningful when all the vlan attachments have the same QoS. This field should not be used for new integrations, use vlan attachment level qos instead. The field is left for backward-compatibility. */
  qosPolicy?: QosPolicy;
  /** The list of VLAN attachments for the VRF. */
  vlanAttachments?: Array<VlanAttachment>;
  /** The name of the VRF. */
  name?: string;
  /** The possible state of VRF. */
  state?: "STATE_UNSPECIFIED" | "PROVISIONING" | "PROVISIONED" | (string & {});
}

export const VRF: Schema.Schema<VRF> = Schema.suspend(() => Schema.Struct({
  qosPolicy: Schema.optional(QosPolicy),
  vlanAttachments: Schema.optional(Schema.Array(VlanAttachment)),
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "VRF" }) as any as Schema.Schema<VRF>;

export interface NfsExport {
  /** Either a single machine, identified by an ID, or a comma-separated list of machine IDs. */
  machineId?: string;
  /** Disable root squashing, which is a feature of NFS. Root squash is a special mapping of the remote superuser (root) identity when using identity authentication. */
  noRootSquash?: boolean;
  /** Network to use to publish the export. */
  networkId?: string;
  /** Allow the setuid flag. */
  allowSuid?: boolean;
  /** Allow dev flag in NfsShare AllowedClientsRequest. */
  allowDev?: boolean;
  /** A CIDR range. */
  cidr?: string;
  /** Export permissions. */
  permissions?: "PERMISSIONS_UNSPECIFIED" | "READ_ONLY" | "READ_WRITE" | (string & {});
}

export const NfsExport: Schema.Schema<NfsExport> = Schema.suspend(() => Schema.Struct({
  machineId: Schema.optional(Schema.String),
  noRootSquash: Schema.optional(Schema.Boolean),
  networkId: Schema.optional(Schema.String),
  allowSuid: Schema.optional(Schema.Boolean),
  allowDev: Schema.optional(Schema.Boolean),
  cidr: Schema.optional(Schema.String),
  permissions: Schema.optional(Schema.String),
})).annotate({ identifier: "NfsExport" }) as any as Schema.Schema<NfsExport>;

export interface AllowedClient {
  /** Mount permissions. */
  mountPermissions?: "MOUNT_PERMISSIONS_UNSPECIFIED" | "READ" | "READ_WRITE" | (string & {});
  /** Allow the setuid flag. */
  allowSuid?: boolean;
  /** The subnet of IP addresses permitted to access the share. */
  allowedClientsCidr?: string;
  /** Allow dev flag. Which controls whether to allow creation of devices. */
  allowDev?: boolean;
  /** Disable root squashing, which is a feature of NFS. Root squash is a special mapping of the remote superuser (root) identity when using identity authentication. */
  noRootSquash?: boolean;
  /** The network the access point sits on. */
  network?: string;
  /** Output only. The path to access NFS, in format shareIP:/InstanceID InstanceID is the generated ID instead of customer provided name. example like "10.0.0.0:/g123456789-nfs001" */
  nfsPath?: string;
  /** Output only. The IP address of the share on this network. Assigned automatically during provisioning based on the network's services_cidr. */
  shareIp?: string;
}

export const AllowedClient: Schema.Schema<AllowedClient> = Schema.suspend(() => Schema.Struct({
  mountPermissions: Schema.optional(Schema.String),
  allowSuid: Schema.optional(Schema.Boolean),
  allowedClientsCidr: Schema.optional(Schema.String),
  allowDev: Schema.optional(Schema.Boolean),
  noRootSquash: Schema.optional(Schema.Boolean),
  network: Schema.optional(Schema.String),
  nfsPath: Schema.optional(Schema.String),
  shareIp: Schema.optional(Schema.String),
})).annotate({ identifier: "AllowedClient" }) as any as Schema.Schema<AllowedClient>;

export interface NetworkAddressReservation {
  /** A note about this reservation, intended for human consumption. */
  note?: string;
  /** The last address of this reservation block, inclusive. I.e., for cases when reservations are only single addresses, end_address and start_address will be the same. Must be specified as a single IPv4 address, e.g. 10.1.2.2. */
  endAddress?: string;
  /** The first address of this reservation block. Must be specified as a single IPv4 address, e.g. 10.1.2.2. */
  startAddress?: string;
}

export const NetworkAddressReservation: Schema.Schema<NetworkAddressReservation> = Schema.suspend(() => Schema.Struct({
  note: Schema.optional(Schema.String),
  endAddress: Schema.optional(Schema.String),
  startAddress: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkAddressReservation" }) as any as Schema.Schema<NetworkAddressReservation>;

export interface StartInstanceResponse {
}

export const StartInstanceResponse: Schema.Schema<StartInstanceResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "StartInstanceResponse" }) as any as Schema.Schema<StartInstanceResponse>;

export interface VolumeConfig {
  /** A transient unique identifier to identify a volume within an ProvisioningConfig request. */
  id?: string;
  /** Whether snapshots should be enabled. */
  snapshotsEnabled?: boolean;
  /** The type of this Volume. */
  type?: "TYPE_UNSPECIFIED" | "FLASH" | "DISK" | (string & {});
  /** NFS exports. Set only when protocol is PROTOCOL_NFS. */
  nfsExports?: Array<NfsExport>;
  /** Volume protocol. */
  protocol?: "PROTOCOL_UNSPECIFIED" | "PROTOCOL_FC" | "PROTOCOL_NFS" | (string & {});
  /** LUN ranges to be configured. Set only when protocol is PROTOCOL_FC. */
  lunRanges?: Array<LunRange>;
  /** Performance tier of the Volume. Default is SHARED. */
  performanceTier?: "VOLUME_PERFORMANCE_TIER_UNSPECIFIED" | "VOLUME_PERFORMANCE_TIER_SHARED" | "VOLUME_PERFORMANCE_TIER_ASSIGNED" | "VOLUME_PERFORMANCE_TIER_HT" | "VOLUME_PERFORMANCE_TIER_QOS2_PERFORMANCE" | (string & {});
  /** Machine ids connected to this volume. Set only when protocol is PROTOCOL_FC. */
  machineIds?: Array<string>;
  /** User note field, it can be used by customers to add additional information for the BMS Ops team . */
  userNote?: string;
  /** The requested size of this volume, in GB. */
  sizeGb?: number;
  /** Output only. The name of the volume config. */
  name?: string;
  /** The GCP service of the storage volume. Available gcp_service are in https://cloud.google.com/bare-metal/docs/bms-planning. */
  gcpService?: string;
}

export const VolumeConfig: Schema.Schema<VolumeConfig> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  snapshotsEnabled: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.String),
  nfsExports: Schema.optional(Schema.Array(NfsExport)),
  protocol: Schema.optional(Schema.String),
  lunRanges: Schema.optional(Schema.Array(LunRange)),
  performanceTier: Schema.optional(Schema.String),
  machineIds: Schema.optional(Schema.Array(Schema.String)),
  userNote: Schema.optional(Schema.String),
  sizeGb: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  gcpService: Schema.optional(Schema.String),
})).annotate({ identifier: "VolumeConfig" }) as any as Schema.Schema<VolumeConfig>;

export interface NetworkConfig {
  /** List of VLAN attachments. As of now there are always 2 attachments, but it is going to change in the future (multi vlan). Use only one of vlan_attachments or vrf */
  vlanAttachments?: Array<IntakeVlanAttachment>;
  /** The JumboFramesEnabled option for customer to set. */
  jumboFramesEnabled?: boolean;
  /** Service CIDR, if any. */
  serviceCidr?: "SERVICE_CIDR_UNSPECIFIED" | "DISABLED" | "HIGH_26" | "HIGH_27" | "HIGH_28" | (string & {});
  /** Interconnect bandwidth. Set only when type is CLIENT. */
  bandwidth?: "BANDWIDTH_UNSPECIFIED" | "BW_1_GBPS" | "BW_2_GBPS" | "BW_5_GBPS" | "BW_10_GBPS" | (string & {});
  /** Output only. The name of the network config. */
  name?: string;
  /** The GCP service of the network. Available gcp_service are in https://cloud.google.com/bare-metal/docs/bms-planning. */
  gcpService?: string;
  /** A transient unique identifier to identify a volume within an ProvisioningConfig request. */
  id?: string;
  /** Optional. The name of a pre-existing Vrf that the network should be attached to. Format is `vrfs/{vrf}`. If vrf is specified, vlan_attachments must be empty. */
  vrf?: string;
  /** Whether the VLAN attachment pair is located in the same project. */
  vlanSameProject?: boolean;
  /** The type of this network, either Client or Private. */
  type?: "TYPE_UNSPECIFIED" | "CLIENT" | "PRIVATE" | (string & {});
  /** User note field, it can be used by customers to add additional information for the BMS Ops team . */
  userNote?: string;
  /** CIDR range of the network. */
  cidr?: string;
}

export const NetworkConfig: Schema.Schema<NetworkConfig> = Schema.suspend(() => Schema.Struct({
  vlanAttachments: Schema.optional(Schema.Array(IntakeVlanAttachment)),
  jumboFramesEnabled: Schema.optional(Schema.Boolean),
  serviceCidr: Schema.optional(Schema.String),
  bandwidth: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  gcpService: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  vrf: Schema.optional(Schema.String),
  vlanSameProject: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.String),
  userNote: Schema.optional(Schema.String),
  cidr: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkConfig" }) as any as Schema.Schema<NetworkConfig>;

export interface ProvisioningConfig {
  /** Output only. Last update timestamp. */
  updateTime?: string;
  /** Volumes to be created. */
  volumes?: Array<VolumeConfig>;
  /** Optional status messages associated with the FAILED state. */
  statusMessage?: string;
  /** If true, VPC SC is enabled for the cluster. */
  vpcScEnabled?: boolean;
  /** A service account to enable customers to access instance credentials upon handover. */
  handoverServiceAccount?: string;
  /** Email provided to send a confirmation with provisioning config to. Deprecated in favour of email field in request messages. */
  email?: string;
  /** Output only. The system-generated name of the provisioning config. This follows the UUID format. */
  name?: string;
  /** Optional. Pod name. Pod is an independent part of infrastructure. Instance can be connected to the assets (networks, volumes, nfsshares) allocated in the same pod only. */
  pod?: string;
  /** Optional. The user-defined identifier of the provisioning config. */
  customId?: string;
  /** Optional. Location name of this ProvisioningConfig. It is optional only for Intake UI transition period. */
  location?: string;
  /** Instances to be created. */
  instances?: Array<InstanceConfig>;
  /** A generated ticket id to track provisioning request. */
  ticketId?: string;
  /** Output only. State of ProvisioningConfig. */
  state?: "STATE_UNSPECIFIED" | "DRAFT" | "SUBMITTED" | "PROVISIONING" | "PROVISIONED" | "VALIDATED" | "CANCELLED" | "FAILED" | (string & {});
  /** Output only. URI to Cloud Console UI view of this provisioning config. */
  cloudConsoleUri?: string;
  /** Networks to be created. */
  networks?: Array<NetworkConfig>;
}

export const ProvisioningConfig: Schema.Schema<ProvisioningConfig> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  volumes: Schema.optional(Schema.Array(VolumeConfig)),
  statusMessage: Schema.optional(Schema.String),
  vpcScEnabled: Schema.optional(Schema.Boolean),
  handoverServiceAccount: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  pod: Schema.optional(Schema.String),
  customId: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  instances: Schema.optional(Schema.Array(InstanceConfig)),
  ticketId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  cloudConsoleUri: Schema.optional(Schema.String),
  networks: Schema.optional(Schema.Array(NetworkConfig)),
})).annotate({ identifier: "ProvisioningConfig" }) as any as Schema.Schema<ProvisioningConfig>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface VolumeSnapshot {
  /** The description of the snapshot. */
  description?: string;
  /** The name of the snapshot. */
  name?: string;
  /** Output only. The type of the snapshot which indicates whether it was scheduled or manual/ad-hoc. */
  type?: "SNAPSHOT_TYPE_UNSPECIFIED" | "AD_HOC" | "SCHEDULED" | (string & {});
  /** Output only. The name of the volume which this snapshot belongs to. */
  storageVolume?: string;
  /** Output only. An identifier for the snapshot, generated by the backend. */
  id?: string;
  /** Output only. The creation time of the snapshot. */
  createTime?: string;
}

export const VolumeSnapshot: Schema.Schema<VolumeSnapshot> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  storageVolume: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "VolumeSnapshot" }) as any as Schema.Schema<VolumeSnapshot>;

export interface ListVolumeSnapshotsResponse {
  /** The list of snapshots. */
  volumeSnapshots?: Array<VolumeSnapshot>;
  /** A token identifying a page of results from the server. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListVolumeSnapshotsResponse: Schema.Schema<ListVolumeSnapshotsResponse> = Schema.suspend(() => Schema.Struct({
  volumeSnapshots: Schema.optional(Schema.Array(VolumeSnapshot)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListVolumeSnapshotsResponse" }) as any as Schema.Schema<ListVolumeSnapshotsResponse>;

export interface ResizeVolumeRequest {
  /** New Volume size, in GiB. */
  sizeGib?: string;
}

export const ResizeVolumeRequest: Schema.Schema<ResizeVolumeRequest> = Schema.suspend(() => Schema.Struct({
  sizeGib: Schema.optional(Schema.String),
})).annotate({ identifier: "ResizeVolumeRequest" }) as any as Schema.Schema<ResizeVolumeRequest>;

export interface Network {
  /** Whether network uses standard frames or jumbo ones. */
  jumboFramesEnabled?: boolean;
  /** Output only. The resource name of this `Network`. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. Format: `projects/{project}/locations/{location}/networks/{network}` */
  name?: string;
  /** Labels as key value pairs. */
  labels?: Record<string, string>;
  /** Optional. The name of a pre-existing Vrf that the network should be attached to. Format is `vrfs/{vrf}`. */
  vrfAttachment?: string;
  /** The type of this network. */
  type?: "TYPE_UNSPECIFIED" | "CLIENT" | "PRIVATE" | (string & {});
  /** The cidr of the Network. */
  cidr?: string;
  /** The Network state. */
  state?: "STATE_UNSPECIFIED" | "PROVISIONING" | "PROVISIONED" | "DEPROVISIONING" | "UPDATING" | (string & {});
  /** Input only. List of mount points to attach the network to. */
  mountPoints?: Array<NetworkMountPoint>;
  /** IP address configured. */
  ipAddress?: string;
  /** Immutable. Pod name. Pod is an independent part of infrastructure. Network can only be connected to the assets (instances, nfsshares) allocated in the same pod. */
  pod?: string;
  /** The vlan id of the Network. */
  vlanId?: string;
  /** List of IP address reservations in this network. When updating this field, an error will be generated if a reservation conflicts with an IP address already allocated to a physical server. */
  reservations?: Array<NetworkAddressReservation>;
  /** Output only. Gateway ip address. */
  gatewayIp?: string;
  /** IP range for reserved for services (e.g. NFS). */
  servicesCidr?: string;
  /** The Vrf for the Network. Use this only if a new Vrf needs to be created. */
  vrf?: VRF;
  /** An identifier for the `Network`, generated by the backend. */
  id?: string;
  /** List of physical interfaces. */
  macAddress?: Array<string>;
}

export const Network: Schema.Schema<Network> = Schema.suspend(() => Schema.Struct({
  jumboFramesEnabled: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  vrfAttachment: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  cidr: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  mountPoints: Schema.optional(Schema.Array(NetworkMountPoint)),
  ipAddress: Schema.optional(Schema.String),
  pod: Schema.optional(Schema.String),
  vlanId: Schema.optional(Schema.String),
  reservations: Schema.optional(Schema.Array(NetworkAddressReservation)),
  gatewayIp: Schema.optional(Schema.String),
  servicesCidr: Schema.optional(Schema.String),
  vrf: Schema.optional(VRF),
  id: Schema.optional(Schema.String),
  macAddress: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Network" }) as any as Schema.Schema<Network>;

export interface Instance {
  /** Output only. Update a time stamp. */
  updateTime?: string;
  /** Optional. List of SSH Keys used during instance provisioning. */
  sshKeys?: Array<string>;
  /** The OS image currently installed on the server. */
  osImage?: string;
  /** Immutable. List of LUNs associated with this server. */
  luns?: Array<Lun>;
  /** Output only. List of networks associated with this server. */
  networks?: Array<Network>;
  /** Immutable. Pod name. Pod is an independent part of infrastructure. Instance can only be connected to the assets (networks, volumes) allocated in the same pod. */
  pod?: string;
  /** True if you enable hyperthreading for the server, otherwise false. The default value is false. */
  hyperthreadingEnabled?: boolean;
  /** Immutable. The resource name of this `Instance`. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. Format: `projects/{project}/locations/{location}/instances/{instance}` */
  name?: string;
  /** Output only. Text field about info for logging in. */
  loginInfo?: string;
  /** Output only. The state of the server. */
  state?: "STATE_UNSPECIFIED" | "PROVISIONING" | "RUNNING" | "DELETED" | "UPDATING" | "STARTING" | "STOPPING" | "SHUTDOWN" | (string & {});
  /** Output only. The firmware version for the instance. */
  firmwareVersion?: string;
  /** Input only. List of Volumes to attach to this Instance on creation. This field won't be populated in Get/List responses. */
  volumes?: Array<Volume>;
  /** Output only. An identifier for the `Instance`, generated by the backend. */
  id?: string;
  /** Output only. Create a time stamp. */
  createTime?: string;
  /** The workload profile for the instance. */
  workloadProfile?: "WORKLOAD_PROFILE_UNSPECIFIED" | "WORKLOAD_PROFILE_GENERIC" | "WORKLOAD_PROFILE_HANA" | (string & {});
  /** Optional. Name of the KMS crypto key version used to encrypt the initial passwords. The key has to have ASYMMETRIC_DECRYPT purpose. Format is `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{key}/cryptoKeyVersions/{version}`. */
  kmsKeyVersion?: string;
  /** List of logical interfaces for the instance. The number of logical interfaces will be the same as number of hardware bond/nic on the chosen network template. For the non-multivlan configurations (for eg, existing servers) that use existing default network template (bondaa-bondaa), both the Instance.networks field and the Instance.logical_interfaces fields will be filled to ensure backward compatibility. For the others, only Instance.logical_interfaces will be filled. */
  logicalInterfaces?: Array<GoogleCloudBaremetalsolutionV2LogicalInterface>;
  /** Immutable. The server type. [Available server types](https://cloud.google.com/bare-metal/docs/bms-planning#server_configurations) */
  machineType?: string;
  /** Output only. True if the interactive serial console feature is enabled for the instance, false otherwise. The default value is false. */
  interactiveSerialConsoleEnabled?: boolean;
  /** Labels as key value pairs. */
  labels?: Record<string, string>;
  /** Instance network template name. For eg, bondaa-bondaa, bondab-nic, etc. Generally, the template name follows the syntax of "bond" or "nic". */
  networkTemplate?: string;
}

export const Instance: Schema.Schema<Instance> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  sshKeys: Schema.optional(Schema.Array(Schema.String)),
  osImage: Schema.optional(Schema.String),
  luns: Schema.optional(Schema.Array(Lun)),
  networks: Schema.optional(Schema.Array(Network)),
  pod: Schema.optional(Schema.String),
  hyperthreadingEnabled: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
  loginInfo: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  firmwareVersion: Schema.optional(Schema.String),
  volumes: Schema.optional(Schema.Array(Volume)),
  id: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  workloadProfile: Schema.optional(Schema.String),
  kmsKeyVersion: Schema.optional(Schema.String),
  logicalInterfaces: Schema.optional(Schema.Array(GoogleCloudBaremetalsolutionV2LogicalInterface)),
  machineType: Schema.optional(Schema.String),
  interactiveSerialConsoleEnabled: Schema.optional(Schema.Boolean),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  networkTemplate: Schema.optional(Schema.String),
})).annotate({ identifier: "Instance" }) as any as Schema.Schema<Instance>;

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  locationId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListInstancesResponse {
  /** The list of servers. */
  instances?: Array<Instance>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** A token identifying a page of results from the server. */
  nextPageToken?: string;
}

export const ListInstancesResponse: Schema.Schema<ListInstancesResponse> = Schema.suspend(() => Schema.Struct({
  instances: Schema.optional(Schema.Array(Instance)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListInstancesResponse" }) as any as Schema.Schema<ListInstancesResponse>;

export interface NfsShare {
  /** List of allowed access points. */
  allowedClients?: Array<AllowedClient>;
  /** Immutable. The storage type of the underlying volume. */
  storageType?: "STORAGE_TYPE_UNSPECIFIED" | "SSD" | "HDD" | (string & {});
  /** Output only. An identifier for the NFS share, generated by the backend. This is the same value as nfs_share_id and will replace it in the future. */
  id?: string;
  /** Output only. The state of the NFS share. */
  state?: "STATE_UNSPECIFIED" | "PROVISIONED" | "CREATING" | "UPDATING" | "DELETING" | (string & {});
  /** Output only. The underlying volume of the share. Created automatically during provisioning. */
  volume?: string;
  /** Labels as key value pairs. */
  labels?: Record<string, string>;
  /** Immutable. Pod name. Pod is an independent part of infrastructure. NFSShare can only be connected to the assets (networks, instances) allocated in the same pod. */
  pod?: string;
  /** Immutable. The name of the NFS share. */
  name?: string;
  /** The requested size, in GiB. */
  requestedSizeGib?: string;
  /** Output only. An identifier for the NFS share, generated by the backend. This field will be deprecated in the future, use `id` instead. */
  nfsShareId?: string;
}

export const NfsShare: Schema.Schema<NfsShare> = Schema.suspend(() => Schema.Struct({
  allowedClients: Schema.optional(Schema.Array(AllowedClient)),
  storageType: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  volume: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  pod: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  requestedSizeGib: Schema.optional(Schema.String),
  nfsShareId: Schema.optional(Schema.String),
})).annotate({ identifier: "NfsShare" }) as any as Schema.Schema<NfsShare>;

export interface ListNfsSharesResponse {
  /** The list of NFS shares. */
  nfsShares?: Array<NfsShare>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** A token identifying a page of results from the server. */
  nextPageToken?: string;
}

export const ListNfsSharesResponse: Schema.Schema<ListNfsSharesResponse> = Schema.suspend(() => Schema.Struct({
  nfsShares: Schema.optional(Schema.Array(NfsShare)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListNfsSharesResponse" }) as any as Schema.Schema<ListNfsSharesResponse>;

export interface EvictLunRequest {
}

export const EvictLunRequest: Schema.Schema<EvictLunRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "EvictLunRequest" }) as any as Schema.Schema<EvictLunRequest>;

export interface ResetInstanceRequest {
}

export const ResetInstanceRequest: Schema.Schema<ResetInstanceRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResetInstanceRequest" }) as any as Schema.Schema<ResetInstanceRequest>;

export interface EnableHyperthreadingRequest {
}

export const EnableHyperthreadingRequest: Schema.Schema<EnableHyperthreadingRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "EnableHyperthreadingRequest" }) as any as Schema.Schema<EnableHyperthreadingRequest>;

export interface NetworkUsage {
  /** Network. */
  network?: Network;
  /** All used IP addresses in this network. */
  usedIps?: Array<string>;
}

export const NetworkUsage: Schema.Schema<NetworkUsage> = Schema.suspend(() => Schema.Struct({
  network: Schema.optional(Network),
  usedIps: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "NetworkUsage" }) as any as Schema.Schema<NetworkUsage>;

export interface ListLocationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(Location)),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

export interface GoogleCloudBaremetalsolutionV2ServerNetworkTemplateLogicalInterface {
  /** Interface name. This is not a globally unique identifier. Name is unique only inside the ServerNetworkTemplate. This is of syntax or and forms part of the network template name. */
  name?: string;
  /** Interface type. */
  type?: "INTERFACE_TYPE_UNSPECIFIED" | "BOND" | "NIC" | (string & {});
  /** If true, interface must have network connected. */
  required?: boolean;
}

export const GoogleCloudBaremetalsolutionV2ServerNetworkTemplateLogicalInterface: Schema.Schema<GoogleCloudBaremetalsolutionV2ServerNetworkTemplateLogicalInterface> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  required: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudBaremetalsolutionV2ServerNetworkTemplateLogicalInterface" }) as any as Schema.Schema<GoogleCloudBaremetalsolutionV2ServerNetworkTemplateLogicalInterface>;

export interface ServerNetworkTemplate {
  /** Logical interfaces. */
  logicalInterfaces?: Array<GoogleCloudBaremetalsolutionV2ServerNetworkTemplateLogicalInterface>;
  /** Instance types this template is applicable to. */
  applicableInstanceTypes?: Array<string>;
  /** Output only. Template's unique name. The full resource name follows the pattern: `projects/{project}/locations/{location}/serverNetworkTemplate/{server_network_template}` Generally, the {server_network_template} follows the syntax of "bond" or "nic". */
  name?: string;
}

export const ServerNetworkTemplate: Schema.Schema<ServerNetworkTemplate> = Schema.suspend(() => Schema.Struct({
  logicalInterfaces: Schema.optional(Schema.Array(GoogleCloudBaremetalsolutionV2ServerNetworkTemplateLogicalInterface)),
  applicableInstanceTypes: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ServerNetworkTemplate" }) as any as Schema.Schema<ServerNetworkTemplate>;

export interface SubmitProvisioningConfigResponse {
  /** The submitted provisioning config. */
  provisioningConfig?: ProvisioningConfig;
}

export const SubmitProvisioningConfigResponse: Schema.Schema<SubmitProvisioningConfigResponse> = Schema.suspend(() => Schema.Struct({
  provisioningConfig: Schema.optional(ProvisioningConfig),
})).annotate({ identifier: "SubmitProvisioningConfigResponse" }) as any as Schema.Schema<SubmitProvisioningConfigResponse>;

export interface SubmitProvisioningConfigRequest {
  /** Required. The ProvisioningConfig to create. */
  provisioningConfig?: ProvisioningConfig;
  /** Optional. Email provided to send a confirmation with provisioning config to. */
  email?: string;
}

export const SubmitProvisioningConfigRequest: Schema.Schema<SubmitProvisioningConfigRequest> = Schema.suspend(() => Schema.Struct({
  provisioningConfig: Schema.optional(ProvisioningConfig),
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "SubmitProvisioningConfigRequest" }) as any as Schema.Schema<SubmitProvisioningConfigRequest>;

export interface RenameNetworkRequest {
  /** Required. The new `id` of the network. */
  newNetworkId?: string;
}

export const RenameNetworkRequest: Schema.Schema<RenameNetworkRequest> = Schema.suspend(() => Schema.Struct({
  newNetworkId: Schema.optional(Schema.String),
})).annotate({ identifier: "RenameNetworkRequest" }) as any as Schema.Schema<RenameNetworkRequest>;

export interface RenameVolumeRequest {
  /** Required. The new `id` of the volume. */
  newVolumeId?: string;
}

export const RenameVolumeRequest: Schema.Schema<RenameVolumeRequest> = Schema.suspend(() => Schema.Struct({
  newVolumeId: Schema.optional(Schema.String),
})).annotate({ identifier: "RenameVolumeRequest" }) as any as Schema.Schema<RenameVolumeRequest>;

export interface DisableInteractiveSerialConsoleRequest {
}

export const DisableInteractiveSerialConsoleRequest: Schema.Schema<DisableInteractiveSerialConsoleRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DisableInteractiveSerialConsoleRequest" }) as any as Schema.Schema<DisableInteractiveSerialConsoleRequest>;

export interface ListNetworkUsageResponse {
  /** Networks with IPs. */
  networks?: Array<NetworkUsage>;
}

export const ListNetworkUsageResponse: Schema.Schema<ListNetworkUsageResponse> = Schema.suspend(() => Schema.Struct({
  networks: Schema.optional(Schema.Array(NetworkUsage)),
})).annotate({ identifier: "ListNetworkUsageResponse" }) as any as Schema.Schema<ListNetworkUsageResponse>;

export interface Operation {
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  error: Schema.optional(Status),
  name: Schema.optional(Schema.String),
  done: Schema.optional(Schema.Boolean),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface StartInstanceRequest {
}

export const StartInstanceRequest: Schema.Schema<StartInstanceRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "StartInstanceRequest" }) as any as Schema.Schema<StartInstanceRequest>;

export interface ListNetworksResponse {
  /** The list of networks. */
  networks?: Array<Network>;
  /** A token identifying a page of results from the server. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListNetworksResponse: Schema.Schema<ListNetworksResponse> = Schema.suspend(() => Schema.Struct({
  networks: Schema.optional(Schema.Array(Network)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListNetworksResponse" }) as any as Schema.Schema<ListNetworksResponse>;

export interface RenameNfsShareRequest {
  /** Required. The new `id` of the nfsshare. */
  newNfsshareId?: string;
}

export const RenameNfsShareRequest: Schema.Schema<RenameNfsShareRequest> = Schema.suspend(() => Schema.Struct({
  newNfsshareId: Schema.optional(Schema.String),
})).annotate({ identifier: "RenameNfsShareRequest" }) as any as Schema.Schema<RenameNfsShareRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
}

export const ListProjectsLocationsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

export const listProjectsLocations = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = CommonErrors;

export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

/** Create new ProvisioningConfig. */
export interface CreateProjectsLocationsProvisioningConfigsRequest {
  /** Required. The parent project and location containing the ProvisioningConfig. */
  parent: string;
  /** Optional. Email provided to send a confirmation with provisioning config to. */
  email?: string;
  /** Request body */
  body?: ProvisioningConfig;
}

export const CreateProjectsLocationsProvisioningConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  email: Schema.optional(Schema.String).pipe(T.HttpQuery("email")),
  body: Schema.optional(ProvisioningConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/provisioningConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsProvisioningConfigsRequest>;

export type CreateProjectsLocationsProvisioningConfigsResponse = ProvisioningConfig;
export const CreateProjectsLocationsProvisioningConfigsResponse = ProvisioningConfig;

export type CreateProjectsLocationsProvisioningConfigsError = CommonErrors;

export const createProjectsLocationsProvisioningConfigs: API.OperationMethod<CreateProjectsLocationsProvisioningConfigsRequest, CreateProjectsLocationsProvisioningConfigsResponse, CreateProjectsLocationsProvisioningConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsProvisioningConfigsRequest,
  output: CreateProjectsLocationsProvisioningConfigsResponse,
  errors: [],
}));

/** Submit a provisioning configuration for a given project. */
export interface SubmitProjectsLocationsProvisioningConfigsRequest {
  /** Required. The parent project and location containing the ProvisioningConfig. */
  parent: string;
  /** Request body */
  body?: SubmitProvisioningConfigRequest;
}

export const SubmitProjectsLocationsProvisioningConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SubmitProvisioningConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/provisioningConfigs:submit", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SubmitProjectsLocationsProvisioningConfigsRequest>;

export type SubmitProjectsLocationsProvisioningConfigsResponse = SubmitProvisioningConfigResponse;
export const SubmitProjectsLocationsProvisioningConfigsResponse = SubmitProvisioningConfigResponse;

export type SubmitProjectsLocationsProvisioningConfigsError = CommonErrors;

export const submitProjectsLocationsProvisioningConfigs: API.OperationMethod<SubmitProjectsLocationsProvisioningConfigsRequest, SubmitProjectsLocationsProvisioningConfigsResponse, SubmitProjectsLocationsProvisioningConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SubmitProjectsLocationsProvisioningConfigsRequest,
  output: SubmitProjectsLocationsProvisioningConfigsResponse,
  errors: [],
}));

/** Update existing ProvisioningConfig. */
export interface PatchProjectsLocationsProvisioningConfigsRequest {
  /** Optional. Email provided to send a confirmation with provisioning config to. */
  email?: string;
  /** Required. The list of fields to update. */
  updateMask?: string;
  /** Output only. The system-generated name of the provisioning config. This follows the UUID format. */
  name: string;
  /** Request body */
  body?: ProvisioningConfig;
}

export const PatchProjectsLocationsProvisioningConfigsRequest = Schema.Struct({
  email: Schema.optional(Schema.String).pipe(T.HttpQuery("email")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ProvisioningConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/provisioningConfigs/{provisioningConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsProvisioningConfigsRequest>;

export type PatchProjectsLocationsProvisioningConfigsResponse = ProvisioningConfig;
export const PatchProjectsLocationsProvisioningConfigsResponse = ProvisioningConfig;

export type PatchProjectsLocationsProvisioningConfigsError = CommonErrors;

export const patchProjectsLocationsProvisioningConfigs: API.OperationMethod<PatchProjectsLocationsProvisioningConfigsRequest, PatchProjectsLocationsProvisioningConfigsResponse, PatchProjectsLocationsProvisioningConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsProvisioningConfigsRequest,
  output: PatchProjectsLocationsProvisioningConfigsResponse,
  errors: [],
}));

/** Get ProvisioningConfig by name. */
export interface GetProjectsLocationsProvisioningConfigsRequest {
  /** Required. Name of the ProvisioningConfig. */
  name: string;
}

export const GetProjectsLocationsProvisioningConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/provisioningConfigs/{provisioningConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsProvisioningConfigsRequest>;

export type GetProjectsLocationsProvisioningConfigsResponse = ProvisioningConfig;
export const GetProjectsLocationsProvisioningConfigsResponse = ProvisioningConfig;

export type GetProjectsLocationsProvisioningConfigsError = CommonErrors;

export const getProjectsLocationsProvisioningConfigs: API.OperationMethod<GetProjectsLocationsProvisioningConfigsRequest, GetProjectsLocationsProvisioningConfigsResponse, GetProjectsLocationsProvisioningConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsProvisioningConfigsRequest,
  output: GetProjectsLocationsProvisioningConfigsResponse,
  errors: [],
}));

/** RenameVolume sets a new name for a volume. Use with caution, previous names become immediately invalidated. */
export interface RenameProjectsLocationsVolumesRequest {
  /** Required. The `name` field is used to identify the volume. Format: projects/{project}/locations/{location}/volumes/{volume} */
  name: string;
  /** Request body */
  body?: RenameVolumeRequest;
}

export const RenameProjectsLocationsVolumesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RenameVolumeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}:rename", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RenameProjectsLocationsVolumesRequest>;

export type RenameProjectsLocationsVolumesResponse = Volume;
export const RenameProjectsLocationsVolumesResponse = Volume;

export type RenameProjectsLocationsVolumesError = CommonErrors;

export const renameProjectsLocationsVolumes: API.OperationMethod<RenameProjectsLocationsVolumesRequest, RenameProjectsLocationsVolumesResponse, RenameProjectsLocationsVolumesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RenameProjectsLocationsVolumesRequest,
  output: RenameProjectsLocationsVolumesResponse,
  errors: [],
}));

/** Get details of a single storage volume. */
export interface GetProjectsLocationsVolumesRequest {
  /** Required. Name of the resource. */
  name: string;
}

export const GetProjectsLocationsVolumesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsVolumesRequest>;

export type GetProjectsLocationsVolumesResponse = Volume;
export const GetProjectsLocationsVolumesResponse = Volume;

export type GetProjectsLocationsVolumesError = CommonErrors;

export const getProjectsLocationsVolumes: API.OperationMethod<GetProjectsLocationsVolumesRequest, GetProjectsLocationsVolumesResponse, GetProjectsLocationsVolumesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsVolumesRequest,
  output: GetProjectsLocationsVolumesResponse,
  errors: [],
}));

/** Update details of a single storage volume. */
export interface PatchProjectsLocationsVolumesRequest {
  /** The list of fields to update. The only currently supported fields are: 'labels' */
  updateMask?: string;
  /** Output only. The resource name of this `Volume`. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. Format: `projects/{project}/locations/{location}/volumes/{volume}` */
  name: string;
  /** Request body */
  body?: Volume;
}

export const PatchProjectsLocationsVolumesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Volume).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsVolumesRequest>;

export type PatchProjectsLocationsVolumesResponse = Operation;
export const PatchProjectsLocationsVolumesResponse = Operation;

export type PatchProjectsLocationsVolumesError = CommonErrors;

export const patchProjectsLocationsVolumes: API.OperationMethod<PatchProjectsLocationsVolumesRequest, PatchProjectsLocationsVolumesResponse, PatchProjectsLocationsVolumesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsVolumesRequest,
  output: PatchProjectsLocationsVolumesResponse,
  errors: [],
}));

/** List storage volumes in a given project and location. */
export interface ListProjectsLocationsVolumesRequest {
  /** Requested page size. The server might return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results from the server. */
  pageToken?: string;
  /** List filter. */
  filter?: string;
  /** Required. Parent value for ListVolumesRequest. */
  parent: string;
}

export const ListProjectsLocationsVolumesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/volumes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsVolumesRequest>;

export type ListProjectsLocationsVolumesResponse = ListVolumesResponse;
export const ListProjectsLocationsVolumesResponse = ListVolumesResponse;

export type ListProjectsLocationsVolumesError = CommonErrors;

export const listProjectsLocationsVolumes = API.makePaginated(() => ({
  input: ListProjectsLocationsVolumesRequest,
  output: ListProjectsLocationsVolumesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Skips volume's cooloff and deletes it now. Volume must be in cooloff state. */
export interface EvictProjectsLocationsVolumesRequest {
  /** Required. The name of the Volume. */
  name: string;
  /** Request body */
  body?: EvictVolumeRequest;
}

export const EvictProjectsLocationsVolumesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(EvictVolumeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}:evict", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EvictProjectsLocationsVolumesRequest>;

export type EvictProjectsLocationsVolumesResponse = Operation;
export const EvictProjectsLocationsVolumesResponse = Operation;

export type EvictProjectsLocationsVolumesError = CommonErrors;

export const evictProjectsLocationsVolumes: API.OperationMethod<EvictProjectsLocationsVolumesRequest, EvictProjectsLocationsVolumesResponse, EvictProjectsLocationsVolumesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EvictProjectsLocationsVolumesRequest,
  output: EvictProjectsLocationsVolumesResponse,
  errors: [],
}));

/** Emergency Volume resize. */
export interface ResizeProjectsLocationsVolumesRequest {
  /** Required. Volume to resize. */
  volume: string;
  /** Request body */
  body?: ResizeVolumeRequest;
}

export const ResizeProjectsLocationsVolumesRequest = Schema.Struct({
  volume: Schema.String.pipe(T.HttpPath("volume")),
  body: Schema.optional(ResizeVolumeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}:resize", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResizeProjectsLocationsVolumesRequest>;

export type ResizeProjectsLocationsVolumesResponse = Operation;
export const ResizeProjectsLocationsVolumesResponse = Operation;

export type ResizeProjectsLocationsVolumesError = CommonErrors;

export const resizeProjectsLocationsVolumes: API.OperationMethod<ResizeProjectsLocationsVolumesRequest, ResizeProjectsLocationsVolumesResponse, ResizeProjectsLocationsVolumesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResizeProjectsLocationsVolumesRequest,
  output: ResizeProjectsLocationsVolumesResponse,
  errors: [],
}));

/** List storage volume luns for given storage volume. */
export interface ListProjectsLocationsVolumesLunsRequest {
  /** Requested page size. The server might return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Required. Parent value for ListLunsRequest. */
  parent: string;
  /** A token identifying a page of results from the server. */
  pageToken?: string;
}

export const ListProjectsLocationsVolumesLunsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/luns" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsVolumesLunsRequest>;

export type ListProjectsLocationsVolumesLunsResponse = ListLunsResponse;
export const ListProjectsLocationsVolumesLunsResponse = ListLunsResponse;

export type ListProjectsLocationsVolumesLunsError = CommonErrors;

export const listProjectsLocationsVolumesLuns = API.makePaginated(() => ({
  input: ListProjectsLocationsVolumesLunsRequest,
  output: ListProjectsLocationsVolumesLunsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get details of a single storage logical unit number(LUN). */
export interface GetProjectsLocationsVolumesLunsRequest {
  /** Required. Name of the resource. */
  name: string;
}

export const GetProjectsLocationsVolumesLunsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/luns/{lunsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsVolumesLunsRequest>;

export type GetProjectsLocationsVolumesLunsResponse = Lun;
export const GetProjectsLocationsVolumesLunsResponse = Lun;

export type GetProjectsLocationsVolumesLunsError = CommonErrors;

export const getProjectsLocationsVolumesLuns: API.OperationMethod<GetProjectsLocationsVolumesLunsRequest, GetProjectsLocationsVolumesLunsResponse, GetProjectsLocationsVolumesLunsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsVolumesLunsRequest,
  output: GetProjectsLocationsVolumesLunsResponse,
  errors: [],
}));

/** Skips lun's cooloff and deletes it now. Lun must be in cooloff state. */
export interface EvictProjectsLocationsVolumesLunsRequest {
  /** Required. The name of the lun. */
  name: string;
  /** Request body */
  body?: EvictLunRequest;
}

export const EvictProjectsLocationsVolumesLunsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(EvictLunRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/luns/{lunsId}:evict", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EvictProjectsLocationsVolumesLunsRequest>;

export type EvictProjectsLocationsVolumesLunsResponse = Operation;
export const EvictProjectsLocationsVolumesLunsResponse = Operation;

export type EvictProjectsLocationsVolumesLunsError = CommonErrors;

export const evictProjectsLocationsVolumesLuns: API.OperationMethod<EvictProjectsLocationsVolumesLunsRequest, EvictProjectsLocationsVolumesLunsResponse, EvictProjectsLocationsVolumesLunsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EvictProjectsLocationsVolumesLunsRequest,
  output: EvictProjectsLocationsVolumesLunsResponse,
  errors: [],
}));

/** Takes a snapshot of a boot volume. Returns INVALID_ARGUMENT if called for a non-boot volume. */
export interface CreateProjectsLocationsVolumesSnapshotsRequest {
  /** Required. The volume to snapshot. */
  parent: string;
  /** Request body */
  body?: VolumeSnapshot;
}

export const CreateProjectsLocationsVolumesSnapshotsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(VolumeSnapshot).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/snapshots", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsVolumesSnapshotsRequest>;

export type CreateProjectsLocationsVolumesSnapshotsResponse = VolumeSnapshot;
export const CreateProjectsLocationsVolumesSnapshotsResponse = VolumeSnapshot;

export type CreateProjectsLocationsVolumesSnapshotsError = CommonErrors;

export const createProjectsLocationsVolumesSnapshots: API.OperationMethod<CreateProjectsLocationsVolumesSnapshotsRequest, CreateProjectsLocationsVolumesSnapshotsResponse, CreateProjectsLocationsVolumesSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsVolumesSnapshotsRequest,
  output: CreateProjectsLocationsVolumesSnapshotsResponse,
  errors: [],
}));

/** Returns the specified snapshot resource. Returns INVALID_ARGUMENT if called for a non-boot volume. */
export interface GetProjectsLocationsVolumesSnapshotsRequest {
  /** Required. The name of the snapshot. */
  name: string;
}

export const GetProjectsLocationsVolumesSnapshotsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/snapshots/{snapshotsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsVolumesSnapshotsRequest>;

export type GetProjectsLocationsVolumesSnapshotsResponse = VolumeSnapshot;
export const GetProjectsLocationsVolumesSnapshotsResponse = VolumeSnapshot;

export type GetProjectsLocationsVolumesSnapshotsError = CommonErrors;

export const getProjectsLocationsVolumesSnapshots: API.OperationMethod<GetProjectsLocationsVolumesSnapshotsRequest, GetProjectsLocationsVolumesSnapshotsResponse, GetProjectsLocationsVolumesSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsVolumesSnapshotsRequest,
  output: GetProjectsLocationsVolumesSnapshotsResponse,
  errors: [],
}));

/** Deletes a volume snapshot. Returns INVALID_ARGUMENT if called for a non-boot volume. */
export interface DeleteProjectsLocationsVolumesSnapshotsRequest {
  /** Required. The name of the snapshot to delete. */
  name: string;
}

export const DeleteProjectsLocationsVolumesSnapshotsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/snapshots/{snapshotsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsVolumesSnapshotsRequest>;

export type DeleteProjectsLocationsVolumesSnapshotsResponse = Empty;
export const DeleteProjectsLocationsVolumesSnapshotsResponse = Empty;

export type DeleteProjectsLocationsVolumesSnapshotsError = CommonErrors;

export const deleteProjectsLocationsVolumesSnapshots: API.OperationMethod<DeleteProjectsLocationsVolumesSnapshotsRequest, DeleteProjectsLocationsVolumesSnapshotsResponse, DeleteProjectsLocationsVolumesSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsVolumesSnapshotsRequest,
  output: DeleteProjectsLocationsVolumesSnapshotsResponse,
  errors: [],
}));

/** Uses the specified snapshot to restore its parent volume. Returns INVALID_ARGUMENT if called for a non-boot volume. */
export interface RestoreVolumeSnapshotProjectsLocationsVolumesSnapshotsRequest {
  /** Required. Name of the snapshot which will be used to restore its parent volume. */
  volumeSnapshot: string;
  /** Request body */
  body?: RestoreVolumeSnapshotRequest;
}

export const RestoreVolumeSnapshotProjectsLocationsVolumesSnapshotsRequest = Schema.Struct({
  volumeSnapshot: Schema.String.pipe(T.HttpPath("volumeSnapshot")),
  body: Schema.optional(RestoreVolumeSnapshotRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/snapshots/{snapshotsId}:restoreVolumeSnapshot", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestoreVolumeSnapshotProjectsLocationsVolumesSnapshotsRequest>;

export type RestoreVolumeSnapshotProjectsLocationsVolumesSnapshotsResponse = Operation;
export const RestoreVolumeSnapshotProjectsLocationsVolumesSnapshotsResponse = Operation;

export type RestoreVolumeSnapshotProjectsLocationsVolumesSnapshotsError = CommonErrors;

export const restoreVolumeSnapshotProjectsLocationsVolumesSnapshots: API.OperationMethod<RestoreVolumeSnapshotProjectsLocationsVolumesSnapshotsRequest, RestoreVolumeSnapshotProjectsLocationsVolumesSnapshotsResponse, RestoreVolumeSnapshotProjectsLocationsVolumesSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestoreVolumeSnapshotProjectsLocationsVolumesSnapshotsRequest,
  output: RestoreVolumeSnapshotProjectsLocationsVolumesSnapshotsResponse,
  errors: [],
}));

/** Retrieves the list of snapshots for the specified volume. Returns a response with an empty list of snapshots if called for a non-boot volume. */
export interface ListProjectsLocationsVolumesSnapshotsRequest {
  /** Requested page size. The server might return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Required. Parent value for ListVolumesRequest. */
  parent: string;
  /** A token identifying a page of results from the server. */
  pageToken?: string;
}

export const ListProjectsLocationsVolumesSnapshotsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/volumes/{volumesId}/snapshots" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsVolumesSnapshotsRequest>;

export type ListProjectsLocationsVolumesSnapshotsResponse = ListVolumeSnapshotsResponse;
export const ListProjectsLocationsVolumesSnapshotsResponse = ListVolumeSnapshotsResponse;

export type ListProjectsLocationsVolumesSnapshotsError = CommonErrors;

export const listProjectsLocationsVolumesSnapshots = API.makePaginated(() => ({
  input: ListProjectsLocationsVolumesSnapshotsRequest,
  output: ListProjectsLocationsVolumesSnapshotsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** RenameNetwork sets a new name for a network. Use with caution, previous names become immediately invalidated. */
export interface RenameProjectsLocationsNetworksRequest {
  /** Required. The `name` field is used to identify the network. Format: projects/{project}/locations/{location}/networks/{network} */
  name: string;
  /** Request body */
  body?: RenameNetworkRequest;
}

export const RenameProjectsLocationsNetworksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RenameNetworkRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/networks/{networksId}:rename", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RenameProjectsLocationsNetworksRequest>;

export type RenameProjectsLocationsNetworksResponse = Network;
export const RenameProjectsLocationsNetworksResponse = Network;

export type RenameProjectsLocationsNetworksError = CommonErrors;

export const renameProjectsLocationsNetworks: API.OperationMethod<RenameProjectsLocationsNetworksRequest, RenameProjectsLocationsNetworksResponse, RenameProjectsLocationsNetworksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RenameProjectsLocationsNetworksRequest,
  output: RenameProjectsLocationsNetworksResponse,
  errors: [],
}));

/** List all Networks (and used IPs for each Network) in the vendor account associated with the specified project. */
export interface ListNetworkUsageProjectsLocationsNetworksRequest {
  /** Required. Parent value (project and location). */
  location: string;
}

export const ListNetworkUsageProjectsLocationsNetworksRequest = Schema.Struct({
  location: Schema.String.pipe(T.HttpPath("location")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/networks:listNetworkUsage" }),
  svc,
) as unknown as Schema.Schema<ListNetworkUsageProjectsLocationsNetworksRequest>;

export type ListNetworkUsageProjectsLocationsNetworksResponse = ListNetworkUsageResponse;
export const ListNetworkUsageProjectsLocationsNetworksResponse = ListNetworkUsageResponse;

export type ListNetworkUsageProjectsLocationsNetworksError = CommonErrors;

export const listNetworkUsageProjectsLocationsNetworks: API.OperationMethod<ListNetworkUsageProjectsLocationsNetworksRequest, ListNetworkUsageProjectsLocationsNetworksResponse, ListNetworkUsageProjectsLocationsNetworksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListNetworkUsageProjectsLocationsNetworksRequest,
  output: ListNetworkUsageProjectsLocationsNetworksResponse,
  errors: [],
}));

/** Get details of a single network. */
export interface GetProjectsLocationsNetworksRequest {
  /** Required. Name of the resource. */
  name: string;
}

export const GetProjectsLocationsNetworksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/networks/{networksId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsNetworksRequest>;

export type GetProjectsLocationsNetworksResponse = Network;
export const GetProjectsLocationsNetworksResponse = Network;

export type GetProjectsLocationsNetworksError = CommonErrors;

export const getProjectsLocationsNetworks: API.OperationMethod<GetProjectsLocationsNetworksRequest, GetProjectsLocationsNetworksResponse, GetProjectsLocationsNetworksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsNetworksRequest,
  output: GetProjectsLocationsNetworksResponse,
  errors: [],
}));

/** List network in a given project and location. */
export interface ListProjectsLocationsNetworksRequest {
  /** Requested page size. The server might return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results from the server. */
  pageToken?: string;
  /** List filter. */
  filter?: string;
  /** Required. Parent value for ListNetworksRequest. */
  parent: string;
}

export const ListProjectsLocationsNetworksRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/networks" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsNetworksRequest>;

export type ListProjectsLocationsNetworksResponse = ListNetworksResponse;
export const ListProjectsLocationsNetworksResponse = ListNetworksResponse;

export type ListProjectsLocationsNetworksError = CommonErrors;

export const listProjectsLocationsNetworks = API.makePaginated(() => ({
  input: ListProjectsLocationsNetworksRequest,
  output: ListProjectsLocationsNetworksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Update details of a single network. */
export interface PatchProjectsLocationsNetworksRequest {
  /** Output only. The resource name of this `Network`. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. Format: `projects/{project}/locations/{location}/networks/{network}` */
  name: string;
  /** The list of fields to update. The only currently supported fields are: `labels`, `reservations`, `vrf.vlan_attachments` */
  updateMask?: string;
  /** Request body */
  body?: Network;
}

export const PatchProjectsLocationsNetworksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Network).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/networks/{networksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsNetworksRequest>;

export type PatchProjectsLocationsNetworksResponse = Operation;
export const PatchProjectsLocationsNetworksResponse = Operation;

export type PatchProjectsLocationsNetworksError = CommonErrors;

export const patchProjectsLocationsNetworks: API.OperationMethod<PatchProjectsLocationsNetworksRequest, PatchProjectsLocationsNetworksResponse, PatchProjectsLocationsNetworksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsNetworksRequest,
  output: PatchProjectsLocationsNetworksResponse,
  errors: [],
}));

/** Get details of a single OS image. */
export interface GetProjectsLocationsOsImagesRequest {
  /** Required. Name of the OS image. */
  name: string;
}

export const GetProjectsLocationsOsImagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/osImages/{osImagesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOsImagesRequest>;

export type GetProjectsLocationsOsImagesResponse = OSImage;
export const GetProjectsLocationsOsImagesResponse = OSImage;

export type GetProjectsLocationsOsImagesError = CommonErrors;

export const getProjectsLocationsOsImages: API.OperationMethod<GetProjectsLocationsOsImagesRequest, GetProjectsLocationsOsImagesResponse, GetProjectsLocationsOsImagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOsImagesRequest,
  output: GetProjectsLocationsOsImagesResponse,
  errors: [],
}));

/** Retrieves the list of OS images which are currently approved. */
export interface ListProjectsLocationsOsImagesRequest {
  /** A token identifying a page of results from the server. */
  pageToken?: string;
  /** Requested page size. The server might return fewer items than requested. If unspecified, server will pick an appropriate default. Notice that page_size field is not supported and won't be respected in the API request for now, will be updated when pagination is supported. */
  pageSize?: number;
  /** Required. Parent value for ListOSImagesRequest. */
  parent: string;
}

export const ListProjectsLocationsOsImagesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/osImages" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOsImagesRequest>;

export type ListProjectsLocationsOsImagesResponse = ListOSImagesResponse;
export const ListProjectsLocationsOsImagesResponse = ListOSImagesResponse;

export type ListProjectsLocationsOsImagesError = CommonErrors;

export const listProjectsLocationsOsImages = API.makePaginated(() => ({
  input: ListProjectsLocationsOsImagesRequest,
  output: ListProjectsLocationsOsImagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the public SSH keys registered for the specified project. These SSH keys are used only for the interactive serial console feature. */
export interface ListProjectsLocationsSshKeysRequest {
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Required. The parent containing the SSH keys. Currently, the only valid value for the location is "global". */
  parent: string;
}

export const ListProjectsLocationsSshKeysRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/sshKeys" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSshKeysRequest>;

export type ListProjectsLocationsSshKeysResponse = ListSSHKeysResponse;
export const ListProjectsLocationsSshKeysResponse = ListSSHKeysResponse;

export type ListProjectsLocationsSshKeysError = CommonErrors;

export const listProjectsLocationsSshKeys = API.makePaginated(() => ({
  input: ListProjectsLocationsSshKeysRequest,
  output: ListProjectsLocationsSshKeysResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Register a public SSH key in the specified project for use with the interactive serial console feature. */
export interface CreateProjectsLocationsSshKeysRequest {
  /** Required. The ID to use for the key, which will become the final component of the key's resource name. This value must match the regex: [a-zA-Z0-9@.\-_]{1,64} */
  sshKeyId?: string;
  /** Required. The parent containing the SSH keys. */
  parent: string;
  /** Request body */
  body?: SSHKey;
}

export const CreateProjectsLocationsSshKeysRequest = Schema.Struct({
  sshKeyId: Schema.optional(Schema.String).pipe(T.HttpQuery("sshKeyId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SSHKey).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/sshKeys", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsSshKeysRequest>;

export type CreateProjectsLocationsSshKeysResponse = SSHKey;
export const CreateProjectsLocationsSshKeysResponse = SSHKey;

export type CreateProjectsLocationsSshKeysError = CommonErrors;

export const createProjectsLocationsSshKeys: API.OperationMethod<CreateProjectsLocationsSshKeysRequest, CreateProjectsLocationsSshKeysResponse, CreateProjectsLocationsSshKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsSshKeysRequest,
  output: CreateProjectsLocationsSshKeysResponse,
  errors: [],
}));

/** Deletes a public SSH key registered in the specified project. */
export interface DeleteProjectsLocationsSshKeysRequest {
  /** Required. The name of the SSH key to delete. Currently, the only valid value for the location is "global". */
  name: string;
}

export const DeleteProjectsLocationsSshKeysRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/sshKeys/{sshKeysId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSshKeysRequest>;

export type DeleteProjectsLocationsSshKeysResponse = Empty;
export const DeleteProjectsLocationsSshKeysResponse = Empty;

export type DeleteProjectsLocationsSshKeysError = CommonErrors;

export const deleteProjectsLocationsSshKeys: API.OperationMethod<DeleteProjectsLocationsSshKeysRequest, DeleteProjectsLocationsSshKeysResponse, DeleteProjectsLocationsSshKeysError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSshKeysRequest,
  output: DeleteProjectsLocationsSshKeysResponse,
  errors: [],
}));

/** Get details about an operation. */
export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Delete an NFS share. The underlying volume is automatically deleted. */
export interface DeleteProjectsLocationsNfsSharesRequest {
  /** Required. The name of the NFS share to delete. */
  name: string;
}

export const DeleteProjectsLocationsNfsSharesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/nfsShares/{nfsSharesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsNfsSharesRequest>;

export type DeleteProjectsLocationsNfsSharesResponse = Operation;
export const DeleteProjectsLocationsNfsSharesResponse = Operation;

export type DeleteProjectsLocationsNfsSharesError = CommonErrors;

export const deleteProjectsLocationsNfsShares: API.OperationMethod<DeleteProjectsLocationsNfsSharesRequest, DeleteProjectsLocationsNfsSharesResponse, DeleteProjectsLocationsNfsSharesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsNfsSharesRequest,
  output: DeleteProjectsLocationsNfsSharesResponse,
  errors: [],
}));

/** List NFS shares. */
export interface ListProjectsLocationsNfsSharesRequest {
  /** Requested page size. The server might return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results from the server. */
  pageToken?: string;
  /** List filter. */
  filter?: string;
  /** Required. Parent value for ListNfsSharesRequest. */
  parent: string;
}

export const ListProjectsLocationsNfsSharesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/nfsShares" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsNfsSharesRequest>;

export type ListProjectsLocationsNfsSharesResponse = ListNfsSharesResponse;
export const ListProjectsLocationsNfsSharesResponse = ListNfsSharesResponse;

export type ListProjectsLocationsNfsSharesError = CommonErrors;

export const listProjectsLocationsNfsShares = API.makePaginated(() => ({
  input: ListProjectsLocationsNfsSharesRequest,
  output: ListProjectsLocationsNfsSharesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** RenameNfsShare sets a new name for an nfsshare. Use with caution, previous names become immediately invalidated. */
export interface RenameProjectsLocationsNfsSharesRequest {
  /** Required. The `name` field is used to identify the nfsshare. Format: projects/{project}/locations/{location}/nfsshares/{nfsshare} */
  name: string;
  /** Request body */
  body?: RenameNfsShareRequest;
}

export const RenameProjectsLocationsNfsSharesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RenameNfsShareRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/nfsShares/{nfsSharesId}:rename", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RenameProjectsLocationsNfsSharesRequest>;

export type RenameProjectsLocationsNfsSharesResponse = NfsShare;
export const RenameProjectsLocationsNfsSharesResponse = NfsShare;

export type RenameProjectsLocationsNfsSharesError = CommonErrors;

export const renameProjectsLocationsNfsShares: API.OperationMethod<RenameProjectsLocationsNfsSharesRequest, RenameProjectsLocationsNfsSharesResponse, RenameProjectsLocationsNfsSharesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RenameProjectsLocationsNfsSharesRequest,
  output: RenameProjectsLocationsNfsSharesResponse,
  errors: [],
}));

/** Get details of a single NFS share. */
export interface GetProjectsLocationsNfsSharesRequest {
  /** Required. Name of the resource. */
  name: string;
}

export const GetProjectsLocationsNfsSharesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/nfsShares/{nfsSharesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsNfsSharesRequest>;

export type GetProjectsLocationsNfsSharesResponse = NfsShare;
export const GetProjectsLocationsNfsSharesResponse = NfsShare;

export type GetProjectsLocationsNfsSharesError = CommonErrors;

export const getProjectsLocationsNfsShares: API.OperationMethod<GetProjectsLocationsNfsSharesRequest, GetProjectsLocationsNfsSharesResponse, GetProjectsLocationsNfsSharesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsNfsSharesRequest,
  output: GetProjectsLocationsNfsSharesResponse,
  errors: [],
}));

/** Create an NFS share. */
export interface CreateProjectsLocationsNfsSharesRequest {
  /** Required. The parent project and location. */
  parent: string;
  /** Request body */
  body?: NfsShare;
}

export const CreateProjectsLocationsNfsSharesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(NfsShare).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/nfsShares", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsNfsSharesRequest>;

export type CreateProjectsLocationsNfsSharesResponse = Operation;
export const CreateProjectsLocationsNfsSharesResponse = Operation;

export type CreateProjectsLocationsNfsSharesError = CommonErrors;

export const createProjectsLocationsNfsShares: API.OperationMethod<CreateProjectsLocationsNfsSharesRequest, CreateProjectsLocationsNfsSharesResponse, CreateProjectsLocationsNfsSharesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsNfsSharesRequest,
  output: CreateProjectsLocationsNfsSharesResponse,
  errors: [],
}));

/** Update details of a single NFS share. */
export interface PatchProjectsLocationsNfsSharesRequest {
  /** Immutable. The name of the NFS share. */
  name: string;
  /** The list of fields to update. The only currently supported fields are: `labels` `allowed_clients` */
  updateMask?: string;
  /** Request body */
  body?: NfsShare;
}

export const PatchProjectsLocationsNfsSharesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(NfsShare).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/nfsShares/{nfsSharesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsNfsSharesRequest>;

export type PatchProjectsLocationsNfsSharesResponse = Operation;
export const PatchProjectsLocationsNfsSharesResponse = Operation;

export type PatchProjectsLocationsNfsSharesError = CommonErrors;

export const patchProjectsLocationsNfsShares: API.OperationMethod<PatchProjectsLocationsNfsSharesRequest, PatchProjectsLocationsNfsSharesResponse, PatchProjectsLocationsNfsSharesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsNfsSharesRequest,
  output: PatchProjectsLocationsNfsSharesResponse,
  errors: [],
}));

/** List the budget details to provision resources on a given project. */
export interface ListProjectsLocationsProvisioningQuotasRequest {
  /** A token identifying a page of results from the server. */
  pageToken?: string;
  /** Required. Parent value for ListProvisioningQuotasRequest. */
  parent: string;
  /** Requested page size. The server might return fewer items than requested. If unspecified, server will pick an appropriate default. Notice that page_size field is not supported and won't be respected in the API request for now, will be updated when pagination is supported. */
  pageSize?: number;
}

export const ListProjectsLocationsProvisioningQuotasRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/provisioningQuotas" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsProvisioningQuotasRequest>;

export type ListProjectsLocationsProvisioningQuotasResponse = ListProvisioningQuotasResponse;
export const ListProjectsLocationsProvisioningQuotasResponse = ListProvisioningQuotasResponse;

export type ListProjectsLocationsProvisioningQuotasError = CommonErrors;

export const listProjectsLocationsProvisioningQuotas = API.makePaginated(() => ({
  input: ListProjectsLocationsProvisioningQuotasRequest,
  output: ListProjectsLocationsProvisioningQuotasResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Perform reimage operation on a single server. */
export interface ReimageProjectsLocationsInstancesRequest {
  /** Required. The `name` field is used to identify the instance. Format: projects/{project}/locations/{location}/instances/{instance} */
  name: string;
  /** Request body */
  body?: ReimageInstanceRequest;
}

export const ReimageProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ReimageInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:reimage", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReimageProjectsLocationsInstancesRequest>;

export type ReimageProjectsLocationsInstancesResponse = Operation;
export const ReimageProjectsLocationsInstancesResponse = Operation;

export type ReimageProjectsLocationsInstancesError = CommonErrors;

export const reimageProjectsLocationsInstances: API.OperationMethod<ReimageProjectsLocationsInstancesRequest, ReimageProjectsLocationsInstancesResponse, ReimageProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReimageProjectsLocationsInstancesRequest,
  output: ReimageProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Stop a running server. */
export interface StopProjectsLocationsInstancesRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Request body */
  body?: StopInstanceRequest;
}

export const StopProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(StopInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:stop", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StopProjectsLocationsInstancesRequest>;

export type StopProjectsLocationsInstancesResponse = Operation;
export const StopProjectsLocationsInstancesResponse = Operation;

export type StopProjectsLocationsInstancesError = CommonErrors;

export const stopProjectsLocationsInstances: API.OperationMethod<StopProjectsLocationsInstancesRequest, StopProjectsLocationsInstancesResponse, StopProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StopProjectsLocationsInstancesRequest,
  output: StopProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Get details about a single server. */
export interface GetProjectsLocationsInstancesRequest {
  /** Required. Name of the resource. */
  name: string;
}

export const GetProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsInstancesRequest>;

export type GetProjectsLocationsInstancesResponse = Instance;
export const GetProjectsLocationsInstancesResponse = Instance;

export type GetProjectsLocationsInstancesError = CommonErrors;

export const getProjectsLocationsInstances: API.OperationMethod<GetProjectsLocationsInstancesRequest, GetProjectsLocationsInstancesResponse, GetProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsInstancesRequest,
  output: GetProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Perform enable hyperthreading operation on a single server. */
export interface EnableHyperthreadingProjectsLocationsInstancesRequest {
  /** Required. The `name` field is used to identify the instance. Format: projects/{project}/locations/{location}/instances/{instance} */
  name: string;
  /** Request body */
  body?: EnableHyperthreadingRequest;
}

export const EnableHyperthreadingProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(EnableHyperthreadingRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:enableHyperthreading", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EnableHyperthreadingProjectsLocationsInstancesRequest>;

export type EnableHyperthreadingProjectsLocationsInstancesResponse = Operation;
export const EnableHyperthreadingProjectsLocationsInstancesResponse = Operation;

export type EnableHyperthreadingProjectsLocationsInstancesError = CommonErrors;

export const enableHyperthreadingProjectsLocationsInstances: API.OperationMethod<EnableHyperthreadingProjectsLocationsInstancesRequest, EnableHyperthreadingProjectsLocationsInstancesResponse, EnableHyperthreadingProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EnableHyperthreadingProjectsLocationsInstancesRequest,
  output: EnableHyperthreadingProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Enable the interactive serial console feature on an instance. */
export interface EnableInteractiveSerialConsoleProjectsLocationsInstancesRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Request body */
  body?: EnableInteractiveSerialConsoleRequest;
}

export const EnableInteractiveSerialConsoleProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(EnableInteractiveSerialConsoleRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:enableInteractiveSerialConsole", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EnableInteractiveSerialConsoleProjectsLocationsInstancesRequest>;

export type EnableInteractiveSerialConsoleProjectsLocationsInstancesResponse = Operation;
export const EnableInteractiveSerialConsoleProjectsLocationsInstancesResponse = Operation;

export type EnableInteractiveSerialConsoleProjectsLocationsInstancesError = CommonErrors;

export const enableInteractiveSerialConsoleProjectsLocationsInstances: API.OperationMethod<EnableInteractiveSerialConsoleProjectsLocationsInstancesRequest, EnableInteractiveSerialConsoleProjectsLocationsInstancesResponse, EnableInteractiveSerialConsoleProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EnableInteractiveSerialConsoleProjectsLocationsInstancesRequest,
  output: EnableInteractiveSerialConsoleProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Perform an ungraceful, hard reset on a server. Equivalent to shutting the power off and then turning it back on. */
export interface ResetProjectsLocationsInstancesRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Request body */
  body?: ResetInstanceRequest;
}

export const ResetProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ResetInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:reset", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetProjectsLocationsInstancesRequest>;

export type ResetProjectsLocationsInstancesResponse = Operation;
export const ResetProjectsLocationsInstancesResponse = Operation;

export type ResetProjectsLocationsInstancesError = CommonErrors;

export const resetProjectsLocationsInstances: API.OperationMethod<ResetProjectsLocationsInstancesRequest, ResetProjectsLocationsInstancesResponse, ResetProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetProjectsLocationsInstancesRequest,
  output: ResetProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Disable the interactive serial console feature on an instance. */
export interface DisableInteractiveSerialConsoleProjectsLocationsInstancesRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Request body */
  body?: DisableInteractiveSerialConsoleRequest;
}

export const DisableInteractiveSerialConsoleProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DisableInteractiveSerialConsoleRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:disableInteractiveSerialConsole", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DisableInteractiveSerialConsoleProjectsLocationsInstancesRequest>;

export type DisableInteractiveSerialConsoleProjectsLocationsInstancesResponse = Operation;
export const DisableInteractiveSerialConsoleProjectsLocationsInstancesResponse = Operation;

export type DisableInteractiveSerialConsoleProjectsLocationsInstancesError = CommonErrors;

export const disableInteractiveSerialConsoleProjectsLocationsInstances: API.OperationMethod<DisableInteractiveSerialConsoleProjectsLocationsInstancesRequest, DisableInteractiveSerialConsoleProjectsLocationsInstancesResponse, DisableInteractiveSerialConsoleProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DisableInteractiveSerialConsoleProjectsLocationsInstancesRequest,
  output: DisableInteractiveSerialConsoleProjectsLocationsInstancesResponse,
  errors: [],
}));

/** RenameInstance sets a new name for an instance. Use with caution, previous names become immediately invalidated. */
export interface RenameProjectsLocationsInstancesRequest {
  /** Required. The `name` field is used to identify the instance. Format: projects/{project}/locations/{location}/instances/{instance} */
  name: string;
  /** Request body */
  body?: RenameInstanceRequest;
}

export const RenameProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RenameInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:rename", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RenameProjectsLocationsInstancesRequest>;

export type RenameProjectsLocationsInstancesResponse = Instance;
export const RenameProjectsLocationsInstancesResponse = Instance;

export type RenameProjectsLocationsInstancesError = CommonErrors;

export const renameProjectsLocationsInstances: API.OperationMethod<RenameProjectsLocationsInstancesRequest, RenameProjectsLocationsInstancesResponse, RenameProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RenameProjectsLocationsInstancesRequest,
  output: RenameProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Starts a server that was shutdown. */
export interface StartProjectsLocationsInstancesRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Request body */
  body?: StartInstanceRequest;
}

export const StartProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(StartInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:start", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StartProjectsLocationsInstancesRequest>;

export type StartProjectsLocationsInstancesResponse = Operation;
export const StartProjectsLocationsInstancesResponse = Operation;

export type StartProjectsLocationsInstancesError = CommonErrors;

export const startProjectsLocationsInstances: API.OperationMethod<StartProjectsLocationsInstancesRequest, StartProjectsLocationsInstancesResponse, StartProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StartProjectsLocationsInstancesRequest,
  output: StartProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Update details of a single server. */
export interface PatchProjectsLocationsInstancesRequest {
  /** The list of fields to update. The currently supported fields are: `labels` `hyperthreading_enabled` `os_image` `ssh_keys` `kms_key_version` */
  updateMask?: string;
  /** Immutable. The resource name of this `Instance`. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. Format: `projects/{project}/locations/{location}/instances/{instance}` */
  name: string;
  /** Request body */
  body?: Instance;
}

export const PatchProjectsLocationsInstancesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Instance).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsInstancesRequest>;

export type PatchProjectsLocationsInstancesResponse = Operation;
export const PatchProjectsLocationsInstancesResponse = Operation;

export type PatchProjectsLocationsInstancesError = CommonErrors;

export const patchProjectsLocationsInstances: API.OperationMethod<PatchProjectsLocationsInstancesRequest, PatchProjectsLocationsInstancesResponse, PatchProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsInstancesRequest,
  output: PatchProjectsLocationsInstancesResponse,
  errors: [],
}));

/** List servers in a given project and location. */
export interface ListProjectsLocationsInstancesRequest {
  /** List filter. */
  filter?: string;
  /** Required. Parent value for ListInstancesRequest. */
  parent: string;
  /** A token identifying a page of results from the server. */
  pageToken?: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, the server will pick an appropriate default. */
  pageSize?: number;
}

export const ListProjectsLocationsInstancesRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/instances" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInstancesRequest>;

export type ListProjectsLocationsInstancesResponse = ListInstancesResponse;
export const ListProjectsLocationsInstancesResponse = ListInstancesResponse;

export type ListProjectsLocationsInstancesError = CommonErrors;

export const listProjectsLocationsInstances = API.makePaginated(() => ({
  input: ListProjectsLocationsInstancesRequest,
  output: ListProjectsLocationsInstancesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Detach LUN from Instance. */
export interface DetachLunProjectsLocationsInstancesRequest {
  /** Required. Name of the instance. */
  instance: string;
  /** Request body */
  body?: DetachLunRequest;
}

export const DetachLunProjectsLocationsInstancesRequest = Schema.Struct({
  instance: Schema.String.pipe(T.HttpPath("instance")),
  body: Schema.optional(DetachLunRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:detachLun", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DetachLunProjectsLocationsInstancesRequest>;

export type DetachLunProjectsLocationsInstancesResponse = Operation;
export const DetachLunProjectsLocationsInstancesResponse = Operation;

export type DetachLunProjectsLocationsInstancesError = CommonErrors;

export const detachLunProjectsLocationsInstances: API.OperationMethod<DetachLunProjectsLocationsInstancesRequest, DetachLunProjectsLocationsInstancesResponse, DetachLunProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DetachLunProjectsLocationsInstancesRequest,
  output: DetachLunProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Perform disable hyperthreading operation on a single server. */
export interface DisableHyperthreadingProjectsLocationsInstancesRequest {
  /** Required. The `name` field is used to identify the instance. Format: projects/{project}/locations/{location}/instances/{instance} */
  name: string;
  /** Request body */
  body?: DisableHyperthreadingRequest;
}

export const DisableHyperthreadingProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DisableHyperthreadingRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:disableHyperthreading", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DisableHyperthreadingProjectsLocationsInstancesRequest>;

export type DisableHyperthreadingProjectsLocationsInstancesResponse = Operation;
export const DisableHyperthreadingProjectsLocationsInstancesResponse = Operation;

export type DisableHyperthreadingProjectsLocationsInstancesError = CommonErrors;

export const disableHyperthreadingProjectsLocationsInstances: API.OperationMethod<DisableHyperthreadingProjectsLocationsInstancesRequest, DisableHyperthreadingProjectsLocationsInstancesResponse, DisableHyperthreadingProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DisableHyperthreadingProjectsLocationsInstancesRequest,
  output: DisableHyperthreadingProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Load auth info for a server. */
export interface LoadAuthInfoProjectsLocationsInstancesRequest {
  /** Required. Name of the server. */
  name: string;
}

export const LoadAuthInfoProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:loadAuthInfo" }),
  svc,
) as unknown as Schema.Schema<LoadAuthInfoProjectsLocationsInstancesRequest>;

export type LoadAuthInfoProjectsLocationsInstancesResponse = LoadInstanceAuthInfoResponse;
export const LoadAuthInfoProjectsLocationsInstancesResponse = LoadInstanceAuthInfoResponse;

export type LoadAuthInfoProjectsLocationsInstancesError = CommonErrors;

export const loadAuthInfoProjectsLocationsInstances: API.OperationMethod<LoadAuthInfoProjectsLocationsInstancesRequest, LoadAuthInfoProjectsLocationsInstancesResponse, LoadAuthInfoProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LoadAuthInfoProjectsLocationsInstancesRequest,
  output: LoadAuthInfoProjectsLocationsInstancesResponse,
  errors: [],
}));

