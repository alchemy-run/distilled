// ==========================================================================
// Database Migration API (datamigration v1beta1)
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
  name: "datamigration",
  version: "v1beta1",
  rootUrl: "https://datamigration.googleapis.com/",
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

export interface ReverseSshConnectivity {
  /** Required. The IP of the virtual machine (Compute Engine) used as the bastion server for the SSH tunnel. */
  vmIp?: string;
  /** Required. The forwarding port of the virtual machine (Compute Engine) used as the bastion server for the SSH tunnel. */
  vmPort?: number;
  /** The name of the virtual machine (Compute Engine) used as the bastion server for the SSH tunnel. */
  vm?: string;
  /** The name of the VPC to peer with the Cloud SQL private network. */
  vpc?: string;
}

export const ReverseSshConnectivity: Schema.Schema<ReverseSshConnectivity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vmIp: Schema.optional(Schema.String),
      vmPort: Schema.optional(Schema.Number),
      vm: Schema.optional(Schema.String),
      vpc: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ReverseSshConnectivity",
  }) as any as Schema.Schema<ReverseSshConnectivity>;

export interface VpcPeeringConnectivity {
  /** The name of the VPC network to peer with the Cloud SQL private network. */
  vpc?: string;
}

export const VpcPeeringConnectivity: Schema.Schema<VpcPeeringConnectivity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vpc: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VpcPeeringConnectivity",
  }) as any as Schema.Schema<VpcPeeringConnectivity>;

export interface StaticIpConnectivity {}

export const StaticIpConnectivity: Schema.Schema<StaticIpConnectivity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "StaticIpConnectivity",
  }) as any as Schema.Schema<StaticIpConnectivity>;

export interface DatabaseType {
  /** The database provider. */
  provider?:
    | "DATABASE_PROVIDER_UNSPECIFIED"
    | "CLOUDSQL"
    | "RDS"
    | (string & {});
  /** The database engine. */
  engine?: "DATABASE_ENGINE_UNSPECIFIED" | "MYSQL" | (string & {});
}

export const DatabaseType: Schema.Schema<DatabaseType> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      provider: Schema.optional(Schema.String),
      engine: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DatabaseType",
  }) as any as Schema.Schema<DatabaseType>;

export interface MigrationJob {
  /** The name (URI) of this migration job resource, in the form of: projects/{project}/locations/{location}/migrationJobs/{migrationJob}. */
  name?: string;
  /** Output only. The timestamp when the migration job resource was created. A timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z". */
  createTime?: string;
  /** Output only. The timestamp when the migration job resource was last updated. A timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z". */
  updateTime?: string;
  /** The resource labels for migration job to use to annotate any related underlying resources such as Compute Engine VMs. An object containing a list of "key": "value" pairs. Example: `{ "name": "wrench", "mass": "1.3kg", "count": "3" }`. */
  labels?: Record<string, string>;
  /** The migration job display name. */
  displayName?: string;
  /** The current migration job state. */
  state?:
    | "STATE_UNSPECIFIED"
    | "MAINTENANCE"
    | "DRAFT"
    | "CREATING"
    | "NOT_STARTED"
    | "RUNNING"
    | "FAILED"
    | "COMPLETED"
    | "DELETING"
    | "STOPPING"
    | "STOPPED"
    | "DELETED"
    | "UPDATING"
    | "STARTING"
    | "RESTARTING"
    | "RESUMING"
    | (string & {});
  /** Output only. The current migration job phase. */
  phase?:
    | "PHASE_UNSPECIFIED"
    | "FULL_DUMP"
    | "CDC"
    | "PROMOTE_IN_PROGRESS"
    | "WAITING_FOR_SOURCE_WRITES_TO_STOP"
    | "PREPARING_THE_DUMP"
    | (string & {});
  /** Required. The migration job type. */
  type?: "TYPE_UNSPECIFIED" | "ONE_TIME" | "CONTINUOUS" | (string & {});
  /** The path to the dump file in Google Cloud Storage, in the format: (gs://[BUCKET_NAME]/[OBJECT_NAME]). */
  dumpPath?: string;
  /** Required. The resource name (URI) of the source connection profile. */
  source?: string;
  /** Required. The resource name (URI) of the destination connection profile. */
  destination?: string;
  /** The details needed to communicate to the source over Reverse SSH tunnel connectivity. */
  reverseSshConnectivity?: ReverseSshConnectivity;
  /** The details of the VPC network that the source database is located in. */
  vpcPeeringConnectivity?: VpcPeeringConnectivity;
  /** static ip connectivity data (default, no additional details needed). */
  staticIpConnectivity?: StaticIpConnectivity;
  /** Output only. The duration of the migration job (in seconds). A duration in seconds with up to nine fractional digits, terminated by 's'. Example: "3.5s". */
  duration?: string;
  /** Output only. The error details in case of state FAILED. */
  error?: Status;
  /** The database engine type and provider of the source. */
  sourceDatabase?: DatabaseType;
  /** The database engine type and provider of the destination. */
  destinationDatabase?: DatabaseType;
  /** Output only. If the migration job is completed, the time when it was completed. */
  endTime?: string;
}

export const MigrationJob: Schema.Schema<MigrationJob> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      displayName: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      phase: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      dumpPath: Schema.optional(Schema.String),
      source: Schema.optional(Schema.String),
      destination: Schema.optional(Schema.String),
      reverseSshConnectivity: Schema.optional(ReverseSshConnectivity),
      vpcPeeringConnectivity: Schema.optional(VpcPeeringConnectivity),
      staticIpConnectivity: Schema.optional(StaticIpConnectivity),
      duration: Schema.optional(Schema.String),
      error: Schema.optional(Status),
      sourceDatabase: Schema.optional(DatabaseType),
      destinationDatabase: Schema.optional(DatabaseType),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MigrationJob",
  }) as any as Schema.Schema<MigrationJob>;

export interface ListMigrationJobsResponse {
  /** The list of migration jobs objects. */
  migrationJobs?: Array<MigrationJob>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListMigrationJobsResponse: Schema.Schema<ListMigrationJobsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      migrationJobs: Schema.optional(Schema.Array(MigrationJob)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListMigrationJobsResponse",
  }) as any as Schema.Schema<ListMigrationJobsResponse>;

export interface StartMigrationJobRequest {}

export const StartMigrationJobRequest: Schema.Schema<StartMigrationJobRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "StartMigrationJobRequest",
  }) as any as Schema.Schema<StartMigrationJobRequest>;

export interface StopMigrationJobRequest {}

export const StopMigrationJobRequest: Schema.Schema<StopMigrationJobRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "StopMigrationJobRequest",
  }) as any as Schema.Schema<StopMigrationJobRequest>;

export interface ResumeMigrationJobRequest {}

export const ResumeMigrationJobRequest: Schema.Schema<ResumeMigrationJobRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ResumeMigrationJobRequest",
  }) as any as Schema.Schema<ResumeMigrationJobRequest>;

export interface PromoteMigrationJobRequest {}

export const PromoteMigrationJobRequest: Schema.Schema<PromoteMigrationJobRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "PromoteMigrationJobRequest",
  }) as any as Schema.Schema<PromoteMigrationJobRequest>;

export interface VerifyMigrationJobRequest {}

export const VerifyMigrationJobRequest: Schema.Schema<VerifyMigrationJobRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "VerifyMigrationJobRequest",
  }) as any as Schema.Schema<VerifyMigrationJobRequest>;

export interface RestartMigrationJobRequest {}

export const RestartMigrationJobRequest: Schema.Schema<RestartMigrationJobRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "RestartMigrationJobRequest",
  }) as any as Schema.Schema<RestartMigrationJobRequest>;

export interface VmCreationConfig {
  /** Required. VM instance machine type to create. */
  vmMachineType?: string;
  /** The Google Cloud Platform zone to create the VM in. */
  vmZone?: string;
  /** The subnet name the vm needs to be created in. */
  subnet?: string;
}

export const VmCreationConfig: Schema.Schema<VmCreationConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vmMachineType: Schema.optional(Schema.String),
      vmZone: Schema.optional(Schema.String),
      subnet: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VmCreationConfig",
  }) as any as Schema.Schema<VmCreationConfig>;

export interface VmSelectionConfig {
  /** Required. The Google Cloud Platform zone the VM is located. */
  vmZone?: string;
}

export const VmSelectionConfig: Schema.Schema<VmSelectionConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vmZone: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VmSelectionConfig",
  }) as any as Schema.Schema<VmSelectionConfig>;

export interface GenerateSshScriptRequest {
  /** Required. Bastion VM Instance name to use or to create. */
  vm?: string;
  /** The VM creation configuration */
  vmCreationConfig?: VmCreationConfig;
  /** The VM selection configuration */
  vmSelectionConfig?: VmSelectionConfig;
  /** The port that will be open on the bastion host */
  vmPort?: number;
}

export const GenerateSshScriptRequest: Schema.Schema<GenerateSshScriptRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vm: Schema.optional(Schema.String),
      vmCreationConfig: Schema.optional(VmCreationConfig),
      vmSelectionConfig: Schema.optional(VmSelectionConfig),
      vmPort: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GenerateSshScriptRequest",
  }) as any as Schema.Schema<GenerateSshScriptRequest>;

export interface SshScript {
  /** The ssh configuration script. */
  script?: string;
}

export const SshScript: Schema.Schema<SshScript> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      script: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "SshScript" }) as any as Schema.Schema<SshScript>;

export interface SslConfig {
  /** Output only. The ssl config type according to 'client_key', 'client_certificate' and 'ca_certificate'. */
  type?:
    | "SSL_TYPE_UNSPECIFIED"
    | "SERVER_ONLY"
    | "SERVER_CLIENT"
    | (string & {});
  /** Input only. The unencrypted PKCS#1 or PKCS#8 PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' field is mandatory. */
  clientKey?: string;
  /** Input only. The x509 PEM-encoded certificate that will be used by the replica to authenticate against the source database server.If this field is used then the 'client_key' field is mandatory. */
  clientCertificate?: string;
  /** Required. Input only. The x509 PEM-encoded certificate of the CA that signed the source database server's certificate. The replica will use this certificate to verify it's connecting to the right host. */
  caCertificate?: string;
}

export const SslConfig: Schema.Schema<SslConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      clientKey: Schema.optional(Schema.String),
      clientCertificate: Schema.optional(Schema.String),
      caCertificate: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "SslConfig" }) as any as Schema.Schema<SslConfig>;

export interface MySqlConnectionProfile {
  /** Required. The IP or hostname of the source MySQL database. */
  host?: string;
  /** Required. The network port of the source MySQL database. */
  port?: number;
  /** Required. The username that Database Migration Service will use to connect to the database. The value is encrypted when stored in Database Migration Service. */
  username?: string;
  /** Required. Input only. The password for the user that Database Migration Service will be using to connect to the database. This field is not returned on request, and the value is encrypted when stored in Database Migration Service. */
  password?: string;
  /** Output only. Indicates If this connection profile password is stored. */
  passwordSet?: boolean;
  /** SSL configuration for the destination to connect to the source database. */
  ssl?: SslConfig;
  /** If the source is a Cloud SQL database, use this field to provide the Cloud SQL instance ID of the source. */
  cloudSqlId?: string;
}

export const MySqlConnectionProfile: Schema.Schema<MySqlConnectionProfile> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      host: Schema.optional(Schema.String),
      port: Schema.optional(Schema.Number),
      username: Schema.optional(Schema.String),
      password: Schema.optional(Schema.String),
      passwordSet: Schema.optional(Schema.Boolean),
      ssl: Schema.optional(SslConfig),
      cloudSqlId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MySqlConnectionProfile",
  }) as any as Schema.Schema<MySqlConnectionProfile>;

export interface SqlAclEntry {
  /** The allowlisted value for the access control list. */
  value?: string;
  /** The time when this access control entry expires in [RFC 3339](https://tools.ietf.org/html/rfc3339) format, for example: `2012-11-15T16:19:00.094Z`. */
  expireTime?: string;
  /** Input only. The time-to-leave of this access control entry. */
  ttl?: string;
  /** A label to identify this entry. */
  label?: string;
}

export const SqlAclEntry: Schema.Schema<SqlAclEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      expireTime: Schema.optional(Schema.String),
      ttl: Schema.optional(Schema.String),
      label: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SqlAclEntry",
  }) as any as Schema.Schema<SqlAclEntry>;

export interface SqlIpConfig {
  /** Whether the instance is assigned a public IP address or not. */
  enableIpv4?: boolean;
  /** The resource link for the VPC network from which the Cloud SQL instance is accessible for private IP. For example, `/projects/myProject/global/networks/default`. This setting can be updated, but it cannot be removed after it is set. */
  privateNetwork?: string;
  /** Whether SSL connections over IP should be enforced or not. */
  requireSsl?: boolean;
  /** The list of external networks that are allowed to connect to the instance using the IP. See https://en.wikipedia.org/wiki/CIDR_notation#CIDR_notation, also known as 'slash' notation (e.g. `192.168.100.0/24`). */
  authorizedNetworks?: Array<SqlAclEntry>;
}

export const SqlIpConfig: Schema.Schema<SqlIpConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enableIpv4: Schema.optional(Schema.Boolean),
      privateNetwork: Schema.optional(Schema.String),
      requireSsl: Schema.optional(Schema.Boolean),
      authorizedNetworks: Schema.optional(Schema.Array(SqlAclEntry)),
    }),
  ).annotate({
    identifier: "SqlIpConfig",
  }) as any as Schema.Schema<SqlIpConfig>;

export interface CloudSqlSettings {
  /** The database engine type and version. */
  databaseVersion?:
    | "SQL_DATABASE_VERSION_UNSPECIFIED"
    | "MYSQL_5_6"
    | "MYSQL_5_7"
    | "MYSQL_8_0"
    | (string & {});
  /** The resource labels for a Cloud SQL instance to use to annotate any related underlying resources such as Compute Engine VMs. An object containing a list of "key": "value" pairs. Example: `{ "name": "wrench", "mass": "18kg", "count": "3" }`. */
  userLabels?: Record<string, string>;
  /** The tier (or machine type) for this instance, for example: `db-n1-standard-1` (MySQL instances). For more information, see [Cloud SQL Instance Settings](https://cloud.google.com/sql/docs/mysql/instance-settings). */
  tier?: string;
  /** The maximum size to which storage capacity can be automatically increased. The default value is 0, which specifies that there is no limit. */
  storageAutoResizeLimit?: string;
  /** The activation policy specifies when the instance is activated; it is applicable only when the instance state is 'RUNNABLE'. Valid values: 'ALWAYS': The instance is on, and remains so even in the absence of connection requests. `NEVER`: The instance is off; it is not activated, even if a connection request arrives. */
  activationPolicy?:
    | "SQL_ACTIVATION_POLICY_UNSPECIFIED"
    | "ALWAYS"
    | "NEVER"
    | (string & {});
  /** The settings for IP Management. This allows to enable or disable the instance IP and manage which external networks can connect to the instance. The IPv4 address cannot be disabled. */
  ipConfig?: SqlIpConfig;
  /** [default: ON] If you enable this setting, Cloud SQL checks your available storage every 30 seconds. If the available storage falls below a threshold size, Cloud SQL automatically adds additional storage capacity. If the available storage repeatedly falls below the threshold size, Cloud SQL continues to add storage until it reaches the maximum of 30 TB. */
  autoStorageIncrease?: boolean;
  /** The database flags passed to the Cloud SQL instance at startup. An object containing a list of "key": value pairs. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }. */
  databaseFlags?: Record<string, string>;
  /** The type of storage: `PD_SSD` (default) or `PD_HDD`. */
  dataDiskType?:
    | "SQL_DATA_DISK_TYPE_UNSPECIFIED"
    | "PD_SSD"
    | "PD_HDD"
    | (string & {});
  /** The storage capacity available to the database, in GB. The minimum (and default) size is 10GB. */
  dataDiskSizeGb?: string;
  /** The Google Cloud Platform zone where your Cloud SQL database instance is located. */
  zone?: string;
  /** The Database Migration Service source connection profile ID, in the format: `projects/my_project_name/locations/us-central1/connectionProfiles/connection_profile_ID` */
  sourceId?: string;
  /** Input only. Initial root password. */
  rootPassword?: string;
  /** Output only. Indicates If this connection profile root password is stored. */
  rootPasswordSet?: boolean;
}

export const CloudSqlSettings: Schema.Schema<CloudSqlSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      databaseVersion: Schema.optional(Schema.String),
      userLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      tier: Schema.optional(Schema.String),
      storageAutoResizeLimit: Schema.optional(Schema.String),
      activationPolicy: Schema.optional(Schema.String),
      ipConfig: Schema.optional(SqlIpConfig),
      autoStorageIncrease: Schema.optional(Schema.Boolean),
      databaseFlags: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      dataDiskType: Schema.optional(Schema.String),
      dataDiskSizeGb: Schema.optional(Schema.String),
      zone: Schema.optional(Schema.String),
      sourceId: Schema.optional(Schema.String),
      rootPassword: Schema.optional(Schema.String),
      rootPasswordSet: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "CloudSqlSettings",
  }) as any as Schema.Schema<CloudSqlSettings>;

export interface CloudSqlConnectionProfile {
  /** Output only. The Cloud SQL instance ID that this connection profile is associated with. */
  cloudSqlId?: string;
  /** Immutable. Metadata used to create the destination Cloud SQL database. */
  settings?: CloudSqlSettings;
  /** Output only. The Cloud SQL database instance's private IP. */
  privateIp?: string;
  /** Output only. The Cloud SQL database instance's public IP. */
  publicIp?: string;
}

export const CloudSqlConnectionProfile: Schema.Schema<CloudSqlConnectionProfile> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cloudSqlId: Schema.optional(Schema.String),
      settings: Schema.optional(CloudSqlSettings),
      privateIp: Schema.optional(Schema.String),
      publicIp: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CloudSqlConnectionProfile",
  }) as any as Schema.Schema<CloudSqlConnectionProfile>;

export interface ConnectionProfile {
  /** The name of this connection profile resource in the form of projects/{project}/locations/{location}/connectionProfiles/{connectionProfile}. */
  name?: string;
  /** Output only. The timestamp when the resource was created. A timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z". */
  createTime?: string;
  /** Output only. The timestamp when the resource was last updated. A timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z". */
  updateTime?: string;
  /** The resource labels for connection profile to use to annotate any related underlying resources such as Compute Engine VMs. An object containing a list of "key": "value" pairs. Example: `{ "name": "wrench", "mass": "1.3kg", "count": "3" }`. */
  labels?: Record<string, string>;
  /** The current connection profile state (e.g. DRAFT, READY, or FAILED). */
  state?:
    | "STATE_UNSPECIFIED"
    | "DRAFT"
    | "CREATING"
    | "READY"
    | "UPDATING"
    | "DELETING"
    | "DELETED"
    | "FAILED"
    | (string & {});
  /** The connection profile display name. */
  displayName?: string;
  /** A MySQL database connection profile. */
  mysql?: MySqlConnectionProfile;
  /** A CloudSQL database connection profile. */
  cloudsql?: CloudSqlConnectionProfile;
  /** Output only. The error details in case of state FAILED. */
  error?: Status;
  /** The database provider. */
  provider?:
    | "DATABASE_PROVIDER_UNSPECIFIED"
    | "CLOUDSQL"
    | "RDS"
    | (string & {});
}

export const ConnectionProfile: Schema.Schema<ConnectionProfile> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      state: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      mysql: Schema.optional(MySqlConnectionProfile),
      cloudsql: Schema.optional(CloudSqlConnectionProfile),
      error: Schema.optional(Status),
      provider: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ConnectionProfile",
  }) as any as Schema.Schema<ConnectionProfile>;

export interface ListConnectionProfilesResponse {
  /** The response list of connection profiles. */
  connectionProfiles?: Array<ConnectionProfile>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListConnectionProfilesResponse: Schema.Schema<ListConnectionProfilesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      connectionProfiles: Schema.optional(Schema.Array(ConnectionProfile)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListConnectionProfilesResponse",
  }) as any as Schema.Schema<ListConnectionProfilesResponse>;

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

export interface AuditLogConfig {
  /** The log type that this config enables. */
  logType?:
    | "LOG_TYPE_UNSPECIFIED"
    | "ADMIN_READ"
    | "DATA_WRITE"
    | "DATA_READ"
    | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      logType: Schema.optional(Schema.String),
      exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
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

export const AuditConfig: Schema.Schema<AuditConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      service: Schema.optional(Schema.String),
      auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
    }),
  ).annotate({
    identifier: "AuditConfig",
  }) as any as Schema.Schema<AuditConfig>;

export interface Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.Number),
      bindings: Schema.optional(Schema.Array(Binding)),
      auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      policy: Schema.optional(Policy),
      updateMask: Schema.optional(Schema.String),
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

export interface GoogleCloudClouddmsV1beta1OperationMetadata {
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
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudClouddmsV1beta1OperationMetadata: Schema.Schema<GoogleCloudClouddmsV1beta1OperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      verb: Schema.optional(Schema.String),
      statusMessage: Schema.optional(Schema.String),
      requestedCancellation: Schema.optional(Schema.Boolean),
      apiVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudClouddmsV1beta1OperationMetadata",
  }) as any as Schema.Schema<GoogleCloudClouddmsV1beta1OperationMetadata>;

export interface MigrationJobVerificationError {
  /** Output only. An instance of ErrorCode specifying the error that occurred. */
  errorCode?:
    | "ERROR_CODE_UNSPECIFIED"
    | "CONNECTION_FAILURE"
    | "AUTHENTICATION_FAILURE"
    | "INVALID_CONNECTION_PROFILE_CONFIG"
    | "VERSION_INCOMPATIBILITY"
    | "CONNECTION_PROFILE_TYPES_INCOMPATIBILITY"
    | "UNSUPPORTED_GTID_MODE"
    | "UNSUPPORTED_DEFINER"
    | "CANT_RESTART_RUNNING_MIGRATION"
    | "TABLES_WITH_LIMITED_SUPPORT"
    | "UNSUPPORTED_DATABASE_LOCALE"
    | "UNSUPPORTED_DATABASE_FDW_CONFIG"
    | "ERROR_RDBMS"
    | "SOURCE_SIZE_EXCEEDS_THRESHOLD"
    | "EXISTING_CONFLICTING_DATABASES"
    | "PARALLEL_IMPORT_INSUFFICIENT_PRIVILEGE"
    | "EXISTING_DATA"
    | "SOURCE_MAX_SUBSCRIPTIONS"
    | (string & {});
  /** Output only. A formatted message with further details about the error and a CTA. */
  errorMessage?: string;
  /** Output only. A specific detailed error message, if supplied by the engine. */
  errorDetailMessage?: string;
}

export const MigrationJobVerificationError: Schema.Schema<MigrationJobVerificationError> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      errorCode: Schema.optional(Schema.String),
      errorMessage: Schema.optional(Schema.String),
      errorDetailMessage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MigrationJobVerificationError",
  }) as any as Schema.Schema<MigrationJobVerificationError>;

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

export interface FieldViolation {
  /** A path that leads to a field in the request body. The value will be a sequence of dot-separated identifiers that identify a protocol buffer field. Consider the following: message CreateContactRequest { message EmailAddress { enum Type { TYPE_UNSPECIFIED = 0; HOME = 1; WORK = 2; } optional string email = 1; repeated EmailType type = 2; } string full_name = 1; repeated EmailAddress email_addresses = 2; } In this example, in proto `field` could take one of the following values: * `full_name` for a violation in the `full_name` value * `email_addresses[1].email` for a violation in the `email` field of the first `email_addresses` message * `email_addresses[3].type[2]` for a violation in the second `type` value in the third `email_addresses` message. In JSON, the same values are represented as: * `fullName` for a violation in the `fullName` value * `emailAddresses[1].email` for a violation in the `email` field of the first `emailAddresses` message * `emailAddresses[3].type[2]` for a violation in the second `type` value in the third `emailAddresses` message. */
  field?: string;
  /** A description of why the request element is bad. */
  description?: string;
  /** The reason of the field-level error. This is a constant value that identifies the proximate cause of the field-level error. It should uniquely identify the type of the FieldViolation within the scope of the google.rpc.ErrorInfo.domain. This should be at most 63 characters and match a regular expression of `A-Z+[A-Z0-9]`, which represents UPPER_SNAKE_CASE. */
  reason?: string;
  /** Provides a localized error message for field-level errors that is safe to return to the API consumer. */
  localizedMessage?: LocalizedMessage;
}

export const FieldViolation: Schema.Schema<FieldViolation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      field: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      reason: Schema.optional(Schema.String),
      localizedMessage: Schema.optional(LocalizedMessage),
    }),
  ).annotate({
    identifier: "FieldViolation",
  }) as any as Schema.Schema<FieldViolation>;

export interface BadRequest {
  /** Describes all violations in a client request. */
  fieldViolations?: Array<FieldViolation>;
}

export const BadRequest: Schema.Schema<BadRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fieldViolations: Schema.optional(Schema.Array(FieldViolation)),
    }),
  ).annotate({ identifier: "BadRequest" }) as any as Schema.Schema<BadRequest>;

export interface DebugInfo {
  /** The stack trace entries indicating where the error occurred. */
  stackEntries?: Array<string>;
  /** Additional debugging information provided by the server. */
  detail?: string;
}

export const DebugInfo: Schema.Schema<DebugInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      stackEntries: Schema.optional(Schema.Array(Schema.String)),
      detail: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "DebugInfo" }) as any as Schema.Schema<DebugInfo>;

export interface ErrorInfo {
  /** The reason of the error. This is a constant value that identifies the proximate cause of the error. Error reasons are unique within a particular domain of errors. This should be at most 63 characters and match a regular expression of `A-Z+[A-Z0-9]`, which represents UPPER_SNAKE_CASE. */
  reason?: string;
  /** The logical grouping to which the "reason" belongs. The error domain is typically the registered service name of the tool or product that generates the error. Example: "pubsub.googleapis.com". If the error is generated by some common infrastructure, the error domain must be a globally unique value that identifies the infrastructure. For Google API infrastructure, the error domain is "googleapis.com". */
  domain?: string;
  /** Additional structured details about this error. Keys must match a regular expression of `a-z+` but should ideally be lowerCamelCase. Also, they must be limited to 64 characters in length. When identifying the current value of an exceeded limit, the units should be contained in the key, not the value. For example, rather than `{"instanceLimit": "100/request"}`, should be returned as, `{"instanceLimitPerRequest": "100"}`, if the client exceeds the number of instances that can be created in a single (batch) request. */
  metadata?: Record<string, string>;
}

export const ErrorInfo: Schema.Schema<ErrorInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reason: Schema.optional(Schema.String),
      domain: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({ identifier: "ErrorInfo" }) as any as Schema.Schema<ErrorInfo>;

export interface Link {
  /** Describes what the link offers. */
  description?: string;
  /** The URL of the link. */
  url?: string;
}

export const Link: Schema.Schema<Link> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Link" }) as any as Schema.Schema<Link>;

export interface Help {
  /** URL(s) pointing to additional information on handling the current error. */
  links?: Array<Link>;
}

export const Help: Schema.Schema<Help> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      links: Schema.optional(Schema.Array(Link)),
    }),
  ).annotate({ identifier: "Help" }) as any as Schema.Schema<Help>;

export interface PreconditionFailureViolation {
  /** The type of PreconditionFailure. We recommend using a service-specific enum type to define the supported precondition violation subjects. For example, "TOS" for "Terms of Service violation". */
  type?: string;
  /** The subject, relative to the type, that failed. For example, "google.com/cloud" relative to the "TOS" type would indicate which terms of service is being referenced. */
  subject?: string;
  /** A description of how the precondition failed. Developers can use this description to understand how to fix the failure. For example: "Terms of service not accepted". */
  description?: string;
}

export const PreconditionFailureViolation: Schema.Schema<PreconditionFailureViolation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      subject: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PreconditionFailureViolation",
  }) as any as Schema.Schema<PreconditionFailureViolation>;

export interface PreconditionFailure {
  /** Describes all precondition violations. */
  violations?: Array<PreconditionFailureViolation>;
}

export const PreconditionFailure: Schema.Schema<PreconditionFailure> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      violations: Schema.optional(Schema.Array(PreconditionFailureViolation)),
    }),
  ).annotate({
    identifier: "PreconditionFailure",
  }) as any as Schema.Schema<PreconditionFailure>;

export interface QuotaFailureViolation {
  /** The subject on which the quota check failed. For example, "clientip:" or "project:". */
  subject?: string;
  /** A description of how the quota check failed. Clients can use this description to find more about the quota configuration in the service's public documentation, or find the relevant quota limit to adjust through developer console. For example: "Service disabled" or "Daily Limit for read operations exceeded". */
  description?: string;
  /** The API Service from which the `QuotaFailure.Violation` orginates. In some cases, Quota issues originate from an API Service other than the one that was called. In other words, a dependency of the called API Service could be the cause of the `QuotaFailure`, and this field would have the dependency API service name. For example, if the called API is Kubernetes Engine API (container.googleapis.com), and a quota violation occurs in the Kubernetes Engine API itself, this field would be "container.googleapis.com". On the other hand, if the quota violation occurs when the Kubernetes Engine API creates VMs in the Compute Engine API (compute.googleapis.com), this field would be "compute.googleapis.com". */
  apiService?: string;
  /** The metric of the violated quota. A quota metric is a named counter to measure usage, such as API requests or CPUs. When an activity occurs in a service, such as Virtual Machine allocation, one or more quota metrics may be affected. For example, "compute.googleapis.com/cpus_per_vm_family", "storage.googleapis.com/internet_egress_bandwidth". */
  quotaMetric?: string;
  /** The id of the violated quota. Also know as "limit name", this is the unique identifier of a quota in the context of an API service. For example, "CPUS-PER-VM-FAMILY-per-project-region". */
  quotaId?: string;
  /** The dimensions of the violated quota. Every non-global quota is enforced on a set of dimensions. While quota metric defines what to count, the dimensions specify for what aspects the counter should be increased. For example, the quota "CPUs per region per VM family" enforces a limit on the metric "compute.googleapis.com/cpus_per_vm_family" on dimensions "region" and "vm_family". And if the violation occurred in region "us-central1" and for VM family "n1", the quota_dimensions would be, { "region": "us-central1", "vm_family": "n1", } When a quota is enforced globally, the quota_dimensions would always be empty. */
  quotaDimensions?: Record<string, string>;
  /** The enforced quota value at the time of the `QuotaFailure`. For example, if the enforced quota value at the time of the `QuotaFailure` on the number of CPUs is "10", then the value of this field would reflect this quantity. */
  quotaValue?: string;
  /** The new quota value being rolled out at the time of the violation. At the completion of the rollout, this value will be enforced in place of quota_value. If no rollout is in progress at the time of the violation, this field is not set. For example, if at the time of the violation a rollout is in progress changing the number of CPUs quota from 10 to 20, 20 would be the value of this field. */
  futureQuotaValue?: string;
}

export const QuotaFailureViolation: Schema.Schema<QuotaFailureViolation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      subject: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      apiService: Schema.optional(Schema.String),
      quotaMetric: Schema.optional(Schema.String),
      quotaId: Schema.optional(Schema.String),
      quotaDimensions: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      quotaValue: Schema.optional(Schema.String),
      futureQuotaValue: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "QuotaFailureViolation",
  }) as any as Schema.Schema<QuotaFailureViolation>;

export interface QuotaFailure {
  /** Describes all quota violations. */
  violations?: Array<QuotaFailureViolation>;
}

export const QuotaFailure: Schema.Schema<QuotaFailure> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      violations: Schema.optional(Schema.Array(QuotaFailureViolation)),
    }),
  ).annotate({
    identifier: "QuotaFailure",
  }) as any as Schema.Schema<QuotaFailure>;

export interface RequestInfo {
  /** An opaque string that should only be interpreted by the service generating it. For example, it can be used to identify requests in the service's logs. */
  requestId?: string;
  /** Any data that was used to serve this request. For example, an encrypted stack trace that can be sent back to the service provider for debugging. */
  servingData?: string;
}

export const RequestInfo: Schema.Schema<RequestInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requestId: Schema.optional(Schema.String),
      servingData: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RequestInfo",
  }) as any as Schema.Schema<RequestInfo>;

export interface ResourceInfo {
  /** A name for the type of resource being accessed, e.g. "sql table", "cloud storage bucket", "file", "Google calendar"; or the type URL of the resource: e.g. "type.googleapis.com/google.pubsub.v1.Topic". */
  resourceType?: string;
  /** The name of the resource being accessed. For example, a shared calendar name: "example.com_4fghdhgsrgh@group.calendar.google.com", if the current error is google.rpc.Code.PERMISSION_DENIED. */
  resourceName?: string;
  /** The owner of the resource (optional). For example, "user:" or "project:". */
  owner?: string;
  /** Describes what error is encountered when accessing this resource. For example, updating a cloud project may require the `writer` permission on the developer console project. */
  description?: string;
}

export const ResourceInfo: Schema.Schema<ResourceInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceType: Schema.optional(Schema.String),
      resourceName: Schema.optional(Schema.String),
      owner: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ResourceInfo",
  }) as any as Schema.Schema<ResourceInfo>;

export interface RetryInfo {
  /** Clients should wait at least this long between retrying the same request. */
  retryDelay?: string;
}

export const RetryInfo: Schema.Schema<RetryInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      retryDelay: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "RetryInfo" }) as any as Schema.Schema<RetryInfo>;

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
    T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations" }),
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
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}",
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
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/operations",
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
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
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
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
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
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel",
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

export interface ListProjectsLocationsMigrationJobsRequest {
  /** Required. The parent, which owns this collection of migrationJobs. */
  parent: string;
  /** The maximum number of migration jobs to return. The service may return fewer than this value. If unspecified, at most 50 migration jobs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** The nextPageToken value received in the previous call to migrationJobs.list, used in the subsequent request to retrieve the next page of results. On first call this should be left blank. When paginating, all other parameters provided to migrationJobs.list must match the call that provided the page token. */
  pageToken?: string;
  /** A filter expression that filters migration jobs listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either =, !=, >, or <. For example, list migration jobs created this year by specifying **createTime %gt; 2020-01-01T00:00:00.000000000Z.** You can also filter nested fields. For example, you could specify **reverseSshConnectivity.vmIp = "1.2.3.4"** to select all migration jobs connecting through the specific SSH tunnel bastion. */
  filter?: string;
  /** Sort the results based on the migration job name. Valid values are: "name", "name asc", and "name desc". */
  orderBy?: string;
}

export const ListProjectsLocationsMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/migrationJobs",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsMigrationJobsRequest>;

export type ListProjectsLocationsMigrationJobsResponse =
  ListMigrationJobsResponse;
export const ListProjectsLocationsMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListMigrationJobsResponse;

export type ListProjectsLocationsMigrationJobsError = DefaultErrors;

/** Lists migration jobs in a given project and location. */
export const listProjectsLocationsMigrationJobs: API.PaginatedOperationMethod<
  ListProjectsLocationsMigrationJobsRequest,
  ListProjectsLocationsMigrationJobsResponse,
  ListProjectsLocationsMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsMigrationJobsRequest,
  output: ListProjectsLocationsMigrationJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsMigrationJobsRequest {
  /** Required. Name of the migration job resource to get. */
  name: string;
}

export const GetProjectsLocationsMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsMigrationJobsRequest>;

export type GetProjectsLocationsMigrationJobsResponse = MigrationJob;
export const GetProjectsLocationsMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ MigrationJob;

export type GetProjectsLocationsMigrationJobsError = DefaultErrors;

/** Gets details of a single migration job. */
export const getProjectsLocationsMigrationJobs: API.OperationMethod<
  GetProjectsLocationsMigrationJobsRequest,
  GetProjectsLocationsMigrationJobsResponse,
  GetProjectsLocationsMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsMigrationJobsRequest,
  output: GetProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsMigrationJobsRequest {
  /** Required. The parent, which owns this collection of migration jobs. */
  parent: string;
  /** Required. The ID of the instance to create. */
  migrationJobId?: string;
  /** A unique id used to identify the request. If the server receives two requests with the same id, then the second request will be ignored. It is recommended to always set this value to a UUID. The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Request body */
  body?: MigrationJob;
}

export const CreateProjectsLocationsMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    migrationJobId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("migrationJobId"),
    ),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(MigrationJob).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/migrationJobs",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsMigrationJobsRequest>;

export type CreateProjectsLocationsMigrationJobsResponse = Operation;
export const CreateProjectsLocationsMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsMigrationJobsError = DefaultErrors;

/** Creates a new migration job in a given project and location. */
export const createProjectsLocationsMigrationJobs: API.OperationMethod<
  CreateProjectsLocationsMigrationJobsRequest,
  CreateProjectsLocationsMigrationJobsResponse,
  CreateProjectsLocationsMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsMigrationJobsRequest,
  output: CreateProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsMigrationJobsRequest {
  /** The name (URI) of this migration job resource, in the form of: projects/{project}/locations/{location}/migrationJobs/{migrationJob}. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the migration job resource by the update. */
  updateMask?: string;
  /** A unique id used to identify the request. If the server receives two requests with the same id, then the second request will be ignored. It is recommended to always set this value to a UUID. The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Request body */
  body?: MigrationJob;
}

export const PatchProjectsLocationsMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(MigrationJob).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsMigrationJobsRequest>;

export type PatchProjectsLocationsMigrationJobsResponse = Operation;
export const PatchProjectsLocationsMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsMigrationJobsError = DefaultErrors;

/** Updates the parameters of a single migration job. */
export const patchProjectsLocationsMigrationJobs: API.OperationMethod<
  PatchProjectsLocationsMigrationJobsRequest,
  PatchProjectsLocationsMigrationJobsResponse,
  PatchProjectsLocationsMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsMigrationJobsRequest,
  output: PatchProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsMigrationJobsRequest {
  /** Required. Name of the migration job resource to delete. */
  name: string;
  /** A unique id used to identify the request. If the server receives two requests with the same id, then the second request will be ignored. It is recommended to always set this value to a UUID. The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** The destination CloudSQL connection profile is always deleted with the migration job. In case of force delete, the destination CloudSQL replica database is also deleted. */
  force?: boolean;
}

export const DeleteProjectsLocationsMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsMigrationJobsRequest>;

export type DeleteProjectsLocationsMigrationJobsResponse = Operation;
export const DeleteProjectsLocationsMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsMigrationJobsError = DefaultErrors;

/** Deletes a single migration job. */
export const deleteProjectsLocationsMigrationJobs: API.OperationMethod<
  DeleteProjectsLocationsMigrationJobsRequest,
  DeleteProjectsLocationsMigrationJobsResponse,
  DeleteProjectsLocationsMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsMigrationJobsRequest,
  output: DeleteProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

export interface StartProjectsLocationsMigrationJobsRequest {
  /** Name of the migration job resource to start. */
  name: string;
  /** Request body */
  body?: StartMigrationJobRequest;
}

export const StartProjectsLocationsMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(StartMigrationJobRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:start",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<StartProjectsLocationsMigrationJobsRequest>;

export type StartProjectsLocationsMigrationJobsResponse = Operation;
export const StartProjectsLocationsMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type StartProjectsLocationsMigrationJobsError = DefaultErrors;

/** Start an already created migration job. */
export const startProjectsLocationsMigrationJobs: API.OperationMethod<
  StartProjectsLocationsMigrationJobsRequest,
  StartProjectsLocationsMigrationJobsResponse,
  StartProjectsLocationsMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartProjectsLocationsMigrationJobsRequest,
  output: StartProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

export interface StopProjectsLocationsMigrationJobsRequest {
  /** Name of the migration job resource to stop. */
  name: string;
  /** Request body */
  body?: StopMigrationJobRequest;
}

export const StopProjectsLocationsMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(StopMigrationJobRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:stop",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<StopProjectsLocationsMigrationJobsRequest>;

export type StopProjectsLocationsMigrationJobsResponse = Operation;
export const StopProjectsLocationsMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type StopProjectsLocationsMigrationJobsError = DefaultErrors;

/** Stops a running migration job. */
export const stopProjectsLocationsMigrationJobs: API.OperationMethod<
  StopProjectsLocationsMigrationJobsRequest,
  StopProjectsLocationsMigrationJobsResponse,
  StopProjectsLocationsMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopProjectsLocationsMigrationJobsRequest,
  output: StopProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

export interface ResumeProjectsLocationsMigrationJobsRequest {
  /** Name of the migration job resource to resume. */
  name: string;
  /** Request body */
  body?: ResumeMigrationJobRequest;
}

export const ResumeProjectsLocationsMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(ResumeMigrationJobRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:resume",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ResumeProjectsLocationsMigrationJobsRequest>;

export type ResumeProjectsLocationsMigrationJobsResponse = Operation;
export const ResumeProjectsLocationsMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type ResumeProjectsLocationsMigrationJobsError = DefaultErrors;

/** Resume a migration job that is currently stopped and is resumable (was stopped during CDC phase). */
export const resumeProjectsLocationsMigrationJobs: API.OperationMethod<
  ResumeProjectsLocationsMigrationJobsRequest,
  ResumeProjectsLocationsMigrationJobsResponse,
  ResumeProjectsLocationsMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ResumeProjectsLocationsMigrationJobsRequest,
  output: ResumeProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

export interface PromoteProjectsLocationsMigrationJobsRequest {
  /** Name of the migration job resource to promote. */
  name: string;
  /** Request body */
  body?: PromoteMigrationJobRequest;
}

export const PromoteProjectsLocationsMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(PromoteMigrationJobRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:promote",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PromoteProjectsLocationsMigrationJobsRequest>;

export type PromoteProjectsLocationsMigrationJobsResponse = Operation;
export const PromoteProjectsLocationsMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PromoteProjectsLocationsMigrationJobsError = DefaultErrors;

/** Promote a migration job, stopping replication to the destination and promoting the destination to be a standalone database. */
export const promoteProjectsLocationsMigrationJobs: API.OperationMethod<
  PromoteProjectsLocationsMigrationJobsRequest,
  PromoteProjectsLocationsMigrationJobsResponse,
  PromoteProjectsLocationsMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PromoteProjectsLocationsMigrationJobsRequest,
  output: PromoteProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

export interface VerifyProjectsLocationsMigrationJobsRequest {
  /** Name of the migration job resource to verify. */
  name: string;
  /** Request body */
  body?: VerifyMigrationJobRequest;
}

export const VerifyProjectsLocationsMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(VerifyMigrationJobRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:verify",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<VerifyProjectsLocationsMigrationJobsRequest>;

export type VerifyProjectsLocationsMigrationJobsResponse = Operation;
export const VerifyProjectsLocationsMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type VerifyProjectsLocationsMigrationJobsError = DefaultErrors;

/** Verify a migration job, making sure the destination can reach the source and that all configuration and prerequisites are met. */
export const verifyProjectsLocationsMigrationJobs: API.OperationMethod<
  VerifyProjectsLocationsMigrationJobsRequest,
  VerifyProjectsLocationsMigrationJobsResponse,
  VerifyProjectsLocationsMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: VerifyProjectsLocationsMigrationJobsRequest,
  output: VerifyProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

export interface RestartProjectsLocationsMigrationJobsRequest {
  /** Name of the migration job resource to restart. */
  name: string;
  /** Request body */
  body?: RestartMigrationJobRequest;
}

export const RestartProjectsLocationsMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(RestartMigrationJobRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:restart",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RestartProjectsLocationsMigrationJobsRequest>;

export type RestartProjectsLocationsMigrationJobsResponse = Operation;
export const RestartProjectsLocationsMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type RestartProjectsLocationsMigrationJobsError = DefaultErrors;

/** Restart a stopped or failed migration job, resetting the destination instance to its original state and starting the migration process from scratch. */
export const restartProjectsLocationsMigrationJobs: API.OperationMethod<
  RestartProjectsLocationsMigrationJobsRequest,
  RestartProjectsLocationsMigrationJobsResponse,
  RestartProjectsLocationsMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RestartProjectsLocationsMigrationJobsRequest,
  output: RestartProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

export interface GenerateSshScriptProjectsLocationsMigrationJobsRequest {
  /** Name of the migration job resource to generate the SSH script. */
  migrationJob: string;
  /** Request body */
  body?: GenerateSshScriptRequest;
}

export const GenerateSshScriptProjectsLocationsMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    migrationJob: Schema.String.pipe(T.HttpPath("migrationJob")),
    body: Schema.optional(GenerateSshScriptRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:generateSshScript",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GenerateSshScriptProjectsLocationsMigrationJobsRequest>;

export type GenerateSshScriptProjectsLocationsMigrationJobsResponse = SshScript;
export const GenerateSshScriptProjectsLocationsMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SshScript;

export type GenerateSshScriptProjectsLocationsMigrationJobsError =
  DefaultErrors;

/** Generate a SSH configuration script to configure the reverse SSH connectivity. */
export const generateSshScriptProjectsLocationsMigrationJobs: API.OperationMethod<
  GenerateSshScriptProjectsLocationsMigrationJobsRequest,
  GenerateSshScriptProjectsLocationsMigrationJobsResponse,
  GenerateSshScriptProjectsLocationsMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GenerateSshScriptProjectsLocationsMigrationJobsRequest,
  output: GenerateSshScriptProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsMigrationJobsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsMigrationJobsRequest>;

export type SetIamPolicyProjectsLocationsMigrationJobsResponse = Policy;
export const SetIamPolicyProjectsLocationsMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsLocationsMigrationJobsError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsMigrationJobs: API.OperationMethod<
  SetIamPolicyProjectsLocationsMigrationJobsRequest,
  SetIamPolicyProjectsLocationsMigrationJobsResponse,
  SetIamPolicyProjectsLocationsMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsLocationsMigrationJobsRequest,
  output: SetIamPolicyProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsMigrationJobsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsMigrationJobsRequest>;

export type GetIamPolicyProjectsLocationsMigrationJobsResponse = Policy;
export const GetIamPolicyProjectsLocationsMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsLocationsMigrationJobsError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsMigrationJobs: API.OperationMethod<
  GetIamPolicyProjectsLocationsMigrationJobsRequest,
  GetIamPolicyProjectsLocationsMigrationJobsResponse,
  GetIamPolicyProjectsLocationsMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsLocationsMigrationJobsRequest,
  output: GetIamPolicyProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsMigrationJobsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsMigrationJobsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/migrationJobs/{migrationJobsId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsMigrationJobsRequest>;

export type TestIamPermissionsProjectsLocationsMigrationJobsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsMigrationJobsResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsMigrationJobsError =
  DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsMigrationJobs: API.OperationMethod<
  TestIamPermissionsProjectsLocationsMigrationJobsRequest,
  TestIamPermissionsProjectsLocationsMigrationJobsResponse,
  TestIamPermissionsProjectsLocationsMigrationJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsLocationsMigrationJobsRequest,
  output: TestIamPermissionsProjectsLocationsMigrationJobsResponse,
  errors: [],
}));

export interface ListProjectsLocationsConnectionProfilesRequest {
  /** Required. The parent, which owns this collection of connection profiles. */
  parent: string;
  /** The maximum number of connection profiles to return. The service may return fewer than this value. If unspecified, at most 50 connection profiles will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListConnectionProfiles` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListConnectionProfiles` must match the call that provided the page token. */
  pageToken?: string;
  /** A filter expression that filters connection profiles listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be either =, !=, >, or <. For example, list connection profiles created this year by specifying **createTime %gt; 2020-01-01T00:00:00.000000000Z**. You can also filter nested fields. For example, you could specify **mySql.username = %lt;my_username%gt;** to list all connection profiles configured to connect with a specific username. */
  filter?: string;
  /** the order by fields for the result. */
  orderBy?: string;
}

export const ListProjectsLocationsConnectionProfilesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/connectionProfiles",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsConnectionProfilesRequest>;

export type ListProjectsLocationsConnectionProfilesResponse =
  ListConnectionProfilesResponse;
export const ListProjectsLocationsConnectionProfilesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListConnectionProfilesResponse;

export type ListProjectsLocationsConnectionProfilesError = DefaultErrors;

/** Retrieve a list of all connection profiles in a given project and location. */
export const listProjectsLocationsConnectionProfiles: API.PaginatedOperationMethod<
  ListProjectsLocationsConnectionProfilesRequest,
  ListProjectsLocationsConnectionProfilesResponse,
  ListProjectsLocationsConnectionProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsConnectionProfilesRequest,
  output: ListProjectsLocationsConnectionProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsConnectionProfilesRequest {
  /** Required. Name of the connection profile resource to get. */
  name: string;
}

export const GetProjectsLocationsConnectionProfilesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/connectionProfiles/{connectionProfilesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsConnectionProfilesRequest>;

export type GetProjectsLocationsConnectionProfilesResponse = ConnectionProfile;
export const GetProjectsLocationsConnectionProfilesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ConnectionProfile;

export type GetProjectsLocationsConnectionProfilesError = DefaultErrors;

/** Gets details of a single connection profile. */
export const getProjectsLocationsConnectionProfiles: API.OperationMethod<
  GetProjectsLocationsConnectionProfilesRequest,
  GetProjectsLocationsConnectionProfilesResponse,
  GetProjectsLocationsConnectionProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsConnectionProfilesRequest,
  output: GetProjectsLocationsConnectionProfilesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsConnectionProfilesRequest {
  /** Required. The parent, which owns this collection of connection profiles. */
  parent: string;
  /** Required. The connection profile identifier. */
  connectionProfileId?: string;
  /** A unique id used to identify the request. If the server receives two requests with the same id, then the second request will be ignored. It is recommended to always set this value to a UUID. The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Request body */
  body?: ConnectionProfile;
}

export const CreateProjectsLocationsConnectionProfilesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    connectionProfileId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("connectionProfileId"),
    ),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(ConnectionProfile).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/connectionProfiles",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsConnectionProfilesRequest>;

export type CreateProjectsLocationsConnectionProfilesResponse = Operation;
export const CreateProjectsLocationsConnectionProfilesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsConnectionProfilesError = DefaultErrors;

/** Creates a new connection profile in a given project and location. */
export const createProjectsLocationsConnectionProfiles: API.OperationMethod<
  CreateProjectsLocationsConnectionProfilesRequest,
  CreateProjectsLocationsConnectionProfilesResponse,
  CreateProjectsLocationsConnectionProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsConnectionProfilesRequest,
  output: CreateProjectsLocationsConnectionProfilesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsConnectionProfilesRequest {
  /** The name of this connection profile resource in the form of projects/{project}/locations/{location}/connectionProfiles/{connectionProfile}. */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the connection profile resource by the update. */
  updateMask?: string;
  /** A unique id used to identify the request. If the server receives two requests with the same id, then the second request will be ignored. It is recommended to always set this value to a UUID. The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** Request body */
  body?: ConnectionProfile;
}

export const PatchProjectsLocationsConnectionProfilesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(ConnectionProfile).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/connectionProfiles/{connectionProfilesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsConnectionProfilesRequest>;

export type PatchProjectsLocationsConnectionProfilesResponse = Operation;
export const PatchProjectsLocationsConnectionProfilesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsConnectionProfilesError = DefaultErrors;

/** Update the configuration of a single connection profile. */
export const patchProjectsLocationsConnectionProfiles: API.OperationMethod<
  PatchProjectsLocationsConnectionProfilesRequest,
  PatchProjectsLocationsConnectionProfilesResponse,
  PatchProjectsLocationsConnectionProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsConnectionProfilesRequest,
  output: PatchProjectsLocationsConnectionProfilesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsConnectionProfilesRequest {
  /** Required. Name of the connection profile resource to delete. */
  name: string;
  /** A unique id used to identify the request. If the server receives two requests with the same id, then the second request will be ignored. It is recommended to always set this value to a UUID. The id must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters. */
  requestId?: string;
  /** In case of force delete, the CloudSQL replica database is also deleted (only for CloudSQL connection profile). */
  force?: boolean;
}

export const DeleteProjectsLocationsConnectionProfilesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/connectionProfiles/{connectionProfilesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsConnectionProfilesRequest>;

export type DeleteProjectsLocationsConnectionProfilesResponse = Operation;
export const DeleteProjectsLocationsConnectionProfilesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsConnectionProfilesError = DefaultErrors;

/** Deletes a single Database Migration Service connection profile. A connection profile can only be deleted if it is not in use by any active migration jobs. */
export const deleteProjectsLocationsConnectionProfiles: API.OperationMethod<
  DeleteProjectsLocationsConnectionProfilesRequest,
  DeleteProjectsLocationsConnectionProfilesResponse,
  DeleteProjectsLocationsConnectionProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsConnectionProfilesRequest,
  output: DeleteProjectsLocationsConnectionProfilesResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsConnectionProfilesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsConnectionProfilesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/connectionProfiles/{connectionProfilesId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsConnectionProfilesRequest>;

export type SetIamPolicyProjectsLocationsConnectionProfilesResponse = Policy;
export const SetIamPolicyProjectsLocationsConnectionProfilesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsLocationsConnectionProfilesError =
  DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsLocationsConnectionProfiles: API.OperationMethod<
  SetIamPolicyProjectsLocationsConnectionProfilesRequest,
  SetIamPolicyProjectsLocationsConnectionProfilesResponse,
  SetIamPolicyProjectsLocationsConnectionProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsLocationsConnectionProfilesRequest,
  output: SetIamPolicyProjectsLocationsConnectionProfilesResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsConnectionProfilesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsConnectionProfilesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/connectionProfiles/{connectionProfilesId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsConnectionProfilesRequest>;

export type GetIamPolicyProjectsLocationsConnectionProfilesResponse = Policy;
export const GetIamPolicyProjectsLocationsConnectionProfilesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsLocationsConnectionProfilesError =
  DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsConnectionProfiles: API.OperationMethod<
  GetIamPolicyProjectsLocationsConnectionProfilesRequest,
  GetIamPolicyProjectsLocationsConnectionProfilesResponse,
  GetIamPolicyProjectsLocationsConnectionProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsLocationsConnectionProfilesRequest,
  output: GetIamPolicyProjectsLocationsConnectionProfilesResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsConnectionProfilesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsConnectionProfilesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/connectionProfiles/{connectionProfilesId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsConnectionProfilesRequest>;

export type TestIamPermissionsProjectsLocationsConnectionProfilesResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsConnectionProfilesResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsConnectionProfilesError =
  DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsLocationsConnectionProfiles: API.OperationMethod<
  TestIamPermissionsProjectsLocationsConnectionProfilesRequest,
  TestIamPermissionsProjectsLocationsConnectionProfilesResponse,
  TestIamPermissionsProjectsLocationsConnectionProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsLocationsConnectionProfilesRequest,
  output: TestIamPermissionsProjectsLocationsConnectionProfilesResponse,
  errors: [],
}));
