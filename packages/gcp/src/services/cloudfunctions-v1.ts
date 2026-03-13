// ==========================================================================
// Cloud Functions API (cloudfunctions v1)
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
  name: "cloudfunctions",
  version: "v1",
  rootUrl: "https://cloudfunctions.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Retry {}

export const Retry: Schema.Schema<Retry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Retry",
  }) as any as Schema.Schema<Retry>;

export interface SourceRepository {
  /** The URL pointing to the hosted repository where the function is defined. There are supported Cloud Source Repository URLs in the following formats: To refer to a specific commit: `https://source.developers.google.com/projects/* /repos/* /revisions/* /paths/*` To refer to a moveable alias (branch): `https://source.developers.google.com/projects/* /repos/* /moveable-aliases/* /paths/*` In particular, to refer to HEAD use `master` moveable alias. To refer to a specific fixed alias (tag): `https://source.developers.google.com/projects/* /repos/* /fixed-aliases/* /paths/*` You may omit `paths/*` if you want to use the main directory. The function response may add an empty `/paths/` to the URL. */
  url?: string;
  /** Output only. The URL pointing to the hosted repository where the function were defined at the time of deployment. It always points to a specific commit in the format described above. */
  deployedUrl?: string;
}

export const SourceRepository: Schema.Schema<SourceRepository> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
      deployedUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SourceRepository",
  }) as any as Schema.Schema<SourceRepository>;

export interface AutomaticUpdatePolicy {}

export const AutomaticUpdatePolicy: Schema.Schema<AutomaticUpdatePolicy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "AutomaticUpdatePolicy",
  }) as any as Schema.Schema<AutomaticUpdatePolicy>;

export interface OperationMetadataV1 {
  /** An identifier for Firebase function sources. Disclaimer: This field is only supported for Firebase function deployments. */
  sourceToken?: string;
  /** The last update timestamp of the operation. */
  updateTime?: string;
  /** Type of operation. */
  type?:
    | "OPERATION_UNSPECIFIED"
    | "CREATE_FUNCTION"
    | "UPDATE_FUNCTION"
    | "DELETE_FUNCTION"
    | (string & {});
  /** Target of the operation - for example `projects/project-1/locations/region-1/functions/function-1` */
  target?: string;
  /** The Cloud Build ID of the function created or updated by an API call. This field is only populated for Create and Update operations. */
  buildId?: string;
  /** The original request that started the operation. */
  request?: Record<string, unknown>;
  /** Version id of the function created or updated by an API call. This field is only populated for Create and Update operations. */
  versionId?: string;
  /** The Cloud Build Name of the function deployment. This field is only populated for Create and Update operations. `projects//locations//builds/`. */
  buildName?: string;
}

export const OperationMetadataV1: Schema.Schema<OperationMetadataV1> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sourceToken: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      buildId: Schema.optional(Schema.String),
      request: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      versionId: Schema.optional(Schema.String),
      buildName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OperationMetadataV1",
  }) as any as Schema.Schema<OperationMetadataV1>;

export interface GenerateUploadUrlResponse {
  /** The generated Google Cloud Storage signed URL that should be used for a function source code upload. The uploaded file should be a zip archive which contains a function. */
  uploadUrl?: string;
}

export const GenerateUploadUrlResponse: Schema.Schema<GenerateUploadUrlResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uploadUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GenerateUploadUrlResponse",
  }) as any as Schema.Schema<GenerateUploadUrlResponse>;

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

export const AuditLogConfig: Schema.Schema<AuditLogConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
      logType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AuditLogConfig",
  }) as any as Schema.Schema<AuditLogConfig>;

export interface Status {
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Schema.String),
      code: Schema.optional(Schema.Number),
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
    }),
  ).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      done: Schema.optional(Schema.Boolean),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      error: Schema.optional(Status),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      operations: Schema.optional(Schema.Array(Operation)),
    }),
  ).annotate({
    identifier: "ListOperationsResponse",
  }) as any as Schema.Schema<ListOperationsResponse>;

export interface HttpsTrigger {
  /** Output only. The deployed url for the function. */
  url?: string;
  /** The security level for the function. */
  securityLevel?:
    | "SECURITY_LEVEL_UNSPECIFIED"
    | "SECURE_ALWAYS"
    | "SECURE_OPTIONAL"
    | (string & {});
}

export const HttpsTrigger: Schema.Schema<HttpsTrigger> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
      securityLevel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "HttpsTrigger",
  }) as any as Schema.Schema<HttpsTrigger>;

export interface CallFunctionResponse {
  /** Either system or user-function generated error. Set if execution was not successful. */
  error?: string;
  /** Execution id of function invocation. */
  executionId?: string;
  /** Result populated for successful execution of synchronous function. Will not be populated if function does not return a result through context. */
  result?: string;
}

export const CallFunctionResponse: Schema.Schema<CallFunctionResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      error: Schema.optional(Schema.String),
      executionId: Schema.optional(Schema.String),
      result: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CallFunctionResponse",
  }) as any as Schema.Schema<CallFunctionResponse>;

export interface Expr {
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
}

export const Expr: Schema.Schema<Expr> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      location: Schema.optional(Schema.String),
      expression: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
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

export interface AuditConfig {
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
}

export const AuditConfig: Schema.Schema<AuditConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
      service: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AuditConfig",
  }) as any as Schema.Schema<AuditConfig>;

export interface Policy {
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
}

export const Policy: Schema.Schema<Policy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bindings: Schema.optional(Schema.Array(Binding)),
      auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
      etag: Schema.optional(Schema.String),
      version: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

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

export interface SecretVersion {
  /** Version of the secret (version number or the string 'latest'). It is preferable to use `latest` version with secret volumes as secret value changes are reflected immediately. */
  version?: string;
  /** Relative path of the file under the mount path where the secret value for this version will be fetched and made available. For example, setting the mount_path as '/etc/secrets' and path as `/secret_foo` would mount the secret value file at `/etc/secrets/secret_foo`. */
  path?: string;
}

export const SecretVersion: Schema.Schema<SecretVersion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SecretVersion",
  }) as any as Schema.Schema<SecretVersion>;

export interface SecretVolume {
  /** The path within the container to mount the secret volume. For example, setting the mount_path as `/etc/secrets` would mount the secret value files under the `/etc/secrets` directory. This directory will also be completely shadowed and unavailable to mount any other secrets. Recommended mount paths: /etc/secrets Restricted mount paths: /cloudsql, /dev/log, /pod, /proc, /var/log */
  mountPath?: string;
  /** List of secret versions to mount for this secret. If empty, the `latest` version of the secret will be made available in a file named after the secret under the mount point. */
  versions?: Array<SecretVersion>;
  /** Project identifier (preferrably project number but can also be the project ID) of the project that contains the secret. If not set, it will be populated with the function's project assuming that the secret exists in the same project as of the function. */
  projectId?: string;
  /** Name of the secret in secret manager (not the full resource name). */
  secret?: string;
}

export const SecretVolume: Schema.Schema<SecretVolume> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      mountPath: Schema.optional(Schema.String),
      versions: Schema.optional(Schema.Array(SecretVersion)),
      projectId: Schema.optional(Schema.String),
      secret: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SecretVolume",
  }) as any as Schema.Schema<SecretVolume>;

export interface OnDeployUpdatePolicy {
  /** Output only. Contains the runtime version which was used during latest function deployment. */
  runtimeVersion?: string;
}

export const OnDeployUpdatePolicy: Schema.Schema<OnDeployUpdatePolicy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      runtimeVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OnDeployUpdatePolicy",
  }) as any as Schema.Schema<OnDeployUpdatePolicy>;

export interface FailurePolicy {
  /** If specified, then the function will be retried in case of a failure. */
  retry?: Retry;
}

export const FailurePolicy: Schema.Schema<FailurePolicy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      retry: Schema.optional(Retry),
    }),
  ).annotate({
    identifier: "FailurePolicy",
  }) as any as Schema.Schema<FailurePolicy>;

export interface EventTrigger {
  /** Required. The type of event to observe. For example: `providers/cloud.storage/eventTypes/object.change` and `providers/cloud.pubsub/eventTypes/topic.publish`. Event types match pattern `providers/* /eventTypes/*.*`. The pattern contains: 1. namespace: For example, `cloud.storage` and `google.firebase.analytics`. 2. resource type: The type of resource on which event occurs. For example, the Google Cloud Storage API includes the type `object`. 3. action: The action that generates the event. For example, action for a Google Cloud Storage Object is 'change'. These parts are lower case. */
  eventType?: string;
  /** Required. The resource(s) from which to observe events, for example, `projects/_/buckets/myBucket`. Not all syntactically correct values are accepted by all services. For example: 1. The authorization model must support it. Google Cloud Functions only allows EventTriggers to be deployed that observe resources in the same project as the `CloudFunction`. 2. The resource type must match the pattern expected for an `event_type`. For example, an `EventTrigger` that has an `event_type` of "google.pubsub.topic.publish" should have a resource that matches Google Cloud Pub/Sub topics. Additionally, some services may support short names when creating an `EventTrigger`. These will always be returned in the normalized "long" format. See each *service's* documentation for supported formats. */
  resource?: string;
  /** The hostname of the service that should be observed. If no string is provided, the default service implementing the API will be used. For example, `storage.googleapis.com` is the default for all event types in the `google.storage` namespace. */
  service?: string;
  /** Specifies policy for failed executions. */
  failurePolicy?: FailurePolicy;
}

export const EventTrigger: Schema.Schema<EventTrigger> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      eventType: Schema.optional(Schema.String),
      resource: Schema.optional(Schema.String),
      service: Schema.optional(Schema.String),
      failurePolicy: Schema.optional(FailurePolicy),
    }),
  ).annotate({
    identifier: "EventTrigger",
  }) as any as Schema.Schema<EventTrigger>;

export interface SecretEnvVar {
  /** Name of the environment variable. */
  key?: string;
  /** Version of the secret (version number or the string 'latest'). It is recommended to use a numeric version for secret environment variables as any updates to the secret value is not reflected until new instances start. */
  version?: string;
  /** Project identifier (preferably project number but can also be the project ID) of the project that contains the secret. If not set, it will be populated with the function's project assuming that the secret exists in the same project as of the function. */
  projectId?: string;
  /** Name of the secret in secret manager (not the full resource name). */
  secret?: string;
}

export const SecretEnvVar: Schema.Schema<SecretEnvVar> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      key: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
      projectId: Schema.optional(Schema.String),
      secret: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SecretEnvVar",
  }) as any as Schema.Schema<SecretEnvVar>;

export interface CloudFunction {
  /** Input only. An identifier for Firebase function sources. Disclaimer: This field is only supported for Firebase function deployments. */
  sourceToken?: string;
  /** The email of the function's service account. If empty, defaults to `{project_id}@appspot.gserviceaccount.com`. */
  serviceAccountEmail?: string;
  /** Build environment variables that shall be available during build time. */
  buildEnvironmentVariables?: Record<string, string>;
  /** The runtime in which to run the function. Required when deploying a new function, optional when updating an existing function. For a complete list of possible choices, see the [`gcloud` command reference](https://cloud.google.com/sdk/gcloud/reference/functions/deploy#--runtime). */
  runtime?: string;
  /** Labels associated with this Cloud Function. */
  labels?: Record<string, string>;
  /** An HTTPS endpoint type of source that can be triggered via URL. */
  httpsTrigger?: HttpsTrigger;
  /** A user-defined name of the function. Function names must be unique globally and match pattern `projects/* /locations/* /functions/*` */
  name?: string;
  /** Output only. The Cloud Build ID of the latest successful deployment of the function. */
  buildId?: string;
  /** The name of the function (as defined in source code) that will be executed. Defaults to the resource name suffix (ID of the function), if not specified. */
  entryPoint?: string;
  /** Output only. The version identifier of the Cloud Function. Each deployment attempt results in a new version of a function being created. */
  versionId?: string;
  /** Secret volumes configuration. */
  secretVolumes?: Array<SecretVolume>;
  automaticUpdatePolicy?: AutomaticUpdatePolicy;
  /** A service account the user provides for use with Cloud Build. The format of this field is `projects/{projectId}/serviceAccounts/{serviceAccountEmail}`. */
  buildServiceAccount?: string;
  /** Output only. */
  satisfiesPzi?: boolean;
  /** The function execution timeout. Execution is considered failed and can be terminated if the function is not completed at the end of the timeout period. Defaults to 60 seconds. */
  timeout?: string;
  onDeployUpdatePolicy?: OnDeployUpdatePolicy;
  /** The ingress settings for the function, controlling what traffic can reach it. */
  ingressSettings?:
    | "INGRESS_SETTINGS_UNSPECIFIED"
    | "ALLOW_ALL"
    | "ALLOW_INTERNAL_ONLY"
    | "ALLOW_INTERNAL_AND_GCLB"
    | (string & {});
  /** The limit on the maximum number of function instances that may coexist at a given time. In some cases, such as rapid traffic surges, Cloud Functions may, for a short period of time, create more instances than the specified max instances limit. If your function cannot tolerate this temporary behavior, you may want to factor in a safety margin and set a lower max instances value than your function can tolerate. See the [Max Instances](https://cloud.google.com/functions/docs/max-instances) Guide for more details. */
  maxInstances?: number;
  /** Deprecated: use vpc_connector */
  network?: string;
  /** A source that fires events in response to a condition in another service. */
  eventTrigger?: EventTrigger;
  /** Output only. Status of the function deployment. */
  status?:
    | "CLOUD_FUNCTION_STATUS_UNSPECIFIED"
    | "ACTIVE"
    | "OFFLINE"
    | "DEPLOY_IN_PROGRESS"
    | "DELETE_IN_PROGRESS"
    | "UNKNOWN"
    | (string & {});
  /** Environment variables that shall be available during function execution. */
  environmentVariables?: Record<string, string>;
  /** The Google Cloud Storage signed URL used for source uploading, generated by calling [google.cloud.functions.v1.GenerateUploadUrl]. The signature is validated on write methods (Create, Update) The signature is stripped from the Function object on read methods (Get, List) */
  sourceUploadUrl?: string;
  /** Output only. The last update timestamp of a Cloud Function. */
  updateTime?: string;
  /** The amount of memory in MB available for a function. Defaults to 256MB. */
  availableMemoryMb?: number;
  /** The VPC Network Connector that this cloud function can connect to. It can be either the fully-qualified URI, or the short name of the network connector resource. The format of this field is `projects/* /locations/* /connectors/*` This field is mutually exclusive with `network` field and will eventually replace it. See [the VPC documentation](https://cloud.google.com/compute/docs/vpc) for more information on connecting Cloud projects. */
  vpcConnector?: string;
  /** Name of the Cloud Build Custom Worker Pool that should be used to build the function. The format of this field is `projects/{project}/locations/{region}/workerPools/{workerPool}` where `{project}` and `{region}` are the project id and region respectively where the worker pool is defined and `{workerPool}` is the short name of the worker pool. If the project id is not the same as the function, then the Cloud Functions Service Agent (`service-@gcf-admin-robot.iam.gserviceaccount.com`) must be granted the role Cloud Build Custom Workers Builder (`roles/cloudbuild.customworkers.builder`) in the project. */
  buildWorkerPool?: string;
  /** User-provided description of a function. */
  description?: string;
  /** A lower bound for the number function instances that may coexist at a given time. */
  minInstances?: number;
  /** The egress settings for the connector, controlling what traffic is diverted through it. */
  vpcConnectorEgressSettings?:
    | "VPC_CONNECTOR_EGRESS_SETTINGS_UNSPECIFIED"
    | "PRIVATE_RANGES_ONLY"
    | "ALL_TRAFFIC"
    | (string & {});
  /** User-managed repository created in Artifact Registry to which the function's Docker image will be pushed after it is built by Cloud Build. May optionally be encrypted with a customer-managed encryption key (CMEK). If unspecified and `docker_registry` is not explicitly set to `CONTAINER_REGISTRY`, GCF will create and use a default Artifact Registry repository named 'gcf-artifacts' in the region. It must match the pattern `projects/{project}/locations/{location}/repositories/{repository}`. Cross-project repositories are not supported. Cross-location repositories are not supported. Repository format must be 'DOCKER'. */
  dockerRepository?: string;
  /** Secret environment variables configuration. */
  secretEnvironmentVariables?: Array<SecretEnvVar>;
  /** The Google Cloud Storage URL, starting with `gs://`, pointing to the zip archive which contains the function. */
  sourceArchiveUrl?: string;
  /** **Beta Feature** The source repository where a function is hosted. */
  sourceRepository?: SourceRepository;
  /** Resource name of a KMS crypto key (managed by the user) used to encrypt/decrypt function resources. It must match the pattern `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`. If specified, you must also provide an artifact registry repository using the `docker_repository` field that was created with the same KMS crypto key. The following service accounts need to be granted the role 'Cloud KMS CryptoKey Encrypter/Decrypter (roles/cloudkms.cryptoKeyEncrypterDecrypter)' on the Key/KeyRing/Project/Organization (least access preferred). 1. Google Cloud Functions service account (service-{project_number}@gcf-admin-robot.iam.gserviceaccount.com) - Required to protect the function's image. 2. Google Storage service account (service-{project_number}@gs-project-accounts.iam.gserviceaccount.com) - Required to protect the function's source code. If this service account does not exist, deploying a function without a KMS key or retrieving the service agent name provisions it. For more information, see https://cloud.google.com/storage/docs/projects#service-agents and https://cloud.google.com/storage/docs/getting-service-agent#gsutil. Google Cloud Functions delegates access to service agents to protect function resources in internal projects that are not accessible by the end user. */
  kmsKeyName?: string;
  /** Docker Registry to use for this deployment. Deprecated: as of March 2025, `CONTAINER_REGISTRY` option is no longer available in response to Container Registry's deprecation: https://cloud.google.com/artifact-registry/docs/transition/transition-from-gcr Please use Artifact Registry instead, which is the default choice. If unspecified, it defaults to `ARTIFACT_REGISTRY`. If `docker_repository` field is specified, this field should either be left unspecified or set to `ARTIFACT_REGISTRY`. */
  dockerRegistry?:
    | "DOCKER_REGISTRY_UNSPECIFIED"
    | "CONTAINER_REGISTRY"
    | "ARTIFACT_REGISTRY"
    | (string & {});
  /** Output only. */
  satisfiesPzs?: boolean;
  /** Output only. The Cloud Build Name of the function deployment. `projects//locations//builds/`. */
  buildName?: string;
}

export const CloudFunction: Schema.Schema<CloudFunction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sourceToken: Schema.optional(Schema.String),
      serviceAccountEmail: Schema.optional(Schema.String),
      buildEnvironmentVariables: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      runtime: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      httpsTrigger: Schema.optional(HttpsTrigger),
      name: Schema.optional(Schema.String),
      buildId: Schema.optional(Schema.String),
      entryPoint: Schema.optional(Schema.String),
      versionId: Schema.optional(Schema.String),
      secretVolumes: Schema.optional(Schema.Array(SecretVolume)),
      automaticUpdatePolicy: Schema.optional(AutomaticUpdatePolicy),
      buildServiceAccount: Schema.optional(Schema.String),
      satisfiesPzi: Schema.optional(Schema.Boolean),
      timeout: Schema.optional(Schema.String),
      onDeployUpdatePolicy: Schema.optional(OnDeployUpdatePolicy),
      ingressSettings: Schema.optional(Schema.String),
      maxInstances: Schema.optional(Schema.Number),
      network: Schema.optional(Schema.String),
      eventTrigger: Schema.optional(EventTrigger),
      status: Schema.optional(Schema.String),
      environmentVariables: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      sourceUploadUrl: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      availableMemoryMb: Schema.optional(Schema.Number),
      vpcConnector: Schema.optional(Schema.String),
      buildWorkerPool: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      minInstances: Schema.optional(Schema.Number),
      vpcConnectorEgressSettings: Schema.optional(Schema.String),
      dockerRepository: Schema.optional(Schema.String),
      secretEnvironmentVariables: Schema.optional(Schema.Array(SecretEnvVar)),
      sourceArchiveUrl: Schema.optional(Schema.String),
      sourceRepository: Schema.optional(SourceRepository),
      kmsKeyName: Schema.optional(Schema.String),
      dockerRegistry: Schema.optional(Schema.String),
      satisfiesPzs: Schema.optional(Schema.Boolean),
      buildName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CloudFunction",
  }) as any as Schema.Schema<CloudFunction>;

export interface ListFunctionsResponse {
  /** The functions that match the request. */
  functions?: Array<CloudFunction>;
  /** If not empty, indicates that there may be more functions that match the request; this value should be passed in a new google.cloud.functions.v1.ListFunctionsRequest to get more functions. */
  nextPageToken?: string;
  /** Locations that could not be reached. The response does not include any functions from these locations. */
  unreachable?: Array<string>;
}

export const ListFunctionsResponse: Schema.Schema<ListFunctionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      functions: Schema.optional(Schema.Array(CloudFunction)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListFunctionsResponse",
  }) as any as Schema.Schema<ListFunctionsResponse>;

export interface GenerateDownloadUrlResponse {
  /** The generated Google Cloud Storage signed URL that should be used for function source code download. */
  downloadUrl?: string;
}

export const GenerateDownloadUrlResponse: Schema.Schema<GenerateDownloadUrlResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      downloadUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GenerateDownloadUrlResponse",
  }) as any as Schema.Schema<GenerateDownloadUrlResponse>;

export interface Location {
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
}

export const Location: Schema.Schema<Location> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      name: Schema.optional(Schema.String),
      locationId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
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

export interface GenerateDownloadUrlRequest {
  /** The optional version of function. If not set, default, current version is used. */
  versionId?: string;
}

export const GenerateDownloadUrlRequest: Schema.Schema<GenerateDownloadUrlRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      versionId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GenerateDownloadUrlRequest",
  }) as any as Schema.Schema<GenerateDownloadUrlRequest>;

export interface GenerateUploadUrlRequest {
  /** Resource name of a KMS crypto key (managed by the user) used to encrypt/decrypt function source code objects in intermediate Cloud Storage buckets. When you generate an upload url and upload your source code, it gets copied to an intermediate Cloud Storage bucket. The source code is then copied to a versioned directory in the sources bucket in the consumer project during the function deployment. It must match the pattern `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`. The Google Cloud Functions service account (service-{project_number}@gcf-admin-robot.iam.gserviceaccount.com) must be granted the role 'Cloud KMS CryptoKey Encrypter/Decrypter (roles/cloudkms.cryptoKeyEncrypterDecrypter)' on the Key/KeyRing/Project/Organization (least access preferred). GCF will delegate access to the Google Storage service account in the internal project. */
  kmsKeyName?: string;
}

export const GenerateUploadUrlRequest: Schema.Schema<GenerateUploadUrlRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kmsKeyName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GenerateUploadUrlRequest",
  }) as any as Schema.Schema<GenerateUploadUrlRequest>;

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

export interface CallFunctionRequest {
  /** Required. Input to be passed to the function. */
  data?: string;
}

export const CallFunctionRequest: Schema.Schema<CallFunctionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      data: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CallFunctionRequest",
  }) as any as Schema.Schema<CallFunctionRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = Operation;
export const GetOperationsResponse = /*@__PURE__*/ /*#__PURE__*/ Operation;

export type GetOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getOperations: API.OperationMethod<
  GetOperationsRequest,
  GetOperationsResponse,
  GetOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

export interface ListOperationsRequest {
  /** The standard list filter. */
  filter?: string;
  /** The name of the operation's parent resource. */
  name?: string;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list page size. */
  pageSize?: number;
}

export const ListOperationsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("returnPartialSuccess"),
  ),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations" }),
  svc,
) as unknown as Schema.Schema<ListOperationsRequest>;

export type ListOperationsResponse_Op = ListOperationsResponse;
export const ListOperationsResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListOperationsResponse;

export type ListOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listOperations: API.PaginatedOperationMethod<
  ListOperationsRequest,
  ListOperationsResponse_Op,
  ListOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListOperationsRequest,
  output: ListOperationsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsRequest {
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The resource that owns the locations collection, if applicable. */
  name: string;
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
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    name: Schema.String.pipe(T.HttpPath("name")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
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

export interface SetIamPolicyProjectsLocationsFunctionsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsFunctionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsFunctionsRequest>;

export type SetIamPolicyProjectsLocationsFunctionsResponse = Policy;
export const SetIamPolicyProjectsLocationsFunctionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsLocationsFunctionsError = DefaultErrors;

/** Sets the IAM access control policy on the specified function. Replaces any existing policy. */
export const setIamPolicyProjectsLocationsFunctions: API.OperationMethod<
  SetIamPolicyProjectsLocationsFunctionsRequest,
  SetIamPolicyProjectsLocationsFunctionsResponse,
  SetIamPolicyProjectsLocationsFunctionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsLocationsFunctionsRequest,
  output: SetIamPolicyProjectsLocationsFunctionsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsFunctionsRequest {
  /** Required. The name of the function which should be deleted. */
  name: string;
}

export const DeleteProjectsLocationsFunctionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsFunctionsRequest>;

export type DeleteProjectsLocationsFunctionsResponse = Operation;
export const DeleteProjectsLocationsFunctionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsFunctionsError = DefaultErrors;

/** Deletes a function with the given name from the specified project. If the given function is used by some trigger, the trigger will be updated to remove this function. */
export const deleteProjectsLocationsFunctions: API.OperationMethod<
  DeleteProjectsLocationsFunctionsRequest,
  DeleteProjectsLocationsFunctionsResponse,
  DeleteProjectsLocationsFunctionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsFunctionsRequest,
  output: DeleteProjectsLocationsFunctionsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsFunctionsRequest {
  /** A user-defined name of the function. Function names must be unique globally and match pattern `projects/* /locations/* /functions/*` */
  name: string;
  /** Required. The list of fields in `CloudFunction` that have to be updated. */
  updateMask?: string;
  /** Request body */
  body?: CloudFunction;
}

export const PatchProjectsLocationsFunctionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(CloudFunction).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsFunctionsRequest>;

export type PatchProjectsLocationsFunctionsResponse = Operation;
export const PatchProjectsLocationsFunctionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsFunctionsError = DefaultErrors;

/** Updates existing function. */
export const patchProjectsLocationsFunctions: API.OperationMethod<
  PatchProjectsLocationsFunctionsRequest,
  PatchProjectsLocationsFunctionsResponse,
  PatchProjectsLocationsFunctionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsFunctionsRequest,
  output: PatchProjectsLocationsFunctionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsFunctionsRequest {
  /** Maximum number of functions to return per call. */
  pageSize?: number;
  /** The project and location from which the function should be listed, specified in the format `projects/* /locations/*` If you want to list functions in all locations, use "-" in place of a location. When listing functions in all locations, if one or more location(s) are unreachable, the response will contain functions from all reachable locations along with the names of any unreachable locations. */
  parent: string;
  /** The value returned by the last `ListFunctionsResponse`; indicates that this is a continuation of a prior `ListFunctions` call, and that the system should return the next page of data. */
  pageToken?: string;
}

export const ListProjectsLocationsFunctionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/functions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsFunctionsRequest>;

export type ListProjectsLocationsFunctionsResponse = ListFunctionsResponse;
export const ListProjectsLocationsFunctionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListFunctionsResponse;

export type ListProjectsLocationsFunctionsError = DefaultErrors;

/** Returns a list of functions that belong to the requested project. */
export const listProjectsLocationsFunctions: API.PaginatedOperationMethod<
  ListProjectsLocationsFunctionsRequest,
  ListProjectsLocationsFunctionsResponse,
  ListProjectsLocationsFunctionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsFunctionsRequest,
  output: ListProjectsLocationsFunctionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsFunctionsRequest {
  /** Required. The project and location in which the function should be created, specified in the format `projects/* /locations/*` */
  location: string;
  /** Request body */
  body?: CloudFunction;
}

export const CreateProjectsLocationsFunctionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.HttpPath("location")),
    body: Schema.optional(CloudFunction).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/functions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsFunctionsRequest>;

export type CreateProjectsLocationsFunctionsResponse = Operation;
export const CreateProjectsLocationsFunctionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsFunctionsError = DefaultErrors;

/** Creates a new function. If a function with the given name already exists in the specified project, the long running operation will return `ALREADY_EXISTS` error. */
export const createProjectsLocationsFunctions: API.OperationMethod<
  CreateProjectsLocationsFunctionsRequest,
  CreateProjectsLocationsFunctionsResponse,
  CreateProjectsLocationsFunctionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsFunctionsRequest,
  output: CreateProjectsLocationsFunctionsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsFunctionsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsFunctionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsFunctionsRequest>;

export type TestIamPermissionsProjectsLocationsFunctionsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsFunctionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsFunctionsError = DefaultErrors;

/** Tests the specified permissions against the IAM access control policy for a function. If the function does not exist, this will return an empty set of permissions, not a NOT_FOUND error. */
export const testIamPermissionsProjectsLocationsFunctions: API.OperationMethod<
  TestIamPermissionsProjectsLocationsFunctionsRequest,
  TestIamPermissionsProjectsLocationsFunctionsResponse,
  TestIamPermissionsProjectsLocationsFunctionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsLocationsFunctionsRequest,
  output: TestIamPermissionsProjectsLocationsFunctionsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsFunctionsRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsFunctionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
    resource: Schema.String.pipe(T.HttpPath("resource")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsFunctionsRequest>;

export type GetIamPolicyProjectsLocationsFunctionsResponse = Policy;
export const GetIamPolicyProjectsLocationsFunctionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsLocationsFunctionsError = DefaultErrors;

/** Gets the IAM access control policy for a function. Returns an empty policy if the function exists and does not have a policy set. */
export const getIamPolicyProjectsLocationsFunctions: API.OperationMethod<
  GetIamPolicyProjectsLocationsFunctionsRequest,
  GetIamPolicyProjectsLocationsFunctionsResponse,
  GetIamPolicyProjectsLocationsFunctionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsLocationsFunctionsRequest,
  output: GetIamPolicyProjectsLocationsFunctionsResponse,
  errors: [],
}));

export interface GenerateDownloadUrlProjectsLocationsFunctionsRequest {
  /** The name of function for which source code Google Cloud Storage signed URL should be generated. */
  name: string;
  /** Request body */
  body?: GenerateDownloadUrlRequest;
}

export const GenerateDownloadUrlProjectsLocationsFunctionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(GenerateDownloadUrlRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}:generateDownloadUrl",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GenerateDownloadUrlProjectsLocationsFunctionsRequest>;

export type GenerateDownloadUrlProjectsLocationsFunctionsResponse =
  GenerateDownloadUrlResponse;
export const GenerateDownloadUrlProjectsLocationsFunctionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GenerateDownloadUrlResponse;

export type GenerateDownloadUrlProjectsLocationsFunctionsError = DefaultErrors;

/** Returns a signed URL for downloading deployed function source code. The URL is only valid for a limited period and should be used within minutes after generation. For more information about the signed URL usage see: https://cloud.google.com/storage/docs/access-control/signed-urls */
export const generateDownloadUrlProjectsLocationsFunctions: API.OperationMethod<
  GenerateDownloadUrlProjectsLocationsFunctionsRequest,
  GenerateDownloadUrlProjectsLocationsFunctionsResponse,
  GenerateDownloadUrlProjectsLocationsFunctionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GenerateDownloadUrlProjectsLocationsFunctionsRequest,
  output: GenerateDownloadUrlProjectsLocationsFunctionsResponse,
  errors: [],
}));

export interface GetProjectsLocationsFunctionsRequest {
  /** Required. The name of the function which details should be obtained. */
  name: string;
  /** Optional. The optional version of the function whose details should be obtained. The version of a 1st Gen function is an integer that starts from 1 and gets incremented on redeployments. Each deployment creates a config version of the underlying function. GCF may keep historical configs for old versions. This field can be specified to fetch the historical configs. Leave it blank or set to 0 to get the latest version of the function. */
  versionId?: string;
}

export const GetProjectsLocationsFunctionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    versionId: Schema.optional(Schema.String).pipe(T.HttpQuery("versionId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsFunctionsRequest>;

export type GetProjectsLocationsFunctionsResponse = CloudFunction;
export const GetProjectsLocationsFunctionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CloudFunction;

export type GetProjectsLocationsFunctionsError = DefaultErrors;

/** Returns a function with the given name from the requested project. */
export const getProjectsLocationsFunctions: API.OperationMethod<
  GetProjectsLocationsFunctionsRequest,
  GetProjectsLocationsFunctionsResponse,
  GetProjectsLocationsFunctionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsFunctionsRequest,
  output: GetProjectsLocationsFunctionsResponse,
  errors: [],
}));

export interface CallProjectsLocationsFunctionsRequest {
  /** Required. The name of the function to be called. */
  name: string;
  /** Request body */
  body?: CallFunctionRequest;
}

export const CallProjectsLocationsFunctionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CallFunctionRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/functions/{functionsId}:call",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CallProjectsLocationsFunctionsRequest>;

export type CallProjectsLocationsFunctionsResponse = CallFunctionResponse;
export const CallProjectsLocationsFunctionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CallFunctionResponse;

export type CallProjectsLocationsFunctionsError = DefaultErrors;

/** Synchronously invokes a deployed Cloud Function. To be used for testing purposes as very limited traffic is allowed. For more information on the actual limits, refer to [Rate Limits](https://cloud.google.com/functions/quotas#rate_limits). */
export const callProjectsLocationsFunctions: API.OperationMethod<
  CallProjectsLocationsFunctionsRequest,
  CallProjectsLocationsFunctionsResponse,
  CallProjectsLocationsFunctionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CallProjectsLocationsFunctionsRequest,
  output: CallProjectsLocationsFunctionsResponse,
  errors: [],
}));

export interface GenerateUploadUrlProjectsLocationsFunctionsRequest {
  /** The project and location in which the Google Cloud Storage signed URL should be generated, specified in the format `projects/* /locations/*`. */
  parent: string;
  /** Request body */
  body?: GenerateUploadUrlRequest;
}

export const GenerateUploadUrlProjectsLocationsFunctionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GenerateUploadUrlRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/functions:generateUploadUrl",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GenerateUploadUrlProjectsLocationsFunctionsRequest>;

export type GenerateUploadUrlProjectsLocationsFunctionsResponse =
  GenerateUploadUrlResponse;
export const GenerateUploadUrlProjectsLocationsFunctionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GenerateUploadUrlResponse;

export type GenerateUploadUrlProjectsLocationsFunctionsError = DefaultErrors;

/** Returns a signed URL for uploading a function source code. For more information about the signed URL usage see: https://cloud.google.com/storage/docs/access-control/signed-urls. Once the function source code upload is complete, the used signed URL should be provided in CreateFunction or UpdateFunction request as a reference to the function source code. When uploading source code to the generated signed URL, please follow these restrictions: * Source file type should be a zip file. * Source file size should not exceed 100MB limit. * No credentials should be attached - the signed URLs provide access to the target bucket using internal service identity; if credentials were attached, the identity from the credentials would be used, but that identity does not have permissions to upload files to the URL. When making a HTTP PUT request, these two headers need to be specified: * `content-type: application/zip` * `x-goog-content-length-range: 0,104857600` And this header SHOULD NOT be specified: * `Authorization: Bearer YOUR_TOKEN` */
export const generateUploadUrlProjectsLocationsFunctions: API.OperationMethod<
  GenerateUploadUrlProjectsLocationsFunctionsRequest,
  GenerateUploadUrlProjectsLocationsFunctionsResponse,
  GenerateUploadUrlProjectsLocationsFunctionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GenerateUploadUrlProjectsLocationsFunctionsRequest,
  output: GenerateUploadUrlProjectsLocationsFunctionsResponse,
  errors: [],
}));
