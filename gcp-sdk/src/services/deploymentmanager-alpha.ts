// ==========================================================================
// Cloud Deployment Manager V2 API (deploymentmanager alpha)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "deploymentmanager",
  version: "alpha",
  rootUrl: "https://deploymentmanager.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface TypeInfoSchemaInfo {
  /** The properties that this composite type or base type collection exposes as output, these properties can be used for references, represented as json blob, format is: JSON Schema Draft V4 */
  output?: string;
  /** The properties that this composite type or base type collection accept as input, represented as a json blob, format is: JSON Schema Draft V4 */
  input?: string;
}

export const TypeInfoSchemaInfo: Schema.Schema<TypeInfoSchemaInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      output: Schema.optional(Schema.String),
      input: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TypeInfoSchemaInfo",
  }) as any as Schema.Schema<TypeInfoSchemaInfo>;

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
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() =>
  Schema.Struct({
    auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
    service: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

export interface Expr {
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() =>
  Schema.Struct({
    expression: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
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

export const Binding: Schema.Schema<Binding> = Schema.suspend(() =>
  Schema.Struct({
    role: Schema.optional(Schema.String),
    members: Schema.optional(Schema.Array(Schema.String)),
    condition: Schema.optional(Expr),
  }),
).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface Policy {
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() =>
  Schema.Struct({
    etag: Schema.optional(Schema.String),
    version: Schema.optional(Schema.Number),
    auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
    bindings: Schema.optional(Schema.Array(Binding)),
  }),
).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface GlobalSetPolicyRequest {
  /** Flatten Policy to create a backward compatible wire-format. Deprecated. Use 'policy' to specify the etag. */
  etag?: string;
  /** REQUIRED: The complete policy to be applied to the 'resource'. The size of the policy is limited to a few 10s of KB. An empty policy is in general a valid policy but certain services (like Projects) might reject them. */
  policy?: Policy;
  /** Flatten Policy to create a backward compatible wire-format. Deprecated. Use 'policy' to specify bindings. */
  bindings?: Array<Binding>;
  /** Update mask for the policy. */
  updateMask?: string;
}

export const GlobalSetPolicyRequest: Schema.Schema<GlobalSetPolicyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      policy: Schema.optional(Policy),
      bindings: Schema.optional(Schema.Array(Binding)),
      updateMask: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GlobalSetPolicyRequest",
  }) as any as Schema.Schema<GlobalSetPolicyRequest>;

export interface ResourceAccessControl {
  /** The GCP IAM Policy to set on the resource. */
  gcpIamPolicy?: string;
}

export const ResourceAccessControl: Schema.Schema<ResourceAccessControl> =
  Schema.suspend(() =>
    Schema.Struct({
      gcpIamPolicy: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ResourceAccessControl",
  }) as any as Schema.Schema<ResourceAccessControl>;

export interface BasicAuth {
  user?: string;
  password?: string;
}

export const BasicAuth: Schema.Schema<BasicAuth> = Schema.suspend(() =>
  Schema.Struct({
    user: Schema.optional(Schema.String),
    password: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "BasicAuth" }) as any as Schema.Schema<BasicAuth>;

export interface ServiceAccount {
  /** The IAM service account email address like test@myproject.iam.gserviceaccount.com */
  email?: string;
}

export const ServiceAccount: Schema.Schema<ServiceAccount> = Schema.suspend(
  () =>
    Schema.Struct({
      email: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ServiceAccount",
}) as any as Schema.Schema<ServiceAccount>;

export interface Credential {
  /** Basic Auth Credential, only used by TypeProvider. */
  basicAuth?: BasicAuth;
  /** Service Account Credential, only used by Deployment. */
  serviceAccount?: ServiceAccount;
  /** Specify to use the project default credential, only supported by Deployment. */
  useProjectDefault?: boolean;
}

export const Credential: Schema.Schema<Credential> = Schema.suspend(() =>
  Schema.Struct({
    basicAuth: Schema.optional(BasicAuth),
    serviceAccount: Schema.optional(ServiceAccount),
    useProjectDefault: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "Credential" }) as any as Schema.Schema<Credential>;

export interface ErrorInfo {
  /** The reason of the error. This is a constant value that identifies the proximate cause of the error. Error reasons are unique within a particular domain of errors. This should be at most 63 characters and match a regular expression of `A-Z+[A-Z0-9]`, which represents UPPER_SNAKE_CASE. */
  reason?: string;
  /** The logical grouping to which the "reason" belongs. The error domain is typically the registered service name of the tool or product that generates the error. Example: "pubsub.googleapis.com". If the error is generated by some common infrastructure, the error domain must be a globally unique value that identifies the infrastructure. For Google API infrastructure, the error domain is "googleapis.com". */
  domain?: string;
  /** Additional structured details about this error. Keys must match a regular expression of `a-z+` but should ideally be lowerCamelCase. Also, they must be limited to 64 characters in length. When identifying the current value of an exceeded limit, the units should be contained in the key, not the value. For example, rather than `{"instanceLimit": "100/request"}`, should be returned as, `{"instanceLimitPerRequest": "100"}`, if the client exceeds the number of instances that can be created in a single (batch) request. */
  metadatas?: Record<string, string>;
}

export const ErrorInfo: Schema.Schema<ErrorInfo> = Schema.suspend(() =>
  Schema.Struct({
    reason: Schema.optional(Schema.String),
    domain: Schema.optional(Schema.String),
    metadatas: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }),
).annotate({ identifier: "ErrorInfo" }) as any as Schema.Schema<ErrorInfo>;

export interface HelpLink {
  /** The URL of the link. */
  url?: string;
  /** Describes what the link offers. */
  description?: string;
}

export const HelpLink: Schema.Schema<HelpLink> = Schema.suspend(() =>
  Schema.Struct({
    url: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "HelpLink" }) as any as Schema.Schema<HelpLink>;

export interface Help {
  /** URL(s) pointing to additional information on handling the current error. */
  links?: Array<HelpLink>;
}

export const Help: Schema.Schema<Help> = Schema.suspend(() =>
  Schema.Struct({
    links: Schema.optional(Schema.Array(HelpLink)),
  }),
).annotate({ identifier: "Help" }) as any as Schema.Schema<Help>;

export interface QuotaExceededInfo {
  /** Current effective quota limit. The limit's unit depends on the quota type or metric. */
  limit?: number;
  /** The map holding related quota dimensions. */
  dimensions?: Record<string, string>;
  /** Future quota limit being rolled out. The limit's unit depends on the quota type or metric. */
  futureLimit?: number;
  /** Rollout status of the future quota limit. */
  rolloutStatus?: "ROLLOUT_STATUS_UNSPECIFIED" | "IN_PROGRESS" | (string & {});
  /** The name of the quota limit. */
  limitName?: string;
  /** The Compute Engine quota metric name. */
  metricName?: string;
}

export const QuotaExceededInfo: Schema.Schema<QuotaExceededInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      limit: Schema.optional(Schema.Number),
      dimensions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      futureLimit: Schema.optional(Schema.Number),
      rolloutStatus: Schema.optional(Schema.String),
      limitName: Schema.optional(Schema.String),
      metricName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "QuotaExceededInfo",
  }) as any as Schema.Schema<QuotaExceededInfo>;

export interface LocalizedMessage {
  /** The locale used following the specification defined at https://www.rfc-editor.org/rfc/bcp/bcp47.txt. Examples are: "en-US", "fr-CH", "es-MX" */
  locale?: string;
  /** The localized error message in the above locale. */
  message?: string;
}

export const LocalizedMessage: Schema.Schema<LocalizedMessage> = Schema.suspend(
  () =>
    Schema.Struct({
      locale: Schema.optional(Schema.String),
      message: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "LocalizedMessage",
}) as any as Schema.Schema<LocalizedMessage>;

export interface DebugInfo {
  /** Additional debugging information provided by the server. */
  detail?: string;
  /** The stack trace entries indicating where the error occurred. */
  stackEntries?: Array<string>;
}

export const DebugInfo: Schema.Schema<DebugInfo> = Schema.suspend(() =>
  Schema.Struct({
    detail: Schema.optional(Schema.String),
    stackEntries: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "DebugInfo" }) as any as Schema.Schema<DebugInfo>;

export interface ResourceUpdate {
  /** Output only. The expanded properties of the resource with reference values expanded. Returned as serialized YAML. */
  finalProperties?: string;
  /** Output only. The intent of the resource: `PREVIEW`, `UPDATE`, or `CANCEL`. */
  intent?:
    | "CREATE_OR_ACQUIRE"
    | "DELETE"
    | "ACQUIRE"
    | "UPDATE"
    | "ABANDON"
    | "CREATE"
    | (string & {});
  /** Output only. If warning messages are generated during processing of this resource, this field will be populated. */
  warnings?: Array<{
    code?:
      | "DEPRECATED_RESOURCE_USED"
      | "NO_RESULTS_ON_PAGE"
      | "UNREACHABLE"
      | "NEXT_HOP_ADDRESS_NOT_ASSIGNED"
      | "NEXT_HOP_INSTANCE_NOT_FOUND"
      | "NEXT_HOP_INSTANCE_NOT_ON_NETWORK"
      | "NEXT_HOP_CANNOT_IP_FORWARD"
      | "NEXT_HOP_NOT_RUNNING"
      | "INJECTED_KERNELS_DEPRECATED"
      | "REQUIRED_TOS_AGREEMENT"
      | "DISK_SIZE_LARGER_THAN_IMAGE_SIZE"
      | "RESOURCE_NOT_DELETED"
      | "SINGLE_INSTANCE_PROPERTY_TEMPLATE"
      | "NOT_CRITICAL_ERROR"
      | "CLEANUP_FAILED"
      | "FIELD_VALUE_OVERRIDEN"
      | "RESOURCE_IN_USE_BY_OTHER_RESOURCE_WARNING"
      | "NETWORK_ENDPOINT_NOT_DETACHED"
      | "PAGE_MISSING_RESULTS"
      | "SSL_POLICY_ENABLED_FEATURES_NOT_FETCHED"
      | "RESOURCE_NOT_FOUND_WARNING"
      | "MISSING_TYPE_DEPENDENCY"
      | "EXTERNAL_API_WARNING"
      | "SCHEMA_VALIDATION_IGNORED"
      | "UNDECLARED_PROPERTIES"
      | "EXPERIMENTAL_TYPE_USED"
      | "DEPRECATED_TYPE_USED"
      | "PARTIAL_SUCCESS"
      | "LARGE_DEPLOYMENT_WARNING"
      | "NEXT_HOP_INSTANCE_HAS_NO_IPV6_INTERFACE"
      | "INVALID_HEALTH_CHECK_FOR_DYNAMIC_WIEGHTED_LB"
      | "LIST_OVERHEAD_QUOTA_EXCEED"
      | "QUOTA_INFO_UNAVAILABLE"
      | "RESOURCE_USES_GLOBAL_DNS"
      | "RATE_LIMIT_EXCEEDED"
      | "UPCOMING_MAINTENANCES_UNAVAILABLE"
      | "RESERVED_ENTRY_136"
      | "RESERVED_ENTRY_139"
      | "RESERVED_ENTRY_141"
      | "RESERVED_ENTRY_142"
      | "RESERVED_ENTRY_143"
      | (string & {});
    data?: Array<{ value?: string; key?: string }>;
    message?: string;
  }>;
  /** The Access Control Policy to set on this resource after updating the resource itself. */
  accessControl?: ResourceAccessControl;
  /** Output only. In case this is an action, it will show the runtimePolicies that this action will have after updating the deployment. */
  runtimePolicies?: Array<
    "CREATE" | "DELETE" | "UPDATE_ON_CHANGE" | "UPDATE_ALWAYS" | (string & {})
  >;
  /** Output only. The state of the resource. */
  state?:
    | "PENDING"
    | "IN_PROGRESS"
    | "IN_PREVIEW"
    | "FAILED"
    | "ABORTED"
    | (string & {});
  /** Output only. URL of the manifest representing the update configuration of this resource. */
  manifest?: string;
  /** Output only. The set of updated properties for this resource, before references are expanded. Returned as serialized YAML. */
  properties?: string;
  /** Output only. The credential that will be used creating/updating this resource. */
  credential?: Credential;
  /** Output only. If errors are generated during update of the resource, this field will be populated. */
  error?: {
    errors?: Array<{
      errorDetails?: Array<{
        errorInfo?: ErrorInfo;
        help?: Help;
        quotaInfo?: QuotaExceededInfo;
        localizedMessage?: LocalizedMessage;
      }>;
      debugInfo?: DebugInfo;
      code?: string;
      location?: string;
      message?: string;
      arguments?: Array<string>;
    }>;
  };
}

export const ResourceUpdate: Schema.Schema<ResourceUpdate> = Schema.suspend(
  () =>
    Schema.Struct({
      finalProperties: Schema.optional(Schema.String),
      intent: Schema.optional(Schema.String),
      warnings: Schema.optional(
        Schema.Array(
          Schema.Struct({
            code: Schema.optional(Schema.String),
            data: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  value: Schema.optional(Schema.String),
                  key: Schema.optional(Schema.String),
                }),
              ),
            ),
            message: Schema.optional(Schema.String),
          }),
        ),
      ),
      accessControl: Schema.optional(ResourceAccessControl),
      runtimePolicies: Schema.optional(Schema.Array(Schema.String)),
      state: Schema.optional(Schema.String),
      manifest: Schema.optional(Schema.String),
      properties: Schema.optional(Schema.String),
      credential: Schema.optional(Credential),
      error: Schema.optional(
        Schema.Struct({
          errors: Schema.optional(
            Schema.Array(
              Schema.Struct({
                errorDetails: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      errorInfo: Schema.optional(ErrorInfo),
                      help: Schema.optional(Help),
                      quotaInfo: Schema.optional(QuotaExceededInfo),
                      localizedMessage: Schema.optional(LocalizedMessage),
                    }),
                  ),
                ),
                debugInfo: Schema.optional(DebugInfo),
                code: Schema.optional(Schema.String),
                location: Schema.optional(Schema.String),
                message: Schema.optional(Schema.String),
                arguments: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
          ),
        }),
      ),
    }),
).annotate({
  identifier: "ResourceUpdate",
}) as any as Schema.Schema<ResourceUpdate>;

export interface BulkInsertOperationStatus {
  /** [Output Only] Count of VMs originally planned to be created. */
  targetVmCount?: number;
  /** [Output Only] Creation status of BulkInsert operation - information if the flow is rolling forward or rolling back. */
  status?:
    | "STATUS_UNSPECIFIED"
    | "CREATING"
    | "ROLLING_BACK"
    | "DONE"
    | (string & {});
  /** [Output Only] Count of VMs that got deleted during rollback. */
  deletedVmCount?: number;
  /** [Output Only] Count of VMs that started creating but encountered an error. */
  failedToCreateVmCount?: number;
  /** [Output Only] Count of VMs successfully created so far. */
  createdVmCount?: number;
}

export const BulkInsertOperationStatus: Schema.Schema<BulkInsertOperationStatus> =
  Schema.suspend(() =>
    Schema.Struct({
      targetVmCount: Schema.optional(Schema.Number),
      status: Schema.optional(Schema.String),
      deletedVmCount: Schema.optional(Schema.Number),
      failedToCreateVmCount: Schema.optional(Schema.Number),
      createdVmCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "BulkInsertOperationStatus",
  }) as any as Schema.Schema<BulkInsertOperationStatus>;

export interface InstancesBulkInsertOperationMetadata {
  /** [Output Only] The machine type of the VMs that were created used internally only by KCP flex bulk insert. */
  machineType?: string;
  /** Status information per location (location name is key). Example key: zones/us-central1-a */
  perLocationStatus?: Record<string, BulkInsertOperationStatus>;
}

export const InstancesBulkInsertOperationMetadata: Schema.Schema<InstancesBulkInsertOperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      machineType: Schema.optional(Schema.String),
      perLocationStatus: Schema.optional(
        Schema.Record(Schema.String, BulkInsertOperationStatus),
      ),
    }),
  ).annotate({
    identifier: "InstancesBulkInsertOperationMetadata",
  }) as any as Schema.Schema<InstancesBulkInsertOperationMetadata>;

export interface SetAutoscalerLinkOperationMetadata {
  /** Map of zone to an ID of the zonal IGM belonging to the RMIG. */
  zoneToIgmIds?: Record<string, string>;
  /** List of zonal IGM IDs part of the RMIG. */
  zonalIgmIds?: Array<string>;
}

export const SetAutoscalerLinkOperationMetadata: Schema.Schema<SetAutoscalerLinkOperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      zoneToIgmIds: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      zonalIgmIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "SetAutoscalerLinkOperationMetadata",
  }) as any as Schema.Schema<SetAutoscalerLinkOperationMetadata>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() =>
  Schema.Struct({
    code: Schema.optional(Schema.Number),
    message: Schema.optional(Schema.String),
    details: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
  }),
).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface SetCommonInstanceMetadataOperationMetadataPerLocationOperationInfo {
  /** [Output Only] Status of the action, which can be one of the following: `PROPAGATING`, `PROPAGATED`, `ABANDONED`, `FAILED`, or `DONE`. */
  state?:
    | "UNSPECIFIED"
    | "PROPAGATING"
    | "PROPAGATED"
    | "ABANDONED"
    | "FAILED"
    | "DONE"
    | (string & {});
  /** [Output Only] If state is `ABANDONED` or `FAILED`, this field is populated. */
  error?: Status;
}

export const SetCommonInstanceMetadataOperationMetadataPerLocationOperationInfo: Schema.Schema<SetCommonInstanceMetadataOperationMetadataPerLocationOperationInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      error: Schema.optional(Status),
    }),
  ).annotate({
    identifier:
      "SetCommonInstanceMetadataOperationMetadataPerLocationOperationInfo",
  }) as any as Schema.Schema<SetCommonInstanceMetadataOperationMetadataPerLocationOperationInfo>;

export interface SetCommonInstanceMetadataOperationMetadata {
  /** [Output Only] The client operation id. */
  clientOperationId?: string;
  /** [Output Only] Status information per location (location name is key). Example key: zones/us-central1-a */
  perLocationOperations?: Record<
    string,
    SetCommonInstanceMetadataOperationMetadataPerLocationOperationInfo
  >;
}

export const SetCommonInstanceMetadataOperationMetadata: Schema.Schema<SetCommonInstanceMetadataOperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      clientOperationId: Schema.optional(Schema.String),
      perLocationOperations: Schema.optional(
        Schema.Record(
          Schema.String,
          SetCommonInstanceMetadataOperationMetadataPerLocationOperationInfo,
        ),
      ),
    }),
  ).annotate({
    identifier: "SetCommonInstanceMetadataOperationMetadata",
  }) as any as Schema.Schema<SetCommonInstanceMetadataOperationMetadata>;

export interface FirewallPolicyRuleOperationMetadata {
  /** The priority allocated for the firewall policy rule if query parameters specified minPriority/maxPriority. */
  allocatedPriority?: number;
}

export const FirewallPolicyRuleOperationMetadata: Schema.Schema<FirewallPolicyRuleOperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      allocatedPriority: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "FirewallPolicyRuleOperationMetadata",
  }) as any as Schema.Schema<FirewallPolicyRuleOperationMetadata>;

export interface Operation {
  /** [Output Only] The time that this operation was started by the server. This value is in RFC3339 text format. */
  startTime?: string;
  instancesBulkInsertOperationMetadata?: InstancesBulkInsertOperationMetadata;
  /** [Output Only] The status of the operation, which can be one of the following: `PENDING`, `RUNNING`, or `DONE`. */
  status?: "PENDING" | "RUNNING" | "DONE" | (string & {});
  /** [Output Only] An optional progress indicator that ranges from 0 to 100. There is no requirement that this be linear or support any granularity of operations. This should not be used to guess when the operation will be complete. This number should monotonically increase as the operation progresses. */
  progress?: number;
  /** [Output Only] The URL of the resource that the operation modifies. For operations related to creating a snapshot, this points to the disk that the snapshot was created from. */
  targetLink?: string;
  /** [Output Only] User who requested the operation, for example: `user@example.com` or `alice_smith_identifier (global/workforcePools/example-com-us-employees)`. */
  user?: string;
  /** [Output Only] The time that this operation was completed. This value is in RFC3339 text format. */
  endTime?: string;
  /** [Output Only] The value of `requestId` if you provided it in the request. Not present otherwise. */
  clientOperationId?: string;
  /** [Output Only] Name of the operation. */
  name?: string;
  /** [Output Only] The URL of the zone where the operation resides. Only applicable when performing per-zone operations. */
  zone?: string;
  /** [Output Only] If the operation fails, this field contains the HTTP error status code that was returned. For example, a `404` means the resource was not found. */
  httpErrorStatusCode?: number;
  /** [Output Only] The type of operation, such as `insert`, `update`, or `delete`, and so on. */
  operationType?: string;
  /** [Output Only] A textual description of the operation, which is set when the operation is created. */
  description?: string;
  /** [Output Only] If the operation fails, this field contains the HTTP error message that was returned, such as `NOT FOUND`. */
  httpErrorMessage?: string;
  /** [Output Only] The unique identifier for the operation. This identifier is defined by the server. */
  id?: string;
  /** [Output Only] The time that this operation was requested. This value is in RFC3339 text format. */
  insertTime?: string;
  /** [Output Only] An optional textual description of the current status of the operation. */
  statusMessage?: string;
  /** Output only. [Output Only] Type of the resource. Always `compute#operation` for Operation resources. */
  kind?: string;
  /** Output only. [Output Only] An ID that represents a group of operations, such as when a group of operations results from a `bulkInsert` API request. */
  operationGroupId?: string;
  /** [Deprecated] This field is deprecated. */
  creationTimestamp?: string;
  /** [Output Only] The unique target ID, which identifies a specific incarnation of the target resource. */
  targetId?: string;
  /** This field is used internally by the Autoscaler team and should not be promoted to "alpha/beta/v1". */
  setAutoscalerLinkOperationMetadata?: SetAutoscalerLinkOperationMetadata;
  /** Output only. [Output Only] If the operation is for projects.setCommonInstanceMetadata, this field will contain information on all underlying zonal actions and their state. */
  setCommonInstanceMetadataOperationMetadata?: SetCommonInstanceMetadataOperationMetadata;
  /** [Output Only] If errors are generated during processing of the operation, this field will be populated. */
  error?: {
    errors?: Array<{
      errorDetails?: Array<{
        errorInfo?: ErrorInfo;
        help?: Help;
        quotaInfo?: QuotaExceededInfo;
        localizedMessage?: LocalizedMessage;
      }>;
      debugInfo?: DebugInfo;
      location?: string;
      message?: string;
      arguments?: Array<string>;
      code?: string;
    }>;
  };
  firewallPolicyRuleOperationMetadata?: FirewallPolicyRuleOperationMetadata;
  /** [Output Only] If warning messages are generated during processing of the operation, this field will be populated. */
  warnings?: Array<{
    data?: Array<{ value?: string; key?: string }>;
    message?: string;
    code?:
      | "DEPRECATED_RESOURCE_USED"
      | "NO_RESULTS_ON_PAGE"
      | "UNREACHABLE"
      | "NEXT_HOP_ADDRESS_NOT_ASSIGNED"
      | "NEXT_HOP_INSTANCE_NOT_FOUND"
      | "NEXT_HOP_INSTANCE_NOT_ON_NETWORK"
      | "NEXT_HOP_CANNOT_IP_FORWARD"
      | "NEXT_HOP_NOT_RUNNING"
      | "INJECTED_KERNELS_DEPRECATED"
      | "REQUIRED_TOS_AGREEMENT"
      | "DISK_SIZE_LARGER_THAN_IMAGE_SIZE"
      | "RESOURCE_NOT_DELETED"
      | "SINGLE_INSTANCE_PROPERTY_TEMPLATE"
      | "NOT_CRITICAL_ERROR"
      | "CLEANUP_FAILED"
      | "FIELD_VALUE_OVERRIDEN"
      | "RESOURCE_IN_USE_BY_OTHER_RESOURCE_WARNING"
      | "NETWORK_ENDPOINT_NOT_DETACHED"
      | "PAGE_MISSING_RESULTS"
      | "SSL_POLICY_ENABLED_FEATURES_NOT_FETCHED"
      | "RESOURCE_NOT_FOUND_WARNING"
      | "MISSING_TYPE_DEPENDENCY"
      | "EXTERNAL_API_WARNING"
      | "SCHEMA_VALIDATION_IGNORED"
      | "UNDECLARED_PROPERTIES"
      | "EXPERIMENTAL_TYPE_USED"
      | "DEPRECATED_TYPE_USED"
      | "PARTIAL_SUCCESS"
      | "LARGE_DEPLOYMENT_WARNING"
      | "NEXT_HOP_INSTANCE_HAS_NO_IPV6_INTERFACE"
      | "INVALID_HEALTH_CHECK_FOR_DYNAMIC_WIEGHTED_LB"
      | "LIST_OVERHEAD_QUOTA_EXCEED"
      | "QUOTA_INFO_UNAVAILABLE"
      | "RESOURCE_USES_GLOBAL_DNS"
      | "RATE_LIMIT_EXCEEDED"
      | "UPCOMING_MAINTENANCES_UNAVAILABLE"
      | "RESERVED_ENTRY_136"
      | "RESERVED_ENTRY_139"
      | "RESERVED_ENTRY_141"
      | "RESERVED_ENTRY_142"
      | "RESERVED_ENTRY_143"
      | (string & {});
  }>;
  /** [Output Only] The URL of the region where the operation resides. Only applicable when performing regional operations. */
  region?: string;
  /** [Output Only] Server-defined URL for the resource. */
  selfLink?: string;
  /** Output only. [Output Only] Server-defined URL for this resource with the resource id. */
  selfLinkWithId?: string;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() =>
  Schema.Struct({
    startTime: Schema.optional(Schema.String),
    instancesBulkInsertOperationMetadata: Schema.optional(
      InstancesBulkInsertOperationMetadata,
    ),
    status: Schema.optional(Schema.String),
    progress: Schema.optional(Schema.Number),
    targetLink: Schema.optional(Schema.String),
    user: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    clientOperationId: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    zone: Schema.optional(Schema.String),
    httpErrorStatusCode: Schema.optional(Schema.Number),
    operationType: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    httpErrorMessage: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    insertTime: Schema.optional(Schema.String),
    statusMessage: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    operationGroupId: Schema.optional(Schema.String),
    creationTimestamp: Schema.optional(Schema.String),
    targetId: Schema.optional(Schema.String),
    setAutoscalerLinkOperationMetadata: Schema.optional(
      SetAutoscalerLinkOperationMetadata,
    ),
    setCommonInstanceMetadataOperationMetadata: Schema.optional(
      SetCommonInstanceMetadataOperationMetadata,
    ),
    error: Schema.optional(
      Schema.Struct({
        errors: Schema.optional(
          Schema.Array(
            Schema.Struct({
              errorDetails: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    errorInfo: Schema.optional(ErrorInfo),
                    help: Schema.optional(Help),
                    quotaInfo: Schema.optional(QuotaExceededInfo),
                    localizedMessage: Schema.optional(LocalizedMessage),
                  }),
                ),
              ),
              debugInfo: Schema.optional(DebugInfo),
              location: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              arguments: Schema.optional(Schema.Array(Schema.String)),
              code: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    firewallPolicyRuleOperationMetadata: Schema.optional(
      FirewallPolicyRuleOperationMetadata,
    ),
    warnings: Schema.optional(
      Schema.Array(
        Schema.Struct({
          data: Schema.optional(
            Schema.Array(
              Schema.Struct({
                value: Schema.optional(Schema.String),
                key: Schema.optional(Schema.String),
              }),
            ),
          ),
          message: Schema.optional(Schema.String),
          code: Schema.optional(Schema.String),
        }),
      ),
    ),
    region: Schema.optional(Schema.String),
    selfLink: Schema.optional(Schema.String),
    selfLinkWithId: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface MethodMap {
  /** The action identifier for the delete method to be used for this collection */
  delete?: string;
  /** The action identifier for the create method to be used for this collection */
  create?: string;
  /** The action identifier for the setIamPolicy method to be used for this collection */
  setIamPolicy?: string;
  /** The action identifier for the update method to be used for this collection */
  update?: string;
  /** The action identifier for the get method to be used for this collection */
  get?: string;
}

export const MethodMap: Schema.Schema<MethodMap> = Schema.suspend(() =>
  Schema.Struct({
    delete: Schema.optional(Schema.String),
    create: Schema.optional(Schema.String),
    setIamPolicy: Schema.optional(Schema.String),
    update: Schema.optional(Schema.String),
    get: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "MethodMap" }) as any as Schema.Schema<MethodMap>;

export interface Diagnostic {
  /** JsonPath expression on the resource that if non empty, indicates that this field needs to be extracted as a diagnostic. */
  field?: string;
  /** Level to record this diagnostic. */
  level?: "UNKNOWN" | "INFORMATION" | "WARNING" | "ERROR" | (string & {});
}

export const Diagnostic: Schema.Schema<Diagnostic> = Schema.suspend(() =>
  Schema.Struct({
    field: Schema.optional(Schema.String),
    level: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Diagnostic" }) as any as Schema.Schema<Diagnostic>;

export interface PollingOptions {
  /** JsonPath expression that determines if the request is completed. */
  finishCondition?: string;
  /** JsonPath expression that evaluates to string, it indicates where to poll. */
  pollingLink?: string;
  /** JsonPath expression, after polling is completed, indicates where to fetch the resource. */
  targetLink?: string;
  /** JsonPath expression that determines if the request failed. */
  failCondition?: string;
  /** An array of diagnostics to be collected by Deployment Manager, these diagnostics will be displayed to the user. */
  diagnostics?: Array<Diagnostic>;
}

export const PollingOptions: Schema.Schema<PollingOptions> = Schema.suspend(
  () =>
    Schema.Struct({
      finishCondition: Schema.optional(Schema.String),
      pollingLink: Schema.optional(Schema.String),
      targetLink: Schema.optional(Schema.String),
      failCondition: Schema.optional(Schema.String),
      diagnostics: Schema.optional(Schema.Array(Diagnostic)),
    }),
).annotate({
  identifier: "PollingOptions",
}) as any as Schema.Schema<PollingOptions>;

export interface AsyncOptions {
  /** Method regex where this policy will apply. */
  methodMatch?: string;
  /** Deployment manager will poll instances for this API resource setting a RUNNING state, and blocking until polling conditions tell whether the resource is completed or failed. */
  pollingOptions?: PollingOptions;
}

export const AsyncOptions: Schema.Schema<AsyncOptions> = Schema.suspend(() =>
  Schema.Struct({
    methodMatch: Schema.optional(Schema.String),
    pollingOptions: Schema.optional(PollingOptions),
  }),
).annotate({
  identifier: "AsyncOptions",
}) as any as Schema.Schema<AsyncOptions>;

export interface InputMapping {
  /** Regex to evaluate on method to decide if input applies. */
  methodMatch?: string;
  /** A jsonPath expression to select an element. */
  value?: string;
  /** The name of the field that is going to be injected. */
  fieldName?: string;
  /** The location where this mapping applies. */
  location?: "UNKNOWN" | "PATH" | "QUERY" | "BODY" | "HEADER" | (string & {});
}

export const InputMapping: Schema.Schema<InputMapping> = Schema.suspend(() =>
  Schema.Struct({
    methodMatch: Schema.optional(Schema.String),
    value: Schema.optional(Schema.String),
    fieldName: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "InputMapping",
}) as any as Schema.Schema<InputMapping>;

export interface ValidationOptions {
  /** Customize how deployment manager will validate the resource against schema errors. */
  schemaValidation?:
    | "UNKNOWN"
    | "IGNORE"
    | "IGNORE_WITH_WARNINGS"
    | "FAIL"
    | (string & {});
  /** Specify what to do with extra properties when executing a request. */
  undeclaredProperties?:
    | "UNKNOWN"
    | "INCLUDE"
    | "IGNORE"
    | "INCLUDE_WITH_WARNINGS"
    | "IGNORE_WITH_WARNINGS"
    | "FAIL"
    | (string & {});
}

export const ValidationOptions: Schema.Schema<ValidationOptions> =
  Schema.suspend(() =>
    Schema.Struct({
      schemaValidation: Schema.optional(Schema.String),
      undeclaredProperties: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ValidationOptions",
  }) as any as Schema.Schema<ValidationOptions>;

export interface Options {
  /** The json path to the field in the resource JSON body into which the resource name should be mapped. Leaving this empty indicates that there should be no mapping performed. */
  nameProperty?: string;
  /** Options regarding how to thread async requests. */
  asyncOptions?: Array<AsyncOptions>;
  /** The mappings that apply for requests. */
  inputMappings?: Array<InputMapping>;
  /** Options for how to validate and process properties on a resource. */
  validationOptions?: ValidationOptions;
}

export const Options: Schema.Schema<Options> = Schema.suspend(() =>
  Schema.Struct({
    nameProperty: Schema.optional(Schema.String),
    asyncOptions: Schema.optional(Schema.Array(AsyncOptions)),
    inputMappings: Schema.optional(Schema.Array(InputMapping)),
    validationOptions: Schema.optional(ValidationOptions),
  }),
).annotate({ identifier: "Options" }) as any as Schema.Schema<Options>;

export interface CollectionOverride {
  /** The collection that identifies this resource within its service. */
  collection?: string;
  /** Custom verb method mappings to support unordered list API mappings. */
  methodMap?: MethodMap;
  /** The options to apply to this resource-level override */
  options?: Options;
}

export const CollectionOverride: Schema.Schema<CollectionOverride> =
  Schema.suspend(() =>
    Schema.Struct({
      collection: Schema.optional(Schema.String),
      methodMap: Schema.optional(MethodMap),
      options: Schema.optional(Options),
    }),
  ).annotate({
    identifier: "CollectionOverride",
  }) as any as Schema.Schema<CollectionOverride>;

export interface TypeProviderLabelEntry {
  /** Value of the label */
  value?: string;
  /** Key of the label */
  key?: string;
}

export const TypeProviderLabelEntry: Schema.Schema<TypeProviderLabelEntry> =
  Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      key: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TypeProviderLabelEntry",
  }) as any as Schema.Schema<TypeProviderLabelEntry>;

export interface TypeProvider {
  /** Descriptor Url for the this type provider. */
  descriptorUrl?: string;
  /** Output only. The Operation that most recently ran, or is currently running, on this type provider. */
  operation?: Operation;
  /** List of up to 2 custom certificate authority roots to use for TLS authentication when making calls on behalf of this type provider. If set, TLS authentication will exclusively use these roots instead of relying on publicly trusted certificate authorities when validating TLS certificate authenticity. The certificates must be in base64-encoded PEM format. The maximum size of each certificate must not exceed 10KB. */
  customCertificateAuthorityRoots?: Array<string>;
  /** Allows resource handling overrides for specific collections */
  collectionOverrides?: Array<CollectionOverride>;
  /** Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. */
  name?: string;
  /** Options to apply when handling any resources in this service. */
  options?: Options;
  /** Map of One Platform labels; provided by the client when the resource is created or updated. Specifically: Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?` Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?` */
  labels?: Array<TypeProviderLabelEntry>;
  /** Output only. Creation timestamp in RFC3339 text format. */
  insertTime?: string;
  /** An optional textual description of the resource; provided by the client when the resource is created. */
  description?: string;
  /** Output only. Self link for the type provider. */
  selfLink?: string;
  /** Output only. Unique identifier for the resource defined by the server. */
  id?: string;
  /** Credential used when interacting with this type. */
  credential?: Credential;
}

export const TypeProvider: Schema.Schema<TypeProvider> = Schema.suspend(() =>
  Schema.Struct({
    descriptorUrl: Schema.optional(Schema.String),
    operation: Schema.optional(Operation),
    customCertificateAuthorityRoots: Schema.optional(
      Schema.Array(Schema.String),
    ),
    collectionOverrides: Schema.optional(Schema.Array(CollectionOverride)),
    name: Schema.optional(Schema.String),
    options: Schema.optional(Options),
    labels: Schema.optional(Schema.Array(TypeProviderLabelEntry)),
    insertTime: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    selfLink: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    credential: Schema.optional(Credential),
  }),
).annotate({
  identifier: "TypeProvider",
}) as any as Schema.Schema<TypeProvider>;

export interface BaseType {
  /** Allows resource handling overrides for specific collections */
  collectionOverrides?: Array<CollectionOverride>;
  /** Credential used when interacting with this type. */
  credential?: Credential;
  /** Options to apply when handling any resources in this service. */
  options?: Options;
  /** Descriptor Url for the this type. */
  descriptorUrl?: string;
}

export const BaseType: Schema.Schema<BaseType> = Schema.suspend(() =>
  Schema.Struct({
    collectionOverrides: Schema.optional(Schema.Array(CollectionOverride)),
    credential: Schema.optional(Credential),
    options: Schema.optional(Options),
    descriptorUrl: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "BaseType" }) as any as Schema.Schema<BaseType>;

export interface TypeLabelEntry {
  /** Key of the label */
  key?: string;
  /** Value of the label */
  value?: string;
}

export const TypeLabelEntry: Schema.Schema<TypeLabelEntry> = Schema.suspend(
  () =>
    Schema.Struct({
      key: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "TypeLabelEntry",
}) as any as Schema.Schema<TypeLabelEntry>;

export interface Type {
  id?: string;
  /** Output only. The Operation that most recently ran, or is currently running, on this type. */
  operation?: Operation;
  /** Output only. Server defined URL for the resource. */
  selfLink?: string;
  /** An optional textual description of the resource; provided by the client when the resource is created. */
  description?: string;
  /** Output only. Creation timestamp in RFC3339 text format. */
  insertTime?: string;
  /** Name of the type. */
  name?: string;
  /** Base Type (configurable service) that backs this Type. */
  base?: BaseType;
  /** Map of One Platform labels; provided by the client when the resource is created or updated. Specifically: Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?` Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. */
  labels?: Array<TypeLabelEntry>;
}

export const Type: Schema.Schema<Type> = Schema.suspend(() =>
  Schema.Struct({
    id: Schema.optional(Schema.String),
    operation: Schema.optional(Operation),
    selfLink: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    insertTime: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    base: Schema.optional(BaseType),
    labels: Schema.optional(Schema.Array(TypeLabelEntry)),
  }),
).annotate({ identifier: "Type" }) as any as Schema.Schema<Type>;

export interface TypesListResponse {
  /** Output only. A list of resource types supported by Deployment Manager. */
  types?: Array<Type>;
  /** A token used to continue a truncated list request. */
  nextPageToken?: string;
}

export const TypesListResponse: Schema.Schema<TypesListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      types: Schema.optional(Schema.Array(Type)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TypesListResponse",
  }) as any as Schema.Schema<TypesListResponse>;

export interface CompositeTypeLabelEntry {
  /** Key of the label */
  key?: string;
  /** Value of the label */
  value?: string;
}

export const CompositeTypeLabelEntry: Schema.Schema<CompositeTypeLabelEntry> =
  Schema.suspend(() =>
    Schema.Struct({
      key: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CompositeTypeLabelEntry",
  }) as any as Schema.Schema<CompositeTypeLabelEntry>;

export interface ImportFile {
  /** The name of the file. */
  name?: string;
  /** The contents of the file. */
  content?: string;
}

export const ImportFile: Schema.Schema<ImportFile> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    content: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "ImportFile" }) as any as Schema.Schema<ImportFile>;

export interface TemplateContents {
  /** Which interpreter (python or jinja) should be used during expansion. */
  interpreter?: "UNKNOWN_INTERPRETER" | "PYTHON" | "JINJA" | (string & {});
  /** The contents of the main template file. */
  template?: string;
  /** The contents of the template schema. */
  schema?: string;
  /** Import files referenced by the main template. */
  imports?: Array<ImportFile>;
  /** The filename of the mainTemplate */
  mainTemplate?: string;
}

export const TemplateContents: Schema.Schema<TemplateContents> = Schema.suspend(
  () =>
    Schema.Struct({
      interpreter: Schema.optional(Schema.String),
      template: Schema.optional(Schema.String),
      schema: Schema.optional(Schema.String),
      imports: Schema.optional(Schema.Array(ImportFile)),
      mainTemplate: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "TemplateContents",
}) as any as Schema.Schema<TemplateContents>;

export interface CompositeType {
  /** Map of labels; provided by the client when the resource is created or updated. Specifically: Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?` Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. */
  labels?: Array<CompositeTypeLabelEntry>;
  /** Output only. Server defined URL for the resource. */
  selfLink?: string;
  status?:
    | "UNKNOWN_STATUS"
    | "DEPRECATED"
    | "EXPERIMENTAL"
    | "SUPPORTED"
    | (string & {});
  /** Files for the template type. */
  templateContents?: TemplateContents;
  /** Name of the composite type, must follow the expression: `[a-z]([-a-z0-9_.]{0,61}[a-z0-9])?`. */
  name?: string;
  /** An optional textual description of the resource; provided by the client when the resource is created. */
  description?: string;
  /** Output only. The Operation that most recently ran, or is currently running, on this composite type. */
  operation?: Operation;
  /** Output only. Creation timestamp in RFC3339 text format. */
  insertTime?: string;
  id?: string;
}

export const CompositeType: Schema.Schema<CompositeType> = Schema.suspend(() =>
  Schema.Struct({
    labels: Schema.optional(Schema.Array(CompositeTypeLabelEntry)),
    selfLink: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    templateContents: Schema.optional(TemplateContents),
    name: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    operation: Schema.optional(Operation),
    insertTime: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "CompositeType",
}) as any as Schema.Schema<CompositeType>;

export interface CompositeTypesListResponse {
  /** Output only. A list of resource composite types supported by Deployment Manager. */
  compositeTypes?: Array<CompositeType>;
  /** A token used to continue a truncated list request. */
  nextPageToken?: string;
}

export const CompositeTypesListResponse: Schema.Schema<CompositeTypesListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      compositeTypes: Schema.optional(Schema.Array(CompositeType)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CompositeTypesListResponse",
  }) as any as Schema.Schema<CompositeTypesListResponse>;

export interface TypeInfo {
  /** The description of the type. */
  description?: string;
  /** The title on the API descriptor URL provided. */
  title?: string;
  /** The base type or composite type name. */
  name?: string;
  /** Output only. Type of the output. Always `deploymentManager#TypeInfo` for TypeInfo. */
  kind?: string;
  /** For base types with a collection, we return a schema and documentation link For template types, we return only a schema */
  schema?: TypeInfoSchemaInfo;
  /** For swagger 2.0 externalDocs field will be used. For swagger 1.2 this field will be empty. */
  documentationLink?: string;
  /** Output only. Self link for the type provider. */
  selfLink?: string;
}

export const TypeInfo: Schema.Schema<TypeInfo> = Schema.suspend(() =>
  Schema.Struct({
    description: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    schema: Schema.optional(TypeInfoSchemaInfo),
    documentationLink: Schema.optional(Schema.String),
    selfLink: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "TypeInfo" }) as any as Schema.Schema<TypeInfo>;

export interface DeploymentUpdateLabelEntry {
  /** Key of the label */
  key?: string;
  /** Value of the label */
  value?: string;
}

export const DeploymentUpdateLabelEntry: Schema.Schema<DeploymentUpdateLabelEntry> =
  Schema.suspend(() =>
    Schema.Struct({
      key: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeploymentUpdateLabelEntry",
  }) as any as Schema.Schema<DeploymentUpdateLabelEntry>;

export interface DeploymentUpdate {
  /** Output only. URL of the manifest representing the update configuration of this deployment. */
  manifest?: string;
  /** Map of One Platform labels; provided by the client when the resource is created or updated. Specifically: Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?` Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. */
  labels?: Array<DeploymentUpdateLabelEntry>;
  /** Output only. The user-provided default credential to use when deploying this preview. */
  credential?: Credential;
  /** Output only. An optional user-provided description of the deployment after the current update has been applied. */
  description?: string;
}

export const DeploymentUpdate: Schema.Schema<DeploymentUpdate> = Schema.suspend(
  () =>
    Schema.Struct({
      manifest: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Array(DeploymentUpdateLabelEntry)),
      credential: Schema.optional(Credential),
      description: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "DeploymentUpdate",
}) as any as Schema.Schema<DeploymentUpdate>;

export interface Resource {
  /** Output only. URL of the manifest representing the current configuration of this resource. */
  manifest?: string;
  /** Output only. The URL of the actual resource. */
  url?: string;
  /** Output only. In case this is an action, it will show the runtimePolicies on which this action will run in the deployment */
  runtimePolicies?: Array<
    "CREATE" | "DELETE" | "UPDATE_ON_CHANGE" | "UPDATE_ALWAYS" | (string & {})
  >;
  /** Output only. If warning messages are generated during processing of this resource, this field will be populated. */
  warnings?: Array<{
    data?: Array<{ value?: string; key?: string }>;
    code?:
      | "DEPRECATED_RESOURCE_USED"
      | "NO_RESULTS_ON_PAGE"
      | "UNREACHABLE"
      | "NEXT_HOP_ADDRESS_NOT_ASSIGNED"
      | "NEXT_HOP_INSTANCE_NOT_FOUND"
      | "NEXT_HOP_INSTANCE_NOT_ON_NETWORK"
      | "NEXT_HOP_CANNOT_IP_FORWARD"
      | "NEXT_HOP_NOT_RUNNING"
      | "INJECTED_KERNELS_DEPRECATED"
      | "REQUIRED_TOS_AGREEMENT"
      | "DISK_SIZE_LARGER_THAN_IMAGE_SIZE"
      | "RESOURCE_NOT_DELETED"
      | "SINGLE_INSTANCE_PROPERTY_TEMPLATE"
      | "NOT_CRITICAL_ERROR"
      | "CLEANUP_FAILED"
      | "FIELD_VALUE_OVERRIDEN"
      | "RESOURCE_IN_USE_BY_OTHER_RESOURCE_WARNING"
      | "NETWORK_ENDPOINT_NOT_DETACHED"
      | "PAGE_MISSING_RESULTS"
      | "SSL_POLICY_ENABLED_FEATURES_NOT_FETCHED"
      | "RESOURCE_NOT_FOUND_WARNING"
      | "MISSING_TYPE_DEPENDENCY"
      | "EXTERNAL_API_WARNING"
      | "SCHEMA_VALIDATION_IGNORED"
      | "UNDECLARED_PROPERTIES"
      | "EXPERIMENTAL_TYPE_USED"
      | "DEPRECATED_TYPE_USED"
      | "PARTIAL_SUCCESS"
      | "LARGE_DEPLOYMENT_WARNING"
      | "NEXT_HOP_INSTANCE_HAS_NO_IPV6_INTERFACE"
      | "INVALID_HEALTH_CHECK_FOR_DYNAMIC_WIEGHTED_LB"
      | "LIST_OVERHEAD_QUOTA_EXCEED"
      | "QUOTA_INFO_UNAVAILABLE"
      | "RESOURCE_USES_GLOBAL_DNS"
      | "RATE_LIMIT_EXCEEDED"
      | "UPCOMING_MAINTENANCES_UNAVAILABLE"
      | "RESERVED_ENTRY_136"
      | "RESERVED_ENTRY_139"
      | "RESERVED_ENTRY_141"
      | "RESERVED_ENTRY_142"
      | "RESERVED_ENTRY_143"
      | (string & {});
    message?: string;
  }>;
  /** Output only. The name of the resource as it appears in the YAML config. */
  name?: string;
  /** Output only. Creation timestamp in RFC3339 text format. */
  insertTime?: string;
  /** Output only. The current properties of the resource before any references have been filled in. Returned as serialized YAML. */
  properties?: string;
  /** The Access Control Policy set on this resource. */
  accessControl?: ResourceAccessControl;
  /** Output only. Update timestamp in RFC3339 text format. */
  updateTime?: string;
  /** Output only. The last used credential that successfully created/updated the resource. */
  lastUsedCredential?: Credential;
  id?: string;
  /** Output only. The evaluated properties of the resource with references expanded. Returned as serialized YAML. */
  finalProperties?: string;
  /** Output only. If Deployment Manager is currently updating or previewing an update to this resource, the updated configuration appears here. */
  update?: ResourceUpdate;
  /** Output only. The type of the resource, for example `compute.v1.instance`, or `cloudfunctions.v1beta1.function`. */
  type?: string;
}

export const Resource: Schema.Schema<Resource> = Schema.suspend(() =>
  Schema.Struct({
    manifest: Schema.optional(Schema.String),
    url: Schema.optional(Schema.String),
    runtimePolicies: Schema.optional(Schema.Array(Schema.String)),
    warnings: Schema.optional(
      Schema.Array(
        Schema.Struct({
          data: Schema.optional(
            Schema.Array(
              Schema.Struct({
                value: Schema.optional(Schema.String),
                key: Schema.optional(Schema.String),
              }),
            ),
          ),
          code: Schema.optional(Schema.String),
          message: Schema.optional(Schema.String),
        }),
      ),
    ),
    name: Schema.optional(Schema.String),
    insertTime: Schema.optional(Schema.String),
    properties: Schema.optional(Schema.String),
    accessControl: Schema.optional(ResourceAccessControl),
    updateTime: Schema.optional(Schema.String),
    lastUsedCredential: Schema.optional(Credential),
    id: Schema.optional(Schema.String),
    finalProperties: Schema.optional(Schema.String),
    update: Schema.optional(ResourceUpdate),
    type: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Resource" }) as any as Schema.Schema<Resource>;

export interface ResourcesListResponse {
  /** A token used to continue a truncated list request. */
  nextPageToken?: string;
  /** Resources contained in this list response. */
  resources?: Array<Resource>;
}

export const ResourcesListResponse: Schema.Schema<ResourcesListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      resources: Schema.optional(Schema.Array(Resource)),
    }),
  ).annotate({
    identifier: "ResourcesListResponse",
  }) as any as Schema.Schema<ResourcesListResponse>;

export interface DeploymentLabelEntry {
  /** Value of the label */
  value?: string;
  /** Key of the label */
  key?: string;
}

export const DeploymentLabelEntry: Schema.Schema<DeploymentLabelEntry> =
  Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      key: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeploymentLabelEntry",
  }) as any as Schema.Schema<DeploymentLabelEntry>;

export interface DeploymentOutputEntry {
  /** Key of the output */
  key?: string;
  /** Value of the label */
  value?: string;
}

export const DeploymentOutputEntry: Schema.Schema<DeploymentOutputEntry> =
  Schema.suspend(() =>
    Schema.Struct({
      key: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeploymentOutputEntry",
  }) as any as Schema.Schema<DeploymentOutputEntry>;

export interface ConfigFile {
  /** The contents of the file. */
  content?: string;
}

export const ConfigFile: Schema.Schema<ConfigFile> = Schema.suspend(() =>
  Schema.Struct({
    content: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "ConfigFile" }) as any as Schema.Schema<ConfigFile>;

export interface TargetConfiguration {
  /** Specifies any files to import for this configuration. This can be used to import templates or other files. For example, you might import a text file in order to use the file in a template. */
  imports?: Array<ImportFile>;
  /** The configuration to use for this deployment. */
  config?: ConfigFile;
}

export const TargetConfiguration: Schema.Schema<TargetConfiguration> =
  Schema.suspend(() =>
    Schema.Struct({
      imports: Schema.optional(Schema.Array(ImportFile)),
      config: Schema.optional(ConfigFile),
    }),
  ).annotate({
    identifier: "TargetConfiguration",
  }) as any as Schema.Schema<TargetConfiguration>;

export interface Deployment {
  /** Provides a fingerprint to use in requests to modify a deployment, such as `update()`, `stop()`, and `cancelPreview()` requests. A fingerprint is a randomly generated value that must be provided with `update()`, `stop()`, and `cancelPreview()` requests to perform optimistic locking. This ensures optimistic concurrency so that only one request happens at a time. The fingerprint is initially generated by Deployment Manager and changes after every request to modify data. To get the latest fingerprint value, perform a `get()` request to a deployment. */
  fingerprint?: string;
  id?: string;
  /** Output only. Update timestamp in RFC3339 text format. */
  updateTime?: string;
  /** Output only. If Deployment Manager is currently updating or previewing an update to this deployment, the updated configuration appears here. */
  update?: DeploymentUpdate;
  /** Output only. The Operation that most recently ran, or is currently running, on this deployment. */
  operation?: Operation;
  /** Output only. URL of the manifest representing the last manifest that was successfully deployed. If no manifest has been successfully deployed, this field will be absent. */
  manifest?: string;
  /** Output only. Creation timestamp in RFC3339 text format. */
  insertTime?: string;
  /** User provided default credential for the deployment. */
  credential?: Credential;
  /** Map of One Platform labels; provided by the client when the resource is created or updated. Specifically: Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?` Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. */
  labels?: Array<DeploymentLabelEntry>;
  /** Output only. List of outputs from the last manifest that deployed successfully. */
  outputs?: Array<DeploymentOutputEntry>;
  /** [Input Only] The parameters that define your deployment, including the deployment configuration and relevant templates. */
  target?: TargetConfiguration;
  /** An optional user-provided description of the deployment. */
  description?: string;
  /** Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. */
  name?: string;
  /** Output only. Server defined URL for the resource. */
  selfLink?: string;
}

export const Deployment: Schema.Schema<Deployment> = Schema.suspend(() =>
  Schema.Struct({
    fingerprint: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    update: Schema.optional(DeploymentUpdate),
    operation: Schema.optional(Operation),
    manifest: Schema.optional(Schema.String),
    insertTime: Schema.optional(Schema.String),
    credential: Schema.optional(Credential),
    labels: Schema.optional(Schema.Array(DeploymentLabelEntry)),
    outputs: Schema.optional(Schema.Array(DeploymentOutputEntry)),
    target: Schema.optional(TargetConfiguration),
    description: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    selfLink: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Deployment" }) as any as Schema.Schema<Deployment>;

export interface DeploymentsListResponse {
  /** Output only. The deployments contained in this response. */
  deployments?: Array<Deployment>;
  /** Output only. A token used to continue a truncated list request. */
  nextPageToken?: string;
}

export const DeploymentsListResponse: Schema.Schema<DeploymentsListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      deployments: Schema.optional(Schema.Array(Deployment)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeploymentsListResponse",
  }) as any as Schema.Schema<DeploymentsListResponse>;

export interface DeploymentsCancelPreviewRequest {
  /** Specifies a fingerprint for `cancelPreview()` requests. A fingerprint is a randomly generated value that must be provided in `cancelPreview()` requests to perform optimistic locking. This ensures optimistic concurrency so that the deployment does not have conflicting requests (e.g. if someone attempts to make a new update request while another user attempts to cancel a preview, this would prevent one of the requests). The fingerprint is initially generated by Deployment Manager and changes after every request to modify a deployment. To get the latest fingerprint value, perform a `get()` request on the deployment. */
  fingerprint?: string;
}

export const DeploymentsCancelPreviewRequest: Schema.Schema<DeploymentsCancelPreviewRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      fingerprint: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeploymentsCancelPreviewRequest",
  }) as any as Schema.Schema<DeploymentsCancelPreviewRequest>;

export interface DeploymentsStopRequest {
  /** Specifies a fingerprint for `stop()` requests. A fingerprint is a randomly generated value that must be provided in `stop()` requests to perform optimistic locking. This ensures optimistic concurrency so that the deployment does not have conflicting requests (e.g. if someone attempts to make a new update request while another user attempts to stop an ongoing update request, this would prevent a collision). The fingerprint is initially generated by Deployment Manager and changes after every request to modify a deployment. To get the latest fingerprint value, perform a `get()` request on the deployment. */
  fingerprint?: string;
}

export const DeploymentsStopRequest: Schema.Schema<DeploymentsStopRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      fingerprint: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DeploymentsStopRequest",
  }) as any as Schema.Schema<DeploymentsStopRequest>;

export interface TestPermissionsRequest {
  /** The set of permissions to check for the 'resource'. Permissions with wildcards (such as '*' or 'storage.*') are not allowed. */
  permissions?: Array<string>;
}

export const TestPermissionsRequest: Schema.Schema<TestPermissionsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestPermissionsRequest",
  }) as any as Schema.Schema<TestPermissionsRequest>;

export interface TypeProvidersListResponse {
  /** Output only. A list of resource type providers supported by Deployment Manager. */
  typeProviders?: Array<TypeProvider>;
  /** A token used to continue a truncated list request. */
  nextPageToken?: string;
}

export const TypeProvidersListResponse: Schema.Schema<TypeProvidersListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      typeProviders: Schema.optional(Schema.Array(TypeProvider)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TypeProvidersListResponse",
  }) as any as Schema.Schema<TypeProvidersListResponse>;

export interface OperationsListResponse {
  /** Output only. Operations contained in this list response. */
  operations?: Array<Operation>;
  /** Output only. A token used to continue a truncated list request. */
  nextPageToken?: string;
}

export const OperationsListResponse: Schema.Schema<OperationsListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      operations: Schema.optional(Schema.Array(Operation)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OperationsListResponse",
  }) as any as Schema.Schema<OperationsListResponse>;

export interface TypeProvidersListTypesResponse {
  /** Output only. A list of resource type info. */
  types?: Array<TypeInfo>;
  /** A token used to continue a truncated list request. */
  nextPageToken?: string;
}

export const TypeProvidersListTypesResponse: Schema.Schema<TypeProvidersListTypesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      types: Schema.optional(Schema.Array(TypeInfo)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TypeProvidersListTypesResponse",
  }) as any as Schema.Schema<TypeProvidersListTypesResponse>;

export interface Manifest {
  /** Output only. Self link for the manifest. */
  selfLink?: string;
  /** Output only. Creation timestamp in RFC3339 text format. */
  insertTime?: string;
  /** Output only. The YAML configuration for this manifest. */
  config?: ConfigFile;
  /** Output only. The computed size of the fully expanded manifest. */
  manifestSizeBytes?: string;
  /** Output only. The size limit for expanded manifests in the project. */
  manifestSizeLimitBytes?: string;
  /** Output only. The imported files for this manifest. */
  imports?: Array<ImportFile>;
  /** Output only. The YAML layout for this manifest. */
  layout?: string;
  /** Output only. The fully-expanded configuration file, including any templates and references. */
  expandedConfig?: string;
  id?: string;
  /** Output only. The name of the manifest. */
  name?: string;
}

export const Manifest: Schema.Schema<Manifest> = Schema.suspend(() =>
  Schema.Struct({
    selfLink: Schema.optional(Schema.String),
    insertTime: Schema.optional(Schema.String),
    config: Schema.optional(ConfigFile),
    manifestSizeBytes: Schema.optional(Schema.String),
    manifestSizeLimitBytes: Schema.optional(Schema.String),
    imports: Schema.optional(Schema.Array(ImportFile)),
    layout: Schema.optional(Schema.String),
    expandedConfig: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Manifest" }) as any as Schema.Schema<Manifest>;

export interface ManifestsListResponse {
  /** Output only. A token used to continue a truncated list request. */
  nextPageToken?: string;
  /** Output only. Manifests contained in this list response. */
  manifests?: Array<Manifest>;
}

export const ManifestsListResponse: Schema.Schema<ManifestsListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      manifests: Schema.optional(Schema.Array(Manifest)),
    }),
  ).annotate({
    identifier: "ManifestsListResponse",
  }) as any as Schema.Schema<ManifestsListResponse>;

export interface TestPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestPermissionsResponse: Schema.Schema<TestPermissionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestPermissionsResponse",
  }) as any as Schema.Schema<TestPermissionsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetResourcesRequest {
  "header.bypassBillingFilter"?: boolean;
  /** The project ID for this request. */
  project: string;
  /** The name of the resource for this request. */
  resource: string;
  /** The name of the deployment for this request. */
  deployment: string;
}

export const GetResourcesRequest = Schema.Struct({
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
  project: Schema.String.pipe(T.HttpPath("project")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
  deployment: Schema.String.pipe(T.HttpPath("deployment")),
}).pipe(
  T.Http({
    method: "GET",
    path: "deploymentmanager/alpha/projects/{project}/global/deployments/{deployment}/resources/{resource}",
  }),
  svc,
) as unknown as Schema.Schema<GetResourcesRequest>;

export type GetResourcesResponse = Resource;
export const GetResourcesResponse = Resource;

export type GetResourcesError = DefaultErrors;

/** Gets information about a single resource. */
export const getResources: API.OperationMethod<
  GetResourcesRequest,
  GetResourcesResponse,
  GetResourcesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetResourcesRequest,
  output: GetResourcesResponse,
  errors: [],
}));

export interface ListResourcesRequest {
  /** The name of the deployment for this request. */
  deployment: string;
  /** The project ID for this request. */
  project: string;
  /** A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: ``` labels.owner:* ``` You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ``` If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. */
  filter?: string;
  /** Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. */
  orderBy?: string;
  /** Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. */
  pageToken?: string;
  /** The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) */
  maxResults?: number;
}

export const ListResourcesRequest = Schema.Struct({
  deployment: Schema.String.pipe(T.HttpPath("deployment")),
  project: Schema.String.pipe(T.HttpPath("project")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
}).pipe(
  T.Http({
    method: "GET",
    path: "deploymentmanager/alpha/projects/{project}/global/deployments/{deployment}/resources",
  }),
  svc,
) as unknown as Schema.Schema<ListResourcesRequest>;

export type ListResourcesResponse = ResourcesListResponse;
export const ListResourcesResponse = ResourcesListResponse;

export type ListResourcesError = DefaultErrors;

/** Lists all resources in a given deployment. */
export const listResources: API.PaginatedOperationMethod<
  ListResourcesRequest,
  ListResourcesResponse,
  ListResourcesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListResourcesRequest,
  output: ListResourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListOperationsRequest {
  /** A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: ``` labels.owner:* ``` You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ``` If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. */
  filter?: string;
  /** Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. */
  orderBy?: string;
  /** The project ID for this request. */
  project: string;
  /** The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) */
  maxResults?: number;
  /** Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. */
  pageToken?: string;
}

export const ListOperationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  project: Schema.String.pipe(T.HttpPath("project")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "deploymentmanager/alpha/projects/{project}/global/operations",
  }),
  svc,
) as unknown as Schema.Schema<ListOperationsRequest>;

export type ListOperationsResponse = OperationsListResponse;
export const ListOperationsResponse = OperationsListResponse;

export type ListOperationsError = DefaultErrors;

/** Lists all operations for a project. */
export const listOperations: API.PaginatedOperationMethod<
  ListOperationsRequest,
  ListOperationsResponse,
  ListOperationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListOperationsRequest,
  output: ListOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetOperationsRequest {
  "header.bypassBillingFilter"?: boolean;
  /** The name of the operation for this request. */
  operation: string;
  /** The project ID for this request. */
  project: string;
}

export const GetOperationsRequest = Schema.Struct({
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
  operation: Schema.String.pipe(T.HttpPath("operation")),
  project: Schema.String.pipe(T.HttpPath("project")),
}).pipe(
  T.Http({
    method: "GET",
    path: "deploymentmanager/alpha/projects/{project}/global/operations/{operation}",
  }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = Operation;
export const GetOperationsResponse = Operation;

export type GetOperationsError = DefaultErrors;

/** Gets information about a specific operation. */
export const getOperations: API.OperationMethod<
  GetOperationsRequest,
  GetOperationsResponse,
  GetOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

export interface UpdateCompositeTypesRequest {
  /** The project ID for this request. */
  project: string;
  /** The name of the composite type for this request. */
  compositeType: string;
  "header.bypassBillingFilter"?: boolean;
  /** Request body */
  body?: CompositeType;
}

export const UpdateCompositeTypesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  compositeType: Schema.String.pipe(T.HttpPath("compositeType")),
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
  body: Schema.optional(CompositeType).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "deploymentmanager/alpha/projects/{project}/global/compositeTypes/{compositeType}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateCompositeTypesRequest>;

export type UpdateCompositeTypesResponse = Operation;
export const UpdateCompositeTypesResponse = Operation;

export type UpdateCompositeTypesError = DefaultErrors;

/** Updates a composite type. */
export const updateCompositeTypes: API.OperationMethod<
  UpdateCompositeTypesRequest,
  UpdateCompositeTypesResponse,
  UpdateCompositeTypesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateCompositeTypesRequest,
  output: UpdateCompositeTypesResponse,
  errors: [],
}));

export interface DeleteCompositeTypesRequest {
  /** The name of the type for this request. */
  compositeType: string;
  "header.bypassBillingFilter"?: boolean;
  /** The project ID for this request. */
  project: string;
}

export const DeleteCompositeTypesRequest = Schema.Struct({
  compositeType: Schema.String.pipe(T.HttpPath("compositeType")),
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
  project: Schema.String.pipe(T.HttpPath("project")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "deploymentmanager/alpha/projects/{project}/global/compositeTypes/{compositeType}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteCompositeTypesRequest>;

export type DeleteCompositeTypesResponse = Operation;
export const DeleteCompositeTypesResponse = Operation;

export type DeleteCompositeTypesError = DefaultErrors;

/** Deletes a composite type. */
export const deleteCompositeTypes: API.OperationMethod<
  DeleteCompositeTypesRequest,
  DeleteCompositeTypesResponse,
  DeleteCompositeTypesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteCompositeTypesRequest,
  output: DeleteCompositeTypesResponse,
  errors: [],
}));

export interface ListCompositeTypesRequest {
  /** Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. */
  pageToken?: string;
  /** The project ID for this request. */
  project: string;
  /** A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: ``` labels.owner:* ``` You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ``` If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. */
  filter?: string;
  /** Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. */
  orderBy?: string;
  /** The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) */
  maxResults?: number;
}

export const ListCompositeTypesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  project: Schema.String.pipe(T.HttpPath("project")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
}).pipe(
  T.Http({
    method: "GET",
    path: "deploymentmanager/alpha/projects/{project}/global/compositeTypes",
  }),
  svc,
) as unknown as Schema.Schema<ListCompositeTypesRequest>;

export type ListCompositeTypesResponse = CompositeTypesListResponse;
export const ListCompositeTypesResponse = CompositeTypesListResponse;

export type ListCompositeTypesError = DefaultErrors;

/** Lists all composite types for Deployment Manager. */
export const listCompositeTypes: API.PaginatedOperationMethod<
  ListCompositeTypesRequest,
  ListCompositeTypesResponse,
  ListCompositeTypesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListCompositeTypesRequest,
  output: ListCompositeTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetCompositeTypesRequest {
  /** The name of the composite type for this request. */
  compositeType: string;
  "header.bypassBillingFilter"?: boolean;
  /** The project ID for this request. */
  project: string;
}

export const GetCompositeTypesRequest = Schema.Struct({
  compositeType: Schema.String.pipe(T.HttpPath("compositeType")),
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
  project: Schema.String.pipe(T.HttpPath("project")),
}).pipe(
  T.Http({
    method: "GET",
    path: "deploymentmanager/alpha/projects/{project}/global/compositeTypes/{compositeType}",
  }),
  svc,
) as unknown as Schema.Schema<GetCompositeTypesRequest>;

export type GetCompositeTypesResponse = CompositeType;
export const GetCompositeTypesResponse = CompositeType;

export type GetCompositeTypesError = DefaultErrors;

/** Gets information about a specific composite type. */
export const getCompositeTypes: API.OperationMethod<
  GetCompositeTypesRequest,
  GetCompositeTypesResponse,
  GetCompositeTypesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCompositeTypesRequest,
  output: GetCompositeTypesResponse,
  errors: [],
}));

export interface InsertCompositeTypesRequest {
  /** The project ID for this request. */
  project: string;
  "header.bypassBillingFilter"?: boolean;
  /** Request body */
  body?: CompositeType;
}

export const InsertCompositeTypesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
  body: Schema.optional(CompositeType).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "deploymentmanager/alpha/projects/{project}/global/compositeTypes",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertCompositeTypesRequest>;

export type InsertCompositeTypesResponse = Operation;
export const InsertCompositeTypesResponse = Operation;

export type InsertCompositeTypesError = DefaultErrors;

/** Creates a composite type. */
export const insertCompositeTypes: API.OperationMethod<
  InsertCompositeTypesRequest,
  InsertCompositeTypesResponse,
  InsertCompositeTypesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertCompositeTypesRequest,
  output: InsertCompositeTypesResponse,
  errors: [],
}));

export interface PatchCompositeTypesRequest {
  "header.bypassBillingFilter"?: boolean;
  /** The project ID for this request. */
  project: string;
  /** The name of the composite type for this request. */
  compositeType: string;
  /** Request body */
  body?: CompositeType;
}

export const PatchCompositeTypesRequest = Schema.Struct({
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
  project: Schema.String.pipe(T.HttpPath("project")),
  compositeType: Schema.String.pipe(T.HttpPath("compositeType")),
  body: Schema.optional(CompositeType).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "deploymentmanager/alpha/projects/{project}/global/compositeTypes/{compositeType}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchCompositeTypesRequest>;

export type PatchCompositeTypesResponse = Operation;
export const PatchCompositeTypesResponse = Operation;

export type PatchCompositeTypesError = DefaultErrors;

/** Patches a composite type. */
export const patchCompositeTypes: API.OperationMethod<
  PatchCompositeTypesRequest,
  PatchCompositeTypesResponse,
  PatchCompositeTypesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchCompositeTypesRequest,
  output: PatchCompositeTypesResponse,
  errors: [],
}));

export interface GetTypeProvidersRequest {
  /** The name of the type provider for this request. */
  typeProvider: string;
  /** The project ID for this request. */
  project: string;
  "header.bypassBillingFilter"?: boolean;
}

export const GetTypeProvidersRequest = Schema.Struct({
  typeProvider: Schema.String.pipe(T.HttpPath("typeProvider")),
  project: Schema.String.pipe(T.HttpPath("project")),
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "deploymentmanager/alpha/projects/{project}/global/typeProviders/{typeProvider}",
  }),
  svc,
) as unknown as Schema.Schema<GetTypeProvidersRequest>;

export type GetTypeProvidersResponse = TypeProvider;
export const GetTypeProvidersResponse = TypeProvider;

export type GetTypeProvidersError = DefaultErrors;

/** Gets information about a specific type provider. */
export const getTypeProviders: API.OperationMethod<
  GetTypeProvidersRequest,
  GetTypeProvidersResponse,
  GetTypeProvidersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetTypeProvidersRequest,
  output: GetTypeProvidersResponse,
  errors: [],
}));

export interface GetTypeTypeProvidersRequest {
  "header.bypassBillingFilter"?: boolean;
  /** The name of the type provider type for this request. */
  type: string;
  /** The name of the type provider for this request. */
  typeProvider: string;
  /** The project ID for this request. */
  project: string;
}

export const GetTypeTypeProvidersRequest = Schema.Struct({
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
  type: Schema.String.pipe(T.HttpPath("type")),
  typeProvider: Schema.String.pipe(T.HttpPath("typeProvider")),
  project: Schema.String.pipe(T.HttpPath("project")),
}).pipe(
  T.Http({
    method: "GET",
    path: "deploymentmanager/alpha/projects/{project}/global/typeProviders/{typeProvider}/types/{type}",
  }),
  svc,
) as unknown as Schema.Schema<GetTypeTypeProvidersRequest>;

export type GetTypeTypeProvidersResponse = TypeInfo;
export const GetTypeTypeProvidersResponse = TypeInfo;

export type GetTypeTypeProvidersError = DefaultErrors;

/** Gets a type info for a type provided by a TypeProvider. */
export const getTypeTypeProviders: API.OperationMethod<
  GetTypeTypeProvidersRequest,
  GetTypeTypeProvidersResponse,
  GetTypeTypeProvidersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetTypeTypeProvidersRequest,
  output: GetTypeTypeProvidersResponse,
  errors: [],
}));

export interface UpdateTypeProvidersRequest {
  /** The project ID for this request. */
  project: string;
  /** The name of the type provider for this request. */
  typeProvider: string;
  "header.bypassBillingFilter"?: boolean;
  /** Request body */
  body?: TypeProvider;
}

export const UpdateTypeProvidersRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  typeProvider: Schema.String.pipe(T.HttpPath("typeProvider")),
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
  body: Schema.optional(TypeProvider).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "deploymentmanager/alpha/projects/{project}/global/typeProviders/{typeProvider}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateTypeProvidersRequest>;

export type UpdateTypeProvidersResponse = Operation;
export const UpdateTypeProvidersResponse = Operation;

export type UpdateTypeProvidersError = DefaultErrors;

/** Updates a type provider. */
export const updateTypeProviders: API.OperationMethod<
  UpdateTypeProvidersRequest,
  UpdateTypeProvidersResponse,
  UpdateTypeProvidersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateTypeProvidersRequest,
  output: UpdateTypeProvidersResponse,
  errors: [],
}));

export interface ListTypesTypeProvidersRequest {
  /** The name of the type provider for this request. */
  typeProvider: string;
  /** The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) */
  maxResults?: number;
  /** A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: ``` labels.owner:* ``` You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ``` If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. */
  filter?: string;
  /** The project ID for this request. */
  project: string;
  /** Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. */
  orderBy?: string;
  /** Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. */
  pageToken?: string;
}

export const ListTypesTypeProvidersRequest = Schema.Struct({
  typeProvider: Schema.String.pipe(T.HttpPath("typeProvider")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  project: Schema.String.pipe(T.HttpPath("project")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "deploymentmanager/alpha/projects/{project}/global/typeProviders/{typeProvider}/types",
  }),
  svc,
) as unknown as Schema.Schema<ListTypesTypeProvidersRequest>;

export type ListTypesTypeProvidersResponse = TypeProvidersListTypesResponse;
export const ListTypesTypeProvidersResponse = TypeProvidersListTypesResponse;

export type ListTypesTypeProvidersError = DefaultErrors;

/** Lists all the type info for a TypeProvider. */
export const listTypesTypeProviders: API.PaginatedOperationMethod<
  ListTypesTypeProvidersRequest,
  ListTypesTypeProvidersResponse,
  ListTypesTypeProvidersError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListTypesTypeProvidersRequest,
  output: ListTypesTypeProvidersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchTypeProvidersRequest {
  "header.bypassBillingFilter"?: boolean;
  /** The project ID for this request. */
  project: string;
  /** The name of the type provider for this request. */
  typeProvider: string;
  /** Request body */
  body?: TypeProvider;
}

export const PatchTypeProvidersRequest = Schema.Struct({
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
  project: Schema.String.pipe(T.HttpPath("project")),
  typeProvider: Schema.String.pipe(T.HttpPath("typeProvider")),
  body: Schema.optional(TypeProvider).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "deploymentmanager/alpha/projects/{project}/global/typeProviders/{typeProvider}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchTypeProvidersRequest>;

export type PatchTypeProvidersResponse = Operation;
export const PatchTypeProvidersResponse = Operation;

export type PatchTypeProvidersError = DefaultErrors;

/** Patches a type provider. */
export const patchTypeProviders: API.OperationMethod<
  PatchTypeProvidersRequest,
  PatchTypeProvidersResponse,
  PatchTypeProvidersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchTypeProvidersRequest,
  output: PatchTypeProvidersResponse,
  errors: [],
}));

export interface DeleteTypeProvidersRequest {
  "header.bypassBillingFilter"?: boolean;
  /** The project ID for this request. */
  project: string;
  /** The name of the type provider for this request. */
  typeProvider: string;
}

export const DeleteTypeProvidersRequest = Schema.Struct({
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
  project: Schema.String.pipe(T.HttpPath("project")),
  typeProvider: Schema.String.pipe(T.HttpPath("typeProvider")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "deploymentmanager/alpha/projects/{project}/global/typeProviders/{typeProvider}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteTypeProvidersRequest>;

export type DeleteTypeProvidersResponse = Operation;
export const DeleteTypeProvidersResponse = Operation;

export type DeleteTypeProvidersError = DefaultErrors;

/** Deletes a type provider. */
export const deleteTypeProviders: API.OperationMethod<
  DeleteTypeProvidersRequest,
  DeleteTypeProvidersResponse,
  DeleteTypeProvidersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteTypeProvidersRequest,
  output: DeleteTypeProvidersResponse,
  errors: [],
}));

export interface ListTypeProvidersRequest {
  /** Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. */
  orderBy?: string;
  /** The project ID for this request. */
  project: string;
  /** The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) */
  maxResults?: number;
  /** A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: ``` labels.owner:* ``` You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ``` If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. */
  filter?: string;
  /** Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. */
  pageToken?: string;
}

export const ListTypeProvidersRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  project: Schema.String.pipe(T.HttpPath("project")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "deploymentmanager/alpha/projects/{project}/global/typeProviders",
  }),
  svc,
) as unknown as Schema.Schema<ListTypeProvidersRequest>;

export type ListTypeProvidersResponse = TypeProvidersListResponse;
export const ListTypeProvidersResponse = TypeProvidersListResponse;

export type ListTypeProvidersError = DefaultErrors;

/** Lists all resource type providers for Deployment Manager. */
export const listTypeProviders: API.PaginatedOperationMethod<
  ListTypeProvidersRequest,
  ListTypeProvidersResponse,
  ListTypeProvidersError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListTypeProvidersRequest,
  output: ListTypeProvidersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface InsertTypeProvidersRequest {
  "header.bypassBillingFilter"?: boolean;
  /** The project ID for this request. */
  project: string;
  /** Request body */
  body?: TypeProvider;
}

export const InsertTypeProvidersRequest = Schema.Struct({
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
  project: Schema.String.pipe(T.HttpPath("project")),
  body: Schema.optional(TypeProvider).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "deploymentmanager/alpha/projects/{project}/global/typeProviders",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertTypeProvidersRequest>;

export type InsertTypeProvidersResponse = Operation;
export const InsertTypeProvidersResponse = Operation;

export type InsertTypeProvidersError = DefaultErrors;

/** Creates a type provider. */
export const insertTypeProviders: API.OperationMethod<
  InsertTypeProvidersRequest,
  InsertTypeProvidersResponse,
  InsertTypeProvidersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertTypeProvidersRequest,
  output: InsertTypeProvidersResponse,
  errors: [],
}));

export interface ListManifestsRequest {
  /** The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) */
  maxResults?: number;
  /** Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. */
  pageToken?: string;
  /** The name of the deployment for this request. */
  deployment: string;
  /** A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: ``` labels.owner:* ``` You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ``` If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. */
  filter?: string;
  /** Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. */
  orderBy?: string;
  /** The project ID for this request. */
  project: string;
}

export const ListManifestsRequest = Schema.Struct({
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  deployment: Schema.String.pipe(T.HttpPath("deployment")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  project: Schema.String.pipe(T.HttpPath("project")),
}).pipe(
  T.Http({
    method: "GET",
    path: "deploymentmanager/alpha/projects/{project}/global/deployments/{deployment}/manifests",
  }),
  svc,
) as unknown as Schema.Schema<ListManifestsRequest>;

export type ListManifestsResponse = ManifestsListResponse;
export const ListManifestsResponse = ManifestsListResponse;

export type ListManifestsError = DefaultErrors;

/** Lists all manifests for a given deployment. */
export const listManifests: API.PaginatedOperationMethod<
  ListManifestsRequest,
  ListManifestsResponse,
  ListManifestsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListManifestsRequest,
  output: ListManifestsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetManifestsRequest {
  /** The name of the manifest for this request. */
  manifest: string;
  /** The name of the deployment for this request. */
  deployment: string;
  /** The project ID for this request. */
  project: string;
  "header.bypassBillingFilter"?: boolean;
}

export const GetManifestsRequest = Schema.Struct({
  manifest: Schema.String.pipe(T.HttpPath("manifest")),
  deployment: Schema.String.pipe(T.HttpPath("deployment")),
  project: Schema.String.pipe(T.HttpPath("project")),
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "deploymentmanager/alpha/projects/{project}/global/deployments/{deployment}/manifests/{manifest}",
  }),
  svc,
) as unknown as Schema.Schema<GetManifestsRequest>;

export type GetManifestsResponse = Manifest;
export const GetManifestsResponse = Manifest;

export type GetManifestsError = DefaultErrors;

/** Gets information about a specific manifest. */
export const getManifests: API.OperationMethod<
  GetManifestsRequest,
  GetManifestsResponse,
  GetManifestsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetManifestsRequest,
  output: GetManifestsResponse,
  errors: [],
}));

export interface GetIamPolicyDeploymentsRequest {
  "header.bypassBillingFilter"?: boolean;
  /** Project ID for this request. */
  project: string;
  /** Name or id of the resource for this request. */
  resource: string;
  /** Requested IAM Policy version. */
  optionsRequestedPolicyVersion?: number;
}

export const GetIamPolicyDeploymentsRequest = Schema.Struct({
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
  project: Schema.String.pipe(T.HttpPath("project")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
  optionsRequestedPolicyVersion: Schema.optional(Schema.Number).pipe(
    T.HttpQuery("optionsRequestedPolicyVersion"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "deploymentmanager/alpha/projects/{project}/global/deployments/{resource}/getIamPolicy",
  }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyDeploymentsRequest>;

export type GetIamPolicyDeploymentsResponse = Policy;
export const GetIamPolicyDeploymentsResponse = Policy;

export type GetIamPolicyDeploymentsError = DefaultErrors;

/** Gets the access control policy for a resource. May be empty if no such policy or resource exists. */
export const getIamPolicyDeployments: API.OperationMethod<
  GetIamPolicyDeploymentsRequest,
  GetIamPolicyDeploymentsResponse,
  GetIamPolicyDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyDeploymentsRequest,
  output: GetIamPolicyDeploymentsResponse,
  errors: [],
}));

export interface SetIamPolicyDeploymentsRequest {
  /** Name or id of the resource for this request. */
  resource: string;
  /** Project ID for this request. */
  project: string;
  /** Request body */
  body?: GlobalSetPolicyRequest;
}

export const SetIamPolicyDeploymentsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  project: Schema.String.pipe(T.HttpPath("project")),
  body: Schema.optional(GlobalSetPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "deploymentmanager/alpha/projects/{project}/global/deployments/{resource}/setIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyDeploymentsRequest>;

export type SetIamPolicyDeploymentsResponse = Policy;
export const SetIamPolicyDeploymentsResponse = Policy;

export type SetIamPolicyDeploymentsError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. */
export const setIamPolicyDeployments: API.OperationMethod<
  SetIamPolicyDeploymentsRequest,
  SetIamPolicyDeploymentsResponse,
  SetIamPolicyDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyDeploymentsRequest,
  output: SetIamPolicyDeploymentsResponse,
  errors: [],
}));

export interface TestIamPermissionsDeploymentsRequest {
  "header.bypassBillingFilter"?: boolean;
  /** Name or id of the resource for this request. */
  resource: string;
  /** Project ID for this request. */
  project: string;
  /** Request body */
  body?: TestPermissionsRequest;
}

export const TestIamPermissionsDeploymentsRequest = Schema.Struct({
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
  resource: Schema.String.pipe(T.HttpPath("resource")),
  project: Schema.String.pipe(T.HttpPath("project")),
  body: Schema.optional(TestPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "deploymentmanager/alpha/projects/{project}/global/deployments/{resource}/testIamPermissions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsDeploymentsRequest>;

export type TestIamPermissionsDeploymentsResponse = TestPermissionsResponse;
export const TestIamPermissionsDeploymentsResponse = TestPermissionsResponse;

export type TestIamPermissionsDeploymentsError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. */
export const testIamPermissionsDeployments: API.OperationMethod<
  TestIamPermissionsDeploymentsRequest,
  TestIamPermissionsDeploymentsResponse,
  TestIamPermissionsDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsDeploymentsRequest,
  output: TestIamPermissionsDeploymentsResponse,
  errors: [],
}));

export interface UpdateDeploymentsRequest {
  /** Sets the policy to use for deleting resources. */
  deletePolicy?: "DELETE" | "ABANDON" | (string & {});
  "header.bypassBillingFilter"?: boolean;
  /** Sets the policy to use for creating new resources. */
  createPolicy?: "CREATE_OR_ACQUIRE" | "ACQUIRE" | "CREATE" | (string & {});
  /** The project ID for this request. */
  project: string;
  /** If set to true, updates the deployment and creates and updates the "shell" resources but does not actually alter or instantiate these resources. This allows you to preview what your deployment will look like. You can use this intent to preview how an update would affect your deployment. You must provide a `target.config` with a configuration if this is set to true. After previewing a deployment, you can deploy your resources by making a request with the `update()` or you can `cancelPreview()` to remove the preview altogether. Note that the deployment will still exist after you cancel the preview and you must separately delete this deployment if you want to remove it. */
  preview?: boolean;
  /** The name of the deployment for this request. */
  deployment: string;
  /** Request body */
  body?: Deployment;
}

export const UpdateDeploymentsRequest = Schema.Struct({
  deletePolicy: Schema.optional(Schema.String).pipe(
    T.HttpQuery("deletePolicy"),
  ),
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
  createPolicy: Schema.optional(Schema.String).pipe(
    T.HttpQuery("createPolicy"),
  ),
  project: Schema.String.pipe(T.HttpPath("project")),
  preview: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("preview")),
  deployment: Schema.String.pipe(T.HttpPath("deployment")),
  body: Schema.optional(Deployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "deploymentmanager/alpha/projects/{project}/global/deployments/{deployment}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateDeploymentsRequest>;

export type UpdateDeploymentsResponse = Operation;
export const UpdateDeploymentsResponse = Operation;

export type UpdateDeploymentsError = DefaultErrors;

/** Updates a deployment and all of the resources described by the deployment manifest. */
export const updateDeployments: API.OperationMethod<
  UpdateDeploymentsRequest,
  UpdateDeploymentsResponse,
  UpdateDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateDeploymentsRequest,
  output: UpdateDeploymentsResponse,
  errors: [],
}));

export interface GetDeploymentsRequest {
  /** The name of the deployment for this request. */
  deployment: string;
  "header.bypassBillingFilter"?: boolean;
  /** The project ID for this request. */
  project: string;
}

export const GetDeploymentsRequest = Schema.Struct({
  deployment: Schema.String.pipe(T.HttpPath("deployment")),
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
  project: Schema.String.pipe(T.HttpPath("project")),
}).pipe(
  T.Http({
    method: "GET",
    path: "deploymentmanager/alpha/projects/{project}/global/deployments/{deployment}",
  }),
  svc,
) as unknown as Schema.Schema<GetDeploymentsRequest>;

export type GetDeploymentsResponse = Deployment;
export const GetDeploymentsResponse = Deployment;

export type GetDeploymentsError = DefaultErrors;

/** Gets information about a specific deployment. */
export const getDeployments: API.OperationMethod<
  GetDeploymentsRequest,
  GetDeploymentsResponse,
  GetDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDeploymentsRequest,
  output: GetDeploymentsResponse,
  errors: [],
}));

export interface InsertDeploymentsRequest {
  /** The project ID for this request. */
  project: string;
  /** Sets the policy to use for creating new resources. */
  createPolicy?: "CREATE_OR_ACQUIRE" | "ACQUIRE" | "CREATE" | (string & {});
  /** If set to true, creates a deployment and creates "shell" resources but does not actually instantiate these resources. This allows you to preview what your deployment looks like. After previewing a deployment, you can deploy your resources by making a request with the `update()` method or you can use the `cancelPreview()` method to cancel the preview altogether. Note that the deployment will still exist after you cancel the preview and you must separately delete this deployment if you want to remove it. */
  preview?: boolean;
  "header.bypassBillingFilter"?: boolean;
  /** Request body */
  body?: Deployment;
}

export const InsertDeploymentsRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  createPolicy: Schema.optional(Schema.String).pipe(
    T.HttpQuery("createPolicy"),
  ),
  preview: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("preview")),
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
  body: Schema.optional(Deployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "deploymentmanager/alpha/projects/{project}/global/deployments",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertDeploymentsRequest>;

export type InsertDeploymentsResponse = Operation;
export const InsertDeploymentsResponse = Operation;

export type InsertDeploymentsError = DefaultErrors;

/** Creates a deployment and all of the resources described by the deployment manifest. */
export const insertDeployments: API.OperationMethod<
  InsertDeploymentsRequest,
  InsertDeploymentsResponse,
  InsertDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertDeploymentsRequest,
  output: InsertDeploymentsResponse,
  errors: [],
}));

export interface PatchDeploymentsRequest {
  /** Sets the policy to use for creating new resources. */
  createPolicy?: "CREATE_OR_ACQUIRE" | "ACQUIRE" | "CREATE" | (string & {});
  /** The name of the deployment for this request. */
  deployment: string;
  /** The project ID for this request. */
  project: string;
  "header.bypassBillingFilter"?: boolean;
  /** Sets the policy to use for deleting resources. */
  deletePolicy?: "DELETE" | "ABANDON" | (string & {});
  /** If set to true, updates the deployment and creates and updates the "shell" resources but does not actually alter or instantiate these resources. This allows you to preview what your deployment will look like. You can use this intent to preview how an update would affect your deployment. You must provide a `target.config` with a configuration if this is set to true. After previewing a deployment, you can deploy your resources by making a request with the `update()` or you can `cancelPreview()` to remove the preview altogether. Note that the deployment will still exist after you cancel the preview and you must separately delete this deployment if you want to remove it. */
  preview?: boolean;
  /** Request body */
  body?: Deployment;
}

export const PatchDeploymentsRequest = Schema.Struct({
  createPolicy: Schema.optional(Schema.String).pipe(
    T.HttpQuery("createPolicy"),
  ),
  deployment: Schema.String.pipe(T.HttpPath("deployment")),
  project: Schema.String.pipe(T.HttpPath("project")),
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
  deletePolicy: Schema.optional(Schema.String).pipe(
    T.HttpQuery("deletePolicy"),
  ),
  preview: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("preview")),
  body: Schema.optional(Deployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "deploymentmanager/alpha/projects/{project}/global/deployments/{deployment}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchDeploymentsRequest>;

export type PatchDeploymentsResponse = Operation;
export const PatchDeploymentsResponse = Operation;

export type PatchDeploymentsError = DefaultErrors;

/** Patches a deployment and all of the resources described by the deployment manifest. */
export const patchDeployments: API.OperationMethod<
  PatchDeploymentsRequest,
  PatchDeploymentsResponse,
  PatchDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchDeploymentsRequest,
  output: PatchDeploymentsResponse,
  errors: [],
}));

export interface StopDeploymentsRequest {
  /** The project ID for this request. */
  project: string;
  /** The name of the deployment for this request. */
  deployment: string;
  /** Request body */
  body?: DeploymentsStopRequest;
}

export const StopDeploymentsRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  deployment: Schema.String.pipe(T.HttpPath("deployment")),
  body: Schema.optional(DeploymentsStopRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "deploymentmanager/alpha/projects/{project}/global/deployments/{deployment}/stop",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<StopDeploymentsRequest>;

export type StopDeploymentsResponse = Operation;
export const StopDeploymentsResponse = Operation;

export type StopDeploymentsError = DefaultErrors;

/** Stops an ongoing operation. This does not roll back any work that has already been completed, but prevents any new work from being started. */
export const stopDeployments: API.OperationMethod<
  StopDeploymentsRequest,
  StopDeploymentsResponse,
  StopDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: StopDeploymentsRequest,
  output: StopDeploymentsResponse,
  errors: [],
}));

export interface ListDeploymentsRequest {
  /** The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) */
  maxResults?: number;
  /** Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. */
  orderBy?: string;
  /** The project ID for this request. */
  project: string;
  /** A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: ``` labels.owner:* ``` You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ``` If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. */
  filter?: string;
  /** Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. */
  pageToken?: string;
}

export const ListDeploymentsRequest = Schema.Struct({
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  project: Schema.String.pipe(T.HttpPath("project")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "deploymentmanager/alpha/projects/{project}/global/deployments",
  }),
  svc,
) as unknown as Schema.Schema<ListDeploymentsRequest>;

export type ListDeploymentsResponse = DeploymentsListResponse;
export const ListDeploymentsResponse = DeploymentsListResponse;

export type ListDeploymentsError = DefaultErrors;

/** Lists all deployments for a given project. */
export const listDeployments: API.PaginatedOperationMethod<
  ListDeploymentsRequest,
  ListDeploymentsResponse,
  ListDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListDeploymentsRequest,
  output: ListDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CancelPreviewDeploymentsRequest {
  /** The project ID for this request. */
  project: string;
  /** The name of the deployment for this request. */
  deployment: string;
  /** Request body */
  body?: DeploymentsCancelPreviewRequest;
}

export const CancelPreviewDeploymentsRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  deployment: Schema.String.pipe(T.HttpPath("deployment")),
  body: Schema.optional(DeploymentsCancelPreviewRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "deploymentmanager/alpha/projects/{project}/global/deployments/{deployment}/cancelPreview",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CancelPreviewDeploymentsRequest>;

export type CancelPreviewDeploymentsResponse = Operation;
export const CancelPreviewDeploymentsResponse = Operation;

export type CancelPreviewDeploymentsError = DefaultErrors;

/** Cancels and removes the preview currently associated with the deployment. */
export const cancelPreviewDeployments: API.OperationMethod<
  CancelPreviewDeploymentsRequest,
  CancelPreviewDeploymentsResponse,
  CancelPreviewDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CancelPreviewDeploymentsRequest,
  output: CancelPreviewDeploymentsResponse,
  errors: [],
}));

export interface DeleteDeploymentsRequest {
  /** The name of the deployment for this request. */
  deployment: string;
  "header.bypassBillingFilter"?: boolean;
  /** Sets the policy to use for deleting resources. */
  deletePolicy?: "DELETE" | "ABANDON" | (string & {});
  /** The project ID for this request. */
  project: string;
}

export const DeleteDeploymentsRequest = Schema.Struct({
  deployment: Schema.String.pipe(T.HttpPath("deployment")),
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
  deletePolicy: Schema.optional(Schema.String).pipe(
    T.HttpQuery("deletePolicy"),
  ),
  project: Schema.String.pipe(T.HttpPath("project")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "deploymentmanager/alpha/projects/{project}/global/deployments/{deployment}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteDeploymentsRequest>;

export type DeleteDeploymentsResponse = Operation;
export const DeleteDeploymentsResponse = Operation;

export type DeleteDeploymentsError = DefaultErrors;

/** Deletes a deployment and all of the resources in the deployment. */
export const deleteDeployments: API.OperationMethod<
  DeleteDeploymentsRequest,
  DeleteDeploymentsResponse,
  DeleteDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteDeploymentsRequest,
  output: DeleteDeploymentsResponse,
  errors: [],
}));

export interface GetTypesRequest {
  /** The project ID for this request. */
  project: string;
  /** The name of the type for this request. */
  type: string;
  "header.bypassBillingFilter"?: boolean;
}

export const GetTypesRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  type: Schema.String.pipe(T.HttpPath("type")),
  "header.bypassBillingFilter": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("header.bypassBillingFilter"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "deploymentmanager/alpha/projects/{project}/global/types/{type}",
  }),
  svc,
) as unknown as Schema.Schema<GetTypesRequest>;

export type GetTypesResponse = Type;
export const GetTypesResponse = Type;

export type GetTypesError = DefaultErrors;

/** Gets information about a specific type. */
export const getTypes: API.OperationMethod<
  GetTypesRequest,
  GetTypesResponse,
  GetTypesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetTypesRequest,
  output: GetTypesResponse,
  errors: [],
}));

export interface ListTypesRequest {
  /** Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. */
  orderBy?: string;
  /** The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) */
  maxResults?: number;
  /** A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: ``` labels.owner:* ``` You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: ``` (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) ``` If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. */
  filter?: string;
  /** The project ID for this request. */
  project: string;
  /** Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. */
  pageToken?: string;
}

export const ListTypesRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  project: Schema.String.pipe(T.HttpPath("project")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "deploymentmanager/alpha/projects/{project}/global/types",
  }),
  svc,
) as unknown as Schema.Schema<ListTypesRequest>;

export type ListTypesResponse = TypesListResponse;
export const ListTypesResponse = TypesListResponse;

export type ListTypesError = DefaultErrors;

/** Lists all resource types for Deployment Manager. */
export const listTypes: API.PaginatedOperationMethod<
  ListTypesRequest,
  ListTypesResponse,
  ListTypesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListTypesRequest,
  output: ListTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
