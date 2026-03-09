// ==========================================================================
// Service Consumer Management API (serviceconsumermanagement v1beta1)
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
  name: "serviceconsumermanagement",
  version: "v1beta1",
  rootUrl: "https://serviceconsumermanagement.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.Number),
      message: Schema.optional(Schema.String),
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
    }),
  ).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      done: Schema.optional(Schema.Boolean),
      error: Schema.optional(Status),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface V1Beta1QuotaOverride {
  /** The resource name of the producer override. An example name would be: `services/compute.googleapis.com/projects/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion/producerOverrides/4a3f2c1d` */
  name?: string;
  /** The name of the metric to which this override applies. An example name would be: `compute.googleapis.com/cpus` */
  metric?: string;
  /** The limit unit of the limit to which this override applies. An example unit would be: `1/{project}/{region}` Note that `{project}` and `{region}` are not placeholders in this example; the literal characters `{` and `}` occur in the string. */
  unit?: string;
  /** The overriding quota limit value. Can be any nonnegative integer, or -1 (unlimited quota). */
  overrideValue?: string;
  /** If this map is nonempty, then this override applies only to specific values for dimensions defined in the limit unit. For example, an override on a limit with the unit 1/{project}/{region} could contain an entry with the key "region" and the value "us-east-1"; the override is only applied to quota consumed in that region. This map has the following restrictions: * Keys that are not defined in the limit's unit are not valid keys. Any string appearing in {brackets} in the unit (besides {project} or {user}) is a defined key. * "project" is not a valid key; the project is already specified in the parent resource name. * "user" is not a valid key; the API does not support quota overrides that apply only to a specific user. * If "region" appears as a key, its value must be a valid Cloud region. * If "zone" appears as a key, its value must be a valid Cloud zone. * If any valid key other than "region" or "zone" appears in the map, then all valid keys other than "region" or "zone" must also appear in the map. */
  dimensions?: Record<string, string>;
  /** The resource name of the ancestor that requested the override. For example: "organizations/12345" or "folders/67890". Used by admin overrides only. */
  adminOverrideAncestor?: string;
}

export const V1Beta1QuotaOverride: Schema.Schema<V1Beta1QuotaOverride> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      metric: Schema.optional(Schema.String),
      unit: Schema.optional(Schema.String),
      overrideValue: Schema.optional(Schema.String),
      dimensions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      adminOverrideAncestor: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "V1Beta1QuotaOverride",
  }) as any as Schema.Schema<V1Beta1QuotaOverride>;

export interface V1Beta1ProducerQuotaPolicy {
  /** The resource name of the producer policy. An example name would be: `services/compute.googleapis.com/organizations/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion/producerQuotaPolicies/4a3f2c1d` */
  name?: string;
  /** The name of the metric to which this policy applies. An example name would be: `compute.googleapis.com/cpus` */
  metric?: string;
  /** The limit unit of the limit to which this policy applies. An example unit would be: `1/{project}/{region}` Note that `{project}` and `{region}` are not placeholders in this example; the literal characters `{` and `}` occur in the string. */
  unit?: string;
  /** The quota policy value. Can be any nonnegative integer, or -1 (unlimited quota). */
  policyValue?: string;
  /** If this map is nonempty, then this policy applies only to specific values for dimensions defined in the limit unit. For example, a policy on a limit with the unit 1/{project}/{region} could contain an entry with the key "region" and the value "us-east-1"; the policy is only applied to quota consumed in that region. This map has the following restrictions: * Keys that are not defined in the limit's unit are not valid keys. Any string appearing in {brackets} in the unit (besides {project} or {user}) is a defined key. * "project" is not a valid key; the project is already specified in the parent resource name. * "user" is not a valid key; the API does not support quota polcies that apply only to a specific user. * If "region" appears as a key, its value must be a valid Cloud region. * If "zone" appears as a key, its value must be a valid Cloud zone. * If any valid key other than "region" or "zone" appears in the map, then all valid keys other than "region" or "zone" must also appear in the map. */
  dimensions?: Record<string, string>;
  /** The cloud resource container at which the quota policy is created. The format is {container_type}/{container_number} */
  container?: string;
}

export const V1Beta1ProducerQuotaPolicy: Schema.Schema<V1Beta1ProducerQuotaPolicy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      metric: Schema.optional(Schema.String),
      unit: Schema.optional(Schema.String),
      policyValue: Schema.optional(Schema.String),
      dimensions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      container: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "V1Beta1ProducerQuotaPolicy",
  }) as any as Schema.Schema<V1Beta1ProducerQuotaPolicy>;

export interface V1Beta1RolloutInfo {
  /** Whether there is an ongoing rollout for the default limit or not. */
  defaultLimitOngoingRollout?: boolean;
}

export const V1Beta1RolloutInfo: Schema.Schema<V1Beta1RolloutInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      defaultLimitOngoingRollout: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "V1Beta1RolloutInfo",
  }) as any as Schema.Schema<V1Beta1RolloutInfo>;

export interface V1Beta1QuotaBucket {
  /** The effective limit of this quota bucket. Equal to default_limit if there are no overrides. */
  effectiveLimit?: string;
  /** The default limit of this quota bucket, as specified by the service configuration. */
  defaultLimit?: string;
  /** Producer override on this quota bucket. */
  producerOverride?: V1Beta1QuotaOverride;
  /** Consumer override on this quota bucket. */
  consumerOverride?: V1Beta1QuotaOverride;
  /** Admin override on this quota bucket. */
  adminOverride?: V1Beta1QuotaOverride;
  /** Producer policy inherited from the closet ancestor of the current consumer. */
  producerQuotaPolicy?: V1Beta1ProducerQuotaPolicy;
  /** The dimensions of this quota bucket. If this map is empty, this is the global bucket, which is the default quota value applied to all requests that do not have a more specific override. If this map is nonempty, the default limit, effective limit, and quota overrides apply only to requests that have the dimensions given in the map. For example, if the map has key "region" and value "us-east-1", then the specified effective limit is only effective in that region, and the specified overrides apply only in that region. */
  dimensions?: Record<string, string>;
  /** Rollout information of this quota bucket. This field is present only if the effective limit will change due to the ongoing rollout of the service config. */
  rolloutInfo?: V1Beta1RolloutInfo;
}

export const V1Beta1QuotaBucket: Schema.Schema<V1Beta1QuotaBucket> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      effectiveLimit: Schema.optional(Schema.String),
      defaultLimit: Schema.optional(Schema.String),
      producerOverride: Schema.optional(V1Beta1QuotaOverride),
      consumerOverride: Schema.optional(V1Beta1QuotaOverride),
      adminOverride: Schema.optional(V1Beta1QuotaOverride),
      producerQuotaPolicy: Schema.optional(V1Beta1ProducerQuotaPolicy),
      dimensions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      rolloutInfo: Schema.optional(V1Beta1RolloutInfo),
    }),
  ).annotate({
    identifier: "V1Beta1QuotaBucket",
  }) as any as Schema.Schema<V1Beta1QuotaBucket>;

export interface V1Beta1ConsumerQuotaLimit {
  /** The resource name of the quota limit. An example name would be: `services/compute.googleapis.com/projects/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion` The resource name is intended to be opaque and should not be parsed for its component strings, since its representation could change in the future. */
  name?: string;
  /** The name of the parent metric of this limit. An example name would be: `compute.googleapis.com/cpus` */
  metric?: string;
  /** The limit unit. An example unit would be: `1/{project}/{region}` Note that `{project}` and `{region}` are not placeholders in this example; the literal characters `{` and `}` occur in the string. */
  unit?: string;
  /** Whether this limit is precise or imprecise. */
  isPrecise?: boolean;
  /** Summary of the enforced quota buckets, organized by quota dimension, ordered from least specific to most specific (for example, the global default bucket, with no quota dimensions, will always appear first). */
  quotaBuckets?: Array<V1Beta1QuotaBucket>;
  /** List of all supported locations. This field is present only if the limit has a {region} or {zone} dimension. */
  supportedLocations?: Array<string>;
}

export const V1Beta1ConsumerQuotaLimit: Schema.Schema<V1Beta1ConsumerQuotaLimit> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      metric: Schema.optional(Schema.String),
      unit: Schema.optional(Schema.String),
      isPrecise: Schema.optional(Schema.Boolean),
      quotaBuckets: Schema.optional(Schema.Array(V1Beta1QuotaBucket)),
      supportedLocations: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "V1Beta1ConsumerQuotaLimit",
  }) as any as Schema.Schema<V1Beta1ConsumerQuotaLimit>;

export interface V1Beta1ConsumerQuotaMetric {
  /** The resource name of the quota settings on this metric for this consumer. An example name would be: `services/serviceconsumermanagement.googleapis.com/projects/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus` The resource name is intended to be opaque and should not be parsed for its component strings, since its representation could change in the future. */
  name?: string;
  /** The name of the metric. An example name would be: `compute.googleapis.com/cpus` */
  metric?: string;
  /** The display name of the metric. An example name would be: "CPUs" */
  displayName?: string;
  /** The consumer quota for each quota limit defined on the metric. */
  consumerQuotaLimits?: Array<V1Beta1ConsumerQuotaLimit>;
  /** The quota limits targeting the descendant containers of the consumer in request. If the consumer in request is of type `organizations` or `folders`, the field will list per-project limits in the metric; if the consumer in request is of type `project`, the field will be empty. The `quota_buckets` field of each descendant consumer quota limit will not be populated. */
  descendantConsumerQuotaLimits?: Array<V1Beta1ConsumerQuotaLimit>;
  /** The units in which the metric value is reported. */
  unit?: string;
}

export const V1Beta1ConsumerQuotaMetric: Schema.Schema<V1Beta1ConsumerQuotaMetric> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      metric: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      consumerQuotaLimits: Schema.optional(
        Schema.Array(V1Beta1ConsumerQuotaLimit),
      ),
      descendantConsumerQuotaLimits: Schema.optional(
        Schema.Array(V1Beta1ConsumerQuotaLimit),
      ),
      unit: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "V1Beta1ConsumerQuotaMetric",
  }) as any as Schema.Schema<V1Beta1ConsumerQuotaMetric>;

export interface V1Beta1ListConsumerQuotaMetricsResponse {
  /** Quota settings for the consumer, organized by quota metric. */
  metrics?: Array<V1Beta1ConsumerQuotaMetric>;
  /** Token identifying which result to start with; returned by a previous list call. */
  nextPageToken?: string;
}

export const V1Beta1ListConsumerQuotaMetricsResponse: Schema.Schema<V1Beta1ListConsumerQuotaMetricsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      metrics: Schema.optional(Schema.Array(V1Beta1ConsumerQuotaMetric)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "V1Beta1ListConsumerQuotaMetricsResponse",
  }) as any as Schema.Schema<V1Beta1ListConsumerQuotaMetricsResponse>;

export interface V1Beta1ListProducerOverridesResponse {
  /** Producer overrides on this limit. */
  overrides?: Array<V1Beta1QuotaOverride>;
  /** Token identifying which result to start with; returned by a previous list call. */
  nextPageToken?: string;
}

export const V1Beta1ListProducerOverridesResponse: Schema.Schema<V1Beta1ListProducerOverridesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      overrides: Schema.optional(Schema.Array(V1Beta1QuotaOverride)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "V1Beta1ListProducerOverridesResponse",
  }) as any as Schema.Schema<V1Beta1ListProducerOverridesResponse>;

export interface V1Beta1OverrideInlineSource {
  /** The overrides to create. Each override must have a value for 'metric' and 'unit', to specify which metric and which limit the override should be applied to. The 'name' field of the override does not need to be set; it is ignored. */
  overrides?: Array<V1Beta1QuotaOverride>;
}

export const V1Beta1OverrideInlineSource: Schema.Schema<V1Beta1OverrideInlineSource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      overrides: Schema.optional(Schema.Array(V1Beta1QuotaOverride)),
    }),
  ).annotate({
    identifier: "V1Beta1OverrideInlineSource",
  }) as any as Schema.Schema<V1Beta1OverrideInlineSource>;

export interface V1Beta1ImportProducerOverridesRequest {
  /** The import data is specified in the request message itself */
  inlineSource?: V1Beta1OverrideInlineSource;
  /** Whether to force the creation of the quota overrides. Setting the force parameter to 'true' ignores all quota safety checks that would fail the request. QuotaSafetyCheck lists all such validations. */
  force?: boolean;
  /** The list of quota safety checks to ignore before the override mutation. Unlike 'force' field that ignores all the quota safety checks, the 'force_only' field ignores only the specified checks; other checks are still enforced. The 'force' and 'force_only' fields cannot both be set. */
  forceOnly?: Array<
    | "QUOTA_SAFETY_CHECK_UNSPECIFIED"
    | "LIMIT_DECREASE_BELOW_USAGE"
    | "LIMIT_DECREASE_PERCENTAGE_TOO_HIGH"
    | (string & {})
  >;
  /** If force option is set to true, force_justification is suggested to be set to log the reason in audit logs. */
  forceJustification?: string;
}

export const V1Beta1ImportProducerOverridesRequest: Schema.Schema<V1Beta1ImportProducerOverridesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inlineSource: Schema.optional(V1Beta1OverrideInlineSource),
      force: Schema.optional(Schema.Boolean),
      forceOnly: Schema.optional(Schema.Array(Schema.String)),
      forceJustification: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "V1Beta1ImportProducerOverridesRequest",
  }) as any as Schema.Schema<V1Beta1ImportProducerOverridesRequest>;

export interface V1Beta1ListProducerQuotaPoliciesResponse {
  /** Producer policies on this limit. */
  producerQuotaPolicies?: Array<V1Beta1ProducerQuotaPolicy>;
  /** Token identifying which result to start with; returned by a previous list call. */
  nextPageToken?: string;
}

export const V1Beta1ListProducerQuotaPoliciesResponse: Schema.Schema<V1Beta1ListProducerQuotaPoliciesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      producerQuotaPolicies: Schema.optional(
        Schema.Array(V1Beta1ProducerQuotaPolicy),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "V1Beta1ListProducerQuotaPoliciesResponse",
  }) as any as Schema.Schema<V1Beta1ListProducerQuotaPoliciesResponse>;

export interface V1Beta1PolicyInlineSource {
  /** The policies to create. Each policy must have a value for 'metric' and 'unit', to specify which metric and which limit the policy should be applied to. */
  policies?: Array<V1Beta1ProducerQuotaPolicy>;
}

export const V1Beta1PolicyInlineSource: Schema.Schema<V1Beta1PolicyInlineSource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      policies: Schema.optional(Schema.Array(V1Beta1ProducerQuotaPolicy)),
    }),
  ).annotate({
    identifier: "V1Beta1PolicyInlineSource",
  }) as any as Schema.Schema<V1Beta1PolicyInlineSource>;

export interface V1Beta1ImportProducerQuotaPoliciesRequest {
  /** The import data is specified in the request message itself */
  inlineSource?: V1Beta1PolicyInlineSource;
  /** Whether quota policy can result in a decrease of effective limit. Don't allow any decreases if force is not specified. If force is specified, then don't allow any decreases below 120% of the 7d quota usage, or for cases where usage cannot be examined (custom dimensions/ per user/per resource), only allow a 10% decrease. */
  force?: boolean;
  /** If set to true, validate the request, but do not actually update. */
  validateOnly?: boolean;
  /** If force or force_skip_quota_usage_check option is set to true, force_justification is suggested to be set to log the reason in audit logs. */
  forceJustification?: string;
  /** If set to true, skip the quota usage check. This field is only used when the effective limit can be decreased. If the force field is not set, this field will be ignored. */
  forceSkipQuotaUsageCheck?: boolean;
}

export const V1Beta1ImportProducerQuotaPoliciesRequest: Schema.Schema<V1Beta1ImportProducerQuotaPoliciesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inlineSource: Schema.optional(V1Beta1PolicyInlineSource),
      force: Schema.optional(Schema.Boolean),
      validateOnly: Schema.optional(Schema.Boolean),
      forceJustification: Schema.optional(Schema.String),
      forceSkipQuotaUsageCheck: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "V1Beta1ImportProducerQuotaPoliciesRequest",
  }) as any as Schema.Schema<V1Beta1ImportProducerQuotaPoliciesRequest>;

export interface Option {
  /** The option's name. For protobuf built-in options (options defined in descriptor.proto), this is the short name. For example, `"map_entry"`. For custom options, it should be the fully-qualified name. For example, `"google.api.http"`. */
  name?: string;
  /** The option's value packed in an Any message. If the value is a primitive, the corresponding wrapper type defined in google/protobuf/wrappers.proto should be used. If the value is an enum, it should be stored as an int32 value using the google.protobuf.Int32Value type. */
  value?: Record<string, unknown>;
}

export const Option: Schema.Schema<Option> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      value: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({ identifier: "Option" }) as any as Schema.Schema<Option>;

export interface Method {
  /** The simple name of this method. */
  name?: string;
  /** A URL of the input message type. */
  requestTypeUrl?: string;
  /** If true, the request is streamed. */
  requestStreaming?: boolean;
  /** The URL of the output message type. */
  responseTypeUrl?: string;
  /** If true, the response is streamed. */
  responseStreaming?: boolean;
  /** Any metadata attached to the method. */
  options?: Array<Option>;
  /** The source syntax of this method. This field should be ignored, instead the syntax should be inherited from Api. This is similar to Field and EnumValue. */
  syntax?:
    | "SYNTAX_PROTO2"
    | "SYNTAX_PROTO3"
    | "SYNTAX_EDITIONS"
    | (string & {});
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. This field should be ignored, instead the edition should be inherited from Api. This is similar to Field and EnumValue. */
  edition?: string;
}

export const Method: Schema.Schema<Method> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      requestTypeUrl: Schema.optional(Schema.String),
      requestStreaming: Schema.optional(Schema.Boolean),
      responseTypeUrl: Schema.optional(Schema.String),
      responseStreaming: Schema.optional(Schema.Boolean),
      options: Schema.optional(Schema.Array(Option)),
      syntax: Schema.optional(Schema.String),
      edition: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Method" }) as any as Schema.Schema<Method>;

export interface SourceContext {
  /** The path-qualified name of the .proto file that contained the associated protobuf element. For example: `"google/protobuf/source_context.proto"`. */
  fileName?: string;
}

export const SourceContext: Schema.Schema<SourceContext> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fileName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SourceContext",
  }) as any as Schema.Schema<SourceContext>;

export interface Mixin {
  /** The fully qualified name of the interface which is included. */
  name?: string;
  /** If non-empty specifies a path under which inherited HTTP paths are rooted. */
  root?: string;
}

export const Mixin: Schema.Schema<Mixin> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      root: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Mixin" }) as any as Schema.Schema<Mixin>;

export interface Api {
  /** The fully qualified name of this interface, including package name followed by the interface's simple name. */
  name?: string;
  /** The methods of this interface, in unspecified order. */
  methods?: Array<Method>;
  /** Any metadata attached to the interface. */
  options?: Array<Option>;
  /** A version string for this interface. If specified, must have the form `major-version.minor-version`, as in `1.10`. If the minor version is omitted, it defaults to zero. If the entire version field is empty, the major version is derived from the package name, as outlined below. If the field is not empty, the version in the package name will be verified to be consistent with what is provided here. The versioning schema uses [semantic versioning](http://semver.org) where the major version number indicates a breaking change and the minor version an additive, non-breaking change. Both version numbers are signals to users what to expect from different versions, and should be carefully chosen based on the product plan. The major version is also reflected in the package name of the interface, which must end in `v`, as in `google.feature.v1`. For major versions 0 and 1, the suffix can be omitted. Zero major versions must only be used for experimental, non-GA interfaces. */
  version?: string;
  /** Source context for the protocol buffer service represented by this message. */
  sourceContext?: SourceContext;
  /** Included interfaces. See Mixin. */
  mixins?: Array<Mixin>;
  /** The source syntax of the service. */
  syntax?:
    | "SYNTAX_PROTO2"
    | "SYNTAX_PROTO3"
    | "SYNTAX_EDITIONS"
    | (string & {});
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. */
  edition?: string;
}

export const Api: Schema.Schema<Api> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      methods: Schema.optional(Schema.Array(Method)),
      options: Schema.optional(Schema.Array(Option)),
      version: Schema.optional(Schema.String),
      sourceContext: Schema.optional(SourceContext),
      mixins: Schema.optional(Schema.Array(Mixin)),
      syntax: Schema.optional(Schema.String),
      edition: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Api" }) as any as Schema.Schema<Api>;

export interface Field {
  /** The field type. */
  kind?:
    | "TYPE_UNKNOWN"
    | "TYPE_DOUBLE"
    | "TYPE_FLOAT"
    | "TYPE_INT64"
    | "TYPE_UINT64"
    | "TYPE_INT32"
    | "TYPE_FIXED64"
    | "TYPE_FIXED32"
    | "TYPE_BOOL"
    | "TYPE_STRING"
    | "TYPE_GROUP"
    | "TYPE_MESSAGE"
    | "TYPE_BYTES"
    | "TYPE_UINT32"
    | "TYPE_ENUM"
    | "TYPE_SFIXED32"
    | "TYPE_SFIXED64"
    | "TYPE_SINT32"
    | "TYPE_SINT64"
    | (string & {});
  /** The field cardinality. */
  cardinality?:
    | "CARDINALITY_UNKNOWN"
    | "CARDINALITY_OPTIONAL"
    | "CARDINALITY_REQUIRED"
    | "CARDINALITY_REPEATED"
    | (string & {});
  /** The field number. */
  number?: number;
  /** The field name. */
  name?: string;
  /** The field type URL, without the scheme, for message or enumeration types. Example: `"type.googleapis.com/google.protobuf.Timestamp"`. */
  typeUrl?: string;
  /** The index of the field type in `Type.oneofs`, for message or enumeration types. The first type has index 1; zero means the type is not in the list. */
  oneofIndex?: number;
  /** Whether to use alternative packed wire representation. */
  packed?: boolean;
  /** The protocol buffer options. */
  options?: Array<Option>;
  /** The field JSON name. */
  jsonName?: string;
  /** The string value of the default value of this field. Proto2 syntax only. */
  defaultValue?: string;
}

export const Field: Schema.Schema<Field> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      cardinality: Schema.optional(Schema.String),
      number: Schema.optional(Schema.Number),
      name: Schema.optional(Schema.String),
      typeUrl: Schema.optional(Schema.String),
      oneofIndex: Schema.optional(Schema.Number),
      packed: Schema.optional(Schema.Boolean),
      options: Schema.optional(Schema.Array(Option)),
      jsonName: Schema.optional(Schema.String),
      defaultValue: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Field" }) as any as Schema.Schema<Field>;

export interface Type {
  /** The fully qualified message name. */
  name?: string;
  /** The list of fields. */
  fields?: Array<Field>;
  /** The list of types appearing in `oneof` definitions in this type. */
  oneofs?: Array<string>;
  /** The protocol buffer options. */
  options?: Array<Option>;
  /** The source context. */
  sourceContext?: SourceContext;
  /** The source syntax. */
  syntax?:
    | "SYNTAX_PROTO2"
    | "SYNTAX_PROTO3"
    | "SYNTAX_EDITIONS"
    | (string & {});
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. */
  edition?: string;
}

export const Type: Schema.Schema<Type> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      fields: Schema.optional(Schema.Array(Field)),
      oneofs: Schema.optional(Schema.Array(Schema.String)),
      options: Schema.optional(Schema.Array(Option)),
      sourceContext: Schema.optional(SourceContext),
      syntax: Schema.optional(Schema.String),
      edition: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Type" }) as any as Schema.Schema<Type>;

export interface EnumValue {
  /** Enum value name. */
  name?: string;
  /** Enum value number. */
  number?: number;
  /** Protocol buffer options. */
  options?: Array<Option>;
}

export const EnumValue: Schema.Schema<EnumValue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      number: Schema.optional(Schema.Number),
      options: Schema.optional(Schema.Array(Option)),
    }),
  ).annotate({ identifier: "EnumValue" }) as any as Schema.Schema<EnumValue>;

export interface Enum {
  /** Enum type name. */
  name?: string;
  /** Enum value definitions. */
  enumvalue?: Array<EnumValue>;
  /** Protocol buffer options. */
  options?: Array<Option>;
  /** The source context. */
  sourceContext?: SourceContext;
  /** The source syntax. */
  syntax?:
    | "SYNTAX_PROTO2"
    | "SYNTAX_PROTO3"
    | "SYNTAX_EDITIONS"
    | (string & {});
  /** The source edition string, only valid when syntax is SYNTAX_EDITIONS. */
  edition?: string;
}

export const Enum: Schema.Schema<Enum> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      enumvalue: Schema.optional(Schema.Array(EnumValue)),
      options: Schema.optional(Schema.Array(Option)),
      sourceContext: Schema.optional(SourceContext),
      syntax: Schema.optional(Schema.String),
      edition: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Enum" }) as any as Schema.Schema<Enum>;

export interface Page {
  /** The name of the page. It will be used as an identity of the page to generate URI of the page, text of the link to this page in navigation, etc. The full page name (start from the root page name to this page concatenated with `.`) can be used as reference to the page in your documentation. For example: pages: - name: Tutorial content: (== include tutorial.md ==) subpages: - name: Java content: (== include tutorial_java.md ==) You can reference `Java` page using Markdown reference link syntax: `Java`. */
  name?: string;
  /** The Markdown content of the page. You can use ```(== include {path} ==)``` to include content from a Markdown file. The content can be used to produce the documentation page such as HTML format page. */
  content?: string;
  /** Subpages of this page. The order of subpages specified here will be honored in the generated docset. */
  subpages?: Array<Page>;
}

export const Page: Schema.Schema<Page> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      content: Schema.optional(Schema.String),
      subpages: Schema.optional(Schema.Array(Page)),
    }),
  ).annotate({ identifier: "Page" }) as any as Schema.Schema<Page>;

export interface DocumentationRule {
  /** The selector is a comma-separated list of patterns for any element such as a method, a field, an enum value. Each pattern is a qualified name of the element which may end in "*", indicating a wildcard. Wildcards are only allowed at the end and for a whole component of the qualified name, i.e. "foo.*" is ok, but not "foo.b*" or "foo.*.bar". A wildcard will match one or more components. To specify a default for all applicable elements, the whole pattern "*" is used. */
  selector?: string;
  /** Description of the selected proto element (e.g. a message, a method, a 'service' definition, or a field). Defaults to leading & trailing comments taken from the proto source definition of the proto element. */
  description?: string;
  /** Deprecation description of the selected element(s). It can be provided if an element is marked as `deprecated`. */
  deprecationDescription?: string;
  /** String of comma or space separated case-sensitive words for which method/field name replacement will be disabled. */
  disableReplacementWords?: string;
}

export const DocumentationRule: Schema.Schema<DocumentationRule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      selector: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      deprecationDescription: Schema.optional(Schema.String),
      disableReplacementWords: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DocumentationRule",
  }) as any as Schema.Schema<DocumentationRule>;

export interface Documentation {
  /** A short description of what the service does. The summary must be plain text. It becomes the overview of the service displayed in Google Cloud Console. NOTE: This field is equivalent to the standard field `description`. */
  summary?: string;
  /** The top level pages for the documentation set. */
  pages?: Array<Page>;
  /** A list of documentation rules that apply to individual API elements. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<DocumentationRule>;
  /** The URL to the root of documentation. */
  documentationRootUrl?: string;
  /** Specifies the service root url if the default one (the service name from the yaml file) is not suitable. This can be seen in any fully specified service urls as well as sections that show a base that other urls are relative to. */
  serviceRootUrl?: string;
  /** Declares a single overview page. For example: documentation: summary: ... overview: (== include overview.md ==) This is a shortcut for the following declaration (using pages style): documentation: summary: ... pages: - name: Overview content: (== include overview.md ==) Note: you cannot specify both `overview` field and `pages` field. */
  overview?: string;
  /** Optional information about the IAM configuration. This is typically used to link to documentation about a product's IAM roles and permissions. */
  additionalIamInfo?: string;
  /** Specifies section and content to override the boilerplate content. Currently overrides following sections: 1. rest.service.client_libraries */
  sectionOverrides?: Array<Page>;
}

export const Documentation: Schema.Schema<Documentation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      summary: Schema.optional(Schema.String),
      pages: Schema.optional(Schema.Array(Page)),
      rules: Schema.optional(Schema.Array(DocumentationRule)),
      documentationRootUrl: Schema.optional(Schema.String),
      serviceRootUrl: Schema.optional(Schema.String),
      overview: Schema.optional(Schema.String),
      additionalIamInfo: Schema.optional(Schema.String),
      sectionOverrides: Schema.optional(Schema.Array(Page)),
    }),
  ).annotate({
    identifier: "Documentation",
  }) as any as Schema.Schema<Documentation>;

export interface BackendRule {
  /** Selects the methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** The address of the API backend. The scheme is used to determine the backend protocol and security. The following schemes are accepted: SCHEME PROTOCOL SECURITY http:// HTTP None https:// HTTP TLS grpc:// gRPC None grpcs:// gRPC TLS It is recommended to explicitly include a scheme. Leaving out the scheme may cause constrasting behaviors across platforms. If the port is unspecified, the default is: - 80 for schemes without TLS - 443 for schemes with TLS For HTTP backends, use protocol to specify the protocol version. */
  address?: string;
  /** The number of seconds to wait for a response from a request. The default varies based on the request protocol and deployment environment. */
  deadline?: number;
  /** Deprecated, do not use. */
  minDeadline?: number;
  /** The number of seconds to wait for the completion of a long running operation. The default is no deadline. */
  operationDeadline?: number;
  /** no-lint */
  pathTranslation?:
    | "PATH_TRANSLATION_UNSPECIFIED"
    | "CONSTANT_ADDRESS"
    | "APPEND_PATH_TO_ADDRESS"
    | (string & {});
  /** The JWT audience is used when generating a JWT ID token for the backend. This ID token will be added in the HTTP "authorization" header, and sent to the backend. */
  jwtAudience?: string;
  /** When disable_auth is true, a JWT ID token won't be generated and the original "Authorization" HTTP header will be preserved. If the header is used to carry the original token and is expected by the backend, this field must be set to true to preserve the header. */
  disableAuth?: boolean;
  /** The protocol used for sending a request to the backend. The supported values are "http/1.1" and "h2". The default value is inferred from the scheme in the address field: SCHEME PROTOCOL http:// http/1.1 https:// http/1.1 grpc:// h2 grpcs:// h2 For secure HTTP backends (https://) that support HTTP/2, set this field to "h2" for improved performance. Configuring this field to non-default values is only supported for secure HTTP backends. This field will be ignored for all other backends. See https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml#alpn-protocol-ids for more details on the supported values. */
  protocol?: string;
  /** The map between request protocol and the backend address. */
  overridesByRequestProtocol?: Record<string, BackendRule>;
  /** The load balancing policy used for connection to the application backend. Defined as an arbitrary string to accomondate custom load balancing policies supported by the underlying channel, but suggest most users use one of the standard policies, such as the default, "RoundRobin". */
  loadBalancingPolicy?: string;
}

export const BackendRule: Schema.Schema<BackendRule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      selector: Schema.optional(Schema.String),
      address: Schema.optional(Schema.String),
      deadline: Schema.optional(Schema.Number),
      minDeadline: Schema.optional(Schema.Number),
      operationDeadline: Schema.optional(Schema.Number),
      pathTranslation: Schema.optional(Schema.String),
      jwtAudience: Schema.optional(Schema.String),
      disableAuth: Schema.optional(Schema.Boolean),
      protocol: Schema.optional(Schema.String),
      overridesByRequestProtocol: Schema.optional(
        Schema.Record(Schema.String, BackendRule),
      ),
      loadBalancingPolicy: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BackendRule",
  }) as any as Schema.Schema<BackendRule>;

export interface Backend {
  /** A list of API backend rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<BackendRule>;
}

export const Backend: Schema.Schema<Backend> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rules: Schema.optional(Schema.Array(BackendRule)),
    }),
  ).annotate({ identifier: "Backend" }) as any as Schema.Schema<Backend>;

export interface CustomHttpPattern {
  /** The name of this custom HTTP verb. */
  kind?: string;
  /** The path matched by this custom verb. */
  path?: string;
}

export const CustomHttpPattern: Schema.Schema<CustomHttpPattern> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CustomHttpPattern",
  }) as any as Schema.Schema<CustomHttpPattern>;

export interface HttpRule {
  /** Selects a method to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** Maps to HTTP GET. Used for listing and getting information about resources. */
  get?: string;
  /** Maps to HTTP PUT. Used for replacing a resource. */
  put?: string;
  /** Maps to HTTP POST. Used for creating a resource or performing an action. */
  post?: string;
  /** Maps to HTTP DELETE. Used for deleting a resource. */
  delete?: string;
  /** Maps to HTTP PATCH. Used for updating a resource. */
  patch?: string;
  /** The custom pattern is used for specifying an HTTP method that is not included in the `pattern` field, such as HEAD, or "*" to leave the HTTP method unspecified for this rule. The wild-card rule is useful for services that provide content to Web (HTML) clients. */
  custom?: CustomHttpPattern;
  /** The name of the request field whose value is mapped to the HTTP request body, or `*` for mapping all request fields not captured by the path pattern to the HTTP body, or omitted for not having any HTTP request body. NOTE: the referred field must be present at the top-level of the request message type. */
  body?: string;
  /** Optional. The name of the response field whose value is mapped to the HTTP response body. When omitted, the entire response message will be used as the HTTP response body. NOTE: The referred field must be present at the top-level of the response message type. */
  responseBody?: string;
  /** Additional HTTP bindings for the selector. Nested bindings must not contain an `additional_bindings` field themselves (that is, the nesting may only be one level deep). */
  additionalBindings?: Array<HttpRule>;
}

export const HttpRule: Schema.Schema<HttpRule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      selector: Schema.optional(Schema.String),
      get: Schema.optional(Schema.String),
      put: Schema.optional(Schema.String),
      post: Schema.optional(Schema.String),
      delete: Schema.optional(Schema.String),
      patch: Schema.optional(Schema.String),
      custom: Schema.optional(CustomHttpPattern),
      body: Schema.optional(Schema.String),
      responseBody: Schema.optional(Schema.String),
      additionalBindings: Schema.optional(Schema.Array(HttpRule)),
    }),
  ).annotate({ identifier: "HttpRule" }) as any as Schema.Schema<HttpRule>;

export interface Http {
  /** A list of HTTP configuration rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<HttpRule>;
  /** When set to true, URL path parameters will be fully URI-decoded except in cases of single segment matches in reserved expansion, where "%2F" will be left encoded. The default behavior is to not decode RFC 6570 reserved characters in multi segment matches. */
  fullyDecodeReservedExpansion?: boolean;
}

export const Http: Schema.Schema<Http> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rules: Schema.optional(Schema.Array(HttpRule)),
      fullyDecodeReservedExpansion: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "Http" }) as any as Schema.Schema<Http>;

export interface QuotaLimit {
  /** Name of the quota limit. The name must be provided, and it must be unique within the service. The name can only include alphanumeric characters as well as '-'. The maximum length of the limit name is 64 characters. */
  name?: string;
  /** Optional. User-visible, extended description for this quota limit. Should be used only when more context is needed to understand this limit than provided by the limit's display name (see: `display_name`). */
  description?: string;
  /** Default number of tokens that can be consumed during the specified duration. This is the number of tokens assigned when a client application developer activates the service for his/her project. Specifying a value of 0 will block all requests. This can be used if you are provisioning quota to selected consumers and blocking others. Similarly, a value of -1 will indicate an unlimited quota. No other negative values are allowed. Used by group-based quotas only. */
  defaultLimit?: string;
  /** Maximum number of tokens that can be consumed during the specified duration. Client application developers can override the default limit up to this maximum. If specified, this value cannot be set to a value less than the default limit. If not specified, it is set to the default limit. To allow clients to apply overrides with no upper bound, set this to -1, indicating unlimited maximum quota. Used by group-based quotas only. */
  maxLimit?: string;
  /** Free tier value displayed in the Developers Console for this limit. The free tier is the number of tokens that will be subtracted from the billed amount when billing is enabled. This field can only be set on a limit with duration "1d", in a billable group; it is invalid on any other limit. If this field is not set, it defaults to 0, indicating that there is no free tier for this service. Used by group-based quotas only. */
  freeTier?: string;
  /** Duration of this limit in textual notation. Must be "100s" or "1d". Used by group-based quotas only. */
  duration?: string;
  /** The name of the metric this quota limit applies to. The quota limits with the same metric will be checked together during runtime. The metric must be defined within the service config. */
  metric?: string;
  /** Specify the unit of the quota limit. It uses the same syntax as MetricDescriptor.unit. The supported unit kinds are determined by the quota backend system. Here are some examples: * "1/min/{project}" for quota per minute per project. Note: the order of unit components is insignificant. The "1" at the beginning is required to follow the metric unit syntax. */
  unit?: string;
  /** Tiered limit values. You must specify this as a key:value pair, with an integer value that is the maximum number of requests allowed for the specified unit. Currently only STANDARD is supported. */
  values?: Record<string, string>;
  /** User-visible display name for this limit. Optional. If not set, the UI will provide a default display name based on the quota configuration. This field can be used to override the default display name generated from the configuration. */
  displayName?: string;
}

export const QuotaLimit: Schema.Schema<QuotaLimit> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      defaultLimit: Schema.optional(Schema.String),
      maxLimit: Schema.optional(Schema.String),
      freeTier: Schema.optional(Schema.String),
      duration: Schema.optional(Schema.String),
      metric: Schema.optional(Schema.String),
      unit: Schema.optional(Schema.String),
      values: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "QuotaLimit" }) as any as Schema.Schema<QuotaLimit>;

export interface MetricRule {
  /** Selects the methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** Metrics to update when the selected methods are called, and the associated cost applied to each metric. The key of the map is the metric name, and the values are the amount increased for the metric against which the quota limits are defined. The value must not be negative. */
  metricCosts?: Record<string, string>;
}

export const MetricRule: Schema.Schema<MetricRule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      selector: Schema.optional(Schema.String),
      metricCosts: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({ identifier: "MetricRule" }) as any as Schema.Schema<MetricRule>;

export interface Quota {
  /** List of QuotaLimit definitions for the service. */
  limits?: Array<QuotaLimit>;
  /** List of MetricRule definitions, each one mapping a selected method to one or more metrics. */
  metricRules?: Array<MetricRule>;
}

export const Quota: Schema.Schema<Quota> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      limits: Schema.optional(Schema.Array(QuotaLimit)),
      metricRules: Schema.optional(Schema.Array(MetricRule)),
    }),
  ).annotate({ identifier: "Quota" }) as any as Schema.Schema<Quota>;

export interface OAuthRequirements {
  /** The list of publicly documented OAuth scopes that are allowed access. An OAuth token containing any of these scopes will be accepted. Example: canonical_scopes: https://www.googleapis.com/auth/calendar, https://www.googleapis.com/auth/calendar.read */
  canonicalScopes?: string;
}

export const OAuthRequirements: Schema.Schema<OAuthRequirements> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      canonicalScopes: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OAuthRequirements",
  }) as any as Schema.Schema<OAuthRequirements>;

export interface AuthRequirement {
  /** id from authentication provider. Example: provider_id: bookstore_auth */
  providerId?: string;
  /** NOTE: This will be deprecated soon, once AuthProvider.audiences is implemented and accepted in all the runtime components. The list of JWT [audiences](https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.3). that are allowed to access. A JWT containing any of these audiences will be accepted. When this setting is absent, only JWTs with audience "https://Service_name/API_name" will be accepted. For example, if no audiences are in the setting, LibraryService API will only accept JWTs with the following audience "https://library-example.googleapis.com/google.example.library.v1.LibraryService". Example: audiences: bookstore_android.apps.googleusercontent.com, bookstore_web.apps.googleusercontent.com */
  audiences?: string;
}

export const AuthRequirement: Schema.Schema<AuthRequirement> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      providerId: Schema.optional(Schema.String),
      audiences: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AuthRequirement",
  }) as any as Schema.Schema<AuthRequirement>;

export interface AuthenticationRule {
  /** Selects the methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** The requirements for OAuth credentials. */
  oauth?: OAuthRequirements;
  /** If true, the service accepts API keys without any other credential. This flag only applies to HTTP and gRPC requests. */
  allowWithoutCredential?: boolean;
  /** Requirements for additional authentication providers. */
  requirements?: Array<AuthRequirement>;
}

export const AuthenticationRule: Schema.Schema<AuthenticationRule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      selector: Schema.optional(Schema.String),
      oauth: Schema.optional(OAuthRequirements),
      allowWithoutCredential: Schema.optional(Schema.Boolean),
      requirements: Schema.optional(Schema.Array(AuthRequirement)),
    }),
  ).annotate({
    identifier: "AuthenticationRule",
  }) as any as Schema.Schema<AuthenticationRule>;

export interface JwtLocation {
  /** Specifies HTTP header name to extract JWT token. */
  header?: string;
  /** Specifies URL query parameter name to extract JWT token. */
  query?: string;
  /** Specifies cookie name to extract JWT token. */
  cookie?: string;
  /** The value prefix. The value format is "value_prefix{token}" Only applies to "in" header type. Must be empty for "in" query type. If not empty, the header value has to match (case sensitive) this prefix. If not matched, JWT will not be extracted. If matched, JWT will be extracted after the prefix is removed. For example, for "Authorization: Bearer {JWT}", value_prefix="Bearer " with a space at the end. */
  valuePrefix?: string;
}

export const JwtLocation: Schema.Schema<JwtLocation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      header: Schema.optional(Schema.String),
      query: Schema.optional(Schema.String),
      cookie: Schema.optional(Schema.String),
      valuePrefix: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "JwtLocation",
  }) as any as Schema.Schema<JwtLocation>;

export interface AuthProvider {
  /** The unique identifier of the auth provider. It will be referred to by `AuthRequirement.provider_id`. Example: "bookstore_auth". */
  id?: string;
  /** Identifies the principal that issued the JWT. See https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.1 Usually a URL or an email address. Example: https://securetoken.google.com Example: 1234567-compute@developer.gserviceaccount.com */
  issuer?: string;
  /** URL of the provider's public key set to validate signature of the JWT. See [OpenID Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata). Optional if the key set document: - can be retrieved from [OpenID Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html) of the issuer. - can be inferred from the email domain of the issuer (e.g. a Google service account). Example: https://www.googleapis.com/oauth2/v1/certs */
  jwksUri?: string;
  /** The list of JWT [audiences](https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.3). that are allowed to access. A JWT containing any of these audiences will be accepted. When this setting is absent, JWTs with audiences: - "https://[service.name]/[google.protobuf.Api.name]" - "https://[service.name]/" will be accepted. For example, if no audiences are in the setting, LibraryService API will accept JWTs with the following audiences: - https://library-example.googleapis.com/google.example.library.v1.LibraryService - https://library-example.googleapis.com/ Example: audiences: bookstore_android.apps.googleusercontent.com, bookstore_web.apps.googleusercontent.com */
  audiences?: string;
  /** Redirect URL if JWT token is required but not present or is expired. Implement authorizationUrl of securityDefinitions in OpenAPI spec. */
  authorizationUrl?: string;
  /** Defines the locations to extract the JWT. For now it is only used by the Cloud Endpoints to store the OpenAPI extension [x-google-jwt-locations] (https://cloud.google.com/endpoints/docs/openapi/openapi-extensions#x-google-jwt-locations) JWT locations can be one of HTTP headers, URL query parameters or cookies. The rule is that the first match wins. If not specified, default to use following 3 locations: 1) Authorization: Bearer 2) x-goog-iap-jwt-assertion 3) access_token query parameter Default locations can be specified as followings: jwt_locations: - header: Authorization value_prefix: "Bearer " - header: x-goog-iap-jwt-assertion - query: access_token */
  jwtLocations?: Array<JwtLocation>;
}

export const AuthProvider: Schema.Schema<AuthProvider> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      issuer: Schema.optional(Schema.String),
      jwksUri: Schema.optional(Schema.String),
      audiences: Schema.optional(Schema.String),
      authorizationUrl: Schema.optional(Schema.String),
      jwtLocations: Schema.optional(Schema.Array(JwtLocation)),
    }),
  ).annotate({
    identifier: "AuthProvider",
  }) as any as Schema.Schema<AuthProvider>;

export interface Authentication {
  /** A list of authentication rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<AuthenticationRule>;
  /** Defines a set of authentication providers that a service supports. */
  providers?: Array<AuthProvider>;
}

export const Authentication: Schema.Schema<Authentication> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rules: Schema.optional(Schema.Array(AuthenticationRule)),
      providers: Schema.optional(Schema.Array(AuthProvider)),
    }),
  ).annotate({
    identifier: "Authentication",
  }) as any as Schema.Schema<Authentication>;

export interface ContextRule {
  /** Selects the methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** A list of full type names of requested contexts, only the requested context will be made available to the backend. */
  requested?: Array<string>;
  /** A list of full type names of provided contexts. It is used to support propagating HTTP headers and ETags from the response extension. */
  provided?: Array<string>;
  /** A list of full type names or extension IDs of extensions allowed in grpc side channel from client to backend. */
  allowedRequestExtensions?: Array<string>;
  /** A list of full type names or extension IDs of extensions allowed in grpc side channel from backend to client. */
  allowedResponseExtensions?: Array<string>;
}

export const ContextRule: Schema.Schema<ContextRule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      selector: Schema.optional(Schema.String),
      requested: Schema.optional(Schema.Array(Schema.String)),
      provided: Schema.optional(Schema.Array(Schema.String)),
      allowedRequestExtensions: Schema.optional(Schema.Array(Schema.String)),
      allowedResponseExtensions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ContextRule",
  }) as any as Schema.Schema<ContextRule>;

export interface Context {
  /** A list of RPC context rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<ContextRule>;
}

export const Context: Schema.Schema<Context> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rules: Schema.optional(Schema.Array(ContextRule)),
    }),
  ).annotate({ identifier: "Context" }) as any as Schema.Schema<Context>;

export interface UsageRule {
  /** Selects the methods to which this rule applies. Use '*' to indicate all methods in all APIs. Refer to selector for syntax details. */
  selector?: string;
  /** Use this rule to configure unregistered calls for the service. Unregistered calls are calls that do not contain consumer project identity. (Example: calls that do not contain an API key). WARNING: By default, API methods do not allow unregistered calls, and each method call must be identified by a consumer project identity. */
  allowUnregisteredCalls?: boolean;
  /** If true, the selected method should skip service control and the control plane features, such as quota and billing, will not be available. This flag is used by Google Cloud Endpoints to bypass checks for internal methods, such as service health check methods. */
  skipServiceControl?: boolean;
}

export const UsageRule: Schema.Schema<UsageRule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      selector: Schema.optional(Schema.String),
      allowUnregisteredCalls: Schema.optional(Schema.Boolean),
      skipServiceControl: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "UsageRule" }) as any as Schema.Schema<UsageRule>;

export interface Usage {
  /** Requirements that must be satisfied before a consumer project can use the service. Each requirement is of the form /; for example 'serviceusage.googleapis.com/billing-enabled'. For Google APIs, a Terms of Service requirement must be included here. Google Cloud APIs must include "serviceusage.googleapis.com/tos/cloud". Other Google APIs should include "serviceusage.googleapis.com/tos/universal". Additional ToS can be included based on the business needs. */
  requirements?: Array<string>;
  /** A list of usage rules that apply to individual API methods. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<UsageRule>;
  /** The full resource name of a channel used for sending notifications to the service producer. Google Service Management currently only supports [Google Cloud Pub/Sub](https://cloud.google.com/pubsub) as a notification channel. To use Google Cloud Pub/Sub as the channel, this must be the name of a Cloud Pub/Sub topic that uses the Cloud Pub/Sub topic name format documented in https://cloud.google.com/pubsub/docs/overview. */
  producerNotificationChannel?: string;
}

export const Usage: Schema.Schema<Usage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requirements: Schema.optional(Schema.Array(Schema.String)),
      rules: Schema.optional(Schema.Array(UsageRule)),
      producerNotificationChannel: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Usage" }) as any as Schema.Schema<Usage>;

export interface CustomErrorRule {
  /** Selects messages to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** Mark this message as possible payload in error response. Otherwise, objects of this type will be filtered when they appear in error payload. */
  isErrorType?: boolean;
}

export const CustomErrorRule: Schema.Schema<CustomErrorRule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      selector: Schema.optional(Schema.String),
      isErrorType: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "CustomErrorRule",
  }) as any as Schema.Schema<CustomErrorRule>;

export interface CustomError {
  /** The list of custom error rules that apply to individual API messages. **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<CustomErrorRule>;
  /** The list of custom error detail types, e.g. 'google.foo.v1.CustomError'. */
  types?: Array<string>;
}

export const CustomError: Schema.Schema<CustomError> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rules: Schema.optional(Schema.Array(CustomErrorRule)),
      types: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "CustomError",
  }) as any as Schema.Schema<CustomError>;

export interface Endpoint {
  /** The canonical name of this endpoint. */
  name?: string;
  /** Aliases for this endpoint, these will be served by the same UrlMap as the parent endpoint, and will be provisioned in the GCP stack for the Regional Endpoints. */
  aliases?: Array<string>;
  /** The specification of an Internet routable address of API frontend that will handle requests to this [API Endpoint](https://cloud.google.com/apis/design/glossary). It should be either a valid IPv4 address or a fully-qualified domain name. For example, "8.8.8.8" or "myservice.appspot.com". */
  target?: string;
  /** Allowing [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), aka cross-domain traffic, would allow the backends served from this endpoint to receive and respond to HTTP OPTIONS requests. The response will be used by the browser to determine whether the subsequent cross-origin request is allowed to proceed. */
  allowCors?: boolean;
}

export const Endpoint: Schema.Schema<Endpoint> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      aliases: Schema.optional(Schema.Array(Schema.String)),
      target: Schema.optional(Schema.String),
      allowCors: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "Endpoint" }) as any as Schema.Schema<Endpoint>;

export interface FieldPolicy {
  /** Selects one or more request or response message fields to apply this `FieldPolicy`. When a `FieldPolicy` is used in proto annotation, the selector must be left as empty. The service config generator will automatically fill the correct value. When a `FieldPolicy` is used in service config, the selector must be a comma-separated string with valid request or response field paths, such as "foo.bar" or "foo.bar,foo.baz". */
  selector?: string;
  /** Specifies the required permission(s) for the resource referred to by the field. It requires the field contains a valid resource reference, and the request must pass the permission checks to proceed. For example, "resourcemanager.projects.get". */
  resourcePermission?: string;
  /** Specifies the resource type for the resource referred to by the field. */
  resourceType?: string;
}

export const FieldPolicy: Schema.Schema<FieldPolicy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      selector: Schema.optional(Schema.String),
      resourcePermission: Schema.optional(Schema.String),
      resourceType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FieldPolicy",
  }) as any as Schema.Schema<FieldPolicy>;

export interface MethodPolicy {
  /** Selects a method to which these policies should be enforced, for example, "google.pubsub.v1.Subscriber.CreateSubscription". Refer to selector for syntax details. NOTE: This field must not be set in the proto annotation. It will be automatically filled by the service config compiler . */
  selector?: string;
  /** Policies that are applicable to the request message. */
  requestPolicies?: Array<FieldPolicy>;
}

export const MethodPolicy: Schema.Schema<MethodPolicy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      selector: Schema.optional(Schema.String),
      requestPolicies: Schema.optional(Schema.Array(FieldPolicy)),
    }),
  ).annotate({
    identifier: "MethodPolicy",
  }) as any as Schema.Schema<MethodPolicy>;

export interface Control {
  /** The service controller environment to use. If empty, no control plane features (like quota and billing) will be enabled. The recommended value for most services is servicecontrol.googleapis.com. */
  environment?: string;
  /** Defines policies applying to the API methods of the service. */
  methodPolicies?: Array<MethodPolicy>;
}

export const Control: Schema.Schema<Control> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      environment: Schema.optional(Schema.String),
      methodPolicies: Schema.optional(Schema.Array(MethodPolicy)),
    }),
  ).annotate({ identifier: "Control" }) as any as Schema.Schema<Control>;

export interface LabelDescriptor {
  /** The label key. */
  key?: string;
  /** The type of data that can be assigned to the label. */
  valueType?: "STRING" | "BOOL" | "INT64" | (string & {});
  /** A human-readable description for the label. */
  description?: string;
}

export const LabelDescriptor: Schema.Schema<LabelDescriptor> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      key: Schema.optional(Schema.String),
      valueType: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LabelDescriptor",
  }) as any as Schema.Schema<LabelDescriptor>;

export interface LogDescriptor {
  /** The name of the log. It must be less than 512 characters long and can include the following characters: upper- and lower-case alphanumeric characters [A-Za-z0-9], and punctuation characters including slash, underscore, hyphen, period [/_-.]. */
  name?: string;
  /** The set of labels that are available to describe a specific log entry. Runtime requests that contain labels not specified here are considered invalid. */
  labels?: Array<LabelDescriptor>;
  /** A human-readable description of this log. This information appears in the documentation and can contain details. */
  description?: string;
  /** The human-readable name for this log. This information appears on the user interface and should be concise. */
  displayName?: string;
}

export const LogDescriptor: Schema.Schema<LogDescriptor> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Array(LabelDescriptor)),
      description: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LogDescriptor",
  }) as any as Schema.Schema<LogDescriptor>;

export interface MetricDescriptorMetadata {
  /** Deprecated. Must use the MetricDescriptor.launch_stage instead. */
  launchStage?:
    | "LAUNCH_STAGE_UNSPECIFIED"
    | "UNIMPLEMENTED"
    | "PRELAUNCH"
    | "EARLY_ACCESS"
    | "ALPHA"
    | "BETA"
    | "GA"
    | "DEPRECATED"
    | (string & {});
  /** The sampling period of metric data points. For metrics which are written periodically, consecutive data points are stored at this time interval, excluding data loss due to errors. Metrics with a higher granularity have a smaller sampling period. */
  samplePeriod?: string;
  /** The delay of data points caused by ingestion. Data points older than this age are guaranteed to be ingested and available to be read, excluding data loss due to errors. */
  ingestDelay?: string;
  /** The scope of the timeseries data of the metric. */
  timeSeriesResourceHierarchyLevel?: Array<
    | "TIME_SERIES_RESOURCE_HIERARCHY_LEVEL_UNSPECIFIED"
    | "PROJECT"
    | "ORGANIZATION"
    | "FOLDER"
    | (string & {})
  >;
}

export const MetricDescriptorMetadata: Schema.Schema<MetricDescriptorMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      launchStage: Schema.optional(Schema.String),
      samplePeriod: Schema.optional(Schema.String),
      ingestDelay: Schema.optional(Schema.String),
      timeSeriesResourceHierarchyLevel: Schema.optional(
        Schema.Array(Schema.String),
      ),
    }),
  ).annotate({
    identifier: "MetricDescriptorMetadata",
  }) as any as Schema.Schema<MetricDescriptorMetadata>;

export interface MetricDescriptor {
  /** The resource name of the metric descriptor. */
  name?: string;
  /** The metric type, including its DNS name prefix. The type is not URL-encoded. All user-defined metric types have the DNS name `custom.googleapis.com` or `external.googleapis.com`. Metric types should use a natural hierarchical grouping. For example: "custom.googleapis.com/invoice/paid/amount" "external.googleapis.com/prometheus/up" "appengine.googleapis.com/http/server/response_latencies" */
  type?: string;
  /** The set of labels that can be used to describe a specific instance of this metric type. For example, the `appengine.googleapis.com/http/server/response_latencies` metric type has a label for the HTTP response code, `response_code`, so you can look at latencies for successful responses or just for responses that failed. */
  labels?: Array<LabelDescriptor>;
  /** Whether the metric records instantaneous values, changes to a value, etc. Some combinations of `metric_kind` and `value_type` might not be supported. */
  metricKind?:
    | "METRIC_KIND_UNSPECIFIED"
    | "GAUGE"
    | "DELTA"
    | "CUMULATIVE"
    | (string & {});
  /** Whether the measurement is an integer, a floating-point number, etc. Some combinations of `metric_kind` and `value_type` might not be supported. */
  valueType?:
    | "VALUE_TYPE_UNSPECIFIED"
    | "BOOL"
    | "INT64"
    | "DOUBLE"
    | "STRING"
    | "DISTRIBUTION"
    | "MONEY"
    | (string & {});
  /** The units in which the metric value is reported. It is only applicable if the `value_type` is `INT64`, `DOUBLE`, or `DISTRIBUTION`. The `unit` defines the representation of the stored metric values. Different systems might scale the values to be more easily displayed (so a value of `0.02kBy` _might_ be displayed as `20By`, and a value of `3523kBy` _might_ be displayed as `3.5MBy`). However, if the `unit` is `kBy`, then the value of the metric is always in thousands of bytes, no matter how it might be displayed. If you want a custom metric to record the exact number of CPU-seconds used by a job, you can create an `INT64 CUMULATIVE` metric whose `unit` is `s{CPU}` (or equivalently `1s{CPU}` or just `s`). If the job uses 12,005 CPU-seconds, then the value is written as `12005`. Alternatively, if you want a custom metric to record data in a more granular way, you can create a `DOUBLE CUMULATIVE` metric whose `unit` is `ks{CPU}`, and then write the value `12.005` (which is `12005/1000`), or use `Kis{CPU}` and write `11.723` (which is `12005/1024`). The supported units are a subset of [The Unified Code for Units of Measure](https://unitsofmeasure.org/ucum.html) standard: **Basic units (UNIT)** * `bit` bit * `By` byte * `s` second * `min` minute * `h` hour * `d` day * `1` dimensionless **Prefixes (PREFIX)** * `k` kilo (10^3) * `M` mega (10^6) * `G` giga (10^9) * `T` tera (10^12) * `P` peta (10^15) * `E` exa (10^18) * `Z` zetta (10^21) * `Y` yotta (10^24) * `m` milli (10^-3) * `u` micro (10^-6) * `n` nano (10^-9) * `p` pico (10^-12) * `f` femto (10^-15) * `a` atto (10^-18) * `z` zepto (10^-21) * `y` yocto (10^-24) * `Ki` kibi (2^10) * `Mi` mebi (2^20) * `Gi` gibi (2^30) * `Ti` tebi (2^40) * `Pi` pebi (2^50) **Grammar** The grammar also includes these connectors: * `/` division or ratio (as an infix operator). For examples, `kBy/{email}` or `MiBy/10ms` (although you should almost never have `/s` in a metric `unit`; rates should always be computed at query time from the underlying cumulative or delta value). * `.` multiplication or composition (as an infix operator). For examples, `GBy.d` or `k{watt}.h`. The grammar for a unit is as follows: Expression = Component { "." Component } { "/" Component } ; Component = ( [ PREFIX ] UNIT | "%" ) [ Annotation ] | Annotation | "1" ; Annotation = "{" NAME "}" ; Notes: * `Annotation` is just a comment if it follows a `UNIT`. If the annotation is used alone, then the unit is equivalent to `1`. For examples, `{request}/s == 1/s`, `By{transmitted}/s == By/s`. * `NAME` is a sequence of non-blank printable ASCII characters not containing `{` or `}`. * `1` represents a unitary [dimensionless unit](https://en.wikipedia.org/wiki/Dimensionless_quantity) of 1, such as in `1/s`. It is typically used when none of the basic units are appropriate. For example, "new users per day" can be represented as `1/d` or `{new-users}/d` (and a metric value `5` would mean "5 new users). Alternatively, "thousands of page views per day" would be represented as `1000/d` or `k1/d` or `k{page_views}/d` (and a metric value of `5.3` would mean "5300 page views per day"). * `%` represents dimensionless value of 1/100, and annotates values giving a percentage (so the metric values are typically in the range of 0..100, and a metric value `3` means "3 percent"). * `10^2.%` indicates a metric contains a ratio, typically in the range 0..1, that will be multiplied by 100 and displayed as a percentage (so a metric value `0.03` means "3 percent"). */
  unit?: string;
  /** A detailed description of the metric, which can be used in documentation. */
  description?: string;
  /** A concise name for the metric, which can be displayed in user interfaces. Use sentence case without an ending period, for example "Request count". This field is optional but it is recommended to be set for any metrics associated with user-visible concepts, such as Quota. */
  displayName?: string;
  /** Optional. Metadata which can be used to guide usage of the metric. */
  metadata?: MetricDescriptorMetadata;
  /** Optional. The launch stage of the metric definition. */
  launchStage?:
    | "LAUNCH_STAGE_UNSPECIFIED"
    | "UNIMPLEMENTED"
    | "PRELAUNCH"
    | "EARLY_ACCESS"
    | "ALPHA"
    | "BETA"
    | "GA"
    | "DEPRECATED"
    | (string & {});
  /** Read-only. If present, then a time series, which is identified partially by a metric type and a MonitoredResourceDescriptor, that is associated with this metric type can only be associated with one of the monitored resource types listed here. */
  monitoredResourceTypes?: Array<string>;
}

export const MetricDescriptor: Schema.Schema<MetricDescriptor> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Array(LabelDescriptor)),
      metricKind: Schema.optional(Schema.String),
      valueType: Schema.optional(Schema.String),
      unit: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      metadata: Schema.optional(MetricDescriptorMetadata),
      launchStage: Schema.optional(Schema.String),
      monitoredResourceTypes: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "MetricDescriptor",
  }) as any as Schema.Schema<MetricDescriptor>;

export interface MonitoredResourceDescriptor {
  /** Optional. The resource name of the monitored resource descriptor: `"projects/{project_id}/monitoredResourceDescriptors/{type}"` where {type} is the value of the `type` field in this object and {project_id} is a project ID that provides API-specific context for accessing the type. APIs that do not use project information can use the resource name format `"monitoredResourceDescriptors/{type}"`. */
  name?: string;
  /** Required. The monitored resource type. For example, the type `"cloudsql_database"` represents databases in Google Cloud SQL. For a list of types, see [Monitored resource types](https://cloud.google.com/monitoring/api/resources) and [Logging resource types](https://cloud.google.com/logging/docs/api/v2/resource-list). */
  type?: string;
  /** Optional. A concise name for the monitored resource type that might be displayed in user interfaces. It should be a Title Cased Noun Phrase, without any article or other determiners. For example, `"Google Cloud SQL Database"`. */
  displayName?: string;
  /** Optional. A detailed description of the monitored resource type that might be used in documentation. */
  description?: string;
  /** Required. A set of labels used to describe instances of this monitored resource type. For example, an individual Google Cloud SQL database is identified by values for the labels `"database_id"` and `"zone"`. */
  labels?: Array<LabelDescriptor>;
  /** Optional. The launch stage of the monitored resource definition. */
  launchStage?:
    | "LAUNCH_STAGE_UNSPECIFIED"
    | "UNIMPLEMENTED"
    | "PRELAUNCH"
    | "EARLY_ACCESS"
    | "ALPHA"
    | "BETA"
    | "GA"
    | "DEPRECATED"
    | (string & {});
}

export const MonitoredResourceDescriptor: Schema.Schema<MonitoredResourceDescriptor> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Array(LabelDescriptor)),
      launchStage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MonitoredResourceDescriptor",
  }) as any as Schema.Schema<MonitoredResourceDescriptor>;

export interface BillingDestination {
  /** The monitored resource type. The type must be defined in Service.monitored_resources section. */
  monitoredResource?: string;
  /** Names of the metrics to report to this billing destination. Each name must be defined in Service.metrics section. */
  metrics?: Array<string>;
}

export const BillingDestination: Schema.Schema<BillingDestination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      monitoredResource: Schema.optional(Schema.String),
      metrics: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BillingDestination",
  }) as any as Schema.Schema<BillingDestination>;

export interface Billing {
  /** Billing configurations for sending metrics to the consumer project. There can be multiple consumer destinations per service, each one must have a different monitored resource type. A metric can be used in at most one consumer destination. */
  consumerDestinations?: Array<BillingDestination>;
}

export const Billing: Schema.Schema<Billing> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      consumerDestinations: Schema.optional(Schema.Array(BillingDestination)),
    }),
  ).annotate({ identifier: "Billing" }) as any as Schema.Schema<Billing>;

export interface LoggingDestination {
  /** The monitored resource type. The type must be defined in the Service.monitored_resources section. */
  monitoredResource?: string;
  /** Names of the logs to be sent to this destination. Each name must be defined in the Service.logs section. If the log name is not a domain scoped name, it will be automatically prefixed with the service name followed by "/". */
  logs?: Array<string>;
}

export const LoggingDestination: Schema.Schema<LoggingDestination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      monitoredResource: Schema.optional(Schema.String),
      logs: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "LoggingDestination",
  }) as any as Schema.Schema<LoggingDestination>;

export interface Logging {
  /** Logging configurations for sending logs to the producer project. There can be multiple producer destinations, each one must have a different monitored resource type. A log can be used in at most one producer destination. */
  producerDestinations?: Array<LoggingDestination>;
  /** Logging configurations for sending logs to the consumer project. There can be multiple consumer destinations, each one must have a different monitored resource type. A log can be used in at most one consumer destination. */
  consumerDestinations?: Array<LoggingDestination>;
}

export const Logging: Schema.Schema<Logging> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      producerDestinations: Schema.optional(Schema.Array(LoggingDestination)),
      consumerDestinations: Schema.optional(Schema.Array(LoggingDestination)),
    }),
  ).annotate({ identifier: "Logging" }) as any as Schema.Schema<Logging>;

export interface MonitoringDestination {
  /** The monitored resource type. The type must be defined in Service.monitored_resources section. */
  monitoredResource?: string;
  /** Types of the metrics to report to this monitoring destination. Each type must be defined in Service.metrics section. */
  metrics?: Array<string>;
}

export const MonitoringDestination: Schema.Schema<MonitoringDestination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      monitoredResource: Schema.optional(Schema.String),
      metrics: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "MonitoringDestination",
  }) as any as Schema.Schema<MonitoringDestination>;

export interface Monitoring {
  /** Monitoring configurations for sending metrics to the producer project. There can be multiple producer destinations. A monitored resource type may appear in multiple monitoring destinations if different aggregations are needed for different sets of metrics associated with that monitored resource type. A monitored resource and metric pair may only be used once in the Monitoring configuration. */
  producerDestinations?: Array<MonitoringDestination>;
  /** Monitoring configurations for sending metrics to the consumer project. There can be multiple consumer destinations. A monitored resource type may appear in multiple monitoring destinations if different aggregations are needed for different sets of metrics associated with that monitored resource type. A monitored resource and metric pair may only be used once in the Monitoring configuration. */
  consumerDestinations?: Array<MonitoringDestination>;
}

export const Monitoring: Schema.Schema<Monitoring> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      producerDestinations: Schema.optional(
        Schema.Array(MonitoringDestination),
      ),
      consumerDestinations: Schema.optional(
        Schema.Array(MonitoringDestination),
      ),
    }),
  ).annotate({ identifier: "Monitoring" }) as any as Schema.Schema<Monitoring>;

export interface SystemParameter {
  /** Define the name of the parameter, such as "api_key" . It is case sensitive. */
  name?: string;
  /** Define the HTTP header name to use for the parameter. It is case insensitive. */
  httpHeader?: string;
  /** Define the URL query parameter name to use for the parameter. It is case sensitive. */
  urlQueryParameter?: string;
}

export const SystemParameter: Schema.Schema<SystemParameter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      httpHeader: Schema.optional(Schema.String),
      urlQueryParameter: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SystemParameter",
  }) as any as Schema.Schema<SystemParameter>;

export interface SystemParameterRule {
  /** Selects the methods to which this rule applies. Use '*' to indicate all methods in all APIs. Refer to selector for syntax details. */
  selector?: string;
  /** Define parameters. Multiple names may be defined for a parameter. For a given method call, only one of them should be used. If multiple names are used the behavior is implementation-dependent. If none of the specified names are present the behavior is parameter-dependent. */
  parameters?: Array<SystemParameter>;
}

export const SystemParameterRule: Schema.Schema<SystemParameterRule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      selector: Schema.optional(Schema.String),
      parameters: Schema.optional(Schema.Array(SystemParameter)),
    }),
  ).annotate({
    identifier: "SystemParameterRule",
  }) as any as Schema.Schema<SystemParameterRule>;

export interface SystemParameters {
  /** Define system parameters. The parameters defined here will override the default parameters implemented by the system. If this field is missing from the service config, default system parameters will be used. Default system parameters and names is implementation-dependent. Example: define api key for all methods system_parameters rules: - selector: "*" parameters: - name: api_key url_query_parameter: api_key Example: define 2 api key names for a specific method. system_parameters rules: - selector: "/ListShelves" parameters: - name: api_key http_header: Api-Key1 - name: api_key http_header: Api-Key2 **NOTE:** All service configuration rules follow "last one wins" order. */
  rules?: Array<SystemParameterRule>;
}

export const SystemParameters: Schema.Schema<SystemParameters> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rules: Schema.optional(Schema.Array(SystemParameterRule)),
    }),
  ).annotate({
    identifier: "SystemParameters",
  }) as any as Schema.Schema<SystemParameters>;

export interface SourceInfo {
  /** All files used during config generation. */
  sourceFiles?: Array<Record<string, unknown>>;
}

export const SourceInfo: Schema.Schema<SourceInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sourceFiles: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
    }),
  ).annotate({ identifier: "SourceInfo" }) as any as Schema.Schema<SourceInfo>;

export interface LongRunning {
  /** Initial delay after which the first poll request will be made. Default value: 5 seconds. */
  initialPollDelay?: string;
  /** Multiplier to gradually increase delay between subsequent polls until it reaches max_poll_delay. Default value: 1.5. */
  pollDelayMultiplier?: number;
  /** Maximum time between two subsequent poll requests. Default value: 45 seconds. */
  maxPollDelay?: string;
  /** Total polling timeout. Default value: 5 minutes. */
  totalPollTimeout?: string;
}

export const LongRunning: Schema.Schema<LongRunning> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      initialPollDelay: Schema.optional(Schema.String),
      pollDelayMultiplier: Schema.optional(Schema.Number),
      maxPollDelay: Schema.optional(Schema.String),
      totalPollTimeout: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LongRunning",
  }) as any as Schema.Schema<LongRunning>;

export interface BatchingSettingsProto {
  /** The number of elements of a field collected into a batch which, if exceeded, causes the batch to be sent. */
  elementCountThreshold?: number;
  /** The aggregated size of the batched field which, if exceeded, causes the batch to be sent. This size is computed by aggregating the sizes of the request field to be batched, not of the entire request message. */
  requestByteThreshold?: string;
  /** The duration after which a batch should be sent, starting from the addition of the first message to that batch. */
  delayThreshold?: string;
  /** The maximum number of elements collected in a batch that could be accepted by server. */
  elementCountLimit?: number;
  /** The maximum size of the request that could be accepted by server. */
  requestByteLimit?: number;
  /** The maximum number of elements allowed by flow control. */
  flowControlElementLimit?: number;
  /** The maximum size of data allowed by flow control. */
  flowControlByteLimit?: number;
  /** The behavior to take when the flow control limit is exceeded. */
  flowControlLimitExceededBehavior?:
    | "UNSET_BEHAVIOR"
    | "THROW_EXCEPTION"
    | "BLOCK"
    | "IGNORE"
    | (string & {});
}

export const BatchingSettingsProto: Schema.Schema<BatchingSettingsProto> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      elementCountThreshold: Schema.optional(Schema.Number),
      requestByteThreshold: Schema.optional(Schema.String),
      delayThreshold: Schema.optional(Schema.String),
      elementCountLimit: Schema.optional(Schema.Number),
      requestByteLimit: Schema.optional(Schema.Number),
      flowControlElementLimit: Schema.optional(Schema.Number),
      flowControlByteLimit: Schema.optional(Schema.Number),
      flowControlLimitExceededBehavior: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BatchingSettingsProto",
  }) as any as Schema.Schema<BatchingSettingsProto>;

export interface BatchingDescriptorProto {
  /** The repeated field in the request message to be aggregated by batching. */
  batchedField?: string;
  /** A list of the fields in the request message. Two requests will be batched together only if the values of every field specified in `request_discriminator_fields` is equal between the two requests. */
  discriminatorFields?: Array<string>;
  /** Optional. When present, indicates the field in the response message to be used to demultiplex the response into multiple response messages, in correspondence with the multiple request messages originally batched together. */
  subresponseField?: string;
}

export const BatchingDescriptorProto: Schema.Schema<BatchingDescriptorProto> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      batchedField: Schema.optional(Schema.String),
      discriminatorFields: Schema.optional(Schema.Array(Schema.String)),
      subresponseField: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BatchingDescriptorProto",
  }) as any as Schema.Schema<BatchingDescriptorProto>;

export interface BatchingConfigProto {
  /** The thresholds which trigger a batched request to be sent. */
  thresholds?: BatchingSettingsProto;
  /** The request and response fields used in batching. */
  batchDescriptor?: BatchingDescriptorProto;
}

export const BatchingConfigProto: Schema.Schema<BatchingConfigProto> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      thresholds: Schema.optional(BatchingSettingsProto),
      batchDescriptor: Schema.optional(BatchingDescriptorProto),
    }),
  ).annotate({
    identifier: "BatchingConfigProto",
  }) as any as Schema.Schema<BatchingConfigProto>;

export interface MethodSettings {
  /** The fully qualified name of the method, for which the options below apply. This is used to find the method to apply the options. Example: publishing: method_settings: - selector: google.storage.control.v2.StorageControl.CreateFolder # method settings for CreateFolder... */
  selector?: string;
  /** Describes settings to use for long-running operations when generating API methods for RPCs. Complements RPCs that use the annotations in google/longrunning/operations.proto. Example of a YAML configuration:: publishing: method_settings: - selector: google.cloud.speech.v2.Speech.BatchRecognize long_running: initial_poll_delay: 60s # 1 minute poll_delay_multiplier: 1.5 max_poll_delay: 360s # 6 minutes total_poll_timeout: 54000s # 90 minutes */
  longRunning?: LongRunning;
  /** List of top-level fields of the request message, that should be automatically populated by the client libraries based on their (google.api.field_info).format. Currently supported format: UUID4. Example of a YAML configuration: publishing: method_settings: - selector: google.example.v1.ExampleService.CreateExample auto_populated_fields: - request_id */
  autoPopulatedFields?: Array<string>;
  /** Batching configuration for an API method in client libraries. Example of a YAML configuration: publishing: method_settings: - selector: google.example.v1.ExampleService.BatchCreateExample batching: element_count_threshold: 1000 request_byte_threshold: 100000000 delay_threshold_millis: 10 */
  batching?: BatchingConfigProto;
}

export const MethodSettings: Schema.Schema<MethodSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      selector: Schema.optional(Schema.String),
      longRunning: Schema.optional(LongRunning),
      autoPopulatedFields: Schema.optional(Schema.Array(Schema.String)),
      batching: Schema.optional(BatchingConfigProto),
    }),
  ).annotate({
    identifier: "MethodSettings",
  }) as any as Schema.Schema<MethodSettings>;

export interface SelectiveGapicGeneration {
  /** An allowlist of the fully qualified names of RPCs that should be included on public client surfaces. */
  methods?: Array<string>;
  /** Setting this to true indicates to the client generators that methods that would be excluded from the generation should instead be generated in a way that indicates these methods should not be consumed by end users. How this is expressed is up to individual language implementations to decide. Some examples may be: added annotations, obfuscated identifiers, or other language idiomatic patterns. */
  generateOmittedAsInternal?: boolean;
}

export const SelectiveGapicGeneration: Schema.Schema<SelectiveGapicGeneration> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      methods: Schema.optional(Schema.Array(Schema.String)),
      generateOmittedAsInternal: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "SelectiveGapicGeneration",
  }) as any as Schema.Schema<SelectiveGapicGeneration>;

export interface CommonLanguageSettings {
  /** Link to automatically generated reference documentation. Example: https://cloud.google.com/nodejs/docs/reference/asset/latest */
  referenceDocsUri?: string;
  /** The destination where API teams want this client library to be published. */
  destinations?: Array<
    | "CLIENT_LIBRARY_DESTINATION_UNSPECIFIED"
    | "GITHUB"
    | "PACKAGE_MANAGER"
    | (string & {})
  >;
  /** Configuration for which RPCs should be generated in the GAPIC client. */
  selectiveGapicGeneration?: SelectiveGapicGeneration;
}

export const CommonLanguageSettings: Schema.Schema<CommonLanguageSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      referenceDocsUri: Schema.optional(Schema.String),
      destinations: Schema.optional(Schema.Array(Schema.String)),
      selectiveGapicGeneration: Schema.optional(SelectiveGapicGeneration),
    }),
  ).annotate({
    identifier: "CommonLanguageSettings",
  }) as any as Schema.Schema<CommonLanguageSettings>;

export interface JavaSettings {
  /** The package name to use in Java. Clobbers the java_package option set in the protobuf. This should be used **only** by APIs who have already set the language_settings.java.package_name" field in gapic.yaml. API teams should use the protobuf java_package option where possible. Example of a YAML configuration:: publishing: library_settings: java_settings: library_package: com.google.cloud.pubsub.v1 */
  libraryPackage?: string;
  /** Configure the Java class name to use instead of the service's for its corresponding generated GAPIC client. Keys are fully-qualified service names as they appear in the protobuf (including the full the language_settings.java.interface_names" field in gapic.yaml. API teams should otherwise use the service name as it appears in the protobuf. Example of a YAML configuration:: publishing: java_settings: service_class_names: - google.pubsub.v1.Publisher: TopicAdmin - google.pubsub.v1.Subscriber: SubscriptionAdmin */
  serviceClassNames?: Record<string, string>;
  /** Some settings. */
  common?: CommonLanguageSettings;
}

export const JavaSettings: Schema.Schema<JavaSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      libraryPackage: Schema.optional(Schema.String),
      serviceClassNames: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      common: Schema.optional(CommonLanguageSettings),
    }),
  ).annotate({
    identifier: "JavaSettings",
  }) as any as Schema.Schema<JavaSettings>;

export interface CppSettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
}

export const CppSettings: Schema.Schema<CppSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      common: Schema.optional(CommonLanguageSettings),
    }),
  ).annotate({
    identifier: "CppSettings",
  }) as any as Schema.Schema<CppSettings>;

export interface PhpSettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
  /** The package name to use in Php. Clobbers the php_namespace option set in the protobuf. This should be used **only** by APIs who have already set the language_settings.php.package_name" field in gapic.yaml. API teams should use the protobuf php_namespace option where possible. Example of a YAML configuration:: publishing: library_settings: php_settings: library_package: Google\Cloud\PubSub\V1 */
  libraryPackage?: string;
}

export const PhpSettings: Schema.Schema<PhpSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      common: Schema.optional(CommonLanguageSettings),
      libraryPackage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PhpSettings",
  }) as any as Schema.Schema<PhpSettings>;

export interface ExperimentalFeatures {
  /** Enables generation of asynchronous REST clients if `rest` transport is enabled. By default, asynchronous REST clients will not be generated. This feature will be enabled by default 1 month after launching the feature in preview packages. */
  restAsyncIoEnabled?: boolean;
  /** Enables generation of protobuf code using new types that are more Pythonic which are included in `protobuf>=5.29.x`. This feature will be enabled by default 1 month after launching the feature in preview packages. */
  protobufPythonicTypesEnabled?: boolean;
  /** Disables generation of an unversioned Python package for this client library. This means that the module names will need to be versioned in import statements. For example `import google.cloud.library_v2` instead of `import google.cloud.library`. */
  unversionedPackageDisabled?: boolean;
}

export const ExperimentalFeatures: Schema.Schema<ExperimentalFeatures> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      restAsyncIoEnabled: Schema.optional(Schema.Boolean),
      protobufPythonicTypesEnabled: Schema.optional(Schema.Boolean),
      unversionedPackageDisabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ExperimentalFeatures",
  }) as any as Schema.Schema<ExperimentalFeatures>;

export interface PythonSettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
  /** Experimental features to be included during client library generation. */
  experimentalFeatures?: ExperimentalFeatures;
}

export const PythonSettings: Schema.Schema<PythonSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      common: Schema.optional(CommonLanguageSettings),
      experimentalFeatures: Schema.optional(ExperimentalFeatures),
    }),
  ).annotate({
    identifier: "PythonSettings",
  }) as any as Schema.Schema<PythonSettings>;

export interface NodeSettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
}

export const NodeSettings: Schema.Schema<NodeSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      common: Schema.optional(CommonLanguageSettings),
    }),
  ).annotate({
    identifier: "NodeSettings",
  }) as any as Schema.Schema<NodeSettings>;

export interface DotnetSettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
  /** Map from original service names to renamed versions. This is used when the default generated types would cause a naming conflict. (Neither name is fully-qualified.) Example: Subscriber to SubscriberServiceApi. */
  renamedServices?: Record<string, string>;
  /** Map from full resource types to the effective short name for the resource. This is used when otherwise resource named from different services would cause naming collisions. Example entry: "datalabeling.googleapis.com/Dataset": "DataLabelingDataset" */
  renamedResources?: Record<string, string>;
  /** List of full resource types to ignore during generation. This is typically used for API-specific Location resources, which should be handled by the generator as if they were actually the common Location resources. Example entry: "documentai.googleapis.com/Location" */
  ignoredResources?: Array<string>;
  /** Namespaces which must be aliased in snippets due to a known (but non-generator-predictable) naming collision */
  forcedNamespaceAliases?: Array<string>;
  /** Method signatures (in the form "service.method(signature)") which are provided separately, so shouldn't be generated. Snippets *calling* these methods are still generated, however. */
  handwrittenSignatures?: Array<string>;
}

export const DotnetSettings: Schema.Schema<DotnetSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      common: Schema.optional(CommonLanguageSettings),
      renamedServices: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      renamedResources: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      ignoredResources: Schema.optional(Schema.Array(Schema.String)),
      forcedNamespaceAliases: Schema.optional(Schema.Array(Schema.String)),
      handwrittenSignatures: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "DotnetSettings",
  }) as any as Schema.Schema<DotnetSettings>;

export interface RubySettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
}

export const RubySettings: Schema.Schema<RubySettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      common: Schema.optional(CommonLanguageSettings),
    }),
  ).annotate({
    identifier: "RubySettings",
  }) as any as Schema.Schema<RubySettings>;

export interface GoSettings {
  /** Some settings. */
  common?: CommonLanguageSettings;
  /** Map of service names to renamed services. Keys are the package relative service names and values are the name to be used for the service client and call options. Example: publishing: go_settings: renamed_services: Publisher: TopicAdmin */
  renamedServices?: Record<string, string>;
}

export const GoSettings: Schema.Schema<GoSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      common: Schema.optional(CommonLanguageSettings),
      renamedServices: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({ identifier: "GoSettings" }) as any as Schema.Schema<GoSettings>;

export interface ClientLibrarySettings {
  /** Version of the API to apply these settings to. This is the full protobuf package for the API, ending in the version element. Examples: "google.cloud.speech.v1" and "google.spanner.admin.database.v1". */
  version?: string;
  /** Launch stage of this version of the API. */
  launchStage?:
    | "LAUNCH_STAGE_UNSPECIFIED"
    | "UNIMPLEMENTED"
    | "PRELAUNCH"
    | "EARLY_ACCESS"
    | "ALPHA"
    | "BETA"
    | "GA"
    | "DEPRECATED"
    | (string & {});
  /** When using transport=rest, the client request will encode enums as numbers rather than strings. */
  restNumericEnums?: boolean;
  /** Settings for legacy Java features, supported in the Service YAML. */
  javaSettings?: JavaSettings;
  /** Settings for C++ client libraries. */
  cppSettings?: CppSettings;
  /** Settings for PHP client libraries. */
  phpSettings?: PhpSettings;
  /** Settings for Python client libraries. */
  pythonSettings?: PythonSettings;
  /** Settings for Node client libraries. */
  nodeSettings?: NodeSettings;
  /** Settings for .NET client libraries. */
  dotnetSettings?: DotnetSettings;
  /** Settings for Ruby client libraries. */
  rubySettings?: RubySettings;
  /** Settings for Go client libraries. */
  goSettings?: GoSettings;
}

export const ClientLibrarySettings: Schema.Schema<ClientLibrarySettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
      launchStage: Schema.optional(Schema.String),
      restNumericEnums: Schema.optional(Schema.Boolean),
      javaSettings: Schema.optional(JavaSettings),
      cppSettings: Schema.optional(CppSettings),
      phpSettings: Schema.optional(PhpSettings),
      pythonSettings: Schema.optional(PythonSettings),
      nodeSettings: Schema.optional(NodeSettings),
      dotnetSettings: Schema.optional(DotnetSettings),
      rubySettings: Schema.optional(RubySettings),
      goSettings: Schema.optional(GoSettings),
    }),
  ).annotate({
    identifier: "ClientLibrarySettings",
  }) as any as Schema.Schema<ClientLibrarySettings>;

export interface Publishing {
  /** A list of API method settings, e.g. the behavior for methods that use the long-running operation pattern. */
  methodSettings?: Array<MethodSettings>;
  /** Link to a *public* URI where users can report issues. Example: https://issuetracker.google.com/issues/new?component=190865&template=1161103 */
  newIssueUri?: string;
  /** Link to product home page. Example: https://cloud.google.com/asset-inventory/docs/overview */
  documentationUri?: string;
  /** Used as a tracking tag when collecting data about the APIs developer relations artifacts like docs, packages delivered to package managers, etc. Example: "speech". */
  apiShortName?: string;
  /** GitHub label to apply to issues and pull requests opened for this API. */
  githubLabel?: string;
  /** GitHub teams to be added to CODEOWNERS in the directory in GitHub containing source code for the client libraries for this API. */
  codeownerGithubTeams?: Array<string>;
  /** A prefix used in sample code when demarking regions to be included in documentation. */
  docTagPrefix?: string;
  /** For whom the client library is being published. */
  organization?:
    | "CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED"
    | "CLOUD"
    | "ADS"
    | "PHOTOS"
    | "STREET_VIEW"
    | "SHOPPING"
    | "GEO"
    | "GENERATIVE_AI"
    | (string & {});
  /** Client library settings. If the same version string appears multiple times in this list, then the last one wins. Settings from earlier settings with the same version string are discarded. */
  librarySettings?: Array<ClientLibrarySettings>;
  /** Optional link to proto reference documentation. Example: https://cloud.google.com/pubsub/lite/docs/reference/rpc */
  protoReferenceDocumentationUri?: string;
  /** Optional link to REST reference documentation. Example: https://cloud.google.com/pubsub/lite/docs/reference/rest */
  restReferenceDocumentationUri?: string;
}

export const Publishing: Schema.Schema<Publishing> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      methodSettings: Schema.optional(Schema.Array(MethodSettings)),
      newIssueUri: Schema.optional(Schema.String),
      documentationUri: Schema.optional(Schema.String),
      apiShortName: Schema.optional(Schema.String),
      githubLabel: Schema.optional(Schema.String),
      codeownerGithubTeams: Schema.optional(Schema.Array(Schema.String)),
      docTagPrefix: Schema.optional(Schema.String),
      organization: Schema.optional(Schema.String),
      librarySettings: Schema.optional(Schema.Array(ClientLibrarySettings)),
      protoReferenceDocumentationUri: Schema.optional(Schema.String),
      restReferenceDocumentationUri: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Publishing" }) as any as Schema.Schema<Publishing>;

export interface AspectRule {
  /** Required. Selects the RPC methods to which this rule applies. Refer to selector for syntax details. */
  selector?: string;
  /** Required. Rules of the configuration. The underlying schema should be defined by Aspect owners as protobuf message under `google/api/configaspects/proto`. */
  config?: Record<string, unknown>;
}

export const AspectRule: Schema.Schema<AspectRule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      selector: Schema.optional(Schema.String),
      config: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({ identifier: "AspectRule" }) as any as Schema.Schema<AspectRule>;

export interface Aspect {
  /** The type of this aspect configuration. */
  kind?: string;
  /** Content of the configuration. The underlying schema should be defined by Aspect owners as protobuf message under `google/api/configaspects/proto`. */
  spec?: Record<string, unknown>;
  /** Optional. Rules of the Configuration. */
  rules?: Array<AspectRule>;
}

export const Aspect: Schema.Schema<Aspect> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      spec: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      rules: Schema.optional(Schema.Array(AspectRule)),
    }),
  ).annotate({ identifier: "Aspect" }) as any as Schema.Schema<Aspect>;

export interface Service {
  /** The service name, which is a DNS-like logical identifier for the service, such as `calendar.googleapis.com`. The service name typically goes through DNS verification to make sure the owner of the service also owns the DNS name. */
  name?: string;
  /** The product title for this service, it is the name displayed in Google Cloud Console. */
  title?: string;
  /** The Google project that owns this service. */
  producerProjectId?: string;
  /** A unique ID for a specific instance of this message, typically assigned by the client for tracking purpose. Must be no longer than 63 characters and only lower case letters, digits, '.', '_' and '-' are allowed. If empty, the server may choose to generate one instead. */
  id?: string;
  /** A list of API interfaces exported by this service. Only the `name` field of the google.protobuf.Api needs to be provided by the configuration author, as the remaining fields will be derived from the IDL during the normalization process. It is an error to specify an API interface here which cannot be resolved against the associated IDL files. */
  apis?: Array<Api>;
  /** A list of all proto message types included in this API service. Types referenced directly or indirectly by the `apis` are automatically included. Messages which are not referenced but shall be included, such as types used by the `google.protobuf.Any` type, should be listed here by name by the configuration author. Example: types: - name: google.protobuf.Int32 */
  types?: Array<Type>;
  /** A list of all enum types included in this API service. Enums referenced directly or indirectly by the `apis` are automatically included. Enums which are not referenced but shall be included should be listed here by name by the configuration author. Example: enums: - name: google.someapi.v1.SomeEnum */
  enums?: Array<Enum>;
  /** Additional API documentation. */
  documentation?: Documentation;
  /** API backend configuration. */
  backend?: Backend;
  /** HTTP configuration. */
  http?: Http;
  /** Quota configuration. */
  quota?: Quota;
  /** Auth configuration. */
  authentication?: Authentication;
  /** Context configuration. */
  context?: Context;
  /** Configuration controlling usage of this service. */
  usage?: Usage;
  /** Custom error configuration. */
  customError?: CustomError;
  /** Configuration for network endpoints. If this is empty, then an endpoint with the same name as the service is automatically generated to service all defined APIs. WARNING: Defining any entries in the `endpoints` list disables the automatic generation of default endpoint variations (e.g., `{service}.clients6.google.com`, `content-{service}.googleapis.com`, and mTLS variants like `{service}.mtls.googleapis.com`). To retain these default variations, you are required to explicitly include your main service endpoint (e.g., `myservice.googleapis.com`) in this list alongside any other custom endpoints (like REP, GFE, etc.). */
  endpoints?: Array<Endpoint>;
  /** Configuration for the service control plane. */
  control?: Control;
  /** Defines the logs used by this service. */
  logs?: Array<LogDescriptor>;
  /** Defines the metrics used by this service. */
  metrics?: Array<MetricDescriptor>;
  /** Defines the monitored resources used by this service. This is required by the `Service.monitoring` and `Service.logging` configurations. */
  monitoredResources?: Array<MonitoredResourceDescriptor>;
  /** Billing configuration. */
  billing?: Billing;
  /** Logging configuration. */
  logging?: Logging;
  /** Monitoring configuration. */
  monitoring?: Monitoring;
  /** System parameter configuration. */
  systemParameters?: SystemParameters;
  /** Output only. The source information for this configuration if available. */
  sourceInfo?: SourceInfo;
  /** Settings for [Google Cloud Client libraries](https://cloud.google.com/apis/docs/cloud-client-libraries) generated from APIs defined as protocol buffers. */
  publishing?: Publishing;
  /** A list of all proto message types included in this API service. It serves similar purpose as [google.api.Service.types], except that these types are not needed by user-defined APIs. Therefore, they will not show up in the generated discovery doc. This field should only be used to define system APIs in ESF. */
  systemTypes?: Array<Type>;
  /** Configuration aspects. This is a repeated field to allow multiple aspects to be configured. The kind field in each ConfigAspect specifies the type of aspect. The spec field contains the configuration for that aspect. The schema for the spec field is defined by the backend service owners. */
  aspects?: Array<Aspect>;
  /** Obsolete. Do not use. This field has no semantic meaning. The service config compiler always sets this field to `3`. */
  configVersion?: number;
}

export const Service: Schema.Schema<Service> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      producerProjectId: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      apis: Schema.optional(Schema.Array(Api)),
      types: Schema.optional(Schema.Array(Type)),
      enums: Schema.optional(Schema.Array(Enum)),
      documentation: Schema.optional(Documentation),
      backend: Schema.optional(Backend),
      http: Schema.optional(Http),
      quota: Schema.optional(Quota),
      authentication: Schema.optional(Authentication),
      context: Schema.optional(Context),
      usage: Schema.optional(Usage),
      customError: Schema.optional(CustomError),
      endpoints: Schema.optional(Schema.Array(Endpoint)),
      control: Schema.optional(Control),
      logs: Schema.optional(Schema.Array(LogDescriptor)),
      metrics: Schema.optional(Schema.Array(MetricDescriptor)),
      monitoredResources: Schema.optional(
        Schema.Array(MonitoredResourceDescriptor),
      ),
      billing: Schema.optional(Billing),
      logging: Schema.optional(Logging),
      monitoring: Schema.optional(Monitoring),
      systemParameters: Schema.optional(SystemParameters),
      sourceInfo: Schema.optional(SourceInfo),
      publishing: Schema.optional(Publishing),
      systemTypes: Schema.optional(Schema.Array(Type)),
      aspects: Schema.optional(Schema.Array(Aspect)),
      configVersion: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Service" }) as any as Schema.Schema<Service>;

export interface V1beta1AddVisibilityLabelsResponse {
  /** The updated set of visibility labels for this consumer on this service. */
  labels?: Array<string>;
}

export const V1beta1AddVisibilityLabelsResponse: Schema.Schema<V1beta1AddVisibilityLabelsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labels: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "V1beta1AddVisibilityLabelsResponse",
  }) as any as Schema.Schema<V1beta1AddVisibilityLabelsResponse>;

export interface V1beta1DisableConsumerResponse {}

export const V1beta1DisableConsumerResponse: Schema.Schema<V1beta1DisableConsumerResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "V1beta1DisableConsumerResponse",
  }) as any as Schema.Schema<V1beta1DisableConsumerResponse>;

export interface V1beta1EnableConsumerResponse {}

export const V1beta1EnableConsumerResponse: Schema.Schema<V1beta1EnableConsumerResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "V1beta1EnableConsumerResponse",
  }) as any as Schema.Schema<V1beta1EnableConsumerResponse>;

export interface V1beta1DefaultIdentity {
  /** Default identity resource name. An example name would be: `services/serviceconsumermanagement.googleapis.com/projects/123/defaultIdentity` */
  name?: string;
  /** The unique and stable id of the default identity. */
  uniqueId?: string;
  /** The email address of the default identity. Calling GenerateDefaultIdentity with a deleted or purged default identity should expect does_not_exist@invalid-project.iam.gserviceaccount.com placeholder email. */
  email?: string;
  /** The Default Identity tag. If specified when creating the account, the tag must be present in activation_grants. If not specified when creating the account, the tag is set to the tag specified in activation_grants. */
  tag?: string;
}

export const V1beta1DefaultIdentity: Schema.Schema<V1beta1DefaultIdentity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      uniqueId: Schema.optional(Schema.String),
      email: Schema.optional(Schema.String),
      tag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "V1beta1DefaultIdentity",
  }) as any as Schema.Schema<V1beta1DefaultIdentity>;

export interface V1beta1GenerateDefaultIdentityResponse {
  /** DefaultIdentity that was created or retrieved. */
  identity?: V1beta1DefaultIdentity;
  /** Status of the role attachment. Under development (go/si-attach-role), currently always return ATTACH_STATUS_UNSPECIFIED) */
  attachStatus?:
    | "ATTACH_STATUS_UNSPECIFIED"
    | "ATTACHED"
    | "ATTACH_SKIPPED"
    | "PREVIOUSLY_ATTACHED"
    | "ATTACH_DENIED_BY_ORG_POLICY"
    | (string & {});
  /** Role attached to consumer project. Empty if not attached in this request. (Under development, currently always return empty.) */
  role?: string;
}

export const V1beta1GenerateDefaultIdentityResponse: Schema.Schema<V1beta1GenerateDefaultIdentityResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      identity: Schema.optional(V1beta1DefaultIdentity),
      attachStatus: Schema.optional(Schema.String),
      role: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "V1beta1GenerateDefaultIdentityResponse",
  }) as any as Schema.Schema<V1beta1GenerateDefaultIdentityResponse>;

export interface V1beta1ServiceAccount {
  /** P4 SA resource name. An example name would be: `services/serviceconsumermanagement.googleapis.com/projects/123/serviceAccounts/default` */
  name?: string;
  /** Deprecated. See b/136209818. */
  iamAccountName?: string;
  /** The unique and stable id of the service account. */
  uniqueId?: string;
  /** The email address of the service account. */
  email?: string;
  /** The P4 SA configuration tag. This must be defined in activation_grants. If not specified when creating the account, the tag is set to "default". */
  tag?: string;
}

export const V1beta1ServiceAccount: Schema.Schema<V1beta1ServiceAccount> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      iamAccountName: Schema.optional(Schema.String),
      uniqueId: Schema.optional(Schema.String),
      email: Schema.optional(Schema.String),
      tag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "V1beta1ServiceAccount",
  }) as any as Schema.Schema<V1beta1ServiceAccount>;

export interface V1beta1GenerateServiceAccountResponse {
  /** ServiceAccount that was created or retrieved. */
  account?: V1beta1ServiceAccount;
}

export const V1beta1GenerateServiceAccountResponse: Schema.Schema<V1beta1GenerateServiceAccountResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      account: Schema.optional(V1beta1ServiceAccount),
    }),
  ).annotate({
    identifier: "V1beta1GenerateServiceAccountResponse",
  }) as any as Schema.Schema<V1beta1GenerateServiceAccountResponse>;

export interface V1beta1RefreshConsumerResponse {}

export const V1beta1RefreshConsumerResponse: Schema.Schema<V1beta1RefreshConsumerResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "V1beta1RefreshConsumerResponse",
  }) as any as Schema.Schema<V1beta1RefreshConsumerResponse>;

export interface V1beta1RemoveVisibilityLabelsResponse {
  /** The updated set of visibility labels for this consumer on this service. */
  labels?: Array<string>;
}

export const V1beta1RemoveVisibilityLabelsResponse: Schema.Schema<V1beta1RemoveVisibilityLabelsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labels: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "V1beta1RemoveVisibilityLabelsResponse",
  }) as any as Schema.Schema<V1beta1RemoveVisibilityLabelsResponse>;

export interface V1Beta1DisableConsumerResponse {}

export const V1Beta1DisableConsumerResponse: Schema.Schema<V1Beta1DisableConsumerResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "V1Beta1DisableConsumerResponse",
  }) as any as Schema.Schema<V1Beta1DisableConsumerResponse>;

export interface V1Beta1EnableConsumerResponse {}

export const V1Beta1EnableConsumerResponse: Schema.Schema<V1Beta1EnableConsumerResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "V1Beta1EnableConsumerResponse",
  }) as any as Schema.Schema<V1Beta1EnableConsumerResponse>;

export interface V1Beta1ServiceIdentity {
  /** P4 service identity resource name. An example name would be: `services/serviceconsumermanagement.googleapis.com/projects/123/serviceIdentities/default` */
  name?: string;
  /** The unique and stable id of the service identity. */
  uniqueId?: string;
  /** The email address of the service identity. */
  email?: string;
  /** The P4 service identity configuration tag. This must be defined in activation_grants. If not specified when creating the account, the tag is set to "default". */
  tag?: string;
  /** The project-level IAM role defined in the service agent's grant configuration. This is the standard role intended for this service agent. This field is populated regardless of the `skip_role_attach` option in the request. If `skip_role_attach` is true, the caller can use this value to know which role they are responsible for granting. */
  projectRole?: string;
}

export const V1Beta1ServiceIdentity: Schema.Schema<V1Beta1ServiceIdentity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      uniqueId: Schema.optional(Schema.String),
      email: Schema.optional(Schema.String),
      tag: Schema.optional(Schema.String),
      projectRole: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "V1Beta1ServiceIdentity",
  }) as any as Schema.Schema<V1Beta1ServiceIdentity>;

export interface V1Beta1GenerateServiceIdentityResponse {
  /** ServiceIdentity that was created or retrieved. */
  identity?: V1Beta1ServiceIdentity;
}

export const V1Beta1GenerateServiceIdentityResponse: Schema.Schema<V1Beta1GenerateServiceIdentityResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      identity: Schema.optional(V1Beta1ServiceIdentity),
    }),
  ).annotate({
    identifier: "V1Beta1GenerateServiceIdentityResponse",
  }) as any as Schema.Schema<V1Beta1GenerateServiceIdentityResponse>;

export interface V1Beta1RefreshConsumerResponse {}

export const V1Beta1RefreshConsumerResponse: Schema.Schema<V1Beta1RefreshConsumerResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "V1Beta1RefreshConsumerResponse",
  }) as any as Schema.Schema<V1Beta1RefreshConsumerResponse>;

export interface V1Beta1BatchCreateProducerOverridesResponse {
  /** The overrides that were created. */
  overrides?: Array<V1Beta1QuotaOverride>;
}

export const V1Beta1BatchCreateProducerOverridesResponse: Schema.Schema<V1Beta1BatchCreateProducerOverridesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      overrides: Schema.optional(Schema.Array(V1Beta1QuotaOverride)),
    }),
  ).annotate({
    identifier: "V1Beta1BatchCreateProducerOverridesResponse",
  }) as any as Schema.Schema<V1Beta1BatchCreateProducerOverridesResponse>;

export interface V1Beta1ImportProducerOverridesResponse {
  /** The overrides that were created from the imported data. */
  overrides?: Array<V1Beta1QuotaOverride>;
}

export const V1Beta1ImportProducerOverridesResponse: Schema.Schema<V1Beta1ImportProducerOverridesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      overrides: Schema.optional(Schema.Array(V1Beta1QuotaOverride)),
    }),
  ).annotate({
    identifier: "V1Beta1ImportProducerOverridesResponse",
  }) as any as Schema.Schema<V1Beta1ImportProducerOverridesResponse>;

export interface V1Beta1ImportProducerQuotaPoliciesResponse {
  /** The policies that were created from the imported data. */
  policies?: Array<V1Beta1ProducerQuotaPolicy>;
}

export const V1Beta1ImportProducerQuotaPoliciesResponse: Schema.Schema<V1Beta1ImportProducerQuotaPoliciesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      policies: Schema.optional(Schema.Array(V1Beta1ProducerQuotaPolicy)),
    }),
  ).annotate({
    identifier: "V1Beta1ImportProducerQuotaPoliciesResponse",
  }) as any as Schema.Schema<V1Beta1ImportProducerQuotaPoliciesResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

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
  T.Http({ method: "GET", path: "v1beta1/operations/{operationsId}" }),
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

export interface ListServicesConsumerQuotaMetricsRequest {
  /** Parent of the quotas resource. An example parent would be: `services/serviceconsumermanagement.googleapis.com/projects/123` */
  parent: string;
  /** Requested size of the next page of data. */
  pageSize?: number;
  /** Token identifying which result to start with; returned by a previous list call. */
  pageToken?: string;
  /** Specifies the level of detail for quota information in the response. */
  view?: "QUOTA_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const ListServicesConsumerQuotaMetricsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/services/{servicesId}/{servicesId1}/{servicesId2}/consumerQuotaMetrics",
    }),
    svc,
  ) as unknown as Schema.Schema<ListServicesConsumerQuotaMetricsRequest>;

export type ListServicesConsumerQuotaMetricsResponse =
  V1Beta1ListConsumerQuotaMetricsResponse;
export const ListServicesConsumerQuotaMetricsResponse =
  /*@__PURE__*/ /*#__PURE__*/ V1Beta1ListConsumerQuotaMetricsResponse;

export type ListServicesConsumerQuotaMetricsError = DefaultErrors;

/** Retrieves a summary of all quota information about this consumer that is visible to the service producer, for each quota metric defined by the service. Each metric includes information about all of its defined limits. Each limit includes the limit configuration (quota unit, preciseness, default value), the current effective limit value, and all of the overrides applied to the limit. */
export const listServicesConsumerQuotaMetrics: API.PaginatedOperationMethod<
  ListServicesConsumerQuotaMetricsRequest,
  ListServicesConsumerQuotaMetricsResponse,
  ListServicesConsumerQuotaMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListServicesConsumerQuotaMetricsRequest,
  output: ListServicesConsumerQuotaMetricsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetServicesConsumerQuotaMetricsRequest {
  /** The resource name of the quota metric, returned by a ListConsumerQuotaMetrics call. An example name would be: `services/compute.googleapis.com/projects/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus` */
  name: string;
  /** Specifies the level of detail for quota information in the response. */
  view?: "QUOTA_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const GetServicesConsumerQuotaMetricsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/services/{servicesId}/{servicesId1}/{servicesId2}/consumerQuotaMetrics/{consumerQuotaMetricsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetServicesConsumerQuotaMetricsRequest>;

export type GetServicesConsumerQuotaMetricsResponse =
  V1Beta1ConsumerQuotaMetric;
export const GetServicesConsumerQuotaMetricsResponse =
  /*@__PURE__*/ /*#__PURE__*/ V1Beta1ConsumerQuotaMetric;

export type GetServicesConsumerQuotaMetricsError = DefaultErrors;

/** Retrieves a summary of quota information for a specific quota metric. */
export const getServicesConsumerQuotaMetrics: API.OperationMethod<
  GetServicesConsumerQuotaMetricsRequest,
  GetServicesConsumerQuotaMetricsResponse,
  GetServicesConsumerQuotaMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetServicesConsumerQuotaMetricsRequest,
  output: GetServicesConsumerQuotaMetricsResponse,
  errors: [],
}));

export interface ImportProducerOverridesServicesConsumerQuotaMetricsRequest {
  /** The resource name of the consumer. An example name would be: `services/compute.googleapis.com/projects/123` */
  parent: string;
  /** Request body */
  body?: V1Beta1ImportProducerOverridesRequest;
}

export const ImportProducerOverridesServicesConsumerQuotaMetricsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(V1Beta1ImportProducerOverridesRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/services/{servicesId}/{servicesId1}/{servicesId2}/consumerQuotaMetrics:importProducerOverrides",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ImportProducerOverridesServicesConsumerQuotaMetricsRequest>;

export type ImportProducerOverridesServicesConsumerQuotaMetricsResponse =
  Operation;
export const ImportProducerOverridesServicesConsumerQuotaMetricsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type ImportProducerOverridesServicesConsumerQuotaMetricsError =
  DefaultErrors;

/** Create or update multiple producer overrides atomically, all on the same consumer, but on many different metrics or limits. The name field in the quota override message should not be set. */
export const importProducerOverridesServicesConsumerQuotaMetrics: API.OperationMethod<
  ImportProducerOverridesServicesConsumerQuotaMetricsRequest,
  ImportProducerOverridesServicesConsumerQuotaMetricsResponse,
  ImportProducerOverridesServicesConsumerQuotaMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportProducerOverridesServicesConsumerQuotaMetricsRequest,
  output: ImportProducerOverridesServicesConsumerQuotaMetricsResponse,
  errors: [],
}));

export interface ImportProducerQuotaPoliciesServicesConsumerQuotaMetricsRequest {
  /** The resource name of the consumer. An example name would be: `services/compute.googleapis.com/organizations/123` */
  parent: string;
  /** Request body */
  body?: V1Beta1ImportProducerQuotaPoliciesRequest;
}

export const ImportProducerQuotaPoliciesServicesConsumerQuotaMetricsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(V1Beta1ImportProducerQuotaPoliciesRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/services/{servicesId}/{servicesId1}/{servicesId2}/consumerQuotaMetrics:importProducerQuotaPolicies",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ImportProducerQuotaPoliciesServicesConsumerQuotaMetricsRequest>;

export type ImportProducerQuotaPoliciesServicesConsumerQuotaMetricsResponse =
  Operation;
export const ImportProducerQuotaPoliciesServicesConsumerQuotaMetricsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type ImportProducerQuotaPoliciesServicesConsumerQuotaMetricsError =
  DefaultErrors;

/** Create or update multiple producer quota policies atomically, all on the same ancestor, but on many different metrics or limits. The name field in the quota policy message should not be set. */
export const importProducerQuotaPoliciesServicesConsumerQuotaMetrics: API.OperationMethod<
  ImportProducerQuotaPoliciesServicesConsumerQuotaMetricsRequest,
  ImportProducerQuotaPoliciesServicesConsumerQuotaMetricsResponse,
  ImportProducerQuotaPoliciesServicesConsumerQuotaMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportProducerQuotaPoliciesServicesConsumerQuotaMetricsRequest,
  output: ImportProducerQuotaPoliciesServicesConsumerQuotaMetricsResponse,
  errors: [],
}));

export interface GetServicesConsumerQuotaMetricsLimitsRequest {
  /** The resource name of the quota limit, returned by a ListConsumerQuotaMetrics or GetConsumerQuotaMetric call. An example name would be: `services/compute.googleapis.com/projects/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion` */
  name: string;
  /** Specifies the level of detail for quota information in the response. */
  view?: "QUOTA_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const GetServicesConsumerQuotaMetricsLimitsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/services/{servicesId}/{servicesId1}/{servicesId2}/consumerQuotaMetrics/{consumerQuotaMetricsId}/limits/{limitsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetServicesConsumerQuotaMetricsLimitsRequest>;

export type GetServicesConsumerQuotaMetricsLimitsResponse =
  V1Beta1ConsumerQuotaLimit;
export const GetServicesConsumerQuotaMetricsLimitsResponse =
  /*@__PURE__*/ /*#__PURE__*/ V1Beta1ConsumerQuotaLimit;

export type GetServicesConsumerQuotaMetricsLimitsError = DefaultErrors;

/** Retrieves a summary of quota information for a specific quota limit. */
export const getServicesConsumerQuotaMetricsLimits: API.OperationMethod<
  GetServicesConsumerQuotaMetricsLimitsRequest,
  GetServicesConsumerQuotaMetricsLimitsResponse,
  GetServicesConsumerQuotaMetricsLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetServicesConsumerQuotaMetricsLimitsRequest,
  output: GetServicesConsumerQuotaMetricsLimitsResponse,
  errors: [],
}));

export interface CreateServicesConsumerQuotaMetricsLimitsProducerOverridesRequest {
  /** The resource name of the parent quota limit, returned by a ListConsumerQuotaMetrics or GetConsumerQuotaMetric call. An example name would be: `services/compute.googleapis.com/projects/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion` */
  parent: string;
  /** Whether to force the creation of the quota override. Setting the force parameter to 'true' ignores all quota safety checks that would fail the request. QuotaSafetyCheck lists all such validations. */
  force?: boolean;
  /** The list of quota safety checks to ignore before the override mutation. Unlike 'force' field that ignores all the quota safety checks, the 'force_only' field ignores only the specified checks; other checks are still enforced. The 'force' and 'force_only' fields cannot both be set. */
  forceOnly?:
    | "QUOTA_SAFETY_CHECK_UNSPECIFIED"
    | "LIMIT_DECREASE_BELOW_USAGE"
    | "LIMIT_DECREASE_PERCENTAGE_TOO_HIGH"
    | (string & {})[];
  /** If force option is set to true, force_justification is suggested to be set to log the reason in audit logs. */
  forceJustification?: string;
  /** Request body */
  body?: V1Beta1QuotaOverride;
}

export const CreateServicesConsumerQuotaMetricsLimitsProducerOverridesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
    forceOnly: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("forceOnly"),
    ),
    forceJustification: Schema.optional(Schema.String).pipe(
      T.HttpQuery("forceJustification"),
    ),
    body: Schema.optional(V1Beta1QuotaOverride).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/services/{servicesId}/{servicesId1}/{servicesId2}/consumerQuotaMetrics/{consumerQuotaMetricsId}/limits/{limitsId}/producerOverrides",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateServicesConsumerQuotaMetricsLimitsProducerOverridesRequest>;

export type CreateServicesConsumerQuotaMetricsLimitsProducerOverridesResponse =
  Operation;
export const CreateServicesConsumerQuotaMetricsLimitsProducerOverridesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateServicesConsumerQuotaMetricsLimitsProducerOverridesError =
  DefaultErrors;

/** Creates a producer override. A producer override is applied by the owner or administrator of a service to increase or decrease the amount of quota a consumer of the service is allowed to use. To create multiple overrides at once, use ImportProducerOverrides instead. If an override with the specified dimensions already exists, this call will fail. To overwrite an existing override if one is already present ("upsert" semantics), use ImportProducerOverrides instead. */
export const createServicesConsumerQuotaMetricsLimitsProducerOverrides: API.OperationMethod<
  CreateServicesConsumerQuotaMetricsLimitsProducerOverridesRequest,
  CreateServicesConsumerQuotaMetricsLimitsProducerOverridesResponse,
  CreateServicesConsumerQuotaMetricsLimitsProducerOverridesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateServicesConsumerQuotaMetricsLimitsProducerOverridesRequest,
  output: CreateServicesConsumerQuotaMetricsLimitsProducerOverridesResponse,
  errors: [],
}));

export interface PatchServicesConsumerQuotaMetricsLimitsProducerOverridesRequest {
  /** The resource name of the override to update. An example name would be: `services/compute.googleapis.com/projects/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion/producerOverrides/4a3f2c1d` */
  name: string;
  /** Whether to force the update of the quota override. Setting the force parameter to 'true' ignores all quota safety checks that would fail the request. QuotaSafetyCheck lists all such validations. */
  force?: boolean;
  /** Update only the specified fields. If unset, all modifiable fields will be updated. */
  updateMask?: string;
  /** The list of quota safety checks to ignore before the override mutation. Unlike 'force' field that ignores all the quota safety checks, the 'force_only' field ignores only the specified checks; other checks are still enforced. The 'force' and 'force_only' fields cannot both be set. */
  forceOnly?:
    | "QUOTA_SAFETY_CHECK_UNSPECIFIED"
    | "LIMIT_DECREASE_BELOW_USAGE"
    | "LIMIT_DECREASE_PERCENTAGE_TOO_HIGH"
    | (string & {})[];
  /** If force option is set to true, force_justification is suggested to be set to log the reason in audit logs. */
  forceJustification?: string;
  /** Request body */
  body?: V1Beta1QuotaOverride;
}

export const PatchServicesConsumerQuotaMetricsLimitsProducerOverridesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    forceOnly: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("forceOnly"),
    ),
    forceJustification: Schema.optional(Schema.String).pipe(
      T.HttpQuery("forceJustification"),
    ),
    body: Schema.optional(V1Beta1QuotaOverride).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta1/services/{servicesId}/{servicesId1}/{servicesId2}/consumerQuotaMetrics/{consumerQuotaMetricsId}/limits/{limitsId}/producerOverrides/{producerOverridesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchServicesConsumerQuotaMetricsLimitsProducerOverridesRequest>;

export type PatchServicesConsumerQuotaMetricsLimitsProducerOverridesResponse =
  Operation;
export const PatchServicesConsumerQuotaMetricsLimitsProducerOverridesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchServicesConsumerQuotaMetricsLimitsProducerOverridesError =
  DefaultErrors;

/** Updates a producer override. */
export const patchServicesConsumerQuotaMetricsLimitsProducerOverrides: API.OperationMethod<
  PatchServicesConsumerQuotaMetricsLimitsProducerOverridesRequest,
  PatchServicesConsumerQuotaMetricsLimitsProducerOverridesResponse,
  PatchServicesConsumerQuotaMetricsLimitsProducerOverridesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchServicesConsumerQuotaMetricsLimitsProducerOverridesRequest,
  output: PatchServicesConsumerQuotaMetricsLimitsProducerOverridesResponse,
  errors: [],
}));

export interface DeleteServicesConsumerQuotaMetricsLimitsProducerOverridesRequest {
  /** The resource name of the override to delete. An example name would be: `services/compute.googleapis.com/projects/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion/producerOverrides/4a3f2c1d` */
  name: string;
  /** Whether to force the deletion of the quota override. Setting the force parameter to 'true' ignores all quota safety checks that would fail the request. QuotaSafetyCheck lists all such validations. */
  force?: boolean;
  /** The list of quota safety checks to ignore before the override mutation. Unlike 'force' field that ignores all the quota safety checks, the 'force_only' field ignores only the specified checks; other checks are still enforced. The 'force' and 'force_only' fields cannot both be set. */
  forceOnly?:
    | "QUOTA_SAFETY_CHECK_UNSPECIFIED"
    | "LIMIT_DECREASE_BELOW_USAGE"
    | "LIMIT_DECREASE_PERCENTAGE_TOO_HIGH"
    | (string & {})[];
  /** If force option is set to true, force_justification is suggested to be set to log the reason in audit logs. */
  forceJustification?: string;
}

export const DeleteServicesConsumerQuotaMetricsLimitsProducerOverridesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
    forceOnly: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("forceOnly"),
    ),
    forceJustification: Schema.optional(Schema.String).pipe(
      T.HttpQuery("forceJustification"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/services/{servicesId}/{servicesId1}/{servicesId2}/consumerQuotaMetrics/{consumerQuotaMetricsId}/limits/{limitsId}/producerOverrides/{producerOverridesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteServicesConsumerQuotaMetricsLimitsProducerOverridesRequest>;

export type DeleteServicesConsumerQuotaMetricsLimitsProducerOverridesResponse =
  Operation;
export const DeleteServicesConsumerQuotaMetricsLimitsProducerOverridesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteServicesConsumerQuotaMetricsLimitsProducerOverridesError =
  DefaultErrors;

/** Deletes a producer override. */
export const deleteServicesConsumerQuotaMetricsLimitsProducerOverrides: API.OperationMethod<
  DeleteServicesConsumerQuotaMetricsLimitsProducerOverridesRequest,
  DeleteServicesConsumerQuotaMetricsLimitsProducerOverridesResponse,
  DeleteServicesConsumerQuotaMetricsLimitsProducerOverridesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteServicesConsumerQuotaMetricsLimitsProducerOverridesRequest,
  output: DeleteServicesConsumerQuotaMetricsLimitsProducerOverridesResponse,
  errors: [],
}));

export interface ListServicesConsumerQuotaMetricsLimitsProducerOverridesRequest {
  /** The resource name of the parent quota limit, returned by a ListConsumerQuotaMetrics or GetConsumerQuotaMetric call. An example name would be: `services/compute.googleapis.com/projects/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion` */
  parent: string;
  /** Requested size of the next page of data. */
  pageSize?: number;
  /** Token identifying which result to start with; returned by a previous list call. */
  pageToken?: string;
}

export const ListServicesConsumerQuotaMetricsLimitsProducerOverridesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/services/{servicesId}/{servicesId1}/{servicesId2}/consumerQuotaMetrics/{consumerQuotaMetricsId}/limits/{limitsId}/producerOverrides",
    }),
    svc,
  ) as unknown as Schema.Schema<ListServicesConsumerQuotaMetricsLimitsProducerOverridesRequest>;

export type ListServicesConsumerQuotaMetricsLimitsProducerOverridesResponse =
  V1Beta1ListProducerOverridesResponse;
export const ListServicesConsumerQuotaMetricsLimitsProducerOverridesResponse =
  /*@__PURE__*/ /*#__PURE__*/ V1Beta1ListProducerOverridesResponse;

export type ListServicesConsumerQuotaMetricsLimitsProducerOverridesError =
  DefaultErrors;

/** Lists all producer overrides on this limit. */
export const listServicesConsumerQuotaMetricsLimitsProducerOverrides: API.PaginatedOperationMethod<
  ListServicesConsumerQuotaMetricsLimitsProducerOverridesRequest,
  ListServicesConsumerQuotaMetricsLimitsProducerOverridesResponse,
  ListServicesConsumerQuotaMetricsLimitsProducerOverridesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListServicesConsumerQuotaMetricsLimitsProducerOverridesRequest,
  output: ListServicesConsumerQuotaMetricsLimitsProducerOverridesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesRequest {
  /** Required. The resource name of the parent quota limit. An example name would be: `services/compute.googleapis.com/organizations/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion` */
  parent: string;
  /** Whether to force the creation of the quota policy. If the policy creation would decrease the default limit of any consumer tier by more than 10 percent, the call is rejected, as a safety measure to avoid accidentally decreasing quota too quickly. Setting the force parameter to true ignores this restriction. */
  force?: boolean;
  /** If set to true, validate the request, but do not actually update. */
  validateOnly?: boolean;
  /** If force option is set to true, force_justification is suggested to be set to log the reason in audit logs. */
  forceJustification?: string;
  /** Request body */
  body?: V1Beta1ProducerQuotaPolicy;
}

export const CreateServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    forceJustification: Schema.optional(Schema.String).pipe(
      T.HttpQuery("forceJustification"),
    ),
    body: Schema.optional(V1Beta1ProducerQuotaPolicy).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/services/{servicesId}/{servicesId1}/{servicesId2}/consumerQuotaMetrics/{consumerQuotaMetricsId}/limits/{limitsId}/producerQuotaPolicies",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesRequest>;

export type CreateServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesResponse =
  Operation;
export const CreateServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesError =
  DefaultErrors;

/** Creates a producer quota policy. A producer quota policy is applied by the owner or administrator of a service at an org or folder node to set the default quota limit for all consumers under the node where the policy is created. To create multiple policies at once, use ImportProducerQuotaPolicies instead. If a policy with the specified dimensions already exists, this call will fail. To overwrite an existing policy if one is already present ("upsert" semantics), use ImportProducerQuotaPolicies instead. */
export const createServicesConsumerQuotaMetricsLimitsProducerQuotaPolicies: API.OperationMethod<
  CreateServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesRequest,
  CreateServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesResponse,
  CreateServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesRequest,
  output: CreateServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesResponse,
  errors: [],
}));

export interface PatchServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesRequest {
  /** The resource name of the producer policy. An example name would be: `services/compute.googleapis.com/organizations/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion/producerQuotaPolicies/4a3f2c1d` */
  name: string;
  /** Whether to force the update of the quota policy. If the policy update would decrease the default limit of any consumer tier by more than 10 percent, the call is rejected, as a safety measure to avoid accidentally decreasing quota too quickly. Setting the force parameter to true ignores this restriction. */
  force?: boolean;
  /** Update only the specified fields. If unset, all modifiable fields will be updated. */
  updateMask?: string;
  /** If set to true, validate the request, but do not actually update. */
  validateOnly?: boolean;
  /** If force option is set to true, force_justification is suggested to be set to log the reason in audit logs. */
  forceJustification?: string;
  /** Request body */
  body?: V1Beta1ProducerQuotaPolicy;
}

export const PatchServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    forceJustification: Schema.optional(Schema.String).pipe(
      T.HttpQuery("forceJustification"),
    ),
    body: Schema.optional(V1Beta1ProducerQuotaPolicy).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta1/services/{servicesId}/{servicesId1}/{servicesId2}/consumerQuotaMetrics/{consumerQuotaMetricsId}/limits/{limitsId}/producerQuotaPolicies/{producerQuotaPoliciesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesRequest>;

export type PatchServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesResponse =
  Operation;
export const PatchServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesError =
  DefaultErrors;

/** Updates a producer quota policy. */
export const patchServicesConsumerQuotaMetricsLimitsProducerQuotaPolicies: API.OperationMethod<
  PatchServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesRequest,
  PatchServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesResponse,
  PatchServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesRequest,
  output: PatchServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesResponse,
  errors: [],
}));

export interface DeleteServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesRequest {
  /** Required. The resource name of the policy to delete. An example name would be: `services/compute.googleapis.com/organizations/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion/producerQuotaPolicies/4a3f2c1d` */
  name: string;
  /** Whether to force the deletion of the quota policy. If the policy deletion would decrease the default limit of any consumer tier by more than 10 percent, the call is rejected, as a safety measure to avoid accidentally decreasing quota too quickly. Setting the force parameter to true ignores this restriction. */
  force?: boolean;
  /** If set to true, validate the request, but do not actually update. */
  validateOnly?: boolean;
  /** If force option is set to true, force_justification is suggested to be set to log the reason in audit logs. */
  forceJustification?: string;
}

export const DeleteServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    forceJustification: Schema.optional(Schema.String).pipe(
      T.HttpQuery("forceJustification"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/services/{servicesId}/{servicesId1}/{servicesId2}/consumerQuotaMetrics/{consumerQuotaMetricsId}/limits/{limitsId}/producerQuotaPolicies/{producerQuotaPoliciesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesRequest>;

export type DeleteServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesResponse =
  Operation;
export const DeleteServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesError =
  DefaultErrors;

/** Deletes a producer quota policy. */
export const deleteServicesConsumerQuotaMetricsLimitsProducerQuotaPolicies: API.OperationMethod<
  DeleteServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesRequest,
  DeleteServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesResponse,
  DeleteServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesRequest,
  output: DeleteServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesResponse,
  errors: [],
}));

export interface ListServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesRequest {
  /** Required. The resource name of the parent quota limit. An example name would be: `services/compute.googleapis.com/organizations/123/consumerQuotaMetrics/compute.googleapis.com%2Fcpus/limits/%2Fproject%2Fregion` */
  parent: string;
  /** Requested size of the next page of data. */
  pageSize?: number;
  /** Token identifying which result to start with; returned by a previous list call. */
  pageToken?: string;
}

export const ListServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/services/{servicesId}/{servicesId1}/{servicesId2}/consumerQuotaMetrics/{consumerQuotaMetricsId}/limits/{limitsId}/producerQuotaPolicies",
    }),
    svc,
  ) as unknown as Schema.Schema<ListServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesRequest>;

export type ListServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesResponse =
  V1Beta1ListProducerQuotaPoliciesResponse;
export const ListServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesResponse =
  /*@__PURE__*/ /*#__PURE__*/ V1Beta1ListProducerQuotaPoliciesResponse;

export type ListServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesError =
  DefaultErrors;

/** Lists all producer policies created at current consumer node for a limit. */
export const listServicesConsumerQuotaMetricsLimitsProducerQuotaPolicies: API.PaginatedOperationMethod<
  ListServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesRequest,
  ListServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesResponse,
  ListServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesRequest,
  output: ListServicesConsumerQuotaMetricsLimitsProducerQuotaPoliciesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
