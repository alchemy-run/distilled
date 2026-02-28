// ==========================================================================
// App Engine Admin API (appengine v1)
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
  name: "appengine",
  version: "v1",
  rootUrl: "https://appengine.googleapis.com/",
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
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the name should be a resource name ending with operations/{unique_id}. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is false, it means the operation is still in progress. If true, the operation is completed, and either error or response is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as Delete, the response is google.protobuf.Empty. If the original method is standard Get/Create/Update, the response should be the resource. For other methods, the response should have the type XxxResponse, where Xxx is the original method name. For example, if the original method name is TakeSnapshot(), the inferred response type is TakeSnapshotResponse. */
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
  /** Unordered list. Unreachable resources. Populated when the request sets ListOperationsRequest.return_partial_success and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface UrlDispatchRule {
  /** Domain name to match against. The wildcard "*" is supported if specified before a period: "*.".Defaults to matching all domains: "*". */
  domain?: string;
  /** Pathname within the host. Must start with a "/". A single "*" can be included at the end of the path.The sum of the lengths of the domain and path may not exceed 100 characters. */
  path?: string;
  /** Resource ID of a service in this application that should serve the matched request. The service must already exist. Example: default. */
  service?: string;
}

export const UrlDispatchRule: Schema.Schema<UrlDispatchRule> = Schema.suspend(() => Schema.Struct({
  domain: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "UrlDispatchRule" }) as any as Schema.Schema<UrlDispatchRule>;

export interface IdentityAwareProxy {
  /** Whether the serving infrastructure will authenticate and authorize all incoming requests.If true, the oauth2_client_id and oauth2_client_secret fields must be non-empty. */
  enabled?: boolean;
  /** OAuth2 client ID to use for the authentication flow. */
  oauth2ClientId?: string;
  /** OAuth2 client secret to use for the authentication flow.For security reasons, this value cannot be retrieved via the API. Instead, the SHA-256 hash of the value is returned in the oauth2_client_secret_sha256 field.@InputOnly */
  oauth2ClientSecret?: string;
  /** Output only. Hex-encoded SHA-256 hash of the client secret.@OutputOnly */
  oauth2ClientSecretSha256?: string;
}

export const IdentityAwareProxy: Schema.Schema<IdentityAwareProxy> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  oauth2ClientId: Schema.optional(Schema.String),
  oauth2ClientSecret: Schema.optional(Schema.String),
  oauth2ClientSecretSha256: Schema.optional(Schema.String),
})).annotate({ identifier: "IdentityAwareProxy" }) as any as Schema.Schema<IdentityAwareProxy>;

export interface FeatureSettings {
  /** Boolean value indicating if split health checks should be used instead of the legacy health checks. At an app.yaml level, this means defaulting to 'readiness_check' and 'liveness_check' values instead of 'health_check' ones. Once the legacy 'health_check' behavior is deprecated, and this value is always true, this setting can be removed. */
  splitHealthChecks?: boolean;
  /** If true, use Container-Optimized OS (https://cloud.google.com/container-optimized-os/) base image for VMs, rather than a base Debian image. */
  useContainerOptimizedOs?: boolean;
}

export const FeatureSettings: Schema.Schema<FeatureSettings> = Schema.suspend(() => Schema.Struct({
  splitHealthChecks: Schema.optional(Schema.Boolean),
  useContainerOptimizedOs: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "FeatureSettings" }) as any as Schema.Schema<FeatureSettings>;

export interface Application {
  name?: string;
  /** Identifier of the Application resource. This identifier is equivalent to the project ID of the Google Cloud Platform project where you want to deploy your application. Example: myapp. */
  id?: string;
  /** HTTP path dispatch rules for requests to the application that do not explicitly target a service or version. Rules are order-dependent. Up to 20 dispatch rules can be supported. */
  dispatchRules?: Array<UrlDispatchRule>;
  /** Google Apps authentication domain that controls which users can access this application.Defaults to open access for any Google Account. */
  authDomain?: string;
  /** Location from which this application runs. Application instances run out of the data centers in the specified location, which is also where all of the application's end user content is stored.Defaults to us-central.View the list of supported locations (https://cloud.google.com/appengine/docs/locations). */
  locationId?: string;
  /** Output only. Google Cloud Storage bucket that can be used for storing files associated with this application. This bucket is associated with the application and can be used by the gcloud deployment commands.@OutputOnly */
  codeBucket?: string;
  /** Cookie expiration policy for this application. */
  defaultCookieExpiration?: string;
  /** Serving status of this application. */
  servingStatus?: "UNSPECIFIED" | "SERVING" | "USER_DISABLED" | "SYSTEM_DISABLED" | (string & {});
  /** Output only. Hostname used to reach this application, as resolved by App Engine.@OutputOnly */
  defaultHostname?: string;
  /** Output only. Google Cloud Storage bucket that can be used by this application to store content.@OutputOnly */
  defaultBucket?: string;
  /** The service account associated with the application. This is the app-level default identity. If no identity provided during create version, Admin API will fallback to this one. */
  serviceAccount?: string;
  iap?: IdentityAwareProxy;
  /** Output only. The Google Container Registry domain used for storing managed build docker images for this application. */
  gcrDomain?: string;
  /** The type of the Cloud Firestore or Cloud Datastore database associated with this application. */
  databaseType?: "DATABASE_TYPE_UNSPECIFIED" | "CLOUD_DATASTORE" | "CLOUD_FIRESTORE" | "CLOUD_DATASTORE_COMPATIBILITY" | (string & {});
  /** The feature specific settings to be used in the application. */
  featureSettings?: FeatureSettings;
  /** Additional Google Generated Customer Metadata, this field won't be provided by default and can be requested by setting the IncludeExtraData field in GetApplicationRequest */
  generatedCustomerMetadata?: Record<string, unknown>;
  /** The SSL policy that will be applied to the application. If set to Modern it will restrict traffic with TLS < 1.2 and allow only Modern Ciphers suite */
  sslPolicy?: "SSL_POLICY_UNSPECIFIED" | "DEFAULT" | "MODERN" | (string & {});
}

export const Application: Schema.Schema<Application> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  dispatchRules: Schema.optional(Schema.Array(UrlDispatchRule)),
  authDomain: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  codeBucket: Schema.optional(Schema.String),
  defaultCookieExpiration: Schema.optional(Schema.String),
  servingStatus: Schema.optional(Schema.String),
  defaultHostname: Schema.optional(Schema.String),
  defaultBucket: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  iap: Schema.optional(IdentityAwareProxy),
  gcrDomain: Schema.optional(Schema.String),
  databaseType: Schema.optional(Schema.String),
  featureSettings: Schema.optional(FeatureSettings),
  generatedCustomerMetadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  sslPolicy: Schema.optional(Schema.String),
})).annotate({ identifier: "Application" }) as any as Schema.Schema<Application>;

export interface RepairApplicationRequest {
}

export const RepairApplicationRequest: Schema.Schema<RepairApplicationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RepairApplicationRequest" }) as any as Schema.Schema<RepairApplicationRequest>;

export interface Appengine_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Appengine_Date: Schema.Schema<Appengine_Date> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "Appengine_Date" }) as any as Schema.Schema<Appengine_Date>;

export interface Runtime {
  /** The name of the runtime, e.g., 'go113', 'nodejs12', etc. */
  name?: string;
  /** User-friendly display name, e.g. 'Node.js 12', etc. */
  displayName?: string;
  /** The environment of the runtime. */
  environment?: "ENVIRONMENT_UNSPECIFIED" | "STANDARD" | "FLEXIBLE" | (string & {});
  /** The stage of life this runtime is in, e.g., BETA, GA, etc. */
  stage?: "RUNTIME_STAGE_UNSPECIFIED" | "DEVELOPMENT" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | "DECOMMISSIONED" | "END_OF_SUPPORT" | (string & {});
  /** Warning messages, e.g., a deprecation warning. */
  warnings?: Array<string>;
  /** Supported operating systems for the runtime, e.g., 'ubuntu22', etc. */
  supportedOperatingSystems?: Array<string>;
  /** Date when Runtime is end of support. */
  endOfSupportDate?: Appengine_Date;
  /** Date when Runtime is deprecated. */
  deprecationDate?: Appengine_Date;
  /** Date when Runtime is decommissioned. */
  decommissionedDate?: Appengine_Date;
}

export const Runtime: Schema.Schema<Runtime> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.String),
  stage: Schema.optional(Schema.String),
  warnings: Schema.optional(Schema.Array(Schema.String)),
  supportedOperatingSystems: Schema.optional(Schema.Array(Schema.String)),
  endOfSupportDate: Schema.optional(Appengine_Date),
  deprecationDate: Schema.optional(Appengine_Date),
  decommissionedDate: Schema.optional(Appengine_Date),
})).annotate({ identifier: "Runtime" }) as any as Schema.Schema<Runtime>;

export interface ListRuntimesResponse {
  /** The runtimes available to the requested application. */
  runtimes?: Array<Runtime>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListRuntimesResponse: Schema.Schema<ListRuntimesResponse> = Schema.suspend(() => Schema.Struct({
  runtimes: Schema.optional(Schema.Array(Runtime)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListRuntimesResponse" }) as any as Schema.Schema<ListRuntimesResponse>;

export interface TrafficSplit {
  /** Mechanism used to determine which version a request is sent to. The traffic selection algorithm will be stable for either type until allocations are changed. */
  shardBy?: "UNSPECIFIED" | "COOKIE" | "IP" | "RANDOM" | (string & {});
  /** Mapping from version IDs within the service to fractional (0.000, 1] allocations of traffic for that version. Each version can be specified only once, but some versions in the service may not have any traffic allocation. Services that have traffic allocated cannot be deleted until either the service is deleted or their traffic allocation is removed. Allocations must sum to 1. Up to two decimal place precision is supported for IP-based splits and up to three decimal places is supported for cookie-based splits. */
  allocations?: Record<string, number>;
}

export const TrafficSplit: Schema.Schema<TrafficSplit> = Schema.suspend(() => Schema.Struct({
  shardBy: Schema.optional(Schema.String),
  allocations: Schema.optional(Schema.Record(Schema.String, Schema.Number)),
})).annotate({ identifier: "TrafficSplit" }) as any as Schema.Schema<TrafficSplit>;

export interface NetworkSettings {
  /** The ingress settings for version or service. */
  ingressTrafficAllowed?: "INGRESS_TRAFFIC_ALLOWED_UNSPECIFIED" | "INGRESS_TRAFFIC_ALLOWED_ALL" | "INGRESS_TRAFFIC_ALLOWED_INTERNAL_ONLY" | "INGRESS_TRAFFIC_ALLOWED_INTERNAL_AND_LB" | (string & {});
}

export const NetworkSettings: Schema.Schema<NetworkSettings> = Schema.suspend(() => Schema.Struct({
  ingressTrafficAllowed: Schema.optional(Schema.String),
})).annotate({ identifier: "NetworkSettings" }) as any as Schema.Schema<NetworkSettings>;

export interface Service {
  /** Output only. Full path to the Service resource in the API. Example: apps/myapp/services/default.@OutputOnly */
  name?: string;
  /** Output only. Relative name of the service within the application. Example: default.@OutputOnly */
  id?: string;
  /** Mapping that defines fractional HTTP traffic diversion to different versions within the service. */
  split?: TrafficSplit;
  /** A set of labels to apply to this service. Labels are key/value pairs that describe the service and all resources that belong to it (e.g., versions). The labels can be used to search and group resources, and are propagated to the usage and billing reports, enabling fine-grain analysis of costs. An example of using labels is to tag resources belonging to different environments (e.g., "env=prod", "env=qa"). Label keys and values can be no longer than 63 characters and can only contain lowercase letters, numeric characters, underscores, dashes, and international characters. Label keys must start with a lowercase letter or an international character. Each service can have at most 32 labels. */
  labels?: Record<string, string>;
  /** Ingress settings for this service. Will apply to all versions. */
  networkSettings?: NetworkSettings;
  /** Additional Google Generated Customer Metadata, this field won't be provided by default and can be requested by setting the IncludeExtraData field in GetServiceRequest */
  generatedCustomerMetadata?: Record<string, unknown>;
}

export const Service: Schema.Schema<Service> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  split: Schema.optional(TrafficSplit),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  networkSettings: Schema.optional(NetworkSettings),
  generatedCustomerMetadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Service" }) as any as Schema.Schema<Service>;

export interface ListServicesResponse {
  /** The services belonging to the requested application. */
  services?: Array<Service>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListServicesResponse: Schema.Schema<ListServicesResponse> = Schema.suspend(() => Schema.Struct({
  services: Schema.optional(Schema.Array(Service)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListServicesResponse" }) as any as Schema.Schema<ListServicesResponse>;

export interface CpuUtilization {
  /** Period of time over which CPU utilization is calculated. */
  aggregationWindowLength?: string;
  /** Target CPU utilization ratio to maintain when scaling. Must be between 0 and 1. */
  targetUtilization?: number;
}

export const CpuUtilization: Schema.Schema<CpuUtilization> = Schema.suspend(() => Schema.Struct({
  aggregationWindowLength: Schema.optional(Schema.String),
  targetUtilization: Schema.optional(Schema.Number),
})).annotate({ identifier: "CpuUtilization" }) as any as Schema.Schema<CpuUtilization>;

export interface RequestUtilization {
  /** Target requests per second. */
  targetRequestCountPerSecond?: number;
  /** Target number of concurrent requests. */
  targetConcurrentRequests?: number;
}

export const RequestUtilization: Schema.Schema<RequestUtilization> = Schema.suspend(() => Schema.Struct({
  targetRequestCountPerSecond: Schema.optional(Schema.Number),
  targetConcurrentRequests: Schema.optional(Schema.Number),
})).annotate({ identifier: "RequestUtilization" }) as any as Schema.Schema<RequestUtilization>;

export interface DiskUtilization {
  /** Target bytes written per second. */
  targetWriteBytesPerSecond?: number;
  /** Target ops written per second. */
  targetWriteOpsPerSecond?: number;
  /** Target bytes read per second. */
  targetReadBytesPerSecond?: number;
  /** Target ops read per seconds. */
  targetReadOpsPerSecond?: number;
}

export const DiskUtilization: Schema.Schema<DiskUtilization> = Schema.suspend(() => Schema.Struct({
  targetWriteBytesPerSecond: Schema.optional(Schema.Number),
  targetWriteOpsPerSecond: Schema.optional(Schema.Number),
  targetReadBytesPerSecond: Schema.optional(Schema.Number),
  targetReadOpsPerSecond: Schema.optional(Schema.Number),
})).annotate({ identifier: "DiskUtilization" }) as any as Schema.Schema<DiskUtilization>;

export interface NetworkUtilization {
  /** Target bytes sent per second. */
  targetSentBytesPerSecond?: number;
  /** Target packets sent per second. */
  targetSentPacketsPerSecond?: number;
  /** Target bytes received per second. */
  targetReceivedBytesPerSecond?: number;
  /** Target packets received per second. */
  targetReceivedPacketsPerSecond?: number;
}

export const NetworkUtilization: Schema.Schema<NetworkUtilization> = Schema.suspend(() => Schema.Struct({
  targetSentBytesPerSecond: Schema.optional(Schema.Number),
  targetSentPacketsPerSecond: Schema.optional(Schema.Number),
  targetReceivedBytesPerSecond: Schema.optional(Schema.Number),
  targetReceivedPacketsPerSecond: Schema.optional(Schema.Number),
})).annotate({ identifier: "NetworkUtilization" }) as any as Schema.Schema<NetworkUtilization>;

export interface StandardSchedulerSettings {
  /** Target CPU utilization ratio to maintain when scaling. */
  targetCpuUtilization?: number;
  /** Target throughput utilization ratio to maintain when scaling */
  targetThroughputUtilization?: number;
  /** Minimum number of instances to run for this version. Set to zero to disable min_instances configuration. */
  minInstances?: number;
  /** Maximum number of instances to run for this version. Set to 2147483647 to disable max_instances configuration. */
  maxInstances?: number;
}

export const StandardSchedulerSettings: Schema.Schema<StandardSchedulerSettings> = Schema.suspend(() => Schema.Struct({
  targetCpuUtilization: Schema.optional(Schema.Number),
  targetThroughputUtilization: Schema.optional(Schema.Number),
  minInstances: Schema.optional(Schema.Number),
  maxInstances: Schema.optional(Schema.Number),
})).annotate({ identifier: "StandardSchedulerSettings" }) as any as Schema.Schema<StandardSchedulerSettings>;

export interface AutomaticScaling {
  /** The time period that the Autoscaler (https://cloud.google.com/compute/docs/autoscaler/) should wait before it starts collecting information from a new instance. This prevents the autoscaler from collecting information when the instance is initializing, during which the collected usage would not be reliable. Only applicable in the App Engine flexible environment. */
  coolDownPeriod?: string;
  /** Target scaling by CPU usage. */
  cpuUtilization?: CpuUtilization;
  /** Number of concurrent requests an automatic scaling instance can accept before the scheduler spawns a new instance.Defaults to a runtime-specific value. */
  maxConcurrentRequests?: number;
  /** Maximum number of idle instances that should be maintained for this version. */
  maxIdleInstances?: number;
  /** Maximum number of instances that should be started to handle requests for this version. */
  maxTotalInstances?: number;
  /** Maximum amount of time that a request should wait in the pending queue before starting a new instance to handle it. */
  maxPendingLatency?: string;
  /** Minimum number of idle instances that should be maintained for this version. Only applicable for the default version of a service. */
  minIdleInstances?: number;
  /** Minimum number of running instances that should be maintained for this version. */
  minTotalInstances?: number;
  /** Minimum amount of time a request should wait in the pending queue before starting a new instance to handle it. */
  minPendingLatency?: string;
  /** Target scaling by request utilization. */
  requestUtilization?: RequestUtilization;
  /** Target scaling by disk usage. */
  diskUtilization?: DiskUtilization;
  /** Target scaling by network usage. */
  networkUtilization?: NetworkUtilization;
  /** Scheduler settings for standard environment. */
  standardSchedulerSettings?: StandardSchedulerSettings;
}

export const AutomaticScaling: Schema.Schema<AutomaticScaling> = Schema.suspend(() => Schema.Struct({
  coolDownPeriod: Schema.optional(Schema.String),
  cpuUtilization: Schema.optional(CpuUtilization),
  maxConcurrentRequests: Schema.optional(Schema.Number),
  maxIdleInstances: Schema.optional(Schema.Number),
  maxTotalInstances: Schema.optional(Schema.Number),
  maxPendingLatency: Schema.optional(Schema.String),
  minIdleInstances: Schema.optional(Schema.Number),
  minTotalInstances: Schema.optional(Schema.Number),
  minPendingLatency: Schema.optional(Schema.String),
  requestUtilization: Schema.optional(RequestUtilization),
  diskUtilization: Schema.optional(DiskUtilization),
  networkUtilization: Schema.optional(NetworkUtilization),
  standardSchedulerSettings: Schema.optional(StandardSchedulerSettings),
})).annotate({ identifier: "AutomaticScaling" }) as any as Schema.Schema<AutomaticScaling>;

export interface BasicScaling {
  /** Duration of time after the last request that an instance must wait before the instance is shut down. */
  idleTimeout?: string;
  /** Maximum number of instances to create for this version. */
  maxInstances?: number;
}

export const BasicScaling: Schema.Schema<BasicScaling> = Schema.suspend(() => Schema.Struct({
  idleTimeout: Schema.optional(Schema.String),
  maxInstances: Schema.optional(Schema.Number),
})).annotate({ identifier: "BasicScaling" }) as any as Schema.Schema<BasicScaling>;

export interface ManualScaling {
  /** Number of instances to assign to the service at the start. This number can later be altered by using the Modules API (https://cloud.google.com/appengine/docs/python/modules/functions) set_num_instances() function. */
  instances?: number;
}

export const ManualScaling: Schema.Schema<ManualScaling> = Schema.suspend(() => Schema.Struct({
  instances: Schema.optional(Schema.Number),
})).annotate({ identifier: "ManualScaling" }) as any as Schema.Schema<ManualScaling>;

export interface Network {
  /** List of ports, or port pairs, to forward from the virtual machine to the application container. Only applicable in the App Engine flexible environment. */
  forwardedPorts?: Array<string>;
  /** Tag to apply to the instance during creation. Only applicable in the App Engine flexible environment. */
  instanceTag?: string;
  /** Google Compute Engine network where the virtual machines are created. Specify the short name, not the resource path.Defaults to default. */
  name?: string;
  /** Google Cloud Platform sub-network where the virtual machines are created. Specify the short name, not the resource path.If a subnetwork name is specified, a network name will also be required unless it is for the default network. If the network that the instance is being created in is a Legacy network, then the IP address is allocated from the IPv4Range. If the network that the instance is being created in is an auto Subnet Mode Network, then only network name should be specified (not the subnetwork_name) and the IP address is created from the IPCidrRange of the subnetwork that exists in that zone for that network. If the network that the instance is being created in is a custom Subnet Mode Network, then the subnetwork_name must be specified and the IP address is created from the IPCidrRange of the subnetwork.If specified, the subnetwork must exist in the same region as the App Engine flexible environment application. */
  subnetworkName?: string;
  /** Enable session affinity. Only applicable in the App Engine flexible environment. */
  sessionAffinity?: boolean;
  /** The IP mode for instances. Only applicable in the App Engine flexible environment. */
  instanceIpMode?: "INSTANCE_IP_MODE_UNSPECIFIED" | "EXTERNAL" | "INTERNAL" | (string & {});
}

export const Network: Schema.Schema<Network> = Schema.suspend(() => Schema.Struct({
  forwardedPorts: Schema.optional(Schema.Array(Schema.String)),
  instanceTag: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  subnetworkName: Schema.optional(Schema.String),
  sessionAffinity: Schema.optional(Schema.Boolean),
  instanceIpMode: Schema.optional(Schema.String),
})).annotate({ identifier: "Network" }) as any as Schema.Schema<Network>;

export interface Volume {
  /** Unique name for the volume. */
  name?: string;
  /** Underlying volume type, e.g. 'tmpfs'. */
  volumeType?: string;
  /** Volume size in gigabytes. */
  sizeGb?: number;
}

export const Volume: Schema.Schema<Volume> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  volumeType: Schema.optional(Schema.String),
  sizeGb: Schema.optional(Schema.Number),
})).annotate({ identifier: "Volume" }) as any as Schema.Schema<Volume>;

export interface Resources {
  /** Number of CPU cores needed. */
  cpu?: number;
  /** Disk size (GB) needed. */
  diskGb?: number;
  /** Memory (GB) needed. */
  memoryGb?: number;
  /** User specified volumes. */
  volumes?: Array<Volume>;
  /** The name of the encryption key that is stored in Google Cloud KMS. Only should be used by Cloud Composer to encrypt the vm disk */
  kmsKeyReference?: string;
}

export const Resources: Schema.Schema<Resources> = Schema.suspend(() => Schema.Struct({
  cpu: Schema.optional(Schema.Number),
  diskGb: Schema.optional(Schema.Number),
  memoryGb: Schema.optional(Schema.Number),
  volumes: Schema.optional(Schema.Array(Volume)),
  kmsKeyReference: Schema.optional(Schema.String),
})).annotate({ identifier: "Resources" }) as any as Schema.Schema<Resources>;

export interface FlexibleRuntimeSettings {
  /** The operating system of the application runtime. */
  operatingSystem?: string;
  /** The runtime version of an App Engine flexible application. */
  runtimeVersion?: string;
}

export const FlexibleRuntimeSettings: Schema.Schema<FlexibleRuntimeSettings> = Schema.suspend(() => Schema.Struct({
  operatingSystem: Schema.optional(Schema.String),
  runtimeVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "FlexibleRuntimeSettings" }) as any as Schema.Schema<FlexibleRuntimeSettings>;

export interface StaticFilesHandler {
  /** Path to the static files matched by the URL pattern, from the application root directory. The path can refer to text matched in groupings in the URL pattern. */
  path?: string;
  /** Regular expression that matches the file paths for all files that should be referenced by this handler. */
  uploadPathRegex?: string;
  /** HTTP headers to use for all responses from these URLs. */
  httpHeaders?: Record<string, string>;
  /** MIME type used to serve all files served by this handler.Defaults to file-specific MIME types, which are derived from each file's filename extension. */
  mimeType?: string;
  /** Time a static file served by this handler should be cached by web proxies and browsers. */
  expiration?: string;
  /** Whether this handler should match the request if the file referenced by the handler does not exist. */
  requireMatchingFile?: boolean;
  /** Whether files should also be uploaded as code data. By default, files declared in static file handlers are uploaded as static data and are only served to end users; they cannot be read by the application. If enabled, uploads are charged against both your code and static data storage resource quotas. */
  applicationReadable?: boolean;
}

export const StaticFilesHandler: Schema.Schema<StaticFilesHandler> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  uploadPathRegex: Schema.optional(Schema.String),
  httpHeaders: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  mimeType: Schema.optional(Schema.String),
  expiration: Schema.optional(Schema.String),
  requireMatchingFile: Schema.optional(Schema.Boolean),
  applicationReadable: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "StaticFilesHandler" }) as any as Schema.Schema<StaticFilesHandler>;

export interface ScriptHandler {
  /** Path to the script from the application root directory. */
  scriptPath?: string;
}

export const ScriptHandler: Schema.Schema<ScriptHandler> = Schema.suspend(() => Schema.Struct({
  scriptPath: Schema.optional(Schema.String),
})).annotate({ identifier: "ScriptHandler" }) as any as Schema.Schema<ScriptHandler>;

export interface ApiEndpointHandler {
  /** Path to the script from the application root directory. */
  scriptPath?: string;
}

export const ApiEndpointHandler: Schema.Schema<ApiEndpointHandler> = Schema.suspend(() => Schema.Struct({
  scriptPath: Schema.optional(Schema.String),
})).annotate({ identifier: "ApiEndpointHandler" }) as any as Schema.Schema<ApiEndpointHandler>;

export interface UrlMap {
  /** URL prefix. Uses regular expression syntax, which means regexp special characters must be escaped, but should not contain groupings. All URLs that begin with this prefix are handled by this handler, using the portion of the URL after the prefix as part of the file path. */
  urlRegex?: string;
  /** Returns the contents of a file, such as an image, as the response. */
  staticFiles?: StaticFilesHandler;
  /** Executes a script to handle the requests that match this URL pattern. Only the auto value is supported for Node.js in the App Engine standard environment, for example "script": "auto". */
  script?: ScriptHandler;
  /** Uses API Endpoints to handle requests. */
  apiEndpoint?: ApiEndpointHandler;
  /** Security (HTTPS) enforcement for this URL. */
  securityLevel?: "SECURE_UNSPECIFIED" | "SECURE_DEFAULT" | "SECURE_NEVER" | "SECURE_OPTIONAL" | "SECURE_ALWAYS" | (string & {});
  /** Level of login required to access this resource. Not supported for Node.js in the App Engine standard environment. */
  login?: "LOGIN_UNSPECIFIED" | "LOGIN_OPTIONAL" | "LOGIN_ADMIN" | "LOGIN_REQUIRED" | (string & {});
  /** Action to take when users access resources that require authentication. Defaults to redirect. */
  authFailAction?: "AUTH_FAIL_ACTION_UNSPECIFIED" | "AUTH_FAIL_ACTION_REDIRECT" | "AUTH_FAIL_ACTION_UNAUTHORIZED" | (string & {});
  /** 30x code to use when performing redirects for the secure field. Defaults to 302. */
  redirectHttpResponseCode?: "REDIRECT_HTTP_RESPONSE_CODE_UNSPECIFIED" | "REDIRECT_HTTP_RESPONSE_CODE_301" | "REDIRECT_HTTP_RESPONSE_CODE_302" | "REDIRECT_HTTP_RESPONSE_CODE_303" | "REDIRECT_HTTP_RESPONSE_CODE_307" | (string & {});
}

export const UrlMap: Schema.Schema<UrlMap> = Schema.suspend(() => Schema.Struct({
  urlRegex: Schema.optional(Schema.String),
  staticFiles: Schema.optional(StaticFilesHandler),
  script: Schema.optional(ScriptHandler),
  apiEndpoint: Schema.optional(ApiEndpointHandler),
  securityLevel: Schema.optional(Schema.String),
  login: Schema.optional(Schema.String),
  authFailAction: Schema.optional(Schema.String),
  redirectHttpResponseCode: Schema.optional(Schema.String),
})).annotate({ identifier: "UrlMap" }) as any as Schema.Schema<UrlMap>;

export interface ErrorHandler {
  /** Error condition this handler applies to. */
  errorCode?: "ERROR_CODE_UNSPECIFIED" | "ERROR_CODE_DEFAULT" | "ERROR_CODE_OVER_QUOTA" | "ERROR_CODE_DOS_API_DENIAL" | "ERROR_CODE_TIMEOUT" | (string & {});
  /** Static file content to be served for this error. */
  staticFile?: string;
  /** MIME type of file. Defaults to text/html. */
  mimeType?: string;
}

export const ErrorHandler: Schema.Schema<ErrorHandler> = Schema.suspend(() => Schema.Struct({
  errorCode: Schema.optional(Schema.String),
  staticFile: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
})).annotate({ identifier: "ErrorHandler" }) as any as Schema.Schema<ErrorHandler>;

export interface Library {
  /** Name of the library. Example: "django". */
  name?: string;
  /** Version of the library to select, or "latest". */
  version?: string;
}

export const Library: Schema.Schema<Library> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "Library" }) as any as Schema.Schema<Library>;

export interface ApiConfigHandler {
  /** Action to take when users access resources that require authentication. Defaults to redirect. */
  authFailAction?: "AUTH_FAIL_ACTION_UNSPECIFIED" | "AUTH_FAIL_ACTION_REDIRECT" | "AUTH_FAIL_ACTION_UNAUTHORIZED" | (string & {});
  /** Level of login required to access this resource. Defaults to optional. */
  login?: "LOGIN_UNSPECIFIED" | "LOGIN_OPTIONAL" | "LOGIN_ADMIN" | "LOGIN_REQUIRED" | (string & {});
  /** Path to the script from the application root directory. */
  script?: string;
  /** Security (HTTPS) enforcement for this URL. */
  securityLevel?: "SECURE_UNSPECIFIED" | "SECURE_DEFAULT" | "SECURE_NEVER" | "SECURE_OPTIONAL" | "SECURE_ALWAYS" | (string & {});
  /** URL to serve the endpoint at. */
  url?: string;
}

export const ApiConfigHandler: Schema.Schema<ApiConfigHandler> = Schema.suspend(() => Schema.Struct({
  authFailAction: Schema.optional(Schema.String),
  login: Schema.optional(Schema.String),
  script: Schema.optional(Schema.String),
  securityLevel: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "ApiConfigHandler" }) as any as Schema.Schema<ApiConfigHandler>;

export interface HealthCheck {
  /** Whether to explicitly disable health checks for this instance. */
  disableHealthCheck?: boolean;
  /** Host header to send when performing an HTTP health check. Example: "myapp.appspot.com" */
  host?: string;
  /** Number of consecutive successful health checks required before receiving traffic. */
  healthyThreshold?: number;
  /** Number of consecutive failed health checks required before removing traffic. */
  unhealthyThreshold?: number;
  /** Number of consecutive failed health checks required before an instance is restarted. */
  restartThreshold?: number;
  /** Interval between health checks. */
  checkInterval?: string;
  /** Time before the health check is considered failed. */
  timeout?: string;
}

export const HealthCheck: Schema.Schema<HealthCheck> = Schema.suspend(() => Schema.Struct({
  disableHealthCheck: Schema.optional(Schema.Boolean),
  host: Schema.optional(Schema.String),
  healthyThreshold: Schema.optional(Schema.Number),
  unhealthyThreshold: Schema.optional(Schema.Number),
  restartThreshold: Schema.optional(Schema.Number),
  checkInterval: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.String),
})).annotate({ identifier: "HealthCheck" }) as any as Schema.Schema<HealthCheck>;

export interface ReadinessCheck {
  /** The request path. */
  path?: string;
  /** Host header to send when performing a HTTP Readiness check. Example: "myapp.appspot.com" */
  host?: string;
  /** Number of consecutive failed checks required before removing traffic. */
  failureThreshold?: number;
  /** Number of consecutive successful checks required before receiving traffic. */
  successThreshold?: number;
  /** Interval between health checks. */
  checkInterval?: string;
  /** Time before the check is considered failed. */
  timeout?: string;
  /** A maximum time limit on application initialization, measured from moment the application successfully replies to a healthcheck until it is ready to serve traffic. */
  appStartTimeout?: string;
}

export const ReadinessCheck: Schema.Schema<ReadinessCheck> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  host: Schema.optional(Schema.String),
  failureThreshold: Schema.optional(Schema.Number),
  successThreshold: Schema.optional(Schema.Number),
  checkInterval: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.String),
  appStartTimeout: Schema.optional(Schema.String),
})).annotate({ identifier: "ReadinessCheck" }) as any as Schema.Schema<ReadinessCheck>;

export interface LivenessCheck {
  /** The request path. */
  path?: string;
  /** Host header to send when performing a HTTP Liveness check. Example: "myapp.appspot.com" */
  host?: string;
  /** Number of consecutive failed checks required before considering the VM unhealthy. */
  failureThreshold?: number;
  /** Number of consecutive successful checks required before considering the VM healthy. */
  successThreshold?: number;
  /** Interval between health checks. */
  checkInterval?: string;
  /** Time before the check is considered failed. */
  timeout?: string;
  /** The initial delay before starting to execute the checks. */
  initialDelay?: string;
}

export const LivenessCheck: Schema.Schema<LivenessCheck> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  host: Schema.optional(Schema.String),
  failureThreshold: Schema.optional(Schema.Number),
  successThreshold: Schema.optional(Schema.Number),
  checkInterval: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.String),
  initialDelay: Schema.optional(Schema.String),
})).annotate({ identifier: "LivenessCheck" }) as any as Schema.Schema<LivenessCheck>;

export interface FileInfo {
  /** URL source to use to fetch this file. Must be a URL to a resource in Google Cloud Storage in the form 'http(s)://storage.googleapis.com//'. */
  sourceUrl?: string;
  /** The SHA1 hash of the file, in hex. */
  sha1Sum?: string;
  /** The MIME type of the file.Defaults to the value from Google Cloud Storage. */
  mimeType?: string;
}

export const FileInfo: Schema.Schema<FileInfo> = Schema.suspend(() => Schema.Struct({
  sourceUrl: Schema.optional(Schema.String),
  sha1Sum: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
})).annotate({ identifier: "FileInfo" }) as any as Schema.Schema<FileInfo>;

export interface ContainerInfo {
  /** URI to the hosted container image in Google Container Registry. The URI must be fully qualified and include a tag or digest. Examples: "gcr.io/my-project/image:tag" or "gcr.io/my-project/image@digest" */
  image?: string;
}

export const ContainerInfo: Schema.Schema<ContainerInfo> = Schema.suspend(() => Schema.Struct({
  image: Schema.optional(Schema.String),
})).annotate({ identifier: "ContainerInfo" }) as any as Schema.Schema<ContainerInfo>;

export interface ZipInfo {
  /** URL of the zip file to deploy from. Must be a URL to a resource in Google Cloud Storage in the form 'http(s)://storage.googleapis.com//'. */
  sourceUrl?: string;
  /** An estimate of the number of files in a zip for a zip deployment. If set, must be greater than or equal to the actual number of files. Used for optimizing performance; if not provided, deployment may be slow. */
  filesCount?: number;
}

export const ZipInfo: Schema.Schema<ZipInfo> = Schema.suspend(() => Schema.Struct({
  sourceUrl: Schema.optional(Schema.String),
  filesCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "ZipInfo" }) as any as Schema.Schema<ZipInfo>;

export interface CloudBuildOptions {
  /** Path to the yaml file used in deployment, used to determine runtime configuration details.Required for flexible environment builds.See https://cloud.google.com/appengine/docs/standard/python/config/appref for more details. */
  appYamlPath?: string;
  /** The Cloud Build timeout used as part of any dependent builds performed by version creation. Defaults to 10 minutes. */
  cloudBuildTimeout?: string;
}

export const CloudBuildOptions: Schema.Schema<CloudBuildOptions> = Schema.suspend(() => Schema.Struct({
  appYamlPath: Schema.optional(Schema.String),
  cloudBuildTimeout: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudBuildOptions" }) as any as Schema.Schema<CloudBuildOptions>;

export interface Deployment {
  /** Manifest of the files stored in Google Cloud Storage that are included as part of this version. All files must be readable using the credentials supplied with this call. */
  files?: Record<string, FileInfo>;
  /** The Docker image for the container that runs the version. Only applicable for instances running in the App Engine flexible environment. */
  container?: ContainerInfo;
  /** The zip file for this deployment, if this is a zip deployment. */
  zip?: ZipInfo;
  /** Options for any Google Cloud Build builds created as a part of this deployment.These options will only be used if a new build is created, such as when deploying to the App Engine flexible environment using files or zip. */
  cloudBuildOptions?: CloudBuildOptions;
}

export const Deployment: Schema.Schema<Deployment> = Schema.suspend(() => Schema.Struct({
  files: Schema.optional(Schema.Record(Schema.String, FileInfo)),
  container: Schema.optional(ContainerInfo),
  zip: Schema.optional(ZipInfo),
  cloudBuildOptions: Schema.optional(CloudBuildOptions),
})).annotate({ identifier: "Deployment" }) as any as Schema.Schema<Deployment>;

export interface EndpointsApiService {
  /** Endpoints service name which is the name of the "service" resource in the Service Management API. For example "myapi.endpoints.myproject.cloud.goog" */
  name?: string;
  /** Endpoints service configuration ID as specified by the Service Management API. For example "2016-09-19r1".By default, the rollout strategy for Endpoints is RolloutStrategy.FIXED. This means that Endpoints starts up with a particular configuration ID. When a new configuration is rolled out, Endpoints must be given the new configuration ID. The config_id field is used to give the configuration ID and is required in this case.Endpoints also has a rollout strategy called RolloutStrategy.MANAGED. When using this, Endpoints fetches the latest configuration and does not need the configuration ID. In this case, config_id must be omitted. */
  configId?: string;
  /** Endpoints rollout strategy. If FIXED, config_id must be specified. If MANAGED, config_id must be omitted. */
  rolloutStrategy?: "UNSPECIFIED_ROLLOUT_STRATEGY" | "FIXED" | "MANAGED" | (string & {});
  /** Enable or disable trace sampling. By default, this is set to false for enabled. */
  disableTraceSampling?: boolean;
}

export const EndpointsApiService: Schema.Schema<EndpointsApiService> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  configId: Schema.optional(Schema.String),
  rolloutStrategy: Schema.optional(Schema.String),
  disableTraceSampling: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EndpointsApiService" }) as any as Schema.Schema<EndpointsApiService>;

export interface Entrypoint {
  /** The format should be a shell command that can be fed to bash -c. */
  shell?: string;
}

export const Entrypoint: Schema.Schema<Entrypoint> = Schema.suspend(() => Schema.Struct({
  shell: Schema.optional(Schema.String),
})).annotate({ identifier: "Entrypoint" }) as any as Schema.Schema<Entrypoint>;

export interface VpcAccessConnector {
  /** Full Serverless VPC Access Connector name e.g. projects/my-project/locations/us-central1/connectors/c1. */
  name?: string;
  /** The egress setting for the connector, controlling what traffic is diverted through it. */
  egressSetting?: "EGRESS_SETTING_UNSPECIFIED" | "ALL_TRAFFIC" | "PRIVATE_IP_RANGES" | (string & {});
}

export const VpcAccessConnector: Schema.Schema<VpcAccessConnector> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  egressSetting: Schema.optional(Schema.String),
})).annotate({ identifier: "VpcAccessConnector" }) as any as Schema.Schema<VpcAccessConnector>;

export interface Version {
  /** Output only. Full path to the Version resource in the API. Example: apps/myapp/services/default/versions/v1.@OutputOnly */
  name?: string;
  /** Relative name of the version within the service. Example: v1. Version names can contain only lowercase letters, numbers, or hyphens. Reserved names: "default", "latest", and any name with the prefix "ah-". */
  id?: string;
  /** Automatic scaling is based on request rate, response latencies, and other application metrics. Instances are dynamically created and destroyed as needed in order to handle traffic. */
  automaticScaling?: AutomaticScaling;
  /** A service with basic scaling will create an instance when the application receives a request. The instance will be turned down when the app becomes idle. Basic scaling is ideal for work that is intermittent or driven by user activity. */
  basicScaling?: BasicScaling;
  /** A service with manual scaling runs continuously, allowing you to perform complex initialization and rely on the state of its memory over time. Manually scaled versions are sometimes referred to as "backends". */
  manualScaling?: ManualScaling;
  /** Before an application can receive email or XMPP messages, the application must be configured to enable the service. */
  inboundServices?: Array<"INBOUND_SERVICE_UNSPECIFIED" | "INBOUND_SERVICE_MAIL" | "INBOUND_SERVICE_MAIL_BOUNCE" | "INBOUND_SERVICE_XMPP_ERROR" | "INBOUND_SERVICE_XMPP_MESSAGE" | "INBOUND_SERVICE_XMPP_SUBSCRIBE" | "INBOUND_SERVICE_XMPP_PRESENCE" | "INBOUND_SERVICE_CHANNEL_PRESENCE" | "INBOUND_SERVICE_WARMUP" | (string & {})>;
  /** Instance class that is used to run this version. Valid values are: AutomaticScaling: F1, F2, F4, F4_1G ManualScaling or BasicScaling: B1, B2, B4, B8, B4_1GDefaults to F1 for AutomaticScaling and B1 for ManualScaling or BasicScaling. */
  instanceClass?: string;
  /** Extra network settings. Only applicable in the App Engine flexible environment. */
  network?: Network;
  /** The Google Compute Engine zones that are supported by this version in the App Engine flexible environment. Deprecated. */
  zones?: Array<string>;
  /** Machine resources for this version. Only applicable in the App Engine flexible environment. */
  resources?: Resources;
  /** Desired runtime. Example: python27. */
  runtime?: string;
  /** The channel of the runtime to use. Only available for some runtimes. Defaults to the default channel. */
  runtimeChannel?: string;
  /** Whether multiple requests can be dispatched to this version at once. */
  threadsafe?: boolean;
  /** Whether to deploy this version in a container on a virtual machine. */
  vm?: boolean;
  /** Settings for App Engine flexible runtimes. */
  flexibleRuntimeSettings?: FlexibleRuntimeSettings;
  /** Allows App Engine second generation runtimes to access the legacy bundled services. */
  appEngineApis?: boolean;
  /** Metadata settings that are supplied to this version to enable beta runtime features. */
  betaSettings?: Record<string, string>;
  /** App Engine execution environment for this version.Defaults to standard. */
  env?: string;
  /** Current serving status of this version. Only the versions with a SERVING status create instances and can be billed.SERVING_STATUS_UNSPECIFIED is an invalid value. Defaults to SERVING. */
  servingStatus?: "SERVING_STATUS_UNSPECIFIED" | "SERVING" | "STOPPED" | (string & {});
  /** Output only. Email address of the user who created this version.@OutputOnly */
  createdBy?: string;
  /** Time that this version was created.@OutputOnly */
  createTime?: string;
  /** Output only. Total size in bytes of all the files that are included in this version and currently hosted on the App Engine disk.@OutputOnly */
  diskUsageBytes?: string;
  /** The version of the API in the given runtime environment. Please see the app.yaml reference for valid values at https://cloud.google.com/appengine/docs/standard//config/appref */
  runtimeApiVersion?: string;
  /** The path or name of the app's main executable. */
  runtimeMainExecutablePath?: string;
  /** The identity that the deployed version will run as. Admin API will use the App Engine Appspot service account as default if this field is neither provided in app.yaml file nor through CLI flag. */
  serviceAccount?: string;
  /** An ordered list of URL-matching patterns that should be applied to incoming requests. The first matching URL handles the request and other request handlers are not attempted.Only returned in GET requests if view=FULL is set. */
  handlers?: Array<UrlMap>;
  /** Custom static error pages. Limited to 10KB per page.Only returned in GET requests if view=FULL is set. */
  errorHandlers?: Array<ErrorHandler>;
  /** Configuration for third-party Python runtime libraries that are required by the application.Only returned in GET requests if view=FULL is set. */
  libraries?: Array<Library>;
  /** Serving configuration for Google Cloud Endpoints (https://cloud.google.com/endpoints).Only returned in GET requests if view=FULL is set. */
  apiConfig?: ApiConfigHandler;
  /** Environment variables available to the application.Only returned in GET requests if view=FULL is set. */
  envVariables?: Record<string, string>;
  /** Environment variables available to the build environment.Only returned in GET requests if view=FULL is set. */
  buildEnvVariables?: Record<string, string>;
  /** Duration that static files should be cached by web proxies and browsers. Only applicable if the corresponding StaticFilesHandler (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StaticFilesHandler) does not specify its own expiration time.Only returned in GET requests if view=FULL is set. */
  defaultExpiration?: string;
  /** Configures health checking for instances. Unhealthy instances are stopped and replaced with new instances. Only applicable in the App Engine flexible environment. */
  healthCheck?: HealthCheck;
  /** Configures readiness health checking for instances. Unhealthy instances are not put into the backend traffic rotation. */
  readinessCheck?: ReadinessCheck;
  /** Configures liveness health checking for instances. Unhealthy instances are stopped and replaced with new instances */
  livenessCheck?: LivenessCheck;
  /** Files that match this pattern will not be built into this version. Only applicable for Go runtimes.Only returned in GET requests if view=FULL is set. */
  nobuildFilesRegex?: string;
  /** Code and application artifacts that make up this version.Only returned in GET requests if view=FULL is set. */
  deployment?: Deployment;
  /** Output only. Serving URL for this version. Example: "https://myversion-dot-myservice-dot-myapp.appspot.com"@OutputOnly */
  versionUrl?: string;
  /** Cloud Endpoints configuration.If endpoints_api_service is set, the Cloud Endpoints Extensible Service Proxy will be provided to serve the API implemented by the app. */
  endpointsApiService?: EndpointsApiService;
  /** The entrypoint for the application. */
  entrypoint?: Entrypoint;
  /** Enables VPC connectivity for standard apps. */
  vpcAccessConnector?: VpcAccessConnector;
  /** Additional Google Generated Customer Metadata, this field won't be provided by default and can be requested by setting the IncludeExtraData field in GetVersionRequest */
  generatedCustomerMetadata?: Record<string, unknown>;
}

export const Version: Schema.Schema<Version> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  automaticScaling: Schema.optional(AutomaticScaling),
  basicScaling: Schema.optional(BasicScaling),
  manualScaling: Schema.optional(ManualScaling),
  inboundServices: Schema.optional(Schema.Array(Schema.String)),
  instanceClass: Schema.optional(Schema.String),
  network: Schema.optional(Network),
  zones: Schema.optional(Schema.Array(Schema.String)),
  resources: Schema.optional(Resources),
  runtime: Schema.optional(Schema.String),
  runtimeChannel: Schema.optional(Schema.String),
  threadsafe: Schema.optional(Schema.Boolean),
  vm: Schema.optional(Schema.Boolean),
  flexibleRuntimeSettings: Schema.optional(FlexibleRuntimeSettings),
  appEngineApis: Schema.optional(Schema.Boolean),
  betaSettings: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  env: Schema.optional(Schema.String),
  servingStatus: Schema.optional(Schema.String),
  createdBy: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  diskUsageBytes: Schema.optional(Schema.String),
  runtimeApiVersion: Schema.optional(Schema.String),
  runtimeMainExecutablePath: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  handlers: Schema.optional(Schema.Array(UrlMap)),
  errorHandlers: Schema.optional(Schema.Array(ErrorHandler)),
  libraries: Schema.optional(Schema.Array(Library)),
  apiConfig: Schema.optional(ApiConfigHandler),
  envVariables: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  buildEnvVariables: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  defaultExpiration: Schema.optional(Schema.String),
  healthCheck: Schema.optional(HealthCheck),
  readinessCheck: Schema.optional(ReadinessCheck),
  livenessCheck: Schema.optional(LivenessCheck),
  nobuildFilesRegex: Schema.optional(Schema.String),
  deployment: Schema.optional(Deployment),
  versionUrl: Schema.optional(Schema.String),
  endpointsApiService: Schema.optional(EndpointsApiService),
  entrypoint: Schema.optional(Entrypoint),
  vpcAccessConnector: Schema.optional(VpcAccessConnector),
  generatedCustomerMetadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Version" }) as any as Schema.Schema<Version>;

export interface ListVersionsResponse {
  /** The versions belonging to the requested service. */
  versions?: Array<Version>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListVersionsResponse: Schema.Schema<ListVersionsResponse> = Schema.suspend(() => Schema.Struct({
  versions: Schema.optional(Schema.Array(Version)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListVersionsResponse" }) as any as Schema.Schema<ListVersionsResponse>;

export interface Instance {
  /** Output only. Full path to the Instance resource in the API. Example: apps/myapp/services/default/versions/v1/instances/instance-1. */
  name?: string;
  /** Output only. Relative name of the instance within the version. Example: instance-1. */
  id?: string;
  /** Output only. App Engine release this instance is running on. */
  appEngineRelease?: string;
  /** Output only. Availability of the instance. */
  availability?: "UNSPECIFIED" | "RESIDENT" | "DYNAMIC" | (string & {});
  /** Output only. Name of the virtual machine where this instance lives. Only applicable for instances in App Engine flexible environment. */
  vmName?: string;
  /** Output only. Zone where the virtual machine is located. Only applicable for instances in App Engine flexible environment. */
  vmZoneName?: string;
  /** Output only. Virtual machine ID of this instance. Only applicable for instances in App Engine flexible environment. */
  vmId?: string;
  /** Output only. Time that this instance was started.@OutputOnly */
  startTime?: string;
  /** Output only. Number of requests since this instance was started. */
  requests?: number;
  /** Output only. Number of errors since this instance was started. */
  errors?: number;
  /** Output only. Average queries per second (QPS) over the last minute. */
  qps?: number;
  /** Output only. Average latency (ms) over the last minute. */
  averageLatency?: number;
  /** Output only. Total memory in use (bytes). */
  memoryUsage?: string;
  /** Output only. Status of the virtual machine where this instance lives. Only applicable for instances in App Engine flexible environment. */
  vmStatus?: string;
  /** Output only. Whether this instance is in debug mode. Only applicable for instances in App Engine flexible environment. */
  vmDebugEnabled?: boolean;
  /** Output only. The IP address of this instance. Only applicable for instances in App Engine flexible environment. */
  vmIp?: string;
  /** Output only. The liveness health check of this instance. Only applicable for instances in App Engine flexible environment. */
  vmLiveness?: "LIVENESS_STATE_UNSPECIFIED" | "UNKNOWN" | "HEALTHY" | "UNHEALTHY" | "DRAINING" | "TIMEOUT" | (string & {});
}

export const Instance: Schema.Schema<Instance> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  appEngineRelease: Schema.optional(Schema.String),
  availability: Schema.optional(Schema.String),
  vmName: Schema.optional(Schema.String),
  vmZoneName: Schema.optional(Schema.String),
  vmId: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  requests: Schema.optional(Schema.Number),
  errors: Schema.optional(Schema.Number),
  qps: Schema.optional(Schema.Number),
  averageLatency: Schema.optional(Schema.Number),
  memoryUsage: Schema.optional(Schema.String),
  vmStatus: Schema.optional(Schema.String),
  vmDebugEnabled: Schema.optional(Schema.Boolean),
  vmIp: Schema.optional(Schema.String),
  vmLiveness: Schema.optional(Schema.String),
})).annotate({ identifier: "Instance" }) as any as Schema.Schema<Instance>;

export interface ListInstancesResponse {
  /** The instances belonging to the requested version. */
  instances?: Array<Instance>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListInstancesResponse: Schema.Schema<ListInstancesResponse> = Schema.suspend(() => Schema.Struct({
  instances: Schema.optional(Schema.Array(Instance)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListInstancesResponse" }) as any as Schema.Schema<ListInstancesResponse>;

export interface DebugInstanceRequest {
  /** Public SSH key to add to the instance. Examples: [USERNAME]:ssh-rsa [KEY_VALUE] [USERNAME] [USERNAME]:ssh-rsa [KEY_VALUE] google-ssh {"userName":"[USERNAME]","expireOn":"[EXPIRE_TIME]"}For more information, see Adding and Removing SSH Keys (https://cloud.google.com/compute/docs/instances/adding-removing-ssh-keys). */
  sshKey?: string;
}

export const DebugInstanceRequest: Schema.Schema<DebugInstanceRequest> = Schema.suspend(() => Schema.Struct({
  sshKey: Schema.optional(Schema.String),
})).annotate({ identifier: "DebugInstanceRequest" }) as any as Schema.Schema<DebugInstanceRequest>;

export interface FirewallRule {
  priority?: number;
  /** The action to take on matched requests. */
  action?: "UNSPECIFIED_ACTION" | "ALLOW" | "DENY" | (string & {});
  /** IP address or range, defined using CIDR notation, of requests that this rule applies to. You can use the wildcard character "*" to match all IPs equivalent to "0/0" and "::/0" together. Examples: 192.168.1.1 or 192.168.0.0/16 or 2001:db8::/32 or 2001:0db8:0000:0042:0000:8a2e:0370:7334. Truncation will be silently performed on addresses which are not properly truncated. For example, 1.2.3.4/24 is accepted as the same address as 1.2.3.0/24. Similarly, for IPv6, 2001:db8::1/32 is accepted as the same address as 2001:db8::/32. */
  sourceRange?: string;
  /** An optional string description of this rule. This field has a maximum length of 400 characters. */
  description?: string;
}

export const FirewallRule: Schema.Schema<FirewallRule> = Schema.suspend(() => Schema.Struct({
  priority: Schema.optional(Schema.Number),
  action: Schema.optional(Schema.String),
  sourceRange: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "FirewallRule" }) as any as Schema.Schema<FirewallRule>;

export interface ListIngressRulesResponse {
  /** The ingress FirewallRules for this application. */
  ingressRules?: Array<FirewallRule>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListIngressRulesResponse: Schema.Schema<ListIngressRulesResponse> = Schema.suspend(() => Schema.Struct({
  ingressRules: Schema.optional(Schema.Array(FirewallRule)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListIngressRulesResponse" }) as any as Schema.Schema<ListIngressRulesResponse>;

export interface BatchUpdateIngressRulesRequest {
  /** A list of FirewallRules to replace the existing set. */
  ingressRules?: Array<FirewallRule>;
}

export const BatchUpdateIngressRulesRequest: Schema.Schema<BatchUpdateIngressRulesRequest> = Schema.suspend(() => Schema.Struct({
  ingressRules: Schema.optional(Schema.Array(FirewallRule)),
})).annotate({ identifier: "BatchUpdateIngressRulesRequest" }) as any as Schema.Schema<BatchUpdateIngressRulesRequest>;

export interface BatchUpdateIngressRulesResponse {
  /** The full list of ingress FirewallRules for this application. */
  ingressRules?: Array<FirewallRule>;
}

export const BatchUpdateIngressRulesResponse: Schema.Schema<BatchUpdateIngressRulesResponse> = Schema.suspend(() => Schema.Struct({
  ingressRules: Schema.optional(Schema.Array(FirewallRule)),
})).annotate({ identifier: "BatchUpdateIngressRulesResponse" }) as any as Schema.Schema<BatchUpdateIngressRulesResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface AuthorizedDomain {
  /** Full path to the AuthorizedDomain resource in the API. Example: apps/myapp/authorizedDomains/example.com.@OutputOnly */
  name?: string;
  /** Fully qualified domain name of the domain authorized for use. Example: example.com. */
  id?: string;
}

export const AuthorizedDomain: Schema.Schema<AuthorizedDomain> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "AuthorizedDomain" }) as any as Schema.Schema<AuthorizedDomain>;

export interface ListAuthorizedDomainsResponse {
  /** The authorized domains belonging to the user. */
  domains?: Array<AuthorizedDomain>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListAuthorizedDomainsResponse: Schema.Schema<ListAuthorizedDomainsResponse> = Schema.suspend(() => Schema.Struct({
  domains: Schema.optional(Schema.Array(AuthorizedDomain)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAuthorizedDomainsResponse" }) as any as Schema.Schema<ListAuthorizedDomainsResponse>;

export interface CertificateRawData {
  /** PEM encoded x.509 public key certificate. This field is set once on certificate creation. Must include the header and footer. Example: -----BEGIN CERTIFICATE----- -----END CERTIFICATE----- */
  publicCertificate?: string;
  /** Unencrypted PEM encoded RSA private key. This field is set once on certificate creation and then encrypted. The key size must be 2048 bits or fewer. Must include the header and footer. Example: -----BEGIN RSA PRIVATE KEY----- -----END RSA PRIVATE KEY----- @InputOnly */
  privateKey?: string;
}

export const CertificateRawData: Schema.Schema<CertificateRawData> = Schema.suspend(() => Schema.Struct({
  publicCertificate: Schema.optional(Schema.String),
  privateKey: Schema.optional(Schema.String),
})).annotate({ identifier: "CertificateRawData" }) as any as Schema.Schema<CertificateRawData>;

export interface ManagedCertificate {
  /** Time at which the certificate was last renewed. The renewal process is fully managed. Certificate renewal will automatically occur before the certificate expires. Renewal errors can be tracked via ManagementStatus.@OutputOnly */
  lastRenewalTime?: string;
  /** Status of certificate management. Refers to the most recent certificate acquisition or renewal attempt.@OutputOnly */
  status?: "MANAGEMENT_STATUS_UNSPECIFIED" | "OK" | "PENDING" | "FAILED_RETRYING_NOT_VISIBLE" | "FAILED_PERMANENT" | "FAILED_RETRYING_CAA_FORBIDDEN" | "FAILED_RETRYING_CAA_CHECKING" | (string & {});
}

export const ManagedCertificate: Schema.Schema<ManagedCertificate> = Schema.suspend(() => Schema.Struct({
  lastRenewalTime: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "ManagedCertificate" }) as any as Schema.Schema<ManagedCertificate>;

export interface AuthorizedCertificate {
  /** Output only. Full path to the AuthorizedCertificate resource in the API. Example: apps/myapp/authorizedCertificates/12345.@OutputOnly */
  name?: string;
  /** Output only. Relative name of the certificate. This is a unique value autogenerated on AuthorizedCertificate resource creation. Example: 12345.@OutputOnly */
  id?: string;
  /** The user-specified display name of the certificate. This is not guaranteed to be unique. Example: My Certificate. */
  displayName?: string;
  /** Output only. Topmost applicable domains of this certificate. This certificate applies to these domains and their subdomains. Example: example.com.@OutputOnly */
  domainNames?: Array<string>;
  /** The time when this certificate expires. To update the renewal time on this certificate, upload an SSL certificate with a different expiration time using AuthorizedCertificates.UpdateAuthorizedCertificate.@OutputOnly */
  expireTime?: string;
  /** The SSL certificate serving the AuthorizedCertificate resource. This must be obtained independently from a certificate authority. */
  certificateRawData?: CertificateRawData;
  /** Only applicable if this certificate is managed by App Engine. Managed certificates are tied to the lifecycle of a DomainMapping and cannot be updated or deleted via the AuthorizedCertificates API. If this certificate is manually administered by the user, this field will be empty.@OutputOnly */
  managedCertificate?: ManagedCertificate;
  /** Output only. The full paths to user visible Domain Mapping resources that have this certificate mapped. Example: apps/myapp/domainMappings/example.com.This may not represent the full list of mapped domain mappings if the user does not have VIEWER permissions on all of the applications that have this certificate mapped. See domain_mappings_count for a complete count.Only returned by GET or LIST requests when specifically requested by the view=FULL_CERTIFICATE option.@OutputOnly */
  visibleDomainMappings?: Array<string>;
  /** Aggregate count of the domain mappings with this certificate mapped. This count includes domain mappings on applications for which the user does not have VIEWER permissions.Only returned by GET or LIST requests when specifically requested by the view=FULL_CERTIFICATE option.@OutputOnly */
  domainMappingsCount?: number;
}

export const AuthorizedCertificate: Schema.Schema<AuthorizedCertificate> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  domainNames: Schema.optional(Schema.Array(Schema.String)),
  expireTime: Schema.optional(Schema.String),
  certificateRawData: Schema.optional(CertificateRawData),
  managedCertificate: Schema.optional(ManagedCertificate),
  visibleDomainMappings: Schema.optional(Schema.Array(Schema.String)),
  domainMappingsCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "AuthorizedCertificate" }) as any as Schema.Schema<AuthorizedCertificate>;

export interface ListAuthorizedCertificatesResponse {
  /** The SSL certificates the user is authorized to administer. */
  certificates?: Array<AuthorizedCertificate>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListAuthorizedCertificatesResponse: Schema.Schema<ListAuthorizedCertificatesResponse> = Schema.suspend(() => Schema.Struct({
  certificates: Schema.optional(Schema.Array(AuthorizedCertificate)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAuthorizedCertificatesResponse" }) as any as Schema.Schema<ListAuthorizedCertificatesResponse>;

export interface SslSettings {
  /** ID of the AuthorizedCertificate resource configuring SSL for the application. Clearing this field will remove SSL support.By default, a managed certificate is automatically created for every domain mapping. To omit SSL support or to configure SSL manually, specify SslManagementType.MANUAL on a CREATE or UPDATE request. You must be authorized to administer the AuthorizedCertificate resource to manually map it to a DomainMapping resource. Example: 12345. */
  certificateId?: string;
  /** SSL management type for this domain. If AUTOMATIC, a managed certificate is automatically provisioned. If MANUAL, certificate_id must be manually specified in order to configure SSL for this domain. */
  sslManagementType?: "SSL_MANAGEMENT_TYPE_UNSPECIFIED" | "AUTOMATIC" | "MANUAL" | (string & {});
  /** Output only. ID of the managed AuthorizedCertificate resource currently being provisioned, if applicable. Until the new managed certificate has been successfully provisioned, the previous SSL state will be preserved. Once the provisioning process completes, the certificate_id field will reflect the new managed certificate and this field will be left empty. To remove SSL support while there is still a pending managed certificate, clear the certificate_id field with an UpdateDomainMappingRequest.@OutputOnly */
  pendingManagedCertificateId?: string;
}

export const SslSettings: Schema.Schema<SslSettings> = Schema.suspend(() => Schema.Struct({
  certificateId: Schema.optional(Schema.String),
  sslManagementType: Schema.optional(Schema.String),
  pendingManagedCertificateId: Schema.optional(Schema.String),
})).annotate({ identifier: "SslSettings" }) as any as Schema.Schema<SslSettings>;

export interface ResourceRecord {
  /** Relative name of the object affected by this record. Only applicable for CNAME records. Example: 'www'. */
  name?: string;
  /** Data for this record. Values vary by record type, as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1). */
  rrdata?: string;
  /** Resource record type. Example: AAAA. */
  type?: "RECORD_TYPE_UNSPECIFIED" | "A" | "AAAA" | "CNAME" | (string & {});
}

export const ResourceRecord: Schema.Schema<ResourceRecord> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  rrdata: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceRecord" }) as any as Schema.Schema<ResourceRecord>;

export interface DomainMapping {
  /** Output only. Full path to the DomainMapping resource in the API. Example: apps/myapp/domainMapping/example.com.@OutputOnly */
  name?: string;
  /** Relative name of the domain serving the application. Example: example.com. */
  id?: string;
  /** SSL configuration for this domain. If unconfigured, this domain will not serve with SSL. */
  sslSettings?: SslSettings;
  /** Output only. The resource records required to configure this domain mapping. These records must be added to the domain's DNS configuration in order to serve the application via this domain mapping.@OutputOnly */
  resourceRecords?: Array<ResourceRecord>;
}

export const DomainMapping: Schema.Schema<DomainMapping> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  sslSettings: Schema.optional(SslSettings),
  resourceRecords: Schema.optional(Schema.Array(ResourceRecord)),
})).annotate({ identifier: "DomainMapping" }) as any as Schema.Schema<DomainMapping>;

export interface ListDomainMappingsResponse {
  /** The domain mappings for the application. */
  domainMappings?: Array<DomainMapping>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListDomainMappingsResponse: Schema.Schema<ListDomainMappingsResponse> = Schema.suspend(() => Schema.Struct({
  domainMappings: Schema.optional(Schema.Array(DomainMapping)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDomainMappingsResponse" }) as any as Schema.Schema<ListDomainMappingsResponse>;

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: "projects/example-project/locations/us-east1" */
  name?: string;
  /** The canonical id for this location. For example: "us-east1". */
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

export interface LocationMetadata {
  /** App Engine standard environment is available in the given location.@OutputOnly */
  standardEnvironmentAvailable?: boolean;
  /** App Engine flexible environment is available in the given location.@OutputOnly */
  flexibleEnvironmentAvailable?: boolean;
  /** Output only. Search API (https://cloud.google.com/appengine/docs/standard/python/search) is available in the given location. */
  searchApiAvailable?: boolean;
}

export const LocationMetadata: Schema.Schema<LocationMetadata> = Schema.suspend(() => Schema.Struct({
  standardEnvironmentAvailable: Schema.optional(Schema.Boolean),
  flexibleEnvironmentAvailable: Schema.optional(Schema.Boolean),
  searchApiAvailable: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "LocationMetadata" }) as any as Schema.Schema<LocationMetadata>;

export interface CreateVersionMetadataV1 {
  /** The Cloud Build ID if one was created as part of the version create. @OutputOnly */
  cloudBuildId?: string;
}

export const CreateVersionMetadataV1: Schema.Schema<CreateVersionMetadataV1> = Schema.suspend(() => Schema.Struct({
  cloudBuildId: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateVersionMetadataV1" }) as any as Schema.Schema<CreateVersionMetadataV1>;

export interface OperationMetadataV1 {
  /** API method that initiated this operation. Example: google.appengine.v1.Versions.CreateVersion.@OutputOnly */
  method?: string;
  /** Time that this operation was created.@OutputOnly */
  insertTime?: string;
  /** Time that this operation completed.@OutputOnly */
  endTime?: string;
  /** User who requested this operation.@OutputOnly */
  user?: string;
  /** Name of the resource that this operation is acting on. Example: apps/myapp/services/default.@OutputOnly */
  target?: string;
  /** Ephemeral message that may change every time the operation is polled. @OutputOnly */
  ephemeralMessage?: string;
  /** Durable messages that persist on every operation poll. @OutputOnly */
  warning?: Array<string>;
  createVersionMetadata?: CreateVersionMetadataV1;
}

export const OperationMetadataV1: Schema.Schema<OperationMetadataV1> = Schema.suspend(() => Schema.Struct({
  method: Schema.optional(Schema.String),
  insertTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  user: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  ephemeralMessage: Schema.optional(Schema.String),
  warning: Schema.optional(Schema.Array(Schema.String)),
  createVersionMetadata: Schema.optional(CreateVersionMetadataV1),
})).annotate({ identifier: "OperationMetadataV1" }) as any as Schema.Schema<OperationMetadataV1>;

export interface CreateVersionMetadataV1Alpha {
  /** The Cloud Build ID if one was created as part of the version create. @OutputOnly */
  cloudBuildId?: string;
}

export const CreateVersionMetadataV1Alpha: Schema.Schema<CreateVersionMetadataV1Alpha> = Schema.suspend(() => Schema.Struct({
  cloudBuildId: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateVersionMetadataV1Alpha" }) as any as Schema.Schema<CreateVersionMetadataV1Alpha>;

export interface OperationMetadataV1Alpha {
  /** API method that initiated this operation. Example: google.appengine.v1alpha.Versions.CreateVersion.@OutputOnly */
  method?: string;
  /** Time that this operation was created.@OutputOnly */
  insertTime?: string;
  /** Time that this operation completed.@OutputOnly */
  endTime?: string;
  /** User who requested this operation.@OutputOnly */
  user?: string;
  /** Name of the resource that this operation is acting on. Example: apps/myapp/services/default.@OutputOnly */
  target?: string;
  /** Ephemeral message that may change every time the operation is polled. @OutputOnly */
  ephemeralMessage?: string;
  /** Durable messages that persist on every operation poll. @OutputOnly */
  warning?: Array<string>;
  createVersionMetadata?: CreateVersionMetadataV1Alpha;
}

export const OperationMetadataV1Alpha: Schema.Schema<OperationMetadataV1Alpha> = Schema.suspend(() => Schema.Struct({
  method: Schema.optional(Schema.String),
  insertTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  user: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  ephemeralMessage: Schema.optional(Schema.String),
  warning: Schema.optional(Schema.Array(Schema.String)),
  createVersionMetadata: Schema.optional(CreateVersionMetadataV1Alpha),
})).annotate({ identifier: "OperationMetadataV1Alpha" }) as any as Schema.Schema<OperationMetadataV1Alpha>;

export interface GoogleAppengineV1betaLocationMetadata {
  /** App Engine standard environment is available in the given location.@OutputOnly */
  standardEnvironmentAvailable?: boolean;
  /** App Engine flexible environment is available in the given location.@OutputOnly */
  flexibleEnvironmentAvailable?: boolean;
  /** Output only. Search API (https://cloud.google.com/appengine/docs/standard/python/search) is available in the given location. */
  searchApiAvailable?: boolean;
}

export const GoogleAppengineV1betaLocationMetadata: Schema.Schema<GoogleAppengineV1betaLocationMetadata> = Schema.suspend(() => Schema.Struct({
  standardEnvironmentAvailable: Schema.optional(Schema.Boolean),
  flexibleEnvironmentAvailable: Schema.optional(Schema.Boolean),
  searchApiAvailable: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleAppengineV1betaLocationMetadata" }) as any as Schema.Schema<GoogleAppengineV1betaLocationMetadata>;

export interface CreateVersionMetadataV1Beta {
  /** The Cloud Build ID if one was created as part of the version create. @OutputOnly */
  cloudBuildId?: string;
}

export const CreateVersionMetadataV1Beta: Schema.Schema<CreateVersionMetadataV1Beta> = Schema.suspend(() => Schema.Struct({
  cloudBuildId: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateVersionMetadataV1Beta" }) as any as Schema.Schema<CreateVersionMetadataV1Beta>;

export interface OperationMetadataV1Beta {
  /** API method that initiated this operation. Example: google.appengine.v1beta.Versions.CreateVersion.@OutputOnly */
  method?: string;
  /** Time that this operation was created.@OutputOnly */
  insertTime?: string;
  /** Time that this operation completed.@OutputOnly */
  endTime?: string;
  /** User who requested this operation.@OutputOnly */
  user?: string;
  /** Name of the resource that this operation is acting on. Example: apps/myapp/services/default.@OutputOnly */
  target?: string;
  /** Ephemeral message that may change every time the operation is polled. @OutputOnly */
  ephemeralMessage?: string;
  /** Durable messages that persist on every operation poll. @OutputOnly */
  warning?: Array<string>;
  createVersionMetadata?: CreateVersionMetadataV1Beta;
}

export const OperationMetadataV1Beta: Schema.Schema<OperationMetadataV1Beta> = Schema.suspend(() => Schema.Struct({
  method: Schema.optional(Schema.String),
  insertTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  user: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  ephemeralMessage: Schema.optional(Schema.String),
  warning: Schema.optional(Schema.Array(Schema.String)),
  createVersionMetadata: Schema.optional(CreateVersionMetadataV1Beta),
})).annotate({ identifier: "OperationMetadataV1Beta" }) as any as Schema.Schema<OperationMetadataV1Beta>;

export interface GceTag {
  /** The administrative_tag name. */
  tag?: string;
  /** The parents(s) of the tag. Eg. projects/123, folders/456 It usually contains only one parent. But, in some corner cases, it can contain multiple parents. Currently, organizations are not supported. */
  parent?: Array<string>;
}

export const GceTag: Schema.Schema<GceTag> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GceTag" }) as any as Schema.Schema<GceTag>;

export interface ProjectsMetadata {
  /** The tenant project number. */
  tenantProjectNumber?: string;
  /** The tenant project id. */
  tenantProjectId?: string;
  /** The service account authorized to operate on the consumer project. Note: CCFE only propagates P4SA with default tag to CLH. */
  p4ServiceAccount?: string;
  /** The producer project id. */
  producerProjectId?: string;
  /** The producer project number. */
  producerProjectNumber?: string;
  /** The consumer project id. */
  consumerProjectId?: string;
  /** The consumer project number. */
  consumerProjectNumber?: string;
  /** The CCFE state of the consumer project. It is the same state that is communicated to the CLH during project events. Notice that this field is not set in the DB, it is only set in this proto when communicated to CLH in the side channel. */
  consumerProjectState?: "UNKNOWN_STATE" | "ON" | "OFF" | "DELETED" | (string & {});
  /** The GCE tags associated with the consumer project and those inherited due to their ancestry, if any. Not supported by CCFE. */
  gceTag?: Array<GceTag>;
  /** DEPRECATED: Indicates whether the GCE project is in the DEPROVISIONING state. This field is a temporary workaround (see b/475310865) to allow GCE extensions to bypass certain checks during deprovisioning. It will be replaced by a permanent solution in the future. */
  isGceProjectDeprovisioning?: boolean;
}

export const ProjectsMetadata: Schema.Schema<ProjectsMetadata> = Schema.suspend(() => Schema.Struct({
  tenantProjectNumber: Schema.optional(Schema.String),
  tenantProjectId: Schema.optional(Schema.String),
  p4ServiceAccount: Schema.optional(Schema.String),
  producerProjectId: Schema.optional(Schema.String),
  producerProjectNumber: Schema.optional(Schema.String),
  consumerProjectId: Schema.optional(Schema.String),
  consumerProjectNumber: Schema.optional(Schema.String),
  consumerProjectState: Schema.optional(Schema.String),
  gceTag: Schema.optional(Schema.Array(GceTag)),
  isGceProjectDeprovisioning: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ProjectsMetadata" }) as any as Schema.Schema<ProjectsMetadata>;

export interface Reasons {
  serviceManagement?: "SERVICE_MANAGEMENT_UNKNOWN_REASON" | "SERVICE_MANAGEMENT_CONTROL_PLANE_SYNC" | "ACTIVATION" | "PREPARE_DEACTIVATION" | "ABORT_DEACTIVATION" | "COMMIT_DEACTIVATION" | (string & {});
  dataGovernance?: "DATA_GOVERNANCE_UNKNOWN_REASON" | "DATA_GOVERNANCE_CONTROL_PLANE_SYNC" | "HIDE" | "UNHIDE" | "PURGE" | (string & {});
  abuse?: "ABUSE_UNKNOWN_REASON" | "ABUSE_CONTROL_PLANE_SYNC" | "SUSPEND" | "REINSTATE" | (string & {});
  billing?: "BILLING_UNKNOWN_REASON" | "BILLING_CONTROL_PLANE_SYNC" | "PROBATION" | "CLOSE" | "OPEN" | (string & {});
  /** Consumer Container denotes if the service is active within a project or not. This information could be used to clean up resources in case service in DISABLED_FULL i.e. Service is inactive > 30 days. */
  serviceActivation?: "SERVICE_ACTIVATION_STATUS_UNSPECIFIED" | "SERVICE_ACTIVATION_ENABLED" | "SERVICE_ACTIVATION_DISABLED" | "SERVICE_ACTIVATION_DISABLED_FULL" | "SERVICE_ACTIVATION_UNKNOWN_REASON" | (string & {});
}

export const Reasons: Schema.Schema<Reasons> = Schema.suspend(() => Schema.Struct({
  serviceManagement: Schema.optional(Schema.String),
  dataGovernance: Schema.optional(Schema.String),
  abuse: Schema.optional(Schema.String),
  billing: Schema.optional(Schema.String),
  serviceActivation: Schema.optional(Schema.String),
})).annotate({ identifier: "Reasons" }) as any as Schema.Schema<Reasons>;

export interface ContainerState {
  /** The current state of the container. This state is the culmination of all of the opinions from external systems that CCFE knows about of the container. */
  state?: "UNKNOWN_STATE" | "ON" | "OFF" | "DELETED" | (string & {});
  /** The previous and current reasons for a container state will be sent for a container event. CLHs that need to know the signal that caused the container event to trigger (edges) as opposed to just knowing the state can act upon differences in the previous and current reasons.Reasons will be provided for every system: service management, data governance, abuse, and billing.If this is a CCFE-triggered event used for reconciliation then the current reasons will be set to their *_CONTROL_PLANE_SYNC state. The previous reasons will contain the last known set of non-unknown non-control_plane_sync reasons for the state. */
  previousReasons?: Reasons;
  currentReasons?: Reasons;
}

export const ContainerState: Schema.Schema<ContainerState> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  previousReasons: Schema.optional(Reasons),
  currentReasons: Schema.optional(Reasons),
})).annotate({ identifier: "ContainerState" }) as any as Schema.Schema<ContainerState>;

export interface ProjectEvent {
  /** The unique ID for this project event. CLHs can use this value to dedup repeated calls. required */
  eventId?: string;
  /** The projects metadata for this project. required */
  projectMetadata?: ProjectsMetadata;
  /** Phase indicates when in the container event propagation this event is being communicated. Events are sent before and after the per-resource events are propagated. required */
  phase?: "CONTAINER_EVENT_PHASE_UNSPECIFIED" | "BEFORE_RESOURCE_HANDLING" | "AFTER_RESOURCE_HANDLING" | (string & {});
  /** The state of the organization that led to this event. */
  state?: ContainerState;
}

export const ProjectEvent: Schema.Schema<ProjectEvent> = Schema.suspend(() => Schema.Struct({
  eventId: Schema.optional(Schema.String),
  projectMetadata: Schema.optional(ProjectsMetadata),
  phase: Schema.optional(Schema.String),
  state: Schema.optional(ContainerState),
})).annotate({ identifier: "ProjectEvent" }) as any as Schema.Schema<ProjectEvent>;

export interface ResourceEvent {
  /** The name of the resource for which this event is. required */
  name?: string;
  /** The unique ID for this per-resource event. CLHs can use this value to dedup repeated calls. required */
  eventId?: string;
  /** The state of the project that led to this event. */
  state?: ContainerState;
}

export const ResourceEvent: Schema.Schema<ResourceEvent> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  eventId: Schema.optional(Schema.String),
  state: Schema.optional(ContainerState),
})).annotate({ identifier: "ResourceEvent" }) as any as Schema.Schema<ResourceEvent>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets information about an application. */
export interface GetAppsRequest {
  /** Part of `name`. Required. Name of the Application resource to get. Example: apps/myapp. */
  appsId: string;
  /** Options to include extra data */
  includeExtraData?: "INCLUDE_EXTRA_DATA_UNSPECIFIED" | "INCLUDE_EXTRA_DATA_NONE" | "INCLUDE_GOOGLE_GENERATED_METADATA" | (string & {});
}

export const GetAppsRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  includeExtraData: Schema.optional(Schema.String).pipe(T.HttpQuery("includeExtraData")),
}).pipe(
  T.Http({ method: "GET", path: "v1/apps/{appsId}" }),
  svc,
) as unknown as Schema.Schema<GetAppsRequest>;

export type GetAppsResponse = Application;
export const GetAppsResponse = Application;

export type GetAppsError = CommonErrors;

export const getApps: API.OperationMethod<GetAppsRequest, GetAppsResponse, GetAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAppsRequest,
  output: GetAppsResponse,
  errors: [],
}));

/** Creates an App Engine application for a Google Cloud Platform project. Required fields: id - The ID of the target Cloud Platform project. location - The region (https://cloud.google.com/appengine/docs/locations) where you want the App Engine application located.For more information about App Engine applications, see Managing Projects, Applications, and Billing (https://cloud.google.com/appengine/docs/standard/python/console/). */
export interface CreateAppsRequest {
  /** Request body */
  body?: Application;
}

export const CreateAppsRequest = Schema.Struct({
  body: Schema.optional(Application).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/apps", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAppsRequest>;

export type CreateAppsResponse = Operation;
export const CreateAppsResponse = Operation;

export type CreateAppsError = CommonErrors;

export const createApps: API.OperationMethod<CreateAppsRequest, CreateAppsResponse, CreateAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAppsRequest,
  output: CreateAppsResponse,
  errors: [],
}));

/** Updates the specified Application resource. You can update the following fields: auth_domain - Google authentication domain for controlling user access to the application. default_cookie_expiration - Cookie expiration policy for the application. iap - Identity-Aware Proxy properties for the application. */
export interface PatchAppsRequest {
  /** Part of `name`. Required. Name of the Application resource to update. Example: apps/myapp. */
  appsId: string;
  /** Required. Standard field mask for the set of fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: Application;
}

export const PatchAppsRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Application).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/apps/{appsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAppsRequest>;

export type PatchAppsResponse = Operation;
export const PatchAppsResponse = Operation;

export type PatchAppsError = CommonErrors;

export const patchApps: API.OperationMethod<PatchAppsRequest, PatchAppsResponse, PatchAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAppsRequest,
  output: PatchAppsResponse,
  errors: [],
}));

/** Recreates the required App Engine features for the specified App Engine application, for example a Cloud Storage bucket or App Engine service account. Use this method if you receive an error message about a missing feature, for example, Error retrieving the App Engine service account. If you have deleted your App Engine service account, this will not be able to recreate it. Instead, you should attempt to use the IAM undelete API if possible at https://cloud.google.com/iam/reference/rest/v1/projects.serviceAccounts/undelete?apix_params=%7B"name"%3A"projects%2F-%2FserviceAccounts%2Funique_id"%2C"resource"%3A%7B%7D%7D . If the deletion was recent, the numeric ID can be found in the Cloud Console Activity Log. */
export interface RepairAppsRequest {
  /** Part of `name`. Required. Name of the application to repair. Example: apps/myapp */
  appsId: string;
  /** Request body */
  body?: RepairApplicationRequest;
}

export const RepairAppsRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  body: Schema.optional(RepairApplicationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/apps/{appsId}:repair", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RepairAppsRequest>;

export type RepairAppsResponse = Operation;
export const RepairAppsResponse = Operation;

export type RepairAppsError = CommonErrors;

export const repairApps: API.OperationMethod<RepairAppsRequest, RepairAppsResponse, RepairAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RepairAppsRequest,
  output: RepairAppsResponse,
  errors: [],
}));

/** Lists all the available runtimes for the application. */
export interface ListRuntimesAppsRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  appsId: string;
  /** Optional. The environment of the Application. */
  environment?: "ENVIRONMENT_UNSPECIFIED" | "STANDARD" | "FLEXIBLE" | (string & {});
}

export const ListRuntimesAppsRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  environment: Schema.optional(Schema.String).pipe(T.HttpQuery("environment")),
}).pipe(
  T.Http({ method: "GET", path: "v1/apps/{appsId}:listRuntimes" }),
  svc,
) as unknown as Schema.Schema<ListRuntimesAppsRequest>;

export type ListRuntimesAppsResponse = ListRuntimesResponse;
export const ListRuntimesAppsResponse = ListRuntimesResponse;

export type ListRuntimesAppsError = CommonErrors;

export const listRuntimesApps: API.OperationMethod<ListRuntimesAppsRequest, ListRuntimesAppsResponse, ListRuntimesAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListRuntimesAppsRequest,
  output: ListRuntimesAppsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED. */
export interface ListAppsOperationsRequest {
  /** Part of `name`. The name of the operation's parent resource. */
  appsId: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.This can only be true when reading across collections. For example, when parent is set to "projects/example/locations/-".This field is not supported by default and will result in an UNIMPLEMENTED error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListAppsOperationsRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/apps/{appsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListAppsOperationsRequest>;

export type ListAppsOperationsResponse = ListOperationsResponse;
export const ListAppsOperationsResponse = ListOperationsResponse;

export type ListAppsOperationsError = CommonErrors;

export const listAppsOperations = API.makePaginated(() => ({
  input: ListAppsOperationsRequest,
  output: ListAppsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetAppsOperationsRequest {
  /** Part of `name`. The name of the operation resource. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  operationsId: string;
}

export const GetAppsOperationsRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  operationsId: Schema.String.pipe(T.HttpPath("operationsId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/apps/{appsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetAppsOperationsRequest>;

export type GetAppsOperationsResponse = Operation;
export const GetAppsOperationsResponse = Operation;

export type GetAppsOperationsError = CommonErrors;

export const getAppsOperations: API.OperationMethod<GetAppsOperationsRequest, GetAppsOperationsResponse, GetAppsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAppsOperationsRequest,
  output: GetAppsOperationsResponse,
  errors: [],
}));

/** Lists all the services in the application. */
export interface ListAppsServicesRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  appsId: string;
  /** Maximum results to return per page. */
  pageSize?: number;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAppsServicesRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/apps/{appsId}/services" }),
  svc,
) as unknown as Schema.Schema<ListAppsServicesRequest>;

export type ListAppsServicesResponse = ListServicesResponse;
export const ListAppsServicesResponse = ListServicesResponse;

export type ListAppsServicesError = CommonErrors;

export const listAppsServices = API.makePaginated(() => ({
  input: ListAppsServicesRequest,
  output: ListAppsServicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the current configuration of the specified service. */
export interface GetAppsServicesRequest {
  /** Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  servicesId: string;
}

export const GetAppsServicesRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  servicesId: Schema.String.pipe(T.HttpPath("servicesId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/apps/{appsId}/services/{servicesId}" }),
  svc,
) as unknown as Schema.Schema<GetAppsServicesRequest>;

export type GetAppsServicesResponse = Service;
export const GetAppsServicesResponse = Service;

export type GetAppsServicesError = CommonErrors;

export const getAppsServices: API.OperationMethod<GetAppsServicesRequest, GetAppsServicesResponse, GetAppsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAppsServicesRequest,
  output: GetAppsServicesResponse,
  errors: [],
}));

/** Updates the configuration of the specified service. */
export interface PatchAppsServicesRequest {
  /** Part of `name`. Required. Name of the resource to update. Example: apps/myapp/services/default. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  servicesId: string;
  /** Required. Standard field mask for the set of fields to be updated. */
  updateMask?: string;
  /** Set to true to gradually shift traffic to one or more versions that you specify. By default, traffic is shifted immediately. For gradual traffic migration, the target versions must be located within instances that are configured for both warmup requests (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#InboundServiceType) and automatic scaling (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#AutomaticScaling). You must specify the shardBy (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services#ShardBy) field in the Service resource. Gradual traffic migration is not supported in the App Engine flexible environment. For examples, see Migrating and Splitting Traffic (https://cloud.google.com/appengine/docs/admin-api/migrating-splitting-traffic). */
  migrateTraffic?: boolean;
  /** Request body */
  body?: Service;
}

export const PatchAppsServicesRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  servicesId: Schema.String.pipe(T.HttpPath("servicesId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  migrateTraffic: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("migrateTraffic")),
  body: Schema.optional(Service).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/apps/{appsId}/services/{servicesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAppsServicesRequest>;

export type PatchAppsServicesResponse = Operation;
export const PatchAppsServicesResponse = Operation;

export type PatchAppsServicesError = CommonErrors;

export const patchAppsServices: API.OperationMethod<PatchAppsServicesRequest, PatchAppsServicesResponse, PatchAppsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAppsServicesRequest,
  output: PatchAppsServicesResponse,
  errors: [],
}));

/** Deletes the specified service and all enclosed versions. */
export interface DeleteAppsServicesRequest {
  /** Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  servicesId: string;
}

export const DeleteAppsServicesRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  servicesId: Schema.String.pipe(T.HttpPath("servicesId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/apps/{appsId}/services/{servicesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAppsServicesRequest>;

export type DeleteAppsServicesResponse = Operation;
export const DeleteAppsServicesResponse = Operation;

export type DeleteAppsServicesError = CommonErrors;

export const deleteAppsServices: API.OperationMethod<DeleteAppsServicesRequest, DeleteAppsServicesResponse, DeleteAppsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAppsServicesRequest,
  output: DeleteAppsServicesResponse,
  errors: [],
}));

/** Lists the versions of a service. */
export interface ListAppsServicesVersionsRequest {
  /** Part of `parent`. Required. Name of the parent Service resource. Example: apps/myapp/services/default. */
  appsId: string;
  /** Part of `parent`. See documentation of `appsId`. */
  servicesId: string;
  /** Controls the set of fields returned in the List response. */
  view?: "BASIC" | "FULL" | (string & {});
  /** Maximum results to return per page. */
  pageSize?: number;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAppsServicesVersionsRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  servicesId: Schema.String.pipe(T.HttpPath("servicesId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/apps/{appsId}/services/{servicesId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListAppsServicesVersionsRequest>;

export type ListAppsServicesVersionsResponse = ListVersionsResponse;
export const ListAppsServicesVersionsResponse = ListVersionsResponse;

export type ListAppsServicesVersionsError = CommonErrors;

export const listAppsServicesVersions = API.makePaginated(() => ({
  input: ListAppsServicesVersionsRequest,
  output: ListAppsServicesVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the specified Version resource. By default, only a BASIC_VIEW will be returned. Specify the FULL_VIEW parameter to get the full resource. */
export interface GetAppsServicesVersionsRequest {
  /** Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default/versions/v1. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  servicesId: string;
  /** Part of `name`. See documentation of `appsId`. */
  versionsId: string;
  /** Controls the set of fields returned in the Get response. */
  view?: "BASIC" | "FULL" | (string & {});
}

export const GetAppsServicesVersionsRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  servicesId: Schema.String.pipe(T.HttpPath("servicesId")),
  versionsId: Schema.String.pipe(T.HttpPath("versionsId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<GetAppsServicesVersionsRequest>;

export type GetAppsServicesVersionsResponse = Version;
export const GetAppsServicesVersionsResponse = Version;

export type GetAppsServicesVersionsError = CommonErrors;

export const getAppsServicesVersions: API.OperationMethod<GetAppsServicesVersionsRequest, GetAppsServicesVersionsResponse, GetAppsServicesVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAppsServicesVersionsRequest,
  output: GetAppsServicesVersionsResponse,
  errors: [],
}));

/** Deploys code and resource files to a new version. */
export interface CreateAppsServicesVersionsRequest {
  /** Part of `parent`. Required. Name of the parent resource to create this version under. Example: apps/myapp/services/default. */
  appsId: string;
  /** Part of `parent`. See documentation of `appsId`. */
  servicesId: string;
  /** Request body */
  body?: Version;
}

export const CreateAppsServicesVersionsRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  servicesId: Schema.String.pipe(T.HttpPath("servicesId")),
  body: Schema.optional(Version).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/apps/{appsId}/services/{servicesId}/versions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAppsServicesVersionsRequest>;

export type CreateAppsServicesVersionsResponse = Operation;
export const CreateAppsServicesVersionsResponse = Operation;

export type CreateAppsServicesVersionsError = CommonErrors;

export const createAppsServicesVersions: API.OperationMethod<CreateAppsServicesVersionsRequest, CreateAppsServicesVersionsResponse, CreateAppsServicesVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAppsServicesVersionsRequest,
  output: CreateAppsServicesVersionsResponse,
  errors: [],
}));

/** Updates the specified Version resource. You can specify the following fields depending on the App Engine environment and type of scaling that the version resource uses:Standard environment instance_class (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.instance_class)automatic scaling in the standard environment: automatic_scaling.min_idle_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automatic_scaling.max_idle_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automaticScaling.standard_scheduler_settings.max_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings) automaticScaling.standard_scheduler_settings.min_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings) automaticScaling.standard_scheduler_settings.target_cpu_utilization (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings) automaticScaling.standard_scheduler_settings.target_throughput_utilization (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings)basic scaling or manual scaling in the standard environment: serving_status (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.serving_status) manual_scaling.instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#manualscaling)Flexible environment serving_status (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.serving_status)automatic scaling in the flexible environment: automatic_scaling.min_total_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automatic_scaling.max_total_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automatic_scaling.cool_down_period_sec (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automatic_scaling.cpu_utilization.target_utilization (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling)manual scaling in the flexible environment: manual_scaling.instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#manualscaling) */
export interface PatchAppsServicesVersionsRequest {
  /** Part of `name`. Required. Name of the resource to update. Example: apps/myapp/services/default/versions/1. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  servicesId: string;
  /** Part of `name`. See documentation of `appsId`. */
  versionsId: string;
  /** Standard field mask for the set of fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: Version;
}

export const PatchAppsServicesVersionsRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  servicesId: Schema.String.pipe(T.HttpPath("servicesId")),
  versionsId: Schema.String.pipe(T.HttpPath("versionsId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Version).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAppsServicesVersionsRequest>;

export type PatchAppsServicesVersionsResponse = Operation;
export const PatchAppsServicesVersionsResponse = Operation;

export type PatchAppsServicesVersionsError = CommonErrors;

export const patchAppsServicesVersions: API.OperationMethod<PatchAppsServicesVersionsRequest, PatchAppsServicesVersionsResponse, PatchAppsServicesVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAppsServicesVersionsRequest,
  output: PatchAppsServicesVersionsResponse,
  errors: [],
}));

/** Deletes an existing Version resource. */
export interface DeleteAppsServicesVersionsRequest {
  /** Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default/versions/v1. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  servicesId: string;
  /** Part of `name`. See documentation of `appsId`. */
  versionsId: string;
}

export const DeleteAppsServicesVersionsRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  servicesId: Schema.String.pipe(T.HttpPath("servicesId")),
  versionsId: Schema.String.pipe(T.HttpPath("versionsId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAppsServicesVersionsRequest>;

export type DeleteAppsServicesVersionsResponse = Operation;
export const DeleteAppsServicesVersionsResponse = Operation;

export type DeleteAppsServicesVersionsError = CommonErrors;

export const deleteAppsServicesVersions: API.OperationMethod<DeleteAppsServicesVersionsRequest, DeleteAppsServicesVersionsResponse, DeleteAppsServicesVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAppsServicesVersionsRequest,
  output: DeleteAppsServicesVersionsResponse,
  errors: [],
}));

/** Lists the instances of a version.Tip: To aggregate details about instances over time, see the Stackdriver Monitoring API (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list). */
export interface ListAppsServicesVersionsInstancesRequest {
  /** Part of `parent`. Required. Name of the parent Version resource. Example: apps/myapp/services/default/versions/v1. */
  appsId: string;
  /** Part of `parent`. See documentation of `appsId`. */
  servicesId: string;
  /** Part of `parent`. See documentation of `appsId`. */
  versionsId: string;
  /** Maximum results to return per page. */
  pageSize?: number;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAppsServicesVersionsInstancesRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  servicesId: Schema.String.pipe(T.HttpPath("servicesId")),
  versionsId: Schema.String.pipe(T.HttpPath("versionsId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}/instances" }),
  svc,
) as unknown as Schema.Schema<ListAppsServicesVersionsInstancesRequest>;

export type ListAppsServicesVersionsInstancesResponse = ListInstancesResponse;
export const ListAppsServicesVersionsInstancesResponse = ListInstancesResponse;

export type ListAppsServicesVersionsInstancesError = CommonErrors;

export const listAppsServicesVersionsInstances = API.makePaginated(() => ({
  input: ListAppsServicesVersionsInstancesRequest,
  output: ListAppsServicesVersionsInstancesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets instance information. */
export interface GetAppsServicesVersionsInstancesRequest {
  /** Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  servicesId: string;
  /** Part of `name`. See documentation of `appsId`. */
  versionsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  instancesId: string;
}

export const GetAppsServicesVersionsInstancesRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  servicesId: Schema.String.pipe(T.HttpPath("servicesId")),
  versionsId: Schema.String.pipe(T.HttpPath("versionsId")),
  instancesId: Schema.String.pipe(T.HttpPath("instancesId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}/instances/{instancesId}" }),
  svc,
) as unknown as Schema.Schema<GetAppsServicesVersionsInstancesRequest>;

export type GetAppsServicesVersionsInstancesResponse = Instance;
export const GetAppsServicesVersionsInstancesResponse = Instance;

export type GetAppsServicesVersionsInstancesError = CommonErrors;

export const getAppsServicesVersionsInstances: API.OperationMethod<GetAppsServicesVersionsInstancesRequest, GetAppsServicesVersionsInstancesResponse, GetAppsServicesVersionsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAppsServicesVersionsInstancesRequest,
  output: GetAppsServicesVersionsInstancesResponse,
  errors: [],
}));

/** Stops a running instance.The instance might be automatically recreated based on the scaling settings of the version. For more information, see "How Instances are Managed" (standard environment (https://cloud.google.com/appengine/docs/standard/python/how-instances-are-managed) | flexible environment (https://cloud.google.com/appengine/docs/flexible/python/how-instances-are-managed)).To ensure that instances are not re-created and avoid getting billed, you can stop all instances within the target version by changing the serving status of the version to STOPPED with the apps.services.versions.patch (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions/patch) method. */
export interface DeleteAppsServicesVersionsInstancesRequest {
  /** Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  servicesId: string;
  /** Part of `name`. See documentation of `appsId`. */
  versionsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  instancesId: string;
}

export const DeleteAppsServicesVersionsInstancesRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  servicesId: Schema.String.pipe(T.HttpPath("servicesId")),
  versionsId: Schema.String.pipe(T.HttpPath("versionsId")),
  instancesId: Schema.String.pipe(T.HttpPath("instancesId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}/instances/{instancesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAppsServicesVersionsInstancesRequest>;

export type DeleteAppsServicesVersionsInstancesResponse = Operation;
export const DeleteAppsServicesVersionsInstancesResponse = Operation;

export type DeleteAppsServicesVersionsInstancesError = CommonErrors;

export const deleteAppsServicesVersionsInstances: API.OperationMethod<DeleteAppsServicesVersionsInstancesRequest, DeleteAppsServicesVersionsInstancesResponse, DeleteAppsServicesVersionsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAppsServicesVersionsInstancesRequest,
  output: DeleteAppsServicesVersionsInstancesResponse,
  errors: [],
}));

/** Enables debugging on a VM instance. This allows you to use the SSH command to connect to the virtual machine where the instance lives. While in "debug mode", the instance continues to serve live traffic. You should delete the instance when you are done debugging and then allow the system to take over and determine if another instance should be started.Only applicable for instances in App Engine flexible environment. */
export interface DebugAppsServicesVersionsInstancesRequest {
  /** Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  servicesId: string;
  /** Part of `name`. See documentation of `appsId`. */
  versionsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  instancesId: string;
  /** Request body */
  body?: DebugInstanceRequest;
}

export const DebugAppsServicesVersionsInstancesRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  servicesId: Schema.String.pipe(T.HttpPath("servicesId")),
  versionsId: Schema.String.pipe(T.HttpPath("versionsId")),
  instancesId: Schema.String.pipe(T.HttpPath("instancesId")),
  body: Schema.optional(DebugInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}/instances/{instancesId}:debug", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DebugAppsServicesVersionsInstancesRequest>;

export type DebugAppsServicesVersionsInstancesResponse = Operation;
export const DebugAppsServicesVersionsInstancesResponse = Operation;

export type DebugAppsServicesVersionsInstancesError = CommonErrors;

export const debugAppsServicesVersionsInstances: API.OperationMethod<DebugAppsServicesVersionsInstancesRequest, DebugAppsServicesVersionsInstancesResponse, DebugAppsServicesVersionsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DebugAppsServicesVersionsInstancesRequest,
  output: DebugAppsServicesVersionsInstancesResponse,
  errors: [],
}));

/** Lists the firewall rules of an application. */
export interface ListAppsFirewallIngressRulesRequest {
  /** Part of `parent`. Name of the Firewall collection to retrieve. Example: apps/myapp/firewall/ingressRules. */
  appsId: string;
  /** Maximum results to return per page. */
  pageSize?: number;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
  /** A valid IP Address. If set, only rules matching this address will be returned. The first returned rule will be the rule that fires on requests from this IP. */
  matchingAddress?: string;
}

export const ListAppsFirewallIngressRulesRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  matchingAddress: Schema.optional(Schema.String).pipe(T.HttpQuery("matchingAddress")),
}).pipe(
  T.Http({ method: "GET", path: "v1/apps/{appsId}/firewall/ingressRules" }),
  svc,
) as unknown as Schema.Schema<ListAppsFirewallIngressRulesRequest>;

export type ListAppsFirewallIngressRulesResponse = ListIngressRulesResponse;
export const ListAppsFirewallIngressRulesResponse = ListIngressRulesResponse;

export type ListAppsFirewallIngressRulesError = CommonErrors;

export const listAppsFirewallIngressRules = API.makePaginated(() => ({
  input: ListAppsFirewallIngressRulesRequest,
  output: ListAppsFirewallIngressRulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Replaces the entire firewall ruleset in one bulk operation. This overrides and replaces the rules of an existing firewall with the new rules.If the final rule does not match traffic with the '*' wildcard IP range, then an "allow all" rule is explicitly added to the end of the list. */
export interface BatchUpdateAppsFirewallIngressRulesRequest {
  /** Part of `name`. Name of the Firewall collection to set. Example: apps/myapp/firewall/ingressRules. */
  appsId: string;
  /** Request body */
  body?: BatchUpdateIngressRulesRequest;
}

export const BatchUpdateAppsFirewallIngressRulesRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  body: Schema.optional(BatchUpdateIngressRulesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/apps/{appsId}/firewall/ingressRules:batchUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateAppsFirewallIngressRulesRequest>;

export type BatchUpdateAppsFirewallIngressRulesResponse = BatchUpdateIngressRulesResponse;
export const BatchUpdateAppsFirewallIngressRulesResponse = BatchUpdateIngressRulesResponse;

export type BatchUpdateAppsFirewallIngressRulesError = CommonErrors;

export const batchUpdateAppsFirewallIngressRules: API.OperationMethod<BatchUpdateAppsFirewallIngressRulesRequest, BatchUpdateAppsFirewallIngressRulesResponse, BatchUpdateAppsFirewallIngressRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateAppsFirewallIngressRulesRequest,
  output: BatchUpdateAppsFirewallIngressRulesResponse,
  errors: [],
}));

/** Creates a firewall rule for the application. */
export interface CreateAppsFirewallIngressRulesRequest {
  /** Part of `parent`. Required. Name of the parent Firewall collection in which to create a new rule. Example: apps/myapp/firewall/ingressRules. */
  appsId: string;
  /** Request body */
  body?: FirewallRule;
}

export const CreateAppsFirewallIngressRulesRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  body: Schema.optional(FirewallRule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/apps/{appsId}/firewall/ingressRules", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAppsFirewallIngressRulesRequest>;

export type CreateAppsFirewallIngressRulesResponse = FirewallRule;
export const CreateAppsFirewallIngressRulesResponse = FirewallRule;

export type CreateAppsFirewallIngressRulesError = CommonErrors;

export const createAppsFirewallIngressRules: API.OperationMethod<CreateAppsFirewallIngressRulesRequest, CreateAppsFirewallIngressRulesResponse, CreateAppsFirewallIngressRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAppsFirewallIngressRulesRequest,
  output: CreateAppsFirewallIngressRulesResponse,
  errors: [],
}));

/** Gets the specified firewall rule. */
export interface GetAppsFirewallIngressRulesRequest {
  /** Part of `name`. Name of the Firewall resource to retrieve. Example: apps/myapp/firewall/ingressRules/100. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  ingressRulesId: string;
}

export const GetAppsFirewallIngressRulesRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  ingressRulesId: Schema.String.pipe(T.HttpPath("ingressRulesId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/apps/{appsId}/firewall/ingressRules/{ingressRulesId}" }),
  svc,
) as unknown as Schema.Schema<GetAppsFirewallIngressRulesRequest>;

export type GetAppsFirewallIngressRulesResponse = FirewallRule;
export const GetAppsFirewallIngressRulesResponse = FirewallRule;

export type GetAppsFirewallIngressRulesError = CommonErrors;

export const getAppsFirewallIngressRules: API.OperationMethod<GetAppsFirewallIngressRulesRequest, GetAppsFirewallIngressRulesResponse, GetAppsFirewallIngressRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAppsFirewallIngressRulesRequest,
  output: GetAppsFirewallIngressRulesResponse,
  errors: [],
}));

/** Updates the specified firewall rule. */
export interface PatchAppsFirewallIngressRulesRequest {
  /** Part of `name`. Name of the Firewall resource to update. Example: apps/myapp/firewall/ingressRules/100. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  ingressRulesId: string;
  /** Standard field mask for the set of fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: FirewallRule;
}

export const PatchAppsFirewallIngressRulesRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  ingressRulesId: Schema.String.pipe(T.HttpPath("ingressRulesId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(FirewallRule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/apps/{appsId}/firewall/ingressRules/{ingressRulesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAppsFirewallIngressRulesRequest>;

export type PatchAppsFirewallIngressRulesResponse = FirewallRule;
export const PatchAppsFirewallIngressRulesResponse = FirewallRule;

export type PatchAppsFirewallIngressRulesError = CommonErrors;

export const patchAppsFirewallIngressRules: API.OperationMethod<PatchAppsFirewallIngressRulesRequest, PatchAppsFirewallIngressRulesResponse, PatchAppsFirewallIngressRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAppsFirewallIngressRulesRequest,
  output: PatchAppsFirewallIngressRulesResponse,
  errors: [],
}));

/** Deletes the specified firewall rule. */
export interface DeleteAppsFirewallIngressRulesRequest {
  /** Part of `name`. Name of the Firewall resource to delete. Example: apps/myapp/firewall/ingressRules/100. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  ingressRulesId: string;
}

export const DeleteAppsFirewallIngressRulesRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  ingressRulesId: Schema.String.pipe(T.HttpPath("ingressRulesId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/apps/{appsId}/firewall/ingressRules/{ingressRulesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAppsFirewallIngressRulesRequest>;

export type DeleteAppsFirewallIngressRulesResponse = Empty;
export const DeleteAppsFirewallIngressRulesResponse = Empty;

export type DeleteAppsFirewallIngressRulesError = CommonErrors;

export const deleteAppsFirewallIngressRules: API.OperationMethod<DeleteAppsFirewallIngressRulesRequest, DeleteAppsFirewallIngressRulesResponse, DeleteAppsFirewallIngressRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAppsFirewallIngressRulesRequest,
  output: DeleteAppsFirewallIngressRulesResponse,
  errors: [],
}));

/** Lists all domains the user is authorized to administer. */
export interface ListAppsAuthorizedDomainsRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  appsId: string;
  /** Maximum results to return per page. */
  pageSize?: number;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAppsAuthorizedDomainsRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/apps/{appsId}/authorizedDomains" }),
  svc,
) as unknown as Schema.Schema<ListAppsAuthorizedDomainsRequest>;

export type ListAppsAuthorizedDomainsResponse = ListAuthorizedDomainsResponse;
export const ListAppsAuthorizedDomainsResponse = ListAuthorizedDomainsResponse;

export type ListAppsAuthorizedDomainsError = CommonErrors;

export const listAppsAuthorizedDomains = API.makePaginated(() => ({
  input: ListAppsAuthorizedDomainsRequest,
  output: ListAppsAuthorizedDomainsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists all SSL certificates the user is authorized to administer. */
export interface ListAppsAuthorizedCertificatesRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  appsId: string;
  /** Controls the set of fields returned in the LIST response. */
  view?: "BASIC_CERTIFICATE" | "FULL_CERTIFICATE" | (string & {});
  /** Maximum results to return per page. */
  pageSize?: number;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAppsAuthorizedCertificatesRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/apps/{appsId}/authorizedCertificates" }),
  svc,
) as unknown as Schema.Schema<ListAppsAuthorizedCertificatesRequest>;

export type ListAppsAuthorizedCertificatesResponse = ListAuthorizedCertificatesResponse;
export const ListAppsAuthorizedCertificatesResponse = ListAuthorizedCertificatesResponse;

export type ListAppsAuthorizedCertificatesError = CommonErrors;

export const listAppsAuthorizedCertificates = API.makePaginated(() => ({
  input: ListAppsAuthorizedCertificatesRequest,
  output: ListAppsAuthorizedCertificatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the specified SSL certificate. */
export interface GetAppsAuthorizedCertificatesRequest {
  /** Part of `name`. Required. Name of the resource requested. Example: apps/myapp/authorizedCertificates/12345. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  authorizedCertificatesId: string;
  /** Controls the set of fields returned in the GET response. */
  view?: "BASIC_CERTIFICATE" | "FULL_CERTIFICATE" | (string & {});
}

export const GetAppsAuthorizedCertificatesRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  authorizedCertificatesId: Schema.String.pipe(T.HttpPath("authorizedCertificatesId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/apps/{appsId}/authorizedCertificates/{authorizedCertificatesId}" }),
  svc,
) as unknown as Schema.Schema<GetAppsAuthorizedCertificatesRequest>;

export type GetAppsAuthorizedCertificatesResponse = AuthorizedCertificate;
export const GetAppsAuthorizedCertificatesResponse = AuthorizedCertificate;

export type GetAppsAuthorizedCertificatesError = CommonErrors;

export const getAppsAuthorizedCertificates: API.OperationMethod<GetAppsAuthorizedCertificatesRequest, GetAppsAuthorizedCertificatesResponse, GetAppsAuthorizedCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAppsAuthorizedCertificatesRequest,
  output: GetAppsAuthorizedCertificatesResponse,
  errors: [],
}));

/** Uploads the specified SSL certificate. */
export interface CreateAppsAuthorizedCertificatesRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  appsId: string;
  /** Request body */
  body?: AuthorizedCertificate;
}

export const CreateAppsAuthorizedCertificatesRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  body: Schema.optional(AuthorizedCertificate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/apps/{appsId}/authorizedCertificates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAppsAuthorizedCertificatesRequest>;

export type CreateAppsAuthorizedCertificatesResponse = AuthorizedCertificate;
export const CreateAppsAuthorizedCertificatesResponse = AuthorizedCertificate;

export type CreateAppsAuthorizedCertificatesError = CommonErrors;

export const createAppsAuthorizedCertificates: API.OperationMethod<CreateAppsAuthorizedCertificatesRequest, CreateAppsAuthorizedCertificatesResponse, CreateAppsAuthorizedCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAppsAuthorizedCertificatesRequest,
  output: CreateAppsAuthorizedCertificatesResponse,
  errors: [],
}));

/** Updates the specified SSL certificate. To renew a certificate and maintain its existing domain mappings, update certificate_data with a new certificate. The new certificate must be applicable to the same domains as the original certificate. The certificate display_name may also be updated. */
export interface PatchAppsAuthorizedCertificatesRequest {
  /** Part of `name`. Required. Name of the resource to update. Example: apps/myapp/authorizedCertificates/12345. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  authorizedCertificatesId: string;
  /** Standard field mask for the set of fields to be updated. Updates are only supported on the certificate_raw_data and display_name fields. */
  updateMask?: string;
  /** Request body */
  body?: AuthorizedCertificate;
}

export const PatchAppsAuthorizedCertificatesRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  authorizedCertificatesId: Schema.String.pipe(T.HttpPath("authorizedCertificatesId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AuthorizedCertificate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/apps/{appsId}/authorizedCertificates/{authorizedCertificatesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAppsAuthorizedCertificatesRequest>;

export type PatchAppsAuthorizedCertificatesResponse = AuthorizedCertificate;
export const PatchAppsAuthorizedCertificatesResponse = AuthorizedCertificate;

export type PatchAppsAuthorizedCertificatesError = CommonErrors;

export const patchAppsAuthorizedCertificates: API.OperationMethod<PatchAppsAuthorizedCertificatesRequest, PatchAppsAuthorizedCertificatesResponse, PatchAppsAuthorizedCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAppsAuthorizedCertificatesRequest,
  output: PatchAppsAuthorizedCertificatesResponse,
  errors: [],
}));

/** Deletes the specified SSL certificate. */
export interface DeleteAppsAuthorizedCertificatesRequest {
  /** Part of `name`. Required. Name of the resource to delete. Example: apps/myapp/authorizedCertificates/12345. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  authorizedCertificatesId: string;
}

export const DeleteAppsAuthorizedCertificatesRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  authorizedCertificatesId: Schema.String.pipe(T.HttpPath("authorizedCertificatesId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/apps/{appsId}/authorizedCertificates/{authorizedCertificatesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAppsAuthorizedCertificatesRequest>;

export type DeleteAppsAuthorizedCertificatesResponse = Empty;
export const DeleteAppsAuthorizedCertificatesResponse = Empty;

export type DeleteAppsAuthorizedCertificatesError = CommonErrors;

export const deleteAppsAuthorizedCertificates: API.OperationMethod<DeleteAppsAuthorizedCertificatesRequest, DeleteAppsAuthorizedCertificatesResponse, DeleteAppsAuthorizedCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAppsAuthorizedCertificatesRequest,
  output: DeleteAppsAuthorizedCertificatesResponse,
  errors: [],
}));

/** Lists the domain mappings on an application. */
export interface ListAppsDomainMappingsRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  appsId: string;
  /** Maximum results to return per page. */
  pageSize?: number;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAppsDomainMappingsRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/apps/{appsId}/domainMappings" }),
  svc,
) as unknown as Schema.Schema<ListAppsDomainMappingsRequest>;

export type ListAppsDomainMappingsResponse = ListDomainMappingsResponse;
export const ListAppsDomainMappingsResponse = ListDomainMappingsResponse;

export type ListAppsDomainMappingsError = CommonErrors;

export const listAppsDomainMappings = API.makePaginated(() => ({
  input: ListAppsDomainMappingsRequest,
  output: ListAppsDomainMappingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the specified domain mapping. */
export interface GetAppsDomainMappingsRequest {
  /** Part of `name`. Required. Name of the resource requested. Example: apps/myapp/domainMappings/example.com. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  domainMappingsId: string;
}

export const GetAppsDomainMappingsRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  domainMappingsId: Schema.String.pipe(T.HttpPath("domainMappingsId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/apps/{appsId}/domainMappings/{domainMappingsId}" }),
  svc,
) as unknown as Schema.Schema<GetAppsDomainMappingsRequest>;

export type GetAppsDomainMappingsResponse = DomainMapping;
export const GetAppsDomainMappingsResponse = DomainMapping;

export type GetAppsDomainMappingsError = CommonErrors;

export const getAppsDomainMappings: API.OperationMethod<GetAppsDomainMappingsRequest, GetAppsDomainMappingsResponse, GetAppsDomainMappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAppsDomainMappingsRequest,
  output: GetAppsDomainMappingsResponse,
  errors: [],
}));

/** Maps a domain to an application. A user must be authorized to administer a domain in order to map it to an application. For a list of available authorized domains, see AuthorizedDomains.ListAuthorizedDomains. */
export interface CreateAppsDomainMappingsRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  appsId: string;
  /** Whether the domain creation should override any existing mappings for this domain. By default, overrides are rejected. */
  overrideStrategy?: "UNSPECIFIED_DOMAIN_OVERRIDE_STRATEGY" | "STRICT" | "OVERRIDE" | (string & {});
  /** Request body */
  body?: DomainMapping;
}

export const CreateAppsDomainMappingsRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  overrideStrategy: Schema.optional(Schema.String).pipe(T.HttpQuery("overrideStrategy")),
  body: Schema.optional(DomainMapping).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/apps/{appsId}/domainMappings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAppsDomainMappingsRequest>;

export type CreateAppsDomainMappingsResponse = Operation;
export const CreateAppsDomainMappingsResponse = Operation;

export type CreateAppsDomainMappingsError = CommonErrors;

export const createAppsDomainMappings: API.OperationMethod<CreateAppsDomainMappingsRequest, CreateAppsDomainMappingsResponse, CreateAppsDomainMappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAppsDomainMappingsRequest,
  output: CreateAppsDomainMappingsResponse,
  errors: [],
}));

/** Updates the specified domain mapping. To map an SSL certificate to a domain mapping, update certificate_id to point to an AuthorizedCertificate resource. A user must be authorized to administer the associated domain in order to update a DomainMapping resource. */
export interface PatchAppsDomainMappingsRequest {
  /** Part of `name`. Required. Name of the resource to update. Example: apps/myapp/domainMappings/example.com. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  domainMappingsId: string;
  /** Required. Standard field mask for the set of fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: DomainMapping;
}

export const PatchAppsDomainMappingsRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  domainMappingsId: Schema.String.pipe(T.HttpPath("domainMappingsId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(DomainMapping).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/apps/{appsId}/domainMappings/{domainMappingsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAppsDomainMappingsRequest>;

export type PatchAppsDomainMappingsResponse = Operation;
export const PatchAppsDomainMappingsResponse = Operation;

export type PatchAppsDomainMappingsError = CommonErrors;

export const patchAppsDomainMappings: API.OperationMethod<PatchAppsDomainMappingsRequest, PatchAppsDomainMappingsResponse, PatchAppsDomainMappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAppsDomainMappingsRequest,
  output: PatchAppsDomainMappingsResponse,
  errors: [],
}));

/** Deletes the specified domain mapping. A user must be authorized to administer the associated domain in order to delete a DomainMapping resource. */
export interface DeleteAppsDomainMappingsRequest {
  /** Part of `name`. Required. Name of the resource to delete. Example: apps/myapp/domainMappings/example.com. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  domainMappingsId: string;
}

export const DeleteAppsDomainMappingsRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  domainMappingsId: Schema.String.pipe(T.HttpPath("domainMappingsId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/apps/{appsId}/domainMappings/{domainMappingsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAppsDomainMappingsRequest>;

export type DeleteAppsDomainMappingsResponse = Operation;
export const DeleteAppsDomainMappingsResponse = Operation;

export type DeleteAppsDomainMappingsError = CommonErrors;

export const deleteAppsDomainMappings: API.OperationMethod<DeleteAppsDomainMappingsRequest, DeleteAppsDomainMappingsResponse, DeleteAppsDomainMappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAppsDomainMappingsRequest,
  output: DeleteAppsDomainMappingsResponse,
  errors: [],
}));

/** Lists information about the supported locations for this service. This method can be called in two ways: List all public locations: Use the path GET /v1/locations. List project-visible locations: Use the path GET /v1/projects/{project_id}/locations. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListAppsLocationsRequest {
  /** Part of `name`. The resource that owns the locations collection, if applicable. */
  appsId: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like "displayName=tokyo", and is documented in more detail in AIP-160 (https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the next_page_token field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListAppsLocationsRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v1/apps/{appsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListAppsLocationsRequest>;

export type ListAppsLocationsResponse = ListLocationsResponse;
export const ListAppsLocationsResponse = ListLocationsResponse;

export type ListAppsLocationsError = CommonErrors;

export const listAppsLocations = API.makePaginated(() => ({
  input: ListAppsLocationsRequest,
  output: ListAppsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetAppsLocationsRequest {
  /** Part of `name`. Resource name for the location. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  locationsId: string;
}

export const GetAppsLocationsRequest = Schema.Struct({
  appsId: Schema.String.pipe(T.HttpPath("appsId")),
  locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/apps/{appsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetAppsLocationsRequest>;

export type GetAppsLocationsResponse = Location;
export const GetAppsLocationsResponse = Location;

export type GetAppsLocationsError = CommonErrors;

export const getAppsLocations: API.OperationMethod<GetAppsLocationsRequest, GetAppsLocationsResponse, GetAppsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAppsLocationsRequest,
  output: GetAppsLocationsResponse,
  errors: [],
}));

/** Updates the specified Application resource. You can update the following fields: auth_domain - Google authentication domain for controlling user access to the application. default_cookie_expiration - Cookie expiration policy for the application. iap - Identity-Aware Proxy properties for the application. */
export interface PatchProjectsLocationsApplicationsRequest {
  /** Part of `name`. Required. Name of the Application resource to update. Example: apps/myapp. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Required. Standard field mask for the set of fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: Application;
}

export const PatchProjectsLocationsApplicationsRequest = Schema.Struct({
  projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
  locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
  applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Application).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsApplicationsRequest>;

export type PatchProjectsLocationsApplicationsResponse = Operation;
export const PatchProjectsLocationsApplicationsResponse = Operation;

export type PatchProjectsLocationsApplicationsError = CommonErrors;

export const patchProjectsLocationsApplications: API.OperationMethod<PatchProjectsLocationsApplicationsRequest, PatchProjectsLocationsApplicationsResponse, PatchProjectsLocationsApplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsApplicationsRequest,
  output: PatchProjectsLocationsApplicationsResponse,
  errors: [],
}));

/** Updates the configuration of the specified service. */
export interface PatchProjectsLocationsApplicationsServicesRequest {
  /** Part of `name`. Required. Name of the resource to update. Example: apps/myapp/services/default. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  servicesId: string;
  /** Required. Standard field mask for the set of fields to be updated. */
  updateMask?: string;
  /** Set to true to gradually shift traffic to one or more versions that you specify. By default, traffic is shifted immediately. For gradual traffic migration, the target versions must be located within instances that are configured for both warmup requests (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#InboundServiceType) and automatic scaling (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#AutomaticScaling). You must specify the shardBy (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services#ShardBy) field in the Service resource. Gradual traffic migration is not supported in the App Engine flexible environment. For examples, see Migrating and Splitting Traffic (https://cloud.google.com/appengine/docs/admin-api/migrating-splitting-traffic). */
  migrateTraffic?: boolean;
  /** Request body */
  body?: Service;
}

export const PatchProjectsLocationsApplicationsServicesRequest = Schema.Struct({
  projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
  locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
  applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
  servicesId: Schema.String.pipe(T.HttpPath("servicesId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  migrateTraffic: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("migrateTraffic")),
  body: Schema.optional(Service).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/services/{servicesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsApplicationsServicesRequest>;

export type PatchProjectsLocationsApplicationsServicesResponse = Operation;
export const PatchProjectsLocationsApplicationsServicesResponse = Operation;

export type PatchProjectsLocationsApplicationsServicesError = CommonErrors;

export const patchProjectsLocationsApplicationsServices: API.OperationMethod<PatchProjectsLocationsApplicationsServicesRequest, PatchProjectsLocationsApplicationsServicesResponse, PatchProjectsLocationsApplicationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsApplicationsServicesRequest,
  output: PatchProjectsLocationsApplicationsServicesResponse,
  errors: [],
}));

/** Deletes the specified service and all enclosed versions. */
export interface DeleteProjectsLocationsApplicationsServicesRequest {
  /** Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  servicesId: string;
}

export const DeleteProjectsLocationsApplicationsServicesRequest = Schema.Struct({
  projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
  locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
  applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
  servicesId: Schema.String.pipe(T.HttpPath("servicesId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/services/{servicesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsApplicationsServicesRequest>;

export type DeleteProjectsLocationsApplicationsServicesResponse = Operation;
export const DeleteProjectsLocationsApplicationsServicesResponse = Operation;

export type DeleteProjectsLocationsApplicationsServicesError = CommonErrors;

export const deleteProjectsLocationsApplicationsServices: API.OperationMethod<DeleteProjectsLocationsApplicationsServicesRequest, DeleteProjectsLocationsApplicationsServicesResponse, DeleteProjectsLocationsApplicationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsApplicationsServicesRequest,
  output: DeleteProjectsLocationsApplicationsServicesResponse,
  errors: [],
}));

/** Updates the specified Version resource. You can specify the following fields depending on the App Engine environment and type of scaling that the version resource uses:Standard environment instance_class (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.instance_class)automatic scaling in the standard environment: automatic_scaling.min_idle_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automatic_scaling.max_idle_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automaticScaling.standard_scheduler_settings.max_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings) automaticScaling.standard_scheduler_settings.min_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings) automaticScaling.standard_scheduler_settings.target_cpu_utilization (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings) automaticScaling.standard_scheduler_settings.target_throughput_utilization (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings)basic scaling or manual scaling in the standard environment: serving_status (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.serving_status) manual_scaling.instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#manualscaling)Flexible environment serving_status (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.serving_status)automatic scaling in the flexible environment: automatic_scaling.min_total_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automatic_scaling.max_total_instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automatic_scaling.cool_down_period_sec (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling) automatic_scaling.cpu_utilization.target_utilization (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling)manual scaling in the flexible environment: manual_scaling.instances (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#manualscaling) */
export interface PatchProjectsLocationsApplicationsServicesVersionsRequest {
  /** Part of `name`. Required. Name of the resource to update. Example: apps/myapp/services/default/versions/1. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  servicesId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  versionsId: string;
  /** Standard field mask for the set of fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: Version;
}

export const PatchProjectsLocationsApplicationsServicesVersionsRequest = Schema.Struct({
  projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
  locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
  applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
  servicesId: Schema.String.pipe(T.HttpPath("servicesId")),
  versionsId: Schema.String.pipe(T.HttpPath("versionsId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Version).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/services/{servicesId}/versions/{versionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsApplicationsServicesVersionsRequest>;

export type PatchProjectsLocationsApplicationsServicesVersionsResponse = Operation;
export const PatchProjectsLocationsApplicationsServicesVersionsResponse = Operation;

export type PatchProjectsLocationsApplicationsServicesVersionsError = CommonErrors;

export const patchProjectsLocationsApplicationsServicesVersions: API.OperationMethod<PatchProjectsLocationsApplicationsServicesVersionsRequest, PatchProjectsLocationsApplicationsServicesVersionsResponse, PatchProjectsLocationsApplicationsServicesVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsApplicationsServicesVersionsRequest,
  output: PatchProjectsLocationsApplicationsServicesVersionsResponse,
  errors: [],
}));

/** Deletes an existing Version resource. */
export interface DeleteProjectsLocationsApplicationsServicesVersionsRequest {
  /** Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default/versions/v1. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  servicesId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  versionsId: string;
}

export const DeleteProjectsLocationsApplicationsServicesVersionsRequest = Schema.Struct({
  projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
  locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
  applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
  servicesId: Schema.String.pipe(T.HttpPath("servicesId")),
  versionsId: Schema.String.pipe(T.HttpPath("versionsId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/services/{servicesId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsApplicationsServicesVersionsRequest>;

export type DeleteProjectsLocationsApplicationsServicesVersionsResponse = Operation;
export const DeleteProjectsLocationsApplicationsServicesVersionsResponse = Operation;

export type DeleteProjectsLocationsApplicationsServicesVersionsError = CommonErrors;

export const deleteProjectsLocationsApplicationsServicesVersions: API.OperationMethod<DeleteProjectsLocationsApplicationsServicesVersionsRequest, DeleteProjectsLocationsApplicationsServicesVersionsResponse, DeleteProjectsLocationsApplicationsServicesVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsApplicationsServicesVersionsRequest,
  output: DeleteProjectsLocationsApplicationsServicesVersionsResponse,
  errors: [],
}));

/** Stops a running instance.The instance might be automatically recreated based on the scaling settings of the version. For more information, see "How Instances are Managed" (standard environment (https://cloud.google.com/appengine/docs/standard/python/how-instances-are-managed) | flexible environment (https://cloud.google.com/appengine/docs/flexible/python/how-instances-are-managed)).To ensure that instances are not re-created and avoid getting billed, you can stop all instances within the target version by changing the serving status of the version to STOPPED with the apps.services.versions.patch (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions/patch) method. */
export interface DeleteProjectsLocationsApplicationsServicesVersionsInstancesRequest {
  /** Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  servicesId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  versionsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  instancesId: string;
}

export const DeleteProjectsLocationsApplicationsServicesVersionsInstancesRequest = Schema.Struct({
  projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
  locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
  applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
  servicesId: Schema.String.pipe(T.HttpPath("servicesId")),
  versionsId: Schema.String.pipe(T.HttpPath("versionsId")),
  instancesId: Schema.String.pipe(T.HttpPath("instancesId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/services/{servicesId}/versions/{versionsId}/instances/{instancesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsApplicationsServicesVersionsInstancesRequest>;

export type DeleteProjectsLocationsApplicationsServicesVersionsInstancesResponse = Operation;
export const DeleteProjectsLocationsApplicationsServicesVersionsInstancesResponse = Operation;

export type DeleteProjectsLocationsApplicationsServicesVersionsInstancesError = CommonErrors;

export const deleteProjectsLocationsApplicationsServicesVersionsInstances: API.OperationMethod<DeleteProjectsLocationsApplicationsServicesVersionsInstancesRequest, DeleteProjectsLocationsApplicationsServicesVersionsInstancesResponse, DeleteProjectsLocationsApplicationsServicesVersionsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsApplicationsServicesVersionsInstancesRequest,
  output: DeleteProjectsLocationsApplicationsServicesVersionsInstancesResponse,
  errors: [],
}));

/** Enables debugging on a VM instance. This allows you to use the SSH command to connect to the virtual machine where the instance lives. While in "debug mode", the instance continues to serve live traffic. You should delete the instance when you are done debugging and then allow the system to take over and determine if another instance should be started.Only applicable for instances in App Engine flexible environment. */
export interface DebugProjectsLocationsApplicationsServicesVersionsInstancesRequest {
  /** Part of `name`. Required. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  servicesId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  versionsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  instancesId: string;
  /** Request body */
  body?: DebugInstanceRequest;
}

export const DebugProjectsLocationsApplicationsServicesVersionsInstancesRequest = Schema.Struct({
  projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
  locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
  applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
  servicesId: Schema.String.pipe(T.HttpPath("servicesId")),
  versionsId: Schema.String.pipe(T.HttpPath("versionsId")),
  instancesId: Schema.String.pipe(T.HttpPath("instancesId")),
  body: Schema.optional(DebugInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/services/{servicesId}/versions/{versionsId}/instances/{instancesId}:debug", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DebugProjectsLocationsApplicationsServicesVersionsInstancesRequest>;

export type DebugProjectsLocationsApplicationsServicesVersionsInstancesResponse = Operation;
export const DebugProjectsLocationsApplicationsServicesVersionsInstancesResponse = Operation;

export type DebugProjectsLocationsApplicationsServicesVersionsInstancesError = CommonErrors;

export const debugProjectsLocationsApplicationsServicesVersionsInstances: API.OperationMethod<DebugProjectsLocationsApplicationsServicesVersionsInstancesRequest, DebugProjectsLocationsApplicationsServicesVersionsInstancesResponse, DebugProjectsLocationsApplicationsServicesVersionsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DebugProjectsLocationsApplicationsServicesVersionsInstancesRequest,
  output: DebugProjectsLocationsApplicationsServicesVersionsInstancesResponse,
  errors: [],
}));

/** Lists all domains the user is authorized to administer. */
export interface ListProjectsLocationsApplicationsAuthorizedDomainsRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  projectsId: string;
  /** Part of `parent`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `parent`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Maximum results to return per page. */
  pageSize?: number;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListProjectsLocationsApplicationsAuthorizedDomainsRequest = Schema.Struct({
  projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
  locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
  applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedDomains" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsApplicationsAuthorizedDomainsRequest>;

export type ListProjectsLocationsApplicationsAuthorizedDomainsResponse = ListAuthorizedDomainsResponse;
export const ListProjectsLocationsApplicationsAuthorizedDomainsResponse = ListAuthorizedDomainsResponse;

export type ListProjectsLocationsApplicationsAuthorizedDomainsError = CommonErrors;

export const listProjectsLocationsApplicationsAuthorizedDomains = API.makePaginated(() => ({
  input: ListProjectsLocationsApplicationsAuthorizedDomainsRequest,
  output: ListProjectsLocationsApplicationsAuthorizedDomainsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists all SSL certificates the user is authorized to administer. */
export interface ListProjectsLocationsApplicationsAuthorizedCertificatesRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  projectsId: string;
  /** Part of `parent`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `parent`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Controls the set of fields returned in the LIST response. */
  view?: "BASIC_CERTIFICATE" | "FULL_CERTIFICATE" | (string & {});
  /** Maximum results to return per page. */
  pageSize?: number;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListProjectsLocationsApplicationsAuthorizedCertificatesRequest = Schema.Struct({
  projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
  locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
  applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedCertificates" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsApplicationsAuthorizedCertificatesRequest>;

export type ListProjectsLocationsApplicationsAuthorizedCertificatesResponse = ListAuthorizedCertificatesResponse;
export const ListProjectsLocationsApplicationsAuthorizedCertificatesResponse = ListAuthorizedCertificatesResponse;

export type ListProjectsLocationsApplicationsAuthorizedCertificatesError = CommonErrors;

export const listProjectsLocationsApplicationsAuthorizedCertificates = API.makePaginated(() => ({
  input: ListProjectsLocationsApplicationsAuthorizedCertificatesRequest,
  output: ListProjectsLocationsApplicationsAuthorizedCertificatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the specified SSL certificate. */
export interface GetProjectsLocationsApplicationsAuthorizedCertificatesRequest {
  /** Part of `name`. Required. Name of the resource requested. Example: apps/myapp/authorizedCertificates/12345. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  authorizedCertificatesId: string;
  /** Controls the set of fields returned in the GET response. */
  view?: "BASIC_CERTIFICATE" | "FULL_CERTIFICATE" | (string & {});
}

export const GetProjectsLocationsApplicationsAuthorizedCertificatesRequest = Schema.Struct({
  projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
  locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
  applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
  authorizedCertificatesId: Schema.String.pipe(T.HttpPath("authorizedCertificatesId")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedCertificates/{authorizedCertificatesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsApplicationsAuthorizedCertificatesRequest>;

export type GetProjectsLocationsApplicationsAuthorizedCertificatesResponse = AuthorizedCertificate;
export const GetProjectsLocationsApplicationsAuthorizedCertificatesResponse = AuthorizedCertificate;

export type GetProjectsLocationsApplicationsAuthorizedCertificatesError = CommonErrors;

export const getProjectsLocationsApplicationsAuthorizedCertificates: API.OperationMethod<GetProjectsLocationsApplicationsAuthorizedCertificatesRequest, GetProjectsLocationsApplicationsAuthorizedCertificatesResponse, GetProjectsLocationsApplicationsAuthorizedCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsApplicationsAuthorizedCertificatesRequest,
  output: GetProjectsLocationsApplicationsAuthorizedCertificatesResponse,
  errors: [],
}));

/** Uploads the specified SSL certificate. */
export interface CreateProjectsLocationsApplicationsAuthorizedCertificatesRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  projectsId: string;
  /** Part of `parent`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `parent`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Request body */
  body?: AuthorizedCertificate;
}

export const CreateProjectsLocationsApplicationsAuthorizedCertificatesRequest = Schema.Struct({
  projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
  locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
  applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
  body: Schema.optional(AuthorizedCertificate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedCertificates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsApplicationsAuthorizedCertificatesRequest>;

export type CreateProjectsLocationsApplicationsAuthorizedCertificatesResponse = AuthorizedCertificate;
export const CreateProjectsLocationsApplicationsAuthorizedCertificatesResponse = AuthorizedCertificate;

export type CreateProjectsLocationsApplicationsAuthorizedCertificatesError = CommonErrors;

export const createProjectsLocationsApplicationsAuthorizedCertificates: API.OperationMethod<CreateProjectsLocationsApplicationsAuthorizedCertificatesRequest, CreateProjectsLocationsApplicationsAuthorizedCertificatesResponse, CreateProjectsLocationsApplicationsAuthorizedCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsApplicationsAuthorizedCertificatesRequest,
  output: CreateProjectsLocationsApplicationsAuthorizedCertificatesResponse,
  errors: [],
}));

/** Updates the specified SSL certificate. To renew a certificate and maintain its existing domain mappings, update certificate_data with a new certificate. The new certificate must be applicable to the same domains as the original certificate. The certificate display_name may also be updated. */
export interface PatchProjectsLocationsApplicationsAuthorizedCertificatesRequest {
  /** Part of `name`. Required. Name of the resource to update. Example: apps/myapp/authorizedCertificates/12345. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  authorizedCertificatesId: string;
  /** Standard field mask for the set of fields to be updated. Updates are only supported on the certificate_raw_data and display_name fields. */
  updateMask?: string;
  /** Request body */
  body?: AuthorizedCertificate;
}

export const PatchProjectsLocationsApplicationsAuthorizedCertificatesRequest = Schema.Struct({
  projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
  locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
  applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
  authorizedCertificatesId: Schema.String.pipe(T.HttpPath("authorizedCertificatesId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AuthorizedCertificate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedCertificates/{authorizedCertificatesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsApplicationsAuthorizedCertificatesRequest>;

export type PatchProjectsLocationsApplicationsAuthorizedCertificatesResponse = AuthorizedCertificate;
export const PatchProjectsLocationsApplicationsAuthorizedCertificatesResponse = AuthorizedCertificate;

export type PatchProjectsLocationsApplicationsAuthorizedCertificatesError = CommonErrors;

export const patchProjectsLocationsApplicationsAuthorizedCertificates: API.OperationMethod<PatchProjectsLocationsApplicationsAuthorizedCertificatesRequest, PatchProjectsLocationsApplicationsAuthorizedCertificatesResponse, PatchProjectsLocationsApplicationsAuthorizedCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsApplicationsAuthorizedCertificatesRequest,
  output: PatchProjectsLocationsApplicationsAuthorizedCertificatesResponse,
  errors: [],
}));

/** Deletes the specified SSL certificate. */
export interface DeleteProjectsLocationsApplicationsAuthorizedCertificatesRequest {
  /** Part of `name`. Required. Name of the resource to delete. Example: apps/myapp/authorizedCertificates/12345. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  authorizedCertificatesId: string;
}

export const DeleteProjectsLocationsApplicationsAuthorizedCertificatesRequest = Schema.Struct({
  projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
  locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
  applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
  authorizedCertificatesId: Schema.String.pipe(T.HttpPath("authorizedCertificatesId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedCertificates/{authorizedCertificatesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsApplicationsAuthorizedCertificatesRequest>;

export type DeleteProjectsLocationsApplicationsAuthorizedCertificatesResponse = Empty;
export const DeleteProjectsLocationsApplicationsAuthorizedCertificatesResponse = Empty;

export type DeleteProjectsLocationsApplicationsAuthorizedCertificatesError = CommonErrors;

export const deleteProjectsLocationsApplicationsAuthorizedCertificates: API.OperationMethod<DeleteProjectsLocationsApplicationsAuthorizedCertificatesRequest, DeleteProjectsLocationsApplicationsAuthorizedCertificatesResponse, DeleteProjectsLocationsApplicationsAuthorizedCertificatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsApplicationsAuthorizedCertificatesRequest,
  output: DeleteProjectsLocationsApplicationsAuthorizedCertificatesResponse,
  errors: [],
}));

/** Lists the domain mappings on an application. */
export interface ListProjectsLocationsApplicationsDomainMappingsRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  projectsId: string;
  /** Part of `parent`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `parent`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Maximum results to return per page. */
  pageSize?: number;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListProjectsLocationsApplicationsDomainMappingsRequest = Schema.Struct({
  projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
  locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
  applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/domainMappings" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsApplicationsDomainMappingsRequest>;

export type ListProjectsLocationsApplicationsDomainMappingsResponse = ListDomainMappingsResponse;
export const ListProjectsLocationsApplicationsDomainMappingsResponse = ListDomainMappingsResponse;

export type ListProjectsLocationsApplicationsDomainMappingsError = CommonErrors;

export const listProjectsLocationsApplicationsDomainMappings = API.makePaginated(() => ({
  input: ListProjectsLocationsApplicationsDomainMappingsRequest,
  output: ListProjectsLocationsApplicationsDomainMappingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the specified domain mapping. */
export interface GetProjectsLocationsApplicationsDomainMappingsRequest {
  /** Part of `name`. Required. Name of the resource requested. Example: apps/myapp/domainMappings/example.com. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  domainMappingsId: string;
}

export const GetProjectsLocationsApplicationsDomainMappingsRequest = Schema.Struct({
  projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
  locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
  applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
  domainMappingsId: Schema.String.pipe(T.HttpPath("domainMappingsId")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/domainMappings/{domainMappingsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsApplicationsDomainMappingsRequest>;

export type GetProjectsLocationsApplicationsDomainMappingsResponse = DomainMapping;
export const GetProjectsLocationsApplicationsDomainMappingsResponse = DomainMapping;

export type GetProjectsLocationsApplicationsDomainMappingsError = CommonErrors;

export const getProjectsLocationsApplicationsDomainMappings: API.OperationMethod<GetProjectsLocationsApplicationsDomainMappingsRequest, GetProjectsLocationsApplicationsDomainMappingsResponse, GetProjectsLocationsApplicationsDomainMappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsApplicationsDomainMappingsRequest,
  output: GetProjectsLocationsApplicationsDomainMappingsResponse,
  errors: [],
}));

/** Maps a domain to an application. A user must be authorized to administer a domain in order to map it to an application. For a list of available authorized domains, see AuthorizedDomains.ListAuthorizedDomains. */
export interface CreateProjectsLocationsApplicationsDomainMappingsRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  projectsId: string;
  /** Part of `parent`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `parent`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Whether the domain creation should override any existing mappings for this domain. By default, overrides are rejected. */
  overrideStrategy?: "UNSPECIFIED_DOMAIN_OVERRIDE_STRATEGY" | "STRICT" | "OVERRIDE" | (string & {});
  /** Request body */
  body?: DomainMapping;
}

export const CreateProjectsLocationsApplicationsDomainMappingsRequest = Schema.Struct({
  projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
  locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
  applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
  overrideStrategy: Schema.optional(Schema.String).pipe(T.HttpQuery("overrideStrategy")),
  body: Schema.optional(DomainMapping).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/domainMappings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsApplicationsDomainMappingsRequest>;

export type CreateProjectsLocationsApplicationsDomainMappingsResponse = Operation;
export const CreateProjectsLocationsApplicationsDomainMappingsResponse = Operation;

export type CreateProjectsLocationsApplicationsDomainMappingsError = CommonErrors;

export const createProjectsLocationsApplicationsDomainMappings: API.OperationMethod<CreateProjectsLocationsApplicationsDomainMappingsRequest, CreateProjectsLocationsApplicationsDomainMappingsResponse, CreateProjectsLocationsApplicationsDomainMappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsApplicationsDomainMappingsRequest,
  output: CreateProjectsLocationsApplicationsDomainMappingsResponse,
  errors: [],
}));

/** Updates the specified domain mapping. To map an SSL certificate to a domain mapping, update certificate_id to point to an AuthorizedCertificate resource. A user must be authorized to administer the associated domain in order to update a DomainMapping resource. */
export interface PatchProjectsLocationsApplicationsDomainMappingsRequest {
  /** Part of `name`. Required. Name of the resource to update. Example: apps/myapp/domainMappings/example.com. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  domainMappingsId: string;
  /** Required. Standard field mask for the set of fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: DomainMapping;
}

export const PatchProjectsLocationsApplicationsDomainMappingsRequest = Schema.Struct({
  projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
  locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
  applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
  domainMappingsId: Schema.String.pipe(T.HttpPath("domainMappingsId")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(DomainMapping).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/domainMappings/{domainMappingsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsApplicationsDomainMappingsRequest>;

export type PatchProjectsLocationsApplicationsDomainMappingsResponse = Operation;
export const PatchProjectsLocationsApplicationsDomainMappingsResponse = Operation;

export type PatchProjectsLocationsApplicationsDomainMappingsError = CommonErrors;

export const patchProjectsLocationsApplicationsDomainMappings: API.OperationMethod<PatchProjectsLocationsApplicationsDomainMappingsRequest, PatchProjectsLocationsApplicationsDomainMappingsResponse, PatchProjectsLocationsApplicationsDomainMappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsApplicationsDomainMappingsRequest,
  output: PatchProjectsLocationsApplicationsDomainMappingsResponse,
  errors: [],
}));

/** Deletes the specified domain mapping. A user must be authorized to administer the associated domain in order to delete a DomainMapping resource. */
export interface DeleteProjectsLocationsApplicationsDomainMappingsRequest {
  /** Part of `name`. Required. Name of the resource to delete. Example: apps/myapp/domainMappings/example.com. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  domainMappingsId: string;
}

export const DeleteProjectsLocationsApplicationsDomainMappingsRequest = Schema.Struct({
  projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
  locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
  applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
  domainMappingsId: Schema.String.pipe(T.HttpPath("domainMappingsId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/domainMappings/{domainMappingsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsApplicationsDomainMappingsRequest>;

export type DeleteProjectsLocationsApplicationsDomainMappingsResponse = Operation;
export const DeleteProjectsLocationsApplicationsDomainMappingsResponse = Operation;

export type DeleteProjectsLocationsApplicationsDomainMappingsError = CommonErrors;

export const deleteProjectsLocationsApplicationsDomainMappings: API.OperationMethod<DeleteProjectsLocationsApplicationsDomainMappingsRequest, DeleteProjectsLocationsApplicationsDomainMappingsResponse, DeleteProjectsLocationsApplicationsDomainMappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsApplicationsDomainMappingsRequest,
  output: DeleteProjectsLocationsApplicationsDomainMappingsResponse,
  errors: [],
}));

