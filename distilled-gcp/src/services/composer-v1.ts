// ==========================================================================
// Cloud Composer API (composer v1)
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
  name: "composer",
  version: "v1",
  rootUrl: "https://composer.googleapis.com/",
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

export interface CloudDataLineageIntegration {
  /** Optional. Whether or not Cloud Data Lineage integration is enabled. */
  enabled?: boolean;
}

export const CloudDataLineageIntegration: Schema.Schema<CloudDataLineageIntegration> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CloudDataLineageIntegration" }) as any as Schema.Schema<CloudDataLineageIntegration>;

export interface SoftwareConfig {
  /** Optional. The version of the software running in the environment. This encapsulates both the version of Cloud Composer functionality and the version of Apache Airflow. It must match the regular expression `composer-([0-9]+(\.[0-9]+\.[0-9]+(-preview\.[0-9]+)?)?|latest)-airflow-([0-9]+(\.[0-9]+(\.[0-9]+)?)?)`. When used as input, the server also checks if the provided version is supported and denies the request for an unsupported version. The Cloud Composer portion of the image version is a full [semantic version](https://semver.org), or an alias in the form of major version number or `latest`. When an alias is provided, the server replaces it with the current Cloud Composer version that satisfies the alias. The Apache Airflow portion of the image version is a full semantic version that points to one of the supported Apache Airflow versions, or an alias in the form of only major or major.minor versions specified. When an alias is provided, the server replaces it with the latest Apache Airflow version that satisfies the alias and is supported in the given Cloud Composer version. In all cases, the resolved image version is stored in the same field. See also [version list](/composer/docs/concepts/versioning/composer-versions) and [versioning overview](/composer/docs/concepts/versioning/composer-versioning-overview). */
  imageVersion?: string;
  /** Optional. Apache Airflow configuration properties to override. Property keys contain the section and property names, separated by a hyphen, for example "core-dags_are_paused_at_creation". Section names must not contain hyphens ("-"), opening square brackets ("["), or closing square brackets ("]"). The property name must not be empty and must not contain an equals sign ("=") or semicolon (";"). Section and property names must not contain a period ("."). Apache Airflow configuration property names must be written in [snake_case](https://en.wikipedia.org/wiki/Snake_case). Property values can contain any character, and can be written in any lower/upper case format. Certain Apache Airflow configuration property values are [blocked](/composer/docs/concepts/airflow-configurations), and cannot be overridden. */
  airflowConfigOverrides?: Record<string, string>;
  /** Optional. Custom Python Package Index (PyPI) packages to be installed in the environment. Keys refer to the lowercase package name such as "numpy" and values are the lowercase extras and version specifier such as "==1.12.0", "[devel,gcp_api]", or "[devel]>=1.8.2, <1.9.2". To specify a package without pinning it to a version specifier, use the empty string as the value. */
  pypiPackages?: Record<string, string>;
  /** Optional. Additional environment variables to provide to the Apache Airflow scheduler, worker, and webserver processes. Environment variable names must match the regular expression `a-zA-Z_*`. They cannot specify Apache Airflow software configuration overrides (they cannot match the regular expression `AIRFLOW__[A-Z0-9_]+__[A-Z0-9_]+`), and they cannot match any of the following reserved names: * `AIRFLOW_HOME` * `C_FORCE_ROOT` * `CONTAINER_NAME` * `DAGS_FOLDER` * `GCP_PROJECT` * `GCS_BUCKET` * `GKE_CLUSTER_NAME` * `SQL_DATABASE` * `SQL_INSTANCE` * `SQL_PASSWORD` * `SQL_PROJECT` * `SQL_REGION` * `SQL_USER` */
  envVariables?: Record<string, string>;
  /** Optional. The major version of Python used to run the Apache Airflow scheduler, worker, and webserver processes. Can be set to '2' or '3'. If not specified, the default is '3'. Cannot be updated. This field is only supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*. Environments in newer versions always use Python major version 3. */
  pythonVersion?: string;
  /** Optional. The number of schedulers for Airflow. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-2.*.*. */
  schedulerCount?: number;
  /** Optional. The configuration for Cloud Data Lineage integration. */
  cloudDataLineageIntegration?: CloudDataLineageIntegration;
  /** Optional. Whether or not the web server uses custom plugins. If unspecified, the field defaults to `PLUGINS_ENABLED`. This field is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer. */
  webServerPluginsMode?: "WEB_SERVER_PLUGINS_MODE_UNSPECIFIED" | "PLUGINS_DISABLED" | "PLUGINS_ENABLED" | (string & {});
}

export const SoftwareConfig: Schema.Schema<SoftwareConfig> = Schema.suspend(() => Schema.Struct({
  imageVersion: Schema.optional(Schema.String),
  airflowConfigOverrides: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  pypiPackages: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  envVariables: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  pythonVersion: Schema.optional(Schema.String),
  schedulerCount: Schema.optional(Schema.Number),
  cloudDataLineageIntegration: Schema.optional(CloudDataLineageIntegration),
  webServerPluginsMode: Schema.optional(Schema.String),
})).annotate({ identifier: "SoftwareConfig" }) as any as Schema.Schema<SoftwareConfig>;

export interface IPAllocationPolicy {
  /** Optional. Whether or not to enable Alias IPs in the GKE cluster. If `true`, a VPC-native cluster is created. This field is only supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*. Environments in newer versions always use VPC-native GKE clusters. */
  useIpAliases?: boolean;
  /** Optional. The name of the GKE cluster's secondary range used to allocate IP addresses to pods. For Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*, this field is applicable only when `use_ip_aliases` is true. */
  clusterSecondaryRangeName?: string;
  /** Optional. The IP address range used to allocate IP addresses to pods in the GKE cluster. For Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*, this field is applicable only when `use_ip_aliases` is true. Set to blank to have GKE choose a range with the default size. Set to /netmask (e.g. `/14`) to have GKE choose a range with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use. */
  clusterIpv4CidrBlock?: string;
  /** Optional. The name of the services' secondary range used to allocate IP addresses to the GKE cluster. For Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*, this field is applicable only when `use_ip_aliases` is true. */
  servicesSecondaryRangeName?: string;
  /** Optional. The IP address range of the services IP addresses in this GKE cluster. For Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*, this field is applicable only when `use_ip_aliases` is true. Set to blank to have GKE choose a range with the default size. Set to /netmask (e.g. `/14`) to have GKE choose a range with a specific netmask. Set to a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range to use. */
  servicesIpv4CidrBlock?: string;
}

export const IPAllocationPolicy: Schema.Schema<IPAllocationPolicy> = Schema.suspend(() => Schema.Struct({
  useIpAliases: Schema.optional(Schema.Boolean),
  clusterSecondaryRangeName: Schema.optional(Schema.String),
  clusterIpv4CidrBlock: Schema.optional(Schema.String),
  servicesSecondaryRangeName: Schema.optional(Schema.String),
  servicesIpv4CidrBlock: Schema.optional(Schema.String),
})).annotate({ identifier: "IPAllocationPolicy" }) as any as Schema.Schema<IPAllocationPolicy>;

export interface NodeConfig {
  /** Optional. The Compute Engine [zone](/compute/docs/regions-zones) in which to deploy the VMs used to run the Apache Airflow software, specified as a [relative resource name](/apis/design/resource_names#relative_resource_name). For example: "projects/{projectId}/zones/{zoneId}". This `location` must belong to the enclosing environment's project and location. If both this field and `nodeConfig.machineType` are specified, `nodeConfig.machineType` must belong to this `location`; if both are unspecified, the service will pick a zone in the Compute Engine region corresponding to the Cloud Composer location, and propagate that choice to both fields. If only one field (`location` or `nodeConfig.machineType`) is specified, the location information from the specified field will be propagated to the unspecified field. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*. */
  location?: string;
  /** Optional. The Compute Engine [machine type](/compute/docs/machine-types) used for cluster instances, specified as a [relative resource name](/apis/design/resource_names#relative_resource_name). For example: "projects/{projectId}/zones/{zoneId}/machineTypes/{machineTypeId}". The `machineType` must belong to the enclosing environment's project and location. If both this field and `nodeConfig.location` are specified, this `machineType` must belong to the `nodeConfig.location`; if both are unspecified, the service will pick a zone in the Compute Engine region corresponding to the Cloud Composer location, and propagate that choice to both fields. If exactly one of this field and `nodeConfig.location` is specified, the location information from the specified field will be propagated to the unspecified field. The `machineTypeId` must not be a [shared-core machine type](/compute/docs/machine-types#sharedcore). If this field is unspecified, the `machineTypeId` defaults to "n1-standard-1". This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*. */
  machineType?: string;
  /** Optional. The Compute Engine network to be used for machine communications, specified as a [relative resource name](/apis/design/resource_names#relative_resource_name). For example: "projects/{projectId}/global/networks/{networkId}". If unspecified, the "default" network ID in the environment's project is used. If a [Custom Subnet Network](/vpc/docs/vpc#vpc_networks_and_subnets) is provided, `nodeConfig.subnetwork` must also be provided. For [Shared VPC](/vpc/docs/shared-vpc) subnetwork requirements, see `nodeConfig.subnetwork`. */
  network?: string;
  /** Optional. The Compute Engine subnetwork to be used for machine communications, specified as a [relative resource name](/apis/design/resource_names#relative_resource_name). For example: "projects/{projectId}/regions/{regionId}/subnetworks/{subnetworkId}" If a subnetwork is provided, `nodeConfig.network` must also be provided, and the subnetwork must belong to the enclosing environment's project and location. */
  subnetwork?: string;
  /** Optional. The disk size in GB used for node VMs. Minimum size is 30GB. If unspecified, defaults to 100GB. Cannot be updated. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*. */
  diskSizeGb?: number;
  /** Optional. The set of Google API scopes to be made available on all node VMs. If `oauth_scopes` is empty, defaults to ["https://www.googleapis.com/auth/cloud-platform"]. Cannot be updated. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*. */
  oauthScopes?: Array<string>;
  /** Optional. The Google Cloud Platform Service Account to be used by the node VMs. If a service account is not specified, the "default" Compute Engine service account is used. Cannot be updated. */
  serviceAccount?: string;
  /** Optional. The list of instance tags applied to all node VMs. Tags are used to identify valid sources or targets for network firewalls. Each tag within the list must comply with [RFC1035](https://www.ietf.org/rfc/rfc1035.txt). Cannot be updated. */
  tags?: Array<string>;
  /** Optional. The configuration for controlling how IPs are allocated in the GKE cluster. */
  ipAllocationPolicy?: IPAllocationPolicy;
  /** Optional. Deploys 'ip-masq-agent' daemon set in the GKE cluster and defines nonMasqueradeCIDRs equals to pod IP range so IP masquerading is used for all destination addresses, except between pods traffic. See: https://cloud.google.com/kubernetes-engine/docs/how-to/ip-masquerade-agent */
  enableIpMasqAgent?: boolean;
  /** Optional. Network Attachment that Cloud Composer environment is connected to, which provides connectivity with a user's VPC network. Takes precedence over network and subnetwork settings. If not provided, but network and subnetwork are defined during environment, it will be provisioned. If not provided and network and subnetwork are also empty, then connectivity to user's VPC network is disabled. Network attachment must be provided in format projects/{project}/regions/{region}/networkAttachments/{networkAttachment}. This field is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer. */
  composerNetworkAttachment?: string;
  /** Optional. The IP range in CIDR notation to use internally by Cloud Composer. IP addresses are not reserved - and the same range can be used by multiple Cloud Composer environments. In case of overlap, IPs from this range will not be accessible in the user's VPC network. Cannot be updated. If not specified, the default value of '100.64.128.0/20' is used. This field is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer. */
  composerInternalIpv4CidrBlock?: string;
}

export const NodeConfig: Schema.Schema<NodeConfig> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  machineType: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  subnetwork: Schema.optional(Schema.String),
  diskSizeGb: Schema.optional(Schema.Number),
  oauthScopes: Schema.optional(Schema.Array(Schema.String)),
  serviceAccount: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Array(Schema.String)),
  ipAllocationPolicy: Schema.optional(IPAllocationPolicy),
  enableIpMasqAgent: Schema.optional(Schema.Boolean),
  composerNetworkAttachment: Schema.optional(Schema.String),
  composerInternalIpv4CidrBlock: Schema.optional(Schema.String),
})).annotate({ identifier: "NodeConfig" }) as any as Schema.Schema<NodeConfig>;

export interface PrivateClusterConfig {
  /** Optional. If `true`, access to the public endpoint of the GKE cluster is denied. */
  enablePrivateEndpoint?: boolean;
  /** Optional. The CIDR block from which IPv4 range for GKE master will be reserved. If left blank, the default value of '172.16.0.0/23' is used. */
  masterIpv4CidrBlock?: string;
  /** Output only. The IP range in CIDR notation to use for the hosted master network. This range is used for assigning internal IP addresses to the GKE cluster master or set of masters and to the internal load balancer virtual IP. This range must not overlap with any other ranges in use within the cluster's network. */
  masterIpv4ReservedRange?: string;
}

export const PrivateClusterConfig: Schema.Schema<PrivateClusterConfig> = Schema.suspend(() => Schema.Struct({
  enablePrivateEndpoint: Schema.optional(Schema.Boolean),
  masterIpv4CidrBlock: Schema.optional(Schema.String),
  masterIpv4ReservedRange: Schema.optional(Schema.String),
})).annotate({ identifier: "PrivateClusterConfig" }) as any as Schema.Schema<PrivateClusterConfig>;

export interface NetworkingConfig {
  /** Optional. Indicates the user requested specific connection type between Tenant and Customer projects. You cannot set networking connection type in public IP environment. */
  connectionType?: "CONNECTION_TYPE_UNSPECIFIED" | "VPC_PEERING" | "PRIVATE_SERVICE_CONNECT" | (string & {});
}

export const NetworkingConfig: Schema.Schema<NetworkingConfig> = Schema.suspend(() => Schema.Struct({
  connectionType: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkingConfig" }) as any as Schema.Schema<NetworkingConfig>;

export interface PrivateEnvironmentConfig {
  /** Optional. Networking type for the environment, either private or public. */
  networkingType?: "NETWORKING_TYPE_UNSPECIFIED" | "PRIVATE" | "PUBLIC" | (string & {});
  /** Optional. If `true`, a Private IP Cloud Composer environment is created. If this field is set to true, `IPAllocationPolicy.use_ip_aliases` must be set to true for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*. This field is going to be deprecated. Use `networking_type` instead. */
  enablePrivateEnvironment?: boolean;
  /** Optional. If `true`, builds performed during operations that install Python packages have only private connectivity to Google services (including Artifact Registry) and VPC network (if either `NodeConfig.network` and `NodeConfig.subnetwork` fields or `NodeConfig.composer_network_attachment` field are specified). If `false`, the builds also have access to the internet. This field is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer. */
  enablePrivateBuildsOnly?: boolean;
  /** Optional. Configuration for the private GKE cluster for a Private IP Cloud Composer environment. */
  privateClusterConfig?: PrivateClusterConfig;
  /** Optional. The CIDR block from which IP range for web server will be reserved. Needs to be disjoint from `private_cluster_config.master_ipv4_cidr_block` and `cloud_sql_ipv4_cidr_block`. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*. */
  webServerIpv4CidrBlock?: string;
  /** Optional. The CIDR block from which IP range in tenant project will be reserved for Cloud SQL. Needs to be disjoint from `web_server_ipv4_cidr_block`. */
  cloudSqlIpv4CidrBlock?: string;
  /** Output only. The IP range reserved for the tenant project's App Engine VMs. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*. */
  webServerIpv4ReservedRange?: string;
  /** Optional. The CIDR block from which IP range for Cloud Composer Network in tenant project will be reserved. Needs to be disjoint from private_cluster_config.master_ipv4_cidr_block and cloud_sql_ipv4_cidr_block. This field is supported for Cloud Composer environments in versions composer-2.*.*-airflow-*.*.* and newer. */
  cloudComposerNetworkIpv4CidrBlock?: string;
  /** Output only. The IP range reserved for the tenant project's Cloud Composer network. This field is supported for Cloud Composer environments in versions composer-2.*.*-airflow-*.*.* and newer. */
  cloudComposerNetworkIpv4ReservedRange?: string;
  /** Optional. When enabled, IPs from public (non-RFC1918) ranges can be used for `IPAllocationPolicy.cluster_ipv4_cidr_block` and `IPAllocationPolicy.service_ipv4_cidr_block`. */
  enablePrivatelyUsedPublicIps?: boolean;
  /** Optional. When specified, the environment will use Private Service Connect instead of VPC peerings to connect to Cloud SQL in the Tenant Project, and the PSC endpoint in the Customer Project will use an IP address from this subnetwork. */
  cloudComposerConnectionSubnetwork?: string;
  /** Optional. Configuration for the network connections configuration in the environment. */
  networkingConfig?: NetworkingConfig;
}

export const PrivateEnvironmentConfig: Schema.Schema<PrivateEnvironmentConfig> = Schema.suspend(() => Schema.Struct({
  networkingType: Schema.optional(Schema.String),
  enablePrivateEnvironment: Schema.optional(Schema.Boolean),
  enablePrivateBuildsOnly: Schema.optional(Schema.Boolean),
  privateClusterConfig: Schema.optional(PrivateClusterConfig),
  webServerIpv4CidrBlock: Schema.optional(Schema.String),
  cloudSqlIpv4CidrBlock: Schema.optional(Schema.String),
  webServerIpv4ReservedRange: Schema.optional(Schema.String),
  cloudComposerNetworkIpv4CidrBlock: Schema.optional(Schema.String),
  cloudComposerNetworkIpv4ReservedRange: Schema.optional(Schema.String),
  enablePrivatelyUsedPublicIps: Schema.optional(Schema.Boolean),
  cloudComposerConnectionSubnetwork: Schema.optional(Schema.String),
  networkingConfig: Schema.optional(NetworkingConfig),
})).annotate({ identifier: "PrivateEnvironmentConfig" }) as any as Schema.Schema<PrivateEnvironmentConfig>;

export interface AllowedIpRange {
  /** IP address or range, defined using CIDR notation, of requests that this rule applies to. Examples: `192.168.1.1` or `192.168.0.0/16` or `2001:db8::/32` or `2001:0db8:0000:0042:0000:8a2e:0370:7334`. IP range prefixes should be properly truncated. For example, `1.2.3.4/24` should be truncated to `1.2.3.0/24`. Similarly, for IPv6, `2001:db8::1/32` should be truncated to `2001:db8::/32`. */
  value?: string;
  /** Optional. User-provided description. It must contain at most 300 characters. */
  description?: string;
}

export const AllowedIpRange: Schema.Schema<AllowedIpRange> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "AllowedIpRange" }) as any as Schema.Schema<AllowedIpRange>;

export interface WebServerNetworkAccessControl {
  /** A collection of allowed IP ranges with descriptions. */
  allowedIpRanges?: Array<AllowedIpRange>;
}

export const WebServerNetworkAccessControl: Schema.Schema<WebServerNetworkAccessControl> = Schema.suspend(() => Schema.Struct({
  allowedIpRanges: Schema.optional(Schema.Array(AllowedIpRange)),
})).annotate({ identifier: "WebServerNetworkAccessControl" }) as any as Schema.Schema<WebServerNetworkAccessControl>;

export interface DatabaseConfig {
  /** Optional. Cloud SQL machine type used by Airflow database. It has to be one of: db-n1-standard-2, db-n1-standard-4, db-n1-standard-8 or db-n1-standard-16. If not specified, db-n1-standard-2 will be used. Supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*. */
  machineType?: string;
  /** Optional. The Compute Engine zone where the Airflow database is created. If zone is provided, it must be in the region selected for the environment. If zone is not provided, a zone is automatically selected. The zone can only be set during environment creation. Supported for Cloud Composer environments in versions composer-2.*.*-airflow-*.*.*. */
  zone?: string;
}

export const DatabaseConfig: Schema.Schema<DatabaseConfig> = Schema.suspend(() => Schema.Struct({
  machineType: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
})).annotate({ identifier: "DatabaseConfig" }) as any as Schema.Schema<DatabaseConfig>;

export interface WebServerConfig {
  /** Optional. Machine type on which Airflow web server is running. It has to be one of: composer-n1-webserver-2, composer-n1-webserver-4 or composer-n1-webserver-8. If not specified, composer-n1-webserver-2 will be used. Value custom is returned only in response, if Airflow web server parameters were manually changed to a non-standard values. */
  machineType?: string;
}

export const WebServerConfig: Schema.Schema<WebServerConfig> = Schema.suspend(() => Schema.Struct({
  machineType: Schema.optional(Schema.String),
})).annotate({ identifier: "WebServerConfig" }) as any as Schema.Schema<WebServerConfig>;

export interface EncryptionConfig {
  /** Optional. Customer-managed Encryption Key available through Google's Key Management Service. Cannot be updated. If not specified, Google-managed key will be used. */
  kmsKeyName?: string;
}

export const EncryptionConfig: Schema.Schema<EncryptionConfig> = Schema.suspend(() => Schema.Struct({
  kmsKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "EncryptionConfig" }) as any as Schema.Schema<EncryptionConfig>;

export interface MaintenanceWindow {
  /** Required. Start time of the first recurrence of the maintenance window. */
  startTime?: string;
  /** Required. Maintenance window end time. It is used only to calculate the duration of the maintenance window. The value for end-time must be in the future, relative to `start_time`. */
  endTime?: string;
  /** Required. Maintenance window recurrence. Format is a subset of [RFC-5545](https://tools.ietf.org/html/rfc5545) `RRULE`. The only allowed values for `FREQ` field are `FREQ=DAILY` and `FREQ=WEEKLY;BYDAY=...` Example values: `FREQ=WEEKLY;BYDAY=TU,WE`, `FREQ=DAILY`. */
  recurrence?: string;
}

export const MaintenanceWindow: Schema.Schema<MaintenanceWindow> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  recurrence: Schema.optional(Schema.String),
})).annotate({ identifier: "MaintenanceWindow" }) as any as Schema.Schema<MaintenanceWindow>;

export interface SchedulerResource {
  /** Optional. CPU request and limit for a single Airflow scheduler replica. */
  cpu?: number;
  /** Optional. Memory (GB) request and limit for a single Airflow scheduler replica. */
  memoryGb?: number;
  /** Optional. Storage (GB) request and limit for a single Airflow scheduler replica. */
  storageGb?: number;
  /** Optional. The number of schedulers. */
  count?: number;
}

export const SchedulerResource: Schema.Schema<SchedulerResource> = Schema.suspend(() => Schema.Struct({
  cpu: Schema.optional(Schema.Number),
  memoryGb: Schema.optional(Schema.Number),
  storageGb: Schema.optional(Schema.Number),
  count: Schema.optional(Schema.Number),
})).annotate({ identifier: "SchedulerResource" }) as any as Schema.Schema<SchedulerResource>;

export interface WebServerResource {
  /** Optional. CPU request and limit for Airflow web server. */
  cpu?: number;
  /** Optional. Memory (GB) request and limit for Airflow web server. */
  memoryGb?: number;
  /** Optional. Storage (GB) request and limit for Airflow web server. */
  storageGb?: number;
}

export const WebServerResource: Schema.Schema<WebServerResource> = Schema.suspend(() => Schema.Struct({
  cpu: Schema.optional(Schema.Number),
  memoryGb: Schema.optional(Schema.Number),
  storageGb: Schema.optional(Schema.Number),
})).annotate({ identifier: "WebServerResource" }) as any as Schema.Schema<WebServerResource>;

export interface WorkerResource {
  /** Optional. CPU request and limit for a single Airflow worker replica. */
  cpu?: number;
  /** Optional. Memory (GB) request and limit for a single Airflow worker replica. */
  memoryGb?: number;
  /** Optional. Storage (GB) request and limit for a single Airflow worker replica. */
  storageGb?: number;
  /** Optional. Minimum number of workers for autoscaling. */
  minCount?: number;
  /** Optional. Maximum number of workers for autoscaling. */
  maxCount?: number;
}

export const WorkerResource: Schema.Schema<WorkerResource> = Schema.suspend(() => Schema.Struct({
  cpu: Schema.optional(Schema.Number),
  memoryGb: Schema.optional(Schema.Number),
  storageGb: Schema.optional(Schema.Number),
  minCount: Schema.optional(Schema.Number),
  maxCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "WorkerResource" }) as any as Schema.Schema<WorkerResource>;

export interface TriggererResource {
  /** Optional. The number of triggerers. */
  count?: number;
  /** Optional. CPU request and limit for a single Airflow triggerer replica. */
  cpu?: number;
  /** Optional. Memory (GB) request and limit for a single Airflow triggerer replica. */
  memoryGb?: number;
}

export const TriggererResource: Schema.Schema<TriggererResource> = Schema.suspend(() => Schema.Struct({
  count: Schema.optional(Schema.Number),
  cpu: Schema.optional(Schema.Number),
  memoryGb: Schema.optional(Schema.Number),
})).annotate({ identifier: "TriggererResource" }) as any as Schema.Schema<TriggererResource>;

export interface DagProcessorResource {
  /** Optional. CPU request and limit for a single Airflow DAG processor replica. */
  cpu?: number;
  /** Optional. Memory (GB) request and limit for a single Airflow DAG processor replica. */
  memoryGb?: number;
  /** Optional. Storage (GB) request and limit for a single Airflow DAG processor replica. */
  storageGb?: number;
  /** Optional. The number of DAG processors. If not provided or set to 0, a single DAG processor instance will be created. */
  count?: number;
}

export const DagProcessorResource: Schema.Schema<DagProcessorResource> = Schema.suspend(() => Schema.Struct({
  cpu: Schema.optional(Schema.Number),
  memoryGb: Schema.optional(Schema.Number),
  storageGb: Schema.optional(Schema.Number),
  count: Schema.optional(Schema.Number),
})).annotate({ identifier: "DagProcessorResource" }) as any as Schema.Schema<DagProcessorResource>;

export interface WorkloadsConfig {
  /** Optional. Resources used by Airflow schedulers. */
  scheduler?: SchedulerResource;
  /** Optional. Resources used by Airflow web server. */
  webServer?: WebServerResource;
  /** Optional. Resources used by Airflow workers. */
  worker?: WorkerResource;
  /** Optional. Resources used by Airflow triggerers. */
  triggerer?: TriggererResource;
  /** Optional. Resources used by Airflow DAG processors. This field is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer. */
  dagProcessor?: DagProcessorResource;
}

export const WorkloadsConfig: Schema.Schema<WorkloadsConfig> = Schema.suspend(() => Schema.Struct({
  scheduler: Schema.optional(SchedulerResource),
  webServer: Schema.optional(WebServerResource),
  worker: Schema.optional(WorkerResource),
  triggerer: Schema.optional(TriggererResource),
  dagProcessor: Schema.optional(DagProcessorResource),
})).annotate({ identifier: "WorkloadsConfig" }) as any as Schema.Schema<WorkloadsConfig>;

export interface CidrBlock {
  /** User-defined name that identifies the CIDR block. */
  displayName?: string;
  /** CIDR block that must be specified in CIDR notation. */
  cidrBlock?: string;
}

export const CidrBlock: Schema.Schema<CidrBlock> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  cidrBlock: Schema.optional(Schema.String),
})).annotate({ identifier: "CidrBlock" }) as any as Schema.Schema<CidrBlock>;

export interface MasterAuthorizedNetworksConfig {
  /** Optional. Whether or not master authorized networks feature is enabled. */
  enabled?: boolean;
  /** Up to 50 external networks that could access Kubernetes master through HTTPS. */
  cidrBlocks?: Array<CidrBlock>;
}

export const MasterAuthorizedNetworksConfig: Schema.Schema<MasterAuthorizedNetworksConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  cidrBlocks: Schema.optional(Schema.Array(CidrBlock)),
})).annotate({ identifier: "MasterAuthorizedNetworksConfig" }) as any as Schema.Schema<MasterAuthorizedNetworksConfig>;

export interface ScheduledSnapshotsConfig {
  /** Optional. Whether scheduled snapshots creation is enabled. */
  enabled?: boolean;
  /** Optional. The Cloud Storage location for storing automatically created snapshots. */
  snapshotLocation?: string;
  /** Optional. The cron expression representing the time when snapshots creation mechanism runs. This field is subject to additional validation around frequency of execution. */
  snapshotCreationSchedule?: string;
  /** Optional. Time zone that sets the context to interpret snapshot_creation_schedule. */
  timeZone?: string;
}

export const ScheduledSnapshotsConfig: Schema.Schema<ScheduledSnapshotsConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  snapshotLocation: Schema.optional(Schema.String),
  snapshotCreationSchedule: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
})).annotate({ identifier: "ScheduledSnapshotsConfig" }) as any as Schema.Schema<ScheduledSnapshotsConfig>;

export interface RecoveryConfig {
  /** Optional. The configuration for scheduled snapshot creation mechanism. */
  scheduledSnapshotsConfig?: ScheduledSnapshotsConfig;
}

export const RecoveryConfig: Schema.Schema<RecoveryConfig> = Schema.suspend(() => Schema.Struct({
  scheduledSnapshotsConfig: Schema.optional(ScheduledSnapshotsConfig),
})).annotate({ identifier: "RecoveryConfig" }) as any as Schema.Schema<RecoveryConfig>;

export interface AirflowMetadataRetentionPolicyConfig {
  /** Optional. Retention can be either enabled or disabled. */
  retentionMode?: "RETENTION_MODE_UNSPECIFIED" | "RETENTION_MODE_ENABLED" | "RETENTION_MODE_DISABLED" | (string & {});
  /** Optional. How many days data should be retained for. */
  retentionDays?: number;
}

export const AirflowMetadataRetentionPolicyConfig: Schema.Schema<AirflowMetadataRetentionPolicyConfig> = Schema.suspend(() => Schema.Struct({
  retentionMode: Schema.optional(Schema.String),
  retentionDays: Schema.optional(Schema.Number),
})).annotate({ identifier: "AirflowMetadataRetentionPolicyConfig" }) as any as Schema.Schema<AirflowMetadataRetentionPolicyConfig>;

export interface TaskLogsRetentionConfig {
  /** Optional. The mode of storage for Airflow workers task logs. */
  storageMode?: "TASK_LOGS_STORAGE_MODE_UNSPECIFIED" | "CLOUD_LOGGING_AND_CLOUD_STORAGE" | "CLOUD_LOGGING_ONLY" | (string & {});
}

export const TaskLogsRetentionConfig: Schema.Schema<TaskLogsRetentionConfig> = Schema.suspend(() => Schema.Struct({
  storageMode: Schema.optional(Schema.String),
})).annotate({ identifier: "TaskLogsRetentionConfig" }) as any as Schema.Schema<TaskLogsRetentionConfig>;

export interface DataRetentionConfig {
  /** Optional. The retention policy for airflow metadata database. */
  airflowMetadataRetentionConfig?: AirflowMetadataRetentionPolicyConfig;
  /** Optional. The configuration settings for task logs retention */
  taskLogsRetentionConfig?: TaskLogsRetentionConfig;
}

export const DataRetentionConfig: Schema.Schema<DataRetentionConfig> = Schema.suspend(() => Schema.Struct({
  airflowMetadataRetentionConfig: Schema.optional(AirflowMetadataRetentionPolicyConfig),
  taskLogsRetentionConfig: Schema.optional(TaskLogsRetentionConfig),
})).annotate({ identifier: "DataRetentionConfig" }) as any as Schema.Schema<DataRetentionConfig>;

export interface EnvironmentConfig {
  /** Output only. The Kubernetes Engine cluster used to run this environment. */
  gkeCluster?: string;
  /** Output only. The Cloud Storage prefix of the DAGs for this environment. Although Cloud Storage objects reside in a flat namespace, a hierarchical file tree can be simulated using "/"-delimited object name prefixes. DAG objects for this environment reside in a simulated directory with the given prefix. */
  dagGcsPrefix?: string;
  /** The number of nodes in the Kubernetes Engine cluster that will be used to run this environment. This field is supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*. */
  nodeCount?: number;
  /** Optional. The configuration settings for software inside the environment. */
  softwareConfig?: SoftwareConfig;
  /** Optional. The configuration used for the Kubernetes Engine cluster. */
  nodeConfig?: NodeConfig;
  /** Optional. The configuration used for the Private IP Cloud Composer environment. */
  privateEnvironmentConfig?: PrivateEnvironmentConfig;
  /** Optional. The network-level access control policy for the Airflow web server. If unspecified, no network-level access restrictions will be applied. */
  webServerNetworkAccessControl?: WebServerNetworkAccessControl;
  /** Optional. The configuration settings for Cloud SQL instance used internally by Apache Airflow software. */
  databaseConfig?: DatabaseConfig;
  /** Optional. The configuration settings for the Airflow web server App Engine instance. */
  webServerConfig?: WebServerConfig;
  /** Optional. The encryption options for the Cloud Composer environment and its dependencies. Cannot be updated. */
  encryptionConfig?: EncryptionConfig;
  /** Optional. The maintenance window is the period when Cloud Composer components may undergo maintenance. It is defined so that maintenance is not executed during peak hours or critical time periods. The system will not be under maintenance for every occurrence of this window, but when maintenance is planned, it will be scheduled during the window. The maintenance window period must encompass at least 12 hours per week. This may be split into multiple chunks, each with a size of at least 4 hours. If this value is omitted, the default value for maintenance window is applied. By default, maintenance windows are from 00:00:00 to 04:00:00 (GMT) on Friday, Saturday, and Sunday every week. */
  maintenanceWindow?: MaintenanceWindow;
  /** Optional. The workloads configuration settings for the GKE cluster associated with the Cloud Composer environment. The GKE cluster runs Airflow scheduler, web server and workers workloads. This field is supported for Cloud Composer environments in versions composer-2.*.*-airflow-*.*.* and newer. */
  workloadsConfig?: WorkloadsConfig;
  /** Optional. The size of the Cloud Composer environment. This field is supported for Cloud Composer environments in versions composer-2.*.*-airflow-*.*.* and newer. */
  environmentSize?: "ENVIRONMENT_SIZE_UNSPECIFIED" | "ENVIRONMENT_SIZE_SMALL" | "ENVIRONMENT_SIZE_MEDIUM" | "ENVIRONMENT_SIZE_LARGE" | "ENVIRONMENT_SIZE_EXTRA_LARGE" | (string & {});
  /** Output only. The URI of the Apache Airflow Web UI hosted within this environment (see [Airflow web interface](/composer/docs/how-to/accessing/airflow-web-interface)). */
  airflowUri?: string;
  /** Output only. The 'bring your own identity' variant of the URI of the Apache Airflow Web UI hosted within this environment, to be accessed with external identities using workforce identity federation (see [Access environments with workforce identity federation](/composer/docs/composer-2/access-environments-with-workforce-identity-federation)). */
  airflowByoidUri?: string;
  /** Optional. The configuration options for GKE cluster master authorized networks. By default master authorized networks feature is: - in case of private environment: enabled with no external networks allowlisted. - in case of public environment: disabled. */
  masterAuthorizedNetworksConfig?: MasterAuthorizedNetworksConfig;
  /** Optional. The Recovery settings configuration of an environment. This field is supported for Cloud Composer environments in versions composer-2.*.*-airflow-*.*.* and newer. */
  recoveryConfig?: RecoveryConfig;
  /** Optional. Resilience mode of the Cloud Composer Environment. This field is supported for Cloud Composer environments in versions composer-2.2.0-airflow-*.*.* and newer. */
  resilienceMode?: "RESILIENCE_MODE_UNSPECIFIED" | "HIGH_RESILIENCE" | (string & {});
  /** Optional. The configuration setting for Airflow database data retention mechanism. */
  dataRetentionConfig?: DataRetentionConfig;
}

export const EnvironmentConfig: Schema.Schema<EnvironmentConfig> = Schema.suspend(() => Schema.Struct({
  gkeCluster: Schema.optional(Schema.String),
  dagGcsPrefix: Schema.optional(Schema.String),
  nodeCount: Schema.optional(Schema.Number),
  softwareConfig: Schema.optional(SoftwareConfig),
  nodeConfig: Schema.optional(NodeConfig),
  privateEnvironmentConfig: Schema.optional(PrivateEnvironmentConfig),
  webServerNetworkAccessControl: Schema.optional(WebServerNetworkAccessControl),
  databaseConfig: Schema.optional(DatabaseConfig),
  webServerConfig: Schema.optional(WebServerConfig),
  encryptionConfig: Schema.optional(EncryptionConfig),
  maintenanceWindow: Schema.optional(MaintenanceWindow),
  workloadsConfig: Schema.optional(WorkloadsConfig),
  environmentSize: Schema.optional(Schema.String),
  airflowUri: Schema.optional(Schema.String),
  airflowByoidUri: Schema.optional(Schema.String),
  masterAuthorizedNetworksConfig: Schema.optional(MasterAuthorizedNetworksConfig),
  recoveryConfig: Schema.optional(RecoveryConfig),
  resilienceMode: Schema.optional(Schema.String),
  dataRetentionConfig: Schema.optional(DataRetentionConfig),
})).annotate({ identifier: "EnvironmentConfig" }) as any as Schema.Schema<EnvironmentConfig>;

export interface StorageConfig {
  /** Optional. The name of the Cloud Storage bucket used by the environment. No `gs://` prefix. */
  bucket?: string;
}

export const StorageConfig: Schema.Schema<StorageConfig> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.String),
})).annotate({ identifier: "StorageConfig" }) as any as Schema.Schema<StorageConfig>;

export interface Environment {
  /** Identifier. The resource name of the environment, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}" EnvironmentId must start with a lowercase letter followed by up to 63 lowercase letters, numbers, or hyphens, and cannot end with a hyphen. */
  name?: string;
  /** Optional. Configuration parameters for this environment. */
  config?: EnvironmentConfig;
  /** Output only. The UUID (Universally Unique IDentifier) associated with this environment. This value is generated when the environment is created. */
  uuid?: string;
  /** The current state of the environment. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "RUNNING" | "UPDATING" | "DELETING" | "ERROR" | (string & {});
  /** Output only. The time at which this environment was created. */
  createTime?: string;
  /** Output only. The time at which this environment was last modified. */
  updateTime?: string;
  /** Optional. User-defined labels for this environment. The labels map can contain no more than 64 entries. Entries of the labels map are UTF8 strings that comply with the following restrictions: * Keys must conform to regexp: \p{Ll}\p{Lo}{0,62} * Values must conform to regexp: [\p{Ll}\p{Lo}\p{N}_-]{0,63} * Both keys and values are additionally constrained to be <= 128 bytes in size. */
  labels?: Record<string, string>;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Optional. Storage configuration for this environment. */
  storageConfig?: StorageConfig;
}

export const Environment: Schema.Schema<Environment> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  config: Schema.optional(EnvironmentConfig),
  uuid: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  storageConfig: Schema.optional(StorageConfig),
})).annotate({ identifier: "Environment" }) as any as Schema.Schema<Environment>;

export interface ListEnvironmentsResponse {
  /** The list of environments returned by a ListEnvironmentsRequest. */
  environments?: Array<Environment>;
  /** The page token used to query for the next page if one exists. */
  nextPageToken?: string;
}

export const ListEnvironmentsResponse: Schema.Schema<ListEnvironmentsResponse> = Schema.suspend(() => Schema.Struct({
  environments: Schema.optional(Schema.Array(Environment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListEnvironmentsResponse" }) as any as Schema.Schema<ListEnvironmentsResponse>;

export interface RestartWebServerRequest {
}

export const RestartWebServerRequest: Schema.Schema<RestartWebServerRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RestartWebServerRequest" }) as any as Schema.Schema<RestartWebServerRequest>;

export interface ExecuteAirflowCommandRequest {
  /** Airflow command. */
  command?: string;
  /** Airflow subcommand. */
  subcommand?: string;
  /** Parameters for the Airflow command/subcommand as an array of arguments. It may contain positional arguments like `["my-dag-id"]`, key-value parameters like `["--foo=bar"]` or `["--foo","bar"]`, or other flags like `["-f"]`. */
  parameters?: Array<string>;
}

export const ExecuteAirflowCommandRequest: Schema.Schema<ExecuteAirflowCommandRequest> = Schema.suspend(() => Schema.Struct({
  command: Schema.optional(Schema.String),
  subcommand: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ExecuteAirflowCommandRequest" }) as any as Schema.Schema<ExecuteAirflowCommandRequest>;

export interface ExecuteAirflowCommandResponse {
  /** The unique ID of the command execution for polling. */
  executionId?: string;
  /** The name of the pod where the command is executed. */
  pod?: string;
  /** The namespace of the pod where the command is executed. */
  podNamespace?: string;
  /** Error message. Empty if there was no error. */
  error?: string;
}

export const ExecuteAirflowCommandResponse: Schema.Schema<ExecuteAirflowCommandResponse> = Schema.suspend(() => Schema.Struct({
  executionId: Schema.optional(Schema.String),
  pod: Schema.optional(Schema.String),
  podNamespace: Schema.optional(Schema.String),
  error: Schema.optional(Schema.String),
})).annotate({ identifier: "ExecuteAirflowCommandResponse" }) as any as Schema.Schema<ExecuteAirflowCommandResponse>;

export interface StopAirflowCommandRequest {
  /** The unique ID of the command execution. */
  executionId?: string;
  /** The name of the pod where the command is executed. */
  pod?: string;
  /** The namespace of the pod where the command is executed. */
  podNamespace?: string;
  /** If true, the execution is terminated forcefully (SIGKILL). If false, the execution is stopped gracefully, giving it time for cleanup. */
  force?: boolean;
}

export const StopAirflowCommandRequest: Schema.Schema<StopAirflowCommandRequest> = Schema.suspend(() => Schema.Struct({
  executionId: Schema.optional(Schema.String),
  pod: Schema.optional(Schema.String),
  podNamespace: Schema.optional(Schema.String),
  force: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "StopAirflowCommandRequest" }) as any as Schema.Schema<StopAirflowCommandRequest>;

export interface StopAirflowCommandResponse {
  /** Whether the execution is still running. */
  isDone?: boolean;
  /** Output message from stopping execution request. */
  output?: Array<string>;
}

export const StopAirflowCommandResponse: Schema.Schema<StopAirflowCommandResponse> = Schema.suspend(() => Schema.Struct({
  isDone: Schema.optional(Schema.Boolean),
  output: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "StopAirflowCommandResponse" }) as any as Schema.Schema<StopAirflowCommandResponse>;

export interface PollAirflowCommandRequest {
  /** The unique ID of the command execution. */
  executionId?: string;
  /** The name of the pod where the command is executed. */
  pod?: string;
  /** The namespace of the pod where the command is executed. */
  podNamespace?: string;
  /** Line number from which new logs should be fetched. */
  nextLineNumber?: number;
}

export const PollAirflowCommandRequest: Schema.Schema<PollAirflowCommandRequest> = Schema.suspend(() => Schema.Struct({
  executionId: Schema.optional(Schema.String),
  pod: Schema.optional(Schema.String),
  podNamespace: Schema.optional(Schema.String),
  nextLineNumber: Schema.optional(Schema.Number),
})).annotate({ identifier: "PollAirflowCommandRequest" }) as any as Schema.Schema<PollAirflowCommandRequest>;

export interface Line {
  /** Number of the line. */
  lineNumber?: number;
  /** Text content of the log line. */
  content?: string;
}

export const Line: Schema.Schema<Line> = Schema.suspend(() => Schema.Struct({
  lineNumber: Schema.optional(Schema.Number),
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "Line" }) as any as Schema.Schema<Line>;

export interface ExitInfo {
  /** The exit code from the command execution. */
  exitCode?: number;
  /** Error message. Empty if there was no error. */
  error?: string;
}

export const ExitInfo: Schema.Schema<ExitInfo> = Schema.suspend(() => Schema.Struct({
  exitCode: Schema.optional(Schema.Number),
  error: Schema.optional(Schema.String),
})).annotate({ identifier: "ExitInfo" }) as any as Schema.Schema<ExitInfo>;

export interface PollAirflowCommandResponse {
  /** Output from the command execution. It may not contain the full output and the caller may need to poll for more lines. */
  output?: Array<Line>;
  /** Whether the command execution has finished and there is no more output. */
  outputEnd?: boolean;
  /** The result exit status of the command. */
  exitInfo?: ExitInfo;
}

export const PollAirflowCommandResponse: Schema.Schema<PollAirflowCommandResponse> = Schema.suspend(() => Schema.Struct({
  output: Schema.optional(Schema.Array(Line)),
  outputEnd: Schema.optional(Schema.Boolean),
  exitInfo: Schema.optional(ExitInfo),
})).annotate({ identifier: "PollAirflowCommandResponse" }) as any as Schema.Schema<PollAirflowCommandResponse>;

export interface ComposerWorkloadStatus {
  /** Output only. Workload state. */
  state?: "COMPOSER_WORKLOAD_STATE_UNSPECIFIED" | "PENDING" | "OK" | "WARNING" | "ERROR" | "SUCCEEDED" | "FAILED" | (string & {});
  /** Output only. Text to provide more descriptive status. */
  statusMessage?: string;
  /** Output only. Detailed message of the status. */
  detailedStatusMessage?: string;
}

export const ComposerWorkloadStatus: Schema.Schema<ComposerWorkloadStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  detailedStatusMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "ComposerWorkloadStatus" }) as any as Schema.Schema<ComposerWorkloadStatus>;

export interface ComposerWorkload {
  /** Name of a workload. */
  name?: string;
  /** Type of a workload. */
  type?: "COMPOSER_WORKLOAD_TYPE_UNSPECIFIED" | "CELERY_WORKER" | "KUBERNETES_WORKER" | "KUBERNETES_OPERATOR_POD" | "SCHEDULER" | "DAG_PROCESSOR" | "TRIGGERER" | "WEB_SERVER" | "REDIS" | (string & {});
  /** Output only. Status of a workload. */
  status?: ComposerWorkloadStatus;
}

export const ComposerWorkload: Schema.Schema<ComposerWorkload> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  status: Schema.optional(ComposerWorkloadStatus),
})).annotate({ identifier: "ComposerWorkload" }) as any as Schema.Schema<ComposerWorkload>;

export interface ListWorkloadsResponse {
  /** The list of environment workloads. */
  workloads?: Array<ComposerWorkload>;
  /** The page token used to query for the next page if one exists. */
  nextPageToken?: string;
}

export const ListWorkloadsResponse: Schema.Schema<ListWorkloadsResponse> = Schema.suspend(() => Schema.Struct({
  workloads: Schema.optional(Schema.Array(ComposerWorkload)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListWorkloadsResponse" }) as any as Schema.Schema<ListWorkloadsResponse>;

export interface CheckUpgradeRequest {
  /** Optional. The version of the software running in the environment. This encapsulates both the version of Cloud Composer functionality and the version of Apache Airflow. It must match the regular expression `composer-([0-9]+(\.[0-9]+\.[0-9]+(-preview\.[0-9]+)?)?|latest)-airflow-([0-9]+(\.[0-9]+(\.[0-9]+)?)?)`. When used as input, the server also checks if the provided version is supported and denies the request for an unsupported version. The Cloud Composer portion of the image version is a full [semantic version](https://semver.org), or an alias in the form of major version number or `latest`. When an alias is provided, the server replaces it with the current Cloud Composer version that satisfies the alias. The Apache Airflow portion of the image version is a full semantic version that points to one of the supported Apache Airflow versions, or an alias in the form of only major or major.minor versions specified. When an alias is provided, the server replaces it with the latest Apache Airflow version that satisfies the alias and is supported in the given Cloud Composer version. In all cases, the resolved image version is stored in the same field. See also [version list](/composer/docs/concepts/versioning/composer-versions) and [versioning overview](/composer/docs/concepts/versioning/composer-versioning-overview). */
  imageVersion?: string;
}

export const CheckUpgradeRequest: Schema.Schema<CheckUpgradeRequest> = Schema.suspend(() => Schema.Struct({
  imageVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "CheckUpgradeRequest" }) as any as Schema.Schema<CheckUpgradeRequest>;

export interface UserWorkloadsSecret {
  /** Identifier. The resource name of the Secret, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}/userWorkloadsSecrets/{userWorkloadsSecretId}" */
  name?: string;
  /** Optional. The "data" field of Kubernetes Secret, organized in key-value pairs, which can contain sensitive values such as a password, a token, or a key. The values for all keys have to be base64-encoded strings. For details see: https://kubernetes.io/docs/concepts/configuration/secret/ Example: { "example": "ZXhhbXBsZV92YWx1ZQ==", "another-example": "YW5vdGhlcl9leGFtcGxlX3ZhbHVl" } */
  data?: Record<string, string>;
}

export const UserWorkloadsSecret: Schema.Schema<UserWorkloadsSecret> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  data: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "UserWorkloadsSecret" }) as any as Schema.Schema<UserWorkloadsSecret>;

export interface ListUserWorkloadsSecretsResponse {
  /** The list of Secrets returned by a ListUserWorkloadsSecretsRequest. */
  userWorkloadsSecrets?: Array<UserWorkloadsSecret>;
  /** The page token used to query for the next page if one exists. */
  nextPageToken?: string;
}

export const ListUserWorkloadsSecretsResponse: Schema.Schema<ListUserWorkloadsSecretsResponse> = Schema.suspend(() => Schema.Struct({
  userWorkloadsSecrets: Schema.optional(Schema.Array(UserWorkloadsSecret)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListUserWorkloadsSecretsResponse" }) as any as Schema.Schema<ListUserWorkloadsSecretsResponse>;

export interface UserWorkloadsConfigMap {
  /** Identifier. The resource name of the ConfigMap, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}/userWorkloadsConfigMaps/{userWorkloadsConfigMapId}" */
  name?: string;
  /** Optional. The "data" field of Kubernetes ConfigMap, organized in key-value pairs. For details see: https://kubernetes.io/docs/concepts/configuration/configmap/ Example: { "example_key": "example_value", "another_key": "another_value" } */
  data?: Record<string, string>;
}

export const UserWorkloadsConfigMap: Schema.Schema<UserWorkloadsConfigMap> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  data: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "UserWorkloadsConfigMap" }) as any as Schema.Schema<UserWorkloadsConfigMap>;

export interface ListUserWorkloadsConfigMapsResponse {
  /** The list of ConfigMaps returned by a ListUserWorkloadsConfigMapsRequest. */
  userWorkloadsConfigMaps?: Array<UserWorkloadsConfigMap>;
  /** The page token used to query for the next page if one exists. */
  nextPageToken?: string;
}

export const ListUserWorkloadsConfigMapsResponse: Schema.Schema<ListUserWorkloadsConfigMapsResponse> = Schema.suspend(() => Schema.Struct({
  userWorkloadsConfigMaps: Schema.optional(Schema.Array(UserWorkloadsConfigMap)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListUserWorkloadsConfigMapsResponse" }) as any as Schema.Schema<ListUserWorkloadsConfigMapsResponse>;

export interface SaveSnapshotRequest {
  /** Location in a Cloud Storage where the snapshot is going to be stored, e.g.: "gs://my-bucket/snapshots". */
  snapshotLocation?: string;
}

export const SaveSnapshotRequest: Schema.Schema<SaveSnapshotRequest> = Schema.suspend(() => Schema.Struct({
  snapshotLocation: Schema.optional(Schema.String),
})).annotate({ identifier: "SaveSnapshotRequest" }) as any as Schema.Schema<SaveSnapshotRequest>;

export interface LoadSnapshotRequest {
  /** A Cloud Storage path to a snapshot to load, e.g.: "gs://my-bucket/snapshots/project_location_environment_timestamp". */
  snapshotPath?: string;
  /** Whether or not to skip installing Pypi packages when loading the environment's state. */
  skipPypiPackagesInstallation?: boolean;
  /** Whether or not to skip setting environment variables when loading the environment's state. */
  skipEnvironmentVariablesSetting?: boolean;
  /** Whether or not to skip setting Airflow overrides when loading the environment's state. */
  skipAirflowOverridesSetting?: boolean;
  /** Whether or not to skip copying Cloud Storage data when loading the environment's state. */
  skipGcsDataCopying?: boolean;
}

export const LoadSnapshotRequest: Schema.Schema<LoadSnapshotRequest> = Schema.suspend(() => Schema.Struct({
  snapshotPath: Schema.optional(Schema.String),
  skipPypiPackagesInstallation: Schema.optional(Schema.Boolean),
  skipEnvironmentVariablesSetting: Schema.optional(Schema.Boolean),
  skipAirflowOverridesSetting: Schema.optional(Schema.Boolean),
  skipGcsDataCopying: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "LoadSnapshotRequest" }) as any as Schema.Schema<LoadSnapshotRequest>;

export interface DatabaseFailoverRequest {
}

export const DatabaseFailoverRequest: Schema.Schema<DatabaseFailoverRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DatabaseFailoverRequest" }) as any as Schema.Schema<DatabaseFailoverRequest>;

export interface FetchDatabasePropertiesResponse {
  /** The Compute Engine zone that the instance is currently serving from. */
  primaryGceZone?: string;
  /** The Compute Engine zone that the failover instance is currently serving from for a regional Cloud SQL instance. */
  secondaryGceZone?: string;
  /** The availability status of the failover replica. A false status indicates that the failover replica is out of sync. The primary instance can only fail over to the failover replica when the status is true. */
  isFailoverReplicaAvailable?: boolean;
}

export const FetchDatabasePropertiesResponse: Schema.Schema<FetchDatabasePropertiesResponse> = Schema.suspend(() => Schema.Struct({
  primaryGceZone: Schema.optional(Schema.String),
  secondaryGceZone: Schema.optional(Schema.String),
  isFailoverReplicaAvailable: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "FetchDatabasePropertiesResponse" }) as any as Schema.Schema<FetchDatabasePropertiesResponse>;

export interface Composer_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Composer_Date: Schema.Schema<Composer_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Composer_Date" }) as any as Schema.Schema<Composer_Date>;

export interface ImageVersion {
  /** The string identifier of the ImageVersion, in the form: "composer-x.y.z-airflow-a.b.c" */
  imageVersionId?: string;
  /** Whether this is the default ImageVersion used by Composer during environment creation if no input ImageVersion is specified. */
  isDefault?: boolean;
  /** supported python versions */
  supportedPythonVersions?: Array<string>;
  /** The date of the version release. */
  releaseDate?: Composer_Date;
  /** Whether it is impossible to create an environment with the image version. */
  creationDisabled?: boolean;
  /** Whether it is impossible to upgrade an environment running with the image version. */
  upgradeDisabled?: boolean;
}

export const ImageVersion: Schema.Schema<ImageVersion> = Schema.suspend(() => Schema.Struct({
  imageVersionId: Schema.optional(Schema.String),
  isDefault: Schema.optional(Schema.Boolean),
  supportedPythonVersions: Schema.optional(Schema.Array(Schema.String)),
  releaseDate: Schema.optional(Composer_Date),
  creationDisabled: Schema.optional(Schema.Boolean),
  upgradeDisabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ImageVersion" }) as any as Schema.Schema<ImageVersion>;

export interface ListImageVersionsResponse {
  /** The list of supported ImageVersions in a location. */
  imageVersions?: Array<ImageVersion>;
  /** The page token used to query for the next page if one exists. */
  nextPageToken?: string;
}

export const ListImageVersionsResponse: Schema.Schema<ListImageVersionsResponse> = Schema.suspend(() => Schema.Struct({
  imageVersions: Schema.optional(Schema.Array(ImageVersion)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListImageVersionsResponse" }) as any as Schema.Schema<ListImageVersionsResponse>;

export interface OperationMetadata {
  /** Output only. The current operation state. */
  state?: "STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "SUCCEEDED" | "SUCCESSFUL" | "FAILED" | (string & {});
  /** Output only. The type of operation being performed. */
  operationType?: "TYPE_UNSPECIFIED" | "CREATE" | "DELETE" | "UPDATE" | "CHECK" | "SAVE_SNAPSHOT" | "LOAD_SNAPSHOT" | "DATABASE_FAILOVER" | "MIGRATE" | (string & {});
  /** Output only. The resource being operated on, as a [relative resource name]( /apis/design/resource_names#relative_resource_name). */
  resource?: string;
  /** Output only. The UUID of the resource being operated on. */
  resourceUuid?: string;
  /** Output only. The time the operation was submitted to the server. */
  createTime?: string;
  /** Output only. The time when the operation terminated, regardless of its success. This field is unset if the operation is still ongoing. */
  endTime?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  operationType: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
  resourceUuid: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface ConfigConflict {
  /** Conflict message. */
  message?: string;
  /** Conflict type. It can be blocking or non-blocking. */
  type?: "CONFLICT_TYPE_UNSPECIFIED" | "BLOCKING" | "NON_BLOCKING" | (string & {});
}

export const ConfigConflict: Schema.Schema<ConfigConflict> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigConflict" }) as any as Schema.Schema<ConfigConflict>;

export interface CheckUpgradeResponse {
  /** Output only. Url for a docker build log of an upgraded image. */
  buildLogUri?: string;
  /** Output only. Whether build has succeeded or failed on modules conflicts. */
  containsPypiModulesConflict?: "CONFLICT_RESULT_UNSPECIFIED" | "CONFLICT" | "NO_CONFLICT" | (string & {});
  /** Output only. Extract from a docker image build log containing information about pypi modules conflicts. */
  pypiConflictBuildLogExtract?: string;
  /** Composer image for which the build was happening. */
  imageVersion?: string;
  /** Pypi dependencies specified in the environment configuration, at the time when the build was triggered. */
  pypiDependencies?: Record<string, string>;
  /** Output only. Contains information about environment configuration that is incompatible with the new image version, except for pypi modules conflicts. */
  configConflicts?: Array<ConfigConflict>;
}

export const CheckUpgradeResponse: Schema.Schema<CheckUpgradeResponse> = Schema.suspend(() => Schema.Struct({
  buildLogUri: Schema.optional(Schema.String),
  containsPypiModulesConflict: Schema.optional(Schema.String),
  pypiConflictBuildLogExtract: Schema.optional(Schema.String),
  imageVersion: Schema.optional(Schema.String),
  pypiDependencies: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  configConflicts: Schema.optional(Schema.Array(ConfigConflict)),
})).annotate({ identifier: "CheckUpgradeResponse" }) as any as Schema.Schema<CheckUpgradeResponse>;

export interface SaveSnapshotResponse {
  /** The fully-resolved Cloud Storage path of the created snapshot, e.g.: "gs://my-bucket/snapshots/project_location_environment_timestamp". This field is populated only if the snapshot creation was successful. */
  snapshotPath?: string;
}

export const SaveSnapshotResponse: Schema.Schema<SaveSnapshotResponse> = Schema.suspend(() => Schema.Struct({
  snapshotPath: Schema.optional(Schema.String),
})).annotate({ identifier: "SaveSnapshotResponse" }) as any as Schema.Schema<SaveSnapshotResponse>;

export interface LoadSnapshotResponse {
}

export const LoadSnapshotResponse: Schema.Schema<LoadSnapshotResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "LoadSnapshotResponse" }) as any as Schema.Schema<LoadSnapshotResponse>;

export interface DatabaseFailoverResponse {
}

export const DatabaseFailoverResponse: Schema.Schema<DatabaseFailoverResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DatabaseFailoverResponse" }) as any as Schema.Schema<DatabaseFailoverResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
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
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

export const listProjectsLocationsOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
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

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = CommonErrors;

export const deleteProjectsLocationsOperations: API.OperationMethod<DeleteProjectsLocationsOperationsRequest, DeleteProjectsLocationsOperationsResponse, DeleteProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Create a new environment. */
export interface CreateProjectsLocationsEnvironmentsRequest {
  /** The parent must be of the form "projects/{projectId}/locations/{locationId}". */
  parent: string;
  /** Request body */
  body?: Environment;
}

export const CreateProjectsLocationsEnvironmentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Environment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/environments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsEnvironmentsRequest>;

export type CreateProjectsLocationsEnvironmentsResponse = Operation;
export const CreateProjectsLocationsEnvironmentsResponse = Operation;

export type CreateProjectsLocationsEnvironmentsError = CommonErrors;

export const createProjectsLocationsEnvironments: API.OperationMethod<CreateProjectsLocationsEnvironmentsRequest, CreateProjectsLocationsEnvironmentsResponse, CreateProjectsLocationsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsEnvironmentsRequest,
  output: CreateProjectsLocationsEnvironmentsResponse,
  errors: [],
}));

/** Get an existing environment. */
export interface GetProjectsLocationsEnvironmentsRequest {
  /** The resource name of the environment to get, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}" */
  name: string;
}

export const GetProjectsLocationsEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsEnvironmentsRequest>;

export type GetProjectsLocationsEnvironmentsResponse = Environment;
export const GetProjectsLocationsEnvironmentsResponse = Environment;

export type GetProjectsLocationsEnvironmentsError = CommonErrors;

export const getProjectsLocationsEnvironments: API.OperationMethod<GetProjectsLocationsEnvironmentsRequest, GetProjectsLocationsEnvironmentsResponse, GetProjectsLocationsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsEnvironmentsRequest,
  output: GetProjectsLocationsEnvironmentsResponse,
  errors: [],
}));

/** List environments. */
export interface ListProjectsLocationsEnvironmentsRequest {
  /** List environments in the given project and location, in the form: "projects/{projectId}/locations/{locationId}" */
  parent: string;
  /** The maximum number of environments to return. */
  pageSize?: number;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsEnvironmentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/environments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsEnvironmentsRequest>;

export type ListProjectsLocationsEnvironmentsResponse = ListEnvironmentsResponse;
export const ListProjectsLocationsEnvironmentsResponse = ListEnvironmentsResponse;

export type ListProjectsLocationsEnvironmentsError = CommonErrors;

export const listProjectsLocationsEnvironments = API.makePaginated(() => ({
  input: ListProjectsLocationsEnvironmentsRequest,
  output: ListProjectsLocationsEnvironmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Update an environment. */
export interface PatchProjectsLocationsEnvironmentsRequest {
  /** The relative resource name of the environment to update, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}" */
  name: string;
  /** Required. A comma-separated list of paths, relative to `Environment`, of fields to update. For example, to set the version of scikit-learn to install in the environment to 0.19.0 and to remove an existing installation of numpy, the `updateMask` parameter would include the following two `paths` values: "config.softwareConfig.pypiPackages.scikit-learn" and "config.softwareConfig.pypiPackages.numpy". The included patch environment would specify the scikit-learn version as follows: { "config":{ "softwareConfig":{ "pypiPackages":{ "scikit-learn":"==0.19.0" } } } } Note that in the above example, any existing PyPI packages other than scikit-learn and numpy will be unaffected. Only one update type may be included in a single request's `updateMask`. For example, one cannot update both the PyPI packages and labels in the same request. However, it is possible to update multiple members of a map field simultaneously in the same request. For example, to set the labels "label1" and "label2" while clearing "label3" (assuming it already exists), one can provide the paths "labels.label1", "labels.label2", and "labels.label3" and populate the patch environment as follows: { "labels":{ "label1":"new-label1-value" "label2":"new-label2-value" } } Note that in the above example, any existing labels that are not included in the `updateMask` will be unaffected. It is also possible to replace an entire map field by providing the map field's path in the `updateMask`. The new value of the field will be that which is provided in the patch environment. For example, to delete all pre-existing user-specified PyPI packages and install botocore at version 1.7.14, the `updateMask` would contain the path "config.softwareConfig.pypiPackages", and the patch environment would be the following: { "config":{ "softwareConfig":{ "pypiPackages":{ "botocore":"==1.7.14" } } } } **Note:** Only the following fields can be updated: * `config.softwareConfig.pypiPackages` * Replace all custom custom PyPI packages. If a replacement package map is not included in `environment`, all custom PyPI packages are cleared. It is an error to provide both this mask and a mask specifying an individual package. * `config.softwareConfig.pypiPackages.`packagename * Update the custom PyPI package *packagename*, preserving other packages. To delete the package, include it in `updateMask`, and omit the mapping for it in `environment.config.softwareConfig.pypiPackages`. It is an error to provide both a mask of this form and the `config.softwareConfig.pypiPackages` mask. * `labels` * Replace all environment labels. If a replacement labels map is not included in `environment`, all labels are cleared. It is an error to provide both this mask and a mask specifying one or more individual labels. * `labels.`labelName * Set the label named *labelName*, while preserving other labels. To delete the label, include it in `updateMask` and omit its mapping in `environment.labels`. It is an error to provide both a mask of this form and the `labels` mask. * `config.nodeCount` * Horizontally scale the number of nodes in the environment. An integer greater than or equal to 3 must be provided in the `config.nodeCount` field. Supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*. * `config.webServerNetworkAccessControl` * Replace the environment's current `WebServerNetworkAccessControl`. * `config.softwareConfig.airflowConfigOverrides` * Replace all Apache Airflow config overrides. If a replacement config overrides map is not included in `environment`, all config overrides are cleared. It is an error to provide both this mask and a mask specifying one or more individual config overrides. * `config.softwareConfig.airflowConfigOverrides.`section-name * Override the Apache Airflow config property *name* in the section named *section*, preserving other properties. To delete the property override, include it in `updateMask` and omit its mapping in `environment.config.softwareConfig.airflowConfigOverrides`. It is an error to provide both a mask of this form and the `config.softwareConfig.airflowConfigOverrides` mask. * `config.softwareConfig.envVariables` * Replace all environment variables. If a replacement environment variable map is not included in `environment`, all custom environment variables are cleared. * `config.softwareConfig.schedulerCount` * Horizontally scale the number of schedulers in Airflow. A positive integer not greater than the number of nodes must be provided in the `config.softwareConfig.schedulerCount` field. Supported for Cloud Composer environments in versions composer-1.*.*-airflow-2.*.*. * `config.databaseConfig.machineType` * Cloud SQL machine type used by Airflow database. It has to be one of: db-n1-standard-2, db-n1-standard-4, db-n1-standard-8 or db-n1-standard-16. Supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*. * `config.webServerConfig.machineType` * Machine type on which Airflow web server is running. It has to be one of: composer-n1-webserver-2, composer-n1-webserver-4 or composer-n1-webserver-8. Supported for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*. */
  updateMask?: string;
  /** Request body */
  body?: Environment;
}

export const PatchProjectsLocationsEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Environment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsEnvironmentsRequest>;

export type PatchProjectsLocationsEnvironmentsResponse = Operation;
export const PatchProjectsLocationsEnvironmentsResponse = Operation;

export type PatchProjectsLocationsEnvironmentsError = CommonErrors;

export const patchProjectsLocationsEnvironments: API.OperationMethod<PatchProjectsLocationsEnvironmentsRequest, PatchProjectsLocationsEnvironmentsResponse, PatchProjectsLocationsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsEnvironmentsRequest,
  output: PatchProjectsLocationsEnvironmentsResponse,
  errors: [],
}));

/** Delete an environment. */
export interface DeleteProjectsLocationsEnvironmentsRequest {
  /** The environment to delete, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}" */
  name: string;
}

export const DeleteProjectsLocationsEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsEnvironmentsRequest>;

export type DeleteProjectsLocationsEnvironmentsResponse = Operation;
export const DeleteProjectsLocationsEnvironmentsResponse = Operation;

export type DeleteProjectsLocationsEnvironmentsError = CommonErrors;

export const deleteProjectsLocationsEnvironments: API.OperationMethod<DeleteProjectsLocationsEnvironmentsRequest, DeleteProjectsLocationsEnvironmentsResponse, DeleteProjectsLocationsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsEnvironmentsRequest,
  output: DeleteProjectsLocationsEnvironmentsResponse,
  errors: [],
}));

/** Restart Airflow web server. */
export interface RestartWebServerProjectsLocationsEnvironmentsRequest {
  /** Required. The resource name of the environment to restart the web server for, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}" */
  name: string;
  /** Request body */
  body?: RestartWebServerRequest;
}

export const RestartWebServerProjectsLocationsEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RestartWebServerRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}:restartWebServer", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestartWebServerProjectsLocationsEnvironmentsRequest>;

export type RestartWebServerProjectsLocationsEnvironmentsResponse = Operation;
export const RestartWebServerProjectsLocationsEnvironmentsResponse = Operation;

export type RestartWebServerProjectsLocationsEnvironmentsError = CommonErrors;

export const restartWebServerProjectsLocationsEnvironments: API.OperationMethod<RestartWebServerProjectsLocationsEnvironmentsRequest, RestartWebServerProjectsLocationsEnvironmentsResponse, RestartWebServerProjectsLocationsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestartWebServerProjectsLocationsEnvironmentsRequest,
  output: RestartWebServerProjectsLocationsEnvironmentsResponse,
  errors: [],
}));

/** Executes Airflow CLI command. */
export interface ExecuteAirflowCommandProjectsLocationsEnvironmentsRequest {
  /** The resource name of the environment in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}". */
  environment: string;
  /** Request body */
  body?: ExecuteAirflowCommandRequest;
}

export const ExecuteAirflowCommandProjectsLocationsEnvironmentsRequest = Schema.Struct({
  environment: Schema.String.pipe(T.HttpPath("environment")),
  body: Schema.optional(ExecuteAirflowCommandRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}:executeAirflowCommand", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExecuteAirflowCommandProjectsLocationsEnvironmentsRequest>;

export type ExecuteAirflowCommandProjectsLocationsEnvironmentsResponse = ExecuteAirflowCommandResponse;
export const ExecuteAirflowCommandProjectsLocationsEnvironmentsResponse = ExecuteAirflowCommandResponse;

export type ExecuteAirflowCommandProjectsLocationsEnvironmentsError = CommonErrors;

export const executeAirflowCommandProjectsLocationsEnvironments: API.OperationMethod<ExecuteAirflowCommandProjectsLocationsEnvironmentsRequest, ExecuteAirflowCommandProjectsLocationsEnvironmentsResponse, ExecuteAirflowCommandProjectsLocationsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExecuteAirflowCommandProjectsLocationsEnvironmentsRequest,
  output: ExecuteAirflowCommandProjectsLocationsEnvironmentsResponse,
  errors: [],
}));

/** Stops Airflow CLI command execution. */
export interface StopAirflowCommandProjectsLocationsEnvironmentsRequest {
  /** The resource name of the environment in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}". */
  environment: string;
  /** Request body */
  body?: StopAirflowCommandRequest;
}

export const StopAirflowCommandProjectsLocationsEnvironmentsRequest = Schema.Struct({
  environment: Schema.String.pipe(T.HttpPath("environment")),
  body: Schema.optional(StopAirflowCommandRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}:stopAirflowCommand", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StopAirflowCommandProjectsLocationsEnvironmentsRequest>;

export type StopAirflowCommandProjectsLocationsEnvironmentsResponse = StopAirflowCommandResponse;
export const StopAirflowCommandProjectsLocationsEnvironmentsResponse = StopAirflowCommandResponse;

export type StopAirflowCommandProjectsLocationsEnvironmentsError = CommonErrors;

export const stopAirflowCommandProjectsLocationsEnvironments: API.OperationMethod<StopAirflowCommandProjectsLocationsEnvironmentsRequest, StopAirflowCommandProjectsLocationsEnvironmentsResponse, StopAirflowCommandProjectsLocationsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StopAirflowCommandProjectsLocationsEnvironmentsRequest,
  output: StopAirflowCommandProjectsLocationsEnvironmentsResponse,
  errors: [],
}));

/** Polls Airflow CLI command execution and fetches logs. */
export interface PollAirflowCommandProjectsLocationsEnvironmentsRequest {
  /** The resource name of the environment in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}" */
  environment: string;
  /** Request body */
  body?: PollAirflowCommandRequest;
}

export const PollAirflowCommandProjectsLocationsEnvironmentsRequest = Schema.Struct({
  environment: Schema.String.pipe(T.HttpPath("environment")),
  body: Schema.optional(PollAirflowCommandRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}:pollAirflowCommand", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PollAirflowCommandProjectsLocationsEnvironmentsRequest>;

export type PollAirflowCommandProjectsLocationsEnvironmentsResponse = PollAirflowCommandResponse;
export const PollAirflowCommandProjectsLocationsEnvironmentsResponse = PollAirflowCommandResponse;

export type PollAirflowCommandProjectsLocationsEnvironmentsError = CommonErrors;

export const pollAirflowCommandProjectsLocationsEnvironments: API.OperationMethod<PollAirflowCommandProjectsLocationsEnvironmentsRequest, PollAirflowCommandProjectsLocationsEnvironmentsResponse, PollAirflowCommandProjectsLocationsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PollAirflowCommandProjectsLocationsEnvironmentsRequest,
  output: PollAirflowCommandProjectsLocationsEnvironmentsResponse,
  errors: [],
}));

/** Check if an upgrade operation on the environment will succeed. In case of problems detailed info can be found in the returned Operation. */
export interface CheckUpgradeProjectsLocationsEnvironmentsRequest {
  /** Required. The resource name of the environment to check upgrade for, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}" */
  environment: string;
  /** Request body */
  body?: CheckUpgradeRequest;
}

export const CheckUpgradeProjectsLocationsEnvironmentsRequest = Schema.Struct({
  environment: Schema.String.pipe(T.HttpPath("environment")),
  body: Schema.optional(CheckUpgradeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}:checkUpgrade", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CheckUpgradeProjectsLocationsEnvironmentsRequest>;

export type CheckUpgradeProjectsLocationsEnvironmentsResponse = Operation;
export const CheckUpgradeProjectsLocationsEnvironmentsResponse = Operation;

export type CheckUpgradeProjectsLocationsEnvironmentsError = CommonErrors;

export const checkUpgradeProjectsLocationsEnvironments: API.OperationMethod<CheckUpgradeProjectsLocationsEnvironmentsRequest, CheckUpgradeProjectsLocationsEnvironmentsResponse, CheckUpgradeProjectsLocationsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CheckUpgradeProjectsLocationsEnvironmentsRequest,
  output: CheckUpgradeProjectsLocationsEnvironmentsResponse,
  errors: [],
}));

/** Creates a snapshots of a Cloud Composer environment. As a result of this operation, snapshot of environment's state is stored in a location specified in the SaveSnapshotRequest. */
export interface SaveSnapshotProjectsLocationsEnvironmentsRequest {
  /** The resource name of the source environment in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}" */
  environment: string;
  /** Request body */
  body?: SaveSnapshotRequest;
}

export const SaveSnapshotProjectsLocationsEnvironmentsRequest = Schema.Struct({
  environment: Schema.String.pipe(T.HttpPath("environment")),
  body: Schema.optional(SaveSnapshotRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}:saveSnapshot", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SaveSnapshotProjectsLocationsEnvironmentsRequest>;

export type SaveSnapshotProjectsLocationsEnvironmentsResponse = Operation;
export const SaveSnapshotProjectsLocationsEnvironmentsResponse = Operation;

export type SaveSnapshotProjectsLocationsEnvironmentsError = CommonErrors;

export const saveSnapshotProjectsLocationsEnvironments: API.OperationMethod<SaveSnapshotProjectsLocationsEnvironmentsRequest, SaveSnapshotProjectsLocationsEnvironmentsResponse, SaveSnapshotProjectsLocationsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SaveSnapshotProjectsLocationsEnvironmentsRequest,
  output: SaveSnapshotProjectsLocationsEnvironmentsResponse,
  errors: [],
}));

/** Loads a snapshot of a Cloud Composer environment. As a result of this operation, a snapshot of environment's specified in LoadSnapshotRequest is loaded into the environment. */
export interface LoadSnapshotProjectsLocationsEnvironmentsRequest {
  /** The resource name of the target environment in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}" */
  environment: string;
  /** Request body */
  body?: LoadSnapshotRequest;
}

export const LoadSnapshotProjectsLocationsEnvironmentsRequest = Schema.Struct({
  environment: Schema.String.pipe(T.HttpPath("environment")),
  body: Schema.optional(LoadSnapshotRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}:loadSnapshot", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LoadSnapshotProjectsLocationsEnvironmentsRequest>;

export type LoadSnapshotProjectsLocationsEnvironmentsResponse = Operation;
export const LoadSnapshotProjectsLocationsEnvironmentsResponse = Operation;

export type LoadSnapshotProjectsLocationsEnvironmentsError = CommonErrors;

export const loadSnapshotProjectsLocationsEnvironments: API.OperationMethod<LoadSnapshotProjectsLocationsEnvironmentsRequest, LoadSnapshotProjectsLocationsEnvironmentsResponse, LoadSnapshotProjectsLocationsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LoadSnapshotProjectsLocationsEnvironmentsRequest,
  output: LoadSnapshotProjectsLocationsEnvironmentsResponse,
  errors: [],
}));

/** Triggers database failover (only for highly resilient environments). */
export interface DatabaseFailoverProjectsLocationsEnvironmentsRequest {
  /** Target environment: "projects/{projectId}/locations/{locationId}/environments/{environmentId}" */
  environment: string;
  /** Request body */
  body?: DatabaseFailoverRequest;
}

export const DatabaseFailoverProjectsLocationsEnvironmentsRequest = Schema.Struct({
  environment: Schema.String.pipe(T.HttpPath("environment")),
  body: Schema.optional(DatabaseFailoverRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}:databaseFailover", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DatabaseFailoverProjectsLocationsEnvironmentsRequest>;

export type DatabaseFailoverProjectsLocationsEnvironmentsResponse = Operation;
export const DatabaseFailoverProjectsLocationsEnvironmentsResponse = Operation;

export type DatabaseFailoverProjectsLocationsEnvironmentsError = CommonErrors;

export const databaseFailoverProjectsLocationsEnvironments: API.OperationMethod<DatabaseFailoverProjectsLocationsEnvironmentsRequest, DatabaseFailoverProjectsLocationsEnvironmentsResponse, DatabaseFailoverProjectsLocationsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DatabaseFailoverProjectsLocationsEnvironmentsRequest,
  output: DatabaseFailoverProjectsLocationsEnvironmentsResponse,
  errors: [],
}));

/** Fetches database properties. */
export interface FetchDatabasePropertiesProjectsLocationsEnvironmentsRequest {
  /** Required. The resource name of the environment, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}" */
  environment: string;
}

export const FetchDatabasePropertiesProjectsLocationsEnvironmentsRequest = Schema.Struct({
  environment: Schema.String.pipe(T.HttpPath("environment")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}:fetchDatabaseProperties" }),
  svc,
) as unknown as Schema.Schema<FetchDatabasePropertiesProjectsLocationsEnvironmentsRequest>;

export type FetchDatabasePropertiesProjectsLocationsEnvironmentsResponse = FetchDatabasePropertiesResponse;
export const FetchDatabasePropertiesProjectsLocationsEnvironmentsResponse = FetchDatabasePropertiesResponse;

export type FetchDatabasePropertiesProjectsLocationsEnvironmentsError = CommonErrors;

export const fetchDatabasePropertiesProjectsLocationsEnvironments: API.OperationMethod<FetchDatabasePropertiesProjectsLocationsEnvironmentsRequest, FetchDatabasePropertiesProjectsLocationsEnvironmentsResponse, FetchDatabasePropertiesProjectsLocationsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchDatabasePropertiesProjectsLocationsEnvironmentsRequest,
  output: FetchDatabasePropertiesProjectsLocationsEnvironmentsResponse,
  errors: [],
}));

/** Lists workloads in a Cloud Composer environment. Workload is a unit that runs a single Composer component. This method is supported for Cloud Composer environments in versions composer-2.*.*-airflow-*.*.* and newer. */
export interface ListProjectsLocationsEnvironmentsWorkloadsRequest {
  /** Required. The environment name to get workloads for, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}" */
  parent: string;
  /** Optional. The maximum number of environments to return. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Optional. The list filter. Currently only supports equality on the type field. The value of a field specified in the filter expression must be one ComposerWorkloadType enum option. It's possible to get multiple types using "OR" operator, e.g.: "type=SCHEDULER OR type=CELERY_WORKER". If not specified, all items are returned. */
  filter?: string;
}

export const ListProjectsLocationsEnvironmentsWorkloadsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}/workloads" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsEnvironmentsWorkloadsRequest>;

export type ListProjectsLocationsEnvironmentsWorkloadsResponse = ListWorkloadsResponse;
export const ListProjectsLocationsEnvironmentsWorkloadsResponse = ListWorkloadsResponse;

export type ListProjectsLocationsEnvironmentsWorkloadsError = CommonErrors;

export const listProjectsLocationsEnvironmentsWorkloads = API.makePaginated(() => ({
  input: ListProjectsLocationsEnvironmentsWorkloadsRequest,
  output: ListProjectsLocationsEnvironmentsWorkloadsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a user workloads Secret. This method is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer. */
export interface CreateProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest {
  /** Required. The environment name to create a Secret for, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}" */
  parent: string;
  /** Request body */
  body?: UserWorkloadsSecret;
}

export const CreateProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UserWorkloadsSecret).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}/userWorkloadsSecrets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest>;

export type CreateProjectsLocationsEnvironmentsUserWorkloadsSecretsResponse = UserWorkloadsSecret;
export const CreateProjectsLocationsEnvironmentsUserWorkloadsSecretsResponse = UserWorkloadsSecret;

export type CreateProjectsLocationsEnvironmentsUserWorkloadsSecretsError = CommonErrors;

export const createProjectsLocationsEnvironmentsUserWorkloadsSecrets: API.OperationMethod<CreateProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest, CreateProjectsLocationsEnvironmentsUserWorkloadsSecretsResponse, CreateProjectsLocationsEnvironmentsUserWorkloadsSecretsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest,
  output: CreateProjectsLocationsEnvironmentsUserWorkloadsSecretsResponse,
  errors: [],
}));

/** Gets an existing user workloads Secret. Values of the "data" field in the response are cleared. This method is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer. */
export interface GetProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest {
  /** Required. The resource name of the Secret to get, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}/userWorkloadsSecrets/{userWorkloadsSecretId}" */
  name: string;
}

export const GetProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}/userWorkloadsSecrets/{userWorkloadsSecretsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest>;

export type GetProjectsLocationsEnvironmentsUserWorkloadsSecretsResponse = UserWorkloadsSecret;
export const GetProjectsLocationsEnvironmentsUserWorkloadsSecretsResponse = UserWorkloadsSecret;

export type GetProjectsLocationsEnvironmentsUserWorkloadsSecretsError = CommonErrors;

export const getProjectsLocationsEnvironmentsUserWorkloadsSecrets: API.OperationMethod<GetProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest, GetProjectsLocationsEnvironmentsUserWorkloadsSecretsResponse, GetProjectsLocationsEnvironmentsUserWorkloadsSecretsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest,
  output: GetProjectsLocationsEnvironmentsUserWorkloadsSecretsResponse,
  errors: [],
}));

/** Lists user workloads Secrets. This method is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer. */
export interface ListProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest {
  /** Required. List Secrets in the given environment, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}" */
  parent: string;
  /** Optional. The maximum number of Secrets to return. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}/userWorkloadsSecrets" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest>;

export type ListProjectsLocationsEnvironmentsUserWorkloadsSecretsResponse = ListUserWorkloadsSecretsResponse;
export const ListProjectsLocationsEnvironmentsUserWorkloadsSecretsResponse = ListUserWorkloadsSecretsResponse;

export type ListProjectsLocationsEnvironmentsUserWorkloadsSecretsError = CommonErrors;

export const listProjectsLocationsEnvironmentsUserWorkloadsSecrets = API.makePaginated(() => ({
  input: ListProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest,
  output: ListProjectsLocationsEnvironmentsUserWorkloadsSecretsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a user workloads Secret. This method is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer. */
export interface UpdateProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest {
  /** Identifier. The resource name of the Secret, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}/userWorkloadsSecrets/{userWorkloadsSecretId}" */
  name: string;
  /** Request body */
  body?: UserWorkloadsSecret;
}

export const UpdateProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UserWorkloadsSecret).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}/userWorkloadsSecrets/{userWorkloadsSecretsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest>;

export type UpdateProjectsLocationsEnvironmentsUserWorkloadsSecretsResponse = UserWorkloadsSecret;
export const UpdateProjectsLocationsEnvironmentsUserWorkloadsSecretsResponse = UserWorkloadsSecret;

export type UpdateProjectsLocationsEnvironmentsUserWorkloadsSecretsError = CommonErrors;

export const updateProjectsLocationsEnvironmentsUserWorkloadsSecrets: API.OperationMethod<UpdateProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest, UpdateProjectsLocationsEnvironmentsUserWorkloadsSecretsResponse, UpdateProjectsLocationsEnvironmentsUserWorkloadsSecretsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest,
  output: UpdateProjectsLocationsEnvironmentsUserWorkloadsSecretsResponse,
  errors: [],
}));

/** Deletes a user workloads Secret. This method is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer. */
export interface DeleteProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest {
  /** Required. The Secret to delete, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}/userWorkloadsSecrets/{userWorkloadsSecretId}" */
  name: string;
}

export const DeleteProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}/userWorkloadsSecrets/{userWorkloadsSecretsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest>;

export type DeleteProjectsLocationsEnvironmentsUserWorkloadsSecretsResponse = Empty;
export const DeleteProjectsLocationsEnvironmentsUserWorkloadsSecretsResponse = Empty;

export type DeleteProjectsLocationsEnvironmentsUserWorkloadsSecretsError = CommonErrors;

export const deleteProjectsLocationsEnvironmentsUserWorkloadsSecrets: API.OperationMethod<DeleteProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest, DeleteProjectsLocationsEnvironmentsUserWorkloadsSecretsResponse, DeleteProjectsLocationsEnvironmentsUserWorkloadsSecretsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsEnvironmentsUserWorkloadsSecretsRequest,
  output: DeleteProjectsLocationsEnvironmentsUserWorkloadsSecretsResponse,
  errors: [],
}));

/** Creates a user workloads ConfigMap. This method is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer. */
export interface CreateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest {
  /** Required. The environment name to create a ConfigMap for, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}" */
  parent: string;
  /** Request body */
  body?: UserWorkloadsConfigMap;
}

export const CreateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UserWorkloadsConfigMap).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}/userWorkloadsConfigMaps", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest>;

export type CreateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsResponse = UserWorkloadsConfigMap;
export const CreateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsResponse = UserWorkloadsConfigMap;

export type CreateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsError = CommonErrors;

export const createProjectsLocationsEnvironmentsUserWorkloadsConfigMaps: API.OperationMethod<CreateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest, CreateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsResponse, CreateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest,
  output: CreateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsResponse,
  errors: [],
}));

/** Gets an existing user workloads ConfigMap. This method is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer. */
export interface GetProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest {
  /** Required. The resource name of the ConfigMap to get, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}/userWorkloadsConfigMaps/{userWorkloadsConfigMapId}" */
  name: string;
}

export const GetProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}/userWorkloadsConfigMaps/{userWorkloadsConfigMapsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest>;

export type GetProjectsLocationsEnvironmentsUserWorkloadsConfigMapsResponse = UserWorkloadsConfigMap;
export const GetProjectsLocationsEnvironmentsUserWorkloadsConfigMapsResponse = UserWorkloadsConfigMap;

export type GetProjectsLocationsEnvironmentsUserWorkloadsConfigMapsError = CommonErrors;

export const getProjectsLocationsEnvironmentsUserWorkloadsConfigMaps: API.OperationMethod<GetProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest, GetProjectsLocationsEnvironmentsUserWorkloadsConfigMapsResponse, GetProjectsLocationsEnvironmentsUserWorkloadsConfigMapsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest,
  output: GetProjectsLocationsEnvironmentsUserWorkloadsConfigMapsResponse,
  errors: [],
}));

/** Lists user workloads ConfigMaps. This method is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer. */
export interface ListProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest {
  /** Required. List ConfigMaps in the given environment, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}" */
  parent: string;
  /** Optional. The maximum number of ConfigMaps to return. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}/userWorkloadsConfigMaps" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest>;

export type ListProjectsLocationsEnvironmentsUserWorkloadsConfigMapsResponse = ListUserWorkloadsConfigMapsResponse;
export const ListProjectsLocationsEnvironmentsUserWorkloadsConfigMapsResponse = ListUserWorkloadsConfigMapsResponse;

export type ListProjectsLocationsEnvironmentsUserWorkloadsConfigMapsError = CommonErrors;

export const listProjectsLocationsEnvironmentsUserWorkloadsConfigMaps = API.makePaginated(() => ({
  input: ListProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest,
  output: ListProjectsLocationsEnvironmentsUserWorkloadsConfigMapsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a user workloads ConfigMap. This method is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer. */
export interface UpdateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest {
  /** Identifier. The resource name of the ConfigMap, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}/userWorkloadsConfigMaps/{userWorkloadsConfigMapId}" */
  name: string;
  /** Request body */
  body?: UserWorkloadsConfigMap;
}

export const UpdateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UserWorkloadsConfigMap).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}/userWorkloadsConfigMaps/{userWorkloadsConfigMapsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest>;

export type UpdateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsResponse = UserWorkloadsConfigMap;
export const UpdateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsResponse = UserWorkloadsConfigMap;

export type UpdateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsError = CommonErrors;

export const updateProjectsLocationsEnvironmentsUserWorkloadsConfigMaps: API.OperationMethod<UpdateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest, UpdateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsResponse, UpdateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest,
  output: UpdateProjectsLocationsEnvironmentsUserWorkloadsConfigMapsResponse,
  errors: [],
}));

/** Deletes a user workloads ConfigMap. This method is supported for Cloud Composer environments in versions composer-3-airflow-*.*.*-build.* and newer. */
export interface DeleteProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest {
  /** Required. The ConfigMap to delete, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}/userWorkloadsConfigMaps/{userWorkloadsConfigMapId}" */
  name: string;
}

export const DeleteProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/environments/{environmentsId}/userWorkloadsConfigMaps/{userWorkloadsConfigMapsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest>;

export type DeleteProjectsLocationsEnvironmentsUserWorkloadsConfigMapsResponse = Empty;
export const DeleteProjectsLocationsEnvironmentsUserWorkloadsConfigMapsResponse = Empty;

export type DeleteProjectsLocationsEnvironmentsUserWorkloadsConfigMapsError = CommonErrors;

export const deleteProjectsLocationsEnvironmentsUserWorkloadsConfigMaps: API.OperationMethod<DeleteProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest, DeleteProjectsLocationsEnvironmentsUserWorkloadsConfigMapsResponse, DeleteProjectsLocationsEnvironmentsUserWorkloadsConfigMapsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsEnvironmentsUserWorkloadsConfigMapsRequest,
  output: DeleteProjectsLocationsEnvironmentsUserWorkloadsConfigMapsResponse,
  errors: [],
}));

/** List ImageVersions for provided location. */
export interface ListProjectsLocationsImageVersionsRequest {
  /** List ImageVersions in the given project and location, in the form: "projects/{projectId}/locations/{locationId}" */
  parent: string;
  /** The maximum number of image_versions to return. */
  pageSize?: number;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Whether or not image versions from old releases should be included. */
  includePastReleases?: boolean;
}

export const ListProjectsLocationsImageVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  includePastReleases: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includePastReleases")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/imageVersions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsImageVersionsRequest>;

export type ListProjectsLocationsImageVersionsResponse = ListImageVersionsResponse;
export const ListProjectsLocationsImageVersionsResponse = ListImageVersionsResponse;

export type ListProjectsLocationsImageVersionsError = CommonErrors;

export const listProjectsLocationsImageVersions = API.makePaginated(() => ({
  input: ListProjectsLocationsImageVersionsRequest,
  output: ListProjectsLocationsImageVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

