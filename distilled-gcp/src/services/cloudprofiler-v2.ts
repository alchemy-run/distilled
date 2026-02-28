// ==========================================================================
// Cloud Profiler API (cloudprofiler v2)
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
  name: "cloudprofiler",
  version: "v2",
  rootUrl: "https://cloudprofiler.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Deployment {
  /** Target is the service name used to group related deployments: * Service name for App Engine Flex / Standard. * Cluster and container name for GKE. * User-specified string for direct Compute Engine profiling (e.g. Java). * Job name for Dataflow. Validation regex: `^[a-z0-9]([-a-z0-9_.]{0,253}[a-z0-9])?$`. */
  target?: string;
  /** Project ID is the ID of a cloud project. Validation regex: `^a-z{4,61}[a-z0-9]$`. */
  projectId?: string;
  /** Labels identify the deployment within the user universe and same target. Validation regex for label names: `^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$`. Value for an individual label must be <= 512 bytes, the total size of all label names and values must be <= 1024 bytes. Label named "language" can be used to record the programming language of the profiled deployment. The standard choices for the value include "java", "go", "python", "ruby", "nodejs", "php", "dotnet". For deployments running on Google Cloud Platform, "zone" or "region" label should be present describing the deployment location. An example of a zone is "us-central1-a", an example of a region is "us-central1" or "us-central". */
  labels?: Record<string, string>;
}

export const Deployment: Schema.Schema<Deployment> = Schema.suspend(() => Schema.Struct({
  target: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Deployment" }) as any as Schema.Schema<Deployment>;

export interface Profile {
  /** Deployment this profile corresponds to. */
  deployment?: Deployment;
  /** Input only. Labels associated to this specific profile. These labels will get merged with the deployment labels for the final data set. See documentation on deployment labels for validation rules and limits. */
  labels?: Record<string, string>;
  /** Input only. Profile bytes, as a gzip compressed serialized proto, the format is https://github.com/google/pprof/blob/master/proto/profile.proto. */
  profileBytes?: string;
  /** Output only. Opaque, server-assigned, unique ID for this profile. */
  name?: string;
  /** Output only. Start time for the profile. This output is only present in response from the ListProfiles method. */
  startTime?: string;
  /** Duration of the profiling session. Input (for the offline mode) or output (for the online mode). The field represents requested profiling duration. It may slightly differ from the effective profiling duration, which is recorded in the profile data, in case the profiling can't be stopped immediately (e.g. in case stopping the profiling is handled asynchronously). */
  duration?: string;
  /** Type of profile. For offline mode, this must be specified when creating the profile. For online mode it is assigned and returned by the server. */
  profileType?: "PROFILE_TYPE_UNSPECIFIED" | "CPU" | "WALL" | "HEAP" | "THREADS" | "CONTENTION" | "PEAK_HEAP" | "HEAP_ALLOC" | (string & {});
}

export const Profile: Schema.Schema<Profile> = Schema.suspend(() => Schema.Struct({
  deployment: Schema.optional(Deployment),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  profileBytes: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
  profileType: Schema.optional(Schema.String),
})).annotate({ identifier: "Profile" }) as any as Schema.Schema<Profile>;

export interface ListProfilesResponse {
  /** List of profiles fetched. */
  profiles?: Array<Profile>;
  /** Token to receive the next page of results. This field maybe empty if there are no more profiles to fetch. */
  nextPageToken?: string;
  /** Number of profiles that were skipped in the current page since they were not able to be fetched successfully. This should typically be zero. A non-zero value may indicate a transient failure, in which case if the number is too high for your use case, the call may be retried. */
  skippedProfiles?: number;
}

export const ListProfilesResponse: Schema.Schema<ListProfilesResponse> = Schema.suspend(() => Schema.Struct({
  profiles: Schema.optional(Schema.Array(Profile)),
  nextPageToken: Schema.optional(Schema.String),
  skippedProfiles: Schema.optional(Schema.Number),
})).annotate({ identifier: "ListProfilesResponse" }) as any as Schema.Schema<ListProfilesResponse>;

export interface CreateProfileRequest {
  /** Deployment details. */
  deployment?: Deployment;
  /** One or more profile types that the agent is capable of providing. */
  profileType?: Array<"PROFILE_TYPE_UNSPECIFIED" | "CPU" | "WALL" | "HEAP" | "THREADS" | "CONTENTION" | "PEAK_HEAP" | "HEAP_ALLOC" | (string & {})>;
}

export const CreateProfileRequest: Schema.Schema<CreateProfileRequest> = Schema.suspend(() => Schema.Struct({
  deployment: Schema.optional(Deployment),
  profileType: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CreateProfileRequest" }) as any as Schema.Schema<CreateProfileRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** UpdateProfile updates the profile bytes and labels on the profile resource created in the online mode. Updating the bytes for profiles created in the offline mode is currently not supported: the profile content must be provided at the time of the profile creation. _Direct use of this API is discouraged, please use a [supported profiler agent](https://cloud.google.com/profiler/docs/about-profiler#profiling_agent) instead for profile collection._ */
export interface PatchProjectsProfilesRequest {
  /** Output only. Opaque, server-assigned, unique ID for this profile. */
  name: string;
  /** Field mask used to specify the fields to be overwritten. Currently only profile_bytes and labels fields are supported by UpdateProfile, so only those fields can be specified in the mask. When no mask is provided, all fields are overwritten. */
  updateMask?: string;
  /** Request body */
  body?: Profile;
}

export const PatchProjectsProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Profile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/profiles/{profilesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsProfilesRequest>;

export type PatchProjectsProfilesResponse = Profile;
export const PatchProjectsProfilesResponse = Profile;

export type PatchProjectsProfilesError = CommonErrors;

export const patchProjectsProfiles: API.OperationMethod<PatchProjectsProfilesRequest, PatchProjectsProfilesResponse, PatchProjectsProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsProfilesRequest,
  output: PatchProjectsProfilesResponse,
  errors: [],
}));

/** CreateProfile creates a new profile resource in the online mode. _Direct use of this API is discouraged, please use a [supported profiler agent](https://cloud.google.com/profiler/docs/about-profiler#profiling_agent) instead for profile collection._ The server ensures that the new profiles are created at a constant rate per deployment, so the creation request may hang for some time until the next profile session is available. The request may fail with ABORTED error if the creation is not available within ~1m, the response will indicate the duration of the backoff the client should take before attempting creating a profile again. The backoff duration is returned in google.rpc.RetryInfo extension on the response status. To a gRPC client, the extension will be return as a binary-serialized proto in the trailing metadata item named "google.rpc.retryinfo-bin". */
export interface CreateProjectsProfilesRequest {
  /** Parent project to create the profile in. */
  parent: string;
  /** Request body */
  body?: CreateProfileRequest;
}

export const CreateProjectsProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateProfileRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/profiles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsProfilesRequest>;

export type CreateProjectsProfilesResponse = Profile;
export const CreateProjectsProfilesResponse = Profile;

export type CreateProjectsProfilesError = CommonErrors;

export const createProjectsProfiles: API.OperationMethod<CreateProjectsProfilesRequest, CreateProjectsProfilesResponse, CreateProjectsProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsProfilesRequest,
  output: CreateProjectsProfilesResponse,
  errors: [],
}));

/** Lists profiles which have been collected so far and for which the caller has permission to view. */
export interface ListProjectsProfilesRequest {
  /** Optional. The token to continue pagination and get profiles from a particular page. When paginating, all other parameters provided to `ListProfiles` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The maximum number of items to return. Default page_size is 1000. Max limit is 1000. */
  pageSize?: number;
  /** Required. The parent, which owns this collection of profiles. Format: projects/{user_project_id} */
  parent: string;
}

export const ListProjectsProfilesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/profiles" }),
  svc,
) as unknown as Schema.Schema<ListProjectsProfilesRequest>;

export type ListProjectsProfilesResponse = ListProfilesResponse;
export const ListProjectsProfilesResponse = ListProfilesResponse;

export type ListProjectsProfilesError = CommonErrors;

export const listProjectsProfiles = API.makePaginated(() => ({
  input: ListProjectsProfilesRequest,
  output: ListProjectsProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** CreateOfflineProfile creates a new profile resource in the offline mode. The client provides the profile to create along with the profile bytes, the server records it. _Direct use of this API is discouraged, please use a [supported profiler agent](https://cloud.google.com/profiler/docs/about-profiler#profiling_agent) instead for profile collection._ */
export interface CreateOfflineProjectsProfilesRequest {
  /** Parent project to create the profile in. */
  parent: string;
  /** Request body */
  body?: Profile;
}

export const CreateOfflineProjectsProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Profile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/profiles:createOffline", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOfflineProjectsProfilesRequest>;

export type CreateOfflineProjectsProfilesResponse = Profile;
export const CreateOfflineProjectsProfilesResponse = Profile;

export type CreateOfflineProjectsProfilesError = CommonErrors;

export const createOfflineProjectsProfiles: API.OperationMethod<CreateOfflineProjectsProfilesRequest, CreateOfflineProjectsProfilesResponse, CreateOfflineProjectsProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOfflineProjectsProfilesRequest,
  output: CreateOfflineProjectsProfilesResponse,
  errors: [],
}));

