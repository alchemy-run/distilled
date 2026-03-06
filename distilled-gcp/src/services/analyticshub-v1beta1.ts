// ==========================================================================
// Analytics Hub API (analyticshub v1beta1)
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
  name: "analyticshub",
  version: "v1beta1",
  rootUrl: "https://analyticshub.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface DataExchange {
  /** Output only. The resource name of the data exchange. e.g. `projects/myproject/locations/us/dataExchanges/123`. */
  name?: string;
  /** Required. Human-readable display name of the data exchange. The display name must contain only Unicode letters, numbers (0-9), underscores (_), dashes (-), spaces ( ), ampersands (&) and must not start or end with spaces. Default value is an empty string. Max length: 63 bytes. */
  displayName?: string;
  /** Optional. Description of the data exchange. The description must not contain Unicode non-characters as well as C0 and C1 control codes except tabs (HT), new lines (LF), carriage returns (CR), and page breaks (FF). Default value is an empty string. Max length: 2000 bytes. */
  description?: string;
  /** Optional. Email or URL of the primary point of contact of the data exchange. Max Length: 1000 bytes. */
  primaryContact?: string;
  /** Optional. Documentation describing the data exchange. */
  documentation?: string;
  /** Output only. Number of listings contained in the data exchange. */
  listingCount?: number;
  /** Optional. Base64 encoded image representing the data exchange. Max Size: 3.0MiB Expected image dimensions are 512x512 pixels, however the API only performs validation on size of the encoded data. Note: For byte fields, the content of the fields are base64-encoded (which increases the size of the data by 33-36%) when using JSON on the wire. */
  icon?: string;
}

export const DataExchange: Schema.Schema<DataExchange> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  primaryContact: Schema.optional(Schema.String),
  documentation: Schema.optional(Schema.String),
  listingCount: Schema.optional(Schema.Number),
  icon: Schema.optional(Schema.String),
})).annotate({ identifier: "DataExchange" }) as any as Schema.Schema<DataExchange>;

export interface ListDataExchangesResponse {
  /** The list of data exchanges. */
  dataExchanges?: Array<DataExchange>;
  /** A token to request the next page of results. */
  nextPageToken?: string;
}

export const ListDataExchangesResponse: Schema.Schema<ListDataExchangesResponse> = Schema.suspend(() => Schema.Struct({
  dataExchanges: Schema.optional(Schema.Array(DataExchange)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDataExchangesResponse" }) as any as Schema.Schema<ListDataExchangesResponse>;

export interface ListOrgDataExchangesResponse {
  /** The list of data exchanges. */
  dataExchanges?: Array<DataExchange>;
  /** A token to request the next page of results. */
  nextPageToken?: string;
}

export const ListOrgDataExchangesResponse: Schema.Schema<ListOrgDataExchangesResponse> = Schema.suspend(() => Schema.Struct({
  dataExchanges: Schema.optional(Schema.Array(DataExchange)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListOrgDataExchangesResponse" }) as any as Schema.Schema<ListOrgDataExchangesResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface BigQueryDatasetSource {
  /** Resource name of the dataset source for this listing. e.g. `projects/myproject/datasets/123` */
  dataset?: string;
}

export const BigQueryDatasetSource: Schema.Schema<BigQueryDatasetSource> = Schema.suspend(() => Schema.Struct({
  dataset: Schema.optional(Schema.String),
})).annotate({ identifier: "BigQueryDatasetSource" }) as any as Schema.Schema<BigQueryDatasetSource>;

export interface DataProvider {
  /** Optional. Name of the data provider. */
  name?: string;
  /** Optional. Email or URL of the data provider. Max Length: 1000 bytes. */
  primaryContact?: string;
}

export const DataProvider: Schema.Schema<DataProvider> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  primaryContact: Schema.optional(Schema.String),
})).annotate({ identifier: "DataProvider" }) as any as Schema.Schema<DataProvider>;

export interface Publisher {
  /** Optional. Name of the listing publisher. */
  name?: string;
  /** Optional. Email or URL of the listing publisher. Max Length: 1000 bytes. */
  primaryContact?: string;
}

export const Publisher: Schema.Schema<Publisher> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  primaryContact: Schema.optional(Schema.String),
})).annotate({ identifier: "Publisher" }) as any as Schema.Schema<Publisher>;

export interface RestrictedExportConfig {
  /** Optional. If true, enable restricted export. */
  enabled?: boolean;
  /** Output only. If true, restrict direct table access(read api/tabledata.list) on linked table. */
  restrictDirectTableAccess?: boolean;
  /** Optional. If true, restrict export of query result derived from restricted linked dataset table. */
  restrictQueryResult?: boolean;
}

export const RestrictedExportConfig: Schema.Schema<RestrictedExportConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  restrictDirectTableAccess: Schema.optional(Schema.Boolean),
  restrictQueryResult: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RestrictedExportConfig" }) as any as Schema.Schema<RestrictedExportConfig>;

export interface Listing {
  /** Required. Shared dataset i.e. BigQuery dataset source. */
  bigqueryDataset?: BigQueryDatasetSource;
  /** Output only. The resource name of the listing. e.g. `projects/myproject/locations/us/dataExchanges/123/listings/456` */
  name?: string;
  /** Required. Human-readable display name of the listing. The display name must contain only Unicode letters, numbers (0-9), underscores (_), dashes (-), spaces ( ), ampersands (&) and can't start or end with spaces. Default value is an empty string. Max length: 63 bytes. */
  displayName?: string;
  /** Optional. Short description of the listing. The description must not contain Unicode non-characters and C0 and C1 control codes except tabs (HT), new lines (LF), carriage returns (CR), and page breaks (FF). Default value is an empty string. Max length: 2000 bytes. */
  description?: string;
  /** Optional. Email or URL of the primary point of contact of the listing. Max Length: 1000 bytes. */
  primaryContact?: string;
  /** Optional. Documentation describing the listing. */
  documentation?: string;
  /** Output only. Current state of the listing. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | (string & {});
  /** Optional. Base64 encoded image representing the listing. Max Size: 3.0MiB Expected image dimensions are 512x512 pixels, however the API only performs validation on size of the encoded data. Note: For byte fields, the contents of the field are base64-encoded (which increases the size of the data by 33-36%) when using JSON on the wire. */
  icon?: string;
  /** Optional. Details of the data provider who owns the source data. */
  dataProvider?: DataProvider;
  /** Optional. Categories of the listing. Up to five categories are allowed. */
  categories?: Array<"CATEGORY_UNSPECIFIED" | "CATEGORY_OTHERS" | "CATEGORY_ADVERTISING_AND_MARKETING" | "CATEGORY_COMMERCE" | "CATEGORY_CLIMATE_AND_ENVIRONMENT" | "CATEGORY_DEMOGRAPHICS" | "CATEGORY_ECONOMICS" | "CATEGORY_EDUCATION" | "CATEGORY_ENERGY" | "CATEGORY_FINANCIAL" | "CATEGORY_GAMING" | "CATEGORY_GEOSPATIAL" | "CATEGORY_HEALTHCARE_AND_LIFE_SCIENCE" | "CATEGORY_MEDIA" | "CATEGORY_PUBLIC_SECTOR" | "CATEGORY_RETAIL" | "CATEGORY_SPORTS" | "CATEGORY_SCIENCE_AND_RESEARCH" | "CATEGORY_TRANSPORTATION_AND_LOGISTICS" | "CATEGORY_TRAVEL_AND_TOURISM" | "CATEGORY_GOOGLE_EARTH_ENGINE" | (string & {})>;
  /** Optional. Details of the publisher who owns the listing and who can share the source data. */
  publisher?: Publisher;
  /** Optional. Email or URL of the request access of the listing. Subscribers can use this reference to request access. Max Length: 1000 bytes. */
  requestAccess?: string;
  /** Optional. If set, restricted export configuration will be propagated and enforced on the linked dataset. This is a required field for data clean room exchanges. */
  restrictedExportConfig?: RestrictedExportConfig;
  /** Optional. If true, the listing is only available to get the resource metadata. Listing is non subscribable. */
  allowOnlyMetadataSharing?: boolean;
}

export const Listing: Schema.Schema<Listing> = Schema.suspend(() => Schema.Struct({
  bigqueryDataset: Schema.optional(BigQueryDatasetSource),
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  primaryContact: Schema.optional(Schema.String),
  documentation: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  icon: Schema.optional(Schema.String),
  dataProvider: Schema.optional(DataProvider),
  categories: Schema.optional(Schema.Array(Schema.String)),
  publisher: Schema.optional(Publisher),
  requestAccess: Schema.optional(Schema.String),
  restrictedExportConfig: Schema.optional(RestrictedExportConfig),
  allowOnlyMetadataSharing: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Listing" }) as any as Schema.Schema<Listing>;

export interface ListListingsResponse {
  /** The list of Listing. */
  listings?: Array<Listing>;
  /** A token to request the next page of results. */
  nextPageToken?: string;
}

export const ListListingsResponse: Schema.Schema<ListListingsResponse> = Schema.suspend(() => Schema.Struct({
  listings: Schema.optional(Schema.Array(Listing)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListListingsResponse" }) as any as Schema.Schema<ListListingsResponse>;

export interface GoogleCloudBigqueryDataexchangeV1beta1DestinationDatasetReference {
  /** Required. A unique ID for this dataset, without the project name. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters. */
  datasetId?: string;
  /** Required. The ID of the project containing this dataset. */
  projectId?: string;
}

export const GoogleCloudBigqueryDataexchangeV1beta1DestinationDatasetReference: Schema.Schema<GoogleCloudBigqueryDataexchangeV1beta1DestinationDatasetReference> = Schema.suspend(() => Schema.Struct({
  datasetId: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBigqueryDataexchangeV1beta1DestinationDatasetReference" }) as any as Schema.Schema<GoogleCloudBigqueryDataexchangeV1beta1DestinationDatasetReference>;

export interface GoogleCloudBigqueryDataexchangeV1beta1DestinationDataset {
  /** Required. A reference that identifies the destination dataset. */
  datasetReference?: GoogleCloudBigqueryDataexchangeV1beta1DestinationDatasetReference;
  /** Optional. A descriptive name for the dataset. */
  friendlyName?: string;
  /** Optional. A user-friendly description of the dataset. */
  description?: string;
  /** Optional. The labels associated with this dataset. You can use these to organize and group your datasets. You can set this property when inserting or updating a dataset. See https://cloud.google.com/resource-manager/docs/creating-managing-labels for more information. */
  labels?: Record<string, string>;
  /** Required. The geographic location where the dataset should reside. See https://cloud.google.com/bigquery/docs/locations for supported locations. */
  location?: string;
}

export const GoogleCloudBigqueryDataexchangeV1beta1DestinationDataset: Schema.Schema<GoogleCloudBigqueryDataexchangeV1beta1DestinationDataset> = Schema.suspend(() => Schema.Struct({
  datasetReference: Schema.optional(GoogleCloudBigqueryDataexchangeV1beta1DestinationDatasetReference),
  friendlyName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBigqueryDataexchangeV1beta1DestinationDataset" }) as any as Schema.Schema<GoogleCloudBigqueryDataexchangeV1beta1DestinationDataset>;

export interface SubscribeListingRequest {
  /** BigQuery destination dataset to create for the subscriber. */
  destinationDataset?: GoogleCloudBigqueryDataexchangeV1beta1DestinationDataset;
}

export const SubscribeListingRequest: Schema.Schema<SubscribeListingRequest> = Schema.suspend(() => Schema.Struct({
  destinationDataset: Schema.optional(GoogleCloudBigqueryDataexchangeV1beta1DestinationDataset),
})).annotate({ identifier: "SubscribeListingRequest" }) as any as Schema.Schema<SubscribeListingRequest>;

export interface SubscribeListingResponse {
}

export const SubscribeListingResponse: Schema.Schema<SubscribeListingResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SubscribeListingResponse" }) as any as Schema.Schema<SubscribeListingResponse>;

export interface GetPolicyOptions {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  requestedPolicyVersion?: number;
}

export const GetPolicyOptions: Schema.Schema<GetPolicyOptions> = Schema.suspend(() => Schema.Struct({
  requestedPolicyVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "GetPolicyOptions" }) as any as Schema.Schema<GetPolicyOptions>;

export interface GetIamPolicyRequest {
  /** OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. */
  options?: GetPolicyOptions;
}

export const GetIamPolicyRequest: Schema.Schema<GetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  options: Schema.optional(GetPolicyOptions),
})).annotate({ identifier: "GetIamPolicyRequest" }) as any as Schema.Schema<GetIamPolicyRequest>;

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

export interface LinkedResource {
  /** Output only. Name of the linked dataset, e.g. projects/subscriberproject/datasets/linked_dataset */
  linkedDataset?: string;
  /** Output only. Name of the Pub/Sub subscription, e.g. projects/subscriberproject/subscriptions/subscriptions/sub_id */
  linkedPubsubSubscription?: string;
  /** Output only. Listing for which linked resource is created. */
  listing?: string;
}

export const LinkedResource: Schema.Schema<LinkedResource> = Schema.suspend(() => Schema.Struct({
  linkedDataset: Schema.optional(Schema.String),
  linkedPubsubSubscription: Schema.optional(Schema.String),
  listing: Schema.optional(Schema.String),
})).annotate({ identifier: "LinkedResource" }) as any as Schema.Schema<LinkedResource>;

export interface GoogleCloudMarketplaceInfo {
  /** Resource name of the Marketplace Order. */
  order?: string;
}

export const GoogleCloudMarketplaceInfo: Schema.Schema<GoogleCloudMarketplaceInfo> = Schema.suspend(() => Schema.Struct({
  order: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudMarketplaceInfo" }) as any as Schema.Schema<GoogleCloudMarketplaceInfo>;

export interface CommercialInfo {
  /** Output only. This is set when the subscription is commercialised via Cloud Marketplace. */
  cloudMarketplace?: GoogleCloudMarketplaceInfo;
}

export const CommercialInfo: Schema.Schema<CommercialInfo> = Schema.suspend(() => Schema.Struct({
  cloudMarketplace: Schema.optional(GoogleCloudMarketplaceInfo),
})).annotate({ identifier: "CommercialInfo" }) as any as Schema.Schema<CommercialInfo>;

export interface DestinationDatasetReference {
  /** Required. A unique ID for this dataset, without the project name. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters. */
  datasetId?: string;
  /** Required. The ID of the project containing this dataset. */
  projectId?: string;
}

export const DestinationDatasetReference: Schema.Schema<DestinationDatasetReference> = Schema.suspend(() => Schema.Struct({
  datasetId: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "DestinationDatasetReference" }) as any as Schema.Schema<DestinationDatasetReference>;

export interface DestinationDataset {
  /** Required. A reference that identifies the destination dataset. */
  datasetReference?: DestinationDatasetReference;
  /** Optional. A descriptive name for the dataset. */
  friendlyName?: string;
  /** Optional. A user-friendly description of the dataset. */
  description?: string;
  /** Optional. The labels associated with this dataset. You can use these to organize and group your datasets. You can set this property when inserting or updating a dataset. See https://cloud.google.com/resource-manager/docs/creating-managing-labels for more information. */
  labels?: Record<string, string>;
  /** Required. The geographic location where the dataset should reside. See https://cloud.google.com/bigquery/docs/locations for supported locations. */
  location?: string;
  /** Optional. The geographic locations where the dataset should be replicated. See [BigQuery locations](https://cloud.google.com/bigquery/docs/locations) for supported locations. */
  replicaLocations?: Array<string>;
}

export const DestinationDataset: Schema.Schema<DestinationDataset> = Schema.suspend(() => Schema.Struct({
  datasetReference: Schema.optional(DestinationDatasetReference),
  friendlyName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.optional(Schema.String),
  replicaLocations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DestinationDataset" }) as any as Schema.Schema<DestinationDataset>;

export interface Subscription {
  /** Output only. Resource name of the source Listing. e.g. projects/123/locations/us/dataExchanges/456/listings/789 */
  listing?: string;
  /** Output only. Resource name of the source Data Exchange. e.g. projects/123/locations/us/dataExchanges/456 */
  dataExchange?: string;
  /** Output only. The resource name of the subscription. e.g. `projects/myproject/locations/us/subscriptions/123`. */
  name?: string;
  /** Output only. Timestamp when the subscription was created. */
  creationTime?: string;
  /** Output only. Timestamp when the subscription was last modified. */
  lastModifyTime?: string;
  /** Output only. Organization of the project this subscription belongs to. */
  organizationId?: string;
  /** Output only. Display name of the project of this subscription. */
  organizationDisplayName?: string;
  /** Output only. Current state of the subscription. */
  state?: "STATE_UNSPECIFIED" | "STATE_ACTIVE" | "STATE_STALE" | "STATE_INACTIVE" | (string & {});
  /** Output only. Map of listing resource names to associated linked resource, e.g. projects/123/locations/us/dataExchanges/456/listings/789 -> projects/123/datasets/my_dataset For listing-level subscriptions, this is a map of size 1. Only contains values if state == STATE_ACTIVE. */
  linkedDatasetMap?: Record<string, LinkedResource>;
  /** Output only. Email of the subscriber. */
  subscriberContact?: string;
  /** Output only. Linked resources created in the subscription. Only contains values if state = STATE_ACTIVE. */
  linkedResources?: Array<LinkedResource>;
  /** Output only. Listing shared asset type. */
  resourceType?: "SHARED_RESOURCE_TYPE_UNSPECIFIED" | "BIGQUERY_DATASET" | "PUBSUB_TOPIC" | (string & {});
  /** Output only. This is set if this is a commercial subscription i.e. if this subscription was created from subscribing to a commercial listing. */
  commercialInfo?: CommercialInfo;
  /** Output only. By default, false. If true, the Subscriber agreed to the email sharing mandate that is enabled for DataExchange/Listing. */
  logLinkedDatasetQueryUserEmail?: boolean;
  /** Optional. BigQuery destination dataset to create for the subscriber. */
  destinationDataset?: DestinationDataset;
}

export const Subscription: Schema.Schema<Subscription> = Schema.suspend(() => Schema.Struct({
  listing: Schema.optional(Schema.String),
  dataExchange: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  lastModifyTime: Schema.optional(Schema.String),
  organizationId: Schema.optional(Schema.String),
  organizationDisplayName: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  linkedDatasetMap: Schema.optional(Schema.Record(Schema.String, LinkedResource)),
  subscriberContact: Schema.optional(Schema.String),
  linkedResources: Schema.optional(Schema.Array(LinkedResource)),
  resourceType: Schema.optional(Schema.String),
  commercialInfo: Schema.optional(CommercialInfo),
  logLinkedDatasetQueryUserEmail: Schema.optional(Schema.Boolean),
  destinationDataset: Schema.optional(DestinationDataset),
})).annotate({ identifier: "Subscription" }) as any as Schema.Schema<Subscription>;

export interface SubscribeDataExchangeResponse {
  /** Subscription object created from this subscribe action. */
  subscription?: Subscription;
}

export const SubscribeDataExchangeResponse: Schema.Schema<SubscribeDataExchangeResponse> = Schema.suspend(() => Schema.Struct({
  subscription: Schema.optional(Subscription),
})).annotate({ identifier: "SubscribeDataExchangeResponse" }) as any as Schema.Schema<SubscribeDataExchangeResponse>;

export interface RefreshSubscriptionResponse {
  /** The refreshed subscription resource. */
  subscription?: Subscription;
}

export const RefreshSubscriptionResponse: Schema.Schema<RefreshSubscriptionResponse> = Schema.suspend(() => Schema.Struct({
  subscription: Schema.optional(Subscription),
})).annotate({ identifier: "RefreshSubscriptionResponse" }) as any as Schema.Schema<RefreshSubscriptionResponse>;

export interface OperationMetadata {
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

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListProjectsLocationsDataExchangesRequest {
  /** Required. The parent resource path of the data exchanges. e.g. `projects/myproject/locations/us`. */
  parent: string;
  /** The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. */
  pageSize?: number;
  /** Page token, returned by a previous call, to request the next page of results. */
  pageToken?: string;
}

export const ListProjectsLocationsDataExchangesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/dataExchanges" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDataExchangesRequest>;

export type ListProjectsLocationsDataExchangesResponse = ListDataExchangesResponse;
export const ListProjectsLocationsDataExchangesResponse = ListDataExchangesResponse;

export type ListProjectsLocationsDataExchangesError = CommonErrors;

/** Lists all data exchanges in a given project and location. */
export const listProjectsLocationsDataExchanges: API.PaginatedOperationMethod<ListProjectsLocationsDataExchangesRequest, ListProjectsLocationsDataExchangesResponse, ListProjectsLocationsDataExchangesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsDataExchangesRequest,
  output: ListProjectsLocationsDataExchangesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsDataExchangesRequest {
  /** Required. The resource name of the data exchange. e.g. `projects/myproject/locations/us/dataExchanges/123`. */
  name: string;
}

export const GetProjectsLocationsDataExchangesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDataExchangesRequest>;

export type GetProjectsLocationsDataExchangesResponse = DataExchange;
export const GetProjectsLocationsDataExchangesResponse = DataExchange;

export type GetProjectsLocationsDataExchangesError = CommonErrors;

/** Gets the details of a data exchange. */
export const getProjectsLocationsDataExchanges: API.OperationMethod<GetProjectsLocationsDataExchangesRequest, GetProjectsLocationsDataExchangesResponse, GetProjectsLocationsDataExchangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDataExchangesRequest,
  output: GetProjectsLocationsDataExchangesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsDataExchangesRequest {
  /** Required. The parent resource path of the data exchange. e.g. `projects/myproject/locations/us`. */
  parent: string;
  /** Required. The ID of the data exchange. Must contain only Unicode letters, numbers (0-9), underscores (_). Should not use characters that require URL-escaping, or characters outside of ASCII, spaces. Max length: 100 bytes. */
  dataExchangeId?: string;
  /** Request body */
  body?: DataExchange;
}

export const CreateProjectsLocationsDataExchangesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dataExchangeId: Schema.optional(Schema.String).pipe(T.HttpQuery("dataExchangeId")),
  body: Schema.optional(DataExchange).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/dataExchanges", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDataExchangesRequest>;

export type CreateProjectsLocationsDataExchangesResponse = DataExchange;
export const CreateProjectsLocationsDataExchangesResponse = DataExchange;

export type CreateProjectsLocationsDataExchangesError = CommonErrors;

/** Creates a new data exchange. */
export const createProjectsLocationsDataExchanges: API.OperationMethod<CreateProjectsLocationsDataExchangesRequest, CreateProjectsLocationsDataExchangesResponse, CreateProjectsLocationsDataExchangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDataExchangesRequest,
  output: CreateProjectsLocationsDataExchangesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsDataExchangesRequest {
  /** Output only. The resource name of the data exchange. e.g. `projects/myproject/locations/us/dataExchanges/123`. */
  name: string;
  /** Required. Field mask specifies the fields to update in the data exchange resource. The fields specified in the `updateMask` are relative to the resource and are not a full request. */
  updateMask?: string;
  /** Request body */
  body?: DataExchange;
}

export const PatchProjectsLocationsDataExchangesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(DataExchange).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDataExchangesRequest>;

export type PatchProjectsLocationsDataExchangesResponse = DataExchange;
export const PatchProjectsLocationsDataExchangesResponse = DataExchange;

export type PatchProjectsLocationsDataExchangesError = CommonErrors;

/** Updates an existing data exchange. */
export const patchProjectsLocationsDataExchanges: API.OperationMethod<PatchProjectsLocationsDataExchangesRequest, PatchProjectsLocationsDataExchangesResponse, PatchProjectsLocationsDataExchangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDataExchangesRequest,
  output: PatchProjectsLocationsDataExchangesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsDataExchangesRequest {
  /** Required. The full name of the data exchange resource that you want to delete. For example, `projects/myproject/locations/us/dataExchanges/123`. */
  name: string;
}

export const DeleteProjectsLocationsDataExchangesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDataExchangesRequest>;

export type DeleteProjectsLocationsDataExchangesResponse = Empty;
export const DeleteProjectsLocationsDataExchangesResponse = Empty;

export type DeleteProjectsLocationsDataExchangesError = CommonErrors;

/** Deletes an existing data exchange. */
export const deleteProjectsLocationsDataExchanges: API.OperationMethod<DeleteProjectsLocationsDataExchangesRequest, DeleteProjectsLocationsDataExchangesResponse, DeleteProjectsLocationsDataExchangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDataExchangesRequest,
  output: DeleteProjectsLocationsDataExchangesResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsDataExchangesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsLocationsDataExchangesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsDataExchangesRequest>;

export type GetIamPolicyProjectsLocationsDataExchangesResponse = Policy;
export const GetIamPolicyProjectsLocationsDataExchangesResponse = Policy;

export type GetIamPolicyProjectsLocationsDataExchangesError = CommonErrors;

/** Gets the IAM policy. */
export const getIamPolicyProjectsLocationsDataExchanges: API.OperationMethod<GetIamPolicyProjectsLocationsDataExchangesRequest, GetIamPolicyProjectsLocationsDataExchangesResponse, GetIamPolicyProjectsLocationsDataExchangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsDataExchangesRequest,
  output: GetIamPolicyProjectsLocationsDataExchangesResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsDataExchangesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsDataExchangesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsDataExchangesRequest>;

export type SetIamPolicyProjectsLocationsDataExchangesResponse = Policy;
export const SetIamPolicyProjectsLocationsDataExchangesResponse = Policy;

export type SetIamPolicyProjectsLocationsDataExchangesError = CommonErrors;

/** Sets the IAM policy. */
export const setIamPolicyProjectsLocationsDataExchanges: API.OperationMethod<SetIamPolicyProjectsLocationsDataExchangesRequest, SetIamPolicyProjectsLocationsDataExchangesResponse, SetIamPolicyProjectsLocationsDataExchangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsDataExchangesRequest,
  output: SetIamPolicyProjectsLocationsDataExchangesResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsDataExchangesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsDataExchangesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsDataExchangesRequest>;

export type TestIamPermissionsProjectsLocationsDataExchangesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsDataExchangesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsDataExchangesError = CommonErrors;

/** Returns the permissions that a caller has. */
export const testIamPermissionsProjectsLocationsDataExchanges: API.OperationMethod<TestIamPermissionsProjectsLocationsDataExchangesRequest, TestIamPermissionsProjectsLocationsDataExchangesResponse, TestIamPermissionsProjectsLocationsDataExchangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsDataExchangesRequest,
  output: TestIamPermissionsProjectsLocationsDataExchangesResponse,
  errors: [],
}));

export interface ListProjectsLocationsDataExchangesListingsRequest {
  /** Required. The parent resource path of the listing. e.g. `projects/myproject/locations/us/dataExchanges/123`. */
  parent: string;
  /** The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. */
  pageSize?: number;
  /** Page token, returned by a previous call, to request the next page of results. */
  pageToken?: string;
}

export const ListProjectsLocationsDataExchangesListingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/listings" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDataExchangesListingsRequest>;

export type ListProjectsLocationsDataExchangesListingsResponse = ListListingsResponse;
export const ListProjectsLocationsDataExchangesListingsResponse = ListListingsResponse;

export type ListProjectsLocationsDataExchangesListingsError = CommonErrors;

/** Lists all listings in a given project and location. */
export const listProjectsLocationsDataExchangesListings: API.PaginatedOperationMethod<ListProjectsLocationsDataExchangesListingsRequest, ListProjectsLocationsDataExchangesListingsResponse, ListProjectsLocationsDataExchangesListingsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsDataExchangesListingsRequest,
  output: ListProjectsLocationsDataExchangesListingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsDataExchangesListingsRequest {
  /** Required. The resource name of the listing. e.g. `projects/myproject/locations/us/dataExchanges/123/listings/456`. */
  name: string;
}

export const GetProjectsLocationsDataExchangesListingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/listings/{listingsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDataExchangesListingsRequest>;

export type GetProjectsLocationsDataExchangesListingsResponse = Listing;
export const GetProjectsLocationsDataExchangesListingsResponse = Listing;

export type GetProjectsLocationsDataExchangesListingsError = CommonErrors;

/** Gets the details of a listing. */
export const getProjectsLocationsDataExchangesListings: API.OperationMethod<GetProjectsLocationsDataExchangesListingsRequest, GetProjectsLocationsDataExchangesListingsResponse, GetProjectsLocationsDataExchangesListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDataExchangesListingsRequest,
  output: GetProjectsLocationsDataExchangesListingsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsDataExchangesListingsRequest {
  /** Required. The parent resource path of the listing. e.g. `projects/myproject/locations/us/dataExchanges/123`. */
  parent: string;
  /** Required. The ID of the listing to create. Must contain only Unicode letters, numbers (0-9), underscores (_). Should not use characters that require URL-escaping, or characters outside of ASCII, spaces. Max length: 100 bytes. */
  listingId?: string;
  /** Request body */
  body?: Listing;
}

export const CreateProjectsLocationsDataExchangesListingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  listingId: Schema.optional(Schema.String).pipe(T.HttpQuery("listingId")),
  body: Schema.optional(Listing).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/listings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDataExchangesListingsRequest>;

export type CreateProjectsLocationsDataExchangesListingsResponse = Listing;
export const CreateProjectsLocationsDataExchangesListingsResponse = Listing;

export type CreateProjectsLocationsDataExchangesListingsError = CommonErrors;

/** Creates a new listing. */
export const createProjectsLocationsDataExchangesListings: API.OperationMethod<CreateProjectsLocationsDataExchangesListingsRequest, CreateProjectsLocationsDataExchangesListingsResponse, CreateProjectsLocationsDataExchangesListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDataExchangesListingsRequest,
  output: CreateProjectsLocationsDataExchangesListingsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsDataExchangesListingsRequest {
  /** Output only. The resource name of the listing. e.g. `projects/myproject/locations/us/dataExchanges/123/listings/456` */
  name: string;
  /** Required. Field mask specifies the fields to update in the listing resource. The fields specified in the `updateMask` are relative to the resource and are not a full request. */
  updateMask?: string;
  /** Request body */
  body?: Listing;
}

export const PatchProjectsLocationsDataExchangesListingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Listing).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/listings/{listingsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDataExchangesListingsRequest>;

export type PatchProjectsLocationsDataExchangesListingsResponse = Listing;
export const PatchProjectsLocationsDataExchangesListingsResponse = Listing;

export type PatchProjectsLocationsDataExchangesListingsError = CommonErrors;

/** Updates an existing listing. */
export const patchProjectsLocationsDataExchangesListings: API.OperationMethod<PatchProjectsLocationsDataExchangesListingsRequest, PatchProjectsLocationsDataExchangesListingsResponse, PatchProjectsLocationsDataExchangesListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDataExchangesListingsRequest,
  output: PatchProjectsLocationsDataExchangesListingsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsDataExchangesListingsRequest {
  /** Required. Resource name of the listing to delete. e.g. `projects/myproject/locations/us/dataExchanges/123/listings/456`. */
  name: string;
}

export const DeleteProjectsLocationsDataExchangesListingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/listings/{listingsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDataExchangesListingsRequest>;

export type DeleteProjectsLocationsDataExchangesListingsResponse = Empty;
export const DeleteProjectsLocationsDataExchangesListingsResponse = Empty;

export type DeleteProjectsLocationsDataExchangesListingsError = CommonErrors;

/** Deletes a listing. */
export const deleteProjectsLocationsDataExchangesListings: API.OperationMethod<DeleteProjectsLocationsDataExchangesListingsRequest, DeleteProjectsLocationsDataExchangesListingsResponse, DeleteProjectsLocationsDataExchangesListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDataExchangesListingsRequest,
  output: DeleteProjectsLocationsDataExchangesListingsResponse,
  errors: [],
}));

export interface SubscribeProjectsLocationsDataExchangesListingsRequest {
  /** Required. Resource name of the listing that you want to subscribe to. e.g. `projects/myproject/locations/us/dataExchanges/123/listings/456`. */
  name: string;
  /** Request body */
  body?: SubscribeListingRequest;
}

export const SubscribeProjectsLocationsDataExchangesListingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SubscribeListingRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/listings/{listingsId}:subscribe", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SubscribeProjectsLocationsDataExchangesListingsRequest>;

export type SubscribeProjectsLocationsDataExchangesListingsResponse = SubscribeListingResponse;
export const SubscribeProjectsLocationsDataExchangesListingsResponse = SubscribeListingResponse;

export type SubscribeProjectsLocationsDataExchangesListingsError = CommonErrors;

/** Subscribes to a listing. Currently, with Analytics Hub, you can create listings that reference only BigQuery datasets. Upon subscription to a listing for a BigQuery dataset, Analytics Hub creates a linked dataset in the subscriber's project. */
export const subscribeProjectsLocationsDataExchangesListings: API.OperationMethod<SubscribeProjectsLocationsDataExchangesListingsRequest, SubscribeProjectsLocationsDataExchangesListingsResponse, SubscribeProjectsLocationsDataExchangesListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SubscribeProjectsLocationsDataExchangesListingsRequest,
  output: SubscribeProjectsLocationsDataExchangesListingsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsDataExchangesListingsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsLocationsDataExchangesListingsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/listings/{listingsId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsDataExchangesListingsRequest>;

export type GetIamPolicyProjectsLocationsDataExchangesListingsResponse = Policy;
export const GetIamPolicyProjectsLocationsDataExchangesListingsResponse = Policy;

export type GetIamPolicyProjectsLocationsDataExchangesListingsError = CommonErrors;

/** Gets the IAM policy. */
export const getIamPolicyProjectsLocationsDataExchangesListings: API.OperationMethod<GetIamPolicyProjectsLocationsDataExchangesListingsRequest, GetIamPolicyProjectsLocationsDataExchangesListingsResponse, GetIamPolicyProjectsLocationsDataExchangesListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsDataExchangesListingsRequest,
  output: GetIamPolicyProjectsLocationsDataExchangesListingsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsDataExchangesListingsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsDataExchangesListingsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/listings/{listingsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsDataExchangesListingsRequest>;

export type SetIamPolicyProjectsLocationsDataExchangesListingsResponse = Policy;
export const SetIamPolicyProjectsLocationsDataExchangesListingsResponse = Policy;

export type SetIamPolicyProjectsLocationsDataExchangesListingsError = CommonErrors;

/** Sets the IAM policy. */
export const setIamPolicyProjectsLocationsDataExchangesListings: API.OperationMethod<SetIamPolicyProjectsLocationsDataExchangesListingsRequest, SetIamPolicyProjectsLocationsDataExchangesListingsResponse, SetIamPolicyProjectsLocationsDataExchangesListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsDataExchangesListingsRequest,
  output: SetIamPolicyProjectsLocationsDataExchangesListingsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsDataExchangesListingsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsDataExchangesListingsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/listings/{listingsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsDataExchangesListingsRequest>;

export type TestIamPermissionsProjectsLocationsDataExchangesListingsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsDataExchangesListingsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsDataExchangesListingsError = CommonErrors;

/** Returns the permissions that a caller has. */
export const testIamPermissionsProjectsLocationsDataExchangesListings: API.OperationMethod<TestIamPermissionsProjectsLocationsDataExchangesListingsRequest, TestIamPermissionsProjectsLocationsDataExchangesListingsResponse, TestIamPermissionsProjectsLocationsDataExchangesListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsDataExchangesListingsRequest,
  output: TestIamPermissionsProjectsLocationsDataExchangesListingsResponse,
  errors: [],
}));

export interface ListOrganizationsLocationsDataExchangesRequest {
  /** Required. The organization resource path of the projects containing DataExchanges. e.g. `organizations/myorg/locations/us`. */
  organization: string;
  /** The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. */
  pageSize?: number;
  /** Page token, returned by a previous call, to request the next page of results. */
  pageToken?: string;
}

export const ListOrganizationsLocationsDataExchangesRequest = Schema.Struct({
  organization: Schema.String.pipe(T.HttpPath("organization")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/organizations/{organizationsId}/locations/{locationsId}/dataExchanges" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsDataExchangesRequest>;

export type ListOrganizationsLocationsDataExchangesResponse = ListOrgDataExchangesResponse;
export const ListOrganizationsLocationsDataExchangesResponse = ListOrgDataExchangesResponse;

export type ListOrganizationsLocationsDataExchangesError = CommonErrors;

/** Lists all data exchanges from projects in a given organization and location. */
export const listOrganizationsLocationsDataExchanges: API.PaginatedOperationMethod<ListOrganizationsLocationsDataExchangesRequest, ListOrganizationsLocationsDataExchangesResponse, ListOrganizationsLocationsDataExchangesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListOrganizationsLocationsDataExchangesRequest,
  output: ListOrganizationsLocationsDataExchangesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

