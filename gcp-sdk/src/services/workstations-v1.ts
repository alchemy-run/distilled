// ==========================================================================
// Cloud Workstations API (workstations v1)
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
  name: "workstations",
  version: "v1",
  rootUrl: "https://workstations.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GceShieldedInstanceConfig {
  /** Optional. Whether the instance has the vTPM enabled. */
  enableVtpm?: boolean;
  /** Optional. Whether the instance has Secure Boot enabled. */
  enableSecureBoot?: boolean;
  /** Optional. Whether the instance has integrity monitoring enabled. */
  enableIntegrityMonitoring?: boolean;
}

export const GceShieldedInstanceConfig: Schema.Schema<GceShieldedInstanceConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      enableVtpm: Schema.optional(Schema.Boolean),
      enableSecureBoot: Schema.optional(Schema.Boolean),
      enableIntegrityMonitoring: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GceShieldedInstanceConfig",
  }) as any as Schema.Schema<GceShieldedInstanceConfig>;

export interface AuditLogConfig {
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
  /** The log type that this config enables. */
  logType?:
    | "LOG_TYPE_UNSPECIFIED"
    | "ADMIN_READ"
    | "DATA_WRITE"
    | "DATA_READ"
    | (string & {});
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
      logType: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "AuditLogConfig",
}) as any as Schema.Schema<AuditLogConfig>;

export interface AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() =>
  Schema.Struct({
    service: Schema.optional(Schema.String),
    auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
  }),
).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

export interface PortRange {
  /** Required. Ending port number for the current range of ports. Valid ports are 22, 80, and ports within the range 1024-65535. */
  last?: number;
  /** Required. Starting port number for the current range of ports. Valid ports are 22, 80, and ports within the range 1024-65535. */
  first?: number;
}

export const PortRange: Schema.Schema<PortRange> = Schema.suspend(() =>
  Schema.Struct({
    last: Schema.optional(Schema.Number),
    first: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "PortRange" }) as any as Schema.Schema<PortRange>;

export interface GatewayConfig {
  /** Optional. Whether HTTP/2 is enabled for this workstation cluster. Defaults to false. */
  http2Enabled?: boolean;
}

export const GatewayConfig: Schema.Schema<GatewayConfig> = Schema.suspend(() =>
  Schema.Struct({
    http2Enabled: Schema.optional(Schema.Boolean),
  }),
).annotate({
  identifier: "GatewayConfig",
}) as any as Schema.Schema<GatewayConfig>;

export interface Container {
  /** Optional. If set, overrides the USER specified in the image with the given uid. */
  runAsUser?: number;
  /** Optional. Arguments passed to the entrypoint. */
  args?: Array<string>;
  /** Optional. If set, overrides the default DIR specified by the image. */
  workingDir?: string;
  /** Optional. Environment variables passed to the container's entrypoint. */
  env?: Record<string, string>;
  /** Optional. If set, overrides the default ENTRYPOINT specified by the image. */
  command?: Array<string>;
  /** Optional. A Docker container image that defines a custom environment. Cloud Workstations provides a number of [preconfigured images](https://cloud.google.com/workstations/docs/preconfigured-base-images), but you can create your own [custom container images](https://cloud.google.com/workstations/docs/custom-container-images). If using a private image, the `host.gceInstance.serviceAccount` field must be specified in the workstation configuration. If using a custom container image, the service account must have [Artifact Registry Reader](https://cloud.google.com/artifact-registry/docs/access-control#roles) permission to pull the specified image. Otherwise, the image must be publicly accessible. */
  image?: string;
}

export const Container: Schema.Schema<Container> = Schema.suspend(() =>
  Schema.Struct({
    runAsUser: Schema.optional(Schema.Number),
    args: Schema.optional(Schema.Array(Schema.String)),
    workingDir: Schema.optional(Schema.String),
    env: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    command: Schema.optional(Schema.Array(Schema.String)),
    image: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Container" }) as any as Schema.Schema<Container>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsResponse",
  }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface CancelOperationRequest {}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelOperationRequest",
  }) as any as Schema.Schema<CancelOperationRequest>;

export interface CustomerEncryptionKey {
  /** Immutable. The name of the Google Cloud KMS encryption key. For example, `"projects/PROJECT_ID/locations/REGION/keyRings/KEY_RING/cryptoKeys/KEY_NAME"`. The key must be in the same region as the workstation configuration. */
  kmsKey?: string;
  /** Immutable. The service account to use with the specified KMS key. We recommend that you use a separate service account and follow KMS best practices. For more information, see [Separation of duties](https://cloud.google.com/kms/docs/separation-of-duties) and `gcloud kms keys add-iam-policy-binding` [`--member`](https://cloud.google.com/sdk/gcloud/reference/kms/keys/add-iam-policy-binding#--member). */
  kmsKeyServiceAccount?: string;
}

export const CustomerEncryptionKey: Schema.Schema<CustomerEncryptionKey> =
  Schema.suspend(() =>
    Schema.Struct({
      kmsKey: Schema.optional(Schema.String),
      kmsKeyServiceAccount: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CustomerEncryptionKey",
  }) as any as Schema.Schema<CustomerEncryptionKey>;

export interface GceInstanceHost {
  /** Optional. Output only. The ID of the Compute Engine instance. */
  id?: string;
  /** Optional. Output only. The zone of the Compute Engine instance. */
  zone?: string;
  /** Optional. Output only. The name of the Compute Engine instance. */
  name?: string;
}

export const GceInstanceHost: Schema.Schema<GceInstanceHost> = Schema.suspend(
  () =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      zone: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "GceInstanceHost",
}) as any as Schema.Schema<GceInstanceHost>;

export interface RuntimeHost {
  /** Specifies a Compute Engine instance as the host. */
  gceInstanceHost?: GceInstanceHost;
}

export const RuntimeHost: Schema.Schema<RuntimeHost> = Schema.suspend(() =>
  Schema.Struct({
    gceInstanceHost: Schema.optional(GceInstanceHost),
  }),
).annotate({ identifier: "RuntimeHost" }) as any as Schema.Schema<RuntimeHost>;

export interface Workstation {
  /** Optional. Output only. Runtime host for the workstation when in STATE_RUNNING. */
  runtimeHost?: RuntimeHost;
  /** Optional. The source workstation from which this workstation's persistent directories were cloned on creation. */
  sourceWorkstation?: string;
  /** Optional. Environment variables passed to the workstation container's entrypoint. */
  env?: Record<string, string>;
  /** Output only. Time when this workstation was most recently successfully started, regardless of the workstation's initial state. */
  startTime?: string;
  /** Output only. A system-assigned unique identifier for this workstation. */
  uid?: string;
  /** Output only. The name of the Google Cloud KMS encryption key used to encrypt this workstation. The KMS key can only be configured in the WorkstationConfig. The expected format is `projects/* /locations/* /keyRings/* /cryptoKeys/*`. */
  kmsKey?: string;
  /** Output only. Host to which clients can send HTTPS traffic that will be received by the workstation. Authorized traffic will be received to the workstation as HTTP on port 80. To send traffic to a different port, clients may prefix the host with the destination port in the format `{port}-{host}`. */
  host?: string;
  /** Output only. Time when this workstation was soft-deleted. */
  deleteTime?: string;
  /** Output only. Current state of the workstation. */
  state?:
    | "STATE_UNSPECIFIED"
    | "STATE_STARTING"
    | "STATE_RUNNING"
    | "STATE_STOPPING"
    | "STATE_STOPPED"
    | (string & {});
  /** Optional. [Labels](https://cloud.google.com/workstations/docs/label-resources) that are applied to the workstation and that are also propagated to the underlying Compute Engine resources. */
  labels?: Record<string, string>;
  /** Optional. Human-readable name for this workstation. */
  displayName?: string;
  /** Output only. Indicates whether this workstation is currently being updated to match its intended state. */
  reconciling?: boolean;
  /** Output only. Time when this workstation was most recently updated. */
  updateTime?: string;
  /** Identifier. Full name of this workstation. */
  name?: string;
  /** Output only. Time when this workstation was created. */
  createTime?: string;
  /** Optional. Checksum computed by the server. May be sent on update and delete requests to make sure that the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. Client-specified annotations. */
  annotations?: Record<string, string>;
}

export const Workstation: Schema.Schema<Workstation> = Schema.suspend(() =>
  Schema.Struct({
    runtimeHost: Schema.optional(RuntimeHost),
    sourceWorkstation: Schema.optional(Schema.String),
    env: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    startTime: Schema.optional(Schema.String),
    uid: Schema.optional(Schema.String),
    kmsKey: Schema.optional(Schema.String),
    host: Schema.optional(Schema.String),
    deleteTime: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    displayName: Schema.optional(Schema.String),
    reconciling: Schema.optional(Schema.Boolean),
    updateTime: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }),
).annotate({ identifier: "Workstation" }) as any as Schema.Schema<Workstation>;

export interface GceRegionalPersistentDisk {
  /** Optional. Name of the snapshot to use as the source for the disk. If set, size_gb and fs_type must be empty. Must be formatted as ext4 file system with no partitions. */
  sourceSnapshot?: string;
  /** Optional. The GB capacity of a persistent home directory for each workstation created with this configuration. Must be empty if source_snapshot is set. Valid values are `10`, `50`, `100`, `200`, `500`, or `1000`. Defaults to `200`. If less than `200` GB, the disk_type must be `"pd-balanced"` or `"pd-ssd"`. */
  sizeGb?: number;
  /** Optional. Type of file system that the disk should be formatted with. The workstation image must support this file system type. Must be empty if source_snapshot is set. Defaults to `"ext4"`. */
  fsType?: string;
  /** Optional. Whether the persistent disk should be deleted when the workstation is deleted. Valid values are `DELETE` and `RETAIN`. Defaults to `DELETE`. */
  reclaimPolicy?:
    | "RECLAIM_POLICY_UNSPECIFIED"
    | "DELETE"
    | "RETAIN"
    | (string & {});
  /** Optional. The [type of the persistent disk](https://cloud.google.com/compute/docs/disks#disk-types) for the home directory. Defaults to `"pd-standard"`. */
  diskType?: string;
}

export const GceRegionalPersistentDisk: Schema.Schema<GceRegionalPersistentDisk> =
  Schema.suspend(() =>
    Schema.Struct({
      sourceSnapshot: Schema.optional(Schema.String),
      sizeGb: Schema.optional(Schema.Number),
      fsType: Schema.optional(Schema.String),
      reclaimPolicy: Schema.optional(Schema.String),
      diskType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GceRegionalPersistentDisk",
  }) as any as Schema.Schema<GceRegionalPersistentDisk>;

export interface GceHyperdiskBalancedHighAvailability {
  /** Optional. Name of the snapshot to use as the source for the disk. If set, size_gb must be empty. Must be formatted as ext4 file system with no partitions. */
  sourceSnapshot?: string;
  /** Optional. Number of seconds to wait after initially creating or subsequently shutting down the workstation before converting its disk into a snapshot. This generally saves costs at the expense of greater startup time on next workstation start, as the service will need to create a disk from the archival snapshot. A value of `"0s"` indicates that the disk will never be archived. */
  archiveTimeout?: string;
  /** Optional. The GB capacity of a persistent home directory for each workstation created with this configuration. Must be empty if source_snapshot is set. Valid values are `10`, `50`, `100`, `200`, `500`, or `1000`. Defaults to `200`. */
  sizeGb?: number;
  /** Optional. Whether the persistent disk should be deleted when the workstation is deleted. Valid values are `DELETE` and `RETAIN`. Defaults to `DELETE`. */
  reclaimPolicy?:
    | "RECLAIM_POLICY_UNSPECIFIED"
    | "DELETE"
    | "RETAIN"
    | (string & {});
}

export const GceHyperdiskBalancedHighAvailability: Schema.Schema<GceHyperdiskBalancedHighAvailability> =
  Schema.suspend(() =>
    Schema.Struct({
      sourceSnapshot: Schema.optional(Schema.String),
      archiveTimeout: Schema.optional(Schema.String),
      sizeGb: Schema.optional(Schema.Number),
      reclaimPolicy: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GceHyperdiskBalancedHighAvailability",
  }) as any as Schema.Schema<GceHyperdiskBalancedHighAvailability>;

export interface PersistentDirectory {
  /** A PersistentDirectory backed by a Compute Engine persistent disk. */
  gcePd?: GceRegionalPersistentDisk;
  /** A PersistentDirectory backed by a Compute Engine hyperdisk high availability disk. */
  gceHd?: GceHyperdiskBalancedHighAvailability;
  /** Optional. Location of this directory in the running workstation. */
  mountPath?: string;
}

export const PersistentDirectory: Schema.Schema<PersistentDirectory> =
  Schema.suspend(() =>
    Schema.Struct({
      gcePd: Schema.optional(GceRegionalPersistentDisk),
      gceHd: Schema.optional(GceHyperdiskBalancedHighAvailability),
      mountPath: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PersistentDirectory",
  }) as any as Schema.Schema<PersistentDirectory>;

export interface Location {
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() =>
  Schema.Struct({
    displayName: Schema.optional(Schema.String),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    locationId: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface StartWorkstationRequest {
  /** Optional. If set, the request will be rejected if the latest version of the workstation on the server does not have this ETag. */
  etag?: string;
  /** Optional. If set, validate the request and preview the review, but do not actually apply it. */
  validateOnly?: boolean;
  /** Optional. If set, the workstation starts using the boost configuration with the specified ID. */
  boostConfig?: string;
}

export const StartWorkstationRequest: Schema.Schema<StartWorkstationRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      validateOnly: Schema.optional(Schema.Boolean),
      boostConfig: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StartWorkstationRequest",
  }) as any as Schema.Schema<StartWorkstationRequest>;

export interface Expr {
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() =>
  Schema.Struct({
    description: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
    expression: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() =>
  Schema.Struct({
    role: Schema.optional(Schema.String),
    condition: Schema.optional(Expr),
    members: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface Policy {
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() =>
  Schema.Struct({
    etag: Schema.optional(Schema.String),
    version: Schema.optional(Schema.Number),
    bindings: Schema.optional(Schema.Array(Binding)),
    auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  }),
).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface ListWorkstationsResponse {
  /** Optional. Unreachable resources. */
  unreachable?: Array<string>;
  /** Optional. Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** The requested workstations. */
  workstations?: Array<Workstation>;
}

export const ListWorkstationsResponse: Schema.Schema<ListWorkstationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      nextPageToken: Schema.optional(Schema.String),
      workstations: Schema.optional(Schema.Array(Workstation)),
    }),
  ).annotate({
    identifier: "ListWorkstationsResponse",
  }) as any as Schema.Schema<ListWorkstationsResponse>;

export interface Status {
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() =>
  Schema.Struct({
    details: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
    code: Schema.optional(Schema.Number),
    message: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsRequest",
  }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    done: Schema.optional(Schema.Boolean),
    error: Schema.optional(Status),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      operations: Schema.optional(Schema.Array(Operation)),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListOperationsResponse",
  }) as any as Schema.Schema<ListOperationsResponse>;

export interface GcePersistentDisk {
  /** Optional. Name of the snapshot to use as the source for the disk. Must be empty if source_image is set. Must be empty if read_only is false. Updating source_snapshot will update content in the ephemeral directory after the workstation is restarted. Only file systems supported by Container-Optimized OS (COS) are explicitly supported. For a list of supported file systems, see [the filesystems available in Container-Optimized OS](https://cloud.google.com/container-optimized-os/docs/concepts/supported-filesystems). This field is mutable. */
  sourceSnapshot?: string;
  /** Optional. Whether the disk is read only. If true, the disk may be shared by multiple VMs and source_snapshot must be set. */
  readOnly?: boolean;
  /** Optional. Name of the disk image to use as the source for the disk. Must be empty if source_snapshot is set. Updating source_image will update content in the ephemeral directory after the workstation is restarted. Only file systems supported by Container-Optimized OS (COS) are explicitly supported. For a list of supported file systems, please refer to the [COS documentation](https://cloud.google.com/container-optimized-os/docs/concepts/supported-filesystems). This field is mutable. */
  sourceImage?: string;
  /** Optional. Type of the disk to use. Defaults to `"pd-standard"`. */
  diskType?: string;
}

export const GcePersistentDisk: Schema.Schema<GcePersistentDisk> =
  Schema.suspend(() =>
    Schema.Struct({
      sourceSnapshot: Schema.optional(Schema.String),
      readOnly: Schema.optional(Schema.Boolean),
      sourceImage: Schema.optional(Schema.String),
      diskType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GcePersistentDisk",
  }) as any as Schema.Schema<GcePersistentDisk>;

export interface EphemeralDirectory {
  /** Required. Location of this directory in the running workstation. */
  mountPath?: string;
  /** An EphemeralDirectory backed by a Compute Engine persistent disk. */
  gcePd?: GcePersistentDisk;
}

export const EphemeralDirectory: Schema.Schema<EphemeralDirectory> =
  Schema.suspend(() =>
    Schema.Struct({
      mountPath: Schema.optional(Schema.String),
      gcePd: Schema.optional(GcePersistentDisk),
    }),
  ).annotate({
    identifier: "EphemeralDirectory",
  }) as any as Schema.Schema<EphemeralDirectory>;

export interface ReadinessCheck {
  /** Optional. Port to which the request should be sent. */
  port?: number;
  /** Optional. Path to which the request should be sent. */
  path?: string;
}

export const ReadinessCheck: Schema.Schema<ReadinessCheck> = Schema.suspend(
  () =>
    Schema.Struct({
      port: Schema.optional(Schema.Number),
      path: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ReadinessCheck",
}) as any as Schema.Schema<ReadinessCheck>;

export interface Accelerator {
  /** Optional. Number of accelerator cards exposed to the instance. */
  count?: number;
  /** Optional. Type of accelerator resource to attach to the instance, for example, `"nvidia-tesla-p100"`. */
  type?: string;
}

export const Accelerator: Schema.Schema<Accelerator> = Schema.suspend(() =>
  Schema.Struct({
    count: Schema.optional(Schema.Number),
    type: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Accelerator" }) as any as Schema.Schema<Accelerator>;

export interface GceConfidentialInstanceConfig {
  /** Optional. Whether the instance has confidential compute enabled. */
  enableConfidentialCompute?: boolean;
}

export const GceConfidentialInstanceConfig: Schema.Schema<GceConfidentialInstanceConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      enableConfidentialCompute: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GceConfidentialInstanceConfig",
  }) as any as Schema.Schema<GceConfidentialInstanceConfig>;

export interface BoostConfig {
  /** Optional. The type of machine that boosted VM instances will use—for example, `e2-standard-4`. For more information about machine types that Cloud Workstations supports, see the list of [available machine types](https://cloud.google.com/workstations/docs/available-machine-types). Defaults to `e2-standard-4`. */
  machineType?: string;
  /** Optional. A list of the type and count of accelerator cards attached to the boost instance. Defaults to `none`. */
  accelerators?: Array<Accelerator>;
  /** Required. The ID to be used for the boost configuration. */
  id?: string;
  /** Optional. The size of the boot disk for the VM in gigabytes (GB). The minimum boot disk size is `30` GB. Defaults to `50` GB. */
  bootDiskSizeGb?: number;
  /** Optional. The number of boost VMs that the system should keep idle so that workstations can be boosted quickly. Defaults to `0`. */
  poolSize?: number;
  /** Optional. Whether to enable nested virtualization on boosted Cloud Workstations VMs running using this boost configuration. Defaults to false. Nested virtualization lets you run virtual machine (VM) instances inside your workstation. Before enabling nested virtualization, consider the following important considerations. Cloud Workstations instances are subject to the [same restrictions as Compute Engine instances](https://cloud.google.com/compute/docs/instances/nested-virtualization/overview#restrictions): * **Organization policy**: projects, folders, or organizations may be restricted from creating nested VMs if the **Disable VM nested virtualization** constraint is enforced in the organization policy. For more information, see the Compute Engine section, [Checking whether nested virtualization is allowed](https://cloud.google.com/compute/docs/instances/nested-virtualization/managing-constraint#checking_whether_nested_virtualization_is_allowed). * **Performance**: nested VMs might experience a 10% or greater decrease in performance for workloads that are CPU-bound and possibly greater than a 10% decrease for workloads that are input/output bound. * **Machine Type**: nested virtualization can only be enabled on boost configurations that specify a machine_type in the N1 or N2 machine series. */
  enableNestedVirtualization?: boolean;
}

export const BoostConfig: Schema.Schema<BoostConfig> = Schema.suspend(() =>
  Schema.Struct({
    machineType: Schema.optional(Schema.String),
    accelerators: Schema.optional(Schema.Array(Accelerator)),
    id: Schema.optional(Schema.String),
    bootDiskSizeGb: Schema.optional(Schema.Number),
    poolSize: Schema.optional(Schema.Number),
    enableNestedVirtualization: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "BoostConfig" }) as any as Schema.Schema<BoostConfig>;

export interface GceInstance {
  /** Optional. A list of the type and count of accelerator cards attached to the instance. */
  accelerators?: Array<Accelerator>;
  /** Optional. A set of Compute Engine Shielded instance options. */
  shieldedInstanceConfig?: GceShieldedInstanceConfig;
  /** Optional. Network tags to add to the Compute Engine VMs backing the workstations. This option applies [network tags](https://cloud.google.com/vpc/docs/add-remove-network-tags) to VMs created with this configuration. These network tags enable the creation of [firewall rules](https://cloud.google.com/workstations/docs/configure-firewall-rules). */
  tags?: Array<string>;
  /** Optional. Resource manager tags to be bound to this instance. Tag keys and values have the same definition as [resource manager tags](https://cloud.google.com/resource-manager/docs/tags/tags-overview). Keys must be in the format `tagKeys/{tag_key_id}`, and values are in the format `tagValues/456`. */
  vmTags?: Record<string, string>;
  /** Optional. Whether to enable nested virtualization on Cloud Workstations VMs created using this workstation configuration. Defaults to false. Nested virtualization lets you run virtual machine (VM) instances inside your workstation. Before enabling nested virtualization, consider the following important considerations. Cloud Workstations instances are subject to the [same restrictions as Compute Engine instances](https://cloud.google.com/compute/docs/instances/nested-virtualization/overview#restrictions): * **Organization policy**: projects, folders, or organizations may be restricted from creating nested VMs if the **Disable VM nested virtualization** constraint is enforced in the organization policy. For more information, see the Compute Engine section, [Checking whether nested virtualization is allowed](https://cloud.google.com/compute/docs/instances/nested-virtualization/managing-constraint#checking_whether_nested_virtualization_is_allowed). * **Performance**: nested VMs might experience a 10% or greater decrease in performance for workloads that are CPU-bound and possibly greater than a 10% decrease for workloads that are input/output bound. * **Machine Type**: nested virtualization can only be enabled on workstation configurations that specify a machine_type in the N1 or N2 machine series. */
  enableNestedVirtualization?: boolean;
  /** Optional. Scopes to grant to the service_account. When specified, users of workstations under this configuration must have `iam.serviceAccounts.actAs` on the service account. */
  serviceAccountScopes?: Array<string>;
  /** Optional. Link to the startup script stored in Cloud Storage. This script will be run on the host workstation VM when the VM is created. The URI must be of the form gs://{bucket-name}/{object-name}. If specifying a startup script, the service account must have [Permission to access the bucket and script file in Cloud Storage](https://cloud.google.com/storage/docs/access-control/iam-permissions). Otherwise, the script must be publicly accessible. Note that the service regularly updates the OS version of the host VM, and it is the responsibility of the user to ensure the script stays compatible with the OS version. */
  startupScriptUri?: string;
  /** Optional. The size of the boot disk for the VM in gigabytes (GB). The minimum boot disk size is `30` GB. Defaults to `50` GB. */
  bootDiskSizeGb?: number;
  /** Optional. The type of machine to use for VM instances—for example, `"e2-standard-4"`. For more information about machine types that Cloud Workstations supports, see the list of [available machine types](https://cloud.google.com/workstations/docs/available-machine-types). */
  machineType?: string;
  /** Optional. Custom metadata to apply to Compute Engine instances. */
  instanceMetadata?: Record<string, string>;
  /** Optional. The email address of the service account for Cloud Workstations VMs created with this configuration. When specified, be sure that the service account has `logging.logEntries.create` and `monitoring.timeSeries.create` permissions on the project so it can write logs out to Cloud Logging. If using a custom container image, the service account must have [Artifact Registry Reader](https://cloud.google.com/artifact-registry/docs/access-control#roles) permission to pull the specified image. If you as the administrator want to be able to `ssh` into the underlying VM, you need to set this value to a service account for which you have the `iam.serviceAccounts.actAs` permission. Conversely, if you don't want anyone to be able to `ssh` into the underlying VM, use a service account where no one has that permission. If not set, VMs run with a service account provided by the Cloud Workstations service, and the image must be publicly accessible. */
  serviceAccount?: string;
  /** Optional. When set to true, disables public IP addresses for VMs. If you disable public IP addresses, you must set up Private Google Access or Cloud NAT on your network. If you use Private Google Access and you use `private.googleapis.com` or `restricted.googleapis.com` for Container Registry and Artifact Registry, make sure that you set up DNS records for domains `*.gcr.io` and `*.pkg.dev`. Defaults to false (VMs have public IP addresses). */
  disablePublicIpAddresses?: boolean;
  /** Output only. Number of instances currently available in the pool for faster workstation startup. */
  pooledInstances?: number;
  /** Optional. Whether to disable SSH access to the VM. */
  disableSsh?: boolean;
  /** Optional. A set of Compute Engine Confidential VM instance options. */
  confidentialInstanceConfig?: GceConfidentialInstanceConfig;
  /** Optional. The number of VMs that the system should keep idle so that new workstations can be started quickly for new users. Defaults to `0` in the API. */
  poolSize?: number;
  /** Optional. A list of the boost configurations that workstations created using this workstation configuration are allowed to use. If specified, users will have the option to choose from the list of boost configs when starting a workstation. */
  boostConfigs?: Array<BoostConfig>;
}

export const GceInstance: Schema.Schema<GceInstance> = Schema.suspend(() =>
  Schema.Struct({
    accelerators: Schema.optional(Schema.Array(Accelerator)),
    shieldedInstanceConfig: Schema.optional(GceShieldedInstanceConfig),
    tags: Schema.optional(Schema.Array(Schema.String)),
    vmTags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    enableNestedVirtualization: Schema.optional(Schema.Boolean),
    serviceAccountScopes: Schema.optional(Schema.Array(Schema.String)),
    startupScriptUri: Schema.optional(Schema.String),
    bootDiskSizeGb: Schema.optional(Schema.Number),
    machineType: Schema.optional(Schema.String),
    instanceMetadata: Schema.optional(
      Schema.Record(Schema.String, Schema.String),
    ),
    serviceAccount: Schema.optional(Schema.String),
    disablePublicIpAddresses: Schema.optional(Schema.Boolean),
    pooledInstances: Schema.optional(Schema.Number),
    disableSsh: Schema.optional(Schema.Boolean),
    confidentialInstanceConfig: Schema.optional(GceConfidentialInstanceConfig),
    poolSize: Schema.optional(Schema.Number),
    boostConfigs: Schema.optional(Schema.Array(BoostConfig)),
  }),
).annotate({ identifier: "GceInstance" }) as any as Schema.Schema<GceInstance>;

export interface Host {
  /** Specifies a Compute Engine instance as the host. */
  gceInstance?: GceInstance;
}

export const Host: Schema.Schema<Host> = Schema.suspend(() =>
  Schema.Struct({
    gceInstance: Schema.optional(GceInstance),
  }),
).annotate({ identifier: "Host" }) as any as Schema.Schema<Host>;

export interface WorkstationConfig {
  /** Output only. Whether this workstation configuration is in degraded mode, in which case it may require user action to restore full functionality. The conditions field contains detailed information about the status of the configuration. */
  degraded?: boolean;
  /** Optional. Checksum computed by the server. May be sent on update and delete requests to make sure that the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. Container that runs upon startup for each workstation using this workstation configuration. */
  container?: Container;
  /** Optional. Ephemeral directories which won't persist across workstation sessions. */
  ephemeralDirectories?: Array<EphemeralDirectory>;
  /** Optional. Number of seconds to wait before automatically stopping a workstation after it last received user traffic. A value of `"0s"` indicates that Cloud Workstations VMs created with this configuration should never time out due to idleness. Provide [duration](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#duration) terminated by `s` for seconds—for example, `"7200s"` (2 hours). The default is `"1200s"` (20 minutes). */
  idleTimeout?: string;
  /** Optional. Directories to persist across workstation sessions. */
  persistentDirectories?: Array<PersistentDirectory>;
  /** Optional. Client-specified annotations. */
  annotations?: Record<string, string>;
  /** Optional. Number of seconds that a workstation can run until it is automatically shut down. We recommend that workstations be shut down daily to reduce costs and so that security updates can be applied upon restart. The idle_timeout and running_timeout fields are independent of each other. Note that the running_timeout field shuts down VMs after the specified time, regardless of whether or not the VMs are idle. Provide duration terminated by `s` for seconds—for example, `"54000s"` (15 hours). Defaults to `"43200s"` (12 hours). A value of `"0s"` indicates that workstations using this configuration should never time out. If encryption_key is set, it must be greater than `"0s"` and less than `"86400s"` (24 hours). Warning: A value of `"0s"` indicates that Cloud Workstations VMs created with this configuration have no maximum running time. This is strongly discouraged because you incur costs and will not pick up security updates. */
  runningTimeout?: string;
  /** Optional. A list of PortRanges specifying single ports or ranges of ports that are externally accessible in the workstation. Allowed ports must be one of 22, 80, or within range 1024-65535. If not specified defaults to ports 22, 80, and ports 1024-65535. */
  allowedPorts?: Array<PortRange>;
  /** Optional. [Labels](https://cloud.google.com/workstations/docs/label-resources) that are applied to the workstation configuration and that are also propagated to the underlying Compute Engine resources. */
  labels?: Record<string, string>;
  /** Optional. Disables support for plain TCP connections in the workstation. By default the service supports TCP connections through a websocket relay. Setting this option to true disables that relay, which prevents the usage of services that require plain TCP connections, such as SSH. When enabled, all communication must occur over HTTPS or WSS. */
  disableTcpConnections?: boolean;
  /** Immutable. Encrypts resources of this workstation configuration using a customer-managed encryption key (CMEK). If specified, the boot disk of the Compute Engine instance and the persistent disk are encrypted using this encryption key. If this field is not set, the disks are encrypted using a generated key. Customer-managed encryption keys do not protect disk metadata. If the customer-managed encryption key is rotated, when the workstation instance is stopped, the system attempts to recreate the persistent disk with the new version of the key. Be sure to keep older versions of the key until the persistent disk is recreated. Otherwise, data on the persistent disk might be lost. If the encryption key is revoked, the workstation session automatically stops within 7 hours. Immutable after the workstation configuration is created. */
  encryptionKey?: CustomerEncryptionKey;
  /** Optional. Immutable. Specifies the zones used to replicate the VM and disk resources within the region. If set, exactly two zones within the workstation cluster's region must be specified—for example, `['us-central1-a', 'us-central1-f']`. If this field is empty, two default zones within the region are used. Immutable after the workstation configuration is created. */
  replicaZones?: Array<string>;
  /** Identifier. Full name of this workstation configuration. */
  name?: string;
  /** Optional. Readiness checks to perform when starting a workstation using this workstation configuration. Mark a workstation as running only after all specified readiness checks return 200 status codes. */
  readinessChecks?: Array<ReadinessCheck>;
  /** Optional. Maximum number of workstations under this configuration a user can have `workstations.workstation.use` permission on. Only enforced on CreateWorkstation API calls on the user issuing the API request. Can be overridden by: - granting a user workstations.workstationConfigs.exemptMaxUsableWorkstationLimit permission, or - having a user with that permission create a workstation and granting another user `workstations.workstation.use` permission on that workstation. If not specified, defaults to `0`, which indicates unlimited. */
  maxUsableWorkstations?: number;
  /** Optional. Whether to enable Linux `auditd` logging on the workstation. When enabled, a service_account must also be specified that has `roles/logging.logWriter` and `roles/monitoring.metricWriter` on the project. Operating system audit logging is distinct from [Cloud Audit Logs](https://cloud.google.com/workstations/docs/audit-logging) and [Container output logging](https://cloud.google.com/workstations/docs/container-output-logging#overview). Operating system audit logs are available in the [Cloud Logging](https://cloud.google.com/logging/docs) console by querying: resource.type="gce_instance" log_name:"/logs/linux-auditd" */
  enableAuditAgent?: boolean;
  /** Output only. Status conditions describing the workstation configuration's current state. */
  conditions?: Array<Status>;
  /** Optional. Grant creator of a workstation `roles/workstations.policyAdmin` role along with `roles/workstations.user` role on the workstation created by them. This allows workstation users to share access to either their entire workstation, or individual ports. Defaults to false. */
  grantWorkstationAdminRoleOnCreate?: boolean;
  /** Output only. Indicates whether this workstation configuration is currently being updated to match its intended state. */
  reconciling?: boolean;
  /** Optional. Runtime host for the workstation. */
  host?: Host;
  /** Output only. Time when this workstation configuration was created. */
  createTime?: string;
  /** Output only. Time when this workstation configuration was most recently updated. */
  updateTime?: string;
  /** Output only. Time when this workstation configuration was soft-deleted. */
  deleteTime?: string;
  /** Optional. Human-readable name for this workstation configuration. */
  displayName?: string;
  /** Output only. A system-assigned unique identifier for this workstation configuration. */
  uid?: string;
}

export const WorkstationConfig: Schema.Schema<WorkstationConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      degraded: Schema.optional(Schema.Boolean),
      etag: Schema.optional(Schema.String),
      container: Schema.optional(Container),
      ephemeralDirectories: Schema.optional(Schema.Array(EphemeralDirectory)),
      idleTimeout: Schema.optional(Schema.String),
      persistentDirectories: Schema.optional(Schema.Array(PersistentDirectory)),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      runningTimeout: Schema.optional(Schema.String),
      allowedPorts: Schema.optional(Schema.Array(PortRange)),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      disableTcpConnections: Schema.optional(Schema.Boolean),
      encryptionKey: Schema.optional(CustomerEncryptionKey),
      replicaZones: Schema.optional(Schema.Array(Schema.String)),
      name: Schema.optional(Schema.String),
      readinessChecks: Schema.optional(Schema.Array(ReadinessCheck)),
      maxUsableWorkstations: Schema.optional(Schema.Number),
      enableAuditAgent: Schema.optional(Schema.Boolean),
      conditions: Schema.optional(Schema.Array(Status)),
      grantWorkstationAdminRoleOnCreate: Schema.optional(Schema.Boolean),
      reconciling: Schema.optional(Schema.Boolean),
      host: Schema.optional(Host),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WorkstationConfig",
  }) as any as Schema.Schema<WorkstationConfig>;

export interface ListUsableWorkstationConfigsResponse {
  /** Unreachable resources. */
  unreachable?: Array<string>;
  /** The requested configs. */
  workstationConfigs?: Array<WorkstationConfig>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListUsableWorkstationConfigsResponse: Schema.Schema<ListUsableWorkstationConfigsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      workstationConfigs: Schema.optional(Schema.Array(WorkstationConfig)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListUsableWorkstationConfigsResponse",
  }) as any as Schema.Schema<ListUsableWorkstationConfigsResponse>;

export interface PrivateClusterConfig {
  /** Output only. Hostname for the workstation cluster. This field will be populated only when private endpoint is enabled. To access workstations in the workstation cluster, create a new DNS zone mapping this domain name to an internal IP address and a forwarding rule mapping that address to the service attachment. */
  clusterHostname?: string;
  /** Optional. Additional projects that are allowed to attach to the workstation cluster's service attachment. By default, the workstation cluster's project and the VPC host project (if different) are allowed. */
  allowedProjects?: Array<string>;
  /** Output only. Service attachment URI for the workstation cluster. The service attachment is created when private endpoint is enabled. To access workstations in the workstation cluster, configure access to the managed service using [Private Service Connect](https://cloud.google.com/vpc/docs/configure-private-service-connect-services). */
  serviceAttachmentUri?: string;
  /** Immutable. Whether Workstations endpoint is private. */
  enablePrivateEndpoint?: boolean;
}

export const PrivateClusterConfig: Schema.Schema<PrivateClusterConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      clusterHostname: Schema.optional(Schema.String),
      allowedProjects: Schema.optional(Schema.Array(Schema.String)),
      serviceAttachmentUri: Schema.optional(Schema.String),
      enablePrivateEndpoint: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "PrivateClusterConfig",
  }) as any as Schema.Schema<PrivateClusterConfig>;

export interface DomainConfig {
  /** Immutable. Domain used by Workstations for HTTP ingress. */
  domain?: string;
}

export const DomainConfig: Schema.Schema<DomainConfig> = Schema.suspend(() =>
  Schema.Struct({
    domain: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "DomainConfig",
}) as any as Schema.Schema<DomainConfig>;

export interface WorkstationCluster {
  /** Immutable. Name of the Compute Engine network in which instances associated with this workstation cluster will be created. */
  network?: string;
  /** Output only. Time when this workstation cluster was created. */
  createTime?: string;
  /** Output only. Time when this workstation cluster was most recently updated. */
  updateTime?: string;
  /** Output only. A system-assigned unique identifier for this workstation cluster. */
  uid?: string;
  /** Optional. Configuration options for Cluster HTTP Gateway. */
  gatewayConfig?: GatewayConfig;
  /** Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" */
  tags?: Record<string, string>;
  /** Output only. Whether this workstation cluster is in degraded mode, in which case it may require user action to restore full functionality. The conditions field contains detailed information about the status of the cluster. */
  degraded?: boolean;
  /** Optional. [Labels](https://cloud.google.com/workstations/docs/label-resources) that are applied to the workstation cluster and that are also propagated to the underlying Compute Engine resources. */
  labels?: Record<string, string>;
  /** Optional. Configuration for private workstation cluster. */
  privateClusterConfig?: PrivateClusterConfig;
  /** Optional. Checksum computed by the server. May be sent on update and delete requests to make sure that the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. Configuration options for a custom domain. */
  domainConfig?: DomainConfig;
  /** Output only. Status conditions describing the workstation cluster's current state. */
  conditions?: Array<Status>;
  /** Output only. Indicates whether this workstation cluster is currently being updated to match its intended state. */
  reconciling?: boolean;
  /** Output only. Time when this workstation cluster was soft-deleted. */
  deleteTime?: string;
  /** Output only. The private IP address of the control plane for this workstation cluster. Workstation VMs need access to this IP address to work with the service, so make sure that your firewall rules allow egress from the workstation VMs to this address. */
  controlPlaneIp?: string;
  /** Optional. Client-specified annotations. */
  annotations?: Record<string, string>;
  /** Immutable. Name of the Compute Engine subnetwork in which instances associated with this workstation cluster will be created. Must be part of the subnetwork specified for this workstation cluster. */
  subnetwork?: string;
  /** Optional. Human-readable name for this workstation cluster. */
  displayName?: string;
  /** Identifier. Full name of this workstation cluster. */
  name?: string;
}

export const WorkstationCluster: Schema.Schema<WorkstationCluster> =
  Schema.suspend(() =>
    Schema.Struct({
      network: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      gatewayConfig: Schema.optional(GatewayConfig),
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      degraded: Schema.optional(Schema.Boolean),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      privateClusterConfig: Schema.optional(PrivateClusterConfig),
      etag: Schema.optional(Schema.String),
      domainConfig: Schema.optional(DomainConfig),
      conditions: Schema.optional(Schema.Array(Status)),
      reconciling: Schema.optional(Schema.Boolean),
      deleteTime: Schema.optional(Schema.String),
      controlPlaneIp: Schema.optional(Schema.String),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      subnetwork: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WorkstationCluster",
  }) as any as Schema.Schema<WorkstationCluster>;

export interface ListWorkstationClustersResponse {
  /** Unreachable resources. */
  unreachable?: Array<string>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** The requested workstation clusters. */
  workstationClusters?: Array<WorkstationCluster>;
}

export const ListWorkstationClustersResponse: Schema.Schema<ListWorkstationClustersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      nextPageToken: Schema.optional(Schema.String),
      workstationClusters: Schema.optional(Schema.Array(WorkstationCluster)),
    }),
  ).annotate({
    identifier: "ListWorkstationClustersResponse",
  }) as any as Schema.Schema<ListWorkstationClustersResponse>;

export interface GenerateAccessTokenResponse {
  /** The generated bearer access token. To use this token, include it in an Authorization header of an HTTP request sent to the associated workstation's hostname—for example, `Authorization: Bearer `. */
  accessToken?: string;
  /** Time at which the generated token will expire. */
  expireTime?: string;
}

export const GenerateAccessTokenResponse: Schema.Schema<GenerateAccessTokenResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      accessToken: Schema.optional(Schema.String),
      expireTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GenerateAccessTokenResponse",
  }) as any as Schema.Schema<GenerateAccessTokenResponse>;

export interface GenerateAccessTokenRequest {
  /** Desired lifetime duration of the access token. This value must be at most 24 hours. If a value is not specified, the token's lifetime will be set to a default value of 1 hour. */
  ttl?: string;
  /** Optional. Port for which the access token should be generated. If specified, the generated access token grants access only to the specified port of the workstation. If specified, values must be within the range [1 - 65535]. If not specified, the generated access token grants access to all ports of the workstation. */
  port?: number;
  /** Desired expiration time of the access token. This value must be at most 24 hours in the future. If a value is not specified, the token's expiration time will be set to a default value of 1 hour in the future. */
  expireTime?: string;
}

export const GenerateAccessTokenRequest: Schema.Schema<GenerateAccessTokenRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      ttl: Schema.optional(Schema.String),
      port: Schema.optional(Schema.Number),
      expireTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GenerateAccessTokenRequest",
  }) as any as Schema.Schema<GenerateAccessTokenRequest>;

export interface ListLocationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      locations: Schema.optional(Schema.Array(Location)),
    }),
  ).annotate({
    identifier: "ListLocationsResponse",
  }) as any as Schema.Schema<ListLocationsResponse>;

export interface OperationMetadata {
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Time that the operation was created. */
  createTime?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. */
  requestedCancellation?: boolean;
  /** Output only. Time that the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      apiVersion: Schema.optional(Schema.String),
      statusMessage: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      verb: Schema.optional(Schema.String),
      requestedCancellation: Schema.optional(Schema.Boolean),
      endTime: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OperationMetadata",
  }) as any as Schema.Schema<OperationMetadata>;

export interface StopWorkstationRequest {
  /** Optional. If set, the request will be rejected if the latest version of the workstation on the server does not have this ETag. */
  etag?: string;
  /** Optional. If set, validate the request and preview the review, but do not actually apply it. */
  validateOnly?: boolean;
}

export const StopWorkstationRequest: Schema.Schema<StopWorkstationRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      validateOnly: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "StopWorkstationRequest",
  }) as any as Schema.Schema<StopWorkstationRequest>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      policy: Schema.optional(Policy),
      updateMask: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SetIamPolicyRequest",
  }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface ListUsableWorkstationsResponse {
  /** Unreachable resources. */
  unreachable?: Array<string>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** The requested workstations. */
  workstations?: Array<Workstation>;
}

export const ListUsableWorkstationsResponse: Schema.Schema<ListUsableWorkstationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      nextPageToken: Schema.optional(Schema.String),
      workstations: Schema.optional(Schema.Array(Workstation)),
    }),
  ).annotate({
    identifier: "ListUsableWorkstationsResponse",
  }) as any as Schema.Schema<ListUsableWorkstationsResponse>;

export interface ListWorkstationConfigsResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** Unreachable resources. */
  unreachable?: Array<string>;
  /** The requested configs. */
  workstationConfigs?: Array<WorkstationConfig>;
}

export const ListWorkstationConfigsResponse: Schema.Schema<ListWorkstationConfigsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      workstationConfigs: Schema.optional(Schema.Array(WorkstationConfig)),
    }),
  ).annotate({
    identifier: "ListWorkstationConfigsResponse",
  }) as any as Schema.Schema<ListWorkstationConfigsResponse>;

export interface GoogleProtobufEmpty {}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleProtobufEmpty",
  }) as any as Schema.Schema<GoogleProtobufEmpty>;

// ==========================================================================
// Operations
// ==========================================================================

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

export const ListProjectsLocationsRequest = Schema.Struct({
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("extraLocationTypes"),
  ),
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = DefaultErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export const listProjectsLocations: API.PaginatedOperationMethod<
  ListProjectsLocationsRequest,
  ListProjectsLocationsResponse,
  ListProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
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
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = DefaultErrors;

/** Gets information about a location. */
export const getProjectsLocations: API.OperationMethod<
  GetProjectsLocationsRequest,
  GetProjectsLocationsResponse,
  GetProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsOperationsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteProjectsLocationsOperations: API.OperationMethod<
  DeleteProjectsLocationsOperationsRequest,
  DeleteProjectsLocationsOperationsResponse,
  DeleteProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsOperationsRequest {
  /** The standard list page size. */
  pageSize?: number;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page token. */
  pageToken?: string;
  /** The standard list filter. */
  filter?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("returnPartialSuccess"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/operations",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsOperationsRequest,
  ListProjectsLocationsOperationsResponse,
  ListProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
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
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOperations: API.OperationMethod<
  GetProjectsLocationsOperationsRequest,
  GetProjectsLocationsOperationsResponse,
  GetProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
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
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = GoogleProtobufEmpty;
export const CancelProjectsLocationsOperationsResponse = GoogleProtobufEmpty;

export type CancelProjectsLocationsOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelProjectsLocationsOperations: API.OperationMethod<
  CancelProjectsLocationsOperationsRequest,
  CancelProjectsLocationsOperationsResponse,
  CancelProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsWorkstationClustersRequest {
  /** Required. Name of the requested resource. */
  name: string;
}

export const GetProjectsLocationsWorkstationClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsWorkstationClustersRequest>;

export type GetProjectsLocationsWorkstationClustersResponse =
  WorkstationCluster;
export const GetProjectsLocationsWorkstationClustersResponse =
  WorkstationCluster;

export type GetProjectsLocationsWorkstationClustersError = DefaultErrors;

/** Returns the requested workstation cluster. */
export const getProjectsLocationsWorkstationClusters: API.OperationMethod<
  GetProjectsLocationsWorkstationClustersRequest,
  GetProjectsLocationsWorkstationClustersResponse,
  GetProjectsLocationsWorkstationClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsWorkstationClustersRequest,
  output: GetProjectsLocationsWorkstationClustersResponse,
  errors: [],
}));

export interface PatchProjectsLocationsWorkstationClustersRequest {
  /** Optional. If set, validate the request and preview the review, but do not actually apply it. */
  validateOnly?: boolean;
  /** Identifier. Full name of this workstation cluster. */
  name: string;
  /** Required. Mask that specifies which fields in the workstation cluster should be updated. */
  updateMask?: string;
  /** Optional. If set, and the workstation cluster is not found, a new workstation cluster will be created. In this situation, update_mask is ignored. */
  allowMissing?: boolean;
  /** Request body */
  body?: WorkstationCluster;
}

export const PatchProjectsLocationsWorkstationClustersRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("allowMissing"),
  ),
  body: Schema.optional(WorkstationCluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsWorkstationClustersRequest>;

export type PatchProjectsLocationsWorkstationClustersResponse = Operation;
export const PatchProjectsLocationsWorkstationClustersResponse = Operation;

export type PatchProjectsLocationsWorkstationClustersError = DefaultErrors;

/** Updates an existing workstation cluster. */
export const patchProjectsLocationsWorkstationClusters: API.OperationMethod<
  PatchProjectsLocationsWorkstationClustersRequest,
  PatchProjectsLocationsWorkstationClustersResponse,
  PatchProjectsLocationsWorkstationClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsWorkstationClustersRequest,
  output: PatchProjectsLocationsWorkstationClustersResponse,
  errors: [],
}));

export interface ListProjectsLocationsWorkstationClustersRequest {
  /** Optional. Filter the WorkstationClusters to be listed. Possible filters are described in https://google.aip.dev/160. */
  filter?: string;
  /** Optional. Maximum number of items to return. */
  pageSize?: number;
  /** Optional. next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Required. Parent resource name. */
  parent: string;
}

export const ListProjectsLocationsWorkstationClustersRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsWorkstationClustersRequest>;

export type ListProjectsLocationsWorkstationClustersResponse =
  ListWorkstationClustersResponse;
export const ListProjectsLocationsWorkstationClustersResponse =
  ListWorkstationClustersResponse;

export type ListProjectsLocationsWorkstationClustersError = DefaultErrors;

/** Returns all workstation clusters in the specified location. */
export const listProjectsLocationsWorkstationClusters: API.PaginatedOperationMethod<
  ListProjectsLocationsWorkstationClustersRequest,
  ListProjectsLocationsWorkstationClustersResponse,
  ListProjectsLocationsWorkstationClustersError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsWorkstationClustersRequest,
  output: ListProjectsLocationsWorkstationClustersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsWorkstationClustersRequest {
  /** Optional. If set, validate the request and preview the review, but do not actually apply it. */
  validateOnly?: boolean;
  /** Required. ID to use for the workstation cluster. */
  workstationClusterId?: string;
  /** Required. Parent resource name. */
  parent: string;
  /** Request body */
  body?: WorkstationCluster;
}

export const CreateProjectsLocationsWorkstationClustersRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  workstationClusterId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("workstationClusterId"),
  ),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(WorkstationCluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsWorkstationClustersRequest>;

export type CreateProjectsLocationsWorkstationClustersResponse = Operation;
export const CreateProjectsLocationsWorkstationClustersResponse = Operation;

export type CreateProjectsLocationsWorkstationClustersError = DefaultErrors;

/** Creates a new workstation cluster. */
export const createProjectsLocationsWorkstationClusters: API.OperationMethod<
  CreateProjectsLocationsWorkstationClustersRequest,
  CreateProjectsLocationsWorkstationClustersResponse,
  CreateProjectsLocationsWorkstationClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsWorkstationClustersRequest,
  output: CreateProjectsLocationsWorkstationClustersResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsWorkstationClustersRequest {
  /** Required. Name of the workstation cluster to delete. */
  name: string;
  /** Optional. If set, validate the request and preview the review, but do not apply it. */
  validateOnly?: boolean;
  /** Optional. If set, any workstation configurations and workstations in the workstation cluster are also deleted. Otherwise, the request only works if the workstation cluster has no configurations or workstations. */
  force?: boolean;
  /** Optional. If set, the request will be rejected if the latest version of the workstation cluster on the server does not have this ETag. */
  etag?: string;
}

export const DeleteProjectsLocationsWorkstationClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("validateOnly"),
  ),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsWorkstationClustersRequest>;

export type DeleteProjectsLocationsWorkstationClustersResponse = Operation;
export const DeleteProjectsLocationsWorkstationClustersResponse = Operation;

export type DeleteProjectsLocationsWorkstationClustersError = DefaultErrors;

/** Deletes the specified workstation cluster. */
export const deleteProjectsLocationsWorkstationClusters: API.OperationMethod<
  DeleteProjectsLocationsWorkstationClustersRequest,
  DeleteProjectsLocationsWorkstationClustersResponse,
  DeleteProjectsLocationsWorkstationClustersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsWorkstationClustersRequest,
  output: DeleteProjectsLocationsWorkstationClustersResponse,
  errors: [],
}));

export interface ListProjectsLocationsWorkstationClustersWorkstationConfigsRequest {
  /** Optional. Maximum number of items to return. */
  pageSize?: number;
  /** Optional. next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Required. Parent resource name. */
  parent: string;
  /** Optional. Filter the WorkstationConfigs to be listed. Possible filters are described in https://google.aip.dev/160. */
  filter?: string;
}

export const ListProjectsLocationsWorkstationClustersWorkstationConfigsRequest =
  Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsWorkstationClustersWorkstationConfigsRequest>;

export type ListProjectsLocationsWorkstationClustersWorkstationConfigsResponse =
  ListWorkstationConfigsResponse;
export const ListProjectsLocationsWorkstationClustersWorkstationConfigsResponse =
  ListWorkstationConfigsResponse;

export type ListProjectsLocationsWorkstationClustersWorkstationConfigsError =
  DefaultErrors;

/** Returns all workstation configurations in the specified cluster. */
export const listProjectsLocationsWorkstationClustersWorkstationConfigs: API.PaginatedOperationMethod<
  ListProjectsLocationsWorkstationClustersWorkstationConfigsRequest,
  ListProjectsLocationsWorkstationClustersWorkstationConfigsResponse,
  ListProjectsLocationsWorkstationClustersWorkstationConfigsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsWorkstationClustersWorkstationConfigsRequest,
  output: ListProjectsLocationsWorkstationClustersWorkstationConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsWorkstationClustersWorkstationConfigsRequest {
  /** Required. Name of the requested resource. */
  name: string;
}

export const GetProjectsLocationsWorkstationClustersWorkstationConfigsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs/{workstationConfigsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsWorkstationClustersWorkstationConfigsRequest>;

export type GetProjectsLocationsWorkstationClustersWorkstationConfigsResponse =
  WorkstationConfig;
export const GetProjectsLocationsWorkstationClustersWorkstationConfigsResponse =
  WorkstationConfig;

export type GetProjectsLocationsWorkstationClustersWorkstationConfigsError =
  DefaultErrors;

/** Returns the requested workstation configuration. */
export const getProjectsLocationsWorkstationClustersWorkstationConfigs: API.OperationMethod<
  GetProjectsLocationsWorkstationClustersWorkstationConfigsRequest,
  GetProjectsLocationsWorkstationClustersWorkstationConfigsResponse,
  GetProjectsLocationsWorkstationClustersWorkstationConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsWorkstationClustersWorkstationConfigsRequest,
  output: GetProjectsLocationsWorkstationClustersWorkstationConfigsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs/{workstationConfigsId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsRequest>;

export type SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsResponse =
  Policy;
export const SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsResponse =
  Policy;

export type SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsError =
  DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigs: API.OperationMethod<
  SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsRequest,
  SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsResponse,
  SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsRequest,
  output:
    SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsResponse,
  errors: [],
}));

export interface ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsRequest {
  /** Optional. next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Optional. Maximum number of items to return. */
  pageSize?: number;
  /** Required. Parent resource name. */
  parent: string;
}

export const ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsRequest =
  Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs:listUsable",
    }),
    svc,
  ) as unknown as Schema.Schema<ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsRequest>;

export type ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsResponse =
  ListUsableWorkstationConfigsResponse;
export const ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsResponse =
  ListUsableWorkstationConfigsResponse;

export type ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsError =
  DefaultErrors;

/** Returns all workstation configurations in the specified cluster on which the caller has the "workstations.workstation.create" permission. */
export const listUsableProjectsLocationsWorkstationClustersWorkstationConfigs: API.PaginatedOperationMethod<
  ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsRequest,
  ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsResponse,
  ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input:
    ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsRequest,
  output:
    ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs/{workstationConfigsId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsRequest>;

export type TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsError =
  DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigs: API.OperationMethod<
  TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsRequest,
  TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsResponse,
  TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsRequest,
  output:
    TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsWorkstationClustersWorkstationConfigsRequest {
  /** Optional. If set, validate the request and preview the review, but do not actually apply it. */
  validateOnly?: boolean;
  /** Optional. If set, the request is rejected if the latest version of the workstation configuration on the server does not have this ETag. */
  etag?: string;
  /** Optional. If set, any workstations in the workstation configuration are also deleted. Otherwise, the request works only if the workstation configuration has no workstations. */
  force?: boolean;
  /** Required. Name of the workstation configuration to delete. */
  name: string;
}

export const DeleteProjectsLocationsWorkstationClustersWorkstationConfigsRequest =
  Schema.Struct({
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs/{workstationConfigsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsWorkstationClustersWorkstationConfigsRequest>;

export type DeleteProjectsLocationsWorkstationClustersWorkstationConfigsResponse =
  Operation;
export const DeleteProjectsLocationsWorkstationClustersWorkstationConfigsResponse =
  Operation;

export type DeleteProjectsLocationsWorkstationClustersWorkstationConfigsError =
  DefaultErrors;

/** Deletes the specified workstation configuration. */
export const deleteProjectsLocationsWorkstationClustersWorkstationConfigs: API.OperationMethod<
  DeleteProjectsLocationsWorkstationClustersWorkstationConfigsRequest,
  DeleteProjectsLocationsWorkstationClustersWorkstationConfigsResponse,
  DeleteProjectsLocationsWorkstationClustersWorkstationConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsWorkstationClustersWorkstationConfigsRequest,
  output: DeleteProjectsLocationsWorkstationClustersWorkstationConfigsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsWorkstationClustersWorkstationConfigsRequest {
  /** Optional. If set and the workstation configuration is not found, a new workstation configuration will be created. In this situation, update_mask is ignored. */
  allowMissing?: boolean;
  /** Optional. If set, validate the request and preview the review, but do not actually apply it. */
  validateOnly?: boolean;
  /** Identifier. Full name of this workstation configuration. */
  name: string;
  /** Required. Mask specifying which fields in the workstation configuration should be updated. */
  updateMask?: string;
  /** Request body */
  body?: WorkstationConfig;
}

export const PatchProjectsLocationsWorkstationClustersWorkstationConfigsRequest =
  Schema.Struct({
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(WorkstationConfig).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs/{workstationConfigsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsWorkstationClustersWorkstationConfigsRequest>;

export type PatchProjectsLocationsWorkstationClustersWorkstationConfigsResponse =
  Operation;
export const PatchProjectsLocationsWorkstationClustersWorkstationConfigsResponse =
  Operation;

export type PatchProjectsLocationsWorkstationClustersWorkstationConfigsError =
  DefaultErrors;

/** Updates an existing workstation configuration. */
export const patchProjectsLocationsWorkstationClustersWorkstationConfigs: API.OperationMethod<
  PatchProjectsLocationsWorkstationClustersWorkstationConfigsRequest,
  PatchProjectsLocationsWorkstationClustersWorkstationConfigsResponse,
  PatchProjectsLocationsWorkstationClustersWorkstationConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsWorkstationClustersWorkstationConfigsRequest,
  output: PatchProjectsLocationsWorkstationClustersWorkstationConfigsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsRequest =
  Schema.Struct({
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
    resource: Schema.String.pipe(T.HttpPath("resource")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs/{workstationConfigsId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsRequest>;

export type GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsResponse =
  Policy;
export const GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsResponse =
  Policy;

export type GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsError =
  DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigs: API.OperationMethod<
  GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsRequest,
  GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsResponse,
  GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsRequest,
  output:
    GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsWorkstationClustersWorkstationConfigsRequest {
  /** Optional. If set, validate the request and preview the review, but do not actually apply it. */
  validateOnly?: boolean;
  /** Required. Parent resource name. */
  parent: string;
  /** Required. ID to use for the workstation configuration. */
  workstationConfigId?: string;
  /** Request body */
  body?: WorkstationConfig;
}

export const CreateProjectsLocationsWorkstationClustersWorkstationConfigsRequest =
  Schema.Struct({
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    workstationConfigId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("workstationConfigId"),
    ),
    body: Schema.optional(WorkstationConfig).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsWorkstationClustersWorkstationConfigsRequest>;

export type CreateProjectsLocationsWorkstationClustersWorkstationConfigsResponse =
  Operation;
export const CreateProjectsLocationsWorkstationClustersWorkstationConfigsResponse =
  Operation;

export type CreateProjectsLocationsWorkstationClustersWorkstationConfigsError =
  DefaultErrors;

/** Creates a new workstation configuration. */
export const createProjectsLocationsWorkstationClustersWorkstationConfigs: API.OperationMethod<
  CreateProjectsLocationsWorkstationClustersWorkstationConfigsRequest,
  CreateProjectsLocationsWorkstationClustersWorkstationConfigsResponse,
  CreateProjectsLocationsWorkstationClustersWorkstationConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsWorkstationClustersWorkstationConfigsRequest,
  output: CreateProjectsLocationsWorkstationClustersWorkstationConfigsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest =
  Schema.Struct({
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
    resource: Schema.String.pipe(T.HttpPath("resource")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs/{workstationConfigsId}/workstations/{workstationsId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest>;

export type GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  Policy;
export const GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  Policy;

export type GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError =
  DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstations: API.OperationMethod<
  GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  output:
    GetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest {
  /** Required. Parent resource name. */
  parent: string;
  /** Optional. Filter the Workstations to be listed. Possible filters are described in https://google.aip.dev/160. */
  filter?: string;
  /** Optional. Maximum number of items to return. */
  pageSize?: number;
  /** Optional. next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs/{workstationConfigsId}/workstations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest>;

export type ListProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  ListWorkstationsResponse;
export const ListProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  ListWorkstationsResponse;

export type ListProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError =
  DefaultErrors;

/** Returns all Workstations using the specified workstation configuration. */
export const listProjectsLocationsWorkstationClustersWorkstationConfigsWorkstations: API.PaginatedOperationMethod<
  ListProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  ListProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  ListProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input:
    ListProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  output:
    ListProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs/{workstationConfigsId}/workstations/{workstationsId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest>;

export type SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  Policy;
export const SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  Policy;

export type SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError =
  DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstations: API.OperationMethod<
  SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  output:
    SetIamPolicyProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  errors: [],
}));

export interface GenerateAccessTokenProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest {
  /** Required. Name of the workstation for which the access token should be generated. */
  workstation: string;
  /** Request body */
  body?: GenerateAccessTokenRequest;
}

export const GenerateAccessTokenProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest =
  Schema.Struct({
    workstation: Schema.String.pipe(T.HttpPath("workstation")),
    body: Schema.optional(GenerateAccessTokenRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs/{workstationConfigsId}/workstations/{workstationsId}:generateAccessToken",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GenerateAccessTokenProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest>;

export type GenerateAccessTokenProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  GenerateAccessTokenResponse;
export const GenerateAccessTokenProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  GenerateAccessTokenResponse;

export type GenerateAccessTokenProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError =
  DefaultErrors;

/** Returns a short-lived credential that can be used to send authenticated and authorized traffic to a workstation. Once generated this token cannot be revoked and is good for the lifetime of the token. */
export const generateAccessTokenProjectsLocationsWorkstationClustersWorkstationConfigsWorkstations: API.OperationMethod<
  GenerateAccessTokenProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  GenerateAccessTokenProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  GenerateAccessTokenProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    GenerateAccessTokenProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  output:
    GenerateAccessTokenProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  errors: [],
}));

export interface ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest {
  /** Optional. Maximum number of items to return. */
  pageSize?: number;
  /** Required. Parent resource name. */
  parent: string;
  /** Optional. next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
}

export const ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest =
  Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs/{workstationConfigsId}/workstations:listUsable",
    }),
    svc,
  ) as unknown as Schema.Schema<ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest>;

export type ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  ListUsableWorkstationsResponse;
export const ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  ListUsableWorkstationsResponse;

export type ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError =
  DefaultErrors;

/** Returns all workstations using the specified workstation configuration on which the caller has the "workstations.workstations.use" permission. */
export const listUsableProjectsLocationsWorkstationClustersWorkstationConfigsWorkstations: API.PaginatedOperationMethod<
  ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input:
    ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  output:
    ListUsableProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest {
  /** Required. Parent resource name. */
  parent: string;
  /** Optional. If set, validate the request and preview the review, but do not actually apply it. */
  validateOnly?: boolean;
  /** Required. ID to use for the workstation. */
  workstationId?: string;
  /** Request body */
  body?: Workstation;
}

export const CreateProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    workstationId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("workstationId"),
    ),
    body: Schema.optional(Workstation).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs/{workstationConfigsId}/workstations",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest>;

export type CreateProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  Operation;
export const CreateProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  Operation;

export type CreateProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError =
  DefaultErrors;

/** Creates a new workstation. */
export const createProjectsLocationsWorkstationClustersWorkstationConfigsWorkstations: API.OperationMethod<
  CreateProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  CreateProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  CreateProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    CreateProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  output:
    CreateProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest =
  Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs/{workstationConfigsId}/workstations/{workstationsId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest>;

export type TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError =
  DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsWorkstations: API.OperationMethod<
  TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  output:
    TestIamPermissionsProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  errors: [],
}));

export interface StartProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest {
  /** Required. Name of the workstation to start. */
  name: string;
  /** Request body */
  body?: StartWorkstationRequest;
}

export const StartProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(StartWorkstationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs/{workstationConfigsId}/workstations/{workstationsId}:start",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<StartProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest>;

export type StartProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  Operation;
export const StartProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  Operation;

export type StartProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError =
  DefaultErrors;

/** Starts running a workstation so that users can connect to it. */
export const startProjectsLocationsWorkstationClustersWorkstationConfigsWorkstations: API.OperationMethod<
  StartProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  StartProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  StartProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    StartProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  output:
    StartProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest {
  /** Required. Name of the workstation to delete. */
  name: string;
  /** Optional. If set, validate the request and preview the review, but do not actually apply it. */
  validateOnly?: boolean;
  /** Optional. If set, the request will be rejected if the latest version of the workstation on the server does not have this ETag. */
  etag?: string;
}

export const DeleteProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs/{workstationConfigsId}/workstations/{workstationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest>;

export type DeleteProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  Operation;
export const DeleteProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  Operation;

export type DeleteProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError =
  DefaultErrors;

/** Deletes the specified workstation. */
export const deleteProjectsLocationsWorkstationClustersWorkstationConfigsWorkstations: API.OperationMethod<
  DeleteProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  DeleteProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  DeleteProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    DeleteProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  output:
    DeleteProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest {
  /** Optional. If set and the workstation configuration is not found, a new workstation configuration is created. In this situation, update_mask is ignored. */
  allowMissing?: boolean;
  /** Required. Mask specifying which fields in the workstation configuration should be updated. */
  updateMask?: string;
  /** Identifier. Full name of this workstation. */
  name: string;
  /** Optional. If set, validate the request and preview the review, but do not actually apply it. */
  validateOnly?: boolean;
  /** Request body */
  body?: Workstation;
}

export const PatchProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest =
  Schema.Struct({
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    body: Schema.optional(Workstation).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs/{workstationConfigsId}/workstations/{workstationsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest>;

export type PatchProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  Operation;
export const PatchProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  Operation;

export type PatchProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError =
  DefaultErrors;

/** Updates an existing workstation. */
export const patchProjectsLocationsWorkstationClustersWorkstationConfigsWorkstations: API.OperationMethod<
  PatchProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  PatchProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  PatchProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    PatchProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  output:
    PatchProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest {
  /** Required. Name of the requested resource. */
  name: string;
}

export const GetProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs/{workstationConfigsId}/workstations/{workstationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest>;

export type GetProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  Workstation;
export const GetProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  Workstation;

export type GetProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError =
  DefaultErrors;

/** Returns the requested workstation. */
export const getProjectsLocationsWorkstationClustersWorkstationConfigsWorkstations: API.OperationMethod<
  GetProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  GetProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  GetProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    GetProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  output:
    GetProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  errors: [],
}));

export interface StopProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest {
  /** Required. Name of the workstation to stop. */
  name: string;
  /** Request body */
  body?: StopWorkstationRequest;
}

export const StopProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(StopWorkstationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/workstationClusters/{workstationClustersId}/workstationConfigs/{workstationConfigsId}/workstations/{workstationsId}:stop",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<StopProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest>;

export type StopProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  Operation;
export const StopProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse =
  Operation;

export type StopProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError =
  DefaultErrors;

/** Stops running a workstation, reducing costs. */
export const stopProjectsLocationsWorkstationClustersWorkstationConfigsWorkstations: API.OperationMethod<
  StopProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  StopProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  StopProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input:
    StopProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsRequest,
  output:
    StopProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsResponse,
  errors: [],
}));
