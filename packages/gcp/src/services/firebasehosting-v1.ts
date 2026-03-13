// ==========================================================================
// Firebase Hosting API (firebasehosting v1)
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
  name: "firebasehosting",
  version: "v1",
  rootUrl: "https://firebasehosting.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.Number),
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      message: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface HttpUpdate {
  /** Output only. Whether Hosting was able to find the required file contents on the specified path during its last check. */
  discovered?: string;
  /** Output only. A text string to serve at the path. */
  desired?: string;
  /** Output only. An error encountered during the last contents check. If null, the check completed successfully. */
  checkError?: Status;
  /** Output only. The path to the file. */
  path?: string;
  /** Output only. The last time Hosting systems checked for the file contents. */
  lastCheckTime?: string;
}

export const HttpUpdate: Schema.Schema<HttpUpdate> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      discovered: Schema.optional(Schema.String),
      desired: Schema.optional(Schema.String),
      checkError: Schema.optional(Status),
      path: Schema.optional(Schema.String),
      lastCheckTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "HttpUpdate" }) as any as Schema.Schema<HttpUpdate>;

export interface Operation {
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      done: Schema.optional(Schema.Boolean),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      error: Schema.optional(Status),
      name: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface DnsRecord {
  /** Output only. The record's type, which determines what data the record contains. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "A"
    | "CNAME"
    | "TXT"
    | "AAAA"
    | "CAA"
    | (string & {});
  /** Output only. The domain name the record pertains to, e.g. `foo.bar.com.`. */
  domainName?: string;
  /** Output only. The data of the record. The meaning of the value depends on record type: - A and AAAA: IP addresses for the domain name. - CNAME: Another domain to check for records. - TXT: Arbitrary text strings associated with the domain name. Hosting uses TXT records to determine which Firebase projects have permission to act on the domain name's behalf. - CAA: The record's flags, tag, and value, e.g. `0 issue "pki.goog"`. */
  rdata?: string;
  /** Output only. An enum that indicates the a required action for this record. */
  requiredAction?: "NONE" | "ADD" | "REMOVE" | (string & {});
}

export const DnsRecord: Schema.Schema<DnsRecord> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      domainName: Schema.optional(Schema.String),
      rdata: Schema.optional(Schema.String),
      requiredAction: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "DnsRecord" }) as any as Schema.Schema<DnsRecord>;

export interface DnsRecordSet {
  /** Output only. The domain name the record set pertains to. */
  domainName?: string;
  /** Output only. An error Hosting services encountered when querying your domain name's DNS records. Note: Hosting ignores `NXDOMAIN` errors, as those generally just mean that a domain name hasn't been set up yet. */
  checkError?: Status;
  /** Output only. Records on the domain. */
  records?: Array<DnsRecord>;
}

export const DnsRecordSet: Schema.Schema<DnsRecordSet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      domainName: Schema.optional(Schema.String),
      checkError: Schema.optional(Status),
      records: Schema.optional(Schema.Array(DnsRecord)),
    }),
  ).annotate({
    identifier: "DnsRecordSet",
  }) as any as Schema.Schema<DnsRecordSet>;

export interface DnsUpdates {
  /** The set of DNS records Hosting needs to serve secure content on the domain. */
  desired?: Array<DnsRecordSet>;
  /** The set of DNS records Hosting discovered when inspecting a domain. */
  discovered?: Array<DnsRecordSet>;
  /** The last time Hosting checked your custom domain's DNS records. */
  checkTime?: string;
}

export const DnsUpdates: Schema.Schema<DnsUpdates> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      desired: Schema.optional(Schema.Array(DnsRecordSet)),
      discovered: Schema.optional(Schema.Array(DnsRecordSet)),
      checkTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "DnsUpdates" }) as any as Schema.Schema<DnsUpdates>;

export interface CertVerification {
  /** Output only. A file to add to your existing, non-Hosting hosting service that confirms your intent to let Hosting create an SSL cert for your domain name. */
  http?: HttpUpdate;
  /** Output only. A `TXT` record to add to your DNS records that confirms your intent to let Hosting create an SSL cert for your domain name. */
  dns?: DnsUpdates;
}

export const CertVerification: Schema.Schema<CertVerification> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      http: Schema.optional(HttpUpdate),
      dns: Schema.optional(DnsUpdates),
    }),
  ).annotate({
    identifier: "CertVerification",
  }) as any as Schema.Schema<CertVerification>;

export interface LiveMigrationStep {
  /** Output only. The state of the live migration step, indicates whether you should work to complete the step now, in the future, or have already completed it. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PREPARING"
    | "PENDING"
    | "INCOMPLETE"
    | "PROCESSING"
    | "COMPLETE"
    | (string & {});
  /** Output only. A pair of ACME challenges that Hosting's Certificate Authority (CA) can use to create an SSL cert for your domain name. Use either the DNS or HTTP challenge; it's not necessary to provide both. */
  certVerification?: CertVerification;
  /** Output only. DNS updates to facilitate your domain's zero-downtime migration to Hosting. */
  dnsUpdates?: DnsUpdates;
  /** Output only. Issues that prevent the current step from completing. */
  issues?: Array<Status>;
}

export const LiveMigrationStep: Schema.Schema<LiveMigrationStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      certVerification: Schema.optional(CertVerification),
      dnsUpdates: Schema.optional(DnsUpdates),
      issues: Schema.optional(Schema.Array(Status)),
    }),
  ).annotate({
    identifier: "LiveMigrationStep",
  }) as any as Schema.Schema<LiveMigrationStep>;

export interface CustomDomainMetadata {
  /** The `HostState` of the domain name this `CustomDomain` refers to. */
  hostState?:
    | "HOST_STATE_UNSPECIFIED"
    | "HOST_UNHOSTED"
    | "HOST_UNREACHABLE"
    | "HOST_MISMATCH"
    | "HOST_CONFLICT"
    | "HOST_ACTIVE"
    | (string & {});
  /** The `CertState` of the domain name's SSL certificate. */
  certState?:
    | "CERT_STATE_UNSPECIFIED"
    | "CERT_PREPARING"
    | "CERT_VALIDATING"
    | "CERT_PROPAGATING"
    | "CERT_ACTIVE"
    | "CERT_EXPIRING_SOON"
    | "CERT_EXPIRED"
    | (string & {});
  /** The `OwnershipState` of the domain name this `CustomDomain` refers to. */
  ownershipState?:
    | "OWNERSHIP_STATE_UNSPECIFIED"
    | "OWNERSHIP_MISSING"
    | "OWNERSHIP_UNREACHABLE"
    | "OWNERSHIP_MISMATCH"
    | "OWNERSHIP_CONFLICT"
    | "OWNERSHIP_PENDING"
    | "OWNERSHIP_ACTIVE"
    | (string & {});
  /** A set of DNS record updates that allow Hosting to serve secure content on your domain name. The record type determines the update's purpose: - `A` and `AAAA`: Updates your domain name's IP addresses so that they direct traffic to Hosting servers. - `TXT`: Updates ownership permissions on your domain name, letting Hosting know that your custom domain's project has permission to perform actions for that domain name. - `CAA`: Updates your domain name's list of authorized Certificate Authorities (CAs). Only present if you have existing `CAA` records that prohibit Hosting's CA from minting certs for your domain name. These updates include all DNS changes you'll need to get started with Hosting, but, if made all at once, can result in a brief period of downtime for your domain name--while Hosting creates and uploads an SSL cert, for example. If you'd like to add your domain name to Hosting without downtime, complete the `liveMigrationSteps` first, before making the remaining updates in this field. */
  quickSetupUpdates?: DnsUpdates;
  /** A set of DNS record updates and ACME challenges that allow you to transition domain names to Firebase Hosting with zero downtime. These updates allow Hosting to create an SSL certificate and establish ownership for your custom domain before Hosting begins serving traffic on it. If your domain name is already in active use with another provider, add one of the challenges and make the recommended DNS updates. After adding challenges and adjusting DNS records as necessary, wait for the `ownershipState` to be `OWNERSHIP_ACTIVE` and the `certState` to be `CERT_ACTIVE` before sending traffic to Hosting. */
  liveMigrationSteps?: Array<LiveMigrationStep>;
  /** A list of issues that are currently preventing Hosting from completing the operation. These are generally DNS-related issues that Hosting encounters when querying a domain name's records or attempting to mint an SSL certificate. */
  issues?: Array<Status>;
}

export const CustomDomainMetadata: Schema.Schema<CustomDomainMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      hostState: Schema.optional(Schema.String),
      certState: Schema.optional(Schema.String),
      ownershipState: Schema.optional(Schema.String),
      quickSetupUpdates: Schema.optional(DnsUpdates),
      liveMigrationSteps: Schema.optional(Schema.Array(LiveMigrationStep)),
      issues: Schema.optional(Schema.Array(Status)),
    }),
  ).annotate({
    identifier: "CustomDomainMetadata",
  }) as any as Schema.Schema<CustomDomainMetadata>;

export interface CancelOperationRequest {}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelOperationRequest",
  }) as any as Schema.Schema<CancelOperationRequest>;

export interface ListOperationsResponse {
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      operations: Schema.optional(Schema.Array(Operation)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListOperationsResponse",
  }) as any as Schema.Schema<ListOperationsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface CancelOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/operations/{operationsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelOperationsRequest>;

export type CancelOperationsResponse = Empty;
export const CancelOperationsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type CancelOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelOperations: API.OperationMethod<
  CancelOperationsRequest,
  CancelOperationsResponse,
  CancelOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelOperationsRequest,
  output: CancelOperationsResponse,
  errors: [],
}));

export interface ListOperationsRequest {
  /** The standard list filter. */
  filter?: string;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list page size. */
  pageSize?: number;
}

export const ListOperationsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("returnPartialSuccess"),
  ),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations" }),
  svc,
) as unknown as Schema.Schema<ListOperationsRequest>;

export type ListOperationsResponse_Op = ListOperationsResponse;
export const ListOperationsResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListOperationsResponse;

export type ListOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listOperations: API.PaginatedOperationMethod<
  ListOperationsRequest,
  ListOperationsResponse_Op,
  ListOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListOperationsRequest,
  output: ListOperationsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({ method: "DELETE", path: "v1/operations/{operationsId}" }),
    svc,
  ) as unknown as Schema.Schema<DeleteOperationsRequest>;

export type DeleteOperationsResponse = Empty;
export const DeleteOperationsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteOperations: API.OperationMethod<
  DeleteOperationsRequest,
  DeleteOperationsResponse,
  DeleteOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteOperationsRequest,
  output: DeleteOperationsResponse,
  errors: [],
}));

export interface DeleteProjectsSitesCustomDomainsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsSitesCustomDomainsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/sites/{sitesId}/customDomains/{customDomainsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsSitesCustomDomainsOperationsRequest>;

export type DeleteProjectsSitesCustomDomainsOperationsResponse = Empty;
export const DeleteProjectsSitesCustomDomainsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsSitesCustomDomainsOperationsError = DefaultErrors;

/** DeleteOperation is a part of the google.longrunning.Operations interface, but is not implemented for CustomDomain resources. */
export const deleteProjectsSitesCustomDomainsOperations: API.OperationMethod<
  DeleteProjectsSitesCustomDomainsOperationsRequest,
  DeleteProjectsSitesCustomDomainsOperationsResponse,
  DeleteProjectsSitesCustomDomainsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsSitesCustomDomainsOperationsRequest,
  output: DeleteProjectsSitesCustomDomainsOperationsResponse,
  errors: [],
}));

export interface CancelProjectsSitesCustomDomainsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsSitesCustomDomainsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/sites/{sitesId}/customDomains/{customDomainsId}/operations/{operationsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsSitesCustomDomainsOperationsRequest>;

export type CancelProjectsSitesCustomDomainsOperationsResponse = Empty;
export const CancelProjectsSitesCustomDomainsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type CancelProjectsSitesCustomDomainsOperationsError = DefaultErrors;

/** CancelOperation is a part of the google.longrunning.Operations interface, but is not implemented for CustomDomain resources. */
export const cancelProjectsSitesCustomDomainsOperations: API.OperationMethod<
  CancelProjectsSitesCustomDomainsOperationsRequest,
  CancelProjectsSitesCustomDomainsOperationsResponse,
  CancelProjectsSitesCustomDomainsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelProjectsSitesCustomDomainsOperationsRequest,
  output: CancelProjectsSitesCustomDomainsOperationsResponse,
  errors: [],
}));
