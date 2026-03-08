// ==========================================================================
// Migration Center API (migrationcenter v1alpha1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "migrationcenter",
  version: "v1alpha1",
  rootUrl: "https://migrationcenter.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface ResourceLocation {
  /** Optional. The name of the region. */
  region?: string;
}

export const ResourceLocation: Schema.Schema<ResourceLocation> = Schema.suspend(() => Schema.Struct({
  region: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceLocation" }) as any as Schema.Schema<ResourceLocation>;

export interface HostingProviderDetailsAws {
  /** Optional. The AWS account ID owning the resource represented by this asset. */
  owningAccountId?: string;
}

export const HostingProviderDetailsAws: Schema.Schema<HostingProviderDetailsAws> = Schema.suspend(() => Schema.Struct({
  owningAccountId: Schema.optional(Schema.String),
})).annotate({ identifier: "HostingProviderDetailsAws" }) as any as Schema.Schema<HostingProviderDetailsAws>;

export interface HostingProviderDetails {
  /** Optional. Unique identifier for the asset in the hosting provider. */
  originalId?: string;
  /** Optional. Display name of the asset. */
  displayName?: string;
  /** Optional. The timestamp when resource was created in the hosting provider. */
  createTime?: string;
  /** Optional. Location of the asset. */
  location?: ResourceLocation;
  /** Optional. The AWS platform details. */
  aws?: HostingProviderDetailsAws;
}

export const HostingProviderDetails: Schema.Schema<HostingProviderDetails> = Schema.suspend(() => Schema.Struct({
  originalId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  location: Schema.optional(ResourceLocation),
  aws: Schema.optional(HostingProviderDetailsAws),
})).annotate({ identifier: "HostingProviderDetails" }) as any as Schema.Schema<HostingProviderDetails>;

export interface BiosDetails {
  /** BIOS name. */
  biosName?: string;
  /** BIOS ID. */
  id?: string;
  /** BIOS manufacturer. */
  biosManufacturer?: string;
  /** BIOS manufacturer. */
  manufacturer?: string;
  /** BIOS version. */
  biosVersion?: string;
  /** BIOS version. */
  version?: string;
  /** BIOS release date. */
  biosReleaseDate?: string;
  /** BIOS release date. */
  releaseTime?: string;
  /** SMBIOS UUID. */
  smbiosUuid?: string;
}

export const BiosDetails: Schema.Schema<BiosDetails> = Schema.suspend(() => Schema.Struct({
  biosName: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  biosManufacturer: Schema.optional(Schema.String),
  manufacturer: Schema.optional(Schema.String),
  biosVersion: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  biosReleaseDate: Schema.optional(Schema.String),
  releaseTime: Schema.optional(Schema.String),
  smbiosUuid: Schema.optional(Schema.String),
})).annotate({ identifier: "BiosDetails" }) as any as Schema.Schema<BiosDetails>;

export interface VirtualMachineArchitectureDetails {
  /** CPU architecture, e.g., "x64-based PC", "x86_64", "i686" etc. */
  cpuArchitecture?: string;
  /** CPU name, e.g., "Intel Xeon E5-2690", "AMD EPYC 7571" etc. */
  cpuName?: string;
  /** CPU manufacturer, e.g., "Intel", "AMD". */
  cpuManufacturer?: string;
  /** Hardware vendor. */
  vendor?: string;
  /** Deprecated: use VirtualMachineDetails.core_count instead. Number of CPU threads allocated to the machine. */
  cpuThreadCount?: number;
  /** Number of processor sockets allocated to the machine. */
  cpuSocketCount?: number;
  /** BIOS Details. */
  bios?: BiosDetails;
  /** Firmware (BIOS/efi). */
  firmware?: string;
  /** CPU hyperthreading support. */
  hyperthreading?: "HYPER_THREADING_UNSPECIFIED" | "HYPER_THREADING_DISABLED" | "HYPER_THREADING_ENABLED" | (string & {});
}

export const VirtualMachineArchitectureDetails: Schema.Schema<VirtualMachineArchitectureDetails> = Schema.suspend(() => Schema.Struct({
  cpuArchitecture: Schema.optional(Schema.String),
  cpuName: Schema.optional(Schema.String),
  cpuManufacturer: Schema.optional(Schema.String),
  vendor: Schema.optional(Schema.String),
  cpuThreadCount: Schema.optional(Schema.Number),
  cpuSocketCount: Schema.optional(Schema.Number),
  bios: Schema.optional(BiosDetails),
  firmware: Schema.optional(Schema.String),
  hyperthreading: Schema.optional(Schema.String),
})).annotate({ identifier: "VirtualMachineArchitectureDetails" }) as any as Schema.Schema<VirtualMachineArchitectureDetails>;

export interface NetworkAddress {
  /** Assigned or configured IP Address. */
  ipAddress?: string;
  /** Subnet mask. */
  subnetMask?: string;
  /** Broadcast address. */
  bcast?: string;
  /** Fully qualified domain name. */
  fqdn?: string;
  /** Whether DHCP is used to assign addresses. */
  assignment?: "ADDRESS_ASSIGNMENT_UNSPECIFIED" | "ADDRESS_ASSIGNMENT_STATIC" | "ADDRESS_ASSIGNMENT_DHCP" | (string & {});
}

export const NetworkAddress: Schema.Schema<NetworkAddress> = Schema.suspend(() => Schema.Struct({
  ipAddress: Schema.optional(Schema.String),
  subnetMask: Schema.optional(Schema.String),
  bcast: Schema.optional(Schema.String),
  fqdn: Schema.optional(Schema.String),
  assignment: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkAddress" }) as any as Schema.Schema<NetworkAddress>;

export interface NetworkAddressList {
  /** Network address entries. */
  addresses?: Array<NetworkAddress>;
  /** Network address entries. */
  entries?: Array<NetworkAddress>;
}

export const NetworkAddressList: Schema.Schema<NetworkAddressList> = Schema.suspend(() => Schema.Struct({
  addresses: Schema.optional(Schema.Array(NetworkAddress)),
  entries: Schema.optional(Schema.Array(NetworkAddress)),
})).annotate({ identifier: "NetworkAddressList" }) as any as Schema.Schema<NetworkAddressList>;

export interface NetworkAdapterDetails {
  /** Network adapter type (e.g. VMXNET3). */
  adapterType?: string;
  /** MAC address. */
  macAddress?: string;
  /** NetworkAddressList */
  addresses?: NetworkAddressList;
}

export const NetworkAdapterDetails: Schema.Schema<NetworkAdapterDetails> = Schema.suspend(() => Schema.Struct({
  adapterType: Schema.optional(Schema.String),
  macAddress: Schema.optional(Schema.String),
  addresses: Schema.optional(NetworkAddressList),
})).annotate({ identifier: "NetworkAdapterDetails" }) as any as Schema.Schema<NetworkAdapterDetails>;

export interface NetworkAdapterList {
  /** Network adapter descriptions. */
  networkAdapters?: Array<NetworkAdapterDetails>;
  /** Network adapter entries. */
  entries?: Array<NetworkAdapterDetails>;
}

export const NetworkAdapterList: Schema.Schema<NetworkAdapterList> = Schema.suspend(() => Schema.Struct({
  networkAdapters: Schema.optional(Schema.Array(NetworkAdapterDetails)),
  entries: Schema.optional(Schema.Array(NetworkAdapterDetails)),
})).annotate({ identifier: "NetworkAdapterList" }) as any as Schema.Schema<NetworkAdapterList>;

export interface VirtualMachineNetworkDetails {
  /** IP address of the machine. */
  primaryIpAddress?: string;
  /** List of network adapters. */
  networkAdapters?: NetworkAdapterList;
  /** Default gateway address. */
  defaultGw?: string;
  /** MAC address of the machine. This property is used to uniqly identify the machine. */
  primaryMacAddress?: string;
  /** Public IP address of the machine. */
  publicIpAddress?: string;
}

export const VirtualMachineNetworkDetails: Schema.Schema<VirtualMachineNetworkDetails> = Schema.suspend(() => Schema.Struct({
  primaryIpAddress: Schema.optional(Schema.String),
  networkAdapters: Schema.optional(NetworkAdapterList),
  defaultGw: Schema.optional(Schema.String),
  primaryMacAddress: Schema.optional(Schema.String),
  publicIpAddress: Schema.optional(Schema.String),
})).annotate({ identifier: "VirtualMachineNetworkDetails" }) as any as Schema.Schema<VirtualMachineNetworkDetails>;

export interface DiskPartition {
  /** Partition type (e.g. BIOS boot). */
  type?: string;
  /** Partition file system. */
  fileSystem?: string;
  /** Mount point (Linux/Windows) or drive letter (Windows). */
  mountPoint?: string;
  /** Partition capacity. */
  capacityBytes?: string;
  /** Partition free space. */
  freeBytes?: string;
  /** Partition UUID. */
  uuid?: string;
  /** Sub-partitions. */
  subPartitions?: DiskPartitionList;
}

export const DiskPartition: Schema.Schema<DiskPartition> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  fileSystem: Schema.optional(Schema.String),
  mountPoint: Schema.optional(Schema.String),
  capacityBytes: Schema.optional(Schema.String),
  freeBytes: Schema.optional(Schema.String),
  uuid: Schema.optional(Schema.String),
  subPartitions: Schema.optional(DiskPartitionList),
})).annotate({ identifier: "DiskPartition" }) as any as Schema.Schema<DiskPartition>;

export interface DiskPartitionList {
  /** Partition entries. */
  entries?: Array<DiskPartition>;
}

export const DiskPartitionList: Schema.Schema<DiskPartitionList> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(DiskPartition)),
})).annotate({ identifier: "DiskPartitionList" }) as any as Schema.Schema<DiskPartitionList>;

export interface DiskEntry {
  /** Disk capacity. */
  totalCapacityBytes?: string;
  /** Disk capacity. */
  capacityBytes?: string;
  /** Disk free space. */
  totalFreeBytes?: string;
  /** Disk free space. */
  freeSpaceBytes?: string;
  /** Disk label. */
  diskLabel?: string;
  /** Disk label type (e.g. BIOS/GPT) */
  diskLabelType?: string;
  /** Disk status (e.g. online). */
  status?: string;
  /** Disks interface type (e.g. SATA/SCSI) */
  interfaceType?: string;
  /** Partition layout. */
  partitions?: DiskPartitionList;
  /** Disk hardware address (e.g. 0:1 for SCSI). */
  hwAddress?: string;
}

export const DiskEntry: Schema.Schema<DiskEntry> = Schema.suspend(() => Schema.Struct({
  totalCapacityBytes: Schema.optional(Schema.String),
  capacityBytes: Schema.optional(Schema.String),
  totalFreeBytes: Schema.optional(Schema.String),
  freeSpaceBytes: Schema.optional(Schema.String),
  diskLabel: Schema.optional(Schema.String),
  diskLabelType: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  interfaceType: Schema.optional(Schema.String),
  partitions: Schema.optional(DiskPartitionList),
  hwAddress: Schema.optional(Schema.String),
})).annotate({ identifier: "DiskEntry" }) as any as Schema.Schema<DiskEntry>;

export interface DiskEntryList {
  /** Disk entries. */
  entries?: Array<DiskEntry>;
}

export const DiskEntryList: Schema.Schema<DiskEntryList> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(DiskEntry)),
})).annotate({ identifier: "DiskEntryList" }) as any as Schema.Schema<DiskEntryList>;

export interface VirtualMachineDiskDetails {
  /** Disk total Capacity. */
  hddTotalCapacityBytes?: string;
  /** Total Disk Free Space. */
  hddTotalFreeBytes?: string;
  /** List of disks. */
  disks?: DiskEntryList;
  /** Raw lsblk output in json. */
  lsblkJson?: string;
}

export const VirtualMachineDiskDetails: Schema.Schema<VirtualMachineDiskDetails> = Schema.suspend(() => Schema.Struct({
  hddTotalCapacityBytes: Schema.optional(Schema.String),
  hddTotalFreeBytes: Schema.optional(Schema.String),
  disks: Schema.optional(DiskEntryList),
  lsblkJson: Schema.optional(Schema.String),
})).annotate({ identifier: "VirtualMachineDiskDetails" }) as any as Schema.Schema<VirtualMachineDiskDetails>;

export interface DiskPartitionDetails {
  /** Output only. Total capacity of all partitions. */
  totalCapacityBytes?: string;
  /** Output only. Total free space of all partitions. */
  freeSpaceBytes?: string;
  /** Optional. List of partitions. */
  partitions?: DiskPartitionList;
}

export const DiskPartitionDetails: Schema.Schema<DiskPartitionDetails> = Schema.suspend(() => Schema.Struct({
  totalCapacityBytes: Schema.optional(Schema.String),
  freeSpaceBytes: Schema.optional(Schema.String),
  partitions: Schema.optional(DiskPartitionList),
})).annotate({ identifier: "DiskPartitionDetails" }) as any as Schema.Schema<DiskPartitionDetails>;

export interface FstabEntry {
  /** The block special device or remote filesystem to be mounted. */
  spec?: string;
  /** The mount point for the filesystem. */
  file?: string;
  /** The type of the filesystem. */
  vfstype?: string;
  /** Mount options associated with the filesystem. */
  mntops?: string;
  /** Used by dump to determine which filesystems need to be dumped. */
  freq?: number;
  /** Used by the fsck(8) program to determine the order in which filesystem checks are done at reboot time. */
  passno?: number;
}

export const FstabEntry: Schema.Schema<FstabEntry> = Schema.suspend(() => Schema.Struct({
  spec: Schema.optional(Schema.String),
  file: Schema.optional(Schema.String),
  vfstype: Schema.optional(Schema.String),
  mntops: Schema.optional(Schema.String),
  freq: Schema.optional(Schema.Number),
  passno: Schema.optional(Schema.Number),
})).annotate({ identifier: "FstabEntry" }) as any as Schema.Schema<FstabEntry>;

export interface FstabEntryList {
  /** Fstab entries. */
  entries?: Array<FstabEntry>;
}

export const FstabEntryList: Schema.Schema<FstabEntryList> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(FstabEntry)),
})).annotate({ identifier: "FstabEntryList" }) as any as Schema.Schema<FstabEntryList>;

export interface HostsEntry {
  /** IP (raw, IPv4/6 agnostic). */
  ip?: string;
  /** List of host names / aliases. */
  hostNames?: Array<string>;
}

export const HostsEntry: Schema.Schema<HostsEntry> = Schema.suspend(() => Schema.Struct({
  ip: Schema.optional(Schema.String),
  hostNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "HostsEntry" }) as any as Schema.Schema<HostsEntry>;

export interface HostsEntryList {
  /** Output only. Hosts entries. */
  entries?: Array<HostsEntry>;
}

export const HostsEntryList: Schema.Schema<HostsEntryList> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(HostsEntry)),
})).annotate({ identifier: "HostsEntryList" }) as any as Schema.Schema<HostsEntryList>;

export interface NfsExport {
  /** The directory being exported. */
  exportDirectory?: string;
  /** The hosts or networks to which the export is being shared. */
  hosts?: Array<string>;
}

export const NfsExport: Schema.Schema<NfsExport> = Schema.suspend(() => Schema.Struct({
  exportDirectory: Schema.optional(Schema.String),
  hosts: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "NfsExport" }) as any as Schema.Schema<NfsExport>;

export interface NfsExportList {
  /** NFS export entries. */
  entries?: Array<NfsExport>;
}

export const NfsExportList: Schema.Schema<NfsExportList> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(NfsExport)),
})).annotate({ identifier: "NfsExportList" }) as any as Schema.Schema<NfsExportList>;

export interface Selinux {
  /** Is SELinux enabled. */
  enabled?: boolean;
  /** SELinux mode disabled / enforcing / permissive. */
  mode?: string;
}

export const Selinux: Schema.Schema<Selinux> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  mode: Schema.optional(Schema.String),
})).annotate({ identifier: "Selinux" }) as any as Schema.Schema<Selinux>;

export interface GuestConfigDetails {
  /** OS issue (typically /etc/issue in Linux). */
  issue?: string;
  /** Mount list (Linux fstab). */
  fstab?: FstabEntryList;
  /** Output only. Hosts file (/etc/hosts). */
  hosts?: HostsEntryList;
  /** NFS exports. */
  nfsExports?: NfsExportList;
  /** SELinux details. */
  selinux?: Selinux;
  /** Security-Enhanced Linux (SELinux) mode. */
  selinuxMode?: "SE_LINUX_MODE_UNSPECIFIED" | "SE_LINUX_MODE_DISABLED" | "SE_LINUX_MODE_PERMISSIVE" | "SE_LINUX_MODE_ENFORCING" | (string & {});
}

export const GuestConfigDetails: Schema.Schema<GuestConfigDetails> = Schema.suspend(() => Schema.Struct({
  issue: Schema.optional(Schema.String),
  fstab: Schema.optional(FstabEntryList),
  hosts: Schema.optional(HostsEntryList),
  nfsExports: Schema.optional(NfsExportList),
  selinux: Schema.optional(Selinux),
  selinuxMode: Schema.optional(Schema.String),
})).annotate({ identifier: "GuestConfigDetails" }) as any as Schema.Schema<GuestConfigDetails>;

export interface RunningService {
  /** Service name. */
  name?: string;
  /** Service name. */
  serviceName?: string;
  /** Service state (raw, OS-agnostic). */
  state?: string;
  /** Service start mode (raw, OS-agnostic). */
  startMode?: string;
  /** Service status. */
  status?: string;
  /** Service binary path. */
  exePath?: string;
  /** Service command line. */
  cmdline?: string;
  /** Service pid. */
  pid?: string;
}

export const RunningService: Schema.Schema<RunningService> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  startMode: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  exePath: Schema.optional(Schema.String),
  cmdline: Schema.optional(Schema.String),
  pid: Schema.optional(Schema.String),
})).annotate({ identifier: "RunningService" }) as any as Schema.Schema<RunningService>;

export interface RunningServiceList {
  /** Running service entries. */
  services?: Array<RunningService>;
  /** Running service entries. */
  entries?: Array<RunningService>;
}

export const RunningServiceList: Schema.Schema<RunningServiceList> = Schema.suspend(() => Schema.Struct({
  services: Schema.optional(Schema.Array(RunningService)),
  entries: Schema.optional(Schema.Array(RunningService)),
})).annotate({ identifier: "RunningServiceList" }) as any as Schema.Schema<RunningServiceList>;

export interface RunningProcess {
  /** Process ID. */
  pid?: string;
  /** Process binary path. */
  exePath?: string;
  /** Process full command line. */
  cmdline?: string;
  /** User running the process. */
  user?: string;
  /** Process extended attributes. */
  attributes?: Record<string, string>;
}

export const RunningProcess: Schema.Schema<RunningProcess> = Schema.suspend(() => Schema.Struct({
  pid: Schema.optional(Schema.String),
  exePath: Schema.optional(Schema.String),
  cmdline: Schema.optional(Schema.String),
  user: Schema.optional(Schema.String),
  attributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "RunningProcess" }) as any as Schema.Schema<RunningProcess>;

export interface RunningProcessList {
  /** Running process entries. */
  processes?: Array<RunningProcess>;
  /** Running process entries. */
  entries?: Array<RunningProcess>;
}

export const RunningProcessList: Schema.Schema<RunningProcessList> = Schema.suspend(() => Schema.Struct({
  processes: Schema.optional(Schema.Array(RunningProcess)),
  entries: Schema.optional(Schema.Array(RunningProcess)),
})).annotate({ identifier: "RunningProcessList" }) as any as Schema.Schema<RunningProcessList>;

export interface NetworkConnection {
  /** Connection protocol (e.g. TCP/UDP). */
  protocol?: string;
  /** Local IP address. */
  localIpAddress?: string;
  /** Local port. */
  localPort?: number;
  /** Remote IP address. */
  remoteIpAddress?: string;
  /** Remote port. */
  remotePort?: number;
  /** Connection state (e.g. CONNECTED). */
  state?: string;
  /** Process ID. */
  pid?: string;
  /** Process or service name. */
  processName?: string;
}

export const NetworkConnection: Schema.Schema<NetworkConnection> = Schema.suspend(() => Schema.Struct({
  protocol: Schema.optional(Schema.String),
  localIpAddress: Schema.optional(Schema.String),
  localPort: Schema.optional(Schema.Number),
  remoteIpAddress: Schema.optional(Schema.String),
  remotePort: Schema.optional(Schema.Number),
  state: Schema.optional(Schema.String),
  pid: Schema.optional(Schema.String),
  processName: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkConnection" }) as any as Schema.Schema<NetworkConnection>;

export interface NetworkConnectionList {
  /** Network connection entries. */
  entries?: Array<NetworkConnection>;
}

export const NetworkConnectionList: Schema.Schema<NetworkConnectionList> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(NetworkConnection)),
})).annotate({ identifier: "NetworkConnectionList" }) as any as Schema.Schema<NetworkConnectionList>;

export interface TimeZone {
  /** IANA Time Zone Database time zone. For example "America/New_York". */
  id?: string;
  /** Optional. IANA Time Zone Database version number. For example "2019a". */
  version?: string;
}

export const TimeZone: Schema.Schema<TimeZone> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "TimeZone" }) as any as Schema.Schema<TimeZone>;

export interface DateTime {
  /** Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a datetime without a year. */
  year?: number;
  /** Optional. Month of year. Must be from 1 to 12, or 0 if specifying a datetime without a month. */
  month?: number;
  /** Optional. Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a datetime without a day. */
  day?: number;
  /** Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults to 0 (midnight). An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0. */
  minutes?: number;
  /** Optional. Seconds of minutes of the time. Must normally be from 0 to 59, defaults to 0. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Optional. Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999, defaults to 0. */
  nanos?: number;
  /** UTC offset. Must be whole seconds, between -18 hours and +18 hours. For example, a UTC offset of -4:00 would be represented as { seconds: -14400 }. */
  utcOffset?: string;
  /** Time zone. */
  timeZone?: TimeZone;
}

export const DateTime: Schema.Schema<DateTime> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
  hours: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  seconds: Schema.optional(Schema.Number),
  nanos: Schema.optional(Schema.Number),
  utcOffset: Schema.optional(Schema.String),
  timeZone: Schema.optional(TimeZone),
})).annotate({ identifier: "DateTime" }) as any as Schema.Schema<DateTime>;

export interface RuntimeNetworkInfo {
  /** Netstat (raw, OS-agnostic). */
  netstat?: string;
  /** Raw network scan result. This field is intended for human inspection. The format of this field may be netstat output or any another raw output. The exact format may change without notice and should not be relied upon. */
  rawScanResult?: string;
  /** Network connections. */
  connections?: NetworkConnectionList;
  /** Netstat time collected. */
  netstatTime?: DateTime;
  /** Time of the last network scan. */
  scanTime?: string;
}

export const RuntimeNetworkInfo: Schema.Schema<RuntimeNetworkInfo> = Schema.suspend(() => Schema.Struct({
  netstat: Schema.optional(Schema.String),
  rawScanResult: Schema.optional(Schema.String),
  connections: Schema.optional(NetworkConnectionList),
  netstatTime: Schema.optional(DateTime),
  scanTime: Schema.optional(Schema.String),
})).annotate({ identifier: "RuntimeNetworkInfo" }) as any as Schema.Schema<RuntimeNetworkInfo>;

export interface Migrationcenter_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Migrationcenter_Date: Schema.Schema<Migrationcenter_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Migrationcenter_Date" }) as any as Schema.Schema<Migrationcenter_Date>;

export interface GuestInstalledApplication {
  /** Installed application name. */
  name?: string;
  /** Installed application name. */
  applicationName?: string;
  /** Installed application vendor. */
  vendor?: string;
  /** Date application was installed. */
  time?: string;
  /** The time when the application was installed. */
  installTime?: string;
  /** Source path. */
  path?: string;
  /** Installed application version. */
  version?: string;
  /** License strings associated with the installed application. */
  licenses?: Array<string>;
}

export const GuestInstalledApplication: Schema.Schema<GuestInstalledApplication> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  applicationName: Schema.optional(Schema.String),
  vendor: Schema.optional(Schema.String),
  time: Schema.optional(Schema.String),
  installTime: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  licenses: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GuestInstalledApplication" }) as any as Schema.Schema<GuestInstalledApplication>;

export interface GuestInstalledApplicationList {
  /** Application entries. */
  entries?: Array<GuestInstalledApplication>;
}

export const GuestInstalledApplicationList: Schema.Schema<GuestInstalledApplicationList> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(GuestInstalledApplication)),
})).annotate({ identifier: "GuestInstalledApplicationList" }) as any as Schema.Schema<GuestInstalledApplicationList>;

export interface OpenFileDetails {
  /** Opened file command. */
  command?: string;
  /** Opened file user. */
  user?: string;
  /** Opened file file type. */
  fileType?: string;
  /** Opened file file path. */
  filePath?: string;
}

export const OpenFileDetails: Schema.Schema<OpenFileDetails> = Schema.suspend(() => Schema.Struct({
  command: Schema.optional(Schema.String),
  user: Schema.optional(Schema.String),
  fileType: Schema.optional(Schema.String),
  filePath: Schema.optional(Schema.String),
})).annotate({ identifier: "OpenFileDetails" }) as any as Schema.Schema<OpenFileDetails>;

export interface OpenFileList {
  /** Open file details entries. */
  entries?: Array<OpenFileDetails>;
}

export const OpenFileList: Schema.Schema<OpenFileList> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(OpenFileDetails)),
})).annotate({ identifier: "OpenFileList" }) as any as Schema.Schema<OpenFileList>;

export interface GuestRuntimeDetails {
  /** Running background services. */
  services?: RunningServiceList;
  /** Running processes. */
  processes?: RunningProcessList;
  /** Runtime network information (connections, ports). */
  networkInfo?: RuntimeNetworkInfo;
  /** Date since last booted (last uptime date). */
  lastUptime?: Migrationcenter_Date;
  /** Last time the OS was booted. */
  lastBootTime?: string;
  /** Domain, e.g. c.stratozone-development.internal. */
  domain?: string;
  /** Machine name. */
  machineName?: string;
  /** Installed applications information. */
  installedApps?: GuestInstalledApplicationList;
  /** Open files information. */
  openFileList?: OpenFileList;
}

export const GuestRuntimeDetails: Schema.Schema<GuestRuntimeDetails> = Schema.suspend(() => Schema.Struct({
  services: Schema.optional(RunningServiceList),
  processes: Schema.optional(RunningProcessList),
  networkInfo: Schema.optional(RuntimeNetworkInfo),
  lastUptime: Schema.optional(Migrationcenter_Date),
  lastBootTime: Schema.optional(Schema.String),
  domain: Schema.optional(Schema.String),
  machineName: Schema.optional(Schema.String),
  installedApps: Schema.optional(GuestInstalledApplicationList),
  openFileList: Schema.optional(OpenFileList),
})).annotate({ identifier: "GuestRuntimeDetails" }) as any as Schema.Schema<GuestRuntimeDetails>;

export interface GuestOsDetails {
  /** The name of the operating system. */
  osName?: string;
  /** What family the OS belong to, if known. */
  family?: "OS_FAMILY_UNKNOWN" | "OS_FAMILY_WINDOWS" | "OS_FAMILY_LINUX" | "OS_FAMILY_UNIX" | (string & {});
  /** The version of the operating system. */
  version?: string;
  /** OS and app configuration. */
  config?: GuestConfigDetails;
  /** Runtime information. */
  runtime?: GuestRuntimeDetails;
}

export const GuestOsDetails: Schema.Schema<GuestOsDetails> = Schema.suspend(() => Schema.Struct({
  osName: Schema.optional(Schema.String),
  family: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  config: Schema.optional(GuestConfigDetails),
  runtime: Schema.optional(GuestRuntimeDetails),
})).annotate({ identifier: "GuestOsDetails" }) as any as Schema.Schema<GuestOsDetails>;

export interface VmwarePlatformDetails {
  /** vCenter version. */
  vcenterVersion?: string;
  /** ESX version. */
  esxVersion?: string;
  /** VMware os enum - https://vdc-repo.vmware.com/vmwb-repository/dcr-public/da47f910-60ac-438b-8b9b-6122f4d14524/16b7274a-bf8b-4b4c-a05e-746f2aa93c8c/doc/vim.vm.GuestOsDescriptor.GuestOsIdentifier.html. */
  osid?: string;
  /** Folder name in vCenter where asset resides. */
  vcenterFolder?: string;
  /** vCenter URI used in collection. */
  vcenterUri?: string;
  /** vCenter VM ID. */
  vcenterVmId?: string;
  /** Whether the ESX is hyperthreaded. */
  esxHyperthreading?: "HYPERTHREADING_STATUS_UNSPECIFIED" | "HYPERTHREADING_STATUS_DISABLED" | "HYPERTHREADING_STATUS_ENABLED" | (string & {});
}

export const VmwarePlatformDetails: Schema.Schema<VmwarePlatformDetails> = Schema.suspend(() => Schema.Struct({
  vcenterVersion: Schema.optional(Schema.String),
  esxVersion: Schema.optional(Schema.String),
  osid: Schema.optional(Schema.String),
  vcenterFolder: Schema.optional(Schema.String),
  vcenterUri: Schema.optional(Schema.String),
  vcenterVmId: Schema.optional(Schema.String),
  esxHyperthreading: Schema.optional(Schema.String),
})).annotate({ identifier: "VmwarePlatformDetails" }) as any as Schema.Schema<VmwarePlatformDetails>;

export interface AwsEc2PlatformDetails {
  /** AWS platform's machine type label. */
  machineTypeLabel?: string;
  /** The location of the machine in the AWS format. */
  location?: string;
  /** Optional. Whether the machine is hyperthreaded. */
  hyperthreading?: "HYPERTHREADING_STATUS_UNSPECIFIED" | "HYPERTHREADING_STATUS_DISABLED" | "HYPERTHREADING_STATUS_ENABLED" | (string & {});
}

export const AwsEc2PlatformDetails: Schema.Schema<AwsEc2PlatformDetails> = Schema.suspend(() => Schema.Struct({
  machineTypeLabel: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  hyperthreading: Schema.optional(Schema.String),
})).annotate({ identifier: "AwsEc2PlatformDetails" }) as any as Schema.Schema<AwsEc2PlatformDetails>;

export interface AzureVmPlatformDetails {
  /** Azure platform's machine type label. */
  machineTypeLabel?: string;
  /** The location of the machine in the Azure format. */
  location?: string;
  /** Azure platform's provisioning state. */
  provisioningState?: string;
  /** Whether the machine is hyperthreaded. */
  hyperthreading?: "HYPERTHREADING_STATUS_UNSPECIFIED" | "HYPERTHREADING_STATUS_DISABLED" | "HYPERTHREADING_STATUS_ENABLED" | (string & {});
}

export const AzureVmPlatformDetails: Schema.Schema<AzureVmPlatformDetails> = Schema.suspend(() => Schema.Struct({
  machineTypeLabel: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  provisioningState: Schema.optional(Schema.String),
  hyperthreading: Schema.optional(Schema.String),
})).annotate({ identifier: "AzureVmPlatformDetails" }) as any as Schema.Schema<AzureVmPlatformDetails>;

export interface GenericPlatformDetails {
  /** Free text representation of the machine location. The format of this field should not be relied on. Different VMs in the same location may have different string values for this field. */
  location?: string;
  /** Whether the machine is hyperthreaded. */
  hyperthreading?: "HYPERTHREADING_STATUS_UNSPECIFIED" | "HYPERTHREADING_STATUS_DISABLED" | "HYPERTHREADING_STATUS_ENABLED" | (string & {});
}

export const GenericPlatformDetails: Schema.Schema<GenericPlatformDetails> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  hyperthreading: Schema.optional(Schema.String),
})).annotate({ identifier: "GenericPlatformDetails" }) as any as Schema.Schema<GenericPlatformDetails>;

export interface PhysicalPlatformDetails {
  /** Free text representation of the machine location. The format of this field should not be relied on. Different machines in the same location may have different string values for this field. */
  location?: string;
  /** Whether the machine is hyperthreaded. */
  hyperthreading?: "HYPERTHREADING_STATUS_UNSPECIFIED" | "HYPERTHREADING_STATUS_DISABLED" | "HYPERTHREADING_STATUS_ENABLED" | (string & {});
}

export const PhysicalPlatformDetails: Schema.Schema<PhysicalPlatformDetails> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  hyperthreading: Schema.optional(Schema.String),
})).annotate({ identifier: "PhysicalPlatformDetails" }) as any as Schema.Schema<PhysicalPlatformDetails>;

export interface PlatformDetails {
  /** VMware specific details. */
  vmwareDetails?: VmwarePlatformDetails;
  /** AWS EC2 specific details. */
  awsEc2Details?: AwsEc2PlatformDetails;
  /** Azure VM specific details. */
  azureVmDetails?: AzureVmPlatformDetails;
  /** Generic platform details. */
  genericDetails?: GenericPlatformDetails;
  /** Physical machines platform details. */
  physicalDetails?: PhysicalPlatformDetails;
}

export const PlatformDetails: Schema.Schema<PlatformDetails> = Schema.suspend(() => Schema.Struct({
  vmwareDetails: Schema.optional(VmwarePlatformDetails),
  awsEc2Details: Schema.optional(AwsEc2PlatformDetails),
  azureVmDetails: Schema.optional(AzureVmPlatformDetails),
  genericDetails: Schema.optional(GenericPlatformDetails),
  physicalDetails: Schema.optional(PhysicalPlatformDetails),
})).annotate({ identifier: "PlatformDetails" }) as any as Schema.Schema<PlatformDetails>;

export interface VirtualMachineDetails {
  /** Number of logical CPU cores in the VirtualMachine. Must be non-negative. */
  coreCount?: number;
  /** The amount of memory in the VirtualMachine. Must be non-negative. */
  memoryMb?: number;
  /** The name of the operating system running on the VirtualMachine. */
  osName?: string;
  /** Virtual Machine unique identifier. */
  vmUuid?: string;
  /** Virtual Machine display name. */
  vmName?: string;
  /** What family the OS belong to, if known. */
  osFamily?: "OS_FAMILY_UNKNOWN" | "OS_FAMILY_WINDOWS" | "OS_FAMILY_LINUX" | "OS_FAMILY_UNIX" | (string & {});
  /** VM architecture details (vendor, cpu arch). */
  vmArchitecture?: VirtualMachineArchitectureDetails;
  /** VM network details. */
  vmNetwork?: VirtualMachineNetworkDetails;
  /** VM disk details. */
  vmDisks?: VirtualMachineDiskDetails;
  /** Optional. Disk partitions details. Note: Partitions are not necessarily mounted on local disks and therefore might not have a one-to-one correspondence with local disks. */
  diskPartitions?: DiskPartitionDetails;
  /** Guest OS information. */
  guestOs?: GuestOsDetails;
  /** Folder name in vCenter where asset resides. */
  vcenterFolder?: string;
  /** vCenter URL used in collection. */
  vcenterUrl?: string;
  /** vCenter VM ID. */
  vcenterVmId?: string;
  /** Power state of VM (poweredOn or poweredOff). */
  powerState?: string;
  /** Platform information. */
  platform?: PlatformDetails;
  /** The version of the operating system running on the virtual machine. */
  osVersion?: string;
  /** VM creation timestamp. */
  createTime?: string;
}

export const VirtualMachineDetails: Schema.Schema<VirtualMachineDetails> = Schema.suspend(() => Schema.Struct({
  coreCount: Schema.optional(Schema.Number),
  memoryMb: Schema.optional(Schema.Number),
  osName: Schema.optional(Schema.String),
  vmUuid: Schema.optional(Schema.String),
  vmName: Schema.optional(Schema.String),
  osFamily: Schema.optional(Schema.String),
  vmArchitecture: Schema.optional(VirtualMachineArchitectureDetails),
  vmNetwork: Schema.optional(VirtualMachineNetworkDetails),
  vmDisks: Schema.optional(VirtualMachineDiskDetails),
  diskPartitions: Schema.optional(DiskPartitionDetails),
  guestOs: Schema.optional(GuestOsDetails),
  vcenterFolder: Schema.optional(Schema.String),
  vcenterUrl: Schema.optional(Schema.String),
  vcenterVmId: Schema.optional(Schema.String),
  powerState: Schema.optional(Schema.String),
  platform: Schema.optional(PlatformDetails),
  osVersion: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "VirtualMachineDetails" }) as any as Schema.Schema<VirtualMachineDetails>;

export interface MachineArchitectureDetails {
  /** CPU architecture, e.g., "x64-based PC", "x86_64", "i686" etc. */
  cpuArchitecture?: string;
  /** CPU name, e.g., "Intel Xeon E5-2690", "AMD EPYC 7571" etc. */
  cpuName?: string;
  /** Hardware vendor. */
  vendor?: string;
  /** Number of processor sockets allocated to the machine. */
  cpuSocketCount?: number;
  /** BIOS Details. */
  bios?: BiosDetails;
  /** Firmware type. */
  firmwareType?: "FIRMWARE_TYPE_UNSPECIFIED" | "BIOS" | "EFI" | (string & {});
  /** CPU hyper-threading support. */
  hyperthreading?: "CPU_HYPER_THREADING_UNSPECIFIED" | "DISABLED" | "ENABLED" | (string & {});
  /** Optional. CPU manufacturer, e.g., "Intel", "AMD". */
  cpuManufacturer?: string;
}

export const MachineArchitectureDetails: Schema.Schema<MachineArchitectureDetails> = Schema.suspend(() => Schema.Struct({
  cpuArchitecture: Schema.optional(Schema.String),
  cpuName: Schema.optional(Schema.String),
  vendor: Schema.optional(Schema.String),
  cpuSocketCount: Schema.optional(Schema.Number),
  bios: Schema.optional(BiosDetails),
  firmwareType: Schema.optional(Schema.String),
  hyperthreading: Schema.optional(Schema.String),
  cpuManufacturer: Schema.optional(Schema.String),
})).annotate({ identifier: "MachineArchitectureDetails" }) as any as Schema.Schema<MachineArchitectureDetails>;

export interface MachineNetworkDetails {
  /** The primary IP address of the machine. */
  primaryIpAddress?: string;
  /** The public IP address of the machine. */
  publicIpAddress?: string;
  /** MAC address of the machine. This property is used to uniqly identify the machine. */
  primaryMacAddress?: string;
  /** Default gateway address. */
  defaultGateway?: string;
  /** List of network adapters. */
  networkAdapters?: NetworkAdapterList;
}

export const MachineNetworkDetails: Schema.Schema<MachineNetworkDetails> = Schema.suspend(() => Schema.Struct({
  primaryIpAddress: Schema.optional(Schema.String),
  publicIpAddress: Schema.optional(Schema.String),
  primaryMacAddress: Schema.optional(Schema.String),
  defaultGateway: Schema.optional(Schema.String),
  networkAdapters: Schema.optional(NetworkAdapterList),
})).annotate({ identifier: "MachineNetworkDetails" }) as any as Schema.Schema<MachineNetworkDetails>;

export interface MachineDiskDetails {
  /** Disk total Capacity. */
  totalCapacityBytes?: string;
  /** Total disk free space. */
  totalFreeBytes?: string;
  /** List of disks. */
  disks?: DiskEntryList;
  /** Raw disk scan result. This field is intended for human inspection. The format of this field may be lsblk output or any another raw output. The exact format may change without notice and should not be relied upon. */
  rawScanResult?: string;
}

export const MachineDiskDetails: Schema.Schema<MachineDiskDetails> = Schema.suspend(() => Schema.Struct({
  totalCapacityBytes: Schema.optional(Schema.String),
  totalFreeBytes: Schema.optional(Schema.String),
  disks: Schema.optional(DiskEntryList),
  rawScanResult: Schema.optional(Schema.String),
})).annotate({ identifier: "MachineDiskDetails" }) as any as Schema.Schema<MachineDiskDetails>;

export interface MachineDetails {
  /** Machine unique identifier. */
  uuid?: string;
  /** Machine name. */
  machineName?: string;
  /** Machine creation time. */
  createTime?: string;
  /** Number of logical CPU cores in the machine. Must be non-negative. */
  coreCount?: number;
  /** The amount of memory in the machine. Must be non-negative. */
  memoryMb?: number;
  /** Power state of the machine. */
  powerState?: "POWER_STATE_UNSPECIFIED" | "PENDING" | "ACTIVE" | "SUSPENDING" | "SUSPENDED" | "DELETING" | "DELETED" | (string & {});
  /** Architecture details (vendor, CPU architecture). */
  architecture?: MachineArchitectureDetails;
  /** Guest OS information. */
  guestOs?: GuestOsDetails;
  /** Network details. */
  network?: MachineNetworkDetails;
  /** Disk details. */
  disks?: MachineDiskDetails;
  /** Optional. Disk partitions details. Note: Partitions are not necessarily mounted on local disks and therefore might not have a one-to-one correspondence with local disks. */
  diskPartitions?: DiskPartitionDetails;
  /** Platform specific information. */
  platform?: PlatformDetails;
}

export const MachineDetails: Schema.Schema<MachineDetails> = Schema.suspend(() => Schema.Struct({
  uuid: Schema.optional(Schema.String),
  machineName: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  coreCount: Schema.optional(Schema.Number),
  memoryMb: Schema.optional(Schema.Number),
  powerState: Schema.optional(Schema.String),
  architecture: Schema.optional(MachineArchitectureDetails),
  guestOs: Schema.optional(GuestOsDetails),
  network: Schema.optional(MachineNetworkDetails),
  disks: Schema.optional(MachineDiskDetails),
  diskPartitions: Schema.optional(DiskPartitionDetails),
  platform: Schema.optional(PlatformDetails),
})).annotate({ identifier: "MachineDetails" }) as any as Schema.Schema<MachineDetails>;

export interface DatabaseInstanceNetwork {
  /** Optional. The instance's primary MAC address. */
  primaryMacAddress?: string;
  /** Optional. The instance's IP addresses. */
  ipAddresses?: Array<string>;
  /** Optional. The instance's host names. */
  hostNames?: Array<string>;
}

export const DatabaseInstanceNetwork: Schema.Schema<DatabaseInstanceNetwork> = Schema.suspend(() => Schema.Struct({
  primaryMacAddress: Schema.optional(Schema.String),
  ipAddresses: Schema.optional(Schema.Array(Schema.String)),
  hostNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DatabaseInstanceNetwork" }) as any as Schema.Schema<DatabaseInstanceNetwork>;

export interface DatabaseInstance {
  /** The instance's name. */
  instanceName?: string;
  /** The instance role in the database engine. */
  role?: "ROLE_UNSPECIFIED" | "PRIMARY" | "SECONDARY" | "ARBITER" | (string & {});
  /** Optional. Networking details. */
  network?: DatabaseInstanceNetwork;
}

export const DatabaseInstance: Schema.Schema<DatabaseInstance> = Schema.suspend(() => Schema.Struct({
  instanceName: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  network: Schema.optional(DatabaseInstanceNetwork),
})).annotate({ identifier: "DatabaseInstance" }) as any as Schema.Schema<DatabaseInstance>;

export interface DatabaseDeploymentTopology {
  /** Optional. Number of total logical cores. */
  coreCount?: number;
  /** Optional. Number of total physical cores. */
  physicalCoreCount?: number;
  /** Optional. Total memory in bytes. */
  memoryBytes?: string;
  /** Optional. Disk allocated in bytes. */
  diskAllocatedBytes?: string;
  /** Optional. Disk used in bytes. */
  diskUsedBytes?: string;
  /** Optional. Number of total logical cores limited by db deployment. */
  coreLimit?: number;
  /** Optional. Number of total physical cores limited by db deployment. */
  physicalCoreLimit?: number;
  /** Optional. Total memory in bytes limited by db deployment. */
  memoryLimitBytes?: string;
  /** Optional. List of database instances. */
  instances?: Array<DatabaseInstance>;
}

export const DatabaseDeploymentTopology: Schema.Schema<DatabaseDeploymentTopology> = Schema.suspend(() => Schema.Struct({
  coreCount: Schema.optional(Schema.Number),
  physicalCoreCount: Schema.optional(Schema.Number),
  memoryBytes: Schema.optional(Schema.String),
  diskAllocatedBytes: Schema.optional(Schema.String),
  diskUsedBytes: Schema.optional(Schema.String),
  coreLimit: Schema.optional(Schema.Number),
  physicalCoreLimit: Schema.optional(Schema.Number),
  memoryLimitBytes: Schema.optional(Schema.String),
  instances: Schema.optional(Schema.Array(DatabaseInstance)),
})).annotate({ identifier: "DatabaseDeploymentTopology" }) as any as Schema.Schema<DatabaseDeploymentTopology>;

export interface SqlServerFeature {
  /** Required. The feature name. */
  featureName?: string;
  /** Required. Field enabled is set when a feature is used on the source deployment. */
  enabled?: boolean;
}

export const SqlServerFeature: Schema.Schema<SqlServerFeature> = Schema.suspend(() => Schema.Struct({
  featureName: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SqlServerFeature" }) as any as Schema.Schema<SqlServerFeature>;

export interface SqlServerServerFlag {
  /** Required. The server flag name. */
  serverFlagName?: string;
  /** Required. The server flag value set by the user. */
  value?: string;
  /** Required. The server flag actual value. If `value_in_use` is different from `value` it means that either the configuration change was not applied or it is an expected behavior. See SQL Server documentation for more details. */
  valueInUse?: string;
}

export const SqlServerServerFlag: Schema.Schema<SqlServerServerFlag> = Schema.suspend(() => Schema.Struct({
  serverFlagName: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  valueInUse: Schema.optional(Schema.String),
})).annotate({ identifier: "SqlServerServerFlag" }) as any as Schema.Schema<SqlServerServerFlag>;

export interface SqlServerTraceFlag {
  /** Required. The trace flag name. */
  traceFlagName?: string;
  /** Required. The trace flag scope. */
  scope?: "SCOPE_UNSPECIFIED" | "OFF" | "GLOBAL" | "SESSION" | (string & {});
}

export const SqlServerTraceFlag: Schema.Schema<SqlServerTraceFlag> = Schema.suspend(() => Schema.Struct({
  traceFlagName: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
})).annotate({ identifier: "SqlServerTraceFlag" }) as any as Schema.Schema<SqlServerTraceFlag>;

export interface SqlServerDatabaseDeployment {
  /** Optional. List of SQL Server features. */
  features?: Array<SqlServerFeature>;
  /** Optional. List of SQL Server server flags. */
  serverFlags?: Array<SqlServerServerFlag>;
  /** Optional. List of SQL Server trace flags. */
  traceFlags?: Array<SqlServerTraceFlag>;
}

export const SqlServerDatabaseDeployment: Schema.Schema<SqlServerDatabaseDeployment> = Schema.suspend(() => Schema.Struct({
  features: Schema.optional(Schema.Array(SqlServerFeature)),
  serverFlags: Schema.optional(Schema.Array(SqlServerServerFlag)),
  traceFlags: Schema.optional(Schema.Array(SqlServerTraceFlag)),
})).annotate({ identifier: "SqlServerDatabaseDeployment" }) as any as Schema.Schema<SqlServerDatabaseDeployment>;

export interface MySqlProperty {
  /** Required. The property name. */
  property?: string;
  /** Required. The property is enabled. */
  enabled?: boolean;
  /** Required. The property numeric value. */
  numericValue?: string;
}

export const MySqlProperty: Schema.Schema<MySqlProperty> = Schema.suspend(() => Schema.Struct({
  property: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  numericValue: Schema.optional(Schema.String),
})).annotate({ identifier: "MySqlProperty" }) as any as Schema.Schema<MySqlProperty>;

export interface MySqlPlugin {
  /** Required. The plugin name. */
  plugin?: string;
  /** Required. The plugin version. */
  version?: string;
  /** Required. The plugin is active. */
  enabled?: boolean;
}

export const MySqlPlugin: Schema.Schema<MySqlPlugin> = Schema.suspend(() => Schema.Struct({
  plugin: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "MySqlPlugin" }) as any as Schema.Schema<MySqlPlugin>;

export interface MySqlVariable {
  /** Required. The variable name. */
  variable?: string;
  /** Required. The variable value. */
  value?: string;
  /** Required. The variable category. */
  category?: string;
}

export const MySqlVariable: Schema.Schema<MySqlVariable> = Schema.suspend(() => Schema.Struct({
  variable: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  category: Schema.optional(Schema.String),
})).annotate({ identifier: "MySqlVariable" }) as any as Schema.Schema<MySqlVariable>;

export interface MysqlDatabaseDeployment {
  /** Optional. List of MySql properties. */
  properties?: Array<MySqlProperty>;
  /** Optional. List of MySql plugins. */
  plugins?: Array<MySqlPlugin>;
  /** Optional. Number of resource groups. */
  resourceGroupsCount?: number;
  /** Optional. List of MySql variables. */
  variables?: Array<MySqlVariable>;
}

export const MysqlDatabaseDeployment: Schema.Schema<MysqlDatabaseDeployment> = Schema.suspend(() => Schema.Struct({
  properties: Schema.optional(Schema.Array(MySqlProperty)),
  plugins: Schema.optional(Schema.Array(MySqlPlugin)),
  resourceGroupsCount: Schema.optional(Schema.Number),
  variables: Schema.optional(Schema.Array(MySqlVariable)),
})).annotate({ identifier: "MysqlDatabaseDeployment" }) as any as Schema.Schema<MysqlDatabaseDeployment>;

export interface PostgreSqlProperty {
  /** Required. The property name. */
  property?: string;
  /** Required. The property is enabled. */
  enabled?: boolean;
  /** Required. The property numeric value. */
  numericValue?: string;
}

export const PostgreSqlProperty: Schema.Schema<PostgreSqlProperty> = Schema.suspend(() => Schema.Struct({
  property: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  numericValue: Schema.optional(Schema.String),
})).annotate({ identifier: "PostgreSqlProperty" }) as any as Schema.Schema<PostgreSqlProperty>;

export interface PostgreSqlSetting {
  /** Required. The setting name. */
  setting?: string;
  /** Required. The setting source. */
  source?: string;
  /** Optional. The setting unit. */
  unit?: string;
  /** Required. The setting boolean value. */
  boolValue?: boolean;
  /** Required. The setting int value. */
  intValue?: string;
  /** Required. The setting real value. */
  realValue?: number;
  /** Required. The setting string value. Notice that enum values are stored as strings. */
  stringValue?: string;
}

export const PostgreSqlSetting: Schema.Schema<PostgreSqlSetting> = Schema.suspend(() => Schema.Struct({
  setting: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
  unit: Schema.optional(Schema.String),
  boolValue: Schema.optional(Schema.Boolean),
  intValue: Schema.optional(Schema.String),
  realValue: Schema.optional(Schema.Number),
  stringValue: Schema.optional(Schema.String),
})).annotate({ identifier: "PostgreSqlSetting" }) as any as Schema.Schema<PostgreSqlSetting>;

export interface PostgreSqlDatabaseDeployment {
  /** Optional. List of PostgreSql properties. */
  properties?: Array<PostgreSqlProperty>;
  /** Optional. List of PostgreSql settings. */
  settings?: Array<PostgreSqlSetting>;
}

export const PostgreSqlDatabaseDeployment: Schema.Schema<PostgreSqlDatabaseDeployment> = Schema.suspend(() => Schema.Struct({
  properties: Schema.optional(Schema.Array(PostgreSqlProperty)),
  settings: Schema.optional(Schema.Array(PostgreSqlSetting)),
})).annotate({ identifier: "PostgreSqlDatabaseDeployment" }) as any as Schema.Schema<PostgreSqlDatabaseDeployment>;

export interface DatabaseDeploymentDetailsAggregatedStats {
  /** Output only. The number of databases in the deployment. */
  databaseCount?: number;
}

export const DatabaseDeploymentDetailsAggregatedStats: Schema.Schema<DatabaseDeploymentDetailsAggregatedStats> = Schema.suspend(() => Schema.Struct({
  databaseCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "DatabaseDeploymentDetailsAggregatedStats" }) as any as Schema.Schema<DatabaseDeploymentDetailsAggregatedStats>;

export interface AwsRds {
}

export const AwsRds: Schema.Schema<AwsRds> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AwsRds" }) as any as Schema.Schema<AwsRds>;

export interface DatabaseDeploymentDetails {
  /** The database deployment generated ID. */
  generatedId?: string;
  /** A manual unique ID set by the user. */
  manualUniqueId?: string;
  /** The database deployment version. */
  version?: string;
  /** The database deployment edition. */
  edition?: string;
  /** Details of the database deployment topology. */
  topology?: DatabaseDeploymentTopology;
  /** Details of a Microsoft SQL Server database deployment. */
  sqlServer?: SqlServerDatabaseDeployment;
  /** Details of a MYSQL database deployment. */
  mysql?: MysqlDatabaseDeployment;
  /** Details of a PostgreSQL database deployment. */
  postgresql?: PostgreSqlDatabaseDeployment;
  /** Output only. Aggregated stats for the database deployment. */
  aggregatedStats?: DatabaseDeploymentDetailsAggregatedStats;
  /** Optional. Details of an AWS RDS instance. */
  awsRds?: AwsRds;
}

export const DatabaseDeploymentDetails: Schema.Schema<DatabaseDeploymentDetails> = Schema.suspend(() => Schema.Struct({
  generatedId: Schema.optional(Schema.String),
  manualUniqueId: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  edition: Schema.optional(Schema.String),
  topology: Schema.optional(DatabaseDeploymentTopology),
  sqlServer: Schema.optional(SqlServerDatabaseDeployment),
  mysql: Schema.optional(MysqlDatabaseDeployment),
  postgresql: Schema.optional(PostgreSqlDatabaseDeployment),
  aggregatedStats: Schema.optional(DatabaseDeploymentDetailsAggregatedStats),
  awsRds: Schema.optional(AwsRds),
})).annotate({ identifier: "DatabaseDeploymentDetails" }) as any as Schema.Schema<DatabaseDeploymentDetails>;

export interface DatabaseDetailsParentDatabaseDeployment {
  /** The parent database deployment generated ID. */
  generatedId?: string;
  /** The parent database deployment optional manual unique ID set by the user. */
  manualUniqueId?: string;
}

export const DatabaseDetailsParentDatabaseDeployment: Schema.Schema<DatabaseDetailsParentDatabaseDeployment> = Schema.suspend(() => Schema.Struct({
  generatedId: Schema.optional(Schema.String),
  manualUniqueId: Schema.optional(Schema.String),
})).annotate({ identifier: "DatabaseDetailsParentDatabaseDeployment" }) as any as Schema.Schema<DatabaseDetailsParentDatabaseDeployment>;

export interface DatabaseObjects {
  /** The category of the objects. */
  category?: "CATEGORY_UNSPECIFIED" | "TABLE" | "INDEX" | "CONSTRAINTS" | "VIEWS" | "SOURCE_CODE" | "OTHER" | (string & {});
  /** The number of objects. */
  count?: string;
}

export const DatabaseObjects: Schema.Schema<DatabaseObjects> = Schema.suspend(() => Schema.Struct({
  category: Schema.optional(Schema.String),
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "DatabaseObjects" }) as any as Schema.Schema<DatabaseObjects>;

export interface SqlServerSchemaDetails {
  /** Optional. SqlServer number of CLR objects. */
  clrObjectCount?: number;
}

export const SqlServerSchemaDetails: Schema.Schema<SqlServerSchemaDetails> = Schema.suspend(() => Schema.Struct({
  clrObjectCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "SqlServerSchemaDetails" }) as any as Schema.Schema<SqlServerSchemaDetails>;

export interface MySqlStorageEngineDetails {
  /** Required. The storage engine. */
  engine?: "ENGINE_UNSPECIFIED" | "INNODB" | "MYISAM" | "MEMORY" | "CSV" | "ARCHIVE" | "BLACKHOLE" | "NDB" | "MERGE" | "FEDERATED" | "EXAMPLE" | "OTHER" | (string & {});
  /** Optional. The number of tables. */
  tableCount?: number;
  /** Optional. The number of encrypted tables. */
  encryptedTableCount?: number;
}

export const MySqlStorageEngineDetails: Schema.Schema<MySqlStorageEngineDetails> = Schema.suspend(() => Schema.Struct({
  engine: Schema.optional(Schema.String),
  tableCount: Schema.optional(Schema.Number),
  encryptedTableCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "MySqlStorageEngineDetails" }) as any as Schema.Schema<MySqlStorageEngineDetails>;

export interface MySqlSchemaDetails {
  /** Optional. Mysql storage engine tables. */
  storageEngines?: Array<MySqlStorageEngineDetails>;
}

export const MySqlSchemaDetails: Schema.Schema<MySqlSchemaDetails> = Schema.suspend(() => Schema.Struct({
  storageEngines: Schema.optional(Schema.Array(MySqlStorageEngineDetails)),
})).annotate({ identifier: "MySqlSchemaDetails" }) as any as Schema.Schema<MySqlSchemaDetails>;

export interface PostgreSqlExtension {
  /** Required. The extension name. */
  extension?: string;
  /** Required. The extension version. */
  version?: string;
}

export const PostgreSqlExtension: Schema.Schema<PostgreSqlExtension> = Schema.suspend(() => Schema.Struct({
  extension: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "PostgreSqlExtension" }) as any as Schema.Schema<PostgreSqlExtension>;

export interface PostgreSqlSchemaDetails {
  /** Optional. PostgreSql foreign tables. */
  foreignTablesCount?: number;
  /** Optional. PostgreSql extensions. */
  postgresqlExtensions?: Array<PostgreSqlExtension>;
}

export const PostgreSqlSchemaDetails: Schema.Schema<PostgreSqlSchemaDetails> = Schema.suspend(() => Schema.Struct({
  foreignTablesCount: Schema.optional(Schema.Number),
  postgresqlExtensions: Schema.optional(Schema.Array(PostgreSqlExtension)),
})).annotate({ identifier: "PostgreSqlSchemaDetails" }) as any as Schema.Schema<PostgreSqlSchemaDetails>;

export interface DatabaseSchema {
  /** The name of the schema. */
  schemaName?: string;
  /** The total size of tables in bytes. */
  tablesSizeBytes?: string;
  /** List of details of objects by category. */
  objects?: Array<DatabaseObjects>;
  /** Details of a SqlServer schema. */
  sqlServer?: SqlServerSchemaDetails;
  /** Details of a Mysql schema. */
  mysql?: MySqlSchemaDetails;
  /** Details of a PostgreSql schema. */
  postgresql?: PostgreSqlSchemaDetails;
}

export const DatabaseSchema: Schema.Schema<DatabaseSchema> = Schema.suspend(() => Schema.Struct({
  schemaName: Schema.optional(Schema.String),
  tablesSizeBytes: Schema.optional(Schema.String),
  objects: Schema.optional(Schema.Array(DatabaseObjects)),
  sqlServer: Schema.optional(SqlServerSchemaDetails),
  mysql: Schema.optional(MySqlSchemaDetails),
  postgresql: Schema.optional(PostgreSqlSchemaDetails),
})).annotate({ identifier: "DatabaseSchema" }) as any as Schema.Schema<DatabaseSchema>;

export interface DatabaseDetails {
  /** The name of the database. */
  databaseName?: string;
  /** The parent database deployment that contains the logical database. */
  parentDatabaseDeployment?: DatabaseDetailsParentDatabaseDeployment;
  /** The allocated storage for the database in bytes. */
  allocatedStorageBytes?: string;
  /** The database schemas. */
  schemas?: Array<DatabaseSchema>;
}

export const DatabaseDetails: Schema.Schema<DatabaseDetails> = Schema.suspend(() => Schema.Struct({
  databaseName: Schema.optional(Schema.String),
  parentDatabaseDeployment: Schema.optional(DatabaseDetailsParentDatabaseDeployment),
  allocatedStorageBytes: Schema.optional(Schema.String),
  schemas: Schema.optional(Schema.Array(DatabaseSchema)),
})).annotate({ identifier: "DatabaseDetails" }) as any as Schema.Schema<DatabaseDetails>;

export interface AwsS3BucketDetailsVersioning {
  /** Optional. Whether versioning is enabled. */
  enabled?: boolean;
}

export const AwsS3BucketDetailsVersioning: Schema.Schema<AwsS3BucketDetailsVersioning> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AwsS3BucketDetailsVersioning" }) as any as Schema.Schema<AwsS3BucketDetailsVersioning>;

export interface AwsS3BucketDetailsObjectsMetadataTotalObjects {
  /** Optional. The total number of objects in the bucket. */
  value?: number;
}

export const AwsS3BucketDetailsObjectsMetadataTotalObjects: Schema.Schema<AwsS3BucketDetailsObjectsMetadataTotalObjects> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Number),
})).annotate({ identifier: "AwsS3BucketDetailsObjectsMetadataTotalObjects" }) as any as Schema.Schema<AwsS3BucketDetailsObjectsMetadataTotalObjects>;

export interface AwsS3BucketDetailsObjectsMetadata {
  /** Optional. The total number of objects in the bucket. */
  totalObjects?: AwsS3BucketDetailsObjectsMetadataTotalObjects;
}

export const AwsS3BucketDetailsObjectsMetadata: Schema.Schema<AwsS3BucketDetailsObjectsMetadata> = Schema.suspend(() => Schema.Struct({
  totalObjects: Schema.optional(AwsS3BucketDetailsObjectsMetadataTotalObjects),
})).annotate({ identifier: "AwsS3BucketDetailsObjectsMetadata" }) as any as Schema.Schema<AwsS3BucketDetailsObjectsMetadata>;

export interface AwsS3BucketDetailsStorageClass {
  /** Required. Type of the storage class. */
  type?: "STORAGE_CLASS_TYPE_UNSPECIFIED" | "STANDARD" | "INTELLIGENT_TIERING" | "STANDARD_IA" | "ONE_ZONE_IA" | "GLACIER" | "DEEP_ARCHIVE" | "GLACIER_IR" | "REDUCED_REDUNDANCY" | "EXPRESS_ONEZONE" | (string & {});
  /** Optional. The total size of the storage class in bytes. */
  totalBytes?: string;
}

export const AwsS3BucketDetailsStorageClass: Schema.Schema<AwsS3BucketDetailsStorageClass> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  totalBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "AwsS3BucketDetailsStorageClass" }) as any as Schema.Schema<AwsS3BucketDetailsStorageClass>;

export interface AwsS3BucketDetails {
  /** Optional. Versioning configuration of the bucket. */
  versioning?: AwsS3BucketDetailsVersioning;
  /** Optional. The metadata of the objects in the bucket. */
  objectsMetadata?: AwsS3BucketDetailsObjectsMetadata;
  /** Optional. The storage classes in the bucket. */
  storageClasses?: Array<AwsS3BucketDetailsStorageClass>;
}

export const AwsS3BucketDetails: Schema.Schema<AwsS3BucketDetails> = Schema.suspend(() => Schema.Struct({
  versioning: Schema.optional(AwsS3BucketDetailsVersioning),
  objectsMetadata: Schema.optional(AwsS3BucketDetailsObjectsMetadata),
  storageClasses: Schema.optional(Schema.Array(AwsS3BucketDetailsStorageClass)),
})).annotate({ identifier: "AwsS3BucketDetails" }) as any as Schema.Schema<AwsS3BucketDetails>;

export interface AwsEksClusterDetails {
}

export const AwsEksClusterDetails: Schema.Schema<AwsEksClusterDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AwsEksClusterDetails" }) as any as Schema.Schema<AwsEksClusterDetails>;

export interface AwsElbLoadBalancerDetails {
}

export const AwsElbLoadBalancerDetails: Schema.Schema<AwsElbLoadBalancerDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AwsElbLoadBalancerDetails" }) as any as Schema.Schema<AwsElbLoadBalancerDetails>;

export interface AwsLambdaFunctionDetails {
}

export const AwsLambdaFunctionDetails: Schema.Schema<AwsLambdaFunctionDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AwsLambdaFunctionDetails" }) as any as Schema.Schema<AwsLambdaFunctionDetails>;

export interface AwsEcsClusterDetails {
}

export const AwsEcsClusterDetails: Schema.Schema<AwsEcsClusterDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AwsEcsClusterDetails" }) as any as Schema.Schema<AwsEcsClusterDetails>;

export interface AwsEfsFileSystemDetails {
}

export const AwsEfsFileSystemDetails: Schema.Schema<AwsEfsFileSystemDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AwsEfsFileSystemDetails" }) as any as Schema.Schema<AwsEfsFileSystemDetails>;

export interface AwsRedshiftDetails {
}

export const AwsRedshiftDetails: Schema.Schema<AwsRedshiftDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AwsRedshiftDetails" }) as any as Schema.Schema<AwsRedshiftDetails>;

export interface AwsVpcDetails {
}

export const AwsVpcDetails: Schema.Schema<AwsVpcDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AwsVpcDetails" }) as any as Schema.Schema<AwsVpcDetails>;

export interface AwsCloudFrontDistributionDetails {
}

export const AwsCloudFrontDistributionDetails: Schema.Schema<AwsCloudFrontDistributionDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AwsCloudFrontDistributionDetails" }) as any as Schema.Schema<AwsCloudFrontDistributionDetails>;

export interface AwsDynamoDBTableDetails {
}

export const AwsDynamoDBTableDetails: Schema.Schema<AwsDynamoDBTableDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AwsDynamoDBTableDetails" }) as any as Schema.Schema<AwsDynamoDBTableDetails>;

export interface AwsRoute53HostedZoneDetails {
}

export const AwsRoute53HostedZoneDetails: Schema.Schema<AwsRoute53HostedZoneDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AwsRoute53HostedZoneDetails" }) as any as Schema.Schema<AwsRoute53HostedZoneDetails>;

export interface AwsNatGatewayDetails {
}

export const AwsNatGatewayDetails: Schema.Schema<AwsNatGatewayDetails> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AwsNatGatewayDetails" }) as any as Schema.Schema<AwsNatGatewayDetails>;

export interface FitDescriptor {
  /** Output only. Fit level. */
  fitLevel?: "FIT_LEVEL_UNSPECIFIED" | "FIT" | "NO_FIT" | "REQUIRES_EFFORT" | (string & {});
}

export const FitDescriptor: Schema.Schema<FitDescriptor> = Schema.suspend(() => Schema.Struct({
  fitLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "FitDescriptor" }) as any as Schema.Schema<FitDescriptor>;

export interface ComputeStorageDescriptor {
  /** Output only. Disk type backing the storage. */
  type?: "PERSISTENT_DISK_TYPE_UNSPECIFIED" | "PERSISTENT_DISK_TYPE_STANDARD" | "PERSISTENT_DISK_TYPE_BALANCED" | "PERSISTENT_DISK_TYPE_SSD" | (string & {});
  /** Disk size in GiB. */
  sizeGb?: number;
}

export const ComputeStorageDescriptor: Schema.Schema<ComputeStorageDescriptor> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  sizeGb: Schema.optional(Schema.Number),
})).annotate({ identifier: "ComputeStorageDescriptor" }) as any as Schema.Schema<ComputeStorageDescriptor>;

export interface ComputeEngineShapeDescriptor {
  /** Output only. Memory in mebibytes. */
  memoryMb?: number;
  /** Output only. Number of physical cores. */
  physicalCoreCount?: number;
  /** Output only. Number of logical cores. */
  logicalCoreCount?: number;
  /** Output only. Compute Engine machine series. */
  series?: string;
  /** Output only. Compute Engine machine type. */
  machineType?: string;
  /** Output only. Compute Engine storage. Never empty. */
  storage?: Array<ComputeStorageDescriptor>;
  /** Output only. Whether simultaneous multithreading is enabled (see https://cloud.google.com/compute/docs/instances/set-threads-per-core). */
  smtEnabled?: boolean;
}

export const ComputeEngineShapeDescriptor: Schema.Schema<ComputeEngineShapeDescriptor> = Schema.suspend(() => Schema.Struct({
  memoryMb: Schema.optional(Schema.Number),
  physicalCoreCount: Schema.optional(Schema.Number),
  logicalCoreCount: Schema.optional(Schema.Number),
  series: Schema.optional(Schema.String),
  machineType: Schema.optional(Schema.String),
  storage: Schema.optional(Schema.Array(ComputeStorageDescriptor)),
  smtEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ComputeEngineShapeDescriptor" }) as any as Schema.Schema<ComputeEngineShapeDescriptor>;

export interface ComputeEngineMigrationTarget {
  /** Description of the suggested shape for the migration target. */
  shape?: ComputeEngineShapeDescriptor;
}

export const ComputeEngineMigrationTarget: Schema.Schema<ComputeEngineMigrationTarget> = Schema.suspend(() => Schema.Struct({
  shape: Schema.optional(ComputeEngineShapeDescriptor),
})).annotate({ identifier: "ComputeEngineMigrationTarget" }) as any as Schema.Schema<ComputeEngineMigrationTarget>;

export interface VmwareEngineMigrationTarget {
}

export const VmwareEngineMigrationTarget: Schema.Schema<VmwareEngineMigrationTarget> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "VmwareEngineMigrationTarget" }) as any as Schema.Schema<VmwareEngineMigrationTarget>;

export interface GoogleKubernetesEngineMigrationTarget {
}

export const GoogleKubernetesEngineMigrationTarget: Schema.Schema<GoogleKubernetesEngineMigrationTarget> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleKubernetesEngineMigrationTarget" }) as any as Schema.Schema<GoogleKubernetesEngineMigrationTarget>;

export interface CloudSqlForSqlServerShape {
  /** Output only. Number of logical cores. */
  logicalCoreCount?: number;
  /** Output only. Predicted amount of memory in MiB. */
  memoryMb?: number;
  /** Output only. Predicted storage shape. */
  storage?: ComputeStorageDescriptor;
  /** Output only. Predicted backup storage size in GiB. */
  backupStorageGb?: number;
  /** Output only. Predicted Network Out traffic GiB per month. */
  egressGbPerMonth?: string;
  /** Output only. Microsoft SQL Server version to be used on the Cloud SQL for SQL server instance. */
  version?: "SQL_SERVER_VERSION_UNSPECIFIED" | "SQL_SERVER_VERSION_2017_EXPRESS" | "SQL_SERVER_VERSION_2017_WEB" | "SQL_SERVER_VERSION_2017_STANDARD" | "SQL_SERVER_VERSION_2017_ENTERPRISE" | "SQL_SERVER_VERSION_2019_EXPRESS" | "SQL_SERVER_VERSION_2019_WEB" | "SQL_SERVER_VERSION_2019_STANDARD" | "SQL_SERVER_VERSION_2019_ENTERPRISE" | "SQL_SERVER_VERSION_2022_EXPRESS" | "SQL_SERVER_VERSION_2022_WEB" | "SQL_SERVER_VERSION_2022_STANDARD" | "SQL_SERVER_VERSION_2022_ENTERPRISE" | (string & {});
  /** Output only. Cloud SQL zone availability. */
  zoneAvailability?: "CLOUD_SQL_ZONE_AVAILABILITY_UNSPECIFIED" | "CLOUD_SQL_ZONE_AVAILABILITY_ZONAL" | "CLOUD_SQL_ZONE_AVAILABILITY_REGIONAL" | (string & {});
  /** Output only. Cloud SQL edition. */
  edition?: "CLOUD_SQL_EDITION_UNSPECIFIED" | "CLOUD_SQL_EDITION_ENTERPRISE" | "CLOUD_SQL_EDITION_ENTERPRISE_PLUS" | (string & {});
  /** Output only. Whether simultaneous multithreading is enabled (see https://cloud.google.com/sql/docs/sqlserver/create-instance#smt-create-instance). */
  smtEnabled?: boolean;
}

export const CloudSqlForSqlServerShape: Schema.Schema<CloudSqlForSqlServerShape> = Schema.suspend(() => Schema.Struct({
  logicalCoreCount: Schema.optional(Schema.Number),
  memoryMb: Schema.optional(Schema.Number),
  storage: Schema.optional(ComputeStorageDescriptor),
  backupStorageGb: Schema.optional(Schema.Number),
  egressGbPerMonth: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  zoneAvailability: Schema.optional(Schema.String),
  edition: Schema.optional(Schema.String),
  smtEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CloudSqlForSqlServerShape" }) as any as Schema.Schema<CloudSqlForSqlServerShape>;

export interface CloudSqlForMySqlShape {
  /** Output only. Number of logical cores. */
  logicalCoreCount?: number;
  /** Output only. Predicted amount of memory in MiB. */
  memoryMb?: number;
  /** Output only. Predicted storage shape. */
  storage?: ComputeStorageDescriptor;
  /** Output only. Predicted backup storage size in GiB. */
  backupStorageGb?: number;
  /** Output only. Predicted Network Out traffic GiB per month. */
  egressGbPerMonth?: string;
  /** Output only. Cloud SQL zone availability. */
  zoneAvailability?: "CLOUD_SQL_ZONE_AVAILABILITY_UNSPECIFIED" | "CLOUD_SQL_ZONE_AVAILABILITY_ZONAL" | "CLOUD_SQL_ZONE_AVAILABILITY_REGIONAL" | (string & {});
  /** Output only. Cloud SQL edition. */
  edition?: "CLOUD_SQL_EDITION_UNSPECIFIED" | "CLOUD_SQL_EDITION_ENTERPRISE" | "CLOUD_SQL_EDITION_ENTERPRISE_PLUS" | (string & {});
  /** Output only. MySQL version to be used on the Cloud SQL for MySQL instance. */
  version?: "MY_SQL_VERSION_UNSPECIFIED" | "MY_SQL_VERSION_5_6" | "MY_SQL_VERSION_5_7" | "MY_SQL_VERSION_8_0" | (string & {});
}

export const CloudSqlForMySqlShape: Schema.Schema<CloudSqlForMySqlShape> = Schema.suspend(() => Schema.Struct({
  logicalCoreCount: Schema.optional(Schema.Number),
  memoryMb: Schema.optional(Schema.Number),
  storage: Schema.optional(ComputeStorageDescriptor),
  backupStorageGb: Schema.optional(Schema.Number),
  egressGbPerMonth: Schema.optional(Schema.String),
  zoneAvailability: Schema.optional(Schema.String),
  edition: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudSqlForMySqlShape" }) as any as Schema.Schema<CloudSqlForMySqlShape>;

export interface CloudSqlForPostgreSqlShape {
  /** Output only. Number of logical cores. */
  logicalCoreCount?: number;
  /** Output only. Predicted amount of memory in MiB. */
  memoryMb?: number;
  /** Output only. Predicted storage shape. */
  storage?: ComputeStorageDescriptor;
  /** Output only. Predicted backup storage size in GiB. */
  backupStorageGb?: number;
  /** Output only. Predicted Network Out traffic GiB per month. */
  egressGbPerMonth?: string;
  /** Output only. Cloud SQL zone availability. */
  zoneAvailability?: "CLOUD_SQL_ZONE_AVAILABILITY_UNSPECIFIED" | "CLOUD_SQL_ZONE_AVAILABILITY_ZONAL" | "CLOUD_SQL_ZONE_AVAILABILITY_REGIONAL" | (string & {});
  /** Output only. Cloud SQL edition. */
  edition?: "CLOUD_SQL_EDITION_UNSPECIFIED" | "CLOUD_SQL_EDITION_ENTERPRISE" | "CLOUD_SQL_EDITION_ENTERPRISE_PLUS" | (string & {});
  /** Output only. PostgreSql version to be used on the Cloud SQL for PostgreSql instance. */
  version?: "POSTGRESQL_VERSION_UNSPECIFIED" | "POSTGRESQL_VERSION_9_6" | "POSTGRESQL_VERSION_10" | "POSTGRESQL_VERSION_11" | "POSTGRESQL_VERSION_12" | "POSTGRESQL_VERSION_13" | "POSTGRESQL_VERSION_14" | "POSTGRESQL_VERSION_15" | (string & {});
}

export const CloudSqlForPostgreSqlShape: Schema.Schema<CloudSqlForPostgreSqlShape> = Schema.suspend(() => Schema.Struct({
  logicalCoreCount: Schema.optional(Schema.Number),
  memoryMb: Schema.optional(Schema.Number),
  storage: Schema.optional(ComputeStorageDescriptor),
  backupStorageGb: Schema.optional(Schema.Number),
  egressGbPerMonth: Schema.optional(Schema.String),
  zoneAvailability: Schema.optional(Schema.String),
  edition: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudSqlForPostgreSqlShape" }) as any as Schema.Schema<CloudSqlForPostgreSqlShape>;

export interface CloudDatabaseMigrationTarget {
  /** Cloud SQL for SQL Server database shape. */
  cloudSqlShape?: CloudSqlForSqlServerShape;
  /** Cloud SQL for MySQL database shape. */
  cloudSqlForMysqlShape?: CloudSqlForMySqlShape;
  /** Cloud SQL for PostgreSQL database shape. */
  cloudSqlForPostgresqlShape?: CloudSqlForPostgreSqlShape;
}

export const CloudDatabaseMigrationTarget: Schema.Schema<CloudDatabaseMigrationTarget> = Schema.suspend(() => Schema.Struct({
  cloudSqlShape: Schema.optional(CloudSqlForSqlServerShape),
  cloudSqlForMysqlShape: Schema.optional(CloudSqlForMySqlShape),
  cloudSqlForPostgresqlShape: Schema.optional(CloudSqlForPostgreSqlShape),
})).annotate({ identifier: "CloudDatabaseMigrationTarget" }) as any as Schema.Schema<CloudDatabaseMigrationTarget>;

export interface ComputeEngineSoleTenantMigrationTarget {
}

export const ComputeEngineSoleTenantMigrationTarget: Schema.Schema<ComputeEngineSoleTenantMigrationTarget> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ComputeEngineSoleTenantMigrationTarget" }) as any as Schema.Schema<ComputeEngineSoleTenantMigrationTarget>;

export interface IssueCompatibilityIssue {
  /** Output only. Category of this compatibility issue. */
  category?: "CATEGORY_UNSPECIFIED" | "DATABASE_FLAG" | "DATABASE_FEATURE" | (string & {});
  /** Output only. Type of object associated with this migration compatibility issue. */
  associatedObjectType?: "OBJECT_TYPE_UNSPECIFIED" | "DATABASE_DEPLOYMENT" | "DATABASE" | "SCHEMA" | (string & {});
  /** Output only. Name of the object associated with this compatibility issue relative to the relevant asset. Does not represent a fully qualified resource name and is not intended for programmatic use. */
  associatedObject?: string;
  /** Output only. A string representation of actual value associated with this issue. Some values may contain aggregated information, such as a flag name and the actual value assigned to it. */
  associatedValue?: string;
}

export const IssueCompatibilityIssue: Schema.Schema<IssueCompatibilityIssue> = Schema.suspend(() => Schema.Struct({
  category: Schema.optional(Schema.String),
  associatedObjectType: Schema.optional(Schema.String),
  associatedObject: Schema.optional(Schema.String),
  associatedValue: Schema.optional(Schema.String),
})).annotate({ identifier: "IssueCompatibilityIssue" }) as any as Schema.Schema<IssueCompatibilityIssue>;

export interface Issue {
  /** Output only. Unique identifier for this issue type. */
  issueCode?: string;
  /** Output only. English description of the issue. */
  description?: string;
  /** Output only. Details about a compatibility issue. */
  compatibilityIssue?: IssueCompatibilityIssue;
}

export const Issue: Schema.Schema<Issue> = Schema.suspend(() => Schema.Struct({
  issueCode: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  compatibilityIssue: Schema.optional(IssueCompatibilityIssue),
})).annotate({ identifier: "Issue" }) as any as Schema.Schema<Issue>;

export interface MigrationInsight {
  /** Output only. Description of how well the asset this insight is associated with fits the proposed migration. */
  fit?: FitDescriptor;
  /** Output only. A Google Compute Engine target. */
  computeEngineTarget?: ComputeEngineMigrationTarget;
  /** Output only. A VMWare Engine target. */
  vmwareEngineTarget?: VmwareEngineMigrationTarget;
  /** Output only. A Google Kubernetes Engine target. */
  gkeTarget?: GoogleKubernetesEngineMigrationTarget;
  /** Output only. A Cloud database migration target. */
  cloudDatabaseTarget?: CloudDatabaseMigrationTarget;
  /** Output only. A Google Compute Engine Sole Tenant target. */
  computeEngineSoleTenantTarget?: ComputeEngineSoleTenantMigrationTarget;
  /** Output only. Issues associated with this migration. */
  issues?: Array<Issue>;
}

export const MigrationInsight: Schema.Schema<MigrationInsight> = Schema.suspend(() => Schema.Struct({
  fit: Schema.optional(FitDescriptor),
  computeEngineTarget: Schema.optional(ComputeEngineMigrationTarget),
  vmwareEngineTarget: Schema.optional(VmwareEngineMigrationTarget),
  gkeTarget: Schema.optional(GoogleKubernetesEngineMigrationTarget),
  cloudDatabaseTarget: Schema.optional(CloudDatabaseMigrationTarget),
  computeEngineSoleTenantTarget: Schema.optional(ComputeEngineSoleTenantMigrationTarget),
  issues: Schema.optional(Schema.Array(Issue)),
})).annotate({ identifier: "MigrationInsight" }) as any as Schema.Schema<MigrationInsight>;

export interface GenericInsight {
  /** Output only. Represents a globally unique message id for this insight, can be used for localization purposes, in case message_code is not yet known by the client use default_message instead. */
  messageId?: string;
  /** Output only. In case message_code is not yet known by the client default_message will be the message to be used instead. Text can contain md file style links. */
  defaultMessage?: string;
  /** Output only. Additional information about the insight, each entry can be a logical entry and must make sense if it is displayed with line breaks between each entry. Text can contain md style links. */
  additionalInformation?: Array<string>;
}

export const GenericInsight: Schema.Schema<GenericInsight> = Schema.suspend(() => Schema.Struct({
  messageId: Schema.optional(Schema.String),
  defaultMessage: Schema.optional(Schema.String),
  additionalInformation: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GenericInsight" }) as any as Schema.Schema<GenericInsight>;

export interface DetectedSoftware {
  /** Output only. Software's name. */
  softwareName?: string;
  /** Output only. Software family of the detected software, e.g. Database, SAP family. */
  softwareFamily?: string;
}

export const DetectedSoftware: Schema.Schema<DetectedSoftware> = Schema.suspend(() => Schema.Struct({
  softwareName: Schema.optional(Schema.String),
  softwareFamily: Schema.optional(Schema.String),
})).annotate({ identifier: "DetectedSoftware" }) as any as Schema.Schema<DetectedSoftware>;

export interface SoftwareInsight {
  /** Output only. Information about the detected software. */
  detectedSoftware?: DetectedSoftware;
}

export const SoftwareInsight: Schema.Schema<SoftwareInsight> = Schema.suspend(() => Schema.Struct({
  detectedSoftware: Schema.optional(DetectedSoftware),
})).annotate({ identifier: "SoftwareInsight" }) as any as Schema.Schema<SoftwareInsight>;

export interface Insight {
  /** Output only. An insight about potential migrations for an asset. */
  migrationInsight?: MigrationInsight;
  /** Output only. A generic insight about an asset. */
  genericInsight?: GenericInsight;
  /** Output only. An insight regarding software detected on an asset. */
  softwareInsight?: SoftwareInsight;
}

export const Insight: Schema.Schema<Insight> = Schema.suspend(() => Schema.Struct({
  migrationInsight: Schema.optional(MigrationInsight),
  genericInsight: Schema.optional(GenericInsight),
  softwareInsight: Schema.optional(SoftwareInsight),
})).annotate({ identifier: "Insight" }) as any as Schema.Schema<Insight>;

export interface InsightList {
  /** Output only. Insights of the list. */
  insights?: Array<Insight>;
  /** Output only. Update timestamp. */
  updateTime?: string;
}

export const InsightList: Schema.Schema<InsightList> = Schema.suspend(() => Schema.Struct({
  insights: Schema.optional(Schema.Array(Insight)),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "InsightList" }) as any as Schema.Schema<InsightList>;

export interface DailyResourceUsageAggregationStats {
  /** Average usage value. */
  average?: number;
  /** Median usage value. */
  median?: number;
  /** 95th percentile usage value. */
  ninteyFifthPercentile?: number;
  /** Peak usage value. */
  peak?: number;
}

export const DailyResourceUsageAggregationStats: Schema.Schema<DailyResourceUsageAggregationStats> = Schema.suspend(() => Schema.Struct({
  average: Schema.optional(Schema.Number),
  median: Schema.optional(Schema.Number),
  ninteyFifthPercentile: Schema.optional(Schema.Number),
  peak: Schema.optional(Schema.Number),
})).annotate({ identifier: "DailyResourceUsageAggregationStats" }) as any as Schema.Schema<DailyResourceUsageAggregationStats>;

export interface DailyResourceUsageAggregationCPU {
  /** CPU utilization percentage. */
  utilizationPercentage?: DailyResourceUsageAggregationStats;
}

export const DailyResourceUsageAggregationCPU: Schema.Schema<DailyResourceUsageAggregationCPU> = Schema.suspend(() => Schema.Struct({
  utilizationPercentage: Schema.optional(DailyResourceUsageAggregationStats),
})).annotate({ identifier: "DailyResourceUsageAggregationCPU" }) as any as Schema.Schema<DailyResourceUsageAggregationCPU>;

export interface DailyResourceUsageAggregationMemory {
  /** Memory utilization percentage. */
  utilizationPercentage?: DailyResourceUsageAggregationStats;
}

export const DailyResourceUsageAggregationMemory: Schema.Schema<DailyResourceUsageAggregationMemory> = Schema.suspend(() => Schema.Struct({
  utilizationPercentage: Schema.optional(DailyResourceUsageAggregationStats),
})).annotate({ identifier: "DailyResourceUsageAggregationMemory" }) as any as Schema.Schema<DailyResourceUsageAggregationMemory>;

export interface DailyResourceUsageAggregationNetwork {
  /** Network ingress in B/s. */
  ingressBps?: DailyResourceUsageAggregationStats;
  /** Network egress in B/s. */
  egressBps?: DailyResourceUsageAggregationStats;
}

export const DailyResourceUsageAggregationNetwork: Schema.Schema<DailyResourceUsageAggregationNetwork> = Schema.suspend(() => Schema.Struct({
  ingressBps: Schema.optional(DailyResourceUsageAggregationStats),
  egressBps: Schema.optional(DailyResourceUsageAggregationStats),
})).annotate({ identifier: "DailyResourceUsageAggregationNetwork" }) as any as Schema.Schema<DailyResourceUsageAggregationNetwork>;

export interface DailyResourceUsageAggregationDisk {
  /** Disk I/O operations per second. */
  iops?: DailyResourceUsageAggregationStats;
  /** Disk read I/O operations per second. */
  readIops?: DailyResourceUsageAggregationStats;
  /** Disk write I/O operations per second. */
  writeIops?: DailyResourceUsageAggregationStats;
}

export const DailyResourceUsageAggregationDisk: Schema.Schema<DailyResourceUsageAggregationDisk> = Schema.suspend(() => Schema.Struct({
  iops: Schema.optional(DailyResourceUsageAggregationStats),
  readIops: Schema.optional(DailyResourceUsageAggregationStats),
  writeIops: Schema.optional(DailyResourceUsageAggregationStats),
})).annotate({ identifier: "DailyResourceUsageAggregationDisk" }) as any as Schema.Schema<DailyResourceUsageAggregationDisk>;

export interface DailyResourceUsageAggregation {
  /** Aggregation date. Day boundaries are at midnight UTC. */
  date?: Migrationcenter_Date;
  /** CPU usage. */
  cpu?: DailyResourceUsageAggregationCPU;
  /** Memory usage. */
  memory?: DailyResourceUsageAggregationMemory;
  /** Network usage. */
  network?: DailyResourceUsageAggregationNetwork;
  /** Disk usage. */
  disk?: DailyResourceUsageAggregationDisk;
}

export const DailyResourceUsageAggregation: Schema.Schema<DailyResourceUsageAggregation> = Schema.suspend(() => Schema.Struct({
  date: Schema.optional(Migrationcenter_Date),
  cpu: Schema.optional(DailyResourceUsageAggregationCPU),
  memory: Schema.optional(DailyResourceUsageAggregationMemory),
  network: Schema.optional(DailyResourceUsageAggregationNetwork),
  disk: Schema.optional(DailyResourceUsageAggregationDisk),
})).annotate({ identifier: "DailyResourceUsageAggregation" }) as any as Schema.Schema<DailyResourceUsageAggregation>;

export interface AssetPerformanceData {
  /** Daily resource usage aggregations. Contains all of the data available for an asset, up to the last 420 days. Aggregations are sorted from oldest to most recent. */
  dailyResourceUsageAggregations?: Array<DailyResourceUsageAggregation>;
}

export const AssetPerformanceData: Schema.Schema<AssetPerformanceData> = Schema.suspend(() => Schema.Struct({
  dailyResourceUsageAggregations: Schema.optional(Schema.Array(DailyResourceUsageAggregation)),
})).annotate({ identifier: "AssetPerformanceData" }) as any as Schema.Schema<AssetPerformanceData>;

export interface Asset {
  /** Output only. The full name of the asset. */
  name?: string;
  /** Output only. Server generated human readable name of the asset. */
  title?: string;
  /** Output only. The timestamp when the asset was created. */
  createTime?: string;
  /** Output only. The timestamp when the asset was last updated. */
  updateTime?: string;
  /** Labels as key value pairs. */
  labels?: Record<string, string>;
  /** Generic asset attributes. */
  attributes?: Record<string, string>;
  /** Optional. Generic structured asset attributes. */
  structuredAttributes?: Record<string, unknown>;
  /** Output only. Details about the hosting provider of the asset. */
  hostingProviderDetails?: HostingProviderDetails;
  /** Output only. Asset information specific for virtual machines. */
  virtualMachineDetails?: VirtualMachineDetails;
  /** Output only. Asset information specific for virtual machines. */
  machineDetails?: MachineDetails;
  /** Output only. Asset information specific for database deployments. */
  databaseDeploymentDetails?: DatabaseDeploymentDetails;
  /** Output only. Asset information specific for logical databases. */
  databaseDetails?: DatabaseDetails;
  /** Output only. Asset information specific for AWS S3 buckets. */
  awsS3BucketDetails?: AwsS3BucketDetails;
  /** Output only. Asset information specific for AWS EKS clusters. */
  awsEksClusterDetails?: AwsEksClusterDetails;
  /** Output only. Asset information specific for AWS Load Balancers. */
  awsElbLoadBalancerDetails?: AwsElbLoadBalancerDetails;
  /** Output only. Asset information specific for AWS Lambda functions. */
  awsLambdaFunctionDetails?: AwsLambdaFunctionDetails;
  /** Output only. Asset information specific for AWS ECS clusters. */
  awsEcsClusterDetails?: AwsEcsClusterDetails;
  /** Output only. Asset information specific for AWS EFS file systems. */
  awsEfsFileSystemDetails?: AwsEfsFileSystemDetails;
  /** Output only. Asset information specific for AWS Redshift */
  awsRedshiftDetails?: AwsRedshiftDetails;
  /** Output only. Asset information specific for AWS VPCs. */
  awsVpcDetails?: AwsVpcDetails;
  /** Output only. Asset information specific for AWS CloudFront distributions. */
  awsCloudFrontDistributionDetails?: AwsCloudFrontDistributionDetails;
  /** Output only. Asset information specific for AWS DynamoDB tables. */
  awsDynamodbTableDetails?: AwsDynamoDBTableDetails;
  /** Output only. Asset information specific for AwsRoute53HostedZoneDetails */
  awsRoute53HostedZoneDetails?: AwsRoute53HostedZoneDetails;
  /** Output only. Asset information specific for AwsNatGatewayDetails */
  awsNatGatewayDetails?: AwsNatGatewayDetails;
  /** Output only. The list of insights associated with the asset. */
  insightList?: InsightList;
  /** Performance data for the asset. */
  performanceData?: AssetPerformanceData;
  /** Output only. The list of sources contributing to the asset. */
  sources?: Array<string>;
  /** Output only. The list of groups that the asset is assigned to. */
  assignedGroups?: Array<string>;
  /** Optional. Indicates if the asset is hidden. */
  hidden?: boolean;
  /** Optional. An optional reason for marking this asset as hidden. */
  hideReason?: string;
  /** Output only. The timestamp when the asset was marked as hidden. */
  hideTime?: string;
}

export const Asset: Schema.Schema<Asset> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  attributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  structuredAttributes: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  hostingProviderDetails: Schema.optional(HostingProviderDetails),
  virtualMachineDetails: Schema.optional(VirtualMachineDetails),
  machineDetails: Schema.optional(MachineDetails),
  databaseDeploymentDetails: Schema.optional(DatabaseDeploymentDetails),
  databaseDetails: Schema.optional(DatabaseDetails),
  awsS3BucketDetails: Schema.optional(AwsS3BucketDetails),
  awsEksClusterDetails: Schema.optional(AwsEksClusterDetails),
  awsElbLoadBalancerDetails: Schema.optional(AwsElbLoadBalancerDetails),
  awsLambdaFunctionDetails: Schema.optional(AwsLambdaFunctionDetails),
  awsEcsClusterDetails: Schema.optional(AwsEcsClusterDetails),
  awsEfsFileSystemDetails: Schema.optional(AwsEfsFileSystemDetails),
  awsRedshiftDetails: Schema.optional(AwsRedshiftDetails),
  awsVpcDetails: Schema.optional(AwsVpcDetails),
  awsCloudFrontDistributionDetails: Schema.optional(AwsCloudFrontDistributionDetails),
  awsDynamodbTableDetails: Schema.optional(AwsDynamoDBTableDetails),
  awsRoute53HostedZoneDetails: Schema.optional(AwsRoute53HostedZoneDetails),
  awsNatGatewayDetails: Schema.optional(AwsNatGatewayDetails),
  insightList: Schema.optional(InsightList),
  performanceData: Schema.optional(AssetPerformanceData),
  sources: Schema.optional(Schema.Array(Schema.String)),
  assignedGroups: Schema.optional(Schema.Array(Schema.String)),
  hidden: Schema.optional(Schema.Boolean),
  hideReason: Schema.optional(Schema.String),
  hideTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Asset" }) as any as Schema.Schema<Asset>;

export interface ListAssetsResponse {
  /** A list of assets. */
  assets?: Array<Asset>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListAssetsResponse: Schema.Schema<ListAssetsResponse> = Schema.suspend(() => Schema.Struct({
  assets: Schema.optional(Schema.Array(Asset)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListAssetsResponse" }) as any as Schema.Schema<ListAssetsResponse>;

export interface UpdateAssetRequest {
  /** Required. Field mask is used to specify the fields to be overwritten in the `Asset` resource by the update. The values specified in the `update_mask` field are relative to the resource, not the full request. A field will be overwritten if it is in the mask. A single * value in the mask lets you to overwrite all fields. */
  updateMask?: string;
  /** Required. The resource being updated. */
  asset?: Asset;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const UpdateAssetRequest: Schema.Schema<UpdateAssetRequest> = Schema.suspend(() => Schema.Struct({
  updateMask: Schema.optional(Schema.String),
  asset: Schema.optional(Asset),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateAssetRequest" }) as any as Schema.Schema<UpdateAssetRequest>;

export interface BatchUpdateAssetsRequest {
  /** Required. The request message specifying the resources to update. A maximum of 1000 assets can be modified in a batch. */
  requests?: Array<UpdateAssetRequest>;
}

export const BatchUpdateAssetsRequest: Schema.Schema<BatchUpdateAssetsRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(UpdateAssetRequest)),
})).annotate({ identifier: "BatchUpdateAssetsRequest" }) as any as Schema.Schema<BatchUpdateAssetsRequest>;

export interface BatchUpdateAssetsResponse {
  /** Update asset content. The content only includes values after field mask being applied. */
  assets?: Array<Asset>;
}

export const BatchUpdateAssetsResponse: Schema.Schema<BatchUpdateAssetsResponse> = Schema.suspend(() => Schema.Struct({
  assets: Schema.optional(Schema.Array(Asset)),
})).annotate({ identifier: "BatchUpdateAssetsResponse" }) as any as Schema.Schema<BatchUpdateAssetsResponse>;

export interface CascadeLogicalDBsRule {
}

export const CascadeLogicalDBsRule: Schema.Schema<CascadeLogicalDBsRule> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CascadeLogicalDBsRule" }) as any as Schema.Schema<CascadeLogicalDBsRule>;

export interface CascadingRule {
  /** Cascading rule for related logical DBs. */
  cascadeLogicalDbs?: CascadeLogicalDBsRule;
}

export const CascadingRule: Schema.Schema<CascadingRule> = Schema.suspend(() => Schema.Struct({
  cascadeLogicalDbs: Schema.optional(CascadeLogicalDBsRule),
})).annotate({ identifier: "CascadingRule" }) as any as Schema.Schema<CascadingRule>;

export interface BatchDeleteAssetsRequest {
  /** Required. The IDs of the assets to delete. A maximum of 1000 assets can be deleted in a batch. Format: projects/{project}/locations/{location}/assets/{name}. */
  names?: Array<string>;
  /** Optional. When this value is set to `true` the request is a no-op for non-existing assets. See https://google.aip.dev/135#delete-if-existing for additional details. Default value is `false`. */
  allowMissing?: boolean;
  /** Optional. Optional cascading rules for deleting related assets. */
  cascadingRules?: Array<CascadingRule>;
}

export const BatchDeleteAssetsRequest: Schema.Schema<BatchDeleteAssetsRequest> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
  allowMissing: Schema.optional(Schema.Boolean),
  cascadingRules: Schema.optional(Schema.Array(CascadingRule)),
})).annotate({ identifier: "BatchDeleteAssetsRequest" }) as any as Schema.Schema<BatchDeleteAssetsRequest>;

export interface MemoryUsageSample {
  /** Percentage of system memory utilized. Must be in the interval [0, 100]. */
  utilizedPercentage?: number;
}

export const MemoryUsageSample: Schema.Schema<MemoryUsageSample> = Schema.suspend(() => Schema.Struct({
  utilizedPercentage: Schema.optional(Schema.Number),
})).annotate({ identifier: "MemoryUsageSample" }) as any as Schema.Schema<MemoryUsageSample>;

export interface CpuUsageSample {
  /** Percentage of total CPU capacity utilized. Must be in the interval [0, 100]. On most systems can be calculated using 100 - idle percentage. */
  utilizedPercentage?: number;
}

export const CpuUsageSample: Schema.Schema<CpuUsageSample> = Schema.suspend(() => Schema.Struct({
  utilizedPercentage: Schema.optional(Schema.Number),
})).annotate({ identifier: "CpuUsageSample" }) as any as Schema.Schema<CpuUsageSample>;

export interface NetworkUsageSample {
  /** Average network ingress in B/s sampled over a short window. Must be non-negative. */
  averageIngressBps?: number;
  /** Average network egress in B/s sampled over a short window. Must be non-negative. */
  averageEgressBps?: number;
}

export const NetworkUsageSample: Schema.Schema<NetworkUsageSample> = Schema.suspend(() => Schema.Struct({
  averageIngressBps: Schema.optional(Schema.Number),
  averageEgressBps: Schema.optional(Schema.Number),
})).annotate({ identifier: "NetworkUsageSample" }) as any as Schema.Schema<NetworkUsageSample>;

export interface DiskUsageSample {
  /** Average IOPS sampled over a short window. Must be non-negative. If read or write are set, the sum of read and write will override the value of the average_iops. */
  averageIops?: number;
  /** Average read IOPS sampled over a short window. Must be non-negative. If both read and write are zero they are ignored. */
  averageReadIops?: number;
  /** Average write IOPS sampled over a short window. Must be non-negative. If both read and write are zero they are ignored. */
  averageWriteIops?: number;
}

export const DiskUsageSample: Schema.Schema<DiskUsageSample> = Schema.suspend(() => Schema.Struct({
  averageIops: Schema.optional(Schema.Number),
  averageReadIops: Schema.optional(Schema.Number),
  averageWriteIops: Schema.optional(Schema.Number),
})).annotate({ identifier: "DiskUsageSample" }) as any as Schema.Schema<DiskUsageSample>;

export interface PerformanceSample {
  /** Time the sample was collected. If omitted, the frame report time will be used. */
  sampleTime?: string;
  /** Memory usage sample. */
  memory?: MemoryUsageSample;
  /** CPU usage sample. */
  cpu?: CpuUsageSample;
  /** Network usage sample. */
  network?: NetworkUsageSample;
  /** Disk usage sample. */
  disk?: DiskUsageSample;
}

export const PerformanceSample: Schema.Schema<PerformanceSample> = Schema.suspend(() => Schema.Struct({
  sampleTime: Schema.optional(Schema.String),
  memory: Schema.optional(MemoryUsageSample),
  cpu: Schema.optional(CpuUsageSample),
  network: Schema.optional(NetworkUsageSample),
  disk: Schema.optional(DiskUsageSample),
})).annotate({ identifier: "PerformanceSample" }) as any as Schema.Schema<PerformanceSample>;

export interface AssetFrame {
  /** Asset information specific for virtual machines. */
  virtualMachineDetails?: VirtualMachineDetails;
  /** Asset information specific for virtual and physical machines. */
  machineDetails?: MachineDetails;
  /** Asset information specific for database deployments. */
  databaseDeploymentDetails?: DatabaseDeploymentDetails;
  /** Asset information specific for logical databases. */
  databaseDetails?: DatabaseDetails;
  /** Asset information specific for AWS S3 buckets. */
  awsS3BucketDetails?: AwsS3BucketDetails;
  /** Asset information specific for AWS EKS clusters. */
  awsEksClusterDetails?: AwsEksClusterDetails;
  /** Asset information specific for AWS Load Balancers. */
  awsElbLoadBalancerDetails?: AwsElbLoadBalancerDetails;
  /** Asset information specific for AWS Lambda functions. */
  awsLambdaFunctionDetails?: AwsLambdaFunctionDetails;
  /** Asset information specific for AWS ECS clusters. */
  awsEcsClusterDetails?: AwsEcsClusterDetails;
  /** Asset information specific for AWS EFS file systems. */
  awsEfsFileSystemDetails?: AwsEfsFileSystemDetails;
  /** Asset information specific for AWS Redshift clusters. */
  awsRedshiftDetails?: AwsRedshiftDetails;
  /** Asset information specific for AWS VPCs. */
  awsVpcDetails?: AwsVpcDetails;
  /** Asset information specific for AWS CloudFront distributions. */
  awsCloudFrontDistributionDetails?: AwsCloudFrontDistributionDetails;
  /** Asset information specific for AWS DynamoDB tables. */
  awsDynamodbTableDetails?: AwsDynamoDBTableDetails;
  /** Asset information specific for AwsRoute53HostedZoneDetails */
  awsRoute53HostedZoneDetails?: AwsRoute53HostedZoneDetails;
  /** Asset information specific for AwsNatGatewayDetails */
  awsNatGatewayDetails?: AwsNatGatewayDetails;
  /** The time the data was reported. */
  reportTime?: string;
  /** Labels as key value pairs. */
  labels?: Record<string, string>;
  /** Generic asset attributes. */
  attributes?: Record<string, string>;
  /** Optional. Generic structured asset attributes. */
  structuredAttributes?: Record<string, unknown>;
  /** Asset performance data samples. Samples that are from more than 40 days ago or after tomorrow are ignored. */
  performanceSamples?: Array<PerformanceSample>;
  /** Optional. Trace token is optionally provided to assist with debugging and traceability. */
  traceToken?: string;
  /** Optional. Frame collection type, if not specified the collection type will be based on the source type of the source the frame was reported on. */
  collectionType?: "SOURCE_TYPE_UNKNOWN" | "SOURCE_TYPE_UPLOAD" | "SOURCE_TYPE_GUEST_OS_SCAN" | "SOURCE_TYPE_INVENTORY_SCAN" | "SOURCE_TYPE_CUSTOM" | "SOURCE_TYPE_DISCOVERY_CLIENT" | (string & {});
  /** Optional. Details about the hosting provider of the asset. */
  hostingProviderDetails?: HostingProviderDetails;
}

export const AssetFrame: Schema.Schema<AssetFrame> = Schema.suspend(() => Schema.Struct({
  virtualMachineDetails: Schema.optional(VirtualMachineDetails),
  machineDetails: Schema.optional(MachineDetails),
  databaseDeploymentDetails: Schema.optional(DatabaseDeploymentDetails),
  databaseDetails: Schema.optional(DatabaseDetails),
  awsS3BucketDetails: Schema.optional(AwsS3BucketDetails),
  awsEksClusterDetails: Schema.optional(AwsEksClusterDetails),
  awsElbLoadBalancerDetails: Schema.optional(AwsElbLoadBalancerDetails),
  awsLambdaFunctionDetails: Schema.optional(AwsLambdaFunctionDetails),
  awsEcsClusterDetails: Schema.optional(AwsEcsClusterDetails),
  awsEfsFileSystemDetails: Schema.optional(AwsEfsFileSystemDetails),
  awsRedshiftDetails: Schema.optional(AwsRedshiftDetails),
  awsVpcDetails: Schema.optional(AwsVpcDetails),
  awsCloudFrontDistributionDetails: Schema.optional(AwsCloudFrontDistributionDetails),
  awsDynamodbTableDetails: Schema.optional(AwsDynamoDBTableDetails),
  awsRoute53HostedZoneDetails: Schema.optional(AwsRoute53HostedZoneDetails),
  awsNatGatewayDetails: Schema.optional(AwsNatGatewayDetails),
  reportTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  attributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  structuredAttributes: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  performanceSamples: Schema.optional(Schema.Array(PerformanceSample)),
  traceToken: Schema.optional(Schema.String),
  collectionType: Schema.optional(Schema.String),
  hostingProviderDetails: Schema.optional(HostingProviderDetails),
})).annotate({ identifier: "AssetFrame" }) as any as Schema.Schema<AssetFrame>;

export interface Frames {
  /** A repeated field of asset data. */
  framesData?: Array<AssetFrame>;
}

export const Frames: Schema.Schema<Frames> = Schema.suspend(() => Schema.Struct({
  framesData: Schema.optional(Schema.Array(AssetFrame)),
})).annotate({ identifier: "Frames" }) as any as Schema.Schema<Frames>;

export interface ReportAssetFramesResponse {
}

export const ReportAssetFramesResponse: Schema.Schema<ReportAssetFramesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ReportAssetFramesResponse" }) as any as Schema.Schema<ReportAssetFramesResponse>;

export interface AggregationCount {
}

export const AggregationCount: Schema.Schema<AggregationCount> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AggregationCount" }) as any as Schema.Schema<AggregationCount>;

export interface AggregationSum {
}

export const AggregationSum: Schema.Schema<AggregationSum> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AggregationSum" }) as any as Schema.Schema<AggregationSum>;

export interface AggregationHistogram {
  /** Lower bounds of buckets. The response will contain `n+1` buckets for `n` bounds. The first bucket will count all assets for which the field value is smaller than the first bound. Subsequent buckets will count assets for which the field value is greater or equal to a lower bound and smaller than the next one. The last bucket will count assets for which the field value is greater or equal to the final lower bound. You can define up to 20 lower bounds. */
  lowerBounds?: Array<number>;
}

export const AggregationHistogram: Schema.Schema<AggregationHistogram> = Schema.suspend(() => Schema.Struct({
  lowerBounds: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "AggregationHistogram" }) as any as Schema.Schema<AggregationHistogram>;

export interface AggregationFrequency {
}

export const AggregationFrequency: Schema.Schema<AggregationFrequency> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AggregationFrequency" }) as any as Schema.Schema<AggregationFrequency>;

export interface Aggregation {
  /** The name of the field on which to aggregate. */
  field?: string;
  /** Count the number of matching objects. */
  count?: AggregationCount;
  /** Sum over a numeric field. */
  sum?: AggregationSum;
  /** Creates a bucketed histogram of field values. */
  histogram?: AggregationHistogram;
  /** Creates a frequency distribution of all field values. */
  frequency?: AggregationFrequency;
}

export const Aggregation: Schema.Schema<Aggregation> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(Schema.String),
  count: Schema.optional(AggregationCount),
  sum: Schema.optional(AggregationSum),
  histogram: Schema.optional(AggregationHistogram),
  frequency: Schema.optional(AggregationFrequency),
})).annotate({ identifier: "Aggregation" }) as any as Schema.Schema<Aggregation>;

export interface AggregateAssetsValuesRequest {
  /** Array of aggregations to perform. Up to 25 aggregations can be defined. */
  aggregations?: Array<Aggregation>;
  /** Optional. The aggregation will be performed on assets that match the provided filter. */
  filter?: string;
  /** Optional. When this value is set to 'true' the response will include all assets, including those that are hidden. */
  showHidden?: boolean;
}

export const AggregateAssetsValuesRequest: Schema.Schema<AggregateAssetsValuesRequest> = Schema.suspend(() => Schema.Struct({
  aggregations: Schema.optional(Schema.Array(Aggregation)),
  filter: Schema.optional(Schema.String),
  showHidden: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AggregateAssetsValuesRequest" }) as any as Schema.Schema<AggregateAssetsValuesRequest>;

export interface AggregationResultCount {
  value?: string;
}

export const AggregationResultCount: Schema.Schema<AggregationResultCount> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "AggregationResultCount" }) as any as Schema.Schema<AggregationResultCount>;

export interface AggregationResultSum {
  value?: number;
}

export const AggregationResultSum: Schema.Schema<AggregationResultSum> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Number),
})).annotate({ identifier: "AggregationResultSum" }) as any as Schema.Schema<AggregationResultSum>;

export interface AggregationResultHistogramBucket {
  /** Lower bound - inclusive. */
  lowerBound?: number;
  /** Upper bound - exclusive. */
  upperBound?: number;
  /** Count of items in the bucket. */
  count?: string;
}

export const AggregationResultHistogramBucket: Schema.Schema<AggregationResultHistogramBucket> = Schema.suspend(() => Schema.Struct({
  lowerBound: Schema.optional(Schema.Number),
  upperBound: Schema.optional(Schema.Number),
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "AggregationResultHistogramBucket" }) as any as Schema.Schema<AggregationResultHistogramBucket>;

export interface AggregationResultHistogram {
  /** Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity. */
  buckets?: Array<AggregationResultHistogramBucket>;
}

export const AggregationResultHistogram: Schema.Schema<AggregationResultHistogram> = Schema.suspend(() => Schema.Struct({
  buckets: Schema.optional(Schema.Array(AggregationResultHistogramBucket)),
})).annotate({ identifier: "AggregationResultHistogram" }) as any as Schema.Schema<AggregationResultHistogram>;

export interface AggregationResultFrequency {
  values?: Record<string, string>;
}

export const AggregationResultFrequency: Schema.Schema<AggregationResultFrequency> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "AggregationResultFrequency" }) as any as Schema.Schema<AggregationResultFrequency>;

export interface AggregationResult {
  field?: string;
  count?: AggregationResultCount;
  sum?: AggregationResultSum;
  histogram?: AggregationResultHistogram;
  frequency?: AggregationResultFrequency;
}

export const AggregationResult: Schema.Schema<AggregationResult> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(Schema.String),
  count: Schema.optional(AggregationResultCount),
  sum: Schema.optional(AggregationResultSum),
  histogram: Schema.optional(AggregationResultHistogram),
  frequency: Schema.optional(AggregationResultFrequency),
})).annotate({ identifier: "AggregationResult" }) as any as Schema.Schema<AggregationResult>;

export interface AggregateAssetsValuesResponse {
  /** The aggregation results. */
  results?: Array<AggregationResult>;
}

export const AggregateAssetsValuesResponse: Schema.Schema<AggregateAssetsValuesResponse> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(AggregationResult)),
})).annotate({ identifier: "AggregateAssetsValuesResponse" }) as any as Schema.Schema<AggregateAssetsValuesResponse>;

export interface ImportError {
  /** The error information. */
  errorDetails?: string;
  /** The severity of the error. */
  severity?: "SEVERITY_UNSPECIFIED" | "ERROR" | "WARNING" | "INFO" | (string & {});
}

export const ImportError: Schema.Schema<ImportError> = Schema.suspend(() => Schema.Struct({
  errorDetails: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
})).annotate({ identifier: "ImportError" }) as any as Schema.Schema<ImportError>;

export interface ImportRowErrorCsvErrorDetails {
  /** The row number where the error was detected. */
  rowNumber?: number;
}

export const ImportRowErrorCsvErrorDetails: Schema.Schema<ImportRowErrorCsvErrorDetails> = Schema.suspend(() => Schema.Struct({
  rowNumber: Schema.optional(Schema.Number),
})).annotate({ identifier: "ImportRowErrorCsvErrorDetails" }) as any as Schema.Schema<ImportRowErrorCsvErrorDetails>;

export interface ImportRowErrorXlsxErrorDetails {
  /** The name of the sheet where the error was detected. */
  sheet?: string;
  /** The row number where the error was detected. */
  rowNumber?: number;
}

export const ImportRowErrorXlsxErrorDetails: Schema.Schema<ImportRowErrorXlsxErrorDetails> = Schema.suspend(() => Schema.Struct({
  sheet: Schema.optional(Schema.String),
  rowNumber: Schema.optional(Schema.Number),
})).annotate({ identifier: "ImportRowErrorXlsxErrorDetails" }) as any as Schema.Schema<ImportRowErrorXlsxErrorDetails>;

export interface ImportRowErrorArchiveErrorDetails {
  /** The file path inside the archive where the error was detected. */
  filePath?: string;
  /** Error details for a CSV file. */
  csvError?: ImportRowErrorCsvErrorDetails;
}

export const ImportRowErrorArchiveErrorDetails: Schema.Schema<ImportRowErrorArchiveErrorDetails> = Schema.suspend(() => Schema.Struct({
  filePath: Schema.optional(Schema.String),
  csvError: Schema.optional(ImportRowErrorCsvErrorDetails),
})).annotate({ identifier: "ImportRowErrorArchiveErrorDetails" }) as any as Schema.Schema<ImportRowErrorArchiveErrorDetails>;

export interface ImportRowError {
  /** The row number where the error was detected. */
  rowNumber?: number;
  /** The name of the VM in the row. */
  vmName?: string;
  /** The VM UUID. */
  vmUuid?: string;
  /** The asset title. */
  assetTitle?: string;
  /** The list of errors detected in the row. */
  errors?: Array<ImportError>;
  /** Error details for a CSV file. */
  csvError?: ImportRowErrorCsvErrorDetails;
  /** Error details for an XLSX file. */
  xlsxError?: ImportRowErrorXlsxErrorDetails;
  /** Error details for an archive file. */
  archiveError?: ImportRowErrorArchiveErrorDetails;
}

export const ImportRowError: Schema.Schema<ImportRowError> = Schema.suspend(() => Schema.Struct({
  rowNumber: Schema.optional(Schema.Number),
  vmName: Schema.optional(Schema.String),
  vmUuid: Schema.optional(Schema.String),
  assetTitle: Schema.optional(Schema.String),
  errors: Schema.optional(Schema.Array(ImportError)),
  csvError: Schema.optional(ImportRowErrorCsvErrorDetails),
  xlsxError: Schema.optional(ImportRowErrorXlsxErrorDetails),
  archiveError: Schema.optional(ImportRowErrorArchiveErrorDetails),
})).annotate({ identifier: "ImportRowError" }) as any as Schema.Schema<ImportRowError>;

export interface FileValidationReport {
  /** The name of the file. */
  fileName?: string;
  /** Partial list of rows that encountered validation error. */
  rowErrors?: Array<ImportRowError>;
  /** Flag indicating that processing was aborted due to maximum number of errors. */
  partialReport?: boolean;
  /** List of file level errors. */
  fileErrors?: Array<ImportError>;
}

export const FileValidationReport: Schema.Schema<FileValidationReport> = Schema.suspend(() => Schema.Struct({
  fileName: Schema.optional(Schema.String),
  rowErrors: Schema.optional(Schema.Array(ImportRowError)),
  partialReport: Schema.optional(Schema.Boolean),
  fileErrors: Schema.optional(Schema.Array(ImportError)),
})).annotate({ identifier: "FileValidationReport" }) as any as Schema.Schema<FileValidationReport>;

export interface ValidationReport {
  /** List of errors found in files. */
  fileValidations?: Array<FileValidationReport>;
  /** List of job level errors. */
  jobErrors?: Array<ImportError>;
}

export const ValidationReport: Schema.Schema<ValidationReport> = Schema.suspend(() => Schema.Struct({
  fileValidations: Schema.optional(Schema.Array(FileValidationReport)),
  jobErrors: Schema.optional(Schema.Array(ImportError)),
})).annotate({ identifier: "ValidationReport" }) as any as Schema.Schema<ValidationReport>;

export interface ExecutionReport {
  /** Total number of asset frames reported for the import job. */
  framesReported?: number;
  /** Validation errors encountered during the execution of the import job. */
  executionErrors?: ValidationReport;
  /** List of job-level errors. Deprecated, use the job errors under execution_errors instead. */
  jobErrors?: Array<ImportError>;
  /** Total number of rows in the import job. */
  totalRowsCount?: number;
}

export const ExecutionReport: Schema.Schema<ExecutionReport> = Schema.suspend(() => Schema.Struct({
  framesReported: Schema.optional(Schema.Number),
  executionErrors: Schema.optional(ValidationReport),
  jobErrors: Schema.optional(Schema.Array(ImportError)),
  totalRowsCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "ExecutionReport" }) as any as Schema.Schema<ExecutionReport>;

export interface PayloadFile {
  /** The file name. */
  name?: string;
  /** The file data. */
  data?: string;
}

export const PayloadFile: Schema.Schema<PayloadFile> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  data: Schema.optional(Schema.String),
})).annotate({ identifier: "PayloadFile" }) as any as Schema.Schema<PayloadFile>;

export interface InlinePayloadInfo {
  /** The import job format. */
  format?: "IMPORT_JOB_FORMAT_UNSPECIFIED" | "IMPORT_JOB_FORMAT_CMDB" | "IMPORT_JOB_FORMAT_RVTOOLS_XLSX" | "IMPORT_JOB_FORMAT_RVTOOLS_CSV" | "IMPORT_JOB_FORMAT_EXPORTED_AWS_CSV" | "IMPORT_JOB_FORMAT_EXPORTED_AZURE_CSV" | "IMPORT_JOB_FORMAT_MANUAL_CSV" | "IMPORT_JOB_FORMAT_DATABASE_ZIP" | (string & {});
  /** List of payload files. */
  payload?: Array<PayloadFile>;
}

export const InlinePayloadInfo: Schema.Schema<InlinePayloadInfo> = Schema.suspend(() => Schema.Struct({
  format: Schema.optional(Schema.String),
  payload: Schema.optional(Schema.Array(PayloadFile)),
})).annotate({ identifier: "InlinePayloadInfo" }) as any as Schema.Schema<InlinePayloadInfo>;

export interface GCSPayloadInfo {
  /** The import job format. */
  format?: "IMPORT_JOB_FORMAT_UNSPECIFIED" | "IMPORT_JOB_FORMAT_CMDB" | "IMPORT_JOB_FORMAT_RVTOOLS_XLSX" | "IMPORT_JOB_FORMAT_RVTOOLS_CSV" | "IMPORT_JOB_FORMAT_EXPORTED_AWS_CSV" | "IMPORT_JOB_FORMAT_EXPORTED_AZURE_CSV" | "IMPORT_JOB_FORMAT_MANUAL_CSV" | "IMPORT_JOB_FORMAT_DATABASE_ZIP" | (string & {});
  /** The payload path in Google Cloud Storage. */
  path?: string;
}

export const GCSPayloadInfo: Schema.Schema<GCSPayloadInfo> = Schema.suspend(() => Schema.Struct({
  format: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "GCSPayloadInfo" }) as any as Schema.Schema<GCSPayloadInfo>;

export interface ImportJob {
  /** Output only. The full name of the import job. */
  name?: string;
  /** User-friendly display name. Maximum length is 63 characters. */
  displayName?: string;
  /** Output only. The timestamp when the import job was created. */
  createTime?: string;
  /** Output only. The timestamp when the import job was last updated. */
  updateTime?: string;
  /** Output only. The timestamp when the import job was completed. */
  completeTime?: string;
  /** Output only. The state of the import job. */
  state?: "IMPORT_JOB_STATE_UNSPECIFIED" | "IMPORT_JOB_STATE_PENDING" | "IMPORT_JOB_STATE_RUNNING" | "IMPORT_JOB_STATE_COMPLETED" | "IMPORT_JOB_STATE_FAILED" | "IMPORT_JOB_STATE_VALIDATING" | "IMPORT_JOB_STATE_FAILED_VALIDATION" | "IMPORT_JOB_STATE_READY" | (string & {});
  /** Labels as key value pairs. */
  labels?: Record<string, string>;
  /** Output only. The report with the validation results of the import job. */
  validationReport?: ValidationReport;
  /** Output only. The report with the results of running the import job. */
  executionReport?: ExecutionReport;
  /** The payload is included in the request, mainly used for small import jobs. */
  inlinePayload?: InlinePayloadInfo;
  /** The payload is in Google Cloud Storage. */
  gcsPayload?: GCSPayloadInfo;
  /** Required. Reference to a source. */
  assetSource?: string;
}

export const ImportJob: Schema.Schema<ImportJob> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  completeTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  validationReport: Schema.optional(ValidationReport),
  executionReport: Schema.optional(ExecutionReport),
  inlinePayload: Schema.optional(InlinePayloadInfo),
  gcsPayload: Schema.optional(GCSPayloadInfo),
  assetSource: Schema.optional(Schema.String),
})).annotate({ identifier: "ImportJob" }) as any as Schema.Schema<ImportJob>;

export interface ListImportJobsResponse {
  /** The list of import jobs. */
  importJobs?: Array<ImportJob>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListImportJobsResponse: Schema.Schema<ListImportJobsResponse> = Schema.suspend(() => Schema.Struct({
  importJobs: Schema.optional(Schema.Array(ImportJob)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListImportJobsResponse" }) as any as Schema.Schema<ListImportJobsResponse>;

export interface ValidateImportJobRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const ValidateImportJobRequest: Schema.Schema<ValidateImportJobRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "ValidateImportJobRequest" }) as any as Schema.Schema<ValidateImportJobRequest>;

export interface RunImportJobRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const RunImportJobRequest: Schema.Schema<RunImportJobRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "RunImportJobRequest" }) as any as Schema.Schema<RunImportJobRequest>;

export interface UploadFileInfo {
  /** Output only. Expiration time of the upload URI. */
  uriExpirationTime?: string;
  /** Output only. The headers that were used to sign the URL. */
  headers?: Record<string, string>;
  /** Output only. Upload URI for the file. */
  signedUri?: string;
}

export const UploadFileInfo: Schema.Schema<UploadFileInfo> = Schema.suspend(() => Schema.Struct({
  uriExpirationTime: Schema.optional(Schema.String),
  headers: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  signedUri: Schema.optional(Schema.String),
})).annotate({ identifier: "UploadFileInfo" }) as any as Schema.Schema<UploadFileInfo>;

export interface ImportDataFile {
  /** Output only. The name of the file. */
  name?: string;
  /** Optional. User-friendly display name. Maximum length is 256 characters. */
  displayName?: string;
  /** Required. The payload format. */
  format?: "IMPORT_JOB_FORMAT_UNSPECIFIED" | "IMPORT_JOB_FORMAT_CMDB" | "IMPORT_JOB_FORMAT_RVTOOLS_XLSX" | "IMPORT_JOB_FORMAT_RVTOOLS_CSV" | "IMPORT_JOB_FORMAT_EXPORTED_AWS_CSV" | "IMPORT_JOB_FORMAT_EXPORTED_AZURE_CSV" | "IMPORT_JOB_FORMAT_MANUAL_CSV" | "IMPORT_JOB_FORMAT_DATABASE_ZIP" | (string & {});
  /** Output only. The timestamp when the file was created. */
  createTime?: string;
  /** Output only. The state of the import data file. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | (string & {});
  /** Information about a file that is uploaded to a storage service. */
  uploadFileInfo?: UploadFileInfo;
}

export const ImportDataFile: Schema.Schema<ImportDataFile> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  format: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  uploadFileInfo: Schema.optional(UploadFileInfo),
})).annotate({ identifier: "ImportDataFile" }) as any as Schema.Schema<ImportDataFile>;

export interface ListImportDataFilesResponse {
  /** The list of import data files. */
  importDataFiles?: Array<ImportDataFile>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListImportDataFilesResponse: Schema.Schema<ListImportDataFilesResponse> = Schema.suspend(() => Schema.Struct({
  importDataFiles: Schema.optional(Schema.Array(ImportDataFile)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListImportDataFilesResponse" }) as any as Schema.Schema<ListImportDataFilesResponse>;

export interface Group {
  /** Output only. The name of the group. */
  name?: string;
  /** Output only. The timestamp when the group was created. */
  createTime?: string;
  /** Output only. The timestamp when the group was last updated. */
  updateTime?: string;
  /** Labels as key value pairs. */
  labels?: Record<string, string>;
  /** Optional. User-friendly display name. */
  displayName?: string;
  /** Optional. The description of the group. */
  description?: string;
}

export const Group: Schema.Schema<Group> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "Group" }) as any as Schema.Schema<Group>;

export interface ListGroupsResponse {
  /** The list of Group */
  groups?: Array<Group>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListGroupsResponse: Schema.Schema<ListGroupsResponse> = Schema.suspend(() => Schema.Struct({
  groups: Schema.optional(Schema.Array(Group)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListGroupsResponse" }) as any as Schema.Schema<ListGroupsResponse>;

export interface AssetList {
  /** Required. A list of asset IDs */
  assetIds?: Array<string>;
}

export const AssetList: Schema.Schema<AssetList> = Schema.suspend(() => Schema.Struct({
  assetIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AssetList" }) as any as Schema.Schema<AssetList>;

export interface AddAssetsToGroupRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. List of assets to be added. The maximum number of assets that can be added in a single request is 2000. */
  assets?: AssetList;
  /** Optional. When this value is set to `false` and one of the given assets is already an existing member of the group, the operation fails with an `Already Exists` error. When set to `true` this situation is silently ignored by the server. Default value is `false`. */
  allowExisting?: boolean;
}

export const AddAssetsToGroupRequest: Schema.Schema<AddAssetsToGroupRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
  assets: Schema.optional(AssetList),
  allowExisting: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AddAssetsToGroupRequest" }) as any as Schema.Schema<AddAssetsToGroupRequest>;

export interface RemoveAssetsFromGroupRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. List of assets to be removed. The maximum number of assets that can be removed in a single request is 1000. */
  assets?: AssetList;
  /** Optional. When this value is set to `false` and one of the given assets is not an existing member of the group, the operation fails with a `Not Found` error. When set to `true` this situation is silently ignored by the server. Default value is `false`. */
  allowMissing?: boolean;
}

export const RemoveAssetsFromGroupRequest: Schema.Schema<RemoveAssetsFromGroupRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
  assets: Schema.optional(AssetList),
  allowMissing: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RemoveAssetsFromGroupRequest" }) as any as Schema.Schema<RemoveAssetsFromGroupRequest>;

export interface FrameViolationEntry {
  /** The field of the original frame where the violation occurred. */
  field?: string;
  /** A message describing the violation. */
  violation?: string;
}

export const FrameViolationEntry: Schema.Schema<FrameViolationEntry> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(Schema.String),
  violation: Schema.optional(Schema.String),
})).annotate({ identifier: "FrameViolationEntry" }) as any as Schema.Schema<FrameViolationEntry>;

export interface ErrorFrame {
  /** Output only. The identifier of the ErrorFrame. */
  name?: string;
  /** Output only. All the violations that were detected for the frame. */
  violations?: Array<FrameViolationEntry>;
  /** Output only. The frame that was originally reported. */
  originalFrame?: AssetFrame;
  /** Output only. Frame ingestion time. */
  ingestionTime?: string;
}

export const ErrorFrame: Schema.Schema<ErrorFrame> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  violations: Schema.optional(Schema.Array(FrameViolationEntry)),
  originalFrame: Schema.optional(AssetFrame),
  ingestionTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ErrorFrame" }) as any as Schema.Schema<ErrorFrame>;

export interface ListErrorFramesResponse {
  /** The list of error frames. */
  errorFrames?: Array<ErrorFrame>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListErrorFramesResponse: Schema.Schema<ListErrorFramesResponse> = Schema.suspend(() => Schema.Struct({
  errorFrames: Schema.optional(Schema.Array(ErrorFrame)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListErrorFramesResponse" }) as any as Schema.Schema<ListErrorFramesResponse>;

export interface Source {
  /** Output only. The full name of the source. */
  name?: string;
  /** Output only. The timestamp when the source was created. */
  createTime?: string;
  /** Output only. The timestamp when the source was last updated. */
  updateTime?: string;
  /** User-friendly display name. */
  displayName?: string;
  /** Free-text description. */
  description?: string;
  /** Data source type. */
  type?: "SOURCE_TYPE_UNKNOWN" | "SOURCE_TYPE_UPLOAD" | "SOURCE_TYPE_GUEST_OS_SCAN" | "SOURCE_TYPE_INVENTORY_SCAN" | "SOURCE_TYPE_CUSTOM" | "SOURCE_TYPE_DISCOVERY_CLIENT" | (string & {});
  /** The information confidence of the source. The higher the value, the higher the confidence. */
  priority?: number;
  /** If `true`, the source is managed by other service(s). */
  isManaged?: boolean;
  /** Output only. Number of frames that are still being processed. */
  pendingFrameCount?: number;
  /** Output only. The number of frames that were reported by the source and contained errors. */
  errorFrameCount?: number;
  /** Output only. The state of the source. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETING" | "INVALID" | (string & {});
}

export const Source: Schema.Schema<Source> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
  isManaged: Schema.optional(Schema.Boolean),
  pendingFrameCount: Schema.optional(Schema.Number),
  errorFrameCount: Schema.optional(Schema.Number),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "Source" }) as any as Schema.Schema<Source>;

export interface ListSourcesResponse {
  /** The list of sources. */
  sources?: Array<Source>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListSourcesResponse: Schema.Schema<ListSourcesResponse> = Schema.suspend(() => Schema.Struct({
  sources: Schema.optional(Schema.Array(Source)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListSourcesResponse" }) as any as Schema.Schema<ListSourcesResponse>;

export interface RegionPreferences {
  /** A list of preferred regions, ordered by the most preferred region first. Set only valid Google Cloud region names. See https://cloud.google.com/compute/docs/regions-zones for available regions. */
  preferredRegions?: Array<string>;
}

export const RegionPreferences: Schema.Schema<RegionPreferences> = Schema.suspend(() => Schema.Struct({
  preferredRegions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RegionPreferences" }) as any as Schema.Schema<RegionPreferences>;

export interface VirtualMachinePreferencesNetworkCostParameters {
  /** Optional. An estimated percentage of priced outbound traffic (egress traffic) from the measured outbound traffic. Must be in the interval [0, 100]. */
  estimatedEgressTrafficPercentage?: number;
}

export const VirtualMachinePreferencesNetworkCostParameters: Schema.Schema<VirtualMachinePreferencesNetworkCostParameters> = Schema.suspend(() => Schema.Struct({
  estimatedEgressTrafficPercentage: Schema.optional(Schema.Number),
})).annotate({ identifier: "VirtualMachinePreferencesNetworkCostParameters" }) as any as Schema.Schema<VirtualMachinePreferencesNetworkCostParameters>;

export interface VirtualMachinePreferencesSizingOptimizationCustomParameters {
  /** Optional. Type of statistical aggregation of a resource utilization data, on which to base the sizing metrics. */
  aggregationMethod?: "AGGREGATION_METHOD_UNSPECIFIED" | "AGGREGATION_METHOD_AVERAGE" | "AGGREGATION_METHOD_MEDIAN" | "AGGREGATION_METHOD_NINETY_FIFTH_PERCENTILE" | "AGGREGATION_METHOD_PEAK" | (string & {});
  /** Optional. Desired increase factor of storage, relative to currently used storage. Must be in the interval [1.0, 2.0] (or 0 for default value). */
  storageMultiplier?: number;
  /** Optional. Desired percentage of CPU usage. Must be in the interval [1, 100] (or 0 for default value). */
  cpuUsagePercentage?: number;
  /** Optional. Desired percentage of memory usage. Must be in the interval [1, 100] (or 0 for default value). */
  memoryUsagePercentage?: number;
}

export const VirtualMachinePreferencesSizingOptimizationCustomParameters: Schema.Schema<VirtualMachinePreferencesSizingOptimizationCustomParameters> = Schema.suspend(() => Schema.Struct({
  aggregationMethod: Schema.optional(Schema.String),
  storageMultiplier: Schema.optional(Schema.Number),
  cpuUsagePercentage: Schema.optional(Schema.Number),
  memoryUsagePercentage: Schema.optional(Schema.Number),
})).annotate({ identifier: "VirtualMachinePreferencesSizingOptimizationCustomParameters" }) as any as Schema.Schema<VirtualMachinePreferencesSizingOptimizationCustomParameters>;

export interface MachineSeries {
  /** Code to identify a machine series. Consult this for more details on the available series for Compute Engine: https://cloud.google.com/compute/docs/machine-resource#machine_type_comparison Consult this for more details on the available series for Google Cloud VMware Engine: https://cloud.google.com/vmware-engine/pricing */
  code?: string;
}

export const MachineSeries: Schema.Schema<MachineSeries> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
})).annotate({ identifier: "MachineSeries" }) as any as Schema.Schema<MachineSeries>;

export interface MachinePreferences {
  /** Compute Engine machine series to consider for insights and recommendations. If empty, no restriction is applied on the machine series. */
  allowedMachineSeries?: Array<MachineSeries>;
}

export const MachinePreferences: Schema.Schema<MachinePreferences> = Schema.suspend(() => Schema.Struct({
  allowedMachineSeries: Schema.optional(Schema.Array(MachineSeries)),
})).annotate({ identifier: "MachinePreferences" }) as any as Schema.Schema<MachinePreferences>;

export interface OperatingSystemPricingPreferencesOperatingSystemPricing {
  /** Optional. License type for premium images (RHEL, RHEL for SAP, SLES, SLES for SAP, Windows Server). */
  licenseType?: "LICENSE_TYPE_UNSPECIFIED" | "LICENSE_TYPE_DEFAULT" | "LICENSE_TYPE_BRING_YOUR_OWN_LICENSE" | (string & {});
  /** Optional. The plan of commitments for committed use discounts (CUD). */
  commitmentPlan?: "COMMITMENT_PLAN_UNSPECIFIED" | "COMMITMENT_PLAN_ON_DEMAND" | "COMMITMENT_PLAN_1_YEAR" | "COMMITMENT_PLAN_3_YEAR" | (string & {});
}

export const OperatingSystemPricingPreferencesOperatingSystemPricing: Schema.Schema<OperatingSystemPricingPreferencesOperatingSystemPricing> = Schema.suspend(() => Schema.Struct({
  licenseType: Schema.optional(Schema.String),
  commitmentPlan: Schema.optional(Schema.String),
})).annotate({ identifier: "OperatingSystemPricingPreferencesOperatingSystemPricing" }) as any as Schema.Schema<OperatingSystemPricingPreferencesOperatingSystemPricing>;

export interface OperatingSystemPricingPreferences {
  /** Optional. Pricing options for Windows images. No commitment plans are available, set it to unspecified. */
  windows?: OperatingSystemPricingPreferencesOperatingSystemPricing;
  /** Optional. Pricing options for RHEL images. */
  rhel?: OperatingSystemPricingPreferencesOperatingSystemPricing;
  /** Optional. Pricing options for SLES images. */
  sles?: OperatingSystemPricingPreferencesOperatingSystemPricing;
  /** Optional. Pricing options for SLES for SAP images. */
  slesForSap?: OperatingSystemPricingPreferencesOperatingSystemPricing;
}

export const OperatingSystemPricingPreferences: Schema.Schema<OperatingSystemPricingPreferences> = Schema.suspend(() => Schema.Struct({
  windows: Schema.optional(OperatingSystemPricingPreferencesOperatingSystemPricing),
  rhel: Schema.optional(OperatingSystemPricingPreferencesOperatingSystemPricing),
  sles: Schema.optional(OperatingSystemPricingPreferencesOperatingSystemPricing),
  slesForSap: Schema.optional(OperatingSystemPricingPreferencesOperatingSystemPricing),
})).annotate({ identifier: "OperatingSystemPricingPreferences" }) as any as Schema.Schema<OperatingSystemPricingPreferences>;

export interface ComputeEnginePreferences {
  /** Persistent disk type to use. If unspecified (default), all types are considered, based on available usage data. */
  persistentDiskType?: "PERSISTENT_DISK_TYPE_UNSPECIFIED" | "PERSISTENT_DISK_TYPE_STANDARD" | "PERSISTENT_DISK_TYPE_BALANCED" | "PERSISTENT_DISK_TYPE_SSD" | (string & {});
  /** Preferences concerning the machine types to consider on Compute Engine. */
  machinePreferences?: MachinePreferences;
  /** License type to consider when calculating costs for operating systems. If unspecified, costs are calculated based on the default licensing plan. If os_pricing_preferences is specified, it overrides this field. */
  licenseType?: "LICENSE_TYPE_UNSPECIFIED" | "LICENSE_TYPE_DEFAULT" | "LICENSE_TYPE_BRING_YOUR_OWN_LICENSE" | (string & {});
  /** Optional. Pricing options for OS images. */
  osPricingPreferences?: OperatingSystemPricingPreferences;
  /** Optional. Preferences for multithreading support on Windows Server. */
  multithreading?: "MULTITHREADING_UNSPECIFIED" | "MULTITHREADING_DISABLED" | "MULTITHREADING_ENABLED" | "MULTITHREADING_DISABLED_WITH_COMPENSATION" | (string & {});
}

export const ComputeEnginePreferences: Schema.Schema<ComputeEnginePreferences> = Schema.suspend(() => Schema.Struct({
  persistentDiskType: Schema.optional(Schema.String),
  machinePreferences: Schema.optional(MachinePreferences),
  licenseType: Schema.optional(Schema.String),
  osPricingPreferences: Schema.optional(OperatingSystemPricingPreferences),
  multithreading: Schema.optional(Schema.String),
})).annotate({ identifier: "ComputeEnginePreferences" }) as any as Schema.Schema<ComputeEnginePreferences>;

export interface VMwareEngineMachinePreferences {
  /** Optional. VMware Engine on Google Cloud machine series to consider for insights and recommendations. If empty, no restriction is applied on the machine series. */
  allowedMachineSeries?: Array<MachineSeries>;
  /** Optional. Whether to use storage-only nodes, if those are available. */
  storageOnlyNodes?: "STORAGE_ONLY_NODES_UNSPECIFIED" | "STORAGE_ONLY_NODES_ENABLED" | "STORAGE_ONLY_NODES_DISABLED" | (string & {});
  /** Optional. Whether to use VMware Engine Protected offering. */
  protectedNodes?: "PROTECTED_NODES_UNSPECIFIED" | "PROTECTED_NODES_ENABLED" | "PROTECTED_NODES_DISABLED" | (string & {});
}

export const VMwareEngineMachinePreferences: Schema.Schema<VMwareEngineMachinePreferences> = Schema.suspend(() => Schema.Struct({
  allowedMachineSeries: Schema.optional(Schema.Array(MachineSeries)),
  storageOnlyNodes: Schema.optional(Schema.String),
  protectedNodes: Schema.optional(Schema.String),
})).annotate({ identifier: "VMwareEngineMachinePreferences" }) as any as Schema.Schema<VMwareEngineMachinePreferences>;

export interface VmwareEnginePreferences {
  /** CPU overcommit ratio. Acceptable values are between 1.0 and 8.0, with 0.1 increment. */
  cpuOvercommitRatio?: number;
  /** Memory overcommit ratio. Acceptable values are 1.0, 1.25, 1.5, 1.75 and 2.0. */
  memoryOvercommitRatio?: number;
  /** The Deduplication and Compression ratio is based on the logical (Used Before) space required to store data before applying deduplication and compression, in relation to the physical (Used After) space required after applying deduplication and compression. Specifically, the ratio is the Used Before space divided by the Used After space. For example, if the Used Before space is 3 GB, but the physical Used After space is 1 GB, the deduplication and compression ratio is 3x. Acceptable values are between 1.0 and 4.0. */
  storageDeduplicationCompressionRatio?: number;
  /** Commitment plan to consider when calculating costs for virtual machine insights and recommendations. If you are unsure which value to set, a 3 year commitment plan is often a good value to start with. */
  commitmentPlan?: "COMMITMENT_PLAN_UNSPECIFIED" | "ON_DEMAND" | "COMMITMENT_1_YEAR_MONTHLY_PAYMENTS" | "COMMITMENT_3_YEAR_MONTHLY_PAYMENTS" | "COMMITMENT_1_YEAR_UPFRONT_PAYMENT" | "COMMITMENT_3_YEAR_UPFRONT_PAYMENT" | "COMMITMENT_FLEXIBLE_3_YEAR_MONTHLY_PAYMENTS" | "COMMITMENT_FLEXIBLE_3_YEAR_UPFRONT_PAYMENT" | (string & {});
  /** Optional. Preferences concerning the machine types to consider on Google Cloud VMware Engine. */
  machinePreferences?: VMwareEngineMachinePreferences;
  /** Optional. GCVE service type (fully licensed or portable license). */
  serviceType?: "SERVICE_TYPE_UNSPECIFIED" | "SERVICE_TYPE_FULLY_LICENSED" | "SERVICE_TYPE_PORTABLE_LICENSE" | (string & {});
  /** Optional. Discount percentage for the license offered to you by Broadcom. Must be between 0 and 100. Only valid when service_type is set to SERVICE_TYPE_PORTABLE_LICENSE. */
  licenseDiscountPercentage?: number;
}

export const VmwareEnginePreferences: Schema.Schema<VmwareEnginePreferences> = Schema.suspend(() => Schema.Struct({
  cpuOvercommitRatio: Schema.optional(Schema.Number),
  memoryOvercommitRatio: Schema.optional(Schema.Number),
  storageDeduplicationCompressionRatio: Schema.optional(Schema.Number),
  commitmentPlan: Schema.optional(Schema.String),
  machinePreferences: Schema.optional(VMwareEngineMachinePreferences),
  serviceType: Schema.optional(Schema.String),
  licenseDiscountPercentage: Schema.optional(Schema.Number),
})).annotate({ identifier: "VmwareEnginePreferences" }) as any as Schema.Schema<VmwareEnginePreferences>;

export interface SoleTenantNodeType {
  /** Name of the Sole Tenant node. Consult https://cloud.google.com/compute/docs/nodes/sole-tenant-nodes */
  nodeName?: string;
}

export const SoleTenantNodeType: Schema.Schema<SoleTenantNodeType> = Schema.suspend(() => Schema.Struct({
  nodeName: Schema.optional(Schema.String),
})).annotate({ identifier: "SoleTenantNodeType" }) as any as Schema.Schema<SoleTenantNodeType>;

export interface SoleTenancyPreferences {
  /** CPU overcommit ratio. Acceptable values are between 1.0 and 2.0 inclusive. */
  cpuOvercommitRatio?: number;
  /** Sole Tenancy nodes maintenance policy. */
  hostMaintenancePolicy?: "HOST_MAINTENANCE_POLICY_UNSPECIFIED" | "HOST_MAINTENANCE_POLICY_DEFAULT" | "HOST_MAINTENANCE_POLICY_RESTART_IN_PLACE" | "HOST_MAINTENANCE_POLICY_MIGRATE_WITHIN_NODE_GROUP" | (string & {});
  /** Commitment plan to consider when calculating costs for virtual machine insights and recommendations. If you are unsure which value to set, a 3 year commitment plan is often a good value to start with. */
  commitmentPlan?: "COMMITMENT_PLAN_UNSPECIFIED" | "ON_DEMAND" | "COMMITMENT_1_YEAR" | "COMMITMENT_3_YEAR" | "COMMITMENT_FLEXIBLE_1_YEAR" | "COMMITMENT_FLEXIBLE_3_YEAR" | (string & {});
  /** Optional. Pricing options for OS images. */
  osPricingPreferences?: OperatingSystemPricingPreferences;
  /** A list of sole tenant node types. An empty list means that all possible node types will be considered. */
  nodeTypes?: Array<SoleTenantNodeType>;
}

export const SoleTenancyPreferences: Schema.Schema<SoleTenancyPreferences> = Schema.suspend(() => Schema.Struct({
  cpuOvercommitRatio: Schema.optional(Schema.Number),
  hostMaintenancePolicy: Schema.optional(Schema.String),
  commitmentPlan: Schema.optional(Schema.String),
  osPricingPreferences: Schema.optional(OperatingSystemPricingPreferences),
  nodeTypes: Schema.optional(Schema.Array(SoleTenantNodeType)),
})).annotate({ identifier: "SoleTenancyPreferences" }) as any as Schema.Schema<SoleTenancyPreferences>;

export interface VirtualMachinePreferences {
  /** Target product for assets using this preference set. Specify either target product or business goal, but not both. */
  targetProduct?: "COMPUTE_MIGRATION_TARGET_PRODUCT_UNSPECIFIED" | "COMPUTE_MIGRATION_TARGET_PRODUCT_COMPUTE_ENGINE" | "COMPUTE_MIGRATION_TARGET_PRODUCT_VMWARE_ENGINE" | "COMPUTE_MIGRATION_TARGET_PRODUCT_SOLE_TENANCY" | (string & {});
  /** Region preferences for assets using this preference set. If you are unsure which value to set, the migration service API region is often a good value to start with. If PreferenceSet.RegionPreferences is specified, it overrides this field. */
  regionPreferences?: RegionPreferences;
  /** Commitment plan to consider when calculating costs for virtual machine insights and recommendations. If you are unsure which value to set, a 3 year commitment plan is often a good value to start with. */
  commitmentPlan?: "COMMITMENT_PLAN_UNSPECIFIED" | "COMMITMENT_PLAN_NONE" | "COMMITMENT_PLAN_ONE_YEAR" | "COMMITMENT_PLAN_THREE_YEARS" | "COMMITMENT_PLAN_FLEXIBLE_ONE_YEAR" | "COMMITMENT_PLAN_FLEXIBLE_THREE_YEARS" | (string & {});
  /** Optional. Parameters that affect network cost estimations. If not set, default values will be used for the parameters. */
  networkCostParameters?: VirtualMachinePreferencesNetworkCostParameters;
  /** Sizing optimization strategy specifies the preferred strategy used when extrapolating usage data to calculate insights and recommendations for a virtual machine. If you are unsure which value to set, a moderate sizing optimization strategy is often a good value to start with. */
  sizingOptimizationStrategy?: "SIZING_OPTIMIZATION_STRATEGY_UNSPECIFIED" | "SIZING_OPTIMIZATION_STRATEGY_SAME_AS_SOURCE" | "SIZING_OPTIMIZATION_STRATEGY_MODERATE" | "SIZING_OPTIMIZATION_STRATEGY_AGGRESSIVE" | "SIZING_OPTIMIZATION_STRATEGY_CUSTOM" | (string & {});
  /** Optional. Custom data to use for sizing optimizations. Relevant when SizingOptimizationStrategy is set to "custom". */
  sizingOptimizationCustomParameters?: VirtualMachinePreferencesSizingOptimizationCustomParameters;
  /** Optional. Compute Engine preferences concern insights and recommendations for Compute Engine target. */
  computeEnginePreferences?: ComputeEnginePreferences;
  /** Preferences concerning insights and recommendations for Google Cloud VMware Engine. */
  vmwareEnginePreferences?: VmwareEnginePreferences;
  /** Preferences concerning Sole Tenant nodes and virtual machines. */
  soleTenancyPreferences?: SoleTenancyPreferences;
}

export const VirtualMachinePreferences: Schema.Schema<VirtualMachinePreferences> = Schema.suspend(() => Schema.Struct({
  targetProduct: Schema.optional(Schema.String),
  regionPreferences: Schema.optional(RegionPreferences),
  commitmentPlan: Schema.optional(Schema.String),
  networkCostParameters: Schema.optional(VirtualMachinePreferencesNetworkCostParameters),
  sizingOptimizationStrategy: Schema.optional(Schema.String),
  sizingOptimizationCustomParameters: Schema.optional(VirtualMachinePreferencesSizingOptimizationCustomParameters),
  computeEnginePreferences: Schema.optional(ComputeEnginePreferences),
  vmwareEnginePreferences: Schema.optional(VmwareEnginePreferences),
  soleTenancyPreferences: Schema.optional(SoleTenancyPreferences),
})).annotate({ identifier: "VirtualMachinePreferences" }) as any as Schema.Schema<VirtualMachinePreferences>;

export interface DatabasePreferencesCloudSqlCommonBackup {
  /** Optional. Automated backup mode. */
  backupMode?: "BACKUP_MODE_UNSPECIFIED" | "BACKUP_MODE_DISABLED" | "BACKUP_MODE_ENABLED" | (string & {});
}

export const DatabasePreferencesCloudSqlCommonBackup: Schema.Schema<DatabasePreferencesCloudSqlCommonBackup> = Schema.suspend(() => Schema.Struct({
  backupMode: Schema.optional(Schema.String),
})).annotate({ identifier: "DatabasePreferencesCloudSqlCommonBackup" }) as any as Schema.Schema<DatabasePreferencesCloudSqlCommonBackup>;

export interface DatabasePreferencesCloudSqlCommon {
  /** Optional. Preferences for database backups. */
  backup?: DatabasePreferencesCloudSqlCommonBackup;
  /** Optional. Commitment plan to consider when calculating costs. Only regular CUDs (not flexible) are currently available. */
  commitmentPlan?: "COMMITMENT_PLAN_UNSPECIFIED" | "COMMITMENT_PLAN_NONE" | "COMMITMENT_PLAN_ONE_YEAR" | "COMMITMENT_PLAN_THREE_YEARS" | "COMMITMENT_PLAN_FLEXIBLE_ONE_YEAR" | "COMMITMENT_PLAN_FLEXIBLE_THREE_YEARS" | (string & {});
  /** Optional. Preferred zone availability. */
  zoneAvailability?: "CLOUD_SQL_ZONE_AVAILABILITY_UNSPECIFIED" | "CLOUD_SQL_ZONE_AVAILABILITY_ZONAL" | "CLOUD_SQL_ZONE_AVAILABILITY_REGIONAL" | (string & {});
  /** Optional. Sizing optimization strategy of the database. Currently supported for Cloud SQL are just two values: SIZING_OPTIMIZATION_STRATEGY_MODERATE and SIZING_OPTIMIZATION_STRATEGY_SAME_AS_SOURCE. SIZING_OPTIMIZATION_STRATEGY_UNSPECIFIED will behave like SIZING_OPTIMIZATION_STRATEGY_MODERATE. */
  sizingOptimizationStrategy?: "SIZING_OPTIMIZATION_STRATEGY_UNSPECIFIED" | "SIZING_OPTIMIZATION_STRATEGY_SAME_AS_SOURCE" | "SIZING_OPTIMIZATION_STRATEGY_MODERATE" | "SIZING_OPTIMIZATION_STRATEGY_AGGRESSIVE" | "SIZING_OPTIMIZATION_STRATEGY_CUSTOM" | (string & {});
  /** Optional. Persistent disk type to use. If unspecified, a disk type is recommended based on available usage data. For SQL Server, only SSD is available. For MySQL and PostgreSQL, only STANDARD (HDD) and SSD types are available. */
  persistentDiskType?: "PERSISTENT_DISK_TYPE_UNSPECIFIED" | "PERSISTENT_DISK_TYPE_STANDARD" | "PERSISTENT_DISK_TYPE_BALANCED" | "PERSISTENT_DISK_TYPE_SSD" | (string & {});
  /** Optional. Preferred Cloud SQL edition. */
  edition?: "CLOUD_SQL_EDITION_UNSPECIFIED" | "CLOUD_SQL_EDITION_ENTERPRISE" | "CLOUD_SQL_EDITION_ENTERPRISE_PLUS" | (string & {});
}

export const DatabasePreferencesCloudSqlCommon: Schema.Schema<DatabasePreferencesCloudSqlCommon> = Schema.suspend(() => Schema.Struct({
  backup: Schema.optional(DatabasePreferencesCloudSqlCommonBackup),
  commitmentPlan: Schema.optional(Schema.String),
  zoneAvailability: Schema.optional(Schema.String),
  sizingOptimizationStrategy: Schema.optional(Schema.String),
  persistentDiskType: Schema.optional(Schema.String),
  edition: Schema.optional(Schema.String),
})).annotate({ identifier: "DatabasePreferencesCloudSqlCommon" }) as any as Schema.Schema<DatabasePreferencesCloudSqlCommon>;

export interface DatabasePreferencesCloudSqlSqlServer {
  /** Optional. Preferences to Cloud SQL databases. */
  common?: DatabasePreferencesCloudSqlCommon;
  /** Optional. Preferences for multithreading support. */
  multithreading?: "MULTITHREADING_UNSPECIFIED" | "MULTITHREADING_DISABLED" | "MULTITHREADING_ENABLED" | "MULTITHREADING_DISABLED_WITH_COMPENSATION" | (string & {});
  /** Optional. Edition of Microsoft SQL version that is used on a Cloud SQL for SQL server instance. */
  versionType?: "VERSION_TYPE_UNSPECIFIED" | "VERSION_TYPE_AUTO" | "VERSION_TYPE_EXPRESS" | "VERSION_TYPE_WEB" | "VERSION_TYPE_STANDARD" | "VERSION_TYPE_ENTERPRISE" | (string & {});
}

export const DatabasePreferencesCloudSqlSqlServer: Schema.Schema<DatabasePreferencesCloudSqlSqlServer> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(DatabasePreferencesCloudSqlCommon),
  multithreading: Schema.optional(Schema.String),
  versionType: Schema.optional(Schema.String),
})).annotate({ identifier: "DatabasePreferencesCloudSqlSqlServer" }) as any as Schema.Schema<DatabasePreferencesCloudSqlSqlServer>;

export interface DatabasePreferencesCloudSqlMySql {
  /** Optional. Preferences to Cloud SQL databases. */
  common?: DatabasePreferencesCloudSqlCommon;
}

export const DatabasePreferencesCloudSqlMySql: Schema.Schema<DatabasePreferencesCloudSqlMySql> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(DatabasePreferencesCloudSqlCommon),
})).annotate({ identifier: "DatabasePreferencesCloudSqlMySql" }) as any as Schema.Schema<DatabasePreferencesCloudSqlMySql>;

export interface DatabasePreferencesCloudSqlPostgreSql {
  /** Optional. Preferences to Cloud SQL databases. */
  common?: DatabasePreferencesCloudSqlCommon;
}

export const DatabasePreferencesCloudSqlPostgreSql: Schema.Schema<DatabasePreferencesCloudSqlPostgreSql> = Schema.suspend(() => Schema.Struct({
  common: Schema.optional(DatabasePreferencesCloudSqlCommon),
})).annotate({ identifier: "DatabasePreferencesCloudSqlPostgreSql" }) as any as Schema.Schema<DatabasePreferencesCloudSqlPostgreSql>;

export interface DatabasePreferences {
  /** Optional. Preferences for target SQL Server on Cloud SQL when migrating from source Microsoft SQL server. */
  mssqlToCloudSqlForSqlServerPreferences?: DatabasePreferencesCloudSqlSqlServer;
  /** Optional. Preferences for target MySQL on Cloud SQL when migrating from source MySQL. */
  mysqlToCloudSqlForMysqlPreferences?: DatabasePreferencesCloudSqlMySql;
  /** Optional. Preferences for target PostgreSQL on Cloud SQL when migrating from source PostgreSQL. */
  postgresqlToCloudSqlForPostgresqlPreferences?: DatabasePreferencesCloudSqlPostgreSql;
}

export const DatabasePreferences: Schema.Schema<DatabasePreferences> = Schema.suspend(() => Schema.Struct({
  mssqlToCloudSqlForSqlServerPreferences: Schema.optional(DatabasePreferencesCloudSqlSqlServer),
  mysqlToCloudSqlForMysqlPreferences: Schema.optional(DatabasePreferencesCloudSqlMySql),
  postgresqlToCloudSqlForPostgresqlPreferences: Schema.optional(DatabasePreferencesCloudSqlPostgreSql),
})).annotate({ identifier: "DatabasePreferences" }) as any as Schema.Schema<DatabasePreferences>;

export interface PreferenceSet {
  /** Output only. Name of the PreferenceSet. */
  name?: string;
  /** Output only. The timestamp when the preference set was created. */
  createTime?: string;
  /** Output only. The timestamp when the preference set was last updated. */
  updateTime?: string;
  /** User-friendly display name. Maximum length is 63 characters. */
  displayName?: string;
  /** A description of the preference set. */
  description?: string;
  /** Optional. Region preferences for assets using this preference set. If you are unsure which value to set, the migration service API region is often a good value to start with. If unspecified, VirtualMachinePreferences.RegionPreferences is used. */
  regionPreferences?: RegionPreferences;
  /** A set of preferences that applies to all virtual machines in the context. */
  virtualMachinePreferences?: VirtualMachinePreferences;
  /** Optional. A set of preferences that applies to all databases in the context. */
  databasePreferences?: DatabasePreferences;
}

export const PreferenceSet: Schema.Schema<PreferenceSet> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  regionPreferences: Schema.optional(RegionPreferences),
  virtualMachinePreferences: Schema.optional(VirtualMachinePreferences),
  databasePreferences: Schema.optional(DatabasePreferences),
})).annotate({ identifier: "PreferenceSet" }) as any as Schema.Schema<PreferenceSet>;

export interface ListPreferenceSetsResponse {
  /** The list of PreferenceSets */
  preferenceSets?: Array<PreferenceSet>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListPreferenceSetsResponse: Schema.Schema<ListPreferenceSetsResponse> = Schema.suspend(() => Schema.Struct({
  preferenceSets: Schema.optional(Schema.Array(PreferenceSet)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListPreferenceSetsResponse" }) as any as Schema.Schema<ListPreferenceSetsResponse>;

export interface Settings {
  /** Output only. The name of the resource. */
  name?: string;
  /** The preference set used by default for a project. */
  preferenceSet?: string;
  /** Disable Cloud Logging for the Migration Center API. Users are billed for the logs. */
  disableCloudLogging?: boolean;
  /** Customer consent for Google sales to access their Cloud Migration Center project. */
  customerConsentForGoogleSalesToAccessMigrationCenter?: boolean;
}

export const Settings: Schema.Schema<Settings> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  preferenceSet: Schema.optional(Schema.String),
  disableCloudLogging: Schema.optional(Schema.Boolean),
  customerConsentForGoogleSalesToAccessMigrationCenter: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Settings" }) as any as Schema.Schema<Settings>;

export interface ReportConfigGroupPreferenceSetAssignment {
  /** Required. Name of the group. */
  group?: string;
  /** Required. Name of the Preference Set. */
  preferenceSet?: string;
}

export const ReportConfigGroupPreferenceSetAssignment: Schema.Schema<ReportConfigGroupPreferenceSetAssignment> = Schema.suspend(() => Schema.Struct({
  group: Schema.optional(Schema.String),
  preferenceSet: Schema.optional(Schema.String),
})).annotate({ identifier: "ReportConfigGroupPreferenceSetAssignment" }) as any as Schema.Schema<ReportConfigGroupPreferenceSetAssignment>;

export interface ReportConfig {
  /** Output only. Name of resource. */
  name?: string;
  /** Output only. The timestamp when the resource was created. */
  createTime?: string;
  /** Output only. The timestamp when the resource was last updated. */
  updateTime?: string;
  /** User-friendly display name. Maximum length is 63 characters. */
  displayName?: string;
  /** Free-text description. */
  description?: string;
  /** Required. Collection of combinations of groups and preference sets. */
  groupPreferencesetAssignments?: Array<ReportConfigGroupPreferenceSetAssignment>;
}

export const ReportConfig: Schema.Schema<ReportConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  groupPreferencesetAssignments: Schema.optional(Schema.Array(ReportConfigGroupPreferenceSetAssignment)),
})).annotate({ identifier: "ReportConfig" }) as any as Schema.Schema<ReportConfig>;

export interface ListReportConfigsResponse {
  /** A list of report configs. */
  reportConfigs?: Array<ReportConfig>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListReportConfigsResponse: Schema.Schema<ListReportConfigsResponse> = Schema.suspend(() => Schema.Struct({
  reportConfigs: Schema.optional(Schema.Array(ReportConfig)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListReportConfigsResponse" }) as any as Schema.Schema<ListReportConfigsResponse>;

export interface ReportSummaryChartDataDataPoint {
  /** The X-axis label for this data point. */
  label?: string;
  /** The Y-axis value for this data point. */
  value?: number;
}

export const ReportSummaryChartDataDataPoint: Schema.Schema<ReportSummaryChartDataDataPoint> = Schema.suspend(() => Schema.Struct({
  label: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Number),
})).annotate({ identifier: "ReportSummaryChartDataDataPoint" }) as any as Schema.Schema<ReportSummaryChartDataDataPoint>;

export interface ReportSummaryChartData {
  /** Each data point in the chart is represented as a name-value pair with the name being the x-axis label, and the value being the y-axis value. */
  dataPoints?: Array<ReportSummaryChartDataDataPoint>;
}

export const ReportSummaryChartData: Schema.Schema<ReportSummaryChartData> = Schema.suspend(() => Schema.Struct({
  dataPoints: Schema.optional(Schema.Array(ReportSummaryChartDataDataPoint)),
})).annotate({ identifier: "ReportSummaryChartData" }) as any as Schema.Schema<ReportSummaryChartData>;

export interface ReportSummaryUtilizationChartData {
  /** Aggregate value which falls into the "Used" bucket. */
  used?: string;
  /** Aggregate value which falls into the "Free" bucket. */
  free?: string;
}

export const ReportSummaryUtilizationChartData: Schema.Schema<ReportSummaryUtilizationChartData> = Schema.suspend(() => Schema.Struct({
  used: Schema.optional(Schema.String),
  free: Schema.optional(Schema.String),
})).annotate({ identifier: "ReportSummaryUtilizationChartData" }) as any as Schema.Schema<ReportSummaryUtilizationChartData>;

export interface ReportSummaryHistogramChartDataBucket {
  /** Lower bound - inclusive. */
  lowerBound?: string;
  /** Upper bound - exclusive. */
  upperBound?: string;
  /** Count of items in the bucket. */
  count?: string;
}

export const ReportSummaryHistogramChartDataBucket: Schema.Schema<ReportSummaryHistogramChartDataBucket> = Schema.suspend(() => Schema.Struct({
  lowerBound: Schema.optional(Schema.String),
  upperBound: Schema.optional(Schema.String),
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "ReportSummaryHistogramChartDataBucket" }) as any as Schema.Schema<ReportSummaryHistogramChartDataBucket>;

export interface ReportSummaryHistogramChartData {
  /** Buckets in the histogram. There will be `n+1` buckets matching `n` lower bounds in the request. The first bucket will be from -infinity to the first bound. Subsequent buckets will be between one bound and the next. The final bucket will be from the final bound to infinity. */
  buckets?: Array<ReportSummaryHistogramChartDataBucket>;
}

export const ReportSummaryHistogramChartData: Schema.Schema<ReportSummaryHistogramChartData> = Schema.suspend(() => Schema.Struct({
  buckets: Schema.optional(Schema.Array(ReportSummaryHistogramChartDataBucket)),
})).annotate({ identifier: "ReportSummaryHistogramChartData" }) as any as Schema.Schema<ReportSummaryHistogramChartData>;

export interface ReportSummaryAssetAggregateStats {
  /** Sum of the memory in bytes of all the assets in this collection. */
  totalMemoryBytes?: string;
  /** Sum of persistent storage in bytes of all the assets in this collection. */
  totalStorageBytes?: string;
  /** Sum of the CPU core count of all the assets in this collection. */
  totalCores?: string;
  /** Count of the number of unique assets in this collection. */
  totalAssets?: string;
  /** Total memory split into Used/Free buckets. */
  memoryUtilization?: ReportSummaryChartData;
  /** Total memory split into Used/Free buckets. */
  memoryUtilizationChart?: ReportSummaryUtilizationChartData;
  /** Total storage split into Used/Free buckets. */
  storageUtilization?: ReportSummaryChartData;
  /** Total memory split into Used/Free buckets. */
  storageUtilizationChart?: ReportSummaryUtilizationChartData;
  /** Count of assets grouped by age. */
  assetAge?: ReportSummaryChartData;
  /** Count of assets grouped by Operating System families. Only present for virtual machines. */
  operatingSystem?: ReportSummaryChartData;
  /** Histogram showing a distribution of logical CPU core counts. */
  coreCountHistogram?: ReportSummaryHistogramChartData;
  /** Histogram showing a distribution of memory sizes. */
  memoryBytesHistogram?: ReportSummaryHistogramChartData;
  /** Histogram showing a distribution of storage sizes. */
  storageBytesHistogram?: ReportSummaryHistogramChartData;
  /** Output only. Count of assets grouped by database type. Keys here are taken from DatabaseType enum. Only present for databases. */
  databaseTypes?: ReportSummaryChartData;
  /** Output only. Count of assets grouped by software name. Only present for virtual machines. */
  softwareInstances?: ReportSummaryChartData;
}

export const ReportSummaryAssetAggregateStats: Schema.Schema<ReportSummaryAssetAggregateStats> = Schema.suspend(() => Schema.Struct({
  totalMemoryBytes: Schema.optional(Schema.String),
  totalStorageBytes: Schema.optional(Schema.String),
  totalCores: Schema.optional(Schema.String),
  totalAssets: Schema.optional(Schema.String),
  memoryUtilization: Schema.optional(ReportSummaryChartData),
  memoryUtilizationChart: Schema.optional(ReportSummaryUtilizationChartData),
  storageUtilization: Schema.optional(ReportSummaryChartData),
  storageUtilizationChart: Schema.optional(ReportSummaryUtilizationChartData),
  assetAge: Schema.optional(ReportSummaryChartData),
  operatingSystem: Schema.optional(ReportSummaryChartData),
  coreCountHistogram: Schema.optional(ReportSummaryHistogramChartData),
  memoryBytesHistogram: Schema.optional(ReportSummaryHistogramChartData),
  storageBytesHistogram: Schema.optional(ReportSummaryHistogramChartData),
  databaseTypes: Schema.optional(ReportSummaryChartData),
  softwareInstances: Schema.optional(ReportSummaryChartData),
})).annotate({ identifier: "ReportSummaryAssetAggregateStats" }) as any as Schema.Schema<ReportSummaryAssetAggregateStats>;

export interface Money {
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. */
  units?: string;
  /** Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. */
  nanos?: number;
}

export const Money: Schema.Schema<Money> = Schema.suspend(() => Schema.Struct({
  currencyCode: Schema.optional(Schema.String),
  units: Schema.optional(Schema.String),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "Money" }) as any as Schema.Schema<Money>;

export interface ReportSummaryMachineSeriesAllocation {
  /** The Machine Series (e.g. "E2", "N2") */
  machineSeries?: MachineSeries;
  /** Count of assets allocated to this machine series. */
  allocatedAssetCount?: string;
}

export const ReportSummaryMachineSeriesAllocation: Schema.Schema<ReportSummaryMachineSeriesAllocation> = Schema.suspend(() => Schema.Struct({
  machineSeries: Schema.optional(MachineSeries),
  allocatedAssetCount: Schema.optional(Schema.String),
})).annotate({ identifier: "ReportSummaryMachineSeriesAllocation" }) as any as Schema.Schema<ReportSummaryMachineSeriesAllocation>;

export interface ReportSummaryMachineFinding {
  /** Set of regions in which the assets were allocated. */
  allocatedRegions?: Array<string>;
  /** Count of assets which were allocated. */
  allocatedAssetCount?: string;
  /** Distribution of assets based on the Machine Series. */
  machineSeriesAllocations?: Array<ReportSummaryMachineSeriesAllocation>;
  /** @deprecated. Use storage_allocations instead. Set of disk types allocated to assets. */
  allocatedDiskTypes?: Array<"PERSISTENT_DISK_TYPE_UNSPECIFIED" | "PERSISTENT_DISK_TYPE_STANDARD" | "PERSISTENT_DISK_TYPE_BALANCED" | "PERSISTENT_DISK_TYPE_SSD" | (string & {})>;
}

export const ReportSummaryMachineFinding: Schema.Schema<ReportSummaryMachineFinding> = Schema.suspend(() => Schema.Struct({
  allocatedRegions: Schema.optional(Schema.Array(Schema.String)),
  allocatedAssetCount: Schema.optional(Schema.String),
  machineSeriesAllocations: Schema.optional(Schema.Array(ReportSummaryMachineSeriesAllocation)),
  allocatedDiskTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ReportSummaryMachineFinding" }) as any as Schema.Schema<ReportSummaryMachineFinding>;

export interface ReportSummaryVMWareNode {
  /** Code to identify VMware Engine node series, e.g. "ve1-standard-72". Based on the displayName of cloud.google.com/vmware-engine/docs/reference/rest/v1/projects.locations.nodeTypes */
  code?: string;
}

export const ReportSummaryVMWareNode: Schema.Schema<ReportSummaryVMWareNode> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
})).annotate({ identifier: "ReportSummaryVMWareNode" }) as any as Schema.Schema<ReportSummaryVMWareNode>;

export interface ReportSummaryVMWareNodeAllocation {
  /** VMWare node type, e.g. "ve1-standard-72" */
  vmwareNode?: ReportSummaryVMWareNode;
  /** Count of this node type to be provisioned */
  nodeCount?: string;
  /** Count of assets allocated to these nodes */
  allocatedAssetCount?: string;
}

export const ReportSummaryVMWareNodeAllocation: Schema.Schema<ReportSummaryVMWareNodeAllocation> = Schema.suspend(() => Schema.Struct({
  vmwareNode: Schema.optional(ReportSummaryVMWareNode),
  nodeCount: Schema.optional(Schema.String),
  allocatedAssetCount: Schema.optional(Schema.String),
})).annotate({ identifier: "ReportSummaryVMWareNodeAllocation" }) as any as Schema.Schema<ReportSummaryVMWareNodeAllocation>;

export interface ReportSummaryVMWareEngineFinding {
  /** Set of regions in which the assets were allocated */
  allocatedRegions?: Array<string>;
  /** Count of assets which are allocated */
  allocatedAssetCount?: string;
  /** Set of per-nodetype allocation records */
  nodeAllocations?: Array<ReportSummaryVMWareNodeAllocation>;
}

export const ReportSummaryVMWareEngineFinding: Schema.Schema<ReportSummaryVMWareEngineFinding> = Schema.suspend(() => Schema.Struct({
  allocatedRegions: Schema.optional(Schema.Array(Schema.String)),
  allocatedAssetCount: Schema.optional(Schema.String),
  nodeAllocations: Schema.optional(Schema.Array(ReportSummaryVMWareNodeAllocation)),
})).annotate({ identifier: "ReportSummaryVMWareEngineFinding" }) as any as Schema.Schema<ReportSummaryVMWareEngineFinding>;

export interface ReportSummarySoleTenantNodeAllocation {
  /** Sole Tenant node type, e.g. "m3-node-128-3904" */
  node?: SoleTenantNodeType;
  /** Count of this node type to be provisioned */
  nodeCount?: string;
  /** Count of assets allocated to these nodes */
  allocatedAssetCount?: string;
}

export const ReportSummarySoleTenantNodeAllocation: Schema.Schema<ReportSummarySoleTenantNodeAllocation> = Schema.suspend(() => Schema.Struct({
  node: Schema.optional(SoleTenantNodeType),
  nodeCount: Schema.optional(Schema.String),
  allocatedAssetCount: Schema.optional(Schema.String),
})).annotate({ identifier: "ReportSummarySoleTenantNodeAllocation" }) as any as Schema.Schema<ReportSummarySoleTenantNodeAllocation>;

export interface ReportSummarySoleTenantFinding {
  /** Set of regions in which the assets are allocated */
  allocatedRegions?: Array<string>;
  /** Count of assets which are allocated */
  allocatedAssetCount?: string;
  /** Set of per-nodetype allocation records */
  nodeAllocations?: Array<ReportSummarySoleTenantNodeAllocation>;
}

export const ReportSummarySoleTenantFinding: Schema.Schema<ReportSummarySoleTenantFinding> = Schema.suspend(() => Schema.Struct({
  allocatedRegions: Schema.optional(Schema.Array(Schema.String)),
  allocatedAssetCount: Schema.optional(Schema.String),
  nodeAllocations: Schema.optional(Schema.Array(ReportSummarySoleTenantNodeAllocation)),
})).annotate({ identifier: "ReportSummarySoleTenantFinding" }) as any as Schema.Schema<ReportSummarySoleTenantFinding>;

export interface ReportSummaryDatabaseFinding {
  /** Output only. Number of database assets which were successfully assigned in this finding. */
  allocatedAssetCount?: string;
  /** Output only. Number of database assets in this finding. */
  totalAssets?: string;
}

export const ReportSummaryDatabaseFinding: Schema.Schema<ReportSummaryDatabaseFinding> = Schema.suspend(() => Schema.Struct({
  allocatedAssetCount: Schema.optional(Schema.String),
  totalAssets: Schema.optional(Schema.String),
})).annotate({ identifier: "ReportSummaryDatabaseFinding" }) as any as Schema.Schema<ReportSummaryDatabaseFinding>;

export interface ReportSummaryGroupPreferenceSetFinding {
  /** Display Name of the Preference Set */
  displayName?: string;
  /** Description for the Preference Set. */
  description?: string;
  /** Target region for this Preference Set */
  preferredRegion?: string;
  /** Text describing the pricing track specified for this Preference Set */
  pricingTrack?: string;
  /** Text describing the business priority specified for this Preference Set */
  topPriority?: string;
  /** A set of preferences that applies to all machines in the context. */
  machinePreferences?: VirtualMachinePreferences;
  /** Output only. A copy of the preference set used for this finding. */
  preferenceSet?: PreferenceSet;
  /** Output only. Total monthly cost for this preference set. */
  monthlyCostTotal?: Money;
  /** Output only. Compute monthly cost for this preference set. */
  monthlyCostCompute?: Money;
  /** Output only. All operating systems licensing monthly cost for this preference set. Only present for virtual machines. */
  monthlyCostOsLicense?: Money;
  /** Output only. Network Egress monthly cost for this preference set. Only present for virtual machines. */
  monthlyCostNetworkEgress?: Money;
  /** Output only. Storage monthly cost for this preference set. */
  monthlyCostStorage?: Money;
  /** Output only. GCVE Protected nodes cost for this preference set. */
  monthlyCostGcveProtected?: Money;
  /** Output only. Backup monthly cost for this preference set. Only present for databases. */
  monthlyCostDatabaseBackup?: Money;
  /** Output only. Database licensing monthly cost for this preference set. Only present for databases. */
  monthlyCostDatabaseLicensing?: Money;
  /** Output only. Miscellaneous monthly cost for this preference set. */
  monthlyCostOther?: Money;
  /** Output only. VMware portable license monthly cost for this preference set. Only present for VMware target with portable license service type. This cost is not paid to google, but is an estimate of license costs paid to VMware. */
  monthlyCostPortableVmwareLicense?: Money;
  /** Output only. A set of findings that applies to all virtual machines in the input. Only present for virtual machines. */
  machineFinding?: ReportSummaryMachineFinding;
  /** A set of findings that applies to VMWare machines in the input. Only present for virtual machines. */
  vmwareEngineFinding?: ReportSummaryVMWareEngineFinding;
  /** A set of findings that applies to Stole-Tenant machines in the input. Only present for virtual machines. */
  soleTenantFinding?: ReportSummarySoleTenantFinding;
  /** Output only. Details about databases in this finding. Only present for databases. */
  databaseFinding?: ReportSummaryDatabaseFinding;
}

export const ReportSummaryGroupPreferenceSetFinding: Schema.Schema<ReportSummaryGroupPreferenceSetFinding> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  preferredRegion: Schema.optional(Schema.String),
  pricingTrack: Schema.optional(Schema.String),
  topPriority: Schema.optional(Schema.String),
  machinePreferences: Schema.optional(VirtualMachinePreferences),
  preferenceSet: Schema.optional(PreferenceSet),
  monthlyCostTotal: Schema.optional(Money),
  monthlyCostCompute: Schema.optional(Money),
  monthlyCostOsLicense: Schema.optional(Money),
  monthlyCostNetworkEgress: Schema.optional(Money),
  monthlyCostStorage: Schema.optional(Money),
  monthlyCostGcveProtected: Schema.optional(Money),
  monthlyCostDatabaseBackup: Schema.optional(Money),
  monthlyCostDatabaseLicensing: Schema.optional(Money),
  monthlyCostOther: Schema.optional(Money),
  monthlyCostPortableVmwareLicense: Schema.optional(Money),
  machineFinding: Schema.optional(ReportSummaryMachineFinding),
  vmwareEngineFinding: Schema.optional(ReportSummaryVMWareEngineFinding),
  soleTenantFinding: Schema.optional(ReportSummarySoleTenantFinding),
  databaseFinding: Schema.optional(ReportSummaryDatabaseFinding),
})).annotate({ identifier: "ReportSummaryGroupPreferenceSetFinding" }) as any as Schema.Schema<ReportSummaryGroupPreferenceSetFinding>;

export interface ReportSummaryGroupFinding {
  /** Output only. Full name of the group. */
  group?: string;
  /** Display Name for this group finding. */
  displayName?: string;
  /** Description for this group finding. */
  description?: string;
  /** Summary statistics for all the assets in this group. */
  assetAggregateStats?: ReportSummaryAssetAggregateStats;
  /** Output only. Asset type for the group finding. */
  assetType?: "ASSET_TYPE_UNSPECIFIED" | "VIRTUAL_MACHINE" | "DATABASE" | (string & {});
  /** Output only. Source asset database type for the group finding. Only present for databases. */
  databaseType?: "DATABASE_TYPE_UNSPECIFIED" | "SQL_SERVER" | "MYSQL" | "POSTGRES" | (string & {});
  /** This field is deprecated, do not rely on it having a value. */
  overlappingAssetCount?: string;
  /** Findings for each of the PreferenceSets for this group. */
  preferenceSetFindings?: Array<ReportSummaryGroupPreferenceSetFinding>;
}

export const ReportSummaryGroupFinding: Schema.Schema<ReportSummaryGroupFinding> = Schema.suspend(() => Schema.Struct({
  group: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  assetAggregateStats: Schema.optional(ReportSummaryAssetAggregateStats),
  assetType: Schema.optional(Schema.String),
  databaseType: Schema.optional(Schema.String),
  overlappingAssetCount: Schema.optional(Schema.String),
  preferenceSetFindings: Schema.optional(Schema.Array(ReportSummaryGroupPreferenceSetFinding)),
})).annotate({ identifier: "ReportSummaryGroupFinding" }) as any as Schema.Schema<ReportSummaryGroupFinding>;

export interface ReportSummary {
  /** Aggregate statistics for unique assets across all the groups. */
  allAssetsStats?: ReportSummaryAssetAggregateStats;
  /** Output only. Aggregate statistics for unique virtual machine assets across all the groups. */
  virtualMachineStats?: ReportSummaryAssetAggregateStats;
  /** Output only. Aggregate statistics for unique database assets across all the groups. */
  databaseStats?: ReportSummaryAssetAggregateStats;
  /** Findings for each Group included in this report. */
  groupFindings?: Array<ReportSummaryGroupFinding>;
}

export const ReportSummary: Schema.Schema<ReportSummary> = Schema.suspend(() => Schema.Struct({
  allAssetsStats: Schema.optional(ReportSummaryAssetAggregateStats),
  virtualMachineStats: Schema.optional(ReportSummaryAssetAggregateStats),
  databaseStats: Schema.optional(ReportSummaryAssetAggregateStats),
  groupFindings: Schema.optional(Schema.Array(ReportSummaryGroupFinding)),
})).annotate({ identifier: "ReportSummary" }) as any as Schema.Schema<ReportSummary>;

export interface Report {
  /** Output only. Name of resource. */
  name?: string;
  /** Output only. Creation timestamp. */
  createTime?: string;
  /** Output only. Last update timestamp. */
  updateTime?: string;
  /** User-friendly display name. Maximum length is 63 characters. */
  displayName?: string;
  /** Free-text description. */
  description?: string;
  /** Report type. */
  type?: "TYPE_UNSPECIFIED" | "TOTAL_COST_OF_OWNERSHIP" | (string & {});
  /** Report creation state. */
  state?: "STATE_UNSPECIFIED" | "PENDING" | "SUCCEEDED" | "FAILED" | (string & {});
  /** Output only. Summary view of the Report. */
  summary?: ReportSummary;
}

export const Report: Schema.Schema<Report> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  summary: Schema.optional(ReportSummary),
})).annotate({ identifier: "Report" }) as any as Schema.Schema<Report>;

export interface ListReportsResponse {
  /** The list of Reports. */
  reports?: Array<Report>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListReportsResponse: Schema.Schema<ListReportsResponse> = Schema.suspend(() => Schema.Struct({
  reports: Schema.optional(Schema.Array(Report)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListReportsResponse" }) as any as Schema.Schema<ListReportsResponse>;

export interface SignedUriDestination {
  /** Required. The file format to export. */
  fileFormat?: "FILE_FORMAT_UNSPECIFIED" | "CSV" | "XLSX" | (string & {});
}

export const SignedUriDestination: Schema.Schema<SignedUriDestination> = Schema.suspend(() => Schema.Struct({
  fileFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "SignedUriDestination" }) as any as Schema.Schema<SignedUriDestination>;

export interface SignedUri {
  /** Output only. Name of the file the Signed URI references. */
  file?: string;
  /** Output only. Download URI for the file. */
  uri?: string;
}

export const SignedUri: Schema.Schema<SignedUri> = Schema.suspend(() => Schema.Struct({
  file: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "SignedUri" }) as any as Schema.Schema<SignedUri>;

export interface SignedUris {
  /** Output only. List of signed URIs. */
  signedUris?: Array<SignedUri>;
}

export const SignedUris: Schema.Schema<SignedUris> = Schema.suspend(() => Schema.Struct({
  signedUris: Schema.optional(Schema.Array(SignedUri)),
})).annotate({ identifier: "SignedUris" }) as any as Schema.Schema<SignedUris>;

export interface CsvOutputFile {
  /** Output only. Signed URI destination. */
  signedUri?: SignedUri;
  /** Output only. Number of columns in the file. */
  columnsCount?: number;
  /** Output only. Number of rows in the file. */
  rowCount?: number;
}

export const CsvOutputFile: Schema.Schema<CsvOutputFile> = Schema.suspend(() => Schema.Struct({
  signedUri: Schema.optional(SignedUri),
  columnsCount: Schema.optional(Schema.Number),
  rowCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "CsvOutputFile" }) as any as Schema.Schema<CsvOutputFile>;

export interface XlsxOutputFile {
  /** Output only. Signed URI destination. */
  signedUri?: SignedUri;
}

export const XlsxOutputFile: Schema.Schema<XlsxOutputFile> = Schema.suspend(() => Schema.Struct({
  signedUri: Schema.optional(SignedUri),
})).annotate({ identifier: "XlsxOutputFile" }) as any as Schema.Schema<XlsxOutputFile>;

export interface OutputFile {
  /** Output only. CSV output file. */
  csvOutputFile?: CsvOutputFile;
  /** Output only. XLSX output file. */
  xlsxOutputFile?: XlsxOutputFile;
  /** Output only. File size in bytes. */
  fileSizeBytes?: string;
}

export const OutputFile: Schema.Schema<OutputFile> = Schema.suspend(() => Schema.Struct({
  csvOutputFile: Schema.optional(CsvOutputFile),
  xlsxOutputFile: Schema.optional(XlsxOutputFile),
  fileSizeBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "OutputFile" }) as any as Schema.Schema<OutputFile>;

export interface OutputFileList {
  /** List of output files. */
  entries?: Array<OutputFile>;
}

export const OutputFileList: Schema.Schema<OutputFileList> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(OutputFile)),
})).annotate({ identifier: "OutputFileList" }) as any as Schema.Schema<OutputFileList>;

export interface ReportExportExecutionResult {
  /** Output only. Signed URLs for downloading export artifacts. */
  signedUris?: SignedUris;
  /** Output only. List of output files. */
  outputFiles?: OutputFileList;
  /** Output only. Error encountered during export. */
  error?: Status;
}

export const ReportExportExecutionResult: Schema.Schema<ReportExportExecutionResult> = Schema.suspend(() => Schema.Struct({
  signedUris: Schema.optional(SignedUris),
  outputFiles: Schema.optional(OutputFileList),
  error: Schema.optional(Status),
})).annotate({ identifier: "ReportExportExecutionResult" }) as any as Schema.Schema<ReportExportExecutionResult>;

export interface ReportExportExecution {
  /** Output only. Globally unique identifier of the execution. */
  executionId?: string;
  /** Output only. Execution start timestamp. */
  startTime?: string;
  /** Output only. Completion time of the export. */
  endTime?: string;
  /** Output only. Expiration time for the export and artifacts. */
  expireTime?: string;
  /** Output only. Result of the export execution. */
  result?: ReportExportExecutionResult;
  /** Output only. Represents the progress of the execution. It reaches 100 when the execution is successfully completed. When the execution finishes with a failure, the progress is set to 0. */
  progressPercentage?: number;
}

export const ReportExportExecution: Schema.Schema<ReportExportExecution> = Schema.suspend(() => Schema.Struct({
  executionId: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  result: Schema.optional(ReportExportExecutionResult),
  progressPercentage: Schema.optional(Schema.Number),
})).annotate({ identifier: "ReportExportExecution" }) as any as Schema.Schema<ReportExportExecution>;

export interface ReportExportJob {
  /** Output only. Identifier. Resource name. */
  name?: string;
  /** Export with a SignedUri. */
  signedUriDestination?: SignedUriDestination;
  /** Output only. Recent not expired executions of the export report job. */
  recentExecutions?: Array<ReportExportExecution>;
}

export const ReportExportJob: Schema.Schema<ReportExportJob> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  signedUriDestination: Schema.optional(SignedUriDestination),
  recentExecutions: Schema.optional(Schema.Array(ReportExportExecution)),
})).annotate({ identifier: "ReportExportJob" }) as any as Schema.Schema<ReportExportJob>;

export interface ListReportExportJobsResponse {
  /** Output only. The list of report export jobs. */
  reportExportJobs?: Array<ReportExportJob>;
  /** Output only. A token identifying a page of results the server should return. */
  nextPageToken?: string;
}

export const ListReportExportJobsResponse: Schema.Schema<ListReportExportJobsResponse> = Schema.suspend(() => Schema.Struct({
  reportExportJobs: Schema.optional(Schema.Array(ReportExportJob)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListReportExportJobsResponse" }) as any as Schema.Schema<ListReportExportJobsResponse>;

export interface RunReportExportJobRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const RunReportExportJobRequest: Schema.Schema<RunReportExportJobRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "RunReportExportJobRequest" }) as any as Schema.Schema<RunReportExportJobRequest>;

export interface AssetsExportJobExportCondition {
  /** Optional. Assets filter, supports the same syntax as asset listing. */
  filter?: string;
}

export const AssetsExportJobExportCondition: Schema.Schema<AssetsExportJobExportCondition> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(Schema.String),
})).annotate({ identifier: "AssetsExportJobExportCondition" }) as any as Schema.Schema<AssetsExportJobExportCondition>;

export interface AssetsExportJobNetworkDependencies {
}

export const AssetsExportJobNetworkDependencies: Schema.Schema<AssetsExportJobNetworkDependencies> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AssetsExportJobNetworkDependencies" }) as any as Schema.Schema<AssetsExportJobNetworkDependencies>;

export interface AssetsExportJobInventory {
}

export const AssetsExportJobInventory: Schema.Schema<AssetsExportJobInventory> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AssetsExportJobInventory" }) as any as Schema.Schema<AssetsExportJobInventory>;

export interface AssetsExportJobPerformanceData {
  /** Optional. When this value is set to a positive integer, performance data will be returned for the most recent days for which data is available. When this value is unset (or set to zero), all available data is returned. The maximum value is 420; values above 420 will be coerced to 420. If unset (0 value) a default value of 40 will be used. */
  maxDays?: number;
}

export const AssetsExportJobPerformanceData: Schema.Schema<AssetsExportJobPerformanceData> = Schema.suspend(() => Schema.Struct({
  maxDays: Schema.optional(Schema.Number),
})).annotate({ identifier: "AssetsExportJobPerformanceData" }) as any as Schema.Schema<AssetsExportJobPerformanceData>;

export interface AssetsExportJobExecutionResult {
  /** Output only. Signed URLs for downloading export artifacts. */
  signedUris?: SignedUris;
  /** Output only. List of output files. */
  outputFiles?: OutputFileList;
  /** Output only. Error encountered during export. */
  error?: Status;
}

export const AssetsExportJobExecutionResult: Schema.Schema<AssetsExportJobExecutionResult> = Schema.suspend(() => Schema.Struct({
  signedUris: Schema.optional(SignedUris),
  outputFiles: Schema.optional(OutputFileList),
  error: Schema.optional(Status),
})).annotate({ identifier: "AssetsExportJobExecutionResult" }) as any as Schema.Schema<AssetsExportJobExecutionResult>;

export interface AssetsExportJobExecution {
  /** Output only. Globally unique identifier of the execution. */
  executionId?: string;
  /** Output only. Execution timestamp. */
  startTime?: string;
  /** Output only. Completion time of the export. */
  endTime?: string;
  /** Output only. Expiration time for the export and artifacts. */
  expireTime?: string;
  /** Output only. Number of assets requested for export after resolving the requested filters. */
  requestedAssetCount?: number;
  /** Output only. Result of the export execution. */
  result?: AssetsExportJobExecutionResult;
}

export const AssetsExportJobExecution: Schema.Schema<AssetsExportJobExecution> = Schema.suspend(() => Schema.Struct({
  executionId: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  requestedAssetCount: Schema.optional(Schema.Number),
  result: Schema.optional(AssetsExportJobExecutionResult),
})).annotate({ identifier: "AssetsExportJobExecution" }) as any as Schema.Schema<AssetsExportJobExecution>;

export interface AssetsExportJob {
  /** Output only. Identifier. Resource name. */
  name?: string;
  /** Optional. Conditions for selecting assets to export. */
  condition?: AssetsExportJobExportCondition;
  /** Output only. Resource creation time. */
  createTime?: string;
  /** Output only. Resource update time. */
  updateTime?: string;
  /** Optional. Labels as key value pairs. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes. */
  labels?: Record<string, string>;
  /** Export data regarding asset network dependencies. */
  networkDependencies?: AssetsExportJobNetworkDependencies;
  /** Export asset inventory details. */
  inventory?: AssetsExportJobInventory;
  /** Export asset with performance data. */
  performanceData?: AssetsExportJobPerformanceData;
  /** Export to Cloud Storage files downloadable using signed URIs. */
  signedUriDestination?: SignedUriDestination;
  /** Output only. Recent non expired executions of the job. */
  recentExecutions?: Array<AssetsExportJobExecution>;
  /** Optional. When this value is set to 'true' the response will include all assets, including those that are hidden. */
  showHidden?: boolean;
}

export const AssetsExportJob: Schema.Schema<AssetsExportJob> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  condition: Schema.optional(AssetsExportJobExportCondition),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  networkDependencies: Schema.optional(AssetsExportJobNetworkDependencies),
  inventory: Schema.optional(AssetsExportJobInventory),
  performanceData: Schema.optional(AssetsExportJobPerformanceData),
  signedUriDestination: Schema.optional(SignedUriDestination),
  recentExecutions: Schema.optional(Schema.Array(AssetsExportJobExecution)),
  showHidden: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AssetsExportJob" }) as any as Schema.Schema<AssetsExportJob>;

export interface ListAssetsExportJobsResponse {
  /** Output only. The list of assets export jobs. */
  assetsExportJobs?: Array<AssetsExportJob>;
  /** Output only. A token identifying a page of results the server should return. */
  nextPageToken?: string;
}

export const ListAssetsExportJobsResponse: Schema.Schema<ListAssetsExportJobsResponse> = Schema.suspend(() => Schema.Struct({
  assetsExportJobs: Schema.optional(Schema.Array(AssetsExportJob)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAssetsExportJobsResponse" }) as any as Schema.Schema<ListAssetsExportJobsResponse>;

export interface RunAssetsExportJobRequest {
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const RunAssetsExportJobRequest: Schema.Schema<RunAssetsExportJobRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "RunAssetsExportJobRequest" }) as any as Schema.Schema<RunAssetsExportJobRequest>;

export interface DiscoveryClientDiscoveryClientRecommendedVersion {
  /** Output only. The version of the discovery client. */
  version?: string;
  /** Output only. The URI of the discovery client version. */
  uri?: string;
}

export const DiscoveryClientDiscoveryClientRecommendedVersion: Schema.Schema<DiscoveryClientDiscoveryClientRecommendedVersion> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "DiscoveryClientDiscoveryClientRecommendedVersion" }) as any as Schema.Schema<DiscoveryClientDiscoveryClientRecommendedVersion>;

export interface DiscoveryClient {
  /** Output only. Identifier. Full name of this discovery client. */
  name?: string;
  /** Output only. Time when the discovery client was first created. */
  createTime?: string;
  /** Output only. Time when the discovery client was last updated. This value is not updated by heartbeats, to view the last heartbeat time please refer to the `heartbeat_time` field. */
  updateTime?: string;
  /** Required. Full name of the source object associated with this discovery client. */
  source?: string;
  /** Required. Service account used by the discovery client for various operation. */
  serviceAccount?: string;
  /** Output only. This field is intended for internal use. */
  signalsEndpoint?: string;
  /** Optional. Free text display name. Maximum length is 63 characters. */
  displayName?: string;
  /** Optional. Free text description. Maximum length is 1000 characters. */
  description?: string;
  /** Optional. Labels as key value pairs. */
  labels?: Record<string, string>;
  /** Output only. Current state of the discovery client. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "OFFLINE" | "DEGRADED" | "EXPIRED" | (string & {});
  /** Output only. Client version, as reported in recent heartbeat. */
  version?: string;
  /** Output only. Errors affecting client functionality. */
  errors?: Array<Status>;
  /** Output only. Last heartbeat time. Healthy clients are expected to send heartbeats regularly (normally every few minutes). */
  heartbeatTime?: string;
  /** Optional. Client expiration time in UTC. If specified, the backend will not accept new frames after this time. */
  expireTime?: string;
  /** Optional. Input only. Client time-to-live. If specified, the backend will not accept new frames after this time. This field is input only. The derived expiration time is provided as output through the `expire_time` field. */
  ttl?: string;
  /** Output only. The recommended versions of the discovery client. */
  recommendedVersions?: Array<DiscoveryClientDiscoveryClientRecommendedVersion>;
}

export const DiscoveryClient: Schema.Schema<DiscoveryClient> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  signalsEndpoint: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  state: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  errors: Schema.optional(Schema.Array(Status)),
  heartbeatTime: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  ttl: Schema.optional(Schema.String),
  recommendedVersions: Schema.optional(Schema.Array(DiscoveryClientDiscoveryClientRecommendedVersion)),
})).annotate({ identifier: "DiscoveryClient" }) as any as Schema.Schema<DiscoveryClient>;

export interface ListDiscoveryClientsResponse {
  /** List of discovery clients. */
  discoveryClients?: Array<DiscoveryClient>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListDiscoveryClientsResponse: Schema.Schema<ListDiscoveryClientsResponse> = Schema.suspend(() => Schema.Struct({
  discoveryClients: Schema.optional(Schema.Array(DiscoveryClient)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListDiscoveryClientsResponse" }) as any as Schema.Schema<ListDiscoveryClientsResponse>;

export interface SendDiscoveryClientHeartbeatRequest {
  /** Optional. Client application version. */
  version?: string;
  /** Optional. Errors affecting client functionality. */
  errors?: Array<Status>;
}

export const SendDiscoveryClientHeartbeatRequest: Schema.Schema<SendDiscoveryClientHeartbeatRequest> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  errors: Schema.optional(Schema.Array(Status)),
})).annotate({ identifier: "SendDiscoveryClientHeartbeatRequest" }) as any as Schema.Schema<SendDiscoveryClientHeartbeatRequest>;

export interface Relation {
  /** Output only. Identifier. The identifier of the relation. */
  name?: string;
  /** Output only. The source asset name in the relation. */
  srcAsset?: string;
  /** Output only. The destination asset name in the relation. */
  dstAsset?: string;
  /** Optional. The type of the relation. */
  type?: "TYPE_UNSPECIFIED" | "LOGICAL_DATABASE" | "DATABASE_DEPLOYMENT_HOSTING_SERVER" | (string & {});
  /** Output only. The timestamp when the relation was created. */
  createTime?: string;
}

export const Relation: Schema.Schema<Relation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  srcAsset: Schema.optional(Schema.String),
  dstAsset: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Relation" }) as any as Schema.Schema<Relation>;

export interface ListRelationsResponse {
  /** A list of relations. */
  relations?: Array<Relation>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
}

export const ListRelationsResponse: Schema.Schema<ListRelationsResponse> = Schema.suspend(() => Schema.Struct({
  relations: Schema.optional(Schema.Array(Relation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListRelationsResponse" }) as any as Schema.Schema<ListRelationsResponse>;

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(Location)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

export interface OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface RunReportExportJobResponse {
  /** Output only. Execution status of the export operation. */
  reportExportExecution?: ReportExportExecution;
}

export const RunReportExportJobResponse: Schema.Schema<RunReportExportJobResponse> = Schema.suspend(() => Schema.Struct({
  reportExportExecution: Schema.optional(ReportExportExecution),
})).annotate({ identifier: "RunReportExportJobResponse" }) as any as Schema.Schema<RunReportExportJobResponse>;

export interface RunAssetsExportJobResponse {
  /** Output only. Execution status of the assets export operation. */
  assetsExportJobExecution?: AssetsExportJobExecution;
}

export const RunAssetsExportJobResponse: Schema.Schema<RunAssetsExportJobResponse> = Schema.suspend(() => Schema.Struct({
  assetsExportJobExecution: Schema.optional(AssetsExportJobExecution),
})).annotate({ identifier: "RunAssetsExportJobResponse" }) as any as Schema.Schema<RunAssetsExportJobResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetSettingsProjectsLocationsRequest {
  /** Required. Name of the resource. */
  name: string;
}

export const GetSettingsProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/settings" }),
  svc,
) as unknown as Schema.Schema<GetSettingsProjectsLocationsRequest>;

export type GetSettingsProjectsLocationsResponse = Settings;
export const GetSettingsProjectsLocationsResponse = Settings;

export type GetSettingsProjectsLocationsError = DefaultErrors;

/** Gets the details of regional settings. */
export const getSettingsProjectsLocations: API.OperationMethod<GetSettingsProjectsLocationsRequest, GetSettingsProjectsLocationsResponse, GetSettingsProjectsLocationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetSettingsProjectsLocationsRequest,
  output: GetSettingsProjectsLocationsResponse,
  errors: [],
}));

export interface UpdateSettingsProjectsLocationsRequest {
  /** Output only. The name of the resource. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the `Settings` resource by the update. The values specified in the `update_mask` field are relative to the resource, not the full request. A field will be overwritten if it is in the mask. A single * value in the mask lets you to overwrite all fields. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Settings;
}

export const UpdateSettingsProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Settings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/settings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSettingsProjectsLocationsRequest>;

export type UpdateSettingsProjectsLocationsResponse = Operation;
export const UpdateSettingsProjectsLocationsResponse = Operation;

export type UpdateSettingsProjectsLocationsError = DefaultErrors;

/** Updates the regional-level project settings. */
export const updateSettingsProjectsLocations: API.OperationMethod<UpdateSettingsProjectsLocationsRequest, UpdateSettingsProjectsLocationsResponse, UpdateSettingsProjectsLocationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSettingsProjectsLocationsRequest,
  output: UpdateSettingsProjectsLocationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = DefaultErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export const listProjectsLocations: API.PaginatedOperationMethod<ListProjectsLocationsRequest, ListProjectsLocationsResponse, ListProjectsLocationsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = DefaultErrors;

/** Gets information about a location. */
export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsOperations: API.PaginatedOperationMethod<ListProjectsLocationsOperationsRequest, ListProjectsLocationsOperationsResponse, ListProjectsLocationsOperationsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteProjectsLocationsOperations: API.OperationMethod<DeleteProjectsLocationsOperationsRequest, DeleteProjectsLocationsOperationsResponse, DeleteProjectsLocationsOperationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAssetsRequest {
  /** Required. Parent value for `ListAssetsRequest`. */
  parent: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Filtering results. */
  filter?: string;
  /** Field to sort by. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** View of the assets. Defaults to BASIC. */
  view?: "ASSET_VIEW_UNSPECIFIED" | "ASSET_VIEW_BASIC" | "ASSET_VIEW_FULL" | "ASSET_VIEW_STANDARD" | (string & {});
  /** Optional. When this value is set to 'true' the response will include all assets, including those that are hidden. */
  showHidden?: boolean;
}

export const ListProjectsLocationsAssetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  showHidden: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showHidden")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/assets" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAssetsRequest>;

export type ListProjectsLocationsAssetsResponse = ListAssetsResponse;
export const ListProjectsLocationsAssetsResponse = ListAssetsResponse;

export type ListProjectsLocationsAssetsError = DefaultErrors;

/** Lists all the assets in a given project and location. */
export const listProjectsLocationsAssets: API.PaginatedOperationMethod<ListProjectsLocationsAssetsRequest, ListProjectsLocationsAssetsResponse, ListProjectsLocationsAssetsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAssetsRequest,
  output: ListProjectsLocationsAssetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAssetsRequest {
  /** Required. Name of the resource. */
  name: string;
  /** View of the assets. Defaults to BASIC. */
  view?: "ASSET_VIEW_UNSPECIFIED" | "ASSET_VIEW_BASIC" | "ASSET_VIEW_FULL" | "ASSET_VIEW_STANDARD" | (string & {});
}

export const GetProjectsLocationsAssetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/assets/{assetsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAssetsRequest>;

export type GetProjectsLocationsAssetsResponse = Asset;
export const GetProjectsLocationsAssetsResponse = Asset;

export type GetProjectsLocationsAssetsError = DefaultErrors;

/** Gets the details of an asset. */
export const getProjectsLocationsAssets: API.OperationMethod<GetProjectsLocationsAssetsRequest, GetProjectsLocationsAssetsResponse, GetProjectsLocationsAssetsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAssetsRequest,
  output: GetProjectsLocationsAssetsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAssetsRequest {
  /** Output only. The full name of the asset. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the `Asset` resource by the update. The values specified in the `update_mask` field are relative to the resource, not the full request. A field will be overwritten if it is in the mask. A single * value in the mask lets you to overwrite all fields. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Asset;
}

export const PatchProjectsLocationsAssetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Asset).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/assets/{assetsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAssetsRequest>;

export type PatchProjectsLocationsAssetsResponse = Asset;
export const PatchProjectsLocationsAssetsResponse = Asset;

export type PatchProjectsLocationsAssetsError = DefaultErrors;

/** Updates the parameters of an asset. */
export const patchProjectsLocationsAssets: API.OperationMethod<PatchProjectsLocationsAssetsRequest, PatchProjectsLocationsAssetsResponse, PatchProjectsLocationsAssetsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAssetsRequest,
  output: PatchProjectsLocationsAssetsResponse,
  errors: [],
}));

export interface BatchUpdateProjectsLocationsAssetsRequest {
  /** Required. Parent value for batch asset update. */
  parent: string;
  /** Request body */
  body?: BatchUpdateAssetsRequest;
}

export const BatchUpdateProjectsLocationsAssetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchUpdateAssetsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/assets:batchUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateProjectsLocationsAssetsRequest>;

export type BatchUpdateProjectsLocationsAssetsResponse = BatchUpdateAssetsResponse;
export const BatchUpdateProjectsLocationsAssetsResponse = BatchUpdateAssetsResponse;

export type BatchUpdateProjectsLocationsAssetsError = DefaultErrors;

/** Updates the parameters of a list of assets. */
export const batchUpdateProjectsLocationsAssets: API.OperationMethod<BatchUpdateProjectsLocationsAssetsRequest, BatchUpdateProjectsLocationsAssetsResponse, BatchUpdateProjectsLocationsAssetsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateProjectsLocationsAssetsRequest,
  output: BatchUpdateProjectsLocationsAssetsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAssetsRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsAssetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/assets/{assetsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAssetsRequest>;

export type DeleteProjectsLocationsAssetsResponse = Empty;
export const DeleteProjectsLocationsAssetsResponse = Empty;

export type DeleteProjectsLocationsAssetsError = DefaultErrors;

/** Deletes an asset. */
export const deleteProjectsLocationsAssets: API.OperationMethod<DeleteProjectsLocationsAssetsRequest, DeleteProjectsLocationsAssetsResponse, DeleteProjectsLocationsAssetsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAssetsRequest,
  output: DeleteProjectsLocationsAssetsResponse,
  errors: [],
}));

export interface BatchDeleteProjectsLocationsAssetsRequest {
  /** Required. Parent value for batch asset delete. */
  parent: string;
  /** Request body */
  body?: BatchDeleteAssetsRequest;
}

export const BatchDeleteProjectsLocationsAssetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchDeleteAssetsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/assets:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteProjectsLocationsAssetsRequest>;

export type BatchDeleteProjectsLocationsAssetsResponse = Empty;
export const BatchDeleteProjectsLocationsAssetsResponse = Empty;

export type BatchDeleteProjectsLocationsAssetsError = DefaultErrors;

/** Deletes list of Assets. */
export const batchDeleteProjectsLocationsAssets: API.OperationMethod<BatchDeleteProjectsLocationsAssetsRequest, BatchDeleteProjectsLocationsAssetsResponse, BatchDeleteProjectsLocationsAssetsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteProjectsLocationsAssetsRequest,
  output: BatchDeleteProjectsLocationsAssetsResponse,
  errors: [],
}));

export interface ReportAssetFramesProjectsLocationsAssetsRequest {
  /** Required. Parent of the resource. */
  parent: string;
  /** Required. Reference to a source. */
  source?: string;
  /** Request body */
  body?: Frames;
}

export const ReportAssetFramesProjectsLocationsAssetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  body: Schema.optional(Frames).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/assets:reportAssetFrames", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReportAssetFramesProjectsLocationsAssetsRequest>;

export type ReportAssetFramesProjectsLocationsAssetsResponse = ReportAssetFramesResponse;
export const ReportAssetFramesProjectsLocationsAssetsResponse = ReportAssetFramesResponse;

export type ReportAssetFramesProjectsLocationsAssetsError = DefaultErrors;

/** Reports a set of frames. */
export const reportAssetFramesProjectsLocationsAssets: API.OperationMethod<ReportAssetFramesProjectsLocationsAssetsRequest, ReportAssetFramesProjectsLocationsAssetsResponse, ReportAssetFramesProjectsLocationsAssetsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ReportAssetFramesProjectsLocationsAssetsRequest,
  output: ReportAssetFramesProjectsLocationsAssetsResponse,
  errors: [],
}));

export interface AggregateValuesProjectsLocationsAssetsRequest {
  /** Required. Parent value for `AggregateAssetsValuesRequest`. */
  parent: string;
  /** Request body */
  body?: AggregateAssetsValuesRequest;
}

export const AggregateValuesProjectsLocationsAssetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AggregateAssetsValuesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/assets:aggregateValues", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AggregateValuesProjectsLocationsAssetsRequest>;

export type AggregateValuesProjectsLocationsAssetsResponse = AggregateAssetsValuesResponse;
export const AggregateValuesProjectsLocationsAssetsResponse = AggregateAssetsValuesResponse;

export type AggregateValuesProjectsLocationsAssetsError = DefaultErrors;

/** Aggregates the requested fields based on provided function. */
export const aggregateValuesProjectsLocationsAssets: API.OperationMethod<AggregateValuesProjectsLocationsAssetsRequest, AggregateValuesProjectsLocationsAssetsResponse, AggregateValuesProjectsLocationsAssetsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: AggregateValuesProjectsLocationsAssetsRequest,
  output: AggregateValuesProjectsLocationsAssetsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsImportJobsRequest {
  /** Required. Value for parent. */
  parent: string;
  /** Required. ID of the import job. */
  importJobId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ImportJob;
}

export const CreateProjectsLocationsImportJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  importJobId: Schema.optional(Schema.String).pipe(T.HttpQuery("importJobId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ImportJob).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/importJobs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsImportJobsRequest>;

export type CreateProjectsLocationsImportJobsResponse = Operation;
export const CreateProjectsLocationsImportJobsResponse = Operation;

export type CreateProjectsLocationsImportJobsError = DefaultErrors;

/** Creates an import job. */
export const createProjectsLocationsImportJobs: API.OperationMethod<CreateProjectsLocationsImportJobsRequest, CreateProjectsLocationsImportJobsResponse, CreateProjectsLocationsImportJobsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsImportJobsRequest,
  output: CreateProjectsLocationsImportJobsResponse,
  errors: [],
}));

export interface ListProjectsLocationsImportJobsRequest {
  /** Required. Parent value for `ListImportJobsRequest`. */
  parent: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Filtering results. */
  filter?: string;
  /** Field to sort by. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. The level of details of each import job. Default value is BASIC. */
  view?: "IMPORT_JOB_VIEW_UNSPECIFIED" | "IMPORT_JOB_VIEW_BASIC" | "IMPORT_JOB_VIEW_FULL" | (string & {});
}

export const ListProjectsLocationsImportJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/importJobs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsImportJobsRequest>;

export type ListProjectsLocationsImportJobsResponse = ListImportJobsResponse;
export const ListProjectsLocationsImportJobsResponse = ListImportJobsResponse;

export type ListProjectsLocationsImportJobsError = DefaultErrors;

/** Lists all import jobs. */
export const listProjectsLocationsImportJobs: API.PaginatedOperationMethod<ListProjectsLocationsImportJobsRequest, ListProjectsLocationsImportJobsResponse, ListProjectsLocationsImportJobsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsImportJobsRequest,
  output: ListProjectsLocationsImportJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsImportJobsRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Optional. The level of details of the import job. Default value is FULL. */
  view?: "IMPORT_JOB_VIEW_UNSPECIFIED" | "IMPORT_JOB_VIEW_BASIC" | "IMPORT_JOB_VIEW_FULL" | (string & {});
}

export const GetProjectsLocationsImportJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/importJobs/{importJobsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsImportJobsRequest>;

export type GetProjectsLocationsImportJobsResponse = ImportJob;
export const GetProjectsLocationsImportJobsResponse = ImportJob;

export type GetProjectsLocationsImportJobsError = DefaultErrors;

/** Gets the details of an import job. */
export const getProjectsLocationsImportJobs: API.OperationMethod<GetProjectsLocationsImportJobsRequest, GetProjectsLocationsImportJobsResponse, GetProjectsLocationsImportJobsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsImportJobsRequest,
  output: GetProjectsLocationsImportJobsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsImportJobsRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set to `true`, any `ImportDataFiles` of this job will also be deleted If set to `false`, the request only works if the job has no data files. */
  force?: boolean;
}

export const DeleteProjectsLocationsImportJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/importJobs/{importJobsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsImportJobsRequest>;

export type DeleteProjectsLocationsImportJobsResponse = Operation;
export const DeleteProjectsLocationsImportJobsResponse = Operation;

export type DeleteProjectsLocationsImportJobsError = DefaultErrors;

/** Deletes an import job. */
export const deleteProjectsLocationsImportJobs: API.OperationMethod<DeleteProjectsLocationsImportJobsRequest, DeleteProjectsLocationsImportJobsResponse, DeleteProjectsLocationsImportJobsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsImportJobsRequest,
  output: DeleteProjectsLocationsImportJobsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsImportJobsRequest {
  /** Output only. The full name of the import job. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the `Asset` resource by the update. The values specified in the `update_mask` field are relative to the resource, not the full request. A field will be overwritten if it is in the mask. A single * value in the mask lets you to overwrite all fields. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ImportJob;
}

export const PatchProjectsLocationsImportJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ImportJob).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/importJobs/{importJobsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsImportJobsRequest>;

export type PatchProjectsLocationsImportJobsResponse = Operation;
export const PatchProjectsLocationsImportJobsResponse = Operation;

export type PatchProjectsLocationsImportJobsError = DefaultErrors;

/** Updates an import job. */
export const patchProjectsLocationsImportJobs: API.OperationMethod<PatchProjectsLocationsImportJobsRequest, PatchProjectsLocationsImportJobsResponse, PatchProjectsLocationsImportJobsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsImportJobsRequest,
  output: PatchProjectsLocationsImportJobsResponse,
  errors: [],
}));

export interface ValidateProjectsLocationsImportJobsRequest {
  /** Required. The name of the import job to validate. */
  name: string;
  /** Request body */
  body?: ValidateImportJobRequest;
}

export const ValidateProjectsLocationsImportJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ValidateImportJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/importJobs/{importJobsId}:validate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ValidateProjectsLocationsImportJobsRequest>;

export type ValidateProjectsLocationsImportJobsResponse = Operation;
export const ValidateProjectsLocationsImportJobsResponse = Operation;

export type ValidateProjectsLocationsImportJobsError = DefaultErrors;

/** Validates an import job. */
export const validateProjectsLocationsImportJobs: API.OperationMethod<ValidateProjectsLocationsImportJobsRequest, ValidateProjectsLocationsImportJobsResponse, ValidateProjectsLocationsImportJobsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: ValidateProjectsLocationsImportJobsRequest,
  output: ValidateProjectsLocationsImportJobsResponse,
  errors: [],
}));

export interface RunProjectsLocationsImportJobsRequest {
  /** Required. The name of the import job to run. */
  name: string;
  /** Request body */
  body?: RunImportJobRequest;
}

export const RunProjectsLocationsImportJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RunImportJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/importJobs/{importJobsId}:run", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunProjectsLocationsImportJobsRequest>;

export type RunProjectsLocationsImportJobsResponse = Operation;
export const RunProjectsLocationsImportJobsResponse = Operation;

export type RunProjectsLocationsImportJobsError = DefaultErrors;

/** Runs an import job. */
export const runProjectsLocationsImportJobs: API.OperationMethod<RunProjectsLocationsImportJobsRequest, RunProjectsLocationsImportJobsResponse, RunProjectsLocationsImportJobsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: RunProjectsLocationsImportJobsRequest,
  output: RunProjectsLocationsImportJobsResponse,
  errors: [],
}));

export interface GetProjectsLocationsImportJobsImportDataFilesRequest {
  /** Required. Name of the ImportDataFile. */
  name: string;
}

export const GetProjectsLocationsImportJobsImportDataFilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/importJobs/{importJobsId}/importDataFiles/{importDataFilesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsImportJobsImportDataFilesRequest>;

export type GetProjectsLocationsImportJobsImportDataFilesResponse = ImportDataFile;
export const GetProjectsLocationsImportJobsImportDataFilesResponse = ImportDataFile;

export type GetProjectsLocationsImportJobsImportDataFilesError = DefaultErrors;

/** Gets an import data file. */
export const getProjectsLocationsImportJobsImportDataFiles: API.OperationMethod<GetProjectsLocationsImportJobsImportDataFilesRequest, GetProjectsLocationsImportJobsImportDataFilesResponse, GetProjectsLocationsImportJobsImportDataFilesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsImportJobsImportDataFilesRequest,
  output: GetProjectsLocationsImportJobsImportDataFilesResponse,
  errors: [],
}));

export interface ListProjectsLocationsImportJobsImportDataFilesRequest {
  /** Required. Name of the parent of the `ImportDataFiles` resource. */
  parent: string;
  /** The maximum number of data files to return. The service may return fewer than this value. If unspecified, at most 500 data files will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListImportDataFiles` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListImportDataFiles` must match the call that provided the page token. */
  pageToken?: string;
  /** Filtering results. */
  filter?: string;
  /** Field to sort by. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
}

export const ListProjectsLocationsImportJobsImportDataFilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/importJobs/{importJobsId}/importDataFiles" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsImportJobsImportDataFilesRequest>;

export type ListProjectsLocationsImportJobsImportDataFilesResponse = ListImportDataFilesResponse;
export const ListProjectsLocationsImportJobsImportDataFilesResponse = ListImportDataFilesResponse;

export type ListProjectsLocationsImportJobsImportDataFilesError = DefaultErrors;

/** List import data files. */
export const listProjectsLocationsImportJobsImportDataFiles: API.PaginatedOperationMethod<ListProjectsLocationsImportJobsImportDataFilesRequest, ListProjectsLocationsImportJobsImportDataFilesResponse, ListProjectsLocationsImportJobsImportDataFilesError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsImportJobsImportDataFilesRequest,
  output: ListProjectsLocationsImportJobsImportDataFilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsImportJobsImportDataFilesRequest {
  /** Required. Name of the parent of the ImportDataFile. */
  parent: string;
  /** Required. The ID of the new data file. */
  importDataFileId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ImportDataFile;
}

export const CreateProjectsLocationsImportJobsImportDataFilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  importDataFileId: Schema.optional(Schema.String).pipe(T.HttpQuery("importDataFileId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ImportDataFile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/importJobs/{importJobsId}/importDataFiles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsImportJobsImportDataFilesRequest>;

export type CreateProjectsLocationsImportJobsImportDataFilesResponse = Operation;
export const CreateProjectsLocationsImportJobsImportDataFilesResponse = Operation;

export type CreateProjectsLocationsImportJobsImportDataFilesError = DefaultErrors;

/** Creates an import data file. */
export const createProjectsLocationsImportJobsImportDataFiles: API.OperationMethod<CreateProjectsLocationsImportJobsImportDataFilesRequest, CreateProjectsLocationsImportJobsImportDataFilesResponse, CreateProjectsLocationsImportJobsImportDataFilesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsImportJobsImportDataFilesRequest,
  output: CreateProjectsLocationsImportJobsImportDataFilesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsImportJobsImportDataFilesRequest {
  /** Required. Name of the ImportDataFile to delete. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsImportJobsImportDataFilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/importJobs/{importJobsId}/importDataFiles/{importDataFilesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsImportJobsImportDataFilesRequest>;

export type DeleteProjectsLocationsImportJobsImportDataFilesResponse = Operation;
export const DeleteProjectsLocationsImportJobsImportDataFilesResponse = Operation;

export type DeleteProjectsLocationsImportJobsImportDataFilesError = DefaultErrors;

/** Delete an import data file. */
export const deleteProjectsLocationsImportJobsImportDataFiles: API.OperationMethod<DeleteProjectsLocationsImportJobsImportDataFilesRequest, DeleteProjectsLocationsImportJobsImportDataFilesResponse, DeleteProjectsLocationsImportJobsImportDataFilesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsImportJobsImportDataFilesRequest,
  output: DeleteProjectsLocationsImportJobsImportDataFilesResponse,
  errors: [],
}));

export interface ListProjectsLocationsGroupsRequest {
  /** Required. Parent value for `ListGroupsRequest`. */
  parent: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Filtering results. */
  filter?: string;
  /** Field to sort by. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
}

export const ListProjectsLocationsGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/groups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGroupsRequest>;

export type ListProjectsLocationsGroupsResponse = ListGroupsResponse;
export const ListProjectsLocationsGroupsResponse = ListGroupsResponse;

export type ListProjectsLocationsGroupsError = DefaultErrors;

/** Lists all groups in a given project and location. */
export const listProjectsLocationsGroups: API.PaginatedOperationMethod<ListProjectsLocationsGroupsRequest, ListProjectsLocationsGroupsResponse, ListProjectsLocationsGroupsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsGroupsRequest,
  output: ListProjectsLocationsGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsGroupsRequest {
  /** Required. Name of the resource. */
  name: string;
}

export const GetProjectsLocationsGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/groups/{groupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGroupsRequest>;

export type GetProjectsLocationsGroupsResponse = Group;
export const GetProjectsLocationsGroupsResponse = Group;

export type GetProjectsLocationsGroupsError = DefaultErrors;

/** Gets the details of a group. */
export const getProjectsLocationsGroups: API.OperationMethod<GetProjectsLocationsGroupsRequest, GetProjectsLocationsGroupsResponse, GetProjectsLocationsGroupsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGroupsRequest,
  output: GetProjectsLocationsGroupsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsGroupsRequest {
  /** Required. Value for parent. */
  parent: string;
  /** Required. User specified ID for the group. It will become the last component of the group name. The ID must be unique within the project, must conform with RFC-1034, is restricted to lower-cased letters, and has a maximum length of 63 characters. The ID must match the regular expression: `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`. */
  groupId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Group;
}

export const CreateProjectsLocationsGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  groupId: Schema.optional(Schema.String).pipe(T.HttpQuery("groupId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Group).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/groups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsGroupsRequest>;

export type CreateProjectsLocationsGroupsResponse = Operation;
export const CreateProjectsLocationsGroupsResponse = Operation;

export type CreateProjectsLocationsGroupsError = DefaultErrors;

/** Creates a new group in a given project and location. */
export const createProjectsLocationsGroups: API.OperationMethod<CreateProjectsLocationsGroupsRequest, CreateProjectsLocationsGroupsResponse, CreateProjectsLocationsGroupsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsGroupsRequest,
  output: CreateProjectsLocationsGroupsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsGroupsRequest {
  /** Output only. The name of the group. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the `Group` resource by the update. The values specified in the `update_mask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. A single * value in the mask lets you to overwrite all fields. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Group;
}

export const PatchProjectsLocationsGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Group).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/groups/{groupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsGroupsRequest>;

export type PatchProjectsLocationsGroupsResponse = Operation;
export const PatchProjectsLocationsGroupsResponse = Operation;

export type PatchProjectsLocationsGroupsError = DefaultErrors;

/** Updates the parameters of a group. */
export const patchProjectsLocationsGroups: API.OperationMethod<PatchProjectsLocationsGroupsRequest, PatchProjectsLocationsGroupsResponse, PatchProjectsLocationsGroupsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsGroupsRequest,
  output: PatchProjectsLocationsGroupsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsGroupsRequest {
  /** Required. Name of the group resource. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/groups/{groupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGroupsRequest>;

export type DeleteProjectsLocationsGroupsResponse = Operation;
export const DeleteProjectsLocationsGroupsResponse = Operation;

export type DeleteProjectsLocationsGroupsError = DefaultErrors;

/** Deletes a group. */
export const deleteProjectsLocationsGroups: API.OperationMethod<DeleteProjectsLocationsGroupsRequest, DeleteProjectsLocationsGroupsResponse, DeleteProjectsLocationsGroupsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsGroupsRequest,
  output: DeleteProjectsLocationsGroupsResponse,
  errors: [],
}));

export interface AddAssetsProjectsLocationsGroupsRequest {
  /** Required. Group reference. */
  group: string;
  /** Request body */
  body?: AddAssetsToGroupRequest;
}

export const AddAssetsProjectsLocationsGroupsRequest = Schema.Struct({
  group: Schema.String.pipe(T.HttpPath("group")),
  body: Schema.optional(AddAssetsToGroupRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/groups/{groupsId}:addAssets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddAssetsProjectsLocationsGroupsRequest>;

export type AddAssetsProjectsLocationsGroupsResponse = Operation;
export const AddAssetsProjectsLocationsGroupsResponse = Operation;

export type AddAssetsProjectsLocationsGroupsError = DefaultErrors;

/** Adds assets to a group. */
export const addAssetsProjectsLocationsGroups: API.OperationMethod<AddAssetsProjectsLocationsGroupsRequest, AddAssetsProjectsLocationsGroupsResponse, AddAssetsProjectsLocationsGroupsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: AddAssetsProjectsLocationsGroupsRequest,
  output: AddAssetsProjectsLocationsGroupsResponse,
  errors: [],
}));

export interface RemoveAssetsProjectsLocationsGroupsRequest {
  /** Required. Group reference. */
  group: string;
  /** Request body */
  body?: RemoveAssetsFromGroupRequest;
}

export const RemoveAssetsProjectsLocationsGroupsRequest = Schema.Struct({
  group: Schema.String.pipe(T.HttpPath("group")),
  body: Schema.optional(RemoveAssetsFromGroupRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/groups/{groupsId}:removeAssets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveAssetsProjectsLocationsGroupsRequest>;

export type RemoveAssetsProjectsLocationsGroupsResponse = Operation;
export const RemoveAssetsProjectsLocationsGroupsResponse = Operation;

export type RemoveAssetsProjectsLocationsGroupsError = DefaultErrors;

/** Removes assets from a group. */
export const removeAssetsProjectsLocationsGroups: API.OperationMethod<RemoveAssetsProjectsLocationsGroupsRequest, RemoveAssetsProjectsLocationsGroupsResponse, RemoveAssetsProjectsLocationsGroupsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveAssetsProjectsLocationsGroupsRequest,
  output: RemoveAssetsProjectsLocationsGroupsResponse,
  errors: [],
}));

export interface ListProjectsLocationsSourcesRequest {
  /** Required. Parent value for `ListSourcesRequest`. */
  parent: string;
  /** Requested page size. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default value. */
  pageSize?: number;
  /** A token identifying a page of results that the server should return. */
  pageToken?: string;
  /** Filtering results. */
  filter?: string;
  /** Field to sort by. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
}

export const ListProjectsLocationsSourcesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSourcesRequest>;

export type ListProjectsLocationsSourcesResponse = ListSourcesResponse;
export const ListProjectsLocationsSourcesResponse = ListSourcesResponse;

export type ListProjectsLocationsSourcesError = DefaultErrors;

/** Lists all the sources in a given project and location. */
export const listProjectsLocationsSources: API.PaginatedOperationMethod<ListProjectsLocationsSourcesRequest, ListProjectsLocationsSourcesResponse, ListProjectsLocationsSourcesError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsSourcesRequest,
  output: ListProjectsLocationsSourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsSourcesRequest {
  /** Required. Name of the resource. */
  name: string;
}

export const GetProjectsLocationsSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSourcesRequest>;

export type GetProjectsLocationsSourcesResponse = Source;
export const GetProjectsLocationsSourcesResponse = Source;

export type GetProjectsLocationsSourcesError = DefaultErrors;

/** Gets the details of a source. */
export const getProjectsLocationsSources: API.OperationMethod<GetProjectsLocationsSourcesRequest, GetProjectsLocationsSourcesResponse, GetProjectsLocationsSourcesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSourcesRequest,
  output: GetProjectsLocationsSourcesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsSourcesRequest {
  /** Required. Value for parent. */
  parent: string;
  /** Required. User specified ID for the source. It will become the last component of the source name. The ID must be unique within the project, must conform with RFC-1034, is restricted to lower-cased letters, and has a maximum length of 63 characters. The ID must match the regular expression: `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`. */
  sourceId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Source;
}

export const CreateProjectsLocationsSourcesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  sourceId: Schema.optional(Schema.String).pipe(T.HttpQuery("sourceId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Source).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsSourcesRequest>;

export type CreateProjectsLocationsSourcesResponse = Operation;
export const CreateProjectsLocationsSourcesResponse = Operation;

export type CreateProjectsLocationsSourcesError = DefaultErrors;

/** Creates a new source in a given project and location. */
export const createProjectsLocationsSources: API.OperationMethod<CreateProjectsLocationsSourcesRequest, CreateProjectsLocationsSourcesResponse, CreateProjectsLocationsSourcesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsSourcesRequest,
  output: CreateProjectsLocationsSourcesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsSourcesRequest {
  /** Output only. The full name of the source. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the `Source` resource by the update. The values specified in the `update_mask` field are relative to the resource, not the full request. A field will be overwritten if it is in the mask. A single * value in the mask lets you to overwrite all fields. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Source;
}

export const PatchProjectsLocationsSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Source).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsSourcesRequest>;

export type PatchProjectsLocationsSourcesResponse = Operation;
export const PatchProjectsLocationsSourcesResponse = Operation;

export type PatchProjectsLocationsSourcesError = DefaultErrors;

/** Updates the parameters of a source. */
export const patchProjectsLocationsSources: API.OperationMethod<PatchProjectsLocationsSourcesRequest, PatchProjectsLocationsSourcesResponse, PatchProjectsLocationsSourcesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsSourcesRequest,
  output: PatchProjectsLocationsSourcesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsSourcesRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSourcesRequest>;

export type DeleteProjectsLocationsSourcesResponse = Operation;
export const DeleteProjectsLocationsSourcesResponse = Operation;

export type DeleteProjectsLocationsSourcesError = DefaultErrors;

/** Deletes a source. */
export const deleteProjectsLocationsSources: API.OperationMethod<DeleteProjectsLocationsSourcesRequest, DeleteProjectsLocationsSourcesResponse, DeleteProjectsLocationsSourcesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSourcesRequest,
  output: DeleteProjectsLocationsSourcesResponse,
  errors: [],
}));

export interface ListProjectsLocationsSourcesErrorFramesRequest {
  /** Required. Parent value (the source) for `ListErrorFramesRequest`. */
  parent: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. An optional view mode to control the level of details of each error frame. The default is a BASIC frame view. */
  view?: "ERROR_FRAME_VIEW_UNSPECIFIED" | "ERROR_FRAME_VIEW_BASIC" | "ERROR_FRAME_VIEW_FULL" | (string & {});
}

export const ListProjectsLocationsSourcesErrorFramesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/errorFrames" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSourcesErrorFramesRequest>;

export type ListProjectsLocationsSourcesErrorFramesResponse = ListErrorFramesResponse;
export const ListProjectsLocationsSourcesErrorFramesResponse = ListErrorFramesResponse;

export type ListProjectsLocationsSourcesErrorFramesError = DefaultErrors;

/** Lists all error frames in a given source and location. */
export const listProjectsLocationsSourcesErrorFrames: API.PaginatedOperationMethod<ListProjectsLocationsSourcesErrorFramesRequest, ListProjectsLocationsSourcesErrorFramesResponse, ListProjectsLocationsSourcesErrorFramesError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsSourcesErrorFramesRequest,
  output: ListProjectsLocationsSourcesErrorFramesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsSourcesErrorFramesRequest {
  /** Required. The name of the frame to retrieve. Format: projects/{project}/locations/{location}/sources/{source}/errorFrames/{error_frame} */
  name: string;
  /** Optional. An optional view mode to control the level of details for the frame. The default is a basic frame view. */
  view?: "ERROR_FRAME_VIEW_UNSPECIFIED" | "ERROR_FRAME_VIEW_BASIC" | "ERROR_FRAME_VIEW_FULL" | (string & {});
}

export const GetProjectsLocationsSourcesErrorFramesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/errorFrames/{errorFramesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSourcesErrorFramesRequest>;

export type GetProjectsLocationsSourcesErrorFramesResponse = ErrorFrame;
export const GetProjectsLocationsSourcesErrorFramesResponse = ErrorFrame;

export type GetProjectsLocationsSourcesErrorFramesError = DefaultErrors;

/** Gets the details of an error frame. */
export const getProjectsLocationsSourcesErrorFrames: API.OperationMethod<GetProjectsLocationsSourcesErrorFramesRequest, GetProjectsLocationsSourcesErrorFramesResponse, GetProjectsLocationsSourcesErrorFramesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSourcesErrorFramesRequest,
  output: GetProjectsLocationsSourcesErrorFramesResponse,
  errors: [],
}));

export interface ListProjectsLocationsPreferenceSetsRequest {
  /** Required. Parent value for `ListPreferenceSetsRequest`. */
  parent: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, at most 500 preference sets will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Field to sort by. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
}

export const ListProjectsLocationsPreferenceSetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/preferenceSets" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPreferenceSetsRequest>;

export type ListProjectsLocationsPreferenceSetsResponse = ListPreferenceSetsResponse;
export const ListProjectsLocationsPreferenceSetsResponse = ListPreferenceSetsResponse;

export type ListProjectsLocationsPreferenceSetsError = DefaultErrors;

/** Lists all the preference sets in a given project and location. */
export const listProjectsLocationsPreferenceSets: API.PaginatedOperationMethod<ListProjectsLocationsPreferenceSetsRequest, ListProjectsLocationsPreferenceSetsResponse, ListProjectsLocationsPreferenceSetsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsPreferenceSetsRequest,
  output: ListProjectsLocationsPreferenceSetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsPreferenceSetsRequest {
  /** Required. Name of the resource. */
  name: string;
}

export const GetProjectsLocationsPreferenceSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/preferenceSets/{preferenceSetsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsPreferenceSetsRequest>;

export type GetProjectsLocationsPreferenceSetsResponse = PreferenceSet;
export const GetProjectsLocationsPreferenceSetsResponse = PreferenceSet;

export type GetProjectsLocationsPreferenceSetsError = DefaultErrors;

/** Gets the details of a preference set. */
export const getProjectsLocationsPreferenceSets: API.OperationMethod<GetProjectsLocationsPreferenceSetsRequest, GetProjectsLocationsPreferenceSetsResponse, GetProjectsLocationsPreferenceSetsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsPreferenceSetsRequest,
  output: GetProjectsLocationsPreferenceSetsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsPreferenceSetsRequest {
  /** Required. Value for parent. */
  parent: string;
  preferenceSetId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: PreferenceSet;
}

export const CreateProjectsLocationsPreferenceSetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  preferenceSetId: Schema.optional(Schema.String).pipe(T.HttpQuery("preferenceSetId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(PreferenceSet).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/preferenceSets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsPreferenceSetsRequest>;

export type CreateProjectsLocationsPreferenceSetsResponse = Operation;
export const CreateProjectsLocationsPreferenceSetsResponse = Operation;

export type CreateProjectsLocationsPreferenceSetsError = DefaultErrors;

/** Creates a new preference set in a given project and location. */
export const createProjectsLocationsPreferenceSets: API.OperationMethod<CreateProjectsLocationsPreferenceSetsRequest, CreateProjectsLocationsPreferenceSetsResponse, CreateProjectsLocationsPreferenceSetsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsPreferenceSetsRequest,
  output: CreateProjectsLocationsPreferenceSetsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsPreferenceSetsRequest {
  /** Output only. Name of the PreferenceSet. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the `PreferenceSet` resource by the update. The values specified in the `update_mask` field are relative to the resource, not the full request. A field will be overwritten if it is in the mask. A single * value in the mask lets you to overwrite all fields. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: PreferenceSet;
}

export const PatchProjectsLocationsPreferenceSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(PreferenceSet).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/preferenceSets/{preferenceSetsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsPreferenceSetsRequest>;

export type PatchProjectsLocationsPreferenceSetsResponse = Operation;
export const PatchProjectsLocationsPreferenceSetsResponse = Operation;

export type PatchProjectsLocationsPreferenceSetsError = DefaultErrors;

/** Updates the parameters of a preference set. */
export const patchProjectsLocationsPreferenceSets: API.OperationMethod<PatchProjectsLocationsPreferenceSetsRequest, PatchProjectsLocationsPreferenceSetsResponse, PatchProjectsLocationsPreferenceSetsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsPreferenceSetsRequest,
  output: PatchProjectsLocationsPreferenceSetsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsPreferenceSetsRequest {
  /** Required. Name of the group resource. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsPreferenceSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/preferenceSets/{preferenceSetsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsPreferenceSetsRequest>;

export type DeleteProjectsLocationsPreferenceSetsResponse = Operation;
export const DeleteProjectsLocationsPreferenceSetsResponse = Operation;

export type DeleteProjectsLocationsPreferenceSetsError = DefaultErrors;

/** Deletes a preference set. */
export const deleteProjectsLocationsPreferenceSets: API.OperationMethod<DeleteProjectsLocationsPreferenceSetsRequest, DeleteProjectsLocationsPreferenceSetsResponse, DeleteProjectsLocationsPreferenceSetsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsPreferenceSetsRequest,
  output: DeleteProjectsLocationsPreferenceSetsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsReportConfigsRequest {
  /** Required. Value for parent. */
  parent: string;
  /** Required. User specified ID for the report config. It will become the last component of the report config name. The ID must be unique within the project, must conform with RFC-1034, is restricted to lower-cased letters, and has a maximum length of 63 characters. The ID must match the regular expression: [a-z]([a-z0-9-]{0,61}[a-z0-9])?. */
  reportConfigId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ReportConfig;
}

export const CreateProjectsLocationsReportConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  reportConfigId: Schema.optional(Schema.String).pipe(T.HttpQuery("reportConfigId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ReportConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/reportConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsReportConfigsRequest>;

export type CreateProjectsLocationsReportConfigsResponse = Operation;
export const CreateProjectsLocationsReportConfigsResponse = Operation;

export type CreateProjectsLocationsReportConfigsError = DefaultErrors;

/** Creates a report configuration. */
export const createProjectsLocationsReportConfigs: API.OperationMethod<CreateProjectsLocationsReportConfigsRequest, CreateProjectsLocationsReportConfigsResponse, CreateProjectsLocationsReportConfigsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsReportConfigsRequest,
  output: CreateProjectsLocationsReportConfigsResponse,
  errors: [],
}));

export interface GetProjectsLocationsReportConfigsRequest {
  /** Required. Name of the resource. */
  name: string;
}

export const GetProjectsLocationsReportConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/reportConfigs/{reportConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsReportConfigsRequest>;

export type GetProjectsLocationsReportConfigsResponse = ReportConfig;
export const GetProjectsLocationsReportConfigsResponse = ReportConfig;

export type GetProjectsLocationsReportConfigsError = DefaultErrors;

/** Gets details of a single ReportConfig. */
export const getProjectsLocationsReportConfigs: API.OperationMethod<GetProjectsLocationsReportConfigsRequest, GetProjectsLocationsReportConfigsResponse, GetProjectsLocationsReportConfigsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsReportConfigsRequest,
  output: GetProjectsLocationsReportConfigsResponse,
  errors: [],
}));

export interface ListProjectsLocationsReportConfigsRequest {
  /** Required. Parent value for `ListReportConfigsRequest`. */
  parent: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Filtering results. */
  filter?: string;
  /** Field to sort by. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
}

export const ListProjectsLocationsReportConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/reportConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsReportConfigsRequest>;

export type ListProjectsLocationsReportConfigsResponse = ListReportConfigsResponse;
export const ListProjectsLocationsReportConfigsResponse = ListReportConfigsResponse;

export type ListProjectsLocationsReportConfigsError = DefaultErrors;

/** Lists ReportConfigs in a given project and location. */
export const listProjectsLocationsReportConfigs: API.PaginatedOperationMethod<ListProjectsLocationsReportConfigsRequest, ListProjectsLocationsReportConfigsResponse, ListProjectsLocationsReportConfigsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsReportConfigsRequest,
  output: ListProjectsLocationsReportConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsReportConfigsRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set to `true`, any child `Reports` of this entity will also be deleted. If set to `false`, the request only works if the resource has no children. */
  force?: boolean;
}

export const DeleteProjectsLocationsReportConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/reportConfigs/{reportConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsReportConfigsRequest>;

export type DeleteProjectsLocationsReportConfigsResponse = Operation;
export const DeleteProjectsLocationsReportConfigsResponse = Operation;

export type DeleteProjectsLocationsReportConfigsError = DefaultErrors;

/** Deletes a ReportConfig. */
export const deleteProjectsLocationsReportConfigs: API.OperationMethod<DeleteProjectsLocationsReportConfigsRequest, DeleteProjectsLocationsReportConfigsResponse, DeleteProjectsLocationsReportConfigsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsReportConfigsRequest,
  output: DeleteProjectsLocationsReportConfigsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsReportConfigsReportsRequest {
  /** Required. Value for parent. */
  parent: string;
  /** Required. User specified id for the report. It will become the last component of the report name. The id must be unique within the project, must conform with RFC-1034, is restricted to lower-cased letters, and has a maximum length of 63 characters. The id must match the regular expression: [a-z]([a-z0-9-]{0,61}[a-z0-9])?. */
  reportId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Report;
}

export const CreateProjectsLocationsReportConfigsReportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  reportId: Schema.optional(Schema.String).pipe(T.HttpQuery("reportId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Report).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/reportConfigs/{reportConfigsId}/reports", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsReportConfigsReportsRequest>;

export type CreateProjectsLocationsReportConfigsReportsResponse = Operation;
export const CreateProjectsLocationsReportConfigsReportsResponse = Operation;

export type CreateProjectsLocationsReportConfigsReportsError = DefaultErrors;

/** Creates a report. */
export const createProjectsLocationsReportConfigsReports: API.OperationMethod<CreateProjectsLocationsReportConfigsReportsRequest, CreateProjectsLocationsReportConfigsReportsResponse, CreateProjectsLocationsReportConfigsReportsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsReportConfigsReportsRequest,
  output: CreateProjectsLocationsReportConfigsReportsResponse,
  errors: [],
}));

export interface GetProjectsLocationsReportConfigsReportsRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Determines what information to retrieve for the Report. */
  view?: "REPORT_VIEW_UNSPECIFIED" | "REPORT_VIEW_BASIC" | "REPORT_VIEW_FULL" | "REPORT_VIEW_STANDARD" | (string & {});
}

export const GetProjectsLocationsReportConfigsReportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/reportConfigs/{reportConfigsId}/reports/{reportsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsReportConfigsReportsRequest>;

export type GetProjectsLocationsReportConfigsReportsResponse = Report;
export const GetProjectsLocationsReportConfigsReportsResponse = Report;

export type GetProjectsLocationsReportConfigsReportsError = DefaultErrors;

/** Gets details of a single Report. */
export const getProjectsLocationsReportConfigsReports: API.OperationMethod<GetProjectsLocationsReportConfigsReportsRequest, GetProjectsLocationsReportConfigsReportsResponse, GetProjectsLocationsReportConfigsReportsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsReportConfigsReportsRequest,
  output: GetProjectsLocationsReportConfigsReportsResponse,
  errors: [],
}));

export interface ListProjectsLocationsReportConfigsReportsRequest {
  /** Required. Parent value for `ListReportsRequest`. */
  parent: string;
  /** Requested page size. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default value. */
  pageSize?: number;
  /** A token identifying a page of results that the server should return. */
  pageToken?: string;
  /** Filtering results. */
  filter?: string;
  /** Field to sort by. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Determines what information to retrieve for each Report. */
  view?: "REPORT_VIEW_UNSPECIFIED" | "REPORT_VIEW_BASIC" | "REPORT_VIEW_FULL" | "REPORT_VIEW_STANDARD" | (string & {});
}

export const ListProjectsLocationsReportConfigsReportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/reportConfigs/{reportConfigsId}/reports" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsReportConfigsReportsRequest>;

export type ListProjectsLocationsReportConfigsReportsResponse = ListReportsResponse;
export const ListProjectsLocationsReportConfigsReportsResponse = ListReportsResponse;

export type ListProjectsLocationsReportConfigsReportsError = DefaultErrors;

/** Lists Reports in a given ReportConfig. */
export const listProjectsLocationsReportConfigsReports: API.PaginatedOperationMethod<ListProjectsLocationsReportConfigsReportsRequest, ListProjectsLocationsReportConfigsReportsResponse, ListProjectsLocationsReportConfigsReportsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsReportConfigsReportsRequest,
  output: ListProjectsLocationsReportConfigsReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsReportConfigsReportsRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsReportConfigsReportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/reportConfigs/{reportConfigsId}/reports/{reportsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsReportConfigsReportsRequest>;

export type DeleteProjectsLocationsReportConfigsReportsResponse = Operation;
export const DeleteProjectsLocationsReportConfigsReportsResponse = Operation;

export type DeleteProjectsLocationsReportConfigsReportsError = DefaultErrors;

/** Deletes a Report. */
export const deleteProjectsLocationsReportConfigsReports: API.OperationMethod<DeleteProjectsLocationsReportConfigsReportsRequest, DeleteProjectsLocationsReportConfigsReportsResponse, DeleteProjectsLocationsReportConfigsReportsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsReportConfigsReportsRequest,
  output: DeleteProjectsLocationsReportConfigsReportsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsReportConfigsReportsReportExportJobsRequest {
  /** Required. The parent resource where this export job will be created. */
  parent: string;
  /** Required. The ID to use for the report export job. */
  reportExportJobId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ReportExportJob;
}

export const CreateProjectsLocationsReportConfigsReportsReportExportJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  reportExportJobId: Schema.optional(Schema.String).pipe(T.HttpQuery("reportExportJobId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ReportExportJob).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/reportConfigs/{reportConfigsId}/reports/{reportsId}/reportExportJobs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsReportConfigsReportsReportExportJobsRequest>;

export type CreateProjectsLocationsReportConfigsReportsReportExportJobsResponse = Operation;
export const CreateProjectsLocationsReportConfigsReportsReportExportJobsResponse = Operation;

export type CreateProjectsLocationsReportConfigsReportsReportExportJobsError = DefaultErrors;

/** Export a Report into a supported destination. */
export const createProjectsLocationsReportConfigsReportsReportExportJobs: API.OperationMethod<CreateProjectsLocationsReportConfigsReportsReportExportJobsRequest, CreateProjectsLocationsReportConfigsReportsReportExportJobsResponse, CreateProjectsLocationsReportConfigsReportsReportExportJobsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsReportConfigsReportsReportExportJobsRequest,
  output: CreateProjectsLocationsReportConfigsReportsReportExportJobsResponse,
  errors: [],
}));

export interface GetProjectsLocationsReportConfigsReportsReportExportJobsRequest {
  /** Required. Name of the resource. */
  name: string;
}

export const GetProjectsLocationsReportConfigsReportsReportExportJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/reportConfigs/{reportConfigsId}/reports/{reportsId}/reportExportJobs/{reportExportJobsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsReportConfigsReportsReportExportJobsRequest>;

export type GetProjectsLocationsReportConfigsReportsReportExportJobsResponse = ReportExportJob;
export const GetProjectsLocationsReportConfigsReportsReportExportJobsResponse = ReportExportJob;

export type GetProjectsLocationsReportConfigsReportsReportExportJobsError = DefaultErrors;

/** Gets the details of a report export job. */
export const getProjectsLocationsReportConfigsReportsReportExportJobs: API.OperationMethod<GetProjectsLocationsReportConfigsReportsReportExportJobsRequest, GetProjectsLocationsReportConfigsReportsReportExportJobsResponse, GetProjectsLocationsReportConfigsReportsReportExportJobsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsReportConfigsReportsReportExportJobsRequest,
  output: GetProjectsLocationsReportConfigsReportsReportExportJobsResponse,
  errors: [],
}));

export interface ListProjectsLocationsReportConfigsReportsReportExportJobsRequest {
  /** Required. Parent report owning the export jobs. */
  parent: string;
  /** Optional. Requested page size. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default value. */
  pageSize?: number;
  /** Optional. A token identifying a page of results that the server should return. */
  pageToken?: string;
}

export const ListProjectsLocationsReportConfigsReportsReportExportJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/reportConfigs/{reportConfigsId}/reports/{reportsId}/reportExportJobs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsReportConfigsReportsReportExportJobsRequest>;

export type ListProjectsLocationsReportConfigsReportsReportExportJobsResponse = ListReportExportJobsResponse;
export const ListProjectsLocationsReportConfigsReportsReportExportJobsResponse = ListReportExportJobsResponse;

export type ListProjectsLocationsReportConfigsReportsReportExportJobsError = DefaultErrors;

/** Lists all the report export jobs for a given report. */
export const listProjectsLocationsReportConfigsReportsReportExportJobs: API.PaginatedOperationMethod<ListProjectsLocationsReportConfigsReportsReportExportJobsRequest, ListProjectsLocationsReportConfigsReportsReportExportJobsResponse, ListProjectsLocationsReportConfigsReportsReportExportJobsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsReportConfigsReportsReportExportJobsRequest,
  output: ListProjectsLocationsReportConfigsReportsReportExportJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsReportConfigsReportsReportExportJobsRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsReportConfigsReportsReportExportJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/reportConfigs/{reportConfigsId}/reports/{reportsId}/reportExportJobs/{reportExportJobsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsReportConfigsReportsReportExportJobsRequest>;

export type DeleteProjectsLocationsReportConfigsReportsReportExportJobsResponse = Operation;
export const DeleteProjectsLocationsReportConfigsReportsReportExportJobsResponse = Operation;

export type DeleteProjectsLocationsReportConfigsReportsReportExportJobsError = DefaultErrors;

/** Deletes an report export job. */
export const deleteProjectsLocationsReportConfigsReportsReportExportJobs: API.OperationMethod<DeleteProjectsLocationsReportConfigsReportsReportExportJobsRequest, DeleteProjectsLocationsReportConfigsReportsReportExportJobsResponse, DeleteProjectsLocationsReportConfigsReportsReportExportJobsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsReportConfigsReportsReportExportJobsRequest,
  output: DeleteProjectsLocationsReportConfigsReportsReportExportJobsResponse,
  errors: [],
}));

export interface RunProjectsLocationsReportConfigsReportsReportExportJobsRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Request body */
  body?: RunReportExportJobRequest;
}

export const RunProjectsLocationsReportConfigsReportsReportExportJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RunReportExportJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/reportConfigs/{reportConfigsId}/reports/{reportsId}/reportExportJobs/{reportExportJobsId}:run", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunProjectsLocationsReportConfigsReportsReportExportJobsRequest>;

export type RunProjectsLocationsReportConfigsReportsReportExportJobsResponse = Operation;
export const RunProjectsLocationsReportConfigsReportsReportExportJobsResponse = Operation;

export type RunProjectsLocationsReportConfigsReportsReportExportJobsError = DefaultErrors;

/** Runs a report export job. */
export const runProjectsLocationsReportConfigsReportsReportExportJobs: API.OperationMethod<RunProjectsLocationsReportConfigsReportsReportExportJobsRequest, RunProjectsLocationsReportConfigsReportsReportExportJobsResponse, RunProjectsLocationsReportConfigsReportsReportExportJobsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: RunProjectsLocationsReportConfigsReportsReportExportJobsRequest,
  output: RunProjectsLocationsReportConfigsReportsReportExportJobsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAssetsExportJobsRequest {
  /** Required. The parent resource where the assts export job will be created. */
  parent: string;
  /** Required. The ID to use for the asset export job. */
  assetsExportJobId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: AssetsExportJob;
}

export const CreateProjectsLocationsAssetsExportJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  assetsExportJobId: Schema.optional(Schema.String).pipe(T.HttpQuery("assetsExportJobId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(AssetsExportJob).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/assetsExportJobs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAssetsExportJobsRequest>;

export type CreateProjectsLocationsAssetsExportJobsResponse = Operation;
export const CreateProjectsLocationsAssetsExportJobsResponse = Operation;

export type CreateProjectsLocationsAssetsExportJobsError = DefaultErrors;

/** Creates a new assets export job. */
export const createProjectsLocationsAssetsExportJobs: API.OperationMethod<CreateProjectsLocationsAssetsExportJobsRequest, CreateProjectsLocationsAssetsExportJobsResponse, CreateProjectsLocationsAssetsExportJobsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAssetsExportJobsRequest,
  output: CreateProjectsLocationsAssetsExportJobsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAssetsExportJobsRequest {
  /** Required. Name of the resource. */
  name: string;
}

export const GetProjectsLocationsAssetsExportJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/assetsExportJobs/{assetsExportJobsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAssetsExportJobsRequest>;

export type GetProjectsLocationsAssetsExportJobsResponse = AssetsExportJob;
export const GetProjectsLocationsAssetsExportJobsResponse = AssetsExportJob;

export type GetProjectsLocationsAssetsExportJobsError = DefaultErrors;

/** Gets the details of an assets export job. */
export const getProjectsLocationsAssetsExportJobs: API.OperationMethod<GetProjectsLocationsAssetsExportJobsRequest, GetProjectsLocationsAssetsExportJobsResponse, GetProjectsLocationsAssetsExportJobsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAssetsExportJobsRequest,
  output: GetProjectsLocationsAssetsExportJobsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAssetsExportJobsRequest {
  /** Required. Parent resource. */
  parent: string;
  /** Optional. Requested page size. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default value. */
  pageSize?: number;
  /** Optional. A token identifying a page of results that the server should return. */
  pageToken?: string;
}

export const ListProjectsLocationsAssetsExportJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/assetsExportJobs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAssetsExportJobsRequest>;

export type ListProjectsLocationsAssetsExportJobsResponse = ListAssetsExportJobsResponse;
export const ListProjectsLocationsAssetsExportJobsResponse = ListAssetsExportJobsResponse;

export type ListProjectsLocationsAssetsExportJobsError = DefaultErrors;

/** Lists all the assets export jobs in a given project and location. */
export const listProjectsLocationsAssetsExportJobs: API.PaginatedOperationMethod<ListProjectsLocationsAssetsExportJobsRequest, ListProjectsLocationsAssetsExportJobsResponse, ListProjectsLocationsAssetsExportJobsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAssetsExportJobsRequest,
  output: ListProjectsLocationsAssetsExportJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsAssetsExportJobsRequest {
  /** Required. The name of the assets export job to delete. */
  name: string;
}

export const DeleteProjectsLocationsAssetsExportJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/assetsExportJobs/{assetsExportJobsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAssetsExportJobsRequest>;

export type DeleteProjectsLocationsAssetsExportJobsResponse = Operation;
export const DeleteProjectsLocationsAssetsExportJobsResponse = Operation;

export type DeleteProjectsLocationsAssetsExportJobsError = DefaultErrors;

/** Deletes an assets export job. */
export const deleteProjectsLocationsAssetsExportJobs: API.OperationMethod<DeleteProjectsLocationsAssetsExportJobsRequest, DeleteProjectsLocationsAssetsExportJobsResponse, DeleteProjectsLocationsAssetsExportJobsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAssetsExportJobsRequest,
  output: DeleteProjectsLocationsAssetsExportJobsResponse,
  errors: [],
}));

export interface RunProjectsLocationsAssetsExportJobsRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Request body */
  body?: RunAssetsExportJobRequest;
}

export const RunProjectsLocationsAssetsExportJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RunAssetsExportJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/assetsExportJobs/{assetsExportJobsId}:run", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunProjectsLocationsAssetsExportJobsRequest>;

export type RunProjectsLocationsAssetsExportJobsResponse = Operation;
export const RunProjectsLocationsAssetsExportJobsResponse = Operation;

export type RunProjectsLocationsAssetsExportJobsError = DefaultErrors;

/** Runs an assets export job, returning an AssetsExportJobExecution. */
export const runProjectsLocationsAssetsExportJobs: API.OperationMethod<RunProjectsLocationsAssetsExportJobsRequest, RunProjectsLocationsAssetsExportJobsResponse, RunProjectsLocationsAssetsExportJobsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: RunProjectsLocationsAssetsExportJobsRequest,
  output: RunProjectsLocationsAssetsExportJobsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsDiscoveryClientsRequest {
  /** Required. Parent resource. */
  parent: string;
  /** Required. User specified ID for the discovery client. It will become the last component of the discovery client name. The ID must be unique within the project, is restricted to lower-cased letters and has a maximum length of 63 characters. The ID must match the regular expression: `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`. */
  discoveryClientId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: DiscoveryClient;
}

export const CreateProjectsLocationsDiscoveryClientsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  discoveryClientId: Schema.optional(Schema.String).pipe(T.HttpQuery("discoveryClientId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(DiscoveryClient).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/discoveryClients", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDiscoveryClientsRequest>;

export type CreateProjectsLocationsDiscoveryClientsResponse = Operation;
export const CreateProjectsLocationsDiscoveryClientsResponse = Operation;

export type CreateProjectsLocationsDiscoveryClientsError = DefaultErrors;

/** Creates a new discovery client. */
export const createProjectsLocationsDiscoveryClients: API.OperationMethod<CreateProjectsLocationsDiscoveryClientsRequest, CreateProjectsLocationsDiscoveryClientsResponse, CreateProjectsLocationsDiscoveryClientsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDiscoveryClientsRequest,
  output: CreateProjectsLocationsDiscoveryClientsResponse,
  errors: [],
}));

export interface GetProjectsLocationsDiscoveryClientsRequest {
  /** Required. The discovery client name. */
  name: string;
}

export const GetProjectsLocationsDiscoveryClientsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/discoveryClients/{discoveryClientsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDiscoveryClientsRequest>;

export type GetProjectsLocationsDiscoveryClientsResponse = DiscoveryClient;
export const GetProjectsLocationsDiscoveryClientsResponse = DiscoveryClient;

export type GetProjectsLocationsDiscoveryClientsError = DefaultErrors;

/** Gets the details of a discovery client. */
export const getProjectsLocationsDiscoveryClients: API.OperationMethod<GetProjectsLocationsDiscoveryClientsRequest, GetProjectsLocationsDiscoveryClientsResponse, GetProjectsLocationsDiscoveryClientsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDiscoveryClientsRequest,
  output: GetProjectsLocationsDiscoveryClientsResponse,
  errors: [],
}));

export interface ListProjectsLocationsDiscoveryClientsRequest {
  /** Required. Parent resource. */
  parent: string;
  /** Optional. The maximum number of items to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default value. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListDiscoveryClients` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDiscoveryClients` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Filter expression to filter results by. */
  filter?: string;
  /** Optional. Field to sort by. */
  orderBy?: string;
}

export const ListProjectsLocationsDiscoveryClientsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/discoveryClients" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDiscoveryClientsRequest>;

export type ListProjectsLocationsDiscoveryClientsResponse = ListDiscoveryClientsResponse;
export const ListProjectsLocationsDiscoveryClientsResponse = ListDiscoveryClientsResponse;

export type ListProjectsLocationsDiscoveryClientsError = DefaultErrors;

/** Lists all the discovery clients in a given project and location. */
export const listProjectsLocationsDiscoveryClients: API.PaginatedOperationMethod<ListProjectsLocationsDiscoveryClientsRequest, ListProjectsLocationsDiscoveryClientsResponse, ListProjectsLocationsDiscoveryClientsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsDiscoveryClientsRequest,
  output: ListProjectsLocationsDiscoveryClientsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsLocationsDiscoveryClientsRequest {
  /** Output only. Identifier. Full name of this discovery client. */
  name: string;
  /** Required. Update mask is used to specify the fields to be overwritten in the `DiscoveryClient` resource by the update. The values specified in the `update_mask` field are relative to the resource, not the full request. A field will be overwritten if it is in the mask. A single * value in the mask lets you to overwrite all fields. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: DiscoveryClient;
}

export const PatchProjectsLocationsDiscoveryClientsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(DiscoveryClient).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/discoveryClients/{discoveryClientsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDiscoveryClientsRequest>;

export type PatchProjectsLocationsDiscoveryClientsResponse = Operation;
export const PatchProjectsLocationsDiscoveryClientsResponse = Operation;

export type PatchProjectsLocationsDiscoveryClientsError = DefaultErrors;

/** Updates a discovery client. */
export const patchProjectsLocationsDiscoveryClients: API.OperationMethod<PatchProjectsLocationsDiscoveryClientsRequest, PatchProjectsLocationsDiscoveryClientsResponse, PatchProjectsLocationsDiscoveryClientsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDiscoveryClientsRequest,
  output: PatchProjectsLocationsDiscoveryClientsResponse,
  errors: [],
}));

export interface SendHeartbeatProjectsLocationsDiscoveryClientsRequest {
  /** Required. The discovery client name. */
  name: string;
  /** Request body */
  body?: SendDiscoveryClientHeartbeatRequest;
}

export const SendHeartbeatProjectsLocationsDiscoveryClientsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SendDiscoveryClientHeartbeatRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/discoveryClients/{discoveryClientsId}:sendHeartbeat", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SendHeartbeatProjectsLocationsDiscoveryClientsRequest>;

export type SendHeartbeatProjectsLocationsDiscoveryClientsResponse = Operation;
export const SendHeartbeatProjectsLocationsDiscoveryClientsResponse = Operation;

export type SendHeartbeatProjectsLocationsDiscoveryClientsError = DefaultErrors;

/** Sends a discovery client heartbeat. Healthy clients are expected to send heartbeats regularly (normally every few minutes). */
export const sendHeartbeatProjectsLocationsDiscoveryClients: API.OperationMethod<SendHeartbeatProjectsLocationsDiscoveryClientsRequest, SendHeartbeatProjectsLocationsDiscoveryClientsResponse, SendHeartbeatProjectsLocationsDiscoveryClientsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: SendHeartbeatProjectsLocationsDiscoveryClientsRequest,
  output: SendHeartbeatProjectsLocationsDiscoveryClientsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsDiscoveryClientsRequest {
  /** Required. The discovery client name. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsDiscoveryClientsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/discoveryClients/{discoveryClientsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDiscoveryClientsRequest>;

export type DeleteProjectsLocationsDiscoveryClientsResponse = Operation;
export const DeleteProjectsLocationsDiscoveryClientsResponse = Operation;

export type DeleteProjectsLocationsDiscoveryClientsError = DefaultErrors;

/** Deletes a discovery client. */
export const deleteProjectsLocationsDiscoveryClients: API.OperationMethod<DeleteProjectsLocationsDiscoveryClientsRequest, DeleteProjectsLocationsDiscoveryClientsResponse, DeleteProjectsLocationsDiscoveryClientsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDiscoveryClientsRequest,
  output: DeleteProjectsLocationsDiscoveryClientsResponse,
  errors: [],
}));

export interface GetProjectsLocationsRelationsRequest {
  /** Required. Name of the resource. */
  name: string;
}

export const GetProjectsLocationsRelationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/relations/{relationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRelationsRequest>;

export type GetProjectsLocationsRelationsResponse = Relation;
export const GetProjectsLocationsRelationsResponse = Relation;

export type GetProjectsLocationsRelationsError = DefaultErrors;

/** Gets the details of an relation. */
export const getProjectsLocationsRelations: API.OperationMethod<GetProjectsLocationsRelationsRequest, GetProjectsLocationsRelationsResponse, GetProjectsLocationsRelationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRelationsRequest,
  output: GetProjectsLocationsRelationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsRelationsRequest {
  /** Required. Parent value for `ListRelationsRequest`. */
  parent: string;
  /** Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Filtering results. */
  filter?: string;
  /** Field to sort by. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
}

export const ListProjectsLocationsRelationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/relations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRelationsRequest>;

export type ListProjectsLocationsRelationsResponse = ListRelationsResponse;
export const ListProjectsLocationsRelationsResponse = ListRelationsResponse;

export type ListProjectsLocationsRelationsError = DefaultErrors;

/** Lists all the relations in a given project and location. */
export const listProjectsLocationsRelations: API.PaginatedOperationMethod<ListProjectsLocationsRelationsRequest, ListProjectsLocationsRelationsResponse, ListProjectsLocationsRelationsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsRelationsRequest,
  output: ListProjectsLocationsRelationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

