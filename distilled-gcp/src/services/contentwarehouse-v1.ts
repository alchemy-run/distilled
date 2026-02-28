// ==========================================================================
// Document AI Warehouse API (contentwarehouse v1)
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
  name: "contentwarehouse",
  version: "v1",
  rootUrl: "https://contentwarehouse.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface CloudAiPlatformTenantresourceInfraSpannerConfigCreateDatabaseOptions {
  /** The cloud resource name for the CMEK encryption. For example, projects//locations/ */
  cmekCloudResourceName?: string;
  /** The service name for the CMEK encryption. For example, contentwarehouse.googleapis.com */
  cmekServiceName?: string;
  /** The cloud resource type for the CMEK encryption. For example, contentwarehouse.googleapis.com/Location */
  cmekCloudResourceType?: string;
}

export const CloudAiPlatformTenantresourceInfraSpannerConfigCreateDatabaseOptions: Schema.Schema<CloudAiPlatformTenantresourceInfraSpannerConfigCreateDatabaseOptions> = Schema.suspend(() => Schema.Struct({
  cmekCloudResourceName: Schema.optional(Schema.String),
  cmekServiceName: Schema.optional(Schema.String),
  cmekCloudResourceType: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudAiPlatformTenantresourceInfraSpannerConfigCreateDatabaseOptions" }) as any as Schema.Schema<CloudAiPlatformTenantresourceInfraSpannerConfigCreateDatabaseOptions>;

export interface CloudAiPlatformTenantresourceInfraSpannerConfig {
  /** Input [Optional]. The KMS key name or the KMS grant name used for CMEK encryption. Only set this field when provisioning new Infra Spanner databases. For existing Infra Spanner databases, this field will be ignored because CMEK re-encryption is not supported. For example, projects//locations//keyRings//cryptoKeys/ */
  kmsKeyReference?: string;
  /** Input [Required]. Every database in Spanner can be identified by the following path name: /span//: */
  spannerUniverse?: string;
  /** Input [Optional]. The options to create a spanner database. Note: give the right options to ensure the right KMS key access audit logging and AxT logging in expected logging category. */
  createDatabaseOptions?: CloudAiPlatformTenantresourceInfraSpannerConfigCreateDatabaseOptions;
  spannerLocalNamePrefix?: string;
  spannerNamespace?: string;
  /** Input [Optional]. The spanner borg service account for delegating the kms key to. For example, spanner-infra-cmek-nonprod@system.gserviceaccount.com, for the nonprod universe. */
  spannerBorgServiceAccount?: string;
  /** Input [Required]. The file path to the spanner SDL bundle. */
  sdlBundlePath?: string;
}

export const CloudAiPlatformTenantresourceInfraSpannerConfig: Schema.Schema<CloudAiPlatformTenantresourceInfraSpannerConfig> = Schema.suspend(() => Schema.Struct({
  kmsKeyReference: Schema.optional(Schema.String),
  spannerUniverse: Schema.optional(Schema.String),
  createDatabaseOptions: Schema.optional(CloudAiPlatformTenantresourceInfraSpannerConfigCreateDatabaseOptions),
  spannerLocalNamePrefix: Schema.optional(Schema.String),
  spannerNamespace: Schema.optional(Schema.String),
  spannerBorgServiceAccount: Schema.optional(Schema.String),
  sdlBundlePath: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudAiPlatformTenantresourceInfraSpannerConfig" }) as any as Schema.Schema<CloudAiPlatformTenantresourceInfraSpannerConfig>;

export interface GoogleCloudDocumentaiV1DocumentPageImageQualityScoresDetectedDefect {
  /** Name of the defect type. Supported values are: - `quality/defect_blurry` - `quality/defect_noisy` - `quality/defect_dark` - `quality/defect_faint` - `quality/defect_text_too_small` - `quality/defect_document_cutoff` - `quality/defect_text_cutoff` - `quality/defect_glare` */
  type?: string;
  /** Confidence of detected defect. Range `[0, 1]` where `1` indicates strong confidence that the defect exists. */
  confidence?: number;
}

export const GoogleCloudDocumentaiV1DocumentPageImageQualityScoresDetectedDefect: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageImageQualityScoresDetectedDefect> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageImageQualityScoresDetectedDefect" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageImageQualityScoresDetectedDefect>;

export interface GoogleCloudDocumentaiV1DocumentProvenanceParent {
  /** The index of the index into current revision's parent_ids list. */
  revision?: number;
  /** The index of the parent item in the corresponding item list (eg. list of entities, properties within entities, etc.) in the parent revision. */
  index?: number;
  /** The id of the parent provenance. */
  id?: number;
}

export const GoogleCloudDocumentaiV1DocumentProvenanceParent: Schema.Schema<GoogleCloudDocumentaiV1DocumentProvenanceParent> = Schema.suspend(() => Schema.Struct({
  revision: Schema.optional(Schema.Number),
  index: Schema.optional(Schema.Number),
  id: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentProvenanceParent" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentProvenanceParent>;

export interface GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListEntry {
  /** A list entry is a list of blocks. Repeated blocks support further hierarchies and nested blocks. */
  blocks?: Array<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock>;
}

export const GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListEntry: Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListEntry> = Schema.suspend(() => Schema.Struct({
  blocks: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListEntry" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListEntry>;

export interface GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListBlock {
  /** Type of the list_entries (if exist). Available options are `ordered` and `unordered`. */
  type?: string;
  /** List entries that constitute a list block. */
  listEntries?: Array<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListEntry>;
}

export const GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListBlock: Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListBlock> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  listEntries: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListEntry)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListBlock" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListBlock>;

export interface GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutPageSpan {
  /** Page where block starts in the document. */
  pageStart?: number;
  /** Page where block ends in the document. */
  pageEnd?: number;
}

export const GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutPageSpan: Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutPageSpan> = Schema.suspend(() => Schema.Struct({
  pageStart: Schema.optional(Schema.Number),
  pageEnd: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutPageSpan" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutPageSpan>;

export interface GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableRow {
  /** A table row is a list of table cells. */
  cells?: Array<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableCell>;
}

export const GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableRow: Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableRow> = Schema.suspend(() => Schema.Struct({
  cells: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableCell)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableRow" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableRow>;

export interface GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableBlock {
  /** Body rows containing main table content. */
  bodyRows?: Array<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableRow>;
  /** Header rows at the top of the table. */
  headerRows?: Array<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableRow>;
  /** Table caption/title. */
  caption?: string;
}

export const GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableBlock: Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableBlock> = Schema.suspend(() => Schema.Struct({
  bodyRows: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableRow)),
  headerRows: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableRow)),
  caption: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableBlock" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableBlock>;

export interface GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTextBlock {
  /** Text content stored in the block. */
  text?: string;
  /** A text block could further have child blocks. Repeated blocks support further hierarchies and nested blocks. */
  blocks?: Array<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock>;
  /** Type of the text in the block. Available options are: `paragraph`, `subtitle`, `heading-1`, `heading-2`, `heading-3`, `heading-4`, `heading-5`, `header`, `footer`. */
  type?: string;
}

export const GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTextBlock: Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTextBlock> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  blocks: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock)),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTextBlock" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTextBlock>;

export interface GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock {
  /** Block consisting of list content/structure. */
  listBlock?: GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListBlock;
  /** Page span of the block. */
  pageSpan?: GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutPageSpan;
  /** ID of the block. */
  blockId?: string;
  /** Block consisting of table content/structure. */
  tableBlock?: GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableBlock;
  /** Block consisting of text content. */
  textBlock?: GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTextBlock;
}

export const GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock: Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock> = Schema.suspend(() => Schema.Struct({
  listBlock: Schema.optional(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutListBlock),
  pageSpan: Schema.optional(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutPageSpan),
  blockId: Schema.optional(Schema.String),
  tableBlock: Schema.optional(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableBlock),
  textBlock: Schema.optional(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTextBlock),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock>;

export interface GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableCell {
  /** How many rows this cell spans. */
  rowSpan?: number;
  /** A table cell is a list of blocks. Repeated blocks support further hierarchies and nested blocks. */
  blocks?: Array<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock>;
  /** How many columns this cell spans. */
  colSpan?: number;
}

export const GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableCell: Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableCell> = Schema.suspend(() => Schema.Struct({
  rowSpan: Schema.optional(Schema.Number),
  blocks: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock)),
  colSpan: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableCell" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlockLayoutTableCell>;

export interface GoogleCloudContentwarehouseV1ResponseMetadata {
  /** A unique id associated with this call. This id is logged for tracking purpose. */
  requestId?: string;
}

export const GoogleCloudContentwarehouseV1ResponseMetadata: Schema.Schema<GoogleCloudContentwarehouseV1ResponseMetadata> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1ResponseMetadata" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1ResponseMetadata>;

export interface GoogleCloudContentwarehouseV1RemoveFromFolderAction {
  /** Name of the folder under which new document is to be added. Format: projects/{project_number}/locations/{location}/documents/{document_id}. */
  folder?: string;
  /** Condition of the action to be executed. */
  condition?: string;
}

export const GoogleCloudContentwarehouseV1RemoveFromFolderAction: Schema.Schema<GoogleCloudContentwarehouseV1RemoveFromFolderAction> = Schema.suspend(() => Schema.Struct({
  folder: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1RemoveFromFolderAction" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1RemoveFromFolderAction>;

export interface GoogleCloudContentwarehouseV1DataUpdateAction {
  /** Map of (K, V) -> (valid name of the field, new value of the field) E.g., ("age", "60") entry triggers update of field age with a value of 60. If the field is not present then new entry is added. During update action execution, value strings will be casted to appropriate types. */
  entries?: Record<string, string>;
}

export const GoogleCloudContentwarehouseV1DataUpdateAction: Schema.Schema<GoogleCloudContentwarehouseV1DataUpdateAction> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1DataUpdateAction" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1DataUpdateAction>;

export interface GoogleCloudContentwarehouseV1PublishAction {
  /** Messages to be published. */
  messages?: Array<string>;
  /** The topic id in the Pub/Sub service for which messages will be published to. */
  topicId?: string;
}

export const GoogleCloudContentwarehouseV1PublishAction: Schema.Schema<GoogleCloudContentwarehouseV1PublishAction> = Schema.suspend(() => Schema.Struct({
  messages: Schema.optional(Schema.Array(Schema.String)),
  topicId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1PublishAction" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1PublishAction>;

export interface GoogleCloudContentwarehouseV1DeleteDocumentAction {
  /** Boolean field to select between hard vs soft delete options. Set 'true' for 'hard delete' and 'false' for 'soft delete'. */
  enableHardDelete?: boolean;
}

export const GoogleCloudContentwarehouseV1DeleteDocumentAction: Schema.Schema<GoogleCloudContentwarehouseV1DeleteDocumentAction> = Schema.suspend(() => Schema.Struct({
  enableHardDelete: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1DeleteDocumentAction" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1DeleteDocumentAction>;

export interface GoogleTypeExpr {
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
}

export const GoogleTypeExpr: Schema.Schema<GoogleTypeExpr> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleTypeExpr" }) as any as Schema.Schema<GoogleTypeExpr>;

export interface GoogleIamV1Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: GoogleTypeExpr;
}

export const GoogleIamV1Binding: Schema.Schema<GoogleIamV1Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(GoogleTypeExpr),
})).annotate({ identifier: "GoogleIamV1Binding" }) as any as Schema.Schema<GoogleIamV1Binding>;

export interface GoogleIamV1AuditLogConfig {
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const GoogleIamV1AuditLogConfig: Schema.Schema<GoogleIamV1AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  logType: Schema.optional(Schema.String),
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIamV1AuditLogConfig" }) as any as Schema.Schema<GoogleIamV1AuditLogConfig>;

export interface GoogleIamV1AuditConfig {
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<GoogleIamV1AuditLogConfig>;
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
}

export const GoogleIamV1AuditConfig: Schema.Schema<GoogleIamV1AuditConfig> = Schema.suspend(() => Schema.Struct({
  auditLogConfigs: Schema.optional(Schema.Array(GoogleIamV1AuditLogConfig)),
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV1AuditConfig" }) as any as Schema.Schema<GoogleIamV1AuditConfig>;

export interface GoogleIamV1Policy {
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<GoogleIamV1Binding>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<GoogleIamV1AuditConfig>;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
}

export const GoogleIamV1Policy: Schema.Schema<GoogleIamV1Policy> = Schema.suspend(() => Schema.Struct({
  bindings: Schema.optional(Schema.Array(GoogleIamV1Binding)),
  etag: Schema.optional(Schema.String),
  auditConfigs: Schema.optional(Schema.Array(GoogleIamV1AuditConfig)),
  version: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleIamV1Policy" }) as any as Schema.Schema<GoogleIamV1Policy>;

export interface GoogleCloudContentwarehouseV1AccessControlAction {
  /** Represents the new policy from which bindings are added, removed or replaced based on the type of the operation. the policy is limited to a few 10s of KB. */
  policy?: GoogleIamV1Policy;
  /** Identifies the type of operation. */
  operationType?: "UNKNOWN" | "ADD_POLICY_BINDING" | "REMOVE_POLICY_BINDING" | "REPLACE_POLICY_BINDING" | (string & {});
}

export const GoogleCloudContentwarehouseV1AccessControlAction: Schema.Schema<GoogleCloudContentwarehouseV1AccessControlAction> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(GoogleIamV1Policy),
  operationType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1AccessControlAction" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1AccessControlAction>;

export interface GoogleCloudContentwarehouseV1AddToFolderAction {
  /** Names of the folder under which new document is to be added. Format: projects/{project_number}/locations/{location}/documents/{document_id}. */
  folders?: Array<string>;
}

export const GoogleCloudContentwarehouseV1AddToFolderAction: Schema.Schema<GoogleCloudContentwarehouseV1AddToFolderAction> = Schema.suspend(() => Schema.Struct({
  folders: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1AddToFolderAction" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1AddToFolderAction>;

export interface GoogleCloudContentwarehouseV1DataValidationAction {
  /** Map of (K, V) -> (field, string condition to be evaluated on the field) E.g., ("age", "age > 18 && age < 60") entry triggers validation of field age with the given condition. Map entries will be ANDed during validation. */
  conditions?: Record<string, string>;
}

export const GoogleCloudContentwarehouseV1DataValidationAction: Schema.Schema<GoogleCloudContentwarehouseV1DataValidationAction> = Schema.suspend(() => Schema.Struct({
  conditions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1DataValidationAction" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1DataValidationAction>;

export interface GoogleCloudContentwarehouseV1Action {
  /** Action removing a document from a folder. */
  removeFromFolderAction?: GoogleCloudContentwarehouseV1RemoveFromFolderAction;
  /** Action triggering data update operations. */
  dataUpdate?: GoogleCloudContentwarehouseV1DataUpdateAction;
  /** Action publish to Pub/Sub operation. */
  publishToPubSub?: GoogleCloudContentwarehouseV1PublishAction;
  /** Action deleting the document. */
  deleteDocumentAction?: GoogleCloudContentwarehouseV1DeleteDocumentAction;
  /** Action triggering access control operations. */
  accessControl?: GoogleCloudContentwarehouseV1AccessControlAction;
  /** Action triggering create document link operation. */
  addToFolder?: GoogleCloudContentwarehouseV1AddToFolderAction;
  /** Action triggering data validation operations. */
  dataValidation?: GoogleCloudContentwarehouseV1DataValidationAction;
  /** ID of the action. Managed internally. */
  actionId?: string;
}

export const GoogleCloudContentwarehouseV1Action: Schema.Schema<GoogleCloudContentwarehouseV1Action> = Schema.suspend(() => Schema.Struct({
  removeFromFolderAction: Schema.optional(GoogleCloudContentwarehouseV1RemoveFromFolderAction),
  dataUpdate: Schema.optional(GoogleCloudContentwarehouseV1DataUpdateAction),
  publishToPubSub: Schema.optional(GoogleCloudContentwarehouseV1PublishAction),
  deleteDocumentAction: Schema.optional(GoogleCloudContentwarehouseV1DeleteDocumentAction),
  accessControl: Schema.optional(GoogleCloudContentwarehouseV1AccessControlAction),
  addToFolder: Schema.optional(GoogleCloudContentwarehouseV1AddToFolderAction),
  dataValidation: Schema.optional(GoogleCloudContentwarehouseV1DataValidationAction),
  actionId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1Action" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1Action>;

export interface GoogleCloudContentwarehouseV1Rule {
  /** Represents the conditional expression to be evaluated. Expression should evaluate to a boolean result. When the condition is true actions are executed. Example: user_role = "hsbc_role_1" AND doc.salary > 20000 */
  condition?: string;
  /** List of actions that are executed when the rule is satisfied. */
  actions?: Array<GoogleCloudContentwarehouseV1Action>;
  /** ID of the rule. It has to be unique across all the examples. This is managed internally. */
  ruleId?: string;
  /** Short description of the rule and its context. */
  description?: string;
  /** Identifies the trigger type for running the policy. */
  triggerType?: "UNKNOWN" | "ON_CREATE" | "ON_UPDATE" | "ON_CREATE_LINK" | "ON_DELETE_LINK" | (string & {});
}

export const GoogleCloudContentwarehouseV1Rule: Schema.Schema<GoogleCloudContentwarehouseV1Rule> = Schema.suspend(() => Schema.Struct({
  condition: Schema.optional(Schema.String),
  actions: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1Action)),
  ruleId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  triggerType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1Rule" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1Rule>;

export interface GoogleCloudContentwarehouseV1InvalidRule {
  /** Triggered rule. */
  rule?: GoogleCloudContentwarehouseV1Rule;
  /** Validation error on a parsed expression. */
  error?: string;
}

export const GoogleCloudContentwarehouseV1InvalidRule: Schema.Schema<GoogleCloudContentwarehouseV1InvalidRule> = Schema.suspend(() => Schema.Struct({
  rule: Schema.optional(GoogleCloudContentwarehouseV1Rule),
  error: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1InvalidRule" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1InvalidRule>;

export interface GoogleCloudContentwarehouseV1RuleEvaluatorOutput {
  /** A subset of triggered rules that are evaluated true for a given request. */
  matchedRules?: Array<GoogleCloudContentwarehouseV1Rule>;
  /** A subset of triggered rules that failed the validation check(s) after parsing. */
  invalidRules?: Array<GoogleCloudContentwarehouseV1InvalidRule>;
  /** List of rules fetched from database for the given request trigger type. */
  triggeredRules?: Array<GoogleCloudContentwarehouseV1Rule>;
}

export const GoogleCloudContentwarehouseV1RuleEvaluatorOutput: Schema.Schema<GoogleCloudContentwarehouseV1RuleEvaluatorOutput> = Schema.suspend(() => Schema.Struct({
  matchedRules: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1Rule)),
  invalidRules: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1InvalidRule)),
  triggeredRules: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1Rule)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1RuleEvaluatorOutput" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1RuleEvaluatorOutput>;

export interface GoogleCloudContentwarehouseV1ActionOutput {
  /** ID of the action. */
  actionId?: string;
  /** Action execution output message. */
  outputMessage?: string;
  /** State of an action. */
  actionState?: "UNKNOWN" | "ACTION_SUCCEEDED" | "ACTION_FAILED" | "ACTION_TIMED_OUT" | "ACTION_PENDING" | (string & {});
}

export const GoogleCloudContentwarehouseV1ActionOutput: Schema.Schema<GoogleCloudContentwarehouseV1ActionOutput> = Schema.suspend(() => Schema.Struct({
  actionId: Schema.optional(Schema.String),
  outputMessage: Schema.optional(Schema.String),
  actionState: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1ActionOutput" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1ActionOutput>;

export interface GoogleCloudContentwarehouseV1RuleActionsPair {
  /** Represents the rule. */
  rule?: GoogleCloudContentwarehouseV1Rule;
  /** Outputs of executing the actions associated with the above rule. */
  actionOutputs?: Array<GoogleCloudContentwarehouseV1ActionOutput>;
}

export const GoogleCloudContentwarehouseV1RuleActionsPair: Schema.Schema<GoogleCloudContentwarehouseV1RuleActionsPair> = Schema.suspend(() => Schema.Struct({
  rule: Schema.optional(GoogleCloudContentwarehouseV1Rule),
  actionOutputs: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1ActionOutput)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1RuleActionsPair" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1RuleActionsPair>;

export interface GoogleCloudContentwarehouseV1ActionExecutorOutput {
  /** List of rule and corresponding actions result. */
  ruleActionsPairs?: Array<GoogleCloudContentwarehouseV1RuleActionsPair>;
}

export const GoogleCloudContentwarehouseV1ActionExecutorOutput: Schema.Schema<GoogleCloudContentwarehouseV1ActionExecutorOutput> = Schema.suspend(() => Schema.Struct({
  ruleActionsPairs: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1RuleActionsPair)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1ActionExecutorOutput" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1ActionExecutorOutput>;

export interface GoogleCloudContentwarehouseV1RuleEngineOutput {
  /** Output from Rule Evaluator containing matched, unmatched and invalid rules. */
  ruleEvaluatorOutput?: GoogleCloudContentwarehouseV1RuleEvaluatorOutput;
  /** Output from Action Executor containing rule and corresponding actions execution result. */
  actionExecutorOutput?: GoogleCloudContentwarehouseV1ActionExecutorOutput;
  /** Name of the document against which the rules and actions were evaluated. */
  documentName?: string;
}

export const GoogleCloudContentwarehouseV1RuleEngineOutput: Schema.Schema<GoogleCloudContentwarehouseV1RuleEngineOutput> = Schema.suspend(() => Schema.Struct({
  ruleEvaluatorOutput: Schema.optional(GoogleCloudContentwarehouseV1RuleEvaluatorOutput),
  actionExecutorOutput: Schema.optional(GoogleCloudContentwarehouseV1ActionExecutorOutput),
  documentName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1RuleEngineOutput" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1RuleEngineOutput>;

export interface GoogleRpcStatus {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleRpcStatus" }) as any as Schema.Schema<GoogleRpcStatus>;

export interface GoogleLongrunningOperation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** The error result of the operation in case of failure or cancellation. */
  error?: GoogleRpcStatus;
}

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  done: Schema.optional(Schema.Boolean),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  error: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleLongrunningOperation" }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleCloudContentwarehouseV1TimestampValue {
  /** Timestamp value */
  timestampValue?: string;
  /** The string must represent a valid instant in UTC and is parsed using java.time.format.DateTimeFormatter.ISO_INSTANT. e.g. "2013-09-29T18:46:19Z" */
  textValue?: string;
}

export const GoogleCloudContentwarehouseV1TimestampValue: Schema.Schema<GoogleCloudContentwarehouseV1TimestampValue> = Schema.suspend(() => Schema.Struct({
  timestampValue: Schema.optional(Schema.String),
  textValue: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1TimestampValue" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1TimestampValue>;

export interface GoogleCloudContentwarehouseV1TimestampArray {
  /** List of timestamp values. */
  values?: Array<GoogleCloudContentwarehouseV1TimestampValue>;
}

export const GoogleCloudContentwarehouseV1TimestampArray: Schema.Schema<GoogleCloudContentwarehouseV1TimestampArray> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1TimestampValue)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1TimestampArray" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1TimestampArray>;

export interface GoogleCloudContentwarehouseV1TextArray {
  /** List of text values. */
  values?: Array<string>;
}

export const GoogleCloudContentwarehouseV1TextArray: Schema.Schema<GoogleCloudContentwarehouseV1TextArray> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1TextArray" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1TextArray>;

export interface GoogleCloudContentwarehouseV1EnumArray {
  /** List of enum values. */
  values?: Array<string>;
}

export const GoogleCloudContentwarehouseV1EnumArray: Schema.Schema<GoogleCloudContentwarehouseV1EnumArray> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1EnumArray" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1EnumArray>;

export interface GoogleCloudContentwarehouseV1IntegerArray {
  /** List of integer values. */
  values?: Array<number>;
}

export const GoogleCloudContentwarehouseV1IntegerArray: Schema.Schema<GoogleCloudContentwarehouseV1IntegerArray> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1IntegerArray" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1IntegerArray>;

export interface GoogleTypeTimeZone {
  /** IANA Time Zone Database time zone. For example "America/New_York". */
  id?: string;
  /** Optional. IANA Time Zone Database version number. For example "2019a". */
  version?: string;
}

export const GoogleTypeTimeZone: Schema.Schema<GoogleTypeTimeZone> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleTypeTimeZone" }) as any as Schema.Schema<GoogleTypeTimeZone>;

export interface GoogleTypeDateTime {
  /** Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a datetime without a year. */
  year?: number;
  /** Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults to 0 (midnight). An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Optional. Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a datetime without a day. */
  day?: number;
  /** Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0. */
  minutes?: number;
  /** Time zone. */
  timeZone?: GoogleTypeTimeZone;
  /** Optional. Seconds of minutes of the time. Must normally be from 0 to 59, defaults to 0. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Optional. Month of year. Must be from 1 to 12, or 0 if specifying a datetime without a month. */
  month?: number;
  /** Optional. Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999, defaults to 0. */
  nanos?: number;
  /** UTC offset. Must be whole seconds, between -18 hours and +18 hours. For example, a UTC offset of -4:00 would be represented as { seconds: -14400 }. */
  utcOffset?: string;
}

export const GoogleTypeDateTime: Schema.Schema<GoogleTypeDateTime> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  hours: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  timeZone: Schema.optional(GoogleTypeTimeZone),
  seconds: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  nanos: Schema.optional(Schema.Number),
  utcOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleTypeDateTime" }) as any as Schema.Schema<GoogleTypeDateTime>;

export interface GoogleCloudContentwarehouseV1DateTimeArray {
  /** List of datetime values. Both OffsetDateTime and ZonedDateTime are supported. */
  values?: Array<GoogleTypeDateTime>;
}

export const GoogleCloudContentwarehouseV1DateTimeArray: Schema.Schema<GoogleCloudContentwarehouseV1DateTimeArray> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(GoogleTypeDateTime)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1DateTimeArray" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1DateTimeArray>;

export interface GoogleCloudContentwarehouseV1EnumValue {
  /** String value of the enum field. This must match defined set of enums in document schema using EnumTypeOptions. */
  value?: string;
}

export const GoogleCloudContentwarehouseV1EnumValue: Schema.Schema<GoogleCloudContentwarehouseV1EnumValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1EnumValue" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1EnumValue>;

export interface GoogleCloudContentwarehouseV1Value {
  /** Represents a timestamp value. */
  timestampValue?: GoogleCloudContentwarehouseV1TimestampValue;
  /** Represents a boolean value. */
  booleanValue?: boolean;
  /** Represents a datetime value. */
  datetimeValue?: GoogleTypeDateTime;
  /** Represents a float value. */
  floatValue?: number;
  /** Represents an enum value. */
  enumValue?: GoogleCloudContentwarehouseV1EnumValue;
  /** Represents a string value. */
  stringValue?: string;
  /** Represents a integer value. */
  intValue?: number;
}

export const GoogleCloudContentwarehouseV1Value: Schema.Schema<GoogleCloudContentwarehouseV1Value> = Schema.suspend(() => Schema.Struct({
  timestampValue: Schema.optional(GoogleCloudContentwarehouseV1TimestampValue),
  booleanValue: Schema.optional(Schema.Boolean),
  datetimeValue: Schema.optional(GoogleTypeDateTime),
  floatValue: Schema.optional(Schema.Number),
  enumValue: Schema.optional(GoogleCloudContentwarehouseV1EnumValue),
  stringValue: Schema.optional(Schema.String),
  intValue: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1Value" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1Value>;

export interface GoogleCloudContentwarehouseV1MapProperty {
  /** Unordered map of dynamically typed values. */
  fields?: Record<string, GoogleCloudContentwarehouseV1Value>;
}

export const GoogleCloudContentwarehouseV1MapProperty: Schema.Schema<GoogleCloudContentwarehouseV1MapProperty> = Schema.suspend(() => Schema.Struct({
  fields: Schema.optional(Schema.Record(Schema.String, GoogleCloudContentwarehouseV1Value)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1MapProperty" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1MapProperty>;

export interface GoogleCloudContentwarehouseV1PropertyArray {
  /** List of property values. */
  properties?: Array<GoogleCloudContentwarehouseV1Property>;
}

export const GoogleCloudContentwarehouseV1PropertyArray: Schema.Schema<GoogleCloudContentwarehouseV1PropertyArray> = Schema.suspend(() => Schema.Struct({
  properties: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1Property)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1PropertyArray" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1PropertyArray>;

export interface GoogleCloudContentwarehouseV1FloatArray {
  /** List of float values. */
  values?: Array<number>;
}

export const GoogleCloudContentwarehouseV1FloatArray: Schema.Schema<GoogleCloudContentwarehouseV1FloatArray> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1FloatArray" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1FloatArray>;

export interface GoogleCloudContentwarehouseV1Property {
  /** Timestamp property values. It is not supported by CMEK compliant deployment. */
  timestampValues?: GoogleCloudContentwarehouseV1TimestampArray;
  /** String/text property values. */
  textValues?: GoogleCloudContentwarehouseV1TextArray;
  /** Enum property values. */
  enumValues?: GoogleCloudContentwarehouseV1EnumArray;
  /** Integer property values. */
  integerValues?: GoogleCloudContentwarehouseV1IntegerArray;
  /** Date time property values. It is not supported by CMEK compliant deployment. */
  dateTimeValues?: GoogleCloudContentwarehouseV1DateTimeArray;
  /** Map property values. */
  mapProperty?: GoogleCloudContentwarehouseV1MapProperty;
  /** Nested structured data property values. */
  propertyValues?: GoogleCloudContentwarehouseV1PropertyArray;
  /** Float property values. */
  floatValues?: GoogleCloudContentwarehouseV1FloatArray;
  /** Required. Must match the name of a PropertyDefinition in the DocumentSchema. */
  name?: string;
}

export const GoogleCloudContentwarehouseV1Property: Schema.Schema<GoogleCloudContentwarehouseV1Property> = Schema.suspend(() => Schema.Struct({
  timestampValues: Schema.optional(GoogleCloudContentwarehouseV1TimestampArray),
  textValues: Schema.optional(GoogleCloudContentwarehouseV1TextArray),
  enumValues: Schema.optional(GoogleCloudContentwarehouseV1EnumArray),
  integerValues: Schema.optional(GoogleCloudContentwarehouseV1IntegerArray),
  dateTimeValues: Schema.optional(GoogleCloudContentwarehouseV1DateTimeArray),
  mapProperty: Schema.optional(GoogleCloudContentwarehouseV1MapProperty),
  propertyValues: Schema.optional(GoogleCloudContentwarehouseV1PropertyArray),
  floatValues: Schema.optional(GoogleCloudContentwarehouseV1FloatArray),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1Property" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1Property>;

export interface GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan {
  /** Page where chunk starts in the document. */
  pageStart?: number;
  /** Page where chunk ends in the document. */
  pageEnd?: number;
}

export const GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan: Schema.Schema<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan> = Schema.suspend(() => Schema.Struct({
  pageStart: Schema.optional(Schema.Number),
  pageEnd: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan>;

export interface GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageFooter {
  /** Footer in text format. */
  text?: string;
  /** Page span of the footer. */
  pageSpan?: GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan;
}

export const GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageFooter: Schema.Schema<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageFooter> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  pageSpan: Schema.optional(GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageFooter" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageFooter>;

export interface GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageHeader {
  /** Page span of the header. */
  pageSpan?: GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan;
  /** Header in text format. */
  text?: string;
}

export const GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageHeader: Schema.Schema<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageHeader> = Schema.suspend(() => Schema.Struct({
  pageSpan: Schema.optional(GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageHeader" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageHeader>;

export interface GoogleCloudDocumentaiV1DocumentChunkedDocumentChunk {
  /** Unused. */
  sourceBlockIds?: Array<string>;
  /** ID of the chunk. */
  chunkId?: string;
  /** Page span of the chunk. */
  pageSpan?: GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan;
  /** Text content of the chunk. */
  content?: string;
  /** Page footers associated with the chunk. */
  pageFooters?: Array<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageFooter>;
  /** Page headers associated with the chunk. */
  pageHeaders?: Array<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageHeader>;
}

export const GoogleCloudDocumentaiV1DocumentChunkedDocumentChunk: Schema.Schema<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunk> = Schema.suspend(() => Schema.Struct({
  sourceBlockIds: Schema.optional(Schema.Array(Schema.String)),
  chunkId: Schema.optional(Schema.String),
  pageSpan: Schema.optional(GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageSpan),
  content: Schema.optional(Schema.String),
  pageFooters: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageFooter)),
  pageHeaders: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentChunkedDocumentChunkChunkPageHeader)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentChunkedDocumentChunk" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunk>;

export interface GoogleCloudDocumentaiV1DocumentChunkedDocument {
  /** List of chunks. */
  chunks?: Array<GoogleCloudDocumentaiV1DocumentChunkedDocumentChunk>;
}

export const GoogleCloudDocumentaiV1DocumentChunkedDocument: Schema.Schema<GoogleCloudDocumentaiV1DocumentChunkedDocument> = Schema.suspend(() => Schema.Struct({
  chunks: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentChunkedDocumentChunk)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentChunkedDocument" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentChunkedDocument>;

export interface GoogleCloudDocumentaiV1DocumentRevisionHumanReview {
  /** Human review state. e.g. `requested`, `succeeded`, `rejected`. */
  state?: string;
  /** A message providing more details about the current state of processing. For example, the rejection reason when the state is `rejected`. */
  stateMessage?: string;
}

export const GoogleCloudDocumentaiV1DocumentRevisionHumanReview: Schema.Schema<GoogleCloudDocumentaiV1DocumentRevisionHumanReview> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  stateMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentRevisionHumanReview" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentRevisionHumanReview>;

export interface GoogleCloudDocumentaiV1DocumentRevision {
  /** The revisions that this revision is based on. This can include one or more parent (when documents are merged.) This field represents the index into the `revisions` field. */
  parent?: Array<number>;
  /** The time that the revision was created, internally generated by doc proto storage at the time of create. */
  createTime?: string;
  /** Human Review information of this revision. */
  humanReview?: GoogleCloudDocumentaiV1DocumentRevisionHumanReview;
  /** If the annotation was made by processor identify the processor by its resource name. */
  processor?: string;
  /** The revisions that this revision is based on. Must include all the ids that have anything to do with this revision - eg. there are `provenance.parent.revision` fields that index into this field. */
  parentIds?: Array<string>;
  /** Id of the revision, internally generated by doc proto storage. Unique within the context of the document. */
  id?: string;
  /** If the change was made by a person specify the name or id of that person. */
  agent?: string;
}

export const GoogleCloudDocumentaiV1DocumentRevision: Schema.Schema<GoogleCloudDocumentaiV1DocumentRevision> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.Array(Schema.Number)),
  createTime: Schema.optional(Schema.String),
  humanReview: Schema.optional(GoogleCloudDocumentaiV1DocumentRevisionHumanReview),
  processor: Schema.optional(Schema.String),
  parentIds: Schema.optional(Schema.Array(Schema.String)),
  id: Schema.optional(Schema.String),
  agent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentRevision" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentRevision>;

export interface GoogleCloudDocumentaiV1DocumentProvenance {
  /** The type of provenance operation. */
  type?: "OPERATION_TYPE_UNSPECIFIED" | "ADD" | "REMOVE" | "UPDATE" | "REPLACE" | "EVAL_REQUESTED" | "EVAL_APPROVED" | "EVAL_SKIPPED" | (string & {});
  /** The Id of this operation. Needs to be unique within the scope of the revision. */
  id?: number;
  /** References to the original elements that are replaced. */
  parents?: Array<GoogleCloudDocumentaiV1DocumentProvenanceParent>;
  /** The index of the revision that produced this element. */
  revision?: number;
}

export const GoogleCloudDocumentaiV1DocumentProvenance: Schema.Schema<GoogleCloudDocumentaiV1DocumentProvenance> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  id: Schema.optional(Schema.Number),
  parents: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentProvenanceParent)),
  revision: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentProvenance" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentProvenance>;

export interface GoogleCloudDocumentaiV1DocumentTextAnchorTextSegment {
  /** TextSegment half open end UTF-8 char index in the Document.text. */
  endIndex?: string;
  /** TextSegment start UTF-8 char index in the Document.text. */
  startIndex?: string;
}

export const GoogleCloudDocumentaiV1DocumentTextAnchorTextSegment: Schema.Schema<GoogleCloudDocumentaiV1DocumentTextAnchorTextSegment> = Schema.suspend(() => Schema.Struct({
  endIndex: Schema.optional(Schema.String),
  startIndex: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentTextAnchorTextSegment" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentTextAnchorTextSegment>;

export interface GoogleCloudDocumentaiV1DocumentTextAnchor {
  /** Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields. */
  content?: string;
  /** The text segments from the Document.text. */
  textSegments?: Array<GoogleCloudDocumentaiV1DocumentTextAnchorTextSegment>;
}

export const GoogleCloudDocumentaiV1DocumentTextAnchor: Schema.Schema<GoogleCloudDocumentaiV1DocumentTextAnchor> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  textSegments: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentTextAnchorTextSegment)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentTextAnchor" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentTextAnchor>;

export interface GoogleCloudDocumentaiV1DocumentTextChange {
  /** The text that replaces the text identified in the `text_anchor`. */
  changedText?: string;
  /** The history of this annotation. */
  provenance?: Array<GoogleCloudDocumentaiV1DocumentProvenance>;
  /** Provenance of the correction. Text anchor indexing into the Document.text. There can only be a single `TextAnchor.text_segments` element. If the start and end index of the text segment are the same, the text change is inserted before that index. */
  textAnchor?: GoogleCloudDocumentaiV1DocumentTextAnchor;
}

export const GoogleCloudDocumentaiV1DocumentTextChange: Schema.Schema<GoogleCloudDocumentaiV1DocumentTextChange> = Schema.suspend(() => Schema.Struct({
  changedText: Schema.optional(Schema.String),
  provenance: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentProvenance)),
  textAnchor: Schema.optional(GoogleCloudDocumentaiV1DocumentTextAnchor),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentTextChange" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentTextChange>;

export interface GoogleTypeColor {
  /** The amount of red in the color as a value in the interval [0, 1]. */
  red?: number;
  /** The amount of green in the color as a value in the interval [0, 1]. */
  green?: number;
  /** The amount of blue in the color as a value in the interval [0, 1]. */
  blue?: number;
  /** The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0). */
  alpha?: number;
}

export const GoogleTypeColor: Schema.Schema<GoogleTypeColor> = Schema.suspend(() => Schema.Struct({
  red: Schema.optional(Schema.Number),
  green: Schema.optional(Schema.Number),
  blue: Schema.optional(Schema.Number),
  alpha: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeColor" }) as any as Schema.Schema<GoogleTypeColor>;

export interface GoogleCloudDocumentaiV1DocumentStyleFontSize {
  /** Font size for the text. */
  size?: number;
  /** Unit for the font size. Follows CSS naming (such as `in`, `px`, and `pt`). */
  unit?: string;
}

export const GoogleCloudDocumentaiV1DocumentStyleFontSize: Schema.Schema<GoogleCloudDocumentaiV1DocumentStyleFontSize> = Schema.suspend(() => Schema.Struct({
  size: Schema.optional(Schema.Number),
  unit: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentStyleFontSize" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentStyleFontSize>;

export interface GoogleCloudDocumentaiV1DocumentStyle {
  /** [Text decoration](https://www.w3schools.com/cssref/pr_text_text-decoration.asp). Follows CSS standard. */
  textDecoration?: string;
  /** Text color. */
  color?: GoogleTypeColor;
  /** Font family such as `Arial`, `Times New Roman`. https://www.w3schools.com/cssref/pr_font_font-family.asp */
  fontFamily?: string;
  /** Text anchor indexing into the Document.text. */
  textAnchor?: GoogleCloudDocumentaiV1DocumentTextAnchor;
  /** Text background color. */
  backgroundColor?: GoogleTypeColor;
  /** [Font weight](https://www.w3schools.com/cssref/pr_font_weight.asp). Possible values are `normal`, `bold`, `bolder`, and `lighter`. */
  fontWeight?: string;
  /** Font size. */
  fontSize?: GoogleCloudDocumentaiV1DocumentStyleFontSize;
  /** [Text style](https://www.w3schools.com/cssref/pr_font_font-style.asp). Possible values are `normal`, `italic`, and `oblique`. */
  textStyle?: string;
}

export const GoogleCloudDocumentaiV1DocumentStyle: Schema.Schema<GoogleCloudDocumentaiV1DocumentStyle> = Schema.suspend(() => Schema.Struct({
  textDecoration: Schema.optional(Schema.String),
  color: Schema.optional(GoogleTypeColor),
  fontFamily: Schema.optional(Schema.String),
  textAnchor: Schema.optional(GoogleCloudDocumentaiV1DocumentTextAnchor),
  backgroundColor: Schema.optional(GoogleTypeColor),
  fontWeight: Schema.optional(Schema.String),
  fontSize: Schema.optional(GoogleCloudDocumentaiV1DocumentStyleFontSize),
  textStyle: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentStyle" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentStyle>;

export interface GoogleCloudDocumentaiV1DocumentPageDetectedLanguage {
  /** Confidence of detected language. Range `[0, 1]`. */
  confidence?: number;
  /** The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`. */
  languageCode?: string;
}

export const GoogleCloudDocumentaiV1DocumentPageDetectedLanguage: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage> = Schema.suspend(() => Schema.Struct({
  confidence: Schema.optional(Schema.Number),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageDetectedLanguage" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;

export interface GoogleCloudDocumentaiV1Vertex {
  /** X coordinate. */
  x?: number;
  /** Y coordinate (starts from the top of the image). */
  y?: number;
}

export const GoogleCloudDocumentaiV1Vertex: Schema.Schema<GoogleCloudDocumentaiV1Vertex> = Schema.suspend(() => Schema.Struct({
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1Vertex" }) as any as Schema.Schema<GoogleCloudDocumentaiV1Vertex>;

export interface GoogleCloudDocumentaiV1NormalizedVertex {
  /** X coordinate. */
  x?: number;
  /** Y coordinate (starts from the top of the image). */
  y?: number;
}

export const GoogleCloudDocumentaiV1NormalizedVertex: Schema.Schema<GoogleCloudDocumentaiV1NormalizedVertex> = Schema.suspend(() => Schema.Struct({
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1NormalizedVertex" }) as any as Schema.Schema<GoogleCloudDocumentaiV1NormalizedVertex>;

export interface GoogleCloudDocumentaiV1BoundingPoly {
  /** The bounding polygon vertices. */
  vertices?: Array<GoogleCloudDocumentaiV1Vertex>;
  /** The bounding polygon normalized vertices. */
  normalizedVertices?: Array<GoogleCloudDocumentaiV1NormalizedVertex>;
}

export const GoogleCloudDocumentaiV1BoundingPoly: Schema.Schema<GoogleCloudDocumentaiV1BoundingPoly> = Schema.suspend(() => Schema.Struct({
  vertices: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1Vertex)),
  normalizedVertices: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1NormalizedVertex)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1BoundingPoly" }) as any as Schema.Schema<GoogleCloudDocumentaiV1BoundingPoly>;

export interface GoogleCloudDocumentaiV1DocumentPageLayout {
  /** Text anchor indexing into the Document.text. */
  textAnchor?: GoogleCloudDocumentaiV1DocumentTextAnchor;
  /** The bounding polygon for the Layout. */
  boundingPoly?: GoogleCloudDocumentaiV1BoundingPoly;
  /** Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`. */
  confidence?: number;
  /** Detected orientation for the Layout. */
  orientation?: "ORIENTATION_UNSPECIFIED" | "PAGE_UP" | "PAGE_RIGHT" | "PAGE_DOWN" | "PAGE_LEFT" | (string & {});
}

export const GoogleCloudDocumentaiV1DocumentPageLayout: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageLayout> = Schema.suspend(() => Schema.Struct({
  textAnchor: Schema.optional(GoogleCloudDocumentaiV1DocumentTextAnchor),
  boundingPoly: Schema.optional(GoogleCloudDocumentaiV1BoundingPoly),
  confidence: Schema.optional(Schema.Number),
  orientation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageLayout" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageLayout>;

export interface GoogleCloudDocumentaiV1DocumentPageTableTableCell {
  /** How many rows this cell spans. */
  rowSpan?: number;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
  /** How many columns this cell spans. */
  colSpan?: number;
  /** Layout for TableCell. */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
}

export const GoogleCloudDocumentaiV1DocumentPageTableTableCell: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageTableTableCell> = Schema.suspend(() => Schema.Struct({
  rowSpan: Schema.optional(Schema.Number),
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
  colSpan: Schema.optional(Schema.Number),
  layout: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageTableTableCell" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageTableTableCell>;

export interface GoogleCloudDocumentaiV1DocumentPageTableTableRow {
  /** Cells that make up this row. */
  cells?: Array<GoogleCloudDocumentaiV1DocumentPageTableTableCell>;
}

export const GoogleCloudDocumentaiV1DocumentPageTableTableRow: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageTableTableRow> = Schema.suspend(() => Schema.Struct({
  cells: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageTableTableCell)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageTableTableRow" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageTableTableRow>;

export interface GoogleCloudDocumentaiV1DocumentPageTable {
  /** Header rows of the table. */
  headerRows?: Array<GoogleCloudDocumentaiV1DocumentPageTableTableRow>;
  /** Layout for Table. */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /** Body rows of the table. */
  bodyRows?: Array<GoogleCloudDocumentaiV1DocumentPageTableTableRow>;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
  /** The history of this table. */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
}

export const GoogleCloudDocumentaiV1DocumentPageTable: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageTable> = Schema.suspend(() => Schema.Struct({
  headerRows: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageTableTableRow)),
  layout: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
  bodyRows: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageTableTableRow)),
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
  provenance: Schema.optional(GoogleCloudDocumentaiV1DocumentProvenance),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageTable" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageTable>;

export interface GoogleCloudDocumentaiV1DocumentPageSymbol {
  /** Layout for Symbol. */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
}

export const GoogleCloudDocumentaiV1DocumentPageSymbol: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageSymbol> = Schema.suspend(() => Schema.Struct({
  layout: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageSymbol" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageSymbol>;

export interface GoogleCloudDocumentaiV1DocumentPageBlock {
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
  /** The history of this annotation. */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
  /** Layout for Block. */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
}

export const GoogleCloudDocumentaiV1DocumentPageBlock: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageBlock> = Schema.suspend(() => Schema.Struct({
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
  provenance: Schema.optional(GoogleCloudDocumentaiV1DocumentProvenance),
  layout: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageBlock" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageBlock>;

export interface GoogleCloudDocumentaiV1DocumentPageImage {
  /** Height of the image in pixels. */
  height?: number;
  /** Width of the image in pixels. */
  width?: number;
  /** Raw byte content of the image. */
  content?: string;
  /** Encoding [media type (MIME type)](https://www.iana.org/assignments/media-types/media-types.xhtml) for the image. */
  mimeType?: string;
}

export const GoogleCloudDocumentaiV1DocumentPageImage: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageImage> = Schema.suspend(() => Schema.Struct({
  height: Schema.optional(Schema.Number),
  width: Schema.optional(Schema.Number),
  content: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageImage" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageImage>;

export interface GoogleCloudDocumentaiV1DocumentPageDimension {
  /** Page width. */
  width?: number;
  /** Page height. */
  height?: number;
  /** Dimension unit. */
  unit?: string;
}

export const GoogleCloudDocumentaiV1DocumentPageDimension: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageDimension> = Schema.suspend(() => Schema.Struct({
  width: Schema.optional(Schema.Number),
  height: Schema.optional(Schema.Number),
  unit: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageDimension" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageDimension>;

export interface GoogleCloudDocumentaiV1DocumentPageImageQualityScores {
  /** The overall quality score. Range `[0, 1]` where `1` is perfect quality. */
  qualityScore?: number;
  /** A list of detected defects. */
  detectedDefects?: Array<GoogleCloudDocumentaiV1DocumentPageImageQualityScoresDetectedDefect>;
}

export const GoogleCloudDocumentaiV1DocumentPageImageQualityScores: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageImageQualityScores> = Schema.suspend(() => Schema.Struct({
  qualityScore: Schema.optional(Schema.Number),
  detectedDefects: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageImageQualityScoresDetectedDefect)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageImageQualityScores" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageImageQualityScores>;

export interface GoogleCloudDocumentaiV1DocumentPageTokenDetectedBreak {
  /** Detected break type. */
  type?: "TYPE_UNSPECIFIED" | "SPACE" | "WIDE_SPACE" | "HYPHEN" | (string & {});
}

export const GoogleCloudDocumentaiV1DocumentPageTokenDetectedBreak: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageTokenDetectedBreak> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageTokenDetectedBreak" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageTokenDetectedBreak>;

export interface GoogleCloudDocumentaiV1DocumentPageTokenStyleInfo {
  /** Whether the text is a superscript. This feature is not supported yet. */
  superscript?: boolean;
  /** Name or style of the font. */
  fontType?: string;
  /** Whether the text is bold (equivalent to font_weight is at least `700`). */
  bold?: boolean;
  /** Color of the background. */
  backgroundColor?: GoogleTypeColor;
  /** Whether the text is strikethrough. This feature is not supported yet. */
  strikeout?: boolean;
  /** Whether the text is a subscript. This feature is not supported yet. */
  subscript?: boolean;
  /** Font size in pixels, equal to _unrounded font_size_ * _resolution_ ÷ `72.0`. */
  pixelFontSize?: number;
  /** Color of the text. */
  textColor?: GoogleTypeColor;
  /** Whether the text is italic. */
  italic?: boolean;
  /** TrueType weight on a scale `100` (thin) to `1000` (ultra-heavy). Normal is `400`, bold is `700`. */
  fontWeight?: number;
  /** Whether the text is underlined. */
  underlined?: boolean;
  /** Font size in points (`1` point is `¹⁄₇₂` inches). */
  fontSize?: number;
  /** Letter spacing in points. */
  letterSpacing?: number;
  /** Whether the text is in small caps. This feature is not supported yet. */
  smallcaps?: boolean;
  /** Whether the text is handwritten. */
  handwritten?: boolean;
}

export const GoogleCloudDocumentaiV1DocumentPageTokenStyleInfo: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageTokenStyleInfo> = Schema.suspend(() => Schema.Struct({
  superscript: Schema.optional(Schema.Boolean),
  fontType: Schema.optional(Schema.String),
  bold: Schema.optional(Schema.Boolean),
  backgroundColor: Schema.optional(GoogleTypeColor),
  strikeout: Schema.optional(Schema.Boolean),
  subscript: Schema.optional(Schema.Boolean),
  pixelFontSize: Schema.optional(Schema.Number),
  textColor: Schema.optional(GoogleTypeColor),
  italic: Schema.optional(Schema.Boolean),
  fontWeight: Schema.optional(Schema.Number),
  underlined: Schema.optional(Schema.Boolean),
  fontSize: Schema.optional(Schema.Number),
  letterSpacing: Schema.optional(Schema.Number),
  smallcaps: Schema.optional(Schema.Boolean),
  handwritten: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageTokenStyleInfo" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageTokenStyleInfo>;

export interface GoogleCloudDocumentaiV1DocumentPageToken {
  /** Layout for Token. */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /** The history of this annotation. */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
  /** Detected break at the end of a Token. */
  detectedBreak?: GoogleCloudDocumentaiV1DocumentPageTokenDetectedBreak;
  /** Text style attributes. */
  styleInfo?: GoogleCloudDocumentaiV1DocumentPageTokenStyleInfo;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
}

export const GoogleCloudDocumentaiV1DocumentPageToken: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageToken> = Schema.suspend(() => Schema.Struct({
  layout: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
  provenance: Schema.optional(GoogleCloudDocumentaiV1DocumentProvenance),
  detectedBreak: Schema.optional(GoogleCloudDocumentaiV1DocumentPageTokenDetectedBreak),
  styleInfo: Schema.optional(GoogleCloudDocumentaiV1DocumentPageTokenStyleInfo),
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageToken" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageToken>;

export interface GoogleCloudDocumentaiV1Barcode {
  /** Raw value encoded in the barcode. For example: `'MEBKM:TITLE:Google;URL:https://www.google.com;;'`. */
  rawValue?: string;
  /** Value format describes the format of the value that a barcode encodes. The supported formats are: - `CONTACT_INFO`: Contact information. - `EMAIL`: Email address. - `ISBN`: ISBN identifier. - `PHONE`: Phone number. - `PRODUCT`: Product. - `SMS`: SMS message. - `TEXT`: Text string. - `URL`: URL address. - `WIFI`: Wifi information. - `GEO`: Geo-localization. - `CALENDAR_EVENT`: Calendar event. - `DRIVER_LICENSE`: Driver's license. */
  valueFormat?: string;
  /** Format of a barcode. The supported formats are: - `CODE_128`: Code 128 type. - `CODE_39`: Code 39 type. - `CODE_93`: Code 93 type. - `CODABAR`: Codabar type. - `DATA_MATRIX`: 2D Data Matrix type. - `ITF`: ITF type. - `EAN_13`: EAN-13 type. - `EAN_8`: EAN-8 type. - `QR_CODE`: 2D QR code type. - `UPC_A`: UPC-A type. - `UPC_E`: UPC-E type. - `PDF417`: PDF417 type. - `AZTEC`: 2D Aztec code type. - `DATABAR`: GS1 DataBar code type. */
  format?: string;
}

export const GoogleCloudDocumentaiV1Barcode: Schema.Schema<GoogleCloudDocumentaiV1Barcode> = Schema.suspend(() => Schema.Struct({
  rawValue: Schema.optional(Schema.String),
  valueFormat: Schema.optional(Schema.String),
  format: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1Barcode" }) as any as Schema.Schema<GoogleCloudDocumentaiV1Barcode>;

export interface GoogleCloudDocumentaiV1DocumentPageDetectedBarcode {
  /** Layout for DetectedBarcode. */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /** Detailed barcode information of the DetectedBarcode. */
  barcode?: GoogleCloudDocumentaiV1Barcode;
}

export const GoogleCloudDocumentaiV1DocumentPageDetectedBarcode: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageDetectedBarcode> = Schema.suspend(() => Schema.Struct({
  layout: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
  barcode: Schema.optional(GoogleCloudDocumentaiV1Barcode),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageDetectedBarcode" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageDetectedBarcode>;

export interface GoogleCloudDocumentaiV1DocumentPageVisualElement {
  /** Layout for VisualElement. */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
  /** Type of the VisualElement. */
  type?: string;
}

export const GoogleCloudDocumentaiV1DocumentPageVisualElement: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageVisualElement> = Schema.suspend(() => Schema.Struct({
  layout: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageVisualElement" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageVisualElement>;

export interface GoogleCloudDocumentaiV1DocumentPageMatrix {
  /** Number of rows in the matrix. */
  rows?: number;
  /** Number of columns in the matrix. */
  cols?: number;
  /** The matrix data. */
  data?: string;
  /** This encodes information about what data type the matrix uses. For example, 0 (CV_8U) is an unsigned 8-bit image. For the full list of OpenCV primitive data types, please refer to https://docs.opencv.org/4.3.0/d1/d1b/group__core__hal__interface.html */
  type?: number;
}

export const GoogleCloudDocumentaiV1DocumentPageMatrix: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageMatrix> = Schema.suspend(() => Schema.Struct({
  rows: Schema.optional(Schema.Number),
  cols: Schema.optional(Schema.Number),
  data: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageMatrix" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageMatrix>;

export interface GoogleCloudDocumentaiV1DocumentPageFormField {
  /** Layout for the FormField value. */
  fieldValue?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /** Created for Labeling UI to export key text. If corrections were made to the text identified by the `field_name.text_anchor`, this field will contain the correction. */
  correctedKeyText?: string;
  /** Created for Labeling UI to export value text. If corrections were made to the text identified by the `field_value.text_anchor`, this field will contain the correction. */
  correctedValueText?: string;
  /** A list of detected languages for name together with confidence. */
  nameDetectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
  /** A list of detected languages for value together with confidence. */
  valueDetectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
  /** Layout for the FormField name. e.g. `Address`, `Email`, `Grand total`, `Phone number`, etc. */
  fieldName?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /** If the value is non-textual, this field represents the type. Current valid values are: - blank (this indicates the `field_value` is normal text) - `unfilled_checkbox` - `filled_checkbox` */
  valueType?: string;
  /** The history of this annotation. */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
}

export const GoogleCloudDocumentaiV1DocumentPageFormField: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageFormField> = Schema.suspend(() => Schema.Struct({
  fieldValue: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
  correctedKeyText: Schema.optional(Schema.String),
  correctedValueText: Schema.optional(Schema.String),
  nameDetectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
  valueDetectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
  fieldName: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
  valueType: Schema.optional(Schema.String),
  provenance: Schema.optional(GoogleCloudDocumentaiV1DocumentProvenance),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageFormField" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageFormField>;

export interface GoogleCloudDocumentaiV1DocumentPageParagraph {
  /** The history of this annotation. */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
  /** Layout for Paragraph. */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
}

export const GoogleCloudDocumentaiV1DocumentPageParagraph: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageParagraph> = Schema.suspend(() => Schema.Struct({
  provenance: Schema.optional(GoogleCloudDocumentaiV1DocumentProvenance),
  layout: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageParagraph" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageParagraph>;

export interface GoogleCloudDocumentaiV1DocumentPageLine {
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
  /** The history of this annotation. */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
  /** Layout for Line. */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
}

export const GoogleCloudDocumentaiV1DocumentPageLine: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageLine> = Schema.suspend(() => Schema.Struct({
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
  provenance: Schema.optional(GoogleCloudDocumentaiV1DocumentProvenance),
  layout: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageLine" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageLine>;

export interface GoogleCloudDocumentaiV1DocumentPage {
  /** A list of visually detected tables on the page. */
  tables?: Array<GoogleCloudDocumentaiV1DocumentPageTable>;
  /** A list of visually detected symbols on the page. */
  symbols?: Array<GoogleCloudDocumentaiV1DocumentPageSymbol>;
  /** A list of visually detected text blocks on the page. A block has a set of lines (collected into paragraphs) that have a common line-spacing and orientation. */
  blocks?: Array<GoogleCloudDocumentaiV1DocumentPageBlock>;
  /** Rendered image for this page. This image is preprocessed to remove any skew, rotation, and distortions such that the annotation bounding boxes can be upright and axis-aligned. */
  image?: GoogleCloudDocumentaiV1DocumentPageImage;
  /** Physical dimension of the page. */
  dimension?: GoogleCloudDocumentaiV1DocumentPageDimension;
  /** 1-based index for current Page in a parent Document. Useful when a page is taken out of a Document for individual processing. */
  pageNumber?: number;
  /** Image quality scores. */
  imageQualityScores?: GoogleCloudDocumentaiV1DocumentPageImageQualityScores;
  /** A list of visually detected tokens on the page. */
  tokens?: Array<GoogleCloudDocumentaiV1DocumentPageToken>;
  /** A list of detected barcodes. */
  detectedBarcodes?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedBarcode>;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: Array<GoogleCloudDocumentaiV1DocumentPageDetectedLanguage>;
  /** A list of detected non-text visual elements e.g. checkbox, signature etc. on the page. */
  visualElements?: Array<GoogleCloudDocumentaiV1DocumentPageVisualElement>;
  /** Transformation matrices that were applied to the original document image to produce Page.image. */
  transforms?: Array<GoogleCloudDocumentaiV1DocumentPageMatrix>;
  /** A list of visually detected form fields on the page. */
  formFields?: Array<GoogleCloudDocumentaiV1DocumentPageFormField>;
  /** A list of visually detected text paragraphs on the page. A collection of lines that a human would perceive as a paragraph. */
  paragraphs?: Array<GoogleCloudDocumentaiV1DocumentPageParagraph>;
  /** The history of this page. */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
  /** A list of visually detected text lines on the page. A collection of tokens that a human would perceive as a line. */
  lines?: Array<GoogleCloudDocumentaiV1DocumentPageLine>;
  /** Layout for the page. */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
}

export const GoogleCloudDocumentaiV1DocumentPage: Schema.Schema<GoogleCloudDocumentaiV1DocumentPage> = Schema.suspend(() => Schema.Struct({
  tables: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageTable)),
  symbols: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageSymbol)),
  blocks: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageBlock)),
  image: Schema.optional(GoogleCloudDocumentaiV1DocumentPageImage),
  dimension: Schema.optional(GoogleCloudDocumentaiV1DocumentPageDimension),
  pageNumber: Schema.optional(Schema.Number),
  imageQualityScores: Schema.optional(GoogleCloudDocumentaiV1DocumentPageImageQualityScores),
  tokens: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageToken)),
  detectedBarcodes: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedBarcode)),
  detectedLanguages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageDetectedLanguage)),
  visualElements: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageVisualElement)),
  transforms: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageMatrix)),
  formFields: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageFormField)),
  paragraphs: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageParagraph)),
  provenance: Schema.optional(GoogleCloudDocumentaiV1DocumentProvenance),
  lines: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageLine)),
  layout: Schema.optional(GoogleCloudDocumentaiV1DocumentPageLayout),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPage" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPage>;

export interface GoogleCloudDocumentaiV1DocumentDocumentLayout {
  /** List of blocks in the document. */
  blocks?: Array<GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock>;
}

export const GoogleCloudDocumentaiV1DocumentDocumentLayout: Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayout> = Schema.suspend(() => Schema.Struct({
  blocks: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentDocumentLayoutDocumentLayoutBlock)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentDocumentLayout" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentDocumentLayout>;

export interface GoogleCloudDocumentaiV1DocumentShardInfo {
  /** The 0-based index of this shard. */
  shardIndex?: string;
  /** Total number of shards. */
  shardCount?: string;
  /** The index of the first character in Document.text in the overall document global text. */
  textOffset?: string;
}

export const GoogleCloudDocumentaiV1DocumentShardInfo: Schema.Schema<GoogleCloudDocumentaiV1DocumentShardInfo> = Schema.suspend(() => Schema.Struct({
  shardIndex: Schema.optional(Schema.String),
  shardCount: Schema.optional(Schema.String),
  textOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentShardInfo" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentShardInfo>;

export interface GoogleCloudDocumentaiV1DocumentEntityRelation {
  /** Subject entity id. */
  subjectId?: string;
  /** Relationship description. */
  relation?: string;
  /** Object entity id. */
  objectId?: string;
}

export const GoogleCloudDocumentaiV1DocumentEntityRelation: Schema.Schema<GoogleCloudDocumentaiV1DocumentEntityRelation> = Schema.suspend(() => Schema.Struct({
  subjectId: Schema.optional(Schema.String),
  relation: Schema.optional(Schema.String),
  objectId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentEntityRelation" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentEntityRelation>;

export interface GoogleTypePostalAddress {
  /** Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en". */
  languageCode?: string;
  /** The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions. */
  revision?: number;
  /** Optional. Sublocality of the address. For example, this can be neighborhoods, boroughs, districts. */
  sublocality?: string;
  /** Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland. */
  regionCode?: string;
  /** Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information. */
  recipients?: Array<string>;
  /** Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. Specifically, for Spain this is the province and not the autonomous community (For example "Barcelona" and not "Catalonia"). Many countries don't use an administrative area in postal addresses. For example in Switzerland this should be left unpopulated. */
  administrativeArea?: string;
  /** Optional. Generally refers to the city/town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave locality empty and use address_lines. */
  locality?: string;
  /** Unstructured address lines describing the lower levels of an address. Because values in address_lines do not have type information and may sometimes contain multiple values in a single field (For example "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country/region of the address. In places where this can vary (For example Japan), address_language is used to make it explicit (For example "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). This way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a region_code with all remaining information placed in the address_lines. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a region_code and address_lines, and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas). */
  addressLines?: Array<string>;
  /** Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (For example state/zip validation in the U.S.A.). */
  postalCode?: string;
  /** Optional. The name of the organization at the address. */
  organization?: string;
  /** Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (For example "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (For example Côte d'Ivoire). */
  sortingCode?: string;
}

export const GoogleTypePostalAddress: Schema.Schema<GoogleTypePostalAddress> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  revision: Schema.optional(Schema.Number),
  sublocality: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  recipients: Schema.optional(Schema.Array(Schema.String)),
  administrativeArea: Schema.optional(Schema.String),
  locality: Schema.optional(Schema.String),
  addressLines: Schema.optional(Schema.Array(Schema.String)),
  postalCode: Schema.optional(Schema.String),
  organization: Schema.optional(Schema.String),
  sortingCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleTypePostalAddress" }) as any as Schema.Schema<GoogleTypePostalAddress>;

export interface GoogleTypeMoney {
  /** Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. */
  nanos?: number;
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. */
  units?: string;
}

export const GoogleTypeMoney: Schema.Schema<GoogleTypeMoney> = Schema.suspend(() => Schema.Struct({
  nanos: Schema.optional(Schema.Number),
  currencyCode: Schema.optional(Schema.String),
  units: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleTypeMoney" }) as any as Schema.Schema<GoogleTypeMoney>;

export interface GoogleTypeDate {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const GoogleTypeDate: Schema.Schema<GoogleTypeDate> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeDate" }) as any as Schema.Schema<GoogleTypeDate>;

export interface GoogleCloudDocumentaiV1DocumentEntityNormalizedValue {
  /** Boolean value. Can be used for entities with binary values, or for checkboxes. */
  booleanValue?: boolean;
  /** Postal address. See also: https://github.com/googleapis/googleapis/blob/master/google/type/postal_address.proto */
  addressValue?: GoogleTypePostalAddress;
  /** Float value. */
  floatValue?: number;
  /** Integer value. */
  integerValue?: number;
  /** Money value. See also: https://github.com/googleapis/googleapis/blob/master/google/type/money.proto */
  moneyValue?: GoogleTypeMoney;
  /** Date value. Includes year, month, day. See also: https://github.com/googleapis/googleapis/blob/master/google/type/date.proto */
  dateValue?: GoogleTypeDate;
  /** DateTime value. Includes date, time, and timezone. See also: https://github.com/googleapis/googleapis/blob/master/google/type/datetime.proto */
  datetimeValue?: GoogleTypeDateTime;
  /** Optional. An optional field to store a normalized string. For some entity types, one of respective `structured_value` fields may also be populated. Also not all the types of `structured_value` will be normalized. For example, some processors may not generate `float` or `integer` normalized text by default. Below are sample formats mapped to structured values. - Money/Currency type (`money_value`) is in the ISO 4217 text format. - Date type (`date_value`) is in the ISO 8601 text format. - Datetime type (`datetime_value`) is in the ISO 8601 text format. */
  text?: string;
}

export const GoogleCloudDocumentaiV1DocumentEntityNormalizedValue: Schema.Schema<GoogleCloudDocumentaiV1DocumentEntityNormalizedValue> = Schema.suspend(() => Schema.Struct({
  booleanValue: Schema.optional(Schema.Boolean),
  addressValue: Schema.optional(GoogleTypePostalAddress),
  floatValue: Schema.optional(Schema.Number),
  integerValue: Schema.optional(Schema.Number),
  moneyValue: Schema.optional(GoogleTypeMoney),
  dateValue: Schema.optional(GoogleTypeDate),
  datetimeValue: Schema.optional(GoogleTypeDateTime),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentEntityNormalizedValue" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentEntityNormalizedValue>;

export interface GoogleCloudDocumentaiV1DocumentPageAnchorPageRef {
  /** Optional. Identifies the bounding polygon of a layout element on the page. If `layout_type` is set, the bounding polygon must be exactly the same to the layout element it's referring to. */
  boundingPoly?: GoogleCloudDocumentaiV1BoundingPoly;
  /** Optional. The type of the layout element that is being referenced if any. */
  layoutType?: "LAYOUT_TYPE_UNSPECIFIED" | "BLOCK" | "PARAGRAPH" | "LINE" | "TOKEN" | "VISUAL_ELEMENT" | "TABLE" | "FORM_FIELD" | (string & {});
  /** Optional. Deprecated. Use PageRef.bounding_poly instead. */
  layoutId?: string;
  /** Required. Index into the Document.pages element, for example using `Document.pages` to locate the related page element. This field is skipped when its value is the default `0`. See https://developers.google.com/protocol-buffers/docs/proto3#json. */
  page?: string;
  /** Optional. Confidence of detected page element, if applicable. Range `[0, 1]`. */
  confidence?: number;
}

export const GoogleCloudDocumentaiV1DocumentPageAnchorPageRef: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageAnchorPageRef> = Schema.suspend(() => Schema.Struct({
  boundingPoly: Schema.optional(GoogleCloudDocumentaiV1BoundingPoly),
  layoutType: Schema.optional(Schema.String),
  layoutId: Schema.optional(Schema.String),
  page: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageAnchorPageRef" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageAnchorPageRef>;

export interface GoogleCloudDocumentaiV1DocumentPageAnchor {
  /** One or more references to visual page elements */
  pageRefs?: Array<GoogleCloudDocumentaiV1DocumentPageAnchorPageRef>;
}

export const GoogleCloudDocumentaiV1DocumentPageAnchor: Schema.Schema<GoogleCloudDocumentaiV1DocumentPageAnchor> = Schema.suspend(() => Schema.Struct({
  pageRefs: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPageAnchorPageRef)),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentPageAnchor" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentPageAnchor>;

export interface GoogleCloudDocumentaiV1DocumentEntity {
  /** Optional. Text value of the entity e.g. `1600 Amphitheatre Pkwy`. */
  mentionText?: string;
  /** Optional. Normalized entity value. Absent if the extracted value could not be converted or the type (e.g. address) is not supported for certain parsers. This field is also only populated for certain supported document types. */
  normalizedValue?: GoogleCloudDocumentaiV1DocumentEntityNormalizedValue;
  /** Optional. Entities can be nested to form a hierarchical data structure representing the content in the document. */
  properties?: Array<GoogleCloudDocumentaiV1DocumentEntity>;
  /** Required. Entity type from a schema e.g. `Address`. */
  type?: string;
  /** Optional. Provenance of the entity. Text anchor indexing into the Document.text. */
  textAnchor?: GoogleCloudDocumentaiV1DocumentTextAnchor;
  /** Optional. Deprecated. Use `id` field instead. */
  mentionId?: string;
  /** Optional. Represents the provenance of this entity wrt. the location on the page where it was found. */
  pageAnchor?: GoogleCloudDocumentaiV1DocumentPageAnchor;
  /** Optional. Confidence of detected Schema entity. Range `[0, 1]`. */
  confidence?: number;
  /** Optional. The history of this annotation. */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
  /** Optional. Canonical id. This will be a unique value in the entity list for this document. */
  id?: string;
  /** Optional. Whether the entity will be redacted for de-identification purposes. */
  redacted?: boolean;
}

export const GoogleCloudDocumentaiV1DocumentEntity: Schema.Schema<GoogleCloudDocumentaiV1DocumentEntity> = Schema.suspend(() => Schema.Struct({
  mentionText: Schema.optional(Schema.String),
  normalizedValue: Schema.optional(GoogleCloudDocumentaiV1DocumentEntityNormalizedValue),
  properties: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentEntity)),
  type: Schema.optional(Schema.String),
  textAnchor: Schema.optional(GoogleCloudDocumentaiV1DocumentTextAnchor),
  mentionId: Schema.optional(Schema.String),
  pageAnchor: Schema.optional(GoogleCloudDocumentaiV1DocumentPageAnchor),
  confidence: Schema.optional(Schema.Number),
  provenance: Schema.optional(GoogleCloudDocumentaiV1DocumentProvenance),
  id: Schema.optional(Schema.String),
  redacted: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDocumentaiV1DocumentEntity" }) as any as Schema.Schema<GoogleCloudDocumentaiV1DocumentEntity>;

export interface GoogleCloudDocumentaiV1Document {
  /** Optional. Inline document content, represented as a stream of bytes. Note: As with all `bytes` fields, protobuffers use a pure binary representation, whereas JSON representations use base64. */
  content?: string;
  /** Optional. UTF-8 encoded text in reading order from the document. */
  text?: string;
  /** Document chunked based on chunking config. */
  chunkedDocument?: GoogleCloudDocumentaiV1DocumentChunkedDocument;
  /** Placeholder. Revision history of this document. */
  revisions?: Array<GoogleCloudDocumentaiV1DocumentRevision>;
  /** An IANA published [media type (MIME type)](https://www.iana.org/assignments/media-types/media-types.xhtml). */
  mimeType?: string;
  /** Placeholder. A list of text corrections made to Document.text. This is usually used for annotating corrections to OCR mistakes. Text changes for a given revision may not overlap with each other. */
  textChanges?: Array<GoogleCloudDocumentaiV1DocumentTextChange>;
  /** Styles for the Document.text. */
  textStyles?: Array<GoogleCloudDocumentaiV1DocumentStyle>;
  /** Visual page layout for the Document. */
  pages?: Array<GoogleCloudDocumentaiV1DocumentPage>;
  /** Parsed layout of the document. */
  documentLayout?: GoogleCloudDocumentaiV1DocumentDocumentLayout;
  /** Optional. Currently supports Google Cloud Storage URI of the form `gs://bucket_name/object_name`. Object versioning is not supported. For more information, refer to [Google Cloud Storage Request URIs](https://cloud.google.com/storage/docs/reference-uris). */
  uri?: string;
  /** Information about the sharding if this document is sharded part of a larger document. If the document is not sharded, this message is not specified. */
  shardInfo?: GoogleCloudDocumentaiV1DocumentShardInfo;
  /** Placeholder. Relationship among Document.entities. */
  entityRelations?: Array<GoogleCloudDocumentaiV1DocumentEntityRelation>;
  /** A list of entities detected on Document.text. For document shards, entities in this list may cross shard boundaries. */
  entities?: Array<GoogleCloudDocumentaiV1DocumentEntity>;
  /** Any error that occurred while processing this document. */
  error?: GoogleRpcStatus;
}

export const GoogleCloudDocumentaiV1Document: Schema.Schema<GoogleCloudDocumentaiV1Document> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
  chunkedDocument: Schema.optional(GoogleCloudDocumentaiV1DocumentChunkedDocument),
  revisions: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentRevision)),
  mimeType: Schema.optional(Schema.String),
  textChanges: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentTextChange)),
  textStyles: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentStyle)),
  pages: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentPage)),
  documentLayout: Schema.optional(GoogleCloudDocumentaiV1DocumentDocumentLayout),
  uri: Schema.optional(Schema.String),
  shardInfo: Schema.optional(GoogleCloudDocumentaiV1DocumentShardInfo),
  entityRelations: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentEntityRelation)),
  entities: Schema.optional(Schema.Array(GoogleCloudDocumentaiV1DocumentEntity)),
  error: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleCloudDocumentaiV1Document" }) as any as Schema.Schema<GoogleCloudDocumentaiV1Document>;

export interface GoogleCloudContentwarehouseV1Document {
  /** Required. Display name of the document given by the user. This name will be displayed in the UI. Customer can populate this field with the name of the document. This differs from the 'title' field as 'title' is optional and stores the top heading in the document. */
  displayName?: string;
  /** Title that describes the document. This can be the top heading or text that describes the document. */
  title?: string;
  /** Output only. The time when the document is last updated. */
  updateTime?: string;
  /** Indicates the category (image, audio, video etc.) of the original content. */
  contentCategory?: "CONTENT_CATEGORY_UNSPECIFIED" | "CONTENT_CATEGORY_IMAGE" | "CONTENT_CATEGORY_AUDIO" | "CONTENT_CATEGORY_VIDEO" | (string & {});
  /** Output only. If linked to a Collection with RetentionPolicy, the date when the document becomes mutable. */
  dispositionTime?: string;
  /** Raw document file in Cloud Storage path. */
  rawDocumentPath?: string;
  /** The reference ID set by customers. Must be unique per project and location. */
  referenceId?: string;
  /** This is used when DocAI was not used to load the document and parsing/ extracting is needed for the inline_raw_document. For example, if inline_raw_document is the byte representation of a PDF file, then this should be set to: RAW_DOCUMENT_FILE_TYPE_PDF. */
  rawDocumentFileType?: "RAW_DOCUMENT_FILE_TYPE_UNSPECIFIED" | "RAW_DOCUMENT_FILE_TYPE_PDF" | "RAW_DOCUMENT_FILE_TYPE_DOCX" | "RAW_DOCUMENT_FILE_TYPE_XLSX" | "RAW_DOCUMENT_FILE_TYPE_PPTX" | "RAW_DOCUMENT_FILE_TYPE_TEXT" | "RAW_DOCUMENT_FILE_TYPE_TIFF" | (string & {});
  /** If true, text extraction will not be performed. */
  textExtractionDisabled?: boolean;
  /** List of values that are user supplied metadata. */
  properties?: Array<GoogleCloudContentwarehouseV1Property>;
  /** Uri to display the document, for example, in the UI. */
  displayUri?: string;
  /** Document AI format to save the structured content, including OCR. */
  cloudAiDocument?: GoogleCloudDocumentaiV1Document;
  /** The resource name of the document. Format: projects/{project_number}/locations/{location}/documents/{document_id}. The name is ignored when creating a document. */
  name?: string;
  /** If true, text extraction will be performed. */
  textExtractionEnabled?: boolean;
  /** The user who lastly updates the document. */
  updater?: string;
  /** Output only. The time when the document is created. */
  createTime?: string;
  /** Other document format, such as PPTX, XLXS */
  plainText?: string;
  /** Output only. Indicates if the document has a legal hold on it. */
  legalHold?: boolean;
  /** Raw document content. */
  inlineRawDocument?: string;
  /** The user who creates the document. */
  creator?: string;
  /** The Document schema name. Format: projects/{project_number}/locations/{location}/documentSchemas/{document_schema_id}. */
  documentSchemaName?: string;
}

export const GoogleCloudContentwarehouseV1Document: Schema.Schema<GoogleCloudContentwarehouseV1Document> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  contentCategory: Schema.optional(Schema.String),
  dispositionTime: Schema.optional(Schema.String),
  rawDocumentPath: Schema.optional(Schema.String),
  referenceId: Schema.optional(Schema.String),
  rawDocumentFileType: Schema.optional(Schema.String),
  textExtractionDisabled: Schema.optional(Schema.Boolean),
  properties: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1Property)),
  displayUri: Schema.optional(Schema.String),
  cloudAiDocument: Schema.optional(GoogleCloudDocumentaiV1Document),
  name: Schema.optional(Schema.String),
  textExtractionEnabled: Schema.optional(Schema.Boolean),
  updater: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  plainText: Schema.optional(Schema.String),
  legalHold: Schema.optional(Schema.Boolean),
  inlineRawDocument: Schema.optional(Schema.String),
  creator: Schema.optional(Schema.String),
  documentSchemaName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1Document" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1Document>;

export interface GoogleCloudContentwarehouseV1CreateDocumentResponse {
  /** Additional information for the API invocation, such as the request tracking id. */
  metadata?: GoogleCloudContentwarehouseV1ResponseMetadata;
  /** Output from Rule Engine recording the rule evaluator and action executor's output. Refer format in: google/cloud/contentwarehouse/v1/rule_engine.proto */
  ruleEngineOutput?: GoogleCloudContentwarehouseV1RuleEngineOutput;
  /** post-processing LROs */
  longRunningOperations?: Array<GoogleLongrunningOperation>;
  /** Document created after executing create request. */
  document?: GoogleCloudContentwarehouseV1Document;
}

export const GoogleCloudContentwarehouseV1CreateDocumentResponse: Schema.Schema<GoogleCloudContentwarehouseV1CreateDocumentResponse> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(GoogleCloudContentwarehouseV1ResponseMetadata),
  ruleEngineOutput: Schema.optional(GoogleCloudContentwarehouseV1RuleEngineOutput),
  longRunningOperations: Schema.optional(Schema.Array(GoogleLongrunningOperation)),
  document: Schema.optional(GoogleCloudContentwarehouseV1Document),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1CreateDocumentResponse" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1CreateDocumentResponse>;

export interface GoogleCloudContentwarehouseV1EnumTypeOptions {
  /** Make sure the Enum property value provided in the document is in the possile value list during document creation. The validation check runs by default. */
  validationCheckDisabled?: boolean;
  /** Required. List of possible enum values. */
  possibleValues?: Array<string>;
}

export const GoogleCloudContentwarehouseV1EnumTypeOptions: Schema.Schema<GoogleCloudContentwarehouseV1EnumTypeOptions> = Schema.suspend(() => Schema.Struct({
  validationCheckDisabled: Schema.optional(Schema.Boolean),
  possibleValues: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1EnumTypeOptions" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1EnumTypeOptions>;

export interface GoogleCloudContentwarehouseV1RuleSet {
  /** Source of the rules i.e., customer name. */
  source?: string;
  /** The resource name of the rule set. Managed internally. Format: projects/{project_number}/locations/{location}/ruleSet/{rule_set_id}. The name is ignored when creating a rule set. */
  name?: string;
  /** List of rules given by the customer. */
  rules?: Array<GoogleCloudContentwarehouseV1Rule>;
  /** Short description of the rule-set. */
  description?: string;
}

export const GoogleCloudContentwarehouseV1RuleSet: Schema.Schema<GoogleCloudContentwarehouseV1RuleSet> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  rules: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1Rule)),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1RuleSet" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1RuleSet>;

export interface GoogleCloudContentwarehouseV1ListRuleSetsResponse {
  /** The rule sets from the specified parent. */
  ruleSets?: Array<GoogleCloudContentwarehouseV1RuleSet>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudContentwarehouseV1ListRuleSetsResponse: Schema.Schema<GoogleCloudContentwarehouseV1ListRuleSetsResponse> = Schema.suspend(() => Schema.Struct({
  ruleSets: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1RuleSet)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1ListRuleSetsResponse" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1ListRuleSetsResponse>;

export interface GoogleCloudContentwarehouseV1ExportToCdwPipeline {
  /** Ratio of training dataset split. When importing into Document AI Workbench, documents will be automatically split into training and test split category with the specified ratio. This field is required if doc_ai_dataset is set. */
  trainingSplitRatio?: number;
  /** Optional. The CDW dataset resource name. This field is optional. If not set, the documents will be exported to Cloud Storage only. Format: projects/{project}/locations/{location}/processors/{processor}/dataset */
  docAiDataset?: string;
  /** The Cloud Storage folder path used to store the exported documents before being sent to CDW. Format: `gs:///`. */
  exportFolderPath?: string;
  /** The list of all the resource names of the documents to be processed. Format: projects/{project_number}/locations/{location}/documents/{document_id}. */
  documents?: Array<string>;
}

export const GoogleCloudContentwarehouseV1ExportToCdwPipeline: Schema.Schema<GoogleCloudContentwarehouseV1ExportToCdwPipeline> = Schema.suspend(() => Schema.Struct({
  trainingSplitRatio: Schema.optional(Schema.Number),
  docAiDataset: Schema.optional(Schema.String),
  exportFolderPath: Schema.optional(Schema.String),
  documents: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1ExportToCdwPipeline" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1ExportToCdwPipeline>;

export interface GoogleApiServiceconsumermanagementV1PolicyBinding {
  /** Role. (https://cloud.google.com/iam/docs/understanding-roles) For example, `roles/viewer`, `roles/editor`, or `roles/owner`. */
  role?: string;
  /** Uses the same format as in IAM policy. `member` must include both a prefix and ID. For example, `user:{emailId}`, `serviceAccount:{emailId}`, `group:{emailId}`. */
  members?: Array<string>;
}

export const GoogleApiServiceconsumermanagementV1PolicyBinding: Schema.Schema<GoogleApiServiceconsumermanagementV1PolicyBinding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleApiServiceconsumermanagementV1PolicyBinding" }) as any as Schema.Schema<GoogleApiServiceconsumermanagementV1PolicyBinding>;

export interface GoogleCloudContentwarehouseV1QAResultHighlight {
  /** End index of the highlight, exclusive. */
  endIndex?: number;
  /** Start index of the highlight. */
  startIndex?: number;
}

export const GoogleCloudContentwarehouseV1QAResultHighlight: Schema.Schema<GoogleCloudContentwarehouseV1QAResultHighlight> = Schema.suspend(() => Schema.Struct({
  endIndex: Schema.optional(Schema.Number),
  startIndex: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1QAResultHighlight" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1QAResultHighlight>;

export interface GoogleCloudContentwarehouseV1QAResult {
  /** The calibrated confidence score for this document, in the range [0., 1.]. This represents the confidence level for whether the returned document and snippet answers the user's query. */
  confidenceScore?: number;
  /** Highlighted sections in the snippet. */
  highlights?: Array<GoogleCloudContentwarehouseV1QAResultHighlight>;
}

export const GoogleCloudContentwarehouseV1QAResult: Schema.Schema<GoogleCloudContentwarehouseV1QAResult> = Schema.suspend(() => Schema.Struct({
  confidenceScore: Schema.optional(Schema.Number),
  highlights: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1QAResultHighlight)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1QAResult" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1QAResult>;

export interface GoogleCloudContentwarehouseV1SearchDocumentsResponseMatchingDocument {
  /** Experimental. Additional result info if the question-answering feature is enabled. */
  qaResult?: GoogleCloudContentwarehouseV1QAResult;
  /** Contains snippets of text from the document full raw text that most closely match a search query's keywords, if available. All HTML tags in the original fields are stripped when returned in this field, and matching query keywords are enclosed in HTML bold tags. If the question-answering feature is enabled, this field will instead contain a snippet that answers the user's natural-language query. No HTML bold tags will be present, and highlights in the answer snippet can be found in QAResult.highlights. */
  searchTextSnippet?: string;
  /** Return the 1-based page indices where those pages have one or more matched tokens. */
  matchedTokenPageIndices?: Array<string>;
  /** Document that matches the specified SearchDocumentsRequest. This document only contains indexed metadata information. */
  document?: GoogleCloudContentwarehouseV1Document;
}

export const GoogleCloudContentwarehouseV1SearchDocumentsResponseMatchingDocument: Schema.Schema<GoogleCloudContentwarehouseV1SearchDocumentsResponseMatchingDocument> = Schema.suspend(() => Schema.Struct({
  qaResult: Schema.optional(GoogleCloudContentwarehouseV1QAResult),
  searchTextSnippet: Schema.optional(Schema.String),
  matchedTokenPageIndices: Schema.optional(Schema.Array(Schema.String)),
  document: Schema.optional(GoogleCloudContentwarehouseV1Document),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1SearchDocumentsResponseMatchingDocument" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1SearchDocumentsResponseMatchingDocument>;

export interface GoogleCloudContentwarehouseV1HistogramQueryResult {
  /** Requested histogram expression. */
  histogramQuery?: string;
  /** A map from the values of the facet associated with distinct values to the number of matching entries with corresponding value. The key format is: * (for string histogram) string values stored in the field. */
  histogram?: Record<string, string>;
}

export const GoogleCloudContentwarehouseV1HistogramQueryResult: Schema.Schema<GoogleCloudContentwarehouseV1HistogramQueryResult> = Schema.suspend(() => Schema.Struct({
  histogramQuery: Schema.optional(Schema.String),
  histogram: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1HistogramQueryResult" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1HistogramQueryResult>;

export interface GoogleCloudContentwarehouseV1SearchDocumentsResponse {
  /** Experimental. Question answer from the query against the document. */
  questionAnswer?: string;
  /** Additional information for the API invocation, such as the request tracking id. */
  metadata?: GoogleCloudContentwarehouseV1ResponseMetadata;
  /** The document entities that match the specified SearchDocumentsRequest. */
  matchingDocuments?: Array<GoogleCloudContentwarehouseV1SearchDocumentsResponseMatchingDocument>;
  /** The total number of matched documents which is available only if the client set SearchDocumentsRequest.require_total_size to `true` or set SearchDocumentsRequest.total_result_size to `ESTIMATED_SIZE` or `ACTUAL_SIZE`. Otherwise, the value will be `-1`. Typically a UI would handle this condition by displaying "of many", for example: "Displaying 10 of many". */
  totalSize?: number;
  /** The histogram results that match with the specified SearchDocumentsRequest.histogram_queries. */
  histogramQueryResults?: Array<GoogleCloudContentwarehouseV1HistogramQueryResult>;
  /** The token that specifies the starting position of the next page of results. This field is empty if there are no more results. */
  nextPageToken?: string;
}

export const GoogleCloudContentwarehouseV1SearchDocumentsResponse: Schema.Schema<GoogleCloudContentwarehouseV1SearchDocumentsResponse> = Schema.suspend(() => Schema.Struct({
  questionAnswer: Schema.optional(Schema.String),
  metadata: Schema.optional(GoogleCloudContentwarehouseV1ResponseMetadata),
  matchingDocuments: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1SearchDocumentsResponseMatchingDocument)),
  totalSize: Schema.optional(Schema.Number),
  histogramQueryResults: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1HistogramQueryResult)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1SearchDocumentsResponse" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1SearchDocumentsResponse>;

export interface GoogleCloudContentwarehouseV1TextTypeOptions {
}

export const GoogleCloudContentwarehouseV1TextTypeOptions: Schema.Schema<GoogleCloudContentwarehouseV1TextTypeOptions> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudContentwarehouseV1TextTypeOptions" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1TextTypeOptions>;

export interface GoogleCloudContentwarehouseV1MapTypeOptions {
}

export const GoogleCloudContentwarehouseV1MapTypeOptions: Schema.Schema<GoogleCloudContentwarehouseV1MapTypeOptions> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudContentwarehouseV1MapTypeOptions" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1MapTypeOptions>;

export interface GoogleCloudContentwarehouseV1TimestampTypeOptions {
}

export const GoogleCloudContentwarehouseV1TimestampTypeOptions: Schema.Schema<GoogleCloudContentwarehouseV1TimestampTypeOptions> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudContentwarehouseV1TimestampTypeOptions" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1TimestampTypeOptions>;

export interface GoogleCloudContentwarehouseV1FloatTypeOptions {
}

export const GoogleCloudContentwarehouseV1FloatTypeOptions: Schema.Schema<GoogleCloudContentwarehouseV1FloatTypeOptions> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudContentwarehouseV1FloatTypeOptions" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1FloatTypeOptions>;

export interface GoogleCloudContentwarehouseV1DateTimeTypeOptions {
}

export const GoogleCloudContentwarehouseV1DateTimeTypeOptions: Schema.Schema<GoogleCloudContentwarehouseV1DateTimeTypeOptions> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudContentwarehouseV1DateTimeTypeOptions" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1DateTimeTypeOptions>;

export interface GoogleCloudContentwarehouseV1IntegerTypeOptions {
}

export const GoogleCloudContentwarehouseV1IntegerTypeOptions: Schema.Schema<GoogleCloudContentwarehouseV1IntegerTypeOptions> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudContentwarehouseV1IntegerTypeOptions" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1IntegerTypeOptions>;

export interface GoogleCloudContentwarehouseV1PropertyTypeOptions {
  /** Required. List of property definitions. */
  propertyDefinitions?: Array<GoogleCloudContentwarehouseV1PropertyDefinition>;
}

export const GoogleCloudContentwarehouseV1PropertyTypeOptions: Schema.Schema<GoogleCloudContentwarehouseV1PropertyTypeOptions> = Schema.suspend(() => Schema.Struct({
  propertyDefinitions: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1PropertyDefinition)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1PropertyTypeOptions" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1PropertyTypeOptions>;

export interface GoogleCloudContentwarehouseV1PropertyDefinitionSchemaSource {
  /** The Doc AI processor type name. */
  processorType?: string;
  /** The schema name in the source. */
  name?: string;
}

export const GoogleCloudContentwarehouseV1PropertyDefinitionSchemaSource: Schema.Schema<GoogleCloudContentwarehouseV1PropertyDefinitionSchemaSource> = Schema.suspend(() => Schema.Struct({
  processorType: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1PropertyDefinitionSchemaSource" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1PropertyDefinitionSchemaSource>;

export interface GoogleCloudContentwarehouseV1PropertyDefinition {
  /** Required. The name of the metadata property. Must be unique within a document schema and is case insensitive. Names must be non-blank, start with a letter, and can contain alphanumeric characters and: /, :, -, _, and . */
  name?: string;
  /** Indicates that the property should be included in a global search. */
  isSearchable?: boolean;
  /** Whether the property can be filtered. If this is a sub-property, all the parent properties must be marked filterable. */
  isFilterable?: boolean;
  /** Text/string property. */
  textTypeOptions?: GoogleCloudContentwarehouseV1TextTypeOptions;
  /** Map property. */
  mapTypeOptions?: GoogleCloudContentwarehouseV1MapTypeOptions;
  /** Timestamp property. It is not supported by CMEK compliant deployment. */
  timestampTypeOptions?: GoogleCloudContentwarehouseV1TimestampTypeOptions;
  /** Whether the property is mandatory. Default is 'false', i.e. populating property value can be skipped. If 'true' then user must populate the value for this property. */
  isRequired?: boolean;
  /** Float property. */
  floatTypeOptions?: GoogleCloudContentwarehouseV1FloatTypeOptions;
  /** Enum/categorical property. */
  enumTypeOptions?: GoogleCloudContentwarehouseV1EnumTypeOptions;
  /** Whether the property can have multiple values. */
  isRepeatable?: boolean;
  /** The display-name for the property, used for front-end. */
  displayName?: string;
  /** Whether the property is user supplied metadata. This out-of-the box placeholder setting can be used to tag derived properties. Its value and interpretation logic should be implemented by API user. */
  isMetadata?: boolean;
  /** Date time property. It is not supported by CMEK compliant deployment. */
  dateTimeTypeOptions?: GoogleCloudContentwarehouseV1DateTimeTypeOptions;
  /** Integer property. */
  integerTypeOptions?: GoogleCloudContentwarehouseV1IntegerTypeOptions;
  /** Nested structured data property. */
  propertyTypeOptions?: GoogleCloudContentwarehouseV1PropertyTypeOptions;
  /** The retrieval importance of the property during search. */
  retrievalImportance?: "RETRIEVAL_IMPORTANCE_UNSPECIFIED" | "HIGHEST" | "HIGHER" | "HIGH" | "MEDIUM" | "LOW" | "LOWEST" | (string & {});
  /** The mapping information between this property to another schema source. */
  schemaSources?: Array<GoogleCloudContentwarehouseV1PropertyDefinitionSchemaSource>;
}

export const GoogleCloudContentwarehouseV1PropertyDefinition: Schema.Schema<GoogleCloudContentwarehouseV1PropertyDefinition> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  isSearchable: Schema.optional(Schema.Boolean),
  isFilterable: Schema.optional(Schema.Boolean),
  textTypeOptions: Schema.optional(GoogleCloudContentwarehouseV1TextTypeOptions),
  mapTypeOptions: Schema.optional(GoogleCloudContentwarehouseV1MapTypeOptions),
  timestampTypeOptions: Schema.optional(GoogleCloudContentwarehouseV1TimestampTypeOptions),
  isRequired: Schema.optional(Schema.Boolean),
  floatTypeOptions: Schema.optional(GoogleCloudContentwarehouseV1FloatTypeOptions),
  enumTypeOptions: Schema.optional(GoogleCloudContentwarehouseV1EnumTypeOptions),
  isRepeatable: Schema.optional(Schema.Boolean),
  displayName: Schema.optional(Schema.String),
  isMetadata: Schema.optional(Schema.Boolean),
  dateTimeTypeOptions: Schema.optional(GoogleCloudContentwarehouseV1DateTimeTypeOptions),
  integerTypeOptions: Schema.optional(GoogleCloudContentwarehouseV1IntegerTypeOptions),
  propertyTypeOptions: Schema.optional(GoogleCloudContentwarehouseV1PropertyTypeOptions),
  retrievalImportance: Schema.optional(Schema.String),
  schemaSources: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1PropertyDefinitionSchemaSource)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1PropertyDefinition" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1PropertyDefinition>;

export interface GoogleCloudContentwarehouseV1FileTypeFilter {
  /** The type of files to return. */
  fileType?: "FILE_TYPE_UNSPECIFIED" | "ALL" | "FOLDER" | "DOCUMENT" | "ROOT_FOLDER" | (string & {});
}

export const GoogleCloudContentwarehouseV1FileTypeFilter: Schema.Schema<GoogleCloudContentwarehouseV1FileTypeFilter> = Schema.suspend(() => Schema.Struct({
  fileType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1FileTypeFilter" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1FileTypeFilter>;

export interface GoogleCloudContentwarehouseV1MergeFieldsOptions {
  /** When merging message fields, the default behavior is to merge the content of two message fields together. If you instead want to use the field from the source message to replace the corresponding field in the destination message, set this flag to true. When this flag is set, specified submessage fields that are missing in source will be cleared in destination. */
  replaceMessageFields?: boolean;
  /** When merging repeated fields, the default behavior is to append entries from the source repeated field to the destination repeated field. If you instead want to keep only the entries from the source repeated field, set this flag to true. If you want to replace a repeated field within a message field on the destination message, you must set both replace_repeated_fields and replace_message_fields to true, otherwise the repeated fields will be appended. */
  replaceRepeatedFields?: boolean;
}

export const GoogleCloudContentwarehouseV1MergeFieldsOptions: Schema.Schema<GoogleCloudContentwarehouseV1MergeFieldsOptions> = Schema.suspend(() => Schema.Struct({
  replaceMessageFields: Schema.optional(Schema.Boolean),
  replaceRepeatedFields: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1MergeFieldsOptions" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1MergeFieldsOptions>;

export interface GoogleCloudContentwarehouseV1IngestPipelineConfig {
  /** The document level acl policy config. This refers to an Identity and Access (IAM) policy, which specifies access controls for all documents ingested by the pipeline. The role and members under the policy needs to be specified. The following roles are supported for document level acl control: * roles/contentwarehouse.documentAdmin * roles/contentwarehouse.documentEditor * roles/contentwarehouse.documentViewer The following members are supported for document level acl control: * user:user-email@example.com * group:group-email@example.com Note that for documents searched with LLM, only single level user or group acl check is supported. */
  documentAclPolicy?: GoogleIamV1Policy;
  /** The Cloud Function resource name. The Cloud Function needs to live inside consumer project and is accessible to Document AI Warehouse P4SA. Only Cloud Functions V2 is supported. Cloud function execution should complete within 5 minutes or this file ingestion may fail due to timeout. Format: `https://{region}-{project_id}.cloudfunctions.net/{cloud_function}` The following keys are available the request json payload. * display_name * properties * plain_text * reference_id * document_schema_name * raw_document_path * raw_document_file_type The following keys from the cloud function json response payload will be ingested to the Document AI Warehouse as part of Document proto content and/or related information. The original values will be overridden if any key is present in the response. * display_name * properties * plain_text * document_acl_policy * folder */
  cloudFunction?: string;
  /** The document text extraction enabled flag. If the flag is set to true, DWH will perform text extraction on the raw document. */
  enableDocumentTextExtraction?: boolean;
  /** Optional. The name of the folder to which all ingested documents will be linked during ingestion process. Format is `projects/{project}/locations/{location}/documents/{folder_id}` */
  folder?: string;
}

export const GoogleCloudContentwarehouseV1IngestPipelineConfig: Schema.Schema<GoogleCloudContentwarehouseV1IngestPipelineConfig> = Schema.suspend(() => Schema.Struct({
  documentAclPolicy: Schema.optional(GoogleIamV1Policy),
  cloudFunction: Schema.optional(Schema.String),
  enableDocumentTextExtraction: Schema.optional(Schema.Boolean),
  folder: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1IngestPipelineConfig" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1IngestPipelineConfig>;

export interface GoogleCloudContentwarehouseV1ProcessorInfo {
  /** The processor resource name. Format is `projects/{project}/locations/{location}/processors/{processor}`, or `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}` */
  processorName?: string;
  /** The Document schema resource name. All documents processed by this processor will use this schema. Format: projects/{project_number}/locations/{location}/documentSchemas/{document_schema_id}. */
  schemaName?: string;
  /** The processor will process the documents with this document type. */
  documentType?: string;
}

export const GoogleCloudContentwarehouseV1ProcessorInfo: Schema.Schema<GoogleCloudContentwarehouseV1ProcessorInfo> = Schema.suspend(() => Schema.Struct({
  processorName: Schema.optional(Schema.String),
  schemaName: Schema.optional(Schema.String),
  documentType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1ProcessorInfo" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1ProcessorInfo>;

export interface GoogleCloudContentwarehouseV1GcsIngestWithDocAiProcessorsPipeline {
  /** Optional. The config for the Cloud Storage Ingestion with DocAI Processors pipeline. It provides additional customization options to run the pipeline and can be skipped if it is not applicable. */
  pipelineConfig?: GoogleCloudContentwarehouseV1IngestPipelineConfig;
  /** The input Cloud Storage folder. All files under this folder will be imported to Document Warehouse. Format: `gs:///`. */
  inputPath?: string;
  /** The flag whether to skip ingested documents. If it is set to true, documents in Cloud Storage contains key "status" with value "status=ingested" in custom metadata will be skipped to ingest. */
  skipIngestedDocuments?: boolean;
  /** The split and classify processor information. The split and classify result will be used to find a matched extract processor. */
  splitClassifyProcessorInfo?: GoogleCloudContentwarehouseV1ProcessorInfo;
  /** The Cloud Storage folder path used to store the raw results from processors. Format: `gs:///`. */
  processorResultsFolderPath?: string;
  /** The extract processors information. One matched extract processor will be used to process documents based on the classify processor result. If no classify processor is specified, the first extract processor will be used. */
  extractProcessorInfos?: Array<GoogleCloudContentwarehouseV1ProcessorInfo>;
}

export const GoogleCloudContentwarehouseV1GcsIngestWithDocAiProcessorsPipeline: Schema.Schema<GoogleCloudContentwarehouseV1GcsIngestWithDocAiProcessorsPipeline> = Schema.suspend(() => Schema.Struct({
  pipelineConfig: Schema.optional(GoogleCloudContentwarehouseV1IngestPipelineConfig),
  inputPath: Schema.optional(Schema.String),
  skipIngestedDocuments: Schema.optional(Schema.Boolean),
  splitClassifyProcessorInfo: Schema.optional(GoogleCloudContentwarehouseV1ProcessorInfo),
  processorResultsFolderPath: Schema.optional(Schema.String),
  extractProcessorInfos: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1ProcessorInfo)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1GcsIngestWithDocAiProcessorsPipeline" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1GcsIngestWithDocAiProcessorsPipeline>;

export interface GoogleCloudContentwarehouseV1UpdateOptions {
  /** Options for merging. */
  mergeFieldsOptions?: GoogleCloudContentwarehouseV1MergeFieldsOptions;
  /** Field mask for merging Document fields. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Type for update. */
  updateType?: "UPDATE_TYPE_UNSPECIFIED" | "UPDATE_TYPE_REPLACE" | "UPDATE_TYPE_MERGE" | "UPDATE_TYPE_INSERT_PROPERTIES_BY_NAMES" | "UPDATE_TYPE_REPLACE_PROPERTIES_BY_NAMES" | "UPDATE_TYPE_DELETE_PROPERTIES_BY_NAMES" | "UPDATE_TYPE_MERGE_AND_REPLACE_OR_INSERT_PROPERTIES_BY_NAMES" | (string & {});
}

export const GoogleCloudContentwarehouseV1UpdateOptions: Schema.Schema<GoogleCloudContentwarehouseV1UpdateOptions> = Schema.suspend(() => Schema.Struct({
  mergeFieldsOptions: Schema.optional(GoogleCloudContentwarehouseV1MergeFieldsOptions),
  updateMask: Schema.optional(Schema.String),
  updateType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1UpdateOptions" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1UpdateOptions>;

export interface GoogleCloudContentwarehouseV1CreateDocumentMetadata {
}

export const GoogleCloudContentwarehouseV1CreateDocumentMetadata: Schema.Schema<GoogleCloudContentwarehouseV1CreateDocumentMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudContentwarehouseV1CreateDocumentMetadata" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1CreateDocumentMetadata>;

export interface GoogleCloudContentwarehouseV1WeightedSchemaProperty {
  /** The document schema name. */
  documentSchemaName?: string;
  /** The property definition names in the schema. */
  propertyNames?: Array<string>;
}

export const GoogleCloudContentwarehouseV1WeightedSchemaProperty: Schema.Schema<GoogleCloudContentwarehouseV1WeightedSchemaProperty> = Schema.suspend(() => Schema.Struct({
  documentSchemaName: Schema.optional(Schema.String),
  propertyNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1WeightedSchemaProperty" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1WeightedSchemaProperty>;

export interface GoogleApiServiceconsumermanagementV1BillingConfig {
  /** Name of the billing account. For example `billingAccounts/012345-567890-ABCDEF`. */
  billingAccount?: string;
}

export const GoogleApiServiceconsumermanagementV1BillingConfig: Schema.Schema<GoogleApiServiceconsumermanagementV1BillingConfig> = Schema.suspend(() => Schema.Struct({
  billingAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleApiServiceconsumermanagementV1BillingConfig" }) as any as Schema.Schema<GoogleApiServiceconsumermanagementV1BillingConfig>;

export interface CloudAiPlatformTenantresourceTenantProjectConfig {
  /** Input/Output [Required]. The folder that holds tenant projects and folder-level permissions will be automatically granted to all tenant projects under the folder. Note: the valid folder format is `folders/{folder_number}`. */
  folder?: string;
  /** Input/Output [Required]. The API services that are enabled on the tenant project during creation. */
  services?: Array<string>;
  /** Input/Output [Required]. The billing account properties to create the tenant project. */
  billingConfig?: GoogleApiServiceconsumermanagementV1BillingConfig;
  /** Input/Output [Required]. The policy bindings that are applied to the tenant project during creation. At least one binding must have the role `roles/owner` with either `user` or `group` type. */
  policyBindings?: Array<GoogleApiServiceconsumermanagementV1PolicyBinding>;
}

export const CloudAiPlatformTenantresourceTenantProjectConfig: Schema.Schema<CloudAiPlatformTenantresourceTenantProjectConfig> = Schema.suspend(() => Schema.Struct({
  folder: Schema.optional(Schema.String),
  services: Schema.optional(Schema.Array(Schema.String)),
  billingConfig: Schema.optional(GoogleApiServiceconsumermanagementV1BillingConfig),
  policyBindings: Schema.optional(Schema.Array(GoogleApiServiceconsumermanagementV1PolicyBinding)),
})).annotate({ identifier: "CloudAiPlatformTenantresourceTenantProjectConfig" }) as any as Schema.Schema<CloudAiPlatformTenantresourceTenantProjectConfig>;

export interface CloudAiPlatformTenantresourceCloudSqlInstanceConfig {
  /** Input [Optional]. MDB roles for corp access to CloudSQL instance. */
  mdbRolesForCorpAccess?: Array<string>;
  /** Output only. The CloudSQL instance connection name. */
  cloudSqlInstanceConnectionName?: string;
  /** Output only. The SLM instance's full resource name. */
  slmInstanceName?: string;
  /** Input/Output [Optional]. The CloudSQL instance name within SLM instance. If not set, a random UUIC will be generated as instance name. */
  cloudSqlInstanceName?: string;
  /** Input [Required]. The SLM instance template to provision CloudSQL. */
  slmInstanceTemplate?: string;
  /** Input [Optional]. The KMS key name or the KMS grant name used for CMEK encryption. Only set this field when provisioning new CloudSQL instances. For existing CloudSQL instances, this field will be ignored because CMEK re-encryption is not supported. */
  kmsKeyReference?: string;
  /** Input [Required]. The SLM instance type to provision CloudSQL. */
  slmInstanceType?: string;
}

export const CloudAiPlatformTenantresourceCloudSqlInstanceConfig: Schema.Schema<CloudAiPlatformTenantresourceCloudSqlInstanceConfig> = Schema.suspend(() => Schema.Struct({
  mdbRolesForCorpAccess: Schema.optional(Schema.Array(Schema.String)),
  cloudSqlInstanceConnectionName: Schema.optional(Schema.String),
  slmInstanceName: Schema.optional(Schema.String),
  cloudSqlInstanceName: Schema.optional(Schema.String),
  slmInstanceTemplate: Schema.optional(Schema.String),
  kmsKeyReference: Schema.optional(Schema.String),
  slmInstanceType: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudAiPlatformTenantresourceCloudSqlInstanceConfig" }) as any as Schema.Schema<CloudAiPlatformTenantresourceCloudSqlInstanceConfig>;

export interface CloudAiPlatformTenantresourceGcsBucketConfig {
  /** Input/Output [Optional]. The name of a GCS bucket with max length of 63 chars. If not set, a random UUID will be generated as bucket name. */
  bucketName?: string;
  /** Input/Output [Optional]. The KMS key name or the KMS grant name used for CMEK encryption. Only set this field when provisioning new GCS bucket. For existing GCS bucket, this field will be ignored because CMEK re-encryption is not supported. */
  kmsKeyReference?: string;
  /** Input/Output [Optional]. Only needed when the content in bucket need to be garbage collected within some amount of days. */
  ttlDays?: number;
  admins?: Array<string>;
  /** Input/Output [Required]. IAM roles (viewer/admin) put on the bucket. */
  viewers?: Array<string>;
  /** Input/Output [Optional]. Only needed for per-entity tenant GCP resources. During Deprovision API, the on-demand deletion will only cover the tenant GCP resources with the specified entity name. */
  entityName?: string;
}

export const CloudAiPlatformTenantresourceGcsBucketConfig: Schema.Schema<CloudAiPlatformTenantresourceGcsBucketConfig> = Schema.suspend(() => Schema.Struct({
  bucketName: Schema.optional(Schema.String),
  kmsKeyReference: Schema.optional(Schema.String),
  ttlDays: Schema.optional(Schema.Number),
  admins: Schema.optional(Schema.Array(Schema.String)),
  viewers: Schema.optional(Schema.Array(Schema.String)),
  entityName: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudAiPlatformTenantresourceGcsBucketConfig" }) as any as Schema.Schema<CloudAiPlatformTenantresourceGcsBucketConfig>;

export interface CloudAiPlatformTenantresourceTenantServiceAccountIdentity {
  /** Output only. The email address of the generated service account. */
  serviceAccountEmail?: string;
  /** Input/Output [Required]. The service that the service account belongs to. (e.g. cloudbuild.googleapis.com for GCB service accounts) */
  serviceName?: string;
}

export const CloudAiPlatformTenantresourceTenantServiceAccountIdentity: Schema.Schema<CloudAiPlatformTenantresourceTenantServiceAccountIdentity> = Schema.suspend(() => Schema.Struct({
  serviceAccountEmail: Schema.optional(Schema.String),
  serviceName: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudAiPlatformTenantresourceTenantServiceAccountIdentity" }) as any as Schema.Schema<CloudAiPlatformTenantresourceTenantServiceAccountIdentity>;

export interface CloudAiPlatformTenantresourceIamPolicyBinding {
  /** Input/Output [Required]. The role for members below. */
  role?: string;
  /** Input/Output [Required]. Specifies the type of resource that will be accessed by members. */
  resourceType?: "RESOURCE_TYPE_UNSPECIFIED" | "PROJECT" | "SERVICE_ACCOUNT" | "GCS_BUCKET" | "SERVICE_CONSUMER" | "AR_REPO" | (string & {});
  /** Input/Output [Required]. The member service accounts with the roles above. Note: placeholders are same as the resource above. */
  members?: Array<string>;
  /** Input/Output [Required]. The resource name that will be accessed by members, which also depends on resource_type. Note: placeholders are supported in resource names. For example, ${tpn} will be used when the tenant project number is not ready. */
  resource?: string;
}

export const CloudAiPlatformTenantresourceIamPolicyBinding: Schema.Schema<CloudAiPlatformTenantresourceIamPolicyBinding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
  resource: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudAiPlatformTenantresourceIamPolicyBinding" }) as any as Schema.Schema<CloudAiPlatformTenantresourceIamPolicyBinding>;

export interface CloudAiPlatformTenantresourceTenantProjectResource {
  /** The configurations of a tenant project. */
  tenantProjectConfig?: CloudAiPlatformTenantresourceTenantProjectConfig;
  /** Output only. The tenant project number that has been created. */
  tenantProjectNumber?: string;
  /** The CloudSQL instances that are provisioned under the tenant project. */
  cloudSqlInstances?: Array<CloudAiPlatformTenantresourceCloudSqlInstanceConfig>;
  /** The GCS buckets that are provisioned under the tenant project. */
  gcsBuckets?: Array<CloudAiPlatformTenantresourceGcsBucketConfig>;
  /** Output only. The tenant project ID that has been created. */
  tenantProjectId?: string;
  /** Input/Output [Required]. The tag that uniquely identifies a tenant project within a tenancy unit. Note: for the same tenant project tag, all tenant manager operations should be idempotent. */
  tag?: string;
  /** The service account identities (or enabled API service's P4SA) that are expclicitly created under the tenant project (before JIT provisioning during enabled API services). */
  tenantServiceAccounts?: Array<CloudAiPlatformTenantresourceTenantServiceAccountIdentity>;
  /** The dynamic IAM bindings that are granted under the tenant project. Note: this should only add new bindings to the project if they don't exist and the existing bindings won't be affected. */
  iamPolicyBindings?: Array<CloudAiPlatformTenantresourceIamPolicyBinding>;
  /** The Infra Spanner databases that are provisioned under the tenant project. Note: this is an experimental feature. */
  infraSpannerConfigs?: Array<CloudAiPlatformTenantresourceInfraSpannerConfig>;
}

export const CloudAiPlatformTenantresourceTenantProjectResource: Schema.Schema<CloudAiPlatformTenantresourceTenantProjectResource> = Schema.suspend(() => Schema.Struct({
  tenantProjectConfig: Schema.optional(CloudAiPlatformTenantresourceTenantProjectConfig),
  tenantProjectNumber: Schema.optional(Schema.String),
  cloudSqlInstances: Schema.optional(Schema.Array(CloudAiPlatformTenantresourceCloudSqlInstanceConfig)),
  gcsBuckets: Schema.optional(Schema.Array(CloudAiPlatformTenantresourceGcsBucketConfig)),
  tenantProjectId: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.String),
  tenantServiceAccounts: Schema.optional(Schema.Array(CloudAiPlatformTenantresourceTenantServiceAccountIdentity)),
  iamPolicyBindings: Schema.optional(Schema.Array(CloudAiPlatformTenantresourceIamPolicyBinding)),
  infraSpannerConfigs: Schema.optional(Schema.Array(CloudAiPlatformTenantresourceInfraSpannerConfig)),
})).annotate({ identifier: "CloudAiPlatformTenantresourceTenantProjectResource" }) as any as Schema.Schema<CloudAiPlatformTenantresourceTenantProjectResource>;

export interface GoogleCloudContentwarehouseV1UserInfo {
  /** A unique user identification string, as determined by the client. The maximum number of allowed characters is 255. Allowed characters include numbers 0 to 9, uppercase and lowercase letters, and restricted special symbols (:, @, +, -, _, ~) The format is "user:xxxx@example.com"; */
  id?: string;
  /** The unique group identifications which the user is belong to. The format is "group:yyyy@example.com"; */
  groupIds?: Array<string>;
}

export const GoogleCloudContentwarehouseV1UserInfo: Schema.Schema<GoogleCloudContentwarehouseV1UserInfo> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  groupIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1UserInfo" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1UserInfo>;

export interface GoogleCloudContentwarehouseV1RequestMetadata {
  /** Provides user unique identification and groups information. */
  userInfo?: GoogleCloudContentwarehouseV1UserInfo;
}

export const GoogleCloudContentwarehouseV1RequestMetadata: Schema.Schema<GoogleCloudContentwarehouseV1RequestMetadata> = Schema.suspend(() => Schema.Struct({
  userInfo: Schema.optional(GoogleCloudContentwarehouseV1UserInfo),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1RequestMetadata" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1RequestMetadata>;

export interface GoogleCloudContentwarehouseV1SetAclRequest {
  /** Required. REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. This refers to an Identity and Access (IAM) policy, which specifies access controls for the Document. You can set ACL with condition for projects only. Supported operators are: `=`, `!=`, `<`, `<=`, `>`, and `>=` where the left of the operator is `DocumentSchemaId` or property name and the right of the operator is a number or a quoted string. You must escape backslash (\\) and quote (\") characters. Boolean expressions (AND/OR) are supported up to 3 levels of nesting (for example, "((A AND B AND C) OR D) AND E"), a maximum of 10 comparisons are allowed in the expression. The expression must be < 6000 bytes in length. Sample condition: `"DocumentSchemaId = \"some schema id\" OR SchemaId.floatPropertyName >= 10"` */
  policy?: GoogleIamV1Policy;
  /** For Set Project ACL only. Authorization check for end user will be ignored when project_owner=true. */
  projectOwner?: boolean;
  /** The meta information collected about the end user, used to enforce access control for the service. */
  requestMetadata?: GoogleCloudContentwarehouseV1RequestMetadata;
}

export const GoogleCloudContentwarehouseV1SetAclRequest: Schema.Schema<GoogleCloudContentwarehouseV1SetAclRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(GoogleIamV1Policy),
  projectOwner: Schema.optional(Schema.Boolean),
  requestMetadata: Schema.optional(GoogleCloudContentwarehouseV1RequestMetadata),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1SetAclRequest" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1SetAclRequest>;

export interface GoogleCloudContentwarehouseV1CloudAIDocumentOption {
  /** If set, only selected entities will be converted to properties. */
  customizedEntitiesPropertiesConversions?: Record<string, string>;
  /** Whether to convert all the entities to properties. */
  enableEntitiesConversions?: boolean;
}

export const GoogleCloudContentwarehouseV1CloudAIDocumentOption: Schema.Schema<GoogleCloudContentwarehouseV1CloudAIDocumentOption> = Schema.suspend(() => Schema.Struct({
  customizedEntitiesPropertiesConversions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  enableEntitiesConversions: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1CloudAIDocumentOption" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1CloudAIDocumentOption>;

export interface GoogleCloudContentwarehouseV1CreateDocumentRequest {
  /** Required. The document to create. */
  document?: GoogleCloudContentwarehouseV1Document;
  /** Default document policy during creation. This refers to an Identity and Access (IAM) policy, which specifies access controls for the Document. Conditions defined in the policy will be ignored. */
  policy?: GoogleIamV1Policy;
  /** The meta information collected about the end user, used to enforce access control for the service. */
  requestMetadata?: GoogleCloudContentwarehouseV1RequestMetadata;
  /** Field mask for creating Document fields. If mask path is empty, it means all fields are masked. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask. */
  createMask?: string;
  /** Request Option for processing Cloud AI Document in Document Warehouse. This field offers limited support for mapping entities from Cloud AI Document to Warehouse Document. Please consult with product team before using this field and other available options. */
  cloudAiDocumentOption?: GoogleCloudContentwarehouseV1CloudAIDocumentOption;
}

export const GoogleCloudContentwarehouseV1CreateDocumentRequest: Schema.Schema<GoogleCloudContentwarehouseV1CreateDocumentRequest> = Schema.suspend(() => Schema.Struct({
  document: Schema.optional(GoogleCloudContentwarehouseV1Document),
  policy: Schema.optional(GoogleIamV1Policy),
  requestMetadata: Schema.optional(GoogleCloudContentwarehouseV1RequestMetadata),
  createMask: Schema.optional(Schema.String),
  cloudAiDocumentOption: Schema.optional(GoogleCloudContentwarehouseV1CloudAIDocumentOption),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1CreateDocumentRequest" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1CreateDocumentRequest>;

export interface GoogleCloudContentwarehouseV1FetchAclRequest {
  /** The meta information collected about the end user, used to enforce access control for the service. */
  requestMetadata?: GoogleCloudContentwarehouseV1RequestMetadata;
  /** For Get Project ACL only. Authorization check for end user will be ignored when project_owner=true. */
  projectOwner?: boolean;
}

export const GoogleCloudContentwarehouseV1FetchAclRequest: Schema.Schema<GoogleCloudContentwarehouseV1FetchAclRequest> = Schema.suspend(() => Schema.Struct({
  requestMetadata: Schema.optional(GoogleCloudContentwarehouseV1RequestMetadata),
  projectOwner: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1FetchAclRequest" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1FetchAclRequest>;

export interface GoogleTypeInterval {
  /** Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start. */
  startTime?: string;
  /** Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end. */
  endTime?: string;
}

export const GoogleTypeInterval: Schema.Schema<GoogleTypeInterval> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleTypeInterval" }) as any as Schema.Schema<GoogleTypeInterval>;

export interface GoogleCloudContentwarehouseV1TimeFilter {
  timeRange?: GoogleTypeInterval;
  /** Specifies which time field to filter documents on. Defaults to TimeField.UPLOAD_TIME. */
  timeField?: "TIME_FIELD_UNSPECIFIED" | "CREATE_TIME" | "UPDATE_TIME" | "DISPOSITION_TIME" | (string & {});
}

export const GoogleCloudContentwarehouseV1TimeFilter: Schema.Schema<GoogleCloudContentwarehouseV1TimeFilter> = Schema.suspend(() => Schema.Struct({
  timeRange: Schema.optional(GoogleTypeInterval),
  timeField: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1TimeFilter" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1TimeFilter>;

export interface GoogleCloudContentwarehouseV1UpdateDocumentMetadata {
}

export const GoogleCloudContentwarehouseV1UpdateDocumentMetadata: Schema.Schema<GoogleCloudContentwarehouseV1UpdateDocumentMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudContentwarehouseV1UpdateDocumentMetadata" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1UpdateDocumentMetadata>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleCloudContentwarehouseV1SynonymSetSynonym {
  /** For example: sale, invoice, bill, order */
  words?: Array<string>;
}

export const GoogleCloudContentwarehouseV1SynonymSetSynonym: Schema.Schema<GoogleCloudContentwarehouseV1SynonymSetSynonym> = Schema.suspend(() => Schema.Struct({
  words: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1SynonymSetSynonym" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1SynonymSetSynonym>;

export interface GoogleCloudContentwarehouseV1SynonymSet {
  /** The resource name of the SynonymSet This is mandatory for google.api.resource. Format: projects/{project_number}/locations/{location}/synonymSets/{context}. */
  name?: string;
  /** This is a freeform field. Example contexts can be "sales," "engineering," "real estate," "accounting," etc. The context can be supplied during search requests. */
  context?: string;
  /** List of Synonyms for the context. */
  synonyms?: Array<GoogleCloudContentwarehouseV1SynonymSetSynonym>;
}

export const GoogleCloudContentwarehouseV1SynonymSet: Schema.Schema<GoogleCloudContentwarehouseV1SynonymSet> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  context: Schema.optional(Schema.String),
  synonyms: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1SynonymSetSynonym)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1SynonymSet" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1SynonymSet>;

export interface GoogleCloudContentwarehouseV1ListSynonymSetsResponse {
  /** The synonymSets from the specified parent. */
  synonymSets?: Array<GoogleCloudContentwarehouseV1SynonymSet>;
  /** A page token, received from a previous `ListSynonymSets` call. Provide this to retrieve the subsequent page. */
  nextPageToken?: string;
}

export const GoogleCloudContentwarehouseV1ListSynonymSetsResponse: Schema.Schema<GoogleCloudContentwarehouseV1ListSynonymSetsResponse> = Schema.suspend(() => Schema.Struct({
  synonymSets: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1SynonymSet)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1ListSynonymSetsResponse" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1ListSynonymSetsResponse>;

export interface GoogleCloudContentwarehouseV1RunPipelineMetadataIndividualDocumentStatus {
  /** The status processing the document. */
  status?: GoogleRpcStatus;
  /** Document identifier of an existing document. */
  documentId?: string;
}

export const GoogleCloudContentwarehouseV1RunPipelineMetadataIndividualDocumentStatus: Schema.Schema<GoogleCloudContentwarehouseV1RunPipelineMetadataIndividualDocumentStatus> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(GoogleRpcStatus),
  documentId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1RunPipelineMetadataIndividualDocumentStatus" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1RunPipelineMetadataIndividualDocumentStatus>;

export interface GoogleCloudContentwarehouseV1beta1InitializeProjectResponse {
  /** The message of the project initialization process. */
  message?: string;
  /** The state of the project initialization process. */
  state?: "STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | "CANCELLED" | "RUNNING" | (string & {});
}

export const GoogleCloudContentwarehouseV1beta1InitializeProjectResponse: Schema.Schema<GoogleCloudContentwarehouseV1beta1InitializeProjectResponse> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1beta1InitializeProjectResponse" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1beta1InitializeProjectResponse>;

export interface GoogleCloudContentwarehouseV1RunPipelineMetadataGcsIngestPipelineMetadata {
  /** The input Cloud Storage folder in this pipeline. Format: `gs:///`. */
  inputPath?: string;
}

export const GoogleCloudContentwarehouseV1RunPipelineMetadataGcsIngestPipelineMetadata: Schema.Schema<GoogleCloudContentwarehouseV1RunPipelineMetadataGcsIngestPipelineMetadata> = Schema.suspend(() => Schema.Struct({
  inputPath: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1RunPipelineMetadataGcsIngestPipelineMetadata" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1RunPipelineMetadataGcsIngestPipelineMetadata>;

export interface CloudAiPlatformTenantresourceServiceAccountIdentity {
  /** Input/Output [Optional]. The tag that configures the service account, as defined in google3/configs/production/cdpush/acl-zanzibar-cloud-prod/activation_grants/activation_grants.gcl. Note: The default P4 service account has the empty tag. */
  tag?: string;
  /** Output only. The service account email that has been created. */
  serviceAccountEmail?: string;
}

export const CloudAiPlatformTenantresourceServiceAccountIdentity: Schema.Schema<CloudAiPlatformTenantresourceServiceAccountIdentity> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.String),
  serviceAccountEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudAiPlatformTenantresourceServiceAccountIdentity" }) as any as Schema.Schema<CloudAiPlatformTenantresourceServiceAccountIdentity>;

export interface GoogleCloudContentwarehouseV1CustomWeightsMetadata {
  /** List of schema and property name. Allows a maximum of 10 schemas to be specified for relevance boosting. */
  weightedSchemaProperties?: Array<GoogleCloudContentwarehouseV1WeightedSchemaProperty>;
}

export const GoogleCloudContentwarehouseV1CustomWeightsMetadata: Schema.Schema<GoogleCloudContentwarehouseV1CustomWeightsMetadata> = Schema.suspend(() => Schema.Struct({
  weightedSchemaProperties: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1WeightedSchemaProperty)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1CustomWeightsMetadata" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1CustomWeightsMetadata>;

export interface GoogleCloudContentwarehouseV1HistogramQueryPropertyNameFilter {
  /** It is optional. It will perform histogram for all the property names if it is not set. The properties need to be defined with the is_filterable flag set to true and the name of the property should be in the format: "schemaId.propertyName". The property needs to be defined in the schema. Example: the schema id is abc. Then the name of property for property MORTGAGE_TYPE will be "abc.MORTGAGE_TYPE". */
  propertyNames?: Array<string>;
  /** This filter specifies the exact document schema(s) Document.document_schema_name to run histogram query against. It is optional. It will perform histogram for property names for all the document schemas if it is not set. At most 10 document schema names are allowed. Format: projects/{project_number}/locations/{location}/documentSchemas/{document_schema_id}. */
  documentSchemas?: Array<string>;
  /** By default, the y_axis is HISTOGRAM_YAXIS_DOCUMENT if this field is not set. */
  yAxis?: "HISTOGRAM_YAXIS_DOCUMENT" | "HISTOGRAM_YAXIS_PROPERTY" | (string & {});
}

export const GoogleCloudContentwarehouseV1HistogramQueryPropertyNameFilter: Schema.Schema<GoogleCloudContentwarehouseV1HistogramQueryPropertyNameFilter> = Schema.suspend(() => Schema.Struct({
  propertyNames: Schema.optional(Schema.Array(Schema.String)),
  documentSchemas: Schema.optional(Schema.Array(Schema.String)),
  yAxis: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1HistogramQueryPropertyNameFilter" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1HistogramQueryPropertyNameFilter>;

export interface GoogleCloudContentwarehouseV1ListLinkedTargetsRequest {
  /** The meta information collected about the document creator, used to enforce access control for the service. */
  requestMetadata?: GoogleCloudContentwarehouseV1RequestMetadata;
}

export const GoogleCloudContentwarehouseV1ListLinkedTargetsRequest: Schema.Schema<GoogleCloudContentwarehouseV1ListLinkedTargetsRequest> = Schema.suspend(() => Schema.Struct({
  requestMetadata: Schema.optional(GoogleCloudContentwarehouseV1RequestMetadata),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1ListLinkedTargetsRequest" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1ListLinkedTargetsRequest>;

export interface GoogleCloudContentwarehouseV1GetDocumentRequest {
  /** The meta information collected about the end user, used to enforce access control for the service. */
  requestMetadata?: GoogleCloudContentwarehouseV1RequestMetadata;
}

export const GoogleCloudContentwarehouseV1GetDocumentRequest: Schema.Schema<GoogleCloudContentwarehouseV1GetDocumentRequest> = Schema.suspend(() => Schema.Struct({
  requestMetadata: Schema.optional(GoogleCloudContentwarehouseV1RequestMetadata),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1GetDocumentRequest" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1GetDocumentRequest>;

export interface GoogleCloudContentwarehouseV1DeleteDocumentLinkRequest {
  /** The meta information collected about the document creator, used to enforce access control for the service. */
  requestMetadata?: GoogleCloudContentwarehouseV1RequestMetadata;
}

export const GoogleCloudContentwarehouseV1DeleteDocumentLinkRequest: Schema.Schema<GoogleCloudContentwarehouseV1DeleteDocumentLinkRequest> = Schema.suspend(() => Schema.Struct({
  requestMetadata: Schema.optional(GoogleCloudContentwarehouseV1RequestMetadata),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1DeleteDocumentLinkRequest" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1DeleteDocumentLinkRequest>;

export interface GoogleCloudContentwarehouseV1beta1UpdateDocumentMetadata {
}

export const GoogleCloudContentwarehouseV1beta1UpdateDocumentMetadata: Schema.Schema<GoogleCloudContentwarehouseV1beta1UpdateDocumentMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudContentwarehouseV1beta1UpdateDocumentMetadata" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1beta1UpdateDocumentMetadata>;

export interface GoogleCloudContentwarehouseV1DocumentReference {
  /** Document is a folder with retention policy. */
  documentIsRetentionFolder?: boolean;
  /** Output only. The time when the document is last updated. */
  updateTime?: string;
  /** Document is a folder with legal hold. */
  documentIsLegalHoldFolder?: boolean;
  /** Stores the subset of the referenced document's content. This is useful to allow user peek the information of the referenced document. */
  snippet?: string;
  /** display_name of the referenced document; this name does not need to be consistent to the display_name in the Document proto, depending on the ACL constraint. */
  displayName?: string;
  /** Output only. The time when the document is deleted. */
  deleteTime?: string;
  /** Required. Name of the referenced document. */
  documentName?: string;
  /** The document type of the document being referenced. */
  documentIsFolder?: boolean;
  /** Output only. The time when the document is created. */
  createTime?: string;
}

export const GoogleCloudContentwarehouseV1DocumentReference: Schema.Schema<GoogleCloudContentwarehouseV1DocumentReference> = Schema.suspend(() => Schema.Struct({
  documentIsRetentionFolder: Schema.optional(Schema.Boolean),
  updateTime: Schema.optional(Schema.String),
  documentIsLegalHoldFolder: Schema.optional(Schema.Boolean),
  snippet: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
  documentName: Schema.optional(Schema.String),
  documentIsFolder: Schema.optional(Schema.Boolean),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1DocumentReference" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1DocumentReference>;

export interface GoogleCloudContentwarehouseV1RunPipelineMetadataProcessWithDocAiPipelineMetadata {
  /** The input list of all the resource names of the documents to be processed. */
  documents?: Array<string>;
  /** The DocAI processor to process the documents with. */
  processorInfo?: GoogleCloudContentwarehouseV1ProcessorInfo;
}

export const GoogleCloudContentwarehouseV1RunPipelineMetadataProcessWithDocAiPipelineMetadata: Schema.Schema<GoogleCloudContentwarehouseV1RunPipelineMetadataProcessWithDocAiPipelineMetadata> = Schema.suspend(() => Schema.Struct({
  documents: Schema.optional(Schema.Array(Schema.String)),
  processorInfo: Schema.optional(GoogleCloudContentwarehouseV1ProcessorInfo),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1RunPipelineMetadataProcessWithDocAiPipelineMetadata" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1RunPipelineMetadataProcessWithDocAiPipelineMetadata>;

export interface GoogleCloudContentwarehouseV1DocumentLink {
  /** Document references of the source document. */
  sourceDocumentReference?: GoogleCloudContentwarehouseV1DocumentReference;
  /** Output only. The time when the documentLink is created. */
  createTime?: string;
  /** Name of this document-link. It is required that the parent derived form the name to be consistent with the source document reference. Otherwise an exception will be thrown. Format: projects/{project_number}/locations/{location}/documents/{source_document_id}/documentLinks/{document_link_id}. */
  name?: string;
  /** Output only. The time when the documentLink is last updated. */
  updateTime?: string;
  /** The state of the documentlink. If target node has been deleted, the link is marked as invalid. Removing a source node will result in removal of all associated links. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "SOFT_DELETED" | (string & {});
  /** Document references of the target document. */
  targetDocumentReference?: GoogleCloudContentwarehouseV1DocumentReference;
  /** Description of this document-link. */
  description?: string;
}

export const GoogleCloudContentwarehouseV1DocumentLink: Schema.Schema<GoogleCloudContentwarehouseV1DocumentLink> = Schema.suspend(() => Schema.Struct({
  sourceDocumentReference: Schema.optional(GoogleCloudContentwarehouseV1DocumentReference),
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  targetDocumentReference: Schema.optional(GoogleCloudContentwarehouseV1DocumentReference),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1DocumentLink" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1DocumentLink>;

export interface GoogleCloudContentwarehouseV1RunPipelineMetadataExportToCdwPipelineMetadata {
  /** The output CDW dataset resource name. */
  docAiDataset?: string;
  /** The input list of all the resource names of the documents to be exported. */
  documents?: Array<string>;
  /** The output Cloud Storage folder in this pipeline. */
  outputPath?: string;
}

export const GoogleCloudContentwarehouseV1RunPipelineMetadataExportToCdwPipelineMetadata: Schema.Schema<GoogleCloudContentwarehouseV1RunPipelineMetadataExportToCdwPipelineMetadata> = Schema.suspend(() => Schema.Struct({
  docAiDataset: Schema.optional(Schema.String),
  documents: Schema.optional(Schema.Array(Schema.String)),
  outputPath: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1RunPipelineMetadataExportToCdwPipelineMetadata" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1RunPipelineMetadataExportToCdwPipelineMetadata>;

export interface GoogleCloudContentwarehouseV1RunPipelineMetadata {
  /** The pipeline metadata for Export-to-CDW pipeline. */
  exportToCdwPipelineMetadata?: GoogleCloudContentwarehouseV1RunPipelineMetadataExportToCdwPipelineMetadata;
  /** The pipeline metadata for Process-with-DocAi pipeline. */
  processWithDocAiPipelineMetadata?: GoogleCloudContentwarehouseV1RunPipelineMetadataProcessWithDocAiPipelineMetadata;
  /** The list of response details of each document. */
  individualDocumentStatuses?: Array<GoogleCloudContentwarehouseV1RunPipelineMetadataIndividualDocumentStatus>;
  /** The pipeline metadata for GcsIngest pipeline. */
  gcsIngestPipelineMetadata?: GoogleCloudContentwarehouseV1RunPipelineMetadataGcsIngestPipelineMetadata;
  /** Number of files that were processed by the pipeline. */
  totalFileCount?: number;
  /** User unique identification and groups information. */
  userInfo?: GoogleCloudContentwarehouseV1UserInfo;
  /** Number of files that have failed at some point in the pipeline. */
  failedFileCount?: number;
}

export const GoogleCloudContentwarehouseV1RunPipelineMetadata: Schema.Schema<GoogleCloudContentwarehouseV1RunPipelineMetadata> = Schema.suspend(() => Schema.Struct({
  exportToCdwPipelineMetadata: Schema.optional(GoogleCloudContentwarehouseV1RunPipelineMetadataExportToCdwPipelineMetadata),
  processWithDocAiPipelineMetadata: Schema.optional(GoogleCloudContentwarehouseV1RunPipelineMetadataProcessWithDocAiPipelineMetadata),
  individualDocumentStatuses: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1RunPipelineMetadataIndividualDocumentStatus)),
  gcsIngestPipelineMetadata: Schema.optional(GoogleCloudContentwarehouseV1RunPipelineMetadataGcsIngestPipelineMetadata),
  totalFileCount: Schema.optional(Schema.Number),
  userInfo: Schema.optional(GoogleCloudContentwarehouseV1UserInfo),
  failedFileCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1RunPipelineMetadata" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1RunPipelineMetadata>;

export interface GoogleCloudContentwarehouseV1ListLinkedSourcesResponse {
  /** Source document-links. */
  documentLinks?: Array<GoogleCloudContentwarehouseV1DocumentLink>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudContentwarehouseV1ListLinkedSourcesResponse: Schema.Schema<GoogleCloudContentwarehouseV1ListLinkedSourcesResponse> = Schema.suspend(() => Schema.Struct({
  documentLinks: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1DocumentLink)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1ListLinkedSourcesResponse" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1ListLinkedSourcesResponse>;

export interface GoogleCloudContentwarehouseV1GcsIngestPipeline {
  /** Optional. The config for the Cloud Storage Ingestion pipeline. It provides additional customization options to run the pipeline and can be skipped if it is not applicable. */
  pipelineConfig?: GoogleCloudContentwarehouseV1IngestPipelineConfig;
  /** The flag whether to skip ingested documents. If it is set to true, documents in Cloud Storage contains key "status" with value "status=ingested" in custom metadata will be skipped to ingest. */
  skipIngestedDocuments?: boolean;
  /** The Document Warehouse schema resource name. All documents processed by this pipeline will use this schema. Format: projects/{project_number}/locations/{location}/documentSchemas/{document_schema_id}. */
  schemaName?: string;
  /** The Doc AI processor type name. Only used when the format of ingested files is Doc AI Document proto format. */
  processorType?: string;
  /** The input Cloud Storage folder. All files under this folder will be imported to Document Warehouse. Format: `gs:///`. */
  inputPath?: string;
}

export const GoogleCloudContentwarehouseV1GcsIngestPipeline: Schema.Schema<GoogleCloudContentwarehouseV1GcsIngestPipeline> = Schema.suspend(() => Schema.Struct({
  pipelineConfig: Schema.optional(GoogleCloudContentwarehouseV1IngestPipelineConfig),
  skipIngestedDocuments: Schema.optional(Schema.Boolean),
  schemaName: Schema.optional(Schema.String),
  processorType: Schema.optional(Schema.String),
  inputPath: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1GcsIngestPipeline" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1GcsIngestPipeline>;

export interface GoogleCloudContentwarehouseV1CreateDocumentLinkRequest {
  /** Required. Document links associated with the source documents (source_document_id). */
  documentLink?: GoogleCloudContentwarehouseV1DocumentLink;
  /** The meta information collected about the document creator, used to enforce access control for the service. */
  requestMetadata?: GoogleCloudContentwarehouseV1RequestMetadata;
}

export const GoogleCloudContentwarehouseV1CreateDocumentLinkRequest: Schema.Schema<GoogleCloudContentwarehouseV1CreateDocumentLinkRequest> = Schema.suspend(() => Schema.Struct({
  documentLink: Schema.optional(GoogleCloudContentwarehouseV1DocumentLink),
  requestMetadata: Schema.optional(GoogleCloudContentwarehouseV1RequestMetadata),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1CreateDocumentLinkRequest" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1CreateDocumentLinkRequest>;

export interface GoogleCloudContentwarehouseV1UpdateDocumentRequest {
  /** The meta information collected about the end user, used to enforce access control for the service. */
  requestMetadata?: GoogleCloudContentwarehouseV1RequestMetadata;
  /** Request Option for processing Cloud AI Document in Document Warehouse. This field offers limited support for mapping entities from Cloud AI Document to Warehouse Document. Please consult with product team before using this field and other available options. */
  cloudAiDocumentOption?: GoogleCloudContentwarehouseV1CloudAIDocumentOption;
  /** Options for the update operation. */
  updateOptions?: GoogleCloudContentwarehouseV1UpdateOptions;
  /** Required. The document to update. */
  document?: GoogleCloudContentwarehouseV1Document;
}

export const GoogleCloudContentwarehouseV1UpdateDocumentRequest: Schema.Schema<GoogleCloudContentwarehouseV1UpdateDocumentRequest> = Schema.suspend(() => Schema.Struct({
  requestMetadata: Schema.optional(GoogleCloudContentwarehouseV1RequestMetadata),
  cloudAiDocumentOption: Schema.optional(GoogleCloudContentwarehouseV1CloudAIDocumentOption),
  updateOptions: Schema.optional(GoogleCloudContentwarehouseV1UpdateOptions),
  document: Schema.optional(GoogleCloudContentwarehouseV1Document),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1UpdateDocumentRequest" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1UpdateDocumentRequest>;

export interface GoogleCloudContentwarehouseV1PropertyFilter {
  /** The filter condition. The syntax for this expression is a subset of SQL syntax. Supported operators are: `=`, `!=`, `<`, `<=`, `>`, `>=`, and `~~` where the left of the operator is a property name and the right of the operator is a number or a quoted string. You must escape backslash (\\) and quote (\") characters. `~~` is the LIKE operator. The right of the operator must be a string. The only supported property data type for LIKE is text_values. It provides semantic search functionality by parsing, stemming and doing synonyms expansion against the input query. It matches if the property contains semantic similar content to the query. It is not regex matching or wildcard matching. For example, "property.company ~~ \"google\"" will match records whose property `property.compnay` have values like "Google Inc.", "Google LLC" or "Google Company". Supported functions are `LOWER([property_name])` to perform a case insensitive match and `EMPTY([property_name])` to filter on the existence of a key. Boolean expressions (AND/OR/NOT) are supported up to 3 levels of nesting (for example, "((A AND B AND C) OR NOT D) AND E"), a maximum of 100 comparisons or functions are allowed in the expression. The expression must be < 6000 bytes in length. Only properties that are marked filterable are allowed (PropertyDefinition.is_filterable). Property names do not need to be prefixed by the document schema id (as is the case with histograms), however property names will need to be prefixed by its parent hierarchy, if any. For example: top_property_name.sub_property_name. Sample Query: `(LOWER(driving_license)="class \"a\"" OR EMPTY(driving_license)) AND driving_years > 10` CMEK compliant deployment only supports: * Operators: `=`, `<`, `<=`, `>`, and `>=`. * Boolean expressions: AND and OR. */
  condition?: string;
  /** The Document schema name Document.document_schema_name. Format: projects/{project_number}/locations/{location}/documentSchemas/{document_schema_id}. */
  documentSchemaName?: string;
}

export const GoogleCloudContentwarehouseV1PropertyFilter: Schema.Schema<GoogleCloudContentwarehouseV1PropertyFilter> = Schema.suspend(() => Schema.Struct({
  condition: Schema.optional(Schema.String),
  documentSchemaName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1PropertyFilter" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1PropertyFilter>;

export interface GoogleCloudContentwarehouseV1DocumentQuery {
  /** This filter specifies a structured syntax to match against the [PropertyDefinition].is_filterable marked as `true`. The syntax for this expression is a subset of SQL syntax. Supported operators are: `=`, `!=`, `<`, `<=`, `>`, and `>=` where the left of the operator is a property name and the right of the operator is a number or a quoted string. You must escape backslash (\\) and quote (\") characters. Supported functions are `LOWER([property_name])` to perform a case insensitive match and `EMPTY([property_name])` to filter on the existence of a key. Boolean expressions (AND/OR/NOT) are supported up to 3 levels of nesting (for example, "((A AND B AND C) OR NOT D) AND E"), a maximum of 100 comparisons or functions are allowed in the expression. The expression must be < 6000 bytes in length. Sample Query: `(LOWER(driving_license)="class \"a\"" OR EMPTY(driving_license)) AND driving_years > 10` */
  customPropertyFilter?: string;
  /** Search the documents in the list. Format: projects/{project_number}/locations/{location}/documents/{document_id}. */
  documentNameFilter?: Array<string>;
  /** Documents created/updated within a range specified by this filter are searched against. */
  timeFilters?: Array<GoogleCloudContentwarehouseV1TimeFilter>;
  /** The exact creator(s) of the documents to search against. If a value isn't specified, documents within the search results are associated with any creator. If multiple values are specified, documents within the search results may be associated with any of the specified creators. */
  documentCreatorFilter?: Array<string>;
  /** Search all the documents under this specified folder. Format: projects/{project_number}/locations/{location}/documents/{document_id}. */
  folderNameFilter?: string;
  /** The query string that matches against the full text of the document and the searchable properties. The query partially supports [Google AIP style syntax](https://google.aip.dev/160). Specifically, the query supports literals, logical operators, negation operators, comparison operators, and functions. Literals: A bare literal value (examples: "42", "Hugo") is a value to be matched against. It searches over the full text of the document and the searchable properties. Logical operators: "AND", "and", "OR", and "or" are binary logical operators (example: "engineer OR developer"). Negation operators: "NOT" and "!" are negation operators (example: "NOT software"). Comparison operators: support the binary comparison operators =, !=, <, >, <= and >= for string, numeric, enum, boolean. Also support like operator `~~` for string. It provides semantic search functionality by parsing, stemming and doing synonyms expansion against the input query. To specify a property in the query, the left hand side expression in the comparison must be the property ID including the parent. The right hand side must be literals. For example: "\"projects/123/locations/us\".property_a < 1" matches results whose "property_a" is less than 1 in project 123 and us location. The literals and comparison expression can be connected in a single query (example: "software engineer \"projects/123/locations/us\".salary > 100"). Functions: supported functions are `LOWER([property_name])` to perform a case insensitive match and `EMPTY([property_name])` to filter on the existence of a key. Support nested expressions connected using parenthesis and logical operators. The default logical operators is `AND` if there is no operators between expressions. The query can be used with other filters e.g. `time_filters` and `folder_name_filter`. They are connected with `AND` operator under the hood. The maximum number of allowed characters is 255. */
  query?: string;
  /** To support the custom weighting across document schemas, customers need to provide the properties to be used to boost the ranking in the search request. For a search query with CustomWeightsMetadata specified, only the RetrievalImportance for the properties in the CustomWeightsMetadata will be honored. */
  customWeightsMetadata?: GoogleCloudContentwarehouseV1CustomWeightsMetadata;
  /** For custom synonyms. Customers provide the synonyms based on context. One customer can provide multiple set of synonyms based on different context. The search query will be expanded based on the custom synonyms of the query context set. By default, no custom synonyms wll be applied if no query context is provided. It is not supported for CMEK compliant deployment. */
  queryContext?: Array<string>;
  /** This filter specifies the types of files to return: ALL, FOLDER, or FILE. If FOLDER or FILE is specified, then only either folders or files will be returned, respectively. If ALL is specified, both folders and files will be returned. If no value is specified, ALL files will be returned. */
  fileTypeFilter?: GoogleCloudContentwarehouseV1FileTypeFilter;
  /** Experimental, do not use. If the query is a natural language question. False by default. If true, then the question-answering feature will be used instead of search, and `result_count` in SearchDocumentsRequest must be set. In addition, all other input fields related to search (pagination, histograms, etc.) will be ignored. */
  isNlQuery?: boolean;
  /** This filter specifies the exact document schema Document.document_schema_name of the documents to search against. If a value isn't specified, documents within the search results are associated with any schema. If multiple values are specified, documents within the search results may be associated with any of the specified schemas. At most 20 document schema names are allowed. */
  documentSchemaNames?: Array<string>;
  /** This filter specifies a structured syntax to match against the PropertyDefinition.is_filterable marked as `true`. The relationship between the PropertyFilters is OR. */
  propertyFilter?: Array<GoogleCloudContentwarehouseV1PropertyFilter>;
}

export const GoogleCloudContentwarehouseV1DocumentQuery: Schema.Schema<GoogleCloudContentwarehouseV1DocumentQuery> = Schema.suspend(() => Schema.Struct({
  customPropertyFilter: Schema.optional(Schema.String),
  documentNameFilter: Schema.optional(Schema.Array(Schema.String)),
  timeFilters: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1TimeFilter)),
  documentCreatorFilter: Schema.optional(Schema.Array(Schema.String)),
  folderNameFilter: Schema.optional(Schema.String),
  query: Schema.optional(Schema.String),
  customWeightsMetadata: Schema.optional(GoogleCloudContentwarehouseV1CustomWeightsMetadata),
  queryContext: Schema.optional(Schema.Array(Schema.String)),
  fileTypeFilter: Schema.optional(GoogleCloudContentwarehouseV1FileTypeFilter),
  isNlQuery: Schema.optional(Schema.Boolean),
  documentSchemaNames: Schema.optional(Schema.Array(Schema.String)),
  propertyFilter: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1PropertyFilter)),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1DocumentQuery" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1DocumentQuery>;

export interface GoogleCloudContentwarehouseV1ProcessWithDocAiPipeline {
  /** The list of all the resource names of the documents to be processed. Format: projects/{project_number}/locations/{location}/documents/{document_id}. */
  documents?: Array<string>;
  /** The Cloud Storage folder path used to store the raw results from processors. Format: `gs:///`. */
  processorResultsFolderPath?: string;
  /** The CDW processor information. */
  processorInfo?: GoogleCloudContentwarehouseV1ProcessorInfo;
  /** The Cloud Storage folder path used to store the exported documents before being sent to CDW. Format: `gs:///`. */
  exportFolderPath?: string;
}

export const GoogleCloudContentwarehouseV1ProcessWithDocAiPipeline: Schema.Schema<GoogleCloudContentwarehouseV1ProcessWithDocAiPipeline> = Schema.suspend(() => Schema.Struct({
  documents: Schema.optional(Schema.Array(Schema.String)),
  processorResultsFolderPath: Schema.optional(Schema.String),
  processorInfo: Schema.optional(GoogleCloudContentwarehouseV1ProcessorInfo),
  exportFolderPath: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1ProcessWithDocAiPipeline" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1ProcessWithDocAiPipeline>;

export interface GoogleCloudContentwarehouseV1RunPipelineRequest {
  /** Use a DocAI processor to process documents in Document Warehouse, and re-ingest the updated results into Document Warehouse. */
  processWithDocAiPipeline?: GoogleCloudContentwarehouseV1ProcessWithDocAiPipeline;
  /** Use DocAI processors to process documents in Cloud Storage and ingest them to Document Warehouse. */
  gcsIngestWithDocAiProcessorsPipeline?: GoogleCloudContentwarehouseV1GcsIngestWithDocAiProcessorsPipeline;
  /** The meta information collected about the end user, used to enforce access control for the service. */
  requestMetadata?: GoogleCloudContentwarehouseV1RequestMetadata;
  /** Cloud Storage ingestion pipeline. */
  gcsIngestPipeline?: GoogleCloudContentwarehouseV1GcsIngestPipeline;
  /** Export docuemnts from Document Warehouse to CDW for training purpose. */
  exportCdwPipeline?: GoogleCloudContentwarehouseV1ExportToCdwPipeline;
}

export const GoogleCloudContentwarehouseV1RunPipelineRequest: Schema.Schema<GoogleCloudContentwarehouseV1RunPipelineRequest> = Schema.suspend(() => Schema.Struct({
  processWithDocAiPipeline: Schema.optional(GoogleCloudContentwarehouseV1ProcessWithDocAiPipeline),
  gcsIngestWithDocAiProcessorsPipeline: Schema.optional(GoogleCloudContentwarehouseV1GcsIngestWithDocAiProcessorsPipeline),
  requestMetadata: Schema.optional(GoogleCloudContentwarehouseV1RequestMetadata),
  gcsIngestPipeline: Schema.optional(GoogleCloudContentwarehouseV1GcsIngestPipeline),
  exportCdwPipeline: Schema.optional(GoogleCloudContentwarehouseV1ExportToCdwPipeline),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1RunPipelineRequest" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1RunPipelineRequest>;

export interface GoogleCloudContentwarehouseV1ListLinkedSourcesRequest {
  /** The meta information collected about the document creator, used to enforce access control for the service. */
  requestMetadata?: GoogleCloudContentwarehouseV1RequestMetadata;
  /** The maximum number of document-links to return. The service may return fewer than this value. If unspecified, at most 50 document-links will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListLinkedSources` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListLinkedSources` must match the call that provided the page token. */
  pageToken?: string;
}

export const GoogleCloudContentwarehouseV1ListLinkedSourcesRequest: Schema.Schema<GoogleCloudContentwarehouseV1ListLinkedSourcesRequest> = Schema.suspend(() => Schema.Struct({
  requestMetadata: Schema.optional(GoogleCloudContentwarehouseV1RequestMetadata),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1ListLinkedSourcesRequest" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1ListLinkedSourcesRequest>;

export interface GoogleCloudContentwarehouseV1ListLinkedTargetsResponse {
  /** Target document-links. */
  documentLinks?: Array<GoogleCloudContentwarehouseV1DocumentLink>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudContentwarehouseV1ListLinkedTargetsResponse: Schema.Schema<GoogleCloudContentwarehouseV1ListLinkedTargetsResponse> = Schema.suspend(() => Schema.Struct({
  documentLinks: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1DocumentLink)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1ListLinkedTargetsResponse" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1ListLinkedTargetsResponse>;

export interface GoogleCloudContentwarehouseV1UpdateDocumentResponse {
  /** Additional information for the API invocation, such as the request tracking id. */
  metadata?: GoogleCloudContentwarehouseV1ResponseMetadata;
  /** Updated document after executing update request. */
  document?: GoogleCloudContentwarehouseV1Document;
  /** Output from Rule Engine recording the rule evaluator and action executor's output. Refer format in: google/cloud/contentwarehouse/v1/rule_engine.proto */
  ruleEngineOutput?: GoogleCloudContentwarehouseV1RuleEngineOutput;
}

export const GoogleCloudContentwarehouseV1UpdateDocumentResponse: Schema.Schema<GoogleCloudContentwarehouseV1UpdateDocumentResponse> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(GoogleCloudContentwarehouseV1ResponseMetadata),
  document: Schema.optional(GoogleCloudContentwarehouseV1Document),
  ruleEngineOutput: Schema.optional(GoogleCloudContentwarehouseV1RuleEngineOutput),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1UpdateDocumentResponse" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1UpdateDocumentResponse>;

export interface GoogleCloudContentwarehouseV1FetchAclResponse {
  /** Additional information for the API invocation, such as the request tracking id. */
  metadata?: GoogleCloudContentwarehouseV1ResponseMetadata;
  /** The IAM policy. */
  policy?: GoogleIamV1Policy;
}

export const GoogleCloudContentwarehouseV1FetchAclResponse: Schema.Schema<GoogleCloudContentwarehouseV1FetchAclResponse> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(GoogleCloudContentwarehouseV1ResponseMetadata),
  policy: Schema.optional(GoogleIamV1Policy),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1FetchAclResponse" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1FetchAclResponse>;

export interface GoogleCloudContentwarehouseV1InitializeProjectResponse {
  /** The state of the project initialization process. */
  state?: "STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | "CANCELLED" | "RUNNING" | (string & {});
  /** The message of the project initialization process. */
  message?: string;
}

export const GoogleCloudContentwarehouseV1InitializeProjectResponse: Schema.Schema<GoogleCloudContentwarehouseV1InitializeProjectResponse> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1InitializeProjectResponse" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1InitializeProjectResponse>;

export interface GoogleCloudContentwarehouseV1UpdateRuleSetRequest {
  /** Required. The rule set to update. */
  ruleSet?: GoogleCloudContentwarehouseV1RuleSet;
}

export const GoogleCloudContentwarehouseV1UpdateRuleSetRequest: Schema.Schema<GoogleCloudContentwarehouseV1UpdateRuleSetRequest> = Schema.suspend(() => Schema.Struct({
  ruleSet: Schema.optional(GoogleCloudContentwarehouseV1RuleSet),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1UpdateRuleSetRequest" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1UpdateRuleSetRequest>;

export interface GoogleCloudContentwarehouseV1DocumentSchema {
  /** Schema description. */
  description?: string;
  /** Output only. The time when the document schema is created. */
  createTime?: string;
  /** Required. Name of the schema given by the user. Must be unique per project. */
  displayName?: string;
  /** Document Type, true refers the document is a folder, otherwise it is a typical document. */
  documentIsFolder?: boolean;
  /** Document details. */
  propertyDefinitions?: Array<GoogleCloudContentwarehouseV1PropertyDefinition>;
  /** Output only. The time when the document schema is last updated. */
  updateTime?: string;
  /** The resource name of the document schema. Format: projects/{project_number}/locations/{location}/documentSchemas/{document_schema_id}. The name is ignored when creating a document schema. */
  name?: string;
}

export const GoogleCloudContentwarehouseV1DocumentSchema: Schema.Schema<GoogleCloudContentwarehouseV1DocumentSchema> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  documentIsFolder: Schema.optional(Schema.Boolean),
  propertyDefinitions: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1PropertyDefinition)),
  updateTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1DocumentSchema" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1DocumentSchema>;

export interface GoogleCloudContentwarehouseV1UpdateDocumentSchemaRequest {
  /** Required. The document schema to update with. */
  documentSchema?: GoogleCloudContentwarehouseV1DocumentSchema;
}

export const GoogleCloudContentwarehouseV1UpdateDocumentSchemaRequest: Schema.Schema<GoogleCloudContentwarehouseV1UpdateDocumentSchemaRequest> = Schema.suspend(() => Schema.Struct({
  documentSchema: Schema.optional(GoogleCloudContentwarehouseV1DocumentSchema),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1UpdateDocumentSchemaRequest" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1UpdateDocumentSchemaRequest>;

export interface GoogleCloudContentwarehouseV1beta1CreateDocumentMetadata {
}

export const GoogleCloudContentwarehouseV1beta1CreateDocumentMetadata: Schema.Schema<GoogleCloudContentwarehouseV1beta1CreateDocumentMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudContentwarehouseV1beta1CreateDocumentMetadata" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1beta1CreateDocumentMetadata>;

export interface GoogleCloudContentwarehouseV1SetAclResponse {
  /** The policy will be attached to a resource (e.g. projecct, document). */
  policy?: GoogleIamV1Policy;
  /** Additional information for the API invocation, such as the request tracking id. */
  metadata?: GoogleCloudContentwarehouseV1ResponseMetadata;
}

export const GoogleCloudContentwarehouseV1SetAclResponse: Schema.Schema<GoogleCloudContentwarehouseV1SetAclResponse> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(GoogleIamV1Policy),
  metadata: Schema.optional(GoogleCloudContentwarehouseV1ResponseMetadata),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1SetAclResponse" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1SetAclResponse>;

export interface GoogleCloudContentwarehouseV1HistogramQuery {
  /** Controls if the histogram query requires the return of a precise count. Enable this flag may adversely impact performance. Defaults to true. */
  requirePreciseResultSize?: boolean;
  /** An expression specifies a histogram request against matching documents for searches. See SearchDocumentsRequest.histogram_queries for details about syntax. */
  histogramQuery?: string;
  /** Optional. Filter the result of histogram query by the property names. It only works with histogram query count('FilterableProperties'). It is an optional. It will perform histogram on all the property names for all the document schemas. Setting this field will have a better performance. */
  filters?: GoogleCloudContentwarehouseV1HistogramQueryPropertyNameFilter;
}

export const GoogleCloudContentwarehouseV1HistogramQuery: Schema.Schema<GoogleCloudContentwarehouseV1HistogramQuery> = Schema.suspend(() => Schema.Struct({
  requirePreciseResultSize: Schema.optional(Schema.Boolean),
  histogramQuery: Schema.optional(Schema.String),
  filters: Schema.optional(GoogleCloudContentwarehouseV1HistogramQueryPropertyNameFilter),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1HistogramQuery" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1HistogramQuery>;

export interface CloudAiPlatformTenantresourceTenantResource {
  /** A list of P4 service accounts (go/p4sa) to provision or deprovision. */
  p4ServiceAccounts?: Array<CloudAiPlatformTenantresourceServiceAccountIdentity>;
  /** A list of tenant projects and tenant resources to provision or deprovision. */
  tenantProjectResources?: Array<CloudAiPlatformTenantresourceTenantProjectResource>;
}

export const CloudAiPlatformTenantresourceTenantResource: Schema.Schema<CloudAiPlatformTenantresourceTenantResource> = Schema.suspend(() => Schema.Struct({
  p4ServiceAccounts: Schema.optional(Schema.Array(CloudAiPlatformTenantresourceServiceAccountIdentity)),
  tenantProjectResources: Schema.optional(Schema.Array(CloudAiPlatformTenantresourceTenantProjectResource)),
})).annotate({ identifier: "CloudAiPlatformTenantresourceTenantResource" }) as any as Schema.Schema<CloudAiPlatformTenantresourceTenantResource>;

export interface GoogleCloudContentwarehouseV1ListDocumentSchemasResponse {
  /** The document schemas from the specified parent. */
  documentSchemas?: Array<GoogleCloudContentwarehouseV1DocumentSchema>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudContentwarehouseV1ListDocumentSchemasResponse: Schema.Schema<GoogleCloudContentwarehouseV1ListDocumentSchemasResponse> = Schema.suspend(() => Schema.Struct({
  documentSchemas: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1DocumentSchema)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1ListDocumentSchemasResponse" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1ListDocumentSchemasResponse>;

export interface GoogleCloudContentwarehouseV1SearchDocumentsRequest {
  /** The token specifying the current offset within search results. See SearchDocumentsResponse.next_page_token for an explanation of how to obtain the next set of query results. */
  pageToken?: string;
  /** Experimental, do not use. The limit on the number of documents returned for the question-answering feature. To enable the question-answering feature, set [DocumentQuery].is_nl_query to true. */
  qaSizeLimit?: number;
  /** The meta information collected about the end user, used to enforce access control and improve the search quality of the service. */
  requestMetadata?: GoogleCloudContentwarehouseV1RequestMetadata;
  /** Controls if the search document request requires the return of a total size of matched documents. See SearchDocumentsResponse.total_size. Enabling this flag may adversely impact performance. Hint: If this is used with pagination, set this flag on the initial query but set this to false on subsequent page calls (keep the total count locally). Defaults to false. */
  requireTotalSize?: boolean;
  /** Controls if the search document request requires the return of a total size of matched documents. See SearchDocumentsResponse.total_size. */
  totalResultSize?: "TOTAL_RESULT_SIZE_UNSPECIFIED" | "ESTIMATED_SIZE" | "ACTUAL_SIZE" | (string & {});
  /** An integer that specifies the current offset (that is, starting result location, amongst the documents deemed by the API as relevant) in search results. This field is only considered if page_token is unset. The maximum allowed value is 5000. Otherwise an error is thrown. For example, 0 means to return results starting from the first matching document, and 10 means to return from the 11th document. This can be used for pagination, (for example, pageSize = 10 and offset = 10 means to return from the second page). */
  offset?: number;
  /** Query used to search against documents (keyword, filters, etc.). */
  documentQuery?: GoogleCloudContentwarehouseV1DocumentQuery;
  /** A limit on the number of documents returned in the search results. Increasing this value above the default value of 10 can increase search response time. The value can be between 1 and 100. */
  pageSize?: number;
  /** An expression specifying a histogram request against matching documents. Expression syntax is an aggregation function call with histogram facets and other options. The following aggregation functions are supported: * `count(string_histogram_facet)`: Count the number of matching entities for each distinct attribute value. Data types: * Histogram facet (aka filterable properties): Facet names with format <schema id>.<facet>. Facets will have the format of: `a-zA-Z`. If the facet is a child facet, then the parent hierarchy needs to be specified separated by dots in the prefix after the schema id. Thus, the format for a multi- level facet is: <schema id>.<parent facet name>. <child facet name>. Example: schema123.root_parent_facet.middle_facet.child_facet * DocumentSchemaId: (with no schema id prefix) to get histograms for each document type (returns the schema id path, e.g. projects/12345/locations/us-west/documentSchemas/abc123). Example expression: * Document type counts: count('DocumentSchemaId') * For schema id, abc123, get the counts for MORTGAGE_TYPE: count('abc123.MORTGAGE_TYPE') */
  histogramQueries?: Array<GoogleCloudContentwarehouseV1HistogramQuery>;
  /** The criteria determining how search results are sorted. For non-empty query, default is `"relevance desc"`. For empty query, default is `"upload_date desc"`. Supported options are: * `"relevance desc"`: By relevance descending, as determined by the API algorithms. * `"upload_date desc"`: By upload date descending. * `"upload_date"`: By upload date ascending. * `"update_date desc"`: By last updated date descending. * `"update_date"`: By last updated date ascending. * `"retrieval_importance desc"`: By retrieval importance of properties descending. This feature is still under development, please do not use unless otherwise instructed to do so. */
  orderBy?: string;
}

export const GoogleCloudContentwarehouseV1SearchDocumentsRequest: Schema.Schema<GoogleCloudContentwarehouseV1SearchDocumentsRequest> = Schema.suspend(() => Schema.Struct({
  pageToken: Schema.optional(Schema.String),
  qaSizeLimit: Schema.optional(Schema.Number),
  requestMetadata: Schema.optional(GoogleCloudContentwarehouseV1RequestMetadata),
  requireTotalSize: Schema.optional(Schema.Boolean),
  totalResultSize: Schema.optional(Schema.String),
  offset: Schema.optional(Schema.Number),
  documentQuery: Schema.optional(GoogleCloudContentwarehouseV1DocumentQuery),
  pageSize: Schema.optional(Schema.Number),
  histogramQueries: Schema.optional(Schema.Array(GoogleCloudContentwarehouseV1HistogramQuery)),
  orderBy: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1SearchDocumentsRequest" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1SearchDocumentsRequest>;

export interface GoogleCloudContentwarehouseV1DeleteDocumentRequest {
  /** The meta information collected about the end user, used to enforce access control for the service. */
  requestMetadata?: GoogleCloudContentwarehouseV1RequestMetadata;
}

export const GoogleCloudContentwarehouseV1DeleteDocumentRequest: Schema.Schema<GoogleCloudContentwarehouseV1DeleteDocumentRequest> = Schema.suspend(() => Schema.Struct({
  requestMetadata: Schema.optional(GoogleCloudContentwarehouseV1RequestMetadata),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1DeleteDocumentRequest" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1DeleteDocumentRequest>;

export interface GoogleCloudContentwarehouseV1LockDocumentRequest {
  /** The collection the document connects to. */
  collectionId?: string;
  /** The user information who locks the document. */
  lockingUser?: GoogleCloudContentwarehouseV1UserInfo;
}

export const GoogleCloudContentwarehouseV1LockDocumentRequest: Schema.Schema<GoogleCloudContentwarehouseV1LockDocumentRequest> = Schema.suspend(() => Schema.Struct({
  collectionId: Schema.optional(Schema.String),
  lockingUser: Schema.optional(GoogleCloudContentwarehouseV1UserInfo),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1LockDocumentRequest" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1LockDocumentRequest>;

export interface GoogleCloudContentwarehouseV1InitializeProjectRequest {
  /** Required. The access control mode for accessing the customer data */
  accessControlMode?: "ACL_MODE_UNKNOWN" | "ACL_MODE_UNIVERSAL_ACCESS" | "ACL_MODE_DOCUMENT_LEVEL_ACCESS_CONTROL_BYOID" | "ACL_MODE_DOCUMENT_LEVEL_ACCESS_CONTROL_GCI" | (string & {});
  /** Optional. The default role for the person who create a document. */
  documentCreatorDefaultRole?: "DOCUMENT_CREATOR_DEFAULT_ROLE_UNSPECIFIED" | "DOCUMENT_ADMIN" | "DOCUMENT_EDITOR" | "DOCUMENT_VIEWER" | (string & {});
  /** Optional. The KMS key used for CMEK encryption. It is required that the kms key is in the same region as the endpoint. The same key will be used for all provisioned resources, if encryption is available. If the kms_key is left empty, no encryption will be enforced. */
  kmsKey?: string;
  /** Optional. Whether to enable CAL user email logging. */
  enableCalUserEmailLogging?: boolean;
  /** Required. The type of database used to store customer data */
  databaseType?: "DB_UNKNOWN" | "DB_INFRA_SPANNER" | "DB_CLOUD_SQL_POSTGRES" | (string & {});
}

export const GoogleCloudContentwarehouseV1InitializeProjectRequest: Schema.Schema<GoogleCloudContentwarehouseV1InitializeProjectRequest> = Schema.suspend(() => Schema.Struct({
  accessControlMode: Schema.optional(Schema.String),
  documentCreatorDefaultRole: Schema.optional(Schema.String),
  kmsKey: Schema.optional(Schema.String),
  enableCalUserEmailLogging: Schema.optional(Schema.Boolean),
  databaseType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1InitializeProjectRequest" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1InitializeProjectRequest>;

export interface GoogleCloudContentwarehouseV1ProjectStatus {
  /** State of the project. */
  state?: "PROJECT_STATE_UNSPECIFIED" | "PROJECT_STATE_PENDING" | "PROJECT_STATE_COMPLETED" | "PROJECT_STATE_FAILED" | "PROJECT_STATE_DELETING" | "PROJECT_STATE_DELETING_FAILED" | "PROJECT_STATE_DELETED" | "PROJECT_STATE_NOT_FOUND" | (string & {});
  /** Access control mode. */
  accessControlMode?: "ACL_MODE_UNKNOWN" | "ACL_MODE_UNIVERSAL_ACCESS" | "ACL_MODE_DOCUMENT_LEVEL_ACCESS_CONTROL_BYOID" | "ACL_MODE_DOCUMENT_LEVEL_ACCESS_CONTROL_GCI" | (string & {});
  /** The default role for the person who create a document. */
  documentCreatorDefaultRole?: string;
  /** If the qa is enabled on this project. */
  qaEnabled?: boolean;
  /** The location of the queried project. */
  location?: string;
  /** Database type. */
  databaseType?: "DB_UNKNOWN" | "DB_INFRA_SPANNER" | "DB_CLOUD_SQL_POSTGRES" | (string & {});
}

export const GoogleCloudContentwarehouseV1ProjectStatus: Schema.Schema<GoogleCloudContentwarehouseV1ProjectStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  accessControlMode: Schema.optional(Schema.String),
  documentCreatorDefaultRole: Schema.optional(Schema.String),
  qaEnabled: Schema.optional(Schema.Boolean),
  location: Schema.optional(Schema.String),
  databaseType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudContentwarehouseV1ProjectStatus" }) as any as Schema.Schema<GoogleCloudContentwarehouseV1ProjectStatus>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets the access control policy for a resource. Returns NOT_FOUND error if the resource does not exist. Returns an empty policy if the resource exists but does not have a policy set. */
export interface FetchAclProjectsRequest {
  /** Required. REQUIRED: The resource for which the policy is being requested. Format for document: projects/{project_number}/locations/{location}/documents/{document_id}. Format for collection: projects/{project_number}/locations/{location}/collections/{collection_id}. Format for project: projects/{project_number}. */
  resource: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1FetchAclRequest;
}

export const FetchAclProjectsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleCloudContentwarehouseV1FetchAclRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}:fetchAcl", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FetchAclProjectsRequest>;

export type FetchAclProjectsResponse = GoogleCloudContentwarehouseV1FetchAclResponse;
export const FetchAclProjectsResponse = GoogleCloudContentwarehouseV1FetchAclResponse;

export type FetchAclProjectsError = CommonErrors;

export const fetchAclProjects: API.OperationMethod<FetchAclProjectsRequest, FetchAclProjectsResponse, FetchAclProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchAclProjectsRequest,
  output: FetchAclProjectsResponse,
  errors: [],
}));

/** Sets the access control policy for a resource. Replaces any existing policy. */
export interface SetAclProjectsRequest {
  /** Required. REQUIRED: The resource for which the policy is being requested. Format for document: projects/{project_number}/locations/{location}/documents/{document_id}. Format for collection: projects/{project_number}/locations/{location}/collections/{collection_id}. Format for project: projects/{project_number}. */
  resource: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1SetAclRequest;
}

export const SetAclProjectsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleCloudContentwarehouseV1SetAclRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}:setAcl", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetAclProjectsRequest>;

export type SetAclProjectsResponse = GoogleCloudContentwarehouseV1SetAclResponse;
export const SetAclProjectsResponse = GoogleCloudContentwarehouseV1SetAclResponse;

export type SetAclProjectsError = CommonErrors;

export const setAclProjects: API.OperationMethod<SetAclProjectsRequest, SetAclProjectsResponse, SetAclProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetAclProjectsRequest,
  output: SetAclProjectsResponse,
  errors: [],
}));

/** Provisions resources for given tenant project. Returns a long running operation. */
export interface InitializeProjectsLocationsRequest {
  /** Required. The location to be initialized Format: projects/{project_number}/locations/{location}. */
  location: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1InitializeProjectRequest;
}

export const InitializeProjectsLocationsRequest = Schema.Struct({
  location: Schema.String.pipe(T.HttpPath("location")),
  body: Schema.optional(GoogleCloudContentwarehouseV1InitializeProjectRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}:initialize", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InitializeProjectsLocationsRequest>;

export type InitializeProjectsLocationsResponse = GoogleLongrunningOperation;
export const InitializeProjectsLocationsResponse = GoogleLongrunningOperation;

export type InitializeProjectsLocationsError = CommonErrors;

export const initializeProjectsLocations: API.OperationMethod<InitializeProjectsLocationsRequest, InitializeProjectsLocationsResponse, InitializeProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InitializeProjectsLocationsRequest,
  output: InitializeProjectsLocationsResponse,
  errors: [],
}));

/** Get the project status. */
export interface GetStatusProjectsLocationsRequest {
  /** Required. The location to be queried Format: projects/{project_number}/locations/{location}. */
  location: string;
}

export const GetStatusProjectsLocationsRequest = Schema.Struct({
  location: Schema.String.pipe(T.HttpPath("location")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}:getStatus" }),
  svc,
) as unknown as Schema.Schema<GetStatusProjectsLocationsRequest>;

export type GetStatusProjectsLocationsResponse = GoogleCloudContentwarehouseV1ProjectStatus;
export const GetStatusProjectsLocationsResponse = GoogleCloudContentwarehouseV1ProjectStatus;

export type GetStatusProjectsLocationsError = CommonErrors;

export const getStatusProjectsLocations: API.OperationMethod<GetStatusProjectsLocationsRequest, GetStatusProjectsLocationsResponse, GetStatusProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetStatusProjectsLocationsRequest,
  output: GetStatusProjectsLocationsResponse,
  errors: [],
}));

/** Run a predefined pipeline. */
export interface RunPipelineProjectsLocationsRequest {
  /** Required. The resource name which owns the resources of the pipeline. Format: projects/{project_number}/locations/{location}. */
  name: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1RunPipelineRequest;
}

export const RunPipelineProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudContentwarehouseV1RunPipelineRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}:runPipeline", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunPipelineProjectsLocationsRequest>;

export type RunPipelineProjectsLocationsResponse = GoogleLongrunningOperation;
export const RunPipelineProjectsLocationsResponse = GoogleLongrunningOperation;

export type RunPipelineProjectsLocationsError = CommonErrors;

export const runPipelineProjectsLocations: API.OperationMethod<RunPipelineProjectsLocationsRequest, RunPipelineProjectsLocationsResponse, RunPipelineProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunPipelineProjectsLocationsRequest,
  output: RunPipelineProjectsLocationsResponse,
  errors: [],
}));

/** Remove the existing SynonymSet for the context and replaces it with a new one. Throws a NOT_FOUND exception if the SynonymSet is not found. */
export interface PatchProjectsLocationsSynonymSetsRequest {
  /** Required. The name of the synonymSet to update Format: projects/{project_number}/locations/{location}/synonymSets/{context}. */
  name: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1SynonymSet;
}

export const PatchProjectsLocationsSynonymSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudContentwarehouseV1SynonymSet).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/synonymSets/{synonymSetsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsSynonymSetsRequest>;

export type PatchProjectsLocationsSynonymSetsResponse = GoogleCloudContentwarehouseV1SynonymSet;
export const PatchProjectsLocationsSynonymSetsResponse = GoogleCloudContentwarehouseV1SynonymSet;

export type PatchProjectsLocationsSynonymSetsError = CommonErrors;

export const patchProjectsLocationsSynonymSets: API.OperationMethod<PatchProjectsLocationsSynonymSetsRequest, PatchProjectsLocationsSynonymSetsResponse, PatchProjectsLocationsSynonymSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsSynonymSetsRequest,
  output: PatchProjectsLocationsSynonymSetsResponse,
  errors: [],
}));

/** Returns all SynonymSets (for all contexts) for the specified location. */
export interface ListProjectsLocationsSynonymSetsRequest {
  /** Required. The parent name. Format: projects/{project_number}/locations/{location}. */
  parent: string;
  /** A page token, received from a previous `ListSynonymSets` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSynonymSets` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of synonymSets to return. The service may return fewer than this value. If unspecified, at most 50 rule sets will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListProjectsLocationsSynonymSetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/synonymSets" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSynonymSetsRequest>;

export type ListProjectsLocationsSynonymSetsResponse = GoogleCloudContentwarehouseV1ListSynonymSetsResponse;
export const ListProjectsLocationsSynonymSetsResponse = GoogleCloudContentwarehouseV1ListSynonymSetsResponse;

export type ListProjectsLocationsSynonymSetsError = CommonErrors;

export const listProjectsLocationsSynonymSets = API.makePaginated(() => ({
  input: ListProjectsLocationsSynonymSetsRequest,
  output: ListProjectsLocationsSynonymSetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a SynonymSet for a given context. Throws a NOT_FOUND exception if the SynonymSet is not found. */
export interface DeleteProjectsLocationsSynonymSetsRequest {
  /** Required. The name of the synonymSet to delete Format: projects/{project_number}/locations/{location}/synonymSets/{context}. */
  name: string;
}

export const DeleteProjectsLocationsSynonymSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/synonymSets/{synonymSetsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSynonymSetsRequest>;

export type DeleteProjectsLocationsSynonymSetsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsSynonymSetsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsSynonymSetsError = CommonErrors;

export const deleteProjectsLocationsSynonymSets: API.OperationMethod<DeleteProjectsLocationsSynonymSetsRequest, DeleteProjectsLocationsSynonymSetsResponse, DeleteProjectsLocationsSynonymSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSynonymSetsRequest,
  output: DeleteProjectsLocationsSynonymSetsResponse,
  errors: [],
}));

/** Creates a SynonymSet for a single context. Throws an ALREADY_EXISTS exception if a synonymset already exists for the context. */
export interface CreateProjectsLocationsSynonymSetsRequest {
  /** Required. The parent name. Format: projects/{project_number}/locations/{location}. */
  parent: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1SynonymSet;
}

export const CreateProjectsLocationsSynonymSetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudContentwarehouseV1SynonymSet).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/synonymSets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsSynonymSetsRequest>;

export type CreateProjectsLocationsSynonymSetsResponse = GoogleCloudContentwarehouseV1SynonymSet;
export const CreateProjectsLocationsSynonymSetsResponse = GoogleCloudContentwarehouseV1SynonymSet;

export type CreateProjectsLocationsSynonymSetsError = CommonErrors;

export const createProjectsLocationsSynonymSets: API.OperationMethod<CreateProjectsLocationsSynonymSetsRequest, CreateProjectsLocationsSynonymSetsResponse, CreateProjectsLocationsSynonymSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsSynonymSetsRequest,
  output: CreateProjectsLocationsSynonymSetsResponse,
  errors: [],
}));

/** Gets a SynonymSet for a particular context. Throws a NOT_FOUND exception if the Synonymset does not exist */
export interface GetProjectsLocationsSynonymSetsRequest {
  /** Required. The name of the synonymSet to retrieve Format: projects/{project_number}/locations/{location}/synonymSets/{context}. */
  name: string;
}

export const GetProjectsLocationsSynonymSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/synonymSets/{synonymSetsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSynonymSetsRequest>;

export type GetProjectsLocationsSynonymSetsResponse = GoogleCloudContentwarehouseV1SynonymSet;
export const GetProjectsLocationsSynonymSetsResponse = GoogleCloudContentwarehouseV1SynonymSet;

export type GetProjectsLocationsSynonymSetsError = CommonErrors;

export const getProjectsLocationsSynonymSets: API.OperationMethod<GetProjectsLocationsSynonymSetsRequest, GetProjectsLocationsSynonymSetsResponse, GetProjectsLocationsSynonymSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSynonymSetsRequest,
  output: GetProjectsLocationsSynonymSetsResponse,
  errors: [],
}));

/** Gets a document. Returns NOT_FOUND if the document does not exist. */
export interface GetProjectsLocationsDocumentsRequest {
  /** Required. The name of the document to retrieve. Format: projects/{project_number}/locations/{location}/documents/{document_id} or projects/{project_number}/locations/{location}/documents/referenceId/{reference_id}. */
  name: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1GetDocumentRequest;
}

export const GetProjectsLocationsDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudContentwarehouseV1GetDocumentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/documents/{documentsId}:get", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDocumentsRequest>;

export type GetProjectsLocationsDocumentsResponse = GoogleCloudContentwarehouseV1Document;
export const GetProjectsLocationsDocumentsResponse = GoogleCloudContentwarehouseV1Document;

export type GetProjectsLocationsDocumentsError = CommonErrors;

export const getProjectsLocationsDocuments: API.OperationMethod<GetProjectsLocationsDocumentsRequest, GetProjectsLocationsDocumentsResponse, GetProjectsLocationsDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDocumentsRequest,
  output: GetProjectsLocationsDocumentsResponse,
  errors: [],
}));

/** Return all source document-links from the document. */
export interface LinkedSourcesProjectsLocationsDocumentsRequest {
  /** Required. The name of the document, for which all source links are returned. Format: projects/{project_number}/locations/{location}/documents/{source_document_id}. */
  parent: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1ListLinkedSourcesRequest;
}

export const LinkedSourcesProjectsLocationsDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudContentwarehouseV1ListLinkedSourcesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/documents/{documentsId}/linkedSources", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LinkedSourcesProjectsLocationsDocumentsRequest>;

export type LinkedSourcesProjectsLocationsDocumentsResponse = GoogleCloudContentwarehouseV1ListLinkedSourcesResponse;
export const LinkedSourcesProjectsLocationsDocumentsResponse = GoogleCloudContentwarehouseV1ListLinkedSourcesResponse;

export type LinkedSourcesProjectsLocationsDocumentsError = CommonErrors;

export const linkedSourcesProjectsLocationsDocuments: API.OperationMethod<LinkedSourcesProjectsLocationsDocumentsRequest, LinkedSourcesProjectsLocationsDocumentsResponse, LinkedSourcesProjectsLocationsDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LinkedSourcesProjectsLocationsDocumentsRequest,
  output: LinkedSourcesProjectsLocationsDocumentsResponse,
  errors: [],
}));

/** Deletes a document. Returns NOT_FOUND if the document does not exist. */
export interface DeleteProjectsLocationsDocumentsRequest {
  /** Required. The name of the document to delete. Format: projects/{project_number}/locations/{location}/documents/{document_id} or projects/{project_number}/locations/{location}/documents/referenceId/{reference_id}. */
  name: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1DeleteDocumentRequest;
}

export const DeleteProjectsLocationsDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudContentwarehouseV1DeleteDocumentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/documents/{documentsId}:delete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDocumentsRequest>;

export type DeleteProjectsLocationsDocumentsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsDocumentsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsDocumentsError = CommonErrors;

export const deleteProjectsLocationsDocuments: API.OperationMethod<DeleteProjectsLocationsDocumentsRequest, DeleteProjectsLocationsDocumentsResponse, DeleteProjectsLocationsDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDocumentsRequest,
  output: DeleteProjectsLocationsDocumentsResponse,
  errors: [],
}));

/** Updates a document. Returns INVALID_ARGUMENT if the name of the document is non-empty and does not equal the existing name. */
export interface PatchProjectsLocationsDocumentsRequest {
  /** Required. The name of the document to update. Format: projects/{project_number}/locations/{location}/documents/{document_id} or projects/{project_number}/locations/{location}/documents/referenceId/{reference_id}. */
  name: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1UpdateDocumentRequest;
}

export const PatchProjectsLocationsDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudContentwarehouseV1UpdateDocumentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/documents/{documentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDocumentsRequest>;

export type PatchProjectsLocationsDocumentsResponse = GoogleCloudContentwarehouseV1UpdateDocumentResponse;
export const PatchProjectsLocationsDocumentsResponse = GoogleCloudContentwarehouseV1UpdateDocumentResponse;

export type PatchProjectsLocationsDocumentsError = CommonErrors;

export const patchProjectsLocationsDocuments: API.OperationMethod<PatchProjectsLocationsDocumentsRequest, PatchProjectsLocationsDocumentsResponse, PatchProjectsLocationsDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDocumentsRequest,
  output: PatchProjectsLocationsDocumentsResponse,
  errors: [],
}));

/** Creates a document. */
export interface CreateProjectsLocationsDocumentsRequest {
  /** Required. The parent name. Format: projects/{project_number}/locations/{location}. */
  parent: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1CreateDocumentRequest;
}

export const CreateProjectsLocationsDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudContentwarehouseV1CreateDocumentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/documents", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDocumentsRequest>;

export type CreateProjectsLocationsDocumentsResponse = GoogleCloudContentwarehouseV1CreateDocumentResponse;
export const CreateProjectsLocationsDocumentsResponse = GoogleCloudContentwarehouseV1CreateDocumentResponse;

export type CreateProjectsLocationsDocumentsError = CommonErrors;

export const createProjectsLocationsDocuments: API.OperationMethod<CreateProjectsLocationsDocumentsRequest, CreateProjectsLocationsDocumentsResponse, CreateProjectsLocationsDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDocumentsRequest,
  output: CreateProjectsLocationsDocumentsResponse,
  errors: [],
}));

/** Return all target document-links from the document. */
export interface LinkedTargetsProjectsLocationsDocumentsRequest {
  /** Required. The name of the document, for which all target links are returned. Format: projects/{project_number}/locations/{location}/documents/{target_document_id}. */
  parent: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1ListLinkedTargetsRequest;
}

export const LinkedTargetsProjectsLocationsDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudContentwarehouseV1ListLinkedTargetsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/documents/{documentsId}/linkedTargets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LinkedTargetsProjectsLocationsDocumentsRequest>;

export type LinkedTargetsProjectsLocationsDocumentsResponse = GoogleCloudContentwarehouseV1ListLinkedTargetsResponse;
export const LinkedTargetsProjectsLocationsDocumentsResponse = GoogleCloudContentwarehouseV1ListLinkedTargetsResponse;

export type LinkedTargetsProjectsLocationsDocumentsError = CommonErrors;

export const linkedTargetsProjectsLocationsDocuments: API.OperationMethod<LinkedTargetsProjectsLocationsDocumentsRequest, LinkedTargetsProjectsLocationsDocumentsResponse, LinkedTargetsProjectsLocationsDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LinkedTargetsProjectsLocationsDocumentsRequest,
  output: LinkedTargetsProjectsLocationsDocumentsResponse,
  errors: [],
}));

/** Searches for documents using provided SearchDocumentsRequest. This call only returns documents that the caller has permission to search against. */
export interface SearchProjectsLocationsDocumentsRequest {
  /** Required. The parent, which owns this collection of documents. Format: projects/{project_number}/locations/{location}. */
  parent: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1SearchDocumentsRequest;
}

export const SearchProjectsLocationsDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudContentwarehouseV1SearchDocumentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/documents:search", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchProjectsLocationsDocumentsRequest>;

export type SearchProjectsLocationsDocumentsResponse = GoogleCloudContentwarehouseV1SearchDocumentsResponse;
export const SearchProjectsLocationsDocumentsResponse = GoogleCloudContentwarehouseV1SearchDocumentsResponse;

export type SearchProjectsLocationsDocumentsError = CommonErrors;

export const searchProjectsLocationsDocuments: API.OperationMethod<SearchProjectsLocationsDocumentsRequest, SearchProjectsLocationsDocumentsResponse, SearchProjectsLocationsDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchProjectsLocationsDocumentsRequest,
  output: SearchProjectsLocationsDocumentsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns NOT_FOUND error if the resource does not exist. Returns an empty policy if the resource exists but does not have a policy set. */
export interface FetchAclProjectsLocationsDocumentsRequest {
  /** Required. REQUIRED: The resource for which the policy is being requested. Format for document: projects/{project_number}/locations/{location}/documents/{document_id}. Format for collection: projects/{project_number}/locations/{location}/collections/{collection_id}. Format for project: projects/{project_number}. */
  resource: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1FetchAclRequest;
}

export const FetchAclProjectsLocationsDocumentsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleCloudContentwarehouseV1FetchAclRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/documents/{documentsId}:fetchAcl", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FetchAclProjectsLocationsDocumentsRequest>;

export type FetchAclProjectsLocationsDocumentsResponse = GoogleCloudContentwarehouseV1FetchAclResponse;
export const FetchAclProjectsLocationsDocumentsResponse = GoogleCloudContentwarehouseV1FetchAclResponse;

export type FetchAclProjectsLocationsDocumentsError = CommonErrors;

export const fetchAclProjectsLocationsDocuments: API.OperationMethod<FetchAclProjectsLocationsDocumentsRequest, FetchAclProjectsLocationsDocumentsResponse, FetchAclProjectsLocationsDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchAclProjectsLocationsDocumentsRequest,
  output: FetchAclProjectsLocationsDocumentsResponse,
  errors: [],
}));

/** Lock the document so the document cannot be updated by other users. */
export interface LockProjectsLocationsDocumentsRequest {
  /** Required. The name of the document to lock. Format: projects/{project_number}/locations/{location}/documents/{document}. */
  name: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1LockDocumentRequest;
}

export const LockProjectsLocationsDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudContentwarehouseV1LockDocumentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/documents/{documentsId}:lock", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LockProjectsLocationsDocumentsRequest>;

export type LockProjectsLocationsDocumentsResponse = GoogleCloudContentwarehouseV1Document;
export const LockProjectsLocationsDocumentsResponse = GoogleCloudContentwarehouseV1Document;

export type LockProjectsLocationsDocumentsError = CommonErrors;

export const lockProjectsLocationsDocuments: API.OperationMethod<LockProjectsLocationsDocumentsRequest, LockProjectsLocationsDocumentsResponse, LockProjectsLocationsDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LockProjectsLocationsDocumentsRequest,
  output: LockProjectsLocationsDocumentsResponse,
  errors: [],
}));

/** Sets the access control policy for a resource. Replaces any existing policy. */
export interface SetAclProjectsLocationsDocumentsRequest {
  /** Required. REQUIRED: The resource for which the policy is being requested. Format for document: projects/{project_number}/locations/{location}/documents/{document_id}. Format for collection: projects/{project_number}/locations/{location}/collections/{collection_id}. Format for project: projects/{project_number}. */
  resource: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1SetAclRequest;
}

export const SetAclProjectsLocationsDocumentsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleCloudContentwarehouseV1SetAclRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/documents/{documentsId}:setAcl", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetAclProjectsLocationsDocumentsRequest>;

export type SetAclProjectsLocationsDocumentsResponse = GoogleCloudContentwarehouseV1SetAclResponse;
export const SetAclProjectsLocationsDocumentsResponse = GoogleCloudContentwarehouseV1SetAclResponse;

export type SetAclProjectsLocationsDocumentsError = CommonErrors;

export const setAclProjectsLocationsDocuments: API.OperationMethod<SetAclProjectsLocationsDocumentsRequest, SetAclProjectsLocationsDocumentsResponse, SetAclProjectsLocationsDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetAclProjectsLocationsDocumentsRequest,
  output: SetAclProjectsLocationsDocumentsResponse,
  errors: [],
}));

/** Deletes a document. Returns NOT_FOUND if the document does not exist. */
export interface DeleteProjectsLocationsDocumentsReferenceIdRequest {
  /** Required. The name of the document to delete. Format: projects/{project_number}/locations/{location}/documents/{document_id} or projects/{project_number}/locations/{location}/documents/referenceId/{reference_id}. */
  name: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1DeleteDocumentRequest;
}

export const DeleteProjectsLocationsDocumentsReferenceIdRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudContentwarehouseV1DeleteDocumentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/documents/referenceId/{referenceIdId}:delete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDocumentsReferenceIdRequest>;

export type DeleteProjectsLocationsDocumentsReferenceIdResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsDocumentsReferenceIdResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsDocumentsReferenceIdError = CommonErrors;

export const deleteProjectsLocationsDocumentsReferenceId: API.OperationMethod<DeleteProjectsLocationsDocumentsReferenceIdRequest, DeleteProjectsLocationsDocumentsReferenceIdResponse, DeleteProjectsLocationsDocumentsReferenceIdError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDocumentsReferenceIdRequest,
  output: DeleteProjectsLocationsDocumentsReferenceIdResponse,
  errors: [],
}));

/** Updates a document. Returns INVALID_ARGUMENT if the name of the document is non-empty and does not equal the existing name. */
export interface PatchProjectsLocationsDocumentsReferenceIdRequest {
  /** Required. The name of the document to update. Format: projects/{project_number}/locations/{location}/documents/{document_id} or projects/{project_number}/locations/{location}/documents/referenceId/{reference_id}. */
  name: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1UpdateDocumentRequest;
}

export const PatchProjectsLocationsDocumentsReferenceIdRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudContentwarehouseV1UpdateDocumentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/documents/referenceId/{referenceIdId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDocumentsReferenceIdRequest>;

export type PatchProjectsLocationsDocumentsReferenceIdResponse = GoogleCloudContentwarehouseV1UpdateDocumentResponse;
export const PatchProjectsLocationsDocumentsReferenceIdResponse = GoogleCloudContentwarehouseV1UpdateDocumentResponse;

export type PatchProjectsLocationsDocumentsReferenceIdError = CommonErrors;

export const patchProjectsLocationsDocumentsReferenceId: API.OperationMethod<PatchProjectsLocationsDocumentsReferenceIdRequest, PatchProjectsLocationsDocumentsReferenceIdResponse, PatchProjectsLocationsDocumentsReferenceIdError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDocumentsReferenceIdRequest,
  output: PatchProjectsLocationsDocumentsReferenceIdResponse,
  errors: [],
}));

/** Gets a document. Returns NOT_FOUND if the document does not exist. */
export interface GetProjectsLocationsDocumentsReferenceIdRequest {
  /** Required. The name of the document to retrieve. Format: projects/{project_number}/locations/{location}/documents/{document_id} or projects/{project_number}/locations/{location}/documents/referenceId/{reference_id}. */
  name: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1GetDocumentRequest;
}

export const GetProjectsLocationsDocumentsReferenceIdRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudContentwarehouseV1GetDocumentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/documents/referenceId/{referenceIdId}:get", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDocumentsReferenceIdRequest>;

export type GetProjectsLocationsDocumentsReferenceIdResponse = GoogleCloudContentwarehouseV1Document;
export const GetProjectsLocationsDocumentsReferenceIdResponse = GoogleCloudContentwarehouseV1Document;

export type GetProjectsLocationsDocumentsReferenceIdError = CommonErrors;

export const getProjectsLocationsDocumentsReferenceId: API.OperationMethod<GetProjectsLocationsDocumentsReferenceIdRequest, GetProjectsLocationsDocumentsReferenceIdResponse, GetProjectsLocationsDocumentsReferenceIdError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDocumentsReferenceIdRequest,
  output: GetProjectsLocationsDocumentsReferenceIdResponse,
  errors: [],
}));

/** Create a link between a source document and a target document. */
export interface CreateProjectsLocationsDocumentsDocumentLinksRequest {
  /** Required. Parent of the document-link to be created. parent of document-link should be a document. Format: projects/{project_number}/locations/{location}/documents/{source_document_id}. */
  parent: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1CreateDocumentLinkRequest;
}

export const CreateProjectsLocationsDocumentsDocumentLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudContentwarehouseV1CreateDocumentLinkRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/documents/{documentsId}/documentLinks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDocumentsDocumentLinksRequest>;

export type CreateProjectsLocationsDocumentsDocumentLinksResponse = GoogleCloudContentwarehouseV1DocumentLink;
export const CreateProjectsLocationsDocumentsDocumentLinksResponse = GoogleCloudContentwarehouseV1DocumentLink;

export type CreateProjectsLocationsDocumentsDocumentLinksError = CommonErrors;

export const createProjectsLocationsDocumentsDocumentLinks: API.OperationMethod<CreateProjectsLocationsDocumentsDocumentLinksRequest, CreateProjectsLocationsDocumentsDocumentLinksResponse, CreateProjectsLocationsDocumentsDocumentLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDocumentsDocumentLinksRequest,
  output: CreateProjectsLocationsDocumentsDocumentLinksResponse,
  errors: [],
}));

/** Remove the link between the source and target documents. */
export interface DeleteProjectsLocationsDocumentsDocumentLinksRequest {
  /** Required. The name of the document-link to be deleted. Format: projects/{project_number}/locations/{location}/documents/{source_document_id}/documentLinks/{document_link_id}. */
  name: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1DeleteDocumentLinkRequest;
}

export const DeleteProjectsLocationsDocumentsDocumentLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudContentwarehouseV1DeleteDocumentLinkRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/documents/{documentsId}/documentLinks/{documentLinksId}:delete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDocumentsDocumentLinksRequest>;

export type DeleteProjectsLocationsDocumentsDocumentLinksResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsDocumentsDocumentLinksResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsDocumentsDocumentLinksError = CommonErrors;

export const deleteProjectsLocationsDocumentsDocumentLinks: API.OperationMethod<DeleteProjectsLocationsDocumentsDocumentLinksRequest, DeleteProjectsLocationsDocumentsDocumentLinksResponse, DeleteProjectsLocationsDocumentsDocumentLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDocumentsDocumentLinksRequest,
  output: DeleteProjectsLocationsDocumentsDocumentLinksResponse,
  errors: [],
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

export type GetProjectsLocationsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Creates a ruleset. */
export interface CreateProjectsLocationsRuleSetsRequest {
  /** Required. The parent name. Format: projects/{project_number}/locations/{location}. */
  parent: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1RuleSet;
}

export const CreateProjectsLocationsRuleSetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudContentwarehouseV1RuleSet).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/ruleSets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRuleSetsRequest>;

export type CreateProjectsLocationsRuleSetsResponse = GoogleCloudContentwarehouseV1RuleSet;
export const CreateProjectsLocationsRuleSetsResponse = GoogleCloudContentwarehouseV1RuleSet;

export type CreateProjectsLocationsRuleSetsError = CommonErrors;

export const createProjectsLocationsRuleSets: API.OperationMethod<CreateProjectsLocationsRuleSetsRequest, CreateProjectsLocationsRuleSetsResponse, CreateProjectsLocationsRuleSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRuleSetsRequest,
  output: CreateProjectsLocationsRuleSetsResponse,
  errors: [],
}));

/** Updates a ruleset. Returns INVALID_ARGUMENT if the name of the ruleset is non-empty and does not equal the existing name. */
export interface PatchProjectsLocationsRuleSetsRequest {
  /** Required. The name of the rule set to update. Format: projects/{project_number}/locations/{location}/ruleSets/{rule_set_id}. */
  name: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1UpdateRuleSetRequest;
}

export const PatchProjectsLocationsRuleSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudContentwarehouseV1UpdateRuleSetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/ruleSets/{ruleSetsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRuleSetsRequest>;

export type PatchProjectsLocationsRuleSetsResponse = GoogleCloudContentwarehouseV1RuleSet;
export const PatchProjectsLocationsRuleSetsResponse = GoogleCloudContentwarehouseV1RuleSet;

export type PatchProjectsLocationsRuleSetsError = CommonErrors;

export const patchProjectsLocationsRuleSets: API.OperationMethod<PatchProjectsLocationsRuleSetsRequest, PatchProjectsLocationsRuleSetsResponse, PatchProjectsLocationsRuleSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRuleSetsRequest,
  output: PatchProjectsLocationsRuleSetsResponse,
  errors: [],
}));

/** Lists rulesets. */
export interface ListProjectsLocationsRuleSetsRequest {
  /** A page token, received from a previous `ListRuleSets` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListRuleSets` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of rule sets to return. The service may return fewer than this value. If unspecified, at most 50 rule sets will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Required. The parent, which owns this collection of document. Format: projects/{project_number}/locations/{location}. */
  parent: string;
}

export const ListProjectsLocationsRuleSetsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/ruleSets" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRuleSetsRequest>;

export type ListProjectsLocationsRuleSetsResponse = GoogleCloudContentwarehouseV1ListRuleSetsResponse;
export const ListProjectsLocationsRuleSetsResponse = GoogleCloudContentwarehouseV1ListRuleSetsResponse;

export type ListProjectsLocationsRuleSetsError = CommonErrors;

export const listProjectsLocationsRuleSets = API.makePaginated(() => ({
  input: ListProjectsLocationsRuleSetsRequest,
  output: ListProjectsLocationsRuleSetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a ruleset. Returns NOT_FOUND if the document does not exist. */
export interface DeleteProjectsLocationsRuleSetsRequest {
  /** Required. The name of the rule set to delete. Format: projects/{project_number}/locations/{location}/ruleSets/{rule_set_id}. */
  name: string;
}

export const DeleteProjectsLocationsRuleSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/ruleSets/{ruleSetsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRuleSetsRequest>;

export type DeleteProjectsLocationsRuleSetsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsRuleSetsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsRuleSetsError = CommonErrors;

export const deleteProjectsLocationsRuleSets: API.OperationMethod<DeleteProjectsLocationsRuleSetsRequest, DeleteProjectsLocationsRuleSetsResponse, DeleteProjectsLocationsRuleSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRuleSetsRequest,
  output: DeleteProjectsLocationsRuleSetsResponse,
  errors: [],
}));

/** Gets a ruleset. Returns NOT_FOUND if the ruleset does not exist. */
export interface GetProjectsLocationsRuleSetsRequest {
  /** Required. The name of the rule set to retrieve. Format: projects/{project_number}/locations/{location}/ruleSets/{rule_set_id}. */
  name: string;
}

export const GetProjectsLocationsRuleSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/ruleSets/{ruleSetsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRuleSetsRequest>;

export type GetProjectsLocationsRuleSetsResponse = GoogleCloudContentwarehouseV1RuleSet;
export const GetProjectsLocationsRuleSetsResponse = GoogleCloudContentwarehouseV1RuleSet;

export type GetProjectsLocationsRuleSetsError = CommonErrors;

export const getProjectsLocationsRuleSets: API.OperationMethod<GetProjectsLocationsRuleSetsRequest, GetProjectsLocationsRuleSetsResponse, GetProjectsLocationsRuleSetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRuleSetsRequest,
  output: GetProjectsLocationsRuleSetsResponse,
  errors: [],
}));

/** Lists document schemas. */
export interface ListProjectsLocationsDocumentSchemasRequest {
  /** A page token, received from a previous `ListDocumentSchemas` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDocumentSchemas` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of document schemas to return. The service may return fewer than this value. If unspecified, at most 50 document schemas will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Required. The parent, which owns this collection of document schemas. Format: projects/{project_number}/locations/{location}. */
  parent: string;
}

export const ListProjectsLocationsDocumentSchemasRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/documentSchemas" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDocumentSchemasRequest>;

export type ListProjectsLocationsDocumentSchemasResponse = GoogleCloudContentwarehouseV1ListDocumentSchemasResponse;
export const ListProjectsLocationsDocumentSchemasResponse = GoogleCloudContentwarehouseV1ListDocumentSchemasResponse;

export type ListProjectsLocationsDocumentSchemasError = CommonErrors;

export const listProjectsLocationsDocumentSchemas = API.makePaginated(() => ({
  input: ListProjectsLocationsDocumentSchemasRequest,
  output: ListProjectsLocationsDocumentSchemasResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a document schema. Returns NOT_FOUND if the document schema does not exist. */
export interface GetProjectsLocationsDocumentSchemasRequest {
  /** Required. The name of the document schema to retrieve. */
  name: string;
}

export const GetProjectsLocationsDocumentSchemasRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/documentSchemas/{documentSchemasId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDocumentSchemasRequest>;

export type GetProjectsLocationsDocumentSchemasResponse = GoogleCloudContentwarehouseV1DocumentSchema;
export const GetProjectsLocationsDocumentSchemasResponse = GoogleCloudContentwarehouseV1DocumentSchema;

export type GetProjectsLocationsDocumentSchemasError = CommonErrors;

export const getProjectsLocationsDocumentSchemas: API.OperationMethod<GetProjectsLocationsDocumentSchemasRequest, GetProjectsLocationsDocumentSchemasResponse, GetProjectsLocationsDocumentSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDocumentSchemasRequest,
  output: GetProjectsLocationsDocumentSchemasResponse,
  errors: [],
}));

/** Creates a document schema. */
export interface CreateProjectsLocationsDocumentSchemasRequest {
  /** Required. The parent name. */
  parent: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1DocumentSchema;
}

export const CreateProjectsLocationsDocumentSchemasRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudContentwarehouseV1DocumentSchema).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/documentSchemas", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDocumentSchemasRequest>;

export type CreateProjectsLocationsDocumentSchemasResponse = GoogleCloudContentwarehouseV1DocumentSchema;
export const CreateProjectsLocationsDocumentSchemasResponse = GoogleCloudContentwarehouseV1DocumentSchema;

export type CreateProjectsLocationsDocumentSchemasError = CommonErrors;

export const createProjectsLocationsDocumentSchemas: API.OperationMethod<CreateProjectsLocationsDocumentSchemasRequest, CreateProjectsLocationsDocumentSchemasResponse, CreateProjectsLocationsDocumentSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDocumentSchemasRequest,
  output: CreateProjectsLocationsDocumentSchemasResponse,
  errors: [],
}));

/** Updates a Document Schema. Returns INVALID_ARGUMENT if the name of the Document Schema is non-empty and does not equal the existing name. Supports only appending new properties, adding new ENUM possible values, and updating the EnumTypeOptions.validation_check_disabled flag for ENUM possible values. Updating existing properties will result into INVALID_ARGUMENT. */
export interface PatchProjectsLocationsDocumentSchemasRequest {
  /** Required. The name of the document schema to update. Format: projects/{project_number}/locations/{location}/documentSchemas/{document_schema_id}. */
  name: string;
  /** Request body */
  body?: GoogleCloudContentwarehouseV1UpdateDocumentSchemaRequest;
}

export const PatchProjectsLocationsDocumentSchemasRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudContentwarehouseV1UpdateDocumentSchemaRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/documentSchemas/{documentSchemasId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDocumentSchemasRequest>;

export type PatchProjectsLocationsDocumentSchemasResponse = GoogleCloudContentwarehouseV1DocumentSchema;
export const PatchProjectsLocationsDocumentSchemasResponse = GoogleCloudContentwarehouseV1DocumentSchema;

export type PatchProjectsLocationsDocumentSchemasError = CommonErrors;

export const patchProjectsLocationsDocumentSchemas: API.OperationMethod<PatchProjectsLocationsDocumentSchemasRequest, PatchProjectsLocationsDocumentSchemasResponse, PatchProjectsLocationsDocumentSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDocumentSchemasRequest,
  output: PatchProjectsLocationsDocumentSchemasResponse,
  errors: [],
}));

/** Deletes a document schema. Returns NOT_FOUND if the document schema does not exist. Returns BAD_REQUEST if the document schema has documents depending on it. */
export interface DeleteProjectsLocationsDocumentSchemasRequest {
  /** Required. The name of the document schema to delete. */
  name: string;
}

export const DeleteProjectsLocationsDocumentSchemasRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/documentSchemas/{documentSchemasId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDocumentSchemasRequest>;

export type DeleteProjectsLocationsDocumentSchemasResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsDocumentSchemasResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsDocumentSchemasError = CommonErrors;

export const deleteProjectsLocationsDocumentSchemas: API.OperationMethod<DeleteProjectsLocationsDocumentSchemasRequest, DeleteProjectsLocationsDocumentSchemasResponse, DeleteProjectsLocationsDocumentSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDocumentSchemasRequest,
  output: DeleteProjectsLocationsDocumentSchemasResponse,
  errors: [],
}));

