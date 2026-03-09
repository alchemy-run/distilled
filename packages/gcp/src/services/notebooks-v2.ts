// ==========================================================================
// Notebooks API (notebooks v2)
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
  name: "notebooks",
  version: "v2",
  rootUrl: "https://notebooks.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

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

export const Location: Schema.Schema<Location> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      locationId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
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

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.Number),
      message: Schema.optional(Schema.String),
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
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

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      operations: Schema.optional(Schema.Array(Operation)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListOperationsResponse",
  }) as any as Schema.Schema<ListOperationsResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface CancelOperationRequest {}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelOperationRequest",
  }) as any as Schema.Schema<CancelOperationRequest>;

export interface AcceleratorConfig {
  /** Optional. Type of this accelerator. */
  type?:
    | "ACCELERATOR_TYPE_UNSPECIFIED"
    | "NVIDIA_TESLA_P100"
    | "NVIDIA_TESLA_V100"
    | "NVIDIA_TESLA_P4"
    | "NVIDIA_TESLA_T4"
    | "NVIDIA_TESLA_A100"
    | "NVIDIA_A100_80GB"
    | "NVIDIA_L4"
    | "NVIDIA_H100_80GB"
    | "NVIDIA_H100_MEGA_80GB"
    | "NVIDIA_H200_141GB"
    | "NVIDIA_TESLA_T4_VWS"
    | "NVIDIA_TESLA_P100_VWS"
    | "NVIDIA_TESLA_P4_VWS"
    | "NVIDIA_B200"
    | (string & {});
  /** Optional. Count of cores of this accelerator. */
  coreCount?: string;
}

export const AcceleratorConfig: Schema.Schema<AcceleratorConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      coreCount: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AcceleratorConfig",
  }) as any as Schema.Schema<AcceleratorConfig>;

export interface ServiceAccount {
  /** Optional. Email address of the service account. */
  email?: string;
  /** Output only. The list of scopes to be made available for this service account. Set by the CLH to https://www.googleapis.com/auth/cloud-platform */
  scopes?: Array<string>;
}

export const ServiceAccount: Schema.Schema<ServiceAccount> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      email: Schema.optional(Schema.String),
      scopes: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ServiceAccount",
  }) as any as Schema.Schema<ServiceAccount>;

export interface VmImage {
  /** Required. The name of the Google Cloud project that this VM image belongs to. Format: `{project_id}` */
  project?: string;
  /** Optional. Use VM image name to find the image. */
  name?: string;
  /** Optional. Use this VM image family to find the image; the newest image in this family will be used. */
  family?: string;
}

export const VmImage: Schema.Schema<VmImage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      project: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      family: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "VmImage" }) as any as Schema.Schema<VmImage>;

export interface ContainerImage {
  /** Required. The path to the container image repository. For example: `gcr.io/{project_id}/{image_name}` */
  repository?: string;
  /** Optional. The tag of the container image. If not specified, this defaults to the latest tag. */
  tag?: string;
}

export const ContainerImage: Schema.Schema<ContainerImage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      repository: Schema.optional(Schema.String),
      tag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContainerImage",
  }) as any as Schema.Schema<ContainerImage>;

export interface BootDisk {
  /** Optional. The size of the boot disk in GB attached to this instance, up to a maximum of 64000 GB (64 TB). If not specified, this defaults to the recommended value of 150GB. */
  diskSizeGb?: string;
  /** Optional. Indicates the type of the disk. */
  diskType?:
    | "DISK_TYPE_UNSPECIFIED"
    | "PD_STANDARD"
    | "PD_SSD"
    | "PD_BALANCED"
    | "PD_EXTREME"
    | "HYPERDISK_BALANCED"
    | (string & {});
  /** Optional. Input only. Disk encryption method used on the boot and data disks, defaults to GMEK. */
  diskEncryption?:
    | "DISK_ENCRYPTION_UNSPECIFIED"
    | "GMEK"
    | "CMEK"
    | (string & {});
  /** Optional. Input only. The KMS key used to encrypt the disks, only applicable if disk_encryption is CMEK. Format: `projects/{project_id}/locations/{location}/keyRings/{key_ring_id}/cryptoKeys/{key_id}` Learn more about using your own encryption keys. */
  kmsKey?: string;
}

export const BootDisk: Schema.Schema<BootDisk> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      diskSizeGb: Schema.optional(Schema.String),
      diskType: Schema.optional(Schema.String),
      diskEncryption: Schema.optional(Schema.String),
      kmsKey: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "BootDisk" }) as any as Schema.Schema<BootDisk>;

export interface DataDisk {
  /** Optional. The size of the disk in GB attached to this VM instance, up to a maximum of 64000 GB (64 TB). If not specified, this defaults to 100. */
  diskSizeGb?: string;
  /** Optional. Input only. Indicates the type of the disk. */
  diskType?:
    | "DISK_TYPE_UNSPECIFIED"
    | "PD_STANDARD"
    | "PD_SSD"
    | "PD_BALANCED"
    | "PD_EXTREME"
    | "HYPERDISK_BALANCED"
    | (string & {});
  /** Optional. Input only. Disk encryption method used on the boot and data disks, defaults to GMEK. */
  diskEncryption?:
    | "DISK_ENCRYPTION_UNSPECIFIED"
    | "GMEK"
    | "CMEK"
    | (string & {});
  /** Optional. Input only. The KMS key used to encrypt the disks, only applicable if disk_encryption is CMEK. Format: `projects/{project_id}/locations/{location}/keyRings/{key_ring_id}/cryptoKeys/{key_id}` Learn more about using your own encryption keys. */
  kmsKey?: string;
  /** Optional. The resource policies to apply to the data disk. */
  resourcePolicies?: Array<string>;
}

export const DataDisk: Schema.Schema<DataDisk> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      diskSizeGb: Schema.optional(Schema.String),
      diskType: Schema.optional(Schema.String),
      diskEncryption: Schema.optional(Schema.String),
      kmsKey: Schema.optional(Schema.String),
      resourcePolicies: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({ identifier: "DataDisk" }) as any as Schema.Schema<DataDisk>;

export interface ShieldedInstanceConfig {
  /** Optional. Defines whether the VM instance has Secure Boot enabled. Secure Boot helps ensure that the system only runs authentic software by verifying the digital signature of all boot components, and halting the boot process if signature verification fails. Disabled by default. */
  enableSecureBoot?: boolean;
  /** Optional. Defines whether the VM instance has the vTPM enabled. */
  enableVtpm?: boolean;
  /** Optional. Defines whether the VM instance has integrity monitoring enabled. Enables monitoring and attestation of the boot integrity of the VM instance. The attestation is performed against the integrity policy baseline. This baseline is initially derived from the implicitly trusted boot image when the VM instance is created. */
  enableIntegrityMonitoring?: boolean;
}

export const ShieldedInstanceConfig: Schema.Schema<ShieldedInstanceConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enableSecureBoot: Schema.optional(Schema.Boolean),
      enableVtpm: Schema.optional(Schema.Boolean),
      enableIntegrityMonitoring: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ShieldedInstanceConfig",
  }) as any as Schema.Schema<ShieldedInstanceConfig>;

export interface AccessConfig {
  /** An external IP address associated with this instance. Specify an unused static external IP address available to the project or leave this field undefined to use an IP from a shared ephemeral IP address pool. If you specify a static external IP address, it must live in the same region as the zone of the instance. */
  externalIp?: string;
}

export const AccessConfig: Schema.Schema<AccessConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      externalIp: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AccessConfig",
  }) as any as Schema.Schema<AccessConfig>;

export interface NetworkInterface {
  /** Optional. The name of the VPC that this VM instance is in. Format: `projects/{project_id}/global/networks/{network_id}` */
  network?: string;
  /** Optional. The name of the subnet that this VM instance is in. Format: `projects/{project_id}/regions/{region}/subnetworks/{subnetwork_id}` */
  subnet?: string;
  /** Optional. The type of vNIC to be used on this interface. This may be gVNIC or VirtioNet. */
  nicType?: "NIC_TYPE_UNSPECIFIED" | "VIRTIO_NET" | "GVNIC" | (string & {});
  /** Optional. An array of configurations for this interface. Currently, only one access config, ONE_TO_ONE_NAT, is supported. If no accessConfigs specified, the instance will have an external internet access through an ephemeral external IP address. */
  accessConfigs?: Array<AccessConfig>;
}

export const NetworkInterface: Schema.Schema<NetworkInterface> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      network: Schema.optional(Schema.String),
      subnet: Schema.optional(Schema.String),
      nicType: Schema.optional(Schema.String),
      accessConfigs: Schema.optional(Schema.Array(AccessConfig)),
    }),
  ).annotate({
    identifier: "NetworkInterface",
  }) as any as Schema.Schema<NetworkInterface>;

export interface GPUDriverConfig {
  /** Optional. Whether the end user authorizes Google Cloud to install GPU driver on this VM instance. If this field is empty or set to false, the GPU driver won't be installed. Only applicable to instances with GPUs. */
  enableGpuDriver?: boolean;
  /** Optional. Specify a custom Cloud Storage path where the GPU driver is stored. If not specified, we'll automatically choose from official GPU drivers. */
  customGpuDriverPath?: string;
}

export const GPUDriverConfig: Schema.Schema<GPUDriverConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enableGpuDriver: Schema.optional(Schema.Boolean),
      customGpuDriverPath: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GPUDriverConfig",
  }) as any as Schema.Schema<GPUDriverConfig>;

export interface ReservationAffinity {
  /** Required. Specifies the type of reservation from which this instance can consume resources: RESERVATION_ANY (default), RESERVATION_SPECIFIC, or RESERVATION_NONE. See Consuming reserved instances for examples. */
  consumeReservationType?:
    | "RESERVATION_UNSPECIFIED"
    | "RESERVATION_NONE"
    | "RESERVATION_ANY"
    | "RESERVATION_SPECIFIC"
    | (string & {});
  /** Optional. Corresponds to the label key of a reservation resource. To target a RESERVATION_SPECIFIC by name, use compute.googleapis.com/reservation-name as the key and specify the name of your reservation as its value. */
  key?: string;
  /** Optional. Corresponds to the label values of a reservation resource. This can be either a name to a reservation in the same project or "projects/different-project/reservations/some-reservation-name" to target a shared reservation in the same zone but in a different project. */
  values?: Array<string>;
}

export const ReservationAffinity: Schema.Schema<ReservationAffinity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      consumeReservationType: Schema.optional(Schema.String),
      key: Schema.optional(Schema.String),
      values: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ReservationAffinity",
  }) as any as Schema.Schema<ReservationAffinity>;

export interface ConfidentialInstanceConfig {
  /** Optional. Defines the type of technology used by the confidential instance. */
  confidentialInstanceType?:
    | "CONFIDENTIAL_INSTANCE_TYPE_UNSPECIFIED"
    | "SEV"
    | (string & {});
}

export const ConfidentialInstanceConfig: Schema.Schema<ConfidentialInstanceConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      confidentialInstanceType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConfidentialInstanceConfig",
  }) as any as Schema.Schema<ConfidentialInstanceConfig>;

export interface GceSetup {
  /** Optional. The machine type of the VM instance. https://cloud.google.com/compute/docs/machine-resource */
  machineType?: string;
  /** Optional. The minimum CPU platform to use for this instance. The list of valid values can be found in https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform#availablezones */
  minCpuPlatform?: string;
  /** Optional. The hardware accelerators used on this instance. If you use accelerators, make sure that your configuration has [enough vCPUs and memory to support the `machine_type` you have selected](https://cloud.google.com/compute/docs/gpus/#gpus-list). Currently supports only one accelerator configuration. */
  acceleratorConfigs?: Array<AcceleratorConfig>;
  /** Optional. The service account that serves as an identity for the VM instance. Currently supports only one service account. */
  serviceAccounts?: Array<ServiceAccount>;
  /** Optional. Use a Compute Engine VM image to start the notebook instance. */
  vmImage?: VmImage;
  /** Optional. Use a container image to start the notebook instance. */
  containerImage?: ContainerImage;
  /** Optional. The boot disk for the VM. */
  bootDisk?: BootDisk;
  /** Optional. Data disks attached to the VM instance. Currently supports only one data disk. */
  dataDisks?: Array<DataDisk>;
  /** Optional. Shielded VM configuration. [Images using supported Shielded VM features](https://cloud.google.com/compute/docs/instances/modifying-shielded-vm). */
  shieldedInstanceConfig?: ShieldedInstanceConfig;
  /** Optional. The network interfaces for the VM. Supports only one interface. */
  networkInterfaces?: Array<NetworkInterface>;
  /** Optional. If true, no external IP will be assigned to this VM instance. */
  disablePublicIp?: boolean;
  /** Optional. The Compute Engine network tags to add to runtime (see [Add network tags](https://cloud.google.com/vpc/docs/add-remove-network-tags)). */
  tags?: Array<string>;
  /** Optional. Custom metadata to apply to this instance. */
  metadata?: Record<string, string>;
  /** Optional. Flag to enable ip forwarding or not, default false/off. https://cloud.google.com/vpc/docs/using-routes#canipforward */
  enableIpForwarding?: boolean;
  /** Optional. Configuration for GPU drivers. */
  gpuDriverConfig?: GPUDriverConfig;
  /** Optional. Specifies the reservations that this instance can consume from. */
  reservationAffinity?: ReservationAffinity;
  /** Optional. Confidential instance configuration. */
  confidentialInstanceConfig?: ConfidentialInstanceConfig;
  /** Output only. The unique ID of the Compute Engine instance resource. */
  instanceId?: string;
}

export const GceSetup: Schema.Schema<GceSetup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      machineType: Schema.optional(Schema.String),
      minCpuPlatform: Schema.optional(Schema.String),
      acceleratorConfigs: Schema.optional(Schema.Array(AcceleratorConfig)),
      serviceAccounts: Schema.optional(Schema.Array(ServiceAccount)),
      vmImage: Schema.optional(VmImage),
      containerImage: Schema.optional(ContainerImage),
      bootDisk: Schema.optional(BootDisk),
      dataDisks: Schema.optional(Schema.Array(DataDisk)),
      shieldedInstanceConfig: Schema.optional(ShieldedInstanceConfig),
      networkInterfaces: Schema.optional(Schema.Array(NetworkInterface)),
      disablePublicIp: Schema.optional(Schema.Boolean),
      tags: Schema.optional(Schema.Array(Schema.String)),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      enableIpForwarding: Schema.optional(Schema.Boolean),
      gpuDriverConfig: Schema.optional(GPUDriverConfig),
      reservationAffinity: Schema.optional(ReservationAffinity),
      confidentialInstanceConfig: Schema.optional(ConfidentialInstanceConfig),
      instanceId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "GceSetup" }) as any as Schema.Schema<GceSetup>;

export interface UpgradeHistoryEntry {
  /** Optional. The snapshot of the boot disk of this notebook instance before upgrade. */
  snapshot?: string;
  /** Optional. The VM image before this instance upgrade. */
  vmImage?: string;
  /** Optional. The container image before this instance upgrade. */
  containerImage?: string;
  /** Optional. The framework of this notebook instance. */
  framework?: string;
  /** Optional. The version of the notebook instance before this upgrade. */
  version?: string;
  /** Output only. The state of this instance upgrade history entry. */
  state?:
    | "STATE_UNSPECIFIED"
    | "STARTED"
    | "SUCCEEDED"
    | "FAILED"
    | (string & {});
  /** Immutable. The time that this instance upgrade history entry is created. */
  createTime?: string;
  /** Optional. Action. Rolloback or Upgrade. */
  action?: "ACTION_UNSPECIFIED" | "UPGRADE" | "ROLLBACK" | (string & {});
  /** Optional. Target VM Version, like m63. */
  targetVersion?: string;
}

export const UpgradeHistoryEntry: Schema.Schema<UpgradeHistoryEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      snapshot: Schema.optional(Schema.String),
      vmImage: Schema.optional(Schema.String),
      containerImage: Schema.optional(Schema.String),
      framework: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      action: Schema.optional(Schema.String),
      targetVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpgradeHistoryEntry",
  }) as any as Schema.Schema<UpgradeHistoryEntry>;

export interface Instance {
  /** Output only. Identifier. The name of this notebook instance. Format: `projects/{project_id}/locations/{location}/instances/{instance_id}` */
  name?: string;
  /** Optional. Compute Engine setup for the notebook. Uses notebook-defined fields. */
  gceSetup?: GceSetup;
  /** Output only. The proxy endpoint that is used to access the Jupyter notebook. */
  proxyUri?: string;
  /** Optional. The owner of this instance after creation. Format: `alias@example.com` Currently supports one owner only. If not specified, all of the service account users of your VM instance's service account can use the instance. */
  instanceOwners?: Array<string>;
  /** Output only. Email address of entity that sent original CreateInstance request. */
  creator?: string;
  /** Output only. The state of this instance. */
  state?:
    | "STATE_UNSPECIFIED"
    | "STARTING"
    | "PROVISIONING"
    | "ACTIVE"
    | "STOPPING"
    | "STOPPED"
    | "DELETED"
    | "UPGRADING"
    | "INITIALIZING"
    | "SUSPENDING"
    | "SUSPENDED"
    | (string & {});
  /** Output only. The upgrade history of this instance. */
  upgradeHistory?: Array<UpgradeHistoryEntry>;
  /** Output only. Unique ID of the resource. */
  id?: string;
  /** Output only. Instance health_state. */
  healthState?:
    | "HEALTH_STATE_UNSPECIFIED"
    | "HEALTHY"
    | "UNHEALTHY"
    | "AGENT_NOT_INSTALLED"
    | "AGENT_NOT_RUNNING"
    | (string & {});
  /** Output only. Additional information about instance health. Example: healthInfo": { "docker_proxy_agent_status": "1", "docker_status": "1", "jupyterlab_api_status": "-1", "jupyterlab_status": "-1", "updated": "2020-10-18 09:40:03.573409" } */
  healthInfo?: Record<string, string>;
  /** Output only. Instance creation time. */
  createTime?: string;
  /** Output only. Instance update time. */
  updateTime?: string;
  /** Optional. If true, the notebook instance will not register with the proxy. */
  disableProxyAccess?: boolean;
  /** Optional. Labels to apply to this instance. These can be later modified by the UpdateInstance method. */
  labels?: Record<string, string>;
  /** Output only. The workforce pools proxy endpoint that is used to access the Jupyter notebook. */
  thirdPartyProxyUrl?: string;
  /** Output only. Reserved for future use for Zone Separation. */
  satisfiesPzs?: boolean;
  /** Output only. Reserved for future use for Zone Isolation. */
  satisfiesPzi?: boolean;
  /** Optional. Flag that specifies that a notebook can be accessed with third party identity provider. */
  enableThirdPartyIdentity?: boolean;
  /** Optional. Flag to enable managed end user credentials for the instance. */
  enableManagedEuc?: boolean;
  /** Optional. If true, deletion protection will be enabled for this Workbench Instance. If false, deletion protection will be disabled for this Workbench Instance. */
  enableDeletionProtection?: boolean;
}

export const Instance: Schema.Schema<Instance> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      gceSetup: Schema.optional(GceSetup),
      proxyUri: Schema.optional(Schema.String),
      instanceOwners: Schema.optional(Schema.Array(Schema.String)),
      creator: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      upgradeHistory: Schema.optional(Schema.Array(UpgradeHistoryEntry)),
      id: Schema.optional(Schema.String),
      healthState: Schema.optional(Schema.String),
      healthInfo: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      disableProxyAccess: Schema.optional(Schema.Boolean),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      thirdPartyProxyUrl: Schema.optional(Schema.String),
      satisfiesPzs: Schema.optional(Schema.Boolean),
      satisfiesPzi: Schema.optional(Schema.Boolean),
      enableThirdPartyIdentity: Schema.optional(Schema.Boolean),
      enableManagedEuc: Schema.optional(Schema.Boolean),
      enableDeletionProtection: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "Instance" }) as any as Schema.Schema<Instance>;

export interface ListInstancesResponse {
  /** A list of returned instances. */
  instances?: Array<Instance>;
  /** Page token that can be used to continue listing from the last result in the next list call. */
  nextPageToken?: string;
  /** Unordered list. Locations that could not be reached. For example, ['projects/{project_id}/locations/us-west1-a', 'projects/{project_id}/locations/us-central1-b']. A ListInstancesResponse will only contain either instances or unreachables, */
  unreachable?: Array<string>;
}

export const ListInstancesResponse: Schema.Schema<ListInstancesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      instances: Schema.optional(Schema.Array(Instance)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListInstancesResponse",
  }) as any as Schema.Schema<ListInstancesResponse>;

export interface StartInstanceRequest {}

export const StartInstanceRequest: Schema.Schema<StartInstanceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "StartInstanceRequest",
  }) as any as Schema.Schema<StartInstanceRequest>;

export interface StopInstanceRequest {}

export const StopInstanceRequest: Schema.Schema<StopInstanceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "StopInstanceRequest",
  }) as any as Schema.Schema<StopInstanceRequest>;

export interface ResetInstanceRequest {}

export const ResetInstanceRequest: Schema.Schema<ResetInstanceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ResetInstanceRequest",
  }) as any as Schema.Schema<ResetInstanceRequest>;

export interface CheckInstanceUpgradabilityResponse {
  /** If an instance is upgradeable. */
  upgradeable?: boolean;
  /** The version this instance will be upgraded to if calling the upgrade endpoint. This field will only be populated if field upgradeable is true. */
  upgradeVersion?: string;
  /** Additional information about upgrade. */
  upgradeInfo?: string;
  /** The new image self link this instance will be upgraded to if calling the upgrade endpoint. This field will only be populated if field upgradeable is true. */
  upgradeImage?: string;
}

export const CheckInstanceUpgradabilityResponse: Schema.Schema<CheckInstanceUpgradabilityResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      upgradeable: Schema.optional(Schema.Boolean),
      upgradeVersion: Schema.optional(Schema.String),
      upgradeInfo: Schema.optional(Schema.String),
      upgradeImage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CheckInstanceUpgradabilityResponse",
  }) as any as Schema.Schema<CheckInstanceUpgradabilityResponse>;

export interface UpgradeInstanceRequest {}

export const UpgradeInstanceRequest: Schema.Schema<UpgradeInstanceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UpgradeInstanceRequest",
  }) as any as Schema.Schema<UpgradeInstanceRequest>;

export interface ResizeDiskRequest {
  /** Required. The boot disk to be resized. Only disk_size_gb will be used. */
  bootDisk?: BootDisk;
  /** Required. The data disk to be resized. Only disk_size_gb will be used. */
  dataDisk?: DataDisk;
}

export const ResizeDiskRequest: Schema.Schema<ResizeDiskRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bootDisk: Schema.optional(BootDisk),
      dataDisk: Schema.optional(DataDisk),
    }),
  ).annotate({
    identifier: "ResizeDiskRequest",
  }) as any as Schema.Schema<ResizeDiskRequest>;

export interface RollbackInstanceRequest {
  /** Required. The snapshot for rollback. Example: "projects/test-project/global/snapshots/krwlzipynril". */
  targetSnapshot?: string;
  /** Required. Output only. Revision Id */
  revisionId?: string;
}

export const RollbackInstanceRequest: Schema.Schema<RollbackInstanceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetSnapshot: Schema.optional(Schema.String),
      revisionId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RollbackInstanceRequest",
  }) as any as Schema.Schema<RollbackInstanceRequest>;

export interface DiagnosticConfig {
  /** Required. User Cloud Storage bucket location (REQUIRED). Must be formatted with path prefix (`gs://$GCS_BUCKET`). Permissions: User Managed Notebooks: - storage.buckets.writer: Must be given to the project's service account attached to VM. Google Managed Notebooks: - storage.buckets.writer: Must be given to the project's service account or user credentials attached to VM depending on authentication mode. Cloud Storage bucket Log file will be written to `gs://$GCS_BUCKET/$RELATIVE_PATH/$VM_DATE_$TIME.tar.gz` */
  gcsBucket?: string;
  /** Optional. Defines the relative storage path in the Cloud Storage bucket where the diagnostic logs will be written: Default path will be the root directory of the Cloud Storage bucket (`gs://$GCS_BUCKET/$DATE_$TIME.tar.gz`) Example of full path where Log file will be written: `gs://$GCS_BUCKET/$RELATIVE_PATH/` */
  relativePath?: string;
  /** Optional. Enables flag to repair service for instance */
  enableRepairFlag?: boolean;
  /** Optional. Enables flag to capture packets from the instance for 30 seconds */
  enablePacketCaptureFlag?: boolean;
  /** Optional. Enables flag to copy all `/home/jupyter` folder contents */
  enableCopyHomeFilesFlag?: boolean;
}

export const DiagnosticConfig: Schema.Schema<DiagnosticConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gcsBucket: Schema.optional(Schema.String),
      relativePath: Schema.optional(Schema.String),
      enableRepairFlag: Schema.optional(Schema.Boolean),
      enablePacketCaptureFlag: Schema.optional(Schema.Boolean),
      enableCopyHomeFilesFlag: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "DiagnosticConfig",
  }) as any as Schema.Schema<DiagnosticConfig>;

export interface DiagnoseInstanceRequest {
  /** Required. Defines flags that are used to run the diagnostic tool */
  diagnosticConfig?: DiagnosticConfig;
  /** Optional. Maximum amount of time in minutes before the operation times out. */
  timeoutMinutes?: number;
}

export const DiagnoseInstanceRequest: Schema.Schema<DiagnoseInstanceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      diagnosticConfig: Schema.optional(DiagnosticConfig),
      timeoutMinutes: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "DiagnoseInstanceRequest",
  }) as any as Schema.Schema<DiagnoseInstanceRequest>;

export interface DefaultValues {
  /** Output only. The default machine type used by the backend if not provided by the user. */
  machineType?: string;
}

export const DefaultValues: Schema.Schema<DefaultValues> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      machineType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DefaultValues",
  }) as any as Schema.Schema<DefaultValues>;

export interface SupportedValues {
  /** Output only. The machine types supported by WbI. */
  machineTypes?: Array<string>;
  /** Output only. The accelerator types supported by WbI. */
  acceleratorTypes?: Array<string>;
}

export const SupportedValues: Schema.Schema<SupportedValues> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      machineTypes: Schema.optional(Schema.Array(Schema.String)),
      acceleratorTypes: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "SupportedValues",
  }) as any as Schema.Schema<SupportedValues>;

export interface ImageRelease {
  /** Output only. The name of the image of the form workbench-instances-vYYYYmmdd-- */
  imageName?: string;
  /** Output only. The release of the image of the form m123 */
  releaseName?: string;
}

export const ImageRelease: Schema.Schema<ImageRelease> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      imageName: Schema.optional(Schema.String),
      releaseName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ImageRelease",
  }) as any as Schema.Schema<ImageRelease>;

export interface Config {
  /** Output only. The default values for configuration. */
  defaultValues?: DefaultValues;
  /** Output only. The supported values for configuration. */
  supportedValues?: SupportedValues;
  /** Output only. The list of available images to create a WbI. */
  availableImages?: Array<ImageRelease>;
  /** Output only. Flag to disable the creation of legacy Workbench notebooks (User-managed notebooks and Google-managed notebooks). */
  disableWorkbenchLegacyCreation?: boolean;
}

export const Config: Schema.Schema<Config> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      defaultValues: Schema.optional(DefaultValues),
      supportedValues: Schema.optional(SupportedValues),
      availableImages: Schema.optional(Schema.Array(ImageRelease)),
      disableWorkbenchLegacyCreation: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "Config" }) as any as Schema.Schema<Config>;

export interface Snapshot {
  /** Required. The ID of the snapshot. */
  snapshotId?: string;
  /** Required. The project ID of the snapshot. */
  projectId?: string;
}

export const Snapshot: Schema.Schema<Snapshot> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      snapshotId: Schema.optional(Schema.String),
      projectId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Snapshot" }) as any as Schema.Schema<Snapshot>;

export interface RestoreInstanceRequest {
  /** Snapshot to be used for restore. */
  snapshot?: Snapshot;
}

export const RestoreInstanceRequest: Schema.Schema<RestoreInstanceRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      snapshot: Schema.optional(Snapshot),
    }),
  ).annotate({
    identifier: "RestoreInstanceRequest",
  }) as any as Schema.Schema<RestoreInstanceRequest>;

export interface Event {
  /** Optional. Event report time. */
  reportTime?: string;
  /** Optional. Event type. */
  type?:
    | "EVENT_TYPE_UNSPECIFIED"
    | "IDLE"
    | "HEARTBEAT"
    | "HEALTH"
    | "MAINTENANCE"
    | "METADATA_CHANGE"
    | (string & {});
  /** Optional. Event details. This field is used to pass event information. */
  details?: Record<string, string>;
}

export const Event: Schema.Schema<Event> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reportTime: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      details: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({ identifier: "Event" }) as any as Schema.Schema<Event>;

export interface ReportInstanceInfoSystemRequest {
  /** Required. The VM hardware token for authenticating the VM. https://cloud.google.com/compute/docs/instances/verifying-instance-identity */
  vmId?: string;
  /** Required. The Event to be reported. */
  event?: Event;
}

export const ReportInstanceInfoSystemRequest: Schema.Schema<ReportInstanceInfoSystemRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vmId: Schema.optional(Schema.String),
      event: Schema.optional(Event),
    }),
  ).annotate({
    identifier: "ReportInstanceInfoSystemRequest",
  }) as any as Schema.Schema<ReportInstanceInfoSystemRequest>;

export interface UpgradeInstanceSystemRequest {
  /** Required. The VM hardware token for authenticating the VM. https://cloud.google.com/compute/docs/instances/verifying-instance-identity */
  vmId?: string;
}

export const UpgradeInstanceSystemRequest: Schema.Schema<UpgradeInstanceSystemRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vmId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UpgradeInstanceSystemRequest",
  }) as any as Schema.Schema<UpgradeInstanceSystemRequest>;

export interface CheckAuthorizationRequest {
  /** Optional. The details of the OAuth authorization response. This may include additional params such as dry_run, version_info, origin, propagate, etc. */
  authorizationDetails?: Record<string, string>;
}

export const CheckAuthorizationRequest: Schema.Schema<CheckAuthorizationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      authorizationDetails: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({
    identifier: "CheckAuthorizationRequest",
  }) as any as Schema.Schema<CheckAuthorizationRequest>;

export interface CheckAuthorizationResponse {
  /** Output only. Timestamp when this Authorization request was created. */
  createTime?: string;
  /** Success indicates that the user completed OAuth consent and access tokens can be generated. */
  success?: boolean;
  /** If the user has not completed OAuth consent, then the oauth_url is returned. Otherwise, this field is not set. */
  oauth_uri?: string;
}

export const CheckAuthorizationResponse: Schema.Schema<CheckAuthorizationResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      success: Schema.optional(Schema.Boolean),
      oauth_uri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CheckAuthorizationResponse",
  }) as any as Schema.Schema<CheckAuthorizationResponse>;

export interface GenerateAccessTokenRequest {
  /** Required. The VM identity token (a JWT) for authenticating the VM. https://cloud.google.com/compute/docs/instances/verifying-instance-identity */
  vmToken?: string;
}

export const GenerateAccessTokenRequest: Schema.Schema<GenerateAccessTokenRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vmToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GenerateAccessTokenRequest",
  }) as any as Schema.Schema<GenerateAccessTokenRequest>;

export interface GenerateAccessTokenResponse {
  /** Short-lived access token string which may be used to access Google APIs. */
  access_token?: string;
  /** The time in seconds when the access token expires. Typically that's 3600. */
  expires_in?: number;
  /** Space-separated list of scopes contained in the returned token. https://cloud.google.com/docs/authentication/token-types#access-contents */
  scope?: string;
  /** Type of the returned access token (e.g. "Bearer"). It specifies how the token must be used. Bearer tokens may be used by any entity without proof of identity. */
  token_type?: string;
}

export const GenerateAccessTokenResponse: Schema.Schema<GenerateAccessTokenResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      access_token: Schema.optional(Schema.String),
      expires_in: Schema.optional(Schema.Number),
      scope: Schema.optional(Schema.String),
      token_type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GenerateAccessTokenResponse",
  }) as any as Schema.Schema<GenerateAccessTokenResponse>;

export interface Expr {
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const Expr: Schema.Schema<Expr> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      expression: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      location: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      role: Schema.optional(Schema.String),
      members: Schema.optional(Schema.Array(Schema.String)),
      condition: Schema.optional(Expr),
    }),
  ).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.Number),
      bindings: Schema.optional(Schema.Array(Binding)),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      policy: Schema.optional(Policy),
    }),
  ).annotate({
    identifier: "SetIamPolicyRequest",
  }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsRequest",
  }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsResponse",
  }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface OperationMetadata {
  /** The time the operation was created. */
  createTime?: string;
  /** The time the operation finished running. */
  endTime?: string;
  /** Server-defined resource path for the target of the operation. */
  target?: string;
  /** Name of the verb executed by the operation. */
  verb?: string;
  /** Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** API version used to start the operation. */
  apiVersion?: string;
  /** API endpoint name of this operation. */
  endpoint?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      verb: Schema.optional(Schema.String),
      statusMessage: Schema.optional(Schema.String),
      requestedCancellation: Schema.optional(Schema.Boolean),
      apiVersion: Schema.optional(Schema.String),
      endpoint: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OperationMetadata",
  }) as any as Schema.Schema<OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

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

export const ListProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("extraLocationTypes"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations" }),
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
      path: "v2/projects/{projectsId}/locations/{locationsId}",
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

export const ListProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v2/projects/{projectsId}/locations/{locationsId}/operations",
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
      path: "v2/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
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
      path: "v2/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
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
      path: "v2/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel",
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

export interface ListProjectsLocationsInstancesRequest {
  /** Required. The parent of the instance. Formats: - `projects/{project_id}/locations/{location}` to list instances in a specific zone. - `projects/{project_id}/locations/-` to list instances in all locations. */
  parent: string;
  /** Optional. Maximum return size of the list call. */
  pageSize?: number;
  /** Optional. A previous returned page token that can be used to continue listing from the last result. */
  pageToken?: string;
  /** Optional. Sort results. Supported values are "name", "name desc" or "" (unsorted). */
  orderBy?: string;
  /** Optional. List filter. */
  filter?: string;
}

export const ListProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsInstancesRequest>;

export type ListProjectsLocationsInstancesResponse = ListInstancesResponse;
export const ListProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListInstancesResponse;

export type ListProjectsLocationsInstancesError = DefaultErrors;

/** Lists instances in a given project and location. */
export const listProjectsLocationsInstances: API.PaginatedOperationMethod<
  ListProjectsLocationsInstancesRequest,
  ListProjectsLocationsInstancesResponse,
  ListProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsInstancesRequest,
  output: ListProjectsLocationsInstancesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project_id}/locations/{location}/instances/{instance_id}` */
  name: string;
}

export const GetProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsInstancesRequest>;

export type GetProjectsLocationsInstancesResponse = Instance;
export const GetProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Instance;

export type GetProjectsLocationsInstancesError = DefaultErrors;

/** Gets details of a single Instance. */
export const getProjectsLocationsInstances: API.OperationMethod<
  GetProjectsLocationsInstancesRequest,
  GetProjectsLocationsInstancesResponse,
  GetProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsInstancesRequest,
  output: GetProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsInstancesRequest {
  /** Required. Format: `parent=projects/{project_id}/locations/{location}` */
  parent: string;
  /** Required. User-defined unique ID of this instance. */
  instanceId?: string;
  /** Optional. Idempotent request UUID. */
  requestId?: string;
  /** Request body */
  body?: Instance;
}

export const CreateProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    instanceId: Schema.optional(Schema.String).pipe(T.HttpQuery("instanceId")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(Instance).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsInstancesRequest>;

export type CreateProjectsLocationsInstancesResponse = Operation;
export const CreateProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsInstancesError = DefaultErrors;

/** Creates a new Instance in a given project and location. */
export const createProjectsLocationsInstances: API.OperationMethod<
  CreateProjectsLocationsInstancesRequest,
  CreateProjectsLocationsInstancesResponse,
  CreateProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsInstancesRequest,
  output: CreateProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsInstancesRequest {
  /** Output only. Identifier. The name of this notebook instance. Format: `projects/{project_id}/locations/{location}/instances/{instance_id}` */
  name: string;
  /** Required. Mask used to update an instance. Updatable fields: * `labels` * `gce_setup.min_cpu_platform` * `gce_setup.metadata` * `gce_setup.machine_type` * `gce_setup.accelerator_configs` * `gce_setup.accelerator_configs.type` * `gce_setup.accelerator_configs.core_count` * `gce_setup.gpu_driver_config` * `gce_setup.gpu_driver_config.enable_gpu_driver` * `gce_setup.gpu_driver_config.custom_gpu_driver_path` * `gce_setup.shielded_instance_config` * `gce_setup.shielded_instance_config.enable_secure_boot` * `gce_setup.shielded_instance_config.enable_vtpm` * `gce_setup.shielded_instance_config.enable_integrity_monitoring` * `gce_setup.reservation_affinity` * `gce_setup.reservation_affinity.consume_reservation_type` * `gce_setup.reservation_affinity.key` * `gce_setup.reservation_affinity.values` * `gce_setup.tags` * `gce_setup.container_image` * `gce_setup.container_image.repository` * `gce_setup.container_image.tag` * `gce_setup.disable_public_ip` * `disable_proxy_access` */
  updateMask?: string;
  /** Optional. Idempotent request UUID. */
  requestId?: string;
  /** Request body */
  body?: Instance;
}

export const PatchProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(Instance).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsInstancesRequest>;

export type PatchProjectsLocationsInstancesResponse = Operation;
export const PatchProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsInstancesError = DefaultErrors;

/** UpdateInstance updates an Instance. */
export const patchProjectsLocationsInstances: API.OperationMethod<
  PatchProjectsLocationsInstancesRequest,
  PatchProjectsLocationsInstancesResponse,
  PatchProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsInstancesRequest,
  output: PatchProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project_id}/locations/{location}/instances/{instance_id}` */
  name: string;
  /** Optional. Idempotent request UUID. */
  requestId?: string;
}

export const DeleteProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsInstancesRequest>;

export type DeleteProjectsLocationsInstancesResponse = Operation;
export const DeleteProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsInstancesError = DefaultErrors;

/** Deletes a single Instance. */
export const deleteProjectsLocationsInstances: API.OperationMethod<
  DeleteProjectsLocationsInstancesRequest,
  DeleteProjectsLocationsInstancesResponse,
  DeleteProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsInstancesRequest,
  output: DeleteProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface StartProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project_id}/locations/{location}/instances/{instance_id}` */
  name: string;
  /** Request body */
  body?: StartInstanceRequest;
}

export const StartProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(StartInstanceRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:start",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<StartProjectsLocationsInstancesRequest>;

export type StartProjectsLocationsInstancesResponse = Operation;
export const StartProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type StartProjectsLocationsInstancesError = DefaultErrors;

/** Starts a notebook instance. */
export const startProjectsLocationsInstances: API.OperationMethod<
  StartProjectsLocationsInstancesRequest,
  StartProjectsLocationsInstancesResponse,
  StartProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartProjectsLocationsInstancesRequest,
  output: StartProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface StopProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project_id}/locations/{location}/instances/{instance_id}` */
  name: string;
  /** Request body */
  body?: StopInstanceRequest;
}

export const StopProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(StopInstanceRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:stop",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<StopProjectsLocationsInstancesRequest>;

export type StopProjectsLocationsInstancesResponse = Operation;
export const StopProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type StopProjectsLocationsInstancesError = DefaultErrors;

/** Stops a notebook instance. */
export const stopProjectsLocationsInstances: API.OperationMethod<
  StopProjectsLocationsInstancesRequest,
  StopProjectsLocationsInstancesResponse,
  StopProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopProjectsLocationsInstancesRequest,
  output: StopProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface ResetProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project_id}/locations/{location}/instances/{instance_id}` */
  name: string;
  /** Request body */
  body?: ResetInstanceRequest;
}

export const ResetProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(ResetInstanceRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:reset",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ResetProjectsLocationsInstancesRequest>;

export type ResetProjectsLocationsInstancesResponse = Operation;
export const ResetProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type ResetProjectsLocationsInstancesError = DefaultErrors;

/** Resets a notebook instance. */
export const resetProjectsLocationsInstances: API.OperationMethod<
  ResetProjectsLocationsInstancesRequest,
  ResetProjectsLocationsInstancesResponse,
  ResetProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ResetProjectsLocationsInstancesRequest,
  output: ResetProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface CheckUpgradabilityProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project_id}/locations/{location}/instances/{instance_id}` */
  notebookInstance: string;
}

export const CheckUpgradabilityProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    notebookInstance: Schema.String.pipe(T.HttpPath("notebookInstance")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:checkUpgradability",
    }),
    svc,
  ) as unknown as Schema.Schema<CheckUpgradabilityProjectsLocationsInstancesRequest>;

export type CheckUpgradabilityProjectsLocationsInstancesResponse =
  CheckInstanceUpgradabilityResponse;
export const CheckUpgradabilityProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ CheckInstanceUpgradabilityResponse;

export type CheckUpgradabilityProjectsLocationsInstancesError = DefaultErrors;

/** Checks whether a notebook instance is upgradable. */
export const checkUpgradabilityProjectsLocationsInstances: API.OperationMethod<
  CheckUpgradabilityProjectsLocationsInstancesRequest,
  CheckUpgradabilityProjectsLocationsInstancesResponse,
  CheckUpgradabilityProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CheckUpgradabilityProjectsLocationsInstancesRequest,
  output: CheckUpgradabilityProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface UpgradeProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project_id}/locations/{location}/instances/{instance_id}` */
  name: string;
  /** Request body */
  body?: UpgradeInstanceRequest;
}

export const UpgradeProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(UpgradeInstanceRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:upgrade",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpgradeProjectsLocationsInstancesRequest>;

export type UpgradeProjectsLocationsInstancesResponse = Operation;
export const UpgradeProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type UpgradeProjectsLocationsInstancesError = DefaultErrors;

/** Upgrades a notebook instance to the latest version. */
export const upgradeProjectsLocationsInstances: API.OperationMethod<
  UpgradeProjectsLocationsInstancesRequest,
  UpgradeProjectsLocationsInstancesResponse,
  UpgradeProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpgradeProjectsLocationsInstancesRequest,
  output: UpgradeProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface ResizeDiskProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project_id}/locations/{location}/instances/{instance_id}` */
  notebookInstance: string;
  /** Request body */
  body?: ResizeDiskRequest;
}

export const ResizeDiskProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    notebookInstance: Schema.String.pipe(T.HttpPath("notebookInstance")),
    body: Schema.optional(ResizeDiskRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:resizeDisk",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ResizeDiskProjectsLocationsInstancesRequest>;

export type ResizeDiskProjectsLocationsInstancesResponse = Operation;
export const ResizeDiskProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type ResizeDiskProjectsLocationsInstancesError = DefaultErrors;

/** Resize a notebook instance disk to a higher capacity. */
export const resizeDiskProjectsLocationsInstances: API.OperationMethod<
  ResizeDiskProjectsLocationsInstancesRequest,
  ResizeDiskProjectsLocationsInstancesResponse,
  ResizeDiskProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ResizeDiskProjectsLocationsInstancesRequest,
  output: ResizeDiskProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface RollbackProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project_id}/locations/{location}/instances/{instance_id}` */
  name: string;
  /** Request body */
  body?: RollbackInstanceRequest;
}

export const RollbackProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(RollbackInstanceRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:rollback",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RollbackProjectsLocationsInstancesRequest>;

export type RollbackProjectsLocationsInstancesResponse = Operation;
export const RollbackProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type RollbackProjectsLocationsInstancesError = DefaultErrors;

/** Rollbacks a notebook instance to the previous version. */
export const rollbackProjectsLocationsInstances: API.OperationMethod<
  RollbackProjectsLocationsInstancesRequest,
  RollbackProjectsLocationsInstancesResponse,
  RollbackProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RollbackProjectsLocationsInstancesRequest,
  output: RollbackProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface DiagnoseProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project_id}/locations/{location}/instances/{instance_id}` */
  name: string;
  /** Request body */
  body?: DiagnoseInstanceRequest;
}

export const DiagnoseProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(DiagnoseInstanceRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:diagnose",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<DiagnoseProjectsLocationsInstancesRequest>;

export type DiagnoseProjectsLocationsInstancesResponse = Operation;
export const DiagnoseProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DiagnoseProjectsLocationsInstancesError = DefaultErrors;

/** Creates a Diagnostic File and runs Diagnostic Tool given an Instance. */
export const diagnoseProjectsLocationsInstances: API.OperationMethod<
  DiagnoseProjectsLocationsInstancesRequest,
  DiagnoseProjectsLocationsInstancesResponse,
  DiagnoseProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DiagnoseProjectsLocationsInstancesRequest,
  output: DiagnoseProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface GetConfigProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project_id}/locations/{location}` */
  name: string;
}

export const GetConfigProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances:getConfig",
    }),
    svc,
  ) as unknown as Schema.Schema<GetConfigProjectsLocationsInstancesRequest>;

export type GetConfigProjectsLocationsInstancesResponse = Config;
export const GetConfigProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Config;

export type GetConfigProjectsLocationsInstancesError = DefaultErrors;

/** Returns various configuration parameters. */
export const getConfigProjectsLocationsInstances: API.OperationMethod<
  GetConfigProjectsLocationsInstancesRequest,
  GetConfigProjectsLocationsInstancesResponse,
  GetConfigProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetConfigProjectsLocationsInstancesRequest,
  output: GetConfigProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface RestoreProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project_id}/locations/{location}/instances/{instance_id}` */
  name: string;
  /** Request body */
  body?: RestoreInstanceRequest;
}

export const RestoreProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(RestoreInstanceRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:restore",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RestoreProjectsLocationsInstancesRequest>;

export type RestoreProjectsLocationsInstancesResponse = Operation;
export const RestoreProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type RestoreProjectsLocationsInstancesError = DefaultErrors;

/** RestoreInstance restores an Instance from a BackupSource. */
export const restoreProjectsLocationsInstances: API.OperationMethod<
  RestoreProjectsLocationsInstancesRequest,
  RestoreProjectsLocationsInstancesResponse,
  RestoreProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RestoreProjectsLocationsInstancesRequest,
  output: RestoreProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface ReportInfoSystemProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project_id}/locations/{location}/instances/{instance_id}` */
  name: string;
  /** Request body */
  body?: ReportInstanceInfoSystemRequest;
}

export const ReportInfoSystemProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(ReportInstanceInfoSystemRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:reportInfoSystem",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ReportInfoSystemProjectsLocationsInstancesRequest>;

export type ReportInfoSystemProjectsLocationsInstancesResponse = Operation;
export const ReportInfoSystemProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type ReportInfoSystemProjectsLocationsInstancesError = DefaultErrors;

/** Allows notebook instances to report their latest instance information to the Notebooks API server. The server will merge the reported information to the instance metadata store. Do not use this method directly. */
export const reportInfoSystemProjectsLocationsInstances: API.OperationMethod<
  ReportInfoSystemProjectsLocationsInstancesRequest,
  ReportInfoSystemProjectsLocationsInstancesResponse,
  ReportInfoSystemProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ReportInfoSystemProjectsLocationsInstancesRequest,
  output: ReportInfoSystemProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface UpgradeSystemProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project_id}/locations/{location}/instances/{instance_id}` */
  name: string;
  /** Request body */
  body?: UpgradeInstanceSystemRequest;
}

export const UpgradeSystemProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(UpgradeInstanceSystemRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:upgradeSystem",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpgradeSystemProjectsLocationsInstancesRequest>;

export type UpgradeSystemProjectsLocationsInstancesResponse = Operation;
export const UpgradeSystemProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type UpgradeSystemProjectsLocationsInstancesError = DefaultErrors;

/** Allows notebook instances to upgrade themselves. Do not use this method directly. */
export const upgradeSystemProjectsLocationsInstances: API.OperationMethod<
  UpgradeSystemProjectsLocationsInstancesRequest,
  UpgradeSystemProjectsLocationsInstancesResponse,
  UpgradeSystemProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpgradeSystemProjectsLocationsInstancesRequest,
  output: UpgradeSystemProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface CheckAuthorizationProjectsLocationsInstancesRequest {
  /** Required. The name of the Notebook Instance resource. Format: `projects/{project}/locations/{location}/instances/{instance}` */
  name: string;
  /** Request body */
  body?: CheckAuthorizationRequest;
}

export const CheckAuthorizationProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CheckAuthorizationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:checkAuthorization",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CheckAuthorizationProjectsLocationsInstancesRequest>;

export type CheckAuthorizationProjectsLocationsInstancesResponse =
  CheckAuthorizationResponse;
export const CheckAuthorizationProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ CheckAuthorizationResponse;

export type CheckAuthorizationProjectsLocationsInstancesError = DefaultErrors;

/** Initiated by Cloud Console for Oauth consent flow for Workbench Instances. Do not use this method directly. Design doc: go/wbi-euc:auth-dd */
export const checkAuthorizationProjectsLocationsInstances: API.OperationMethod<
  CheckAuthorizationProjectsLocationsInstancesRequest,
  CheckAuthorizationProjectsLocationsInstancesResponse,
  CheckAuthorizationProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CheckAuthorizationProjectsLocationsInstancesRequest,
  output: CheckAuthorizationProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface GenerateAccessTokenProjectsLocationsInstancesRequest {
  /** Required. Format: `projects/{project}/locations/{location}/instances/{instance_id}` */
  name: string;
  /** Request body */
  body?: GenerateAccessTokenRequest;
}

export const GenerateAccessTokenProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(GenerateAccessTokenRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:generateAccessToken",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GenerateAccessTokenProjectsLocationsInstancesRequest>;

export type GenerateAccessTokenProjectsLocationsInstancesResponse =
  GenerateAccessTokenResponse;
export const GenerateAccessTokenProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GenerateAccessTokenResponse;

export type GenerateAccessTokenProjectsLocationsInstancesError = DefaultErrors;

/** Called by VM to return an EUC for the instance owner. Do not use this method directly. Design doc: go/wbi-euc:dd */
export const generateAccessTokenProjectsLocationsInstances: API.OperationMethod<
  GenerateAccessTokenProjectsLocationsInstancesRequest,
  GenerateAccessTokenProjectsLocationsInstancesResponse,
  GenerateAccessTokenProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GenerateAccessTokenProjectsLocationsInstancesRequest,
  output: GenerateAccessTokenProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsInstancesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsInstancesRequest>;

export type SetIamPolicyProjectsLocationsInstancesResponse = Policy;
export const SetIamPolicyProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsLocationsInstancesError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsInstances: API.OperationMethod<
  SetIamPolicyProjectsLocationsInstancesRequest,
  SetIamPolicyProjectsLocationsInstancesResponse,
  SetIamPolicyProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsLocationsInstancesRequest,
  output: SetIamPolicyProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsInstancesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsInstancesRequest>;

export type GetIamPolicyProjectsLocationsInstancesResponse = Policy;
export const GetIamPolicyProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsLocationsInstancesError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsInstances: API.OperationMethod<
  GetIamPolicyProjectsLocationsInstancesRequest,
  GetIamPolicyProjectsLocationsInstancesResponse,
  GetIamPolicyProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsLocationsInstancesRequest,
  output: GetIamPolicyProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsInstancesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsInstancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v2/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsInstancesRequest>;

export type TestIamPermissionsProjectsLocationsInstancesResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsInstancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsInstancesError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsInstances: API.OperationMethod<
  TestIamPermissionsProjectsLocationsInstancesRequest,
  TestIamPermissionsProjectsLocationsInstancesResponse,
  TestIamPermissionsProjectsLocationsInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsLocationsInstancesRequest,
  output: TestIamPermissionsProjectsLocationsInstancesResponse,
  errors: [],
}));
