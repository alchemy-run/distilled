// ==========================================================================
// Cloud Location Finder API (cloudlocationfinder v1)
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
  name: "cloudlocationfinder",
  version: "v1",
  rootUrl: "https://cloudlocationfinder.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface CloudLocation {
  /** Identifier. Name of the cloud location. Unique name of the cloud location including project and location using the form: `projects/{project_id}/locations/{location}/cloudLocations/{cloud_location}` */
  name?: string;
  /** Output only. The containing cloud location in the strict nesting hierarchy. For example, the containing cloud location of a zone is a region. */
  containingCloudLocation?: string;
  /** Optional. The human-readable name of the cloud location. Example: us-east-2, us-east1. */
  displayName?: string;
  /** Optional. The provider of the cloud location. Values can be Google Cloud or third-party providers, including AWS, Azure, or Oracle Cloud Infrastructure. */
  cloudProvider?: "CLOUD_PROVIDER_UNSPECIFIED" | "CLOUD_PROVIDER_GCP" | "CLOUD_PROVIDER_AWS" | "CLOUD_PROVIDER_AZURE" | "CLOUD_PROVIDER_OCI" | (string & {});
  /** Optional. The two-letter ISO 3166-1 alpha-2 code of the cloud location. Examples: US, JP, KR. */
  territoryCode?: string;
  /** Optional. The type of the cloud location. */
  cloudLocationType?: "CLOUD_LOCATION_TYPE_UNSPECIFIED" | "CLOUD_LOCATION_TYPE_REGION" | "CLOUD_LOCATION_TYPE_ZONE" | "CLOUD_LOCATION_TYPE_REGION_EXTENSION" | "CLOUD_LOCATION_TYPE_GDCC_ZONE" | (string & {});
  /** Optional. The carbon free energy percentage of the cloud location. This represents the average percentage of time customers' application will be running on carbon-free energy. See https://cloud.google.com/sustainability/region-carbon for more details. There is a difference between default value 0 and unset value. 0 means the carbon free energy percentage is 0%, while unset value means the carbon footprint data is not available. */
  carbonFreeEnergyPercentage?: number;
}

export const CloudLocation: Schema.Schema<CloudLocation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  containingCloudLocation: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  cloudProvider: Schema.optional(Schema.String),
  territoryCode: Schema.optional(Schema.String),
  cloudLocationType: Schema.optional(Schema.String),
  carbonFreeEnergyPercentage: Schema.optional(Schema.Number),
})).annotate({ identifier: "CloudLocation" }) as any as Schema.Schema<CloudLocation>;

export interface ListCloudLocationsResponse {
  /** Output only. List of cloud locations. */
  cloudLocations?: Array<CloudLocation>;
  /** Output only. The continuation token, used to page through large result sets. Provide this value in a subsequent request as page_token in subsequent requests to retrieve the next page. If this field is not present, there are no subsequent results. */
  nextPageToken?: string;
}

export const ListCloudLocationsResponse: Schema.Schema<ListCloudLocationsResponse> = Schema.suspend(() => Schema.Struct({
  cloudLocations: Schema.optional(Schema.Array(CloudLocation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListCloudLocationsResponse" }) as any as Schema.Schema<ListCloudLocationsResponse>;

export interface SearchCloudLocationsResponse {
  /** Output only. List of cloud locations. */
  cloudLocations?: Array<CloudLocation>;
  /** Output only. The continuation token, used to page through large result sets. Provide this value in a subsequent request as page_token in subsequent requests to retrieve the next page. If this field is not present, there are no subsequent results. */
  nextPageToken?: string;
}

export const SearchCloudLocationsResponse: Schema.Schema<SearchCloudLocationsResponse> = Schema.suspend(() => Schema.Struct({
  cloudLocations: Schema.optional(Schema.Array(CloudLocation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchCloudLocationsResponse" }) as any as Schema.Schema<SearchCloudLocationsResponse>;

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(Location)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

export const listProjectsLocations = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = CommonErrors;

export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

/** Lists cloud locations under a given project and location. */
export interface ListProjectsLocationsCloudLocationsRequest {
  /** Required. The parent, which owns this collection of cloud locations. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Optional. The maximum number of cloud locations to return per page. The service might return fewer cloud locations than this value. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. Provide page token returned by a previous 'ListCloudLocations' call to retrieve the next page of results. When paginating, all other parameters provided to 'ListCloudLocations' must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. A filter expression that filters resources listed in the response. The expression is in the form of field=value. For example, 'cloud_location_type=CLOUD_LOCATION_TYPE_REGION'. Multiple filter queries are space-separated. For example, 'cloud_location_type=CLOUD_LOCATION_TYPE_REGION territory_code="US"' By default, each expression is an AND expression. However, you can include AND and OR expressions explicitly. */
  filter?: string;
}

export const ListProjectsLocationsCloudLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/cloudLocations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCloudLocationsRequest>;

export type ListProjectsLocationsCloudLocationsResponse = ListCloudLocationsResponse;
export const ListProjectsLocationsCloudLocationsResponse = ListCloudLocationsResponse;

export type ListProjectsLocationsCloudLocationsError = CommonErrors;

export const listProjectsLocationsCloudLocations = API.makePaginated(() => ({
  input: ListProjectsLocationsCloudLocationsRequest,
  output: ListProjectsLocationsCloudLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves a resource containing information about a cloud location. */
export interface GetProjectsLocationsCloudLocationsRequest {
  /** Required. Name of the resource. */
  name: string;
}

export const GetProjectsLocationsCloudLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/cloudLocations/{cloudLocationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCloudLocationsRequest>;

export type GetProjectsLocationsCloudLocationsResponse = CloudLocation;
export const GetProjectsLocationsCloudLocationsResponse = CloudLocation;

export type GetProjectsLocationsCloudLocationsError = CommonErrors;

export const getProjectsLocationsCloudLocations: API.OperationMethod<GetProjectsLocationsCloudLocationsRequest, GetProjectsLocationsCloudLocationsResponse, GetProjectsLocationsCloudLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCloudLocationsRequest,
  output: GetProjectsLocationsCloudLocationsResponse,
  errors: [],
}));

/** Searches for cloud locations from a given source location. */
export interface SearchProjectsLocationsCloudLocationsRequest {
  /** Required. The parent, which owns this collection of cloud locations. Format: projects/{project}/locations/{location} */
  parent: string;
  /** Required. The source cloud location to search from. Example search can be searching nearby cloud locations from the source cloud location by latency. */
  sourceCloudLocation?: string;
  /** Optional. The maximum number of cloud locations to return. The service might return fewer cloud locations than this value. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. Provide Page token returned by a previous 'ListCloudLocations' call to retrieve the next page of results. When paginating, all other parameters provided to 'ListCloudLocations' must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The query string in search query syntax. While filter is used to filter the search results by attributes, query is used to specify the search requirements. */
  query?: string;
}

export const SearchProjectsLocationsCloudLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  sourceCloudLocation: Schema.optional(Schema.String).pipe(T.HttpQuery("sourceCloudLocation")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/cloudLocations:search" }),
  svc,
) as unknown as Schema.Schema<SearchProjectsLocationsCloudLocationsRequest>;

export type SearchProjectsLocationsCloudLocationsResponse = SearchCloudLocationsResponse;
export const SearchProjectsLocationsCloudLocationsResponse = SearchCloudLocationsResponse;

export type SearchProjectsLocationsCloudLocationsError = CommonErrors;

export const searchProjectsLocationsCloudLocations = API.makePaginated(() => ({
  input: SearchProjectsLocationsCloudLocationsRequest,
  output: SearchProjectsLocationsCloudLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

