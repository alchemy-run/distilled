// ==========================================================================
// BigQuery Reservation API (bigqueryreservation v1)
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
  name: "bigqueryreservation",
  version: "v1",
  rootUrl: "https://bigqueryreservation.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface FailoverReservationRequest {
  /** Optional. A parameter that determines how writes that are pending replication are handled after a failover is initiated. If not specified, HARD failover mode is used by default. */
  failoverMode?: "FAILOVER_MODE_UNSPECIFIED" | "SOFT" | "HARD" | (string & {});
}

export const FailoverReservationRequest: Schema.Schema<FailoverReservationRequest> = Schema.suspend(() => Schema.Struct({
  failoverMode: Schema.optional(Schema.String),
})).annotate({ identifier: "FailoverReservationRequest" }) as any as Schema.Schema<FailoverReservationRequest>;

export interface Expr {
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  condition: Schema.optional(Expr),
  members: Schema.optional(Schema.Array(Schema.String)),
  role: Schema.optional(Schema.String),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface SchedulingPolicy {
  /** Optional. If present and > 0, the reservation will attempt to limit the concurrency of jobs running for any particular project within it to the given value. This feature is not yet generally available. */
  concurrency?: string;
  /** Optional. If present and > 0, the reservation will attempt to limit the slot consumption of queries running for any particular project within it to the given value. This feature is not yet generally available. */
  maxSlots?: string;
}

export const SchedulingPolicy: Schema.Schema<SchedulingPolicy> = Schema.suspend(() => Schema.Struct({
  concurrency: Schema.optional(Schema.String),
  maxSlots: Schema.optional(Schema.String),
})).annotate({ identifier: "SchedulingPolicy" }) as any as Schema.Schema<SchedulingPolicy>;

export interface Assignment {
  /** Optional. The scheduling policy to use for jobs and queries of this assignee when running under the associated reservation. The scheduling policy controls how the reservation's resources are distributed. This overrides the default scheduling policy specified on the reservation. This feature is not yet generally available. */
  schedulingPolicy?: SchedulingPolicy;
  /** Output only. Name of the resource. E.g.: `projects/myproject/locations/US/reservations/team1-prod/assignments/123`. The assignment_id must only contain lower case alphanumeric characters or dashes and the max length is 64 characters. */
  name?: string;
  /** Output only. State of the assignment. */
  state?: "STATE_UNSPECIFIED" | "PENDING" | "ACTIVE" | (string & {});
  /** Optional. Deprecated: "Gemini in BigQuery" is now available by default for all BigQuery editions and should not be explicitly set. Controls if "Gemini in BigQuery" (https://cloud.google.com/gemini/docs/bigquery/overview) features should be enabled for this reservation assignment. */
  enableGeminiInBigquery?: boolean;
  /** Optional. Which type of jobs will use the reservation. */
  jobType?: "JOB_TYPE_UNSPECIFIED" | "PIPELINE" | "QUERY" | "ML_EXTERNAL" | "BACKGROUND" | "CONTINUOUS" | "BACKGROUND_CHANGE_DATA_CAPTURE" | "BACKGROUND_COLUMN_METADATA_INDEX" | "BACKGROUND_SEARCH_INDEX_REFRESH" | (string & {});
  /** Optional. The resource which will use the reservation. E.g. `projects/myproject`, `folders/123`, or `organizations/456`. */
  assignee?: string;
}

export const Assignment: Schema.Schema<Assignment> = Schema.suspend(() => Schema.Struct({
  schedulingPolicy: Schema.optional(SchedulingPolicy),
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  enableGeminiInBigquery: Schema.optional(Schema.Boolean),
  jobType: Schema.optional(Schema.String),
  assignee: Schema.optional(Schema.String),
})).annotate({ identifier: "Assignment" }) as any as Schema.Schema<Assignment>;

export interface SearchAllAssignmentsResponse {
  /** List of assignments visible to the user. */
  assignments?: Array<Assignment>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const SearchAllAssignmentsResponse: Schema.Schema<SearchAllAssignmentsResponse> = Schema.suspend(() => Schema.Struct({
  assignments: Schema.optional(Schema.Array(Assignment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchAllAssignmentsResponse" }) as any as Schema.Schema<SearchAllAssignmentsResponse>;

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
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() => Schema.Struct({
  auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

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

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  bindings: Schema.optional(Schema.Array(Binding)),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  etag: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Number),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface Status {
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  code: Schema.optional(Schema.Number),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface CapacityCommitment {
  /** Output only. State of the commitment. */
  state?: "STATE_UNSPECIFIED" | "PENDING" | "ACTIVE" | "FAILED" | (string & {});
  /** Output only. The end of the current commitment period. It is applicable only for ACTIVE capacity commitments. Note after renewal, commitment_end_time is the time the renewed commitment expires. So itwould be at a time after commitment_start_time + committed period, because we don't change commitment_start_time , */
  commitmentEndTime?: string;
  /** Output only. The start of the current commitment period. It is applicable only for ACTIVE capacity commitments. Note after the commitment is renewed, commitment_start_time won't be changed. It refers to the start time of the original commitment. */
  commitmentStartTime?: string;
  /** Optional. Capacity commitment commitment plan. */
  plan?: "COMMITMENT_PLAN_UNSPECIFIED" | "FLEX" | "FLEX_FLAT_RATE" | "TRIAL" | "MONTHLY" | "MONTHLY_FLAT_RATE" | "ANNUAL" | "ANNUAL_FLAT_RATE" | "THREE_YEAR" | "NONE" | (string & {});
  /** Output only. If true, the commitment is a flat-rate commitment, otherwise, it's an edition commitment. */
  isFlatRate?: boolean;
  /** Optional. Number of slots in this commitment. */
  slotCount?: string;
  /** Optional. The plan this capacity commitment is converted to after commitment_end_time passes. Once the plan is changed, committed period is extended according to commitment plan. Only applicable for ANNUAL and TRIAL commitments. */
  renewalPlan?: "COMMITMENT_PLAN_UNSPECIFIED" | "FLEX" | "FLEX_FLAT_RATE" | "TRIAL" | "MONTHLY" | "MONTHLY_FLAT_RATE" | "ANNUAL" | "ANNUAL_FLAT_RATE" | "THREE_YEAR" | "NONE" | (string & {});
  /** Output only. The resource name of the capacity commitment, e.g., `projects/myproject/locations/US/capacityCommitments/123` The commitment_id must only contain lower case alphanumeric characters or dashes. It must start with a letter and must not end with a dash. Its maximum length is 64 characters. */
  name?: string;
  /** Applicable only for commitments located within one of the BigQuery multi-regions (US or EU). If set to true, this commitment is placed in the organization's secondary region which is designated for disaster recovery purposes. If false, this commitment is placed in the organization's default region. NOTE: this is a preview feature. Project must be allow-listed in order to set this field. */
  multiRegionAuxiliary?: boolean;
  /** Output only. For FAILED commitment plan, provides the reason of failure. */
  failureStatus?: Status;
  /** Optional. Edition of the capacity commitment. */
  edition?: "EDITION_UNSPECIFIED" | "STANDARD" | "ENTERPRISE" | "ENTERPRISE_PLUS" | (string & {});
}

export const CapacityCommitment: Schema.Schema<CapacityCommitment> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  commitmentEndTime: Schema.optional(Schema.String),
  commitmentStartTime: Schema.optional(Schema.String),
  plan: Schema.optional(Schema.String),
  isFlatRate: Schema.optional(Schema.Boolean),
  slotCount: Schema.optional(Schema.String),
  renewalPlan: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  multiRegionAuxiliary: Schema.optional(Schema.Boolean),
  failureStatus: Schema.optional(Status),
  edition: Schema.optional(Schema.String),
})).annotate({ identifier: "CapacityCommitment" }) as any as Schema.Schema<CapacityCommitment>;

export interface ListCapacityCommitmentsResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** List of capacity commitments visible to the user. */
  capacityCommitments?: Array<CapacityCommitment>;
}

export const ListCapacityCommitmentsResponse: Schema.Schema<ListCapacityCommitmentsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  capacityCommitments: Schema.optional(Schema.Array(CapacityCommitment)),
})).annotate({ identifier: "ListCapacityCommitmentsResponse" }) as any as Schema.Schema<ListCapacityCommitmentsResponse>;

export interface SplitCapacityCommitmentRequest {
  /** Number of slots in the capacity commitment after the split. */
  slotCount?: string;
}

export const SplitCapacityCommitmentRequest: Schema.Schema<SplitCapacityCommitmentRequest> = Schema.suspend(() => Schema.Struct({
  slotCount: Schema.optional(Schema.String),
})).annotate({ identifier: "SplitCapacityCommitmentRequest" }) as any as Schema.Schema<SplitCapacityCommitmentRequest>;

export interface ReplicationStatus {
  /** Output only. The last error encountered while trying to replicate changes from the primary to the secondary. This field is only available if the replication has not succeeded since. */
  error?: Status;
  /** Output only. A timestamp corresponding to the last change on the primary that was successfully replicated to the secondary. */
  lastReplicationTime?: string;
  /** Output only. The time at which the last error was encountered while trying to replicate changes from the primary to the secondary. This field is only available if the replication has not succeeded since. */
  lastErrorTime?: string;
  /** Output only. The time at which a soft failover for the reservation and its associated datasets was initiated. After this field is set, all subsequent changes to the reservation will be rejected unless a hard failover overrides this operation. This field will be cleared once the failover is complete. */
  softFailoverStartTime?: string;
}

export const ReplicationStatus: Schema.Schema<ReplicationStatus> = Schema.suspend(() => Schema.Struct({
  error: Schema.optional(Status),
  lastReplicationTime: Schema.optional(Schema.String),
  lastErrorTime: Schema.optional(Schema.String),
  softFailoverStartTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ReplicationStatus" }) as any as Schema.Schema<ReplicationStatus>;

export interface TableReference {
  /** Optional. The ID of the dataset in the above project. */
  datasetId?: string;
  /** Optional. The ID of the table in the above dataset. */
  tableId?: string;
  /** Optional. The assigned project ID of the project. */
  projectId?: string;
}

export const TableReference: Schema.Schema<TableReference> = Schema.suspend(() => Schema.Struct({
  datasetId: Schema.optional(Schema.String),
  tableId: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "TableReference" }) as any as Schema.Schema<TableReference>;

export interface MoveAssignmentRequest {
  /** The new reservation ID, e.g.: `projects/myotherproject/locations/US/reservations/team2-prod` */
  destinationId?: string;
  /** The optional assignment ID. A new assignment name is generated if this field is empty. This field can contain only lowercase alphanumeric characters or dashes. Max length is 64 characters. */
  assignmentId?: string;
}

export const MoveAssignmentRequest: Schema.Schema<MoveAssignmentRequest> = Schema.suspend(() => Schema.Struct({
  destinationId: Schema.optional(Schema.String),
  assignmentId: Schema.optional(Schema.String),
})).annotate({ identifier: "MoveAssignmentRequest" }) as any as Schema.Schema<MoveAssignmentRequest>;

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

export interface BiReservation {
  /** Optional. Size of a reservation, in bytes. */
  size?: string;
  /** Optional. Preferred tables to use BI capacity for. */
  preferredTables?: Array<TableReference>;
  /** Output only. The last update timestamp of a reservation. */
  updateTime?: string;
  /** Identifier. The resource name of the singleton BI reservation. Reservation names have the form `projects/{project_id}/locations/{location_id}/biReservation`. */
  name?: string;
}

export const BiReservation: Schema.Schema<BiReservation> = Schema.suspend(() => Schema.Struct({
  size: Schema.optional(Schema.String),
  preferredTables: Schema.optional(Schema.Array(TableReference)),
  updateTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "BiReservation" }) as any as Schema.Schema<BiReservation>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface Autoscale {
  /** Output only. The slot capacity added to this reservation when autoscale happens. Will be between [0, max_slots]. Note: after users reduce max_slots, it may take a while before it can be propagated, so current_slots may stay in the original value and could be larger than max_slots for that brief period (less than one minute) */
  currentSlots?: string;
  /** Optional. Number of slots to be scaled when needed. */
  maxSlots?: string;
}

export const Autoscale: Schema.Schema<Autoscale> = Schema.suspend(() => Schema.Struct({
  currentSlots: Schema.optional(Schema.String),
  maxSlots: Schema.optional(Schema.String),
})).annotate({ identifier: "Autoscale" }) as any as Schema.Schema<Autoscale>;

export interface Reservation {
  /** Output only. Last update time of the reservation. */
  updateTime?: string;
  /** Optional. If false, any query or pipeline job using this reservation will use idle slots from other reservations within the same admin project. If true, a query or pipeline job using this reservation will execute with the slot capacity specified in the slot_capacity field at most. */
  ignoreIdleSlots?: boolean;
  /** Optional. The configuration parameters for the auto scaling feature. */
  autoscale?: Autoscale;
  /** Output only. Creation time of the reservation. */
  creationTime?: string;
  /** Optional. The reservation group that this reservation belongs to. You can set this property when you create or update a reservation. Reservations do not need to belong to a reservation group. Format: projects/{project}/locations/{location}/reservationGroups/{reservation_group} or just {reservation_group} */
  reservationGroup?: string;
  /** Optional. The scheduling policy to use for jobs and queries running under this reservation. The scheduling policy controls how the reservation's resources are distributed. This feature is not yet generally available. */
  schedulingPolicy?: SchedulingPolicy;
  /** Output only. The Disaster Recovery(DR) replication status of the reservation. This is only available for the primary replicas of DR/failover reservations and provides information about the both the staleness of the secondary and the last error encountered while trying to replicate changes from the primary to the secondary. If this field is blank, it means that the reservation is either not a DR reservation or the reservation is a DR secondary or that any replication operations on the reservation have succeeded. */
  replicationStatus?: ReplicationStatus;
  /** Optional. Job concurrency target which sets a soft upper bound on the number of jobs that can run concurrently in this reservation. This is a soft target due to asynchronous nature of the system and various optimizations for small queries. Default value is 0 which means that concurrency target will be automatically computed by the system. NOTE: this field is exposed as target job concurrency in the Information Schema, DDL and BigQuery CLI. */
  concurrency?: string;
  /** Output only. The current location of the reservation's primary replica. This field is only set for reservations using the managed disaster recovery feature. */
  primaryLocation?: string;
  /** Optional. The labels associated with this reservation. You can use these to organize and group your reservations. You can set this property when you create or update a reservation. */
  labels?: Record<string, string>;
  /** Applicable only for reservations located within one of the BigQuery multi-regions (US or EU). If set to true, this reservation is placed in the organization's secondary region which is designated for disaster recovery purposes. If false, this reservation is placed in the organization's default region. NOTE: this is a preview feature. Project must be allow-listed in order to set this field. */
  multiRegionAuxiliary?: boolean;
  /** Optional. The current location of the reservation's secondary replica. This field is only set for reservations using the managed disaster recovery feature. Users can set this in create reservation calls to create a failover reservation or in update reservation calls to convert a non-failover reservation to a failover reservation(or vice versa). */
  secondaryLocation?: string;
  /** Optional. Edition of the reservation. */
  edition?: "EDITION_UNSPECIFIED" | "STANDARD" | "ENTERPRISE" | "ENTERPRISE_PLUS" | (string & {});
  /** Optional. Baseline slots available to this reservation. A slot is a unit of computational power in BigQuery, and serves as the unit of parallelism. Queries using this reservation might use more slots during runtime if ignore_idle_slots is set to false, or autoscaling is enabled. The total slot_capacity of the reservation and its siblings may exceed the total slot_count of capacity commitments. In that case, the exceeding slots will be charged with the autoscale SKU. You can increase the number of baseline slots in a reservation every few minutes. If you want to decrease your baseline slots, you are limited to once an hour if you have recently changed your baseline slot capacity and your baseline slots exceed your committed slots. Otherwise, you can decrease your baseline slots every few minutes. */
  slotCapacity?: string;
  /** Optional. The scaling mode for the reservation. If the field is present but max_slots is not present, requests will be rejected with error code `google.rpc.Code.INVALID_ARGUMENT`. */
  scalingMode?: "SCALING_MODE_UNSPECIFIED" | "AUTOSCALE_ONLY" | "IDLE_SLOTS_ONLY" | "ALL_SLOTS" | (string & {});
  /** Identifier. The resource name of the reservation, e.g., `projects/* /locations/* /reservations/team1-prod`. The reservation_id must only contain lower case alphanumeric characters or dashes. It must start with a letter and must not end with a dash. Its maximum length is 64 characters. */
  name?: string;
  /** Optional. The overall max slots for the reservation, covering slot_capacity (baseline), idle slots (if ignore_idle_slots is false) and scaled slots. If present, the reservation won't use more than the specified number of slots, even if there is demand and supply (from idle slots). NOTE: capping a reservation's idle slot usage is best effort and its usage may exceed the max_slots value. However, in terms of autoscale.current_slots (which accounts for the additional added slots), it will never exceed the max_slots - baseline. This field must be set together with the scaling_mode enum value, otherwise the request will be rejected with error code `google.rpc.Code.INVALID_ARGUMENT`. If the max_slots and scaling_mode are set, the autoscale or autoscale.max_slots field must be unset. Otherwise the request will be rejected with error code `google.rpc.Code.INVALID_ARGUMENT`. However, the autoscale field may still be in the output. The autopscale.max_slots will always show as 0 and the autoscaler.current_slots will represent the current slots from autoscaler excluding idle slots. For example, if the max_slots is 1000 and scaling_mode is AUTOSCALE_ONLY, then in the output, the autoscaler.max_slots will be 0 and the autoscaler.current_slots may be any value between 0 and 1000. If the max_slots is 1000, scaling_mode is ALL_SLOTS, the baseline is 100 and idle slots usage is 200, then in the output, the autoscaler.max_slots will be 0 and the autoscaler.current_slots will not be higher than 700. If the max_slots is 1000, scaling_mode is IDLE_SLOTS_ONLY, then in the output, the autoscaler field will be null. If the max_slots and scaling_mode are set, then the ignore_idle_slots field must be aligned with the scaling_mode enum value.(See details in ScalingMode comments). Otherwise the request will be rejected with error code `google.rpc.Code.INVALID_ARGUMENT`. Please note, the max_slots is for user to manage the part of slots greater than the baseline. Therefore, we don't allow users to set max_slots smaller or equal to the baseline as it will not be meaningful. If the field is present and slot_capacity>=max_slots, requests will be rejected with error code `google.rpc.Code.INVALID_ARGUMENT`. Please note that if max_slots is set to 0, we will treat it as unset. Customers can set max_slots to 0 and set scaling_mode to SCALING_MODE_UNSPECIFIED to disable the max_slots feature. */
  maxSlots?: string;
  /** Output only. The location where the reservation was originally created. This is set only during the failover reservation's creation. All billing charges for the failover reservation will be applied to this location. */
  originalPrimaryLocation?: string;
}

export const Reservation: Schema.Schema<Reservation> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  ignoreIdleSlots: Schema.optional(Schema.Boolean),
  autoscale: Schema.optional(Autoscale),
  creationTime: Schema.optional(Schema.String),
  reservationGroup: Schema.optional(Schema.String),
  schedulingPolicy: Schema.optional(SchedulingPolicy),
  replicationStatus: Schema.optional(ReplicationStatus),
  concurrency: Schema.optional(Schema.String),
  primaryLocation: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  multiRegionAuxiliary: Schema.optional(Schema.Boolean),
  secondaryLocation: Schema.optional(Schema.String),
  edition: Schema.optional(Schema.String),
  slotCapacity: Schema.optional(Schema.String),
  scalingMode: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  maxSlots: Schema.optional(Schema.String),
  originalPrimaryLocation: Schema.optional(Schema.String),
})).annotate({ identifier: "Reservation" }) as any as Schema.Schema<Reservation>;

export interface ListAssignmentsResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** List of assignments visible to the user. */
  assignments?: Array<Assignment>;
}

export const ListAssignmentsResponse: Schema.Schema<ListAssignmentsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  assignments: Schema.optional(Schema.Array(Assignment)),
})).annotate({ identifier: "ListAssignmentsResponse" }) as any as Schema.Schema<ListAssignmentsResponse>;

export interface ReservationGroup {
  /** Identifier. The resource name of the reservation group, e.g., `projects/* /locations/* /reservationGroups/team1-prod`. The reservation_group_id must only contain lower case alphanumeric characters or dashes. It must start with a letter and must not end with a dash. Its maximum length is 64 characters. */
  name?: string;
}

export const ReservationGroup: Schema.Schema<ReservationGroup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ReservationGroup" }) as any as Schema.Schema<ReservationGroup>;

export interface SearchAssignmentsResponse {
  /** List of assignments visible to the user. */
  assignments?: Array<Assignment>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const SearchAssignmentsResponse: Schema.Schema<SearchAssignmentsResponse> = Schema.suspend(() => Schema.Struct({
  assignments: Schema.optional(Schema.Array(Assignment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchAssignmentsResponse" }) as any as Schema.Schema<SearchAssignmentsResponse>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface SplitCapacityCommitmentResponse {
  /** First capacity commitment, result of a split. */
  first?: CapacityCommitment;
  /** Second capacity commitment, result of a split. */
  second?: CapacityCommitment;
}

export const SplitCapacityCommitmentResponse: Schema.Schema<SplitCapacityCommitmentResponse> = Schema.suspend(() => Schema.Struct({
  first: Schema.optional(CapacityCommitment),
  second: Schema.optional(CapacityCommitment),
})).annotate({ identifier: "SplitCapacityCommitmentResponse" }) as any as Schema.Schema<SplitCapacityCommitmentResponse>;

export interface MergeCapacityCommitmentsRequest {
  /** Optional. The optional resulting capacity commitment ID. Capacity commitment name will be generated automatically if this field is empty. This field must only contain lower case alphanumeric characters or dashes. The first and last character cannot be a dash. Max length is 64 characters. */
  capacityCommitmentId?: string;
  /** Ids of capacity commitments to merge. These capacity commitments must exist under admin project and location specified in the parent. ID is the last portion of capacity commitment name e.g., 'abc' for projects/myproject/locations/US/capacityCommitments/abc */
  capacityCommitmentIds?: Array<string>;
}

export const MergeCapacityCommitmentsRequest: Schema.Schema<MergeCapacityCommitmentsRequest> = Schema.suspend(() => Schema.Struct({
  capacityCommitmentId: Schema.optional(Schema.String),
  capacityCommitmentIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "MergeCapacityCommitmentsRequest" }) as any as Schema.Schema<MergeCapacityCommitmentsRequest>;

export interface ListReservationsResponse {
  /** List of reservations visible to the user. */
  reservations?: Array<Reservation>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListReservationsResponse: Schema.Schema<ListReservationsResponse> = Schema.suspend(() => Schema.Struct({
  reservations: Schema.optional(Schema.Array(Reservation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListReservationsResponse" }) as any as Schema.Schema<ListReservationsResponse>;

export interface ListReservationGroupsResponse {
  /** List of reservations visible to the user. */
  reservationGroups?: Array<ReservationGroup>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListReservationGroupsResponse: Schema.Schema<ListReservationGroupsResponse> = Schema.suspend(() => Schema.Struct({
  reservationGroups: Schema.optional(Schema.Array(ReservationGroup)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListReservationGroupsResponse" }) as any as Schema.Schema<ListReservationGroupsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Deprecated: Looks up assignments for a specified resource for a particular region. If the request is about a project: 1. Assignments created on the project will be returned if they exist. 2. Otherwise assignments created on the closest ancestor will be returned. 3. Assignments for different JobTypes will all be returned. The same logic applies if the request is about a folder. If the request is about an organization, then assignments created on the organization will be returned (organization doesn't have ancestors). Comparing to ListAssignments, there are some behavior differences: 1. permission on the assignee will be verified in this API. 2. Hierarchy lookup (project->folder->organization) happens in this API. 3. Parent here is `projects/* /locations/*`, instead of `projects/* /locations/*reservations/*`. **Note** "-" cannot be used for projects nor locations. */
export interface SearchAssignmentsProjectsLocationsRequest {
  /** The maximum number of items to return per page. */
  pageSize?: number;
  /** Required. The resource name of the admin project(containing project and location), e.g.: `projects/myproject/locations/US`. */
  parent: string;
  /** Please specify resource name as assignee in the query. Examples: * `assignee=projects/myproject` * `assignee=folders/123` * `assignee=organizations/456` */
  query?: string;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
}

export const SearchAssignmentsProjectsLocationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}:searchAssignments" }),
  svc,
) as unknown as Schema.Schema<SearchAssignmentsProjectsLocationsRequest>;

export type SearchAssignmentsProjectsLocationsResponse = SearchAssignmentsResponse;
export const SearchAssignmentsProjectsLocationsResponse = SearchAssignmentsResponse;

export type SearchAssignmentsProjectsLocationsError = CommonErrors;

export const searchAssignmentsProjectsLocations = API.makePaginated(() => ({
  input: SearchAssignmentsProjectsLocationsRequest,
  output: SearchAssignmentsProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Looks up assignments for a specified resource for a particular region. If the request is about a project: 1. Assignments created on the project will be returned if they exist. 2. Otherwise assignments created on the closest ancestor will be returned. 3. Assignments for different JobTypes will all be returned. The same logic applies if the request is about a folder. If the request is about an organization, then assignments created on the organization will be returned (organization doesn't have ancestors). Comparing to ListAssignments, there are some behavior differences: 1. permission on the assignee will be verified in this API. 2. Hierarchy lookup (project->folder->organization) happens in this API. 3. Parent here is `projects/* /locations/*`, instead of `projects/* /locations/*reservations/*`. */
export interface SearchAllAssignmentsProjectsLocationsRequest {
  /** Please specify resource name as assignee in the query. Examples: * `assignee=projects/myproject` * `assignee=folders/123` * `assignee=organizations/456` */
  query?: string;
  /** Required. The resource name with location (project name could be the wildcard '-'), e.g.: `projects/-/locations/US`. */
  parent: string;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** The maximum number of items to return per page. */
  pageSize?: number;
}

export const SearchAllAssignmentsProjectsLocationsRequest = Schema.Struct({
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}:searchAllAssignments" }),
  svc,
) as unknown as Schema.Schema<SearchAllAssignmentsProjectsLocationsRequest>;

export type SearchAllAssignmentsProjectsLocationsResponse = SearchAllAssignmentsResponse;
export const SearchAllAssignmentsProjectsLocationsResponse = SearchAllAssignmentsResponse;

export type SearchAllAssignmentsProjectsLocationsError = CommonErrors;

export const searchAllAssignmentsProjectsLocations = API.makePaginated(() => ({
  input: SearchAllAssignmentsProjectsLocationsRequest,
  output: SearchAllAssignmentsProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a BI reservation. Only fields specified in the `field_mask` are updated. A singleton BI reservation always exists with default size 0. In order to reserve BI capacity it needs to be updated to an amount greater than 0. In order to release BI capacity reservation size must be set to 0. */
export interface UpdateBiReservationProjectsLocationsRequest {
  /** A list of fields to be updated in this request. */
  updateMask?: string;
  /** Identifier. The resource name of the singleton BI reservation. Reservation names have the form `projects/{project_id}/locations/{location_id}/biReservation`. */
  name: string;
  /** Request body */
  body?: BiReservation;
}

export const UpdateBiReservationProjectsLocationsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(BiReservation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/biReservation", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateBiReservationProjectsLocationsRequest>;

export type UpdateBiReservationProjectsLocationsResponse = BiReservation;
export const UpdateBiReservationProjectsLocationsResponse = BiReservation;

export type UpdateBiReservationProjectsLocationsError = CommonErrors;

export const updateBiReservationProjectsLocations: API.OperationMethod<UpdateBiReservationProjectsLocationsRequest, UpdateBiReservationProjectsLocationsResponse, UpdateBiReservationProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateBiReservationProjectsLocationsRequest,
  output: UpdateBiReservationProjectsLocationsResponse,
  errors: [],
}));

/** Retrieves a BI reservation. */
export interface GetBiReservationProjectsLocationsRequest {
  /** Required. Name of the requested reservation, for example: `projects/{project_id}/locations/{location_id}/biReservation` */
  name: string;
}

export const GetBiReservationProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/biReservation" }),
  svc,
) as unknown as Schema.Schema<GetBiReservationProjectsLocationsRequest>;

export type GetBiReservationProjectsLocationsResponse = BiReservation;
export const GetBiReservationProjectsLocationsResponse = BiReservation;

export type GetBiReservationProjectsLocationsError = CommonErrors;

export const getBiReservationProjectsLocations: API.OperationMethod<GetBiReservationProjectsLocationsRequest, GetBiReservationProjectsLocationsResponse, GetBiReservationProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBiReservationProjectsLocationsRequest,
  output: GetBiReservationProjectsLocationsResponse,
  errors: [],
}));

/** Creates a new capacity commitment resource. */
export interface CreateProjectsLocationsCapacityCommitmentsRequest {
  /** The optional capacity commitment ID. Capacity commitment name will be generated automatically if this field is empty. This field must only contain lower case alphanumeric characters or dashes. The first and last character cannot be a dash. Max length is 64 characters. NOTE: this ID won't be kept if the capacity commitment is split or merged. */
  capacityCommitmentId?: string;
  /** Required. Resource name of the parent reservation. E.g., `projects/myproject/locations/US` */
  parent: string;
  /** If true, fail the request if another project in the organization has a capacity commitment. */
  enforceSingleAdminProjectPerOrg?: boolean;
  /** Request body */
  body?: CapacityCommitment;
}

export const CreateProjectsLocationsCapacityCommitmentsRequest = Schema.Struct({
  capacityCommitmentId: Schema.optional(Schema.String).pipe(T.HttpQuery("capacityCommitmentId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  enforceSingleAdminProjectPerOrg: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enforceSingleAdminProjectPerOrg")),
  body: Schema.optional(CapacityCommitment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/capacityCommitments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCapacityCommitmentsRequest>;

export type CreateProjectsLocationsCapacityCommitmentsResponse = CapacityCommitment;
export const CreateProjectsLocationsCapacityCommitmentsResponse = CapacityCommitment;

export type CreateProjectsLocationsCapacityCommitmentsError = CommonErrors;

export const createProjectsLocationsCapacityCommitments: API.OperationMethod<CreateProjectsLocationsCapacityCommitmentsRequest, CreateProjectsLocationsCapacityCommitmentsResponse, CreateProjectsLocationsCapacityCommitmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCapacityCommitmentsRequest,
  output: CreateProjectsLocationsCapacityCommitmentsResponse,
  errors: [],
}));

/** Returns information about the capacity commitment. */
export interface GetProjectsLocationsCapacityCommitmentsRequest {
  /** Required. Resource name of the capacity commitment to retrieve. E.g., `projects/myproject/locations/US/capacityCommitments/123` */
  name: string;
}

export const GetProjectsLocationsCapacityCommitmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/capacityCommitments/{capacityCommitmentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCapacityCommitmentsRequest>;

export type GetProjectsLocationsCapacityCommitmentsResponse = CapacityCommitment;
export const GetProjectsLocationsCapacityCommitmentsResponse = CapacityCommitment;

export type GetProjectsLocationsCapacityCommitmentsError = CommonErrors;

export const getProjectsLocationsCapacityCommitments: API.OperationMethod<GetProjectsLocationsCapacityCommitmentsRequest, GetProjectsLocationsCapacityCommitmentsResponse, GetProjectsLocationsCapacityCommitmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCapacityCommitmentsRequest,
  output: GetProjectsLocationsCapacityCommitmentsResponse,
  errors: [],
}));

/** Updates an existing capacity commitment. Only `plan` and `renewal_plan` fields can be updated. Plan can only be changed to a plan of a longer commitment period. Attempting to change to a plan with shorter commitment period will fail with the error code `google.rpc.Code.FAILED_PRECONDITION`. */
export interface PatchProjectsLocationsCapacityCommitmentsRequest {
  /** Standard field mask for the set of fields to be updated. */
  updateMask?: string;
  /** Output only. The resource name of the capacity commitment, e.g., `projects/myproject/locations/US/capacityCommitments/123` The commitment_id must only contain lower case alphanumeric characters or dashes. It must start with a letter and must not end with a dash. Its maximum length is 64 characters. */
  name: string;
  /** Request body */
  body?: CapacityCommitment;
}

export const PatchProjectsLocationsCapacityCommitmentsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CapacityCommitment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/capacityCommitments/{capacityCommitmentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCapacityCommitmentsRequest>;

export type PatchProjectsLocationsCapacityCommitmentsResponse = CapacityCommitment;
export const PatchProjectsLocationsCapacityCommitmentsResponse = CapacityCommitment;

export type PatchProjectsLocationsCapacityCommitmentsError = CommonErrors;

export const patchProjectsLocationsCapacityCommitments: API.OperationMethod<PatchProjectsLocationsCapacityCommitmentsRequest, PatchProjectsLocationsCapacityCommitmentsResponse, PatchProjectsLocationsCapacityCommitmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCapacityCommitmentsRequest,
  output: PatchProjectsLocationsCapacityCommitmentsResponse,
  errors: [],
}));

/** Splits capacity commitment to two commitments of the same plan and `commitment_end_time`. A common use case is to enable downgrading commitments. For example, in order to downgrade from 10000 slots to 8000, you might split a 10000 capacity commitment into commitments of 2000 and 8000. Then, you delete the first one after the commitment end time passes. */
export interface SplitProjectsLocationsCapacityCommitmentsRequest {
  /** Required. The resource name e.g.,: `projects/myproject/locations/US/capacityCommitments/123` */
  name: string;
  /** Request body */
  body?: SplitCapacityCommitmentRequest;
}

export const SplitProjectsLocationsCapacityCommitmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SplitCapacityCommitmentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/capacityCommitments/{capacityCommitmentsId}:split", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SplitProjectsLocationsCapacityCommitmentsRequest>;

export type SplitProjectsLocationsCapacityCommitmentsResponse = SplitCapacityCommitmentResponse;
export const SplitProjectsLocationsCapacityCommitmentsResponse = SplitCapacityCommitmentResponse;

export type SplitProjectsLocationsCapacityCommitmentsError = CommonErrors;

export const splitProjectsLocationsCapacityCommitments: API.OperationMethod<SplitProjectsLocationsCapacityCommitmentsRequest, SplitProjectsLocationsCapacityCommitmentsResponse, SplitProjectsLocationsCapacityCommitmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SplitProjectsLocationsCapacityCommitmentsRequest,
  output: SplitProjectsLocationsCapacityCommitmentsResponse,
  errors: [],
}));

/** Deletes a capacity commitment. Attempting to delete capacity commitment before its commitment_end_time will fail with the error code `google.rpc.Code.FAILED_PRECONDITION`. */
export interface DeleteProjectsLocationsCapacityCommitmentsRequest {
  /** Required. Resource name of the capacity commitment to delete. E.g., `projects/myproject/locations/US/capacityCommitments/123` */
  name: string;
  /** Can be used to force delete commitments even if assignments exist. Deleting commitments with assignments may cause queries to fail if they no longer have access to slots. */
  force?: boolean;
}

export const DeleteProjectsLocationsCapacityCommitmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/capacityCommitments/{capacityCommitmentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsCapacityCommitmentsRequest>;

export type DeleteProjectsLocationsCapacityCommitmentsResponse = Empty;
export const DeleteProjectsLocationsCapacityCommitmentsResponse = Empty;

export type DeleteProjectsLocationsCapacityCommitmentsError = CommonErrors;

export const deleteProjectsLocationsCapacityCommitments: API.OperationMethod<DeleteProjectsLocationsCapacityCommitmentsRequest, DeleteProjectsLocationsCapacityCommitmentsResponse, DeleteProjectsLocationsCapacityCommitmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsCapacityCommitmentsRequest,
  output: DeleteProjectsLocationsCapacityCommitmentsResponse,
  errors: [],
}));

/** Lists all the capacity commitments for the admin project. */
export interface ListProjectsLocationsCapacityCommitmentsRequest {
  /** The maximum number of items to return. */
  pageSize?: number;
  /** Required. Resource name of the parent reservation. E.g., `projects/myproject/locations/US` */
  parent: string;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsCapacityCommitmentsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/capacityCommitments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCapacityCommitmentsRequest>;

export type ListProjectsLocationsCapacityCommitmentsResponse = ListCapacityCommitmentsResponse;
export const ListProjectsLocationsCapacityCommitmentsResponse = ListCapacityCommitmentsResponse;

export type ListProjectsLocationsCapacityCommitmentsError = CommonErrors;

export const listProjectsLocationsCapacityCommitments = API.makePaginated(() => ({
  input: ListProjectsLocationsCapacityCommitmentsRequest,
  output: ListProjectsLocationsCapacityCommitmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Merges capacity commitments of the same plan into a single commitment. The resulting capacity commitment has the greater commitment_end_time out of the to-be-merged capacity commitments. Attempting to merge capacity commitments of different plan will fail with the error code `google.rpc.Code.FAILED_PRECONDITION`. */
export interface MergeProjectsLocationsCapacityCommitmentsRequest {
  /** Parent resource that identifies admin project and location e.g., `projects/myproject/locations/us` */
  parent: string;
  /** Request body */
  body?: MergeCapacityCommitmentsRequest;
}

export const MergeProjectsLocationsCapacityCommitmentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(MergeCapacityCommitmentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/capacityCommitments:merge", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MergeProjectsLocationsCapacityCommitmentsRequest>;

export type MergeProjectsLocationsCapacityCommitmentsResponse = CapacityCommitment;
export const MergeProjectsLocationsCapacityCommitmentsResponse = CapacityCommitment;

export type MergeProjectsLocationsCapacityCommitmentsError = CommonErrors;

export const mergeProjectsLocationsCapacityCommitments: API.OperationMethod<MergeProjectsLocationsCapacityCommitmentsRequest, MergeProjectsLocationsCapacityCommitmentsResponse, MergeProjectsLocationsCapacityCommitmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MergeProjectsLocationsCapacityCommitmentsRequest,
  output: MergeProjectsLocationsCapacityCommitmentsResponse,
  errors: [],
}));

/** Creates a new reservation group. */
export interface CreateProjectsLocationsReservationGroupsRequest {
  /** Required. Project, location. E.g., `projects/myproject/locations/US` */
  parent: string;
  /** Required. The reservation group ID. It must only contain lower case alphanumeric characters or dashes. It must start with a letter and must not end with a dash. Its maximum length is 64 characters. */
  reservationGroupId?: string;
  /** Request body */
  body?: ReservationGroup;
}

export const CreateProjectsLocationsReservationGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  reservationGroupId: Schema.optional(Schema.String).pipe(T.HttpQuery("reservationGroupId")),
  body: Schema.optional(ReservationGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/reservationGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsReservationGroupsRequest>;

export type CreateProjectsLocationsReservationGroupsResponse = ReservationGroup;
export const CreateProjectsLocationsReservationGroupsResponse = ReservationGroup;

export type CreateProjectsLocationsReservationGroupsError = CommonErrors;

export const createProjectsLocationsReservationGroups: API.OperationMethod<CreateProjectsLocationsReservationGroupsRequest, CreateProjectsLocationsReservationGroupsResponse, CreateProjectsLocationsReservationGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsReservationGroupsRequest,
  output: CreateProjectsLocationsReservationGroupsResponse,
  errors: [],
}));

/** Returns information about the reservation group. */
export interface GetProjectsLocationsReservationGroupsRequest {
  /** Required. Resource name of the reservation group to retrieve. E.g., `projects/myproject/locations/US/reservationGroups/team1-prod` */
  name: string;
}

export const GetProjectsLocationsReservationGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/reservationGroups/{reservationGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsReservationGroupsRequest>;

export type GetProjectsLocationsReservationGroupsResponse = ReservationGroup;
export const GetProjectsLocationsReservationGroupsResponse = ReservationGroup;

export type GetProjectsLocationsReservationGroupsError = CommonErrors;

export const getProjectsLocationsReservationGroups: API.OperationMethod<GetProjectsLocationsReservationGroupsRequest, GetProjectsLocationsReservationGroupsResponse, GetProjectsLocationsReservationGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsReservationGroupsRequest,
  output: GetProjectsLocationsReservationGroupsResponse,
  errors: [],
}));

/** Lists all the reservation groups for the project in the specified location. */
export interface ListProjectsLocationsReservationGroupsRequest {
  /** Required. The parent resource name containing project and location, e.g.: `projects/myproject/locations/US` */
  parent: string;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** The maximum number of items to return per page. */
  pageSize?: number;
}

export const ListProjectsLocationsReservationGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/reservationGroups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsReservationGroupsRequest>;

export type ListProjectsLocationsReservationGroupsResponse = ListReservationGroupsResponse;
export const ListProjectsLocationsReservationGroupsResponse = ListReservationGroupsResponse;

export type ListProjectsLocationsReservationGroupsError = CommonErrors;

export const listProjectsLocationsReservationGroups = API.makePaginated(() => ({
  input: ListProjectsLocationsReservationGroupsRequest,
  output: ListProjectsLocationsReservationGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a reservation. Returns `google.rpc.Code.FAILED_PRECONDITION` when reservation has assignments. */
export interface DeleteProjectsLocationsReservationGroupsRequest {
  /** Required. Resource name of the reservation group to retrieve. E.g., `projects/myproject/locations/US/reservationGroups/team1-prod` */
  name: string;
}

export const DeleteProjectsLocationsReservationGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/reservationGroups/{reservationGroupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsReservationGroupsRequest>;

export type DeleteProjectsLocationsReservationGroupsResponse = Empty;
export const DeleteProjectsLocationsReservationGroupsResponse = Empty;

export type DeleteProjectsLocationsReservationGroupsError = CommonErrors;

export const deleteProjectsLocationsReservationGroups: API.OperationMethod<DeleteProjectsLocationsReservationGroupsRequest, DeleteProjectsLocationsReservationGroupsResponse, DeleteProjectsLocationsReservationGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsReservationGroupsRequest,
  output: DeleteProjectsLocationsReservationGroupsResponse,
  errors: [],
}));

/** Sets an access control policy for a resource. Replaces any existing policy. Supported resources are: - Reservations To call this method, you must have the following Google IAM permissions: - `bigqueryreservation.reservations.setIamPolicy` to set policies on reservations. */
export interface SetIamPolicyProjectsLocationsReservationsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsReservationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsReservationsRequest>;

export type SetIamPolicyProjectsLocationsReservationsResponse = Policy;
export const SetIamPolicyProjectsLocationsReservationsResponse = Policy;

export type SetIamPolicyProjectsLocationsReservationsError = CommonErrors;

export const setIamPolicyProjectsLocationsReservations: API.OperationMethod<SetIamPolicyProjectsLocationsReservationsRequest, SetIamPolicyProjectsLocationsReservationsResponse, SetIamPolicyProjectsLocationsReservationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsReservationsRequest,
  output: SetIamPolicyProjectsLocationsReservationsResponse,
  errors: [],
}));

/** Returns information about the reservation. */
export interface GetProjectsLocationsReservationsRequest {
  /** Required. Resource name of the reservation to retrieve. E.g., `projects/myproject/locations/US/reservations/team1-prod` */
  name: string;
}

export const GetProjectsLocationsReservationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsReservationsRequest>;

export type GetProjectsLocationsReservationsResponse = Reservation;
export const GetProjectsLocationsReservationsResponse = Reservation;

export type GetProjectsLocationsReservationsError = CommonErrors;

export const getProjectsLocationsReservations: API.OperationMethod<GetProjectsLocationsReservationsRequest, GetProjectsLocationsReservationsResponse, GetProjectsLocationsReservationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsReservationsRequest,
  output: GetProjectsLocationsReservationsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. May return: * A`NOT_FOUND` error if the resource doesn't exist or you don't have the permission to view it. * An empty policy if the resource exists but doesn't have a set policy. Supported resources are: - Reservations - ReservationAssignments To call this method, you must have the following Google IAM permissions: - `bigqueryreservation.reservations.getIamPolicy` to get policies on reservations. */
export interface GetIamPolicyProjectsLocationsReservationsRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsReservationsRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsReservationsRequest>;

export type GetIamPolicyProjectsLocationsReservationsResponse = Policy;
export const GetIamPolicyProjectsLocationsReservationsResponse = Policy;

export type GetIamPolicyProjectsLocationsReservationsError = CommonErrors;

export const getIamPolicyProjectsLocationsReservations: API.OperationMethod<GetIamPolicyProjectsLocationsReservationsRequest, GetIamPolicyProjectsLocationsReservationsResponse, GetIamPolicyProjectsLocationsReservationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsReservationsRequest,
  output: GetIamPolicyProjectsLocationsReservationsResponse,
  errors: [],
}));

/** Creates a new reservation resource. */
export interface CreateProjectsLocationsReservationsRequest {
  /** The reservation ID. It must only contain lower case alphanumeric characters or dashes. It must start with a letter and must not end with a dash. Its maximum length is 64 characters. */
  reservationId?: string;
  /** Required. Project, location. E.g., `projects/myproject/locations/US` */
  parent: string;
  /** Request body */
  body?: Reservation;
}

export const CreateProjectsLocationsReservationsRequest = Schema.Struct({
  reservationId: Schema.optional(Schema.String).pipe(T.HttpQuery("reservationId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Reservation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/reservations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsReservationsRequest>;

export type CreateProjectsLocationsReservationsResponse = Reservation;
export const CreateProjectsLocationsReservationsResponse = Reservation;

export type CreateProjectsLocationsReservationsError = CommonErrors;

export const createProjectsLocationsReservations: API.OperationMethod<CreateProjectsLocationsReservationsRequest, CreateProjectsLocationsReservationsResponse, CreateProjectsLocationsReservationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsReservationsRequest,
  output: CreateProjectsLocationsReservationsResponse,
  errors: [],
}));

/** Gets your permissions on a resource. Returns an empty set of permissions if the resource doesn't exist. Supported resources are: - Reservations No Google IAM permissions are required to call this method. */
export interface TestIamPermissionsProjectsLocationsReservationsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsReservationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsReservationsRequest>;

export type TestIamPermissionsProjectsLocationsReservationsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsReservationsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsReservationsError = CommonErrors;

export const testIamPermissionsProjectsLocationsReservations: API.OperationMethod<TestIamPermissionsProjectsLocationsReservationsRequest, TestIamPermissionsProjectsLocationsReservationsResponse, TestIamPermissionsProjectsLocationsReservationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsReservationsRequest,
  output: TestIamPermissionsProjectsLocationsReservationsResponse,
  errors: [],
}));

/** Fail over a reservation to the secondary location. The operation should be done in the current secondary location, which will be promoted to the new primary location for the reservation. Attempting to failover a reservation in the current primary location will fail with the error code `google.rpc.Code.FAILED_PRECONDITION`. */
export interface FailoverReservationProjectsLocationsReservationsRequest {
  /** Required. Resource name of the reservation to failover. E.g., `projects/myproject/locations/US/reservations/team1-prod` */
  name: string;
  /** Request body */
  body?: FailoverReservationRequest;
}

export const FailoverReservationProjectsLocationsReservationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(FailoverReservationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}:failoverReservation", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FailoverReservationProjectsLocationsReservationsRequest>;

export type FailoverReservationProjectsLocationsReservationsResponse = Reservation;
export const FailoverReservationProjectsLocationsReservationsResponse = Reservation;

export type FailoverReservationProjectsLocationsReservationsError = CommonErrors;

export const failoverReservationProjectsLocationsReservations: API.OperationMethod<FailoverReservationProjectsLocationsReservationsRequest, FailoverReservationProjectsLocationsReservationsResponse, FailoverReservationProjectsLocationsReservationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FailoverReservationProjectsLocationsReservationsRequest,
  output: FailoverReservationProjectsLocationsReservationsResponse,
  errors: [],
}));

/** Deletes a reservation. Returns `google.rpc.Code.FAILED_PRECONDITION` when reservation has assignments. */
export interface DeleteProjectsLocationsReservationsRequest {
  /** Required. Resource name of the reservation to retrieve. E.g., `projects/myproject/locations/US/reservations/team1-prod` */
  name: string;
}

export const DeleteProjectsLocationsReservationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsReservationsRequest>;

export type DeleteProjectsLocationsReservationsResponse = Empty;
export const DeleteProjectsLocationsReservationsResponse = Empty;

export type DeleteProjectsLocationsReservationsError = CommonErrors;

export const deleteProjectsLocationsReservations: API.OperationMethod<DeleteProjectsLocationsReservationsRequest, DeleteProjectsLocationsReservationsResponse, DeleteProjectsLocationsReservationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsReservationsRequest,
  output: DeleteProjectsLocationsReservationsResponse,
  errors: [],
}));

/** Updates an existing reservation resource. */
export interface PatchProjectsLocationsReservationsRequest {
  /** Standard field mask for the set of fields to be updated. */
  updateMask?: string;
  /** Identifier. The resource name of the reservation, e.g., `projects/* /locations/* /reservations/team1-prod`. The reservation_id must only contain lower case alphanumeric characters or dashes. It must start with a letter and must not end with a dash. Its maximum length is 64 characters. */
  name: string;
  /** Request body */
  body?: Reservation;
}

export const PatchProjectsLocationsReservationsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Reservation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsReservationsRequest>;

export type PatchProjectsLocationsReservationsResponse = Reservation;
export const PatchProjectsLocationsReservationsResponse = Reservation;

export type PatchProjectsLocationsReservationsError = CommonErrors;

export const patchProjectsLocationsReservations: API.OperationMethod<PatchProjectsLocationsReservationsRequest, PatchProjectsLocationsReservationsResponse, PatchProjectsLocationsReservationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsReservationsRequest,
  output: PatchProjectsLocationsReservationsResponse,
  errors: [],
}));

/** Lists all the reservations for the project in the specified location. */
export interface ListProjectsLocationsReservationsRequest {
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Required. The parent resource name containing project and location, e.g.: `projects/myproject/locations/US` */
  parent: string;
  /** The maximum number of items to return per page. */
  pageSize?: number;
}

export const ListProjectsLocationsReservationsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/reservations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsReservationsRequest>;

export type ListProjectsLocationsReservationsResponse = ListReservationsResponse;
export const ListProjectsLocationsReservationsResponse = ListReservationsResponse;

export type ListProjectsLocationsReservationsError = CommonErrors;

export const listProjectsLocationsReservations = API.makePaginated(() => ({
  input: ListProjectsLocationsReservationsRequest,
  output: ListProjectsLocationsReservationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing assignment. Only the `priority` field can be updated. */
export interface PatchProjectsLocationsReservationsAssignmentsRequest {
  /** Output only. Name of the resource. E.g.: `projects/myproject/locations/US/reservations/team1-prod/assignments/123`. The assignment_id must only contain lower case alphanumeric characters or dashes and the max length is 64 characters. */
  name: string;
  /** Standard field mask for the set of fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: Assignment;
}

export const PatchProjectsLocationsReservationsAssignmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Assignment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}/assignments/{assignmentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsReservationsAssignmentsRequest>;

export type PatchProjectsLocationsReservationsAssignmentsResponse = Assignment;
export const PatchProjectsLocationsReservationsAssignmentsResponse = Assignment;

export type PatchProjectsLocationsReservationsAssignmentsError = CommonErrors;

export const patchProjectsLocationsReservationsAssignments: API.OperationMethod<PatchProjectsLocationsReservationsAssignmentsRequest, PatchProjectsLocationsReservationsAssignmentsResponse, PatchProjectsLocationsReservationsAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsReservationsAssignmentsRequest,
  output: PatchProjectsLocationsReservationsAssignmentsResponse,
  errors: [],
}));

/** Deletes a assignment. No expansion will happen. Example: * Organization `organizationA` contains two projects, `project1` and `project2`. * Reservation `res1` exists and was created previously. * CreateAssignment was used previously to define the following associations between entities and reservations: `` and `` In this example, deletion of the `` assignment won't affect the other assignment ``. After said deletion, queries from `project1` will still use `res1` while queries from `project2` will switch to use on-demand mode. */
export interface DeleteProjectsLocationsReservationsAssignmentsRequest {
  /** Required. Name of the resource, e.g. `projects/myproject/locations/US/reservations/team1-prod/assignments/123` */
  name: string;
}

export const DeleteProjectsLocationsReservationsAssignmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}/assignments/{assignmentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsReservationsAssignmentsRequest>;

export type DeleteProjectsLocationsReservationsAssignmentsResponse = Empty;
export const DeleteProjectsLocationsReservationsAssignmentsResponse = Empty;

export type DeleteProjectsLocationsReservationsAssignmentsError = CommonErrors;

export const deleteProjectsLocationsReservationsAssignments: API.OperationMethod<DeleteProjectsLocationsReservationsAssignmentsRequest, DeleteProjectsLocationsReservationsAssignmentsResponse, DeleteProjectsLocationsReservationsAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsReservationsAssignmentsRequest,
  output: DeleteProjectsLocationsReservationsAssignmentsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. May return: * A`NOT_FOUND` error if the resource doesn't exist or you don't have the permission to view it. * An empty policy if the resource exists but doesn't have a set policy. Supported resources are: - Reservations - ReservationAssignments To call this method, you must have the following Google IAM permissions: - `bigqueryreservation.reservations.getIamPolicy` to get policies on reservations. */
export interface GetIamPolicyProjectsLocationsReservationsAssignmentsRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsReservationsAssignmentsRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}/assignments/{assignmentsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsReservationsAssignmentsRequest>;

export type GetIamPolicyProjectsLocationsReservationsAssignmentsResponse = Policy;
export const GetIamPolicyProjectsLocationsReservationsAssignmentsResponse = Policy;

export type GetIamPolicyProjectsLocationsReservationsAssignmentsError = CommonErrors;

export const getIamPolicyProjectsLocationsReservationsAssignments: API.OperationMethod<GetIamPolicyProjectsLocationsReservationsAssignmentsRequest, GetIamPolicyProjectsLocationsReservationsAssignmentsResponse, GetIamPolicyProjectsLocationsReservationsAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsReservationsAssignmentsRequest,
  output: GetIamPolicyProjectsLocationsReservationsAssignmentsResponse,
  errors: [],
}));

/** Gets your permissions on a resource. Returns an empty set of permissions if the resource doesn't exist. Supported resources are: - Reservations No Google IAM permissions are required to call this method. */
export interface TestIamPermissionsProjectsLocationsReservationsAssignmentsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsReservationsAssignmentsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}/assignments/{assignmentsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsReservationsAssignmentsRequest>;

export type TestIamPermissionsProjectsLocationsReservationsAssignmentsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsReservationsAssignmentsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsReservationsAssignmentsError = CommonErrors;

export const testIamPermissionsProjectsLocationsReservationsAssignments: API.OperationMethod<TestIamPermissionsProjectsLocationsReservationsAssignmentsRequest, TestIamPermissionsProjectsLocationsReservationsAssignmentsResponse, TestIamPermissionsProjectsLocationsReservationsAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsReservationsAssignmentsRequest,
  output: TestIamPermissionsProjectsLocationsReservationsAssignmentsResponse,
  errors: [],
}));

/** Creates an assignment object which allows the given project to submit jobs of a certain type using slots from the specified reservation. Currently a resource (project, folder, organization) can only have one assignment per each (job_type, location) combination, and that reservation will be used for all jobs of the matching type. Different assignments can be created on different levels of the projects, folders or organization hierarchy. During query execution, the assignment is looked up at the project, folder and organization levels in that order. The first assignment found is applied to the query. When creating assignments, it does not matter if other assignments exist at higher levels. Example: * The organization `organizationA` contains two projects, `project1` and `project2`. * Assignments for all three entities (`organizationA`, `project1`, and `project2`) could all be created and mapped to the same or different reservations. "None" assignments represent an absence of the assignment. Projects assigned to None use on-demand pricing. To create a "None" assignment, use "none" as a reservation_id in the parent. Example parent: `projects/myproject/locations/US/reservations/none`. Returns `google.rpc.Code.PERMISSION_DENIED` if user does not have 'bigquery.admin' permissions on the project using the reservation and the project that owns this reservation. Returns `google.rpc.Code.INVALID_ARGUMENT` when location of the assignment does not match location of the reservation. */
export interface CreateProjectsLocationsReservationsAssignmentsRequest {
  /** Required. The parent resource name of the assignment E.g. `projects/myproject/locations/US/reservations/team1-prod` */
  parent: string;
  /** The optional assignment ID. Assignment name will be generated automatically if this field is empty. This field must only contain lower case alphanumeric characters or dashes. Max length is 64 characters. */
  assignmentId?: string;
  /** Request body */
  body?: Assignment;
}

export const CreateProjectsLocationsReservationsAssignmentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  assignmentId: Schema.optional(Schema.String).pipe(T.HttpQuery("assignmentId")),
  body: Schema.optional(Assignment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}/assignments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsReservationsAssignmentsRequest>;

export type CreateProjectsLocationsReservationsAssignmentsResponse = Assignment;
export const CreateProjectsLocationsReservationsAssignmentsResponse = Assignment;

export type CreateProjectsLocationsReservationsAssignmentsError = CommonErrors;

export const createProjectsLocationsReservationsAssignments: API.OperationMethod<CreateProjectsLocationsReservationsAssignmentsRequest, CreateProjectsLocationsReservationsAssignmentsResponse, CreateProjectsLocationsReservationsAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsReservationsAssignmentsRequest,
  output: CreateProjectsLocationsReservationsAssignmentsResponse,
  errors: [],
}));

/** Moves an assignment under a new reservation. This differs from removing an existing assignment and recreating a new one by providing a transactional change that ensures an assignee always has an associated reservation. */
export interface MoveProjectsLocationsReservationsAssignmentsRequest {
  /** Required. The resource name of the assignment, e.g. `projects/myproject/locations/US/reservations/team1-prod/assignments/123` */
  name: string;
  /** Request body */
  body?: MoveAssignmentRequest;
}

export const MoveProjectsLocationsReservationsAssignmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(MoveAssignmentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}/assignments/{assignmentsId}:move", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveProjectsLocationsReservationsAssignmentsRequest>;

export type MoveProjectsLocationsReservationsAssignmentsResponse = Assignment;
export const MoveProjectsLocationsReservationsAssignmentsResponse = Assignment;

export type MoveProjectsLocationsReservationsAssignmentsError = CommonErrors;

export const moveProjectsLocationsReservationsAssignments: API.OperationMethod<MoveProjectsLocationsReservationsAssignmentsRequest, MoveProjectsLocationsReservationsAssignmentsResponse, MoveProjectsLocationsReservationsAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveProjectsLocationsReservationsAssignmentsRequest,
  output: MoveProjectsLocationsReservationsAssignmentsResponse,
  errors: [],
}));

/** Lists assignments. Only explicitly created assignments will be returned. Example: * Organization `organizationA` contains two projects, `project1` and `project2`. * Reservation `res1` exists and was created previously. * CreateAssignment was used previously to define the following associations between entities and reservations: `` and `` In this example, ListAssignments will just return the above two assignments for reservation `res1`, and no expansion/merge will happen. The wildcard "-" can be used for reservations in the request. In that case all assignments belongs to the specified project and location will be listed. **Note** "-" cannot be used for projects nor locations. */
export interface ListProjectsLocationsReservationsAssignmentsRequest {
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** The maximum number of items to return per page. */
  pageSize?: number;
  /** Required. The parent resource name e.g.: `projects/myproject/locations/US/reservations/team1-prod` Or: `projects/myproject/locations/US/reservations/-` */
  parent: string;
}

export const ListProjectsLocationsReservationsAssignmentsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}/assignments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsReservationsAssignmentsRequest>;

export type ListProjectsLocationsReservationsAssignmentsResponse = ListAssignmentsResponse;
export const ListProjectsLocationsReservationsAssignmentsResponse = ListAssignmentsResponse;

export type ListProjectsLocationsReservationsAssignmentsError = CommonErrors;

export const listProjectsLocationsReservationsAssignments = API.makePaginated(() => ({
  input: ListProjectsLocationsReservationsAssignmentsRequest,
  output: ListProjectsLocationsReservationsAssignmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Sets an access control policy for a resource. Replaces any existing policy. Supported resources are: - Reservations To call this method, you must have the following Google IAM permissions: - `bigqueryreservation.reservations.setIamPolicy` to set policies on reservations. */
export interface SetIamPolicyProjectsLocationsReservationsAssignmentsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsReservationsAssignmentsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}/assignments/{assignmentsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsReservationsAssignmentsRequest>;

export type SetIamPolicyProjectsLocationsReservationsAssignmentsResponse = Policy;
export const SetIamPolicyProjectsLocationsReservationsAssignmentsResponse = Policy;

export type SetIamPolicyProjectsLocationsReservationsAssignmentsError = CommonErrors;

export const setIamPolicyProjectsLocationsReservationsAssignments: API.OperationMethod<SetIamPolicyProjectsLocationsReservationsAssignmentsRequest, SetIamPolicyProjectsLocationsReservationsAssignmentsResponse, SetIamPolicyProjectsLocationsReservationsAssignmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsReservationsAssignmentsRequest,
  output: SetIamPolicyProjectsLocationsReservationsAssignmentsResponse,
  errors: [],
}));

