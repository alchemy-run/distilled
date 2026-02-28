// ==========================================================================
// Cloud Billing API (cloudbilling v1)
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
  name: "cloudbilling",
  version: "v1",
  rootUrl: "https://cloudbilling.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface BillingAccount {
  /** Output only. The resource name of the billing account. The resource name has the form `billingAccounts/{billing_account_id}`. For example, `billingAccounts/012345-567890-ABCDEF` would be the resource name for billing account `012345-567890-ABCDEF`. */
  name?: string;
  /** Output only. True if the billing account is open, and will therefore be charged for any usage on associated projects. False if the billing account is closed, and therefore projects associated with it are unable to use paid services. */
  open?: boolean;
  /** The display name given to the billing account, such as `My Billing Account`. This name is displayed in the Google Cloud Console. */
  displayName?: string;
  /** If this account is a [subaccount](https://cloud.google.com/billing/docs/concepts), then this will be the resource name of the parent billing account that it is being resold through. Otherwise this will be empty. */
  masterBillingAccount?: string;
  /** Output only. The billing account's parent resource identifier. Use the `MoveBillingAccount` method to update the account's parent resource if it is a organization. Format: - `organizations/{organization_id}`, for example, `organizations/12345678` - `billingAccounts/{billing_account_id}`, for example, `billingAccounts/012345-567890-ABCDEF` */
  parent?: string;
  /** Optional. The currency in which the billing account is billed and charged, represented as an ISO 4217 code such as `USD`. Billing account currency is determined at the time of billing account creation and cannot be updated subsequently, so this field should not be set on update requests. In addition, a subaccount always matches the currency of its parent billing account, so this field should not be set on subaccount creation requests. Clients can read this field to determine the currency of an existing billing account. */
  currencyCode?: string;
}

export const BillingAccount: Schema.Schema<BillingAccount> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  open: Schema.optional(Schema.Boolean),
  displayName: Schema.optional(Schema.String),
  masterBillingAccount: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
})).annotate({ identifier: "BillingAccount" }) as any as Schema.Schema<BillingAccount>;

export interface ListBillingAccountsResponse {
  /** A list of billing accounts. */
  billingAccounts?: Array<BillingAccount>;
  /** A token to retrieve the next page of results. To retrieve the next page, call `ListBillingAccounts` again with the `page_token` field set to this value. This field is empty if there are no more results to retrieve. */
  nextPageToken?: string;
}

export const ListBillingAccountsResponse: Schema.Schema<ListBillingAccountsResponse> = Schema.suspend(() => Schema.Struct({
  billingAccounts: Schema.optional(Schema.Array(BillingAccount)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListBillingAccountsResponse" }) as any as Schema.Schema<ListBillingAccountsResponse>;

export interface ProjectBillingInfo {
  /** Output only. The resource name for the `ProjectBillingInfo`; has the form `projects/{project_id}/billingInfo`. For example, the resource name for the billing information for project `tokyo-rain-123` would be `projects/tokyo-rain-123/billingInfo`. */
  name?: string;
  /** Output only. The ID of the project that this `ProjectBillingInfo` represents, such as `tokyo-rain-123`. This is a convenience field so that you don't need to parse the `name` field to obtain a project ID. */
  projectId?: string;
  /** The resource name of the billing account associated with the project, if any. For example, `billingAccounts/012345-567890-ABCDEF`. */
  billingAccountName?: string;
  /** Output only. True if the project is associated with an open billing account, to which usage on the project is charged. False if the project is associated with a closed billing account, or no billing account at all, and therefore cannot use paid services. */
  billingEnabled?: boolean;
}

export const ProjectBillingInfo: Schema.Schema<ProjectBillingInfo> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  billingAccountName: Schema.optional(Schema.String),
  billingEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ProjectBillingInfo" }) as any as Schema.Schema<ProjectBillingInfo>;

export interface ListProjectBillingInfoResponse {
  /** A list of `ProjectBillingInfo` resources representing the projects associated with the billing account. */
  projectBillingInfo?: Array<ProjectBillingInfo>;
  /** A token to retrieve the next page of results. To retrieve the next page, call `ListProjectBillingInfo` again with the `page_token` field set to this value. This field is empty if there are no more results to retrieve. */
  nextPageToken?: string;
}

export const ListProjectBillingInfoResponse: Schema.Schema<ListProjectBillingInfoResponse> = Schema.suspend(() => Schema.Struct({
  projectBillingInfo: Schema.optional(Schema.Array(ProjectBillingInfo)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListProjectBillingInfoResponse" }) as any as Schema.Schema<ListProjectBillingInfoResponse>;

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

export interface MoveBillingAccountRequest {
  /** Required. The resource name of the Organization to move the billing account under. Must be of the form `organizations/{organization_id}`. */
  destinationParent?: string;
}

export const MoveBillingAccountRequest: Schema.Schema<MoveBillingAccountRequest> = Schema.suspend(() => Schema.Struct({
  destinationParent: Schema.optional(Schema.String),
})).annotate({ identifier: "MoveBillingAccountRequest" }) as any as Schema.Schema<MoveBillingAccountRequest>;

export interface Service {
  /** The resource name for the service. Example: "services/6F81-5844-456A" */
  name?: string;
  /** The identifier for the service. Example: "6F81-5844-456A" */
  serviceId?: string;
  /** A human readable display name for this service. */
  displayName?: string;
  /** The business under which the service is offered. Ex. "businessEntities/GCP", "businessEntities/Maps" */
  businessEntityName?: string;
}

export const Service: Schema.Schema<Service> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  serviceId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  businessEntityName: Schema.optional(Schema.String),
})).annotate({ identifier: "Service" }) as any as Schema.Schema<Service>;

export interface ListServicesResponse {
  /** A list of services. */
  services?: Array<Service>;
  /** A token to retrieve the next page of results. To retrieve the next page, call `ListServices` again with the `page_token` field set to this value. This field is empty if there are no more results to retrieve. */
  nextPageToken?: string;
}

export const ListServicesResponse: Schema.Schema<ListServicesResponse> = Schema.suspend(() => Schema.Struct({
  services: Schema.optional(Schema.Array(Service)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListServicesResponse" }) as any as Schema.Schema<ListServicesResponse>;

export interface Category {
  /** The display name of the service this SKU belongs to. */
  serviceDisplayName?: string;
  /** The type of product the SKU refers to. Example: "Compute", "Storage", "Network", "ApplicationServices" etc. */
  resourceFamily?: string;
  /** A group classification for related SKUs. Example: "RAM", "GPU", "Prediction", "Ops", "GoogleEgress" etc. */
  resourceGroup?: string;
  /** Represents how the SKU is consumed. Example: "OnDemand", "Preemptible", "Commit1Mo", "Commit1Yr" etc. */
  usageType?: string;
}

export const Category: Schema.Schema<Category> = Schema.suspend(() => Schema.Struct({
  serviceDisplayName: Schema.optional(Schema.String),
  resourceFamily: Schema.optional(Schema.String),
  resourceGroup: Schema.optional(Schema.String),
  usageType: Schema.optional(Schema.String),
})).annotate({ identifier: "Category" }) as any as Schema.Schema<Category>;

export interface Money {
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. */
  units?: string;
  /** Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. */
  nanos?: number;
}

export const Money: Schema.Schema<Money> = Schema.suspend(() => Schema.Struct({
  currencyCode: Schema.optional(Schema.String),
  units: Schema.optional(Schema.String),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "Money" }) as any as Schema.Schema<Money>;

export interface TierRate {
  /** Usage is priced at this rate only after this amount. Example: start_usage_amount of 10 indicates that the usage will be priced at the unit_price after the first 10 usage_units. */
  startUsageAmount?: number;
  /** The price per unit of usage. Example: unit_price of amount $10 indicates that each unit will cost $10. */
  unitPrice?: Money;
}

export const TierRate: Schema.Schema<TierRate> = Schema.suspend(() => Schema.Struct({
  startUsageAmount: Schema.optional(Schema.Number),
  unitPrice: Schema.optional(Money),
})).annotate({ identifier: "TierRate" }) as any as Schema.Schema<TierRate>;

export interface PricingExpression {
  /** The short hand for unit of usage this pricing is specified in. Example: usage_unit of "GiBy" means that usage is specified in "Gibi Byte". */
  usageUnit?: string;
  /** The recommended quantity of units for displaying pricing info. When displaying pricing info it is recommended to display: (unit_price * display_quantity) per display_quantity usage_unit. This field does not affect the pricing formula and is for display purposes only. Example: If the unit_price is "0.0001 USD", the usage_unit is "GB" and the display_quantity is "1000" then the recommended way of displaying the pricing info is "0.10 USD per 1000 GB" */
  displayQuantity?: number;
  /** The list of tiered rates for this pricing. The total cost is computed by applying each of the tiered rates on usage. This repeated list is sorted by ascending order of start_usage_amount. */
  tieredRates?: Array<TierRate>;
  /** The unit of usage in human readable form. Example: "gibi byte". */
  usageUnitDescription?: string;
  /** The base unit for the SKU which is the unit used in usage exports. Example: "By" */
  baseUnit?: string;
  /** The base unit in human readable form. Example: "byte". */
  baseUnitDescription?: string;
  /** Conversion factor for converting from price per usage_unit to price per base_unit, and start_usage_amount to start_usage_amount in base_unit. unit_price / base_unit_conversion_factor = price per base_unit. start_usage_amount * base_unit_conversion_factor = start_usage_amount in base_unit. */
  baseUnitConversionFactor?: number;
}

export const PricingExpression: Schema.Schema<PricingExpression> = Schema.suspend(() => Schema.Struct({
  usageUnit: Schema.optional(Schema.String),
  displayQuantity: Schema.optional(Schema.Number),
  tieredRates: Schema.optional(Schema.Array(TierRate)),
  usageUnitDescription: Schema.optional(Schema.String),
  baseUnit: Schema.optional(Schema.String),
  baseUnitDescription: Schema.optional(Schema.String),
  baseUnitConversionFactor: Schema.optional(Schema.Number),
})).annotate({ identifier: "PricingExpression" }) as any as Schema.Schema<PricingExpression>;

export interface AggregationInfo {
  aggregationLevel?: "AGGREGATION_LEVEL_UNSPECIFIED" | "ACCOUNT" | "PROJECT" | (string & {});
  aggregationInterval?: "AGGREGATION_INTERVAL_UNSPECIFIED" | "DAILY" | "MONTHLY" | (string & {});
  /** The number of intervals to aggregate over. Example: If aggregation_level is "DAILY" and aggregation_count is 14, aggregation will be over 14 days. */
  aggregationCount?: number;
}

export const AggregationInfo: Schema.Schema<AggregationInfo> = Schema.suspend(() => Schema.Struct({
  aggregationLevel: Schema.optional(Schema.String),
  aggregationInterval: Schema.optional(Schema.String),
  aggregationCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "AggregationInfo" }) as any as Schema.Schema<AggregationInfo>;

export interface PricingInfo {
  /** The timestamp from which this pricing was effective within the requested time range. This is guaranteed to be greater than or equal to the start_time field in the request and less than the end_time field in the request. If a time range was not specified in the request this field will be equivalent to a time within the last 12 hours, indicating the latest pricing info. */
  effectiveTime?: string;
  /** An optional human readable summary of the pricing information, has a maximum length of 256 characters. */
  summary?: string;
  /** Expresses the pricing formula. See `PricingExpression` for an example. */
  pricingExpression?: PricingExpression;
  /** Aggregation Info. This can be left unspecified if the pricing expression doesn't require aggregation. */
  aggregationInfo?: AggregationInfo;
  /** Conversion rate used for currency conversion, from USD to the currency specified in the request. This includes any surcharge collected for billing in non USD currency. If a currency is not specified in the request this defaults to 1.0. Example: USD * currency_conversion_rate = JPY */
  currencyConversionRate?: number;
}

export const PricingInfo: Schema.Schema<PricingInfo> = Schema.suspend(() => Schema.Struct({
  effectiveTime: Schema.optional(Schema.String),
  summary: Schema.optional(Schema.String),
  pricingExpression: Schema.optional(PricingExpression),
  aggregationInfo: Schema.optional(AggregationInfo),
  currencyConversionRate: Schema.optional(Schema.Number),
})).annotate({ identifier: "PricingInfo" }) as any as Schema.Schema<PricingInfo>;

export interface GeoTaxonomy {
  /** The type of Geo Taxonomy: GLOBAL, REGIONAL, or MULTI_REGIONAL. */
  type?: "TYPE_UNSPECIFIED" | "GLOBAL" | "REGIONAL" | "MULTI_REGIONAL" | (string & {});
  /** The list of regions associated with a sku. Empty for Global skus, which are associated with all Google Cloud regions. */
  regions?: Array<string>;
}

export const GeoTaxonomy: Schema.Schema<GeoTaxonomy> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  regions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GeoTaxonomy" }) as any as Schema.Schema<GeoTaxonomy>;

export interface Sku {
  /** The resource name for the SKU. Example: "services/6F81-5844-456A/skus/D041-B8A1-6E0B" */
  name?: string;
  /** The identifier for the SKU. Example: "D041-B8A1-6E0B" */
  skuId?: string;
  /** A human readable description of the SKU, has a maximum length of 256 characters. */
  description?: string;
  /** The category hierarchy of this SKU, purely for organizational purpose. */
  category?: Category;
  /** List of service regions this SKU is offered at. Example: "asia-east1" Service regions can be found at https://cloud.google.com/about/locations/ */
  serviceRegions?: Array<string>;
  /** A timeline of pricing info for this SKU in chronological order. */
  pricingInfo?: Array<PricingInfo>;
  /** Identifies the service provider. This is 'Google' for first party services in Google Cloud Platform. */
  serviceProviderName?: string;
  /** The geographic taxonomy for this sku. */
  geoTaxonomy?: GeoTaxonomy;
}

export const Sku: Schema.Schema<Sku> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  skuId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  category: Schema.optional(Category),
  serviceRegions: Schema.optional(Schema.Array(Schema.String)),
  pricingInfo: Schema.optional(Schema.Array(PricingInfo)),
  serviceProviderName: Schema.optional(Schema.String),
  geoTaxonomy: Schema.optional(GeoTaxonomy),
})).annotate({ identifier: "Sku" }) as any as Schema.Schema<Sku>;

export interface ListSkusResponse {
  /** The list of public SKUs of the given service. */
  skus?: Array<Sku>;
  /** A token to retrieve the next page of results. To retrieve the next page, call `ListSkus` again with the `page_token` field set to this value. This field is empty if there are no more results to retrieve. */
  nextPageToken?: string;
}

export const ListSkusResponse: Schema.Schema<ListSkusResponse> = Schema.suspend(() => Schema.Struct({
  skus: Schema.optional(Schema.Array(Sku)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListSkusResponse" }) as any as Schema.Schema<ListSkusResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets information about a billing account. The current authenticated user must be a [viewer of the billing account](https://cloud.google.com/billing/docs/how-to/billing-access). */
export interface GetBillingAccountsRequest {
  /** Required. The resource name of the billing account to retrieve. For example, `billingAccounts/012345-567890-ABCDEF`. */
  name: string;
}

export const GetBillingAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/billingAccounts/{billingAccountsId}" }),
  svc,
) as unknown as Schema.Schema<GetBillingAccountsRequest>;

export type GetBillingAccountsResponse = BillingAccount;
export const GetBillingAccountsResponse = BillingAccount;

export type GetBillingAccountsError = CommonErrors;

export const getBillingAccounts: API.OperationMethod<GetBillingAccountsRequest, GetBillingAccountsResponse, GetBillingAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBillingAccountsRequest,
  output: GetBillingAccountsResponse,
  errors: [],
}));

/** Lists the billing accounts that the current authenticated user has permission to [view](https://cloud.google.com/billing/docs/how-to/billing-access). */
export interface ListBillingAccountsRequest {
  /** Requested page size. The maximum page size is 100; this is also the default. */
  pageSize?: number;
  /** A token identifying a page of results to return. This should be a `next_page_token` value returned from a previous `ListBillingAccounts` call. If unspecified, the first page of results is returned. */
  pageToken?: string;
  /** Options for how to filter the returned billing accounts. This only supports filtering for [subaccounts](https://cloud.google.com/billing/docs/concepts) under a single provided parent billing account. (for example, `master_billing_account=billingAccounts/012345-678901-ABCDEF`). Boolean algebra and other fields are not currently supported. */
  filter?: string;
  /** Optional. The parent resource to list billing accounts from. Format: - `organizations/{organization_id}`, for example, `organizations/12345678` - `billingAccounts/{billing_account_id}`, for example, `billingAccounts/012345-567890-ABCDEF` */
  parent?: string;
}

export const ListBillingAccountsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/billingAccounts" }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsRequest>;

export type ListBillingAccountsResponse_Op = ListBillingAccountsResponse;
export const ListBillingAccountsResponse_Op = ListBillingAccountsResponse;

export type ListBillingAccountsError = CommonErrors;

export const listBillingAccounts = API.makePaginated(() => ({
  input: ListBillingAccountsRequest,
  output: ListBillingAccountsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a billing account's fields. Currently the only field that can be edited is `display_name`. The current authenticated user must have the `billing.accounts.update` IAM permission, which is typically given to the [administrator](https://cloud.google.com/billing/docs/how-to/billing-access) of the billing account. */
export interface PatchBillingAccountsRequest {
  /** Required. The name of the billing account resource to be updated. */
  name: string;
  /** The update mask applied to the resource. Only "display_name" is currently supported. */
  updateMask?: string;
  /** Request body */
  body?: BillingAccount;
}

export const PatchBillingAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(BillingAccount).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/billingAccounts/{billingAccountsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchBillingAccountsRequest>;

export type PatchBillingAccountsResponse = BillingAccount;
export const PatchBillingAccountsResponse = BillingAccount;

export type PatchBillingAccountsError = CommonErrors;

export const patchBillingAccounts: API.OperationMethod<PatchBillingAccountsRequest, PatchBillingAccountsResponse, PatchBillingAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchBillingAccountsRequest,
  output: PatchBillingAccountsResponse,
  errors: [],
}));

/** This method creates [billing subaccounts](https://cloud.google.com/billing/docs/concepts#subaccounts). Google Cloud resellers should use the Channel Services APIs, [accounts.customers.create](https://cloud.google.com/channel/docs/reference/rest/v1/accounts.customers/create) and [accounts.customers.entitlements.create](https://cloud.google.com/channel/docs/reference/rest/v1/accounts.customers.entitlements/create). When creating a subaccount, the current authenticated user must have the `billing.accounts.update` IAM permission on the parent account, which is typically given to billing account [administrators](https://cloud.google.com/billing/docs/how-to/billing-access). This method will return an error if the parent account has not been provisioned for subaccounts. */
export interface CreateBillingAccountsRequest {
  /** Optional. The parent to create a billing account from. Format: - `billingAccounts/{billing_account_id}`, for example, `billingAccounts/012345-567890-ABCDEF` */
  parent?: string;
  /** Request body */
  body?: BillingAccount;
}

export const CreateBillingAccountsRequest = Schema.Struct({
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  body: Schema.optional(BillingAccount).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/billingAccounts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateBillingAccountsRequest>;

export type CreateBillingAccountsResponse = BillingAccount;
export const CreateBillingAccountsResponse = BillingAccount;

export type CreateBillingAccountsError = CommonErrors;

export const createBillingAccounts: API.OperationMethod<CreateBillingAccountsRequest, CreateBillingAccountsResponse, CreateBillingAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateBillingAccountsRequest,
  output: CreateBillingAccountsResponse,
  errors: [],
}));

/** Gets the access control policy for a billing account. The caller must have the `billing.accounts.getIamPolicy` permission on the account, which is often given to billing account [viewers](https://cloud.google.com/billing/docs/how-to/billing-access). */
export interface GetIamPolicyBillingAccountsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyBillingAccountsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/billingAccounts/{billingAccountsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyBillingAccountsRequest>;

export type GetIamPolicyBillingAccountsResponse = Policy;
export const GetIamPolicyBillingAccountsResponse = Policy;

export type GetIamPolicyBillingAccountsError = CommonErrors;

export const getIamPolicyBillingAccounts: API.OperationMethod<GetIamPolicyBillingAccountsRequest, GetIamPolicyBillingAccountsResponse, GetIamPolicyBillingAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyBillingAccountsRequest,
  output: GetIamPolicyBillingAccountsResponse,
  errors: [],
}));

/** Sets the access control policy for a billing account. Replaces any existing policy. The caller must have the `billing.accounts.setIamPolicy` permission on the account, which is often given to billing account [administrators](https://cloud.google.com/billing/docs/how-to/billing-access). */
export interface SetIamPolicyBillingAccountsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyBillingAccountsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/billingAccounts/{billingAccountsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyBillingAccountsRequest>;

export type SetIamPolicyBillingAccountsResponse = Policy;
export const SetIamPolicyBillingAccountsResponse = Policy;

export type SetIamPolicyBillingAccountsError = CommonErrors;

export const setIamPolicyBillingAccounts: API.OperationMethod<SetIamPolicyBillingAccountsRequest, SetIamPolicyBillingAccountsResponse, SetIamPolicyBillingAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyBillingAccountsRequest,
  output: SetIamPolicyBillingAccountsResponse,
  errors: [],
}));

/** Tests the access control policy for a billing account. This method takes the resource and a set of permissions as input and returns the subset of the input permissions that the caller is allowed for that resource. */
export interface TestIamPermissionsBillingAccountsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsBillingAccountsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/billingAccounts/{billingAccountsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsBillingAccountsRequest>;

export type TestIamPermissionsBillingAccountsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsBillingAccountsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsBillingAccountsError = CommonErrors;

export const testIamPermissionsBillingAccounts: API.OperationMethod<TestIamPermissionsBillingAccountsRequest, TestIamPermissionsBillingAccountsResponse, TestIamPermissionsBillingAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsBillingAccountsRequest,
  output: TestIamPermissionsBillingAccountsResponse,
  errors: [],
}));

/** Changes which parent organization a billing account belongs to. */
export interface MoveBillingAccountsRequest {
  /** Required. The resource name of the billing account to move. Must be of the form `billingAccounts/{billing_account_id}`. The specified billing account cannot be a subaccount, since a subaccount always belongs to the same organization as its parent account. */
  name: string;
  /** Request body */
  body?: MoveBillingAccountRequest;
}

export const MoveBillingAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(MoveBillingAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/billingAccounts/{billingAccountsId}:move", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MoveBillingAccountsRequest>;

export type MoveBillingAccountsResponse = BillingAccount;
export const MoveBillingAccountsResponse = BillingAccount;

export type MoveBillingAccountsError = CommonErrors;

export const moveBillingAccounts: API.OperationMethod<MoveBillingAccountsRequest, MoveBillingAccountsResponse, MoveBillingAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveBillingAccountsRequest,
  output: MoveBillingAccountsResponse,
  errors: [],
}));

/** Lists the billing accounts that the current authenticated user has permission to [view](https://cloud.google.com/billing/docs/how-to/billing-access). */
export interface ListBillingAccountsSubAccountsRequest {
  /** Optional. The parent resource to list billing accounts from. Format: - `organizations/{organization_id}`, for example, `organizations/12345678` - `billingAccounts/{billing_account_id}`, for example, `billingAccounts/012345-567890-ABCDEF` */
  parent: string;
  /** Requested page size. The maximum page size is 100; this is also the default. */
  pageSize?: number;
  /** A token identifying a page of results to return. This should be a `next_page_token` value returned from a previous `ListBillingAccounts` call. If unspecified, the first page of results is returned. */
  pageToken?: string;
  /** Options for how to filter the returned billing accounts. This only supports filtering for [subaccounts](https://cloud.google.com/billing/docs/concepts) under a single provided parent billing account. (for example, `master_billing_account=billingAccounts/012345-678901-ABCDEF`). Boolean algebra and other fields are not currently supported. */
  filter?: string;
}

export const ListBillingAccountsSubAccountsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/billingAccounts/{billingAccountsId}/subAccounts" }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsSubAccountsRequest>;

export type ListBillingAccountsSubAccountsResponse = ListBillingAccountsResponse;
export const ListBillingAccountsSubAccountsResponse = ListBillingAccountsResponse;

export type ListBillingAccountsSubAccountsError = CommonErrors;

export const listBillingAccountsSubAccounts = API.makePaginated(() => ({
  input: ListBillingAccountsSubAccountsRequest,
  output: ListBillingAccountsSubAccountsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** This method creates [billing subaccounts](https://cloud.google.com/billing/docs/concepts#subaccounts). Google Cloud resellers should use the Channel Services APIs, [accounts.customers.create](https://cloud.google.com/channel/docs/reference/rest/v1/accounts.customers/create) and [accounts.customers.entitlements.create](https://cloud.google.com/channel/docs/reference/rest/v1/accounts.customers.entitlements/create). When creating a subaccount, the current authenticated user must have the `billing.accounts.update` IAM permission on the parent account, which is typically given to billing account [administrators](https://cloud.google.com/billing/docs/how-to/billing-access). This method will return an error if the parent account has not been provisioned for subaccounts. */
export interface CreateBillingAccountsSubAccountsRequest {
  /** Optional. The parent to create a billing account from. Format: - `billingAccounts/{billing_account_id}`, for example, `billingAccounts/012345-567890-ABCDEF` */
  parent: string;
  /** Request body */
  body?: BillingAccount;
}

export const CreateBillingAccountsSubAccountsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BillingAccount).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/billingAccounts/{billingAccountsId}/subAccounts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateBillingAccountsSubAccountsRequest>;

export type CreateBillingAccountsSubAccountsResponse = BillingAccount;
export const CreateBillingAccountsSubAccountsResponse = BillingAccount;

export type CreateBillingAccountsSubAccountsError = CommonErrors;

export const createBillingAccountsSubAccounts: API.OperationMethod<CreateBillingAccountsSubAccountsRequest, CreateBillingAccountsSubAccountsResponse, CreateBillingAccountsSubAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateBillingAccountsSubAccountsRequest,
  output: CreateBillingAccountsSubAccountsResponse,
  errors: [],
}));

/** Lists the projects associated with a billing account. The current authenticated user must have the `billing.resourceAssociations.list` IAM permission, which is often given to billing account [viewers](https://cloud.google.com/billing/docs/how-to/billing-access). */
export interface ListBillingAccountsProjectsRequest {
  /** Required. The resource name of the billing account associated with the projects that you want to list. For example, `billingAccounts/012345-567890-ABCDEF`. */
  name: string;
  /** Requested page size. The maximum page size is 100; this is also the default. */
  pageSize?: number;
  /** A token identifying a page of results to be returned. This should be a `next_page_token` value returned from a previous `ListProjectBillingInfo` call. If unspecified, the first page of results is returned. */
  pageToken?: string;
}

export const ListBillingAccountsProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/billingAccounts/{billingAccountsId}/projects" }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsProjectsRequest>;

export type ListBillingAccountsProjectsResponse = ListProjectBillingInfoResponse;
export const ListBillingAccountsProjectsResponse = ListProjectBillingInfoResponse;

export type ListBillingAccountsProjectsError = CommonErrors;

export const listBillingAccountsProjects = API.makePaginated(() => ({
  input: ListBillingAccountsProjectsRequest,
  output: ListBillingAccountsProjectsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the billing accounts that the current authenticated user has permission to [view](https://cloud.google.com/billing/docs/how-to/billing-access). */
export interface ListOrganizationsBillingAccountsRequest {
  /** Optional. The parent resource to list billing accounts from. Format: - `organizations/{organization_id}`, for example, `organizations/12345678` - `billingAccounts/{billing_account_id}`, for example, `billingAccounts/012345-567890-ABCDEF` */
  parent: string;
  /** Requested page size. The maximum page size is 100; this is also the default. */
  pageSize?: number;
  /** A token identifying a page of results to return. This should be a `next_page_token` value returned from a previous `ListBillingAccounts` call. If unspecified, the first page of results is returned. */
  pageToken?: string;
  /** Options for how to filter the returned billing accounts. This only supports filtering for [subaccounts](https://cloud.google.com/billing/docs/concepts) under a single provided parent billing account. (for example, `master_billing_account=billingAccounts/012345-678901-ABCDEF`). Boolean algebra and other fields are not currently supported. */
  filter?: string;
}

export const ListOrganizationsBillingAccountsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/billingAccounts" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsBillingAccountsRequest>;

export type ListOrganizationsBillingAccountsResponse = ListBillingAccountsResponse;
export const ListOrganizationsBillingAccountsResponse = ListBillingAccountsResponse;

export type ListOrganizationsBillingAccountsError = CommonErrors;

export const listOrganizationsBillingAccounts = API.makePaginated(() => ({
  input: ListOrganizationsBillingAccountsRequest,
  output: ListOrganizationsBillingAccountsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** This method creates [billing subaccounts](https://cloud.google.com/billing/docs/concepts#subaccounts). Google Cloud resellers should use the Channel Services APIs, [accounts.customers.create](https://cloud.google.com/channel/docs/reference/rest/v1/accounts.customers/create) and [accounts.customers.entitlements.create](https://cloud.google.com/channel/docs/reference/rest/v1/accounts.customers.entitlements/create). When creating a subaccount, the current authenticated user must have the `billing.accounts.update` IAM permission on the parent account, which is typically given to billing account [administrators](https://cloud.google.com/billing/docs/how-to/billing-access). This method will return an error if the parent account has not been provisioned for subaccounts. */
export interface CreateOrganizationsBillingAccountsRequest {
  /** Optional. The parent to create a billing account from. Format: - `billingAccounts/{billing_account_id}`, for example, `billingAccounts/012345-567890-ABCDEF` */
  parent: string;
  /** Request body */
  body?: BillingAccount;
}

export const CreateOrganizationsBillingAccountsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BillingAccount).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/billingAccounts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsBillingAccountsRequest>;

export type CreateOrganizationsBillingAccountsResponse = BillingAccount;
export const CreateOrganizationsBillingAccountsResponse = BillingAccount;

export type CreateOrganizationsBillingAccountsError = CommonErrors;

export const createOrganizationsBillingAccounts: API.OperationMethod<CreateOrganizationsBillingAccountsRequest, CreateOrganizationsBillingAccountsResponse, CreateOrganizationsBillingAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsBillingAccountsRequest,
  output: CreateOrganizationsBillingAccountsResponse,
  errors: [],
}));

/** Changes which parent organization a billing account belongs to. */
export interface MoveOrganizationsBillingAccountsRequest {
  /** Required. The resource name of the Organization to move the billing account under. Must be of the form `organizations/{organization_id}`. */
  destinationParent: string;
  /** Required. The resource name of the billing account to move. Must be of the form `billingAccounts/{billing_account_id}`. The specified billing account cannot be a subaccount, since a subaccount always belongs to the same organization as its parent account. */
  name: string;
}

export const MoveOrganizationsBillingAccountsRequest = Schema.Struct({
  destinationParent: Schema.String.pipe(T.HttpPath("destinationParent")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/billingAccounts/{billingAccountsId}:move" }),
  svc,
) as unknown as Schema.Schema<MoveOrganizationsBillingAccountsRequest>;

export type MoveOrganizationsBillingAccountsResponse = BillingAccount;
export const MoveOrganizationsBillingAccountsResponse = BillingAccount;

export type MoveOrganizationsBillingAccountsError = CommonErrors;

export const moveOrganizationsBillingAccounts: API.OperationMethod<MoveOrganizationsBillingAccountsRequest, MoveOrganizationsBillingAccountsResponse, MoveOrganizationsBillingAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MoveOrganizationsBillingAccountsRequest,
  output: MoveOrganizationsBillingAccountsResponse,
  errors: [],
}));

/** Gets the billing information for a project. The current authenticated user must have the `resourcemanager.projects.get` permission for the project, which can be granted by assigning the [Project Viewer](https://cloud.google.com/iam/docs/understanding-roles#predefined_roles) role. */
export interface GetBillingInfoProjectsRequest {
  /** Required. The resource name of the project for which billing information is retrieved. For example, `projects/tokyo-rain-123`. */
  name: string;
}

export const GetBillingInfoProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/billingInfo" }),
  svc,
) as unknown as Schema.Schema<GetBillingInfoProjectsRequest>;

export type GetBillingInfoProjectsResponse = ProjectBillingInfo;
export const GetBillingInfoProjectsResponse = ProjectBillingInfo;

export type GetBillingInfoProjectsError = CommonErrors;

export const getBillingInfoProjects: API.OperationMethod<GetBillingInfoProjectsRequest, GetBillingInfoProjectsResponse, GetBillingInfoProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBillingInfoProjectsRequest,
  output: GetBillingInfoProjectsResponse,
  errors: [],
}));

/** Sets or updates the billing account associated with a project. You specify the new billing account by setting the `billing_account_name` in the `ProjectBillingInfo` resource to the resource name of a billing account. Associating a project with an open billing account enables billing on the project and allows charges for resource usage. If the project already had a billing account, this method changes the billing account used for resource usage charges. *Note:* Incurred charges that have not yet been reported in the transaction history of the Google Cloud Console might be billed to the new billing account, even if the charge occurred before the new billing account was assigned to the project. The current authenticated user must have ownership privileges for both the [project](https://cloud.google.com/docs/permissions-overview#h.bgs0oxofvnoo ) and the [billing account](https://cloud.google.com/billing/docs/how-to/billing-access). You can disable billing on the project by setting the `billing_account_name` field to empty. This action disassociates the current billing account from the project. Any billable activity of your in-use services will stop, and your application could stop functioning as expected. Any unbilled charges to date will be billed to the previously associated account. The current authenticated user must be either an owner of the project or an owner of the billing account for the project. Note that associating a project with a *closed* billing account will have much the same effect as disabling billing on the project: any paid resources used by the project will be shut down. Thus, unless you wish to disable billing, you should always call this method with the name of an *open* billing account. */
export interface UpdateBillingInfoProjectsRequest {
  /** Required. The resource name of the project associated with the billing information that you want to update. For example, `projects/tokyo-rain-123`. */
  name: string;
  /** Request body */
  body?: ProjectBillingInfo;
}

export const UpdateBillingInfoProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ProjectBillingInfo).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/billingInfo", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateBillingInfoProjectsRequest>;

export type UpdateBillingInfoProjectsResponse = ProjectBillingInfo;
export const UpdateBillingInfoProjectsResponse = ProjectBillingInfo;

export type UpdateBillingInfoProjectsError = CommonErrors;

export const updateBillingInfoProjects: API.OperationMethod<UpdateBillingInfoProjectsRequest, UpdateBillingInfoProjectsResponse, UpdateBillingInfoProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateBillingInfoProjectsRequest,
  output: UpdateBillingInfoProjectsResponse,
  errors: [],
}));

/** Lists all public cloud services. */
export interface ListServicesRequest {
  /** Requested page size. Defaults to 5000. */
  pageSize?: number;
  /** A token identifying a page of results to return. This should be a `next_page_token` value returned from a previous `ListServices` call. If unspecified, the first page of results is returned. */
  pageToken?: string;
}

export const ListServicesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services" }),
  svc,
) as unknown as Schema.Schema<ListServicesRequest>;

export type ListServicesResponse_Op = ListServicesResponse;
export const ListServicesResponse_Op = ListServicesResponse;

export type ListServicesError = CommonErrors;

export const listServices = API.makePaginated(() => ({
  input: ListServicesRequest,
  output: ListServicesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists all publicly available SKUs for a given cloud service. */
export interface ListServicesSkusRequest {
  /** Required. The name of the service. Example: "services/6F81-5844-456A" */
  parent: string;
  /** Optional inclusive start time of the time range for which the pricing versions will be returned. Timestamps in the future are not allowed. The time range has to be within a single calendar month in America/Los_Angeles timezone. Time range as a whole is optional. If not specified, the latest pricing will be returned (up to 12 hours old at most). */
  startTime?: string;
  /** Optional exclusive end time of the time range for which the pricing versions will be returned. Timestamps in the future are not allowed. The time range has to be within a single calendar month in America/Los_Angeles timezone. Time range as a whole is optional. If not specified, the latest pricing will be returned (up to 12 hours old at most). */
  endTime?: string;
  /** The ISO 4217 currency code for the pricing info in the response proto. Will use the conversion rate as of start_time. Optional. If not specified USD will be used. */
  currencyCode?: string;
  /** Requested page size. Defaults to 5000. */
  pageSize?: number;
  /** A token identifying a page of results to return. This should be a `next_page_token` value returned from a previous `ListSkus` call. If unspecified, the first page of results is returned. */
  pageToken?: string;
}

export const ListServicesSkusRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("startTime")),
  endTime: Schema.optional(Schema.String).pipe(T.HttpQuery("endTime")),
  currencyCode: Schema.optional(Schema.String).pipe(T.HttpQuery("currencyCode")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/services/{servicesId}/skus" }),
  svc,
) as unknown as Schema.Schema<ListServicesSkusRequest>;

export type ListServicesSkusResponse = ListSkusResponse;
export const ListServicesSkusResponse = ListSkusResponse;

export type ListServicesSkusError = CommonErrors;

export const listServicesSkus = API.makePaginated(() => ({
  input: ListServicesSkusRequest,
  output: ListServicesSkusResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

