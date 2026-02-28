// ==========================================================================
// BigLake API (biglake v1)
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
  name: "biglake",
  version: "v1",
  rootUrl: "https://biglake.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface SerDeInfo {
  /** The fully qualified Java class name of the serialization library. */
  serializationLib?: string;
}

export const SerDeInfo: Schema.Schema<SerDeInfo> = Schema.suspend(() => Schema.Struct({
  serializationLib: Schema.optional(Schema.String),
})).annotate({ identifier: "SerDeInfo" }) as any as Schema.Schema<SerDeInfo>;

export interface StorageDescriptor {
  /** The fully qualified Java class name of the output format. */
  outputFormat?: string;
  /** The fully qualified Java class name of the input format. */
  inputFormat?: string;
  /** Serializer and deserializer information. */
  serdeInfo?: SerDeInfo;
  /** Cloud Storage folder URI where the table data is stored, starting with "gs://". */
  locationUri?: string;
}

export const StorageDescriptor: Schema.Schema<StorageDescriptor> = Schema.suspend(() => Schema.Struct({
  outputFormat: Schema.optional(Schema.String),
  inputFormat: Schema.optional(Schema.String),
  serdeInfo: Schema.optional(SerDeInfo),
  locationUri: Schema.optional(Schema.String),
})).annotate({ identifier: "StorageDescriptor" }) as any as Schema.Schema<StorageDescriptor>;

export interface HiveTableOptions {
  /** Stores user supplied Hive table parameters. */
  parameters?: Record<string, string>;
  /** Stores physical storage information of the data. */
  storageDescriptor?: StorageDescriptor;
  /** Hive table type. For example, MANAGED_TABLE, EXTERNAL_TABLE. */
  tableType?: string;
}

export const HiveTableOptions: Schema.Schema<HiveTableOptions> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  storageDescriptor: Schema.optional(StorageDescriptor),
  tableType: Schema.optional(Schema.String),
})).annotate({ identifier: "HiveTableOptions" }) as any as Schema.Schema<HiveTableOptions>;

export interface Table {
  /** The table type. */
  type?: "TYPE_UNSPECIFIED" | "HIVE" | (string & {});
  /** The checksum of a table object computed by the server based on the value of other fields. It may be sent on update requests to ensure the client has an up-to-date value before proceeding. It is only checked for update table operations. */
  etag?: string;
  /** Output only. The resource name. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id}/tables/{table_id} */
  name?: string;
  /** Output only. The deletion time of the table. Only set after the table is deleted. */
  deleteTime?: string;
  /** Output only. The time when this table is considered expired. Only set after the table is deleted. */
  expireTime?: string;
  /** Options of a Hive table. */
  hiveOptions?: HiveTableOptions;
  /** Output only. The last modification time of the table. */
  updateTime?: string;
  /** Output only. The creation time of the table. */
  createTime?: string;
}

export const Table: Schema.Schema<Table> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  hiveOptions: Schema.optional(HiveTableOptions),
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Table" }) as any as Schema.Schema<Table>;

export interface HiveDatabaseOptions {
  /** Cloud Storage folder URI where the database data is stored, starting with "gs://". */
  locationUri?: string;
  /** Stores user supplied Hive database parameters. */
  parameters?: Record<string, string>;
}

export const HiveDatabaseOptions: Schema.Schema<HiveDatabaseOptions> = Schema.suspend(() => Schema.Struct({
  locationUri: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "HiveDatabaseOptions" }) as any as Schema.Schema<HiveDatabaseOptions>;

export interface Database {
  /** Output only. The resource name. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id} */
  name?: string;
  /** Output only. The time when this database is considered expired. Only set after the database is deleted. */
  expireTime?: string;
  /** Options of a Hive database. */
  hiveOptions?: HiveDatabaseOptions;
  /** Output only. The creation time of the database. */
  createTime?: string;
  /** The database type. */
  type?: "TYPE_UNSPECIFIED" | "HIVE" | (string & {});
  /** Output only. The last modification time of the database. */
  updateTime?: string;
  /** Output only. The deletion time of the database. Only set after the database is deleted. */
  deleteTime?: string;
}

export const Database: Schema.Schema<Database> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  hiveOptions: Schema.optional(HiveDatabaseOptions),
  createTime: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Database" }) as any as Schema.Schema<Database>;

export interface ListDatabasesResponse {
  /** The databases from the specified catalog. */
  databases?: Array<Database>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListDatabasesResponse: Schema.Schema<ListDatabasesResponse> = Schema.suspend(() => Schema.Struct({
  databases: Schema.optional(Schema.Array(Database)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDatabasesResponse" }) as any as Schema.Schema<ListDatabasesResponse>;

export interface AuditLogConfig {
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
  logType: Schema.optional(Schema.String),
})).annotate({ identifier: "AuditLogConfig" }) as any as Schema.Schema<AuditLogConfig>;

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

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  members: Schema.optional(Schema.Array(Schema.String)),
  role: Schema.optional(Schema.String),
  condition: Schema.optional(Expr),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface ListTablesResponse {
  /** The tables from the specified database. */
  tables?: Array<Table>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListTablesResponse: Schema.Schema<ListTablesResponse> = Schema.suspend(() => Schema.Struct({
  tables: Schema.optional(Schema.Array(Table)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTablesResponse" }) as any as Schema.Schema<ListTablesResponse>;

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
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  bindings: Schema.optional(Schema.Array(Binding)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface Catalog {
  /** Output only. The last modification time of the catalog. */
  updateTime?: string;
  /** Output only. The time when this catalog is considered expired. Only set after the catalog is deleted. */
  expireTime?: string;
  /** Output only. The creation time of the catalog. */
  createTime?: string;
  /** Output only. The resource name. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id} */
  name?: string;
  /** Output only. The deletion time of the catalog. Only set after the catalog is deleted. */
  deleteTime?: string;
}

export const Catalog: Schema.Schema<Catalog> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  deleteTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Catalog" }) as any as Schema.Schema<Catalog>;

export interface SetIamPolicyRequest {
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  updateMask: Schema.optional(Schema.String),
  policy: Schema.optional(Policy),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface ListCatalogsResponse {
  /** The catalogs from the specified project. */
  catalogs?: Array<Catalog>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListCatalogsResponse: Schema.Schema<ListCatalogsResponse> = Schema.suspend(() => Schema.Struct({
  catalogs: Schema.optional(Schema.Array(Catalog)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCatalogsResponse" }) as any as Schema.Schema<ListCatalogsResponse>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface RenameTableRequest {
  /** Required. The new `name` for the specified table, must be in the same database. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id}/tables/{table_id} */
  newName?: string;
}

export const RenameTableRequest: Schema.Schema<RenameTableRequest> = Schema.suspend(() => Schema.Struct({
  newName: Schema.optional(Schema.String),
})).annotate({ identifier: "RenameTableRequest" }) as any as Schema.Schema<RenameTableRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Sets the IAM policy for the specified catalog. */
export interface SetIamPolicyProjectsCatalogsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsCatalogsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/catalogs/{catalogsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsCatalogsRequest>;

export type SetIamPolicyProjectsCatalogsResponse = Policy;
export const SetIamPolicyProjectsCatalogsResponse = Policy;

export type SetIamPolicyProjectsCatalogsError = CommonErrors;

export const setIamPolicyProjectsCatalogs: API.OperationMethod<SetIamPolicyProjectsCatalogsRequest, SetIamPolicyProjectsCatalogsResponse, SetIamPolicyProjectsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsCatalogsRequest,
  output: SetIamPolicyProjectsCatalogsResponse,
  errors: [],
}));

/** Gets the IAM policy for the specified Catalog. */
export interface GetIamPolicyProjectsCatalogsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsCatalogsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/catalogs/{catalogsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsCatalogsRequest>;

export type GetIamPolicyProjectsCatalogsResponse = Policy;
export const GetIamPolicyProjectsCatalogsResponse = Policy;

export type GetIamPolicyProjectsCatalogsError = CommonErrors;

export const getIamPolicyProjectsCatalogs: API.OperationMethod<GetIamPolicyProjectsCatalogsRequest, GetIamPolicyProjectsCatalogsResponse, GetIamPolicyProjectsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsCatalogsRequest,
  output: GetIamPolicyProjectsCatalogsResponse,
  errors: [],
}));

/** Tests the IAM permissions for the specified catalog. */
export interface TestIamPermissionsProjectsCatalogsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsCatalogsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/catalogs/{catalogsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsCatalogsRequest>;

export type TestIamPermissionsProjectsCatalogsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsCatalogsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsCatalogsError = CommonErrors;

export const testIamPermissionsProjectsCatalogs: API.OperationMethod<TestIamPermissionsProjectsCatalogsRequest, TestIamPermissionsProjectsCatalogsResponse, TestIamPermissionsProjectsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsCatalogsRequest,
  output: TestIamPermissionsProjectsCatalogsResponse,
  errors: [],
}));

/** Gets the IAM policy for the specified Catalog. */
export interface GetIamPolicyProjectsCatalogsNamespacesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsCatalogsNamespacesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/catalogs/{catalogsId}/namespaces/{namespacesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsCatalogsNamespacesRequest>;

export type GetIamPolicyProjectsCatalogsNamespacesResponse = Policy;
export const GetIamPolicyProjectsCatalogsNamespacesResponse = Policy;

export type GetIamPolicyProjectsCatalogsNamespacesError = CommonErrors;

export const getIamPolicyProjectsCatalogsNamespaces: API.OperationMethod<GetIamPolicyProjectsCatalogsNamespacesRequest, GetIamPolicyProjectsCatalogsNamespacesResponse, GetIamPolicyProjectsCatalogsNamespacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsCatalogsNamespacesRequest,
  output: GetIamPolicyProjectsCatalogsNamespacesResponse,
  errors: [],
}));

/** Sets the IAM policy for the specified catalog. */
export interface SetIamPolicyProjectsCatalogsNamespacesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsCatalogsNamespacesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/catalogs/{catalogsId}/namespaces/{namespacesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsCatalogsNamespacesRequest>;

export type SetIamPolicyProjectsCatalogsNamespacesResponse = Policy;
export const SetIamPolicyProjectsCatalogsNamespacesResponse = Policy;

export type SetIamPolicyProjectsCatalogsNamespacesError = CommonErrors;

export const setIamPolicyProjectsCatalogsNamespaces: API.OperationMethod<SetIamPolicyProjectsCatalogsNamespacesRequest, SetIamPolicyProjectsCatalogsNamespacesResponse, SetIamPolicyProjectsCatalogsNamespacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsCatalogsNamespacesRequest,
  output: SetIamPolicyProjectsCatalogsNamespacesResponse,
  errors: [],
}));

/** Tests the IAM permissions for the specified namespace. */
export interface TestIamPermissionsProjectsCatalogsNamespacesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsCatalogsNamespacesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/catalogs/{catalogsId}/namespaces/{namespacesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsCatalogsNamespacesRequest>;

export type TestIamPermissionsProjectsCatalogsNamespacesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsCatalogsNamespacesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsCatalogsNamespacesError = CommonErrors;

export const testIamPermissionsProjectsCatalogsNamespaces: API.OperationMethod<TestIamPermissionsProjectsCatalogsNamespacesRequest, TestIamPermissionsProjectsCatalogsNamespacesResponse, TestIamPermissionsProjectsCatalogsNamespacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsCatalogsNamespacesRequest,
  output: TestIamPermissionsProjectsCatalogsNamespacesResponse,
  errors: [],
}));

/** Gets the IAM policy for the specified Catalog. */
export interface GetIamPolicyProjectsCatalogsNamespacesTablesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsCatalogsNamespacesTablesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/catalogs/{catalogsId}/namespaces/{namespacesId}/tables/{tablesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsCatalogsNamespacesTablesRequest>;

export type GetIamPolicyProjectsCatalogsNamespacesTablesResponse = Policy;
export const GetIamPolicyProjectsCatalogsNamespacesTablesResponse = Policy;

export type GetIamPolicyProjectsCatalogsNamespacesTablesError = CommonErrors;

export const getIamPolicyProjectsCatalogsNamespacesTables: API.OperationMethod<GetIamPolicyProjectsCatalogsNamespacesTablesRequest, GetIamPolicyProjectsCatalogsNamespacesTablesResponse, GetIamPolicyProjectsCatalogsNamespacesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsCatalogsNamespacesTablesRequest,
  output: GetIamPolicyProjectsCatalogsNamespacesTablesResponse,
  errors: [],
}));

/** Tests the IAM permissions for the specified table. */
export interface TestIamPermissionsProjectsCatalogsNamespacesTablesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsCatalogsNamespacesTablesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/catalogs/{catalogsId}/namespaces/{namespacesId}/tables/{tablesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsCatalogsNamespacesTablesRequest>;

export type TestIamPermissionsProjectsCatalogsNamespacesTablesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsCatalogsNamespacesTablesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsCatalogsNamespacesTablesError = CommonErrors;

export const testIamPermissionsProjectsCatalogsNamespacesTables: API.OperationMethod<TestIamPermissionsProjectsCatalogsNamespacesTablesRequest, TestIamPermissionsProjectsCatalogsNamespacesTablesResponse, TestIamPermissionsProjectsCatalogsNamespacesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsCatalogsNamespacesTablesRequest,
  output: TestIamPermissionsProjectsCatalogsNamespacesTablesResponse,
  errors: [],
}));

/** Sets the IAM policy for the specified catalog. */
export interface SetIamPolicyProjectsCatalogsNamespacesTablesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsCatalogsNamespacesTablesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/catalogs/{catalogsId}/namespaces/{namespacesId}/tables/{tablesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsCatalogsNamespacesTablesRequest>;

export type SetIamPolicyProjectsCatalogsNamespacesTablesResponse = Policy;
export const SetIamPolicyProjectsCatalogsNamespacesTablesResponse = Policy;

export type SetIamPolicyProjectsCatalogsNamespacesTablesError = CommonErrors;

export const setIamPolicyProjectsCatalogsNamespacesTables: API.OperationMethod<SetIamPolicyProjectsCatalogsNamespacesTablesRequest, SetIamPolicyProjectsCatalogsNamespacesTablesResponse, SetIamPolicyProjectsCatalogsNamespacesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsCatalogsNamespacesTablesRequest,
  output: SetIamPolicyProjectsCatalogsNamespacesTablesResponse,
  errors: [],
}));

/** Creates a new catalog. */
export interface CreateProjectsLocationsCatalogsRequest {
  /** Required. The parent resource where this catalog will be created. Format: projects/{project_id_or_number}/locations/{location_id} */
  parent: string;
  /** Required. The ID to use for the catalog, which will become the final component of the catalog's resource name. */
  catalogId?: string;
  /** Request body */
  body?: Catalog;
}

export const CreateProjectsLocationsCatalogsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  catalogId: Schema.optional(Schema.String).pipe(T.HttpQuery("catalogId")),
  body: Schema.optional(Catalog).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/catalogs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCatalogsRequest>;

export type CreateProjectsLocationsCatalogsResponse = Catalog;
export const CreateProjectsLocationsCatalogsResponse = Catalog;

export type CreateProjectsLocationsCatalogsError = CommonErrors;

export const createProjectsLocationsCatalogs: API.OperationMethod<CreateProjectsLocationsCatalogsRequest, CreateProjectsLocationsCatalogsResponse, CreateProjectsLocationsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCatalogsRequest,
  output: CreateProjectsLocationsCatalogsResponse,
  errors: [],
}));

/** Gets the catalog specified by the resource name. */
export interface GetProjectsLocationsCatalogsRequest {
  /** Required. The name of the catalog to retrieve. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id} */
  name: string;
}

export const GetProjectsLocationsCatalogsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCatalogsRequest>;

export type GetProjectsLocationsCatalogsResponse = Catalog;
export const GetProjectsLocationsCatalogsResponse = Catalog;

export type GetProjectsLocationsCatalogsError = CommonErrors;

export const getProjectsLocationsCatalogs: API.OperationMethod<GetProjectsLocationsCatalogsRequest, GetProjectsLocationsCatalogsResponse, GetProjectsLocationsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCatalogsRequest,
  output: GetProjectsLocationsCatalogsResponse,
  errors: [],
}));

/** Deletes an existing catalog specified by the catalog ID. */
export interface DeleteProjectsLocationsCatalogsRequest {
  /** Required. The name of the catalog to delete. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id} */
  name: string;
}

export const DeleteProjectsLocationsCatalogsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsCatalogsRequest>;

export type DeleteProjectsLocationsCatalogsResponse = Catalog;
export const DeleteProjectsLocationsCatalogsResponse = Catalog;

export type DeleteProjectsLocationsCatalogsError = CommonErrors;

export const deleteProjectsLocationsCatalogs: API.OperationMethod<DeleteProjectsLocationsCatalogsRequest, DeleteProjectsLocationsCatalogsResponse, DeleteProjectsLocationsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsCatalogsRequest,
  output: DeleteProjectsLocationsCatalogsResponse,
  errors: [],
}));

/** List all catalogs in a specified project. */
export interface ListProjectsLocationsCatalogsRequest {
  /** A page token, received from a previous `ListCatalogs` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListCatalogs` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The parent, which owns this collection of catalogs. Format: projects/{project_id_or_number}/locations/{location_id} */
  parent: string;
  /** The maximum number of catalogs to return. The service may return fewer than this value. If unspecified, at most 50 catalogs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListProjectsLocationsCatalogsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/catalogs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCatalogsRequest>;

export type ListProjectsLocationsCatalogsResponse = ListCatalogsResponse;
export const ListProjectsLocationsCatalogsResponse = ListCatalogsResponse;

export type ListProjectsLocationsCatalogsError = CommonErrors;

export const listProjectsLocationsCatalogs = API.makePaginated(() => ({
  input: ListProjectsLocationsCatalogsRequest,
  output: ListProjectsLocationsCatalogsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an existing database specified by the database ID. */
export interface PatchProjectsLocationsCatalogsDatabasesRequest {
  /** The list of fields to update. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask If not set, defaults to all of the fields that are allowed to update. */
  updateMask?: string;
  /** Output only. The resource name. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id} */
  name: string;
  /** Request body */
  body?: Database;
}

export const PatchProjectsLocationsCatalogsDatabasesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Database).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/databases/{databasesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCatalogsDatabasesRequest>;

export type PatchProjectsLocationsCatalogsDatabasesResponse = Database;
export const PatchProjectsLocationsCatalogsDatabasesResponse = Database;

export type PatchProjectsLocationsCatalogsDatabasesError = CommonErrors;

export const patchProjectsLocationsCatalogsDatabases: API.OperationMethod<PatchProjectsLocationsCatalogsDatabasesRequest, PatchProjectsLocationsCatalogsDatabasesResponse, PatchProjectsLocationsCatalogsDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCatalogsDatabasesRequest,
  output: PatchProjectsLocationsCatalogsDatabasesResponse,
  errors: [],
}));

/** Deletes an existing database specified by the database ID. */
export interface DeleteProjectsLocationsCatalogsDatabasesRequest {
  /** Required. The name of the database to delete. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id} */
  name: string;
}

export const DeleteProjectsLocationsCatalogsDatabasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/databases/{databasesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsCatalogsDatabasesRequest>;

export type DeleteProjectsLocationsCatalogsDatabasesResponse = Database;
export const DeleteProjectsLocationsCatalogsDatabasesResponse = Database;

export type DeleteProjectsLocationsCatalogsDatabasesError = CommonErrors;

export const deleteProjectsLocationsCatalogsDatabases: API.OperationMethod<DeleteProjectsLocationsCatalogsDatabasesRequest, DeleteProjectsLocationsCatalogsDatabasesResponse, DeleteProjectsLocationsCatalogsDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsCatalogsDatabasesRequest,
  output: DeleteProjectsLocationsCatalogsDatabasesResponse,
  errors: [],
}));

/** Gets the database specified by the resource name. */
export interface GetProjectsLocationsCatalogsDatabasesRequest {
  /** Required. The name of the database to retrieve. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id} */
  name: string;
}

export const GetProjectsLocationsCatalogsDatabasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/databases/{databasesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCatalogsDatabasesRequest>;

export type GetProjectsLocationsCatalogsDatabasesResponse = Database;
export const GetProjectsLocationsCatalogsDatabasesResponse = Database;

export type GetProjectsLocationsCatalogsDatabasesError = CommonErrors;

export const getProjectsLocationsCatalogsDatabases: API.OperationMethod<GetProjectsLocationsCatalogsDatabasesRequest, GetProjectsLocationsCatalogsDatabasesResponse, GetProjectsLocationsCatalogsDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCatalogsDatabasesRequest,
  output: GetProjectsLocationsCatalogsDatabasesResponse,
  errors: [],
}));

/** Creates a new database. */
export interface CreateProjectsLocationsCatalogsDatabasesRequest {
  /** Required. The ID to use for the database, which will become the final component of the database's resource name. */
  databaseId?: string;
  /** Required. The parent resource where this database will be created. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id} */
  parent: string;
  /** Request body */
  body?: Database;
}

export const CreateProjectsLocationsCatalogsDatabasesRequest = Schema.Struct({
  databaseId: Schema.optional(Schema.String).pipe(T.HttpQuery("databaseId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Database).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/databases", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCatalogsDatabasesRequest>;

export type CreateProjectsLocationsCatalogsDatabasesResponse = Database;
export const CreateProjectsLocationsCatalogsDatabasesResponse = Database;

export type CreateProjectsLocationsCatalogsDatabasesError = CommonErrors;

export const createProjectsLocationsCatalogsDatabases: API.OperationMethod<CreateProjectsLocationsCatalogsDatabasesRequest, CreateProjectsLocationsCatalogsDatabasesResponse, CreateProjectsLocationsCatalogsDatabasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCatalogsDatabasesRequest,
  output: CreateProjectsLocationsCatalogsDatabasesResponse,
  errors: [],
}));

/** List all databases in a specified catalog. */
export interface ListProjectsLocationsCatalogsDatabasesRequest {
  /** A page token, received from a previous `ListDatabases` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDatabases` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The parent, which owns this collection of databases. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id} */
  parent: string;
  /** The maximum number of databases to return. The service may return fewer than this value. If unspecified, at most 50 databases will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListProjectsLocationsCatalogsDatabasesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/databases" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCatalogsDatabasesRequest>;

export type ListProjectsLocationsCatalogsDatabasesResponse = ListDatabasesResponse;
export const ListProjectsLocationsCatalogsDatabasesResponse = ListDatabasesResponse;

export type ListProjectsLocationsCatalogsDatabasesError = CommonErrors;

export const listProjectsLocationsCatalogsDatabases = API.makePaginated(() => ({
  input: ListProjectsLocationsCatalogsDatabasesRequest,
  output: ListProjectsLocationsCatalogsDatabasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Renames an existing table specified by the table ID. */
export interface RenameProjectsLocationsCatalogsDatabasesTablesRequest {
  /** Required. The table's `name` field is used to identify the table to rename. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id}/tables/{table_id} */
  name: string;
  /** Request body */
  body?: RenameTableRequest;
}

export const RenameProjectsLocationsCatalogsDatabasesTablesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RenameTableRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/databases/{databasesId}/tables/{tablesId}:rename", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RenameProjectsLocationsCatalogsDatabasesTablesRequest>;

export type RenameProjectsLocationsCatalogsDatabasesTablesResponse = Table;
export const RenameProjectsLocationsCatalogsDatabasesTablesResponse = Table;

export type RenameProjectsLocationsCatalogsDatabasesTablesError = CommonErrors;

export const renameProjectsLocationsCatalogsDatabasesTables: API.OperationMethod<RenameProjectsLocationsCatalogsDatabasesTablesRequest, RenameProjectsLocationsCatalogsDatabasesTablesResponse, RenameProjectsLocationsCatalogsDatabasesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RenameProjectsLocationsCatalogsDatabasesTablesRequest,
  output: RenameProjectsLocationsCatalogsDatabasesTablesResponse,
  errors: [],
}));

/** Gets the table specified by the resource name. */
export interface GetProjectsLocationsCatalogsDatabasesTablesRequest {
  /** Required. The name of the table to retrieve. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id}/tables/{table_id} */
  name: string;
}

export const GetProjectsLocationsCatalogsDatabasesTablesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/databases/{databasesId}/tables/{tablesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCatalogsDatabasesTablesRequest>;

export type GetProjectsLocationsCatalogsDatabasesTablesResponse = Table;
export const GetProjectsLocationsCatalogsDatabasesTablesResponse = Table;

export type GetProjectsLocationsCatalogsDatabasesTablesError = CommonErrors;

export const getProjectsLocationsCatalogsDatabasesTables: API.OperationMethod<GetProjectsLocationsCatalogsDatabasesTablesRequest, GetProjectsLocationsCatalogsDatabasesTablesResponse, GetProjectsLocationsCatalogsDatabasesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCatalogsDatabasesTablesRequest,
  output: GetProjectsLocationsCatalogsDatabasesTablesResponse,
  errors: [],
}));

/** Updates an existing table specified by the table ID. */
export interface PatchProjectsLocationsCatalogsDatabasesTablesRequest {
  /** Output only. The resource name. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id}/tables/{table_id} */
  name: string;
  /** The list of fields to update. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask If not set, defaults to all of the fields that are allowed to update. */
  updateMask?: string;
  /** Request body */
  body?: Table;
}

export const PatchProjectsLocationsCatalogsDatabasesTablesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Table).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/databases/{databasesId}/tables/{tablesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCatalogsDatabasesTablesRequest>;

export type PatchProjectsLocationsCatalogsDatabasesTablesResponse = Table;
export const PatchProjectsLocationsCatalogsDatabasesTablesResponse = Table;

export type PatchProjectsLocationsCatalogsDatabasesTablesError = CommonErrors;

export const patchProjectsLocationsCatalogsDatabasesTables: API.OperationMethod<PatchProjectsLocationsCatalogsDatabasesTablesRequest, PatchProjectsLocationsCatalogsDatabasesTablesResponse, PatchProjectsLocationsCatalogsDatabasesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCatalogsDatabasesTablesRequest,
  output: PatchProjectsLocationsCatalogsDatabasesTablesResponse,
  errors: [],
}));

/** Creates a new table. */
export interface CreateProjectsLocationsCatalogsDatabasesTablesRequest {
  /** Required. The ID to use for the table, which will become the final component of the table's resource name. */
  tableId?: string;
  /** Required. The parent resource where this table will be created. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id} */
  parent: string;
  /** Request body */
  body?: Table;
}

export const CreateProjectsLocationsCatalogsDatabasesTablesRequest = Schema.Struct({
  tableId: Schema.optional(Schema.String).pipe(T.HttpQuery("tableId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Table).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/databases/{databasesId}/tables", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCatalogsDatabasesTablesRequest>;

export type CreateProjectsLocationsCatalogsDatabasesTablesResponse = Table;
export const CreateProjectsLocationsCatalogsDatabasesTablesResponse = Table;

export type CreateProjectsLocationsCatalogsDatabasesTablesError = CommonErrors;

export const createProjectsLocationsCatalogsDatabasesTables: API.OperationMethod<CreateProjectsLocationsCatalogsDatabasesTablesRequest, CreateProjectsLocationsCatalogsDatabasesTablesResponse, CreateProjectsLocationsCatalogsDatabasesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCatalogsDatabasesTablesRequest,
  output: CreateProjectsLocationsCatalogsDatabasesTablesResponse,
  errors: [],
}));

/** Deletes an existing table specified by the table ID. */
export interface DeleteProjectsLocationsCatalogsDatabasesTablesRequest {
  /** Required. The name of the table to delete. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id}/tables/{table_id} */
  name: string;
}

export const DeleteProjectsLocationsCatalogsDatabasesTablesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/databases/{databasesId}/tables/{tablesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsCatalogsDatabasesTablesRequest>;

export type DeleteProjectsLocationsCatalogsDatabasesTablesResponse = Table;
export const DeleteProjectsLocationsCatalogsDatabasesTablesResponse = Table;

export type DeleteProjectsLocationsCatalogsDatabasesTablesError = CommonErrors;

export const deleteProjectsLocationsCatalogsDatabasesTables: API.OperationMethod<DeleteProjectsLocationsCatalogsDatabasesTablesRequest, DeleteProjectsLocationsCatalogsDatabasesTablesResponse, DeleteProjectsLocationsCatalogsDatabasesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsCatalogsDatabasesTablesRequest,
  output: DeleteProjectsLocationsCatalogsDatabasesTablesResponse,
  errors: [],
}));

/** List all tables in a specified database. */
export interface ListProjectsLocationsCatalogsDatabasesTablesRequest {
  /** Required. The parent, which owns this collection of tables. Format: projects/{project_id_or_number}/locations/{location_id}/catalogs/{catalog_id}/databases/{database_id} */
  parent: string;
  /** The view for the returned tables. */
  view?: "TABLE_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** The maximum number of tables to return. The service may return fewer than this value. If unspecified, at most 50 tables will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListTables` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTables` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsCatalogsDatabasesTablesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/databases/{databasesId}/tables" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCatalogsDatabasesTablesRequest>;

export type ListProjectsLocationsCatalogsDatabasesTablesResponse = ListTablesResponse;
export const ListProjectsLocationsCatalogsDatabasesTablesResponse = ListTablesResponse;

export type ListProjectsLocationsCatalogsDatabasesTablesError = CommonErrors;

export const listProjectsLocationsCatalogsDatabasesTables = API.makePaginated(() => ({
  input: ListProjectsLocationsCatalogsDatabasesTablesRequest,
  output: ListProjectsLocationsCatalogsDatabasesTablesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

