// ==========================================================================
// Recommender API (recommender v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "recommender",
  version: "v1",
  rootUrl: "https://recommender.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudRecommenderV1InsightStateInfo {
  /** Insight state. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "ACCEPTED" | "DISMISSED" | (string & {});
  /** A map of metadata for the state, provided by user or automations systems. */
  stateMetadata?: Record<string, string>;
}

export const GoogleCloudRecommenderV1InsightStateInfo: Schema.Schema<GoogleCloudRecommenderV1InsightStateInfo> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  stateMetadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudRecommenderV1InsightStateInfo" }) as any as Schema.Schema<GoogleCloudRecommenderV1InsightStateInfo>;

export interface GoogleCloudRecommenderV1InsightRecommendationReference {
  /** Recommendation resource name, e.g. projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/recommendations/[RECOMMENDATION_ID] */
  recommendation?: string;
}

export const GoogleCloudRecommenderV1InsightRecommendationReference: Schema.Schema<GoogleCloudRecommenderV1InsightRecommendationReference> = Schema.suspend(() => Schema.Struct({
  recommendation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommenderV1InsightRecommendationReference" }) as any as Schema.Schema<GoogleCloudRecommenderV1InsightRecommendationReference>;

export interface GoogleCloudRecommenderV1Insight {
  /** Identifier. Name of the insight. */
  name?: string;
  /** Free-form human readable summary in English. The maximum length is 500 characters. */
  description?: string;
  /** Fully qualified resource names that this insight is targeting. */
  targetResources?: Array<string>;
  /** Insight subtype. Insight content schema will be stable for a given subtype. */
  insightSubtype?: string;
  /** A struct of custom fields to explain the insight. Example: "grantedPermissionsCount": "1000" */
  content?: Record<string, unknown>;
  /** Timestamp of the latest data used to generate the insight. */
  lastRefreshTime?: string;
  /** Observation period that led to the insight. The source data used to generate the insight ends at last_refresh_time and begins at (last_refresh_time - observation_period). */
  observationPeriod?: string;
  /** Information state and metadata. */
  stateInfo?: GoogleCloudRecommenderV1InsightStateInfo;
  /** Category being targeted by the insight. */
  category?: "CATEGORY_UNSPECIFIED" | "COST" | "SECURITY" | "PERFORMANCE" | "MANAGEABILITY" | "SUSTAINABILITY" | "RELIABILITY" | (string & {});
  /** Insight's severity. */
  severity?: "SEVERITY_UNSPECIFIED" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
  /** Fingerprint of the Insight. Provides optimistic locking when updating states. */
  etag?: string;
  /** Recommendations derived from this insight. */
  associatedRecommendations?: Array<GoogleCloudRecommenderV1InsightRecommendationReference>;
}

export const GoogleCloudRecommenderV1Insight: Schema.Schema<GoogleCloudRecommenderV1Insight> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  targetResources: Schema.optional(Schema.Array(Schema.String)),
  insightSubtype: Schema.optional(Schema.String),
  content: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  lastRefreshTime: Schema.optional(Schema.String),
  observationPeriod: Schema.optional(Schema.String),
  stateInfo: Schema.optional(GoogleCloudRecommenderV1InsightStateInfo),
  category: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  associatedRecommendations: Schema.optional(Schema.Array(GoogleCloudRecommenderV1InsightRecommendationReference)),
})).annotate({ identifier: "GoogleCloudRecommenderV1Insight" }) as any as Schema.Schema<GoogleCloudRecommenderV1Insight>;

export interface GoogleCloudRecommenderV1ListInsightsResponse {
  /** The set of insights for the `parent` resource. */
  insights?: Array<GoogleCloudRecommenderV1Insight>;
  /** A token that can be used to request the next page of results. This field is empty if there are no additional results. */
  nextPageToken?: string;
}

export const GoogleCloudRecommenderV1ListInsightsResponse: Schema.Schema<GoogleCloudRecommenderV1ListInsightsResponse> = Schema.suspend(() => Schema.Struct({
  insights: Schema.optional(Schema.Array(GoogleCloudRecommenderV1Insight)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommenderV1ListInsightsResponse" }) as any as Schema.Schema<GoogleCloudRecommenderV1ListInsightsResponse>;

export interface GoogleCloudRecommenderV1MarkInsightAcceptedRequest {
  /** Optional. State properties user wish to include with this state. Full replace of the current state_metadata. */
  stateMetadata?: Record<string, string>;
  /** Required. Fingerprint of the Insight. Provides optimistic locking. */
  etag?: string;
}

export const GoogleCloudRecommenderV1MarkInsightAcceptedRequest: Schema.Schema<GoogleCloudRecommenderV1MarkInsightAcceptedRequest> = Schema.suspend(() => Schema.Struct({
  stateMetadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommenderV1MarkInsightAcceptedRequest" }) as any as Schema.Schema<GoogleCloudRecommenderV1MarkInsightAcceptedRequest>;

export interface GoogleTypeMoney {
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. */
  units?: string;
  /** Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. */
  nanos?: number;
}

export const GoogleTypeMoney: Schema.Schema<GoogleTypeMoney> = Schema.suspend(() => Schema.Struct({
  currencyCode: Schema.optional(Schema.String),
  units: Schema.optional(Schema.String),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeMoney" }) as any as Schema.Schema<GoogleTypeMoney>;

export interface GoogleCloudRecommenderV1CostProjection {
  /** An approximate projection on amount saved or amount incurred. Negative cost units indicate cost savings and positive cost units indicate increase. See google.type.Money documentation for positive/negative units. A user's permissions may affect whether the cost is computed using list prices or custom contract prices. */
  cost?: GoogleTypeMoney;
  /** Duration for which this cost applies. */
  duration?: string;
  /** The approximate cost savings in the billing account's local currency. */
  costInLocalCurrency?: GoogleTypeMoney;
}

export const GoogleCloudRecommenderV1CostProjection: Schema.Schema<GoogleCloudRecommenderV1CostProjection> = Schema.suspend(() => Schema.Struct({
  cost: Schema.optional(GoogleTypeMoney),
  duration: Schema.optional(Schema.String),
  costInLocalCurrency: Schema.optional(GoogleTypeMoney),
})).annotate({ identifier: "GoogleCloudRecommenderV1CostProjection" }) as any as Schema.Schema<GoogleCloudRecommenderV1CostProjection>;

export interface GoogleCloudRecommenderV1SecurityProjection {
  /** Additional security impact details that is provided by the recommender. */
  details?: Record<string, unknown>;
}

export const GoogleCloudRecommenderV1SecurityProjection: Schema.Schema<GoogleCloudRecommenderV1SecurityProjection> = Schema.suspend(() => Schema.Struct({
  details: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudRecommenderV1SecurityProjection" }) as any as Schema.Schema<GoogleCloudRecommenderV1SecurityProjection>;

export interface GoogleCloudRecommenderV1SustainabilityProjection {
  /** Carbon Footprint generated in kg of CO2 equivalent. Chose kg_c_o2e so that the name renders correctly in camelCase (kgCO2e). */
  kgCO2e?: number;
  /** Duration for which this sustainability applies. */
  duration?: string;
}

export const GoogleCloudRecommenderV1SustainabilityProjection: Schema.Schema<GoogleCloudRecommenderV1SustainabilityProjection> = Schema.suspend(() => Schema.Struct({
  kgCO2e: Schema.optional(Schema.Number),
  duration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommenderV1SustainabilityProjection" }) as any as Schema.Schema<GoogleCloudRecommenderV1SustainabilityProjection>;

export interface GoogleCloudRecommenderV1ReliabilityProjection {
  /** Reliability risks mitigated by this recommendation. */
  risks?: Array<"RISK_TYPE_UNSPECIFIED" | "SERVICE_DISRUPTION" | "DATA_LOSS" | "ACCESS_DENY" | (string & {})>;
  /** Per-recommender projection. */
  details?: Record<string, unknown>;
}

export const GoogleCloudRecommenderV1ReliabilityProjection: Schema.Schema<GoogleCloudRecommenderV1ReliabilityProjection> = Schema.suspend(() => Schema.Struct({
  risks: Schema.optional(Schema.Array(Schema.String)),
  details: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudRecommenderV1ReliabilityProjection" }) as any as Schema.Schema<GoogleCloudRecommenderV1ReliabilityProjection>;

export interface GoogleCloudRecommenderV1Impact {
  /** Category that is being targeted. */
  category?: "CATEGORY_UNSPECIFIED" | "COST" | "SECURITY" | "PERFORMANCE" | "MANAGEABILITY" | "SUSTAINABILITY" | "RELIABILITY" | (string & {});
  /** Use with CategoryType.COST */
  costProjection?: GoogleCloudRecommenderV1CostProjection;
  /** Use with CategoryType.SECURITY */
  securityProjection?: GoogleCloudRecommenderV1SecurityProjection;
  /** Use with CategoryType.SUSTAINABILITY */
  sustainabilityProjection?: GoogleCloudRecommenderV1SustainabilityProjection;
  /** Use with CategoryType.RELIABILITY */
  reliabilityProjection?: GoogleCloudRecommenderV1ReliabilityProjection;
  /** The service that this impact is associated with. */
  service?: string;
}

export const GoogleCloudRecommenderV1Impact: Schema.Schema<GoogleCloudRecommenderV1Impact> = Schema.suspend(() => Schema.Struct({
  category: Schema.optional(Schema.String),
  costProjection: Schema.optional(GoogleCloudRecommenderV1CostProjection),
  securityProjection: Schema.optional(GoogleCloudRecommenderV1SecurityProjection),
  sustainabilityProjection: Schema.optional(GoogleCloudRecommenderV1SustainabilityProjection),
  reliabilityProjection: Schema.optional(GoogleCloudRecommenderV1ReliabilityProjection),
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommenderV1Impact" }) as any as Schema.Schema<GoogleCloudRecommenderV1Impact>;

export interface GoogleCloudRecommenderV1ValueMatcher {
  /** To be used for full regex matching. The regular expression is using the Google RE2 syntax (https://github.com/google/re2/wiki/Syntax), so to be used with RE2::FullMatch */
  matchesPattern?: string;
}

export const GoogleCloudRecommenderV1ValueMatcher: Schema.Schema<GoogleCloudRecommenderV1ValueMatcher> = Schema.suspend(() => Schema.Struct({
  matchesPattern: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommenderV1ValueMatcher" }) as any as Schema.Schema<GoogleCloudRecommenderV1ValueMatcher>;

export interface GoogleCloudRecommenderV1Operation {
  /** Type of this operation. Contains one of 'add', 'remove', 'replace', 'move', 'copy', 'test' and custom operations. This field is case-insensitive and always populated. */
  action?: string;
  /** Type of GCP resource being modified/tested. This field is always populated. Example: cloudresourcemanager.googleapis.com/Project, compute.googleapis.com/Instance */
  resourceType?: string;
  /** Contains the fully qualified resource name. This field is always populated. ex: //cloudresourcemanager.googleapis.com/projects/foo. */
  resource?: string;
  /** Path to the target field being operated on. If the operation is at the resource level, then path should be "/". This field is always populated. */
  path?: string;
  /** Can be set with action 'copy' to copy resource configuration across different resources of the same type. Example: A resource clone can be done via action = 'copy', path = "/", from = "/", source_resource = and resource_name = . This field is empty for all other values of `action`. */
  sourceResource?: string;
  /** Can be set with action 'copy' or 'move' to indicate the source field within resource or source_resource, ignored if provided for other operation types. */
  sourcePath?: string;
  /** Value for the `path` field. Will be set for actions:'add'/'replace'. Maybe set for action: 'test'. Either this or `value_matcher` will be set for 'test' operation. An exact match must be performed. */
  value?: unknown;
  /** Can be set for action 'test' for advanced matching for the value of 'path' field. Either this or `value` will be set for 'test' operation. */
  valueMatcher?: GoogleCloudRecommenderV1ValueMatcher;
  /** Set of filters to apply if `path` refers to array elements or nested array elements in order to narrow down to a single unique element that is being tested/modified. This is intended to be an exact match per filter. To perform advanced matching, use path_value_matchers. * Example: ``` { "/versions/* /name" : "it-123" "/versions/* /targetSize/percent": 20 } ``` * Example: ``` { "/bindings/* /role": "roles/owner" "/bindings/* /condition" : null } ``` * Example: ``` { "/bindings/* /role": "roles/owner" "/bindings/* /members/*" : ["x@example.com", "y@example.com"] } ``` When both path_filters and path_value_matchers are set, an implicit AND must be performed. */
  pathFilters?: Record<string, unknown>;
  /** Similar to path_filters, this contains set of filters to apply if `path` field refers to array elements. This is meant to support value matching beyond exact match. To perform exact match, use path_filters. When both path_filters and path_value_matchers are set, an implicit AND must be performed. */
  pathValueMatchers?: Record<string, GoogleCloudRecommenderV1ValueMatcher>;
}

export const GoogleCloudRecommenderV1Operation: Schema.Schema<GoogleCloudRecommenderV1Operation> = Schema.suspend(() => Schema.Struct({
  action: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  sourceResource: Schema.optional(Schema.String),
  sourcePath: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Unknown),
  valueMatcher: Schema.optional(GoogleCloudRecommenderV1ValueMatcher),
  pathFilters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  pathValueMatchers: Schema.optional(Schema.Record(Schema.String, GoogleCloudRecommenderV1ValueMatcher)),
})).annotate({ identifier: "GoogleCloudRecommenderV1Operation" }) as any as Schema.Schema<GoogleCloudRecommenderV1Operation>;

export interface GoogleCloudRecommenderV1OperationGroup {
  /** List of operations across one or more resources that belong to this group. Loosely based on RFC6902 and should be performed in the order they appear. */
  operations?: Array<GoogleCloudRecommenderV1Operation>;
}

export const GoogleCloudRecommenderV1OperationGroup: Schema.Schema<GoogleCloudRecommenderV1OperationGroup> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(GoogleCloudRecommenderV1Operation)),
})).annotate({ identifier: "GoogleCloudRecommenderV1OperationGroup" }) as any as Schema.Schema<GoogleCloudRecommenderV1OperationGroup>;

export interface GoogleCloudRecommenderV1RecommendationContent {
  /** Operations to one or more Google Cloud resources grouped in such a way that, all operations within one group are expected to be performed atomically and in an order. */
  operationGroups?: Array<GoogleCloudRecommenderV1OperationGroup>;
  /** Condensed overview information about the recommendation. */
  overview?: Record<string, unknown>;
}

export const GoogleCloudRecommenderV1RecommendationContent: Schema.Schema<GoogleCloudRecommenderV1RecommendationContent> = Schema.suspend(() => Schema.Struct({
  operationGroups: Schema.optional(Schema.Array(GoogleCloudRecommenderV1OperationGroup)),
  overview: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudRecommenderV1RecommendationContent" }) as any as Schema.Schema<GoogleCloudRecommenderV1RecommendationContent>;

export interface GoogleCloudRecommenderV1RecommendationStateInfo {
  /** The state of the recommendation, Eg ACTIVE, SUCCEEDED, FAILED. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CLAIMED" | "SUCCEEDED" | "FAILED" | "DISMISSED" | (string & {});
  /** A map of metadata for the state, provided by user or automations systems. */
  stateMetadata?: Record<string, string>;
}

export const GoogleCloudRecommenderV1RecommendationStateInfo: Schema.Schema<GoogleCloudRecommenderV1RecommendationStateInfo> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  stateMetadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudRecommenderV1RecommendationStateInfo" }) as any as Schema.Schema<GoogleCloudRecommenderV1RecommendationStateInfo>;

export interface GoogleCloudRecommenderV1RecommendationInsightReference {
  /** Insight resource name, e.g. projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/insights/[INSIGHT_ID] */
  insight?: string;
}

export const GoogleCloudRecommenderV1RecommendationInsightReference: Schema.Schema<GoogleCloudRecommenderV1RecommendationInsightReference> = Schema.suspend(() => Schema.Struct({
  insight: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommenderV1RecommendationInsightReference" }) as any as Schema.Schema<GoogleCloudRecommenderV1RecommendationInsightReference>;

export interface GoogleCloudRecommenderV1Recommendation {
  /** Identifier. Name of recommendation. */
  name?: string;
  /** Free-form human readable summary in English. The maximum length is 500 characters. */
  description?: string;
  /** Contains an identifier for a subtype of recommendations produced for the same recommender. Subtype is a function of content and impact, meaning a new subtype might be added when significant changes to `content` or `primary_impact.category` are introduced. See the Recommenders section to see a list of subtypes for a given Recommender. Examples: For recommender = "google.iam.policy.Recommender", recommender_subtype can be one of "REMOVE_ROLE"/"REPLACE_ROLE" */
  recommenderSubtype?: string;
  /** Last time this recommendation was refreshed by the system that created it in the first place. */
  lastRefreshTime?: string;
  /** The primary impact that this recommendation can have while trying to optimize for one category. */
  primaryImpact?: GoogleCloudRecommenderV1Impact;
  /** Optional set of additional impact that this recommendation may have when trying to optimize for the primary category. These may be positive or negative. */
  additionalImpact?: Array<GoogleCloudRecommenderV1Impact>;
  /** Recommendation's priority. */
  priority?: "PRIORITY_UNSPECIFIED" | "P4" | "P3" | "P2" | "P1" | (string & {});
  /** Content of the recommendation describing recommended changes to resources. */
  content?: GoogleCloudRecommenderV1RecommendationContent;
  /** Information for state. Contains state and metadata. */
  stateInfo?: GoogleCloudRecommenderV1RecommendationStateInfo;
  /** Fingerprint of the Recommendation. Provides optimistic locking when updating states. */
  etag?: string;
  /** Insights that led to this recommendation. */
  associatedInsights?: Array<GoogleCloudRecommenderV1RecommendationInsightReference>;
  /** Corresponds to a mutually exclusive group ID within a recommender. A non-empty ID indicates that the recommendation belongs to a mutually exclusive group. This means that only one recommendation within the group is suggested to be applied. */
  xorGroupId?: string;
  /** Fully qualified resource names that this recommendation is targeting. */
  targetResources?: Array<string>;
}

export const GoogleCloudRecommenderV1Recommendation: Schema.Schema<GoogleCloudRecommenderV1Recommendation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  recommenderSubtype: Schema.optional(Schema.String),
  lastRefreshTime: Schema.optional(Schema.String),
  primaryImpact: Schema.optional(GoogleCloudRecommenderV1Impact),
  additionalImpact: Schema.optional(Schema.Array(GoogleCloudRecommenderV1Impact)),
  priority: Schema.optional(Schema.String),
  content: Schema.optional(GoogleCloudRecommenderV1RecommendationContent),
  stateInfo: Schema.optional(GoogleCloudRecommenderV1RecommendationStateInfo),
  etag: Schema.optional(Schema.String),
  associatedInsights: Schema.optional(Schema.Array(GoogleCloudRecommenderV1RecommendationInsightReference)),
  xorGroupId: Schema.optional(Schema.String),
  targetResources: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRecommenderV1Recommendation" }) as any as Schema.Schema<GoogleCloudRecommenderV1Recommendation>;

export interface GoogleCloudRecommenderV1ListRecommendationsResponse {
  /** The set of recommendations for the `parent` resource. */
  recommendations?: Array<GoogleCloudRecommenderV1Recommendation>;
  /** A token that can be used to request the next page of results. This field is empty if there are no additional results. */
  nextPageToken?: string;
}

export const GoogleCloudRecommenderV1ListRecommendationsResponse: Schema.Schema<GoogleCloudRecommenderV1ListRecommendationsResponse> = Schema.suspend(() => Schema.Struct({
  recommendations: Schema.optional(Schema.Array(GoogleCloudRecommenderV1Recommendation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommenderV1ListRecommendationsResponse" }) as any as Schema.Schema<GoogleCloudRecommenderV1ListRecommendationsResponse>;

export interface GoogleCloudRecommenderV1MarkRecommendationDismissedRequest {
  /** Fingerprint of the Recommendation. Provides optimistic locking. */
  etag?: string;
}

export const GoogleCloudRecommenderV1MarkRecommendationDismissedRequest: Schema.Schema<GoogleCloudRecommenderV1MarkRecommendationDismissedRequest> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommenderV1MarkRecommendationDismissedRequest" }) as any as Schema.Schema<GoogleCloudRecommenderV1MarkRecommendationDismissedRequest>;

export interface GoogleCloudRecommenderV1MarkRecommendationClaimedRequest {
  /** State properties to include with this state. Overwrites any existing `state_metadata`. Keys must match the regex `/^a-z0-9{0,62}$/`. Values must match the regex `/^[a-zA-Z0-9_./-]{0,255}$/`. */
  stateMetadata?: Record<string, string>;
  /** Required. Fingerprint of the Recommendation. Provides optimistic locking. */
  etag?: string;
}

export const GoogleCloudRecommenderV1MarkRecommendationClaimedRequest: Schema.Schema<GoogleCloudRecommenderV1MarkRecommendationClaimedRequest> = Schema.suspend(() => Schema.Struct({
  stateMetadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommenderV1MarkRecommendationClaimedRequest" }) as any as Schema.Schema<GoogleCloudRecommenderV1MarkRecommendationClaimedRequest>;

export interface GoogleCloudRecommenderV1MarkRecommendationSucceededRequest {
  /** State properties to include with this state. Overwrites any existing `state_metadata`. Keys must match the regex `/^a-z0-9{0,62}$/`. Values must match the regex `/^[a-zA-Z0-9_./-]{0,255}$/`. */
  stateMetadata?: Record<string, string>;
  /** Required. Fingerprint of the Recommendation. Provides optimistic locking. */
  etag?: string;
}

export const GoogleCloudRecommenderV1MarkRecommendationSucceededRequest: Schema.Schema<GoogleCloudRecommenderV1MarkRecommendationSucceededRequest> = Schema.suspend(() => Schema.Struct({
  stateMetadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommenderV1MarkRecommendationSucceededRequest" }) as any as Schema.Schema<GoogleCloudRecommenderV1MarkRecommendationSucceededRequest>;

export interface GoogleCloudRecommenderV1MarkRecommendationFailedRequest {
  /** State properties to include with this state. Overwrites any existing `state_metadata`. Keys must match the regex `/^a-z0-9{0,62}$/`. Values must match the regex `/^[a-zA-Z0-9_./-]{0,255}$/`. */
  stateMetadata?: Record<string, string>;
  /** Required. Fingerprint of the Recommendation. Provides optimistic locking. */
  etag?: string;
}

export const GoogleCloudRecommenderV1MarkRecommendationFailedRequest: Schema.Schema<GoogleCloudRecommenderV1MarkRecommendationFailedRequest> = Schema.suspend(() => Schema.Struct({
  stateMetadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommenderV1MarkRecommendationFailedRequest" }) as any as Schema.Schema<GoogleCloudRecommenderV1MarkRecommendationFailedRequest>;

export interface GoogleCloudRecommenderV1RecommenderGenerationConfig {
  /** Parameters for this RecommenderGenerationConfig. These configs can be used by or are applied to all subtypes. */
  params?: Record<string, unknown>;
}

export const GoogleCloudRecommenderV1RecommenderGenerationConfig: Schema.Schema<GoogleCloudRecommenderV1RecommenderGenerationConfig> = Schema.suspend(() => Schema.Struct({
  params: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudRecommenderV1RecommenderGenerationConfig" }) as any as Schema.Schema<GoogleCloudRecommenderV1RecommenderGenerationConfig>;

export interface GoogleCloudRecommenderV1RecommenderConfig {
  /** Identifier. Name of recommender config. Eg, projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config */
  name?: string;
  /** RecommenderGenerationConfig which configures the Generation of recommendations for this recommender. */
  recommenderGenerationConfig?: GoogleCloudRecommenderV1RecommenderGenerationConfig;
  /** Fingerprint of the RecommenderConfig. Provides optimistic locking when updating. */
  etag?: string;
  /** Last time when the config was updated. */
  updateTime?: string;
  /** Output only. Immutable. The revision ID of the config. A new revision is committed whenever the config is changed in any way. The format is an 8-character hexadecimal string. */
  revisionId?: string;
  /** Allows clients to store small amounts of arbitrary data. Annotations must follow the Kubernetes syntax. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between. */
  annotations?: Record<string, string>;
  /** A user-settable field to provide a human-readable name to be used in user interfaces. */
  displayName?: string;
}

export const GoogleCloudRecommenderV1RecommenderConfig: Schema.Schema<GoogleCloudRecommenderV1RecommenderConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  recommenderGenerationConfig: Schema.optional(GoogleCloudRecommenderV1RecommenderGenerationConfig),
  etag: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommenderV1RecommenderConfig" }) as any as Schema.Schema<GoogleCloudRecommenderV1RecommenderConfig>;

export interface GoogleCloudRecommenderV1InsightTypeGenerationConfig {
  /** Parameters for this InsightTypeGenerationConfig. These configs can be used by or are applied to all subtypes. */
  params?: Record<string, unknown>;
}

export const GoogleCloudRecommenderV1InsightTypeGenerationConfig: Schema.Schema<GoogleCloudRecommenderV1InsightTypeGenerationConfig> = Schema.suspend(() => Schema.Struct({
  params: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudRecommenderV1InsightTypeGenerationConfig" }) as any as Schema.Schema<GoogleCloudRecommenderV1InsightTypeGenerationConfig>;

export interface GoogleCloudRecommenderV1InsightTypeConfig {
  /** Identifier. Name of insight type config. Eg, projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config */
  name?: string;
  /** InsightTypeGenerationConfig which configures the generation of insights for this insight type. */
  insightTypeGenerationConfig?: GoogleCloudRecommenderV1InsightTypeGenerationConfig;
  /** Fingerprint of the InsightTypeConfig. Provides optimistic locking when updating. */
  etag?: string;
  /** Last time when the config was updated. */
  updateTime?: string;
  /** Output only. Immutable. The revision ID of the config. A new revision is committed whenever the config is changed in any way. The format is an 8-character hexadecimal string. */
  revisionId?: string;
  /** Allows clients to store small amounts of arbitrary data. Annotations must follow the Kubernetes syntax. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between. */
  annotations?: Record<string, string>;
  /** A user-settable field to provide a human-readable name to be used in user interfaces. */
  displayName?: string;
}

export const GoogleCloudRecommenderV1InsightTypeConfig: Schema.Schema<GoogleCloudRecommenderV1InsightTypeConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  insightTypeGenerationConfig: Schema.optional(GoogleCloudRecommenderV1InsightTypeGenerationConfig),
  etag: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRecommenderV1InsightTypeConfig" }) as any as Schema.Schema<GoogleCloudRecommenderV1InsightTypeConfig>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetConfigProjectsLocationsRecommendersRequest {
  /** Required. Name of the Recommendation Config to get. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` * `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` */
  name: string;
}

export const GetConfigProjectsLocationsRecommendersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/recommenders/{recommendersId}/config" }),
  svc,
) as unknown as Schema.Schema<GetConfigProjectsLocationsRecommendersRequest>;

export type GetConfigProjectsLocationsRecommendersResponse = GoogleCloudRecommenderV1RecommenderConfig;
export const GetConfigProjectsLocationsRecommendersResponse = GoogleCloudRecommenderV1RecommenderConfig;

export type GetConfigProjectsLocationsRecommendersError = DefaultErrors;

/** Gets the requested Recommender Config. There is only one instance of the config for each Recommender. */
export const getConfigProjectsLocationsRecommenders: API.OperationMethod<GetConfigProjectsLocationsRecommendersRequest, GetConfigProjectsLocationsRecommendersResponse, GetConfigProjectsLocationsRecommendersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetConfigProjectsLocationsRecommendersRequest,
  output: GetConfigProjectsLocationsRecommendersResponse,
  errors: [],
}));

export interface UpdateConfigProjectsLocationsRecommendersRequest {
  /** Identifier. Name of recommender config. Eg, projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config */
  name: string;
  /** The list of fields to be updated. */
  updateMask?: string;
  /** If true, validate the request and preview the change, but do not actually update it. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudRecommenderV1RecommenderConfig;
}

export const UpdateConfigProjectsLocationsRecommendersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudRecommenderV1RecommenderConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/recommenders/{recommendersId}/config", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateConfigProjectsLocationsRecommendersRequest>;

export type UpdateConfigProjectsLocationsRecommendersResponse = GoogleCloudRecommenderV1RecommenderConfig;
export const UpdateConfigProjectsLocationsRecommendersResponse = GoogleCloudRecommenderV1RecommenderConfig;

export type UpdateConfigProjectsLocationsRecommendersError = DefaultErrors;

/** Updates a Recommender Config. This will create a new revision of the config. */
export const updateConfigProjectsLocationsRecommenders: API.OperationMethod<UpdateConfigProjectsLocationsRecommendersRequest, UpdateConfigProjectsLocationsRecommendersResponse, UpdateConfigProjectsLocationsRecommendersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateConfigProjectsLocationsRecommendersRequest,
  output: UpdateConfigProjectsLocationsRecommendersResponse,
  errors: [],
}));

export interface ListProjectsLocationsRecommendersRecommendationsRequest {
  /** Required. The container resource on which to execute the request. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `folders/[FOLDER_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ RECOMMENDER_ID refers to supported recommenders: https://cloud.google.com/recommender/docs/recommenders. */
  parent: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. If not specified, the server will determine the number of results to return. */
  pageSize?: number;
  /** Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters must be identical to those in the previous call. */
  pageToken?: string;
  /** Filter expression to restrict the recommendations returned. Supported filter fields: * `state_info.state` * `recommenderSubtype` * `priority` * `targetResources` Examples: * `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` * `recommenderSubtype = REMOVE_ROLE OR recommenderSubtype = REPLACE_ROLE` * `priority = P1 OR priority = P2` * `targetResources : //compute.googleapis.com/projects/1234/zones/us-central1-a/instances/instance-1` * `stateInfo.state = ACTIVE AND (priority = P1 OR priority = P2)` The max allowed filter length is 500 characters. (These expressions are based on the filter language described at https://google.aip.dev/160) */
  filter?: string;
}

export const ListProjectsLocationsRecommendersRecommendationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRecommendersRecommendationsRequest>;

export type ListProjectsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1ListRecommendationsResponse;
export const ListProjectsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1ListRecommendationsResponse;

export type ListProjectsLocationsRecommendersRecommendationsError = DefaultErrors;

/** Lists recommendations for the specified Cloud Resource. Requires the recommender.*.list IAM permission for the specified recommender. */
export const listProjectsLocationsRecommendersRecommendations: API.PaginatedOperationMethod<ListProjectsLocationsRecommendersRecommendationsRequest, ListProjectsLocationsRecommendersRecommendationsResponse, ListProjectsLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsRecommendersRecommendationsRequest,
  output: ListProjectsLocationsRecommendersRecommendationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRecommendersRecommendationsRequest {
  /** Required. Name of the recommendation. */
  name: string;
}

export const GetProjectsLocationsRecommendersRecommendationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations/{recommendationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRecommendersRecommendationsRequest>;

export type GetProjectsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;
export const GetProjectsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;

export type GetProjectsLocationsRecommendersRecommendationsError = DefaultErrors;

/** Gets the requested recommendation. Requires the recommender.*.get IAM permission for the specified recommender. */
export const getProjectsLocationsRecommendersRecommendations: API.OperationMethod<GetProjectsLocationsRecommendersRecommendationsRequest, GetProjectsLocationsRecommendersRecommendationsResponse, GetProjectsLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRecommendersRecommendationsRequest,
  output: GetProjectsLocationsRecommendersRecommendationsResponse,
  errors: [],
}));

export interface MarkDismissedProjectsLocationsRecommendersRecommendationsRequest {
  /** Required. Name of the recommendation. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecommenderV1MarkRecommendationDismissedRequest;
}

export const MarkDismissedProjectsLocationsRecommendersRecommendationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommenderV1MarkRecommendationDismissedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations/{recommendationsId}:markDismissed", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkDismissedProjectsLocationsRecommendersRecommendationsRequest>;

export type MarkDismissedProjectsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;
export const MarkDismissedProjectsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;

export type MarkDismissedProjectsLocationsRecommendersRecommendationsError = DefaultErrors;

/** Mark the Recommendation State as Dismissed. Users can use this method to indicate to the Recommender API that an ACTIVE recommendation has to be marked back as DISMISSED. MarkRecommendationDismissed can be applied to recommendations in ACTIVE state. Requires the recommender.*.update IAM permission for the specified recommender. */
export const markDismissedProjectsLocationsRecommendersRecommendations: API.OperationMethod<MarkDismissedProjectsLocationsRecommendersRecommendationsRequest, MarkDismissedProjectsLocationsRecommendersRecommendationsResponse, MarkDismissedProjectsLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MarkDismissedProjectsLocationsRecommendersRecommendationsRequest,
  output: MarkDismissedProjectsLocationsRecommendersRecommendationsResponse,
  errors: [],
}));

export interface MarkClaimedProjectsLocationsRecommendersRecommendationsRequest {
  /** Required. Name of the recommendation. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecommenderV1MarkRecommendationClaimedRequest;
}

export const MarkClaimedProjectsLocationsRecommendersRecommendationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommenderV1MarkRecommendationClaimedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations/{recommendationsId}:markClaimed", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkClaimedProjectsLocationsRecommendersRecommendationsRequest>;

export type MarkClaimedProjectsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;
export const MarkClaimedProjectsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;

export type MarkClaimedProjectsLocationsRecommendersRecommendationsError = DefaultErrors;

/** Marks the Recommendation State as Claimed. Users can use this method to indicate to the Recommender API that they are starting to apply the recommendation themselves. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationClaimed can be applied to recommendations in CLAIMED, SUCCEEDED, FAILED, or ACTIVE state. Requires the recommender.*.update IAM permission for the specified recommender. */
export const markClaimedProjectsLocationsRecommendersRecommendations: API.OperationMethod<MarkClaimedProjectsLocationsRecommendersRecommendationsRequest, MarkClaimedProjectsLocationsRecommendersRecommendationsResponse, MarkClaimedProjectsLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MarkClaimedProjectsLocationsRecommendersRecommendationsRequest,
  output: MarkClaimedProjectsLocationsRecommendersRecommendationsResponse,
  errors: [],
}));

export interface MarkSucceededProjectsLocationsRecommendersRecommendationsRequest {
  /** Required. Name of the recommendation. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecommenderV1MarkRecommendationSucceededRequest;
}

export const MarkSucceededProjectsLocationsRecommendersRecommendationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommenderV1MarkRecommendationSucceededRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations/{recommendationsId}:markSucceeded", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkSucceededProjectsLocationsRecommendersRecommendationsRequest>;

export type MarkSucceededProjectsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;
export const MarkSucceededProjectsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;

export type MarkSucceededProjectsLocationsRecommendersRecommendationsError = DefaultErrors;

/** Marks the Recommendation State as Succeeded. Users can use this method to indicate to the Recommender API that they have applied the recommendation themselves, and the operation was successful. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationSucceeded can be applied to recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires the recommender.*.update IAM permission for the specified recommender. */
export const markSucceededProjectsLocationsRecommendersRecommendations: API.OperationMethod<MarkSucceededProjectsLocationsRecommendersRecommendationsRequest, MarkSucceededProjectsLocationsRecommendersRecommendationsResponse, MarkSucceededProjectsLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MarkSucceededProjectsLocationsRecommendersRecommendationsRequest,
  output: MarkSucceededProjectsLocationsRecommendersRecommendationsResponse,
  errors: [],
}));

export interface MarkFailedProjectsLocationsRecommendersRecommendationsRequest {
  /** Required. Name of the recommendation. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecommenderV1MarkRecommendationFailedRequest;
}

export const MarkFailedProjectsLocationsRecommendersRecommendationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommenderV1MarkRecommendationFailedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations/{recommendationsId}:markFailed", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkFailedProjectsLocationsRecommendersRecommendationsRequest>;

export type MarkFailedProjectsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;
export const MarkFailedProjectsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;

export type MarkFailedProjectsLocationsRecommendersRecommendationsError = DefaultErrors;

/** Marks the Recommendation State as Failed. Users can use this method to indicate to the Recommender API that they have applied the recommendation themselves, and the operation failed. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationFailed can be applied to recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires the recommender.*.update IAM permission for the specified recommender. */
export const markFailedProjectsLocationsRecommendersRecommendations: API.OperationMethod<MarkFailedProjectsLocationsRecommendersRecommendationsRequest, MarkFailedProjectsLocationsRecommendersRecommendationsResponse, MarkFailedProjectsLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MarkFailedProjectsLocationsRecommendersRecommendationsRequest,
  output: MarkFailedProjectsLocationsRecommendersRecommendationsResponse,
  errors: [],
}));

export interface GetConfigProjectsLocationsInsightTypesRequest {
  /** Required. Name of the InsightTypeConfig to get. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` * `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` */
  name: string;
}

export const GetConfigProjectsLocationsInsightTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/insightTypes/{insightTypesId}/config" }),
  svc,
) as unknown as Schema.Schema<GetConfigProjectsLocationsInsightTypesRequest>;

export type GetConfigProjectsLocationsInsightTypesResponse = GoogleCloudRecommenderV1InsightTypeConfig;
export const GetConfigProjectsLocationsInsightTypesResponse = GoogleCloudRecommenderV1InsightTypeConfig;

export type GetConfigProjectsLocationsInsightTypesError = DefaultErrors;

/** Gets the requested InsightTypeConfig. There is only one instance of the config for each InsightType. */
export const getConfigProjectsLocationsInsightTypes: API.OperationMethod<GetConfigProjectsLocationsInsightTypesRequest, GetConfigProjectsLocationsInsightTypesResponse, GetConfigProjectsLocationsInsightTypesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetConfigProjectsLocationsInsightTypesRequest,
  output: GetConfigProjectsLocationsInsightTypesResponse,
  errors: [],
}));

export interface UpdateConfigProjectsLocationsInsightTypesRequest {
  /** Identifier. Name of insight type config. Eg, projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config */
  name: string;
  /** The list of fields to be updated. */
  updateMask?: string;
  /** If true, validate the request and preview the change, but do not actually update it. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudRecommenderV1InsightTypeConfig;
}

export const UpdateConfigProjectsLocationsInsightTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudRecommenderV1InsightTypeConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/insightTypes/{insightTypesId}/config", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateConfigProjectsLocationsInsightTypesRequest>;

export type UpdateConfigProjectsLocationsInsightTypesResponse = GoogleCloudRecommenderV1InsightTypeConfig;
export const UpdateConfigProjectsLocationsInsightTypesResponse = GoogleCloudRecommenderV1InsightTypeConfig;

export type UpdateConfigProjectsLocationsInsightTypesError = DefaultErrors;

/** Updates an InsightTypeConfig change. This will create a new revision of the config. */
export const updateConfigProjectsLocationsInsightTypes: API.OperationMethod<UpdateConfigProjectsLocationsInsightTypesRequest, UpdateConfigProjectsLocationsInsightTypesResponse, UpdateConfigProjectsLocationsInsightTypesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateConfigProjectsLocationsInsightTypesRequest,
  output: UpdateConfigProjectsLocationsInsightTypesResponse,
  errors: [],
}));

export interface ListProjectsLocationsInsightTypesInsightsRequest {
  /** Required. The container resource on which to execute the request. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `folders/[FOLDER_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ INSIGHT_TYPE_ID refers to supported insight types: https://cloud.google.com/recommender/docs/insights/insight-types. */
  parent: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. If not specified, the server will determine the number of results to return. */
  pageSize?: number;
  /** Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters must be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. Filter expression to restrict the insights returned. Supported filter fields: * `stateInfo.state` * `insightSubtype` * `severity` * `targetResources` Examples: * `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` * `insightSubtype = PERMISSIONS_USAGE` * `severity = CRITICAL OR severity = HIGH` * `targetResources : //compute.googleapis.com/projects/1234/zones/us-central1-a/instances/instance-1` * `stateInfo.state = ACTIVE AND (severity = CRITICAL OR severity = HIGH)` The max allowed filter length is 500 characters. (These expressions are based on the filter language described at https://google.aip.dev/160) */
  filter?: string;
}

export const ListProjectsLocationsInsightTypesInsightsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/insightTypes/{insightTypesId}/insights" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInsightTypesInsightsRequest>;

export type ListProjectsLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1ListInsightsResponse;
export const ListProjectsLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1ListInsightsResponse;

export type ListProjectsLocationsInsightTypesInsightsError = DefaultErrors;

/** Lists insights for the specified Cloud Resource. Requires the recommender.*.list IAM permission for the specified insight type. */
export const listProjectsLocationsInsightTypesInsights: API.PaginatedOperationMethod<ListProjectsLocationsInsightTypesInsightsRequest, ListProjectsLocationsInsightTypesInsightsResponse, ListProjectsLocationsInsightTypesInsightsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsInsightTypesInsightsRequest,
  output: ListProjectsLocationsInsightTypesInsightsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsInsightTypesInsightsRequest {
  /** Required. Name of the insight. */
  name: string;
}

export const GetProjectsLocationsInsightTypesInsightsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/insightTypes/{insightTypesId}/insights/{insightsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsInsightTypesInsightsRequest>;

export type GetProjectsLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1Insight;
export const GetProjectsLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1Insight;

export type GetProjectsLocationsInsightTypesInsightsError = DefaultErrors;

/** Gets the requested insight. Requires the recommender.*.get IAM permission for the specified insight type. */
export const getProjectsLocationsInsightTypesInsights: API.OperationMethod<GetProjectsLocationsInsightTypesInsightsRequest, GetProjectsLocationsInsightTypesInsightsResponse, GetProjectsLocationsInsightTypesInsightsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsInsightTypesInsightsRequest,
  output: GetProjectsLocationsInsightTypesInsightsResponse,
  errors: [],
}));

export interface MarkAcceptedProjectsLocationsInsightTypesInsightsRequest {
  /** Required. Name of the insight. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecommenderV1MarkInsightAcceptedRequest;
}

export const MarkAcceptedProjectsLocationsInsightTypesInsightsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommenderV1MarkInsightAcceptedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/insightTypes/{insightTypesId}/insights/{insightsId}:markAccepted", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkAcceptedProjectsLocationsInsightTypesInsightsRequest>;

export type MarkAcceptedProjectsLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1Insight;
export const MarkAcceptedProjectsLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1Insight;

export type MarkAcceptedProjectsLocationsInsightTypesInsightsError = DefaultErrors;

/** Marks the Insight State as Accepted. Users can use this method to indicate to the Recommender API that they have applied some action based on the insight. This stops the insight content from being updated. MarkInsightAccepted can be applied to insights in ACTIVE state. Requires the recommender.*.update IAM permission for the specified insight. */
export const markAcceptedProjectsLocationsInsightTypesInsights: API.OperationMethod<MarkAcceptedProjectsLocationsInsightTypesInsightsRequest, MarkAcceptedProjectsLocationsInsightTypesInsightsResponse, MarkAcceptedProjectsLocationsInsightTypesInsightsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MarkAcceptedProjectsLocationsInsightTypesInsightsRequest,
  output: MarkAcceptedProjectsLocationsInsightTypesInsightsResponse,
  errors: [],
}));

export interface GetConfigBillingAccountsLocationsRecommendersRequest {
  /** Required. Name of the Recommendation Config to get. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` * `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` */
  name: string;
}

export const GetConfigBillingAccountsLocationsRecommendersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/billingAccounts/{billingAccountsId}/locations/{locationsId}/recommenders/{recommendersId}/config" }),
  svc,
) as unknown as Schema.Schema<GetConfigBillingAccountsLocationsRecommendersRequest>;

export type GetConfigBillingAccountsLocationsRecommendersResponse = GoogleCloudRecommenderV1RecommenderConfig;
export const GetConfigBillingAccountsLocationsRecommendersResponse = GoogleCloudRecommenderV1RecommenderConfig;

export type GetConfigBillingAccountsLocationsRecommendersError = DefaultErrors;

/** Gets the requested Recommender Config. There is only one instance of the config for each Recommender. */
export const getConfigBillingAccountsLocationsRecommenders: API.OperationMethod<GetConfigBillingAccountsLocationsRecommendersRequest, GetConfigBillingAccountsLocationsRecommendersResponse, GetConfigBillingAccountsLocationsRecommendersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetConfigBillingAccountsLocationsRecommendersRequest,
  output: GetConfigBillingAccountsLocationsRecommendersResponse,
  errors: [],
}));

export interface UpdateConfigBillingAccountsLocationsRecommendersRequest {
  /** Identifier. Name of recommender config. Eg, projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config */
  name: string;
  /** The list of fields to be updated. */
  updateMask?: string;
  /** If true, validate the request and preview the change, but do not actually update it. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudRecommenderV1RecommenderConfig;
}

export const UpdateConfigBillingAccountsLocationsRecommendersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudRecommenderV1RecommenderConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/billingAccounts/{billingAccountsId}/locations/{locationsId}/recommenders/{recommendersId}/config", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateConfigBillingAccountsLocationsRecommendersRequest>;

export type UpdateConfigBillingAccountsLocationsRecommendersResponse = GoogleCloudRecommenderV1RecommenderConfig;
export const UpdateConfigBillingAccountsLocationsRecommendersResponse = GoogleCloudRecommenderV1RecommenderConfig;

export type UpdateConfigBillingAccountsLocationsRecommendersError = DefaultErrors;

/** Updates a Recommender Config. This will create a new revision of the config. */
export const updateConfigBillingAccountsLocationsRecommenders: API.OperationMethod<UpdateConfigBillingAccountsLocationsRecommendersRequest, UpdateConfigBillingAccountsLocationsRecommendersResponse, UpdateConfigBillingAccountsLocationsRecommendersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateConfigBillingAccountsLocationsRecommendersRequest,
  output: UpdateConfigBillingAccountsLocationsRecommendersResponse,
  errors: [],
}));

export interface ListBillingAccountsLocationsRecommendersRecommendationsRequest {
  /** Required. The container resource on which to execute the request. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `folders/[FOLDER_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ RECOMMENDER_ID refers to supported recommenders: https://cloud.google.com/recommender/docs/recommenders. */
  parent: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. If not specified, the server will determine the number of results to return. */
  pageSize?: number;
  /** Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters must be identical to those in the previous call. */
  pageToken?: string;
  /** Filter expression to restrict the recommendations returned. Supported filter fields: * `state_info.state` * `recommenderSubtype` * `priority` * `targetResources` Examples: * `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` * `recommenderSubtype = REMOVE_ROLE OR recommenderSubtype = REPLACE_ROLE` * `priority = P1 OR priority = P2` * `targetResources : //compute.googleapis.com/projects/1234/zones/us-central1-a/instances/instance-1` * `stateInfo.state = ACTIVE AND (priority = P1 OR priority = P2)` The max allowed filter length is 500 characters. (These expressions are based on the filter language described at https://google.aip.dev/160) */
  filter?: string;
}

export const ListBillingAccountsLocationsRecommendersRecommendationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/billingAccounts/{billingAccountsId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations" }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsLocationsRecommendersRecommendationsRequest>;

export type ListBillingAccountsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1ListRecommendationsResponse;
export const ListBillingAccountsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1ListRecommendationsResponse;

export type ListBillingAccountsLocationsRecommendersRecommendationsError = DefaultErrors;

/** Lists recommendations for the specified Cloud Resource. Requires the recommender.*.list IAM permission for the specified recommender. */
export const listBillingAccountsLocationsRecommendersRecommendations: API.PaginatedOperationMethod<ListBillingAccountsLocationsRecommendersRecommendationsRequest, ListBillingAccountsLocationsRecommendersRecommendationsResponse, ListBillingAccountsLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListBillingAccountsLocationsRecommendersRecommendationsRequest,
  output: ListBillingAccountsLocationsRecommendersRecommendationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetBillingAccountsLocationsRecommendersRecommendationsRequest {
  /** Required. Name of the recommendation. */
  name: string;
}

export const GetBillingAccountsLocationsRecommendersRecommendationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/billingAccounts/{billingAccountsId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations/{recommendationsId}" }),
  svc,
) as unknown as Schema.Schema<GetBillingAccountsLocationsRecommendersRecommendationsRequest>;

export type GetBillingAccountsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;
export const GetBillingAccountsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;

export type GetBillingAccountsLocationsRecommendersRecommendationsError = DefaultErrors;

/** Gets the requested recommendation. Requires the recommender.*.get IAM permission for the specified recommender. */
export const getBillingAccountsLocationsRecommendersRecommendations: API.OperationMethod<GetBillingAccountsLocationsRecommendersRecommendationsRequest, GetBillingAccountsLocationsRecommendersRecommendationsResponse, GetBillingAccountsLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetBillingAccountsLocationsRecommendersRecommendationsRequest,
  output: GetBillingAccountsLocationsRecommendersRecommendationsResponse,
  errors: [],
}));

export interface MarkDismissedBillingAccountsLocationsRecommendersRecommendationsRequest {
  /** Required. Name of the recommendation. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecommenderV1MarkRecommendationDismissedRequest;
}

export const MarkDismissedBillingAccountsLocationsRecommendersRecommendationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommenderV1MarkRecommendationDismissedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/billingAccounts/{billingAccountsId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations/{recommendationsId}:markDismissed", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkDismissedBillingAccountsLocationsRecommendersRecommendationsRequest>;

export type MarkDismissedBillingAccountsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;
export const MarkDismissedBillingAccountsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;

export type MarkDismissedBillingAccountsLocationsRecommendersRecommendationsError = DefaultErrors;

/** Mark the Recommendation State as Dismissed. Users can use this method to indicate to the Recommender API that an ACTIVE recommendation has to be marked back as DISMISSED. MarkRecommendationDismissed can be applied to recommendations in ACTIVE state. Requires the recommender.*.update IAM permission for the specified recommender. */
export const markDismissedBillingAccountsLocationsRecommendersRecommendations: API.OperationMethod<MarkDismissedBillingAccountsLocationsRecommendersRecommendationsRequest, MarkDismissedBillingAccountsLocationsRecommendersRecommendationsResponse, MarkDismissedBillingAccountsLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MarkDismissedBillingAccountsLocationsRecommendersRecommendationsRequest,
  output: MarkDismissedBillingAccountsLocationsRecommendersRecommendationsResponse,
  errors: [],
}));

export interface MarkClaimedBillingAccountsLocationsRecommendersRecommendationsRequest {
  /** Required. Name of the recommendation. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecommenderV1MarkRecommendationClaimedRequest;
}

export const MarkClaimedBillingAccountsLocationsRecommendersRecommendationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommenderV1MarkRecommendationClaimedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/billingAccounts/{billingAccountsId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations/{recommendationsId}:markClaimed", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkClaimedBillingAccountsLocationsRecommendersRecommendationsRequest>;

export type MarkClaimedBillingAccountsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;
export const MarkClaimedBillingAccountsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;

export type MarkClaimedBillingAccountsLocationsRecommendersRecommendationsError = DefaultErrors;

/** Marks the Recommendation State as Claimed. Users can use this method to indicate to the Recommender API that they are starting to apply the recommendation themselves. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationClaimed can be applied to recommendations in CLAIMED, SUCCEEDED, FAILED, or ACTIVE state. Requires the recommender.*.update IAM permission for the specified recommender. */
export const markClaimedBillingAccountsLocationsRecommendersRecommendations: API.OperationMethod<MarkClaimedBillingAccountsLocationsRecommendersRecommendationsRequest, MarkClaimedBillingAccountsLocationsRecommendersRecommendationsResponse, MarkClaimedBillingAccountsLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MarkClaimedBillingAccountsLocationsRecommendersRecommendationsRequest,
  output: MarkClaimedBillingAccountsLocationsRecommendersRecommendationsResponse,
  errors: [],
}));

export interface MarkSucceededBillingAccountsLocationsRecommendersRecommendationsRequest {
  /** Required. Name of the recommendation. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecommenderV1MarkRecommendationSucceededRequest;
}

export const MarkSucceededBillingAccountsLocationsRecommendersRecommendationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommenderV1MarkRecommendationSucceededRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/billingAccounts/{billingAccountsId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations/{recommendationsId}:markSucceeded", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkSucceededBillingAccountsLocationsRecommendersRecommendationsRequest>;

export type MarkSucceededBillingAccountsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;
export const MarkSucceededBillingAccountsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;

export type MarkSucceededBillingAccountsLocationsRecommendersRecommendationsError = DefaultErrors;

/** Marks the Recommendation State as Succeeded. Users can use this method to indicate to the Recommender API that they have applied the recommendation themselves, and the operation was successful. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationSucceeded can be applied to recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires the recommender.*.update IAM permission for the specified recommender. */
export const markSucceededBillingAccountsLocationsRecommendersRecommendations: API.OperationMethod<MarkSucceededBillingAccountsLocationsRecommendersRecommendationsRequest, MarkSucceededBillingAccountsLocationsRecommendersRecommendationsResponse, MarkSucceededBillingAccountsLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MarkSucceededBillingAccountsLocationsRecommendersRecommendationsRequest,
  output: MarkSucceededBillingAccountsLocationsRecommendersRecommendationsResponse,
  errors: [],
}));

export interface MarkFailedBillingAccountsLocationsRecommendersRecommendationsRequest {
  /** Required. Name of the recommendation. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecommenderV1MarkRecommendationFailedRequest;
}

export const MarkFailedBillingAccountsLocationsRecommendersRecommendationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommenderV1MarkRecommendationFailedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/billingAccounts/{billingAccountsId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations/{recommendationsId}:markFailed", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkFailedBillingAccountsLocationsRecommendersRecommendationsRequest>;

export type MarkFailedBillingAccountsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;
export const MarkFailedBillingAccountsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;

export type MarkFailedBillingAccountsLocationsRecommendersRecommendationsError = DefaultErrors;

/** Marks the Recommendation State as Failed. Users can use this method to indicate to the Recommender API that they have applied the recommendation themselves, and the operation failed. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationFailed can be applied to recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires the recommender.*.update IAM permission for the specified recommender. */
export const markFailedBillingAccountsLocationsRecommendersRecommendations: API.OperationMethod<MarkFailedBillingAccountsLocationsRecommendersRecommendationsRequest, MarkFailedBillingAccountsLocationsRecommendersRecommendationsResponse, MarkFailedBillingAccountsLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MarkFailedBillingAccountsLocationsRecommendersRecommendationsRequest,
  output: MarkFailedBillingAccountsLocationsRecommendersRecommendationsResponse,
  errors: [],
}));

export interface GetConfigBillingAccountsLocationsInsightTypesRequest {
  /** Required. Name of the InsightTypeConfig to get. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` * `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` */
  name: string;
}

export const GetConfigBillingAccountsLocationsInsightTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/billingAccounts/{billingAccountsId}/locations/{locationsId}/insightTypes/{insightTypesId}/config" }),
  svc,
) as unknown as Schema.Schema<GetConfigBillingAccountsLocationsInsightTypesRequest>;

export type GetConfigBillingAccountsLocationsInsightTypesResponse = GoogleCloudRecommenderV1InsightTypeConfig;
export const GetConfigBillingAccountsLocationsInsightTypesResponse = GoogleCloudRecommenderV1InsightTypeConfig;

export type GetConfigBillingAccountsLocationsInsightTypesError = DefaultErrors;

/** Gets the requested InsightTypeConfig. There is only one instance of the config for each InsightType. */
export const getConfigBillingAccountsLocationsInsightTypes: API.OperationMethod<GetConfigBillingAccountsLocationsInsightTypesRequest, GetConfigBillingAccountsLocationsInsightTypesResponse, GetConfigBillingAccountsLocationsInsightTypesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetConfigBillingAccountsLocationsInsightTypesRequest,
  output: GetConfigBillingAccountsLocationsInsightTypesResponse,
  errors: [],
}));

export interface UpdateConfigBillingAccountsLocationsInsightTypesRequest {
  /** Identifier. Name of insight type config. Eg, projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config */
  name: string;
  /** The list of fields to be updated. */
  updateMask?: string;
  /** If true, validate the request and preview the change, but do not actually update it. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudRecommenderV1InsightTypeConfig;
}

export const UpdateConfigBillingAccountsLocationsInsightTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudRecommenderV1InsightTypeConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/billingAccounts/{billingAccountsId}/locations/{locationsId}/insightTypes/{insightTypesId}/config", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateConfigBillingAccountsLocationsInsightTypesRequest>;

export type UpdateConfigBillingAccountsLocationsInsightTypesResponse = GoogleCloudRecommenderV1InsightTypeConfig;
export const UpdateConfigBillingAccountsLocationsInsightTypesResponse = GoogleCloudRecommenderV1InsightTypeConfig;

export type UpdateConfigBillingAccountsLocationsInsightTypesError = DefaultErrors;

/** Updates an InsightTypeConfig change. This will create a new revision of the config. */
export const updateConfigBillingAccountsLocationsInsightTypes: API.OperationMethod<UpdateConfigBillingAccountsLocationsInsightTypesRequest, UpdateConfigBillingAccountsLocationsInsightTypesResponse, UpdateConfigBillingAccountsLocationsInsightTypesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateConfigBillingAccountsLocationsInsightTypesRequest,
  output: UpdateConfigBillingAccountsLocationsInsightTypesResponse,
  errors: [],
}));

export interface ListBillingAccountsLocationsInsightTypesInsightsRequest {
  /** Required. The container resource on which to execute the request. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `folders/[FOLDER_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ INSIGHT_TYPE_ID refers to supported insight types: https://cloud.google.com/recommender/docs/insights/insight-types. */
  parent: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. If not specified, the server will determine the number of results to return. */
  pageSize?: number;
  /** Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters must be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. Filter expression to restrict the insights returned. Supported filter fields: * `stateInfo.state` * `insightSubtype` * `severity` * `targetResources` Examples: * `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` * `insightSubtype = PERMISSIONS_USAGE` * `severity = CRITICAL OR severity = HIGH` * `targetResources : //compute.googleapis.com/projects/1234/zones/us-central1-a/instances/instance-1` * `stateInfo.state = ACTIVE AND (severity = CRITICAL OR severity = HIGH)` The max allowed filter length is 500 characters. (These expressions are based on the filter language described at https://google.aip.dev/160) */
  filter?: string;
}

export const ListBillingAccountsLocationsInsightTypesInsightsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/billingAccounts/{billingAccountsId}/locations/{locationsId}/insightTypes/{insightTypesId}/insights" }),
  svc,
) as unknown as Schema.Schema<ListBillingAccountsLocationsInsightTypesInsightsRequest>;

export type ListBillingAccountsLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1ListInsightsResponse;
export const ListBillingAccountsLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1ListInsightsResponse;

export type ListBillingAccountsLocationsInsightTypesInsightsError = DefaultErrors;

/** Lists insights for the specified Cloud Resource. Requires the recommender.*.list IAM permission for the specified insight type. */
export const listBillingAccountsLocationsInsightTypesInsights: API.PaginatedOperationMethod<ListBillingAccountsLocationsInsightTypesInsightsRequest, ListBillingAccountsLocationsInsightTypesInsightsResponse, ListBillingAccountsLocationsInsightTypesInsightsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListBillingAccountsLocationsInsightTypesInsightsRequest,
  output: ListBillingAccountsLocationsInsightTypesInsightsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetBillingAccountsLocationsInsightTypesInsightsRequest {
  /** Required. Name of the insight. */
  name: string;
}

export const GetBillingAccountsLocationsInsightTypesInsightsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/billingAccounts/{billingAccountsId}/locations/{locationsId}/insightTypes/{insightTypesId}/insights/{insightsId}" }),
  svc,
) as unknown as Schema.Schema<GetBillingAccountsLocationsInsightTypesInsightsRequest>;

export type GetBillingAccountsLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1Insight;
export const GetBillingAccountsLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1Insight;

export type GetBillingAccountsLocationsInsightTypesInsightsError = DefaultErrors;

/** Gets the requested insight. Requires the recommender.*.get IAM permission for the specified insight type. */
export const getBillingAccountsLocationsInsightTypesInsights: API.OperationMethod<GetBillingAccountsLocationsInsightTypesInsightsRequest, GetBillingAccountsLocationsInsightTypesInsightsResponse, GetBillingAccountsLocationsInsightTypesInsightsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetBillingAccountsLocationsInsightTypesInsightsRequest,
  output: GetBillingAccountsLocationsInsightTypesInsightsResponse,
  errors: [],
}));

export interface MarkAcceptedBillingAccountsLocationsInsightTypesInsightsRequest {
  /** Required. Name of the insight. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecommenderV1MarkInsightAcceptedRequest;
}

export const MarkAcceptedBillingAccountsLocationsInsightTypesInsightsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommenderV1MarkInsightAcceptedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/billingAccounts/{billingAccountsId}/locations/{locationsId}/insightTypes/{insightTypesId}/insights/{insightsId}:markAccepted", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkAcceptedBillingAccountsLocationsInsightTypesInsightsRequest>;

export type MarkAcceptedBillingAccountsLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1Insight;
export const MarkAcceptedBillingAccountsLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1Insight;

export type MarkAcceptedBillingAccountsLocationsInsightTypesInsightsError = DefaultErrors;

/** Marks the Insight State as Accepted. Users can use this method to indicate to the Recommender API that they have applied some action based on the insight. This stops the insight content from being updated. MarkInsightAccepted can be applied to insights in ACTIVE state. Requires the recommender.*.update IAM permission for the specified insight. */
export const markAcceptedBillingAccountsLocationsInsightTypesInsights: API.OperationMethod<MarkAcceptedBillingAccountsLocationsInsightTypesInsightsRequest, MarkAcceptedBillingAccountsLocationsInsightTypesInsightsResponse, MarkAcceptedBillingAccountsLocationsInsightTypesInsightsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MarkAcceptedBillingAccountsLocationsInsightTypesInsightsRequest,
  output: MarkAcceptedBillingAccountsLocationsInsightTypesInsightsResponse,
  errors: [],
}));

export interface ListFoldersLocationsInsightTypesInsightsRequest {
  /** Required. The container resource on which to execute the request. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `folders/[FOLDER_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ INSIGHT_TYPE_ID refers to supported insight types: https://cloud.google.com/recommender/docs/insights/insight-types. */
  parent: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. If not specified, the server will determine the number of results to return. */
  pageSize?: number;
  /** Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters must be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. Filter expression to restrict the insights returned. Supported filter fields: * `stateInfo.state` * `insightSubtype` * `severity` * `targetResources` Examples: * `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` * `insightSubtype = PERMISSIONS_USAGE` * `severity = CRITICAL OR severity = HIGH` * `targetResources : //compute.googleapis.com/projects/1234/zones/us-central1-a/instances/instance-1` * `stateInfo.state = ACTIVE AND (severity = CRITICAL OR severity = HIGH)` The max allowed filter length is 500 characters. (These expressions are based on the filter language described at https://google.aip.dev/160) */
  filter?: string;
}

export const ListFoldersLocationsInsightTypesInsightsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/locations/{locationsId}/insightTypes/{insightTypesId}/insights" }),
  svc,
) as unknown as Schema.Schema<ListFoldersLocationsInsightTypesInsightsRequest>;

export type ListFoldersLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1ListInsightsResponse;
export const ListFoldersLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1ListInsightsResponse;

export type ListFoldersLocationsInsightTypesInsightsError = DefaultErrors;

/** Lists insights for the specified Cloud Resource. Requires the recommender.*.list IAM permission for the specified insight type. */
export const listFoldersLocationsInsightTypesInsights: API.PaginatedOperationMethod<ListFoldersLocationsInsightTypesInsightsRequest, ListFoldersLocationsInsightTypesInsightsResponse, ListFoldersLocationsInsightTypesInsightsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListFoldersLocationsInsightTypesInsightsRequest,
  output: ListFoldersLocationsInsightTypesInsightsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetFoldersLocationsInsightTypesInsightsRequest {
  /** Required. Name of the insight. */
  name: string;
}

export const GetFoldersLocationsInsightTypesInsightsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/locations/{locationsId}/insightTypes/{insightTypesId}/insights/{insightsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsInsightTypesInsightsRequest>;

export type GetFoldersLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1Insight;
export const GetFoldersLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1Insight;

export type GetFoldersLocationsInsightTypesInsightsError = DefaultErrors;

/** Gets the requested insight. Requires the recommender.*.get IAM permission for the specified insight type. */
export const getFoldersLocationsInsightTypesInsights: API.OperationMethod<GetFoldersLocationsInsightTypesInsightsRequest, GetFoldersLocationsInsightTypesInsightsResponse, GetFoldersLocationsInsightTypesInsightsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsInsightTypesInsightsRequest,
  output: GetFoldersLocationsInsightTypesInsightsResponse,
  errors: [],
}));

export interface MarkAcceptedFoldersLocationsInsightTypesInsightsRequest {
  /** Required. Name of the insight. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecommenderV1MarkInsightAcceptedRequest;
}

export const MarkAcceptedFoldersLocationsInsightTypesInsightsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommenderV1MarkInsightAcceptedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/locations/{locationsId}/insightTypes/{insightTypesId}/insights/{insightsId}:markAccepted", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkAcceptedFoldersLocationsInsightTypesInsightsRequest>;

export type MarkAcceptedFoldersLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1Insight;
export const MarkAcceptedFoldersLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1Insight;

export type MarkAcceptedFoldersLocationsInsightTypesInsightsError = DefaultErrors;

/** Marks the Insight State as Accepted. Users can use this method to indicate to the Recommender API that they have applied some action based on the insight. This stops the insight content from being updated. MarkInsightAccepted can be applied to insights in ACTIVE state. Requires the recommender.*.update IAM permission for the specified insight. */
export const markAcceptedFoldersLocationsInsightTypesInsights: API.OperationMethod<MarkAcceptedFoldersLocationsInsightTypesInsightsRequest, MarkAcceptedFoldersLocationsInsightTypesInsightsResponse, MarkAcceptedFoldersLocationsInsightTypesInsightsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MarkAcceptedFoldersLocationsInsightTypesInsightsRequest,
  output: MarkAcceptedFoldersLocationsInsightTypesInsightsResponse,
  errors: [],
}));

export interface ListFoldersLocationsRecommendersRecommendationsRequest {
  /** Required. The container resource on which to execute the request. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `folders/[FOLDER_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ RECOMMENDER_ID refers to supported recommenders: https://cloud.google.com/recommender/docs/recommenders. */
  parent: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. If not specified, the server will determine the number of results to return. */
  pageSize?: number;
  /** Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters must be identical to those in the previous call. */
  pageToken?: string;
  /** Filter expression to restrict the recommendations returned. Supported filter fields: * `state_info.state` * `recommenderSubtype` * `priority` * `targetResources` Examples: * `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` * `recommenderSubtype = REMOVE_ROLE OR recommenderSubtype = REPLACE_ROLE` * `priority = P1 OR priority = P2` * `targetResources : //compute.googleapis.com/projects/1234/zones/us-central1-a/instances/instance-1` * `stateInfo.state = ACTIVE AND (priority = P1 OR priority = P2)` The max allowed filter length is 500 characters. (These expressions are based on the filter language described at https://google.aip.dev/160) */
  filter?: string;
}

export const ListFoldersLocationsRecommendersRecommendationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations" }),
  svc,
) as unknown as Schema.Schema<ListFoldersLocationsRecommendersRecommendationsRequest>;

export type ListFoldersLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1ListRecommendationsResponse;
export const ListFoldersLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1ListRecommendationsResponse;

export type ListFoldersLocationsRecommendersRecommendationsError = DefaultErrors;

/** Lists recommendations for the specified Cloud Resource. Requires the recommender.*.list IAM permission for the specified recommender. */
export const listFoldersLocationsRecommendersRecommendations: API.PaginatedOperationMethod<ListFoldersLocationsRecommendersRecommendationsRequest, ListFoldersLocationsRecommendersRecommendationsResponse, ListFoldersLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListFoldersLocationsRecommendersRecommendationsRequest,
  output: ListFoldersLocationsRecommendersRecommendationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetFoldersLocationsRecommendersRecommendationsRequest {
  /** Required. Name of the recommendation. */
  name: string;
}

export const GetFoldersLocationsRecommendersRecommendationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations/{recommendationsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsRecommendersRecommendationsRequest>;

export type GetFoldersLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;
export const GetFoldersLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;

export type GetFoldersLocationsRecommendersRecommendationsError = DefaultErrors;

/** Gets the requested recommendation. Requires the recommender.*.get IAM permission for the specified recommender. */
export const getFoldersLocationsRecommendersRecommendations: API.OperationMethod<GetFoldersLocationsRecommendersRecommendationsRequest, GetFoldersLocationsRecommendersRecommendationsResponse, GetFoldersLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsRecommendersRecommendationsRequest,
  output: GetFoldersLocationsRecommendersRecommendationsResponse,
  errors: [],
}));

export interface MarkDismissedFoldersLocationsRecommendersRecommendationsRequest {
  /** Required. Name of the recommendation. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecommenderV1MarkRecommendationDismissedRequest;
}

export const MarkDismissedFoldersLocationsRecommendersRecommendationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommenderV1MarkRecommendationDismissedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations/{recommendationsId}:markDismissed", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkDismissedFoldersLocationsRecommendersRecommendationsRequest>;

export type MarkDismissedFoldersLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;
export const MarkDismissedFoldersLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;

export type MarkDismissedFoldersLocationsRecommendersRecommendationsError = DefaultErrors;

/** Mark the Recommendation State as Dismissed. Users can use this method to indicate to the Recommender API that an ACTIVE recommendation has to be marked back as DISMISSED. MarkRecommendationDismissed can be applied to recommendations in ACTIVE state. Requires the recommender.*.update IAM permission for the specified recommender. */
export const markDismissedFoldersLocationsRecommendersRecommendations: API.OperationMethod<MarkDismissedFoldersLocationsRecommendersRecommendationsRequest, MarkDismissedFoldersLocationsRecommendersRecommendationsResponse, MarkDismissedFoldersLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MarkDismissedFoldersLocationsRecommendersRecommendationsRequest,
  output: MarkDismissedFoldersLocationsRecommendersRecommendationsResponse,
  errors: [],
}));

export interface MarkClaimedFoldersLocationsRecommendersRecommendationsRequest {
  /** Required. Name of the recommendation. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecommenderV1MarkRecommendationClaimedRequest;
}

export const MarkClaimedFoldersLocationsRecommendersRecommendationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommenderV1MarkRecommendationClaimedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations/{recommendationsId}:markClaimed", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkClaimedFoldersLocationsRecommendersRecommendationsRequest>;

export type MarkClaimedFoldersLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;
export const MarkClaimedFoldersLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;

export type MarkClaimedFoldersLocationsRecommendersRecommendationsError = DefaultErrors;

/** Marks the Recommendation State as Claimed. Users can use this method to indicate to the Recommender API that they are starting to apply the recommendation themselves. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationClaimed can be applied to recommendations in CLAIMED, SUCCEEDED, FAILED, or ACTIVE state. Requires the recommender.*.update IAM permission for the specified recommender. */
export const markClaimedFoldersLocationsRecommendersRecommendations: API.OperationMethod<MarkClaimedFoldersLocationsRecommendersRecommendationsRequest, MarkClaimedFoldersLocationsRecommendersRecommendationsResponse, MarkClaimedFoldersLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MarkClaimedFoldersLocationsRecommendersRecommendationsRequest,
  output: MarkClaimedFoldersLocationsRecommendersRecommendationsResponse,
  errors: [],
}));

export interface MarkSucceededFoldersLocationsRecommendersRecommendationsRequest {
  /** Required. Name of the recommendation. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecommenderV1MarkRecommendationSucceededRequest;
}

export const MarkSucceededFoldersLocationsRecommendersRecommendationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommenderV1MarkRecommendationSucceededRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations/{recommendationsId}:markSucceeded", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkSucceededFoldersLocationsRecommendersRecommendationsRequest>;

export type MarkSucceededFoldersLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;
export const MarkSucceededFoldersLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;

export type MarkSucceededFoldersLocationsRecommendersRecommendationsError = DefaultErrors;

/** Marks the Recommendation State as Succeeded. Users can use this method to indicate to the Recommender API that they have applied the recommendation themselves, and the operation was successful. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationSucceeded can be applied to recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires the recommender.*.update IAM permission for the specified recommender. */
export const markSucceededFoldersLocationsRecommendersRecommendations: API.OperationMethod<MarkSucceededFoldersLocationsRecommendersRecommendationsRequest, MarkSucceededFoldersLocationsRecommendersRecommendationsResponse, MarkSucceededFoldersLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MarkSucceededFoldersLocationsRecommendersRecommendationsRequest,
  output: MarkSucceededFoldersLocationsRecommendersRecommendationsResponse,
  errors: [],
}));

export interface MarkFailedFoldersLocationsRecommendersRecommendationsRequest {
  /** Required. Name of the recommendation. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecommenderV1MarkRecommendationFailedRequest;
}

export const MarkFailedFoldersLocationsRecommendersRecommendationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommenderV1MarkRecommendationFailedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/folders/{foldersId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations/{recommendationsId}:markFailed", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkFailedFoldersLocationsRecommendersRecommendationsRequest>;

export type MarkFailedFoldersLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;
export const MarkFailedFoldersLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;

export type MarkFailedFoldersLocationsRecommendersRecommendationsError = DefaultErrors;

/** Marks the Recommendation State as Failed. Users can use this method to indicate to the Recommender API that they have applied the recommendation themselves, and the operation failed. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationFailed can be applied to recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires the recommender.*.update IAM permission for the specified recommender. */
export const markFailedFoldersLocationsRecommendersRecommendations: API.OperationMethod<MarkFailedFoldersLocationsRecommendersRecommendationsRequest, MarkFailedFoldersLocationsRecommendersRecommendationsResponse, MarkFailedFoldersLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MarkFailedFoldersLocationsRecommendersRecommendationsRequest,
  output: MarkFailedFoldersLocationsRecommendersRecommendationsResponse,
  errors: [],
}));

export interface GetConfigOrganizationsLocationsRecommendersRequest {
  /** Required. Name of the Recommendation Config to get. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` * `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` */
  name: string;
}

export const GetConfigOrganizationsLocationsRecommendersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/recommenders/{recommendersId}/config" }),
  svc,
) as unknown as Schema.Schema<GetConfigOrganizationsLocationsRecommendersRequest>;

export type GetConfigOrganizationsLocationsRecommendersResponse = GoogleCloudRecommenderV1RecommenderConfig;
export const GetConfigOrganizationsLocationsRecommendersResponse = GoogleCloudRecommenderV1RecommenderConfig;

export type GetConfigOrganizationsLocationsRecommendersError = DefaultErrors;

/** Gets the requested Recommender Config. There is only one instance of the config for each Recommender. */
export const getConfigOrganizationsLocationsRecommenders: API.OperationMethod<GetConfigOrganizationsLocationsRecommendersRequest, GetConfigOrganizationsLocationsRecommendersResponse, GetConfigOrganizationsLocationsRecommendersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetConfigOrganizationsLocationsRecommendersRequest,
  output: GetConfigOrganizationsLocationsRecommendersResponse,
  errors: [],
}));

export interface UpdateConfigOrganizationsLocationsRecommendersRequest {
  /** Identifier. Name of recommender config. Eg, projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config */
  name: string;
  /** The list of fields to be updated. */
  updateMask?: string;
  /** If true, validate the request and preview the change, but do not actually update it. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudRecommenderV1RecommenderConfig;
}

export const UpdateConfigOrganizationsLocationsRecommendersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudRecommenderV1RecommenderConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/locations/{locationsId}/recommenders/{recommendersId}/config", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateConfigOrganizationsLocationsRecommendersRequest>;

export type UpdateConfigOrganizationsLocationsRecommendersResponse = GoogleCloudRecommenderV1RecommenderConfig;
export const UpdateConfigOrganizationsLocationsRecommendersResponse = GoogleCloudRecommenderV1RecommenderConfig;

export type UpdateConfigOrganizationsLocationsRecommendersError = DefaultErrors;

/** Updates a Recommender Config. This will create a new revision of the config. */
export const updateConfigOrganizationsLocationsRecommenders: API.OperationMethod<UpdateConfigOrganizationsLocationsRecommendersRequest, UpdateConfigOrganizationsLocationsRecommendersResponse, UpdateConfigOrganizationsLocationsRecommendersError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateConfigOrganizationsLocationsRecommendersRequest,
  output: UpdateConfigOrganizationsLocationsRecommendersResponse,
  errors: [],
}));

export interface ListOrganizationsLocationsRecommendersRecommendationsRequest {
  /** Required. The container resource on which to execute the request. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `folders/[FOLDER_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ RECOMMENDER_ID refers to supported recommenders: https://cloud.google.com/recommender/docs/recommenders. */
  parent: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. If not specified, the server will determine the number of results to return. */
  pageSize?: number;
  /** Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters must be identical to those in the previous call. */
  pageToken?: string;
  /** Filter expression to restrict the recommendations returned. Supported filter fields: * `state_info.state` * `recommenderSubtype` * `priority` * `targetResources` Examples: * `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` * `recommenderSubtype = REMOVE_ROLE OR recommenderSubtype = REPLACE_ROLE` * `priority = P1 OR priority = P2` * `targetResources : //compute.googleapis.com/projects/1234/zones/us-central1-a/instances/instance-1` * `stateInfo.state = ACTIVE AND (priority = P1 OR priority = P2)` The max allowed filter length is 500 characters. (These expressions are based on the filter language described at https://google.aip.dev/160) */
  filter?: string;
}

export const ListOrganizationsLocationsRecommendersRecommendationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsRecommendersRecommendationsRequest>;

export type ListOrganizationsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1ListRecommendationsResponse;
export const ListOrganizationsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1ListRecommendationsResponse;

export type ListOrganizationsLocationsRecommendersRecommendationsError = DefaultErrors;

/** Lists recommendations for the specified Cloud Resource. Requires the recommender.*.list IAM permission for the specified recommender. */
export const listOrganizationsLocationsRecommendersRecommendations: API.PaginatedOperationMethod<ListOrganizationsLocationsRecommendersRecommendationsRequest, ListOrganizationsLocationsRecommendersRecommendationsResponse, ListOrganizationsLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListOrganizationsLocationsRecommendersRecommendationsRequest,
  output: ListOrganizationsLocationsRecommendersRecommendationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetOrganizationsLocationsRecommendersRecommendationsRequest {
  /** Required. Name of the recommendation. */
  name: string;
}

export const GetOrganizationsLocationsRecommendersRecommendationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations/{recommendationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsRecommendersRecommendationsRequest>;

export type GetOrganizationsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;
export const GetOrganizationsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;

export type GetOrganizationsLocationsRecommendersRecommendationsError = DefaultErrors;

/** Gets the requested recommendation. Requires the recommender.*.get IAM permission for the specified recommender. */
export const getOrganizationsLocationsRecommendersRecommendations: API.OperationMethod<GetOrganizationsLocationsRecommendersRecommendationsRequest, GetOrganizationsLocationsRecommendersRecommendationsResponse, GetOrganizationsLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsRecommendersRecommendationsRequest,
  output: GetOrganizationsLocationsRecommendersRecommendationsResponse,
  errors: [],
}));

export interface MarkDismissedOrganizationsLocationsRecommendersRecommendationsRequest {
  /** Required. Name of the recommendation. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecommenderV1MarkRecommendationDismissedRequest;
}

export const MarkDismissedOrganizationsLocationsRecommendersRecommendationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommenderV1MarkRecommendationDismissedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations/{recommendationsId}:markDismissed", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkDismissedOrganizationsLocationsRecommendersRecommendationsRequest>;

export type MarkDismissedOrganizationsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;
export const MarkDismissedOrganizationsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;

export type MarkDismissedOrganizationsLocationsRecommendersRecommendationsError = DefaultErrors;

/** Mark the Recommendation State as Dismissed. Users can use this method to indicate to the Recommender API that an ACTIVE recommendation has to be marked back as DISMISSED. MarkRecommendationDismissed can be applied to recommendations in ACTIVE state. Requires the recommender.*.update IAM permission for the specified recommender. */
export const markDismissedOrganizationsLocationsRecommendersRecommendations: API.OperationMethod<MarkDismissedOrganizationsLocationsRecommendersRecommendationsRequest, MarkDismissedOrganizationsLocationsRecommendersRecommendationsResponse, MarkDismissedOrganizationsLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MarkDismissedOrganizationsLocationsRecommendersRecommendationsRequest,
  output: MarkDismissedOrganizationsLocationsRecommendersRecommendationsResponse,
  errors: [],
}));

export interface MarkClaimedOrganizationsLocationsRecommendersRecommendationsRequest {
  /** Required. Name of the recommendation. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecommenderV1MarkRecommendationClaimedRequest;
}

export const MarkClaimedOrganizationsLocationsRecommendersRecommendationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommenderV1MarkRecommendationClaimedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations/{recommendationsId}:markClaimed", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkClaimedOrganizationsLocationsRecommendersRecommendationsRequest>;

export type MarkClaimedOrganizationsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;
export const MarkClaimedOrganizationsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;

export type MarkClaimedOrganizationsLocationsRecommendersRecommendationsError = DefaultErrors;

/** Marks the Recommendation State as Claimed. Users can use this method to indicate to the Recommender API that they are starting to apply the recommendation themselves. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationClaimed can be applied to recommendations in CLAIMED, SUCCEEDED, FAILED, or ACTIVE state. Requires the recommender.*.update IAM permission for the specified recommender. */
export const markClaimedOrganizationsLocationsRecommendersRecommendations: API.OperationMethod<MarkClaimedOrganizationsLocationsRecommendersRecommendationsRequest, MarkClaimedOrganizationsLocationsRecommendersRecommendationsResponse, MarkClaimedOrganizationsLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MarkClaimedOrganizationsLocationsRecommendersRecommendationsRequest,
  output: MarkClaimedOrganizationsLocationsRecommendersRecommendationsResponse,
  errors: [],
}));

export interface MarkSucceededOrganizationsLocationsRecommendersRecommendationsRequest {
  /** Required. Name of the recommendation. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecommenderV1MarkRecommendationSucceededRequest;
}

export const MarkSucceededOrganizationsLocationsRecommendersRecommendationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommenderV1MarkRecommendationSucceededRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations/{recommendationsId}:markSucceeded", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkSucceededOrganizationsLocationsRecommendersRecommendationsRequest>;

export type MarkSucceededOrganizationsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;
export const MarkSucceededOrganizationsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;

export type MarkSucceededOrganizationsLocationsRecommendersRecommendationsError = DefaultErrors;

/** Marks the Recommendation State as Succeeded. Users can use this method to indicate to the Recommender API that they have applied the recommendation themselves, and the operation was successful. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationSucceeded can be applied to recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires the recommender.*.update IAM permission for the specified recommender. */
export const markSucceededOrganizationsLocationsRecommendersRecommendations: API.OperationMethod<MarkSucceededOrganizationsLocationsRecommendersRecommendationsRequest, MarkSucceededOrganizationsLocationsRecommendersRecommendationsResponse, MarkSucceededOrganizationsLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MarkSucceededOrganizationsLocationsRecommendersRecommendationsRequest,
  output: MarkSucceededOrganizationsLocationsRecommendersRecommendationsResponse,
  errors: [],
}));

export interface MarkFailedOrganizationsLocationsRecommendersRecommendationsRequest {
  /** Required. Name of the recommendation. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecommenderV1MarkRecommendationFailedRequest;
}

export const MarkFailedOrganizationsLocationsRecommendersRecommendationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommenderV1MarkRecommendationFailedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/recommenders/{recommendersId}/recommendations/{recommendationsId}:markFailed", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkFailedOrganizationsLocationsRecommendersRecommendationsRequest>;

export type MarkFailedOrganizationsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;
export const MarkFailedOrganizationsLocationsRecommendersRecommendationsResponse = GoogleCloudRecommenderV1Recommendation;

export type MarkFailedOrganizationsLocationsRecommendersRecommendationsError = DefaultErrors;

/** Marks the Recommendation State as Failed. Users can use this method to indicate to the Recommender API that they have applied the recommendation themselves, and the operation failed. This stops the recommendation content from being updated. Associated insights are frozen and placed in the ACCEPTED state. MarkRecommendationFailed can be applied to recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires the recommender.*.update IAM permission for the specified recommender. */
export const markFailedOrganizationsLocationsRecommendersRecommendations: API.OperationMethod<MarkFailedOrganizationsLocationsRecommendersRecommendationsRequest, MarkFailedOrganizationsLocationsRecommendersRecommendationsResponse, MarkFailedOrganizationsLocationsRecommendersRecommendationsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MarkFailedOrganizationsLocationsRecommendersRecommendationsRequest,
  output: MarkFailedOrganizationsLocationsRecommendersRecommendationsResponse,
  errors: [],
}));

export interface GetConfigOrganizationsLocationsInsightTypesRequest {
  /** Required. Name of the InsightTypeConfig to get. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` * `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` */
  name: string;
}

export const GetConfigOrganizationsLocationsInsightTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/insightTypes/{insightTypesId}/config" }),
  svc,
) as unknown as Schema.Schema<GetConfigOrganizationsLocationsInsightTypesRequest>;

export type GetConfigOrganizationsLocationsInsightTypesResponse = GoogleCloudRecommenderV1InsightTypeConfig;
export const GetConfigOrganizationsLocationsInsightTypesResponse = GoogleCloudRecommenderV1InsightTypeConfig;

export type GetConfigOrganizationsLocationsInsightTypesError = DefaultErrors;

/** Gets the requested InsightTypeConfig. There is only one instance of the config for each InsightType. */
export const getConfigOrganizationsLocationsInsightTypes: API.OperationMethod<GetConfigOrganizationsLocationsInsightTypesRequest, GetConfigOrganizationsLocationsInsightTypesResponse, GetConfigOrganizationsLocationsInsightTypesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetConfigOrganizationsLocationsInsightTypesRequest,
  output: GetConfigOrganizationsLocationsInsightTypesResponse,
  errors: [],
}));

export interface UpdateConfigOrganizationsLocationsInsightTypesRequest {
  /** Identifier. Name of insight type config. Eg, projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config */
  name: string;
  /** The list of fields to be updated. */
  updateMask?: string;
  /** If true, validate the request and preview the change, but do not actually update it. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudRecommenderV1InsightTypeConfig;
}

export const UpdateConfigOrganizationsLocationsInsightTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudRecommenderV1InsightTypeConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/locations/{locationsId}/insightTypes/{insightTypesId}/config", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateConfigOrganizationsLocationsInsightTypesRequest>;

export type UpdateConfigOrganizationsLocationsInsightTypesResponse = GoogleCloudRecommenderV1InsightTypeConfig;
export const UpdateConfigOrganizationsLocationsInsightTypesResponse = GoogleCloudRecommenderV1InsightTypeConfig;

export type UpdateConfigOrganizationsLocationsInsightTypesError = DefaultErrors;

/** Updates an InsightTypeConfig change. This will create a new revision of the config. */
export const updateConfigOrganizationsLocationsInsightTypes: API.OperationMethod<UpdateConfigOrganizationsLocationsInsightTypesRequest, UpdateConfigOrganizationsLocationsInsightTypesResponse, UpdateConfigOrganizationsLocationsInsightTypesError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateConfigOrganizationsLocationsInsightTypesRequest,
  output: UpdateConfigOrganizationsLocationsInsightTypesResponse,
  errors: [],
}));

export interface ListOrganizationsLocationsInsightTypesInsightsRequest {
  /** Required. The container resource on which to execute the request. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `folders/[FOLDER_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ INSIGHT_TYPE_ID refers to supported insight types: https://cloud.google.com/recommender/docs/insights/insight-types. */
  parent: string;
  /** Optional. The maximum number of results to return from this request. Non-positive values are ignored. If not specified, the server will determine the number of results to return. */
  pageSize?: number;
  /** Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters must be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. Filter expression to restrict the insights returned. Supported filter fields: * `stateInfo.state` * `insightSubtype` * `severity` * `targetResources` Examples: * `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` * `insightSubtype = PERMISSIONS_USAGE` * `severity = CRITICAL OR severity = HIGH` * `targetResources : //compute.googleapis.com/projects/1234/zones/us-central1-a/instances/instance-1` * `stateInfo.state = ACTIVE AND (severity = CRITICAL OR severity = HIGH)` The max allowed filter length is 500 characters. (These expressions are based on the filter language described at https://google.aip.dev/160) */
  filter?: string;
}

export const ListOrganizationsLocationsInsightTypesInsightsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/insightTypes/{insightTypesId}/insights" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsInsightTypesInsightsRequest>;

export type ListOrganizationsLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1ListInsightsResponse;
export const ListOrganizationsLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1ListInsightsResponse;

export type ListOrganizationsLocationsInsightTypesInsightsError = DefaultErrors;

/** Lists insights for the specified Cloud Resource. Requires the recommender.*.list IAM permission for the specified insight type. */
export const listOrganizationsLocationsInsightTypesInsights: API.PaginatedOperationMethod<ListOrganizationsLocationsInsightTypesInsightsRequest, ListOrganizationsLocationsInsightTypesInsightsResponse, ListOrganizationsLocationsInsightTypesInsightsError, Credentials | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListOrganizationsLocationsInsightTypesInsightsRequest,
  output: ListOrganizationsLocationsInsightTypesInsightsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetOrganizationsLocationsInsightTypesInsightsRequest {
  /** Required. Name of the insight. */
  name: string;
}

export const GetOrganizationsLocationsInsightTypesInsightsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/insightTypes/{insightTypesId}/insights/{insightsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsInsightTypesInsightsRequest>;

export type GetOrganizationsLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1Insight;
export const GetOrganizationsLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1Insight;

export type GetOrganizationsLocationsInsightTypesInsightsError = DefaultErrors;

/** Gets the requested insight. Requires the recommender.*.get IAM permission for the specified insight type. */
export const getOrganizationsLocationsInsightTypesInsights: API.OperationMethod<GetOrganizationsLocationsInsightTypesInsightsRequest, GetOrganizationsLocationsInsightTypesInsightsResponse, GetOrganizationsLocationsInsightTypesInsightsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsInsightTypesInsightsRequest,
  output: GetOrganizationsLocationsInsightTypesInsightsResponse,
  errors: [],
}));

export interface MarkAcceptedOrganizationsLocationsInsightTypesInsightsRequest {
  /** Required. Name of the insight. */
  name: string;
  /** Request body */
  body?: GoogleCloudRecommenderV1MarkInsightAcceptedRequest;
}

export const MarkAcceptedOrganizationsLocationsInsightTypesInsightsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRecommenderV1MarkInsightAcceptedRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/insightTypes/{insightTypesId}/insights/{insightsId}:markAccepted", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MarkAcceptedOrganizationsLocationsInsightTypesInsightsRequest>;

export type MarkAcceptedOrganizationsLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1Insight;
export const MarkAcceptedOrganizationsLocationsInsightTypesInsightsResponse = GoogleCloudRecommenderV1Insight;

export type MarkAcceptedOrganizationsLocationsInsightTypesInsightsError = DefaultErrors;

/** Marks the Insight State as Accepted. Users can use this method to indicate to the Recommender API that they have applied some action based on the insight. This stops the insight content from being updated. MarkInsightAccepted can be applied to insights in ACTIVE state. Requires the recommender.*.update IAM permission for the specified insight. */
export const markAcceptedOrganizationsLocationsInsightTypesInsights: API.OperationMethod<MarkAcceptedOrganizationsLocationsInsightTypesInsightsRequest, MarkAcceptedOrganizationsLocationsInsightTypesInsightsResponse, MarkAcceptedOrganizationsLocationsInsightTypesInsightsError, Credentials | HttpClient.HttpClient> = API.make(() => ({
  input: MarkAcceptedOrganizationsLocationsInsightTypesInsightsRequest,
  output: MarkAcceptedOrganizationsLocationsInsightTypesInsightsResponse,
  errors: [],
}));

