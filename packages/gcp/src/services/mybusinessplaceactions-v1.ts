// ==========================================================================
// My Business Place Actions API (mybusinessplaceactions v1)
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
  placeActionType?:
    | "PLACE_ACTION_TYPE_UNSPECIFIED"
    | "APPOINTMENT"
    | "ONLINE_APPOINTMENT"
    | "DINING_RESERVATION"
    | "FOOD_ORDERING"
    | "FOOD_DELIVERY"
    | "FOOD_TAKEOUT"
    | "SHOP_ONLINE"
    | "SOLOPRENEUR_APPOINTMENT"
    | (string & {});
  /** The localized display name for the attribute, if available; otherwise, the English display name. */
  displayName?: string;
}

export const PlaceActionTypeMetadata: Schema.Schema<PlaceActionTypeMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      placeActionType: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlaceActionTypeMetadata",
  }) as any as Schema.Schema<PlaceActionTypeMetadata>;

export interface ListPlaceActionTypeMetadataResponse {
  /** If the number of action types exceeded the requested page size, this field will be populated with a token to fetch the next page on a subsequent call to `placeActionTypeMetadata.list`. If there are no more results, this field will not be present in the response. */
  nextPageToken?: string;
  /** A collection of metadata for the available place action types. */
  placeActionTypeMetadata?: Array<PlaceActionTypeMetadata>;
}

export const ListPlaceActionTypeMetadataResponse: Schema.Schema<ListPlaceActionTypeMetadataResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      placeActionTypeMetadata: Schema.optional(
        Schema.Array(PlaceActionTypeMetadata),
      ),
    }),
  ).annotate({
    identifier: "ListPlaceActionTypeMetadataResponse",
  }) as any as Schema.Schema<ListPlaceActionTypeMetadataResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface PlaceActionLink {
  /** Output only. Specifies the provider type. */
  providerType?:
    | "PROVIDER_TYPE_UNSPECIFIED"
    | "MERCHANT"
    | "AGGREGATOR_3P"
    | (string & {});
  /** Output only. Indicates whether this link can be edited by the client. */
  isEditable?: boolean;
  /** Output only. The time when the place action link was created. */
  createTime?: string;
  /** Optional. The resource name, in the format `locations/{location_id}/placeActionLinks/{place_action_link_id}`. The name field will only be considered in UpdatePlaceActionLink and DeletePlaceActionLink requests for updating and deleting links respectively. However, it will be ignored in CreatePlaceActionLink request, where `place_action_link_id` will be assigned by the server on successful creation of a new link and returned as part of the response. */
  name?: string;
  /** Output only. The time when the place action link was last modified. */
  updateTime?: string;
  /** Required. The link uri. The same uri can be reused for different action types across different locations. However, only one place action link is allowed for each unique combination of (uri, place action type, location). */
  uri?: string;
  /** Required. The type of place action that can be performed using this link. */
  placeActionType?:
    | "PLACE_ACTION_TYPE_UNSPECIFIED"
    | "APPOINTMENT"
    | "ONLINE_APPOINTMENT"
    | "DINING_RESERVATION"
    | "FOOD_ORDERING"
    | "FOOD_DELIVERY"
    | "FOOD_TAKEOUT"
    | "SHOP_ONLINE"
    | "SOLOPRENEUR_APPOINTMENT"
    | (string & {});
  /** Optional. Whether this link is preferred by the merchant. Only one link can be marked as preferred per place action type at a location. If a future request marks a different link as preferred for the same place action type, then the current preferred link (if any exists) will lose its preference. */
  isPreferred?: boolean;
}

export const PlaceActionLink: Schema.Schema<PlaceActionLink> = Schema.suspend(
  () =>
    Schema.Struct({
      providerType: Schema.optional(Schema.String),
      isEditable: Schema.optional(Schema.Boolean),
      createTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
      placeActionType: Schema.optional(Schema.String),
      isPreferred: Schema.optional(Schema.Boolean),
    }),
).annotate({
  identifier: "PlaceActionLink",
}) as any as Schema.Schema<PlaceActionLink>;

export interface ListPlaceActionLinksResponse {
  /** If there are more place action links than the requested page size, then this field is populated with a token to fetch the next page of results. */
  nextPageToken?: string;
  /** The returned list of place action links. */
  placeActionLinks?: Array<PlaceActionLink>;
}

export const ListPlaceActionLinksResponse: Schema.Schema<ListPlaceActionLinksResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      placeActionLinks: Schema.optional(Schema.Array(PlaceActionLink)),
    }),
  ).annotate({
    identifier: "ListPlaceActionLinksResponse",
  }) as any as Schema.Schema<ListPlaceActionLinksResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListPlaceActionTypeMetadataRequest {
  /** Optional. How many action types to include per page. Default is 10, minimum is 1. */
  pageSize?: number;
  /** Optional. If specified, the next page of place action type metadata is retrieved. The `pageToken` is returned when a call to `placeActionTypeMetadata.list` returns more results than can fit into the requested page size. */
  pageToken?: string;
  /** Optional. The IETF BCP-47 code of language to get display names in. If this language is not available, they will be provided in English. */
  languageCode?: string;
  /** Optional. A filter constraining the place action types to return metadata for. The response includes entries that match the filter. We support only the following filters: 1. location=XYZ where XYZ is a string indicating the resource name of a location, in the format `locations/{location_id}`. 2. region_code=XYZ where XYZ is a Unicode CLDR region code to find available action types. If no filter is provided, all place action types are returned. */
  filter?: string;
}

export const ListPlaceActionTypeMetadataRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  languageCode: Schema.optional(Schema.String).pipe(
    T.HttpQuery("languageCode"),
  ),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/placeActionTypeMetadata" }),
  svc,
) as unknown as Schema.Schema<ListPlaceActionTypeMetadataRequest>;

export type ListPlaceActionTypeMetadataResponse_Op =
  ListPlaceActionTypeMetadataResponse;
export const ListPlaceActionTypeMetadataResponse_Op =
  ListPlaceActionTypeMetadataResponse;

export type ListPlaceActionTypeMetadataError = DefaultErrors;

/** Returns the list of available place action types for a location or country. */
export const listPlaceActionTypeMetadata: API.PaginatedOperationMethod<
  ListPlaceActionTypeMetadataRequest,
  ListPlaceActionTypeMetadataResponse_Op,
  ListPlaceActionTypeMetadataError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPlaceActionTypeMetadataRequest,
  output: ListPlaceActionTypeMetadataResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteLocationsPlaceActionLinksRequest {
  /** Required. The resource name of the place action link to remove from the location. */
  name: string;
}

export const DeleteLocationsPlaceActionLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/locations/{locationsId}/placeActionLinks/{placeActionLinksId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteLocationsPlaceActionLinksRequest>;

export type DeleteLocationsPlaceActionLinksResponse = Empty;
export const DeleteLocationsPlaceActionLinksResponse = Empty;

export type DeleteLocationsPlaceActionLinksError = DefaultErrors;

/** Deletes a place action link from the specified location. */
export const deleteLocationsPlaceActionLinks: API.OperationMethod<
  DeleteLocationsPlaceActionLinksRequest,
  DeleteLocationsPlaceActionLinksResponse,
  DeleteLocationsPlaceActionLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteLocationsPlaceActionLinksRequest,
  output: DeleteLocationsPlaceActionLinksResponse,
  errors: [],
}));

export interface ListLocationsPlaceActionLinksRequest {
  /** Required. The name of the location whose place action links will be listed. `locations/{location_id}`. */
  parent: string;
  /** Optional. How many place action links to return per page. Default of 10. The minimum is 1. */
  pageSize?: number;
  /** Optional. If specified, returns the next page of place action links. */
  pageToken?: string;
  /** Optional. A filter constraining the place action links to return. The response includes entries that match the filter. We support only the following filter: 1. place_action_type=XYZ where XYZ is a valid PlaceActionType. */
  filter?: string;
}

export const ListLocationsPlaceActionLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/locations/{locationsId}/placeActionLinks",
  }),
  svc,
) as unknown as Schema.Schema<ListLocationsPlaceActionLinksRequest>;

export type ListLocationsPlaceActionLinksResponse =
  ListPlaceActionLinksResponse;
export const ListLocationsPlaceActionLinksResponse =
  ListPlaceActionLinksResponse;

export type ListLocationsPlaceActionLinksError = DefaultErrors;

/** Lists the place action links for the specified location. */
export const listLocationsPlaceActionLinks: API.PaginatedOperationMethod<
  ListLocationsPlaceActionLinksRequest,
  ListLocationsPlaceActionLinksResponse,
  ListLocationsPlaceActionLinksError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListLocationsPlaceActionLinksRequest,
  output: ListLocationsPlaceActionLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

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
  T.Http({
    method: "PATCH",
    path: "v1/locations/{locationsId}/placeActionLinks/{placeActionLinksId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchLocationsPlaceActionLinksRequest>;

export type PatchLocationsPlaceActionLinksResponse = PlaceActionLink;
export const PatchLocationsPlaceActionLinksResponse = PlaceActionLink;

export type PatchLocationsPlaceActionLinksError = DefaultErrors;

/** Updates the specified place action link and returns it. */
export const patchLocationsPlaceActionLinks: API.OperationMethod<
  PatchLocationsPlaceActionLinksRequest,
  PatchLocationsPlaceActionLinksResponse,
  PatchLocationsPlaceActionLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchLocationsPlaceActionLinksRequest,
  output: PatchLocationsPlaceActionLinksResponse,
  errors: [],
}));

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
  T.Http({
    method: "POST",
    path: "v1/locations/{locationsId}/placeActionLinks",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateLocationsPlaceActionLinksRequest>;

export type CreateLocationsPlaceActionLinksResponse = PlaceActionLink;
export const CreateLocationsPlaceActionLinksResponse = PlaceActionLink;

export type CreateLocationsPlaceActionLinksError = DefaultErrors;

/** Creates a place action link associated with the specified location, and returns it. The request is considered duplicate if the `parent`, `place_action_link.uri` and `place_action_link.place_action_type` are the same as a previous request. */
export const createLocationsPlaceActionLinks: API.OperationMethod<
  CreateLocationsPlaceActionLinksRequest,
  CreateLocationsPlaceActionLinksResponse,
  CreateLocationsPlaceActionLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateLocationsPlaceActionLinksRequest,
  output: CreateLocationsPlaceActionLinksResponse,
  errors: [],
}));

export interface GetLocationsPlaceActionLinksRequest {
  /** Required. The name of the place action link to fetch. */
  name: string;
}

export const GetLocationsPlaceActionLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/locations/{locationsId}/placeActionLinks/{placeActionLinksId}",
  }),
  svc,
) as unknown as Schema.Schema<GetLocationsPlaceActionLinksRequest>;

export type GetLocationsPlaceActionLinksResponse = PlaceActionLink;
export const GetLocationsPlaceActionLinksResponse = PlaceActionLink;

export type GetLocationsPlaceActionLinksError = DefaultErrors;

/** Gets the specified place action link. */
export const getLocationsPlaceActionLinks: API.OperationMethod<
  GetLocationsPlaceActionLinksRequest,
  GetLocationsPlaceActionLinksResponse,
  GetLocationsPlaceActionLinksError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLocationsPlaceActionLinksRequest,
  output: GetLocationsPlaceActionLinksResponse,
  errors: [],
}));
