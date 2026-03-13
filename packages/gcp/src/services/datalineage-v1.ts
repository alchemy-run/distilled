// ==========================================================================
// Data Lineage API (datalineage v1)
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
  name: "datalineage",
  version: "v1",
  rootUrl: "https://datalineage.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleRpcStatus {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.Number),
      message: Schema.optional(Schema.String),
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
    }),
  ).annotate({
    identifier: "GoogleRpcStatus",
  }) as any as Schema.Schema<GoogleRpcStatus>;

export interface GoogleLongrunningOperation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: GoogleRpcStatus;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      done: Schema.optional(Schema.Boolean),
      error: Schema.optional(GoogleRpcStatus),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "GoogleLongrunningOperation",
  }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleLongrunningListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<GoogleLongrunningOperation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const GoogleLongrunningListOperationsResponse: Schema.Schema<GoogleLongrunningListOperationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      operations: Schema.optional(Schema.Array(GoogleLongrunningOperation)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleLongrunningListOperationsResponse",
  }) as any as Schema.Schema<GoogleLongrunningListOperationsResponse>;

export interface GoogleProtobufEmpty {}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleProtobufEmpty",
  }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleLongrunningCancelOperationRequest {}

export const GoogleLongrunningCancelOperationRequest: Schema.Schema<GoogleLongrunningCancelOperationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleLongrunningCancelOperationRequest",
  }) as any as Schema.Schema<GoogleLongrunningCancelOperationRequest>;

export interface GoogleCloudDatacatalogLineageV1ProcessOpenLineageRunEventResponse {
  /** Created process name. Format: `projects/{project}/locations/{location}/processes/{process}`. */
  process?: string;
  /** Created run name. Format: `projects/{project}/locations/{location}/processes/{process}/runs/{run}`. */
  run?: string;
  /** Created lineage event names. Format: `projects/{project}/locations/{location}/processes/{process}/runs/{run}/lineageEvents/{lineage_event}`. */
  lineageEvents?: Array<string>;
}

export const GoogleCloudDatacatalogLineageV1ProcessOpenLineageRunEventResponse: Schema.Schema<GoogleCloudDatacatalogLineageV1ProcessOpenLineageRunEventResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      process: Schema.optional(Schema.String),
      run: Schema.optional(Schema.String),
      lineageEvents: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatacatalogLineageV1ProcessOpenLineageRunEventResponse",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageV1ProcessOpenLineageRunEventResponse>;

export interface GoogleCloudDatacatalogLineageV1Origin {
  /** Type of the source. Use of a source_type other than `CUSTOM` for process creation or updating is highly discouraged. It might be restricted in the future without notice. There will be increase in cost if you use any of the source types other than `CUSTOM`. */
  sourceType?:
    | "SOURCE_TYPE_UNSPECIFIED"
    | "CUSTOM"
    | "BIGQUERY"
    | "DATA_FUSION"
    | "COMPOSER"
    | "LOOKER_STUDIO"
    | "DATAPROC"
    | "VERTEX_AI"
    | (string & {});
  /** If the source_type isn't CUSTOM, the value of this field should be a Google Cloud resource name of the system, which reports lineage. The project and location parts of the resource name must match the project and location of the lineage resource being created. Examples: - `{source_type: COMPOSER, name: "projects/foo/locations/us/environments/bar"}` - `{source_type: BIGQUERY, name: "projects/foo/locations/eu"}` - `{source_type: CUSTOM, name: "myCustomIntegration"}` */
  name?: string;
}

export const GoogleCloudDatacatalogLineageV1Origin: Schema.Schema<GoogleCloudDatacatalogLineageV1Origin> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sourceType: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatacatalogLineageV1Origin",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageV1Origin>;

export interface GoogleCloudDatacatalogLineageV1Process {
  /** Immutable. The resource name of the lineage process. Format: `projects/{project}/locations/{location}/processes/{process}`. Can be specified or auto-assigned. {process} must be not longer than 200 characters and only contain characters in a set: `a-zA-Z0-9_-:.` */
  name?: string;
  /** Optional. A human-readable name you can set to display in a user interface. Must be not longer than 200 characters and only contain UTF-8 letters or numbers, spaces or characters like `_-:&.` */
  displayName?: string;
  /** Optional. The attributes of the process. Should only be used for the purpose of non-semantic management (classifying, describing or labeling the process). Up to 100 attributes are allowed. */
  attributes?: Record<string, unknown>;
  /** Optional. The origin of this process and its runs and lineage events. */
  origin?: GoogleCloudDatacatalogLineageV1Origin;
}

export const GoogleCloudDatacatalogLineageV1Process: Schema.Schema<GoogleCloudDatacatalogLineageV1Process> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      attributes: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      origin: Schema.optional(GoogleCloudDatacatalogLineageV1Origin),
    }),
  ).annotate({
    identifier: "GoogleCloudDatacatalogLineageV1Process",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageV1Process>;

export interface GoogleCloudDatacatalogLineageV1ListProcessesResponse {
  /** The processes from the specified project and location. */
  processes?: Array<GoogleCloudDatacatalogLineageV1Process>;
  /** The token to specify as `page_token` in the next call to get the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudDatacatalogLineageV1ListProcessesResponse: Schema.Schema<GoogleCloudDatacatalogLineageV1ListProcessesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      processes: Schema.optional(
        Schema.Array(GoogleCloudDatacatalogLineageV1Process),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatacatalogLineageV1ListProcessesResponse",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageV1ListProcessesResponse>;

export interface GoogleCloudDatacatalogLineageV1Run {
  /** Immutable. The resource name of the run. Format: `projects/{project}/locations/{location}/processes/{process}/runs/{run}`. Can be specified or auto-assigned. {run} must be not longer than 200 characters and only contain characters in a set: `a-zA-Z0-9_-:.` */
  name?: string;
  /** Optional. A human-readable name you can set to display in a user interface. Must be not longer than 1024 characters and only contain UTF-8 letters or numbers, spaces or characters like `_-:&.` */
  displayName?: string;
  /** Optional. The attributes of the run. Should only be used for the purpose of non-semantic management (classifying, describing or labeling the run). Up to 100 attributes are allowed. */
  attributes?: Record<string, unknown>;
  /** Required. The timestamp of the start of the run. */
  startTime?: string;
  /** Optional. The timestamp of the end of the run. */
  endTime?: string;
  /** Required. The state of the run. */
  state?:
    | "UNKNOWN"
    | "STARTED"
    | "COMPLETED"
    | "FAILED"
    | "ABORTED"
    | (string & {});
}

export const GoogleCloudDatacatalogLineageV1Run: Schema.Schema<GoogleCloudDatacatalogLineageV1Run> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      attributes: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatacatalogLineageV1Run",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageV1Run>;

export interface GoogleCloudDatacatalogLineageV1ListRunsResponse {
  /** The runs from the specified project and location. */
  runs?: Array<GoogleCloudDatacatalogLineageV1Run>;
  /** The token to specify as `page_token` in the next call to get the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudDatacatalogLineageV1ListRunsResponse: Schema.Schema<GoogleCloudDatacatalogLineageV1ListRunsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      runs: Schema.optional(Schema.Array(GoogleCloudDatacatalogLineageV1Run)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatacatalogLineageV1ListRunsResponse",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageV1ListRunsResponse>;

export interface GoogleCloudDatacatalogLineageV1EntityReference {
  /** Required. [Fully Qualified Name (FQN)](https://cloud.google.com/dataplex/docs/fully-qualified-names) of the entity. */
  fullyQualifiedName?: string;
}

export const GoogleCloudDatacatalogLineageV1EntityReference: Schema.Schema<GoogleCloudDatacatalogLineageV1EntityReference> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fullyQualifiedName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatacatalogLineageV1EntityReference",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageV1EntityReference>;

export interface GoogleCloudDatacatalogLineageV1EventLink {
  /** Required. Reference to the source entity */
  source?: GoogleCloudDatacatalogLineageV1EntityReference;
  /** Required. Reference to the target entity */
  target?: GoogleCloudDatacatalogLineageV1EntityReference;
}

export const GoogleCloudDatacatalogLineageV1EventLink: Schema.Schema<GoogleCloudDatacatalogLineageV1EventLink> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      source: Schema.optional(GoogleCloudDatacatalogLineageV1EntityReference),
      target: Schema.optional(GoogleCloudDatacatalogLineageV1EntityReference),
    }),
  ).annotate({
    identifier: "GoogleCloudDatacatalogLineageV1EventLink",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageV1EventLink>;

export interface GoogleCloudDatacatalogLineageV1LineageEvent {
  /** Immutable. The resource name of the lineage event. Format: `projects/{project}/locations/{location}/processes/{process}/runs/{run}/lineageEvents/{lineage_event}`. Can be specified or auto-assigned. {lineage_event} must be not longer than 200 characters and only contain characters in a set: `a-zA-Z0-9_-:.` */
  name?: string;
  /** Optional. List of source-target pairs. Can't contain more than 100 tuples. */
  links?: Array<GoogleCloudDatacatalogLineageV1EventLink>;
  /** Required. The beginning of the transformation which resulted in this lineage event. For streaming scenarios, it should be the beginning of the period from which the lineage is being reported. */
  startTime?: string;
  /** Optional. The end of the transformation which resulted in this lineage event. For streaming scenarios, it should be the end of the period from which the lineage is being reported. */
  endTime?: string;
}

export const GoogleCloudDatacatalogLineageV1LineageEvent: Schema.Schema<GoogleCloudDatacatalogLineageV1LineageEvent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      links: Schema.optional(
        Schema.Array(GoogleCloudDatacatalogLineageV1EventLink),
      ),
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatacatalogLineageV1LineageEvent",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageV1LineageEvent>;

export interface GoogleCloudDatacatalogLineageV1ListLineageEventsResponse {
  /** Lineage events from the specified project and location. */
  lineageEvents?: Array<GoogleCloudDatacatalogLineageV1LineageEvent>;
  /** The token to specify as `page_token` in the next call to get the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudDatacatalogLineageV1ListLineageEventsResponse: Schema.Schema<GoogleCloudDatacatalogLineageV1ListLineageEventsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lineageEvents: Schema.optional(
        Schema.Array(GoogleCloudDatacatalogLineageV1LineageEvent),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatacatalogLineageV1ListLineageEventsResponse",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageV1ListLineageEventsResponse>;

export interface GoogleCloudDatacatalogLineageV1SearchLinksRequest {
  /** Optional. Send asset information in the **source** field to retrieve all links that lead from the specified asset to downstream assets. */
  source?: GoogleCloudDatacatalogLineageV1EntityReference;
  /** Optional. Send asset information in the **target** field to retrieve all links that lead from upstream assets to the specified asset. */
  target?: GoogleCloudDatacatalogLineageV1EntityReference;
  /** Optional. The maximum number of links to return in a single page of the response. A page may contain fewer links than this value. If unspecified, at most 10 links are returned. Maximum value is 100; values greater than 100 are reduced to 100. */
  pageSize?: number;
  /** Optional. The page token received from a previous `SearchLinksRequest` call. Use it to get the next page. When requesting subsequent pages of a response, remember that all parameters must match the values you provided in the original request. */
  pageToken?: string;
}

export const GoogleCloudDatacatalogLineageV1SearchLinksRequest: Schema.Schema<GoogleCloudDatacatalogLineageV1SearchLinksRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      source: Schema.optional(GoogleCloudDatacatalogLineageV1EntityReference),
      target: Schema.optional(GoogleCloudDatacatalogLineageV1EntityReference),
      pageSize: Schema.optional(Schema.Number),
      pageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatacatalogLineageV1SearchLinksRequest",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageV1SearchLinksRequest>;

export interface GoogleCloudDatacatalogLineageV1Link {
  /** Output only. Immutable. The name of the link. Format: `projects/{project}/locations/{location}/links/{link}`. */
  name?: string;
  /** The pointer to the entity that is the **source** of this link. */
  source?: GoogleCloudDatacatalogLineageV1EntityReference;
  /** The pointer to the entity that is the **target** of this link. */
  target?: GoogleCloudDatacatalogLineageV1EntityReference;
  /** The start of the first event establishing this link. */
  startTime?: string;
  /** The end of the last event establishing this link. */
  endTime?: string;
}

export const GoogleCloudDatacatalogLineageV1Link: Schema.Schema<GoogleCloudDatacatalogLineageV1Link> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      source: Schema.optional(GoogleCloudDatacatalogLineageV1EntityReference),
      target: Schema.optional(GoogleCloudDatacatalogLineageV1EntityReference),
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatacatalogLineageV1Link",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageV1Link>;

export interface GoogleCloudDatacatalogLineageV1SearchLinksResponse {
  /** The list of links for a given asset. Can be empty if the asset has no relations of requested type (source or target). */
  links?: Array<GoogleCloudDatacatalogLineageV1Link>;
  /** The token to specify as `page_token` in the subsequent call to get the next page. Omitted if there are no more pages in the response. */
  nextPageToken?: string;
}

export const GoogleCloudDatacatalogLineageV1SearchLinksResponse: Schema.Schema<GoogleCloudDatacatalogLineageV1SearchLinksResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      links: Schema.optional(Schema.Array(GoogleCloudDatacatalogLineageV1Link)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatacatalogLineageV1SearchLinksResponse",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageV1SearchLinksResponse>;

export interface GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesRequest {
  /** Required. An array of links to check for their associated LineageProcesses. The maximum number of items in this array is 100. If the request contains more than 100 links, it returns the `INVALID_ARGUMENT` error. Format: `projects/{project}/locations/{location}/links/{link}`. */
  links?: Array<string>;
  /** The maximum number of processes to return in a single page of the response. A page may contain fewer results than this value. */
  pageSize?: number;
  /** The page token received from a previous `BatchSearchLinkProcesses` call. Use it to get the next page. When requesting subsequent pages of a response, remember that all parameters must match the values you provided in the original request. */
  pageToken?: string;
}

export const GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesRequest: Schema.Schema<GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      links: Schema.optional(Schema.Array(Schema.String)),
      pageSize: Schema.optional(Schema.Number),
      pageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesRequest",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesRequest>;

export interface GoogleCloudDatacatalogLineageV1ProcessLinkInfo {
  /** The name of the link in the format of `projects/{project}/locations/{location}/links/{link}`. */
  link?: string;
  /** The start of the first event establishing this link-process tuple. */
  startTime?: string;
  /** The end of the last event establishing this link-process tuple. */
  endTime?: string;
}

export const GoogleCloudDatacatalogLineageV1ProcessLinkInfo: Schema.Schema<GoogleCloudDatacatalogLineageV1ProcessLinkInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      link: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatacatalogLineageV1ProcessLinkInfo",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageV1ProcessLinkInfo>;

export interface GoogleCloudDatacatalogLineageV1ProcessLinks {
  /** The process name in the format of `projects/{project}/locations/{location}/processes/{process}`. */
  process?: string;
  /** An array containing link details objects of the links provided in the original request. A single process can result in creating multiple links. If any of the links you provide in the request are created by the same process, they all are included in this array. */
  links?: Array<GoogleCloudDatacatalogLineageV1ProcessLinkInfo>;
}

export const GoogleCloudDatacatalogLineageV1ProcessLinks: Schema.Schema<GoogleCloudDatacatalogLineageV1ProcessLinks> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      process: Schema.optional(Schema.String),
      links: Schema.optional(
        Schema.Array(GoogleCloudDatacatalogLineageV1ProcessLinkInfo),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDatacatalogLineageV1ProcessLinks",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageV1ProcessLinks>;

export interface GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesResponse {
  /** An array of processes associated with the specified links. */
  processLinks?: Array<GoogleCloudDatacatalogLineageV1ProcessLinks>;
  /** The token to specify as `page_token` in the subsequent call to get the next page. Omitted if there are no more pages in the response. */
  nextPageToken?: string;
}

export const GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesResponse: Schema.Schema<GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      processLinks: Schema.optional(
        Schema.Array(GoogleCloudDatacatalogLineageV1ProcessLinks),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesResponse",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesResponse>;

export interface GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRuleIntegrationSelector {
  /** Required. Integration to which the rule applies. This field can be used to specify the integration against which the ingestion rule should be applied. */
  integration?: "INTEGRATION_UNSPECIFIED" | "DATAPROC" | (string & {});
}

export const GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRuleIntegrationSelector: Schema.Schema<GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRuleIntegrationSelector> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      integration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRuleIntegrationSelector",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRuleIntegrationSelector>;

export interface GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRuleLineageEnablement {
  /** Optional. If true, ingestion of lineage should be enabled. If false, it should be disabled. If unspecified, the system default value is used. */
  enabled?: boolean;
}

export const GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRuleLineageEnablement: Schema.Schema<GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRuleLineageEnablement> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRuleLineageEnablement",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRuleLineageEnablement>;

export interface GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRule {
  /** Required. Integration selector of the rule. The rule is only applied to the Integration selected by the selector. */
  integrationSelector?: GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRuleIntegrationSelector;
  /** Required. Lineage enablement configuration. Defines configurations for the ingestion of lineage for the resource and its children. If unspecified, the ingestion will be enabled only if it was configured in the resource's parent. */
  lineageEnablement?: GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRuleLineageEnablement;
}

export const GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRule: Schema.Schema<GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      integrationSelector: Schema.optional(
        GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRuleIntegrationSelector,
      ),
      lineageEnablement: Schema.optional(
        GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRuleLineageEnablement,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRule",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRule>;

export interface GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestion {
  /** Optional. List of rules for Data Lineage ingestion. */
  rules?: Array<GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRule>;
}

export const GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestion: Schema.Schema<GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rules: Schema.optional(
        Schema.Array(
          GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRule,
        ),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestion",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestion>;

export interface GoogleCloudDatacatalogLineageConfigmanagementV1Config {
  /** Identifier. The resource name of the config. Format: `organizations/{organization_id}/locations/global/config` `folders/{folder_id}/locations/global/config` `projects/{project_id}/locations/global/config` `projects/{project_number}/locations/global/config` */
  name?: string;
  /** Optional. Ingestion rule for Data Lineage ingestion. */
  ingestion?: GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestion;
  /** Optional. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a config from overwriting each other. It is required that systems make use of the `etag` in the read-modify-write cycle to perform config updates in order to avoid race conditions: An `etag` is returned in the response to `GetConfig`, and systems are expected to put that etag in the request to `UpdateConfig` to ensure that their change will be applied to the same version of the config. If an `etag` is not provided in the call to `UpdateConfig`, then the existing config, if any, will be overwritten. */
  etag?: string;
}

export const GoogleCloudDatacatalogLineageConfigmanagementV1Config: Schema.Schema<GoogleCloudDatacatalogLineageConfigmanagementV1Config> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      ingestion: Schema.optional(
        GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestion,
      ),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatacatalogLineageConfigmanagementV1Config",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageConfigmanagementV1Config>;

export interface ApiservingMcpMcpToolDataHandlingProfile {
  /** // The data access level of the tool's inputs. */
  inputDataAccessLevel?:
    | "DATA_ACCESS_LEVEL_UNSPECIFIED"
    | "DATA_ACCESS_LEVEL_PUBLIC"
    | "DATA_ACCESS_LEVEL_CONFIDENTIAL"
    | "DATA_ACCESS_LEVEL_NEED_TO_KNOW"
    | "DATA_ACCESS_LEVEL_PII"
    | "DATA_ACCESS_LEVEL_USER"
    | "DATA_ACCESS_LEVEL_NO_DATA_ACCESS"
    | (string & {});
  /** The data access level of the tool's outputs. */
  outputDataAccessLevel?:
    | "DATA_ACCESS_LEVEL_UNSPECIFIED"
    | "DATA_ACCESS_LEVEL_PUBLIC"
    | "DATA_ACCESS_LEVEL_CONFIDENTIAL"
    | "DATA_ACCESS_LEVEL_NEED_TO_KNOW"
    | "DATA_ACCESS_LEVEL_PII"
    | "DATA_ACCESS_LEVEL_USER"
    | "DATA_ACCESS_LEVEL_NO_DATA_ACCESS"
    | (string & {});
}

export const ApiservingMcpMcpToolDataHandlingProfile: Schema.Schema<ApiservingMcpMcpToolDataHandlingProfile> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inputDataAccessLevel: Schema.optional(Schema.String),
      outputDataAccessLevel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ApiservingMcpMcpToolDataHandlingProfile",
  }) as any as Schema.Schema<ApiservingMcpMcpToolDataHandlingProfile>;

export interface ApiservingMcpMcpToolLifecycleProfile {
  /** Output only. The current launch state of the MCP tool. */
  launchState?:
    | "LAUNCH_STATE_UNSPECIFIED"
    | "LAUNCH_STATE_DEVELOPMENT"
    | "LAUNCH_STATE_PRODUCTION_PREVIEW"
    | "LAUNCH_STATE_GENERAL_AVAILABILITY"
    | (string & {});
}

export const ApiservingMcpMcpToolLifecycleProfile: Schema.Schema<ApiservingMcpMcpToolLifecycleProfile> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      launchState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ApiservingMcpMcpToolLifecycleProfile",
  }) as any as Schema.Schema<ApiservingMcpMcpToolLifecycleProfile>;

export interface GoogleCloudDatacatalogLineageV1OperationMetadata {
  /** Output only. The current operation state. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PENDING"
    | "RUNNING"
    | "SUCCEEDED"
    | "FAILED"
    | (string & {});
  /** Output only. The type of the operation being performed. */
  operationType?: "TYPE_UNSPECIFIED" | "DELETE" | "CREATE" | (string & {});
  /** Output only. The [relative name] (https://cloud.google.com//apis/design/resource_names#relative_resource_name) of the resource being operated on. */
  resource?: string;
  /** Output only. The UUID of the resource being operated on. */
  resourceUuid?: string;
  /** Output only. The timestamp of the operation submission to the server. */
  createTime?: string;
  /** Output only. The timestamp of the operation termination, regardless of its success. This field is unset if the operation is still ongoing. */
  endTime?: string;
}

export const GoogleCloudDatacatalogLineageV1OperationMetadata: Schema.Schema<GoogleCloudDatacatalogLineageV1OperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      operationType: Schema.optional(Schema.String),
      resource: Schema.optional(Schema.String),
      resourceUuid: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDatacatalogLineageV1OperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDatacatalogLineageV1OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ProcessOpenLineageRunEventProjectsLocationsRequest {
  /** Required. The name of the project and its location that should own the process, run, and lineage event. */
  parent: string;
  /** Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is idempotent only if a `request_id` is provided. */
  requestId?: string;
}

export const ProcessOpenLineageRunEventProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}:processOpenLineageRunEvent",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ProcessOpenLineageRunEventProjectsLocationsRequest>;

export type ProcessOpenLineageRunEventProjectsLocationsResponse =
  GoogleCloudDatacatalogLineageV1ProcessOpenLineageRunEventResponse;
export const ProcessOpenLineageRunEventProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatacatalogLineageV1ProcessOpenLineageRunEventResponse;

export type ProcessOpenLineageRunEventProjectsLocationsError = DefaultErrors;

/** Creates new lineage events together with their parents: process and run. Updates the process and run if they already exist. Mapped from Open Lineage specification: https://github.com/OpenLineage/OpenLineage/blob/main/spec/OpenLineage.json. */
export const processOpenLineageRunEventProjectsLocations: API.OperationMethod<
  ProcessOpenLineageRunEventProjectsLocationsRequest,
  ProcessOpenLineageRunEventProjectsLocationsResponse,
  ProcessOpenLineageRunEventProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ProcessOpenLineageRunEventProjectsLocationsRequest,
  output: ProcessOpenLineageRunEventProjectsLocationsResponse,
  errors: [],
}));

export interface SearchLinksProjectsLocationsRequest {
  /** Required. The project and location you want search in. */
  parent: string;
  /** Request body */
  body?: GoogleCloudDatacatalogLineageV1SearchLinksRequest;
}

export const SearchLinksProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleCloudDatacatalogLineageV1SearchLinksRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}:searchLinks",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SearchLinksProjectsLocationsRequest>;

export type SearchLinksProjectsLocationsResponse =
  GoogleCloudDatacatalogLineageV1SearchLinksResponse;
export const SearchLinksProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatacatalogLineageV1SearchLinksResponse;

export type SearchLinksProjectsLocationsError = DefaultErrors;

/** Retrieve a list of links connected to a specific asset. Links represent the data flow between **source** (upstream) and **target** (downstream) assets in transformation pipelines. Links are stored in the same project as the Lineage Events that create them. You can retrieve links in every project where you have the `datalineage.events.get` permission. The project provided in the URL is used for Billing and Quota. */
export const searchLinksProjectsLocations: API.OperationMethod<
  SearchLinksProjectsLocationsRequest,
  SearchLinksProjectsLocationsResponse,
  SearchLinksProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SearchLinksProjectsLocationsRequest,
  output: SearchLinksProjectsLocationsResponse,
  errors: [],
}));

export interface BatchSearchLinkProcessesProjectsLocationsRequest {
  /** Required. The project and location where you want to search. */
  parent: string;
  /** Request body */
  body?: GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesRequest;
}

export const BatchSearchLinkProcessesProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}:batchSearchLinkProcesses",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BatchSearchLinkProcessesProjectsLocationsRequest>;

export type BatchSearchLinkProcessesProjectsLocationsResponse =
  GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesResponse;
export const BatchSearchLinkProcessesProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesResponse;

export type BatchSearchLinkProcessesProjectsLocationsError = DefaultErrors;

/** Retrieve information about LineageProcesses associated with specific links. LineageProcesses are transformation pipelines that result in data flowing from **source** to **target** assets. Links between assets represent this operation. If you have specific link names, you can use this method to verify which LineageProcesses contribute to creating those links. See the SearchLinks method for more information on how to retrieve link name. You can retrieve the LineageProcess information in every project where you have the `datalineage.events.get` permission. The project provided in the URL is used for Billing and Quota. */
export const batchSearchLinkProcessesProjectsLocations: API.OperationMethod<
  BatchSearchLinkProcessesProjectsLocationsRequest,
  BatchSearchLinkProcessesProjectsLocationsResponse,
  BatchSearchLinkProcessesProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchSearchLinkProcessesProjectsLocationsRequest,
  output: BatchSearchLinkProcessesProjectsLocationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/operations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse =
  GoogleLongrunningListOperationsResponse;
export const ListProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningListOperationsResponse;

export type ListProjectsLocationsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsOperationsRequest,
  ListProjectsLocationsOperationsResponse,
  ListProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type GetProjectsLocationsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOperations: API.OperationMethod<
  GetProjectsLocationsOperationsRequest,
  GetProjectsLocationsOperationsResponse,
  GetProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteProjectsLocationsOperations: API.OperationMethod<
  DeleteProjectsLocationsOperationsRequest,
  DeleteProjectsLocationsOperationsResponse,
  DeleteProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: GoogleLongrunningCancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(GoogleLongrunningCancelOperationRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = GoogleProtobufEmpty;
export const CancelProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type CancelProjectsLocationsOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelProjectsLocationsOperations: API.OperationMethod<
  CancelProjectsLocationsOperationsRequest,
  CancelProjectsLocationsOperationsResponse,
  CancelProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsProcessesRequest {
  /** Required. The name of the project and its location that should own the process. */
  parent: string;
  /** Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is idempotent only if a `request_id` is provided. */
  requestId?: string;
  /** Request body */
  body?: GoogleCloudDatacatalogLineageV1Process;
}

export const CreateProjectsLocationsProcessesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(GoogleCloudDatacatalogLineageV1Process).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/processes",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsProcessesRequest>;

export type CreateProjectsLocationsProcessesResponse =
  GoogleCloudDatacatalogLineageV1Process;
export const CreateProjectsLocationsProcessesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatacatalogLineageV1Process;

export type CreateProjectsLocationsProcessesError = DefaultErrors;

/** Creates a new process. */
export const createProjectsLocationsProcesses: API.OperationMethod<
  CreateProjectsLocationsProcessesRequest,
  CreateProjectsLocationsProcessesResponse,
  CreateProjectsLocationsProcessesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsProcessesRequest,
  output: CreateProjectsLocationsProcessesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsProcessesRequest {
  /** Immutable. The resource name of the lineage process. Format: `projects/{project}/locations/{location}/processes/{process}`. Can be specified or auto-assigned. {process} must be not longer than 200 characters and only contain characters in a set: `a-zA-Z0-9_-:.` */
  name: string;
  /** The list of fields to update. Currently not used. The whole message is updated. */
  updateMask?: string;
  /** If set to true and the process is not found, the request inserts it. */
  allowMissing?: boolean;
  /** Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is idempotent only if a `request_id` is provided. */
  requestId?: string;
  /** Request body */
  body?: GoogleCloudDatacatalogLineageV1Process;
}

export const PatchProjectsLocationsProcessesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(GoogleCloudDatacatalogLineageV1Process).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/processes/{processesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsProcessesRequest>;

export type PatchProjectsLocationsProcessesResponse =
  GoogleCloudDatacatalogLineageV1Process;
export const PatchProjectsLocationsProcessesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatacatalogLineageV1Process;

export type PatchProjectsLocationsProcessesError = DefaultErrors;

/** Updates a process. */
export const patchProjectsLocationsProcesses: API.OperationMethod<
  PatchProjectsLocationsProcessesRequest,
  PatchProjectsLocationsProcessesResponse,
  PatchProjectsLocationsProcessesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsProcessesRequest,
  output: PatchProjectsLocationsProcessesResponse,
  errors: [],
}));

export interface GetProjectsLocationsProcessesRequest {
  /** Required. The name of the process to get. */
  name: string;
}

export const GetProjectsLocationsProcessesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/processes/{processesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsProcessesRequest>;

export type GetProjectsLocationsProcessesResponse =
  GoogleCloudDatacatalogLineageV1Process;
export const GetProjectsLocationsProcessesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatacatalogLineageV1Process;

export type GetProjectsLocationsProcessesError = DefaultErrors;

/** Gets the details of the specified process. */
export const getProjectsLocationsProcesses: API.OperationMethod<
  GetProjectsLocationsProcessesRequest,
  GetProjectsLocationsProcessesResponse,
  GetProjectsLocationsProcessesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsProcessesRequest,
  output: GetProjectsLocationsProcessesResponse,
  errors: [],
}));

export interface ListProjectsLocationsProcessesRequest {
  /** Required. The name of the project and its location that owns this collection of processes. */
  parent: string;
  /** The maximum number of processes to return. The service may return fewer than this value. If unspecified, at most 50 processes are returned. The maximum value is 100; values greater than 100 are cut to 100. */
  pageSize?: number;
  /** The page token received from a previous `ListProcesses` call. Specify it to get the next page. When paginating, all other parameters specified in this call must match the parameters of the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsProcessesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/processes",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsProcessesRequest>;

export type ListProjectsLocationsProcessesResponse =
  GoogleCloudDatacatalogLineageV1ListProcessesResponse;
export const ListProjectsLocationsProcessesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatacatalogLineageV1ListProcessesResponse;

export type ListProjectsLocationsProcessesError = DefaultErrors;

/** List processes in the given project and location. List order is descending by insertion time. */
export const listProjectsLocationsProcesses: API.PaginatedOperationMethod<
  ListProjectsLocationsProcessesRequest,
  ListProjectsLocationsProcessesResponse,
  ListProjectsLocationsProcessesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsProcessesRequest,
  output: ListProjectsLocationsProcessesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsProcessesRequest {
  /** Required. The name of the process to delete. */
  name: string;
  /** If set to true and the process is not found, the request succeeds but the server doesn't perform any actions. */
  allowMissing?: boolean;
}

export const DeleteProjectsLocationsProcessesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/processes/{processesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsProcessesRequest>;

export type DeleteProjectsLocationsProcessesResponse =
  GoogleLongrunningOperation;
export const DeleteProjectsLocationsProcessesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type DeleteProjectsLocationsProcessesError = DefaultErrors;

/** Deletes the process with the specified name. */
export const deleteProjectsLocationsProcesses: API.OperationMethod<
  DeleteProjectsLocationsProcessesRequest,
  DeleteProjectsLocationsProcessesResponse,
  DeleteProjectsLocationsProcessesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsProcessesRequest,
  output: DeleteProjectsLocationsProcessesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsProcessesRunsRequest {
  /** Required. The name of the process that should own the run. */
  parent: string;
  /** Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is idempotent only if a `request_id` is provided. */
  requestId?: string;
  /** Request body */
  body?: GoogleCloudDatacatalogLineageV1Run;
}

export const CreateProjectsLocationsProcessesRunsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(GoogleCloudDatacatalogLineageV1Run).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/processes/{processesId}/runs",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsProcessesRunsRequest>;

export type CreateProjectsLocationsProcessesRunsResponse =
  GoogleCloudDatacatalogLineageV1Run;
export const CreateProjectsLocationsProcessesRunsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatacatalogLineageV1Run;

export type CreateProjectsLocationsProcessesRunsError = DefaultErrors;

/** Creates a new run. */
export const createProjectsLocationsProcessesRuns: API.OperationMethod<
  CreateProjectsLocationsProcessesRunsRequest,
  CreateProjectsLocationsProcessesRunsResponse,
  CreateProjectsLocationsProcessesRunsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsProcessesRunsRequest,
  output: CreateProjectsLocationsProcessesRunsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsProcessesRunsRequest {
  /** Immutable. The resource name of the run. Format: `projects/{project}/locations/{location}/processes/{process}/runs/{run}`. Can be specified or auto-assigned. {run} must be not longer than 200 characters and only contain characters in a set: `a-zA-Z0-9_-:.` */
  name: string;
  /** The list of fields to update. Currently not used. The whole message is updated. */
  updateMask?: string;
  /** If set to true and the run is not found, the request creates it. */
  allowMissing?: boolean;
  /** Request body */
  body?: GoogleCloudDatacatalogLineageV1Run;
}

export const PatchProjectsLocationsProcessesRunsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
    body: Schema.optional(GoogleCloudDatacatalogLineageV1Run).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/processes/{processesId}/runs/{runsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsProcessesRunsRequest>;

export type PatchProjectsLocationsProcessesRunsResponse =
  GoogleCloudDatacatalogLineageV1Run;
export const PatchProjectsLocationsProcessesRunsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatacatalogLineageV1Run;

export type PatchProjectsLocationsProcessesRunsError = DefaultErrors;

/** Updates a run. */
export const patchProjectsLocationsProcessesRuns: API.OperationMethod<
  PatchProjectsLocationsProcessesRunsRequest,
  PatchProjectsLocationsProcessesRunsResponse,
  PatchProjectsLocationsProcessesRunsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsProcessesRunsRequest,
  output: PatchProjectsLocationsProcessesRunsResponse,
  errors: [],
}));

export interface GetProjectsLocationsProcessesRunsRequest {
  /** Required. The name of the run to get. */
  name: string;
}

export const GetProjectsLocationsProcessesRunsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/processes/{processesId}/runs/{runsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsProcessesRunsRequest>;

export type GetProjectsLocationsProcessesRunsResponse =
  GoogleCloudDatacatalogLineageV1Run;
export const GetProjectsLocationsProcessesRunsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatacatalogLineageV1Run;

export type GetProjectsLocationsProcessesRunsError = DefaultErrors;

/** Gets the details of the specified run. */
export const getProjectsLocationsProcessesRuns: API.OperationMethod<
  GetProjectsLocationsProcessesRunsRequest,
  GetProjectsLocationsProcessesRunsResponse,
  GetProjectsLocationsProcessesRunsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsProcessesRunsRequest,
  output: GetProjectsLocationsProcessesRunsResponse,
  errors: [],
}));

export interface ListProjectsLocationsProcessesRunsRequest {
  /** Required. The name of process that owns this collection of runs. */
  parent: string;
  /** The maximum number of runs to return. The service may return fewer than this value. If unspecified, at most 50 runs are returned. The maximum value is 100; values greater than 100 are cut to 100. */
  pageSize?: number;
  /** The page token received from a previous `ListRuns` call. Specify it to get the next page. When paginating, all other parameters specified in this call must match the parameters of the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsProcessesRunsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/processes/{processesId}/runs",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsProcessesRunsRequest>;

export type ListProjectsLocationsProcessesRunsResponse =
  GoogleCloudDatacatalogLineageV1ListRunsResponse;
export const ListProjectsLocationsProcessesRunsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatacatalogLineageV1ListRunsResponse;

export type ListProjectsLocationsProcessesRunsError = DefaultErrors;

/** Lists runs in the given project and location. List order is descending by `start_time`. */
export const listProjectsLocationsProcessesRuns: API.PaginatedOperationMethod<
  ListProjectsLocationsProcessesRunsRequest,
  ListProjectsLocationsProcessesRunsResponse,
  ListProjectsLocationsProcessesRunsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsProcessesRunsRequest,
  output: ListProjectsLocationsProcessesRunsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsProcessesRunsRequest {
  /** Required. The name of the run to delete. */
  name: string;
  /** If set to true and the run is not found, the request succeeds but the server doesn't perform any actions. */
  allowMissing?: boolean;
}

export const DeleteProjectsLocationsProcessesRunsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/processes/{processesId}/runs/{runsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsProcessesRunsRequest>;

export type DeleteProjectsLocationsProcessesRunsResponse =
  GoogleLongrunningOperation;
export const DeleteProjectsLocationsProcessesRunsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type DeleteProjectsLocationsProcessesRunsError = DefaultErrors;

/** Deletes the run with the specified name. */
export const deleteProjectsLocationsProcessesRuns: API.OperationMethod<
  DeleteProjectsLocationsProcessesRunsRequest,
  DeleteProjectsLocationsProcessesRunsResponse,
  DeleteProjectsLocationsProcessesRunsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsProcessesRunsRequest,
  output: DeleteProjectsLocationsProcessesRunsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsProcessesRunsLineageEventsRequest {
  /** Required. The name of the run that should own the lineage event. */
  parent: string;
  /** Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is idempotent only if a `request_id` is provided. */
  requestId?: string;
  /** Request body */
  body?: GoogleCloudDatacatalogLineageV1LineageEvent;
}

export const CreateProjectsLocationsProcessesRunsLineageEventsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(GoogleCloudDatacatalogLineageV1LineageEvent).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/processes/{processesId}/runs/{runsId}/lineageEvents",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsProcessesRunsLineageEventsRequest>;

export type CreateProjectsLocationsProcessesRunsLineageEventsResponse =
  GoogleCloudDatacatalogLineageV1LineageEvent;
export const CreateProjectsLocationsProcessesRunsLineageEventsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatacatalogLineageV1LineageEvent;

export type CreateProjectsLocationsProcessesRunsLineageEventsError =
  DefaultErrors;

/** Creates a new lineage event. */
export const createProjectsLocationsProcessesRunsLineageEvents: API.OperationMethod<
  CreateProjectsLocationsProcessesRunsLineageEventsRequest,
  CreateProjectsLocationsProcessesRunsLineageEventsResponse,
  CreateProjectsLocationsProcessesRunsLineageEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsProcessesRunsLineageEventsRequest,
  output: CreateProjectsLocationsProcessesRunsLineageEventsResponse,
  errors: [],
}));

export interface GetProjectsLocationsProcessesRunsLineageEventsRequest {
  /** Required. The name of the lineage event to get. */
  name: string;
}

export const GetProjectsLocationsProcessesRunsLineageEventsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/processes/{processesId}/runs/{runsId}/lineageEvents/{lineageEventsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsProcessesRunsLineageEventsRequest>;

export type GetProjectsLocationsProcessesRunsLineageEventsResponse =
  GoogleCloudDatacatalogLineageV1LineageEvent;
export const GetProjectsLocationsProcessesRunsLineageEventsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatacatalogLineageV1LineageEvent;

export type GetProjectsLocationsProcessesRunsLineageEventsError = DefaultErrors;

/** Gets details of a specified lineage event. */
export const getProjectsLocationsProcessesRunsLineageEvents: API.OperationMethod<
  GetProjectsLocationsProcessesRunsLineageEventsRequest,
  GetProjectsLocationsProcessesRunsLineageEventsResponse,
  GetProjectsLocationsProcessesRunsLineageEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsProcessesRunsLineageEventsRequest,
  output: GetProjectsLocationsProcessesRunsLineageEventsResponse,
  errors: [],
}));

export interface ListProjectsLocationsProcessesRunsLineageEventsRequest {
  /** Required. The name of the run that owns the collection of lineage events to get. */
  parent: string;
  /** The maximum number of lineage events to return. The service may return fewer events than this value. If unspecified, at most 50 events are returned. The maximum value is 100; values greater than 100 are cut to 100. */
  pageSize?: number;
  /** The page token received from a previous `ListLineageEvents` call. Specify it to get the next page. When paginating, all other parameters specified in this call must match the parameters of the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsProcessesRunsLineageEventsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/processes/{processesId}/runs/{runsId}/lineageEvents",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsProcessesRunsLineageEventsRequest>;

export type ListProjectsLocationsProcessesRunsLineageEventsResponse =
  GoogleCloudDatacatalogLineageV1ListLineageEventsResponse;
export const ListProjectsLocationsProcessesRunsLineageEventsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatacatalogLineageV1ListLineageEventsResponse;

export type ListProjectsLocationsProcessesRunsLineageEventsError =
  DefaultErrors;

/** Lists lineage events in the given project and location. The list order is not defined. */
export const listProjectsLocationsProcessesRunsLineageEvents: API.PaginatedOperationMethod<
  ListProjectsLocationsProcessesRunsLineageEventsRequest,
  ListProjectsLocationsProcessesRunsLineageEventsResponse,
  ListProjectsLocationsProcessesRunsLineageEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsProcessesRunsLineageEventsRequest,
  output: ListProjectsLocationsProcessesRunsLineageEventsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsProcessesRunsLineageEventsRequest {
  /** Required. The name of the lineage event to delete. */
  name: string;
  /** If set to true and the lineage event is not found, the request succeeds but the server doesn't perform any actions. */
  allowMissing?: boolean;
}

export const DeleteProjectsLocationsProcessesRunsLineageEventsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/processes/{processesId}/runs/{runsId}/lineageEvents/{lineageEventsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsProcessesRunsLineageEventsRequest>;

export type DeleteProjectsLocationsProcessesRunsLineageEventsResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsLocationsProcessesRunsLineageEventsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsProcessesRunsLineageEventsError =
  DefaultErrors;

/** Deletes the lineage event with the specified name. */
export const deleteProjectsLocationsProcessesRunsLineageEvents: API.OperationMethod<
  DeleteProjectsLocationsProcessesRunsLineageEventsRequest,
  DeleteProjectsLocationsProcessesRunsLineageEventsResponse,
  DeleteProjectsLocationsProcessesRunsLineageEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsProcessesRunsLineageEventsRequest,
  output: DeleteProjectsLocationsProcessesRunsLineageEventsResponse,
  errors: [],
}));

export interface GetProjectsLocationsConfigRequest {
  /** Required. REQUIRED: The resource name of the config to be fetched. Format: `organizations/{organization_id}/locations/global/config` `folders/{folder_id}/locations/global/config` `projects/{project_id}/locations/global/config` `projects/{project_number}/locations/global/config` */
  name: string;
}

export const GetProjectsLocationsConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/config",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsConfigRequest>;

export type GetProjectsLocationsConfigResponse =
  GoogleCloudDatacatalogLineageConfigmanagementV1Config;
export const GetProjectsLocationsConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatacatalogLineageConfigmanagementV1Config;

export type GetProjectsLocationsConfigError = DefaultErrors;

/** Get the Config for a given resource. */
export const getProjectsLocationsConfig: API.OperationMethod<
  GetProjectsLocationsConfigRequest,
  GetProjectsLocationsConfigResponse,
  GetProjectsLocationsConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsConfigRequest,
  output: GetProjectsLocationsConfigResponse,
  errors: [],
}));

export interface PatchProjectsLocationsConfigRequest {
  /** Identifier. The resource name of the config. Format: `organizations/{organization_id}/locations/global/config` `folders/{folder_id}/locations/global/config` `projects/{project_id}/locations/global/config` `projects/{project_number}/locations/global/config` */
  name: string;
  /** Request body */
  body?: GoogleCloudDatacatalogLineageConfigmanagementV1Config;
}

export const PatchProjectsLocationsConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(
      GoogleCloudDatacatalogLineageConfigmanagementV1Config,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/config",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsConfigRequest>;

export type PatchProjectsLocationsConfigResponse =
  GoogleCloudDatacatalogLineageConfigmanagementV1Config;
export const PatchProjectsLocationsConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatacatalogLineageConfigmanagementV1Config;

export type PatchProjectsLocationsConfigError = DefaultErrors;

/** Update the Config for a given resource. */
export const patchProjectsLocationsConfig: API.OperationMethod<
  PatchProjectsLocationsConfigRequest,
  PatchProjectsLocationsConfigResponse,
  PatchProjectsLocationsConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsConfigRequest,
  output: PatchProjectsLocationsConfigResponse,
  errors: [],
}));

export interface GetFoldersLocationsConfigRequest {
  /** Required. REQUIRED: The resource name of the config to be fetched. Format: `organizations/{organization_id}/locations/global/config` `folders/{folder_id}/locations/global/config` `projects/{project_id}/locations/global/config` `projects/{project_number}/locations/global/config` */
  name: string;
}

export const GetFoldersLocationsConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/folders/{foldersId}/locations/{locationsId}/config",
    }),
    svc,
  ) as unknown as Schema.Schema<GetFoldersLocationsConfigRequest>;

export type GetFoldersLocationsConfigResponse =
  GoogleCloudDatacatalogLineageConfigmanagementV1Config;
export const GetFoldersLocationsConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatacatalogLineageConfigmanagementV1Config;

export type GetFoldersLocationsConfigError = DefaultErrors;

/** Get the Config for a given resource. */
export const getFoldersLocationsConfig: API.OperationMethod<
  GetFoldersLocationsConfigRequest,
  GetFoldersLocationsConfigResponse,
  GetFoldersLocationsConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFoldersLocationsConfigRequest,
  output: GetFoldersLocationsConfigResponse,
  errors: [],
}));

export interface PatchFoldersLocationsConfigRequest {
  /** Identifier. The resource name of the config. Format: `organizations/{organization_id}/locations/global/config` `folders/{folder_id}/locations/global/config` `projects/{project_id}/locations/global/config` `projects/{project_number}/locations/global/config` */
  name: string;
  /** Request body */
  body?: GoogleCloudDatacatalogLineageConfigmanagementV1Config;
}

export const PatchFoldersLocationsConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(
      GoogleCloudDatacatalogLineageConfigmanagementV1Config,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/folders/{foldersId}/locations/{locationsId}/config",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchFoldersLocationsConfigRequest>;

export type PatchFoldersLocationsConfigResponse =
  GoogleCloudDatacatalogLineageConfigmanagementV1Config;
export const PatchFoldersLocationsConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatacatalogLineageConfigmanagementV1Config;

export type PatchFoldersLocationsConfigError = DefaultErrors;

/** Update the Config for a given resource. */
export const patchFoldersLocationsConfig: API.OperationMethod<
  PatchFoldersLocationsConfigRequest,
  PatchFoldersLocationsConfigResponse,
  PatchFoldersLocationsConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchFoldersLocationsConfigRequest,
  output: PatchFoldersLocationsConfigResponse,
  errors: [],
}));

export interface GetOrganizationsLocationsConfigRequest {
  /** Required. REQUIRED: The resource name of the config to be fetched. Format: `organizations/{organization_id}/locations/global/config` `folders/{folder_id}/locations/global/config` `projects/{project_id}/locations/global/config` `projects/{project_number}/locations/global/config` */
  name: string;
}

export const GetOrganizationsLocationsConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/config",
    }),
    svc,
  ) as unknown as Schema.Schema<GetOrganizationsLocationsConfigRequest>;

export type GetOrganizationsLocationsConfigResponse =
  GoogleCloudDatacatalogLineageConfigmanagementV1Config;
export const GetOrganizationsLocationsConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatacatalogLineageConfigmanagementV1Config;

export type GetOrganizationsLocationsConfigError = DefaultErrors;

/** Get the Config for a given resource. */
export const getOrganizationsLocationsConfig: API.OperationMethod<
  GetOrganizationsLocationsConfigRequest,
  GetOrganizationsLocationsConfigResponse,
  GetOrganizationsLocationsConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetOrganizationsLocationsConfigRequest,
  output: GetOrganizationsLocationsConfigResponse,
  errors: [],
}));

export interface PatchOrganizationsLocationsConfigRequest {
  /** Identifier. The resource name of the config. Format: `organizations/{organization_id}/locations/global/config` `folders/{folder_id}/locations/global/config` `projects/{project_id}/locations/global/config` `projects/{project_number}/locations/global/config` */
  name: string;
  /** Request body */
  body?: GoogleCloudDatacatalogLineageConfigmanagementV1Config;
}

export const PatchOrganizationsLocationsConfigRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(
      GoogleCloudDatacatalogLineageConfigmanagementV1Config,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/organizations/{organizationsId}/locations/{locationsId}/config",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchOrganizationsLocationsConfigRequest>;

export type PatchOrganizationsLocationsConfigResponse =
  GoogleCloudDatacatalogLineageConfigmanagementV1Config;
export const PatchOrganizationsLocationsConfigResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDatacatalogLineageConfigmanagementV1Config;

export type PatchOrganizationsLocationsConfigError = DefaultErrors;

/** Update the Config for a given resource. */
export const patchOrganizationsLocationsConfig: API.OperationMethod<
  PatchOrganizationsLocationsConfigRequest,
  PatchOrganizationsLocationsConfigResponse,
  PatchOrganizationsLocationsConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchOrganizationsLocationsConfigRequest,
  output: PatchOrganizationsLocationsConfigResponse,
  errors: [],
}));
