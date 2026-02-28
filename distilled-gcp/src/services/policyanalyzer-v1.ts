// ==========================================================================
// Policy Analyzer API (policyanalyzer v1)
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
  name: "policyanalyzer",
  version: "v1",
  rootUrl: "https://policyanalyzer.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudPolicyanalyzerV1ObservationPeriod {
  /** The observation start time. The time in this timestamp is always `07:00:00Z`. */
  startTime?: string;
  /** The observation end time. The time in this timestamp is always `07:00:00Z`. */
  endTime?: string;
}

export const GoogleCloudPolicyanalyzerV1ObservationPeriod: Schema.Schema<GoogleCloudPolicyanalyzerV1ObservationPeriod> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicyanalyzerV1ObservationPeriod" }) as any as Schema.Schema<GoogleCloudPolicyanalyzerV1ObservationPeriod>;

export interface GoogleCloudPolicyanalyzerV1Activity {
  /** The type of the activity. */
  activityType?: string;
  /** A struct of custom fields to explain the activity. */
  activity?: Record<string, unknown>;
  /** The full resource name that identifies the resource. For examples of full resource names for Google Cloud services, see https://cloud.google.com/iam/help/troubleshooter/full-resource-names. */
  fullResourceName?: string;
  /** The data observation period to build the activity. */
  observationPeriod?: GoogleCloudPolicyanalyzerV1ObservationPeriod;
}

export const GoogleCloudPolicyanalyzerV1Activity: Schema.Schema<GoogleCloudPolicyanalyzerV1Activity> = Schema.suspend(() => Schema.Struct({
  activityType: Schema.optional(Schema.String),
  activity: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  fullResourceName: Schema.optional(Schema.String),
  observationPeriod: Schema.optional(GoogleCloudPolicyanalyzerV1ObservationPeriod),
})).annotate({ identifier: "GoogleCloudPolicyanalyzerV1Activity" }) as any as Schema.Schema<GoogleCloudPolicyanalyzerV1Activity>;

export interface GoogleCloudPolicyanalyzerV1QueryActivityResponse {
  /** The set of activities that match the filter included in the request. */
  activities?: Array<GoogleCloudPolicyanalyzerV1Activity>;
  /** If there might be more results than those appearing in this response, then `nextPageToken` is included. To get the next set of results, call this method again using the value of `nextPageToken` as `pageToken`. */
  nextPageToken?: string;
}

export const GoogleCloudPolicyanalyzerV1QueryActivityResponse: Schema.Schema<GoogleCloudPolicyanalyzerV1QueryActivityResponse> = Schema.suspend(() => Schema.Struct({
  activities: Schema.optional(Schema.Array(GoogleCloudPolicyanalyzerV1Activity)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudPolicyanalyzerV1QueryActivityResponse" }) as any as Schema.Schema<GoogleCloudPolicyanalyzerV1QueryActivityResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Queries policy activities on Google Cloud resources. */
export interface QueryOrganizationsLocationsActivityTypesActivitiesRequest {
  /** Optional. Filter expression to restrict the activities returned. For serviceAccountLastAuthentication activities, supported filters are: - `activities.full_resource_name {=} [STRING]` - `activities.fullResourceName {=} [STRING]` where `[STRING]` is the full resource name of the service account. For serviceAccountKeyLastAuthentication activities, supported filters are: - `activities.full_resource_name {=} [STRING]` - `activities.fullResourceName {=} [STRING]` where `[STRING]` is the full resource name of the service account key. */
  filter?: string;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. `pageToken` must be the value of `nextPageToken` from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Required. The container resource on which to execute the request. Acceptable formats: `projects/[PROJECT_ID|PROJECT_NUMBER]/locations/[LOCATION]/activityTypes/[ACTIVITY_TYPE]` LOCATION here refers to Google Cloud Locations: https://cloud.google.com/about/locations/ */
  parent: string;
  /** Optional. The maximum number of results to return from this request. Max limit is 1000. Non-positive values are ignored. The presence of `nextPageToken` in the response indicates that more results might be available. */
  pageSize?: number;
}

export const QueryOrganizationsLocationsActivityTypesActivitiesRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/activityTypes/{activityTypesId}/activities:query" }),
  svc,
) as unknown as Schema.Schema<QueryOrganizationsLocationsActivityTypesActivitiesRequest>;

export type QueryOrganizationsLocationsActivityTypesActivitiesResponse = GoogleCloudPolicyanalyzerV1QueryActivityResponse;
export const QueryOrganizationsLocationsActivityTypesActivitiesResponse = GoogleCloudPolicyanalyzerV1QueryActivityResponse;

export type QueryOrganizationsLocationsActivityTypesActivitiesError = CommonErrors;

export const queryOrganizationsLocationsActivityTypesActivities = API.makePaginated(() => ({
  input: QueryOrganizationsLocationsActivityTypesActivitiesRequest,
  output: QueryOrganizationsLocationsActivityTypesActivitiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Queries policy activities on Google Cloud resources. */
export interface QueryFoldersLocationsActivityTypesActivitiesRequest {
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. `pageToken` must be the value of `nextPageToken` from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Required. The container resource on which to execute the request. Acceptable formats: `projects/[PROJECT_ID|PROJECT_NUMBER]/locations/[LOCATION]/activityTypes/[ACTIVITY_TYPE]` LOCATION here refers to Google Cloud Locations: https://cloud.google.com/about/locations/ */
  parent: string;
  /** Optional. Filter expression to restrict the activities returned. For serviceAccountLastAuthentication activities, supported filters are: - `activities.full_resource_name {=} [STRING]` - `activities.fullResourceName {=} [STRING]` where `[STRING]` is the full resource name of the service account. For serviceAccountKeyLastAuthentication activities, supported filters are: - `activities.full_resource_name {=} [STRING]` - `activities.fullResourceName {=} [STRING]` where `[STRING]` is the full resource name of the service account key. */
  filter?: string;
  /** Optional. The maximum number of results to return from this request. Max limit is 1000. Non-positive values are ignored. The presence of `nextPageToken` in the response indicates that more results might be available. */
  pageSize?: number;
}

export const QueryFoldersLocationsActivityTypesActivitiesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/folders/{foldersId}/locations/{locationsId}/activityTypes/{activityTypesId}/activities:query" }),
  svc,
) as unknown as Schema.Schema<QueryFoldersLocationsActivityTypesActivitiesRequest>;

export type QueryFoldersLocationsActivityTypesActivitiesResponse = GoogleCloudPolicyanalyzerV1QueryActivityResponse;
export const QueryFoldersLocationsActivityTypesActivitiesResponse = GoogleCloudPolicyanalyzerV1QueryActivityResponse;

export type QueryFoldersLocationsActivityTypesActivitiesError = CommonErrors;

export const queryFoldersLocationsActivityTypesActivities = API.makePaginated(() => ({
  input: QueryFoldersLocationsActivityTypesActivitiesRequest,
  output: QueryFoldersLocationsActivityTypesActivitiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Queries policy activities on Google Cloud resources. */
export interface QueryProjectsLocationsActivityTypesActivitiesRequest {
  /** Optional. The maximum number of results to return from this request. Max limit is 1000. Non-positive values are ignored. The presence of `nextPageToken` in the response indicates that more results might be available. */
  pageSize?: number;
  /** Optional. If present, then retrieve the next batch of results from the preceding call to this method. `pageToken` must be the value of `nextPageToken` from the previous response. The values of other method parameters should be identical to those in the previous call. */
  pageToken?: string;
  /** Required. The container resource on which to execute the request. Acceptable formats: `projects/[PROJECT_ID|PROJECT_NUMBER]/locations/[LOCATION]/activityTypes/[ACTIVITY_TYPE]` LOCATION here refers to Google Cloud Locations: https://cloud.google.com/about/locations/ */
  parent: string;
  /** Optional. Filter expression to restrict the activities returned. For serviceAccountLastAuthentication activities, supported filters are: - `activities.full_resource_name {=} [STRING]` - `activities.fullResourceName {=} [STRING]` where `[STRING]` is the full resource name of the service account. For serviceAccountKeyLastAuthentication activities, supported filters are: - `activities.full_resource_name {=} [STRING]` - `activities.fullResourceName {=} [STRING]` where `[STRING]` is the full resource name of the service account key. */
  filter?: string;
}

export const QueryProjectsLocationsActivityTypesActivitiesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/activityTypes/{activityTypesId}/activities:query" }),
  svc,
) as unknown as Schema.Schema<QueryProjectsLocationsActivityTypesActivitiesRequest>;

export type QueryProjectsLocationsActivityTypesActivitiesResponse = GoogleCloudPolicyanalyzerV1QueryActivityResponse;
export const QueryProjectsLocationsActivityTypesActivitiesResponse = GoogleCloudPolicyanalyzerV1QueryActivityResponse;

export type QueryProjectsLocationsActivityTypesActivitiesError = CommonErrors;

export const queryProjectsLocationsActivityTypesActivities = API.makePaginated(() => ({
  input: QueryProjectsLocationsActivityTypesActivitiesRequest,
  output: QueryProjectsLocationsActivityTypesActivitiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

