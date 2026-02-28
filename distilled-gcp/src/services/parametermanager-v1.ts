// ==========================================================================
// Parameter Manager API (parametermanager v1)
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
  name: "parametermanager",
  version: "v1",
  rootUrl: "https://parametermanager.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ResourcePolicyMember {
  /** Output only. IAM policy binding member referring to a Google Cloud resource by user-assigned name (https://google.aip.dev/122). If a resource is deleted and recreated with the same name, the binding will be applicable to the new resource. Example: `principal://parametermanager.googleapis.com/projects/12345/name/locations/us-central1-a/parameters/my-parameter` */
  iamPolicyNamePrincipal?: string;
  /** Output only. IAM policy binding member referring to a Google Cloud resource by system-assigned unique identifier (https://google.aip.dev/148#uid). If a resource is deleted and recreated with the same name, the binding will not be applicable to the new resource Example: `principal://parametermanager.googleapis.com/projects/12345/uid/locations/us-central1-a/parameters/a918fed5` */
  iamPolicyUidPrincipal?: string;
}

export const ResourcePolicyMember: Schema.Schema<ResourcePolicyMember> = Schema.suspend(() => Schema.Struct({
  iamPolicyNamePrincipal: Schema.optional(Schema.String),
  iamPolicyUidPrincipal: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourcePolicyMember" }) as any as Schema.Schema<ResourcePolicyMember>;

export interface Parameter {
  /** Identifier. [Output only] The resource name of the Parameter in the format `projects/* /locations/* /parameters/*`. */
  name?: string;
  /** Output only. [Output only] Create time stamp */
  createTime?: string;
  /** Output only. [Output only] Update time stamp */
  updateTime?: string;
  /** Optional. Labels as key value pairs */
  labels?: Record<string, string>;
  /** Optional. Specifies the format of a Parameter. */
  format?: "PARAMETER_FORMAT_UNSPECIFIED" | "UNFORMATTED" | "YAML" | "JSON" | (string & {});
  /** Output only. [Output-only] policy member strings of a Google Cloud resource. */
  policyMember?: ResourcePolicyMember;
  /** Optional. Customer managed encryption key (CMEK) to use for encrypting the Parameter Versions. If not set, the default Google-managed encryption key will be used. Cloud KMS CryptoKeys must reside in the same location as the Parameter. The expected format is `projects/* /locations/* /keyRings/* /cryptoKeys/*`. */
  kmsKey?: string;
}

export const Parameter: Schema.Schema<Parameter> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  format: Schema.optional(Schema.String),
  policyMember: Schema.optional(ResourcePolicyMember),
  kmsKey: Schema.optional(Schema.String),
})).annotate({ identifier: "Parameter" }) as any as Schema.Schema<Parameter>;

export interface ListParametersResponse {
  /** The list of Parameters */
  parameters?: Array<Parameter>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Unordered list. Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListParametersResponse: Schema.Schema<ListParametersResponse> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Array(Parameter)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListParametersResponse" }) as any as Schema.Schema<ListParametersResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface ParameterVersionPayload {
  /** Required. bytes data for storing payload. */
  data?: string;
}

export const ParameterVersionPayload: Schema.Schema<ParameterVersionPayload> = Schema.suspend(() => Schema.Struct({
  data: Schema.optional(Schema.String),
})).annotate({ identifier: "ParameterVersionPayload" }) as any as Schema.Schema<ParameterVersionPayload>;

export interface ParameterVersion {
  /** Identifier. [Output only] The resource name of the ParameterVersion in the format `projects/* /locations/* /parameters/* /versions/*`. */
  name?: string;
  /** Output only. [Output only] Create time stamp */
  createTime?: string;
  /** Output only. [Output only] Update time stamp */
  updateTime?: string;
  /** Optional. Disabled boolean to determine if a ParameterVersion acts as a metadata only resource (payload is never returned if disabled is true). If true any calls will always default to BASIC view even if the user explicitly passes FULL view as part of the request. A render call on a disabled resource fails with an error. Default value is False. */
  disabled?: boolean;
  /** Required. Immutable. Payload content of a ParameterVersion resource. This is only returned when the request provides the View value of FULL (default for GET request). */
  payload?: ParameterVersionPayload;
  /** Optional. Output only. [Output only] The resource name of the KMS key version used to encrypt the ParameterVersion payload. This field is populated only if the Parameter resource has customer managed encryption key (CMEK) configured. */
  kmsKeyVersion?: string;
}

export const ParameterVersion: Schema.Schema<ParameterVersion> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  disabled: Schema.optional(Schema.Boolean),
  payload: Schema.optional(ParameterVersionPayload),
  kmsKeyVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "ParameterVersion" }) as any as Schema.Schema<ParameterVersion>;

export interface ListParameterVersionsResponse {
  /** The list of ParameterVersions */
  parameterVersions?: Array<ParameterVersion>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Unordered list. Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListParameterVersionsResponse: Schema.Schema<ListParameterVersionsResponse> = Schema.suspend(() => Schema.Struct({
  parameterVersions: Schema.optional(Schema.Array(ParameterVersion)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListParameterVersionsResponse" }) as any as Schema.Schema<ListParameterVersionsResponse>;

export interface RenderParameterVersionResponse {
  /** Output only. Resource identifier of a ParameterVersion in the format `projects/* /locations/* /parameters/* /versions/*`. */
  parameterVersion?: string;
  /** Payload content of a ParameterVersion resource. */
  payload?: ParameterVersionPayload;
  /** Output only. Server generated rendered version of the user provided payload data (ParameterVersionPayload) which has substitutions of all (if any) references to a SecretManager SecretVersion resources. This substitution only works for a Parameter which is in JSON or YAML format. */
  renderedPayload?: string;
}

export const RenderParameterVersionResponse: Schema.Schema<RenderParameterVersionResponse> = Schema.suspend(() => Schema.Struct({
  parameterVersion: Schema.optional(Schema.String),
  payload: Schema.optional(ParameterVersionPayload),
  renderedPayload: Schema.optional(Schema.String),
})).annotate({ identifier: "RenderParameterVersionResponse" }) as any as Schema.Schema<RenderParameterVersionResponse>;

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

/** Lists information about the supported locations for this service. */
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

/** Lists Parameters in a given project and location. */
export interface ListProjectsLocationsParametersRequest {
  /** Required. Parent value for ListParametersRequest in the format `projects/* /locations/*`. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListParameters` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListParameters` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Filtering results */
  filter?: string;
  /** Optional. Hint for how to order the results */
  orderBy?: string;
}

export const ListProjectsLocationsParametersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/parameters" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsParametersRequest>;

export type ListProjectsLocationsParametersResponse = ListParametersResponse;
export const ListProjectsLocationsParametersResponse = ListParametersResponse;

export type ListProjectsLocationsParametersError = CommonErrors;

export const listProjectsLocationsParameters = API.makePaginated(() => ({
  input: ListProjectsLocationsParametersRequest,
  output: ListProjectsLocationsParametersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single Parameter. */
export interface GetProjectsLocationsParametersRequest {
  /** Required. Name of the resource in the format `projects/* /locations/* /parameters/*`. */
  name: string;
}

export const GetProjectsLocationsParametersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/parameters/{parametersId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsParametersRequest>;

export type GetProjectsLocationsParametersResponse = Parameter;
export const GetProjectsLocationsParametersResponse = Parameter;

export type GetProjectsLocationsParametersError = CommonErrors;

export const getProjectsLocationsParameters: API.OperationMethod<GetProjectsLocationsParametersRequest, GetProjectsLocationsParametersResponse, GetProjectsLocationsParametersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsParametersRequest,
  output: GetProjectsLocationsParametersResponse,
  errors: [],
}));

/** Creates a new Parameter in a given project and location. */
export interface CreateProjectsLocationsParametersRequest {
  /** Required. Value for parent in the format `projects/* /locations/*`. */
  parent: string;
  /** Required. Id of the Parameter resource */
  parameterId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Parameter;
}

export const CreateProjectsLocationsParametersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  parameterId: Schema.optional(Schema.String).pipe(T.HttpQuery("parameterId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Parameter).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/parameters", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsParametersRequest>;

export type CreateProjectsLocationsParametersResponse = Parameter;
export const CreateProjectsLocationsParametersResponse = Parameter;

export type CreateProjectsLocationsParametersError = CommonErrors;

export const createProjectsLocationsParameters: API.OperationMethod<CreateProjectsLocationsParametersRequest, CreateProjectsLocationsParametersResponse, CreateProjectsLocationsParametersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsParametersRequest,
  output: CreateProjectsLocationsParametersResponse,
  errors: [],
}));

/** Updates a single Parameter. */
export interface PatchProjectsLocationsParametersRequest {
  /** Identifier. [Output only] The resource name of the Parameter in the format `projects/* /locations/* /parameters/*`. */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the Parameter resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A mutable field will be overwritten if it is in the mask. If the user does not provide a mask then all mutable fields present in the request will be overwritten. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Parameter;
}

export const PatchProjectsLocationsParametersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Parameter).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/parameters/{parametersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsParametersRequest>;

export type PatchProjectsLocationsParametersResponse = Parameter;
export const PatchProjectsLocationsParametersResponse = Parameter;

export type PatchProjectsLocationsParametersError = CommonErrors;

export const patchProjectsLocationsParameters: API.OperationMethod<PatchProjectsLocationsParametersRequest, PatchProjectsLocationsParametersResponse, PatchProjectsLocationsParametersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsParametersRequest,
  output: PatchProjectsLocationsParametersResponse,
  errors: [],
}));

/** Deletes a single Parameter. */
export interface DeleteProjectsLocationsParametersRequest {
  /** Required. Name of the resource in the format `projects/* /locations/* /parameters/*`. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsParametersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/parameters/{parametersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsParametersRequest>;

export type DeleteProjectsLocationsParametersResponse = Empty;
export const DeleteProjectsLocationsParametersResponse = Empty;

export type DeleteProjectsLocationsParametersError = CommonErrors;

export const deleteProjectsLocationsParameters: API.OperationMethod<DeleteProjectsLocationsParametersRequest, DeleteProjectsLocationsParametersResponse, DeleteProjectsLocationsParametersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsParametersRequest,
  output: DeleteProjectsLocationsParametersResponse,
  errors: [],
}));

/** Lists ParameterVersions in a given project, location, and parameter. */
export interface ListProjectsLocationsParametersVersionsRequest {
  /** Required. Parent value for ListParameterVersionsRequest in the format `projects/* /locations/* /parameters/*`. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListParameterVersions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListParameterVersions` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Filtering results */
  filter?: string;
  /** Optional. Hint for how to order the results */
  orderBy?: string;
}

export const ListProjectsLocationsParametersVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/parameters/{parametersId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsParametersVersionsRequest>;

export type ListProjectsLocationsParametersVersionsResponse = ListParameterVersionsResponse;
export const ListProjectsLocationsParametersVersionsResponse = ListParameterVersionsResponse;

export type ListProjectsLocationsParametersVersionsError = CommonErrors;

export const listProjectsLocationsParametersVersions = API.makePaginated(() => ({
  input: ListProjectsLocationsParametersVersionsRequest,
  output: ListProjectsLocationsParametersVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single ParameterVersion. */
export interface GetProjectsLocationsParametersVersionsRequest {
  /** Required. Name of the resource in the format `projects/* /locations/* /parameters/* /versions/*`. */
  name: string;
  /** Optional. View of the ParameterVersion. In the default FULL view, all metadata & payload associated with the ParameterVersion will be returned. */
  view?: "VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const GetProjectsLocationsParametersVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/parameters/{parametersId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsParametersVersionsRequest>;

export type GetProjectsLocationsParametersVersionsResponse = ParameterVersion;
export const GetProjectsLocationsParametersVersionsResponse = ParameterVersion;

export type GetProjectsLocationsParametersVersionsError = CommonErrors;

export const getProjectsLocationsParametersVersions: API.OperationMethod<GetProjectsLocationsParametersVersionsRequest, GetProjectsLocationsParametersVersionsResponse, GetProjectsLocationsParametersVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsParametersVersionsRequest,
  output: GetProjectsLocationsParametersVersionsResponse,
  errors: [],
}));

/** Gets rendered version of a ParameterVersion. */
export interface RenderProjectsLocationsParametersVersionsRequest {
  /** Required. Name of the resource */
  name: string;
}

export const RenderProjectsLocationsParametersVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/parameters/{parametersId}/versions/{versionsId}:render" }),
  svc,
) as unknown as Schema.Schema<RenderProjectsLocationsParametersVersionsRequest>;

export type RenderProjectsLocationsParametersVersionsResponse = RenderParameterVersionResponse;
export const RenderProjectsLocationsParametersVersionsResponse = RenderParameterVersionResponse;

export type RenderProjectsLocationsParametersVersionsError = CommonErrors;

export const renderProjectsLocationsParametersVersions: API.OperationMethod<RenderProjectsLocationsParametersVersionsRequest, RenderProjectsLocationsParametersVersionsResponse, RenderProjectsLocationsParametersVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RenderProjectsLocationsParametersVersionsRequest,
  output: RenderProjectsLocationsParametersVersionsResponse,
  errors: [],
}));

/** Creates a new ParameterVersion in a given project, location, and parameter. */
export interface CreateProjectsLocationsParametersVersionsRequest {
  /** Required. Value for parent in the format `projects/* /locations/* /parameters/*`. */
  parent: string;
  /** Required. Id of the ParameterVersion resource */
  parameterVersionId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ParameterVersion;
}

export const CreateProjectsLocationsParametersVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  parameterVersionId: Schema.optional(Schema.String).pipe(T.HttpQuery("parameterVersionId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ParameterVersion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/parameters/{parametersId}/versions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsParametersVersionsRequest>;

export type CreateProjectsLocationsParametersVersionsResponse = ParameterVersion;
export const CreateProjectsLocationsParametersVersionsResponse = ParameterVersion;

export type CreateProjectsLocationsParametersVersionsError = CommonErrors;

export const createProjectsLocationsParametersVersions: API.OperationMethod<CreateProjectsLocationsParametersVersionsRequest, CreateProjectsLocationsParametersVersionsResponse, CreateProjectsLocationsParametersVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsParametersVersionsRequest,
  output: CreateProjectsLocationsParametersVersionsResponse,
  errors: [],
}));

/** Updates a single ParameterVersion. */
export interface PatchProjectsLocationsParametersVersionsRequest {
  /** Identifier. [Output only] The resource name of the ParameterVersion in the format `projects/* /locations/* /parameters/* /versions/*`. */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the ParameterVersion resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A mutable field will be overwritten if it is in the mask. If the user does not provide a mask then all mutable fields present in the request will be overwritten. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ParameterVersion;
}

export const PatchProjectsLocationsParametersVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ParameterVersion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/parameters/{parametersId}/versions/{versionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsParametersVersionsRequest>;

export type PatchProjectsLocationsParametersVersionsResponse = ParameterVersion;
export const PatchProjectsLocationsParametersVersionsResponse = ParameterVersion;

export type PatchProjectsLocationsParametersVersionsError = CommonErrors;

export const patchProjectsLocationsParametersVersions: API.OperationMethod<PatchProjectsLocationsParametersVersionsRequest, PatchProjectsLocationsParametersVersionsResponse, PatchProjectsLocationsParametersVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsParametersVersionsRequest,
  output: PatchProjectsLocationsParametersVersionsResponse,
  errors: [],
}));

/** Deletes a single ParameterVersion. */
export interface DeleteProjectsLocationsParametersVersionsRequest {
  /** Required. Name of the resource in the format `projects/* /locations/* /parameters/* /versions/*`. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsParametersVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/parameters/{parametersId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsParametersVersionsRequest>;

export type DeleteProjectsLocationsParametersVersionsResponse = Empty;
export const DeleteProjectsLocationsParametersVersionsResponse = Empty;

export type DeleteProjectsLocationsParametersVersionsError = CommonErrors;

export const deleteProjectsLocationsParametersVersions: API.OperationMethod<DeleteProjectsLocationsParametersVersionsRequest, DeleteProjectsLocationsParametersVersionsResponse, DeleteProjectsLocationsParametersVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsParametersVersionsRequest,
  output: DeleteProjectsLocationsParametersVersionsResponse,
  errors: [],
}));

