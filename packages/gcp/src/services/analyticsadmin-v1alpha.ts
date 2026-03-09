// ==========================================================================
// Google Analytics Admin API (analyticsadmin v1alpha)
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
  name: "analyticsadmin",
  version: "v1alpha",
  rootUrl: "https://analyticsadmin.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleAnalyticsAdminV1alphaSubpropertySyncConfig {
  /** Output only. Identifier. Format: properties/{ordinary_property_id}/subpropertySyncConfigs/{subproperty_id} Example: properties/1234/subpropertySyncConfigs/5678 */
  name?: string;
  /** Output only. Immutable. Resource name of the subproperty that these settings apply to. */
  applyToProperty?: string;
  /** Required. Specifies the Custom Dimension / Metric synchronization mode for the subproperty. If set to ALL, Custom Dimension / Metric synchronization will be immediately enabled. Local configuration of Custom Dimensions / Metrics will not be allowed on the subproperty so long as the synchronization mode is set to ALL. If set to NONE, Custom Dimensions / Metric synchronization is disabled. Custom Dimensions / Metrics must be configured explicitly on the Subproperty. */
  customDimensionAndMetricSyncMode?:
    | "SYNCHRONIZATION_MODE_UNSPECIFIED"
    | "NONE"
    | "ALL"
    | (string & {});
}

export const GoogleAnalyticsAdminV1alphaSubpropertySyncConfig: Schema.Schema<GoogleAnalyticsAdminV1alphaSubpropertySyncConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      applyToProperty: Schema.optional(Schema.String),
      customDimensionAndMetricSyncMode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaSubpropertySyncConfig",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaSubpropertySyncConfig>;

export interface GoogleAnalyticsAdminV1alphaCustomDimension {
  /** Required. Immutable. Tagging parameter name for this custom dimension. If this is a user-scoped dimension, then this is the user property name. If this is an event-scoped dimension, then this is the event parameter name. If this is an item-scoped dimension, then this is the parameter name found in the eCommerce items array. May only contain alphanumeric and underscore characters, starting with a letter. Max length of 24 characters for user-scoped dimensions, 40 characters for event-scoped dimensions. */
  parameterName?: string;
  /** Required. Immutable. The scope of this dimension. */
  scope?:
    | "DIMENSION_SCOPE_UNSPECIFIED"
    | "EVENT"
    | "USER"
    | "ITEM"
    | (string & {});
  /** Optional. Description for this custom dimension. Max length of 150 characters. */
  description?: string;
  /** Optional. If set to true, sets this dimension as NPA and excludes it from ads personalization. This is currently only supported by user-scoped custom dimensions. */
  disallowAdsPersonalization?: boolean;
  /** Required. Display name for this custom dimension as shown in the Analytics UI. Max length of 82 characters, alphanumeric plus space and underscore starting with a letter. Legacy system-generated display names may contain square brackets, but updates to this field will never permit square brackets. */
  displayName?: string;
  /** Output only. Resource name for this CustomDimension resource. Format: properties/{property}/customDimensions/{customDimension} */
  name?: string;
}

export const GoogleAnalyticsAdminV1alphaCustomDimension: Schema.Schema<GoogleAnalyticsAdminV1alphaCustomDimension> =
  Schema.suspend(() =>
    Schema.Struct({
      parameterName: Schema.optional(Schema.String),
      scope: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      disallowAdsPersonalization: Schema.optional(Schema.Boolean),
      displayName: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaCustomDimension",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaCustomDimension>;

export interface GoogleAnalyticsAdminV1alphaExpandedDataSetFilterInListFilter {
  /** Optional. If true, the match is case-sensitive. If false, the match is case-insensitive. Must be true. */
  caseSensitive?: boolean;
  /** Required. The list of possible string values to match against. Must be non-empty. */
  values?: Array<string>;
}

export const GoogleAnalyticsAdminV1alphaExpandedDataSetFilterInListFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaExpandedDataSetFilterInListFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      caseSensitive: Schema.optional(Schema.Boolean),
      values: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaExpandedDataSetFilterInListFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaExpandedDataSetFilterInListFilter>;

export interface GoogleAnalyticsAdminV1alphaExpandedDataSetFilterStringFilter {
  /** Required. The match type for the string filter. */
  matchType?: "MATCH_TYPE_UNSPECIFIED" | "EXACT" | "CONTAINS" | (string & {});
  /** Required. The string value to be matched against. */
  value?: string;
  /** Optional. If true, the match is case-sensitive. If false, the match is case-insensitive. Must be true when match_type is EXACT. Must be false when match_type is CONTAINS. */
  caseSensitive?: boolean;
}

export const GoogleAnalyticsAdminV1alphaExpandedDataSetFilterStringFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaExpandedDataSetFilterStringFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      matchType: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
      caseSensitive: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaExpandedDataSetFilterStringFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaExpandedDataSetFilterStringFilter>;

export interface GoogleAnalyticsAdminV1alphaExpandedDataSetFilter {
  /** Required. The dimension name to filter. */
  fieldName?: string;
  /** A filter for a string dimension that matches a particular list of options. */
  inListFilter?: GoogleAnalyticsAdminV1alphaExpandedDataSetFilterInListFilter;
  /** A filter for a string-type dimension that matches a particular pattern. */
  stringFilter?: GoogleAnalyticsAdminV1alphaExpandedDataSetFilterStringFilter;
}

export const GoogleAnalyticsAdminV1alphaExpandedDataSetFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaExpandedDataSetFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      fieldName: Schema.optional(Schema.String),
      inListFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaExpandedDataSetFilterInListFilter,
      ),
      stringFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaExpandedDataSetFilterStringFilter,
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaExpandedDataSetFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaExpandedDataSetFilter>;

export interface GoogleAnalyticsAdminV1alphaExpandedDataSetFilterExpression {
  /** A list of expressions to be AND’ed together. It must contain a ExpandedDataSetFilterExpression with either not_expression or dimension_filter. This must be set for the top level ExpandedDataSetFilterExpression. */
  andGroup?: GoogleAnalyticsAdminV1alphaExpandedDataSetFilterExpressionList;
  /** A filter expression to be NOT'ed (that is, inverted, complemented). It must include a dimension_filter. This cannot be set on the top level ExpandedDataSetFilterExpression. */
  notExpression?: GoogleAnalyticsAdminV1alphaExpandedDataSetFilterExpression;
  /** A filter on a single dimension. This cannot be set on the top level ExpandedDataSetFilterExpression. */
  filter?: GoogleAnalyticsAdminV1alphaExpandedDataSetFilter;
}

export const GoogleAnalyticsAdminV1alphaExpandedDataSetFilterExpression: Schema.Schema<GoogleAnalyticsAdminV1alphaExpandedDataSetFilterExpression> =
  Schema.suspend(() =>
    Schema.Struct({
      andGroup: Schema.optional(
        GoogleAnalyticsAdminV1alphaExpandedDataSetFilterExpressionList,
      ),
      notExpression: Schema.optional(
        GoogleAnalyticsAdminV1alphaExpandedDataSetFilterExpression,
      ),
      filter: Schema.optional(GoogleAnalyticsAdminV1alphaExpandedDataSetFilter),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaExpandedDataSetFilterExpression",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaExpandedDataSetFilterExpression>;

export interface GoogleAnalyticsAdminV1alphaExpandedDataSetFilterExpressionList {
  /** A list of ExpandedDataSet filter expressions. */
  filterExpressions?: Array<GoogleAnalyticsAdminV1alphaExpandedDataSetFilterExpression>;
}

export const GoogleAnalyticsAdminV1alphaExpandedDataSetFilterExpressionList: Schema.Schema<GoogleAnalyticsAdminV1alphaExpandedDataSetFilterExpressionList> =
  Schema.suspend(() =>
    Schema.Struct({
      filterExpressions: Schema.optional(
        Schema.Array(
          GoogleAnalyticsAdminV1alphaExpandedDataSetFilterExpression,
        ),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaExpandedDataSetFilterExpressionList",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaExpandedDataSetFilterExpressionList>;

export interface GoogleAnalyticsAdminV1alphaAudienceEventTrigger {
  /** Required. The event name that will be logged. */
  eventName?: string;
  /** Required. When to log the event. */
  logCondition?:
    | "LOG_CONDITION_UNSPECIFIED"
    | "AUDIENCE_JOINED"
    | "AUDIENCE_MEMBERSHIP_RENEWED"
    | (string & {});
}

export const GoogleAnalyticsAdminV1alphaAudienceEventTrigger: Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceEventTrigger> =
  Schema.suspend(() =>
    Schema.Struct({
      eventName: Schema.optional(Schema.String),
      logCondition: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAudienceEventTrigger",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceEventTrigger>;

export interface GoogleAnalyticsAdminV1alphaAudienceFilterExpressionList {
  /** A list of Audience filter expressions. */
  filterExpressions?: Array<GoogleAnalyticsAdminV1alphaAudienceFilterExpression>;
}

export const GoogleAnalyticsAdminV1alphaAudienceFilterExpressionList: Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceFilterExpressionList> =
  Schema.suspend(() =>
    Schema.Struct({
      filterExpressions: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaAudienceFilterExpression),
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAudienceFilterExpressionList",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceFilterExpressionList>;

export interface GoogleAnalyticsAdminV1alphaAudienceEventFilter {
  /** Required. Immutable. The name of the event to match against. */
  eventName?: string;
  /** Optional. If specified, this filter matches events that match both the single event name and the parameter filter expressions. AudienceEventFilter inside the parameter filter expression cannot be set (For example, nested event filters are not supported). This should be a single and_group of dimension_or_metric_filter or not_expression; ANDs of ORs are not supported. Also, if it includes a filter for "eventCount", only that one will be considered; all the other filters will be ignored. */
  eventParameterFilterExpression?: GoogleAnalyticsAdminV1alphaAudienceFilterExpression;
}

export const GoogleAnalyticsAdminV1alphaAudienceEventFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceEventFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      eventName: Schema.optional(Schema.String),
      eventParameterFilterExpression: Schema.optional(
        GoogleAnalyticsAdminV1alphaAudienceFilterExpression,
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAudienceEventFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceEventFilter>;

export interface GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterInListFilter {
  /** Optional. If true, the match is case-sensitive. If false, the match is case-insensitive. */
  caseSensitive?: boolean;
  /** Required. The list of possible string values to match against. Must be non-empty. */
  values?: Array<string>;
}

export const GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterInListFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterInListFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      caseSensitive: Schema.optional(Schema.Boolean),
      values: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterInListFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterInListFilter>;

export interface GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterNumericValue {
  /** Integer value. */
  int64Value?: string;
  /** Double value. */
  doubleValue?: number;
}

export const GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterNumericValue: Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterNumericValue> =
  Schema.suspend(() =>
    Schema.Struct({
      int64Value: Schema.optional(Schema.String),
      doubleValue: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterNumericValue",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterNumericValue>;

export interface GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterBetweenFilter {
  /** Required. Begins with this number, inclusive. */
  fromValue?: GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterNumericValue;
  /** Required. Ends with this number, inclusive. */
  toValue?: GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterNumericValue;
}

export const GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterBetweenFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterBetweenFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      fromValue: Schema.optional(
        GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterNumericValue,
      ),
      toValue: Schema.optional(
        GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterNumericValue,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterBetweenFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterBetweenFilter>;

export interface GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterStringFilter {
  /** Required. The match type for the string filter. */
  matchType?:
    | "MATCH_TYPE_UNSPECIFIED"
    | "EXACT"
    | "BEGINS_WITH"
    | "ENDS_WITH"
    | "CONTAINS"
    | "FULL_REGEXP"
    | (string & {});
  /** Required. The string value to be matched against. */
  value?: string;
  /** Optional. If true, the match is case-sensitive. If false, the match is case-insensitive. */
  caseSensitive?: boolean;
}

export const GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterStringFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterStringFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      matchType: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
      caseSensitive: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterStringFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterStringFilter>;

export interface GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterNumericFilter {
  /** Required. The numeric or date value to match against. */
  value?: GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterNumericValue;
  /** Required. The operation applied to a numeric filter. */
  operation?:
    | "OPERATION_UNSPECIFIED"
    | "EQUAL"
    | "LESS_THAN"
    | "GREATER_THAN"
    | (string & {});
}

export const GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterNumericFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterNumericFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(
        GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterNumericValue,
      ),
      operation: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterNumericFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterNumericFilter>;

export interface GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilter {
  /** A filter for a string dimension that matches a particular list of options. */
  inListFilter?: GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterInListFilter;
  /** Optional. Indicates whether this filter needs dynamic evaluation or not. If set to true, users join the Audience if they ever met the condition (static evaluation). If unset or set to false, user evaluation for an Audience is dynamic; users are added to an Audience when they meet the conditions and then removed when they no longer meet them. This can only be set when Audience scope is ACROSS_ALL_SESSIONS. */
  atAnyPointInTime?: boolean;
  /** A filter for numeric or date values between certain values on a dimension or metric. */
  betweenFilter?: GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterBetweenFilter;
  /** Required. Immutable. The dimension name or metric name to filter. If the field name refers to a custom dimension or metric, a scope prefix will be added to the front of the custom dimensions or metric name. For more on scope prefixes or custom dimensions/metrics, reference the [Google Analytics Data API documentation] (https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema#custom_dimensions). */
  fieldName?: string;
  /** A filter for a string-type dimension that matches a particular pattern. */
  stringFilter?: GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterStringFilter;
  /** A filter for numeric or date values on a dimension or metric. */
  numericFilter?: GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterNumericFilter;
  /** Optional. If set, specifies the time window for which to evaluate data in number of days. If not set, then audience data is evaluated against lifetime data (For example, infinite time window). For example, if set to 1 day, only the current day's data is evaluated. The reference point is the current day when at_any_point_in_time is unset or false. It can only be set when Audience scope is ACROSS_ALL_SESSIONS and cannot be greater than 60 days. */
  inAnyNDayPeriod?: number;
}

export const GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      inListFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterInListFilter,
      ),
      atAnyPointInTime: Schema.optional(Schema.Boolean),
      betweenFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterBetweenFilter,
      ),
      fieldName: Schema.optional(Schema.String),
      stringFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterStringFilter,
      ),
      numericFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilterNumericFilter,
      ),
      inAnyNDayPeriod: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilter>;

export interface GoogleAnalyticsAdminV1alphaAudienceFilterExpression {
  /** A list of expressions to be AND’ed together. It can only contain AudienceFilterExpressions with or_group. This must be set for the top level AudienceFilterExpression. */
  andGroup?: GoogleAnalyticsAdminV1alphaAudienceFilterExpressionList;
  /** A list of expressions to OR’ed together. It cannot contain AudienceFilterExpressions with and_group or or_group. */
  orGroup?: GoogleAnalyticsAdminV1alphaAudienceFilterExpressionList;
  /** A filter expression to be NOT'ed (For example, inverted, complemented). It can only include a dimension_or_metric_filter. This cannot be set on the top level AudienceFilterExpression. */
  notExpression?: GoogleAnalyticsAdminV1alphaAudienceFilterExpression;
  /** Creates a filter that matches a specific event. This cannot be set on the top level AudienceFilterExpression. */
  eventFilter?: GoogleAnalyticsAdminV1alphaAudienceEventFilter;
  /** A filter on a single dimension or metric. This cannot be set on the top level AudienceFilterExpression. */
  dimensionOrMetricFilter?: GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilter;
}

export const GoogleAnalyticsAdminV1alphaAudienceFilterExpression: Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceFilterExpression> =
  Schema.suspend(() =>
    Schema.Struct({
      andGroup: Schema.optional(
        GoogleAnalyticsAdminV1alphaAudienceFilterExpressionList,
      ),
      orGroup: Schema.optional(
        GoogleAnalyticsAdminV1alphaAudienceFilterExpressionList,
      ),
      notExpression: Schema.optional(
        GoogleAnalyticsAdminV1alphaAudienceFilterExpression,
      ),
      eventFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaAudienceEventFilter,
      ),
      dimensionOrMetricFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaAudienceDimensionOrMetricFilter,
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAudienceFilterExpression",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceFilterExpression>;

export interface GoogleAnalyticsAdminV1alphaAudienceSimpleFilter {
  /** Required. Immutable. Specifies the scope for this filter. */
  scope?:
    | "AUDIENCE_FILTER_SCOPE_UNSPECIFIED"
    | "AUDIENCE_FILTER_SCOPE_WITHIN_SAME_EVENT"
    | "AUDIENCE_FILTER_SCOPE_WITHIN_SAME_SESSION"
    | "AUDIENCE_FILTER_SCOPE_ACROSS_ALL_SESSIONS"
    | (string & {});
  /** Required. Immutable. A logical expression of Audience dimension, metric, or event filters. */
  filterExpression?: GoogleAnalyticsAdminV1alphaAudienceFilterExpression;
}

export const GoogleAnalyticsAdminV1alphaAudienceSimpleFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceSimpleFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      scope: Schema.optional(Schema.String),
      filterExpression: Schema.optional(
        GoogleAnalyticsAdminV1alphaAudienceFilterExpression,
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAudienceSimpleFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceSimpleFilter>;

export interface GoogleAnalyticsAdminV1alphaAudienceSequenceFilterAudienceSequenceStep {
  /** Required. Immutable. Specifies the scope for this step. */
  scope?:
    | "AUDIENCE_FILTER_SCOPE_UNSPECIFIED"
    | "AUDIENCE_FILTER_SCOPE_WITHIN_SAME_EVENT"
    | "AUDIENCE_FILTER_SCOPE_WITHIN_SAME_SESSION"
    | "AUDIENCE_FILTER_SCOPE_ACROSS_ALL_SESSIONS"
    | (string & {});
  /** Required. Immutable. A logical expression of Audience dimension, metric, or event filters in each step. */
  filterExpression?: GoogleAnalyticsAdminV1alphaAudienceFilterExpression;
  /** Optional. If true, the event satisfying this step must be the very next event after the event satisfying the last step. If unset or false, this step indirectly follows the prior step; for example, there may be events between the prior step and this step. It is ignored for the first step. */
  immediatelyFollows?: boolean;
  /** Optional. When set, this step must be satisfied within the constraint_duration of the previous step (For example, t[i] - t[i-1] <= constraint_duration). If not set, there is no duration requirement (the duration is effectively unlimited). It is ignored for the first step. */
  constraintDuration?: string;
}

export const GoogleAnalyticsAdminV1alphaAudienceSequenceFilterAudienceSequenceStep: Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceSequenceFilterAudienceSequenceStep> =
  Schema.suspend(() =>
    Schema.Struct({
      scope: Schema.optional(Schema.String),
      filterExpression: Schema.optional(
        GoogleAnalyticsAdminV1alphaAudienceFilterExpression,
      ),
      immediatelyFollows: Schema.optional(Schema.Boolean),
      constraintDuration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaAudienceSequenceFilterAudienceSequenceStep",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceSequenceFilterAudienceSequenceStep>;

export interface GoogleAnalyticsAdminV1alphaAudienceSequenceFilter {
  /** Required. Immutable. Specifies the scope for this filter. */
  scope?:
    | "AUDIENCE_FILTER_SCOPE_UNSPECIFIED"
    | "AUDIENCE_FILTER_SCOPE_WITHIN_SAME_EVENT"
    | "AUDIENCE_FILTER_SCOPE_WITHIN_SAME_SESSION"
    | "AUDIENCE_FILTER_SCOPE_ACROSS_ALL_SESSIONS"
    | (string & {});
  /** Optional. Defines the time period in which the whole sequence must occur. */
  sequenceMaximumDuration?: string;
  /** Required. An ordered sequence of steps. A user must complete each step in order to join the sequence filter. */
  sequenceSteps?: Array<GoogleAnalyticsAdminV1alphaAudienceSequenceFilterAudienceSequenceStep>;
}

export const GoogleAnalyticsAdminV1alphaAudienceSequenceFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceSequenceFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      scope: Schema.optional(Schema.String),
      sequenceMaximumDuration: Schema.optional(Schema.String),
      sequenceSteps: Schema.optional(
        Schema.Array(
          GoogleAnalyticsAdminV1alphaAudienceSequenceFilterAudienceSequenceStep,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAudienceSequenceFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceSequenceFilter>;

export interface GoogleAnalyticsAdminV1alphaAudienceFilterClause {
  /** Required. Specifies whether this is an include or exclude filter clause. */
  clauseType?:
    | "AUDIENCE_CLAUSE_TYPE_UNSPECIFIED"
    | "INCLUDE"
    | "EXCLUDE"
    | (string & {});
  /** A simple filter that a user must satisfy to be a member of the Audience. */
  simpleFilter?: GoogleAnalyticsAdminV1alphaAudienceSimpleFilter;
  /** Filters that must occur in a specific order for the user to be a member of the Audience. */
  sequenceFilter?: GoogleAnalyticsAdminV1alphaAudienceSequenceFilter;
}

export const GoogleAnalyticsAdminV1alphaAudienceFilterClause: Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceFilterClause> =
  Schema.suspend(() =>
    Schema.Struct({
      clauseType: Schema.optional(Schema.String),
      simpleFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaAudienceSimpleFilter,
      ),
      sequenceFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaAudienceSequenceFilter,
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAudienceFilterClause",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAudienceFilterClause>;

export interface GoogleAnalyticsAdminV1alphaAudience {
  /** Output only. Time when the Audience was created. */
  createTime?: string;
  /** Optional. Specifies an event to log when a user joins the Audience. If not set, no event is logged when a user joins the Audience. */
  eventTrigger?: GoogleAnalyticsAdminV1alphaAudienceEventTrigger;
  /** Immutable. Specifies how long an exclusion lasts for users that meet the exclusion filter. It is applied to all EXCLUDE filter clauses and is ignored when there is no EXCLUDE filter clause in the Audience. */
  exclusionDurationMode?:
    | "AUDIENCE_EXCLUSION_DURATION_MODE_UNSPECIFIED"
    | "EXCLUDE_TEMPORARILY"
    | "EXCLUDE_PERMANENTLY"
    | (string & {});
  /** Required. Immutable. Unordered list. Filter clauses that define the Audience. All clauses will be AND’ed together. */
  filterClauses?: Array<GoogleAnalyticsAdminV1alphaAudienceFilterClause>;
  /** Output only. It is automatically set by GA to false if this is an NPA Audience and is excluded from ads personalization. */
  adsPersonalizationEnabled?: boolean;
  /** Output only. The resource name for this Audience resource. Format: properties/{propertyId}/audiences/{audienceId} */
  name?: string;
  /** Required. The description of the Audience. */
  description?: string;
  /** Required. The display name of the Audience. */
  displayName?: string;
  /** Required. Immutable. The duration a user should stay in an Audience. It cannot be set to more than 540 days. */
  membershipDurationDays?: number;
}

export const GoogleAnalyticsAdminV1alphaAudience: Schema.Schema<GoogleAnalyticsAdminV1alphaAudience> =
  Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      eventTrigger: Schema.optional(
        GoogleAnalyticsAdminV1alphaAudienceEventTrigger,
      ),
      exclusionDurationMode: Schema.optional(Schema.String),
      filterClauses: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaAudienceFilterClause),
      ),
      adsPersonalizationEnabled: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      membershipDurationDays: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAudience",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAudience>;

export interface GoogleAnalyticsAdminV1alphaListAudiencesResponse {
  /** List of Audiences. */
  audiences?: Array<GoogleAnalyticsAdminV1alphaAudience>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListAudiencesResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListAudiencesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      audiences: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaAudience),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListAudiencesResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListAudiencesResponse>;

export interface GoogleAnalyticsAdminV1alphaFirebaseLink {
  /** Immutable. Firebase project resource name. When creating a FirebaseLink, you may provide this resource name using either a project number or project ID. Once this resource has been created, returned FirebaseLinks will always have a project_name that contains a project number. Format: 'projects/{project number}' Example: 'projects/1234' */
  project?: string;
  /** Output only. Time when this FirebaseLink was originally created. */
  createTime?: string;
  /** Output only. Example format: properties/1234/firebaseLinks/5678 */
  name?: string;
}

export const GoogleAnalyticsAdminV1alphaFirebaseLink: Schema.Schema<GoogleAnalyticsAdminV1alphaFirebaseLink> =
  Schema.suspend(() =>
    Schema.Struct({
      project: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaFirebaseLink",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaFirebaseLink>;

export interface GoogleAnalyticsAdminV1alphaListFirebaseLinksResponse {
  /** List of FirebaseLinks. This will have at most one value. */
  firebaseLinks?: Array<GoogleAnalyticsAdminV1alphaFirebaseLink>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. Currently, Google Analytics supports only one FirebaseLink per property, so this will never be populated. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListFirebaseLinksResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListFirebaseLinksResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      firebaseLinks: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaFirebaseLink),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListFirebaseLinksResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListFirebaseLinksResponse>;

export interface GoogleAnalyticsAdminV1alphaSubpropertyEventFilterConditionStringFilter {
  /** Required. The match type for the string filter. */
  matchType?:
    | "MATCH_TYPE_UNSPECIFIED"
    | "EXACT"
    | "BEGINS_WITH"
    | "ENDS_WITH"
    | "CONTAINS"
    | "FULL_REGEXP"
    | "PARTIAL_REGEXP"
    | (string & {});
  /** Required. The string value used for the matching. */
  value?: string;
  /** Optional. If true, the string value is case sensitive. If false, the match is case-insensitive. */
  caseSensitive?: boolean;
}

export const GoogleAnalyticsAdminV1alphaSubpropertyEventFilterConditionStringFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaSubpropertyEventFilterConditionStringFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      matchType: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
      caseSensitive: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaSubpropertyEventFilterConditionStringFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaSubpropertyEventFilterConditionStringFilter>;

export interface GoogleAnalyticsAdminV1alphaSubpropertyEventFilterCondition {
  /** A filter for a string-type dimension that matches a particular pattern. */
  stringFilter?: GoogleAnalyticsAdminV1alphaSubpropertyEventFilterConditionStringFilter;
  /** A filter for null values. */
  nullFilter?: boolean;
  /** Required. The field that is being filtered. */
  fieldName?: string;
}

export const GoogleAnalyticsAdminV1alphaSubpropertyEventFilterCondition: Schema.Schema<GoogleAnalyticsAdminV1alphaSubpropertyEventFilterCondition> =
  Schema.suspend(() =>
    Schema.Struct({
      stringFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaSubpropertyEventFilterConditionStringFilter,
      ),
      nullFilter: Schema.optional(Schema.Boolean),
      fieldName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaSubpropertyEventFilterCondition",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaSubpropertyEventFilterCondition>;

export interface GoogleAnalyticsAdminV1alphaSubpropertyEventFilterExpression {
  /** Creates a filter that matches a specific event. This cannot be set on the top level SubpropertyEventFilterExpression. */
  filterCondition?: GoogleAnalyticsAdminV1alphaSubpropertyEventFilterCondition;
  /** A list of expressions to OR’ed together. Must only contain not_expression or filter_condition expressions. */
  orGroup?: GoogleAnalyticsAdminV1alphaSubpropertyEventFilterExpressionList;
  /** A filter expression to be NOT'ed (inverted, complemented). It can only include a filter. This cannot be set on the top level SubpropertyEventFilterExpression. */
  notExpression?: GoogleAnalyticsAdminV1alphaSubpropertyEventFilterExpression;
}

export const GoogleAnalyticsAdminV1alphaSubpropertyEventFilterExpression: Schema.Schema<GoogleAnalyticsAdminV1alphaSubpropertyEventFilterExpression> =
  Schema.suspend(() =>
    Schema.Struct({
      filterCondition: Schema.optional(
        GoogleAnalyticsAdminV1alphaSubpropertyEventFilterCondition,
      ),
      orGroup: Schema.optional(
        GoogleAnalyticsAdminV1alphaSubpropertyEventFilterExpressionList,
      ),
      notExpression: Schema.optional(
        GoogleAnalyticsAdminV1alphaSubpropertyEventFilterExpression,
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaSubpropertyEventFilterExpression",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaSubpropertyEventFilterExpression>;

export interface GoogleAnalyticsAdminV1alphaSubpropertyEventFilterExpressionList {
  /** Required. Unordered list. A list of Subproperty event filter expressions */
  filterExpressions?: Array<GoogleAnalyticsAdminV1alphaSubpropertyEventFilterExpression>;
}

export const GoogleAnalyticsAdminV1alphaSubpropertyEventFilterExpressionList: Schema.Schema<GoogleAnalyticsAdminV1alphaSubpropertyEventFilterExpressionList> =
  Schema.suspend(() =>
    Schema.Struct({
      filterExpressions: Schema.optional(
        Schema.Array(
          GoogleAnalyticsAdminV1alphaSubpropertyEventFilterExpression,
        ),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaSubpropertyEventFilterExpressionList",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaSubpropertyEventFilterExpressionList>;

export interface GoogleTypeDate {
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
}

export const GoogleTypeDate: Schema.Schema<GoogleTypeDate> = Schema.suspend(
  () =>
    Schema.Struct({
      day: Schema.optional(Schema.Number),
      year: Schema.optional(Schema.Number),
      month: Schema.optional(Schema.Number),
    }),
).annotate({
  identifier: "GoogleTypeDate",
}) as any as Schema.Schema<GoogleTypeDate>;

export interface GoogleAnalyticsAdminV1alphaReportingDataAnnotationDateRange {
  /** Required. The start date for this range. Must be a valid date with year, month, and day set. The date may be in the past, present, or future. */
  startDate?: GoogleTypeDate;
  /** Required. The end date for this range. Must be a valid date with year, month, and day set. This date must be greater than or equal to the start date. */
  endDate?: GoogleTypeDate;
}

export const GoogleAnalyticsAdminV1alphaReportingDataAnnotationDateRange: Schema.Schema<GoogleAnalyticsAdminV1alphaReportingDataAnnotationDateRange> =
  Schema.suspend(() =>
    Schema.Struct({
      startDate: Schema.optional(GoogleTypeDate),
      endDate: Schema.optional(GoogleTypeDate),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaReportingDataAnnotationDateRange",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaReportingDataAnnotationDateRange>;

export interface GoogleAnalyticsAdminV1alphaReportingDataAnnotation {
  /** Required. Identifier. Resource name of this Reporting Data Annotation. Format: 'properties/{property_id}/reportingDataAnnotations/{reporting_data_annotation}' Format: 'properties/123/reportingDataAnnotations/456' */
  name?: string;
  /** Required. Human-readable title for this Reporting Data Annotation. */
  title?: string;
  /** If set, the Reporting Data Annotation is for a specific date represented by this field. The date must be a valid date with year, month and day set. The date may be in the past, present, or future. */
  annotationDate?: GoogleTypeDate;
  /** If set, the Reporting Data Annotation is for a range of dates represented by this field. */
  annotationDateRange?: GoogleAnalyticsAdminV1alphaReportingDataAnnotationDateRange;
  /** Required. The color used for display of this Reporting Data Annotation. */
  color?:
    | "COLOR_UNSPECIFIED"
    | "PURPLE"
    | "BROWN"
    | "BLUE"
    | "GREEN"
    | "RED"
    | "CYAN"
    | "ORANGE"
    | (string & {});
  /** Optional. Description for this Reporting Data Annotation. */
  description?: string;
  /** Output only. If true, this annotation was generated by the Google Analytics system. System-generated annotations cannot be updated or deleted. */
  systemGenerated?: boolean;
}

export const GoogleAnalyticsAdminV1alphaReportingDataAnnotation: Schema.Schema<GoogleAnalyticsAdminV1alphaReportingDataAnnotation> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      annotationDate: Schema.optional(GoogleTypeDate),
      annotationDateRange: Schema.optional(
        GoogleAnalyticsAdminV1alphaReportingDataAnnotationDateRange,
      ),
      color: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      systemGenerated: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaReportingDataAnnotation",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaReportingDataAnnotation>;

export interface GoogleAnalyticsAdminV1alphaListReportingDataAnnotationsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** List of Reporting Data Annotations. */
  reportingDataAnnotations?: Array<GoogleAnalyticsAdminV1alphaReportingDataAnnotation>;
}

export const GoogleAnalyticsAdminV1alphaListReportingDataAnnotationsResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListReportingDataAnnotationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      reportingDataAnnotations: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaReportingDataAnnotation),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaListReportingDataAnnotationsResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListReportingDataAnnotationsResponse>;

export interface GoogleAnalyticsAdminV1alphaDeleteAccessBindingRequest {
  /** Required. Formats: - accounts/{account}/accessBindings/{accessBinding} - properties/{property}/accessBindings/{accessBinding} */
  name?: string;
}

export const GoogleAnalyticsAdminV1alphaDeleteAccessBindingRequest: Schema.Schema<GoogleAnalyticsAdminV1alphaDeleteAccessBindingRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaDeleteAccessBindingRequest",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaDeleteAccessBindingRequest>;

export interface GoogleAnalyticsAdminV1alphaBatchDeleteAccessBindingsRequest {
  /** Required. The requests specifying the access bindings to delete. A maximum of 1000 access bindings can be deleted in a batch. */
  requests?: Array<GoogleAnalyticsAdminV1alphaDeleteAccessBindingRequest>;
}

export const GoogleAnalyticsAdminV1alphaBatchDeleteAccessBindingsRequest: Schema.Schema<GoogleAnalyticsAdminV1alphaBatchDeleteAccessBindingsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      requests: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaDeleteAccessBindingRequest),
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaBatchDeleteAccessBindingsRequest",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaBatchDeleteAccessBindingsRequest>;

export interface GoogleAnalyticsAdminV1alphaLinkProposalStatusDetails {
  /** Output only. The email address of the user that proposed this linkage. */
  requestorEmail?: string;
  /** Output only. The state of this proposal. */
  linkProposalState?:
    | "LINK_PROPOSAL_STATE_UNSPECIFIED"
    | "AWAITING_REVIEW_FROM_GOOGLE_ANALYTICS"
    | "AWAITING_REVIEW_FROM_LINKED_PRODUCT"
    | "WITHDRAWN"
    | "DECLINED"
    | "EXPIRED"
    | "OBSOLETE"
    | (string & {});
  /** Output only. The source of this proposal. */
  linkProposalInitiatingProduct?:
    | "LINK_PROPOSAL_INITIATING_PRODUCT_UNSPECIFIED"
    | "GOOGLE_ANALYTICS"
    | "LINKED_PRODUCT"
    | (string & {});
}

export const GoogleAnalyticsAdminV1alphaLinkProposalStatusDetails: Schema.Schema<GoogleAnalyticsAdminV1alphaLinkProposalStatusDetails> =
  Schema.suspend(() =>
    Schema.Struct({
      requestorEmail: Schema.optional(Schema.String),
      linkProposalState: Schema.optional(Schema.String),
      linkProposalInitiatingProduct: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaLinkProposalStatusDetails",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaLinkProposalStatusDetails>;

export interface GoogleAnalyticsAdminV1alphaNumericValue {
  /** Integer value */
  int64Value?: string;
  /** Double value */
  doubleValue?: number;
}

export const GoogleAnalyticsAdminV1alphaNumericValue: Schema.Schema<GoogleAnalyticsAdminV1alphaNumericValue> =
  Schema.suspend(() =>
    Schema.Struct({
      int64Value: Schema.optional(Schema.String),
      doubleValue: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaNumericValue",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaNumericValue>;

export interface GoogleAnalyticsAdminV1alphaAccessBetweenFilter {
  /** Begins with this number. */
  fromValue?: GoogleAnalyticsAdminV1alphaNumericValue;
  /** Ends with this number. */
  toValue?: GoogleAnalyticsAdminV1alphaNumericValue;
}

export const GoogleAnalyticsAdminV1alphaAccessBetweenFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessBetweenFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      fromValue: Schema.optional(GoogleAnalyticsAdminV1alphaNumericValue),
      toValue: Schema.optional(GoogleAnalyticsAdminV1alphaNumericValue),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessBetweenFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessBetweenFilter>;

export interface GoogleAnalyticsAdminV1alphaAccessInListFilter {
  /** The list of string values. Must be non-empty. */
  values?: Array<string>;
  /** If true, the string value is case sensitive. */
  caseSensitive?: boolean;
}

export const GoogleAnalyticsAdminV1alphaAccessInListFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessInListFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      values: Schema.optional(Schema.Array(Schema.String)),
      caseSensitive: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessInListFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessInListFilter>;

export interface GoogleAnalyticsAdminV1alphaAccessStringFilter {
  /** The match type for this filter. */
  matchType?:
    | "MATCH_TYPE_UNSPECIFIED"
    | "EXACT"
    | "BEGINS_WITH"
    | "ENDS_WITH"
    | "CONTAINS"
    | "FULL_REGEXP"
    | "PARTIAL_REGEXP"
    | (string & {});
  /** The string value used for the matching. */
  value?: string;
  /** If true, the string value is case sensitive. */
  caseSensitive?: boolean;
}

export const GoogleAnalyticsAdminV1alphaAccessStringFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessStringFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      matchType: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
      caseSensitive: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessStringFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessStringFilter>;

export interface GoogleAnalyticsAdminV1alphaAccessNumericFilter {
  /** The operation type for this filter. */
  operation?:
    | "OPERATION_UNSPECIFIED"
    | "EQUAL"
    | "LESS_THAN"
    | "LESS_THAN_OR_EQUAL"
    | "GREATER_THAN"
    | "GREATER_THAN_OR_EQUAL"
    | (string & {});
  /** A numeric value or a date value. */
  value?: GoogleAnalyticsAdminV1alphaNumericValue;
}

export const GoogleAnalyticsAdminV1alphaAccessNumericFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessNumericFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      operation: Schema.optional(Schema.String),
      value: Schema.optional(GoogleAnalyticsAdminV1alphaNumericValue),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessNumericFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessNumericFilter>;

export interface GoogleAnalyticsAdminV1alphaAccessFilter {
  /** A filter for two values. */
  betweenFilter?: GoogleAnalyticsAdminV1alphaAccessBetweenFilter;
  /** The dimension name or metric name. */
  fieldName?: string;
  /** A filter for in list values. */
  inListFilter?: GoogleAnalyticsAdminV1alphaAccessInListFilter;
  /** Strings related filter. */
  stringFilter?: GoogleAnalyticsAdminV1alphaAccessStringFilter;
  /** A filter for numeric or date values. */
  numericFilter?: GoogleAnalyticsAdminV1alphaAccessNumericFilter;
}

export const GoogleAnalyticsAdminV1alphaAccessFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      betweenFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaAccessBetweenFilter,
      ),
      fieldName: Schema.optional(Schema.String),
      inListFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaAccessInListFilter,
      ),
      stringFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaAccessStringFilter,
      ),
      numericFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaAccessNumericFilter,
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessFilter>;

export interface GoogleAnalyticsAdminV1alphaReportingIdentitySettings {
  /** The strategy used for identifying user identities in reports. */
  reportingIdentity?:
    | "IDENTITY_BLENDING_STRATEGY_UNSPECIFIED"
    | "BLENDED"
    | "OBSERVED"
    | "DEVICE_BASED"
    | (string & {});
  /** Output only. Identifier. Resource name for this reporting identity settings singleton resource. Format: properties/{property_id}/reportingIdentitySettings Example: "properties/1234/reportingIdentitySettings" */
  name?: string;
}

export const GoogleAnalyticsAdminV1alphaReportingIdentitySettings: Schema.Schema<GoogleAnalyticsAdminV1alphaReportingIdentitySettings> =
  Schema.suspend(() =>
    Schema.Struct({
      reportingIdentity: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaReportingIdentitySettings",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaReportingIdentitySettings>;

export interface GoogleAnalyticsAdminV1alphaCustomMetric {
  /** Required. Immutable. Tagging name for this custom metric. If this is an event-scoped metric, then this is the event parameter name. May only contain alphanumeric and underscore charactes, starting with a letter. Max length of 40 characters for event-scoped metrics. */
  parameterName?: string;
  /** Required. Immutable. The scope of this custom metric. */
  scope?: "METRIC_SCOPE_UNSPECIFIED" | "EVENT" | (string & {});
  /** Optional. Description for this custom dimension. Max length of 150 characters. */
  description?: string;
  /** Required. The type for the custom metric's value. */
  measurementUnit?:
    | "MEASUREMENT_UNIT_UNSPECIFIED"
    | "STANDARD"
    | "CURRENCY"
    | "FEET"
    | "METERS"
    | "KILOMETERS"
    | "MILES"
    | "MILLISECONDS"
    | "SECONDS"
    | "MINUTES"
    | "HOURS"
    | (string & {});
  /** Optional. Types of restricted data that this metric may contain. Required for metrics with CURRENCY measurement unit. Must be empty for metrics with a non-CURRENCY measurement unit. */
  restrictedMetricType?: Array<
    | "RESTRICTED_METRIC_TYPE_UNSPECIFIED"
    | "COST_DATA"
    | "REVENUE_DATA"
    | (string & {})
  >;
  /** Required. Display name for this custom metric as shown in the Analytics UI. Max length of 82 characters, alphanumeric plus space and underscore starting with a letter. Legacy system-generated display names may contain square brackets, but updates to this field will never permit square brackets. */
  displayName?: string;
  /** Output only. Resource name for this CustomMetric resource. Format: properties/{property}/customMetrics/{customMetric} */
  name?: string;
}

export const GoogleAnalyticsAdminV1alphaCustomMetric: Schema.Schema<GoogleAnalyticsAdminV1alphaCustomMetric> =
  Schema.suspend(() =>
    Schema.Struct({
      parameterName: Schema.optional(Schema.String),
      scope: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      measurementUnit: Schema.optional(Schema.String),
      restrictedMetricType: Schema.optional(Schema.Array(Schema.String)),
      displayName: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaCustomMetric",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaCustomMetric>;

export interface GoogleAnalyticsAdminV1alphaListCustomMetricsResponse {
  /** List of CustomMetrics. */
  customMetrics?: Array<GoogleAnalyticsAdminV1alphaCustomMetric>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListCustomMetricsResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListCustomMetricsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      customMetrics: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaCustomMetric),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListCustomMetricsResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListCustomMetricsResponse>;

export interface GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink {
  /** Output only. The resource name for this DisplayVideo360AdvertiserLink resource. Format: properties/{propertyId}/displayVideo360AdvertiserLinks/{linkId} Note: linkId is not the Display & Video 360 Advertiser ID */
  name?: string;
  /** Output only. The display name of the Display & Video 360 Advertiser. */
  advertiserDisplayName?: string;
  /** Enables personalized advertising features with this integration. If this field is not set on create/update, it will be defaulted to true. */
  adsPersonalizationEnabled?: boolean;
  /** Immutable. Enables the import of cost data from Display & Video 360 into the Google Analytics property. This can only be enabled if `campaign_data_sharing_enabled` is true. After link creation, this can only be updated from the Display & Video 360 product. If this field is not set on create, it will be defaulted to true. */
  costDataSharingEnabled?: boolean;
  /** Immutable. The Display & Video 360 Advertiser's advertiser ID. */
  advertiserId?: string;
  /** Immutable. Enables the import of campaign data from Display & Video 360 into the Google Analytics property. After link creation, this can only be updated from the Display & Video 360 product. If this field is not set on create, it will be defaulted to true. */
  campaignDataSharingEnabled?: boolean;
}

export const GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink: Schema.Schema<GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      advertiserDisplayName: Schema.optional(Schema.String),
      adsPersonalizationEnabled: Schema.optional(Schema.Boolean),
      costDataSharingEnabled: Schema.optional(Schema.Boolean),
      advertiserId: Schema.optional(Schema.String),
      campaignDataSharingEnabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink>;

export interface GoogleAnalyticsAdminV1alphaEnhancedMeasurementSettings {
  /** If enabled, capture a form interaction event each time a visitor interacts with a form on your website. False by default. */
  formInteractionsEnabled?: boolean;
  /** Required. URL query parameters to interpret as site search parameters. Max length is 1024 characters. Must not be empty. */
  searchQueryParameter?: string;
  /** If enabled, capture scroll events each time a visitor gets to the bottom of a page. */
  scrollsEnabled?: boolean;
  /** If enabled, capture a page view event each time the website changes the browser history state. */
  pageChangesEnabled?: boolean;
  /** Output only. Resource name of the Enhanced Measurement Settings. Format: properties/{property_id}/dataStreams/{data_stream}/enhancedMeasurementSettings Example: "properties/1000/dataStreams/2000/enhancedMeasurementSettings" */
  name?: string;
  /** If enabled, capture a view search results event each time a visitor performs a search on your site (based on a query parameter). */
  siteSearchEnabled?: boolean;
  /** If enabled, capture an outbound click event each time a visitor clicks a link that leads them away from your domain. */
  outboundClicksEnabled?: boolean;
  /** If enabled, capture video play, progress, and complete events as visitors view embedded videos on your site. */
  videoEngagementEnabled?: boolean;
  /** Additional URL query parameters. Max length is 1024 characters. */
  uriQueryParameter?: string;
  /** Indicates whether Enhanced Measurement Settings will be used to automatically measure interactions and content on this web stream. Changing this value does not affect the settings themselves, but determines whether they are respected. */
  streamEnabled?: boolean;
  /** If enabled, capture a file download event each time a link is clicked with a common document, compressed file, application, video, or audio extension. */
  fileDownloadsEnabled?: boolean;
}

export const GoogleAnalyticsAdminV1alphaEnhancedMeasurementSettings: Schema.Schema<GoogleAnalyticsAdminV1alphaEnhancedMeasurementSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      formInteractionsEnabled: Schema.optional(Schema.Boolean),
      searchQueryParameter: Schema.optional(Schema.String),
      scrollsEnabled: Schema.optional(Schema.Boolean),
      pageChangesEnabled: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
      siteSearchEnabled: Schema.optional(Schema.Boolean),
      outboundClicksEnabled: Schema.optional(Schema.Boolean),
      videoEngagementEnabled: Schema.optional(Schema.Boolean),
      uriQueryParameter: Schema.optional(Schema.String),
      streamEnabled: Schema.optional(Schema.Boolean),
      fileDownloadsEnabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaEnhancedMeasurementSettings",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaEnhancedMeasurementSettings>;

export interface GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLinkProposal {
  /** Input only. On a proposal being sent to Display & Video 360, this field must be set to the email address of an admin on the target advertiser. This is used to verify that the Google Analytics admin is aware of at least one admin on the Display & Video 360 Advertiser. This does not restrict approval of the proposal to a single user. Any admin on the Display & Video 360 Advertiser may approve the proposal. */
  validationEmail?: string;
  /** Immutable. The Display & Video 360 Advertiser's advertiser ID. */
  advertiserId?: string;
  /** Output only. The status information for this link proposal. */
  linkProposalStatusDetails?: GoogleAnalyticsAdminV1alphaLinkProposalStatusDetails;
  /** Immutable. Enables the import of campaign data from Display & Video 360. If this field is not set on create, it will be defaulted to true. */
  campaignDataSharingEnabled?: boolean;
  /** Immutable. Enables the import of cost data from Display & Video 360. This can only be enabled if campaign_data_sharing_enabled is enabled. If this field is not set on create, it will be defaulted to true. */
  costDataSharingEnabled?: boolean;
  /** Immutable. Enables personalized advertising features with this integration. If this field is not set on create, it will be defaulted to true. */
  adsPersonalizationEnabled?: boolean;
  /** Output only. The resource name for this DisplayVideo360AdvertiserLinkProposal resource. Format: properties/{propertyId}/displayVideo360AdvertiserLinkProposals/{proposalId} Note: proposalId is not the Display & Video 360 Advertiser ID */
  name?: string;
  /** Output only. The display name of the Display & Video Advertiser. Only populated for proposals that originated from Display & Video 360. */
  advertiserDisplayName?: string;
}

export const GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLinkProposal: Schema.Schema<GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLinkProposal> =
  Schema.suspend(() =>
    Schema.Struct({
      validationEmail: Schema.optional(Schema.String),
      advertiserId: Schema.optional(Schema.String),
      linkProposalStatusDetails: Schema.optional(
        GoogleAnalyticsAdminV1alphaLinkProposalStatusDetails,
      ),
      campaignDataSharingEnabled: Schema.optional(Schema.Boolean),
      costDataSharingEnabled: Schema.optional(Schema.Boolean),
      adsPersonalizationEnabled: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
      advertiserDisplayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLinkProposal",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLinkProposal>;

export interface GoogleAnalyticsAdminV1alphaSubpropertyEventFilterClause {
  /** Required. The type for the filter clause. */
  filterClauseType?:
    | "FILTER_CLAUSE_TYPE_UNSPECIFIED"
    | "INCLUDE"
    | "EXCLUDE"
    | (string & {});
  /** Required. The logical expression for what events are sent to the subproperty. */
  filterExpression?: GoogleAnalyticsAdminV1alphaSubpropertyEventFilterExpression;
}

export const GoogleAnalyticsAdminV1alphaSubpropertyEventFilterClause: Schema.Schema<GoogleAnalyticsAdminV1alphaSubpropertyEventFilterClause> =
  Schema.suspend(() =>
    Schema.Struct({
      filterClauseType: Schema.optional(Schema.String),
      filterExpression: Schema.optional(
        GoogleAnalyticsAdminV1alphaSubpropertyEventFilterExpression,
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaSubpropertyEventFilterClause",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaSubpropertyEventFilterClause>;

export interface GoogleAnalyticsAdminV1alphaSubpropertyEventFilter {
  /** Required. Unordered list. Filter clauses that define the SubpropertyEventFilter. All clauses are AND'ed together to determine what data is sent to the subproperty. */
  filterClauses?: Array<GoogleAnalyticsAdminV1alphaSubpropertyEventFilterClause>;
  /** Immutable. Resource name of the Subproperty that uses this filter. */
  applyToProperty?: string;
  /** Output only. Format: properties/{ordinary_property_id}/subpropertyEventFilters/{sub_property_event_filter} Example: properties/1234/subpropertyEventFilters/5678 */
  name?: string;
}

export const GoogleAnalyticsAdminV1alphaSubpropertyEventFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaSubpropertyEventFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      filterClauses: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaSubpropertyEventFilterClause),
      ),
      applyToProperty: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaSubpropertyEventFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaSubpropertyEventFilter>;

export interface GoogleAnalyticsAdminV1alphaProperty {
  /** Industry associated with this property Example: AUTOMOTIVE, FOOD_AND_DRINK */
  industryCategory?:
    | "INDUSTRY_CATEGORY_UNSPECIFIED"
    | "AUTOMOTIVE"
    | "BUSINESS_AND_INDUSTRIAL_MARKETS"
    | "FINANCE"
    | "HEALTHCARE"
    | "TECHNOLOGY"
    | "TRAVEL"
    | "OTHER"
    | "ARTS_AND_ENTERTAINMENT"
    | "BEAUTY_AND_FITNESS"
    | "BOOKS_AND_LITERATURE"
    | "FOOD_AND_DRINK"
    | "GAMES"
    | "HOBBIES_AND_LEISURE"
    | "HOME_AND_GARDEN"
    | "INTERNET_AND_TELECOM"
    | "LAW_AND_GOVERNMENT"
    | "NEWS"
    | "ONLINE_COMMUNITIES"
    | "PEOPLE_AND_SOCIETY"
    | "PETS_AND_ANIMALS"
    | "REAL_ESTATE"
    | "REFERENCE"
    | "SCIENCE"
    | "SPORTS"
    | "JOBS_AND_EDUCATION"
    | "SHOPPING"
    | (string & {});
  /** Output only. If set, the time at which this property was trashed. If not set, then this property is not currently in the trash can. */
  deleteTime?: string;
  /** Output only. If set, the time at which this trashed property will be permanently deleted. If not set, then this property is not currently in the trash can and is not slated to be deleted. */
  expireTime?: string;
  /** Output only. Time when entity payload fields were last updated. */
  updateTime?: string;
  /** Output only. Resource name of this property. Format: properties/{property_id} Example: "properties/1000" */
  name?: string;
  /** Immutable. The property type for this Property resource. When creating a property, if the type is "PROPERTY_TYPE_UNSPECIFIED", then "ORDINARY_PROPERTY" will be implied. */
  propertyType?:
    | "PROPERTY_TYPE_UNSPECIFIED"
    | "PROPERTY_TYPE_ORDINARY"
    | "PROPERTY_TYPE_SUBPROPERTY"
    | "PROPERTY_TYPE_ROLLUP"
    | (string & {});
  /** Required. Reporting Time Zone, used as the day boundary for reports, regardless of where the data originates. If the time zone honors DST, Analytics will automatically adjust for the changes. NOTE: Changing the time zone only affects data going forward, and is not applied retroactively. Format: https://www.iana.org/time-zones Example: "America/Los_Angeles" */
  timeZone?: string;
  /** Output only. The Google Analytics service level that applies to this property. */
  serviceLevel?:
    | "SERVICE_LEVEL_UNSPECIFIED"
    | "GOOGLE_ANALYTICS_STANDARD"
    | "GOOGLE_ANALYTICS_360"
    | (string & {});
  /** Immutable. Resource name of this property's logical parent. Note: The Property-Moving UI can be used to change the parent. Format: accounts/{account}, properties/{property} Example: "accounts/100", "properties/101" */
  parent?: string;
  /** The currency type used in reports involving monetary values. Format: https://en.wikipedia.org/wiki/ISO_4217 Examples: "USD", "EUR", "JPY" */
  currencyCode?: string;
  /** Required. Human-readable display name for this property. The max allowed display name length is 100 UTF-16 code units. */
  displayName?: string;
  /** Output only. Time when the entity was originally created. */
  createTime?: string;
  /** Immutable. The resource name of the parent account Format: accounts/{account_id} Example: "accounts/123" */
  account?: string;
}

export const GoogleAnalyticsAdminV1alphaProperty: Schema.Schema<GoogleAnalyticsAdminV1alphaProperty> =
  Schema.suspend(() =>
    Schema.Struct({
      industryCategory: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      expireTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      propertyType: Schema.optional(Schema.String),
      timeZone: Schema.optional(Schema.String),
      serviceLevel: Schema.optional(Schema.String),
      parent: Schema.optional(Schema.String),
      currencyCode: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      account: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaProperty",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaProperty>;

export interface GoogleAnalyticsAdminV1alphaProvisionSubpropertyResponse {
  /** The created subproperty event filter. */
  subpropertyEventFilter?: GoogleAnalyticsAdminV1alphaSubpropertyEventFilter;
  /** The created subproperty. */
  subproperty?: GoogleAnalyticsAdminV1alphaProperty;
}

export const GoogleAnalyticsAdminV1alphaProvisionSubpropertyResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaProvisionSubpropertyResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      subpropertyEventFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaSubpropertyEventFilter,
      ),
      subproperty: Schema.optional(GoogleAnalyticsAdminV1alphaProperty),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaProvisionSubpropertyResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaProvisionSubpropertyResponse>;

export interface GoogleAnalyticsAdminV1alphaAccessQuotaStatus {
  /** Quota consumed by this request. */
  consumed?: number;
  /** Quota remaining after this request. */
  remaining?: number;
}

export const GoogleAnalyticsAdminV1alphaAccessQuotaStatus: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessQuotaStatus> =
  Schema.suspend(() =>
    Schema.Struct({
      consumed: Schema.optional(Schema.Number),
      remaining: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessQuotaStatus",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessQuotaStatus>;

export interface GoogleAnalyticsAdminV1alphaAccessQuota {
  /** Properties can use 250,000 tokens per day. Most requests consume fewer than 10 tokens. */
  tokensPerDay?: GoogleAnalyticsAdminV1alphaAccessQuotaStatus;
  /** Properties can use up to 50 concurrent requests. */
  concurrentRequests?: GoogleAnalyticsAdminV1alphaAccessQuotaStatus;
  /** Properties can use up to 25% of their tokens per project per hour. This amounts to Analytics 360 Properties can use 12,500 tokens per project per hour. An API request consumes a single number of tokens, and that number is deducted from all of the hourly, daily, and per project hourly quotas. */
  tokensPerProjectPerHour?: GoogleAnalyticsAdminV1alphaAccessQuotaStatus;
  /** Properties and cloud project pairs can have up to 50 server errors per hour. */
  serverErrorsPerProjectPerHour?: GoogleAnalyticsAdminV1alphaAccessQuotaStatus;
  /** Properties can use 50,000 tokens per hour. An API request consumes a single number of tokens, and that number is deducted from all of the hourly, daily, and per project hourly quotas. */
  tokensPerHour?: GoogleAnalyticsAdminV1alphaAccessQuotaStatus;
}

export const GoogleAnalyticsAdminV1alphaAccessQuota: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessQuota> =
  Schema.suspend(() =>
    Schema.Struct({
      tokensPerDay: Schema.optional(
        GoogleAnalyticsAdminV1alphaAccessQuotaStatus,
      ),
      concurrentRequests: Schema.optional(
        GoogleAnalyticsAdminV1alphaAccessQuotaStatus,
      ),
      tokensPerProjectPerHour: Schema.optional(
        GoogleAnalyticsAdminV1alphaAccessQuotaStatus,
      ),
      serverErrorsPerProjectPerHour: Schema.optional(
        GoogleAnalyticsAdminV1alphaAccessQuotaStatus,
      ),
      tokensPerHour: Schema.optional(
        GoogleAnalyticsAdminV1alphaAccessQuotaStatus,
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessQuota",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessQuota>;

export interface GoogleAnalyticsAdminV1alphaListSubpropertySyncConfigsResponse {
  /** List of `SubpropertySyncConfig` resources. */
  subpropertySyncConfigs?: Array<GoogleAnalyticsAdminV1alphaSubpropertySyncConfig>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListSubpropertySyncConfigsResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListSubpropertySyncConfigsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      subpropertySyncConfigs: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaSubpropertySyncConfig),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListSubpropertySyncConfigsResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListSubpropertySyncConfigsResponse>;

export interface GoogleAnalyticsAdminV1alphaAccessBinding {
  /** If set, the email address of the user to set roles for. Format: "someuser@gmail.com" */
  user?: string;
  /** A list of roles for to grant to the parent resource. Valid values: predefinedRoles/viewer predefinedRoles/analyst predefinedRoles/editor predefinedRoles/admin predefinedRoles/no-cost-data predefinedRoles/no-revenue-data For users, if an empty list of roles is set, this AccessBinding will be deleted. */
  roles?: Array<string>;
  /** Output only. Resource name of this binding. Format: accounts/{account}/accessBindings/{access_binding} or properties/{property}/accessBindings/{access_binding} Example: "accounts/100/accessBindings/200" */
  name?: string;
}

export const GoogleAnalyticsAdminV1alphaAccessBinding: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessBinding> =
  Schema.suspend(() =>
    Schema.Struct({
      user: Schema.optional(Schema.String),
      roles: Schema.optional(Schema.Array(Schema.String)),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessBinding",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessBinding>;

export interface GoogleAnalyticsAdminV1alphaSubmitUserDeletionRequest {
  /** Google Analytics [user ID](https://firebase.google.com/docs/analytics/userid). */
  userId?: string;
  /** Firebase [application instance ID](https://firebase.google.com/docs/reference/android/com/google/firebase/analytics/FirebaseAnalytics.html#getAppInstanceId). */
  appInstanceId?: string;
  /** Google Analytics [client ID](https://support.google.com/analytics/answer/11593727). */
  clientId?: string;
  /** [User-provided data](https://support.google.com/analytics/answer/14077171). May contain either one email address or one phone number. Email addresses should be normalized as such: * lowercase * remove periods before @ for gmail.com/googlemail.com addresses * remove all spaces Phone numbers should be normalized as such: * remove all non digit characters * add + prefix */
  userProvidedData?: string;
}

export const GoogleAnalyticsAdminV1alphaSubmitUserDeletionRequest: Schema.Schema<GoogleAnalyticsAdminV1alphaSubmitUserDeletionRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      userId: Schema.optional(Schema.String),
      appInstanceId: Schema.optional(Schema.String),
      clientId: Schema.optional(Schema.String),
      userProvidedData: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaSubmitUserDeletionRequest",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaSubmitUserDeletionRequest>;

export interface GoogleAnalyticsAdminV1alphaDataSharingSettings {
  /** Enable features like predictions, modeled data, and benchmarking that can provide you with richer business insights when you contribute aggregated measurement data. The data you share (including information about the property from which it is shared) is aggregated and de-identified before being used to generate business insights. This field maps to the "Modeling contributions & business insights" field in the Google Analytics Admin UI. */
  sharingWithOthersEnabled?: boolean;
  /** Output only. Resource name. Format: accounts/{account}/dataSharingSettings Example: "accounts/1000/dataSharingSettings" */
  name?: string;
  /** Deprecated. This field is no longer used and always returns false. */
  sharingWithGoogleAnySalesEnabled?: boolean;
  /** Allows Google technical support representatives access to your Google Analytics data and account when necessary to provide service and find solutions to technical issues. This field maps to the "Technical support" field in the Google Analytics Admin UI. */
  sharingWithGoogleSupportEnabled?: boolean;
  /** Allows Google access to your Google Analytics account data, including account usage and configuration data, product spending, and users associated with your Google Analytics account, so that Google can help you make the most of Google products, providing you with insights, offers, recommendations, and optimization tips across Google Analytics and other Google products for business. This field maps to the "Recommendations for your business" field in the Google Analytics Admin UI. */
  sharingWithGoogleAssignedSalesEnabled?: boolean;
  /** Allows Google to use the data to improve other Google products or services. This fields maps to the "Google products & services" field in the Google Analytics Admin UI. */
  sharingWithGoogleProductsEnabled?: boolean;
}

export const GoogleAnalyticsAdminV1alphaDataSharingSettings: Schema.Schema<GoogleAnalyticsAdminV1alphaDataSharingSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      sharingWithOthersEnabled: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
      sharingWithGoogleAnySalesEnabled: Schema.optional(Schema.Boolean),
      sharingWithGoogleSupportEnabled: Schema.optional(Schema.Boolean),
      sharingWithGoogleAssignedSalesEnabled: Schema.optional(Schema.Boolean),
      sharingWithGoogleProductsEnabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaDataSharingSettings",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaDataSharingSettings>;

export interface GoogleAnalyticsAdminV1alphaExpandedDataSet {
  /** Required. The display name of the ExpandedDataSet. Max 200 chars. */
  displayName?: string;
  /** Output only. The resource name for this ExpandedDataSet resource. Format: properties/{property_id}/expandedDataSets/{expanded_data_set} */
  name?: string;
  /** Output only. Time when expanded data set began (or will begin) collecing data. */
  dataCollectionStartTime?: string;
  /** Immutable. The list of dimensions included in the ExpandedDataSet. See the [API Dimensions](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema#dimensions) for the list of dimension names. */
  dimensionNames?: Array<string>;
  /** Immutable. The list of metrics included in the ExpandedDataSet. See the [API Metrics](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema#metrics) for the list of dimension names. */
  metricNames?: Array<string>;
  /** Immutable. A logical expression of ExpandedDataSet filters applied to dimension included in the ExpandedDataSet. This filter is used to reduce the number of rows and thus the chance of encountering `other` row. */
  dimensionFilterExpression?: GoogleAnalyticsAdminV1alphaExpandedDataSetFilterExpression;
  /** Optional. The description of the ExpandedDataSet. Max 50 chars. */
  description?: string;
}

export const GoogleAnalyticsAdminV1alphaExpandedDataSet: Schema.Schema<GoogleAnalyticsAdminV1alphaExpandedDataSet> =
  Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      dataCollectionStartTime: Schema.optional(Schema.String),
      dimensionNames: Schema.optional(Schema.Array(Schema.String)),
      metricNames: Schema.optional(Schema.Array(Schema.String)),
      dimensionFilterExpression: Schema.optional(
        GoogleAnalyticsAdminV1alphaExpandedDataSetFilterExpression,
      ),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaExpandedDataSet",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaExpandedDataSet>;

export interface GoogleAnalyticsAdminV1alphaListExpandedDataSetsResponse {
  /** List of ExpandedDataSet. These will be ordered stably, but in an arbitrary order. */
  expandedDataSets?: Array<GoogleAnalyticsAdminV1alphaExpandedDataSet>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListExpandedDataSetsResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListExpandedDataSetsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      expandedDataSets: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaExpandedDataSet),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListExpandedDataSetsResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListExpandedDataSetsResponse>;

export interface GoogleAnalyticsAdminV1alphaDataStreamAndroidAppStreamData {
  /** Output only. ID of the corresponding Android app in Firebase, if any. This ID can change if the Android app is deleted and recreated. */
  firebaseAppId?: string;
  /** Immutable. The package name for the app being measured. Example: "com.example.myandroidapp" */
  packageName?: string;
}

export const GoogleAnalyticsAdminV1alphaDataStreamAndroidAppStreamData: Schema.Schema<GoogleAnalyticsAdminV1alphaDataStreamAndroidAppStreamData> =
  Schema.suspend(() =>
    Schema.Struct({
      firebaseAppId: Schema.optional(Schema.String),
      packageName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaDataStreamAndroidAppStreamData",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaDataStreamAndroidAppStreamData>;

export interface GoogleAnalyticsAdminV1alphaDataStreamIosAppStreamData {
  /** Output only. ID of the corresponding iOS app in Firebase, if any. This ID can change if the iOS app is deleted and recreated. */
  firebaseAppId?: string;
  /** Required. Immutable. The Apple App Store Bundle ID for the app Example: "com.example.myiosapp" */
  bundleId?: string;
}

export const GoogleAnalyticsAdminV1alphaDataStreamIosAppStreamData: Schema.Schema<GoogleAnalyticsAdminV1alphaDataStreamIosAppStreamData> =
  Schema.suspend(() =>
    Schema.Struct({
      firebaseAppId: Schema.optional(Schema.String),
      bundleId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaDataStreamIosAppStreamData",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaDataStreamIosAppStreamData>;

export interface GoogleAnalyticsAdminV1alphaDataStreamWebStreamData {
  /** Domain name of the web app being measured, or empty. Example: "http://www.google.com", "https://www.google.com" */
  defaultUri?: string;
  /** Output only. Analytics Measurement ID. Example: "G-1A2BCD345E" */
  measurementId?: string;
  /** Output only. ID of the corresponding web app in Firebase, if any. This ID can change if the web app is deleted and recreated. */
  firebaseAppId?: string;
}

export const GoogleAnalyticsAdminV1alphaDataStreamWebStreamData: Schema.Schema<GoogleAnalyticsAdminV1alphaDataStreamWebStreamData> =
  Schema.suspend(() =>
    Schema.Struct({
      defaultUri: Schema.optional(Schema.String),
      measurementId: Schema.optional(Schema.String),
      firebaseAppId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaDataStreamWebStreamData",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaDataStreamWebStreamData>;

export interface GoogleAnalyticsAdminV1alphaDataStream {
  /** Output only. Time when stream payload fields were last updated. */
  updateTime?: string;
  /** Required. Immutable. The type of this DataStream resource. */
  type?:
    | "DATA_STREAM_TYPE_UNSPECIFIED"
    | "WEB_DATA_STREAM"
    | "ANDROID_APP_DATA_STREAM"
    | "IOS_APP_DATA_STREAM"
    | (string & {});
  /** Data specific to Android app streams. Must be populated if type is ANDROID_APP_DATA_STREAM. */
  androidAppStreamData?: GoogleAnalyticsAdminV1alphaDataStreamAndroidAppStreamData;
  /** Data specific to iOS app streams. Must be populated if type is IOS_APP_DATA_STREAM. */
  iosAppStreamData?: GoogleAnalyticsAdminV1alphaDataStreamIosAppStreamData;
  /** Output only. Time when this stream was originally created. */
  createTime?: string;
  /** Output only. Resource name of this Data Stream. Format: properties/{property_id}/dataStreams/{stream_id} Example: "properties/1000/dataStreams/2000" */
  name?: string;
  /** Human-readable display name for the Data Stream. Required for web data streams. The max allowed display name length is 255 UTF-16 code units. */
  displayName?: string;
  /** Data specific to web streams. Must be populated if type is WEB_DATA_STREAM. */
  webStreamData?: GoogleAnalyticsAdminV1alphaDataStreamWebStreamData;
}

export const GoogleAnalyticsAdminV1alphaDataStream: Schema.Schema<GoogleAnalyticsAdminV1alphaDataStream> =
  Schema.suspend(() =>
    Schema.Struct({
      updateTime: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      androidAppStreamData: Schema.optional(
        GoogleAnalyticsAdminV1alphaDataStreamAndroidAppStreamData,
      ),
      iosAppStreamData: Schema.optional(
        GoogleAnalyticsAdminV1alphaDataStreamIosAppStreamData,
      ),
      createTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      webStreamData: Schema.optional(
        GoogleAnalyticsAdminV1alphaDataStreamWebStreamData,
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaDataStream",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaDataStream>;

export interface GoogleAnalyticsAdminV1alphaListDataStreamsResponse {
  /** List of DataStreams. */
  dataStreams?: Array<GoogleAnalyticsAdminV1alphaDataStream>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListDataStreamsResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListDataStreamsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      dataStreams: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaDataStream),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListDataStreamsResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListDataStreamsResponse>;

export interface GoogleAnalyticsAdminV1alphaAccount {
  /** Output only. Time when account payload fields were last updated. */
  updateTime?: string;
  /** Output only. Indicates whether this Account is soft-deleted or not. Deleted accounts are excluded from List results unless specifically requested. */
  deleted?: boolean;
  /** Output only. Time when this account was originally created. */
  createTime?: string;
  /** Output only. The URI for a Google Marketing Platform organization resource. Only set when this account is connected to a GMP organization. Format: marketingplatformadmin.googleapis.com/organizations/{org_id} */
  gmpOrganization?: string;
  /** Required. Human-readable display name for this account. */
  displayName?: string;
  /** Country of business. Must be a Unicode CLDR region code. */
  regionCode?: string;
  /** Output only. Resource name of this account. Format: accounts/{account} Example: "accounts/100" */
  name?: string;
}

export const GoogleAnalyticsAdminV1alphaAccount: Schema.Schema<GoogleAnalyticsAdminV1alphaAccount> =
  Schema.suspend(() =>
    Schema.Struct({
      updateTime: Schema.optional(Schema.String),
      deleted: Schema.optional(Schema.Boolean),
      createTime: Schema.optional(Schema.String),
      gmpOrganization: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      regionCode: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccount",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccount>;

export interface GoogleAnalyticsAdminV1alphaConversionEventDefaultConversionValue {
  /** This value will be used to populate the value for all conversions of the specified event_name where the event "value" parameter is unset. */
  value?: number;
  /** When a conversion event for this event_name has no set currency, this currency will be applied as the default. Must be in ISO 4217 currency code format. See https://en.wikipedia.org/wiki/ISO_4217 for more information. */
  currencyCode?: string;
}

export const GoogleAnalyticsAdminV1alphaConversionEventDefaultConversionValue: Schema.Schema<GoogleAnalyticsAdminV1alphaConversionEventDefaultConversionValue> =
  Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.Number),
      currencyCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaConversionEventDefaultConversionValue",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaConversionEventDefaultConversionValue>;

export interface GoogleAnalyticsAdminV1alphaCreateAccessBindingRequest {
  /** Required. Formats: - accounts/{account} - properties/{property} */
  parent?: string;
  /** Required. The access binding to create. */
  accessBinding?: GoogleAnalyticsAdminV1alphaAccessBinding;
}

export const GoogleAnalyticsAdminV1alphaCreateAccessBindingRequest: Schema.Schema<GoogleAnalyticsAdminV1alphaCreateAccessBindingRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      parent: Schema.optional(Schema.String),
      accessBinding: Schema.optional(GoogleAnalyticsAdminV1alphaAccessBinding),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaCreateAccessBindingRequest",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaCreateAccessBindingRequest>;

export interface GoogleAnalyticsAdminV1alphaBatchCreateAccessBindingsRequest {
  /** Required. The requests specifying the access bindings to create. A maximum of 1000 access bindings can be created in a batch. */
  requests?: Array<GoogleAnalyticsAdminV1alphaCreateAccessBindingRequest>;
}

export const GoogleAnalyticsAdminV1alphaBatchCreateAccessBindingsRequest: Schema.Schema<GoogleAnalyticsAdminV1alphaBatchCreateAccessBindingsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      requests: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaCreateAccessBindingRequest),
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaBatchCreateAccessBindingsRequest",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaBatchCreateAccessBindingsRequest>;

export interface GoogleAnalyticsAdminV1alphaMatchingCondition {
  /** Required. The name of the field that is compared against for the condition. If 'event_name' is specified this condition will apply to the name of the event. Otherwise the condition will apply to a parameter with the specified name. This value cannot contain spaces. */
  field?: string;
  /** Required. The type of comparison to be applied to the value. */
  comparisonType?:
    | "COMPARISON_TYPE_UNSPECIFIED"
    | "EQUALS"
    | "EQUALS_CASE_INSENSITIVE"
    | "CONTAINS"
    | "CONTAINS_CASE_INSENSITIVE"
    | "STARTS_WITH"
    | "STARTS_WITH_CASE_INSENSITIVE"
    | "ENDS_WITH"
    | "ENDS_WITH_CASE_INSENSITIVE"
    | "GREATER_THAN"
    | "GREATER_THAN_OR_EQUAL"
    | "LESS_THAN"
    | "LESS_THAN_OR_EQUAL"
    | "REGULAR_EXPRESSION"
    | "REGULAR_EXPRESSION_CASE_INSENSITIVE"
    | (string & {});
  /** Whether or not the result of the comparison should be negated. For example, if `negated` is true, then 'equals' comparisons would function as 'not equals'. */
  negated?: boolean;
  /** Required. The value being compared against for this condition. The runtime implementation may perform type coercion of this value to evaluate this condition based on the type of the parameter value. */
  value?: string;
}

export const GoogleAnalyticsAdminV1alphaMatchingCondition: Schema.Schema<GoogleAnalyticsAdminV1alphaMatchingCondition> =
  Schema.suspend(() =>
    Schema.Struct({
      field: Schema.optional(Schema.String),
      comparisonType: Schema.optional(Schema.String),
      negated: Schema.optional(Schema.Boolean),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaMatchingCondition",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaMatchingCondition>;

export interface GoogleAnalyticsAdminV1alphaParameterMutation {
  /** Required. The name of the parameter to mutate. This value must: * be less than 40 characters. * be unique across across all mutations within the rule * consist only of letters, digits or _ (underscores) For event edit rules, the name may also be set to 'event_name' to modify the event_name in place. */
  parameter?: string;
  /** Required. The value mutation to perform. * Must be less than 100 characters. * To specify a constant value for the param, use the value's string. * To copy value from another parameter, use syntax like "[[other_parameter]]" For more details, see this [help center article](https://support.google.com/analytics/answer/10085872#modify-an-event&zippy=%2Cin-this-article%2Cmodify-parameters). */
  parameterValue?: string;
}

export const GoogleAnalyticsAdminV1alphaParameterMutation: Schema.Schema<GoogleAnalyticsAdminV1alphaParameterMutation> =
  Schema.suspend(() =>
    Schema.Struct({
      parameter: Schema.optional(Schema.String),
      parameterValue: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaParameterMutation",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaParameterMutation>;

export interface GoogleAnalyticsAdminV1alphaEventEditRule {
  /** Required. Conditions on the source event must match for this rule to be applied. Must have at least one condition, and can have up to 10 max. */
  eventConditions?: Array<GoogleAnalyticsAdminV1alphaMatchingCondition>;
  /** Output only. The order for which this rule will be processed. Rules with an order value lower than this will be processed before this rule, rules with an order value higher than this will be processed after this rule. New event edit rules will be assigned an order value at the end of the order. This value does not apply to event create rules. */
  processingOrder?: string;
  /** Required. The display name of this event edit rule. Maximum of 255 characters. */
  displayName?: string;
  /** Required. Parameter mutations define parameter behavior on the new event, and are applied in order. A maximum of 20 mutations can be applied. */
  parameterMutations?: Array<GoogleAnalyticsAdminV1alphaParameterMutation>;
  /** Identifier. Resource name for this EventEditRule resource. Format: properties/{property}/dataStreams/{data_stream}/eventEditRules/{event_edit_rule} */
  name?: string;
}

export const GoogleAnalyticsAdminV1alphaEventEditRule: Schema.Schema<GoogleAnalyticsAdminV1alphaEventEditRule> =
  Schema.suspend(() =>
    Schema.Struct({
      eventConditions: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaMatchingCondition),
      ),
      processingOrder: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      parameterMutations: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaParameterMutation),
      ),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaEventEditRule",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaEventEditRule>;

export interface GoogleAnalyticsAdminV1alphaListEventEditRulesResponse {
  /** List of EventEditRules. These will be ordered stably, but in an arbitrary order. */
  eventEditRules?: Array<GoogleAnalyticsAdminV1alphaEventEditRule>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListEventEditRulesResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListEventEditRulesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      eventEditRules: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaEventEditRule),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListEventEditRulesResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListEventEditRulesResponse>;

export interface GoogleAnalyticsAdminV1alphaDataRetentionSettings {
  /** Required. The length of time that event-level data is retained. */
  eventDataRetention?:
    | "RETENTION_DURATION_UNSPECIFIED"
    | "TWO_MONTHS"
    | "FOURTEEN_MONTHS"
    | "TWENTY_SIX_MONTHS"
    | "THIRTY_EIGHT_MONTHS"
    | "FIFTY_MONTHS"
    | (string & {});
  /** Output only. Resource name for this DataRetentionSetting resource. Format: properties/{property}/dataRetentionSettings */
  name?: string;
  /** If true, reset the retention period for the user identifier with every event from that user. */
  resetUserDataOnNewActivity?: boolean;
  /** Required. The length of time that user-level data is retained. */
  userDataRetention?:
    | "RETENTION_DURATION_UNSPECIFIED"
    | "TWO_MONTHS"
    | "FOURTEEN_MONTHS"
    | "TWENTY_SIX_MONTHS"
    | "THIRTY_EIGHT_MONTHS"
    | "FIFTY_MONTHS"
    | (string & {});
}

export const GoogleAnalyticsAdminV1alphaDataRetentionSettings: Schema.Schema<GoogleAnalyticsAdminV1alphaDataRetentionSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      eventDataRetention: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      resetUserDataOnNewActivity: Schema.optional(Schema.Boolean),
      userDataRetention: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaDataRetentionSettings",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaDataRetentionSettings>;

export interface GoogleAnalyticsAdminV1alphaPropertySummary {
  /** Display name for the property referred to in this property summary. */
  displayName?: string;
  /** Resource name of this property's logical parent. Note: The Property-Moving UI can be used to change the parent. Format: accounts/{account}, properties/{property} Example: "accounts/100", "properties/200" */
  parent?: string;
  /** Resource name of property referred to by this property summary Format: properties/{property_id} Example: "properties/1000" */
  property?: string;
  /** The property's property type. */
  propertyType?:
    | "PROPERTY_TYPE_UNSPECIFIED"
    | "PROPERTY_TYPE_ORDINARY"
    | "PROPERTY_TYPE_SUBPROPERTY"
    | "PROPERTY_TYPE_ROLLUP"
    | (string & {});
}

export const GoogleAnalyticsAdminV1alphaPropertySummary: Schema.Schema<GoogleAnalyticsAdminV1alphaPropertySummary> =
  Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      parent: Schema.optional(Schema.String),
      property: Schema.optional(Schema.String),
      propertyType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaPropertySummary",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaPropertySummary>;

export interface GoogleAnalyticsAdminV1alphaAccountSummary {
  /** Display name for the account referred to in this account summary. */
  displayName?: string;
  /** List of summaries for child accounts of this account. */
  propertySummaries?: Array<GoogleAnalyticsAdminV1alphaPropertySummary>;
  /** Resource name for this account summary. Format: accountSummaries/{account_id} Example: "accountSummaries/1000" */
  name?: string;
  /** Resource name of account referred to by this account summary Format: accounts/{account_id} Example: "accounts/1000" */
  account?: string;
}

export const GoogleAnalyticsAdminV1alphaAccountSummary: Schema.Schema<GoogleAnalyticsAdminV1alphaAccountSummary> =
  Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      propertySummaries: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaPropertySummary),
      ),
      name: Schema.optional(Schema.String),
      account: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccountSummary",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccountSummary>;

export interface GoogleAnalyticsAdminV1alphaKeyEventDefaultValue {
  /** Required. When an occurrence of this Key Event (specified by event_name) has no set currency this currency will be applied as the default. Must be in ISO 4217 currency code format. See https://en.wikipedia.org/wiki/ISO_4217 for more information. */
  currencyCode?: string;
  /** Required. This will be used to populate the "value" parameter for all occurrences of this Key Event (specified by event_name) where that parameter is unset. */
  numericValue?: number;
}

export const GoogleAnalyticsAdminV1alphaKeyEventDefaultValue: Schema.Schema<GoogleAnalyticsAdminV1alphaKeyEventDefaultValue> =
  Schema.suspend(() =>
    Schema.Struct({
      currencyCode: Schema.optional(Schema.String),
      numericValue: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaKeyEventDefaultValue",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaKeyEventDefaultValue>;

export interface GoogleAnalyticsAdminV1alphaKeyEvent {
  /** Output only. Time when this key event was created in the property. */
  createTime?: string;
  /** Output only. If set to true, this key event refers to a custom event. If set to false, this key event refers to a default event in GA. Default events typically have special meaning in GA. Default events are usually created for you by the GA system, but in some cases can be created by property admins. Custom events count towards the maximum number of custom key events that may be created per property. */
  custom?: boolean;
  /** Output only. If set to true, this event can be deleted. */
  deletable?: boolean;
  /** Required. The method by which Key Events will be counted across multiple events within a session. */
  countingMethod?:
    | "COUNTING_METHOD_UNSPECIFIED"
    | "ONCE_PER_EVENT"
    | "ONCE_PER_SESSION"
    | (string & {});
  /** Immutable. The event name for this key event. Examples: 'click', 'purchase' */
  eventName?: string;
  /** Optional. Defines a default value/currency for a key event. */
  defaultValue?: GoogleAnalyticsAdminV1alphaKeyEventDefaultValue;
  /** Output only. Resource name of this key event. Format: properties/{property}/keyEvents/{key_event} */
  name?: string;
}

export const GoogleAnalyticsAdminV1alphaKeyEvent: Schema.Schema<GoogleAnalyticsAdminV1alphaKeyEvent> =
  Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      custom: Schema.optional(Schema.Boolean),
      deletable: Schema.optional(Schema.Boolean),
      countingMethod: Schema.optional(Schema.String),
      eventName: Schema.optional(Schema.String),
      defaultValue: Schema.optional(
        GoogleAnalyticsAdminV1alphaKeyEventDefaultValue,
      ),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaKeyEvent",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaKeyEvent>;

export interface GoogleAnalyticsAdminV1alphaDataRedactionSettings {
  /** The query parameter keys to apply redaction logic to if present in the URL. Query parameter matching is case-insensitive. Must contain at least one element if query_parameter_replacement_enabled is true. Keys cannot contain commas. */
  queryParameterKeys?: Array<string>;
  /** If enabled, any event parameter or user property values that look like an email will be redacted. */
  emailRedactionEnabled?: boolean;
  /** Output only. Name of this Data Redaction Settings resource. Format: properties/{property_id}/dataStreams/{data_stream}/dataRedactionSettings Example: "properties/1000/dataStreams/2000/dataRedactionSettings" */
  name?: string;
  /** Query Parameter redaction removes the key and value portions of a query parameter if it is in the configured set of query parameters. If enabled, URL query replacement logic will be run for the Stream. Any query parameters defined in query_parameter_keys will be redacted. */
  queryParameterRedactionEnabled?: boolean;
}

export const GoogleAnalyticsAdminV1alphaDataRedactionSettings: Schema.Schema<GoogleAnalyticsAdminV1alphaDataRedactionSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      queryParameterKeys: Schema.optional(Schema.Array(Schema.String)),
      emailRedactionEnabled: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
      queryParameterRedactionEnabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaDataRedactionSettings",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaDataRedactionSettings>;

export interface GoogleAnalyticsAdminV1alphaAttributionSettings {
  /** Output only. Resource name of this attribution settings resource. Format: properties/{property_id}/attributionSettings Example: "properties/1000/attributionSettings" */
  name?: string;
  /** Required. The lookback window for all other, non-acquisition conversion events. The default window size is 90 days. */
  otherConversionEventLookbackWindow?:
    | "OTHER_CONVERSION_EVENT_LOOKBACK_WINDOW_UNSPECIFIED"
    | "OTHER_CONVERSION_EVENT_LOOKBACK_WINDOW_30_DAYS"
    | "OTHER_CONVERSION_EVENT_LOOKBACK_WINDOW_60_DAYS"
    | "OTHER_CONVERSION_EVENT_LOOKBACK_WINDOW_90_DAYS"
    | (string & {});
  /** Required. The reporting attribution model used to calculate conversion credit in this property's reports. Changing the attribution model will apply to both historical and future data. These changes will be reflected in reports with conversion and revenue data. User and session data will be unaffected. */
  reportingAttributionModel?:
    | "REPORTING_ATTRIBUTION_MODEL_UNSPECIFIED"
    | "PAID_AND_ORGANIC_CHANNELS_DATA_DRIVEN"
    | "PAID_AND_ORGANIC_CHANNELS_LAST_CLICK"
    | "GOOGLE_PAID_CHANNELS_LAST_CLICK"
    | (string & {});
  /** Required. The Conversion Export Scope for data exported to linked Ads Accounts. */
  adsWebConversionDataExportScope?:
    | "ADS_WEB_CONVERSION_DATA_EXPORT_SCOPE_UNSPECIFIED"
    | "NOT_SELECTED_YET"
    | "PAID_AND_ORGANIC_CHANNELS"
    | "GOOGLE_PAID_CHANNELS"
    | (string & {});
  /** Required. The lookback window configuration for acquisition conversion events. The default window size is 30 days. */
  acquisitionConversionEventLookbackWindow?:
    | "ACQUISITION_CONVERSION_EVENT_LOOKBACK_WINDOW_UNSPECIFIED"
    | "ACQUISITION_CONVERSION_EVENT_LOOKBACK_WINDOW_7_DAYS"
    | "ACQUISITION_CONVERSION_EVENT_LOOKBACK_WINDOW_30_DAYS"
    | (string & {});
}

export const GoogleAnalyticsAdminV1alphaAttributionSettings: Schema.Schema<GoogleAnalyticsAdminV1alphaAttributionSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      otherConversionEventLookbackWindow: Schema.optional(Schema.String),
      reportingAttributionModel: Schema.optional(Schema.String),
      adsWebConversionDataExportScope: Schema.optional(Schema.String),
      acquisitionConversionEventLookbackWindow: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAttributionSettings",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAttributionSettings>;

export interface GoogleAnalyticsAdminV1alphaGoogleSignalsSettings {
  /** Output only. Resource name of this setting. Format: properties/{property_id}/googleSignalsSettings Example: "properties/1000/googleSignalsSettings" */
  name?: string;
  /** Status of this setting. */
  state?:
    | "GOOGLE_SIGNALS_STATE_UNSPECIFIED"
    | "GOOGLE_SIGNALS_ENABLED"
    | "GOOGLE_SIGNALS_DISABLED"
    | (string & {});
  /** Output only. Terms of Service acceptance. */
  consent?:
    | "GOOGLE_SIGNALS_CONSENT_UNSPECIFIED"
    | "GOOGLE_SIGNALS_CONSENT_CONSENTED"
    | "GOOGLE_SIGNALS_CONSENT_NOT_CONSENTED"
    | (string & {});
}

export const GoogleAnalyticsAdminV1alphaGoogleSignalsSettings: Schema.Schema<GoogleAnalyticsAdminV1alphaGoogleSignalsSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      consent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaGoogleSignalsSettings",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaGoogleSignalsSettings>;

export interface GoogleAnalyticsAdminV1alphaChannelGroupFilterStringFilter {
  /** Required. The match type for the string filter. */
  matchType?:
    | "MATCH_TYPE_UNSPECIFIED"
    | "EXACT"
    | "BEGINS_WITH"
    | "ENDS_WITH"
    | "CONTAINS"
    | "FULL_REGEXP"
    | "PARTIAL_REGEXP"
    | (string & {});
  /** Required. The string value to be matched against. */
  value?: string;
}

export const GoogleAnalyticsAdminV1alphaChannelGroupFilterStringFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaChannelGroupFilterStringFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      matchType: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaChannelGroupFilterStringFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaChannelGroupFilterStringFilter>;

export interface GoogleAnalyticsAdminV1alphaChannelGroupFilterInListFilter {
  /** Required. The list of possible string values to match against. Must be non-empty. */
  values?: Array<string>;
}

export const GoogleAnalyticsAdminV1alphaChannelGroupFilterInListFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaChannelGroupFilterInListFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      values: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaChannelGroupFilterInListFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaChannelGroupFilterInListFilter>;

export interface GoogleAnalyticsAdminV1alphaChannelGroupFilter {
  /** A filter for a string-type dimension that matches a particular pattern. */
  stringFilter?: GoogleAnalyticsAdminV1alphaChannelGroupFilterStringFilter;
  /** Required. Immutable. The dimension name to filter. */
  fieldName?: string;
  /** A filter for a string dimension that matches a particular list of options. */
  inListFilter?: GoogleAnalyticsAdminV1alphaChannelGroupFilterInListFilter;
}

export const GoogleAnalyticsAdminV1alphaChannelGroupFilter: Schema.Schema<GoogleAnalyticsAdminV1alphaChannelGroupFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      stringFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaChannelGroupFilterStringFilter,
      ),
      fieldName: Schema.optional(Schema.String),
      inListFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaChannelGroupFilterInListFilter,
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaChannelGroupFilter",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaChannelGroupFilter>;

export interface GoogleAnalyticsAdminV1alphaChannelGroupFilterExpressionList {
  /** A list of Channel Group filter expressions. */
  filterExpressions?: Array<GoogleAnalyticsAdminV1alphaChannelGroupFilterExpression>;
}

export const GoogleAnalyticsAdminV1alphaChannelGroupFilterExpressionList: Schema.Schema<GoogleAnalyticsAdminV1alphaChannelGroupFilterExpressionList> =
  Schema.suspend(() =>
    Schema.Struct({
      filterExpressions: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaChannelGroupFilterExpression),
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaChannelGroupFilterExpressionList",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaChannelGroupFilterExpressionList>;

export interface GoogleAnalyticsAdminV1alphaChannelGroupFilterExpression {
  /** A filter on a single dimension. This cannot be set on the top level ChannelGroupFilterExpression. */
  filter?: GoogleAnalyticsAdminV1alphaChannelGroupFilter;
  /** A list of expressions to be AND’ed together. It can only contain ChannelGroupFilterExpressions with or_group. This must be set for the top level ChannelGroupFilterExpression. */
  andGroup?: GoogleAnalyticsAdminV1alphaChannelGroupFilterExpressionList;
  /** A list of expressions to OR’ed together. It cannot contain ChannelGroupFilterExpressions with and_group or or_group. */
  orGroup?: GoogleAnalyticsAdminV1alphaChannelGroupFilterExpressionList;
  /** A filter expression to be NOT'ed (that is inverted, complemented). It can only include a dimension_or_metric_filter. This cannot be set on the top level ChannelGroupFilterExpression. */
  notExpression?: GoogleAnalyticsAdminV1alphaChannelGroupFilterExpression;
}

export const GoogleAnalyticsAdminV1alphaChannelGroupFilterExpression: Schema.Schema<GoogleAnalyticsAdminV1alphaChannelGroupFilterExpression> =
  Schema.suspend(() =>
    Schema.Struct({
      filter: Schema.optional(GoogleAnalyticsAdminV1alphaChannelGroupFilter),
      andGroup: Schema.optional(
        GoogleAnalyticsAdminV1alphaChannelGroupFilterExpressionList,
      ),
      orGroup: Schema.optional(
        GoogleAnalyticsAdminV1alphaChannelGroupFilterExpressionList,
      ),
      notExpression: Schema.optional(
        GoogleAnalyticsAdminV1alphaChannelGroupFilterExpression,
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaChannelGroupFilterExpression",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaChannelGroupFilterExpression>;

export interface GoogleAnalyticsAdminV1alphaGroupingRule {
  /** Required. Customer defined display name for the channel. */
  displayName?: string;
  /** Required. The Filter Expression that defines the Grouping Rule. */
  expression?: GoogleAnalyticsAdminV1alphaChannelGroupFilterExpression;
}

export const GoogleAnalyticsAdminV1alphaGroupingRule: Schema.Schema<GoogleAnalyticsAdminV1alphaGroupingRule> =
  Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      expression: Schema.optional(
        GoogleAnalyticsAdminV1alphaChannelGroupFilterExpression,
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaGroupingRule",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaGroupingRule>;

export interface GoogleAnalyticsAdminV1alphaChannelGroup {
  /** Output only. The resource name for this Channel Group resource. Format: properties/{property}/channelGroups/{channel_group} */
  name?: string;
  /** Required. The display name of the Channel Group. Max length of 80 characters. */
  displayName?: string;
  /** Required. The grouping rules of channels. Maximum number of rules is 50. */
  groupingRule?: Array<GoogleAnalyticsAdminV1alphaGroupingRule>;
  /** Output only. If true, then this channel group is the Default Channel Group predefined by Google Analytics. Display name and grouping rules cannot be updated for this channel group. */
  systemDefined?: boolean;
  /** The description of the Channel Group. Max length of 256 characters. */
  description?: string;
  /** Optional. If true, this channel group will be used as the default channel group for reports. Only one channel group can be set as `primary` at any time. If the `primary` field gets set on a channel group, it will get unset on the previous primary channel group. The Google Analytics predefined channel group is the primary by default. */
  primary?: boolean;
}

export const GoogleAnalyticsAdminV1alphaChannelGroup: Schema.Schema<GoogleAnalyticsAdminV1alphaChannelGroup> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      groupingRule: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaGroupingRule),
      ),
      systemDefined: Schema.optional(Schema.Boolean),
      description: Schema.optional(Schema.String),
      primary: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaChannelGroup",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaChannelGroup>;

export interface GoogleAnalyticsAdminV1alphaGoogleAdsLink {
  /** Immutable. Google Ads customer ID. */
  customerId?: string;
  /** Output only. Time when this link was last updated. */
  updateTime?: string;
  /** Output only. Time when this link was originally created. */
  createTime?: string;
  /** Output only. Email address of the user that created the link. An empty string will be returned if the email address can't be retrieved. */
  creatorEmailAddress?: string;
  /** Output only. Format: properties/{propertyId}/googleAdsLinks/{googleAdsLinkId} Note: googleAdsLinkId is not the Google Ads customer ID. */
  name?: string;
  /** Output only. If true, this link is for a Google Ads manager account. */
  canManageClients?: boolean;
  /** Enable personalized advertising features with this integration. Automatically publish my Google Analytics audience lists and Google Analytics remarketing events/parameters to the linked Google Ads account. If this field is not set on create/update, it will be defaulted to true. */
  adsPersonalizationEnabled?: boolean;
}

export const GoogleAnalyticsAdminV1alphaGoogleAdsLink: Schema.Schema<GoogleAnalyticsAdminV1alphaGoogleAdsLink> =
  Schema.suspend(() =>
    Schema.Struct({
      customerId: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      creatorEmailAddress: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      canManageClients: Schema.optional(Schema.Boolean),
      adsPersonalizationEnabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaGoogleAdsLink",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaGoogleAdsLink>;

export interface GoogleAnalyticsAdminV1alphaAdSenseLink {
  /** Output only. The resource name for this AdSense Link resource. Format: properties/{propertyId}/adSenseLinks/{linkId} Example: properties/1234/adSenseLinks/6789 */
  name?: string;
  /** Immutable. The AdSense ad client code that the Google Analytics property is linked to. Example format: "ca-pub-1234567890" */
  adClientCode?: string;
}

export const GoogleAnalyticsAdminV1alphaAdSenseLink: Schema.Schema<GoogleAnalyticsAdminV1alphaAdSenseLink> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      adClientCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAdSenseLink",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAdSenseLink>;

export interface GoogleAnalyticsAdminV1alphaConversionEvent {
  /** Optional. The method by which conversions will be counted across multiple events within a session. If this value is not provided, it will be set to `ONCE_PER_EVENT`. */
  countingMethod?:
    | "CONVERSION_COUNTING_METHOD_UNSPECIFIED"
    | "ONCE_PER_EVENT"
    | "ONCE_PER_SESSION"
    | (string & {});
  /** Immutable. The event name for this conversion event. Examples: 'click', 'purchase' */
  eventName?: string;
  /** Optional. Defines a default value/currency for a conversion event. */
  defaultConversionValue?: GoogleAnalyticsAdminV1alphaConversionEventDefaultConversionValue;
  /** Output only. Resource name of this conversion event. Format: properties/{property}/conversionEvents/{conversion_event} */
  name?: string;
  /** Output only. Time when this conversion event was created in the property. */
  createTime?: string;
  /** Output only. If set to true, this conversion event refers to a custom event. If set to false, this conversion event refers to a default event in GA. Default events typically have special meaning in GA. Default events are usually created for you by the GA system, but in some cases can be created by property admins. Custom events count towards the maximum number of custom conversion events that may be created per property. */
  custom?: boolean;
  /** Output only. If set, this event can currently be deleted with DeleteConversionEvent. */
  deletable?: boolean;
}

export const GoogleAnalyticsAdminV1alphaConversionEvent: Schema.Schema<GoogleAnalyticsAdminV1alphaConversionEvent> =
  Schema.suspend(() =>
    Schema.Struct({
      countingMethod: Schema.optional(Schema.String),
      eventName: Schema.optional(Schema.String),
      defaultConversionValue: Schema.optional(
        GoogleAnalyticsAdminV1alphaConversionEventDefaultConversionValue,
      ),
      name: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      custom: Schema.optional(Schema.Boolean),
      deletable: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaConversionEvent",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaConversionEvent>;

export interface GoogleAnalyticsAdminV1alphaEventCreateRule {
  /** Required. The name of the new event to be created. This value must: * be less than 40 characters * consist only of letters, digits or _ (underscores) * start with a letter */
  destinationEvent?: string;
  /** Parameter mutations define parameter behavior on the new event, and are applied in order. A maximum of 20 mutations can be applied. */
  parameterMutations?: Array<GoogleAnalyticsAdminV1alphaParameterMutation>;
  /** Output only. Resource name for this EventCreateRule resource. Format: properties/{property}/dataStreams/{data_stream}/eventCreateRules/{event_create_rule} */
  name?: string;
  /** Required. Must have at least one condition, and can have up to 10 max. Conditions on the source event must match for this rule to be applied. */
  eventConditions?: Array<GoogleAnalyticsAdminV1alphaMatchingCondition>;
  /** If true, the source parameters are copied to the new event. If false, or unset, all non-internal parameters are not copied from the source event. Parameter mutations are applied after the parameters have been copied. */
  sourceCopyParameters?: boolean;
}

export const GoogleAnalyticsAdminV1alphaEventCreateRule: Schema.Schema<GoogleAnalyticsAdminV1alphaEventCreateRule> =
  Schema.suspend(() =>
    Schema.Struct({
      destinationEvent: Schema.optional(Schema.String),
      parameterMutations: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaParameterMutation),
      ),
      name: Schema.optional(Schema.String),
      eventConditions: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaMatchingCondition),
      ),
      sourceCopyParameters: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaEventCreateRule",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaEventCreateRule>;

export interface GoogleAnalyticsAdminV1alphaBigQueryLink {
  /** Required. Immutable. The geographic location where the created BigQuery dataset should reside. See https://cloud.google.com/bigquery/docs/locations for supported locations. */
  datasetLocation?: string;
  /** If set true, enables daily data export to the linked Google Cloud project. */
  dailyExportEnabled?: boolean;
  /** The list of event names that will be excluded from exports. */
  excludedEvents?: Array<string>;
  /** If set true, enables fresh daily export to the linked Google Cloud project. */
  freshDailyExportEnabled?: boolean;
  /** Output only. Resource name of this BigQuery link. Format: 'properties/{property_id}/bigQueryLinks/{bigquery_link_id}' Format: 'properties/1234/bigQueryLinks/abc567' */
  name?: string;
  /** Immutable. The linked Google Cloud project. When creating a BigQueryLink, you may provide this resource name using either a project number or project ID. Once this resource has been created, the returned project will always have a project that contains a project number. Format: 'projects/{project number}' Example: 'projects/1234' */
  project?: string;
  /** Output only. Time when the link was created. */
  createTime?: string;
  /** The list of streams under the parent property for which data will be exported. Format: properties/{property_id}/dataStreams/{stream_id} Example: ['properties/1000/dataStreams/2000'] */
  exportStreams?: Array<string>;
  /** If set true, enables streaming export to the linked Google Cloud project. */
  streamingExportEnabled?: boolean;
  /** If set true, exported data will include advertising identifiers for mobile app streams. */
  includeAdvertisingId?: boolean;
}

export const GoogleAnalyticsAdminV1alphaBigQueryLink: Schema.Schema<GoogleAnalyticsAdminV1alphaBigQueryLink> =
  Schema.suspend(() =>
    Schema.Struct({
      datasetLocation: Schema.optional(Schema.String),
      dailyExportEnabled: Schema.optional(Schema.Boolean),
      excludedEvents: Schema.optional(Schema.Array(Schema.String)),
      freshDailyExportEnabled: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
      project: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      exportStreams: Schema.optional(Schema.Array(Schema.String)),
      streamingExportEnabled: Schema.optional(Schema.Boolean),
      includeAdvertisingId: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaBigQueryLink",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaBigQueryLink>;

export interface GoogleAnalyticsAdminV1alphaEventMapping {
  /** At least one of the following four min/max values must be set. The values set will be ANDed together to qualify an event. The minimum number of times the event occurred. If not set, minimum event count won't be checked. */
  minEventCount?: string;
  /** The minimum revenue generated due to the event. Revenue currency will be defined at the property level. If not set, minimum event value won't be checked. */
  minEventValue?: number;
  /** The maximum number of times the event occurred. If not set, maximum event count won't be checked. */
  maxEventCount?: string;
  /** The maximum revenue generated due to the event. Revenue currency will be defined at the property level. If not set, maximum event value won't be checked. */
  maxEventValue?: number;
  /** Required. Name of the Google Analytics event. It must always be set. The max allowed display name length is 40 UTF-16 code units. */
  eventName?: string;
}

export const GoogleAnalyticsAdminV1alphaEventMapping: Schema.Schema<GoogleAnalyticsAdminV1alphaEventMapping> =
  Schema.suspend(() =>
    Schema.Struct({
      minEventCount: Schema.optional(Schema.String),
      minEventValue: Schema.optional(Schema.Number),
      maxEventCount: Schema.optional(Schema.String),
      maxEventValue: Schema.optional(Schema.Number),
      eventName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaEventMapping",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaEventMapping>;

export interface GoogleAnalyticsAdminV1alphaConversionValues {
  /** Event conditions that must be met for this Conversion Value to be achieved. The conditions in this list are ANDed together. It must have minimum of 1 entry and maximum of 3 entries, if the postback window is enabled. */
  eventMappings?: Array<GoogleAnalyticsAdminV1alphaEventMapping>;
  /** If true, the SDK should lock to this conversion value for the current postback window. */
  lockEnabled?: boolean;
  /** Display name of the SKAdNetwork conversion value. The max allowed display name length is 50 UTF-16 code units. */
  displayName?: string;
  /** The fine-grained conversion value. This is applicable only to the first postback window. Its valid values are [0,63], both inclusive. It must be set for postback window 1, and must not be set for postback window 2 & 3. This value is not guaranteed to be unique. If the configuration for the first postback window is re-used for second or third postback windows this field has no effect. */
  fineValue?: number;
  /** Required. A coarse grained conversion value. This value is not guaranteed to be unique. */
  coarseValue?:
    | "COARSE_VALUE_UNSPECIFIED"
    | "COARSE_VALUE_LOW"
    | "COARSE_VALUE_MEDIUM"
    | "COARSE_VALUE_HIGH"
    | (string & {});
}

export const GoogleAnalyticsAdminV1alphaConversionValues: Schema.Schema<GoogleAnalyticsAdminV1alphaConversionValues> =
  Schema.suspend(() =>
    Schema.Struct({
      eventMappings: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaEventMapping),
      ),
      lockEnabled: Schema.optional(Schema.Boolean),
      displayName: Schema.optional(Schema.String),
      fineValue: Schema.optional(Schema.Number),
      coarseValue: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaConversionValues",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaConversionValues>;

export interface GoogleAnalyticsAdminV1alphaPostbackWindow {
  /** Ordering of the repeated field will be used to prioritize the conversion value settings. Lower indexed entries are prioritized higher. The first conversion value setting that evaluates to true will be selected. It must have at least one entry if enable_postback_window_settings is set to true. It can have maximum of 128 entries. */
  conversionValues?: Array<GoogleAnalyticsAdminV1alphaConversionValues>;
  /** If enable_postback_window_settings is true, conversion_values must be populated and will be used for determining when and how to set the Conversion Value on a client device and exporting schema to linked Ads accounts. If false, the settings are not used, but are retained in case they may be used in the future. This must always be true for postback_window_one. */
  postbackWindowSettingsEnabled?: boolean;
}

export const GoogleAnalyticsAdminV1alphaPostbackWindow: Schema.Schema<GoogleAnalyticsAdminV1alphaPostbackWindow> =
  Schema.suspend(() =>
    Schema.Struct({
      conversionValues: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaConversionValues),
      ),
      postbackWindowSettingsEnabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaPostbackWindow",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaPostbackWindow>;

export interface GoogleAnalyticsAdminV1alphaSKAdNetworkConversionValueSchema {
  /** Output only. Resource name of the schema. This will be child of ONLY an iOS stream, and there can be at most one such child under an iOS stream. Format: properties/{property}/dataStreams/{dataStream}/sKAdNetworkConversionValueSchema */
  name?: string;
  /** The conversion value settings for the third postback window. This field should only be set if the user chose to define different conversion values for this postback window. It is allowed to configure window 3 without setting window 2. In case window 1 & 2 settings are set and enable_postback_window_settings for this postback window is set to false, the schema will inherit settings from postback_window_two. */
  postbackWindowThree?: GoogleAnalyticsAdminV1alphaPostbackWindow;
  /** The conversion value settings for the second postback window. This field should only be configured if there is a need to define different conversion values for this postback window. If enable_postback_window_settings is set to false for this postback window, the values from postback_window_one will be used. */
  postbackWindowTwo?: GoogleAnalyticsAdminV1alphaPostbackWindow;
  /** Required. The conversion value settings for the first postback window. These differ from values for postback window two and three in that they contain a "Fine" grained conversion value (a numeric value). Conversion values for this postback window must be set. The other windows are optional and may inherit this window's settings if unset or disabled. */
  postbackWindowOne?: GoogleAnalyticsAdminV1alphaPostbackWindow;
  /** If enabled, the GA SDK will set conversion values using this schema definition, and schema will be exported to any Google Ads accounts linked to this property. If disabled, the GA SDK will not automatically set conversion values, and also the schema will not be exported to Ads. */
  applyConversionValues?: boolean;
}

export const GoogleAnalyticsAdminV1alphaSKAdNetworkConversionValueSchema: Schema.Schema<GoogleAnalyticsAdminV1alphaSKAdNetworkConversionValueSchema> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      postbackWindowThree: Schema.optional(
        GoogleAnalyticsAdminV1alphaPostbackWindow,
      ),
      postbackWindowTwo: Schema.optional(
        GoogleAnalyticsAdminV1alphaPostbackWindow,
      ),
      postbackWindowOne: Schema.optional(
        GoogleAnalyticsAdminV1alphaPostbackWindow,
      ),
      applyConversionValues: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaSKAdNetworkConversionValueSchema",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaSKAdNetworkConversionValueSchema>;

export interface GoogleAnalyticsAdminV1alphaCalculatedMetric {
  /** Output only. The ID to use for the calculated metric. In the UI, this is referred to as the "API name." The calculated_metric_id is used when referencing this calculated metric from external APIs. For example, "calcMetric:{calculated_metric_id}". */
  calculatedMetricId?: string;
  /** Output only. If true, this calculated metric has a invalid metric reference. Anything using a calculated metric with invalid_metric_reference set to true may fail, produce warnings, or produce unexpected results. */
  invalidMetricReference?: boolean;
  /** Optional. Description for this calculated metric. Max length of 4096 characters. */
  description?: string;
  /** Required. The type for the calculated metric's value. */
  metricUnit?:
    | "METRIC_UNIT_UNSPECIFIED"
    | "STANDARD"
    | "CURRENCY"
    | "FEET"
    | "MILES"
    | "METERS"
    | "KILOMETERS"
    | "MILLISECONDS"
    | "SECONDS"
    | "MINUTES"
    | "HOURS"
    | (string & {});
  /** Output only. Types of restricted data that this metric contains. */
  restrictedMetricType?: Array<
    | "RESTRICTED_METRIC_TYPE_UNSPECIFIED"
    | "COST_DATA"
    | "REVENUE_DATA"
    | (string & {})
  >;
  /** Required. The calculated metric's definition. Maximum number of unique referenced custom metrics is 5. Formulas supports the following operations: + (addition), - (subtraction), - (negative), * (multiplication), / (division), () (parenthesis). Any valid real numbers are acceptable that fit in a Long (64bit integer) or a Double (64 bit floating point number). Example formula: "( customEvent:parameter_name + cartPurchaseQuantity ) / 2.0" */
  formula?: string;
  /** Output only. Resource name for this CalculatedMetric. Format: 'properties/{property_id}/calculatedMetrics/{calculated_metric_id}' */
  name?: string;
  /** Required. Display name for this calculated metric as shown in the Google Analytics UI. Max length 82 characters. */
  displayName?: string;
}

export const GoogleAnalyticsAdminV1alphaCalculatedMetric: Schema.Schema<GoogleAnalyticsAdminV1alphaCalculatedMetric> =
  Schema.suspend(() =>
    Schema.Struct({
      calculatedMetricId: Schema.optional(Schema.String),
      invalidMetricReference: Schema.optional(Schema.Boolean),
      description: Schema.optional(Schema.String),
      metricUnit: Schema.optional(Schema.String),
      restrictedMetricType: Schema.optional(Schema.Array(Schema.String)),
      formula: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaCalculatedMetric",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaCalculatedMetric>;

export interface GoogleAnalyticsAdminV1alphaMeasurementProtocolSecret {
  /** Output only. Resource name of this secret. This secret may be a child of any type of stream. Format: properties/{property}/dataStreams/{dataStream}/measurementProtocolSecrets/{measurementProtocolSecret} */
  name?: string;
  /** Output only. The measurement protocol secret value. Pass this value to the api_secret field of the Measurement Protocol API when sending hits to this secret's parent property. */
  secretValue?: string;
  /** Required. Human-readable display name for this secret. */
  displayName?: string;
}

export const GoogleAnalyticsAdminV1alphaMeasurementProtocolSecret: Schema.Schema<GoogleAnalyticsAdminV1alphaMeasurementProtocolSecret> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      secretValue: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaMeasurementProtocolSecret",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaMeasurementProtocolSecret>;

export interface GoogleAnalyticsAdminV1alphaSearchAds360Link {
  /** Immutable. Enables the import of cost data from Search Ads 360 to the Google Analytics property. This can only be enabled if campaign_data_sharing_enabled is enabled. After link creation, this can only be updated from the Search Ads 360 product. If this field is not set on create, it will be defaulted to true. */
  costDataSharingEnabled?: boolean;
  /** Immutable. This field represents the Advertiser ID of the Search Ads 360 Advertiser. that has been linked. */
  advertiserId?: string;
  /** Immutable. Enables the import of campaign data from Search Ads 360 into the Google Analytics property. After link creation, this can only be updated from the Search Ads 360 product. If this field is not set on create, it will be defaulted to true. */
  campaignDataSharingEnabled?: boolean;
  /** Enables personalized advertising features with this integration. If this field is not set on create, it will be defaulted to true. */
  adsPersonalizationEnabled?: boolean;
  /** Enables export of site stats with this integration. If this field is not set on create, it will be defaulted to true. */
  siteStatsSharingEnabled?: boolean;
  /** Output only. The resource name for this SearchAds360Link resource. Format: properties/{propertyId}/searchAds360Links/{linkId} Note: linkId is not the Search Ads 360 advertiser ID */
  name?: string;
  /** Output only. The display name of the Search Ads 360 Advertiser. Allows users to easily identify the linked resource. */
  advertiserDisplayName?: string;
}

export const GoogleAnalyticsAdminV1alphaSearchAds360Link: Schema.Schema<GoogleAnalyticsAdminV1alphaSearchAds360Link> =
  Schema.suspend(() =>
    Schema.Struct({
      costDataSharingEnabled: Schema.optional(Schema.Boolean),
      advertiserId: Schema.optional(Schema.String),
      campaignDataSharingEnabled: Schema.optional(Schema.Boolean),
      adsPersonalizationEnabled: Schema.optional(Schema.Boolean),
      siteStatsSharingEnabled: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
      advertiserDisplayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaSearchAds360Link",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaSearchAds360Link>;

export interface GoogleAnalyticsAdminV1alphaChangeHistoryChangeChangeHistoryResource {
  /** A snapshot of a CustomMetric resource in change history. */
  customMetric?: GoogleAnalyticsAdminV1alphaCustomMetric;
  /** A snapshot of a SubpropertySyncConfig resource in change history. */
  subpropertySyncConfig?: GoogleAnalyticsAdminV1alphaSubpropertySyncConfig;
  /** A snapshot of a KeyEvent resource in change history. */
  keyEvent?: GoogleAnalyticsAdminV1alphaKeyEvent;
  /** A snapshot of DataRedactionSettings resource in change history. */
  dataRedactionSettings?: GoogleAnalyticsAdminV1alphaDataRedactionSettings;
  /** A snapshot of AttributionSettings resource in change history. */
  attributionSettings?: GoogleAnalyticsAdminV1alphaAttributionSettings;
  /** A snapshot of a DataStream resource in change history. */
  dataStream?: GoogleAnalyticsAdminV1alphaDataStream;
  /** A snapshot of a GoogleSignalsSettings resource in change history. */
  googleSignalsSettings?: GoogleAnalyticsAdminV1alphaGoogleSignalsSettings;
  /** A snapshot of EnhancedMeasurementSettings resource in change history. */
  enhancedMeasurementSettings?: GoogleAnalyticsAdminV1alphaEnhancedMeasurementSettings;
  /** A snapshot of a ChannelGroup resource in change history. */
  channelGroup?: GoogleAnalyticsAdminV1alphaChannelGroup;
  /** A snapshot of a GoogleAdsLink resource in change history. */
  googleAdsLink?: GoogleAnalyticsAdminV1alphaGoogleAdsLink;
  /** A snapshot of a DisplayVideo360AdvertiserLink resource in change history. */
  displayVideo360AdvertiserLink?: GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink;
  /** A snapshot of an Account resource in change history. */
  account?: GoogleAnalyticsAdminV1alphaAccount;
  /** A snapshot of an AdSenseLink resource in change history. */
  adsenseLink?: GoogleAnalyticsAdminV1alphaAdSenseLink;
  /** A snapshot of a FirebaseLink resource in change history. */
  firebaseLink?: GoogleAnalyticsAdminV1alphaFirebaseLink;
  /** A snapshot of a ReportingIdentitySettings resource in change history. */
  reportingIdentitySettings?: GoogleAnalyticsAdminV1alphaReportingIdentitySettings;
  /** A snapshot of a ReportingDataAnnotation resource in change history. */
  reportingDataAnnotation?: GoogleAnalyticsAdminV1alphaReportingDataAnnotation;
  /** A snapshot of a ConversionEvent resource in change history. */
  conversionEvent?: GoogleAnalyticsAdminV1alphaConversionEvent;
  /** A snapshot of an EventCreateRule resource in change history. */
  eventCreateRule?: GoogleAnalyticsAdminV1alphaEventCreateRule;
  /** A snapshot of an ExpandedDataSet resource in change history. */
  expandedDataSet?: GoogleAnalyticsAdminV1alphaExpandedDataSet;
  /** A snapshot of a BigQuery link resource in change history. */
  bigqueryLink?: GoogleAnalyticsAdminV1alphaBigQueryLink;
  /** A snapshot of SKAdNetworkConversionValueSchema resource in change history. */
  skadnetworkConversionValueSchema?: GoogleAnalyticsAdminV1alphaSKAdNetworkConversionValueSchema;
  /** A snapshot of a CalculatedMetric resource in change history. */
  calculatedMetric?: GoogleAnalyticsAdminV1alphaCalculatedMetric;
  /** A snapshot of a MeasurementProtocolSecret resource in change history. */
  measurementProtocolSecret?: GoogleAnalyticsAdminV1alphaMeasurementProtocolSecret;
  /** A snapshot of a DisplayVideo360AdvertiserLinkProposal resource in change history. */
  displayVideo360AdvertiserLinkProposal?: GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLinkProposal;
  /** A snapshot of a data retention settings resource in change history. */
  dataRetentionSettings?: GoogleAnalyticsAdminV1alphaDataRetentionSettings;
  /** A snapshot of a CustomDimension resource in change history. */
  customDimension?: GoogleAnalyticsAdminV1alphaCustomDimension;
  /** A snapshot of a SearchAds360Link resource in change history. */
  searchAds360Link?: GoogleAnalyticsAdminV1alphaSearchAds360Link;
  /** A snapshot of a Property resource in change history. */
  property?: GoogleAnalyticsAdminV1alphaProperty;
  /** A snapshot of an Audience resource in change history. */
  audience?: GoogleAnalyticsAdminV1alphaAudience;
}

export const GoogleAnalyticsAdminV1alphaChangeHistoryChangeChangeHistoryResource: Schema.Schema<GoogleAnalyticsAdminV1alphaChangeHistoryChangeChangeHistoryResource> =
  Schema.suspend(() =>
    Schema.Struct({
      customMetric: Schema.optional(GoogleAnalyticsAdminV1alphaCustomMetric),
      subpropertySyncConfig: Schema.optional(
        GoogleAnalyticsAdminV1alphaSubpropertySyncConfig,
      ),
      keyEvent: Schema.optional(GoogleAnalyticsAdminV1alphaKeyEvent),
      dataRedactionSettings: Schema.optional(
        GoogleAnalyticsAdminV1alphaDataRedactionSettings,
      ),
      attributionSettings: Schema.optional(
        GoogleAnalyticsAdminV1alphaAttributionSettings,
      ),
      dataStream: Schema.optional(GoogleAnalyticsAdminV1alphaDataStream),
      googleSignalsSettings: Schema.optional(
        GoogleAnalyticsAdminV1alphaGoogleSignalsSettings,
      ),
      enhancedMeasurementSettings: Schema.optional(
        GoogleAnalyticsAdminV1alphaEnhancedMeasurementSettings,
      ),
      channelGroup: Schema.optional(GoogleAnalyticsAdminV1alphaChannelGroup),
      googleAdsLink: Schema.optional(GoogleAnalyticsAdminV1alphaGoogleAdsLink),
      displayVideo360AdvertiserLink: Schema.optional(
        GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink,
      ),
      account: Schema.optional(GoogleAnalyticsAdminV1alphaAccount),
      adsenseLink: Schema.optional(GoogleAnalyticsAdminV1alphaAdSenseLink),
      firebaseLink: Schema.optional(GoogleAnalyticsAdminV1alphaFirebaseLink),
      reportingIdentitySettings: Schema.optional(
        GoogleAnalyticsAdminV1alphaReportingIdentitySettings,
      ),
      reportingDataAnnotation: Schema.optional(
        GoogleAnalyticsAdminV1alphaReportingDataAnnotation,
      ),
      conversionEvent: Schema.optional(
        GoogleAnalyticsAdminV1alphaConversionEvent,
      ),
      eventCreateRule: Schema.optional(
        GoogleAnalyticsAdminV1alphaEventCreateRule,
      ),
      expandedDataSet: Schema.optional(
        GoogleAnalyticsAdminV1alphaExpandedDataSet,
      ),
      bigqueryLink: Schema.optional(GoogleAnalyticsAdminV1alphaBigQueryLink),
      skadnetworkConversionValueSchema: Schema.optional(
        GoogleAnalyticsAdminV1alphaSKAdNetworkConversionValueSchema,
      ),
      calculatedMetric: Schema.optional(
        GoogleAnalyticsAdminV1alphaCalculatedMetric,
      ),
      measurementProtocolSecret: Schema.optional(
        GoogleAnalyticsAdminV1alphaMeasurementProtocolSecret,
      ),
      displayVideo360AdvertiserLinkProposal: Schema.optional(
        GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLinkProposal,
      ),
      dataRetentionSettings: Schema.optional(
        GoogleAnalyticsAdminV1alphaDataRetentionSettings,
      ),
      customDimension: Schema.optional(
        GoogleAnalyticsAdminV1alphaCustomDimension,
      ),
      searchAds360Link: Schema.optional(
        GoogleAnalyticsAdminV1alphaSearchAds360Link,
      ),
      property: Schema.optional(GoogleAnalyticsAdminV1alphaProperty),
      audience: Schema.optional(GoogleAnalyticsAdminV1alphaAudience),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaChangeHistoryChangeChangeHistoryResource",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaChangeHistoryChangeChangeHistoryResource>;

export interface GoogleAnalyticsAdminV1alphaChangeHistoryChange {
  /** Resource name of the resource whose changes are described by this entry. */
  resource?: string;
  /** Resource contents from after the change was made. If this resource was deleted in this change, this field will be missing. */
  resourceAfterChange?: GoogleAnalyticsAdminV1alphaChangeHistoryChangeChangeHistoryResource;
  /** Resource contents from before the change was made. If this resource was created in this change, this field will be missing. */
  resourceBeforeChange?: GoogleAnalyticsAdminV1alphaChangeHistoryChangeChangeHistoryResource;
  /** The type of action that changed this resource. */
  action?:
    | "ACTION_TYPE_UNSPECIFIED"
    | "CREATED"
    | "UPDATED"
    | "DELETED"
    | (string & {});
}

export const GoogleAnalyticsAdminV1alphaChangeHistoryChange: Schema.Schema<GoogleAnalyticsAdminV1alphaChangeHistoryChange> =
  Schema.suspend(() =>
    Schema.Struct({
      resource: Schema.optional(Schema.String),
      resourceAfterChange: Schema.optional(
        GoogleAnalyticsAdminV1alphaChangeHistoryChangeChangeHistoryResource,
      ),
      resourceBeforeChange: Schema.optional(
        GoogleAnalyticsAdminV1alphaChangeHistoryChangeChangeHistoryResource,
      ),
      action: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaChangeHistoryChange",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaChangeHistoryChange>;

export interface GoogleAnalyticsAdminV1alphaListDisplayVideo360AdvertiserLinksResponse {
  /** List of DisplayVideo360AdvertiserLinks. */
  displayVideo360AdvertiserLinks?: Array<GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListDisplayVideo360AdvertiserLinksResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListDisplayVideo360AdvertiserLinksResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      displayVideo360AdvertiserLinks: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaListDisplayVideo360AdvertiserLinksResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListDisplayVideo360AdvertiserLinksResponse>;

export interface GoogleAnalyticsAdminV1alphaAccessDateRange {
  /** The inclusive start date for the query in the format `YYYY-MM-DD`. Cannot be after `endDate`. The format `NdaysAgo`, `yesterday`, or `today` is also accepted, and in that case, the date is inferred based on the current time in the request's time zone. */
  startDate?: string;
  /** The inclusive end date for the query in the format `YYYY-MM-DD`. Cannot be before `startDate`. The format `NdaysAgo`, `yesterday`, or `today` is also accepted, and in that case, the date is inferred based on the current time in the request's time zone. */
  endDate?: string;
}

export const GoogleAnalyticsAdminV1alphaAccessDateRange: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessDateRange> =
  Schema.suspend(() =>
    Schema.Struct({
      startDate: Schema.optional(Schema.String),
      endDate: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessDateRange",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessDateRange>;

export interface GoogleAnalyticsAdminV1alphaAcknowledgeUserDataCollectionResponse {}

export const GoogleAnalyticsAdminV1alphaAcknowledgeUserDataCollectionResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaAcknowledgeUserDataCollectionResponse> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaAcknowledgeUserDataCollectionResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAcknowledgeUserDataCollectionResponse>;

export interface GoogleAnalyticsAdminV1alphaAccessDimension {
  /** The API name of the dimension. See [Data Access Schema](https://developers.google.com/analytics/devguides/config/admin/v1/access-api-schema) for the list of dimensions supported in this API. Dimensions are referenced by name in `dimensionFilter` and `orderBys`. */
  dimensionName?: string;
}

export const GoogleAnalyticsAdminV1alphaAccessDimension: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessDimension> =
  Schema.suspend(() =>
    Schema.Struct({
      dimensionName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessDimension",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessDimension>;

export interface GoogleAnalyticsAdminV1alphaListSearchAds360LinksResponse {
  /** List of SearchAds360Links. */
  searchAds360Links?: Array<GoogleAnalyticsAdminV1alphaSearchAds360Link>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListSearchAds360LinksResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListSearchAds360LinksResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      searchAds360Links: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaSearchAds360Link),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListSearchAds360LinksResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListSearchAds360LinksResponse>;

export interface GoogleAnalyticsAdminV1alphaListGoogleAdsLinksResponse {
  /** List of GoogleAdsLinks. */
  googleAdsLinks?: Array<GoogleAnalyticsAdminV1alphaGoogleAdsLink>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListGoogleAdsLinksResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListGoogleAdsLinksResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      googleAdsLinks: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaGoogleAdsLink),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListGoogleAdsLinksResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListGoogleAdsLinksResponse>;

export interface GoogleAnalyticsAdminV1alphaBatchUpdateAccessBindingsResponse {
  /** The access bindings updated. */
  accessBindings?: Array<GoogleAnalyticsAdminV1alphaAccessBinding>;
}

export const GoogleAnalyticsAdminV1alphaBatchUpdateAccessBindingsResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaBatchUpdateAccessBindingsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      accessBindings: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaAccessBinding),
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaBatchUpdateAccessBindingsResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaBatchUpdateAccessBindingsResponse>;

export interface GoogleAnalyticsAdminV1alphaSearchChangeHistoryEventsRequest {
  /** Optional. If set, only return changes if they are for a resource that matches at least one of these types. */
  resourceType?: Array<
    | "CHANGE_HISTORY_RESOURCE_TYPE_UNSPECIFIED"
    | "ACCOUNT"
    | "PROPERTY"
    | "FIREBASE_LINK"
    | "GOOGLE_ADS_LINK"
    | "GOOGLE_SIGNALS_SETTINGS"
    | "CONVERSION_EVENT"
    | "MEASUREMENT_PROTOCOL_SECRET"
    | "CUSTOM_DIMENSION"
    | "CUSTOM_METRIC"
    | "DATA_RETENTION_SETTINGS"
    | "DISPLAY_VIDEO_360_ADVERTISER_LINK"
    | "DISPLAY_VIDEO_360_ADVERTISER_LINK_PROPOSAL"
    | "SEARCH_ADS_360_LINK"
    | "DATA_STREAM"
    | "ATTRIBUTION_SETTINGS"
    | "EXPANDED_DATA_SET"
    | "CHANNEL_GROUP"
    | "BIGQUERY_LINK"
    | "ENHANCED_MEASUREMENT_SETTINGS"
    | "DATA_REDACTION_SETTINGS"
    | "SKADNETWORK_CONVERSION_VALUE_SCHEMA"
    | "ADSENSE_LINK"
    | "AUDIENCE"
    | "EVENT_CREATE_RULE"
    | "KEY_EVENT"
    | "CALCULATED_METRIC"
    | "REPORTING_DATA_ANNOTATION"
    | "SUBPROPERTY_SYNC_CONFIG"
    | "REPORTING_IDENTITY_SETTINGS"
    | (string & {})
  >;
  /** Optional. If set, only return changes that match one or more of these types of actions. */
  action?: Array<
    | "ACTION_TYPE_UNSPECIFIED"
    | "CREATED"
    | "UPDATED"
    | "DELETED"
    | (string & {})
  >;
  /** Optional. If set, only return changes if they are made by a user in this list. */
  actorEmail?: Array<string>;
  /** Optional. The maximum number of ChangeHistoryEvent items to return. If unspecified, at most 50 items will be returned. The maximum value is 200 (higher values will be coerced to the maximum). Note that the service may return a page with fewer items than this value specifies (potentially even zero), and that there still may be additional pages. If you want a particular number of items, you'll need to continue requesting additional pages using `page_token` until you get the needed number. */
  pageSize?: number;
  /** Optional. If set, only return changes made before this time (inclusive). */
  latestChangeTime?: string;
  /** Optional. Resource name for a child property. If set, only return changes made to this property or its child resources. Format: properties/{propertyId} Example: `properties/100` */
  property?: string;
  /** Optional. If set, only return changes made after this time (inclusive). */
  earliestChangeTime?: string;
  /** Optional. A page token, received from a previous `SearchChangeHistoryEvents` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `SearchChangeHistoryEvents` must match the call that provided the page token. */
  pageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaSearchChangeHistoryEventsRequest: Schema.Schema<GoogleAnalyticsAdminV1alphaSearchChangeHistoryEventsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      resourceType: Schema.optional(Schema.Array(Schema.String)),
      action: Schema.optional(Schema.Array(Schema.String)),
      actorEmail: Schema.optional(Schema.Array(Schema.String)),
      pageSize: Schema.optional(Schema.Number),
      latestChangeTime: Schema.optional(Schema.String),
      property: Schema.optional(Schema.String),
      earliestChangeTime: Schema.optional(Schema.String),
      pageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaSearchChangeHistoryEventsRequest",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaSearchChangeHistoryEventsRequest>;

export interface GoogleAnalyticsAdminV1alphaAccessDimensionValue {
  /** The dimension value. For example, this value may be 'France' for the 'country' dimension. */
  value?: string;
}

export const GoogleAnalyticsAdminV1alphaAccessDimensionValue: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessDimensionValue> =
  Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessDimensionValue",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessDimensionValue>;

export interface GoogleAnalyticsAdminV1alphaAccessMetricValue {
  /** The measurement value. For example, this value may be '13'. */
  value?: string;
}

export const GoogleAnalyticsAdminV1alphaAccessMetricValue: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessMetricValue> =
  Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessMetricValue",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessMetricValue>;

export interface GoogleAnalyticsAdminV1alphaAccessRow {
  /** List of dimension values. These values are in the same order as specified in the request. */
  dimensionValues?: Array<GoogleAnalyticsAdminV1alphaAccessDimensionValue>;
  /** List of metric values. These values are in the same order as specified in the request. */
  metricValues?: Array<GoogleAnalyticsAdminV1alphaAccessMetricValue>;
}

export const GoogleAnalyticsAdminV1alphaAccessRow: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessRow> =
  Schema.suspend(() =>
    Schema.Struct({
      dimensionValues: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaAccessDimensionValue),
      ),
      metricValues: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaAccessMetricValue),
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessRow",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessRow>;

export interface GoogleAnalyticsAdminV1alphaReorderEventEditRulesRequest {
  /** Required. EventEditRule resource names for the specified data stream, in the needed processing order. All EventEditRules for the stream must be present in the list. */
  eventEditRules?: Array<string>;
}

export const GoogleAnalyticsAdminV1alphaReorderEventEditRulesRequest: Schema.Schema<GoogleAnalyticsAdminV1alphaReorderEventEditRulesRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      eventEditRules: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaReorderEventEditRulesRequest",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaReorderEventEditRulesRequest>;

export interface GoogleAnalyticsAdminV1alphaListChannelGroupsResponse {
  /** List of ChannelGroup. These will be ordered stably, but in an arbitrary order. */
  channelGroups?: Array<GoogleAnalyticsAdminV1alphaChannelGroup>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListChannelGroupsResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListChannelGroupsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      channelGroups: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaChannelGroup),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListChannelGroupsResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListChannelGroupsResponse>;

export interface GoogleAnalyticsAdminV1alphaUpdateAccessBindingRequest {
  /** Required. The access binding to update. */
  accessBinding?: GoogleAnalyticsAdminV1alphaAccessBinding;
}

export const GoogleAnalyticsAdminV1alphaUpdateAccessBindingRequest: Schema.Schema<GoogleAnalyticsAdminV1alphaUpdateAccessBindingRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      accessBinding: Schema.optional(GoogleAnalyticsAdminV1alphaAccessBinding),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaUpdateAccessBindingRequest",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaUpdateAccessBindingRequest>;

export interface GoogleAnalyticsAdminV1alphaBatchUpdateAccessBindingsRequest {
  /** Required. The requests specifying the access bindings to update. A maximum of 1000 access bindings can be updated in a batch. */
  requests?: Array<GoogleAnalyticsAdminV1alphaUpdateAccessBindingRequest>;
}

export const GoogleAnalyticsAdminV1alphaBatchUpdateAccessBindingsRequest: Schema.Schema<GoogleAnalyticsAdminV1alphaBatchUpdateAccessBindingsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      requests: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaUpdateAccessBindingRequest),
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaBatchUpdateAccessBindingsRequest",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaBatchUpdateAccessBindingsRequest>;

export interface GoogleAnalyticsAdminV1alphaListCalculatedMetricsResponse {
  /** List of CalculatedMetrics. */
  calculatedMetrics?: Array<GoogleAnalyticsAdminV1alphaCalculatedMetric>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListCalculatedMetricsResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListCalculatedMetricsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      calculatedMetrics: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaCalculatedMetric),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListCalculatedMetricsResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListCalculatedMetricsResponse>;

export interface GoogleAnalyticsAdminV1alphaArchiveCustomDimensionRequest {}

export const GoogleAnalyticsAdminV1alphaArchiveCustomDimensionRequest: Schema.Schema<GoogleAnalyticsAdminV1alphaArchiveCustomDimensionRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaArchiveCustomDimensionRequest",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaArchiveCustomDimensionRequest>;

export interface GoogleAnalyticsAdminV1alphaProvisionSubpropertyRequest {
  /** Optional. The subproperty event filter to create on an ordinary property. */
  subpropertyEventFilter?: GoogleAnalyticsAdminV1alphaSubpropertyEventFilter;
  /** Required. The subproperty to create. */
  subproperty?: GoogleAnalyticsAdminV1alphaProperty;
  /** Optional. The subproperty feature synchronization mode for Custom Dimensions and Metrics */
  customDimensionAndMetricSynchronizationMode?:
    | "SYNCHRONIZATION_MODE_UNSPECIFIED"
    | "NONE"
    | "ALL"
    | (string & {});
}

export const GoogleAnalyticsAdminV1alphaProvisionSubpropertyRequest: Schema.Schema<GoogleAnalyticsAdminV1alphaProvisionSubpropertyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      subpropertyEventFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaSubpropertyEventFilter,
      ),
      subproperty: Schema.optional(GoogleAnalyticsAdminV1alphaProperty),
      customDimensionAndMetricSynchronizationMode: Schema.optional(
        Schema.String,
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaProvisionSubpropertyRequest",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaProvisionSubpropertyRequest>;

export interface GoogleAnalyticsAdminV1alphaRollupPropertySourceLink {
  /** Output only. Resource name of this RollupPropertySourceLink. Format: 'properties/{property_id}/rollupPropertySourceLinks/{rollup_property_source_link}' Format: 'properties/123/rollupPropertySourceLinks/456' */
  name?: string;
  /** Immutable. Resource name of the source property. Format: properties/{property_id} Example: "properties/789" */
  sourceProperty?: string;
}

export const GoogleAnalyticsAdminV1alphaRollupPropertySourceLink: Schema.Schema<GoogleAnalyticsAdminV1alphaRollupPropertySourceLink> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      sourceProperty: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaRollupPropertySourceLink",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaRollupPropertySourceLink>;

export interface GoogleAnalyticsAdminV1alphaCreateRollupPropertyResponse {
  /** The created roll-up property. */
  rollupProperty?: GoogleAnalyticsAdminV1alphaProperty;
  /** The created roll-up property source links. */
  rollupPropertySourceLinks?: Array<GoogleAnalyticsAdminV1alphaRollupPropertySourceLink>;
}

export const GoogleAnalyticsAdminV1alphaCreateRollupPropertyResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaCreateRollupPropertyResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      rollupProperty: Schema.optional(GoogleAnalyticsAdminV1alphaProperty),
      rollupPropertySourceLinks: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaRollupPropertySourceLink),
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaCreateRollupPropertyResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaCreateRollupPropertyResponse>;

export interface GoogleAnalyticsAdminV1alphaAccessMetricHeader {
  /** The metric's name; for example 'accessCount'. */
  metricName?: string;
}

export const GoogleAnalyticsAdminV1alphaAccessMetricHeader: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessMetricHeader> =
  Schema.suspend(() =>
    Schema.Struct({
      metricName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessMetricHeader",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessMetricHeader>;

export interface GoogleAnalyticsAdminV1alphaListEventCreateRulesResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** List of EventCreateRules. These will be ordered stably, but in an arbitrary order. */
  eventCreateRules?: Array<GoogleAnalyticsAdminV1alphaEventCreateRule>;
}

export const GoogleAnalyticsAdminV1alphaListEventCreateRulesResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListEventCreateRulesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      eventCreateRules: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaEventCreateRule),
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListEventCreateRulesResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListEventCreateRulesResponse>;

export interface GoogleAnalyticsAdminV1alphaListConversionEventsResponse {
  /** The requested conversion events */
  conversionEvents?: Array<GoogleAnalyticsAdminV1alphaConversionEvent>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListConversionEventsResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListConversionEventsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      conversionEvents: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaConversionEvent),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListConversionEventsResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListConversionEventsResponse>;

export interface GoogleAnalyticsAdminV1alphaListAccountsResponse {
  /** Results that were accessible to the caller. */
  accounts?: Array<GoogleAnalyticsAdminV1alphaAccount>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListAccountsResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListAccountsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      accounts: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaAccount),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListAccountsResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListAccountsResponse>;

export interface GoogleAnalyticsAdminV1alphaListKeyEventsResponse {
  /** The requested Key Events */
  keyEvents?: Array<GoogleAnalyticsAdminV1alphaKeyEvent>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListKeyEventsResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListKeyEventsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      keyEvents: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaKeyEvent),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListKeyEventsResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListKeyEventsResponse>;

export interface GoogleAnalyticsAdminV1alphaApproveDisplayVideo360AdvertiserLinkProposalResponse {
  /** The DisplayVideo360AdvertiserLink created as a result of approving the proposal. */
  displayVideo360AdvertiserLink?: GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink;
}

export const GoogleAnalyticsAdminV1alphaApproveDisplayVideo360AdvertiserLinkProposalResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaApproveDisplayVideo360AdvertiserLinkProposalResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      displayVideo360AdvertiserLink: Schema.optional(
        GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaApproveDisplayVideo360AdvertiserLinkProposalResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaApproveDisplayVideo360AdvertiserLinkProposalResponse>;

export interface GoogleAnalyticsAdminV1alphaAcknowledgeUserDataCollectionRequest {
  /** Required. An acknowledgement that the caller of this method understands the terms of user data collection. This field must contain the exact value: "I acknowledge that I have the necessary privacy disclosures and rights from my end users for the collection and processing of their data, including the association of such data with the visitation information Google Analytics collects from my site and/or app property." */
  acknowledgement?: string;
}

export const GoogleAnalyticsAdminV1alphaAcknowledgeUserDataCollectionRequest: Schema.Schema<GoogleAnalyticsAdminV1alphaAcknowledgeUserDataCollectionRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      acknowledgement: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaAcknowledgeUserDataCollectionRequest",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAcknowledgeUserDataCollectionRequest>;

export interface GoogleProtobufEmpty {}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleProtobufEmpty",
  }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleAnalyticsAdminV1alphaCreateRollupPropertyRequest {
  /** Optional. The resource names of properties that will be sources to the created roll-up property. */
  sourceProperties?: Array<string>;
  /** Required. The roll-up property to create. */
  rollupProperty?: GoogleAnalyticsAdminV1alphaProperty;
}

export const GoogleAnalyticsAdminV1alphaCreateRollupPropertyRequest: Schema.Schema<GoogleAnalyticsAdminV1alphaCreateRollupPropertyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      sourceProperties: Schema.optional(Schema.Array(Schema.String)),
      rollupProperty: Schema.optional(GoogleAnalyticsAdminV1alphaProperty),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaCreateRollupPropertyRequest",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaCreateRollupPropertyRequest>;

export interface GoogleAnalyticsAdminV1alphaAccessOrderByDimensionOrderBy {
  /** A dimension name in the request to order by. */
  dimensionName?: string;
  /** Controls the rule for dimension value ordering. */
  orderType?:
    | "ORDER_TYPE_UNSPECIFIED"
    | "ALPHANUMERIC"
    | "CASE_INSENSITIVE_ALPHANUMERIC"
    | "NUMERIC"
    | (string & {});
}

export const GoogleAnalyticsAdminV1alphaAccessOrderByDimensionOrderBy: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessOrderByDimensionOrderBy> =
  Schema.suspend(() =>
    Schema.Struct({
      dimensionName: Schema.optional(Schema.String),
      orderType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessOrderByDimensionOrderBy",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessOrderByDimensionOrderBy>;

export interface GoogleAnalyticsAdminV1alphaProvisionAccountTicketResponse {
  /** The param to be passed in the ToS link. */
  accountTicketId?: string;
}

export const GoogleAnalyticsAdminV1alphaProvisionAccountTicketResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaProvisionAccountTicketResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      accountTicketId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaProvisionAccountTicketResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaProvisionAccountTicketResponse>;

export interface GoogleAnalyticsAdminV1alphaAccessFilterExpression {
  /** A primitive filter. In the same FilterExpression, all of the filter's field names need to be either all dimensions or all metrics. */
  accessFilter?: GoogleAnalyticsAdminV1alphaAccessFilter;
  /** Each of the FilterExpressions in the and_group has an AND relationship. */
  andGroup?: GoogleAnalyticsAdminV1alphaAccessFilterExpressionList;
  /** Each of the FilterExpressions in the or_group has an OR relationship. */
  orGroup?: GoogleAnalyticsAdminV1alphaAccessFilterExpressionList;
  /** The FilterExpression is NOT of not_expression. */
  notExpression?: GoogleAnalyticsAdminV1alphaAccessFilterExpression;
}

export const GoogleAnalyticsAdminV1alphaAccessFilterExpression: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessFilterExpression> =
  Schema.suspend(() =>
    Schema.Struct({
      accessFilter: Schema.optional(GoogleAnalyticsAdminV1alphaAccessFilter),
      andGroup: Schema.optional(
        GoogleAnalyticsAdminV1alphaAccessFilterExpressionList,
      ),
      orGroup: Schema.optional(
        GoogleAnalyticsAdminV1alphaAccessFilterExpressionList,
      ),
      notExpression: Schema.optional(
        GoogleAnalyticsAdminV1alphaAccessFilterExpression,
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessFilterExpression",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessFilterExpression>;

export interface GoogleAnalyticsAdminV1alphaAccessFilterExpressionList {
  /** A list of filter expressions. */
  expressions?: Array<GoogleAnalyticsAdminV1alphaAccessFilterExpression>;
}

export const GoogleAnalyticsAdminV1alphaAccessFilterExpressionList: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessFilterExpressionList> =
  Schema.suspend(() =>
    Schema.Struct({
      expressions: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaAccessFilterExpression),
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessFilterExpressionList",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessFilterExpressionList>;

export interface GoogleAnalyticsAdminV1alphaListSubpropertyEventFiltersResponse {
  /** List of subproperty event filters. */
  subpropertyEventFilters?: Array<GoogleAnalyticsAdminV1alphaSubpropertyEventFilter>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListSubpropertyEventFiltersResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListSubpropertyEventFiltersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      subpropertyEventFilters: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaSubpropertyEventFilter),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaListSubpropertyEventFiltersResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListSubpropertyEventFiltersResponse>;

export interface GoogleAnalyticsAdminV1alphaApproveDisplayVideo360AdvertiserLinkProposalRequest {}

export const GoogleAnalyticsAdminV1alphaApproveDisplayVideo360AdvertiserLinkProposalRequest: Schema.Schema<GoogleAnalyticsAdminV1alphaApproveDisplayVideo360AdvertiserLinkProposalRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaApproveDisplayVideo360AdvertiserLinkProposalRequest",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaApproveDisplayVideo360AdvertiserLinkProposalRequest>;

export interface GoogleAnalyticsAdminV1alphaListAdSenseLinksResponse {
  /** List of AdSenseLinks. */
  adsenseLinks?: Array<GoogleAnalyticsAdminV1alphaAdSenseLink>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListAdSenseLinksResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListAdSenseLinksResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      adsenseLinks: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaAdSenseLink),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListAdSenseLinksResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListAdSenseLinksResponse>;

export interface GoogleAnalyticsAdminV1alphaChangeHistoryEvent {
  /** ID of this change history event. This ID is unique across Google Analytics. */
  id?: string;
  /** A list of changes made in this change history event that fit the filters specified in SearchChangeHistoryEventsRequest. */
  changes?: Array<GoogleAnalyticsAdminV1alphaChangeHistoryChange>;
  /** Time when change was made. */
  changeTime?: string;
  /** If true, then the list of changes returned was filtered, and does not represent all changes that occurred in this event. */
  changesFiltered?: boolean;
  /** Email address of the Google account that made the change. This will be a valid email address if the actor field is set to USER, and empty otherwise. Google accounts that have been deleted will cause an error. */
  userActorEmail?: string;
  /** The type of actor that made this change. */
  actorType?:
    | "ACTOR_TYPE_UNSPECIFIED"
    | "USER"
    | "SYSTEM"
    | "SUPPORT"
    | (string & {});
}

export const GoogleAnalyticsAdminV1alphaChangeHistoryEvent: Schema.Schema<GoogleAnalyticsAdminV1alphaChangeHistoryEvent> =
  Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      changes: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaChangeHistoryChange),
      ),
      changeTime: Schema.optional(Schema.String),
      changesFiltered: Schema.optional(Schema.Boolean),
      userActorEmail: Schema.optional(Schema.String),
      actorType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaChangeHistoryEvent",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaChangeHistoryEvent>;

export interface GoogleAnalyticsAdminV1alphaListRollupPropertySourceLinksResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** List of RollupPropertySourceLinks. */
  rollupPropertySourceLinks?: Array<GoogleAnalyticsAdminV1alphaRollupPropertySourceLink>;
}

export const GoogleAnalyticsAdminV1alphaListRollupPropertySourceLinksResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListRollupPropertySourceLinksResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      rollupPropertySourceLinks: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaRollupPropertySourceLink),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaListRollupPropertySourceLinksResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListRollupPropertySourceLinksResponse>;

export interface GoogleAnalyticsAdminV1alphaListMeasurementProtocolSecretsResponse {
  /** A list of secrets for the parent stream specified in the request. */
  measurementProtocolSecrets?: Array<GoogleAnalyticsAdminV1alphaMeasurementProtocolSecret>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListMeasurementProtocolSecretsResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListMeasurementProtocolSecretsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      measurementProtocolSecrets: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaMeasurementProtocolSecret),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaListMeasurementProtocolSecretsResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListMeasurementProtocolSecretsResponse>;

export interface GoogleAnalyticsAdminV1alphaListAccessBindingsResponse {
  /** List of AccessBindings. These will be ordered stably, but in an arbitrary order. */
  accessBindings?: Array<GoogleAnalyticsAdminV1alphaAccessBinding>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListAccessBindingsResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListAccessBindingsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      accessBindings: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaAccessBinding),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListAccessBindingsResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListAccessBindingsResponse>;

export interface GoogleAnalyticsAdminV1alphaArchiveCustomMetricRequest {}

export const GoogleAnalyticsAdminV1alphaArchiveCustomMetricRequest: Schema.Schema<GoogleAnalyticsAdminV1alphaArchiveCustomMetricRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaArchiveCustomMetricRequest",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaArchiveCustomMetricRequest>;

export interface GoogleAnalyticsAdminV1alphaListPropertiesResponse {
  /** Results that matched the filter criteria and were accessible to the caller. */
  properties?: Array<GoogleAnalyticsAdminV1alphaProperty>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListPropertiesResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListPropertiesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      properties: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaProperty),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListPropertiesResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListPropertiesResponse>;

export interface GoogleAnalyticsAdminV1alphaListCustomDimensionsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** List of CustomDimensions. */
  customDimensions?: Array<GoogleAnalyticsAdminV1alphaCustomDimension>;
}

export const GoogleAnalyticsAdminV1alphaListCustomDimensionsResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListCustomDimensionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      customDimensions: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaCustomDimension),
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListCustomDimensionsResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListCustomDimensionsResponse>;

export interface GoogleAnalyticsAdminV1alphaAccessDimensionHeader {
  /** The dimension's name; for example 'userEmail'. */
  dimensionName?: string;
}

export const GoogleAnalyticsAdminV1alphaAccessDimensionHeader: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessDimensionHeader> =
  Schema.suspend(() =>
    Schema.Struct({
      dimensionName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessDimensionHeader",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessDimensionHeader>;

export interface GoogleAnalyticsAdminV1alphaListSKAdNetworkConversionValueSchemasResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. Currently, Google Analytics supports only one SKAdNetworkConversionValueSchema per dataStream, so this will never be populated. */
  nextPageToken?: string;
  /** List of SKAdNetworkConversionValueSchemas. This will have at most one value. */
  skadnetworkConversionValueSchemas?: Array<GoogleAnalyticsAdminV1alphaSKAdNetworkConversionValueSchema>;
}

export const GoogleAnalyticsAdminV1alphaListSKAdNetworkConversionValueSchemasResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListSKAdNetworkConversionValueSchemasResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      skadnetworkConversionValueSchemas: Schema.optional(
        Schema.Array(
          GoogleAnalyticsAdminV1alphaSKAdNetworkConversionValueSchema,
        ),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaListSKAdNetworkConversionValueSchemasResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListSKAdNetworkConversionValueSchemasResponse>;

export interface GoogleAnalyticsAdminV1alphaAccessMetric {
  /** The API name of the metric. See [Data Access Schema](https://developers.google.com/analytics/devguides/config/admin/v1/access-api-schema) for the list of metrics supported in this API. Metrics are referenced by name in `metricFilter` & `orderBys`. */
  metricName?: string;
}

export const GoogleAnalyticsAdminV1alphaAccessMetric: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessMetric> =
  Schema.suspend(() =>
    Schema.Struct({
      metricName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessMetric",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessMetric>;

export interface GoogleAnalyticsAdminV1alphaAccessOrderByMetricOrderBy {
  /** A metric name in the request to order by. */
  metricName?: string;
}

export const GoogleAnalyticsAdminV1alphaAccessOrderByMetricOrderBy: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessOrderByMetricOrderBy> =
  Schema.suspend(() =>
    Schema.Struct({
      metricName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessOrderByMetricOrderBy",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessOrderByMetricOrderBy>;

export interface GoogleAnalyticsAdminV1alphaRunAccessReportResponse {
  /** The quota state for this Analytics property including this request. This field doesn't work with account-level requests. */
  quota?: GoogleAnalyticsAdminV1alphaAccessQuota;
  /** The header for a column in the report that corresponds to a specific metric. The number of MetricHeaders and ordering of MetricHeaders matches the metrics present in rows. */
  metricHeaders?: Array<GoogleAnalyticsAdminV1alphaAccessMetricHeader>;
  /** The total number of rows in the query result. `rowCount` is independent of the number of rows returned in the response, the `limit` request parameter, and the `offset` request parameter. For example if a query returns 175 rows and includes `limit` of 50 in the API request, the response will contain `rowCount` of 175 but only 50 rows. To learn more about this pagination parameter, see [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination). */
  rowCount?: number;
  /** The header for a column in the report that corresponds to a specific dimension. The number of DimensionHeaders and ordering of DimensionHeaders matches the dimensions present in rows. */
  dimensionHeaders?: Array<GoogleAnalyticsAdminV1alphaAccessDimensionHeader>;
  /** Rows of dimension value combinations and metric values in the report. */
  rows?: Array<GoogleAnalyticsAdminV1alphaAccessRow>;
}

export const GoogleAnalyticsAdminV1alphaRunAccessReportResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaRunAccessReportResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      quota: Schema.optional(GoogleAnalyticsAdminV1alphaAccessQuota),
      metricHeaders: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaAccessMetricHeader),
      ),
      rowCount: Schema.optional(Schema.Number),
      dimensionHeaders: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaAccessDimensionHeader),
      ),
      rows: Schema.optional(Schema.Array(GoogleAnalyticsAdminV1alphaAccessRow)),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaRunAccessReportResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaRunAccessReportResponse>;

export interface GoogleAnalyticsAdminV1alphaArchiveAudienceRequest {}

export const GoogleAnalyticsAdminV1alphaArchiveAudienceRequest: Schema.Schema<GoogleAnalyticsAdminV1alphaArchiveAudienceRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaArchiveAudienceRequest",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaArchiveAudienceRequest>;

export interface GoogleAnalyticsAdminV1alphaGlobalSiteTag {
  /** Output only. Resource name for this GlobalSiteTag resource. Format: properties/{property_id}/dataStreams/{stream_id}/globalSiteTag Example: "properties/123/dataStreams/456/globalSiteTag" */
  name?: string;
  /** Immutable. JavaScript code snippet to be pasted as the first item into the head tag of every webpage to measure. */
  snippet?: string;
}

export const GoogleAnalyticsAdminV1alphaGlobalSiteTag: Schema.Schema<GoogleAnalyticsAdminV1alphaGlobalSiteTag> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      snippet: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaGlobalSiteTag",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaGlobalSiteTag>;

export interface GoogleAnalyticsAdminV1alphaBatchCreateAccessBindingsResponse {
  /** The access bindings created. */
  accessBindings?: Array<GoogleAnalyticsAdminV1alphaAccessBinding>;
}

export const GoogleAnalyticsAdminV1alphaBatchCreateAccessBindingsResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaBatchCreateAccessBindingsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      accessBindings: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaAccessBinding),
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaBatchCreateAccessBindingsResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaBatchCreateAccessBindingsResponse>;

export interface GoogleAnalyticsAdminV1alphaSearchChangeHistoryEventsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Results that were accessible to the caller. */
  changeHistoryEvents?: Array<GoogleAnalyticsAdminV1alphaChangeHistoryEvent>;
}

export const GoogleAnalyticsAdminV1alphaSearchChangeHistoryEventsResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaSearchChangeHistoryEventsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      changeHistoryEvents: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaChangeHistoryEvent),
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaSearchChangeHistoryEventsResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaSearchChangeHistoryEventsResponse>;

export interface GoogleAnalyticsAdminV1alphaCancelDisplayVideo360AdvertiserLinkProposalRequest {}

export const GoogleAnalyticsAdminV1alphaCancelDisplayVideo360AdvertiserLinkProposalRequest: Schema.Schema<GoogleAnalyticsAdminV1alphaCancelDisplayVideo360AdvertiserLinkProposalRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaCancelDisplayVideo360AdvertiserLinkProposalRequest",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaCancelDisplayVideo360AdvertiserLinkProposalRequest>;

export interface GoogleAnalyticsAdminV1alphaProvisionAccountTicketRequest {
  /** Redirect URI where the user will be sent after accepting Terms of Service. Must be configured in Cloud Console as a Redirect URI. */
  redirectUri?: string;
  /** The account to create. */
  account?: GoogleAnalyticsAdminV1alphaAccount;
}

export const GoogleAnalyticsAdminV1alphaProvisionAccountTicketRequest: Schema.Schema<GoogleAnalyticsAdminV1alphaProvisionAccountTicketRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      redirectUri: Schema.optional(Schema.String),
      account: Schema.optional(GoogleAnalyticsAdminV1alphaAccount),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaProvisionAccountTicketRequest",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaProvisionAccountTicketRequest>;

export interface GoogleAnalyticsAdminV1alphaSubmitUserDeletionResponse {
  /** Marks the moment for which all visitor data before this point should be deleted. This is set to the time at which the deletion request was received. */
  deletionRequestTime?: string;
}

export const GoogleAnalyticsAdminV1alphaSubmitUserDeletionResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaSubmitUserDeletionResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      deletionRequestTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaSubmitUserDeletionResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaSubmitUserDeletionResponse>;

export interface GoogleAnalyticsAdminV1alphaAccessOrderBy {
  /** Sorts results by a dimension's values. */
  dimension?: GoogleAnalyticsAdminV1alphaAccessOrderByDimensionOrderBy;
  /** Sorts results by a metric's values. */
  metric?: GoogleAnalyticsAdminV1alphaAccessOrderByMetricOrderBy;
  /** If true, sorts by descending order. If false or unspecified, sorts in ascending order. */
  desc?: boolean;
}

export const GoogleAnalyticsAdminV1alphaAccessOrderBy: Schema.Schema<GoogleAnalyticsAdminV1alphaAccessOrderBy> =
  Schema.suspend(() =>
    Schema.Struct({
      dimension: Schema.optional(
        GoogleAnalyticsAdminV1alphaAccessOrderByDimensionOrderBy,
      ),
      metric: Schema.optional(
        GoogleAnalyticsAdminV1alphaAccessOrderByMetricOrderBy,
      ),
      desc: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaAccessOrderBy",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaAccessOrderBy>;

export interface GoogleAnalyticsAdminV1alphaListAccountSummariesResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Account summaries of all accounts the caller has access to. */
  accountSummaries?: Array<GoogleAnalyticsAdminV1alphaAccountSummary>;
}

export const GoogleAnalyticsAdminV1alphaListAccountSummariesResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListAccountSummariesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      accountSummaries: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaAccountSummary),
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListAccountSummariesResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListAccountSummariesResponse>;

export interface GoogleAnalyticsAdminV1alphaRunAccessReportRequest {
  /** Dimension filters let you restrict report response to specific dimension values which match the filter. For example, filtering on access records of a single user. To learn more, see [Fundamentals of Dimension Filters](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#dimension_filters) for examples. Metrics cannot be used in this filter. */
  dimensionFilter?: GoogleAnalyticsAdminV1alphaAccessFilterExpression;
  /** Date ranges of access records to read. If multiple date ranges are requested, each response row will contain a zero based date range index. If two date ranges overlap, the access records for the overlapping days is included in the response rows for both date ranges. Requests are allowed up to 2 date ranges. */
  dateRanges?: Array<GoogleAnalyticsAdminV1alphaAccessDateRange>;
  /** Toggles whether to return the current state of this Analytics Property's quota. Quota is returned in [AccessQuota](#AccessQuota). For account-level requests, this field must be false. */
  returnEntityQuota?: boolean;
  /** The dimensions requested and displayed in the response. Requests are allowed up to 9 dimensions. */
  dimensions?: Array<GoogleAnalyticsAdminV1alphaAccessDimension>;
  /** Metric filters allow you to restrict report response to specific metric values which match the filter. Metric filters are applied after aggregating the report's rows, similar to SQL having-clause. Dimensions cannot be used in this filter. */
  metricFilter?: GoogleAnalyticsAdminV1alphaAccessFilterExpression;
  /** Specifies how rows are ordered in the response. */
  orderBys?: Array<GoogleAnalyticsAdminV1alphaAccessOrderBy>;
  /** This request's time zone if specified. If unspecified, the property's time zone is used. The request's time zone is used to interpret the start & end dates of the report. Formatted as strings from the IANA Time Zone database (https://www.iana.org/time-zones); for example "America/New_York" or "Asia/Tokyo". */
  timeZone?: string;
  /** The number of rows to return. If unspecified, 10,000 rows are returned. The API returns a maximum of 100,000 rows per request, no matter how many you ask for. `limit` must be positive. The API may return fewer rows than the requested `limit`, if there aren't as many remaining rows as the `limit`. For instance, there are fewer than 300 possible values for the dimension `country`, so when reporting on only `country`, you can't get more than 300 rows, even if you set `limit` to a higher value. To learn more about this pagination parameter, see [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination). */
  limit?: string;
  /** The metrics requested and displayed in the response. Requests are allowed up to 10 metrics. */
  metrics?: Array<GoogleAnalyticsAdminV1alphaAccessMetric>;
  /** The row count of the start row. The first row is counted as row 0. If offset is unspecified, it is treated as 0. If offset is zero, then this method will return the first page of results with `limit` entries. To learn more about this pagination parameter, see [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination). */
  offset?: string;
  /** Optional. Determines whether to include users who have never made an API call in the response. If true, all users with access to the specified property or account are included in the response, regardless of whether they have made an API call or not. If false, only the users who have made an API call will be included. */
  includeAllUsers?: boolean;
  /** Optional. Decides whether to return the users within user groups. This field works only when include_all_users is set to true. If true, it will return all users with access to the specified property or account. If false, only the users with direct access will be returned. */
  expandGroups?: boolean;
}

export const GoogleAnalyticsAdminV1alphaRunAccessReportRequest: Schema.Schema<GoogleAnalyticsAdminV1alphaRunAccessReportRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      dimensionFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaAccessFilterExpression,
      ),
      dateRanges: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaAccessDateRange),
      ),
      returnEntityQuota: Schema.optional(Schema.Boolean),
      dimensions: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaAccessDimension),
      ),
      metricFilter: Schema.optional(
        GoogleAnalyticsAdminV1alphaAccessFilterExpression,
      ),
      orderBys: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaAccessOrderBy),
      ),
      timeZone: Schema.optional(Schema.String),
      limit: Schema.optional(Schema.String),
      metrics: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaAccessMetric),
      ),
      offset: Schema.optional(Schema.String),
      includeAllUsers: Schema.optional(Schema.Boolean),
      expandGroups: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaRunAccessReportRequest",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaRunAccessReportRequest>;

export interface GoogleAnalyticsAdminV1alphaListBigQueryLinksResponse {
  /** List of BigQueryLinks. */
  bigqueryLinks?: Array<GoogleAnalyticsAdminV1alphaBigQueryLink>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListBigQueryLinksResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListBigQueryLinksResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      bigqueryLinks: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaBigQueryLink),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaListBigQueryLinksResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListBigQueryLinksResponse>;

export interface GoogleAnalyticsAdminV1alphaBatchGetAccessBindingsResponse {
  /** The requested access bindings. */
  accessBindings?: Array<GoogleAnalyticsAdminV1alphaAccessBinding>;
}

export const GoogleAnalyticsAdminV1alphaBatchGetAccessBindingsResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaBatchGetAccessBindingsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      accessBindings: Schema.optional(
        Schema.Array(GoogleAnalyticsAdminV1alphaAccessBinding),
      ),
    }),
  ).annotate({
    identifier: "GoogleAnalyticsAdminV1alphaBatchGetAccessBindingsResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaBatchGetAccessBindingsResponse>;

export interface GoogleAnalyticsAdminV1alphaListDisplayVideo360AdvertiserLinkProposalsResponse {
  /** List of DisplayVideo360AdvertiserLinkProposals. */
  displayVideo360AdvertiserLinkProposals?: Array<GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLinkProposal>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleAnalyticsAdminV1alphaListDisplayVideo360AdvertiserLinkProposalsResponse: Schema.Schema<GoogleAnalyticsAdminV1alphaListDisplayVideo360AdvertiserLinkProposalsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      displayVideo360AdvertiserLinkProposals: Schema.optional(
        Schema.Array(
          GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLinkProposal,
        ),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleAnalyticsAdminV1alphaListDisplayVideo360AdvertiserLinkProposalsResponse",
  }) as any as Schema.Schema<GoogleAnalyticsAdminV1alphaListDisplayVideo360AdvertiserLinkProposalsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface UpdateGoogleSignalsSettingsPropertiesRequest {
  /** Output only. Resource name of this setting. Format: properties/{property_id}/googleSignalsSettings Example: "properties/1000/googleSignalsSettings" */
  name: string;
  /** Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaGoogleSignalsSettings;
}

export const UpdateGoogleSignalsSettingsPropertiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaGoogleSignalsSettings).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/googleSignalsSettings",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateGoogleSignalsSettingsPropertiesRequest>;

export type UpdateGoogleSignalsSettingsPropertiesResponse =
  GoogleAnalyticsAdminV1alphaGoogleSignalsSettings;
export const UpdateGoogleSignalsSettingsPropertiesResponse =
  GoogleAnalyticsAdminV1alphaGoogleSignalsSettings;

export type UpdateGoogleSignalsSettingsPropertiesError = DefaultErrors;

/** Updates Google Signals settings for a property. */
export const updateGoogleSignalsSettingsProperties: API.OperationMethod<
  UpdateGoogleSignalsSettingsPropertiesRequest,
  UpdateGoogleSignalsSettingsPropertiesResponse,
  UpdateGoogleSignalsSettingsPropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateGoogleSignalsSettingsPropertiesRequest,
  output: UpdateGoogleSignalsSettingsPropertiesResponse,
  errors: [],
}));

export interface ListPropertiesRequest {
  /** Whether to include soft-deleted (ie: "trashed") Properties in the results. Properties can be inspected to determine whether they are deleted or not. */
  showDeleted?: boolean;
  /** The maximum number of resources to return. The service may return fewer than this value, even if there are additional pages. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum) */
  pageSize?: number;
  /** Required. An expression for filtering the results of the request. Fields eligible for filtering are: `parent:`(The resource name of the parent account/property) or `ancestor:`(The resource name of the parent account) or `firebase_project:`(The id or number of the linked firebase project). Some examples of filters: ``` | Filter | Description | |-----------------------------|-------------------------------------------| | parent:accounts/123 | The account with account id: 123. | | parent:properties/123 | The property with property id: 123. | | ancestor:accounts/123 | The account with account id: 123. | | firebase_project:project-id | The firebase project with id: project-id. | | firebase_project:123 | The firebase project with number: 123. | ``` */
  filter?: string;
  /** A page token, received from a previous `ListProperties` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListProperties` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesRequest = Schema.Struct({
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/properties" }),
  svc,
) as unknown as Schema.Schema<ListPropertiesRequest>;

export type ListPropertiesResponse =
  GoogleAnalyticsAdminV1alphaListPropertiesResponse;
export const ListPropertiesResponse =
  GoogleAnalyticsAdminV1alphaListPropertiesResponse;

export type ListPropertiesError = DefaultErrors;

/** Returns child Properties under the specified parent Account. Properties will be excluded if the caller does not have access. Soft-deleted (ie: "trashed") properties are excluded by default. Returns an empty list if no relevant properties are found. */
export const listProperties: API.PaginatedOperationMethod<
  ListPropertiesRequest,
  ListPropertiesResponse,
  ListPropertiesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesRequest,
  output: ListPropertiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetDataRetentionSettingsPropertiesRequest {
  /** Required. The name of the settings to lookup. Format: properties/{property}/dataRetentionSettings Example: "properties/1000/dataRetentionSettings" */
  name: string;
}

export const GetDataRetentionSettingsPropertiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/dataRetentionSettings",
  }),
  svc,
) as unknown as Schema.Schema<GetDataRetentionSettingsPropertiesRequest>;

export type GetDataRetentionSettingsPropertiesResponse =
  GoogleAnalyticsAdminV1alphaDataRetentionSettings;
export const GetDataRetentionSettingsPropertiesResponse =
  GoogleAnalyticsAdminV1alphaDataRetentionSettings;

export type GetDataRetentionSettingsPropertiesError = DefaultErrors;

/** Returns the singleton data retention settings for this property. */
export const getDataRetentionSettingsProperties: API.OperationMethod<
  GetDataRetentionSettingsPropertiesRequest,
  GetDataRetentionSettingsPropertiesResponse,
  GetDataRetentionSettingsPropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDataRetentionSettingsPropertiesRequest,
  output: GetDataRetentionSettingsPropertiesResponse,
  errors: [],
}));

export interface SubmitUserDeletionPropertiesRequest {
  /** Required. The name of the property to submit user deletion for. */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaSubmitUserDeletionRequest;
}

export const SubmitUserDeletionPropertiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(
    GoogleAnalyticsAdminV1alphaSubmitUserDeletionRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}:submitUserDeletion",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SubmitUserDeletionPropertiesRequest>;

export type SubmitUserDeletionPropertiesResponse =
  GoogleAnalyticsAdminV1alphaSubmitUserDeletionResponse;
export const SubmitUserDeletionPropertiesResponse =
  GoogleAnalyticsAdminV1alphaSubmitUserDeletionResponse;

export type SubmitUserDeletionPropertiesError = DefaultErrors;

/** Submits a request for user deletion for a property. */
export const submitUserDeletionProperties: API.OperationMethod<
  SubmitUserDeletionPropertiesRequest,
  SubmitUserDeletionPropertiesResponse,
  SubmitUserDeletionPropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SubmitUserDeletionPropertiesRequest,
  output: SubmitUserDeletionPropertiesResponse,
  errors: [],
}));

export interface UpdateAttributionSettingsPropertiesRequest {
  /** Output only. Resource name of this attribution settings resource. Format: properties/{property_id}/attributionSettings Example: "properties/1000/attributionSettings" */
  name: string;
  /** Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaAttributionSettings;
}

export const UpdateAttributionSettingsPropertiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaAttributionSettings).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/attributionSettings",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateAttributionSettingsPropertiesRequest>;

export type UpdateAttributionSettingsPropertiesResponse =
  GoogleAnalyticsAdminV1alphaAttributionSettings;
export const UpdateAttributionSettingsPropertiesResponse =
  GoogleAnalyticsAdminV1alphaAttributionSettings;

export type UpdateAttributionSettingsPropertiesError = DefaultErrors;

/** Updates attribution settings on a property. */
export const updateAttributionSettingsProperties: API.OperationMethod<
  UpdateAttributionSettingsPropertiesRequest,
  UpdateAttributionSettingsPropertiesResponse,
  UpdateAttributionSettingsPropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAttributionSettingsPropertiesRequest,
  output: UpdateAttributionSettingsPropertiesResponse,
  errors: [],
}));

export interface DeletePropertiesRequest {
  /** Required. The name of the Property to soft-delete. Format: properties/{property_id} Example: "properties/1000" */
  name: string;
}

export const DeletePropertiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha/properties/{propertiesId}" }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesRequest>;

export type DeletePropertiesResponse = GoogleAnalyticsAdminV1alphaProperty;
export const DeletePropertiesResponse = GoogleAnalyticsAdminV1alphaProperty;

export type DeletePropertiesError = DefaultErrors;

/** Marks target Property as soft-deleted (ie: "trashed") and returns it. This API does not have a method to restore soft-deleted properties. However, they can be restored using the Trash Can UI. If the properties are not restored before the expiration time, the Property and all child resources (eg: GoogleAdsLinks, Streams, AccessBindings) will be permanently purged. https://support.google.com/analytics/answer/6154772 Returns an error if the target is not found. */
export const deleteProperties: API.OperationMethod<
  DeletePropertiesRequest,
  DeletePropertiesResponse,
  DeletePropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesRequest,
  output: DeletePropertiesResponse,
  errors: [],
}));

export interface GetGoogleSignalsSettingsPropertiesRequest {
  /** Required. The name of the google signals settings to retrieve. Format: properties/{property}/googleSignalsSettings */
  name: string;
}

export const GetGoogleSignalsSettingsPropertiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/googleSignalsSettings",
  }),
  svc,
) as unknown as Schema.Schema<GetGoogleSignalsSettingsPropertiesRequest>;

export type GetGoogleSignalsSettingsPropertiesResponse =
  GoogleAnalyticsAdminV1alphaGoogleSignalsSettings;
export const GetGoogleSignalsSettingsPropertiesResponse =
  GoogleAnalyticsAdminV1alphaGoogleSignalsSettings;

export type GetGoogleSignalsSettingsPropertiesError = DefaultErrors;

/** Lookup for Google Signals settings for a property. */
export const getGoogleSignalsSettingsProperties: API.OperationMethod<
  GetGoogleSignalsSettingsPropertiesRequest,
  GetGoogleSignalsSettingsPropertiesResponse,
  GetGoogleSignalsSettingsPropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetGoogleSignalsSettingsPropertiesRequest,
  output: GetGoogleSignalsSettingsPropertiesResponse,
  errors: [],
}));

export interface GetPropertiesRequest {
  /** Required. The name of the property to lookup. Format: properties/{property_id} Example: "properties/1000" */
  name: string;
}

export const GetPropertiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/properties/{propertiesId}" }),
  svc,
) as unknown as Schema.Schema<GetPropertiesRequest>;

export type GetPropertiesResponse = GoogleAnalyticsAdminV1alphaProperty;
export const GetPropertiesResponse = GoogleAnalyticsAdminV1alphaProperty;

export type GetPropertiesError = DefaultErrors;

/** Lookup for a single GA Property. */
export const getProperties: API.OperationMethod<
  GetPropertiesRequest,
  GetPropertiesResponse,
  GetPropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesRequest,
  output: GetPropertiesResponse,
  errors: [],
}));

export interface GetAttributionSettingsPropertiesRequest {
  /** Required. The name of the attribution settings to retrieve. Format: properties/{property}/attributionSettings */
  name: string;
}

export const GetAttributionSettingsPropertiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/attributionSettings",
  }),
  svc,
) as unknown as Schema.Schema<GetAttributionSettingsPropertiesRequest>;

export type GetAttributionSettingsPropertiesResponse =
  GoogleAnalyticsAdminV1alphaAttributionSettings;
export const GetAttributionSettingsPropertiesResponse =
  GoogleAnalyticsAdminV1alphaAttributionSettings;

export type GetAttributionSettingsPropertiesError = DefaultErrors;

/** Lookup for a AttributionSettings singleton. */
export const getAttributionSettingsProperties: API.OperationMethod<
  GetAttributionSettingsPropertiesRequest,
  GetAttributionSettingsPropertiesResponse,
  GetAttributionSettingsPropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAttributionSettingsPropertiesRequest,
  output: GetAttributionSettingsPropertiesResponse,
  errors: [],
}));

export interface CreateRollupPropertyPropertiesRequest {
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaCreateRollupPropertyRequest;
}

export const CreateRollupPropertyPropertiesRequest = Schema.Struct({
  body: Schema.optional(
    GoogleAnalyticsAdminV1alphaCreateRollupPropertyRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties:createRollupProperty",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateRollupPropertyPropertiesRequest>;

export type CreateRollupPropertyPropertiesResponse =
  GoogleAnalyticsAdminV1alphaCreateRollupPropertyResponse;
export const CreateRollupPropertyPropertiesResponse =
  GoogleAnalyticsAdminV1alphaCreateRollupPropertyResponse;

export type CreateRollupPropertyPropertiesError = DefaultErrors;

/** Create a roll-up property and all roll-up property source links. */
export const createRollupPropertyProperties: API.OperationMethod<
  CreateRollupPropertyPropertiesRequest,
  CreateRollupPropertyPropertiesResponse,
  CreateRollupPropertyPropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateRollupPropertyPropertiesRequest,
  output: CreateRollupPropertyPropertiesResponse,
  errors: [],
}));

export interface PatchPropertiesRequest {
  /** Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Output only. Resource name of this property. Format: properties/{property_id} Example: "properties/1000" */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaProperty;
}

export const PatchPropertiesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaProperty).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesRequest>;

export type PatchPropertiesResponse = GoogleAnalyticsAdminV1alphaProperty;
export const PatchPropertiesResponse = GoogleAnalyticsAdminV1alphaProperty;

export type PatchPropertiesError = DefaultErrors;

/** Updates a property. */
export const patchProperties: API.OperationMethod<
  PatchPropertiesRequest,
  PatchPropertiesResponse,
  PatchPropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesRequest,
  output: PatchPropertiesResponse,
  errors: [],
}));

export interface AcknowledgeUserDataCollectionPropertiesRequest {
  /** Required. The property for which to acknowledge user data collection. */
  property: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaAcknowledgeUserDataCollectionRequest;
}

export const AcknowledgeUserDataCollectionPropertiesRequest = Schema.Struct({
  property: Schema.String.pipe(T.HttpPath("property")),
  body: Schema.optional(
    GoogleAnalyticsAdminV1alphaAcknowledgeUserDataCollectionRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}:acknowledgeUserDataCollection",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<AcknowledgeUserDataCollectionPropertiesRequest>;

export type AcknowledgeUserDataCollectionPropertiesResponse =
  GoogleAnalyticsAdminV1alphaAcknowledgeUserDataCollectionResponse;
export const AcknowledgeUserDataCollectionPropertiesResponse =
  GoogleAnalyticsAdminV1alphaAcknowledgeUserDataCollectionResponse;

export type AcknowledgeUserDataCollectionPropertiesError = DefaultErrors;

/** Acknowledges the terms of user data collection for the specified property. This acknowledgement must be completed (either in the Google Analytics UI or through this API) before MeasurementProtocolSecret resources may be created. */
export const acknowledgeUserDataCollectionProperties: API.OperationMethod<
  AcknowledgeUserDataCollectionPropertiesRequest,
  AcknowledgeUserDataCollectionPropertiesResponse,
  AcknowledgeUserDataCollectionPropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: AcknowledgeUserDataCollectionPropertiesRequest,
  output: AcknowledgeUserDataCollectionPropertiesResponse,
  errors: [],
}));

export interface GetReportingIdentitySettingsPropertiesRequest {
  /** Required. The name of the settings to lookup. Format: properties/{property}/reportingIdentitySettings Example: "properties/1000/reportingIdentitySettings" */
  name: string;
}

export const GetReportingIdentitySettingsPropertiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/reportingIdentitySettings",
  }),
  svc,
) as unknown as Schema.Schema<GetReportingIdentitySettingsPropertiesRequest>;

export type GetReportingIdentitySettingsPropertiesResponse =
  GoogleAnalyticsAdminV1alphaReportingIdentitySettings;
export const GetReportingIdentitySettingsPropertiesResponse =
  GoogleAnalyticsAdminV1alphaReportingIdentitySettings;

export type GetReportingIdentitySettingsPropertiesError = DefaultErrors;

/** Returns the reporting identity settings for this property. */
export const getReportingIdentitySettingsProperties: API.OperationMethod<
  GetReportingIdentitySettingsPropertiesRequest,
  GetReportingIdentitySettingsPropertiesResponse,
  GetReportingIdentitySettingsPropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetReportingIdentitySettingsPropertiesRequest,
  output: GetReportingIdentitySettingsPropertiesResponse,
  errors: [],
}));

export interface RunAccessReportPropertiesRequest {
  /** The Data Access Report supports requesting at the property level or account level. If requested at the account level, Data Access Reports include all access for all properties under that account. To request at the property level, entity should be for example 'properties/123' if "123" is your Google Analytics property ID. To request at the account level, entity should be for example 'accounts/1234' if "1234" is your Google Analytics Account ID. */
  entity: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaRunAccessReportRequest;
}

export const RunAccessReportPropertiesRequest = Schema.Struct({
  entity: Schema.String.pipe(T.HttpPath("entity")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaRunAccessReportRequest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}:runAccessReport",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RunAccessReportPropertiesRequest>;

export type RunAccessReportPropertiesResponse =
  GoogleAnalyticsAdminV1alphaRunAccessReportResponse;
export const RunAccessReportPropertiesResponse =
  GoogleAnalyticsAdminV1alphaRunAccessReportResponse;

export type RunAccessReportPropertiesError = DefaultErrors;

/** Returns a customized report of data access records. The report provides records of each time a user reads Google Analytics reporting data. Access records are retained for up to 2 years. Data Access Reports can be requested for a property. Reports may be requested for any property, but dimensions that aren't related to quota can only be requested on Google Analytics 360 properties. This method is only available to Administrators. These data access records include GA UI Reporting, GA UI Explorations, GA Data API, and other products like Firebase & Admob that can retrieve data from Google Analytics through a linkage. These records don't include property configuration changes like adding a stream or changing a property's time zone. For configuration change history, see [searchChangeHistoryEvents](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1alpha/accounts/searchChangeHistoryEvents). To give your feedback on this API, complete the [Google Analytics Access Reports feedback](https://docs.google.com/forms/d/e/1FAIpQLSdmEBUrMzAEdiEKk5TV5dEHvDUZDRlgWYdQdAeSdtR4hVjEhw/viewform) form. */
export const runAccessReportProperties: API.OperationMethod<
  RunAccessReportPropertiesRequest,
  RunAccessReportPropertiesResponse,
  RunAccessReportPropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RunAccessReportPropertiesRequest,
  output: RunAccessReportPropertiesResponse,
  errors: [],
}));

export interface UpdateDataRetentionSettingsPropertiesRequest {
  /** Output only. Resource name for this DataRetentionSetting resource. Format: properties/{property}/dataRetentionSettings */
  name: string;
  /** Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaDataRetentionSettings;
}

export const UpdateDataRetentionSettingsPropertiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaDataRetentionSettings).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/dataRetentionSettings",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateDataRetentionSettingsPropertiesRequest>;

export type UpdateDataRetentionSettingsPropertiesResponse =
  GoogleAnalyticsAdminV1alphaDataRetentionSettings;
export const UpdateDataRetentionSettingsPropertiesResponse =
  GoogleAnalyticsAdminV1alphaDataRetentionSettings;

export type UpdateDataRetentionSettingsPropertiesError = DefaultErrors;

/** Updates the singleton data retention settings for this property. */
export const updateDataRetentionSettingsProperties: API.OperationMethod<
  UpdateDataRetentionSettingsPropertiesRequest,
  UpdateDataRetentionSettingsPropertiesResponse,
  UpdateDataRetentionSettingsPropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateDataRetentionSettingsPropertiesRequest,
  output: UpdateDataRetentionSettingsPropertiesResponse,
  errors: [],
}));

export interface CreatePropertiesRequest {
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaProperty;
}

export const CreatePropertiesRequest = Schema.Struct({
  body: Schema.optional(GoogleAnalyticsAdminV1alphaProperty).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1alpha/properties", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesRequest>;

export type CreatePropertiesResponse = GoogleAnalyticsAdminV1alphaProperty;
export const CreatePropertiesResponse = GoogleAnalyticsAdminV1alphaProperty;

export type CreatePropertiesError = DefaultErrors;

/** Creates a Google Analytics property with the specified location and attributes. */
export const createProperties: API.OperationMethod<
  CreatePropertiesRequest,
  CreatePropertiesResponse,
  CreatePropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesRequest,
  output: CreatePropertiesResponse,
  errors: [],
}));

export interface ProvisionSubpropertyPropertiesRequest {
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaProvisionSubpropertyRequest;
}

export const ProvisionSubpropertyPropertiesRequest = Schema.Struct({
  body: Schema.optional(
    GoogleAnalyticsAdminV1alphaProvisionSubpropertyRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties:provisionSubproperty",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ProvisionSubpropertyPropertiesRequest>;

export type ProvisionSubpropertyPropertiesResponse =
  GoogleAnalyticsAdminV1alphaProvisionSubpropertyResponse;
export const ProvisionSubpropertyPropertiesResponse =
  GoogleAnalyticsAdminV1alphaProvisionSubpropertyResponse;

export type ProvisionSubpropertyPropertiesError = DefaultErrors;

/** Create a subproperty and a subproperty event filter that applies to the created subproperty. */
export const provisionSubpropertyProperties: API.OperationMethod<
  ProvisionSubpropertyPropertiesRequest,
  ProvisionSubpropertyPropertiesResponse,
  ProvisionSubpropertyPropertiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ProvisionSubpropertyPropertiesRequest,
  output: ProvisionSubpropertyPropertiesResponse,
  errors: [],
}));

export interface PatchPropertiesGoogleAdsLinksRequest {
  /** Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Output only. Format: properties/{propertyId}/googleAdsLinks/{googleAdsLinkId} Note: googleAdsLinkId is not the Google Ads customer ID. */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaGoogleAdsLink;
}

export const PatchPropertiesGoogleAdsLinksRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaGoogleAdsLink).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/googleAdsLinks/{googleAdsLinksId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesGoogleAdsLinksRequest>;

export type PatchPropertiesGoogleAdsLinksResponse =
  GoogleAnalyticsAdminV1alphaGoogleAdsLink;
export const PatchPropertiesGoogleAdsLinksResponse =
  GoogleAnalyticsAdminV1alphaGoogleAdsLink;

export type PatchPropertiesGoogleAdsLinksError = DefaultErrors;

/** Updates a GoogleAdsLink on a property */
export const patchPropertiesGoogleAdsLinks: API.OperationMethod<
  PatchPropertiesGoogleAdsLinksRequest,
  PatchPropertiesGoogleAdsLinksResponse,
  PatchPropertiesGoogleAdsLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesGoogleAdsLinksRequest,
  output: PatchPropertiesGoogleAdsLinksResponse,
  errors: [],
}));

export interface CreatePropertiesGoogleAdsLinksRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaGoogleAdsLink;
}

export const CreatePropertiesGoogleAdsLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaGoogleAdsLink).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/googleAdsLinks",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesGoogleAdsLinksRequest>;

export type CreatePropertiesGoogleAdsLinksResponse =
  GoogleAnalyticsAdminV1alphaGoogleAdsLink;
export const CreatePropertiesGoogleAdsLinksResponse =
  GoogleAnalyticsAdminV1alphaGoogleAdsLink;

export type CreatePropertiesGoogleAdsLinksError = DefaultErrors;

/** Creates a GoogleAdsLink. */
export const createPropertiesGoogleAdsLinks: API.OperationMethod<
  CreatePropertiesGoogleAdsLinksRequest,
  CreatePropertiesGoogleAdsLinksResponse,
  CreatePropertiesGoogleAdsLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesGoogleAdsLinksRequest,
  output: CreatePropertiesGoogleAdsLinksResponse,
  errors: [],
}));

export interface ListPropertiesGoogleAdsLinksRequest {
  /** The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200 (higher values will be coerced to the maximum). */
  pageSize?: number;
  /** Required. Example format: properties/1234 */
  parent: string;
  /** A page token, received from a previous `ListGoogleAdsLinks` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListGoogleAdsLinks` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesGoogleAdsLinksRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/googleAdsLinks",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesGoogleAdsLinksRequest>;

export type ListPropertiesGoogleAdsLinksResponse =
  GoogleAnalyticsAdminV1alphaListGoogleAdsLinksResponse;
export const ListPropertiesGoogleAdsLinksResponse =
  GoogleAnalyticsAdminV1alphaListGoogleAdsLinksResponse;

export type ListPropertiesGoogleAdsLinksError = DefaultErrors;

/** Lists GoogleAdsLinks on a property. */
export const listPropertiesGoogleAdsLinks: API.PaginatedOperationMethod<
  ListPropertiesGoogleAdsLinksRequest,
  ListPropertiesGoogleAdsLinksResponse,
  ListPropertiesGoogleAdsLinksError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesGoogleAdsLinksRequest,
  output: ListPropertiesGoogleAdsLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeletePropertiesGoogleAdsLinksRequest {
  /** Required. Example format: properties/1234/googleAdsLinks/5678 */
  name: string;
}

export const DeletePropertiesGoogleAdsLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/properties/{propertiesId}/googleAdsLinks/{googleAdsLinksId}",
  }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesGoogleAdsLinksRequest>;

export type DeletePropertiesGoogleAdsLinksResponse = GoogleProtobufEmpty;
export const DeletePropertiesGoogleAdsLinksResponse = GoogleProtobufEmpty;

export type DeletePropertiesGoogleAdsLinksError = DefaultErrors;

/** Deletes a GoogleAdsLink on a property */
export const deletePropertiesGoogleAdsLinks: API.OperationMethod<
  DeletePropertiesGoogleAdsLinksRequest,
  DeletePropertiesGoogleAdsLinksResponse,
  DeletePropertiesGoogleAdsLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesGoogleAdsLinksRequest,
  output: DeletePropertiesGoogleAdsLinksResponse,
  errors: [],
}));

export interface PatchPropertiesChannelGroupsRequest {
  /** Output only. The resource name for this Channel Group resource. Format: properties/{property}/channelGroups/{channel_group} */
  name: string;
  /** Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaChannelGroup;
}

export const PatchPropertiesChannelGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaChannelGroup).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/channelGroups/{channelGroupsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesChannelGroupsRequest>;

export type PatchPropertiesChannelGroupsResponse =
  GoogleAnalyticsAdminV1alphaChannelGroup;
export const PatchPropertiesChannelGroupsResponse =
  GoogleAnalyticsAdminV1alphaChannelGroup;

export type PatchPropertiesChannelGroupsError = DefaultErrors;

/** Updates a ChannelGroup. */
export const patchPropertiesChannelGroups: API.OperationMethod<
  PatchPropertiesChannelGroupsRequest,
  PatchPropertiesChannelGroupsResponse,
  PatchPropertiesChannelGroupsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesChannelGroupsRequest,
  output: PatchPropertiesChannelGroupsResponse,
  errors: [],
}));

export interface GetPropertiesChannelGroupsRequest {
  /** Required. The ChannelGroup to get. Example format: properties/1234/channelGroups/5678 */
  name: string;
}

export const GetPropertiesChannelGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/channelGroups/{channelGroupsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPropertiesChannelGroupsRequest>;

export type GetPropertiesChannelGroupsResponse =
  GoogleAnalyticsAdminV1alphaChannelGroup;
export const GetPropertiesChannelGroupsResponse =
  GoogleAnalyticsAdminV1alphaChannelGroup;

export type GetPropertiesChannelGroupsError = DefaultErrors;

/** Lookup for a single ChannelGroup. */
export const getPropertiesChannelGroups: API.OperationMethod<
  GetPropertiesChannelGroupsRequest,
  GetPropertiesChannelGroupsResponse,
  GetPropertiesChannelGroupsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesChannelGroupsRequest,
  output: GetPropertiesChannelGroupsResponse,
  errors: [],
}));

export interface DeletePropertiesChannelGroupsRequest {
  /** Required. The ChannelGroup to delete. Example format: properties/1234/channelGroups/5678 */
  name: string;
}

export const DeletePropertiesChannelGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/properties/{propertiesId}/channelGroups/{channelGroupsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesChannelGroupsRequest>;

export type DeletePropertiesChannelGroupsResponse = GoogleProtobufEmpty;
export const DeletePropertiesChannelGroupsResponse = GoogleProtobufEmpty;

export type DeletePropertiesChannelGroupsError = DefaultErrors;

/** Deletes a ChannelGroup on a property. */
export const deletePropertiesChannelGroups: API.OperationMethod<
  DeletePropertiesChannelGroupsRequest,
  DeletePropertiesChannelGroupsResponse,
  DeletePropertiesChannelGroupsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesChannelGroupsRequest,
  output: DeletePropertiesChannelGroupsResponse,
  errors: [],
}));

export interface ListPropertiesChannelGroupsRequest {
  /** Required. The property for which to list ChannelGroups. Example format: properties/1234 */
  parent: string;
  /** A page token, received from a previous `ListChannelGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListChannelGroups` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200 (higher values will be coerced to the maximum). */
  pageSize?: number;
}

export const ListPropertiesChannelGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/channelGroups",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesChannelGroupsRequest>;

export type ListPropertiesChannelGroupsResponse =
  GoogleAnalyticsAdminV1alphaListChannelGroupsResponse;
export const ListPropertiesChannelGroupsResponse =
  GoogleAnalyticsAdminV1alphaListChannelGroupsResponse;

export type ListPropertiesChannelGroupsError = DefaultErrors;

/** Lists ChannelGroups on a property. */
export const listPropertiesChannelGroups: API.PaginatedOperationMethod<
  ListPropertiesChannelGroupsRequest,
  ListPropertiesChannelGroupsResponse,
  ListPropertiesChannelGroupsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesChannelGroupsRequest,
  output: ListPropertiesChannelGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreatePropertiesChannelGroupsRequest {
  /** Required. The property for which to create a ChannelGroup. Example format: properties/1234 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaChannelGroup;
}

export const CreatePropertiesChannelGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaChannelGroup).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/channelGroups",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesChannelGroupsRequest>;

export type CreatePropertiesChannelGroupsResponse =
  GoogleAnalyticsAdminV1alphaChannelGroup;
export const CreatePropertiesChannelGroupsResponse =
  GoogleAnalyticsAdminV1alphaChannelGroup;

export type CreatePropertiesChannelGroupsError = DefaultErrors;

/** Creates a ChannelGroup. */
export const createPropertiesChannelGroups: API.OperationMethod<
  CreatePropertiesChannelGroupsRequest,
  CreatePropertiesChannelGroupsResponse,
  CreatePropertiesChannelGroupsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesChannelGroupsRequest,
  output: CreatePropertiesChannelGroupsResponse,
  errors: [],
}));

export interface DeletePropertiesAdSenseLinksRequest {
  /** Required. Unique identifier for the AdSense Link to be deleted. Format: properties/{propertyId}/adSenseLinks/{linkId} Example: properties/1234/adSenseLinks/5678 */
  name: string;
}

export const DeletePropertiesAdSenseLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/properties/{propertiesId}/adSenseLinks/{adSenseLinksId}",
  }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesAdSenseLinksRequest>;

export type DeletePropertiesAdSenseLinksResponse = GoogleProtobufEmpty;
export const DeletePropertiesAdSenseLinksResponse = GoogleProtobufEmpty;

export type DeletePropertiesAdSenseLinksError = DefaultErrors;

/** Deletes an AdSenseLink. */
export const deletePropertiesAdSenseLinks: API.OperationMethod<
  DeletePropertiesAdSenseLinksRequest,
  DeletePropertiesAdSenseLinksResponse,
  DeletePropertiesAdSenseLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesAdSenseLinksRequest,
  output: DeletePropertiesAdSenseLinksResponse,
  errors: [],
}));

export interface GetPropertiesAdSenseLinksRequest {
  /** Required. Unique identifier for the AdSense Link requested. Format: properties/{propertyId}/adSenseLinks/{linkId} Example: properties/1234/adSenseLinks/5678 */
  name: string;
}

export const GetPropertiesAdSenseLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/adSenseLinks/{adSenseLinksId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPropertiesAdSenseLinksRequest>;

export type GetPropertiesAdSenseLinksResponse =
  GoogleAnalyticsAdminV1alphaAdSenseLink;
export const GetPropertiesAdSenseLinksResponse =
  GoogleAnalyticsAdminV1alphaAdSenseLink;

export type GetPropertiesAdSenseLinksError = DefaultErrors;

/** Looks up a single AdSenseLink. */
export const getPropertiesAdSenseLinks: API.OperationMethod<
  GetPropertiesAdSenseLinksRequest,
  GetPropertiesAdSenseLinksResponse,
  GetPropertiesAdSenseLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesAdSenseLinksRequest,
  output: GetPropertiesAdSenseLinksResponse,
  errors: [],
}));

export interface CreatePropertiesAdSenseLinksRequest {
  /** Required. The property for which to create an AdSense Link. Format: properties/{propertyId} Example: properties/1234 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaAdSenseLink;
}

export const CreatePropertiesAdSenseLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaAdSenseLink).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/adSenseLinks",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesAdSenseLinksRequest>;

export type CreatePropertiesAdSenseLinksResponse =
  GoogleAnalyticsAdminV1alphaAdSenseLink;
export const CreatePropertiesAdSenseLinksResponse =
  GoogleAnalyticsAdminV1alphaAdSenseLink;

export type CreatePropertiesAdSenseLinksError = DefaultErrors;

/** Creates an AdSenseLink. */
export const createPropertiesAdSenseLinks: API.OperationMethod<
  CreatePropertiesAdSenseLinksRequest,
  CreatePropertiesAdSenseLinksResponse,
  CreatePropertiesAdSenseLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesAdSenseLinksRequest,
  output: CreatePropertiesAdSenseLinksResponse,
  errors: [],
}));

export interface ListPropertiesAdSenseLinksRequest {
  /** Required. Resource name of the parent property. Format: properties/{propertyId} Example: properties/1234 */
  parent: string;
  /** A page token received from a previous `ListAdSenseLinks` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAdSenseLinks` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200 (higher values will be coerced to the maximum). */
  pageSize?: number;
}

export const ListPropertiesAdSenseLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/adSenseLinks",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesAdSenseLinksRequest>;

export type ListPropertiesAdSenseLinksResponse =
  GoogleAnalyticsAdminV1alphaListAdSenseLinksResponse;
export const ListPropertiesAdSenseLinksResponse =
  GoogleAnalyticsAdminV1alphaListAdSenseLinksResponse;

export type ListPropertiesAdSenseLinksError = DefaultErrors;

/** Lists AdSenseLinks on a property. */
export const listPropertiesAdSenseLinks: API.PaginatedOperationMethod<
  ListPropertiesAdSenseLinksRequest,
  ListPropertiesAdSenseLinksResponse,
  ListPropertiesAdSenseLinksError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesAdSenseLinksRequest,
  output: ListPropertiesAdSenseLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreatePropertiesFirebaseLinksRequest {
  /** Required. Format: properties/{property_id} Example: `properties/1234` */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaFirebaseLink;
}

export const CreatePropertiesFirebaseLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaFirebaseLink).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/firebaseLinks",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesFirebaseLinksRequest>;

export type CreatePropertiesFirebaseLinksResponse =
  GoogleAnalyticsAdminV1alphaFirebaseLink;
export const CreatePropertiesFirebaseLinksResponse =
  GoogleAnalyticsAdminV1alphaFirebaseLink;

export type CreatePropertiesFirebaseLinksError = DefaultErrors;

/** Creates a FirebaseLink. Properties can have at most one FirebaseLink. */
export const createPropertiesFirebaseLinks: API.OperationMethod<
  CreatePropertiesFirebaseLinksRequest,
  CreatePropertiesFirebaseLinksResponse,
  CreatePropertiesFirebaseLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesFirebaseLinksRequest,
  output: CreatePropertiesFirebaseLinksResponse,
  errors: [],
}));

export interface ListPropertiesFirebaseLinksRequest {
  /** Required. Format: properties/{property_id} Example: `properties/1234` */
  parent: string;
  /** A page token, received from a previous `ListFirebaseLinks` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListFirebaseLinks` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of resources to return. The service may return fewer than this value, even if there are additional pages. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum) */
  pageSize?: number;
}

export const ListPropertiesFirebaseLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/firebaseLinks",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesFirebaseLinksRequest>;

export type ListPropertiesFirebaseLinksResponse =
  GoogleAnalyticsAdminV1alphaListFirebaseLinksResponse;
export const ListPropertiesFirebaseLinksResponse =
  GoogleAnalyticsAdminV1alphaListFirebaseLinksResponse;

export type ListPropertiesFirebaseLinksError = DefaultErrors;

/** Lists FirebaseLinks on a property. Properties can have at most one FirebaseLink. */
export const listPropertiesFirebaseLinks: API.PaginatedOperationMethod<
  ListPropertiesFirebaseLinksRequest,
  ListPropertiesFirebaseLinksResponse,
  ListPropertiesFirebaseLinksError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesFirebaseLinksRequest,
  output: ListPropertiesFirebaseLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeletePropertiesFirebaseLinksRequest {
  /** Required. Format: properties/{property_id}/firebaseLinks/{firebase_link_id} Example: `properties/1234/firebaseLinks/5678` */
  name: string;
}

export const DeletePropertiesFirebaseLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/properties/{propertiesId}/firebaseLinks/{firebaseLinksId}",
  }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesFirebaseLinksRequest>;

export type DeletePropertiesFirebaseLinksResponse = GoogleProtobufEmpty;
export const DeletePropertiesFirebaseLinksResponse = GoogleProtobufEmpty;

export type DeletePropertiesFirebaseLinksError = DefaultErrors;

/** Deletes a FirebaseLink on a property */
export const deletePropertiesFirebaseLinks: API.OperationMethod<
  DeletePropertiesFirebaseLinksRequest,
  DeletePropertiesFirebaseLinksResponse,
  DeletePropertiesFirebaseLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesFirebaseLinksRequest,
  output: DeletePropertiesFirebaseLinksResponse,
  errors: [],
}));

export interface GetPropertiesKeyEventsRequest {
  /** Required. The resource name of the Key Event to retrieve. Format: properties/{property}/keyEvents/{key_event} Example: "properties/123/keyEvents/456" */
  name: string;
}

export const GetPropertiesKeyEventsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/keyEvents/{keyEventsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPropertiesKeyEventsRequest>;

export type GetPropertiesKeyEventsResponse =
  GoogleAnalyticsAdminV1alphaKeyEvent;
export const GetPropertiesKeyEventsResponse =
  GoogleAnalyticsAdminV1alphaKeyEvent;

export type GetPropertiesKeyEventsError = DefaultErrors;

/** Retrieve a single Key Event. */
export const getPropertiesKeyEvents: API.OperationMethod<
  GetPropertiesKeyEventsRequest,
  GetPropertiesKeyEventsResponse,
  GetPropertiesKeyEventsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesKeyEventsRequest,
  output: GetPropertiesKeyEventsResponse,
  errors: [],
}));

export interface PatchPropertiesKeyEventsRequest {
  /** Output only. Resource name of this key event. Format: properties/{property}/keyEvents/{key_event} */
  name: string;
  /** Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaKeyEvent;
}

export const PatchPropertiesKeyEventsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaKeyEvent).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/keyEvents/{keyEventsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesKeyEventsRequest>;

export type PatchPropertiesKeyEventsResponse =
  GoogleAnalyticsAdminV1alphaKeyEvent;
export const PatchPropertiesKeyEventsResponse =
  GoogleAnalyticsAdminV1alphaKeyEvent;

export type PatchPropertiesKeyEventsError = DefaultErrors;

/** Updates a Key Event. */
export const patchPropertiesKeyEvents: API.OperationMethod<
  PatchPropertiesKeyEventsRequest,
  PatchPropertiesKeyEventsResponse,
  PatchPropertiesKeyEventsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesKeyEventsRequest,
  output: PatchPropertiesKeyEventsResponse,
  errors: [],
}));

export interface DeletePropertiesKeyEventsRequest {
  /** Required. The resource name of the Key Event to delete. Format: properties/{property}/keyEvents/{key_event} Example: "properties/123/keyEvents/456" */
  name: string;
}

export const DeletePropertiesKeyEventsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/properties/{propertiesId}/keyEvents/{keyEventsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesKeyEventsRequest>;

export type DeletePropertiesKeyEventsResponse = GoogleProtobufEmpty;
export const DeletePropertiesKeyEventsResponse = GoogleProtobufEmpty;

export type DeletePropertiesKeyEventsError = DefaultErrors;

/** Deletes a Key Event. */
export const deletePropertiesKeyEvents: API.OperationMethod<
  DeletePropertiesKeyEventsRequest,
  DeletePropertiesKeyEventsResponse,
  DeletePropertiesKeyEventsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesKeyEventsRequest,
  output: DeletePropertiesKeyEventsResponse,
  errors: [],
}));

export interface CreatePropertiesKeyEventsRequest {
  /** Required. The resource name of the parent property where this Key Event will be created. Format: properties/123 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaKeyEvent;
}

export const CreatePropertiesKeyEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaKeyEvent).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/keyEvents",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesKeyEventsRequest>;

export type CreatePropertiesKeyEventsResponse =
  GoogleAnalyticsAdminV1alphaKeyEvent;
export const CreatePropertiesKeyEventsResponse =
  GoogleAnalyticsAdminV1alphaKeyEvent;

export type CreatePropertiesKeyEventsError = DefaultErrors;

/** Creates a Key Event. */
export const createPropertiesKeyEvents: API.OperationMethod<
  CreatePropertiesKeyEventsRequest,
  CreatePropertiesKeyEventsResponse,
  CreatePropertiesKeyEventsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesKeyEventsRequest,
  output: CreatePropertiesKeyEventsResponse,
  errors: [],
}));

export interface ListPropertiesKeyEventsRequest {
  /** The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum) */
  pageSize?: number;
  /** Required. The resource name of the parent property. Example: 'properties/123' */
  parent: string;
  /** A page token, received from a previous `ListKeyEvents` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListKeyEvents` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesKeyEventsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/keyEvents",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesKeyEventsRequest>;

export type ListPropertiesKeyEventsResponse =
  GoogleAnalyticsAdminV1alphaListKeyEventsResponse;
export const ListPropertiesKeyEventsResponse =
  GoogleAnalyticsAdminV1alphaListKeyEventsResponse;

export type ListPropertiesKeyEventsError = DefaultErrors;

/** Returns a list of Key Events in the specified parent property. Returns an empty list if no Key Events are found. */
export const listPropertiesKeyEvents: API.PaginatedOperationMethod<
  ListPropertiesKeyEventsRequest,
  ListPropertiesKeyEventsResponse,
  ListPropertiesKeyEventsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesKeyEventsRequest,
  output: ListPropertiesKeyEventsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreatePropertiesConversionEventsRequest {
  /** Required. The resource name of the parent property where this conversion event will be created. Format: properties/123 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaConversionEvent;
}

export const CreatePropertiesConversionEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaConversionEvent).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/conversionEvents",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesConversionEventsRequest>;

export type CreatePropertiesConversionEventsResponse =
  GoogleAnalyticsAdminV1alphaConversionEvent;
export const CreatePropertiesConversionEventsResponse =
  GoogleAnalyticsAdminV1alphaConversionEvent;

export type CreatePropertiesConversionEventsError = DefaultErrors;

/** Deprecated: Use `CreateKeyEvent` instead. Creates a conversion event with the specified attributes. */
export const createPropertiesConversionEvents: API.OperationMethod<
  CreatePropertiesConversionEventsRequest,
  CreatePropertiesConversionEventsResponse,
  CreatePropertiesConversionEventsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesConversionEventsRequest,
  output: CreatePropertiesConversionEventsResponse,
  errors: [],
}));

export interface ListPropertiesConversionEventsRequest {
  /** Required. The resource name of the parent property. Example: 'properties/123' */
  parent: string;
  /** A page token, received from a previous `ListConversionEvents` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListConversionEvents` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum) */
  pageSize?: number;
}

export const ListPropertiesConversionEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/conversionEvents",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesConversionEventsRequest>;

export type ListPropertiesConversionEventsResponse =
  GoogleAnalyticsAdminV1alphaListConversionEventsResponse;
export const ListPropertiesConversionEventsResponse =
  GoogleAnalyticsAdminV1alphaListConversionEventsResponse;

export type ListPropertiesConversionEventsError = DefaultErrors;

/** Deprecated: Use `ListKeyEvents` instead. Returns a list of conversion events in the specified parent property. Returns an empty list if no conversion events are found. */
export const listPropertiesConversionEvents: API.PaginatedOperationMethod<
  ListPropertiesConversionEventsRequest,
  ListPropertiesConversionEventsResponse,
  ListPropertiesConversionEventsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesConversionEventsRequest,
  output: ListPropertiesConversionEventsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchPropertiesConversionEventsRequest {
  /** Output only. Resource name of this conversion event. Format: properties/{property}/conversionEvents/{conversion_event} */
  name: string;
  /** Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaConversionEvent;
}

export const PatchPropertiesConversionEventsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaConversionEvent).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/conversionEvents/{conversionEventsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesConversionEventsRequest>;

export type PatchPropertiesConversionEventsResponse =
  GoogleAnalyticsAdminV1alphaConversionEvent;
export const PatchPropertiesConversionEventsResponse =
  GoogleAnalyticsAdminV1alphaConversionEvent;

export type PatchPropertiesConversionEventsError = DefaultErrors;

/** Deprecated: Use `UpdateKeyEvent` instead. Updates a conversion event with the specified attributes. */
export const patchPropertiesConversionEvents: API.OperationMethod<
  PatchPropertiesConversionEventsRequest,
  PatchPropertiesConversionEventsResponse,
  PatchPropertiesConversionEventsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesConversionEventsRequest,
  output: PatchPropertiesConversionEventsResponse,
  errors: [],
}));

export interface GetPropertiesConversionEventsRequest {
  /** Required. The resource name of the conversion event to retrieve. Format: properties/{property}/conversionEvents/{conversion_event} Example: "properties/123/conversionEvents/456" */
  name: string;
}

export const GetPropertiesConversionEventsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/conversionEvents/{conversionEventsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPropertiesConversionEventsRequest>;

export type GetPropertiesConversionEventsResponse =
  GoogleAnalyticsAdminV1alphaConversionEvent;
export const GetPropertiesConversionEventsResponse =
  GoogleAnalyticsAdminV1alphaConversionEvent;

export type GetPropertiesConversionEventsError = DefaultErrors;

/** Deprecated: Use `GetKeyEvent` instead. Retrieve a single conversion event. */
export const getPropertiesConversionEvents: API.OperationMethod<
  GetPropertiesConversionEventsRequest,
  GetPropertiesConversionEventsResponse,
  GetPropertiesConversionEventsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesConversionEventsRequest,
  output: GetPropertiesConversionEventsResponse,
  errors: [],
}));

export interface DeletePropertiesConversionEventsRequest {
  /** Required. The resource name of the conversion event to delete. Format: properties/{property}/conversionEvents/{conversion_event} Example: "properties/123/conversionEvents/456" */
  name: string;
}

export const DeletePropertiesConversionEventsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/properties/{propertiesId}/conversionEvents/{conversionEventsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesConversionEventsRequest>;

export type DeletePropertiesConversionEventsResponse = GoogleProtobufEmpty;
export const DeletePropertiesConversionEventsResponse = GoogleProtobufEmpty;

export type DeletePropertiesConversionEventsError = DefaultErrors;

/** Deprecated: Use `DeleteKeyEvent` instead. Deletes a conversion event in a property. */
export const deletePropertiesConversionEvents: API.OperationMethod<
  DeletePropertiesConversionEventsRequest,
  DeletePropertiesConversionEventsResponse,
  DeletePropertiesConversionEventsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesConversionEventsRequest,
  output: DeletePropertiesConversionEventsResponse,
  errors: [],
}));

export interface GetPropertiesDataStreamsRequest {
  /** Required. The name of the DataStream to get. Example format: properties/1234/dataStreams/5678 */
  name: string;
}

export const GetPropertiesDataStreamsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPropertiesDataStreamsRequest>;

export type GetPropertiesDataStreamsResponse =
  GoogleAnalyticsAdminV1alphaDataStream;
export const GetPropertiesDataStreamsResponse =
  GoogleAnalyticsAdminV1alphaDataStream;

export type GetPropertiesDataStreamsError = DefaultErrors;

/** Lookup for a single DataStream. */
export const getPropertiesDataStreams: API.OperationMethod<
  GetPropertiesDataStreamsRequest,
  GetPropertiesDataStreamsResponse,
  GetPropertiesDataStreamsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesDataStreamsRequest,
  output: GetPropertiesDataStreamsResponse,
  errors: [],
}));

export interface PatchPropertiesDataStreamsRequest {
  /** Output only. Resource name of this Data Stream. Format: properties/{property_id}/dataStreams/{stream_id} Example: "properties/1000/dataStreams/2000" */
  name: string;
  /** Required. The list of fields to be updated. Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaDataStream;
}

export const PatchPropertiesDataStreamsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaDataStream).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesDataStreamsRequest>;

export type PatchPropertiesDataStreamsResponse =
  GoogleAnalyticsAdminV1alphaDataStream;
export const PatchPropertiesDataStreamsResponse =
  GoogleAnalyticsAdminV1alphaDataStream;

export type PatchPropertiesDataStreamsError = DefaultErrors;

/** Updates a DataStream on a property. */
export const patchPropertiesDataStreams: API.OperationMethod<
  PatchPropertiesDataStreamsRequest,
  PatchPropertiesDataStreamsResponse,
  PatchPropertiesDataStreamsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesDataStreamsRequest,
  output: PatchPropertiesDataStreamsResponse,
  errors: [],
}));

export interface DeletePropertiesDataStreamsRequest {
  /** Required. The name of the DataStream to delete. Example format: properties/1234/dataStreams/5678 */
  name: string;
}

export const DeletePropertiesDataStreamsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesDataStreamsRequest>;

export type DeletePropertiesDataStreamsResponse = GoogleProtobufEmpty;
export const DeletePropertiesDataStreamsResponse = GoogleProtobufEmpty;

export type DeletePropertiesDataStreamsError = DefaultErrors;

/** Deletes a DataStream on a property. */
export const deletePropertiesDataStreams: API.OperationMethod<
  DeletePropertiesDataStreamsRequest,
  DeletePropertiesDataStreamsResponse,
  DeletePropertiesDataStreamsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesDataStreamsRequest,
  output: DeletePropertiesDataStreamsResponse,
  errors: [],
}));

export interface GetEnhancedMeasurementSettingsPropertiesDataStreamsRequest {
  /** Required. The name of the settings to lookup. Format: properties/{property}/dataStreams/{data_stream}/enhancedMeasurementSettings Example: "properties/1000/dataStreams/2000/enhancedMeasurementSettings" */
  name: string;
}

export const GetEnhancedMeasurementSettingsPropertiesDataStreamsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/enhancedMeasurementSettings",
    }),
    svc,
  ) as unknown as Schema.Schema<GetEnhancedMeasurementSettingsPropertiesDataStreamsRequest>;

export type GetEnhancedMeasurementSettingsPropertiesDataStreamsResponse =
  GoogleAnalyticsAdminV1alphaEnhancedMeasurementSettings;
export const GetEnhancedMeasurementSettingsPropertiesDataStreamsResponse =
  GoogleAnalyticsAdminV1alphaEnhancedMeasurementSettings;

export type GetEnhancedMeasurementSettingsPropertiesDataStreamsError =
  DefaultErrors;

/** Returns the enhanced measurement settings for this data stream. Note that the stream must enable enhanced measurement for these settings to take effect. */
export const getEnhancedMeasurementSettingsPropertiesDataStreams: API.OperationMethod<
  GetEnhancedMeasurementSettingsPropertiesDataStreamsRequest,
  GetEnhancedMeasurementSettingsPropertiesDataStreamsResponse,
  GetEnhancedMeasurementSettingsPropertiesDataStreamsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetEnhancedMeasurementSettingsPropertiesDataStreamsRequest,
  output: GetEnhancedMeasurementSettingsPropertiesDataStreamsResponse,
  errors: [],
}));

export interface ListPropertiesDataStreamsRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** A page token, received from a previous `ListDataStreams` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDataStreams` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200 (higher values will be coerced to the maximum). */
  pageSize?: number;
}

export const ListPropertiesDataStreamsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/dataStreams",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesDataStreamsRequest>;

export type ListPropertiesDataStreamsResponse =
  GoogleAnalyticsAdminV1alphaListDataStreamsResponse;
export const ListPropertiesDataStreamsResponse =
  GoogleAnalyticsAdminV1alphaListDataStreamsResponse;

export type ListPropertiesDataStreamsError = DefaultErrors;

/** Lists DataStreams on a property. */
export const listPropertiesDataStreams: API.PaginatedOperationMethod<
  ListPropertiesDataStreamsRequest,
  ListPropertiesDataStreamsResponse,
  ListPropertiesDataStreamsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesDataStreamsRequest,
  output: ListPropertiesDataStreamsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface UpdateDataRedactionSettingsPropertiesDataStreamsRequest {
  /** Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Output only. Name of this Data Redaction Settings resource. Format: properties/{property_id}/dataStreams/{data_stream}/dataRedactionSettings Example: "properties/1000/dataStreams/2000/dataRedactionSettings" */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaDataRedactionSettings;
}

export const UpdateDataRedactionSettingsPropertiesDataStreamsRequest =
  Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(
      GoogleAnalyticsAdminV1alphaDataRedactionSettings,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/dataRedactionSettings",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateDataRedactionSettingsPropertiesDataStreamsRequest>;

export type UpdateDataRedactionSettingsPropertiesDataStreamsResponse =
  GoogleAnalyticsAdminV1alphaDataRedactionSettings;
export const UpdateDataRedactionSettingsPropertiesDataStreamsResponse =
  GoogleAnalyticsAdminV1alphaDataRedactionSettings;

export type UpdateDataRedactionSettingsPropertiesDataStreamsError =
  DefaultErrors;

/** Updates a DataRedactionSettings on a property. */
export const updateDataRedactionSettingsPropertiesDataStreams: API.OperationMethod<
  UpdateDataRedactionSettingsPropertiesDataStreamsRequest,
  UpdateDataRedactionSettingsPropertiesDataStreamsResponse,
  UpdateDataRedactionSettingsPropertiesDataStreamsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateDataRedactionSettingsPropertiesDataStreamsRequest,
  output: UpdateDataRedactionSettingsPropertiesDataStreamsResponse,
  errors: [],
}));

export interface GetGlobalSiteTagPropertiesDataStreamsRequest {
  /** Required. The name of the site tag to lookup. Note that site tags are singletons and do not have unique IDs. Format: properties/{property_id}/dataStreams/{stream_id}/globalSiteTag Example: `properties/123/dataStreams/456/globalSiteTag` */
  name: string;
}

export const GetGlobalSiteTagPropertiesDataStreamsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/globalSiteTag",
  }),
  svc,
) as unknown as Schema.Schema<GetGlobalSiteTagPropertiesDataStreamsRequest>;

export type GetGlobalSiteTagPropertiesDataStreamsResponse =
  GoogleAnalyticsAdminV1alphaGlobalSiteTag;
export const GetGlobalSiteTagPropertiesDataStreamsResponse =
  GoogleAnalyticsAdminV1alphaGlobalSiteTag;

export type GetGlobalSiteTagPropertiesDataStreamsError = DefaultErrors;

/** Returns the Site Tag for the specified web stream. Site Tags are immutable singletons. */
export const getGlobalSiteTagPropertiesDataStreams: API.OperationMethod<
  GetGlobalSiteTagPropertiesDataStreamsRequest,
  GetGlobalSiteTagPropertiesDataStreamsResponse,
  GetGlobalSiteTagPropertiesDataStreamsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetGlobalSiteTagPropertiesDataStreamsRequest,
  output: GetGlobalSiteTagPropertiesDataStreamsResponse,
  errors: [],
}));

export interface GetDataRedactionSettingsPropertiesDataStreamsRequest {
  /** Required. The name of the settings to lookup. Format: properties/{property}/dataStreams/{data_stream}/dataRedactionSettings Example: "properties/1000/dataStreams/2000/dataRedactionSettings" */
  name: string;
}

export const GetDataRedactionSettingsPropertiesDataStreamsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/dataRedactionSettings",
    }),
    svc,
  ) as unknown as Schema.Schema<GetDataRedactionSettingsPropertiesDataStreamsRequest>;

export type GetDataRedactionSettingsPropertiesDataStreamsResponse =
  GoogleAnalyticsAdminV1alphaDataRedactionSettings;
export const GetDataRedactionSettingsPropertiesDataStreamsResponse =
  GoogleAnalyticsAdminV1alphaDataRedactionSettings;

export type GetDataRedactionSettingsPropertiesDataStreamsError = DefaultErrors;

/** Lookup for a single DataRedactionSettings. */
export const getDataRedactionSettingsPropertiesDataStreams: API.OperationMethod<
  GetDataRedactionSettingsPropertiesDataStreamsRequest,
  GetDataRedactionSettingsPropertiesDataStreamsResponse,
  GetDataRedactionSettingsPropertiesDataStreamsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDataRedactionSettingsPropertiesDataStreamsRequest,
  output: GetDataRedactionSettingsPropertiesDataStreamsResponse,
  errors: [],
}));

export interface CreatePropertiesDataStreamsRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaDataStream;
}

export const CreatePropertiesDataStreamsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaDataStream).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/dataStreams",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesDataStreamsRequest>;

export type CreatePropertiesDataStreamsResponse =
  GoogleAnalyticsAdminV1alphaDataStream;
export const CreatePropertiesDataStreamsResponse =
  GoogleAnalyticsAdminV1alphaDataStream;

export type CreatePropertiesDataStreamsError = DefaultErrors;

/** Creates a DataStream. */
export const createPropertiesDataStreams: API.OperationMethod<
  CreatePropertiesDataStreamsRequest,
  CreatePropertiesDataStreamsResponse,
  CreatePropertiesDataStreamsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesDataStreamsRequest,
  output: CreatePropertiesDataStreamsResponse,
  errors: [],
}));

export interface UpdateEnhancedMeasurementSettingsPropertiesDataStreamsRequest {
  /** Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Output only. Resource name of the Enhanced Measurement Settings. Format: properties/{property_id}/dataStreams/{data_stream}/enhancedMeasurementSettings Example: "properties/1000/dataStreams/2000/enhancedMeasurementSettings" */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaEnhancedMeasurementSettings;
}

export const UpdateEnhancedMeasurementSettingsPropertiesDataStreamsRequest =
  Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(
      GoogleAnalyticsAdminV1alphaEnhancedMeasurementSettings,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/enhancedMeasurementSettings",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateEnhancedMeasurementSettingsPropertiesDataStreamsRequest>;

export type UpdateEnhancedMeasurementSettingsPropertiesDataStreamsResponse =
  GoogleAnalyticsAdminV1alphaEnhancedMeasurementSettings;
export const UpdateEnhancedMeasurementSettingsPropertiesDataStreamsResponse =
  GoogleAnalyticsAdminV1alphaEnhancedMeasurementSettings;

export type UpdateEnhancedMeasurementSettingsPropertiesDataStreamsError =
  DefaultErrors;

/** Updates the enhanced measurement settings for this data stream. Note that the stream must enable enhanced measurement for these settings to take effect. */
export const updateEnhancedMeasurementSettingsPropertiesDataStreams: API.OperationMethod<
  UpdateEnhancedMeasurementSettingsPropertiesDataStreamsRequest,
  UpdateEnhancedMeasurementSettingsPropertiesDataStreamsResponse,
  UpdateEnhancedMeasurementSettingsPropertiesDataStreamsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateEnhancedMeasurementSettingsPropertiesDataStreamsRequest,
  output: UpdateEnhancedMeasurementSettingsPropertiesDataStreamsResponse,
  errors: [],
}));

export interface DeletePropertiesDataStreamsMeasurementProtocolSecretsRequest {
  /** Required. The name of the MeasurementProtocolSecret to delete. Format: properties/{property}/dataStreams/{dataStream}/measurementProtocolSecrets/{measurementProtocolSecret} */
  name: string;
}

export const DeletePropertiesDataStreamsMeasurementProtocolSecretsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/measurementProtocolSecrets/{measurementProtocolSecretsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeletePropertiesDataStreamsMeasurementProtocolSecretsRequest>;

export type DeletePropertiesDataStreamsMeasurementProtocolSecretsResponse =
  GoogleProtobufEmpty;
export const DeletePropertiesDataStreamsMeasurementProtocolSecretsResponse =
  GoogleProtobufEmpty;

export type DeletePropertiesDataStreamsMeasurementProtocolSecretsError =
  DefaultErrors;

/** Deletes target MeasurementProtocolSecret. */
export const deletePropertiesDataStreamsMeasurementProtocolSecrets: API.OperationMethod<
  DeletePropertiesDataStreamsMeasurementProtocolSecretsRequest,
  DeletePropertiesDataStreamsMeasurementProtocolSecretsResponse,
  DeletePropertiesDataStreamsMeasurementProtocolSecretsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesDataStreamsMeasurementProtocolSecretsRequest,
  output: DeletePropertiesDataStreamsMeasurementProtocolSecretsResponse,
  errors: [],
}));

export interface PatchPropertiesDataStreamsMeasurementProtocolSecretsRequest {
  /** Required. The list of fields to be updated. Omitted fields will not be updated. */
  updateMask?: string;
  /** Output only. Resource name of this secret. This secret may be a child of any type of stream. Format: properties/{property}/dataStreams/{dataStream}/measurementProtocolSecrets/{measurementProtocolSecret} */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaMeasurementProtocolSecret;
}

export const PatchPropertiesDataStreamsMeasurementProtocolSecretsRequest =
  Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(
      GoogleAnalyticsAdminV1alphaMeasurementProtocolSecret,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/measurementProtocolSecrets/{measurementProtocolSecretsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchPropertiesDataStreamsMeasurementProtocolSecretsRequest>;

export type PatchPropertiesDataStreamsMeasurementProtocolSecretsResponse =
  GoogleAnalyticsAdminV1alphaMeasurementProtocolSecret;
export const PatchPropertiesDataStreamsMeasurementProtocolSecretsResponse =
  GoogleAnalyticsAdminV1alphaMeasurementProtocolSecret;

export type PatchPropertiesDataStreamsMeasurementProtocolSecretsError =
  DefaultErrors;

/** Updates a measurement protocol secret. */
export const patchPropertiesDataStreamsMeasurementProtocolSecrets: API.OperationMethod<
  PatchPropertiesDataStreamsMeasurementProtocolSecretsRequest,
  PatchPropertiesDataStreamsMeasurementProtocolSecretsResponse,
  PatchPropertiesDataStreamsMeasurementProtocolSecretsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesDataStreamsMeasurementProtocolSecretsRequest,
  output: PatchPropertiesDataStreamsMeasurementProtocolSecretsResponse,
  errors: [],
}));

export interface GetPropertiesDataStreamsMeasurementProtocolSecretsRequest {
  /** Required. The name of the measurement protocol secret to lookup. Format: properties/{property}/dataStreams/{dataStream}/measurementProtocolSecrets/{measurementProtocolSecret} */
  name: string;
}

export const GetPropertiesDataStreamsMeasurementProtocolSecretsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/measurementProtocolSecrets/{measurementProtocolSecretsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetPropertiesDataStreamsMeasurementProtocolSecretsRequest>;

export type GetPropertiesDataStreamsMeasurementProtocolSecretsResponse =
  GoogleAnalyticsAdminV1alphaMeasurementProtocolSecret;
export const GetPropertiesDataStreamsMeasurementProtocolSecretsResponse =
  GoogleAnalyticsAdminV1alphaMeasurementProtocolSecret;

export type GetPropertiesDataStreamsMeasurementProtocolSecretsError =
  DefaultErrors;

/** Lookup for a single MeasurementProtocolSecret. */
export const getPropertiesDataStreamsMeasurementProtocolSecrets: API.OperationMethod<
  GetPropertiesDataStreamsMeasurementProtocolSecretsRequest,
  GetPropertiesDataStreamsMeasurementProtocolSecretsResponse,
  GetPropertiesDataStreamsMeasurementProtocolSecretsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesDataStreamsMeasurementProtocolSecretsRequest,
  output: GetPropertiesDataStreamsMeasurementProtocolSecretsResponse,
  errors: [],
}));

export interface ListPropertiesDataStreamsMeasurementProtocolSecretsRequest {
  /** The maximum number of resources to return. If unspecified, at most 10 resources will be returned. The maximum value is 10. Higher values will be coerced to the maximum. */
  pageSize?: number;
  /** Required. The resource name of the parent stream. Format: properties/{property}/dataStreams/{dataStream}/measurementProtocolSecrets */
  parent: string;
  /** A page token, received from a previous `ListMeasurementProtocolSecrets` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMeasurementProtocolSecrets` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesDataStreamsMeasurementProtocolSecretsRequest =
  Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/measurementProtocolSecrets",
    }),
    svc,
  ) as unknown as Schema.Schema<ListPropertiesDataStreamsMeasurementProtocolSecretsRequest>;

export type ListPropertiesDataStreamsMeasurementProtocolSecretsResponse =
  GoogleAnalyticsAdminV1alphaListMeasurementProtocolSecretsResponse;
export const ListPropertiesDataStreamsMeasurementProtocolSecretsResponse =
  GoogleAnalyticsAdminV1alphaListMeasurementProtocolSecretsResponse;

export type ListPropertiesDataStreamsMeasurementProtocolSecretsError =
  DefaultErrors;

/** Returns child MeasurementProtocolSecrets under the specified parent Property. */
export const listPropertiesDataStreamsMeasurementProtocolSecrets: API.PaginatedOperationMethod<
  ListPropertiesDataStreamsMeasurementProtocolSecretsRequest,
  ListPropertiesDataStreamsMeasurementProtocolSecretsResponse,
  ListPropertiesDataStreamsMeasurementProtocolSecretsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesDataStreamsMeasurementProtocolSecretsRequest,
  output: ListPropertiesDataStreamsMeasurementProtocolSecretsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreatePropertiesDataStreamsMeasurementProtocolSecretsRequest {
  /** Required. The parent resource where this secret will be created. Format: properties/{property}/dataStreams/{dataStream} */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaMeasurementProtocolSecret;
}

export const CreatePropertiesDataStreamsMeasurementProtocolSecretsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleAnalyticsAdminV1alphaMeasurementProtocolSecret,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/measurementProtocolSecrets",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreatePropertiesDataStreamsMeasurementProtocolSecretsRequest>;

export type CreatePropertiesDataStreamsMeasurementProtocolSecretsResponse =
  GoogleAnalyticsAdminV1alphaMeasurementProtocolSecret;
export const CreatePropertiesDataStreamsMeasurementProtocolSecretsResponse =
  GoogleAnalyticsAdminV1alphaMeasurementProtocolSecret;

export type CreatePropertiesDataStreamsMeasurementProtocolSecretsError =
  DefaultErrors;

/** Creates a measurement protocol secret. */
export const createPropertiesDataStreamsMeasurementProtocolSecrets: API.OperationMethod<
  CreatePropertiesDataStreamsMeasurementProtocolSecretsRequest,
  CreatePropertiesDataStreamsMeasurementProtocolSecretsResponse,
  CreatePropertiesDataStreamsMeasurementProtocolSecretsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesDataStreamsMeasurementProtocolSecretsRequest,
  output: CreatePropertiesDataStreamsMeasurementProtocolSecretsResponse,
  errors: [],
}));

export interface GetPropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest {
  /** Required. The resource name of SKAdNetwork conversion value schema to look up. Format: properties/{property}/dataStreams/{dataStream}/sKAdNetworkConversionValueSchema/{skadnetwork_conversion_value_schema} */
  name: string;
}

export const GetPropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/sKAdNetworkConversionValueSchema/{sKAdNetworkConversionValueSchemaId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetPropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest>;

export type GetPropertiesDataStreamsSKAdNetworkConversionValueSchemaResponse =
  GoogleAnalyticsAdminV1alphaSKAdNetworkConversionValueSchema;
export const GetPropertiesDataStreamsSKAdNetworkConversionValueSchemaResponse =
  GoogleAnalyticsAdminV1alphaSKAdNetworkConversionValueSchema;

export type GetPropertiesDataStreamsSKAdNetworkConversionValueSchemaError =
  DefaultErrors;

/** Looks up a single SKAdNetworkConversionValueSchema. */
export const getPropertiesDataStreamsSKAdNetworkConversionValueSchema: API.OperationMethod<
  GetPropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest,
  GetPropertiesDataStreamsSKAdNetworkConversionValueSchemaResponse,
  GetPropertiesDataStreamsSKAdNetworkConversionValueSchemaError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest,
  output: GetPropertiesDataStreamsSKAdNetworkConversionValueSchemaResponse,
  errors: [],
}));

export interface PatchPropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest {
  /** Required. The list of fields to be updated. Omitted fields will not be updated. */
  updateMask?: string;
  /** Output only. Resource name of the schema. This will be child of ONLY an iOS stream, and there can be at most one such child under an iOS stream. Format: properties/{property}/dataStreams/{dataStream}/sKAdNetworkConversionValueSchema */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaSKAdNetworkConversionValueSchema;
}

export const PatchPropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest =
  Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(
      GoogleAnalyticsAdminV1alphaSKAdNetworkConversionValueSchema,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/sKAdNetworkConversionValueSchema/{sKAdNetworkConversionValueSchemaId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchPropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest>;

export type PatchPropertiesDataStreamsSKAdNetworkConversionValueSchemaResponse =
  GoogleAnalyticsAdminV1alphaSKAdNetworkConversionValueSchema;
export const PatchPropertiesDataStreamsSKAdNetworkConversionValueSchemaResponse =
  GoogleAnalyticsAdminV1alphaSKAdNetworkConversionValueSchema;

export type PatchPropertiesDataStreamsSKAdNetworkConversionValueSchemaError =
  DefaultErrors;

/** Updates a SKAdNetworkConversionValueSchema. */
export const patchPropertiesDataStreamsSKAdNetworkConversionValueSchema: API.OperationMethod<
  PatchPropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest,
  PatchPropertiesDataStreamsSKAdNetworkConversionValueSchemaResponse,
  PatchPropertiesDataStreamsSKAdNetworkConversionValueSchemaError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest,
  output: PatchPropertiesDataStreamsSKAdNetworkConversionValueSchemaResponse,
  errors: [],
}));

export interface DeletePropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest {
  /** Required. The name of the SKAdNetworkConversionValueSchema to delete. Format: properties/{property}/dataStreams/{dataStream}/sKAdNetworkConversionValueSchema/{skadnetwork_conversion_value_schema} */
  name: string;
}

export const DeletePropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/sKAdNetworkConversionValueSchema/{sKAdNetworkConversionValueSchemaId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeletePropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest>;

export type DeletePropertiesDataStreamsSKAdNetworkConversionValueSchemaResponse =
  GoogleProtobufEmpty;
export const DeletePropertiesDataStreamsSKAdNetworkConversionValueSchemaResponse =
  GoogleProtobufEmpty;

export type DeletePropertiesDataStreamsSKAdNetworkConversionValueSchemaError =
  DefaultErrors;

/** Deletes target SKAdNetworkConversionValueSchema. */
export const deletePropertiesDataStreamsSKAdNetworkConversionValueSchema: API.OperationMethod<
  DeletePropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest,
  DeletePropertiesDataStreamsSKAdNetworkConversionValueSchemaResponse,
  DeletePropertiesDataStreamsSKAdNetworkConversionValueSchemaError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest,
  output: DeletePropertiesDataStreamsSKAdNetworkConversionValueSchemaResponse,
  errors: [],
}));

export interface CreatePropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest {
  /** Required. The parent resource where this schema will be created. Format: properties/{property}/dataStreams/{dataStream} */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaSKAdNetworkConversionValueSchema;
}

export const CreatePropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleAnalyticsAdminV1alphaSKAdNetworkConversionValueSchema,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/sKAdNetworkConversionValueSchema",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreatePropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest>;

export type CreatePropertiesDataStreamsSKAdNetworkConversionValueSchemaResponse =
  GoogleAnalyticsAdminV1alphaSKAdNetworkConversionValueSchema;
export const CreatePropertiesDataStreamsSKAdNetworkConversionValueSchemaResponse =
  GoogleAnalyticsAdminV1alphaSKAdNetworkConversionValueSchema;

export type CreatePropertiesDataStreamsSKAdNetworkConversionValueSchemaError =
  DefaultErrors;

/** Creates a SKAdNetworkConversionValueSchema. */
export const createPropertiesDataStreamsSKAdNetworkConversionValueSchema: API.OperationMethod<
  CreatePropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest,
  CreatePropertiesDataStreamsSKAdNetworkConversionValueSchemaResponse,
  CreatePropertiesDataStreamsSKAdNetworkConversionValueSchemaError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest,
  output: CreatePropertiesDataStreamsSKAdNetworkConversionValueSchemaResponse,
  errors: [],
}));

export interface ListPropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest {
  /** The maximum number of resources to return. The service may return fewer than this value, even if there are additional pages. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum) */
  pageSize?: number;
  /** Required. The DataStream resource to list schemas for. Format: properties/{property_id}/dataStreams/{dataStream} Example: properties/1234/dataStreams/5678 */
  parent: string;
  /** A page token, received from a previous `ListSKAdNetworkConversionValueSchemas` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSKAdNetworkConversionValueSchema` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest =
  Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/sKAdNetworkConversionValueSchema",
    }),
    svc,
  ) as unknown as Schema.Schema<ListPropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest>;

export type ListPropertiesDataStreamsSKAdNetworkConversionValueSchemaResponse =
  GoogleAnalyticsAdminV1alphaListSKAdNetworkConversionValueSchemasResponse;
export const ListPropertiesDataStreamsSKAdNetworkConversionValueSchemaResponse =
  GoogleAnalyticsAdminV1alphaListSKAdNetworkConversionValueSchemasResponse;

export type ListPropertiesDataStreamsSKAdNetworkConversionValueSchemaError =
  DefaultErrors;

/** Lists SKAdNetworkConversionValueSchema on a stream. Properties can have at most one SKAdNetworkConversionValueSchema. */
export const listPropertiesDataStreamsSKAdNetworkConversionValueSchema: API.PaginatedOperationMethod<
  ListPropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest,
  ListPropertiesDataStreamsSKAdNetworkConversionValueSchemaResponse,
  ListPropertiesDataStreamsSKAdNetworkConversionValueSchemaError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesDataStreamsSKAdNetworkConversionValueSchemaRequest,
  output: ListPropertiesDataStreamsSKAdNetworkConversionValueSchemaResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListPropertiesDataStreamsEventCreateRulesRequest {
  /** Required. Example format: properties/123/dataStreams/456 */
  parent: string;
  /** A page token, received from a previous `ListEventCreateRules` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListEventCreateRules` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200 (higher values will be coerced to the maximum). */
  pageSize?: number;
}

export const ListPropertiesDataStreamsEventCreateRulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/eventCreateRules",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesDataStreamsEventCreateRulesRequest>;

export type ListPropertiesDataStreamsEventCreateRulesResponse =
  GoogleAnalyticsAdminV1alphaListEventCreateRulesResponse;
export const ListPropertiesDataStreamsEventCreateRulesResponse =
  GoogleAnalyticsAdminV1alphaListEventCreateRulesResponse;

export type ListPropertiesDataStreamsEventCreateRulesError = DefaultErrors;

/** Lists EventCreateRules on a web data stream. */
export const listPropertiesDataStreamsEventCreateRules: API.PaginatedOperationMethod<
  ListPropertiesDataStreamsEventCreateRulesRequest,
  ListPropertiesDataStreamsEventCreateRulesResponse,
  ListPropertiesDataStreamsEventCreateRulesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesDataStreamsEventCreateRulesRequest,
  output: ListPropertiesDataStreamsEventCreateRulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreatePropertiesDataStreamsEventCreateRulesRequest {
  /** Required. Example format: properties/123/dataStreams/456 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaEventCreateRule;
}

export const CreatePropertiesDataStreamsEventCreateRulesRequest = Schema.Struct(
  {
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleAnalyticsAdminV1alphaEventCreateRule).pipe(
      T.HttpBody(),
    ),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/eventCreateRules",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesDataStreamsEventCreateRulesRequest>;

export type CreatePropertiesDataStreamsEventCreateRulesResponse =
  GoogleAnalyticsAdminV1alphaEventCreateRule;
export const CreatePropertiesDataStreamsEventCreateRulesResponse =
  GoogleAnalyticsAdminV1alphaEventCreateRule;

export type CreatePropertiesDataStreamsEventCreateRulesError = DefaultErrors;

/** Creates an EventCreateRule. */
export const createPropertiesDataStreamsEventCreateRules: API.OperationMethod<
  CreatePropertiesDataStreamsEventCreateRulesRequest,
  CreatePropertiesDataStreamsEventCreateRulesResponse,
  CreatePropertiesDataStreamsEventCreateRulesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesDataStreamsEventCreateRulesRequest,
  output: CreatePropertiesDataStreamsEventCreateRulesResponse,
  errors: [],
}));

export interface DeletePropertiesDataStreamsEventCreateRulesRequest {
  /** Required. Example format: properties/123/dataStreams/456/eventCreateRules/789 */
  name: string;
}

export const DeletePropertiesDataStreamsEventCreateRulesRequest = Schema.Struct(
  {
    name: Schema.String.pipe(T.HttpPath("name")),
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/eventCreateRules/{eventCreateRulesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesDataStreamsEventCreateRulesRequest>;

export type DeletePropertiesDataStreamsEventCreateRulesResponse =
  GoogleProtobufEmpty;
export const DeletePropertiesDataStreamsEventCreateRulesResponse =
  GoogleProtobufEmpty;

export type DeletePropertiesDataStreamsEventCreateRulesError = DefaultErrors;

/** Deletes an EventCreateRule. */
export const deletePropertiesDataStreamsEventCreateRules: API.OperationMethod<
  DeletePropertiesDataStreamsEventCreateRulesRequest,
  DeletePropertiesDataStreamsEventCreateRulesResponse,
  DeletePropertiesDataStreamsEventCreateRulesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesDataStreamsEventCreateRulesRequest,
  output: DeletePropertiesDataStreamsEventCreateRulesResponse,
  errors: [],
}));

export interface GetPropertiesDataStreamsEventCreateRulesRequest {
  /** Required. The name of the EventCreateRule to get. Example format: properties/123/dataStreams/456/eventCreateRules/789 */
  name: string;
}

export const GetPropertiesDataStreamsEventCreateRulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/eventCreateRules/{eventCreateRulesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPropertiesDataStreamsEventCreateRulesRequest>;

export type GetPropertiesDataStreamsEventCreateRulesResponse =
  GoogleAnalyticsAdminV1alphaEventCreateRule;
export const GetPropertiesDataStreamsEventCreateRulesResponse =
  GoogleAnalyticsAdminV1alphaEventCreateRule;

export type GetPropertiesDataStreamsEventCreateRulesError = DefaultErrors;

/** Lookup for a single EventCreateRule. */
export const getPropertiesDataStreamsEventCreateRules: API.OperationMethod<
  GetPropertiesDataStreamsEventCreateRulesRequest,
  GetPropertiesDataStreamsEventCreateRulesResponse,
  GetPropertiesDataStreamsEventCreateRulesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesDataStreamsEventCreateRulesRequest,
  output: GetPropertiesDataStreamsEventCreateRulesResponse,
  errors: [],
}));

export interface PatchPropertiesDataStreamsEventCreateRulesRequest {
  /** Output only. Resource name for this EventCreateRule resource. Format: properties/{property}/dataStreams/{data_stream}/eventCreateRules/{event_create_rule} */
  name: string;
  /** Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaEventCreateRule;
}

export const PatchPropertiesDataStreamsEventCreateRulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaEventCreateRule).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/eventCreateRules/{eventCreateRulesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesDataStreamsEventCreateRulesRequest>;

export type PatchPropertiesDataStreamsEventCreateRulesResponse =
  GoogleAnalyticsAdminV1alphaEventCreateRule;
export const PatchPropertiesDataStreamsEventCreateRulesResponse =
  GoogleAnalyticsAdminV1alphaEventCreateRule;

export type PatchPropertiesDataStreamsEventCreateRulesError = DefaultErrors;

/** Updates an EventCreateRule. */
export const patchPropertiesDataStreamsEventCreateRules: API.OperationMethod<
  PatchPropertiesDataStreamsEventCreateRulesRequest,
  PatchPropertiesDataStreamsEventCreateRulesResponse,
  PatchPropertiesDataStreamsEventCreateRulesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesDataStreamsEventCreateRulesRequest,
  output: PatchPropertiesDataStreamsEventCreateRulesResponse,
  errors: [],
}));

export interface ListPropertiesDataStreamsEventEditRulesRequest {
  /** Required. Example format: properties/123/dataStreams/456 */
  parent: string;
  /** Optional. A page token, received from a previous `ListEventEditRules` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListEventEditRules` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200 (higher values will be coerced to the maximum). */
  pageSize?: number;
}

export const ListPropertiesDataStreamsEventEditRulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/eventEditRules",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesDataStreamsEventEditRulesRequest>;

export type ListPropertiesDataStreamsEventEditRulesResponse =
  GoogleAnalyticsAdminV1alphaListEventEditRulesResponse;
export const ListPropertiesDataStreamsEventEditRulesResponse =
  GoogleAnalyticsAdminV1alphaListEventEditRulesResponse;

export type ListPropertiesDataStreamsEventEditRulesError = DefaultErrors;

/** Lists EventEditRules on a web data stream. */
export const listPropertiesDataStreamsEventEditRules: API.PaginatedOperationMethod<
  ListPropertiesDataStreamsEventEditRulesRequest,
  ListPropertiesDataStreamsEventEditRulesResponse,
  ListPropertiesDataStreamsEventEditRulesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesDataStreamsEventEditRulesRequest,
  output: ListPropertiesDataStreamsEventEditRulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreatePropertiesDataStreamsEventEditRulesRequest {
  /** Required. Example format: properties/123/dataStreams/456 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaEventEditRule;
}

export const CreatePropertiesDataStreamsEventEditRulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaEventEditRule).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/eventEditRules",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesDataStreamsEventEditRulesRequest>;

export type CreatePropertiesDataStreamsEventEditRulesResponse =
  GoogleAnalyticsAdminV1alphaEventEditRule;
export const CreatePropertiesDataStreamsEventEditRulesResponse =
  GoogleAnalyticsAdminV1alphaEventEditRule;

export type CreatePropertiesDataStreamsEventEditRulesError = DefaultErrors;

/** Creates an EventEditRule. */
export const createPropertiesDataStreamsEventEditRules: API.OperationMethod<
  CreatePropertiesDataStreamsEventEditRulesRequest,
  CreatePropertiesDataStreamsEventEditRulesResponse,
  CreatePropertiesDataStreamsEventEditRulesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesDataStreamsEventEditRulesRequest,
  output: CreatePropertiesDataStreamsEventEditRulesResponse,
  errors: [],
}));

export interface DeletePropertiesDataStreamsEventEditRulesRequest {
  /** Required. Example format: properties/123/dataStreams/456/eventEditRules/789 */
  name: string;
}

export const DeletePropertiesDataStreamsEventEditRulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/eventEditRules/{eventEditRulesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesDataStreamsEventEditRulesRequest>;

export type DeletePropertiesDataStreamsEventEditRulesResponse =
  GoogleProtobufEmpty;
export const DeletePropertiesDataStreamsEventEditRulesResponse =
  GoogleProtobufEmpty;

export type DeletePropertiesDataStreamsEventEditRulesError = DefaultErrors;

/** Deletes an EventEditRule. */
export const deletePropertiesDataStreamsEventEditRules: API.OperationMethod<
  DeletePropertiesDataStreamsEventEditRulesRequest,
  DeletePropertiesDataStreamsEventEditRulesResponse,
  DeletePropertiesDataStreamsEventEditRulesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesDataStreamsEventEditRulesRequest,
  output: DeletePropertiesDataStreamsEventEditRulesResponse,
  errors: [],
}));

export interface PatchPropertiesDataStreamsEventEditRulesRequest {
  /** Identifier. Resource name for this EventEditRule resource. Format: properties/{property}/dataStreams/{data_stream}/eventEditRules/{event_edit_rule} */
  name: string;
  /** Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaEventEditRule;
}

export const PatchPropertiesDataStreamsEventEditRulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaEventEditRule).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/eventEditRules/{eventEditRulesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesDataStreamsEventEditRulesRequest>;

export type PatchPropertiesDataStreamsEventEditRulesResponse =
  GoogleAnalyticsAdminV1alphaEventEditRule;
export const PatchPropertiesDataStreamsEventEditRulesResponse =
  GoogleAnalyticsAdminV1alphaEventEditRule;

export type PatchPropertiesDataStreamsEventEditRulesError = DefaultErrors;

/** Updates an EventEditRule. */
export const patchPropertiesDataStreamsEventEditRules: API.OperationMethod<
  PatchPropertiesDataStreamsEventEditRulesRequest,
  PatchPropertiesDataStreamsEventEditRulesResponse,
  PatchPropertiesDataStreamsEventEditRulesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesDataStreamsEventEditRulesRequest,
  output: PatchPropertiesDataStreamsEventEditRulesResponse,
  errors: [],
}));

export interface GetPropertiesDataStreamsEventEditRulesRequest {
  /** Required. The name of the EventEditRule to get. Example format: properties/123/dataStreams/456/eventEditRules/789 */
  name: string;
}

export const GetPropertiesDataStreamsEventEditRulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/eventEditRules/{eventEditRulesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPropertiesDataStreamsEventEditRulesRequest>;

export type GetPropertiesDataStreamsEventEditRulesResponse =
  GoogleAnalyticsAdminV1alphaEventEditRule;
export const GetPropertiesDataStreamsEventEditRulesResponse =
  GoogleAnalyticsAdminV1alphaEventEditRule;

export type GetPropertiesDataStreamsEventEditRulesError = DefaultErrors;

/** Lookup for a single EventEditRule. */
export const getPropertiesDataStreamsEventEditRules: API.OperationMethod<
  GetPropertiesDataStreamsEventEditRulesRequest,
  GetPropertiesDataStreamsEventEditRulesResponse,
  GetPropertiesDataStreamsEventEditRulesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesDataStreamsEventEditRulesRequest,
  output: GetPropertiesDataStreamsEventEditRulesResponse,
  errors: [],
}));

export interface ReorderPropertiesDataStreamsEventEditRulesRequest {
  /** Required. Example format: properties/123/dataStreams/456 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaReorderEventEditRulesRequest;
}

export const ReorderPropertiesDataStreamsEventEditRulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(
    GoogleAnalyticsAdminV1alphaReorderEventEditRulesRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/dataStreams/{dataStreamsId}/eventEditRules:reorder",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ReorderPropertiesDataStreamsEventEditRulesRequest>;

export type ReorderPropertiesDataStreamsEventEditRulesResponse =
  GoogleProtobufEmpty;
export const ReorderPropertiesDataStreamsEventEditRulesResponse =
  GoogleProtobufEmpty;

export type ReorderPropertiesDataStreamsEventEditRulesError = DefaultErrors;

/** Changes the processing order of event edit rules on the specified stream. */
export const reorderPropertiesDataStreamsEventEditRules: API.OperationMethod<
  ReorderPropertiesDataStreamsEventEditRulesRequest,
  ReorderPropertiesDataStreamsEventEditRulesResponse,
  ReorderPropertiesDataStreamsEventEditRulesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ReorderPropertiesDataStreamsEventEditRulesRequest,
  output: ReorderPropertiesDataStreamsEventEditRulesResponse,
  errors: [],
}));

export interface ListPropertiesDisplayVideo360AdvertiserLinkProposalsRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** A page token, received from a previous `ListDisplayVideo360AdvertiserLinkProposals` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDisplayVideo360AdvertiserLinkProposals` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200 (higher values will be coerced to the maximum). */
  pageSize?: number;
}

export const ListPropertiesDisplayVideo360AdvertiserLinkProposalsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/properties/{propertiesId}/displayVideo360AdvertiserLinkProposals",
    }),
    svc,
  ) as unknown as Schema.Schema<ListPropertiesDisplayVideo360AdvertiserLinkProposalsRequest>;

export type ListPropertiesDisplayVideo360AdvertiserLinkProposalsResponse =
  GoogleAnalyticsAdminV1alphaListDisplayVideo360AdvertiserLinkProposalsResponse;
export const ListPropertiesDisplayVideo360AdvertiserLinkProposalsResponse =
  GoogleAnalyticsAdminV1alphaListDisplayVideo360AdvertiserLinkProposalsResponse;

export type ListPropertiesDisplayVideo360AdvertiserLinkProposalsError =
  DefaultErrors;

/** Lists DisplayVideo360AdvertiserLinkProposals on a property. */
export const listPropertiesDisplayVideo360AdvertiserLinkProposals: API.PaginatedOperationMethod<
  ListPropertiesDisplayVideo360AdvertiserLinkProposalsRequest,
  ListPropertiesDisplayVideo360AdvertiserLinkProposalsResponse,
  ListPropertiesDisplayVideo360AdvertiserLinkProposalsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesDisplayVideo360AdvertiserLinkProposalsRequest,
  output: ListPropertiesDisplayVideo360AdvertiserLinkProposalsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreatePropertiesDisplayVideo360AdvertiserLinkProposalsRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLinkProposal;
}

export const CreatePropertiesDisplayVideo360AdvertiserLinkProposalsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLinkProposal,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/properties/{propertiesId}/displayVideo360AdvertiserLinkProposals",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreatePropertiesDisplayVideo360AdvertiserLinkProposalsRequest>;

export type CreatePropertiesDisplayVideo360AdvertiserLinkProposalsResponse =
  GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLinkProposal;
export const CreatePropertiesDisplayVideo360AdvertiserLinkProposalsResponse =
  GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLinkProposal;

export type CreatePropertiesDisplayVideo360AdvertiserLinkProposalsError =
  DefaultErrors;

/** Creates a DisplayVideo360AdvertiserLinkProposal. */
export const createPropertiesDisplayVideo360AdvertiserLinkProposals: API.OperationMethod<
  CreatePropertiesDisplayVideo360AdvertiserLinkProposalsRequest,
  CreatePropertiesDisplayVideo360AdvertiserLinkProposalsResponse,
  CreatePropertiesDisplayVideo360AdvertiserLinkProposalsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesDisplayVideo360AdvertiserLinkProposalsRequest,
  output: CreatePropertiesDisplayVideo360AdvertiserLinkProposalsResponse,
  errors: [],
}));

export interface ApprovePropertiesDisplayVideo360AdvertiserLinkProposalsRequest {
  /** Required. The name of the DisplayVideo360AdvertiserLinkProposal to approve. Example format: properties/1234/displayVideo360AdvertiserLinkProposals/5678 */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaApproveDisplayVideo360AdvertiserLinkProposalRequest;
}

export const ApprovePropertiesDisplayVideo360AdvertiserLinkProposalsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(
      GoogleAnalyticsAdminV1alphaApproveDisplayVideo360AdvertiserLinkProposalRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/properties/{propertiesId}/displayVideo360AdvertiserLinkProposals/{displayVideo360AdvertiserLinkProposalsId}:approve",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ApprovePropertiesDisplayVideo360AdvertiserLinkProposalsRequest>;

export type ApprovePropertiesDisplayVideo360AdvertiserLinkProposalsResponse =
  GoogleAnalyticsAdminV1alphaApproveDisplayVideo360AdvertiserLinkProposalResponse;
export const ApprovePropertiesDisplayVideo360AdvertiserLinkProposalsResponse =
  GoogleAnalyticsAdminV1alphaApproveDisplayVideo360AdvertiserLinkProposalResponse;

export type ApprovePropertiesDisplayVideo360AdvertiserLinkProposalsError =
  DefaultErrors;

/** Approves a DisplayVideo360AdvertiserLinkProposal. The DisplayVideo360AdvertiserLinkProposal will be deleted and a new DisplayVideo360AdvertiserLink will be created. */
export const approvePropertiesDisplayVideo360AdvertiserLinkProposals: API.OperationMethod<
  ApprovePropertiesDisplayVideo360AdvertiserLinkProposalsRequest,
  ApprovePropertiesDisplayVideo360AdvertiserLinkProposalsResponse,
  ApprovePropertiesDisplayVideo360AdvertiserLinkProposalsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ApprovePropertiesDisplayVideo360AdvertiserLinkProposalsRequest,
  output: ApprovePropertiesDisplayVideo360AdvertiserLinkProposalsResponse,
  errors: [],
}));

export interface DeletePropertiesDisplayVideo360AdvertiserLinkProposalsRequest {
  /** Required. The name of the DisplayVideo360AdvertiserLinkProposal to delete. Example format: properties/1234/displayVideo360AdvertiserLinkProposals/5678 */
  name: string;
}

export const DeletePropertiesDisplayVideo360AdvertiserLinkProposalsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha/properties/{propertiesId}/displayVideo360AdvertiserLinkProposals/{displayVideo360AdvertiserLinkProposalsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeletePropertiesDisplayVideo360AdvertiserLinkProposalsRequest>;

export type DeletePropertiesDisplayVideo360AdvertiserLinkProposalsResponse =
  GoogleProtobufEmpty;
export const DeletePropertiesDisplayVideo360AdvertiserLinkProposalsResponse =
  GoogleProtobufEmpty;

export type DeletePropertiesDisplayVideo360AdvertiserLinkProposalsError =
  DefaultErrors;

/** Deletes a DisplayVideo360AdvertiserLinkProposal on a property. This can only be used on cancelled proposals. */
export const deletePropertiesDisplayVideo360AdvertiserLinkProposals: API.OperationMethod<
  DeletePropertiesDisplayVideo360AdvertiserLinkProposalsRequest,
  DeletePropertiesDisplayVideo360AdvertiserLinkProposalsResponse,
  DeletePropertiesDisplayVideo360AdvertiserLinkProposalsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesDisplayVideo360AdvertiserLinkProposalsRequest,
  output: DeletePropertiesDisplayVideo360AdvertiserLinkProposalsResponse,
  errors: [],
}));

export interface CancelPropertiesDisplayVideo360AdvertiserLinkProposalsRequest {
  /** Required. The name of the DisplayVideo360AdvertiserLinkProposal to cancel. Example format: properties/1234/displayVideo360AdvertiserLinkProposals/5678 */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaCancelDisplayVideo360AdvertiserLinkProposalRequest;
}

export const CancelPropertiesDisplayVideo360AdvertiserLinkProposalsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(
      GoogleAnalyticsAdminV1alphaCancelDisplayVideo360AdvertiserLinkProposalRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/properties/{propertiesId}/displayVideo360AdvertiserLinkProposals/{displayVideo360AdvertiserLinkProposalsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelPropertiesDisplayVideo360AdvertiserLinkProposalsRequest>;

export type CancelPropertiesDisplayVideo360AdvertiserLinkProposalsResponse =
  GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLinkProposal;
export const CancelPropertiesDisplayVideo360AdvertiserLinkProposalsResponse =
  GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLinkProposal;

export type CancelPropertiesDisplayVideo360AdvertiserLinkProposalsError =
  DefaultErrors;

/** Cancels a DisplayVideo360AdvertiserLinkProposal. Cancelling can mean either: - Declining a proposal initiated from Display & Video 360 - Withdrawing a proposal initiated from Google Analytics After being cancelled, a proposal will eventually be deleted automatically. */
export const cancelPropertiesDisplayVideo360AdvertiserLinkProposals: API.OperationMethod<
  CancelPropertiesDisplayVideo360AdvertiserLinkProposalsRequest,
  CancelPropertiesDisplayVideo360AdvertiserLinkProposalsResponse,
  CancelPropertiesDisplayVideo360AdvertiserLinkProposalsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CancelPropertiesDisplayVideo360AdvertiserLinkProposalsRequest,
  output: CancelPropertiesDisplayVideo360AdvertiserLinkProposalsResponse,
  errors: [],
}));

export interface GetPropertiesDisplayVideo360AdvertiserLinkProposalsRequest {
  /** Required. The name of the DisplayVideo360AdvertiserLinkProposal to get. Example format: properties/1234/displayVideo360AdvertiserLinkProposals/5678 */
  name: string;
}

export const GetPropertiesDisplayVideo360AdvertiserLinkProposalsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/properties/{propertiesId}/displayVideo360AdvertiserLinkProposals/{displayVideo360AdvertiserLinkProposalsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetPropertiesDisplayVideo360AdvertiserLinkProposalsRequest>;

export type GetPropertiesDisplayVideo360AdvertiserLinkProposalsResponse =
  GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLinkProposal;
export const GetPropertiesDisplayVideo360AdvertiserLinkProposalsResponse =
  GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLinkProposal;

export type GetPropertiesDisplayVideo360AdvertiserLinkProposalsError =
  DefaultErrors;

/** Lookup for a single DisplayVideo360AdvertiserLinkProposal. */
export const getPropertiesDisplayVideo360AdvertiserLinkProposals: API.OperationMethod<
  GetPropertiesDisplayVideo360AdvertiserLinkProposalsRequest,
  GetPropertiesDisplayVideo360AdvertiserLinkProposalsResponse,
  GetPropertiesDisplayVideo360AdvertiserLinkProposalsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesDisplayVideo360AdvertiserLinkProposalsRequest,
  output: GetPropertiesDisplayVideo360AdvertiserLinkProposalsResponse,
  errors: [],
}));

export interface ListPropertiesSearchAds360LinksRequest {
  /** The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200 (higher values will be coerced to the maximum). */
  pageSize?: number;
  /** Required. Example format: properties/1234 */
  parent: string;
  /** A page token, received from a previous `ListSearchAds360Links` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSearchAds360Links` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesSearchAds360LinksRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/searchAds360Links",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesSearchAds360LinksRequest>;

export type ListPropertiesSearchAds360LinksResponse =
  GoogleAnalyticsAdminV1alphaListSearchAds360LinksResponse;
export const ListPropertiesSearchAds360LinksResponse =
  GoogleAnalyticsAdminV1alphaListSearchAds360LinksResponse;

export type ListPropertiesSearchAds360LinksError = DefaultErrors;

/** Lists all SearchAds360Links on a property. */
export const listPropertiesSearchAds360Links: API.PaginatedOperationMethod<
  ListPropertiesSearchAds360LinksRequest,
  ListPropertiesSearchAds360LinksResponse,
  ListPropertiesSearchAds360LinksError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesSearchAds360LinksRequest,
  output: ListPropertiesSearchAds360LinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreatePropertiesSearchAds360LinksRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaSearchAds360Link;
}

export const CreatePropertiesSearchAds360LinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaSearchAds360Link).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/searchAds360Links",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesSearchAds360LinksRequest>;

export type CreatePropertiesSearchAds360LinksResponse =
  GoogleAnalyticsAdminV1alphaSearchAds360Link;
export const CreatePropertiesSearchAds360LinksResponse =
  GoogleAnalyticsAdminV1alphaSearchAds360Link;

export type CreatePropertiesSearchAds360LinksError = DefaultErrors;

/** Creates a SearchAds360Link. */
export const createPropertiesSearchAds360Links: API.OperationMethod<
  CreatePropertiesSearchAds360LinksRequest,
  CreatePropertiesSearchAds360LinksResponse,
  CreatePropertiesSearchAds360LinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesSearchAds360LinksRequest,
  output: CreatePropertiesSearchAds360LinksResponse,
  errors: [],
}));

export interface DeletePropertiesSearchAds360LinksRequest {
  /** Required. The name of the SearchAds360Link to delete. Example format: properties/1234/SearchAds360Links/5678 */
  name: string;
}

export const DeletePropertiesSearchAds360LinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/properties/{propertiesId}/searchAds360Links/{searchAds360LinksId}",
  }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesSearchAds360LinksRequest>;

export type DeletePropertiesSearchAds360LinksResponse = GoogleProtobufEmpty;
export const DeletePropertiesSearchAds360LinksResponse = GoogleProtobufEmpty;

export type DeletePropertiesSearchAds360LinksError = DefaultErrors;

/** Deletes a SearchAds360Link on a property. */
export const deletePropertiesSearchAds360Links: API.OperationMethod<
  DeletePropertiesSearchAds360LinksRequest,
  DeletePropertiesSearchAds360LinksResponse,
  DeletePropertiesSearchAds360LinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesSearchAds360LinksRequest,
  output: DeletePropertiesSearchAds360LinksResponse,
  errors: [],
}));

export interface PatchPropertiesSearchAds360LinksRequest {
  /** Required. The list of fields to be updated. Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Output only. The resource name for this SearchAds360Link resource. Format: properties/{propertyId}/searchAds360Links/{linkId} Note: linkId is not the Search Ads 360 advertiser ID */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaSearchAds360Link;
}

export const PatchPropertiesSearchAds360LinksRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaSearchAds360Link).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/searchAds360Links/{searchAds360LinksId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesSearchAds360LinksRequest>;

export type PatchPropertiesSearchAds360LinksResponse =
  GoogleAnalyticsAdminV1alphaSearchAds360Link;
export const PatchPropertiesSearchAds360LinksResponse =
  GoogleAnalyticsAdminV1alphaSearchAds360Link;

export type PatchPropertiesSearchAds360LinksError = DefaultErrors;

/** Updates a SearchAds360Link on a property. */
export const patchPropertiesSearchAds360Links: API.OperationMethod<
  PatchPropertiesSearchAds360LinksRequest,
  PatchPropertiesSearchAds360LinksResponse,
  PatchPropertiesSearchAds360LinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesSearchAds360LinksRequest,
  output: PatchPropertiesSearchAds360LinksResponse,
  errors: [],
}));

export interface GetPropertiesSearchAds360LinksRequest {
  /** Required. The name of the SearchAds360Link to get. Example format: properties/1234/SearchAds360Link/5678 */
  name: string;
}

export const GetPropertiesSearchAds360LinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/searchAds360Links/{searchAds360LinksId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPropertiesSearchAds360LinksRequest>;

export type GetPropertiesSearchAds360LinksResponse =
  GoogleAnalyticsAdminV1alphaSearchAds360Link;
export const GetPropertiesSearchAds360LinksResponse =
  GoogleAnalyticsAdminV1alphaSearchAds360Link;

export type GetPropertiesSearchAds360LinksError = DefaultErrors;

/** Look up a single SearchAds360Link */
export const getPropertiesSearchAds360Links: API.OperationMethod<
  GetPropertiesSearchAds360LinksRequest,
  GetPropertiesSearchAds360LinksResponse,
  GetPropertiesSearchAds360LinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesSearchAds360LinksRequest,
  output: GetPropertiesSearchAds360LinksResponse,
  errors: [],
}));

export interface BatchDeletePropertiesAccessBindingsRequest {
  /** Required. The account or property that owns the access bindings. The parent of all provided values for the 'names' field in DeleteAccessBindingRequest messages must match this field. Formats: - accounts/{account} - properties/{property} */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaBatchDeleteAccessBindingsRequest;
}

export const BatchDeletePropertiesAccessBindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(
    GoogleAnalyticsAdminV1alphaBatchDeleteAccessBindingsRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/accessBindings:batchDelete",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<BatchDeletePropertiesAccessBindingsRequest>;

export type BatchDeletePropertiesAccessBindingsResponse = GoogleProtobufEmpty;
export const BatchDeletePropertiesAccessBindingsResponse = GoogleProtobufEmpty;

export type BatchDeletePropertiesAccessBindingsError = DefaultErrors;

/** Deletes information about multiple users' links to an account or property. */
export const batchDeletePropertiesAccessBindings: API.OperationMethod<
  BatchDeletePropertiesAccessBindingsRequest,
  BatchDeletePropertiesAccessBindingsResponse,
  BatchDeletePropertiesAccessBindingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: BatchDeletePropertiesAccessBindingsRequest,
  output: BatchDeletePropertiesAccessBindingsResponse,
  errors: [],
}));

export interface CreatePropertiesAccessBindingsRequest {
  /** Required. Formats: - accounts/{account} - properties/{property} */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaAccessBinding;
}

export const CreatePropertiesAccessBindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaAccessBinding).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/accessBindings",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesAccessBindingsRequest>;

export type CreatePropertiesAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaAccessBinding;
export const CreatePropertiesAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaAccessBinding;

export type CreatePropertiesAccessBindingsError = DefaultErrors;

/** Creates an access binding on an account or property. */
export const createPropertiesAccessBindings: API.OperationMethod<
  CreatePropertiesAccessBindingsRequest,
  CreatePropertiesAccessBindingsResponse,
  CreatePropertiesAccessBindingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesAccessBindingsRequest,
  output: CreatePropertiesAccessBindingsResponse,
  errors: [],
}));

export interface BatchCreatePropertiesAccessBindingsRequest {
  /** Required. The account or property that owns the access bindings. The parent field in the CreateAccessBindingRequest messages must either be empty or match this field. Formats: - accounts/{account} - properties/{property} */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaBatchCreateAccessBindingsRequest;
}

export const BatchCreatePropertiesAccessBindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(
    GoogleAnalyticsAdminV1alphaBatchCreateAccessBindingsRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/accessBindings:batchCreate",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<BatchCreatePropertiesAccessBindingsRequest>;

export type BatchCreatePropertiesAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaBatchCreateAccessBindingsResponse;
export const BatchCreatePropertiesAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaBatchCreateAccessBindingsResponse;

export type BatchCreatePropertiesAccessBindingsError = DefaultErrors;

/** Creates information about multiple access bindings to an account or property. This method is transactional. If any AccessBinding cannot be created, none of the AccessBindings will be created. */
export const batchCreatePropertiesAccessBindings: API.OperationMethod<
  BatchCreatePropertiesAccessBindingsRequest,
  BatchCreatePropertiesAccessBindingsResponse,
  BatchCreatePropertiesAccessBindingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: BatchCreatePropertiesAccessBindingsRequest,
  output: BatchCreatePropertiesAccessBindingsResponse,
  errors: [],
}));

export interface PatchPropertiesAccessBindingsRequest {
  /** Output only. Resource name of this binding. Format: accounts/{account}/accessBindings/{access_binding} or properties/{property}/accessBindings/{access_binding} Example: "accounts/100/accessBindings/200" */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaAccessBinding;
}

export const PatchPropertiesAccessBindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaAccessBinding).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/accessBindings/{accessBindingsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesAccessBindingsRequest>;

export type PatchPropertiesAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaAccessBinding;
export const PatchPropertiesAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaAccessBinding;

export type PatchPropertiesAccessBindingsError = DefaultErrors;

/** Updates an access binding on an account or property. */
export const patchPropertiesAccessBindings: API.OperationMethod<
  PatchPropertiesAccessBindingsRequest,
  PatchPropertiesAccessBindingsResponse,
  PatchPropertiesAccessBindingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesAccessBindingsRequest,
  output: PatchPropertiesAccessBindingsResponse,
  errors: [],
}));

export interface GetPropertiesAccessBindingsRequest {
  /** Required. The name of the access binding to retrieve. Formats: - accounts/{account}/accessBindings/{accessBinding} - properties/{property}/accessBindings/{accessBinding} */
  name: string;
}

export const GetPropertiesAccessBindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/accessBindings/{accessBindingsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPropertiesAccessBindingsRequest>;

export type GetPropertiesAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaAccessBinding;
export const GetPropertiesAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaAccessBinding;

export type GetPropertiesAccessBindingsError = DefaultErrors;

/** Gets information about an access binding. */
export const getPropertiesAccessBindings: API.OperationMethod<
  GetPropertiesAccessBindingsRequest,
  GetPropertiesAccessBindingsResponse,
  GetPropertiesAccessBindingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesAccessBindingsRequest,
  output: GetPropertiesAccessBindingsResponse,
  errors: [],
}));

export interface DeletePropertiesAccessBindingsRequest {
  /** Required. Formats: - accounts/{account}/accessBindings/{accessBinding} - properties/{property}/accessBindings/{accessBinding} */
  name: string;
}

export const DeletePropertiesAccessBindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/properties/{propertiesId}/accessBindings/{accessBindingsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesAccessBindingsRequest>;

export type DeletePropertiesAccessBindingsResponse = GoogleProtobufEmpty;
export const DeletePropertiesAccessBindingsResponse = GoogleProtobufEmpty;

export type DeletePropertiesAccessBindingsError = DefaultErrors;

/** Deletes an access binding on an account or property. */
export const deletePropertiesAccessBindings: API.OperationMethod<
  DeletePropertiesAccessBindingsRequest,
  DeletePropertiesAccessBindingsResponse,
  DeletePropertiesAccessBindingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesAccessBindingsRequest,
  output: DeletePropertiesAccessBindingsResponse,
  errors: [],
}));

export interface BatchGetPropertiesAccessBindingsRequest {
  /** Required. The names of the access bindings to retrieve. A maximum of 1000 access bindings can be retrieved in a batch. Formats: - accounts/{account}/accessBindings/{accessBinding} - properties/{property}/accessBindings/{accessBinding} */
  names?: string[];
  /** Required. The account or property that owns the access bindings. The parent of all provided values for the 'names' field must match this field. Formats: - accounts/{account} - properties/{property} */
  parent: string;
}

export const BatchGetPropertiesAccessBindingsRequest = Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("names"),
  ),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/accessBindings:batchGet",
  }),
  svc,
) as unknown as Schema.Schema<BatchGetPropertiesAccessBindingsRequest>;

export type BatchGetPropertiesAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaBatchGetAccessBindingsResponse;
export const BatchGetPropertiesAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaBatchGetAccessBindingsResponse;

export type BatchGetPropertiesAccessBindingsError = DefaultErrors;

/** Gets information about multiple access bindings to an account or property. */
export const batchGetPropertiesAccessBindings: API.OperationMethod<
  BatchGetPropertiesAccessBindingsRequest,
  BatchGetPropertiesAccessBindingsResponse,
  BatchGetPropertiesAccessBindingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: BatchGetPropertiesAccessBindingsRequest,
  output: BatchGetPropertiesAccessBindingsResponse,
  errors: [],
}));

export interface BatchUpdatePropertiesAccessBindingsRequest {
  /** Required. The account or property that owns the access bindings. The parent of all provided AccessBinding in UpdateAccessBindingRequest messages must match this field. Formats: - accounts/{account} - properties/{property} */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaBatchUpdateAccessBindingsRequest;
}

export const BatchUpdatePropertiesAccessBindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(
    GoogleAnalyticsAdminV1alphaBatchUpdateAccessBindingsRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/accessBindings:batchUpdate",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<BatchUpdatePropertiesAccessBindingsRequest>;

export type BatchUpdatePropertiesAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaBatchUpdateAccessBindingsResponse;
export const BatchUpdatePropertiesAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaBatchUpdateAccessBindingsResponse;

export type BatchUpdatePropertiesAccessBindingsError = DefaultErrors;

/** Updates information about multiple access bindings to an account or property. */
export const batchUpdatePropertiesAccessBindings: API.OperationMethod<
  BatchUpdatePropertiesAccessBindingsRequest,
  BatchUpdatePropertiesAccessBindingsResponse,
  BatchUpdatePropertiesAccessBindingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: BatchUpdatePropertiesAccessBindingsRequest,
  output: BatchUpdatePropertiesAccessBindingsResponse,
  errors: [],
}));

export interface ListPropertiesAccessBindingsRequest {
  /** The maximum number of access bindings to return. The service may return fewer than this value. If unspecified, at most 200 access bindings will be returned. The maximum value is 500; values above 500 will be coerced to 500. */
  pageSize?: number;
  /** Required. Formats: - accounts/{account} - properties/{property} */
  parent: string;
  /** A page token, received from a previous `ListAccessBindings` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAccessBindings` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesAccessBindingsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/accessBindings",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesAccessBindingsRequest>;

export type ListPropertiesAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaListAccessBindingsResponse;
export const ListPropertiesAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaListAccessBindingsResponse;

export type ListPropertiesAccessBindingsError = DefaultErrors;

/** Lists all access bindings on an account or property. */
export const listPropertiesAccessBindings: API.PaginatedOperationMethod<
  ListPropertiesAccessBindingsRequest,
  ListPropertiesAccessBindingsResponse,
  ListPropertiesAccessBindingsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesAccessBindingsRequest,
  output: ListPropertiesAccessBindingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreatePropertiesCalculatedMetricsRequest {
  /** Required. The ID to use for the calculated metric which will become the final component of the calculated metric's resource name. This value should be 1-80 characters and valid characters are /[a-zA-Z0-9_]/, no spaces allowed. calculated_metric_id must be unique between all calculated metrics under a property. The calculated_metric_id is used when referencing this calculated metric from external APIs, for example, "calcMetric:{calculated_metric_id}". */
  calculatedMetricId?: string;
  /** Required. Format: properties/{property_id} Example: properties/1234 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaCalculatedMetric;
}

export const CreatePropertiesCalculatedMetricsRequest = Schema.Struct({
  calculatedMetricId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("calculatedMetricId"),
  ),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaCalculatedMetric).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/calculatedMetrics",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesCalculatedMetricsRequest>;

export type CreatePropertiesCalculatedMetricsResponse =
  GoogleAnalyticsAdminV1alphaCalculatedMetric;
export const CreatePropertiesCalculatedMetricsResponse =
  GoogleAnalyticsAdminV1alphaCalculatedMetric;

export type CreatePropertiesCalculatedMetricsError = DefaultErrors;

/** Creates a CalculatedMetric. */
export const createPropertiesCalculatedMetrics: API.OperationMethod<
  CreatePropertiesCalculatedMetricsRequest,
  CreatePropertiesCalculatedMetricsResponse,
  CreatePropertiesCalculatedMetricsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesCalculatedMetricsRequest,
  output: CreatePropertiesCalculatedMetricsResponse,
  errors: [],
}));

export interface ListPropertiesCalculatedMetricsRequest {
  /** Optional. The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200 (higher values will be coerced to the maximum). */
  pageSize?: number;
  /** Required. Example format: properties/1234 */
  parent: string;
  /** Optional. A page token, received from a previous `ListCalculatedMetrics` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListCalculatedMetrics` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesCalculatedMetricsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/calculatedMetrics",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesCalculatedMetricsRequest>;

export type ListPropertiesCalculatedMetricsResponse =
  GoogleAnalyticsAdminV1alphaListCalculatedMetricsResponse;
export const ListPropertiesCalculatedMetricsResponse =
  GoogleAnalyticsAdminV1alphaListCalculatedMetricsResponse;

export type ListPropertiesCalculatedMetricsError = DefaultErrors;

/** Lists CalculatedMetrics on a property. */
export const listPropertiesCalculatedMetrics: API.PaginatedOperationMethod<
  ListPropertiesCalculatedMetricsRequest,
  ListPropertiesCalculatedMetricsResponse,
  ListPropertiesCalculatedMetricsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesCalculatedMetricsRequest,
  output: ListPropertiesCalculatedMetricsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeletePropertiesCalculatedMetricsRequest {
  /** Required. The name of the CalculatedMetric to delete. Format: properties/{property_id}/calculatedMetrics/{calculated_metric_id} Example: properties/1234/calculatedMetrics/Metric01 */
  name: string;
}

export const DeletePropertiesCalculatedMetricsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/properties/{propertiesId}/calculatedMetrics/{calculatedMetricsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesCalculatedMetricsRequest>;

export type DeletePropertiesCalculatedMetricsResponse = GoogleProtobufEmpty;
export const DeletePropertiesCalculatedMetricsResponse = GoogleProtobufEmpty;

export type DeletePropertiesCalculatedMetricsError = DefaultErrors;

/** Deletes a CalculatedMetric on a property. */
export const deletePropertiesCalculatedMetrics: API.OperationMethod<
  DeletePropertiesCalculatedMetricsRequest,
  DeletePropertiesCalculatedMetricsResponse,
  DeletePropertiesCalculatedMetricsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesCalculatedMetricsRequest,
  output: DeletePropertiesCalculatedMetricsResponse,
  errors: [],
}));

export interface GetPropertiesCalculatedMetricsRequest {
  /** Required. The name of the CalculatedMetric to get. Format: properties/{property_id}/calculatedMetrics/{calculated_metric_id} Example: properties/1234/calculatedMetrics/Metric01 */
  name: string;
}

export const GetPropertiesCalculatedMetricsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/calculatedMetrics/{calculatedMetricsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPropertiesCalculatedMetricsRequest>;

export type GetPropertiesCalculatedMetricsResponse =
  GoogleAnalyticsAdminV1alphaCalculatedMetric;
export const GetPropertiesCalculatedMetricsResponse =
  GoogleAnalyticsAdminV1alphaCalculatedMetric;

export type GetPropertiesCalculatedMetricsError = DefaultErrors;

/** Lookup for a single CalculatedMetric. */
export const getPropertiesCalculatedMetrics: API.OperationMethod<
  GetPropertiesCalculatedMetricsRequest,
  GetPropertiesCalculatedMetricsResponse,
  GetPropertiesCalculatedMetricsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesCalculatedMetricsRequest,
  output: GetPropertiesCalculatedMetricsResponse,
  errors: [],
}));

export interface PatchPropertiesCalculatedMetricsRequest {
  /** Required. The list of fields to be updated. Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Output only. Resource name for this CalculatedMetric. Format: 'properties/{property_id}/calculatedMetrics/{calculated_metric_id}' */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaCalculatedMetric;
}

export const PatchPropertiesCalculatedMetricsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaCalculatedMetric).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/calculatedMetrics/{calculatedMetricsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesCalculatedMetricsRequest>;

export type PatchPropertiesCalculatedMetricsResponse =
  GoogleAnalyticsAdminV1alphaCalculatedMetric;
export const PatchPropertiesCalculatedMetricsResponse =
  GoogleAnalyticsAdminV1alphaCalculatedMetric;

export type PatchPropertiesCalculatedMetricsError = DefaultErrors;

/** Updates a CalculatedMetric on a property. */
export const patchPropertiesCalculatedMetrics: API.OperationMethod<
  PatchPropertiesCalculatedMetricsRequest,
  PatchPropertiesCalculatedMetricsResponse,
  PatchPropertiesCalculatedMetricsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesCalculatedMetricsRequest,
  output: PatchPropertiesCalculatedMetricsResponse,
  errors: [],
}));

export interface ListPropertiesAudiencesRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** A page token, received from a previous `ListAudiences` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAudiences` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200 (higher values will be coerced to the maximum). */
  pageSize?: number;
}

export const ListPropertiesAudiencesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/audiences",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesAudiencesRequest>;

export type ListPropertiesAudiencesResponse =
  GoogleAnalyticsAdminV1alphaListAudiencesResponse;
export const ListPropertiesAudiencesResponse =
  GoogleAnalyticsAdminV1alphaListAudiencesResponse;

export type ListPropertiesAudiencesError = DefaultErrors;

/** Lists Audiences on a property. Audiences created before 2020 may not be supported. Default audiences will not show filter definitions. */
export const listPropertiesAudiences: API.PaginatedOperationMethod<
  ListPropertiesAudiencesRequest,
  ListPropertiesAudiencesResponse,
  ListPropertiesAudiencesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesAudiencesRequest,
  output: ListPropertiesAudiencesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreatePropertiesAudiencesRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaAudience;
}

export const CreatePropertiesAudiencesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaAudience).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/audiences",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesAudiencesRequest>;

export type CreatePropertiesAudiencesResponse =
  GoogleAnalyticsAdminV1alphaAudience;
export const CreatePropertiesAudiencesResponse =
  GoogleAnalyticsAdminV1alphaAudience;

export type CreatePropertiesAudiencesError = DefaultErrors;

/** Creates an Audience. */
export const createPropertiesAudiences: API.OperationMethod<
  CreatePropertiesAudiencesRequest,
  CreatePropertiesAudiencesResponse,
  CreatePropertiesAudiencesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesAudiencesRequest,
  output: CreatePropertiesAudiencesResponse,
  errors: [],
}));

export interface GetPropertiesAudiencesRequest {
  /** Required. The name of the Audience to get. Example format: properties/1234/audiences/5678 */
  name: string;
}

export const GetPropertiesAudiencesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/audiences/{audiencesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPropertiesAudiencesRequest>;

export type GetPropertiesAudiencesResponse =
  GoogleAnalyticsAdminV1alphaAudience;
export const GetPropertiesAudiencesResponse =
  GoogleAnalyticsAdminV1alphaAudience;

export type GetPropertiesAudiencesError = DefaultErrors;

/** Lookup for a single Audience. Audiences created before 2020 may not be supported. Default audiences will not show filter definitions. */
export const getPropertiesAudiences: API.OperationMethod<
  GetPropertiesAudiencesRequest,
  GetPropertiesAudiencesResponse,
  GetPropertiesAudiencesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesAudiencesRequest,
  output: GetPropertiesAudiencesResponse,
  errors: [],
}));

export interface ArchivePropertiesAudiencesRequest {
  /** Required. Example format: properties/1234/audiences/5678 */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaArchiveAudienceRequest;
}

export const ArchivePropertiesAudiencesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaArchiveAudienceRequest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/audiences/{audiencesId}:archive",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ArchivePropertiesAudiencesRequest>;

export type ArchivePropertiesAudiencesResponse = GoogleProtobufEmpty;
export const ArchivePropertiesAudiencesResponse = GoogleProtobufEmpty;

export type ArchivePropertiesAudiencesError = DefaultErrors;

/** Archives an Audience on a property. */
export const archivePropertiesAudiences: API.OperationMethod<
  ArchivePropertiesAudiencesRequest,
  ArchivePropertiesAudiencesResponse,
  ArchivePropertiesAudiencesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ArchivePropertiesAudiencesRequest,
  output: ArchivePropertiesAudiencesResponse,
  errors: [],
}));

export interface PatchPropertiesAudiencesRequest {
  /** Output only. The resource name for this Audience resource. Format: properties/{propertyId}/audiences/{audienceId} */
  name: string;
  /** Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaAudience;
}

export const PatchPropertiesAudiencesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaAudience).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/audiences/{audiencesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesAudiencesRequest>;

export type PatchPropertiesAudiencesResponse =
  GoogleAnalyticsAdminV1alphaAudience;
export const PatchPropertiesAudiencesResponse =
  GoogleAnalyticsAdminV1alphaAudience;

export type PatchPropertiesAudiencesError = DefaultErrors;

/** Updates an Audience on a property. */
export const patchPropertiesAudiences: API.OperationMethod<
  PatchPropertiesAudiencesRequest,
  PatchPropertiesAudiencesResponse,
  PatchPropertiesAudiencesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesAudiencesRequest,
  output: PatchPropertiesAudiencesResponse,
  errors: [],
}));

export interface CreatePropertiesCustomMetricsRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaCustomMetric;
}

export const CreatePropertiesCustomMetricsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaCustomMetric).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/customMetrics",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesCustomMetricsRequest>;

export type CreatePropertiesCustomMetricsResponse =
  GoogleAnalyticsAdminV1alphaCustomMetric;
export const CreatePropertiesCustomMetricsResponse =
  GoogleAnalyticsAdminV1alphaCustomMetric;

export type CreatePropertiesCustomMetricsError = DefaultErrors;

/** Creates a CustomMetric. */
export const createPropertiesCustomMetrics: API.OperationMethod<
  CreatePropertiesCustomMetricsRequest,
  CreatePropertiesCustomMetricsResponse,
  CreatePropertiesCustomMetricsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesCustomMetricsRequest,
  output: CreatePropertiesCustomMetricsResponse,
  errors: [],
}));

export interface ListPropertiesCustomMetricsRequest {
  /** The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200 (higher values will be coerced to the maximum). */
  pageSize?: number;
  /** Required. Example format: properties/1234 */
  parent: string;
  /** A page token, received from a previous `ListCustomMetrics` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListCustomMetrics` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesCustomMetricsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/customMetrics",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesCustomMetricsRequest>;

export type ListPropertiesCustomMetricsResponse =
  GoogleAnalyticsAdminV1alphaListCustomMetricsResponse;
export const ListPropertiesCustomMetricsResponse =
  GoogleAnalyticsAdminV1alphaListCustomMetricsResponse;

export type ListPropertiesCustomMetricsError = DefaultErrors;

/** Lists CustomMetrics on a property. */
export const listPropertiesCustomMetrics: API.PaginatedOperationMethod<
  ListPropertiesCustomMetricsRequest,
  ListPropertiesCustomMetricsResponse,
  ListPropertiesCustomMetricsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesCustomMetricsRequest,
  output: ListPropertiesCustomMetricsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ArchivePropertiesCustomMetricsRequest {
  /** Required. The name of the CustomMetric to archive. Example format: properties/1234/customMetrics/5678 */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaArchiveCustomMetricRequest;
}

export const ArchivePropertiesCustomMetricsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(
    GoogleAnalyticsAdminV1alphaArchiveCustomMetricRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/customMetrics/{customMetricsId}:archive",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ArchivePropertiesCustomMetricsRequest>;

export type ArchivePropertiesCustomMetricsResponse = GoogleProtobufEmpty;
export const ArchivePropertiesCustomMetricsResponse = GoogleProtobufEmpty;

export type ArchivePropertiesCustomMetricsError = DefaultErrors;

/** Archives a CustomMetric on a property. */
export const archivePropertiesCustomMetrics: API.OperationMethod<
  ArchivePropertiesCustomMetricsRequest,
  ArchivePropertiesCustomMetricsResponse,
  ArchivePropertiesCustomMetricsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ArchivePropertiesCustomMetricsRequest,
  output: ArchivePropertiesCustomMetricsResponse,
  errors: [],
}));

export interface GetPropertiesCustomMetricsRequest {
  /** Required. The name of the CustomMetric to get. Example format: properties/1234/customMetrics/5678 */
  name: string;
}

export const GetPropertiesCustomMetricsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/customMetrics/{customMetricsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPropertiesCustomMetricsRequest>;

export type GetPropertiesCustomMetricsResponse =
  GoogleAnalyticsAdminV1alphaCustomMetric;
export const GetPropertiesCustomMetricsResponse =
  GoogleAnalyticsAdminV1alphaCustomMetric;

export type GetPropertiesCustomMetricsError = DefaultErrors;

/** Lookup for a single CustomMetric. */
export const getPropertiesCustomMetrics: API.OperationMethod<
  GetPropertiesCustomMetricsRequest,
  GetPropertiesCustomMetricsResponse,
  GetPropertiesCustomMetricsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesCustomMetricsRequest,
  output: GetPropertiesCustomMetricsResponse,
  errors: [],
}));

export interface PatchPropertiesCustomMetricsRequest {
  /** Required. The list of fields to be updated. Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Output only. Resource name for this CustomMetric resource. Format: properties/{property}/customMetrics/{customMetric} */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaCustomMetric;
}

export const PatchPropertiesCustomMetricsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaCustomMetric).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/customMetrics/{customMetricsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesCustomMetricsRequest>;

export type PatchPropertiesCustomMetricsResponse =
  GoogleAnalyticsAdminV1alphaCustomMetric;
export const PatchPropertiesCustomMetricsResponse =
  GoogleAnalyticsAdminV1alphaCustomMetric;

export type PatchPropertiesCustomMetricsError = DefaultErrors;

/** Updates a CustomMetric on a property. */
export const patchPropertiesCustomMetrics: API.OperationMethod<
  PatchPropertiesCustomMetricsRequest,
  PatchPropertiesCustomMetricsResponse,
  PatchPropertiesCustomMetricsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesCustomMetricsRequest,
  output: PatchPropertiesCustomMetricsResponse,
  errors: [],
}));

export interface DeletePropertiesSubpropertyEventFiltersRequest {
  /** Required. Resource name of the subproperty event filter to delete. Format: properties/property_id/subpropertyEventFilters/subproperty_event_filter Example: properties/123/subpropertyEventFilters/456 */
  name: string;
}

export const DeletePropertiesSubpropertyEventFiltersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/properties/{propertiesId}/subpropertyEventFilters/{subpropertyEventFiltersId}",
  }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesSubpropertyEventFiltersRequest>;

export type DeletePropertiesSubpropertyEventFiltersResponse =
  GoogleProtobufEmpty;
export const DeletePropertiesSubpropertyEventFiltersResponse =
  GoogleProtobufEmpty;

export type DeletePropertiesSubpropertyEventFiltersError = DefaultErrors;

/** Deletes a subproperty event filter. */
export const deletePropertiesSubpropertyEventFilters: API.OperationMethod<
  DeletePropertiesSubpropertyEventFiltersRequest,
  DeletePropertiesSubpropertyEventFiltersResponse,
  DeletePropertiesSubpropertyEventFiltersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesSubpropertyEventFiltersRequest,
  output: DeletePropertiesSubpropertyEventFiltersResponse,
  errors: [],
}));

export interface PatchPropertiesSubpropertyEventFiltersRequest {
  /** Output only. Format: properties/{ordinary_property_id}/subpropertyEventFilters/{sub_property_event_filter} Example: properties/1234/subpropertyEventFilters/5678 */
  name: string;
  /** Required. The list of fields to update. Field names must be in snake case (for example, "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaSubpropertyEventFilter;
}

export const PatchPropertiesSubpropertyEventFiltersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaSubpropertyEventFilter).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/subpropertyEventFilters/{subpropertyEventFiltersId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesSubpropertyEventFiltersRequest>;

export type PatchPropertiesSubpropertyEventFiltersResponse =
  GoogleAnalyticsAdminV1alphaSubpropertyEventFilter;
export const PatchPropertiesSubpropertyEventFiltersResponse =
  GoogleAnalyticsAdminV1alphaSubpropertyEventFilter;

export type PatchPropertiesSubpropertyEventFiltersError = DefaultErrors;

/** Updates a subproperty Event Filter. */
export const patchPropertiesSubpropertyEventFilters: API.OperationMethod<
  PatchPropertiesSubpropertyEventFiltersRequest,
  PatchPropertiesSubpropertyEventFiltersResponse,
  PatchPropertiesSubpropertyEventFiltersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesSubpropertyEventFiltersRequest,
  output: PatchPropertiesSubpropertyEventFiltersResponse,
  errors: [],
}));

export interface GetPropertiesSubpropertyEventFiltersRequest {
  /** Required. Resource name of the subproperty event filter to lookup. Format: properties/property_id/subpropertyEventFilters/subproperty_event_filter Example: properties/123/subpropertyEventFilters/456 */
  name: string;
}

export const GetPropertiesSubpropertyEventFiltersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/subpropertyEventFilters/{subpropertyEventFiltersId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPropertiesSubpropertyEventFiltersRequest>;

export type GetPropertiesSubpropertyEventFiltersResponse =
  GoogleAnalyticsAdminV1alphaSubpropertyEventFilter;
export const GetPropertiesSubpropertyEventFiltersResponse =
  GoogleAnalyticsAdminV1alphaSubpropertyEventFilter;

export type GetPropertiesSubpropertyEventFiltersError = DefaultErrors;

/** Lookup for a single subproperty Event Filter. */
export const getPropertiesSubpropertyEventFilters: API.OperationMethod<
  GetPropertiesSubpropertyEventFiltersRequest,
  GetPropertiesSubpropertyEventFiltersResponse,
  GetPropertiesSubpropertyEventFiltersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesSubpropertyEventFiltersRequest,
  output: GetPropertiesSubpropertyEventFiltersResponse,
  errors: [],
}));

export interface CreatePropertiesSubpropertyEventFiltersRequest {
  /** Required. The ordinary property for which to create a subproperty event filter. Format: properties/property_id Example: properties/123 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaSubpropertyEventFilter;
}

export const CreatePropertiesSubpropertyEventFiltersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaSubpropertyEventFilter).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/subpropertyEventFilters",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesSubpropertyEventFiltersRequest>;

export type CreatePropertiesSubpropertyEventFiltersResponse =
  GoogleAnalyticsAdminV1alphaSubpropertyEventFilter;
export const CreatePropertiesSubpropertyEventFiltersResponse =
  GoogleAnalyticsAdminV1alphaSubpropertyEventFilter;

export type CreatePropertiesSubpropertyEventFiltersError = DefaultErrors;

/** Creates a subproperty Event Filter. */
export const createPropertiesSubpropertyEventFilters: API.OperationMethod<
  CreatePropertiesSubpropertyEventFiltersRequest,
  CreatePropertiesSubpropertyEventFiltersResponse,
  CreatePropertiesSubpropertyEventFiltersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesSubpropertyEventFiltersRequest,
  output: CreatePropertiesSubpropertyEventFiltersResponse,
  errors: [],
}));

export interface ListPropertiesSubpropertyEventFiltersRequest {
  /** Required. Resource name of the ordinary property. Format: properties/property_id Example: properties/123 */
  parent: string;
  /** Optional. A page token, received from a previous `ListSubpropertyEventFilters` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSubpropertyEventFilters` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The maximum number of resources to return. The service may return fewer than this value, even if there are additional pages. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum) */
  pageSize?: number;
}

export const ListPropertiesSubpropertyEventFiltersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/subpropertyEventFilters",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesSubpropertyEventFiltersRequest>;

export type ListPropertiesSubpropertyEventFiltersResponse =
  GoogleAnalyticsAdminV1alphaListSubpropertyEventFiltersResponse;
export const ListPropertiesSubpropertyEventFiltersResponse =
  GoogleAnalyticsAdminV1alphaListSubpropertyEventFiltersResponse;

export type ListPropertiesSubpropertyEventFiltersError = DefaultErrors;

/** List all subproperty Event Filters on a property. */
export const listPropertiesSubpropertyEventFilters: API.PaginatedOperationMethod<
  ListPropertiesSubpropertyEventFiltersRequest,
  ListPropertiesSubpropertyEventFiltersResponse,
  ListPropertiesSubpropertyEventFiltersError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesSubpropertyEventFiltersRequest,
  output: ListPropertiesSubpropertyEventFiltersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreatePropertiesReportingDataAnnotationsRequest {
  /** Required. The property for which to create a Reporting Data Annotation. Format: properties/property_id Example: properties/123 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaReportingDataAnnotation;
}

export const CreatePropertiesReportingDataAnnotationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(
    GoogleAnalyticsAdminV1alphaReportingDataAnnotation,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/reportingDataAnnotations",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesReportingDataAnnotationsRequest>;

export type CreatePropertiesReportingDataAnnotationsResponse =
  GoogleAnalyticsAdminV1alphaReportingDataAnnotation;
export const CreatePropertiesReportingDataAnnotationsResponse =
  GoogleAnalyticsAdminV1alphaReportingDataAnnotation;

export type CreatePropertiesReportingDataAnnotationsError = DefaultErrors;

/** Creates a Reporting Data Annotation. */
export const createPropertiesReportingDataAnnotations: API.OperationMethod<
  CreatePropertiesReportingDataAnnotationsRequest,
  CreatePropertiesReportingDataAnnotationsResponse,
  CreatePropertiesReportingDataAnnotationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesReportingDataAnnotationsRequest,
  output: CreatePropertiesReportingDataAnnotationsResponse,
  errors: [],
}));

export interface ListPropertiesReportingDataAnnotationsRequest {
  /** Optional. The maximum number of resources to return. The service may return fewer than this value, even if there are additional pages. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum) */
  pageSize?: number;
  /** Required. Resource name of the property. Format: properties/property_id Example: properties/123 */
  parent: string;
  /** Optional. Filter that restricts which reporting data annotations under the parent property are listed. Supported fields are: * 'name' * `title` * `description` * `annotation_date` * `annotation_date_range` * `color` Additionally, this API provides the following helper functions: * annotation_duration() : the duration that this annotation marks, [durations](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/duration.proto). expect a numeric representation of seconds followed by an `s` suffix. * is_annotation_in_range(start_date, end_date) : if the annotation is in the range specified by the `start_date` and `end_date`. The dates are in ISO-8601 format, for example `2031-06-28`. Supported operations: * `=` : equals * `!=` : not equals * `<` : less than * `>` : greater than * `<=` : less than or equals * `>=` : greater than or equals * `:` : has operator * `=~` : [regular expression](https://github.com/google/re2/wiki/Syntax) match * `!~` : [regular expression](https://github.com/google/re2/wiki/Syntax) does not match * `NOT` : Logical not * `AND` : Logical and * `OR` : Logical or Examples: 1. `title="Holiday Sale"` 2. `description=~"[Bb]ig [Gg]ame.*[Ss]ale"` 3. `is_annotation_in_range("2025-12-25", "2026-01-16") = true` 4. `annotation_duration() >= 172800s AND title:BOGO` */
  filter?: string;
  /** Optional. A page token, received from a previous `ListReportingDataAnnotations` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListReportingDataAnnotations` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesReportingDataAnnotationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/reportingDataAnnotations",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesReportingDataAnnotationsRequest>;

export type ListPropertiesReportingDataAnnotationsResponse =
  GoogleAnalyticsAdminV1alphaListReportingDataAnnotationsResponse;
export const ListPropertiesReportingDataAnnotationsResponse =
  GoogleAnalyticsAdminV1alphaListReportingDataAnnotationsResponse;

export type ListPropertiesReportingDataAnnotationsError = DefaultErrors;

/** List all Reporting Data Annotations on a property. */
export const listPropertiesReportingDataAnnotations: API.PaginatedOperationMethod<
  ListPropertiesReportingDataAnnotationsRequest,
  ListPropertiesReportingDataAnnotationsResponse,
  ListPropertiesReportingDataAnnotationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesReportingDataAnnotationsRequest,
  output: ListPropertiesReportingDataAnnotationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchPropertiesReportingDataAnnotationsRequest {
  /** Optional. The list of fields to update. Field names must be in snake case (for example, "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Required. Identifier. Resource name of this Reporting Data Annotation. Format: 'properties/{property_id}/reportingDataAnnotations/{reporting_data_annotation}' Format: 'properties/123/reportingDataAnnotations/456' */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaReportingDataAnnotation;
}

export const PatchPropertiesReportingDataAnnotationsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(
    GoogleAnalyticsAdminV1alphaReportingDataAnnotation,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/reportingDataAnnotations/{reportingDataAnnotationsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesReportingDataAnnotationsRequest>;

export type PatchPropertiesReportingDataAnnotationsResponse =
  GoogleAnalyticsAdminV1alphaReportingDataAnnotation;
export const PatchPropertiesReportingDataAnnotationsResponse =
  GoogleAnalyticsAdminV1alphaReportingDataAnnotation;

export type PatchPropertiesReportingDataAnnotationsError = DefaultErrors;

/** Updates a Reporting Data Annotation. */
export const patchPropertiesReportingDataAnnotations: API.OperationMethod<
  PatchPropertiesReportingDataAnnotationsRequest,
  PatchPropertiesReportingDataAnnotationsResponse,
  PatchPropertiesReportingDataAnnotationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesReportingDataAnnotationsRequest,
  output: PatchPropertiesReportingDataAnnotationsResponse,
  errors: [],
}));

export interface GetPropertiesReportingDataAnnotationsRequest {
  /** Required. Resource name of the Reporting Data Annotation to lookup. Format: properties/property_id/reportingDataAnnotations/reportingDataAnnotation Example: properties/123/reportingDataAnnotations/456 */
  name: string;
}

export const GetPropertiesReportingDataAnnotationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/reportingDataAnnotations/{reportingDataAnnotationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPropertiesReportingDataAnnotationsRequest>;

export type GetPropertiesReportingDataAnnotationsResponse =
  GoogleAnalyticsAdminV1alphaReportingDataAnnotation;
export const GetPropertiesReportingDataAnnotationsResponse =
  GoogleAnalyticsAdminV1alphaReportingDataAnnotation;

export type GetPropertiesReportingDataAnnotationsError = DefaultErrors;

/** Lookup a single Reporting Data Annotation. */
export const getPropertiesReportingDataAnnotations: API.OperationMethod<
  GetPropertiesReportingDataAnnotationsRequest,
  GetPropertiesReportingDataAnnotationsResponse,
  GetPropertiesReportingDataAnnotationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesReportingDataAnnotationsRequest,
  output: GetPropertiesReportingDataAnnotationsResponse,
  errors: [],
}));

export interface DeletePropertiesReportingDataAnnotationsRequest {
  /** Required. Resource name of the Reporting Data Annotation to delete. Format: properties/property_id/reportingDataAnnotations/reporting_data_annotation Example: properties/123/reportingDataAnnotations/456 */
  name: string;
}

export const DeletePropertiesReportingDataAnnotationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/properties/{propertiesId}/reportingDataAnnotations/{reportingDataAnnotationsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesReportingDataAnnotationsRequest>;

export type DeletePropertiesReportingDataAnnotationsResponse =
  GoogleProtobufEmpty;
export const DeletePropertiesReportingDataAnnotationsResponse =
  GoogleProtobufEmpty;

export type DeletePropertiesReportingDataAnnotationsError = DefaultErrors;

/** Deletes a Reporting Data Annotation. */
export const deletePropertiesReportingDataAnnotations: API.OperationMethod<
  DeletePropertiesReportingDataAnnotationsRequest,
  DeletePropertiesReportingDataAnnotationsResponse,
  DeletePropertiesReportingDataAnnotationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesReportingDataAnnotationsRequest,
  output: DeletePropertiesReportingDataAnnotationsResponse,
  errors: [],
}));

export interface PatchPropertiesSubpropertySyncConfigsRequest {
  /** Optional. The list of fields to update. Field names must be in snake case (for example, "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Output only. Identifier. Format: properties/{ordinary_property_id}/subpropertySyncConfigs/{subproperty_id} Example: properties/1234/subpropertySyncConfigs/5678 */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaSubpropertySyncConfig;
}

export const PatchPropertiesSubpropertySyncConfigsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaSubpropertySyncConfig).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/subpropertySyncConfigs/{subpropertySyncConfigsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesSubpropertySyncConfigsRequest>;

export type PatchPropertiesSubpropertySyncConfigsResponse =
  GoogleAnalyticsAdminV1alphaSubpropertySyncConfig;
export const PatchPropertiesSubpropertySyncConfigsResponse =
  GoogleAnalyticsAdminV1alphaSubpropertySyncConfig;

export type PatchPropertiesSubpropertySyncConfigsError = DefaultErrors;

/** Updates a `SubpropertySyncConfig`. */
export const patchPropertiesSubpropertySyncConfigs: API.OperationMethod<
  PatchPropertiesSubpropertySyncConfigsRequest,
  PatchPropertiesSubpropertySyncConfigsResponse,
  PatchPropertiesSubpropertySyncConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesSubpropertySyncConfigsRequest,
  output: PatchPropertiesSubpropertySyncConfigsResponse,
  errors: [],
}));

export interface ListPropertiesSubpropertySyncConfigsRequest {
  /** Optional. The maximum number of resources to return. The service may return fewer than this value, even if there are additional pages. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum) */
  pageSize?: number;
  /** Required. Resource name of the property. Format: properties/property_id Example: properties/123 */
  parent: string;
  /** Optional. A page token, received from a previous `ListSubpropertySyncConfig` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSubpropertySyncConfig` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesSubpropertySyncConfigsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/subpropertySyncConfigs",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesSubpropertySyncConfigsRequest>;

export type ListPropertiesSubpropertySyncConfigsResponse =
  GoogleAnalyticsAdminV1alphaListSubpropertySyncConfigsResponse;
export const ListPropertiesSubpropertySyncConfigsResponse =
  GoogleAnalyticsAdminV1alphaListSubpropertySyncConfigsResponse;

export type ListPropertiesSubpropertySyncConfigsError = DefaultErrors;

/** List all `SubpropertySyncConfig` resources for a property. */
export const listPropertiesSubpropertySyncConfigs: API.PaginatedOperationMethod<
  ListPropertiesSubpropertySyncConfigsRequest,
  ListPropertiesSubpropertySyncConfigsResponse,
  ListPropertiesSubpropertySyncConfigsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesSubpropertySyncConfigsRequest,
  output: ListPropertiesSubpropertySyncConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetPropertiesSubpropertySyncConfigsRequest {
  /** Required. Resource name of the SubpropertySyncConfig to lookup. Format: properties/{ordinary_property_id}/subpropertySyncConfigs/{subproperty_id} Example: properties/1234/subpropertySyncConfigs/5678 */
  name: string;
}

export const GetPropertiesSubpropertySyncConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/subpropertySyncConfigs/{subpropertySyncConfigsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPropertiesSubpropertySyncConfigsRequest>;

export type GetPropertiesSubpropertySyncConfigsResponse =
  GoogleAnalyticsAdminV1alphaSubpropertySyncConfig;
export const GetPropertiesSubpropertySyncConfigsResponse =
  GoogleAnalyticsAdminV1alphaSubpropertySyncConfig;

export type GetPropertiesSubpropertySyncConfigsError = DefaultErrors;

/** Lookup for a single `SubpropertySyncConfig`. */
export const getPropertiesSubpropertySyncConfigs: API.OperationMethod<
  GetPropertiesSubpropertySyncConfigsRequest,
  GetPropertiesSubpropertySyncConfigsResponse,
  GetPropertiesSubpropertySyncConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesSubpropertySyncConfigsRequest,
  output: GetPropertiesSubpropertySyncConfigsResponse,
  errors: [],
}));

export interface ListPropertiesExpandedDataSetsRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** A page token, received from a previous `ListExpandedDataSets` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListExpandedDataSet` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200 (higher values will be coerced to the maximum). */
  pageSize?: number;
}

export const ListPropertiesExpandedDataSetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/expandedDataSets",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesExpandedDataSetsRequest>;

export type ListPropertiesExpandedDataSetsResponse =
  GoogleAnalyticsAdminV1alphaListExpandedDataSetsResponse;
export const ListPropertiesExpandedDataSetsResponse =
  GoogleAnalyticsAdminV1alphaListExpandedDataSetsResponse;

export type ListPropertiesExpandedDataSetsError = DefaultErrors;

/** Lists ExpandedDataSets on a property. */
export const listPropertiesExpandedDataSets: API.PaginatedOperationMethod<
  ListPropertiesExpandedDataSetsRequest,
  ListPropertiesExpandedDataSetsResponse,
  ListPropertiesExpandedDataSetsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesExpandedDataSetsRequest,
  output: ListPropertiesExpandedDataSetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreatePropertiesExpandedDataSetsRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaExpandedDataSet;
}

export const CreatePropertiesExpandedDataSetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaExpandedDataSet).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/expandedDataSets",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesExpandedDataSetsRequest>;

export type CreatePropertiesExpandedDataSetsResponse =
  GoogleAnalyticsAdminV1alphaExpandedDataSet;
export const CreatePropertiesExpandedDataSetsResponse =
  GoogleAnalyticsAdminV1alphaExpandedDataSet;

export type CreatePropertiesExpandedDataSetsError = DefaultErrors;

/** Creates a ExpandedDataSet. */
export const createPropertiesExpandedDataSets: API.OperationMethod<
  CreatePropertiesExpandedDataSetsRequest,
  CreatePropertiesExpandedDataSetsResponse,
  CreatePropertiesExpandedDataSetsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesExpandedDataSetsRequest,
  output: CreatePropertiesExpandedDataSetsResponse,
  errors: [],
}));

export interface PatchPropertiesExpandedDataSetsRequest {
  /** Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Output only. The resource name for this ExpandedDataSet resource. Format: properties/{property_id}/expandedDataSets/{expanded_data_set} */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaExpandedDataSet;
}

export const PatchPropertiesExpandedDataSetsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaExpandedDataSet).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/expandedDataSets/{expandedDataSetsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesExpandedDataSetsRequest>;

export type PatchPropertiesExpandedDataSetsResponse =
  GoogleAnalyticsAdminV1alphaExpandedDataSet;
export const PatchPropertiesExpandedDataSetsResponse =
  GoogleAnalyticsAdminV1alphaExpandedDataSet;

export type PatchPropertiesExpandedDataSetsError = DefaultErrors;

/** Updates a ExpandedDataSet on a property. */
export const patchPropertiesExpandedDataSets: API.OperationMethod<
  PatchPropertiesExpandedDataSetsRequest,
  PatchPropertiesExpandedDataSetsResponse,
  PatchPropertiesExpandedDataSetsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesExpandedDataSetsRequest,
  output: PatchPropertiesExpandedDataSetsResponse,
  errors: [],
}));

export interface GetPropertiesExpandedDataSetsRequest {
  /** Required. The name of the ExpandedDataSet to get. Example format: properties/1234/expandedDataSets/5678 */
  name: string;
}

export const GetPropertiesExpandedDataSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/expandedDataSets/{expandedDataSetsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPropertiesExpandedDataSetsRequest>;

export type GetPropertiesExpandedDataSetsResponse =
  GoogleAnalyticsAdminV1alphaExpandedDataSet;
export const GetPropertiesExpandedDataSetsResponse =
  GoogleAnalyticsAdminV1alphaExpandedDataSet;

export type GetPropertiesExpandedDataSetsError = DefaultErrors;

/** Lookup for a single ExpandedDataSet. */
export const getPropertiesExpandedDataSets: API.OperationMethod<
  GetPropertiesExpandedDataSetsRequest,
  GetPropertiesExpandedDataSetsResponse,
  GetPropertiesExpandedDataSetsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesExpandedDataSetsRequest,
  output: GetPropertiesExpandedDataSetsResponse,
  errors: [],
}));

export interface DeletePropertiesExpandedDataSetsRequest {
  /** Required. Example format: properties/1234/expandedDataSets/5678 */
  name: string;
}

export const DeletePropertiesExpandedDataSetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/properties/{propertiesId}/expandedDataSets/{expandedDataSetsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesExpandedDataSetsRequest>;

export type DeletePropertiesExpandedDataSetsResponse = GoogleProtobufEmpty;
export const DeletePropertiesExpandedDataSetsResponse = GoogleProtobufEmpty;

export type DeletePropertiesExpandedDataSetsError = DefaultErrors;

/** Deletes a ExpandedDataSet on a property. */
export const deletePropertiesExpandedDataSets: API.OperationMethod<
  DeletePropertiesExpandedDataSetsRequest,
  DeletePropertiesExpandedDataSetsResponse,
  DeletePropertiesExpandedDataSetsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesExpandedDataSetsRequest,
  output: DeletePropertiesExpandedDataSetsResponse,
  errors: [],
}));

export interface CreatePropertiesBigQueryLinksRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaBigQueryLink;
}

export const CreatePropertiesBigQueryLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaBigQueryLink).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/bigQueryLinks",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesBigQueryLinksRequest>;

export type CreatePropertiesBigQueryLinksResponse =
  GoogleAnalyticsAdminV1alphaBigQueryLink;
export const CreatePropertiesBigQueryLinksResponse =
  GoogleAnalyticsAdminV1alphaBigQueryLink;

export type CreatePropertiesBigQueryLinksError = DefaultErrors;

/** Creates a BigQueryLink. */
export const createPropertiesBigQueryLinks: API.OperationMethod<
  CreatePropertiesBigQueryLinksRequest,
  CreatePropertiesBigQueryLinksResponse,
  CreatePropertiesBigQueryLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesBigQueryLinksRequest,
  output: CreatePropertiesBigQueryLinksResponse,
  errors: [],
}));

export interface ListPropertiesBigQueryLinksRequest {
  /** The maximum number of resources to return. The service may return fewer than this value, even if there are additional pages. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum) */
  pageSize?: number;
  /** Required. The name of the property to list BigQuery links under. Format: properties/{property_id} Example: properties/1234 */
  parent: string;
  /** A page token, received from a previous `ListBigQueryLinks` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListBigQueryLinks` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesBigQueryLinksRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/bigQueryLinks",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesBigQueryLinksRequest>;

export type ListPropertiesBigQueryLinksResponse =
  GoogleAnalyticsAdminV1alphaListBigQueryLinksResponse;
export const ListPropertiesBigQueryLinksResponse =
  GoogleAnalyticsAdminV1alphaListBigQueryLinksResponse;

export type ListPropertiesBigQueryLinksError = DefaultErrors;

/** Lists BigQuery Links on a property. */
export const listPropertiesBigQueryLinks: API.PaginatedOperationMethod<
  ListPropertiesBigQueryLinksRequest,
  ListPropertiesBigQueryLinksResponse,
  ListPropertiesBigQueryLinksError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesBigQueryLinksRequest,
  output: ListPropertiesBigQueryLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchPropertiesBigQueryLinksRequest {
  /** Output only. Resource name of this BigQuery link. Format: 'properties/{property_id}/bigQueryLinks/{bigquery_link_id}' Format: 'properties/1234/bigQueryLinks/abc567' */
  name: string;
  /** Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaBigQueryLink;
}

export const PatchPropertiesBigQueryLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaBigQueryLink).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/bigQueryLinks/{bigQueryLinksId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesBigQueryLinksRequest>;

export type PatchPropertiesBigQueryLinksResponse =
  GoogleAnalyticsAdminV1alphaBigQueryLink;
export const PatchPropertiesBigQueryLinksResponse =
  GoogleAnalyticsAdminV1alphaBigQueryLink;

export type PatchPropertiesBigQueryLinksError = DefaultErrors;

/** Updates a BigQueryLink. */
export const patchPropertiesBigQueryLinks: API.OperationMethod<
  PatchPropertiesBigQueryLinksRequest,
  PatchPropertiesBigQueryLinksResponse,
  PatchPropertiesBigQueryLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesBigQueryLinksRequest,
  output: PatchPropertiesBigQueryLinksResponse,
  errors: [],
}));

export interface GetPropertiesBigQueryLinksRequest {
  /** Required. The name of the BigQuery link to lookup. Format: properties/{property_id}/bigQueryLinks/{bigquery_link_id} Example: properties/123/bigQueryLinks/456 */
  name: string;
}

export const GetPropertiesBigQueryLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/bigQueryLinks/{bigQueryLinksId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPropertiesBigQueryLinksRequest>;

export type GetPropertiesBigQueryLinksResponse =
  GoogleAnalyticsAdminV1alphaBigQueryLink;
export const GetPropertiesBigQueryLinksResponse =
  GoogleAnalyticsAdminV1alphaBigQueryLink;

export type GetPropertiesBigQueryLinksError = DefaultErrors;

/** Lookup for a single BigQuery Link. */
export const getPropertiesBigQueryLinks: API.OperationMethod<
  GetPropertiesBigQueryLinksRequest,
  GetPropertiesBigQueryLinksResponse,
  GetPropertiesBigQueryLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesBigQueryLinksRequest,
  output: GetPropertiesBigQueryLinksResponse,
  errors: [],
}));

export interface DeletePropertiesBigQueryLinksRequest {
  /** Required. The BigQueryLink to delete. Example format: properties/1234/bigQueryLinks/5678 */
  name: string;
}

export const DeletePropertiesBigQueryLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/properties/{propertiesId}/bigQueryLinks/{bigQueryLinksId}",
  }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesBigQueryLinksRequest>;

export type DeletePropertiesBigQueryLinksResponse = GoogleProtobufEmpty;
export const DeletePropertiesBigQueryLinksResponse = GoogleProtobufEmpty;

export type DeletePropertiesBigQueryLinksError = DefaultErrors;

/** Deletes a BigQueryLink on a property. */
export const deletePropertiesBigQueryLinks: API.OperationMethod<
  DeletePropertiesBigQueryLinksRequest,
  DeletePropertiesBigQueryLinksResponse,
  DeletePropertiesBigQueryLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesBigQueryLinksRequest,
  output: DeletePropertiesBigQueryLinksResponse,
  errors: [],
}));

export interface DeletePropertiesRollupPropertySourceLinksRequest {
  /** Required. Format: properties/{property_id}/rollupPropertySourceLinks/{rollup_property_source_link_id} Example: properties/1234/rollupPropertySourceLinks/5678 */
  name: string;
}

export const DeletePropertiesRollupPropertySourceLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/properties/{propertiesId}/rollupPropertySourceLinks/{rollupPropertySourceLinksId}",
  }),
  svc,
) as unknown as Schema.Schema<DeletePropertiesRollupPropertySourceLinksRequest>;

export type DeletePropertiesRollupPropertySourceLinksResponse =
  GoogleProtobufEmpty;
export const DeletePropertiesRollupPropertySourceLinksResponse =
  GoogleProtobufEmpty;

export type DeletePropertiesRollupPropertySourceLinksError = DefaultErrors;

/** Deletes a roll-up property source link. Only roll-up properties can have source links, so this method will throw an error if used on other types of properties. */
export const deletePropertiesRollupPropertySourceLinks: API.OperationMethod<
  DeletePropertiesRollupPropertySourceLinksRequest,
  DeletePropertiesRollupPropertySourceLinksResponse,
  DeletePropertiesRollupPropertySourceLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesRollupPropertySourceLinksRequest,
  output: DeletePropertiesRollupPropertySourceLinksResponse,
  errors: [],
}));

export interface GetPropertiesRollupPropertySourceLinksRequest {
  /** Required. The name of the roll-up property source link to lookup. Format: properties/{property_id}/rollupPropertySourceLinks/{rollup_property_source_link_id} Example: properties/123/rollupPropertySourceLinks/456 */
  name: string;
}

export const GetPropertiesRollupPropertySourceLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/rollupPropertySourceLinks/{rollupPropertySourceLinksId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPropertiesRollupPropertySourceLinksRequest>;

export type GetPropertiesRollupPropertySourceLinksResponse =
  GoogleAnalyticsAdminV1alphaRollupPropertySourceLink;
export const GetPropertiesRollupPropertySourceLinksResponse =
  GoogleAnalyticsAdminV1alphaRollupPropertySourceLink;

export type GetPropertiesRollupPropertySourceLinksError = DefaultErrors;

/** Lookup for a single roll-up property source Link. Only roll-up properties can have source links, so this method will throw an error if used on other types of properties. */
export const getPropertiesRollupPropertySourceLinks: API.OperationMethod<
  GetPropertiesRollupPropertySourceLinksRequest,
  GetPropertiesRollupPropertySourceLinksResponse,
  GetPropertiesRollupPropertySourceLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesRollupPropertySourceLinksRequest,
  output: GetPropertiesRollupPropertySourceLinksResponse,
  errors: [],
}));

export interface ListPropertiesRollupPropertySourceLinksRequest {
  /** Optional. The maximum number of resources to return. The service may return fewer than this value, even if there are additional pages. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum) */
  pageSize?: number;
  /** Required. The name of the roll-up property to list roll-up property source links under. Format: properties/{property_id} Example: properties/1234 */
  parent: string;
  /** Optional. A page token, received from a previous `ListRollupPropertySourceLinks` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListRollupPropertySourceLinks` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesRollupPropertySourceLinksRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/rollupPropertySourceLinks",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesRollupPropertySourceLinksRequest>;

export type ListPropertiesRollupPropertySourceLinksResponse =
  GoogleAnalyticsAdminV1alphaListRollupPropertySourceLinksResponse;
export const ListPropertiesRollupPropertySourceLinksResponse =
  GoogleAnalyticsAdminV1alphaListRollupPropertySourceLinksResponse;

export type ListPropertiesRollupPropertySourceLinksError = DefaultErrors;

/** Lists roll-up property source Links on a property. Only roll-up properties can have source links, so this method will throw an error if used on other types of properties. */
export const listPropertiesRollupPropertySourceLinks: API.PaginatedOperationMethod<
  ListPropertiesRollupPropertySourceLinksRequest,
  ListPropertiesRollupPropertySourceLinksResponse,
  ListPropertiesRollupPropertySourceLinksError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesRollupPropertySourceLinksRequest,
  output: ListPropertiesRollupPropertySourceLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreatePropertiesRollupPropertySourceLinksRequest {
  /** Required. Format: properties/{property_id} Example: properties/1234 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaRollupPropertySourceLink;
}

export const CreatePropertiesRollupPropertySourceLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(
    GoogleAnalyticsAdminV1alphaRollupPropertySourceLink,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/rollupPropertySourceLinks",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesRollupPropertySourceLinksRequest>;

export type CreatePropertiesRollupPropertySourceLinksResponse =
  GoogleAnalyticsAdminV1alphaRollupPropertySourceLink;
export const CreatePropertiesRollupPropertySourceLinksResponse =
  GoogleAnalyticsAdminV1alphaRollupPropertySourceLink;

export type CreatePropertiesRollupPropertySourceLinksError = DefaultErrors;

/** Creates a roll-up property source link. Only roll-up properties can have source links, so this method will throw an error if used on other types of properties. */
export const createPropertiesRollupPropertySourceLinks: API.OperationMethod<
  CreatePropertiesRollupPropertySourceLinksRequest,
  CreatePropertiesRollupPropertySourceLinksResponse,
  CreatePropertiesRollupPropertySourceLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesRollupPropertySourceLinksRequest,
  output: CreatePropertiesRollupPropertySourceLinksResponse,
  errors: [],
}));

export interface PatchPropertiesDisplayVideo360AdvertiserLinksRequest {
  /** Output only. The resource name for this DisplayVideo360AdvertiserLink resource. Format: properties/{propertyId}/displayVideo360AdvertiserLinks/{linkId} Note: linkId is not the Display & Video 360 Advertiser ID */
  name: string;
  /** Required. The list of fields to be updated. Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink;
}

export const PatchPropertiesDisplayVideo360AdvertiserLinksRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(
      GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1alpha/properties/{propertiesId}/displayVideo360AdvertiserLinks/{displayVideo360AdvertiserLinksId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchPropertiesDisplayVideo360AdvertiserLinksRequest>;

export type PatchPropertiesDisplayVideo360AdvertiserLinksResponse =
  GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink;
export const PatchPropertiesDisplayVideo360AdvertiserLinksResponse =
  GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink;

export type PatchPropertiesDisplayVideo360AdvertiserLinksError = DefaultErrors;

/** Updates a DisplayVideo360AdvertiserLink on a property. */
export const patchPropertiesDisplayVideo360AdvertiserLinks: API.OperationMethod<
  PatchPropertiesDisplayVideo360AdvertiserLinksRequest,
  PatchPropertiesDisplayVideo360AdvertiserLinksResponse,
  PatchPropertiesDisplayVideo360AdvertiserLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesDisplayVideo360AdvertiserLinksRequest,
  output: PatchPropertiesDisplayVideo360AdvertiserLinksResponse,
  errors: [],
}));

export interface GetPropertiesDisplayVideo360AdvertiserLinksRequest {
  /** Required. The name of the DisplayVideo360AdvertiserLink to get. Example format: properties/1234/displayVideo360AdvertiserLink/5678 */
  name: string;
}

export const GetPropertiesDisplayVideo360AdvertiserLinksRequest = Schema.Struct(
  {
    name: Schema.String.pipe(T.HttpPath("name")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/displayVideo360AdvertiserLinks/{displayVideo360AdvertiserLinksId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPropertiesDisplayVideo360AdvertiserLinksRequest>;

export type GetPropertiesDisplayVideo360AdvertiserLinksResponse =
  GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink;
export const GetPropertiesDisplayVideo360AdvertiserLinksResponse =
  GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink;

export type GetPropertiesDisplayVideo360AdvertiserLinksError = DefaultErrors;

/** Look up a single DisplayVideo360AdvertiserLink */
export const getPropertiesDisplayVideo360AdvertiserLinks: API.OperationMethod<
  GetPropertiesDisplayVideo360AdvertiserLinksRequest,
  GetPropertiesDisplayVideo360AdvertiserLinksResponse,
  GetPropertiesDisplayVideo360AdvertiserLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesDisplayVideo360AdvertiserLinksRequest,
  output: GetPropertiesDisplayVideo360AdvertiserLinksResponse,
  errors: [],
}));

export interface DeletePropertiesDisplayVideo360AdvertiserLinksRequest {
  /** Required. The name of the DisplayVideo360AdvertiserLink to delete. Example format: properties/1234/displayVideo360AdvertiserLinks/5678 */
  name: string;
}

export const DeletePropertiesDisplayVideo360AdvertiserLinksRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha/properties/{propertiesId}/displayVideo360AdvertiserLinks/{displayVideo360AdvertiserLinksId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeletePropertiesDisplayVideo360AdvertiserLinksRequest>;

export type DeletePropertiesDisplayVideo360AdvertiserLinksResponse =
  GoogleProtobufEmpty;
export const DeletePropertiesDisplayVideo360AdvertiserLinksResponse =
  GoogleProtobufEmpty;

export type DeletePropertiesDisplayVideo360AdvertiserLinksError = DefaultErrors;

/** Deletes a DisplayVideo360AdvertiserLink on a property. */
export const deletePropertiesDisplayVideo360AdvertiserLinks: API.OperationMethod<
  DeletePropertiesDisplayVideo360AdvertiserLinksRequest,
  DeletePropertiesDisplayVideo360AdvertiserLinksResponse,
  DeletePropertiesDisplayVideo360AdvertiserLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePropertiesDisplayVideo360AdvertiserLinksRequest,
  output: DeletePropertiesDisplayVideo360AdvertiserLinksResponse,
  errors: [],
}));

export interface ListPropertiesDisplayVideo360AdvertiserLinksRequest {
  /** The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200 (higher values will be coerced to the maximum). */
  pageSize?: number;
  /** Required. Example format: properties/1234 */
  parent: string;
  /** A page token, received from a previous `ListDisplayVideo360AdvertiserLinks` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDisplayVideo360AdvertiserLinks` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesDisplayVideo360AdvertiserLinksRequest =
  Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/properties/{propertiesId}/displayVideo360AdvertiserLinks",
    }),
    svc,
  ) as unknown as Schema.Schema<ListPropertiesDisplayVideo360AdvertiserLinksRequest>;

export type ListPropertiesDisplayVideo360AdvertiserLinksResponse =
  GoogleAnalyticsAdminV1alphaListDisplayVideo360AdvertiserLinksResponse;
export const ListPropertiesDisplayVideo360AdvertiserLinksResponse =
  GoogleAnalyticsAdminV1alphaListDisplayVideo360AdvertiserLinksResponse;

export type ListPropertiesDisplayVideo360AdvertiserLinksError = DefaultErrors;

/** Lists all DisplayVideo360AdvertiserLinks on a property. */
export const listPropertiesDisplayVideo360AdvertiserLinks: API.PaginatedOperationMethod<
  ListPropertiesDisplayVideo360AdvertiserLinksRequest,
  ListPropertiesDisplayVideo360AdvertiserLinksResponse,
  ListPropertiesDisplayVideo360AdvertiserLinksError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesDisplayVideo360AdvertiserLinksRequest,
  output: ListPropertiesDisplayVideo360AdvertiserLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreatePropertiesDisplayVideo360AdvertiserLinksRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink;
}

export const CreatePropertiesDisplayVideo360AdvertiserLinksRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/properties/{propertiesId}/displayVideo360AdvertiserLinks",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreatePropertiesDisplayVideo360AdvertiserLinksRequest>;

export type CreatePropertiesDisplayVideo360AdvertiserLinksResponse =
  GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink;
export const CreatePropertiesDisplayVideo360AdvertiserLinksResponse =
  GoogleAnalyticsAdminV1alphaDisplayVideo360AdvertiserLink;

export type CreatePropertiesDisplayVideo360AdvertiserLinksError = DefaultErrors;

/** Creates a DisplayVideo360AdvertiserLink. This can only be utilized by users who have proper authorization both on the Google Analytics property and on the Display & Video 360 advertiser. Users who do not have access to the Display & Video 360 advertiser should instead seek to create a DisplayVideo360LinkProposal. */
export const createPropertiesDisplayVideo360AdvertiserLinks: API.OperationMethod<
  CreatePropertiesDisplayVideo360AdvertiserLinksRequest,
  CreatePropertiesDisplayVideo360AdvertiserLinksResponse,
  CreatePropertiesDisplayVideo360AdvertiserLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesDisplayVideo360AdvertiserLinksRequest,
  output: CreatePropertiesDisplayVideo360AdvertiserLinksResponse,
  errors: [],
}));

export interface PatchPropertiesCustomDimensionsRequest {
  /** Output only. Resource name for this CustomDimension resource. Format: properties/{property}/customDimensions/{customDimension} */
  name: string;
  /** Required. The list of fields to be updated. Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaCustomDimension;
}

export const PatchPropertiesCustomDimensionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaCustomDimension).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/properties/{propertiesId}/customDimensions/{customDimensionsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchPropertiesCustomDimensionsRequest>;

export type PatchPropertiesCustomDimensionsResponse =
  GoogleAnalyticsAdminV1alphaCustomDimension;
export const PatchPropertiesCustomDimensionsResponse =
  GoogleAnalyticsAdminV1alphaCustomDimension;

export type PatchPropertiesCustomDimensionsError = DefaultErrors;

/** Updates a CustomDimension on a property. */
export const patchPropertiesCustomDimensions: API.OperationMethod<
  PatchPropertiesCustomDimensionsRequest,
  PatchPropertiesCustomDimensionsResponse,
  PatchPropertiesCustomDimensionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPropertiesCustomDimensionsRequest,
  output: PatchPropertiesCustomDimensionsResponse,
  errors: [],
}));

export interface ArchivePropertiesCustomDimensionsRequest {
  /** Required. The name of the CustomDimension to archive. Example format: properties/1234/customDimensions/5678 */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaArchiveCustomDimensionRequest;
}

export const ArchivePropertiesCustomDimensionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(
    GoogleAnalyticsAdminV1alphaArchiveCustomDimensionRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/customDimensions/{customDimensionsId}:archive",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ArchivePropertiesCustomDimensionsRequest>;

export type ArchivePropertiesCustomDimensionsResponse = GoogleProtobufEmpty;
export const ArchivePropertiesCustomDimensionsResponse = GoogleProtobufEmpty;

export type ArchivePropertiesCustomDimensionsError = DefaultErrors;

/** Archives a CustomDimension on a property. */
export const archivePropertiesCustomDimensions: API.OperationMethod<
  ArchivePropertiesCustomDimensionsRequest,
  ArchivePropertiesCustomDimensionsResponse,
  ArchivePropertiesCustomDimensionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ArchivePropertiesCustomDimensionsRequest,
  output: ArchivePropertiesCustomDimensionsResponse,
  errors: [],
}));

export interface GetPropertiesCustomDimensionsRequest {
  /** Required. The name of the CustomDimension to get. Example format: properties/1234/customDimensions/5678 */
  name: string;
}

export const GetPropertiesCustomDimensionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/customDimensions/{customDimensionsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPropertiesCustomDimensionsRequest>;

export type GetPropertiesCustomDimensionsResponse =
  GoogleAnalyticsAdminV1alphaCustomDimension;
export const GetPropertiesCustomDimensionsResponse =
  GoogleAnalyticsAdminV1alphaCustomDimension;

export type GetPropertiesCustomDimensionsError = DefaultErrors;

/** Lookup for a single CustomDimension. */
export const getPropertiesCustomDimensions: API.OperationMethod<
  GetPropertiesCustomDimensionsRequest,
  GetPropertiesCustomDimensionsResponse,
  GetPropertiesCustomDimensionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPropertiesCustomDimensionsRequest,
  output: GetPropertiesCustomDimensionsResponse,
  errors: [],
}));

export interface CreatePropertiesCustomDimensionsRequest {
  /** Required. Example format: properties/1234 */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaCustomDimension;
}

export const CreatePropertiesCustomDimensionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaCustomDimension).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/properties/{propertiesId}/customDimensions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePropertiesCustomDimensionsRequest>;

export type CreatePropertiesCustomDimensionsResponse =
  GoogleAnalyticsAdminV1alphaCustomDimension;
export const CreatePropertiesCustomDimensionsResponse =
  GoogleAnalyticsAdminV1alphaCustomDimension;

export type CreatePropertiesCustomDimensionsError = DefaultErrors;

/** Creates a CustomDimension. */
export const createPropertiesCustomDimensions: API.OperationMethod<
  CreatePropertiesCustomDimensionsRequest,
  CreatePropertiesCustomDimensionsResponse,
  CreatePropertiesCustomDimensionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePropertiesCustomDimensionsRequest,
  output: CreatePropertiesCustomDimensionsResponse,
  errors: [],
}));

export interface ListPropertiesCustomDimensionsRequest {
  /** The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200 (higher values will be coerced to the maximum). */
  pageSize?: number;
  /** Required. Example format: properties/1234 */
  parent: string;
  /** A page token, received from a previous `ListCustomDimensions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListCustomDimensions` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPropertiesCustomDimensionsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/properties/{propertiesId}/customDimensions",
  }),
  svc,
) as unknown as Schema.Schema<ListPropertiesCustomDimensionsRequest>;

export type ListPropertiesCustomDimensionsResponse =
  GoogleAnalyticsAdminV1alphaListCustomDimensionsResponse;
export const ListPropertiesCustomDimensionsResponse =
  GoogleAnalyticsAdminV1alphaListCustomDimensionsResponse;

export type ListPropertiesCustomDimensionsError = DefaultErrors;

/** Lists CustomDimensions on a property. */
export const listPropertiesCustomDimensions: API.PaginatedOperationMethod<
  ListPropertiesCustomDimensionsRequest,
  ListPropertiesCustomDimensionsResponse,
  ListPropertiesCustomDimensionsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPropertiesCustomDimensionsRequest,
  output: ListPropertiesCustomDimensionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListAccountSummariesRequest {
  /** A page token, received from a previous `ListAccountSummaries` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAccountSummaries` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of AccountSummary resources to return. The service may return fewer than this value, even if there are additional pages. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum) */
  pageSize?: number;
}

export const ListAccountSummariesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/accountSummaries" }),
  svc,
) as unknown as Schema.Schema<ListAccountSummariesRequest>;

export type ListAccountSummariesResponse =
  GoogleAnalyticsAdminV1alphaListAccountSummariesResponse;
export const ListAccountSummariesResponse =
  GoogleAnalyticsAdminV1alphaListAccountSummariesResponse;

export type ListAccountSummariesError = DefaultErrors;

/** Returns summaries of all accounts accessible by the caller. */
export const listAccountSummaries: API.PaginatedOperationMethod<
  ListAccountSummariesRequest,
  ListAccountSummariesResponse,
  ListAccountSummariesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountSummariesRequest,
  output: ListAccountSummariesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ProvisionAccountTicketAccountsRequest {
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaProvisionAccountTicketRequest;
}

export const ProvisionAccountTicketAccountsRequest = Schema.Struct({
  body: Schema.optional(
    GoogleAnalyticsAdminV1alphaProvisionAccountTicketRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/accounts:provisionAccountTicket",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ProvisionAccountTicketAccountsRequest>;

export type ProvisionAccountTicketAccountsResponse =
  GoogleAnalyticsAdminV1alphaProvisionAccountTicketResponse;
export const ProvisionAccountTicketAccountsResponse =
  GoogleAnalyticsAdminV1alphaProvisionAccountTicketResponse;

export type ProvisionAccountTicketAccountsError = DefaultErrors;

/** Requests a ticket for creating an account. */
export const provisionAccountTicketAccounts: API.OperationMethod<
  ProvisionAccountTicketAccountsRequest,
  ProvisionAccountTicketAccountsResponse,
  ProvisionAccountTicketAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ProvisionAccountTicketAccountsRequest,
  output: ProvisionAccountTicketAccountsResponse,
  errors: [],
}));

export interface DeleteAccountsRequest {
  /** Required. The name of the Account to soft-delete. Format: accounts/{account} Example: "accounts/100" */
  name: string;
}

export const DeleteAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1alpha/accounts/{accountsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsRequest>;

export type DeleteAccountsResponse = GoogleProtobufEmpty;
export const DeleteAccountsResponse = GoogleProtobufEmpty;

export type DeleteAccountsError = DefaultErrors;

/** Marks target Account as soft-deleted (ie: "trashed") and returns it. This API does not have a method to restore soft-deleted accounts. However, they can be restored using the Trash Can UI. If the accounts are not restored before the expiration time, the account and all child resources (eg: Properties, GoogleAdsLinks, Streams, AccessBindings) will be permanently purged. https://support.google.com/analytics/answer/6154772 Returns an error if the target is not found. */
export const deleteAccounts: API.OperationMethod<
  DeleteAccountsRequest,
  DeleteAccountsResponse,
  DeleteAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccountsRequest,
  output: DeleteAccountsResponse,
  errors: [],
}));

export interface GetAccountsRequest {
  /** Required. The name of the account to lookup. Format: accounts/{account} Example: "accounts/100" */
  name: string;
}

export const GetAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/accounts/{accountsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsRequest>;

export type GetAccountsResponse = GoogleAnalyticsAdminV1alphaAccount;
export const GetAccountsResponse = GoogleAnalyticsAdminV1alphaAccount;

export type GetAccountsError = DefaultErrors;

/** Lookup for a single Account. */
export const getAccounts: API.OperationMethod<
  GetAccountsRequest,
  GetAccountsResponse,
  GetAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsRequest,
  output: GetAccountsResponse,
  errors: [],
}));

export interface GetDataSharingSettingsAccountsRequest {
  /** Required. The name of the settings to lookup. Format: accounts/{account}/dataSharingSettings Example: `accounts/1000/dataSharingSettings` */
  name: string;
}

export const GetDataSharingSettingsAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/accounts/{accountsId}/dataSharingSettings",
  }),
  svc,
) as unknown as Schema.Schema<GetDataSharingSettingsAccountsRequest>;

export type GetDataSharingSettingsAccountsResponse =
  GoogleAnalyticsAdminV1alphaDataSharingSettings;
export const GetDataSharingSettingsAccountsResponse =
  GoogleAnalyticsAdminV1alphaDataSharingSettings;

export type GetDataSharingSettingsAccountsError = DefaultErrors;

/** Get data sharing settings on an account. Data sharing settings are singletons. */
export const getDataSharingSettingsAccounts: API.OperationMethod<
  GetDataSharingSettingsAccountsRequest,
  GetDataSharingSettingsAccountsResponse,
  GetDataSharingSettingsAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDataSharingSettingsAccountsRequest,
  output: GetDataSharingSettingsAccountsResponse,
  errors: [],
}));

export interface RunAccessReportAccountsRequest {
  /** The Data Access Report supports requesting at the property level or account level. If requested at the account level, Data Access Reports include all access for all properties under that account. To request at the property level, entity should be for example 'properties/123' if "123" is your Google Analytics property ID. To request at the account level, entity should be for example 'accounts/1234' if "1234" is your Google Analytics Account ID. */
  entity: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaRunAccessReportRequest;
}

export const RunAccessReportAccountsRequest = Schema.Struct({
  entity: Schema.String.pipe(T.HttpPath("entity")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaRunAccessReportRequest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/accounts/{accountsId}:runAccessReport",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RunAccessReportAccountsRequest>;

export type RunAccessReportAccountsResponse =
  GoogleAnalyticsAdminV1alphaRunAccessReportResponse;
export const RunAccessReportAccountsResponse =
  GoogleAnalyticsAdminV1alphaRunAccessReportResponse;

export type RunAccessReportAccountsError = DefaultErrors;

/** Returns a customized report of data access records. The report provides records of each time a user reads Google Analytics reporting data. Access records are retained for up to 2 years. Data Access Reports can be requested for a property. Reports may be requested for any property, but dimensions that aren't related to quota can only be requested on Google Analytics 360 properties. This method is only available to Administrators. These data access records include GA UI Reporting, GA UI Explorations, GA Data API, and other products like Firebase & Admob that can retrieve data from Google Analytics through a linkage. These records don't include property configuration changes like adding a stream or changing a property's time zone. For configuration change history, see [searchChangeHistoryEvents](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1alpha/accounts/searchChangeHistoryEvents). To give your feedback on this API, complete the [Google Analytics Access Reports feedback](https://docs.google.com/forms/d/e/1FAIpQLSdmEBUrMzAEdiEKk5TV5dEHvDUZDRlgWYdQdAeSdtR4hVjEhw/viewform) form. */
export const runAccessReportAccounts: API.OperationMethod<
  RunAccessReportAccountsRequest,
  RunAccessReportAccountsResponse,
  RunAccessReportAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RunAccessReportAccountsRequest,
  output: RunAccessReportAccountsResponse,
  errors: [],
}));

export interface PatchAccountsRequest {
  /** Required. The list of fields to be updated. Field names must be in snake case (for example, "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "*" to match all fields. */
  updateMask?: string;
  /** Output only. Resource name of this account. Format: accounts/{account} Example: "accounts/100" */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaAccount;
}

export const PatchAccountsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaAccount).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/accounts/{accountsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchAccountsRequest>;

export type PatchAccountsResponse = GoogleAnalyticsAdminV1alphaAccount;
export const PatchAccountsResponse = GoogleAnalyticsAdminV1alphaAccount;

export type PatchAccountsError = DefaultErrors;

/** Updates an account. */
export const patchAccounts: API.OperationMethod<
  PatchAccountsRequest,
  PatchAccountsResponse,
  PatchAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchAccountsRequest,
  output: PatchAccountsResponse,
  errors: [],
}));

export interface SearchChangeHistoryEventsAccountsRequest {
  /** Required. The account resource for which to return change history resources. Format: accounts/{account} Example: `accounts/100` */
  account: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaSearchChangeHistoryEventsRequest;
}

export const SearchChangeHistoryEventsAccountsRequest = Schema.Struct({
  account: Schema.String.pipe(T.HttpPath("account")),
  body: Schema.optional(
    GoogleAnalyticsAdminV1alphaSearchChangeHistoryEventsRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/accounts/{accountsId}:searchChangeHistoryEvents",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SearchChangeHistoryEventsAccountsRequest>;

export type SearchChangeHistoryEventsAccountsResponse =
  GoogleAnalyticsAdminV1alphaSearchChangeHistoryEventsResponse;
export const SearchChangeHistoryEventsAccountsResponse =
  GoogleAnalyticsAdminV1alphaSearchChangeHistoryEventsResponse;

export type SearchChangeHistoryEventsAccountsError = DefaultErrors;

/** Searches through all changes to an account or its children given the specified set of filters. Only returns the subset of changes supported by the API. The UI may return additional changes. */
export const searchChangeHistoryEventsAccounts: API.OperationMethod<
  SearchChangeHistoryEventsAccountsRequest,
  SearchChangeHistoryEventsAccountsResponse,
  SearchChangeHistoryEventsAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SearchChangeHistoryEventsAccountsRequest,
  output: SearchChangeHistoryEventsAccountsResponse,
  errors: [],
}));

export interface ListAccountsRequest {
  /** The maximum number of resources to return. The service may return fewer than this value, even if there are additional pages. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum) */
  pageSize?: number;
  /** A page token, received from a previous `ListAccounts` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAccounts` must match the call that provided the page token. */
  pageToken?: string;
  /** Whether to include soft-deleted (ie: "trashed") Accounts in the results. Accounts can be inspected to determine whether they are deleted or not. */
  showDeleted?: boolean;
}

export const ListAccountsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha/accounts" }),
  svc,
) as unknown as Schema.Schema<ListAccountsRequest>;

export type ListAccountsResponse =
  GoogleAnalyticsAdminV1alphaListAccountsResponse;
export const ListAccountsResponse =
  GoogleAnalyticsAdminV1alphaListAccountsResponse;

export type ListAccountsError = DefaultErrors;

/** Returns all accounts accessible by the caller. Note that these accounts might not currently have GA properties. Soft-deleted (ie: "trashed") accounts are excluded by default. Returns an empty list if no relevant accounts are found. */
export const listAccounts: API.PaginatedOperationMethod<
  ListAccountsRequest,
  ListAccountsResponse,
  ListAccountsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsRequest,
  output: ListAccountsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface BatchDeleteAccountsAccessBindingsRequest {
  /** Required. The account or property that owns the access bindings. The parent of all provided values for the 'names' field in DeleteAccessBindingRequest messages must match this field. Formats: - accounts/{account} - properties/{property} */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaBatchDeleteAccessBindingsRequest;
}

export const BatchDeleteAccountsAccessBindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(
    GoogleAnalyticsAdminV1alphaBatchDeleteAccessBindingsRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/accounts/{accountsId}/accessBindings:batchDelete",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<BatchDeleteAccountsAccessBindingsRequest>;

export type BatchDeleteAccountsAccessBindingsResponse = GoogleProtobufEmpty;
export const BatchDeleteAccountsAccessBindingsResponse = GoogleProtobufEmpty;

export type BatchDeleteAccountsAccessBindingsError = DefaultErrors;

/** Deletes information about multiple users' links to an account or property. */
export const batchDeleteAccountsAccessBindings: API.OperationMethod<
  BatchDeleteAccountsAccessBindingsRequest,
  BatchDeleteAccountsAccessBindingsResponse,
  BatchDeleteAccountsAccessBindingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: BatchDeleteAccountsAccessBindingsRequest,
  output: BatchDeleteAccountsAccessBindingsResponse,
  errors: [],
}));

export interface CreateAccountsAccessBindingsRequest {
  /** Required. Formats: - accounts/{account} - properties/{property} */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaAccessBinding;
}

export const CreateAccountsAccessBindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaAccessBinding).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/accounts/{accountsId}/accessBindings",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsAccessBindingsRequest>;

export type CreateAccountsAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaAccessBinding;
export const CreateAccountsAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaAccessBinding;

export type CreateAccountsAccessBindingsError = DefaultErrors;

/** Creates an access binding on an account or property. */
export const createAccountsAccessBindings: API.OperationMethod<
  CreateAccountsAccessBindingsRequest,
  CreateAccountsAccessBindingsResponse,
  CreateAccountsAccessBindingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsAccessBindingsRequest,
  output: CreateAccountsAccessBindingsResponse,
  errors: [],
}));

export interface BatchCreateAccountsAccessBindingsRequest {
  /** Required. The account or property that owns the access bindings. The parent field in the CreateAccessBindingRequest messages must either be empty or match this field. Formats: - accounts/{account} - properties/{property} */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaBatchCreateAccessBindingsRequest;
}

export const BatchCreateAccountsAccessBindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(
    GoogleAnalyticsAdminV1alphaBatchCreateAccessBindingsRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/accounts/{accountsId}/accessBindings:batchCreate",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<BatchCreateAccountsAccessBindingsRequest>;

export type BatchCreateAccountsAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaBatchCreateAccessBindingsResponse;
export const BatchCreateAccountsAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaBatchCreateAccessBindingsResponse;

export type BatchCreateAccountsAccessBindingsError = DefaultErrors;

/** Creates information about multiple access bindings to an account or property. This method is transactional. If any AccessBinding cannot be created, none of the AccessBindings will be created. */
export const batchCreateAccountsAccessBindings: API.OperationMethod<
  BatchCreateAccountsAccessBindingsRequest,
  BatchCreateAccountsAccessBindingsResponse,
  BatchCreateAccountsAccessBindingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: BatchCreateAccountsAccessBindingsRequest,
  output: BatchCreateAccountsAccessBindingsResponse,
  errors: [],
}));

export interface DeleteAccountsAccessBindingsRequest {
  /** Required. Formats: - accounts/{account}/accessBindings/{accessBinding} - properties/{property}/accessBindings/{accessBinding} */
  name: string;
}

export const DeleteAccountsAccessBindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha/accounts/{accountsId}/accessBindings/{accessBindingsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsAccessBindingsRequest>;

export type DeleteAccountsAccessBindingsResponse = GoogleProtobufEmpty;
export const DeleteAccountsAccessBindingsResponse = GoogleProtobufEmpty;

export type DeleteAccountsAccessBindingsError = DefaultErrors;

/** Deletes an access binding on an account or property. */
export const deleteAccountsAccessBindings: API.OperationMethod<
  DeleteAccountsAccessBindingsRequest,
  DeleteAccountsAccessBindingsResponse,
  DeleteAccountsAccessBindingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccountsAccessBindingsRequest,
  output: DeleteAccountsAccessBindingsResponse,
  errors: [],
}));

export interface PatchAccountsAccessBindingsRequest {
  /** Output only. Resource name of this binding. Format: accounts/{account}/accessBindings/{access_binding} or properties/{property}/accessBindings/{access_binding} Example: "accounts/100/accessBindings/200" */
  name: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaAccessBinding;
}

export const PatchAccountsAccessBindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleAnalyticsAdminV1alphaAccessBinding).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha/accounts/{accountsId}/accessBindings/{accessBindingsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchAccountsAccessBindingsRequest>;

export type PatchAccountsAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaAccessBinding;
export const PatchAccountsAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaAccessBinding;

export type PatchAccountsAccessBindingsError = DefaultErrors;

/** Updates an access binding on an account or property. */
export const patchAccountsAccessBindings: API.OperationMethod<
  PatchAccountsAccessBindingsRequest,
  PatchAccountsAccessBindingsResponse,
  PatchAccountsAccessBindingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchAccountsAccessBindingsRequest,
  output: PatchAccountsAccessBindingsResponse,
  errors: [],
}));

export interface GetAccountsAccessBindingsRequest {
  /** Required. The name of the access binding to retrieve. Formats: - accounts/{account}/accessBindings/{accessBinding} - properties/{property}/accessBindings/{accessBinding} */
  name: string;
}

export const GetAccountsAccessBindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/accounts/{accountsId}/accessBindings/{accessBindingsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsAccessBindingsRequest>;

export type GetAccountsAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaAccessBinding;
export const GetAccountsAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaAccessBinding;

export type GetAccountsAccessBindingsError = DefaultErrors;

/** Gets information about an access binding. */
export const getAccountsAccessBindings: API.OperationMethod<
  GetAccountsAccessBindingsRequest,
  GetAccountsAccessBindingsResponse,
  GetAccountsAccessBindingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsAccessBindingsRequest,
  output: GetAccountsAccessBindingsResponse,
  errors: [],
}));

export interface BatchGetAccountsAccessBindingsRequest {
  /** Required. The names of the access bindings to retrieve. A maximum of 1000 access bindings can be retrieved in a batch. Formats: - accounts/{account}/accessBindings/{accessBinding} - properties/{property}/accessBindings/{accessBinding} */
  names?: string[];
  /** Required. The account or property that owns the access bindings. The parent of all provided values for the 'names' field must match this field. Formats: - accounts/{account} - properties/{property} */
  parent: string;
}

export const BatchGetAccountsAccessBindingsRequest = Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("names"),
  ),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/accounts/{accountsId}/accessBindings:batchGet",
  }),
  svc,
) as unknown as Schema.Schema<BatchGetAccountsAccessBindingsRequest>;

export type BatchGetAccountsAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaBatchGetAccessBindingsResponse;
export const BatchGetAccountsAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaBatchGetAccessBindingsResponse;

export type BatchGetAccountsAccessBindingsError = DefaultErrors;

/** Gets information about multiple access bindings to an account or property. */
export const batchGetAccountsAccessBindings: API.OperationMethod<
  BatchGetAccountsAccessBindingsRequest,
  BatchGetAccountsAccessBindingsResponse,
  BatchGetAccountsAccessBindingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: BatchGetAccountsAccessBindingsRequest,
  output: BatchGetAccountsAccessBindingsResponse,
  errors: [],
}));

export interface BatchUpdateAccountsAccessBindingsRequest {
  /** Required. The account or property that owns the access bindings. The parent of all provided AccessBinding in UpdateAccessBindingRequest messages must match this field. Formats: - accounts/{account} - properties/{property} */
  parent: string;
  /** Request body */
  body?: GoogleAnalyticsAdminV1alphaBatchUpdateAccessBindingsRequest;
}

export const BatchUpdateAccountsAccessBindingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(
    GoogleAnalyticsAdminV1alphaBatchUpdateAccessBindingsRequest,
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha/accounts/{accountsId}/accessBindings:batchUpdate",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<BatchUpdateAccountsAccessBindingsRequest>;

export type BatchUpdateAccountsAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaBatchUpdateAccessBindingsResponse;
export const BatchUpdateAccountsAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaBatchUpdateAccessBindingsResponse;

export type BatchUpdateAccountsAccessBindingsError = DefaultErrors;

/** Updates information about multiple access bindings to an account or property. */
export const batchUpdateAccountsAccessBindings: API.OperationMethod<
  BatchUpdateAccountsAccessBindingsRequest,
  BatchUpdateAccountsAccessBindingsResponse,
  BatchUpdateAccountsAccessBindingsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: BatchUpdateAccountsAccessBindingsRequest,
  output: BatchUpdateAccountsAccessBindingsResponse,
  errors: [],
}));

export interface ListAccountsAccessBindingsRequest {
  /** The maximum number of access bindings to return. The service may return fewer than this value. If unspecified, at most 200 access bindings will be returned. The maximum value is 500; values above 500 will be coerced to 500. */
  pageSize?: number;
  /** Required. Formats: - accounts/{account} - properties/{property} */
  parent: string;
  /** A page token, received from a previous `ListAccessBindings` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAccessBindings` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAccountsAccessBindingsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha/accounts/{accountsId}/accessBindings",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsAccessBindingsRequest>;

export type ListAccountsAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaListAccessBindingsResponse;
export const ListAccountsAccessBindingsResponse =
  GoogleAnalyticsAdminV1alphaListAccessBindingsResponse;

export type ListAccountsAccessBindingsError = DefaultErrors;

/** Lists all access bindings on an account or property. */
export const listAccountsAccessBindings: API.PaginatedOperationMethod<
  ListAccountsAccessBindingsRequest,
  ListAccountsAccessBindingsResponse,
  ListAccountsAccessBindingsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsAccessBindingsRequest,
  output: ListAccountsAccessBindingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
