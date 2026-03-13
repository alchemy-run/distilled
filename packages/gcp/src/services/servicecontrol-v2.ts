// ==========================================================================
// Service Control API (servicecontrol v2)
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
  name: "servicecontrol",
  version: "v2",
  rootUrl: "https://servicecontrol.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Status {
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
}

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Schema.String),
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      code: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface CheckResponse {
  /** Operation is allowed when this field is not set. Any non-'OK' status indicates a denial; google.rpc.Status.details would contain additional details about the denial. */
  status?: Status;
  /** Optional response metadata that will be emitted as dynamic metadata to be consumed by the caller of ServiceController. For compatibility with the ext_authz interface. */
  dynamicMetadata?: Record<string, unknown>;
  /** Returns a set of request contexts generated from the `CheckRequest`. */
  headers?: Record<string, string>;
}

export const CheckResponse: Schema.Schema<CheckResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      status: Schema.optional(Status),
      dynamicMetadata: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      headers: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "CheckResponse",
  }) as any as Schema.Schema<CheckResponse>;

export interface Resource {
  /** The name of the service that this resource belongs to, such as `pubsub.googleapis.com`. The service may be different from the DNS hostname that actually serves the request. */
  service?: string;
  /** Mutable. The display name set by clients. Must be <= 63 characters. */
  displayName?: string;
  /** Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. */
  etag?: string;
  /** Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/ */
  annotations?: Record<string, string>;
  /** Output only. The timestamp when the resource was created. This may be either the time creation was initiated or when it was completed. */
  createTime?: string;
  /** The stable identifier (name) of a resource on the `service`. A resource can be logically identified as "//{resource.service}/{resource.name}". The differences between a resource name and a URI are: * Resource name is a logical identifier, independent of network protocol and API version. For example, `//pubsub.googleapis.com/projects/123/topics/news-feed`. * URI often includes protocol and version information, so it can be used directly by applications. For example, `https://pubsub.googleapis.com/v1/projects/123/topics/news-feed`. See https://cloud.google.com/apis/design/resource_names for details. */
  name?: string;
  /** The type of the resource. The syntax is platform-specific because different platforms define their resources differently. For Google APIs, the type format must be "{service}/{kind}", such as "pubsub.googleapis.com/Topic". */
  type?: string;
  /** Output only. The timestamp when the resource was deleted. If the resource is not deleted, this must be empty. */
  deleteTime?: string;
  /** The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. */
  uid?: string;
  /** The labels or tags on the resource, such as AWS resource tags and Kubernetes resource labels. */
  labels?: Record<string, string>;
  /** Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. */
  updateTime?: string;
  /** Immutable. The location of the resource. The location encoding is specific to the service provider, and new encoding may be introduced as the service evolves. For Google Cloud products, the encoding is what is used by Google Cloud APIs, such as `us-east1`, `aws-us-east-1`, and `azure-eastus2`. The semantics of `location` is identical to the `cloud.googleapis.com/location` label used by some Google Cloud APIs. */
  location?: string;
}

export const Resource: Schema.Schema<Resource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      service: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      createTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      updateTime: Schema.optional(Schema.String),
      location: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Resource" }) as any as Schema.Schema<Resource>;

export interface AuthorizationInfo {
  /** Resource attributes used in IAM condition evaluation. This field contains resource attributes like resource type and resource name. To get the whole view of the attributes used in IAM condition evaluation, the user must also look into `AuditLog.request_metadata.request_attributes`. */
  resourceAttributes?: Resource;
  /** The type of the permission that was checked. For data access audit logs this corresponds with the permission type that must be enabled in the project/folder/organization IAM policy in order for the log to be written. */
  permissionType?:
    | "PERMISSION_TYPE_UNSPECIFIED"
    | "ADMIN_READ"
    | "ADMIN_WRITE"
    | "DATA_READ"
    | "DATA_WRITE"
    | (string & {});
  /** The required IAM permission. */
  permission?: string;
  /** The resource being accessed, as a REST-style or cloud resource string. For example: bigquery.googleapis.com/projects/PROJECTID/datasets/DATASETID or projects/PROJECTID/datasets/DATASETID */
  resource?: string;
  /** Whether or not authorization for `resource` and `permission` was granted. */
  granted?: boolean;
}

export const AuthorizationInfo: Schema.Schema<AuthorizationInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceAttributes: Schema.optional(Resource),
      permissionType: Schema.optional(Schema.String),
      permission: Schema.optional(Schema.String),
      resource: Schema.optional(Schema.String),
      granted: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AuthorizationInfo",
  }) as any as Schema.Schema<AuthorizationInfo>;

export interface V2HttpRequest {
  /** The referer URL of the request, as defined in [HTTP/1.1 Header Field Definitions](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html). */
  referer?: string;
  /** The IP address (IPv4 or IPv6) of the client that issued the HTTP request. Examples: `"192.168.1.1"`, `"FE80::0202:B3FF:FE1E:8329"`. */
  remoteIp?: string;
  /** The size of the HTTP request message in bytes, including the request headers and the request body. */
  requestSize?: string;
  /** Whether or not the response was validated with the origin server before being served from cache. This field is only meaningful if `cache_hit` is True. */
  cacheValidatedWithOriginServer?: boolean;
  /** Whether or not a cache lookup was attempted. */
  cacheLookup?: boolean;
  /** The IP address (IPv4 or IPv6) of the origin server that the request was sent to. */
  serverIp?: string;
  /** The response code indicating the status of the response. Examples: 200, 404. */
  status?: number;
  /** The request processing latency on the server, from the time the request was received until the response was sent. */
  latency?: string;
  /** The size of the HTTP response message sent back to the client, in bytes, including the response headers and the response body. */
  responseSize?: string;
  /** The request method. Examples: `"GET"`, `"HEAD"`, `"PUT"`, `"POST"`. */
  requestMethod?: string;
  /** Protocol used for the request. Examples: "HTTP/1.1", "HTTP/2", "websocket" */
  protocol?: string;
  /** The number of HTTP response bytes inserted into cache. Set only when a cache fill was attempted. */
  cacheFillBytes?: string;
  /** The scheme (http, https), the host name, the path, and the query portion of the URL that was requested. Example: `"http://example.com/some/info?color=red"`. */
  requestUrl?: string;
  /** The user agent sent by the client. Example: `"Mozilla/4.0 (compatible; MSIE 6.0; Windows 98; Q312461; .NET CLR 1.0.3705)"`. */
  userAgent?: string;
  /** Whether or not an entity was served from cache (with or without validation). */
  cacheHit?: boolean;
}

export const V2HttpRequest: Schema.Schema<V2HttpRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      referer: Schema.optional(Schema.String),
      remoteIp: Schema.optional(Schema.String),
      requestSize: Schema.optional(Schema.String),
      cacheValidatedWithOriginServer: Schema.optional(Schema.Boolean),
      cacheLookup: Schema.optional(Schema.Boolean),
      serverIp: Schema.optional(Schema.String),
      status: Schema.optional(Schema.Number),
      latency: Schema.optional(Schema.String),
      responseSize: Schema.optional(Schema.String),
      requestMethod: Schema.optional(Schema.String),
      protocol: Schema.optional(Schema.String),
      cacheFillBytes: Schema.optional(Schema.String),
      requestUrl: Schema.optional(Schema.String),
      userAgent: Schema.optional(Schema.String),
      cacheHit: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "V2HttpRequest",
  }) as any as Schema.Schema<V2HttpRequest>;

export interface V2LogEntryOperation {
  /** Optional. An arbitrary producer identifier. The combination of `id` and `producer` must be globally unique. Examples for `producer`: `"MyDivision.MyBigCompany.com"`, `"github.com/MyProject/MyApplication"`. */
  producer?: string;
  /** Optional. An arbitrary operation identifier. Log entries with the same identifier are assumed to be part of the same operation. */
  id?: string;
  /** Optional. Set this to True if this is the last log entry in the operation. */
  last?: boolean;
  /** Optional. Set this to True if this is the first log entry in the operation. */
  first?: boolean;
}

export const V2LogEntryOperation: Schema.Schema<V2LogEntryOperation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      producer: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      last: Schema.optional(Schema.Boolean),
      first: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "V2LogEntryOperation",
  }) as any as Schema.Schema<V2LogEntryOperation>;

export interface ServiceMetadata {
  /** Additional metadata provided by service teams to describe service specific job information that was triggered by the original principal. */
  jobMetadata?: Record<string, unknown>;
  /** A string representing the principal_subject associated with the identity. For most identities, the format will be `principal://iam.googleapis.com/{identity pool name}/subject/{subject)` except for some GKE identities (GKE_WORKLOAD, FREEFORM, GKE_HUB_WORKLOAD) that are still in the legacy format `serviceAccount:{identity pool name}[{subject}]` If the identity is a Google account (e.g. workspace user account or service account), this will be the email of the prefixed by `serviceAccount:`. For example: `serviceAccount:my-service-account@project-1.iam.gserviceaccount.com`. If the identity is an individual user, the identity will be formatted as: `user:user_ABC@email.com`. */
  principalSubject?: string;
  /** The service's fully qualified domain name, e.g. "dataproc.googleapis.com". */
  serviceDomain?: string;
}

export const ServiceMetadata: Schema.Schema<ServiceMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      jobMetadata: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      principalSubject: Schema.optional(Schema.String),
      serviceDomain: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ServiceMetadata",
  }) as any as Schema.Schema<ServiceMetadata>;

export interface ReportResponse {
  /** The extension field to store serialized OTel responses. e.g. ExportLogsServiceResponse, ExportMetricsServiceResponse. */
  extensions?: Record<string, unknown>;
}

export const ReportResponse: Schema.Schema<ReportResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      extensions: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "ReportResponse",
  }) as any as Schema.Schema<ReportResponse>;

export interface Oauth {
  /** The optional OAuth client ID. This is the unique public identifier issued by an authorization server to a registered client application. Empty string is equivalent to no oauth client id. WARNING: This is for MCP tools/call and tools/list authorization and not for general use. */
  clientId?: string;
}

export const Oauth: Schema.Schema<Oauth> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      clientId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Oauth" }) as any as Schema.Schema<Oauth>;

export interface ResourceInfo {
  /** The resource permission needed for this request. The format must be "{service}/{plural}.{verb}". */
  permission?: string;
  /** Optional. The location of the resource, it must be a valid zone, region or multiregion, for example: "europe-west4", "northamerica-northeast1-a". Required for location policy check. */
  location?: string;
  /** The name of the resource referenced in the request. */
  name?: string;
  /** Optional. The identifier of the container of this resource. For Google Cloud APIs, the resource container must be one of the following formats: - `projects/` - `folders/` - `organizations/` Required for the policy enforcement on the container level (e.g. VPCSC, Location Policy check, Org Policy check). */
  container?: string;
  /** The resource type in the format of "{service}/{kind}". */
  type?: string;
}

export const ResourceInfo: Schema.Schema<ResourceInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      permission: Schema.optional(Schema.String),
      location: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      container: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ResourceInfo",
  }) as any as Schema.Schema<ResourceInfo>;

export interface ResourceLocation {
  /** The locations of a resource prior to the execution of the operation. Requests that mutate the resource's location must populate both the 'original_locations' as well as the 'current_locations' fields. For example: "europe-west1-a" "us-east1" "nam3" */
  originalLocations?: Array<string>;
  /** The locations of a resource after the execution of the operation. Requests to create or delete a location based resource must populate the 'current_locations' field and not the 'original_locations' field. For example: "europe-west1-a" "us-east1" "nam3" */
  currentLocations?: Array<string>;
}

export const ResourceLocation: Schema.Schema<ResourceLocation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      originalLocations: Schema.optional(Schema.Array(Schema.String)),
      currentLocations: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ResourceLocation",
  }) as any as Schema.Schema<ResourceLocation>;

export interface V2ResourceEvent {
  /** The ESF unique context id of the api request, from which this resource event originated. This field is only needed for CAIS integration via api annotation. See go/cais-lro-delete for more details. */
  contextId?: string;
  /** The resource event type determines how the backend service should process the event. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "CREATE"
    | "UPDATE"
    | "DELETE"
    | "UNDELETE"
    | (string & {});
  /** The api path the resource event was created in. This should match the source of the `payload` field. For direct integrations with Chemist, this should generally be the RESPONSE. go/resource-event-pipeline-type */
  path?: "API_PATH_UNSPECIFIED" | "REQUEST" | "RESPONSE" | (string & {});
  /** The resource associated with the event. */
  resource?: Resource;
  /** The payload contains metadata associated with the resource event. A ResourceEventPayloadStatus is provided instead if the original payload cannot be returned due to a limitation (e.g. size limit). */
  payload?: Record<string, unknown>;
  /** The parent resource for the resource. */
  parent?: Resource;
  /** The destinations field determines which backend services should handle the event. This should be specified as a comma-delimited string. */
  destinations?: string;
}

export const V2ResourceEvent: Schema.Schema<V2ResourceEvent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contextId: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
      resource: Schema.optional(Resource),
      payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      parent: Schema.optional(Resource),
      destinations: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "V2ResourceEvent",
  }) as any as Schema.Schema<V2ResourceEvent>;

export interface ServiceDelegationHistory {
  /** Data identifying the service specific jobs or units of work that were involved in a chain of service calls. */
  serviceMetadata?: Array<ServiceMetadata>;
  /** The original end user who initiated the request to GCP. */
  originalPrincipal?: string;
}

export const ServiceDelegationHistory: Schema.Schema<ServiceDelegationHistory> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      serviceMetadata: Schema.optional(Schema.Array(ServiceMetadata)),
      originalPrincipal: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ServiceDelegationHistory",
  }) as any as Schema.Schema<ServiceDelegationHistory>;

export interface Auth {
  /** Attributes of the OAuth token associated with the request. */
  oauth?: Oauth;
  /** The authenticated principal. Reflects the issuer (`iss`) and subject (`sub`) claims within a JWT. The issuer and subject should be `/` delimited, with `/` percent-encoded within the subject fragment. For Google accounts, the principal format is: "https://accounts.google.com/{id}" */
  principal?: string;
  /** Structured claims presented with the credential. JWTs include `{key: value}` pairs for standard and private claims. The following is a subset of the standard required and optional claims that would typically be presented for a Google-based JWT: {'iss': 'accounts.google.com', 'sub': '113289723416554971153', 'aud': ['123456789012', 'pubsub.googleapis.com'], 'azp': '123456789012.apps.googleusercontent.com', 'email': 'jsmith@example.com', 'iat': 1353601026, 'exp': 1353604926} SAML assertions are similarly specified, but with an identity provider dependent structure. */
  claims?: Record<string, unknown>;
  /** The authorized presenter of the credential. Reflects the optional Authorized Presenter (`azp`) claim within a JWT or the OAuth client id. For example, a Google Cloud Platform client id looks as follows: "123456789012.apps.googleusercontent.com". */
  presenter?: string;
  /** A list of access level resource names that allow resources to be accessed by authenticated requester. It is part of Secure GCP processing for the incoming request. An access level string has the format: "//{api_service_name}/accessPolicies/{policy_id}/accessLevels/{short_name}" Example: "//accesscontextmanager.googleapis.com/accessPolicies/MY_POLICY_ID/accessLevels/MY_LEVEL" */
  accessLevels?: Array<string>;
  /** The intended audience(s) for this authentication information. Reflects the audience (`aud`) claim within a JWT. The audience value(s) depends on the `issuer`, but typically include one or more of the following pieces of information: * The services intended to receive the credential. For example, ["https://pubsub.googleapis.com/", "https://storage.googleapis.com/"]. * A set of service-based scopes. For example, ["https://www.googleapis.com/auth/cloud-platform"]. * The client id of an app, such as the Firebase project id for JWTs from Firebase Auth. Consult the documentation for the credential issuer to determine the information provided. */
  audiences?: Array<string>;
}

export const Auth: Schema.Schema<Auth> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      oauth: Schema.optional(Oauth),
      principal: Schema.optional(Schema.String),
      claims: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      presenter: Schema.optional(Schema.String),
      accessLevels: Schema.optional(Schema.Array(Schema.String)),
      audiences: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({ identifier: "Auth" }) as any as Schema.Schema<Auth>;

export interface ThirdPartyPrincipal {
  /** Metadata about third party identity. */
  thirdPartyClaims?: Record<string, unknown>;
}

export const ThirdPartyPrincipal: Schema.Schema<ThirdPartyPrincipal> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      thirdPartyClaims: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
    }),
  ).annotate({
    identifier: "ThirdPartyPrincipal",
  }) as any as Schema.Schema<ThirdPartyPrincipal>;

export interface FirstPartyPrincipal {
  /** The email address of a Google account. . */
  principalEmail?: string;
  /** Metadata about the service that uses the service account. . */
  serviceMetadata?: Record<string, unknown>;
}

export const FirstPartyPrincipal: Schema.Schema<FirstPartyPrincipal> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      principalEmail: Schema.optional(Schema.String),
      serviceMetadata: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
    }),
  ).annotate({
    identifier: "FirstPartyPrincipal",
  }) as any as Schema.Schema<FirstPartyPrincipal>;

export interface ServiceAccountDelegationInfo {
  /** Third party identity as the real authority. */
  thirdPartyPrincipal?: ThirdPartyPrincipal;
  /** First party (Google) identity as the real authority. */
  firstPartyPrincipal?: FirstPartyPrincipal;
  /** A string representing the principal_subject associated with the identity. For most identities, the format will be `principal://iam.googleapis.com/{identity pool name}/subject/{subject)` except for some GKE identities (GKE_WORKLOAD, FREEFORM, GKE_HUB_WORKLOAD) that are still in the legacy format `serviceAccount:{identity pool name}[{subject}]` */
  principalSubject?: string;
}

export const ServiceAccountDelegationInfo: Schema.Schema<ServiceAccountDelegationInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      thirdPartyPrincipal: Schema.optional(ThirdPartyPrincipal),
      firstPartyPrincipal: Schema.optional(FirstPartyPrincipal),
      principalSubject: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ServiceAccountDelegationInfo",
  }) as any as Schema.Schema<ServiceAccountDelegationInfo>;

export interface OAuthInfo {
  /** The OAuth client ID of the 1P or 3P application acting on behalf of the user. */
  oauthClientId?: string;
}

export const OAuthInfo: Schema.Schema<OAuthInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      oauthClientId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "OAuthInfo" }) as any as Schema.Schema<OAuthInfo>;

export interface AuthenticationInfo {
  /** The authority selector specified by the requestor, if any. It is not guaranteed that the principal was allowed to use this authority. */
  authoritySelector?: string;
  /** Records the history of delegated resource access across Google services. */
  serviceDelegationHistory?: ServiceDelegationHistory;
  /** The name of the service account key used to create or exchange credentials for authenticating the service account making the request. This is a scheme-less URI full resource name. For example: "//iam.googleapis.com/projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}" */
  serviceAccountKeyName?: string;
  /** String representation of identity of requesting party. Populated for both first and third party identities. */
  principalSubject?: string;
  /** The email address of the authenticated user (or service account on behalf of third party principal) making the request. For third party identity callers, the `principal_subject` field is populated instead of this field. For privacy reasons, the principal email address is sometimes redacted. For more information, see [Caller identities in audit logs](https://cloud.google.com/logging/docs/audit#user-id). */
  principalEmail?: string;
  /** Identity delegation history of an authenticated service account that makes the request. It contains information on the real authorities that try to access GCP resources by delegating on a service account. When multiple authorities present, they are guaranteed to be sorted based on the original ordering of the identity delegation events. */
  serviceAccountDelegationInfo?: Array<ServiceAccountDelegationInfo>;
  /** Converted from "identity_cloudgaia.AuditLoggableShortLivedCredential" proto. This message will be used by security, detection and response team. For context please refer to go/cg:short-lived-credential-logging. When the JSON object represented here has a proto equivalent, the proto name will be indicated in the `@type` property. */
  loggableShortLivedCredential?: Record<string, unknown>;
  /** OAuth authentication information such as the OAuth client ID. */
  oauthInfo?: OAuthInfo;
  /** The third party identification (if any) of the authenticated user making the request. When the JSON object represented here has a proto equivalent, the proto name will be indicated in the `@type` property. */
  thirdPartyPrincipal?: Record<string, unknown>;
}

export const AuthenticationInfo: Schema.Schema<AuthenticationInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      authoritySelector: Schema.optional(Schema.String),
      serviceDelegationHistory: Schema.optional(ServiceDelegationHistory),
      serviceAccountKeyName: Schema.optional(Schema.String),
      principalSubject: Schema.optional(Schema.String),
      principalEmail: Schema.optional(Schema.String),
      serviceAccountDelegationInfo: Schema.optional(
        Schema.Array(ServiceAccountDelegationInfo),
      ),
      loggableShortLivedCredential: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      oauthInfo: Schema.optional(OAuthInfo),
      thirdPartyPrincipal: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
    }),
  ).annotate({
    identifier: "AuthenticationInfo",
  }) as any as Schema.Schema<AuthenticationInfo>;

export interface Request {
  /** The HTTP request size in bytes. If unknown, it must be -1. */
  size?: string;
  /** The HTTP URL scheme, such as `http` and `https`. */
  scheme?: string;
  /** The HTTP request `Host` header value. */
  host?: string;
  /** The HTTP URL path, excluding the query parameters. */
  path?: string;
  /** The network protocol used with the request, such as "http/1.1", "spdy/3", "h2", "h2c", "webrtc", "tcp", "udp", "quic". See https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml#alpn-protocol-ids for details. */
  protocol?: string;
  /** The request authentication. May be absent for unauthenticated requests. Derived from the HTTP request `Authorization` header or equivalent. */
  auth?: Auth;
  /** The timestamp when the `destination` service receives the last byte of the request. */
  time?: string;
  /** The HTTP request method, such as `GET`, `POST`. */
  method?: string;
  /** A special parameter for request reason. It is used by security systems to associate auditing information with a request. */
  reason?: string;
  /** The unique ID for a request, which can be propagated to downstream systems. The ID should have low probability of collision within a single day for a specific service. */
  id?: string;
  /** The HTTP URL query in the format of `name1=value1&name2=value2`, as it appears in the first line of the HTTP request. No decoding is performed. */
  query?: string;
  /** The HTTP request headers. If multiple headers share the same key, they must be merged according to the HTTP spec. All header keys must be lowercased, because HTTP header keys are case-insensitive. */
  headers?: Record<string, string>;
  /** The values from Origin header from the HTTP request, such as "https://console.cloud.google.com". Modern browsers can only have one origin. Special browsers and/or HTTP clients may require multiple origins. */
  origin?: string;
}

export const Request: Schema.Schema<Request> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      size: Schema.optional(Schema.String),
      scheme: Schema.optional(Schema.String),
      host: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
      protocol: Schema.optional(Schema.String),
      auth: Schema.optional(Auth),
      time: Schema.optional(Schema.String),
      method: Schema.optional(Schema.String),
      reason: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      query: Schema.optional(Schema.String),
      headers: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      origin: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Request" }) as any as Schema.Schema<Request>;

export interface Peer {
  /** The CLDR country/region code associated with the above IP address. If the IP address is private, the `region_code` should reflect the physical location where this peer is running. */
  regionCode?: string;
  /** The network port of the peer. */
  port?: string;
  /** The identity of this peer. Similar to `Request.auth.principal`, but relative to the peer instead of the request. For example, the identity associated with a load balancer that forwarded the request. */
  principal?: string;
  /** The labels associated with the peer. */
  labels?: Record<string, string>;
  /** The IP address of the peer. */
  ip?: string;
}

export const Peer: Schema.Schema<Peer> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      regionCode: Schema.optional(Schema.String),
      port: Schema.optional(Schema.String),
      principal: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      ip: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Peer" }) as any as Schema.Schema<Peer>;

export interface RequestMetadata {
  /** Request attributes used in IAM condition evaluation. This field contains request attributes like request time and access levels associated with the request. To get the whole view of the attributes used in IAM condition evaluation, the user must also look into `AuditLog.authentication_info.resource_attributes`. */
  requestAttributes?: Request;
  /** The IP address of the caller. For a caller from the internet, this will be the public IPv4 or IPv6 address. For calls made from inside Google's internal production network from one GCP service to another, `caller_ip` will be redacted to "private". For a caller from a Compute Engine VM with a external IP address, `caller_ip` will be the VM's external IP address. For a caller from a Compute Engine VM without a external IP address, if the VM is in the same organization (or project) as the accessed resource, `caller_ip` will be the VM's internal IPv4 address, otherwise `caller_ip` will be redacted to "gce-internal-ip". See https://cloud.google.com/compute/docs/vpc/ for more information. */
  callerIp?: string;
  /** The network of the caller. Set only if the network host project is part of the same GCP organization (or project) as the accessed resource. See https://cloud.google.com/compute/docs/vpc/ for more information. This is a scheme-less URI full resource name. For example: "//compute.googleapis.com/projects/PROJECT_ID/global/networks/NETWORK_ID" */
  callerNetwork?: string;
  /** The destination of a network activity, such as accepting a TCP connection. In a multi hop network activity, the destination represents the receiver of the last hop. Only two fields are used in this message, Peer.port and Peer.ip. These fields are optionally populated by those services utilizing the IAM condition feature. */
  destinationAttributes?: Peer;
  /** The user agent of the caller. This information is not authenticated and should be treated accordingly. For example: + `google-api-python-client/1.4.0`: The request was made by the Google API client for Python. + `Cloud SDK Command Line Tool apitools-client/1.0 gcloud/0.9.62`: The request was made by the Google Cloud SDK CLI (gcloud). + `AppEngine-Google; (+http://code.google.com/appengine; appid: s~my-project`: The request was made from the `my-project` App Engine app. */
  callerSuppliedUserAgent?: string;
}

export const RequestMetadata: Schema.Schema<RequestMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requestAttributes: Schema.optional(Request),
      callerIp: Schema.optional(Schema.String),
      callerNetwork: Schema.optional(Schema.String),
      destinationAttributes: Schema.optional(Peer),
      callerSuppliedUserAgent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RequestMetadata",
  }) as any as Schema.Schema<RequestMetadata>;

export interface ViolationInfo {
  /** Optional. Value that is being checked for the policy. This could be in encrypted form (if pii sensitive). This field will only be emitted in LIST_POLICY types */
  checkedValue?: string;
  /** Optional. Error message that policy is indicating. */
  errorMessage?: string;
  /** Optional. Indicates the type of the policy. */
  policyType?:
    | "POLICY_TYPE_UNSPECIFIED"
    | "BOOLEAN_CONSTRAINT"
    | "LIST_CONSTRAINT"
    | "CUSTOM_CONSTRAINT"
    | (string & {});
  /** Optional. Provides extra information for the specific violated constraint. See the constraint's documentation to determine if this field is populated and what the structure of the message should be. */
  constraintViolationInfo?: Record<string, unknown>;
  /** Optional. Constraint name */
  constraint?: string;
}

export const ViolationInfo: Schema.Schema<ViolationInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      checkedValue: Schema.optional(Schema.String),
      errorMessage: Schema.optional(Schema.String),
      policyType: Schema.optional(Schema.String),
      constraintViolationInfo: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      constraint: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ViolationInfo",
  }) as any as Schema.Schema<ViolationInfo>;

export interface OrgPolicyViolationInfo {
  /** Optional. Policy violations */
  violationInfo?: Array<ViolationInfo>;
  /** Optional. Deprecated. Tags referenced on the resource at the time of evaluation. */
  resourceTags?: Record<string, string>;
  /** Optional. Resource type that the orgpolicy is checked against. Example: compute.googleapis.com/Instance, store.googleapis.com/bucket */
  resourceType?: string;
  /** Optional. Deprecated. Resource payload that is currently in scope and is subjected to orgpolicy conditions. This payload may be the subset of the actual Resource that may come in the request. */
  payload?: Record<string, unknown>;
}

export const OrgPolicyViolationInfo: Schema.Schema<OrgPolicyViolationInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      violationInfo: Schema.optional(Schema.Array(ViolationInfo)),
      resourceTags: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      resourceType: Schema.optional(Schema.String),
      payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "OrgPolicyViolationInfo",
  }) as any as Schema.Schema<OrgPolicyViolationInfo>;

export interface PolicyViolationInfo {
  /** Indicates the orgpolicy violations for this resource. */
  orgPolicyViolationInfo?: OrgPolicyViolationInfo;
}

export const PolicyViolationInfo: Schema.Schema<PolicyViolationInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      orgPolicyViolationInfo: Schema.optional(OrgPolicyViolationInfo),
    }),
  ).annotate({
    identifier: "PolicyViolationInfo",
  }) as any as Schema.Schema<PolicyViolationInfo>;

export interface AuditLog {
  /** Authentication information. */
  authenticationInfo?: AuthenticationInfo;
  /** The operation request. This may not include all request parameters, such as those that are too large, privacy-sensitive, or duplicated elsewhere in the log record. It should never include user-generated data, such as file contents. When the JSON object represented here has a proto equivalent, the proto name will be indicated in the `@type` property. */
  request?: Record<string, unknown>;
  /** The number of items returned from a List or Query API method, if applicable. */
  numResponseItems?: string;
  /** The resource's original state before mutation. Present only for operations which have successfully modified the targeted resource(s). In general, this field should contain all changed fields, except those that are already been included in `request`, `response`, `metadata` or `service_data` fields. When the JSON object represented here has a proto equivalent, the proto name will be indicated in the `@type` property. */
  resourceOriginalState?: Record<string, unknown>;
  /** The name of the service method or operation. For API calls, this should be the name of the API method. For example, "google.cloud.bigquery.v2.TableService.InsertTable" "google.logging.v2.ConfigServiceV2.CreateSink" */
  methodName?: string;
  /** The name of the API service performing the operation. For example, `"compute.googleapis.com"`. */
  serviceName?: string;
  /** Deprecated. Use the `metadata` field instead. Other service-specific data about the request, response, and other activities. */
  serviceData?: Record<string, unknown>;
  /** Metadata about the operation. */
  requestMetadata?: RequestMetadata;
  /** The resource or collection that is the target of the operation. The name is a scheme-less URI, not including the API service name. For example: "projects/PROJECT_ID/zones/us-central1-a/instances" "projects/PROJECT_ID/datasets/DATASET_ID" */
  resourceName?: string;
  /** Authorization information. If there are multiple resources or permissions involved, then there is one AuthorizationInfo element for each {resource, permission} tuple. */
  authorizationInfo?: Array<AuthorizationInfo>;
  /** The operation response. This may not include all response elements, such as those that are too large, privacy-sensitive, or duplicated elsewhere in the log record. It should never include user-generated data, such as file contents. When the JSON object represented here has a proto equivalent, the proto name will be indicated in the `@type` property. */
  response?: Record<string, unknown>;
  /** The resource location information. */
  resourceLocation?: ResourceLocation;
  /** Other service-specific data about the request, response, and other information associated with the current audited event. */
  metadata?: Record<string, unknown>;
  /** The status of the overall operation. */
  status?: Status;
  /** Indicates the policy violations for this request. If the request is denied by the policy, violation information will be logged here. */
  policyViolationInfo?: PolicyViolationInfo;
}

export const AuditLog: Schema.Schema<AuditLog> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      authenticationInfo: Schema.optional(AuthenticationInfo),
      request: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      numResponseItems: Schema.optional(Schema.String),
      resourceOriginalState: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      methodName: Schema.optional(Schema.String),
      serviceName: Schema.optional(Schema.String),
      serviceData: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      requestMetadata: Schema.optional(RequestMetadata),
      resourceName: Schema.optional(Schema.String),
      authorizationInfo: Schema.optional(Schema.Array(AuthorizationInfo)),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      resourceLocation: Schema.optional(ResourceLocation),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      status: Schema.optional(Status),
      policyViolationInfo: Schema.optional(PolicyViolationInfo),
    }),
  ).annotate({ identifier: "AuditLog" }) as any as Schema.Schema<AuditLog>;

export interface SpanContext {
  /** The resource name of the span. The format is: projects/[PROJECT_ID_OR_NUMBER]/traces/[TRACE_ID]/spans/[SPAN_ID] `[TRACE_ID]` is a unique identifier for a trace within a project; it is a 32-character hexadecimal encoding of a 16-byte array. `[SPAN_ID]` is a unique identifier for a span within a trace; it is a 16-character hexadecimal encoding of an 8-byte array. */
  spanName?: string;
}

export const SpanContext: Schema.Schema<SpanContext> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      spanName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SpanContext",
  }) as any as Schema.Schema<SpanContext>;

export interface Response {
  /** The timestamp when the `destination` service sends the last byte of the response. */
  time?: string;
  /** The HTTP response status code, such as `200` and `404`. */
  code?: string;
  /** The HTTP response size in bytes. If unknown, it must be -1. */
  size?: string;
  /** The amount of time it takes the backend service to fully respond to a request. Measured from when the destination service starts to send the request to the backend until when the destination service receives the complete response from the backend. */
  backendLatency?: string;
  /** The HTTP response headers. If multiple headers share the same key, they must be merged according to HTTP spec. All header keys must be lowercased, because HTTP header keys are case-insensitive. */
  headers?: Record<string, string>;
}

export const Response: Schema.Schema<Response> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      time: Schema.optional(Schema.String),
      code: Schema.optional(Schema.String),
      size: Schema.optional(Schema.String),
      backendLatency: Schema.optional(Schema.String),
      headers: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({ identifier: "Response" }) as any as Schema.Schema<Response>;

export interface Api {
  /** The API protocol used for sending the request, such as "http", "https", "grpc", or "internal". */
  protocol?: string;
  /** The API service name. It is a logical identifier for a networked API, such as "pubsub.googleapis.com". The naming syntax depends on the API management system being used for handling the request. */
  service?: string;
  /** The API operation name. For gRPC requests, it is the fully qualified API method name, such as "google.pubsub.v1.Publisher.Publish". For OpenAPI requests, it is the `operationId`, such as "getPet". */
  operation?: string;
  /** The API version associated with the API operation above, such as "v1" or "v1alpha1". */
  version?: string;
}

export const Api: Schema.Schema<Api> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      protocol: Schema.optional(Schema.String),
      service: Schema.optional(Schema.String),
      operation: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Api" }) as any as Schema.Schema<Api>;

export interface AttributeContext {
  /** Represents a target resource that is involved with a network activity. If multiple resources are involved with an activity, this must be the primary one. */
  resource?: Resource;
  /** The destination of a network activity, such as accepting a TCP connection. In a multi hop network activity, the destination represents the receiver of the last hop. */
  destination?: Peer;
  /** Supports extensions for advanced use cases, such as logs and metrics. */
  extensions?: Array<Record<string, unknown>>;
  /** The origin of a network activity. In a multi hop network activity, the origin represents the sender of the first hop. For the first hop, the `source` and the `origin` must have the same content. */
  origin?: Peer;
  /** Represents a network response, such as an HTTP response. */
  response?: Response;
  /** Represents a network request, such as an HTTP request. */
  request?: Request;
  /** Represents an API operation that is involved to a network activity. */
  api?: Api;
  /** The source of a network activity, such as starting a TCP connection. In a multi hop network activity, the source represents the sender of the last hop. */
  source?: Peer;
}

export const AttributeContext: Schema.Schema<AttributeContext> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resource: Schema.optional(Resource),
      destination: Schema.optional(Peer),
      extensions: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      origin: Schema.optional(Peer),
      response: Schema.optional(Response),
      request: Schema.optional(Request),
      api: Schema.optional(Api),
      source: Schema.optional(Peer),
    }),
  ).annotate({
    identifier: "AttributeContext",
  }) as any as Schema.Schema<AttributeContext>;

export interface CheckRequest {
  /** Specifies the version of the service configuration that should be used to process the request. Must not be empty. Set this field to 'latest' to specify using the latest configuration. */
  serviceConfigId?: string;
  /** Optional. Contains a comma-separated list of flags. */
  flags?: string;
  /** Describes the resources and the policies applied to each resource. */
  resources?: Array<ResourceInfo>;
  /** Describes attributes about the operation being executed by the service. */
  attributes?: AttributeContext;
}

export const CheckRequest: Schema.Schema<CheckRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      serviceConfigId: Schema.optional(Schema.String),
      flags: Schema.optional(Schema.String),
      resources: Schema.optional(Schema.Array(ResourceInfo)),
      attributes: Schema.optional(AttributeContext),
    }),
  ).annotate({
    identifier: "CheckRequest",
  }) as any as Schema.Schema<CheckRequest>;

export interface V2LogEntrySourceLocation {
  /** Optional. Line within the source file. 1-based; 0 indicates no line number available. */
  line?: string;
  /** Optional. Source file name. Depending on the runtime environment, this might be a simple name or a fully-qualified name. */
  file?: string;
  /** Optional. Human-readable name of the function or method being invoked, with optional context such as the class or package name. This information may be used in contexts such as the logs viewer, where a file and line number are less meaningful. The format can vary by language. For example: `qual.if.ied.Class.method` (Java), `dir/package.func` (Go), `function` (Python). */
  function?: string;
}

export const V2LogEntrySourceLocation: Schema.Schema<V2LogEntrySourceLocation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      line: Schema.optional(Schema.String),
      file: Schema.optional(Schema.String),
      function: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "V2LogEntrySourceLocation",
  }) as any as Schema.Schema<V2LogEntrySourceLocation>;

export interface V2LogEntry {
  /** The time the event described by the log entry occurred. If omitted, defaults to operation start time. */
  timestamp?: string;
  /** Required. The log to which this log entry belongs. Examples: `"syslog"`, `"book_log"`. */
  name?: string;
  /** Optional. Resource name of the trace associated with the log entry, if any. If this field contains a relative resource name, you can assume the name is relative to `//tracing.googleapis.com`. Example: `projects/my-projectid/traces/06796866738c859f2f19b7cfb3214824` */
  trace?: string;
  /** The log entry payload, represented as a structure that is expressed as a JSON object. */
  structPayload?: Record<string, unknown>;
  /** Optional. Source code location information associated with the log entry, if any. */
  sourceLocation?: V2LogEntrySourceLocation;
  /** Optional. Information about the HTTP request associated with this log entry, if applicable. */
  httpRequest?: V2HttpRequest;
  /** The log entry payload, represented as a Unicode string (UTF-8). */
  textPayload?: string;
  /** A unique ID for the log entry used for deduplication. If omitted, the implementation will generate one based on operation_id. */
  insertId?: string;
  /** The severity of the log entry. The default value is `LogSeverity.DEFAULT`. */
  severity?:
    | "DEFAULT"
    | "DEBUG"
    | "INFO"
    | "NOTICE"
    | "WARNING"
    | "ERROR"
    | "CRITICAL"
    | "ALERT"
    | "EMERGENCY"
    | (string & {});
  /** The log entry payload, represented as a protocol buffer that is expressed as a JSON object. The only accepted type currently is AuditLog. */
  protoPayload?: Record<string, unknown>;
  /** A set of user-defined (key, value) data that provides additional information about the moniotored resource that the log entry belongs to. */
  monitoredResourceLabels?: Record<string, string>;
  /** Optional. Information about an operation associated with the log entry, if applicable. */
  operation?: V2LogEntryOperation;
  /** A set of user-defined (key, value) data that provides additional information about the log entry. */
  labels?: Record<string, string>;
}

export const V2LogEntry: Schema.Schema<V2LogEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      timestamp: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      trace: Schema.optional(Schema.String),
      structPayload: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      sourceLocation: Schema.optional(V2LogEntrySourceLocation),
      httpRequest: Schema.optional(V2HttpRequest),
      textPayload: Schema.optional(Schema.String),
      insertId: Schema.optional(Schema.String),
      severity: Schema.optional(Schema.String),
      protoPayload: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      monitoredResourceLabels: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      operation: Schema.optional(V2LogEntryOperation),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({ identifier: "V2LogEntry" }) as any as Schema.Schema<V2LogEntry>;

export interface ReportRequest {
  /** Describes the list of operations to be reported. Each operation is represented as an AttributeContext, and contains all attributes around an API access. */
  operations?: Array<AttributeContext>;
  /** Specifies the version of the service configuration that should be used to process the request. Must not be empty. Set this field to 'latest' to specify using the latest configuration. */
  serviceConfigId?: string;
}

export const ReportRequest: Schema.Schema<ReportRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      operations: Schema.optional(Schema.Array(AttributeContext)),
      serviceConfigId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ReportRequest",
  }) as any as Schema.Schema<ReportRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ReportServicesRequest {
  /** The service name as specified in its service configuration. For example, `"pubsub.googleapis.com"`. See [google.api.Service](https://cloud.google.com/service-management/reference/rpc/google.api#google.api.Service) for the definition of a service name. */
  serviceName: string;
  /** Request body */
  body?: ReportRequest;
}

export const ReportServicesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  serviceName: Schema.String.pipe(T.HttpPath("serviceName")),
  body: Schema.optional(ReportRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2/services/{serviceName}:report",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ReportServicesRequest>;

export type ReportServicesResponse = ReportResponse;
export const ReportServicesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ReportResponse;

export type ReportServicesError = DefaultErrors;

/** This method provides telemetry reporting for services that are integrated with [Service Infrastructure](https://cloud.google.com/service-infrastructure). It reports a list of operations that have occurred on a service. It must be called after the operations have been executed. For more information, see [Telemetry Reporting](https://cloud.google.com/service-infrastructure/docs/telemetry-reporting). NOTE: The telemetry reporting has a hard limit of 100 operations and 1MB per Report call. This method requires the `servicemanagement.services.report` permission on the specified service. For more information, see [Service Control API Access Control](https://cloud.google.com/service-infrastructure/docs/service-control/access-control). */
export const reportServices: API.OperationMethod<
  ReportServicesRequest,
  ReportServicesResponse,
  ReportServicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ReportServicesRequest,
  output: ReportServicesResponse,
  errors: [],
}));

export interface CheckServicesRequest {
  /** The service name as specified in its service configuration. For example, `"pubsub.googleapis.com"`. See [google.api.Service](https://cloud.google.com/service-management/reference/rpc/google.api#google.api.Service) for the definition of a service name. */
  serviceName: string;
  /** Request body */
  body?: CheckRequest;
}

export const CheckServicesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  serviceName: Schema.String.pipe(T.HttpPath("serviceName")),
  body: Schema.optional(CheckRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v2/services/{serviceName}:check",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CheckServicesRequest>;

export type CheckServicesResponse = CheckResponse;
export const CheckServicesResponse = /*@__PURE__*/ /*#__PURE__*/ CheckResponse;

export type CheckServicesError = DefaultErrors;

/** This method provides admission control for services that are integrated with [Service Infrastructure](https://cloud.google.com/service-infrastructure). It checks whether an operation should be allowed based on the service configuration and relevant policies. It must be called before the operation is executed. For more information, see [Admission Control](https://cloud.google.com/service-infrastructure/docs/admission-control). NOTE: The admission control has an expected policy propagation delay of 60s. The caller **must** not depend on the most recent policy changes. NOTE: The admission control has a hard limit of 1 referenced resources per call. If an operation refers to more than 1 resources, the caller must call the Check method multiple times. This method requires the `servicemanagement.services.check` permission on the specified service. For more information, see [Service Control API Access Control](https://cloud.google.com/service-infrastructure/docs/service-control/access-control). */
export const checkServices: API.OperationMethod<
  CheckServicesRequest,
  CheckServicesResponse,
  CheckServicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CheckServicesRequest,
  output: CheckServicesResponse,
  errors: [],
}));
