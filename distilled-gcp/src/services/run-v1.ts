// ==========================================================================
// Cloud Run Admin API (run v1)
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
  name: "run",
  version: "v1",
  rootUrl: "https://run.googleapis.com/",
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

export interface GoogleRpcStatus {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "GoogleRpcStatus" }) as any as Schema.Schema<GoogleRpcStatus>;

export interface GoogleLongrunningOperation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: GoogleRpcStatus;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(GoogleRpcStatus),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleLongrunningOperation" }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleLongrunningListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<GoogleLongrunningOperation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const GoogleLongrunningListOperationsResponse: Schema.Schema<GoogleLongrunningListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(GoogleLongrunningOperation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleLongrunningListOperationsResponse" }) as any as Schema.Schema<GoogleLongrunningListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface GoogleLongrunningWaitOperationRequest {
  /** The maximum duration to wait before timing out. If left blank, the wait will be at most the time permitted by the underlying HTTP/RPC protocol. If RPC context deadline is also specified, the shorter one will be used. */
  timeout?: string;
}

export const GoogleLongrunningWaitOperationRequest: Schema.Schema<GoogleLongrunningWaitOperationRequest> = Schema.suspend(() => Schema.Struct({
  timeout: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleLongrunningWaitOperationRequest" }) as any as Schema.Schema<GoogleLongrunningWaitOperationRequest>;

export interface AuthorizedDomain {
  /** Deprecated Read only. Full path to the `AuthorizedDomain` resource in the API. Example: `projects/myproject/authorizedDomains/example.com`. */
  name?: string;
  /** Relative name of the domain authorized for use. Example: `example.com`. */
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

export interface ListMeta {
  /** URL representing this object. */
  selfLink?: string;
  /** Opaque string that identifies the server's internal version of this object. It can be used by clients to determine when objects have changed. If the message is passed back to the server, it must be left unmodified. */
  resourceVersion?: string;
  /** Continuation token is a value emitted when the count of items is larger than the user/system limit. To retrieve the next page of items, pass the value of `continue` as the next request's `page_token`. */
  continue?: string;
}

export const ListMeta: Schema.Schema<ListMeta> = Schema.suspend(() => Schema.Struct({
  selfLink: Schema.optional(Schema.String),
  resourceVersion: Schema.optional(Schema.String),
  continue: Schema.optional(Schema.String),
})).annotate({ identifier: "ListMeta" }) as any as Schema.Schema<ListMeta>;

export interface OwnerReference {
  /** This is not supported or used by Cloud Run. */
  apiVersion?: string;
  /** This is not supported or used by Cloud Run. */
  kind?: string;
  /** This is not supported or used by Cloud Run. */
  name?: string;
  /** This is not supported or used by Cloud Run. */
  uid?: string;
  /** This is not supported or used by Cloud Run. */
  controller?: boolean;
  /** This is not supported or used by Cloud Run. */
  blockOwnerDeletion?: boolean;
}

export const OwnerReference: Schema.Schema<OwnerReference> = Schema.suspend(() => Schema.Struct({
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  controller: Schema.optional(Schema.Boolean),
  blockOwnerDeletion: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "OwnerReference" }) as any as Schema.Schema<OwnerReference>;

export interface ObjectMeta {
  /** Optional. The name of the resource. A name for creating top-level resources (Service, Job, WorkerPool). Must be unique within a Cloud Run project/region, and cannot be changed once created. If omitted, a default name will be generated. */
  name?: string;
  /** Optional. A prefix for the resource name if not provided in the create request. Must be less than 31 characters to allow for a random suffix. */
  generateName?: string;
  /** Required. Defines the space within each name must be unique within a Cloud Run region. In Cloud Run, it must be project ID or number. */
  namespace?: string;
  /** URL representing this object. */
  selfLink?: string;
  /** Unique, system-generated identifier for this resource. */
  uid?: string;
  /** Opaque, system-generated value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server or omit the value to disable conflict-detection. */
  resourceVersion?: string;
  /** A system-provided sequence number representing a specific generation of the desired state. */
  generation?: number;
  /** UTC timestamp representing the server time when this object was created. */
  creationTimestamp?: string;
  /** Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and routes. */
  labels?: Record<string, string>;
  /** Unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. In Cloud Run, annotations with 'run.googleapis.com/' and 'autoscaling.knative.dev' are restricted, and the accepted annotations will be different depending on the resource type. * `autoscaling.knative.dev/maxScale`: Revision. * `autoscaling.knative.dev/minScale`: Revision. * `run.googleapis.com/base-images`: Service, Revision. * `run.googleapis.com/binary-authorization-breakglass`: Service, Job, * `run.googleapis.com/binary-authorization`: Service, Job, Execution. * `run.googleapis.com/build-base-image`: Service. * `run.googleapis.com/build-enable-automatic-updates`: Service. * `run.googleapis.com/build-environment-variables`: Service. * `run.googleapis.com/build-function-target`: Service, Revision. * `run.googleapis.com/build-id`: Service, Revision. * `run.googleapis.com/build-image-uri`: Service. * `run.googleapis.com/build-name`: Service. * `run.googleapis.com/build-service-account`: Service. * `run.googleapis.com/build-source-location`: Service, Revision. * `run.googleapis.com/build-worker-pool`: Service. * `run.googleapis.com/client-name`: All resources. * `run.googleapis.com/cloudsql-instances`: Revision, Execution. * `run.googleapis.com/container-dependencies`: Revision . * `run.googleapis.com/cpu-throttling`: Revision. * `run.googleapis.com/custom-audiences`: Service. * `run.googleapis.com/default-url-disabled`: Service. * `run.googleapis.com/description`: Service. * `run.googleapis.com/encryption-key-shutdown-hours`: Revision * `run.googleapis.com/encryption-key`: Revision, Execution. * `run.googleapis.com/execution-environment`: Revision, Execution. * `run.googleapis.com/gc-traffic-tags`: Service. * `run.googleapis.com/gpu-zonal-redundancy-disabled`: Revision. * `run.googleapis.com/health-check-disabled`: Revision. * `run.googleapis.com/ingress`: Service, Instance. * `run.googleapis.com/invoker-iam-disabled`: Service, Instance. * `run.googleapis.com/launch-stage`: Service, Job. * `run.googleapis.com/minScale`: Service. * `run.googleapis.com/maxScale`: Service. * `run.googleapis.com/manualInstanceCount`: Service. * `run.googleapis.com/network-interfaces`: Revision, Execution. * `run.googleapis.com/post-key-revocation-action-type`: Revision. `run.googleapis.com/scalingMode`: Service. * `run.googleapis.com/secrets`: Revision, Execution. * `run.googleapis.com/secure-session-agent`: Revision. * `run.googleapis.com/sessionAffinity`: Revision. * `run.googleapis.com/startup-cpu-boost`: Revision. * `run.googleapis.com/vpc-access-connector`: Revision, Execution. * `run.googleapis.com/vpc-access-egress`: Revision, Execution. */
  annotations?: Record<string, string>;
  /** Not supported by Cloud Run */
  ownerReferences?: Array<OwnerReference>;
  /** The read-only soft deletion timestamp for this resource. In Cloud Run, users are not able to set this field. Instead, they must call the corresponding Delete API. */
  deletionTimestamp?: string;
  /** Not supported by Cloud Run */
  deletionGracePeriodSeconds?: number;
  /** Not supported by Cloud Run */
  finalizers?: Array<string>;
  /** Not supported by Cloud Run */
  clusterName?: string;
}

export const ObjectMeta: Schema.Schema<ObjectMeta> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  generateName: Schema.optional(Schema.String),
  namespace: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  resourceVersion: Schema.optional(Schema.String),
  generation: Schema.optional(Schema.Number),
  creationTimestamp: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  ownerReferences: Schema.optional(Schema.Array(OwnerReference)),
  deletionTimestamp: Schema.optional(Schema.String),
  deletionGracePeriodSeconds: Schema.optional(Schema.Number),
  finalizers: Schema.optional(Schema.Array(Schema.String)),
  clusterName: Schema.optional(Schema.String),
})).annotate({ identifier: "ObjectMeta" }) as any as Schema.Schema<ObjectMeta>;

export interface LocalObjectReference {
  /** Name of the referent. */
  name?: string;
}

export const LocalObjectReference: Schema.Schema<LocalObjectReference> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "LocalObjectReference" }) as any as Schema.Schema<LocalObjectReference>;

export interface ConfigMapKeySelector {
  /** Not supported by Cloud Run. */
  localObjectReference?: LocalObjectReference;
  /** Required. Not supported by Cloud Run. */
  key?: string;
  /** Not supported by Cloud Run. */
  optional?: boolean;
  /** Required. Not supported by Cloud Run. */
  name?: string;
}

export const ConfigMapKeySelector: Schema.Schema<ConfigMapKeySelector> = Schema.suspend(() => Schema.Struct({
  localObjectReference: Schema.optional(LocalObjectReference),
  key: Schema.optional(Schema.String),
  optional: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigMapKeySelector" }) as any as Schema.Schema<ConfigMapKeySelector>;

export interface SecretKeySelector {
  /** This field should not be used directly as it is meant to be inlined directly into the message. Use the "name" field instead. */
  localObjectReference?: LocalObjectReference;
  /** Required. A Cloud Secret Manager secret version. Must be 'latest' for the latest version, an integer for a specific version, or a version alias. The key of the secret to select from. Must be a valid secret key. */
  key?: string;
  /** Specify whether the Secret or its key must be defined. */
  optional?: boolean;
  /** The name of the secret in Cloud Secret Manager. By default, the secret is assumed to be in the same project. If the secret is in another project, you must define an alias. An alias definition has the form: :projects//secrets/. If multiple alias definitions are needed, they must be separated by commas. The alias definitions must be set on the run.googleapis.com/secrets annotation. The name of the secret in the pod's namespace to select from. */
  name?: string;
}

export const SecretKeySelector: Schema.Schema<SecretKeySelector> = Schema.suspend(() => Schema.Struct({
  localObjectReference: Schema.optional(LocalObjectReference),
  key: Schema.optional(Schema.String),
  optional: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "SecretKeySelector" }) as any as Schema.Schema<SecretKeySelector>;

export interface EnvVarSource {
  /** Not supported by Cloud Run. Not supported in Cloud Run. */
  configMapKeyRef?: ConfigMapKeySelector;
  /** Selects a key (version) of a secret in Secret Manager. */
  secretKeyRef?: SecretKeySelector;
}

export const EnvVarSource: Schema.Schema<EnvVarSource> = Schema.suspend(() => Schema.Struct({
  configMapKeyRef: Schema.optional(ConfigMapKeySelector),
  secretKeyRef: Schema.optional(SecretKeySelector),
})).annotate({ identifier: "EnvVarSource" }) as any as Schema.Schema<EnvVarSource>;

export interface EnvVar {
  /** Required. Name of the environment variable. */
  name?: string;
  /** Value of the environment variable. Defaults to "". Variable references are not supported in Cloud Run. */
  value?: string;
  /** Source for the environment variable's value. Only supports secret_key_ref. Cannot be used if value is not empty. */
  valueFrom?: EnvVarSource;
}

export const EnvVar: Schema.Schema<EnvVar> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  valueFrom: Schema.optional(EnvVarSource),
})).annotate({ identifier: "EnvVar" }) as any as Schema.Schema<EnvVar>;

export interface ResourceRequirements {
  /** Limits describes the maximum amount of compute resources allowed. Only 'cpu', 'memory' and 'nvidia.com/gpu' keys are supported. * For supported 'cpu' values, go to https://cloud.google.com/run/docs/configuring/cpu. * For supported 'memory' values and syntax, go to https://cloud.google.com/run/docs/configuring/memory-limits. * The only supported 'nvidia.com/gpu' value is '1'. */
  limits?: Record<string, string>;
  /** Requests describes the minimum amount of compute resources required. Only `cpu` and `memory` are supported. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. * For supported 'cpu' values, go to https://cloud.google.com/run/docs/configuring/cpu. * For supported 'memory' values and syntax, go to https://cloud.google.com/run/docs/configuring/memory-limits */
  requests?: Record<string, string>;
}

export const ResourceRequirements: Schema.Schema<ResourceRequirements> = Schema.suspend(() => Schema.Struct({
  limits: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  requests: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "ResourceRequirements" }) as any as Schema.Schema<ResourceRequirements>;

export interface ContainerPort {
  /** If specified, used to specify which protocol to use. Allowed values are "http1" and "h2c". */
  name?: string;
  /** Port number the container listens on. If present, this must be a valid port number, 0 < x < 65536. If not present, it will default to port 8080. For more information, see https://cloud.google.com/run/docs/container-contract#port */
  containerPort?: number;
  /** Protocol for port. Must be "TCP". Defaults to "TCP". */
  protocol?: string;
}

export const ContainerPort: Schema.Schema<ContainerPort> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  containerPort: Schema.optional(Schema.Number),
  protocol: Schema.optional(Schema.String),
})).annotate({ identifier: "ContainerPort" }) as any as Schema.Schema<ContainerPort>;

export interface ConfigMapEnvSource {
  /** This field should not be used directly as it is meant to be inlined directly into the message. Use the "name" field instead. */
  localObjectReference?: LocalObjectReference;
  /** Specify whether the ConfigMap must be defined. */
  optional?: boolean;
  /** The ConfigMap to select from. */
  name?: string;
}

export const ConfigMapEnvSource: Schema.Schema<ConfigMapEnvSource> = Schema.suspend(() => Schema.Struct({
  localObjectReference: Schema.optional(LocalObjectReference),
  optional: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfigMapEnvSource" }) as any as Schema.Schema<ConfigMapEnvSource>;

export interface SecretEnvSource {
  /** This field should not be used directly as it is meant to be inlined directly into the message. Use the "name" field instead. */
  localObjectReference?: LocalObjectReference;
  /** Specify whether the Secret must be defined */
  optional?: boolean;
  /** The Secret to select from. */
  name?: string;
}

export const SecretEnvSource: Schema.Schema<SecretEnvSource> = Schema.suspend(() => Schema.Struct({
  localObjectReference: Schema.optional(LocalObjectReference),
  optional: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "SecretEnvSource" }) as any as Schema.Schema<SecretEnvSource>;

export interface EnvFromSource {
  /** An optional identifier to prepend to each key in the ConfigMap. Must be a C_IDENTIFIER. */
  prefix?: string;
  /** The ConfigMap to select from */
  configMapRef?: ConfigMapEnvSource;
  /** The Secret to select from */
  secretRef?: SecretEnvSource;
}

export const EnvFromSource: Schema.Schema<EnvFromSource> = Schema.suspend(() => Schema.Struct({
  prefix: Schema.optional(Schema.String),
  configMapRef: Schema.optional(ConfigMapEnvSource),
  secretRef: Schema.optional(SecretEnvSource),
})).annotate({ identifier: "EnvFromSource" }) as any as Schema.Schema<EnvFromSource>;

export interface VolumeMount {
  /** Required. The name of the volume. There must be a corresponding Volume with the same name. */
  name?: string;
  /** Sets the mount to be read-only or read-write. Not used by Cloud Run. */
  readOnly?: boolean;
  /** Required. Path within the container at which the volume should be mounted. Must not contain ':'. */
  mountPath?: string;
  /** Path within the volume from which the container's volume should be mounted. Defaults to "" (volume's root). */
  subPath?: string;
}

export const VolumeMount: Schema.Schema<VolumeMount> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  readOnly: Schema.optional(Schema.Boolean),
  mountPath: Schema.optional(Schema.String),
  subPath: Schema.optional(Schema.String),
})).annotate({ identifier: "VolumeMount" }) as any as Schema.Schema<VolumeMount>;

export interface ExecAction {
  /** Command is the command line to execute inside the container, the working directory for the command is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy. */
  command?: Array<string>;
}

export const ExecAction: Schema.Schema<ExecAction> = Schema.suspend(() => Schema.Struct({
  command: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ExecAction" }) as any as Schema.Schema<ExecAction>;

export interface HTTPHeader {
  /** Required. The header field name */
  name?: string;
  /** The header field value */
  value?: string;
}

export const HTTPHeader: Schema.Schema<HTTPHeader> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "HTTPHeader" }) as any as Schema.Schema<HTTPHeader>;

export interface HTTPGetAction {
  /** Path to access on the HTTP server. */
  path?: string;
  /** Not supported by Cloud Run. */
  host?: string;
  /** Not supported by Cloud Run. */
  scheme?: string;
  /** Custom headers to set in the request. HTTP allows repeated headers. */
  httpHeaders?: Array<HTTPHeader>;
  /** Port number to access on the container. Number must be in the range 1 to 65535. */
  port?: number;
}

export const HTTPGetAction: Schema.Schema<HTTPGetAction> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  host: Schema.optional(Schema.String),
  scheme: Schema.optional(Schema.String),
  httpHeaders: Schema.optional(Schema.Array(HTTPHeader)),
  port: Schema.optional(Schema.Number),
})).annotate({ identifier: "HTTPGetAction" }) as any as Schema.Schema<HTTPGetAction>;

export interface TCPSocketAction {
  /** Port number to access on the container. Number must be in the range 1 to 65535. */
  port?: number;
  /** Not supported by Cloud Run. */
  host?: string;
}

export const TCPSocketAction: Schema.Schema<TCPSocketAction> = Schema.suspend(() => Schema.Struct({
  port: Schema.optional(Schema.Number),
  host: Schema.optional(Schema.String),
})).annotate({ identifier: "TCPSocketAction" }) as any as Schema.Schema<TCPSocketAction>;

export interface GRPCAction {
  /** Port number of the gRPC service. Number must be in the range 1 to 65535. */
  port?: number;
  /** Service is the name of the service to place in the gRPC HealthCheckRequest. If this is not specified, the default behavior is defined by gRPC. */
  service?: string;
}

export const GRPCAction: Schema.Schema<GRPCAction> = Schema.suspend(() => Schema.Struct({
  port: Schema.optional(Schema.Number),
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "GRPCAction" }) as any as Schema.Schema<GRPCAction>;

export interface Probe {
  /** Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. */
  initialDelaySeconds?: number;
  /** Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds; if period_seconds is not set, must be less or equal than 10. */
  timeoutSeconds?: number;
  /** How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds. */
  periodSeconds?: number;
  /** Minimum consecutive successes for the probe to be considered successful after having failed. Must be 1 if set. */
  successThreshold?: number;
  /** Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1. */
  failureThreshold?: number;
  /** Not supported by Cloud Run. */
  exec?: ExecAction;
  /** HTTPGet specifies the http request to perform. */
  httpGet?: HTTPGetAction;
  /** TCPSocket specifies an action involving a TCP port. */
  tcpSocket?: TCPSocketAction;
  /** GRPCAction specifies an action involving a GRPC port. */
  grpc?: GRPCAction;
}

export const Probe: Schema.Schema<Probe> = Schema.suspend(() => Schema.Struct({
  initialDelaySeconds: Schema.optional(Schema.Number),
  timeoutSeconds: Schema.optional(Schema.Number),
  periodSeconds: Schema.optional(Schema.Number),
  successThreshold: Schema.optional(Schema.Number),
  failureThreshold: Schema.optional(Schema.Number),
  exec: Schema.optional(ExecAction),
  httpGet: Schema.optional(HTTPGetAction),
  tcpSocket: Schema.optional(TCPSocketAction),
  grpc: Schema.optional(GRPCAction),
})).annotate({ identifier: "Probe" }) as any as Schema.Schema<Probe>;

export interface SecurityContext {
  /** The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in PodSecurityContext. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. */
  runAsUser?: number;
}

export const SecurityContext: Schema.Schema<SecurityContext> = Schema.suspend(() => Schema.Struct({
  runAsUser: Schema.optional(Schema.Number),
})).annotate({ identifier: "SecurityContext" }) as any as Schema.Schema<SecurityContext>;

export interface Container {
  /** Name of the container specified as a DNS_LABEL (RFC 1123). */
  name?: string;
  /** Required. Name of the container image in Dockerhub, Google Artifact Registry, or Google Container Registry. If the host is not provided, Dockerhub is assumed. */
  image?: string;
  /** Entrypoint array. Not executed within a shell. The docker image's ENTRYPOINT is used if this is not provided. Variable references are not supported in Cloud Run. */
  command?: Array<string>;
  /** Arguments to the entrypoint. The docker image's CMD is used if this is not provided. Variable references are not supported in Cloud Run. */
  args?: Array<string>;
  /** List of environment variables to set in the container. EnvVar with duplicate names are generally allowed; if referencing a secret, the name must be unique for the container. For non-secret EnvVar names, the Container will only get the last-declared one. */
  env?: Array<EnvVar>;
  /** Compute Resources required by this container. */
  resources?: ResourceRequirements;
  /** Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image. */
  workingDir?: string;
  /** List of ports to expose from the container. Only a single port can be specified. The specified ports must be listening on all interfaces (0.0.0.0) within the container to be accessible. If omitted, a port number will be chosen and passed to the container through the PORT environment variable for the container to listen on. */
  ports?: Array<ContainerPort>;
  /** Not supported by Cloud Run. */
  envFrom?: Array<EnvFromSource>;
  /** Volume to mount into the container's filesystem. Only supports SecretVolumeSources. Pod volumes to mount into the container's filesystem. */
  volumeMounts?: Array<VolumeMount>;
  /** Periodic probe of container liveness. Container will be restarted if the probe fails. */
  livenessProbe?: Probe;
  /** Readiness probe to be used for health checks. */
  readinessProbe?: Probe;
  /** Startup probe of application within the container. All other probes are disabled if a startup probe is provided, until it succeeds. Container will not receive traffic if the probe fails. If not provided, a default startup probe with TCP socket action is used. */
  startupProbe?: Probe;
  /** Path at which the file to which the container's termination message will be written is mounted into the container's filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log. */
  terminationMessagePath?: string;
  /** Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated. */
  terminationMessagePolicy?: string;
  /** Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise. */
  imagePullPolicy?: string;
  /** Not supported by Cloud Run. */
  securityContext?: SecurityContext;
}

export const Container: Schema.Schema<Container> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  image: Schema.optional(Schema.String),
  command: Schema.optional(Schema.Array(Schema.String)),
  args: Schema.optional(Schema.Array(Schema.String)),
  env: Schema.optional(Schema.Array(EnvVar)),
  resources: Schema.optional(ResourceRequirements),
  workingDir: Schema.optional(Schema.String),
  ports: Schema.optional(Schema.Array(ContainerPort)),
  envFrom: Schema.optional(Schema.Array(EnvFromSource)),
  volumeMounts: Schema.optional(Schema.Array(VolumeMount)),
  livenessProbe: Schema.optional(Probe),
  readinessProbe: Schema.optional(Probe),
  startupProbe: Schema.optional(Probe),
  terminationMessagePath: Schema.optional(Schema.String),
  terminationMessagePolicy: Schema.optional(Schema.String),
  imagePullPolicy: Schema.optional(Schema.String),
  securityContext: Schema.optional(SecurityContext),
})).annotate({ identifier: "Container" }) as any as Schema.Schema<Container>;

export interface KeyToPath {
  /** The Cloud Secret Manager secret version. Can be 'latest' for the latest value, or an integer or a secret alias for a specific version. The key to project. */
  key?: string;
  /** The relative path of the file to map the key to. May not be an absolute path. May not contain the path element '..'. May not start with the string '..'. */
  path?: string;
  /** (Optional) Mode bits to use on this file, must be a value between 01 and 0777 (octal). If 0 or not set, the Volume's default mode will be used. Notes * Internally, a umask of 0222 will be applied to any non-zero value. * This is an integer representation of the mode bits. So, the octal integer value should look exactly as the chmod numeric notation with a leading zero. Some examples: for chmod 777 (a=rwx), set to 0777 (octal) or 511 (base-10). For chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). * This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set. */
  mode?: number;
}

export const KeyToPath: Schema.Schema<KeyToPath> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  mode: Schema.optional(Schema.Number),
})).annotate({ identifier: "KeyToPath" }) as any as Schema.Schema<KeyToPath>;

export interface SecretVolumeSource {
  /** The name of the secret in Cloud Secret Manager. By default, the secret is assumed to be in the same project. If the secret is in another project, you must define an alias. An alias definition has the form: :projects//secrets/. If multiple alias definitions are needed, they must be separated by commas. The alias definitions must be set on the run.googleapis.com/secrets annotation. Name of the secret in the container's namespace to use. */
  secretName?: string;
  /** A list of secret versions to mount in the volume. If no items are specified, the volume will expose a file with the same name as the secret name. The contents of the file will be the data in the latest version of the secret. If items are specified, the key will be used as the version to fetch from Cloud Secret Manager and the path will be the name of the file exposed in the volume. When items are defined, they must specify both a key and a path. */
  items?: Array<KeyToPath>;
  /** Integer representation of mode bits to use on created files by default. Must be a value between 01 and 0777 (octal). If 0 or not set, it will default to 0444. Directories within the path are not affected by this setting. Notes * Internally, a umask of 0222 will be applied to any non-zero value. * This is an integer representation of the mode bits. So, the octal integer value should look exactly as the chmod numeric notation with a leading zero. Some examples: for chmod 777 (a=rwx), set to 0777 (octal) or 511 (base-10). For chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). * This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set. */
  defaultMode?: number;
  /** Not supported by Cloud Run. */
  optional?: boolean;
}

export const SecretVolumeSource: Schema.Schema<SecretVolumeSource> = Schema.suspend(() => Schema.Struct({
  secretName: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(KeyToPath)),
  defaultMode: Schema.optional(Schema.Number),
  optional: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SecretVolumeSource" }) as any as Schema.Schema<SecretVolumeSource>;

export interface ConfigMapVolumeSource {
  /** Name of the config. */
  name?: string;
  /** (Optional) If unspecified, each key-value pair in the Data field of the referenced Secret will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified that is not present in the Secret, the volume setup will error unless it is marked optional. */
  items?: Array<KeyToPath>;
  /** (Optional) Integer representation of mode bits to use on created files by default. Must be a value between 01 and 0777 (octal). If 0 or not set, it will default to 0644. Directories within the path are not affected by this setting. Notes * Internally, a umask of 0222 will be applied to any non-zero value. * This is an integer representation of the mode bits. So, the octal integer value should look exactly as the chmod numeric notation with a leading zero. Some examples: for chmod 777 (a=rwx), set to 0777 (octal) or 511 (base-10). For chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). * This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set. */
  defaultMode?: number;
  /** (Optional) Specify whether the Secret or its keys must be defined. */
  optional?: boolean;
}

export const ConfigMapVolumeSource: Schema.Schema<ConfigMapVolumeSource> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(KeyToPath)),
  defaultMode: Schema.optional(Schema.Number),
  optional: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ConfigMapVolumeSource" }) as any as Schema.Schema<ConfigMapVolumeSource>;

export interface EmptyDirVolumeSource {
  /** The medium on which the data is stored. The default is "" which means to use the node's default medium. Must be an empty string (default) or Memory. More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir */
  medium?: string;
  /** Limit on the storage usable by this EmptyDir volume. The size limit is also applicable for memory medium. The maximum usage on memory medium EmptyDir would be the minimum value between the SizeLimit specified here and the sum of memory limits of all containers. The default is nil which means that the limit is undefined. More info: https://cloud.google.com/run/docs/configuring/in-memory-volumes#configure-volume. Info in Kubernetes: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir */
  sizeLimit?: string;
}

export const EmptyDirVolumeSource: Schema.Schema<EmptyDirVolumeSource> = Schema.suspend(() => Schema.Struct({
  medium: Schema.optional(Schema.String),
  sizeLimit: Schema.optional(Schema.String),
})).annotate({ identifier: "EmptyDirVolumeSource" }) as any as Schema.Schema<EmptyDirVolumeSource>;

export interface NFSVolumeSource {
  /** Hostname or IP address of the NFS server. */
  server?: string;
  /** Path that is exported by the NFS server. */
  path?: string;
  /** If true, mount the NFS volume as read only. Defaults to false. */
  readOnly?: boolean;
}

export const NFSVolumeSource: Schema.Schema<NFSVolumeSource> = Schema.suspend(() => Schema.Struct({
  server: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  readOnly: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "NFSVolumeSource" }) as any as Schema.Schema<NFSVolumeSource>;

export interface CSIVolumeSource {
  /** name of the CSI driver for the requested storage system. Cloud Run supports the following drivers: * gcsfuse.run.googleapis.com : Mount a Cloud Storage Bucket as a volume. */
  driver?: string;
  /** If true, mount the volume as read only. Defaults to false. */
  readOnly?: boolean;
  /** stores driver specific attributes. For Google Cloud Storage volumes, the following attributes are supported: * bucketName: the name of the Cloud Storage bucket to mount. The Cloud Run Service identity must have access to this bucket. * mountOptions: comma-separated list of mount options to pass to the gcsfuse. */
  volumeAttributes?: Record<string, string>;
}

export const CSIVolumeSource: Schema.Schema<CSIVolumeSource> = Schema.suspend(() => Schema.Struct({
  driver: Schema.optional(Schema.String),
  readOnly: Schema.optional(Schema.Boolean),
  volumeAttributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "CSIVolumeSource" }) as any as Schema.Schema<CSIVolumeSource>;

export interface Volume {
  /** Volume's name. In Cloud Run Fully Managed, the name 'cloudsql' is reserved. */
  name?: string;
  /** The secret's value will be presented as the content of a file whose name is defined in the item path. If no items are defined, the name of the file is the secretName. */
  secret?: SecretVolumeSource;
  /** Not supported in Cloud Run. */
  configMap?: ConfigMapVolumeSource;
  /** Ephemeral storage used as a shared volume. */
  emptyDir?: EmptyDirVolumeSource;
  nfs?: NFSVolumeSource;
  /** Volume specified by the Container Storage Interface driver */
  csi?: CSIVolumeSource;
}

export const Volume: Schema.Schema<Volume> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  secret: Schema.optional(SecretVolumeSource),
  configMap: Schema.optional(ConfigMapVolumeSource),
  emptyDir: Schema.optional(EmptyDirVolumeSource),
  nfs: Schema.optional(NFSVolumeSource),
  csi: Schema.optional(CSIVolumeSource),
})).annotate({ identifier: "Volume" }) as any as Schema.Schema<Volume>;

export interface RevisionSpec {
  /** ContainerConcurrency specifies the maximum allowed in-flight (concurrent) requests per container instance of the Revision. If not specified or 0, defaults to 80 when requested CPU >= 1 and defaults to 1 when requested CPU < 1. */
  containerConcurrency?: number;
  /** Optional. TimeoutSeconds holds the max duration the instance is allowed for responding to a request. Cloud Run: defaults to 300 seconds (5 minutes). Maximum allowed value is 3600 seconds (1 hour). */
  timeoutSeconds?: number;
  /** Email address of the IAM service account associated with the revision of the service. The service account represents the identity of the running revision, and determines what permissions the revision has. If not provided, the revision will use the project's default service account. */
  serviceAccountName?: string;
  /** Required. Containers holds the list which define the units of execution for this Revision. */
  containers?: Array<Container>;
  volumes?: Array<Volume>;
  /** Optional. Runtime. Leave unset for default. */
  runtimeClassName?: string;
  /** Not supported by Cloud Run. */
  enableServiceLinks?: boolean;
  /** Not supported by Cloud Run. */
  imagePullSecrets?: Array<LocalObjectReference>;
  /** Optional. The Node Selector configuration. Map of selector key to a value which matches a node. */
  nodeSelector?: Record<string, string>;
}

export const RevisionSpec: Schema.Schema<RevisionSpec> = Schema.suspend(() => Schema.Struct({
  containerConcurrency: Schema.optional(Schema.Number),
  timeoutSeconds: Schema.optional(Schema.Number),
  serviceAccountName: Schema.optional(Schema.String),
  containers: Schema.optional(Schema.Array(Container)),
  volumes: Schema.optional(Schema.Array(Volume)),
  runtimeClassName: Schema.optional(Schema.String),
  enableServiceLinks: Schema.optional(Schema.Boolean),
  imagePullSecrets: Schema.optional(Schema.Array(LocalObjectReference)),
  nodeSelector: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "RevisionSpec" }) as any as Schema.Schema<RevisionSpec>;

export interface GoogleCloudRunV1Condition {
  /** type is used to communicate the status of the reconciliation process. Types common to all resources include: * "Ready" or "Completed": True when the Resource is ready. */
  type?: string;
  /** Status of the condition, one of True, False, Unknown. */
  status?: string;
  /** Optional. One-word CamelCase reason for the condition's last transition. These are intended to be stable, unique values which the client may use to trigger error handling logic, whereas messages which may be changed later by the server. */
  reason?: string;
  /** Optional. Human readable message indicating details about the current status. */
  message?: string;
  /** Optional. Last time the condition transitioned from one status to another. */
  lastTransitionTime?: string;
  /** Optional. How to interpret this condition. One of Error, Warning, or Info. Conditions of severity Info do not contribute to resource readiness. */
  severity?: string;
}

export const GoogleCloudRunV1Condition: Schema.Schema<GoogleCloudRunV1Condition> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  lastTransitionTime: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRunV1Condition" }) as any as Schema.Schema<GoogleCloudRunV1Condition>;

export interface RevisionStatus {
  /** ObservedGeneration is the 'Generation' of the Revision that was last processed by the controller. Clients polling for completed reconciliation should poll until observedGeneration = metadata.generation, and the Ready condition's status is True or False. */
  observedGeneration?: number;
  /** Conditions communicate information about ongoing/complete reconciliation processes that bring the "spec" inline with the observed state of the world. As a Revision is being prepared, it will incrementally update conditions. Revision-specific conditions include: * `ResourcesAvailable`: `True` when underlying resources have been provisioned. * `ContainerHealthy`: `True` when the Revision readiness check completes. * `Active`: `True` when the Revision may receive traffic. */
  conditions?: Array<GoogleCloudRunV1Condition>;
  /** Optional. Specifies the generated logging url for this particular revision based on the revision url template specified in the controller's config. */
  logUrl?: string;
  /** Not currently used by Cloud Run. */
  serviceName?: string;
  /** ImageDigest holds the resolved digest for the image specified within .Spec.Container.Image. The digest is resolved during the creation of Revision. This field holds the digest value regardless of whether a tag or digest was originally specified in the Container object. */
  imageDigest?: string;
  /** Output only. The configured number of instances running this revision. For Cloud Run, this only includes instances provisioned using the minScale annotation. It does not include instances created by autoscaling. */
  desiredReplicas?: number;
}

export const RevisionStatus: Schema.Schema<RevisionStatus> = Schema.suspend(() => Schema.Struct({
  observedGeneration: Schema.optional(Schema.Number),
  conditions: Schema.optional(Schema.Array(GoogleCloudRunV1Condition)),
  logUrl: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
  imageDigest: Schema.optional(Schema.String),
  desiredReplicas: Schema.optional(Schema.Number),
})).annotate({ identifier: "RevisionStatus" }) as any as Schema.Schema<RevisionStatus>;

export interface Revision {
  /** The API version for this call such as "serving.knative.dev/v1". */
  apiVersion?: string;
  /** The kind of this resource, in this case "Revision". */
  kind?: string;
  /** Metadata associated with this Revision, including name, namespace, labels, and annotations. */
  metadata?: ObjectMeta;
  /** Spec holds the desired state of the Revision (from the client). */
  spec?: RevisionSpec;
  /** Status communicates the observed state of the Revision (from the controller). */
  status?: RevisionStatus;
}

export const Revision: Schema.Schema<Revision> = Schema.suspend(() => Schema.Struct({
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(ObjectMeta),
  spec: Schema.optional(RevisionSpec),
  status: Schema.optional(RevisionStatus),
})).annotate({ identifier: "Revision" }) as any as Schema.Schema<Revision>;

export interface ListRevisionsResponse {
  /** The API version for this call such as "serving.knative.dev/v1". */
  apiVersion?: string;
  /** The kind of this resource, in this case "RevisionList". */
  kind?: string;
  /** Metadata associated with this revision list. */
  metadata?: ListMeta;
  /** List of Revisions. */
  items?: Array<Revision>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListRevisionsResponse: Schema.Schema<ListRevisionsResponse> = Schema.suspend(() => Schema.Struct({
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(ListMeta),
  items: Schema.optional(Schema.Array(Revision)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListRevisionsResponse" }) as any as Schema.Schema<ListRevisionsResponse>;

export interface StatusCause {
  /** A machine-readable description of the cause of the error. If this value is empty there is no information available. */
  reason?: string;
  /** A human-readable description of the cause of the error. This field may be presented as-is to a reader. */
  message?: string;
  /** The field of the resource that has caused this error, as named by its JSON serialization. May include dot and postfix notation for nested attributes. Arrays are zero-indexed. Fields may appear more than once in an array of causes due to fields having multiple errors. Examples: "name" - the field "name" on the current resource "items[0].name" - the field "name" on the first array entry in "items" */
  field?: string;
}

export const StatusCause: Schema.Schema<StatusCause> = Schema.suspend(() => Schema.Struct({
  reason: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  field: Schema.optional(Schema.String),
})).annotate({ identifier: "StatusCause" }) as any as Schema.Schema<StatusCause>;

export interface StatusDetails {
  /** The name attribute of the resource associated with the status StatusReason (when there is a single name which can be described). */
  name?: string;
  /** The group attribute of the resource associated with the status StatusReason. */
  group?: string;
  /** The kind attribute of the resource associated with the status StatusReason. On some operations may differ from the requested resource Kind. */
  kind?: string;
  /** UID of the resource. (when there is a single resource which can be described). */
  uid?: string;
  /** The Causes array includes more details associated with the StatusReason failure. Not all StatusReasons may provide detailed causes. */
  causes?: Array<StatusCause>;
  /** If specified, the time in seconds before the operation should be retried. Some errors may indicate the client must take an alternate action - for those errors this field may indicate how long to wait before taking the alternate action. */
  retryAfterSeconds?: number;
}

export const StatusDetails: Schema.Schema<StatusDetails> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  group: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  causes: Schema.optional(Schema.Array(StatusCause)),
  retryAfterSeconds: Schema.optional(Schema.Number),
})).annotate({ identifier: "StatusDetails" }) as any as Schema.Schema<StatusDetails>;

export interface Status {
  /** Standard list metadata. */
  metadata?: ListMeta;
  /** Status of the operation. One of: "Success" or "Failure". */
  status?: string;
  /** A human-readable description of the status of this operation. */
  message?: string;
  /** A machine-readable description of why this operation is in the "Failure" status. If this value is empty there is no information available. A Reason clarifies an HTTP status code but does not override it. */
  reason?: string;
  /** Extended data associated with the reason. Each reason may define its own extended details. This field is optional and the data returned is not guaranteed to conform to any schema except that defined by the reason type. */
  details?: StatusDetails;
  /** Suggested HTTP return code for this status, 0 if not set. */
  code?: number;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(ListMeta),
  status: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
  details: Schema.optional(StatusDetails),
  code: Schema.optional(Schema.Number),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface RevisionTemplate {
  /** Optional metadata for this Revision, including labels and annotations. Name will be generated by the Configuration. The following annotation keys set properties of the created revision: * `autoscaling.knative.dev/minScale` sets the minimum number of instances. * `autoscaling.knative.dev/maxScale` sets the maximum number of instances. * `run.googleapis.com/cloudsql-instances` sets Cloud SQL connections. Multiple values should be comma separated. * `run.googleapis.com/health-check-disabled`: if true, deploy-time startup probes will not run for this revision. * `run.googleapis.com/vpc-access-connector` sets a Serverless VPC Access connector. * `run.googleapis.com/vpc-access-egress` sets VPC egress. Supported values are `all-traffic`, `all` (deprecated), and `private-ranges-only`. `all-traffic` and `all` provide the same functionality. `all` is deprecated but will continue to be supported. Prefer `all-traffic`. */
  metadata?: ObjectMeta;
  /** RevisionSpec holds the desired state of the Revision (from the client). */
  spec?: RevisionSpec;
}

export const RevisionTemplate: Schema.Schema<RevisionTemplate> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(ObjectMeta),
  spec: Schema.optional(RevisionSpec),
})).annotate({ identifier: "RevisionTemplate" }) as any as Schema.Schema<RevisionTemplate>;

export interface ConfigurationSpec {
  /** Template holds the latest specification for the Revision to be stamped out. */
  template?: RevisionTemplate;
}

export const ConfigurationSpec: Schema.Schema<ConfigurationSpec> = Schema.suspend(() => Schema.Struct({
  template: Schema.optional(RevisionTemplate),
})).annotate({ identifier: "ConfigurationSpec" }) as any as Schema.Schema<ConfigurationSpec>;

export interface ConfigurationStatus {
  /** ObservedGeneration is the 'Generation' of the Configuration that was last processed by the controller. The observed generation is updated even if the controller failed to process the spec and create the Revision. Clients polling for completed reconciliation should poll until observedGeneration = metadata.generation, and the Ready condition's status is True or False. */
  observedGeneration?: number;
  /** LatestCreatedRevisionName is the last revision that was created from this Configuration. It might not be ready yet, so for the latest ready revision, use LatestReadyRevisionName. */
  latestCreatedRevisionName?: string;
  /** LatestReadyRevisionName holds the name of the latest Revision stamped out from this Configuration that has had its "Ready" condition become "True". */
  latestReadyRevisionName?: string;
  /** Conditions communicate information about ongoing/complete reconciliation processes that bring the "spec" inline with the observed state of the world. */
  conditions?: Array<GoogleCloudRunV1Condition>;
}

export const ConfigurationStatus: Schema.Schema<ConfigurationStatus> = Schema.suspend(() => Schema.Struct({
  observedGeneration: Schema.optional(Schema.Number),
  latestCreatedRevisionName: Schema.optional(Schema.String),
  latestReadyRevisionName: Schema.optional(Schema.String),
  conditions: Schema.optional(Schema.Array(GoogleCloudRunV1Condition)),
})).annotate({ identifier: "ConfigurationStatus" }) as any as Schema.Schema<ConfigurationStatus>;

export interface Configuration {
  /** The API version for this call such as "serving.knative.dev/v1". */
  apiVersion?: string;
  /** The kind of resource, in this case always "Configuration". */
  kind?: string;
  /** Metadata associated with this Configuration, including name, namespace, labels, and annotations. */
  metadata?: ObjectMeta;
  /** Spec holds the desired state of the Configuration (from the client). */
  spec?: ConfigurationSpec;
  /** Status communicates the observed state of the Configuration (from the controller). */
  status?: ConfigurationStatus;
}

export const Configuration: Schema.Schema<Configuration> = Schema.suspend(() => Schema.Struct({
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(ObjectMeta),
  spec: Schema.optional(ConfigurationSpec),
  status: Schema.optional(ConfigurationStatus),
})).annotate({ identifier: "Configuration" }) as any as Schema.Schema<Configuration>;

export interface ListConfigurationsResponse {
  /** The API version for this call such as "serving.knative.dev/v1". */
  apiVersion?: string;
  /** The kind of this resource, in this case "ConfigurationList". */
  kind?: string;
  /** Metadata associated with this Configuration list. */
  metadata?: ListMeta;
  /** List of Configurations. */
  items?: Array<Configuration>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListConfigurationsResponse: Schema.Schema<ListConfigurationsResponse> = Schema.suspend(() => Schema.Struct({
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(ListMeta),
  items: Schema.optional(Schema.Array(Configuration)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListConfigurationsResponse" }) as any as Schema.Schema<ListConfigurationsResponse>;

export interface DomainMappingSpec {
  /** The name of the Knative Route that this DomainMapping applies to. The route must exist. */
  routeName?: string;
  /** The mode of the certificate. */
  certificateMode?: "CERTIFICATE_MODE_UNSPECIFIED" | "NONE" | "AUTOMATIC" | (string & {});
  /** If set, the mapping will override any mapping set before this spec was set. It is recommended that the user leaves this empty to receive an error warning about a potential conflict and only set it once the respective UI has given such a warning. */
  forceOverride?: boolean;
}

export const DomainMappingSpec: Schema.Schema<DomainMappingSpec> = Schema.suspend(() => Schema.Struct({
  routeName: Schema.optional(Schema.String),
  certificateMode: Schema.optional(Schema.String),
  forceOverride: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DomainMappingSpec" }) as any as Schema.Schema<DomainMappingSpec>;

export interface ResourceRecord {
  /** Relative name of the object affected by this record. Only applicable for `CNAME` records. Example: 'www'. */
  name?: string;
  /** Data for this record. Values vary by record type, as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1). */
  rrdata?: string;
  /** Resource record type. Example: `AAAA`. */
  type?: "RECORD_TYPE_UNSPECIFIED" | "A" | "AAAA" | "CNAME" | (string & {});
}

export const ResourceRecord: Schema.Schema<ResourceRecord> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  rrdata: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceRecord" }) as any as Schema.Schema<ResourceRecord>;

export interface DomainMappingStatus {
  /** Array of observed DomainMappingConditions, indicating the current state of the DomainMapping. */
  conditions?: Array<GoogleCloudRunV1Condition>;
  /** ObservedGeneration is the 'Generation' of the DomainMapping that was last processed by the controller. Clients polling for completed reconciliation should poll until observedGeneration = metadata.generation and the Ready condition's status is True or False. */
  observedGeneration?: number;
  /** The resource records required to configure this domain mapping. These records must be added to the domain's DNS configuration in order to serve the application via this domain mapping. */
  resourceRecords?: Array<ResourceRecord>;
  /** The name of the route that the mapping currently points to. */
  mappedRouteName?: string;
  /** Optional. Not supported by Cloud Run. */
  url?: string;
}

export const DomainMappingStatus: Schema.Schema<DomainMappingStatus> = Schema.suspend(() => Schema.Struct({
  conditions: Schema.optional(Schema.Array(GoogleCloudRunV1Condition)),
  observedGeneration: Schema.optional(Schema.Number),
  resourceRecords: Schema.optional(Schema.Array(ResourceRecord)),
  mappedRouteName: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "DomainMappingStatus" }) as any as Schema.Schema<DomainMappingStatus>;

export interface DomainMapping {
  /** The API version for this call such as "domains.cloudrun.com/v1". */
  apiVersion?: string;
  /** The kind of resource, in this case "DomainMapping". */
  kind?: string;
  /** Metadata associated with this BuildTemplate. */
  metadata?: ObjectMeta;
  /** The spec for this DomainMapping. */
  spec?: DomainMappingSpec;
  /** The current status of the DomainMapping. */
  status?: DomainMappingStatus;
}

export const DomainMapping: Schema.Schema<DomainMapping> = Schema.suspend(() => Schema.Struct({
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(ObjectMeta),
  spec: Schema.optional(DomainMappingSpec),
  status: Schema.optional(DomainMappingStatus),
})).annotate({ identifier: "DomainMapping" }) as any as Schema.Schema<DomainMapping>;

export interface ListDomainMappingsResponse {
  /** The API version for this call such as "domains.cloudrun.com/v1". */
  apiVersion?: string;
  /** The kind of this resource, in this case "DomainMappingList". */
  kind?: string;
  /** Metadata associated with this DomainMapping list. */
  metadata?: ListMeta;
  /** List of DomainMappings. */
  items?: Array<DomainMapping>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListDomainMappingsResponse: Schema.Schema<ListDomainMappingsResponse> = Schema.suspend(() => Schema.Struct({
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(ListMeta),
  items: Schema.optional(Schema.Array(DomainMapping)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListDomainMappingsResponse" }) as any as Schema.Schema<ListDomainMappingsResponse>;

export interface TaskSpec {
  /** Optional. List of volumes that can be mounted by containers belonging to the task. */
  volumes?: Array<Volume>;
  /** Optional. List of containers belonging to the task. We disallow a number of fields on this Container. */
  containers?: Array<Container>;
  /** Optional. Number of retries allowed per task, before marking this job failed. Defaults to 3. */
  maxRetries?: number;
  /** Optional. Duration in seconds the task may be active before the system will actively try to mark it failed and kill associated containers. This applies per attempt of a task, meaning each retry can run for the full timeout. Defaults to 600 seconds. */
  timeoutSeconds?: string;
  /** Optional. Email address of the IAM service account associated with the task of a job execution. The service account represents the identity of the running task, and determines what permissions the task has. If not provided, the task will use the project's default service account. */
  serviceAccountName?: string;
  /** Optional. The Node Selector configuration. Map of selector key to a value which matches a node. */
  nodeSelector?: Record<string, string>;
}

export const TaskSpec: Schema.Schema<TaskSpec> = Schema.suspend(() => Schema.Struct({
  volumes: Schema.optional(Schema.Array(Volume)),
  containers: Schema.optional(Schema.Array(Container)),
  maxRetries: Schema.optional(Schema.Number),
  timeoutSeconds: Schema.optional(Schema.String),
  serviceAccountName: Schema.optional(Schema.String),
  nodeSelector: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "TaskSpec" }) as any as Schema.Schema<TaskSpec>;

export interface TaskAttemptResult {
  /** Optional. The status of this attempt. If the status code is OK, then the attempt succeeded. */
  status?: GoogleRpcStatus;
  /** Optional. The exit code of this attempt. This may be unset if the container was unable to exit cleanly with a code due to some other failure. See status field for possible failure details. At most one of exit_code or term_signal will be set. */
  exitCode?: number;
  /** Optional. Termination signal of the container. This is set to non-zero if the container is terminated by the system. At most one of exit_code or term_signal will be set. */
  termSignal?: number;
}

export const TaskAttemptResult: Schema.Schema<TaskAttemptResult> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(GoogleRpcStatus),
  exitCode: Schema.optional(Schema.Number),
  termSignal: Schema.optional(Schema.Number),
})).annotate({ identifier: "TaskAttemptResult" }) as any as Schema.Schema<TaskAttemptResult>;

export interface TaskStatus {
  /** Optional. The 'generation' of the task that was last processed by the controller. */
  observedGeneration?: number;
  /** Optional. Conditions communicate information about ongoing/complete reconciliation processes that bring the "spec" inline with the observed state of the world. Task-specific conditions include: * `Started`: `True` when the task has started to execute. * `Completed`: `True` when the task has succeeded. `False` when the task has failed. */
  conditions?: Array<GoogleCloudRunV1Condition>;
  /** Required. Index of the task, unique per execution, and beginning at 0. */
  index?: number;
  /** Optional. Represents time when the task started to run. It is not guaranteed to be set in happens-before order across separate operations. It is represented in RFC3339 form and is in UTC. */
  startTime?: string;
  /** Optional. Represents time when the task was completed. It is not guaranteed to be set in happens-before order across separate operations. It is represented in RFC3339 form and is in UTC. */
  completionTime?: string;
  /** Optional. The number of times this task was retried. Instances are retried when they fail up to the maxRetries limit. */
  retried?: number;
  /** Optional. Result of the last attempt of this task. */
  lastAttemptResult?: TaskAttemptResult;
  /** Optional. URI where logs for this task can be found in Cloud Console. */
  logUri?: string;
}

export const TaskStatus: Schema.Schema<TaskStatus> = Schema.suspend(() => Schema.Struct({
  observedGeneration: Schema.optional(Schema.Number),
  conditions: Schema.optional(Schema.Array(GoogleCloudRunV1Condition)),
  index: Schema.optional(Schema.Number),
  startTime: Schema.optional(Schema.String),
  completionTime: Schema.optional(Schema.String),
  retried: Schema.optional(Schema.Number),
  lastAttemptResult: Schema.optional(TaskAttemptResult),
  logUri: Schema.optional(Schema.String),
})).annotate({ identifier: "TaskStatus" }) as any as Schema.Schema<TaskStatus>;

export interface Task {
  /** Optional. APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. */
  apiVersion?: string;
  /** Optional. Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. */
  kind?: string;
  /** Optional. Standard object's metadata. */
  metadata?: ObjectMeta;
  /** Optional. Specification of the desired behavior of a task. */
  spec?: TaskSpec;
  /** Output only. Current status of a task. */
  status?: TaskStatus;
}

export const Task: Schema.Schema<Task> = Schema.suspend(() => Schema.Struct({
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(ObjectMeta),
  spec: Schema.optional(TaskSpec),
  status: Schema.optional(TaskStatus),
})).annotate({ identifier: "Task" }) as any as Schema.Schema<Task>;

export interface ListTasksResponse {
  /** List of Tasks. */
  items?: Array<Task>;
  /** The API version for this call such as "run.googleapis.com/v1". */
  apiVersion?: string;
  /** The kind of this resource, in this case "TasksList". */
  kind?: string;
  /** Metadata associated with this tasks list. */
  metadata?: ListMeta;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListTasksResponse: Schema.Schema<ListTasksResponse> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Task)),
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(ListMeta),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListTasksResponse" }) as any as Schema.Schema<ListTasksResponse>;

export interface TaskTemplateSpec {
  /** Optional. Specification of the desired behavior of the task. */
  spec?: TaskSpec;
}

export const TaskTemplateSpec: Schema.Schema<TaskTemplateSpec> = Schema.suspend(() => Schema.Struct({
  spec: Schema.optional(TaskSpec),
})).annotate({ identifier: "TaskTemplateSpec" }) as any as Schema.Schema<TaskTemplateSpec>;

export interface ExecutionSpec {
  /** Optional. Specifies the maximum desired number of tasks the execution should run at given time. When the job is run, if this field is 0 or unset, the maximum possible value will be used for that execution. The actual number of tasks running in steady state will be less than this number when there are fewer tasks waiting to be completed, i.e. when the work left to do is less than max parallelism. */
  parallelism?: number;
  /** Optional. Specifies the desired number of tasks the execution should run. Setting to 1 means that parallelism is limited to 1 and the success of that task signals the success of the execution. Defaults to 1. */
  taskCount?: number;
  /** Optional. The template used to create tasks for this execution. */
  template?: TaskTemplateSpec;
}

export const ExecutionSpec: Schema.Schema<ExecutionSpec> = Schema.suspend(() => Schema.Struct({
  parallelism: Schema.optional(Schema.Number),
  taskCount: Schema.optional(Schema.Number),
  template: Schema.optional(TaskTemplateSpec),
})).annotate({ identifier: "ExecutionSpec" }) as any as Schema.Schema<ExecutionSpec>;

export interface ExecutionStatus {
  /** Optional. The 'generation' of the execution that was last processed by the controller. */
  observedGeneration?: number;
  /** Optional. Conditions communicate information about ongoing/complete reconciliation processes that bring the "spec" inline with the observed state of the world. Execution-specific conditions include: * `ResourcesAvailable`: `True` when underlying resources have been provisioned. * `Started`: `True` when the execution has started to execute. * `Completed`: `True` when the execution has succeeded. `False` when the execution has failed. */
  conditions?: Array<GoogleCloudRunV1Condition>;
  /** Optional. Represents the time that the execution started to run. It is not guaranteed to be set in happens-before order across separate operations. It is represented in RFC3339 form and is in UTC. */
  startTime?: string;
  /** Optional. Represents the time that the execution was completed. It is not guaranteed to be set in happens-before order across separate operations. It is represented in RFC3339 form and is in UTC. +optional */
  completionTime?: string;
  /** Optional. The number of actively running tasks. */
  runningCount?: number;
  /** Optional. The number of tasks which reached phase Succeeded. */
  succeededCount?: number;
  /** Optional. The number of tasks which reached phase Failed. */
  failedCount?: number;
  /** Optional. The number of tasks which reached phase Cancelled. */
  cancelledCount?: number;
  /** Optional. The number of tasks which have retried at least once. */
  retriedCount?: number;
  /** Optional. URI where logs for this execution can be found in Cloud Console. */
  logUri?: string;
}

export const ExecutionStatus: Schema.Schema<ExecutionStatus> = Schema.suspend(() => Schema.Struct({
  observedGeneration: Schema.optional(Schema.Number),
  conditions: Schema.optional(Schema.Array(GoogleCloudRunV1Condition)),
  startTime: Schema.optional(Schema.String),
  completionTime: Schema.optional(Schema.String),
  runningCount: Schema.optional(Schema.Number),
  succeededCount: Schema.optional(Schema.Number),
  failedCount: Schema.optional(Schema.Number),
  cancelledCount: Schema.optional(Schema.Number),
  retriedCount: Schema.optional(Schema.Number),
  logUri: Schema.optional(Schema.String),
})).annotate({ identifier: "ExecutionStatus" }) as any as Schema.Schema<ExecutionStatus>;

export interface Execution {
  /** Optional. APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. */
  apiVersion?: string;
  /** Optional. Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. */
  kind?: string;
  /** Optional. Standard object's metadata. */
  metadata?: ObjectMeta;
  /** Optional. Specification of the desired behavior of an execution. */
  spec?: ExecutionSpec;
  /** Output only. Current status of an execution. */
  status?: ExecutionStatus;
}

export const Execution: Schema.Schema<Execution> = Schema.suspend(() => Schema.Struct({
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(ObjectMeta),
  spec: Schema.optional(ExecutionSpec),
  status: Schema.optional(ExecutionStatus),
})).annotate({ identifier: "Execution" }) as any as Schema.Schema<Execution>;

export interface ListExecutionsResponse {
  /** List of Executions. */
  items?: Array<Execution>;
  /** The API version for this call such as "run.googleapis.com/v1". */
  apiVersion?: string;
  /** The kind of this resource, in this case "ExecutionsList". */
  kind?: string;
  /** Metadata associated with this executions list. */
  metadata?: ListMeta;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListExecutionsResponse: Schema.Schema<ListExecutionsResponse> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Execution)),
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(ListMeta),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListExecutionsResponse" }) as any as Schema.Schema<ListExecutionsResponse>;

export interface CancelExecutionRequest {
}

export const CancelExecutionRequest: Schema.Schema<CancelExecutionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelExecutionRequest" }) as any as Schema.Schema<CancelExecutionRequest>;

export interface InstanceSpec {
  /** Optional. List of volumes that can be mounted by containers belonging to the Instance. */
  volumes?: Array<Volume>;
  /** Optional. List of containers belonging to the Instance. We disallow a number of fields on this Container. */
  containers?: Array<Container>;
  /** Optional. Email address of the IAM service account associated with the Instance. The service account represents the identity of the running container, and determines what permissions the Instance has. If not provided, the Instance will use the project's default service account. */
  serviceAccountName?: string;
  /** Optional. The Node Selector configuration. Map of selector key to a value which matches a node. */
  nodeSelector?: Record<string, string>;
  /** Optional. Duration the instance may be active before the system will shut it down. */
  timeout?: string;
}

export const InstanceSpec: Schema.Schema<InstanceSpec> = Schema.suspend(() => Schema.Struct({
  volumes: Schema.optional(Schema.Array(Volume)),
  containers: Schema.optional(Schema.Array(Container)),
  serviceAccountName: Schema.optional(Schema.String),
  nodeSelector: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  timeout: Schema.optional(Schema.String),
})).annotate({ identifier: "InstanceSpec" }) as any as Schema.Schema<InstanceSpec>;

export interface InstanceStatus {
  /** Output only. The 'generation' of the Instance that was last processed by the controller. */
  observedGeneration?: number;
  /** Output only. Conditions communicate information about ongoing/complete reconciliation processes that bring the "spec" inline with the observed state of the world. Instance-specific conditions include: * `Ready`: `True` when the Instance is ready to be executed. */
  conditions?: Array<GoogleCloudRunV1Condition>;
  /** Optional. URI where logs for this execution can be found in Cloud Console. */
  logUri?: string;
  /** Output only. All URLs serving traffic for this Instance. */
  urls?: Array<string>;
}

export const InstanceStatus: Schema.Schema<InstanceStatus> = Schema.suspend(() => Schema.Struct({
  observedGeneration: Schema.optional(Schema.Number),
  conditions: Schema.optional(Schema.Array(GoogleCloudRunV1Condition)),
  logUri: Schema.optional(Schema.String),
  urls: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "InstanceStatus" }) as any as Schema.Schema<InstanceStatus>;

export interface Instance {
  /** Optional. APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. */
  apiVersion?: string;
  /** Optional. Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. */
  kind?: string;
  /** Optional. Standard object's metadata. */
  metadata?: ObjectMeta;
  /** Optional. Specification of the desired behavior of a Instance. */
  spec?: InstanceSpec;
  /** Output only. Current status of a Instance. */
  status?: InstanceStatus;
}

export const Instance: Schema.Schema<Instance> = Schema.suspend(() => Schema.Struct({
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(ObjectMeta),
  spec: Schema.optional(InstanceSpec),
  status: Schema.optional(InstanceStatus),
})).annotate({ identifier: "Instance" }) as any as Schema.Schema<Instance>;

export interface ListInstancesResponse {
  /** List of Instances. */
  items?: Array<Instance>;
  /** The API version for this call such as "run.googleapis.com/v1". */
  apiVersion?: string;
  /** The kind of this resource, in this case "InstancesList". */
  kind?: string;
  /** Metadata associated with this Instances list. */
  metadata?: ListMeta;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListInstancesResponse: Schema.Schema<ListInstancesResponse> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Instance)),
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(ListMeta),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListInstancesResponse" }) as any as Schema.Schema<ListInstancesResponse>;

export interface StartInstanceRequest {
}

export const StartInstanceRequest: Schema.Schema<StartInstanceRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "StartInstanceRequest" }) as any as Schema.Schema<StartInstanceRequest>;

export interface StopInstanceRequest {
}

export const StopInstanceRequest: Schema.Schema<StopInstanceRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "StopInstanceRequest" }) as any as Schema.Schema<StopInstanceRequest>;

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

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(Expr),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface AuditLogConfig {
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  logType: Schema.optional(Schema.String),
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AuditLogConfig" }) as any as Schema.Schema<AuditLogConfig>;

export interface AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
})).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

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

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(Binding)),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface ExecutionTemplateSpec {
  /** Optional. Optional metadata for this Execution, including labels and annotations. The following annotation keys set properties of the created execution: * `run.googleapis.com/cloudsql-instances` sets Cloud SQL connections. Multiple values should be comma separated. * `run.googleapis.com/vpc-access-connector` sets a Serverless VPC Access connector. * `run.googleapis.com/vpc-access-egress` sets VPC egress. Supported values are `all-traffic`, `all` (deprecated), and `private-ranges-only`. `all-traffic` and `all` provide the same functionality. `all` is deprecated but will continue to be supported. Prefer `all-traffic`. */
  metadata?: ObjectMeta;
  /** Required. ExecutionSpec holds the desired configuration for executions of this job. */
  spec?: ExecutionSpec;
}

export const ExecutionTemplateSpec: Schema.Schema<ExecutionTemplateSpec> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(ObjectMeta),
  spec: Schema.optional(ExecutionSpec),
})).annotate({ identifier: "ExecutionTemplateSpec" }) as any as Schema.Schema<ExecutionTemplateSpec>;

export interface JobSpec {
  /** Optional. Describes the execution that will be created when running a job. */
  template?: ExecutionTemplateSpec;
  /** A unique string used as a suffix for creating a new execution. The Job will become ready when the execution is successfully started. The sum of job name and token length must be fewer than 63 characters. */
  startExecutionToken?: string;
  /** A unique string used as a suffix for creating a new execution. The Job will become ready when the execution is successfully completed. The sum of job name and token length must be fewer than 63 characters. */
  runExecutionToken?: string;
}

export const JobSpec: Schema.Schema<JobSpec> = Schema.suspend(() => Schema.Struct({
  template: Schema.optional(ExecutionTemplateSpec),
  startExecutionToken: Schema.optional(Schema.String),
  runExecutionToken: Schema.optional(Schema.String),
})).annotate({ identifier: "JobSpec" }) as any as Schema.Schema<JobSpec>;

export interface ExecutionReference {
  /** Optional. Name of the execution. */
  name?: string;
  /** Optional. Creation timestamp of the execution. */
  creationTimestamp?: string;
  /** Optional. Completion timestamp of the execution. */
  completionTimestamp?: string;
  /** Optional. The read-only soft deletion timestamp of the execution. */
  deletionTimestamp?: string;
  /** Optional. Status for the execution completion. */
  completionStatus?: "COMPLETION_STATUS_UNSPECIFIED" | "EXECUTION_SUCCEEDED" | "EXECUTION_FAILED" | "EXECUTION_RUNNING" | "EXECUTION_PENDING" | "EXECUTION_CANCELLED" | (string & {});
}

export const ExecutionReference: Schema.Schema<ExecutionReference> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  creationTimestamp: Schema.optional(Schema.String),
  completionTimestamp: Schema.optional(Schema.String),
  deletionTimestamp: Schema.optional(Schema.String),
  completionStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "ExecutionReference" }) as any as Schema.Schema<ExecutionReference>;

export interface JobStatus {
  /** The 'generation' of the job that was last processed by the controller. */
  observedGeneration?: number;
  /** Conditions communicate information about ongoing/complete reconciliation processes that bring the "spec" inline with the observed state of the world. Job-specific conditions include: * `Ready`: `True` when the job is ready to be executed. */
  conditions?: Array<GoogleCloudRunV1Condition>;
  /** Number of executions created for this job. */
  executionCount?: number;
  /** A pointer to the most recently created execution for this job. This is set regardless of the eventual state of the execution. */
  latestCreatedExecution?: ExecutionReference;
}

export const JobStatus: Schema.Schema<JobStatus> = Schema.suspend(() => Schema.Struct({
  observedGeneration: Schema.optional(Schema.Number),
  conditions: Schema.optional(Schema.Array(GoogleCloudRunV1Condition)),
  executionCount: Schema.optional(Schema.Number),
  latestCreatedExecution: Schema.optional(ExecutionReference),
})).annotate({ identifier: "JobStatus" }) as any as Schema.Schema<JobStatus>;

export interface Job {
  /** Optional. APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. */
  apiVersion?: string;
  /** Optional. Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. */
  kind?: string;
  /** Optional. Standard object's metadata. */
  metadata?: ObjectMeta;
  /** Optional. Specification of the desired behavior of a job. */
  spec?: JobSpec;
  /** Output only. Current status of a job. */
  status?: JobStatus;
}

export const Job: Schema.Schema<Job> = Schema.suspend(() => Schema.Struct({
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(ObjectMeta),
  spec: Schema.optional(JobSpec),
  status: Schema.optional(JobStatus),
})).annotate({ identifier: "Job" }) as any as Schema.Schema<Job>;

export interface ListJobsResponse {
  /** List of Jobs. */
  items?: Array<Job>;
  /** The API version for this call such as "run.googleapis.com/v1". */
  apiVersion?: string;
  /** The kind of this resource, in this case "JobsList". */
  kind?: string;
  /** Metadata associated with this jobs list. */
  metadata?: ListMeta;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListJobsResponse: Schema.Schema<ListJobsResponse> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(Job)),
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(ListMeta),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListJobsResponse" }) as any as Schema.Schema<ListJobsResponse>;

export interface ContainerOverride {
  /** The name of the container specified as a DNS_LABEL. */
  name?: string;
  /** Arguments to the entrypoint. The specified arguments replace and override any existing entrypoint arguments. Must be empty if `clear_args` is set to true. */
  args?: Array<string>;
  /** List of environment variables to set in the container. All specified environment variables are merged with existing environment variables. When the specified environment variables exist, these values override any existing values. */
  env?: Array<EnvVar>;
  /** Optional. Set to True to clear all existing arguments. */
  clearArgs?: boolean;
}

export const ContainerOverride: Schema.Schema<ContainerOverride> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  args: Schema.optional(Schema.Array(Schema.String)),
  env: Schema.optional(Schema.Array(EnvVar)),
  clearArgs: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ContainerOverride" }) as any as Schema.Schema<ContainerOverride>;

export interface Overrides {
  /** Per container override specification. */
  containerOverrides?: Array<ContainerOverride>;
  /** The desired number of tasks the execution should run. Will replace existing task_count value. */
  taskCount?: number;
  /** Duration in seconds the task may be active before the system will actively try to mark it failed and kill associated containers. Will replace existing timeout_seconds value. */
  timeoutSeconds?: number;
}

export const Overrides: Schema.Schema<Overrides> = Schema.suspend(() => Schema.Struct({
  containerOverrides: Schema.optional(Schema.Array(ContainerOverride)),
  taskCount: Schema.optional(Schema.Number),
  timeoutSeconds: Schema.optional(Schema.Number),
})).annotate({ identifier: "Overrides" }) as any as Schema.Schema<Overrides>;

export interface RunJobRequest {
  /** Optional. Overrides existing job configuration for one specific new job execution only, using the specified values to update the job configuration for the new execution. */
  overrides?: Overrides;
}

export const RunJobRequest: Schema.Schema<RunJobRequest> = Schema.suspend(() => Schema.Struct({
  overrides: Schema.optional(Overrides),
})).annotate({ identifier: "RunJobRequest" }) as any as Schema.Schema<RunJobRequest>;

export interface TrafficTarget {
  /** [Deprecated] Not supported in Cloud Run. It must be empty. */
  configurationName?: string;
  /** Points this traffic target to a specific Revision. This field is mutually exclusive with latest_revision. */
  revisionName?: string;
  /** Percent specifies percent of the traffic to this Revision or Configuration. This defaults to zero if unspecified. */
  percent?: number;
  /** Tag is used to expose a dedicated url for referencing this target exclusively. */
  tag?: string;
  /** Uses the "status.latestReadyRevisionName" of the Service to determine the traffic target. When it changes, traffic will automatically migrate from the prior "latest ready" revision to the new one. This field must be false if RevisionName is set. This field defaults to true otherwise. If the field is set to true on Status, this means that the Revision was resolved from the Service's latest ready revision. */
  latestRevision?: boolean;
  /** Output only. URL displays the URL for accessing tagged traffic targets. URL is displayed in status, and is disallowed on spec. URL must contain a scheme (e.g. https://) and a hostname, but may not contain anything else (e.g. basic auth, url path, etc.) */
  url?: string;
}

export const TrafficTarget: Schema.Schema<TrafficTarget> = Schema.suspend(() => Schema.Struct({
  configurationName: Schema.optional(Schema.String),
  revisionName: Schema.optional(Schema.String),
  percent: Schema.optional(Schema.Number),
  tag: Schema.optional(Schema.String),
  latestRevision: Schema.optional(Schema.Boolean),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "TrafficTarget" }) as any as Schema.Schema<TrafficTarget>;

export interface RouteSpec {
  /** Traffic specifies how to distribute traffic over a collection of Knative Revisions and Configurations. Cloud Run currently supports a single configurationName. */
  traffic?: Array<TrafficTarget>;
}

export const RouteSpec: Schema.Schema<RouteSpec> = Schema.suspend(() => Schema.Struct({
  traffic: Schema.optional(Schema.Array(TrafficTarget)),
})).annotate({ identifier: "RouteSpec" }) as any as Schema.Schema<RouteSpec>;

export interface Addressable {
  url?: string;
}

export const Addressable: Schema.Schema<Addressable> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "Addressable" }) as any as Schema.Schema<Addressable>;

export interface RouteStatus {
  /** ObservedGeneration is the 'Generation' of the Route that was last processed by the controller. Clients polling for completed reconciliation should poll until observedGeneration = metadata.generation and the Ready condition's status is True or False. Note that providing a TrafficTarget that has latest_revision=True will result in a Route that does not increment either its metadata.generation or its observedGeneration, as new "latest ready" revisions from the Configuration are processed without an update to the Route's spec. */
  observedGeneration?: number;
  /** Conditions communicates information about ongoing/complete reconciliation processes that bring the "spec" inline with the observed state of the world. */
  conditions?: Array<GoogleCloudRunV1Condition>;
  /** Traffic holds the configured traffic distribution. These entries will always contain RevisionName references. When ConfigurationName appears in the spec, this will hold the LatestReadyRevisionName that was last observed. */
  traffic?: Array<TrafficTarget>;
  /** URL holds the url that will distribute traffic over the provided traffic targets. It generally has the form: `https://{route-hash}-{project-hash}-{cluster-level-suffix}.a.run.app` */
  url?: string;
  /** Similar to url, information on where the service is available on HTTP. */
  address?: Addressable;
}

export const RouteStatus: Schema.Schema<RouteStatus> = Schema.suspend(() => Schema.Struct({
  observedGeneration: Schema.optional(Schema.Number),
  conditions: Schema.optional(Schema.Array(GoogleCloudRunV1Condition)),
  traffic: Schema.optional(Schema.Array(TrafficTarget)),
  url: Schema.optional(Schema.String),
  address: Schema.optional(Addressable),
})).annotate({ identifier: "RouteStatus" }) as any as Schema.Schema<RouteStatus>;

export interface Route {
  /** The API version for this call such as "serving.knative.dev/v1". */
  apiVersion?: string;
  /** The kind of this resource, in this case always "Route". */
  kind?: string;
  /** Metadata associated with this Route, including name, namespace, labels, and annotations. */
  metadata?: ObjectMeta;
  /** Spec holds the desired state of the Route (from the client). */
  spec?: RouteSpec;
  /** Status communicates the observed state of the Route (from the controller). */
  status?: RouteStatus;
}

export const Route: Schema.Schema<Route> = Schema.suspend(() => Schema.Struct({
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(ObjectMeta),
  spec: Schema.optional(RouteSpec),
  status: Schema.optional(RouteStatus),
})).annotate({ identifier: "Route" }) as any as Schema.Schema<Route>;

export interface ListRoutesResponse {
  /** The API version for this call such as "serving.knative.dev/v1". */
  apiVersion?: string;
  /** The kind of this resource, in this case always "RouteList". */
  kind?: string;
  /** Metadata associated with this Route list. */
  metadata?: ListMeta;
  /** List of Routes. */
  items?: Array<Route>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListRoutesResponse: Schema.Schema<ListRoutesResponse> = Schema.suspend(() => Schema.Struct({
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(ListMeta),
  items: Schema.optional(Schema.Array(Route)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListRoutesResponse" }) as any as Schema.Schema<ListRoutesResponse>;

export interface ServiceSpec {
  /** Holds the latest specification for the Revision to be stamped out. */
  template?: RevisionTemplate;
  /** Specifies how to distribute traffic over a collection of Knative Revisions and Configurations to the Service's main URL. */
  traffic?: Array<TrafficTarget>;
}

export const ServiceSpec: Schema.Schema<ServiceSpec> = Schema.suspend(() => Schema.Struct({
  template: Schema.optional(RevisionTemplate),
  traffic: Schema.optional(Schema.Array(TrafficTarget)),
})).annotate({ identifier: "ServiceSpec" }) as any as Schema.Schema<ServiceSpec>;

export interface ServiceStatus {
  /** Returns the generation last seen by the system. Clients polling for completed reconciliation should poll until observedGeneration = metadata.generation and the Ready condition's status is True or False. */
  observedGeneration?: number;
  /** Conditions communicate information about ongoing/complete reconciliation processes that bring the `spec` inline with the observed state of the world. Service-specific conditions include: * `ConfigurationsReady`: `True` when the underlying Configuration is ready. * `RoutesReady`: `True` when the underlying Route is ready. * `Ready`: `True` when all underlying resources are ready. */
  conditions?: Array<GoogleCloudRunV1Condition>;
  /** Name of the latest Revision from this Service's Configuration that has had its `Ready` condition become `True`. */
  latestReadyRevisionName?: string;
  /** Name of the last revision that was created from this Service's Configuration. It might not be ready yet, for that use LatestReadyRevisionName. */
  latestCreatedRevisionName?: string;
  /** Holds the configured traffic distribution. These entries will always contain RevisionName references. When ConfigurationName appears in the spec, this will hold the LatestReadyRevisionName that we last observed. */
  traffic?: Array<TrafficTarget>;
  /** URL that will distribute traffic over the provided traffic targets. It generally has the form `https://{route-hash}-{project-hash}-{cluster-level-suffix}.a.run.app` */
  url?: string;
  /** Similar to url, information on where the service is available on HTTP. */
  address?: Addressable;
}

export const ServiceStatus: Schema.Schema<ServiceStatus> = Schema.suspend(() => Schema.Struct({
  observedGeneration: Schema.optional(Schema.Number),
  conditions: Schema.optional(Schema.Array(GoogleCloudRunV1Condition)),
  latestReadyRevisionName: Schema.optional(Schema.String),
  latestCreatedRevisionName: Schema.optional(Schema.String),
  traffic: Schema.optional(Schema.Array(TrafficTarget)),
  url: Schema.optional(Schema.String),
  address: Schema.optional(Addressable),
})).annotate({ identifier: "ServiceStatus" }) as any as Schema.Schema<ServiceStatus>;

export interface Service {
  /** The API version for this call. It must be "serving.knative.dev/v1". */
  apiVersion?: string;
  /** The kind of resource. It must be "Service". */
  kind?: string;
  /** Metadata associated with this Service, including name, namespace, labels, and annotations. In Cloud Run, annotations with 'run.googleapis.com/' and 'autoscaling.knative.dev' are restricted, and the accepted annotations will be different depending on the resource type. The following Cloud Run-specific annotations are accepted in Service.metadata.annotations. * `run.googleapis.com/base-images` * `run.googleapis.com/binary-authorization-breakglass` * `run.googleapis.com/binary-authorization` * `run.googleapis.com/client-name` * `run.googleapis.com/custom-audiences` * `run.googleapis.com/default-url-disabled` * `run.googleapis.com/description` * `run.googleapis.com/gc-traffic-tags` * `run.googleapis.com/ingress` * `run.googleapis.com/ingress` sets the ingress settings for the Service. See [the ingress settings documentation](/run/docs/securing/ingress) for details on configuring ingress settings. * `run.googleapis.com/ingress-status` is output-only and contains the currently active ingress settings for the Service. `run.googleapis.com/ingress-status` may differ from `run.googleapis.com/ingress` while the system is processing a change to `run.googleapis.com/ingress` or if the system failed to process a change to `run.googleapis.com/ingress`. When the system has processed all changes successfully `run.googleapis.com/ingress-status` and `run.googleapis.com/ingress` are equal. */
  metadata?: ObjectMeta;
  /** Holds the desired state of the Service (from the client). */
  spec?: ServiceSpec;
  /** Communicates the system-controlled state of the Service. */
  status?: ServiceStatus;
}

export const Service: Schema.Schema<Service> = Schema.suspend(() => Schema.Struct({
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(ObjectMeta),
  spec: Schema.optional(ServiceSpec),
  status: Schema.optional(ServiceStatus),
})).annotate({ identifier: "Service" }) as any as Schema.Schema<Service>;

export interface ListServicesResponse {
  /** The API version for this call; returns "serving.knative.dev/v1". */
  apiVersion?: string;
  /** The kind of this resource; returns "ServiceList". */
  kind?: string;
  /** Metadata associated with this Service list. */
  metadata?: ListMeta;
  /** List of Services. */
  items?: Array<Service>;
  /** For calls against the global endpoint, returns the list of Cloud locations that could not be reached. For regional calls, this field is not used. */
  unreachable?: Array<string>;
}

export const ListServicesResponse: Schema.Schema<ListServicesResponse> = Schema.suspend(() => Schema.Struct({
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(ListMeta),
  items: Schema.optional(Schema.Array(Service)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListServicesResponse" }) as any as Schema.Schema<ListServicesResponse>;

export interface InstanceSplit {
  /** Revision to which to assign this portion of instances. */
  revisionName?: string;
  /** Uses the "status.latestReadyRevisionName" to determine the instance split target. When it changes, workloads will automatically migrate from the prior "latest ready" revision to the new one. */
  latestRevision?: boolean;
  /** Optional. Specifies percent of the instance split to this Revision. This defaults to zero if unspecified. */
  percent?: number;
}

export const InstanceSplit: Schema.Schema<InstanceSplit> = Schema.suspend(() => Schema.Struct({
  revisionName: Schema.optional(Schema.String),
  latestRevision: Schema.optional(Schema.Boolean),
  percent: Schema.optional(Schema.Number),
})).annotate({ identifier: "InstanceSplit" }) as any as Schema.Schema<InstanceSplit>;

export interface WorkerPoolSpec {
  /** Holds the latest specification for the Revision to be stamped out. */
  template?: RevisionTemplate;
  /** Specifies how to distribute instances over a collection of Revisions. */
  instanceSplits?: Array<InstanceSplit>;
}

export const WorkerPoolSpec: Schema.Schema<WorkerPoolSpec> = Schema.suspend(() => Schema.Struct({
  template: Schema.optional(RevisionTemplate),
  instanceSplits: Schema.optional(Schema.Array(InstanceSplit)),
})).annotate({ identifier: "WorkerPoolSpec" }) as any as Schema.Schema<WorkerPoolSpec>;

export interface WorkerPoolStatus {
  /** Returns the generation last seen by the system. Clients polling for completed reconciliation should poll until observedGeneration = metadata.generation and the Ready condition's status is True or False. */
  observedGeneration?: number;
  /** Conditions communicate information about ongoing/complete reconciliation processes that bring the `spec` inline with the observed state of the world. * `Ready`: `True` when all underlying resources are ready. */
  conditions?: Array<GoogleCloudRunV1Condition>;
  /** Name of the latest Revision from this WorkerPool's template that has had its `Ready` condition become `True`. */
  latestReadyRevisionName?: string;
  /** Name of the last revision that was created from this WorkerPool's template. It might not be ready yet, for that use LatestReadyRevisionName. */
  latestCreatedRevisionName?: string;
  /** Holds the configured workload distribution. These entries will always contain RevisionName references. When ConfigurationName appears in the spec, this will hold the LatestReadyRevisionName that we last observed. */
  instanceSplits?: Array<InstanceSplit>;
}

export const WorkerPoolStatus: Schema.Schema<WorkerPoolStatus> = Schema.suspend(() => Schema.Struct({
  observedGeneration: Schema.optional(Schema.Number),
  conditions: Schema.optional(Schema.Array(GoogleCloudRunV1Condition)),
  latestReadyRevisionName: Schema.optional(Schema.String),
  latestCreatedRevisionName: Schema.optional(Schema.String),
  instanceSplits: Schema.optional(Schema.Array(InstanceSplit)),
})).annotate({ identifier: "WorkerPoolStatus" }) as any as Schema.Schema<WorkerPoolStatus>;

export interface WorkerPool {
  /** The API version for this call. It must be "run.googleapis.com/v1". */
  apiVersion?: string;
  /** The kind of resource. It must be "WorkerPool". */
  kind?: string;
  /** Metadata associated with this WorkerPool, including name, namespace, labels, and annotations. In Cloud Run, annotations with 'run.googleapis.com/' and 'autoscaling.knative.dev' are restricted, and the accepted annotations will be different depending on the resource type. The following Cloud Run-specific annotations are accepted in WorkerPool.metadata.annotations. * `run.googleapis.com/binary-authorization-breakglass` * `run.googleapis.com/binary-authorization` * `run.googleapis.com/client-name` * `run.googleapis.com/description` */
  metadata?: ObjectMeta;
  /** Holds the desired state of the WorkerPool (from the client). */
  spec?: WorkerPoolSpec;
  /** Communicates the system-controlled state of the WorkerPool. */
  status?: WorkerPoolStatus;
}

export const WorkerPool: Schema.Schema<WorkerPool> = Schema.suspend(() => Schema.Struct({
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(ObjectMeta),
  spec: Schema.optional(WorkerPoolSpec),
  status: Schema.optional(WorkerPoolStatus),
})).annotate({ identifier: "WorkerPool" }) as any as Schema.Schema<WorkerPool>;

export interface ListWorkerPoolsResponse {
  /** The API version for this call; returns "run.googleapis.com/v1". */
  apiVersion?: string;
  /** The kind of this resource; returns "WorkerPoolList". */
  kind?: string;
  /** Metadata associated with this WorkerPool list. */
  metadata?: ListMeta;
  /** List of WorkerPools. */
  items?: Array<WorkerPool>;
  /** For calls against the global endpoint, returns the list of Cloud locations that could not be reached. For regional calls, this field is not used. */
  unreachable?: Array<string>;
}

export const ListWorkerPoolsResponse: Schema.Schema<ListWorkerPoolsResponse> = Schema.suspend(() => Schema.Struct({
  apiVersion: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  metadata: Schema.optional(ListMeta),
  items: Schema.optional(Schema.Array(WorkerPool)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListWorkerPoolsResponse" }) as any as Schema.Schema<ListWorkerPoolsResponse>;

export interface GoogleDevtoolsCloudbuildV1StorageSource {
  /** Cloud Storage bucket containing the source (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). */
  bucket?: string;
  /** Required. Cloud Storage object containing the source. This object must be a zipped (`.zip`) or gzipped archive file (`.tar.gz`) containing source to build. */
  object?: string;
  /** Optional. Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used. */
  generation?: string;
  /** Optional. Option to specify the tool to fetch the source file for the build. */
  sourceFetcher?: "SOURCE_FETCHER_UNSPECIFIED" | "GSUTIL" | "GCS_FETCHER" | (string & {});
}

export const GoogleDevtoolsCloudbuildV1StorageSource: Schema.Schema<GoogleDevtoolsCloudbuildV1StorageSource> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.String),
  object: Schema.optional(Schema.String),
  generation: Schema.optional(Schema.String),
  sourceFetcher: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1StorageSource" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1StorageSource>;

export interface GoogleDevtoolsCloudbuildV1RepoSource {
  /** Optional. ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed. */
  projectId?: string;
  /** Required. Name of the Cloud Source Repository. */
  repoName?: string;
  /** Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax */
  branchName?: string;
  /** Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax */
  tagName?: string;
  /** Explicit commit SHA to build. */
  commitSha?: string;
  /** Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. */
  dir?: string;
  /** Optional. Only trigger a build if the revision regex does NOT match the revision regex. */
  invertRegex?: boolean;
  /** Optional. Substitutions to use in a triggered build. Should only be used with RunBuildTrigger */
  substitutions?: Record<string, string>;
}

export const GoogleDevtoolsCloudbuildV1RepoSource: Schema.Schema<GoogleDevtoolsCloudbuildV1RepoSource> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  repoName: Schema.optional(Schema.String),
  branchName: Schema.optional(Schema.String),
  tagName: Schema.optional(Schema.String),
  commitSha: Schema.optional(Schema.String),
  dir: Schema.optional(Schema.String),
  invertRegex: Schema.optional(Schema.Boolean),
  substitutions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1RepoSource" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1RepoSource>;

export interface GoogleDevtoolsCloudbuildV1GitSource {
  /** Required. Location of the Git repo to build. This will be used as a `git remote`, see https://git-scm.com/docs/git-remote. */
  url?: string;
  /** Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. */
  dir?: string;
  /** Optional. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. Cloud Build uses `git fetch` to fetch the revision from the Git repository; therefore make sure that the string you provide for `revision` is parsable by the command. For information on string values accepted by `git fetch`, see https://git-scm.com/docs/gitrevisions#_specifying_revisions. For information on `git fetch`, see https://git-scm.com/docs/git-fetch. */
  revision?: string;
}

export const GoogleDevtoolsCloudbuildV1GitSource: Schema.Schema<GoogleDevtoolsCloudbuildV1GitSource> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  dir: Schema.optional(Schema.String),
  revision: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1GitSource" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1GitSource>;

export interface GoogleDevtoolsCloudbuildV1StorageSourceManifest {
  /** Required. Cloud Storage bucket containing the source manifest (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). */
  bucket?: string;
  /** Required. Cloud Storage object containing the source manifest. This object must be a JSON file. */
  object?: string;
  /** Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used. */
  generation?: string;
}

export const GoogleDevtoolsCloudbuildV1StorageSourceManifest: Schema.Schema<GoogleDevtoolsCloudbuildV1StorageSourceManifest> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.String),
  object: Schema.optional(Schema.String),
  generation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1StorageSourceManifest" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1StorageSourceManifest>;

export interface GoogleDevtoolsCloudbuildV1ConnectedRepository {
  /** Required. Name of the Google Cloud Build repository, formatted as `projects/* /locations/* /connections/* /repositories/*`. */
  repository?: string;
  /** Optional. Directory, relative to the source root, in which to run the build. */
  dir?: string;
  /** Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. */
  revision?: string;
}

export const GoogleDevtoolsCloudbuildV1ConnectedRepository: Schema.Schema<GoogleDevtoolsCloudbuildV1ConnectedRepository> = Schema.suspend(() => Schema.Struct({
  repository: Schema.optional(Schema.String),
  dir: Schema.optional(Schema.String),
  revision: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1ConnectedRepository" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1ConnectedRepository>;

export interface GoogleDevtoolsCloudbuildV1DeveloperConnectConfig {
  /** Required. The Developer Connect Git repository link, formatted as `projects/* /locations/* /connections/* /gitRepositoryLink/*`. */
  gitRepositoryLink?: string;
  /** Required. Directory, relative to the source root, in which to run the build. */
  dir?: string;
  /** Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. */
  revision?: string;
}

export const GoogleDevtoolsCloudbuildV1DeveloperConnectConfig: Schema.Schema<GoogleDevtoolsCloudbuildV1DeveloperConnectConfig> = Schema.suspend(() => Schema.Struct({
  gitRepositoryLink: Schema.optional(Schema.String),
  dir: Schema.optional(Schema.String),
  revision: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1DeveloperConnectConfig" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1DeveloperConnectConfig>;

export interface GoogleDevtoolsCloudbuildV1Source {
  /** If provided, get the source from this location in Cloud Storage. */
  storageSource?: GoogleDevtoolsCloudbuildV1StorageSource;
  /** If provided, get the source from this location in a Cloud Source Repository. */
  repoSource?: GoogleDevtoolsCloudbuildV1RepoSource;
  /** If provided, get the source from this Git repository. */
  gitSource?: GoogleDevtoolsCloudbuildV1GitSource;
  /** If provided, get the source from this manifest in Cloud Storage. This feature is in Preview; see description [here](https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/gcs-fetcher). */
  storageSourceManifest?: GoogleDevtoolsCloudbuildV1StorageSourceManifest;
  /** Optional. If provided, get the source from this 2nd-gen Google Cloud Build repository resource. */
  connectedRepository?: GoogleDevtoolsCloudbuildV1ConnectedRepository;
  /** If provided, get the source from this Developer Connect config. */
  developerConnectConfig?: GoogleDevtoolsCloudbuildV1DeveloperConnectConfig;
}

export const GoogleDevtoolsCloudbuildV1Source: Schema.Schema<GoogleDevtoolsCloudbuildV1Source> = Schema.suspend(() => Schema.Struct({
  storageSource: Schema.optional(GoogleDevtoolsCloudbuildV1StorageSource),
  repoSource: Schema.optional(GoogleDevtoolsCloudbuildV1RepoSource),
  gitSource: Schema.optional(GoogleDevtoolsCloudbuildV1GitSource),
  storageSourceManifest: Schema.optional(GoogleDevtoolsCloudbuildV1StorageSourceManifest),
  connectedRepository: Schema.optional(GoogleDevtoolsCloudbuildV1ConnectedRepository),
  developerConnectConfig: Schema.optional(GoogleDevtoolsCloudbuildV1DeveloperConnectConfig),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1Source" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1Source>;

export interface GoogleDevtoolsCloudbuildV1Volume {
  /** Name of the volume to mount. Volume names must be unique per build step and must be valid names for Docker volumes. Each named volume must be used by at least two build steps. */
  name?: string;
  /** Path at which to mount the volume. Paths must be absolute and cannot conflict with other volume paths on the same build step or with certain reserved volume paths. */
  path?: string;
}

export const GoogleDevtoolsCloudbuildV1Volume: Schema.Schema<GoogleDevtoolsCloudbuildV1Volume> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1Volume" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1Volume>;

export interface GoogleDevtoolsCloudbuildV1TimeSpan {
  /** Start of time span. */
  startTime?: string;
  /** End of time span. */
  endTime?: string;
}

export const GoogleDevtoolsCloudbuildV1TimeSpan: Schema.Schema<GoogleDevtoolsCloudbuildV1TimeSpan> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1TimeSpan" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1TimeSpan>;

export interface GoogleDevtoolsCloudbuildV1BuildStep {
  /** Required. The name of the container image that will run this particular build step. If the image is available in the host's Docker daemon's cache, it will be run directly. If not, the host will attempt to pull the image first, using the builder service account's credentials if necessary. The Docker daemon's cache will already have the latest versions of all of the officially supported build steps ([https://github.com/GoogleCloudPlatform/cloud-builders](https://github.com/GoogleCloudPlatform/cloud-builders)). The Docker daemon will also have cached many of the layers for some popular images, like "ubuntu", "debian", but they will be refreshed at the time you attempt to use them. If you built an image in a previous build step, it will be stored in the host's Docker daemon's cache and is available to use as the name for a later build step. */
  name?: string;
  /** A list of environment variable definitions to be used when running a step. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE". */
  env?: Array<string>;
  /** A list of arguments that will be presented to the step when it is started. If the image used to run the step's container has an entrypoint, the `args` are used as arguments to that entrypoint. If the image does not define an entrypoint, the first element in args is used as the entrypoint, and the remainder will be used as arguments. */
  args?: Array<string>;
  /** Working directory to use when running this step's container. If this value is a relative path, it is relative to the build's working directory. If this value is absolute, it may be outside the build's working directory, in which case the contents of the path may not be persisted across build step executions, unless a `volume` for that path is specified. If the build specifies a `RepoSource` with `dir` and a step with a `dir`, which specifies an absolute path, the `RepoSource` `dir` is ignored for the step's execution. */
  dir?: string;
  /** Unique identifier for this build step, used in `wait_for` to reference this build step as a dependency. */
  id?: string;
  /** The ID(s) of the step(s) that this build step depends on. This build step will not start until all the build steps in `wait_for` have completed successfully. If `wait_for` is empty, this build step will start when all previous build steps in the `Build.Steps` list have completed successfully. */
  waitFor?: Array<string>;
  /** Entrypoint to be used instead of the build step image's default entrypoint. If unset, the image's default entrypoint is used. */
  entrypoint?: string;
  /** A list of environment variables which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. */
  secretEnv?: Array<string>;
  /** List of volumes to mount into the build step. Each volume is created as an empty volume prior to execution of the build step. Upon completion of the build, volumes and their contents are discarded. Using a named volume in only one step is not valid as it is indicative of a build request with an incorrect configuration. */
  volumes?: Array<GoogleDevtoolsCloudbuildV1Volume>;
  /** Output only. Stores timing information for executing this build step. */
  timing?: GoogleDevtoolsCloudbuildV1TimeSpan;
  /** Output only. Stores timing information for pulling this build step's builder image only. */
  pullTiming?: GoogleDevtoolsCloudbuildV1TimeSpan;
  /** Time limit for executing this build step. If not defined, the step has no time limit and will be allowed to continue to run until either it completes or the build itself times out. */
  timeout?: string;
  /** Output only. Status of the build step. At this time, build step status is only updated on build completion; step status is not updated in real-time as the build progresses. */
  status?: "STATUS_UNKNOWN" | "PENDING" | "QUEUED" | "WORKING" | "SUCCESS" | "FAILURE" | "INTERNAL_ERROR" | "TIMEOUT" | "CANCELLED" | "EXPIRED" | (string & {});
  /** Allow this build step to fail without failing the entire build. If false, the entire build will fail if this step fails. Otherwise, the build will succeed, but this step will still have a failure status. Error information will be reported in the failure_detail field. */
  allowFailure?: boolean;
  /** Output only. Return code from running the step. */
  exitCode?: number;
  /** Allow this build step to fail without failing the entire build if and only if the exit code is one of the specified codes. If allow_failure is also specified, this field will take precedence. */
  allowExitCodes?: Array<number>;
  /** A shell script to be executed in the step. When script is provided, the user cannot specify the entrypoint or args. */
  script?: string;
  /** Option to include built-in and custom substitutions as env variables for this build step. This option will override the global option in BuildOption. */
  automapSubstitutions?: boolean;
}

export const GoogleDevtoolsCloudbuildV1BuildStep: Schema.Schema<GoogleDevtoolsCloudbuildV1BuildStep> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  env: Schema.optional(Schema.Array(Schema.String)),
  args: Schema.optional(Schema.Array(Schema.String)),
  dir: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  waitFor: Schema.optional(Schema.Array(Schema.String)),
  entrypoint: Schema.optional(Schema.String),
  secretEnv: Schema.optional(Schema.Array(Schema.String)),
  volumes: Schema.optional(Schema.Array(GoogleDevtoolsCloudbuildV1Volume)),
  timing: Schema.optional(GoogleDevtoolsCloudbuildV1TimeSpan),
  pullTiming: Schema.optional(GoogleDevtoolsCloudbuildV1TimeSpan),
  timeout: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  allowFailure: Schema.optional(Schema.Boolean),
  exitCode: Schema.optional(Schema.Number),
  allowExitCodes: Schema.optional(Schema.Array(Schema.Number)),
  script: Schema.optional(Schema.String),
  automapSubstitutions: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1BuildStep" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1BuildStep>;

export interface GoogleDevtoolsCloudbuildV1BuiltImage {
  /** Name used to push the container image to Google Container Registry, as presented to `docker push`. */
  name?: string;
  /** Docker Registry 2.0 digest. */
  digest?: string;
  /** Output only. Stores timing information for pushing the specified image. */
  pushTiming?: GoogleDevtoolsCloudbuildV1TimeSpan;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
}

export const GoogleDevtoolsCloudbuildV1BuiltImage: Schema.Schema<GoogleDevtoolsCloudbuildV1BuiltImage> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  digest: Schema.optional(Schema.String),
  pushTiming: Schema.optional(GoogleDevtoolsCloudbuildV1TimeSpan),
  artifactRegistryPackage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1BuiltImage" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1BuiltImage>;

export interface GoogleDevtoolsCloudbuildV1Hash {
  /** The type of hash that was performed. */
  type?: "NONE" | "SHA256" | "MD5" | "GO_MODULE_H1" | "SHA512" | "DIRSUM_SHA256" | (string & {});
  /** The hash value. */
  value?: string;
}

export const GoogleDevtoolsCloudbuildV1Hash: Schema.Schema<GoogleDevtoolsCloudbuildV1Hash> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1Hash" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1Hash>;

export interface GoogleDevtoolsCloudbuildV1FileHashes {
  /** Collection of file hashes. */
  fileHash?: Array<GoogleDevtoolsCloudbuildV1Hash>;
}

export const GoogleDevtoolsCloudbuildV1FileHashes: Schema.Schema<GoogleDevtoolsCloudbuildV1FileHashes> = Schema.suspend(() => Schema.Struct({
  fileHash: Schema.optional(Schema.Array(GoogleDevtoolsCloudbuildV1Hash)),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1FileHashes" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1FileHashes>;

export interface GoogleDevtoolsCloudbuildV1UploadedPythonPackage {
  /** URI of the uploaded artifact. */
  uri?: string;
  /** Hash types and values of the Python Artifact. */
  fileHashes?: GoogleDevtoolsCloudbuildV1FileHashes;
  /** Output only. Stores timing information for pushing the specified artifact. */
  pushTiming?: GoogleDevtoolsCloudbuildV1TimeSpan;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
}

export const GoogleDevtoolsCloudbuildV1UploadedPythonPackage: Schema.Schema<GoogleDevtoolsCloudbuildV1UploadedPythonPackage> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  fileHashes: Schema.optional(GoogleDevtoolsCloudbuildV1FileHashes),
  pushTiming: Schema.optional(GoogleDevtoolsCloudbuildV1TimeSpan),
  artifactRegistryPackage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1UploadedPythonPackage" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1UploadedPythonPackage>;

export interface GoogleDevtoolsCloudbuildV1UploadedMavenArtifact {
  /** URI of the uploaded artifact. */
  uri?: string;
  /** Hash types and values of the Maven Artifact. */
  fileHashes?: GoogleDevtoolsCloudbuildV1FileHashes;
  /** Output only. Stores timing information for pushing the specified artifact. */
  pushTiming?: GoogleDevtoolsCloudbuildV1TimeSpan;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
}

export const GoogleDevtoolsCloudbuildV1UploadedMavenArtifact: Schema.Schema<GoogleDevtoolsCloudbuildV1UploadedMavenArtifact> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  fileHashes: Schema.optional(GoogleDevtoolsCloudbuildV1FileHashes),
  pushTiming: Schema.optional(GoogleDevtoolsCloudbuildV1TimeSpan),
  artifactRegistryPackage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1UploadedMavenArtifact" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1UploadedMavenArtifact>;

export interface GoogleDevtoolsCloudbuildV1UploadedGoModule {
  /** URI of the uploaded artifact. */
  uri?: string;
  /** Hash types and values of the Go Module Artifact. */
  fileHashes?: GoogleDevtoolsCloudbuildV1FileHashes;
  /** Output only. Stores timing information for pushing the specified artifact. */
  pushTiming?: GoogleDevtoolsCloudbuildV1TimeSpan;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
}

export const GoogleDevtoolsCloudbuildV1UploadedGoModule: Schema.Schema<GoogleDevtoolsCloudbuildV1UploadedGoModule> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  fileHashes: Schema.optional(GoogleDevtoolsCloudbuildV1FileHashes),
  pushTiming: Schema.optional(GoogleDevtoolsCloudbuildV1TimeSpan),
  artifactRegistryPackage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1UploadedGoModule" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1UploadedGoModule>;

export interface GoogleDevtoolsCloudbuildV1UploadedNpmPackage {
  /** URI of the uploaded npm package. */
  uri?: string;
  /** Hash types and values of the npm package. */
  fileHashes?: GoogleDevtoolsCloudbuildV1FileHashes;
  /** Output only. Stores timing information for pushing the specified artifact. */
  pushTiming?: GoogleDevtoolsCloudbuildV1TimeSpan;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
}

export const GoogleDevtoolsCloudbuildV1UploadedNpmPackage: Schema.Schema<GoogleDevtoolsCloudbuildV1UploadedNpmPackage> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  fileHashes: Schema.optional(GoogleDevtoolsCloudbuildV1FileHashes),
  pushTiming: Schema.optional(GoogleDevtoolsCloudbuildV1TimeSpan),
  artifactRegistryPackage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1UploadedNpmPackage" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1UploadedNpmPackage>;

export interface GoogleDevtoolsCloudbuildV1Results {
  /** Container images that were built as a part of the build. */
  images?: Array<GoogleDevtoolsCloudbuildV1BuiltImage>;
  /** List of build step digests, in the order corresponding to build step indices. */
  buildStepImages?: Array<string>;
  /** Path to the artifact manifest for non-container artifacts uploaded to Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage. */
  artifactManifest?: string;
  /** Number of non-container artifacts uploaded to Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage. */
  numArtifacts?: string;
  /** List of build step outputs, produced by builder images, in the order corresponding to build step indices. [Cloud Builders](https://cloud.google.com/cloud-build/docs/cloud-builders) can produce this output by writing to `$BUILDER_OUTPUT/output`. Only the first 50KB of data is stored. Note that the `$BUILDER_OUTPUT` variable is read-only and can't be substituted. */
  buildStepOutputs?: Array<string>;
  /** Time to push all non-container artifacts to Cloud Storage. */
  artifactTiming?: GoogleDevtoolsCloudbuildV1TimeSpan;
  /** Python artifacts uploaded to Artifact Registry at the end of the build. */
  pythonPackages?: Array<GoogleDevtoolsCloudbuildV1UploadedPythonPackage>;
  /** Maven artifacts uploaded to Artifact Registry at the end of the build. */
  mavenArtifacts?: Array<GoogleDevtoolsCloudbuildV1UploadedMavenArtifact>;
  /** Optional. Go module artifacts uploaded to Artifact Registry at the end of the build. */
  goModules?: Array<GoogleDevtoolsCloudbuildV1UploadedGoModule>;
  /** Npm packages uploaded to Artifact Registry at the end of the build. */
  npmPackages?: Array<GoogleDevtoolsCloudbuildV1UploadedNpmPackage>;
}

export const GoogleDevtoolsCloudbuildV1Results: Schema.Schema<GoogleDevtoolsCloudbuildV1Results> = Schema.suspend(() => Schema.Struct({
  images: Schema.optional(Schema.Array(GoogleDevtoolsCloudbuildV1BuiltImage)),
  buildStepImages: Schema.optional(Schema.Array(Schema.String)),
  artifactManifest: Schema.optional(Schema.String),
  numArtifacts: Schema.optional(Schema.String),
  buildStepOutputs: Schema.optional(Schema.Array(Schema.String)),
  artifactTiming: Schema.optional(GoogleDevtoolsCloudbuildV1TimeSpan),
  pythonPackages: Schema.optional(Schema.Array(GoogleDevtoolsCloudbuildV1UploadedPythonPackage)),
  mavenArtifacts: Schema.optional(Schema.Array(GoogleDevtoolsCloudbuildV1UploadedMavenArtifact)),
  goModules: Schema.optional(Schema.Array(GoogleDevtoolsCloudbuildV1UploadedGoModule)),
  npmPackages: Schema.optional(Schema.Array(GoogleDevtoolsCloudbuildV1UploadedNpmPackage)),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1Results" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1Results>;

export interface GoogleDevtoolsCloudbuildV1ArtifactObjects {
  /** Cloud Storage bucket and optional object path, in the form "gs://bucket/path/to/somewhere/". (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). Files in the workspace matching any path pattern will be uploaded to Cloud Storage with this location as a prefix. */
  location?: string;
  /** Path globs used to match files in the build's workspace. */
  paths?: Array<string>;
  /** Output only. Stores timing information for pushing all artifact objects. */
  timing?: GoogleDevtoolsCloudbuildV1TimeSpan;
}

export const GoogleDevtoolsCloudbuildV1ArtifactObjects: Schema.Schema<GoogleDevtoolsCloudbuildV1ArtifactObjects> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  paths: Schema.optional(Schema.Array(Schema.String)),
  timing: Schema.optional(GoogleDevtoolsCloudbuildV1TimeSpan),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1ArtifactObjects" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1ArtifactObjects>;

export interface GoogleDevtoolsCloudbuildV1MavenArtifact {
  /** Artifact Registry repository, in the form "https://$REGION-maven.pkg.dev/$PROJECT/$REPOSITORY" Artifact in the workspace specified by path will be uploaded to Artifact Registry with this location as a prefix. */
  repository?: string;
  /** Optional. Path to an artifact in the build's workspace to be uploaded to Artifact Registry. This can be either an absolute path, e.g. /workspace/my-app/target/my-app-1.0.SNAPSHOT.jar or a relative path from /workspace, e.g. my-app/target/my-app-1.0.SNAPSHOT.jar. */
  path?: string;
  /** Maven `artifactId` value used when uploading the artifact to Artifact Registry. */
  artifactId?: string;
  /** Maven `groupId` value used when uploading the artifact to Artifact Registry. */
  groupId?: string;
  /** Maven `version` value used when uploading the artifact to Artifact Registry. */
  version?: string;
  /** Optional. Path to a folder containing the files to upload to Artifact Registry. This can be either an absolute path, e.g. `/workspace/my-app/target/`, or a relative path from /workspace, e.g. `my-app/target/`. This field is mutually exclusive with the `path` field. */
  deployFolder?: string;
}

export const GoogleDevtoolsCloudbuildV1MavenArtifact: Schema.Schema<GoogleDevtoolsCloudbuildV1MavenArtifact> = Schema.suspend(() => Schema.Struct({
  repository: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  artifactId: Schema.optional(Schema.String),
  groupId: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  deployFolder: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1MavenArtifact" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1MavenArtifact>;

export interface GoogleDevtoolsCloudbuildV1GoModule {
  /** Optional. Artifact Registry repository name. Specified Go modules will be zipped and uploaded to Artifact Registry with this location as a prefix. e.g. my-go-repo */
  repositoryName?: string;
  /** Optional. Location of the Artifact Registry repository. i.e. us-east1 Defaults to the build’s location. */
  repositoryLocation?: string;
  /** Optional. Project ID of the Artifact Registry repository. Defaults to the build project. */
  repositoryProjectId?: string;
  /** Optional. Source path of the go.mod file in the build's workspace. If not specified, this will default to the current directory. e.g. ~/code/go/mypackage */
  sourcePath?: string;
  /** Optional. The Go module's "module path". e.g. example.com/foo/v2 */
  modulePath?: string;
  /** Optional. The Go module's semantic version in the form vX.Y.Z. e.g. v0.1.1 Pre-release identifiers can also be added by appending a dash and dot separated ASCII alphanumeric characters and hyphens. e.g. v0.2.3-alpha.x.12m.5 */
  moduleVersion?: string;
}

export const GoogleDevtoolsCloudbuildV1GoModule: Schema.Schema<GoogleDevtoolsCloudbuildV1GoModule> = Schema.suspend(() => Schema.Struct({
  repositoryName: Schema.optional(Schema.String),
  repositoryLocation: Schema.optional(Schema.String),
  repositoryProjectId: Schema.optional(Schema.String),
  sourcePath: Schema.optional(Schema.String),
  modulePath: Schema.optional(Schema.String),
  moduleVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1GoModule" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1GoModule>;

export interface GoogleDevtoolsCloudbuildV1PythonPackage {
  /** Artifact Registry repository, in the form "https://$REGION-python.pkg.dev/$PROJECT/$REPOSITORY" Files in the workspace matching any path pattern will be uploaded to Artifact Registry with this location as a prefix. */
  repository?: string;
  /** Path globs used to match files in the build's workspace. For Python/ Twine, this is usually `dist/*`, and sometimes additionally an `.asc` file. */
  paths?: Array<string>;
}

export const GoogleDevtoolsCloudbuildV1PythonPackage: Schema.Schema<GoogleDevtoolsCloudbuildV1PythonPackage> = Schema.suspend(() => Schema.Struct({
  repository: Schema.optional(Schema.String),
  paths: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1PythonPackage" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1PythonPackage>;

export interface GoogleDevtoolsCloudbuildV1NpmPackage {
  /** Artifact Registry repository, in the form "https://$REGION-npm.pkg.dev/$PROJECT/$REPOSITORY" Npm package in the workspace specified by path will be zipped and uploaded to Artifact Registry with this location as a prefix. */
  repository?: string;
  /** Optional. Path to the package.json. e.g. workspace/path/to/package Only one of `archive` or `package_path` can be specified. */
  packagePath?: string;
}

export const GoogleDevtoolsCloudbuildV1NpmPackage: Schema.Schema<GoogleDevtoolsCloudbuildV1NpmPackage> = Schema.suspend(() => Schema.Struct({
  repository: Schema.optional(Schema.String),
  packagePath: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1NpmPackage" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1NpmPackage>;

export interface GoogleDevtoolsCloudbuildV1Artifacts {
  /** A list of images to be pushed upon the successful completion of all build steps. The images will be pushed using the builder service account's credentials. The digests of the pushed images will be stored in the Build resource's results field. If any of the images fail to be pushed, the build is marked FAILURE. */
  images?: Array<string>;
  /** A list of objects to be uploaded to Cloud Storage upon successful completion of all build steps. Files in the workspace matching specified paths globs will be uploaded to the specified Cloud Storage location using the builder service account's credentials. The location and generation of the uploaded objects will be stored in the Build resource's results field. If any objects fail to be pushed, the build is marked FAILURE. */
  objects?: GoogleDevtoolsCloudbuildV1ArtifactObjects;
  /** A list of Maven artifacts to be uploaded to Artifact Registry upon successful completion of all build steps. Artifacts in the workspace matching specified paths globs will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any artifacts fail to be pushed, the build is marked FAILURE. */
  mavenArtifacts?: Array<GoogleDevtoolsCloudbuildV1MavenArtifact>;
  /** Optional. A list of Go modules to be uploaded to Artifact Registry upon successful completion of all build steps. If any objects fail to be pushed, the build is marked FAILURE. */
  goModules?: Array<GoogleDevtoolsCloudbuildV1GoModule>;
  /** A list of Python packages to be uploaded to Artifact Registry upon successful completion of all build steps. The build service account credentials will be used to perform the upload. If any objects fail to be pushed, the build is marked FAILURE. */
  pythonPackages?: Array<GoogleDevtoolsCloudbuildV1PythonPackage>;
  /** A list of npm packages to be uploaded to Artifact Registry upon successful completion of all build steps. Npm packages in the specified paths will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any packages fail to be pushed, the build is marked FAILURE. */
  npmPackages?: Array<GoogleDevtoolsCloudbuildV1NpmPackage>;
}

export const GoogleDevtoolsCloudbuildV1Artifacts: Schema.Schema<GoogleDevtoolsCloudbuildV1Artifacts> = Schema.suspend(() => Schema.Struct({
  images: Schema.optional(Schema.Array(Schema.String)),
  objects: Schema.optional(GoogleDevtoolsCloudbuildV1ArtifactObjects),
  mavenArtifacts: Schema.optional(Schema.Array(GoogleDevtoolsCloudbuildV1MavenArtifact)),
  goModules: Schema.optional(Schema.Array(GoogleDevtoolsCloudbuildV1GoModule)),
  pythonPackages: Schema.optional(Schema.Array(GoogleDevtoolsCloudbuildV1PythonPackage)),
  npmPackages: Schema.optional(Schema.Array(GoogleDevtoolsCloudbuildV1NpmPackage)),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1Artifacts" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1Artifacts>;

export interface GoogleDevtoolsCloudbuildV1SourceProvenance {
  /** A copy of the build's `source.storage_source`, if exists, with any generations resolved. */
  resolvedStorageSource?: GoogleDevtoolsCloudbuildV1StorageSource;
  /** A copy of the build's `source.repo_source`, if exists, with any revisions resolved. */
  resolvedRepoSource?: GoogleDevtoolsCloudbuildV1RepoSource;
  /** A copy of the build's `source.storage_source_manifest`, if exists, with any revisions resolved. This feature is in Preview. */
  resolvedStorageSourceManifest?: GoogleDevtoolsCloudbuildV1StorageSourceManifest;
  /** Output only. A copy of the build's `source.connected_repository`, if exists, with any revisions resolved. */
  resolvedConnectedRepository?: GoogleDevtoolsCloudbuildV1ConnectedRepository;
  /** Output only. A copy of the build's `source.git_source`, if exists, with any revisions resolved. */
  resolvedGitSource?: GoogleDevtoolsCloudbuildV1GitSource;
  /** Output only. Hash(es) of the build source, which can be used to verify that the original source integrity was maintained in the build. Note that `FileHashes` will only be populated if `BuildOptions` has requested a `SourceProvenanceHash`. The keys to this map are file paths used as build source and the values contain the hash values for those files. If the build source came in a single package such as a gzipped tarfile (`.tar.gz`), the `FileHash` will be for the single path to that file. */
  fileHashes?: Record<string, GoogleDevtoolsCloudbuildV1FileHashes>;
}

export const GoogleDevtoolsCloudbuildV1SourceProvenance: Schema.Schema<GoogleDevtoolsCloudbuildV1SourceProvenance> = Schema.suspend(() => Schema.Struct({
  resolvedStorageSource: Schema.optional(GoogleDevtoolsCloudbuildV1StorageSource),
  resolvedRepoSource: Schema.optional(GoogleDevtoolsCloudbuildV1RepoSource),
  resolvedStorageSourceManifest: Schema.optional(GoogleDevtoolsCloudbuildV1StorageSourceManifest),
  resolvedConnectedRepository: Schema.optional(GoogleDevtoolsCloudbuildV1ConnectedRepository),
  resolvedGitSource: Schema.optional(GoogleDevtoolsCloudbuildV1GitSource),
  fileHashes: Schema.optional(Schema.Record(Schema.String, GoogleDevtoolsCloudbuildV1FileHashes)),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1SourceProvenance" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1SourceProvenance>;

export interface GoogleDevtoolsCloudbuildV1PoolOption {
  /** The `WorkerPool` resource to execute the build on. You must have `cloudbuild.workerpools.use` on the project hosting the WorkerPool. Format projects/{project}/locations/{location}/workerPools/{workerPoolId} */
  name?: string;
}

export const GoogleDevtoolsCloudbuildV1PoolOption: Schema.Schema<GoogleDevtoolsCloudbuildV1PoolOption> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1PoolOption" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1PoolOption>;

export interface GoogleDevtoolsCloudbuildV1BuildOptions {
  /** Requested hash for SourceProvenance. */
  sourceProvenanceHash?: Array<"NONE" | "SHA256" | "MD5" | "GO_MODULE_H1" | "SHA512" | "DIRSUM_SHA256" | (string & {})>;
  /** Requested verifiability options. */
  requestedVerifyOption?: "NOT_VERIFIED" | "VERIFIED" | (string & {});
  /** Compute Engine machine type on which to run the build. */
  machineType?: "UNSPECIFIED" | "N1_HIGHCPU_8" | "N1_HIGHCPU_32" | "E2_HIGHCPU_8" | "E2_HIGHCPU_32" | "E2_MEDIUM" | (string & {});
  /** Requested disk size for the VM that runs the build. Note that this is *NOT* "disk free"; some of the space will be used by the operating system and build utilities. Also note that this is the minimum disk size that will be allocated for the build -- the build may run with a larger disk than requested. At present, the maximum disk size is 4000GB; builds that request more than the maximum are rejected with an error. */
  diskSizeGb?: string;
  /** Option to specify behavior when there is an error in the substitution checks. NOTE: this is always set to ALLOW_LOOSE for triggered builds and cannot be overridden in the build configuration file. */
  substitutionOption?: "MUST_MATCH" | "ALLOW_LOOSE" | (string & {});
  /** Option to specify whether or not to apply bash style string operations to the substitutions. NOTE: this is always enabled for triggered builds and cannot be overridden in the build configuration file. */
  dynamicSubstitutions?: boolean;
  /** Option to include built-in and custom substitutions as env variables for all build steps. */
  automapSubstitutions?: boolean;
  /** Option to define build log streaming behavior to Cloud Storage. */
  logStreamingOption?: "STREAM_DEFAULT" | "STREAM_ON" | "STREAM_OFF" | (string & {});
  /** This field deprecated; please use `pool.name` instead. */
  workerPool?: string;
  /** Optional. Specification for execution on a `WorkerPool`. See [running builds in a private pool](https://cloud.google.com/build/docs/private-pools/run-builds-in-private-pool) for more information. */
  pool?: GoogleDevtoolsCloudbuildV1PoolOption;
  /** Option to specify the logging mode, which determines if and where build logs are stored. */
  logging?: "LOGGING_UNSPECIFIED" | "LEGACY" | "GCS_ONLY" | "STACKDRIVER_ONLY" | "CLOUD_LOGGING_ONLY" | "NONE" | (string & {});
  /** A list of global environment variable definitions that will exist for all build steps in this build. If a variable is defined in both globally and in a build step, the variable will use the build step value. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE". */
  env?: Array<string>;
  /** A list of global environment variables, which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. These variables will be available to all build steps in this build. */
  secretEnv?: Array<string>;
  /** Global list of volumes to mount for ALL build steps Each volume is created as an empty volume prior to starting the build process. Upon completion of the build, volumes and their contents are discarded. Global volume names and paths cannot conflict with the volumes defined a build step. Using a global volume in a build with only one step is not valid as it is indicative of a build request with an incorrect configuration. */
  volumes?: Array<GoogleDevtoolsCloudbuildV1Volume>;
  /** Optional. Option to specify how default logs buckets are setup. */
  defaultLogsBucketBehavior?: "DEFAULT_LOGS_BUCKET_BEHAVIOR_UNSPECIFIED" | "REGIONAL_USER_OWNED_BUCKET" | "LEGACY_BUCKET" | (string & {});
  /** Optional. Option to specify whether structured logging is enabled. If true, JSON-formatted logs are parsed as structured logs. */
  enableStructuredLogging?: boolean;
  /** Optional. Option to specify the Pub/Sub topic to receive build status updates. */
  pubsubTopic?: string;
}

export const GoogleDevtoolsCloudbuildV1BuildOptions: Schema.Schema<GoogleDevtoolsCloudbuildV1BuildOptions> = Schema.suspend(() => Schema.Struct({
  sourceProvenanceHash: Schema.optional(Schema.Array(Schema.String)),
  requestedVerifyOption: Schema.optional(Schema.String),
  machineType: Schema.optional(Schema.String),
  diskSizeGb: Schema.optional(Schema.String),
  substitutionOption: Schema.optional(Schema.String),
  dynamicSubstitutions: Schema.optional(Schema.Boolean),
  automapSubstitutions: Schema.optional(Schema.Boolean),
  logStreamingOption: Schema.optional(Schema.String),
  workerPool: Schema.optional(Schema.String),
  pool: Schema.optional(GoogleDevtoolsCloudbuildV1PoolOption),
  logging: Schema.optional(Schema.String),
  env: Schema.optional(Schema.Array(Schema.String)),
  secretEnv: Schema.optional(Schema.Array(Schema.String)),
  volumes: Schema.optional(Schema.Array(GoogleDevtoolsCloudbuildV1Volume)),
  defaultLogsBucketBehavior: Schema.optional(Schema.String),
  enableStructuredLogging: Schema.optional(Schema.Boolean),
  pubsubTopic: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1BuildOptions" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1BuildOptions>;

export interface GoogleDevtoolsCloudbuildV1Secret {
  /** Cloud KMS key name to use to decrypt these envs. */
  kmsKeyName?: string;
  /** Map of environment variable name to its encrypted value. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build's secrets. */
  secretEnv?: Record<string, string>;
}

export const GoogleDevtoolsCloudbuildV1Secret: Schema.Schema<GoogleDevtoolsCloudbuildV1Secret> = Schema.suspend(() => Schema.Struct({
  kmsKeyName: Schema.optional(Schema.String),
  secretEnv: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1Secret" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1Secret>;

export interface GoogleDevtoolsCloudbuildV1ApprovalConfig {
  /** Whether or not approval is needed. If this is set on a build, it will become pending when created, and will need to be explicitly approved to start. */
  approvalRequired?: boolean;
}

export const GoogleDevtoolsCloudbuildV1ApprovalConfig: Schema.Schema<GoogleDevtoolsCloudbuildV1ApprovalConfig> = Schema.suspend(() => Schema.Struct({
  approvalRequired: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1ApprovalConfig" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1ApprovalConfig>;

export interface GoogleDevtoolsCloudbuildV1ApprovalResult {
  /** Output only. Email of the user that called the ApproveBuild API to approve or reject a build at the time that the API was called. */
  approverAccount?: string;
  /** Output only. The time when the approval decision was made. */
  approvalTime?: string;
  /** Required. The decision of this manual approval. */
  decision?: "DECISION_UNSPECIFIED" | "APPROVED" | "REJECTED" | (string & {});
  /** Optional. An optional comment for this manual approval result. */
  comment?: string;
  /** Optional. An optional URL tied to this manual approval result. This field is essentially the same as comment, except that it will be rendered by the UI differently. An example use case is a link to an external job that approved this Build. */
  url?: string;
}

export const GoogleDevtoolsCloudbuildV1ApprovalResult: Schema.Schema<GoogleDevtoolsCloudbuildV1ApprovalResult> = Schema.suspend(() => Schema.Struct({
  approverAccount: Schema.optional(Schema.String),
  approvalTime: Schema.optional(Schema.String),
  decision: Schema.optional(Schema.String),
  comment: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1ApprovalResult" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1ApprovalResult>;

export interface GoogleDevtoolsCloudbuildV1BuildApproval {
  /** Output only. The state of this build's approval. */
  state?: "STATE_UNSPECIFIED" | "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED" | (string & {});
  /** Output only. Configuration for manual approval of this build. */
  config?: GoogleDevtoolsCloudbuildV1ApprovalConfig;
  /** Output only. Result of manual approval for this Build. */
  result?: GoogleDevtoolsCloudbuildV1ApprovalResult;
}

export const GoogleDevtoolsCloudbuildV1BuildApproval: Schema.Schema<GoogleDevtoolsCloudbuildV1BuildApproval> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  config: Schema.optional(GoogleDevtoolsCloudbuildV1ApprovalConfig),
  result: Schema.optional(GoogleDevtoolsCloudbuildV1ApprovalResult),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1BuildApproval" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1BuildApproval>;

export interface GoogleDevtoolsCloudbuildV1SecretManagerSecret {
  /** Resource name of the SecretVersion. In format: projects/* /secrets/* /versions/* */
  versionName?: string;
  /** Environment variable name to associate with the secret. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. */
  env?: string;
}

export const GoogleDevtoolsCloudbuildV1SecretManagerSecret: Schema.Schema<GoogleDevtoolsCloudbuildV1SecretManagerSecret> = Schema.suspend(() => Schema.Struct({
  versionName: Schema.optional(Schema.String),
  env: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1SecretManagerSecret" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1SecretManagerSecret>;

export interface GoogleDevtoolsCloudbuildV1InlineSecret {
  /** Resource name of Cloud KMS crypto key to decrypt the encrypted value. In format: projects/* /locations/* /keyRings/* /cryptoKeys/* */
  kmsKeyName?: string;
  /** Map of environment variable name to its encrypted value. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build's secrets. */
  envMap?: Record<string, string>;
}

export const GoogleDevtoolsCloudbuildV1InlineSecret: Schema.Schema<GoogleDevtoolsCloudbuildV1InlineSecret> = Schema.suspend(() => Schema.Struct({
  kmsKeyName: Schema.optional(Schema.String),
  envMap: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1InlineSecret" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1InlineSecret>;

export interface GoogleDevtoolsCloudbuildV1Secrets {
  /** Secrets in Secret Manager and associated secret environment variable. */
  secretManager?: Array<GoogleDevtoolsCloudbuildV1SecretManagerSecret>;
  /** Secrets encrypted with KMS key and the associated secret environment variable. */
  inline?: Array<GoogleDevtoolsCloudbuildV1InlineSecret>;
}

export const GoogleDevtoolsCloudbuildV1Secrets: Schema.Schema<GoogleDevtoolsCloudbuildV1Secrets> = Schema.suspend(() => Schema.Struct({
  secretManager: Schema.optional(Schema.Array(GoogleDevtoolsCloudbuildV1SecretManagerSecret)),
  inline: Schema.optional(Schema.Array(GoogleDevtoolsCloudbuildV1InlineSecret)),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1Secrets" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1Secrets>;

export interface GoogleDevtoolsCloudbuildV1Warning {
  /** Explanation of the warning generated. */
  text?: string;
  /** The priority for this warning. */
  priority?: "PRIORITY_UNSPECIFIED" | "INFO" | "WARNING" | "ALERT" | (string & {});
}

export const GoogleDevtoolsCloudbuildV1Warning: Schema.Schema<GoogleDevtoolsCloudbuildV1Warning> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1Warning" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1Warning>;

export interface GoogleDevtoolsCloudbuildV1HttpConfig {
  /** SecretVersion resource of the HTTP proxy URL. The Service Account used in the build (either the default Service Account or user-specified Service Account) should have `secretmanager.versions.access` permissions on this secret. The proxy URL should be in format `protocol://@]proxyhost[:port]`. */
  proxySecretVersionName?: string;
}

export const GoogleDevtoolsCloudbuildV1HttpConfig: Schema.Schema<GoogleDevtoolsCloudbuildV1HttpConfig> = Schema.suspend(() => Schema.Struct({
  proxySecretVersionName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1HttpConfig" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1HttpConfig>;

export interface GoogleDevtoolsCloudbuildV1GitConfig {
  /** Configuration for HTTP related git operations. */
  http?: GoogleDevtoolsCloudbuildV1HttpConfig;
}

export const GoogleDevtoolsCloudbuildV1GitConfig: Schema.Schema<GoogleDevtoolsCloudbuildV1GitConfig> = Schema.suspend(() => Schema.Struct({
  http: Schema.optional(GoogleDevtoolsCloudbuildV1HttpConfig),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1GitConfig" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1GitConfig>;

export interface GoogleDevtoolsCloudbuildV1FailureInfo {
  /** The name of the failure. */
  type?: "FAILURE_TYPE_UNSPECIFIED" | "PUSH_FAILED" | "PUSH_IMAGE_NOT_FOUND" | "PUSH_NOT_AUTHORIZED" | "LOGGING_FAILURE" | "USER_BUILD_STEP" | "FETCH_SOURCE_FAILED" | (string & {});
  /** Explains the failure issue in more detail using hard-coded text. */
  detail?: string;
}

export const GoogleDevtoolsCloudbuildV1FailureInfo: Schema.Schema<GoogleDevtoolsCloudbuildV1FailureInfo> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  detail: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1FailureInfo" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1FailureInfo>;

export interface GoogleDevtoolsCloudbuildV1GitSourceRepository {
  /** Location of the Git repository. */
  url?: string;
  /** The Developer Connect Git repository link formatted as `projects/* /locations/* /connections/* /gitRepositoryLink/*` */
  developerConnect?: string;
}

export const GoogleDevtoolsCloudbuildV1GitSourceRepository: Schema.Schema<GoogleDevtoolsCloudbuildV1GitSourceRepository> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  developerConnect: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1GitSourceRepository" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1GitSourceRepository>;

export interface GoogleDevtoolsCloudbuildV1GitSourceDependency {
  /** Required. The kind of repo (url or dev connect). */
  repository?: GoogleDevtoolsCloudbuildV1GitSourceRepository;
  /** Required. The revision that we will fetch the repo at. */
  revision?: string;
  /** Optional. True if submodules should be fetched too (default false). */
  recurseSubmodules?: boolean;
  /** Optional. How much history should be fetched for the build (default 1, -1 for all history). */
  depth?: string;
  /** Required. Where should the files be placed on the worker. */
  destPath?: string;
}

export const GoogleDevtoolsCloudbuildV1GitSourceDependency: Schema.Schema<GoogleDevtoolsCloudbuildV1GitSourceDependency> = Schema.suspend(() => Schema.Struct({
  repository: Schema.optional(GoogleDevtoolsCloudbuildV1GitSourceRepository),
  revision: Schema.optional(Schema.String),
  recurseSubmodules: Schema.optional(Schema.Boolean),
  depth: Schema.optional(Schema.String),
  destPath: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1GitSourceDependency" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1GitSourceDependency>;

export interface GoogleDevtoolsCloudbuildV1Dependency {
  /** If set to true disable all dependency fetching (ignoring the default source as well). */
  empty?: boolean;
  /** Represents a git repository as a build dependency. */
  gitSource?: GoogleDevtoolsCloudbuildV1GitSourceDependency;
}

export const GoogleDevtoolsCloudbuildV1Dependency: Schema.Schema<GoogleDevtoolsCloudbuildV1Dependency> = Schema.suspend(() => Schema.Struct({
  empty: Schema.optional(Schema.Boolean),
  gitSource: Schema.optional(GoogleDevtoolsCloudbuildV1GitSourceDependency),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1Dependency" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1Dependency>;

export interface GoogleDevtoolsCloudbuildV1Build {
  /** Output only. The 'Build' name with format: `projects/{project}/locations/{location}/builds/{build}`, where {build} is a unique identifier generated by the service. */
  name?: string;
  /** Output only. Unique identifier of the build. */
  id?: string;
  /** Output only. ID of the project. */
  projectId?: string;
  /** Output only. Status of the build. */
  status?: "STATUS_UNKNOWN" | "PENDING" | "QUEUED" | "WORKING" | "SUCCESS" | "FAILURE" | "INTERNAL_ERROR" | "TIMEOUT" | "CANCELLED" | "EXPIRED" | (string & {});
  /** Output only. Customer-readable message about the current status. */
  statusDetail?: string;
  /** Optional. The location of the source files to build. */
  source?: GoogleDevtoolsCloudbuildV1Source;
  /** Required. The operations to be performed on the workspace. */
  steps?: Array<GoogleDevtoolsCloudbuildV1BuildStep>;
  /** Output only. Results of the build. */
  results?: GoogleDevtoolsCloudbuildV1Results;
  /** Output only. Time at which the request to create the build was received. */
  createTime?: string;
  /** Output only. Time at which execution of the build was started. */
  startTime?: string;
  /** Output only. Time at which execution of the build was finished. The difference between finish_time and start_time is the duration of the build's execution. */
  finishTime?: string;
  /** Amount of time that this build should be allowed to run, to second granularity. If this amount of time elapses, work on the build will cease and the build status will be `TIMEOUT`. `timeout` starts ticking from `startTime`. Default time is 60 minutes. */
  timeout?: string;
  /** A list of images to be pushed upon the successful completion of all build steps. The images are pushed using the builder service account's credentials. The digests of the pushed images will be stored in the `Build` resource's results field. If any of the images fail to be pushed, the build status is marked `FAILURE`. */
  images?: Array<string>;
  /** TTL in queue for this build. If provided and the build is enqueued longer than this value, the build will expire and the build status will be `EXPIRED`. The TTL starts ticking from create_time. */
  queueTtl?: string;
  /** Artifacts produced by the build that should be uploaded upon successful completion of all build steps. */
  artifacts?: GoogleDevtoolsCloudbuildV1Artifacts;
  /** Cloud Storage bucket where logs should be written (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). Logs file names will be of the format `${logs_bucket}/log-${build_id}.txt`. */
  logsBucket?: string;
  /** Output only. A permanent fixed identifier for source. */
  sourceProvenance?: GoogleDevtoolsCloudbuildV1SourceProvenance;
  /** Output only. The ID of the `BuildTrigger` that triggered this build, if it was triggered automatically. */
  buildTriggerId?: string;
  /** Special options for this build. */
  options?: GoogleDevtoolsCloudbuildV1BuildOptions;
  /** Output only. URL to logs for this build in Google Cloud Console. */
  logUrl?: string;
  /** Substitutions data for `Build` resource. */
  substitutions?: Record<string, string>;
  /** Tags for annotation of a `Build`. These are not docker tags. */
  tags?: Array<string>;
  /** Secrets to decrypt using Cloud Key Management Service. Note: Secret Manager is the recommended technique for managing sensitive data with Cloud Build. Use `available_secrets` to configure builds to access secrets from Secret Manager. For instructions, see: https://cloud.google.com/cloud-build/docs/securing-builds/use-secrets */
  secrets?: Array<GoogleDevtoolsCloudbuildV1Secret>;
  /** Output only. Stores timing information for phases of the build. Valid keys are: * BUILD: time to execute all build steps. * PUSH: time to push all artifacts including docker images and non docker artifacts. * FETCHSOURCE: time to fetch source. * SETUPBUILD: time to set up build. If the build does not specify source or images, these keys will not be included. */
  timing?: Record<string, GoogleDevtoolsCloudbuildV1TimeSpan>;
  /** Output only. Describes this build's approval configuration, status, and result. */
  approval?: GoogleDevtoolsCloudbuildV1BuildApproval;
  /** IAM service account whose credentials will be used at build runtime. Must be of the format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. ACCOUNT can be email address or uniqueId of the service account. */
  serviceAccount?: string;
  /** Secrets and secret environment variables. */
  availableSecrets?: GoogleDevtoolsCloudbuildV1Secrets;
  /** Output only. Non-fatal problems encountered during the execution of the build. */
  warnings?: Array<GoogleDevtoolsCloudbuildV1Warning>;
  /** Optional. Configuration for git operations. */
  gitConfig?: GoogleDevtoolsCloudbuildV1GitConfig;
  /** Output only. Contains information about the build when status=FAILURE. */
  failureInfo?: GoogleDevtoolsCloudbuildV1FailureInfo;
  /** Optional. Dependencies that the Cloud Build worker will fetch before executing user steps. */
  dependencies?: Array<GoogleDevtoolsCloudbuildV1Dependency>;
}

export const GoogleDevtoolsCloudbuildV1Build: Schema.Schema<GoogleDevtoolsCloudbuildV1Build> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  statusDetail: Schema.optional(Schema.String),
  source: Schema.optional(GoogleDevtoolsCloudbuildV1Source),
  steps: Schema.optional(Schema.Array(GoogleDevtoolsCloudbuildV1BuildStep)),
  results: Schema.optional(GoogleDevtoolsCloudbuildV1Results),
  createTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  finishTime: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.String),
  images: Schema.optional(Schema.Array(Schema.String)),
  queueTtl: Schema.optional(Schema.String),
  artifacts: Schema.optional(GoogleDevtoolsCloudbuildV1Artifacts),
  logsBucket: Schema.optional(Schema.String),
  sourceProvenance: Schema.optional(GoogleDevtoolsCloudbuildV1SourceProvenance),
  buildTriggerId: Schema.optional(Schema.String),
  options: Schema.optional(GoogleDevtoolsCloudbuildV1BuildOptions),
  logUrl: Schema.optional(Schema.String),
  substitutions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  tags: Schema.optional(Schema.Array(Schema.String)),
  secrets: Schema.optional(Schema.Array(GoogleDevtoolsCloudbuildV1Secret)),
  timing: Schema.optional(Schema.Record(Schema.String, GoogleDevtoolsCloudbuildV1TimeSpan)),
  approval: Schema.optional(GoogleDevtoolsCloudbuildV1BuildApproval),
  serviceAccount: Schema.optional(Schema.String),
  availableSecrets: Schema.optional(GoogleDevtoolsCloudbuildV1Secrets),
  warnings: Schema.optional(Schema.Array(GoogleDevtoolsCloudbuildV1Warning)),
  gitConfig: Schema.optional(GoogleDevtoolsCloudbuildV1GitConfig),
  failureInfo: Schema.optional(GoogleDevtoolsCloudbuildV1FailureInfo),
  dependencies: Schema.optional(Schema.Array(GoogleDevtoolsCloudbuildV1Dependency)),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1Build" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1Build>;

export interface GoogleDevtoolsCloudbuildV1BuildOperationMetadata {
  /** The build that the operation is tracking. */
  build?: GoogleDevtoolsCloudbuildV1Build;
}

export const GoogleDevtoolsCloudbuildV1BuildOperationMetadata: Schema.Schema<GoogleDevtoolsCloudbuildV1BuildOperationMetadata> = Schema.suspend(() => Schema.Struct({
  build: Schema.optional(GoogleDevtoolsCloudbuildV1Build),
})).annotate({ identifier: "GoogleDevtoolsCloudbuildV1BuildOperationMetadata" }) as any as Schema.Schema<GoogleDevtoolsCloudbuildV1BuildOperationMetadata>;

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

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export const listProjectsLocations: API.PaginatedOperationMethod<ListProjectsLocationsRequest, ListProjectsLocationsResponse, ListProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsOperationsRequest {
  /** Required. To query for all of the operations for a project. */
  name: string;
  /** Optional. A filter for matching the completed or in-progress operations. The supported formats of *filter* are: To query for only completed operations: done:true To query for only ongoing operations: done:false Must be empty to query for all of the latest operations for the given parent project. */
  filter?: string;
  /** The maximum number of records that should be returned. Requested page size cannot exceed 100. If not set or set to less than or equal to 0, the default page size is 100. . */
  pageSize?: number;
  /** Token identifying which result to start with, which is returned by a previous list call. */
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

export type ListProjectsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsOperations: API.PaginatedOperationMethod<ListProjectsLocationsOperationsRequest, ListProjectsLocationsOperationsResponse, ListProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
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
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsLocationsOperationsError = CommonErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
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
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = CommonErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteProjectsLocationsOperations: API.OperationMethod<DeleteProjectsLocationsOperationsRequest, DeleteProjectsLocationsOperationsResponse, DeleteProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface WaitProjectsLocationsOperationsRequest {
  /** The name of the operation resource to wait on. */
  name: string;
  /** Request body */
  body?: GoogleLongrunningWaitOperationRequest;
}

export const WaitProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleLongrunningWaitOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:wait", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WaitProjectsLocationsOperationsRequest>;

export type WaitProjectsLocationsOperationsResponse = GoogleLongrunningOperation;
export const WaitProjectsLocationsOperationsResponse = GoogleLongrunningOperation;

export type WaitProjectsLocationsOperationsError = CommonErrors;

/** Waits until the specified long-running operation is done or reaches at most a specified timeout, returning the latest state. If the operation is already done, the latest state is immediately returned. If the timeout specified is greater than the default HTTP/RPC timeout, the HTTP/RPC timeout is used. If the server does not support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Note that this method is on a best-effort basis. It may return the latest state before the specified timeout (including immediately), meaning even an immediate response is no guarantee that the operation is done. */
export const waitProjectsLocationsOperations: API.OperationMethod<WaitProjectsLocationsOperationsRequest, WaitProjectsLocationsOperationsResponse, WaitProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WaitProjectsLocationsOperationsRequest,
  output: WaitProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAuthorizeddomainsRequest {
  /** Name of the parent Project resource. Example: `projects/myproject`. */
  parent: string;
  /** Maximum results to return per page. */
  pageSize?: number;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListProjectsLocationsAuthorizeddomainsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/authorizeddomains" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAuthorizeddomainsRequest>;

export type ListProjectsLocationsAuthorizeddomainsResponse = ListAuthorizedDomainsResponse;
export const ListProjectsLocationsAuthorizeddomainsResponse = ListAuthorizedDomainsResponse;

export type ListProjectsLocationsAuthorizeddomainsError = CommonErrors;

/** List authorized domains. */
export const listProjectsLocationsAuthorizeddomains: API.PaginatedOperationMethod<ListProjectsLocationsAuthorizeddomainsRequest, ListProjectsLocationsAuthorizeddomainsResponse, ListProjectsLocationsAuthorizeddomainsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAuthorizeddomainsRequest,
  output: ListProjectsLocationsAuthorizeddomainsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsRevisionsRequest {
  /** The namespace from which the revisions should be listed. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  parent: string;
  /** Optional. The maximum number of records that should be returned. */
  limit?: number;
  /** Not currently used by Cloud Run. */
  includeUninitialized?: boolean;
  /** Allows to filter resources based on a specific value for a field name. Send this in a query string format. i.e. 'metadata.name%3Dlorem'. Not currently used by Cloud Run. */
  fieldSelector?: string;
  /** Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. */
  labelSelector?: string;
  /** The baseline resource version from which the list or watch operation should start. Not currently used by Cloud Run. */
  resourceVersion?: string;
  /** Flag that indicates that the client expects to watch this resource as well. Not currently used by Cloud Run. */
  watch?: boolean;
  /** Optional. Encoded string to continue paging. */
  continue?: string;
}

export const ListProjectsLocationsRevisionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  includeUninitialized: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeUninitialized")),
  fieldSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldSelector")),
  labelSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("labelSelector")),
  resourceVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("resourceVersion")),
  watch: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("watch")),
  continue: Schema.optional(Schema.String).pipe(T.HttpQuery("continue")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/revisions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRevisionsRequest>;

export type ListProjectsLocationsRevisionsResponse = ListRevisionsResponse;
export const ListProjectsLocationsRevisionsResponse = ListRevisionsResponse;

export type ListProjectsLocationsRevisionsError = CommonErrors;

/** List revisions. Results are sorted by creation time, descending. */
export const listProjectsLocationsRevisions: API.OperationMethod<ListProjectsLocationsRevisionsRequest, ListProjectsLocationsRevisionsResponse, ListProjectsLocationsRevisionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsRevisionsRequest,
  output: ListProjectsLocationsRevisionsResponse,
  errors: [],
}));

export interface GetProjectsLocationsRevisionsRequest {
  /** The name of the revision to retrieve. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  name: string;
}

export const GetProjectsLocationsRevisionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/revisions/{revisionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRevisionsRequest>;

export type GetProjectsLocationsRevisionsResponse = Revision;
export const GetProjectsLocationsRevisionsResponse = Revision;

export type GetProjectsLocationsRevisionsError = CommonErrors;

/** Get information about a revision. */
export const getProjectsLocationsRevisions: API.OperationMethod<GetProjectsLocationsRevisionsRequest, GetProjectsLocationsRevisionsResponse, GetProjectsLocationsRevisionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRevisionsRequest,
  output: GetProjectsLocationsRevisionsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsRevisionsRequest {
  /** The name of the revision to delete. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  name: string;
  /** Specifies the propagation policy of delete. Cloud Run currently ignores this setting, and deletes in the background. */
  propagationPolicy?: string;
  /** Cloud Run currently ignores this parameter. */
  kind?: string;
  /** Cloud Run currently ignores this parameter. */
  apiVersion?: string;
  /** Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` */
  dryRun?: string;
}

export const DeleteProjectsLocationsRevisionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  propagationPolicy: Schema.optional(Schema.String).pipe(T.HttpQuery("propagationPolicy")),
  kind: Schema.optional(Schema.String).pipe(T.HttpQuery("kind")),
  apiVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("apiVersion")),
  dryRun: Schema.optional(Schema.String).pipe(T.HttpQuery("dryRun")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/revisions/{revisionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRevisionsRequest>;

export type DeleteProjectsLocationsRevisionsResponse = Status;
export const DeleteProjectsLocationsRevisionsResponse = Status;

export type DeleteProjectsLocationsRevisionsError = CommonErrors;

/** Delete a revision. */
export const deleteProjectsLocationsRevisions: API.OperationMethod<DeleteProjectsLocationsRevisionsRequest, DeleteProjectsLocationsRevisionsResponse, DeleteProjectsLocationsRevisionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRevisionsRequest,
  output: DeleteProjectsLocationsRevisionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsConfigurationsRequest {
  /** The namespace from which the configurations should be listed. For Cloud Run, replace {namespace_id} with the project ID or number. */
  parent: string;
  /** Optional. The maximum number of the records that should be returned. */
  limit?: number;
  /** Not supported by Cloud Run. */
  includeUninitialized?: boolean;
  /** Not supported by Cloud Run. */
  fieldSelector?: string;
  /** Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. */
  labelSelector?: string;
  /** Not supported by Cloud Run. */
  resourceVersion?: string;
  /** Not supported by Cloud Run. */
  watch?: boolean;
  /** Optional. Encoded string to continue paging. */
  continue?: string;
}

export const ListProjectsLocationsConfigurationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  includeUninitialized: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeUninitialized")),
  fieldSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldSelector")),
  labelSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("labelSelector")),
  resourceVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("resourceVersion")),
  watch: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("watch")),
  continue: Schema.optional(Schema.String).pipe(T.HttpQuery("continue")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/configurations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConfigurationsRequest>;

export type ListProjectsLocationsConfigurationsResponse = ListConfigurationsResponse;
export const ListProjectsLocationsConfigurationsResponse = ListConfigurationsResponse;

export type ListProjectsLocationsConfigurationsError = CommonErrors;

/** List configurations. Results are sorted by creation time, descending. */
export const listProjectsLocationsConfigurations: API.OperationMethod<ListProjectsLocationsConfigurationsRequest, ListProjectsLocationsConfigurationsResponse, ListProjectsLocationsConfigurationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsConfigurationsRequest,
  output: ListProjectsLocationsConfigurationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsConfigurationsRequest {
  /** The name of the configuration to retrieve. For Cloud Run, replace {namespace_id} with the project ID or number. */
  name: string;
}

export const GetProjectsLocationsConfigurationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/configurations/{configurationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsConfigurationsRequest>;

export type GetProjectsLocationsConfigurationsResponse = Configuration;
export const GetProjectsLocationsConfigurationsResponse = Configuration;

export type GetProjectsLocationsConfigurationsError = CommonErrors;

/** Get information about a configuration. */
export const getProjectsLocationsConfigurations: API.OperationMethod<GetProjectsLocationsConfigurationsRequest, GetProjectsLocationsConfigurationsResponse, GetProjectsLocationsConfigurationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsConfigurationsRequest,
  output: GetProjectsLocationsConfigurationsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsDomainmappingsRequest {
  /** Required. The namespace in which the domain mapping should be created. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  parent: string;
  /** Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` */
  dryRun?: string;
  /** Request body */
  body?: DomainMapping;
}

export const CreateProjectsLocationsDomainmappingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dryRun: Schema.optional(Schema.String).pipe(T.HttpQuery("dryRun")),
  body: Schema.optional(DomainMapping).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/domainmappings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDomainmappingsRequest>;

export type CreateProjectsLocationsDomainmappingsResponse = DomainMapping;
export const CreateProjectsLocationsDomainmappingsResponse = DomainMapping;

export type CreateProjectsLocationsDomainmappingsError = CommonErrors;

/** Create a new domain mapping. */
export const createProjectsLocationsDomainmappings: API.OperationMethod<CreateProjectsLocationsDomainmappingsRequest, CreateProjectsLocationsDomainmappingsResponse, CreateProjectsLocationsDomainmappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDomainmappingsRequest,
  output: CreateProjectsLocationsDomainmappingsResponse,
  errors: [],
}));

export interface ListProjectsLocationsDomainmappingsRequest {
  /** Required. The namespace from which the domain mappings should be listed. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  parent: string;
  /** Optional. The maximum number of records that should be returned. */
  limit?: number;
  /** Not currently used by Cloud Run. */
  includeUninitialized?: boolean;
  /** Allows to filter resources based on a specific value for a field name. Send this in a query string format. i.e. 'metadata.name%3Dlorem'. Not currently used by Cloud Run. */
  fieldSelector?: string;
  /** Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. */
  labelSelector?: string;
  /** The baseline resource version from which the list or watch operation should start. Not currently used by Cloud Run. */
  resourceVersion?: string;
  /** Flag that indicates that the client expects to watch this resource as well. Not currently used by Cloud Run. */
  watch?: boolean;
  /** Optional. Encoded string to continue paging. */
  continue?: string;
}

export const ListProjectsLocationsDomainmappingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  includeUninitialized: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeUninitialized")),
  fieldSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldSelector")),
  labelSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("labelSelector")),
  resourceVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("resourceVersion")),
  watch: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("watch")),
  continue: Schema.optional(Schema.String).pipe(T.HttpQuery("continue")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/domainmappings" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDomainmappingsRequest>;

export type ListProjectsLocationsDomainmappingsResponse = ListDomainMappingsResponse;
export const ListProjectsLocationsDomainmappingsResponse = ListDomainMappingsResponse;

export type ListProjectsLocationsDomainmappingsError = CommonErrors;

/** List all domain mappings. */
export const listProjectsLocationsDomainmappings: API.OperationMethod<ListProjectsLocationsDomainmappingsRequest, ListProjectsLocationsDomainmappingsResponse, ListProjectsLocationsDomainmappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsDomainmappingsRequest,
  output: ListProjectsLocationsDomainmappingsResponse,
  errors: [],
}));

export interface GetProjectsLocationsDomainmappingsRequest {
  /** Required. The name of the domain mapping to retrieve. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  name: string;
}

export const GetProjectsLocationsDomainmappingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/domainmappings/{domainmappingsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDomainmappingsRequest>;

export type GetProjectsLocationsDomainmappingsResponse = DomainMapping;
export const GetProjectsLocationsDomainmappingsResponse = DomainMapping;

export type GetProjectsLocationsDomainmappingsError = CommonErrors;

/** Get information about a domain mapping. */
export const getProjectsLocationsDomainmappings: API.OperationMethod<GetProjectsLocationsDomainmappingsRequest, GetProjectsLocationsDomainmappingsResponse, GetProjectsLocationsDomainmappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDomainmappingsRequest,
  output: GetProjectsLocationsDomainmappingsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsDomainmappingsRequest {
  /** Required. The name of the domain mapping to delete. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  name: string;
  /** Specifies the propagation policy of delete. Cloud Run currently ignores this setting, and deletes in the background. Please see kubernetes.io/docs/concepts/architecture/garbage-collection/ for more information. */
  propagationPolicy?: string;
  /** Cloud Run currently ignores this parameter. */
  kind?: string;
  /** Cloud Run currently ignores this parameter. */
  apiVersion?: string;
  /** Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` */
  dryRun?: string;
}

export const DeleteProjectsLocationsDomainmappingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  propagationPolicy: Schema.optional(Schema.String).pipe(T.HttpQuery("propagationPolicy")),
  kind: Schema.optional(Schema.String).pipe(T.HttpQuery("kind")),
  apiVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("apiVersion")),
  dryRun: Schema.optional(Schema.String).pipe(T.HttpQuery("dryRun")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/domainmappings/{domainmappingsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDomainmappingsRequest>;

export type DeleteProjectsLocationsDomainmappingsResponse = Status;
export const DeleteProjectsLocationsDomainmappingsResponse = Status;

export type DeleteProjectsLocationsDomainmappingsError = CommonErrors;

/** Delete a domain mapping. */
export const deleteProjectsLocationsDomainmappings: API.OperationMethod<DeleteProjectsLocationsDomainmappingsRequest, DeleteProjectsLocationsDomainmappingsResponse, DeleteProjectsLocationsDomainmappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDomainmappingsRequest,
  output: DeleteProjectsLocationsDomainmappingsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsInstancesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsInstancesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsInstancesRequest>;

export type GetIamPolicyProjectsLocationsInstancesResponse = Policy;
export const GetIamPolicyProjectsLocationsInstancesResponse = Policy;

export type GetIamPolicyProjectsLocationsInstancesError = CommonErrors;

/** Get the IAM Access Control policy currently in effect for the given instance. This result does not include any inherited policies. */
export const getIamPolicyProjectsLocationsInstances: API.OperationMethod<GetIamPolicyProjectsLocationsInstancesRequest, GetIamPolicyProjectsLocationsInstancesResponse, GetIamPolicyProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsInstancesRequest,
  output: GetIamPolicyProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsInstancesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsInstancesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsInstancesRequest>;

export type SetIamPolicyProjectsLocationsInstancesResponse = Policy;
export const SetIamPolicyProjectsLocationsInstancesResponse = Policy;

export type SetIamPolicyProjectsLocationsInstancesError = CommonErrors;

/** Sets the IAM Access control policy for the specified instance. Overwrites any existing policy. */
export const setIamPolicyProjectsLocationsInstances: API.OperationMethod<SetIamPolicyProjectsLocationsInstancesRequest, SetIamPolicyProjectsLocationsInstancesResponse, SetIamPolicyProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsInstancesRequest,
  output: SetIamPolicyProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsInstancesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsInstancesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsInstancesRequest>;

export type TestIamPermissionsProjectsLocationsInstancesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsInstancesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsInstancesError = CommonErrors;

/** Returns permissions that a caller has on the specified instance. There are no permissions required for making this API call. */
export const testIamPermissionsProjectsLocationsInstances: API.OperationMethod<TestIamPermissionsProjectsLocationsInstancesRequest, TestIamPermissionsProjectsLocationsInstancesResponse, TestIamPermissionsProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsInstancesRequest,
  output: TestIamPermissionsProjectsLocationsInstancesResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsJobsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsJobsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/jobs/{jobsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsJobsRequest>;

export type GetIamPolicyProjectsLocationsJobsResponse = Policy;
export const GetIamPolicyProjectsLocationsJobsResponse = Policy;

export type GetIamPolicyProjectsLocationsJobsError = CommonErrors;

/** Get the IAM Access Control policy currently in effect for the given job. This result does not include any inherited policies. */
export const getIamPolicyProjectsLocationsJobs: API.OperationMethod<GetIamPolicyProjectsLocationsJobsRequest, GetIamPolicyProjectsLocationsJobsResponse, GetIamPolicyProjectsLocationsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsJobsRequest,
  output: GetIamPolicyProjectsLocationsJobsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsJobsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsJobsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/jobs/{jobsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsJobsRequest>;

export type SetIamPolicyProjectsLocationsJobsResponse = Policy;
export const SetIamPolicyProjectsLocationsJobsResponse = Policy;

export type SetIamPolicyProjectsLocationsJobsError = CommonErrors;

/** Sets the IAM Access control policy for the specified job. Overwrites any existing policy. */
export const setIamPolicyProjectsLocationsJobs: API.OperationMethod<SetIamPolicyProjectsLocationsJobsRequest, SetIamPolicyProjectsLocationsJobsResponse, SetIamPolicyProjectsLocationsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsJobsRequest,
  output: SetIamPolicyProjectsLocationsJobsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsJobsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsJobsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/jobs/{jobsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsJobsRequest>;

export type TestIamPermissionsProjectsLocationsJobsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsJobsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsJobsError = CommonErrors;

/** Returns permissions that a caller has on the specified job. There are no permissions required for making this API call. */
export const testIamPermissionsProjectsLocationsJobs: API.OperationMethod<TestIamPermissionsProjectsLocationsJobsRequest, TestIamPermissionsProjectsLocationsJobsResponse, TestIamPermissionsProjectsLocationsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsJobsRequest,
  output: TestIamPermissionsProjectsLocationsJobsResponse,
  errors: [],
}));

export interface ListProjectsLocationsRoutesRequest {
  /** The namespace from which the routes should be listed. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  parent: string;
  /** Optional. The maximum number of records that should be returned. */
  limit?: number;
  /** Not currently used by Cloud Run. */
  includeUninitialized?: boolean;
  /** Allows to filter resources based on a specific value for a field name. Send this in a query string format. i.e. 'metadata.name%3Dlorem'. Not currently used by Cloud Run. */
  fieldSelector?: string;
  /** Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. */
  labelSelector?: string;
  /** The baseline resource version from which the list or watch operation should start. Not currently used by Cloud Run. */
  resourceVersion?: string;
  /** Flag that indicates that the client expects to watch this resource as well. Not currently used by Cloud Run. */
  watch?: boolean;
  /** Optional. Encoded string to continue paging. */
  continue?: string;
}

export const ListProjectsLocationsRoutesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  includeUninitialized: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeUninitialized")),
  fieldSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldSelector")),
  labelSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("labelSelector")),
  resourceVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("resourceVersion")),
  watch: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("watch")),
  continue: Schema.optional(Schema.String).pipe(T.HttpQuery("continue")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/routes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRoutesRequest>;

export type ListProjectsLocationsRoutesResponse = ListRoutesResponse;
export const ListProjectsLocationsRoutesResponse = ListRoutesResponse;

export type ListProjectsLocationsRoutesError = CommonErrors;

/** List routes. Results are sorted by creation time, descending. */
export const listProjectsLocationsRoutes: API.OperationMethod<ListProjectsLocationsRoutesRequest, ListProjectsLocationsRoutesResponse, ListProjectsLocationsRoutesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsRoutesRequest,
  output: ListProjectsLocationsRoutesResponse,
  errors: [],
}));

export interface GetProjectsLocationsRoutesRequest {
  /** The name of the route to retrieve. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  name: string;
}

export const GetProjectsLocationsRoutesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/routes/{routesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRoutesRequest>;

export type GetProjectsLocationsRoutesResponse = Route;
export const GetProjectsLocationsRoutesResponse = Route;

export type GetProjectsLocationsRoutesError = CommonErrors;

/** Get information about a route. */
export const getProjectsLocationsRoutes: API.OperationMethod<GetProjectsLocationsRoutesRequest, GetProjectsLocationsRoutesResponse, GetProjectsLocationsRoutesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRoutesRequest,
  output: GetProjectsLocationsRoutesResponse,
  errors: [],
}));

export interface ListProjectsLocationsServicesRequest {
  /** Required. The parent from where the resources should be listed. In Cloud Run, it may be one of the following: * `{project_id_or_number}` * `namespaces/{project_id_or_number}` * `namespaces/{project_id_or_number}/services` * `projects/{project_id_or_number}/locations/{region}` * `projects/{project_id_or_number}/regions/{region}` */
  parent: string;
  /** The maximum number of records that should be returned. */
  limit?: number;
  /** Not supported, and ignored by Cloud Run. */
  includeUninitialized?: boolean;
  /** Not supported, and ignored by Cloud Run. */
  fieldSelector?: string;
  /** Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. */
  labelSelector?: string;
  /** Not supported, and ignored by Cloud Run. */
  resourceVersion?: string;
  /** Not supported, and ignored by Cloud Run. */
  watch?: boolean;
  /** Encoded string to continue paging. */
  continue?: string;
}

export const ListProjectsLocationsServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  includeUninitialized: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeUninitialized")),
  fieldSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldSelector")),
  labelSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("labelSelector")),
  resourceVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("resourceVersion")),
  watch: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("watch")),
  continue: Schema.optional(Schema.String).pipe(T.HttpQuery("continue")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsServicesRequest>;

export type ListProjectsLocationsServicesResponse = ListServicesResponse;
export const ListProjectsLocationsServicesResponse = ListServicesResponse;

export type ListProjectsLocationsServicesError = CommonErrors;

/** Lists services for the given project and region. Results are sorted by creation time, descending. */
export const listProjectsLocationsServices: API.OperationMethod<ListProjectsLocationsServicesRequest, ListProjectsLocationsServicesResponse, ListProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsServicesRequest,
  output: ListProjectsLocationsServicesResponse,
  errors: [],
}));

export interface GetProjectsLocationsServicesRequest {
  /** Required. The fully qualified name of the service to retrieve. It can be any of the following forms: * `namespaces/{project_id_or_number}/services/{service_name}` (only when the `endpoint` is regional) * `projects/{project_id_or_number}/locations/{region}/services/{service_name}` * `projects/{project_id_or_number}/regions/{region}/services/{service_name}` */
  name: string;
}

export const GetProjectsLocationsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsServicesRequest>;

export type GetProjectsLocationsServicesResponse = Service;
export const GetProjectsLocationsServicesResponse = Service;

export type GetProjectsLocationsServicesError = CommonErrors;

/** Gets information about a service. */
export const getProjectsLocationsServices: API.OperationMethod<GetProjectsLocationsServicesRequest, GetProjectsLocationsServicesResponse, GetProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsServicesRequest,
  output: GetProjectsLocationsServicesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsServicesRequest {
  /** Required. The resource's parent. In Cloud Run, it may be one of the following: * `{project_id_or_number}` * `namespaces/{project_id_or_number}` * `namespaces/{project_id_or_number}/services` * `projects/{project_id_or_number}/locations/{region}` * `projects/{project_id_or_number}/regions/{region}` */
  parent: string;
  /** Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` */
  dryRun?: string;
  /** Request body */
  body?: Service;
}

export const CreateProjectsLocationsServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dryRun: Schema.optional(Schema.String).pipe(T.HttpQuery("dryRun")),
  body: Schema.optional(Service).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsServicesRequest>;

export type CreateProjectsLocationsServicesResponse = Service;
export const CreateProjectsLocationsServicesResponse = Service;

export type CreateProjectsLocationsServicesError = CommonErrors;

/** Creates a new Service. Service creation will trigger a new deployment. Use GetService, and check service.status to determine if the Service is ready. */
export const createProjectsLocationsServices: API.OperationMethod<CreateProjectsLocationsServicesRequest, CreateProjectsLocationsServicesResponse, CreateProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsServicesRequest,
  output: CreateProjectsLocationsServicesResponse,
  errors: [],
}));

export interface ReplaceServiceProjectsLocationsServicesRequest {
  /** Required. The fully qualified name of the service to replace. It can be any of the following forms: * `namespaces/{project_id_or_number}/services/{service_name}` (only when the `endpoint` is regional) * `projects/{project_id_or_number}/locations/{region}/services/{service_name}` * `projects/{project_id_or_number}/regions/{region}/services/{service_name}` */
  name: string;
  /** Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` */
  dryRun?: string;
  /** Request body */
  body?: Service;
}

export const ReplaceServiceProjectsLocationsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  dryRun: Schema.optional(Schema.String).pipe(T.HttpQuery("dryRun")),
  body: Schema.optional(Service).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReplaceServiceProjectsLocationsServicesRequest>;

export type ReplaceServiceProjectsLocationsServicesResponse = Service;
export const ReplaceServiceProjectsLocationsServicesResponse = Service;

export type ReplaceServiceProjectsLocationsServicesError = CommonErrors;

/** Replaces a service. Only the spec and metadata labels and annotations are modifiable. After the Update request, Cloud Run will work to make the 'status' match the requested 'spec'. May provide metadata.resourceVersion to enforce update from last read for optimistic concurrency control. */
export const replaceServiceProjectsLocationsServices: API.OperationMethod<ReplaceServiceProjectsLocationsServicesRequest, ReplaceServiceProjectsLocationsServicesResponse, ReplaceServiceProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReplaceServiceProjectsLocationsServicesRequest,
  output: ReplaceServiceProjectsLocationsServicesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsServicesRequest {
  /** Required. The fully qualified name of the service to delete. It can be any of the following forms: * `namespaces/{project_id_or_number}/services/{service_name}` (only when the `endpoint` is regional) * `projects/{project_id_or_number}/locations/{region}/services/{service_name}` * `projects/{project_id_or_number}/regions/{region}/services/{service_name}` */
  name: string;
  /** Not supported, and ignored by Cloud Run. */
  propagationPolicy?: string;
  /** Not supported, and ignored by Cloud Run. */
  kind?: string;
  /** Not supported, and ignored by Cloud Run. */
  apiVersion?: string;
  /** Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` */
  dryRun?: string;
}

export const DeleteProjectsLocationsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  propagationPolicy: Schema.optional(Schema.String).pipe(T.HttpQuery("propagationPolicy")),
  kind: Schema.optional(Schema.String).pipe(T.HttpQuery("kind")),
  apiVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("apiVersion")),
  dryRun: Schema.optional(Schema.String).pipe(T.HttpQuery("dryRun")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsServicesRequest>;

export type DeleteProjectsLocationsServicesResponse = Status;
export const DeleteProjectsLocationsServicesResponse = Status;

export type DeleteProjectsLocationsServicesError = CommonErrors;

/** Deletes the provided service. This will cause the Service to stop serving traffic and will delete all associated Revisions. */
export const deleteProjectsLocationsServices: API.OperationMethod<DeleteProjectsLocationsServicesRequest, DeleteProjectsLocationsServicesResponse, DeleteProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsServicesRequest,
  output: DeleteProjectsLocationsServicesResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsServicesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsServicesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsServicesRequest>;

export type GetIamPolicyProjectsLocationsServicesResponse = Policy;
export const GetIamPolicyProjectsLocationsServicesResponse = Policy;

export type GetIamPolicyProjectsLocationsServicesError = CommonErrors;

/** Gets the IAM Access Control policy currently in effect for the given Cloud Run service. This result does not include any inherited policies. */
export const getIamPolicyProjectsLocationsServices: API.OperationMethod<GetIamPolicyProjectsLocationsServicesRequest, GetIamPolicyProjectsLocationsServicesResponse, GetIamPolicyProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsServicesRequest,
  output: GetIamPolicyProjectsLocationsServicesResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsServicesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsServicesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsServicesRequest>;

export type SetIamPolicyProjectsLocationsServicesResponse = Policy;
export const SetIamPolicyProjectsLocationsServicesResponse = Policy;

export type SetIamPolicyProjectsLocationsServicesError = CommonErrors;

/** Sets the IAM Access control policy for the specified Service. Overwrites any existing policy. */
export const setIamPolicyProjectsLocationsServices: API.OperationMethod<SetIamPolicyProjectsLocationsServicesRequest, SetIamPolicyProjectsLocationsServicesResponse, SetIamPolicyProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsServicesRequest,
  output: SetIamPolicyProjectsLocationsServicesResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsServicesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsServicesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/{servicesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsServicesRequest>;

export type TestIamPermissionsProjectsLocationsServicesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsServicesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsServicesError = CommonErrors;

/** Returns permissions that a caller has on the specified Project. There are no permissions required for making this API call. */
export const testIamPermissionsProjectsLocationsServices: API.OperationMethod<TestIamPermissionsProjectsLocationsServicesRequest, TestIamPermissionsProjectsLocationsServicesResponse, TestIamPermissionsProjectsLocationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsServicesRequest,
  output: TestIamPermissionsProjectsLocationsServicesResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsWorkerpoolsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsWorkerpoolsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/workerpools/{workerpoolsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsWorkerpoolsRequest>;

export type GetIamPolicyProjectsLocationsWorkerpoolsResponse = Policy;
export const GetIamPolicyProjectsLocationsWorkerpoolsResponse = Policy;

export type GetIamPolicyProjectsLocationsWorkerpoolsError = CommonErrors;

/** Get the IAM Access Control policy currently in effect for the given worker pool. This result does not include any inherited policies. */
export const getIamPolicyProjectsLocationsWorkerpools: API.OperationMethod<GetIamPolicyProjectsLocationsWorkerpoolsRequest, GetIamPolicyProjectsLocationsWorkerpoolsResponse, GetIamPolicyProjectsLocationsWorkerpoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsWorkerpoolsRequest,
  output: GetIamPolicyProjectsLocationsWorkerpoolsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsWorkerpoolsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsWorkerpoolsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/workerpools/{workerpoolsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsWorkerpoolsRequest>;

export type SetIamPolicyProjectsLocationsWorkerpoolsResponse = Policy;
export const SetIamPolicyProjectsLocationsWorkerpoolsResponse = Policy;

export type SetIamPolicyProjectsLocationsWorkerpoolsError = CommonErrors;

/** Sets the IAM Access control policy for the specified worker pool. Overwrites any existing policy. */
export const setIamPolicyProjectsLocationsWorkerpools: API.OperationMethod<SetIamPolicyProjectsLocationsWorkerpoolsRequest, SetIamPolicyProjectsLocationsWorkerpoolsResponse, SetIamPolicyProjectsLocationsWorkerpoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsWorkerpoolsRequest,
  output: SetIamPolicyProjectsLocationsWorkerpoolsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsWorkerpoolsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsWorkerpoolsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/workerpools/{workerpoolsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsWorkerpoolsRequest>;

export type TestIamPermissionsProjectsLocationsWorkerpoolsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsWorkerpoolsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsWorkerpoolsError = CommonErrors;

/** Returns permissions that a caller has on the specified worker pool. There are no permissions required for making this API call. */
export const testIamPermissionsProjectsLocationsWorkerpools: API.OperationMethod<TestIamPermissionsProjectsLocationsWorkerpoolsRequest, TestIamPermissionsProjectsLocationsWorkerpoolsResponse, TestIamPermissionsProjectsLocationsWorkerpoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsWorkerpoolsRequest,
  output: TestIamPermissionsProjectsLocationsWorkerpoolsResponse,
  errors: [],
}));

export interface ListProjectsAuthorizeddomainsRequest {
  /** Name of the parent Project resource. Example: `projects/myproject`. */
  parent: string;
  /** Maximum results to return per page. */
  pageSize?: number;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListProjectsAuthorizeddomainsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/authorizeddomains" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAuthorizeddomainsRequest>;

export type ListProjectsAuthorizeddomainsResponse = ListAuthorizedDomainsResponse;
export const ListProjectsAuthorizeddomainsResponse = ListAuthorizedDomainsResponse;

export type ListProjectsAuthorizeddomainsError = CommonErrors;

/** List authorized domains. */
export const listProjectsAuthorizeddomains: API.PaginatedOperationMethod<ListProjectsAuthorizeddomainsRequest, ListProjectsAuthorizeddomainsResponse, ListProjectsAuthorizeddomainsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsAuthorizeddomainsRequest,
  output: ListProjectsAuthorizeddomainsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListNamespacesAuthorizeddomainsRequest {
  /** Name of the parent Project resource. Example: `projects/myproject`. */
  parent: string;
  /** Maximum results to return per page. */
  pageSize?: number;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListNamespacesAuthorizeddomainsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "apis/domains.cloudrun.com/v1/namespaces/{namespacesId}/authorizeddomains" }),
  svc,
) as unknown as Schema.Schema<ListNamespacesAuthorizeddomainsRequest>;

export type ListNamespacesAuthorizeddomainsResponse = ListAuthorizedDomainsResponse;
export const ListNamespacesAuthorizeddomainsResponse = ListAuthorizedDomainsResponse;

export type ListNamespacesAuthorizeddomainsError = CommonErrors;

/** List authorized domains. */
export const listNamespacesAuthorizeddomains: API.PaginatedOperationMethod<ListNamespacesAuthorizeddomainsRequest, ListNamespacesAuthorizeddomainsResponse, ListNamespacesAuthorizeddomainsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListNamespacesAuthorizeddomainsRequest,
  output: ListNamespacesAuthorizeddomainsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListNamespacesRevisionsRequest {
  /** The namespace from which the revisions should be listed. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  parent: string;
  /** Optional. The maximum number of records that should be returned. */
  limit?: number;
  /** Not currently used by Cloud Run. */
  includeUninitialized?: boolean;
  /** Allows to filter resources based on a specific value for a field name. Send this in a query string format. i.e. 'metadata.name%3Dlorem'. Not currently used by Cloud Run. */
  fieldSelector?: string;
  /** Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. */
  labelSelector?: string;
  /** The baseline resource version from which the list or watch operation should start. Not currently used by Cloud Run. */
  resourceVersion?: string;
  /** Flag that indicates that the client expects to watch this resource as well. Not currently used by Cloud Run. */
  watch?: boolean;
  /** Optional. Encoded string to continue paging. */
  continue?: string;
}

export const ListNamespacesRevisionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  includeUninitialized: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeUninitialized")),
  fieldSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldSelector")),
  labelSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("labelSelector")),
  resourceVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("resourceVersion")),
  watch: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("watch")),
  continue: Schema.optional(Schema.String).pipe(T.HttpQuery("continue")),
}).pipe(
  T.Http({ method: "GET", path: "apis/serving.knative.dev/v1/namespaces/{namespacesId}/revisions" }),
  svc,
) as unknown as Schema.Schema<ListNamespacesRevisionsRequest>;

export type ListNamespacesRevisionsResponse = ListRevisionsResponse;
export const ListNamespacesRevisionsResponse = ListRevisionsResponse;

export type ListNamespacesRevisionsError = CommonErrors;

/** List revisions. Results are sorted by creation time, descending. */
export const listNamespacesRevisions: API.OperationMethod<ListNamespacesRevisionsRequest, ListNamespacesRevisionsResponse, ListNamespacesRevisionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListNamespacesRevisionsRequest,
  output: ListNamespacesRevisionsResponse,
  errors: [],
}));

export interface GetNamespacesRevisionsRequest {
  /** The name of the revision to retrieve. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  name: string;
}

export const GetNamespacesRevisionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "apis/serving.knative.dev/v1/namespaces/{namespacesId}/revisions/{revisionsId}" }),
  svc,
) as unknown as Schema.Schema<GetNamespacesRevisionsRequest>;

export type GetNamespacesRevisionsResponse = Revision;
export const GetNamespacesRevisionsResponse = Revision;

export type GetNamespacesRevisionsError = CommonErrors;

/** Get information about a revision. */
export const getNamespacesRevisions: API.OperationMethod<GetNamespacesRevisionsRequest, GetNamespacesRevisionsResponse, GetNamespacesRevisionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNamespacesRevisionsRequest,
  output: GetNamespacesRevisionsResponse,
  errors: [],
}));

export interface DeleteNamespacesRevisionsRequest {
  /** The name of the revision to delete. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  name: string;
  /** Specifies the propagation policy of delete. Cloud Run currently ignores this setting, and deletes in the background. */
  propagationPolicy?: string;
  /** Cloud Run currently ignores this parameter. */
  kind?: string;
  /** Cloud Run currently ignores this parameter. */
  apiVersion?: string;
  /** Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` */
  dryRun?: string;
}

export const DeleteNamespacesRevisionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  propagationPolicy: Schema.optional(Schema.String).pipe(T.HttpQuery("propagationPolicy")),
  kind: Schema.optional(Schema.String).pipe(T.HttpQuery("kind")),
  apiVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("apiVersion")),
  dryRun: Schema.optional(Schema.String).pipe(T.HttpQuery("dryRun")),
}).pipe(
  T.Http({ method: "DELETE", path: "apis/serving.knative.dev/v1/namespaces/{namespacesId}/revisions/{revisionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteNamespacesRevisionsRequest>;

export type DeleteNamespacesRevisionsResponse = Status;
export const DeleteNamespacesRevisionsResponse = Status;

export type DeleteNamespacesRevisionsError = CommonErrors;

/** Delete a revision. */
export const deleteNamespacesRevisions: API.OperationMethod<DeleteNamespacesRevisionsRequest, DeleteNamespacesRevisionsResponse, DeleteNamespacesRevisionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteNamespacesRevisionsRequest,
  output: DeleteNamespacesRevisionsResponse,
  errors: [],
}));

export interface ListNamespacesConfigurationsRequest {
  /** The namespace from which the configurations should be listed. For Cloud Run, replace {namespace_id} with the project ID or number. */
  parent: string;
  /** Optional. The maximum number of the records that should be returned. */
  limit?: number;
  /** Not supported by Cloud Run. */
  includeUninitialized?: boolean;
  /** Not supported by Cloud Run. */
  fieldSelector?: string;
  /** Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. */
  labelSelector?: string;
  /** Not supported by Cloud Run. */
  resourceVersion?: string;
  /** Not supported by Cloud Run. */
  watch?: boolean;
  /** Optional. Encoded string to continue paging. */
  continue?: string;
}

export const ListNamespacesConfigurationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  includeUninitialized: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeUninitialized")),
  fieldSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldSelector")),
  labelSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("labelSelector")),
  resourceVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("resourceVersion")),
  watch: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("watch")),
  continue: Schema.optional(Schema.String).pipe(T.HttpQuery("continue")),
}).pipe(
  T.Http({ method: "GET", path: "apis/serving.knative.dev/v1/namespaces/{namespacesId}/configurations" }),
  svc,
) as unknown as Schema.Schema<ListNamespacesConfigurationsRequest>;

export type ListNamespacesConfigurationsResponse = ListConfigurationsResponse;
export const ListNamespacesConfigurationsResponse = ListConfigurationsResponse;

export type ListNamespacesConfigurationsError = CommonErrors;

/** List configurations. Results are sorted by creation time, descending. */
export const listNamespacesConfigurations: API.OperationMethod<ListNamespacesConfigurationsRequest, ListNamespacesConfigurationsResponse, ListNamespacesConfigurationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListNamespacesConfigurationsRequest,
  output: ListNamespacesConfigurationsResponse,
  errors: [],
}));

export interface GetNamespacesConfigurationsRequest {
  /** The name of the configuration to retrieve. For Cloud Run, replace {namespace_id} with the project ID or number. */
  name: string;
}

export const GetNamespacesConfigurationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "apis/serving.knative.dev/v1/namespaces/{namespacesId}/configurations/{configurationsId}" }),
  svc,
) as unknown as Schema.Schema<GetNamespacesConfigurationsRequest>;

export type GetNamespacesConfigurationsResponse = Configuration;
export const GetNamespacesConfigurationsResponse = Configuration;

export type GetNamespacesConfigurationsError = CommonErrors;

/** Get information about a configuration. */
export const getNamespacesConfigurations: API.OperationMethod<GetNamespacesConfigurationsRequest, GetNamespacesConfigurationsResponse, GetNamespacesConfigurationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNamespacesConfigurationsRequest,
  output: GetNamespacesConfigurationsResponse,
  errors: [],
}));

export interface CreateNamespacesDomainmappingsRequest {
  /** Required. The namespace in which the domain mapping should be created. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  parent: string;
  /** Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` */
  dryRun?: string;
  /** Request body */
  body?: DomainMapping;
}

export const CreateNamespacesDomainmappingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dryRun: Schema.optional(Schema.String).pipe(T.HttpQuery("dryRun")),
  body: Schema.optional(DomainMapping).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "apis/domains.cloudrun.com/v1/namespaces/{namespacesId}/domainmappings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateNamespacesDomainmappingsRequest>;

export type CreateNamespacesDomainmappingsResponse = DomainMapping;
export const CreateNamespacesDomainmappingsResponse = DomainMapping;

export type CreateNamespacesDomainmappingsError = CommonErrors;

/** Create a new domain mapping. */
export const createNamespacesDomainmappings: API.OperationMethod<CreateNamespacesDomainmappingsRequest, CreateNamespacesDomainmappingsResponse, CreateNamespacesDomainmappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateNamespacesDomainmappingsRequest,
  output: CreateNamespacesDomainmappingsResponse,
  errors: [],
}));

export interface ListNamespacesDomainmappingsRequest {
  /** Required. The namespace from which the domain mappings should be listed. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  parent: string;
  /** Optional. The maximum number of records that should be returned. */
  limit?: number;
  /** Not currently used by Cloud Run. */
  includeUninitialized?: boolean;
  /** Allows to filter resources based on a specific value for a field name. Send this in a query string format. i.e. 'metadata.name%3Dlorem'. Not currently used by Cloud Run. */
  fieldSelector?: string;
  /** Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. */
  labelSelector?: string;
  /** The baseline resource version from which the list or watch operation should start. Not currently used by Cloud Run. */
  resourceVersion?: string;
  /** Flag that indicates that the client expects to watch this resource as well. Not currently used by Cloud Run. */
  watch?: boolean;
  /** Optional. Encoded string to continue paging. */
  continue?: string;
}

export const ListNamespacesDomainmappingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  includeUninitialized: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeUninitialized")),
  fieldSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldSelector")),
  labelSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("labelSelector")),
  resourceVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("resourceVersion")),
  watch: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("watch")),
  continue: Schema.optional(Schema.String).pipe(T.HttpQuery("continue")),
}).pipe(
  T.Http({ method: "GET", path: "apis/domains.cloudrun.com/v1/namespaces/{namespacesId}/domainmappings" }),
  svc,
) as unknown as Schema.Schema<ListNamespacesDomainmappingsRequest>;

export type ListNamespacesDomainmappingsResponse = ListDomainMappingsResponse;
export const ListNamespacesDomainmappingsResponse = ListDomainMappingsResponse;

export type ListNamespacesDomainmappingsError = CommonErrors;

/** List all domain mappings. */
export const listNamespacesDomainmappings: API.OperationMethod<ListNamespacesDomainmappingsRequest, ListNamespacesDomainmappingsResponse, ListNamespacesDomainmappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListNamespacesDomainmappingsRequest,
  output: ListNamespacesDomainmappingsResponse,
  errors: [],
}));

export interface GetNamespacesDomainmappingsRequest {
  /** Required. The name of the domain mapping to retrieve. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  name: string;
}

export const GetNamespacesDomainmappingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "apis/domains.cloudrun.com/v1/namespaces/{namespacesId}/domainmappings/{domainmappingsId}" }),
  svc,
) as unknown as Schema.Schema<GetNamespacesDomainmappingsRequest>;

export type GetNamespacesDomainmappingsResponse = DomainMapping;
export const GetNamespacesDomainmappingsResponse = DomainMapping;

export type GetNamespacesDomainmappingsError = CommonErrors;

/** Get information about a domain mapping. */
export const getNamespacesDomainmappings: API.OperationMethod<GetNamespacesDomainmappingsRequest, GetNamespacesDomainmappingsResponse, GetNamespacesDomainmappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNamespacesDomainmappingsRequest,
  output: GetNamespacesDomainmappingsResponse,
  errors: [],
}));

export interface DeleteNamespacesDomainmappingsRequest {
  /** Required. The name of the domain mapping to delete. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  name: string;
  /** Specifies the propagation policy of delete. Cloud Run currently ignores this setting, and deletes in the background. Please see kubernetes.io/docs/concepts/architecture/garbage-collection/ for more information. */
  propagationPolicy?: string;
  /** Cloud Run currently ignores this parameter. */
  kind?: string;
  /** Cloud Run currently ignores this parameter. */
  apiVersion?: string;
  /** Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` */
  dryRun?: string;
}

export const DeleteNamespacesDomainmappingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  propagationPolicy: Schema.optional(Schema.String).pipe(T.HttpQuery("propagationPolicy")),
  kind: Schema.optional(Schema.String).pipe(T.HttpQuery("kind")),
  apiVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("apiVersion")),
  dryRun: Schema.optional(Schema.String).pipe(T.HttpQuery("dryRun")),
}).pipe(
  T.Http({ method: "DELETE", path: "apis/domains.cloudrun.com/v1/namespaces/{namespacesId}/domainmappings/{domainmappingsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteNamespacesDomainmappingsRequest>;

export type DeleteNamespacesDomainmappingsResponse = Status;
export const DeleteNamespacesDomainmappingsResponse = Status;

export type DeleteNamespacesDomainmappingsError = CommonErrors;

/** Delete a domain mapping. */
export const deleteNamespacesDomainmappings: API.OperationMethod<DeleteNamespacesDomainmappingsRequest, DeleteNamespacesDomainmappingsResponse, DeleteNamespacesDomainmappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteNamespacesDomainmappingsRequest,
  output: DeleteNamespacesDomainmappingsResponse,
  errors: [],
}));

export interface GetNamespacesTasksRequest {
  /** Required. The name of the task to retrieve. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  name: string;
}

export const GetNamespacesTasksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/tasks/{tasksId}" }),
  svc,
) as unknown as Schema.Schema<GetNamespacesTasksRequest>;

export type GetNamespacesTasksResponse = Task;
export const GetNamespacesTasksResponse = Task;

export type GetNamespacesTasksError = CommonErrors;

/** Get information about a task. */
export const getNamespacesTasks: API.OperationMethod<GetNamespacesTasksRequest, GetNamespacesTasksResponse, GetNamespacesTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNamespacesTasksRequest,
  output: GetNamespacesTasksResponse,
  errors: [],
}));

export interface ListNamespacesTasksRequest {
  /** Required. The namespace from which the tasks should be listed. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  parent: string;
  /** Optional. The maximum number of records that should be returned. */
  limit?: number;
  /** Optional. Not supported by Cloud Run. */
  includeUninitialized?: boolean;
  /** Optional. Not supported by Cloud Run. */
  fieldSelector?: string;
  /** Optional. Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. For example, to list all tasks of execution "foo" in succeeded state: `run.googleapis.com/execution=foo,run.googleapis.com/runningState=Succeeded`. Supported states are: * `Pending`: Initial state of all tasks. The task has not yet started but eventually will. * `Running`: Container instances for this task are running or will be running shortly. * `Succeeded`: No more container instances to run for the task, and the last attempt succeeded. * `Failed`: No more container instances to run for the task, and the last attempt failed. This task has run out of retry attempts. * `Cancelled`: Task was running but got stopped because its parent execution has been aborted. * `Abandoned`: The task has not yet started and never will because its parent execution has been aborted. */
  labelSelector?: string;
  /** Optional. Not supported by Cloud Run. */
  resourceVersion?: string;
  /** Optional. Not supported by Cloud Run. */
  watch?: boolean;
  /** Optional. Optional encoded string to continue paging. */
  continue?: string;
}

export const ListNamespacesTasksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  includeUninitialized: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeUninitialized")),
  fieldSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldSelector")),
  labelSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("labelSelector")),
  resourceVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("resourceVersion")),
  watch: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("watch")),
  continue: Schema.optional(Schema.String).pipe(T.HttpQuery("continue")),
}).pipe(
  T.Http({ method: "GET", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/tasks" }),
  svc,
) as unknown as Schema.Schema<ListNamespacesTasksRequest>;

export type ListNamespacesTasksResponse = ListTasksResponse;
export const ListNamespacesTasksResponse = ListTasksResponse;

export type ListNamespacesTasksError = CommonErrors;

/** List tasks. */
export const listNamespacesTasks: API.OperationMethod<ListNamespacesTasksRequest, ListNamespacesTasksResponse, ListNamespacesTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListNamespacesTasksRequest,
  output: ListNamespacesTasksResponse,
  errors: [],
}));

export interface DeleteNamespacesExecutionsRequest {
  /** Required. The name of the execution to delete. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  name: string;
  /** Optional. Specifies the propagation policy of delete. Cloud Run currently ignores this setting. */
  propagationPolicy?: string;
  /** Optional. Cloud Run currently ignores this parameter. */
  kind?: string;
  /** Optional. Cloud Run currently ignores this parameter. */
  apiVersion?: string;
}

export const DeleteNamespacesExecutionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  propagationPolicy: Schema.optional(Schema.String).pipe(T.HttpQuery("propagationPolicy")),
  kind: Schema.optional(Schema.String).pipe(T.HttpQuery("kind")),
  apiVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("apiVersion")),
}).pipe(
  T.Http({ method: "DELETE", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/executions/{executionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteNamespacesExecutionsRequest>;

export type DeleteNamespacesExecutionsResponse = Status;
export const DeleteNamespacesExecutionsResponse = Status;

export type DeleteNamespacesExecutionsError = CommonErrors;

/** Delete an execution. */
export const deleteNamespacesExecutions: API.OperationMethod<DeleteNamespacesExecutionsRequest, DeleteNamespacesExecutionsResponse, DeleteNamespacesExecutionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteNamespacesExecutionsRequest,
  output: DeleteNamespacesExecutionsResponse,
  errors: [],
}));

export interface GetNamespacesExecutionsRequest {
  /** Required. The name of the execution to retrieve. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  name: string;
}

export const GetNamespacesExecutionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/executions/{executionsId}" }),
  svc,
) as unknown as Schema.Schema<GetNamespacesExecutionsRequest>;

export type GetNamespacesExecutionsResponse = Execution;
export const GetNamespacesExecutionsResponse = Execution;

export type GetNamespacesExecutionsError = CommonErrors;

/** Get information about an execution. */
export const getNamespacesExecutions: API.OperationMethod<GetNamespacesExecutionsRequest, GetNamespacesExecutionsResponse, GetNamespacesExecutionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNamespacesExecutionsRequest,
  output: GetNamespacesExecutionsResponse,
  errors: [],
}));

export interface ListNamespacesExecutionsRequest {
  /** Required. The namespace from which the executions should be listed. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  parent: string;
  /** Optional. The maximum number of the records that should be returned. */
  limit?: number;
  /** Optional. Not supported by Cloud Run. */
  includeUninitialized?: boolean;
  /** Optional. Not supported by Cloud Run. */
  fieldSelector?: string;
  /** Optional. Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. */
  labelSelector?: string;
  /** Optional. Not supported by Cloud Run. */
  resourceVersion?: string;
  /** Optional. Not supported by Cloud Run. */
  watch?: boolean;
  /** Optional. Optional encoded string to continue paging. */
  continue?: string;
}

export const ListNamespacesExecutionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  includeUninitialized: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeUninitialized")),
  fieldSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldSelector")),
  labelSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("labelSelector")),
  resourceVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("resourceVersion")),
  watch: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("watch")),
  continue: Schema.optional(Schema.String).pipe(T.HttpQuery("continue")),
}).pipe(
  T.Http({ method: "GET", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/executions" }),
  svc,
) as unknown as Schema.Schema<ListNamespacesExecutionsRequest>;

export type ListNamespacesExecutionsResponse = ListExecutionsResponse;
export const ListNamespacesExecutionsResponse = ListExecutionsResponse;

export type ListNamespacesExecutionsError = CommonErrors;

/** List executions. Results are sorted by creation time, descending. */
export const listNamespacesExecutions: API.OperationMethod<ListNamespacesExecutionsRequest, ListNamespacesExecutionsResponse, ListNamespacesExecutionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListNamespacesExecutionsRequest,
  output: ListNamespacesExecutionsResponse,
  errors: [],
}));

export interface CancelNamespacesExecutionsRequest {
  /** Required. The name of the execution to cancel. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  name: string;
  /** Request body */
  body?: CancelExecutionRequest;
}

export const CancelNamespacesExecutionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelExecutionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/executions/{executionsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelNamespacesExecutionsRequest>;

export type CancelNamespacesExecutionsResponse = Execution;
export const CancelNamespacesExecutionsResponse = Execution;

export type CancelNamespacesExecutionsError = CommonErrors;

/** Cancel an execution. */
export const cancelNamespacesExecutions: API.OperationMethod<CancelNamespacesExecutionsRequest, CancelNamespacesExecutionsResponse, CancelNamespacesExecutionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelNamespacesExecutionsRequest,
  output: CancelNamespacesExecutionsResponse,
  errors: [],
}));

export interface CreateNamespacesInstancesRequest {
  /** Required. The namespace in which the Instance should be created. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  parent: string;
  /** Request body */
  body?: Instance;
}

export const CreateNamespacesInstancesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Instance).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/instances", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateNamespacesInstancesRequest>;

export type CreateNamespacesInstancesResponse = Instance;
export const CreateNamespacesInstancesResponse = Instance;

export type CreateNamespacesInstancesError = CommonErrors;

/** Create a Instance. */
export const createNamespacesInstances: API.OperationMethod<CreateNamespacesInstancesRequest, CreateNamespacesInstancesResponse, CreateNamespacesInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateNamespacesInstancesRequest,
  output: CreateNamespacesInstancesResponse,
  errors: [],
}));

export interface DeleteNamespacesInstancesRequest {
  /** Required. The name of the Instance to delete. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  name: string;
  /** Optional. Specifies the propagation policy of delete. Cloud Run currently ignores this setting, and deletes in the background. Please see kubernetes.io/docs/concepts/workloads/controllers/garbage-collection/ for more information. */
  propagationPolicy?: string;
  /** Optional. Cloud Run currently ignores this parameter. */
  kind?: string;
  /** Optional. Cloud Run currently ignores this parameter. */
  apiVersion?: string;
}

export const DeleteNamespacesInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  propagationPolicy: Schema.optional(Schema.String).pipe(T.HttpQuery("propagationPolicy")),
  kind: Schema.optional(Schema.String).pipe(T.HttpQuery("kind")),
  apiVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("apiVersion")),
}).pipe(
  T.Http({ method: "DELETE", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/instances/{instancesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteNamespacesInstancesRequest>;

export type DeleteNamespacesInstancesResponse = Status;
export const DeleteNamespacesInstancesResponse = Status;

export type DeleteNamespacesInstancesError = CommonErrors;

/** Delete a Instance. */
export const deleteNamespacesInstances: API.OperationMethod<DeleteNamespacesInstancesRequest, DeleteNamespacesInstancesResponse, DeleteNamespacesInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteNamespacesInstancesRequest,
  output: DeleteNamespacesInstancesResponse,
  errors: [],
}));

export interface GetNamespacesInstancesRequest {
  /** Required. The name of the Instance to retrieve. It takes the form namespaces/{namespace}/instances/{Instance_name} and the `endpoint` must be regional. Replace {namespace} with the project ID or number. */
  name: string;
}

export const GetNamespacesInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/instances/{instancesId}" }),
  svc,
) as unknown as Schema.Schema<GetNamespacesInstancesRequest>;

export type GetNamespacesInstancesResponse = Instance;
export const GetNamespacesInstancesResponse = Instance;

export type GetNamespacesInstancesError = CommonErrors;

/** Get an Instance. */
export const getNamespacesInstances: API.OperationMethod<GetNamespacesInstancesRequest, GetNamespacesInstancesResponse, GetNamespacesInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNamespacesInstancesRequest,
  output: GetNamespacesInstancesResponse,
  errors: [],
}));

export interface ListNamespacesInstancesRequest {
  /** Required. The namespace from which the Instances should be listed. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  parent: string;
  /** Optional. The maximum number of records that should be returned. */
  limit?: number;
  /** Optional. Not supported by Cloud Run. */
  includeUninitialized?: boolean;
  /** Optional. Not supported by Cloud Run. */
  fieldSelector?: string;
  /** Optional. Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. */
  labelSelector?: string;
  /** Optional. Not supported by Cloud Run. */
  resourceVersion?: string;
  /** Optional. Not supported by Cloud Run. */
  watch?: boolean;
  /** Optional. Optional encoded string to continue paging. */
  continue?: string;
}

export const ListNamespacesInstancesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  includeUninitialized: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeUninitialized")),
  fieldSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldSelector")),
  labelSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("labelSelector")),
  resourceVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("resourceVersion")),
  watch: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("watch")),
  continue: Schema.optional(Schema.String).pipe(T.HttpQuery("continue")),
}).pipe(
  T.Http({ method: "GET", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/instances" }),
  svc,
) as unknown as Schema.Schema<ListNamespacesInstancesRequest>;

export type ListNamespacesInstancesResponse = ListInstancesResponse;
export const ListNamespacesInstancesResponse = ListInstancesResponse;

export type ListNamespacesInstancesError = CommonErrors;

/** List Instances. Results are sorted by creation time, descending. */
export const listNamespacesInstances: API.OperationMethod<ListNamespacesInstancesRequest, ListNamespacesInstancesResponse, ListNamespacesInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListNamespacesInstancesRequest,
  output: ListNamespacesInstancesResponse,
  errors: [],
}));

export interface StartNamespacesInstancesRequest {
  /** Required. The name of the Instance to run. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  name: string;
  /** Request body */
  body?: StartInstanceRequest;
}

export const StartNamespacesInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(StartInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/instances/{instancesId}:start", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StartNamespacesInstancesRequest>;

export type StartNamespacesInstancesResponse = Instance;
export const StartNamespacesInstancesResponse = Instance;

export type StartNamespacesInstancesError = CommonErrors;

/** Start an Instance which has been stopped. */
export const startNamespacesInstances: API.OperationMethod<StartNamespacesInstancesRequest, StartNamespacesInstancesResponse, StartNamespacesInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StartNamespacesInstancesRequest,
  output: StartNamespacesInstancesResponse,
  errors: [],
}));

export interface StopNamespacesInstancesRequest {
  /** Required. The name of the Instance to run. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  name: string;
  /** Request body */
  body?: StopInstanceRequest;
}

export const StopNamespacesInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(StopInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/instances/{instancesId}:stop", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StopNamespacesInstancesRequest>;

export type StopNamespacesInstancesResponse = Instance;
export const StopNamespacesInstancesResponse = Instance;

export type StopNamespacesInstancesError = CommonErrors;

/** Stop an Instance that is running. */
export const stopNamespacesInstances: API.OperationMethod<StopNamespacesInstancesRequest, StopNamespacesInstancesResponse, StopNamespacesInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StopNamespacesInstancesRequest,
  output: StopNamespacesInstancesResponse,
  errors: [],
}));

export interface CreateNamespacesJobsRequest {
  /** Required. The namespace in which the job should be created. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  parent: string;
  /** Request body */
  body?: Job;
}

export const CreateNamespacesJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Job).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/jobs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateNamespacesJobsRequest>;

export type CreateNamespacesJobsResponse = Job;
export const CreateNamespacesJobsResponse = Job;

export type CreateNamespacesJobsError = CommonErrors;

/** Create a job. */
export const createNamespacesJobs: API.OperationMethod<CreateNamespacesJobsRequest, CreateNamespacesJobsResponse, CreateNamespacesJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateNamespacesJobsRequest,
  output: CreateNamespacesJobsResponse,
  errors: [],
}));

export interface ReplaceJobNamespacesJobsRequest {
  /** Required. The name of the job being replaced. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  name: string;
  /** Request body */
  body?: Job;
}

export const ReplaceJobNamespacesJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Job).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/jobs/{jobsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReplaceJobNamespacesJobsRequest>;

export type ReplaceJobNamespacesJobsResponse = Job;
export const ReplaceJobNamespacesJobsResponse = Job;

export type ReplaceJobNamespacesJobsError = CommonErrors;

/** Replace a job. Only the spec and metadata labels and annotations are modifiable. After the Replace request, Cloud Run will work to make the 'status' match the requested 'spec'. May provide metadata.resourceVersion to enforce update from last read for optimistic concurrency control. */
export const replaceJobNamespacesJobs: API.OperationMethod<ReplaceJobNamespacesJobsRequest, ReplaceJobNamespacesJobsResponse, ReplaceJobNamespacesJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReplaceJobNamespacesJobsRequest,
  output: ReplaceJobNamespacesJobsResponse,
  errors: [],
}));

export interface DeleteNamespacesJobsRequest {
  /** Required. The name of the job to delete. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  name: string;
  /** Optional. Specifies the propagation policy of delete. Cloud Run currently ignores this setting, and deletes in the background. Please see kubernetes.io/docs/concepts/workloads/controllers/garbage-collection/ for more information. */
  propagationPolicy?: string;
  /** Optional. Cloud Run currently ignores this parameter. */
  kind?: string;
  /** Optional. Cloud Run currently ignores this parameter. */
  apiVersion?: string;
}

export const DeleteNamespacesJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  propagationPolicy: Schema.optional(Schema.String).pipe(T.HttpQuery("propagationPolicy")),
  kind: Schema.optional(Schema.String).pipe(T.HttpQuery("kind")),
  apiVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("apiVersion")),
}).pipe(
  T.Http({ method: "DELETE", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/jobs/{jobsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteNamespacesJobsRequest>;

export type DeleteNamespacesJobsResponse = Status;
export const DeleteNamespacesJobsResponse = Status;

export type DeleteNamespacesJobsError = CommonErrors;

/** Delete a job. */
export const deleteNamespacesJobs: API.OperationMethod<DeleteNamespacesJobsRequest, DeleteNamespacesJobsResponse, DeleteNamespacesJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteNamespacesJobsRequest,
  output: DeleteNamespacesJobsResponse,
  errors: [],
}));

export interface GetNamespacesJobsRequest {
  /** Required. The name of the job to retrieve. It takes the form namespaces/{namespace}/jobs/{job_name} and the `endpoint` must be regional. Replace {namespace} with the project ID or number. */
  name: string;
}

export const GetNamespacesJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/jobs/{jobsId}" }),
  svc,
) as unknown as Schema.Schema<GetNamespacesJobsRequest>;

export type GetNamespacesJobsResponse = Job;
export const GetNamespacesJobsResponse = Job;

export type GetNamespacesJobsError = CommonErrors;

/** Get information about a job. */
export const getNamespacesJobs: API.OperationMethod<GetNamespacesJobsRequest, GetNamespacesJobsResponse, GetNamespacesJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNamespacesJobsRequest,
  output: GetNamespacesJobsResponse,
  errors: [],
}));

export interface ListNamespacesJobsRequest {
  /** Required. The namespace from which the jobs should be listed. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  parent: string;
  /** Optional. The maximum number of records that should be returned. */
  limit?: number;
  /** Optional. Not supported by Cloud Run. */
  includeUninitialized?: boolean;
  /** Optional. Not supported by Cloud Run. */
  fieldSelector?: string;
  /** Optional. Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. */
  labelSelector?: string;
  /** Optional. Not supported by Cloud Run. */
  resourceVersion?: string;
  /** Optional. Not supported by Cloud Run. */
  watch?: boolean;
  /** Optional. Optional encoded string to continue paging. */
  continue?: string;
}

export const ListNamespacesJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  includeUninitialized: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeUninitialized")),
  fieldSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldSelector")),
  labelSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("labelSelector")),
  resourceVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("resourceVersion")),
  watch: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("watch")),
  continue: Schema.optional(Schema.String).pipe(T.HttpQuery("continue")),
}).pipe(
  T.Http({ method: "GET", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/jobs" }),
  svc,
) as unknown as Schema.Schema<ListNamespacesJobsRequest>;

export type ListNamespacesJobsResponse = ListJobsResponse;
export const ListNamespacesJobsResponse = ListJobsResponse;

export type ListNamespacesJobsError = CommonErrors;

/** List jobs. Results are sorted by creation time, descending. */
export const listNamespacesJobs: API.OperationMethod<ListNamespacesJobsRequest, ListNamespacesJobsResponse, ListNamespacesJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListNamespacesJobsRequest,
  output: ListNamespacesJobsResponse,
  errors: [],
}));

export interface RunNamespacesJobsRequest {
  /** Required. The name of the job to run. Replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  name: string;
  /** Request body */
  body?: RunJobRequest;
}

export const RunNamespacesJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RunJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/jobs/{jobsId}:run", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunNamespacesJobsRequest>;

export type RunNamespacesJobsResponse = Execution;
export const RunNamespacesJobsResponse = Execution;

export type RunNamespacesJobsError = CommonErrors;

/** Trigger creation of a new execution of this job. */
export const runNamespacesJobs: API.OperationMethod<RunNamespacesJobsRequest, RunNamespacesJobsResponse, RunNamespacesJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunNamespacesJobsRequest,
  output: RunNamespacesJobsResponse,
  errors: [],
}));

export interface ListNamespacesRoutesRequest {
  /** The namespace from which the routes should be listed. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  parent: string;
  /** Optional. The maximum number of records that should be returned. */
  limit?: number;
  /** Not currently used by Cloud Run. */
  includeUninitialized?: boolean;
  /** Allows to filter resources based on a specific value for a field name. Send this in a query string format. i.e. 'metadata.name%3Dlorem'. Not currently used by Cloud Run. */
  fieldSelector?: string;
  /** Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. */
  labelSelector?: string;
  /** The baseline resource version from which the list or watch operation should start. Not currently used by Cloud Run. */
  resourceVersion?: string;
  /** Flag that indicates that the client expects to watch this resource as well. Not currently used by Cloud Run. */
  watch?: boolean;
  /** Optional. Encoded string to continue paging. */
  continue?: string;
}

export const ListNamespacesRoutesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  includeUninitialized: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeUninitialized")),
  fieldSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldSelector")),
  labelSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("labelSelector")),
  resourceVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("resourceVersion")),
  watch: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("watch")),
  continue: Schema.optional(Schema.String).pipe(T.HttpQuery("continue")),
}).pipe(
  T.Http({ method: "GET", path: "apis/serving.knative.dev/v1/namespaces/{namespacesId}/routes" }),
  svc,
) as unknown as Schema.Schema<ListNamespacesRoutesRequest>;

export type ListNamespacesRoutesResponse = ListRoutesResponse;
export const ListNamespacesRoutesResponse = ListRoutesResponse;

export type ListNamespacesRoutesError = CommonErrors;

/** List routes. Results are sorted by creation time, descending. */
export const listNamespacesRoutes: API.OperationMethod<ListNamespacesRoutesRequest, ListNamespacesRoutesResponse, ListNamespacesRoutesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListNamespacesRoutesRequest,
  output: ListNamespacesRoutesResponse,
  errors: [],
}));

export interface GetNamespacesRoutesRequest {
  /** The name of the route to retrieve. For Cloud Run (fully managed), replace {namespace} with the project ID or number. It takes the form namespaces/{namespace}. For example: namespaces/PROJECT_ID */
  name: string;
}

export const GetNamespacesRoutesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "apis/serving.knative.dev/v1/namespaces/{namespacesId}/routes/{routesId}" }),
  svc,
) as unknown as Schema.Schema<GetNamespacesRoutesRequest>;

export type GetNamespacesRoutesResponse = Route;
export const GetNamespacesRoutesResponse = Route;

export type GetNamespacesRoutesError = CommonErrors;

/** Get information about a route. */
export const getNamespacesRoutes: API.OperationMethod<GetNamespacesRoutesRequest, GetNamespacesRoutesResponse, GetNamespacesRoutesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNamespacesRoutesRequest,
  output: GetNamespacesRoutesResponse,
  errors: [],
}));

export interface ListNamespacesServicesRequest {
  /** Required. The parent from where the resources should be listed. In Cloud Run, it may be one of the following: * `{project_id_or_number}` * `namespaces/{project_id_or_number}` * `namespaces/{project_id_or_number}/services` * `projects/{project_id_or_number}/locations/{region}` * `projects/{project_id_or_number}/regions/{region}` */
  parent: string;
  /** The maximum number of records that should be returned. */
  limit?: number;
  /** Not supported, and ignored by Cloud Run. */
  includeUninitialized?: boolean;
  /** Not supported, and ignored by Cloud Run. */
  fieldSelector?: string;
  /** Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn. */
  labelSelector?: string;
  /** Not supported, and ignored by Cloud Run. */
  resourceVersion?: string;
  /** Not supported, and ignored by Cloud Run. */
  watch?: boolean;
  /** Encoded string to continue paging. */
  continue?: string;
}

export const ListNamespacesServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  includeUninitialized: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeUninitialized")),
  fieldSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("fieldSelector")),
  labelSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("labelSelector")),
  resourceVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("resourceVersion")),
  watch: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("watch")),
  continue: Schema.optional(Schema.String).pipe(T.HttpQuery("continue")),
}).pipe(
  T.Http({ method: "GET", path: "apis/serving.knative.dev/v1/namespaces/{namespacesId}/services" }),
  svc,
) as unknown as Schema.Schema<ListNamespacesServicesRequest>;

export type ListNamespacesServicesResponse = ListServicesResponse;
export const ListNamespacesServicesResponse = ListServicesResponse;

export type ListNamespacesServicesError = CommonErrors;

/** Lists services for the given project and region. Results are sorted by creation time, descending. */
export const listNamespacesServices: API.OperationMethod<ListNamespacesServicesRequest, ListNamespacesServicesResponse, ListNamespacesServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListNamespacesServicesRequest,
  output: ListNamespacesServicesResponse,
  errors: [],
}));

export interface GetNamespacesServicesRequest {
  /** Required. The fully qualified name of the service to retrieve. It can be any of the following forms: * `namespaces/{project_id_or_number}/services/{service_name}` (only when the `endpoint` is regional) * `projects/{project_id_or_number}/locations/{region}/services/{service_name}` * `projects/{project_id_or_number}/regions/{region}/services/{service_name}` */
  name: string;
}

export const GetNamespacesServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "apis/serving.knative.dev/v1/namespaces/{namespacesId}/services/{servicesId}" }),
  svc,
) as unknown as Schema.Schema<GetNamespacesServicesRequest>;

export type GetNamespacesServicesResponse = Service;
export const GetNamespacesServicesResponse = Service;

export type GetNamespacesServicesError = CommonErrors;

/** Gets information about a service. */
export const getNamespacesServices: API.OperationMethod<GetNamespacesServicesRequest, GetNamespacesServicesResponse, GetNamespacesServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNamespacesServicesRequest,
  output: GetNamespacesServicesResponse,
  errors: [],
}));

export interface CreateNamespacesServicesRequest {
  /** Required. The resource's parent. In Cloud Run, it may be one of the following: * `{project_id_or_number}` * `namespaces/{project_id_or_number}` * `namespaces/{project_id_or_number}/services` * `projects/{project_id_or_number}/locations/{region}` * `projects/{project_id_or_number}/regions/{region}` */
  parent: string;
  /** Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` */
  dryRun?: string;
  /** Request body */
  body?: Service;
}

export const CreateNamespacesServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dryRun: Schema.optional(Schema.String).pipe(T.HttpQuery("dryRun")),
  body: Schema.optional(Service).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "apis/serving.knative.dev/v1/namespaces/{namespacesId}/services", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateNamespacesServicesRequest>;

export type CreateNamespacesServicesResponse = Service;
export const CreateNamespacesServicesResponse = Service;

export type CreateNamespacesServicesError = CommonErrors;

/** Creates a new Service. Service creation will trigger a new deployment. Use GetService, and check service.status to determine if the Service is ready. */
export const createNamespacesServices: API.OperationMethod<CreateNamespacesServicesRequest, CreateNamespacesServicesResponse, CreateNamespacesServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateNamespacesServicesRequest,
  output: CreateNamespacesServicesResponse,
  errors: [],
}));

export interface ReplaceServiceNamespacesServicesRequest {
  /** Required. The fully qualified name of the service to replace. It can be any of the following forms: * `namespaces/{project_id_or_number}/services/{service_name}` (only when the `endpoint` is regional) * `projects/{project_id_or_number}/locations/{region}/services/{service_name}` * `projects/{project_id_or_number}/regions/{region}/services/{service_name}` */
  name: string;
  /** Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` */
  dryRun?: string;
  /** Request body */
  body?: Service;
}

export const ReplaceServiceNamespacesServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  dryRun: Schema.optional(Schema.String).pipe(T.HttpQuery("dryRun")),
  body: Schema.optional(Service).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "apis/serving.knative.dev/v1/namespaces/{namespacesId}/services/{servicesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReplaceServiceNamespacesServicesRequest>;

export type ReplaceServiceNamespacesServicesResponse = Service;
export const ReplaceServiceNamespacesServicesResponse = Service;

export type ReplaceServiceNamespacesServicesError = CommonErrors;

/** Replaces a service. Only the spec and metadata labels and annotations are modifiable. After the Update request, Cloud Run will work to make the 'status' match the requested 'spec'. May provide metadata.resourceVersion to enforce update from last read for optimistic concurrency control. */
export const replaceServiceNamespacesServices: API.OperationMethod<ReplaceServiceNamespacesServicesRequest, ReplaceServiceNamespacesServicesResponse, ReplaceServiceNamespacesServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReplaceServiceNamespacesServicesRequest,
  output: ReplaceServiceNamespacesServicesResponse,
  errors: [],
}));

export interface DeleteNamespacesServicesRequest {
  /** Required. The fully qualified name of the service to delete. It can be any of the following forms: * `namespaces/{project_id_or_number}/services/{service_name}` (only when the `endpoint` is regional) * `projects/{project_id_or_number}/locations/{region}/services/{service_name}` * `projects/{project_id_or_number}/regions/{region}/services/{service_name}` */
  name: string;
  /** Not supported, and ignored by Cloud Run. */
  propagationPolicy?: string;
  /** Not supported, and ignored by Cloud Run. */
  kind?: string;
  /** Not supported, and ignored by Cloud Run. */
  apiVersion?: string;
  /** Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` */
  dryRun?: string;
}

export const DeleteNamespacesServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  propagationPolicy: Schema.optional(Schema.String).pipe(T.HttpQuery("propagationPolicy")),
  kind: Schema.optional(Schema.String).pipe(T.HttpQuery("kind")),
  apiVersion: Schema.optional(Schema.String).pipe(T.HttpQuery("apiVersion")),
  dryRun: Schema.optional(Schema.String).pipe(T.HttpQuery("dryRun")),
}).pipe(
  T.Http({ method: "DELETE", path: "apis/serving.knative.dev/v1/namespaces/{namespacesId}/services/{servicesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteNamespacesServicesRequest>;

export type DeleteNamespacesServicesResponse = Status;
export const DeleteNamespacesServicesResponse = Status;

export type DeleteNamespacesServicesError = CommonErrors;

/** Deletes the provided service. This will cause the Service to stop serving traffic and will delete all associated Revisions. */
export const deleteNamespacesServices: API.OperationMethod<DeleteNamespacesServicesRequest, DeleteNamespacesServicesResponse, DeleteNamespacesServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteNamespacesServicesRequest,
  output: DeleteNamespacesServicesResponse,
  errors: [],
}));

export interface ListNamespacesWorkerpoolsRequest {
  /** Required. The parent from where the resources should be listed. In Cloud Run, it may be one of the following: * `{project_id_or_number}` * `namespaces/{project_id_or_number}` * `namespaces/{project_id_or_number}/workerpools` * `projects/{project_id_or_number}/locations/{region}` * `projects/{project_id_or_number}/regions/{region}` */
  parent: string;
  /** The maximum number of records that should be returned. */
  limit?: number;
  /** =, !=, exists, in, and notIn. */
  labelSelector?: string;
  /** Encoded string to continue paging. */
  continue?: string;
}

export const ListNamespacesWorkerpoolsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  labelSelector: Schema.optional(Schema.String).pipe(T.HttpQuery("labelSelector")),
  continue: Schema.optional(Schema.String).pipe(T.HttpQuery("continue")),
}).pipe(
  T.Http({ method: "GET", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/workerpools" }),
  svc,
) as unknown as Schema.Schema<ListNamespacesWorkerpoolsRequest>;

export type ListNamespacesWorkerpoolsResponse = ListWorkerPoolsResponse;
export const ListNamespacesWorkerpoolsResponse = ListWorkerPoolsResponse;

export type ListNamespacesWorkerpoolsError = CommonErrors;

/** Lists worker pools for the given project and region. Results are sorted by creation time, descending. */
export const listNamespacesWorkerpools: API.OperationMethod<ListNamespacesWorkerpoolsRequest, ListNamespacesWorkerpoolsResponse, ListNamespacesWorkerpoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListNamespacesWorkerpoolsRequest,
  output: ListNamespacesWorkerpoolsResponse,
  errors: [],
}));

export interface GetNamespacesWorkerpoolsRequest {
  /** Required. The fully qualified name of the worker pool to retrieve. It can be any of the following forms: * `namespaces/{project_id_or_number}/workerpools/{worker_pool_name}` (only when the `endpoint` is regional) * `projects/{project_id_or_number}/locations/{region}/workerpools/{worker_pool_name}` * `projects/{project_id_or_number}/regions/{region}/workerpools/{worker_pool_name}` */
  name: string;
}

export const GetNamespacesWorkerpoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/workerpools/{workerpoolsId}" }),
  svc,
) as unknown as Schema.Schema<GetNamespacesWorkerpoolsRequest>;

export type GetNamespacesWorkerpoolsResponse = WorkerPool;
export const GetNamespacesWorkerpoolsResponse = WorkerPool;

export type GetNamespacesWorkerpoolsError = CommonErrors;

/** Gets information about a worker pool. */
export const getNamespacesWorkerpools: API.OperationMethod<GetNamespacesWorkerpoolsRequest, GetNamespacesWorkerpoolsResponse, GetNamespacesWorkerpoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNamespacesWorkerpoolsRequest,
  output: GetNamespacesWorkerpoolsResponse,
  errors: [],
}));

export interface CreateNamespacesWorkerpoolsRequest {
  /** Required. The resource's parent. In Cloud Run, it may be one of the following: * `{project_id_or_number}` * `namespaces/{project_id_or_number}` * `namespaces/{project_id_or_number}/workerpools` * `projects/{project_id_or_number}/locations/{region}` * `projects/{project_id_or_number}/regions/{region}` */
  parent: string;
  /** Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` */
  dryRun?: string;
  /** Request body */
  body?: WorkerPool;
}

export const CreateNamespacesWorkerpoolsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dryRun: Schema.optional(Schema.String).pipe(T.HttpQuery("dryRun")),
  body: Schema.optional(WorkerPool).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/workerpools", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateNamespacesWorkerpoolsRequest>;

export type CreateNamespacesWorkerpoolsResponse = WorkerPool;
export const CreateNamespacesWorkerpoolsResponse = WorkerPool;

export type CreateNamespacesWorkerpoolsError = CommonErrors;

/** Creates a new WorkerPool. WorkerPool creation will trigger a new deployment. Use GetWorkerPool, and check worker_pool.status to determine if the WorkerPool is ready. */
export const createNamespacesWorkerpools: API.OperationMethod<CreateNamespacesWorkerpoolsRequest, CreateNamespacesWorkerpoolsResponse, CreateNamespacesWorkerpoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateNamespacesWorkerpoolsRequest,
  output: CreateNamespacesWorkerpoolsResponse,
  errors: [],
}));

export interface ReplaceWorkerPoolNamespacesWorkerpoolsRequest {
  /** Required. The fully qualified name of the worker pool to replace. It can be any of the following forms: * `namespaces/{project_id_or_number}/workerpools/{worker_pool_name}` (only when the `endpoint` is regional) * `projects/{project_id_or_number}/locations/{region}/workerpools/{worker_pool_name}` * `projects/{project_id_or_number}/regions/{region}/workerpools/{worker_pool_name}` */
  name: string;
  /** Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` */
  dryRun?: string;
  /** Request body */
  body?: WorkerPool;
}

export const ReplaceWorkerPoolNamespacesWorkerpoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  dryRun: Schema.optional(Schema.String).pipe(T.HttpQuery("dryRun")),
  body: Schema.optional(WorkerPool).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/workerpools/{workerpoolsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReplaceWorkerPoolNamespacesWorkerpoolsRequest>;

export type ReplaceWorkerPoolNamespacesWorkerpoolsResponse = WorkerPool;
export const ReplaceWorkerPoolNamespacesWorkerpoolsResponse = WorkerPool;

export type ReplaceWorkerPoolNamespacesWorkerpoolsError = CommonErrors;

/** Replaces a worker pool. Only the spec and metadata labels and annotations are modifiable. After the Update request, Cloud Run will work to make the 'status' match the requested 'spec'. May provide metadata.resourceVersion to enforce update from last read for optimistic concurrency control. */
export const replaceWorkerPoolNamespacesWorkerpools: API.OperationMethod<ReplaceWorkerPoolNamespacesWorkerpoolsRequest, ReplaceWorkerPoolNamespacesWorkerpoolsResponse, ReplaceWorkerPoolNamespacesWorkerpoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReplaceWorkerPoolNamespacesWorkerpoolsRequest,
  output: ReplaceWorkerPoolNamespacesWorkerpoolsResponse,
  errors: [],
}));

export interface DeleteNamespacesWorkerpoolsRequest {
  /** Required. The fully qualified name of the worker pool to delete. It can be any of the following forms: * `namespaces/{project_id_or_number}/workerpools/{worker_pool_name}` (only when the `endpoint` is regional) * `projects/{project_id_or_number}/locations/{region}/workerpools/{worker_pool_name}` * `projects/{project_id_or_number}/regions/{region}/workerpools/{worker_pool_name}` */
  name: string;
  /** Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` */
  dryRun?: string;
}

export const DeleteNamespacesWorkerpoolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  dryRun: Schema.optional(Schema.String).pipe(T.HttpQuery("dryRun")),
}).pipe(
  T.Http({ method: "DELETE", path: "apis/run.googleapis.com/v1/namespaces/{namespacesId}/workerpools/{workerpoolsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteNamespacesWorkerpoolsRequest>;

export type DeleteNamespacesWorkerpoolsResponse = Status;
export const DeleteNamespacesWorkerpoolsResponse = Status;

export type DeleteNamespacesWorkerpoolsError = CommonErrors;

/** Deletes the provided worker pool. This will cause the WorkerPool to stop all instances and will delete all associated WorkerPoolRevisions. */
export const deleteNamespacesWorkerpools: API.OperationMethod<DeleteNamespacesWorkerpoolsRequest, DeleteNamespacesWorkerpoolsResponse, DeleteNamespacesWorkerpoolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteNamespacesWorkerpoolsRequest,
  output: DeleteNamespacesWorkerpoolsResponse,
  errors: [],
}));

