// ==========================================================================
// App Engine Admin API (appengine v1alpha)
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
  name: "appengine",
  version: "v1alpha",
  rootUrl: "https://appengine.googleapis.com/",
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
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the name should be a resource name ending with operations/{unique_id}. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is false, it means the operation is still in progress. If true, the operation is completed, and either error or response is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as Delete, the response is google.protobuf.Empty. If the original method is standard Get/Create/Update, the response should be the resource. For other methods, the response should have the type XxxResponse, where Xxx is the original method name. For example, if the original method name is TakeSnapshot(), the inferred response type is TakeSnapshotResponse. */
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

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets ListOperationsRequest.return_partial_success and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      operations: Schema.optional(Schema.Array(Operation)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListOperationsResponse",
  }) as any as Schema.Schema<ListOperationsResponse>;

export interface AuthorizedDomain {
  /** Full path to the AuthorizedDomain resource in the API. Example: apps/myapp/authorizedDomains/example.com.@OutputOnly */
  name?: string;
  /** Fully qualified domain name of the domain authorized for use. Example: example.com. */
  id?: string;
}

export const AuthorizedDomain: Schema.Schema<AuthorizedDomain> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AuthorizedDomain",
  }) as any as Schema.Schema<AuthorizedDomain>;

export interface ListAuthorizedDomainsResponse {
  /** The authorized domains belonging to the user. */
  domains?: Array<AuthorizedDomain>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListAuthorizedDomainsResponse: Schema.Schema<ListAuthorizedDomainsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      domains: Schema.optional(Schema.Array(AuthorizedDomain)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAuthorizedDomainsResponse",
  }) as any as Schema.Schema<ListAuthorizedDomainsResponse>;

export interface CertificateRawData {
  /** PEM encoded x.509 public key certificate. This field is set once on certificate creation. Must include the header and footer. Example: -----BEGIN CERTIFICATE----- -----END CERTIFICATE----- */
  publicCertificate?: string;
  /** Unencrypted PEM encoded RSA private key. This field is set once on certificate creation and then encrypted. The key size must be 2048 bits or fewer. Must include the header and footer. Example: -----BEGIN RSA PRIVATE KEY----- -----END RSA PRIVATE KEY----- @InputOnly */
  privateKey?: string;
}

export const CertificateRawData: Schema.Schema<CertificateRawData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      publicCertificate: Schema.optional(Schema.String),
      privateKey: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CertificateRawData",
  }) as any as Schema.Schema<CertificateRawData>;

export interface ManagedCertificate {
  /** Time at which the certificate was last renewed. The renewal process is fully managed. Certificate renewal will automatically occur before the certificate expires. Renewal errors can be tracked via ManagementStatus.@OutputOnly */
  lastRenewalTime?: string;
  /** Status of certificate management. Refers to the most recent certificate acquisition or renewal attempt.@OutputOnly */
  status?:
    | "UNSPECIFIED_STATUS"
    | "OK"
    | "PENDING"
    | "FAILED_RETRYING_INTERNAL"
    | "FAILED_RETRYING_NOT_VISIBLE"
    | "FAILED_PERMANENTLY_NOT_VISIBLE"
    | "FAILED_RETRYING_CAA_FORBIDDEN"
    | "FAILED_RETRYING_CAA_CHECKING"
    | (string & {});
}

export const ManagedCertificate: Schema.Schema<ManagedCertificate> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lastRenewalTime: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ManagedCertificate",
  }) as any as Schema.Schema<ManagedCertificate>;

export interface AuthorizedCertificate {
  /** Output only. Full path to the AuthorizedCertificate resource in the API. Example: apps/myapp/authorizedCertificates/12345.@OutputOnly */
  name?: string;
  /** Output only. Relative name of the certificate. This is a unique value autogenerated on AuthorizedCertificate resource creation. Example: 12345.@OutputOnly */
  id?: string;
  /** The user-specified display name of the certificate. This is not guaranteed to be unique. Example: My Certificate. */
  displayName?: string;
  /** Output only. Topmost applicable domains of this certificate. This certificate applies to these domains and their subdomains. Example: example.com.@OutputOnly */
  domainNames?: Array<string>;
  /** The time when this certificate expires. To update the renewal time on this certificate, upload an SSL certificate with a different expiration time using AuthorizedCertificates.UpdateAuthorizedCertificate.@OutputOnly */
  expireTime?: string;
  /** The SSL certificate serving the AuthorizedCertificate resource. This must be obtained independently from a certificate authority. */
  certificateRawData?: CertificateRawData;
  /** Only applicable if this certificate is managed by App Engine. Managed certificates are tied to the lifecycle of a DomainMapping and cannot be updated or deleted via the AuthorizedCertificates API. If this certificate is manually administered by the user, this field will be empty.@OutputOnly */
  managedCertificate?: ManagedCertificate;
  /** Output only. The full paths to user visible Domain Mapping resources that have this certificate mapped. Example: apps/myapp/domainMappings/example.com.This may not represent the full list of mapped domain mappings if the user does not have VIEWER permissions on all of the applications that have this certificate mapped. See domain_mappings_count for a complete count.Only returned by GET or LIST requests when specifically requested by the view=FULL_CERTIFICATE option.@OutputOnly */
  visibleDomainMappings?: Array<string>;
  /** Aggregate count of the domain mappings with this certificate mapped. This count includes domain mappings on applications for which the user does not have VIEWER permissions.Only returned by GET or LIST requests when specifically requested by the view=FULL_CERTIFICATE option.@OutputOnly */
  domainMappingsCount?: number;
}

export const AuthorizedCertificate: Schema.Schema<AuthorizedCertificate> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      domainNames: Schema.optional(Schema.Array(Schema.String)),
      expireTime: Schema.optional(Schema.String),
      certificateRawData: Schema.optional(CertificateRawData),
      managedCertificate: Schema.optional(ManagedCertificate),
      visibleDomainMappings: Schema.optional(Schema.Array(Schema.String)),
      domainMappingsCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "AuthorizedCertificate",
  }) as any as Schema.Schema<AuthorizedCertificate>;

export interface ListAuthorizedCertificatesResponse {
  /** The SSL certificates the user is authorized to administer. */
  certificates?: Array<AuthorizedCertificate>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListAuthorizedCertificatesResponse: Schema.Schema<ListAuthorizedCertificatesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      certificates: Schema.optional(Schema.Array(AuthorizedCertificate)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListAuthorizedCertificatesResponse",
  }) as any as Schema.Schema<ListAuthorizedCertificatesResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface SslSettings {
  /** ID of the AuthorizedCertificate resource configuring SSL for the application. Clearing this field will remove SSL support.By default, a managed certificate is automatically created for every domain mapping. To omit SSL support or to configure SSL manually, specify no_managed_certificate on a CREATE or UPDATE request. You must be authorized to administer the AuthorizedCertificate resource to manually map it to a DomainMapping resource. Example: 12345. */
  certificateId?: string;
  /** Output only. Whether the mapped certificate is an App Engine managed certificate. Managed certificates are created by default with a domain mapping. To opt out, specify no_managed_certificate on a CREATE or UPDATE request.@OutputOnly */
  isManagedCertificate?: boolean;
}

export const SslSettings: Schema.Schema<SslSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      certificateId: Schema.optional(Schema.String),
      isManagedCertificate: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "SslSettings",
  }) as any as Schema.Schema<SslSettings>;

export interface ResourceRecord {
  /** Relative name of the object affected by this record. Only applicable for CNAME records. Example: 'www'. */
  name?: string;
  /** Data for this record. Values vary by record type, as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1). */
  rrdata?: string;
  /** Resource record type. Example: AAAA. */
  type?: "A" | "AAAA" | "CNAME" | (string & {});
}

export const ResourceRecord: Schema.Schema<ResourceRecord> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      rrdata: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ResourceRecord",
  }) as any as Schema.Schema<ResourceRecord>;

export interface DomainMapping {
  /** Output only. Full path to the DomainMapping resource in the API. Example: apps/myapp/domainMapping/example.com.@OutputOnly */
  name?: string;
  /** Relative name of the domain serving the application. Example: example.com. */
  id?: string;
  /** SSL configuration for this domain. If unconfigured, this domain will not serve with SSL. */
  sslSettings?: SslSettings;
  /** Output only. The resource records required to configure this domain mapping. These records must be added to the domain's DNS configuration in order to serve the application via this domain mapping.@OutputOnly */
  resourceRecords?: Array<ResourceRecord>;
}

export const DomainMapping: Schema.Schema<DomainMapping> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      sslSettings: Schema.optional(SslSettings),
      resourceRecords: Schema.optional(Schema.Array(ResourceRecord)),
    }),
  ).annotate({
    identifier: "DomainMapping",
  }) as any as Schema.Schema<DomainMapping>;

export interface ListDomainMappingsResponse {
  /** The domain mappings for the application. */
  domainMappings?: Array<DomainMapping>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListDomainMappingsResponse: Schema.Schema<ListDomainMappingsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      domainMappings: Schema.optional(Schema.Array(DomainMapping)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListDomainMappingsResponse",
  }) as any as Schema.Schema<ListDomainMappingsResponse>;

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: "projects/example-project/locations/us-east1" */
  name?: string;
  /** The canonical id for this location. For example: "us-east1". */
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

export interface LocationMetadata {
  /** App Engine standard environment is available in the given location.@OutputOnly */
  standardEnvironmentAvailable?: boolean;
  /** App Engine flexible environment is available in the given location.@OutputOnly */
  flexibleEnvironmentAvailable?: boolean;
  /** Output only. Search API (https://cloud.google.com/appengine/docs/standard/python/search) is available in the given location. */
  searchApiAvailable?: boolean;
}

export const LocationMetadata: Schema.Schema<LocationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      standardEnvironmentAvailable: Schema.optional(Schema.Boolean),
      flexibleEnvironmentAvailable: Schema.optional(Schema.Boolean),
      searchApiAvailable: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "LocationMetadata",
  }) as any as Schema.Schema<LocationMetadata>;

export interface CreateVersionMetadataV1 {
  /** The Cloud Build ID if one was created as part of the version create. @OutputOnly */
  cloudBuildId?: string;
}

export const CreateVersionMetadataV1: Schema.Schema<CreateVersionMetadataV1> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cloudBuildId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateVersionMetadataV1",
  }) as any as Schema.Schema<CreateVersionMetadataV1>;

export interface OperationMetadataV1 {
  /** API method that initiated this operation. Example: google.appengine.v1.Versions.CreateVersion.@OutputOnly */
  method?: string;
  /** Time that this operation was created.@OutputOnly */
  insertTime?: string;
  /** Time that this operation completed.@OutputOnly */
  endTime?: string;
  /** User who requested this operation.@OutputOnly */
  user?: string;
  /** Name of the resource that this operation is acting on. Example: apps/myapp/services/default.@OutputOnly */
  target?: string;
  /** Ephemeral message that may change every time the operation is polled. @OutputOnly */
  ephemeralMessage?: string;
  /** Durable messages that persist on every operation poll. @OutputOnly */
  warning?: Array<string>;
  createVersionMetadata?: CreateVersionMetadataV1;
}

export const OperationMetadataV1: Schema.Schema<OperationMetadataV1> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      method: Schema.optional(Schema.String),
      insertTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      user: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      ephemeralMessage: Schema.optional(Schema.String),
      warning: Schema.optional(Schema.Array(Schema.String)),
      createVersionMetadata: Schema.optional(CreateVersionMetadataV1),
    }),
  ).annotate({
    identifier: "OperationMetadataV1",
  }) as any as Schema.Schema<OperationMetadataV1>;

export interface CreateVersionMetadataV1Alpha {
  /** The Cloud Build ID if one was created as part of the version create. @OutputOnly */
  cloudBuildId?: string;
}

export const CreateVersionMetadataV1Alpha: Schema.Schema<CreateVersionMetadataV1Alpha> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cloudBuildId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateVersionMetadataV1Alpha",
  }) as any as Schema.Schema<CreateVersionMetadataV1Alpha>;

export interface OperationMetadataV1Alpha {
  /** API method that initiated this operation. Example: google.appengine.v1alpha.Versions.CreateVersion.@OutputOnly */
  method?: string;
  /** Time that this operation was created.@OutputOnly */
  insertTime?: string;
  /** Time that this operation completed.@OutputOnly */
  endTime?: string;
  /** User who requested this operation.@OutputOnly */
  user?: string;
  /** Name of the resource that this operation is acting on. Example: apps/myapp/services/default.@OutputOnly */
  target?: string;
  /** Ephemeral message that may change every time the operation is polled. @OutputOnly */
  ephemeralMessage?: string;
  /** Durable messages that persist on every operation poll. @OutputOnly */
  warning?: Array<string>;
  createVersionMetadata?: CreateVersionMetadataV1Alpha;
}

export const OperationMetadataV1Alpha: Schema.Schema<OperationMetadataV1Alpha> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      method: Schema.optional(Schema.String),
      insertTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      user: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      ephemeralMessage: Schema.optional(Schema.String),
      warning: Schema.optional(Schema.Array(Schema.String)),
      createVersionMetadata: Schema.optional(CreateVersionMetadataV1Alpha),
    }),
  ).annotate({
    identifier: "OperationMetadataV1Alpha",
  }) as any as Schema.Schema<OperationMetadataV1Alpha>;

export interface GoogleAppengineV1betaLocationMetadata {
  /** App Engine standard environment is available in the given location.@OutputOnly */
  standardEnvironmentAvailable?: boolean;
  /** App Engine flexible environment is available in the given location.@OutputOnly */
  flexibleEnvironmentAvailable?: boolean;
  /** Output only. Search API (https://cloud.google.com/appengine/docs/standard/python/search) is available in the given location. */
  searchApiAvailable?: boolean;
}

export const GoogleAppengineV1betaLocationMetadata: Schema.Schema<GoogleAppengineV1betaLocationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      standardEnvironmentAvailable: Schema.optional(Schema.Boolean),
      flexibleEnvironmentAvailable: Schema.optional(Schema.Boolean),
      searchApiAvailable: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleAppengineV1betaLocationMetadata",
  }) as any as Schema.Schema<GoogleAppengineV1betaLocationMetadata>;

export interface CreateVersionMetadataV1Beta {
  /** The Cloud Build ID if one was created as part of the version create. @OutputOnly */
  cloudBuildId?: string;
}

export const CreateVersionMetadataV1Beta: Schema.Schema<CreateVersionMetadataV1Beta> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cloudBuildId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateVersionMetadataV1Beta",
  }) as any as Schema.Schema<CreateVersionMetadataV1Beta>;

export interface OperationMetadataV1Beta {
  /** API method that initiated this operation. Example: google.appengine.v1beta.Versions.CreateVersion.@OutputOnly */
  method?: string;
  /** Time that this operation was created.@OutputOnly */
  insertTime?: string;
  /** Time that this operation completed.@OutputOnly */
  endTime?: string;
  /** User who requested this operation.@OutputOnly */
  user?: string;
  /** Name of the resource that this operation is acting on. Example: apps/myapp/services/default.@OutputOnly */
  target?: string;
  /** Ephemeral message that may change every time the operation is polled. @OutputOnly */
  ephemeralMessage?: string;
  /** Durable messages that persist on every operation poll. @OutputOnly */
  warning?: Array<string>;
  createVersionMetadata?: CreateVersionMetadataV1Beta;
}

export const OperationMetadataV1Beta: Schema.Schema<OperationMetadataV1Beta> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      method: Schema.optional(Schema.String),
      insertTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      user: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      ephemeralMessage: Schema.optional(Schema.String),
      warning: Schema.optional(Schema.Array(Schema.String)),
      createVersionMetadata: Schema.optional(CreateVersionMetadataV1Beta),
    }),
  ).annotate({
    identifier: "OperationMetadataV1Beta",
  }) as any as Schema.Schema<OperationMetadataV1Beta>;

export interface GceTag {
  /** The administrative_tag name. */
  tag?: string;
  /** The parents(s) of the tag. Eg. projects/123, folders/456 It usually contains only one parent. But, in some corner cases, it can contain multiple parents. Currently, organizations are not supported. */
  parent?: Array<string>;
}

export const GceTag: Schema.Schema<GceTag> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tag: Schema.optional(Schema.String),
      parent: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({ identifier: "GceTag" }) as any as Schema.Schema<GceTag>;

export interface ProjectsMetadata {
  /** The tenant project number. */
  tenantProjectNumber?: string;
  /** The tenant project id. */
  tenantProjectId?: string;
  /** The service account authorized to operate on the consumer project. Note: CCFE only propagates P4SA with default tag to CLH. */
  p4ServiceAccount?: string;
  /** The producer project id. */
  producerProjectId?: string;
  /** The producer project number. */
  producerProjectNumber?: string;
  /** The consumer project id. */
  consumerProjectId?: string;
  /** The consumer project number. */
  consumerProjectNumber?: string;
  /** The CCFE state of the consumer project. It is the same state that is communicated to the CLH during project events. Notice that this field is not set in the DB, it is only set in this proto when communicated to CLH in the side channel. */
  consumerProjectState?:
    | "UNKNOWN_STATE"
    | "ON"
    | "OFF"
    | "DELETED"
    | (string & {});
  /** The GCE tags associated with the consumer project and those inherited due to their ancestry, if any. Not supported by CCFE. */
  gceTag?: Array<GceTag>;
  /** DEPRECATED: Indicates whether the GCE project is in the DEPROVISIONING state. This field is a temporary workaround (see b/475310865) to allow GCE extensions to bypass certain checks during deprovisioning. It will be replaced by a permanent solution in the future. */
  isGceProjectDeprovisioning?: boolean;
}

export const ProjectsMetadata: Schema.Schema<ProjectsMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tenantProjectNumber: Schema.optional(Schema.String),
      tenantProjectId: Schema.optional(Schema.String),
      p4ServiceAccount: Schema.optional(Schema.String),
      producerProjectId: Schema.optional(Schema.String),
      producerProjectNumber: Schema.optional(Schema.String),
      consumerProjectId: Schema.optional(Schema.String),
      consumerProjectNumber: Schema.optional(Schema.String),
      consumerProjectState: Schema.optional(Schema.String),
      gceTag: Schema.optional(Schema.Array(GceTag)),
      isGceProjectDeprovisioning: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ProjectsMetadata",
  }) as any as Schema.Schema<ProjectsMetadata>;

export interface Reasons {
  serviceManagement?:
    | "SERVICE_MANAGEMENT_UNKNOWN_REASON"
    | "SERVICE_MANAGEMENT_CONTROL_PLANE_SYNC"
    | "ACTIVATION"
    | "PREPARE_DEACTIVATION"
    | "ABORT_DEACTIVATION"
    | "COMMIT_DEACTIVATION"
    | (string & {});
  dataGovernance?:
    | "DATA_GOVERNANCE_UNKNOWN_REASON"
    | "DATA_GOVERNANCE_CONTROL_PLANE_SYNC"
    | "HIDE"
    | "UNHIDE"
    | "PURGE"
    | (string & {});
  abuse?:
    | "ABUSE_UNKNOWN_REASON"
    | "ABUSE_CONTROL_PLANE_SYNC"
    | "SUSPEND"
    | "REINSTATE"
    | (string & {});
  billing?:
    | "BILLING_UNKNOWN_REASON"
    | "BILLING_CONTROL_PLANE_SYNC"
    | "PROBATION"
    | "CLOSE"
    | "OPEN"
    | (string & {});
  /** Consumer Container denotes if the service is active within a project or not. This information could be used to clean up resources in case service in DISABLED_FULL i.e. Service is inactive > 30 days. */
  serviceActivation?:
    | "SERVICE_ACTIVATION_STATUS_UNSPECIFIED"
    | "SERVICE_ACTIVATION_ENABLED"
    | "SERVICE_ACTIVATION_DISABLED"
    | "SERVICE_ACTIVATION_DISABLED_FULL"
    | "SERVICE_ACTIVATION_UNKNOWN_REASON"
    | (string & {});
}

export const Reasons: Schema.Schema<Reasons> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      serviceManagement: Schema.optional(Schema.String),
      dataGovernance: Schema.optional(Schema.String),
      abuse: Schema.optional(Schema.String),
      billing: Schema.optional(Schema.String),
      serviceActivation: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Reasons" }) as any as Schema.Schema<Reasons>;

export interface ContainerState {
  /** The current state of the container. This state is the culmination of all of the opinions from external systems that CCFE knows about of the container. */
  state?: "UNKNOWN_STATE" | "ON" | "OFF" | "DELETED" | (string & {});
  /** The previous and current reasons for a container state will be sent for a container event. CLHs that need to know the signal that caused the container event to trigger (edges) as opposed to just knowing the state can act upon differences in the previous and current reasons.Reasons will be provided for every system: service management, data governance, abuse, and billing.If this is a CCFE-triggered event used for reconciliation then the current reasons will be set to their *_CONTROL_PLANE_SYNC state. The previous reasons will contain the last known set of non-unknown non-control_plane_sync reasons for the state. */
  previousReasons?: Reasons;
  currentReasons?: Reasons;
}

export const ContainerState: Schema.Schema<ContainerState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      previousReasons: Schema.optional(Reasons),
      currentReasons: Schema.optional(Reasons),
    }),
  ).annotate({
    identifier: "ContainerState",
  }) as any as Schema.Schema<ContainerState>;

export interface ProjectEvent {
  /** The unique ID for this project event. CLHs can use this value to dedup repeated calls. required */
  eventId?: string;
  /** The projects metadata for this project. required */
  projectMetadata?: ProjectsMetadata;
  /** Phase indicates when in the container event propagation this event is being communicated. Events are sent before and after the per-resource events are propagated. required */
  phase?:
    | "CONTAINER_EVENT_PHASE_UNSPECIFIED"
    | "BEFORE_RESOURCE_HANDLING"
    | "AFTER_RESOURCE_HANDLING"
    | (string & {});
  /** The state of the organization that led to this event. */
  state?: ContainerState;
}

export const ProjectEvent: Schema.Schema<ProjectEvent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      eventId: Schema.optional(Schema.String),
      projectMetadata: Schema.optional(ProjectsMetadata),
      phase: Schema.optional(Schema.String),
      state: Schema.optional(ContainerState),
    }),
  ).annotate({
    identifier: "ProjectEvent",
  }) as any as Schema.Schema<ProjectEvent>;

export interface ResourceEvent {
  /** The name of the resource for which this event is. required */
  name?: string;
  /** The unique ID for this per-resource event. CLHs can use this value to dedup repeated calls. required */
  eventId?: string;
  /** The state of the project that led to this event. */
  state?: ContainerState;
}

export const ResourceEvent: Schema.Schema<ResourceEvent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      eventId: Schema.optional(Schema.String),
      state: Schema.optional(ContainerState),
    }),
  ).annotate({
    identifier: "ResourceEvent",
  }) as any as Schema.Schema<ResourceEvent>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListAppsOperationsRequest {
  /** Part of `name`. The name of the operation's parent resource. */
  appsId: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.This can only be true when reading across collections. For example, when parent is set to "projects/example/locations/-".This field is not supported by default and will result in an UNIMPLEMENTED error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListAppsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    appsId: Schema.String.pipe(T.HttpPath("appsId")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "v1alpha/apps/{appsId}/operations" }),
    svc,
  ) as unknown as Schema.Schema<ListAppsOperationsRequest>;

export type ListAppsOperationsResponse = ListOperationsResponse;
export const ListAppsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListOperationsResponse;

export type ListAppsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED. */
export const listAppsOperations: API.PaginatedOperationMethod<
  ListAppsOperationsRequest,
  ListAppsOperationsResponse,
  ListAppsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAppsOperationsRequest,
  output: ListAppsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetAppsOperationsRequest {
  /** Part of `name`. The name of the operation resource. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  operationsId: string;
}

export const GetAppsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    appsId: Schema.String.pipe(T.HttpPath("appsId")),
    operationsId: Schema.String.pipe(T.HttpPath("operationsId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/apps/{appsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAppsOperationsRequest>;

export type GetAppsOperationsResponse = Operation;
export const GetAppsOperationsResponse = /*@__PURE__*/ /*#__PURE__*/ Operation;

export type GetAppsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getAppsOperations: API.OperationMethod<
  GetAppsOperationsRequest,
  GetAppsOperationsResponse,
  GetAppsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAppsOperationsRequest,
  output: GetAppsOperationsResponse,
  errors: [],
}));

export interface ListAppsAuthorizedDomainsRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  appsId: string;
  /** Maximum results to return per page. */
  pageSize?: number;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAppsAuthorizedDomainsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    appsId: Schema.String.pipe(T.HttpPath("appsId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v1alpha/apps/{appsId}/authorizedDomains" }),
    svc,
  ) as unknown as Schema.Schema<ListAppsAuthorizedDomainsRequest>;

export type ListAppsAuthorizedDomainsResponse = ListAuthorizedDomainsResponse;
export const ListAppsAuthorizedDomainsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAuthorizedDomainsResponse;

export type ListAppsAuthorizedDomainsError = DefaultErrors;

/** Lists all domains the user is authorized to administer. */
export const listAppsAuthorizedDomains: API.PaginatedOperationMethod<
  ListAppsAuthorizedDomainsRequest,
  ListAppsAuthorizedDomainsResponse,
  ListAppsAuthorizedDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAppsAuthorizedDomainsRequest,
  output: ListAppsAuthorizedDomainsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListAppsAuthorizedCertificatesRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  appsId: string;
  /** Controls the set of fields returned in the LIST response. */
  view?: "BASIC_CERTIFICATE" | "FULL_CERTIFICATE" | (string & {});
  /** Maximum results to return per page. */
  pageSize?: number;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAppsAuthorizedCertificatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    appsId: Schema.String.pipe(T.HttpPath("appsId")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/apps/{appsId}/authorizedCertificates",
    }),
    svc,
  ) as unknown as Schema.Schema<ListAppsAuthorizedCertificatesRequest>;

export type ListAppsAuthorizedCertificatesResponse =
  ListAuthorizedCertificatesResponse;
export const ListAppsAuthorizedCertificatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAuthorizedCertificatesResponse;

export type ListAppsAuthorizedCertificatesError = DefaultErrors;

/** Lists all SSL certificates the user is authorized to administer. */
export const listAppsAuthorizedCertificates: API.PaginatedOperationMethod<
  ListAppsAuthorizedCertificatesRequest,
  ListAppsAuthorizedCertificatesResponse,
  ListAppsAuthorizedCertificatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAppsAuthorizedCertificatesRequest,
  output: ListAppsAuthorizedCertificatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetAppsAuthorizedCertificatesRequest {
  /** Part of `name`. Required. Name of the resource requested. Example: apps/myapp/authorizedCertificates/12345. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  authorizedCertificatesId: string;
  /** Controls the set of fields returned in the GET response. */
  view?: "BASIC_CERTIFICATE" | "FULL_CERTIFICATE" | (string & {});
}

export const GetAppsAuthorizedCertificatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    appsId: Schema.String.pipe(T.HttpPath("appsId")),
    authorizedCertificatesId: Schema.String.pipe(
      T.HttpPath("authorizedCertificatesId"),
    ),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/apps/{appsId}/authorizedCertificates/{authorizedCertificatesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAppsAuthorizedCertificatesRequest>;

export type GetAppsAuthorizedCertificatesResponse = AuthorizedCertificate;
export const GetAppsAuthorizedCertificatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ AuthorizedCertificate;

export type GetAppsAuthorizedCertificatesError = DefaultErrors;

/** Gets the specified SSL certificate. */
export const getAppsAuthorizedCertificates: API.OperationMethod<
  GetAppsAuthorizedCertificatesRequest,
  GetAppsAuthorizedCertificatesResponse,
  GetAppsAuthorizedCertificatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAppsAuthorizedCertificatesRequest,
  output: GetAppsAuthorizedCertificatesResponse,
  errors: [],
}));

export interface CreateAppsAuthorizedCertificatesRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  appsId: string;
  /** Request body */
  body?: AuthorizedCertificate;
}

export const CreateAppsAuthorizedCertificatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    appsId: Schema.String.pipe(T.HttpPath("appsId")),
    body: Schema.optional(AuthorizedCertificate).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/apps/{appsId}/authorizedCertificates",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAppsAuthorizedCertificatesRequest>;

export type CreateAppsAuthorizedCertificatesResponse = AuthorizedCertificate;
export const CreateAppsAuthorizedCertificatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ AuthorizedCertificate;

export type CreateAppsAuthorizedCertificatesError = DefaultErrors;

/** Uploads the specified SSL certificate. */
export const createAppsAuthorizedCertificates: API.OperationMethod<
  CreateAppsAuthorizedCertificatesRequest,
  CreateAppsAuthorizedCertificatesResponse,
  CreateAppsAuthorizedCertificatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAppsAuthorizedCertificatesRequest,
  output: CreateAppsAuthorizedCertificatesResponse,
  errors: [],
}));

export interface PatchAppsAuthorizedCertificatesRequest {
  /** Part of `name`. Required. Name of the resource to update. Example: apps/myapp/authorizedCertificates/12345. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  authorizedCertificatesId: string;
  /** Standard field mask for the set of fields to be updated. Updates are only supported on the certificate_raw_data and display_name fields. */
  updateMask?: string;
  /** Request body */
  body?: AuthorizedCertificate;
}

export const PatchAppsAuthorizedCertificatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    appsId: Schema.String.pipe(T.HttpPath("appsId")),
    authorizedCertificatesId: Schema.String.pipe(
      T.HttpPath("authorizedCertificatesId"),
    ),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(AuthorizedCertificate).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1alpha/apps/{appsId}/authorizedCertificates/{authorizedCertificatesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchAppsAuthorizedCertificatesRequest>;

export type PatchAppsAuthorizedCertificatesResponse = AuthorizedCertificate;
export const PatchAppsAuthorizedCertificatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ AuthorizedCertificate;

export type PatchAppsAuthorizedCertificatesError = DefaultErrors;

/** Updates the specified SSL certificate. To renew a certificate and maintain its existing domain mappings, update certificate_data with a new certificate. The new certificate must be applicable to the same domains as the original certificate. The certificate display_name may also be updated. */
export const patchAppsAuthorizedCertificates: API.OperationMethod<
  PatchAppsAuthorizedCertificatesRequest,
  PatchAppsAuthorizedCertificatesResponse,
  PatchAppsAuthorizedCertificatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAppsAuthorizedCertificatesRequest,
  output: PatchAppsAuthorizedCertificatesResponse,
  errors: [],
}));

export interface DeleteAppsAuthorizedCertificatesRequest {
  /** Part of `name`. Required. Name of the resource to delete. Example: apps/myapp/authorizedCertificates/12345. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  authorizedCertificatesId: string;
}

export const DeleteAppsAuthorizedCertificatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    appsId: Schema.String.pipe(T.HttpPath("appsId")),
    authorizedCertificatesId: Schema.String.pipe(
      T.HttpPath("authorizedCertificatesId"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha/apps/{appsId}/authorizedCertificates/{authorizedCertificatesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteAppsAuthorizedCertificatesRequest>;

export type DeleteAppsAuthorizedCertificatesResponse = Empty;
export const DeleteAppsAuthorizedCertificatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteAppsAuthorizedCertificatesError = DefaultErrors;

/** Deletes the specified SSL certificate. */
export const deleteAppsAuthorizedCertificates: API.OperationMethod<
  DeleteAppsAuthorizedCertificatesRequest,
  DeleteAppsAuthorizedCertificatesResponse,
  DeleteAppsAuthorizedCertificatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAppsAuthorizedCertificatesRequest,
  output: DeleteAppsAuthorizedCertificatesResponse,
  errors: [],
}));

export interface ListAppsDomainMappingsRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  appsId: string;
  /** Maximum results to return per page. */
  pageSize?: number;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAppsDomainMappingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    appsId: Schema.String.pipe(T.HttpPath("appsId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v1alpha/apps/{appsId}/domainMappings" }),
    svc,
  ) as unknown as Schema.Schema<ListAppsDomainMappingsRequest>;

export type ListAppsDomainMappingsResponse = ListDomainMappingsResponse;
export const ListAppsDomainMappingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListDomainMappingsResponse;

export type ListAppsDomainMappingsError = DefaultErrors;

/** Lists the domain mappings on an application. */
export const listAppsDomainMappings: API.PaginatedOperationMethod<
  ListAppsDomainMappingsRequest,
  ListAppsDomainMappingsResponse,
  ListAppsDomainMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAppsDomainMappingsRequest,
  output: ListAppsDomainMappingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetAppsDomainMappingsRequest {
  /** Part of `name`. Required. Name of the resource requested. Example: apps/myapp/domainMappings/example.com. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  domainMappingsId: string;
}

export const GetAppsDomainMappingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    appsId: Schema.String.pipe(T.HttpPath("appsId")),
    domainMappingsId: Schema.String.pipe(T.HttpPath("domainMappingsId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/apps/{appsId}/domainMappings/{domainMappingsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAppsDomainMappingsRequest>;

export type GetAppsDomainMappingsResponse = DomainMapping;
export const GetAppsDomainMappingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ DomainMapping;

export type GetAppsDomainMappingsError = DefaultErrors;

/** Gets the specified domain mapping. */
export const getAppsDomainMappings: API.OperationMethod<
  GetAppsDomainMappingsRequest,
  GetAppsDomainMappingsResponse,
  GetAppsDomainMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAppsDomainMappingsRequest,
  output: GetAppsDomainMappingsResponse,
  errors: [],
}));

export interface CreateAppsDomainMappingsRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  appsId: string;
  /** Whether a managed certificate should be provided by App Engine. If true, a certificate ID must be manaually set in the DomainMapping resource to configure SSL for this domain. If false, a managed certificate will be provisioned and a certificate ID will be automatically populated. */
  noManagedCertificate?: boolean;
  /** Whether the domain creation should override any existing mappings for this domain. By default, overrides are rejected. */
  overrideStrategy?:
    | "UNSPECIFIED_DOMAIN_OVERRIDE_STRATEGY"
    | "STRICT"
    | "OVERRIDE"
    | (string & {});
  /** Request body */
  body?: DomainMapping;
}

export const CreateAppsDomainMappingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    appsId: Schema.String.pipe(T.HttpPath("appsId")),
    noManagedCertificate: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("noManagedCertificate"),
    ),
    overrideStrategy: Schema.optional(Schema.String).pipe(
      T.HttpQuery("overrideStrategy"),
    ),
    body: Schema.optional(DomainMapping).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/apps/{appsId}/domainMappings",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateAppsDomainMappingsRequest>;

export type CreateAppsDomainMappingsResponse = Operation;
export const CreateAppsDomainMappingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateAppsDomainMappingsError = DefaultErrors;

/** Maps a domain to an application. A user must be authorized to administer a domain in order to map it to an application. For a list of available authorized domains, see AuthorizedDomains.ListAuthorizedDomains. */
export const createAppsDomainMappings: API.OperationMethod<
  CreateAppsDomainMappingsRequest,
  CreateAppsDomainMappingsResponse,
  CreateAppsDomainMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAppsDomainMappingsRequest,
  output: CreateAppsDomainMappingsResponse,
  errors: [],
}));

export interface PatchAppsDomainMappingsRequest {
  /** Part of `name`. Required. Name of the resource to update. Example: apps/myapp/domainMappings/example.com. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  domainMappingsId: string;
  /** Required. Standard field mask for the set of fields to be updated. */
  updateMask?: string;
  /** Whether a managed certificate should be provided by App Engine. If true, a certificate ID must be manually set in the DomainMapping resource to configure SSL for this domain. If false, a managed certificate will be provisioned and a certificate ID will be automatically populated. Only applicable if ssl_settings.certificate_id is specified in the update mask. */
  noManagedCertificate?: boolean;
  /** Request body */
  body?: DomainMapping;
}

export const PatchAppsDomainMappingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    appsId: Schema.String.pipe(T.HttpPath("appsId")),
    domainMappingsId: Schema.String.pipe(T.HttpPath("domainMappingsId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    noManagedCertificate: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("noManagedCertificate"),
    ),
    body: Schema.optional(DomainMapping).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1alpha/apps/{appsId}/domainMappings/{domainMappingsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchAppsDomainMappingsRequest>;

export type PatchAppsDomainMappingsResponse = Operation;
export const PatchAppsDomainMappingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchAppsDomainMappingsError = DefaultErrors;

/** Updates the specified domain mapping. To map an SSL certificate to a domain mapping, update certificate_id to point to an AuthorizedCertificate resource. A user must be authorized to administer the associated domain in order to update a DomainMapping resource. */
export const patchAppsDomainMappings: API.OperationMethod<
  PatchAppsDomainMappingsRequest,
  PatchAppsDomainMappingsResponse,
  PatchAppsDomainMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAppsDomainMappingsRequest,
  output: PatchAppsDomainMappingsResponse,
  errors: [],
}));

export interface DeleteAppsDomainMappingsRequest {
  /** Part of `name`. Required. Name of the resource to delete. Example: apps/myapp/domainMappings/example.com. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  domainMappingsId: string;
}

export const DeleteAppsDomainMappingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    appsId: Schema.String.pipe(T.HttpPath("appsId")),
    domainMappingsId: Schema.String.pipe(T.HttpPath("domainMappingsId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha/apps/{appsId}/domainMappings/{domainMappingsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteAppsDomainMappingsRequest>;

export type DeleteAppsDomainMappingsResponse = Operation;
export const DeleteAppsDomainMappingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteAppsDomainMappingsError = DefaultErrors;

/** Deletes the specified domain mapping. A user must be authorized to administer the associated domain in order to delete a DomainMapping resource. */
export const deleteAppsDomainMappings: API.OperationMethod<
  DeleteAppsDomainMappingsRequest,
  DeleteAppsDomainMappingsResponse,
  DeleteAppsDomainMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAppsDomainMappingsRequest,
  output: DeleteAppsDomainMappingsResponse,
  errors: [],
}));

export interface ListAppsLocationsRequest {
  /** Part of `name`. The resource that owns the locations collection, if applicable. */
  appsId: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like "displayName=tokyo", and is documented in more detail in AIP-160 (https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the next_page_token field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListAppsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    appsId: Schema.String.pipe(T.HttpPath("appsId")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("extraLocationTypes"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "v1alpha/apps/{appsId}/locations" }),
    svc,
  ) as unknown as Schema.Schema<ListAppsLocationsRequest>;

export type ListAppsLocationsResponse = ListLocationsResponse;
export const ListAppsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListLocationsResponse;

export type ListAppsLocationsError = DefaultErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: List all public locations: Use the path GET /v1/locations. List project-visible locations: Use the path GET /v1/projects/{project_id}/locations. This may include public locations as well as private or other locations specifically visible to the project. */
export const listAppsLocations: API.PaginatedOperationMethod<
  ListAppsLocationsRequest,
  ListAppsLocationsResponse,
  ListAppsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAppsLocationsRequest,
  output: ListAppsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetAppsLocationsRequest {
  /** Part of `name`. Resource name for the location. */
  appsId: string;
  /** Part of `name`. See documentation of `appsId`. */
  locationsId: string;
}

export const GetAppsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    appsId: Schema.String.pipe(T.HttpPath("appsId")),
    locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/apps/{appsId}/locations/{locationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAppsLocationsRequest>;

export type GetAppsLocationsResponse = Location;
export const GetAppsLocationsResponse = /*@__PURE__*/ /*#__PURE__*/ Location;

export type GetAppsLocationsError = DefaultErrors;

/** Gets information about a location. */
export const getAppsLocations: API.OperationMethod<
  GetAppsLocationsRequest,
  GetAppsLocationsResponse,
  GetAppsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAppsLocationsRequest,
  output: GetAppsLocationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsRequest {
  /** Part of `name`. The resource that owns the locations collection, if applicable. */
  projectsId: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like "displayName=tokyo", and is documented in more detail in AIP-160 (https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the next_page_token field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("extraLocationTypes"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "v1alpha/projects/{projectsId}/locations" }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListLocationsResponse;

export type ListProjectsLocationsError = DefaultErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: List all public locations: Use the path GET /v1/locations. List project-visible locations: Use the path GET /v1/projects/{project_id}/locations. This may include public locations as well as private or other locations specifically visible to the project. */
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
  /** Part of `name`. Resource name for the location. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
}

export const GetProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
    locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}",
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

export interface ListProjectsLocationsOperationsRequest {
  /** Part of `name`. The name of the operation's parent resource. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.This can only be true when reading across collections. For example, when parent is set to "projects/example/locations/-".This field is not supported by default and will result in an UNIMPLEMENTED error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
    locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/operations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListOperationsResponse;

export type ListProjectsLocationsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED. */
export const listProjectsLocationsOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsOperationsRequest,
  ListProjectsLocationsOperationsResponse,
  ListProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsOperationsRequest {
  /** Part of `name`. The name of the operation resource. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  operationsId: string;
}

export const GetProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
    locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
    operationsId: Schema.String.pipe(T.HttpPath("operationsId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
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

export interface ListProjectsLocationsApplicationsAuthorizedDomainsRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  projectsId: string;
  /** Part of `parent`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `parent`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Maximum results to return per page. */
  pageSize?: number;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListProjectsLocationsApplicationsAuthorizedDomainsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
    locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
    applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedDomains",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsApplicationsAuthorizedDomainsRequest>;

export type ListProjectsLocationsApplicationsAuthorizedDomainsResponse =
  ListAuthorizedDomainsResponse;
export const ListProjectsLocationsApplicationsAuthorizedDomainsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAuthorizedDomainsResponse;

export type ListProjectsLocationsApplicationsAuthorizedDomainsError =
  DefaultErrors;

/** Lists all domains the user is authorized to administer. */
export const listProjectsLocationsApplicationsAuthorizedDomains: API.PaginatedOperationMethod<
  ListProjectsLocationsApplicationsAuthorizedDomainsRequest,
  ListProjectsLocationsApplicationsAuthorizedDomainsResponse,
  ListProjectsLocationsApplicationsAuthorizedDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsApplicationsAuthorizedDomainsRequest,
  output: ListProjectsLocationsApplicationsAuthorizedDomainsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsApplicationsAuthorizedCertificatesRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  projectsId: string;
  /** Part of `parent`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `parent`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Controls the set of fields returned in the LIST response. */
  view?: "BASIC_CERTIFICATE" | "FULL_CERTIFICATE" | (string & {});
  /** Maximum results to return per page. */
  pageSize?: number;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListProjectsLocationsApplicationsAuthorizedCertificatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
    locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
    applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedCertificates",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsApplicationsAuthorizedCertificatesRequest>;

export type ListProjectsLocationsApplicationsAuthorizedCertificatesResponse =
  ListAuthorizedCertificatesResponse;
export const ListProjectsLocationsApplicationsAuthorizedCertificatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAuthorizedCertificatesResponse;

export type ListProjectsLocationsApplicationsAuthorizedCertificatesError =
  DefaultErrors;

/** Lists all SSL certificates the user is authorized to administer. */
export const listProjectsLocationsApplicationsAuthorizedCertificates: API.PaginatedOperationMethod<
  ListProjectsLocationsApplicationsAuthorizedCertificatesRequest,
  ListProjectsLocationsApplicationsAuthorizedCertificatesResponse,
  ListProjectsLocationsApplicationsAuthorizedCertificatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsApplicationsAuthorizedCertificatesRequest,
  output: ListProjectsLocationsApplicationsAuthorizedCertificatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsApplicationsAuthorizedCertificatesRequest {
  /** Part of `name`. Required. Name of the resource requested. Example: apps/myapp/authorizedCertificates/12345. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  authorizedCertificatesId: string;
  /** Controls the set of fields returned in the GET response. */
  view?: "BASIC_CERTIFICATE" | "FULL_CERTIFICATE" | (string & {});
}

export const GetProjectsLocationsApplicationsAuthorizedCertificatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
    locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
    applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
    authorizedCertificatesId: Schema.String.pipe(
      T.HttpPath("authorizedCertificatesId"),
    ),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedCertificates/{authorizedCertificatesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsApplicationsAuthorizedCertificatesRequest>;

export type GetProjectsLocationsApplicationsAuthorizedCertificatesResponse =
  AuthorizedCertificate;
export const GetProjectsLocationsApplicationsAuthorizedCertificatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ AuthorizedCertificate;

export type GetProjectsLocationsApplicationsAuthorizedCertificatesError =
  DefaultErrors;

/** Gets the specified SSL certificate. */
export const getProjectsLocationsApplicationsAuthorizedCertificates: API.OperationMethod<
  GetProjectsLocationsApplicationsAuthorizedCertificatesRequest,
  GetProjectsLocationsApplicationsAuthorizedCertificatesResponse,
  GetProjectsLocationsApplicationsAuthorizedCertificatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsApplicationsAuthorizedCertificatesRequest,
  output: GetProjectsLocationsApplicationsAuthorizedCertificatesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsApplicationsAuthorizedCertificatesRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  projectsId: string;
  /** Part of `parent`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `parent`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Request body */
  body?: AuthorizedCertificate;
}

export const CreateProjectsLocationsApplicationsAuthorizedCertificatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
    locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
    applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
    body: Schema.optional(AuthorizedCertificate).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedCertificates",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsApplicationsAuthorizedCertificatesRequest>;

export type CreateProjectsLocationsApplicationsAuthorizedCertificatesResponse =
  AuthorizedCertificate;
export const CreateProjectsLocationsApplicationsAuthorizedCertificatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ AuthorizedCertificate;

export type CreateProjectsLocationsApplicationsAuthorizedCertificatesError =
  DefaultErrors;

/** Uploads the specified SSL certificate. */
export const createProjectsLocationsApplicationsAuthorizedCertificates: API.OperationMethod<
  CreateProjectsLocationsApplicationsAuthorizedCertificatesRequest,
  CreateProjectsLocationsApplicationsAuthorizedCertificatesResponse,
  CreateProjectsLocationsApplicationsAuthorizedCertificatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsApplicationsAuthorizedCertificatesRequest,
  output: CreateProjectsLocationsApplicationsAuthorizedCertificatesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsApplicationsAuthorizedCertificatesRequest {
  /** Part of `name`. Required. Name of the resource to update. Example: apps/myapp/authorizedCertificates/12345. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  authorizedCertificatesId: string;
  /** Standard field mask for the set of fields to be updated. Updates are only supported on the certificate_raw_data and display_name fields. */
  updateMask?: string;
  /** Request body */
  body?: AuthorizedCertificate;
}

export const PatchProjectsLocationsApplicationsAuthorizedCertificatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
    locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
    applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
    authorizedCertificatesId: Schema.String.pipe(
      T.HttpPath("authorizedCertificatesId"),
    ),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(AuthorizedCertificate).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedCertificates/{authorizedCertificatesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsApplicationsAuthorizedCertificatesRequest>;

export type PatchProjectsLocationsApplicationsAuthorizedCertificatesResponse =
  AuthorizedCertificate;
export const PatchProjectsLocationsApplicationsAuthorizedCertificatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ AuthorizedCertificate;

export type PatchProjectsLocationsApplicationsAuthorizedCertificatesError =
  DefaultErrors;

/** Updates the specified SSL certificate. To renew a certificate and maintain its existing domain mappings, update certificate_data with a new certificate. The new certificate must be applicable to the same domains as the original certificate. The certificate display_name may also be updated. */
export const patchProjectsLocationsApplicationsAuthorizedCertificates: API.OperationMethod<
  PatchProjectsLocationsApplicationsAuthorizedCertificatesRequest,
  PatchProjectsLocationsApplicationsAuthorizedCertificatesResponse,
  PatchProjectsLocationsApplicationsAuthorizedCertificatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsApplicationsAuthorizedCertificatesRequest,
  output: PatchProjectsLocationsApplicationsAuthorizedCertificatesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsApplicationsAuthorizedCertificatesRequest {
  /** Part of `name`. Required. Name of the resource to delete. Example: apps/myapp/authorizedCertificates/12345. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  authorizedCertificatesId: string;
}

export const DeleteProjectsLocationsApplicationsAuthorizedCertificatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
    locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
    applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
    authorizedCertificatesId: Schema.String.pipe(
      T.HttpPath("authorizedCertificatesId"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/authorizedCertificates/{authorizedCertificatesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsApplicationsAuthorizedCertificatesRequest>;

export type DeleteProjectsLocationsApplicationsAuthorizedCertificatesResponse =
  Empty;
export const DeleteProjectsLocationsApplicationsAuthorizedCertificatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsApplicationsAuthorizedCertificatesError =
  DefaultErrors;

/** Deletes the specified SSL certificate. */
export const deleteProjectsLocationsApplicationsAuthorizedCertificates: API.OperationMethod<
  DeleteProjectsLocationsApplicationsAuthorizedCertificatesRequest,
  DeleteProjectsLocationsApplicationsAuthorizedCertificatesResponse,
  DeleteProjectsLocationsApplicationsAuthorizedCertificatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsApplicationsAuthorizedCertificatesRequest,
  output: DeleteProjectsLocationsApplicationsAuthorizedCertificatesResponse,
  errors: [],
}));

export interface ListProjectsLocationsApplicationsDomainMappingsRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  projectsId: string;
  /** Part of `parent`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `parent`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Maximum results to return per page. */
  pageSize?: number;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListProjectsLocationsApplicationsDomainMappingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
    locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
    applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/domainMappings",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsApplicationsDomainMappingsRequest>;

export type ListProjectsLocationsApplicationsDomainMappingsResponse =
  ListDomainMappingsResponse;
export const ListProjectsLocationsApplicationsDomainMappingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListDomainMappingsResponse;

export type ListProjectsLocationsApplicationsDomainMappingsError =
  DefaultErrors;

/** Lists the domain mappings on an application. */
export const listProjectsLocationsApplicationsDomainMappings: API.PaginatedOperationMethod<
  ListProjectsLocationsApplicationsDomainMappingsRequest,
  ListProjectsLocationsApplicationsDomainMappingsResponse,
  ListProjectsLocationsApplicationsDomainMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsApplicationsDomainMappingsRequest,
  output: ListProjectsLocationsApplicationsDomainMappingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsApplicationsDomainMappingsRequest {
  /** Part of `name`. Required. Name of the resource requested. Example: apps/myapp/domainMappings/example.com. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  domainMappingsId: string;
}

export const GetProjectsLocationsApplicationsDomainMappingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
    locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
    applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
    domainMappingsId: Schema.String.pipe(T.HttpPath("domainMappingsId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/domainMappings/{domainMappingsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsApplicationsDomainMappingsRequest>;

export type GetProjectsLocationsApplicationsDomainMappingsResponse =
  DomainMapping;
export const GetProjectsLocationsApplicationsDomainMappingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ DomainMapping;

export type GetProjectsLocationsApplicationsDomainMappingsError = DefaultErrors;

/** Gets the specified domain mapping. */
export const getProjectsLocationsApplicationsDomainMappings: API.OperationMethod<
  GetProjectsLocationsApplicationsDomainMappingsRequest,
  GetProjectsLocationsApplicationsDomainMappingsResponse,
  GetProjectsLocationsApplicationsDomainMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsApplicationsDomainMappingsRequest,
  output: GetProjectsLocationsApplicationsDomainMappingsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsApplicationsDomainMappingsRequest {
  /** Part of `parent`. Required. Name of the parent Application resource. Example: apps/myapp. */
  projectsId: string;
  /** Part of `parent`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `parent`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Whether a managed certificate should be provided by App Engine. If true, a certificate ID must be manaually set in the DomainMapping resource to configure SSL for this domain. If false, a managed certificate will be provisioned and a certificate ID will be automatically populated. */
  noManagedCertificate?: boolean;
  /** Whether the domain creation should override any existing mappings for this domain. By default, overrides are rejected. */
  overrideStrategy?:
    | "UNSPECIFIED_DOMAIN_OVERRIDE_STRATEGY"
    | "STRICT"
    | "OVERRIDE"
    | (string & {});
  /** Request body */
  body?: DomainMapping;
}

export const CreateProjectsLocationsApplicationsDomainMappingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
    locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
    applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
    noManagedCertificate: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("noManagedCertificate"),
    ),
    overrideStrategy: Schema.optional(Schema.String).pipe(
      T.HttpQuery("overrideStrategy"),
    ),
    body: Schema.optional(DomainMapping).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/domainMappings",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsApplicationsDomainMappingsRequest>;

export type CreateProjectsLocationsApplicationsDomainMappingsResponse =
  Operation;
export const CreateProjectsLocationsApplicationsDomainMappingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsApplicationsDomainMappingsError =
  DefaultErrors;

/** Maps a domain to an application. A user must be authorized to administer a domain in order to map it to an application. For a list of available authorized domains, see AuthorizedDomains.ListAuthorizedDomains. */
export const createProjectsLocationsApplicationsDomainMappings: API.OperationMethod<
  CreateProjectsLocationsApplicationsDomainMappingsRequest,
  CreateProjectsLocationsApplicationsDomainMappingsResponse,
  CreateProjectsLocationsApplicationsDomainMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsApplicationsDomainMappingsRequest,
  output: CreateProjectsLocationsApplicationsDomainMappingsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsApplicationsDomainMappingsRequest {
  /** Part of `name`. Required. Name of the resource to update. Example: apps/myapp/domainMappings/example.com. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  domainMappingsId: string;
  /** Required. Standard field mask for the set of fields to be updated. */
  updateMask?: string;
  /** Whether a managed certificate should be provided by App Engine. If true, a certificate ID must be manually set in the DomainMapping resource to configure SSL for this domain. If false, a managed certificate will be provisioned and a certificate ID will be automatically populated. Only applicable if ssl_settings.certificate_id is specified in the update mask. */
  noManagedCertificate?: boolean;
  /** Request body */
  body?: DomainMapping;
}

export const PatchProjectsLocationsApplicationsDomainMappingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
    locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
    applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
    domainMappingsId: Schema.String.pipe(T.HttpPath("domainMappingsId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    noManagedCertificate: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("noManagedCertificate"),
    ),
    body: Schema.optional(DomainMapping).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/domainMappings/{domainMappingsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsApplicationsDomainMappingsRequest>;

export type PatchProjectsLocationsApplicationsDomainMappingsResponse =
  Operation;
export const PatchProjectsLocationsApplicationsDomainMappingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsApplicationsDomainMappingsError =
  DefaultErrors;

/** Updates the specified domain mapping. To map an SSL certificate to a domain mapping, update certificate_id to point to an AuthorizedCertificate resource. A user must be authorized to administer the associated domain in order to update a DomainMapping resource. */
export const patchProjectsLocationsApplicationsDomainMappings: API.OperationMethod<
  PatchProjectsLocationsApplicationsDomainMappingsRequest,
  PatchProjectsLocationsApplicationsDomainMappingsResponse,
  PatchProjectsLocationsApplicationsDomainMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsApplicationsDomainMappingsRequest,
  output: PatchProjectsLocationsApplicationsDomainMappingsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsApplicationsDomainMappingsRequest {
  /** Part of `name`. Required. Name of the resource to delete. Example: apps/myapp/domainMappings/example.com. */
  projectsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  locationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  applicationsId: string;
  /** Part of `name`. See documentation of `projectsId`. */
  domainMappingsId: string;
}

export const DeleteProjectsLocationsApplicationsDomainMappingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectsId: Schema.String.pipe(T.HttpPath("projectsId")),
    locationsId: Schema.String.pipe(T.HttpPath("locationsId")),
    applicationsId: Schema.String.pipe(T.HttpPath("applicationsId")),
    domainMappingsId: Schema.String.pipe(T.HttpPath("domainMappingsId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/domainMappings/{domainMappingsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsApplicationsDomainMappingsRequest>;

export type DeleteProjectsLocationsApplicationsDomainMappingsResponse =
  Operation;
export const DeleteProjectsLocationsApplicationsDomainMappingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsApplicationsDomainMappingsError =
  DefaultErrors;

/** Deletes the specified domain mapping. A user must be authorized to administer the associated domain in order to delete a DomainMapping resource. */
export const deleteProjectsLocationsApplicationsDomainMappings: API.OperationMethod<
  DeleteProjectsLocationsApplicationsDomainMappingsRequest,
  DeleteProjectsLocationsApplicationsDomainMappingsResponse,
  DeleteProjectsLocationsApplicationsDomainMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsApplicationsDomainMappingsRequest,
  output: DeleteProjectsLocationsApplicationsDomainMappingsResponse,
  errors: [],
}));
