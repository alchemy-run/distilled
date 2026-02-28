// ==========================================================================
// My Business Place Actions API (mybusinessplaceactions v1)
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
  name: "mybusinessplaceactions",
  version: "v1",
  rootUrl: "https://mybusinessplaceactions.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface PlaceActionTypeMetadata {
  /** The place action type. */
  placeActionType?: "PLACE_ACTION_TYPE_UNSPECIFIED" | "APPOINTMENT" | "ONLINE_APPOINTMENT" | "DINING_RESERVATION" | "FOOD_ORDERING" | "FOOD_DELIVERY" | "FOOD_TAKEOUT" | "SHOP_ONLINE" | "SOLOPRENEUR_APPOINTMENT" | (string & {});
  /** The localized display name for the attribute, if available; otherwise, the English display name. */
  displayName?: string;
}

export const PlaceActionTypeMetadata: Schema.Schema<PlaceActionTypeMetadata> = Schema.suspend(() => Schema.Struct({
  placeActionType: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "PlaceActionTypeMetadata" }) as any as Schema.Schema<PlaceActionTypeMetadata>;

export interface ListPlaceActionTypeMetadataResponse {
  /** A collection of metadata for the available place action types. */
  placeActionTypeMetadata?: Array<PlaceActionTypeMetadata>;
  /** If the number of action types exceeded the requested page size, this field will be populated with a token to fetch the next page on a subsequent call to `placeActionTypeMetadata.list`. If there are no more results, this field will not be present in the response. */
  nextPageToken?: string;
}

export const ListPlaceActionTypeMetadataResponse: Schema.Schema<ListPlaceActionTypeMetadataResponse> = Schema.suspend(() => Schema.Struct({
  placeActionTypeMetadata: Schema.optional(Schema.Array(PlaceActionTypeMetadata)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPlaceActionTypeMetadataResponse" }) as any as Schema.Schema<ListPlaceActionTypeMetadataResponse>;

export interface PlaceActionLink {
  /** Optional. The resource name, in the format `locations/{location_id}/placeActionLinks/{place_action_link_id}`. The name field will only be considered in UpdatePlaceActionLink and DeletePlaceActionLink requests for updating and deleting links respectively. However, it will be ignored in CreatePlaceActionLink request, where `place_action_link_id` will be assigned by the server on successful creation of a new link and returned as part of the response. */
  name?: string;
  /** Output only. Specifies the provider type. */
  providerType?: "PROVIDER_TYPE_UNSPECIFIED" | "MERCHANT" | "AGGREGATOR_3P" | (string & {});
  /** Output only. Indicates whether this link can be edited by the client. */
  isEditable?: boolean;
  /** Required. The link uri. The same uri can be reused for different action types across different locations. However, only one place action link is allowed for each unique combination of (uri, place action type, location). */
  uri?: string;
  /** Required. The type of place action that can be performed using this link. */
  placeActionType?: "PLACE_ACTION_TYPE_UNSPECIFIED" | "APPOINTMENT" | "ONLINE_APPOINTMENT" | "DINING_RESERVATION" | "FOOD_ORDERING" | "FOOD_DELIVERY" | "FOOD_TAKEOUT" | "SHOP_ONLINE" | "SOLOPRENEUR_APPOINTMENT" | (string & {});
  /** Optional. Whether this link is preferred by the merchant. Only one link can be marked as preferred per place action type at a location. If a future request marks a different link as preferred for the same place action type, then the current preferred link (if any exists) will lose its preference. */
  isPreferred?: boolean;
  /** Output only. The time when the place action link was created. */
  createTime?: string;
  /** Output only. The time when the place action link was last modified. */
  updateTime?: string;
}

export const PlaceActionLink: Schema.Schema<PlaceActionLink> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  providerType: Schema.optional(Schema.String),
  isEditable: Schema.optional(Schema.Boolean),
  uri: Schema.optional(Schema.String),
  placeActionType: Schema.optional(Schema.String),
  isPreferred: Schema.optional(Schema.Boolean),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "PlaceActionLink" }) as any as Schema.Schema<PlaceActionLink>;

export interface ListPlaceActionLinksResponse {
  /** The returned list of place action links. */
  placeActionLinks?: Array<PlaceActionLink>;
  /** If there are more place action links than the requested page size, then this field is populated with a token to fetch the next page of results. */
  nextPageToken?: string;
}

export const ListPlaceActionLinksResponse: Schema.Schema<ListPlaceActionLinksResponse> = Schema.suspend(() => Schema.Struct({
  placeActionLinks: Schema.optional(Schema.Array(PlaceActionLink)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPlaceActionLinksResponse" }) as any as Schema.Schema<ListPlaceActionLinksResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

// ==========================================================================
// Operations
// ==========================================================================

/** Returns the list of available place action types for a location or country. */
export interface ListPlaceActionTypeMetadataRequest {
  /** Optional. The IETF BCP-47 code of language to get display names in. If this language is not available, they will be provided in English. */
  languageCode?: string;
  /** Optional. How many action types to include per page. Default is 10, minimum is 1. */
  pageSize?: number;
  /** Optional. If specified, the next page of place action type metadata is retrieved. The `pageToken` is returned when a call to `placeActionTypeMetadata.list` returns more results than can fit into the requested page size. */
  pageToken?: string;
  /** Optional. A filter constraining the place action types to return metadata for. The response includes entries that match the filter. We support only the following filters: 1. location=XYZ where XYZ is a string indicating the resource name of a location, in the format `locations/{location_id}`. 2. region_code=XYZ where XYZ is a Unicode CLDR region code to find available action types. If no filter is provided, all place action types are returned. */
  filter?: string;
}

export const ListPlaceActionTypeMetadataRequest = Schema.Struct({
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/placeActionTypeMetadata" }),
  svc,
) as unknown as Schema.Schema<ListPlaceActionTypeMetadataRequest>;

export type ListPlaceActionTypeMetadataResponse_Op = ListPlaceActionTypeMetadataResponse;
export const ListPlaceActionTypeMetadataResponse_Op = ListPlaceActionTypeMetadataResponse;

export type ListPlaceActionTypeMetadataError = CommonErrors;

export const listPlaceActionTypeMetadata = API.makePaginated(() => ({
  input: ListPlaceActionTypeMetadataRequest,
  output: ListPlaceActionTypeMetadataResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the place action links for the specified location. */
export interface ListLocationsPlaceActionLinksRequest {
  /** Required. The name of the location whose place action links will be listed. `locations/{location_id}`. */
  parent: string;
  /** Optional. A filter constraining the place action links to return. The response includes entries that match the filter. We support only the following filter: 1. place_action_type=XYZ where XYZ is a valid PlaceActionType. */
  filter?: string;
  /** Optional. How many place action links to return per page. Default of 10. The minimum is 1. */
  pageSize?: number;
  /** Optional. If specified, returns the next page of place action links. */
  pageToken?: string;
}

export const ListLocationsPlaceActionLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/locations/{locationsId}/placeActionLinks" }),
  svc,
) as unknown as Schema.Schema<ListLocationsPlaceActionLinksRequest>;

export type ListLocationsPlaceActionLinksResponse = ListPlaceActionLinksResponse;
export const ListLocationsPlaceActionLinksResponse = ListPlaceActionLinksResponse;

export type ListLocationsPlaceActionLinksError = CommonErrors;

export const listLocationsPlaceActionLinks = API.makePaginated(() => ({
  input: ListLocationsPlaceActionLinksRequest,
  output: ListLocationsPlaceActionLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the specified place action link. */
export interface GetLocationsPlaceActionLinksRequest {
  /** Required. The name of the place action link to fetch. */
  name: string;
}

export const GetLocationsPlaceActionLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/locations/{locationsId}/placeActionLinks/{placeActionLinksId}" }),
  svc,
) as unknown as Schema.Schema<GetLocationsPlaceActionLinksRequest>;

export type GetLocationsPlaceActionLinksResponse = PlaceActionLink;
export const GetLocationsPlaceActionLinksResponse = PlaceActionLink;

export type GetLocationsPlaceActionLinksError = CommonErrors;

export const getLocationsPlaceActionLinks: API.OperationMethod<GetLocationsPlaceActionLinksRequest, GetLocationsPlaceActionLinksResponse, GetLocationsPlaceActionLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetLocationsPlaceActionLinksRequest,
  output: GetLocationsPlaceActionLinksResponse,
  errors: [],
}));

/** Creates a place action link associated with the specified location, and returns it. The request is considered duplicate if the `parent`, `place_action_link.uri` and `place_action_link.place_action_type` are the same as a previous request. */
export interface CreateLocationsPlaceActionLinksRequest {
  /** Required. The resource name of the location where to create this place action link. `locations/{location_id}`. */
  parent: string;
  /** Request body */
  body?: PlaceActionLink;
}

export const CreateLocationsPlaceActionLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(PlaceActionLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/locations/{locationsId}/placeActionLinks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateLocationsPlaceActionLinksRequest>;

export type CreateLocationsPlaceActionLinksResponse = PlaceActionLink;
export const CreateLocationsPlaceActionLinksResponse = PlaceActionLink;

export type CreateLocationsPlaceActionLinksError = CommonErrors;

export const createLocationsPlaceActionLinks: API.OperationMethod<CreateLocationsPlaceActionLinksRequest, CreateLocationsPlaceActionLinksResponse, CreateLocationsPlaceActionLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateLocationsPlaceActionLinksRequest,
  output: CreateLocationsPlaceActionLinksResponse,
  errors: [],
}));

/** Updates the specified place action link and returns it. */
export interface PatchLocationsPlaceActionLinksRequest {
  /** Optional. The resource name, in the format `locations/{location_id}/placeActionLinks/{place_action_link_id}`. The name field will only be considered in UpdatePlaceActionLink and DeletePlaceActionLink requests for updating and deleting links respectively. However, it will be ignored in CreatePlaceActionLink request, where `place_action_link_id` will be assigned by the server on successful creation of a new link and returned as part of the response. */
  name: string;
  /** Required. The specific fields to update. The only editable fields are `uri`, `place_action_type` and `is_preferred`. If the updated link already exists at the same location with the same `place_action_type` and `uri`, fails with an `ALREADY_EXISTS` error. */
  updateMask?: string;
  /** Request body */
  body?: PlaceActionLink;
}

export const PatchLocationsPlaceActionLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(PlaceActionLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/locations/{locationsId}/placeActionLinks/{placeActionLinksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchLocationsPlaceActionLinksRequest>;

export type PatchLocationsPlaceActionLinksResponse = PlaceActionLink;
export const PatchLocationsPlaceActionLinksResponse = PlaceActionLink;

export type PatchLocationsPlaceActionLinksError = CommonErrors;

export const patchLocationsPlaceActionLinks: API.OperationMethod<PatchLocationsPlaceActionLinksRequest, PatchLocationsPlaceActionLinksResponse, PatchLocationsPlaceActionLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchLocationsPlaceActionLinksRequest,
  output: PatchLocationsPlaceActionLinksResponse,
  errors: [],
}));

/** Deletes a place action link from the specified location. */
export interface DeleteLocationsPlaceActionLinksRequest {
  /** Required. The resource name of the place action link to remove from the location. */
  name: string;
}

export const DeleteLocationsPlaceActionLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/locations/{locationsId}/placeActionLinks/{placeActionLinksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteLocationsPlaceActionLinksRequest>;

export type DeleteLocationsPlaceActionLinksResponse = Empty;
export const DeleteLocationsPlaceActionLinksResponse = Empty;

export type DeleteLocationsPlaceActionLinksError = CommonErrors;

export const deleteLocationsPlaceActionLinks: API.OperationMethod<DeleteLocationsPlaceActionLinksRequest, DeleteLocationsPlaceActionLinksResponse, DeleteLocationsPlaceActionLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteLocationsPlaceActionLinksRequest,
  output: DeleteLocationsPlaceActionLinksResponse,
  errors: [],
}));

