// ==========================================================================
// Artifact Registry API (artifactregistry v1beta1)
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
  name: "artifactregistry",
  version: "v1beta1",
  rootUrl: "https://artifactregistry.googleapis.com/",
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

export interface Repository {
  /** The name of the repository, for example: `projects/p1/locations/us-central1/repositories/repo1`. For each location in a project, repository names must be unique. */
  name?: string;
  /** Optional. The format of packages that are stored in the repository. */
  format?:
    | "FORMAT_UNSPECIFIED"
    | "DOCKER"
    | "MAVEN"
    | "NPM"
    | "APT"
    | "YUM"
    | "GOOGET"
    | "PYTHON"
    | (string & {});
  /** The user-provided description of the repository. */
  description?: string;
  /** Labels with user-defined metadata. This field may contain up to 64 entries. Label keys and values may be no longer than 63 characters. Label keys must begin with a lowercase letter and may only contain lowercase letters, numeric characters, underscores, and dashes. */
  labels?: Record<string, string>;
  /** Output only. The time when the repository was created. */
  createTime?: string;
  /** Output only. The time when the repository was last updated. */
  updateTime?: string;
  /** The Cloud KMS resource name of the customer managed encryption key that's used to encrypt the contents of the Repository. Has the form: `projects/my-project/locations/my-region/keyRings/my-kr/cryptoKeys/my-key`. This value may not be changed after the Repository has been created. */
  kmsKeyName?: string;
  /** Output only. The size, in bytes, of all artifact storage in this repository. Repositories that are generally available or in public preview use this to calculate storage costs. */
  sizeBytes?: string;
  /** Output only. Whether or not this repository satisfies PZS. */
  satisfiesPzs?: boolean;
  /** Output only. Whether or not this repository satisfies PZI. */
  satisfiesPzi?: boolean;
}

export const Repository: Schema.Schema<Repository> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      format: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      kmsKeyName: Schema.optional(Schema.String),
      sizeBytes: Schema.optional(Schema.String),
      satisfiesPzs: Schema.optional(Schema.Boolean),
      satisfiesPzi: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "Repository" }) as any as Schema.Schema<Repository>;

export interface ListRepositoriesResponse {
  /** The repositories returned. */
  repositories?: Array<Repository>;
  /** The token to retrieve the next page of repositories, or empty if there are no more repositories to return. */
  nextPageToken?: string;
}

export const ListRepositoriesResponse: Schema.Schema<ListRepositoriesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      repositories: Schema.optional(Schema.Array(Repository)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListRepositoriesResponse",
  }) as any as Schema.Schema<ListRepositoriesResponse>;

export interface Package {
  /** The name of the package, for example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1`. If the package ID part contains slashes, the slashes are escaped. */
  name?: string;
  /** The display name of the package. */
  displayName?: string;
  /** The time when the package was created. */
  createTime?: string;
  /** The time when the package was last updated. This includes publishing a new version of the package. */
  updateTime?: string;
}

export const Package: Schema.Schema<Package> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Package" }) as any as Schema.Schema<Package>;

export interface ListPackagesResponse {
  /** The packages returned. */
  packages?: Array<Package>;
  /** The token to retrieve the next page of packages, or empty if there are no more packages to return. */
  nextPageToken?: string;
}

export const ListPackagesResponse: Schema.Schema<ListPackagesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      packages: Schema.optional(Schema.Array(Package)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListPackagesResponse",
  }) as any as Schema.Schema<ListPackagesResponse>;

export interface Tag {
  /** The name of the tag, for example: "projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/tags/tag1". If the package part contains slashes, the slashes are escaped. The tag part can only have characters in [a-zA-Z0-9\-._~:@], anything else must be URL encoded. */
  name?: string;
  /** The name of the version the tag refers to, for example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/versions/sha256:5243811` If the package or version ID parts contain slashes, the slashes are escaped. */
  version?: string;
}

export const Tag: Schema.Schema<Tag> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Tag" }) as any as Schema.Schema<Tag>;

export interface Version {
  /** The name of the version, for example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/versions/art1`. If the package or version ID parts contain slashes, the slashes are escaped. */
  name?: string;
  /** Optional. Description of the version, as specified in its metadata. */
  description?: string;
  /** The time when the version was created. */
  createTime?: string;
  /** The time when the version was last updated. */
  updateTime?: string;
  /** Output only. A list of related tags. Will contain up to 100 tags that reference this version. */
  relatedTags?: Array<Tag>;
}

export const Version: Schema.Schema<Version> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      relatedTags: Schema.optional(Schema.Array(Tag)),
    }),
  ).annotate({ identifier: "Version" }) as any as Schema.Schema<Version>;

export interface ListVersionsResponse {
  /** The versions returned. */
  versions?: Array<Version>;
  /** The token to retrieve the next page of versions, or empty if there are no more versions to return. */
  nextPageToken?: string;
}

export const ListVersionsResponse: Schema.Schema<ListVersionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      versions: Schema.optional(Schema.Array(Version)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListVersionsResponse",
  }) as any as Schema.Schema<ListVersionsResponse>;

export interface Hash {
  /** The algorithm used to compute the hash value. */
  type?:
    | "HASH_TYPE_UNSPECIFIED"
    | "SHA256"
    | "MD5"
    | "DIRSUM_SHA256"
    | (string & {});
  /** The hash value. */
  value?: string;
}

export const Hash: Schema.Schema<Hash> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Hash" }) as any as Schema.Schema<Hash>;

export interface File {
  /** The name of the file, for example: `projects/p1/locations/us-central1/repositories/repo1/files/a%2Fb%2Fc.txt`. If the file ID part contains slashes, they are escaped. */
  name?: string;
  /** The size of the File in bytes. */
  sizeBytes?: string;
  /** The hashes of the file content. */
  hashes?: Array<Hash>;
  /** Output only. The time when the File was created. */
  createTime?: string;
  /** Output only. The time when the File was last updated. */
  updateTime?: string;
  /** The name of the Package or Version that owns this file, if any. */
  owner?: string;
}

export const File: Schema.Schema<File> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      sizeBytes: Schema.optional(Schema.String),
      hashes: Schema.optional(Schema.Array(Hash)),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      owner: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "File" }) as any as Schema.Schema<File>;

export interface ListFilesResponse {
  /** The files returned. */
  files?: Array<File>;
  /** The token to retrieve the next page of files, or empty if there are no more files to return. */
  nextPageToken?: string;
}

export const ListFilesResponse: Schema.Schema<ListFilesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      files: Schema.optional(Schema.Array(File)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListFilesResponse",
  }) as any as Schema.Schema<ListFilesResponse>;

export interface ListTagsResponse {
  /** The tags returned. */
  tags?: Array<Tag>;
  /** The token to retrieve the next page of tags, or empty if there are no more tags to return. */
  nextPageToken?: string;
}

export const ListTagsResponse: Schema.Schema<ListTagsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tags: Schema.optional(Schema.Array(Tag)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListTagsResponse",
  }) as any as Schema.Schema<ListTagsResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface Expr {
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const Expr: Schema.Schema<Expr> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      expression: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      location: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      role: Schema.optional(Schema.String),
      members: Schema.optional(Schema.Array(Schema.String)),
      condition: Schema.optional(Expr),
    }),
  ).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.Number),
      bindings: Schema.optional(Schema.Array(Binding)),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      policy: Schema.optional(Policy),
    }),
  ).annotate({
    identifier: "SetIamPolicyRequest",
  }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsRequest",
  }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsResponse",
  }) as any as Schema.Schema<TestIamPermissionsResponse>;

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

export const Location: Schema.Schema<Location> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      locationId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      locations: Schema.optional(Schema.Array(Location)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListLocationsResponse",
  }) as any as Schema.Schema<ListLocationsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

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

export const ListProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("extraLocationTypes"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations" }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListLocationsResponse;

export type ListProjectsLocationsError = DefaultErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export const listProjectsLocations: API.PaginatedOperationMethod<
  ListProjectsLocationsRequest,
  ListProjectsLocationsResponse,
  ListProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Location;

export type GetProjectsLocationsError = DefaultErrors;

/** Gets information about a location. */
export const getProjectsLocations: API.OperationMethod<
  GetProjectsLocationsRequest,
  GetProjectsLocationsResponse,
  GetProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
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
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

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

export interface ListProjectsLocationsRepositoriesRequest {
  /** Required. The name of the parent resource whose repositories will be listed. */
  parent: string;
  /** The maximum number of repositories to return. Maximum page size is 1,000. */
  pageSize?: number;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
  /** Optional. The field to order the results by. */
  orderBy?: string;
}

export const ListProjectsLocationsRepositoriesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesRequest>;

export type ListProjectsLocationsRepositoriesResponse =
  ListRepositoriesResponse;
export const ListProjectsLocationsRepositoriesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListRepositoriesResponse;

export type ListProjectsLocationsRepositoriesError = DefaultErrors;

/** Lists repositories. */
export const listProjectsLocationsRepositories: API.PaginatedOperationMethod<
  ListProjectsLocationsRepositoriesRequest,
  ListProjectsLocationsRepositoriesResponse,
  ListProjectsLocationsRepositoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesRequest,
  output: ListProjectsLocationsRepositoriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRepositoriesRequest {
  /** Required. The name of the repository to retrieve. */
  name: string;
}

export const GetProjectsLocationsRepositoriesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesRequest>;

export type GetProjectsLocationsRepositoriesResponse = Repository;
export const GetProjectsLocationsRepositoriesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Repository;

export type GetProjectsLocationsRepositoriesError = DefaultErrors;

/** Gets a repository. */
export const getProjectsLocationsRepositories: API.OperationMethod<
  GetProjectsLocationsRepositoriesRequest,
  GetProjectsLocationsRepositoriesResponse,
  GetProjectsLocationsRepositoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsRepositoriesRequest,
  output: GetProjectsLocationsRepositoriesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsRepositoriesRequest {
  /** Required. The name of the parent resource where the repository will be created. */
  parent: string;
  /** Required. The repository id to use for this repository. */
  repositoryId?: string;
  /** Request body */
  body?: Repository;
}

export const CreateProjectsLocationsRepositoriesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    repositoryId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("repositoryId"),
    ),
    body: Schema.optional(Repository).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesRequest>;

export type CreateProjectsLocationsRepositoriesResponse = Operation;
export const CreateProjectsLocationsRepositoriesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsRepositoriesError = DefaultErrors;

/** Creates a repository. The returned Operation will finish once the repository has been created. Its response will be the created Repository. */
export const createProjectsLocationsRepositories: API.OperationMethod<
  CreateProjectsLocationsRepositoriesRequest,
  CreateProjectsLocationsRepositoriesResponse,
  CreateProjectsLocationsRepositoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsRepositoriesRequest,
  output: CreateProjectsLocationsRepositoriesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsRepositoriesRequest {
  /** The name of the repository, for example: `projects/p1/locations/us-central1/repositories/repo1`. For each location in a project, repository names must be unique. */
  name: string;
  /** The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: Repository;
}

export const PatchProjectsLocationsRepositoriesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(Repository).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesRequest>;

export type PatchProjectsLocationsRepositoriesResponse = Repository;
export const PatchProjectsLocationsRepositoriesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Repository;

export type PatchProjectsLocationsRepositoriesError = DefaultErrors;

/** Updates a repository. */
export const patchProjectsLocationsRepositories: API.OperationMethod<
  PatchProjectsLocationsRepositoriesRequest,
  PatchProjectsLocationsRepositoriesResponse,
  PatchProjectsLocationsRepositoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsRepositoriesRequest,
  output: PatchProjectsLocationsRepositoriesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsRepositoriesRequest {
  /** Required. The name of the repository to delete. */
  name: string;
}

export const DeleteProjectsLocationsRepositoriesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesRequest>;

export type DeleteProjectsLocationsRepositoriesResponse = Operation;
export const DeleteProjectsLocationsRepositoriesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsRepositoriesError = DefaultErrors;

/** Deletes a repository and all of its contents. The returned Operation will finish once the repository has been deleted. It will not have any Operation metadata and will return a google.protobuf.Empty response. */
export const deleteProjectsLocationsRepositories: API.OperationMethod<
  DeleteProjectsLocationsRepositoriesRequest,
  DeleteProjectsLocationsRepositoriesResponse,
  DeleteProjectsLocationsRepositoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesRequest,
  output: DeleteProjectsLocationsRepositoriesResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsLocationsRepositoriesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsRepositoriesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsRepositoriesRequest>;

export type SetIamPolicyProjectsLocationsRepositoriesResponse = Policy;
export const SetIamPolicyProjectsLocationsRepositoriesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsLocationsRepositoriesError = DefaultErrors;

/** Updates the IAM policy for a given resource. */
export const setIamPolicyProjectsLocationsRepositories: API.OperationMethod<
  SetIamPolicyProjectsLocationsRepositoriesRequest,
  SetIamPolicyProjectsLocationsRepositoriesResponse,
  SetIamPolicyProjectsLocationsRepositoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsLocationsRepositoriesRequest,
  output: SetIamPolicyProjectsLocationsRepositoriesResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsLocationsRepositoriesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsRepositoriesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsRepositoriesRequest>;

export type GetIamPolicyProjectsLocationsRepositoriesResponse = Policy;
export const GetIamPolicyProjectsLocationsRepositoriesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsLocationsRepositoriesError = DefaultErrors;

/** Gets the IAM policy for a given resource. */
export const getIamPolicyProjectsLocationsRepositories: API.OperationMethod<
  GetIamPolicyProjectsLocationsRepositoriesRequest,
  GetIamPolicyProjectsLocationsRepositoriesResponse,
  GetIamPolicyProjectsLocationsRepositoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsLocationsRepositoriesRequest,
  output: GetIamPolicyProjectsLocationsRepositoriesResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsLocationsRepositoriesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsRepositoriesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsRepositoriesRequest>;

export type TestIamPermissionsProjectsLocationsRepositoriesResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsRepositoriesResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsRepositoriesError =
  DefaultErrors;

/** Tests if the caller has a list of permissions on a resource. */
export const testIamPermissionsProjectsLocationsRepositories: API.OperationMethod<
  TestIamPermissionsProjectsLocationsRepositoriesRequest,
  TestIamPermissionsProjectsLocationsRepositoriesResponse,
  TestIamPermissionsProjectsLocationsRepositoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsLocationsRepositoriesRequest,
  output: TestIamPermissionsProjectsLocationsRepositoriesResponse,
  errors: [],
}));

export interface ListProjectsLocationsRepositoriesPackagesRequest {
  /** Required. The name of the parent resource whose packages will be listed. */
  parent: string;
  /** The maximum number of packages to return. Maximum page size is 1,000. */
  pageSize?: number;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
  /** Optional. The field to order the results by. */
  orderBy?: string;
}

export const ListProjectsLocationsRepositoriesPackagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesPackagesRequest>;

export type ListProjectsLocationsRepositoriesPackagesResponse =
  ListPackagesResponse;
export const ListProjectsLocationsRepositoriesPackagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListPackagesResponse;

export type ListProjectsLocationsRepositoriesPackagesError = DefaultErrors;

/** Lists packages. */
export const listProjectsLocationsRepositoriesPackages: API.PaginatedOperationMethod<
  ListProjectsLocationsRepositoriesPackagesRequest,
  ListProjectsLocationsRepositoriesPackagesResponse,
  ListProjectsLocationsRepositoriesPackagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesPackagesRequest,
  output: ListProjectsLocationsRepositoriesPackagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRepositoriesPackagesRequest {
  /** Required. The name of the package to retrieve. */
  name: string;
}

export const GetProjectsLocationsRepositoriesPackagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesPackagesRequest>;

export type GetProjectsLocationsRepositoriesPackagesResponse = Package;
export const GetProjectsLocationsRepositoriesPackagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Package;

export type GetProjectsLocationsRepositoriesPackagesError = DefaultErrors;

/** Gets a package. */
export const getProjectsLocationsRepositoriesPackages: API.OperationMethod<
  GetProjectsLocationsRepositoriesPackagesRequest,
  GetProjectsLocationsRepositoriesPackagesResponse,
  GetProjectsLocationsRepositoriesPackagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsRepositoriesPackagesRequest,
  output: GetProjectsLocationsRepositoriesPackagesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsRepositoriesPackagesRequest {
  /** Required. The name of the package to delete. */
  name: string;
}

export const DeleteProjectsLocationsRepositoriesPackagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesPackagesRequest>;

export type DeleteProjectsLocationsRepositoriesPackagesResponse = Operation;
export const DeleteProjectsLocationsRepositoriesPackagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsRepositoriesPackagesError = DefaultErrors;

/** Deletes a package and all of its versions and tags. The returned operation will complete once the package has been deleted. */
export const deleteProjectsLocationsRepositoriesPackages: API.OperationMethod<
  DeleteProjectsLocationsRepositoriesPackagesRequest,
  DeleteProjectsLocationsRepositoriesPackagesResponse,
  DeleteProjectsLocationsRepositoriesPackagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesPackagesRequest,
  output: DeleteProjectsLocationsRepositoriesPackagesResponse,
  errors: [],
}));

export interface ListProjectsLocationsRepositoriesPackagesVersionsRequest {
  /** The name of the parent resource whose versions will be listed. */
  parent: string;
  /** The maximum number of versions to return. Maximum page size is 1,000. */
  pageSize?: number;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
  /** The view that should be returned in the response. */
  view?: "VERSION_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** Optional. The field to order the results by. */
  orderBy?: string;
}

export const ListProjectsLocationsRepositoriesPackagesVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/versions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesPackagesVersionsRequest>;

export type ListProjectsLocationsRepositoriesPackagesVersionsResponse =
  ListVersionsResponse;
export const ListProjectsLocationsRepositoriesPackagesVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListVersionsResponse;

export type ListProjectsLocationsRepositoriesPackagesVersionsError =
  DefaultErrors;

/** Lists versions. */
export const listProjectsLocationsRepositoriesPackagesVersions: API.PaginatedOperationMethod<
  ListProjectsLocationsRepositoriesPackagesVersionsRequest,
  ListProjectsLocationsRepositoriesPackagesVersionsResponse,
  ListProjectsLocationsRepositoriesPackagesVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesPackagesVersionsRequest,
  output: ListProjectsLocationsRepositoriesPackagesVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRepositoriesPackagesVersionsRequest {
  /** The name of the version to retrieve. */
  name: string;
  /** The view that should be returned in the response. */
  view?: "VERSION_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const GetProjectsLocationsRepositoriesPackagesVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/versions/{versionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesPackagesVersionsRequest>;

export type GetProjectsLocationsRepositoriesPackagesVersionsResponse = Version;
export const GetProjectsLocationsRepositoriesPackagesVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Version;

export type GetProjectsLocationsRepositoriesPackagesVersionsError =
  DefaultErrors;

/** Gets a version */
export const getProjectsLocationsRepositoriesPackagesVersions: API.OperationMethod<
  GetProjectsLocationsRepositoriesPackagesVersionsRequest,
  GetProjectsLocationsRepositoriesPackagesVersionsResponse,
  GetProjectsLocationsRepositoriesPackagesVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsRepositoriesPackagesVersionsRequest,
  output: GetProjectsLocationsRepositoriesPackagesVersionsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsRepositoriesPackagesVersionsRequest {
  /** The name of the version to delete. */
  name: string;
  /** By default, a version that is tagged may not be deleted. If force=true, the version and any tags pointing to the version are deleted. */
  force?: boolean;
}

export const DeleteProjectsLocationsRepositoriesPackagesVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/versions/{versionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesPackagesVersionsRequest>;

export type DeleteProjectsLocationsRepositoriesPackagesVersionsResponse =
  Operation;
export const DeleteProjectsLocationsRepositoriesPackagesVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsRepositoriesPackagesVersionsError =
  DefaultErrors;

/** Deletes a version and all of its content. The returned operation will complete once the version has been deleted. */
export const deleteProjectsLocationsRepositoriesPackagesVersions: API.OperationMethod<
  DeleteProjectsLocationsRepositoriesPackagesVersionsRequest,
  DeleteProjectsLocationsRepositoriesPackagesVersionsResponse,
  DeleteProjectsLocationsRepositoriesPackagesVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesPackagesVersionsRequest,
  output: DeleteProjectsLocationsRepositoriesPackagesVersionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsRepositoriesPackagesTagsRequest {
  /** The name of the parent package whose tags will be listed. For example: `projects/p1/locations/us-central1/repositories/repo1/packages/pkg1`. */
  parent: string;
  /** An expression for filtering the results of the request. Filter rules are case insensitive. The fields eligible for filtering are: * `name` * `version` Examples of using a filter: To filter the results of your request to tags with the name `my-tag` in package `my-package` in repository `my-repo` in project "`y-project` in the us-central region, append the following filter expression to your request: * `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/tags/my-tag"` You can also use wildcards to match any number of characters before or after the value: * `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/tags/my*"` * `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/tags/*tag"` * `name="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/tags/*tag*"` To filter the results of your request to tags applied to the version `1.0` in package `my-package`, append the following filter expression to your request: * `version="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/versions/1.0"` */
  filter?: string;
  /** The maximum number of tags to return. Maximum page size is 1,000. */
  pageSize?: number;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsRepositoriesPackagesTagsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/tags",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesPackagesTagsRequest>;

export type ListProjectsLocationsRepositoriesPackagesTagsResponse =
  ListTagsResponse;
export const ListProjectsLocationsRepositoriesPackagesTagsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListTagsResponse;

export type ListProjectsLocationsRepositoriesPackagesTagsError = DefaultErrors;

/** Lists tags. */
export const listProjectsLocationsRepositoriesPackagesTags: API.PaginatedOperationMethod<
  ListProjectsLocationsRepositoriesPackagesTagsRequest,
  ListProjectsLocationsRepositoriesPackagesTagsResponse,
  ListProjectsLocationsRepositoriesPackagesTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesPackagesTagsRequest,
  output: ListProjectsLocationsRepositoriesPackagesTagsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRepositoriesPackagesTagsRequest {
  /** The name of the tag to retrieve. */
  name: string;
}

export const GetProjectsLocationsRepositoriesPackagesTagsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/tags/{tagsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesPackagesTagsRequest>;

export type GetProjectsLocationsRepositoriesPackagesTagsResponse = Tag;
export const GetProjectsLocationsRepositoriesPackagesTagsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Tag;

export type GetProjectsLocationsRepositoriesPackagesTagsError = DefaultErrors;

/** Gets a tag. */
export const getProjectsLocationsRepositoriesPackagesTags: API.OperationMethod<
  GetProjectsLocationsRepositoriesPackagesTagsRequest,
  GetProjectsLocationsRepositoriesPackagesTagsResponse,
  GetProjectsLocationsRepositoriesPackagesTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsRepositoriesPackagesTagsRequest,
  output: GetProjectsLocationsRepositoriesPackagesTagsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsRepositoriesPackagesTagsRequest {
  /** The name of the parent resource where the tag will be created. */
  parent: string;
  /** The tag id to use for this repository. */
  tagId?: string;
  /** Request body */
  body?: Tag;
}

export const CreateProjectsLocationsRepositoriesPackagesTagsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    tagId: Schema.optional(Schema.String).pipe(T.HttpQuery("tagId")),
    body: Schema.optional(Tag).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/tags",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesPackagesTagsRequest>;

export type CreateProjectsLocationsRepositoriesPackagesTagsResponse = Tag;
export const CreateProjectsLocationsRepositoriesPackagesTagsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Tag;

export type CreateProjectsLocationsRepositoriesPackagesTagsError =
  DefaultErrors;

/** Creates a tag. */
export const createProjectsLocationsRepositoriesPackagesTags: API.OperationMethod<
  CreateProjectsLocationsRepositoriesPackagesTagsRequest,
  CreateProjectsLocationsRepositoriesPackagesTagsResponse,
  CreateProjectsLocationsRepositoriesPackagesTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsRepositoriesPackagesTagsRequest,
  output: CreateProjectsLocationsRepositoriesPackagesTagsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsRepositoriesPackagesTagsRequest {
  /** The name of the tag, for example: "projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/tags/tag1". If the package part contains slashes, the slashes are escaped. The tag part can only have characters in [a-zA-Z0-9\-._~:@], anything else must be URL encoded. */
  name: string;
  /** The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: Tag;
}

export const PatchProjectsLocationsRepositoriesPackagesTagsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(Tag).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/tags/{tagsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesPackagesTagsRequest>;

export type PatchProjectsLocationsRepositoriesPackagesTagsResponse = Tag;
export const PatchProjectsLocationsRepositoriesPackagesTagsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Tag;

export type PatchProjectsLocationsRepositoriesPackagesTagsError = DefaultErrors;

/** Updates a tag. */
export const patchProjectsLocationsRepositoriesPackagesTags: API.OperationMethod<
  PatchProjectsLocationsRepositoriesPackagesTagsRequest,
  PatchProjectsLocationsRepositoriesPackagesTagsResponse,
  PatchProjectsLocationsRepositoriesPackagesTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsRepositoriesPackagesTagsRequest,
  output: PatchProjectsLocationsRepositoriesPackagesTagsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsRepositoriesPackagesTagsRequest {
  /** The name of the tag to delete. */
  name: string;
}

export const DeleteProjectsLocationsRepositoriesPackagesTagsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/packages/{packagesId}/tags/{tagsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesPackagesTagsRequest>;

export type DeleteProjectsLocationsRepositoriesPackagesTagsResponse = Empty;
export const DeleteProjectsLocationsRepositoriesPackagesTagsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsRepositoriesPackagesTagsError =
  DefaultErrors;

/** Deletes a tag. */
export const deleteProjectsLocationsRepositoriesPackagesTags: API.OperationMethod<
  DeleteProjectsLocationsRepositoriesPackagesTagsRequest,
  DeleteProjectsLocationsRepositoriesPackagesTagsResponse,
  DeleteProjectsLocationsRepositoriesPackagesTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesPackagesTagsRequest,
  output: DeleteProjectsLocationsRepositoriesPackagesTagsResponse,
  errors: [],
}));

export interface ListProjectsLocationsRepositoriesFilesRequest {
  /** Required. The name of the repository whose files will be listed. For example: "projects/p1/locations/us-central1/repositories/repo1 */
  parent: string;
  /** An expression for filtering the results of the request. Filter rules are case insensitive. The fields eligible for filtering are: * `name` * `owner` * `annotations` Examples of using a filter: To filter the results of your request to files with the name `my_file.txt` in project `my-project` in the `us-central` region, in repository `my-repo`, append the following filter expression to your request: * `name="projects/my-project/locations/us-central1/repositories/my-repo/files/my-file.txt"` You can also use wildcards to match any number of characters before or after the value: * `name="projects/my-project/locations/us-central1/repositories/my-repo/files/my-*"` * `name="projects/my-project/locations/us-central1/repositories/my-repo/files/*file.txt"` * `name="projects/my-project/locations/us-central1/repositories/my-repo/files/*file*"` To filter the results of your request to files owned by the version `1.0` in package `pkg1`, append the following filter expression to your request: * `owner="projects/my-project/locations/us-central1/repositories/my-repo/packages/my-package/versions/1.0"` To filter the results of your request to files with the annotation key-value pair [`external_link`: `external_link_value`], append the following filter expression to your request: * `"annotations.external_link:external_link_value"` To filter just for a specific annotation key `external_link`, append the following filter expression to your request: * `"annotations.external_link"` If the annotation key or value contains special characters, you can escape them by surrounding the value with backticks. For example, to filter the results of your request to files with the annotation key-value pair [`external.link`:`https://example.com/my-file`], append the following filter expression to your request: * `` "annotations.`external.link`:`https://example.com/my-file`" `` You can also filter with annotations with a wildcard to match any number of characters before or after the value: * `` "annotations.*_link:`*example.com*`" `` */
  filter?: string;
  /** The maximum number of files to return. Maximum page size is 1,000. */
  pageSize?: number;
  /** The next_page_token value returned from a previous list request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsRepositoriesFilesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/files",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesFilesRequest>;

export type ListProjectsLocationsRepositoriesFilesResponse = ListFilesResponse;
export const ListProjectsLocationsRepositoriesFilesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListFilesResponse;

export type ListProjectsLocationsRepositoriesFilesError = DefaultErrors;

/** Lists files. */
export const listProjectsLocationsRepositoriesFiles: API.PaginatedOperationMethod<
  ListProjectsLocationsRepositoriesFilesRequest,
  ListProjectsLocationsRepositoriesFilesResponse,
  ListProjectsLocationsRepositoriesFilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesFilesRequest,
  output: ListProjectsLocationsRepositoriesFilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRepositoriesFilesRequest {
  /** Required. The name of the file to retrieve. */
  name: string;
}

export const GetProjectsLocationsRepositoriesFilesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/files/{filesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesFilesRequest>;

export type GetProjectsLocationsRepositoriesFilesResponse = File;
export const GetProjectsLocationsRepositoriesFilesResponse =
  /*@__PURE__*/ /*#__PURE__*/ File;

export type GetProjectsLocationsRepositoriesFilesError = DefaultErrors;

/** Gets a file. */
export const getProjectsLocationsRepositoriesFiles: API.OperationMethod<
  GetProjectsLocationsRepositoriesFilesRequest,
  GetProjectsLocationsRepositoriesFilesResponse,
  GetProjectsLocationsRepositoriesFilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsRepositoriesFilesRequest,
  output: GetProjectsLocationsRepositoriesFilesResponse,
  errors: [],
}));
