// ==========================================================================
// Policy Analyzer API (policyanalyzer v1beta1)
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
  name: "policyanalyzer",
  version: "v1beta1",
  rootUrl: "https://policyanalyzer.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudPolicyanalyzerV1beta1ObservationPeriod {
  /** The observation end time. */
  endTime?: string;
  /** The observation start time. */
  startTime?: string;
}

export const GoogleCloudPolicyanalyzerV1beta1ObservationPeriod: Schema.Schema<GoogleCloudPolicyanalyzerV1beta1ObservationPeriod> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      endTime: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudPolicyanalyzerV1beta1ObservationPeriod",
  }) as any as Schema.Schema<GoogleCloudPolicyanalyzerV1beta1ObservationPeriod>;

export interface GoogleCloudPolicyanalyzerV1beta1Activity {
  /** The full resource name that identifies the resource. For examples of full resource names for Google Cloud services, see https://cloud.google.com/iam/help/troubleshooter/full-resource-names. */
  fullResourceName?: string;
  /** A struct of custom fields to explain the activity. */
  activity?: Record<string, unknown>;
  /** The type of the activity. */
  activityType?: string;
  /** The data observation period to build the activity. */
  observationPeriod?: GoogleCloudPolicyanalyzerV1beta1ObservationPeriod;
}

export const GoogleCloudPolicyanalyzerV1beta1Activity: Schema.Schema<GoogleCloudPolicyanalyzerV1beta1Activity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fullResourceName: Schema.optional(Schema.String),
      activity: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      activityType: Schema.optional(Schema.String),
      observationPeriod: Schema.optional(
        GoogleCloudPolicyanalyzerV1beta1ObservationPeriod,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudPolicyanalyzerV1beta1Activity",
  }) as any as Schema.Schema<GoogleCloudPolicyanalyzerV1beta1Activity>;

export interface GoogleCloudPolicyanalyzerV1beta1QueryActivityResponse {
  /** The set of activities that match the filter included in the request. */
  activities?: Array<GoogleCloudPolicyanalyzerV1beta1Activity>;
  /** If there might be more results than those appearing in this response, then `nextPageToken` is included. To get the next set of results, call this method again using the value of `nextPageToken` as `pageToken`. */
  nextPageToken?: string;
}

export const GoogleCloudPolicyanalyzerV1beta1QueryActivityResponse: Schema.Schema<GoogleCloudPolicyanalyzerV1beta1QueryActivityResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      activities: Schema.optional(
        Schema.Array(GoogleCloudPolicyanalyzerV1beta1Activity),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudPolicyanalyzerV1beta1QueryActivityResponse",
  }) as any as Schema.Schema<GoogleCloudPolicyanalyzerV1beta1QueryActivityResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface QueryOrganizationsLocationsActivityTypesActivitiesRequest {
  /** Optional. The maximum number of results to return from this request. Max limit is 1000. Non-positive values are ignored. The presence of `nextPageToken` in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. `pageToken` must be the value of `nextPageToken` from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Required. The container resource on which to execute the request. Acceptable formats: `projects/[PROJECT_ID|PROJECT_NUMBER]/locations/[LOCATION]/activityTypes/[ACTIVITY_TYPE]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ */
  parent: string;
  /** Optional. Optional filter expression to restrict the activities returned. Supported filters are: - service_account_last_authn.full_resource_name {=} - service_account_key_last_authn.full_resource_name {=} */
  filter?: string;
}

export const QueryOrganizationsLocationsActivityTypesActivitiesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/organizations/{organizationsId}/locations/{locationsId}/activityTypes/{activityTypesId}/activities:query",
    }),
    svc,
  ) as unknown as Schema.Schema<QueryOrganizationsLocationsActivityTypesActivitiesRequest>;

export type QueryOrganizationsLocationsActivityTypesActivitiesResponse =
  GoogleCloudPolicyanalyzerV1beta1QueryActivityResponse;
export const QueryOrganizationsLocationsActivityTypesActivitiesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudPolicyanalyzerV1beta1QueryActivityResponse;

export type QueryOrganizationsLocationsActivityTypesActivitiesError =
  DefaultErrors;

/** Queries policy activities on GCP resources. */
export const queryOrganizationsLocationsActivityTypesActivities: API.PaginatedOperationMethod<
  QueryOrganizationsLocationsActivityTypesActivitiesRequest,
  QueryOrganizationsLocationsActivityTypesActivitiesResponse,
  QueryOrganizationsLocationsActivityTypesActivitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: QueryOrganizationsLocationsActivityTypesActivitiesRequest,
  output: QueryOrganizationsLocationsActivityTypesActivitiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface QueryFoldersLocationsActivityTypesActivitiesRequest {
  /** Required. The container resource on which to execute the request. Acceptable formats: `projects/[PROJECT_ID|PROJECT_NUMBER]/locations/[LOCATION]/activityTypes/[ACTIVITY_TYPE]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ */
  parent: string;
  /** Optional. The maximum number of results to return from this request. Max limit is 1000. Non-positive values are ignored. The presence of `nextPageToken` in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. `pageToken` must be the value of `nextPageToken` from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. Optional filter expression to restrict the activities returned. Supported filters are: - service_account_last_authn.full_resource_name {=} - service_account_key_last_authn.full_resource_name {=} */
  filter?: string;
}

export const QueryFoldersLocationsActivityTypesActivitiesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/folders/{foldersId}/locations/{locationsId}/activityTypes/{activityTypesId}/activities:query",
    }),
    svc,
  ) as unknown as Schema.Schema<QueryFoldersLocationsActivityTypesActivitiesRequest>;

export type QueryFoldersLocationsActivityTypesActivitiesResponse =
  GoogleCloudPolicyanalyzerV1beta1QueryActivityResponse;
export const QueryFoldersLocationsActivityTypesActivitiesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudPolicyanalyzerV1beta1QueryActivityResponse;

export type QueryFoldersLocationsActivityTypesActivitiesError = DefaultErrors;

/** Queries policy activities on GCP resources. */
export const queryFoldersLocationsActivityTypesActivities: API.PaginatedOperationMethod<
  QueryFoldersLocationsActivityTypesActivitiesRequest,
  QueryFoldersLocationsActivityTypesActivitiesResponse,
  QueryFoldersLocationsActivityTypesActivitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: QueryFoldersLocationsActivityTypesActivitiesRequest,
  output: QueryFoldersLocationsActivityTypesActivitiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface QueryProjectsLocationsActivityTypesActivitiesRequest {
  /** Required. The container resource on which to execute the request. Acceptable formats: `projects/[PROJECT_ID|PROJECT_NUMBER]/locations/[LOCATION]/activityTypes/[ACTIVITY_TYPE]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ */
  parent: string;
  /** Optional. The maximum number of results to return from this request. Max limit is 1000. Non-positive values are ignored. The presence of `nextPageToken` in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. `pageToken` must be the value of `nextPageToken` from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Optional. Optional filter expression to restrict the activities returned. Supported filters are: - service_account_last_authn.full_resource_name {=} - service_account_key_last_authn.full_resource_name {=} */
  filter?: string;
}

export const QueryProjectsLocationsActivityTypesActivitiesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/activityTypes/{activityTypesId}/activities:query",
    }),
    svc,
  ) as unknown as Schema.Schema<QueryProjectsLocationsActivityTypesActivitiesRequest>;

export type QueryProjectsLocationsActivityTypesActivitiesResponse =
  GoogleCloudPolicyanalyzerV1beta1QueryActivityResponse;
export const QueryProjectsLocationsActivityTypesActivitiesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudPolicyanalyzerV1beta1QueryActivityResponse;

export type QueryProjectsLocationsActivityTypesActivitiesError = DefaultErrors;

/** Queries policy activities on GCP resources. */
export const queryProjectsLocationsActivityTypesActivities: API.PaginatedOperationMethod<
  QueryProjectsLocationsActivityTypesActivitiesRequest,
  QueryProjectsLocationsActivityTypesActivitiesResponse,
  QueryProjectsLocationsActivityTypesActivitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: QueryProjectsLocationsActivityTypesActivitiesRequest,
  output: QueryProjectsLocationsActivityTypesActivitiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
