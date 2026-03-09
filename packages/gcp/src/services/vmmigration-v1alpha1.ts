// ==========================================================================
// VM Migration API (vmmigration v1alpha1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "vmmigration",
  version: "v1alpha1",
  rootUrl: "https://vmmigration.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Status {
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
}

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Schema.String),
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      code: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

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

export const Operation: Schema.Schema<Operation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      done: Schema.optional(Schema.Boolean),
      error: Schema.optional(Status),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface OSDescription {
  /** OS offer. */
  offer?: string;
  /** OS publisher. */
  publisher?: string;
  /** OS plan. */
  plan?: string;
  /** OS type. */
  type?: string;
}

export const OSDescription: Schema.Schema<OSDescription> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      offer: Schema.optional(Schema.String),
      publisher: Schema.optional(Schema.String),
      plan: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSDescription",
  }) as any as Schema.Schema<OSDescription>;

export interface TargetProject {
  /** Output only. The name of the target project. */
  name?: string;
  /** Required. The target project ID (number) or project name. */
  project?: string;
  /** The target project's description. */
  description?: string;
  /** Output only. The last time the target project resource was updated. */
  updateTime?: string;
  /** Output only. The time this target project resource was created (not related to when the Compute Engine project it points to was created). */
  createTime?: string;
}

export const TargetProject: Schema.Schema<TargetProject> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      project: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TargetProject",
  }) as any as Schema.Schema<TargetProject>;

export interface ReplicatingStep {
  /** The source disks replication rate for the last 2 minutes in bytes per second. */
  lastTwoMinutesAverageBytesPerSecond?: string;
  /** Replicated bytes in the step. */
  replicatedBytes?: string;
  /** The source disks replication rate for the last 30 minutes in bytes per second. */
  lastThirtyMinutesAverageBytesPerSecond?: string;
  /** Total bytes to be handled in the step. */
  totalBytes?: string;
}

export const ReplicatingStep: Schema.Schema<ReplicatingStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lastTwoMinutesAverageBytesPerSecond: Schema.optional(Schema.String),
      replicatedBytes: Schema.optional(Schema.String),
      lastThirtyMinutesAverageBytesPerSecond: Schema.optional(Schema.String),
      totalBytes: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ReplicatingStep",
  }) as any as Schema.Schema<ReplicatingStep>;

export interface Encryption {
  /** Required. The name of the encryption key that is stored in Google Cloud KMS. */
  kmsKey?: string;
}

export const Encryption: Schema.Schema<Encryption> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kmsKey: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Encryption" }) as any as Schema.Schema<Encryption>;

export interface VmAttachmentDetails {
  /** Optional. Specifies a unique device name of your choice that is reflected into the /dev/disk/by-id/google-* tree of a Linux operating system running within the instance. If not specified, the server chooses a default device name to apply to this disk, in the form persistent-disk-x, where x is a number assigned by Google Compute Engine. This field is only applicable for persistent disks. */
  deviceName?: string;
}

export const VmAttachmentDetails: Schema.Schema<VmAttachmentDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      deviceName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VmAttachmentDetails",
  }) as any as Schema.Schema<VmAttachmentDetails>;

export interface PersistentDiskDefaults {
  /** Optional. The encryption to apply to the disk. */
  encryption?: Encryption;
  /** A map of labels to associate with the Persistent Disk. */
  additionalLabels?: Record<string, string>;
  /** The disk type to use. */
  diskType?:
    | "COMPUTE_ENGINE_DISK_TYPE_UNSPECIFIED"
    | "COMPUTE_ENGINE_DISK_TYPE_STANDARD"
    | "COMPUTE_ENGINE_DISK_TYPE_SSD"
    | "COMPUTE_ENGINE_DISK_TYPE_BALANCED"
    | "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED"
    | "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED_HIGH_AVAILABILITY"
    | (string & {});
  /** Optional. Details for attachment of the disk to a VM. Used when the disk is set to be attached to a target VM. */
  vmAttachmentDetails?: VmAttachmentDetails;
  /** Optional. The name of the Persistent Disk to create. */
  diskName?: string;
  /** Required. The ordinal number of the source VM disk. */
  sourceDiskNumber?: number;
}

export const PersistentDiskDefaults: Schema.Schema<PersistentDiskDefaults> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      encryption: Schema.optional(Encryption),
      additionalLabels: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      diskType: Schema.optional(Schema.String),
      vmAttachmentDetails: Schema.optional(VmAttachmentDetails),
      diskName: Schema.optional(Schema.String),
      sourceDiskNumber: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "PersistentDiskDefaults",
  }) as any as Schema.Schema<PersistentDiskDefaults>;

export interface ReplicationSync {
  /** The most updated snapshot created time in the source that finished replication. */
  lastSyncTime?: string;
}

export const ReplicationSync: Schema.Schema<ReplicationSync> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lastSyncTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ReplicationSync",
  }) as any as Schema.Schema<ReplicationSync>;

export interface AccessKeyCredentials {
  /** Input only. AWS session token. Used only when AWS security token service (STS) is responsible for creating the temporary credentials. */
  sessionToken?: string;
  /** Input only. AWS secret access key. */
  secretAccessKey?: string;
  /** AWS access key ID. */
  accessKeyId?: string;
}

export const AccessKeyCredentials: Schema.Schema<AccessKeyCredentials> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sessionToken: Schema.optional(Schema.String),
      secretAccessKey: Schema.optional(Schema.String),
      accessKeyId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccessKeyCredentials",
  }) as any as Schema.Schema<AccessKeyCredentials>;

export interface Tag {
  /** Required. Value of tag. */
  value?: string;
  /** Required. Key of tag. */
  key?: string;
}

export const Tag: Schema.Schema<Tag> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      key: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Tag" }) as any as Schema.Schema<Tag>;

export interface AwsSourceDetails {
  /** AWS security group names to limit the scope of the source inventory. */
  inventorySecurityGroupNames?: Array<string>;
  /** User specified tags to add to every M2VM generated resource in AWS. These tags will be set in addition to the default tags that are set as part of the migration process. The tags must not begin with the reserved prefix `m2vm`. */
  migrationResourcesUserTags?: Record<string, string>;
  /** AWS Credentials using access key id and secret. */
  accessKeyCreds?: AccessKeyCredentials;
  /** Output only. The source's public IP. All communication initiated by this source will originate from this IP. */
  publicIp?: string;
  /** Output only. Provides details on the state of the Source in case of an error. */
  error?: Status;
  /** Immutable. The AWS region that the source VMs will be migrated from. */
  awsRegion?: string;
  /** AWS resource tags to limit the scope of the source inventory. */
  inventoryTagList?: Array<Tag>;
  /** Output only. State of the source as determined by the health check. */
  state?: "STATE_UNSPECIFIED" | "PENDING" | "FAILED" | "ACTIVE" | (string & {});
}

export const AwsSourceDetails: Schema.Schema<AwsSourceDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inventorySecurityGroupNames: Schema.optional(Schema.Array(Schema.String)),
      migrationResourcesUserTags: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      accessKeyCreds: Schema.optional(AccessKeyCredentials),
      publicIp: Schema.optional(Schema.String),
      error: Schema.optional(Status),
      awsRegion: Schema.optional(Schema.String),
      inventoryTagList: Schema.optional(Schema.Array(Tag)),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AwsSourceDetails",
  }) as any as Schema.Schema<AwsSourceDetails>;

export interface CancelCloneJobRequest {}

export const CancelCloneJobRequest: Schema.Schema<CancelCloneJobRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelCloneJobRequest",
  }) as any as Schema.Schema<CancelCloneJobRequest>;

export interface CancelCutoverJobRequest {}

export const CancelCutoverJobRequest: Schema.Schema<CancelCutoverJobRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelCutoverJobRequest",
  }) as any as Schema.Schema<CancelCutoverJobRequest>;

export interface MachineImageParametersOverrides {
  /** Optional. The machine type to create the MachineImage with. If empty, the service will choose a relevant machine type based on the information from the source image. For more information about machine types, please refer to https://cloud.google.com/compute/docs/machine-resource. */
  machineType?: string;
}

export const MachineImageParametersOverrides: Schema.Schema<MachineImageParametersOverrides> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      machineType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MachineImageParametersOverrides",
  }) as any as Schema.Schema<MachineImageParametersOverrides>;

export interface NetworkInterface {
  /** Optional. The internal IP to define in the NIC. The formats accepted are: `ephemeral` \ ipv4 address \ a named address resource full path. */
  internalIp?: string;
  /** Optional. The networking tier used for optimizing connectivity between instances and systems on the internet. Applies only for external ephemeral IP addresses. If left empty, will default to PREMIUM. */
  networkTier?:
    | "COMPUTE_ENGINE_NETWORK_TIER_UNSPECIFIED"
    | "NETWORK_TIER_STANDARD"
    | "NETWORK_TIER_PREMIUM"
    | (string & {});
  /** Optional. The external IP to define in the NIC. */
  externalIp?: string;
  /** Optional. The subnetwork to connect the NIC to. */
  subnetwork?: string;
  /** Optional. The network to connect the NIC to. */
  network?: string;
}

export const NetworkInterface: Schema.Schema<NetworkInterface> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      internalIp: Schema.optional(Schema.String),
      networkTier: Schema.optional(Schema.String),
      externalIp: Schema.optional(Schema.String),
      subnetwork: Schema.optional(Schema.String),
      network: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "NetworkInterface",
  }) as any as Schema.Schema<NetworkInterface>;

export interface DiskImageDefaults {
  /** Required. The Image resource used when creating the disk. */
  sourceImage?: string;
}

export const DiskImageDefaults: Schema.Schema<DiskImageDefaults> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sourceImage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DiskImageDefaults",
  }) as any as Schema.Schema<DiskImageDefaults>;

export interface BootDiskDefaults {
  /** Optional. The name of the disk. */
  diskName?: string;
  /** Optional. The encryption to apply to the boot disk. */
  encryption?: Encryption;
  /** Optional. The type of disk provisioning to use for the VM. */
  diskType?:
    | "COMPUTE_ENGINE_DISK_TYPE_UNSPECIFIED"
    | "COMPUTE_ENGINE_DISK_TYPE_STANDARD"
    | "COMPUTE_ENGINE_DISK_TYPE_SSD"
    | "COMPUTE_ENGINE_DISK_TYPE_BALANCED"
    | "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED"
    | "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED_HIGH_AVAILABILITY"
    | (string & {});
  /** Optional. Specifies a unique device name of your choice that is reflected into the /dev/disk/by-id/google-* tree of a Linux operating system running within the instance. If not specified, the server chooses a default device name to apply to this disk, in the form persistent-disk-x, where x is a number assigned by Google Compute Engine. This field is only applicable for persistent disks. */
  deviceName?: string;
  /** The image to use when creating the disk. */
  image?: DiskImageDefaults;
}

export const BootDiskDefaults: Schema.Schema<BootDiskDefaults> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      diskName: Schema.optional(Schema.String),
      encryption: Schema.optional(Encryption),
      diskType: Schema.optional(Schema.String),
      deviceName: Schema.optional(Schema.String),
      image: Schema.optional(DiskImageDefaults),
    }),
  ).annotate({
    identifier: "BootDiskDefaults",
  }) as any as Schema.Schema<BootDiskDefaults>;

export interface SchedulingNodeAffinity {
  /** Corresponds to the label values of Node resource. */
  values?: Array<string>;
  /** The operator to use for the node resources specified in the `values` parameter. */
  operator?: "OPERATOR_UNSPECIFIED" | "IN" | "NOT_IN" | (string & {});
  /** The label key of Node resource to reference. */
  key?: string;
}

export const SchedulingNodeAffinity: Schema.Schema<SchedulingNodeAffinity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      values: Schema.optional(Schema.Array(Schema.String)),
      operator: Schema.optional(Schema.String),
      key: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SchedulingNodeAffinity",
  }) as any as Schema.Schema<SchedulingNodeAffinity>;

export interface ComputeScheduling {
  automaticRestart?: boolean;
  /** Whether the Instance should be automatically restarted whenever it is terminated by Compute Engine (not terminated by user). This configuration is identical to `automaticRestart` field in Compute Engine create instance under scheduling. It was changed to an enum (instead of a boolean) to match the default value in Compute Engine which is automatic restart. */
  restartType?:
    | "RESTART_TYPE_UNSPECIFIED"
    | "AUTOMATIC_RESTART"
    | "NO_AUTOMATIC_RESTART"
    | (string & {});
  /** A set of node affinity and anti-affinity configurations for sole tenant nodes. */
  nodeAffinities?: Array<SchedulingNodeAffinity>;
  /** The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node. Ignored if no node_affinites are configured. */
  minNodeCpus?: number;
  /** How the instance should behave when the host machine undergoes maintenance that may temporarily impact instance performance. */
  onHostMaintenance?:
    | "ON_HOST_MAINTENANCE_UNSPECIFIED"
    | "TERMINATE"
    | "MIGRATE"
    | (string & {});
}

export const ComputeScheduling: Schema.Schema<ComputeScheduling> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      automaticRestart: Schema.optional(Schema.Boolean),
      restartType: Schema.optional(Schema.String),
      nodeAffinities: Schema.optional(Schema.Array(SchedulingNodeAffinity)),
      minNodeCpus: Schema.optional(Schema.Number),
      onHostMaintenance: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ComputeScheduling",
  }) as any as Schema.Schema<ComputeScheduling>;

export interface DisksMigrationVmTargetDefaults {
  /** Required. The name of the VM to create. */
  vmName?: string;
  /** Optional. The encryption to apply to the VM. */
  encryption?: Encryption;
  /** Optional. Additional licenses to assign to the VM. */
  additionalLicenses?: Array<string>;
  /** Optional. Defines whether the instance has vTPM enabled. */
  enableVtpm?: boolean;
  /** Optional. The machine type series to create the VM with. For presentation only. */
  machineTypeSeries?: string;
  /** Optional. The service account to associate the VM with. */
  serviceAccount?: string;
  /** Optional. The metadata key/value pairs to assign to the VM. */
  metadata?: Record<string, string>;
  /** Optional. The hostname to assign to the VM. */
  hostname?: string;
  /** Optional. NICs to attach to the VM. */
  networkInterfaces?: Array<NetworkInterface>;
  /** Optional. A map of labels to associate with the VM. */
  labels?: Record<string, string>;
  /** Optional. A list of network tags to associate with the VM. */
  networkTags?: Array<string>;
  /** Optional. Defines whether the instance has integrity monitoring enabled. */
  enableIntegrityMonitoring?: boolean;
  /** Optional. Details of the boot disk of the VM. */
  bootDiskDefaults?: BootDiskDefaults;
  /** Optional. Compute instance scheduling information (if empty default is used). */
  computeScheduling?: ComputeScheduling;
  /** Required. The machine type to create the VM with. */
  machineType?: string;
  /** Optional. Defines whether the instance has Secure Boot enabled. This can be set to true only if the VM boot option is EFI. */
  secureBoot?: boolean;
}

export const DisksMigrationVmTargetDefaults: Schema.Schema<DisksMigrationVmTargetDefaults> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vmName: Schema.optional(Schema.String),
      encryption: Schema.optional(Encryption),
      additionalLicenses: Schema.optional(Schema.Array(Schema.String)),
      enableVtpm: Schema.optional(Schema.Boolean),
      machineTypeSeries: Schema.optional(Schema.String),
      serviceAccount: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      hostname: Schema.optional(Schema.String),
      networkInterfaces: Schema.optional(Schema.Array(NetworkInterface)),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      networkTags: Schema.optional(Schema.Array(Schema.String)),
      enableIntegrityMonitoring: Schema.optional(Schema.Boolean),
      bootDiskDefaults: Schema.optional(BootDiskDefaults),
      computeScheduling: Schema.optional(ComputeScheduling),
      machineType: Schema.optional(Schema.String),
      secureBoot: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "DisksMigrationVmTargetDefaults",
  }) as any as Schema.Schema<DisksMigrationVmTargetDefaults>;

export interface AwsSecurityGroup {
  /** The AWS security group name. */
  name?: string;
  /** The AWS security group id. */
  id?: string;
}

export const AwsSecurityGroup: Schema.Schema<AwsSecurityGroup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AwsSecurityGroup",
  }) as any as Schema.Schema<AwsSecurityGroup>;

export interface ProvisioningTargetDiskStep {}

export const ProvisioningTargetDiskStep: Schema.Schema<ProvisioningTargetDiskStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ProvisioningTargetDiskStep",
  }) as any as Schema.Schema<ProvisioningTargetDiskStep>;

export interface AwsVmDetails {
  /** The VM ID in AWS. */
  vmId?: string;
  /** The tags of the VM. */
  tags?: Record<string, string>;
  /** The VM Boot Option. */
  bootOption?: "BOOT_OPTION_UNSPECIFIED" | "EFI" | "BIOS" | (string & {});
  /** The number of CPU cores the VM has. */
  cpuCount?: number;
  /** The id of the AWS's source this VM is connected to. */
  sourceId?: string;
  /** The CPU architecture. */
  architecture?:
    | "VM_ARCHITECTURE_UNSPECIFIED"
    | "I386"
    | "X86_64"
    | "ARM64"
    | "X86_64_MAC"
    | (string & {});
  /** The total size of the storage allocated to the VM in MB. */
  committedStorageMb?: string;
  /** The virtualization type. */
  virtualizationType?:
    | "VM_VIRTUALIZATION_TYPE_UNSPECIFIED"
    | "HVM"
    | "PARAVIRTUAL"
    | (string & {});
  /** The VM's OS. */
  osDescription?: string;
  /** The memory size of the VM in MB. */
  memoryMb?: number;
  /** The descriptive name of the AWS's source this VM is connected to. */
  sourceDescription?: string;
  /** The instance type of the VM. */
  instanceType?: string;
  /** The VPC ID the VM belongs to. */
  vpcId?: string;
  /** The display name of the VM. Note that this value is not necessarily unique. */
  displayName?: string;
  /** The number of vCPUs the VM has. It is calculated as the number of CPU cores * threads per CPU the VM has. */
  vcpuCount?: number;
  /** The number of disks the VM has. */
  diskCount?: number;
  /** The security groups the VM belongs to. */
  securityGroups?: Array<AwsSecurityGroup>;
  /** Output only. The power state of the VM at the moment list was taken. */
  powerState?:
    | "POWER_STATE_UNSPECIFIED"
    | "ON"
    | "OFF"
    | "SUSPENDED"
    | "PENDING"
    | (string & {});
  /** The AWS zone of the VM. */
  zone?: string;
}

export const AwsVmDetails: Schema.Schema<AwsVmDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vmId: Schema.optional(Schema.String),
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      bootOption: Schema.optional(Schema.String),
      cpuCount: Schema.optional(Schema.Number),
      sourceId: Schema.optional(Schema.String),
      architecture: Schema.optional(Schema.String),
      committedStorageMb: Schema.optional(Schema.String),
      virtualizationType: Schema.optional(Schema.String),
      osDescription: Schema.optional(Schema.String),
      memoryMb: Schema.optional(Schema.Number),
      sourceDescription: Schema.optional(Schema.String),
      instanceType: Schema.optional(Schema.String),
      vpcId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      vcpuCount: Schema.optional(Schema.Number),
      diskCount: Schema.optional(Schema.Number),
      securityGroups: Schema.optional(Schema.Array(AwsSecurityGroup)),
      powerState: Schema.optional(Schema.String),
      zone: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AwsVmDetails",
  }) as any as Schema.Schema<AwsVmDetails>;

export interface AwsVmsDetails {
  /** The details of the AWS VMs. */
  details?: Array<AwsVmDetails>;
}

export const AwsVmsDetails: Schema.Schema<AwsVmsDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      details: Schema.optional(Schema.Array(AwsVmDetails)),
    }),
  ).annotate({
    identifier: "AwsVmsDetails",
  }) as any as Schema.Schema<AwsVmsDetails>;

export interface Disk {
  /** The disk size in GB. */
  sizeGb?: number;
  /** The disk's Logical Unit Number (LUN). */
  lun?: number;
  /** The disk name. */
  name?: string;
}

export const Disk: Schema.Schema<Disk> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sizeGb: Schema.optional(Schema.Number),
      lun: Schema.optional(Schema.Number),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Disk" }) as any as Schema.Schema<Disk>;

export interface VmwareVmDetails {
  /** The number of cpus in the VM. */
  cpuCount?: number;
  /** The VM's id in the source (note that this is not the MigratingVm's id). This is the moref id of the VM. */
  vmId?: string;
  /** The number of disks the VM has. */
  diskCount?: number;
  /** Output only. The CPU architecture. */
  architecture?:
    | "VM_ARCHITECTURE_UNSPECIFIED"
    | "VM_ARCHITECTURE_X86_FAMILY"
    | "VM_ARCHITECTURE_ARM64"
    | (string & {});
  /** The id of the vCenter's datacenter this VM is contained in. */
  datacenterId?: string;
  /** The display name of the VM. Note that this is not necessarily unique. */
  displayName?: string;
  /** The total size of the storage allocated to the VM in MB. */
  committedStorage?: string;
  /** The total size of the storage allocated to the VM in MB. */
  committedStorageMb?: string;
  /** The power state of the VM at the moment list was taken. */
  powerState?:
    | "POWER_STATE_UNSPECIFIED"
    | "ON"
    | "OFF"
    | "SUSPENDED"
    | (string & {});
  /** The VM's OS. See for example https://vdc-repo.vmware.com/vmwb-repository/dcr-public/da47f910-60ac-438b-8b9b-6122f4d14524/16b7274a-bf8b-4b4c-a05e-746f2aa93c8c/doc/vim.vm.GuestOsDescriptor.GuestOsIdentifier.html for types of strings this might hold. */
  guestDescription?: string;
  /** Output only. The VM Boot Option. */
  bootOption?: "BOOT_OPTION_UNSPECIFIED" | "EFI" | "BIOS" | (string & {});
  /** The unique identifier of the VM in vCenter. */
  uuid?: string;
  /** The size of the memory of the VM in MB. */
  memoryMb?: number;
  /** The descriptive name of the vCenter's datacenter this VM is contained in. */
  datacenterDescription?: string;
}

export const VmwareVmDetails: Schema.Schema<VmwareVmDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cpuCount: Schema.optional(Schema.Number),
      vmId: Schema.optional(Schema.String),
      diskCount: Schema.optional(Schema.Number),
      architecture: Schema.optional(Schema.String),
      datacenterId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      committedStorage: Schema.optional(Schema.String),
      committedStorageMb: Schema.optional(Schema.String),
      powerState: Schema.optional(Schema.String),
      guestDescription: Schema.optional(Schema.String),
      bootOption: Schema.optional(Schema.String),
      uuid: Schema.optional(Schema.String),
      memoryMb: Schema.optional(Schema.Number),
      datacenterDescription: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VmwareVmDetails",
  }) as any as Schema.Schema<VmwareVmDetails>;

export interface VmwareVmsDetails {
  /** The details of the vmware VMs. */
  details?: Array<VmwareVmDetails>;
}

export const VmwareVmsDetails: Schema.Schema<VmwareVmsDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      details: Schema.optional(Schema.Array(VmwareVmDetails)),
    }),
  ).annotate({
    identifier: "VmwareVmsDetails",
  }) as any as Schema.Schema<VmwareVmsDetails>;

export interface DisksMigrationDisksTargetDefaults {}

export const DisksMigrationDisksTargetDefaults: Schema.Schema<DisksMigrationDisksTargetDefaults> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "DisksMigrationDisksTargetDefaults",
  }) as any as Schema.Schema<DisksMigrationDisksTargetDefaults>;

export interface ComputeEngineDisksTargetDefaults {
  /** The details of each Persistent Disk to create. */
  disks?: Array<PersistentDiskDefaults>;
  /** The full path of the resource of type TargetProject which represents the Compute Engine project in which to create the Persistent Disks. */
  targetProject?: string;
  /** The zone in which to create the Persistent Disks. */
  zone?: string;
  /** Details of the disk only migration target. */
  disksTargetDefaults?: DisksMigrationDisksTargetDefaults;
  /** Details of the VM migration target. */
  vmTargetDefaults?: DisksMigrationVmTargetDefaults;
}

export const ComputeEngineDisksTargetDefaults: Schema.Schema<ComputeEngineDisksTargetDefaults> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      disks: Schema.optional(Schema.Array(PersistentDiskDefaults)),
      targetProject: Schema.optional(Schema.String),
      zone: Schema.optional(Schema.String),
      disksTargetDefaults: Schema.optional(DisksMigrationDisksTargetDefaults),
      vmTargetDefaults: Schema.optional(DisksMigrationVmTargetDefaults),
    }),
  ).annotate({
    identifier: "ComputeEngineDisksTargetDefaults",
  }) as any as Schema.Schema<ComputeEngineDisksTargetDefaults>;

export interface ServiceAccount {
  /** Optional. The list of scopes to be made available for this service account. */
  scopes?: Array<string>;
  /** Required. The email address of the service account. */
  email?: string;
}

export const ServiceAccount: Schema.Schema<ServiceAccount> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      scopes: Schema.optional(Schema.Array(Schema.String)),
      email: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ServiceAccount",
  }) as any as Schema.Schema<ServiceAccount>;

export interface AdaptationModifier {
  /** Optional. The modifier name. */
  modifier?: string;
  /** Optional. The value of the modifier. The actual value depends on the modifier and can also be empty. */
  value?: string;
}

export const AdaptationModifier: Schema.Schema<AdaptationModifier> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      modifier: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AdaptationModifier",
  }) as any as Schema.Schema<AdaptationModifier>;

export interface AppliedLicense {
  /** The license type that was used in OS adaptation. */
  type?: "TYPE_UNSPECIFIED" | "NONE" | "PAYG" | "BYOL" | (string & {});
  /** The OS license returned from the adaptation module's report. */
  osLicense?: string;
}

export const AppliedLicense: Schema.Schema<AppliedLicense> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      osLicense: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AppliedLicense",
  }) as any as Schema.Schema<AppliedLicense>;

export interface ComputeEngineTargetDetails {
  /** The machine type to create the VM with. */
  machineType?: string;
  /** Optional. Additional replica zones of the target regional disks. If this list is not empty a regional disk will be created. The first supported zone would be the one stated in the zone field. The rest are taken from this list. Please refer to the [regional disk creation API](https://cloud.google.com/compute/docs/regions-zones/global-regional-zonal-resources) for further details about regional vs zonal disks. If not specified, a zonal disk will be created in the same zone the VM is created. */
  diskReplicaZones?: Array<string>;
  /** The metadata key/value pairs to assign to the VM. */
  metadata?: Record<string, string>;
  /** List of NICs connected to this VM. */
  networkInterfaces?: Array<NetworkInterface>;
  /** Optional. Defines whether the instance has integrity monitoring enabled. */
  enableIntegrityMonitoring?: boolean;
  /** Optional. The storage pool used for the VM disks. If specified this will be the storage pool in which the disk is created. This is the full path of the storage pool resource, for example: "projects/my-project/zones/us-central1-a/storagePools/my-storage-pool". The storage pool must be in the same project and zone as the target disks. The storage pool's type must match the disk type. */
  storagePool?: string;
  /** The hostname to assign to the VM. */
  hostname?: string;
  /** Optional. Modifiers to be used as configuration of the OS adaptation process. */
  adaptationModifiers?: Array<AdaptationModifier>;
  /** A map of labels to associate with the VM. */
  labels?: Record<string, string>;
  /** Defines whether the instance has Secure Boot enabled. This can be set to true only if the VM boot option is EFI. */
  secureBoot?: boolean;
  /** The service account to associate the VM with. */
  serviceAccount?: string;
  /** Optional. By default the virtual machine will keep its existing boot option. Setting this property will trigger an internal process which will convert the virtual machine from using the existing boot option to another. */
  bootConversion?:
    | "BOOT_CONVERSION_UNSPECIFIED"
    | "NONE"
    | "BIOS_TO_EFI"
    | (string & {});
  /** The disk type to use in the VM. */
  diskType?:
    | "COMPUTE_ENGINE_DISK_TYPE_UNSPECIFIED"
    | "COMPUTE_ENGINE_DISK_TYPE_STANDARD"
    | "COMPUTE_ENGINE_DISK_TYPE_SSD"
    | "COMPUTE_ENGINE_DISK_TYPE_BALANCED"
    | "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED"
    | "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED_HIGH_AVAILABILITY"
    | (string & {});
  /** A list of network tags to associate with the VM. */
  networkTags?: Array<string>;
  /** The zone in which to create the VM. */
  zone?: string;
  /** The OS license returned from the adaptation module report. */
  appliedLicense?: AppliedLicense;
  /** Optional. Defines whether the instance has vTPM enabled. */
  enableVtpm?: boolean;
  /** The Google Cloud target project ID or project name. */
  project?: string;
  /** The license type to use in OS adaptation. */
  licenseType?:
    | "COMPUTE_ENGINE_LICENSE_TYPE_DEFAULT"
    | "COMPUTE_ENGINE_LICENSE_TYPE_PAYG"
    | "COMPUTE_ENGINE_LICENSE_TYPE_BYOL"
    | (string & {});
  /** Optional. The encryption to apply to the VM disks. */
  encryption?: Encryption;
  /** The VM Boot Option, as set in the source VM. */
  bootOption?:
    | "COMPUTE_ENGINE_BOOT_OPTION_UNSPECIFIED"
    | "COMPUTE_ENGINE_BOOT_OPTION_EFI"
    | "COMPUTE_ENGINE_BOOT_OPTION_BIOS"
    | (string & {});
  /** Additional licenses to assign to the VM. */
  additionalLicenses?: Array<string>;
  /** The machine type series to create the VM with. */
  machineTypeSeries?: string;
  /** Compute instance scheduling information (if empty default is used). */
  computeScheduling?: ComputeScheduling;
  /** The name of the VM to create. */
  vmName?: string;
}

export const ComputeEngineTargetDetails: Schema.Schema<ComputeEngineTargetDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      machineType: Schema.optional(Schema.String),
      diskReplicaZones: Schema.optional(Schema.Array(Schema.String)),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      networkInterfaces: Schema.optional(Schema.Array(NetworkInterface)),
      enableIntegrityMonitoring: Schema.optional(Schema.Boolean),
      storagePool: Schema.optional(Schema.String),
      hostname: Schema.optional(Schema.String),
      adaptationModifiers: Schema.optional(Schema.Array(AdaptationModifier)),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      secureBoot: Schema.optional(Schema.Boolean),
      serviceAccount: Schema.optional(Schema.String),
      bootConversion: Schema.optional(Schema.String),
      diskType: Schema.optional(Schema.String),
      networkTags: Schema.optional(Schema.Array(Schema.String)),
      zone: Schema.optional(Schema.String),
      appliedLicense: Schema.optional(AppliedLicense),
      enableVtpm: Schema.optional(Schema.Boolean),
      project: Schema.optional(Schema.String),
      licenseType: Schema.optional(Schema.String),
      encryption: Schema.optional(Encryption),
      bootOption: Schema.optional(Schema.String),
      additionalLicenses: Schema.optional(Schema.Array(Schema.String)),
      machineTypeSeries: Schema.optional(Schema.String),
      computeScheduling: Schema.optional(ComputeScheduling),
      vmName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ComputeEngineTargetDetails",
  }) as any as Schema.Schema<ComputeEngineTargetDetails>;

export interface AdaptingOSStep {}

export const AdaptingOSStep: Schema.Schema<AdaptingOSStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "AdaptingOSStep",
  }) as any as Schema.Schema<AdaptingOSStep>;

export interface PreparingVMDisksStep {}

export const PreparingVMDisksStep: Schema.Schema<PreparingVMDisksStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "PreparingVMDisksStep",
  }) as any as Schema.Schema<PreparingVMDisksStep>;

export interface InstantiatingMigratedVMStep {}

export const InstantiatingMigratedVMStep: Schema.Schema<InstantiatingMigratedVMStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "InstantiatingMigratedVMStep",
  }) as any as Schema.Schema<InstantiatingMigratedVMStep>;

export interface CloneStep {
  /** The time the step has ended. */
  endTime?: string;
  /** The time the step has started. */
  startTime?: string;
  /** Adapting OS step. */
  adaptingOs?: AdaptingOSStep;
  /** Preparing VM disks step. */
  preparingVmDisks?: PreparingVMDisksStep;
  /** Instantiating migrated VM step. */
  instantiatingMigratedVm?: InstantiatingMigratedVMStep;
}

export const CloneStep: Schema.Schema<CloneStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      endTime: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
      adaptingOs: Schema.optional(AdaptingOSStep),
      preparingVmDisks: Schema.optional(PreparingVMDisksStep),
      instantiatingMigratedVm: Schema.optional(InstantiatingMigratedVMStep),
    }),
  ).annotate({ identifier: "CloneStep" }) as any as Schema.Schema<CloneStep>;

export interface TargetVMDetails {
  /** The full path of the resource of type TargetProject which represents the Compute Engine project in which to create this VM. */
  targetProject?: string;
  /** A list of network tags to associate with the VM. */
  networkTags?: Array<string>;
  /** List of NICs connected to this VM. */
  networkInterfaces?: Array<NetworkInterface>;
  /** The name of the VM to create. */
  name?: string;
  /** The service account to associate the VM with. */
  serviceAccount?: string;
  /** The license type to use in OS adaptation. */
  licenseType?: "DEFAULT" | "PAYG" | "BYOL" | (string & {});
  /** Compute instance scheduling information (if empty default is used). */
  computeScheduling?: ComputeScheduling;
  /** The zone in which to create the VM. */
  zone?: string;
  /** The internal IP to define in the VM. The formats accepted are: `ephemeral` \ ipv4 address \ a named address resource full path. */
  internalIp?: string;
  /** The network to connect the VM to. */
  network?: string;
  /** Output only. The OS license returned from the adaptation module report. */
  appliedLicense?: AppliedLicense;
  /** The disk type to use in the VM. */
  diskType?:
    | "DISK_TYPE_UNSPECIFIED"
    | "STANDARD"
    | "BALANCED"
    | "SSD"
    | "HYPERDISK_BALANCED"
    | "HYPERDISK_BALANCED_HIGH_AVAILABILITY"
    | (string & {});
  /** The machine type series to create the VM with. */
  machineTypeSeries?: string;
  /** Output only. The VM Boot Option, as set in the source VM. */
  bootOption?: "BOOT_OPTION_UNSPECIFIED" | "EFI" | "BIOS" | (string & {});
  /** Defines whether the instance has Secure Boot enabled. This can be set to true only if the vm boot option is EFI. */
  secureBoot?: boolean;
  /** Output only. The project in which to create the VM. */
  project?: string;
  /** A map of labels to associate with the VM. */
  labels?: Record<string, string>;
  /** The external IP to define in the VM. */
  externalIp?: string;
  /** The metadata key/value pairs to assign to the VM. */
  metadata?: Record<string, string>;
  /** The subnetwork to connect the VM to. */
  subnetwork?: string;
  /** The machine type to create the VM with. */
  machineType?: string;
}

export const TargetVMDetails: Schema.Schema<TargetVMDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetProject: Schema.optional(Schema.String),
      networkTags: Schema.optional(Schema.Array(Schema.String)),
      networkInterfaces: Schema.optional(Schema.Array(NetworkInterface)),
      name: Schema.optional(Schema.String),
      serviceAccount: Schema.optional(Schema.String),
      licenseType: Schema.optional(Schema.String),
      computeScheduling: Schema.optional(ComputeScheduling),
      zone: Schema.optional(Schema.String),
      internalIp: Schema.optional(Schema.String),
      network: Schema.optional(Schema.String),
      appliedLicense: Schema.optional(AppliedLicense),
      diskType: Schema.optional(Schema.String),
      machineTypeSeries: Schema.optional(Schema.String),
      bootOption: Schema.optional(Schema.String),
      secureBoot: Schema.optional(Schema.Boolean),
      project: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      externalIp: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      subnetwork: Schema.optional(Schema.String),
      machineType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TargetVMDetails",
  }) as any as Schema.Schema<TargetVMDetails>;

export interface DisksMigrationVmTargetDetails {
  /** Output only. The URI of the Compute Engine VM. */
  vmUri?: string;
}

export const DisksMigrationVmTargetDetails: Schema.Schema<DisksMigrationVmTargetDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vmUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DisksMigrationVmTargetDetails",
  }) as any as Schema.Schema<DisksMigrationVmTargetDetails>;

export interface DisksMigrationDisksTargetDetails {}

export const DisksMigrationDisksTargetDetails: Schema.Schema<DisksMigrationDisksTargetDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "DisksMigrationDisksTargetDetails",
  }) as any as Schema.Schema<DisksMigrationDisksTargetDetails>;

export interface PersistentDisk {
  /** The URI of the Persistent Disk. */
  diskUri?: string;
  /** The ordinal number of the source VM disk. */
  sourceDiskNumber?: number;
}

export const PersistentDisk: Schema.Schema<PersistentDisk> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      diskUri: Schema.optional(Schema.String),
      sourceDiskNumber: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "PersistentDisk",
  }) as any as Schema.Schema<PersistentDisk>;

export interface ComputeEngineDisksTargetDetails {
  /** Details for the VM the migrated data disks are attached to. */
  vmTargetDetails?: DisksMigrationVmTargetDetails;
  /** Details of the disks-only migration target. */
  disksTargetDetails?: DisksMigrationDisksTargetDetails;
  /** The details of each created Persistent Disk. */
  disks?: Array<PersistentDisk>;
}

export const ComputeEngineDisksTargetDetails: Schema.Schema<ComputeEngineDisksTargetDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vmTargetDetails: Schema.optional(DisksMigrationVmTargetDetails),
      disksTargetDetails: Schema.optional(DisksMigrationDisksTargetDetails),
      disks: Schema.optional(Schema.Array(PersistentDisk)),
    }),
  ).annotate({
    identifier: "ComputeEngineDisksTargetDetails",
  }) as any as Schema.Schema<ComputeEngineDisksTargetDetails>;

export interface CloneJob {
  /** Output only. State of the clone job. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PENDING"
    | "ACTIVE"
    | "FAILED"
    | "SUCCEEDED"
    | "CANCELLED"
    | "CANCELLING"
    | "ADAPTING_OS"
    | (string & {});
  /** Output only. The name of the clone. */
  name?: string;
  /** Output only. The time the state was last updated. */
  stateTime?: string;
  /** Output only. Details of the target VM in Compute Engine. */
  computeEngineTargetDetails?: ComputeEngineTargetDetails;
  /** Output only. The clone steps list representing its progress. */
  steps?: Array<CloneStep>;
  /** Output only. The time the clone job was ended. */
  endTime?: string;
  /** Output only. Provides details for the errors that led to the Clone Job's state. */
  error?: Status;
  /** Output only. The time the clone job was created (as an API call, not when it was actually created in the target). */
  createTime?: string;
  /** Output only. Details of the VM in Compute Engine. Deprecated: Use compute_engine_target_details instead. */
  computeEngineVmDetails?: TargetVMDetails;
  /** Output only. Details of the target Persistent Disks in Compute Engine. */
  computeEngineDisksTargetDetails?: ComputeEngineDisksTargetDetails;
  /** Output only. Details of the VM to create as the target of this clone job. Deprecated: Use compute_engine_target_details instead. */
  targetDetails?: TargetVMDetails;
}

export const CloneJob: Schema.Schema<CloneJob> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      stateTime: Schema.optional(Schema.String),
      computeEngineTargetDetails: Schema.optional(ComputeEngineTargetDetails),
      steps: Schema.optional(Schema.Array(CloneStep)),
      endTime: Schema.optional(Schema.String),
      error: Schema.optional(Status),
      createTime: Schema.optional(Schema.String),
      computeEngineVmDetails: Schema.optional(TargetVMDetails),
      computeEngineDisksTargetDetails: Schema.optional(
        ComputeEngineDisksTargetDetails,
      ),
      targetDetails: Schema.optional(TargetVMDetails),
    }),
  ).annotate({ identifier: "CloneJob" }) as any as Schema.Schema<CloneJob>;

export interface ListCloneJobsResponse {
  /** Output only. Locations that could not be reached. */
  unreachable?: Array<string>;
  /** Output only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Output only. The list of clone jobs response. */
  cloneJobs?: Array<CloneJob>;
}

export const ListCloneJobsResponse: Schema.Schema<ListCloneJobsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      nextPageToken: Schema.optional(Schema.String),
      cloneJobs: Schema.optional(Schema.Array(CloneJob)),
    }),
  ).annotate({
    identifier: "ListCloneJobsResponse",
  }) as any as Schema.Schema<ListCloneJobsResponse>;

export interface Location {
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
}

export const Location: Schema.Schema<Location> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      locationId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      name: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      locations: Schema.optional(Schema.Array(Location)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListLocationsResponse",
  }) as any as Schema.Schema<ListLocationsResponse>;

export interface UpgradeApplianceRequest {
  /** A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const UpgradeApplianceRequest: Schema.Schema<UpgradeApplianceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requestId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpgradeApplianceRequest",
  }) as any as Schema.Schema<UpgradeApplianceRequest>;

export interface ShuttingDownSourceVMStep {}

export const ShuttingDownSourceVMStep: Schema.Schema<ShuttingDownSourceVMStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ShuttingDownSourceVMStep",
  }) as any as Schema.Schema<ShuttingDownSourceVMStep>;

export interface ResumeMigrationRequest {}

export const ResumeMigrationRequest: Schema.Schema<ResumeMigrationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ResumeMigrationRequest",
  }) as any as Schema.Schema<ResumeMigrationRequest>;

export interface LocalizedMessage {
  /** The locale used following the specification defined at https://www.rfc-editor.org/rfc/bcp/bcp47.txt. Examples are: "en-US", "fr-CH", "es-MX" */
  locale?: string;
  /** The localized error message in the above locale. */
  message?: string;
}

export const LocalizedMessage: Schema.Schema<LocalizedMessage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      locale: Schema.optional(Schema.String),
      message: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LocalizedMessage",
  }) as any as Schema.Schema<LocalizedMessage>;

export interface Link {
  /** The URL of the link. */
  url?: string;
  /** Describes what the link offers. */
  description?: string;
}

export const Link: Schema.Schema<Link> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Link" }) as any as Schema.Schema<Link>;

export interface MigrationError {
  /** Output only. The error code. */
  code?:
    | "ERROR_CODE_UNSPECIFIED"
    | "UNKNOWN_ERROR"
    | "SOURCE_VALIDATION_ERROR"
    | "SOURCE_REPLICATION_ERROR"
    | "TARGET_REPLICATION_ERROR"
    | "OS_ADAPTATION_ERROR"
    | "CLONE_ERROR"
    | "CUTOVER_ERROR"
    | "UTILIZATION_REPORT_ERROR"
    | "APPLIANCE_UPGRADE_ERROR"
    | "IMAGE_IMPORT_ERROR"
    | "DISK_MIGRATION_ERROR"
    | (string & {});
  /** Output only. The localized error message. */
  errorMessage?: LocalizedMessage;
  /** Output only. URL(s) pointing to additional information on handling the current error. */
  helpLinks?: Array<Link>;
  /** Output only. The time the error occurred. */
  errorTime?: string;
  /** Output only. Suggested action for solving the error. */
  actionItem?: LocalizedMessage;
}

export const MigrationError: Schema.Schema<MigrationError> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.String),
      errorMessage: Schema.optional(LocalizedMessage),
      helpLinks: Schema.optional(Schema.Array(Link)),
      errorTime: Schema.optional(Schema.String),
      actionItem: Schema.optional(LocalizedMessage),
    }),
  ).annotate({
    identifier: "MigrationError",
  }) as any as Schema.Schema<MigrationError>;

export interface ImageImportOsAdaptationParameters {
  /** Optional. Modifiers to be used as configuration of the OS adaptation process. */
  adaptationModifiers?: Array<AdaptationModifier>;
  /** Optional. Choose which type of license to apply to the imported image. */
  licenseType?:
    | "COMPUTE_ENGINE_LICENSE_TYPE_DEFAULT"
    | "COMPUTE_ENGINE_LICENSE_TYPE_PAYG"
    | "COMPUTE_ENGINE_LICENSE_TYPE_BYOL"
    | (string & {});
  /** Optional. Set to true in order to generalize the imported image. The generalization process enables co-existence of multiple VMs created from the same image. For Windows, generalizing the image removes computer-specific information such as installed drivers and the computer security identifier (SID). */
  generalize?: boolean;
  /** Optional. By default the image will keep its existing boot option. Setting this property will trigger an internal process which will convert the image from using the existing boot option to another. The size of the boot disk might be increased to allow the conversion */
  bootConversion?:
    | "BOOT_CONVERSION_UNSPECIFIED"
    | "NONE"
    | "BIOS_TO_EFI"
    | (string & {});
}

export const ImageImportOsAdaptationParameters: Schema.Schema<ImageImportOsAdaptationParameters> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      adaptationModifiers: Schema.optional(Schema.Array(AdaptationModifier)),
      licenseType: Schema.optional(Schema.String),
      generalize: Schema.optional(Schema.Boolean),
      bootConversion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ImageImportOsAdaptationParameters",
  }) as any as Schema.Schema<ImageImportOsAdaptationParameters>;

export interface DataDiskImageImport {
  /** Optional. A list of guest OS features to apply to the imported image. These features are flags that are used by Compute Engine to enable certain capabilities for virtual machine instances that are created from the image. This field does not change the OS of the image; it only marks the image with the specified features. The user must ensure that the OS is compatible with the features. For a list of available features, see https://cloud.google.com/compute/docs/images/create-custom#guest-os-features. */
  guestOsFeatures?: Array<string>;
}

export const DataDiskImageImport: Schema.Schema<DataDiskImageImport> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      guestOsFeatures: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "DataDiskImageImport",
  }) as any as Schema.Schema<DataDiskImageImport>;

export interface DiskImageTargetDetails {
  /** Required. Reference to the TargetProject resource that represents the target project in which the imported image will be created. */
  targetProject?: string;
  /** Optional. The name of the image family to which the new image belongs. */
  familyName?: string;
  /** Required. The name of the image to be created. */
  imageName?: string;
  /** Optional. Use to set the parameters relevant for the OS adaptation process. */
  osAdaptationParameters?: ImageImportOsAdaptationParameters;
  /** Optional. Use to skip OS adaptation process. */
  dataDiskImageImport?: DataDiskImageImport;
  /** Optional. Additional licenses to assign to the image. Format: https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/licenses/LICENSE_NAME Or https://www.googleapis.com/compute/beta/projects/PROJECT_ID/global/licenses/LICENSE_NAME */
  additionalLicenses?: Array<string>;
  /** Immutable. The encryption to apply to the image. */
  encryption?: Encryption;
  /** Optional. A map of labels to associate with the image. */
  labels?: Record<string, string>;
  /** Optional. Set to true to set the image storageLocations to the single region of the import job. When false, the closest multi-region is selected. */
  singleRegionStorage?: boolean;
  /** Optional. An optional description of the image. */
  description?: string;
}

export const DiskImageTargetDetails: Schema.Schema<DiskImageTargetDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetProject: Schema.optional(Schema.String),
      familyName: Schema.optional(Schema.String),
      imageName: Schema.optional(Schema.String),
      osAdaptationParameters: Schema.optional(
        ImageImportOsAdaptationParameters,
      ),
      dataDiskImageImport: Schema.optional(DataDiskImageImport),
      additionalLicenses: Schema.optional(Schema.Array(Schema.String)),
      encryption: Schema.optional(Encryption),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      singleRegionStorage: Schema.optional(Schema.Boolean),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DiskImageTargetDetails",
  }) as any as Schema.Schema<DiskImageTargetDetails>;

export interface LoadingImageSourceFilesStep {}

export const LoadingImageSourceFilesStep: Schema.Schema<LoadingImageSourceFilesStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "LoadingImageSourceFilesStep",
  }) as any as Schema.Schema<LoadingImageSourceFilesStep>;

export interface InitializingImageImportStep {}

export const InitializingImageImportStep: Schema.Schema<InitializingImageImportStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "InitializingImageImportStep",
  }) as any as Schema.Schema<InitializingImageImportStep>;

export interface CreatingImageStep {}

export const CreatingImageStep: Schema.Schema<CreatingImageStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CreatingImageStep",
  }) as any as Schema.Schema<CreatingImageStep>;

export interface ImageImportStep {
  /** Loading source files step. */
  loadingSourceFiles?: LoadingImageSourceFilesStep;
  /** Adapting OS step. */
  adaptingOs?: AdaptingOSStep;
  /** Initializing step. */
  initializing?: InitializingImageImportStep;
  /** Output only. The time the step has started. */
  startTime?: string;
  /** Creating image step. */
  creatingImage?: CreatingImageStep;
  /** Output only. The time the step has ended. */
  endTime?: string;
}

export const ImageImportStep: Schema.Schema<ImageImportStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      loadingSourceFiles: Schema.optional(LoadingImageSourceFilesStep),
      adaptingOs: Schema.optional(AdaptingOSStep),
      initializing: Schema.optional(InitializingImageImportStep),
      startTime: Schema.optional(Schema.String),
      creatingImage: Schema.optional(CreatingImageStep),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ImageImportStep",
  }) as any as Schema.Schema<ImageImportStep>;

export interface MigrationWarning {
  /** Output only. URL(s) pointing to additional information on handling the current warning. */
  helpLinks?: Array<Link>;
  /** Output only. Suggested action for solving the warning. */
  actionItem?: LocalizedMessage;
  /** The warning code. */
  code?: "WARNING_CODE_UNSPECIFIED" | "ADAPTATION_WARNING" | (string & {});
  /** Output only. The localized warning message. */
  warningMessage?: LocalizedMessage;
  /** The time the warning occurred. */
  warningTime?: string;
}

export const MigrationWarning: Schema.Schema<MigrationWarning> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      helpLinks: Schema.optional(Schema.Array(Link)),
      actionItem: Schema.optional(LocalizedMessage),
      code: Schema.optional(Schema.String),
      warningMessage: Schema.optional(LocalizedMessage),
      warningTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MigrationWarning",
  }) as any as Schema.Schema<MigrationWarning>;

export interface SkipOsAdaptation {}

export const SkipOsAdaptation: Schema.Schema<SkipOsAdaptation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "SkipOsAdaptation",
  }) as any as Schema.Schema<SkipOsAdaptation>;

export interface ShieldedInstanceConfig {
  /** Optional. Defines whether the instance created by the machine image has Secure Boot enabled. This can be set to true only if the image boot option is EFI. */
  secureBoot?: "SECURE_BOOT_UNSPECIFIED" | "TRUE" | "FALSE" | (string & {});
  /** Optional. Defines whether the instance created by the machine image has vTPM enabled. This can be set to true only if the image boot option is EFI. */
  enableVtpm?: boolean;
  /** Optional. Defines whether the instance created by the machine image has integrity monitoring enabled. This can be set to true only if the image boot option is EFI, and vTPM is enabled. */
  enableIntegrityMonitoring?: boolean;
}

export const ShieldedInstanceConfig: Schema.Schema<ShieldedInstanceConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      secureBoot: Schema.optional(Schema.String),
      enableVtpm: Schema.optional(Schema.Boolean),
      enableIntegrityMonitoring: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ShieldedInstanceConfig",
  }) as any as Schema.Schema<ShieldedInstanceConfig>;

export interface MachineImageTargetDetails {
  /** Optional. Set to true to set the machine image storageLocations to the single region of the import job. When false, the closest multi-region is selected. */
  singleRegionStorage?: boolean;
  /** Optional. The labels to apply to the instance created by the machine image. */
  labels?: Record<string, string>;
  /** Optional. The tags to apply to the instance created by the machine image. */
  tags?: Array<string>;
  /** Required. The name of the machine image to be created. */
  machineImageName?: string;
  /** Optional. The service account to assign to the instance created by the machine image. */
  serviceAccount?: ServiceAccount;
  /** Optional. Use to skip OS adaptation process. */
  skipOsAdaptation?: SkipOsAdaptation;
  /** Optional. Additional licenses to assign to the instance created by the machine image. Format: https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/licenses/LICENSE_NAME Or https://www.googleapis.com/compute/beta/projects/PROJECT_ID/global/licenses/LICENSE_NAME */
  additionalLicenses?: Array<string>;
  /** Required. Reference to the TargetProject resource that represents the target project in which the imported machine image will be created. */
  targetProject?: string;
  /** Immutable. The encryption to apply to the machine image. If the Image Import resource has an encryption, this field must be set to the same encryption key. */
  encryption?: Encryption;
  /** Optional. Shielded instance configuration. */
  shieldedInstanceConfig?: ShieldedInstanceConfig;
  /** Optional. An optional description of the machine image. */
  description?: string;
  /** Optional. Use to set the parameters relevant for the OS adaptation process. */
  osAdaptationParameters?: ImageImportOsAdaptationParameters;
  /** Optional. The network interfaces to create with the instance created by the machine image. Internal and external IP addresses, and network tiers are ignored for machine image import. */
  networkInterfaces?: Array<NetworkInterface>;
  /** Optional. Parameters overriding decisions based on the source machine image configurations. */
  machineImageParametersOverrides?: MachineImageParametersOverrides;
}

export const MachineImageTargetDetails: Schema.Schema<MachineImageTargetDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      singleRegionStorage: Schema.optional(Schema.Boolean),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      tags: Schema.optional(Schema.Array(Schema.String)),
      machineImageName: Schema.optional(Schema.String),
      serviceAccount: Schema.optional(ServiceAccount),
      skipOsAdaptation: Schema.optional(SkipOsAdaptation),
      additionalLicenses: Schema.optional(Schema.Array(Schema.String)),
      targetProject: Schema.optional(Schema.String),
      encryption: Schema.optional(Encryption),
      shieldedInstanceConfig: Schema.optional(ShieldedInstanceConfig),
      description: Schema.optional(Schema.String),
      osAdaptationParameters: Schema.optional(
        ImageImportOsAdaptationParameters,
      ),
      networkInterfaces: Schema.optional(Schema.Array(NetworkInterface)),
      machineImageParametersOverrides: Schema.optional(
        MachineImageParametersOverrides,
      ),
    }),
  ).annotate({
    identifier: "MachineImageTargetDetails",
  }) as any as Schema.Schema<MachineImageTargetDetails>;

export interface ImageImportJob {
  /** Output only. Target details used to import a disk image. */
  diskImageTargetDetails?: DiskImageTargetDetails;
  /** Output only. Provides details on the error that led to the image import state in case of an error. */
  errors?: Array<Status>;
  /** Output only. The resource path of the ImageImportJob. */
  name?: string;
  /** Output only. The image import steps list representing its progress. */
  steps?: Array<ImageImportStep>;
  /** Output only. Warnings that occurred during the image import. */
  warnings?: Array<MigrationWarning>;
  /** Output only. The state of the image import. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PENDING"
    | "RUNNING"
    | "SUCCEEDED"
    | "FAILED"
    | "CANCELLING"
    | "CANCELLED"
    | (string & {});
  /** Output only. The time the image import was created (as an API call, not when it was actually created in the target). */
  createTime?: string;
  /** Output only. The resource paths of the resources created by the image import job. */
  createdResources?: Array<string>;
  /** Output only. The time the image import was ended. */
  endTime?: string;
  /** Output only. Target details used to import a machine image. */
  machineImageTargetDetails?: MachineImageTargetDetails;
  /** Output only. The path to the Cloud Storage file from which the image should be imported. */
  cloudStorageUri?: string;
}

export const ImageImportJob: Schema.Schema<ImageImportJob> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      diskImageTargetDetails: Schema.optional(DiskImageTargetDetails),
      errors: Schema.optional(Schema.Array(Status)),
      name: Schema.optional(Schema.String),
      steps: Schema.optional(Schema.Array(ImageImportStep)),
      warnings: Schema.optional(Schema.Array(MigrationWarning)),
      state: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      createdResources: Schema.optional(Schema.Array(Schema.String)),
      endTime: Schema.optional(Schema.String),
      machineImageTargetDetails: Schema.optional(MachineImageTargetDetails),
      cloudStorageUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ImageImportJob",
  }) as any as Schema.Schema<ImageImportJob>;

export interface RunDiskMigrationJobRequest {}

export const RunDiskMigrationJobRequest: Schema.Schema<RunDiskMigrationJobRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "RunDiskMigrationJobRequest",
  }) as any as Schema.Schema<RunDiskMigrationJobRequest>;

export interface VmwareSourceDetails {
  /** The ip address of the vcenter this Source represents. */
  vcenterIp?: string;
  /** The hostname of the vcenter. */
  resolvedVcenterHost?: string;
  /** The credentials username. */
  username?: string;
  /** The thumbprint representing the certificate for the vcenter. */
  thumbprint?: string;
  /** Input only. The credentials password. This is write only and can not be read in a GET operation. */
  password?: string;
}

export const VmwareSourceDetails: Schema.Schema<VmwareSourceDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vcenterIp: Schema.optional(Schema.String),
      resolvedVcenterHost: Schema.optional(Schema.String),
      username: Schema.optional(Schema.String),
      thumbprint: Schema.optional(Schema.String),
      password: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VmwareSourceDetails",
  }) as any as Schema.Schema<VmwareSourceDetails>;

export interface ClientSecretCredentials {
  /** Azure client ID. */
  clientId?: string;
  /** Input only. Azure client secret. */
  clientSecret?: string;
  /** Azure tenant ID. */
  tenantId?: string;
}

export const ClientSecretCredentials: Schema.Schema<ClientSecretCredentials> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      clientId: Schema.optional(Schema.String),
      clientSecret: Schema.optional(Schema.String),
      tenantId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ClientSecretCredentials",
  }) as any as Schema.Schema<ClientSecretCredentials>;

export interface AzureSourceDetails {
  /** Output only. The ID of the Azure resource group that contains all resources related to the migration process of this source. */
  resourceGroupId?: string;
  /** Immutable. The Azure location (region) that the source VMs will be migrated from. */
  azureLocation?: string;
  /** Immutable. Azure subscription ID. */
  subscriptionId?: string;
  /** Output only. State of the source as determined by the health check. */
  state?: "STATE_UNSPECIFIED" | "PENDING" | "FAILED" | "ACTIVE" | (string & {});
  /** Azure Credentials using tenant ID, client ID and secret. */
  clientSecretCreds?: ClientSecretCredentials;
  /** User specified tags to add to every M2VM generated resource in Azure. These tags will be set in addition to the default tags that are set as part of the migration process. The tags must not begin with the reserved prefix `m4ce` or `m2vm`. */
  migrationResourcesUserTags?: Record<string, string>;
  /** Output only. Provides details on the state of the Source in case of an error. */
  error?: Status;
}

export const AzureSourceDetails: Schema.Schema<AzureSourceDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceGroupId: Schema.optional(Schema.String),
      azureLocation: Schema.optional(Schema.String),
      subscriptionId: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      clientSecretCreds: Schema.optional(ClientSecretCredentials),
      migrationResourcesUserTags: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      error: Schema.optional(Status),
    }),
  ).annotate({
    identifier: "AzureSourceDetails",
  }) as any as Schema.Schema<AzureSourceDetails>;

export interface Source {
  /** AWS type source details. */
  aws?: AwsSourceDetails;
  /** Optional. Immutable. The encryption details of the source data stored by the service. */
  encryption?: Encryption;
  /** Output only. The update time timestamp. */
  updateTime?: string;
  /** Output only. The create time timestamp. */
  createTime?: string;
  /** Output only. The Source name. */
  name?: string;
  /** The labels of the source. */
  labels?: Record<string, string>;
  /** Vmware type source details. */
  vmware?: VmwareSourceDetails;
  /** Output only. Provides details on the state of the Source in case of an error. */
  error?: Status;
  /** Azure type source details. */
  azure?: AzureSourceDetails;
  /** User-provided description of the source. */
  description?: string;
}

export const Source: Schema.Schema<Source> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      aws: Schema.optional(AwsSourceDetails),
      encryption: Schema.optional(Encryption),
      updateTime: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      vmware: Schema.optional(VmwareSourceDetails),
      error: Schema.optional(Status),
      azure: Schema.optional(AzureSourceDetails),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Source" }) as any as Schema.Schema<Source>;

export interface ListSourcesResponse {
  /** Output only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Output only. The list of sources response. */
  sources?: Array<Source>;
  /** Output only. Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListSourcesResponse: Schema.Schema<ListSourcesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      sources: Schema.optional(Schema.Array(Source)),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListSourcesResponse",
  }) as any as Schema.Schema<ListSourcesResponse>;

export interface ApplianceVersion {
  /** The appliance version. */
  version?: string;
  /** A link for downloading the version. */
  uri?: string;
  /** Link to a page that contains the version release notes. */
  releaseNotesUri?: string;
  /** Determine whether it's critical to upgrade the appliance to this version. */
  critical?: boolean;
}

export const ApplianceVersion: Schema.Schema<ApplianceVersion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
      releaseNotesUri: Schema.optional(Schema.String),
      critical: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ApplianceVersion",
  }) as any as Schema.Schema<ApplianceVersion>;

export interface StartMigrationRequest {}

export const StartMigrationRequest: Schema.Schema<StartMigrationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "StartMigrationRequest",
  }) as any as Schema.Schema<StartMigrationRequest>;

export interface AwsSourceDiskDetails {
  /** Optional. Output only. Disk type. */
  diskType?:
    | "TYPE_UNSPECIFIED"
    | "GP2"
    | "GP3"
    | "IO1"
    | "IO2"
    | "ST1"
    | "SC1"
    | "STANDARD"
    | (string & {});
  /** Required. AWS volume ID. */
  volumeId?: string;
  /** Output only. Size in GiB. */
  sizeGib?: string;
  /** Optional. Output only. A map of AWS volume tags. */
  tags?: Record<string, string>;
}

export const AwsSourceDiskDetails: Schema.Schema<AwsSourceDiskDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      diskType: Schema.optional(Schema.String),
      volumeId: Schema.optional(Schema.String),
      sizeGib: Schema.optional(Schema.String),
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "AwsSourceDiskDetails",
  }) as any as Schema.Schema<AwsSourceDiskDetails>;

export interface ComputeEngineDisk {
  /** Optional. Replication zones of the regional disk. Should be of the form: projects/{target-project}/locations/{replica-zone} Currently only one replica zone is supported. */
  replicaZones?: Array<string>;
  /** Optional. Target Compute Engine Disk ID. This is the resource ID segment of the Compute Engine Disk to create. In the resource name compute/v1/projects/{project}/zones/{zone}/disks/disk1 "disk1" is the resource ID for the disk. */
  diskId?: string;
  /** Required. The disk type to use. */
  diskType?:
    | "COMPUTE_ENGINE_DISK_TYPE_UNSPECIFIED"
    | "COMPUTE_ENGINE_DISK_TYPE_STANDARD"
    | "COMPUTE_ENGINE_DISK_TYPE_SSD"
    | "COMPUTE_ENGINE_DISK_TYPE_BALANCED"
    | "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED"
    | "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED_HIGH_AVAILABILITY"
    | (string & {});
  /** Required. The Compute Engine zone in which to create the disk. Should be of the form: projects/{target-project}/locations/{zone} */
  zone?: string;
}

export const ComputeEngineDisk: Schema.Schema<ComputeEngineDisk> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      replicaZones: Schema.optional(Schema.Array(Schema.String)),
      diskId: Schema.optional(Schema.String),
      diskType: Schema.optional(Schema.String),
      zone: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ComputeEngineDisk",
  }) as any as Schema.Schema<ComputeEngineDisk>;

export interface DiskMigrationJobTargetDetails {
  /** Required. The target disk. */
  targetDisk?: ComputeEngineDisk;
  /** Optional. A map of labels to associate with the disk. */
  labels?: Record<string, string>;
  /** Optional. The encryption to apply to the disk. If the DiskMigrationJob parent Source resource has an encryption, this field must be set to the same encryption key. */
  encryption?: Encryption;
  /** Required. The name of the resource of type TargetProject which represents the Compute Engine project in which to create the disk. Should be of the form: projects/{project}/locations/global/targetProjects/{target-project} */
  targetProject?: string;
}

export const DiskMigrationJobTargetDetails: Schema.Schema<DiskMigrationJobTargetDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetDisk: Schema.optional(ComputeEngineDisk),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      encryption: Schema.optional(Encryption),
      targetProject: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DiskMigrationJobTargetDetails",
  }) as any as Schema.Schema<DiskMigrationJobTargetDetails>;

export interface CopyingSourceDiskSnapshotStep {}

export const CopyingSourceDiskSnapshotStep: Schema.Schema<CopyingSourceDiskSnapshotStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CopyingSourceDiskSnapshotStep",
  }) as any as Schema.Schema<CopyingSourceDiskSnapshotStep>;

export interface CreatingSourceDiskSnapshotStep {}

export const CreatingSourceDiskSnapshotStep: Schema.Schema<CreatingSourceDiskSnapshotStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CreatingSourceDiskSnapshotStep",
  }) as any as Schema.Schema<CreatingSourceDiskSnapshotStep>;

export interface DiskMigrationStep {
  /** Copying source disk snapshot step. */
  copyingSourceDiskSnapshot?: CopyingSourceDiskSnapshotStep;
  /** Creating source disk snapshot step. */
  creatingSourceDiskSnapshot?: CreatingSourceDiskSnapshotStep;
  /** Creating target disk step. */
  provisioningTargetDisk?: ProvisioningTargetDiskStep;
  /** Output only. The time the step has ended. */
  endTime?: string;
  /** Output only. The time the step has started. */
  startTime?: string;
}

export const DiskMigrationStep: Schema.Schema<DiskMigrationStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      copyingSourceDiskSnapshot: Schema.optional(CopyingSourceDiskSnapshotStep),
      creatingSourceDiskSnapshot: Schema.optional(
        CreatingSourceDiskSnapshotStep,
      ),
      provisioningTargetDisk: Schema.optional(ProvisioningTargetDiskStep),
      endTime: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DiskMigrationStep",
  }) as any as Schema.Schema<DiskMigrationStep>;

export interface DiskMigrationJob {
  /** Details of the unattached AWS source disk. */
  awsSourceDiskDetails?: AwsSourceDiskDetails;
  /** Required. Details of the target Disk in Compute Engine. */
  targetDetails?: DiskMigrationJobTargetDetails;
  /** Output only. The disk migration steps list representing its progress. */
  steps?: Array<DiskMigrationStep>;
  /** Output only. Provides details on the errors that led to the disk migration job's state in case of an error. */
  errors?: Array<Status>;
  /** Output only. Identifier. The identifier of the DiskMigrationJob. */
  name?: string;
  /** Output only. The last time the DiskMigrationJob resource was updated. */
  updateTime?: string;
  /** Output only. The time the DiskMigrationJob resource was created. */
  createTime?: string;
  /** Output only. State of the DiskMigrationJob. */
  state?:
    | "STATE_UNSPECIFIED"
    | "READY"
    | "RUNNING"
    | "SUCCEEDED"
    | "CANCELLING"
    | "CANCELLED"
    | "FAILED"
    | (string & {});
}

export const DiskMigrationJob: Schema.Schema<DiskMigrationJob> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      awsSourceDiskDetails: Schema.optional(AwsSourceDiskDetails),
      targetDetails: Schema.optional(DiskMigrationJobTargetDetails),
      steps: Schema.optional(Schema.Array(DiskMigrationStep)),
      errors: Schema.optional(Schema.Array(Status)),
      name: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DiskMigrationJob",
  }) as any as Schema.Schema<DiskMigrationJob>;

export interface ListDiskMigrationJobsResponse {
  /** Optional. Output only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Output only. Locations that could not be reached. */
  unreachable?: Array<string>;
  /** Output only. The list of the disk migration jobs. */
  diskMigrationJobs?: Array<DiskMigrationJob>;
}

export const ListDiskMigrationJobsResponse: Schema.Schema<ListDiskMigrationJobsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      diskMigrationJobs: Schema.optional(Schema.Array(DiskMigrationJob)),
    }),
  ).annotate({
    identifier: "ListDiskMigrationJobsResponse",
  }) as any as Schema.Schema<ListDiskMigrationJobsResponse>;

export interface FinalizeMigrationRequest {}

export const FinalizeMigrationRequest: Schema.Schema<FinalizeMigrationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "FinalizeMigrationRequest",
  }) as any as Schema.Schema<FinalizeMigrationRequest>;

export interface PostProcessingStep {}

export const PostProcessingStep: Schema.Schema<PostProcessingStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "PostProcessingStep",
  }) as any as Schema.Schema<PostProcessingStep>;

export interface InitializingReplicationStep {}

export const InitializingReplicationStep: Schema.Schema<InitializingReplicationStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "InitializingReplicationStep",
  }) as any as Schema.Schema<InitializingReplicationStep>;

export interface CycleStep {
  /** Post processing step. */
  postProcessing?: PostProcessingStep;
  /** Replicating step. */
  replicating?: ReplicatingStep;
  /** The time the cycle step has started. */
  startTime?: string;
  /** Initializing replication step. */
  initializingReplication?: InitializingReplicationStep;
  /** The time the cycle step has ended. */
  endTime?: string;
}

export const CycleStep: Schema.Schema<CycleStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      postProcessing: Schema.optional(PostProcessingStep),
      replicating: Schema.optional(ReplicatingStep),
      startTime: Schema.optional(Schema.String),
      initializingReplication: Schema.optional(InitializingReplicationStep),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "CycleStep" }) as any as Schema.Schema<CycleStep>;

export interface ReplicationCycle {
  /** The accumulated duration the replication cycle was paused. */
  totalPauseDuration?: string;
  /** The time the replication cycle has ended. */
  endTime?: string;
  /** The cycle's steps list representing its progress. */
  steps?: Array<CycleStep>;
  /** Output only. Provides details on the state of the cycle in case of an error. */
  error?: Status;
  /** The time the replication cycle has started. */
  startTime?: string;
  /** The cycle's ordinal number. */
  cycleNumber?: number;
  /** The current progress in percentage of this cycle. */
  progress?: number;
  /** Output only. Warnings that occurred during the cycle. */
  warnings?: Array<MigrationWarning>;
  /** The identifier of the ReplicationCycle. */
  name?: string;
  /** State of the ReplicationCycle. */
  state?:
    | "STATE_UNSPECIFIED"
    | "RUNNING"
    | "PAUSED"
    | "FAILED"
    | "SUCCEEDED"
    | (string & {});
  /** The current progress in percentage of this cycle. Was replaced by 'steps' field, which breaks down the cycle progression more accurately. */
  progressPercent?: number;
}

export const ReplicationCycle: Schema.Schema<ReplicationCycle> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      totalPauseDuration: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      steps: Schema.optional(Schema.Array(CycleStep)),
      error: Schema.optional(Status),
      startTime: Schema.optional(Schema.String),
      cycleNumber: Schema.optional(Schema.Number),
      progress: Schema.optional(Schema.Number),
      warnings: Schema.optional(Schema.Array(MigrationWarning)),
      name: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      progressPercent: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ReplicationCycle",
  }) as any as Schema.Schema<ReplicationCycle>;

export interface CutoverStep {
  /** Final sync step. */
  finalSync?: ReplicationCycle;
  /** Instantiating migrated VM step. */
  instantiatingMigratedVm?: InstantiatingMigratedVMStep;
  /** The time the step has ended. */
  endTime?: string;
  /** A replication cycle prior cutover step. */
  previousReplicationCycle?: ReplicationCycle;
  /** Shutting down VM step. */
  shuttingDownSourceVm?: ShuttingDownSourceVMStep;
  /** Preparing VM disks step. */
  preparingVmDisks?: PreparingVMDisksStep;
  /** The time the step has started. */
  startTime?: string;
}

export const CutoverStep: Schema.Schema<CutoverStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      finalSync: Schema.optional(ReplicationCycle),
      instantiatingMigratedVm: Schema.optional(InstantiatingMigratedVMStep),
      endTime: Schema.optional(Schema.String),
      previousReplicationCycle: Schema.optional(ReplicationCycle),
      shuttingDownSourceVm: Schema.optional(ShuttingDownSourceVMStep),
      preparingVmDisks: Schema.optional(PreparingVMDisksStep),
      startTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CutoverStep",
  }) as any as Schema.Schema<CutoverStep>;

export interface CutoverJob {
  /** Output only. The current progress in percentage of the cutover job. */
  progressPercent?: number;
  /** Output only. Details of the target VM in Compute Engine. */
  computeEngineTargetDetails?: ComputeEngineTargetDetails;
  /** Output only. The time the cutover job had finished. */
  endTime?: string;
  /** Output only. The current progress in percentage of the cutover job. */
  progress?: number;
  /** Output only. A message providing possible extra details about the current state. */
  stateMessage?: string;
  /** Output only. The time the cutover job was created (as an API call, not when it was actually created in the target). */
  createTime?: string;
  /** Output only. Details of the VM in Compute Engine. Deprecated: Use compute_engine_target_details instead. */
  computeEngineVmDetails?: TargetVMDetails;
  /** Output only. The time the state was last updated. */
  stateTime?: string;
  /** Output only. The cutover steps list representing its progress. */
  steps?: Array<CutoverStep>;
  /** Output only. Details of the target Persistent Disks in Compute Engine. */
  computeEngineDisksTargetDetails?: ComputeEngineDisksTargetDetails;
  /** Output only. Details of the VM to create as the target of this cutover job. Deprecated: Use compute_engine_target_details instead. */
  targetDetails?: TargetVMDetails;
  /** Output only. Provides details for the errors that led to the Cutover Job's state. */
  error?: Status;
  /** Output only. The name of the cutover job. */
  name?: string;
  /** Output only. State of the cutover job. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PENDING"
    | "FAILED"
    | "SUCCEEDED"
    | "CANCELLED"
    | "CANCELLING"
    | "ACTIVE"
    | "ADAPTING_OS"
    | (string & {});
}

export const CutoverJob: Schema.Schema<CutoverJob> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      progressPercent: Schema.optional(Schema.Number),
      computeEngineTargetDetails: Schema.optional(ComputeEngineTargetDetails),
      endTime: Schema.optional(Schema.String),
      progress: Schema.optional(Schema.Number),
      stateMessage: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      computeEngineVmDetails: Schema.optional(TargetVMDetails),
      stateTime: Schema.optional(Schema.String),
      steps: Schema.optional(Schema.Array(CutoverStep)),
      computeEngineDisksTargetDetails: Schema.optional(
        ComputeEngineDisksTargetDetails,
      ),
      targetDetails: Schema.optional(TargetVMDetails),
      error: Schema.optional(Status),
      name: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "CutoverJob" }) as any as Schema.Schema<CutoverJob>;

export interface AzureDiskDetails {
  /** Output only. The ordinal number of the disk. */
  diskNumber?: number;
  /** Output only. Azure disk ID. */
  diskId?: string;
  /** Output only. Size in GB. */
  sizeGb?: string;
}

export const AzureDiskDetails: Schema.Schema<AzureDiskDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      diskNumber: Schema.optional(Schema.Number),
      diskId: Schema.optional(Schema.String),
      sizeGb: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AzureDiskDetails",
  }) as any as Schema.Schema<AzureDiskDetails>;

export interface ListTargetProjectsResponse {
  /** Output only. The list of target response. */
  targetProjects?: Array<TargetProject>;
  /** Output only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Output only. Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListTargetProjectsResponse: Schema.Schema<ListTargetProjectsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetProjects: Schema.optional(Schema.Array(TargetProject)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListTargetProjectsResponse",
  }) as any as Schema.Schema<ListTargetProjectsResponse>;

export interface UpgradeStatus {
  /** The version from which we upgraded. */
  previousVersion?: string;
  /** The version to upgrade to. */
  version?: string;
  /** The time the operation was started. */
  startTime?: string;
  /** Output only. Provides details on the state of the upgrade operation in case of an error. */
  error?: Status;
  /** The state of the upgradeAppliance operation. */
  state?:
    | "STATE_UNSPECIFIED"
    | "RUNNING"
    | "FAILED"
    | "SUCCEEDED"
    | (string & {});
}

export const UpgradeStatus: Schema.Schema<UpgradeStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      previousVersion: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
      error: Schema.optional(Status),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpgradeStatus",
  }) as any as Schema.Schema<UpgradeStatus>;

export interface AvailableUpdates {
  /** The newest deployable version of the appliance. The current appliance can't be updated into this version, and the owner must manually deploy this OVA to a new appliance. */
  newDeployableAppliance?: ApplianceVersion;
  /** The latest version for in place update. The current appliance can be updated to this version using the API or m4c CLI. */
  inPlaceUpdate?: ApplianceVersion;
}

export const AvailableUpdates: Schema.Schema<AvailableUpdates> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      newDeployableAppliance: Schema.optional(ApplianceVersion),
      inPlaceUpdate: Schema.optional(ApplianceVersion),
    }),
  ).annotate({
    identifier: "AvailableUpdates",
  }) as any as Schema.Schema<AvailableUpdates>;

export interface DatacenterConnector {
  /** Output only. Provides details on the state of the Datacenter Connector in case of an error. */
  error?: Status;
  /** Output only. Appliance last installed update bundle version. This is the version of the automatically updatable components on the appliance. */
  applianceSoftwareVersion?: string;
  /** Immutable. A unique key for this connector. This key is internal to the OVA connector and is supplied with its creation during the registration process and can not be modified. */
  registrationId?: string;
  /** The version running in the DatacenterConnector. This is supplied by the OVA connector during the registration process and can not be modified. */
  version?: string;
  /** Output only. The last time the connector was updated with an API call. */
  updateTime?: string;
  /** Output only. The connector's name. */
  name?: string;
  /** Output only. The communication channel between the datacenter connector and Google Cloud. */
  bucket?: string;
  /** Output only. The time the connector was created (as an API call, not when it was actually installed). */
  createTime?: string;
  /** Output only. The status of the current / last upgradeAppliance operation. */
  upgradeStatus?: UpgradeStatus;
  /** The service account to use in the connector when communicating with the cloud. */
  serviceAccount?: string;
  /** Output only. State of the DatacenterConnector, as determined by the health checks. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PENDING"
    | "OFFLINE"
    | "FAILED"
    | "ACTIVE"
    | (string & {});
  /** Output only. The time the state was last set. */
  stateTime?: string;
  /** Output only. The available versions for updating this appliance. */
  availableVersions?: AvailableUpdates;
  /** Output only. Appliance OVA version. This is the OVA which is manually installed by the user and contains the infrastructure for the automatically updatable components on the appliance. */
  applianceInfrastructureVersion?: string;
}

export const DatacenterConnector: Schema.Schema<DatacenterConnector> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      error: Schema.optional(Status),
      applianceSoftwareVersion: Schema.optional(Schema.String),
      registrationId: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      bucket: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      upgradeStatus: Schema.optional(UpgradeStatus),
      serviceAccount: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      stateTime: Schema.optional(Schema.String),
      availableVersions: Schema.optional(AvailableUpdates),
      applianceInfrastructureVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DatacenterConnector",
  }) as any as Schema.Schema<DatacenterConnector>;

export interface ListDatacenterConnectorsResponse {
  /** Output only. The list of sources response. */
  datacenterConnectors?: Array<DatacenterConnector>;
  /** Output only. Locations that could not be reached. */
  unreachable?: Array<string>;
  /** Output only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListDatacenterConnectorsResponse: Schema.Schema<ListDatacenterConnectorsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      datacenterConnectors: Schema.optional(Schema.Array(DatacenterConnector)),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListDatacenterConnectorsResponse",
  }) as any as Schema.Schema<ListDatacenterConnectorsResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface ListOperationsResponse {
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      nextPageToken: Schema.optional(Schema.String),
      operations: Schema.optional(Schema.Array(Operation)),
    }),
  ).annotate({
    identifier: "ListOperationsResponse",
  }) as any as Schema.Schema<ListOperationsResponse>;

export interface OSDisk {
  /** The disk's size in GB. */
  sizeGb?: number;
  /** The disk's full name. */
  name?: string;
  /** The disk's type. */
  type?: string;
}

export const OSDisk: Schema.Schema<OSDisk> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sizeGb: Schema.optional(Schema.Number),
      name: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "OSDisk" }) as any as Schema.Schema<OSDisk>;

export interface AzureVmDetails {
  /** The total size of the storage allocated to the VM in MB. */
  committedStorageMb?: string;
  /** Description of the OS. */
  osDescription?: OSDescription;
  /** Description of the data disks. */
  disks?: Array<Disk>;
  /** The memory size of the VM in MB. */
  memoryMb?: number;
  /** VM size as configured in Azure. Determines the VM's hardware spec. */
  vmSize?: string;
  /** The VM's ComputerName. */
  computerName?: string;
  /** The VM Boot Option. */
  bootOption?: "BOOT_OPTION_UNSPECIFIED" | "EFI" | "BIOS" | (string & {});
  /** Description of the OS disk. */
  osDisk?: OSDisk;
  /** The number of cpus the VM has. */
  cpuCount?: number;
  /** The VM full path in Azure. */
  vmId?: string;
  /** The number of disks the VM has, including OS disk. */
  diskCount?: number;
  /** The tags of the VM. */
  tags?: Record<string, string>;
  /** The power state of the VM at the moment list was taken. */
  powerState?:
    | "POWER_STATE_UNSPECIFIED"
    | "STARTING"
    | "RUNNING"
    | "STOPPING"
    | "STOPPED"
    | "DEALLOCATING"
    | "DEALLOCATED"
    | "UNKNOWN"
    | (string & {});
  /** The CPU architecture. */
  architecture?:
    | "VM_ARCHITECTURE_UNSPECIFIED"
    | "VM_ARCHITECTURE_X86_FAMILY"
    | "VM_ARCHITECTURE_ARM64"
    | (string & {});
}

export const AzureVmDetails: Schema.Schema<AzureVmDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      committedStorageMb: Schema.optional(Schema.String),
      osDescription: Schema.optional(OSDescription),
      disks: Schema.optional(Schema.Array(Disk)),
      memoryMb: Schema.optional(Schema.Number),
      vmSize: Schema.optional(Schema.String),
      computerName: Schema.optional(Schema.String),
      bootOption: Schema.optional(Schema.String),
      osDisk: Schema.optional(OSDisk),
      cpuCount: Schema.optional(Schema.Number),
      vmId: Schema.optional(Schema.String),
      diskCount: Schema.optional(Schema.Number),
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      powerState: Schema.optional(Schema.String),
      architecture: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AzureVmDetails",
  }) as any as Schema.Schema<AzureVmDetails>;

export interface AzureVmsDetails {
  /** The details of the Azure VMs. */
  details?: Array<AzureVmDetails>;
}

export const AzureVmsDetails: Schema.Schema<AzureVmsDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      details: Schema.optional(Schema.Array(AzureVmDetails)),
    }),
  ).annotate({
    identifier: "AzureVmsDetails",
  }) as any as Schema.Schema<AzureVmsDetails>;

export interface FetchInventoryResponse {
  /** Output only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The description of the VMs in a Source of type AWS. */
  awsVms?: AwsVmsDetails;
  /** The description of the VMs in a Source of type Vmware. */
  vmwareVms?: VmwareVmsDetails;
  /** Output only. The timestamp when the source was last queried (if the result is from the cache). */
  updateTime?: string;
  /** The description of the VMs in a Source of type Azure. */
  azureVms?: AzureVmsDetails;
}

export const FetchInventoryResponse: Schema.Schema<FetchInventoryResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      awsVms: Schema.optional(AwsVmsDetails),
      vmwareVms: Schema.optional(VmwareVmsDetails),
      updateTime: Schema.optional(Schema.String),
      azureVms: Schema.optional(AzureVmsDetails),
    }),
  ).annotate({
    identifier: "FetchInventoryResponse",
  }) as any as Schema.Schema<FetchInventoryResponse>;

export interface Expiration {
  /** Output only. Timestamp of when this resource is considered expired. */
  expireTime?: string;
  /** Output only. The number of times expiration was extended. */
  extensionCount?: number;
  /** Output only. Describes whether the expiration can be extended. */
  extendable?: boolean;
}

export const Expiration: Schema.Schema<Expiration> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      expireTime: Schema.optional(Schema.String),
      extensionCount: Schema.optional(Schema.Number),
      extendable: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "Expiration" }) as any as Schema.Schema<Expiration>;

export interface ComputeEngineTargetDefaults {
  /** The full path of the resource of type TargetProject which represents the Compute Engine project in which to create this VM. */
  targetProject?: string;
  /** The zone in which to create the VM. */
  zone?: string;
  /** Optional. Additional replica zones of the target regional disks. If this list is not empty a regional disk will be created. The first supported zone would be the one stated in the zone field. The rest are taken from this list. Please refer to the [regional disk creation API](https://cloud.google.com/compute/docs/regions-zones/global-regional-zonal-resources) for further details about regional vs zonal disks. If not specified, a zonal disk will be created in the same zone the VM is created. */
  diskReplicaZones?: Array<string>;
  /** Defines whether the instance has Secure Boot enabled. This can be set to true only if the VM boot option is EFI. */
  secureBoot?: boolean;
  /** Optional. The service account to associate the VM with. */
  serviceAccount?: string;
  /** The machine type to create the VM with. */
  machineType?: string;
  /** The name of the VM to create. */
  vmName?: string;
  /** A map of labels to associate with the VM. */
  labels?: Record<string, string>;
  /** Optional. Immutable. The encryption to apply to the VM disks. */
  encryption?: Encryption;
  /** Optional. Defines whether the instance has vTPM enabled. This can be set to true only if the VM boot option is EFI. */
  enableVtpm?: boolean;
  /** The metadata key/value pairs to assign to the VM. */
  metadata?: Record<string, string>;
  /** Compute instance scheduling information (if empty default is used). */
  computeScheduling?: ComputeScheduling;
  /** Optional. AdaptationModifiers are the set of modifiers used during OS adaptation. */
  adaptationModifiers?: Array<AdaptationModifier>;
  /** A list of network tags to associate with the VM. */
  networkTags?: Array<string>;
  /** List of NICs connected to this VM. */
  networkInterfaces?: Array<NetworkInterface>;
  /** Output only. The VM Boot Option, as set in the source VM. */
  bootOption?:
    | "COMPUTE_ENGINE_BOOT_OPTION_UNSPECIFIED"
    | "COMPUTE_ENGINE_BOOT_OPTION_EFI"
    | "COMPUTE_ENGINE_BOOT_OPTION_BIOS"
    | (string & {});
  /** Optional. Defines whether the instance has integrity monitoring enabled. This can be set to true only if the VM boot option is EFI, and vTPM is enabled. */
  enableIntegrityMonitoring?: boolean;
  /** The disk type to use in the VM. */
  diskType?:
    | "COMPUTE_ENGINE_DISK_TYPE_UNSPECIFIED"
    | "COMPUTE_ENGINE_DISK_TYPE_STANDARD"
    | "COMPUTE_ENGINE_DISK_TYPE_SSD"
    | "COMPUTE_ENGINE_DISK_TYPE_BALANCED"
    | "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED"
    | "COMPUTE_ENGINE_DISK_TYPE_HYPERDISK_BALANCED_HIGH_AVAILABILITY"
    | (string & {});
  /** Additional licenses to assign to the VM. */
  additionalLicenses?: Array<string>;
  /** The machine type series to create the VM with. */
  machineTypeSeries?: string;
  /** Output only. The OS license returned from the adaptation module report. */
  appliedLicense?: AppliedLicense;
  /** Optional. If specified this will be the storage pool in which the disk is created. This is the full path of the storage pool resource, for example: "projects/my-project/zones/us-central1-a/storagePools/my-storage-pool". The storage pool must be in the same project and zone as the target disks. The storage pool's type must match the disk type. */
  storagePool?: string;
  /** Optional. By default the virtual machine will keep its existing boot option. Setting this property will trigger an internal process which will convert the virtual machine from using the existing boot option to another. */
  bootConversion?:
    | "BOOT_CONVERSION_UNSPECIFIED"
    | "NONE"
    | "BIOS_TO_EFI"
    | (string & {});
  /** The license type to use in OS adaptation. */
  licenseType?:
    | "COMPUTE_ENGINE_LICENSE_TYPE_DEFAULT"
    | "COMPUTE_ENGINE_LICENSE_TYPE_PAYG"
    | "COMPUTE_ENGINE_LICENSE_TYPE_BYOL"
    | (string & {});
  /** The hostname to assign to the VM. */
  hostname?: string;
}

export const ComputeEngineTargetDefaults: Schema.Schema<ComputeEngineTargetDefaults> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetProject: Schema.optional(Schema.String),
      zone: Schema.optional(Schema.String),
      diskReplicaZones: Schema.optional(Schema.Array(Schema.String)),
      secureBoot: Schema.optional(Schema.Boolean),
      serviceAccount: Schema.optional(Schema.String),
      machineType: Schema.optional(Schema.String),
      vmName: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      encryption: Schema.optional(Encryption),
      enableVtpm: Schema.optional(Schema.Boolean),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      computeScheduling: Schema.optional(ComputeScheduling),
      adaptationModifiers: Schema.optional(Schema.Array(AdaptationModifier)),
      networkTags: Schema.optional(Schema.Array(Schema.String)),
      networkInterfaces: Schema.optional(Schema.Array(NetworkInterface)),
      bootOption: Schema.optional(Schema.String),
      enableIntegrityMonitoring: Schema.optional(Schema.Boolean),
      diskType: Schema.optional(Schema.String),
      additionalLicenses: Schema.optional(Schema.Array(Schema.String)),
      machineTypeSeries: Schema.optional(Schema.String),
      appliedLicense: Schema.optional(AppliedLicense),
      storagePool: Schema.optional(Schema.String),
      bootConversion: Schema.optional(Schema.String),
      licenseType: Schema.optional(Schema.String),
      hostname: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ComputeEngineTargetDefaults",
  }) as any as Schema.Schema<ComputeEngineTargetDefaults>;

export interface VmwareDiskDetails {
  /** Output only. Size in GB. */
  sizeGb?: string;
  /** Output only. The disk label. */
  label?: string;
  /** Output only. The ordinal number of the disk. */
  diskNumber?: number;
}

export const VmwareDiskDetails: Schema.Schema<VmwareDiskDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sizeGb: Schema.optional(Schema.String),
      label: Schema.optional(Schema.String),
      diskNumber: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "VmwareDiskDetails",
  }) as any as Schema.Schema<VmwareDiskDetails>;

export interface VmUtilizationMetrics {
  /** Max network throughput (combined transmit-rates and receive-rates), in kilobytes per second. */
  networkThroughputMax?: string;
  /** Average network throughput (combined transmit-rates and receive-rates), in kilobytes per second. */
  networkThroughputAverageKbps?: string;
  /** Average memory usage, percent. */
  memoryAverage?: number;
  /** Max CPU usage, percent. */
  cpuMaxPercent?: number;
  /** Max memory usage, percent. */
  memoryMax?: number;
  /** Max network throughput (combined transmit-rates and receive-rates), in kilobytes per second. */
  networkThroughputMaxKbps?: string;
  /** Average disk IO rate, in kilobytes per second. */
  diskIoRateAverage?: string;
  /** Average disk IO rate, in kilobytes per second. */
  diskIoRateAverageKbps?: string;
  /** Average CPU usage, percent. */
  cpuAverage?: number;
  /** Max disk IO rate, in kilobytes per second. */
  diskIoRateMaxKbps?: string;
  /** Max disk IO rate, in kilobytes per second. */
  diskIoRateMax?: string;
  /** Max CPU usage, percent. */
  cpuMax?: number;
  /** Average CPU usage, percent. */
  cpuAveragePercent?: number;
  /** Average network throughput (combined transmit-rates and receive-rates), in kilobytes per second. */
  networkThroughputAverage?: string;
  /** Average memory usage, percent. */
  memoryAveragePercent?: number;
  /** Max memory usage, percent. */
  memoryMaxPercent?: number;
}

export const VmUtilizationMetrics: Schema.Schema<VmUtilizationMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      networkThroughputMax: Schema.optional(Schema.String),
      networkThroughputAverageKbps: Schema.optional(Schema.String),
      memoryAverage: Schema.optional(Schema.Number),
      cpuMaxPercent: Schema.optional(Schema.Number),
      memoryMax: Schema.optional(Schema.Number),
      networkThroughputMaxKbps: Schema.optional(Schema.String),
      diskIoRateAverage: Schema.optional(Schema.String),
      diskIoRateAverageKbps: Schema.optional(Schema.String),
      cpuAverage: Schema.optional(Schema.Number),
      diskIoRateMaxKbps: Schema.optional(Schema.String),
      diskIoRateMax: Schema.optional(Schema.String),
      cpuMax: Schema.optional(Schema.Number),
      cpuAveragePercent: Schema.optional(Schema.Number),
      networkThroughputAverage: Schema.optional(Schema.String),
      memoryAveragePercent: Schema.optional(Schema.Number),
      memoryMaxPercent: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "VmUtilizationMetrics",
  }) as any as Schema.Schema<VmUtilizationMetrics>;

export interface VmUtilizationInfo {
  /** Utilization metrics for this VM. */
  utilization?: VmUtilizationMetrics;
  /** The VM's ID in the source. */
  vmId?: string;
  /** The description of the VM in a Source of type Vmware. */
  vmwareVmDetails?: VmwareVmDetails;
}

export const VmUtilizationInfo: Schema.Schema<VmUtilizationInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      utilization: Schema.optional(VmUtilizationMetrics),
      vmId: Schema.optional(Schema.String),
      vmwareVmDetails: Schema.optional(VmwareVmDetails),
    }),
  ).annotate({
    identifier: "VmUtilizationInfo",
  }) as any as Schema.Schema<VmUtilizationInfo>;

export interface CutoverForecast {
  /** Output only. Estimation of the CutoverJob duration. */
  estimatedCutoverJobDuration?: string;
}

export const CutoverForecast: Schema.Schema<CutoverForecast> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      estimatedCutoverJobDuration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CutoverForecast",
  }) as any as Schema.Schema<CutoverForecast>;

export interface VmCapabilities {
  /** Output only. The last time OS capabilities list was updated. */
  lastOsCapabilitiesUpdateTime?: string;
  /** Output only. Unordered list. List of certain VM OS capabilities needed for some Compute Engine features. */
  osCapabilities?: Array<
    | "OS_CAPABILITY_UNSPECIFIED"
    | "OS_CAPABILITY_NVME_STORAGE_ACCESS"
    | "OS_CAPABILITY_GVNIC_NETWORK_INTERFACE"
    | "OS_CAPABILITY_IDPF_NETWORK_INTERFACE"
    | (string & {})
  >;
}

export const VmCapabilities: Schema.Schema<VmCapabilities> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lastOsCapabilitiesUpdateTime: Schema.optional(Schema.String),
      osCapabilities: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "VmCapabilities",
  }) as any as Schema.Schema<VmCapabilities>;

export interface AzureSourceVmDetails {
  /** Output only. The VM architecture. */
  architecture?:
    | "VM_ARCHITECTURE_UNSPECIFIED"
    | "VM_ARCHITECTURE_X86_FAMILY"
    | "VM_ARCHITECTURE_ARM64"
    | (string & {});
  /** Output only. Information about VM capabilities needed for some Compute Engine features. */
  vmCapabilitiesInfo?: VmCapabilities;
  /** Output only. The total size of the disks being migrated in bytes. */
  committedStorageBytes?: string;
  /** Output only. The disks attached to the source VM. */
  disks?: Array<AzureDiskDetails>;
  /** Output only. The firmware type of the source VM. */
  firmware?: "FIRMWARE_UNSPECIFIED" | "EFI" | "BIOS" | (string & {});
}

export const AzureSourceVmDetails: Schema.Schema<AzureSourceVmDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      architecture: Schema.optional(Schema.String),
      vmCapabilitiesInfo: Schema.optional(VmCapabilities),
      committedStorageBytes: Schema.optional(Schema.String),
      disks: Schema.optional(Schema.Array(AzureDiskDetails)),
      firmware: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AzureSourceVmDetails",
  }) as any as Schema.Schema<AzureSourceVmDetails>;

export interface Group {
  /** Output only. The Group name. */
  name?: string;
  /** Immutable. The target type of this group. */
  migrationTargetType?:
    | "MIGRATION_TARGET_TYPE_UNSPECIFIED"
    | "MIGRATION_TARGET_TYPE_GCE"
    | "MIGRATION_TARGET_TYPE_DISKS"
    | (string & {});
  /** Output only. The update time timestamp. */
  updateTime?: string;
  /** Display name is a user defined name for this group which can be updated. */
  displayName?: string;
  /** User-provided description of the group. */
  description?: string;
  /** Output only. The create time timestamp. */
  createTime?: string;
}

export const Group: Schema.Schema<Group> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      migrationTargetType: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Group" }) as any as Schema.Schema<Group>;

export interface ListGroupsResponse {
  /** Output only. Locations that could not be reached. */
  unreachable?: Array<string>;
  /** Output only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Output only. The list of groups response. */
  groups?: Array<Group>;
}

export const ListGroupsResponse: Schema.Schema<ListGroupsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      nextPageToken: Schema.optional(Schema.String),
      groups: Schema.optional(Schema.Array(Group)),
    }),
  ).annotate({
    identifier: "ListGroupsResponse",
  }) as any as Schema.Schema<ListGroupsResponse>;

export interface AwsDiskDetails {
  /** Output only. The ordinal number of the disk. */
  diskNumber?: number;
  /** Output only. Size in GB. */
  sizeGb?: string;
  /** Output only. AWS volume ID. */
  volumeId?: string;
}

export const AwsDiskDetails: Schema.Schema<AwsDiskDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      diskNumber: Schema.optional(Schema.Number),
      sizeGb: Schema.optional(Schema.String),
      volumeId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AwsDiskDetails",
  }) as any as Schema.Schema<AwsDiskDetails>;

export interface AddGroupMigrationRequest {
  /** The full path name of the MigratingVm to add. */
  migratingVm?: string;
}

export const AddGroupMigrationRequest: Schema.Schema<AddGroupMigrationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      migratingVm: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AddGroupMigrationRequest",
  }) as any as Schema.Schema<AddGroupMigrationRequest>;

export interface UtilizationReport {
  /** Output only. Provides details on the state of the report in case of an error. */
  error?: Status;
  /** Output only. The report unique name. */
  name?: string;
  /** Output only. Total number of VMs included in the report. */
  vmsCount?: number;
  /** Output only. The point in time when the time frame ends. Notice that the time frame is counted backwards. For instance if the "frame_end_time" value is 2021/01/20 and the time frame is WEEK then the report covers the week between 2021/01/20 and 2021/01/14. */
  frameEndTime?: string;
  /** Output only. Current state of the report. */
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATING"
    | "SUCCEEDED"
    | "FAILED"
    | (string & {});
  /** Time frame of the report. */
  timeFrame?:
    | "TIME_FRAME_UNSPECIFIED"
    | "WEEK"
    | "MONTH"
    | "YEAR"
    | (string & {});
  /** Output only. The time the report was created (this refers to the time of the request, not the time the report creation completed). */
  createTime?: string;
  /** List of utilization information per VM. When sent as part of the request, the "vm_id" field is used in order to specify which VMs to include in the report. In that case all other fields are ignored. */
  vms?: Array<VmUtilizationInfo>;
  /** Output only. The time the state was last set. */
  stateTime?: string;
  /** The report display name, as assigned by the user. */
  displayName?: string;
  /** Output only. Total number of VMs included in the report. */
  vmCount?: number;
}

export const UtilizationReport: Schema.Schema<UtilizationReport> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      error: Schema.optional(Status),
      name: Schema.optional(Schema.String),
      vmsCount: Schema.optional(Schema.Number),
      frameEndTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      timeFrame: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      vms: Schema.optional(Schema.Array(VmUtilizationInfo)),
      stateTime: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      vmCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "UtilizationReport",
  }) as any as Schema.Schema<UtilizationReport>;

export interface ListReplicationCyclesResponse {
  /** Output only. The list of replication cycles response. */
  replicationCycles?: Array<ReplicationCycle>;
  /** Output only. Locations that could not be reached. */
  unreachable?: Array<string>;
  /** Output only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListReplicationCyclesResponse: Schema.Schema<ListReplicationCyclesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      replicationCycles: Schema.optional(Schema.Array(ReplicationCycle)),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListReplicationCyclesResponse",
  }) as any as Schema.Schema<ListReplicationCyclesResponse>;

export interface OperationMetadata {
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      target: Schema.optional(Schema.String),
      statusMessage: Schema.optional(Schema.String),
      verb: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      apiVersion: Schema.optional(Schema.String),
      requestedCancellation: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "OperationMetadata",
  }) as any as Schema.Schema<OperationMetadata>;

export interface ListCutoverJobsResponse {
  /** Output only. Locations that could not be reached. */
  unreachable?: Array<string>;
  /** Output only. The list of cutover jobs response. */
  cutoverJobs?: Array<CutoverJob>;
  /** Output only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListCutoverJobsResponse: Schema.Schema<ListCutoverJobsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      cutoverJobs: Schema.optional(Schema.Array(CutoverJob)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCutoverJobsResponse",
  }) as any as Schema.Schema<ListCutoverJobsResponse>;

export interface ListImageImportJobsResponse {
  /** Output only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Output only. The list of target response. */
  imageImportJobs?: Array<ImageImportJob>;
  /** Output only. Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListImageImportJobsResponse: Schema.Schema<ListImageImportJobsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      imageImportJobs: Schema.optional(Schema.Array(ImageImportJob)),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListImageImportJobsResponse",
  }) as any as Schema.Schema<ListImageImportJobsResponse>;

export interface AwsSourceVmDetails {
  /** Output only. The disks attached to the source VM. */
  disks?: Array<AwsDiskDetails>;
  /** Output only. The total size of the disks being migrated in bytes. */
  committedStorageBytes?: string;
  /** Output only. The VM architecture. */
  architecture?:
    | "VM_ARCHITECTURE_UNSPECIFIED"
    | "VM_ARCHITECTURE_X86_FAMILY"
    | "VM_ARCHITECTURE_ARM64"
    | (string & {});
  /** Output only. Information about VM capabilities needed for some Compute Engine features. */
  vmCapabilitiesInfo?: VmCapabilities;
  /** Output only. The firmware type of the source VM. */
  firmware?: "FIRMWARE_UNSPECIFIED" | "EFI" | "BIOS" | (string & {});
}

export const AwsSourceVmDetails: Schema.Schema<AwsSourceVmDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      disks: Schema.optional(Schema.Array(AwsDiskDetails)),
      committedStorageBytes: Schema.optional(Schema.String),
      architecture: Schema.optional(Schema.String),
      vmCapabilitiesInfo: Schema.optional(VmCapabilities),
      firmware: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AwsSourceVmDetails",
  }) as any as Schema.Schema<AwsSourceVmDetails>;

export interface SourceStorageResource {
  /** Source AWS volume details. */
  awsDiskDetails?: AwsSourceDiskDetails;
}

export const SourceStorageResource: Schema.Schema<SourceStorageResource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      awsDiskDetails: Schema.optional(AwsSourceDiskDetails),
    }),
  ).annotate({
    identifier: "SourceStorageResource",
  }) as any as Schema.Schema<SourceStorageResource>;

export interface FetchStorageInventoryResponse {
  /** The list of storage resources in the source. */
  resources?: Array<SourceStorageResource>;
  /** Output only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Output only. The timestamp when the source was last queried (if the result is from the cache). */
  updateTime?: string;
}

export const FetchStorageInventoryResponse: Schema.Schema<FetchStorageInventoryResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resources: Schema.optional(Schema.Array(SourceStorageResource)),
      nextPageToken: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FetchStorageInventoryResponse",
  }) as any as Schema.Schema<FetchStorageInventoryResponse>;

export interface PauseMigrationRequest {}

export const PauseMigrationRequest: Schema.Schema<PauseMigrationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "PauseMigrationRequest",
  }) as any as Schema.Schema<PauseMigrationRequest>;

export interface VmwareSourceVmDetails {
  /** Output only. The firmware type of the source VM. */
  firmware?: "FIRMWARE_UNSPECIFIED" | "EFI" | "BIOS" | (string & {});
  /** Output only. The VM architecture. */
  architecture?:
    | "VM_ARCHITECTURE_UNSPECIFIED"
    | "VM_ARCHITECTURE_X86_FAMILY"
    | "VM_ARCHITECTURE_ARM64"
    | (string & {});
  /** Output only. The total size of the disks being migrated in bytes. */
  committedStorageBytes?: string;
  /** Output only. The disks attached to the source VM. */
  disks?: Array<VmwareDiskDetails>;
  /** Output only. Information about VM capabilities needed for some Compute Engine features. */
  vmCapabilitiesInfo?: VmCapabilities;
}

export const VmwareSourceVmDetails: Schema.Schema<VmwareSourceVmDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      firmware: Schema.optional(Schema.String),
      architecture: Schema.optional(Schema.String),
      committedStorageBytes: Schema.optional(Schema.String),
      disks: Schema.optional(Schema.Array(VmwareDiskDetails)),
      vmCapabilitiesInfo: Schema.optional(VmCapabilities),
    }),
  ).annotate({
    identifier: "VmwareSourceVmDetails",
  }) as any as Schema.Schema<VmwareSourceVmDetails>;

export interface SchedulePolicy {
  /** The idle duration between replication stages. */
  idleDuration?: string;
  /** A flag to indicate whether to skip OS adaptation during the replication sync. OS adaptation is a process where the VM's operating system undergoes changes and adaptations to fully function on Compute Engine. */
  skipOsAdaptation?: boolean;
}

export const SchedulePolicy: Schema.Schema<SchedulePolicy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      idleDuration: Schema.optional(Schema.String),
      skipOsAdaptation: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "SchedulePolicy",
  }) as any as Schema.Schema<SchedulePolicy>;

export interface MigratingVm {
  /** The description attached to the migrating VM by the user. */
  description?: string;
  /** The unique ID of the VM in the source. The VM's name in vSphere can be changed, so this is not the VM's name but rather its moRef id. This id is of the form vm-. */
  sourceVmId?: string;
  /** The labels of the migrating VM. */
  labels?: Record<string, string>;
  /** Output only. Provides details of future CutoverJobs of a MigratingVm. Set to empty when cutover forecast is unavailable. */
  cutoverForecast?: CutoverForecast;
  /** Output only. The time the migrating VM was created (this refers to this resource and not to the time it was installed in the source). */
  createTime?: string;
  /** Output only. Details of the VM from a Vmware source. */
  vmwareSourceVmDetails?: VmwareSourceVmDetails;
  /** The default configuration of the target VM that will be created in Google Cloud as a result of the migration. Deprecated: Use compute_engine_target_defaults instead. */
  targetDefaults?: TargetVMDetails;
  /** Output only. Details of the last replication cycle. This will be updated whenever a replication cycle is finished and is not to be confused with last_sync which is only updated on successful replication cycles. */
  lastReplicationCycle?: ReplicationCycle;
  /** Output only. The last time the migrating VM resource was updated. */
  updateTime?: string;
  /** Output only. The identifier of the MigratingVm. */
  name?: string;
  /** Output only. Provides details on the state of the Migrating VM in case of an error in replication. */
  error?: Status;
  /** Details of the target Persistent Disks in Compute Engine. */
  computeEngineDisksTargetDefaults?: ComputeEngineDisksTargetDefaults;
  /** Output only. Details of the VM from an Azure source. */
  azureSourceVmDetails?: AzureSourceVmDetails;
  /** Output only. The recent clone jobs performed on the migrating VM. This field holds the vm's last completed clone job and the vm's running clone job, if one exists. Note: To have this field populated you need to explicitly request it via the "view" parameter of the Get/List request. */
  recentCloneJobs?: Array<CloneJob>;
  /** Details of the target VM in Compute Engine. */
  computeEngineTargetDefaults?: ComputeEngineTargetDefaults;
  /** Output only. The most updated snapshot created time in the source that finished replication. */
  lastSync?: ReplicationSync;
  /** The replication schedule policy. */
  policy?: SchedulePolicy;
  /** Output only. Details of the VM from an AWS source. */
  awsSourceVmDetails?: AwsSourceVmDetails;
  /** Output only. The last time the migrating VM state was updated. */
  stateTime?: string;
  /** Details of the VM in Compute Engine. Deprecated: Use compute_engine_target_defaults instead. */
  computeEngineVmDefaults?: TargetVMDetails;
  /** Output only. Provides details about the expiration state of the migrating VM. */
  expiration?: Expiration;
  /** Output only. The group this migrating vm is included in, if any. The group is represented by the full path of the appropriate Group resource. */
  group?: string;
  /** Output only. The recent cutover jobs performed on the migrating VM. This field holds the vm's last completed cutover job and the vm's running cutover job, if one exists. Note: To have this field populated you need to explicitly request it via the "view" parameter of the Get/List request. */
  recentCutoverJobs?: Array<CutoverJob>;
  /** The display name attached to the MigratingVm by the user. */
  displayName?: string;
  /** Output only. Details of the current running replication cycle. */
  currentSyncInfo?: ReplicationCycle;
  /** Output only. State of the MigratingVm. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PENDING"
    | "READY"
    | "FIRST_SYNC"
    | "ACTIVE"
    | "CUTTING_OVER"
    | "CUTOVER"
    | "FINAL_SYNC"
    | "PAUSED"
    | "FINALIZING"
    | "FINALIZED"
    | "ERROR"
    | "EXPIRED"
    | "FINALIZED_EXPIRED"
    | (string & {});
}

export const MigratingVm: Schema.Schema<MigratingVm> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      sourceVmId: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      cutoverForecast: Schema.optional(CutoverForecast),
      createTime: Schema.optional(Schema.String),
      vmwareSourceVmDetails: Schema.optional(VmwareSourceVmDetails),
      targetDefaults: Schema.optional(TargetVMDetails),
      lastReplicationCycle: Schema.optional(ReplicationCycle),
      updateTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      error: Schema.optional(Status),
      computeEngineDisksTargetDefaults: Schema.optional(
        ComputeEngineDisksTargetDefaults,
      ),
      azureSourceVmDetails: Schema.optional(AzureSourceVmDetails),
      recentCloneJobs: Schema.optional(Schema.Array(CloneJob)),
      computeEngineTargetDefaults: Schema.optional(ComputeEngineTargetDefaults),
      lastSync: Schema.optional(ReplicationSync),
      policy: Schema.optional(SchedulePolicy),
      awsSourceVmDetails: Schema.optional(AwsSourceVmDetails),
      stateTime: Schema.optional(Schema.String),
      computeEngineVmDefaults: Schema.optional(TargetVMDetails),
      expiration: Schema.optional(Expiration),
      group: Schema.optional(Schema.String),
      recentCutoverJobs: Schema.optional(Schema.Array(CutoverJob)),
      displayName: Schema.optional(Schema.String),
      currentSyncInfo: Schema.optional(ReplicationCycle),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MigratingVm",
  }) as any as Schema.Schema<MigratingVm>;

export interface ListMigratingVmsResponse {
  /** Output only. The list of Migrating VMs response. */
  migratingVms?: Array<MigratingVm>;
  /** Output only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Output only. Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListMigratingVmsResponse: Schema.Schema<ListMigratingVmsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      migratingVms: Schema.optional(Schema.Array(MigratingVm)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListMigratingVmsResponse",
  }) as any as Schema.Schema<ListMigratingVmsResponse>;

export interface ImageImport {
  /** Output only. The result of the most recent runs for this ImageImport. All jobs for this ImageImport can be listed via ListImageImportJobs. */
  recentImageImportJobs?: Array<ImageImportJob>;
  /** Output only. The resource path of the ImageImport. */
  name?: string;
  /** Output only. The time the image import was created. */
  createTime?: string;
  /** Immutable. Target details for importing a machine image, will be used by ImageImportJob. */
  machineImageTargetDefaults?: MachineImageTargetDetails;
  /** Immutable. Target details for importing a disk image, will be used by ImageImportJob. */
  diskImageTargetDefaults?: DiskImageTargetDetails;
  /** Immutable. The path to the Cloud Storage file from which the image should be imported. */
  cloudStorageUri?: string;
  /** Immutable. The encryption details used by the image import process during the image adaptation for Compute Engine. */
  encryption?: Encryption;
}

export const ImageImport: Schema.Schema<ImageImport> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      recentImageImportJobs: Schema.optional(Schema.Array(ImageImportJob)),
      name: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      machineImageTargetDefaults: Schema.optional(MachineImageTargetDetails),
      diskImageTargetDefaults: Schema.optional(DiskImageTargetDetails),
      cloudStorageUri: Schema.optional(Schema.String),
      encryption: Schema.optional(Encryption),
    }),
  ).annotate({
    identifier: "ImageImport",
  }) as any as Schema.Schema<ImageImport>;

export interface CancelImageImportJobRequest {}

export const CancelImageImportJobRequest: Schema.Schema<CancelImageImportJobRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelImageImportJobRequest",
  }) as any as Schema.Schema<CancelImageImportJobRequest>;

export interface RemoveGroupMigrationRequest {
  /** The MigratingVm to remove. */
  migratingVm?: string;
}

export const RemoveGroupMigrationRequest: Schema.Schema<RemoveGroupMigrationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      migratingVm: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RemoveGroupMigrationRequest",
  }) as any as Schema.Schema<RemoveGroupMigrationRequest>;

export interface ListUtilizationReportsResponse {
  /** Output only. Locations that could not be reached. */
  unreachable?: Array<string>;
  /** Output only. The list of reports. */
  utilizationReports?: Array<UtilizationReport>;
  /** Output only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListUtilizationReportsResponse: Schema.Schema<ListUtilizationReportsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      utilizationReports: Schema.optional(Schema.Array(UtilizationReport)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListUtilizationReportsResponse",
  }) as any as Schema.Schema<ListUtilizationReportsResponse>;

export interface CancelDiskMigrationJobRequest {}

export const CancelDiskMigrationJobRequest: Schema.Schema<CancelDiskMigrationJobRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelDiskMigrationJobRequest",
  }) as any as Schema.Schema<CancelDiskMigrationJobRequest>;

export interface CancelOperationRequest {}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelOperationRequest",
  }) as any as Schema.Schema<CancelOperationRequest>;

export interface ListImageImportsResponse {
  /** Output only. The list of target response. */
  imageImports?: Array<ImageImport>;
  /** Output only. Locations that could not be reached. */
  unreachable?: Array<string>;
  /** Output only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListImageImportsResponse: Schema.Schema<ListImageImportsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      imageImports: Schema.optional(Schema.Array(ImageImport)),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListImageImportsResponse",
  }) as any as Schema.Schema<ListImageImportsResponse>;

export interface ExtendMigrationRequest {}

export const ExtendMigrationRequest: Schema.Schema<ExtendMigrationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ExtendMigrationRequest",
  }) as any as Schema.Schema<ExtendMigrationRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Location;

export type GetProjectsLocationsError = DefaultErrors;

/** Gets information about a location. */
export const getProjectsLocations: API.OperationMethod<
  GetProjectsLocationsRequest,
  GetProjectsLocationsResponse,
  GetProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsRequest {
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
}

export const ListProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("extraLocationTypes"),
    ),
    name: Schema.String.pipe(T.HttpPath("name")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/locations" }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListLocationsResponse;

export type ListProjectsLocationsError = DefaultErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export const listProjectsLocations: API.PaginatedOperationMethod<
  ListProjectsLocationsRequest,
  ListProjectsLocationsResponse,
  ListProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsLocationsGroupsRequest {
  /** Output only. The Group name. */
  name: string;
  /** Field mask is used to specify the fields to be overwritten in the Group resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Group;
}

export const PatchProjectsLocationsGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(Group).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/groups/{groupsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsGroupsRequest>;

export type PatchProjectsLocationsGroupsResponse = Operation;
export const PatchProjectsLocationsGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsGroupsError = DefaultErrors;

/** Updates the parameters of a single Group. */
export const patchProjectsLocationsGroups: API.OperationMethod<
  PatchProjectsLocationsGroupsRequest,
  PatchProjectsLocationsGroupsResponse,
  PatchProjectsLocationsGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsGroupsRequest,
  output: PatchProjectsLocationsGroupsResponse,
  errors: [],
}));

export interface ListProjectsLocationsGroupsRequest {
  /** Optional. The maximum number of groups to return. The service may return fewer than this value. If unspecified, at most 500 groups will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. The filter request. */
  filter?: string;
  /** Required. A page token, received from a previous `ListGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListGroups` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. the order by fields for the result. */
  orderBy?: string;
  /** Required. The parent, which owns this collection of groups. */
  parent: string;
}

export const ListProjectsLocationsGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/groups",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsGroupsRequest>;

export type ListProjectsLocationsGroupsResponse = ListGroupsResponse;
export const ListProjectsLocationsGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListGroupsResponse;

export type ListProjectsLocationsGroupsError = DefaultErrors;

/** Lists Groups in a given project and location. */
export const listProjectsLocationsGroups: API.PaginatedOperationMethod<
  ListProjectsLocationsGroupsRequest,
  ListProjectsLocationsGroupsResponse,
  ListProjectsLocationsGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsGroupsRequest,
  output: ListProjectsLocationsGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsGroupsRequest {
  /** Required. The group name. */
  name: string;
}

export const GetProjectsLocationsGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/groups/{groupsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsGroupsRequest>;

export type GetProjectsLocationsGroupsResponse = Group;
export const GetProjectsLocationsGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Group;

export type GetProjectsLocationsGroupsError = DefaultErrors;

/** Gets details of a single Group. */
export const getProjectsLocationsGroups: API.OperationMethod<
  GetProjectsLocationsGroupsRequest,
  GetProjectsLocationsGroupsResponse,
  GetProjectsLocationsGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsGroupsRequest,
  output: GetProjectsLocationsGroupsResponse,
  errors: [],
}));

export interface RemoveGroupMigrationProjectsLocationsGroupsRequest {
  /** Required. The name of the Group. */
  group: string;
  /** Request body */
  body?: RemoveGroupMigrationRequest;
}

export const RemoveGroupMigrationProjectsLocationsGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    group: Schema.String.pipe(T.HttpPath("group")),
    body: Schema.optional(RemoveGroupMigrationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/groups/{groupsId}:removeGroupMigration",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RemoveGroupMigrationProjectsLocationsGroupsRequest>;

export type RemoveGroupMigrationProjectsLocationsGroupsResponse = Operation;
export const RemoveGroupMigrationProjectsLocationsGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type RemoveGroupMigrationProjectsLocationsGroupsError = DefaultErrors;

/** Removes a MigratingVm from a Group. */
export const removeGroupMigrationProjectsLocationsGroups: API.OperationMethod<
  RemoveGroupMigrationProjectsLocationsGroupsRequest,
  RemoveGroupMigrationProjectsLocationsGroupsResponse,
  RemoveGroupMigrationProjectsLocationsGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RemoveGroupMigrationProjectsLocationsGroupsRequest,
  output: RemoveGroupMigrationProjectsLocationsGroupsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsGroupsRequest {
  /** A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The Group's parent. */
  parent: string;
  /** Required. The group identifier. */
  groupId?: string;
  /** Request body */
  body?: Group;
}

export const CreateProjectsLocationsGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    groupId: Schema.optional(Schema.String).pipe(T.HttpQuery("groupId")),
    body: Schema.optional(Group).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/groups",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsGroupsRequest>;

export type CreateProjectsLocationsGroupsResponse = Operation;
export const CreateProjectsLocationsGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsGroupsError = DefaultErrors;

/** Creates a new Group in a given project and location. */
export const createProjectsLocationsGroups: API.OperationMethod<
  CreateProjectsLocationsGroupsRequest,
  CreateProjectsLocationsGroupsResponse,
  CreateProjectsLocationsGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsGroupsRequest,
  output: CreateProjectsLocationsGroupsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsGroupsRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The Group name. */
  name: string;
}

export const DeleteProjectsLocationsGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/groups/{groupsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsGroupsRequest>;

export type DeleteProjectsLocationsGroupsResponse = Operation;
export const DeleteProjectsLocationsGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsGroupsError = DefaultErrors;

/** Deletes a single Group. */
export const deleteProjectsLocationsGroups: API.OperationMethod<
  DeleteProjectsLocationsGroupsRequest,
  DeleteProjectsLocationsGroupsResponse,
  DeleteProjectsLocationsGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsGroupsRequest,
  output: DeleteProjectsLocationsGroupsResponse,
  errors: [],
}));

export interface AddGroupMigrationProjectsLocationsGroupsRequest {
  /** Required. The full path name of the Group to add to. */
  group: string;
  /** Request body */
  body?: AddGroupMigrationRequest;
}

export const AddGroupMigrationProjectsLocationsGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    group: Schema.String.pipe(T.HttpPath("group")),
    body: Schema.optional(AddGroupMigrationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/groups/{groupsId}:addGroupMigration",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<AddGroupMigrationProjectsLocationsGroupsRequest>;

export type AddGroupMigrationProjectsLocationsGroupsResponse = Operation;
export const AddGroupMigrationProjectsLocationsGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type AddGroupMigrationProjectsLocationsGroupsError = DefaultErrors;

/** Adds a MigratingVm to a Group. */
export const addGroupMigrationProjectsLocationsGroups: API.OperationMethod<
  AddGroupMigrationProjectsLocationsGroupsRequest,
  AddGroupMigrationProjectsLocationsGroupsResponse,
  AddGroupMigrationProjectsLocationsGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AddGroupMigrationProjectsLocationsGroupsRequest,
  output: AddGroupMigrationProjectsLocationsGroupsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsTargetProjectsRequest {
  /** Required. The target_project identifier. */
  targetProjectId?: string;
  /** Required. The TargetProject's parent. */
  parent: string;
  /** A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: TargetProject;
}

export const CreateProjectsLocationsTargetProjectsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    targetProjectId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("targetProjectId"),
    ),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(TargetProject).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/targetProjects",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsTargetProjectsRequest>;

export type CreateProjectsLocationsTargetProjectsResponse = Operation;
export const CreateProjectsLocationsTargetProjectsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsTargetProjectsError = DefaultErrors;

/** Creates a new TargetProject in a given project. NOTE: TargetProject is a global resource; hence the only supported value for location is `global`. */
export const createProjectsLocationsTargetProjects: API.OperationMethod<
  CreateProjectsLocationsTargetProjectsRequest,
  CreateProjectsLocationsTargetProjectsResponse,
  CreateProjectsLocationsTargetProjectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsTargetProjectsRequest,
  output: CreateProjectsLocationsTargetProjectsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsTargetProjectsRequest {
  /** Output only. The name of the target project. */
  name: string;
  /** Field mask is used to specify the fields to be overwritten in the TargetProject resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: TargetProject;
}

export const PatchProjectsLocationsTargetProjectsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(TargetProject).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/targetProjects/{targetProjectsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsTargetProjectsRequest>;

export type PatchProjectsLocationsTargetProjectsResponse = Operation;
export const PatchProjectsLocationsTargetProjectsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsTargetProjectsError = DefaultErrors;

/** Updates the parameters of a single TargetProject. NOTE: TargetProject is a global resource; hence the only supported value for location is `global`. */
export const patchProjectsLocationsTargetProjects: API.OperationMethod<
  PatchProjectsLocationsTargetProjectsRequest,
  PatchProjectsLocationsTargetProjectsResponse,
  PatchProjectsLocationsTargetProjectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsTargetProjectsRequest,
  output: PatchProjectsLocationsTargetProjectsResponse,
  errors: [],
}));

export interface ListProjectsLocationsTargetProjectsRequest {
  /** Required. The parent, which owns this collection of targets. */
  parent: string;
  /** Optional. the order by fields for the result. */
  orderBy?: string;
  /** Optional. The maximum number of targets to return. The service may return fewer than this value. If unspecified, at most 500 targets will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Required. A page token, received from a previous `ListTargets` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTargets` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The filter request. */
  filter?: string;
}

export const ListProjectsLocationsTargetProjectsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/targetProjects",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsTargetProjectsRequest>;

export type ListProjectsLocationsTargetProjectsResponse =
  ListTargetProjectsResponse;
export const ListProjectsLocationsTargetProjectsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListTargetProjectsResponse;

export type ListProjectsLocationsTargetProjectsError = DefaultErrors;

/** Lists TargetProjects in a given project. NOTE: TargetProject is a global resource; hence the only supported value for location is `global`. */
export const listProjectsLocationsTargetProjects: API.PaginatedOperationMethod<
  ListProjectsLocationsTargetProjectsRequest,
  ListProjectsLocationsTargetProjectsResponse,
  ListProjectsLocationsTargetProjectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsTargetProjectsRequest,
  output: ListProjectsLocationsTargetProjectsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsTargetProjectsRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The TargetProject name. */
  name: string;
}

export const DeleteProjectsLocationsTargetProjectsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/targetProjects/{targetProjectsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsTargetProjectsRequest>;

export type DeleteProjectsLocationsTargetProjectsResponse = Operation;
export const DeleteProjectsLocationsTargetProjectsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsTargetProjectsError = DefaultErrors;

/** Deletes a single TargetProject. NOTE: TargetProject is a global resource; hence the only supported value for location is `global`. */
export const deleteProjectsLocationsTargetProjects: API.OperationMethod<
  DeleteProjectsLocationsTargetProjectsRequest,
  DeleteProjectsLocationsTargetProjectsResponse,
  DeleteProjectsLocationsTargetProjectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsTargetProjectsRequest,
  output: DeleteProjectsLocationsTargetProjectsResponse,
  errors: [],
}));

export interface GetProjectsLocationsTargetProjectsRequest {
  /** Required. The TargetProject name. */
  name: string;
}

export const GetProjectsLocationsTargetProjectsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/targetProjects/{targetProjectsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsTargetProjectsRequest>;

export type GetProjectsLocationsTargetProjectsResponse = TargetProject;
export const GetProjectsLocationsTargetProjectsResponse =
  /*@__PURE__*/ /*#__PURE__*/ TargetProject;

export type GetProjectsLocationsTargetProjectsError = DefaultErrors;

/** Gets details of a single TargetProject. NOTE: TargetProject is a global resource; hence the only supported value for location is `global`. */
export const getProjectsLocationsTargetProjects: API.OperationMethod<
  GetProjectsLocationsTargetProjectsRequest,
  GetProjectsLocationsTargetProjectsResponse,
  GetProjectsLocationsTargetProjectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsTargetProjectsRequest,
  output: GetProjectsLocationsTargetProjectsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsImageImportsRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The ImageImport name. */
  name: string;
}

export const DeleteProjectsLocationsImageImportsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/imageImports/{imageImportsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsImageImportsRequest>;

export type DeleteProjectsLocationsImageImportsResponse = Operation;
export const DeleteProjectsLocationsImageImportsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsImageImportsError = DefaultErrors;

/** Deletes a single ImageImport. */
export const deleteProjectsLocationsImageImports: API.OperationMethod<
  DeleteProjectsLocationsImageImportsRequest,
  DeleteProjectsLocationsImageImportsResponse,
  DeleteProjectsLocationsImageImportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsImageImportsRequest,
  output: DeleteProjectsLocationsImageImportsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsImageImportsRequest {
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The image import identifier. This value maximum length is 63 characters, and valid characters are /a-z-/. It must start with an english letter and must not end with a hyphen. */
  imageImportId?: string;
  /** Required. The ImageImport's parent. */
  parent: string;
  /** Request body */
  body?: ImageImport;
}

export const CreateProjectsLocationsImageImportsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    imageImportId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("imageImportId"),
    ),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(ImageImport).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/imageImports",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsImageImportsRequest>;

export type CreateProjectsLocationsImageImportsResponse = Operation;
export const CreateProjectsLocationsImageImportsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsImageImportsError = DefaultErrors;

/** Creates a new ImageImport in a given project. */
export const createProjectsLocationsImageImports: API.OperationMethod<
  CreateProjectsLocationsImageImportsRequest,
  CreateProjectsLocationsImageImportsResponse,
  CreateProjectsLocationsImageImportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsImageImportsRequest,
  output: CreateProjectsLocationsImageImportsResponse,
  errors: [],
}));

export interface GetProjectsLocationsImageImportsRequest {
  /** Required. The ImageImport name. */
  name: string;
}

export const GetProjectsLocationsImageImportsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/imageImports/{imageImportsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsImageImportsRequest>;

export type GetProjectsLocationsImageImportsResponse = ImageImport;
export const GetProjectsLocationsImageImportsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ImageImport;

export type GetProjectsLocationsImageImportsError = DefaultErrors;

/** Gets details of a single ImageImport. */
export const getProjectsLocationsImageImports: API.OperationMethod<
  GetProjectsLocationsImageImportsRequest,
  GetProjectsLocationsImageImportsResponse,
  GetProjectsLocationsImageImportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsImageImportsRequest,
  output: GetProjectsLocationsImageImportsResponse,
  errors: [],
}));

export interface ListProjectsLocationsImageImportsRequest {
  /** Optional. The filter request (according to AIP-160). */
  filter?: string;
  /** Required. The parent, which owns this collection of targets. */
  parent: string;
  /** Optional. The maximum number of targets to return. The service may return fewer than this value. If unspecified, at most 500 targets will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. The order by fields for the result (according to AIP-132). Currently ordering is only possible by "name" field. */
  orderBy?: string;
  /** Optional. A page token, received from a previous `ListImageImports` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListImageImports` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsImageImportsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/imageImports",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsImageImportsRequest>;

export type ListProjectsLocationsImageImportsResponse =
  ListImageImportsResponse;
export const ListProjectsLocationsImageImportsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListImageImportsResponse;

export type ListProjectsLocationsImageImportsError = DefaultErrors;

/** Lists ImageImports in a given project. */
export const listProjectsLocationsImageImports: API.PaginatedOperationMethod<
  ListProjectsLocationsImageImportsRequest,
  ListProjectsLocationsImageImportsResponse,
  ListProjectsLocationsImageImportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsImageImportsRequest,
  output: ListProjectsLocationsImageImportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsImageImportsImageImportJobsRequest {
  /** Optional. A page token, received from a previous `ListImageImportJobs` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListImageImportJobs` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The filter request (according to AIP-160). */
  filter?: string;
  /** Required. The parent, which owns this collection of targets. */
  parent: string;
  /** Optional. The order by fields for the result (according to AIP-132). Currently ordering is only possible by "name" field. */
  orderBy?: string;
  /** Optional. The maximum number of targets to return. The service may return fewer than this value. If unspecified, at most 500 targets will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListProjectsLocationsImageImportsImageImportJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/imageImports/{imageImportsId}/imageImportJobs",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsImageImportsImageImportJobsRequest>;

export type ListProjectsLocationsImageImportsImageImportJobsResponse =
  ListImageImportJobsResponse;
export const ListProjectsLocationsImageImportsImageImportJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListImageImportJobsResponse;

export type ListProjectsLocationsImageImportsImageImportJobsError =
  DefaultErrors;

/** Lists ImageImportJobs in a given project. */
export const listProjectsLocationsImageImportsImageImportJobs: API.PaginatedOperationMethod<
  ListProjectsLocationsImageImportsImageImportJobsRequest,
  ListProjectsLocationsImageImportsImageImportJobsResponse,
  ListProjectsLocationsImageImportsImageImportJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsImageImportsImageImportJobsRequest,
  output: ListProjectsLocationsImageImportsImageImportJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsImageImportsImageImportJobsRequest {
  /** Required. The ImageImportJob name. */
  name: string;
}

export const GetProjectsLocationsImageImportsImageImportJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/imageImports/{imageImportsId}/imageImportJobs/{imageImportJobsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsImageImportsImageImportJobsRequest>;

export type GetProjectsLocationsImageImportsImageImportJobsResponse =
  ImageImportJob;
export const GetProjectsLocationsImageImportsImageImportJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ImageImportJob;

export type GetProjectsLocationsImageImportsImageImportJobsError =
  DefaultErrors;

/** Gets details of a single ImageImportJob. */
export const getProjectsLocationsImageImportsImageImportJobs: API.OperationMethod<
  GetProjectsLocationsImageImportsImageImportJobsRequest,
  GetProjectsLocationsImageImportsImageImportJobsResponse,
  GetProjectsLocationsImageImportsImageImportJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsImageImportsImageImportJobsRequest,
  output: GetProjectsLocationsImageImportsImageImportJobsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsImageImportsImageImportJobsRequest {
  /** Required. The image import job id. */
  name: string;
  /** Request body */
  body?: CancelImageImportJobRequest;
}

export const CancelProjectsLocationsImageImportsImageImportJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CancelImageImportJobRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/imageImports/{imageImportsId}/imageImportJobs/{imageImportJobsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsLocationsImageImportsImageImportJobsRequest>;

export type CancelProjectsLocationsImageImportsImageImportJobsResponse =
  Operation;
export const CancelProjectsLocationsImageImportsImageImportJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CancelProjectsLocationsImageImportsImageImportJobsError =
  DefaultErrors;

/** Initiates the cancellation of a running ImageImportJob. */
export const cancelProjectsLocationsImageImportsImageImportJobs: API.OperationMethod<
  CancelProjectsLocationsImageImportsImageImportJobsRequest,
  CancelProjectsLocationsImageImportsImageImportJobsResponse,
  CancelProjectsLocationsImageImportsImageImportJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelProjectsLocationsImageImportsImageImportJobsRequest,
  output: CancelProjectsLocationsImageImportsImageImportJobsResponse,
  errors: [],
}));

export interface GetProjectsLocationsSourcesRequest {
  /** Required. The Source name. */
  name: string;
}

export const GetProjectsLocationsSourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsSourcesRequest>;

export type GetProjectsLocationsSourcesResponse = Source;
export const GetProjectsLocationsSourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Source;

export type GetProjectsLocationsSourcesError = DefaultErrors;

/** Gets details of a single Source. */
export const getProjectsLocationsSources: API.OperationMethod<
  GetProjectsLocationsSourcesRequest,
  GetProjectsLocationsSourcesResponse,
  GetProjectsLocationsSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsSourcesRequest,
  output: GetProjectsLocationsSourcesResponse,
  errors: [],
}));

export interface FetchStorageInventoryProjectsLocationsSourcesRequest {
  /** Required. The type of the storage inventory to fetch. */
  type?: "STORAGE_TYPE_UNSPECIFIED" | "DISKS" | "SNAPSHOTS" | (string & {});
  /** Optional. If this flag is set to true, the source will be queried instead of using cached results. Using this flag will make the call slower. */
  forceRefresh?: boolean;
  /** Optional. The maximum number of VMs to return. The service may return fewer than this value. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `FetchStorageInventory` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `FetchStorageInventory` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The name of the Source. */
  source: string;
}

export const FetchStorageInventoryProjectsLocationsSourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
    forceRefresh: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("forceRefresh"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    source: Schema.String.pipe(T.HttpPath("source")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}:fetchStorageInventory",
    }),
    svc,
  ) as unknown as Schema.Schema<FetchStorageInventoryProjectsLocationsSourcesRequest>;

export type FetchStorageInventoryProjectsLocationsSourcesResponse =
  FetchStorageInventoryResponse;
export const FetchStorageInventoryProjectsLocationsSourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ FetchStorageInventoryResponse;

export type FetchStorageInventoryProjectsLocationsSourcesError = DefaultErrors;

/** List remote source's inventory of storage resources. The remote source is another cloud vendor (e.g. AWS, Azure). The inventory describes the list of existing storage resources in that source. Note that this operation lists the resources on the remote source, as opposed to listing the MigratingVms resources in the vmmigration service. */
export const fetchStorageInventoryProjectsLocationsSources: API.PaginatedOperationMethod<
  FetchStorageInventoryProjectsLocationsSourcesRequest,
  FetchStorageInventoryProjectsLocationsSourcesResponse,
  FetchStorageInventoryProjectsLocationsSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: FetchStorageInventoryProjectsLocationsSourcesRequest,
  output: FetchStorageInventoryProjectsLocationsSourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsSourcesRequest {
  /** A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The source identifier. */
  sourceId?: string;
  /** Required. The Source's parent. */
  parent: string;
  /** Request body */
  body?: Source;
}

export const CreateProjectsLocationsSourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    sourceId: Schema.optional(Schema.String).pipe(T.HttpQuery("sourceId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Source).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsSourcesRequest>;

export type CreateProjectsLocationsSourcesResponse = Operation;
export const CreateProjectsLocationsSourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsSourcesError = DefaultErrors;

/** Creates a new Source in a given project and location. */
export const createProjectsLocationsSources: API.OperationMethod<
  CreateProjectsLocationsSourcesRequest,
  CreateProjectsLocationsSourcesResponse,
  CreateProjectsLocationsSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsSourcesRequest,
  output: CreateProjectsLocationsSourcesResponse,
  errors: [],
}));

export interface ListProjectsLocationsSourcesRequest {
  /** Required. The parent, which owns this collection of sources. */
  parent: string;
  /** Required. A page token, received from a previous `ListSources` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSources` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The filter request. */
  filter?: string;
  /** Optional. The maximum number of sources to return. The service may return fewer than this value. If unspecified, at most 500 sources will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. the order by fields for the result. */
  orderBy?: string;
}

export const ListProjectsLocationsSourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsSourcesRequest>;

export type ListProjectsLocationsSourcesResponse = ListSourcesResponse;
export const ListProjectsLocationsSourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListSourcesResponse;

export type ListProjectsLocationsSourcesError = DefaultErrors;

/** Lists Sources in a given project and location. */
export const listProjectsLocationsSources: API.PaginatedOperationMethod<
  ListProjectsLocationsSourcesRequest,
  ListProjectsLocationsSourcesResponse,
  ListProjectsLocationsSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsSourcesRequest,
  output: ListProjectsLocationsSourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsSourcesRequest {
  /** Required. The Source name. */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsSourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsSourcesRequest>;

export type DeleteProjectsLocationsSourcesResponse = Operation;
export const DeleteProjectsLocationsSourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsSourcesError = DefaultErrors;

/** Deletes a single Source. */
export const deleteProjectsLocationsSources: API.OperationMethod<
  DeleteProjectsLocationsSourcesRequest,
  DeleteProjectsLocationsSourcesResponse,
  DeleteProjectsLocationsSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsSourcesRequest,
  output: DeleteProjectsLocationsSourcesResponse,
  errors: [],
}));

export interface FetchInventoryProjectsLocationsSourcesRequest {
  /** The maximum number of VMs to return. The service may return fewer than this value. For AWS source: If unspecified, at most 500 VMs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. For VMWare source: If unspecified, all VMs will be returned. There is no limit for maximum value. */
  pageSize?: number;
  /** Required. The name of the Source. */
  source: string;
  /** If this flag is set to true, the source will be queried instead of using cached results. Using this flag will make the call slower. */
  forceRefresh?: boolean;
  /** A page token, received from a previous `FetchInventory` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `FetchInventory` must match the call that provided the page token. */
  pageToken?: string;
}

export const FetchInventoryProjectsLocationsSourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    source: Schema.String.pipe(T.HttpPath("source")),
    forceRefresh: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("forceRefresh"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}:fetchInventory",
    }),
    svc,
  ) as unknown as Schema.Schema<FetchInventoryProjectsLocationsSourcesRequest>;

export type FetchInventoryProjectsLocationsSourcesResponse =
  FetchInventoryResponse;
export const FetchInventoryProjectsLocationsSourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ FetchInventoryResponse;

export type FetchInventoryProjectsLocationsSourcesError = DefaultErrors;

/** List remote source's inventory of VMs. The remote source is the onprem vCenter (remote in the sense it's not in Compute Engine). The inventory describes the list of existing VMs in that source. Note that this operation lists the VMs on the remote source, as opposed to listing the MigratingVms resources in the vmmigration service. */
export const fetchInventoryProjectsLocationsSources: API.PaginatedOperationMethod<
  FetchInventoryProjectsLocationsSourcesRequest,
  FetchInventoryProjectsLocationsSourcesResponse,
  FetchInventoryProjectsLocationsSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: FetchInventoryProjectsLocationsSourcesRequest,
  output: FetchInventoryProjectsLocationsSourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsLocationsSourcesRequest {
  /** Field mask is used to specify the fields to be overwritten in the Source resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Output only. The Source name. */
  name: string;
  /** A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Source;
}

export const PatchProjectsLocationsSourcesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(Source).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsSourcesRequest>;

export type PatchProjectsLocationsSourcesResponse = Operation;
export const PatchProjectsLocationsSourcesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsSourcesError = DefaultErrors;

/** Updates the parameters of a single Source. */
export const patchProjectsLocationsSources: API.OperationMethod<
  PatchProjectsLocationsSourcesRequest,
  PatchProjectsLocationsSourcesResponse,
  PatchProjectsLocationsSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsSourcesRequest,
  output: PatchProjectsLocationsSourcesResponse,
  errors: [],
}));

export interface UpgradeApplianceProjectsLocationsSourcesDatacenterConnectorsRequest {
  /** Required. The DatacenterConnector name. */
  datacenterConnector: string;
  /** Request body */
  body?: UpgradeApplianceRequest;
}

export const UpgradeApplianceProjectsLocationsSourcesDatacenterConnectorsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    datacenterConnector: Schema.String.pipe(T.HttpPath("datacenterConnector")),
    body: Schema.optional(UpgradeApplianceRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/datacenterConnectors/{datacenterConnectorsId}:upgradeAppliance",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpgradeApplianceProjectsLocationsSourcesDatacenterConnectorsRequest>;

export type UpgradeApplianceProjectsLocationsSourcesDatacenterConnectorsResponse =
  Operation;
export const UpgradeApplianceProjectsLocationsSourcesDatacenterConnectorsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type UpgradeApplianceProjectsLocationsSourcesDatacenterConnectorsError =
  DefaultErrors;

/** Upgrades the appliance relate to this DatacenterConnector to the in-place updateable version. */
export const upgradeApplianceProjectsLocationsSourcesDatacenterConnectors: API.OperationMethod<
  UpgradeApplianceProjectsLocationsSourcesDatacenterConnectorsRequest,
  UpgradeApplianceProjectsLocationsSourcesDatacenterConnectorsResponse,
  UpgradeApplianceProjectsLocationsSourcesDatacenterConnectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpgradeApplianceProjectsLocationsSourcesDatacenterConnectorsRequest,
  output: UpgradeApplianceProjectsLocationsSourcesDatacenterConnectorsResponse,
  errors: [],
}));

export interface ListProjectsLocationsSourcesDatacenterConnectorsRequest {
  /** Optional. The filter request. */
  filter?: string;
  /** Required. The parent, which owns this collection of connectors. */
  parent: string;
  /** Optional. The maximum number of connectors to return. The service may return fewer than this value. If unspecified, at most 500 sources will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Required. A page token, received from a previous `ListDatacenterConnectors` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDatacenterConnectors` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. the order by fields for the result. */
  orderBy?: string;
}

export const ListProjectsLocationsSourcesDatacenterConnectorsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/datacenterConnectors",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsSourcesDatacenterConnectorsRequest>;

export type ListProjectsLocationsSourcesDatacenterConnectorsResponse =
  ListDatacenterConnectorsResponse;
export const ListProjectsLocationsSourcesDatacenterConnectorsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListDatacenterConnectorsResponse;

export type ListProjectsLocationsSourcesDatacenterConnectorsError =
  DefaultErrors;

/** Lists DatacenterConnectors in a given Source. */
export const listProjectsLocationsSourcesDatacenterConnectors: API.PaginatedOperationMethod<
  ListProjectsLocationsSourcesDatacenterConnectorsRequest,
  ListProjectsLocationsSourcesDatacenterConnectorsResponse,
  ListProjectsLocationsSourcesDatacenterConnectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsSourcesDatacenterConnectorsRequest,
  output: ListProjectsLocationsSourcesDatacenterConnectorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsSourcesDatacenterConnectorsRequest {
  /** Required. The DatacenterConnector's parent. Required. The Source in where the new DatacenterConnector will be created. For example: `projects/my-project/locations/us-central1/sources/my-source` */
  parent: string;
  /** Required. The datacenterConnector identifier. */
  datacenterConnectorId?: string;
  /** A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: DatacenterConnector;
}

export const CreateProjectsLocationsSourcesDatacenterConnectorsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    datacenterConnectorId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("datacenterConnectorId"),
    ),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(DatacenterConnector).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/datacenterConnectors",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsSourcesDatacenterConnectorsRequest>;

export type CreateProjectsLocationsSourcesDatacenterConnectorsResponse =
  Operation;
export const CreateProjectsLocationsSourcesDatacenterConnectorsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsSourcesDatacenterConnectorsError =
  DefaultErrors;

/** Creates a new DatacenterConnector in a given Source. */
export const createProjectsLocationsSourcesDatacenterConnectors: API.OperationMethod<
  CreateProjectsLocationsSourcesDatacenterConnectorsRequest,
  CreateProjectsLocationsSourcesDatacenterConnectorsResponse,
  CreateProjectsLocationsSourcesDatacenterConnectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsSourcesDatacenterConnectorsRequest,
  output: CreateProjectsLocationsSourcesDatacenterConnectorsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsSourcesDatacenterConnectorsRequest {
  /** A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The DatacenterConnector name. */
  name: string;
}

export const DeleteProjectsLocationsSourcesDatacenterConnectorsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/datacenterConnectors/{datacenterConnectorsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsSourcesDatacenterConnectorsRequest>;

export type DeleteProjectsLocationsSourcesDatacenterConnectorsResponse =
  Operation;
export const DeleteProjectsLocationsSourcesDatacenterConnectorsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsSourcesDatacenterConnectorsError =
  DefaultErrors;

/** Deletes a single DatacenterConnector. */
export const deleteProjectsLocationsSourcesDatacenterConnectors: API.OperationMethod<
  DeleteProjectsLocationsSourcesDatacenterConnectorsRequest,
  DeleteProjectsLocationsSourcesDatacenterConnectorsResponse,
  DeleteProjectsLocationsSourcesDatacenterConnectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsSourcesDatacenterConnectorsRequest,
  output: DeleteProjectsLocationsSourcesDatacenterConnectorsResponse,
  errors: [],
}));

export interface GetProjectsLocationsSourcesDatacenterConnectorsRequest {
  /** Required. The name of the DatacenterConnector. */
  name: string;
}

export const GetProjectsLocationsSourcesDatacenterConnectorsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/datacenterConnectors/{datacenterConnectorsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsSourcesDatacenterConnectorsRequest>;

export type GetProjectsLocationsSourcesDatacenterConnectorsResponse =
  DatacenterConnector;
export const GetProjectsLocationsSourcesDatacenterConnectorsResponse =
  /*@__PURE__*/ /*#__PURE__*/ DatacenterConnector;

export type GetProjectsLocationsSourcesDatacenterConnectorsError =
  DefaultErrors;

/** Gets details of a single DatacenterConnector. */
export const getProjectsLocationsSourcesDatacenterConnectors: API.OperationMethod<
  GetProjectsLocationsSourcesDatacenterConnectorsRequest,
  GetProjectsLocationsSourcesDatacenterConnectorsResponse,
  GetProjectsLocationsSourcesDatacenterConnectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsSourcesDatacenterConnectorsRequest,
  output: GetProjectsLocationsSourcesDatacenterConnectorsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsSourcesDiskMigrationJobsRequest {
  /** Optional. Field mask is used to specify the fields to be overwritten in the DiskMigrationJob resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask, then a mask equivalent to all fields that are populated (have a non-empty value), will be implied. */
  updateMask?: string;
  /** Output only. Identifier. The identifier of the DiskMigrationJob. */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request timed out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: DiskMigrationJob;
}

export const PatchProjectsLocationsSourcesDiskMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(DiskMigrationJob).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/diskMigrationJobs/{diskMigrationJobsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsSourcesDiskMigrationJobsRequest>;

export type PatchProjectsLocationsSourcesDiskMigrationJobsResponse = Operation;
export const PatchProjectsLocationsSourcesDiskMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsSourcesDiskMigrationJobsError = DefaultErrors;

/** Updates the parameters of a single DiskMigrationJob. */
export const patchProjectsLocationsSourcesDiskMigrationJobs: API.OperationMethod<
  PatchProjectsLocationsSourcesDiskMigrationJobsRequest,
  PatchProjectsLocationsSourcesDiskMigrationJobsResponse,
  PatchProjectsLocationsSourcesDiskMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsSourcesDiskMigrationJobsRequest,
  output: PatchProjectsLocationsSourcesDiskMigrationJobsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsSourcesDiskMigrationJobsRequest {
  /** Required. The name of the DiskMigrationJob. */
  name: string;
  /** Request body */
  body?: CancelDiskMigrationJobRequest;
}

export const CancelProjectsLocationsSourcesDiskMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CancelDiskMigrationJobRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/diskMigrationJobs/{diskMigrationJobsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsLocationsSourcesDiskMigrationJobsRequest>;

export type CancelProjectsLocationsSourcesDiskMigrationJobsResponse = Operation;
export const CancelProjectsLocationsSourcesDiskMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CancelProjectsLocationsSourcesDiskMigrationJobsError =
  DefaultErrors;

/** Cancels the disk migration job. */
export const cancelProjectsLocationsSourcesDiskMigrationJobs: API.OperationMethod<
  CancelProjectsLocationsSourcesDiskMigrationJobsRequest,
  CancelProjectsLocationsSourcesDiskMigrationJobsResponse,
  CancelProjectsLocationsSourcesDiskMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelProjectsLocationsSourcesDiskMigrationJobsRequest,
  output: CancelProjectsLocationsSourcesDiskMigrationJobsResponse,
  errors: [],
}));

export interface GetProjectsLocationsSourcesDiskMigrationJobsRequest {
  /** Required. The name of the DiskMigrationJob. */
  name: string;
}

export const GetProjectsLocationsSourcesDiskMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/diskMigrationJobs/{diskMigrationJobsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsSourcesDiskMigrationJobsRequest>;

export type GetProjectsLocationsSourcesDiskMigrationJobsResponse =
  DiskMigrationJob;
export const GetProjectsLocationsSourcesDiskMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ DiskMigrationJob;

export type GetProjectsLocationsSourcesDiskMigrationJobsError = DefaultErrors;

/** Gets details of a single DiskMigrationJob. */
export const getProjectsLocationsSourcesDiskMigrationJobs: API.OperationMethod<
  GetProjectsLocationsSourcesDiskMigrationJobsRequest,
  GetProjectsLocationsSourcesDiskMigrationJobsResponse,
  GetProjectsLocationsSourcesDiskMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsSourcesDiskMigrationJobsRequest,
  output: GetProjectsLocationsSourcesDiskMigrationJobsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsSourcesDiskMigrationJobsRequest {
  /** Required. The name of the DiskMigrationJob. */
  name: string;
}

export const DeleteProjectsLocationsSourcesDiskMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/diskMigrationJobs/{diskMigrationJobsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsSourcesDiskMigrationJobsRequest>;

export type DeleteProjectsLocationsSourcesDiskMigrationJobsResponse = Operation;
export const DeleteProjectsLocationsSourcesDiskMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsSourcesDiskMigrationJobsError =
  DefaultErrors;

/** Deletes a single DiskMigrationJob. */
export const deleteProjectsLocationsSourcesDiskMigrationJobs: API.OperationMethod<
  DeleteProjectsLocationsSourcesDiskMigrationJobsRequest,
  DeleteProjectsLocationsSourcesDiskMigrationJobsResponse,
  DeleteProjectsLocationsSourcesDiskMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsSourcesDiskMigrationJobsRequest,
  output: DeleteProjectsLocationsSourcesDiskMigrationJobsResponse,
  errors: [],
}));

export interface ListProjectsLocationsSourcesDiskMigrationJobsRequest {
  /** Required. The parent, which owns this collection of DiskMigrationJobs. */
  parent: string;
  /** Optional. The maximum number of disk migration jobs to return. The service may return fewer than this value. If unspecified, at most 500 disk migration jobs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. Ordering of the result list. */
  orderBy?: string;
  /** Optional. A page token, received from a previous `ListDiskMigrationJobs` call. Provide this to retrieve the subsequent page. When paginating, all parameters provided to `ListDiskMigrationJobs` except `page_size` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The filter request (according to AIP-160). */
  filter?: string;
}

export const ListProjectsLocationsSourcesDiskMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/diskMigrationJobs",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsSourcesDiskMigrationJobsRequest>;

export type ListProjectsLocationsSourcesDiskMigrationJobsResponse =
  ListDiskMigrationJobsResponse;
export const ListProjectsLocationsSourcesDiskMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListDiskMigrationJobsResponse;

export type ListProjectsLocationsSourcesDiskMigrationJobsError = DefaultErrors;

/** Lists DiskMigrationJobs in a given Source. */
export const listProjectsLocationsSourcesDiskMigrationJobs: API.PaginatedOperationMethod<
  ListProjectsLocationsSourcesDiskMigrationJobsRequest,
  ListProjectsLocationsSourcesDiskMigrationJobsResponse,
  ListProjectsLocationsSourcesDiskMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsSourcesDiskMigrationJobsRequest,
  output: ListProjectsLocationsSourcesDiskMigrationJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsSourcesDiskMigrationJobsRequest {
  /** Required. The DiskMigrationJob's parent. */
  parent: string;
  /** Required. The DiskMigrationJob identifier. The maximum length of this value is 63 characters. Valid characters are lower case Latin letters, digits and hyphen. It must start with a Latin letter and must not end with a hyphen. */
  diskMigrationJobId?: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request timed out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: DiskMigrationJob;
}

export const CreateProjectsLocationsSourcesDiskMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    diskMigrationJobId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("diskMigrationJobId"),
    ),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(DiskMigrationJob).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/diskMigrationJobs",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsSourcesDiskMigrationJobsRequest>;

export type CreateProjectsLocationsSourcesDiskMigrationJobsResponse = Operation;
export const CreateProjectsLocationsSourcesDiskMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsSourcesDiskMigrationJobsError =
  DefaultErrors;

/** Creates a new disk migration job in a given Source. */
export const createProjectsLocationsSourcesDiskMigrationJobs: API.OperationMethod<
  CreateProjectsLocationsSourcesDiskMigrationJobsRequest,
  CreateProjectsLocationsSourcesDiskMigrationJobsResponse,
  CreateProjectsLocationsSourcesDiskMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsSourcesDiskMigrationJobsRequest,
  output: CreateProjectsLocationsSourcesDiskMigrationJobsResponse,
  errors: [],
}));

export interface RunProjectsLocationsSourcesDiskMigrationJobsRequest {
  /** Required. The name of the DiskMigrationJob. */
  name: string;
  /** Request body */
  body?: RunDiskMigrationJobRequest;
}

export const RunProjectsLocationsSourcesDiskMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(RunDiskMigrationJobRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/diskMigrationJobs/{diskMigrationJobsId}:run",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RunProjectsLocationsSourcesDiskMigrationJobsRequest>;

export type RunProjectsLocationsSourcesDiskMigrationJobsResponse = Operation;
export const RunProjectsLocationsSourcesDiskMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type RunProjectsLocationsSourcesDiskMigrationJobsError = DefaultErrors;

/** Runs the disk migration job. */
export const runProjectsLocationsSourcesDiskMigrationJobs: API.OperationMethod<
  RunProjectsLocationsSourcesDiskMigrationJobsRequest,
  RunProjectsLocationsSourcesDiskMigrationJobsResponse,
  RunProjectsLocationsSourcesDiskMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RunProjectsLocationsSourcesDiskMigrationJobsRequest,
  output: RunProjectsLocationsSourcesDiskMigrationJobsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsSourcesUtilizationReportsRequest {
  /** Required. The Utilization Report's parent. */
  parent: string;
  /** A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The ID to use for the report, which will become the final component of the reports's resource name. This value maximum length is 63 characters, and valid characters are /a-z-/. It must start with an english letter and must not end with a hyphen. */
  utilizationReportId?: string;
  /** Request body */
  body?: UtilizationReport;
}

export const CreateProjectsLocationsSourcesUtilizationReportsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    utilizationReportId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("utilizationReportId"),
    ),
    body: Schema.optional(UtilizationReport).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/utilizationReports",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsSourcesUtilizationReportsRequest>;

export type CreateProjectsLocationsSourcesUtilizationReportsResponse =
  Operation;
export const CreateProjectsLocationsSourcesUtilizationReportsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsSourcesUtilizationReportsError =
  DefaultErrors;

/** Creates a new UtilizationReport. */
export const createProjectsLocationsSourcesUtilizationReports: API.OperationMethod<
  CreateProjectsLocationsSourcesUtilizationReportsRequest,
  CreateProjectsLocationsSourcesUtilizationReportsResponse,
  CreateProjectsLocationsSourcesUtilizationReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsSourcesUtilizationReportsRequest,
  output: CreateProjectsLocationsSourcesUtilizationReportsResponse,
  errors: [],
}));

export interface ListProjectsLocationsSourcesUtilizationReportsRequest {
  /** Optional. the order by fields for the result. */
  orderBy?: string;
  /** Optional. The level of details of each report. Defaults to BASIC. */
  view?:
    | "UTILIZATION_REPORT_VIEW_UNSPECIFIED"
    | "BASIC"
    | "FULL"
    | (string & {});
  /** Optional. The filter request. */
  filter?: string;
  /** Optional. The maximum number of reports to return. The service may return fewer than this value. If unspecified, at most 500 reports will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Required. The Utilization Reports parent. */
  parent: string;
  /** Required. A page token, received from a previous `ListUtilizationReports` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListUtilizationReports` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsSourcesUtilizationReportsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/utilizationReports",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsSourcesUtilizationReportsRequest>;

export type ListProjectsLocationsSourcesUtilizationReportsResponse =
  ListUtilizationReportsResponse;
export const ListProjectsLocationsSourcesUtilizationReportsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListUtilizationReportsResponse;

export type ListProjectsLocationsSourcesUtilizationReportsError = DefaultErrors;

/** Lists Utilization Reports of the given Source. */
export const listProjectsLocationsSourcesUtilizationReports: API.PaginatedOperationMethod<
  ListProjectsLocationsSourcesUtilizationReportsRequest,
  ListProjectsLocationsSourcesUtilizationReportsResponse,
  ListProjectsLocationsSourcesUtilizationReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsSourcesUtilizationReportsRequest,
  output: ListProjectsLocationsSourcesUtilizationReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsSourcesUtilizationReportsRequest {
  /** Required. The Utilization Report name. */
  name: string;
  /** Optional. The level of details of the report. Defaults to FULL */
  view?:
    | "UTILIZATION_REPORT_VIEW_UNSPECIFIED"
    | "BASIC"
    | "FULL"
    | (string & {});
}

export const GetProjectsLocationsSourcesUtilizationReportsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/utilizationReports/{utilizationReportsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsSourcesUtilizationReportsRequest>;

export type GetProjectsLocationsSourcesUtilizationReportsResponse =
  UtilizationReport;
export const GetProjectsLocationsSourcesUtilizationReportsResponse =
  /*@__PURE__*/ /*#__PURE__*/ UtilizationReport;

export type GetProjectsLocationsSourcesUtilizationReportsError = DefaultErrors;

/** Gets a single Utilization Report. */
export const getProjectsLocationsSourcesUtilizationReports: API.OperationMethod<
  GetProjectsLocationsSourcesUtilizationReportsRequest,
  GetProjectsLocationsSourcesUtilizationReportsResponse,
  GetProjectsLocationsSourcesUtilizationReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsSourcesUtilizationReportsRequest,
  output: GetProjectsLocationsSourcesUtilizationReportsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsSourcesUtilizationReportsRequest {
  /** Required. The Utilization Report name. */
  name: string;
  /** Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsSourcesUtilizationReportsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/utilizationReports/{utilizationReportsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsSourcesUtilizationReportsRequest>;

export type DeleteProjectsLocationsSourcesUtilizationReportsResponse =
  Operation;
export const DeleteProjectsLocationsSourcesUtilizationReportsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsSourcesUtilizationReportsError =
  DefaultErrors;

/** Deletes a single Utilization Report. */
export const deleteProjectsLocationsSourcesUtilizationReports: API.OperationMethod<
  DeleteProjectsLocationsSourcesUtilizationReportsRequest,
  DeleteProjectsLocationsSourcesUtilizationReportsResponse,
  DeleteProjectsLocationsSourcesUtilizationReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsSourcesUtilizationReportsRequest,
  output: DeleteProjectsLocationsSourcesUtilizationReportsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsSourcesMigratingVmsRequest {
  /** A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The MigratingVm's parent. */
  parent: string;
  /** Required. The migratingVm identifier. */
  migratingVmId?: string;
  /** Request body */
  body?: MigratingVm;
}

export const CreateProjectsLocationsSourcesMigratingVmsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    migratingVmId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("migratingVmId"),
    ),
    body: Schema.optional(MigratingVm).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/migratingVms",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsSourcesMigratingVmsRequest>;

export type CreateProjectsLocationsSourcesMigratingVmsResponse = Operation;
export const CreateProjectsLocationsSourcesMigratingVmsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsSourcesMigratingVmsError = DefaultErrors;

/** Creates a new MigratingVm in a given Source. */
export const createProjectsLocationsSourcesMigratingVms: API.OperationMethod<
  CreateProjectsLocationsSourcesMigratingVmsRequest,
  CreateProjectsLocationsSourcesMigratingVmsResponse,
  CreateProjectsLocationsSourcesMigratingVmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsSourcesMigratingVmsRequest,
  output: CreateProjectsLocationsSourcesMigratingVmsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsSourcesMigratingVmsRequest {
  /** Field mask is used to specify the fields to be overwritten in the MigratingVm resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Output only. The identifier of the MigratingVm. */
  name: string;
  /** A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: MigratingVm;
}

export const PatchProjectsLocationsSourcesMigratingVmsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(MigratingVm).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/migratingVms/{migratingVmsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsSourcesMigratingVmsRequest>;

export type PatchProjectsLocationsSourcesMigratingVmsResponse = Operation;
export const PatchProjectsLocationsSourcesMigratingVmsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsSourcesMigratingVmsError = DefaultErrors;

/** Updates the parameters of a single MigratingVm. */
export const patchProjectsLocationsSourcesMigratingVms: API.OperationMethod<
  PatchProjectsLocationsSourcesMigratingVmsRequest,
  PatchProjectsLocationsSourcesMigratingVmsResponse,
  PatchProjectsLocationsSourcesMigratingVmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsSourcesMigratingVmsRequest,
  output: PatchProjectsLocationsSourcesMigratingVmsResponse,
  errors: [],
}));

export interface ListProjectsLocationsSourcesMigratingVmsRequest {
  /** Required. The parent, which owns this collection of MigratingVms. */
  parent: string;
  /** Required. A page token, received from a previous `ListMigratingVms` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMigratingVms` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The level of details of each migrating VM. */
  view?:
    | "MIGRATING_VM_VIEW_UNSPECIFIED"
    | "MIGRATING_VM_VIEW_BASIC"
    | "MIGRATING_VM_VIEW_FULL"
    | (string & {});
  /** Optional. The maximum number of migrating VMs to return. The service may return fewer than this value. If unspecified, at most 500 migrating VMs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. the order by fields for the result. */
  orderBy?: string;
  /** Optional. The filter request. */
  filter?: string;
}

export const ListProjectsLocationsSourcesMigratingVmsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/migratingVms",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsSourcesMigratingVmsRequest>;

export type ListProjectsLocationsSourcesMigratingVmsResponse =
  ListMigratingVmsResponse;
export const ListProjectsLocationsSourcesMigratingVmsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListMigratingVmsResponse;

export type ListProjectsLocationsSourcesMigratingVmsError = DefaultErrors;

/** Lists MigratingVms in a given Source. */
export const listProjectsLocationsSourcesMigratingVms: API.PaginatedOperationMethod<
  ListProjectsLocationsSourcesMigratingVmsRequest,
  ListProjectsLocationsSourcesMigratingVmsResponse,
  ListProjectsLocationsSourcesMigratingVmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsSourcesMigratingVmsRequest,
  output: ListProjectsLocationsSourcesMigratingVmsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsSourcesMigratingVmsRequest {
  /** Required. The name of the MigratingVm. */
  name: string;
  /** Optional. The level of details of the migrating VM. */
  view?:
    | "MIGRATING_VM_VIEW_UNSPECIFIED"
    | "MIGRATING_VM_VIEW_BASIC"
    | "MIGRATING_VM_VIEW_FULL"
    | (string & {});
}

export const GetProjectsLocationsSourcesMigratingVmsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/migratingVms/{migratingVmsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsSourcesMigratingVmsRequest>;

export type GetProjectsLocationsSourcesMigratingVmsResponse = MigratingVm;
export const GetProjectsLocationsSourcesMigratingVmsResponse =
  /*@__PURE__*/ /*#__PURE__*/ MigratingVm;

export type GetProjectsLocationsSourcesMigratingVmsError = DefaultErrors;

/** Gets details of a single MigratingVm. */
export const getProjectsLocationsSourcesMigratingVms: API.OperationMethod<
  GetProjectsLocationsSourcesMigratingVmsRequest,
  GetProjectsLocationsSourcesMigratingVmsResponse,
  GetProjectsLocationsSourcesMigratingVmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsSourcesMigratingVmsRequest,
  output: GetProjectsLocationsSourcesMigratingVmsResponse,
  errors: [],
}));

export interface FinalizeMigrationProjectsLocationsSourcesMigratingVmsRequest {
  /** Required. The name of the MigratingVm. */
  migratingVm: string;
  /** Request body */
  body?: FinalizeMigrationRequest;
}

export const FinalizeMigrationProjectsLocationsSourcesMigratingVmsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    migratingVm: Schema.String.pipe(T.HttpPath("migratingVm")),
    body: Schema.optional(FinalizeMigrationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/migratingVms/{migratingVmsId}:finalizeMigration",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<FinalizeMigrationProjectsLocationsSourcesMigratingVmsRequest>;

export type FinalizeMigrationProjectsLocationsSourcesMigratingVmsResponse =
  Operation;
export const FinalizeMigrationProjectsLocationsSourcesMigratingVmsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type FinalizeMigrationProjectsLocationsSourcesMigratingVmsError =
  DefaultErrors;

/** Marks a migration as completed, deleting migration resources that are no longer being used. Only applicable after cutover is done. */
export const finalizeMigrationProjectsLocationsSourcesMigratingVms: API.OperationMethod<
  FinalizeMigrationProjectsLocationsSourcesMigratingVmsRequest,
  FinalizeMigrationProjectsLocationsSourcesMigratingVmsResponse,
  FinalizeMigrationProjectsLocationsSourcesMigratingVmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: FinalizeMigrationProjectsLocationsSourcesMigratingVmsRequest,
  output: FinalizeMigrationProjectsLocationsSourcesMigratingVmsResponse,
  errors: [],
}));

export interface PauseMigrationProjectsLocationsSourcesMigratingVmsRequest {
  /** Required. The name of the MigratingVm. */
  migratingVm: string;
  /** Request body */
  body?: PauseMigrationRequest;
}

export const PauseMigrationProjectsLocationsSourcesMigratingVmsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    migratingVm: Schema.String.pipe(T.HttpPath("migratingVm")),
    body: Schema.optional(PauseMigrationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/migratingVms/{migratingVmsId}:pauseMigration",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PauseMigrationProjectsLocationsSourcesMigratingVmsRequest>;

export type PauseMigrationProjectsLocationsSourcesMigratingVmsResponse =
  Operation;
export const PauseMigrationProjectsLocationsSourcesMigratingVmsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PauseMigrationProjectsLocationsSourcesMigratingVmsError =
  DefaultErrors;

/** Pauses a migration for a VM. If cycle tasks are running they will be cancelled, preserving source task data. Further replication cycles will not be triggered while the VM is paused. */
export const pauseMigrationProjectsLocationsSourcesMigratingVms: API.OperationMethod<
  PauseMigrationProjectsLocationsSourcesMigratingVmsRequest,
  PauseMigrationProjectsLocationsSourcesMigratingVmsResponse,
  PauseMigrationProjectsLocationsSourcesMigratingVmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PauseMigrationProjectsLocationsSourcesMigratingVmsRequest,
  output: PauseMigrationProjectsLocationsSourcesMigratingVmsResponse,
  errors: [],
}));

export interface StartMigrationProjectsLocationsSourcesMigratingVmsRequest {
  /** Required. The name of the MigratingVm. */
  migratingVm: string;
  /** Request body */
  body?: StartMigrationRequest;
}

export const StartMigrationProjectsLocationsSourcesMigratingVmsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    migratingVm: Schema.String.pipe(T.HttpPath("migratingVm")),
    body: Schema.optional(StartMigrationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/migratingVms/{migratingVmsId}:startMigration",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<StartMigrationProjectsLocationsSourcesMigratingVmsRequest>;

export type StartMigrationProjectsLocationsSourcesMigratingVmsResponse =
  Operation;
export const StartMigrationProjectsLocationsSourcesMigratingVmsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type StartMigrationProjectsLocationsSourcesMigratingVmsError =
  DefaultErrors;

/** Starts migration for a VM. Starts the process of uploading data and creating snapshots, in replication cycles scheduled by the policy. */
export const startMigrationProjectsLocationsSourcesMigratingVms: API.OperationMethod<
  StartMigrationProjectsLocationsSourcesMigratingVmsRequest,
  StartMigrationProjectsLocationsSourcesMigratingVmsResponse,
  StartMigrationProjectsLocationsSourcesMigratingVmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartMigrationProjectsLocationsSourcesMigratingVmsRequest,
  output: StartMigrationProjectsLocationsSourcesMigratingVmsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsSourcesMigratingVmsRequest {
  /** Required. The name of the MigratingVm. */
  name: string;
}

export const DeleteProjectsLocationsSourcesMigratingVmsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/migratingVms/{migratingVmsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsSourcesMigratingVmsRequest>;

export type DeleteProjectsLocationsSourcesMigratingVmsResponse = Operation;
export const DeleteProjectsLocationsSourcesMigratingVmsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsSourcesMigratingVmsError = DefaultErrors;

/** Deletes a single MigratingVm. */
export const deleteProjectsLocationsSourcesMigratingVms: API.OperationMethod<
  DeleteProjectsLocationsSourcesMigratingVmsRequest,
  DeleteProjectsLocationsSourcesMigratingVmsResponse,
  DeleteProjectsLocationsSourcesMigratingVmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsSourcesMigratingVmsRequest,
  output: DeleteProjectsLocationsSourcesMigratingVmsResponse,
  errors: [],
}));

export interface ResumeMigrationProjectsLocationsSourcesMigratingVmsRequest {
  /** Required. The name of the MigratingVm. */
  migratingVm: string;
  /** Request body */
  body?: ResumeMigrationRequest;
}

export const ResumeMigrationProjectsLocationsSourcesMigratingVmsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    migratingVm: Schema.String.pipe(T.HttpPath("migratingVm")),
    body: Schema.optional(ResumeMigrationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/migratingVms/{migratingVmsId}:resumeMigration",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ResumeMigrationProjectsLocationsSourcesMigratingVmsRequest>;

export type ResumeMigrationProjectsLocationsSourcesMigratingVmsResponse =
  Operation;
export const ResumeMigrationProjectsLocationsSourcesMigratingVmsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type ResumeMigrationProjectsLocationsSourcesMigratingVmsError =
  DefaultErrors;

/** Resumes a migration for a VM. When called on a paused migration, will start the process of uploading data and creating snapshots; when called on a completed cut-over migration, will update the migration to active state and start the process of uploading data and creating snapshots. */
export const resumeMigrationProjectsLocationsSourcesMigratingVms: API.OperationMethod<
  ResumeMigrationProjectsLocationsSourcesMigratingVmsRequest,
  ResumeMigrationProjectsLocationsSourcesMigratingVmsResponse,
  ResumeMigrationProjectsLocationsSourcesMigratingVmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ResumeMigrationProjectsLocationsSourcesMigratingVmsRequest,
  output: ResumeMigrationProjectsLocationsSourcesMigratingVmsResponse,
  errors: [],
}));

export interface ExtendMigrationProjectsLocationsSourcesMigratingVmsRequest {
  /** Required. The name of the MigratingVm. */
  migratingVm: string;
  /** Request body */
  body?: ExtendMigrationRequest;
}

export const ExtendMigrationProjectsLocationsSourcesMigratingVmsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    migratingVm: Schema.String.pipe(T.HttpPath("migratingVm")),
    body: Schema.optional(ExtendMigrationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/migratingVms/{migratingVmsId}:extendMigration",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExtendMigrationProjectsLocationsSourcesMigratingVmsRequest>;

export type ExtendMigrationProjectsLocationsSourcesMigratingVmsResponse =
  Operation;
export const ExtendMigrationProjectsLocationsSourcesMigratingVmsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type ExtendMigrationProjectsLocationsSourcesMigratingVmsError =
  DefaultErrors;

/** Extend the migrating VM time to live. */
export const extendMigrationProjectsLocationsSourcesMigratingVms: API.OperationMethod<
  ExtendMigrationProjectsLocationsSourcesMigratingVmsRequest,
  ExtendMigrationProjectsLocationsSourcesMigratingVmsResponse,
  ExtendMigrationProjectsLocationsSourcesMigratingVmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExtendMigrationProjectsLocationsSourcesMigratingVmsRequest,
  output: ExtendMigrationProjectsLocationsSourcesMigratingVmsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsSourcesMigratingVmsCloneJobsRequest {
  /** Required. The clone job id */
  name: string;
  /** Request body */
  body?: CancelCloneJobRequest;
}

export const CancelProjectsLocationsSourcesMigratingVmsCloneJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CancelCloneJobRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/migratingVms/{migratingVmsId}/cloneJobs/{cloneJobsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsLocationsSourcesMigratingVmsCloneJobsRequest>;

export type CancelProjectsLocationsSourcesMigratingVmsCloneJobsResponse =
  Operation;
export const CancelProjectsLocationsSourcesMigratingVmsCloneJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CancelProjectsLocationsSourcesMigratingVmsCloneJobsError =
  DefaultErrors;

/** Initiates the cancellation of a running clone job. */
export const cancelProjectsLocationsSourcesMigratingVmsCloneJobs: API.OperationMethod<
  CancelProjectsLocationsSourcesMigratingVmsCloneJobsRequest,
  CancelProjectsLocationsSourcesMigratingVmsCloneJobsResponse,
  CancelProjectsLocationsSourcesMigratingVmsCloneJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelProjectsLocationsSourcesMigratingVmsCloneJobsRequest,
  output: CancelProjectsLocationsSourcesMigratingVmsCloneJobsResponse,
  errors: [],
}));

export interface ListProjectsLocationsSourcesMigratingVmsCloneJobsRequest {
  /** Required. A page token, received from a previous `ListCloneJobs` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListCloneJobs` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The maximum number of clone jobs to return. The service may return fewer than this value. If unspecified, at most 500 clone jobs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Required. The parent, which owns this collection of source VMs. */
  parent: string;
  /** Optional. The filter request. */
  filter?: string;
  /** Optional. the order by fields for the result. */
  orderBy?: string;
}

export const ListProjectsLocationsSourcesMigratingVmsCloneJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/migratingVms/{migratingVmsId}/cloneJobs",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsSourcesMigratingVmsCloneJobsRequest>;

export type ListProjectsLocationsSourcesMigratingVmsCloneJobsResponse =
  ListCloneJobsResponse;
export const ListProjectsLocationsSourcesMigratingVmsCloneJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListCloneJobsResponse;

export type ListProjectsLocationsSourcesMigratingVmsCloneJobsError =
  DefaultErrors;

/** Lists the CloneJobs of a migrating VM. Only 25 most recent CloneJobs are listed. */
export const listProjectsLocationsSourcesMigratingVmsCloneJobs: API.PaginatedOperationMethod<
  ListProjectsLocationsSourcesMigratingVmsCloneJobsRequest,
  ListProjectsLocationsSourcesMigratingVmsCloneJobsResponse,
  ListProjectsLocationsSourcesMigratingVmsCloneJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsSourcesMigratingVmsCloneJobsRequest,
  output: ListProjectsLocationsSourcesMigratingVmsCloneJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsSourcesMigratingVmsCloneJobsRequest {
  /** Required. The name of the CloneJob. */
  name: string;
}

export const GetProjectsLocationsSourcesMigratingVmsCloneJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/migratingVms/{migratingVmsId}/cloneJobs/{cloneJobsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsSourcesMigratingVmsCloneJobsRequest>;

export type GetProjectsLocationsSourcesMigratingVmsCloneJobsResponse = CloneJob;
export const GetProjectsLocationsSourcesMigratingVmsCloneJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CloneJob;

export type GetProjectsLocationsSourcesMigratingVmsCloneJobsError =
  DefaultErrors;

/** Gets details of a single CloneJob. */
export const getProjectsLocationsSourcesMigratingVmsCloneJobs: API.OperationMethod<
  GetProjectsLocationsSourcesMigratingVmsCloneJobsRequest,
  GetProjectsLocationsSourcesMigratingVmsCloneJobsResponse,
  GetProjectsLocationsSourcesMigratingVmsCloneJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsSourcesMigratingVmsCloneJobsRequest,
  output: GetProjectsLocationsSourcesMigratingVmsCloneJobsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsSourcesMigratingVmsCloneJobsRequest {
  /** Required. The clone job identifier. */
  cloneJobId?: string;
  /** A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The Clone's parent. */
  parent: string;
  /** Request body */
  body?: CloneJob;
}

export const CreateProjectsLocationsSourcesMigratingVmsCloneJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    cloneJobId: Schema.optional(Schema.String).pipe(T.HttpQuery("cloneJobId")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(CloneJob).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/migratingVms/{migratingVmsId}/cloneJobs",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsSourcesMigratingVmsCloneJobsRequest>;

export type CreateProjectsLocationsSourcesMigratingVmsCloneJobsResponse =
  Operation;
export const CreateProjectsLocationsSourcesMigratingVmsCloneJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsSourcesMigratingVmsCloneJobsError =
  DefaultErrors;

/** Initiates a Clone of a specific migrating VM. */
export const createProjectsLocationsSourcesMigratingVmsCloneJobs: API.OperationMethod<
  CreateProjectsLocationsSourcesMigratingVmsCloneJobsRequest,
  CreateProjectsLocationsSourcesMigratingVmsCloneJobsResponse,
  CreateProjectsLocationsSourcesMigratingVmsCloneJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsSourcesMigratingVmsCloneJobsRequest,
  output: CreateProjectsLocationsSourcesMigratingVmsCloneJobsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsSourcesMigratingVmsCutoverJobsRequest {
  /** Required. The cutover job identifier. */
  cutoverJobId?: string;
  /** A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The Cutover's parent. */
  parent: string;
  /** Request body */
  body?: CutoverJob;
}

export const CreateProjectsLocationsSourcesMigratingVmsCutoverJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    cutoverJobId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("cutoverJobId"),
    ),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(CutoverJob).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/migratingVms/{migratingVmsId}/cutoverJobs",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsSourcesMigratingVmsCutoverJobsRequest>;

export type CreateProjectsLocationsSourcesMigratingVmsCutoverJobsResponse =
  Operation;
export const CreateProjectsLocationsSourcesMigratingVmsCutoverJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsSourcesMigratingVmsCutoverJobsError =
  DefaultErrors;

/** Initiates a Cutover of a specific migrating VM. The returned LRO is completed when the cutover job resource is created and the job is initiated. */
export const createProjectsLocationsSourcesMigratingVmsCutoverJobs: API.OperationMethod<
  CreateProjectsLocationsSourcesMigratingVmsCutoverJobsRequest,
  CreateProjectsLocationsSourcesMigratingVmsCutoverJobsResponse,
  CreateProjectsLocationsSourcesMigratingVmsCutoverJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsSourcesMigratingVmsCutoverJobsRequest,
  output: CreateProjectsLocationsSourcesMigratingVmsCutoverJobsResponse,
  errors: [],
}));

export interface GetProjectsLocationsSourcesMigratingVmsCutoverJobsRequest {
  /** Required. The name of the CutoverJob. */
  name: string;
}

export const GetProjectsLocationsSourcesMigratingVmsCutoverJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/migratingVms/{migratingVmsId}/cutoverJobs/{cutoverJobsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsSourcesMigratingVmsCutoverJobsRequest>;

export type GetProjectsLocationsSourcesMigratingVmsCutoverJobsResponse =
  CutoverJob;
export const GetProjectsLocationsSourcesMigratingVmsCutoverJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CutoverJob;

export type GetProjectsLocationsSourcesMigratingVmsCutoverJobsError =
  DefaultErrors;

/** Gets details of a single CutoverJob. */
export const getProjectsLocationsSourcesMigratingVmsCutoverJobs: API.OperationMethod<
  GetProjectsLocationsSourcesMigratingVmsCutoverJobsRequest,
  GetProjectsLocationsSourcesMigratingVmsCutoverJobsResponse,
  GetProjectsLocationsSourcesMigratingVmsCutoverJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsSourcesMigratingVmsCutoverJobsRequest,
  output: GetProjectsLocationsSourcesMigratingVmsCutoverJobsResponse,
  errors: [],
}));

export interface ListProjectsLocationsSourcesMigratingVmsCutoverJobsRequest {
  /** Required. A page token, received from a previous `ListCutoverJobs` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListCutoverJobs` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. the order by fields for the result. */
  orderBy?: string;
  /** Required. The parent, which owns this collection of migrating VMs. */
  parent: string;
  /** Optional. The maximum number of cutover jobs to return. The service may return fewer than this value. If unspecified, at most 500 cutover jobs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. The filter request. */
  filter?: string;
}

export const ListProjectsLocationsSourcesMigratingVmsCutoverJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/migratingVms/{migratingVmsId}/cutoverJobs",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsSourcesMigratingVmsCutoverJobsRequest>;

export type ListProjectsLocationsSourcesMigratingVmsCutoverJobsResponse =
  ListCutoverJobsResponse;
export const ListProjectsLocationsSourcesMigratingVmsCutoverJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListCutoverJobsResponse;

export type ListProjectsLocationsSourcesMigratingVmsCutoverJobsError =
  DefaultErrors;

/** Lists the CutoverJobs of a migrating VM. Only 25 most recent CutoverJobs are listed. */
export const listProjectsLocationsSourcesMigratingVmsCutoverJobs: API.PaginatedOperationMethod<
  ListProjectsLocationsSourcesMigratingVmsCutoverJobsRequest,
  ListProjectsLocationsSourcesMigratingVmsCutoverJobsResponse,
  ListProjectsLocationsSourcesMigratingVmsCutoverJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsSourcesMigratingVmsCutoverJobsRequest,
  output: ListProjectsLocationsSourcesMigratingVmsCutoverJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CancelProjectsLocationsSourcesMigratingVmsCutoverJobsRequest {
  /** Required. The cutover job id */
  name: string;
  /** Request body */
  body?: CancelCutoverJobRequest;
}

export const CancelProjectsLocationsSourcesMigratingVmsCutoverJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CancelCutoverJobRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/migratingVms/{migratingVmsId}/cutoverJobs/{cutoverJobsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsLocationsSourcesMigratingVmsCutoverJobsRequest>;

export type CancelProjectsLocationsSourcesMigratingVmsCutoverJobsResponse =
  Operation;
export const CancelProjectsLocationsSourcesMigratingVmsCutoverJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CancelProjectsLocationsSourcesMigratingVmsCutoverJobsError =
  DefaultErrors;

/** Initiates the cancellation of a running cutover job. */
export const cancelProjectsLocationsSourcesMigratingVmsCutoverJobs: API.OperationMethod<
  CancelProjectsLocationsSourcesMigratingVmsCutoverJobsRequest,
  CancelProjectsLocationsSourcesMigratingVmsCutoverJobsResponse,
  CancelProjectsLocationsSourcesMigratingVmsCutoverJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelProjectsLocationsSourcesMigratingVmsCutoverJobsRequest,
  output: CancelProjectsLocationsSourcesMigratingVmsCutoverJobsResponse,
  errors: [],
}));

export interface GetProjectsLocationsSourcesMigratingVmsReplicationCyclesRequest {
  /** Required. The name of the ReplicationCycle. */
  name: string;
}

export const GetProjectsLocationsSourcesMigratingVmsReplicationCyclesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/migratingVms/{migratingVmsId}/replicationCycles/{replicationCyclesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsSourcesMigratingVmsReplicationCyclesRequest>;

export type GetProjectsLocationsSourcesMigratingVmsReplicationCyclesResponse =
  ReplicationCycle;
export const GetProjectsLocationsSourcesMigratingVmsReplicationCyclesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ReplicationCycle;

export type GetProjectsLocationsSourcesMigratingVmsReplicationCyclesError =
  DefaultErrors;

/** Gets details of a single ReplicationCycle. */
export const getProjectsLocationsSourcesMigratingVmsReplicationCycles: API.OperationMethod<
  GetProjectsLocationsSourcesMigratingVmsReplicationCyclesRequest,
  GetProjectsLocationsSourcesMigratingVmsReplicationCyclesResponse,
  GetProjectsLocationsSourcesMigratingVmsReplicationCyclesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsSourcesMigratingVmsReplicationCyclesRequest,
  output: GetProjectsLocationsSourcesMigratingVmsReplicationCyclesResponse,
  errors: [],
}));

export interface ListProjectsLocationsSourcesMigratingVmsReplicationCyclesRequest {
  /** Optional. The filter request. */
  filter?: string;
  /** Optional. The maximum number of replication cycles to return. The service may return fewer than this value. If unspecified, at most 100 migrating VMs will be returned. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Required. A page token, received from a previous `ListReplicationCycles` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListReplicationCycles` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The parent, which owns this collection of ReplicationCycles. */
  parent: string;
  /** Optional. the order by fields for the result. */
  orderBy?: string;
}

export const ListProjectsLocationsSourcesMigratingVmsReplicationCyclesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/sources/{sourcesId}/migratingVms/{migratingVmsId}/replicationCycles",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsSourcesMigratingVmsReplicationCyclesRequest>;

export type ListProjectsLocationsSourcesMigratingVmsReplicationCyclesResponse =
  ListReplicationCyclesResponse;
export const ListProjectsLocationsSourcesMigratingVmsReplicationCyclesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListReplicationCyclesResponse;

export type ListProjectsLocationsSourcesMigratingVmsReplicationCyclesError =
  DefaultErrors;

/** Lists ReplicationCycles in a given MigratingVM. */
export const listProjectsLocationsSourcesMigratingVmsReplicationCycles: API.PaginatedOperationMethod<
  ListProjectsLocationsSourcesMigratingVmsReplicationCyclesRequest,
  ListProjectsLocationsSourcesMigratingVmsReplicationCyclesResponse,
  ListProjectsLocationsSourcesMigratingVmsReplicationCyclesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsSourcesMigratingVmsReplicationCyclesRequest,
  output: ListProjectsLocationsSourcesMigratingVmsReplicationCyclesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsOperationsRequest {
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list page size. */
  pageSize?: number;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page token. */
  pageToken?: string;
  /** The standard list filter. */
  filter?: string;
}

export const ListProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    name: Schema.String.pipe(T.HttpPath("name")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/operations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListOperationsResponse;

export type ListProjectsLocationsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsOperationsRequest,
  ListProjectsLocationsOperationsResponse,
  ListProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteProjectsLocationsOperations: API.OperationMethod<
  DeleteProjectsLocationsOperationsRequest,
  DeleteProjectsLocationsOperationsResponse,
  DeleteProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const CancelProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type CancelProjectsLocationsOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelProjectsLocationsOperations: API.OperationMethod<
  CancelProjectsLocationsOperationsRequest,
  CancelProjectsLocationsOperationsResponse,
  CancelProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type GetProjectsLocationsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOperations: API.OperationMethod<
  GetProjectsLocationsOperationsRequest,
  GetProjectsLocationsOperationsResponse,
  GetProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));
