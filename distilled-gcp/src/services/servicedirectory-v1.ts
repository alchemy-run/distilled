// ==========================================================================
// Service Directory API (servicedirectory v1)
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
  name: "servicedirectory",
  version: "v1",
  rootUrl: "https://servicedirectory.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

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

export interface ResolveServiceRequest {
  /** Optional. The maximum number of endpoints to return. Defaults to 25. Maximum is 100. If a value less than one is specified, the Default is used. If a value greater than the Maximum is specified, the Maximum is used. */
  maxEndpoints?: number;
  /** Optional. The filter applied to the endpoints of the resolved service. General `filter` string syntax: ` ()` * `` can be `name`, `address`, `port`, or `annotations.` for map field * `` can be `<`, `>`, `<=`, `>=`, `!=`, `=`, `:`. Of which `:` means `HAS`, and is roughly the same as `=` * `` must be the same data type as field * `` can be `AND`, `OR`, `NOT` Examples of valid filters: * `annotations.owner` returns endpoints that have a annotation with the key `owner`, this is the same as `annotations:owner` * `annotations.protocol=gRPC` returns endpoints that have key/value `protocol=gRPC` * `address=192.108.1.105` returns endpoints that have this address * `port>8080` returns endpoints that have port number larger than 8080 * `name>projects/my-project/locations/us-east1/namespaces/my-namespace/services/my-service/endpoints/endpoint-c` returns endpoints that have name that is alphabetically later than the string, so "endpoint-e" is returned but "endpoint-a" is not * `name=projects/my-project/locations/us-central1/namespaces/my-namespace/services/my-service/endpoints/ep-1` returns the endpoint that has an endpoint_id equal to `ep-1` * `annotations.owner!=sd AND annotations.foo=bar` returns endpoints that have `owner` in annotation key but value is not `sd` AND have key/value `foo=bar` * `doesnotexist.foo=bar` returns an empty list. Note that endpoint doesn't have a field called "doesnotexist". Since the filter does not match any endpoint, it returns no results For more information about filtering, see [API Filtering](https://aip.dev/160). */
  endpointFilter?: string;
}

export const ResolveServiceRequest: Schema.Schema<ResolveServiceRequest> = Schema.suspend(() => Schema.Struct({
  maxEndpoints: Schema.optional(Schema.Number),
  endpointFilter: Schema.optional(Schema.String),
})).annotate({ identifier: "ResolveServiceRequest" }) as any as Schema.Schema<ResolveServiceRequest>;

export interface Endpoint {
  /** Immutable. The resource name for the endpoint in the format `projects/* /locations/* /namespaces/* /services/* /endpoints/*`. */
  name?: string;
  /** Optional. An IPv4 or IPv6 address. Service Directory rejects bad addresses like: * `8.8.8` * `8.8.8.8:53` * `test:bad:address` * `[::1]` * `[::1]:8080` Limited to 45 characters. */
  address?: string;
  /** Optional. Service Directory rejects values outside of `[0, 65535]`. */
  port?: number;
  /** Optional. Annotations for the endpoint. This data can be consumed by service clients. Restrictions: * The entire annotations dictionary may contain up to 512 characters, spread accoss all key-value pairs. Annotations that go beyond this limit are rejected * Valid annotation keys have two segments: an optional prefix and name, separated by a slash (/). The name segment is required and must be 63 characters or less, beginning and ending with an alphanumeric character ([a-z0-9A-Z]) with dashes (-), underscores (_), dots (.), and alphanumerics between. The prefix is optional. If specified, the prefix must be a DNS subdomain: a series of DNS labels separated by dots (.), not longer than 253 characters in total, followed by a slash (/) Annotations that fails to meet these requirements are rejected. Note: This field is equivalent to the `metadata` field in the v1beta1 API. They have the same syntax and read/write to the same location in Service Directory. */
  annotations?: Record<string, string>;
  /** Immutable. The Google Compute Engine network (VPC) of the endpoint in the format `projects//locations/global/networks/*`. The project must be specified by project number (project id is rejected). Incorrectly formatted networks are rejected, we also check to make sure that you have the servicedirectory.networks.attach permission on the project specified. */
  network?: string;
  /** Output only. The globally unique identifier of the endpoint in the UUID4 format. */
  uid?: string;
}

export const Endpoint: Schema.Schema<Endpoint> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  address: Schema.optional(Schema.String),
  port: Schema.optional(Schema.Number),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  network: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
})).annotate({ identifier: "Endpoint" }) as any as Schema.Schema<Endpoint>;

export interface Service {
  /** Immutable. The resource name for the service in the format `projects/* /locations/* /namespaces/* /services/*`. */
  name?: string;
  /** Optional. Annotations for the service. This data can be consumed by service clients. Restrictions: * The entire annotations dictionary may contain up to 2000 characters, spread accoss all key-value pairs. Annotations that go beyond this limit are rejected * Valid annotation keys have two segments: an optional prefix and name, separated by a slash (/). The name segment is required and must be 63 characters or less, beginning and ending with an alphanumeric character ([a-z0-9A-Z]) with dashes (-), underscores (_), dots (.), and alphanumerics between. The prefix is optional. If specified, the prefix must be a DNS subdomain: a series of DNS labels separated by dots (.), not longer than 253 characters in total, followed by a slash (/). Annotations that fails to meet these requirements are rejected Note: This field is equivalent to the `metadata` field in the v1beta1 API. They have the same syntax and read/write to the same location in Service Directory. */
  annotations?: Record<string, string>;
  /** Output only. Endpoints associated with this service. Returned on LookupService.ResolveService. Control plane clients should use RegistrationService.ListEndpoints. */
  endpoints?: Array<Endpoint>;
  /** Output only. The globally unique identifier of the service in the UUID4 format. */
  uid?: string;
}

export const Service: Schema.Schema<Service> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  endpoints: Schema.optional(Schema.Array(Endpoint)),
  uid: Schema.optional(Schema.String),
})).annotate({ identifier: "Service" }) as any as Schema.Schema<Service>;

export interface ResolveServiceResponse {
  service?: Service;
}

export const ResolveServiceResponse: Schema.Schema<ResolveServiceResponse> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Service),
})).annotate({ identifier: "ResolveServiceResponse" }) as any as Schema.Schema<ResolveServiceResponse>;

export interface Namespace {
  /** Immutable. The resource name for the namespace in the format `projects/* /locations/* /namespaces/*`. */
  name?: string;
  /** Optional. Resource labels associated with this namespace. No more than 64 user labels can be associated with a given resource. Label keys and values can be no longer than 63 characters. */
  labels?: Record<string, string>;
  /** Output only. The globally unique identifier of the namespace in the UUID4 format. */
  uid?: string;
}

export const Namespace: Schema.Schema<Namespace> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  uid: Schema.optional(Schema.String),
})).annotate({ identifier: "Namespace" }) as any as Schema.Schema<Namespace>;

export interface ListNamespacesResponse {
  /** The list of namespaces. */
  namespaces?: Array<Namespace>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListNamespacesResponse: Schema.Schema<ListNamespacesResponse> = Schema.suspend(() => Schema.Struct({
  namespaces: Schema.optional(Schema.Array(Namespace)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListNamespacesResponse" }) as any as Schema.Schema<ListNamespacesResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface ListServicesResponse {
  /** The list of services. */
  services?: Array<Service>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListServicesResponse: Schema.Schema<ListServicesResponse> = Schema.suspend(() => Schema.Struct({
  services: Schema.optional(Schema.Array(Service)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListServicesResponse" }) as any as Schema.Schema<ListServicesResponse>;

export interface ListEndpointsResponse {
  /** The list of endpoints. */
  endpoints?: Array<Endpoint>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListEndpointsResponse: Schema.Schema<ListEndpointsResponse> = Schema.suspend(() => Schema.Struct({
  endpoints: Schema.optional(Schema.Array(Endpoint)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListEndpointsResponse" }) as any as Schema.Schema<ListEndpointsResponse>;

export interface GetPolicyOptions {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  requestedPolicyVersion?: number;
}

export const GetPolicyOptions: Schema.Schema<GetPolicyOptions> = Schema.suspend(() => Schema.Struct({
  requestedPolicyVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "GetPolicyOptions" }) as any as Schema.Schema<GetPolicyOptions>;

export interface GetIamPolicyRequest {
  /** OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. */
  options?: GetPolicyOptions;
}

export const GetIamPolicyRequest: Schema.Schema<GetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  options: Schema.optional(GetPolicyOptions),
})).annotate({ identifier: "GetIamPolicyRequest" }) as any as Schema.Schema<GetIamPolicyRequest>;

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

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(Expr),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(Binding)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

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

/** Creates a namespace, and returns the new namespace. */
export interface CreateProjectsLocationsNamespacesRequest {
  /** Required. The resource name of the project and location the namespace will be created in. */
  parent: string;
  /** Required. The Resource ID must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. */
  namespaceId?: string;
  /** Request body */
  body?: Namespace;
}

export const CreateProjectsLocationsNamespacesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  namespaceId: Schema.optional(Schema.String).pipe(T.HttpQuery("namespaceId")),
  body: Schema.optional(Namespace).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsNamespacesRequest>;

export type CreateProjectsLocationsNamespacesResponse = Namespace;
export const CreateProjectsLocationsNamespacesResponse = Namespace;

export type CreateProjectsLocationsNamespacesError = CommonErrors;

export const createProjectsLocationsNamespaces: API.OperationMethod<CreateProjectsLocationsNamespacesRequest, CreateProjectsLocationsNamespacesResponse, CreateProjectsLocationsNamespacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsNamespacesRequest,
  output: CreateProjectsLocationsNamespacesResponse,
  errors: [],
}));

/** Lists all namespaces. */
export interface ListProjectsLocationsNamespacesRequest {
  /** Required. The resource name of the project and location whose namespaces you'd like to list. */
  parent: string;
  /** Optional. The maximum number of items to return. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Optional. The filter to list results by. General `filter` string syntax: ` ()` * `` can be `name` or `labels.` for map field * `` can be `<`, `>`, `<=`, `>=`, `!=`, `=`, `:`. Of which `:` means `HAS`, and is roughly the same as `=` * `` must be the same data type as field * `` can be `AND`, `OR`, `NOT` Examples of valid filters: * `labels.owner` returns namespaces that have a label with the key `owner`, this is the same as `labels:owner` * `labels.owner=sd` returns namespaces that have key/value `owner=sd` * `name>projects/my-project/locations/us-east1/namespaces/namespace-c` returns namespaces that have name that is alphabetically later than the string, so "namespace-e" is returned but "namespace-a" is not * `labels.owner!=sd AND labels.foo=bar` returns namespaces that have `owner` in label key but value is not `sd` AND have key/value `foo=bar` * `doesnotexist.foo=bar` returns an empty list. Note that namespace doesn't have a field called "doesnotexist". Since the filter does not match any namespaces, it returns no results For more information about filtering, see [API Filtering](https://aip.dev/160). */
  filter?: string;
  /** Optional. The order to list results by. General `order_by` string syntax: ` () (,)` * `` allows value: `name` * `` ascending or descending order by ``. If this is left blank, `asc` is used Note that an empty `order_by` string results in default order, which is order by `name` in ascending order. */
  orderBy?: string;
}

export const ListProjectsLocationsNamespacesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsNamespacesRequest>;

export type ListProjectsLocationsNamespacesResponse = ListNamespacesResponse;
export const ListProjectsLocationsNamespacesResponse = ListNamespacesResponse;

export type ListProjectsLocationsNamespacesError = CommonErrors;

export const listProjectsLocationsNamespaces = API.makePaginated(() => ({
  input: ListProjectsLocationsNamespacesRequest,
  output: ListProjectsLocationsNamespacesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a namespace. */
export interface GetProjectsLocationsNamespacesRequest {
  /** Required. The name of the namespace to retrieve. */
  name: string;
}

export const GetProjectsLocationsNamespacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces/{namespacesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsNamespacesRequest>;

export type GetProjectsLocationsNamespacesResponse = Namespace;
export const GetProjectsLocationsNamespacesResponse = Namespace;

export type GetProjectsLocationsNamespacesError = CommonErrors;

export const getProjectsLocationsNamespaces: API.OperationMethod<GetProjectsLocationsNamespacesRequest, GetProjectsLocationsNamespacesResponse, GetProjectsLocationsNamespacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsNamespacesRequest,
  output: GetProjectsLocationsNamespacesResponse,
  errors: [],
}));

/** Updates a namespace. */
export interface PatchProjectsLocationsNamespacesRequest {
  /** Immutable. The resource name for the namespace in the format `projects/* /locations/* /namespaces/*`. */
  name: string;
  /** Required. List of fields to be updated in this request. */
  updateMask?: string;
  /** Request body */
  body?: Namespace;
}

export const PatchProjectsLocationsNamespacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Namespace).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces/{namespacesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsNamespacesRequest>;

export type PatchProjectsLocationsNamespacesResponse = Namespace;
export const PatchProjectsLocationsNamespacesResponse = Namespace;

export type PatchProjectsLocationsNamespacesError = CommonErrors;

export const patchProjectsLocationsNamespaces: API.OperationMethod<PatchProjectsLocationsNamespacesRequest, PatchProjectsLocationsNamespacesResponse, PatchProjectsLocationsNamespacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsNamespacesRequest,
  output: PatchProjectsLocationsNamespacesResponse,
  errors: [],
}));

/** Deletes a namespace. This also deletes all services and endpoints in the namespace. */
export interface DeleteProjectsLocationsNamespacesRequest {
  /** Required. The name of the namespace to delete. */
  name: string;
}

export const DeleteProjectsLocationsNamespacesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces/{namespacesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsNamespacesRequest>;

export type DeleteProjectsLocationsNamespacesResponse = Empty;
export const DeleteProjectsLocationsNamespacesResponse = Empty;

export type DeleteProjectsLocationsNamespacesError = CommonErrors;

export const deleteProjectsLocationsNamespaces: API.OperationMethod<DeleteProjectsLocationsNamespacesRequest, DeleteProjectsLocationsNamespacesResponse, DeleteProjectsLocationsNamespacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsNamespacesRequest,
  output: DeleteProjectsLocationsNamespacesResponse,
  errors: [],
}));

/** Gets the IAM Policy for a resource (namespace or service only). */
export interface GetIamPolicyProjectsLocationsNamespacesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsLocationsNamespacesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces/{namespacesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsNamespacesRequest>;

export type GetIamPolicyProjectsLocationsNamespacesResponse = Policy;
export const GetIamPolicyProjectsLocationsNamespacesResponse = Policy;

export type GetIamPolicyProjectsLocationsNamespacesError = CommonErrors;

export const getIamPolicyProjectsLocationsNamespaces: API.OperationMethod<GetIamPolicyProjectsLocationsNamespacesRequest, GetIamPolicyProjectsLocationsNamespacesResponse, GetIamPolicyProjectsLocationsNamespacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsNamespacesRequest,
  output: GetIamPolicyProjectsLocationsNamespacesResponse,
  errors: [],
}));

/** Sets the IAM Policy for a resource (namespace or service only). */
export interface SetIamPolicyProjectsLocationsNamespacesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsNamespacesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces/{namespacesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsNamespacesRequest>;

export type SetIamPolicyProjectsLocationsNamespacesResponse = Policy;
export const SetIamPolicyProjectsLocationsNamespacesResponse = Policy;

export type SetIamPolicyProjectsLocationsNamespacesError = CommonErrors;

export const setIamPolicyProjectsLocationsNamespaces: API.OperationMethod<SetIamPolicyProjectsLocationsNamespacesRequest, SetIamPolicyProjectsLocationsNamespacesResponse, SetIamPolicyProjectsLocationsNamespacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsNamespacesRequest,
  output: SetIamPolicyProjectsLocationsNamespacesResponse,
  errors: [],
}));

/** Tests IAM permissions for a resource (namespace or service only). */
export interface TestIamPermissionsProjectsLocationsNamespacesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsNamespacesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces/{namespacesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsNamespacesRequest>;

export type TestIamPermissionsProjectsLocationsNamespacesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsNamespacesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsNamespacesError = CommonErrors;

export const testIamPermissionsProjectsLocationsNamespaces: API.OperationMethod<TestIamPermissionsProjectsLocationsNamespacesRequest, TestIamPermissionsProjectsLocationsNamespacesResponse, TestIamPermissionsProjectsLocationsNamespacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsNamespacesRequest,
  output: TestIamPermissionsProjectsLocationsNamespacesResponse,
  errors: [],
}));

/** Returns a service and its associated endpoints. Resolving a service is not considered an active developer method. */
export interface ResolveProjectsLocationsNamespacesServicesRequest {
  /** Required. The name of the service to resolve. */
  name: string;
  /** Request body */
  body?: ResolveServiceRequest;
}

export const ResolveProjectsLocationsNamespacesServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ResolveServiceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces/{namespacesId}/services/{servicesId}:resolve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResolveProjectsLocationsNamespacesServicesRequest>;

export type ResolveProjectsLocationsNamespacesServicesResponse = ResolveServiceResponse;
export const ResolveProjectsLocationsNamespacesServicesResponse = ResolveServiceResponse;

export type ResolveProjectsLocationsNamespacesServicesError = CommonErrors;

export const resolveProjectsLocationsNamespacesServices: API.OperationMethod<ResolveProjectsLocationsNamespacesServicesRequest, ResolveProjectsLocationsNamespacesServicesResponse, ResolveProjectsLocationsNamespacesServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResolveProjectsLocationsNamespacesServicesRequest,
  output: ResolveProjectsLocationsNamespacesServicesResponse,
  errors: [],
}));

/** Creates a service, and returns the new service. */
export interface CreateProjectsLocationsNamespacesServicesRequest {
  /** Required. The resource name of the namespace this service will belong to. */
  parent: string;
  /** Required. The Resource ID must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. */
  serviceId?: string;
  /** Request body */
  body?: Service;
}

export const CreateProjectsLocationsNamespacesServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  serviceId: Schema.optional(Schema.String).pipe(T.HttpQuery("serviceId")),
  body: Schema.optional(Service).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces/{namespacesId}/services", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsNamespacesServicesRequest>;

export type CreateProjectsLocationsNamespacesServicesResponse = Service;
export const CreateProjectsLocationsNamespacesServicesResponse = Service;

export type CreateProjectsLocationsNamespacesServicesError = CommonErrors;

export const createProjectsLocationsNamespacesServices: API.OperationMethod<CreateProjectsLocationsNamespacesServicesRequest, CreateProjectsLocationsNamespacesServicesResponse, CreateProjectsLocationsNamespacesServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsNamespacesServicesRequest,
  output: CreateProjectsLocationsNamespacesServicesResponse,
  errors: [],
}));

/** Lists all services belonging to a namespace. */
export interface ListProjectsLocationsNamespacesServicesRequest {
  /** Required. The resource name of the namespace whose services you'd like to list. */
  parent: string;
  /** Optional. The maximum number of items to return. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Optional. The filter to list results by. General `filter` string syntax: ` ()` * `` can be `name` or `annotations.` for map field * `` can be `<`, `>`, `<=`, `>=`, `!=`, `=`, `:`. Of which `:` means `HAS`, and is roughly the same as `=` * `` must be the same data type as field * `` can be `AND`, `OR`, `NOT` Examples of valid filters: * `annotations.owner` returns services that have a annotation with the key `owner`, this is the same as `annotations:owner` * `annotations.protocol=gRPC` returns services that have key/value `protocol=gRPC` * `name>projects/my-project/locations/us-east1/namespaces/my-namespace/services/service-c` returns services that have name that is alphabetically later than the string, so "service-e" is returned but "service-a" is not * `annotations.owner!=sd AND annotations.foo=bar` returns services that have `owner` in annotation key but value is not `sd` AND have key/value `foo=bar` * `doesnotexist.foo=bar` returns an empty list. Note that service doesn't have a field called "doesnotexist". Since the filter does not match any services, it returns no results For more information about filtering, see [API Filtering](https://aip.dev/160). */
  filter?: string;
  /** Optional. The order to list results by. General `order_by` string syntax: ` () (,)` * `` allows value: `name` * `` ascending or descending order by ``. If this is left blank, `asc` is used Note that an empty `order_by` string results in default order, which is order by `name` in ascending order. */
  orderBy?: string;
}

export const ListProjectsLocationsNamespacesServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces/{namespacesId}/services" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsNamespacesServicesRequest>;

export type ListProjectsLocationsNamespacesServicesResponse = ListServicesResponse;
export const ListProjectsLocationsNamespacesServicesResponse = ListServicesResponse;

export type ListProjectsLocationsNamespacesServicesError = CommonErrors;

export const listProjectsLocationsNamespacesServices = API.makePaginated(() => ({
  input: ListProjectsLocationsNamespacesServicesRequest,
  output: ListProjectsLocationsNamespacesServicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a service. */
export interface GetProjectsLocationsNamespacesServicesRequest {
  /** Required. The name of the service to get. */
  name: string;
}

export const GetProjectsLocationsNamespacesServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces/{namespacesId}/services/{servicesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsNamespacesServicesRequest>;

export type GetProjectsLocationsNamespacesServicesResponse = Service;
export const GetProjectsLocationsNamespacesServicesResponse = Service;

export type GetProjectsLocationsNamespacesServicesError = CommonErrors;

export const getProjectsLocationsNamespacesServices: API.OperationMethod<GetProjectsLocationsNamespacesServicesRequest, GetProjectsLocationsNamespacesServicesResponse, GetProjectsLocationsNamespacesServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsNamespacesServicesRequest,
  output: GetProjectsLocationsNamespacesServicesResponse,
  errors: [],
}));

/** Updates a service. */
export interface PatchProjectsLocationsNamespacesServicesRequest {
  /** Immutable. The resource name for the service in the format `projects/* /locations/* /namespaces/* /services/*`. */
  name: string;
  /** Required. List of fields to be updated in this request. */
  updateMask?: string;
  /** Request body */
  body?: Service;
}

export const PatchProjectsLocationsNamespacesServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Service).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces/{namespacesId}/services/{servicesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsNamespacesServicesRequest>;

export type PatchProjectsLocationsNamespacesServicesResponse = Service;
export const PatchProjectsLocationsNamespacesServicesResponse = Service;

export type PatchProjectsLocationsNamespacesServicesError = CommonErrors;

export const patchProjectsLocationsNamespacesServices: API.OperationMethod<PatchProjectsLocationsNamespacesServicesRequest, PatchProjectsLocationsNamespacesServicesResponse, PatchProjectsLocationsNamespacesServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsNamespacesServicesRequest,
  output: PatchProjectsLocationsNamespacesServicesResponse,
  errors: [],
}));

/** Deletes a service. This also deletes all endpoints associated with the service. */
export interface DeleteProjectsLocationsNamespacesServicesRequest {
  /** Required. The name of the service to delete. */
  name: string;
}

export const DeleteProjectsLocationsNamespacesServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces/{namespacesId}/services/{servicesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsNamespacesServicesRequest>;

export type DeleteProjectsLocationsNamespacesServicesResponse = Empty;
export const DeleteProjectsLocationsNamespacesServicesResponse = Empty;

export type DeleteProjectsLocationsNamespacesServicesError = CommonErrors;

export const deleteProjectsLocationsNamespacesServices: API.OperationMethod<DeleteProjectsLocationsNamespacesServicesRequest, DeleteProjectsLocationsNamespacesServicesResponse, DeleteProjectsLocationsNamespacesServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsNamespacesServicesRequest,
  output: DeleteProjectsLocationsNamespacesServicesResponse,
  errors: [],
}));

/** Gets the IAM Policy for a resource (namespace or service only). */
export interface GetIamPolicyProjectsLocationsNamespacesServicesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsLocationsNamespacesServicesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces/{namespacesId}/services/{servicesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsNamespacesServicesRequest>;

export type GetIamPolicyProjectsLocationsNamespacesServicesResponse = Policy;
export const GetIamPolicyProjectsLocationsNamespacesServicesResponse = Policy;

export type GetIamPolicyProjectsLocationsNamespacesServicesError = CommonErrors;

export const getIamPolicyProjectsLocationsNamespacesServices: API.OperationMethod<GetIamPolicyProjectsLocationsNamespacesServicesRequest, GetIamPolicyProjectsLocationsNamespacesServicesResponse, GetIamPolicyProjectsLocationsNamespacesServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsNamespacesServicesRequest,
  output: GetIamPolicyProjectsLocationsNamespacesServicesResponse,
  errors: [],
}));

/** Sets the IAM Policy for a resource (namespace or service only). */
export interface SetIamPolicyProjectsLocationsNamespacesServicesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsNamespacesServicesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces/{namespacesId}/services/{servicesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsNamespacesServicesRequest>;

export type SetIamPolicyProjectsLocationsNamespacesServicesResponse = Policy;
export const SetIamPolicyProjectsLocationsNamespacesServicesResponse = Policy;

export type SetIamPolicyProjectsLocationsNamespacesServicesError = CommonErrors;

export const setIamPolicyProjectsLocationsNamespacesServices: API.OperationMethod<SetIamPolicyProjectsLocationsNamespacesServicesRequest, SetIamPolicyProjectsLocationsNamespacesServicesResponse, SetIamPolicyProjectsLocationsNamespacesServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsNamespacesServicesRequest,
  output: SetIamPolicyProjectsLocationsNamespacesServicesResponse,
  errors: [],
}));

/** Tests IAM permissions for a resource (namespace or service only). */
export interface TestIamPermissionsProjectsLocationsNamespacesServicesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsNamespacesServicesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces/{namespacesId}/services/{servicesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsNamespacesServicesRequest>;

export type TestIamPermissionsProjectsLocationsNamespacesServicesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsNamespacesServicesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsNamespacesServicesError = CommonErrors;

export const testIamPermissionsProjectsLocationsNamespacesServices: API.OperationMethod<TestIamPermissionsProjectsLocationsNamespacesServicesRequest, TestIamPermissionsProjectsLocationsNamespacesServicesResponse, TestIamPermissionsProjectsLocationsNamespacesServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsNamespacesServicesRequest,
  output: TestIamPermissionsProjectsLocationsNamespacesServicesResponse,
  errors: [],
}));

/** Creates an endpoint, and returns the new endpoint. */
export interface CreateProjectsLocationsNamespacesServicesEndpointsRequest {
  /** Required. The resource name of the service that this endpoint provides. */
  parent: string;
  /** Required. The Resource ID must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. */
  endpointId?: string;
  /** Request body */
  body?: Endpoint;
}

export const CreateProjectsLocationsNamespacesServicesEndpointsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  endpointId: Schema.optional(Schema.String).pipe(T.HttpQuery("endpointId")),
  body: Schema.optional(Endpoint).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces/{namespacesId}/services/{servicesId}/endpoints", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsNamespacesServicesEndpointsRequest>;

export type CreateProjectsLocationsNamespacesServicesEndpointsResponse = Endpoint;
export const CreateProjectsLocationsNamespacesServicesEndpointsResponse = Endpoint;

export type CreateProjectsLocationsNamespacesServicesEndpointsError = CommonErrors;

export const createProjectsLocationsNamespacesServicesEndpoints: API.OperationMethod<CreateProjectsLocationsNamespacesServicesEndpointsRequest, CreateProjectsLocationsNamespacesServicesEndpointsResponse, CreateProjectsLocationsNamespacesServicesEndpointsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsNamespacesServicesEndpointsRequest,
  output: CreateProjectsLocationsNamespacesServicesEndpointsResponse,
  errors: [],
}));

/** Lists all endpoints. */
export interface ListProjectsLocationsNamespacesServicesEndpointsRequest {
  /** Required. The resource name of the service whose endpoints you'd like to list. */
  parent: string;
  /** Optional. The maximum number of items to return. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Optional. The filter to list results by. General `filter` string syntax: ` ()` * `` can be `name`, `address`, `port`, or `annotations.` for map field * `` can be `<`, `>`, `<=`, `>=`, `!=`, `=`, `:`. Of which `:` means `HAS`, and is roughly the same as `=` * `` must be the same data type as field * `` can be `AND`, `OR`, `NOT` Examples of valid filters: * `annotations.owner` returns endpoints that have a annotation with the key `owner`, this is the same as `annotations:owner` * `annotations.protocol=gRPC` returns endpoints that have key/value `protocol=gRPC` * `address=192.108.1.105` returns endpoints that have this address * `port>8080` returns endpoints that have port number larger than 8080 * `name>projects/my-project/locations/us-east1/namespaces/my-namespace/services/my-service/endpoints/endpoint-c` returns endpoints that have name that is alphabetically later than the string, so "endpoint-e" is returned but "endpoint-a" is not * `annotations.owner!=sd AND annotations.foo=bar` returns endpoints that have `owner` in annotation key but value is not `sd` AND have key/value `foo=bar` * `doesnotexist.foo=bar` returns an empty list. Note that endpoint doesn't have a field called "doesnotexist". Since the filter does not match any endpoints, it returns no results For more information about filtering, see [API Filtering](https://aip.dev/160). */
  filter?: string;
  /** Optional. The order to list results by. General `order_by` string syntax: ` () (,)` * `` allows values: `name`, `address`, `port` * `` ascending or descending order by ``. If this is left blank, `asc` is used Note that an empty `order_by` string results in default order, which is order by `name` in ascending order. */
  orderBy?: string;
}

export const ListProjectsLocationsNamespacesServicesEndpointsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces/{namespacesId}/services/{servicesId}/endpoints" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsNamespacesServicesEndpointsRequest>;

export type ListProjectsLocationsNamespacesServicesEndpointsResponse = ListEndpointsResponse;
export const ListProjectsLocationsNamespacesServicesEndpointsResponse = ListEndpointsResponse;

export type ListProjectsLocationsNamespacesServicesEndpointsError = CommonErrors;

export const listProjectsLocationsNamespacesServicesEndpoints = API.makePaginated(() => ({
  input: ListProjectsLocationsNamespacesServicesEndpointsRequest,
  output: ListProjectsLocationsNamespacesServicesEndpointsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets an endpoint. */
export interface GetProjectsLocationsNamespacesServicesEndpointsRequest {
  /** Required. The name of the endpoint to get. */
  name: string;
}

export const GetProjectsLocationsNamespacesServicesEndpointsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces/{namespacesId}/services/{servicesId}/endpoints/{endpointsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsNamespacesServicesEndpointsRequest>;

export type GetProjectsLocationsNamespacesServicesEndpointsResponse = Endpoint;
export const GetProjectsLocationsNamespacesServicesEndpointsResponse = Endpoint;

export type GetProjectsLocationsNamespacesServicesEndpointsError = CommonErrors;

export const getProjectsLocationsNamespacesServicesEndpoints: API.OperationMethod<GetProjectsLocationsNamespacesServicesEndpointsRequest, GetProjectsLocationsNamespacesServicesEndpointsResponse, GetProjectsLocationsNamespacesServicesEndpointsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsNamespacesServicesEndpointsRequest,
  output: GetProjectsLocationsNamespacesServicesEndpointsResponse,
  errors: [],
}));

/** Updates an endpoint. */
export interface PatchProjectsLocationsNamespacesServicesEndpointsRequest {
  /** Immutable. The resource name for the endpoint in the format `projects/* /locations/* /namespaces/* /services/* /endpoints/*`. */
  name: string;
  /** Required. List of fields to be updated in this request. */
  updateMask?: string;
  /** Request body */
  body?: Endpoint;
}

export const PatchProjectsLocationsNamespacesServicesEndpointsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Endpoint).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces/{namespacesId}/services/{servicesId}/endpoints/{endpointsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsNamespacesServicesEndpointsRequest>;

export type PatchProjectsLocationsNamespacesServicesEndpointsResponse = Endpoint;
export const PatchProjectsLocationsNamespacesServicesEndpointsResponse = Endpoint;

export type PatchProjectsLocationsNamespacesServicesEndpointsError = CommonErrors;

export const patchProjectsLocationsNamespacesServicesEndpoints: API.OperationMethod<PatchProjectsLocationsNamespacesServicesEndpointsRequest, PatchProjectsLocationsNamespacesServicesEndpointsResponse, PatchProjectsLocationsNamespacesServicesEndpointsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsNamespacesServicesEndpointsRequest,
  output: PatchProjectsLocationsNamespacesServicesEndpointsResponse,
  errors: [],
}));

/** Deletes an endpoint. */
export interface DeleteProjectsLocationsNamespacesServicesEndpointsRequest {
  /** Required. The name of the endpoint to delete. */
  name: string;
}

export const DeleteProjectsLocationsNamespacesServicesEndpointsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/namespaces/{namespacesId}/services/{servicesId}/endpoints/{endpointsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsNamespacesServicesEndpointsRequest>;

export type DeleteProjectsLocationsNamespacesServicesEndpointsResponse = Empty;
export const DeleteProjectsLocationsNamespacesServicesEndpointsResponse = Empty;

export type DeleteProjectsLocationsNamespacesServicesEndpointsError = CommonErrors;

export const deleteProjectsLocationsNamespacesServicesEndpoints: API.OperationMethod<DeleteProjectsLocationsNamespacesServicesEndpointsRequest, DeleteProjectsLocationsNamespacesServicesEndpointsResponse, DeleteProjectsLocationsNamespacesServicesEndpointsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsNamespacesServicesEndpointsRequest,
  output: DeleteProjectsLocationsNamespacesServicesEndpointsResponse,
  errors: [],
}));

